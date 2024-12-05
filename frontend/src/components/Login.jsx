import React, { useState } from 'react';
import '../styles/L&S.css';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Login() {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertKey, setAlertKey] = useState(0);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5550/login', {email, password})
        .then(res => {
            if(res.data.msg === 'Success'){
                navigate('/');
            }else{
                setMessage(res.data.msg);
                setAlertKey(prevKey => prevKey + 1);
                setFailedAttempts(prevAttempts => prevAttempts + 1);
            }
        })
        .catch(err => {
            if (err.response) {
              setMessage(err.response.data.msg);
              setAlertKey(prevKey => prevKey + 1);
              setFailedAttempts(prevAttempts => prevAttempts + 1);
            }
          });
    }

    const alertHandle = (message) => {
        if (failedAttempts >= 3) {
            Swal.fire({
                icon: "error",
                title: "Too Many Failed Attempts",
                text: "You have entered the wrong password 3 times. Please try again later or reset your password.",
                footer: '<a href="#">Forgot password?</a>'
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }else if(message && message != "Success"){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Forgot password?</a> or perhaps the user with this email does not exist.'
            });
        }
    }

    React.useEffect(() => {
        alertHandle(message);
    }, [alertKey]);

  return (
    <div className="login-background shadow p-3 mb-5 bg-body-tertiary rounded">
        <form onSubmit={handleSubmit}>
            <MDBContainer className="d-flex flex-column w-50">
                <h1 className='text-center mb-4'>Login</h1>
                <MDBInput wrapperClass='mb-4'  id='email' type='email' placeholder='Email address' required
                onChange={(e)=>setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4'  id='password' type='password' placeholder='Password' required
                onChange={(e)=>setPassword(e.target.value)}/>
                <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                </div>
                <button className="mb-4 btn btn-primary" type='submit'>Login</button>
                <div className="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                </div>
            </MDBContainer>
        </form>
    </div>
  );
}