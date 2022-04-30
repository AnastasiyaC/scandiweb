import React from "react";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../../apolloClient/cashe";
import CartProducts from "./index";

function CartProductsHOC(props) {
    const cartProducts = useReactiveVar(cartItemsVar);

    return (
        <CartProducts {...props} cartProducts={ cartProducts } />
    )
}

export default CartProductsHOC;