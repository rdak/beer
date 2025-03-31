import * as React from "react";
import DatePicker from "react-datepicker";

import { BeerItem } from "../components/BeerItem";

import { useNavigate, useParams } from "react-router";
// import { dateFormat } from "../utils";
import { NavLink } from "react-router-dom";
import {
	failRequestBeerList,
	requestBeerList,
	setBeerList,
} from "../reducers/beer";
import { BeerApi } from "../api";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { useDebounce } from "../utils";

const BeerList: React.FC = () => {
	const beerList = useAppSelector(({ beerList }) => beerList.list);
	const dispatch = useAppDispatch();
	const params = useParams();
	const navigate = useNavigate();

	console.log(beerList);

	const page = Number(params.page) || 1;

	const [state, setState] = React.useState({
		page,
		per_page: 10,
		brewed_after: "",
		beer_name: "",
	});

	const [isLoading, setIsLoading] = React.useState(false);

	const debouncedValue = useDebounce(state, 500);

	React.useEffect(() => {
		console.log("debounce", state);
		dispatch(requestBeerList());
		setIsLoading(true);

		BeerApi.getBeers(state)
			.then(
				(res) => {
					dispatch(setBeerList(res.body));
				},
				(err) => {
					dispatch(failRequestBeerList());
				}
			)
			.finally(() => {
				navigate("/page/1");
				setIsLoading(false);
			});
	}, [debouncedValue]);

	const filterByName = React.useCallback((e) => {
		const beer_name = e.target.value;

		setState((state) => {
			return { ...state, beer_name };
		});
	}, []);

	const filterByDate = React.useCallback((brewed_after) => {
		setState((state) => {
			return { ...state, brewed_after };
		});
	}, []);

	return (
		<div className="beerList">
			<h1 className="beerList__header">Know your beer!</h1>
			<div className="filters">
				<input
					className="filters__item"
					type="text"
					onChange={filterByName}
					value={state.beer_name}
					placeholder="Filter by name"
				/>
				<DatePicker
					className="filters__item"
					selected={
						state.brewed_after
							? new Date(state.brewed_after)
							: undefined
					}
					dateFormat="MM/yyyy"
					showMonthYearPicker
					onChange={filterByDate}
					placeholderText="Filter by brewed_after"
				/>
			</div>
			<div className="arrows">
				{page > 1 && (
					<NavLink
						className="pagination pagination--prev"
						to={`/page/${Number(page) - 1}`}
					>
						{" "}
						◀{" "}
					</NavLink>
				)}
				{beerList.length === 10 && (
					<NavLink
						className="pagination pagination--next"
						to={`/page/${Number(page) + 1}`}
					>
						{" "}
						▶{" "}
					</NavLink>
				)}
			</div>
			{beerList.length
				? beerList.map((beer) => {
						return <BeerItem item={beer} key={beer.id} />;
				  })
				: "Sorry, that's all we had"}
		</div>
	);
};

export default BeerList;
