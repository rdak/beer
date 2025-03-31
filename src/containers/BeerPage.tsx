import * as React from "react";

import { doFetchBeer } from "../actions/beer";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { useParams } from "react-router";

export const BeerDetails: React.FC = () => {
	const routerParams = useParams();

	const id = Number(routerParams.id);

	const beer = useAppSelector(({ beerList }) => {
		return (
			beerList.list.find((b) => {
				return b.id === id;
			}) || null
		);
	});

	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(doFetchBeer(id));
	}, [id]);

	return beer ? (
		<div className="beer">
			<h1>{beer.name}</h1>
			<p className="beer__desc">{beer.description}</p>
			<p className="beer__desc">{beer.abv} abv</p>
			<p className="beer__desc">
				Volume: {beer.volume?.value} {beer.volume?.unit}
			</p>

			<ul>
				<p className="beer__desc">Nice to have next to this beer:</p>
				{beer.food_pairing?.map((food, index) => {
					return <li key={index}>{food}</li>;
				})}
			</ul>
		</div>
	) : (
		"Sorry, there is no beer on this page..."
	);
};
