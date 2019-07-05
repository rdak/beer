import { IBeer } from "../interfaces/beer";
import { IAction, ACTION, ACTION_STATUS } from "../actions/actions";

export function beerReducer(state:any = {list: [], fetching: false, error: null}, action: IAction<any>) {
    if (action.type === ACTION.BEER_LIST_FETCH) {
        switch (action.status) {

            case ACTION_STATUS.REQUEST:
                return {
                    ...state,
                    fetching: true,
                    error: null,
                };

            case ACTION_STATUS.SUCCESS:
                return {
                    ...state,
                    fetching: false,
                    error: null,
                    list: action.data,
                };

            case ACTION_STATUS.FAILURE:
                return {
                    ...state,
                    fetching: false,
                    error: action.error
                };

        }
    }

    return state;

}
