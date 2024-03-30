import { Router } from "express";
import productUpload from "../Controllers/product.controller.js";
import { upload } from "../MiddleWare/Multer.middleWare.js";

const router = Router();

router.route("/product").post(
    upload.single('images'),
    productUpload)

export default router;