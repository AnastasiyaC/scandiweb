import React from "react";
import classes from "./storeProducts.module.scss";
import { GET_CATEGORY_PRODUCTS } from "../../graphQL/queries";
import { client } from "../../apolloClient";
import StoreProductItem from "./StoreProductItem";

class StoreProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                products: response.data.category.products
            })
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this._loadData(this.props.category).then( (response) => {
                this.setState({
                    products: response.data.category.products
                })
            });
        }
    }

    _loadData = async () => {
        return await client.query({
            query: GET_CATEGORY_PRODUCTS,
            variables: {
                CategoryInput: { title: this.props.category }
            },
            fetchPolicy: "network-only"
        })
    }

    render() {
        const { products } = this.state;

        if( !products.length )
            return null;

        const storeItems = products.map( (el) => (
            <StoreProductItem
                brand={ el.brand }
                name={ el.name }
                image={ el.image}
                gallery={el.gallery}
                key={ el.id }
                id={ el.id }
                prices={ el.prices }
                inStock={ el.inStock }
                attributes={ el.attributes }
            />
        ))

        return (
            <div className={ classes.products }>
                { storeItems ? storeItems : 'no store items' }
            </div>
        )
    }
}

export default StoreProducts;