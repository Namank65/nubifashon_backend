import { Router } from "express";
import productUpload from "../Controllers/product.controller.js";

const router = Router();

router.route("/product").post(productUpload)

export default router;