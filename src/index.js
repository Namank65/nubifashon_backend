const PORT = 4000;
const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// dataBase connection with mongoDb

mongoose.connect("mongodb+srv://namankumar62039:naman123@cluster0.favsdhu.mongodb.net/nubi-fashion");

// API creation

app.get("/", (req, res) => {
    res.send("Express app is Running")
})

// image storage engine

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });
app.get("/storage", (req,res) => {
    res.send("storage is getting updated")
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server Running On Port: ${PORT}`)
    }
    else {
        console.log(`Error: ${error}`)
    }
})