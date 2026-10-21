# TiketGO — Agregator Tiket Multi-Penyedia

**UTS Struktur Data · Pendidikan Teknologi Informasi · Semester 3**

TiketGO adalah prototipe web agregator tiket (Pesawat, Kereta, Bus, Hotel, Bioskop) yang menggabungkan antarmuka web dengan logika Sorting dan Searching manual yang ditulis murni dalam bahasa C, dikompilasi ke WebAssembly, dan dijalankan langsung di browser.

## Cara Membuka (untuk Dosen/Penilai)

Cukup buka file **[`TiketGO_FINAL.html`](./TiketGO_FINAL.html)** langsung lewat browser (double-click dari File Explorer). Tidak perlu server, tidak perlu instalasi apa pun, tidak perlu koneksi internet — seluruh CSS, JavaScript, dan modul WebAssembly sudah digabung menjadi satu file HTML mandiri.

## Fitur Struktur Data (Inti Penilaian)

- **Struct & Union (C):** `TicketOffer` sebagai struct utama, dengan `union CategorySpecificDetails` untuk menampung detail berbeda tiap kategori (rute pesawat, jam kereta/bus, bintang hotel, jam tayang bioskop) secara efisien.
- **Array & Pointer (C):** dataset master 30 tiket disimpan di array statis `catalog[]`; seluruh fungsi sorting/searching menerima array lewat pointer (`TicketOffer arr[]`).
- **6 Algoritma Sorting manual** (berdasarkan harga, dengan log eksekusi nyata): Bubble Sort, Selection Sort, Exchange Sort, Insertion Sort, Shell Sort, Quick Sort (partisi Lomuto, rekursif).
- **2 Algoritma Searching manual** (dengan log eksekusi nyata): Linear Search, Binary Search (termasuk langkah pra-pengurutan judul yang wajib sebelum pencarian biner).
- **Log eksekusi sungguhan:** setiap perbandingan dan pertukaran dicatat lewat `AlgorithmLogEntry` di C — bukan animasi/simulasi JavaScript.

## Arsitektur

```
Kode C (struct, array, pointer, algoritma)
        │  dikompilasi via Emscripten (emcc)
        ▼
WebAssembly (js/tiketgo_wasm.js)
        │  dipanggil lewat Module.ccall / Module.cwrap
        ▼
JavaScript (js/app.js) ──▶ render ke UI (index.html + css/style.css)
```

## Struktur Proyek

```
tiketgo/
├── TiketGO_FINAL.html   ← file tunggal untuk dibuka dosen (sudah digabung)
├── index.html           ← HTML sumber (sebelum digabung)
├── css/style.css        ← styling sumber
├── js/
│   ├── app.js            ← logika UI & jembatan pemanggilan WASM
│   └── tiketgo_wasm.js   ← hasil kompilasi WebAssembly (dibuat dari folder c/)
├── c/
│   ├── ticket_offer.h    ← struct, union, enum, prototipe fungsi
│   ├── dataset.c         ← array master 30 data tiket
│   ├── sort.c             ← 6 algoritma sorting manual
│   ├── search.c           ← 2 algoritma searching manual
│   ├── logger.c           ← pencatat log eksekusi algoritma
│   ├── main_wasm.c        ← jembatan ekspor fungsi C ke WebAssembly
│   └── test_main.c        ← test suite native (bisa dijalankan tanpa WASM)
├── build.sh              ← skrip kompilasi C → WebAssembly (emcc)
└── merge_final.py        ← skrip penggabung jadi satu file HTML final
```

## Build Ulang dari Sumber (opsional, tidak perlu untuk menilai)

Build ulang hanya perlu dilakukan jika kode C diubah. Prasyarat: [Emscripten SDK](https://emscripten.org/) sudah terpasang dan diaktifkan (`emsdk_env`).

```bash
# 1. Uji logika C secara native (opsional, tanpa WASM)
gcc -o test_native c/dataset.c c/logger.c c/sort.c c/search.c c/main_wasm.c c/test_main.c
./test_native

# 2. Kompilasi C ke WebAssembly
./build.sh

# 3. Gabungkan semua jadi satu file HTML final
python3 merge_final.py
```

## Teknologi

HTML5 · CSS3 · JavaScript (vanilla) · C · WebAssembly (Emscripten)

## Author

[Nama Anda] — [NIM Anda] — Pendidikan Teknologi Informasi, UNESA
