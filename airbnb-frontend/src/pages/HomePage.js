import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import './global.css';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [limit, setLimit] = useState(10);
  const [searchTriggered, setSearchTriggered] = useState(false); // ✅ flag to control useEffect

  const fetchListings = async (params) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get(`http://localhost:3001/api/listings/filter`, {
        params: { ...params, limit },
      });
      setListings(res.data);
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLimit(10); 
    setSearchTriggered(true);
    fetchListings({ location, type: propertyType, bedrooms });
  };

  useEffect(() => {
    if (searchTriggered) {
      fetchListings({ location, type: propertyType, bedrooms });
    }
  }, [limit]);

  return (
    <div className="homepage">
      <h1>Listings that match your preferences</h1>
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

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      {listings.length > 0 && (
        <h3 style={{ marginTop: '2rem' }}>
          {listings.length} Listings that match your preferences
        </h3>
      )}

      <div className="results">
        {loading ? (
          <p>Loading listings...</p>
        ) : listings.length === 0 && searchTriggered ? (
          <p>No listings found. Try different filters.</p>
        ) : (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        )}

        {listings.length >= limit && searchTriggered && (
           <div className="load-more-container">
          <button
            onClick={() => setLimit(limit + 10)}
            className="load-more-btn"
          >
            Load More
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
