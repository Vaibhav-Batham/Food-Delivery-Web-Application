import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !mobile) {
      return setErr("All fields are required");
    }

    try {
      setLoading(true);
      setErr("");

      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data.user));
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setErr("");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          mobile: "0000000000",
          role,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(res.data.user));
      navigate("/");
    } catch (error) {
      setErr("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Tastico</h1>
        <p className="text-gray-600 mb-6">Create a new account</p>

        {err && <p className="text-red-500 mb-3 text-center">{err}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />

        {/* PASSWORD */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        {/* ROLES – IMAGE STYLE */}
        <div className="flex gap-3 mb-4">
          {[
            { label: "User", value: "user" },
            { label: "Owner", value: "owner" },
            { label: "Delivery Boy", value: "deliveryboy" },
          ].map((item) => (
            <div
              key={item.value}
              onClick={() => setRole(item.value)}
              className={`flex-1 text-center py-2 rounded-lg border cursor-pointer font-medium
                ${
                  role === item.value
                    ? "bg-[#ff4d2d] text-white border-[#ff4d2d]"
                    : "bg-white text-gray-600"
                }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-semibold bg-[#ff4d2d]"
        >
          {loading ? "Please wait..." : "Sign Up"}
        </button>

        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full mt-3 py-2 border rounded-lg flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-[#ff4d2d]"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
