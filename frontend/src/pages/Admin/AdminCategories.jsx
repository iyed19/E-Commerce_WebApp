import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdminCategories(){
    const [categories , setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5550/getCategories')
            .then(response => {setCategories(response.data);});
    }, []);

    const deleteCategory = (prd) => {
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
                axios.delete(`http://localhost:5550/deleteCategory/${prd._id}`)
                    .then(response => {
                        setCategories(categories.filter(product => product._id !== prd._id));
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
                    <h2>Categories</h2>
                    <Link to={'add'} className="btn btn-success mt-3"> Add New Category</Link>
                    <table className="table table-striped  mt-5">
                        <thead className="text-center">
                            <tr>
                                <th>Category</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((ctg) => {
                                return(
                                    <tr key={ctg.id}>
                                        <td className="text-center">{ctg.category}</td>
                                        <td className="text-center">
                                            <Link to={`${ctg._id}`} className="btn btn-info btn-sm me-2">View</Link>
                                            <Link to={`edit/${ctg._id}`}  className="btn btn-warning btn-sm me-2">Edit</Link>
                                            <button className="btn btn-danger btn-sm me-2" onClick={() => deleteCategory(ctg)}>Delete</button>
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