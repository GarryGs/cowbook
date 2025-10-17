import mongoose from "mongoose";

const cowSchema = new mongoose.Schema({
  serial_no: { type: String, required: true },
  breed: { type: String, required: true },
  dob: { type: Date, required: true },
  no_of_calf: { type: Number, required: true },
  weight: { type: Number, required: true },
  health: { type: String, default: "Healthy" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model("Cow", cowSchema);
