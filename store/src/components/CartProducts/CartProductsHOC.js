import React from 'react';
import { useReactiveVar } from '@apollo/client';

import { cartItemsVar } from '../../apolloClient/cashe';

import CartProducts from './index';

function CartProductsHOC(props) {
    const cartItems = useReactiveVar(cartItemsVar);

    return (
        <CartProducts {...props} cartItems={ cartItems } />
    );
}

export default CartProductsHOC;