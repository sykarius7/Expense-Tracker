import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import './Login.css'; 
import './Main'
export default function Login() {
    const navigate = useNavigate(); 
    const [details, setDetails] = useState([]);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8001/auth')
            .then(response => {
                setDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching authentication details:', error);
            });
    }, []);

    const handleLogin = () => {
        // Check if email and password match any user details
        const user = details.find(d => d.email === email && d.password === password);
        if (user) {
            navigate('/main'); // Navigate to minihomepage on successful login
        } else {
            setErrorMessage("Please enter the correct credentials");
        }
    };

    const handleHome = () => {
        navigate('/'); // Navigate back to home page
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="userName">Email:</label>
                    <input
                        type="email"
                        id="userName"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div className="error-message">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>

                <div className="buttons">
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>

                    <button type="button" className="btn btn-primary" onClick={handleHome}>
                        Home
                    </button>
                </div>
            </form>
        </div>
    );
}

