import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./index";

function ProductPageHOC() {
    const { id } = useParams();

    return <ProductPage id={ id}/>
}

export default ProductPageHOC;