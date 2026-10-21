/**
 * TiketGO — Wireframe UI Statis & Skeleton Proyek
 * UTS Struktur Data · PTI Smt 3
 * 
 * Tahap 3: Interaktivitas Panel Visualisasi Algoritma & Fitur Pencarian
 * - Tab "Semua" untuk melihat katalog agregat lengkap
 * - Autocomplete saran pencarian unik & navigasi keyboard
 * - Perluasan opsi Urutkan (Harga, Rating, Jam Keberangkatan)
 * - Penyesuaian simulasi Bubble Sort & Linear Search
 */

// ============================================================================
// 1. DATA DUMMY TIKET (30 ITEM: 6 DATA PER KATEGORI + FIELD JAM KEBERANGKATAN)
// ============================================================================
const TICKETS_DATA = [
  // --- PESAWAT (6 Data) ---
  {
    id: "pesawat-1",
    category: "pesawat",
    title: "Jakarta (CGK) → Denpasar Bali (DPS)",
    provider: "Garuda Indonesia",
    departure_time: "07:30",
    extra_info: "07:30 WIB · Ekonomi Premium",
    rating: 4.8,
    review_count: 1420,
    price: 1540000,
    formatted_price: "Rp 1.540.000",
    price_unit: "/ tiket",
  },
  {
    id: "pesawat-2",
    category: "pesawat",
    title: "Surabaya (SUB) → Jakarta (HLP)",
    provider: "Batik Air",
    departure_time: "09:45",
    extra_info: "09:45 WIB · Ekonomi",
    rating: 4.6,
    review_count: 980,
    price: 890000,
    formatted_price: "Rp 890.000",
    price_unit: "/ tiket",
  },
  {
    id: "pesawat-3",
    category: "pesawat",
    title: "Jakarta (CGK) → Medan Kualanamu (KNO)",
    provider: "Lion Air",
    departure_time: "11:15",
    extra_info: "11:15 WIB · Ekonomi",
    rating: 4.2,
    review_count: 2150,
    price: 1120000,
    formatted_price: "Rp 1.120.000",
    price_unit: "/ tiket",
  },
  {
    id: "pesawat-4",
    category: "pesawat",
    title: "Yogyakarta (YIA) → Balikpapan (BPN)",
    provider: "Citilink",
    departure_time: "13:20",
    extra_info: "13:20 WIB · Fleksibel",
    rating: 4.7,
    review_count: 730,
    price: 1350000,
    formatted_price: "Rp 1.350.000",
    price_unit: "/ tiket",
  },
  {
    id: "pesawat-5",
    category: "pesawat",
    title: "Bandung (BDO) → Denpasar Bali (DPS)",
    provider: "Super Air Jet",
    departure_time: "16:00",
    extra_info: "16:00 WIB · Super Hemat",
    rating: 4.3,
    review_count: 640,
    price: 780000,
    formatted_price: "Rp 780.000",
    price_unit: "/ tiket",
  },
  {
    id: "pesawat-6",
    category: "pesawat",
    title: "Jakarta (CGK) → Padang (PDG)",
    provider: "Pelita Air",
    departure_time: "18:30",
    extra_info: "18:30 WIB · Reguler",
    rating: 4.7,
    review_count: 512,
    price: 960000,
    formatted_price: "Rp 960.000",
    price_unit: "/ tiket",
  },

  // --- KERETA (6 Data) ---
  {
    id: "kereta-1",
    category: "kereta",
    title: "Gambir (GMR) → Surabaya Pasarturi (SBI)",
    provider: "KAI Argo Bromo Anggrek",
    departure_time: "08:20",
    extra_info: "08:20 WIB · Eksekutif Luxury",
    rating: 4.9,
    review_count: 3120,
    price: 640000,
    formatted_price: "Rp 640.000",
    price_unit: "/ tiket",
  },
  {
    id: "kereta-2",
    category: "kereta",
    title: "Gambir (GMR) → Yogyakarta (YK)",
    provider: "KAI Taksaka Eksekutif",
    departure_time: "09:10",
    extra_info: "09:10 WIB · Hype Trip",
    rating: 4.8,
    review_count: 2480,
    price: 450000,
    formatted_price: "Rp 450.000",
    price_unit: "/ tiket",
  },
  {
    id: "kereta-3",
    category: "kereta",
    title: "Gambir (GMR) → Bandung (BD)",
    provider: "KAI Argo Parahyangan",
    departure_time: "06:30",
    extra_info: "06:30 WIB · Eksekutif",
    rating: 4.7,
    review_count: 1890,
    price: 150000,
    formatted_price: "Rp 150.000",
    price_unit: "/ tiket",
  },
  {
    id: "kereta-4",
    category: "kereta",
    title: "Bandung (BD) → Surabaya Gubeng (SGU)",
    provider: "KAI Turangga Panoramic",
    departure_time: "18:10",
    extra_info: "18:10 WIB · Panoramic VIP",
    rating: 4.8,
    review_count: 940,
    price: 520000,
    formatted_price: "Rp 520.000",
    price_unit: "/ tiket",
  },
  {
    id: "kereta-5",
    category: "kereta",
    title: "Pasar Senen (PSE) → Malang (ML)",
    provider: "KAI Matarmaja Ekonomi",
    departure_time: "10:30",
    extra_info: "10:30 WIB · Ekonomi AC",
    rating: 4.4,
    review_count: 3200,
    price: 230000,
    formatted_price: "Rp 230.000",
    price_unit: "/ tiket",
  },
  {
    id: "kereta-6",
    category: "kereta",
    title: "Solo Balapan (SLO) → Bandung (BD)",
    provider: "KAI Lodaya Malam",
    departure_time: "19:00",
    extra_info: "19:00 WIB · Eksekutif",
    rating: 4.6,
    review_count: 1120,
    price: 380000,
    formatted_price: "Rp 380.000",
    price_unit: "/ tiket",
  },

  // --- BUS (6 Data) ---
  {
    id: "bus-1",
    category: "bus",
    title: "Jakarta (Pulo Gebang) → Surabaya (Bungurasih)",
    provider: "PO Sinar Jaya Suite Class",
    departure_time: "16:00",
    extra_info: "16:00 WIB · Sleeper Pod 1-1",
    rating: 4.7,
    review_count: 1650,
    price: 340000,
    formatted_price: "Rp 340.000",
    price_unit: "/ tiket",
  },
  {
    id: "bus-2",
    category: "bus",
    title: "Jakarta (Kalideres) → Solo (Tirtonadi)",
    provider: "PO Rosalia Indah First Class",
    departure_time: "14:30",
    extra_info: "14:30 WIB · Double Decker",
    rating: 4.8,
    review_count: 1980,
    price: 390000,
    formatted_price: "Rp 390.000",
    price_unit: "/ tiket",
  },
  {
    id: "bus-3",
    category: "bus",
    title: "Jakarta (Lebak Bulus) → Tulungagung",
    provider: "PO Harapan Jaya Super VIP",
    departure_time: "13:00",
    extra_info: "13:00 WIB · Super VIP 2-2",
    rating: 4.5,
    review_count: 1220,
    price: 280000,
    formatted_price: "Rp 280.000",
    price_unit: "/ tiket",
  },
  {
    id: "bus-4",
    category: "bus",
    title: "Malang (Arjosari) → Denpasar Bali (Mengwi)",
    provider: "PO Gunung Harta Green",
    departure_time: "15:30",
    extra_info: "15:30 WIB · Executive Scania",
    rating: 4.8,
    review_count: 890,
    price: 310000,
    formatted_price: "Rp 310.000",
    price_unit: "/ tiket",
  },
  {
    id: "bus-5",
    category: "bus",
    title: "Jakarta (Kampung Rambutan) → Malang",
    provider: "PO Juragan 99 Sleeper",
    departure_time: "17:00",
    extra_info: "17:00 WIB · Dream Class Pod",
    rating: 4.9,
    review_count: 1420,
    price: 450000,
    formatted_price: "Rp 450.000",
    price_unit: "/ tiket",
  },
  {
    id: "bus-6",
    category: "bus",
    title: "Yogyakarta (Giwangan) → Cilacap",
    provider: "PO Efisiensi Shuttle",
    departure_time: "07:00",
    extra_info: "07:00 WIB · Executive Shuttle",
    rating: 4.6,
    review_count: 670,
    price: 120000,
    formatted_price: "Rp 120.000",
    price_unit: "/ tiket",
  },

  // --- HOTEL (6 Data) ---
  {
    id: "hotel-1",
    category: "hotel",
    title: "The Mulia Resort & Villas",
    provider: "Nusa Dua, Bali",
    departure_time: null,
    extra_info: "1 malam · 2 tamu",
    rating: 4.9,
    review_count: 2450,
    price: 2850000,
    formatted_price: "Rp 2.850.000",
    price_unit: "/ malam",
  },
  {
    id: "hotel-2",
    category: "hotel",
    title: "Hotel Indonesia Kempinski Jakarta",
    provider: "Bundaran HI, Jakarta",
    departure_time: null,
    extra_info: "1 malam · Deluxe Room",
    rating: 4.8,
    review_count: 3100,
    price: 2450000,
    formatted_price: "Rp 2.450.000",
    price_unit: "/ malam",
  },
  {
    id: "hotel-3",
    category: "hotel",
    title: "Tentrem Hotel Yogyakarta",
    provider: "Jetis, Yogyakarta",
    departure_time: null,
    extra_info: "1 malam · Premier Room",
    rating: 4.9,
    review_count: 1890,
    price: 1350000,
    formatted_price: "Rp 1.350.000",
    price_unit: "/ malam",
  },
  {
    id: "hotel-4",
    category: "hotel",
    title: "Padma Hotel Bandung",
    provider: "Ciumbuleuit, Bandung",
    departure_time: null,
    extra_info: "1 malam · Mountain View",
    rating: 4.8,
    review_count: 2210,
    price: 1780000,
    formatted_price: "Rp 1.780.000",
    price_unit: "/ malam",
  },
  {
    id: "hotel-5",
    category: "hotel",
    title: "Plataran Heritage Borobudur",
    provider: "Borobudur, Magelang",
    departure_time: null,
    extra_info: "1 malam · Heritage Suite",
    rating: 4.7,
    review_count: 940,
    price: 1950000,
    formatted_price: "Rp 1.950.000",
    price_unit: "/ malam",
  },
  {
    id: "hotel-6",
    category: "hotel",
    title: "Vasa Hotel Surabaya",
    provider: "Sukomanunggal, Surabaya",
    departure_time: null,
    extra_info: "1 malam · City View",
    rating: 4.7,
    review_count: 1340,
    price: 1150000,
    formatted_price: "Rp 1.150.000",
    price_unit: "/ malam",
  },

  // --- BIOSKOP (6 Data) ---
  {
    id: "bioskop-1",
    category: "bioskop",
    title: "Dune: Part Two (The Premiere)",
    provider: "XXI Plaza Indonesia",
    departure_time: null,
    extra_info: "Studio 1, 19:00 WIB",
    rating: 4.9,
    review_count: 850,
    price: 100000,
    formatted_price: "Rp 100.000",
    price_unit: "/ kursi",
  },
  {
    id: "bioskop-2",
    category: "bioskop",
    title: "Godzilla x Kong: The New Empire (Velvet)",
    provider: "CGV Grand Indonesia",
    departure_time: null,
    extra_info: "Velvet 2, 20:30 WIB",
    rating: 4.8,
    review_count: 670,
    price: 120000,
    formatted_price: "Rp 120.000",
    price_unit: "/ kursi",
  },
  {
    id: "bioskop-3",
    category: "bioskop",
    title: "Oppenheimer Special Screening (VIP)",
    provider: "Cinepolis Pejaten",
    departure_time: null,
    extra_info: "VIP Audi 1, 18:45 WIB",
    rating: 4.8,
    review_count: 920,
    price: 75000,
    formatted_price: "Rp 75.000",
    price_unit: "/ kursi",
  },
  {
    id: "bioskop-4",
    category: "bioskop",
    title: "Deadpool & Wolverine (IMAX 3D)",
    provider: "XXI Gandaria City",
    departure_time: null,
    extra_info: "IMAX, 21:15 WIB",
    rating: 4.9,
    review_count: 1420,
    price: 65000,
    formatted_price: "Rp 65.000",
    price_unit: "/ kursi",
  },
  {
    id: "bioskop-5",
    category: "bioskop",
    title: "Interstellar 10th Anniversary (Deluxe)",
    provider: "XXI Tunjungan Plaza 5",
    departure_time: null,
    extra_info: "Studio 3, 16:00 WIB",
    rating: 4.7,
    review_count: 530,
    price: 50000,
    formatted_price: "Rp 50.000",
    price_unit: "/ kursi",
  },
  {
    id: "bioskop-6",
    category: "bioskop",
    title: "Spirited Away Studio Ghibli Fest (4DX)",
    provider: "CGV Paris Van Java",
    departure_time: null,
    extra_info: "4DX Audi 1, 14:15 WIB",
    rating: 4.8,
    review_count: 780,
    price: 85000,
    formatted_price: "Rp 85.000",
    price_unit: "/ kursi",
  },
];

// Lookup map O(1) untuk penggabungan detail item hasil sortir/pencarian WASM
const TICKETS_MAP = new Map(TICKETS_DATA.map((t) => [t.id, t]));

// Pemetaan nama kategori ke ID integer enum C (CategoryType di c/ticket_offer.h)
// 0=Semua, 1=Pesawat, 2=Kereta, 3=Bus, 4=Hotel, 5=Bioskop
function getCategoryId(category) {
  switch (category) {
    case "pesawat": return 1;
    case "kereta": return 2;
    case "bus": return 3;
    case "hotel": return 4;
    case "bioskop": return 5;
    default: return 0; // "semua"
  }
}

// Judul header per kategori
const CATEGORY_TITLES = {
  semua: "Semua Tiket & Penawaran",
  pesawat: "Tiket Pesawat Terbang",
  kereta: "Tiket Kereta Api Antarkota",
  bus: "Tiket Bus & Shuttle Antarkota",
  hotel: "Pemesanan Hotel & Resort",
  bioskop: "Tiket Bioskop & Cinema XXI/CGV",
};

// SVG Icon per kategori
function getCategoryIconSvg(category) {
  switch (category) {
    case "semua":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/></svg>`;
    case "pesawat":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg>`;
    case "kereta":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>`;
    case "bus":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>`;
    case "hotel":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h12"/><path d="M6 14h12"/><path d="M6 10h12"/><path d="M6 6h12"/><path d="M10 22v-4h4v4"/><rect width="16" height="20" x="4" y="2" rx="2"/></svg>`;
    case "bioskop":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="3" rx="2"/><polyline points="2 7 6 7 6 3"/><polyline points="10 3 10 7 14 7 14 3"/><polyline points="18 3 18 7 22 7"/><polygon points="10 11 15 13.5 10 16 10 11"/><path d="m4 21 2-3"/><path d="m20 21-2-3"/><path d="M9 21h6"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

// ============================================================================
// 2. STATE APLIKASI & MANAJEMEN ANIMASI
// ============================================================================
let currentCategory = "semua";
let searchKeyword = "";
let currentSortMode = "rekomendasi";
let currentSortAlgo = "bubble";
let currentSearchAlgo = "linear";
let simulationSpeed = 1.0; // 0.5x, 1x, 2x, 4x, 50x, 100x
let isVisualizerVisible = true;

// Array tiket yang saat ini sedang aktif ditampilkan di kolom kiri
let currentlyDisplayedTickets = [];

// Antrean timer simulasi
let activeTimeouts = [];

function cancelRunningAnimations() {
  activeTimeouts.forEach((t) => clearTimeout(t));
  activeTimeouts = [];
}

function queueTimeout(callback, delay) {
  const t = setTimeout(callback, delay);
  activeTimeouts.push(t);
  return t;
}

function setSimulationSpeed(speed) {
  simulationSpeed = parseFloat(speed) || 1.0;

  document.querySelectorAll(".btn-speed").forEach((btn) => {
    const s = parseFloat(btn.getAttribute("data-speed"));
    btn.classList.toggle("active", s === simulationSpeed);
  });

  // Jika simulasi sedang berjalan, restart dengan kecepatan baru seketika
  if (activeTimeouts.length > 0) {
    const isSortingActive = document.getElementById("panel-algo-sorting")?.classList.contains("active");
    if (isSortingActive && currentSortMode && currentSortMode !== "rekomendasi") {
      runProgressiveSortSimulation(currentSortMode);
    } else if (!isSortingActive && searchKeyword && searchKeyword.trim() !== "") {
      runProgressiveSearchSimulation(searchKeyword);
    }
  }
}

// Mengambil basis item data sesuai kategori aktif
function getCategoryBaseItems() {
  if (currentCategory === "semua") {
    return [...TICKETS_DATA];
  }
  return TICKETS_DATA.filter((item) => item.category === currentCategory);
}

// ============================================================================
// 3. AUTOCOMPLETE / SARAN PENCARIAN
// ============================================================================

// Basis data entitas kata kunci unik untuk saran pencarian
const AUTOCOMPLETE_POOL = [
  // Kota Asal & Tujuan
  { text: "Jakarta", tag: "Kota" },
  { text: "Denpasar Bali", tag: "Destinasi" },
  { text: "Surabaya", tag: "Kota" },
  { text: "Medan", tag: "Kota" },
  { text: "Yogyakarta", tag: "Kota" },
  { text: "Balikpapan", tag: "Kota" },
  { text: "Bandung", tag: "Kota" },
  { text: "Padang", tag: "Kota" },
  { text: "Solo", tag: "Kota" },
  { text: "Malang", tag: "Kota" },
  { text: "Tulungagung", tag: "Kota" },
  { text: "Cilacap", tag: "Kota" },
  // Maskapai / Operator / Provider
  { text: "Garuda Indonesia", tag: "Maskapai" },
  { text: "Batik Air", tag: "Maskapai" },
  { text: "Lion Air", tag: "Maskapai" },
  { text: "Citilink", tag: "Maskapai" },
  { text: "Super Air Jet", tag: "Maskapai" },
  { text: "Pelita Air", tag: "Maskapai" },
  { text: "KAI Argo Bromo Anggrek", tag: "Kereta" },
  { text: "KAI Taksaka", tag: "Kereta" },
  { text: "KAI Argo Parahyangan", tag: "Kereta" },
  { text: "KAI Turangga", tag: "Kereta" },
  { text: "PO Sinar Jaya", tag: "Bus" },
  { text: "PO Rosalia Indah", tag: "Bus" },
  { text: "PO Harapan Jaya", tag: "Bus" },
  { text: "PO Gunung Harta", tag: "Bus" },
  { text: "PO Juragan 99", tag: "Bus" },
  { text: "PO Efisiensi", tag: "Bus" },
  { text: "XXI Premiere", tag: "Bioskop" },
  { text: "CGV Cinemas", tag: "Bioskop" },
  { text: "Cinepolis VIP", tag: "Bioskop" },
  // Hotel Properties
  { text: "The Mulia Resort", tag: "Hotel" },
  { text: "Hotel Indonesia Kempinski", tag: "Hotel" },
  { text: "Tentrem Hotel", tag: "Hotel" },
  { text: "Padma Hotel", tag: "Hotel" },
  { text: "Plataran Heritage", tag: "Hotel" },
  { text: "Vasa Hotel", tag: "Hotel" },
  // Film Bioskop
  { text: "Dune: Part Two", tag: "Film" },
  { text: "Godzilla x Kong", tag: "Film" },
  { text: "Oppenheimer", tag: "Film" },
  { text: "Deadpool & Wolverine", tag: "Film" },
  { text: "Interstellar", tag: "Film" },
  { text: "Spirited Away", tag: "Film" }
];

let activeSuggestionIndex = -1;

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return escapeHtml(text);
  const before = text.substring(0, idx);
  const match = text.substring(idx, idx + query.length);
  const after = text.substring(idx + query.length);
  return `${escapeHtml(before)}<span class="suggestion-highlight">${escapeHtml(match)}</span>${escapeHtml(after)}`;
}

function updateAutocompleteSuggestions(query) {
  const suggestionsBox = document.getElementById("search-suggestions");
  if (!suggestionsBox) return;

  const trimmed = (query || "").trim().toLowerCase();
  if (trimmed === "") {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
    activeSuggestionIndex = -1;
    return;
  }

  // Filter saran yang diawali atau mengandung query
  const matches = AUTOCOMPLETE_POOL.filter((item) =>
    item.text.toLowerCase().includes(trimmed)
  );

  // Urutkan: prioritas yang diawali kata kunci, lalu alfabetis
  matches.sort((a, b) => {
    const aStarts = a.text.toLowerCase().startsWith(trimmed);
    const bStarts = b.text.toLowerCase().startsWith(trimmed);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return a.text.localeCompare(b.text);
  });

  // Hapus duplikat teks & batasi maksimal 6 item
  const uniqueMap = new Map();
  matches.forEach((m) => {
    if (!uniqueMap.has(m.text.toLowerCase())) {
      uniqueMap.set(m.text.toLowerCase(), m);
    }
  });

  const topSuggestions = Array.from(uniqueMap.values()).slice(0, 6);

  if (topSuggestions.length === 0) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
    activeSuggestionIndex = -1;
    return;
  }

  let html = "";
  topSuggestions.forEach((item, index) => {
    html += `
      <div class="suggestion-item" data-value="${escapeHtml(item.text)}" data-index="${index}" role="option">
        <div class="suggestion-left">
          <svg class="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span class="suggestion-text">${highlightMatch(item.text, trimmed)}</span>
        </div>
        <span class="suggestion-tag">${escapeHtml(item.tag)}</span>
      </div>
    `;
  });

  suggestionsBox.innerHTML = html;
  suggestionsBox.style.display = "flex";
  activeSuggestionIndex = -1;

  // Pasang klik listener pada setiap item saran
  const items = suggestionsBox.querySelectorAll(".suggestion-item");
  items.forEach((elem) => {
    elem.addEventListener("mousedown", (e) => {
      e.preventDefault(); // cegah input blur sebelum klik terproses
      const val = elem.getAttribute("data-value");
      selectSuggestion(val);
    });
  });
}

function selectSuggestion(value) {
  const searchInput = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");
  if (searchInput) {
    searchInput.value = value;
  }
  if (suggestionsBox) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
  }
  searchKeyword = value;
  activeSuggestionIndex = -1;
  runProgressiveSearchSimulation(value);
}

// ============================================================================
// 4. KONTROL OPSI DROPDOWN "URUTKAN" DINAMIS
// ============================================================================

function updateSortDropdownOptions(category) {
  const sortSelect = document.getElementById("sort-select");
  if (!sortSelect) return;

  const prevValue = sortSelect.value;
  const isTransportCategory = ["pesawat", "kereta", "bus"].includes(category);

  let optionsHtml = `
    <option value="rekomendasi">Urutkan: Rekomendasi</option>
    <option value="harga-asc">Termurah (Harga Terendah)</option>
    <option value="harga-desc">Termahal (Harga Tertinggi)</option>
    <option value="rating-desc">Rating Tertinggi</option>
    <option value="alfabet-asc">Alfabet: A ke Z (Nama / Rute)</option>
    <option value="alfabet-desc">Alfabet: Z ke A (Nama / Rute)</option>
  `;

  if (isTransportCategory) {
    optionsHtml += `
      <option value="time-asc">Jam Keberangkatan: Tercepat</option>
      <option value="time-desc">Jam Keberangkatan: Terakhir</option>
    `;
  }

  sortSelect.innerHTML = optionsHtml;

  // Pertahankan nilai jika masih valid untuk kategori saat ini
  const validValues = Array.from(sortSelect.options).map((o) => o.value);
  if (validValues.includes(prevValue)) {
    sortSelect.value = prevValue;
    currentSortMode = prevValue;
  } else {
    sortSelect.value = "rekomendasi";
    currentSortMode = "rekomendasi";
  }
}

// ============================================================================
// 5. KONTROL TAMPILAN PANEL ALGORITMA (TAB SWITCHER & HIDE/SHOW)
// ============================================================================

function switchToAlgoTab(targetTab) {
  const sortingTabBtn = document.getElementById("tab-algo-sorting");
  const searchingTabBtn = document.getElementById("tab-algo-searching");
  const sortingPanel = document.getElementById("panel-algo-sorting");
  const searchingPanel = document.getElementById("panel-algo-searching");

  if (!sortingTabBtn || !searchingTabBtn || !sortingPanel || !searchingPanel) {
    return;
  }

  if (targetTab === "sorting") {
    sortingTabBtn.classList.add("active");
    sortingTabBtn.setAttribute("aria-selected", "true");
    searchingTabBtn.classList.remove("active");
    searchingTabBtn.setAttribute("aria-selected", "false");

    sortingPanel.classList.add("active");
    sortingPanel.style.display = "flex";
    searchingPanel.classList.remove("active");
    searchingPanel.style.display = "none";
    scrollConsoleToBottom("console-sorting");
  } else if (targetTab === "searching") {
    searchingTabBtn.classList.add("active");
    searchingTabBtn.setAttribute("aria-selected", "true");
    sortingTabBtn.classList.remove("active");
    sortingTabBtn.setAttribute("aria-selected", "false");

    searchingPanel.classList.add("active");
    searchingPanel.style.display = "flex";
    sortingPanel.classList.remove("active");
    sortingPanel.style.display = "none";
    scrollConsoleToBottom("console-searching");
  }
}

function setVisualizerVisibility(visible) {
  isVisualizerVisible = visible;
  const grid = document.getElementById("main-content-grid");
  const aside = document.getElementById("algo-aside");
  const btnShow = document.getElementById("btn-show-visualizer");

  if (isVisualizerVisible) {
    if (grid) grid.classList.remove("visualizer-hidden");
    if (aside) aside.classList.remove("hidden");
    if (btnShow) btnShow.style.display = "none";
  } else {
    if (grid) grid.classList.add("visualizer-hidden");
    if (aside) aside.classList.add("hidden");
    if (btnShow) btnShow.style.display = "inline-flex";
  }
}

function scrollConsoleToBottom(consoleId) {
  const box = document.getElementById(consoleId);
  if (box) {
    box.scrollTop = box.scrollHeight;
  }
}

function appendLogLine(consoleId, className, text) {
  const box = document.getElementById(consoleId);
  if (!box) return;
  const line = document.createElement("div");
  line.className = `log-line ${className}`;
  line.textContent = text;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

// ============================================================================
// 6. METADATA & KODE C MULTI-ALGORITMA (SORTING & SEARCHING)
// ============================================================================

const SORT_ALGORITHMS_INFO = {
  bubble: {
    name: "Bubble Sort",
    complexity: "O(n²) · In-Place",
    filename: "bubble_sort.c",
    desc: "Membandingkan pasangan elemen bertetangga dan menukarnya jika urutannya salah, mengapungkan nilai ekstrem ke ujung secara bertahap.",
    code: `<span class="c-type">void</span> <span class="c-fn">bubble_sort_tickets</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n) {
    <span class="c-kw">for</span> (<span class="c-type">int</span> i = <span class="c-op">0</span>; i &lt; n - <span class="c-op">1</span>; i++) {
        <span class="c-type">bool</span> swapped = <span class="c-op">false</span>;
        <span class="c-kw">for</span> (<span class="c-type">int</span> j = <span class="c-op">0</span>; j &lt; n - i - <span class="c-op">1</span>; j++) {
            <span class="c-comment">// Perbandingan nilai elemen tiket</span>
            <span class="c-kw">if</span> (arr[j].price &gt; arr[j + <span class="c-op">1</span>].price) {
                <span class="c-type">Ticket</span> temp = arr[j];
                arr[j] = arr[j + <span class="c-op">1</span>];
                arr[j + <span class="c-op">1</span>] = temp;
                swapped = <span class="c-op">true</span>;
            }
        }
        <span class="c-kw">if</span> (!swapped) <span class="c-kw">break</span>; <span class="c-comment">// Optimasi early exit</span>
    }
}`
  },
  exchange: {
    name: "Exchange Sort",
    complexity: "O(n²) · In-Place",
    filename: "exchange_sort.c",
    desc: "Membandingkan elemen acuan arr[i] dengan semua elemen setelahnya arr[j] dan langsung menukar jika kondisi urutan tidak terpenuhi.",
    code: `<span class="c-type">void</span> <span class="c-fn">exchange_sort_tickets</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n) {
    <span class="c-kw">for</span> (<span class="c-type">int</span> i = <span class="c-op">0</span>; i &lt; n - <span class="c-op">1</span>; i++) {
        <span class="c-kw">for</span> (<span class="c-type">int</span> j = i + <span class="c-op">1</span>; j &lt; n; j++) {
            <span class="c-comment">// Bandingkan elemen acuan arr[i] langsung dengan arr[j]</span>
            <span class="c-kw">if</span> (arr[i].price &gt; arr[j].price) {
                <span class="c-type">Ticket</span> temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}`
  },
  selection: {
    name: "Selection Sort",
    complexity: "O(n²) · In-Place",
    filename: "selection_sort.c",
    desc: "Mencari elemen nilai paling ekstrem (minimum/maksimum) dari sub-array yang belum terurut, lalu menukarnya ke posisi target.",
    code: `<span class="c-type">void</span> <span class="c-fn">selection_sort_tickets</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n) {
    <span class="c-kw">for</span> (<span class="c-type">int</span> i = <span class="c-op">0</span>; i &lt; n - <span class="c-op">1</span>; i++) {
        <span class="c-type">int</span> min_idx = i;
        <span class="c-kw">for</span> (<span class="c-type">int</span> j = i + <span class="c-op">1</span>; j &lt; n; j++) {
            <span class="c-kw">if</span> (arr[j].price &lt; arr[min_idx].price) {
                min_idx = j;
            }
        }
        <span class="c-kw">if</span> (min_idx != i) {
            <span class="c-type">Ticket</span> temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}`
  },
  insertion: {
    name: "Insertion Sort",
    complexity: "O(n²) · Adaptif",
    filename: "insertion_sort.c",
    desc: "Menyisipkan setiap elemen satu per satu ke posisi yang tepat pada bagian array yang sudah terurut sebelumnya (mirip menyusun kartu).",
    code: `<span class="c-type">void</span> <span class="c-fn">insertion_sort_tickets</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n) {
    <span class="c-kw">for</span> (<span class="c-type">int</span> i = <span class="c-op">1</span>; i &lt; n; i++) {
        <span class="c-type">Ticket</span> key = arr[i];
        <span class="c-type">int</span> j = i - <span class="c-op">1</span>;
        <span class="c-comment">// Geser elemen yang lebih besar dari key ke posisi kanan</span>
        <span class="c-kw">while</span> (j &gt;= <span class="c-op">0</span> &amp;&amp; arr[j].price &gt; key.price) {
            arr[j + <span class="c-op">1</span>] = arr[j];
            j = j - <span class="c-op">1</span>;
        }
        arr[j + <span class="c-op">1</span>] = key;
    }
}`
  },
  shell: {
    name: "Shell Sort",
    complexity: "O(n log n) rata-rata · Gap Sequence",
    filename: "shell_sort.c",
    desc: "Pengembangan insertion sort dengan membandingkan elemen berjarak interval (gap) tertentu, lalu memperkecil gap hingga 1.",
    code: `<span class="c-type">void</span> <span class="c-fn">shell_sort_tickets</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n) {
    <span class="c-kw">for</span> (<span class="c-type">int</span> gap = n / <span class="c-op">2</span>; gap &gt; <span class="c-op">0</span>; gap /= <span class="c-op">2</span>) {
        <span class="c-kw">for</span> (<span class="c-type">int</span> i = gap; i &lt; n; i++) {
            <span class="c-type">Ticket</span> temp = arr[i];
            <span class="c-type">int</span> j;
            <span class="c-kw">for</span> (j = i; j &gt;= gap &amp;&amp; arr[j - gap].price &gt; temp.price; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}`
  },
  quick: {
    name: "Quick Sort",
    complexity: "O(n log n) rata-rata · Divide & Conquer",
    filename: "quick_sort.c",
    desc: "Memilih elemen poros (pivot), mempartisi elemen ke sisi kiri (< pivot) dan kanan (> pivot), lalu mengurutkan secara rekursif.",
    code: `<span class="c-type">int</span> <span class="c-fn">partition</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> low, <span class="c-type">int</span> high) {
    <span class="c-type">Ticket</span> pivot = arr[high]; <span class="c-comment">// Elemen poros</span>
    <span class="c-type">int</span> i = (low - <span class="c-op">1</span>);
    <span class="c-kw">for</span> (<span class="c-type">int</span> j = low; j &lt; high; j++) {
        <span class="c-kw">if</span> (arr[j].price &lt; pivot.price) {
            i++;
            <span class="c-type">Ticket</span> t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    <span class="c-type">Ticket</span> t = arr[i + <span class="c-op">1</span>]; arr[i + <span class="c-op">1</span>] = arr[high]; arr[high] = t;
    <span class="c-kw">return</span> (i + <span class="c-op">1</span>);
}

<span class="c-type">void</span> <span class="c-fn">quick_sort_tickets</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> low, <span class="c-type">int</span> high) {
    <span class="c-kw">if</span> (low &lt; high) {
        <span class="c-type">int</span> pi = <span class="c-fn">partition</span>(arr, low, high);
        <span class="c-fn">quick_sort_tickets</span>(arr, low, pi - <span class="c-op">1</span>);
        <span class="c-fn">quick_sort_tickets</span>(arr, pi + <span class="c-op">1</span>, high);
    }
}`
  }
};

const SEARCH_ALGORITHMS_INFO = {
  linear: {
    name: "Linear Search",
    complexity: "O(n) · Sequential",
    filename: "linear_search.c",
    desc: "Memeriksa setiap elemen data secara berurutan satu per satu dari indeks awal hingga akhir sampai kata kunci ditemukan.",
    code: `<span class="c-type">int</span> <span class="c-fn">linear_search_ticket</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n, <span class="c-kw">const</span> <span class="c-type">char</span> *query) {
    <span class="c-kw">for</span> (<span class="c-type">int</span> i = <span class="c-op">0</span>; i &lt; n; i++) {
        <span class="c-comment">// Pemeriksaan substring berurutan</span>
        <span class="c-kw">if</span> (<span class="c-fn">strstr</span>(arr[i].title, query) != <span class="c-kw">NULL</span> ||
            <span class="c-fn">strstr</span>(arr[i].provider, query) != <span class="c-kw">NULL</span>) {
            <span class="c-kw">return</span> i; <span class="c-comment">// Indeks elemen ditemukan</span>
        }
    }
    <span class="c-kw">return</span> -<span class="c-op">1</span>; <span class="c-comment">// Tidak ditemukan</span>
}`
  },
  binary: {
    name: "Binary Search",
    complexity: "O(log n) · Butuh Data Terurut",
    filename: "binary_search.c",
    desc: "Memeriksa elemen nilai tengah (mid) rentang data terurut. Jika tidak cocok, rentang pencarian dipotong menjadi separuhnya.",
    code: `<span class="c-type">int</span> <span class="c-fn">binary_search_ticket</span>(<span class="c-type">Ticket</span> arr[], <span class="c-type">int</span> n, <span class="c-kw">const</span> <span class="c-type">char</span> *query) {
    <span class="c-type">int</span> low = <span class="c-op">0</span>, high = n - <span class="c-op">1</span>;
    <span class="c-comment">// Syarat: data arr[] sudah diurutkan terlebih dahulu</span>
    <span class="c-kw">while</span> (low &lt;= high) {
        <span class="c-type">int</span> mid = low + (high - low) / <span class="c-op">2</span>;
        <span class="c-type">int</span> res = <span class="c-fn">strcasecmp</span>(query, arr[mid].title);
        <span class="c-kw">if</span> (res == <span class="c-op">0</span> || <span class="c-fn">strstr</span>(arr[mid].title, query) != <span class="c-kw">NULL</span>) {
            <span class="c-kw">return</span> mid; <span class="c-comment">// Ditemukan di indeks mid</span>
        }
        <span class="c-kw">if</span> (res &gt; <span class="c-op">0</span>) low = mid + <span class="c-op">1</span>;  <span class="c-comment">// Separuh kanan</span>
        <span class="c-kw">else</span> high = mid - <span class="c-op">1</span>;          <span class="c-comment">// Separuh kiri</span>
    }
    <span class="c-kw">return</span> -<span class="c-op">1</span>;
}`
  }
};

function updateSortAlgoMeta(algoKey) {
  const info = SORT_ALGORITHMS_INFO[algoKey] || SORT_ALGORITHMS_INFO.bubble;
  const complexityEl = document.getElementById("complexity-sorting");
  const descEl = document.getElementById("desc-sorting");
  const filenameEl = document.getElementById("code-filename-sorting");
  const codeEl = document.getElementById("code-snippet-sorting");

  if (complexityEl) complexityEl.textContent = info.complexity;
  if (descEl) descEl.textContent = info.desc;
  if (filenameEl) filenameEl.textContent = info.filename;
  if (codeEl) codeEl.innerHTML = info.code;
}

function updateSearchAlgoMeta(algoKey) {
  const info = SEARCH_ALGORITHMS_INFO[algoKey] || SEARCH_ALGORITHMS_INFO.linear;
  const complexityEl = document.getElementById("complexity-searching");
  const descEl = document.getElementById("desc-searching");
  const filenameEl = document.getElementById("code-filename-searching");
  const codeEl = document.getElementById("code-snippet-searching");

  if (complexityEl) complexityEl.textContent = info.complexity;
  if (descEl) descEl.textContent = info.desc;
  if (filenameEl) filenameEl.textContent = info.filename;
  if (codeEl) codeEl.innerHTML = info.code;
}

// ============================================================================
// 7. KONTROL KOTAK VISUALISASI GRAFIK BATANG DINAMIS
// ============================================================================

function setChartStatus(badgeId, statusText, statusClass = "") {
  const badge = document.getElementById(badgeId);
  if (!badge) return;
  badge.textContent = statusText;
  badge.className = `chart-status-badge ${statusClass}`.trim();
}

function renderChartBars(containerId, items, states = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `<div style="margin: auto; font-size: 11px; color: #64748b; padding: 25px 10px;">Tidak ada elemen data untuk ditampilkan</div>`;
    return;
  }

  const n = items.length;
  // Atur kelas kerapatan otomatis agar elemen muat rapi di 1 layar
  container.classList.toggle("dense-bars", n >= 12 && n < 16);
  container.classList.toggle("ultra-dense-bars", n >= 16);

  let minVal = Infinity;
  let maxVal = -Infinity;
  items.forEach((item) => {
    const val = item.price || 1;
    if (val < minVal) minVal = val;
    if (val > maxVal) maxVal = val;
  });

  if (minVal === maxVal) {
    minVal = maxVal * 0.5;
  }

  let html = "";
  items.forEach((item, idx) => {
    const val = item.price || 1;
    const ratio = Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal || 1)));
    const heightPercent = Math.round(20 + ratio * 74);

    let displayVal = "";
    if (n >= 16) {
      if (val >= 1000000) {
        displayVal = (val / 1000000).toFixed(1).replace(".0", "") + "M";
      } else if (val >= 1000) {
        displayVal = Math.round(val / 1000) + "k";
      } else {
        displayVal = val.toString();
      }
    } else {
      if (val >= 1000000) {
        displayVal = (val / 1000000).toFixed(1).replace(".0", "") + "M";
      } else if (val >= 1000) {
        displayVal = Math.round(val / 1000) + "k";
      } else {
        displayVal = val.toString();
      }
    }

    const idxLabel = n >= 16 ? `${idx}` : `[${idx}]`;
    const stateType = states[idx] || "default";
    const stateClass = `bar-${stateType}`;

    html += `
      <div class="chart-bar-item" title="${escapeHtml(item.title)} (${item.formatted_price})">
        <span class="chart-bar-val">${displayVal}</span>
        <div class="chart-bar-track">
          <div class="chart-bar-fill ${stateClass}" style="height: ${heightPercent}%;"></div>
        </div>
        <span class="chart-bar-idx">${idxLabel}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Helper perbandingan tiket berdasarkan sortMode aktif
function compareTickets(a, b, sortMode) {
  let valLabel1 = "";
  let valLabel2 = "";
  let shouldSwap = false;

  if (sortMode === "harga-asc" || sortMode === "harga-desc") {
    valLabel1 = a.formatted_price;
    valLabel2 = b.formatted_price;
    shouldSwap = sortMode === "harga-asc" ? a.price > b.price : a.price < b.price;
  } else if (sortMode === "rating-desc" || sortMode === "rating-asc") {
    valLabel1 = `★ ${a.rating.toFixed(1)}`;
    valLabel2 = `★ ${b.rating.toFixed(1)}`;
    shouldSwap = sortMode === "rating-desc" ? a.rating < b.rating : a.rating > b.rating;
  } else if (sortMode === "alfabet-asc" || sortMode === "alfabet-desc") {
    const title1 = a.title || "";
    const title2 = b.title || "";
    const s1 = title1.length > 20 ? title1.substring(0, 18) + "…" : title1;
    const s2 = title2.length > 20 ? title2.substring(0, 18) + "…" : title2;
    valLabel1 = `"${s1}"`;
    valLabel2 = `"${s2}"`;
    const cmp = title1.localeCompare(title2, "id", { sensitivity: "base" });
    shouldSwap = sortMode === "alfabet-asc" ? cmp > 0 : cmp < 0;
  } else if (sortMode === "time-asc" || sortMode === "time-desc") {
    const time1 = a.departure_time || "99:99";
    const time2 = b.departure_time || "99:99";
    valLabel1 = `${time1} WIB`;
    valLabel2 = `${time2} WIB`;
    shouldSwap = sortMode === "time-asc" ? time1.localeCompare(time2) > 0 : time1.localeCompare(time2) < 0;
  } else {
    valLabel1 = a.formatted_price;
    valLabel2 = b.formatted_price;
    shouldSwap = a.price > b.price;
  }

  return { valLabel1, valLabel2, shouldSwap };
}

// ============================================================================
// TIKETGO WEBASSEMBLY & C-CORE INTERFACE (c/sort.c, c/search.c, c/main_wasm.c)
// ============================================================================
const TiketGoWASM = {
  wasm_init_catalog() {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return;
    mod.ccall("wasm_init_catalog", null, [], []);
  },

  wasm_execute_search_algo(keyword, category_id, algorithm_type) {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return 0;
    return mod.ccall(
      "wasm_execute_search_algo",
      "number",
      ["string", "number", "number"],
      [keyword || "", Number(category_id) || 0, Number(algorithm_type) || 0]
    );
  },

  wasm_execute_sort(algorithm_type, ascending) {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return;
    mod.ccall(
      "wasm_execute_sort",
      null,
      ["number", "number"],
      [Number(algorithm_type) || 0, ascending ? 1 : 0]
    );
  },

  wasm_get_result_count() {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return 0;
    return mod.ccall("wasm_get_result_count", "number", [], []);
  },

  wasm_get_results_json() {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return "[]";
    return mod.ccall("wasm_get_results_json", "string", [], []);
  },

  wasm_get_log_count() {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return 0;
    return mod.ccall("wasm_get_log_count", "number", [], []);
  },

  wasm_get_log_entry(index) {
    const mod = typeof Module !== "undefined" ? Module : window.Module;
    if (!mod || typeof mod.ccall !== "function") return "{}";
    return mod.ccall("wasm_get_log_entry", "string", ["number"], [Number(index) || 0]);
  },

  // Helper untuk membaca dan mem-parse seluruh log dari C WASM logger
  getAllLogs() {
    const count = this.wasm_get_log_count();
    const logs = [];
    for (let i = 0; i < count; i++) {
      const raw = this.wasm_get_log_entry(i);
      try {
        logs.push(JSON.parse(raw));
      } catch (e) {
        logs.push({ level: 0, message: raw, swap_count: 0, comparison_count: 0 });
      }
    }
    return logs;
  },

  // Helper untuk mengambil item hasil JSON dari WASM dan menggabungkan detail spesifik dari JS
  getMergedResults() {
    const jsonStr = this.wasm_get_results_json();
    try {
      const items = JSON.parse(jsonStr);
      return items.map((item) => {
        const fullDetail = TICKETS_MAP.get(item.id) || {};
        return {
          ...fullDetail,
          ...item,
        };
      });
    } catch (e) {
      console.error("Gagal parse JSON hasil dari WASM:", e);
      return [];
    }
  }
};
window.TiketGoWASM = TiketGoWASM;

// ============================================================================
// 8. SIMULASI PENCARIAN PROGRESIF (LINEAR SEARCH & BINARY SEARCH VIA WASM)
// ============================================================================

function runProgressiveSearchSimulation(keyword) {
  cancelRunningAnimations();
  switchToAlgoTab("searching");

  const consoleBox = document.getElementById("console-searching");
  if (!consoleBox) return;

  consoleBox.innerHTML = "";

  const trimmedKeyword = (keyword || "").trim();
  const catId = getCategoryId(currentCategory);
  const searchAlgoCode = currentSearchAlgo === "binary" ? 1 : 0;
  const algoInfo = SEARCH_ALGORITHMS_INFO[currentSearchAlgo] || SEARCH_ALGORITHMS_INFO.linear;

  // Eksekusi real C search via WebAssembly
  TiketGoWASM.wasm_execute_search_algo(trimmedKeyword, catId, searchAlgoCode);
  const matchedItems = TiketGoWASM.getMergedResults();
  const rawLogs = TiketGoWASM.getAllLogs();

  // Data acuan kategori untuk visualisasi batang grafik
  let chartDisplayItems = [...getCategoryBaseItems()];
  if (currentSearchAlgo === "binary") {
    // Pra-pengurutan judul (strcmp ascending) wajib untuk Binary Search
    chartDisplayItems.sort((a, b) =>
      a.title.localeCompare(b.title, "id", { sensitivity: "base" })
    );
  }

  if (trimmedKeyword === "") {
    appendLogLine(
      "console-searching",
      "log-system",
      `[SYSTEM] Keyword kosong. Menampilkan seluruh data ${CATEGORY_TITLES[currentCategory]}.`
    );
    setChartStatus("chart-status-searching", "Siaga", "");
    renderChartBars("chart-bars-searching", chartDisplayItems);
    currentlyDisplayedTickets = [...matchedItems];
    renderTicketsList(currentlyDisplayedTickets);
    return;
  }

  setChartStatus("chart-status-searching", "Mencari...", "active");

  const steps = rawLogs.map((log) => {
    let type = "system";
    let logClass = "log-system";
    const states = {};

    if (log.level === 3) {
      if (log.message.includes("[FOUND]") || log.message.includes("Cocok")) {
        type = "found";
        logClass = "log-found";
      } else {
        type = "check";
        logClass = "log-check";
      }
    } else if (log.level === 4) {
      type = "success";
      logClass = "log-success";
    } else if (log.level === 5) {
      type = "not_found";
      logClass = "log-swap";
    }

    const match = log.message.match(/posisi tengah\s+(\d+)|Index\s+\[(\d+)\]|Item\s+\[(\d+)\]/i);
    if (match) {
      const idx = parseInt(match[1] || match[2] || match[3], 10);
      if (!isNaN(idx)) {
        if (type === "found") states[idx] = "found";
        else if (type === "check") states[idx] = "checking";
      }
    }

    return {
      text: log.message,
      type,
      logClass,
      states,
    };
  });

  const finalStates = {};
  matchedItems.forEach((matched) => {
    const idx = chartDisplayItems.findIndex((it) => it.id === matched.id);
    if (idx !== -1) finalStates[idx] = "found";
  });

  if (simulationSpeed >= 100) {
    // Kecepatan 100x: Instan langsung tampil hasil akhir tanpa animasi bertahap
    const fragment = document.createDocumentFragment();
    steps.forEach((step) => {
      const line = document.createElement("div");
      line.className = `log-line ${step.logClass}`;
      line.textContent = step.text;
      fragment.appendChild(line);
    });
    consoleBox.appendChild(fragment);
    consoleBox.scrollTop = consoleBox.scrollHeight;

    setChartStatus(
      "chart-status-searching",
      matchedItems.length > 0 ? "Selesai" : "Nihil",
      matchedItems.length > 0 ? "done" : ""
    );

    renderChartBars("chart-bars-searching", chartDisplayItems, finalStates);
    currentlyDisplayedTickets = [...matchedItems];
    renderTicketsList(currentlyDisplayedTickets);
    return;
  }

  const baseDelay = currentSearchAlgo === "binary" ? 200 : 120;
  const delayStep = Math.max(18, Math.round(baseDelay / simulationSpeed));

  let accumulatedStates = {};

  steps.forEach((step, idx) => {
    queueTimeout(() => {
      appendLogLine("console-searching", step.logClass, step.text);
      if (step.states && Object.keys(step.states).length > 0) {
        accumulatedStates = { ...accumulatedStates, ...step.states };
        renderChartBars("chart-bars-searching", chartDisplayItems, accumulatedStates);
      }
    }, (idx + 1) * delayStep);
  });

  queueTimeout(() => {
    setChartStatus(
      "chart-status-searching",
      matchedItems.length > 0 ? "Selesai" : "Nihil",
      matchedItems.length > 0 ? "done" : ""
    );
    renderChartBars("chart-bars-searching", chartDisplayItems, finalStates);
    currentlyDisplayedTickets = [...matchedItems];
    renderTicketsList(currentlyDisplayedTickets);
  }, (steps.length + 1) * delayStep + Math.round(80 / simulationSpeed));
}

// ============================================================================
// 9. SIMULASI PENGURUTAN PROGRESIF (6 PILIHAN ALGORITMA SORTING VIA WASM)
// ============================================================================

function runProgressiveSortSimulation(sortMode) {
  cancelRunningAnimations();
  switchToAlgoTab("sorting");

  const consoleBox = document.getElementById("console-sorting");
  if (!consoleBox) return;

  consoleBox.innerHTML = "";

  if (currentlyDisplayedTickets.length === 0) {
    appendLogLine(
      "console-sorting",
      "log-system",
      "[SYSTEM] Tidak ada data tiket yang sedang tampil untuk diurutkan."
    );
    setChartStatus("chart-status-sorting", "Siaga", "");
    return;
  }

  const catId = getCategoryId(currentCategory);
  const searchAlgoCode = currentSearchAlgo === "binary" ? 1 : 0;

  // Jika opsi Rekomendasi dipilih (reset ke urutan katalog bawaan)
  if (sortMode === "rekomendasi") {
    appendLogLine(
      "console-sorting",
      "log-system",
      `[SYSTEM] Reset urutan ke "Rekomendasi Bawaan" katalog (${CATEGORY_TITLES[currentCategory]}).`
    );
    TiketGoWASM.wasm_execute_search_algo(searchKeyword, catId, searchAlgoCode);
    currentlyDisplayedTickets = TiketGoWASM.getMergedResults();

    renderChartBars("chart-bars-sorting", currentlyDisplayedTickets);
    setChartStatus("chart-status-sorting", "Siaga", "");
    renderTicketsList(currentlyDisplayedTickets);
    appendLogLine(
      "console-sorting",
      "log-success",
      `[SUCCESS] Urutan awal rekomendasi berhasil diterapkan.`
    );
    return;
  }

  // Siapkan data aktif di WASM sebelum di-sort
  TiketGoWASM.wasm_execute_search_algo(searchKeyword, catId, searchAlgoCode);
  const initialArr = TiketGoWASM.getMergedResults();
  const n = initialArr.length;

  const algoKey = currentSortAlgo || "bubble";
  const algoInfo = SORT_ALGORITHMS_INFO[algoKey] || SORT_ALGORITHMS_INFO.bubble;
  const isAscending = !sortMode.includes("desc");

  const algoCodeMap = {
    bubble: 0,
    selection: 1,
    exchange: 2,
    insertion: 3,
    shell: 4,
    quick: 5,
  };
  const algoCode = algoCodeMap[algoKey] ?? 0;

  if (n <= 1) {
    appendLogLine("console-sorting", "log-system", `[SYSTEM] Memulai ${algoInfo.name} (n=${n})`);
    appendLogLine("console-sorting", "log-success", `[SUCCESS] Jumlah elemen <= 1, tidak memerlukan pengurutan.`);
    renderChartBars("chart-bars-sorting", initialArr);
    setChartStatus("chart-status-sorting", "Selesai", "done");
    currentlyDisplayedTickets = [...initialArr];
    renderTicketsList(currentlyDisplayedTickets);
    return;
  }

  setChartStatus("chart-status-sorting", "Mengurutkan...", "active");

  // Panggil WASM Engine Real C (c/sort.c via TiketGoWASM)
  TiketGoWASM.wasm_execute_sort(algoCode, isAscending ? 1 : 0);
  const finalSortedArr = TiketGoWASM.getMergedResults();
  const rawLogs = TiketGoWASM.getAllLogs();

  // Replay pertukaran/perbandingan dari log WASM C untuk visualisasi batang
  let workingArr = [...initialArr];
  const steps = rawLogs.map((log) => {
    let type = "system";
    let logClass = "log-system";
    const states = {};

    if (log.level === 1) {
      type = "compare";
      logClass = "log-compare";
      const cmpMatch = log.message.match(/(?:Index\s+\[|arr\[|elemen ke-)(\d+)[^\d]+(?:Target\s+\[|arr\[|vs\s+\[|ke-)(\d+)/i);
      if (cmpMatch) {
        const i1 = parseInt(cmpMatch[1], 10);
        const i2 = parseInt(cmpMatch[2], 10);
        if (!isNaN(i1)) states[i1] = "comparing";
        if (!isNaN(i2)) states[i2] = "comparing";
      }
    } else if (log.level === 2) {
      type = "swap";
      logClass = "log-swap";
      const swapMatch = log.message.match(/(?:index\s+\[|ke-)(\d+)[^\d]+(?:ke\s+\[|<=>\s+\[|ke-)(\d+)/i);
      if (swapMatch) {
        const i1 = parseInt(swapMatch[1], 10);
        const i2 = parseInt(swapMatch[2], 10);
        if (!isNaN(i1) && !isNaN(i2) && i1 < workingArr.length && i2 < workingArr.length) {
          const temp = workingArr[i1];
          workingArr[i1] = workingArr[i2];
          workingArr[i2] = temp;
          states[i1] = "swapping";
          states[i2] = "swapping";
        }
      }
    } else if (log.level === 4) {
      type = "success";
      logClass = "log-success";
      workingArr = [...finalSortedArr];
    }

    return {
      text: log.message,
      type,
      logClass,
      states,
      arrSnapshot: [...workingArr],
    };
  });

  if (simulationSpeed >= 100) {
    // Kecepatan 100x: Instan langsung tampil hasil akhir tanpa jeda bertahap
    const fragment = document.createDocumentFragment();
    steps.forEach((step) => {
      const line = document.createElement("div");
      line.className = `log-line ${step.logClass}`;
      line.textContent = step.text;
      fragment.appendChild(line);
    });
    consoleBox.appendChild(fragment);
    consoleBox.scrollTop = consoleBox.scrollHeight;

    const sortedStates = {};
    for (let k = 0; k < n; k++) sortedStates[k] = "sorted";
    renderChartBars("chart-bars-sorting", finalSortedArr, sortedStates);
    setChartStatus("chart-status-sorting", "Selesai", "done");

    currentlyDisplayedTickets = [...finalSortedArr];
    renderTicketsList(currentlyDisplayedTickets);
    return;
  }

  // Jeda waktu adaptif dibagi faktor simulationSpeed (0.5x, 1x, 2x, 4x, 50x, 100x)
  const baseStepDelay = Math.max(70, Math.min(150, Math.floor(3200 / (steps.length || 1))));
  const delayStep = Math.max(18, Math.round(baseStepDelay / simulationSpeed));

  steps.forEach((step, index) => {
    queueTimeout(() => {
      appendLogLine("console-sorting", step.logClass, step.text);

      if (step.type === "success") {
        const sortedStates = {};
        for (let k = 0; k < n; k++) sortedStates[k] = "sorted";
        renderChartBars("chart-bars-sorting", finalSortedArr, sortedStates);
        setChartStatus("chart-status-sorting", "Selesai", "done");

        currentlyDisplayedTickets = [...finalSortedArr];
        renderTicketsList(currentlyDisplayedTickets);
      } else {
        renderChartBars("chart-bars-sorting", step.arrSnapshot, step.states);
      }
    }, (index + 1) * delayStep);
  });
}

// ============================================================================
// 8. RENDER DAFTAR TIKET (UKURAN & STRUKTUR SERAGAM KONSISTEN)
// ============================================================================

function renderTicketsList(items) {
  const container = document.getElementById("tickets-container");
  const titleEl = document.getElementById("section-category-title");
  const countEl = document.getElementById("tickets-count");

  if (!container) return;

  if (titleEl) {
    titleEl.textContent = CATEGORY_TITLES[currentCategory] || "Daftar Tiket";
  }

  if (countEl) {
    countEl.textContent = `Menampilkan ${items.length} hasil`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p class="empty-state-text">Tidak ada tiket yang cocok dengan pencarian "<strong>${escapeHtml(searchKeyword)}</strong>".</p>
        <button type="button" class="btn-reset-filter" id="btn-reset-search">Reset Pencarian</button>
      </div>
    `;

    const resetBtn = document.getElementById("btn-reset-search");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.value = "";
        searchKeyword = "";
        runProgressiveSearchSimulation("");
      });
    }
    return;
  }

  let html = "";
  items.forEach((ticket) => {
    html += `
      <div class="ticket-card" data-id="${ticket.id}">
        <div class="ticket-left">
          <div class="ticket-icon-chip chip-${ticket.category}">
            ${getCategoryIconSvg(ticket.category)}
          </div>
          <div class="ticket-info">
            <div class="ticket-badges">
              <span class="badge-cat">${ticket.category}</span>
              <span class="badge-simulasi">DATA SIMULASI</span>
            </div>
            <h3 class="ticket-title" title="${ticket.title}">${ticket.title}</h3>
            <div class="ticket-meta">
              <span class="ticket-provider-name" title="${ticket.provider}">${ticket.provider}</span>
              <span class="meta-separator">·</span>
              <span class="ticket-extra-info" title="${ticket.extra_info}">${ticket.extra_info}</span>
              <span class="meta-separator">·</span>
              <span class="rating-badge">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${ticket.rating.toFixed(1)}
              </span>
              <span class="ticket-reviews">(${ticket.review_count.toLocaleString("id-ID")})</span>
            </div>
          </div>
        </div>
        <div class="ticket-right">
          <div class="ticket-price-wrap">
            <span class="ticket-price">${ticket.formatted_price}</span>
            <span class="ticket-unit">${ticket.price_unit}</span>
          </div>
          <button type="button" class="btn-select" data-ticket-id="${ticket.id}" data-ticket-title="${ticket.title}">
            Pilih
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const selectButtons = container.querySelectorAll(".btn-select");
  selectButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalText = btn.textContent;
      btn.textContent = "Dipilih ✓";
      btn.style.backgroundColor = "var(--primary-color)";
      btn.style.color = "#ffffff";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = "";
        btn.style.color = "";
      }, 1500);
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 9. SETUP EVENT LISTENERS & INISIALISASI
// ============================================================================

function resetVisualizerToStandby() {
  cancelRunningAnimations();

  const algoSortInfo = SORT_ALGORITHMS_INFO[currentSortAlgo] || SORT_ALGORITHMS_INFO.bubble;
  const algoSearchInfo = SEARCH_ALGORITHMS_INFO[currentSearchAlgo] || SEARCH_ALGORITHMS_INFO.linear;

  const sortingConsole = document.getElementById("console-sorting");
  if (sortingConsole) {
    sortingConsole.innerHTML = `
      <div class="log-line log-system">[SYSTEM] Siaga: Menunggu aksi pengurutan pada kategori ${CATEGORY_TITLES[currentCategory]}...</div>
      <div class="log-line log-system">[SYSTEM] Algoritma aktif: ${algoSortInfo.name} · Pilih opsi pada dropdown "Urutkan" untuk memulai simulasi.</div>
    `;
  }

  const searchingConsole = document.getElementById("console-searching");
  if (searchingConsole) {
    searchingConsole.innerHTML = `
      <div class="log-line log-system">[SYSTEM] Siaga: Menunggu aksi pencarian pada kategori ${CATEGORY_TITLES[currentCategory]}...</div>
      <div class="log-line log-system">[SYSTEM] Algoritma aktif: ${algoSearchInfo.name} · Masukkan kata kunci atau klik "Cari" untuk memulai simulasi.</div>
    `;
  }

  setChartStatus("chart-status-sorting", "Siaga", "");
  setChartStatus("chart-status-searching", "Siaga", "");
  renderChartBars("chart-bars-sorting", currentlyDisplayedTickets);
  renderChartBars("chart-bars-searching", currentlyDisplayedTickets);
}

// ============================================================================
// 10. INISIALISASI ASINKRON TIKETGO WEBASSEMBLY & EVENT LISTENERS
// ============================================================================

let wasmReady = false;
const Module = typeof window.Module !== "undefined" ? window.Module : (typeof globalThis.Module !== "undefined" ? globalThis.Module : {});
window.Module = Module;

function renderInitialWasmView() {
  const catId = getCategoryId(currentCategory);
  const searchAlgoCode = currentSearchAlgo === "binary" ? 1 : 0;
  TiketGoWASM.wasm_execute_search_algo("", catId, searchAlgoCode);
  currentlyDisplayedTickets = TiketGoWASM.getMergedResults();

  updateSortDropdownOptions(currentCategory);
  renderTicketsList(currentlyDisplayedTickets);

  updateSortAlgoMeta("bubble");
  updateSearchAlgoMeta("linear");

  renderChartBars("chart-bars-sorting", currentlyDisplayedTickets);
  renderChartBars("chart-bars-searching", currentlyDisplayedTickets);
  setChartStatus("chart-status-sorting", "Siaga", "");
  setChartStatus("chart-status-searching", "Siaga", "");
}

Module.onRuntimeInitialized = function() {
  wasmReady = true;
  Module.ccall('wasm_init_catalog', null, [], []);
  // baru boleh render tampilan awal setelah ini
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderInitialWasmView);
  } else {
    renderInitialWasmView();
  }
};

if (Module.calledRun) {
  wasmReady = true;
  Module.ccall('wasm_init_catalog', null, [], []);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderInitialWasmView);
  } else {
    renderInitialWasmView();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Jika WASM sudah siap sebelum DOM selesai dimuat
  if (wasmReady) {
    renderInitialWasmView();
  }

  // 2. Tab Kategori di Kartu Pencarian Melayang
  const categoryTabBtns = document.querySelectorAll(".category-tab");
  categoryTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryTabBtns.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      currentCategory = btn.getAttribute("data-category") || "semua";

      // Perbarui opsi dropdown urutkan sesuai kategori (mis. tambah jam keberangkatan untuk transportasi)
      updateSortDropdownOptions(currentCategory);

      // Sinkronisasi data filter kategori dengan C WASM
      const catId = getCategoryId(currentCategory);
      const searchAlgoCode = currentSearchAlgo === "binary" ? 1 : 0;
      TiketGoWASM.wasm_execute_search_algo(searchKeyword, catId, searchAlgoCode);
      currentlyDisplayedTickets = TiketGoWASM.getMergedResults();

      renderTicketsList(currentlyDisplayedTickets);
      resetVisualizerToStandby();
    });
  });

  // 3. Form Pencarian & Autocomplete
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (suggestionsBox) suggestionsBox.style.display = "none";
      searchKeyword = searchInput.value;
      runProgressiveSearchSimulation(searchKeyword);
    });

    let debounceTimer = null;
    searchInput.addEventListener("input", (e) => {
      const val = e.target.value;
      updateAutocompleteSuggestions(val);

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchKeyword = val;
        runProgressiveSearchSimulation(searchKeyword);
      }, 350);
    });

    // Navigasi Keyboard pada Autocomplete
    searchInput.addEventListener("keydown", (e) => {
      if (!suggestionsBox || suggestionsBox.style.display === "none") return;

      const items = suggestionsBox.querySelectorAll(".suggestion-item");
      if (items.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
        items.forEach((it, idx) => {
          it.classList.toggle("active", idx === activeSuggestionIndex);
          if (idx === activeSuggestionIndex) it.scrollIntoView({ block: "nearest" });
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeSuggestionIndex =
          activeSuggestionIndex <= 0 ? items.length - 1 : activeSuggestionIndex - 1;
        items.forEach((it, idx) => {
          it.classList.toggle("active", idx === activeSuggestionIndex);
          if (idx === activeSuggestionIndex) it.scrollIntoView({ block: "nearest" });
        });
      } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
        e.preventDefault();
        const selectedVal = items[activeSuggestionIndex].getAttribute("data-value");
        selectSuggestion(selectedVal);
      } else if (e.key === "Escape") {
        suggestionsBox.style.display = "none";
        activeSuggestionIndex = -1;
      }
    });

    // Tutup saran saat klik di luar area pencarian
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-input-box")) {
        if (suggestionsBox) suggestionsBox.style.display = "none";
        activeSuggestionIndex = -1;
      }
    });
  }

  // 4. Dropdown "Urutkan" (Kriteria Field Pengurutan)
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSortMode = e.target.value;
      runProgressiveSortSimulation(currentSortMode);
    });
  }

  // 5. Dropdown Pemilihan Algoritma Sorting Baru
  const selectAlgoSorting = document.getElementById("select-algo-sorting");
  if (selectAlgoSorting) {
    selectAlgoSorting.addEventListener("change", (e) => {
      currentSortAlgo = e.target.value;
      updateSortAlgoMeta(currentSortAlgo);

      if (currentSortMode && currentSortMode !== "rekomendasi") {
        runProgressiveSortSimulation(currentSortMode);
      } else {
        renderChartBars("chart-bars-sorting", currentlyDisplayedTickets);
        setChartStatus("chart-status-sorting", "Siaga", "");
        const consoleBox = document.getElementById("console-sorting");
        if (consoleBox) {
          const info = SORT_ALGORITHMS_INFO[currentSortAlgo];
          consoleBox.innerHTML = `
            <div class="log-line log-system">[SYSTEM] Algoritma sorting aktif: ${info.name} (${info.complexity})</div>
            <div class="log-line log-system">[SYSTEM] Pilih kriteria pada dropdown "Urutkan" untuk memulai simulasi pengurutan.</div>
          `;
        }
      }
    });
  }

  // 6. Dropdown Pemilihan Algoritma Searching Baru
  const selectAlgoSearching = document.getElementById("select-algo-searching");
  if (selectAlgoSearching) {
    selectAlgoSearching.addEventListener("change", (e) => {
      currentSearchAlgo = e.target.value;
      updateSearchAlgoMeta(currentSearchAlgo);

      if (searchKeyword && searchKeyword.trim() !== "") {
        runProgressiveSearchSimulation(searchKeyword);
      } else {
        renderChartBars("chart-bars-searching", currentlyDisplayedTickets);
        setChartStatus("chart-status-searching", "Siaga", "");
        const consoleBox = document.getElementById("console-searching");
        if (consoleBox) {
          const info = SEARCH_ALGORITHMS_INFO[currentSearchAlgo];
          consoleBox.innerHTML = `
            <div class="log-line log-system">[SYSTEM] Algoritma searching aktif: ${info.name} (${info.complexity})</div>
            <div class="log-line log-system">[SYSTEM] Masukkan kata kunci atau klik "Cari" untuk memulai simulasi pencarian.</div>
          `;
        }
      }
    });
  }

  // 7. Tombol Hide / Show Panel Visualisasi
  const btnHide = document.getElementById("btn-hide-visualizer");
  const btnShow = document.getElementById("btn-show-visualizer");

  if (btnHide) {
    btnHide.addEventListener("click", () => {
      setVisualizerVisibility(false);
    });
  }

  if (btnShow) {
    btnShow.addEventListener("click", () => {
      setVisualizerVisibility(true);
    });
  }

  // 8. Tab Manual Sorting & Searching di Panel Kanan
  const sortingTabBtn = document.getElementById("tab-algo-sorting");
  const searchingTabBtn = document.getElementById("tab-algo-searching");

  if (sortingTabBtn) {
    sortingTabBtn.addEventListener("click", () => {
      switchToAlgoTab("sorting");
    });
  }

  if (searchingTabBtn) {
    searchingTabBtn.addEventListener("click", () => {
      switchToAlgoTab("searching");
    });
  }

  // 9. Tombol Pilihan Kecepatan Animasi (0.5x, 1x, 2x, 4x, 50x, 100x)
  const speedButtons = document.querySelectorAll(".btn-speed");
  speedButtons.forEach((btn) => {
    // Normalisasi jika masih ada atribut 8x di DOM
    if (btn.getAttribute("data-speed") === "8") {
      btn.setAttribute("data-speed", "50");
      btn.textContent = "50x";
      btn.title = "Kecepatan Super Cepat (50x)";
    }
    btn.addEventListener("click", () => {
      const speed = parseFloat(btn.getAttribute("data-speed")) || 1.0;
      setSimulationSpeed(speed);
    });
  });
});
