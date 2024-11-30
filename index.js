import express from "express";
import connectDB from "./mongoDB/connect.js";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello sandyy");
});

//*Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//*Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

export default app;

if (process.env.NODE_ENV !== "vercel") {
  connectDB(process.env.MONGODB_URL);
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
}
