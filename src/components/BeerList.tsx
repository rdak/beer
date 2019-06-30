import * as React from "react";
import { BeerApi } from "../api";
import { BeerItem } from "./BeerItem";

export const BeerList: React.SFC = (props) => {

    const [data, setData] = React.useState({
        beers: [],
        page: 1,
        per_page: 10,
        by_name: "",
        by_date: "",
    });

    React.useEffect(
        () => {
            BeerApi.getBeers({page: data.page, per_page: data.per_page}).then(
                (res) => {
                    setData({...data, beers: res.body});
                },
                (err) => {
                    return err;
                }
            );
        },
        []
    );

    return (
        <div className="beerList">
            {/* <input
                type="text"
                onChange={(e) => {setData((data) => {return {...data, by_name: e.currentTarget.value}})}}
                value={data.by_name}
            /> */}
            {
                data.beers.map( (beer) => {
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
};
