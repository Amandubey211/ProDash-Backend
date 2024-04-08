import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  skillsUsed: {
    type: [String],
    required: true,
  },
  projectPhotoURL: {
    type: String,
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
    maxlength: 1000,
  },
  githubLink: {
    type: String,
  },
  size: {
    type: String,
    enum: ["large", "medium", "small"],
    default: "medium",
  },
  progressPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 3,
  },
  liveDemoLink: {
    type: String,
  },
  createdBy: {
    type: String,
    require: true,
  },
});

const ProjectModel = mongoose.model("Projectinfos", projectSchema);

export default ProjectModel;
