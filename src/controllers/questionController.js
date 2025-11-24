const { prisma } = require("../prisma");

async function listQuestionsBySubject(req, res) {
  const subjectId = req.params.subjectId;

  try {
    const questions = await prisma.question.findMany({
      where: { subject_id: subjectId },
      include: { answers: true },
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
}

async function addQuestion(req, res) {
  const { subjectId, text, level } = req.body || {};
  if (!subjectId || !text || !level) {
    return res.status(400).json({ message: "subjectId, text, and level are required" });
  }
  try {
    const newQuestion = await prisma.question.create({
      data: { subject_id: subjectId, text, level },
    });
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ message: "Failed to add question", error: err.message });
  }
}

module.exports = { listQuestionsBySubject, addQuestion };