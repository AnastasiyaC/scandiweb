import React from 'react';

import classes from './attributeButton.module.scss';

class AttributeButton extends React.Component{
    render() {
        const { type, name, value, disabled, styleName, onChange, checkedValue, onClick } = this.props;
        const myStyle = { backgroundColor: value };

        return (
            <>
                <label
                    className={ checkedValue === value ?
                        `${classes.label} ${classes[`${type}-${styleName}`]} ${classes.checked}` :
                        `${classes.label} ${classes[`${type}-${styleName}`]}`
                    }
                    style={ type === 'swatch' ? myStyle : null }
                >
                    { type === 'text' ? value : '' }
                    <input
                        type="radio"
                        name={ name }
                        className={ classes.input }
                        value={ value }
                        onChange={ onChange }
                        disabled={ disabled }
                        checked={ checkedValue === value }
                        onClick={ onClick }
                    />
                </label>
            </>
        );
    }
}

export default AttributeButton;