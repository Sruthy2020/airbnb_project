import React, { useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import './global.css';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/api/listings/search`, {
        params: { location, propertyType, bedrooms },
      });
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <h1>Find Your Ideal Stay</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter location (e.g. Barcelona)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">Any Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
        </select>
        <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
          <option value="">Any Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {listings.length > 0 && (
  <h3 style={{ marginTop: '2rem' }}>
    {listings.length} Listings that match your preferences
  </h3>
)}

<div className="results">
  {loading ? (
    <p>Loading listings...</p>
  ) : listings.length === 0 ? (
    <p>No listings found. Try searching with different filters.</p>
  ) : (
    listings.map((listing) => (
      <ListingCard key={listing._id} listing={listing} />
    ))
  )}
</div>

    </div>
  );
};

export default HomePage;
