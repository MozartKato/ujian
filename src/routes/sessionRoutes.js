const { Router } = require("express");
const {
  startSession,
  submitAnswer,
  getSessionSummary,
  checkSessionStatus,
  finishSession,
  getUserHistory,
} = require("../controllers/sessionController");
const { authMiddleware, optionalAuth } = require("../middleware/auth");

const sessionRouter = Router();

// Start session (optional auth - bisa anonymous)
sessionRouter.post("/", optionalAuth, startSession);

// Protected routes (harus cek timeout dulu)
sessionRouter.post("/:sessionId/answers", checkSessionStatus, submitAnswer);
sessionRouter.post("/:sessionId/finish", checkSessionStatus, finishSession);

// Summary (bisa diakses setelah selesai)
sessionRouter.get("/:sessionId", getSessionSummary);

// User history (protected - harus login)
sessionRouter.get("/user/history", authMiddleware, getUserHistory);

module.exports = { sessionRouter };
