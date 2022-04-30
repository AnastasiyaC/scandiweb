import React from "react";
import classes from "./cartControl.module.scss";
import bagIcon from "../../../../assets/icons/bag_black-icon.png"
import CartOverlay from "../../../CartOverlay";
import { totalItemsCount } from "../../../../apolloClient/cashe";

class CartControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartOverlayOpen: false,
            toggleCartOverlay: this.toggleCartOverlay.bind(this),
            itemsCount: totalItemsCount(),
        }
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
            this.toggleCartOverlay()
        }
    }

    setOutsideClickListener() {
        this.state.cartOverlayOpen ? this.addOutsideClickListener() : this.removeOutsideClickListener();
    }

    render() {
        const { toggleCartOverlay, cartOverlayOpen, itemsCount } = this.state;

        return (
            <div ref={ (element) => { this.cartControlWrapper = element } }>
                <button
                    className={ classes.button }
                    onClick={ toggleCartOverlay }
                >
                    <div className={ classes['icon-container'] }>
                        <img
                            className={ classes.icon }
                            src={ bagIcon }
                            alt='bag-icon'
                        />
                    </div>
                    { itemsCount !== 0 && (
                        <div className={ classes['item-count']}>
                            { itemsCount }
                        </div>
                    )}
                </button>
                { cartOverlayOpen && (
                    <CartOverlay
                        toggleCartOverlay={ toggleCartOverlay }
                        itemsCount={ itemsCount }
                    />
                )}
            </div>
        )
    }
}

export default CartControl;