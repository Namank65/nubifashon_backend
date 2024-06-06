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

      console.log(req.body);
      const { razorpay_order_id , razorpay_payment_id, razorpay_signature  } = req.body;
      console.log(razorpay_order_id , razorpay_payment_id, razorpay_signature);

      return res.status(200).json(new apiResponse(201, {}, "Payment Successfull"));
})

export const getRazorKey = asyncHandler(async(req, res) => {

      return res.status(200).json(new apiResponse(201, {key: process.env.RAZORPAY_KEY}, "RazorPay Key Fetched Successfully"));
})