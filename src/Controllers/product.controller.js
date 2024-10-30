import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Product } from "../models/Product.model.js";
import apiResponse from "../utils/apiResponce.js";
import { User } from "../models/User.model.js"

const productUpload = asyncHandler(async (req, res) => {

    const productLocalPath = req.file?.path;

    if (!productLocalPath) {
        throw new apiError(401, "Product Image Is Required")
    }

    const productImage = await uploadOnCloudinary(productLocalPath);

    if (!productImage) {
        throw new apiError(402, "Product Image Is Required")
    }

    return res.status(201).json(
        new apiResponse(200, { images: productImage.url }, "Product Image Updated Successfully")
    )

})

// this api is under construction and will complet it soon

// const newProduct1 = asyncHandler(async (req, res) => {
//     const { name, images, category, newPrice, oldPrice, size, stock } = req.body;

//     if([name, images, category, newPrice, oldPrice, size, stock ].some((field) => field?.trim() === "")) {
//         throw new apiError(401, "All feilds are required")
//     }

//     const createdProduct = await Product.create({ id, name, images, category, newPrice, oldPrice, size, stock })
//     await createdProduct.save()

//     return res.status(200).json(new apiResponse(200, createdProduct, "Producted Created And Added Successfully "))
// })

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
    const { name, images, category, newPrice, oldPrice, size, stock } = req.body;

    if([name, images, category, newPrice, oldPrice, size ].some((field) => field?.trim() === "")) {
        throw new apiError(401, "All feilds are required")
    }

    const createdProduct = await Product.create({ id, name, images, category, newPrice, oldPrice, size, stock })
    await createdProduct.save()

    return res.status(200).json(new apiResponse(200, createdProduct, "Producted Created And Added Successfully "))
})

const removeProduct = asyncHandler(async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    return res.status(201).json(new apiResponse(200, { name: req.body.name }, "Product Removed Successfully"))
})

const allProducts = asyncHandler(async (req, res) => {
    const allProduct = await Product.find({});

    if(!allProduct) throw new apiError(400, "Couldn't Found The Product");

    return res.status(201).json(new apiResponse(200, allProduct, "All Product Fetched Successfully"))
})

const getLatestProduct = asyncHandler(async (req, res) => {
    const product = await Product.find({}).sort({createdAt: -1}).limit(5);

    if(!product) throw new apiError(400, "Couldn't Found The Products");

    return res.status(200).json(new apiResponse(201, product, "All Latested products Fecthed SuccessFully"))
})

const categories = asyncHandler(async (req, res) => {
    const category = await Product.distinct("category");

    if(!category) throw new apiError(400, "Couldn't Found The Given Categories");

    return res.status(200).json(new apiResponse(201, category, "All Unique Categories Fecthed SuccessFully"))
})

const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) throw new apiError(400, "Couldn't Found The Given Product");

    return res.status(200).json(new apiResponse(201, product, "Project Fecthed SuccessFully"))
})

const newCollection = asyncHandler(async (req, res) => {
    const product = await Product.find({});
    const newCollection = product.slice(1).slice(-8);

    if(!newCollection) throw new apiError(400, "Error in Fetching NewCollection");

    return res.status(200).json(new apiResponse(201, newCollection, "New Collection Fecthed SuccessFully"))
})

const popularInWomen = asyncHandler(async (req, res) => {
    const product = await Product.find({ category: "Women" });
    const popularInWomen = product.slice(0, 4);

    if(!popularInWomen) throw new apiError(400, "Error in Fetching Popular In Women");

    return res.status(200).json(new apiResponse(201, popularInWomen, "Popular In Women Fetched Sucessfully"))
})

const addToCart = asyncHandler(async (req, res) => {
    let userData = await User.findOne({ _id: req.user?._id });

    if(!userData) throw new apiError(400, "Error in Fetching User Data");
    // userData.cartData[req.body.itemId] += 1;

    // userData.cartData[req.body.itemId].quantity += 1;
    userData.cartData[req.body.itemId].quantity += 1;
    console.log(userData.cartData)
    console.log(req.body.itemId)

    // userData.cartData[req.body.itemId].productSize = size;
    // will continue working on it from tomorrow
    
    await User.findByIdAndUpdate({ _id: req.user._id }, { cartData: userData.cartData });
    
    return res.status(200).json(new apiResponse(201, {}, "Product Added To The Cart Successfully"))
})

const removeFromCart = asyncHandler(async (req, res) => {
    let userData = await User.findOne({ _id: req.user?._id })

    if(!userData) throw new apiError(400, "Error in Fetching User Data");
    
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }

    await User.findByIdAndUpdate({ _id: req.user._id }, { cartData: userData.cartData })

    return res.status(200).json(new apiResponse(201, {}, "Product Removed From The Cart Successfully"))
})

const getCart = asyncHandler(async (req, res) => {
    const userData = await User.findOne({_id: req.user?._id});
    if(!userData) throw new apiError(400, "Error in Fetching User Data");

    return res.status(200).json(new apiResponse(201, userData.cartData, "Fetched All User's Cart Data Successfully"))
})

export { productUpload, addProduct, removeProduct, allProducts, newCollection, popularInWomen, addToCart, removeFromCart, getCart, getLatestProduct, categories, getSingleProduct };
