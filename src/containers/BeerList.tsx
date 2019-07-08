import * as React from "react";
import DatePicker from "react-datepicker";

import { BeerItem } from "../components/BeerItem";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { doFetchBeerList } from "../actions/beer";
import { IStore } from "../reducers";
import { dateFormat } from "../utils";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes";

const mapStateToProps = (store: IStore, ownProps: any) => {
    const { page } = ownProps.match.params;

    return {
        beerList: store.beerList.list,
        page
    };
}

const mapDispatchActions = (dispatch, ownProps) => {
    return {
        fetchBeers: (query) => {
            dispatch(doFetchBeerList({ ...query, page: ownProps.match.params.page }))
        },
        updatePage: () => {
            ownProps.history.push("/page/1");
        }
    };
}

class BeerList extends React.PureComponent<any, any>{
    constructor(props){
        super(props);
        this.state = {
            page: props.page,
            per_page: 10,
            brewed_after: "",
            beer_name: ""
        }

        this.filterByDate = this.filterByDate.bind(this);
        this.filterByName = this.filterByName.bind(this);
    }

    componentDidMount(){
        this.props.fetchBeers(this.state);
    }

    public componentDidUpdate(prevProps, prevState) {
        /*
            Awful, here should be a flag property (e.g.: isChangedFilter)
            or totally another approach without componentDidUpdate

            even more -> it was better to keep filters in the redux store and make this component stateless.
            right now - it can be updated twice...
         */
        if (
            prevProps.match.params.page !== this.props.match.params.page ||
            prevState.brewed_after !== this.state.brewed_after ||
            prevState.beer_name !== this.state.beer_name
        ) {
            this.props.fetchBeers({ ...this.state});
        }
    }

    filterByName(e) {
        /* need to keep it in the store */
        const beer_name = e.target.value;
        this.setState((state) => {
            return { ...state, beer_name }
        });

        this.props.updatePage();
    }

    filterByDate(brewed_after) {
        /* need to keep it in the store */
        this.setState((state) => {
            return { ...state, brewed_after }
        });

        this.props.updatePage();
    }

    render() {
        return (

            <div className="beerList">
                <div className="filters">
                    <input
                        className="filters__item"
                        type="text"
                        onChange={this.filterByName}
                        value={this.state.beer_name}
                        placeholder="Filter by name"
                    />
                    <DatePicker
                        className="filters__item"
                        selected={this.state.brewed_after}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        onChange={this.filterByDate}
                        placeholderText="Filter by brewed_after"
                    />
                </div>
                <div className="arrows">
                    {
                        this.props.page > 1 &&
                            <NavLink className="pagination pagination--prev" to={`/page/${Number(this.props.page)-1}`}> {"<"} </NavLink>
                    }
                    {
                        this.props.beerList.length === 10 &&
                            <NavLink className="pagination pagination--next" to={`/page/${Number(this.props.page)+1}`}> {">"} </NavLink>
                    }
                </div>
                {
                    this.props.beerList.length ?
                        this.props.beerList.map((beer) => {
                            return (
                                <BeerItem
                                    item={beer}
                                    key={beer.id}
                                />
                            );
                        })
                        : "Sorry, that's all we had"
                }
            </div>
        );
    }
}

export const BeerListContainer = withRouter<any>(
    connect<any, any, any>(
        mapStateToProps,
        mapDispatchActions
    )(BeerList) as any
);
