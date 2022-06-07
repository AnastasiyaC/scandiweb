import React from 'react';

import bagIcon from '../../../../assets/icons/bag_black-icon.png';
import CartOverlayWithHOC from '../../../CartOverlay/CartOverlayWithHOC';

import classes from './cartControl.module.scss';

class CartControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartOverlayOpen: false,
            toggleCartOverlay: this.toggleCartOverlay.bind(this)
        };
    }

    toggleCartOverlay() {
        this.setState(prevState => ({
            cartOverlayOpen: !prevState.cartOverlayOpen
        }),
        this.setOutsideClickListener
        );
    }

    addOutsideClickListener() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    removeOutsideClickListener() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        if (this.cartControlWrapper && !this.cartControlWrapper.contains(event.target)) {
            this.toggleCartOverlay();
        }
    };

    setOutsideClickListener() {
        this.state.cartOverlayOpen ? this.addOutsideClickListener() : this.removeOutsideClickListener();
    }

    render() {
        const { toggleCartOverlay, cartOverlayOpen } = this.state;
        const { totalItemsCount } = this.props;

        return (
            <div ref={ (element) => { this.cartControlWrapper = element; } }>
                <button
                    className={ classes.button }
                    onClick={ toggleCartOverlay }
                >
                    <div className={ classes['icon-container'] }>
                        <img
                            className={ classes.icon }
                            src={ bagIcon }
                            alt="bag-icon"
                        />
                    </div>
                    { totalItemsCount !== 0 && (
                        <div className={ classes['item-count'] }>
                            { totalItemsCount }
                        </div>
                    )}
                </button>
                { cartOverlayOpen && (
                    <CartOverlayWithHOC
                        toggleCartOverlay={ toggleCartOverlay }
                        itemsCount={ totalItemsCount }
                    />
                )}
            </div>
        );
    }
}

export default CartControl;