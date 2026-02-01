export const serverUrl = "http://localhost:8000";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/forgotpassword";

import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import DeliveryBoy from "./components/DeliveryBoy";

import useGetCurrentUser from "./hooks/useGetCurrentUser";
import UseGetCity from "./hooks/useGetCity";

function App() {
  useGetCurrentUser();
  UseGetCity();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      {userData && <Nav />}

      <Routes>
        {/* ROOT — role based redirect */}
        <Route
          path="/"
          element={
            !userData ? (
              <Navigate to="/signup" />
            ) : userData.role === "user" ? (
              <Navigate to="/user/dashboard" />
            ) : userData.role === "owner" ? (
              <Navigate to="/owner/dashboard" />
            ) : userData.role === "deliveryboy" ? (
              <Navigate to="/delivery/dashboard" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* AUTH ROUTES */}
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />

        {/* DASHBOARDS */}
        <Route
          path="/user/dashboard"
          element={
            userData?.role === "user" ? <UserDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/owner/dashboard"
          element={
            userData?.role === "owner" ? <OwnerDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/delivery/dashboard"
          element={
            userData?.role === "deliveryboy" ? (
              <DeliveryBoy />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
