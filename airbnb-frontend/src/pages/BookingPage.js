import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './global.css';
import { useLocation } from 'react-router-dom';


const BookingPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const listingId = params.get("listing_id");
  
  const navigate = useNavigate();
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    mobile: '',
    postal: '',
    residential: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/bookings', {
        listing_id: listingId,
        startDate: form.startDate,
        endDate: form.endDate,
        name: form.name,
        email: form.email,
        daytimePhone: form.postal,    
        mobilePhone: form.mobile,
        postalAddress: form.postal,
        homeAddress: form.residential,
      });

      navigate('/confirmation');
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  return (
    <div className="booking-container">
      <h1>Let's book the property</h1>

      <form onSubmit={handleSubmit} className="booking-form">
        <h3>Booking Details</h3>
        <label>Check In:</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <label>Check Out:</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <h3>Your Details</h3>
        <label>Your Name:</label>
        <input
          name="name"
          placeholder="Please your name (mandatory)"
          required
          value={form.name}
          onChange={handleChange}
        />

        <label>Email Address:</label>
        <input
          name="email"
          placeholder="Please your email address (mandatory)"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label>Your Mobile No:</label>
        <input
          name="mobile"
          placeholder="Please your mobile no:(04xxxx xxx xxx) (mandatory)"
          required
          value={form.mobile}
          onChange={handleChange}
        />

        <label>Postal Address:</label>
        <input
          name="postal"
          placeholder="Please provide your postal address."
          value={form.postal}
          onChange={handleChange}
        />

        <label>Residential Address:</label>
        <input
          name="residential"
          placeholder="Please provide your residential address. (cannot be a post box address)"
          value={form.residential}
          onChange={handleChange}
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
