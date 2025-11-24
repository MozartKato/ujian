const { prisma } = require("../prisma");

async function startSession(req, res) {
  const { userId } = req.body || {};

  try {
    const session = await prisma.session.create({
      data: {
        user_id: userId ?? null,
      },
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to create session" });
  }
}

async function submitAnswer(req, res) {
  const sessionId = req.params.sessionId;
  const { questionId, answerId } = req.body || {};

  try {
    const sessionAnswer = await prisma.sessionAnswer.create({
      data: {
        session_id: sessionId,
        question_id: questionId,
        answer_selected_id: answerId ?? null,
      },
      include: {
        answer: true,
        question: true,
      },
    });

    res.status(201).json(sessionAnswer);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit answer" });
  }
}

async function getSessionSummary(req, res) {
  const sessionId = req.params.sessionId;

  try {
    const answers = await prisma.sessionAnswer.findMany({
      where: { session_id: sessionId },
      include: {
        answer: true,
        question: true,
      },
    });

    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((a) => a.answer?.is_right).length;

    res.json({
      sessionId,
      totalQuestions,
      correctAnswers,
      answers,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch session summary" });
  }
}

module.exports = { startSession, submitAnswer, getSessionSummary };
