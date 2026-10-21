#include "ticket_offer.h"
#include <stdio.h>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* ============================================================================
 * STATE KERJA AKTIF
 * - catalog[] master tidak pernah diubah
 * - active_results[] menampung data aktif yang ditampilkan di UI
 * ============================================================================ */
static TicketOffer active_results[CATALOG_TOTAL_ITEMS];
static int active_count = 0;

/* Buffer statis untuk ekspor JSON (menghindari malloc di WASM) */
static char json_buffer[131072]; /* 128 KB */
static char log_json_buffer[1024];

/* Helper escaping karakter JSON (" \ \n \r \t) */
static void escape_json_string(const char *src, char *dest, int max_dest) {
    if (src == 0 || dest == 0 || max_dest <= 1) return;

    int di = 0;
    for (int si = 0; src[si] != '\0' && di < max_dest - 2; si++) {
        char c = src[si];
        if (c == '"' || c == '\\') {
            if (di + 2 >= max_dest - 1) break;
            dest[di++] = '\\';
            dest[di++] = c;
        } else if (c == '\n') {
            if (di + 2 >= max_dest - 1) break;
            dest[di++] = '\\';
            dest[di++] = 'n';
        } else if (c == '\r') {
            if (di + 2 >= max_dest - 1) break;
            dest[di++] = '\\';
            dest[di++] = 'r';
        } else if (c == '\t') {
            if (di + 2 >= max_dest - 1) break;
            dest[di++] = '\\';
            dest[di++] = 't';
        } else {
            dest[di++] = c;
        }
    }
    dest[di] = '\0';
}

/* ============================================================================
 * 1. INISIALISASI KATALOG
 * ============================================================================ */
EMSCRIPTEN_KEEPALIVE
void wasm_init_catalog(void) {
    active_count = CATALOG_TOTAL_ITEMS;
    for (int i = 0; i < CATALOG_TOTAL_ITEMS; i++) {
        active_results[i] = catalog[i];
    }
    logger_reset();
    logger_add_entry(LOG_SYSTEM, "[SYSTEM] Katalog TiketGO WASM diinisialisasi (30 item)", 0, 0);
}

/* ============================================================================
 * 2. EKSEKUSI PENCARIAN & FILTER KATEGORI
 * Selalu membaca dari catalog master dan menulis ke active_results
 * ============================================================================ */
EMSCRIPTEN_KEEPALIVE
int wasm_execute_search(const char *keyword, int category_id) {
    CategoryType filter = (CategoryType)category_id;
    linear_search(catalog, CATALOG_TOTAL_ITEMS, keyword, filter, active_results, &active_count);
    return active_count;
}

EMSCRIPTEN_KEEPALIVE
int wasm_execute_search_algo(const char *keyword, int category_id, int algorithm_type) {
    CategoryType filter = (CategoryType)category_id;
    if (algorithm_type == 1) {
        binary_search((TicketOffer *)catalog, CATALOG_TOTAL_ITEMS, keyword, filter, active_results, &active_count);
    } else {
        linear_search(catalog, CATALOG_TOTAL_ITEMS, keyword, filter, active_results, &active_count);
    }
    return active_count;
}

EMSCRIPTEN_KEEPALIVE
int wasm_execute_binary_search(const char *keyword, int category_id) {
    return wasm_execute_search_algo(keyword, category_id, 1);
}

/* ============================================================================
 * 3. EKSEKUSI PENGURUTAN (SORTING)
 * Mengurutkan array kerja active_results saat ini (menghormati filter aktif)
 * algorithm_type:
 *   0 = Bubble Sort
 *   1 = Selection Sort
 *   2 = Exchange Sort
 *   3 = Insertion Sort
 *   4 = Shell Sort
 *   5 = Quick Sort
 * ascending: 1 = harga terendah, 0 = harga tertinggi
 * ============================================================================ */
EMSCRIPTEN_KEEPALIVE
void wasm_execute_sort(int algorithm_type, int ascending) {
    bool asc = (ascending != 0);
    switch (algorithm_type) {
        case 0:
            bubble_sort(active_results, active_count, asc);
            break;
        case 1:
            selection_sort(active_results, active_count, asc);
            break;
        case 2:
            exchange_sort(active_results, active_count, asc);
            break;
        case 3:
            insertion_sort(active_results, active_count, asc);
            break;
        case 4:
            shell_sort(active_results, active_count, asc);
            break;
        case 5:
            quick_sort(active_results, active_count, asc);
            break;
        default:
            bubble_sort(active_results, active_count, asc);
            break;
    }
}

/* ============================================================================
 * 4. PENGAMBILAN DATA HASIL DALAM FORMAT JSON
 * ============================================================================ */
EMSCRIPTEN_KEEPALIVE
int wasm_get_result_count(void) {
    return active_count;
}

EMSCRIPTEN_KEEPALIVE
const char *wasm_get_results_json(void) {
    int offset = 0;
    int max_len = sizeof(json_buffer);

    offset += snprintf(json_buffer + offset, max_len - offset, "[");

    for (int i = 0; i < active_count; i++) {
        char esc_title[256];
        char esc_provider[256];
        escape_json_string(active_results[i].title, esc_title, sizeof(esc_title));
        escape_json_string(active_results[i].provider, esc_provider, sizeof(esc_provider));

        offset += snprintf(json_buffer + offset, max_len - offset,
            "%s{\"id\":\"%s\",\"category\":\"%s\",\"title\":\"%s\",\"provider\":\"%s\","
            "\"rating\":%.1f,\"review_count\":%d,\"price\":%.0f,\"formatted_price\":\"%s\",\"price_unit\":\"%s\"}",
            (i > 0) ? "," : "",
            active_results[i].id,
            active_results[i].category_label,
            esc_title,
            esc_provider,
            active_results[i].rating,
            active_results[i].review_count,
            active_results[i].price,
            active_results[i].formatted_price,
            active_results[i].price_unit
        );

        if (offset >= max_len - 100) {
            break; /* Pengaman overflow buffer */
        }
    }

    snprintf(json_buffer + offset, max_len - offset, "]");
    return json_buffer;
}

/* ============================================================================
 * 5. PENGAMBILAN DATA LOG ALGORITMA
 * ============================================================================ */
EMSCRIPTEN_KEEPALIVE
int wasm_get_log_count(void) {
    return logger_get_count();
}

EMSCRIPTEN_KEEPALIVE
const char *wasm_get_log_entry(int index) {
    const AlgorithmLogEntry *entry = logger_get_entry(index);
    if (!entry) {
        return "{}";
    }

    char esc_msg[512];
    escape_json_string(entry->message, esc_msg, sizeof(esc_msg));

    snprintf(log_json_buffer, sizeof(log_json_buffer),
        "{\"level\":%d,\"message\":\"%s\",\"swap_count\":%d,\"comparison_count\":%d}",
        (int)entry->level,
        esc_msg,
        entry->swap_count,
        entry->comparison_count
    );

    return log_json_buffer;
}

#ifdef __cplusplus
}
#endif
