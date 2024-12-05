import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdminProducts(){
    const [products , setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5550/getProducts')
            .then(response => {setProducts(response.data);});
    }, []);

    const deleteProduct = (prd) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success ms-1",
              cancelButton: "btn btn-danger me-1"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5550/deleteProduct/${prd._id}`)
                    .then(response => {
                        setProducts(products.filter(product => product._id !== prd._id));
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "The product has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: "There was an error deleting the product.",
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "The product is safe :)",
                icon: "error"
              });
            }
          });
    }

    return(
        <>
            <div className="row mt-3">
                <div className="col-1">
                </div>
                <div className="col-10">
                    <h2>Products</h2>
                    <Link to={'add'} className="btn btn-success mt-3"> Add New Product</Link>
                    <table className="table table-striped  mt-5">
                        <thead className="text-center">
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((prd) => {
                                return(
                                    <tr key={prd.id}>
                                        <td className="ps-5">{prd.title}</td>
                                        <td className="text-center">{prd.category}</td>
                                        <td className="text-center">{prd.quantity}</td>
                                        <td className="text-center">{prd.price}</td>
                                        <td className="text-center">
                                            <Link to={`${prd._id}`} className="btn btn-info btn-sm me-2">View</Link>
                                            <Link to={`edit/${prd._id}`}  className="btn btn-warning btn-sm me-2">Edit</Link>
                                            <button className="btn btn-danger btn-sm me-2" onClick={() => deleteProduct(prd)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}