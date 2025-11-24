import { prisma } from "../prisma.js";

export async function listSubjects(_req, res) {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
}
