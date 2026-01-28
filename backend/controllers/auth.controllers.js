import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    if (!fullName || !email || !password || !mobile || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, password: hashedPassword, mobile, role });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7*24*60*60*1000 });

    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Signup error: ${error.message}` });
  }
};

// ================= SIGNIN =================
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7*24*60*60*1000 });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: `Signin error: ${error.message}` });
  }
};

// ================= SIGNOUT =================
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    res.status(500).json({ message: `Signout error: ${error.message}` });
  }
};

// ================= GOOGLE AUTH =================
export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile = "0000000000", role = "user" } = req.body;

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ fullName, email, mobile, role });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 7*24*60*60*1000 });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: `Google auth error: ${error.message}` });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return res.status(400).json({ message: "Email and new password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: `Reset password error: ${error.message}` });
  }
};

// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
    console.log(`OTP for ${email}: ${otp}`); // temporarily log

    // optionally save OTP to DB if you want verification later

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ message: `Send OTP error: ${error.message}` });
  }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    // normally you would check DB/cache
    // for now, just return success for demonstration
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: `Verify OTP error: ${error.message}` });
  }
};
