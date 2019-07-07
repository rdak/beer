import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { doFetchBeer } from "../actions/beer";
import { IStore } from "../reducers";
import { getBeerById } from "../selectors/beerSelector";
import { IBeer } from "../interfaces/beer";

const mapStateToProps = (store: IStore, ownProps: any): { beer: IBeer } => {

    const { id } = ownProps.match.params;

    return {
        beer: getBeerById(store, Number(id))
    };
}

const mapDispatchActions = (dispatch, ownProps) => {

    const { id } = ownProps.match.params;

    return {
        fetchBeer: () => dispatch(doFetchBeer(id))
    };
}

class BeerDetails extends React.Component<any, any>{
    constructor(props) {
        super(props);
        // Get 'updated' info about this beer
        // it doesn't make sense now, but still to have this for the dynamic data
        props.fetchBeer();
    }

    render() {

        //description, abv, volume, food pairings
        return (
            this.props.beer ?
                <div className="beer">
                    <div className="desc">{this.props.beer.desc}</div>
                    <div className="desc">{this.props.beer.abv}</div>
                    {/* <div className="desc">{this.props.beer.desc}</div> */}
                </div> : null
        );
    }
}

export const BeerDetailsContainer = withRouter<any>(
    connect<any, any, any>(
        mapStateToProps,
        mapDispatchActions
    )(BeerDetails) as any
);
