import { User } from "../models/User.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const adminOnly = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
  console.log(id);
  if (!id) throw new apiError(400, "Invalid id");

  const user = await User.findById(id);
  if (!user) throw new apiError(401, "Invalid user");

  if(user.role !== "Admin") throw new apiError(401, "You dont have the authority to access");

  next();
});

export default adminOnly;
