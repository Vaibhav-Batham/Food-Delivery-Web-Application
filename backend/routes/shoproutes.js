import express from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";


import {
  createEditShop,
  getMyShop,
  getAllShops,
} from "../controllers/shop.controllers.js";

const router = express.Router();

router.post("/create-edit", isAuth, upload.single("image"), createEditShop);
router.get("/get-my", isAuth, getMyShop);

// 
router.get("/all", getAllShops);

export default router;
