import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
import { useCart } from "react-use-cart";

export default function ProductCard(props){
    const {product} = props;
    const {addItem} = useCart();

    return(
        <>
            <div className="card text-center">
            <Link to={`${product._id}`}><img src={`http://localhost:5550/images/`+product.image} className="card-img-top card-img p-2" /></Link>
                <div className="card-body">
                    <h6 className="card-title">{product.title}</h6>
                    {/* <p className="card-rate">Rated {product.ratingRate} / 5.0 from {product.ratingCount} people</p> */}
                    <h5 className="card-price">{product.price} $</h5>
                    <h6 className="card-quantity mb-2">
                        {product.quantity > 5 ? (
                            <span style={{color: "#47BF20"}}>In Stock</span>
                        ) : product.quantity <= 5 && product.quantity > 0 ? (
                            <span style={{color: "orange"}}>Limited Quantity Left</span>
                        ) : (
                            <span style={{color: "red"}}>Out Of Stock</span>
                        )}
                    </h6>
                    <div className="">
                        <button className="btn btn-success me-2">Buy Now</button>
                        <button className="btn btn-warning" onClick={() => addItem({ id: product._id, ...product })}>Add To Cart</button>
                        {/* <button className="btn" style={{backgroundColor: "yellow"}}>Buy Now</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}