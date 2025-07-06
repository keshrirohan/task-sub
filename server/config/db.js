import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected................");
  } catch (error) {
    console.log("connection error:", error);
  }
};

export default connectDB;
