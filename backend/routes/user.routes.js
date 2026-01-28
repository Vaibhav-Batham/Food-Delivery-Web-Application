import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// Protected route: get current user
router.get("/current", isAuth, getCurrentUser);

export default router;
