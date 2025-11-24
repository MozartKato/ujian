const { prisma } = require("../prisma");

async function startSession(req, res) {
  const { userId, subjectId, duration = 60, totalQuestions = 10 } = req.body || {};

  try {
    const endDate = new Date(Date.now() + duration * 60000); // duration dalam menit
    
    const session = await prisma.session.create({
      data: {
        user_id: userId ?? null,
        subject_id: subjectId,
        duration,
        total_questions: totalQuestions,
        end_date: endDate,
      },
    });

    res.status(201).json(session);
  } catch (err) {
    console.error("Failed to create session:", err);
    res.status(500).json({ message: "Failed to create session", error: err.message });
  }
}

// Middleware untuk cek timeout
async function checkSessionStatus(req, res, next) {
  const sessionId = req.params.sessionId;

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "ONGOING") {
      return res.status(403).json({ message: "Session sudah selesai", status: session.status });
    }

    // Cek apakah sudah timeout
    if (new Date() > session.end_date) {
      await prisma.session.update({
        where: { id: sessionId },
        data: { status: "TIMEOUT" },
      });
      return res.status(403).json({ message: "Waktu ujian habis!", status: "TIMEOUT" });
    }

    req.session = session;
    next();
  } catch (err) {
    res.status(500).json({ message: "Failed to check session" });
  }
}

// Auto-save dengan upsert (insert or update)
async function submitAnswer(req, res) {
  const sessionId = req.params.sessionId;
  const { questionId, answerId } = req.body || {};

  if (!questionId) {
    return res.status(400).json({ message: "questionId is required" });
  }

  try {
    const sessionAnswer = await prisma.sessionAnswer.upsert({
      where: {
        session_id_question_id: {
          session_id: sessionId,
          question_id: questionId,
        },
      },
      create: {
        session_id: sessionId,
        question_id: questionId,
        answer_selected_id: answerId ?? null,
      },
      update: {
        answer_selected_id: answerId ?? null,
      },
    });

    res.json({ message: "Answer saved", data: sessionAnswer });
  } catch (err) {
    console.error("Failed to save answer:", err);
    res.status(500).json({ message: "Failed to submit answer", error: err.message });
  }
}

// Submit final - ubah status jadi SUBMITTED
async function finishSession(req, res) {
  const sessionId = req.params.sessionId;

  try {
    const session = await prisma.session.update({
      where: { id: sessionId },
      data: {
        status: "SUBMITTED",
        end_date: new Date(), // catat waktu submit
      },
    });

    res.json({ message: "Ujian berhasil disubmit", session });
  } catch (err) {
    res.status(500).json({ message: "Failed to finish session" });
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

module.exports = { 
  startSession, 
  submitAnswer, 
  getSessionSummary,
  checkSessionStatus,
  finishSession,
};
