import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false // Solo si quieres eliminación lógica
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Workout", workoutSchema);
