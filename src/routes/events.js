import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);

    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Could not create event" });
  }
});

export default router;

