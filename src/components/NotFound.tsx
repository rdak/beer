import * as React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../routes";

export const NotFound: React.SFC = (props) => {
    return (
        <>
            <p>
                Page not found
            </p>
            <p>
                But you can check out the beer list <NavLink to={ROUTES.INDEX.path}>here</NavLink>
            </p>
        </>
    );
};
