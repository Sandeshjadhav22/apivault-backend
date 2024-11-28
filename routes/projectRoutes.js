import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
} from "../controller/projectController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

//*project route
router.post("/create", createProject);
router.delete("/:id", deleteProject);
router.get("/getAllProjects", protectRoute, getAllProjects);



export default router;
