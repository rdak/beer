import * as React from "react";
import DatePicker from "react-datepicker";

import { BeerItem } from "../components/BeerItem";

import { useNavigate, useParams } from "react-router";
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

	const page = Number(params.page) || 1;

	const [state, setState] = React.useState({
		page,
		per_page: 10,
		brewed_after: "",
		beer_name: "",
	});

	React.useEffect(() => {
		setState((prevState) => ({ ...prevState, page }));
	}, [page]);

	const [isLoading, setIsLoading] = React.useState(false);

	const debouncedValue = useDebounce(state, 500);

	React.useEffect(() => {
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
				setIsLoading(false);
			});
	}, [page, debouncedValue]);

	const filterByName = React.useCallback((e) => {
		const beer_name = e.target.value;

		setState((state) => ({ ...state, beer_name }));

		navigate("/page/1");
	}, []);

	const filterByDate = React.useCallback((brewed_after) => {
		setState((state) => ({ ...state, brewed_after }));

		navigate("/page/1");
	}, []);

	return (
		<div className="beerListPage">
			<h1 className="beerListPage__header">Know your beer!</h1>
			<div className="beerListPage__filters">
				<label className="filter_item">
					<span>Filter by name</span>
					<input
						className="filter_item__input"
						type="text"
						onChange={filterByName}
						value={state.beer_name}
						placeholder="Start typing"
					/>
				</label>
				<label className="filter_item">
					<span>Filter by date</span>
					<DatePicker
						className="filter_item__input"
						selected={
							state.brewed_after
								? new Date(state.brewed_after)
								: undefined
						}
						dateFormat="MM/yyyy"
						showMonthYearPicker
						onChange={filterByDate}
						placeholderText="Pick a date or enter manually"
					/>
				</label>
			</div>
			<div className="beerListPage__arrows">
				{page > 1 && (
					<NavLink
						className="pagination pagination--prev"
						to={`/page/${Number(page) - 1}`}
					>
						◀
					</NavLink>
				)}
				{beerList.length === 10 && (
					<NavLink
						className="pagination pagination--next"
						to={`/page/${Number(page) + 1}`}
					>
						▶
					</NavLink>
				)}
			</div>

			<div className="beerListPage__list">
				{beerList.length ? (
					beerList.map((beer) => {
						return <BeerItem item={beer} key={beer.id} />;
					})
				) : (
					<p>Sorry, that's all we had</p>
				)}
			</div>
		</div>
	);
};

export default BeerList;
