#include "ticket_offer.h"

/* Dataset Master Agregator TiketGO (30 Item: 6 item per kategori) */
const TicketOffer catalog[CATALOG_TOTAL_ITEMS] = {
    /* ===================== PESAWAT (6 Item) ===================== */
    {
        .id = "pesawat-1",
        .category = CAT_FLIGHT,
        .category_label = "pesawat",
        .title = "Jakarta (CGK) -> Denpasar Bali (DPS)",
        .provider = "Garuda Indonesia",
        .rating = 4.8,
        .review_count = 1420,
        .price = 1540000.0,
        .formatted_price = "Rp 1.540.000",
        .price_unit = "/ tiket",
        .details.flight = {
            .origin = "Jakarta",
            .destination = "Denpasar Bali",
            .airport_code = "CGK-DPS",
            .airline = "Garuda Indonesia",
            .seat_class = "Ekonomi Premium"
        }
    },
    {
        .id = "pesawat-2",
        .category = CAT_FLIGHT,
        .category_label = "pesawat",
        .title = "Surabaya (SUB) -> Jakarta (HLP)",
        .provider = "Batik Air",
        .rating = 4.6,
        .review_count = 980,
        .price = 890000.0,
        .formatted_price = "Rp 890.000",
        .price_unit = "/ tiket",
        .details.flight = {
            .origin = "Surabaya",
            .destination = "Jakarta",
            .airport_code = "SUB-HLP",
            .airline = "Batik Air",
            .seat_class = "Ekonomi"
        }
    },
    {
        .id = "pesawat-3",
        .category = CAT_FLIGHT,
        .category_label = "pesawat",
        .title = "Jakarta (CGK) -> Medan Kualanamu (KNO)",
        .provider = "Lion Air",
        .rating = 4.2,
        .review_count = 2150,
        .price = 1120000.0,
        .formatted_price = "Rp 1.120.000",
        .price_unit = "/ tiket",
        .details.flight = {
            .origin = "Jakarta",
            .destination = "Medan",
            .airport_code = "CGK-KNO",
            .airline = "Lion Air",
            .seat_class = "Ekonomi"
        }
    },
    {
        .id = "pesawat-4",
        .category = CAT_FLIGHT,
        .category_label = "pesawat",
        .title = "Yogyakarta (YIA) -> Balikpapan (BPN)",
        .provider = "Citilink",
        .rating = 4.7,
        .review_count = 730,
        .price = 1350000.0,
        .formatted_price = "Rp 1.350.000",
        .price_unit = "/ tiket",
        .details.flight = {
            .origin = "Yogyakarta",
            .destination = "Balikpapan",
            .airport_code = "YIA-BPN",
            .airline = "Citilink",
            .seat_class = "Ekonomi Fleksibel"
        }
    },
    {
        .id = "pesawat-5",
        .category = CAT_FLIGHT,
        .category_label = "pesawat",
        .title = "Bandung (BDO) -> Denpasar Bali (DPS)",
        .provider = "Super Air Jet",
        .rating = 4.3,
        .review_count = 640,
        .price = 780000.0,
        .formatted_price = "Rp 780.000",
        .price_unit = "/ tiket",
        .details.flight = {
            .origin = "Bandung",
            .destination = "Denpasar Bali",
            .airport_code = "BDO-DPS",
            .airline = "Super Air Jet",
            .seat_class = "Super Hemat"
        }
    },
    {
        .id = "pesawat-6",
        .category = CAT_FLIGHT,
        .category_label = "pesawat",
        .title = "Jakarta (CGK) -> Padang (PDG)",
        .provider = "Pelita Air",
        .rating = 4.7,
        .review_count = 512,
        .price = 960000.0,
        .formatted_price = "Rp 960.000",
        .price_unit = "/ tiket",
        .details.flight = {
            .origin = "Jakarta",
            .destination = "Padang",
            .airport_code = "CGK-PDG",
            .airline = "Pelita Air",
            .seat_class = "Ekonomi"
        }
    },

    /* ===================== KERETA (6 Item) ===================== */
    {
        .id = "kereta-1",
        .category = CAT_TRAIN,
        .category_label = "kereta",
        .title = "Gambir (GMR) -> Surabaya Pasarturi (SBI)",
        .provider = "KAI Argo Bromo Anggrek",
        .rating = 4.9,
        .review_count = 3120,
        .price = 640000.0,
        .formatted_price = "Rp 640.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Stasiun Gambir Jakarta",
            .destination = "Stasiun Surabaya Pasarturi",
            .operator_name = "PT Kereta Api Indonesia",
            .departure_time = "08:20 WIB",
            .seat_type = "Eksekutif Luxury"
        }
    },
    {
        .id = "kereta-2",
        .category = CAT_TRAIN,
        .category_label = "kereta",
        .title = "Gambir (GMR) -> Yogyakarta (YK)",
        .provider = "KAI Taksaka Eksekutif",
        .rating = 4.8,
        .review_count = 2480,
        .price = 450000.0,
        .formatted_price = "Rp 450.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Stasiun Gambir Jakarta",
            .destination = "Stasiun Yogyakarta",
            .operator_name = "PT Kereta Api Indonesia",
            .departure_time = "09:10 WIB",
            .seat_type = "Eksekutif Hype Trip"
        }
    },
    {
        .id = "kereta-3",
        .category = CAT_TRAIN,
        .category_label = "kereta",
        .title = "Gambir (GMR) -> Bandung (BD)",
        .provider = "KAI Argo Parahyangan",
        .rating = 4.7,
        .review_count = 1890,
        .price = 150000.0,
        .formatted_price = "Rp 150.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Stasiun Gambir Jakarta",
            .destination = "Stasiun Bandung",
            .operator_name = "PT Kereta Api Indonesia",
            .departure_time = "06:30 WIB",
            .seat_type = "Eksekutif"
        }
    },
    {
        .id = "kereta-4",
        .category = CAT_TRAIN,
        .category_label = "kereta",
        .title = "Bandung (BD) -> Surabaya Gubeng (SGU)",
        .provider = "KAI Turangga Panoramic",
        .rating = 4.8,
        .review_count = 940,
        .price = 520000.0,
        .formatted_price = "Rp 520.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Stasiun Bandung",
            .destination = "Stasiun Surabaya Gubeng",
            .operator_name = "PT Kereta Api Indonesia",
            .departure_time = "18:10 WIB",
            .seat_type = "Panoramic VIP"
        }
    },
    {
        .id = "kereta-5",
        .category = CAT_TRAIN,
        .category_label = "kereta",
        .title = "Pasar Senen (PSE) -> Malang (ML)",
        .provider = "KAI Matarmaja Ekonomi",
        .rating = 4.4,
        .review_count = 3200,
        .price = 230000.0,
        .formatted_price = "Rp 230.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Stasiun Pasar Senen",
            .destination = "Stasiun Kotabaru Malang",
            .operator_name = "PT Kereta Api Indonesia",
            .departure_time = "10:30 WIB",
            .seat_type = "Ekonomi AC"
        }
    },
    {
        .id = "kereta-6",
        .category = CAT_TRAIN,
        .category_label = "kereta",
        .title = "Solo Balapan (SLO) -> Bandung (BD)",
        .provider = "KAI Lodaya Malam",
        .rating = 4.6,
        .review_count = 1120,
        .price = 380000.0,
        .formatted_price = "Rp 380.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Stasiun Solo Balapan",
            .destination = "Stasiun Bandung",
            .operator_name = "PT Kereta Api Indonesia",
            .departure_time = "19:00 WIB",
            .seat_type = "Eksekutif"
        }
    },

    /* ===================== BUS (6 Item) ===================== */
    {
        .id = "bus-1",
        .category = CAT_BUS,
        .category_label = "bus",
        .title = "Jakarta (Pulo Gebang) -> Surabaya (Bungurasih)",
        .provider = "PO Sinar Jaya Suite Class",
        .rating = 4.7,
        .review_count = 1650,
        .price = 340000.0,
        .formatted_price = "Rp 340.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Terminal Terpadu Pulo Gebang",
            .destination = "Terminal Bungurasih Surabaya",
            .operator_name = "PO Sinar Jaya Megah Langgeng",
            .departure_time = "16:00 WIB",
            .seat_type = "Sleeper Suite 1-1"
        }
    },
    {
        .id = "bus-2",
        .category = CAT_BUS,
        .category_label = "bus",
        .title = "Jakarta (Kalideres) -> Solo (Tirtonadi)",
        .provider = "PO Rosalia Indah First Class",
        .rating = 4.8,
        .review_count = 1980,
        .price = 390000.0,
        .formatted_price = "Rp 390.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Terminal Kalideres",
            .destination = "Terminal Tirtonadi Solo",
            .operator_name = "PT Rosalia Indah Transport",
            .departure_time = "14:30 WIB",
            .seat_type = "First Class Double Decker"
        }
    },
    {
        .id = "bus-3",
        .category = CAT_BUS,
        .category_label = "bus",
        .title = "Jakarta (Lebak Bulus) -> Tulungagung",
        .provider = "PO Harapan Jaya Super VIP",
        .rating = 4.5,
        .review_count = 1220,
        .price = 280000.0,
        .formatted_price = "Rp 280.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Pool Lebak Bulus",
            .destination = "Terminal Gayatri Tulungagung",
            .operator_name = "PO Harapan Jaya",
            .departure_time = "13:00 WIB",
            .seat_type = "Super VIP 2-2"
        }
    },
    {
        .id = "bus-4",
        .category = CAT_BUS,
        .category_label = "bus",
        .title = "Malang (Arjosari) -> Denpasar Bali (Mengwi)",
        .provider = "PO Gunung Harta Transport Green",
        .rating = 4.8,
        .review_count = 890,
        .price = 310000.0,
        .formatted_price = "Rp 310.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Terminal Arjosari Malang",
            .destination = "Terminal Mengwi Badung Bali",
            .operator_name = "PO Gunung Harta Transport Solutions",
            .departure_time = "15:30 WIB",
            .seat_type = "Executive Scania"
        }
    },
    {
        .id = "bus-5",
        .category = CAT_BUS,
        .category_label = "bus",
        .title = "Jakarta (Kampung Rambutan) -> Malang",
        .provider = "PO Juragan 99 Sleeper Luxury",
        .rating = 4.9,
        .review_count = 1420,
        .price = 450000.0,
        .formatted_price = "Rp 450.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Terminal Kampung Rambutan",
            .destination = "Garasi Juragan 99 Malang",
            .operator_name = "PO Juragan 99 Trans",
            .departure_time = "17:00 WIB",
            .seat_type = "Dream Class Individual Pod"
        }
    },
    {
        .id = "bus-6",
        .category = CAT_BUS,
        .category_label = "bus",
        .title = "Yogyakarta (Giwangan) -> Cilacap",
        .provider = "PO Efisiensi Executive Shuttle",
        .rating = 4.6,
        .review_count = 670,
        .price = 120000.0,
        .formatted_price = "Rp 120.000",
        .price_unit = "/ tiket",
        .details.transport = {
            .origin = "Terminal Giwangan Yogyakarta",
            .destination = "Terminal Bangga Mbangun Desa Cilacap",
            .operator_name = "PO Efisiensi Transport",
            .departure_time = "07:00 WIB",
            .seat_type = "Executive Shuttle 2-2"
        }
    },

    /* ===================== HOTEL (6 Item) ===================== */
    {
        .id = "hotel-1",
        .category = CAT_HOTEL,
        .category_label = "hotel",
        .title = "The Mulia Resort & Villas",
        .provider = "Kawasan Pariwisata Nusa Dua, Bali",
        .rating = 4.9,
        .review_count = 2450,
        .price = 2850000.0,
        .formatted_price = "Rp 2.850.000",
        .price_unit = "/ malam",
        .details.hotel = {
            .property_name = "The Mulia, Mulia Resort & Villas",
            .location = "Nusa Dua, Bali",
            .star_rating = 5.0,
            .nights = 1
        }
    },
    {
        .id = "hotel-2",
        .category = CAT_HOTEL,
        .category_label = "hotel",
        .title = "Hotel Indonesia Kempinski Jakarta",
        .provider = "MH Thamrin No. 1, Jakarta Pusat",
        .rating = 4.8,
        .review_count = 3100,
        .price = 2450000.0,
        .formatted_price = "Rp 2.450.000",
        .price_unit = "/ malam",
        .details.hotel = {
            .property_name = "Hotel Indonesia Kempinski",
            .location = "Bundaran HI, Jakarta Pusat",
            .star_rating = 5.0,
            .nights = 1
        }
    },
    {
        .id = "hotel-3",
        .category = CAT_HOTEL,
        .category_label = "hotel",
        .title = "Tentrem Hotel Yogyakarta",
        .provider = "Jl. AM. Sangaji No. 72, Jetis, Yogyakarta",
        .rating = 4.9,
        .review_count = 1890,
        .price = 1350000.0,
        .formatted_price = "Rp 1.350.000",
        .price_unit = "/ malam",
        .details.hotel = {
            .property_name = "Hotel Tentrem Yogyakarta",
            .location = "Jetis, Kota Yogyakarta",
            .star_rating = 5.0,
            .nights = 1
        }
    },
    {
        .id = "hotel-4",
        .category = CAT_HOTEL,
        .category_label = "hotel",
        .title = "Padma Hotel Bandung",
        .provider = "Jl. Rancabentang No. 56, Ciumbuleuit, Bandung",
        .rating = 4.8,
        .review_count = 2210,
        .price = 1780000.0,
        .formatted_price = "Rp 1.780.000",
        .price_unit = "/ malam",
        .details.hotel = {
            .property_name = "Padma Hotel Bandung",
            .location = "Ciumbuleuit, Bandung",
            .star_rating = 5.0,
            .nights = 1
        }
    },
    {
        .id = "hotel-5",
        .category = CAT_HOTEL,
        .category_label = "hotel",
        .title = "Plataran Heritage Borobudur",
        .provider = "Dusun Kretek, Karangrejo, Magelang",
        .rating = 4.7,
        .review_count = 940,
        .price = 1950000.0,
        .formatted_price = "Rp 1.950.000",
        .price_unit = "/ malam",
        .details.hotel = {
            .property_name = "Plataran Heritage Borobudur Hotel",
            .location = "Borobudur, Magelang, Jawa Tengah",
            .star_rating = 5.0,
            .nights = 1
        }
    },
    {
        .id = "hotel-6",
        .category = CAT_HOTEL,
        .category_label = "hotel",
        .title = "Vasa Hotel Surabaya",
        .provider = "Jl. HR. Muhammad No. 31, Sukomanunggal, Surabaya",
        .rating = 4.7,
        .review_count = 1340,
        .price = 1150000.0,
        .formatted_price = "Rp 1.150.000",
        .price_unit = "/ malam",
        .details.hotel = {
            .property_name = "Vasa Hotel Surabaya",
            .location = "HR Muhammad, Surabaya",
            .star_rating = 5.0,
            .nights = 1
        }
    },

    /* ===================== BIOSKOP (6 Item) ===================== */
    {
        .id = "bioskop-1",
        .category = CAT_CINEMA,
        .category_label = "bioskop",
        .title = "Dune: Part Two (The Premiere)",
        .provider = "XXI Premiere Plaza Indonesia, Jakarta Pusat",
        .rating = 4.9,
        .review_count = 850,
        .price = 100000.0,
        .formatted_price = "Rp 100.000",
        .price_unit = "/ kursi",
        .details.cinema = {
            .movie_title = "Dune: Part Two",
            .showtime = "19:00 WIB",
            .studio = "Premiere 1",
            .screen_format = "The Premiere Luxury"
        }
    },
    {
        .id = "bioskop-2",
        .category = CAT_CINEMA,
        .category_label = "bioskop",
        .title = "Godzilla x Kong: The New Empire (Velvet)",
        .provider = "CGV Velvet Class Grand Indonesia",
        .rating = 4.8,
        .review_count = 670,
        .price = 120000.0,
        .formatted_price = "Rp 120.000",
        .price_unit = "/ kursi",
        .details.cinema = {
            .movie_title = "Godzilla x Kong: The New Empire",
            .showtime = "20:30 WIB",
            .studio = "Velvet Suite 2",
            .screen_format = "CGV Velvet Bed Class"
        }
    },
    {
        .id = "bioskop-3",
        .category = CAT_CINEMA,
        .category_label = "bioskop",
        .title = "Oppenheimer Special Screening (VIP)",
        .provider = "Cinepolis VIP Pejaten Village, Jakarta Selatan",
        .rating = 4.8,
        .review_count = 920,
        .price = 75000.0,
        .formatted_price = "Rp 75.000",
        .price_unit = "/ kursi",
        .details.cinema = {
            .movie_title = "Oppenheimer",
            .showtime = "18:45 WIB",
            .studio = "VIP Audi 1",
            .screen_format = "Cinepolis VIP Recliner"
        }
    },
    {
        .id = "bioskop-4",
        .category = CAT_CINEMA,
        .category_label = "bioskop",
        .title = "Deadpool & Wolverine (IMAX 3D)",
        .provider = "XXI IMAX Gandaria City, Jakarta Selatan",
        .rating = 4.9,
        .review_count = 1420,
        .price = 65000.0,
        .formatted_price = "Rp 65.000",
        .price_unit = "/ kursi",
        .details.cinema = {
            .movie_title = "Deadpool & Wolverine",
            .showtime = "21:15 WIB",
            .studio = "IMAX Theater",
            .screen_format = "IMAX 3D Laser"
        }
    },
    {
        .id = "bioskop-5",
        .category = CAT_CINEMA,
        .category_label = "bioskop",
        .title = "Interstellar 10th Anniversary (Deluxe)",
        .provider = "XXI Deluxe Tunjungan Plaza 5, Surabaya",
        .rating = 4.7,
        .review_count = 530,
        .price = 50000.0,
        .formatted_price = "Rp 50.000",
        .price_unit = "/ kursi",
        .details.cinema = {
            .movie_title = "Interstellar",
            .showtime = "16:00 WIB",
            .studio = "Studio 3",
            .screen_format = "Deluxe Dolby Atmos"
        }
    },
    {
        .id = "bioskop-6",
        .category = CAT_CINEMA,
        .category_label = "bioskop",
        .title = "Spirited Away Studio Ghibli Fest (4DX)",
        .provider = "CGV 4DX Paris Van Java, Bandung",
        .rating = 4.8,
        .review_count = 780,
        .price = 85000.0,
        .formatted_price = "Rp 85.000",
        .price_unit = "/ kursi",
        .details.cinema = {
            .movie_title = "Spirited Away",
            .showtime = "14:15 WIB",
            .studio = "4DX Audi 1",
            .screen_format = "CGV 4DX Motion & Wind"
        }
    }
};

int catalog_get_total(void) {
    return CATALOG_TOTAL_ITEMS;
}
