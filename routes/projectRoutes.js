import express from "express";
import {
  createProject,
  createSecuredProject,
  deleteProject,
  getAllProjects,
  getSecuredAllProjects,
} from "../controller/projectController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

//*  project route
router.post("/create", createProject);
router.delete("/:id",verifyToken ,deleteProject);
router.get("/getAllProjects", verifyToken, getAllProjects);


//*  V1- Secured Api routes
router.post("/v1/create", createSecuredProject);
router.get("/v1/getAllProjects", verifyToken, getSecuredAllProjects);



export default router;
