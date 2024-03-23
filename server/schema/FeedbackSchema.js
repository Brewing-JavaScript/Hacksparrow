import mongoose from "mongoose";

const { Schema } = mongoose;

// Define a schema for the feedback data
const feedbackSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    feedbackText: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model using the schema
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
