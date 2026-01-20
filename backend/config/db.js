 import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ DB connected");
  } catch (error) {
    console.log("❌ DB error");
    console.log(error.message); // 👈 IMPORTANT
  }
};

export default connectDB;
