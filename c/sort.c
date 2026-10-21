#include "ticket_offer.h"
#include <stdio.h>

/* ============================================================================
 * 1. BUBBLE SORT (MANUAL DENGAN OPTIMASI EARLY-EXIT)
 * Kompleksitas: O(n^2) worst/average, O(n) best case (sudah terurut)
 * ============================================================================ */
void bubble_sort(TicketOffer arr[], int n, bool ascending) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), "[SYSTEM] Memulai Bubble Sort (n=%d, %s)", 
             n, ascending ? "Harga Terendah (Ascending)" : "Harga Tertinggi (Descending)");
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    if (n <= 1) {
        logger_add_entry(LOG_SUCCESS, "[SUCCESS] Array memiliki <= 1 elemen, tidak memerlukan pengurutan", 0, 0);
        return;
    }

    int comp_count = 0;
    int swap_count = 0;

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            comp_count++;

            bool should_swap = false;
            if (ascending) {
                should_swap = (arr[j].price > arr[j + 1].price);
            } else {
                should_swap = (arr[j].price < arr[j + 1].price);
            }

            snprintf(buf, sizeof(buf), 
                     "[COMPARE] Index [%d] (Rp %.0f) vs [%d] (Rp %.0f)",
                     j, arr[j].price, j + 1, arr[j + 1].price);
            logger_add_entry(LOG_COMPARE, buf, swap_count, comp_count);

            if (should_swap) {
                swap_count++;
                swapped = true;

                /* Pertukaran salinan struct TicketOffer secara utuh */
                TicketOffer temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                snprintf(buf, sizeof(buf), 
                         "[SWAP] Tukar elemen index [%d] <=> [%d]", j, j + 1);
                logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
            }
        }

        /* Optimasi Early-Exit: jika putaran ini tidak ada swap sama sekali */
        if (!swapped) {
            snprintf(buf, sizeof(buf), 
                     "[SYSTEM] Early-Exit pada pass %d: array telah terurut sempurna", i + 1);
            logger_add_entry(LOG_SYSTEM, buf, swap_count, comp_count);
            break;
        }
    }

    snprintf(buf, sizeof(buf), 
             "[SUCCESS] Bubble Sort selesai: %d perbandingan, %d pertukaran", 
             comp_count, swap_count);
    logger_add_entry(LOG_SUCCESS, buf, swap_count, comp_count);
}

/* ============================================================================
 * 2. SELECTION SORT (MANUAL)
 * Kompleksitas: O(n^2) komparasi, tepat maksimal (n-1) swap
 * ============================================================================ */
void selection_sort(TicketOffer arr[], int n, bool ascending) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), "[SYSTEM] Memulai Selection Sort (n=%d, %s)", 
             n, ascending ? "Harga Terendah (Ascending)" : "Harga Tertinggi (Descending)");
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    if (n <= 1) {
        logger_add_entry(LOG_SUCCESS, "[SUCCESS] Array memiliki <= 1 elemen, tidak memerlukan pengurutan", 0, 0);
        return;
    }

    int comp_count = 0;
    int swap_count = 0;

    for (int i = 0; i < n - 1; i++) {
        int target_idx = i;

        for (int j = i + 1; j < n; j++) {
            comp_count++;

            bool is_better = false;
            if (ascending) {
                is_better = (arr[j].price < arr[target_idx].price);
            } else {
                is_better = (arr[j].price > arr[target_idx].price);
            }

            snprintf(buf, sizeof(buf), 
                     "[COMPARE] Index [%d] (Rp %.0f) vs Target [%d] (Rp %.0f)",
                     j, arr[j].price, target_idx, arr[target_idx].price);
            logger_add_entry(LOG_COMPARE, buf, swap_count, comp_count);

            if (is_better) {
                target_idx = j;
            }
        }

        if (target_idx != i) {
            swap_count++;

            /* Pertukaran elemen minimum/maksimum yang ditemukan ke posisi i */
            TicketOffer temp = arr[i];
            arr[i] = arr[target_idx];
            arr[target_idx] = temp;

            snprintf(buf, sizeof(buf), 
                     "[SWAP] Pindahkan nilai ekstrem dari index [%d] ke [%d]", target_idx, i);
            logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
        }
    }

    snprintf(buf, sizeof(buf), 
             "[SUCCESS] Selection Sort selesai: %d perbandingan, %d pertukaran", 
             comp_count, swap_count);
    logger_add_entry(LOG_SUCCESS, buf, swap_count, comp_count);
}

/* ============================================================================
 * 3. EXCHANGE SORT (MANUAL)
 * Kompleksitas: O(n^2) komparasi, penukaran langsung pada elemen acuan arr[i]
 * ============================================================================ */
void exchange_sort(TicketOffer arr[], int n, bool ascending) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), "[SYSTEM] Memulai Exchange Sort (n=%d, %s)", 
             n, ascending ? "Harga Terendah (Ascending)" : "Harga Tertinggi (Descending)");
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    if (n <= 1) {
        logger_add_entry(LOG_SUCCESS, "[SUCCESS] Array memiliki <= 1 elemen, tidak memerlukan pengurutan", 0, 0);
        return;
    }

    int comp_count = 0;
    int swap_count = 0;

    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            comp_count++;

            snprintf(buf, sizeof(buf), 
                     "[COMPARE] Membandingkan elemen ke-%d (Rp %.0f) dan ke-%d (Rp %.0f)", 
                     i, arr[i].price, j, arr[j].price);
            logger_add_entry(LOG_COMPARE, buf, swap_count, comp_count);

            bool should_swap = false;
            if (ascending) {
                should_swap = (arr[j].price < arr[i].price);
            } else {
                should_swap = (arr[j].price > arr[i].price);
            }

            if (should_swap) {
                swap_count++;
                TicketOffer temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                snprintf(buf, sizeof(buf), 
                         "[SWAP] Menukar elemen ke-%d dan ke-%d", i, j);
                logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
            }
        }
    }

    snprintf(buf, sizeof(buf), 
             "[SUCCESS] Exchange Sort selesai: %d perbandingan, %d pertukaran", 
             comp_count, swap_count);
    logger_add_entry(LOG_SUCCESS, buf, swap_count, comp_count);
}

/* ============================================================================
 * 4. INSERTION SORT (MANUAL)
 * Kompleksitas: O(n^2) worst/average, O(n) best case (adaptif)
 * ============================================================================ */
void insertion_sort(TicketOffer arr[], int n, bool ascending) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), "[SYSTEM] Memulai Insertion Sort (n=%d, %s)", 
             n, ascending ? "Harga Terendah (Ascending)" : "Harga Tertinggi (Descending)");
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    if (n <= 1) {
        logger_add_entry(LOG_SUCCESS, "[SUCCESS] Array memiliki <= 1 elemen, tidak memerlukan pengurutan", 0, 0);
        return;
    }

    int comp_count = 0;
    int swap_count = 0;

    for (int i = 1; i < n; i++) {
        TicketOffer key = arr[i];
        int j = i - 1;

        snprintf(buf, sizeof(buf), 
                 "[CHECK] Ambil key elemen ke-%d: \"%s\" (Rp %.0f)", 
                 i, key.title, key.price);
        logger_add_entry(LOG_COMPARE, buf, swap_count, comp_count);

        while (j >= 0) {
            comp_count++;

            bool should_shift = false;
            if (ascending) {
                should_shift = (arr[j].price > key.price);
            } else {
                should_shift = (arr[j].price < key.price);
            }

            if (should_shift) {
                arr[j + 1] = arr[j];
                swap_count++;
                snprintf(buf, sizeof(buf), 
                         "[SHIFT] Menggeser elemen ke-%d (Rp %.0f) ke posisi [%d]", 
                         j, arr[j].price, j + 1);
                logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
        snprintf(buf, sizeof(buf), 
                 "[INSERT] Menempatkan key pada elemen ke-%d", j + 1);
        logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
    }

    snprintf(buf, sizeof(buf), 
             "[SUCCESS] Insertion Sort selesai: %d perbandingan, %d pergeseran/swap", 
             comp_count, swap_count);
    logger_add_entry(LOG_SUCCESS, buf, swap_count, comp_count);
}

/* ============================================================================
 * 5. SHELL SORT (MANUAL - INTERVAL GAP HALVING)
 * Kompleksitas: Rata-rata O(n log n) hingga O(n^(3/2))
 * ============================================================================ */
void shell_sort(TicketOffer arr[], int n, bool ascending) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), "[SYSTEM] Memulai Shell Sort (n=%d, %s)", 
             n, ascending ? "Harga Terendah (Ascending)" : "Harga Tertinggi (Descending)");
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    if (n <= 1) {
        logger_add_entry(LOG_SUCCESS, "[SUCCESS] Array memiliki <= 1 elemen, tidak memerlukan pengurutan", 0, 0);
        return;
    }

    int comp_count = 0;
    int swap_count = 0;

    for (int gap = n / 2; gap > 0; gap /= 2) {
        snprintf(buf, sizeof(buf), 
                 "[SYSTEM] Evaluasi interval gap = %d", gap);
        logger_add_entry(LOG_SYSTEM, buf, swap_count, comp_count);

        for (int i = gap; i < n; i++) {
            TicketOffer temp = arr[i];
            int j = i;

            while (j >= gap) {
                comp_count++;

                bool should_shift = false;
                if (ascending) {
                    should_shift = (arr[j - gap].price > temp.price);
                } else {
                    should_shift = (arr[j - gap].price < temp.price);
                }

                if (should_shift) {
                    arr[j] = arr[j - gap];
                    swap_count++;
                    snprintf(buf, sizeof(buf), 
                             "[SWAP] Menggeser elemen berjarak gap %d dari index [%d] ke [%d]", 
                             gap, j - gap, j);
                    logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
                    j -= gap;
                } else {
                    break;
                }
            }
            arr[j] = temp;
            snprintf(buf, sizeof(buf), 
                     "[INSERT] Menempatkan elemen pada posisi index [%d] (gap %d)", j, gap);
            logger_add_entry(LOG_SWAP, buf, swap_count, comp_count);
        }
    }

    snprintf(buf, sizeof(buf), 
             "[SUCCESS] Shell Sort selesai: %d perbandingan, %d pergeseran/swap", 
             comp_count, swap_count);
    logger_add_entry(LOG_SUCCESS, buf, swap_count, comp_count);
}

/* ============================================================================
 * 6. QUICK SORT (LOMUTO PARTITION, PIVOT = ELEMEN TERAKHIR, REKURSIF)
 * Kompleksitas: Rata-rata O(n log n), Terburuk O(n^2)
 * ============================================================================ */
static int lomuto_partition(TicketOffer arr[], int low, int high, bool ascending, int *comp_count, int *swap_count) {
    double pivot = arr[high].price;
    char buf[256];

    snprintf(buf, sizeof(buf), 
             "[PIVOT] Memilih pivot = arr[%d] (Rp %.0f) pada rentang [%d..%d]", 
             high, pivot, low, high);
    logger_add_entry(LOG_SYSTEM, buf, *swap_count, *comp_count);

    int i = low - 1;
    for (int j = low; j < high; j++) {
        (*comp_count)++;

        snprintf(buf, sizeof(buf), 
                 "[COMPARE] Membandingkan arr[%d] (Rp %.0f) dengan pivot (Rp %.0f)", 
                 j, arr[j].price, pivot);
        logger_add_entry(LOG_COMPARE, buf, *swap_count, *comp_count);

        bool should_place_left = false;
        if (ascending) {
            should_place_left = (arr[j].price < pivot);
        } else {
            should_place_left = (arr[j].price > pivot);
        }

        if (should_place_left) {
            i++;
            (*swap_count)++;
            TicketOffer temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            snprintf(buf, sizeof(buf), 
                     "[SWAP] Menukar elemen ke-%d dan ke-%d ke partisi kiri", i, j);
            logger_add_entry(LOG_SWAP, buf, *swap_count, *comp_count);
        }
    }

    /* Tukar pivot arr[high] ke posisi partisi i + 1 */
    (*swap_count)++;
    TicketOffer temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    snprintf(buf, sizeof(buf), 
             "[SWAP] Menempatkan pivot arr[%d] ke posisi partisi index [%d]", high, i + 1);
    logger_add_entry(LOG_SWAP, buf, *swap_count, *comp_count);

    return i + 1;
}

static void quick_sort_recursive(TicketOffer arr[], int low, int high, bool ascending, int *comp_count, int *swap_count) {
    if (low < high) {
        int pi = lomuto_partition(arr, low, high, ascending, comp_count, swap_count);
        quick_sort_recursive(arr, low, pi - 1, ascending, comp_count, swap_count);
        quick_sort_recursive(arr, pi + 1, high, ascending, comp_count, swap_count);
    }
}

void quick_sort(TicketOffer arr[], int n, bool ascending) {
    logger_reset();

    char buf[256];
    snprintf(buf, sizeof(buf), "[SYSTEM] Memulai Quick Sort (n=%d, %s)", 
             n, ascending ? "Harga Terendah (Ascending)" : "Harga Tertinggi (Descending)");
    logger_add_entry(LOG_SYSTEM, buf, 0, 0);

    if (n <= 1) {
        logger_add_entry(LOG_SUCCESS, "[SUCCESS] Array memiliki <= 1 elemen, tidak memerlukan pengurutan", 0, 0);
        return;
    }

    int comp_count = 0;
    int swap_count = 0;

    quick_sort_recursive(arr, 0, n - 1, ascending, &comp_count, &swap_count);

    snprintf(buf, sizeof(buf), 
             "[SUCCESS] Quick Sort selesai: %d perbandingan, %d pertukaran", 
             comp_count, swap_count);
    logger_add_entry(LOG_SUCCESS, buf, swap_count, comp_count);
}

