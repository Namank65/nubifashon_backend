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

      const generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET);

  if (generated_signature == razorpay_signature) {
    console.log("payment is successful123")
    }
console.log("ggg",generated_signature)
console.log("already",razorpay_signature)

      return res.status(200).json(new apiResponse(201, {}, "Succes True"));
})

export const getRazorKey = asyncHandler(async(req, res) => {

      return res.status(200).json(new apiResponse(201, {key: process.env.RAZORPAY_KEY}, "RazorPay Key Fetched Successfully"));
})