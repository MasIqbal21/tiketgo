#!/usr/bin/env python3
"""
TiketGO - Script Penggabungan Final (Single File HTML)
Menggabungkan index.html + css/style.css + js/tiketgo_wasm.js + js/app.js
menjadi SATU file HTML mandiri, sesuai syarat submission UTS (harus bisa
dibuka langsung oleh dosen tanpa server/koneksi tambahan).

Cara pakai (jalankan dari dalam folder project, sejajar dengan index.html):
    python3 merge_final.py

Hasil:
    TiketGO_FINAL.html  -> file tunggal siap disubmit, bisa dibuka
                           langsung (double-click) tanpa python -m http.server.
"""

import re
import sys
from pathlib import Path

INDEX_FILE = Path("index.html")
CSS_FILE = Path("css/style.css")
WASM_JS_FILE = Path("js/tiketgo_wasm.js")
APP_JS_FILE = Path("js/app.js")
OUTPUT_FILE = Path("TiketGO_FINAL.html")


def read_required(path: Path) -> str:
    if not path.exists():
        sys.exit(f"[ERROR] File tidak ditemukan: {path}")
    return path.read_text(encoding="utf-8")


def safe_inline_script(code: str) -> str:
    """Mencegah tag </script> di dalam kode JS menutup paksa blok <script>."""
    return re.sub(r"</script", "<\\/script", code, flags=re.IGNORECASE)


def main():
    html = read_required(INDEX_FILE)
    css = read_required(CSS_FILE)
    wasm_js = read_required(WASM_JS_FILE)
    app_js = read_required(APP_JS_FILE)

    # 1. Ganti <link ... href="css/style.css"> dengan <style> inline
    link_pattern = re.compile(
        r'<link[^>]+href=["\']css/style\.css["\'][^>]*/?>', re.IGNORECASE
    )
    if not link_pattern.search(html):
        sys.exit(
            "[ERROR] Tag <link> untuk css/style.css tidak ditemukan di index.html.\n"
            "        Cek manual baris <link ... href=\"css/style.css\"> di index.html."
        )
    html = link_pattern.sub(lambda m: f"<style>\n{css}\n</style>", html, count=1)

    # 2. Ganti <script src="js/tiketgo_wasm.js"></script> dengan <script> inline
    wasm_pattern = re.compile(
        r'<script[^>]+src=["\']js/tiketgo_wasm\.js["\'][^>]*>\s*</script>',
        re.IGNORECASE,
    )
    if not wasm_pattern.search(html):
        sys.exit(
            "[ERROR] Tag <script src=\"js/tiketgo_wasm.js\"> tidak ditemukan di index.html.\n"
            "        Pastikan prompt penyambungan WASM sudah dijalankan di AI Studio."
        )
    html = wasm_pattern.sub(
        lambda m: f"<script>\n{safe_inline_script(wasm_js)}\n</script>", html, count=1
    )

    # 3. Ganti <script ... src="js/app.js"></script> dengan <script type="module"> inline
    app_pattern = re.compile(
        r'<script[^>]+src=["\']js/app\.js["\'][^>]*>\s*</script>', re.IGNORECASE
    )
    if not app_pattern.search(html):
        sys.exit("[ERROR] Tag <script> untuk js/app.js tidak ditemukan di index.html.")
    html = app_pattern.sub(
        lambda m: f'<script type="module">\n{safe_inline_script(app_js)}\n</script>',
        html,
        count=1,
    )

    OUTPUT_FILE.write_text(html, encoding="utf-8")
    size_kb = OUTPUT_FILE.stat().st_size / 1024
    print(f"[OK] Berhasil digabung menjadi satu file: {OUTPUT_FILE} ({size_kb:.1f} KB)")
    print("     Coba buka file ini langsung (double-click) TANPA server lokal.")


if __name__ == "__main__":
    main()
