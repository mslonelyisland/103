const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./User");
const ClubModel = require("./Club"); // Correct path to clubModel.js

const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/nodeexpressdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected :)"))
  .catch((err) => console.log(err));
  
// retrieve all users
app.get("/", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
// retrieve user by id
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id }) //_id from mongo
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// create a user
app.post("/create", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

//update the info
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}),
  // delete user
  app.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

// For clubs
  // Retrieve all clubs
app.get("/clubs", (req, res) => {
  ClubModel.find()
    .then((clubs) => res.json(clubs))
    .catch((err) => res.json(err));
});

// Create a club
app.post("/createclub", (req, res) => {
  const { name, description, numberOfMembers } = req.body;
  ClubModel.create({ name, description, numberOfMembers })
    .then((club) => res.json(club))
    .catch((err) => res.json(err));
});

// Update a club
app.put("/updateclub/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, numberOfMembers } = req.body;
  ClubModel.findByIdAndUpdate(
    id,
    { name, description, numberOfMembers },
    { new: true } // Return the updated document
  )
    .then((club) => res.json(club))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
