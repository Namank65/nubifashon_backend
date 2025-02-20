import { Router } from "express";
import { allOrders, newOrder, removeOrder } from "../Controllers/Order.Controller.js";
import productAuth from "../MiddleWare/productAuth.middleware.js";

const router = Router();

router.route("/newOrder").post(productAuth, newOrder);
router.route("/allOrders").get(allOrders);
router.route("/removeOrder").post(removeOrder);

export default router;