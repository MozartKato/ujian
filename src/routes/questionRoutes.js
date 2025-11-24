const { Router } = require("express");
const { listQuestionsBySubject } = require("../controllers/questionController");

const questionRouter = Router();

questionRouter.get("/subject/:subjectId", listQuestionsBySubject);

module.exports = { questionRouter };
