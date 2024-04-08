import mongoose from "mongoose";

// Define the schema for personal information
const personalInfoSchema = new mongoose.Schema({
  //refrence
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // First name of the user
  firstName: { type: String, required: true },

  // Last name of the user
  lastName: { type: String, required: true },

  // Mobile number of the user
  mobNumber: { type: String, required: true },

  // City where the user resides
  city: { type: String },

  // Email address of the user
  email: { type: String, required: true },

  // Array of social links provided by the user
  links: { type: [String], default: [] },

  // Gender of the user
  gender: { type: String, enum: ["Male", "Female", "Other"] },

  linkedin: { type: String },

  about: { type: String, maxlength: 1000 },

  // URL or path to the user's photo
  photoUrl: {
    type: String,
    default: "aman",
  },

  // A brief headline describing the user's interests or personality
  headline: { type: String },

  // A paragraph describing the user's interests or personality in detail
  interests: { type: String },
});

// Create a Mongoose model using the schema
const UserInfoModel = mongoose.model("PersonalInfo", personalInfoSchema);

export default UserInfoModel;
