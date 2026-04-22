import "dotenv/config";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import eventsRouter from "./routes/events.js";
import bookingsRouter from "./routes/bookings.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/bookings", bookingsRouter);

export default app;