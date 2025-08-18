import React, { useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import Industry from "./pages/Industry";
import CategoryDetail from "./pages/CategaryDetail";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orderpage from "./pages/Orderpage";
import { ToastContainer } from "react-toastify";
import Address from "./pages/address";
import UserProfile from "./pages/UserProfile";
import CompanyPage from "./pages/CompanyPage";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Filterpage from "./pages/Filterpage";

const App = () => {
  const location = useLocation();
  const [islogOut, setislogOut] = useState(false)
  const hideHeaderFooterRoutes = ["/signup","/signin","/forgetpassword","/verifyotp","/resetpassword","/filter"];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );
  return (
    <>
      {!shouldHideHeaderFooter && <Navbar logOut={()=>setislogOut(true)} />}
      <ToastContainer position="top-right" autoClose={1000} />
        {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetail/:slug" element={<ProductPage />} />
        <Route path="/industry/:id" element={<Industry />} />
        <Route path="/categorydetail" element={<CategoryDetail />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/allproducts/:subcategoryslug" element={<AllProducts />} />
        <Route path="/sercheditem/:name" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Orderpage />} />
        <Route path="/address" element={<Address />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/companyprofile/:id" element={<CompanyPage />} />
        <Route path="/filter" element={<Filterpage />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}
      {islogOut && <LogOutPopUp close={()=>setislogOut(false)} />}

    </>
  );
};
function LogOutPopUp({close}){
  const closeref = useRef()
  return<div ref={closeref} onClick={close} className="w-full  h-screen bg-black/30 z-20 fixed top-0 left-0 flex lg:flex-row flex-col justify-center items-center">
      <div className="mx-2 bg-white w-xs md:w-sm  rounded-2xl relative p-2">
        <i onClick={()=>close()} className="ri-close-large-line absolute top-2 right-2"></i>
        <div className="w-full h-2/3 rounded-[8px] flex flex-col items-center overflow-hidden">
          <img
            className="w-20 h-10 object-center"
            src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262395/logo3_xmt7zu.png"
            alt=""
          />
          <h1 className="text-lg font-semibold">Are you sure you want to log out?</h1>
        </div>
        <div className="flex gap-x-2 py-2">
          <button onClick={()=>{
            localStorage.clear();
            sessionStorage.clear();
            close()
          }} className="w-full px-2 py-1 rounded bg-emerald-800 text-white font-medium">Yes</button>
        <button onClick={()=>close()} className="w-full px-2 py-1 rounded bg-red-800 text-white font-medium">Cancel</button>
        </div>
      </div>
      
    </div>
}
export default App;
