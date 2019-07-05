export enum ACTION {
    BEER_LIST_FETCH = "beer_list_fetch",
    BEER_FETCH = "beer_fetch",
}

export enum ACTION_STATUS {
    REQUEST = "request",
    SUCCESS = "success",
    FAILURE = "failure",
    RESET = "reset"
}

export interface IAction<TData = null> {
    type: ACTION;
    status?: ACTION_STATUS;
    error?: Error;
    data?: TData;
}