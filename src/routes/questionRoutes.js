const { Router } = require("express");
const { listQuestionsBySubject, addQuestion } = require("../controllers/questionController");

const questionRouter = Router();

questionRouter.get("/subject/:subjectId", listQuestionsBySubject);
questionRouter.post("/", addQuestion);

module.exports = { questionRouter };
