import * as Interfaces from "../interfaces";
import { HTTP_METHOD, apiRequest } from "./request";
import { Beer } from "../interfaces";

/**
 * Request beer list
 */
export function getBeers(data) {

  return apiRequest<Beer.IBeer[]>(
    HTTP_METHOD.GET,
    `/beers`,
    {
      page: data.page,
      per_page: data.per_page,
    },
    {},
  );

};
