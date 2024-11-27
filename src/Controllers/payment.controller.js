import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../index.js";
import apiResponse from "../utils/apiResponce.js";
import crypto from "crypto";
import apiError from "../utils/apiError.js";
import { Payment } from "../models/Payment.model.js";

export const checkout = asyncHandler(async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  return res
    .status(200)
    .json(new apiResponse(201, order, "Payment Successfull"));
});

export const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // data base comes here
    // i will push here for consistency
    // will continue push for consistency
    // commenting for consistency
    // continuing for consistency
    // continuing for consistency
    // doing for consistency
    // doing for consistency just to set the 2024 target
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?refrence=${razorpay_payment_id}`
    );
  } else {
    return res
      .status(400)
      .json(new apiError(401, {}, "OOPS Rezorpay Signature Did't Matched!"));
  }

  return res.status(200).json(new apiResponse(201, {}, "Succes True"));
});

export const getRazorKey = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new apiResponse(
        201,
        { key: process.env.RAZORPAY_KEY },
        "RazorPay Key Fetched Successfully"
      )
    );
});
