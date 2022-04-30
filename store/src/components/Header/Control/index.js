import React from "react";
import classes from "./control.module.scss";
import CurrenciesControl from "./CurrenciesControl";
import CartControl from "./CartControl";

class Control extends React.Component {
    render() {
        return (
            <div className={ classes.control }>
                <CurrenciesControl/>
                <CartControl/>
            </div>
        )
    }
}

export default Control;