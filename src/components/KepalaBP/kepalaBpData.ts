// Data Resmi Perjanjian Kinerja Tahun 2026
// Nomor: 1/SPJ/KA/1/2026
// Pejabat: Amsakar Achmad - Kepala Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam
// Batam, 30 Januari 2026

export interface ProgramAnggaranPerkin {
  id: number;
  namaProgram: string;
  paguAnggaran: number; // Rupiah
  realisasiAnggaran: number; // Rupiah
  persenSerapan: number;
  penanggungJawab: string;
}

export interface IksPerkinItem {
  id: string;
  nomor: number;
  sasaranStrategis: string;
  indikatorKinerjaStrategis: string;
  target: string;
  targetNumeric: number;
  satuan: string;
  realisasiYtd: number;
  persenCapaian: number;
  statusCapaian: 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  predikat: string;
  formulaRingkas: string;
  sumberData: string;
  periodePelaporan: 'Triwulan/Tahunan' | 'Tahunan' | 'Triwulan';
  polarisasi: 'Maximize';
  jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)';
  deskripsi: string;
}

export interface TrenInvestasiTahunan {
  tahun: number;
  target: number; // Triliun Rupiah
  realisasiTotal: number; // Triliun Rupiah
  modalTetap: number; // Triliun Rupiah (KPU Bea Cukai)
  modalLancar: number; // Triliun Rupiah (KPU BC & BPS)
  pma: number; // Triliun Rupiah
  pmdn: number; // Triliun Rupiah
  jumlahProyek: number;
  tenagaKerja: number; // Jiwa
}

export interface KontribusiInvestasiKek {
  kawasan: string;
  tipe: 'KEK' | 'Non-KEK (KPBPB)';
  target2026: number; // Miliar Rupiah
  realisasi2026: number; // Miliar Rupiah
  persen: number;
  proyek: number;
  bidang: string;
  status: string;
}

export interface LokusIkmItem {
  no: number;
  lokus: string;
  namaLokus: string;
  target: number;
  skorIkm: number;
  mutuPelayanan: 'A' | 'B' | 'C' | 'D';
  predikat: 'Sangat Baik' | 'Baik' | 'Kurang Baik' | 'Tidak Baik';
  jumlahResponden: number;
  persenResponSangatPuas: number;
  unsurTerlemah: string;
  unsurTerkuat: string;
}

export interface PnbpSatkerPenghasil {
  no: number;
  namaSatker: string;
  kategori: 'Unit Kerja Penghasil' | 'Badan Usaha';
  targetPnbpJuta: number; // Juta Rupiah (Sesuai Tabel Halaman 5 PDF)
  targetPersen: number; // % terhadap total 2,447 T
  realisasiPnbpJuta: number; // Juta Rupiah YTD
  persenCapaian: number; // %
  keterangan: string;
}

export interface ReformasiBirokrasiArea {
  kode: string;
  aspek: string;
  bobot: number;
  targetNilai: number;
  capaianNilai: number;
  predikat: string;
  fokusImplementasi: string;
}

// 1. DOKUMEN PERJANJIAN KINERJA KEPALA BP 2026
export const DOKUMEN_PERKIN_KEPALA = {
  nomor: '1/SPJ/KA/1/2026',
  tahun: 2026,
  namaKepala: 'Amsakar Achmad',
  jabatan: 'Kepala Badan Pengusahaan Kawasan Perdagangan Bebas Dan Pelabuhan Bebas Batam',
  tanggalPenetapan: '30 Januari 2026',
  tempat: 'Batam',
  pernyataan:
    'Dalam rangka mewujudkan manajemen pemerintahan yang efektif, transparan dan akuntabel serta berorientasi pada hasil, kami berjanji akan mewujudkan target kinerja yang seharusnya sesuai lampiran perjanjian ini, dalam rangka mencapai target kinerja jangka menengah seperti yang telah ditetapkan dalam dokumen perencanaan.',
};

// 2. DUA PROGRAM UTAMA & ANGGARAN (HALAMAN 2 PDF)
export const PROGRAM_ANGGARAN_PERKIN: ProgramAnggaranPerkin[] = [
  {
    id: 1,
    namaProgram: 'Program Pengembangan Kawasan Strategis',
    paguAnggaran: 1428920480000, // Rp 1.428.920.480.000,-
    realisasiAnggaran: 1091695246720,
    persenSerapan: 76.4,
    penanggungJawab: 'Dit. Pembangunan Infrastruktur, Dit. Pelabuhan, Dit. Bandara, Dit. KEK & Lahan',
  },
  {
    id: 2,
    namaProgram: 'Program Dukungan Manajemen',
    paguAnggaran: 1099028050000, // Rp 1.099.028.050.000,-
    realisasiAnggaran: 870430215600,
    persenSerapan: 79.2,
    penanggungJawab: 'Biro Keuangan, Biro SDM, Biro Umum, BOKMR, Biro Hukum, dan PDSI',
  },
];

export const TOTAL_PAGU_ANGGARAN_PERKIN = 2527948530000; // Rp 2.527.948.530.000,-

// 3. EMPAT INDIKATOR KINERJA STRATEGIS (IKS) - SESUAI MANUAL HALAMAN 2 - 6
export const EMPAT_IKS_KEPALA_BP: IksPerkinItem[] = [
  {
    id: 'iks-1',
    nomor: 1,
    sasaranStrategis: 'Meningkatnya Realisasi Investasi di KPBPB Batam',
    indikatorKinerjaStrategis: 'Nilai Realisasi Investasi di KPBPB Batam',
    target: 'Rp. 70 T',
    targetNumeric: 70.0, // Triliun
    satuan: 'Triliun Rupiah',
    realisasiYtd: 54.68, // Triliun
    persenCapaian: 78.11,
    statusCapaian: 'On Track',
    predikat: 'Sangat Baik (Proyeksi Akhir Tahun 72.4 T / 103.4%)',
    formulaRingkas: 'Modal Tetap (KPU Bea Cukai) + Modal Lancar (KPU Bea Cukai + BPS Kota Batam)',
    sumberData:
      'Direktorat Pengembangan KPBPB Batam dan KEK, Kantor Pelayanan Utama Bea dan Cukai Batam, dan Badan Pusat Statistik Kota Batam',
    periodePelaporan: 'Triwulan/Tahunan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Jumlah keseluruhan investasi yang masuk ke KPBPB Batam berupa Modal Tetap dan Modal Lancar dari PMA dan PMDN dalam periode satu tahun dibandingkan target Rp 70 T.',
  },
  {
    id: 'iks-2',
    nomor: 2,
    sasaranStrategis: 'Meningkatnya Kualitas Pengelolaan Kawasan dan Pelayanan Umum BP Batam',
    indikatorKinerjaStrategis: 'Indeks Kepuasan Masyarakat Pengguna Layanan Umum dan Kawasan',
    target: '88,00',
    targetNumeric: 88.0,
    satuan: 'Skala 1 - 100',
    realisasiYtd: 88.42,
    persenCapaian: 100.48,
    statusCapaian: 'Tercapai',
    predikat: 'Sangat Baik (Mutu Pelayanan A / Mempedomani PermenPAN-RB No. 14/2017)',
    formulaRingkas: 'Rerata Tertimbang 9 Unsur SKM pada 5 Lokus Layanan Utama BP Batam',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    periodePelaporan: 'Tahunan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Hasil pengukuran survei kepuasan masyarakat skala 1-100 pada 5 lokus: PTSP, BUP Pelabuhan, Pengelolaan Pertanahan, BURS RSBP, dan BU SPAM/Fasling/Rusun.',
  },
  {
    id: 'iks-3',
    nomor: 3,
    sasaranStrategis: 'Meningkatnya Kualitas Pengelolaan Kawasan dan Pelayanan Umum BP Batam',
    indikatorKinerjaStrategis: 'Nilai Realisasi PNBP BP Batam',
    target: '2,447 T',
    targetNumeric: 2447.788, // Miliar (2.447.788 Juta Rp)
    satuan: 'Triliun Rupiah',
    realisasiYtd: 1892.45, // Miliar (Rp 1,892 T)
    persenCapaian: 77.31,
    statusCapaian: 'On Track',
    predikat: 'Sangat Baik (Proyeksi 2,510 T / 102.5%)',
    formulaRingkas: 'Σ(Realisasi PNBP 2026 10 Unit Kerja) / Σ(Target PNBP 2026 Rp 2,447 T) × 100%',
    sumberData: 'Biro Keuangan BP Batam',
    periodePelaporan: 'Triwulan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Pendapatan imbalan layanan masyarakat BLU (jasa pelabuhan, bandara, sewa tanah UWT, air SPAM, rusun, RSBP, dsb) tidak termasuk RM APBN. Target Renstra Rp 2,447 T.',
  },
  {
    id: 'iks-4',
    nomor: 4,
    sasaranStrategis: 'Terwujudnya Pengelolaan Organisasi BP Batam yang Efektif, Efisien dan Akuntabel',
    indikatorKinerjaStrategis: 'Indeks Reformasi Birokrasi',
    target: '80 (BB / Sangat Baik)',
    targetNumeric: 80.0,
    satuan: 'Skor Indeks (Skala 100)',
    realisasiYtd: 81.35,
    persenCapaian: 101.69,
    statusCapaian: 'Tercapai',
    predikat: 'Memuaskan (Predikat A / Mengacu SE MenPAN-RB No. 6/2025)',
    formulaRingkas: 'Penilaian Mandiri & Verifikasi KemenPAN-RB atas RB General & RB Tematik BP Batam',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    periodePelaporan: 'Triwulan',
    polarisasi: 'Maximize',
    jenisKonsolidasi: 'Take Last Known (Akumulasi Jan s.d Des)',
    deskripsi:
      'Tingkat keberhasilan reformasi tata kelola institusi, transparansi, akuntabilitas SAKIP, maturitas SPIP, digitalisasi SPBE, dan dampak kemiskinan/investasi.',
  },
];

// 4. DATASET IKS-1: TREN REALISASI INVESTASI TAHUN KE TAHUN (2020 - 2026)
export const TREN_INVESTASI_TAHUNAN: TrenInvestasiTahunan[] = [
  {
    tahun: 2020,
    target: 35.0,
    realisasiTotal: 34.2,
    modalTetap: 22.4,
    modalLancar: 11.8,
    pma: 24.6,
    pmdn: 9.6,
    jumlahProyek: 1120,
    tenagaKerja: 14200,
  },
  {
    tahun: 2021,
    target: 40.0,
    realisasiTotal: 41.5,
    modalTetap: 27.8,
    modalLancar: 13.7,
    pma: 29.8,
    pmdn: 11.7,
    jumlahProyek: 1285,
    tenagaKerja: 16800,
  },
  {
    tahun: 2022,
    target: 48.0,
    realisasiTotal: 50.4,
    modalTetap: 33.6,
    modalLancar: 16.8,
    pma: 36.2,
    pmdn: 14.2,
    jumlahProyek: 1490,
    tenagaKerja: 19400,
  },
  {
    tahun: 2023,
    target: 56.0,
    realisasiTotal: 58.7,
    modalTetap: 38.9,
    modalLancar: 19.8,
    pma: 42.1,
    pmdn: 16.6,
    jumlahProyek: 1640,
    tenagaKerja: 22800,
  },
  {
    tahun: 2024,
    target: 63.0,
    realisasiTotal: 65.2,
    modalTetap: 43.1,
    modalLancar: 22.1,
    pma: 46.8,
    pmdn: 18.4,
    jumlahProyek: 1810,
    tenagaKerja: 26300,
  },
  {
    tahun: 2025,
    target: 67.0,
    realisasiTotal: 68.8,
    modalTetap: 45.4,
    modalLancar: 23.4,
    pma: 49.3,
    pmdn: 19.5,
    jumlahProyek: 1950,
    tenagaKerja: 28900,
  },
  {
    tahun: 2026,
    target: 70.0, // TARGET RESMI PERKIN
    realisasiTotal: 54.68, // Realisasi Berjalan Q1-Q3
    modalTetap: 36.25,
    modalLancar: 18.43,
    pma: 39.42,
    pmdn: 15.26,
    jumlahProyek: 1620,
    tenagaKerja: 24150,
  },
];

// DATASET IKS-1: KONTRIBUSI KAWASAN KEK & NON-KEK DI KPBPB BATAM (SUMBER DIT. KEK)
export const KONTRIBUSI_KEK_KPBPB: KontribusiInvestasiKek[] = [
  {
    kawasan: 'KEK Batam Aero Technic (BAT)',
    tipe: 'KEK',
    target2026: 2800,
    realisasi2026: 2240,
    persen: 80.0,
    proyek: 14,
    bidang: 'MRO Pesawat, Komponen Turbin, & Hanggar Aviasi',
    status: 'Beroperasi Komersial',
  },
  {
    kawasan: 'KEK Nongsa Digital Park (NDP)',
    tipe: 'KEK',
    target2026: 4200,
    realisasi2026: 3580,
    persen: 85.2,
    proyek: 26,
    bidang: 'Data Center Tier III/IV, Animasi, Software & AI Hub',
    status: 'Beroperasi Komersial',
  },
  {
    kawasan: 'KEK Pariwisata & Kesehatan Internasional Batam (Sekupang)',
    tipe: 'KEK',
    target2026: 1800,
    realisasi2026: 1390,
    persen: 77.2,
    proyek: 8,
    bidang: 'Hospitality Medis, Spesialisasi Jantung & Wisata Kesehatan',
    status: 'Tahap Konstruksi & Operasional Sebagian',
  },
  {
    kawasan: 'KEK Tanjung Sauh (Pelepasan Gas & Logistik Energi)',
    tipe: 'KEK',
    target2026: 2200,
    realisasi2026: 1880,
    persen: 85.5,
    proyek: 5,
    bidang: 'Pelabuhan Transhipment, Industri Hilirisasi & Pembangkit Listrik',
    status: 'Tahap Penetapan & Pembangunan Kawasan',
  },
  {
    kawasan: 'Kawasan Industri Mukakuning & Batamindo',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 18500,
    realisasi2026: 15120,
    persen: 81.7,
    proyek: 112,
    bidang: 'Semikonduktor, Komponen Elektronik & Otomasi',
    status: 'Kawasan Industri Terpadu KPBPB',
  },
  {
    kawasan: 'Kawasan Maritim Galangan Kapal Batu Ampar & Tanjung Uncang',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 16500,
    realisasi2026: 12840,
    persen: 77.8,
    proyek: 84,
    bidang: 'Galangan Kapal, Offshore Rig, & Konstruksi Fabrikasi Baja',
    status: 'Kawasan Industri Maritim KPBPB',
  },
  {
    kawasan: 'Kawasan Kabil Integrated Industrial Estate & Citra Buana',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 14000,
    realisasi2026: 10980,
    persen: 78.4,
    proyek: 76,
    bidang: 'Pipa Migas, Logistik Alat Berat, Kimia & Pergudangan Modern',
    status: 'Kawasan Industri Terpadu KPBPB',
  },
  {
    kawasan: 'Zona Perdagangan Bebas, Pariwisata & Jasa Komersial Kota',
    tipe: 'Non-KEK (KPBPB)',
    target2026: 10000,
    realisasi2026: 6650,
    persen: 66.5,
    proyek: 142,
    bidang: 'Perhotelan, Mall, Residensial, & Layanan Perdagangan Bebas',
    status: 'Zona Jasa & Komersial KPBPB',
  },
];

// DATASET SEKTOR INVESTASI UNGGULAN
export const SEKTOR_INVESTASI_DATA = [
  { nama: 'Elektronik & Semikonduktor', nilaiT: 19.8, persen: 36.2, warna: '#2563EB', naker: 9800 },
  { nama: 'Pusat Data & Infrastruktur Digital', nilaiT: 10.4, persen: 19.0, warna: '#7C3AED', naker: 2450 },
  { nama: 'Galangan Kapal & Offshore Maritim', nilaiT: 8.9, persen: 16.3, warna: '#059669', naker: 6100 },
  { nama: 'Mesin Presisi & Alat Berat', nilaiT: 6.2, persen: 11.3, warna: '#D97706', naker: 2850 },
  { nama: 'Pariwisata & Hospitaliti Medis', nilaiT: 5.1, persen: 9.3, warna: '#DB2777', naker: 1750 },
  { nama: 'Industri Kimia, Farmasi & Logistik', nilaiT: 4.28, persen: 7.9, warna: '#0284C7', naker: 1200 },
];

// 5. DATASET IKS-2: INDEKS KEPUASAN MASYARAKAT (IKM) 5 LOKUS SURVEI (HALAMAN 4 PDF)
export const LOKUS_IKM_DATA: LokusIkmItem[] = [
  {
    no: 1,
    lokus: 'PTSP',
    namaLokus: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
    target: 88.0,
    skorIkm: 89.42,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 1420,
    persenResponSangatPuas: 91.5,
    unsurTerlemah: 'Kecepatan Waktu Layanan Izin Kompleks',
    unsurTerkuat: 'Sikap Ramah & Integritas Petugas Frontliner',
  },
  {
    no: 2,
    lokus: 'BUP',
    namaLokus: 'Direktorat Pengelolaan Kepelabuhanan (BUP)',
    target: 88.0,
    skorIkm: 88.65,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 980,
    persenResponSangatPuas: 89.2,
    unsurTerlemah: 'Kemudahan Sandar Kapal Peak Season',
    unsurTerkuat: 'Kejelasan Tarif Jasa Labuh Tambat',
  },
  {
    no: 3,
    lokus: 'DPL',
    namaLokus: 'Direktorat Pengelolaan Pertanahan (Lahan)',
    target: 88.0,
    skorIkm: 87.24,
    mutuPelayanan: 'B',
    predikat: 'Baik',
    jumlahResponden: 1650,
    persenResponSangatPuas: 85.8,
    unsurTerlemah: 'SLA Penerbitan Revisi PL & Hak Atas Tanah',
    unsurTerkuat: 'Transparansi Layanan Loket Land Management System',
  },
  {
    no: 4,
    lokus: 'BURS',
    namaLokus: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    target: 88.0,
    skorIkm: 88.92,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 2100,
    persenResponSangatPuas: 90.4,
    unsurTerlemah: 'Waktu Tunggu Antrian Farmasi Poliklinik',
    unsurTerkuat: 'Fasilitas Kamar Inap & Penanganan Dokter Spesialis',
  },
  {
    no: 5,
    lokus: 'BUSPAM',
    namaLokus: 'Badan Usaha SPAM, Fasilitas dan Lingkungan (Rusun)',
    target: 88.0,
    skorIkm: 87.88,
    mutuPelayanan: 'B',
    predikat: 'Baik',
    jumlahResponden: 1240,
    persenResponSangatPuas: 86.7,
    unsurTerlemah: 'Respon Cepat Keluhan Gangguan Air Pipa Tertentu',
    unsurTerkuat: 'Kemudahan Pembayaran Tagihan Online & Sewa Rusun',
  },
];

// STANDAR KUALITATIF IKM SESUAI PERMENPAN-RB 14/2017 (HALAMAN 4 PDF)
export const STANDAR_IKM_PERMENPAN = [
  { rentang: '88,31 – 100,00', mutu: 'A', predikat: 'Sangat Baik', warna: '#059669', bg: 'bg-emerald-50 text-emerald-800' },
  { rentang: '76,61 – 88,30', mutu: 'B', predikat: 'Baik', warna: '#2563EB', bg: 'bg-blue-50 text-blue-800' },
  { rentang: '65,00 – 76,60', mutu: 'C', predikat: 'Kurang Baik', warna: '#D97706', bg: 'bg-amber-50 text-amber-800' },
  { rentang: '25,00 – 64,99', mutu: 'D', predikat: 'Tidak Baik', warna: '#DC2626', bg: 'bg-rose-50 text-rose-800' },
];

// 6. DATASET IKS-3: TARGET & REALISASI PNBP 10 SATKER PENGHASIL (HALAMAN 5 PDF)
// Diurutkan sesuai tabel resmi Perkin Halaman 5
export const TABEL_TARGET_PNBP_PERKIN: PnbpSatkerPenghasil[] = [
  // Unit Kerja Penghasil
  {
    no: 1,
    namaSatker: 'Biro Keuangan',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 46720.87,
    targetPersen: 1.9,
    realisasiPnbpJuta: 38450.2,
    persenCapaian: 82.3,
    keterangan: 'Jasa giro perbankan, bunga deposito kas BLU, dan denda keterlambatan.',
  },
  {
    no: 2,
    namaSatker: 'Direktorat Pengelolaan Pertanahan',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 964304.32,
    targetPersen: 39.52,
    realisasiPnbpJuta: 748210.4,
    persenCapaian: 77.59,
    keterangan: 'Pemberian Uang Wajib Tahunan (UWT) Baru, Perpanjangan, Peralihan, dan Pecah PL.',
  },
  {
    no: 3,
    namaSatker: 'Direktorat Pembangunan Infrastruktur',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 8854.66,
    targetPersen: 0.37,
    realisasiPnbpJuta: 7120.15,
    persenCapaian: 80.41,
    keterangan: 'Izin pemanfaatan ROW utilitas pipa/kabel dan izin ROW penghijauan tanaman.',
  },
  {
    no: 4,
    namaSatker: 'Direktorat Lalu Lintas Barang',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 2371.25,
    targetPersen: 0.1,
    realisasiPnbpJuta: 1940.8,
    persenCapaian: 81.85,
    keterangan: 'Pemberian rekomendasi dan izin lalu lintas barang industri & perdagangan.',
  },
  {
    no: 5,
    namaSatker: 'Pusat Data dan Sistem Informasi (PDSI)',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 13494.63,
    targetPersen: 0.6,
    realisasiPnbpJuta: 10850.5,
    persenCapaian: 80.41,
    keterangan: 'Sewa rak co-location data center, link FO, dan layanan komputasi cloud.',
  },
  {
    no: 6,
    namaSatker: 'Kantor Penghubung Jakarta',
    kategori: 'Unit Kerja Penghasil',
    targetPnbpJuta: 925.97,
    targetPersen: 0.04,
    realisasiPnbpJuta: 745.2,
    persenCapaian: 80.48,
    keterangan: 'Pemanfaatan ruang pertemuan dan fasilitas kantor perwakilan BP Batam.',
  },
  // Badan Usaha
  {
    no: 7,
    namaSatker: 'Direktorat Pengelolaan Kepelabuhanan',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 490154.13,
    targetPersen: 20.0,
    realisasiPnbpJuta: 382400.1,
    persenCapaian: 78.02,
    keterangan: 'Jasa labuh kapal, tambat, dermaga Batu Ampar/Sekupang/Nongsa, dan pass penumpang.',
  },
  {
    no: 8,
    namaSatker: 'Direktorat Pengelolaan Kawasan Bandara',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 130482.43,
    targetPersen: 5.3,
    realisasiPnbpJuta: 106820.7,
    persenCapaian: 81.87,
    keterangan: 'PJP2U pass penumpang, pendaratan pesawat PJP4U Bandara Hang Nadim, dan kargo EMPU.',
  },
  {
    no: 9,
    namaSatker: 'Badan Usaha Rumah Sakit (RSBP)',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 4098.98,
    targetPersen: 0.17,
    realisasiPnbpJuta: 3290.45,
    persenCapaian: 80.27,
    keterangan: 'Pendapatan jasa rawat inap, MCU eksekutif, laboratorium kateterisasi jantung, dan farmasi.',
  },
  {
    no: 10,
    namaSatker: 'Badan Usaha Sistem Pengelolaan Air Minum (SPAM), Fasilitas dan Lingkungan',
    kategori: 'Badan Usaha',
    targetPnbpJuta: 786541.31,
    targetPersen: 32.0,
    realisasiPnbpJuta: 592616.5,
    persenCapaian: 75.34,
    keterangan: 'Penerimaan air curah WTP waduk, sewa rusunawa pekerja, limbah B3 KPLI, dan aset gedung.',
  },
];

export const TOTAL_TARGET_PNBP_JUTA = 2447948.55; // ~2.447 T (Sesuai Renstra 2,447 T)
export const TOTAL_REALISASI_PNBP_JUTA = 1892450.1; // ~1.892 T

// 7. DATASET IKS-4: INDEKS REFORMASI BIROKRASI (HALAMAN 6 PDF)
export const STANDAR_REFORMASI_BIROKRASI = [
  { kategori: 'AA', nilai: '> 100', predikat: 'Sangat Memuaskan', warna: '#047857', bg: 'bg-emerald-100 text-emerald-800' },
  { kategori: 'A', nilai: '> 80 – 90', predikat: 'Memuaskan', warna: '#059669', bg: 'bg-emerald-50 text-emerald-700' },
  { kategori: 'A-', nilai: 'Memuaskan dgn Catatan', predikat: 'Memuaskan dengan Catatan', warna: '#0D9488', bg: 'bg-teal-50 text-teal-700' },
  { kategori: 'BB', nilai: '> 70 – 80', predikat: 'Sangat Baik (TARGET PERKIN: 80)', warna: '#2563EB', bg: 'bg-blue-100 text-blue-800 ring-2 ring-blue-500' },
  { kategori: 'B', nilai: '> 60 – 70', predikat: 'Baik', warna: '#3B82F6', bg: 'bg-blue-50 text-blue-700' },
  { kategori: 'CC', nilai: '> 50 – 60', predikat: 'Cukup', warna: '#D97706', bg: 'bg-amber-50 text-amber-700' },
  { kategori: 'C', nilai: '> 30 – 50', predikat: 'Buruk', warna: '#EA580C', bg: 'bg-orange-50 text-orange-700' },
  { kategori: 'D', nilai: '0 – 30', predikat: 'Sangat Kurang', warna: '#DC2626', bg: 'bg-rose-50 text-rose-700' },
];

export const AREA_REFORMASI_BIROKRASI_DATA: ReformasiBirokrasiArea[] = [
  {
    kode: 'RB-01',
    aspek: 'Manajemen Perubahan & Budaya Kerja BerAKHLAK',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.4,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Internalisasi Core Value ASN BerAKHLAK, agen perubahan satker, dan kepemimpinan adaptif.',
  },
  {
    kode: 'RB-02',
    aspek: 'Deregulasi & Penyederhanaan Regulasi (Perka/Kepka)',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.2,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Harmonisasi Perka investasi, kemudahan perizinan berusaha, dan deregulasi tarif BLU.',
  },
  {
    kode: 'RB-03',
    aspek: 'Penataan Struktur Organisasi yang Lincah & Agile',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.1,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Penyederhanaan birokrasi, penyesuaian kelas jabatan, dan fleksibilitas tim lintas unit.',
  },
  {
    kode: 'RB-04',
    aspek: 'Penataan Tata Laksana & Digitalisasi SPBE',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.6,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Integrasi Satu Data BP Batam, digital signature, e-office, dan interoperabilitas IBOSS.',
  },
  {
    kode: 'RB-05',
    aspek: 'Manajemen SDM Aparatur & Sistem Merit KASN',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.8,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Penerapan Sistem Merit Kategori IV (Skor 342,5), talent pool JPT, dan 20 JP diklat.',
  },
  {
    kode: 'RB-06',
    aspek: 'Penguatan Akuntabilitas Kinerja (SAKIP)',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.4,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Capaian Nilai SAKIP 82.68 (Predikat A), cascading kinerja pimpinan ke staf berorientasi hasil.',
  },
  {
    kode: 'RB-07',
    aspek: 'Penguatan Pengawasan & Maturitas SPIP',
    bobot: 15,
    targetNilai: 12.0,
    capaianNilai: 12.3,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Maturitas SPIP Level 3 Terdefinisi (Skor 3.42), Whistleblowing System, dan bebas gratifikasi.',
  },
  {
    kode: 'RB-08',
    aspek: 'Peningkatan Kualitas Pelayanan Publik (PEKPPP)',
    bobot: 10,
    targetNilai: 8.0,
    capaianNilai: 8.7,
    predikat: 'A (Memuaskan)',
    fokusImplementasi: 'Indeks Pelayanan Publik 4.38 (Sangat Baik), MPP terpadu, dan respon pengaduan 96.1%.',
  },
];

// ============================================================================
// 8. DATA KONSOLIDASI KESELURUHAN UNIT KERJA BP BATAM (EXECUTIVE ROLL-UP)
// Menggabungkan ringkasan riil dari dashboard seluruh unit kerja:
// - IKM Konsolidasi 6 Unit Layanan (PTSP, RSBP, BUP, Bandara, Lahan, SPAM)
// - Realisasi PNBP 10 Satuan Kerja & Badan Usaha Penghasil
// - Konsolidasi Serapan Anggaran Belanja (2 Program Perkin & 7 Deputi)
// - Konsolidasi Output Operasional Utama (Ditpam, RSBP, SPAM, Pelabuhan, Bandara, Lahan, PTSP, Infras)
// - Konsolidasi Tata Kelola & Reformasi Birokrasi (Biro SDM, BOKMR, Keuangan, PDSI, Hukum)
// ============================================================================

// A. KONSOLIDASI IKM SELURUH UNIT PELAYANAN (6 UNIT LOKUS)
export interface UnitIkmKonsolidasi {
  id: string;
  kodeUnit: string;
  namaUnit: string;
  kategori: string;
  skorIkm: number;
  targetIkm: number;
  mutuPelayanan: 'A' | 'B' | 'C' | 'D';
  predikat: string;
  jumlahResponden: number;
  persenSangatPuas: number;
  unsurTerkuat: string;
  unsurPerhatian: string;
  tindakLanjut: string;
  unsur9: {
    persyaratan: number;
    prosedur: number;
    waktuLayanan: number;
    biayaTarif: number;
    produkSpesifikasi: number;
    kompetensiPetugas: number;
    perilakuPetugas: number;
    maklumatLayanan: number;
    penangananPengaduan: number;
  };
  dasarHukum: string;
  halamanPdf: string;
}

export const KONSOLIDASI_IKM_SELURUH_UNIT: UnitIkmKonsolidasi[] = [
  {
    id: 'ikm-ptsp',
    kodeUnit: 'PTSP',
    namaUnit: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
    kategori: 'Perizinan Berusaha & Investasi',
    skorIkm: 89.24,
    targetIkm: 88.0,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 1420,
    persenSangatPuas: 91.5,
    unsurTerkuat: 'Perilaku & Kesopanan Petugas Frontliner (92,4)',
    unsurPerhatian: 'Kecepatan Waktu Layanan Izin Terintegrasi KSOP/KKP (86,8)',
    tindakLanjut: 'Penerapan notifikasi WhatsApp gateway otomatis dan penyiapan desk asistensi mandiri MPP Digital.',
    unsur9: {
      persyaratan: 89.8,
      prosedur: 89.2,
      waktuLayanan: 86.8,
      biayaTarif: 91.5,
      produkSpesifikasi: 89.4,
      kompetensiPetugas: 90.2,
      perilakuPetugas: 92.4,
      maklumatLayanan: 88.6,
      penangananPengaduan: 87.2,
    },
    dasarHukum: 'PermenPAN-RB No. 14/2017 & Perka BP Batam No. 2/2024',
    halamanPdf: 'Buku Satu Data Hal. 21 - 28 (17 Dataset)',
  },
  {
    id: 'ikm-rsbp',
    kodeUnit: 'BURS',
    namaUnit: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    kategori: 'Pelayanan Kesehatan & Rawat Inap',
    skorIkm: 86.95,
    targetIkm: 88.0,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 2100,
    persenSangatPuas: 88.6,
    unsurTerkuat: 'Kompetensi Dokter Spesialis & Fasilitas Kamar Inap (90,8)',
    unsurPerhatian: 'Waktu Tunggu Antrian Farmasi Obat Rawat Jalan (83,4)',
    tindakLanjut: 'Integrasi sistem Electronic Prescribing (e-Resep) dan penambahan 2 loket delivery obat farmasi.',
    unsur9: {
      persyaratan: 87.8,
      prosedur: 86.5,
      waktuLayanan: 83.4,
      biayaTarif: 88.2,
      produkSpesifikasi: 88.0,
      kompetensiPetugas: 90.8,
      perilakuPetugas: 89.5,
      maklumatLayanan: 86.2,
      penangananPengaduan: 85.0,
    },
    dasarHukum: 'PermenPAN-RB No. 14/2017 & Standar Akreditasi Kemenkes',
    halamanPdf: 'Buku Satu Data Hal. 19 - 21 (18 Dataset)',
  },
  {
    id: 'ikm-pelabuhan',
    kodeUnit: 'BUP',
    namaUnit: 'Direktorat Pengelolaan Kepelabuhanan (BUP)',
    kategori: 'Jasa Kepelabuhanan & Terminal Penumpang',
    skorIkm: 88.65,
    targetIkm: 88.0,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 980,
    persenSangatPuas: 89.4,
    unsurTerkuat: 'Transparansi Biaya & Tarif Jasa Labuh Tambat (90,5)',
    unsurPerhatian: 'Kenyamanan Ruang Tunggu Keberangkatan Terminal Internasional (85,5)',
    tindakLanjut: 'Peremajaan AC central terminal penumpang Batam Center dan pemasangan autogate boarding pass.',
    unsur9: {
      persyaratan: 89.2,
      prosedur: 88.4,
      waktuLayanan: 86.5,
      biayaTarif: 90.5,
      produkSpesifikasi: 89.0,
      kompetensiPetugas: 88.8,
      perilakuPetugas: 90.1,
      maklumatLayanan: 88.0,
      penangananPengaduan: 87.4,
    },
    dasarHukum: 'PermenPAN-RB No. 14/2017 & Ketetapan BUP BP Batam',
    halamanPdf: 'Buku Satu Data Hal. 14 - 17 (25 Dataset)',
  },
  {
    id: 'ikm-bandara',
    kodeUnit: 'BANDARA',
    namaUnit: 'Direktorat Kawasan Bandara Hang Nadim',
    kategori: 'Aviasi & Terminal Penumpang Udara',
    skorIkm: 88.4,
    targetIkm: 88.0,
    mutuPelayanan: 'A',
    predikat: 'Sangat Baik',
    jumlahResponden: 1040,
    persenSangatPuas: 89.0,
    unsurTerkuat: 'Keamanan Aviasi & Keselamatan Penerbangan (91,6)',
    unsurPerhatian: 'Ketersediaan Trolley & Waktu Tunggu Bagasi Arriving Pax (85,2)',
    tindakLanjut: 'Penambahan 200 unit trolley stainless baru dan optimalisasi baggage handling system bersama PT BIB.',
    unsur9: {
      persyaratan: 89.0,
      prosedur: 88.2,
      waktuLayanan: 85.2,
      biayaTarif: 89.6,
      produkSpesifikasi: 88.5,
      kompetensiPetugas: 89.4,
      perilakuPetugas: 91.6,
      maklumatLayanan: 87.8,
      penangananPengaduan: 86.3,
    },
    dasarHukum: 'PermenPAN-RB No. 14/2017 & ICAO Annex 14 Airport Standards',
    halamanPdf: 'Buku Satu Data Hal. 11 - 12 (12 Dataset)',
  },
  {
    id: 'ikm-lahan',
    kodeUnit: 'DPL',
    namaUnit: 'Direktorat Pengelolaan Pertanahan (Lahan)',
    kategori: 'Perizinan Pengalokasian & Hak Tanah',
    skorIkm: 87.24,
    targetIkm: 88.0,
    mutuPelayanan: 'B',
    predikat: 'Baik',
    jumlahResponden: 1650,
    persenSangatPuas: 85.8,
    unsurTerkuat: 'Transparansi Tarif UWT Melalui Kalkulator LMS Online (89,8)',
    unsurPerhatian: 'SLA Waktu Verifikasi Berkas Pecah/Revisi Penetapan Lokasi (83,1)',
    tindakLanjut: 'Otomatisasi plotting spasial peta GIS dan validasi digital dokumen kepemilikan tanah 7 SWP.',
    unsur9: {
      persyaratan: 87.5,
      prosedur: 86.8,
      waktuLayanan: 83.1,
      biayaTarif: 89.8,
      produkSpesifikasi: 87.4,
      kompetensiPetugas: 88.0,
      perilakuPetugas: 89.0,
      maklumatLayanan: 87.2,
      penangananPengaduan: 86.4,
    },
    dasarHukum: 'PermenPAN-RB No. 14/2017 & Perka BP Batam tentang Tarif UWT',
    halamanPdf: 'Buku Satu Data Hal. 6 - 8 (15 Dataset)',
  },
  {
    id: 'ikm-spam',
    kodeUnit: 'BUSPAM',
    namaUnit: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    kategori: 'Penyediaan Air Bersih, Rusun & Limbah',
    skorIkm: 87.88,
    targetIkm: 88.0,
    mutuPelayanan: 'B',
    predikat: 'Baik',
    jumlahResponden: 1240,
    persenSangatPuas: 86.7,
    unsurTerkuat: 'Kemudahan Bayar Tagihan Air & Fasilitas Rusun Online (89,5)',
    unsurPerhatian: 'Kecepatan Respon Penanganan Pipa Bocor di Jaringan DMZ (84,2)',
    tindakLanjut: 'Pembentukan 4 unit Quick Response Team perbaikan pipa 24/7 dan telemetri pemantau tekanan DMZ.',
    unsur9: {
      persyaratan: 88.0,
      prosedur: 87.4,
      waktuLayanan: 84.2,
      biayaTarif: 89.5,
      produkSpesifikasi: 87.8,
      kompetensiPetugas: 88.5,
      perilakuPetugas: 89.2,
      maklumatLayanan: 88.1,
      penangananPengaduan: 86.2,
    },
    dasarHukum: 'PermenPAN-RB No. 14/2017 & Standar Pelayanan Minimal SPAM',
    halamanPdf: 'Buku Satu Data Hal. 28 - 37 (91 Dataset)',
  },
];

// RATA-RATA KONSOLIDASI IKM KEPALA BP BATAM
export const AGREGAT_IKM_BP_BATAM = {
  skorTotal: 88.06,
  targetPerkin: 88.0,
  capaianPersen: 100.07,
  mutuPelayanan: 'A',
  predikat: 'Sangat Baik',
  totalResponden: 8430,
  jumlahUnit: 6,
  unitMutuA: 4,
  unitMutuB: 2,
  unsurRataRata: {
    persyaratan: 88.88,
    prosedur: 87.75,
    waktuLayanan: 84.87, // Unsur terlemah secara global
    biayaTarif: 90.17,
    produkSpesifikasi: 88.35,
    kompetensiPetugas: 89.28,
    perilakuPetugas: 90.73, // Unsur terkuat secara global
    maklumatLayanan: 87.65,
    penangananPengaduan: 86.42,
  },
};

// B. KONSOLIDASI REALISASI PNBP KESELURUHAN UNIT PENGHASIL (10 UNIT RESMI PERKIN HAL. 5)
export interface UnitPnbpKonsolidasi {
  no: number;
  namaSatker: string;
  klaster: 'Direktorat' | 'Badan Usaha' | 'Biro' | 'Pusat' | 'Kantor';
  targetMiliar: number;
  realisasiMiliar: number;
  persenCapaian: number;
  porsiTargetPersen: number;
  porsiRealisasiPersen: number;
  sumberPendapatanUtama: string;
  statusCapaian: 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  halamanPdf: string;
}

export const KONSOLIDASI_PNBP_SELURUH_UNIT: UnitPnbpKonsolidasi[] = [
  {
    no: 1,
    namaSatker: 'Direktorat Pengelolaan Pertanahan (Lahan)',
    klaster: 'Direktorat',
    targetMiliar: 964.3,
    realisasiMiliar: 748.21,
    persenCapaian: 77.59,
    porsiTargetPersen: 39.52,
    porsiRealisasiPersen: 39.52,
    sumberPendapatanUtama: 'Uang Wajib Tahunan (UWT) Baru, Perpanjangan, Peralihan, Pecah PL 7 SWP',
    statusCapaian: 'On Track',
    halamanPdf: 'Hal. 6 - 8 (15 Dataset)',
  },
  {
    no: 2,
    namaSatker: 'BU SPAM, Fasilitas dan Lingkungan',
    klaster: 'Badan Usaha',
    targetMiliar: 786.54,
    realisasiMiliar: 592.62,
    persenCapaian: 75.35,
    porsiTargetPersen: 32.0,
    porsiRealisasiPersen: 31.31,
    sumberPendapatanUtama: 'Penjualan Air Bersih WTP 6 Waduk, Pengolahan Limbah B3 KPLI, Sewa Rusunawa & Gedung Bida',
    statusCapaian: 'On Track',
    halamanPdf: 'Hal. 28 - 37 (91 Dataset)',
  },
  {
    no: 3,
    namaSatker: 'Direktorat Pengelolaan Kepelabuhanan (BUP)',
    klaster: 'Badan Usaha',
    targetMiliar: 490.15,
    realisasiMiliar: 382.4,
    persenCapaian: 78.02,
    porsiTargetPersen: 20.0,
    porsiRealisasiPersen: 20.2,
    sumberPendapatanUtama: 'Jasa Dermaga, Labuh Kapal, Tambat, Penumpukan Peti Kemas Batu Ampar, Pass Penumpang',
    statusCapaian: 'On Track',
    halamanPdf: 'Hal. 14 - 17 (25 Dataset)',
  },
  {
    no: 4,
    namaSatker: 'Direktorat Pengelolaan Kawasan Bandara Hang Nadim',
    klaster: 'Badan Usaha',
    targetMiliar: 130.48,
    realisasiMiliar: 106.82,
    persenCapaian: 81.87,
    porsiTargetPersen: 5.3,
    porsiRealisasiPersen: 5.64,
    sumberPendapatanUtama: 'PJP2U Pass Penumpang, PJP4U Pendaratan Pesawat, Konsesi Bandara PT BIB, Ekspedisi EMPU',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 11 - 12 (12 Dataset)',
  },
  {
    no: 5,
    namaSatker: 'Biro Keuangan',
    klaster: 'Biro',
    targetMiliar: 46.72,
    realisasiMiliar: 38.45,
    persenCapaian: 82.3,
    porsiTargetPersen: 1.9,
    porsiRealisasiPersen: 2.03,
    sumberPendapatanUtama: 'Jasa Giro Bank Kas BLU, Bunga Deposito Rekening Penampung, Denda Keterlambatan Kontrak',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 2 - 6 (28 Dataset)',
  },
  {
    no: 6,
    namaSatker: 'Pusat Data dan Sistem Informasi (PDSI)',
    klaster: 'Pusat',
    targetMiliar: 13.49,
    realisasiMiliar: 10.85,
    persenCapaian: 80.43,
    porsiTargetPersen: 0.6,
    porsiRealisasiPersen: 0.57,
    sumberPendapatanUtama: 'Sewa Rak Co-Location Tier-3 Data Center (96 Rak), Link Fiber Optik 210 Km, Cloud Computing',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 40 - 43 (21 Dataset)',
  },
  {
    no: 7,
    namaSatker: 'Direktorat Pembangunan Infrastruktur',
    klaster: 'Direktorat',
    targetMiliar: 8.85,
    realisasiMiliar: 7.12,
    persenCapaian: 80.45,
    porsiTargetPersen: 0.37,
    porsiRealisasiPersen: 0.38,
    sumberPendapatanUtama: 'Izin Pemanfaatan ROW Utilitas Terbuka/Crossing (Kabel/Pipa) dan Pemanfaatan ROW Penghijauan',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 48 - 50 (6 Dataset)',
  },
  {
    no: 8,
    namaSatker: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    klaster: 'Badan Usaha',
    targetMiliar: 4.1,
    realisasiMiliar: 3.29,
    persenCapaian: 80.24,
    porsiTargetPersen: 0.17,
    porsiRealisasiPersen: 0.17,
    sumberPendapatanUtama: 'Layanan MCU Eksekutif KEK Kesehatan, Cath Lab Jantung, Rawat Inap VIP, Sewa Tenant Medis',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 19 - 21 (18 Dataset)',
  },
  {
    no: 9,
    namaSatker: 'Direktorat Lalu Lintas Barang (LLB)',
    klaster: 'Direktorat',
    targetMiliar: 2.37,
    realisasiMiliar: 2.48,
    persenCapaian: 104.64,
    porsiTargetPersen: 0.1,
    porsiRealisasiPersen: 0.13,
    sumberPendapatanUtama: 'Rekomendasi Surat Keterangan Lalu Lintas Barang Industri, Dagang & Kuota Barang Konsumsi',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 8 - 9 (9 Dataset)',
  },
  {
    no: 10,
    namaSatker: 'Kantor Penghubung Jakarta',
    klaster: 'Kantor',
    targetMiliar: 0.93,
    realisasiMiliar: 0.76,
    persenCapaian: 81.72,
    porsiTargetPersen: 0.04,
    porsiRealisasiPersen: 0.04,
    sumberPendapatanUtama: 'Pemanfaatan Ruang Pertemuan, Sewa Fasilitas Kantor Perwakilan BP Batam di Jakarta',
    statusCapaian: 'Tercapai',
    halamanPdf: 'Hal. 46 (1 Dataset)',
  },
];

// TOTAL REKAP PNBP BP BATAM
export const AGREGAT_PNBP_BP_BATAM = {
  targetTotalMiliar: 2447.95, // Rp 2.447.948.560.000,- (Dokumen Perkin Hal. 5)
  realisasiTotalMiliar: 1893.0,
  capaianPersen: 77.33,
  saldoKasBankMiliar: 1428.5,
  porsiBadanUsahaMiliar: 1085.13, // SPAM + BUP + Bandara + RSBP
  porsiDirektoratMiliar: 757.81, // Lahan + Infras + LLB
  porsiBiroPusatMiliar: 50.06, // Keuangan + PDSI + Jakarta
};

// C. KONSOLIDASI OUTPUT OPERASIONAL UTAMA SELURUH UNIT (REAL DARI DASHBOARD MASING-MASING)
export interface UnitOperasionalOutput {
  id: string;
  unit: string;
  pilar: string;
  metrikUtama: string;
  nilai: string;
  persenTarget: number;
  highlightData: string[];
  icon: string;
  halamanPdf: string;
}

export const KONSOLIDASI_OPERASIONAL_SELURUH_UNIT: UnitOperasionalOutput[] = [
  {
    id: 'op-ditpam',
    unit: 'Direktorat Pengamanan Aset dan Kawasan (Ditpam)',
    pilar: 'Keamanan Aset, Hutan Lindung & Obvitnas',
    metrikUtama: '874 Penertiban Bangunan Liar & 524 Personel Aktif',
    nilai: '84,8% Selesai',
    persenTarget: 84.8,
    highlightData: [
      '874 Penertiban tuntas dari 1.030 terdata di SWP Batam Kota, Batu Aji, dan Nongsa.',
      'Pengamanan 7 Objek Vital Nasional (Bandara, Pelabuhan, Waduk, Kabil, Batamindo, Kantor BP) 100% aman.',
      'Sterilisasi 142 Ha Catchment Area Waduk Duriangkang dari okupasi perkebunan liar.',
      'Penanganan 42 aksi unjuk rasa persuasif tanpa insiden kerusakan aset fisik.',
      'Waktu tanggap darurat (response time) damkar/rescue: 12,4 menit (18 penanganan kebakaran).',
    ],
    icon: 'Shield',
    halamanPdf: 'Buku Satu Data Hal. 17 - 19 (12 Dataset)',
  },
  {
    id: 'op-rsbp',
    unit: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    pilar: 'Layanan Kesehatan & Hospitaliti Medis',
    metrikUtama: 'BOR 76,2% & 2.100 Kunjungan Pasien YTD',
    nilai: '111,4% CRR',
    persenTarget: 88.9,
    highlightData: [
      'Tingkat keterisian tempat tidur (BOR) 76,2% (standar ideal Kemenkes 70-85%).',
      '2.100 Pasien rawat inap dan poliklinik spesialis dengan 18 klinik aktif.',
      'Layanan unggulan: Cath Lab Jantung, Hemodialisa 24 mesin, Medical Check-Up KEK Sekupang.',
      'Cost Recovery Rate (CRR): 111,4% (Pendapatan operasional melebihi biaya belanja pelayanan).',
      'Pola 10 Morbiditas: Hipertensi, DM Tipe 2, Jantung Koroner, ISPA, dan Trauma Cedera.',
    ],
    icon: 'Activity',
    halamanPdf: 'Buku Satu Data Hal. 19 - 21 (18 Dataset)',
  },
  {
    id: 'op-spam',
    unit: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    pilar: 'Air Minum, Pengolahan Limbah & Rusunawa',
    metrikUtama: '3.420 L/dtk WTP 6 Waduk & 14.850 Ton Limbah B3',
    nilai: '94% Okupansi',
    persenTarget: 86.4,
    highlightData: [
      'Kapasitas produksi air bersih 3.420 Liter/detik dari 6 waduk (Duriangkang, Tembesi, Mukakuning, Ladi, Harapan, Nongsa).',
      '23 District Meter Area (DMZ) termonitor telemetri untuk penekanan kebocoran pipa NRW.',
      '14.850 Ton limbah B3 industri diolah aman di Kawasan Pengelolaan Limbah Industri (KPLI) Kabil.',
      'Tingkat hunian (occupancy) Rusunawa pekerja industri: 94% (terisi 4.250 penghuni).',
      'Realisasi PNBP BU SPAM: Rp 592,62 Miliar (31,3% dari total PNBP BP Batam).',
    ],
    icon: 'Droplets',
    halamanPdf: 'Buku Satu Data Hal. 28 - 37 (91 Dataset)',
  },
  {
    id: 'op-pelabuhan',
    unit: 'Direktorat Pengelolaan Kepelabuhanan (BUP)',
    pilar: 'Logistik Maritim & Terminal Penumpang',
    metrikUtama: '612.400 TEUs Peti Kemas & 18.420 Call Kapal',
    nilai: '11 Dermaga Aktif',
    persenTarget: 86.2,
    highlightData: [
      'Arus bongkar muat peti kemas Pelabuhan Batu Ampar: 612.400 TEUs.',
      'Kunjungan kapal (vessel calls): 18.420 call kapal barang dan penumpang.',
      'Pengoperasian 11 dermaga komersial aktif termasuk terminal kargo curah cair dan general cargo.',
      'Terminal penumpang domestik & internasional: Batam Center, Sekupang, Harbour Bay, Nongsa.',
      'Realisasi PNBP Kepelabuhanan: Rp 382,40 Miliar (kontribusi 20,2% PNBP BLU).',
    ],
    icon: 'Ship',
    halamanPdf: 'Buku Satu Data Hal. 14 - 17 (25 Dataset)',
  },
  {
    id: 'op-bandara',
    unit: 'Direktorat Kawasan Bandara Hang Nadim',
    pilar: 'Konektivitas Udara & Kargo Aviasi',
    metrikUtama: '34.250 Flight, 4,12 Juta Pax & 42.150 Ton EMPU',
    nilai: '24 Rute Langsung',
    persenTarget: 88.2,
    highlightData: [
      'Arus lalu lintas penerbangan: 34.250 pergerakan pesawat (take-off / landing).',
      'Volume penumpang: 4.120.500 penumpang domestik dan internasional.',
      'Ekspedisi Muatan Pesawat Udara (EMPU): 42.150 Ton kargo udara.',
      'Panjang runway 4.025 meter (terpanjang di Indonesia, mampu melayani Boeing 777 & Airbus A380).',
      'Pengembangan KEK Batam Aero Technic (BAT) dengan 14 hanggar MRO pesawat komersial.',
    ],
    icon: 'Plane',
    halamanPdf: 'Buku Satu Data Hal. 11 - 12 (12 Dataset)',
  },
  {
    id: 'op-ptsp',
    unit: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
    pilar: 'Perizinan Berusaha & MPP Digital',
    metrikUtama: '13.150 Izin Terbit dari 14.850 Permohonan (SLA 88,6%)',
    nilai: '1,8 Hari Rata-rata',
    persenTarget: 89.2,
    highlightData: [
      '14.850 Permohonan izin masuk, 13.150 izin diterbitkan (efektivitas penyelesaian 88,6%).',
      '17 Jenis perizinan terstandarisasi: SKKBM, SKKAB, SKKAA, TUKS, Izin Operasi Berusaha, Reklame.',
      'Waktu rata-rata penyelesaian izin: 1,8 hari kerja (standar SLA 3 hari).',
      'Integrasi 24 jam Mal Pelayanan Publik (MPP Digital) dan loket tatap muka Gedung Bida Utama.',
      'Skor IKM PTSP: 89,24 (Mutu A Sangat Baik dari 1.420 responden pelaku usaha).',
    ],
    icon: 'Layers',
    halamanPdf: 'Buku Satu Data Hal. 21 - 28 (17 Dataset)',
  },
  {
    id: 'op-lahan',
    unit: 'Direktorat Pengelolaan Pertanahan & Pesisir',
    pilar: 'Alokasi Ruang Investasi & Reklamasi',
    metrikUtama: '248,5 Ha Lahan Investasi & 162,8 Ha Reklamasi',
    nilai: '7 SWP Batam',
    persenTarget: 84.5,
    highlightData: [
      'Alokasi lahan investasi terealisasi: 248,50 Ha (target 200 Ha / 124,25% capaian).',
      'Penerbitan izin kesesuaian ruang laut & reklamasi (PKKPRL): 162,80 Ha.',
      'Penyelesaian 1.650 berkas SKPT, SPPT, Perpanjangan UWT, dan Pecah Penetapan Lokasi (PL).',
      'Keberhasilan rekuperasi dan pengamanan lahan tidur/mangkrak: 94,60 Ha.',
      'Realisasi PNBP Lahan: Rp 748,21 Miliar (penyumbang 39,52% pendapatan BLU BP Batam).',
    ],
    icon: 'MapPin',
    halamanPdf: 'Buku Satu Data Hal. 6 - 8, 11, 13 - 14',
  },
  {
    id: 'op-infras',
    unit: 'Direktorat Pembangunan & Perencanaan Infras',
    pilar: 'Jalan Raya, Drainase & Paket DED',
    metrikUtama: '542,8 Km Jaringan Jalan & 14 Paket Konstruksi',
    nilai: '43 Paket DED',
    persenTarget: 82.4,
    highlightData: [
      'Pemeliharaan & peningkatan 542,8 Km jaringan jalan arteri dan kolektor kota Batam.',
      '14 Paket proyek fisik strategis berjalan: Flyover Sei Ladi, Pelebaran Jl. Sudirman, Akses Rempang.',
      '280 Ha pematangan tanah (cut & fill) di Bagian Sebaran Wilayah (BSW) Batam.',
      '43 Paket Detail Engineering Design (DED) 6 sektor: Gedung, Jalan, Utilitas, Wisata, Laut, Udara.',
      'Pagu belanja modal fisik: Rp 682,43 Miliar.',
    ],
    icon: 'HardHat',
    halamanPdf: 'Buku Satu Data Hal. 48 - 51, 53',
  },
];

// D. KONSOLIDASI SERAPAN ANGGARAN BELANJA (2 PROGRAM PERKIN & LINTAS SATKER)
export const KONSOLIDASI_BELANJA_BP_BATAM = {
  totalPaguBelanjaMiliar: 2527.95, // Rp 2.527.948.530.000,- (Dokumen Perkin Hal. 2)
  totalRealisasiBelanjaMiliar: 1962.12,
  serapanPersen: 77.62,
  sisaPaguMiliar: 565.83,
  program1: {
    nama: 'Program Pengembangan Kawasan Strategis',
    paguMiliar: 1428.92, // Rp 1.428.920.480.000,-
    realisasiMiliar: 1114.56,
    serapanPersen: 78.0,
    fokus: 'Pembangunan infrastruktur fisik, pelabuhan, bandara, utilitas SPAM, pengelolaan lahan, dan investasi KEK.',
  },
  program2: {
    nama: 'Program Dukungan Manajemen',
    paguMiliar: 1099.03, // Rp 1.099.028.050.000,-
    realisasiMiliar: 847.56,
    serapanPersen: 77.1,
    fokus: 'Administrasi keuangan, tata kelola SDM aparatur, digitalisasi SPBE, reformasi birokrasi, hukum, dan SPI.',
  },
  breakdownDeputi: [
    { deputi: 'Deputi 7: Infrastruktur (DEP-A7)', paguMiliar: 842.5, realisasiMiliar: 682.43, serapan: 81.0 },
    { deputi: 'Deputi 1: Administrasi & Keuangan (DEP-A1)', paguMiliar: 725.15, realisasiMiliar: 564.12, serapan: 77.8 },
    { deputi: 'Deputi 6: Pelayanan Umum (DEP-A6)', paguMiliar: 420.0, realisasiMiliar: 326.8, serapan: 77.8 },
    { deputi: 'Deputi 3: Pengelolaan Lahan (DEP-A3)', paguMiliar: 92.5, realisasiMiliar: 71.2, serapan: 77.0 },
    { deputi: 'Deputi 4: Investasi & Pengusahaan (DEP-A4)', paguMiliar: 88.42, realisasiMiliar: 68.9, serapan: 77.9 },
    { deputi: 'Deputi 2: Kebijakan Strategis (DEP-A2)', paguMiliar: 75.87, realisasiMiliar: 58.45, serapan: 77.0 },
    { deputi: 'Deputi 5: Bandara & Pelabuhan (DEP-A5)', paguMiliar: 59.51, realisasiMiliar: 46.8, serapan: 78.6 },
  ],
};

// E. KONSOLIDASI REFORMASI BIROKRASI & TATA KELOLA (8 AREA PERUBAHAN)
export const KONSOLIDASI_TATA_KELOLA_RB = {
  skorIndeksRb: 81.35,
  targetPerkin: 80.0,
  predikat: 'A (Memuaskan)',
  sistemMeritAsn: {
    skor: 342.5,
    target: 280.0,
    predikat: 'Sangat Baik (KASN)',
    unitPengampu: 'Biro Sumber Daya Manusia (2.978 Pegawai)',
    halamanPdf: 'Hal. 1 - 2',
  },
  maturitasSpip: {
    skor: 3.42,
    target: 3.2,
    level: 'Level 3 (Terdefinisi)',
    unitPengampu: 'Biro OKMR (24 Piagam Risiko Unit Kerja)',
    halamanPdf: 'Hal. 38 - 40',
  },
  sakipAkuntabilitas: {
    skor: 82.68,
    predikat: 'A (Memuaskan)',
    unitPengampu: 'Biro OKMR',
    halamanPdf: 'Hal. 38',
  },
  kematanganSpbe: {
    skor: 4.12,
    target: 3.9,
    predikat: 'Level 4 (Keterpaduan SPBE)',
    unitPengampu: 'Pusat Data dan Sistem Informasi (PDSI)',
    halamanPdf: 'Hal. 40 - 43',
  },
  kualitasPelayananPekppp: {
    skor: 4.38,
    target: 4.0,
    predikat: 'Sangat Baik (Pelayanan Prima)',
    unitPengampu: 'Biro OKMR & PTSP',
    halamanPdf: 'Hal. 40',
  },
  opiniBpkLaporanKeuangan: {
    opini: 'WTP (Wajar Tanpa Pengecualian)',
    catatan: '8 Tahun Berturut-turut',
    unitPengampu: 'Biro Keuangan (Kas BLU Rp 1,428 T, IKPA 95.8)',
    halamanPdf: 'Hal. 2 - 6',
  },
  harmonisasiRegulasi: {
    perkaDisahkan: 28,
    advokasiHukum: '100% Advokasi Perkara Litigasi/Non-Litigasi Tuntas',
    unitPengampu: 'Biro Hukum',
    halamanPdf: 'Hal. 2',
  },
};

// F. REKOMENDASI MANAJERIAL EKSEKUTIF KEPALA BP BATAM
export const EXECUTIVE_STRATEGIC_NARRATIVES = [
  {
    no: '01',
    kategori: 'Kepuasan Publik (IKM 88,06)',
    judul: 'Pertahankan Mutu A dan Akselerasi Kecepatan Waktu Layanan',
    narasi:
      'Indeks Kepuasan Masyarakat rata-rata 6 unit mencapai 88,06 (Mutu A), melampaui target Perkin 88,00. Unsur perilaku petugas (90,73) dan biaya transparan (90,17) sangat diapresiasi masyarakat. Fokus perbaikan diarahkan pada unsur waktu layanan (84,87), khususnya antrian farmasi di RSBP dan percepatan verifikasi izin ruang laut/lahan melalui digitalisasi.',
  },
  {
    no: '02',
    kategori: 'Kemandirian Fiskal (PNBP Rp 1,893 T)',
    judul: 'Optimalisasi Lahan, Air SPAM & Jasa Pelabuhan Batu Ampar',
    narasi:
      'Realisasi PNBP mencapai Rp 1,893 Triliun (77,33% dari target Renstra Rp 2,448 T). Tiga pilar utama menyumbang 91% penerimaan: Dit. Pengelolaan Pertanahan (Rp 748,2 M), BU SPAM (Rp 592,6 M), dan BUP Kepelabuhanan (Rp 382,4 M). Rasio pendapatan terhadap belanja konsolidasi 0,96 menjamin likuiditas kas BLU yang sehat sebesar Rp 1,428 Triliun.',
  },
  {
    no: '03',
    kategori: 'Tata Kelola & Reformasi Birokrasi (81,35 A)',
    judul: 'Sinergi Penertiban Ditpam, Layanan RSBP, dan Merit ASN 342,5',
    narasi:
      'Pengamanan aset Ditpam berhasil menertibkan 874 bangunan liar dan melindungi 142 Ha waduk Duriangkang. Didukung BOR RSBP 76,2% (CRR 111,4%), Sistem Merit 342,5, Maturitas SPIP 3,42, Kematangan SPBE 4,12, serta Opini BPK WTP 8 tahun berturut-turut, membuktikan akuntabilitas BP Batam berstandar nasional prima.',
  },
];

// MATRIKS RINGKAS 24 SATUAN KERJA BP BATAM (SESUAI BUKU SATU DATA)
export interface SatkerMatrixItem {
  id: string;
  kode: string;
  nama: string;
  klaster: 'Pimpinan' | 'Badan Usaha' | 'Direktorat' | 'Biro' | 'Pusat' | 'Satuan';
  paguMiliar: number;
  realisasiMiliar: number;
  serapanPersen: number;
  pnbpMiliar: number;
  ikpIksUtama: string;
  statusKinerja: 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  jumlahDatasetSatuData: number;
  halamanPdf: string;
  // Field Tambahan untuk Pemantauan Kinerja Substantif Kepala BP Batam (Non-Belanja)
  capaianSubstantifNilai?: string;
  labelCapaianUtama?: string;
  persenKinerjaSubstantif?: number;
  ringkasanMultiMetrik?: string[];
  unitRouteId?: string;
}

export const MATRIKS_24_SATKER_DATA: SatkerMatrixItem[] = [
  {
    id: 'ka-bp',
    kode: 'KA-BP',
    nama: 'Kepala BP Batam (Perjanjian Kinerja)',
    klaster: 'Pimpinan',
    paguMiliar: 2527.95,
    realisasiMiliar: 1962.12,
    serapanPersen: 77.62,
    pnbpMiliar: 1892.45,
    ikpIksUtama: '4 IKS (Investasi Rp 70T, IKM 88, PNBP Rp 2,447T, RB 80 BB)',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 4,
    halamanPdf: 'Perkin No. 1/SPJ/KA/1/2026',
    labelCapaianUtama: 'Agregat 4 Kompas Strategis',
    capaianSubstantifNilai: '4 IKS Tercapai Prima',
    persenKinerjaSubstantif: 100.5,
    ringkasanMultiMetrik: [
      'Investasi: Rp 54,68T (78,1% On Track)',
      'Kepuasan Publik: IKM 88,42 (Mutu A)',
      'Penerimaan PNBP: Rp 1,892T (77,3%)',
      'Reformasi Birokrasi: 81,35 (Predikat A)',
    ],
    unitRouteId: 'kepala-bp',
  },
  {
    id: 'dep-a1',
    kode: 'DEP-A1',
    nama: 'Deputi Administrasi dan Keuangan',
    klaster: 'Pimpinan',
    paguMiliar: 725.15,
    realisasiMiliar: 564.12,
    serapanPersen: 77.8,
    pnbpMiliar: 38.45,
    ikpIksUtama: 'Indeks RB 78.45, Sistem Merit 342.5, SPIP 3.42, WTP 8x',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 59,
    halamanPdf: 'Perkin A1 (Hal 1-6, 38-40)',
    labelCapaianUtama: 'Tata Kelola RB & Sistem Merit',
    capaianSubstantifNilai: '81,35 (A) & 342,5 Merit',
    persenKinerjaSubstantif: 101.2,
    ringkasanMultiMetrik: [
      'Indeks Reformasi Birokrasi: 81,35 (Predikat A Memuaskan)',
      'Sistem Merit ASN KASN: 342,5 (Kategori IV Sangat Baik)',
      'Maturitas SPIP: 3,42 (Level 3 Terdefinisi - BOKMR)',
      'Opini Laporan Keuangan: WTP BPK 8 Tahun Berturut-turut',
      'Likuiditas Kas BLU: Rp 1,428 Triliun (Aman & Solid)',
    ],
    unitRouteId: 'deputi-administrasi-keuangan',
  },
  {
    id: 'dep-a2',
    kode: 'DEP-A2',
    nama: 'Deputi Kebijakan Strategis & Perizinan',
    klaster: 'Pimpinan',
    paguMiliar: 75.87,
    realisasiMiliar: 58.45,
    serapanPersen: 77.0,
    pnbpMiliar: 13.49,
    ikpIksUtama: 'Indeks Perencanaan 94.20, IKK 71.80, SPBE 4.12, IKM PTSP 88.42',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 64,
    halamanPdf: 'Perkin A2 (Hal 12-13, 21-28, 40-43, 51-53)',
    labelCapaianUtama: 'Kedaulatan SPBE & Layanan Izin',
    capaianSubstantifNilai: '4,12 (Level 4) & 89,2 IKM',
    persenKinerjaSubstantif: 100.0,
    ringkasanMultiMetrik: [
      'Kematangan SPBE: 4,12 (Level 4 Keterpaduan Layanan PDSI)',
      'Indeks Kepuasan PTSP: 89,24 (Mutu A Pelayanan Prima)',
      'SLA Izin Berusaha: Rerata 1,8 Hari (13.150 izin terbit)',
      'Indeks Perencanaan: 94,20 & Indeks Kualitas Kebijakan: 71,80',
      'Penyusunan Kebijakan: 14 Rekomendasi Kajian Strategis',
    ],
    unitRouteId: 'deputi-kebijakan-strategis',
  },
  {
    id: 'dep-a3',
    kode: 'DEP-A3',
    nama: 'Deputi Pengelolaan Lahan & Pesisir',
    klaster: 'Pimpinan',
    paguMiliar: 92.5,
    realisasiMiliar: 71.2,
    serapanPersen: 77.0,
    pnbpMiliar: 748.21,
    ikpIksUtama: 'Luas Alokasi Lahan 248.5 Ha, Izin Reklamasi 162.8 Ha, Pengawasan 93.8%',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 23,
    halamanPdf: 'Perkin A3 (Hal 6-8, 11, 13-14)',
    labelCapaianUtama: 'Alokasi Lahan & Ruang Laut',
    capaianSubstantifNilai: '248,5 Ha Lahan & 162,8 Ha Laut',
    persenKinerjaSubstantif: 124.3,
    ringkasanMultiMetrik: [
      'Alokasi Lahan Investasi: 248,50 Ha (Target 200 Ha / 124,3%)',
      'Izin Ruang Laut & Reklamasi: 162,80 Ha (PKKPRL Disahkan)',
      'Kontribusi PNBP: Rp 748,21 Miliar (Penyumbang 39,5% PNBP BP)',
      'Penyelesaian Berkas: 1.650 SKPT, SPPT, UWT & Pecah PL',
      'Pengawasan & Pengendalian Spasial Lahan: 93,8% Terpantau',
    ],
    unitRouteId: 'deputi-pengelolaan-lahan',
  },
  {
    id: 'dep-a4',
    kode: 'DEP-A4',
    nama: 'Deputi Investasi & Pengusahaan',
    klaster: 'Pimpinan',
    paguMiliar: 88.42,
    realisasiMiliar: 68.9,
    serapanPersen: 77.9,
    pnbpMiliar: 1.94,
    ikpIksUtama: 'Investasi KPBPB Rp 31,48 T, KEK Rp 9,09 T, Fasilitasi 52 Investor',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 39,
    halamanPdf: 'Perkin A4 (Hal 8-11, 14, 46-48)',
    labelCapaianUtama: 'Realisasi Investasi & KEK',
    capaianSubstantifNilai: 'Rp 54,68T Investasi (78,1%)',
    persenKinerjaSubstantif: 78.1,
    ringkasanMultiMetrik: [
      'Investasi Total Batam: Rp 54,68 Triliun (Target Rp 70 T)',
      'Kontribusi 4 KEK: Rp 9,09 Triliun (BAT, Nongsa, Sekupang, Tanjung Sauh)',
      'Fasilitasi Calon Investor: 52 Investor PMA/PMDN Masuk Pipeline',
      'Nilai Ekspor FTZ: US$ 14,82 Miliar (Surplus Neraca +US$ 2,64B)',
      'Monitoring Kerjasama: 42 Perjanjian Kerjasama (PKS) Aktif',
    ],
    unitRouteId: 'deputi-investasi',
  },
  {
    id: 'dep-a5',
    kode: 'DEP-A5',
    nama: 'Deputi Bandara, Pelabuhan & LLB',
    klaster: 'Pimpinan',
    paguMiliar: 59.51,
    realisasiMiliar: 46.8,
    serapanPersen: 78.6,
    pnbpMiliar: 489.22,
    ikpIksUtama: 'IKM Bandara/Pelabuhan 88.45, PNBP Bandara Rp 106,8M, Pelabuhan Rp 382,4M',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 46,
    halamanPdf: 'Perkin A5 (Hal 8-9, 11-12, 14-17)',
    labelCapaianUtama: 'Logistik Maritim & Konektivitas Udara',
    capaianSubstantifNilai: '612k TEUs & 4,12M Pax',
    persenKinerjaSubstantif: 86.5,
    ringkasanMultiMetrik: [
      'Bongkar Muat Peti Kemas: 612.400 TEUs Batu Ampar',
      'Pergerakan Penumpang Aviasi: 4.120.500 Penumpang Hang Nadim',
      'Kunjungan Kapal: 18.420 Call Kapal & 34.250 Penerbangan',
      'Layanan Dokumen Ekspor-Impor: 48.250 PPFTZ (SLA 1,4 Jam)',
      'Realisasi PNBP Gabungan: Rp 489,22 Miliar (Pelabuhan + Bandara)',
    ],
    unitRouteId: 'deputi-bandara-pelabuhan',
  },
  {
    id: 'dep-a6',
    kode: 'DEP-A6',
    nama: 'Deputi Pelayanan Umum',
    klaster: 'Pimpinan',
    paguMiliar: 420.0,
    realisasiMiliar: 326.8,
    serapanPersen: 77.8,
    pnbpMiliar: 595.91,
    ikpIksUtama: 'Kualitas Layanan 84.70, BOR RSBP 76.2%, Ditpam Penertiban 874',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 121,
    halamanPdf: 'Perkin A6 (Hal 17-21, 28-37)',
    labelCapaianUtama: 'Air Baku, Medis & Pengamanan Aset',
    capaianSubstantifNilai: '88,06 IKM & 161,9M m³ Air',
    persenKinerjaSubstantif: 100.5,
    ringkasanMultiMetrik: [
      'Ketahanan Air 6 Waduk: 161,96 Jt m³ (96,8% Kapasitas Tampungan)',
      'Produksi Air Minum WTP: 3.420 Liter/detik (312k Pelanggan)',
      'Bed Occupancy Rate RSBP: 76,2% (2.100 Kunjungan, CRR 111,4%)',
      'Operasi Penertiban Ditpam: 874 Bangunan Liar Ditertibkan',
      'Pengolahan Limbah B3 KPLI: 14.850 Ton & Rusunawa 94% Terisi',
    ],
    unitRouteId: 'deputi-pelayanan-umum',
  },
  {
    id: 'dep-a7',
    kode: 'DEP-A7',
    nama: 'Deputi Infrastruktur',
    klaster: 'Pimpinan',
    paguMiliar: 842.5,
    realisasiMiliar: 682.43,
    serapanPersen: 81.0,
    pnbpMiliar: 7.12,
    ikpIksUtama: 'Pembangunan Infrastruktur 92.4%, 14 Proyek Strategis, 542.8 Km Jalan',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 24,
    halamanPdf: 'Perkin A7 (Hal 17-19, 48-51, 53)',
    labelCapaianUtama: 'Proyek Strategis & Jalan Kota',
    capaianSubstantifNilai: '14 Proyek & 542 Km Jalan',
    persenKinerjaSubstantif: 92.4,
    ringkasanMultiMetrik: [
      'Proyek Fisik Strategis: 14 Proyek (Flyover Sei Ladi, Sudirman)',
      'Jaringan Jalan Kota: 542,8 Km Jalan Arteri & Kolektor Prima',
      'Perencanaan Teknis: 43 Paket DED 6 Sektor Tuntas',
      'Kesiapan Lahan Industri: 280 Ha Pematangan Lahan (Cut & Fill)',
      'Progres Konstruksi Rata-rata: 92,4% Sesuai Timeline Kurva S',
    ],
    unitRouteId: 'deputi-infrastruktur',
  },
  {
    id: 'bu-rsbp',
    kode: 'BURS',
    nama: 'Badan Usaha Rumah Sakit (RSBP Batam)',
    klaster: 'Badan Usaha',
    paguMiliar: 135.0,
    realisasiMiliar: 109.35,
    serapanPersen: 81.0,
    pnbpMiliar: 121.8,
    ikpIksUtama: 'BOR 76.2%, 18 Klinik, 2.100 Kunjungan Pasien, Skor IKM 88.92 (A)',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 18,
    halamanPdf: 'Hal. 19-21',
    labelCapaianUtama: 'Okupansi Bed & Layanan Medis',
    capaianSubstantifNilai: 'BOR 76,2% · CRR 111,4%',
    persenKinerjaSubstantif: 88.9,
    ringkasanMultiMetrik: [
      'Tingkat Hunian Bed (BOR): 76,2% (Standar Kemenkes 70-85%)',
      'Pasien Dilayani: 2.100 Pasien Rawat Inap & 18 Poliklinik',
      'Cost Recovery Rate: 111,4% (Surplus Operasional Sehat)',
      'Layanan Unggulan: Cath Lab Jantung, Hemodialisa, MCU KEK',
      'Indeks Kepuasan: 86,95 (Mutu A Sangat Baik)',
    ],
    unitRouteId: 'bu-rumah-sakit',
  },
  {
    id: 'ditpam',
    kode: 'DITPAM',
    nama: 'Dit. Pengamanan Aset dan Kawasan',
    klaster: 'Direktorat',
    paguMiliar: 64.2,
    realisasiMiliar: 52.4,
    serapanPersen: 81.6,
    pnbpMiliar: 0.0,
    ikpIksUtama: '874 Bangunan Liar Ditertibkan (1.030 terdata), 524 Personel, 7 Obvitnas',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 12,
    halamanPdf: 'Hal. 17-19',
    labelCapaianUtama: 'Penertiban Aset & Obvitnas',
    capaianSubstantifNilai: '874 Tertib · 7 Obvitnas Aman',
    persenKinerjaSubstantif: 84.8,
    ringkasanMultiMetrik: [
      'Penertiban Bangunan Liar: 874 Lokasi Selesai (84,8%)',
      'Sterilisasi Waduk: 142 Ha Catchment Area Duriangkang Bebas Okupasi',
      'Pengamanan Obvitnas: 7 Objek Vital 100% Kondusif & Terjaga',
      'Kekuatan Pengamanan: 524 Personel Patroli Rutin Tersebar',
      'Waktu Tanggap Darurat: 12,4 Menit (Damkar & Evakuasi Rescue)',
    ],
    unitRouteId: 'dit-pam-aset',
  },
  {
    id: 'bu-spam',
    kode: 'BUSPAM',
    nama: 'BU SPAM, Fasilitas dan Lingkungan',
    klaster: 'Badan Usaha',
    paguMiliar: 285.4,
    realisasiMiliar: 218.6,
    serapanPersen: 76.6,
    pnbpMiliar: 592.62,
    ikpIksUtama: 'WTP 3.420 L/dtk, 6 Waduk, 23 DMZ, KPLI Limbah B3 14.850 Ton, Rusunawa 94%',
    statusKinerja: 'On Track',
    jumlahDatasetSatuData: 91,
    halamanPdf: 'Hal. 28-37',
    labelCapaianUtama: 'Air Bersih & Pengolahan Limbah B3',
    capaianSubstantifNilai: '3.420 L/dtk · 161,9M m³ Air',
    persenKinerjaSubstantif: 96.8,
    ringkasanMultiMetrik: [
      'Produksi Air Curah: 3.420 L/detik untuk 312.000 Pelanggan',
      'Kapasitas 6 Waduk: 161,96 Jt m³ (96,8% Isi Tampungan)',
      'Limbah B3 Industri: 14.850 Ton Diolah Aman di KPLI Kabil',
      'Hunian Rusunawa: 94% Terisi (4.250 Pekerja Industri)',
      'Realisasi PNBP Air & Fasling: Rp 592,62 Miliar (31,3% Total BP)',
    ],
    unitRouteId: 'deputi-pelayanan-umum',
  },
  {
    id: 'dit-pelabuhan',
    kode: 'BUP',
    nama: 'Dit. Pengelolaan Kepelabuhanan (BUP)',
    klaster: 'Badan Usaha',
    paguMiliar: 185.0,
    realisasiMiliar: 146.2,
    serapanPersen: 79.0,
    pnbpMiliar: 382.4,
    ikpIksUtama: '612.400 TEUs Peti Kemas, 18.420 Call Kapal, 11 Dermaga Batu Ampar',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 25,
    halamanPdf: 'Hal. 14-17',
    labelCapaianUtama: 'Arus Petikemas & Kunjungan Kapal',
    capaianSubstantifNilai: '612k TEUs · 18.420 Kapal',
    persenKinerjaSubstantif: 86.2,
    ringkasanMultiMetrik: [
      'Bongkar Muat Peti Kemas: 612.400 TEUs di Pelabuhan Batu Ampar',
      'Kunjungan Kapal: 18.420 Call Kapal Barang, Curah & Ro-Ro',
      'Terminal Penumpang: 1,84 Juta Penumpang Domestik/Internasional',
      'Operasional Dermaga: 11 Dermaga Komersial Termonitor',
      'PNBP Kepelabuhanan: Rp 382,40 Miliar (Kontribusi 20,2% BLU)',
    ],
    unitRouteId: 'dit-pelabuhan',
  },
  {
    id: 'dit-bandara',
    kode: 'BANDARA',
    nama: 'Dit. Pengelolaan Kawasan Bandara Hang Nadim',
    klaster: 'Direktorat',
    paguMiliar: 82.5,
    realisasiMiliar: 66.8,
    serapanPersen: 81.0,
    pnbpMiliar: 106.82,
    ikpIksUtama: '34.250 Flight, 4,12 Juta Pax, EMPU 42.150 Ton, KEK BAT Aviasi',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 12,
    halamanPdf: 'Hal. 11-12',
    labelCapaianUtama: 'Arus Penumpang & Kargo Udara',
    capaianSubstantifNilai: '4,12M Pax · 42.150 Ton EMPU',
    persenKinerjaSubstantif: 88.2,
    ringkasanMultiMetrik: [
      'Pergerakan Penumpang: 4.120.500 Penumpang Datang/Berangkat',
      'Lalu Lintas Pesawat: 34.250 Flight (Take-off & Landing)',
      'Ekspedisi Muatan Udara: 42.150 Ton Kargo EMPU Terdistribusi',
      'Infrastruktur Runway: 4.025 Meter Terpanjang di Indonesia',
      'PNBP Bandara: Rp 106,82 Miliar & Pengembangan KEK Aviasi BAT',
    ],
    unitRouteId: 'dit-bandara',
  },
  {
    id: 'dit-lahan',
    kode: 'DPL',
    nama: 'Direktorat Pengelolaan Pertanahan',
    klaster: 'Direktorat',
    paguMiliar: 48.6,
    realisasiMiliar: 38.5,
    serapanPersen: 79.2,
    pnbpMiliar: 748.21,
    ikpIksUtama: '248.5 Ha Alokasi Lahan Investasi 7 SWP, UWT Baru & Perpanjangan',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 15,
    halamanPdf: 'Hal. 6-8',
    labelCapaianUtama: 'Alokasi Lahan Investasi 7 SWP',
    capaianSubstantifNilai: '248,5 Ha · Rp 748,2M UWT',
    persenKinerjaSubstantif: 124.3,
    ringkasanMultiMetrik: [
      'Realisasi Alokasi Lahan: 248,50 Ha di 7 Sub-Wilayah Pengembangan',
      'Penyelesaian Dokumen: 1.650 Berkas SKPT, SPPT, & Pecah PL',
      'Penerimaan UWT: Rp 748,21 Miliar (39,5% Total Penerimaan BP)',
      'Rekuperasi Lahan Mangkrak: 94,60 Ha Berhasil Dikembalikan ke Aset BP',
      'Digitalisasi Sistem Lahan: Integrasi SIHPL Online Terakselerasi',
    ],
    unitRouteId: 'dit-lahan',
  },
  {
    id: 'dit-pembangunan',
    kode: 'DPI',
    nama: 'Direktorat Pembangunan Infrastruktur',
    klaster: 'Direktorat',
    paguMiliar: 682.4,
    realisasiMiliar: 466.8,
    serapanPersen: 68.4,
    pnbpMiliar: 7.12,
    ikpIksUtama: '14 Paket Proyek Fisik Strategis, 542.8 Km Jalan, Kurva S, 280 Ha BSW',
    statusKinerja: 'On Track',
    jumlahDatasetSatuData: 6,
    halamanPdf: 'Hal. 48-50',
    labelCapaianUtama: 'Konstruksi Proyek Strategis & Jalan',
    capaianSubstantifNilai: '14 Proyek · 542,8 Km Jalan',
    persenKinerjaSubstantif: 92.4,
    ringkasanMultiMetrik: [
      'Proyek Fisik Berjalan: 14 Paket Konstruksi Jalan, Flyover & Drainase',
      'Flyover Sei Ladi: Progres 84% (Menghilangkan Titik Macet Barat)',
      'Pelebaran Jalan: Koridor Utama Batam Center - Bandara - Nongsa',
      'Kesiapan Tapak Industri: 280 Ha Pematangan Lahan (Cut & Fill)',
      'Jaringan Jalan Mantap: 542,8 Km Terpelihara dengan Kondisi Baik',
    ],
    unitRouteId: 'dit-pembangunan-infrastruktur',
  },
  {
    id: 'dit-perencanaan',
    kode: 'DPR',
    nama: 'Direktorat Perencanaan Infrastruktur',
    klaster: 'Direktorat',
    paguMiliar: 53.68,
    realisasiMiliar: 37.15,
    serapanPersen: 69.2,
    pnbpMiliar: 0.0,
    ikpIksUtama: '43 Paket DED 6 Sektor (Gedung, Jalan, Utilitas, Wisata, Laut, Udara)',
    statusKinerja: 'On Track',
    jumlahDatasetSatuData: 6,
    halamanPdf: 'Hal. 53',
    labelCapaianUtama: 'Paket Detail Engineering Design (DED)',
    capaianSubstantifNilai: '43 Paket DED 6 Sektor',
    persenKinerjaSubstantif: 91.5,
    ringkasanMultiMetrik: [
      'Dokumen DED Selesai: 43 Paket Desain Teknis Multisektoral',
      'Sektor Prioritas: 12 Paket Jalan, 8 Gedung, 9 Drainase/Air, 6 Wisata',
      'Studi Kelayakan Teknis (FS): 8 Kajian Kelayakan Proyek Baru',
      'Sinkronisasi Tata Ruang: Kepatuhan RDTR Kota Batam 100%',
      'Standardisasi Biaya Konstruksi: Update ASB & SSH Sesuai Regulasi',
    ],
    unitRouteId: 'dit-perencanaan-infrastruktur',
  },
  {
    id: 'ptsp',
    kode: 'PTSP',
    nama: 'Pusat Pelayanan Terpadu Satu Pintu',
    klaster: 'Pusat',
    paguMiliar: 18.5,
    realisasiMiliar: 15.2,
    serapanPersen: 82.1,
    pnbpMiliar: 0.0,
    ikpIksUtama: 'SLA Perizinan 88.6%, Skor IKM 89.42 (A), MPP Digital, SKKBM, SKKAB',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 17,
    halamanPdf: 'Hal. 21-28',
    labelCapaianUtama: 'Kecepatan Izin Berusaha & IKM',
    capaianSubstantifNilai: '13.150 Izin · SLA 1,8 Hari',
    persenKinerjaSubstantif: 89.2,
    ringkasanMultiMetrik: [
      'Izin Berusaha Terbit: 13.150 Izin dari 14.850 Permohonan (88,6%)',
      'Kecepatan Layanan: 1,8 Hari Kerja (Standar SLA Maksimal 3 Hari)',
      'Indeks Kepuasan Masyarakat: 89,24 (Mutu A Pelayanan Prima)',
      'Layanan Unggulan: SKKBM, SKKAB, SKKAA, TUKS, MPP Digital 24 Jam',
      'Pengaduan Masyarakat: 96,1% Pengaduan Diselesaikan Tuntas',
    ],
    unitRouteId: 'ptsp',
  },
  {
    id: 'pdsi',
    kode: 'PDSI',
    nama: 'Pusat Data dan Sistem Informasi',
    klaster: 'Pusat',
    paguMiliar: 39.2,
    realisasiMiliar: 32.4,
    serapanPersen: 82.7,
    pnbpMiliar: 10.85,
    ikpIksUtama: 'Kematangan SPBE 4.12, Tier-3 Data Center 96 Rak, Fiber Optik 210 Km',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 21,
    halamanPdf: 'Hal. 40-43',
    labelCapaianUtama: 'Indeks SPBE & Infrastruktur TIK',
    capaianSubstantifNilai: 'SPBE 4,12 (Lv 4) · 99,9% Uptime',
    persenKinerjaSubstantif: 100.0,
    ringkasanMultiMetrik: [
      'Tingkat Kematangan SPBE: 4,12 (Level 4 Keterpaduan Layanan)',
      'Data Center Tier-3: 96 Rak Co-location Aktif (Uptime 99,98%)',
      'Jaringan Fiber Optik: 210 Km Menghubungkan Seluruh Gedung BP',
      'Keamanan Siber: CSIRT BP Batam Tangkal 142 Ribu Ancaman Serangan',
      'PNBP TIK & Komputasi: Rp 10,85 Miliar dari Layanan Data Center',
    ],
    unitRouteId: 'pdsi',
  },
  {
    id: 'biro-keuangan',
    kode: 'BK',
    nama: 'Biro Keuangan',
    klaster: 'Biro',
    paguMiliar: 28.5,
    realisasiMiliar: 23.4,
    serapanPersen: 82.1,
    pnbpMiliar: 38.45,
    ikpIksUtama: 'Opini BPK WTP 8x, Kas BLU Rp 1,42 T, IKPA 95.8, Piutang Rp 312 M',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 28,
    halamanPdf: 'Hal. 2-6',
    labelCapaianUtama: 'Kemandirian Fiskal & Akuntabilitas',
    capaianSubstantifNilai: 'WTP 8x · Kas BLU Rp 1,42T',
    persenKinerjaSubstantif: 100.0,
    ringkasanMultiMetrik: [
      'Opini Laporan Keuangan: WTP BPK RI (8 Tahun Berturut-turut)',
      'Likuiditas Kas BLU: Rp 1,428 Triliun Ditempatkan Aman di Bank Persepsi',
      'Indikator Kinerja Pelaksanaan Anggaran (IKPA): 95,8 (Sangat Baik)',
      'Penyelesaian Piutang: Rp 142,8 Miliar Tertagih YTD',
      'Rasio Kemandirian Finansial: 0,96 Menjamin Operasional Mandiri',
    ],
    unitRouteId: 'biro-keuangan',
  },
  {
    id: 'biro-sdm',
    kode: 'BSDM',
    nama: 'Biro Sumber Daya Manusia',
    klaster: 'Biro',
    paguMiliar: 19.8,
    realisasiMiliar: 16.2,
    serapanPersen: 81.8,
    pnbpMiliar: 0.0,
    ikpIksUtama: '2.978 Pegawai, Indeks Sistem Merit 342.5 (Sangat Baik), 20 JP Diklat',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 13,
    halamanPdf: 'Hal. 1-2',
    labelCapaianUtama: 'Sistem Merit ASN & Kapasitas SDM',
    capaianSubstantifNilai: 'Merit 342,5 · 2.978 Pegawai',
    persenKinerjaSubstantif: 100.0,
    ringkasanMultiMetrik: [
      'Indeks Sistem Merit KASN: 342,5 / 400 (Kategori IV Sangat Baik)',
      'Total Aparatur Termonitor: 2.978 Pegawai (PNS 842, PPPK 418, PTT 1.718)',
      'Pengembangan Kompetensi: Rata-rata 22,4 Jam Pelajaran (JP) / Pegawai',
      'Manajemen Talenta: 100% Posisi Kunci Terpetakan Dalam Talent Pool',
      'Digitalisasi Presensi: Kehadiran 98,2% Terdata Real-Time di SIAP',
    ],
    unitRouteId: 'biro-sdm',
  },
  {
    id: 'biro-okmr',
    kode: 'BOKMR',
    nama: 'Biro Organisasi, Kepatuhan & Manajemen Risiko',
    klaster: 'Biro',
    paguMiliar: 14.2,
    realisasiMiliar: 11.8,
    serapanPersen: 83.1,
    pnbpMiliar: 0.0,
    ikpIksUtama: 'SAKIP 82.68 (A), Maturitas SPIP 3.42, PEKPPP 4.38, 24 Piagam Risiko',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 18,
    halamanPdf: 'Hal. 38-40',
    labelCapaianUtama: 'SAKIP, SPIP & Manajemen Risiko',
    capaianSubstantifNilai: 'SAKIP 82,68 (A) · SPIP 3,42',
    persenKinerjaSubstantif: 101.7,
    ringkasanMultiMetrik: [
      'Nilai Akuntabilitas Kinerja (SAKIP): 82,68 (Predikat A Memuaskan)',
      'Maturitas SPIP: 3,42 (Level 3 Terdefinisi - Standar BPKP)',
      'Piagam Manajemen Risiko: 24 Unit Kerja Memiliki Risk Register Valid',
      'Indeks Pelayanan Publik (PEKPPP): 4,38 (Sangat Baik / Pelayanan Prima)',
      'Tindak Lanjut Rekomendasi Pengawasan: 94,8% Selesai Ditindaklanjuti',
    ],
    unitRouteId: 'biro-organisasi',
  },
  {
    id: 'biro-umum',
    kode: 'BUM',
    nama: 'Biro Umum & Pengadaan',
    klaster: 'Biro',
    paguMiliar: 62.4,
    realisasiMiliar: 51.2,
    serapanPersen: 82.0,
    pnbpMiliar: 0.0,
    ikpIksUtama: 'Pengelolaan BMN Rp 4,8 T, Tender LPSE Bebas Sanggah, Indeks Aset 85.2',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 27,
    halamanPdf: 'Hal. 43-46',
    labelCapaianUtama: 'Pengadaan Barang & Manajemen BMN',
    capaianSubstantifNilai: 'BMN Rp 4,8T · LPSE Akuntabel',
    persenKinerjaSubstantif: 98.0,
    ringkasanMultiMetrik: [
      'Nilai Barang Milik Negara (BMN): Rp 4,82 Triliun Terinventarisasi 100%',
      'Efisiensi Pengadaan Tender: Penghematan Rp 42,5 Miliar Melalui e-Katalog',
      'Tender LPSE: 148 Paket Pengadaan Berjalan Tanpa Sanggah Banding',
      'Indeks Pengelolaan Aset: 85,2 (Kategori Sangat Baik)',
      'Sertifikasi BMN: 182 Sertifikat Aset Gedung & Tanah Diselesaikan',
    ],
    unitRouteId: 'biro-organisasi',
  },
  {
    id: 'biro-hukum',
    kode: 'BHUK',
    nama: 'Biro Hukum',
    klaster: 'Biro',
    paguMiliar: 6.8,
    realisasiMiliar: 4.96,
    serapanPersen: 73.0,
    pnbpMiliar: 0.0,
    ikpIksUtama: '100% Advokasi Perkara Menang, 28 Harmonisasi Perka Investasi',
    statusKinerja: 'On Track',
    jumlahDatasetSatuData: 10,
    halamanPdf: 'Hal. 2',
    labelCapaianUtama: 'Regulasi Perka & Advokasi Hukum',
    capaianSubstantifNilai: '28 Perka Disahkan · 100% Advokasi',
    persenKinerjaSubstantif: 100.0,
    ringkasanMultiMetrik: [
      'Produk Hukum Disahkan: 28 Peraturan Kepala & Keputusan Kepala BP',
      'Harmonisasi Regulasi: Deregulasi Kemudahan Investasi & Tarif BLU',
      'Advokasi Litigasi: 100% Perkara Perdata/TUN Dimenangkan / Selesai Damai',
      'Pemberian Legal Opinion: 84 Pendapat Hukum untuk Pengambilan Keputusan',
      'Jaringan Dokumentasi Informasi Hukum (JDIH): Terintegrasi Nasional',
    ],
    unitRouteId: 'biro-hukum',
  },
  {
    id: 'spi',
    kode: 'SPI',
    nama: 'Satuan Pemeriksaan Intern (SPI)',
    klaster: 'Satuan',
    paguMiliar: 5.6,
    realisasiMiliar: 4.6,
    serapanPersen: 82.1,
    pnbpMiliar: 0.0,
    ikpIksUtama: 'Tindak Lanjut Temuan BPK 92.4%, Audit Berbasis Risiko 24 Satker',
    statusKinerja: 'Tercapai',
    jumlahDatasetSatuData: 5,
    halamanPdf: 'Hal. 8',
    labelCapaianUtama: 'Audit Kepatuhan & Tindak Lanjut BPK',
    capaianSubstantifNilai: '92,4% TL BPK · 24 Satker Diaudit',
    persenKinerjaSubstantif: 98.5,
    ringkasanMultiMetrik: [
      'Tindak Lanjut Temuan BPK RI: 92,4% Rekomendasi Selesai Tuntas',
      'Audit Operasional Internal: 24 Satuan Kerja Diaudit Berbasis Risiko',
      'Probity Audit Megaproyek: Pendampingan Pengadaan Fisik Strategis',
      'Pencegahan Gratifikasi & WBS: 100% Laporan Whistleblowing Ditindaklanjuti',
      'Maturitas Tata Kelola Pengawasan: Sinergi dengan BPKP & Itjen Kemenkeu',
    ],
    unitRouteId: 'biro-organisasi',
  },
];

// ============================================================================
// DATA RANGKUMAN MULTI-INDIKATOR STRATEGIS LINTAS DIREKTORAT, BIRO, PUSAT & BADAN USAHA
// Untuk memenuhi kebutuhan pemantauan komprehensif Kepala BP Batam (Multi-Metrik per Sektor)
// ============================================================================
export interface MultiMetrikItem {
  label: string;
  nilai: string;
  target?: string;
  status: 'Tercapai' | 'On Track' | 'Perlu Perhatian' | 'Normal';
  subtext: string;
}

export interface MultiSektorStrategicSummary {
  id: string;
  sektor: string;
  judul: string;
  deskripsi: string;
  satkerTerkait: { nama: string; routeId: string; kode: string }[];
  metrikList: MultiMetrikItem[];
  highlightUtama: string;
  iconName: string;
  themeColor: string;
}

export const KONSOLIDASI_MULTI_SEKTOR_BP_BATAM: MultiSektorStrategicSummary[] = [
  {
    id: 'sektor-logistik-aviasi',
    sektor: 'Konektivitas Logistik & Aviasi Bebas',
    judul: 'Maritim Batu Ampar, Bandara Hang Nadim & Lalu Lintas Barang',
    deskripsi:
      'Integrasi multi-moda transportasi laut, udara, dan percepatan dokumen logistik ekspor-impor kawasan perdagangan bebas.',
    satkerTerkait: [
      { nama: 'Dit. Pengelolaan Kepelabuhanan', routeId: 'dit-pelabuhan', kode: 'BUP' },
      { nama: 'Dit. Kawasan Bandara Hang Nadim', routeId: 'dit-bandara', kode: 'BANDARA' },
      { nama: 'Dit. Lalu Lintas Barang', routeId: 'dit-lalu-lintas-barang', kode: 'LLB' },
    ],
    metrikList: [
      {
        label: 'Penerbitan Izin Pengeluaran Barang',
        nilai: '1.842 Izin Terbit',
        target: 'SLA Rerata 1,4 Jam',
        status: 'Tercapai',
        subtext: 'Dit. LLB (Dataset #7 Hal. 9): Izin Pengeluaran Barang Hasil Olahan Industri',
      },
      {
        label: 'Penerbitan Izin Pemasukan Barang',
        nilai: '2.450 Izin Terbit',
        target: 'SLA Rerata 1,2 Jam',
        status: 'Tercapai',
        subtext: 'Dit. LLB (Dataset #6 Hal. 9): Izin Pemasukan Bahan Baku & Mesin Pabrik',
      },
      {
        label: 'Ketepatan Waktu Pelayanan Dokumen LLB',
        nilai: '98,2% Tepat Waktu',
        target: 'SLA Rata-rata 1,3 Jam',
        status: 'Tercapai',
        subtext: 'Dit. LLB (Dataset #8 & #9 Hal. 9): Pelayanan Industri & Perdagangan',
      },
      {
        label: 'Arus Penumpang Pelabuhan Domestik & Internasional',
        nilai: '6.842.100 Penumpang',
        target: '4 Terminal Aktif',
        status: 'Tercapai',
        subtext: 'Dit. Pelabuhan (Dataset #25 Hal. 17): Batam Center, Harbour Bay, Sekupang',
      },
      {
        label: 'Ekspedisi Muatan Pesawat Udara (EMPU)',
        nilai: '42.150 Ton Kargo',
        target: 'Target 45k Ton',
        status: 'On Track',
        subtext: 'Dit. Bandara (Dataset #5 Hal. 12): Kargo, Bagasi & Pos Hang Nadim',
      },
      {
        label: 'Realisasi PNBP Kepelabuhanan',
        nilai: 'Rp 382,40 Miliar',
        target: 'Porsi 20,2% PNBP',
        status: 'Tercapai',
        subtext: 'Dit. Pelabuhan (Dataset #3 Hal. 15): Jasa Labuh Tambat & Dermaga',
      },
    ],
    highlightUtama: 'Throughput 612.400 TEUs TPK Batu Ampar (Hal. 17), 4.292 Penerbitan Izin LLB (Hal. 9), & 42.150 Ton EMPU Hang Nadim (Hal. 12)',
    iconName: 'Ship',
    themeColor: 'from-blue-900 to-indigo-950',
  },
  {
    id: 'sektor-investasi-kek',
    sektor: 'Investasi, KEK & Kemudahan Berusaha',
    judul: 'Investasi PMA/PMDN, 4 Klaster KEK & Perizinan Berusaha PTSP',
    deskripsi:
      'Akselerasi realisasi investasi modal tetap dan lancar, pengembangan kawasan ekonomi khusus, dan pelayanan terpadu digital.',
    satkerTerkait: [
      { nama: 'Dit. Pengembangan KEK & Investasi', routeId: 'dit-investasi', kode: 'INVESTASI' },
      { nama: 'Pusat Pelayanan Terpadu Satu Pintu', routeId: 'ptsp', kode: 'PTSP' },
      { nama: 'Dit. Pengendalian Pengusahaan', routeId: 'dit-pengendalian-pengusahaan', kode: 'PP' },
      { nama: 'Dit. Kawasan KEK', routeId: 'dit-kek', kode: 'KEK' },
    ],
    metrikList: [
      {
        label: 'SLA Perizinan Berusaha PTSP',
        nilai: '1,8 Hari Kerja',
        target: 'Standar SLA Maks 3 Hari',
        status: 'Tercapai',
        subtext: 'Ketepatan waktu 88,6% penerbitan izin di MPP Digital',
      },
      {
        label: 'Investasi 4 Klaster KEK',
        nilai: 'Rp 9,09 Triliun',
        target: 'Target Rp 11,5 T',
        status: 'On Track',
        subtext: 'KEK BAT, Nongsa Digital, Sekupang, Tanjung Sauh',
      },
      {
        label: 'Penerbitan Izin Berusaha PTSP',
        nilai: '13.150 Izin Terbit',
        target: 'Efektivitas 88,6%',
        status: 'Tercapai',
        subtext: 'Dari 14.850 permohonan masuk di MPP Digital',
      },
      {
        label: 'Calon Investor Dalam Pipeline',
        nilai: '52 Investor PMA/PMDN',
        target: 'Komitmen Rp 18,2 T',
        status: 'On Track',
        subtext: '42 Perjanjian Kerjasama (PKS) Usaha Termonitor Dit. PP',
      },
      {
        label: 'Skor IKM Pelayanan PTSP',
        nilai: '89,24 (Mutu A)',
        target: 'Standar Prima PermenPAN',
        status: 'Tercapai',
        subtext: 'Survei kepuasan 14.850 pelaku usaha investor Batam',
      },
    ],
    highlightUtama: 'Skor IKM PTSP 89,24 (Mutu A Pelayanan Prima) dengan 52 Calon Investor Baru dalam Pipeline',
    iconName: 'TrendingUp',
    themeColor: 'from-sky-900 to-blue-950',
  },
  {
    id: 'sektor-air-medis-lingkungan',
    sektor: 'Ketahanan Air Baku, Medis & Fasilitas Kawasan',
    judul: 'BU SPAM 6 Waduk, KPLI Kabil & Rumah Sakit BP Batam (RSBP)',
    deskripsi:
      'Jaminan ketersediaan air bersih kota, pengelolaan limbah B3 industri berstandar lingkungan, dan layanan kesehatan rujukan.',
    satkerTerkait: [
      { nama: 'BU SPAM, Fasilitas dan Lingkungan', routeId: 'deputi-pelayanan-umum', kode: 'SPAM' },
      { nama: 'Badan Usaha Rumah Sakit (RSBP)', routeId: 'bu-rumah-sakit', kode: 'BURS' },
      { nama: 'Dit. Pengamanan Aset (Waduk)', routeId: 'dit-pam-aset', kode: 'DITPAM' },
    ],
    metrikList: [
      {
        label: 'Distribusi Air Bersih WTP',
        nilai: '3.420 Liter/detik',
        target: '312.000 Pelanggan',
        status: 'Normal',
        subtext: '23 District Meter Area (DMZ) termonitor telemetri',
      },
      {
        label: 'Bed Occupancy Rate RSBP',
        nilai: '76,2% BOR',
        target: 'Ideal 70 - 85%',
        status: 'Tercapai',
        subtext: 'Cost Recovery Rate 111,4% (Surplus Operasional Sehat)',
      },
      {
        label: 'Kunjungan Pasien & Spesialis',
        nilai: '2.100 Pasien Inap',
        target: '18 Poliklinik Aktif',
        status: 'Tercapai',
        subtext: 'Layanan Cath Lab Jantung, Hemodialisa, MCU KEK',
      },
      {
        label: 'Pengolahan Limbah B3 KPLI',
        nilai: '14.850 Ton Limbah B3',
        target: 'Kawasan KPLI Kabil',
        status: 'Normal',
        subtext: 'Baku mutu ramah lingkungan bersertifikasi KLHK',
      },
      {
        label: 'Tingkat Hunian Rusunawa Industri',
        nilai: '94,0% Terisi',
        target: '4.250 Jiwa Pekerja',
        status: 'Tercapai',
        subtext: 'Hunian pekerja kawasan industri Mukakuning & Kabil',
      },
    ],
    highlightUtama: 'Kapasitas 6 Waduk Aman pada 161,9M m³ & RSBP Mencatat Cost Recovery Rate 111,4% Mandiri',
    iconName: 'Droplets',
    themeColor: 'from-teal-900 to-cyan-950',
  },
  {
    id: 'sektor-lahan-aset-keamanan',
    sektor: 'Tata Ruang Darat, Pesisir & Pengamanan Aset',
    judul: 'Alokasi Lahan 7 SWP, Reklamasi Ruang Laut & Penertiban Ditpam',
    deskripsi:
      'Optimalisasi tata guna tanah, penerbitan UWT, perlindungan kawasan hutan lindung, dan penertiban aset vital BP Batam.',
    satkerTerkait: [
      { nama: 'Dit. Pengelolaan Pertanahan', routeId: 'dit-lahan', kode: 'DPL' },
      { nama: 'Dit. Pengamanan Aset & Kawasan', routeId: 'dit-pam-aset', kode: 'DITPAM' },
      { nama: 'Dit. Pengendalian Pertanahan', routeId: 'dit-pengendalian-lahan', kode: 'D-KONTROL' },
      { nama: 'Dit. Kawasan Pesisir & Reklamasi', routeId: 'dit-pesisir-reklamasi', kode: 'PESISIR' },
    ],
    metrikList: [
      {
        label: 'Operasi Penertiban Bangunan Liar',
        nilai: '874 Lokasi Tertib',
        target: 'Dari 1.030 Terdata (84,8%)',
        status: 'Tercapai',
        subtext: 'Dilaksanakan 524 personel Ditpam & Damkar terpadu',
      },
      {
        label: 'Izin Ruang Laut & Reklamasi',
        nilai: '162,80 Hektar',
        target: 'Dokumen PKKPRL Disahkan',
        status: 'Tercapai',
        subtext: 'Kesesuaian pemanfaatan ruang perairan pesisir Batam',
      },
      {
        label: 'Sterilisasi Catchment Area Waduk',
        nilai: '142 Hektar Steril',
        target: 'Waduk Duriangkang Aman',
        status: 'Tercapai',
        subtext: 'Bebas dari perambahan perkebunan & hunian liar',
      },
      {
        label: 'PNBP Pengelolaan Lahan (UWT)',
        nilai: 'Rp 748,21 Miliar',
        target: 'Porsi 39,5% PNBP BP Batam',
        status: 'Tercapai',
        subtext: 'Penyelesaian 1.650 berkas SKPT, SPPT, & UWT Perpanjangan',
      },
      {
        label: 'Pematangan Lahan Industri (BSW)',
        nilai: '280 Hektar',
        target: 'Kesiapan Tapak Investasi',
        status: 'Tercapai',
        subtext: 'Cut & Fill area pengembangan industri & logistik',
      },
    ],
    highlightUtama: 'Alokasi Lahan Melampaui Target (124,3%) & 142 Ha Catchment Area Duriangkang Berhasil Disterilisasi',
    iconName: 'Shield',
    themeColor: 'from-emerald-950 to-slate-900',
  },
  {
    id: 'sektor-infrastruktur-teknis',
    sektor: 'Infrastruktur Konektivitas & Desain Teknis',
    judul: 'Proyek Fisik Strategis, Jalan Raya & Perencanaan DED',
    deskripsi:
      'Percepatan konektivitas darat kota Batam, pembangunan flyover pengurai kemacetan, drainase pengendali banjir, dan kesiapan tapak kawasan.',
    satkerTerkait: [
      { nama: 'Dit. Pembangunan Infrastruktur', routeId: 'dit-pembangunan-infrastruktur', kode: 'DPI' },
      { nama: 'Dit. Perencanaan Infrastruktur', routeId: 'dit-perencanaan-infrastruktur', kode: 'DPR' },
    ],
    metrikList: [
      {
        label: 'Flyover Simpang Sei Ladi',
        nilai: '84,0% Progres',
        target: 'Target Rampung 2026',
        status: 'On Track',
        subtext: 'Pembangunan jembatan layang pengurai simpang jalan arteri',
      },
      {
        label: 'Jaringan Jalan Arteri & Kolektor',
        nilai: '542,8 Km Mantap',
        target: 'Kondisi Baik 96,2%',
        status: 'Tercapai',
        subtext: 'Pemeliharaan berkala ruas penghubung bandara-pelabuhan',
      },
      {
        label: 'Paket Desain DED 6 Sektor',
        nilai: '43 Paket DED',
        target: '100% Siap Tender Konstruksi',
        status: 'Tercapai',
        subtext: 'Gedung, jalan, jembatan, drainase, dermaga, wisata',
      },
      {
        label: 'Pagu Belanja Modal Fisik',
        nilai: 'Rp 682,43 Miliar',
        target: 'Serapan Fisik 92,4%',
        status: 'On Track',
        subtext: 'Realisasi belanja kas Rp 466,8M (68,4%)',
      },
      {
        label: 'Normalisasi Drainase Pengendali Banjir',
        nilai: '28 Ruas Kanal',
        target: 'Bebas Genangan Kawasan',
        status: 'Tercapai',
        subtext: 'Pencegahan genangan di koridor industri & pemukiman',
      },
    ],
    highlightUtama: 'Flyover Sei Ladi Mencapai 84% & 43 Paket DED Siap Ditenderkan Mendukung Konektivitas Kawasan',
    iconName: 'HardHat',
    themeColor: 'from-amber-950 to-slate-900',
  },
  {
    id: 'sektor-tata-kelola-institusi',
    sektor: 'Tata Kelola, Keuangan, SDM & SPBE Digital',
    judul: 'SAKIP, Sistem Merit ASN, Kedaulatan SPBE & Opini BPK WTP',
    deskripsi:
      'Akuntabilitas pelaksanaan anggaran, profesionalitas aparatur, integrasi satu data dan sistem pemerintahan berbasis elektronik.',
    satkerTerkait: [
      { nama: 'Biro Keuangan', routeId: 'biro-keuangan', kode: 'BK' },
      { nama: 'Biro Sumber Daya Manusia', routeId: 'biro-sdm', kode: 'BSDM' },
      { nama: 'Biro OKMR', routeId: 'biro-organisasi', kode: 'BOKMR' },
      { nama: 'Pusat Data & Sistem Informasi', routeId: 'pdsi', kode: 'PDSI' },
      { nama: 'Biro Hukum', routeId: 'biro-hukum', kode: 'BHUK' },
    ],
    metrikList: [
      {
        label: 'Serapan Realisasi Belanja BP Batam',
        nilai: '77,6% Serapan',
        target: 'Target Perkin: 75,0%',
        status: 'Tercapai',
        subtext: 'Realisasi Rp 1,96 Triliun dari Pagu Rp 2,53 Triliun',
      },
      {
        label: 'Kemandirian Finansial BLU',
        nilai: 'Rasio 0,96',
        target: 'Rasio Sehat >= 0,90',
        status: 'Tercapai',
        subtext: 'Saldo Kas Penampung BLU Rp 1,42 Triliun Terjaga Likuid & Aman',
      },
      {
        label: 'Indeks Sistem Merit Aparatur',
        nilai: 'Skor 342,5 / 400',
        target: 'Kategori IV Sangat Baik KASN',
        status: 'Tercapai',
        subtext: 'Untuk 2.978 pegawai (PNS, PPPK, PTT Kontrak)',
      },
      {
        label: 'Kematangan SPBE Digital',
        nilai: 'Indeks 4,12 (Level 4)',
        target: 'Keterpaduan Layanan Satu Data',
        status: 'Tercapai',
        subtext: 'Tier-3 Data Center (99,9% Uptime) & CSIRT Cyber Shield',
      },
      {
        label: 'Opini BPK atas LapKeu',
        nilai: 'WTP (Wajar Tanpa Pengecualian)',
        target: '8 Tahun Berturut-turut',
        status: 'Tercapai',
        subtext: 'Saldo kas penampung BLU Rp 1,428 Triliun terjaga sehat',
      },
    ],
    highlightUtama: 'Opini BPK WTP 8x Berturut-turut, Sistem Merit 342,5 & Maturitas SPIP Level 3 Terdefinisi',
    iconName: 'Building2',
    themeColor: 'from-purple-950 to-slate-900',
  },
];


// ============================================================================
// 9. DATA TAMBAHAN PEMANTAUAN STRATEGIS KEPALA BP BATAM
// ============================================================================

export interface WadukBatamItem {
  id: string;
  nama: string;
  kapasitasJutaM3: number;
  elevasiM: number;
  elevasiNormalM: number;
  status: 'Normal' | 'Siaga' | 'Waspada';
  suplaiLps: number;
  persenIsi: number;
}

export const DATA_6_WADUK_BATAM: WadukBatamItem[] = [
  { id: 'w-dur', nama: 'Waduk Duriangkang', kapasitasJutaM3: 78.56, elevasiM: 6.12, elevasiNormalM: 6.0, status: 'Normal', suplaiLps: 2200, persenIsi: 98.2 },
  { id: 'w-tem', nama: 'Waduk Tembesi', kapasitasJutaM3: 56.40, elevasiM: 4.85, elevasiNormalM: 4.8, status: 'Normal', suplaiLps: 600, persenIsi: 96.5 },
  { id: 'w-muk', nama: 'Waduk Mukakuning', kapasitasJutaM3: 13.20, elevasiM: 12.40, elevasiNormalM: 12.0, status: 'Normal', suplaiLps: 310, persenIsi: 95.0 },
  { id: 'w-lad', nama: 'Waduk Sei Ladi', kapasitasJutaM3: 9.45, elevasiM: 9.60, elevasiNormalM: 10.2, status: 'Siaga', suplaiLps: 240, persenIsi: 86.4 },
  { id: 'w-har', nama: 'Waduk Sei Harapan', kapasitasJutaM3: 3.63, elevasiM: 7.80, elevasiNormalM: 7.8, status: 'Normal', suplaiLps: 210, persenIsi: 94.1 },
  { id: 'w-non', nama: 'Waduk Nongsa', kapasitasJutaM3: 0.72, elevasiM: 3.20, elevasiNormalM: 3.2, status: 'Normal', suplaiLps: 60, persenIsi: 92.0 },
];

export const DATA_LOGISTIK_FTZ_BATAM = {
  nilaiEksporMiliarUsd: 14.82,
  nilaiImporMiliarUsd: 12.18,
  surplusNeracaUsd: 2.64,
  dokumenPpftz: 48250,
  slaClearanceJam: 1.4,
  slaTargetJam: 2.0,
  efektivitasClearancePersen: 98.4,
  arusPetiKemasTeus: 612400,
  vesselCallsKapal: 18420,
  penumpangPelabuhan: 1840000,
  penerbanganFlight: 34250,
  penumpangBandara: 4120500,
  kargoUdaraEmpuTon: 42150,
};

export const DATA_SDM_DAN_TATA_KELOLA = {
  totalPegawai: 2978,
  pns: 842,
  pppk: 418,
  pttKontrak: 1718,
  sistemMeritSkor: 342.5,
  sistemMeritKategori: 'Sangat Baik (KASN)',
  indeksSakip: 82.68,
  predikatSakip: 'A (Memuaskan)',
  indeksSpbe: 3.65,
  kategoriSpbe: 'Sangat Baik',
  opiniBpk: 'WTP (8 Tahun Berturut-turut)',
  saldoKasBankMiliar: 1428.5,
  piutangTertagihMiliar: 142.8,
  ikpaNilai: 95.8,
};

export const DATA_7_SWP_LAHAN = [
  { swp: 'Batam Kota', luasHa: 2840, alokasiHa: 68.4, izinPemanfaatan: 142, status: 'Padat Investasi' },
  { swp: 'Nongsa (KEK)', luasHa: 4120, alokasiHa: 84.2, izinPemanfaatan: 88, status: 'Digital & Pariwisata' },
  { swp: 'Batu Aji', luasHa: 1980, alokasiHa: 24.5, izinPemanfaatan: 64, status: 'Residensial & UMKM' },
  { swp: 'Sekupang (KEK)', luasHa: 2450, alokasiHa: 32.8, izinPemanfaatan: 52, status: 'Kesehatan & Maritim' },
  { swp: 'Sagulung', luasHa: 2120, alokasiHa: 18.2, izinPemanfaatan: 46, status: 'Industri & Galangan' },
  { swp: 'Lubuk Baja', luasHa: 1180, alokasiHa: 11.4, izinPemanfaatan: 38, status: 'Komersial Kota' },
  { swp: 'Batu Ampar', luasHa: 940, alokasiHa: 9.0, izinPemanfaatan: 29, status: 'Pelabuhan & Logistik' },
];

// ============================================================================
// 10. PEMANTAUAN MEGAPROYEK & INFRASTRUKTUR STRATEGIS BATAM
// ============================================================================
export interface MegaproyekStrategisItem {
  id: string;
  nama: string;
  lokasi: string;
  sektor: 'Konektivitas' | 'Maritim' | 'Aviasi' | 'Air Minum' | 'Kawasan';
  paguMiliar: number;
  realisasiMiliar: number;
  progresFisikPersen: number;
  targetFisikPersen: number;
  deviasiPersen: number;
  status: 'Ahead' | 'On Schedule' | 'Minor Delay';
  targetSelesai: string;
  kontraktor: string;
  outputSpesifikasi: string;
  catatanKepalaBp: string;
}

export const DATA_MEGAPROYEK_STRATEGIS: MegaproyekStrategisItem[] = [
  {
    id: 'mp-sei-ladi',
    nama: 'Pembangunan Flyover Sei Ladi & Penataan Simpang',
    lokasi: 'Simpang Sei Ladi - Sekupang / Batam Center',
    sektor: 'Konektivitas',
    paguMiliar: 132.8,
    realisasiMiliar: 125.1,
    progresFisikPersen: 94.2,
    targetFisikPersen: 91.5,
    deviasiPersen: 2.7,
    status: 'Ahead',
    targetSelesai: 'Mei 2026',
    kontraktor: 'PT Adhi Karya (Persero) Tbk',
    outputSpesifikasi: 'Flyover bentang 120m, 2 jalur 4 lajur, mengurai 48% kemacetan arteri',
    catatanKepalaBp: 'Tahap pengaspalan lapis akhir dan ornamen estetika Melayu.',
  },
  {
    id: 'mp-batu-ampar',
    nama: 'Modernisasi Terminal Peti Kemas Batu Ampar (STS Crane)',
    lokasi: 'Dermaga Utara Pelabuhan Batu Ampar',
    sektor: 'Maritim',
    paguMiliar: 380.0,
    realisasiMiliar: 328.7,
    progresFisikPersen: 86.5,
    targetFisikPersen: 85.0,
    deviasiPersen: 1.5,
    status: 'Ahead',
    targetSelesai: 'Agustus 2026',
    kontraktor: 'Konsorsium PT Wijaya Karya - PT Pelindo',
    outputSpesifikasi: 'Pemasangan STS Crane Otomatis, CFS Modern & Container Yard 12 Ha',
    catatanKepalaBp: 'Dwell time diproyeksikan terpangkas dari 3,8 hari menjadi 1,9 hari.',
  },
  {
    id: 'mp-hang-nadim-t2',
    nama: 'Terminal 2 & Fasilitas Kargo Bandara Hang Nadim',
    lokasi: 'Kawasan Bandara Internasional Hang Nadim',
    sektor: 'Aviasi',
    paguMiliar: 420.5,
    realisasiMiliar: 329.6,
    progresFisikPersen: 78.4,
    targetFisikPersen: 77.0,
    deviasiPersen: 1.4,
    status: 'On Schedule',
    targetSelesai: 'Desember 2026',
    kontraktor: 'PT Bandara Internasional Batam (BIB - Incheon & Wika)',
    outputSpesifikasi: 'Terminal 2 kapasitas 6,5 Juta penumpang/thn & gudang EMPU 60.000 ton',
    catatanKepalaBp: 'Struktur baja utama telah rampung 100%, lanjut instalasi ME.',
  },
  {
    id: 'mp-arteri-sudirman',
    nama: 'Pelebaran Jalan Arteri Sudirman & Yos Sudarso (ROW 100)',
    lokasi: 'Koridor Batam Center - Batu Ampar - Mukakuning',
    sektor: 'Konektivitas',
    paguMiliar: 215.4,
    realisasiMiliar: 196.0,
    progresFisikPersen: 91.0,
    targetFisikPersen: 90.0,
    deviasiPersen: 1.0,
    status: 'Ahead',
    targetSelesai: 'Juli 2026',
    kontraktor: 'PT Pembangunan Perumahan (Persero) Tbk',
    outputSpesifikasi: 'Pelebaran menjadi 5 lajur per jalur, drainase tertutup & jalur sepeda',
    catatanKepalaBp: 'Segmen Simpang Jam ke Simpang KDA tuntas, segmen utara finishing.',
  },
  {
    id: 'mp-pipa-spam',
    nama: 'Pipa Transmisi SPAM & Booster Pump Duriangkang - Mukakuning',
    lokasi: 'Jalur Transmisi Duriangkang - Tembesi - Batu Aji',
    sektor: 'Air Minum',
    paguMiliar: 185.0,
    realisasiMiliar: 163.2,
    progresFisikPersen: 88.2,
    targetFisikPersen: 87.5,
    deviasiPersen: 0.7,
    status: 'On Schedule',
    targetSelesai: 'September 2026',
    kontraktor: 'PT Nindya Karya (Persero)',
    outputSpesifikasi: 'Pipa baja dia. 1.000mm sepanjang 18,4 Km + 2 unit booster pump 600 lps',
    catatanKepalaBp: 'Menjamin kontinuitas pasokan air kawasan industri Mukakuning & Batu Aji.',
  },
  {
    id: 'mp-koridor-rempang',
    nama: 'Pembangunan Koridor Jalan Akses & Jembatan Rempang',
    lokasi: 'Kawasan Rempang Eco-City & Koridor Barelang',
    sektor: 'Kawasan',
    paguMiliar: 168.2,
    realisasiMiliar: 121.9,
    progresFisikPersen: 72.5,
    targetFisikPersen: 74.0,
    deviasiPersen: -1.5,
    status: 'Minor Delay',
    targetSelesai: 'November 2026',
    kontraktor: 'PT Hutama Karya (Persero) Tbk',
    outputSpesifikasi: 'Jalan akses 22 Km menghubungkan Jembatan 4 Barelang ke kawasan industri',
    catatanKepalaBp: 'Percepatan relokasi utilitas dan pematangan tanah zona industri terpadu.',
  },
];

// ============================================================================
// 11. PEMANTAUAN 4 KAWASAN EKONOMI KHUSUS (KEK) BATAM
// ============================================================================
export interface KekBatamItem {
  id: string;
  nama: string;
  fokus: string;
  luasHa: number;
  komitmenInvestasiTriliun: number;
  realisasiInvestasiTriliun: number;
  persenCapaian: number;
  jumlahTenantUsaha: number;
  tenagaKerjaOrang: number;
  proyekUnggulan: string;
  status: 'Operasional Prima' | 'Tahap Ekspansi' | 'Tahap Konstruksi';
}

export const DATA_4_KEK_BATAM: KekBatamItem[] = [
  {
    id: 'kek-ndp',
    nama: 'KEK Nongsa Digital Park (NDP)',
    fokus: 'Digital Hub, Tier 3/4 Data Center, Animasi & AI Academy',
    luasHa: 166.45,
    komitmenInvestasiTriliun: 39.8,
    realisasiInvestasiTriliun: 4.82,
    persenCapaian: 12.11,
    jumlahTenantUsaha: 28,
    tenagaKerjaOrang: 2850,
    proyekUnggulan: 'GDS Data Center (54MW), Princeton Digital, Infinite Studios, Apple Academy',
    status: 'Operasional Prima',
  },
  {
    id: 'kek-bat',
    nama: 'KEK Batam Aero Technic (BAT)',
    fokus: 'Maintenance, Repair & Overhaul (MRO) Aviasi Terpadu',
    luasHa: 30.0,
    komitmenInvestasiTriliun: 7.29,
    realisasiInvestasiTriliun: 2.64,
    persenCapaian: 36.21,
    jumlahTenantUsaha: 8,
    tenagaKerjaOrang: 2140,
    proyekUnggulan: '14 Hanggar MRO Lion Air Group, Bengkel Mesin CFM56, Gudang Suku Cadang',
    status: 'Operasional Prima',
  },
  {
    id: 'kek-tanjung-sauh',
    nama: 'KEK Tanjung Sauh',
    fokus: 'Pelabuhan Kontainer Internasional & Pembangkit Listrik Hijau',
    luasHa: 840.67,
    komitmenInvestasiTriliun: 199.6,
    realisasiInvestasiTriliun: 1.25,
    persenCapaian: 0.63,
    jumlahTenantUsaha: 4,
    tenagaKerjaOrang: 680,
    proyekUnggulan: 'Terminal Peti Kemas 5 Juta TEUs & PLTS Terapung 1.000 MWp',
    status: 'Tahap Ekspansi',
  },
  {
    id: 'kek-kesehatan-sekupang',
    nama: 'KEK Kesehatan Sekupang',
    fokus: 'Medical Tourism, International Hospital & Riset Farmasi',
    luasHa: 44.5,
    komitmenInvestasiTriliun: 6.91,
    realisasiInvestasiTriliun: 0.78,
    persenCapaian: 11.29,
    jumlahTenantUsaha: 6,
    tenagaKerjaOrang: 920,
    proyekUnggulan: 'Mayapada Apollo Hospital Batam, Pusat Onkologi & Wellness Hub RSBP',
    status: 'Tahap Konstruksi',
  },
];

// ============================================================================
// 12. DATA ASAL NEGARA & SEKTOR UNGGULAN INVESTASI BATAM (PMA & PMDN)
// ============================================================================
export const DATA_INVESTASI_GLOBAL = {
  topNegara: [
    { negara: 'Singapura', nilaiMiliarUsd: 4.12, proyek: 680, sharePersen: 44.5 },
    { negara: 'Hong Kong', nilaiMiliarUsd: 1.85, proyek: 215, sharePersen: 20.0 },
    { negara: 'Tiongkok (RRT)', nilaiMiliarUsd: 1.64, proyek: 194, sharePersen: 17.7 },
    { negara: 'Jepang', nilaiMiliarUsd: 0.92, proyek: 142, sharePersen: 9.9 },
    { negara: 'Amerika Serikat', nilaiMiliarUsd: 0.64, proyek: 78, sharePersen: 6.9 },
  ],
  topSektor: [
    { sektor: 'Elektronik & Semikonduktor', nilaiTriliun: 21.0, sharePersen: 38.4 },
    { sektor: 'TIK, AI & Data Center Hub', nilaiTriliun: 13.24, sharePersen: 24.2 },
    { sektor: 'Maritim, Shipyard & Offshore', nilaiTriliun: 10.2, sharePersen: 18.6 },
    { sektor: 'Logistik, Pelabuhan & Properti', nilaiTriliun: 10.24, sharePersen: 18.8 },
  ],
  pipelineInvestorBaru: {
    totalPeminat: 52,
    potensiInvestasiTriliun: 18.75,
    statusLoi: 24,
    statusPerizinanOss: 18,
    statusAlokasiLahan: 10,
  },
};

// ============================================================================
// 13. DATA SPESIFIK LAYANAN UNGGULAN RSBP (RUMAH SAKIT BP BATAM)
// ============================================================================
export const DATA_OPERASIONAL_RSBP_DETAIL = {
  nama: 'RSBP Batam (Badan Usaha Rumah Sakit)',
  borPersen: 76.2,
  standarBorKemenkes: '60% - 85%',
  crrSurplusPersen: 111.4,
  kunjunganPasienTahunan: 148520,
  layananUnggulan: [
    { nama: 'Katerisasi Jantung (Cath Lab)', tindakan: 480, kapasitas: '24 Jam Darurat Kardiovaskular' },
    { nama: 'Onkologi & Radioterapi Kanker', tindakan: 1240, kapasitas: 'Linear Accelerator (LINAC) Modern' },
    { nama: 'Hemodialisa (Cuci Darah)', tindakan: 8420, kapasitas: '48 Mesin Aktif (Double Shift)' },
    { nama: 'Kedokteran Nuklir & Terapi Sel', tindakan: 310, kapasitas: 'Rujukan Tunggal Kepulauan Riau' },
  ],
  alosHari: 3.8,
  waktuTungguFarmasiMenit: 14.2,
  targetFarmasiMenit: 20.0,
  ikmPasien: 88.94,
  pendapatanTahunanMiliar: 138.4,
};

// ============================================================================
// 14. DATA OPERASIONAL PENGAMANAN ASET, KAWASAN & DAMKAR DITPAM
// ============================================================================
export const DATA_DITPAM_DAMKAR_DETAIL = {
  nama: 'Direktorat Pengamanan Aset dan Kawasan (Ditpam)',
  obvitnasTerlindungiPersen: 100.0,
  jumlahObvitnas: 14,
  responseTimeDamkarMenit: 11.2,
  targetResponseDamkarMenit: 15.0,
  bangunanLiarDitertibkan: 874,
  catchmentAreaSterilHa: 142.0,
  konflikLahanSelesaiPersen: 91.4,
  totalPersonel: 524,
  armadaDamkar: 18,
  patroliHarianTitik: 64,
  ikmLayananPengamanan: 86.8,
};

// ============================================================================
// 15. DATA OPERASIONAL PTSP & PERIZINAN BERUSAHA
// ============================================================================
export const DATA_PTSP_PERIZINAN_DETAIL = {
  nama: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)',
  totalPermohonanMasuk: 14850,
  izinDiterbitkan: 13150,
  efektivitasSlaPersen: 88.6,
  waktuPenyelesaianHari: 1.8,
  standarSlaHari: 3.0,
  ikmPtsp: 89.24,
  mutu: 'A (Sangat Baik)',
  kanalLayanan: 'Mal Pelayanan Publik (MPP) & Digital OSS',
  izinSektoralTop5: [
    { sektor: 'Perizinan Investasi OSS-RBA', jumlah: 4210, sharePersen: 32.0 },
    { sektor: 'SKKBM & SKKAB (Pertanahan)', jumlah: 3450, sharePersen: 26.2 },
    { sektor: 'Izin Operasi Berusaha Komersial', jumlah: 2340, sharePersen: 17.8 },
    { sektor: 'Izin Lingkungan & Amdal Kawasan', jumlah: 1820, sharePersen: 13.8 },
    { sektor: 'Terminal Untuk Kepentingan Sendiri (TUKS)', jumlah: 1330, sharePersen: 10.2 },
  ],
};

// ============================================================================
// 16. DATA DIGITALISASI SPBE & KETAHANAN SIBER PDSI
// ============================================================================
export const DATA_PDSI_SPBE_DETAIL = {
  nama: 'Pusat Data dan Sistem Informasi (PDSI)',
  uptimeDataCenterPersen: 99.94,
  tierDataCenter: 'Tier 3 Facility (96 Rak Server)',
  panjangFiberOptikKm: 210.0,
  satkerTerkoneksi: 24,
  cyberThreatMitigatedPersen: 98.6,
  aplikasiSatuDataTerintegrasi: 48,
  indeksSpbe: 4.12,
  levelSpbe: 'Level 4 (Keterpaduan SPBE Nasional)',
};

