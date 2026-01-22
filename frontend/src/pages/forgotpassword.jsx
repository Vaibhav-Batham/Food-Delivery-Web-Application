import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { serverUrl } from "../App";


function ForgotPassword() {
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const navigate = useNavigate()
  const primaryColor = "#ff4d2d"

    const handleSendOtp = async () => {
    if (!email) {
      alert("Email required");
      return;
    }

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email }
      );

      alert(res.data.message);
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "OTP send failed");
    }
  };



  const handleVerifyOtp = () => {
    if (!otp) {
      alert("OTP required")
      return
    }
    console.log("OTP verified:", otp)
    setStep(3)
  }

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("All fields required")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    console.log("Password reset success")
    navigate("/signin")
  }

  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>

        <div className='flex items-center gap-4 mb-4'>
          <IoMdArrowRoundBack
            size={30}
            className='text-[#ff4d2d] cursor-pointer'
            onClick={() => window.history.back()}
          />
          <h1 className='text-2xl font-bold text-[#ff4d2d]'>
            Forgot Password
          </h1>
        </div>

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <>
            <label className='block mb-1'>Email</label>
            <input
              type='email'
              className='w-full border rounded-lg px-3 py-2 mb-6'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className='w-full py-2 rounded-lg text-white'
              style={{ backgroundColor: primaryColor }}
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 – OTP */}
        {step === 2 && (
          <>
            <label className='block mb-1'>OTP</label>
            <input
              type='text'
              className='w-full border rounded-lg px-3 py-2 mb-6'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className='w-full py-2 rounded-lg text-white'
              style={{ backgroundColor: primaryColor }}
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 – RESET PASSWORD */}
        {step === 3 && (
          <>
            <label className='block mb-1'>New Password</label>
            <input
              type='password'
              className='w-full border rounded-lg px-3 py-2 mb-4'
              placeholder='New password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label className='block mb-1'>Confirm Password</label>
            <input
              type='password'
              className='w-full border rounded-lg px-3 py-2 mb-6'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className='w-full py-2 rounded-lg text-white'
              style={{ backgroundColor: primaryColor }}
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword
