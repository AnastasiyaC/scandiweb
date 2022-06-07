import React from 'react';
import { useReactiveVar } from '@apollo/client';

import { totalPriceVar } from '../../apolloClient/cashe';

import CartOverlay from './index';

function CartOverlayHOC(props) {
    const totalPrices = useReactiveVar(totalPriceVar);

    return (
        <CartOverlay {...props} totalPrices={ totalPrices } />
    );
}

export default CartOverlayHOC;