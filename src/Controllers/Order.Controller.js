import mongoose, { isValidObjectId } from "mongoose";
import { Order } from "../models/Order.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponce.js";
import asyncHandler from "../utils/asyncHandler.js";

const newOrder = asyncHandler(async (req, res) => {
    const { user, orderItems } = req.body;

    if(!user || !orderItems) throw new apiError(401, "All details were necessary");
  
    const createdOrder = await Order.create({user, orderItems});

    if(!createdOrder) throw new apiError(401, "Something Went Wrong with order creation");

    await createdOrder.save();
  
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          createdOrder,
          "Order Placed Successfully"
        )
      );
  });

  const removeOrder= asyncHandler(async (req, res) => {
    const {_id} = req.body
    console.log(_id);
    
    // const objectId = new mongoose.Types.ObjectId(ProductId)
    
    // const order = await Order.findOneAndDelete({ ProductId: objectId});
    const order = await Order.findOne({"_id" : _id},{orderItems: {$elemMatch: {_id: new mongoose.Types.ObjectId('67bb747bd5eff42becd7e600')}}});
    console.log(order);
    
    if (!order) throw new apiError(400, "Couldn't Found The Order");
    

    await order.save()
    
    return res
      .status(201)
      .json(
        new apiResponse(
          200,
          {},
          "Order Removed Successfully"
        )
      );
  });
  

const allOrders = asyncHandler(async (req, res) => {

    const order = await Order.find({});
    console.log(order);
    
    if(!order) throw new apiError(401, "Something Went Wrong While Getting All Orders ");
  
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          order,
          "Order Placed Successfully "
        )
      );
  });

  export {newOrder, allOrders, removeOrder};