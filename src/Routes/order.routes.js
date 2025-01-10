import { Router } from "express";
import { newOrder } from "../Controllers/Order.Controller.js";

const router = Router();

router.route("/NewOrder").post(newOrder);

export default router;