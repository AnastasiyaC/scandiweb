import React from 'react';

class Price extends React.Component {
    render() {
        const { prices, currency } = this.props;

        const price = prices.find( el => (
            el.currency.symbol === currency ? el : undefined
        ));

        return (
            <span>
                { price.currency.symbol } { price.amount.toFixed(2) }
            </span>
        );
    }
}

export default Price;