import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './FeedBack.css'
const FeedBack = () => {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending feedback to a server
    
    // You can clear the form after submission if needed
    setFeedback('');
    navigate('/')
  };

  return (
    <div className='feed'>
    <div className="feedback-form">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          required
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default FeedBack;
