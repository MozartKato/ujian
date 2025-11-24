const { Router } = require("express");
const { listSubjects, addSubject } = require("../controllers/subjectController");

const subjectRouter = Router();

subjectRouter.get("/", listSubjects);
subjectRouter.post("/", addSubject);

module.exports = { subjectRouter };
subjectRouter.post("/", addSubject);