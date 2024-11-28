// import Project from "../models/projectModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
// import crypto from "crypto";

// const encryptAPIKey = (apiKey) => {
//   const algorithm = "aes-256-cbc";
//   const key = crypto.randomBytes(32); // Ideally, store and reuse a secure encryption key
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(apiKey, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   return {
//     encryptedKey: encrypted,
//     iv: iv.toString("hex"),
//     key: key.toString("hex"), // Save this key securely for decryption
//   };
// };

const createProject = async (req, res) => {
  try {
    const { apiKeys, projectName, userId } = req.body;

    const transformedApiKeys = apiKeys.map((key) => ({
      name: key.name,
      encryptedKey: key.key, // No encryption for now
    }));

    const project = new Project({
      projectName: projectName,
      user: userId,
      apikeys: transformedApiKeys,
    });

    const savedProject = await project.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { projects: savedProject._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Project created successfully!",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found!" });
    }
    
    if(project.user.toString() !== req.user._id.toString()){
      return res
        .status(401)
        .json({ error: "Unauthorised to deleted the project" });
    }

    
    await Project.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(project.user, {
      $pull: { projects: project._id },
    });
    res.status(200).json({ message: "Project deleted succesfully" });
  } catch (error) {
    res.status(500).json({ error });
    console.log("Error in Delete Project controller", error);
  }
};

const getAllProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const projects = await Project.find({ user: userId });
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No Project found" });
    }

    res.status(200).json({
      message: "Projects retrieved successfully!",
      projects,
    });
  } catch (error) {
    console.error("Error in Get All Projects controller:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

export { createProject, deleteProject, getAllProjects };
