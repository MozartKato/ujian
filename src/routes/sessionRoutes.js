const { Router } = require("express");
const {
  startSession,
  submitAnswer,
  getSessionSummary,
  checkSessionStatus,
  finishSession,
} = require("../controllers/sessionController");

const sessionRouter = Router();

// Start session
sessionRouter.post("/", startSession);

// Protected routes (harus cek timeout dulu)
sessionRouter.post("/:sessionId/answers", checkSessionStatus, submitAnswer);
sessionRouter.post("/:sessionId/finish", checkSessionStatus, finishSession);

// Summary (bisa diakses setelah selesai)
sessionRouter.get("/:sessionId", getSessionSummary);

module.exports = { sessionRouter };
