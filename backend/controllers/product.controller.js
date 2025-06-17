import { Product } from "../models/products.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subCategory,
    sizes,
    bestSeller,
  } = req.body;

  if (!name || !description || !price || !category || !subCategory || !sizes) {
    throw new ApiError(400, false, "Please fill all the required fields");
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ApiError(400, false, "No images uploaded");
  }

  let uploadedImagePublicIds = [];
  let imagesUrl = [];

  try {
    const imageFiles = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files?.[key]?.[0])
      .filter(Boolean);

    imagesUrl = await Promise.all(
      imageFiles.map(async (file) => {
        const response = await uploadOnCloudinary(file.path);
        uploadedImagePublicIds.push(response.public_id);
        return response.secure_url;
      })
    );

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" || bestSeller === true,
      image: imagesUrl,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, true, product, "Product added successfully"));
  } catch (error) {
    // Cleanup cloudinary uploads if any failed
    await Promise.all(
      uploadedImagePublicIds.map((publicId) => deleteFromCloudinary(publicId))
    );

    throw new ApiError(500, false, "Failed to create product");
  }
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res
    .status(200)
    .json(new ApiResponse(200, true, products, "All products fetched"));
});

// Get Single Product
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, false, "Product does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, true, product, "Product retrieved successfully"));
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, false, "Product ID is required");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, false, "Product not found");
  }

  // Delete all images from Cloudinary
  if (product.image?.length) {
    const deletePromises = product.image.map(async (imageUrl) => {
      try {
        // Extract public_id from URL
        const parts = imageUrl.split("/");
        const filename = parts.pop().split(".")[0];
        const folder = parts.slice(parts.indexOf("upload") + 1).join("/");
        const publicId = `${folder}/${filename}`;
        await deleteFromCloudinary(publicId);
      } catch (error) {
        console.error("Failed to delete Cloudinary image:", error.message);
      }
    });

    await Promise.all(deletePromises);
  }

  await Product.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, true, null, "Product and images deleted successfully"));
});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
