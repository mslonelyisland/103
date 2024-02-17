const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./User");
const ClubModel = require("./Club"); 
var cors = require('cors')

const app = express();
const port = 3001;
app.use(cors())

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/nodeexpressdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected :)"))
  .catch((err) => console.log(err));
  
// retrieve all users, working
app.get("/", (req, res) => {
  UserModel.find()
    .populate('club') // Populate the 'club' field with da club details
    .then((users) => {
      const formattedUsers = users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age.toString(), 
        club: user.club ? user.club.clubName : '', 
        position: user.position
      }));
      res.json(formattedUsers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// retrieve user by id, working
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .populate('club')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const formattedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age.toString(),
        club: user.club ? user.club.clubName : '',
        position: user.position
      };
      res.json(formattedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});



//Create user, working
app.post("/createuser", async (req, res) => {
  const { name, email, age, position, club } = req.body;

  try {
    // Create the user
    const newUser = await UserModel.create({ name, email, age, position, club });

    if (club) {
      const updatedClub = await ClubModel.findByIdAndUpdate(
        club,
        { $addToSet: { users: newUser._id } }, // Add the user's ObjectId to the club's users list
        { new: true }
      );

      if (!updatedClub) {
        // if no club
        return res.status(404).json({ error: "Club not found" });
      }
    }

    res.json(newUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update the info
app.put("/updateuser/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, age, position, clubName } = req.body; 

  try {
    // Update user information including club name
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        age,
        position,
        
      },
      { new: true } // Return the updated document
    );

    // If clubName is provided, find the club and add the user to it
      if (clubName) {
        const club = await ClubModel.findOneAndUpdate(
          { clubName: clubName },
          { $addToSet: { users: user._id } }, 
          { new: true }
        );
        user.club = club._id;
        await user.save();
      }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete user
app.delete("/deleteuser/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // Find and delete the user from the database
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the user to the club
    if (deletedUser.club) {
      const updatedClub = await ClubModel.findByIdAndUpdate(
        deletedUser.club,
        { $pull: { users: userId } }, // Remove the user's ObjectId from the club's users array
        { new: true }
      );
      if (!updatedClub) {
  
        return res.status(404).json({ error: "Club not found" });
      }
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// For clubs
// Retrieve all clubs
app.get("/clubs", (req, res) => {
  ClubModel.find()
    .then((clubs) => res.json(clubs))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
});

// Retrieve users in a specific club, working
app.get("/clubs/:id/users", (req, res) => {
  const clubId = req.params.id;
  UserModel.find({ club: clubId })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Create a club, working
app.post("/createclub", (req, res) => {
  const { clubName, description, numberOfMembers } = req.body;
  ClubModel.create({ clubName, description, numberOfMembers })
    .then((club) => res.json(club))
    .catch((err) => res.json(err));
});

// Update a club,working
app.put("/updateclub/:id", (req, res) => {
  const id = req.params.id;
  const { clubName, description, numberOfMembers } = req.body;
  ClubModel.findByIdAndUpdate(
    id,
    { clubName, description, numberOfMembers },
    { new: true } // Return the updated document
  )
    .then((club) => res.json(club))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
