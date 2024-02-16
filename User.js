const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'clubs' }, // Foreign key reference to Club model
    position: String,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
