import * as BeerApi from "./beer";

export {
  BeerApi
};

export let _connectionStatus = true;

export function setConnectionStatus(status) {
  _connectionStatus = status;
}
