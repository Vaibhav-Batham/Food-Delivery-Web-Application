import express from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js"; // Fixed: Corrected to named import
import { addItem, editItem } from "../controllers/item.controllers.js"; // Fixed: Imported editItem controller

const router = express.Router();

// Protected route: get current user
router.post("/add-item", isAuth, upload.single("image"), addItem);
router.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);


export default router;
