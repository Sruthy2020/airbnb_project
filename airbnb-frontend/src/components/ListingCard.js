import '../pages/global.css';

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card">
      <h3>
        <a href={`/bookings?listing_id=${listing._id}`} className="listing-title">
          {listing.name || "Untitled Listing"}
        </a>
      </h3>
      <p className="summary">{listing.summary || "No description provided."}</p>
      <p>
        <strong>Daily Rate:</strong>{" "}
        {listing.price && typeof listing.price === 'object' && listing.price.$numberDecimal
        ? parseFloat(listing.price.$numberDecimal).toFixed(2)
        : typeof listing.price === 'number'
        ? listing.price.toFixed(2)
        : "N/A"}
      </p>


      <p><strong>Customer Rating:</strong> {listing.review_scores?.review_scores_rating || "Not rated"}</p>
    </div>
  );
};


export default ListingCard;
