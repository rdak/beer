import * as Interfaces from "../interfaces";
import { HTTP_METHOD, apiRequest } from "./request";
import { Beer } from "../interfaces";
import { dateFormat, nameFormat } from "../utils";

/**
 * Request beer list
 */
export function getBeers(query) {

  const { brewed_after, beer_name} = query;

  return apiRequest<Beer.IBeer[]>(
    HTTP_METHOD.GET,
    `/beers`,
    {
      ...query,
      brewed_after: brewed_after && dateFormat(brewed_after),
      beer_name: beer_name && nameFormat(beer_name)
    },
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
