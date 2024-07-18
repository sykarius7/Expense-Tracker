import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Summary.css';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    // Calculate totals whenever transactions change
    calculateTotals();
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Please try again later.');
    }
  };

  const calculateTotals = () => {
    let totalIncomeAmount = 0;
    let totalExpenseAmount = 0;

    transactions.forEach(transaction => {
      if (transaction.category === 'Income') {
        totalIncomeAmount += parseFloat(transaction.amount);
      } else if (transaction.category === 'Expense') {
        totalExpenseAmount += parseFloat(transaction.amount);
      }
    });

    setTotalIncome(totalIncomeAmount);
    setTotalExpense(totalExpenseAmount);
    setBalance(totalIncomeAmount - totalExpenseAmount);
  };

  function home() {
    navigate('/feedback');
  }

  return (
    <div className="transaction-container1">
      <div className="totals-container">
        <h2>Financial Summary</h2>
        <div className="totals">
          <div className="total-item">
            <h3>Total Income</h3>
            <p>${totalIncome}</p>
          </div>
          <div className="total-item">
            <h3>Total Expense</h3>
            <p>${totalExpense}</p>
          </div>
          <div className="total-item">
            <h3>Balance</h3>
            <p>${balance}</p>
          </div>
        </div>
      </div>


      <button className='exit' onClick={home}>EXIT</button>
    </div>
  );
};

export default Summary;
