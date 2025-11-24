# Client - Frontend CBT System

Frontend untuk sistem ujian berbasis komputer menggunakan Alpine.js.

## Struktur Folder

```
client/
├── src/           # Source files frontend
│   ├── index.html # Halaman utama exam
│   ├── app.js     # Logic Alpine.js
│   └── style.css  # Styling CSS
└── public/        # Build output (untuk production nanti)
```

## Teknologi

- **Alpine.js 3.x** - Reactive framework
- **Vanilla CSS** - Styling dengan gradients dan animations

## Setup Tailwind CSS (Opsional)

Jika ingin menggunakan Tailwind CSS:

1. Install dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. Buat file `tailwind.config.js`:
```js
module.exports = {
  content: ["./client/src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Buat file `client/src/input.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Update `package.json` tambahkan script:
```json
"scripts": {
  "build:css": "tailwindcss -i ./client/src/input.css -o ./client/src/style.css --watch"
}
```

5. Jalankan:
```bash
npm run build:css
```

## Development

Server otomatis serve dari `client/src/` saat running:
```bash
npm run dev
```

Akses di: http://localhost:3000
