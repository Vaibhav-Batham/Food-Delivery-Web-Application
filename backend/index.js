import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

// DB Connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};
app.get("/", (req, res) => {
  res.send("Backend OK");
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at ${PORT}`);
});
