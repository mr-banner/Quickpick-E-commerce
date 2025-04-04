import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = await User.findById(userId);
    let cartData = await user.cartData;

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

    await User.findByIdAndUpdate(userId, { cartData });

    return res
      .status(200)
      .json(new ApiResponse(200, true, "Added to cart successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, false, error.message));
  }
});

const updateCart = asyncHandler(async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const user = await User.findById(userId);
    let cartData = await user.cartData;

    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json(new ApiResponse(200, true, "cart updated"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, false, error.message));
  }
});

const getCart = asyncHandler(async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId)
        const cart = await user.cartData;

        return res.status(200).json(
            new ApiResponse(200,true,cart)
        )
    } catch (error) {
    return res.status(500).json(new ApiError(500, false, error.message));
    }
});

export { addToCart, updateCart, getCart };
