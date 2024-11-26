import express from "express"
import { signupUser } from "../controller/userController.js";

const router = express.Router();


router.get('/signup',signupUser);


export default router