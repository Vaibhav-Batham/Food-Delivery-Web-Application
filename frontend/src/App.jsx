import { Routes, Route, Link } from 'react-router-dom'
import ForgotPassword from "./pages/forgotpassword";
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import useGetCurrentUser from './hooks/useGetCurrentUser';
export const serverUrl = "http://localhost:8000"

function App() {
  useGetCurrentUser()
  return (
    <div className="p-6">
      <nav className="space-x-4 mb-6">
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SignUp />} />  
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />       

      </Routes>

    </div>
  )
}

export default App
