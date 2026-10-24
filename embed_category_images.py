#!/usr/bin/env python3
"""
TiketGO - Sisipkan 1 Gambar per Kategori (base64) ke js/app.js
Mengganti placeholder CATEGORY_IMAGE_<KATEGORI>_PLACEHOLDER di js/app.js
dengan data URI base64 dari file gambar lokal di folder images/.

Cara pakai (jalankan dari folder project, sejajar index.html):
    python3 embed_category_images.py

Prasyarat: 5 file berikut sudah ada di folder images/ (boleh .jpg/.jpeg/.png/.webp):
    images/pesawat.jpg
    images/kereta.jpg
    images/bus.jpg
    images/hotel.jpg
    images/bioskop.jpg
"""
import base64
import sys
from pathlib import Path

APP_JS = Path("js/app.js")
IMAGES_DIR = Path("images")

CATEGORY_MAP = {
    "pesawat": "CATEGORY_IMAGE_PESAWAT_PLACEHOLDER",
    "kereta": "CATEGORY_IMAGE_KERETA_PLACEHOLDER",
    "bus": "CATEGORY_IMAGE_BUS_PLACEHOLDER",
    "hotel": "CATEGORY_IMAGE_HOTEL_PLACEHOLDER",
    "bioskop": "CATEGORY_IMAGE_BIOSKOP_PLACEHOLDER",
}

MIME = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp"}


def find_image(name: str) -> Path:
    for ext in MIME:
        p = IMAGES_DIR / f"{name}{ext}"
        if p.exists():
            return p
    sys.exit(
        f"[ERROR] Gambar untuk kategori '{name}' tidak ditemukan di folder images/.\n"
        f"        Pastikan file images/{name}.jpg (atau .png/.jpeg/.webp) ada."
    )


def main():
    if not APP_JS.exists():
        sys.exit(
            f"[ERROR] {APP_JS} tidak ditemukan.\n"
            "        Jalankan script ini dari dalam folder project (sejajar index.html)."
        )
    if not IMAGES_DIR.exists():
        sys.exit("[ERROR] Folder images/ tidak ditemukan. Buat folder itu dan isi 5 foto kategori dulu.")

    code = APP_JS.read_text(encoding="utf-8")
    replaced = 0

    for name, placeholder in CATEGORY_MAP.items():
        if placeholder not in code:
            print(f"[WARN] Placeholder {placeholder} tidak ditemukan di app.js, dilewati.")
            print("       (Pastikan prompt AI Studio untuk CATEGORY_IMAGES sudah dijalankan dulu.)")
            continue

        img_path = find_image(name)
        mime = MIME[img_path.suffix.lower()]
        b64 = base64.b64encode(img_path.read_bytes()).decode("ascii")
        data_uri = f"data:{mime};base64,{b64}"

        code = code.replace(placeholder, data_uri)
        replaced += 1
        size_kb = img_path.stat().st_size / 1024
        print(f"[OK] {img_path} -> disisipkan menggantikan {placeholder} ({size_kb:.0f} KB)")

    if replaced == 0:
        sys.exit("[ERROR] Tidak ada placeholder yang berhasil diganti. Cek lagi app.js dan folder images/.")

    APP_JS.write_text(code, encoding="utf-8")
    print(f"\n[SELESAI] {replaced}/5 gambar kategori berhasil disisipkan ke {APP_JS}")
    print("          Lanjutkan dengan: python3 merge_final.py")


if __name__ == "__main__":
    main()
