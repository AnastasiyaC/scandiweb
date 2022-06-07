import React from 'react';

import classes from './cartProducts.module.scss';
import CartItem from './CartItem';

class CartProducts extends React.Component {
    render() {
        const { cartItems, styleMode } = this.props;

        const items = cartItems.map((el, i) => (
            <CartItem
                cartItem={ el }
                key={ `${el.id}-${i}` }
                styleMode={ styleMode }
            />
        ));

        return (
            <div className={ `${classes.products} ${classes[styleMode]}` }>
                { cartItems && cartItems.length === 0 ? (
                    <span className={ classes.text }>
                        No items in your cart.
                    </span>
                ) : (
                    <>
                        { items }
                    </>
                )}
            </div>
        );
    }
}

export default CartProducts;