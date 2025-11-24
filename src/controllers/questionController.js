const { prisma } = require("../prisma");

async function listQuestionsBySubject(req, res) {
  const subjectId = req.params.subjectId;
  const level = req.query.level;

  try {
    const where = { subject_id: subjectId };
    if (level) {
      where.level = level;
    }

    const questions = await prisma.question.findMany({
      where,
      include: { answers: true },
    });

    // Process each question to randomly select 4 answers
    const processedQuestions = questions.map(question => {
      const correctAnswers = question.answers.filter(a => a.is_right);
      const wrongAnswers = question.answers.filter(a => !a.is_right);

      // Ensure at least 1 correct answer exists
      if (correctAnswers.length === 0) {
        return { ...question, answers: question.answers.slice(0, 4) };
      }

      // Pick 1 correct answer randomly
      const selectedCorrect = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
      
      // Shuffle wrong answers and pick 3
      const shuffledWrong = wrongAnswers.sort(() => Math.random() - 0.5);
      const selectedWrong = shuffledWrong.slice(0, 3);

      // Combine and return (frontend will shuffle again)
      const selectedAnswers = [selectedCorrect, ...selectedWrong];

      return {
        ...question,
        answers: selectedAnswers
      };
    });

    res.json(processedQuestions);
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