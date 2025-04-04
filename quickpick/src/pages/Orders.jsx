import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductCards from "../components/ProductCards";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import YourOrdersLoader from "../components/YourOrdersLoader"
const Orders = () => {
  const { products, backendUrl,token } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  const[orderData, setOrderData] = useState([]);

  const fetchOrder = async ()=>{
    setLoading(true);
    if(!token) return;
    try {
      const response = await axios.post(`${backendUrl}/api/v1/orders/userOrders`,{},{headers:{token}})
      if(response.status === 200){
        setLoading(false);
        setOrderData(response.data.data)
        // console.log(response.data.data[0].address.firstName);
        
      }
    } catch (error) {
      toast.error(error.response?.data?.errors)
    }
  }

  useEffect(()=>{
    fetchOrder();
  },[token])

  if (loading) {
    return <YourOrdersLoader />; // Show the loading screen until data is ready
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full flex justify-between items-center sm:px-4 shadow-md mb-6">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="sm:w-[163px] sm:h-[103px] w-[115px] h-[95px] object-contain relative -top-[7px]"
          />
        </Link>
        <div className="flex gap-3 items-center">
          <img className="h-6" src={assets.profile_icon} alt="" />
          <h2 className="text-center   text-xl mr-1 sm:mr-0 font-semibold">
            {orderData[0]?.address?.firstName +" " + orderData[0]?.address?.lastName}
          </h2>
        </div>
      </div>
      <div className="text-center text-2xl mt-3">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div className="p-6">
        {orderData.map((product, index) => (
          <ProductCards key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
