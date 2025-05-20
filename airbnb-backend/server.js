require('dotenv').config();
const express = require('express');
const cors = require('cors');
const client = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/listings', require('./routes/listings'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 3001;

client.connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
