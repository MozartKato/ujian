const { Router } = require("express");
const { listAnswersByQuestion, addAnswer } = require("../controllers/answerController");

const answerRouter = Router();

answerRouter.get("/question/:questionId", listAnswersByQuestion);
answerRouter.post("/", addAnswer);
module.exports = { answerRouter };