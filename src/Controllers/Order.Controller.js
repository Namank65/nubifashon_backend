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
    console.log(req.body.id);
    
    await Order.findOneAndDelete({ id: req.body._id });
    if (!Order) throw new apiError(400, "Couldn't Found The Order");
    return res
      .status(201)
      .json(
        new apiResponse(
          200,
          { name: req.body.name },
          "Order Removed Successfully"
        )
      );
  });
  

const allOrders = asyncHandler(async (req, res) => {

    const order = await Order.find({});
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