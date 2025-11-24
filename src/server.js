const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { subjectRouter } = require("./routes/subjectRoutes");
const { questionRouter } = require("./routes/questionRoutes");
const { sessionRouter } = require("./routes/sessionRoutes");
const { answerRouter } = require("./routes/answerRouter");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.set('strict routing', false);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client/src")));
// Serve static assets (images, media, etc.)
app.use('/assets', express.static(path.join(__dirname, "../public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRouter);
app.use("/api/questions", questionRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/answers", answerRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on  http://localhost:${port}`);
});
