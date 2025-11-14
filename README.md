# Tugas Tracker Backend – Web Development PEKAN PRISTEK Fasilkom UI 2025

Backend ini merupakan bagian dari Final Project Open Class Web Development RISTEK Fasilkom UI 2025.  
Repository ini akan berfungsi sebagai server aplikasi **Tugas Tracker**, yang akan menyediakan RESTful API untuk front-end (`tugas-tracker-fe`).

Pada Checkpoint 1, repository backend **belum diwajibkan memiliki implementasi**, namun harus sudah tersedia sebagai bagian dari arsitektur Headless (Client–Server). Implementasi backend penuh akan dikerjakan pada **Checkpoint 3**.

---

## 🎯 Tujuan Backend

Backend ini akan berfungsi sebagai pusat penyimpanan dan manajemen data untuk:

1. **Mata Kuliah**
   - Create, Read, Update, Delete (CRUD)
   - Menyimpan data nama mata kuliah, nama dosen, total pertemuan, dan data pendukung lainnya

2. **Tugas**
   - CRUD tugas per mata kuliah
   - Menyimpan nama tugas, deadline, deskripsi (opsional), dan status tugas:
     - `belum dikerjakan`
     - `sedang dikerjakan`
     - `selesai`

Backend bertugas sebagai penyedia API yang akan diakses oleh aplikasi front-end menggunakan fetch/axios.

---

## 🏗 Arsitektur Aplikasi

Aplikasi ini menggunakan arsitektur **Headless Client–Server**, sesuai ketentuan tugas.

- **Front-End**  
  Repository: `tugas-tracker-fe`  
  Dibangun menggunakan React (Vite). Mengonsumsi API dari backend ini.

- **Back-End**  
  Repository: `tugas-tracker-be` (project ini)  
  Akan dibangun menggunakan teknologi bebas (rencana: Node.js + Express).  
  Menyediakan RESTful API untuk mengelola data mata kuliah dan tugas.

Backend dan frontend **dikembangkan dalam dua repository terpisah**, sesuai aturan tugas.

---

## 📁 Struktur Folder (Planned for Checkpoint 3)

Struktur folder berikut akan diterapkan saat backend mulai diimplementasikan:

```text
tugas-tracker-be/
├─ src/
│  ├─ controllers/
│  │  ├─ courseController.js
│  │  └─ taskController.js
│  ├─ models/
│  │  ├─ Course.js
│  │  └─ Task.js
│  ├─ routes/
│  │  ├─ courseRoutes.js
│  │  └─ taskRoutes.js
│  ├─ config/
│  │  └─ database.js
│  ├─ app.js
│  └─ server.js
├─ package.json
├─ .env (akan ditambahkan CP3)
└─ README.md
