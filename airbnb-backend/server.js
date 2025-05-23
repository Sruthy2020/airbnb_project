const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const listingRoutes = require("./routes/listings");
const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.MONGO_URI)

.then(() => app.listen(process.env.PORT || 3001, () =>
  console.log(`Server running on port ${process.env.PORT || 3001}`)))
.catch((err) => console.error(err));
