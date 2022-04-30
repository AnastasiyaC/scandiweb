import React from "react";
import classes from "./singleAttributeSet.module.scss";
import AttributeButton from "../AttributeButton";
import { selectedAttributesVar } from "../../../../apolloClient/cashe";

class SingleAttributeSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attributeSelected: selectedAttributesVar().find( el => el.id === this.props.id).attributes[this.props.name],
        };
        this.onChangeAttribute = this.onChangeAttribute.bind(this);
        this.toggleCheckedAttribute = this.toggleCheckedAttribute.bind(this)
    }

    toggleCheckedAttribute(e) {
        if ( e.target.checked ) {
            this.setState({
                attributeSelected: ''
            })
            this.setAttributeVar('');
        }
    }

    onChangeAttribute(e) {
        this.setState({
            attributeSelected: e.target.value,
        })
        this.setAttributeVar(e.target.value);
    }

    setAttributeVar(value) {
        const { id, name } = this.props;

        selectedAttributesVar(
            selectedAttributesVar().map( el => el.id === id ?
                {
                    id,
                    attributes: Object.assign(el.attributes, { [name]: value} ),
                } :
                el
            )
        )
    }

    render() {
        const {attributes, type, name, style, disabled } = this.props;
        const { attributeSelected } = this.state;

        const attributeButtons = attributes.map(el => (
            <AttributeButton
                value={el.value}
                disabled={ disabled }
                type={ type }
                color={ el.id }
                name={ name }
                key={ el.id }
                styleName={ style }
                onChange={ this.onChangeAttribute }
                checkedValue={ attributeSelected }
                onClick={ this.toggleCheckedAttribute }
            />
        ))
        return (
                <div className={ `${classes.set} ${ classes[style]}` }>
                    <span className={classes.name}>
                        { name }:
                    </span>
                    <div className={classes.attributes}>
                        { attributeButtons }
                    </div>
                </div>
        )
    }
}

export default SingleAttributeSet;