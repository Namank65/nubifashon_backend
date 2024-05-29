import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Product } from "../models/Product.model.js";

const productAuth = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log(token);

        if(!token){
            throw new apiError(401, "Unauthorised Token")
        }

        const decordedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const product = await Product.findById(decordedToken?._id)
        req.user = product
        next();
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Access Token")
    }
})

export default productAuth;