import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Product } from "../models/Product.model.js";
import apiResponse from "../utils/apiResponce.js"

const productUpload = asyncHandler(async (req, res) => {
    console.log(req.file)

    const productLocalPath = req.file?.path;

    if (!productLocalPath) {
        throw new apiError(401, "Product Image Is Required")
    }

    const productImage = await uploadOnCloudinary(productLocalPath);

    if (!productImage) {
        throw new apiError(402, "Product Is Required")
    }

    return res.status(201).json(
        new apiResponse(200, {images: productImage.url}, "Product Created Successfully")
    )

})

const addProduct = asyncHandler(async (req, res) => {

    let product = await Product.find({})
    let id;
    if (product.length > 0) {
        let lastProductArray = product.slice(-1)
        let lastProduct = lastProductArray[0]
        id = lastProduct.id + 1
    } else (
        id = 1
    )

    const { name, images, category, newPrice, oldPrice } = req.body;
    const createdProduct = await Product.create({ id, name, images, category, newPrice, oldPrice })
    await createdProduct.save()

    return res.status(200).json(new apiResponse(200, createdProduct, "Producted Created And Added Successfully "))
})

const removeProduct = asyncHandler(async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    return res.status(201).json(new apiResponse(200, { name: req.body.name }, "Product Removed Successfully"))
})

const allProducts = asyncHandler(async(req, res) => {
    const allProduct = await Product.find({});
    return res.status(201).json( new apiResponse(200, allProduct, "All Product Fetched Successfully"))
})

const newCollection = asyncHandler(async(req, res) => {
    const product = await Product.find({})
    const newCollection = product.slice(1).slice(-8)

    return res.status(200).json(new apiResponse(201, newCollection, "New Collection Fecthed SuccessFully"))
})

const popularInWomen = asyncHandler(async(req, res) => {
    const product = await Product.find({category: "Women"});
    const popularInWomen = product.slice(0,4);

    return res.status(200).json(new apiResponse(201, popularInWomen, "Popular In Women Fetched Sucessfully"))
})

const addToCart = asyncHandler(async(req, res) => {
    console.log(req.body, req.user);
})

export { productUpload, addProduct, removeProduct, allProducts, newCollection, popularInWomen, addToCart };
