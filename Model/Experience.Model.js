import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  skillsUsed: {
    type: [String],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExperienceModal = mongoose.model("ExperienceInfo", experienceSchema);

export default ExperienceModal;
