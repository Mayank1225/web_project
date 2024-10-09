const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    accountType: String,
    email: String,
    password: String
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
