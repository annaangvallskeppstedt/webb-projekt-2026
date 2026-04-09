import express from "express";
import Booking from "../models/bookingModel.js";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, event, quantity = 1 } = req.body;

    const foundEvent = await Event.findById(event);
    if (!foundEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const bookings = await Booking.find({ event });

    const totalBooked = bookings.reduce((sum, b) => sum + b.quantity, 0);

    if (totalBooked + quantity > foundEvent.totalSpots) {
      return res.status(400).json({ message: "Not enough spots available" });
    }

    const existingBooking = await Booking.findOne({ email, event });
    if (existingBooking) {
      return res.status(400).json({ message: "You already booked this event" });
    }

    const booking = new Booking({ name, email, event, quantity });
    const savedBooking = await booking.save();

    foundEvent.bookedSpots = (foundEvent.bookedSpots || 0) + quantity;
    await foundEvent.save();

    res.status(201).json(savedBooking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;