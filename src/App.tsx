import React from "react";
import { Header, Footer } from "./components";
import BeerList from "./containers/BeerList";
import { ROUTES } from "./routes";
import { BrowserRouter, Routes, Route } from "react-router";
import { BeerDetails } from "./containers/BeerPage";
import { NotFound } from "./components/NotFound";
import { Provider } from "react-redux";
import { store } from "./reducers";

/**
 * Main Component
 */
const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="app">
					<Header />
					<div className="app__body">
						<Routes>
							<Route
								path={ROUTES.INDEX.path}
								element={<BeerList />}
							/>
							<Route
								path={ROUTES.BEER_ITEM.path}
								element={<BeerDetails />}
							/>
							<Route path="/" element={<BeerList />} />
							<Route element={<NotFound />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
