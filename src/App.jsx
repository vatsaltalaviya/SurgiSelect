import React from "react";
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
import ScrollToTop from "./components/ScrollToTop";
import Address from "./pages/address";
import UserProfile from "./pages/UserProfile";
import CompanyPage from "./pages/CompanyPage";

const App = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/signup","/signin"];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );
  return (
    <>
      {!shouldHideHeaderFooter && <Navbar />}
      <ToastContainer position="top-right" autoClose={1000} />
        {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetail/:id" element={<ProductPage />} />
        <Route path="/industry/:id" element={<Industry />} />
        <Route path="/categorydetail" element={<CategoryDetail />} />
        <Route path="/allproducts/:subcategoryid" element={<AllProducts />} />
        <Route path="/sercheditem/:name" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Orderpage />} />
        <Route path="/address" element={<Address />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/companyprofile" element={<CompanyPage />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
