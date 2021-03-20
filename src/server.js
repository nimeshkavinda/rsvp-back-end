import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
// const db = require("../mongo");

// db.connect(() => {
//   app.listen(process.env.PORT || 5555, function () {
//     console.log("mongo client is connected");
//   });
// });

app.listen(8000, () => {
  console.log("server is listening");
});

app.get("/test", (req, res) => {
  res.send("testing");
});

app.get("/api/events", async (req, res) => {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("foss-rsvp");
  const events = await db.collection("events").find({}).toArray();
  res.status(200).json(events);
  client.close();
});

app.get("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("foss-rsvp");
  const event = await db.collection("events").findOne({ id: eventId });
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json("Not found");
  }
  client.close();
});
