import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB connected");
  } catch (error) {
    console.log("❌ DB error");
    console.log(error.message); // Important for debugging
  }
};

export default connectDB;
