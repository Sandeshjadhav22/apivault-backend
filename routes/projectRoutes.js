import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
} from "../controller/projectController.js";
// import protectRoute from "../middlewares/protectRoute.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

//*project route
router.post("/create", createProject);
router.delete("/:id",verifyToken ,deleteProject);
router.get("/getAllProjects", verifyToken, getAllProjects);



export default router;
