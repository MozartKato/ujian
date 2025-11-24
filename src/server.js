import express from "express";
import { subjectRouter } from "./routes/subjectRoutes.js";
import { questionRouter } from "./routes/questionRoutes.js";
import { sessionRouter } from "./routes/sessionRoutes.js";

const app = express();

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
