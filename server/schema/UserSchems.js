import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    default: "student",
    type: String,
  },
  cats: {
    type: [String], // Assuming it's an array of strings representing categories
  },
});

// Create a User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
