import * as React from "react";
import { Beer } from "../interfaces";

export const BeerItem: React.SFC<{ item: Beer.IBeer; }> = (props) => {

    return (
        <div className="beer">
            <div className="beer__image">
                <img src={props.item.image_url} alt={props.item.name} />
            </div>
            <div className="beer__info">
                <div className="beer__title">{props.item.name}</div>
                <div className="beer__description">{props.item.first_brewed}</div>
            </div>
        </div>
    );
};
