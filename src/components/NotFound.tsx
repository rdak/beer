import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes";

export const NotFound: React.FC = () => {
	return (
		<>
			<p>Page not found</p>
			<p>
				But you can check out the main page{" "}
				<NavLink to={ROUTES.INDEX.path}>here</NavLink>
			</p>
		</>
	);
};
