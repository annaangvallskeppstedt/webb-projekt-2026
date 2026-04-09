import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);