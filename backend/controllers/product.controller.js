import { Product } from "../models/products.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    let uploadedImages = [];
    let imagesUrl = await Promise.all(
      ["image1", "image2", "image3", "image4"]
        .map((key) => req.files?.[key]?.[0])
        .filter(Boolean)
        .map(async (item) => {
          try {
            let response = await uploadOnCloudinary(item.path);
            uploadedImages.push(response.public_id);
            return response.secure_url;
          } catch (err) {
            console.error("Cloudinary Upload Error:", err.message);
            return null;
          }
        })
    );

    imagesUrl = imagesUrl.filter(Boolean);

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true"|| bestSeller === true,
      image: imagesUrl,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, true, product, "Product added successfully"));
  } catch (error) {
    console.error("Error in createProduct:", error);
    await Promise.all(
      uploadedImages.map(async (publicId) => {
        await deleteFromCloudinary(publicId);
      })
    );

    return res.status(500).json({ success: false, message: error.message });
  }
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(new ApiResponse(200, true, products));
});

// get a single product
const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json(new ApiError(400, false, "Product does not exist"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, product, "Product retrieved successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, false, "Somthing went wrong"));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ApiError(400, false, "Product ID is required"));
    }

    const product = await Product.findById(id);
    if (!product) {
      return next(new ApiError(400, false, "Product does not exist"));
    }

    if (product.image && Array.isArray(product.image) && product.image.length > 0) {

      const deletePromises = product.image.map(async (imageUrl) => {
        try {
          const publicId = imageUrl.split("/").slice(7).join("/").split(".")[0];
          await deleteFromCloudinary(publicId);
        } catch (error) {
          console.error("Error deleting image from Cloudinary:", error);
        }
      });
      await Promise.all(deletePromises);
    }
    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, true, null, "Product and images deleted successfully"));
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    next(new ApiError(500, false, error.message || "Internal Server Error"));
  }
});


export { createProduct, getAllProducts, getSingleProduct, deleteProduct };
