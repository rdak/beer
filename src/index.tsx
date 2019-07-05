import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import "../scss/main.scss";
import { App } from "./App";
import reducers from "./reducers";

const createAppStore = () => {

  const store = createStore(
    reducers,
    applyMiddleware(
      reduxThunk
    )
  );


  return store;

}

window.onload = () => {
  // Render app
  const store = createAppStore();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById("app-container"));
};


