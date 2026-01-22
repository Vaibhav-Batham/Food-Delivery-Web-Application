import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App";

function SignUp() {
  const navigate = useNavigate();

  const primaryColor = "#ff4d2d";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // 🔴 FRONTEND VALIDATION (MOST IMPORTANT)
    if (!fullName || !email || !mobile || !password || !role) {
      alert("All fields are required");
      return;
    }

    // Debug (agar kabhi doubt ho)
    console.log({ fullName, email, mobile, password, role });

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );

      console.log("Signup Success 👉", res.data);
      alert("Signup successful");
      navigate("/signin");

    } catch (error) {
      console.log("Signup Error 👉", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Tastico</h1>
        <p className="text-gray-600 mb-6">Create your account</p>

        {/* FULL NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* MOBILE */}
        <input
          type="tel"
          placeholder="Mobile"
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* ROLE */}
        <div className="flex gap-2 mb-4">
          {["user", "owner", "deliveryBoy"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="flex-1 py-2 rounded-lg border"
              style={
                role === r
                  ? { backgroundColor: primaryColor, color: "white" }
                  : { borderColor: primaryColor, color: primaryColor }
              }
            >
              {r}
            </button>
          ))}
        </div>

        {/* SIGN UP */}
        <button
          onClick={handleSignUp}
          className="w-full py-2 rounded-lg text-white font-semibold"
          style={{ backgroundColor: primaryColor }}
        >
          Sign Up
        </button>

        {/* GOOGLE */}
        <button className="w-full mt-3 py-2 border rounded-lg flex items-center justify-center gap-2">
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        <p
          className="text-center mt-5 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>

      </div>
    </div>
  );
}

export default SignUp;
