import {Router} from "express";
import {RegisterUser, logOutUser, loginUser, refreshAccessToken, myUserProfile, allUsers, getUser, deletUser, getRole } from "../Controllers/User.Controller.js";
import verifyJwt from "../MiddleWare/auth.middleWare.js";
import adminOnly from "../MiddleWare/Admin.middleware.js";

const router = Router();

router.route("/register").post( RegisterUser)
router.route("/login/:id").post(loginUser)
router.route("/all").get(adminOnly, allUsers)

// Secured routes
router.route("/profile").get(verifyJwt, myUserProfile)
router.route("/logout").get(verifyJwt, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)


router.route("/:id").get( getUser).delete(deletUser)
router.route("/:id/role").get( getRole)

export default router;