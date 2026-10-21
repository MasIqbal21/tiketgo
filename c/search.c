#include "ticket_offer.h"
#include <stdio.h>
#include <string.h>

/* Helper huruf kecil manual tanpa tolower() ctype */
static char to_lower_char(char c) {
    if (c >= 'A' && c <= 'Z') {
        return (char)(c + ('a' - 'A'));
    }
    return c;
}

/* ============================================================================
 * FUNGSI PEMERIKSAAN SUBSTRING CASE-INSENSITIVE MANUAL (TANPA strstr)
 * Mengembalikan true jika 'needle' ditemukan di dalam 'haystack'.
 * ============================================================================ */
bool contains_ignore_case(const char *haystack, const char *needle) {
    if (needle == 0 || needle[0] == '\0') {
        return true; /* String pencarian kosong selalu cocok */
    }
    if (haystack == 0 || haystack[0] == '\0') {
        return false;
    }

    for (int i = 0; haystack[i] != '\0'; i++) {
        int j = 0;
        while (needle[j] != '\0' && haystack[i + j] != '\0') {
            if (to_lower_char(haystack[i + j]) != to_lower_char(needle[j])) {
                break;
            }
            j++;
        }
        if (needle[j] == '\0') {
            return true; /* Seluruh karakter needle cocok */
        }
    }

    return false;
}

/* ============================================================================
 * LINEAR SEARCH DENGAN FILTER KATEGORI & LOGGING PENUH
 * ============================================================================ */
void linear_search(const TicketOffer arr[], int n, const char *keyword, 
                   CategoryType filter, TicketOffer results[], int *result_count) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), 
             "[SYSTEM] Memulai Linear Search: Keyword=\"%s\", FilterKategori=%d (Total Katalog: %d)",
             (keyword != 0) ? keyword : "", (int)filter, n);
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    int count = 0;
    int check_count = 0;

    for (int i = 0; i < n; i++) {
        check_count++;

        /* 1. Evaluasi Filter Kategori */
        if (filter != CAT_ALL && arr[i].category != filter) {
            snprintf(buf, sizeof(buf), 
                     "[CHECK] Item [%d] (\"%s\"): Kategori %d != %d -> [SKIP]",
                     i, arr[i].title, (int)arr[i].category, (int)filter);
            logger_add_entry(LOG_CHECK, buf, 0, check_count);
            continue;
        }

        /* 2. Evaluasi Kata Kunci pada Title dan Provider */
        bool title_match = contains_ignore_case(arr[i].title, keyword);
        bool provider_match = contains_ignore_case(arr[i].provider, keyword);

        if (title_match || provider_match) {
            results[count] = arr[i]; /* Simpan ke array hasil */
            count++;

            snprintf(buf, sizeof(buf), 
                     "[FOUND] Item [%d] Cocok! \"%s\" (%s) - Rp %.0f",
                     i, arr[i].title, arr[i].provider, arr[i].price);
            logger_add_entry(LOG_CHECK, buf, count, check_count);
        } else {
            snprintf(buf, sizeof(buf), 
                     "[CHECK] Item [%d] (\"%s\"): Tidak mengandung keyword -> [LEWAT]",
                     i, arr[i].title);
            logger_add_entry(LOG_CHECK, buf, count, check_count);
        }
    }

    *result_count = count;

    if (count > 0) {
        snprintf(buf, sizeof(buf), 
                 "[SUCCESS] Linear Search tuntas: %d kecocokan ditemukan dari %d pemeriksaan",
                 count, check_count);
        logger_add_entry(LOG_SUCCESS, buf, count, check_count);
    } else {
        snprintf(buf, sizeof(buf), 
                 "[NOT_FOUND] Linear Search tuntas: 0 kecocokan ditemukan dari %d pemeriksaan",
                 check_count);
        logger_add_entry(LOG_NOT_FOUND, buf, 0, check_count);
    }
}

/* ============================================================================
 * BINARY SEARCH DENGAN PRE-SORTING & LOGGING TERSTRUKTUR
 * Sesuai spesifikasi:
 * - Langkah 1: Pra-pengurutan judul tiket (wajib untuk Binary Search)
 * - Langkah 2: Binary Search (rentang low..high, pemeriksaan mid, strcmp)
 * ============================================================================ */
void binary_search(TicketOffer arr[], int n, const char *keyword, 
                   CategoryType filter, TicketOffer results[], int *result_count) {
    logger_reset();

    char buf[256];
    const char *kw = (keyword != 0) ? keyword : "";
    snprintf(buf, sizeof(buf), 
             "[SYSTEM] Memulai Binary Search: Keyword=\"%s\", FilterKategori=%d (Total Data: %d)",
             kw, (int)filter, n);
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    /* 1. Saring dataset berdasarkan filter kategori aktif */
    TicketOffer work[CATALOG_TOTAL_ITEMS];
    int work_count = 0;

    for (int i = 0; i < n && work_count < CATALOG_TOTAL_ITEMS; i++) {
        if (filter == CAT_ALL || arr[i].category == filter) {
            work[work_count++] = arr[i];
        }
    }

    if (work_count == 0) {
        *result_count = 0;
        logger_add_entry(LOG_NOT_FOUND, "[NOT_FOUND] Tidak ada data tiket yang sesuai filter kategori", 0, 0);
        return;
    }

    /* 2. Langkah 1: Pra-pengurutan judul tiket (wajib untuk Binary Search) */
    logger_add_entry(LOG_SYSTEM, "[SYSTEM] Langkah 1: Pra-pengurutan judul tiket (wajib untuk Binary Search)", 0, 0);

    int pre_sort_swaps = 0;
    int pre_sort_comps = 0;
    for (int i = 0; i < work_count - 1; i++) {
        for (int j = i + 1; j < work_count; j++) {
            pre_sort_comps++;
            if (strcmp(work[j].title, work[i].title) < 0) {
                TicketOffer temp = work[i];
                work[i] = work[j];
                work[j] = temp;
                pre_sort_swaps++;
            }
        }
    }

    snprintf(buf, sizeof(buf), 
             "[SYSTEM] Pra-pengurutan judul selesai (%d tiket terurut ascending)", work_count);
    logger_add_entry(LOG_SYSTEM, buf, pre_sort_swaps, pre_sort_comps);

    /* 3. Langkah 2: Binary Search */
    logger_add_entry(LOG_SYSTEM, "[SYSTEM] Langkah 2: Binary Search", pre_sort_swaps, pre_sort_comps);

    int low = 0;
    int high = work_count - 1;
    int found_idx = -1;
    int comp_count = pre_sort_comps;

    while (low <= high) {
        int mid = (low + high) / 2;
        comp_count++;

        snprintf(buf, sizeof(buf), 
                 "[CHECK] Memeriksa posisi tengah %d: '%s'", mid, work[mid].title);
        logger_add_entry(LOG_CHECK, buf, 0, comp_count);

        int cmp = strcmp(work[mid].title, kw);
        bool match = (cmp == 0) || 
                     contains_ignore_case(work[mid].title, kw) || 
                     contains_ignore_case(work[mid].provider, kw);

        if (match) {
            found_idx = mid;
            snprintf(buf, sizeof(buf), 
                     "[FOUND] Kecocokan ditemukan pada posisi tengah %d: '%s' (%s) - Rp %.0f", 
                     mid, work[mid].title, work[mid].provider, work[mid].price);
            logger_add_entry(LOG_CHECK, buf, 1, comp_count);
            break;
        }

        if (cmp < 0) {
            snprintf(buf, sizeof(buf), 
                     "[SYSTEM] '%s' < target -> persempit ke separuh kanan (low = %d)", 
                     work[mid].title, mid + 1);
            logger_add_entry(LOG_SYSTEM, buf, 0, comp_count);
            low = mid + 1;
        } else {
            snprintf(buf, sizeof(buf), 
                     "[SYSTEM] '%s' > target -> persempit ke separuh kiri (high = %d)", 
                     work[mid].title, mid - 1);
            logger_add_entry(LOG_SYSTEM, buf, 0, comp_count);
            high = mid - 1;
        }
    }

    if (found_idx != -1) {
        results[0] = work[found_idx];
        *result_count = 1;
        snprintf(buf, sizeof(buf), 
                 "[SUCCESS] Binary Search selesai: Item ditemukan pada posisi tengah [%d].", found_idx);
        logger_add_entry(LOG_SUCCESS, buf, 1, comp_count);
    } else {
        *result_count = 0;
        snprintf(buf, sizeof(buf), 
                 "[NOT_FOUND] Binary Search selesai: Keyword \"%s\" tidak ditemukan.", kw);
        logger_add_entry(LOG_NOT_FOUND, buf, 0, comp_count);
    }
}

