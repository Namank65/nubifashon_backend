import {Router} from "express";
import {RegisterUser, logOutUser, loginUser, refreshAccessToken } from "../Controllers/User.Controller.js";
import verifyJwt from "../MiddleWare/auth.middleWare.js";

const router = Router();

router.route("/register").post(RegisterUser)
router.route("/login").post(loginUser)

// Secured routes
router.route("/logout").post(verifyJwt, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;