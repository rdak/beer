import React, { Component } from "react";
import { Header, Footer } from "./components";
import { BeerListContainer } from "./components/BeerList";
import { ROUTES } from "./routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BeerDetailsContainer } from "./components/BeerPage";

/**
 * Main Component
 */
export class App extends Component<{}, {}> {

  public render() {
    return (
      <div className="app">
        <Header />
        <BrowserRouter >
          <Switch>
            <Route exact path={ROUTES.INDEX.path} component={BeerListContainer} />
            <Route path={ROUTES.BEER_ITEM.path} component={BeerDetailsContainer} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }

}

