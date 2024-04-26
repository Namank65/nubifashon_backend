import { Router } from "express";
import { addProduct, productUpload } from "../Controllers/product.controller.js";
import { upload } from "../MiddleWare/Multer.middleWare.js";

const router = Router();

router.route("/product").post(
    upload.single('images'),
    productUpload)

export default router;

router.route("/addProduct").post(addProduct)