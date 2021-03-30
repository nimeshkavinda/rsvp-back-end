import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import path from "path";
import history from "connect-history-api-fallback";
import cors from "cors";

const app = express();
// const mongo = require("../mongo");

// mongo.connect(() => {
//   app.listen(process.env.PORT || 5555, function () {
//     console.log("mongo client is connected");
//   });
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.resolve(__dirname, "../dist"), {
    maxAge: "1y",
    eTag: false,
  })
);
app.use(express.json({limit: '200mb', extended: true}));
app.use(express.urlencoded());
// app.use(express.bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.json() = {
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true}
// });
app.use(history());
app.use(cors());

app.listen(process.env.PORT || 8000, () => {
  console.log("server is listening");
});

app.get("/test", (req, res) => {
  res.send("testing");
});

app.get("/api/events", async (req, res) => {
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS
      ? "mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}>@cluster0.bomle.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority"
      : "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db(process.env.MONGO_DBNAME || "foss-rsvp");
  const events = await db.collection("events").find({}).toArray();
  res.status(200).json(events);
  client.close();
});

app.get("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS
      ? "mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}>@cluster0.bomle.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority"
      : "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db(process.env.MONGO_DBNAME || "foss-rsvp");
  const event = await db.collection("events").findOne({}, { id: eventId });
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json("Not found");
  }
  client.close();
});

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/fetch', (req, res) => {
//   request(
//     { url: req.query.url },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).send('error');
//       }
//       res.send(body);
//     }
//   )
// });

app.post("/api/events", async (req, res) => {
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS
      ? "mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}>@cluster0.bomle.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority"
      : "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db(process.env.MONGO_DBNAME || "foss-rsvp");
  await db.collection("events").insertOne(req.body, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "--/dist/index.html"));
});
