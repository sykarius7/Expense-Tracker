import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State to track selected transaction for editing
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage if edit popup is open
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false); // State to manage if view popup is open
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Please try again later.');
    }
  };

  const updateTransaction = async (updatedTransaction) => {
    try {
      const response = await axios.put(`http://localhost:8000/transactions/${updatedTransaction.id}`, updatedTransaction);
      setTransactions(transactions.map(transaction =>
        transaction.id === updatedTransaction.id ? response.data : transaction
      ));
      closeEditPopup();
      alert('Transaction updated successfully');
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Failed to update transaction. Please try again later.');
    }
  };

  const deleteTransaction = (id) => {
    axios.delete(`http://localhost:8000/transactions/${id}`)
      .then(() => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
        alert('Transaction deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting transaction:', error);
        alert('Failed to delete transaction. Please try again later.');
      });
  };

  const openEditPopup = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditPopupOpen(true);
    // Set the form fields with the selected transaction's data
    setDate(transaction.date);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setPaymentMethod(transaction.paymentMethod);
  };

  const closeEditPopup = () => {
    setSelectedTransaction(null);
    setIsEditPopupOpen(false);
    // Clear form fields
    clearForm();
  };

  const openViewPopup = (transaction) => {
    setSelectedTransaction(transaction);
    setIsViewPopupOpen(true);
  };

  const closeViewPopup = () => {
    setSelectedTransaction(null);
    setIsViewPopupOpen(false);
  };

  const clearForm = () => {
    setDate('');
    setDescription('');
    setAmount('');
    setCategory('');
    setPaymentMethod('');
  };

  function home() {
    navigate('/feedback');
  }

  return (
    <div className="transaction-container">
      <div className="transaction-table">
        <h2>Transaction List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.paymentMethod}</td>
                <td>
                  <button onClick={() => openEditPopup(transaction)}>Edit</button>
                  <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                  <button onClick={() => openViewPopup(transaction)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {isEditPopupOpen && (
        <div className="edit-popup">
          <h2 className='et'>Edit Transaction</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateTransaction({
              id: selectedTransaction.id,
              date,
              description,
              amount,
              category,
              paymentMethod
            });
          }}>
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <label>Amount:</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <label>Category:</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <label>Payment Method:</label>
            <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required />
            <div className="edit-popup-buttons">
              <button type="submit">Update</button>
              <button onClick={closeEditPopup}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {isViewPopupOpen && (
        <div className="edit-popup">
          <h2 className='et'>View Transaction</h2>
          <div>
            <p><strong>Date:</strong> {selectedTransaction.date}</p>
            <p><strong>Description:</strong> {selectedTransaction.description}</p>
            <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
            <p><strong>Category:</strong> {selectedTransaction.category}</p>
            <p><strong>Payment Method:</strong> {selectedTransaction.paymentMethod}</p>
          </div>
          <div className="edit-popup-buttons">
            <button onClick={closeViewPopup}>Close</button>
          </div>
        </div>
      )}

      <button className='exit' onClick={home}>EXIT</button>
    </div>
  );
};

export default DashBoard;
