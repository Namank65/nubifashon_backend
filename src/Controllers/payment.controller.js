import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../index.js";
import apiResponse from "../utils/apiResponce.js";
import crypto from "crypto"
import apiError from "../utils/apiError.js";


export const checkout = asyncHandler(async (req, res) => {
      const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
      };
      const order = await instance.orders.create(options);

      return res.status(200).json(new apiResponse(201, order, "Payment Successfull"));
})

export const paymentVerification = asyncHandler(async (req, res) => {

      console.log(req.body);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

      const isAuthentic = expectedSignature === razorpay_signature;

      if(isAuthentic){
            "To be continue..."
      }else{
            return res.status(400).json(new apiError(401, {}, "OOPS Rezorpay Signature Did't Matched!"));
      }

      return res.status(200).json(new apiResponse(201, {}, "Succes True"));
})

export const getRazorKey = asyncHandler(async (req, res) => {

      return res.status(200).json(new apiResponse(201, { key: process.env.RAZORPAY_KEY }, "RazorPay Key Fetched Successfully"));
})