// About.js

import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Import your CSS file for additional styling

const About = () => {
    return (
        <div className="intro-container">
            <div className="intro-content">
                <h1>Welcome to Expense Tracker</h1>
                <p className="intro-text">
                This application helps you manage your finances effectively. Keep track of your income and expenses effortlessly.
                Add transactions, categorize them, and monitor your financial health with ease.
                </p>
                <p className="intro-text">
                Designed to simplify your financial management, it provides insightful summaries and detailed views of your transactions.
                </p>
                <p className="intro-text">
                Start organizing your finances today and achieve better control over your spending and savings!
                </p>
                <div className="button-container">
                    <Link to="/login" className="btn btn-outline-primary">Log In</Link>
                    <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default About;

