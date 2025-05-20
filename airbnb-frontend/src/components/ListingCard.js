import { Link } from 'react-router-dom';
import '../pages/global.css';
import React from 'react';

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card">
      <h3>
        <Link to={`/book/${listing._id}`} className="listing-title">
          {listing.name || "Untitled Listing"}
        </Link>
      </h3>
      <p className="summary">{listing.summary || "No description provided."}</p>
      <p><strong>Daily Rate:</strong> {listing.price?.toFixed(2) || "N/A"}</p>
      <p><strong>Customer Rating:</strong> {listing.review_score || "Not rated"}</p>
    </div>
  );
};

export default ListingCard;
