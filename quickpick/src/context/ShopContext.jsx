import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const darkTheme = false;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [token,setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {

    if(!token){
      toast.error("Please Login")
        navigate("/login")
    }

    else if(!size) {
      toast.error("Select product size");
      return;
    }else{
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);

    if(token){
      try {
        await axios.post(`${backendUrl}/api/v1/cart/add-cart`,{itemId,size},{headers:{token}})
      } catch (error) {
        toast.error(error.response?.data?.errors)
      }
    }
    toast.success("Added to cart successfully");
    }
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let tempData = await structuredClone(cartItem);

    tempData[itemId][size] = quantity;
    // console.log(tempData);

    setCartItem(tempData);
    if(token){
      try {
        await axios.post(`${backendUrl}/api/v1/cart/update-cart`,{itemId,size,quantity},{headers:{token}})
      } catch (error) {
        toast.error(error.response?.data?.errors)
      }
    }
  };

  const getUserCart = async (token)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/v1/cart/get-cart`,{},{headers:{token}})
      if(response.status === 200){
        setCartItem(response.data?.data)
      }
      
    } catch (error) {
      
    }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getProducts = async ()=>{
    try {
      const response = await axios.get(`${backendUrl}/api/v1/products/getAllProducts`)
      if(response.status === 200){
        setProducts(response.data.data)
      }else{
        toast.error(error.response?.data?.errors)
      }
    } catch (error) {
      toast.error(error.response?.data?.errors)
    }
  }

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, []);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // useEffect(() => {
  //   if (!token && window.location.pathname !== "/login" || window.location.pathname !== "/signup") {
  //     navigate("/login");
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart(localStorage.getItem("token", token))
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    darkTheme,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
