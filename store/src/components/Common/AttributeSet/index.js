import React from "react";
import { client } from "../../../apolloClient";
import { GET_PRODUCT_ATTRIBUTES } from "../../../graphQL/queries";
import { selectedAttributesVar } from "../../../apolloClient/cashe";
import findObjectInArray from "../../../utils/findObjectInArray";
import SingleAttributeSet from "./SingleAttributeSet";

class AttributeSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            disabled: false,
            id: '',
        }
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setAttributesVariable(response);
            this.setState({
                attributes: response.data.product.attributes,
                disabled: response.data.product.inStock,
                id: response.data.product.id
            })
        });
    }

    _loadData = async () => {
        return await client.query({
            query: GET_PRODUCT_ATTRIBUTES,
            variables: { id: this.props.productId },
            fetchPolicy: "network-only"
        })
    }

    setAttributesVariable(response) {
        const map = new Map();
        response.data.product.attributes.map(el => map.set(`${el.name}`, ''))

        selectedAttributesVar(
            findObjectInArray(response.data.product.id, selectedAttributesVar()) ?
                [...selectedAttributesVar()] :
                [...selectedAttributesVar(), {
                    id: response.data.product.id,
                    attributes: Object.fromEntries(map.entries()),
                }]
        );
    }

    render() {
        const { attributes, disabled, id } = this.state;
        const { style } = this.props;

        if( !attributes.length) return null;

        const attributesSet = attributes.map( el => (
            <SingleAttributeSet
                id={ id }
                attributes={ el.items }
                type={ el.type }
                name={ el.name }
                key={ el.id }
                style={ style }
                disabled={ !disabled }
            />
        ))

        return (
            <>
                { attributesSet }
            </>
        )
    }
}

export default AttributeSet;