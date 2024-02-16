const mongoose = require('mongoose');

// Club Schema
const ClubSchema = new mongoose.Schema({
    name: String,
    description: String,
    numberOfMembers: Number,
});

const ClubModel = mongoose.model("clubs", ClubSchema);

module.exports = ClubModel;
