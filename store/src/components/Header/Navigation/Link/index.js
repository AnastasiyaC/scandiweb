import React from 'react';

import { NavLink } from 'react-router-dom';

import classes from './link.module.scss';

class Link extends React.Component {
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
        );
    }
}

export default Link;