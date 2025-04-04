import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


const adminAuth = asyncHandler(async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.status(401).json(new ApiError(401, false, "Not authorized"));
        }
    
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json(new ApiError(401, false, "Unauthorized admin"));
        }
        next();
    } catch (error) {
        return res.status(500).json(new ApiError(500, false, "Something went wrong"));
    }
})

export {adminAuth}