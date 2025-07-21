# 🚀 Panduan Deployment ke GitHub & Netlify

## 📋 Checklist Sebelum Deploy

- [x] Semua komponen admin sudah lengkap
- [x] Modal CRUD berfungsi dengan baik
- [x] Routing sudah benar
- [x] Build script tersedia
- [x] Netlify config sudah ada

## 🔧 Step 1: Persiapan Git Repository

### Inisialisasi Git (jika belum ada)
```bash
# Di root project (CRUD-SEKOLAH)
git init
git add .
git commit -m "Initial commit: SMA Negeri 1 Jakarta website"
```

### Buat Repository di GitHub
1. Buka https://github.com
2. Klik "New repository"
3. Nama: `sma-negeri-1-jakarta` atau sesuai keinginan
4. Description: `Website SMA Negeri 1 Jakarta dengan Admin Panel`
5. Public/Private: Pilih sesuai kebutuhan
6. Jangan centang "Initialize with README" (karena sudah ada)
7. Klik "Create repository"

### Connect ke GitHub
```bash
# Ganti URL dengan repository Anda
git remote add origin https://github.com/USERNAME/sma-negeri-1-jakarta.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy ke Netlify

### Opsi A: Deploy via GitHub (Recommended)
1. Buka https://netlify.com
2. Login/Register
3. Klik "New site from Git"
4. Pilih "GitHub" dan authorize
5. Pilih repository yang baru dibuat
6. **Build settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
7. Klik "Deploy site"

### Opsi B: Manual Deploy
```bash
# Build project
cd frontend
npm run build

# Upload folder 'dist' ke Netlify drag & drop
```

## ⚙️ Step 3: Konfigurasi Netlify

### Environment Variables (Optional)
Di Netlify dashboard > Site settings > Environment variables:
```
VITE_APP_NAME=SMA Negeri 1 Jakarta
VITE_API_URL=https://your-api-url.com
```

### Custom Domain (Optional)
1. Beli domain atau gunakan subdomain
2. Di Netlify: Site settings > Domain management
3. Add custom domain
4. Update DNS records sesuai instruksi

## 🔄 Step 4: Auto Deploy Setup

Setiap kali push ke GitHub main branch, Netlify akan otomatis:
1. Pull latest code
2. Run `npm install`
3. Run `npm run build`
4. Deploy ke production

## 🧪 Step 5: Testing

### Test Local Build
```bash
cd frontend
npm run build
npm run preview
```

### Test Production
1. Buka URL Netlify yang diberikan
2. Test semua halaman:
   - Home: `/`
   - About: `/about`
   - News: `/news`
   - Gallery: `/gallery`
   - Contact: `/contact`
   - Admin Login: `/admin/login`
   - Admin Dashboard: `/admin/dashboard`

### Test Admin Panel
1. Login dengan: `admin@sman1jakarta.sch.id` / `admin123`
2. Test semua CRUD operations:
   - Create/Edit/Delete News
   - Upload/Edit/Delete Gallery
   - Manage Users
   - View Contacts

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing Issues (404 on refresh)
- Pastikan `netlify.toml` ada di root
- Check redirect rules untuk SPA

### Import Errors
- Pastikan semua import path benar
- Check case sensitivity untuk file names

## 📊 Monitoring

### Netlify Analytics
- Page views
- Unique visitors
- Top pages
- Performance metrics

### Performance Tips
1. **Image Optimization**: Compress images sebelum upload
2. **Code Splitting**: Vite sudah handle otomatis
3. **Caching**: Headers sudah dikonfigurasi di `netlify.toml`

## 🔐 Security Checklist

- [x] Admin routes protected
- [x] Input validation implemented
- [x] XSS protection headers
- [x] HTTPS enforced (Netlify default)
- [x] Environment variables secured

## 📱 Mobile Testing

Test di berbagai device:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad/Android)
- Desktop (Chrome/Firefox/Safari/Edge)

## 🎉 Go Live!

Setelah semua test passed:
1. Update DNS (jika custom domain)
2. Announce ke stakeholders
3. Monitor traffic dan performance
4. Setup backup strategy

---

**🎯 Target URLs:**
- **Production**: `https://your-site.netlify.app`
- **Admin**: `https://your-site.netlify.app/admin/login`
- **GitHub**: `https://github.com/username/sma-negeri-1-jakarta`
