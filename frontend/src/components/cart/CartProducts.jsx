import { useCart } from "react-use-cart";

export default function CartProducts(props){
    const {
        updateItemQuantity,
        removeItem,
    } = useCart();

    const {item} = props;

    return(
        <>
            <div className="card rounded-3 mb-4">
                <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                            <img src={`http://localhost:5550/images/`+item.image} className="img-fluid rounded-3"/>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">{item.title}</p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button className="btn px-2" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512">
                                    <path fill="#3b71ca" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                </svg>
                            </button>
                            <input id="form1" min="0" name="quantity" value={item.quantity} type="number"
                            className="form-control form-control-sm" />
                            <button className="btn px-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512">
                                    <path fill="#3b71ca" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{item.itemTotal} $</h5>
                        </div>
                        <button className="btn col-md-1 col-lg-1 col-xl-1 text-end"
                        onClick={() => removeItem(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="20" viewBox="0 0 448 512">
                                <path fill="#e1475e" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}