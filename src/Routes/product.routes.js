import { Router } from "express";
import { addProduct, addToCart, allProducts, newCollection, popularInWomen, productUpload, removeFromCart, removeProduct } from "../Controllers/product.controller.js";
import { upload } from "../MiddleWare/Multer.middleWare.js";
import productAuth from "../MiddleWare/productAuth.middleware.js";


const router = Router();

router.route("/product").post(
    upload.single('images'),
    productUpload)

router.route("/addProduct").post(addProduct);
router.route("/removeProduct").post(removeProduct);
router.route("/allProducts").get(allProducts);
router.route("/newCollection").get(newCollection);
router.route("/popularInWomen").get(popularInWomen);
router.route("/addToCart").post(productAuth, addToCart);
router.route("/removeFromCart").post(productAuth, removeFromCart);
export default router;
