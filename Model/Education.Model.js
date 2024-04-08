import mongoose from "mongoose";

const educationInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This refers to the User model
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    institutionLocation: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    GPA: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
  },
  { timestamps: true }
);

const EducationInfoModel = mongoose.model("EducationInfo", educationInfoSchema);

export default EducationInfoModel;
