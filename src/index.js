// const jwt = require("jsonwebtoken");
// const path = require("path");
// import multer from "multer";
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

// API creation

// app.get("/", (req, res) => {
//     res.send("Express app is Running")
// });

// image storage engine

// const storage = multer.diskStorage({
//     destination: "./upload/images",
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
//     }
// });

// const upload = multer({ storage });

// app.use("/images", express.static('upload/images'));

// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images${req.file.filename}`
//     })
// });
