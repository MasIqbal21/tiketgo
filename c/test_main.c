#include "ticket_offer.h"
#include <stdio.h>
#include <string.h>
#include <assert.h>

/* Deklarasi prototipe WASM bridge untuk testing native */
void wasm_init_catalog(void);
int wasm_execute_search(const char *keyword, int category_id);
int wasm_execute_search_algo(const char *keyword, int category_id, int algorithm_type);
int wasm_execute_binary_search(const char *keyword, int category_id);
void wasm_execute_sort(int algorithm_type, int ascending);
int wasm_get_result_count(void);
const char *wasm_get_results_json(void);
int wasm_get_log_count(void);
const char *wasm_get_log_entry(int index);

int main(void) {
    printf("==================================================\n");
    printf("  TIKETGO — TEST SUITE LOGIKA C (UTS STRUKTUR DATA)\n");
    printf("==================================================\n\n");

    /* TEST 1: Inisialisasi Katalog Master */
    printf("[Uji 1] Memeriksa Dataset Master...\n");
    assert(catalog_get_total() == 30);
    wasm_init_catalog();
    assert(wasm_get_result_count() == 30);
    printf("  -> OK: 30 data katalog berhasil dimuat.\n\n");

    /* TEST 2: Linear Search dengan Filter Kategori Pesawat */
    printf("[Uji 2] Linear Search Kategori CAT_FLIGHT (Pesawat)...\n");
    int flight_count = wasm_execute_search("", CAT_FLIGHT);
    assert(flight_count == 6);
    printf("  -> OK: Ditemukan %d penerbangan.\n", flight_count);
    printf("  -> Total Log Entries: %d\n", wasm_get_log_count());
    printf("  -> Cuplikan Log Terakhir: %s\n\n", wasm_get_log_entry(wasm_get_log_count() - 1));

    /* TEST 3: Linear Search dengan Keyword Tertentu */
    printf("[Uji 3] Linear Search Substring Keyword=\"Bali\"...\n");
    int bali_count = wasm_execute_search("Bali", CAT_ALL);
    assert(bali_count >= 3);
    printf("  -> OK: Ditemukan %d tiket tujuan/lokasi 'Bali'.\n\n", bali_count);

    /* TEST 4: Bubble Sort (Ascending / Harga Terendah) */
    printf("[Uji 4] Bubble Sort Ascending (Tiket Pesawat)...\n");
    wasm_execute_search("", CAT_FLIGHT);
    wasm_execute_sort(0, 1); /* 0: Bubble Sort, 1: Ascending */
    const char *json_sorted = wasm_get_results_json();
    printf("  -> Hasil JSON (Ascending):\n  %s\n", json_sorted);
    printf("  -> Total Log Operasi: %d baris\n\n", wasm_get_log_count());

    /* TEST 5: Selection Sort (Descending / Harga Tertinggi) */
    printf("[Uji 5] Selection Sort Descending (Hotel)...\n");
    wasm_execute_search("", CAT_HOTEL);
    wasm_execute_sort(1, 0); /* 1: Selection Sort, 0: Descending */
    assert(wasm_get_result_count() == 6);
    printf("  -> OK: Pengurutan Hotel Descending selesai tanpa error.\n\n");

    /* TEST 6: Exchange Sort (Ascending / Harga Terendah) */
    printf("[Uji 6] Exchange Sort Ascending (Tiket Kereta)...\n");
    wasm_execute_search("", CAT_TRAIN);
    wasm_execute_sort(2, 1); /* 2: Exchange Sort, 1: Ascending */
    assert(wasm_get_result_count() == 6);
    printf("  -> OK: Exchange Sort selesai. Total Log: %d baris\n\n", wasm_get_log_count());

    /* TEST 7: Insertion Sort (Ascending) */
    printf("[Uji 7] Insertion Sort Ascending (Tiket Bus)...\n");
    wasm_execute_search("", CAT_BUS);
    wasm_execute_sort(3, 1); /* 3: Insertion Sort, 1: Ascending */
    assert(wasm_get_result_count() == 6);
    printf("  -> OK: Insertion Sort selesai. Total Log: %d baris\n\n", wasm_get_log_count());

    /* TEST 8: Shell Sort (Descending) */
    printf("[Uji 8] Shell Sort Descending (Bioskop)...\n");
    wasm_execute_search("", CAT_CINEMA);
    wasm_execute_sort(4, 0); /* 4: Shell Sort, 0: Descending */
    assert(wasm_get_result_count() == 6);
    printf("  -> OK: Shell Sort selesai. Total Log: %d baris\n\n", wasm_get_log_count());

    /* TEST 9: Quick Sort (Ascending) */
    printf("[Uji 9] Quick Sort Ascending (Semua Tiket)...\n");
    wasm_execute_search("", CAT_ALL);
    wasm_execute_sort(5, 1); /* 5: Quick Sort, 1: Ascending */
    assert(wasm_get_result_count() == 30);
    printf("  -> OK: Quick Sort selesai. Total Log: %d baris\n\n", wasm_get_log_count());

    /* TEST 10: Binary Search (dengan Langkah 1 Pra-pengurutan Judul) */
    printf("[Uji 10] Binary Search Substring Judul \"Jakarta\" (Pesawat)...\n");
    int bin_count = wasm_execute_search_algo("Jakarta", CAT_FLIGHT, 1);
    assert(bin_count == 1);
    printf("  -> OK: Binary Search menemukan tiket secara presisi.\n");
    printf("  -> Total Log Operasi: %d baris\n\n", wasm_get_log_count());

    /* TEST 11: Pengujian Union Field Spesifik */
    printf("[Uji 11] Memeriksa Integritas Union Tiap Kategori...\n");
    assert(strcmp(catalog[0].details.flight.airport_code, "CGK-DPS") == 0);
    assert(strcmp(catalog[6].details.transport.departure_time, "08:20 WIB") == 0);
    assert(catalog[18].details.hotel.star_rating == 5.0);
    assert(strcmp(catalog[24].details.cinema.screen_format, "The Premiere Luxury") == 0);
    printf("  -> OK: Union data struct valid dan tersimpan presisi.\n\n");

    printf("==================================================\n");
    printf("  SEMUA PENGUJIAN LOGIKA C BERHASIL 100%% (PASSED)!\n");
    printf("==================================================\n");

    return 0;
}
