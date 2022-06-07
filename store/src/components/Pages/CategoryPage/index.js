import React from 'react';

import StoreProducts from '../../StoreProducts';

import classes from './categoryPage.module.scss';


class CategoryPage extends React.Component {
    render() {
        const { name } = this.props;

        return (
            <>
                <h2 className={ classes.title }>
                    { name === 'all' ? `${name} categories` : `${name} category` }
                </h2>
                <StoreProducts category={ name }/>
            </>
        );
    }
}

export default CategoryPage;