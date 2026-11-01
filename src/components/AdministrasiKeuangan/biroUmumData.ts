// ============================================================================
// DATASET MASTER BIRO UMUM BP BATAM
// Seluruh data disimpan dalam satu objek JSON terpadu agar mudah diganti data riil
// ============================================================================

export interface BmnInventarisItem {
  jenisBmn: string;
  kondisiBaik: number;
  kondisiRusakRingan: number;
  kondisiRusakBerat: number;
}

export interface BmnInventarisFilterData {
  tahun: string;
  semester: string;
  uapkpb: string;
  items: BmnInventarisItem[];
}

export interface PenghapusanAsetItem {
  semesterTahun: string;
  nilaiPerolehan: number; // Dalam Miliar Rupiah
  nilaiLelang: number;    // Dalam Miliar Rupiah
  jumlahItem: number;
  persentaseRecovery: number; // (Lelang / Perolehan) * 100
}

export interface PengadaanManproUnitItem {
  namaUnit: string;
  barang: number;             // Dalam Juta Rupiah
  jasaKonsultansi: number;    // Dalam Juta Rupiah
  pekerjaanKonstruksi: number;// Dalam Juta Rupiah
  jasaLainnya: number;        // Dalam Juta Rupiah
  totalHps: number;           // Dalam Juta Rupiah
}

export interface PaketPengadaanItem {
  id: string;
  namaPaket: string;
  namaUnit: string;
  jenisPengadaan: 'Barang' | 'Jasa Konsultansi' | 'Pekerjaan Konstruksi' | 'Jasa Lainnya';
  namaPenyedia: string;
  hpsRupiah: number;
  tahun: string;
  triwulan: string;
}

export interface PenerbitanDokumenUnitItem {
  unitKerja: string;
  skKepala: number;
  suratPerintah: number;
  suratTugas: number;
  suratKeluar: number;
  totalDokumen: number;
}

export interface RecordCentreArsipItem {
  unitKerja: string;
  arsipInaktif: number;
  usulMusnah: number;
  permanen: number;
  musnah: number;
  totalArsip: number;
}

export interface KunjunganWebsiteBulanan {
  bulan: string;
  layananInvestasi: number;
  beritaPublikasi: number;
  ppidTransparansi: number;
  portalIboss: number;
  katalogAsetLelang: number;
  total: number;
}

export interface BiroUmumMasterData {
  metadata: {
    unit: string;
    induk: string;
    pemutakhiranTerakhir: string;
    temaVisual: string;
  };
  inventarisasiAsetBmn: {
    datasetName: string;
    filters: {
      tahunList: string[];
      semesterList: string[];
      uapkpbList: string[];
    };
    records: BmnInventarisFilterData[];
  };
  penghapusanAset: {
    datasetName: string;
    records: PenghapusanAsetItem[];
  };
  pengadaanBarangJasa: {
    datasetName: string;
    filters: {
      tahunList: string[];
      triwulanList: string[];
    };
    recordsByFilter: Record<string, PengadaanManproUnitItem[]>;
    paketPengadaanDetail: PaketPengadaanItem[];
  };
  penerbitanDokumen: {
    datasetName: string;
    filters: {
      tahunList: string[];
      triwulanList: string[];
    };
    recordsByFilter: Record<string, PenerbitanDokumenUnitItem[]>;
  };
  recordCentreArsip: {
    datasetName: string;
    records: RecordCentreArsipItem[];
  };
  kunjunganWebsite: {
    datasetName: string;
    kategoriList: { key: keyof Omit<KunjunganWebsiteBulanan, 'bulan' | 'total'>; label: string; color: string }[];
    monthlyRecords: KunjunganWebsiteBulanan[];
  };
}

export const BIRO_UMUM_MASTER_DATA: BiroUmumMasterData = {
  metadata: {
    unit: 'Biro Umum BP Batam',
    induk: 'Deputi Bidang Administrasi dan Keuangan (DEP-A1)',
    pemutakhiranTerakhir: 'Oktober 2026',
    temaVisual: 'Clean Blue & White Theme',
  },

  // 1. INVENTARISASI ASET MENURUT JENIS BMN DAN KONDISI
  inventarisasiAsetBmn: {
    datasetName: 'Daftar Inventarisasi Aset BP Batam (SIMAK-BMN Terpadu)',
    filters: {
      tahunList: ['2026', '2025', '2024'],
      semesterList: ['Semua Semester', 'Semester I', 'Semester II'],
      uapkpbList: [
        'Semua UAPKPB',
        'Biro Umum (Sekretariat)',
        'Direktorat Infrastruktur Kawasan',
        'Direktorat Pengelolaan Pertanahan',
        'Badan Usaha Pelabuhan',
        'Badan Usaha Rumah Sakit (RSBP)',
        'Badan Usaha SPAM & Lingkungan',
      ],
    },
    records: [
      // 2026 - Semua Semester - Semua UAPKPB
      {
        tahun: '2026',
        semester: 'Semua Semester',
        uapkpb: 'Semua UAPKPB',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 1840, kondisiRusakRingan: 95, kondisiRusakBerat: 24 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 14250, kondisiRusakRingan: 1840, kondisiRusakBerat: 680 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 3120, kondisiRusakRingan: 380, kondisiRusakBerat: 115 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 4890, kondisiRusakRingan: 620, kondisiRusakBerat: 190 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 2150, kondisiRusakRingan: 210, kondisiRusakBerat: 45 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 820, kondisiRusakRingan: 40, kondisiRusakBerat: 12 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 640, kondisiRusakRingan: 25, kondisiRusakBerat: 8 },
        ],
      },
      // 2026 - Semester I - Semua UAPKPB
      {
        tahun: '2026',
        semester: 'Semester I',
        uapkpb: 'Semua UAPKPB',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 1820, kondisiRusakRingan: 90, kondisiRusakBerat: 20 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 13900, kondisiRusakRingan: 1780, kondisiRusakBerat: 640 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 3080, kondisiRusakRingan: 360, kondisiRusakBerat: 110 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 4750, kondisiRusakRingan: 590, kondisiRusakBerat: 180 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 2100, kondisiRusakRingan: 190, kondisiRusakBerat: 40 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 780, kondisiRusakRingan: 35, kondisiRusakBerat: 10 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 620, kondisiRusakRingan: 20, kondisiRusakBerat: 5 },
        ],
      },
      // 2026 - Semester II - Semua UAPKPB
      {
        tahun: '2026',
        semester: 'Semester II',
        uapkpb: 'Semua UAPKPB',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 1840, kondisiRusakRingan: 95, kondisiRusakBerat: 24 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 14250, kondisiRusakRingan: 1840, kondisiRusakBerat: 680 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 3120, kondisiRusakRingan: 380, kondisiRusakBerat: 115 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 4890, kondisiRusakRingan: 620, kondisiRusakBerat: 190 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 2150, kondisiRusakRingan: 210, kondisiRusakBerat: 45 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 820, kondisiRusakRingan: 40, kondisiRusakBerat: 12 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 640, kondisiRusakRingan: 25, kondisiRusakBerat: 8 },
        ],
      },
      // 2026 - Semua Semester - Biro Umum
      {
        tahun: '2026',
        semester: 'Semua Semester',
        uapkpb: 'Biro Umum (Sekretariat)',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 42, kondisiRusakRingan: 3, kondisiRusakBerat: 0 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 4320, kondisiRusakRingan: 410, kondisiRusakBerat: 140 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 68, kondisiRusakRingan: 8, kondisiRusakBerat: 2 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 85, kondisiRusakRingan: 12, kondisiRusakBerat: 4 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 890, kondisiRusakRingan: 65, kondisiRusakBerat: 14 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 14, kondisiRusakRingan: 0, kondisiRusakBerat: 0 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 185, kondisiRusakRingan: 6, kondisiRusakBerat: 2 },
        ],
      },
      // 2026 - Semua Semester - Direktorat Infrastruktur Kawasan
      {
        tahun: '2026',
        semester: 'Semua Semester',
        uapkpb: 'Direktorat Infrastruktur Kawasan',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 310, kondisiRusakRingan: 15, kondisiRusakBerat: 4 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 2180, kondisiRusakRingan: 320, kondisiRusakBerat: 110 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 420, kondisiRusakRingan: 54, kondisiRusakBerat: 18 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 3410, kondisiRusakRingan: 430, kondisiRusakBerat: 135 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 340, kondisiRusakRingan: 35, kondisiRusakBerat: 8 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 520, kondisiRusakRingan: 28, kondisiRusakBerat: 8 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 95, kondisiRusakRingan: 4, kondisiRusakBerat: 1 },
        ],
      },
      // Fallback data for other filters
      {
        tahun: '2025',
        semester: 'Semua Semester',
        uapkpb: 'Semua UAPKPB',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 1780, kondisiRusakRingan: 92, kondisiRusakBerat: 28 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 13600, kondisiRusakRingan: 1950, kondisiRusakBerat: 740 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 3010, kondisiRusakRingan: 410, kondisiRusakBerat: 130 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 4620, kondisiRusakRingan: 680, kondisiRusakBerat: 215 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 2040, kondisiRusakRingan: 230, kondisiRusakBerat: 52 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 740, kondisiRusakRingan: 45, kondisiRusakBerat: 15 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 580, kondisiRusakRingan: 30, kondisiRusakBerat: 10 },
        ],
      },
      {
        tahun: '2024',
        semester: 'Semua Semester',
        uapkpb: 'Semua UAPKPB',
        items: [
          { jenisBmn: 'Tanah', kondisiBaik: 1720, kondisiRusakRingan: 98, kondisiRusakBerat: 35 },
          { jenisBmn: 'Peralatan & Mesin', kondisiBaik: 12900, kondisiRusakRingan: 2120, kondisiRusakBerat: 810 },
          { jenisBmn: 'Gedung & Bangunan', kondisiBaik: 2920, kondisiRusakRingan: 445, kondisiRusakBerat: 145 },
          { jenisBmn: 'Jalan, Irigasi & Jaringan', kondisiBaik: 4410, kondisiRusakRingan: 710, kondisiRusakBerat: 240 },
          { jenisBmn: 'Aset Tetap Lainnya', kondisiBaik: 1920, kondisiRusakRingan: 250, kondisiRusakBerat: 60 },
          { jenisBmn: 'Konstruksi dlm Pengerjaan (KDP)', kondisiBaik: 680, kondisiRusakRingan: 50, kondisiRusakBerat: 20 },
          { jenisBmn: 'Aset Tak Berwujud (ATB)', kondisiBaik: 520, kondisiRusakRingan: 35, kondisiRusakBerat: 12 },
        ],
      },
    ],
  },

  // 2. NILAI PEROLEHAN VS NILAI LELANG ASET YANG DIHAPUS
  penghapusanAset: {
    datasetName: 'Daftar Penghapusan Aset BP Batam (KPKNL & Panitia Lelang BMN)',
    records: [
      { semesterTahun: 'Sem I 2024', nilaiPerolehan: 12.85, nilaiLelang: 4.62, jumlahItem: 342, persentaseRecovery: 35.9 },
      { semesterTahun: 'Sem II 2024', nilaiPerolehan: 18.40, nilaiLelang: 7.15, jumlahItem: 518, persentaseRecovery: 38.8 },
      { semesterTahun: 'Sem I 2025', nilaiPerolehan: 14.20, nilaiLelang: 5.98, jumlahItem: 412, persentaseRecovery: 42.1 },
      { semesterTahun: 'Sem II 2025', nilaiPerolehan: 22.75, nilaiLelang: 9.80, jumlahItem: 680, persentaseRecovery: 43.1 },
      { semesterTahun: 'Sem I 2026', nilaiPerolehan: 16.50, nilaiLelang: 7.45, jumlahItem: 495, persentaseRecovery: 45.2 },
    ],
  },

  // 3. NILAI HPS PENGADAAN PER UNIT DAN JENIS PENGADAAN (10 UNIT TERATAS + TABEL DETAIL)
  pengadaanBarangJasa: {
    datasetName: 'Data Pengadaan Barang dan Jasa BP Batam (MANPRO / LPSE)',
    filters: {
      tahunList: ['2026', '2025'],
      triwulanList: ['Semua Triwulan', 'TW I', 'TW II', 'TW III', 'TW IV'],
    },
    recordsByFilter: {
      '2026-Semua Triwulan': [
        { namaUnit: 'Dit. Infrastruktur Kawasan', barang: 18200, jasaKonsultansi: 12400, pekerjaanKonstruksi: 185600, jasaLainnya: 9800, totalHps: 226000 },
        { namaUnit: 'Badan Usaha Pelabuhan', barang: 14500, jasaKonsultansi: 6800, pekerjaanKonstruksi: 84200, jasaLainnya: 11200, totalHps: 116700 },
        { namaUnit: 'Badan Usaha SPAM & Lingkungan', barang: 16800, jasaKonsultansi: 5400, pekerjaanKonstruksi: 62400, jasaLainnya: 7500, totalHps: 92100 },
        { namaUnit: 'BU Rumah Sakit (RSBP)', barang: 42500, jasaKonsultansi: 3200, pekerjaanKonstruksi: 18500, jasaLainnya: 14800, totalHps: 79000 },
        { namaUnit: 'Biro Umum (Sekretariat)', barang: 24800, jasaKonsultansi: 4600, pekerjaanKonstruksi: 12500, jasaLainnya: 28400, totalHps: 70300 },
        { namaUnit: 'BU Bandar Udara Hang Nadim', barang: 12400, jasaKonsultansi: 4800, pekerjaanKonstruksi: 34200, jasaLainnya: 8900, totalHps: 60300 },
        { namaUnit: 'Dit. Pengelolaan Pertanahan', barang: 8400, jasaKonsultansi: 14200, pekerjaanKonstruksi: 6500, jasaLainnya: 7100, totalHps: 36200 },
        { namaUnit: 'Biro Sistem Informasi (PDSI)', barang: 19800, jasaKonsultansi: 6500, pekerjaanKonstruksi: 1200, jasaLainnya: 8400, totalHps: 35900 },
        { namaUnit: 'Dit. Pengamanan Aset (Ditpam)', barang: 9200, jasaKonsultansi: 1800, pekerjaanKonstruksi: 4500, jasaLainnya: 16200, totalHps: 31700 },
        { namaUnit: 'Dit. PTSP & Penanaman Modal', barang: 6800, jasaKonsultansi: 4200, pekerjaanKonstruksi: 2100, jasaLainnya: 5400, totalHps: 18500 },
      ],
      '2026-TW I': [
        { namaUnit: 'Dit. Infrastruktur Kawasan', barang: 4500, jasaKonsultansi: 3800, pekerjaanKonstruksi: 48000, jasaLainnya: 2400, totalHps: 58700 },
        { namaUnit: 'Badan Usaha Pelabuhan', barang: 3800, jasaKonsultansi: 1900, pekerjaanKonstruksi: 22000, jasaLainnya: 2900, totalHps: 30600 },
        { namaUnit: 'Badan Usaha SPAM & Lingkungan', barang: 4200, jasaKonsultansi: 1400, pekerjaanKonstruksi: 16500, jasaLainnya: 1900, totalHps: 24000 },
        { namaUnit: 'BU Rumah Sakit (RSBP)', barang: 11500, jasaKonsultansi: 850, pekerjaanKonstruksi: 4800, jasaLainnya: 3800, totalHps: 20950 },
        { namaUnit: 'Biro Umum (Sekretariat)', barang: 6800, jasaKonsultansi: 1200, pekerjaanKonstruksi: 3200, jasaLainnya: 7400, totalHps: 18600 },
        { namaUnit: 'BU Bandar Udara Hang Nadim', barang: 3200, jasaKonsultansi: 1300, pekerjaanKonstruksi: 8900, jasaLainnya: 2300, totalHps: 15700 },
        { namaUnit: 'Dit. Pengelolaan Pertanahan', barang: 2100, jasaKonsultansi: 3900, pekerjaanKonstruksi: 1800, jasaLainnya: 1800, totalHps: 9600 },
        { namaUnit: 'Biro Sistem Informasi (PDSI)', barang: 5200, jasaKonsultansi: 1800, pekerjaanKonstruksi: 300, jasaLainnya: 2200, totalHps: 9500 },
        { namaUnit: 'Dit. Pengamanan Aset (Ditpam)', barang: 2400, jasaKonsultansi: 450, pekerjaanKonstruksi: 1100, jasaLainnya: 4200, totalHps: 8150 },
        { namaUnit: 'Dit. PTSP & Penanaman Modal', barang: 1800, jasaKonsultansi: 1100, pekerjaanKonstruksi: 500, jasaLainnya: 1400, totalHps: 4800 },
      ],
      '2026-TW II': [
        { namaUnit: 'Dit. Infrastruktur Kawasan', barang: 5600, jasaKonsultansi: 4100, pekerjaanKonstruksi: 62000, jasaLainnya: 3100, totalHps: 74800 },
        { namaUnit: 'Badan Usaha Pelabuhan', barang: 4600, jasaKonsultansi: 2200, pekerjaanKonstruksi: 29000, jasaLainnya: 3600, totalHps: 39400 },
        { namaUnit: 'Badan Usaha SPAM & Lingkungan', barang: 5300, jasaKonsultansi: 1800, pekerjaanKonstruksi: 21000, jasaLainnya: 2400, totalHps: 30500 },
        { namaUnit: 'BU Rumah Sakit (RSBP)', barang: 13800, jasaKonsultansi: 1100, pekerjaanKonstruksi: 6200, jasaLainnya: 4800, totalHps: 25900 },
        { namaUnit: 'Biro Umum (Sekretariat)', barang: 8100, jasaKonsultansi: 1500, pekerjaanKonstruksi: 4100, jasaLainnya: 9200, totalHps: 22900 },
        { namaUnit: 'BU Bandar Udara Hang Nadim', barang: 4100, jasaKonsultansi: 1600, pekerjaanKonstruksi: 11500, jasaLainnya: 2900, totalHps: 20100 },
        { namaUnit: 'Dit. Pengelolaan Pertanahan', barang: 2800, jasaKonsultansi: 4600, pekerjaanKonstruksi: 2200, jasaLainnya: 2400, totalHps: 12000 },
        { namaUnit: 'Biro Sistem Informasi (PDSI)', barang: 6500, jasaKonsultansi: 2100, pekerjaanKonstruksi: 400, jasaLainnya: 2800, totalHps: 11800 },
        { namaUnit: 'Dit. Pengamanan Aset (Ditpam)', barang: 3100, jasaKonsultansi: 600, pekerjaanKonstruksi: 1500, jasaLainnya: 5300, totalHps: 10500 },
        { namaUnit: 'Dit. PTSP & Penanaman Modal', barang: 2200, jasaKonsultansi: 1400, pekerjaanKonstruksi: 700, jasaLainnya: 1800, totalHps: 6100 },
      ],
      '2026-TW III': [
        { namaUnit: 'Dit. Infrastruktur Kawasan', barang: 4800, jasaKonsultansi: 2800, pekerjaanKonstruksi: 51000, jasaLainnya: 2600, totalHps: 61200 },
        { namaUnit: 'Badan Usaha Pelabuhan', barang: 3900, jasaKonsultansi: 1700, pekerjaanKonstruksi: 21500, jasaLainnya: 2800, totalHps: 29900 },
        { namaUnit: 'Badan Usaha SPAM & Lingkungan', barang: 4500, jasaKonsultansi: 1300, pekerjaanKonstruksi: 15800, jasaLainnya: 1900, totalHps: 23500 },
        { namaUnit: 'BU Rumah Sakit (RSBP)', barang: 10800, jasaKonsultansi: 750, pekerjaanKonstruksi: 4600, jasaLainnya: 3700, totalHps: 19850 },
        { namaUnit: 'Biro Umum (Sekretariat)', barang: 5900, jasaKonsultansi: 1100, pekerjaanKonstruksi: 3100, jasaLainnya: 6800, totalHps: 16900 },
        { namaUnit: 'BU Bandar Udara Hang Nadim', barang: 3100, jasaKonsultansi: 1100, pekerjaanKonstruksi: 8800, jasaLainnya: 2100, totalHps: 15100 },
        { namaUnit: 'Dit. Pengelolaan Pertanahan', barang: 2000, jasaKonsultansi: 3400, pekerjaanKonstruksi: 1400, jasaLainnya: 1600, totalHps: 8400 },
        { namaUnit: 'Biro Sistem Informasi (PDSI)', barang: 4800, jasaKonsultansi: 1500, pekerjaanKonstruksi: 300, jasaLainnya: 2100, totalHps: 8700 },
        { namaUnit: 'Dit. Pengamanan Aset (Ditpam)', barang: 2200, jasaKonsultansi: 400, pekerjaanKonstruksi: 1100, jasaLainnya: 4100, totalHps: 7800 },
        { namaUnit: 'Dit. PTSP & Penanaman Modal', barang: 1600, jasaKonsultansi: 1000, pekerjaanKonstruksi: 500, jasaLainnya: 1300, totalHps: 4400 },
      ],
      '2026-TW IV': [
        { namaUnit: 'Dit. Infrastruktur Kawasan', barang: 3300, jasaKonsultansi: 1700, pekerjaanKonstruksi: 24600, jasaLainnya: 1700, totalHps: 31300 },
        { namaUnit: 'Badan Usaha Pelabuhan', barang: 2200, jasaKonsultansi: 1000, pekerjaanKonstruksi: 11700, jasaLainnya: 1900, totalHps: 16800 },
        { namaUnit: 'Badan Usaha SPAM & Lingkungan', barang: 2800, jasaKonsultansi: 900, pekerjaanKonstruksi: 9100, jasaLainnya: 1300, totalHps: 14100 },
        { namaUnit: 'BU Rumah Sakit (RSBP)', barang: 6400, jasaKonsultansi: 500, pekerjaanKonstruksi: 2900, jasaLainnya: 2500, totalHps: 12300 },
        { namaUnit: 'Biro Umum (Sekretariat)', barang: 4000, jasaKonsultansi: 800, pekerjaanKonstruksi: 2100, jasaLainnya: 5000, totalHps: 11900 },
        { namaUnit: 'BU Bandar Udara Hang Nadim', barang: 2000, jasaKonsultansi: 800, pekerjaanKonstruksi: 5000, jasaLainnya: 1600, totalHps: 9400 },
        { namaUnit: 'Dit. Pengelolaan Pertanahan', barang: 1500, jasaKonsultansi: 2300, pekerjaanKonstruksi: 1100, jasaLainnya: 1300, totalHps: 6200 },
        { namaUnit: 'Biro Sistem Informasi (PDSI)', barang: 3300, jasaKonsultansi: 1100, pekerjaanKonstruksi: 200, jasaLainnya: 1300, totalHps: 5900 },
        { namaUnit: 'Dit. Pengamanan Aset (Ditpam)', barang: 1500, jasaKonsultansi: 350, pekerjaanKonstruksi: 800, jasaLainnya: 2600, totalHps: 5250 },
        { namaUnit: 'Dit. PTSP & Penanaman Modal', barang: 1200, jasaKonsultansi: 700, pekerjaanKonstruksi: 400, jasaLainnya: 900, totalHps: 3200 },
      ],
    },
    paketPengadaanDetail: [
      { id: 'PKT-001', namaPaket: 'Pengadaan Sewa Kendaraan Dinas Operasional Pejabat BP Batam', namaUnit: 'Biro Umum (Sekretariat)', jenisPengadaan: 'Jasa Lainnya', namaPenyedia: 'PT Serasi Autoraya (TRAC Batam)', hpsRupiah: 14850000000, tahun: '2026', triwulan: 'TW I' },
      { id: 'PKT-002', namaPaket: 'Pengadaan Jasa Cleaning Service & Kebersihan Gedung Utama BP Batam', namaUnit: 'Biro Umum (Sekretariat)', jenisPengadaan: 'Jasa Lainnya', namaPenyedia: 'PT ISS Indonesia Cab. Kepri', hpsRupiah: 8640000000, tahun: '2026', triwulan: 'TW I' },
      { id: 'PKT-003', namaPaket: 'Pemeliharaan Berkala Sistem Pendingin HVAC & Genset Gedung Bida', namaUnit: 'Biro Umum (Sekretariat)', jenisPengadaan: 'Barang', namaPenyedia: 'CV Batam Tehnik Solusindo', hpsRupiah: 4200000000, tahun: '2026', triwulan: 'TW II' },
      { id: 'PKT-004', namaPaket: 'Rehabilitasi Interior Ruang Rapat & Aula Sasana Graha BP Batam', namaUnit: 'Biro Umum (Sekretariat)', jenisPengadaan: 'Pekerjaan Konstruksi', namaPenyedia: 'PT Barelang Karya Bersama', hpsRupiah: 3850000000, tahun: '2026', triwulan: 'TW II' },
      { id: 'PKT-005', namaPaket: 'Pengadaan Lisensi & Infrastruktur Server Cloud Satu Data Tahap II', namaUnit: 'Biro Sistem Informasi (PDSI)', jenisPengadaan: 'Barang', namaPenyedia: 'PT Metrodata Electronics Tbk', hpsRupiah: 9800000000, tahun: '2026', triwulan: 'TW I' },
      { id: 'PKT-006', namaPaket: 'Peningkatan Jalan Koridor Arteri Batu Ampar - Mukakuning (Segmen 3)', namaUnit: 'Dit. Infrastruktur Kawasan', jenisPengadaan: 'Pekerjaan Konstruksi', namaPenyedia: 'PT Jaya Konstruksi MP Tbk', hpsRupiah: 48500000000, tahun: '2026', triwulan: 'TW I' },
      { id: 'PKT-007', namaPaket: 'Pengadaan Reagen & Bahan Medis Habis Pakai Hemodialisa RSBP', namaUnit: 'BU Rumah Sakit (RSBP)', jenisPengadaan: 'Barang', namaPenyedia: 'PT Kimia Farma Trading & Dist.', hpsRupiah: 12400000000, tahun: '2026', triwulan: 'TW I' },
      { id: 'PKT-008', namaPaket: 'Pengadaan Crane Dermaga Petikemas Curah Terminal Batu Ampar', namaUnit: 'Badan Usaha Pelabuhan', jenisPengadaan: 'Barang', namaPenyedia: 'PT Pelindo Jasa Maritim', hpsRupiah: 24500000000, tahun: '2026', triwulan: 'TW II' },
      { id: 'PKT-009', namaPaket: 'Konsultansi Pengawasan Teknis SPAM Jaringan Pipa Muka Kuning', namaUnit: 'Badan Usaha SPAM & Lingkungan', jenisPengadaan: 'Jasa Konsultansi', namaPenyedia: 'PT Ciriajasa Engineering Cons.', hpsRupiah: 2650000000, tahun: '2026', triwulan: 'TW II' },
      { id: 'PKT-010', namaPaket: 'Pengadaan Seragam & Perlengkapan Operasional Personel Ditpam', namaUnit: 'Dit. Pengamanan Aset (Ditpam)', jenisPengadaan: 'Barang', namaPenyedia: 'CV Citra Niaga Mandiri', hpsRupiah: 2950000000, tahun: '2026', triwulan: 'TW III' },
    ],
  },

  // 4. SURAT DAN DOKUMEN YANG DITERBITKAN PER UNIT KERJA
  penerbitanDokumen: {
    datasetName: 'Daftar SK Kepala BP Batam, Surat Perintah, Surat Tugas & Surat Keluar per Unit',
    filters: {
      tahunList: ['2026', '2025'],
      triwulanList: ['Semua Triwulan', 'TW I', 'TW II', 'TW III', 'TW IV'],
    },
    recordsByFilter: {
      '2026-Semua Triwulan': [
        { unitKerja: 'Biro Umum (Sekretariat)', skKepala: 142, suratPerintah: 285, suratTugas: 620, suratKeluar: 2840, totalDokumen: 3887 },
        { unitKerja: 'Biro Hukum & Humas', skKepala: 380, suratPerintah: 110, suratTugas: 340, suratKeluar: 1980, totalDokumen: 2810 },
        { unitKerja: 'Biro Keuangan (BLU)', skKepala: 95, suratPerintah: 145, suratTugas: 480, suratKeluar: 1720, totalDokumen: 2440 },
        { unitKerja: 'Biro Sumber Daya Manusia', skKepala: 210, suratPerintah: 310, suratTugas: 520, suratKeluar: 1350, totalDokumen: 2390 },
        { unitKerja: 'Dit. Pengelolaan Pertanahan', skKepala: 85, suratPerintah: 95, suratTugas: 410, suratKeluar: 1680, totalDokumen: 2270 },
        { unitKerja: 'Dit. Infrastruktur Kawasan', skKepala: 72, suratPerintah: 180, suratTugas: 490, suratKeluar: 1420, totalDokumen: 2162 },
        { unitKerja: 'Badan Usaha Pelabuhan', skKepala: 48, suratPerintah: 92, suratTugas: 310, suratKeluar: 1180, totalDokumen: 1630 },
        { unitKerja: 'Dit. PTSP & Investasi', skKepala: 64, suratPerintah: 85, suratTugas: 280, suratKeluar: 1120, totalDokumen: 1549 },
        { unitKerja: 'BU Rumah Sakit (RSBP)', skKepala: 38, suratPerintah: 75, suratTugas: 240, suratKeluar: 890, totalDokumen: 1243 },
        { unitKerja: 'Satuan Pemeriksa Intern (SPI)', skKepala: 24, suratPerintah: 115, suratTugas: 380, suratKeluar: 640, totalDokumen: 1159 },
      ],
      '2026-TW I': [
        { unitKerja: 'Biro Umum (Sekretariat)', skKepala: 42, suratPerintah: 75, suratTugas: 160, suratKeluar: 720, totalDokumen: 997 },
        { unitKerja: 'Biro Hukum & Humas', skKepala: 110, suratPerintah: 30, suratTugas: 90, suratKeluar: 510, totalDokumen: 740 },
        { unitKerja: 'Biro Keuangan (BLU)', skKepala: 28, suratPerintah: 40, suratTugas: 125, suratKeluar: 450, totalDokumen: 643 },
        { unitKerja: 'Biro Sumber Daya Manusia', skKepala: 65, suratPerintah: 85, suratTugas: 140, suratKeluar: 360, totalDokumen: 650 },
        { unitKerja: 'Dit. Pengelolaan Pertanahan', skKepala: 24, suratPerintah: 26, suratTugas: 110, suratKeluar: 430, totalDokumen: 590 },
        { unitKerja: 'Dit. Infrastruktur Kawasan', skKepala: 20, suratPerintah: 50, suratTugas: 130, suratKeluar: 370, totalDokumen: 570 },
        { unitKerja: 'Badan Usaha Pelabuhan', skKepala: 14, suratPerintah: 25, suratTugas: 80, suratKeluar: 310, totalDokumen: 429 },
        { unitKerja: 'Dit. PTSP & Investasi', skKepala: 18, suratPerintah: 24, suratTugas: 75, suratKeluar: 290, totalDokumen: 407 },
        { unitKerja: 'BU Rumah Sakit (RSBP)', skKepala: 11, suratPerintah: 20, suratTugas: 65, suratKeluar: 230, totalDokumen: 326 },
        { unitKerja: 'Satuan Pemeriksa Intern (SPI)', skKepala: 7, suratPerintah: 32, suratTugas: 105, suratKeluar: 170, totalDokumen: 314 },
      ],
      '2026-TW II': [
        { unitKerja: 'Biro Umum (Sekretariat)', skKepala: 38, suratPerintah: 78, suratTugas: 175, suratKeluar: 780, totalDokumen: 1071 },
        { unitKerja: 'Biro Hukum & Humas', skKepala: 98, suratPerintah: 28, suratTugas: 95, suratKeluar: 540, totalDokumen: 761 },
        { unitKerja: 'Biro Keuangan (BLU)', skKepala: 26, suratPerintah: 42, suratTugas: 135, suratKeluar: 470, totalDokumen: 673 },
        { unitKerja: 'Biro Sumber Daya Manusia', skKepala: 58, suratPerintah: 88, suratTugas: 145, suratKeluar: 380, totalDokumen: 671 },
        { unitKerja: 'Dit. Pengelolaan Pertanahan', skKepala: 22, suratPerintah: 28, suratTugas: 115, suratKeluar: 460, totalDokumen: 625 },
        { unitKerja: 'Dit. Infrastruktur Kawasan', skKepala: 21, suratPerintah: 52, suratTugas: 140, suratKeluar: 390, totalDokumen: 603 },
        { unitKerja: 'Badan Usaha Pelabuhan', skKepala: 13, suratPerintah: 26, suratTugas: 85, suratKeluar: 330, totalDokumen: 454 },
        { unitKerja: 'Dit. PTSP & Investasi', skKepala: 17, suratPerintah: 23, suratTugas: 80, suratKeluar: 310, totalDokumen: 430 },
        { unitKerja: 'BU Rumah Sakit (RSBP)', skKepala: 10, suratPerintah: 22, suratTugas: 70, suratKeluar: 250, totalDokumen: 352 },
        { unitKerja: 'Satuan Pemeriksa Intern (SPI)', skKepala: 6, suratPerintah: 34, suratTugas: 110, suratKeluar: 180, totalDokumen: 330 },
      ],
      '2026-TW III': [
        { unitKerja: 'Biro Umum (Sekretariat)', skKepala: 35, suratPerintah: 70, suratTugas: 155, suratKeluar: 710, totalDokumen: 970 },
        { unitKerja: 'Biro Hukum & Humas', skKepala: 92, suratPerintah: 27, suratTugas: 85, suratKeluar: 500, totalDokumen: 704 },
        { unitKerja: 'Biro Keuangan (BLU)', skKepala: 23, suratPerintah: 36, suratTugas: 120, suratKeluar: 430, totalDokumen: 609 },
        { unitKerja: 'Biro Sumber Daya Manusia', skKepala: 49, suratPerintah: 74, suratTugas: 125, suratKeluar: 330, totalDokumen: 578 },
        { unitKerja: 'Dit. Pengelolaan Pertanahan', skKepala: 21, suratPerintah: 23, suratTugas: 98, suratKeluar: 410, totalDokumen: 552 },
        { unitKerja: 'Dit. Infrastruktur Kawasan', skKepala: 17, suratPerintah: 44, suratTugas: 120, suratKeluar: 350, totalDokumen: 531 },
        { unitKerja: 'Badan Usaha Pelabuhan', skKepala: 12, suratPerintah: 23, suratTugas: 78, suratKeluar: 290, totalDokumen: 403 },
        { unitKerja: 'Dit. PTSP & Investasi', skKepala: 15, suratPerintah: 21, suratTugas: 68, suratKeluar: 280, totalDokumen: 384 },
        { unitKerja: 'BU Rumah Sakit (RSBP)', skKepala: 9, suratPerintah: 18, suratTugas: 58, suratKeluar: 220, totalDokumen: 305 },
        { unitKerja: 'Satuan Pemeriksa Intern (SPI)', skKepala: 6, suratPerintah: 27, suratTugas: 90, suratKeluar: 155, totalDokumen: 278 },
      ],
      '2026-TW IV': [
        { unitKerja: 'Biro Umum (Sekretariat)', skKepala: 27, suratPerintah: 62, suratTugas: 130, suratKeluar: 630, totalDokumen: 849 },
        { unitKerja: 'Biro Hukum & Humas', skKepala: 80, suratPerintah: 25, suratTugas: 70, suratKeluar: 430, totalDokumen: 605 },
        { unitKerja: 'Biro Keuangan (BLU)', skKepala: 18, suratPerintah: 27, suratTugas: 100, suratKeluar: 370, totalDokumen: 515 },
        { unitKerja: 'Biro Sumber Daya Manusia', skKepala: 38, suratPerintah: 63, suratTugas: 110, suratKeluar: 280, totalDokumen: 491 },
        { unitKerja: 'Dit. Pengelolaan Pertanahan', skKepala: 18, suratPerintah: 18, suratTugas: 87, suratKeluar: 380, totalDokumen: 503 },
        { unitKerja: 'Dit. Infrastruktur Kawasan', skKepala: 14, suratPerintah: 34, suratTugas: 100, suratKeluar: 310, totalDokumen: 458 },
        { unitKerja: 'Badan Usaha Pelabuhan', skKepala: 9, suratPerintah: 18, suratTugas: 67, suratKeluar: 250, totalDokumen: 344 },
        { unitKerja: 'Dit. PTSP & Investasi', skKepala: 14, suratPerintah: 17, suratTugas: 57, suratKeluar: 240, totalDokumen: 328 },
        { unitKerja: 'BU Rumah Sakit (RSBP)', skKepala: 8, suratPerintah: 15, suratTugas: 47, suratKeluar: 190, totalDokumen: 260 },
        { unitKerja: 'Satuan Pemeriksa Intern (SPI)', skKepala: 5, suratPerintah: 22, suratTugas: 75, suratKeluar: 135, totalDokumen: 237 },
      ],
    },
  },

  // 5. KOMPOSISI ARSIP PER UNIT KERJA DI RECORD CENTRE (10 TERATAS)
  recordCentreArsip: {
    datasetName: 'Rekapitulasi Arsip Unit Kerja di Record Centre BP Batam (Lembaga Kearsipan)',
    records: [
      { unitKerja: 'Dit. Pengelolaan Pertanahan', arsipInaktif: 4250, usulMusnah: 680, permanen: 1420, musnah: 310, totalArsip: 6660 },
      { unitKerja: 'Biro Umum (Sekretariat)', arsipInaktif: 3680, usulMusnah: 840, permanen: 950, musnah: 520, totalArsip: 5990 },
      { unitKerja: 'Biro Keuangan (BLU)', arsipInaktif: 3420, usulMusnah: 590, permanen: 890, musnah: 410, totalArsip: 5310 },
      { unitKerja: 'Biro Sumber Daya Manusia', arsipInaktif: 2950, usulMusnah: 410, permanen: 1120, musnah: 240, totalArsip: 4720 },
      { unitKerja: 'Dit. Infrastruktur Kawasan', arsipInaktif: 2780, usulMusnah: 360, permanen: 820, musnah: 190, totalArsip: 4150 },
      { unitKerja: 'Badan Usaha Pelabuhan', arsipInaktif: 2150, usulMusnah: 290, permanen: 640, musnah: 150, totalArsip: 3230 },
      { unitKerja: 'BU Rumah Sakit (RSBP)', arsipInaktif: 1980, usulMusnah: 320, permanen: 510, musnah: 180, totalArsip: 2990 },
      { unitKerja: 'Biro Hukum & Humas', arsipInaktif: 1650, usulMusnah: 180, permanen: 780, musnah: 90, totalArsip: 2700 },
      { unitKerja: 'Dit. PTSP & Investasi', arsipInaktif: 1520, usulMusnah: 240, permanen: 450, musnah: 120, totalArsip: 2330 },
      { unitKerja: 'BU SPAM & Lingkungan', arsipInaktif: 1240, usulMusnah: 190, permanen: 380, musnah: 110, totalArsip: 1920 },
    ],
  },

  // 6. KUNJUNGAN WEBSITE PER KATEGORI (LINE CHART MULTI-LINE JAN-DES)
  kunjunganWebsite: {
    datasetName: 'Jumlah Kunjungan Website Resmi BP Batam (Web Analytics & Portal Terpadu)',
    kategoriList: [
      { key: 'layananInvestasi', label: 'Layanan Investasi & Perizinan', color: '#1D4ED8' },
      { key: 'beritaPublikasi', label: 'Berita & Publikasi Resmi', color: '#0284C7' },
      { key: 'portalIboss', label: 'Portal IBOSS & OSS Online', color: '#0D9488' },
      { key: 'ppidTransparansi', label: 'PPID & Transparansi Informasi', color: '#7C3AED' },
      { key: 'katalogAsetLelang', label: 'Katalog Aset & Lelang BMN', color: '#F59E0B' },
    ],
    monthlyRecords: [
      { bulan: 'Jan', layananInvestasi: 42100, beritaPublikasi: 28500, portalIboss: 34200, ppidTransparansi: 12400, katalogAsetLelang: 8900, total: 126100 },
      { bulan: 'Feb', layananInvestasi: 44300, beritaPublikasi: 29800, portalIboss: 36100, ppidTransparansi: 13100, katalogAsetLelang: 9400, total: 132700 },
      { bulan: 'Mar', layananInvestasi: 49800, beritaPublikasi: 34200, portalIboss: 39500, ppidTransparansi: 14600, katalogAsetLelang: 11200, total: 149300 },
      { bulan: 'Apr', layananInvestasi: 52400, beritaPublikasi: 32600, portalIboss: 42800, ppidTransparansi: 15200, katalogAsetLelang: 12800, total: 155800 },
      { bulan: 'Mei', layananInvestasi: 55600, beritaPublikasi: 36400, portalIboss: 45200, ppidTransparansi: 16800, katalogAsetLelang: 14500, total: 168500 },
      { bulan: 'Jun', layananInvestasi: 58900, beritaPublikasi: 38900, portalIboss: 47900, ppidTransparansi: 18200, katalogAsetLelang: 16200, total: 180100 },
      { bulan: 'Jul', layananInvestasi: 62400, beritaPublikasi: 41200, portalIboss: 50400, ppidTransparansi: 19400, katalogAsetLelang: 17800, total: 191200 },
      { bulan: 'Agu', layananInvestasi: 64800, beritaPublikasi: 43500, portalIboss: 52800, ppidTransparansi: 20100, katalogAsetLelang: 19100, total: 200300 },
      { bulan: 'Sep', layananInvestasi: 67200, beritaPublikasi: 44800, portalIboss: 54600, ppidTransparansi: 21300, katalogAsetLelang: 20400, total: 208300 },
      { bulan: 'Okt', layananInvestasi: 70500, beritaPublikasi: 46900, portalIboss: 57200, ppidTransparansi: 22800, katalogAsetLelang: 21900, total: 219300 },
      { bulan: 'Nov', layananInvestasi: 72800, beritaPublikasi: 48500, portalIboss: 59100, ppidTransparansi: 23600, katalogAsetLelang: 23100, total: 227100 },
      { bulan: 'Des', layananInvestasi: 76400, beritaPublikasi: 51200, portalIboss: 62400, ppidTransparansi: 25400, katalogAsetLelang: 24800, total: 240200 },
    ],
  },
};
