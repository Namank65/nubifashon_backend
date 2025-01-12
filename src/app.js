import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Split the CORS_ORIGINS environment variable into an array
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json({limit: "10000kb"}));
app.use(express.urlencoded({extended: true, limit: "10000kb"}));
app.use(express.static("upload"));
app.use(cookieParser());

// routes import
import userRouter from "./Routes/user.routes.js";
import productRouter from "./Routes/product.routes.js";
import paymentRouter from "./Routes/payment.routes.js";
import orderRouter from "./Routes/order.routes.js";


// routes decleared
app.use("/api/v1/users", userRouter);
app.use("/api/v1/upload", productRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/order", orderRouter)
export { app };