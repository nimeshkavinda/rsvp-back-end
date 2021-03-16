import express from "express";
import bodyParser from "body-parser";
// import upcomingEvents from "./data";
// import pastEvents from "./data";

const featuredEvent = [
  {
    id: 1,
    name: "Google Crowdsource 2021",
    date: "Wednesday, March 17, 2021",
    time: "10:00 AM to 12:00 PM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Crowdsource is a crowdsourcing platform developed by Google intended to improve a host of Google services through the user-facing training of different algorithms. Crowdsource was released for Android on the Google Play store on August 29, 2016, and is also available on the web.",
    imageUrl: "/assets/1.jpg",
    rsvpUrl: "https://fossnsbm.org/events/",
  },
];

const upcomingEvents = [
  {
    id: 1,
    name: "Google Crowdsource",
    date: "Thursday, February 25, 2021",
    time: "6:00 PM to 3:00 AM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl: "/assets/1.jpg",
    rsvpUrl: "",
  },
  {
    id: 2,
    name: "ExpressJS Workshop",
    date: "Thursday, February 25, 2021",
    time: "6:00 PM to 3:00 AM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl: "/assets/2.jpeg",
    rsvpUrl: "",
  },
  {
    id: 3,
    name: "Google Crowdsource",
    date: "Thursday, February 25, 2021",
    time: "6:00 PM to 3:00 AM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl: "/assets/3.jpg",
    rsvpUrl: "",
  },
];

const pastEvents = [
  {
    id: 1,
    name: "Hash Code",
    date: "Thursday, February 25, 2021",
    time: "6:00 PM to 3:00 AM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl: "/images/4.jpg",
    rsvpUrl: "",
  },
  {
    id: 2,
    name: "SFD 2020",
    date: "Thursday, February 25, 2021",
    time: "6:00 PM to 3:00 AM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl: "/images/5.jpg",
    rsvpUrl: "",
  },
  {
    id: 3,
    name: "Mozilla Monthly Meetup",
    date: "Thursday, February 25, 2021",
    time: "6:00 PM to 3:00 AM GMT+5:30",
    venue: "FOC C2-002, NSBM Green University",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.",
    imageUrl: "/images/6.jpg",
    rsvpUrl: "",
  },
];

const app = express();

// const db = require('./models/mongo');

// db.connect(() => {
//   app.listen(process.env.PORT || 5555, function () {
//     console.log(`Listening`);
//   });
// });

app.get("/test", (req, res) => {
  res.send("testing");
});

app.get("/api/events", (req, res) => {
  res.status(200).json(featuredEvent);
});

app.get("/api/pastevents", (req, res) => {
  res.status(200).json(pastEvents);
});

app.listen(8000, () => {
  console.log("server is listening");
});
