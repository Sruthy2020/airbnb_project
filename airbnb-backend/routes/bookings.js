const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI

//create a new booking...
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to save booking" });
  }
});

//get all bookings...
router.get("/", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("sample_airbnb");
    const listingsCollection = db.collection("listingsAndReviews");

    const bookings = await Booking.find();
    const listingIds = bookings.map(b => b.listing_id);
    const listings = await listingsCollection.find({ _id: { $in: listingIds } }).toArray();
    const enrichedBookings = bookings.map((booking) => {
      const matchedListing = listings.find(
        (listing) => listing._id === booking.listing_id
      );

      return {
        ...booking.toObject(),
        listing: matchedListing || null,
      };
    });

    res.json(enrichedBookings);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
