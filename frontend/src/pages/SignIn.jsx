import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // ================= NORMAL SIGN IN =================
  const handleSignIn = async () => {
    if (!email || !password) {
      return setErr("Email and password are required");
    }

    try {
      setLoading(true);
      setErr("");

      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data.user));

      const role = res.data.user.role;
      if (role === "user") {
        navigate("/user/dashboard");
      } else if (role === "owner") {
        navigate("/owner/dashboard");
      } else if (role === "deliveryboy") {
        navigate("/delivery/dashboard");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async () => {
    if (!email) return setErr("Enter your email first");

    try {
      setLoading(true);
      setErr("");
      setMsg("");

      const res = await axios.post(
        `${serverUrl}/api/auth/forgot-password`,
        { email }
      );

      setMsg(res.data.message || "Password reset link sent to email");
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE SIGN IN =================
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErr("");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        { email: result.user.email },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data.user));

      const role = res.data.user.role;
      if (role === "user") {
        navigate("/user/dashboard");
      } else if (role === "owner") {
        navigate("/owner/dashboard");
      } else if (role === "deliveryboy") {
        navigate("/delivery/dashboard");
      }
    } catch (error) {
      console.log(error);
      setErr("Google signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Tastico</h1>
        <p className="text-gray-600 mb-6">
          {showForgot ? "Reset your password" : "Sign in to your account"}
        </p>

        {err && <p className="text-red-500 mb-3 text-center">{err}</p>}
        {msg && <p className="text-green-600 mb-3 text-center">{msg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        {!showForgot && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
          />
        )}

        {!showForgot && (
          <div
            className="text-right text-sm text-[#ff4d2d] cursor-pointer mb-4"
            onClick={() => setShowForgot(true)}
          >
            Forgot password?
          </div>
        )}

        <button
          onClick={showForgot ? handleForgotPassword : handleSignIn}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-semibold bg-[#ff4d2d]"
        >
          {loading
            ? "Please wait..."
            : showForgot
            ? "Send Reset Link"
            : "Sign In"}
        </button>

        {!showForgot && (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full mt-3 py-2 border rounded-lg flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        )}

        <p className="text-center mt-5">
          {!showForgot ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="cursor-pointer text-[#ff4d2d]"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <span
              className="cursor-pointer text-[#ff4d2d]"
              onClick={() => setShowForgot(false)}
            >
              Back to Sign In
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default SignIn;
