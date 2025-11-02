import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(err));


import Event from "./event_model.js";


app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/events/:id", async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));