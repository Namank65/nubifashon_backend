import {Router} from "express";
import {RegisterUser, logOutUser, loginUser, refreshAccessToken, myUserProfile, allUsers, getUser, deletUser } from "../Controllers/User.Controller.js";
import verifyJwt from "../MiddleWare/auth.middleWare.js";
import adminOnly from "../MiddleWare/Admin.middleware.js";

const router = Router();

router.route("/register").post( RegisterUser)
router.route("/login").post(loginUser)
router.route("/all").get(adminOnly, allUsers)
router.route("/:id").get( getUser)
router.route("/:id").get( getUser).delete(deletUser)

// Secured routes
router.route("/profile").get(verifyJwt, myUserProfile)
router.route("/logout").get(verifyJwt, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;