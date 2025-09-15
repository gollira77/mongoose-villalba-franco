import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: 
  { type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  specialty: { 
    type: String, 
    required: true, 
    trim: true 
  },
  users: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Relación N:M
}, { timestamps: true });

export default mongoose.model("Trainer", trainerSchema);
