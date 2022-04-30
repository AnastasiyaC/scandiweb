import React from "react";
import classes from "./productPage.module.scss";
import { GET_PRODUCT } from "../../../graphQL/queries";
import AttributeSet from "../../Common/AttributeSet";
import PriceHOC from "../../Common/Price/PriceWithHOC";
import ButtonAddToCart from "../../Common/ButtonAddToCart";
import { client } from "../../../apolloClient";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                product: response.data.product
            })
        });
    }

    _loadData = async () => {
        return await client.query({
            query: GET_PRODUCT,
            variables: { id: this.props.id },
            fetchPolicy: "network-only"
        })
    }

    render() {
        const { product } = this.state
        if( Object.keys(product).length === 0 )
            return null;

        const images = product.gallery.map( (el, i) => {
            if (i === 0) {
                return (
                    <div className={ classes['image-main']}>
                        <img className={ classes.image } src={ el } alt="product-image"/>
                    </div>
                )
            }
            else {
                return (
                    <div className={ classes['image-secondary']}>
                        <img className={ classes.image } src={ el } alt="product-image"/>
                    </div>
                )
            }
            })
            return (
                <div className={ classes.container }>
                    <div className={ classes.gallery }>
                        { images }
                    </div>
                    <div className={ classes.about }>
                        <h3 className={ classes.brand }>
                            { product.brand }
                        </h3>
                        <h4 className={ classes.name }>
                            { product.name }
                        </h4>
                        <div className={ product.inStock ?
                            `${ classes['attributes-container'] }` :
                            `${ classes['attributes-container'] } ${ classes.disabled }`
                        }>
                            <AttributeSet productId={ product.id } style='page'/>
                        </div>
                        <div className={ classes.price }>
                            <span className={ classes['price-text'] }>
                                price:
                            </span>
                            <span className={ classes['price-number']}>
                                <PriceHOC prices={ product.prices }/>
                            </span>
                        </div>
                        <div className={ classes['button-container'] }>
                            <ButtonAddToCart productId={ product.id } disabled={ product.inStock } inner='text'/>
                        </div>
                        <div
                            className={ classes.description }
                            dangerouslySetInnerHTML={ { __html: product.description } }
                        />
                    </div>
                </div>
            )
        }
}

export default ProductPage;