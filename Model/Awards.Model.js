import mongoose from "mongoose";

// Define the schema for an Award
const awardSchema = new mongoose.Schema({
  // Role associated with the award
  role: {
    type: String,
    required: true,
  },
  // Company or institute presenting the award
  companyOrInstitute: {
    type: String,
    required: true,
  },
  // Certification received for the award
  certification: {
    type: String,
    required: true,
  },
  // Grade or level of the award
  grade: {
    type: String,
    required: true,
  },
  // User ID of the recipient (reference to a User model)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a User model
    required: true,
  },
  // Date when the award was received
  dateReceived: {
    type: Date,
    default: Date.now, // Defaults to the current date
  },
  // Additional description or details about the award
  description: {
    type: String,
    maxlength: 700, // Limiting description length to 500 characters
  },
});

// Create a model for the Award schema
const AwardModel = mongoose.model("Award", awardSchema);

export default AwardModel;
