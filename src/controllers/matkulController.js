import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// GET all mata kuliah
export const getAllMatkul = async (req, res) => {
  try {
    const { include } = req.query;
    
    const includeOptions = {};
    if (include === "tugas") {
      includeOptions.tugas = true;
      includeOptions._count = {
        select: { tugas: true }
      };
    }

    const matkul = await prisma.mataKuliah.findMany({
      include: includeOptions,
      orderBy: { createdAt: "desc" }
    });

    res.json(matkul);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch mata kuliah" });
  }
};

// GET mata kuliah by ID
export const getMatkulById = async (req, res) => {
  try {
    const { id } = req.params;
    const { include } = req.query;

    const includeOptions = {};
    if (include === "tugas") {
      includeOptions.tugas = {
        orderBy: { deadline: "asc" }
      };
    }

    const matkul = await prisma.mataKuliah.findUnique({
      where: { id },
      include: includeOptions
    });

    if (!matkul) {
      return res.status(404).json({ error: "Mata kuliah not found" });
    }

    res.json(matkul);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch mata kuliah" });
  }
};

// CREATE new mata kuliah
export const createMatkul = async (req, res) => {
  try {
    const { nama, deskripsi, sks } = req.body;

    if (!nama) {
      return res.status(400).json({ error: "Nama mata kuliah is required" });
    }

    const matkul = await prisma.mataKuliah.create({
      data: {
        nama,
        deskripsi: deskripsi || null,
        sks: sks || 3
      }
    });

    res.status(201).json(matkul);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create mata kuliah" });
  }
};

// UPDATE mata kuliah
export const updateMatkul = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi, sks } = req.body;

    const matkul = await prisma.mataKuliah.update({
      where: { id },
      data: {
        nama,
        deskripsi,
        sks
      }
    });

    res.json(matkul);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Mata kuliah not found" });
    }
    res.status(500).json({ error: "Failed to update mata kuliah" });
  }
};

// DELETE mata kuliah
export const deleteMatkul = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.mataKuliah.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Mata kuliah not found" });
    }
    res.status(500).json({ error: "Failed to delete mata kuliah" });
  }
};