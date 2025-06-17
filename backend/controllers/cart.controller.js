import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size } = req.body;

  if (!userId || !itemId || !size) {
    throw new ApiError(400, "Missing required fields");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartData = user.cartData || {};

  if (!cartData[itemId]) {
    cartData[itemId] = {};
  }

  cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

  await User.findByIdAndUpdate(userId, { cartData });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Added to cart successfully"));
});

const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;

  if (!userId || !itemId || !size || quantity === undefined) {
    throw new ApiError(400, "Missing required fields");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartData = user.cartData || {};

  if (!cartData[itemId]) {
    cartData[itemId] = {};
  }

  cartData[itemId][size] = quantity;

  await User.findByIdAndUpdate(userId, { cartData });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Cart updated successfully"));
});

const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cart = user.cartData || {};

  return res.status(200).json(new ApiResponse(200, cart, "Cart fetched"));
});

export { addToCart, updateCart, getCart };
