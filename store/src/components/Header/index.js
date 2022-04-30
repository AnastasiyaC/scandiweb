import React from "react";
import classes from "./header.module.scss";
import Navigation from "./Navigation";
import Control from "./Control";
import storeIcon from "../../assets/icons/store-icon.png";

class Header extends React.Component {
    render() {
        return (
            <header className={ classes.header }>
                <div className={ classes.wrapper }>
                    <Navigation/>
                    <div className={ classes['icon-container']}>
                        <img className={ classes.icon } src={ storeIcon } alt='store-icon'/>
                    </div>
                    <Control/>
                </div>
            </header>
        )
    }
}

export default Header;