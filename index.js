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

mongoose.connect("mongodb+srv://namankumar62039:Namankumar62039%K@cluster0.m8xmhmh.mongodb.net/e-commers")

// API creation

app.get("/", (req, res) => {
    res.send("Express app is Running")
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server Running On Port: ${PORT}`)
    }
    else{
        console.log(`Error: ${error}`)
    }
})