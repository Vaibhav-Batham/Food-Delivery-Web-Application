import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createOrder, getOwnerOrders, getUserOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", isAuth, createOrder);
router.get("/my-orders", isAuth, getUserOrders); // For User Dashboard
router.get("/owner-orders", isAuth, getOwnerOrders); // For Owner Dashboard

export default router;
