const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;

//get all listings with optional filters...
router.get("/filter", async (req, res) => {
  const { location, type, bedrooms } = req.query;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("sample_airbnb");
    const collection = db.collection("listingsAndReviews");

    const query = {
      ...(location && {
        "address.market": { $regex: new RegExp(`^${location}$`, "i") }, 
      }),
      ...(type && { property_type: type }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
    };
    console.log("Final MongoDB Query:", query); 

    const limit = parseInt(req.query.limit);
    const listings = await collection.find(query).limit(limit).toArray();

    res.json(listings);
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

router.get("/random", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("sample_airbnb");
    const limit = parseInt(req.query.limit);
    const listings = await db.collection("listingsAndReviews")
      .aggregate([{ $sample: { size: limit } }])
      .toArray();

    res.json(listings);
  } catch (err) {
    console.error("Failed to fetch random listings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});


module.exports = router;
