import React from "react";
import classes from "./categoryPage.module.scss";
import StoreProducts from "../../StoreProducts";


class CategoryPage extends React.Component {
    constructor(props) {
        super(props)
    }

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