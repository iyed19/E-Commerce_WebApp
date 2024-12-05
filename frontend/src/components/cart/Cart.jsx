import CartProducts from "./CartProducts";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

export default function Cart(){
    const {
        items,
        totalItems,
        totalUniqueItems,
        isEmpty,
        cartTotal,
        emptyCart
    } = useCart();   

    if (isEmpty) return(
        <div className="container card" style={{marginTop: "14%"}}>
            <h1 className="text-center p-5">Your Cart is empty</h1>
        </div>
    ) 

    return(
        <section className="h-100">
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-10">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-normal mb-0">Shopping Cart ({totalItems})</h3>
                        </div>
                        {items.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <CartProducts item={item}/> 
                                </div>
                            )
                        })}
                        <div className="card mb-4">
                            <div className="card-body p-4 d-flex flex-row">
                                <div data-mdb-input-init className="form-outline flex-fill">
                                    <input type="text" id="form1" className="form-control form-control-lg" placeholder="Discound code"/>
                                </div>
                                <button type="button" className="btn btn-outline-warning btn-lg ms-3">
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div className="card d-flex justify-content-between mb-4 p-4">
                            <h3 className="fw-normal mb-0">Total Price : {cartTotal} $</h3>
                        </div>
                        <div className="card">
                            <div className="card-body p-4">
                                <Link to="/order" className="btn btn-warning btn-block btn-lg" style={{width: "100%"}}>
                                    Proceed to Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}