import React from 'react';

import classes from './control.module.scss';
import CurrenciesControl from './CurrenciesControl';
import CartControlWithHOC from './CartControl/CartControlWithHOC';

class Control extends React.Component {
    render() {
        return (
            <div className={ classes.control }>
                <CurrenciesControl/>
                <CartControlWithHOC/>
            </div>
        );
    }
}

export default Control;