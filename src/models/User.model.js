import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName:
    {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:
    {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:
    {
        type: String,
        require: [true, "Password Is Required"]
    }
}, { timestamps: true }
)

export const User = mongoose.model("User", userSchema);