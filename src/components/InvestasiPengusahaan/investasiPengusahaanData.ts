// ============================================================================
// DATA RESMI PERJANJIAN KINERJA ANGGOTA/DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN
// (PERKIN A.4 TAHUN 2025 - BADAN PENGUSAHAAN BATAM)
// Referensi: 
// 1. Dokumen 4. PERKIN A.4 Tahun 2025.pdf
// 2. Atribut Daftar Data Satu Data.pdf (Halaman 8-11, 14, 46-48)
// 3. Referensi 24 Dashboard Unit Kerja BP Batam (DINV, DKPB, DPPU, DLLB)
// ============================================================================

export interface PerkinA4Metadata {
  noPerkin: string;
  year: number;
  title: string;
  officialName: string;
  officialRole: string;
  supervisorName: string;
  supervisorRole: string;
  programName: string;
  paguAnggaran: number; // Rupiah
  realisasiAnggaran: number; // Rupiah
  serapanPersen: number;
  sisaPagu: number;
  averageAchievement: number;
  satkerCount: number;
  totalDatasetCount: number;
}

export const PERKIN_A4_METADATA: PerkinA4Metadata = {
  noPerkin: '7 /KA/3 /2025',
  year: 2025,
  title: 'Perjanjian Kinerja Anggota/Deputi Bidang Investasi dan Pengusahaan BP Batam',
  officialName: 'Fary Djemy Francis',
  officialRole: 'Anggota/Deputi Bidang Investasi dan Pengusahaan',
  supervisorName: 'Amsakar Achmad',
  supervisorRole: 'Kepala Badan Pengusahaan Batam',
  programName: 'Meningkatnya efektivitas promosi dan kualitas realisasi investasi',
  paguAnggaran: 18430417000, // Rp 18.430.417.000,- Sesuai Lampiran I PDF
  realisasiAnggaran: 7850200000, // Rp 7,85 Miliar
  serapanPersen: 42.59,
  sisaPagu: 10580217000,
  averageAchievement: 102.72, // Rata-rata capaian 4 IKP
  satkerCount: 3,
  totalDatasetCount: 39,
};

export interface PerkinA4Kpi {
  id: string;
  number: number;
  code: string;
  name: string;
  shortTitle: string;
  unit: string;
  satuan: string;
  target: number;
  targetDisplay: string;
  realisasi: number;
  realisasiDisplay: string;
  achievement: number; // %
  capaianPersen: number;
  status: 'exceeded' | 'achieved' | 'warning' | 'critical';
  predikat: string;
  baseline2024: string;
  yoyGrowth: string;
  pjSatker: string;
  pjSatkerCode: string;
  unitId: string;
  unitKerja: string;
  formula: string;
  sumberData: string;
  deskripsi: string;
  kegiatanAnggaranPengampu: string;
  alokasiAnggaran: string;
  quarterlyBreakdown: {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    target: number;
    realisasi: number;
    pma?: number;
    pmdn?: number;
    achievement: number;
  }[];
  keyHighlights: string[];
}

export const PERKIN_A4_KPIS: PerkinA4Kpi[] = [
  {
    id: 'ikp-1-investasi-kpbpb',
    number: 1,
    code: 'IKP-1',
    name: 'Meningkatnya kualitas Pelayanan Penanaman Modal di KPBPB Batam',
    shortTitle: 'Pelayanan Penanaman Modal KPBPB',
    unit: 'Triliun Rupiah (Rp T)',
    satuan: 'Triliun Rupiah',
    target: 60.00,
    targetDisplay: 'Rp 60,00 T',
    realisasi: 63.85,
    realisasiDisplay: 'Rp 63,85 T',
    achievement: 106.42,
    capaianPersen: 106.42,
    status: 'exceeded',
    predikat: 'Melampaui Target',
    baseline2024: 'Rp 54,20 T',
    yoyGrowth: '+17.80% (YoY)',
    pjSatker: 'Direktorat Promosi dan Fasilitasi Investasi',
    pjSatkerCode: 'DPFI',
    unitId: 'dit-investasi',
    unitKerja: 'Direktorat Promosi dan Fasilitasi Investasi',
    formula: 'Realisasi Investasi Tahun 2025 = Modal Tetap + Modal Lancar = (Impor Barang Modal + Margin Distribusi + Jasa Pemasangan + Biaya lain-lain) + Modal Lancar',
    sumberData: 'KPU Bea Cukai Batam, BPS Batam, Dit. Promosi dan Fasilitasi Investasi & Dit. Perencanaan dan Pengembangan Investasi',
    deskripsi: 'Nilai realisasi investasi di KPBPB Batam yang merupakan total nilai investasi yang masuk ke KPBPB Batam berupa Modal Tetap dan Modal Lancar dari Penanaman Modal Asing (PMA) dan Penanaman Modal Dalam Negeri (PMDN) dalam periode satu tahun dibandingkan dengan target yang ditetapkan.',
    kegiatanAnggaranPengampu: 'Layanan Pengawalan Kepatuhan Perizinan Penanaman Modal',
    alokasiAnggaran: 'Rp 892.334.000,- (Sesuai Lampiran I Perkin 2025)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 13.50, realisasi: 14.25, pma: 10.65, pmdn: 3.60, achievement: 105.56 },
      { quarter: 'Q2', target: 14.50, realisasi: 15.40, pma: 11.50, pmdn: 3.90, achievement: 106.21 },
      { quarter: 'Q3', target: 15.50, realisasi: 16.60, pma: 12.45, pmdn: 4.15, achievement: 107.10 },
      { quarter: 'Q4', target: 16.50, realisasi: 17.60, pma: 13.10, pmdn: 4.50, achievement: 106.67 },
    ],
    keyHighlights: [
      'PMA menyumbang 74,7% (Rp 47,70 T) didominasi investasi Singapura, RRT, dan AS',
      'PMDN menyumbang 25,3% (Rp 16,15 T) pada sektor maritim, logistik, industri manufaktur & data center',
      'Komponen Modal Tetap tercatat Rp 46,65 T dan Modal Lancar tercatat Rp 17,20 T',
    ],
  },
  {
    id: 'ikp-2-promosi-investasi',
    number: 2,
    code: 'IKP-2',
    name: 'Terlaksananya kegiatan promosi dalam maupun luar negeri',
    shortTitle: 'Kegiatan Promosi Dalam & Luar Negeri',
    unit: 'Minat Investasi (Leads)',
    satuan: 'Minat (Leads)',
    target: 200,
    targetDisplay: '200 Minat',
    realisasi: 218,
    realisasiDisplay: '218 Minat',
    achievement: 109.00,
    capaianPersen: 109.00,
    status: 'exceeded',
    predikat: 'Melampaui Target',
    baseline2024: '185 Minat',
    yoyGrowth: '+17.84% (YoY)',
    pjSatker: 'Direktorat Promosi dan Fasilitasi Investasi',
    pjSatkerCode: 'DPFI',
    unitId: 'dit-investasi',
    unitKerja: 'Direktorat Promosi dan Fasilitasi Investasi',
    formula: '∑ (Jumlah minat investasi terdokumentasi yang berasal dari kegiatan promosi dalam dan luar negeri)',
    sumberData: 'Direktorat Promosi dan Fasilitasi Investasi (Log Promosi, Pameran, Business Matching & Portal)',
    deskripsi: 'Untuk mengukur jumlah minat investasi (Investment Interest) yang dinyatakan secara eksplisit oleh calon investor baik secara lisan maupun tertulis, sebagai hasil dari kegiatan promosi aktif seperti pameran, forum bisnis, one-on-one meeting, site visit, business matching, atau kunjungan langsung investor ke BP Batam.',
    kegiatanAnggaranPengampu: 'Promosi KPBPB Batam',
    alokasiAnggaran: 'Rp 8.783.680.000,- (Sesuai Lampiran I Perkin 2025)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 45, realisasi: 48, achievement: 106.67 },
      { quarter: 'Q2', target: 50, realisasi: 55, achievement: 110.00 },
      { quarter: 'Q3', target: 50, realisasi: 57, achievement: 114.00 },
      { quarter: 'Q4', target: 55, realisasi: 58, achievement: 105.45 },
    ],
    keyHighlights: [
      'Total 218 minat investasi eksplisit terhimpun dari 97 agenda kegiatan promosi aktif',
      'Forum bisnis, pameran internasional, dan one-on-one meeting melibatkan 5.520 delegasi/tamu',
      'Minat dominan pada semikonduktor, data center hyperscale, energi hijau, dan industri maritim',
    ],
  },
  {
    id: 'ikp-3-kajian-kek',
    number: 3,
    code: 'IKP-3',
    name: 'Persentase kajian pengembangan, kerja sama di KPBPBB, daya saing, sumber daya strategis, dan pengembangan KEK yang berkelanjutan',
    shortTitle: 'Kajian Pengembangan, Kerja Sama & KEK Berkelanjutan',
    unit: 'Persen (%)',
    satuan: '%',
    target: 100,
    targetDisplay: '100%',
    realisasi: 100,
    realisasiDisplay: '100%',
    achievement: 100.00,
    capaianPersen: 100.00,
    status: 'achieved',
    predikat: 'Tercapai 100%',
    baseline2024: '100%',
    yoyGrowth: 'Optimal Konsisten',
    pjSatker: 'Direktorat Perencanaan dan Pengembangan Investasi',
    pjSatkerCode: 'DPPI',
    unitId: 'dit-pengembangan-kek',
    unitKerja: 'Direktorat Perencanaan dan Pengembangan Investasi',
    formula: 'Capaian = (Jumlah Analisis Ditindaklanjuti / Jumlah Dokumen Analisis) × 100%',
    sumberData: 'Direktorat Perencanaan dan Pengembangan Investasi',
    deskripsi: 'Persentase rekomendasi kebijakan pengembangan, kerja sama usaha di KPBPB dan daya saing, sumber daya strategis, serta pengembangan KEK yang ditindaklanjuti.',
    kegiatanAnggaranPengampu: 'Penyusunan Perencanaan dan Pengembangan Usaha Kawasan',
    alokasiAnggaran: 'Rp 7.333.727.000,- (Sesuai Lampiran I Perkin 2025)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 100, realisasi: 100, achievement: 100.00 },
      { quarter: 'Q2', target: 100, realisasi: 100, achievement: 100.00 },
      { quarter: 'Q3', target: 100, realisasi: 100, achievement: 100.00 },
      { quarter: 'Q4', target: 100, realisasi: 100, achievement: 100.00 },
    ],
    keyHighlights: [
      '20 dari 20 dokumen analisis kajian strategis berhasil diselesaikan dan 100% ditindaklanjuti',
      'Mencakup 4 pilar: hilirisasi kawasan, kemitraan strategis, daya saing, dan pengembangan KEK hijau',
      'Mendukung operasional KEK Nongsa Digital Park, KEK Batam Aero Technic, & KEK Pariwisata Kesehatan',
    ],
  },
  {
    id: 'ikp-4-pengendalian-pengusahaan',
    number: 4,
    code: 'IKP-4',
    name: 'Persentase pelaksanaan pengendalian pengusahaan dan kerja sama Badan Usaha di BP Batam',
    shortTitle: 'Pengendalian Pengusahaan & Kerja Sama BU',
    unit: 'Persen (%)',
    satuan: '%',
    target: 100,
    targetDisplay: '100%',
    realisasi: 95.45,
    realisasiDisplay: '95,45%',
    achievement: 95.45,
    capaianPersen: 95.45,
    status: 'exceeded',
    predikat: 'Kepatuhan Sangat Tinggi',
    baseline2024: '88.50%',
    yoyGrowth: '+6.95 poin',
    pjSatker: 'Direktorat Pengendalian Pengusahaan',
    pjSatkerCode: 'DPPU',
    unitId: 'dit-pengendalian-usaha',
    unitKerja: 'Direktorat Pengendalian Pengusahaan',
    formula: 'Persentase Tindak Lanjut = (Jumlah Rekomendasi Yang Ditindaklanjuti / Total Rekomendasi Yang Diberikan) × 100%',
    sumberData: 'Direktorat Pengendalian Pengusahaan',
    deskripsi: 'Mengukur seberapa banyak rekomendasi hasil pengendalian dan pembinaan Badan Usaha serta kerja sama Badan Usaha telah diterima untuk ditindaklanjuti oleh badan usaha dalam periode tertentu.',
    kegiatanAnggaranPengampu: 'Penyusunan Evaluasi dan Pengendalian Badan Usaha BP Batam',
    alokasiAnggaran: 'Rp 1.003.290.000,- (Sesuai Lampiran I Perkin 2025)',
    quarterlyBreakdown: [
      { quarter: 'Q1', target: 90.00, realisasi: 92.50, achievement: 102.78 },
      { quarter: 'Q2', target: 95.00, realisasi: 94.20, achievement: 99.16 },
      { quarter: 'Q3', target: 98.00, realisasi: 95.80, achievement: 97.76 },
      { quarter: 'Q4', target: 100.00, realisasi: 95.45, achievement: 95.45 },
    ],
    keyHighlights: [
      '105 dari 110 rekomendasi pengendalian dan pembinaan telah tuntas ditindaklanjuti mitra badan usaha',
      'Mencakup pengawasan kepatuhan 28 dokumen PKS kerja sama operasional dan kemitraan konsesi',
      'Peningkatan tertib administrasi, bagi hasil (revenue share), dan utilisasi fasilitas pengusahaan BP Batam',
    ],
  },
];

// ============================================================================
// DATASET EVALUASI 4 INDIKATOR KINERJA PROGRAM (PERKIN A.4 TAHUN 2025)
// ============================================================================

// 1. DATA IKP-1: Realisasi Investasi Modal Tetap & Modal Lancar (PMA vs PMDN)
export interface Ikp1InvestasiItem {
  no: number;
  komponen: string;
  kategori: 'PMA' | 'PMDN';
  jenisModal: 'Modal Tetap' | 'Modal Lancar';
  deskripsi: string;
  realisasiRpTriliun: number;
  kontribusiPersen: number;
}

export const IKP1_INVESTASI_KOMPONEN_DATA: Ikp1InvestasiItem[] = [
  {
    no: 1,
    komponen: 'Modal Tetap - Penanaman Modal Asing (PMA)',
    kategori: 'PMA',
    jenisModal: 'Modal Tetap',
    deskripsi: 'Impor barang modal, mesin produksi, peralatan pabrik, dan instalasi industri (KPU Bea Cukai)',
    realisasiRpTriliun: 35.40,
    kontribusiPersen: 55.44,
  },
  {
    no: 2,
    komponen: 'Modal Lancar - Penanaman Modal Asing (PMA)',
    kategori: 'PMA',
    jenisModal: 'Modal Lancar',
    deskripsi: 'Bahan baku impor, biaya operasional fasilitas, dan perputaran modal usaha asing (BPS)',
    realisasiRpTriliun: 12.30,
    kontribusiPersen: 19.26,
  },
  {
    no: 3,
    komponen: 'Modal Tetap - Penanaman Modal Dalam Negeri (PMDN)',
    kategori: 'PMDN',
    jenisModal: 'Modal Tetap',
    deskripsi: 'Pembangunan gedung pabrik, konstruksi fasilitas, mesin domestik & perluasan properti bisnis',
    realisasiRpTriliun: 11.25,
    kontribusiPersen: 17.62,
  },
  {
    no: 4,
    komponen: 'Modal Lancar - Penanaman Modal Dalam Negeri (PMDN)',
    kategori: 'PMDN',
    jenisModal: 'Modal Lancar',
    deskripsi: 'Biaya operasional harian, persediaan material lokal, dan modal kerja badan usaha nasional',
    realisasiRpTriliun: 4.90,
    kontribusiPersen: 7.68,
  },
];

// 2. DATA IKP-2: Kegiatan Promosi Dalam & Luar Negeri (Format Model IPPN)
export interface Ikp2PromosiKegiatanItem {
  no: number;
  jenisKegiatan: string;
  jumlahPelaksanaan: number; // Frekuensi kegiatan
  jumlahTamu: number; // Delegasi / tamu / calon investor hadir
  minatInvestasiLeads: number; // Leads peminatan terdokumentasi
  persentaseLeads: number;
}

export const IKP2_PROMOSI_KEGIATAN_DATA: Ikp2PromosiKegiatanItem[] = [
  {
    no: 1,
    jenisKegiatan: 'Forum Bisnis & Investment Gathering',
    jumlahPelaksanaan: 12,
    jumlahTamu: 1480,
    minatInvestasiLeads: 68,
    persentaseLeads: 31.19,
  },
  {
    no: 2,
    jenisKegiatan: 'Pameran & Expo Investasi (Nasional & Global)',
    jumlahPelaksanaan: 8,
    jumlahTamu: 3250,
    minatInvestasiLeads: 54,
    persentaseLeads: 24.77,
  },
  {
    no: 3,
    jenisKegiatan: 'One-on-One Meeting & Business Matching',
    jumlahPelaksanaan: 35,
    jumlahTamu: 210,
    minatInvestasiLeads: 46,
    persentaseLeads: 21.10,
  },
  {
    no: 4,
    jenisKegiatan: 'Site Visit Kawasan Industri & Kunjungan Tamu Resmi',
    jumlahPelaksanaan: 42,
    jumlahTamu: 580,
    minatInvestasiLeads: 50,
    persentaseLeads: 22.94,
  },
];

// 3. DATA IKP-3: Kajian Strategis Berdasarkan 4 Pilar Utama (Format Model IPPN)
export interface Ikp3KajianPilarItem {
  no: number;
  pilarUtama: string;
  fokusKajian: string;
  jumlahDokumen: number; // Jumlah Dokumen Analisis
  jumlahDitindaklanjuti: number; // Jumlah Analisis Ditindaklanjuti
  capaianPersen: number; // (Ditindaklanjuti / Jumlah) * 100%
}

export const IKP3_KAJIAN_PILAR_DATA: Ikp3KajianPilarItem[] = [
  {
    no: 1,
    pilarUtama: 'Pilar 1: Kajian Pengembangan Usaha Kawasan & Hilirisasi',
    fokusKajian: 'Studi kelayakan industri semi-konduktor & hilirisasi material kritis KPBPBB',
    jumlahDokumen: 6,
    jumlahDitindaklanjuti: 6,
    capaianPersen: 100,
  },
  {
    no: 2,
    pilarUtama: 'Pilar 2: Kerja Sama Kawasan KPBPBB & Kemitraan Strategis',
    fokusKajian: 'Kerangka kerja sama transisi energi hijau & logistik maritim antar-kawasan',
    jumlahDokumen: 5,
    jumlahDitindaklanjuti: 5,
    capaianPersen: 100,
  },
  {
    no: 3,
    pilarUtama: 'Pilar 3: Peningkatan Daya Saing & Sumber Daya Strategis',
    fokusKajian: 'Kesiapan talenta digital, ketersediaan energi bersih & pasokan air industri',
    jumlahDokumen: 4,
    jumlahDitindaklanjuti: 4,
    capaianPersen: 100,
  },
  {
    no: 4,
    pilarUtama: 'Pilar 4: Pengembangan KEK Berkelanjutan & Ekosistem Hijau',
    fokusKajian: 'Akselerasi KEK Nongsa Digital, KEK BAT Aero & KEK Pariwisata Kesehatan',
    jumlahDokumen: 5,
    jumlahDitindaklanjuti: 5,
    capaianPersen: 100,
  },
];

// 4. DATA IKP-4: Pelaksanaan Pengendalian Pengusahaan & Kerja Sama Badan Usaha
// Sesuai Formula Screenshot: Persentase Tindak Lanjut = (Jumlah Rekomendasi Yang Ditindaklanjuti / Total Rekomendasi Yang Diberikan) × 100%
export interface Ikp4PengendalianBuItem {
  no: number;
  bidangPengendalian: string;
  fokusPembinaan: string;
  totalRekomendasiDiberikan: number; // Pembagi
  rekomendasiDitindaklanjuti: number; // Pembilang
  persentaseTindakLanjut: number; // %
}

export const IKP4_PENGENDALIAN_BU_DATA: Ikp4PengendalianBuItem[] = [
  {
    no: 1,
    bidangPengendalian: 'Pengendalian Operasional & Pembinaan Badan Usaha',
    fokusPembinaan: 'Audit operasional fasilitas dermaga, pergudangan, dan utilitas industri',
    totalRekomendasiDiberikan: 32,
    rekomendasiDitindaklanjuti: 31,
    persentaseTindakLanjut: 96.88,
  },
  {
    no: 2,
    bidangPengendalian: 'Kepatuhan Perjanjian Kerja Sama (PKS) & Kemitraan',
    fokusPembinaan: 'Evaluasi klausul konsesi, pemenuhan investasi mitra, dan legalitas kontrak',
    totalRekomendasiDiberikan: 28,
    rekomendasiDitindaklanjuti: 27,
    persentaseTindakLanjut: 96.43,
  },
  {
    no: 3,
    bidangPengendalian: 'Evaluasi Kinerja Finansial & Penerimaan PNBP Pengusahaan',
    fokusPembinaan: 'Penyesuaian bagi hasil (revenue share), ketertiban tarif jasa, dan piutang',
    totalRekomendasiDiberikan: 24,
    rekomendasiDitindaklanjuti: 22,
    persentaseTindakLanjut: 91.67,
  },
  {
    no: 4,
    bidangPengendalian: 'Pengendalian Pemanfaatan Fasilitas & Aset Pengusahaan',
    fokusPembinaan: 'Optimalisasi aset bersama mitra, pemeliharaan sarana, dan tata kelola ruang',
    totalRekomendasiDiberikan: 26,
    rekomendasiDitindaklanjuti: 25,
    persentaseTindakLanjut: 96.15,
  },
];

// ============================================================================
// 4 SATKER DI LINGKUNGAN DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN
// ============================================================================

export interface SatkerInvestasiPengusahaan {
  id: string;
  code: string;
  name: string;
  shortName: string;
  pimpinan: string;
  datasetsCount: number;
  pdfPages: string;
  description: string;
  paguAnggaran: number;
  realisasiAnggaran: number;
  serapanPersen: number;
  keyStats: { label: string; value: string; note?: string }[];
  pillars: {
    title: string;
    badge: string;
    metrics: { label: string; value: string; color?: string }[];
  }[];
}

export const SATKER_INVESTASI_PENGUSAHAAN_DATA: SatkerInvestasiPengusahaan[] = [
  {
    id: 'dit-investasi',
    code: 'DPFI',
    name: 'Direktorat Promosi dan Fasilitasi Investasi',
    shortName: 'Dir. Promosi dan Fasilitasi Investasi',
    pimpinan: 'Direktur Promosi dan Fasilitasi Investasi',
    datasetsCount: 14,
    pdfPages: 'Halaman 46 - 48',
    description: 'Pusat fasilitasi penanaman modal PMA & PMDN, promosi investasi global, pendampingan investor (end-to-end investment assistance), pengelolaan portal invest in-batam, dan fasilitasi infrastruktur investasi.',
    paguAnggaran: 28450000000,
    realisasiAnggaran: 12180000000,
    serapanPersen: 42.81,
    keyStats: [
      { label: 'Realisasi PMA & PMDN', value: 'Rp 31,48 T', note: '110.5% Target Perkin' },
      { label: 'Investor Pipeline', value: '52 Proyek', note: 'Potensi Rp 18,75 T' },
      { label: 'Trafik Portal Investasi', value: '239.250 Hits', note: '+16.3% YoY' },
      { label: 'Pameran & Promosi', value: '14 Forum', note: 'Dalam & Luar Negeri' },
    ],
    pillars: [
      {
        title: 'Realisasi Investasi (Dataset #13)',
        badge: 'PMA & PMDN',
        metrics: [
          { label: 'Realisasi PMA', value: 'Rp 23,24 T (73.8%)', color: 'text-blue-700' },
          { label: 'Realisasi PMDN', value: 'Rp 8,24 T (26.2%)', color: 'text-indigo-700' },
          { label: 'Proyek Terdaftar', value: '184 Proyek Usaha', color: 'text-slate-800' },
          { label: 'Tenaga Kerja', value: '21.840 Pekerja', color: 'text-emerald-700' },
        ],
      },
      {
        title: 'Intelligence Minat & Promosi (Dataset #10 & #14)',
        badge: 'Pipeline',
        metrics: [
          { label: 'Kunjungan Website', value: '239.250 Hits / Thn', color: 'text-blue-700' },
          { label: 'Negara Asal Terbanyak', value: 'Singapura (34%), AS (21%)', color: 'text-slate-800' },
          { label: 'Lead Pipeline', value: '52 Investor Riil', color: 'text-emerald-700' },
          { label: 'Sektor Peminatan', value: 'Data Center & EV Solar', color: 'text-purple-700' },
        ],
      },
      {
        title: 'Infrastruktur Siap Bangun (Dataset #6)',
        badge: 'Readiness',
        metrics: [
          { label: 'Paket Siap Ditawarkan', value: '8 Paket Proyek', color: 'text-cyan-700' },
          { label: 'Estimasi Investasi', value: 'Rp 14,80 Triliun', color: 'text-blue-800' },
          { label: 'Status Kesiapan (RC)', value: '88.5% Lengkap', color: 'text-emerald-700' },
          { label: 'Peluang Kemitraan', value: 'KPBU / Direct Deal', color: 'text-amber-700' },
        ],
      },
    ],
  },
  {
    id: 'dit-pengembangan-kek',
    code: 'DPPI',
    name: 'Direktorat Perencanaan dan Pengembangan Investasi',
    shortName: 'Dir. Perencanaan dan Pengembangan Investasi',
    pimpinan: 'Direktur Perencanaan dan Pengembangan Investasi',
    datasetsCount: 12,
    pdfPages: 'Halaman 9 - 11',
    description: 'Tata kelola dan akselerasi pengembangan Kawasan Ekonomi Khusus (Batam Aero Technic, Nongsa Digital Park, KEK Pariwisata & Kesehatan), pelayanan perizinan berusaha administrator KEK, dan kajian perkin strategis.',
    paguAnggaran: 24100000000,
    realisasiAnggaran: 9840000000,
    serapanPersen: 40.83,
    keyStats: [
      { label: 'Realisasi KEK', value: 'Rp 9,09 T', note: '106.9% Target Perkin' },
      { label: 'Pelaku Usaha KEK', value: '48 Perusahaan', note: 'BUPP & Tenant' },
      { label: 'Perizinan Terbit', value: '142 Dokumen', note: 'OSS KEK Administrator' },
      { label: 'Kajian Perkin KEK', value: '91.7% Capaian', note: 'Rekomendasi Kebijakan' },
    ],
    pillars: [
      {
        title: 'Realisasi 3 KEK (Dataset #1, #2, #3)',
        badge: 'Kawasan',
        metrics: [
          { label: 'KEK Nongsa Digital', value: 'Rp 4,89 T (108.7%)', color: 'text-blue-700' },
          { label: 'KEK Batam Teknik (BAT)', value: 'Rp 3,12 T (111.4%)', color: 'text-emerald-700' },
          { label: 'KEK Pariwisata Kesehatan', value: 'Rp 1,08 T (90.0%)', color: 'text-purple-700' },
          { label: 'Tenaga Kerja KEK', value: '1.482 Ahli & Pekerja', color: 'text-slate-800' },
        ],
      },
      {
        title: 'Layanan Administrator KEK (Dataset #4 - #8)',
        badge: 'Perizinan',
        metrics: [
          { label: 'Perizinan Berusaha', value: '76 Izin Terbit', color: 'text-blue-700' },
          { label: 'Non-Perizinan Administrator', value: '42 Dokumen', color: 'text-cyan-700' },
          { label: 'Perizinan Lainnya', value: '24 Dokumen', color: 'text-indigo-700' },
          { label: 'SLA Administrator', value: '98.2% Tepat Waktu', color: 'text-emerald-700' },
        ],
      },
      {
        title: 'Kajian Strategis Perkin (Dataset #9 - #12)',
        badge: 'Kajian Kebijakan',
        metrics: [
          { label: 'Kajian Ditindaklanjuti', value: '11 dari 12 Judul', color: 'text-emerald-700' },
          { label: 'Fasilitas Fiskal KEK', value: 'Tax Holiday & VAT', color: 'text-blue-800' },
          { label: 'Tingkat Kepatuhan BUPP', value: '94.2% Tertib', color: 'text-slate-800' },
          { label: 'Rencana Perluasan KEK', value: 'Sekupang & Rempang', color: 'text-amber-700' },
        ],
      },
    ],
  },
  {
    id: 'dit-pengendalian-usaha',
    code: 'DPPU',
    name: 'Direktorat Pengendalian Pengusahaan',
    shortName: 'Dir. Pengendalian Pengusahaan',
    pimpinan: 'Direktur Pengendalian Pengusahaan',
    datasetsCount: 4,
    pdfPages: 'Halaman 14',
    description: 'Pengawasan tata kelola kemitraan badan usaha, evaluasi perjanjian kerjasama pengusahaan (KSO, BTO, BOT, Konsesi), pemantauan kewajiban bagi hasil, kepatuhan klausul kontrak, dan amandemen PKS.',
    paguAnggaran: 18650500000,
    realisasiAnggaran: 7420000000,
    serapanPersen: 39.78,
    keyStats: [
      { label: 'Tindak Lanjut Evaluasi', value: '94,60%', note: 'Dataset #3' },
      { label: 'Tindak Lanjut Perbaikan', value: '91,80%', note: 'Dataset #4' },
      { label: 'Rekomendasi Terbit', value: '48 Butir', note: 'Dataset #1' },
      { label: 'Laporan Pengawasan', value: '12 Dokumen', note: 'Dataset #2' },
    ],
    pillars: [
      {
        title: 'Evaluasi & Rekomendasi (Dataset #1 & #3)',
        badge: 'Pengawasan',
        metrics: [
          { label: 'Total Rekomendasi Terbit', value: '48 Rekomendasi', color: 'text-blue-700' },
          { label: 'Tuntas Ditindaklanjuti', value: '45 Rekomendasi (94.6%)', color: 'text-emerald-700' },
          { label: 'Proses Penyelesaian', value: '3 Rekomendasi', color: 'text-amber-700' },
          { label: 'Tingkat Efektivitas', value: 'Sangat Baik (A)', color: 'text-purple-700' },
        ],
      },
      {
        title: 'Perbaikan & Perubahan PKS (Dataset #4)',
        badge: 'Kemitraan',
        metrics: [
          { label: 'PKS Selesai Amandemen', value: '16 Perjanjian', color: 'text-blue-700' },
          { label: 'Tingkat Kepatuhan Mitra', value: '91.8% Terpenuhi', color: 'text-emerald-700' },
          { label: 'Penertiban Bagi Hasil', value: 'Rp 142,5 Miliar', color: 'text-slate-800' },
          { label: 'Mitra Badan Usaha', value: '28 Mitra Swasta/BUMN', color: 'text-indigo-700' },
        ],
      },
      {
        title: 'Laporan Pengendalian Usaha (Dataset #2)',
        badge: 'Pelaporan',
        metrics: [
          { label: 'Laporan Rutin Terbit', value: '12 Laporan Bulanan', color: 'text-slate-800' },
          { label: 'Objek Pengawasan', value: 'Terminal, RS, Wisata, SPAM', color: 'text-blue-800' },
          { label: 'Tingkat Risiko Kerjasama', value: 'Rendah - Terkendali', color: 'text-emerald-700' },
          { label: 'Audit Kepatuhan BPKP', value: 'Sesuai Ketentuan', color: 'text-cyan-700' },
        ],
      },
    ],
  },
  {
    id: 'dit-lalu-lintas-barang',
    code: 'DLLB',
    name: 'Direktorat Lalu Lintas Barang dan Penanaman Modal',
    shortName: 'Lalu Lintas Barang',
    pimpinan: 'Direktur Lalu Lintas Barang',
    datasetsCount: 9,
    pdfPages: 'Halaman 8 - 9',
    description: 'Pusat pelayanan perizinan lalu lintas barang ekspor-impor industri dan perdagangan, izin usaha kawasan (IUK), izin pemasukan (inbound) & pengeluaran (outbound) barang modal investasi, serta pengawasan kuota.',
    paguAnggaran: 17220000000,
    realisasiAnggaran: 5680400000,
    serapanPersen: 32.99,
    keyStats: [
      { label: 'Izin LLB Terbit', value: '1.842 SK', note: 'Dataset #3' },
      { label: 'Izin Usaha Kawasan', value: '265 SK', note: 'Dataset #4' },
      { label: 'SLA Layanan Industri', value: '96,7% (3,3 Jam)', note: 'Dataset #9' },
      { label: 'SLA Perdagangan', value: '96,0% (3,9 Jam)', note: 'Dataset #8' },
    ],
    pillars: [
      {
        title: 'Perizinan Industri & Dagang (Dataset #3 & #4)',
        badge: 'Perizinan LLB',
        metrics: [
          { label: 'Izin Sektor Industri', value: '1.365 SK Terbit', color: 'text-blue-700' },
          { label: 'Izin Sektor Perdagangan', value: '477 SK Terbit', color: 'text-indigo-700' },
          { label: 'Izin Usaha Kawasan (IUK)', value: '265 SK Bulanan', color: 'text-emerald-700' },
          { label: 'Perusahaan Terdaftar', value: '34 KBLI Kawasan', color: 'text-slate-800' },
        ],
      },
      {
        title: 'Arus Barang Investasi (Dataset #6 & #7)',
        badge: 'Arus Barang',
        metrics: [
          { label: 'Izin Inbound (Pemasukan)', value: '1.522 SK Terbit', color: 'text-blue-700' },
          { label: 'Izin Outbound (Pengeluaran)', value: '835 SK Terbit', color: 'text-purple-700' },
          { label: 'Barang Modal Investasi', value: 'US$ 940 Juta Nilai CIF', color: 'text-slate-800' },
          { label: 'Fasilitas Pembebasan BM', value: '100% KPBPB Batam', color: 'text-emerald-700' },
        ],
      },
      {
        title: 'Kinerja SLA Layanan (Dataset #8 & #9)',
        badge: 'SLA Kecepatan',
        metrics: [
          { label: 'SLA Industri (< 4 Jam)', value: '96.7% (Rata-rata 3.3 Jam)', color: 'text-emerald-700' },
          { label: 'SLA Perdagangan (< 5 Jam)', value: '96.0% (Rata-rata 3.9 Jam)', color: 'text-cyan-700' },
          { label: 'Kepuasan Pemohon Izin', value: 'Skor 88.4 / 100', color: 'text-blue-800' },
          { label: 'Sistem Integrasi', value: 'Batam Logistics Ecosystem (BLE)', color: 'text-indigo-700' },
        ],
      },
    ],
  },
];

// ============================================================================
// DATA DETAIL VISUALISASI INVESTASI KPBPB (SEKTOR, NEGARA, DAN PIPELINE)
// ============================================================================

export interface SektorInvestasiItem {
  sektor: string;
  pma: number; // Miliar Rupiah
  pmdn: number; // Miliar Rupiah
  total: number;
  sharePersen: number;
  proyekCount: number;
  nakerCount: number;
  trend: 'up' | 'stable' | 'down';
  color: string;
}

export const SEKTOR_INVESTASI_DATA: SektorInvestasiItem[] = [
  {
    sektor: 'Pusat Data & Infrastruktur Digital',
    pma: 8240,
    pmdn: 650,
    total: 8890,
    sharePersen: 28.24,
    proyekCount: 14,
    nakerCount: 2450,
    trend: 'up',
    color: '#3B82F6', // Blue
  },
  {
    sektor: 'Industri Semikonduktor & Elektronik',
    pma: 6850,
    pmdn: 420,
    total: 7270,
    sharePersen: 23.09,
    proyekCount: 32,
    nakerCount: 7850,
    trend: 'up',
    color: '#06B6D4', // Cyan
  },
  {
    sektor: 'Galangan Kapal & Offshore Maritim',
    pma: 2150,
    pmdn: 2890,
    total: 5040,
    sharePersen: 16.01,
    proyekCount: 28,
    nakerCount: 5200,
    trend: 'up',
    color: '#10B981', // Emerald
  },
  {
    sektor: 'Energi Terbarukan & Solar PV Module',
    pma: 2650,
    pmdn: 740,
    total: 3390,
    sharePersen: 10.77,
    proyekCount: 12,
    nakerCount: 1980,
    trend: 'up',
    color: '#F59E0B', // Amber
  },
  {
    sektor: 'Aviasi MRO & Komponen Pesawat',
    pma: 1820,
    pmdn: 980,
    total: 2800,
    sharePersen: 8.89,
    proyekCount: 18,
    nakerCount: 1620,
    trend: 'stable',
    color: '#8B5CF6', // Purple
  },
  {
    sektor: 'Logistik, Pelabuhan & Cold Chain',
    pma: 850,
    pmdn: 1420,
    total: 2270,
    sharePersen: 7.21,
    proyekCount: 42,
    nakerCount: 1440,
    trend: 'up',
    color: '#EC4899', // Pink
  },
  {
    sektor: 'Pariwisata Kesehatan & Hospitaliti',
    pma: 680,
    pmdn: 1140,
    total: 1820,
    sharePersen: 5.79,
    proyekCount: 38,
    nakerCount: 1300,
    trend: 'up',
    color: '#6366F1', // Indigo
  },
];

export interface NegaraInvestorItem {
  negara: string;
  bendera: string;
  realisasiMiliar: number;
  sharePersen: number;
  proyekCount: number;
  sektorUtama: string;
}

export const NEGARA_INVESTOR_DATA: NegaraInvestorItem[] = [
  { negara: 'Singapura', bendera: '🇸🇬', realisasiMiliar: 10450, sharePersen: 33.20, proyekCount: 68, sektorUtama: 'Data Center, Logistik & Manufaktur' },
  { negara: 'Indonesia (PMDN)', bendera: '🇮🇩', realisasiMiliar: 8240, sharePersen: 26.17, proyekCount: 46, sektorUtama: 'Galangan Kapal, Kawasan Industri, Hotel' },
  { negara: 'Tiongkok & HK', bendera: '🇨🇳', realisasiMiliar: 4120, sharePersen: 13.09, proyekCount: 24, sektorUtama: 'Solar PV, Semikonduktor, Logistik' },
  { negara: 'Amerika Serikat', bendera: '🇺🇸', realisasiMiliar: 3480, sharePersen: 11.05, proyekCount: 12, sektorUtama: 'Hyperscale Cloud & Precision Component' },
  { negara: 'Jepang', bendera: '🇯🇵', realisasiMiliar: 2150, sharePersen: 6.83, proyekCount: 16, sektorUtama: 'Otomotif EV Wire & Elektronik Presisi' },
  { negara: 'Korea Selatan', bendera: '🇰🇷', realisasiMiliar: 1460, sharePersen: 4.64, proyekCount: 8, sektorUtama: 'Baterai & Renewable Solar Energy' },
  { negara: 'Taiwan', bendera: '🇹🇼', realisasiMiliar: 980, sharePersen: 3.11, proyekCount: 6, sektorUtama: 'Komponen IC & Fabrikasi Mikro' },
  { negara: 'Lainnya (Eropa & ASEAN)', bendera: '🌍', realisasiMiliar: 600, sharePersen: 1.91, proyekCount: 4, sektorUtama: 'Pariwisata & MRO Aviasi' },
];

export interface InvestorPipelineStage {
  stageId: number;
  stageName: string;
  stageTitle: string;
  investorCount: number;
  nilaiEstimasiTriliun: number;
  persenKonversi: number;
  icon: string;
  color: string;
  keterangan: string;
}

export const INVESTOR_PIPELINE_STAGES: InvestorPipelineStage[] = [
  {
    stageId: 1,
    stageName: 'Tahap 1: Minat Awal / Inquiry',
    stageTitle: 'Inquiry & Konsultasi Minat',
    investorCount: 142,
    nilaiEstimasiTriliun: 46.20,
    persenKonversi: 100,
    icon: 'MessageSquare',
    color: '#3B82F6',
    keterangan: 'Peminatan awal dari pameran luar negeri, portal invest in-batam, dan kedutaan besar.',
  },
  {
    stageId: 2,
    stageName: 'Tahap 2: Site Visit & Asistensi Lahan',
    stageTitle: 'Kunjungan Lapangan & Tapak',
    investorCount: 86,
    nilaiEstimasiTriliun: 32.80,
    persenKonversi: 60.56,
    icon: 'MapPin',
    color: '#06B6D4',
    keterangan: 'Kunjungan fisik ke Kawasan Industri, KEK, pelabuhan, ketersediaan energi & air.',
  },
  {
    stageId: 3,
    stageName: 'Tahap 3: Letter of Intent (LoI) / MoU',
    stageTitle: 'Komitmen Minat Resmi (IKP-4)',
    investorCount: 52,
    nilaiEstimasiTriliun: 18.75,
    persenKonversi: 36.62,
    icon: 'FileText',
    color: '#10B981',
    keterangan: 'Tercatat dalam capaian resmi IKP-4: 52 Proyek Minat Terfasilitasi (130% target perkin).',
  },
  {
    stageId: 4,
    stageName: 'Tahap 4: Perizinan OSS & Pematangan Lahan',
    stageTitle: 'Penerbitan Izin & Alokasi Lahan',
    investorCount: 34,
    nilaiEstimasiTriliun: 14.20,
    persenKonversi: 23.94,
    icon: 'CheckCircle2',
    color: '#8B5CF6',
    keterangan: 'Penerbitan NIB OSS RBA, perizinan amdal/PBG, dan pemenuhan komitmen BAPL.',
  },
  {
    stageId: 5,
    stageName: 'Tahap 5: Groundbreaking & Konstruksi',
    stageTitle: 'Realisasi Konstruksi Riil',
    investorCount: 24,
    nilaiEstimasiTriliun: 9.65,
    persenKonversi: 16.90,
    icon: 'HardHat',
    color: '#F59E0B',
    keterangan: 'Mulai pemancangan fisik pabrik/data center dan tercatat dalam realisasi modal tetap.',
  },
];

export interface InvestorPipelineItem {
  id: number;
  namaPerusahaan: string;
  asalNegara: string;
  bendera: string;
  sektor: string;
  lokasiTujuan: string;
  nilaiEstimasiMiliar: number;
  tahap: 'Inquiry' | 'Site Visit' | 'LoI Minat' | 'Perizinan' | 'Konstruksi';
  targetNaker: number;
  tanggalFasilitasi: string;
  statusKesiapan: 'Siap Lahan' | 'Menunggu Kajian PLN/Gas' | 'Penyusunan Amdal' | 'Izin Berusaha Terbit' | 'Groundbreaking';
}

export const INVESTOR_PIPELINE_TABLE: InvestorPipelineItem[] = [
  { id: 1, namaPerusahaan: 'Singtel Global Data Hub Batam', asalNegara: 'Singapura', bendera: '🇸🇬', sektor: 'Pusat Data Hyperscale', lokasiTujuan: 'KEK Nongsa Digital Park', nilaiEstimasiMiliar: 4200, tahap: 'Konstruksi', targetNaker: 450, tanggalFasilitasi: '12 Jan 2025', statusKesiapan: 'Groundbreaking' },
  { id: 2, namaPerusahaan: 'GDS Data System Fase 2', asalNegara: 'Tiongkok', bendera: '🇨🇳', sektor: 'AI Data Center', lokasiTujuan: 'KEK Nongsa Digital Park', nilaiEstimasiMiliar: 3600, tahap: 'Konstruksi', targetNaker: 380, tanggalFasilitasi: '24 Feb 2025', statusKesiapan: 'Groundbreaking' },
  { id: 3, namaPerusahaan: 'Apollo Hospitals & Mayapada Health', asalNegara: 'India & Indonesia', bendera: '🇮🇳', sektor: 'Pariwisata Kesehatan', lokasiTujuan: 'KEK Pariwisata & Kesehatan', nilaiEstimasiMiliar: 1850, tahap: 'Perizinan', targetNaker: 520, tanggalFasilitasi: '18 Mar 2025', statusKesiapan: 'Izin Berusaha Terbit' },
  { id: 4, namaPerusahaan: 'Lion Group Aviasi MRO Hanggar 6', asalNegara: 'Indonesia', bendera: '🇮🇩', sektor: 'Aviasi MRO', lokasiTujuan: 'KEK Batam Aero Technic', nilaiEstimasiMiliar: 1450, tahap: 'Konstruksi', targetNaker: 320, tanggalFasilitasi: '05 Apr 2025', statusKesiapan: 'Groundbreaking' },
  { id: 5, namaPerusahaan: 'Sunseap Solar Farm & BESS Energy', asalNegara: 'Singapura & Perancis', bendera: '🇸🇬', sektor: 'Energi PLTS Terapung', lokasiTujuan: 'Waduk Duriangkang', nilaiEstimasiMiliar: 2800, tahap: 'Perizinan', targetNaker: 650, tanggalFasilitasi: '14 Mei 2025', statusKesiapan: 'Menunggu Kajian PLN/Gas' },
  { id: 6, namaPerusahaan: 'Taiwan Micro Semiconductor Assembly', asalNegara: 'Taiwan', bendera: '🇹🇼', sektor: 'Komponen Semikonduktor', lokasiTujuan: 'Kawasan Industri Batamindo', nilaiEstimasiMiliar: 1200, tahap: 'LoI Minat', targetNaker: 850, tanggalFasilitasi: '02 Jun 2025', statusKesiapan: 'Siap Lahan' },
  { id: 7, namaPerusahaan: 'Sembcorp Green Hydrogen Logistics', asalNegara: 'Singapura', bendera: '🇸🇬', sektor: 'Energi Hijau & Logistik', lokasiTujuan: 'Kabil Integrated Industrial Estate', nilaiEstimasiMiliar: 2100, tahap: 'LoI Minat', targetNaker: 420, tanggalFasilitasi: '20 Jul 2025', statusKesiapan: 'Penyusunan Amdal' },
  { id: 8, namaPerusahaan: 'Batam Maritime Heavy Engineering', asalNegara: 'Indonesia & Jepang', bendera: '🇮🇩', sektor: 'Galangan Kapal Offshore', lokasiTujuan: 'Tanjung Uncang', nilaiEstimasiMiliar: 1550, tahap: 'Site Visit', targetNaker: 780, tanggalFasilitasi: '08 Agu 2025', statusKesiapan: 'Siap Lahan' },
];

export interface KerjasamaPengusahaanItem {
  id: number;
  namaMitra: string;
  jenisBadanUsaha: 'Swasta Nasional' | 'BUMN / BUMD' | 'Konsorsium Asing';
  bidangKerjasama: string;
  skemaKerjasama: 'KSO (Kerjasama Operasi)' | 'BTO (Build Transfer Operate)' | 'BOT (Build Operate Transfer)' | 'Konsesi Pengusahaan';
  nomorPks: string;
  periodeKerjasama: string;
  nilaiInvestasiMitra: number; // Miliar Rp
  kewajibanBagiHasil: string;
  statusKepatuhan: 'Sangat Patuh (A)' | 'Patuh Bersyarat (B)' | 'Perlu Perbaikan (C)';
  rekomendasiStatus: 'Selesai Ditindaklanjuti' | 'Dalam Proses Tindak Lanjut' | 'Evaluasi Amandemen';
  terakhirDievaluasi: string;
}

export const KERJASAMA_PENGUSAHAAN_DATA: KerjasamaPengusahaanItem[] = [
  {
    id: 1,
    namaMitra: 'PT Bandara Internasional Batam (BIB)',
    jenisBadanUsaha: 'Konsorsium Asing',
    bidangKerjasama: 'Pengembangan & Pengoperasian Bandara Hang Nadim',
    skemaKerjasama: 'Konsesi Pengusahaan',
    nomorPks: 'PKS/01/BIB/KA/2022',
    periodeKerjasama: '2022 - 2047 (25 Tahun)',
    nilaiInvestasiMitra: 6890,
    kewajibanBagiHasil: 'Royalti Konsesi Tahunan + Profit Sharing',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '15 Jan 2025',
  },
  {
    id: 2,
    namaMitra: 'PT Air Minum Batam (Konsorsium Moya)',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Operasional & Pemeliharaan SPAM Hulu-Hilir',
    skemaKerjasama: 'KSO (Kerjasama Operasi)',
    nomorPks: 'PKS/12/SPAM/KA/2023',
    periodeKerjasama: '2023 - 2038 (15 Tahun)',
    nilaiInvestasiMitra: 2150,
    kewajibanBagiHasil: 'Biaya Layanan m3 & Penurunan NRW',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '22 Feb 2025',
  },
  {
    id: 3,
    namaMitra: 'PT Terminal Petikemas Batu Ampar (Konsorsium Persero)',
    jenisBadanUsaha: 'BUMN / BUMD',
    bidangKerjasama: 'Modernisasi STS Crane & Dermaga Utara Batu Ampar',
    skemaKerjasama: 'KSO (Kerjasama Operasi)',
    nomorPks: 'PKS/08/BUP/KA/2023',
    periodeKerjasama: '2023 - 2043 (20 Tahun)',
    nilaiInvestasiMitra: 3400,
    kewajibanBagiHasil: 'Bagi Hasil Tarif Bongkar Muat TEUs',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '05 Mar 2025',
  },
  {
    id: 4,
    namaMitra: 'PT RSBP Health Specialist Diagnostic',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Pengoperasian MRI 3T & Fasilitas Kedokteran Nuklir',
    skemaKerjasama: 'KSO (Kerjasama Operasi)',
    nomorPks: 'PKS/04/RSBP/2021',
    periodeKerjasama: '2021 - 2031 (10 Tahun)',
    nilaiInvestasiMitra: 180,
    kewajibanBagiHasil: 'Fee Sharing Pasien 35:65',
    statusKepatuhan: 'Patuh Bersyarat (B)',
    rekomendasiStatus: 'Dalam Proses Tindak Lanjut',
    terakhirDievaluasi: '12 Apr 2025',
  },
  {
    id: 5,
    namaMitra: 'PT Batam Marina Tourism Resort Sekupang',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Pembangunan Hotel & Dermaga Kapal Pesiar Mini',
    skemaKerjasama: 'BOT (Build Operate Transfer)',
    nomorPks: 'PKS/19/LHN/KA/2018',
    periodeKerjasama: '2018 - 2048 (30 Tahun)',
    nilaiInvestasiMitra: 950,
    kewajibanBagiHasil: 'UWT Komersial + Revenue Share 8%',
    statusKepatuhan: 'Patuh Bersyarat (B)',
    rekomendasiStatus: 'Evaluasi Amandemen',
    terakhirDievaluasi: '19 Mei 2025',
  },
  {
    id: 6,
    namaMitra: 'PT Pengolahan Limbah Industri B3 KPLI',
    jenisBadanUsaha: 'Swasta Nasional',
    bidangKerjasama: 'Pengelolaan Insinerator & Landfill Limbah B3 Kabil',
    skemaKerjasama: 'BTO (Build Transfer Operate)',
    nomorPks: 'PKS/02/KPLI/2020',
    periodeKerjasama: '2020 - 2035 (15 Tahun)',
    nilaiInvestasiMitra: 420,
    kewajibanBagiHasil: 'Bagi Hasil Tonnage Pengolahan Limbah',
    statusKepatuhan: 'Sangat Patuh (A)',
    rekomendasiStatus: 'Selesai Ditindaklanjuti',
    terakhirDievaluasi: '28 Jun 2025',
  },
];
