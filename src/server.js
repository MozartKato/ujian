const express = require("express");
const { subjectRouter } = require("./routes/subjectRoutes");
const { questionRouter } = require("./routes/questionRoutes");
const { sessionRouter } = require("./routes/sessionRoutes");

const app = express();

app.set('strict routing', false);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/subjects", subjectRouter);
app.use("/api/questions", questionRouter);
app.use("/api/sessions", sessionRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
