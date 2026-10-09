# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## JURNAL TANI - MOBILE APPLICATION

### 1. INFORMASI PROYEK
* Nama Aplikasi: Jurnal Tani
* Platform: Mobile (Android & iOS via Expo)
* Framework: React Native (Expo Router)
* Bahasa Pemrograman: TypeScript (.ts, .tsx)
* Target Implementasi: Modul 1 Praktikum Pemrograman Mobile

---

### 2. DESKRIPSI & LATAR BELAKANG
Jurnal Tani adalah aplikasi pencatatan operasional pertanian digital yang dirancang untuk membantu petani dan pengelola kebun memantau siklus harian lahan, komoditas tanaman, aktivitas perawatan (pemupukan, penyiraman, hama), serta kalkulasi biaya operasional pertanian harian hingga estimasi panen.

---

### 3. ASPEK PENILAIAN TEKNIS (MODUL 1)
1. TypeScript Typing:
   * Penggunaan custom type (union type untuk jenis kegiatan dan status lahan).
   * Penggunaan interface untuk pendefinisian entitas catatan kegiatan (FarmLog).
2. Struktur Data:
   * Menggunakan Array of Objects sebagai sumber data dummy pencatatan harian.
3. Fungsi & Logika Looping:
   * Custom function pemformat nominal mata uang (Rupiah).
   * Custom function kalkulasi akumulasi total modal/biaya harian menggunakan loop.
   * Looping data komponen menggunakan FlatList dan .map().
4. Standar Styling:
   * External Styling: Dikelola terpisah menggunakan StyleSheet.create().
   * Inline Styling: Digunakan pada badge indikator kategori secara dinamis.
5. Pustaka Visual:
   * Menggunakan @expo/vector-icons (Ionicons) untuk visual antarmuka ramah pengguna.

---

### 4. STRUKTUR FOLDER PROYEK
app/
 ├── _layout.tsx           -> Konfigurasi layout dasar Expo Router
 └── index.tsx             -> Halaman utama (Dashboard Jurnal Tani)
constants/
 ├── farmData.ts           -> Definisi Type, Interface, dan Dummy Data
 └── farmStyles.ts         -> Berkas External StyleSheet

---

### 5. SPESIFIKASI TAMPILAN (DASHBOARD SCREEN)
* Header: Informasi pengguna, tanggal operasional, dan widget mini kondisi lahan.
* Ringkasan Finansial: Kartu informasi total biaya operasional hasil akumulasi perulangan.
* Kolom Pencarian: Input teks untuk menyaring catatan aktivitas.
* Daftar Log Aktivitas (FlatList): Menampilkan kartu log berisi nama lahan, varietas tanaman, tag aktivitas, tanggal, catatan lapangan, dan biaya.
* Tombol Aksi: Tombol pintas untuk menambah catatan aktivitas baru.