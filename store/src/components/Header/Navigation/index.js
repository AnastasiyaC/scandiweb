import React from "react";
import classes from "./navigation.module.scss";
import Link from "./Link";
import { client } from "../../../apolloClient";
import { GET_CATEGORIES } from "../../../graphQL/queries";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        this._loadData().then( (response) => {
            this.setState({
                categories: response.data.categories,
            })
        });
    }

    _loadData = async () => {
        return await client.query({
            query: GET_CATEGORIES
        });
    }

    render() {
        const { categories } = this.state
        if( categories.length === 0 )
            return null;

        const links = categories.map( (el) => {
            if( el.name.toLowerCase() === "all") {
                return <Link to='/' name={ el.name } key={ el.name }/>
            }
            else return <Link to={ `/${ el.name.toLowerCase()}` } name={ el.name } key={ el.name }/>
        })

        return (
            <nav className={ classes.nav }>
                <ul className={ classes.nav__list }>
                    { links }
                </ul>
            </nav>
        )
    }
}

export default Navigation;