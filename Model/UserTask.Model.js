import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, maxlength: 500 },
  taskPriority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  completionStatus: {
    type: Boolean,
    default: false,
  },
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 3,
  },

  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
});

const UserTaskModel = mongoose.model("Task", TaskSchema);
export default UserTaskModel;
