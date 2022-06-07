import React from 'react';

import classes from './cartItemAttributes.module.scss';

class CartItemAttributes extends React.Component {
    render() {
        const { label, attributes, selectedAttribute, styleMode, toggleAttributeChange } = this.props;

        const options = attributes.map( (el, i) => (
            <option
                className={ classes.option }
                value={ el }
                style={ {backgroundColor: label === 'Color' ? el : 'white'} }
                key={ i }
            >
                { label === 'Color' ? '' : el }
            </option>
        ));

        return (
            <div className={ `${classes.attributes} ${classes[styleMode]}` }>
                <label className={ classes.label }>
                    { label }:
                </label>
                <select
                    className={ label === 'Color' ?
                        `${ classes.swatch }` :
                        `${ classes.text }` }
                    style={ {backgroundColor: label === 'Color' ? selectedAttribute : 'black'} }
                    name={ label }
                    value={ selectedAttribute }
                    onChange={ toggleAttributeChange }
                >
                    { options }
                </select>
            </div>
        );
    }
}

export default CartItemAttributes;