# BestiNut AI - Aplikasi Diet & Gaya Hidup Sehat Berbasis AI

## 🚀 Overview

BestiNut AI adalah aplikasi web modern yang menggunakan teknologi kecerdasan buatan untuk membantu pengguna mencapai gaya hidup sehat yang optimal. Aplikasi ini menggabungkan AI chatbot, analisis gambar makanan, rekomendasi diet personal, dan dashboard analitik yang interaktif.

## ✨ Fitur Utama

### 🤖 AI-Powered Features

#### 1. AI Nutritionist Chatbot
- **Chatbot Cerdas**: Konsultasi 24/7 dengan AI nutritionist
- **Respons Cepat**: Memberikan jawaban instan untuk pertanyaan seputar nutrisi
- **Pengetahuan Luas**: Mencakup diet, olahraga, dan gaya hidup sehat
- **Interface Floating**: Mudah diakses dari mana saja di halaman

#### 2. AI Diet Planner
- **Analisis Personal**: Menghitung BMR, TDEE, dan BMI secara otomatis
- **Rekomendasi Cerdas**: Menu diet yang disesuaikan dengan tujuan dan preferensi
- **Perhitungan Akurat**: Menggunakan formula Mifflin-St Jeor yang terstandar
- **Target Nutrisi**: Breakdown protein, karbohidrat, dan lemak yang optimal

#### 3. AI Meal Tracker
- **Foto Makanan**: Upload foto makanan untuk analisis otomatis
- **Drag & Drop**: Interface yang user-friendly untuk upload gambar
- **Identifikasi AI**: Mengenali jenis makanan dan menghitung nutrisi
- **Saran Nutrisi**: Rekomendasi untuk peningkatan pola makan

#### 4. Voice Commands
- **Perintah Suara**: Navigasi menggunakan perintah suara dalam bahasa Indonesia
- **Speech Recognition**: Teknologi pengenalan suara modern
- **Hands-free**: Kontrol aplikasi tanpa perlu menyentuh layar

### 📊 Analytics & Visualization

#### 1. Dashboard Interaktif
- **Progress Berat Badan**: Grafik tren penurunan/kenaikan berat badan
- **Nutrisi Harian**: Visualisasi asupan protein, karbohidrat, dan lemak
- **Target Kalori**: Progress circle yang menunjukkan pencapaian target
- **AI Insights**: Rekomendasi personal berdasarkan data pengguna

#### 2. Chart.js Integration
- **Line Charts**: Untuk tracking progress berat badan
- **Doughnut Charts**: Untuk breakdown nutrisi
- **Responsive**: Menyesuaikan dengan ukuran layar
- **Interactive**: Hover effects dan tooltips

### 🎨 Modern UI/UX

#### 1. Design System
- **Color Palette**: Hijau sebagai warna utama (sehat, alam)
- **Typography**: Font Inter untuk keterbacaan optimal
- **Spacing**: Sistem spacing yang konsisten
- **Shadows**: Depth dan hierarchy yang jelas

#### 2. Responsive Design
- **Mobile First**: Optimized untuk perangkat mobile
- **Grid System**: CSS Grid untuk layout yang fleksibel
- **Breakpoints**: Responsif di semua ukuran layar
- **Touch Friendly**: Interface yang mudah digunakan di touchscreen

#### 3. Animations
- **Loading Screen**: Animasi loading yang menarik
- **Scroll Animations**: Reveal effects saat scrolling
- **Hover Effects**: Interaksi yang smooth
- **Transitions**: Perpindahan state yang halus

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5**: Semantic markup yang bersih
- **CSS3**: Modern CSS dengan Grid, Flexbox, dan Custom Properties
- **JavaScript ES6+**: Class-based architecture dengan modern syntax
- **Chart.js**: Library untuk visualisasi data
- **Font Awesome**: Icon library yang komprehensif
- **Animate.css**: Library animasi CSS

### AI & Machine Learning
- **Speech Recognition API**: Web Speech API untuk voice commands
- **Image Analysis**: Simulasi AI untuk analisis makanan
- **Natural Language Processing**: Chatbot responses yang cerdas
- **Predictive Analytics**: Rekomendasi berdasarkan data pengguna

### Performance & UX
- **Lazy Loading**: Optimasi loading time
- **Smooth Scrolling**: Navigasi yang halus
- **Progressive Enhancement**: Fallback untuk fitur modern
- **Accessibility**: ARIA labels dan keyboard navigation

## 🚀 Cara Penggunaan

### 1. Setup Aplikasi
```bash
# Clone repository
git clone [repository-url]

# Buka file index.html di browser
# Atau gunakan local server
python -m http.server 8000
```

### 2. Fitur AI Diet Planner
1. **Buka section "AI Diet"**
2. **Isi form dengan data personal**:
   - Nama, usia, jenis kelamin
   - Berat dan tinggi badan
   - Level aktivitas fisik
   - Tujuan diet
   - Alergi dan preferensi makanan
3. **Klik "Generate AI Diet Plan"**
4. **Lihat hasil analisis AI**:
   - BMI dan status berat badan
   - Kebutuhan kalori harian
   - Target nutrisi (protein, karbohidrat, lemak)
   - Rekomendasi menu untuk setiap waktu makan
   - Saran personal dari AI

### 3. Fitur AI Meal Tracker
1. **Buka section "AI Meal Tracker"**
2. **Upload foto makanan**:
   - Klik area upload atau drag & drop
   - Pastikan makanan terlihat jelas
   - Hindari bayangan yang terlalu gelap
3. **Tunggu analisis AI** (simulasi 3 detik)
4. **Lihat hasil**:
   - Identifikasi jenis makanan
   - Breakdown nutrisi lengkap
   - Saran untuk peningkatan nutrisi
   - Opsi untuk menambah ke log harian

### 4. Fitur AI Chatbot
1. **Klik tombol chatbot** (ikon robot di pojok kanan bawah)
2. **Tanyakan seputar**:
   - Kalori dan nutrisi
   - Tips diet dan olahraga
   - Manajemen berat badan
   - Gaya hidup sehat
3. **Dapatkan jawaban instan** dari AI nutritionist

### 5. Fitur Voice Commands
1. **Klik tombol microphone** (kiri bawah)
2. **Ucapkan perintah** seperti:
   - "Beranda" → Scroll ke section home
   - "AI Diet" → Scroll ke section diet planner
   - "Analisis" → Scroll ke section analytics
   - "Chatbot" → Buka AI chatbot
3. **AI akan memproses** dan menjalankan perintah

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (max-width: 480px) {
    /* Small mobile devices */
}

@media (max-width: 768px) {
    /* Tablets and mobile */
}

@media (max-width: 1024px) {
    /* Small laptops */
}

@media (min-width: 1025px) {
    /* Desktop and larger */
}
```

## 🎯 Target Pengguna

- **Fitness Enthusiasts**: Yang ingin tracking nutrisi yang akurat
- **Health Conscious**: Yang peduli dengan pola makan sehat
- **Weight Management**: Yang ingin menurunkan/naikkan berat badan
- **Busy Professionals**: Yang butuh solusi diet yang praktis
- **AI Enthusiasts**: Yang tertarik dengan teknologi AI dalam kesehatan

## 🔮 Roadmap Pengembangan

### Phase 1 (Current) ✅
- [x] AI Diet Planner dengan perhitungan BMR/TDEE
- [x] AI Meal Tracker dengan analisis gambar
- [x] AI Chatbot untuk konsultasi nutrisi
- [x] Voice Commands untuk navigasi
- [x] Dashboard analytics dengan charts
- [x] Responsive design untuk semua device

### Phase 2 (Next) 🚧
- [ ] Integrasi dengan OpenAI API untuk responses yang lebih cerdas
- [ ] Real-time food recognition menggunakan Google Vision API
- [ ] User authentication dan profile management
- [ ] Progress tracking dan goal setting
- [ ] Social features dan community challenges

### Phase 3 (Future) 🔮
- [ ] Machine Learning untuk personalisasi yang lebih akurat
- [ ] Integration dengan wearable devices
- [ ] Advanced analytics dan predictive insights
- [ ] Multi-language support
- [ ] Mobile app development

## 🤝 Kontribusi

Kami menyambut kontribusi dari developer dan designer! Beberapa area yang bisa dikontribusikan:

- **UI/UX Improvements**: Design system dan komponen baru
- **AI Features**: Enhancement pada chatbot dan analisis
- **Performance**: Optimasi loading time dan responsiveness
- **Testing**: Unit tests dan integration tests
- **Documentation**: API docs dan user guides

## 📄 License

Proyek ini menggunakan MIT License. Lihat file `LICENSE` untuk detail lebih lanjut.

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:

- **Email**: support@bestinut.ai
- **Documentation**: docs (akan tersedia)
- **Community**: community (akan tersedia)

---

**Dibuat dengan ❤️ dan AI untuk kesehatan yang lebih baik**

*BestiNut AI - Where Technology Meets Wellness*
