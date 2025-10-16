import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cowSchema = new mongoose.Schema({
  serial_no: { type: String, required: true },
  DOB: { type: Date, required: true },
  no_of_calf: { type: Number, required: true },
  breed: { type: String },
  weight: { type: Number },
  health: { type: String },
});

const Cow = mongoose.model("Cow", cowSchema);

// ✅ Create
app.post("/api/cows", async (req, res) => {
  try {
    const cow = new Cow(req.body);
    await cow.save();
    res.status(201).json(cow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Read
app.get("/api/cows", async (req, res) => {
  const cows = await Cow.find();
  res.json(cows);
});

// ✅ Update
app.put("/api/cows/:id", async (req, res) => {
  try {
    const cow = await Cow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete
app.delete("/api/cows/:id", async (req, res) => {
  try {
    await Cow.findByIdAndDelete(req.params.id);
    res.json({ message: "Cow deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
