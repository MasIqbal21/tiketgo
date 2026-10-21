#!/bin/bash
# ==============================================================================
# TiketGO — Skrip Kompilasi WebAssembly (Tahap 3)
# UTS Struktur Data · PTI Smt 3
# ==============================================================================
# Skrip ini digunakan untuk mengompilasi logika inti C ke WebAssembly (.js/.wasm)
# secara LOKAL di komputer mahasiswa menggunakan Emscripten SDK (emcc).
#
# Prasyarat Lokal:
#   1. Pastikan Emscripten SDK sudah terpasang.
#   2. Aktifkan environment emcc: source path/to/emsdk/emsdk_env.sh
#   3. Beri izin eksekusi skrip: chmod +x build.sh
#   4. Jalankan dari root proyek: ./build.sh
# ==============================================================================

set -e

echo "=== [TiketGO] Memulai Kompilasi C ke WebAssembly ==="

# 1. Pastikan direktori output js/ tersedia
mkdir -p js

# 2. Periksa keberadaan compiler emcc
if ! command -v emcc &> /dev/null; then
    echo "ERROR: 'emcc' (Emscripten Compiler) tidak ditemukan di PATH sistem Anda."
    echo "Silakan aktifkan Emscripten SDK terlebih dahulu dengan perintah:"
    echo "  source <direktori_emsdk>/emsdk_env.sh"
    exit 1
fi

echo ">> Mengompilasi c/dataset.c, c/logger.c, c/sort.c, c/search.c, c/main_wasm.c..."

# 3. Jalankan kompilasi dengan emcc
emcc c/dataset.c c/logger.c c/sort.c c/search.c c/main_wasm.c \
    -O3 \
    -s WASM=1 \
    -s SINGLE_FILE=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s EXPORTED_FUNCTIONS="['_wasm_init_catalog','_wasm_execute_sort','_wasm_execute_search','_wasm_execute_search_algo','_wasm_execute_binary_search','_wasm_get_result_count','_wasm_get_results_json','_wasm_get_log_count','_wasm_get_log_entry','_malloc','_free']" \
    -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','UTF8ToString']" \
    -o js/tiketgo_wasm.js

echo "=== [TiketGO] Kompilasi Sukses! Output tersimpan di js/tiketgo_wasm.js ==="
