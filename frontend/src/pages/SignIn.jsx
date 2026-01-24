import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


function SignIn() {
  const navigate = useNavigate();

  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  // ================= STATE =================
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()



  // ================= NORMAL SIGN IN =================
  const handleSignIn = async () => {
    if (!email || !password) {
      setErr("Email and Password both are required");
      return;
    }

    try {
      setLoading(true);
      setErr("");

      await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true },
        dispatch(setUserData(result.data))
      );

      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE SIGN IN =================
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setErr("");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true },
        dispatch(setUserData(data))
      );

      navigate("/");
    } catch (error) {
      setErr("Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Tastico
        </h1>
        <p className="text-gray-600 mb-6">Sign in to your account</p>

        {/* ERROR */}
        {err && <p className="text-red-500 text-center mb-3">{err}</p>}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <p
          className="text-right text-sm cursor-pointer mb-5"
          style={{ color: primaryColor }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        {/* SIGN IN */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: primaryColor }}
        >
          {loading ? "please wait..." : "Sign In"}
        </button>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full mt-3 py-2 border rounded-lg flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        {/* SIGN UP */}
        <p className="text-center mt-5">
          Don’t have an account?{" "}
          <span
            className="cursor-pointer"
            style={{ color: primaryColor }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
