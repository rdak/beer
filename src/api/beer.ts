import * as Interfaces from "../interfaces";
import { HTTP_METHOD, apiRequest } from "./request";
import { Beer } from "../interfaces";
import { dateFormat } from "../utils";

getBeers;
/**
 * Request beer list
 */
export function getBeers(query) {
	const { brewed_after, beer_name } = query;

	return apiRequest<Array<Beer.IBeerItem>>(HTTP_METHOD.GET, `/beers`, {
		...query,
		brewed_after: brewed_after && dateFormat(brewed_after),
		beer_name: beer_name.trim(),
	});
}

/**
 * Get single beer
 */
export function getBeer(id) {
	return apiRequest<Beer.IBeerItem>(HTTP_METHOD.GET, `/groups/${id}`);
}
