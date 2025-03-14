import apiError from "../utils/apiError.js";
import asyncHandeler from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import apiResponse from "../utils/apiResponce.js";
import { cookiesOptions } from "../Constants.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    if(!user) throw new apiError(401, "Product Image Is Required")

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something Went Wrong While Generating The Access And Refresh Tokens"
    );
  }
};

const RegisterUser = asyncHandeler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((fields) => fields?.trim() === "")) {
    throw new apiError(400, "Please provide the user credentials correctly");
  }

  if (!email.includes("@gmail.com")) {
    throw new apiError(401, "Please Enter A Valid Email Id");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new apiError(409, "User With User Name Or Email Already Existed");
  }

  let cart = {};
  for (let i = 0; i <= 100; i++) {
    cart[i] = {
      quantity: 0,
      productSize: "",
    };
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    password,
    cartData: cart,
  });

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid User Cridentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Registed And Logged In Successfully"
      )
    );
});

const loginUser = asyncHandeler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    throw new apiError(400, "User Name or password Is Required.");
  }
  if (password === "") {
    throw new apiError(404, "Please Enter A Valid Password");
  }

  const user = await User.findOne({ userName });

  if (!user) {
    throw new apiError(404, "User Name Or Email Dose Not Existed.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid User Cridentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken"
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logOutUser = asyncHandeler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(201)
    .clearCookie("accessToken", cookiesOptions)
    .clearCookie("refreshToken", cookiesOptions)
    .json(new apiResponse(200, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandeler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new apiError(401, "Unauthorized Request.");
    }

    const decordedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decordedToken._id);

    if (!user) {
      throw new apiError(401, "Invalid Refresh Token.");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(409, "Refresh Token is expired or already in use.");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookiesOptions)
      .cookie("refreshToken", newRefreshToken, cookiesOptions)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Refresh Token Updated Successfully"
        )
      );
  } catch (error) {
    throw new apiError(400, error?.message || "Invalid Refresh Token");
  }
});

const changeCurrentPassword = asyncHandeler(async (req, res) => {
  const { oldPassword, NewPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid Old Password");
  }

  user.password = NewPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new apiResponse(200, {}, "Password Updated Successfully"));
});

const allUsers = asyncHandeler(async (req, res) => {
  const users = await User.find({});

  return res
    .status(200)
    .json(new apiResponse(201, { users }, "All Users Fetched Successfully"));
});

const getUser = asyncHandeler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) throw new apiError(401, "Invalid id or user");

  return res
    .status(200)
    .json(new apiResponse(201, { user }, "User Fetched Successfully"));
});

const getRole = asyncHandeler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  console.log(user.role);
  

  if (!user) throw new apiError(401, "Invalid id or user");

  return res
    .status(200)
    .json(new apiResponse(201, { user }, "User Fetched Successfully"));
});

const deletUser = asyncHandeler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) throw new apiError(401, "Invalid id or user");

  await user.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(201, "User deleted Successfully"));
});

const myUserProfile = asyncHandeler(async (req, res) => {
  res
    .status(200)
    .json(new apiResponse(201, { user: req.user }, "working fine"));
});

export {
  RegisterUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  allUsers,
  getUser,
  deletUser,
  myUserProfile,
  getRole
};
