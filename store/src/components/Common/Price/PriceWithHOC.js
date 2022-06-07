import React from 'react';
import { useReactiveVar } from '@apollo/client';

import { currencyVar } from '../../../apolloClient/cashe';

import Price from './index';

function PriceHOC(props) {
    const currency = useReactiveVar(currencyVar);

    return (
        <Price {...props} currency={ currency } />
    );
}

export default PriceHOC;