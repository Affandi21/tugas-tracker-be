import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matkulRoutes from "./routes/matkulRoutes.js";
import tugasRoutes from "./routes/tugasRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Tugas Tracker API", 
    version: "1.0.0",
    endpoints: {
      mataKuliah: "/api/matkul",
      tugas: "/api/tugas"
    }
  });
});

app.use("/api/matkul", matkulRoutes);
app.use("/api/tugas", tugasRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});