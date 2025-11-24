# 📝 CBT System - Sistem Ujian Berbasis Komputer

Sistem ujian berbasis komputer (Computer-Based Test) yang dibangun dengan Express.js dan Alpine.js. Mendukung berbagai mata pelajaran dengan tingkat kesulitan yang berbeda, timer otomatis, dan auto-save jawaban.

## ✨ Fitur

- 🎯 **Multi Subject & Level** - Mendukung berbagai mata pelajaran dengan tingkat kesulitan (Easy, Medium, Hard, Expert)
- ⏱️ **Dynamic Timer** - Durasi ujian yang dapat dikonfigurasi dengan countdown timer
- 💾 **Auto-save** - Jawaban otomatis tersimpan setiap kali diganti
- 🔒 **Session Protection** - Proteksi timeout untuk mencegah submit setelah waktu habis
- 📊 **Real-time Results** - Tampilan hasil ujian dengan skor dan review jawaban
- 🎨 **Responsive Design** - UI yang mobile-friendly dengan gradient dan animasi
- 🔄 **Question Navigation** - Navigasi antar soal dengan indikator status jawaban

## 🛠️ Teknologi

### Backend
- **Node.js** v20.19.5 LTS
- **Express** v5.1.0
- **Prisma ORM** v5.22.0
- **MySQL/MariaDB**
- **Architecture**: MVC (Model-View-Controller)

### Frontend
- **Alpine.js** v3.x
- **Vanilla CSS** dengan gradient dan animations
- **Fetch API** untuk komunikasi dengan backend

## 📁 Struktur Folder

```
ujian/
├── client/
│   ├── src/              # Frontend source files
│   │   ├── index.html    # Halaman utama exam
│   │   ├── app.js        # Logic Alpine.js
│   │   └── style.css     # Styling
│   └── README.md         # Panduan frontend & Tailwind
├── src/
│   ├── server.js         # Entry point Express
│   ├── prisma.js         # Prisma client initialization
│   ├── controllers/      # Business logic
│   │   ├── subjectController.js
│   │   ├── questionController.js
│   │   ├── sessionController.js
│   │   └── answerController.js
│   └── routes/           # API endpoints
│       ├── subjectRoutes.js
│       ├── questionRoutes.js
│       ├── sessionRoutes.js
│       └── answerRouter.js
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.js           # Sample data seeder
│   └── migrations/       # Migration history
├── public/               # Static assets (images, media)
├── .env                  # Environment variables
└── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js v20.x atau lebih baru
- MySQL/MariaDB
- npm atau yarn

### Setup

1. **Clone repository**
```bash
git clone https://github.com/MozartKato/ujian.git
cd ujian
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup database**
```bash
# Buat database di MySQL
mysql -u root -p
CREATE DATABASE examdb;
```

4. **Configure environment**
```bash
# Buat file .env
cp .env.example .env

# Edit .env dan sesuaikan dengan konfigurasi database Anda
DATABASE_URL="mysql://laravel:@localhost:3306/examdb"
```

5. **Run migrations**
```bash
npx prisma migrate dev
```

6. **Seed database** (opsional - untuk sample data)
```bash
npm run seed
```

7. **Start server**
```bash
npm run dev
```

Server akan berjalan di http://localhost:3000

## 📝 API Endpoints

### Subjects
- `GET /api/subjects` - List semua mata pelajaran
- `POST /api/subjects` - Tambah mata pelajaran baru

### Questions
- `GET /api/questions/:subjectId` - List soal berdasarkan subject

### Sessions
- `POST /api/sessions` - Mulai sesi ujian baru
- `POST /api/sessions/:sessionId/answers` - Submit/update jawaban
- `POST /api/sessions/:sessionId/finish` - Selesaikan ujian

### Answers
- `GET /api/answers/:sessionId` - Get semua jawaban dalam sesi

## 🎮 Cara Penggunaan

1. **Pilih Mata Pelajaran** - Pilih subject dari dropdown
2. **Konfigurasi Ujian** - Atur jumlah soal dan durasi (menit)
3. **Mulai Ujian** - Klik "Mulai Ujian" untuk memulai
4. **Jawab Soal** - Pilih jawaban dan navigasi dengan tombol Previous/Next
5. **Submit Otomatis** - Jawaban tersimpan otomatis saat memilih
6. **Selesaikan** - Klik "Selesai" atau tunggu timer habis
7. **Lihat Hasil** - Review skor dan jawaban Anda

## 🗃️ Database Schema

### Models
- **User** - Data pengguna
- **Subject** - Mata pelajaran
- **Question** - Soal ujian (dengan level: EASY, MEDIUM, HARD, EXPERT)
- **Answer** - Pilihan jawaban untuk setiap soal
- **Session** - Sesi ujian (dengan status: ONGOING, SUBMITTED, TIMEOUT)
- **SessionAnswer** - Jawaban user dalam sesi

### Key Relations
- Subject → Questions (One-to-Many)
- Question → Answers (One-to-Many)
- Session → SessionAnswers (One-to-Many)
- SessionAnswer → Question, Answer (Many-to-One)

## 🔧 Development

### Run development server
```bash
npm run dev
```

### Run Prisma Studio (database GUI)
```bash
npm run studio
```

### Create new migration
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset database
```bash
npx prisma migrate reset
```

## 🎨 Customization

### Menambah Tailwind CSS

Lihat panduan lengkap di `client/README.md` untuk setup Tailwind CSS.

### Menambah Mata Pelajaran

Edit `prisma/seed.js` dan tambahkan subject beserta soal-soalnya, kemudian:
```bash
npm run seed
```

## 📄 License

MIT License - Copyright (c) 2025 MozartKato

**Wajib mencantumkan sumber asli** saat menggunakan atau memodifikasi project ini.

Lihat file [License](/License) untuk detail lengkap.

## 🤝 Contributing

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 🙏 Credits

Developed by [MozartKato](https://github.com/MozartKato)

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di [GitHub Issues](https://github.com/MozartKato/ujian/issues)

---

⭐ Jangan lupa kasih star jika project ini membantu Anda!