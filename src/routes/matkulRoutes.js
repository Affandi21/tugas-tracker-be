import express from "express";
import {
  getAllMatkul,
  getMatkulById,
  createMatkul,
  updateMatkul,
  deleteMatkul,
} from "../controllers/matkulController.js";

const router = express.Router();

router.get("/", getAllMatkul);
router.get("/:id", getMatkulById);
router.post("/", createMatkul);
router.put("/:id", updateMatkul);
router.delete("/:id", deleteMatkul);

export default router;