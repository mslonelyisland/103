const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'clubs' }, // Ensure 'clubs' matches the Club collection name
    position: String,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
