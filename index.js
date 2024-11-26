import express from "express";
import connectDB from "./mongoDB/connect.js";
import * as dotenv from "dotenv"

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello sandyy");
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`Server started on PORT : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
