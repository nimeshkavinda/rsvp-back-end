import express from "express";

const app = express();

// const db = require('./models/mongo');

// db.connect(() => {
//   app.listen(process.env.PORT || 5555, function () {
//     console.log(`Listening`);
//   });
// });

app.get('/test', (req, res) => {res.send("testing");})

app.listen(8000, ()=> {console.log("server is listening")})