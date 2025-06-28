import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import Industry from "./pages/Industry";
import CategoryDetail from "./pages/CategaryDetail";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/productdetail" element={<ProductPage />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/categorydetail" element={<CategoryDetail />} />
        <Route path="/allproducts" element={<AllProducts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
