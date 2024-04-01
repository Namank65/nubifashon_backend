import {Router} from "express";
import RegisterUser, { logOutUser, loginUser } from "../Controllers/User.Controller.js";
import verifyJwt from "../MiddleWare/auth.middleWare.js";

const router = Router();

router.route("/register").post(RegisterUser)
router.route("/login").post(loginUser)

// Secured routes
router.route("logout").post(verifyJwt, logOutUser)

export default router;