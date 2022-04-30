import React from "react";
import classes from "./price.module.scss";

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {prices, currency, count } = this.props;

        const price = prices.find( el => {
            if (el.currency.symbol === currency) {
                return el
            }
        })

        return (
            <span className={ classes.price }>
                 { price.currency.symbol } { count ? (price.amount * count).toFixed(2) : (price.amount).toFixed(2) }
            </span>
        );
    }
}

export default Price;