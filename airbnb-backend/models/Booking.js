const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listing_id: String,
  startDate: Date,
  endDate: Date,
  name: String,
  email: String,
  daytimePhone: String,
  mobilePhone: String,
  postalAddress: String,
  homeAddress: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
