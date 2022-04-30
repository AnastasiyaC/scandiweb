import React from "react";
import classes from "./cart.module.scss";
import CartProductsHOC from "../../CartProducts/CartProductsHOC";

class CartPage extends React.Component {
    render() {
        return (
            <>
                <h2 className={ classes.title }>
                    Cart
                </h2>
                <CartProductsHOC style='page'/>
            </>
        );
    }
}

export default CartPage;