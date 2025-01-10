import { Order } from "../models/Order.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const newOrder = asyncHandler(async (req, res) => {
    const { name, images, category, newPrice, oldPrice, size, stock, ProductId } = req.body;

    let order=[];

    order = await Order.find();
    
    if (!order) throw new apiError(400, "Couldn't Found The Order Details");

  
    if (
      [name, images, category, newPrice, oldPrice, size, ProductId].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new apiError(401, "All feilds are required");
    }
  
    const createdOrder = await Order.create({
      name,
      images,
      category,
      newPrice,
      oldPrice,
      size,
      stock,
      ProductId
    });
    await createdOrder.save();
  
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          createdOrder,
          "Order Placed Successfully "
        )
      );
  });

  export {newOrder}