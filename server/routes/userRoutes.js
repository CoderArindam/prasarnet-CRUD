import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUserList,
  updateUser,
} from "../controllers/userControllers.js";
const router = express.Router();

router.post("/create", createUser);
router.get("/list", getUserList);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUserById);
export default router;
