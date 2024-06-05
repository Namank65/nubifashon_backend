import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../index.js";
import apiResponse from "../utils/apiResponce.js";


export const checkout = asyncHandler(async(req, res) => {
    const options = {
        amount: Number(req.body * 100),
        currency: "INR",
      };
      
      const order = await instance.orders.create(options);
      return res.status(200).json(new apiResponse(201, order , "Payment Successfull"));
})