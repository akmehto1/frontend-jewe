import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Layouts/Header/header";
import Home from "./pages/Home/home";

import SignIn from "./pages/User/SignUp/SignUp";
import LoginForm from "./pages/User/Log-in/LogIn";

import UserProtectRoute from "./Componets/ProtectedRoute/ProtectedRoute";
import UserDashboard from "./pages/User/Dashboard/Dashboard";
import AdminProtectRoute from "./Componets/ProtectedRoute/AdminProtectRoute";
import AdminLogin from "./pages/Admin/Login/login";

import FilterPage from "./pages/Admin/FilterPage/FilterPage";
import PricingPage from "./pages/Price/Price";
import Footer from "./Layouts/Footer/Footer";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/sign-in" element={<SignIn />} />
        <Route path="/user/log-in" element={<LoginForm />} />
        <Route path="/admin/log-in" element={<AdminLogin />} />
        <Route path="/admin/filter" element={<FilterPage/>}/>
        <Route path='/price' element={<PricingPage/>}/>



          {/* Admin */}
          <Route  element={<AdminProtectRoute/>}>
             <Route path="admin/dashboard"  element={<AdminDashboard/> } />
             <Route path="admin/SearchPage"  element={<AdminDashboard/> } />
             
          </Route>

      
         
          {/* User */}
          <Route element={<UserProtectRoute />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>


        </Routes>

        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
