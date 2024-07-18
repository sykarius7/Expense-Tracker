import React, { useState } from 'react';
import './Transaction.css'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'
const Transaction=()=> {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate(); 
const createPost=()=>{
    axios.post('http://localhost:8000/transactions',{
        date,description,amount,category,paymentMethod
    })
    .then(response =>{
        
        setDate('');
        setDescription('');
        setAmount('');
        setCategory('');
        setPaymentMethod('');
    })
    .catch(error=>{
        console.error('there is a error',error)
    })
}










const send=()=>{  
    

    if (!date || !description || !amount || !category || !paymentMethod) {
      alert('Please fill out all fields');
      
    }
    else{
createPost()
    setDate('');
    setDescription('');
    setAmount('');
    setCategory('');
    setPaymentMethod('');
    alert('Transaction Added Successfully')
    
  };}
function home(){
    navigate('/feedBack')
}
  return (
    <div className="transaction-form">
         <button onClick={home} className='hi'>EXIT</button>
      <h2>Add New Transaction</h2>
      <form >
        <div className="form-control">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-control">
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-control">
          <label>Amount ($)</label>
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="form-control">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="form-control">
          <label>Payment Method</label>
          <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required />
        </div>
        <button className='send' onClick={send} type="button">Add Transaction</button>
       
      </form>
    
    </div>
  );
};

export default Transaction;
