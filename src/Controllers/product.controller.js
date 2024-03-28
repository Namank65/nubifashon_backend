import asyncHandler from "../utils/asyncHandler.js";

const productUpload = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "OK Product Uploaded Successfully"
    })
})

export default productUpload;