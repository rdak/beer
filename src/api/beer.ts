import * as Interfaces from "../interfaces";
import { HTTP_METHOD, apiRequest } from "./request";
import { Beer } from "../interfaces";

/**
 * Request beer list
 */
export function getBeers(query) {

  /* queries work as regexp... */
  return apiRequest<Beer.IBeer[]>(
    HTTP_METHOD.GET,
    `/beers`,
    query,
    {},
  );

};

/**
 * Get single beer
 */
export function getBeer(id) {

  return apiRequest<Beer.IBeer>(
    HTTP_METHOD.GET,
    `/beers/${id}`,
    {},
    {},
  );

};
