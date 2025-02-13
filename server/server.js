import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "../server/routes/userRoutes.js";
import bodyParser from "body-parser";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/usercrud")
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error.message));

app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log("server runnning on", port);
});
