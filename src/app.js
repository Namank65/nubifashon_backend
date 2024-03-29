import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("upload"));
app.use(cookieParser());

// routes import
import userRouter from "./Routes/user.routes.js";
import productRouter from "./Routes/product.routes.js";

// routes decleared
app.use("/api/v1/users", userRouter);

app.use("/api/v1/upload", productRouter)

export { app };