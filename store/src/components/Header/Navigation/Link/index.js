import React from "react";
import classes from "./link.module.scss";
import { NavLink } from "react-router-dom";

class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { to, name } = this.props;

        return (
            <li className={ classes.item }>
                <NavLink
                    to={ to }
                    className={  (navData) => navData.isActive ?
                        `${classes['item__navLink']} ${classes['item__navLink_active']}` :
                        classes['item__navLink']  }
                >
                    { name }
                </NavLink>
            </li>
        )
    }
}

export default Link;