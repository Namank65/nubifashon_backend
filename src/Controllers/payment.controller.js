import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../index.js";
import apiResponse from "../utils/apiResponce.js";


export const checkout = asyncHandler(async(req, res) => {
    const options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
      };
      const order = await instance.orders.create(options)

      console.log(order);

      return res.status(200).json(new apiResponse(201, {success: true} , "Payment Successfull"))
})