import { useEffect, useState } from "react";
import axios from 'axios';
import ProductCard from "./ProductCard";

export default function HomePrdList(){
    const [products , setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5550/getProducts')
            .then(response => {setProducts(response.data);});
    }, []);

    return(
        <>
            <h2 className="text-center p-3" >Our Products</h2>
            <div className="container">
                <div className="row">
                    {products.map((product) => {
                        return(
                            <div className="col-3 mb-4" key={product.id}>
                                <ProductCard product={product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}