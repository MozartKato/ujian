import { Router } from "express";
import {
  startSession,
  submitAnswer,
  getSessionSummary,
} from "../controllers/sessionController.js";

export const sessionRouter = Router();

sessionRouter.post("/", startSession);
sessionRouter.post("/:sessionId/answers", submitAnswer);
sessionRouter.get("/:sessionId", getSessionSummary);
