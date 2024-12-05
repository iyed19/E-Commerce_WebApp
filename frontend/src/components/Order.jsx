import React , { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {MDBContainer , MDBInput, MDBTextArea} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { useCart } from "react-use-cart";

export default function Order() {

    const [adresse , setAdresse] = useState('');
    const [city , setCity] = useState('');
    const [postalCode , setPostalCode] = useState(0);
    const [phoneNumber , setPhoneNumber] = useState(0);
    const [email , setEmail] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [message, setMessage] = useState('');
    const [alertKey, setAlertKey] = useState(0);

    const {
        items,
        totalItems,
        totalUniqueItems,
        cartTotal
    } = useCart();

    const handleDeliveryChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5550/addOrder', {adresse,city,postalCode,phoneNumber,email,deliveryMethod,items,totalItems,cartTotal})
        .then(res => {  
            console.log("Data sent!");
            setMessage(res.data.msg);
            setAlertKey(prevKey => prevKey + 1);
        })
        .catch(err => {
            console.log("Error sending data:", err.response ? err.response.data : err.message);
        });
    }

    const alertHandle = (message) => {
        if(message === "Order sent successfully!"){
            Swal.fire({
                icon: "success",
                title: "Order sent successfully!",
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

    return (
        <>
            <section className="h-100">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-normal mb-0">Adresse</h3>
                                </div>
                                <div className="card">
                                    <MDBContainer>
                                        <MDBInput wrapperClass='mb-4 mt-4'  id='adresse' type='text' placeholder='Adresse' required
                                        onChange={(e)=>setAdresse(e.target.value)}/>
                                        <MDBInput wrapperClass='mb-4'  id='city' type='text' placeholder='City' required
                                        onChange={(e)=>setCity(e.target.value)}/>
                                        <MDBInput wrapperClass='mb-4'  id='postalCode' type='number' placeholder='Postal Code' required
                                        onChange={(e)=>setPostalCode(e.target.value)}/>
                                        <MDBInput wrapperClass='mb-4'  id='phoneNumber' type='number' placeholder='Phone Number' required
                                        onChange={(e)=>setPhoneNumber(e.target.value)}/>
                                        <MDBInput wrapperClass='mb-4'  id='email' type='email' placeholder='Email' required
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                    </MDBContainer>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-normal mb-0 mt-5">Delivery Method</h3>
                                </div>
                                <div className="card">
                                    <MDBContainer>
                                        <div className='mt-3 mb-3'>
                                            <input className="form-check-input me-2" type="radio" id="ups" name="deliveryMethod" onChange={handleDeliveryChange}/>
                                            <label className="form-check-label me-5" for="flexRadioDefault1" value="Ups"> Ups </label>
                                            <span className='ms-5'>7$</span><br />
                                        </div>
                                        <div className='mb-3'>
                                            <input className="form-check-input me-2" type="radio" id="aramex" name="deliveryMethod" onChange={handleDeliveryChange}/>
                                            <label className="form-check-label me-5" for="flexRadioDefault1"> Aramex </label>
                                            <span className='ms-5'>5$</span><br />
                                        </div>
                                        <div className='mb-3'>
                                            <input className="form-check-input me-2" type="radio" id="pickupfromstore" name="deliveryMethod" onChange={handleDeliveryChange}/>
                                            <label className="form-check-label" for="flexRadioDefault1"> Pick up in store </label>
                                            <span className='ms-5 text-center'>Free</span>
                                        </div>
                                    </MDBContainer>
                                </div>
                                <button className="mb-4 mt-4 btn btn-primary" type='submit'>Order</button>
                            </form> 
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}