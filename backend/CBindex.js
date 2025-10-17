import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cowRoutes from "./routes/cowRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cows", cowRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch((err) => console.error(err));
