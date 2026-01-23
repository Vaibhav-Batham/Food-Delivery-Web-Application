import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function ForgotPassword() {
  const navigate = useNavigate();
  const primaryColor = "#ff4d2d";

  // ================= STATE =================
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    if (!email) {
      setErr("Email is required");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      const res = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email }
      );

      setStep(2);
    } catch (error) {
      setErr(error.response?.data?.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async () => {
    if (!otp) {
      setErr("OTP is required");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp }
      );

      setStep(3);
    } catch (error) {
      setErr(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErr("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword }
      );

      navigate("/signin");
    } catch (error) {
      setErr(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-4">
          <IoMdArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* ERROR */}
        {err && (
          <p className="text-red-500 text-center mb-4">{err}</p>
        )}

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 mb-6"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-2 rounded-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 – OTP */}
        {step === 2 && (
          <>
            <label className="block mb-1">OTP</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 mb-6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-2 rounded-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 – RESET PASSWORD */}
        {step === 3 && (
          <>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 mb-6"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full py-2 rounded-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
