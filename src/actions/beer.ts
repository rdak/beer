import { BeerApi } from "../api";
import { ACTION, ACTION_STATUS } from "./actions";

export function doFetchBeerList(query) {

    return (dispatch) => {

        dispatch({
            type: ACTION.BEER_LIST_FETCH,
            status: ACTION_STATUS.REQUEST,
        });

        BeerApi.getBeers(query).then((res) => {

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

export function doFetchBeer(
    id: number,
) {

    return (dispatch) => {

        dispatch({
            type: ACTION.BEER_FETCH,
            status: ACTION_STATUS.REQUEST,
        });

        BeerApi.getBeer(id).then((res) => {

            dispatch({
                type: ACTION.BEER_FETCH,
                status: ACTION_STATUS.SUCCESS,
                data: res.body
            });

        }, (err) => {

            dispatch({
                type: ACTION.BEER_FETCH,
                status: ACTION_STATUS.FAILURE,
                error: err
            });

        });

    };

}