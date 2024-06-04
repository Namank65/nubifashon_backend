import { Router } from "express";
import { checkout } from "../Controllers/payment.controller.js";

const router = Router();

router.route("/checkout").post(checkout)

export default router;