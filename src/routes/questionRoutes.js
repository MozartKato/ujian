import { Router } from "express";
import { listQuestionsBySubject } from "../controllers/questionController.js";

export const questionRouter = Router();

questionRouter.get("/subject/:subjectId", listQuestionsBySubject);
