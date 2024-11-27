import express from "express";
import connectDB from "./mongoDB/connect.js";
import * as dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"

dotenv.config();
connectDB(process.env.MONGODB_URL);

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello sandyy");
});


//*Middlewares
app.use(express.json()); //to parse JSON data in req.body
app.use(express.urlencoded({extended: true}))
// app.use(cookieParser());


//*Routes
app.use('/api/users',userRoutes);
app.use('/api/projects',projectRoutes);


const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on  PORT : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
