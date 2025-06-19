import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field.trim() === "")) {
    return res.status(400)
    .json(new ApiError(400,false,"All fileds are required"));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400)
    .json(new ApiError(400,false,"User already exist"));;
  }

  if (!validator.isEmail(email)) {
    return res.status(400)
    .json(new ApiError(400,false,"Invalid email"));
  }

  if (password.length < 8) {
    return res.status(400)
    .json(new ApiError(400,false,"Password must be 8 caharacter long"));
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      throw new ApiError(
        500,
        false,
        "Something went wrong while creating user"
      );
    }

    const token = generateToken(createdUser._id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          true,
          { createdUser, token },
          "User created successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, false, "Something went wrong");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim() === "")) {
    return res.status(400)
    .json(new ApiError(400,false,"All fileds are required"));
  }
  const portalUser = await User.findOne({ email });

  if (!portalUser) {
    return res.status(400)
    .json(new ApiError(400,false,"User not found"));
  }

  const isValid = await portalUser.isPasswordCorrect(password);

  if (!isValid) {
    return res.status(400)
    .json(new ApiError(400,false,"Invalid password"));
  }

  const loggedUser = await User.findById(portalUser._id).select("-password");
  const token = generateToken(portalUser._id);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { loggedUser, token },
        true,
        "User logged in successfully"
      )
    );
});

const adminLogin = asyncHandler(async (req,res) =>{
  try {
    const {email , password} = req.body;
    if(!email || !password){
      return res.status(400).json(new ApiError(400,false,"All fields are required"));
    }
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      return res.status(200).json(new ApiResponse(200,token,true,"Admin logged in successful"));
    }else{
      return res.status(400).json(new ApiError(400,false,"Invalid Credentials"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500,false,error.message));
  }
})

export { registerUser,loginUser, adminLogin };
