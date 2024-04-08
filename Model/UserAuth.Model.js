import mongoose from "mongoose";
const userAuthSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      maxLength: 20,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      // maxLength: 20,
      minLength: 8,
      require: true,
    },
    role: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
      require: true,
    },
  },
  { timestamps: true }
);

const UserAuthModel = mongoose.model("User", userAuthSchema);
export default UserAuthModel;
