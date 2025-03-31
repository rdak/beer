import { IBeerItem } from "../interfaces/beer";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type IBeerItem = any;

// Define a type for the slice state
export interface IBeerListState {
	fetching: boolean;
	error: string;
	list: Array<IBeerItem>;
}

// Define the initial state using that type
const initialState: IBeerListState = {
	fetching: false,
	error: "",
	list: [],
};

export const beerListSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		requestBeerList: (state) => {
			state.fetching = true;
		},
		setBeerList: (state, action: PayloadAction<Array<IBeerItem>>) => {
			console.log(action.payload);
			// state = {
			// 	fetching: false,
			// 	error: null,
			// 	list: action.payload,
			// };
			state.fetching = false;
			state.error = "";
			state.list = action.payload;
		},
		failRequestBeerList: (state, action: PayloadAction<string>) => {
			state.fetching = false;
			state.error = action.payload;
		},

		requestBeerItem: (state) => {
			state.fetching = true;
		},
		setBeerItem: (state, action: PayloadAction<IBeerItem>) => {
			const beerItem = action.payload;

			/* merge */
			const beerIndex = state.list.findIndex((b) => {
				return b.id === beerItem.id;
			});

			if (beerIndex > -1) {
				// state.list = state.list.splice()[...state.list, beerItem];
			} else {
				state.list = [...state.list, beerItem];
			}
		},
		failRequestBeerItem: (state, action: PayloadAction<string>) => {
			state.fetching = false;
			state.error = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	requestBeerList,
	setBeerList,
	failRequestBeerList,

	requestBeerItem,
	setBeerItem,
	failRequestBeerItem,
} = beerListSlice.actions;

export default beerListSlice.reducer;
