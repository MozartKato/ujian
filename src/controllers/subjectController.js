const { prisma } = require("../prisma");

async function listSubjects(_req, res) {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
}

async function addSubject(req, res) {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const newSubject = await prisma.subject.create({
      data: { name },
    });
    res.status(201).json(newSubject);
  } catch (err) {
    console.error("Error adding subject:", err);
    res.status(500).json({ message: "Failed to add subject", error: err.message });
  }
}

module.exports = { listSubjects, addSubject };
