import apiError from "../utils/apiError.js";
import asyncHandeler from "../utils/asyncHandler.js"
import { User } from "../models/User.model.js";
import apiResponse from "../utils/apiResponce.js";
import { cookiesOptions } from "../Constants.js"
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new apiError(500, "Something Went Wrong While Generating The Access And Refresh Tokens")
    }
}

const RegisterUser = asyncHandeler(async (req, res) => {

    const { userName, email, password } = req.body;

    if
        (
        [userName, email, password].some((fields) => fields?.trim() === "")
    ) {
        throw new apiError(400, "Please provide the user credentials correctly")
    }

    if (!email.includes("@gmail.com")) {
        throw new apiError(401, "Please Enter A Valid Email Id")
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new apiError(409, "User With User Name Or Email Already Existed")
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(" -password -refreshToken");

    if (!createdUser) {
        throw new apiError(501, "Something Went Wrong While Registering A User")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User Created Successfully")
    )
})

const loginUser = asyncHandeler(async (req, res) => {
    const { userName, password } = req.body;

    if (!userName && password) {
        throw new apiError(400, "User Name or password Is Required.")
    }

    const user = await User.findOne({userName})

    if (!user) {
        throw new apiError(404, "User Name Or Email Dose Not Existed.")
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid User Cridentials.")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken")

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Logged In Successfully"
            )
        )
})

const logOutUser = asyncHandeler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
        .status(201)
        .clearCookie("accessToken", cookiesOptions)
        .clearCookie("refreshToken", cookiesOptions)
        .json(new apiResponse(200, {}, "User Logged Out Successfully"))
})

const refreshAccessToken = asyncHandeler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if (!incomingRefreshToken) {
            throw new apiError(401, "Unauthorized Request.")
        }
    
        const decordedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decordedToken._id)
    
        if (!user) {
            throw new apiError(401, "Invalid Refresh Token.")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(409, "Refresh Token is expired or already in use.")
        }
    
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
    
        return res
            .status(201)
            .cookie("accessToken", accessToken, cookiesOptions)
            .cookie("refreshToken", newRefreshToken, cookiesOptions)
            .json(
                new apiResponse(200, { accessToken, refreshToken: newRefreshToken },
                    "Refresh Token Updated Successfully")
            )
    } catch (error) {
        throw new apiError(400, error?.message || "Invalid Refresh Token")
    }
})

const changeCurrentPassword = asyncHandeler(async(req, res) => {
    const {oldPassword, NewPassword} = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new apiError(401, "Invalid Old Password")
    }

    user.password = NewPassword
    await user.save({validateBeforeSave: false})

    return res.status(201)
    .json(new apiResponse(200, {}, "Password Updated Successfully"))
})

const temRoute = asyncHandeler(async(req, res) => {
    res.json(new apiResponse(200, {}, "working fine"))
})

export {
    RegisterUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    temRoute
};
