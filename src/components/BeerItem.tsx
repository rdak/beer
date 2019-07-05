import * as React from "react";
import { Beer } from "../interfaces";
import { NavLink } from "react-router-dom";

export const BeerItem: React.SFC<{ item: Beer.IBeer; }> = (props) => {

    return (
        <NavLink to={`/${props.item.id}`}>
            <div className="beer__image">
                <img src={props.item.image_url} alt={props.item.name} />
            </div>
            <div className="beer__info">
                <div className="beer__title">{props.item.name}</div>
                <div className="beer__description">{props.item.first_brewed}</div>
            </div>
        </NavLink>
    );
};
