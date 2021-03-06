import React from 'react';

import classes from './message.module.scss';

class Message extends React.Component {
    render() {
        return (
            <span className={ classes.message }>
                { this.props.message }
            </span>
        );
    }
}

export default Message;