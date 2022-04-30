import React from "react";
import './App.scss';
import {Route, Routes} from "react-router-dom";
import CategoryPage from "./components/Pages/CategoryPage";
import Layout from "./components/Layout";
import CartPage from "./components/Pages/CartPage";
import ProductPageHOC from "./components/Pages/ProductPage/ProductPageHOC";
import { client } from "./apolloClient";
import { GET_CATEGORIES } from "./graphQL/queries";

class App extends React.Component {
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
        })
    }

    render() {
        const { categories } = this.state;

        if( categories.length === 0 )
            return null;

        const routesToCategories = categories.map( (el) => {
            if( el.name.toLowerCase() === "all") {
                return <Route index element={ <CategoryPage name='all'/> } key={ el.name }/>
            }
            else return <Route path={ el.name.toLowerCase() } element={ <CategoryPage name={ el.name } /> } key={ el.name }/>
        })

        return (
            <div className="app">
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        { routesToCategories }
                        <Route path=':product/:id' element={ <ProductPageHOC/> }/>
                        <Route path='/cart' element={ <CartPage/> }/>
                    </Route>
                </Routes>
            </div>
        );
    }
}

export default App;
