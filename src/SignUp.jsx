import React, { useState } from 'react';
import './SignUp.css'; // Import your CSS file
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
const SignUp = () => {
   
        const navigate = useNavigate(); // Initialize the navigate function
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")





    const createDetails = () => {
        axios.post('http://localhost:8001/auth', {
           email,
           password 
           
        })
        .then(response => {
            
            setPassword('');
            
            setEmail('');
        })
        .catch(error => {
            console.error('There is an error while creating the post', error);
        });
    };

  



   
    const handleHome = () => {
        // Navigate to the home page (in this case, About page)
        navigate('/');
    };
    const handleSignup = () => {
        // Navigate to the home page (in this case, About page)
        if(email!=="" & password!==""){
        createDetails()
        window.alert("You Have Successfully Signed Up")}
        else{
            window.alert("Please enter valid credentails")
        }
    };


    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form  className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="button-group">
                
                    <button className='home-button' onClick={handleHome}>Home</button>
                    <button  className="signup-button" onClick={handleSignup}>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
