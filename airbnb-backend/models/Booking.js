const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listing_id: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  daytimePhone: String,
  mobilePhone: { type: String, required: true },
  postalAddress: String,
  homeAddress: String,
});


module.exports = mongoose.model("Booking", bookingSchema);
