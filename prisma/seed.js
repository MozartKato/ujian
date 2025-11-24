const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.sessionAnswer.deleteMany();
  await prisma.session.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.subject.deleteMany();

  // 1. Create Subjects
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: "Matematika" } }),
    prisma.subject.create({ data: { name: "Bahasa Inggris" } }),
    prisma.subject.create({ data: { name: "IPA" } }),
  ]);

  console.log("✅ Created subjects:", subjects.length);

  // 2. Create Questions + Answers untuk Matematika
  const mathQuestions = [
    // EASY - 8 soal
    {
      text: "Berapa hasil dari $15 + 27$?",
      level: "easy",
      answers: [
        { text: "$42$", is_right: true },
        { text: "$40$", is_right: false },
        { text: "$45$", is_right: false },
        { text: "$38$", is_right: false },
        { text: "$41$", is_right: false },
        { text: "$43$", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari $12 \\times 8$?",
      level: "easy",
      answers: [
        { text: "$96$", is_right: true },
        { text: "$86$", is_right: false },
        { text: "$106$", is_right: false },
        { text: "$92$", is_right: false },
        { text: "$88$", is_right: false },
        { text: "$98$", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari $100 - 37$?",
      level: "easy",
      answers: [
        { text: "$63$", is_right: true },
        { text: "$73$", is_right: false },
        { text: "$53$", is_right: false },
        { text: "$67$", is_right: false },
        { text: "$62$", is_right: false },
        { text: "$64$", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari $56 \\div 8$?",
      level: "easy",
      answers: [
        { text: "$7$", is_right: true },
        { text: "$6$", is_right: false },
        { text: "$8$", is_right: false },
        { text: "$9$", is_right: false },
        { text: "$5$", is_right: false },
        { text: "$10$", is_right: false },
      ],
    },
    {
      text: "Berapa $25\\%$ dari $200$?",
      level: "easy",
      answers: [
        { text: "$50$", is_right: true },
        { text: "$40$", is_right: false },
        { text: "$60$", is_right: false },
        { text: "$75$", is_right: false },
        { text: "$45$", is_right: false },
        { text: "$55$", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari $5^2$?",
      level: "easy",
      answers: [
        { text: "$25$", is_right: true },
        { text: "$10$", is_right: false },
        { text: "$20$", is_right: false },
        { text: "$15$", is_right: false },
        { text: "$30$", is_right: false },
        { text: "$5$", is_right: false },
      ],
    },
    {
      text: "Berapa keliling persegi dengan sisi $5$ cm?",
      level: "easy",
      answers: [
        { text: "$20$ cm", is_right: true },
        { text: "$25$ cm", is_right: false },
        { text: "$15$ cm", is_right: false },
        { text: "$30$ cm", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari $9 + 6 \\times 2$?",
      level: "easy",
      answers: [
        { text: "$21$", is_right: true },
        { text: "$30$", is_right: false },
        { text: "$24$", is_right: false },
        { text: "$18$", is_right: false },
      ],
    },
    // MEDIUM - 8 soal
    {
      text: "Jika $x + 5 = 12$, berapa nilai $x$?",
      level: "medium",
      answers: [
        { text: "$x = 7$", is_right: true },
        { text: "$x = 5$", is_right: false },
        { text: "$x = 8$", is_right: false },
        { text: "$x = 6$", is_right: false },
      ],
    },
    {
      text: "Berapa luas lingkaran dengan jari-jari $7$ cm? ($\\pi = \\frac{22}{7}$)",
      level: "medium",
      answers: [
        { text: "$154$ cm²", is_right: true },
        { text: "$144$ cm²", is_right: false },
        { text: "$164$ cm²", is_right: false },
        { text: "$174$ cm²", is_right: false },
      ],
    },
    {
      text: "Jika $3x - 4 = 11$, berapa nilai $x$?",
      level: "medium",
      answers: [
        { text: "$x = 5$", is_right: true },
        { text: "$x = 4$", is_right: false },
        { text: "$x = 6$", is_right: false },
        { text: "$x = 7$", is_right: false },
      ],
    },
    {
      text: "Berapa volume kubus dengan sisi $4$ cm?",
      level: "medium",
      answers: [
        { text: "$64$ cm³", is_right: true },
        { text: "$48$ cm³", is_right: false },
        { text: "$16$ cm³", is_right: false },
        { text: "$32$ cm³", is_right: false },
      ],
    },
    {
      text: "Rata-rata dari $10, 15, 20,$ dan $25$ adalah?",
      level: "medium",
      answers: [
        { text: "$17.5$", is_right: true },
        { text: "$15$", is_right: false },
        { text: "$20$", is_right: false },
        { text: "$18$", is_right: false },
      ],
    },
    {
      text: "Jika harga barang naik $20\\%$ menjadi Rp $240.000$, berapa harga awal?",
      level: "medium",
      answers: [
        { text: "Rp $200.000$", is_right: true },
        { text: "Rp $220.000$", is_right: false },
        { text: "Rp $192.000$", is_right: false },
        { text: "Rp $180.000$", is_right: false },
      ],
    },
    {
      text: "Berapa luas segitiga dengan alas $10$ cm dan tinggi $8$ cm?",
      level: "medium",
      answers: [
        { text: "$40$ cm²", is_right: true },
        { text: "$80$ cm²", is_right: false },
        { text: "$20$ cm²", is_right: false },
        { text: "$50$ cm²", is_right: false },
      ],
    },
    {
      text: "Jika $2x + 3y = 13$ dan $x = 2$, berapa nilai $y$?",
      level: "medium",
      answers: [
        { text: "$y = 3$", is_right: true },
        { text: "$y = 2$", is_right: false },
        { text: "$y = 4$", is_right: false },
        { text: "$y = 5$", is_right: false },
      ],
    },
    // HARD - 6 soal
    {
      text: "Jika $2^x = 64$, berapa nilai $x$?",
      level: "hard",
      answers: [
        { text: "$x = 6$", is_right: true },
        { text: "$x = 5$", is_right: false },
        { text: "$x = 7$", is_right: false },
        { text: "$x = 8$", is_right: false },
      ],
    },
    {
      text: "Berapa jumlah deret aritmatika: $2 + 5 + 8 + \\ldots + 50$?",
      level: "hard",
      answers: [
        { text: "$442$", is_right: true },
        { text: "$420$", is_right: false },
        { text: "$450$", is_right: false },
        { text: "$432$", is_right: false },
      ],
    },
    {
      text: "Jika $\\log_2(x) = 5$, berapa nilai $x$?",
      level: "hard",
      answers: [
        { text: "$x = 32$", is_right: true },
        { text: "$x = 10$", is_right: false },
        { text: "$x = 25$", is_right: false },
        { text: "$x = 16$", is_right: false },
      ],
    },
    {
      text: "Berapa nilai $\\sin 30^\\circ + \\cos 60^\\circ$?",
      level: "hard",
      answers: [
        { text: "$1$", is_right: true },
        { text: "$0.5$", is_right: false },
        { text: "$1.5$", is_right: false },
        { text: "$0$", is_right: false },
      ],
    },
    {
      text: "Jika $x^2 - 5x + 6 = 0$, berapa nilai $x$?",
      level: "hard",
      answers: [
        { text: "$x = 2$ atau $x = 3$", is_right: true },
        { text: "$x = 1$ atau $x = 6$", is_right: false },
        { text: "$x = -2$ atau $x = -3$", is_right: false },
        { text: "$x = 4$ atau $x = 5$", is_right: false },
      ],
    },
    {
      text: "Berapa turunan dari $f(x) = 3x^2 + 2x - 5$?",
      level: "hard",
      answers: [
        { text: "$f'(x) = 6x + 2$", is_right: true },
        { text: "$f'(x) = 3x + 2$", is_right: false },
        { text: "$f'(x) = 6x - 5$", is_right: false },
        { text: "$f'(x) = 3x^2 + 2$", is_right: false },
      ],
    },
    // EXPERT - 5 soal
    {
      text: "Berapa integral dari $\\int (2x + 3)dx$?",
      level: "expert",
      answers: [
        { text: "$x^2 + 3x + C$", is_right: true },
        { text: "$2x^2 + 3x + C$", is_right: false },
        { text: "$x^2 + 3 + C$", is_right: false },
        { text: "$2x + 3x + C$", is_right: false },
      ],
    },
    {
      text: "Jika matriks $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix}$ dan $B = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$, berapa $A \\times B$?",
      level: "expert",
      answers: [
        { text: "$\\begin{bmatrix} 2 & 5 \\\\ 3 & 10 \\end{bmatrix}$", is_right: true },
        { text: "$\\begin{bmatrix} 2 & 3 \\\\ 3 & 4 \\end{bmatrix}$", is_right: false },
        { text: "$\\begin{bmatrix} 3 & 5 \\\\ 3 & 10 \\end{bmatrix}$", is_right: false },
        { text: "$\\begin{bmatrix} 2 & 5 \\\\ 3 & 8 \\end{bmatrix}$", is_right: false },
      ],
    },
    {
      text: "Berapa $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$?",
      level: "expert",
      answers: [
        { text: "$4$", is_right: true },
        { text: "$2$", is_right: false },
        { text: "$0$", is_right: false },
        { text: "undefined", is_right: false },
      ],
    },
    {
      text: "Berapa hasil dari kombinasi $C(10,3) = \\binom{10}{3}$?",
      level: "expert",
      answers: [
        { text: "$120$", is_right: true },
        { text: "$30$", is_right: false },
        { text: "$720$", is_right: false },
        { text: "$60$", is_right: false },
      ],
    },
    {
      text: "Jika $\\tan(x) = 1$ dan $0^\\circ \\leq x \\leq 180^\\circ$, berapa nilai $x$?",
      level: "expert",
      answers: [
        { text: "$45^\\circ$ atau $225^\\circ$", is_right: true },
        { text: "$30^\\circ$ atau $150^\\circ$", is_right: false },
        { text: "$60^\\circ$ atau $120^\\circ$", is_right: false },
        { text: "$90^\\circ$ atau $270^\\circ$", is_right: false },
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
    // EASY - 7 soal
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
      text: "What is the opposite of 'hot'?",
      level: "easy",
      answers: [
        { text: "cold", is_right: true },
        { text: "warm", is_right: false },
        { text: "cool", is_right: false },
        { text: "wet", is_right: false },
      ],
    },
    {
      text: "I ___ a student.",
      level: "easy",
      answers: [
        { text: "am", is_right: true },
        { text: "is", is_right: false },
        { text: "are", is_right: false },
        { text: "be", is_right: false },
      ],
    },
    {
      text: "They ___ playing football now.",
      level: "easy",
      answers: [
        { text: "are", is_right: true },
        { text: "is", is_right: false },
        { text: "am", is_right: false },
        { text: "was", is_right: false },
      ],
    },
    {
      text: "What is the plural of 'child'?",
      level: "easy",
      answers: [
        { text: "children", is_right: true },
        { text: "childs", is_right: false },
        { text: "childes", is_right: false },
        { text: "child", is_right: false },
      ],
    },
    {
      text: "She has ___ apples.",
      level: "easy",
      answers: [
        { text: "three", is_right: true },
        { text: "much", is_right: false },
        { text: "any", is_right: false },
        { text: "a little", is_right: false },
      ],
    },
    // MEDIUM - 7 soal
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
    {
      text: "If I ___ you, I would study harder.",
      level: "medium",
      answers: [
        { text: "were", is_right: true },
        { text: "am", is_right: false },
        { text: "was", is_right: false },
        { text: "be", is_right: false },
      ],
    },
    {
      text: "The book ___ by J.K. Rowling is very popular.",
      level: "medium",
      answers: [
        { text: "written", is_right: true },
        { text: "writing", is_right: false },
        { text: "wrote", is_right: false },
        { text: "write", is_right: false },
      ],
    },
    {
      text: "She asked me ___ I had finished my homework.",
      level: "medium",
      answers: [
        { text: "if", is_right: true },
        { text: "that", is_right: false },
        { text: "what", is_right: false },
        { text: "when", is_right: false },
      ],
    },
    {
      text: "Neither John ___ Mary likes coffee.",
      level: "medium",
      answers: [
        { text: "nor", is_right: true },
        { text: "or", is_right: false },
        { text: "and", is_right: false },
        { text: "but", is_right: false },
      ],
    },
    {
      text: "By the time you arrive, I ___ my work.",
      level: "medium",
      answers: [
        { text: "will have finished", is_right: true },
        { text: "finish", is_right: false },
        { text: "finished", is_right: false },
        { text: "finishing", is_right: false },
      ],
    },
    {
      text: "He is good ___ playing guitar.",
      level: "medium",
      answers: [
        { text: "at", is_right: true },
        { text: "in", is_right: false },
        { text: "on", is_right: false },
        { text: "for", is_right: false },
      ],
    },
    // HARD - 5 soal
    {
      text: "The proposal ___ to the committee yesterday.",
      level: "hard",
      answers: [
        { text: "was submitted", is_right: true },
        { text: "submitted", is_right: false },
        { text: "has submitted", is_right: false },
        { text: "submitting", is_right: false },
      ],
    },
    {
      text: "___ he studies hard, he will pass the exam.",
      level: "hard",
      answers: [
        { text: "Provided that", is_right: true },
        { text: "Despite", is_right: false },
        { text: "Although", is_right: false },
        { text: "In spite of", is_right: false },
      ],
    },
    {
      text: "Which sentence is grammatically correct?",
      level: "hard",
      answers: [
        { text: "Had I known, I would have helped.", is_right: true },
        { text: "If I had known, I will help.", is_right: false },
        { text: "I had known, I would help.", is_right: false },
        { text: "If I know, I would have helped.", is_right: false },
      ],
    },
    {
      text: "Hardly ___ the door when the phone rang.",
      level: "hard",
      answers: [
        { text: "had I closed", is_right: true },
        { text: "I had closed", is_right: false },
        { text: "did I close", is_right: false },
        { text: "I closed", is_right: false },
      ],
    },
    {
      text: "The data ___ not accurate.",
      level: "hard",
      answers: [
        { text: "are", is_right: true },
        { text: "is", is_right: false },
        { text: "was", is_right: false },
        { text: "been", is_right: false },
      ],
    },
    // EXPERT - 4 soal
    {
      text: "Choose the sentence with correct subjunctive mood:",
      level: "expert",
      answers: [
        { text: "I suggest that he be present at the meeting.", is_right: true },
        { text: "I suggest that he is present at the meeting.", is_right: false },
        { text: "I suggest that he was present at the meeting.", is_right: false },
        { text: "I suggest that he will be present at the meeting.", is_right: false },
      ],
    },
    {
      text: "Which uses the correct inversion?",
      level: "expert",
      answers: [
        { text: "Not only did she sing, but she also danced.", is_right: true },
        { text: "Not only she sang, but also danced.", is_right: false },
        { text: "Not only she did sing, but also dance.", is_right: false },
        { text: "Not only sang she, but danced also.", is_right: false },
      ],
    },
    {
      text: "The phenomenon ___ by scientists for decades.",
      level: "expert",
      answers: [
        { text: "has been being studied", is_right: true },
        { text: "has studied", is_right: false },
        { text: "is studying", is_right: false },
        { text: "was studied", is_right: false },
      ],
    },
    {
      text: "Which sentence demonstrates proper use of emphatic structure?",
      level: "expert",
      answers: [
        { text: "It was John who broke the window.", is_right: true },
        { text: "John it was who broke the window.", is_right: false },
        { text: "It is John broke the window.", is_right: false },
        { text: "John who broke the window it was.", is_right: false },
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
    // EASY - 8 soal
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
      text: "Berapa jumlah planet dalam tata surya kita?",
      level: "easy",
      answers: [
        { text: "8", is_right: true },
        { text: "9", is_right: false },
        { text: "7", is_right: false },
        { text: "10", is_right: false },
      ],
    },
    {
      text: "Apa gas yang kita hirup untuk bernapas?",
      level: "easy",
      answers: [
        { text: "Oksigen", is_right: true },
        { text: "Nitrogen", is_right: false },
        { text: "Karbon dioksida", is_right: false },
        { text: "Hidrogen", is_right: false },
      ],
    },
    {
      text: "Hewan yang berkembang biak dengan bertelur disebut?",
      level: "easy",
      answers: [
        { text: "Ovipar", is_right: true },
        { text: "Vivipar", is_right: false },
        { text: "Ovovivipar", is_right: false },
        { text: "Metamorfosis", is_right: false },
      ],
    },
    {
      text: "Organ yang berfungsi memompa darah adalah?",
      level: "easy",
      answers: [
        { text: "Jantung", is_right: true },
        { text: "Paru-paru", is_right: false },
        { text: "Hati", is_right: false },
        { text: "Ginjal", is_right: false },
      ],
    },
    {
      text: "Air mendidih pada suhu berapa derajat Celcius?",
      level: "easy",
      answers: [
        { text: "100°C", is_right: true },
        { text: "0°C", is_right: false },
        { text: "50°C", is_right: false },
        { text: "37°C", is_right: false },
      ],
    },
    {
      text: "Bunga yang memiliki warna menarik berfungsi untuk?",
      level: "easy",
      answers: [
        { text: "Menarik serangga penyerbuk", is_right: true },
        { text: "Fotosintesis", is_right: false },
        { text: "Menyerap air", is_right: false },
        { text: "Bernapas", is_right: false },
      ],
    },
    // MEDIUM - 7 soal
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
    {
      text: "Sel darah merah (eritrosit) berfungsi untuk?",
      level: "medium",
      answers: [
        { text: "Mengangkut oksigen", is_right: true },
        { text: "Melawan infeksi", is_right: false },
        { text: "Pembekuan darah", is_right: false },
        { text: "Menghasilkan antibodi", is_right: false },
      ],
    },
    {
      text: "Hukum Newton ke-1 menyatakan bahwa?",
      level: "medium",
      answers: [
        { text: "Benda akan tetap diam atau bergerak lurus beraturan jika tidak ada gaya", is_right: true },
        { text: "F = m × a", is_right: false },
        { text: "Aksi = Reaksi", is_right: false },
        { text: "Energi tidak dapat diciptakan atau dimusnahkan", is_right: false },
      ],
    },
    {
      text: "Apa yang dimaksud dengan ekosistem?",
      level: "medium",
      answers: [
        { text: "Interaksi antara makhluk hidup dan lingkungannya", is_right: true },
        { text: "Kumpulan populasi", is_right: false },
        { text: "Tempat hidup organisme", is_right: false },
        { text: "Rantai makanan", is_right: false },
      ],
    },
    {
      text: "Proses perubahan wujud dari padat ke gas disebut?",
      level: "medium",
      answers: [
        { text: "Sublimasi", is_right: true },
        { text: "Deposisi", is_right: false },
        { text: "Evaporasi", is_right: false },
        { text: "Kondensasi", is_right: false },
      ],
    },
    {
      text: "Apa yang dimaksud dengan klorofil?",
      level: "medium",
      answers: [
        { text: "Pigmen hijau pada tumbuhan untuk fotosintesis", is_right: true },
        { text: "Zat makanan", is_right: false },
        { text: "Hormon tumbuhan", is_right: false },
        { text: "Sel tumbuhan", is_right: false },
      ],
    },
    {
      text: "Lapisan atmosfer yang paling dekat dengan bumi adalah?",
      level: "medium",
      answers: [
        { text: "Troposfer", is_right: true },
        { text: "Stratosfer", is_right: false },
        { text: "Mesosfer", is_right: false },
        { text: "Termosfer", is_right: false },
      ],
    },
    // HARD - 6 soal
    {
      text: "Apa rumus kimia asam sulfat?",
      level: "hard",
      answers: [
        { text: "H2SO4", is_right: true },
        { text: "HCl", is_right: false },
        { text: "H2O2", is_right: false },
        { text: "HNO3", is_right: false },
      ],
    },
    {
      text: "Organel sel yang berfungsi sebagai 'pusat energi' adalah?",
      level: "hard",
      answers: [
        { text: "Mitokondria", is_right: true },
        { text: "Ribosom", is_right: false },
        { text: "Nukleus", is_right: false },
        { text: "Lisosom", is_right: false },
      ],
    },
    {
      text: "Hukum Ohm menyatakan bahwa V = I × R. Apa satuan R?",
      level: "hard",
      answers: [
        { text: "Ohm (Ω)", is_right: true },
        { text: "Volt (V)", is_right: false },
        { text: "Ampere (A)", is_right: false },
        { text: "Watt (W)", is_right: false },
      ],
    },
    {
      text: "Proses pembelahan sel untuk menghasilkan sel kelamin disebut?",
      level: "hard",
      answers: [
        { text: "Meiosis", is_right: true },
        { text: "Mitosis", is_right: false },
        { text: "Amitosis", is_right: false },
        { text: "Fertilisasi", is_right: false },
      ],
    },
    {
      text: "Apa yang dimaksud dengan pH?",
      level: "hard",
      answers: [
        { text: "Ukuran keasaman atau kebasaan larutan", is_right: true },
        { text: "Jumlah ion dalam larutan", is_right: false },
        { text: "Konsentrasi larutan", is_right: false },
        { text: "Suhu larutan", is_right: false },
      ],
    },
    {
      text: "Teori evolusi dikemukakan oleh?",
      level: "hard",
      answers: [
        { text: "Charles Darwin", is_right: true },
        { text: "Gregor Mendel", is_right: false },
        { text: "Louis Pasteur", is_right: false },
        { text: "Isaac Newton", is_right: false },
      ],
    },
    // EXPERT - 5 soal
    {
      text: "Apa yang dimaksud dengan efek Doppler?",
      level: "expert",
      answers: [
        { text: "Perubahan frekuensi gelombang akibat gerak relatif sumber dan pengamat", is_right: true },
        { text: "Pembelokan cahaya", is_right: false },
        { text: "Pemantulan gelombang", is_right: false },
        { text: "Resonansi gelombang", is_right: false },
      ],
    },
    {
      text: "Konstanta Avogadro (NA) adalah?",
      level: "expert",
      answers: [
        { text: "6.022 × 10²³ mol⁻¹", is_right: true },
        { text: "3.14 × 10⁸ m/s", is_right: false },
        { text: "9.8 m/s²", is_right: false },
        { text: "1.6 × 10⁻¹⁹ C", is_right: false },
      ],
    },
    {
      text: "DNA terdiri dari basa nitrogen, kecuali?",
      level: "expert",
      answers: [
        { text: "Urasil", is_right: true },
        { text: "Adenin", is_right: false },
        { text: "Guanin", is_right: false },
        { text: "Timin", is_right: false },
      ],
    },
    {
      text: "Apa yang dimaksud dengan entropi dalam termodinamika?",
      level: "expert",
      answers: [
        { text: "Ukuran ketidakteraturan sistem", is_right: true },
        { text: "Energi dalam sistem", is_right: false },
        { text: "Suhu sistem", is_right: false },
        { text: "Tekanan sistem", is_right: false },
      ],
    },
    {
      text: "Prinsip ketidakpastian Heisenberg berkaitan dengan?",
      level: "expert",
      answers: [
        { text: "Keterbatasan mengukur posisi dan momentum secara bersamaan", is_right: true },
        { text: "Kecepatan cahaya", is_right: false },
        { text: "Massa atom", is_right: false },
        { text: "Gaya gravitasi", is_right: false },
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
