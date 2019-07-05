import React, { Component } from "react";
import { Header, Footer } from "./components";
import { BeerListContainer } from "./components/BeerList";
import { ROUTES } from "./routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
            {/* <Route path={ROUTES.PROJECT_INDEX.path} component={ProjectNav} /> */}
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }

}

