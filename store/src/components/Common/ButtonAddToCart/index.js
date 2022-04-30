import React from "react";
import classes from "./buttonAddToCart.module.scss";
import bagIcon from "../../../assets/icons/bag_white-icon.png";
import { cartItemsVar, selectedAttributesVar, totalItemsCount } from "../../../apolloClient/cashe";
import findObjectInArray from "../../../utils/findObjectInArray";
import checkEqualObjInArrOfObj from "../../../utils/checkEqualObjInArrOfObj";
import Message from "../Message";

class ButtonAddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledButton: false,
            messageIsActive: false,
        }
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        if( this.checkAttributes() ) {
            const addedItem = findObjectInArray(this.props.productId, selectedAttributesVar());
            const sameItemInCart = checkEqualObjInArrOfObj(addedItem, cartItemsVar());
            const newItemsCount = totalItemsCount() + 1;

            if( sameItemInCart ) {
                sameItemInCart.count = sameItemInCart.count + 1;
            }
            else {
                addedItem.count = 1;
                cartItemsVar([...cartItemsVar(), JSON.parse(JSON.stringify(addedItem))]);
            }
            totalItemsCount(newItemsCount);
            localStorage.setItem('totalItemsCount', String(newItemsCount));
            localStorage.setItem('cartItems', JSON.stringify(cartItemsVar()));
            this.resetCheckedAttributes();
        }
        else {
            this.setState(prevState => ({
                    disabledButton: !prevState.disabledButton,
                    messageIsActive: !prevState.messageIsActive
                }),
                () => setTimeout(() => {
                    this.setState(prevState => ({
                        disabledButton: !prevState.disabledButton,
                        messageIsActive: !prevState.messageIsActive
                    }))
                }, 2000)
            );
        }
    }

    checkAttributes() {
        const { productId } = this.props;
        const item = findObjectInArray(productId, selectedAttributesVar());
        const arrayOfValues = Object.values(item.attributes);

        if( Object.keys(item.attributes).length === 0 ) {
            return true;
        }
        else {
            return arrayOfValues.find( el => el === '') === undefined;
        }
    }

    resetCheckedAttributes() {
        const { productId } = this.props;
        const values = findObjectInArray(productId, selectedAttributesVar()).attributes;

        for(let key in values) {
            values[key] = ''
        }

        selectedAttributesVar(
            selectedAttributesVar().map(el => {
                if( el.id === productId ) {
                    return {
                        id: productId,
                        attributes: values
                    }
                }
                else return el
            })
        )
    }

    render() {
        const { inner, disabled } = this.props;
        const { messageIsActive, disabledButton } = this.state;

        return(
            <>
                <button
                    className={ inner === 'icon' ?
                        `${classes.button} ${classes.round}` :
                        classes.button
                    }
                    onClick={ this.addToCart }
                    disabled={ !disabled || disabledButton }
                >
                    { inner === 'icon' ?
                        <div className={ classes['icon-container'] }>
                            <img
                                className={ classes.icon }
                                src={ bagIcon }
                                alt='bag-icon'
                            />
                        </div> :
                        <span className={ classes.text }>
                        add to cart
                    </span>
                    }
                </button>
                { messageIsActive && (
                    <div className={classes['message-container']}>
                        <Message message="Please, select item's attributes!"/>
                    </div>
                )}
            </>
        )
    }
}

export default ButtonAddToCart;