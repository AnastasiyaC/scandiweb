import React from 'react';
import parse from 'html-react-parser';

import { CarouselProvider, Dot, Slide, Slider } from 'pure-react-carousel';

import { GET_PRODUCT } from '../../../graphQL/queries';

import AttributeSet from '../../Common/AttributeSet';
import PriceHOC from '../../Common/Price/PriceWithHOC';
import ButtonAddToCart from '../../Common/ButtonAddToCart';
import { client } from '../../../apolloClient';

import classes from './productPage.module.scss';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            topDotIndex: 0,
            moveDotsUp: this.moveDotsUp.bind(this),
            moveDotsDown: this.moveDotsDown.bind(this)
        };
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                product: response.data.product
            });
        });
    }

    _loadData = async () => {
        return await client.query({
            query: GET_PRODUCT,
            variables: { id: this.props.id },
            fetchPolicy: 'network-only'
        });
    };

    moveDotsUp() {
        this.setState(prevState => ({
            topDotIndex: prevState.topDotIndex - 1
        }));
    }

    moveDotsDown() {
        this.setState(prevState => ({
            topDotIndex: prevState.topDotIndex + 1
        }));
    }

    render() {
        const { product, topDotIndex, moveDotsUp, moveDotsDown } = this.state;
        if( Object.keys(product).length === 0 )
            return null;

        const slides = product.gallery.map( (el, i) => (
            <Slide index={i} key={i}>
                <div className={ classes['image-slider'] }>
                    <img
                        src={ product.gallery[i] }
                        className={ classes.image }
                        alt="product-item"
                    />
                </div>
            </Slide>
        ));

        const dots = product.gallery.map( (el, i) => (
            <Dot slide={i} className={ classes['dot-button'] } key={i}>
                <div className={ classes['image-dot'] }>
                    <img
                        src={ product.gallery[i] }
                        className={ classes.image }
                        alt="product-item"
                    />
                </div>
            </Dot>
        ));

        return (
            <div className={ classes.container }>
                <div className={ classes.gallery }>
                    <CarouselProvider
                        naturalSlideWidth={ 610 }
                        naturalSlideHeight={ 513 }
                        totalSlides={ product.gallery.length }
                    >
                        <div className={ classes.slider }>
                            <Slider className={ classes['slides-container'] }>
                                { slides }
                            </Slider>
                            <div className={ classes['dots-container'] }>
                                <div className={ classes.dots }>
                                    { dots.length <= 5 ? dots : dots.slice(topDotIndex, topDotIndex + 5) }
                                </div>

                            </div>
                        </div>
                        { topDotIndex !== 0 && (
                            <button className={ classes['button-up'] }
                                onClick={ moveDotsUp }
                            >
                                &#129121;
                            </button>
                        )}
                        { product.gallery.length >= 5 && topDotIndex + 5 !== product.gallery.length && (
                            <button className={ classes['button-down'] }
                                onClick={ moveDotsDown }
                            >
                                &#129123;
                            </button>
                        )}
                    </CarouselProvider>
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
                        <AttributeSet productId={ product.id } styleMode="page"/>
                    </div>
                    <div className={ classes.price }>
                        <span className={ classes['price-text'] }>
                                price:
                        </span>
                        <span className={ classes['price-number'] }>
                            <PriceHOC prices={ product.prices }/>
                        </span>
                    </div>
                    <div className={ classes['button-container'] }>
                        <ButtonAddToCart productId={ product.id } disabled={ product.inStock } inner="text"/>
                    </div>
                    <div className={ classes.description }>
                        { parse(product.description) }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;