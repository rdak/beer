import { IStore } from "../reducers";
import { Beer } from "../interfaces";

export function getBeerById(store: IStore, id: number): Beer.IBeer {

    return store.beerList.list.find((b) => { return b.id === id}) || null;

}