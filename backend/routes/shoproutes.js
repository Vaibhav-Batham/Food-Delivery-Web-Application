import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createEditShop } from "../controllers/shop.controllers.js";

const router = express.Router();

// Protected route: get current user
router.get("/create-edit", isAuth, upload.single("image"), createEditShop);

export default router;
