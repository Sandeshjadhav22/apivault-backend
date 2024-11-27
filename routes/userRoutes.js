import express from "express"
import { logInUser, signupUser } from "../controller/userController.js";

const router = express.Router();


router.get('/signup',signupUser);
router.get('/login',logInUser);


export default router