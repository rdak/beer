import * as React from "react";

import { doFetchBeer } from "../actions/beer";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { Link, useNavigate, useParams } from "react-router";
import {
	failRequestBeerItem,
	requestBeerItem,
	setBeerItem,
} from "../reducers/beer";
import { BeerApi } from "../api";

export const BeerDetails: React.FC = () => {
	const routerParams = useParams();
	const [isLoading, setIsLoading] = React.useState(false);

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
		dispatch(requestBeerItem());
		setIsLoading(true);

		BeerApi.getBeer(id)
			.then(
				(res) => {
					dispatch(setBeerItem(res.body));
				},
				(err) => {
					dispatch(failRequestBeerItem());
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	const navigate = useNavigate();

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

			<Link
				className="go-back-link"
				to={".."}
				onClick={(e) => {
					e.preventDefault();
					navigate(-1);
				}}
			>
				Go back
			</Link>
		</div>
	) : (
		<p>Sorry, there is no beer on this page...</p>
	);
};
