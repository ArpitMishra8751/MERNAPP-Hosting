import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import PrivateRoute from "./components/core/PrivateRoute";
import OpenRoute from "./components/core/OpenRoute";
import Logout from "./components/Logout";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
function App() {
  return (
    <div className=" bg-slate-900 w-full max-h-full min-h-screen  " >
      <Navbar />
      <Routes>
        <Route path="/" element={  
          <OpenRoute>
            <Signup/>
        </OpenRoute>  } />
        <Route path="login" element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
           } />
           <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
           } />
        <Route path="home" element={
          <PrivateRoute>
            <Homepage/>
          </PrivateRoute>
          } />
          <Route path="/logout" element={
            <PrivateRoute>
              <Logout/>
            </PrivateRoute>
          }/>
          <Route path="/forgotpassword" element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }/>
      </Routes>
    </div>
  );
}
export default App;