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
    const {ProductId} = req.body
    console.log(ProductId);

    const productId = mongoose.Types.ObjectId(ProductId);
const order = await Order.findOneAndDelete({ "orderItems.ProductId": productId });
    
    // const order = await Order.findOneAndDelete({ ProductId: ProductId});
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