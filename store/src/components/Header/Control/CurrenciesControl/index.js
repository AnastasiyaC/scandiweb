import React from 'react';

import { currencyVar } from '../../../../apolloClient/cashe';
import { client } from '../../../../apolloClient';
import { GET_CURRENCIES } from '../../../../graphQL/queries';

import arrowIcon from './../../../../assets/icons/arrow-icon.png';
import classes from './currencies.module.scss';

class CurrenciesControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            selectedCurrency: currencyVar(),
            currenciesListOpen: false
        };
        this.toggleCurrencyChange = this.toggleCurrencyChange.bind(this);
        this.toggleCurrenciesListOpen = this.toggleCurrenciesListOpen.bind(this);
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                currencies: response.data.currencies
            });
        });
    }

    addOutsideClickListener() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    removeOutsideClickListener() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        if (this.currencyControlWrapper && !this.currencyControlWrapper.contains(event.target)) {
            this.setState(prevState => ({
                currenciesListOpen: !prevState.currenciesListOpen
            }),
            this.setOutsideClickListener
            );
        }
    };

    setOutsideClickListener() {
        this.state.currenciesListOpen ? this.addOutsideClickListener() : this.removeOutsideClickListener();
    }

    toggleCurrenciesListOpen() {
        this.setState(
            prevState => ({
                currenciesListOpen: !prevState.currenciesListOpen
            }),
            this.setOutsideClickListener
        );
    };

    toggleCurrencyChange(event) {
        this.setState(prevState => ({
            selectedCurrency: event.target.value,
            currenciesListOpen: !prevState.currenciesListOpen
        }),
        this.setOutsideClickListener
        );
        currencyVar(event.target.value);
        localStorage.setItem('currency', event.target.value);
    }

    _loadData = async () => {
        return await client.query({
            query: GET_CURRENCIES
        });
    };

    render() {
        const { currencies, selectedCurrency, currenciesListOpen } = this.state;

        if( !currencies )
            return null;

        const options = currencies.map(el => (
            <label
                className={ classes.label }
                key={ el.label }
            >
                <input
                    type="radio"
                    name="currencies"
                    className={ classes.input }
                    value={ el.symbol }
                    onChange={ this.toggleCurrencyChange }
                />
                { el.symbol } { el.label }
            </label>

        ));

        return (
            <div ref={ (element) => { this.currencyControlWrapper = element; } }>
                <button
                    className={ classes.button }
                    onClick={ this.toggleCurrenciesListOpen }
                >
                    <span className={classes.text}>
                        { selectedCurrency }
                    </span>
                    <img
                        src={ arrowIcon }
                        className={ `${ classes.arrow } ${ currenciesListOpen ?
                            `${classes.rotate}` : ''}` }
                        alt="arrow-icon"
                    />
                </button>
                { currenciesListOpen && (
                    <form className={ classes.list }>
                        { options }
                    </form>
                )}
            </div>
        );
    }
}

export default CurrenciesControl;