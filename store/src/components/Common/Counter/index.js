import React from "react";
import classes from "./counter.module.scss";

class Counter extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { style, increment, decrement, count } = this.props;

        return (
            <div className={ `${classes.counter} ${classes[style]}` }>
                <button
                    className={ classes.symbol }
                    onClick={ increment }
                >
                    +
                </button>
                <span className={ classes.number }>
                    { count }
                </span>
                <button
                    className={ classes.symbol }
                    onClick={ decrement }
                >
                    &ndash;
                </button>
            </div>
        )
    }
}

export default Counter;