const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  otp: { type: Number },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  country: { type: String },
  user_image: {
    type: String,
    default: null,
  },

  // auth_key: { type: String, default: null },
  role: {
    type: String,
    default: "User", // Default role for new user,
  },
  createdAt: { type: Date, default: Date.now },

});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
