#ifndef TICKET_OFFER_H
#define TICKET_OFFER_H

#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

/* ============================================================================
 * ENUM KATEGORI TIKET
 * CAT_ALL    : Semua kategori (tanpa filter)
 * CAT_FLIGHT : Tiket Pesawat Terbang
 * CAT_TRAIN  : Tiket Kereta Api
 * CAT_BUS    : Tiket Bus Antarkota
 * CAT_HOTEL  : Reservasi Hotel & Resort
 * CAT_CINEMA : Tiket Bioskop & Cinema XXI/CGV
 * ============================================================================ */
typedef enum {
    CAT_ALL = 0,
    CAT_FLIGHT = 1,
    CAT_TRAIN = 2,
    CAT_BUS = 3,
    CAT_HOTEL = 4,
    CAT_CINEMA = 5
} CategoryType;

/* ============================================================================
 * STRUCT DETAIL SPESIFIK TIAP KATEGORI (UNTUK ANGGOTA UNION)
 * ============================================================================ */

/* Detail Tiket Pesawat */
typedef struct {
    char origin[64];
    char destination[64];
    char airport_code[16];   /* Misal: "CGK-DPS" */
    char airline[64];
    char seat_class[32];     /* Misal: "Ekonomi", "Bisnis" */
} FlightDetails;

/* Detail Tiket Kereta & Bus (Digunakan bersama oleh CAT_TRAIN & CAT_BUS) */
typedef struct {
    char origin[64];
    char destination[64];
    char operator_name[64];  /* Misal: "KAI Argo Bromo", "PO Sinar Jaya" */
    char departure_time[16]; /* Misal: "08:00 WIB" */
    char seat_type[32];      /* Misal: "Eksekutif", "Suite Class" */
} TrainBusDetails;

/* Detail Reservasi Hotel */
typedef struct {
    char property_name[64];
    char location[128];
    double star_rating;      /* Misal: 4.8, 5.0 */
    int nights;              /* Misal: 1 */
} HotelDetails;

/* Detail Tiket Bioskop */
typedef struct {
    char movie_title[128];
    char showtime[16];       /* Misal: "19:30 WIB" */
    char studio[32];         /* Misal: "Studio 1", "Audi 2" */
    char screen_format[32];  /* Misal: "Reguler 2D", "IMAX 3D", "Velvet" */
} CinemaDetails;

/* Union yang menampung variasi detail berdasarkan kategori */
typedef union {
    FlightDetails flight;
    TrainBusDetails transport; /* Bersama untuk CAT_TRAIN dan CAT_BUS */
    HotelDetails hotel;
    CinemaDetails cinema;
} CategorySpecificDetails;

/* ============================================================================
 * STRUCT UTAMA TICKET OFFER
 * ============================================================================ */
typedef struct {
    char id[32];                     /* ID unik: misal "pesawat-1" */
    CategoryType category;           /* Enum kategori */
    char category_label[32];         /* String label: "pesawat", "kereta", dst */
    char title[128];                 /* Judul rute/item */
    char provider[128];              /* Nama maskapai / operator / hotel */
    double rating;                   /* Rating (0.0 - 5.0) */
    int review_count;                /* Jumlah ulasan */
    double price;                    /* Nilai numerik harga (kunci pengurutan) */
    char formatted_price[64];        /* String tampilan harga: "Rp 1.540.000" */
    char price_unit[32];             /* Satuan: "/ tiket", "/ malam", "/ kursi" */
    CategorySpecificDetails details; /* Union detail spesifik */
} TicketOffer;

/* ============================================================================
 * STRUKTUR DATA LOGGING (PENILAIAN STRUKTUR DATA)
 * ============================================================================ */
typedef enum {
    LOG_SYSTEM = 0,     /* Inisialisasi / info sistem */
    LOG_COMPARE = 1,    /* Langkah perbandingan nilai harga */
    LOG_SWAP = 2,       /* Langkah pertukaran elemen struct */
    LOG_CHECK = 3,      /* Langkah pemeriksaan linear search */
    LOG_SUCCESS = 4,    /* Pengurutan/pencarian tuntas sukses */
    LOG_NOT_FOUND = 5   /* Data tidak ditemukan */
} LogLevel;

#define MAX_LOG_ENTRIES 1000

typedef struct {
    LogLevel level;
    char message[256];
    int swap_count;
    int comparison_count;
} AlgorithmLogEntry;

/* ============================================================================
 * PROTOTIPE FUNGSI LOGGER
 * ============================================================================ */
void logger_reset(void);
void logger_add_entry(LogLevel level, const char *message, int swap_count, int comparison_count);
int logger_get_count(void);
const AlgorithmLogEntry *logger_get_entry(int index);

/* ============================================================================
 * PROTOTIPE ALGORITMA SORTING MANUAL
 * ============================================================================ */
void bubble_sort(TicketOffer arr[], int n, bool ascending);
void selection_sort(TicketOffer arr[], int n, bool ascending);
void exchange_sort(TicketOffer arr[], int n, bool ascending);
void insertion_sort(TicketOffer arr[], int n, bool ascending);
void shell_sort(TicketOffer arr[], int n, bool ascending);
void quick_sort(TicketOffer arr[], int n, bool ascending);

/* ============================================================================
 * PROTOTIPE ALGORITMA SEARCHING MANUAL (TANPA strstr)
 * ============================================================================ */
bool contains_ignore_case(const char *haystack, const char *needle);
void linear_search(const TicketOffer arr[], int n, const char *keyword, 
                   CategoryType filter, TicketOffer results[], int *result_count);
void binary_search(TicketOffer arr[], int n, const char *keyword, 
                   CategoryType filter, TicketOffer results[], int *result_count);

/* ============================================================================
 * DATASET MASTER
 * ============================================================================ */
#define CATALOG_TOTAL_ITEMS 30
extern const TicketOffer catalog[CATALOG_TOTAL_ITEMS];
int catalog_get_total(void);

#ifdef __cplusplus
}
#endif

#endif /* TICKET_OFFER_H */
