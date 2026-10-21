#!/usr/bin/env python3
"""
TiketGO - Script Penyisipan Gambar Background ke index.html
Mengganti penanda <!-- BACKGROUND_IMAGE_PLACEHOLDER --> di css/style.css
(atau langsung di index.html, tergantung di mana AI Studio menaruh CSS-nya)
dengan data URI base64 dari file gambar Anda, supaya background tetap ikut
menyatu ke dalam SATU file HTML saat digabung nanti dengan merge_final.py.

Cara pakai:
    python3 embed_background.py <path_ke_index_atau_style.css> <path_ke_gambar.jpg>

Contoh:
    python3 embed_background.py index.html background.jpg
    python3 embed_background.py css/style.css background.jpg
"""

import sys
import base64
import mimetypes
from pathlib import Path

PLACEHOLDER = "BACKGROUND_IMAGE_PLACEHOLDER"


def main():
    if len(sys.argv) != 3:
        sys.exit("Pemakaian: python3 embed_background.py <file_target> <file_gambar>")

    target_path = Path(sys.argv[1])
    image_path = Path(sys.argv[2])

    if not target_path.exists():
        sys.exit(f"[ERROR] File target tidak ditemukan: {target_path}")
    if not image_path.exists():
        sys.exit(f"[ERROR] File gambar tidak ditemukan: {image_path}")

    mime_type, _ = mimetypes.guess_type(str(image_path))
    if mime_type is None:
        mime_type = "image/jpeg"

    image_bytes = image_path.read_bytes()
    b64_data = base64.b64encode(image_bytes).decode("ascii")
    data_uri = f"data:{mime_type};base64,{b64_data}"

    content = target_path.read_text(encoding="utf-8")

    if PLACEHOLDER not in content:
        sys.exit(
            f"[ERROR] Penanda '{PLACEHOLDER}' tidak ditemukan di {target_path}.\n"
            "        Pastikan prompt AI Studio sudah dijalankan dan CSS memakai\n"
            "        background-image: url('BACKGROUND_IMAGE_PLACEHOLDER');"
        )

    updated = content.replace(PLACEHOLDER, data_uri)
    target_path.write_text(updated, encoding="utf-8")

    size_kb = len(data_uri) / 1024
    print(f"[OK] Berhasil menyisipkan gambar ({len(image_bytes)/1024:.1f} KB asli, "
          f"{size_kb:.1f} KB setelah base64) ke dalam {target_path}")
    print("     Buka index.html di browser untuk memastikan background tampil benar.")


if __name__ == "__main__":
    main()
