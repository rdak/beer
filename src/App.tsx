import React, { Component } from "react";
import { Header, Footer } from "./components";
import { BeerListContainer } from "./containers/BeerList";
import { ROUTES } from "./routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BeerDetailsContainer } from "./containers/BeerPage";
import { NotFound } from "./components/NotFound";

/**
 * Main Component
 */
export class App extends Component<{}, {}> {

  public render() {
    return (
      <div className="app">
        <Header />
        <div className="app__body">
          <BrowserRouter >
            <Switch>
              <Route exact path={ROUTES.INDEX.path} component={BeerListContainer} />
              <Route exact path={ROUTES.BEER_ITEM.path} component={BeerDetailsContainer} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }

}

