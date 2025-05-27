const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

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
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
});

module.exports = router;
