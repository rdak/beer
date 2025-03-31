import beerListReducer from "./beer";
import { configureStore } from "@reduxjs/toolkit";

/* export interface IStore {
	beerList: {
		list: IBeer[];
		fetching: boolean;
		error?: any;
	};
} */

export const store = configureStore({
	reducer: {
		beerList: beerListReducer,
	},
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
