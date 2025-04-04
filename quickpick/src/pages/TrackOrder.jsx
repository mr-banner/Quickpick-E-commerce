import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const TrackOrder = () => {
  const { backendUrl, token } = useContext(ShopContext);

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const trackingSteps = ["Order Placed", "Shipped", "Out for delivery", "Delivered"];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/v1/orders/trackOrder/${id}`,
          { headers: { token } }
        );
        setOrder(response.data.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  useEffect(() => {
    if (order) {
      // Find the index of the order's current status in the trackingSteps array
      const currentStatusIndex = trackingSteps.indexOf(order.status);
  
      // If the currentStatusIndex is valid (status is found in the trackingSteps array)
      if (currentStatusIndex !== -1) {
        let stepIndex = 0;
        const interval = setInterval(() => {
          setVisibleSteps((prev) => {
            // If prev is less than or equal to the current status index, increment the step
            if (prev <= currentStatusIndex) {
              return prev + 1;
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }
  }, [order]);

  if (!order) {
    return <div className="text-center text-lg">Loading order details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Track Your Order
      </h2>
      <p className="text-gray-600 ">Order ID: {order._id}</p>
      {order.status === "Delivered" && (<p className="text-gray-600 ">
        Delivered On:{" "}
        {new Date(order.updatedAt).toLocaleDateString()}
      </p>)}
      {
        order.status !== "Delivered" && order.status !== "Out for delivery" && (<p className="text-gray-600 ">
            Estimated Delivery:{" "}
            {new Date(new Date(order.updatedAt).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}
    
          </p>)
      }
      {
        order.status === "Out for delivery" && (<p className="text-gray-600 ">
            Estimated Delivery:{" "}
            {new Date(order.updatedAt).toLocaleDateString()}
    
          </p>)
      }
      
      <div className="mt-6">
        {trackingSteps.map((step, index) => (
          <div key={index} className="flex items-center mb-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold duration-1000 ${
                index < visibleSteps ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {index < visibleSteps ? "✓" : ""}
            </div>
            <div className="ml-4">
              <p className="text-gray-700 font-semibold">
                {trackingSteps[index]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Address Section */}
      <div className="mt-6 p-4 border-t border-gray-300">
        <h3 className="text-lg font-bold text-gray-800 ">
          Your product will be delivered to:
        </h3>
        <p className="text-gray-600 mt-2">
          {order.address.firstName + "  " + order.address.lastName}
        </p>
        <p className="text-gray-600 mt-2">
          {order.address.address +
            ", " +
            order.address.city +
            ", " +
            order.address.state}
        </p>
        <p className="text-gray-600 mt-2">
          {order.address.country + ", " + order.address.zipCode}
        </p>
        <p className="text-gray-600 mt-2">
          {order.address.phoneNumber}
        </p>
        <p className="text-gray-600 mt-2">
          {order.address.email}
        </p>
      </div>

      {/* Order Payment Method & Amount To Be Paid */}
      {order.payment === false && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <h3 className="text-lg font-bold text-gray-800">
            Payment Method:
          </h3>
          <p className="text-gray-600  ">
            {order.paymentMethod}
          </p>
          <h3 className="text-lg font-bold text-gray-800 mt-2">
            Amount to be paid:
          </h3>
          <p className="text-gray-600 ">₹ {order.amount}</p>
        </div>
      )}

      {order.payment === true && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <h3 className="text-lg font-bold text-gray-800">
            Payment Method:
          </h3>
          <p className="text-gray-600  ">
            {order.paymentMethod}
          </p>
          <h3 className="text-lg font-bold text-gray-800 mt-2">
            Amount paid:
          </h3>
          <p className="text-gray-600 ">₹ {order.amount}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
