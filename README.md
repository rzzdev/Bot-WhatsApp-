<div align="center">

# 🤖 WhatsApp Bot V2

[![Termux](https://img.shields.io/badge/Platform-Termux-black?style=flat&logo=termux)](https://termux.com/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Author](https://img.shields.io/badge/author-MADDEV0307-orange.svg)]()

*Bot WhatsApp yang powerful, modular, dan mudah dikustomisasi. Dapat dijalankan langsung di Android melalui Termux!*

[📱 Panduan Instalasi Termux](#-instalasi-di-termux-panduan-lengkap) •
[🚀 Cara Penggunaan](#-cara-penggunaan) •

</div>

---

## ✨ Fitur-Fitur Unggulan

Bot ini dikemas dengan berbagai fitur canggih yang siap digunakan, dirancang untuk memberikan pengalaman terbaik di WhatsApp.

### 🎮 **Hiburan & Game**
- **Family 100**: Tebak 100 jawaban yang populer.
- **Cak Lontong**: Teka-teki lucu yang menguji logika.
- **Tebak Logo & Kata**: Asah pengetahuan umum kamu.
- **Teka-Tki & Ular Tangga**: Game klasik yang seru.

### 🤖 **Kecerdasan Buatan (AI)**
- **ChatGPT**: Terhubung dengan model bahasa dari OpenAI.
- **Google Gemini**: Dapatkan jawaban dari AI terbaru Google.
*(Memerlukan API Key untuk penggunaan)*

### 👥 **Manajemen Grup**
- **Tambah Member**: `.add` untuk menambah anggota baru.
- **Kick Member**: `.kick` untuk mengeluarkan anggota.
*(Memerlukan bot sebagai admin)*

### 💬 **Interaksi Privasi**
- **Confession**: `.confes` untuk mengirim pesan anonim.
- **Balas Confession**: Sistem balas pesan yang aman.

### 👑 **Kontrol Penuh (Owner)**
- **Banned/Unbanned**: Kelola akses pengguna.
- **Setting Bot**: Lihat dan ubah pengaturan.
- **Pembersihan Database**: `.sampah` untuk membersihkan data usang.
- **Info Limit**: Pantau penggunaan bot.

### 🔍 **Utilitas & Lainnya**
- **Stalker Instagram**: Dapatkan info publik profil.
- **Pembuat Stiker**: `.brat` untuk buat stiker kustom.
- **Sistem Database**: Menyimpan data pengguna secara persisten.
- **Menu Terpisah**: `.menu` (umum) dan `.allmenu` (lengkap).

---

## 📱 Instalasi di Termux (Panduan Lengkap)

```bash
pkg update && pkg upgrade -y
```
Tunggu hingga proses selesai. Jika ada pertanyaan, tekan `Y` atau `Enter`.



```bash
pkg install git nodejs -y
```

```bash
git clone https://github.com/your-username/bot-whatsapp.git
```

```bash
cd whatsapp-bot
```

```bash
npm install
```

```bash
npm start
```

---

## 📖 Cara Penggunaan

Setelah bot berjalan, kamu bisa berinteraksi dengannya melalui WhatsApp.

### Menu Bot
- **`.menu`**: Menampilkan fitur-fitur utama yang cocok untuk pengguna umum.
- **`.allmenu`**: Menampilkan **SEMUA** fitur, termasuk perintah admin grup dan owner. Hanya owner yang bisa melihat perintah owner di menu ini.

### Contoh Perintah
| Kategori      | Perintah                      | Contoh Penggunaan                                     |
| ------------- | ----------------------------- | ----------------------------------------------------- |
| **Game**      | `.family100`                  | `.family100`                                          |
| **AI**        | `.chatgpt`                    | `.chatgpt Siapa presiden pertama Indonesia?`           |
| **Confes**    | `.confes`                     | `.confes 628123456789 Hai, aku suka sama kamu`        |
| **Grup**      | `.add`                        | `.add 628123456789`                                   |
| **Owner**     | `.banned`                     | `.banned 628123456789`                                |
| **Stiker**    | `.brat`                       | `.brat Halo Dunia`                                    |

> **💡 Tip**: Gunakan `.help` atau `.menu` di WhatsApp untuk melihat daftar perintah yang tersedia kapan saja.

---

## 📂 Struktur Proyek

Proyek ini dirancang dengan struktur yang modular dan rapi untuk memudahkan pengembangan dan pemeliharaan.

```
bot-whatsapp/
├── .gitignore              # Mengabaikan file yang tidak perlu di Git
├── package.json            # Info proyek dan daftar dependensi
├── config.json             # Konfigurasi utama bot (API key, owner, dll)
├── README.md               # Dokumentasi proyek (file ini!)
├── database/               # Folder untuk penyimpanan data
│   ├── db.json             # Database pengguna (file JSON)
│   └── db.js               # Logika untuk mengelola database
└── src/                    # Folder sumber kode bot
    ├── index.js            # File utama untuk menjalankan bot
    ├── utils/              # Fungsi-fungsi pembantu
    │   └── helper.js       # Fungsi tampilan QR, dll.
    ├── handlers/           # Logika inti pemrosesan pesan
    │   └── messageHandler.js # Otak yang memanggil perintah
    └── commands/           # Folder untuk setiap fitur
        ├── menu.js         # Logika perintah .menu dan .allmenu
        ├── game.js         # Semua logika permainan
        ├── ai.js           # Logika untuk ChatGPT, Gemini
        ├── group.js        # Perintah admin grup (.add, .kick)
        ├── confess.js      # Logika fitur confes
        ├── owner.js        # Perintah khusus owner
        ├── stalker.js      # Logika stalker Instagram
        └── sticker.js      # Logika pembuatan stiker
```

---

## 🤝 Berkontribusi

Kontribusi sangat diterima! Jika kamu memiliki ide untuk fitur baru atau menemukan bug, jangan ragu untuk membuat *issue* atau *pull request*.

---

<div align="center">

Created for **Bot WhatsApp** users by [RZZDEV](#-rzzdev) 

</div>
