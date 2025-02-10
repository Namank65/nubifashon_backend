import asyncHandler from "../utils/asyncHandler.js";
import { instance } from "../index.js";
import apiResponse from "../utils/apiResponce.js";
import crypto from "crypto";
import apiError from "../utils/apiError.js";
import { Payment } from "../models/Payment.model.js";
import { User } from "../models/User.model.js";

export const checkout = asyncHandler(async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  return res
    .status(200)
    .json(new apiResponse(201, order, "Payment Created"));
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
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    let userData = await User.findOne({ _id: req.user?._id });
    if (!userData) throw new apiError(400, "Error in Fetching User Data");

    console.log("i got the user outside the loop", userData.cartData[4])
    
    for (const item in userData.cartData) {
      console.log("i am in loop", userData.cartData[4])
      if (userData.cartData[item].quantity > 0) {
        console.log("cartdata in for loop", userData.cartData[item])
        userData.cartData[item].quantity = 0;
        userData.cartData[item].productSize = "";
      }
    }

    await userData.save()

   return res.redirect(`https://nubifashon.web.app/paymentsuccess?refrence=${razorpay_payment_id}`);

  } else {
    return res
      .status(400)
      .json(new apiError(401, {}, "OOPS Rezorpay Signature Did't Matched!"));
  }

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
