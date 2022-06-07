import React from 'react';

import { Link } from 'react-router-dom';

import ButtonAddToCart from '../../Common/ButtonAddToCart';
import PriceHOC from '../../Common/Price/PriceWithHOC';
import AttributeSet from '../../Common/AttributeSet';

import classes from './storeProductItem.module.scss';

class StoreProductItem extends React.Component {
    render() {
        const { id, gallery, brand, name, prices, inStock } = this.props;

        return (
            <div className={ inStock ?
                `${classes.item}` :
                `${classes.item} ${classes.disable}` }
            >
                <div className={ classes.wrapper }>
                    <Link to={ `/product/${id}` }
                        className={ classes.link }>
                        <div className={ classes['image-container'] }>
                            <img
                                src={ gallery[0] }
                                className={ classes.image }
                                alt="store-item"
                            />
                            { inStock || (
                                <div className={ classes.stock }>
                                    <span>out of stock</span>
                                </div>
                            )}
                        </div>
                        <div className={ classes.description }>
                            <span className={ classes.name }>
                                { brand } { name }
                            </span>
                            <span className={ classes.price }>
                                <PriceHOC prices={ prices }/>
                            </span>
                        </div>
                    </Link>
                    <div className={ classes['button-container'] }>
                        <ButtonAddToCart productId={ id } inner="icon" disabled={ inStock }/>
                    </div>
                    <div className={ classes['attributes-container'] }>
                        <AttributeSet productId={ id } styleMode="list"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StoreProductItem;