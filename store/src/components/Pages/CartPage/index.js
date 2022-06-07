import React from 'react';

import CartProductsHOC from '../../CartProducts/CartProductsHOC';

import classes from './cart.module.scss';

class CartPage extends React.Component {
    render() {
        return (
            <>
                <h2 className={ classes.title }>
                    Cart
                </h2>
                <CartProductsHOC styleMode="page"/>
            </>
        );
    }
}

export default CartPage;