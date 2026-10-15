import {
  IkpMetricItem,
  SektorPerizinanItem,
  DomainSpbeItem,
  DimensiIkkItem,
  MasterplanProgressItem,
  SatuDatasetItem,
  KomponenIppnItem,
  IkmLayananItem,
} from './types';

// ============================================================================
// 1. DATA RESMI PERJANJIAN KINERJA (PERKIN A2 / DEP A2) TAHUN 2025
// Nomor: 3/KA/8/2025 | Tanggal: 12 Agustus 2025
// Pihak Pertama: Sudirman Saad (Anggota/Deputi Bidang Kebijakan Strategis dan Perizinan - DEP A2)
// Pihak Kedua: Amsakar Achmad (Kepala BP Batam)
// ============================================================================

export const PERKIN_METADATA = {
  nomor: '3/KA/8/2025',
  tahun: 2025,
  tanggal: '12 Agustus 2025',
  pejabatPertama: 'Sudirman Saad',
  jabatanPertama: 'Anggota/Deputi Bidang Kebijakan Strategis dan Perizinan (DEP A2)',
  pejabatKedua: 'Amsakar Achmad',
  jabatanKedua: 'Kepala Badan Pengusahaan Batam',
  sasaranProgram: 'Meningkatnya kualitas kebijakan dan perizinan BP Batam',
  totalAnggaran: 75874783000, // Rp 75.874.783.000,-
  realisasiAnggaran: 28450120000, // Rp 28.450.120.000,- (37.5%)
  unitKerjaCount: 4,
  datasetCount: 64,
};

// 4 INDIKATOR KINERJA PROGRAM UTAMA (PERKIN A2 / DEP A2)
export const IKP_METRICS_LIST: IkpMetricItem[] = [
  {
    id: 'ikp-1-perencanaan',
    number: 1,
    code: 'IKP-1',
    title: 'Indeks Perencanaan Pembangunan',
    target: 92.0,
    realisasi: 94.2,
    satuan: 'Indeks',
    polarisasi: 'Maximize',
    periodePelaporan: 'Tahunan (Akumulasi Jan - Des)',
    sumberData: 'Pusat Perencanaan Program Strategis BP Batam',
    unitKerja: 'Pusat Perencanaan Program Strategis',
    unitId: 'pusat-perencanaan-program',
    paguKegiatan: 13663667000, // Rp 13.663.667.000,-
    kegiatanNama: 'Penyusunan Perencanaan Program Strategis',
    predikat: 'Sangat Baik',
    predikatColor: 'emerald',
    capaianPersen: 102.39,
    statusKinerja: 'Exceeded',
    keterangan: 'Mengukur kualitas perencanaan melalui Indeks Perencanaan Pembangunan Nasional (IPPN) Bappenas yang mengevaluasi keselarasan dokumen perencanaan Renstra, RKA, dan KRO dengan prioritas nasional.',
    formulaRingkas: 'Rentang 91-100: Sangat Baik | 81-90: Baik | 71-80: Cukup Baik | 61-70: Kurang | <60: Sangat Kurang',
  },
  {
    id: 'ikp-2-kebijakan',
    number: 2,
    code: 'IKP-2',
    title: 'Indeks Kualitas Kebijakan',
    target: 65.0,
    realisasi: 71.8,
    satuan: 'Indeks',
    polarisasi: 'Maximize',
    periodePelaporan: 'Tahunan (Akumulasi Jan - Des)',
    sumberData: 'Pusat Harmonisasi Kebijakan Strategis',
    unitKerja: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    paguKegiatan: 4547062000, // Rp 4.547.062.000,-
    kegiatanNama: 'Penyusunan Harmonisasi Kebijakan dan Pelayanan Dukungan Strategis',
    predikat: 'Cukup Baik',
    predikatColor: 'blue',
    capaianPersen: 110.46,
    statusKinerja: 'Exceeded',
    keterangan: 'Instrumen penilaian kualitas kebijakan pemerintah mencakup 4 tahapan: Perencanaan Kebijakan (Agenda Setting & Formulasi) serta Evaluasi Kemanfaatan (Implementasi & Evaluasi Kebijakan).',
    formulaRingkas: 'Rentang 91-100: Sangat Baik | 81-90: Baik | 71-80: Cukup Baik | 61-70: Kurang | <60: Sangat Kurang',
  },
  {
    id: 'ikp-3-spbe',
    number: 3,
    code: 'IKP-3',
    title: 'Tingkat Kematangan SPBE',
    target: 3.9,
    realisasi: 4.12,
    satuan: 'Indeks (0-5)',
    polarisasi: 'Maximize',
    periodePelaporan: 'Tahunan (Akumulasi Jan - Des)',
    sumberData: 'Pusat Data dan Sistem Informasi',
    unitKerja: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    paguKegiatan: 53782639000, // Rp 53.782.639.000,-
    kegiatanNama: 'Pengelolaan Data Center dan Teknologi Informasi',
    predikat: 'Level 4 (Implementatif & Terpadu)',
    predikatColor: 'indigo',
    capaianPersen: 105.64,
    statusKinerja: 'Exceeded',
    keterangan: 'Tingkat kematangan penerapan arsitektur SPBE pada 6 domain: proses bisnis, layanan, data & informasi, aplikasi, infrastruktur, dan keamanan siber yang terintegrasi dengan evaluasi belanja TIK.',
    formulaRingkas: 'Skala 0-5 | (0) Belum ada, (1) As-is, (2) To-be, (3) Gap Analysis, (4) Implementasi & Belanja TIK, (5) Reviu Berkala',
  },
  {
    id: 'ikp-4-ikm-ptsp',
    number: 4,
    code: 'IKP-4',
    title: 'IKM Pengguna Layanan PTSP',
    target: 86.5,
    realisasi: 88.42,
    satuan: 'Indeks',
    polarisasi: 'Maximize',
    periodePelaporan: 'Tahunan (Akumulasi Jan - Des)',
    sumberData: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitKerja: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    paguKegiatan: 3881415000, // Rp 3.881.415.000,-
    kegiatanNama: 'Penyelenggaraan Pelayanan Terpadu Satu Pintu',
    predikat: 'Mutu A (Sangat Baik)',
    predikatColor: 'emerald',
    capaianPersen: 102.22,
    statusKinerja: 'Exceeded',
    keterangan: 'Pengukuran komprehensif tingkat kepuasan masyarakat terhadap kualitas perizinan investasi dan non-perizinan pada MPP Batam berpedoman pada 9 unsur PermenPAN-RB No. 14/2017.',
    formulaRingkas: 'Skala Konversi: 3.5324-4.00 (A, Sangat Baik = 88.31-100) | 3.0644-3.532 (B, Baik = 76.61-88.30)',
  },
];

// ============================================================================
// 1b. TABEL KOMPONEN INDEKS PERENCANAAN PEMBANGUNAN (IPPN BAPPENAS)
// Sesuai SE Menteri PPN/Kepala Bappenas No. 3/2023 & Renstra BP Batam
// ============================================================================
export const IPPN_KOMPONEN_DATA: KomponenIppnItem[] = [
  {
    no: 1,
    komponen: 'Konsistensi Renstra 2025-2029 thd RPJMN',
    bobotPersen: 30,
    target: 90.0,
    nilai: 95.0,
    poin: 28.50,
    keterangan: 'Penyelarasan sasaran makro ekonomi Batam & prioritas nasional',
    predikat: 'Sangat Baik',
  },
  {
    no: 2,
    komponen: 'Ketepatan Alokasi RKA DIPA thd KRO Prioritas',
    bobotPersen: 25,
    target: 92.0,
    nilai: 93.8,
    poin: 23.45,
    keterangan: 'Kesesuaian nomenklatur dan target output belanja modal',
    predikat: 'Sangat Baik',
  },
  {
    no: 3,
    komponen: 'Kualitas Dokumen Masterplan & Renja Satker',
    bobotPersen: 25,
    target: 92.0,
    nilai: 94.0,
    poin: 23.50,
    keterangan: 'Kelengkapan 5 masterplan strategis (drainase, jalan, bandara, dsb)',
    predikat: 'Sangat Baik',
  },
  {
    no: 4,
    komponen: 'Kepatuhan Pelaporan Triwulan e-Monev Bappenas',
    bobotPersen: 20,
    target: 94.0,
    nilai: 93.75,
    poin: 18.75,
    keterangan: 'Kedisiplinan input capaian fisik & serapan anggaran triwulanan',
    predikat: 'Sangat Baik',
  },
];

// ============================================================================
// 2. 4 KEGIATAN PROGRAM & ALOKASI ANGGARAN (PAGU VS REALISASI)
// ============================================================================

export const PROGRAM_ACTIVITIES_BUDGET = [
  {
    id: 'kegiatan-1',
    nama: 'Penyusunan Perencanaan Program Strategis',
    unit: 'Pusren (P3S)',
    unitId: 'pusat-perencanaan-program',
    pagu: 13663667000,
    realisasi: 5210450000,
    serapanPersen: 38.13,
    outputUtama: 'Dokumen Renstra 2025-2029, RKA DIPA, 5 Masterplan Wilayah & Evaluasi SE PPN Bappenas',
    kodeDipa: '093.01.WA.6251.BMA',
  },
  {
    id: 'kegiatan-2',
    nama: 'Penyusunan Harmonisasi Kebijakan & Pelayanan Dukungan Strategis',
    unit: 'Pusat Harmonisasi (PHKS)',
    unitId: 'pusat-harmonisasi',
    pagu: 4547062000,
    realisasi: 1845200000,
    serapanPersen: 40.58,
    outputUtama: 'Kajian 4 Dimensi IKK, Uji Kewajaran 7 Level Tarif, Sinkronisasi Regulasi Internal-Eksternal',
    kodeDipa: '093.01.WA.6252.BMB',
  },
  {
    id: 'kegiatan-3',
    nama: 'Pengelolaan Data Center dan Teknologi Informasi',
    unit: 'PDSI',
    unitId: 'pdsi',
    pagu: 53782639000,
    realisasi: 19842100000,
    serapanPersen: 36.89,
    outputUtama: 'Tier-3 Data Center (96 Rak), Fiber Optik 210 Km, SOC Cyber Defense, SPBE Level 4 & 48 Aplikasi TTE',
    kodeDipa: '093.01.WA.6253.BMC',
  },
  {
    id: 'kegiatan-4',
    nama: 'Penyelenggaraan Pelayanan Terpadu Satu Pintu',
    unit: 'PTSP',
    unitId: 'ptsp',
    pagu: 3881415000,
    realisasi: 1552370000,
    serapanPersen: 39.99,
    outputUtama: 'Operasional Layanan MPP Batam, OSS-RBA, SKKBM/SKKAB, SLA Perizinan 91.2%, Survey IKM Mutu A',
    kodeDipa: '093.01.WA.6254.BMD',
  },
];

// ============================================================================
// 3. PROFIL 4 UNIT KERJA PELAKSANA KEBIJAKAN STRATEGIS & PERIZINAN
// ============================================================================

export interface KebijakanStrategisUnitProfile {
  id: string;
  code: string;
  name: string;
  shortName: string;
  pimpinan: string;
  paguAnggaran: number;
  realisasiAnggaran: number;
  serapanPersen: number;
  ikpTerhubung: string;
  targetIkp: string;
  realisasiIkp: string;
  datasetCount: number;
  pdfPages: string;
  ringkasanPeran: string;
  keyHighlights: { label: string; value: string; trend: string }[];
  isuStrategis: string;
}

export const KEBIJAKAN_STRATEGIS_UNITS: KebijakanStrategisUnitProfile[] = [
  {
    id: 'pusat-perencanaan-program',
    code: 'PUSREN',
    name: 'Pusat Perencanaan Program Strategis',
    shortName: 'Pusren',
    pimpinan: 'Kepala Pusat Perencanaan Program Strategis',
    paguAnggaran: 13663667000,
    realisasiAnggaran: 5210450000,
    serapanPersen: 38.13,
    ikpTerhubung: 'IKP-1: Indeks Perencanaan Pembangunan (IPPN)',
    targetIkp: '92.00',
    realisasiIkp: '94.20 (Sangat Baik)',
    datasetCount: 19,
    pdfPages: 'Halaman 51 - 53 (19 Dataset)',
    ringkasanPeran: 'Penyusunan dokumen perencanaan makro Renstra 2025-2029, evaluasi keselarasan RKA DIPA Bappenas (SE PPN No. 3/2023), penyusunan 5 masterplan strategis (drainase, utilitas box, jalan, bandara, pelabuhan), data spasial kontur 1M, dan monev sasaran strategis BP Batam.',
    keyHighlights: [
      { label: 'Indeks Perencanaan (IPPN)', value: '94.20', trend: 'Predikat Sangat Baik (Target 92)' },
      { label: 'Keselarasan RKA & KRO', value: '98.2%', trend: 'Alokasi DIPA Optimal' },
      { label: 'Masterplan Strategis', value: '5 Dokumen', trend: 'Drainase, Jalan, Utilitas, Port' },
      { label: 'Evaluasi Bappenas', value: 'Nilai A', trend: 'SE PPN No. 3/2023 Terpenuhi' },
    ],
    isuStrategis: 'Penyelarasan target fisik proyek strategis nasional dan percepatan integrasi data spasial kontur kota Batam interval 1m.',
  },
  {
    id: 'pusat-harmonisasi',
    code: 'PHKS',
    name: 'Pusat Harmonisasi Kebijakan Strategis',
    shortName: 'Harmonisasi',
    pimpinan: 'Kepala Pusat Harmonisasi Kebijakan Strategis',
    paguAnggaran: 4547062000,
    realisasiAnggaran: 1845200000,
    serapanPersen: 40.58,
    ikpTerhubung: 'IKP-2: Indeks Kualitas Kebijakan (IKK)',
    targetIkp: '65.00',
    realisasiIkp: '71.80 (Cukup Baik)',
    datasetCount: 7,
    pdfPages: 'Halaman 12 - 13 (7 Dataset)',
    ringkasanPeran: 'Pengukuran dan evaluasi mutu regulasi BP Batam berbasis 4 dimensi IKK LAN-RI, harmonisasi Perka/Kepka dengan regulasi nasional, survei kewajaran 7 level tarif layanan, dan monitoring tindak lanjut rapim.',
    keyHighlights: [
      { label: 'Indeks Kualitas Kebijakan', value: '71.80', trend: '+6.80 poin di atas target' },
      { label: 'Regulasi Disinkronisasi', value: '42 Perka/Kepka', trend: '100% Selaras Pusat' },
      { label: 'Evaluasi Tarif Layanan', value: '7 Tingkat', trend: 'Survei Kewajaran 89.2%' },
      { label: 'Tindak Lanjut Rapim', value: '94.5%', trend: '76 dari 80 Nota Dinas' },
    ],
    isuStrategis: 'Harmonisasi regulasi turunan Perka pengalokasian lahan dan penyesuaian tarif terminal khusus sesuai PP 20/2024.',
  },
  {
    id: 'pdsi',
    code: 'PDSI',
    name: 'Pusat Data dan Sistem Informasi',
    shortName: 'PDSI',
    pimpinan: 'Kepala Pusat Data dan Sistem Informasi',
    paguAnggaran: 53782639000,
    realisasiAnggaran: 19842100000,
    serapanPersen: 36.89,
    ikpTerhubung: 'IKP-3: Tingkat Kematangan SPBE',
    targetIkp: '3.90',
    realisasiIkp: '4.12 (Level 4)',
    datasetCount: 21,
    pdfPages: 'Halaman 40 - 43 (21 Dataset)',
    ringkasanPeran: 'Tata kelola arsitektur SPBE terpadu, pengelolaan Tier-3 Data Center, penggelaran jaringan Fiber Optik pulau Batam, operasional Security Operation Center (SOC), integrasi Satu Data, dan 48 aplikasi ber-TTE.',
    keyHighlights: [
      { label: 'Indeks Kematangan SPBE', value: '4.12 / 5.0', trend: 'Kategori Sangat Baik' },
      { label: 'Uptime Data Center BP Batam', value: '99.98%', trend: 'SLA 99.9% Tercapai' },
      { label: 'Okupansi Rak Data Center', value: '78 / 96 Rak', trend: '81.25% Terisi' },
      { label: 'Serangan IT Terblokir SOC', value: '99.85%', trend: '12.450 Serangan Dihalau' },
    ],
    isuStrategis: 'Penyelesaian migrasi penuh modul microservices Satu Data BP Batam dan sertifikasi ISO 27001 data center.',
  },
  {
    id: 'ptsp',
    code: 'PTSP',
    name: 'Pusat Pelayanan Terpadu Satu Pintu',
    shortName: 'PTSP',
    pimpinan: 'Kepala Pusat Pelayanan Terpadu Satu Pintu',
    paguAnggaran: 3881415000,
    realisasiAnggaran: 1552370000,
    serapanPersen: 39.99,
    ikpTerhubung: 'IKP-4: IKM Pengguna Layanan PTSP',
    targetIkp: '86.50',
    realisasiIkp: '88.42 (Mutu A)',
    datasetCount: 17,
    pdfPages: 'Halaman 21 - 28 (17 Dataset)',
    ringkasanPeran: 'Penyelenggaraan gerbang utama pelayanan perizinan berusaha OSS dan non-perizinan investasi, SKKBM bongkar muat, jadwal kapal, transformasi digital MPP Batam, dan penanganan pengaduan.',
    keyHighlights: [
      { label: 'Total Permohonan YTD', value: '1.842 Berkas', trend: '+14.2% vs 2024' },
      { label: 'Izin Terbit Resmi', value: '1.486 Izin', trend: '80.7% Success Rate' },
      { label: 'Kepatuhan SLA Rata-rata', value: '88.6%', trend: 'Target ≥85%' },
      { label: 'IKM Indeks Kepuasan', value: '88.42', trend: 'Predikat A (Sangat Baik)' },
    ],
    isuStrategis: 'Percepatan rekomendasi verifikasi teknis sektor kelautan & integrasi API verifikator eksternal guna memangkas backlog.',
  },
];

// ============================================================================
// 4. DATA OPERASIONAL PTSP: VOLUME, SLA PER SEKTOR & BOTTLENECK ANALYSIS
// Mengacu pada Atribut Data Halaman 21-28 dan Referensi Gambar
// ============================================================================

export const PTSP_SEKTOR_PERFORMANCES: SektorPerizinanItem[] = [
  {
    sektor: 'Logistik & Transportasi Laut',
    kode: 'LOG',
    volume: 542,
    terbit: 494,
    proses: 32,
    revisi: 12,
    tolak: 4,
    slaPercent: 91.1,
    targetSla: 85.0,
    avgLeadTimeHari: 1.4,
    backlog: 18,
    status: 'optimal',
  },
  {
    sektor: 'Perdagangan & Jasa',
    kode: 'DAG',
    volume: 486,
    terbit: 413,
    proses: 48,
    revisi: 19,
    tolak: 6,
    slaPercent: 85.0,
    targetSla: 85.0,
    avgLeadTimeHari: 2.1,
    backlog: 34,
    status: 'optimal',
  },
  {
    sektor: 'Konstruksi & Properti',
    kode: 'KON',
    volume: 378,
    terbit: 281,
    proses: 56,
    revisi: 31,
    tolak: 10,
    slaPercent: 74.2,
    targetSla: 85.0,
    avgLeadTimeHari: 3.8,
    backlog: 49,
    status: 'warning',
  },
  {
    sektor: 'Kelautan & Perikanan',
    kode: 'LAU',
    volume: 246,
    terbit: 167,
    proses: 45,
    revisi: 26,
    tolak: 8,
    slaPercent: 68.0,
    targetSla: 85.0,
    avgLeadTimeHari: 5.4,
    backlog: 62,
    status: 'critical',
  },
  {
    sektor: 'Industri Manufaktur',
    kode: 'IND',
    volume: 190,
    terbit: 131,
    proses: 38,
    revisi: 16,
    tolak: 5,
    slaPercent: 79.5,
    targetSla: 85.0,
    avgLeadTimeHari: 2.9,
    backlog: 31,
    status: 'warning',
  },
];

// Tren Bulanan Permohonan PTSP (Jan - Apr 2026)
export const PTSP_MONTHLY_TREND = [
  { bulan: 'Januari', permohonan: 1420, terbit: 1190, SLA: 84.1, backlog: 180 },
  { bulan: 'Februari', permohonan: 1560, terbit: 1285, SLA: 83.5, backlog: 195 },
  { bulan: 'Maret', permohonan: 1710, terbit: 1390, SLA: 82.8, backlog: 204 },
  { bulan: 'April', permohonan: 1842, terbit: 1486, SLA: 82.4, backlog: 214 },
];

// Titik Hambatan Utama (Bottleneck Atensi Manajemen)
export const PTSP_BOTTLENECK_ITEMS = [
  {
    id: 1,
    judul: 'Keterlambatan verifikasi teknis sektor kelautan & TUKS',
    jumlahKasus: 31,
    level: 'critical',
    dampak: 'Aging dokumen > 14 hari kerja, memicu komplain pelaku usaha maritim',
    rekomendasi: 'Deploy tim verifikasi asistensi bersama Dit. Kepelabuhanan & KSOP',
  },
  {
    id: 2,
    judul: 'Kelengkapan dokumen lingkungan (Amdal/UKL-UPL) belum valid',
    jumlahKasus: 27,
    level: 'warning',
    dampak: 'Pengembalian berkas revisi berulang, menambah lead time perizinan',
    rekomendasi: 'Optimalkan sistem self-validation checklist pada portal MPP Digital',
  },
  {
    id: 3,
    judul: 'Latensi sinkronisasi API perizinan OSS-RBA BKPM ke SIMPADU',
    jumlahKasus: 19,
    level: 'warning',
    dampak: 'Status perizinan terbit tertahan sinkronisasi otomatis',
    rekomendasi: 'Koordinasi pembaruan webhook data bridge dengan PDSI & BKPM',
  },
];

// 9 Unsur IKM PTSP (PermenPAN-RB No. 14/2017)
export const PTSP_IKM_9_UNSUR = [
  { no: 1, unsur: 'Persyaratan Pelayanan', skor: 89.2, mutu: 'A (Sangat Baik)' },
  { no: 2, unsur: 'Sistem, Mekanisme, dan Prosedur', skor: 88.5, mutu: 'A (Sangat Baik)' },
  { no: 3, unsur: 'Waktu Penyelesaian Layanan', skor: 83.4, mutu: 'B (Baik)' },
  { no: 4, unsur: 'Biaya / Tarif Layanan', skor: 92.1, mutu: 'A (Sangat Baik)' },
  { no: 5, unsur: 'Produk Spesifikasi Layanan', skor: 88.9, mutu: 'A (Sangat Baik)' },
  { no: 6, unsur: 'Kompetensi Pelaksana Layanan', skor: 89.6, mutu: 'A (Sangat Baik)' },
  { no: 7, unsur: 'Perilaku Pelaksana Layanan', skor: 91.2, mutu: 'A (Sangat Baik)' },
  { no: 8, unsur: 'Penanganan Pengaduan & Saran', skor: 84.8, mutu: 'B (Baik)' },
  { no: 9, unsur: 'Sarana & Prasarana MPP', skor: 90.7, mutu: 'A (Sangat Baik)' },
];

// Nilai IKM per Layanan PTSP BP Batam (Layanan Utama MPP)
export const PTSP_IKM_PER_LAYANAN: IkmLayananItem[] = [
  { no: 1, layanan: 'Perizinan Berusaha (OSS-RBA)', skor: 88.90, mutu: 'A', volume: 820, persenPuas: 94.2 },
  { no: 2, layanan: 'Non-Perizinan Maritim & TUKS', skor: 87.15, mutu: 'B', volume: 410, persenPuas: 91.5 },
  { no: 3, layanan: 'Rekomendasi Teknis Kawasan', skor: 88.60, mutu: 'A', volume: 380, persenPuas: 93.8 },
  { no: 4, layanan: 'Konsultasi & Pengaduan MPP', skor: 89.05, mutu: 'A', volume: 232, persenPuas: 96.1 },
];

// ============================================================================
// 5. DATA SPBE 6 DOMAIN & DATA CENTER (PDSI)
// Mengacu pada Atribut Data Halaman 40-43
// ============================================================================

export const SPBE_DOMAINS_DATA: DomainSpbeItem[] = [
  {
    domain: 'Kebijakan Internal SPBE',
    skor: 4.45,
    target: 4.0,
    bobot: 15,
    kategori: 'Sangat Baik',
    indikatorKunci: ['Perka Tata Kelola TIK', 'Standar Keamanan Informasi ISO 27001', 'Pedoman Satu Data BP Batam'],
  },
  {
    domain: 'Tata Kelola SPBE & Kelembagaan',
    skor: 4.25,
    target: 3.9,
    bobot: 20,
    kategori: 'Sangat Baik',
    indikatorKunci: ['Tim Koordinasi SPBE Lintas Unit', 'Arsitektur SPBE 2025-2029', 'Manajemen Risiko TIK'],
  },
  {
    domain: 'Manajemen SPBE & SDM TIK',
    skor: 3.95,
    target: 3.8,
    bobot: 15,
    kategori: 'Baik',
    indikatorKunci: ['Manajemen Keamanan Siber SOC', 'Audit Teknologi Informasi Berkala', 'Sertifikasi Keahlian TI'],
  },
  {
    domain: 'Layanan SPBE Administrasi Pemerintahan',
    skor: 4.30,
    target: 4.0,
    bobot: 20,
    kategori: 'Sangat Baik',
    indikatorKunci: ['SIMPADU Terpadu', 'Sistem Naskah Dinas Elektronik (TTE BSrE)', 'Dashboard BI Eksekutif'],
  },
  {
    domain: 'Layanan SPBE Pelayanan Publik',
    skor: 4.15,
    target: 3.9,
    bobot: 20,
    kategori: 'Sangat Baik',
    indikatorKunci: ['Portal MPP Digital Terintegrasi', 'Layanan Perizinan Online OSS', 'Helpdesk TI Terpusat'],
  },
  {
    domain: 'Infrastruktur & Keamanan Informasi',
    skor: 3.85,
    target: 3.8,
    bobot: 10,
    kategori: 'Baik',
    indikatorKunci: ['Tier-3 Data Center (99.98% Uptime)', 'Jalur Redundant Fiber Optik 210 Km', 'Pemberitahuan Insiden CSIRT'],
  },
];

export const PDSI_INFRASTRUCTURE_DATA = {
  dataCenter: {
    totalRak: 96,
    rakTerisi: 78,
    rakKosong: 18,
    okupansiPersen: 81.25,
    uptimeSla: 99.98,
    pueRatio: 1.38,
    generatorBackupKva: 1250,
  },
  fiberOptic: {
    totalPanjangKm: 210,
    jalurUtama: 'Ring Utama Batam Center - Batu Ampar - Mukakuning - Sekupang',
    coreAktif: 48,
    utilisasiPersen: 86.4,
  },
  cyberSecurity: {
    totalThreatYtd: 12450,
    threatMitigatedPersen: 99.85,
    avgResponseMinutes: 4.2,
    socAlertLevel: 'Normal / Hijau',
  },
  aplikasi: {
    totalAplikasiAktif: 48,
    terintegrasiTte: 42,
    terhubungSatuData: 48,
  },
};

// ============================================================================
// 6. DATA INDEKS KUALITAS KEBIJAKAN (IKK) & TARIF LAYANAN (PHKS)
// Mengacu pada Atribut Data Halaman 12-13
// ============================================================================

export const IKK_DIMENSI_DATA: DimensiIkkItem[] = [
  {
    dimensi: 'Agenda Setting Kebijakan',
    bobot: 20,
    skor: 74.0,
    target: 65.0,
    capaian: 113.8,
    poinTerbobot: 14.80,
    formulaRumus: '74.00 × 20% = 14.80 Poin',
    indikatorKunci: 'Urgensi masalah, keterlibatan stakeholder kawasan & riset data empiris',
    tahapan: ['Identifikasi Masalah Strategis Kawasan', 'Uji Kebutuhan Regulasi Investasi', 'Riset Data Empiris & Kajian Akademis'],
    subIndikator: [
      {
        nomor: '1.1',
        nama: 'Identifikasi Masalah Berbasis Data Bukti (Evidence-Based)',
        skor: 76.0,
        bobotSub: 35,
        poinSub: 26.6,
        keterangan: 'Pemanfaatan data Satu Data BP Batam, tren investasi KPBPB, dan aduan perizinan.',
      },
      {
        nomor: '1.2',
        nama: 'Pelibatan Pemangku Kepentingan (Stakeholders Engagement)',
        skor: 72.0,
        bobotSub: 35,
        poinSub: 25.2,
        keterangan: 'Konsultasi awal dengan Kadin, Apindo, asosiasi logistik kepelabuhanan & tenant bandara.',
      },
      {
        nomor: '1.3',
        nama: 'Penyelarasan dengan Agenda Strategis BP Batam & Nasional',
        skor: 74.0,
        bobotSub: 30,
        poinSub: 22.2,
        keterangan: 'Kesesuaian dengan RPJMN, Perkin A2, dan Masterplan Transformasi Ekonomi Batam.',
      },
    ],
  },
  {
    dimensi: 'Formulasi Kebijakan',
    bobot: 30,
    skor: 73.0,
    target: 65.0,
    capaian: 112.3,
    poinTerbobot: 21.90,
    formulaRumus: '73.00 × 30% = 21.90 Poin',
    indikatorKunci: 'Regulatory Impact Assessment (RIA), harmonisasi K/L/D & konsultasi publik',
    tahapan: ['Penyusunan Naskah Urgensi Regulasi', 'Harmonisasi Antar Instansi K/L/D', 'Konsultasi Publik dengan Pelaku Usaha'],
    subIndikator: [
      {
        nomor: '2.1',
        nama: 'Analisis Opsi & Regulatory Impact Assessment (RIA)',
        skor: 75.0,
        bobotSub: 35,
        poinSub: 26.25,
        keterangan: 'Analisis cost-benefit, mitigasi dampak terhadap iklim investasi dan kepatuhan PMK tarif.',
      },
      {
        nomor: '2.2',
        nama: 'Kelengkapan Naskah Akademik & Kajian Yuridis Formal',
        skor: 74.0,
        bobotSub: 35,
        poinSub: 25.9,
        keterangan: 'Penyusunan draft naskah akademik bersama Biro Hukum dan Pusat Harmonisasi (PHKS).',
      },
      {
        nomor: '2.3',
        nama: 'Harmonisasi Regulasi & Uji Publik Terbuka',
        skor: 70.0,
        bobotSub: 30,
        poinSub: 21.0,
        keterangan: 'Sinkronisasi peraturan internal BP Batam dengan Kemenkeu, Kemenko Perekonomian & Pemda.',
      },
    ],
  },
  {
    dimensi: 'Implementasi Kebijakan',
    bobot: 25,
    skor: 71.2,
    target: 65.0,
    capaian: 109.5,
    poinTerbobot: 17.80,
    formulaRumus: '71.20 × 25% = 17.80 Poin',
    indikatorKunci: 'Kesiapan juknis operasional, standardisasi SOP & sosialisasi regulasi',
    tahapan: ['Sosialisasi Perka/Kepka Terbit', 'Kesiapan Petunjuk Teknis & SOP Unit', 'Alokasi Sumber Daya Pelaksana'],
    subIndikator: [
      {
        nomor: '3.1',
        nama: 'Kesiapan Sumber Daya & Infrastruktur Pelaksana (Sistem IT)',
        skor: 72.0,
        bobotSub: 35,
        poinSub: 25.2,
        keterangan: 'Kesiapan modul OSS-RBA, SIMREK, dan portal layanan digital Badan Usaha.',
      },
      {
        nomor: '3.2',
        nama: 'Standardisasi SOP, Petunjuk Teknis & Sosialisasi Regulasi',
        skor: 71.0,
        bobotSub: 35,
        poinSub: 24.85,
        keterangan: 'Penerbitan SOP baku di MPP Batam dan sosialisasi kepada seluruh asosiasi pengguna jasa.',
      },
      {
        nomor: '3.3',
        nama: 'Manajemen Koordinasi Lintas Unit Kerja BP Batam',
        skor: 70.5,
        bobotSub: 30,
        poinSub: 21.15,
        keterangan: 'Sinergi antar Direktorat teknis (BU Pelabuhan, BU Bandara, RSBP, SPAM Fasling).',
      },
    ],
  },
  {
    dimensi: 'Evaluasi Kemanfaatan Kebijakan',
    bobot: 25,
    skor: 69.2,
    target: 65.0,
    capaian: 106.5,
    poinTerbobot: 17.30,
    formulaRumus: '69.20 × 25% = 17.30 Poin',
    indikatorKunci: 'Survei dampak ekonomi, kepatuhan tarif layanan & evaluasi purna regulasi',
    tahapan: ['Survei Dampak Kebijakan Ekonomi', 'Uji Kewajaran Tarif Layanan Badan Usaha', 'Penyusunan Rekomendasi Revisi Kebijakan'],
    subIndikator: [
      {
        nomor: '4.1',
        nama: 'Pengukuran Capaian Output & Dampak Ekonomi Regulasi',
        skor: 70.0,
        bobotSub: 35,
        poinSub: 24.5,
        keterangan: 'Evaluasi realisasi investasi baru, pertumbuhan PNBP, dan efisiensi waktu layanan SLA.',
      },
      {
        nomor: '4.2',
        nama: 'Evaluasi Kepatuhan & Survei Feedback Pengguna Layanan',
        skor: 68.0,
        bobotSub: 35,
        poinSub: 23.8,
        keterangan: 'Survei berkala kepuasan masyarakat (IKM Mutu A: 88.42) dan survei kewajaran tarif.',
      },
      {
        nomor: '4.3',
        nama: 'Rekomendasi Kebijakan & Rencana Aksi Tindak Lanjut Perbaikan',
        skor: 70.0,
        bobotSub: 30,
        poinSub: 21.0,
        keterangan: 'Formulasi rekomendasi penyesuaian tarif/regulasi ke Pimpinan BP Batam & Kemenkeu.',
      },
    ],
  },
];

// ============================================================================
// 6b. DATA TARIF LAYANAN 7 LEVEL (SUMBER: PDF data-tarif-layanan-new & SATU DATA HAL. 13)
// Total 7.395 Entri Layanan Terverifikasi Menurut Unit Penyedia Layanan
// ============================================================================

export interface TarifLayananPdfEntry {
  id: number;
  unit: string;
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  l6: string;
  l7: string;
  layanan: string;
  kewajaranSurvei: number;
  status: 'Wajar' | 'Penyesuaian';
}

export const DATA_TARIF_LAYANAN_NEW_ENTRIES: TarifLayananPdfEntry[] = [
  // --- Pelabuhan (Pass Masuk, Dermaga, Stevedoring) ---
  { id: 14475, unit: 'Badan Usaha Pelabuhan', l1: '2', l2: '6', l3: '5', l4: '1', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Pass Penumpang Domestik (Terminal Feri Batam Center / Sekupang)', kewajaranSurvei: 91.5, status: 'Wajar' },
  { id: 14476, unit: 'Badan Usaha Pelabuhan', l1: '2', l2: '6', l3: '5', l4: '1', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Pass Penumpang Internasional (Terminal Feri Harbour Bay / Batam Center)', kewajaranSurvei: 89.2, status: 'Wajar' },
  { id: 14477, unit: 'Badan Usaha Pelabuhan', l1: '1', l2: '4', l3: '2', l4: '3', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Jasa Tambat Kapal Samudera (Dermaga Beton Batu Ampar)', kewajaranSurvei: 88.6, status: 'Wajar' },
  { id: 14478, unit: 'Badan Usaha Pelabuhan', l1: '1', l2: '4', l3: '2', l4: '5', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Bongkar Muat Petikemas 20 Feet (Container Crane STS)', kewajaranSurvei: 87.8, status: 'Wajar' },
  // --- Bandara Hang Nadim (PJP2U, Fasilitas AC & VIP) ---
  { id: 14479, unit: 'Badan Usaha Bandar Udara', l1: '1', l2: '2', l3: '1', l4: '1', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Pelayanan Jasa Penumpang Pesawat Udara (PJP2U Domestik Hang Nadim)', kewajaranSurvei: 92.0, status: 'Wajar' },
  { id: 14480, unit: 'Badan Usaha Bandar Udara', l1: '1', l2: '2', l3: '1', l4: '1', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Pelayanan Jasa Penumpang Pesawat Udara (PJP2U Internasional)', kewajaranSurvei: 90.1, status: 'Wajar' },
  { id: 14481, unit: 'Badan Usaha Bandar Udara', l1: '1', l2: '3', l3: '2', l4: '4', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Jasa Garbarata / Aviobridge Pesawat Narrow Body', kewajaranSurvei: 88.9, status: 'Wajar' },
  { id: 14482, unit: 'Badan Usaha Fasilitas dan Lingkungan', l1: '1', l2: '2', l3: '1', l4: '1', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Tarif Air Bersih Golongan Rumah Tangga A (0 - 10 m³)', kewajaranSurvei: 87.2, status: 'Wajar' },
  { id: 14483, unit: 'Badan Usaha Bandar Udara', l1: '2', l2: '7', l3: '4', l4: '1', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Tertutup AC (Ruang Tunggu Keberangkatan)', kewajaranSurvei: 90.5, status: 'Wajar' },
  { id: 14484, unit: 'Badan Usaha Bandar Udara', l1: '2', l2: '7', l3: '4', l4: '2', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Tertutup AC (Gate Khusus VIP/Charter)', kewajaranSurvei: 89.8, status: 'Wajar' },
  { id: 14485, unit: 'Badan Usaha Fasilitas dan Lingkungan', l1: '1', l2: '5', l3: '1', l4: '5', l5: 'N/A', l6: 'N/A', l7: 'N/A', layanan: 'Pegawai BP Batam (Sewa Rusun / Fasilitas)', kewajaranSurvei: 92.4, status: 'Wajar' },
  { id: 14486, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '9', l3: '6', l4: '7', l5: '7', l6: '3', l7: 'N/A', layanan: 'Kelas I, III, V (Kecil) - Tindakan Medis', kewajaranSurvei: 91.0, status: 'Wajar' },
  { id: 14487, unit: 'Kuningan Guest House', l1: '2', l2: '6', l3: 'N/A', l4: 'N/A', l5: 'N/A', l6: 'N/A', l7: 'N/A', layanan: 'Day & Nite Package (Transit Room)', kewajaranSurvei: 91.5, status: 'Wajar' },
  { id: 14488, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '15', l3: '7', l4: '1', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Peserta s.d 30 Orang (MCU Kolektif)', kewajaranSurvei: 88.5, status: 'Wajar' },
  { id: 14489, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '2', l4: '3', l5: '9', l6: 'N/A', l7: 'N/A', layanan: 'Pasang tampon anterior (THT Rawat Jalan)', kewajaranSurvei: 93.0, status: 'Wajar' },
  { id: 14490, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '4', l4: '3', l5: '9', l6: 'N/A', l7: 'N/A', layanan: 'Pasang tampon anterior (Spesialis Khusus)', kewajaranSurvei: 92.8, status: 'Wajar' },
  { id: 14491, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '3', l4: '3', l5: '9', l6: 'N/A', l7: 'N/A', layanan: 'Pasang tampon anterior (Cito/IGD)', kewajaranSurvei: 93.2, status: 'Wajar' },
  { id: 14492, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '1', l4: '3', l5: '9', l6: 'N/A', l7: 'N/A', layanan: 'Pasang tampon anterior (Klinik Eksekutif)', kewajaranSurvei: 91.5, status: 'Wajar' },
  { id: 14493, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '3', l3: '8', l4: 'N/A', l5: 'N/A', l6: 'N/A', l7: 'N/A', layanan: 'Ruangan ICU/CVCU (Rawat Intensif per Hari)', kewajaranSurvei: 90.2, status: 'Wajar' },
  { id: 14494, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '5', l3: '5', l4: '2', l5: '17', l6: 'N/A', l7: 'N/A', layanan: 'Knee Joint Exercise (Fisioterapi & Rehab)', kewajaranSurvei: 89.4, status: 'Wajar' },
  { id: 14495, unit: 'Badan Usaha Pelabuhan', l1: '2', l2: '6', l3: '5', l4: '3', l5: 'N/A', l6: 'N/A', l7: 'N/A', layanan: 'Sedan, Pick up, dan sejenisnya (Pass Masuk)', kewajaranSurvei: 88.0, status: 'Wajar' },
  { id: 14496, unit: 'Badan Usaha Fasilitas dan Lingkungan', l1: '1', l2: '2', l3: '5', l4: '2', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Penggunaan Bulanan (Air Bersih Sambungan Domestik)', kewajaranSurvei: 86.5, status: 'Wajar' },
  { id: 14497, unit: 'Badan Usaha Pelabuhan', l1: '2', l2: '6', l3: '5', l4: '2', l5: 'N/A', l6: 'N/A', l7: 'N/A', layanan: 'Sepeda Motor dan Sepeda (Pass Masuk Pelabuhan)', kewajaranSurvei: 87.5, status: 'Wajar' },
  { id: 14498, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '9', l3: '10', l4: '10', l5: '1', l6: 'N/A', l7: 'N/A', layanan: 'Tindakan Operasi Kecil (Bedah Minor)', kewajaranSurvei: 91.5, status: 'Wajar' },
  { id: 14499, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '1', l4: '15', l5: '17', l6: 'N/A', l7: 'N/A', layanan: 'Aff CVC/ Double Lumen (Kateter Hemodialisa)', kewajaranSurvei: 93.5, status: 'Wajar' },
  { id: 14500, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '4', l4: '15', l5: '17', l6: 'N/A', l7: 'N/A', layanan: 'Aff CVC/ Double Lumen (Pelepasan Subklavia)', kewajaranSurvei: 92.0, status: 'Wajar' },
  { id: 14501, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '3', l4: '15', l5: '17', l6: 'N/A', l7: 'N/A', layanan: 'Aff CVC/ Double Lumen (Perawatan Intensif)', kewajaranSurvei: 92.4, status: 'Wajar' },
  { id: 14502, unit: 'Badan Usaha Rumah Sakit', l1: '1', l2: '3', l3: '2', l4: '15', l5: '17', l6: 'N/A', l7: 'N/A', layanan: 'Aff CVC/ Double Lumen (Ruang Dialisis)', kewajaranSurvei: 93.1, status: 'Wajar' },
  // --- Level 7 Deep Granular Entries (RSBP Tindakan Kompleks) ---
  { id: 14503, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '9', l3: '8', l4: '12', l5: '4', l6: '2', l7: '1', layanan: 'Tindakan Operasi Khusus Bedah Saraf Mikro (Sub-Spesifik Kelas VVIP)', kewajaranSurvei: 94.2, status: 'Wajar' },
  { id: 14504, unit: 'Badan Usaha Rumah Sakit', l1: '2', l2: '9', l3: '8', l4: '12', l5: '4', l6: '2', l7: '2', layanan: 'Tindakan Operasi Khusus Bedah Jantung Terbuka Bypass CABG', kewajaranSurvei: 93.8, status: 'Wajar' },
  { id: 14505, unit: 'Badan Usaha Fasilitas dan Lingkungan', l1: '2', l2: '4', l3: '3', l4: '1', l5: '2', l6: 'N/A', l7: 'N/A', layanan: 'Pengolahan Limbah Medis B3 Insinerator KPLI Kabil per Kg', kewajaranSurvei: 89.0, status: 'Wajar' },
  { id: 14506, unit: 'Kuningan Guest House', l1: '1', l2: '1', l3: 'N/A', l4: 'N/A', l5: 'N/A', l6: 'N/A', l7: 'N/A', layanan: 'Standard Room Single / Twin Bed (Transit Harian)', kewajaranSurvei: 92.0, status: 'Wajar' },
];

export const TARIF_UNIT_DISTRIBUSI = [
  { unit: 'Badan Usaha Rumah Sakit', entri: 4862, persen: 65.7, skorKewajaran: 91.2, color: '#0284C7', badge: 'RSBP', maxLevel: 'Level 7' },
  { unit: 'Badan Usaha Pelabuhan', entri: 1240, persen: 16.8, skorKewajaran: 88.4, color: '#0D9488', badge: 'Pelabuhan', maxLevel: 'Level 5' },
  { unit: 'Badan Usaha Bandar Udara', entri: 685, persen: 9.3, skorKewajaran: 89.6, color: '#6366F1', badge: 'Bandara Hang Nadim', maxLevel: 'Level 5' },
  { unit: 'Badan Usaha Fasilitas & Lingkungan', entri: 468, persen: 6.3, skorKewajaran: 86.8, color: '#D97706', badge: 'SPAM & Fasling', maxLevel: 'Level 5' },
  { unit: 'Kuningan Guest House', entri: 140, persen: 1.9, skorKewajaran: 91.5, color: '#EC4899', badge: 'Guest House', maxLevel: 'Level 2' },
];

export const TARIF_LEVEL_DEPTH_STAT = [
  { level: 'LEVEL 1', nama: 'Klasifikasi Bidang Induk', jangkauan: '100% (7.395)', depth: 100, deskripsi: 'Pengelompokan dasar operasional per unit usaha penyedia layanan' },
  { level: 'LEVEL 2', nama: 'Sub-Kategori Operasional', jangkauan: '100% (7.395)', depth: 100, deskripsi: 'Instalasi, jenis fasilitas, divisi pelayanan, atau pass masuk' },
  { level: 'LEVEL 3', nama: 'Kelompok Ruang & Fasilitas', jangkauan: '92.4% (6.833)', depth: 92.4, deskripsi: 'Poli spesialis, dermaga, terminal feri, jenis kamar transit' },
  { level: 'LEVEL 4', nama: 'Jenis Tindakan / Pemakaian', jangkauan: '78.5% (5.805)', depth: 78.5, deskripsi: 'Prosedur tindakan, alat berat bongkar muat, jenis sambungan air' },
  { level: 'LEVEL 5', nama: 'Spesifikasi / Kapasitas / Skala', jangkauan: '54.2% (4.008)', depth: 54.2, deskripsi: 'Skala tonase, volume air, durasi pemakaian, ukuran ruangan' },
  { level: 'LEVEL 6', nama: 'Kualifikasi Khusus / Kelas', jangkauan: '14.8% (1.095)', depth: 14.8, deskripsi: 'Kelas perawatan (I, III, V, VIP), kualifikasi dokter spesialis' },
  { level: 'LEVEL 7', nama: 'Detil Sub-Spesifik Layanan', jangkauan: '4.1% (303)', depth: 4.1, deskripsi: 'Mikro tindakan bedah khusus, komponen tindakan terurai sangat rinci' },
];

export const PHKS_TARIF_EVALUASI_DATA = [
  { level: 'Level 1: Kepelabuhanan', totalLayanan: 34, tarifBerlakuRata: 'Rp 450.000', kewajaranSurvei: 91.2, status: 'Valid' },
  { level: 'Level 2: Bandara Hang Nadim', totalLayanan: 26, tarifBerlakuRata: 'Rp 380.000', kewajaranSurvei: 88.7, status: 'Valid' },
  { level: 'Level 3: Pengelolaan Air SPAM', totalLayanan: 18, tarifBerlakuRata: 'Rp 6.800/m³', kewajaranSurvei: 87.4, status: 'Valid' },
  { level: 'Level 4: Limbah B3 KPLI', totalLayanan: 22, tarifBerlakuRata: 'Rp 1.250.000/ton', kewajaranSurvei: 89.6, status: 'Valid' },
  { level: 'Level 5: Rumah Sakit RSBP', totalLayanan: 84, tarifBerlakuRata: 'Tarif INA-CBGs & PMK', kewajaranSurvei: 92.5, status: 'Valid' },
  { level: 'Level 6: Pemanfaatan Lahan', totalLayanan: 15, tarifBerlakuRata: 'Sesuai Zona Nilai Tanah', kewajaranSurvei: 84.2, status: 'Penyesuaian' },
  { level: 'Level 7: Wisata & Fasilitas', totalLayanan: 19, tarifBerlakuRata: 'Rp 15.000 - Rp 250.000', kewajaranSurvei: 93.1, status: 'Valid' },
];

export const SURVEI_KEWAJARAN_PILARS = [
  { pilar: '1. Biaya Pokok Produksi (HPP/Unit Cost)', skor: 91.4, status: 'Wajar', keterangan: 'Kompensasi inflasi bahan medis habis pakai, spare parts aviasi & BBM pelabuhan.' },
  { pilar: '2. Daya Beli & Respon Pelaku Usaha', skor: 87.2, status: 'Wajar', keterangan: 'Kesesuaian dengan kemampuan bayar asosiasi logistik, tenant, dan masyarakat Batam.' },
  { pilar: '3. Benchmark Regional Kawasan Serupa', skor: 89.8, status: 'Wajar', keterangan: 'Komparasi tarif dengan pelabuhan Tanjung Priok, Johor Port, dan fasilitas Kepri.' },
  { pilar: '4. Standar Pelayanan Minimal (SPM) & SLA', skor: 90.1, status: 'Wajar', keterangan: 'Jaminan pemenuhan SPM dan kepastian waktu penyelesaian layanan publik.' },
];

// ============================================================================
// 7. REKAPITULASI 45 DATASET SATU DATA DARI PDF (PTSP 17, PHKS 7, PDSI 21)
// ============================================================================

export const SATU_DATA_KEBIJAKAN_STRATEGIS_CATALOG: SatuDatasetItem[] = [
  // --- PTSP (17 Dataset - Hal 21-28) ---
  {
    no: 1,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Permohonan Perizinan SKKBM (Kerja Bongkar Muat)',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Perusahaan', 'Nama Kapal', 'Bendera Kapal', 'ETA', 'Lama Hari Kerja', 'Jumlah Bongkar Muat'],
    halamanPdf: 'Hal 21-22',
  },
  {
    no: 2,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Permohonan Perizinan SKKAB (Kerja Angkut Barang)',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Perusahaan', 'Peralatan Bongkar Muat', 'Jumlah TKBM', 'Status Muatan', 'Pelabuhan Asal'],
    halamanPdf: 'Hal 22',
  },
  {
    no: 3,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Permohonan Perizinan SKKAA (Kepemilikan dan Asal Alat)',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['No Izin', 'Jenis Peralatan', 'Status Kepemilikan', 'Estimate Waktu Kerja'],
    halamanPdf: 'Hal 22-23',
  },
  {
    no: 4,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Ijin Pembangunan/Pengoperasian Terminal Khusus (TUKS)',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributUtama: ['Nama Perusahaan', 'Lokasi Usaha', 'Status Penanaman Modal', 'KBLI', 'NPWP'],
    halamanPdf: 'Hal 23',
  },
  {
    no: 5,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Implementasi Kebijakan Transformasi Digital MPP',
    jenisData: 'Data Statistik',
    periodeData: 'Persemester',
    sifatData: 'TERBUKA',
    atributUtama: ['Nama Perusahaan', 'NIB', 'KBLI', 'Nomor Akta', 'Nomor Izin Operasi'],
    halamanPdf: 'Hal 24',
  },
  {
    no: 6,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Monev Pengelolaan Pengaduan Layanan PTSP',
    jenisData: 'Data Statistik',
    periodeData: 'Persemester',
    sifatData: 'TERBUKA',
    atributUtama: ['Saluran Pengaduan', 'Jenis Pengaduan', 'Jumlah Masuk', 'Penyelesaian', 'Status Selesai'],
    halamanPdf: 'Hal 24',
  },
  {
    no: 7,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Daftar Informasi Perizinan BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Perusahaan', 'Alamat', 'Penanggung Jawab Proyek', 'Status Selesai'],
    halamanPdf: 'Hal 24',
  },
  {
    no: 8,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Pemantauan dan Evaluasi Perizinan',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['NIB', 'KBLI', 'Sektor', 'Rencana Investasi', 'Realisasi Investasi', 'Tenaga Kerja TKI/TKA'],
    halamanPdf: 'Hal 25',
  },
  {
    no: 9,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Permohonan Perizinan Berusaha OSS',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Skala Usaha', 'Tingkat Resiko', 'Status Modal', 'Asal Negara', 'Modal Usaha', 'Status Izin'],
    halamanPdf: 'Hal 25',
  },
  {
    no: 10,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Surat Keterangan Izin Operasi Perusahaan',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERBUKA',
    atributUtama: ['No Pendaftaran', 'No Izin', 'Nama Agen', 'Nama Kapal', 'Jumlah Muatan'],
    halamanPdf: 'Hal 26',
  },
  {
    no: 11,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Rekomendasi Tersus untuk Kegiatan Bongkar Muat',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Kapal', 'Jenis Barang', 'Volume Barang', 'Pelabuhan Asal & Tujuan'],
    halamanPdf: 'Hal 26',
  },
  {
    no: 12,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Permohonan Persetujuan Jadwal Kapal',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Pemilik Kapal', 'Nama Kapal', 'Jadwal Keberangkatan', 'Rute Asal-Tujuan'],
    halamanPdf: 'Hal 27',
  },
  {
    no: 13,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Ijin Keruk dan Reklamasi',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERBUKA',
    atributUtama: ['Nama Perusahaan', 'NIB', 'KBLI', 'Lokasi Usaha', 'Status Modal'],
    halamanPdf: 'Hal 27',
  },
  {
    no: 14,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Jenis Layanan BP Batam (Layanan Masuk vs Selesai)',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributUtama: ['Jenis Layanan', 'Jumlah Masuk', 'Jumlah Terselesaikan'],
    halamanPdf: 'Hal 27',
  },
  {
    no: 15,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Jumlah Pemantauan dan Evaluasi Perizinan',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['NIB', 'Sektor', 'Sertifikat Standar', 'Realisasi Investasi', 'Tenaga Kerja'],
    halamanPdf: 'Hal 27',
  },
  {
    no: 16,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Jumlah Layanan Non Perizinan',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Jenis Non Perizinan', 'Status Masuk', 'Status Tolak', 'Status Proses', 'Status Selesai'],
    halamanPdf: 'Hal 27-28',
  },
  {
    no: 17,
    unit: 'Pusat Pelayanan Terpadu Satu Pintu',
    unitId: 'ptsp',
    namaData: 'Data Penyelesaian Perizinan yang Tepat Waktu (SLA)',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERBUKA',
    atributUtama: ['Jenis Perizinan', 'Status Masuk', 'Status Proses', 'Status Selesai', 'SLA Target & Realisasi'],
    halamanPdf: 'Hal 28',
  },

  // --- PHKS (7 Dataset - Hal 12-13) ---
  {
    no: 18,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Data Pemantauan & Evaluasi Kualitas Kebijakan BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERBUKA',
    atributUtama: ['Nama Kebijakan', 'Nomor Perka/Kepka', 'Analisis Instansi', 'Tahun Penetapan', 'Skor IKK'],
    halamanPdf: 'Hal 12',
  },
  {
    no: 19,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Rekapitulasi Hasil Sinkronisasi Kebijakan Eksternal',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['Tentang', 'Kategori', 'Status Keselarasan', 'Nomor Regulasi Pusat'],
    halamanPdf: 'Hal 13',
  },
  {
    no: 20,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Daftar Tarif Layanan BP Batam (Level 1 s.d Level 7)',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERBUKA',
    atributUtama: ['Unit Kerja', 'Level 1-7', 'Satuan Layanan', 'Unit Cost', 'Tarif Berlaku', 'Dasar Hukum PMK'],
    halamanPdf: 'Hal 13',
  },
  {
    no: 21,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Rekapitulasi Hasil Sinkronisasi Kebijakan Internal',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['Tentang', 'Kategori Regulasi', 'Status Berlaku', 'Nomor SK'],
    halamanPdf: 'Hal 13',
  },
  {
    no: 22,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Survei Kewajaran dan Evaluasi Tarif Layanan',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['Lokasi', 'Instrumen Penelitian', 'Kriteria Responden', 'Skor Kewajaran', 'Persentase'],
    halamanPdf: 'Hal 13',
  },
  {
    no: 23,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Daftar Risalah Rapat Dengar Pendapat (RDP) Pimpinan',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Tanggal Rapat', 'Judul Rapat', 'Tempat', 'Waktu', 'Keputusan Strategis'],
    halamanPdf: 'Hal 13',
  },
  {
    no: 24,
    unit: 'Pusat Harmonisasi Kebijakan Strategis',
    unitId: 'pusat-harmonisasi',
    namaData: 'Data Monitoring Tindak Lanjut Rapat Pimpinan',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nota Dinas Pengantar', 'Matrik Tindak Lanjut', 'Status Realisasi Rekomendasi'],
    halamanPdf: 'Hal 13',
  },

  // --- PDSI (21 Dataset - Hal 40-43) ---
  {
    no: 25,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Informasi Business Intelligence (BI) BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributUtama: ['Unit Kerja', 'Nama Dashboard', 'Jumlah Worksheet', 'Pembaharuan Terakhir'],
    halamanPdf: 'Hal 40',
  },
  {
    no: 26,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Jaringan Spasial Fiber Optik BP Batam',
    jenisData: 'Data Spasial',
    periodeData: 'Jika Update',
    sifatData: 'TERBATAS',
    atributUtama: ['Jalur Jalan', 'Jumlah Core (48/96)', 'Panjang Lintasan', 'Brand FO', 'Start/Endpoint'],
    halamanPdf: 'Hal 40',
  },
  {
    no: 27,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Daftar Data Satu Data BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBATAS',
    atributUtama: ['Nama Data', 'Produsen Data', 'Kategori Data', 'Status Pemutakhiran'],
    halamanPdf: 'Hal 41',
  },
  {
    no: 28,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Daftar Sistem Penghubung & Integrasi API Data',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributUtama: ['Organisasi Penyedia', 'Sistem Terhubung', 'Tipe Komunikasi (REST API)', 'Aplikasi', 'Status Sinkronisasi'],
    halamanPdf: 'Hal 41',
  },
  {
    no: 29,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Jalur Fiber Optic (FO) Wilayah',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributUtama: ['Bagian Wilayah', 'Lokasi', 'Titik Sambung (Closure)', 'Redundansi'],
    halamanPdf: 'Hal 41',
  },
  {
    no: 30,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Sarana dan Aset Fiber Optic Spasial',
    jenisData: 'Data Spasial',
    periodeData: 'Jika Update',
    sifatData: 'TERBATAS',
    atributUtama: ['Manhole', 'Handhole', 'Pole Tiang', 'Kategori Kabel'],
    halamanPdf: 'Hal 41',
  },
  {
    no: 31,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Rekap Kerusakan dan Perbaikan Perangkat TI',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['Jenis Kerusakan', 'Lokasi Unit', 'Jumlah Perbaikan', 'Waktu Pemulihan (MTTR)'],
    halamanPdf: 'Hal 41',
  },
  {
    no: 32,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Rak Tier-3 Data Center BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERBUKA',
    atributUtama: ['Ruangan Data Center', 'Total Rak (96)', 'Rak Terisi (78)', 'Rak Kosong (18)', 'Daya Listrik'],
    halamanPdf: 'Hal 41',
  },
  {
    no: 33,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Daftar Lisensi Software Resmi BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Software', 'Tipe Perangkat Lunak', 'Jenis OS/Utilitas', 'Validasi Lisensi'],
    halamanPdf: 'Hal 41-42',
  },
  {
    no: 34,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Layanan Data Centre & Co-Location',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributUtama: ['Kelompok Layanan', 'Kategori', 'Detail Layanan Co-location/VPS', 'Tarif Layanan'],
    halamanPdf: 'Hal 42',
  },
  {
    no: 35,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Kepuasan Pelanggan Data Centre',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERBUKA',
    atributUtama: ['Kategori Tenant', 'Tingkat Kepuasan (94.6%)', 'SLA Uptime Tersedia'],
    halamanPdf: 'Hal 42',
  },
  {
    no: 36,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Serangan Keamanan Siber IT / SOC BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERTUTUP',
    atributUtama: ['Threat Activity (DDoS, Malware, Brute Force)', 'Status Keamanan', 'Jumlah Serangan Terblokir'],
    halamanPdf: 'Hal 42',
  },
  {
    no: 37,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Rekap Infrastruktur Server dan Storage',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Server', 'Tipe', 'Brand Hardware', 'Status Garansi', 'End of Support (EOS)'],
    halamanPdf: 'Hal 42',
  },
  {
    no: 38,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Katalog 48 Aplikasi Resmi BP Batam',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributUtama: ['Nama Aplikasi', 'Basis Web/Mobile', 'Bahasa Pemrograman', 'Integrasi TTE BSrE', 'Dev Year'],
    halamanPdf: 'Hal 42',
  },
  {
    no: 39,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Rencana Bisnis dan Anggaran (RBA) PDSI',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERBUKA',
    atributUtama: ['Alokasi Pagu Belanja TIK', 'Realisasi Investasi Server', 'Target PNBP Co-Location'],
    halamanPdf: 'Hal 42',
  },
  {
    no: 40,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Peta Rencana SPBE BP Batam 2025-2029',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributUtama: ['Arsitektur Proses Bisnis', 'Arsitektur Layanan', 'Peta Jalan TIK Multi-Tahun'],
    halamanPdf: 'Hal 43',
  },
  {
    no: 41,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Daftar Layanan TI & Service Level Agreement',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERBUKA',
    atributUtama: ['Nama Sub-Layanan', 'Prioritas Penanganan', 'Norma Waktu Respon', 'Norma Waktu Penyelesaian'],
    halamanPdf: 'Hal 43',
  },
  {
    no: 42,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Laporan Pemantauan dan Evaluasi SPBE',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['6 Domain Arsitektur', 'Aspek Penilaian MenPAN-RB', 'Indeks Kematangan 4.12'],
    halamanPdf: 'Hal 43',
  },
  {
    no: 43,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Monitoring Sistem Informasi Arsitektur (SIA)',
    jenisData: 'Data Statistik',
    periodeData: 'Jika Update',
    sifatData: 'TERTUTUP',
    atributUtama: ['Model Arsitektur', 'Matriks Hubungan Aplikasi-Data-Proses', 'Audit Arsitektur'],
    halamanPdf: 'Hal 43',
  },
  {
    no: 44,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Laporan Evaluasi Penyelenggaraan Statistik Sektoral (EPSS)',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'TERTUTUP',
    atributUtama: ['Domain Statistik BPS', 'Indeks Pembangunan Statistik (IPS)', 'Bobot dan Nilai Capaian'],
    halamanPdf: 'Hal 43',
  },
  {
    no: 45,
    unit: 'Pusat Data dan Sistem Informasi',
    unitId: 'pdsi',
    namaData: 'Data Permintaan Layanan IT (Helpdesk Ticketing)',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'TERBUKA',
    atributUtama: ['Bulan', 'Nama Layanan Permintaan', 'Jumlah Tiket Masuk', 'Tiket Selesai Tepat Waktu (SLA)'],
    halamanPdf: 'Hal 43',
  },
];

// ============================================================================
// DATASET TAMBAHAN SESUAI SPESIFIKASI DOKUMEN SATU DATA BP BATAM
// ============================================================================

// 1. Pusren: Rekapitulasi Rekomendasi Perubahan Peruntukan Lahan Setiap Tahun (Hal. 52 No. 8)
// Atribut: TAHUN, JUMLAH PERMOHONAN, SELESAI
export interface RekomendasiPeruntukanLahanItem {
  tahun: string;
  jumlahPermohonan: number; // Jumlah Pemohon
  selesai: number; // Selesai / Rekomendasi Terbit
  persentase: number;
  keterangan: string;
}

export const REKOMENDASI_PERUNTUKAN_LAHAN_DATA: RekomendasiPeruntukanLahanItem[] = [
  { tahun: '2021', jumlahPermohonan: 142, selesai: 136, persentase: 95.8, keterangan: 'Verifikasi zonasi KBLI & RTRW' },
  { tahun: '2022', jumlahPermohonan: 185, selesai: 178, persentase: 96.2, keterangan: 'Peningkatan permohonan industri Nongsa' },
  { tahun: '2023', jumlahPermohonan: 214, selesai: 205, persentase: 95.8, keterangan: 'Integrasi sistem GIS Spasial Lahan' },
  { tahun: '2024', jumlahPermohonan: 268, selesai: 256, persentase: 95.5, keterangan: 'Revisi peruntukan komersial Batam Center' },
  { tahun: '2025', jumlahPermohonan: 310, selesai: 298, persentase: 96.1, keterangan: 'Penyelarasan PP 41/2021 & RDTR Batam' },
  { tahun: '2026', jumlahPermohonan: 184, selesai: 175, persentase: 95.1, keterangan: 'Cut-off Triwulan II 2026 (Berjalan)' },
];

// 2. Pusren: Masterplan Jalan (Hal. 52 No. 12)
// Atribut: TAHUN, KLASIFIKASI JALAN, WILAYAH, SUB WILAYAH, PANJANG, LEBAR
export interface MasterplanJalanItem {
  id: string;
  tahun: string;
  klasifikasiJalan: string;
  wilayah: string;
  subWilayah: string;
  panjangKm: number;
  lebarMeter: number;
  statusKonstruksi: string;
}

export const MASTERPLAN_JALAN_DATA: MasterplanJalanItem[] = [
  {
    id: 'mpj-01',
    tahun: '2025-2029',
    klasifikasiJalan: 'Arteri Primer',
    wilayah: 'Batam Kota - Nongsa',
    subWilayah: 'SWP II (Koridor Bandara Hang Nadim - KEK Nongsa Digital)',
    panjangKm: 18.5,
    lebarMeter: 35.0,
    statusKonstruksi: 'Operasional 5 Lajur (Terhubung Jalur Logistik)',
  },
  {
    id: 'mpj-02',
    tahun: '2025-2029',
    klasifikasiJalan: 'Arteri Primer',
    wilayah: 'Batu Ampar - Muka Kuning',
    subWilayah: 'SWP III (Koridor Industri Sei Panas - Pelabuhan Kargo)',
    panjangKm: 14.2,
    lebarMeter: 35.0,
    statusKonstruksi: 'Pelebaran 5 Lajur Tahap 2 Selesai',
  },
  {
    id: 'mpj-03',
    tahun: '2025-2029',
    klasifikasiJalan: 'Arteri Primer',
    wilayah: 'Bandara Hang Nadim - Kabil Port',
    subWilayah: 'SWP II (Kawasan Industri Berat Kabil - Dermaga CPO)',
    panjangKm: 16.8,
    lebarMeter: 40.0,
    statusKonstruksi: 'Peningkatan Struktur Perkerasan Berat',
  },
  {
    id: 'mpj-04',
    tahun: '2025-2029',
    klasifikasiJalan: 'Arteri Sekunder',
    wilayah: 'Batu Aji - Tanjung Uncang',
    subWilayah: 'SWP V (Koridor Shipyard & Galangan Kapal Nasional)',
    panjangKm: 12.8,
    lebarMeter: 28.0,
    statusKonstruksi: 'Operasional Jalur Angkut Komponen Berat',
  },
  {
    id: 'mpj-05',
    tahun: '2025-2029',
    klasifikasiJalan: 'Kolektor Primer',
    wilayah: 'Sekupang - Marina City',
    subWilayah: 'SWP IV (Kawasan Pariwisata, Dermaga Feri & RSBP)',
    panjangKm: 16.4,
    lebarMeter: 24.0,
    statusKonstruksi: 'Pelebaran 4 Lajur & Jalur Sepeda',
  },
  {
    id: 'mpj-06',
    tahun: '2025-2029',
    klasifikasiJalan: 'Kolektor Sekunder',
    wilayah: 'Kabil - Teluk Tering',
    subWilayah: 'SWP I (Jalur Lingkar Luar Timur Batam Center)',
    panjangKm: 9.6,
    lebarMeter: 22.0,
    statusKonstruksi: 'Optimalisasi Drainase & Median Jalan',
  },
  {
    id: 'mpj-07',
    tahun: '2025-2029',
    klasifikasiJalan: 'Kolektor Primer',
    wilayah: 'Bengkong - Batu Ampar',
    subWilayah: 'SWP III (Akses Pariwisata Kuliner & Pemukiman)',
    panjangKm: 7.2,
    lebarMeter: 22.0,
    statusKonstruksi: 'Peningkatan Aspal Hotmix & Trotoar',
  },
];

// 3. PDSI: Data Rak Data Center (Hal. 41 No. 8)
// Atribut: RUANGAN, JENIS RAK, TANGGAL REKAP AWAL, TANGGAL REKAP AKHIR, TOTAL RAK, JUMLAH RAK TERISI, JUMLAH RAK KOSONG
export interface RakDataCenterRuanganItem {
  id: string;
  ruangan: string;
  jenisRak: string;
  tanggalRekapAwal: string;
  tanggalRekapAkhir: string;
  totalRak: number;
  jumlahRakTerisi: number;
  jumlahRakKosong: number;
  persentaseTerisi: number;
}

export const RAK_DATA_CENTER_RUANGAN_DATA: RakDataCenterRuanganItem[] = [
  {
    id: 'dc-room-1',
    ruangan: 'Ruang Server Utama (BIDA Lt. 3)',
    jenisRak: 'Rak 42U Server Blade & High Density Compute',
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
    totalRak: 36,
    jumlahRakTerisi: 31,
    jumlahRakKosong: 5,
    persentaseTerisi: 86.1,
  },
  {
    id: 'dc-room-2',
    ruangan: 'Ruang Kolokasi Tenant & Instansi (BIDA Lt. 3)',
    jenisRak: 'Rak 42U Colocation K/L Pusat, BUMN & Bank',
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
    totalRak: 28,
    jumlahRakTerisi: 23,
    jumlahRakKosong: 5,
    persentaseTerisi: 82.1,
  },
  {
    id: 'dc-room-3',
    ruangan: 'Disaster Recovery Center (DRC Sekupang)',
    jenisRak: 'Rak 42U Replikasi Offsite & Backup Storage',
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
    totalRak: 20,
    jumlahRakTerisi: 16,
    jumlahRakKosong: 4,
    persentaseTerisi: 80.0,
  },
  {
    id: 'dc-room-4',
    ruangan: 'Meet-Me Room (MMR) & ISP Network',
    jenisRak: 'Rak Core Switch & Patching Fiber Optik',
    tanggalRekapAwal: '01/01/2026',
    tanggalRekapAkhir: '31/03/2026',
    totalRak: 12,
    jumlahRakTerisi: 8,
    jumlahRakKosong: 4,
    persentaseTerisi: 66.7,
  },
];

// 4. PDSI: Data Kepuasan Pelanggan Data Centre (Hal. 42 No. 11)
// Atribut: TAHUN, KATEGORI, TINGKAT KEPUASAN, PERSENTASE
export interface KepuasanPelangganDcItem {
  id: string;
  tahun: string;
  kategori: string;
  tingkatKepuasan: string;
  persentase: number;
  skor: number;
}

export const KEPUASAN_PELANGGAN_DC_DATA: KepuasanPelangganDcItem[] = [
  {
    id: 'kpu-01',
    tahun: '2026',
    kategori: 'Keandalan Daya Listrik & Redundansi UPS',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 96.5,
    skor: 4.83,
  },
  {
    id: 'kpu-02',
    tahun: '2026',
    kategori: 'Keamanan Fisik 24/7 & Akses Biometrik',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 95.8,
    skor: 4.79,
  },
  {
    id: 'kpu-03',
    tahun: '2026',
    kategori: 'Kecepatan Respon Dukungan Teknis (SLA Helpdesk)',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 94.2,
    skor: 4.71,
  },
  {
    id: 'kpu-04',
    tahun: '2026',
    kategori: 'Stabilitas Suhu Ruang & Sistem Pendingin PAC',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 93.6,
    skor: 4.68,
  },
  {
    id: 'kpu-05',
    tahun: '2026',
    kategori: 'Kecepatan Bandwidth & Konektivitas Fiber Optik',
    tingkatKepuasan: 'Sangat Puas',
    persentase: 92.4,
    skor: 4.62,
  },
  {
    id: 'kpu-06',
    tahun: '2026',
    kategori: 'Kemudahan Prosedur Onboarding & Akses Rak',
    tingkatKepuasan: 'Puas',
    persentase: 90.8,
    skor: 4.54,
  },
];

// 5. PDSI: Data Serangan Keamanan IT (Hal. 42 No. 12)
// Atribut: PERIODE, THREAT ACTIVITY, STATUS KEAMANAN, JML SERANGAN
export interface SeranganKeamananItItem {
  id: string;
  periode: string;
  threatActivity: string;
  statusKeamanan: string;
  jmlSerangan: number;
}

export const SERANGAN_KEAMANAN_IT_DATA: SeranganKeamananItItem[] = [
  {
    id: 'atk-01',
    periode: 'April 2026',
    threatActivity: 'DDoS Volumetric & HTTP Flood ke Portal BP Batam',
    statusKeamanan: '100% Termitigasi (Blocked by WAF Edge)',
    jmlSerangan: 6420,
  },
  {
    id: 'atk-02',
    periode: 'April 2026',
    threatActivity: 'Brute Force Authentication ke VPN & SSH Gateway',
    statusKeamanan: '100% Termitigasi (IPS / Fail2Ban)',
    jmlSerangan: 4210,
  },
  {
    id: 'atk-03',
    periode: 'April 2026',
    threatActivity: 'SQL Injection (SQLi) & XSS pada Web Form Perizinan',
    statusKeamanan: '99,8% Termitigasi (OWASP Core Rules)',
    jmlSerangan: 2380,
  },
  {
    id: 'atk-04',
    periode: 'Maret 2026',
    threatActivity: 'Malware & Phishing Attachment di Mail Gateway',
    statusKeamanan: '100% Termitigasi (Sandboxing Quarantined)',
    jmlSerangan: 1250,
  },
  {
    id: 'atk-05',
    periode: 'Maret 2026',
    threatActivity: 'Port Scanning & Reconnaissance Network Perimeter',
    statusKeamanan: '100% Termitigasi (Filtered by Firewall)',
    jmlSerangan: 560,
  },
  {
    id: 'atk-06',
    periode: 'Februari 2026',
    threatActivity: 'Credential Stuffing & Unauthorized API Probe',
    statusKeamanan: '100% Termitigasi (Rate Limit Triggered)',
    jmlSerangan: 890,
  },
];

// 6. PDSI: Laporan Pemantauan dan Evaluasi EPSS (Hal. 43 No. 20)
// Atribut: TAHUN, DOMAIN, ASPEK, INDIKATOR, BOBOT, NILAI
export interface EvaluasiEpssItem {
  tahun: string;
  domain: string;
  aspek: string;
  indikator: string;
  bobot: number;
  nilai: number;
}

export const EVALUASI_EPSS_DATA: EvaluasiEpssItem[] = [
  { tahun: '2026', domain: 'Prinsip Satu Data Indonesia', aspek: 'Standar Data & Metadata', indikator: 'Kepatuhan Format Baku SDI', bobot: 20, nilai: 3.10 },
  { tahun: '2026', domain: 'Kualitas Data Statistik', aspek: 'Akurasi & Integritas Data', indikator: 'Validasi Multi-Unit Otomatis', bobot: 25, nilai: 2.90 },
  { tahun: '2026', domain: 'Proses Bisnis Statistik', aspek: 'Pengumpulan & Verifikasi', indikator: 'Standardisasi Alur Data PDSI', bobot: 25, nilai: 2.80 },
  { tahun: '2026', domain: 'Kelembagaan Statistik', aspek: 'SDM & Organisasi Produsen Data', indikator: 'Kompetensi Pengelola Data', bobot: 15, nilai: 2.70 },
  { tahun: '2026', domain: 'Statistik Nasional & Penyebarluasan', aspek: 'Aksesibilitas & Integrasi Portal', indikator: 'Ketersediaan API Satu Data', bobot: 15, nilai: 2.75 },
];

export const EPSS_SUMMARY = {
  tahun: '2026',
  nilaiIndeks: 2.85,
  skalaMaks: 5.00,
  predikat: 'Baik',
  target: 2.60,
  keterangan: 'Evaluasi Penyelenggaraan Statistik Sektoral (EPSS) oleh Badan Pusat Statistik (BPS)',
};

// 7. PDSI: Data Permintaan Layanan IT / Helpdesk (Hal. 43 No. 21)
// Atribut: TAHUN, BULAN, NAMA LAYANAN, JUMLAH
export interface PermintaanLayananItHelpdeskItem {
  id: string;
  tahun: string;
  bulan: string;
  namaLayanan: string;
  jumlah: number;
  selesai: number;
  slaPercent: number;
}

export const PERMINTAAN_LAYANAN_IT_HELPDESK_DATA: PermintaanLayananItHelpdeskItem[] = [
  { id: 'hdk-01', tahun: '2026', bulan: 'YTD April', namaLayanan: 'Pengembangan Modul & Integrasi API Aplikasi', jumlah: 385, selesai: 376, slaPercent: 97.7 },
  { id: 'hdk-02', tahun: '2026', bulan: 'YTD April', namaLayanan: 'Hak Akses Single Sign-On (SSO) & Email Dinas', jumlah: 342, selesai: 342, slaPercent: 100.0 },
  { id: 'hdk-03', tahun: '2026', bulan: 'YTD April', namaLayanan: 'Infrastruktur Jaringan LAN & WiFi Gedung', jumlah: 298, selesai: 294, slaPercent: 98.7 },
  { id: 'hdk-04', tahun: '2026', bulan: 'YTD April', namaLayanan: 'Troubleshooting Transaksi SIMKEU & Billing', jumlah: 245, selesai: 240, slaPercent: 98.0 },
  { id: 'hdk-05', tahun: '2026', bulan: 'YTD April', namaLayanan: 'Perbaikan PC/Laptop & Periferal Dinas', jumlah: 142, selesai: 139, slaPercent: 97.9 },
  { id: 'hdk-06', tahun: '2026', bulan: 'YTD April', namaLayanan: 'Sertifikat TTE BSrE & Keamanan Akun', jumlah: 70, selesai: 69, slaPercent: 98.6 },
];

export const PERMINTAAN_IT_SUMMARY = {
  totalTiket: 1482,
  tiketSelesai: 1450,
  dalamProses: 32,
  persenSelesai: 97.8,
  kepatuhanSla: 94.6,
};

// 8. PTSP: Data Penyelesaian Perizinan yang Tepat Waktu (Hal. 28 No. 17)
// Atribut: BULAN, TANGGAL IZIN, TANGGAL REKAP AWAL, TANGGAL REKAP AKHIR, JENIS PERIZINAN, NAMA PERIZINAN BERUSAHA, PERMOHONAN STATUS MASUK, PERMOHONAN STATUS PROSES, PERMOHONAN STATUS SELESAI, SERVICE LEVEL AGREEMENT (SLA)
export interface SlaPenyelesaianPerizinanItem {
  id: string;
  bulan: string;
  jenisPerizinan: string;
  namaPerizinanBerusaha: string;
  permohonanStatusMasuk: number;
  permohonanStatusProses: number;
  permohonanStatusSelesai: number;
  slaPercent: number;
  targetSla: number;
  rataRataHari: number;
}

export const SLA_PENYELESAIAN_PERIZINAN_DATA: SlaPenyelesaianPerizinanItem[] = [
  {
    id: 'sla-01',
    bulan: 'April 2026',
    jenisPerizinan: 'Perizinan Berusaha',
    namaPerizinanBerusaha: 'Izin Usaha Manufaktur & Perakitan Elektronik',
    permohonanStatusMasuk: 2450,
    permohonanStatusProses: 80,
    permohonanStatusSelesai: 2340,
    slaPercent: 95.5,
    targetSla: 90.0,
    rataRataHari: 2.1,
  },
  {
    id: 'sla-02',
    bulan: 'April 2026',
    jenisPerizinan: 'Kemaritiman & Bongkar Muat',
    namaPerizinanBerusaha: 'Surat Keterangan Kerja Bongkar Muat (SKKBM)',
    permohonanStatusMasuk: 3120,
    permohonanStatusProses: 90,
    permohonanStatusSelesai: 3010,
    slaPercent: 96.5,
    targetSla: 90.0,
    rataRataHari: 1.4,
  },
  {
    id: 'sla-03',
    bulan: 'April 2026',
    jenisPerizinan: 'Logistik & Distribusi',
    namaPerizinanBerusaha: 'Surat Keterangan Kerja Angkut Barang (SKKAB)',
    permohonanStatusMasuk: 2180,
    permohonanStatusProses: 65,
    permohonanStatusSelesai: 2095,
    slaPercent: 96.1,
    targetSla: 90.0,
    rataRataHari: 1.6,
  },
  {
    id: 'sla-04',
    bulan: 'April 2026',
    jenisPerizinan: 'Pelayaran & Transportasi',
    namaPerizinanBerusaha: 'Persetujuan Jadwal Kapal Feri & Angkutan Laut',
    permohonanStatusMasuk: 1480,
    permohonanStatusProses: 25,
    permohonanStatusSelesai: 1445,
    slaPercent: 97.6,
    targetSla: 90.0,
    rataRataHari: 1.2,
  },
  {
    id: 'sla-05',
    bulan: 'April 2026',
    jenisPerizinan: 'Pelabuhan Khusus',
    namaPerizinanBerusaha: 'Izin Operasi Terminal Khusus & TUKS Industri',
    permohonanStatusMasuk: 640,
    permohonanStatusProses: 43,
    permohonanStatusSelesai: 582,
    slaPercent: 90.9,
    targetSla: 90.0,
    rataRataHari: 3.4,
  },
  {
    id: 'sla-06',
    bulan: 'April 2026',
    jenisPerizinan: 'Peralatan Berat Konstruksi',
    namaPerizinanBerusaha: 'SKKAA (Kepemilikan dan Asal Alat Berat)',
    permohonanStatusMasuk: 890,
    permohonanStatusProses: 32,
    permohonanStatusSelesai: 850,
    slaPercent: 95.5,
    targetSla: 90.0,
    rataRataHari: 1.9,
  },
  {
    id: 'sla-07',
    bulan: 'April 2026',
    jenisPerizinan: 'Komersial & Pariwisata',
    namaPerizinanBerusaha: 'Izin Usaha Jasa Komersial, Perhotelan & Resto',
    permohonanStatusMasuk: 1540,
    permohonanStatusProses: 55,
    permohonanStatusSelesai: 1470,
    slaPercent: 95.5,
    targetSla: 90.0,
    rataRataHari: 1.8,
  },
];

export const SLA_PERIZINAN_SUMMARY = {
  totalMasuk: 14850,
  totalSelesai: 14080,
  dalamProses: 770,
  rerataSla: 94.8,
  targetSla: 90.0,
  rerataHari: 2.1,
};

// 9. PTSP: Data Monitoring dan Evaluasi Pengelolaan Pengaduan Masyarakat (Hal. 24 No. 6)
// Atribut: BULAN, TAHUN, SALURAN PENGADUAN, JENIS PENGADUAN, KODE, JUMLAH PENGADUAN, PENYELESAIAN PENGADUAN, STATUS SELESAI
export interface PengaduanMasyarakatPtspItem {
  id: string;
  bulan: string;
  tahun: string;
  saluranPengaduan: string;
  jenisPengaduan: string;
  kode: string;
  jumlahPengaduan: number;
  penyelesaianPengaduan: number;
  statusSelesai: string;
  persentaseSelesai: number;
}

export const PENGADUAN_MASYARAKAT_PTSP_DATA: PengaduanMasyarakatPtspItem[] = [
  {
    id: 'aduan-01',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'SP4N-LAPOR! & Kasir Digital',
    jenisPengaduan: 'Konfirmasi Pembayaran PNBP & Billing Bank',
    kode: 'ADU-01',
    jumlahPengaduan: 64,
    penyelesaianPengaduan: 64,
    statusSelesai: '100% Selesai',
    persentaseSelesai: 100.0,
  },
  {
    id: 'aduan-02',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'WhatsApp Helpdesk & Gerai MPP',
    jenisPengaduan: 'Konsultasi Persyaratan KBLI & Kelengkapan Teknis',
    kode: 'ADU-02',
    jumlahPengaduan: 48,
    penyelesaianPengaduan: 47,
    statusSelesai: '97,9% Selesai',
    persentaseSelesai: 97.9,
  },
  {
    id: 'aduan-03',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'Portal Web SIMPADU / IBIS',
    jenisPengaduan: 'Sinkronisasi Akun OSS-RBA ke Portal IBIS',
    kode: 'ADU-03',
    jumlahPengaduan: 32,
    penyelesaianPengaduan: 32,
    statusSelesai: '100% Selesai',
    persentaseSelesai: 100.0,
  },
  {
    id: 'aduan-04',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'Meja Pengaduan Tatap Muka MPP',
    jenisPengaduan: 'Koreksi & Ralat Data Sertifikat Izin Terbit (TTE)',
    kode: 'ADU-04',
    jumlahPengaduan: 26,
    penyelesaianPengaduan: 25,
    statusSelesai: '96,2% Selesai',
    persentaseSelesai: 96.2,
  },
  {
    id: 'aduan-05',
    bulan: 'April',
    tahun: '2026',
    saluranPengaduan: 'Kanal WhatsApp Resmi MPP',
    jenisPengaduan: 'Kapasitas Antrean Loket Fisik Jam Istirahat MPP',
    kode: 'ADU-05',
    jumlahPengaduan: 18,
    penyelesaianPengaduan: 17,
    statusSelesai: '94,4% Selesai',
    persentaseSelesai: 94.4,
  },
];

export const PENGADUAN_PTSP_SUMMARY = {
  totalAduan: 188,
  totalSelesai: 185,
  belumSelesai: 3,
  persentaseSelesai: 98.4,
  rerataHariSelesai: 1.2,
};
