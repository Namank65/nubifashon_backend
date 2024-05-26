import { Router } from "express";
import { addProduct, addToCart, allProducts, newCollection, popularInWomen, productUpload, removeProduct } from "../Controllers/product.controller.js";
import { upload } from "../MiddleWare/Multer.middleWare.js";

const router = Router();

router.route("/product").post(
    upload.single('images'),
    productUpload)

router.route("/addProduct").post(addProduct);
router.route("/removeProduct").post(removeProduct);
router.route("/allProducts").get(allProducts);
router.route("/newCollection").get(newCollection);
router.route("/popularInWomen").get(popularInWomen);
router.route("/addToCart").post(addToCart);
export default router;
