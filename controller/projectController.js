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
    const { projectName, apiKeys, userId } = req.body;

    //!debug
    console.log("Request Body:", req.body);

    if (!userId) {
      return res.status(400).json({ message: "user ID  required" });
    }

    if (!projectName || !apiKeys || apiKeys.length === 0) {
      return res
        .status(400)
        .json({ message: "Project name and API keys are  required." });
    }

    //! Debugging: Check apiKeys data
    console.log("API Keys:", apiKeys);

    const transformedApiKeys = apiKeys.map((key) => ({
      name: key.name,
      encryptedKey: key.key, // No encryption applied for now
    }));

    //! Debugging: Check transformed apiKeysArray
    console.log("Transformed API Keys:", transformedApiKeys);

    const project = new Project({
      projectName,
      user: userId, // Valid userId
      apikeys: [
         { name: 'Test Key', encryptedKey: 'Test Value' },
     ],
    });

    //!debug for project
    console.log("Project before save:", project);

    const savedProject = await project.save();

    //!debug for save user
    console.log("Saved Project:", savedProject);

    const user = await User.findById(userId);
    if (user) {
      user.projects.push(savedProject._id);
      await user.save();
    } else {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(201).json({
      message: "Project created successfully!",
      project: savedProject,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating the project." });
  }
};

export { createProject };
