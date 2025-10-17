import express from "express";
import Cow from "../models/Cow.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add cow
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { serial_no, dob, no_of_calf, breed, weight, health } = req.body;
    const cow = new Cow({
      serial_no,
      breed,
      dob,
      no_of_calf,
      weight,
      health: health || "Healthy",
      user: req.userId
    });
    await cow.save();
    res.status(201).json(cow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user’s cows
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cows = await Cow.find({ user: req.userId });
    res.json(cows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit cow
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const cow = await Cow.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!cow) return res.status(404).json({ message: "Cow not found" });
    res.json(cow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete cow
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cow = await Cow.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!cow) return res.status(404).json({ message: "Cow not found" });
    res.json({ message: "Cow deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
