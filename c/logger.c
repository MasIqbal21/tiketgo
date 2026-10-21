#include "ticket_offer.h"

/* Buffer statis pencatat log operasi algoritma */
static AlgorithmLogEntry log_history[MAX_LOG_ENTRIES];
static int log_count = 0;

void logger_reset(void) {
    log_count = 0;
}

void logger_add_entry(LogLevel level, const char *message, int swap_count, int comparison_count) {
    if (log_count >= MAX_LOG_ENTRIES) {
        return; /* Menghindari buffer overflow */
    }

    AlgorithmLogEntry *entry = &log_history[log_count];
    entry->level = level;
    entry->swap_count = swap_count;
    entry->comparison_count = comparison_count;

    /* Salin pesan secara manual tanpa bergantung ke buffer tak aman */
    int i = 0;
    if (message != 0) {
        while (message[i] != '\0' && i < 255) {
            entry->message[i] = message[i];
            i++;
        }
    }
    entry->message[i] = '\0';

    log_count++;
}

int logger_get_count(void) {
    return log_count;
}

const AlgorithmLogEntry *logger_get_entry(int index) {
    if (index < 0 || index >= log_count) {
        return 0; /* Null pointer jika di luar batas */
    }
    return &log_history[index];
}
