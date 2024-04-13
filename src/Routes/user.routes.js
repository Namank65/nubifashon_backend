import {Router} from "express";
import {RegisterUser, logOutUser, loginUser, refreshAccessToken, temRoute } from "../Controllers/User.Controller.js";
import verifyJwt from "../MiddleWare/auth.middleWare.js";

const router = Router();

router.route("/register").post(verifyJwt, RegisterUser)
router.route("/login").post(loginUser)
router.route("/").get(temRoute)

// Secured routes
router.route("/logout").get(verifyJwt, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;