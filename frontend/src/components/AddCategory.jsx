import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import {MDBContainer , MDBInput, MDBTextArea} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

export default function AddCategory(){

    const [title , setTitle] = useState('');
    const [category , setCategory] = useState('');
    const [description , setDescription] = useState('');
    const [quantity , setQuantity] = useState(0);
    const [price , setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [alertKey, setAlertKey] = useState(0);

    const handleSelectChange = (value) => {
        setCategory(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:5550/addProduct', {title, category, description, price, quantity, image} , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {  
            setMessage(res.data.msg);
            setAlertKey(prevKey => prevKey + 1);
            if (res.data.msg === "Product added successfully!") {
                resetForm();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const alertHandle = (message) => {
        if(message === "Product added successfully!"){
            Swal.fire({
                icon: "success",
                title: "Product added successfully!",
                showConfirmButton: false,
                timer: 1800
              });
        }else if(message === "Product quantity updated successfully!"){
            Swal.fire({
                icon: "success",
                title: "Product quantity updated successfully!",
                showConfirmButton: false,
                timer: 1800
              });
        }else if(message === "error"){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showConfirmButton: true,
            });
        }
    }

    useEffect(() => {
        alertHandle(message);
    }, [alertKey]);

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setDescription('');
        setQuantity(0);
        setPrice(0);
        setImage(null);
    }

    return(
        <>
            <div className="row mt-3">
                <div>
                    <div className="login-background shadow p-3 mb-5 bg-body-tertiary rounded">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <MDBContainer className="p-1 d-flex flex-column w-50">
                                <h1 className='text-center mb-4'>Add Products</h1>
                                {/* <MDBInput wrapperClass='mb-4'  id='category' placeholder='Product Category' required
                                onChange={(e)=>setCategory(e.target.value)}/> */}
                                <select getValue={handleSelectChange} className="form-select mb-4" aria-label="Default select example" >
                                    <option selected>Product Category</option>
                                    <option value="SMARTPHONE">SMARTPHONE</option>
                                    <option value="LAPTOP">LAPTOP</option>
                                    <option value="GAMING LAPTOP">GAMING LAPTOP</option>
                                </select>
                                <MDBInput wrapperClass='mb-4'  id='title' type='text' placeholder='Product Title' required 
                                onChange={(e)=>setTitle(e.target.value)}/>
                                <MDBTextArea wrapperClass='mb-4'  id='description' type='text' placeholder='Product Description' required 
                                onChange={(e)=>setDescription(e.target.value)}/>
                                <MDBInput wrapperClass='mb-4'  id='price' type='number' placeholder='Product Price' required 
                                onChange={(e)=>setPrice(e.target.value)}/>
                                <MDBInput wrapperClass='mb-4'  id='quantity' type='number' placeholder='Product Quantity' required 
                                onChange={(e)=>setQuantity(e.target.value)}/>
                                <MDBInput wrapperClass='mb-4'  id='image' type='file' placeholder='Product Image' required 
                                accept='.jpg, .jpeg, .png, .JPG, .PNG, .JPEG' onChange={(e) => setImage(e.target.files[0])}/>
                                <button className="mb-3 btn btn-success" type='submit'>Add</button>
                            </MDBContainer>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}