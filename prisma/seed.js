const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create Subjects
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: "Matematika" } }),
    prisma.subject.create({ data: { name: "Bahasa Inggris" } }),
    prisma.subject.create({ data: { name: "IPA" } }),
  ]);

  console.log("✅ Created subjects:", subjects.length);

  // 2. Create Questions + Answers untuk Matematika
  const mathQuestions = [
    {
      text: "Berapa hasil dari 15 + 27?",
      level: "easy",
      answers: [
        { text: "42", is_right: true },
        { text: "40", is_right: false },
        { text: "45", is_right: false },
        { text: "38", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari 12 × 8?",
      level: "easy",
      answers: [
        { text: "96", is_right: true },
        { text: "86", is_right: false },
        { text: "106", is_right: false },
        { text: "92", is_right: false },
      ],
    },
    {
      text: "Jika x + 5 = 12, berapa nilai x?",
      level: "medium",
      answers: [
        { text: "7", is_right: true },
        { text: "5", is_right: false },
        { text: "8", is_right: false },
        { text: "6", is_right: false },
      ],
    },
    {
      text: "Berapa luas lingkaran dengan jari-jari 7 cm? (π = 22/7)",
      level: "medium",
      answers: [
        { text: "154 cm²", is_right: true },
        { text: "144 cm²", is_right: false },
        { text: "164 cm²", is_right: false },
        { text: "174 cm²", is_right: false },
      ],
    },
    {
      text: "Jika 2^x = 64, berapa nilai x?",
      level: "hard",
      answers: [
        { text: "6", is_right: true },
        { text: "5", is_right: false },
        { text: "7", is_right: false },
        { text: "8", is_right: false },
      ],
    },
  ];

  for (const q of mathQuestions) {
    await prisma.question.create({
      data: {
        subject_id: subjects[0].id,
        text: q.text,
        level: q.level,
        answers: {
          create: q.answers,
        },
      },
    });
  }

  console.log("✅ Created Math questions:", mathQuestions.length);

  // 3. Create Questions untuk Bahasa Inggris
  const englishQuestions = [
    {
      text: "What is the past tense of 'go'?",
      level: "easy",
      answers: [
        { text: "went", is_right: true },
        { text: "goed", is_right: false },
        { text: "gone", is_right: false },
        { text: "going", is_right: false },
      ],
    },
    {
      text: "She ___ to school every day.",
      level: "easy",
      answers: [
        { text: "goes", is_right: true },
        { text: "go", is_right: false },
        { text: "going", is_right: false },
        { text: "gone", is_right: false },
      ],
    },
    {
      text: "Choose the correct sentence:",
      level: "medium",
      answers: [
        { text: "I have been waiting for an hour.", is_right: true },
        { text: "I have wait for an hour.", is_right: false },
        { text: "I waiting for an hour.", is_right: false },
        { text: "I has been waiting for an hour.", is_right: false },
      ],
    },
  ];

  for (const q of englishQuestions) {
    await prisma.question.create({
      data: {
        subject_id: subjects[1].id,
        text: q.text,
        level: q.level,
        answers: {
          create: q.answers,
        },
      },
    });
  }

  console.log("✅ Created English questions:", englishQuestions.length);

  // 4. Create Questions untuk IPA
  const scienceQuestions = [
    {
      text: "Apa simbol kimia untuk air?",
      level: "easy",
      answers: [
        { text: "H2O", is_right: true },
        { text: "O2", is_right: false },
        { text: "CO2", is_right: false },
        { text: "H2", is_right: false },
      ],
    },
    {
      text: "Planet terbesar di tata surya adalah?",
      level: "easy",
      answers: [
        { text: "Jupiter", is_right: true },
        { text: "Saturnus", is_right: false },
        { text: "Bumi", is_right: false },
        { text: "Mars", is_right: false },
      ],
    },
    {
      text: "Proses fotosintesis terjadi pada bagian tumbuhan?",
      level: "medium",
      answers: [
        { text: "Daun", is_right: true },
        { text: "Akar", is_right: false },
        { text: "Batang", is_right: false },
        { text: "Bunga", is_right: false },
      ],
    },
  ];

  for (const q of scienceQuestions) {
    await prisma.question.create({
      data: {
        subject_id: subjects[2].id,
        text: q.text,
        level: q.level,
        answers: {
          create: q.answers,
        },
      },
    });
  }

  console.log("✅ Created Science questions:", scienceQuestions.length);

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
