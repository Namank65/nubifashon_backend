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