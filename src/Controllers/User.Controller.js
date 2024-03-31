import apiError from "../utils/apiError.js";
import asyncHandeler from "../utils/asyncHandler.js"
import { User } from "../Models/User.model.js";
import apiResponse from "../utils/apiResponce.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        ""
    } catch (error) {
        throw new apiError(500, "Something Went Wrong While Generating The Access And Refresh Tokens")
    }
}


const RegisterUser = asyncHandeler(async (req, res) => {
    
    const {userName, email, password} = req.body;

    if
    (
        [userName, email, password].some((fields) => fields?.trim() === "")
    ){
        throw new apiError(400, "Please provide the user credentials correctly")
    }

    if(!email.includes("@gmail.com")){
        throw new apiError(401, "Please Enter A Valid Email Id")
    }

    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser){
        throw new apiError(409, "User With User Name Or Email Already Existed")
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(" -password -refreshToken");

    if(!createdUser){
        throw new apiError(501, "Something Went Wrong While Registering A User")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User Created Successfully")
    )
})

const loginUser = asyncHandeler(async(req, res) => {
    const {userName, email, password} = req.body;

    if (!(userName || email)) {
        throw new apiError(400, "User Name Or Email Is Required.")
    }

    const user = await User.findOne({
        $or: [{userName}, {email}]
    })

    if(!user) {
        throw new apiError(404, "User Name Or Email Dose Not Existed.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new apiError(401, "Invalid User Cridentials.")
    }

})

export  {
    RegisterUser,
    loginUser
};

