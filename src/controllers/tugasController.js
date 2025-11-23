import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// GET all tugas
export const getAllTugas = async (req, res) => {
  try {
    const { mataKuliahId, status } = req.query;

    const where = {};
    if (mataKuliahId) where.mataKuliahId = mataKuliahId;
    if (status) where.status = status;

    const tugas = await prisma.tugas.findMany({
      where,
      include: {
        mataKuliah: true
      },
      orderBy: { deadline: "asc" }
    });

    res.json(tugas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tugas" });
  }
};

// GET tugas by ID
export const getTugasById = async (req, res) => {
  try {
    const { id } = req.params;

    const tugas = await prisma.tugas.findUnique({
      where: { id },
      include: {
        mataKuliah: true
      }
    });

    if (!tugas) {
      return res.status(404).json({ error: "Tugas not found" });
    }

    res.json(tugas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tugas" });
  }
};

// CREATE new tugas
export const createTugas = async (req, res) => {
  try {
    const { nama, deskripsi, deadline, mataKuliahId, status } = req.body;

    if (!nama) {
      return res.status(400).json({ error: "Nama tugas is required" });
    }

    if (!mataKuliahId) {
      return res.status(400).json({ error: "Mata kuliah ID is required" });
    }

    // Verify mata kuliah exists
    const matkulExists = await prisma.mataKuliah.findUnique({
      where: { id: mataKuliahId }
    });

    if (!matkulExists) {
      return res.status(404).json({ error: "Mata kuliah not found" });
    }

    const tugas = await prisma.tugas.create({
      data: {
        nama,
        deskripsi: deskripsi || null,
        deadline: deadline ? new Date(deadline) : null,
        status: status || "BELUM_DIKERJAKAN",
        mataKuliahId
      },
      include: {
        mataKuliah: true
      }
    });

    res.status(201).json(tugas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tugas" });
  }
};

// UPDATE tugas
export const updateTugas = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi, deadline, status, mataKuliahId } = req.body;

    const updateData = {};
    if (nama !== undefined) updateData.nama = nama;
    if (deskripsi !== undefined) updateData.deskripsi = deskripsi;
    if (deadline !== undefined) updateData.deadline = deadline ? new Date(deadline) : null;
    if (status !== undefined) updateData.status = status;
    if (mataKuliahId !== undefined) updateData.mataKuliahId = mataKuliahId;

    const tugas = await prisma.tugas.update({
      where: { id },
      data: updateData,
      include: {
        mataKuliah: true
      }
    });

    res.json(tugas);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tugas not found" });
    }
    res.status(500).json({ error: "Failed to update tugas" });
  }
};

// DELETE tugas
export const deleteTugas = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tugas.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tugas not found" });
    }
    res.status(500).json({ error: "Failed to delete tugas" });
  }
};