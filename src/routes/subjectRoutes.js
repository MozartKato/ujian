import { Router } from "express";
import { listSubjects } from "../controllers/subjectController.js";

export const subjectRouter = Router();

subjectRouter.get("/", listSubjects);
