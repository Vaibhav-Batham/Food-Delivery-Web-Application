import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/db.js";

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

app.get("/", (req, res) => {
  res.send("Backend OK");
});

// Start server & connect DB
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at ${PORT}`);
});
