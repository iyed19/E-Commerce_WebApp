import React, { useState } from 'react';
import { MDBContainer , MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import validator from 'validator';
import { Link , useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignUp() {
    
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [adresse , setAdresse] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [phoneNumber , setPhoneNumber] = useState(0);
    const [codePostal , setCodePostal] = useState(0);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            setMessage('Invalid email address');
            return;
        }
        
        axios.post('http://localhost:5550/signup', {firstName, lastName, adresse, email, password, phoneNumber, codePostal})
        .then(res => {setMessage(res.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 1800);
        })
        .catch(err => {
            if (err.response) {
              setMessage(err.response.data.message);
            }
        });
    }

    return (
        <div className="login-background shadow p-3 mb-5 bg-body-tertiary rounded">
            <form onSubmit={handleSubmit}>
                <MDBContainer className="p-1 d-flex flex-column w-50">
                    <h1 className='text-center mb-4'>Sign Up</h1>
                    <MDBInput wrapperClass='mb-4'  id='firstName' type='text' placeholder='First Name' required 
                    onChange={(e)=>setFirstName(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4'  id='lastName' type='text' placeholder='Last Name' required
                    onChange={(e)=>setLastName(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4'  id='adresse' type='text' placeholder='Address' required
                    onChange={(e)=>setAdresse(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4'  id='email' type='email' placeholder='Email address' required 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4'  id='password' type='password' placeholder='Password' required 
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4'  id='phoneNumber' type='number' placeholder='Phone Number' required
                    onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4'  id='codePostal' type='number' placeholder='Code Postal (Zip Code)' required
                    onChange={(e)=>setCodePostal(e.target.value)}/>
                    <button className="mb-4 btn btn-primary" type='submit'>Sign up</button>
                    {message && (
                        <p className='text-center mb-4'>
                            {message === "User already exists, please choose a different email" ?
                            <>{message} or use this link <Link to="#">Forgot password?</Link> to help you</>:message}
                        </p>
                    )}
                </MDBContainer>
            </form>
        </div>
  );
}