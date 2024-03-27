import asyncHandeler from "../utils/asyncHandler.js"

const RegisterUser = asyncHandeler(async (req, res) => {
    res.status(200).json({
        message: "Hello User"
    })
})

export default RegisterUser;

