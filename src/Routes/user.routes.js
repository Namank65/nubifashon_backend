import {Router} from "express";
import RegisterUser from "../Controllers/User.Controller.js";

const router = Router();

router.route("/register").post(RegisterUser)

export default router;