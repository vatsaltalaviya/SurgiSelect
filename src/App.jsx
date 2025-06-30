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

const App = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/signup","/signin"];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );
  return (
    <>
      {!shouldHideHeaderFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetail" element={<ProductPage />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/categorydetail" element={<CategoryDetail />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Orderpage />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/signin" element={<Register />} />
      </Routes>

      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
