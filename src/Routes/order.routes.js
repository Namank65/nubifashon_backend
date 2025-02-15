import { Router } from "express";
import { allOrders, newOrder } from "../Controllers/Order.Controller.js";
import productAuth from "../MiddleWare/productAuth.middleware.js";

const router = Router();

router.route("/newOrder").post(productAuth, newOrder);
router.route("/allOrders").get(allOrders);

export default router;