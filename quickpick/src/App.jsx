import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import FooterComp from "./components/FooterComp";
import ScrollToTop from "./components/ScrollToTop";
import SearchBar from './components/SearchBar'
import Policy from "./pages/Policy";
import AdminLogin from "./pages/AdminLogin";
import ProductCards from "./components/ProductCards";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./pages/Signup";
import TrackOrder from "./pages/TrackOrder";



const App = () => {
  const location = useLocation();
  const admin = location.pathname.includes('admin');
  const order = location.pathname.includes('order')
  return (
    <div className={`${!admin && !order ? "px-4" : "px-0"} ${!admin && !order ? "sm:px-[5vw]" : "px-0"} ${!admin && !order ? "md:px-[7vw]" : "px-0"} ${!admin && !order ? "lg:px[9vw]" : "px-0"} `}>
      <ToastContainer />
      {!location.pathname.includes('policy') && !location.pathname.includes('login') && !location.pathname.includes('order') && !location.pathname.includes('sign-up') && <Navbar />}
      <SearchBar/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="sign-up" element={<Signup/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/admin-login" element={<AdminLogin /> } />
        <Route path="/product-card" element={<ProductCards /> } />
        <Route path="/track/:id" element={<TrackOrder/>}/>

      </Routes>
      {!location.pathname.includes('policy') && !location.pathname.includes('login')  &&  !location.pathname.includes('order') && !location.pathname.includes('sign-up') && <FooterComp />}
    </div>
  );
};

export default App;
