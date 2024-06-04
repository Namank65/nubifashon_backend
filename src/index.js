import ConnectDB from "./DB/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import razorpay from "razorpay";


dotenv.config({
    path: "./env"
})

// adding razorpay for payment

export const instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})


// dataBase connection with mongoDb

ConnectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server Is Running At Port: ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(`MongoDB Connection Failed !! ${error}`)
    })
