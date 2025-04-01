import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductsByCategory from "./pages/ProductsByCategory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import WishList from "./pages/WishList";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/product/:productId"
            element={<ProductDetails />}
          />
          <Route
            path="/products/category/:category"
            element={<ProductsByCategory />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
