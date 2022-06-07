import React from 'react';

import { NavLink } from 'react-router-dom';

import SimpleBar from 'simplebar-react';

import CartProductsHOC from '../CartProducts/CartProductsHOC';
import PriceHOC from '../Common/Price/PriceWithHOC';
import { totalPriceVar } from '../../apolloClient/cashe';

import classes from './cartOverlay.module.scss';
import 'simplebar/dist/simplebar.min.css';

class CartOverlay extends React.Component {
    componentWillUnmount() {
        totalPriceVar([]);
    }

    render() {
        const { toggleCartOverlay, itemsCount, totalPrices } = this.props;

        return (
            <div className={ classes.bag }>
                <div className={ classes.wrapper }>
                    <h3 className={ classes.title }>
                        My Bag:
                        <span className={ classes.items }>
                            { itemsCount > 1 ? `  ${ itemsCount } items` : `  ${ itemsCount } item` }
                        </span>
                    </h3>
                    <div className={ classes.products }>
                        <SimpleBar style={ {maxHeight: 'inherit'} }>
                            <CartProductsHOC styleMode="overlay"/>
                        </SimpleBar>
                    </div>
                    <div className={ classes.total }>
                        <span className={ classes['total-text'] }>
                            Total:
                        </span>
                        <span className={ classes.price }>
                            { !totalPrices.length ? '0.00' :
                                <PriceHOC prices={ totalPrices }/> }
                        </span>
                    </div>
                    <div className={ classes.buttons }>
                        <NavLink to="/cart" className={ `${classes.button} ${ classes['button-view']}` }
                            onClick={ toggleCartOverlay }
                        >
                            view bag
                        </NavLink>
                        <button
                            className={ `${classes.button} ${ classes['button-exit']}` }
                            onClick={ toggleCartOverlay }
                        >
                            check out
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartOverlay;