import mongoose from "mongoose";

const completedHabitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // reference to the user who completed it
    required: true,
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "habits", // reference to the habit completed
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now, // stores when the habit was completed
  },
});

    const habitcompleted=mongoose.model("completedHabits", completedHabitSchema)

export default  habitcompleted
