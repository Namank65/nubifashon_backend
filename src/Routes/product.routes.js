import { Router } from "express";
import { addProduct, allProducts, productUpload, removeProduct } from "../Controllers/product.controller.js";
import { upload } from "../MiddleWare/Multer.middleWare.js";

const router = Router();

router.route("/product").post(
    upload.single('images'),
    productUpload)

router.route("/addProduct").post(addProduct);
router.route("/removeProduct").post(removeProduct);
router.route("/allProducts").get(allProducts);
export default router;
