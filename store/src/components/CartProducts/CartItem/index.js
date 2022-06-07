import React from 'react';

import { Link } from 'react-router-dom';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import { client } from '../../../apolloClient';
import { GET_CART_PRODUCT } from '../../../graphQL/queries';
import PriceHOC from '../../Common/Price/PriceWithHOC';
import Counter from '../../Common/Counter';
import { cartItemsVar, totalPriceVar } from '../../../apolloClient/cashe';


import findItemAttributes from '../../../utils/findItemAttributes';

import classes from './cartItem.module.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CartItemAttributes from './CartItemAttributes';

class CartItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            productCount: 1,
            productSelectedAttributes: {}
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.toggleAttributeChange = this.toggleAttributeChange.bind(this);
    }

    increment() {
        this.updateCartItemCount('plus');
        this.setState(prevState => ({
            productCount: prevState.productCount + 1
        }), () => this.updateTotalPriceVar(1)
        );
    }

    decrement() {
        if( this.state.productCount > 1) {
            this.updateCartItemCount('minus');
            this.setState(prevState => ({
                productCount: prevState.productCount - 1
            }), () => this.updateTotalPriceVar(1, 'minus')
            );
        }
        else this.deleteCartItem();
    }

    updateCartItemCount(mode) {
        const newCartItems = cartItemsVar().map( (item) => {
            if (item === this.props.cartItem) {
                const copyEl = Object.assign({}, item);
                copyEl.count = mode === 'plus' ? item.count + 1 : item.count - 1;
                return copyEl;
            }
            else return item;
        });
        this.updateCartItemsVar(newCartItems);
    }

    deleteCartItem() {
        const newCartItems = cartItemsVar().filter( el => el !== this.props.cartItem);

        this.updateCartItemsVar(newCartItems);
    }

    toggleAttributeChange(event) {
        this.setState(prevState => ({
            productSelectedAttributes: {
                ...prevState.productSelectedAttributes,
                [event.target.name]: event.target.value
            }
        }), () => {
            const newCartItems = cartItemsVar().map( (item) => {
                if (item === this.props.cartItem) {
                    const copyEl = Object.assign({}, item);

                    copyEl.attributes = this.state.productSelectedAttributes;
                    return copyEl;
                }
                else return item;
            });

            this.updateCartItemsVar(newCartItems);
        });
    }

    updateTotalPriceVar(count, mode = 'plus') {
        const totalPrices = totalPriceVar();
        const currentPrices = this.state.product.prices;

        if( !totalPrices.length ) {
            const newArr = currentPrices.map((el) => {
                const amount = el.amount * count;
                return {
                    ...el,
                    amount
                };
            });
            totalPriceVar(newArr);
            return;
        }

        const prices =  totalPrices.map((el, i) => {
            const amount = mode === 'plus' ?
                el.amount + currentPrices[i].amount * count :
                el.amount - currentPrices[i].amount * count;
            return {
                ...el,
                amount
            };
        });

        totalPriceVar(prices);
    }

    updateCartItemsVar(cartItems) {
        cartItemsVar(cartItems);
        localStorage.setItem('cartItems', JSON.stringify(cartItemsVar()));
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                product: response.data.product,
                productCount: this.props.cartItem.count,
                productSelectedAttributes: Object.assign({}, this.props.cartItem.attributes)
            }, () => this.updateTotalPriceVar(this.state.productCount));
        });
    }

    _loadData = async () => {
        return await client.query({
            query: GET_CART_PRODUCT,
            variables: {id: this.props.cartItem.id}
        });
    };

    render() {
        const { product, productCount, productSelectedAttributes } = this.state;
        const { styleMode, cartItem } = this.props;

        if( Object.keys(product).length === 0 )
            return null;

        const attributes = Object.entries(cartItem.attributes).map( (el, i) => (
            <CartItemAttributes
                label={ el[0] }
                attributes={ findItemAttributes(product.attributes)[i][el[0]] }
                selectedAttribute={ productSelectedAttributes[el[0]] }
                toggleAttributeChange={ this.toggleAttributeChange }
                styleMode={ styleMode }
                key={ i }
            />
        ));

        const slides = product.gallery.map( (el, i) => (
            <Slide index={ i } key={ i }>
                <div className={ classes['image-container'] }>
                    <img
                        src={ product.gallery[i] }
                        className={ classes.image }
                        alt="product-item"
                    />
                </div>
            </Slide>
        ));

        return (
            <div className={ `${classes.item} ${classes[styleMode]}` }>
                <div className={ classes.left }>
                    <Link
                        to={`/product/${ product.id }`}
                        className={ classes.link }
                    >
                        <h3 className={ classes.brand }>
                            { product.brand }
                        </h3>
                        <h4 className={ classes.name }>
                            { product.name }
                        </h4>
                    </Link>
                    <div className={ classes.price }>
                        <PriceHOC
                            prices={ product.prices }
                        />
                    </div>
                    <form className={ classes.attributes }>
                        { attributes }
                    </form>
                </div>
                <div className={ classes.right }>
                    <Counter
                        count={ productCount }
                        increment={ this.increment }
                        decrement={ this.decrement }
                        styleMode={ styleMode }
                    />
                    <div className={ classes['slider-container'] }>
                        <CarouselProvider
                            naturalSlideWidth={ 141 }
                            naturalSlideHeight={ 185 }
                            totalSlides={ product.gallery.length }
                            infinite={ true }
                        >
                            <Slider>
                                { slides }
                            </Slider>
                            { product.gallery.length > 1 && (
                                <>
                                    <ButtonBack className={ classes['arrow-left'] }>
                                        &lsaquo;
                                    </ButtonBack>
                                    <ButtonNext className={ classes['arrow-right'] }>
                                        &rsaquo;
                                    </ButtonNext>
                                </>
                            )}
                        </CarouselProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;