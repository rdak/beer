import * as Interfaces from "../interfaces";
import { HTTP_METHOD, apiRequest } from "./request";
import { Beer } from "../interfaces";

/**
 * Request beer list
 */
export function getBeers() {

  return apiRequest<Beer.IBeer[]>(
    HTTP_METHOD.GET,
    `/beers`,
    {

    },
    {},
  );

};
