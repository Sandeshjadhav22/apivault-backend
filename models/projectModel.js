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
      type: [apiKeySchema], // Ensure it references the sub-schema correctly
      default: [],         // Default to an empty array
  },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
// const APIKey = mongoose.model('APIKey', apiKeySchema);

export default Project;
