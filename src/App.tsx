import React, { Component } from "react";
import { Header, Footer } from "./components";
import { BeerList } from "./components/BeerList";

/**
 * Main Component
 */
export class App extends Component<{}, {}> {

  public render() {
    return (
      <>
        <Header />
        <BeerList />
        <Footer />
      </>
    );
  }

}
