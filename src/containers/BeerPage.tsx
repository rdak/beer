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
        props.fetchBeer();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
        // if (prevProps.beer.id !== this.props.beer.id){
            this.props.fetchBeer();
        }
    }

    render() {

        // Unfortunately, I don't know what do some properties mean...
        return (
            this.props.beer ?
                <div className="beer">
                    <h1>{this.props.beer.name}</h1>
                    <p className="beer__desc">{this.props.beer.description}</p>
                    <p className="beer__desc">{this.props.beer.abv} abv</p>
                    <p className="beer__desc">
                        Volume: {this.props.beer.volume.value} {this.props.beer.volume.unit}
                    </p>

                    <ul>
                        <p className="beer__desc">Nice to have next to this beer:</p>
                        {
                            this.props.beer.food_pairing.map((food, index) => {
                                return <li key={index}>{food}</li>
                            })
                        }
                    </ul>
                </div> : "Sorry, there is no beer on this page..."
        );
    }
}

export const BeerDetailsContainer = withRouter<any>(
    connect<any, any, any>(
        mapStateToProps,
        mapDispatchActions
    )(BeerDetails) as any
);
