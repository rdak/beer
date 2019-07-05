import { CONFIG } from "../config";
import { _connectionStatus } from ".";

/**
 * Http methods
 */
export enum HTTP_METHOD {
  GET = "GET"
}

/**
 * Http response statuses
 */
export enum HTTP_STATUS {
  OK = "OK",

  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  ERROR = "ERROR",
  ABORTED = "ABORTED",
  TIMEOUT = "TIMEOUT"
}

/**
 * HTTP response interface
 */
export interface IResponse<T> {
  status: HTTP_STATUS;
  body: T;
}

/**
 * Request query interface
 */
export interface IRequestQuery {
  [K: string]: any;
}

/**
 * Request body interface
 */
export interface IRequestBody {
  [K: string]: any;
  [K: number]: any;
}

/**
 * HTTP request class
 */
export class HttpRequest {

  public constructor(
    public readonly method: HTTP_METHOD,
    public readonly path: string,
    public readonly query: IRequestQuery,
    public readonly body: IRequestBody | FormData
  ) { }

}

/**
 * HTTP response class
 */
export class HttpResponse<T> implements IResponse<T> {

  public constructor(
    public readonly req: HttpRequest,
    public readonly status: HTTP_STATUS,
    public readonly body: T
  ) { }

}

export function buildQueryStringParts(key: Array<string>, value: IRequestQuery, level: number = 0) {

  if (level > 16) throw new Error("Query string nesting level of 16 exceeded.");

  let parts = [];

  if (value instanceof Array) {

    for (let i = 0; i < value.length; i++)
      if (value[i] && value[i] !== null && value[i] !== undefined)
        parts = parts.concat(buildQueryStringParts(key.slice().concat(""), value[i], level + 1));

  } else if (value instanceof Object) {

    for (const i in value)
      if (value[i] && value[i] !== null && value[i] !== undefined)
        parts = parts.concat(buildQueryStringParts(key.slice().concat([i]), value[i] as any, level + 1));

  } else {

    let _key = "";

    for (let i = 0; i < key.length; i++)
      _key += (i > 0 ? "[" : "") + encodeURIComponent(key[i]) + (i > 0 ? "]" : "");

    parts.push(_key + "=" + encodeURIComponent(String(value)));

  }

  return parts;

}

export function buildQueryString(query: IRequestQuery, prefix: string = "?", delimiter: string = "&") {

  const parts = buildQueryStringParts([], query, 0);

  if (parts.length > 0)
    return prefix + parts.join(delimiter);
  else
    return "";

}

function parseRequestStatus(req: XMLHttpRequest) {

  switch (req.status) {

    case 200: return HTTP_STATUS.OK;
    case 400: return HTTP_STATUS.BAD_REQUEST;
    case 403: return HTTP_STATUS.FORBIDDEN;
    case 404: return HTTP_STATUS.NOT_FOUND;

    default: return HTTP_STATUS.ERROR;

  }

}

/**
 * Error response class
 */
export class ErrorResponse<T = null> extends Error implements IResponse<T> {

  public readonly req: HttpRequest;
  public readonly status: HTTP_STATUS;
  public readonly body: T;
  public readonly details: string;

  public constructor(res: HttpResponse<any>, message: string = null) {

    super(message || String(res.body));

    const req = res.req;

    this.req = res.req;
    this.status = res.status;
    this.body = res.body;

    // tslint:disable-next-line:max-line-length
    this.details = "Request to '" + req.method.toUpperCase() + " " + req.path + "' failed with status '" + res.status.toUpperCase() + "'.";

  }

}

/**
 * Mocks HTTP request
 */
export function mockRequest<T = null>(
  method: HTTP_METHOD,
  path: string,
  query: IRequestQuery = null,
  body: IRequestBody = null,
  responseStatus: HTTP_STATUS,
  responseBody: T = null): Promise<IResponse<T>> {

  return new Promise((resolve, reject) => {

    const url = CONFIG.api_url;
    const req = new HttpRequest(method, url, query, body);

    const delay = 100 + (500 - 100) * Math.random();

    setTimeout(() => {

      const res = new HttpResponse(req, responseStatus, responseBody);

      console.log("Mock API request", req);
      console.log("Mock API response", res);

      if (responseStatus === HTTP_STATUS.OK)
        resolve(res);

      else
        reject(new ErrorResponse(res));

    }, delay);

  });

}

export function apiRequest<T = null>(
  method: HTTP_METHOD,
  path: string,
  query: IRequestQuery = null,
  body: IRequestBody | FormData = null): Promise<IResponse<T>> {

  return new Promise((resolve, reject) => {

    if (!_connectionStatus) {

      reject(new Error("Bad connection"));

    } else {

      const url = CONFIG.api_url + path + (query !== null ? buildQueryString(query) : "");
      const req = new HttpRequest(method, url, query, body);

      console.debug("API request", req);

      // Prepare request
      const oReq = new XMLHttpRequest();

      oReq.open(method, url, true);
      oReq.timeout = CONFIG.api_request_timeout;

      // Bind listeners
      oReq.addEventListener("load", () => {

        const status = parseRequestStatus(oReq);

        try {

          let body;

          if (status === HTTP_STATUS.OK) {

            body = JSON.parse(oReq.responseText);

          }

          if (status === HTTP_STATUS.OK) {

            const res = new HttpResponse<T>(req, status, body as T);
            console.debug("API response", res);
            resolve(res);

          } else {

            body = JSON.parse(oReq.responseText).message;
            const res = new HttpResponse<T>(req, status, body as T);
            reject(new ErrorResponse(res));

          }

        } catch (err) {

          const res = new HttpResponse(req, HTTP_STATUS.ERROR, "Error parsing response body as JSON.");
          console.debug("API response", res);
          return reject(new ErrorResponse(res));

        }

      });

      oReq.addEventListener("error", (ev) => {

        const status = parseRequestStatus(oReq);

        const res = new HttpResponse(req, status, oReq.responseText);
        console.debug("API response", res);

        reject(new ErrorResponse(res));

      });

      oReq.addEventListener("abort", (ev) => {

        const res = new HttpResponse(req, HTTP_STATUS.ABORTED, null);
        console.debug("API response", res);

        reject(new ErrorResponse(res));

      });

      oReq.addEventListener("timeout", (ev) => {

        const res = new HttpResponse(req, HTTP_STATUS.TIMEOUT, null);
        console.debug("API response", res);

        reject(new ErrorResponse(res));

      });

      // Send optionally with payload
      if (body instanceof FormData) {

        oReq.send(body);

      } else if (body) {

        oReq.setRequestHeader("Content-type", "application/json");
        oReq.send(JSON.stringify(body));

      } else {

        oReq.send();

      }

    }

  });

}

