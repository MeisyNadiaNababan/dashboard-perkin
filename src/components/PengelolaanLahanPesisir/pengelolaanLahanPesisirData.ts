// ============================================================================
// DATA PERJANJIAN KINERJA TAHUN 2025 (PERKIN A3)
// PENGELOLAAN LAHAN, PESISIR DAN REKLAMASI BP BATAM
// Nomor: 1/KA/3/2025 • Batam, 13 Maret 2025
// Pihak Pertama: Syarlin Joyo (Anggota/Deputi Bidang Pengelolaan Lahan, Pesisir dan Reklamasi)
// Pihak Kedua: Amsakar Achmad (Kepala BP Batam)
// ============================================================================

export interface PerkinA3Metadata {
  nomor: string;
  tahun: number;
  tanggal: string;
  pihakPertama: string;
  jabatanPertama: string;
  pihakKedua: string;
  jabatanKedua: string;
  sasaranProgram: string;
  totalAnggaran: number;
  totalAnggaranFormatted: string;
  realisasiAnggaran: number;
  persentaseRealisasi: number;
  kegiatan: {
    no: number;
    nama: string;
    pagu: number;
    paguFormatted: string;
    realisasi: number;
    persen: number;
    satker: string;
  }[];
}

export const PERKIN_A3_METADATA: PerkinA3Metadata = {
  nomor: '1/KA/3/2025',
  tahun: 2025,
  tanggal: '13 Maret 2025',
  pihakPertama: 'Syarlin Joyo',
  jabatanPertama: 'Anggota/Deputi Bidang Pengelolaan Lahan, Pesisir dan Reklamasi',
  pihakKedua: 'Amsakar Achmad',
  jabatanKedua: 'Kepala Badan Pengusahaan Perdagangan Bebas dan Pelabuhan Bebas Batam',
  sasaranProgram: 'Meningkatnya Kualitas Pengelolaan Lahan, Pesisir dan Reklamasi di KPBPB Batam',
  totalAnggaran: 92503740000,
  totalAnggaranFormatted: 'Rp 92.503.740.000,-',
  realisasiAnggaran: 36850400000,
  persentaseRealisasi: 39.8,
  kegiatan: [
    {
      no: 1,
      nama: 'Pengelolaan dan Penyelenggaraan Pertanahan di Kawasan PBPB-Batam',
      pagu: 82609747000,
      paguFormatted: 'Rp 82.609.747.000,-',
      realisasi: 33120000000,
      persen: 40.1,
      satker: 'Direktorat Pengelolaan Lahan & Pesisir',
    },
    {
      no: 2,
      nama: 'Dukungan Manajemen Internal Pengelolaan dan Penyelenggaraan Pertanahan di Kawasan PBPB-Batam',
      pagu: 9893993000,
      paguFormatted: 'Rp 9.893.993.000,-',
      realisasi: 3730400000,
      persen: 37.7,
      satker: 'Pengendalian & Sekretariat Deputi',
    },
  ],
};

// ============================================================================
// 3 POINT INDIKATOR KINERJA PROGRAM (IKP UTAMA PERKIN A3)
// ============================================================================
export interface KpiPerkinA3Item {
  id: string;
  no: number;
  nama: string;
  target2025: number;
  satuan: string;
  realisasi: number;
  capaianPersen: number;
  status: 'TERCAPAI' | 'MEMENUHI' | 'PERLU_PERHATIAN';
  statusLabel: string;
  sasaranKegiatan: string;
  penjelasanOperasional: string;
  formula: string;
  jenisKonsolidasi: string;
  polarisasi: string;
  periodePelaporan: string;
  sumberData: string;
  satkerTerkait: string;
  highlightTrend: string;
  qBreakdown: { q1: number; q2: number; q3Target: number; q4Target: number };
}

export const PERKIN_A3_KPIS: KpiPerkinA3Item[] = [
  {
    id: 'ikp-1-lahan-investasi',
    no: 1,
    nama: 'Luas lahan yang dialokasikan untuk investasi',
    target2025: 200,
    satuan: 'Hektar',
    realisasi: 248.5,
    capaianPersen: 124.25,
    status: 'TERCAPAI',
    statusLabel: 'Melampaui Target (124,25%)',
    sasaranKegiatan: 'Meningkatnya kualitas pengelolaan lahan, pesisir dan reklamasi di KPBPB Batam',
    penjelasanOperasional:
      'Ukuran yang digunakan untuk mengevaluasi luas lahan yang dialokasikan untuk investasi dengan target yang ditentukan sesuai Kepka/SKPT yang telah diterbitkan.',
    formula: '(realisasi luas lahan yang dialokasikan untuk investasi / target luas lahan yang dialokasikan untuk investasi) x 100%',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Maret s.d Desember)',
    polarisasi: 'Maximize (semakin tinggi semakin baik)',
    periodePelaporan: 'Triwulan/Tahunan',
    sumberData: 'Direktorat Pengelolaan Lahan (Katalog Satu Data Item #14)',
    satkerTerkait: 'Direktorat Pengelolaan Lahan',
    highlightTrend: '+48,5 Ha di atas target tahunan (didukung alokasi KEK Nongsa & Kabil)',
    qBreakdown: { q1: 58.4, q2: 82.6, q3Target: 60.0, q4Target: 47.5 },
  },
  {
    id: 'ikp-2-pesisir-reklamasi',
    no: 2,
    nama: 'Luas izin pemanfaatan kawasan pesisir dan izin reklamasi untuk investasi',
    target2025: 150,
    satuan: 'Hektar',
    realisasi: 162.8,
    capaianPersen: 108.53,
    status: 'TERCAPAI',
    statusLabel: 'Tercapai Sangat Baik (108,53%)',
    sasaranKegiatan: 'Meningkatnya kualitas pengelolaan lahan, pesisir dan reklamasi di KPBPB Batam',
    penjelasanOperasional:
      'Ukuran yang digunakan untuk mengevaluasi luas izin pemanfaatan kawasan pesisir dan izin reklamasi untuk investasi dengan target yang ditentukan melalui verifikasi PKKPRL dan izin reklamasi.',
    formula: '(realisasi luas izin pemanfaatan dan reklamasi / target luas izin pemanfaatan dan reklamasi) x 100%',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Maret s.d Desember)',
    polarisasi: 'Maximize (semakin tinggi semakin baik)',
    periodePelaporan: 'Triwulan/Tahunan',
    sumberData: 'Direktorat Pengelolaan Kawasan Pesisir dan Reklamasi (Katalog Satu Data Item #4)',
    satkerTerkait: 'Direktorat Pengelolaan Kawasan Pesisir dan Reklamasi',
    highlightTrend: '162,8 Ha izin PKKPRL & Reklamasi terbit tepat waktu (Tanjung Sauh & Batam Timur)',
    qBreakdown: { q1: 42.1, q2: 56.4, q3Target: 38.0, q4Target: 26.3 },
  },
  {
    id: 'ikp-3-pengawasan-pengendalian',
    no: 3,
    nama: 'Persentase keberhasilan pengawasan dan pengendalian lahan, pesisir, dan reklamasi',
    target2025: 80,
    satuan: '%',
    realisasi: 93.8,
    capaianPersen: 117.25,
    status: 'TERCAPAI',
    statusLabel: 'Kepatuhan Tinggi (117,25% dari target)',
    sasaranKegiatan: 'Meningkatnya kualitas pengelolaan lahan, pesisir dan reklamasi di KPBPB Batam',
    penjelasanOperasional:
      'Ukuran yang digunakan untuk mengevaluasi persentase keberhasilan pengawasan dan pengendalian lahan, pesisir dan reklamasi dibandingkan dengan target yang ditentukan (kepatuhan SP-1 s.d SP-3 dan rekuperasi lahan mangkrak).',
    formula: '(realisasi keberhasilan pengawasan dan pengendalian / target persentase keberhasilan pengawasan dan pengendalian) x 100%',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Maret s.d Desember)',
    polarisasi: 'Maximize (semakin tinggi semakin baik)',
    periodePelaporan: 'Triwulan/Tahunan',
    sumberData: 'Direktorat Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi (Katalog Satu Data Item #1)',
    satkerTerkait: 'Direktorat Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi',
    highlightTrend: '422 dari 450 objek berhasil diawasi; 94,6 Ha lahan mangkrak berhasil direkuperasi',
    qBreakdown: { q1: 89.2, q2: 93.8, q3Target: 85.0, q4Target: 80.0 },
  },
];

// ============================================================================
// RINGKASAN METRIK KONSOLIDASI & SPASIAL (REFRENSI USER & SATU DATA)
// ============================================================================
export const LAHAN_KAWASAN_SUMMARY = {
  totalLuasLahanHa: 41500,
  lahanTersediaHa: 9200,
  lahanAlokasiHa: 24800,
  lahanProduktifHa: 17450,
  lahanIdleHa: 3670,
  lahanSengketaHa: 1830,
  idleLandRatio: 14.8, // Target < 10%
  utilisasiKawasanPersen: 74.2, // Optimal > 80%
  kasusAktifKonflik: 63,
  kasusSelesaiKonflik: 52,
  dampakInvestasiT: 12.4, // Rp 12,4 Triliun
  potensiPnbpM: 714.0, // Rp 714 Miliar
};

// ============================================================================
// SUB-WILAYAH PENGEMBANGAN (SWP / WPP) KOTA BATAM
// ============================================================================
export interface SwpOverviewItem {
  id: string;
  kode: string;
  nama: string;
  fokusInvestasi: string;
  luasWilayahHa: number;
  luasTersediaHa: number;
  persilSiapPakai: number;
  utilisasiPersen: number;
  tingkatKesiapan: 'Sangat Tinggi' | 'Tinggi' | 'Sedang';
  statusKawasan: string;
}

export const SWP_OVERVIEW_LIST: SwpOverviewItem[] = [
  {
    id: 'swp-batam-centre',
    kode: 'SWP I',
    nama: 'Batam Centre',
    fokusInvestasi: 'Pusat Bisnis, Finansial & High-Rise Komersial',
    luasWilayahHa: 84.5,
    luasTersediaHa: 24.5,
    persilSiapPakai: 118,
    utilisasiPersen: 81.0,
    tingkatKesiapan: 'Sangat Tinggi',
    statusKawasan: 'Core City / Urban',
  },
  {
    id: 'swp-nongsa',
    kode: 'SWP II',
    nama: 'Nongsa & Sambau',
    fokusInvestasi: 'KEK Digital Park, Hyperscale Data Center & Marina Luxury',
    luasWilayahHa: 245.2,
    luasTersediaHa: 86.4,
    persilSiapPakai: 72,
    utilisasiPersen: 82.5,
    tingkatKesiapan: 'Sangat Tinggi',
    statusKawasan: 'KEK Nongsa Digital',
  },
  {
    id: 'swp-kabil',
    kode: 'SWP III',
    nama: 'Kabil Industrial',
    fokusInvestasi: 'Zona Industri Berat, Fabrikasi Lepas Pantai & Clean Energy Hub',
    luasWilayahHa: 310.5,
    luasTersediaHa: 94.0,
    persilSiapPakai: 80,
    utilisasiPersen: 78.6,
    tingkatKesiapan: 'Tinggi',
    statusKawasan: 'Industri Terpadu',
  },
  {
    id: 'swp-batu-ampar',
    kode: 'SWP IV',
    nama: 'Batu Ampar Port Hub',
    fokusInvestasi: 'Logistik Multimoda, Depo Peti Kemas & Gudang Berikat Maritim',
    luasWilayahHa: 32.4,
    luasTersediaHa: 8.2,
    persilSiapPakai: 38,
    utilisasiPersen: 76.2,
    tingkatKesiapan: 'Sangat Tinggi',
    statusKawasan: 'Pelabuhan Utama',
  },
  {
    id: 'swp-sekupang',
    kode: 'SWP V',
    nama: 'Sekupang & Marina',
    fokusInvestasi: 'KEK Pariwisata & Kesehatan Internasional RSBP Batam',
    luasWilayahHa: 128.6,
    luasTersediaHa: 34.2,
    persilSiapPakai: 94,
    utilisasiPersen: 72.4,
    tingkatKesiapan: 'Tinggi',
    statusKawasan: 'KEK Pariwisata Kesehatan',
  },
  {
    id: 'swp-tanjung-uncang',
    kode: 'SWP VI',
    nama: 'Tanjung Uncang',
    fokusInvestasi: 'Galangan Kapal (Shipyard), Dry Dock & Industri Perakitan Baja',
    luasWilayahHa: 195.0,
    luasTersediaHa: 68.5,
    persilSiapPakai: 62,
    utilisasiPersen: 69.4,
    tingkatKesiapan: 'Sedang',
    statusKawasan: 'Shipyard Maritime Zone',
  },
  {
    id: 'swp-rempang-galang',
    kode: 'SWP VII',
    nama: 'Rempang & Galang',
    fokusInvestasi: 'Pengembangan Rempang Eco-City Strategis & Cadangan Wilayah',
    luasWilayahHa: 1250.0,
    luasTersediaHa: 680.0,
    persilSiapPakai: 165,
    utilisasiPersen: 41.2,
    tingkatKesiapan: 'Sedang',
    statusKawasan: 'PSN Rempang Eco-City',
  },
];

// ============================================================================
// ALOKASI LAHAN INVESTASI TERBARU (Q2 BERJALAN)
// ============================================================================
export interface AlokasiTerbaruItem {
  id: string;
  kodePl: string;
  namaProyek: string;
  sektor: string;
  swp: string;
  luasHa: number;
  nilaiInvestasiT: number;
  status: 'FINALIZED' | 'PROSES' | 'REVIEW';
  potensiPnbpM: number;
  tglTerbit: string;
}

export const ALOKASI_TERBARU_LIST: AlokasiTerbaruItem[] = [
  {
    id: 'pl-01',
    kodePl: 'PL#2026-001',
    namaProyek: 'Hyperscale Data Center Campus III',
    sektor: 'Teknologi & Digital',
    swp: 'Nongsa Digital Park',
    luasHa: 45.0,
    nilaiInvestasiT: 4.8,
    status: 'FINALIZED',
    potensiPnbpM: 142.5,
    tglTerbit: '18 Februari 2026',
  },
  {
    id: 'pl-02',
    kodePl: 'PL#2026-002',
    namaProyek: 'Integrated Logistics & Cold Chain Plaza',
    sektor: 'Logistik & Pergudangan',
    swp: 'Batu Ampar & Kabil',
    luasHa: 28.0,
    nilaiInvestasiT: 1.6,
    status: 'PROSES',
    potensiPnbpM: 88.0,
    tglTerbit: '05 Maret 2026',
  },
  {
    id: 'pl-03',
    kodePl: 'PL#2026-003',
    namaProyek: 'Batam Green Solar Farm & BESS 250MW',
    sektor: 'Energi Terbarukan',
    swp: 'Kabil / Tembesi DTA',
    luasHa: 110.0,
    nilaiInvestasiT: 5.2,
    status: 'REVIEW',
    potensiPnbpM: 198.5,
    tglTerbit: '12 April 2026',
  },
  {
    id: 'pl-04',
    kodePl: 'PL#2026-004',
    namaProyek: 'Offshore Wind & Subsea Cable Terminal',
    sektor: 'Maritim & Energi',
    swp: 'Tanjung Sauh / Pesisir Timur',
    luasHa: 65.5,
    nilaiInvestasiT: 2.9,
    status: 'FINALIZED',
    potensiPnbpM: 115.0,
    tglTerbit: '22 April 2026',
  },
];

// ============================================================================
// 3 UNIT KERJA PELAKSANA BIDANG PENGELOLAAN LAHAN, PESISIR & REKLAMASI
// ============================================================================
export interface UnitPilarLahanItem {
  id: string;
  kode: string;
  nama: string;
  namaPendek: string;
  pejabat: string;
  paguDipa: number;
  paguFormatted: string;
  realisasiDipa: number;
  persenSerapan: number;
  jumlahDataset: number;
  halamanPdf: string;
  deskripsi: string;
  highlightMetrics: { label: string; value: string; subtext: string }[];
  keyCapabilities: string[];
}

export const UNIT_PILAR_LAHAN: UnitPilarLahanItem[] = [
  {
    id: 'dit-lahan',
    kode: 'DPL',
    nama: 'Direktorat Pengelolaan Pertanahan',
    namaPendek: 'Pengelolaan Pertanahan',
    pejabat: 'Direktur Pengelolaan Pertanahan',
    paguDipa: 48200000000,
    paguFormatted: 'Rp 48,20 Miliar',
    realisasiDipa: 19850000000,
    persenSerapan: 41.2,
    jumlahDataset: 15,
    halamanPdf: 'Halaman 6 - 8 (15 Dataset)',
    deskripsi:
      'Direktorat Pengelolaan Pertanahan (sebelumnya Direktorat Pengelolaan Lahan) bertugas menyelenggarakan 11 layanan permohonan pertanahan (SKPT, SK Pengelolaan, Pecah/Revisi PL, Perpanjangan Hak, PNBP UWT) dan ketersediaan lahan SWP Batam.',
    highlightMetrics: [
      { label: 'Realisasi Alokasi', value: '248,5 Ha', subtext: 'Target 200 Ha (124,25%)' },
      { label: 'Layanan SKPT & SPPT', value: '3.420 Berkas', subtext: 'SLA Tepat Waktu 91.8%' },
      { label: 'Pendapatan PNBP UWT', value: 'Rp 714 M', subtext: '84% dari target tahunan' },
    ],
    keyCapabilities: [
      'Penerbitan SKPT & SPPT Baru vs Perubahan (DS #1 & #2)',
      'Pecah PL & Revisi PL (DS #3 & #4)',
      'Hak Tanggungan & Dokumen Pengganti (DS #7 & #8)',
      'Peralihan & Perpanjangan Hak Atas Tanah (DS #9 & #13)',
      'Lahan Tersedia Sub Wilayah Pengembangan / SWP (DS #15)',
    ],
  },
  {
    id: 'dit-pesisir-reklamasi',
    kode: 'DPKPR',
    nama: 'Direktorat Pengelolaan Kawasan Pesisir dan Reklamasi',
    namaPendek: 'Pesisir & Reklamasi',
    pejabat: 'Direktur Pengelolaan Kawasan Pesisir dan Reklamasi',
    paguDipa: 21500000000,
    paguFormatted: 'Rp 21,50 Miliar',
    realisasiDipa: 8120000000,
    persenSerapan: 37.8,
    jumlahDataset: 4,
    halamanPdf: 'Halaman 13 - 14 (4 Dataset)',
    deskripsi:
      'Bertanggung jawab atas verifikasi perizinan pemanfaatan ruang laut PKKPRL, izin reklamasi untuk investasi, rencana zonasi spasial pesisir, dan penyelesaian konflik sempadan.',
    highlightMetrics: [
      { label: 'Luas Izin Terbit', value: '162,8 Ha', subtext: 'Target 150 Ha (108,53%)' },
      { label: 'SLA Tepat Waktu', value: '92,4%', subtext: '146 dari 158 perizinan' },
      { label: 'Penyelesaian Masalah', value: '88,6%', subtext: '70 dari 79 kasus tuntas' },
    ],
    keyCapabilities: [
      'Luas Izin Investasi Pesisir & Reklamasi (DS #4)',
      'Persentase Perizinan Selesai Tepat Waktu (DS #3)',
      'Penyelesaian Permasalahan Pesisir & Reklamasi (DS #1)',
      'Rencana Pemanfaatan Wilayah Pesisir Spasial (DS #2)',
      'Sheet Swap Rencana Zonasi vs Realisasi Reklamasi',
    ],
  },
  {
    id: 'dit-pengendalian-lahan',
    kode: 'DP2LPR',
    nama: 'Direktorat Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi',
    namaPendek: 'Pengendalian Lahan',
    pejabat: 'Direktur Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi',
    paguDipa: 22803740000,
    paguFormatted: 'Rp 22,80 Miliar',
    realisasiDipa: 8880400000,
    persenSerapan: 38.9,
    jumlahDataset: 4,
    halamanPdf: 'Halaman 11 (4 Dataset)',
    deskripsi:
      'Melaksanakan pengawasan kepatuhan pemanfaatan tanah dan ruang pesisir, evaluasi pembatalan alokasi terlantar (SP 1-3 & Rekuperasi), penataan BAPL, dan rekomendasi pembaruan alokasi.',
    highlightMetrics: [
      { label: 'Tingkat Keberhasilan', value: '93,8%', subtext: 'Target 80% (Melampaui Target)' },
      { label: 'Rekuperasi Lahan', value: '94,6 Ha', subtext: 'Dikembalikan ke Bank Tanah BP Batam' },
      { label: 'Objek Diawasi', value: '422 Objek', subtext: 'Lahan Darat, Pesisir & Reklamasi' },
    ],
    keyCapabilities: [
      'Keberhasilan Pengawasan Kewajiban Pemanfaatan (DS #1)',
      'Tindakan Evaluasi & Pembatalan Alokasi Mangkrak (DS #2)',
      'Pelaksanaan Dokumentasi BAPL Lapangan (DS #3)',
      'Rekomendasi Perpanjangan & Pembaruan Alokasi (DS #4)',
      'Pipeline Penertiban SP 1, SP 2, SP 3 hingga SK Pembatalan',
    ],
  },
  {
    id: 'dit-lingkungan-hidup',
    kode: 'DLHK',
    nama: 'Direktorat Lingkungan Hidup dan Kehutanan',
    namaPendek: 'Lingkungan & Kehutanan',
    pejabat: 'Direktur Lingkungan Hidup dan Kehutanan',
    paguDipa: 0,
    paguFormatted: 'Rp 0 Miliar',
    realisasiDipa: 0,
    persenSerapan: 0,
    jumlahDataset: 0,
    halamanPdf: 'Atribut Dikosongkan',
    deskripsi:
      'Unit kerja pengampu pengelolaan kelestarian lingkungan hidup, tata kelola kawasan hutan, dan keberlanjutan ekosistem di kawasan KPBPB Batam.',
    highlightMetrics: [
      { label: 'Status Integrasi', value: 'Dikosongkan', subtext: 'Sesuai Arahan Perkin' },
      { label: 'Dataset Aktif', value: '0 DS', subtext: 'Menunggu Pemetaan' },
      { label: 'Visualisasi', value: 'Standby', subtext: 'Siap Integrasi Data' },
    ],
    keyCapabilities: [
      'Pengelolaan Kelestarian Lingkungan Hidup',
      'Tata Kelola & Konservasi Kawasan Hutan',
      'Pengawasan Kepatuhan Lingkungan AMDAL / UKL-UPL',
      'Keberlanjutan Ekosistem Spasial Kawasan Batam',
    ],
  },
];
