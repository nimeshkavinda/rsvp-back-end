import express from "express";

const app = express();

const db = require('../src/models/mongo');

db.connect(() => {
  app.listen(process.env.PORT || 5555, function () {
    console.log(`Listening`);
  });
});
