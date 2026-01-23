import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";
import {
  signUp,
  signIn,
  signOut,
  sendOtp,
  verifyOtp,
  resetPassword,
  googleAuth
} from "../controllers/auth.controllers.js";

const userRouter = express.Router();
userRouter.get("/current",isAuth,getCurrentUser)

export default userRouter;
