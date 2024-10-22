import { Router } from "express";
import {
  addProduct,
  addToCart,
  allProducts,
  getCart,
  newCollection,
  popularInWomen,
  productUpload,
  removeFromCart,
  removeProduct,
  getLatestProduct,
  categories,
  getSingleProduct
} from "../Controllers/product.controller.js";
import { upload } from "../MiddleWare/Multer.middleWare.js";
import productAuth from "../MiddleWare/productAuth.middleware.js";

const router = Router();

router.route("/product").post(upload.single("images"), productUpload);

router.route("/allProducts").get(allProducts);
router.route("/newCollection").get(newCollection);
router.route("/latest").get(getLatestProduct);
router.route("/categories").get(categories);
router.route("/popularInWomen").get(popularInWomen);
router.route("/:id").get(getSingleProduct);

router.route("/addProduct").post(addProduct);
router.route("/removeProduct").post(removeProduct);
router.route("/removeFromCart").post(productAuth, removeFromCart);
router.route("/getCart").post(productAuth, getCart);
router.route("/addToCart").post(productAuth, addToCart);
export default router;
