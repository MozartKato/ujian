import { prisma } from "../prisma.js";

export async function listQuestionsBySubject(req, res) {
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
