const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

router.get("/filter", async (req, res) => {
  const { location, type, bedrooms } = req.query;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("sample_airbnb");
    const collection = db.collection("listingsAndReviews");

    const query = {
      ...(location && { "address.market": location }),
      ...(type && { property_type: type }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
    };
    console.log("Final MongoDB Query:", query); 

    const limit = parseInt(req.query.limit) || 10;
    const listings = await collection.find(query).limit(limit).toArray();

    res.json(listings);
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
