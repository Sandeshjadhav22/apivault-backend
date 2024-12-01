import express from "express"
import { logInUser, signupUser } from "../controller/userController.js";

const router = express.Router();


router.post('/signup',signupUser);
router.post('/login',logInUser);


export default router