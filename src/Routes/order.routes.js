import { Router } from "express";
import { allOrder, newOrder } from "../Controllers/Order.Controller.js";

const router = Router();

router.route("/newOrder").post(newOrder);
router.route("/allOrders").get(allOrder);

export default router;