import mongoose from "mongoose";

export const DBconnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log("DB connection successful");
    }
  } catch (error) {
    console.log(error.message);
  }
};
