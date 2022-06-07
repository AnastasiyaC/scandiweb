import React from 'react';

import bagIcon from '../../../assets/icons/bag_white-icon.png';
import { cartItemsVar, selectedAttributesVar } from '../../../apolloClient/cashe';
import findObjectInArray from '../../../utils/findObjectInArray';
import checkEqualObjInArrOfObj from '../../../utils/checkEqualObjInArrOfObj';
import Message from '../Message';

import classes from './buttonAddToCart.module.scss';

class ButtonAddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledButton: false,
            messageIsActive: false,
            messageText: ''
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        if( this.checkAttributes() ) {
            const addedItem = findObjectInArray(this.props.productId, selectedAttributesVar());
            const sameItemInCart = checkEqualObjInArrOfObj(addedItem, cartItemsVar());

            if( sameItemInCart ) {
                const newCartItemsVar = cartItemsVar().map( (item) => {
                    if (item === sameItemInCart) {
                        const copyEl = Object.assign({}, item);
                        copyEl.count = item.count + 1;
                        return copyEl;
                    }
                    else return item;
                });
                cartItemsVar(newCartItemsVar);
            }
            else {
                addedItem.count = 1;
                cartItemsVar([...cartItemsVar(), JSON.parse(JSON.stringify(addedItem))]);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItemsVar()));
            this.resetCheckedAttributes();
            this.showMessage('This item was added to cart!');
        }
        else {
            this.showMessage('Please, select item\'s attributes!');
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
            values[key] = '';
        }

        selectedAttributesVar(
            selectedAttributesVar().map(el => {
                if( el.id === productId ) {
                    return {
                        id: productId,
                        attributes: values
                    };
                }
                else return el;
            })
        );
    }

    showMessage(text) {
        this.setState(prevState => ({
            disabledButton: !prevState.disabledButton,
            messageIsActive: !prevState.messageIsActive,
            messageText: text
        }),
        () => setTimeout(() => {
            this.setState(prevState => ({
                disabledButton: !prevState.disabledButton,
                messageIsActive: !prevState.messageIsActive
            }));
        }, 2000)
        );
    }

    render() {
        const { inner, disabled } = this.props;
        const { messageIsActive, disabledButton, messageText } = this.state;

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
                                alt="bag-icon"
                            />
                        </div> :
                        <span className={ classes.text }>
                        add to cart
                        </span>
                    }
                </button>
                { messageIsActive && (
                    <div className={classes['message-container']}>
                        <Message message={messageText}/>
                    </div>
                )}
            </>
        );
    }
}

export default ButtonAddToCart;