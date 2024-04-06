import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Product } from "../models/Product.model.js";
import apiResponse from "../utils/apiResponce.js"

const productUpload = asyncHandler(async (req, res) => {

    console.log(req.file.path)
    const productLocalPath = req.file?.path;

    if (!productLocalPath) {
        throw new apiError(401, "Product Image Is Required")
    }

    const productImage = await uploadOnCloudinary(productLocalPath);

    if (!productImage) {
        throw new apiError(402, "Product Is Required")
    }

    const product = await Product.create({
        images: productImage.url
    })

    const createdProduct = await Product.findById(product._id);

    if (!createdProduct) {
        throw new apiError(500, "Somthing Went Wrond While Createting The Product")
    }

    return res.status(201).json(
        new apiResponse(200, createdProduct, "Product Created Successfully")
    )

})

export default productUpload;