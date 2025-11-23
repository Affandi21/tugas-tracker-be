import express from "express";
import {
  getAllTugas,
  getTugasById,
  createTugas,
  updateTugas,
  deleteTugas,
} from "../controllers/tugasController.js";

const router = express.Router();

router.get("/", getAllTugas);
router.get("/:id", getTugasById);
router.post("/", createTugas);
router.put("/:id", updateTugas);
router.delete("/:id", deleteTugas);

export default router;