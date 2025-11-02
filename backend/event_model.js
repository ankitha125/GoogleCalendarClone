import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  allDay: { type: Boolean, default: false },
});

export default mongoose.model("Event", eventSchema);