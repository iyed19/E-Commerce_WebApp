import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import {MDBContainer , MDBInput, MDBTextArea} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

export default function AddProduct(){

    const [categories, setCategories] = useState([]); //come from database
    const [selectedCategory , setSelectedCategory] = useState(''); //selected by admin
    const [formData, setFormData] = useState({});
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [quantity , setQuantity] = useState(0);
    const [price , setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [alertKey, setAlertKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes] = await Promise.all([
                    axios.get('http://localhost:5550/getCategories')
                ]);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        const selectedCategoryData = categories.find(cat => cat.category === category);
        setFormData(selectedCategoryData || {});
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('selectedCategory', selectedCategory);
        data.append('description', description);
        data.append('price', price);
        data.append('quantity', quantity);
        if (image) {
            data.append('image', image);
        }

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        
        axios.post('http://localhost:5550/addProduct', data , {
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
        setSelectedCategory('');
        setDescription('');
        setQuantity(0);
        setPrice(0);
        setImage(null);
    }

    const filteredKeys = Object.keys(formData).filter(key => key !== '_id' && key !== 'category');

    return(
        <>
            <div className="row mt-3">
                <div>
                    <div className="login-background shadow p-3 mb-5 bg-body-tertiary rounded">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <MDBContainer className="p-1 d-flex flex-column w-50">
                                <h1 className='text-center mb-4'>Add Products</h1>
                                <select getValue={selectedCategory} onChange={handleCategoryChange} className="form-select mb-4" aria-label="Default select example" >
                                    <option selected>Product Category</option>
                                    {categories.map((ctg) => {
                                        return(
                                            <option key={ctg.id} value={ctg.category}>{ctg.category}</option>
                                        )
                                    })}
                                </select>

                                <MDBInput wrapperClass='mb-4'  id='title' type='text' placeholder='Product Title' required 
                                onChange={(e)=>setTitle(e.target.value)}/>

                                {selectedCategory && (
                                    <div>
                                        {filteredKeys.map((key) => (Array.isArray(formData[key]) ? (
                                            <div key={key}>
                                                <select id={key} name={key} className="form-select mb-4" onChange={handleChange} required>
                                                    <option value="">--Select {key}--</option>
                                                    {formData[key].map((item, index) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            ) : typeof formData[key] === 'boolean' ? (
                                            <div key={key}>
                                                <select id={key} name={key} className="form-select mb-4" onChange={handleChange}>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </div>
                                            ) : (
                                            <div key={key}>
                                                <MDBInput type="text" id={key} name={key} value={formData[key]} onChange={handleChange} readOnly className="mb-4" />
                                            </div>
                                            )
                                        ))}
                                    </div>
                                )}
                                
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