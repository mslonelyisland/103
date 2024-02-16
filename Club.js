const mongoose = require('mongoose');

// Club Schema
const ClubSchema = new mongoose.Schema({
    clubName: String,
    description: String,
    numberOfMembers: Number,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] // Reference to User model
});

const ClubModel = mongoose.model("clubs", ClubSchema);

module.exports = ClubModel;
