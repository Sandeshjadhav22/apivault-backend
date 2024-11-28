import express from "express"
import { createProject, deleteProject } from "../controller/projectController.js";

const router = express.Router();


//*create project route
router.post('/create',createProject);
router.delete('/:id',deleteProject);

export default router