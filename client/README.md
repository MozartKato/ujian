# CBT Client - Frontend

Modern, scalable frontend untuk Computer-Based Test System menggunakan Vite, Alpine.js, dan KaTeX.

## 📁 Struktur Proyek

```
client/
├── src/
│   ├── js/
│   │   ├── config/         # Konfigurasi dan constants
│   │   ├── services/       # API services
│   │   ├── stores/         # Alpine.js stores
│   │   ├── utils/          # Helper functions
│   │   └── main.js         # Entry point
│   ├── styles/
│   │   └── main.css        # Global styles
│   └── index.html          # HTML template
├── package.json
└── vite.config.js
```

## 🚀 Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Vite** - Build tool & dev server
- **Alpine.js** - Lightweight reactive framework
- **KaTeX** - Math rendering
- **Vanilla CSS** - Styling

## 📝 Fitur

- ✅ No CDN dependencies (semua lokal)
- ✅ Modular architecture
- ✅ Hot Module Replacement (HMR)
- ✅ Production build optimization
- ✅ API proxy untuk development
- ✅ Math rendering dengan KaTeX
- ✅ Reactive state management

## 🔧 Configuration

Edit `vite.config.js` untuk konfigurasi build dan dev server.

Edit `src/js/config/constants.js` untuk API endpoints dan exam config.

## 📦 Dependencies

- `alpinejs`: ^3.14.1
- `katex`: ^0.16.9
- `vite`: ^5.4.11 (dev)
