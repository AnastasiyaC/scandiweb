import React from "react";
import classes from "./cartProducts.module.scss";
import CartItem from "./CartItem";

class CartProducts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cartProducts, style } = this.props;

        return (
            <div className={ `${classes.products} ${classes[style]}` }>
                { cartProducts && cartProducts.length === 0 ? (
                    <span className={ classes.text}>
                        No items in your cart.
                    </span>
                ) : (
                    <>
                        { cartProducts.map((el, i) => (
                            <CartItem
                                cartItem={ el }
                                key={ `${el.id}-${i}` }
                                style={ style }
                            />
                        ))}
                    </>
                )}
            </div>
        )
    }
}

export default CartProducts;