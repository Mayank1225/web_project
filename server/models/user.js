const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  accountType: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;



