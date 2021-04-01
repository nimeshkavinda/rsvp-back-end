import express from "express";
// import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import path from "path";
import history from "connect-history-api-fallback";
import cors from "cors";
// import { error } from "console";
import * as admin from "firebase-admin";

const app = express();

// app.use(
//   express.static(path.resolve(__dirname, "../dist"), {
//     maxAge: "1y",
//     eTag: false,
//   })
// );

// const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// admin
//   .auth()
//   .getUsers([{ email: 'nimesh@fossnsbm.org' }])
//   .then((getUsersResult) => {
//     console.log("Successfully fetched user data:");
//     getUsersResult.users.forEach((userRecord) => {
//       console.log(userRecord);
//     });

//     console.log("Unable to find users corresponding to these identifiers:");
//     getUsersResult.notFound.forEach((userIdentifier) => {
//       console.log(userIdentifier);
//     });
//   })
//   .catch((error) => {
//     console.log("Error fetching user data:", error);
//   });

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(history());
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
  const event = await db.collection("events").findOne({ id: eventId });
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
    console.log("document inserted");
    client.close();
  });
  res.status(200).json("success");
});

app.put("/api/events", async (req, res) => {
  // const { eventId } = req.params;
  const event = {
    id: req.body.id,
    name: req.body.name,
    datetime: req.body.datetime,
    venue: req.body.venue,
    description: req.body.description,
    organizer: req.body.organizer,
    speaker: req.body.speaker,
    organizerPhotoUrl: req.body.organizerPhotoUrl,
    speakerPhotoUrl: req.body.speakerPhotoUrl,
    thumbnailUrl: req.body.thumbnailUrl,
    rsvpUrl: req.body.rsvpUrl,
  };
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
  await db
    .collection("events")
    .updateOne(
      { id: req.body.id },
      {
        $set: {
          id: req.body.id,
          name: req.body.name,
          datetime: req.body.datetime,
          venue: req.body.venue,
          description: req.body.description,
          organizer: req.body.organizer,
          speaker: req.body.speaker,
          organizerPhotoUrl: req.body.organizerPhotoUrl,
          speakerPhotoUrl: req.body.speakerPhotoUrl,
          thumbnailUrl: req.body.thumbnailUrl,
          rsvpUrl: req.body.rsvpUrl,
        },
      },
      { upsert: true }
    )
    .then(() => {
      res.status(201).json({
        message: "event updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.delete("/api/events/:eventId", async (req, res) => {
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
  await db.collection("events").deleteOne({ id: eventId });
  res.status(200).json("success");
  client.close();
});

app.delete("/api/users/:userId"),
  async (req, res) => {
    const { userId } = req.params;
    admin
      .auth()
      .deleteUser(userId)
      .then(() => {
        console.log("Successfully deleted user");
        res.status(200).json("success");
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
        res.status(400).json("failure");
      });
  };

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });
