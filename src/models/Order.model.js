import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  orderItems: [
    {
      name: String,
      images: String,
      category: String,
      newPrice: Number,
      oldPrice: Number,
      avilable: String,
      size: String,
      stock: String,
      quantity: Number,
      ProductId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true,
      },
    },
  ],
});

export const Order = mongoose.model("Order", OrderSchema);
