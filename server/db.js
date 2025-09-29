import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
