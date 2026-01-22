import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendOtpMail } from "../utiles/mail.js";

/* ================= SIGN UP ================= */
  
 export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    if (!fullName || !email || !password || !mobile || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,          // ✅ ADD THIS
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error 👉", error);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};


/* ================= SIGN IN ================= */
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Signin error", error });
  }
};

/* ================= SIGN OUT ================= */
export const signOut = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

/* ================= SEND OTP ================= */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("EMAIL RECEIVED 👉", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendMail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.log("SEND OTP ERROR ❌", error);
    res.status(500).json({
      message: "OTP send failed",
      error: error.message
    });
  }
};

 // ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.resetOtp !== otp ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = null;
    user.otpExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Verify OTP error",
      error: error.message,
    });
  }
};


/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Reset password error", error });
  }
};
