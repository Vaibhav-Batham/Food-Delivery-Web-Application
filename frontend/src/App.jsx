export const serverUrl = "http://localhost:8000";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/forgotpassword";

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
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/signup" />}
        />
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
      </Routes>
    </>
  );
}

export default App;
