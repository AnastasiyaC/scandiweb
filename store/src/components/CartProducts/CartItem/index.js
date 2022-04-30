import React from "react";
import classes from "./cartItem.module.scss";
import { client } from "../../../apolloClient";
import { GET_CART_PRODUCT } from "../../../graphQL/queries";
import { Link } from "react-router-dom";
import PriceHOC from "../../Common/Price/PriceWithHOC";
import Counter from "../../Common/Counter";
import {cartItemsVar, totalItemsCount} from "../../../apolloClient/cashe";

class CartItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            productCount: '',
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.incrementReactiveCountVariables();
        this.setState(prevState => ({
                productCount: prevState.productCount + 1
            })
        );
    }

    decrement() {
        if( this.state.productCount > 1) {
            this.decrementReactiveCountVariables();
            this.setState(prevState => ({
                    productCount: prevState.productCount - 1
                })
            );
        }
    }

    incrementReactiveCountVariables() {
        const newCount = totalItemsCount() + 1
        totalItemsCount(newCount);
        localStorage.setItem('totalItemsCount', String(newCount));
        this.props.cartItem.count = this.props.cartItem.count + 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItemsVar()));
    }

    decrementReactiveCountVariables() {
        const newCount = totalItemsCount() - 1;
        totalItemsCount(newCount);
        localStorage.setItem('totalItemsCount', String(newCount));
        this.props.cartItem.count = this.props.cartItem.count - 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItemsVar()));
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                product: response.data.product,
                productCount: this.props.cartItem.count,
            })
        });
    }

    _loadData = async () => {
        return await client.query({
            query: GET_CART_PRODUCT,
            variables: {id: this.props.cartItem.id},
        })
    }

    render() {
        const { product, productCount } = this.state;
        const { style, cartItem } = this.props;

        if( Object.keys(product).length === 0 )
            return null;

        const attributes = Object.entries(cartItem.attributes).map(el => (
                <div className={ classes.attribute }>
                    <span className={ classes['attribute-name'] }>
                        { el[0] }:
                    </span>
                    <div
                        className={ el[0] === 'Color' ?
                            `${ classes.swatch }` :
                            `${ classes.text }` }
                        style={ {backgroundColor: el[0] === 'Color' ? `${el[1]}` : 'black'} }
                    >
                        { el[0] === 'Color' ? '' : el[1] }
                    </div>
                </div>
            ))

        return (
            <div className={ `${classes.item} ${classes[style]}` }>
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
                            count={ productCount }
                        />
                    </div>
                    <div className={ classes.attributes }>
                        { attributes }
                    </div>
                </div>
                <div className={ classes.right }>
                    <Counter
                        count={ productCount }
                        increment={ this.increment }
                        decrement={ this.decrement }
                        style={ style }
                    />
                    <div className={ classes['image-container'] }>
                        <img
                            src={ product.gallery[0] }
                            className={ classes.image }
                            alt='product-image'
                        />
                        <button className={ classes['arrow-left'] }>
                            &lsaquo;
                        </button>
                        <button className={ classes['arrow-right'] }>
                            &rsaquo;
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartItem;