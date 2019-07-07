import * as React from "react";
import { BeerApi } from "../api";
import { BeerItem } from "../components/BeerItem";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { doFetchBeerList } from "../actions/beer";
import { IStore } from "../reducers";

const mapStateToProps = (store: IStore, ownProps: any) => {
    return {
        beerList: store.beerList.list
    };
}

const mapDispatchActions = (dispatch) => {
    return {
        fetchBeers: (query) => dispatch(doFetchBeerList(query))
    };
}

class BeerList extends React.Component<any, any>{
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            per_page: 10,
            by_date: "",
            beer_name: ""
        }

        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount(){
        this.props.fetchBeers(this.state);
    }

    filterHandler(e) {
        this.setState((state) => {
            return { ...state, beer_name: e.currentTarget.value}
        });

        /* componentDidUpdate */
        const beer_name = e.currentTarget.value.replace(/ /ig, "_")
        this.props.fetchBeers({ ...this.state, beer_name });
    }

    render() {
        return (
            <div className="beerList">
                <input
                    type="text"
                    onChange={this.filterHandler}
                    value={this.state.beer_name}
                />
                {
                    this.props.beerList.map((beer) => {
                        return (
                            <BeerItem
                                item={beer}
                                key={beer.id}
                            />
                        );
                    })
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
