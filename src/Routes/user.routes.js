import {Router} from "express";
import {RegisterUser, logOutUser, loginUser, refreshAccessToken, myUserProfile } from "../Controllers/User.Controller.js";
import verifyJwt from "../MiddleWare/auth.middleWare.js";

const router = Router();

router.route("/register").post( RegisterUser)
router.route("/login").post(loginUser)
router.route("/profile").get(verifyJwt, myUserProfile)

// Secured routes
router.route("/logout").get(verifyJwt, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;