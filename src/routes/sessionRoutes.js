const { Router } = require("express");
const {
  startSession,
  submitAnswer,
  getSessionSummary,
} = require("../controllers/sessionController");

const sessionRouter = Router();

sessionRouter.post("/", startSession);
sessionRouter.post("/:sessionId/answers", submitAnswer);
sessionRouter.get("/:sessionId", getSessionSummary);

module.exports = { sessionRouter };
