# 🏫 SMA Negeri 1 Jakarta - Website Sekolah

Website resmi SMA Negeri 1 Jakarta dengan sistem manajemen admin yang lengkap.

## ✨ Fitur Utama

### 🌐 Website Publik
- **Beranda**: Informasi sekolah dan berita terkini
- **Tentang**: Profil sekolah, visi misi, dan fasilitas
- **Berita**: Artikel dan pengumuman sekolah
- **Galeri**: Foto kegiatan dan prestasi siswa
- **Kontak**: Informasi kontak dan lokasi sekolah

### 🔐 Panel Admin
- **Dashboard**: Overview statistik dan aktivitas
- **Kelola Berita**: CRUD berita dan artikel
- **Kelola Galeri**: Upload dan manajemen foto
- **Kelola User**: Manajemen pengguna sistem
- **Kelola Kontak**: Manajemen pesan kontak
- **Pengaturan**: Konfigurasi website

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Animasi**: Framer Motion
- **Form**: React Hook Form + Yup
- **Icons**: Heroicons (SVG)

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Instalasi
```bash
# Clone repository
git clone https://github.com/username/sma-negeri-1-jakarta.git
cd sma-negeri-1-jakarta

# Install dependencies
cd frontend
npm install

# Jalankan development server
npm run dev
```

### Build untuk Production
```bash
npm run build
```

## 🔑 Login Admin

**Email**: `admin@sman1jakarta.sch.id`  
**Password**: `admin123`

## 📁 Struktur Project

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   └── ui/           # UI components
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   └── auth/         # Authentication pages
│   ├── hooks/            # Custom React hooks
│   └── App.jsx           # Main app component
├── netlify.toml          # Netlify configuration
└── package.json          # Dependencies
```

## 🌐 Deployment

### Netlify (Recommended)
1. Push code ke GitHub
2. Connect repository di Netlify
3. Build settings otomatis terdeteksi dari `netlify.toml`
4. Deploy otomatis setiap push ke main branch

### Manual Build
```bash
npm run build
# Upload folder 'dist' ke hosting provider
```

## 🎨 Fitur UI/UX

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Automatic theme detection
- **Smooth Animations**: Framer Motion transitions
- **Loading States**: Interactive feedback
- **Form Validation**: Real-time validation
- **Modal System**: Reusable modal components

## 🔐 Keamanan

- **Authentication**: Session-based login
- **Route Protection**: Protected admin routes
- **Input Validation**: Client-side validation
- **XSS Protection**: Sanitized inputs

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Untuk pertanyaan atau dukungan, hubungi:
- **Email**: admin@sman1jakarta.sch.id
- **Website**: https://sman1jakarta.sch.id

---

**© 2024 SMA Negeri 1 Jakarta. All rights reserved.**
