import express from "express";
import { register ,login, getUserProfile, logout, updateProfile} from "../Controllers/user_controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router=express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated,getUserProfile);  //first have to pass through the isauth middleware which checks the auth token of curr user
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
export default router;
