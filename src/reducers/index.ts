import { combineReducers } from "redux";
import { IBeer } from "../interfaces/beer";
import { beerReducer } from "./beer";

export interface IStore {
    beerList: {
        list: IBeer[],
        fetching: boolean,
        error?: any
    }
}

export default combineReducers<IStore>({
    beerList: beerReducer
});
