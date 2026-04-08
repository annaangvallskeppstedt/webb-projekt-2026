import express from "express";
import Booking from "../models/bookingModel.js";
import Event from "../models/eventModel.js";

const router = express.Router();

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const { name, email, event } = req.body;

    // 1. Hitta event
    const foundEvent = await Event.findById(event);
    if (!foundEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2. Kolla om fullbokat
    const bookingsCount = await Booking.countDocuments({ event: event });
    if (bookingsCount >= foundEvent.maxCapacity) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    // 3. Kolla dubbelbokning
    const existingBooking = await Booking.findOne({ email, event });
    if (existingBooking) {
      return res.status(400).json({ message: "You already booked this event" });
    }

    // 4. Skapa booking
    const booking = new Booking({ name, email, event });
    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/event/:eventId", async (req, res) => {
  try {
    const bookings = await Booking.find({ event: req.params.eventId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;