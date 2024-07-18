

import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'; 
import { useNavigate } from 'react-router-dom'; 
const Main = () => {
    const navigate = useNavigate(); 
    function home(){
        navigate('feedBack')
    }
    return (
        <div className="intro-containerm">
            <div className="intro-contentm">
                <h2>Here are the Various Features avaliable </h2>
             
                <p className="intro-text">
                DashBoard: Displays a summary of financial transactions with options to view, add, edit, and delete transactions.

                </p>
                <p className="intro-text">
                Create Transaction : Form to input transaction details such as date, description, amount, category (e.g., income, expense), and payment method.
                </p>
                <p className='intro-text'>
                Summary View: Displays total income, expenses, and balance.

                </p>
                <div className="button-container">
                    <Link to="/dashBoard" className="btn btn-outline-primary">DashBoard</Link>
                    <Link to="/transaction" className="btn btn-outline-primary">Create Transaction</Link>
                    <Link to="/summary" className="btn btn-outline-primary">Summary View</Link>
                </div>
                <button className='exit' onClick={home}>EXIT</button>
            </div>
        </div>
    );
};

export default Main;