import apiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.model";

const verifyJwt = asyncHandler(async(req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
    
        if(!token) {
            throw new apiError(401, "Unauthorized Request")
        }
    
        const decordedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decordedToken._id).select(" -password -refreshToken")
    
        if(!user){
            throw new apiError(409, "Invalid Access Token")
        }
    
        req.user = user
        next()

    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Access Token")
    }

})

export default verifyJwt;