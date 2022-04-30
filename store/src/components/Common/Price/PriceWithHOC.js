import React from "react";
import { useReactiveVar } from "@apollo/client";
import Price from "./index";
import { currencyVar } from "../../../apolloClient/cashe";

function PriceHOC(props) {
    const currency = useReactiveVar(currencyVar);

    return (
        <Price {...props} currency={ currency } />
    )
}

export default PriceHOC;