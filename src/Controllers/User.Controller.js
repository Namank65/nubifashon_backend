import asyncHandeler from "../utils/asyncHandler.js"

const RegisterUser = asyncHandeler(async (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})

export default RegisterUser;

