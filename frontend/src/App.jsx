export const serverUrl = "http://localhost:8000";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/forgotpassword";

import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import DeliveryBoy from "./components/DeliveryBoy";

import CreateEditShop from "./pages/CreateEditShop";
import AddMenu from "./pages/AddMenu";

import useGetCurrentUser from "./hooks/useGetCurrentUser";
import UseGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShope";

function App() {
  useGetCurrentUser();
  UseGetCity();
  useGetMyShop();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      {userData && <Nav />}

      <Routes>
        {/* ROOT */}
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

        {/* AUTH */}
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

        {/* USER */}
        <Route
          path="/user/dashboard"
          element={
            userData?.role === "user" ? <UserDashboard /> : <Navigate to="/" />
          }
        />

        {/* OWNER */}
        <Route
          path="/owner/dashboard"
          element={
            userData?.role === "owner" ? <OwnerDashboard /> : <Navigate to="/" />
          }
        />

        {/* DELIVERY */}
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

        {/* OWNER — CREATE / EDIT SHOP */}
        <Route
          path="/owner/shop"
          element={
            userData?.role === "owner" ? (
              <CreateEditShop />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/owner/shop/:id"
          element={
            userData?.role === "owner" ? (
              <CreateEditShop />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/*  OWNER — ADD MENU (WITHOUT shopId) */}
        <Route
          path="/owner/menu"
          element={
            userData?.role === "owner" ? <AddMenu /> : <Navigate to="/" />
          }
        />

        {/* OWNER — ADD MENU (WITH shopId) */}
        <Route
          path="/owner/menu/:shopId"
          element={
            userData?.role === "owner" ? <AddMenu /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
