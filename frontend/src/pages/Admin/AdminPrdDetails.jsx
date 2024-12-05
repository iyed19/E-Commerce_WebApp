import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function AdminProducts(){

    const { id } = useParams();

    const [product , setProduct] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5550/getProductById/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return(
        <>
            {product && (
                <div className="card ProductDetails mt-5 mb-5 shadow p-3 mb-5 rounded" style={{width: '80%', margin: 'auto'}}>
                    <h1 className="text-center mb-3">Product Details</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img src={`http://localhost:5550/images/`+product.image} className="card-img details-img p-3 text-center" 
                                style={{width:'100%', aspectRatio: '5/5' /* dimension : 800px x 800px */}} alt={product.title}/>
                            </div>
                            <div className="col-8">
                                <h4 className="card-title text-center pt-3">{product.title}</h4>
                                <h6 className="card-text text-center">{product.category}</h6>
                                <p className="card-text ps-3">{product.description}</p>
                                <h6 className="card-quantity text-center">There is {product.quantity} piece(s) available of this products in the stock</h6>
                                <h6 className="card-rating text-center">Rated {product.ratingRate} / 5.0 from {product.ratingCount} people</h6>
                                <h5 className="card-price text-center">{product.price} $</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}