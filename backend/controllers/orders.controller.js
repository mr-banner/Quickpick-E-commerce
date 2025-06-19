import { asyncHandler } from "../utils/asyncHandler.js";
import { Orders } from "../models/orders.model.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Razorpay from "razorpay";

const currency = "INR";
const deliveryCharge = 10;

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Place Order - COD
const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, address, amount } = req.body;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "COD",
  };

  const createdOrder = await Orders.create(orderData);
  await User.findByIdAndUpdate(userId, { cartData: {} });

  return res
    .status(200)
    .json(new ApiResponse(200, true, createdOrder, "Order placed successfully"));
});

// Place Order - Razorpay
const placeOrderRazorpay = asyncHandler(async (req, res) => {
  const { userId, items, address, amount } = req.body;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "Razorpay",
    payment: false,
    date: Date.now(),
  };

  const createdOrder = await Orders.create(orderData);

  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: createdOrder._id.toString(),
  };

  const razorOrder = await razorpayInstance.orders.create(options);
  return res.status(200).json(new ApiResponse(200, true, razorOrder, "Razorpay order created"));
});

// Place Order - Stripe (Not Implemented)
const placeOrderStripe = asyncHandler(async (req, res) => {
  return res
    .status(501)
    .json(new ApiResponse(501, false, null, "Stripe payment not implemented yet"));
});

// Get All Orders (Admin)
const allOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, true, orders, "All orders fetched successfully"));
});

// Get User Orders
const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const orders = await Orders.find({ userId });

  if (!orders || orders.length === 0) {
    throw new ApiError(404, false, "No orders found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders,true,  "User orders fetched successfully"));
});

// Update Order Status (Admin)
const updateOrder = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;
  await Orders.findByIdAndUpdate(orderId, { status });

  return res
    .status(200)
    .json(new ApiResponse(200,  null,true, "Order status updated"));
});

// Track Specific Order
const trackOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await Orders.findById(orderId);

  if (!order) {
    throw new ApiError(404, false, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200,  order,true, "Order details fetched successfully"));
});

// Verify Razorpay Payment
const verifyRazorpay = asyncHandler(async (req, res) => {
  const { userId, razorpay_order_id } = req.body;

  const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  const isPaid = orderInfo.status === "paid";

  if (isPaid) {
    await Orders.findByIdAndUpdate(orderInfo.receipt, { payment: true });
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res
      .status(200)
      .json(new ApiResponse(200, null,true,  "Payment successful"));
  }

  return res
    .status(400)
    .json(new ApiResponse(400,null, false, "Payment failed"));
});

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrder,
  trackOrder,
  verifyRazorpay,
};
