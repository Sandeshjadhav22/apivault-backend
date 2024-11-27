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

export { createProject };
