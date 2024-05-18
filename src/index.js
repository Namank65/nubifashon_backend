import ConnectDB from "./DB/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
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
