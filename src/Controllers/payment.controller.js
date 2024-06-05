import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../index.js";
import apiResponse from "../utils/apiResponce.js";


export const checkout = asyncHandler(async(req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
      };
      
      const order = await instance.orders.create(options);
      return res.status(200).json(new apiResponse(201, order , "Payment Successfull"));
})

export const paymentVerification = asyncHandler(async(req, res) => {

      return res.status(200).json(new apiResponse(201, {}, "Payment Successfull"));
})

export const getRazorKey = asyncHandler(async(req, res) => {

      return res.status(200).json(new apiResponse(201, {key: process.env.RAZORPAY_KEY}, "RazorPay Key Fetched Successfully"));
})