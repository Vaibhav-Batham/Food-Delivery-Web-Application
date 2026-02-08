import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
import orderRouter from "./routes/order.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shoproutes.js";

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/item", itemRouter);
app.use("/api/shop", shopRouter);

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at ${PORT}`);
});
