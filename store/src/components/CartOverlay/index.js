import React from "react";
import classes from "./cartOverlay.module.scss";
import { NavLink } from "react-router-dom";
import CartProductsHOC from "../CartProducts/CartProductsHOC";
import PriceHOC from "../Common/Price/PriceWithHOC";
import { totalPrice } from "../../apolloClient/cashe";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class CartOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: totalPrice(),
        }
    }

    render() {
        const { toggleCartOverlay, itemsCount } = this.props;

        return (
            <div className={ classes.bag }>
                <div className={ classes.wrapper}>
                    <h3 className={ classes.title}>
                        My Bag:
                        <span className={ classes.items }>
                            { itemsCount > 1 ? `  ${ itemsCount } items` : `  ${ itemsCount } item`}
                        </span>
                    </h3>
                    <div className={ classes.products }>
                        <SimpleBar style={{ maxHeight: 'inherit' }}>
                            <CartProductsHOC style='overlay'/>
                        </SimpleBar>
                    </div>
                    <div className={ classes.total }>
                        <span className={ classes['total-text'] }>
                            Total:
                        </span>
                        <span className={ classes.price }>
                            {!this.state.price.length ? "0.00" :
                                <PriceHOC prices={ totalPrice() }/>}
                        </span>
                    </div>
                    <div className={ classes.buttons }>
                        <NavLink to='/cart' className={ `${classes.button} ${ classes['button-view']}` }
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
        )
    }
}

export default CartOverlay;