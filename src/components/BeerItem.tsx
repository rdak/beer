import * as React from "react";
import { Beer } from "../interfaces";
import { NavLink } from "react-router-dom";

export const BeerItem: React.SFC<{ item: Beer.IBeer; }> = (props) => {

    return (
        <NavLink to={`/beer/${props.item.id}`} className="beer-item">
            <div className="beer-item__image">
                <img src={props.item.image_url} alt={props.item.name} />
            </div>
            <div className="beer-item__info">
                <p className="beer-item__title">{props.item.name}</p>
                <p className="beer-item__description">{props.item.first_brewed}</p>
            </div>
        </NavLink>
    );
};
