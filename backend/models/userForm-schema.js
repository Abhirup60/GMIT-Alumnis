const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth:{
    type: String,
    required: true,
    trim: true,
  },
  rollNumber:{
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber:{
    type: String,
    required: true,
    trim: true,
  },
  designation:{
    type: String,
    required: true,
    trim: true,
  },
  department:{
    type: String,
    required: true,
    trim: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  file: {
    type: String,
    required: true,
  },
});

const DetailsUser = new mongoose.model("DETAILSUSER", UserSchema);

module.exports = DetailsUser;
