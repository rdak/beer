import { BeerApi } from "../api";
import { ACTION, ACTION_STATUS } from "./actions";

export function doFetchBeerList(
    page: number = 1,
    per_page: number = 10
) {

    return (dispatch) => {

        dispatch({
            type: ACTION.BEER_LIST_FETCH,
            status: ACTION_STATUS.REQUEST,
        });

        BeerApi.getBeers().then((res) => {

            dispatch({
                type: ACTION.BEER_LIST_FETCH,
                status: ACTION_STATUS.SUCCESS,
                data: res.body
            });

        }, (err) => {

            dispatch({
                type: ACTION.BEER_LIST_FETCH,
                status: ACTION_STATUS.FAILURE,
                error: err
            });

        });

    };

}