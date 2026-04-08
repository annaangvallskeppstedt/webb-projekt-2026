import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  totalSpots: Number,
  bookedSpots: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Event", eventSchema);