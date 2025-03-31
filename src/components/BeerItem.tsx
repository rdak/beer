import React from "react";
import { Beer } from "../interfaces";
import { NavLink } from "react-router-dom";
import { CONFIG } from "../config";

interface IBeerItemProps {
	item: Beer.IBeerItem;
}

export const BeerItem: React.FC<IBeerItemProps> = ({ item }) => {
	return (
		<NavLink to={`/beer/${item.id}`} className="beer-item">
			<div className="beer-item__image">
				<img
					src={`${CONFIG.api_url}/images/${item.image}`}
					alt={item.name}
				/>
			</div>
			<div className="beer-item__info">
				<p className="beer-item__title">{item.name}</p>
				<p className="beer-item__description">{item.first_brewed}</p>
			</div>
		</NavLink>
	);
};
