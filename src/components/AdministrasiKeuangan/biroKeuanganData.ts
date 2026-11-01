// ============================================================================
// DATASET MASTER BIRO KEUANGAN BP BATAM
// Seluruh data disimpan dalam satu objek JSON terpadu agar mudah diganti data riil
// ============================================================================

export interface CapaianTriwulanItem {
  triwulanTahun: string;
  capaianBelanja: number;     // dalam %
  capaianPenerimaan: number;  // dalam %
}

export interface AnggaranRealisasiUraianItem {
  uraian: string;
  kategori: string;
  anggaran: number;   // Miliar Rupiah
  realisasi: number;  // Miliar Rupiah
  persentase: number; // %
}

export interface PnbpLayananLeafItem {
  name: string;
  unit: string;
  targetMiliar: number;
  tarif: string;
  volume: string;
  color: string;
}

export interface PnbpUnitNodeItem {
  name: string;
  targetUnitMiliar: number;
  children: PnbpLayananLeafItem[];
}

export interface PenerimaanSumberDanaBulanan {
  bulan: string;
  pelabuhan: number; // Miliar Rupiah
  uwtLahan: number;
  bandara: number;
  rsbpMedis: number;
  spamAir: number;
  total: number;
}

export interface PiutangPelangganItem {
  namaPelanggan: string;
  kurang1Tahun: number; // Miliar Rupiah
  antara1sd2Tahun: number;
  antara2sd3Tahun: number;
  lebih3Tahun: number;
  saldoAkhir: number;
}

export interface SaldoBankItem {
  name: string;
  shortName: string;
  saldoMiliar: number;
  porsiPersen: number;
  kategoriRekening: string;
  kegunaanRekening: string;
  color: string;
}

export interface BiroKeuanganMasterData {
  metadata: {
    unit: string;
    induk: string;
    pemutakhiranTerakhir: string;
    temaVisual: string;
  };
  capaianRealisasiYtd: {
    datasetName: string;
    accessLabel: 'Terbuka';
    quarterlyRecords: CapaianTriwulanItem[];
  };
  anggaranVsRealisasi: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    filterTriwulanList: string[];
    filterJenisList: string[];
    recordsByFilter: Record<string, AnggaranRealisasiUraianItem[]>;
  };
  targetPnbpTreemap: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<string, { totalTargetMiliar: number; nodes: PnbpUnitNodeItem[] }>;
  };
  penerimaanSumberDana: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterUnitList: string[];
    monthlyRecords: Record<string, PenerimaanSumberDanaBulanan[]>;
  };
  piutangMenurutUmur: {
    datasetName: string;
    accessLabel: 'Tertutup';
    records: PiutangPelangganItem[];
    totalSaldoMiliar: number;
    totalPelanggan: number;
  };
  saldoBankRealTime: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterKategoriUnitList: string[];
    filterTanggalList: string[];
    byFilter: Record<string, { totalSaldoMiliar: number; jumlahBank: number; banks: SaldoBankItem[] }>;
  };
}

export const BIRO_KEUANGAN_MASTER_DATA: BiroKeuanganMasterData = {
  metadata: {
    unit: 'Biro Keuangan BP Batam',
    induk: 'Deputi Bidang Administrasi dan Keuangan (DEP-A1)',
    pemutakhiranTerakhir: 'Oktober 2026',
    temaVisual: 'Clean Blue & White Theme (2-Column Grid)',
  },

  // 1. KARTU 1 - CAPAIAN REALISASI BELANJA DAN PENERIMAAN (YTD)
  capaianRealisasiYtd: {
    datasetName: 'Persentase Realisasi Belanja dan Penerimaan BP Batam (Terbuka, pertriwulan)',
    accessLabel: 'Terbuka',
    quarterlyRecords: [
      { triwulanTahun: 'TW I 2025', capaianBelanja: 19.8, capaianPenerimaan: 24.2 },
      { triwulanTahun: 'TW II 2025', capaianBelanja: 44.5, capaianPenerimaan: 49.8 },
      { triwulanTahun: 'TW III 2025', capaianBelanja: 69.2, capaianPenerimaan: 74.5 },
      { triwulanTahun: 'TW IV 2025', capaianBelanja: 95.8, capaianPenerimaan: 104.2 },
      { triwulanTahun: 'TW I 2026', capaianBelanja: 22.4, capaianPenerimaan: 26.5 },
      { triwulanTahun: 'TW II 2026', capaianBelanja: 51.6, capaianPenerimaan: 53.4 },
      { triwulanTahun: 'TW III 2026', capaianBelanja: 85.5, capaianPenerimaan: 77.3 },
    ],
  },

  // 2. KARTU 2 - ANGGARAN VS REALISASI PER KATEGORI (CLUSTERED BAR HORIZONTAL)
  anggaranVsRealisasi: {
    datasetName: 'Laporan Realisasi Anggaran (Tertutup, pertriwulan)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    filterTriwulanList: ['Semua Triwulan', 'TW I', 'TW II', 'TW III'],
    filterJenisList: ['Semua Jenis', 'Belanja Operasional', 'Belanja Modal'],
    recordsByFilter: {
      '2026-Semua Triwulan-Semua Jenis': [
        { uraian: 'Belanja Pegawai', kategori: 'Operasional', anggaran: 412.5, realisasi: 365.2, persentase: 88.5 },
        { uraian: 'Belanja Barang & Jasa', kategori: 'Operasional', anggaran: 648.2, realisasi: 574.8, persentase: 88.7 },
        { uraian: 'Belanja Pemeliharaan', kategori: 'Operasional', anggaran: 245.8, realisasi: 204.3, persentase: 83.1 },
        { uraian: 'Belanja Modal Infrastruktur', kategori: 'Modal', anggaran: 685.0, realisasi: 568.5, persentase: 83.0 },
        { uraian: 'Belanja Modal Gedung & Mesin', kategori: 'Modal', anggaran: 276.0, realisasi: 225.1, persentase: 81.6 },
      ],
      '2026-TW III-Semua Jenis': [
        { uraian: 'Belanja Pegawai', kategori: 'Operasional', anggaran: 310.0, realisasi: 278.4, persentase: 89.8 },
        { uraian: 'Belanja Barang & Jasa', kategori: 'Operasional', anggaran: 485.0, realisasi: 428.2, persentase: 88.3 },
        { uraian: 'Belanja Pemeliharaan', kategori: 'Operasional', anggaran: 184.0, realisasi: 152.8, persentase: 83.0 },
        { uraian: 'Belanja Modal Infrastruktur', kategori: 'Modal', anggaran: 512.0, realisasi: 425.6, persentase: 83.1 },
        { uraian: 'Belanja Modal Gedung & Mesin', kategori: 'Modal', anggaran: 207.0, realisasi: 168.2, persentase: 81.3 },
      ],
      '2026-Semua Triwulan-Belanja Operasional': [
        { uraian: 'Gaji & Tunjangan Pegawai', kategori: 'Operasional', anggaran: 312.5, realisasi: 284.1, persentase: 90.9 },
        { uraian: 'Honorarium & Lembur', kategori: 'Operasional', anggaran: 100.0, realisasi: 81.1, persentase: 81.1 },
        { uraian: 'Keperluan Perkantoran', kategori: 'Operasional', anggaran: 285.2, realisasi: 254.8, persentase: 89.3 },
        { uraian: 'Jasa Konsultansi & Diklat', kategori: 'Operasional', anggaran: 363.0, realisasi: 320.0, persentase: 88.2 },
        { uraian: 'Pemeliharaan Aset BMN', kategori: 'Operasional', anggaran: 245.8, realisasi: 204.3, persentase: 83.1 },
      ],
      '2026-Semua Triwulan-Belanja Modal': [
        { uraian: 'Jalan & Jembatan Kawasan', kategori: 'Modal', anggaran: 345.0, realisasi: 292.0, persentase: 84.6 },
        { uraian: 'Dermaga & Terminal Petikemas', kategori: 'Modal', anggaran: 215.0, realisasi: 178.5, persentase: 83.0 },
        { uraian: 'Jaringan Pipa SPAM', kategori: 'Modal', anggaran: 125.0, realisasi: 98.0, persentase: 78.4 },
        { uraian: 'Gedung Kantor & Fasilitas RS', kategori: 'Modal', anggaran: 165.0, realisasi: 135.8, persentase: 82.3 },
        { uraian: 'Peralatan Medis & IT Server', kategori: 'Modal', anggaran: 111.0, realisasi: 89.3, persentase: 80.5 },
      ],
    },
  },

  // 3. KARTU 3 - TARGET PNBP PER UNIT DAN LAYANAN (TREEMAP)
  targetPnbpTreemap: {
    datasetName: 'Rincian dan Rekapitulasi Target PNBP (Tertutup, pertahun)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    byTahun: {
      '2026': {
        totalTargetMiliar: 2447.8,
        nodes: [
          {
            name: 'BU Pelabuhan',
            targetUnitMiliar: 742.5,
            children: [
              { name: 'Jasa Dermaga & Tambat', unit: 'BU Pelabuhan', targetMiliar: 325.0, tarif: 'Rp 45.000 / GT / Hari', volume: '7.222 Call Kapal', color: '#1e40af' },
              { name: 'Bongkar Muat Petikemas', unit: 'BU Pelabuhan', targetMiliar: 275.5, tarif: 'Rp 380.000 / Box Teus', volume: '725.000 TEUs', color: '#2563eb' },
              { name: 'Pelayanan Pas Pelabuhan', unit: 'BU Pelabuhan', targetMiliar: 142.0, tarif: 'Rp 100.000 / Penumpang', volume: '1.420.000 Penumpang', color: '#3b82f6' },
            ],
          },
          {
            name: 'Dit. Pengelolaan Lahan',
            targetUnitMiliar: 685.3,
            children: [
              { name: 'UWT Lahan Komersial', unit: 'Dit. Lahan', targetMiliar: 410.3, tarif: 'Rp 85.000 - Rp 250.000 / m²', volume: '2.450 Ha Alokasi', color: '#0284c7' },
              { name: 'UWT Lahan Industri', unit: 'Dit. Lahan', targetMiliar: 195.0, tarif: 'Rp 65.000 / m²', volume: '3.000 Ha Kawasan', color: '#0ea5e9' },
              { name: 'Rekomendasi Pemecahan PL', unit: 'Dit. Lahan', targetMiliar: 80.0, tarif: 'Rp 2.500.000 / Berkas', volume: '32.000 Berkas', color: '#38bdf8' },
            ],
          },
          {
            name: 'BU Bandara',
            targetUnitMiliar: 395.0,
            children: [
              { name: 'PJP2U Penumpang Udara', unit: 'BU Bandara', targetMiliar: 235.0, tarif: 'Rp 60.000 / Penumpang', volume: '3.916.000 Orang', color: '#0d9488' },
              { name: 'Jasa Pendaratan & Aviasi', unit: 'BU Bandara', targetMiliar: 160.0, tarif: 'Rp 8.500 / Ton MTOW', volume: '18.823 Flts', color: '#14b8a6' },
            ],
          },
          {
            name: 'BU RSBP Batam',
            targetUnitMiliar: 345.0,
            children: [
              { name: 'Layanan Rawat Inap & Bedah', unit: 'BU RSBP', targetMiliar: 195.0, tarif: 'Paket INA-CBGs & Umum', volume: '18.500 Pasien', color: '#7c3aed' },
              { name: 'Hemodialisa & Spesialis', unit: 'BU RSBP', targetMiliar: 150.0, tarif: 'Rp 950.000 / Tindakan', volume: '157.890 Sesi', color: '#8b5cf6' },
            ],
          },
          {
            name: 'BU SPAM & Lainnya',
            targetUnitMiliar: 280.0,
            children: [
              { name: 'Pengelolaan Air Baku Dam', unit: 'BU SPAM', targetMiliar: 185.0, tarif: 'Rp 1.850 / m³', volume: '100.000.000 m³', color: '#475569' },
              { name: 'Sewa Fasilitas & Aset Lain', unit: 'Biro Umum', targetMiliar: 95.0, tarif: 'Sesuai Kepka Tarif BMN', volume: '412 Titik Lokasi', color: '#64748b' },
            ],
          },
        ],
      },
      '2025': {
        totalTargetMiliar: 2280.0,
        nodes: [
          {
            name: 'BU Pelabuhan',
            targetUnitMiliar: 690.0,
            children: [
              { name: 'Jasa Dermaga & Tambat', unit: 'BU Pelabuhan', targetMiliar: 300.0, tarif: 'Rp 42.000 / GT', volume: '7.100 Call', color: '#1e40af' },
              { name: 'Bongkar Muat Petikemas', unit: 'BU Pelabuhan', targetMiliar: 260.0, tarif: 'Rp 360.000 / Box', volume: '722.000 TEUs', color: '#2563eb' },
              { name: 'Pelayanan Pas Pelabuhan', unit: 'BU Pelabuhan', targetMiliar: 130.0, tarif: 'Rp 90.000 / Orang', volume: '1.444.000 Org', color: '#3b82f6' },
            ],
          },
          {
            name: 'Dit. Pengelolaan Lahan',
            targetUnitMiliar: 640.0,
            children: [
              { name: 'UWT Lahan Komersial', unit: 'Dit. Lahan', targetMiliar: 380.0, tarif: 'Rp 80.000 / m²', volume: '2.300 Ha', color: '#0284c7' },
              { name: 'UWT Lahan Industri', unit: 'Dit. Lahan', targetMiliar: 190.0, tarif: 'Rp 60.000 / m²', volume: '2.900 Ha', color: '#0ea5e9' },
              { name: 'Rekomendasi Pemecahan PL', unit: 'Dit. Lahan', targetMiliar: 70.0, tarif: 'Rp 2.500.000', volume: '28.000 Berkas', color: '#38bdf8' },
            ],
          },
          {
            name: 'BU Bandara',
            targetUnitMiliar: 370.0,
            children: [
              { name: 'PJP2U Penumpang Udara', unit: 'BU Bandara', targetMiliar: 220.0, tarif: 'Rp 55.000', volume: '4.000.000 Org', color: '#0d9488' },
              { name: 'Jasa Pendaratan & Aviasi', unit: 'BU Bandara', targetMiliar: 150.0, tarif: 'Rp 8.000 / Ton', volume: '18.750 Flts', color: '#14b8a6' },
            ],
          },
          {
            name: 'BU RSBP Batam',
            targetUnitMiliar: 320.0,
            children: [
              { name: 'Layanan Rawat Inap & Bedah', unit: 'BU RSBP', targetMiliar: 180.0, tarif: 'Paket INA-CBGs', volume: '17.500 Pasien', color: '#7c3aed' },
              { name: 'Hemodialisa & Spesialis', unit: 'BU RSBP', targetMiliar: 140.0, tarif: 'Rp 900.000 / Sesi', volume: '155.000 Sesi', color: '#8b5cf6' },
            ],
          },
          {
            name: 'BU SPAM & Lainnya',
            targetUnitMiliar: 260.0,
            children: [
              { name: 'Pengelolaan Air Baku Dam', unit: 'BU SPAM', targetMiliar: 170.0, tarif: 'Rp 1.700 / m³', volume: '100.000.000 m³', color: '#475569' },
              { name: 'Sewa Fasilitas & Aset Lain', unit: 'Biro Umum', targetMiliar: 90.0, tarif: 'Sesuai Kepka', volume: '390 Lokasi', color: '#64748b' },
            ],
          },
        ],
      },
    },
  },

  // 4. KARTU 4 - PENERIMAAN PER SUMBER DANA (STACKED COLUMN)
  penerimaanSumberDana: {
    datasetName: 'Laporan Penerimaan Sumber Dana (Tertutup, perbulan)',
    accessLabel: 'Tertutup',
    filterUnitList: ['Semua Unit Kerja', 'BU Pelabuhan', 'Dit. Pengelolaan Lahan', 'BU Bandara', 'BU RSBP', 'BU SPAM'],
    monthlyRecords: {
      'Semua Unit Kerja': [
        { bulan: 'Jan', pelabuhan: 24.5, uwtLahan: 18.2, bandara: 11.6, rsbpMedis: 9.0, spamAir: 7.2, total: 70.5 },
        { bulan: 'Feb', pelabuhan: 26.0, uwtLahan: 19.5, bandara: 12.0, rsbpMedis: 9.4, spamAir: 7.5, total: 74.4 },
        { bulan: 'Mar', pelabuhan: 31.2, uwtLahan: 24.0, bandara: 14.5, rsbpMedis: 11.2, spamAir: 8.4, total: 89.3 },
        { bulan: 'Apr', pelabuhan: 29.5, uwtLahan: 22.4, bandara: 13.8, rsbpMedis: 10.8, spamAir: 8.0, total: 84.5 },
        { bulan: 'Mei', pelabuhan: 33.4, uwtLahan: 25.1, bandara: 15.2, rsbpMedis: 12.0, spamAir: 8.8, total: 94.5 },
        { bulan: 'Jun', pelabuhan: 35.8, uwtLahan: 27.0, bandara: 16.5, rsbpMedis: 13.1, spamAir: 9.2, total: 101.6 },
        { bulan: 'Jul', pelabuhan: 32.0, uwtLahan: 23.8, bandara: 15.0, rsbpMedis: 11.8, spamAir: 8.5, total: 91.1 },
        { bulan: 'Agu', pelabuhan: 36.2, uwtLahan: 28.5, bandara: 17.2, rsbpMedis: 13.5, spamAir: 9.6, total: 105.0 },
        { bulan: 'Sep', pelabuhan: 34.0, uwtLahan: 26.2, bandara: 16.0, rsbpMedis: 12.6, spamAir: 9.0, total: 97.8 },
        { bulan: 'Okt', pelabuhan: 12.8, uwtLahan: 9.5, bandara: 7.6, rsbpMedis: 4.9, spamAir: 3.5, total: 38.3 },
        { bulan: 'Nov', pelabuhan: 0.0, uwtLahan: 0.0, bandara: 0.0, rsbpMedis: 0.0, spamAir: 0.0, total: 0.0 },
        { bulan: 'Des', pelabuhan: 0.0, uwtLahan: 0.0, bandara: 0.0, rsbpMedis: 0.0, spamAir: 0.0, total: 0.0 },
      ],
      'BU Pelabuhan': [
        { bulan: 'Jan', pelabuhan: 24.5, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 24.5 },
        { bulan: 'Feb', pelabuhan: 26.0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 26.0 },
        { bulan: 'Mar', pelabuhan: 31.2, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 31.2 },
        { bulan: 'Apr', pelabuhan: 29.5, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 29.5 },
        { bulan: 'Mei', pelabuhan: 33.4, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 33.4 },
        { bulan: 'Jun', pelabuhan: 35.8, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 35.8 },
        { bulan: 'Jul', pelabuhan: 32.0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 32.0 },
        { bulan: 'Agu', pelabuhan: 36.2, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 36.2 },
        { bulan: 'Sep', pelabuhan: 34.0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 34.0 },
        { bulan: 'Okt', pelabuhan: 12.8, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 12.8 },
        { bulan: 'Nov', pelabuhan: 0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 0 },
        { bulan: 'Des', pelabuhan: 0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 0 },
      ],
      'Dit. Pengelolaan Lahan': [
        { bulan: 'Jan', pelabuhan: 0, uwtLahan: 18.2, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 18.2 },
        { bulan: 'Feb', pelabuhan: 0, uwtLahan: 19.5, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 19.5 },
        { bulan: 'Mar', pelabuhan: 0, uwtLahan: 24.0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 24.0 },
        { bulan: 'Apr', pelabuhan: 0, uwtLahan: 22.4, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 22.4 },
        { bulan: 'Mei', pelabuhan: 0, uwtLahan: 25.1, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 25.1 },
        { bulan: 'Jun', pelabuhan: 0, uwtLahan: 27.0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 27.0 },
        { bulan: 'Jul', pelabuhan: 0, uwtLahan: 23.8, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 23.8 },
        { bulan: 'Agu', pelabuhan: 0, uwtLahan: 28.5, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 28.5 },
        { bulan: 'Sep', pelabuhan: 0, uwtLahan: 26.2, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 26.2 },
        { bulan: 'Okt', pelabuhan: 0, uwtLahan: 9.5, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 9.5 },
        { bulan: 'Nov', pelabuhan: 0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 0 },
        { bulan: 'Des', pelabuhan: 0, uwtLahan: 0, bandara: 0, rsbpMedis: 0, spamAir: 0, total: 0 },
      ],
    },
  },

  // 5. KARTU 5 - PIUTANG PER PELANGGAN MENURUT UMUR (10 PELANGGAN TERATAS)
  piutangMenurutUmur: {
    datasetName: 'Rekapitulasi Kualitas Piutang (Tertutup, pertahun)',
    accessLabel: 'Tertutup',
    totalSaldoMiliar: 128.4,
    totalPelanggan: 10,
    records: [
      { namaPelanggan: 'PT Batam Shipyard Marine', kurang1Tahun: 14.5, antara1sd2Tahun: 5.2, antara2sd3Tahun: 2.1, lebih3Tahun: 0.8, saldoAkhir: 22.6 },
      { namaPelanggan: 'PT Citra Dermaga Kabil', kurang1Tahun: 12.0, antara1sd2Tahun: 4.1, antara2sd3Tahun: 1.8, lebih3Tahun: 0.5, saldoAkhir: 18.4 },
      { namaPelanggan: 'PT Barelang Megah Logistik', kurang1Tahun: 9.8, antara1sd2Tahun: 3.5, antara2sd3Tahun: 1.4, lebih3Tahun: 0.3, saldoAkhir: 15.0 },
      { namaPelanggan: 'PT Panbil Industrial Park', kurang1Tahun: 8.5, antara1sd2Tahun: 2.9, antara2sd3Tahun: 1.1, lebih3Tahun: 0.2, saldoAkhir: 12.7 },
      { namaPelanggan: 'PT Sat Nusapersada Tbk', kurang1Tahun: 7.8, antara1sd2Tahun: 2.4, antara2sd3Tahun: 0.9, lebih3Tahun: 0.1, saldoAkhir: 11.2 },
      { namaPelanggan: 'PT Batam Aeros Technic', kurang1Tahun: 7.2, antara1sd2Tahun: 2.0, antara2sd3Tahun: 0.8, lebih3Tahun: 0.2, saldoAkhir: 10.2 },
      { namaPelanggan: 'PT McDermott Indonesia', kurang1Tahun: 6.8, antara1sd2Tahun: 1.8, antara2sd3Tahun: 0.6, lebih3Tahun: 0.2, saldoAkhir: 9.4 },
      { namaPelanggan: 'PT Pelayaran Samudra Batam', kurang1Tahun: 5.9, antara1sd2Tahun: 1.6, antara2sd3Tahun: 0.7, lebih3Tahun: 0.4, saldoAkhir: 8.6 },
      { namaPelanggan: 'PT Karimun Jaya Transport', kurang1Tahun: 5.4, antara1sd2Tahun: 1.5, antara2sd3Tahun: 0.5, lebih3Tahun: 0.1, saldoAkhir: 7.5 },
      { namaPelanggan: 'PT Medika Prima Batam', kurang1Tahun: 4.8, antara1sd2Tahun: 1.2, antara2sd3Tahun: 0.4, lebih3Tahun: 0.1, saldoAkhir: 6.5 },
    ],
  },

  // 6. KARTU 6 - SALDO BANK PER BANK DAN KATEGORI REKENING (TREEMAP REAL TIME)
  saldoBankRealTime: {
    datasetName: 'Laporan Saldo Bank Real Time (Tertutup, perbulan)',
    accessLabel: 'Tertutup',
    filterKategoriUnitList: ['Semua Kategori Unit', 'Badan Usaha / BLU', 'Kantor Pusat BP Batam'],
    filterTanggalList: ['31 Oktober 2026', '30 September 2026', '31 Agustus 2026'],
    byFilter: {
      'Semua Kategori Unit-31 Oktober 2026': {
        totalSaldoMiliar: 1428.5,
        jumlahBank: 5,
        banks: [
          { name: 'Bank Mandiri', shortName: 'Mandiri', saldoMiliar: 624.5, porsiPersen: 43.7, kategoriRekening: 'Rekening Operasional & Penampungan BLU', kegunaanRekening: 'Operasional Utama & Penampungan Pendapatan Pelabuhan', color: '#1e40af' },
          { name: 'Bank BRI', shortName: 'BRI', saldoMiliar: 418.2, porsiPersen: 29.3, kategoriRekening: 'Rekening Pengeluaran & Payroll', kegunaanRekening: 'Gaji Pegawai, Belanja Modal & Penampungan UWT', color: '#2563eb' },
          { name: 'Bank BNI', shortName: 'BNI', saldoMiliar: 352.1, porsiPersen: 24.6, kategoriRekening: 'Rekening Transaksi & Escrow', kegunaanRekening: 'Operasional RSBP Batam & Jaminan Investasi', color: '#0284c7' },
          { name: 'BRK Syariah', shortName: 'BRKS', saldoMiliar: 215.4, porsiPersen: 15.1, kategoriRekening: 'Rekening Bagi Hasil & Cadangan Kas', kegunaanRekening: 'Cadangan Kas Likuiditas & Dana Abadi', color: '#0d9488' },
          { name: 'BTN & Bank Lain', shortName: 'BTN & Lain', saldoMiliar: 242.6, porsiPersen: 17.0, kategoriRekening: 'Rekening Penampungan Khusus', kegunaanRekening: 'Penerimaan PNBP Bandara & Fasilitas Perumahan', color: '#475569' },
        ],
      },
      'Badan Usaha / BLU-31 Oktober 2026': {
        totalSaldoMiliar: 894.2,
        jumlahBank: 4,
        banks: [
          { name: 'Bank Mandiri', shortName: 'Mandiri', saldoMiliar: 412.0, porsiPersen: 46.1, kategoriRekening: 'Operasional Pelabuhan & Terminal', kegunaanRekening: 'Penerimaan Jasa Kepelabuhanan', color: '#1e40af' },
          { name: 'Bank BNI', shortName: 'BNI', saldoMiliar: 248.5, porsiPersen: 27.8, kategoriRekening: 'Operasional Rumah Sakit (RSBP)', kegunaanRekening: 'Pelayanan Pasien & Farmasi RSBP', color: '#0284c7' },
          { name: 'Bank BRI', shortName: 'BRI', saldoMiliar: 142.7, porsiPersen: 16.0, kategoriRekening: 'Operasional SPAM Batam', kegunaanRekening: 'Distribusi Air Bersih Kawasan', color: '#2563eb' },
          { name: 'BTN & Bank Lain', shortName: 'BTN & Lain', saldoMiliar: 91.0, porsiPersen: 10.2, kategoriRekening: 'Operasional Bandara Hang Nadim', kegunaanRekening: 'Aviasi & Jasa Kebandarudaraan', color: '#475569' },
        ],
      },
      'Kantor Pusat BP Batam-31 Oktober 2026': {
        totalSaldoMiliar: 534.3,
        jumlahBank: 3,
        banks: [
          { name: 'Bank BRI', shortName: 'BRI', saldoMiliar: 275.5, porsiPersen: 51.6, kategoriRekening: 'Rekening Pengeluaran APBN/BLU', kegunaanRekening: 'Gaji Pegawai & Belanja Operasional Pusat', color: '#2563eb' },
          { name: 'Bank Mandiri', shortName: 'Mandiri', saldoMiliar: 212.5, porsiPersen: 39.8, kategoriRekening: 'Rekening Penampungan UWT Pertanahan', kegunaanRekening: 'Penerimaan UWT 30 Tahun', color: '#1e40af' },
          { name: 'BRK Syariah', shortName: 'BRKS', saldoMiliar: 46.3, porsiPersen: 8.7, kategoriRekening: 'Rekening Cadangan Khusus', kegunaanRekening: 'Dana Tak Terduga & Bansos', color: '#0d9488' },
        ],
      },
    },
  },
};
