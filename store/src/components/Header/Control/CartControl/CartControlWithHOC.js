import React from 'react';

import { useQuery } from '@apollo/client';

import { GET_CART_ITEMS } from '../../../../graphQL/queries';
import countTotalItemsCount from '../../../../utils/countTotalItemsCount';

import CartControl from './index';

function CartControlHOC(props) {
    const { data } = useQuery(GET_CART_ITEMS);

    return (
        <CartControl {...props} totalItemsCount={ countTotalItemsCount(data.cartItems) } />
    );
}

export default CartControlHOC;