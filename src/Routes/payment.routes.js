import { Router } from "express";
import { checkout, getRazorKey, paymentVerification } from "../Controllers/payment.controller.js";

const router = Router();

router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification);
router.route("/getRazorKey").get(getRazorKey);

export default router;