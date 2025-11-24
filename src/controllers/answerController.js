const {prisma} = require("../prisma");

async function listAnswersByQuestion(req, res) {
    const questionId = req.params.questionId;
    try {
        const answers = await prisma.answer.findMany({
            where: {question_id: questionId},
        });
        res.json(answers);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch answers" });
    }
}

async function addAnswer(req, res) {
    const { questionId, text, isRight } = req.body || {};
    if (!questionId || !text || isRight === undefined) {
        return res.status(400).json({ message: "questionId, text, and isRight are required" });
    }
    try {
        const newAnswer = await prisma.answer.create({
            data: { question_id: questionId, text, is_right: isRight },
        });
        res.status(201).json(newAnswer);
    } catch (err) {
        console.error("Error adding answer:", err);
        res.status(500).json({ message: "Failed to add answer", error: err.message });
    }
}

module.exports = { listAnswersByQuestion, addAnswer };