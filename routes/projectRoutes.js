import express from "express"
import { createProject } from "../controller/projectController.js";

const router = express.Router();


//*create project route
router.post('/create',createProject);

export default router