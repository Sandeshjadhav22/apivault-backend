import mongoose from "mongoose";

const apiKeySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  encryptedKey: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
  authTag: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    apikeys: {
      type: [apiKeySchema],
      default: [],        
  },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
