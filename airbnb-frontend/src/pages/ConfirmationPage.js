import React from 'react';
import { Link } from 'react-router-dom';
import './global.css';

const ConfirmationPage = () => (
  <div className="confirmation-container">
    <h2>✅ Booking Successful!</h2>
    <p>Your booking has been saved. We'll email you the details shortly.</p>
    <Link to="/" className="return-link">← Return to Homepage</Link>
  </div>
);

export default ConfirmationPage;
