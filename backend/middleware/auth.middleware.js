import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const authUser = asyncHandler(async(req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.status(401).json(
            new ApiError(401,false,"Not Authorized please login")
        )
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        return res.status(500).json(new ApiError(500, false, "Something went wrong"));
    }
})

export {authUser}