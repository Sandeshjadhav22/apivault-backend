import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import { decrypt, encrypt } from "../utils/cryptoUtils.js";

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
  const projectId = req.params.id;
  const userId = req.user.userId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found!" });
    }

    if (project.user.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorised to deleted the project" });
    }

    await Project.findByIdAndDelete(projectId);
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
    //get user id from jwt middleware
    const userId = req.user.userId;

    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });
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

const createSecuredProject = async (req, res) => {
  try {
    const { projectName, userId, apiKeys } = req.body;
    if (!projectName || !userId || !apiKeys) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["projectName", "userId", "apiKeys"]
      });
    }

    const transformedApiKeys = apiKeys.map((key) => {
      const encrypted = encrypt(key.key);
      return {
        name: key.name,
        encryptedKey: encrypted.encryptedData,
        iv: encrypted.iv,
        authTag: encrypted.authTag
      };
    });

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
    res.status(500).json({
      message: error.message,
      receivedData: req.body,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const getSecuredAllProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No Project found" });
    }

    //decrypt
    const decryptedProjects = projects.map(project => {
      const decryptedKeys = project.apikeys.map(key => ({
        name: key.name,
        key: decrypt(key.encryptedKey, key.iv, key.authTag)
      }));

      return {
        ...project.toObject(),
        apikeys: decryptedKeys
      };
    });

    res.status(200).json({
      message: "Projects retrieved successfully!",
      projects: decryptedProjects,
    });
  } catch (error) {
    console.error("Error in Get All Projects controller:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

export {
  createProject,
  deleteProject,
  getAllProjects,
  createSecuredProject,
  getSecuredAllProjects,
};
