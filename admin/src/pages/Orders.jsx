import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/orders/allOrders`,
        {},
        { headers: { token } }
      );
      if (response.status === 200) {
        setOrders(response.data.data);
        console.log(response.data.data.reverse());
        
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const statusHandler = async (event,orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/orders/update-status`,{orderId, status:event.target.value}, {headers:{token}})
      if(response.data.success) {
        await fetchOrders();
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.8fr_2.5fr_1.5fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-gray-700" key={index}>
            <img
              className="sm:w-40 w-18"
              src={order.items[0].image[0]}
              alt=""
            />
            <div>
              <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p className="py-0.5" key={index}>
                      {item.name}
                    </p>
                  );
                }
              })}
            </div>
            <p className="mt-3 mb-2 font-medium">{order?.address?.firstName + "  " + order?.address?.lastName}</p>
            <div>
              <p>{order?.address?.address + ","}</p>
              <p>
                {order?.address?.city +
                  ", " +
                  order?.address?.state +
                  ", " +
                  order?.address?.country +
                  ", " +
                  order?.address?.zipCode}
              </p>
            </div>
            <p>{order?.address?.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Quantity:{order?.items[0]?.quantity}</p>
              <p>Size: {order?.items[0]?.size}</p>
              <p className="mt-3">Payment Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <p>{"$"}{order.amount}</p>
            <select value={order.status} onChange={(event) => statusHandler(event, order._id)} className="p-2 cursor-pointer font-semibold border-2 border-gray-300 rounded-md">
              <option value="Order Placed">Order Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
