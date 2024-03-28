import apiError from "../utils/apiError.js";
import asyncHandeler from "../utils/asyncHandler.js"
import { User } from "../Models/User.model.js";

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

    const existedUser = User.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser){
        throw new apiError(401, "User With User Name Or Email Already Existed")
    }



})

export default RegisterUser;

