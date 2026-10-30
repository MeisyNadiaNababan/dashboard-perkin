// Data Master & Metadata Resmi Perkin A.5 Tahun 2025
// Deputi Bidang Pengelolaan Bandara, Pelabuhan dan Lalu Lintas Barang BP Batam

export interface PerkinA5Kpi {
  id: string;
  number: number;
  code: string;
  name: string;
  programTarget: string;
  realization: string;
  numericTarget: number;
  numericRealization: number;
  achievement: number; // percentage
  unit: string;
  status: 'exceeded' | 'achieved' | 'on_track' | 'lagging';
  polarization: 'Maximize' | 'Minimize';
  consolidationPeriod: string;
  reportingPeriod: string;
  baseline2024: string;
  dataSource: string;
  responsibleUnit: string;
  legalBasis: string;
  operationalDefinition: string;
  formula: string;
  breakdown?: {
    entity: string;
    target: string;
    realization: string;
    percentage: number;
    sharePercent?: number;
  }[];
}

export const PERKIN_A5_METADATA = {
  nomorPerkin: '2 /IKA/ 3 /2025',
  tanggalPenetapan: '13 Maret 2025',
  tahunAnggaran: 2025,
  pihakPertama: {
    nama: 'Ruslan Aspan',
    jabatan: 'Anggota/Deputi Bidang Pengelolaan Bandara, Pelabuhan dan Lalu Lintas Barang',
  },
  pihakKedua: {
    nama: 'Amsakar Achmad',
    jabatan: 'Kepala Badan Pengusahaan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam',
  },
  sasaranProgram: 'Meningkatnya Kualitas Pengelolaan Kawasan Bandara, Kepelabuhanan, dan Lalu Lintas Barang',
  totalAnggaran: 59506094650, // Rp 59.506.094.650,-
  realisasiAnggaran: 23802437860, // 40.0% Serapan
  persentaseSerapanAnggaran: 40.0,
  rataRataCapaianIks: 107.94,
  kegiatan: [
    {
      id: 'keg-1',
      nomor: 1,
      nama: 'Pengelolaan dan Penyelenggaraan Kawasan Bandara',
      alokasiAnggaran: 11431766000, // Rp 11.431.766.000,-
      realisasiAnggaran: 4572706400,
      persentase: 40.0,
      unitPengampu: 'Badan Pengelolaan Kawasan Bandar Udara',
      pnbpTarget: 116320000000,
      pnbpRealisasi: 124500000000,
      pnbpShare: 22.0,
      ikmScore: 87.8,
    },
    {
      id: 'keg-2',
      nomor: 2,
      nama: 'Pengelolaan dan Penyelenggaraan Kepelabuhanan',
      alokasiAnggaran: 46293348000, // Rp 46.293.348.000,-
      realisasiAnggaran: 18517339200,
      persentase: 40.0,
      unitPengampu: 'Badan Pengelolaan dan Pengusahaan Kepelabuhanan',
      pnbpTarget: 401890000000,
      pnbpRealisasi: 438350000000,
      pnbpShare: 78.0,
      ikmScore: 88.2,
    },
    {
      id: 'keg-3',
      nomor: 3,
      nama: 'Penyelenggaraan Pelayanan Lalu Lintas Barang',
      alokasiAnggaran: 1780980650, // Rp 1.780.980.650,-
      realisasiAnggaran: 712392260,
      persentase: 40.0,
      unitPengampu: 'Direktorat Lalu Lintas Barang',
      pnbpTarget: 2200000000,
      pnbpRealisasi: 2480000000,
      pnbpShare: 100.0,
      ikmScore: 89.35,
    },
  ],
};

// 3 Point INDIKATOR KINERJA PROGRAM Sesuai Dokumen Resmi Perkin A.5 Tahun 2025
export const PERKIN_A5_KPIS: PerkinA5Kpi[] = [
  {
    id: 'ikp-1-ikm-gabungan',
    number: 1,
    code: 'IKP-1',
    name: 'Rata-rata IKM pengguna layanan Bandara, pelabuhan, dan lalu lintas barang',
    programTarget: '86,30',
    realization: '88,45',
    numericTarget: 86.3,
    numericRealization: 88.45,
    achievement: 102.49,
    unit: 'Indeks (Skala 1-100)',
    status: 'exceeded',
    polarization: 'Maximize',
    consolidationPeriod: 'Take Last Known (Akumulasi Jan s.d. Des)',
    reportingPeriod: 'Tahunan',
    baseline2024: '84,10 (Mutu B - Baik)',
    dataSource: 'Badan Pengelolaan Kawasan Bandar Udara, Badan Pengelolaan dan Pengusahaan Kepelabuhanan, Dit. Lalu Lintas Barang',
    responsibleUnit: '3 Satker: BP Kawasan Bandar Udara, BP dan Pengusahaan Kepelabuhanan, Dit. Lalu Lintas Barang',
    legalBasis: 'PermenPAN-RB No. 14 Tahun 2017 tentang Pedoman Penyusunan Survei Kepuasan Masyarakat Unit Penyelenggara Pelayanan Publik',
    operationalDefinition:
      'Indeks Kepuasan Masyarakat (IKM) terhadap Pelayanan Publik adalah hasil pengukuran dari kegiatan survei kepuasan masyarakat berupa angka dengan skala 1 sampai dengan 100. Angka selanjutnya mempedomani ketentuan dalam PermenPAN-RB No. 14/2017: 25,00-64,99 (D / Tidak Baik), 65,00-76,60 (C / Kurang Baik), 76,61-88,30 (B / Baik), dan 88,31-100,00 (A / Sangat Baik). Pelaksanaan survei bekerjasama dengan lembaga survei independen yang memiliki kredibilitas dan reputasi.',
    formula: 'IKM Gabungan = (IKM Bandara + IKM Pelabuhan + IKM Lalu Lintas Barang) / 3',
    breakdown: [
      {
        entity: 'Bandara Hang Nadim',
        target: '86,00',
        realization: '87,80',
        percentage: 102.09,
        sharePercent: 33.3,
      },
      {
        entity: 'Pelabuhan Batu Ampar & Penumpang',
        target: '86,30',
        realization: '88,20',
        percentage: 102.2,
        sharePercent: 33.3,
      },
      {
        entity: 'Pelayanan Lalu Lintas Barang',
        target: '86,50',
        realization: '89,35',
        percentage: 103.29,
        sharePercent: 33.3,
      },
    ],
  },
  {
    id: 'ikp-2-pnbp-bandara-pelabuhan',
    number: 2,
    code: 'IKP-2',
    name: 'Realisasi PNBP Kawasan Bandara dan Pelabuhan',
    programTarget: 'Rp 518,21 M',
    realization: 'Rp 562,85 M',
    numericTarget: 518.21,
    numericRealization: 562.85,
    achievement: 108.61,
    unit: 'Miliar Rupiah',
    status: 'exceeded',
    polarization: 'Maximize',
    consolidationPeriod: 'Take Last Known (Akumulasi Jan s.d. Des)',
    reportingPeriod: 'Triwulan',
    baseline2024: 'Rp 486,50 M',
    dataSource: '1. Badan Pengelolaan Kawasan Bandar Udara, 2. Badan Pengelolaan dan Pengusahaan Kepelabuhanan (Buku Satu Data BP Batam Hal 11 & 15)',
    responsibleUnit: 'Badan Pengelolaan Kawasan Bandar Udara & Badan Pengelolaan dan Pengusahaan Kepelabuhanan',
    legalBasis: 'PP No. 41 Tahun 2021 tentang Penyelenggaraan KPBPB, PMK Tarif BLU BP Batam & Perka BP Batam',
    operationalDefinition:
      'Realisasi PNBP merupakan pendapatan yang diperoleh sebagai imbalan atas layanan yang diberikan kepada masyarakat antara lain melalui pemanfaatan barang/jasa, pendapatan kerjasama pihak lain, sewa, jasa lembaga keuangan, dan pendapatan sah lainnya yang berhubungan langsung dengan pelayanan BLU (tidak termasuk pendapatan dari RM APBN). Persentase dihitung dari jumlah realisasi PNBP dibagi dengan target PNBP tahun 2025.',
    formula: 'Realisasi PNBP = (Jumlah Realisasi PNBP Bandara + Realisasi PNBP Pelabuhan) / Target PNBP (Rp 518,21 M) * 100%',
    breakdown: [
      {
        entity: 'Badan Pengelolaan Kawasan Bandar Udara',
        target: 'Rp 116,32 M',
        realization: 'Rp 124,50 M',
        percentage: 107.03,
        sharePercent: 22.0,
      },
      {
        entity: 'Badan Pengelolaan dan Pengusahaan Kepelabuhanan',
        target: 'Rp 401,89 M',
        realization: 'Rp 438,35 M',
        percentage: 109.07,
        sharePercent: 78.0,
      },
    ],
  },
  {
    id: 'ikp-3-pnbp-lalu-lintas-barang',
    number: 3,
    code: 'IKP-3',
    name: 'Realisasi PNBP Lalu Lintas Barang',
    programTarget: 'Rp 2,20 M',
    realization: 'Rp 2,48 M',
    numericTarget: 2.2,
    numericRealization: 2.48,
    achievement: 112.73,
    unit: 'Miliar Rupiah',
    status: 'exceeded',
    polarization: 'Maximize',
    consolidationPeriod: 'Take Last Known (Akumulasi Jan s.d. Des)',
    reportingPeriod: 'Triwulan',
    baseline2024: 'Rp 2,05 M',
    dataSource: 'Direktorat Lalu Lintas Barang (Buku Satu Data BP Batam Hal 8-9)',
    responsibleUnit: 'Direktorat Lalu Lintas Barang',
    legalBasis: 'PP No. 41 Tahun 2021 tentang KPBPB, Perka Penetapan Tarif Layanan Perizinan Industri & Perdagangan',
    operationalDefinition:
      'Realisasi PNBP merupakan pendapatan yang diperoleh dari layanan penerbitan izin usaha kawasan, izin pemasukan dan pengeluaran barang, verifikasi permohonan rekomendasi, serta jasa administrasi lalu lintas barang di wilayah KPBPB Batam.',
    formula: 'Realisasi PNBP Dit. LLB = (Jumlah Realisasi PNBP Dit. LLB / Target PNBP Dit. LLB (Rp 2,20 M)) * 100%',
    breakdown: [
      {
        entity: 'Direktorat Lalu Lintas Barang',
        target: 'Rp 2,20 M',
        realization: 'Rp 2,48 M',
        percentage: 112.73,
        sharePercent: 100.0,
      },
    ],
  },
];

// Profil & Matriks 3 Unit Kerja Pengampu
export interface SatkerPengampuA5 {
  id: string;
  name: string;
  shortName: string;
  paguBelanja: number;
  realisasiBelanja: number;
  serapanPersen: number;
  targetPnbp: number;
  realisasiPnbp: number;
  capaianPnbpPersen: number;
  ikmScore: number;
  ikmPredikat: string;
  utilizationRate: number;
  headOfUnit: string;
  datasetCount: number;
  pdfPages: string;
  operationalHighlights: { label: string; value: string; subtext?: string }[];
  strategicInsights: string;
}

export const SATKER_A5_LIST: SatkerPengampuA5[] = [
  {
    id: 'dit-bandara',
    name: 'Badan Pengelolaan Kawasan Bandar Udara',
    shortName: 'BP Kawasan Bandar Udara',
    paguBelanja: 11431766000,
    realisasiBelanja: 4572706400,
    serapanPersen: 40.0,
    targetPnbp: 116320000000,
    realisasiPnbp: 124500000000,
    capaianPnbpPersen: 107.03,
    ikmScore: 87.8,
    ikmPredikat: 'Mutu B (Baik)',
    utilizationRate: 79.1,
    headOfUnit: 'Kepala Badan Pengelolaan Kawasan Bandar Udara BP Batam',
    datasetCount: 12,
    pdfPages: 'Halaman 11 - 12 (12 Dataset)',
    operationalHighlights: [
      { label: 'Total Penumpang', value: '4.120.000 Pax', subtext: 'Arus Domestik & Internasional' },
      { label: 'Pergerakan Pesawat', value: '34.250 Flight', subtext: 'Airlines & General Aviation' },
      { label: 'Volume Kargo & Pos', value: '42.150 Ton', subtext: 'EMPU Terminal Kargo' },
      { label: 'Panjang Runway', value: '4.025 m x 45 m', subtext: 'Terpanjang di Indonesia' },
    ],
    strategicInsights:
      'Kinerja operasional Bandara Internasional Hang Nadim stabil dengan load factor rata-rata 78.5%. Penerimaan PJP2U dan PJP4U melampaui target berkat bertambahnya frekuensi rute domestik dan penerbangan internasional carter.',
  },
  {
    id: 'dit-pelabuhan',
    name: 'Badan Pengelolaan dan Pengusahaan Kepelabuhanan',
    shortName: 'BP & Pengusahaan Kepelabuhanan',
    paguBelanja: 46293348000,
    realisasiBelanja: 18517339200,
    serapanPersen: 40.0,
    targetPnbp: 401890000000,
    realisasiPnbp: 438350000000,
    capaianPnbpPersen: 109.07,
    ikmScore: 88.2,
    ikmPredikat: 'Mutu B/A (Sangat Baik)',
    utilizationRate: 86.4,
    headOfUnit: 'Kepala Badan Pengelolaan dan Pengusahaan Kepelabuhanan BP Batam',
    datasetCount: 25,
    pdfPages: 'Halaman 14 - 17 (25 Dataset)',
    operationalHighlights: [
      { label: 'Throughput Peti Kemas', value: '612.400 TEUs', subtext: 'Terminal Batu Ampar STS Crane' },
      { label: 'Kunjungan Kapal', value: '18.420 Call', subtext: 'Kapal Barang & Penumpang' },
      { label: 'Volume Curah Cair', value: '8,42 Juta Ton', subtext: 'Kabil, Batu Ampar & Sekupang' },
      { label: 'Total Penumpang Laut', value: '7.850.000 Pax', subtext: 'Ferry Domestik & Internasional' },
    ],
    strategicInsights:
      'Pelabuhan Batu Ampar mencatatkan rekor throughput berkat modernisasi STS (Ship-to-Shore) Container Crane elektrik dan implementasi B-Port OS, memangkas dwell time dari 4.2 hari menjadi 2.1 hari.',
  },
  {
    id: 'dit-lalu-lintas-barang',
    name: 'Direktorat Lalu Lintas Barang',
    shortName: 'Lalu Lintas Barang',
    paguBelanja: 1780980650,
    realisasiBelanja: 712392260,
    serapanPersen: 40.0,
    targetPnbp: 2200000000,
    realisasiPnbp: 2480000000,
    capaianPnbpPersen: 112.73,
    ikmScore: 89.35,
    ikmPredikat: 'Mutu A (Sangat Baik)',
    utilizationRate: 91.2,
    headOfUnit: 'Direktur Lalu Lintas Barang dan Penanaman Modal',
    datasetCount: 9,
    pdfPages: 'Halaman 8 - 9 (9 Dataset)',
    operationalHighlights: [
      { label: 'Dokumen SK Izin Terbit', value: '14.850 SK', subtext: 'Industri & Perdagangan Kawasan' },
      { label: 'Ketepatan Waktu SLA', value: '96,8%', subtext: 'Layanan Selesai < 24 Jam' },
      { label: 'Kuota Konsumsi', value: '128 Komoditas', subtext: 'Beras, Gula, Daging & Sembako' },
      { label: 'Izin Usaha Kawasan', value: '382 Perusahaan', subtext: 'KBLI Terverifikasi OSS RBA' },
    ],
    strategicInsights:
      'Digitalisasi penuh izin pemasukan dan pengeluaran barang melalui portal IBOSS dan integrasi INSW berhasil mendongkrak skor kepuasan publik ke level 89.35 (Mutu A) dengan zero komplain SLA perizinan.',
  },
];

// Tren Bulanan Arus Operasional & Throughput Gabungan (Kuartal 1 s.d. 4)
export interface MonthlyOperationalThroughput {
  bulan: string;
  bulanShort: string;
  kuartal: string;
  petiKemasTeus: number;
  kargoUdaraTon: number;
  penumpangBandaraPax: number;
  penumpangPelabuhanPax: number;
  kapalCall: number;
  pnbpBandaraM: number;
  pnbpPelabuhanM: number;
  pnbpLlbM: number;
  totalPnbpM: number;
}

export const MONTHLY_OPERATIONAL_DATA: MonthlyOperationalThroughput[] = [
  {
    bulan: 'Januari',
    bulanShort: 'Jan',
    kuartal: 'Q1',
    petiKemasTeus: 48200,
    kargoUdaraTon: 3250,
    penumpangBandaraPax: 320000,
    penumpangPelabuhanPax: 620000,
    kapalCall: 1480,
    pnbpBandaraM: 9.8,
    pnbpPelabuhanM: 34.2,
    pnbpLlbM: 0.18,
    totalPnbpM: 44.18,
  },
  {
    bulan: 'Februari',
    bulanShort: 'Feb',
    kuartal: 'Q1',
    petiKemasTeus: 46800,
    kargoUdaraTon: 3120,
    penumpangBandaraPax: 315000,
    penumpangPelabuhanPax: 590000,
    kapalCall: 1420,
    pnbpBandaraM: 9.5,
    pnbpPelabuhanM: 33.8,
    pnbpLlbM: 0.19,
    totalPnbpM: 43.49,
  },
  {
    bulan: 'Maret',
    bulanShort: 'Mar',
    kuartal: 'Q1',
    petiKemasTeus: 52100,
    kargoUdaraTon: 3580,
    penumpangBandaraPax: 342000,
    penumpangPelabuhanPax: 645000,
    kapalCall: 1560,
    pnbpBandaraM: 10.4,
    pnbpPelabuhanM: 37.1,
    pnbpLlbM: 0.21,
    totalPnbpM: 47.71,
  },
  {
    bulan: 'April',
    bulanShort: 'Apr',
    kuartal: 'Q2',
    petiKemasTeus: 50900,
    kargoUdaraTon: 3450,
    penumpangBandaraPax: 365000,
    penumpangPelabuhanPax: 710000,
    kapalCall: 1530,
    pnbpBandaraM: 10.8,
    pnbpPelabuhanM: 36.5,
    pnbpLlbM: 0.22,
    totalPnbpM: 47.52,
  },
  {
    bulan: 'Mei',
    bulanShort: 'Mei',
    kuartal: 'Q2',
    petiKemasTeus: 51800,
    kargoUdaraTon: 3620,
    penumpangBandaraPax: 350000,
    penumpangPelabuhanPax: 680000,
    kapalCall: 1545,
    pnbpBandaraM: 10.6,
    pnbpPelabuhanM: 37.2,
    pnbpLlbM: 0.2,
    totalPnbpM: 48.0,
  },
  {
    bulan: 'Juni',
    bulanShort: 'Jun',
    kuartal: 'Q2',
    petiKemasTeus: 53200,
    kargoUdaraTon: 3710,
    penumpangBandaraPax: 380000,
    penumpangPelabuhanPax: 730000,
    kapalCall: 1580,
    pnbpBandaraM: 11.2,
    pnbpPelabuhanM: 38.6,
    pnbpLlbM: 0.23,
    totalPnbpM: 50.03,
  },
  {
    bulan: 'Juli',
    bulanShort: 'Jul',
    kuartal: 'Q3',
    petiKemasTeus: 52400,
    kargoUdaraTon: 3650,
    penumpangBandaraPax: 375000,
    penumpangPelabuhanPax: 705000,
    kapalCall: 1560,
    pnbpBandaraM: 10.9,
    pnbpPelabuhanM: 37.9,
    pnbpLlbM: 0.21,
    totalPnbpM: 49.01,
  },
  {
    bulan: 'Agustus',
    bulanShort: 'Agu',
    kuartal: 'Q3',
    petiKemasTeus: 53800,
    kargoUdaraTon: 3780,
    penumpangBandaraPax: 358000,
    penumpangPelabuhanPax: 695000,
    kapalCall: 1590,
    pnbpBandaraM: 10.7,
    pnbpPelabuhanM: 38.4,
    pnbpLlbM: 0.22,
    totalPnbpM: 49.32,
  },
  {
    bulan: 'September',
    bulanShort: 'Sep',
    kuartal: 'Q3',
    petiKemasTeus: 51200,
    kargoUdaraTon: 3540,
    penumpangBandaraPax: 335000,
    penumpangPelabuhanPax: 660000,
    kapalCall: 1520,
    pnbpBandaraM: 10.1,
    pnbpPelabuhanM: 36.8,
    pnbpLlbM: 0.2,
    totalPnbpM: 47.1,
  },
  {
    bulan: 'Oktober',
    bulanShort: 'Okt',
    kuartal: 'Q4',
    petiKemasTeus: 54600,
    kargoUdaraTon: 3820,
    penumpangBandaraPax: 360000,
    penumpangPelabuhanPax: 690000,
    kapalCall: 1610,
    pnbpBandaraM: 10.8,
    pnbpPelabuhanM: 38.9,
    pnbpLlbM: 0.23,
    totalPnbpM: 49.93,
  },
  {
    bulan: 'November',
    bulanShort: 'Nov',
    kuartal: 'Q4',
    petiKemasTeus: 55400,
    kargoUdaraTon: 3910,
    penumpangBandaraPax: 370000,
    penumpangPelabuhanPax: 720000,
    kapalCall: 1630,
    pnbpBandaraM: 11.2,
    pnbpPelabuhanM: 39.5,
    pnbpLlbM: 0.24,
    totalPnbpM: 50.94,
  },
  {
    bulan: 'Desember',
    bulanShort: 'Des',
    kuartal: 'Q4',
    petiKemasTeus: 57400,
    kargoUdaraTon: 4220,
    penumpangBandaraPax: 410000,
    penumpangPelabuhanPax: 810000,
    kapalCall: 1715,
    pnbpBandaraM: 12.5,
    pnbpPelabuhanM: 44.2,
    pnbpLlbM: 0.28,
    totalPnbpM: 56.98,
  },
];

// Detail Indikator Survei IKM (9 Unsur PermenPAN-RB No. 14/2017)
export interface IkmUnsurDetail {
  unsur: string;
  deskripsi: string;
  bobot: number;
  nilaiBandara: number;
  nilaiPelabuhan: number;
  nilaiLlb: number;
  nilaiRataRata: number;
  predikat: string;
}

export const IKM_UNSUR_DETAILS: IkmUnsurDetail[] = [
  {
    unsur: 'U1. Persyaratan Pelayanan',
    deskripsi: 'Kesesuaian persyaratan perizinan & prosedur masuk kawasan',
    bobot: 0.11,
    nilaiBandara: 88.5,
    nilaiPelabuhan: 87.9,
    nilaiLlb: 90.2,
    nilaiRataRata: 88.87,
    predikat: 'Sangat Baik (A)',
  },
  {
    unsur: 'U2. Kemudahan Prosedur',
    deskripsi: 'Kemudahan alur birokrasi & kejelasan SOP operasional',
    bobot: 0.11,
    nilaiBandara: 87.2,
    nilaiPelabuhan: 88.1,
    nilaiLlb: 89.6,
    nilaiRataRata: 88.3,
    predikat: 'Sangat Baik (A)',
  },
  {
    unsur: 'U3. Waktu Penyelesaian',
    deskripsi: 'Kecepatan layanan sesuai SLA (turnaround & dwell time)',
    bobot: 0.11,
    nilaiBandara: 86.9,
    nilaiPelabuhan: 86.5,
    nilaiLlb: 91.4,
    nilaiRataRata: 88.27,
    predikat: 'Baik (B)',
  },
  {
    unsur: 'U4. Biaya / Tarif Layanan',
    deskripsi: 'Transparansi tarif resmi BLU tanpa pungutan liar',
    bobot: 0.11,
    nilaiBandara: 88.4,
    nilaiPelabuhan: 89.2,
    nilaiLlb: 88.7,
    nilaiRataRata: 88.77,
    predikat: 'Sangat Baik (A)',
  },
  {
    unsur: 'U5. Produk Spesifikasi Layanan',
    deskripsi: 'Kesesuaian hasil layanan dengan janji penetapan standar',
    bobot: 0.11,
    nilaiBandara: 87.8,
    nilaiPelabuhan: 88.4,
    nilaiLlb: 89.1,
    nilaiRataRata: 88.43,
    predikat: 'Sangat Baik (A)',
  },
  {
    unsur: 'U6. Kompetensi Pelaksana',
    deskripsi: 'Kecakapan dan profesionalisme petugas di lapangan',
    bobot: 0.11,
    nilaiBandara: 88.6,
    nilaiPelabuhan: 88.9,
    nilaiLlb: 89.5,
    nilaiRataRata: 89.0,
    predikat: 'Sangat Baik (A)',
  },
  {
    unsur: 'U7. Perilaku Pelaksana',
    deskripsi: 'Kesopanan, keramahan, dan integritas aparatur',
    bobot: 0.11,
    nilaiBandara: 89.1,
    nilaiPelabuhan: 89.4,
    nilaiLlb: 90.0,
    nilaiRataRata: 89.5,
    predikat: 'Sangat Baik (A)',
  },
  {
    unsur: 'U8. Penanganan Pengaduan',
    deskripsi: 'Responsivitas penyelesaian keluhan melalui SP4N LAPOR',
    bobot: 0.11,
    nilaiBandara: 86.2,
    nilaiPelabuhan: 87.1,
    nilaiLlb: 88.0,
    nilaiRataRata: 87.1,
    predikat: 'Baik (B)',
  },
  {
    unsur: 'U9. Sarana & Prasarana',
    deskripsi: 'Kenyamanan fasilitas terminal, dermaga & sistem digital',
    bobot: 0.12,
    nilaiBandara: 88.9,
    nilaiPelabuhan: 87.8,
    nilaiLlb: 87.6,
    nilaiRataRata: 88.1,
    predikat: 'Baik (B)',
  },
];

// Operational Monitoring Alerts (Terinspirasi layout gambar namun spesifik Perkin A5)
export interface OperationalAlertItem {
  id: string;
  severity: 'high' | 'medium' | 'info';
  category: 'Bandara' | 'Pelabuhan' | 'Lalu Lintas Barang';
  title: string;
  location: string;
  metric: string;
  status: string;
  actionRequired: string;
}

export const OPERATIONAL_ALERTS_A5: OperationalAlertItem[] = [
  {
    id: 'alt-1',
    severity: 'medium',
    category: 'Pelabuhan',
    title: 'Utilisasi Container Yard Batu Ampar mendekati 82%',
    location: 'Terminal Peti Kemas Batu Ampar (STS Area)',
    metric: 'Yard Occupancy 82,4% (Threshold: 85%)',
    status: 'Perlu Monitoring',
    actionRequired: 'Percepat evakuasi container kosong (empties) ke depo buffer Kabil untuk menjaga kelancaran bongkar muat.',
  },
  {
    id: 'alt-2',
    severity: 'info',
    category: 'Bandara',
    title: 'Kapasitas Kargo Udara EMPU Peak Season Q4',
    location: 'Terminal Kargo Bandara Hang Nadim',
    metric: 'Throughput Harian 138 Ton (Kapasitas: 160 Ton)',
    status: 'Optimal & Terkendali',
    actionRequired: 'Koordinasikan tambahan shift tim ground handling kargo malam untuk rute Jakarta & Surabaya.',
  },
  {
    id: 'alt-3',
    severity: 'info',
    category: 'Lalu Lintas Barang',
    title: 'Lonjakan Permohonan Izin Pemasukan Bahan Baku Industri',
    location: 'Portal IBOSS / INSW Batam',
    metric: '96,8% SLA On-Time (< 24 Jam)',
    status: 'SLA Hijau',
    actionRequired: 'Verifikasi dokumen kuota KBLI otomatis berhasil memangkas backlog verifikasi manual hingga 0 kasus.',
  },
  {
    id: 'alt-4',
    severity: 'high',
    category: 'Pelabuhan',
    title: 'Jadwal Pemeliharaan Berkala Dredging Alur Pelayaran',
    location: 'Alur Masuk Pelabuhan Sekupang & Batu Ampar',
    metric: 'Kedalaman Draft Minimum -12.5 mLWS',
    status: 'Action Required',
    actionRequired: 'Finalisasi kontrak pengerukan alur untuk mengakomodasi kapal kontainer generasi Panamax.',
  },
];

// Operational AI Strategy Insights
export const OPERATIONAL_STRATEGY_INSIGHTS = [
  {
    id: 1,
    unit: 'Pelabuhan Batu Ampar',
    insight:
      'Pelabuhan menjadi penyumbang PNBP terbesar (Rp 438,35 M / 78% kontribusi). Digitalisasi TOS dan modernisasi crane STS berhasil meningkatkan produktivitas hingga 28 gross crane moves per hour.',
  },
  {
    id: 2,
    unit: 'Kawasan Bandara Hang Nadim',
    insight:
      'Trafik penumpang mencapai 4,12 juta Pax melampaui target. Optimalisasi slot penerbangan transit internasional dan terminal kargo ekspres perlu dipacu untuk ekspansi pasar ASEAN.',
  },
  {
    id: 3,
    unit: 'Lalu Lintas Barang & INSW',
    insight:
      'Layanan Lalu Lintas Barang meraih skor IKM tertinggi (89,35 / Mutu A). Integrasi penuh data kuota konsumsi dan izin usaha kawasan menjadi model percontohan kemudahan berusaha di KPBPB.',
  },
];
