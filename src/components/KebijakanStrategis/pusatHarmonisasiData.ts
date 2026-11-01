/**
 * Master Data Dummy Satu Objek JSON untuk Unit:
 * "Pusat Harmonisasi Kebijakan Strategis" (PHKS) - BP Batam
 * Sesuai Standarisasi Satu Data BP Batam (Halaman 12-13) & Kamus KPI DEP-A2
 */

export interface SinkronisasiInternalItem {
  kategori: string;
  sudahSinkron: number;
  dalamProses: number;
  perluRevisi: number;
  total: number;
  persenSinkron: number;
  nomorDanTentang: string;
}

export interface SinkronisasiEksternalItem {
  periode: string;
  sudahSinkron: number;
  dalamProses: number;
  perluRevisi: number;
  total: number;
  kategoriTentangNomor: string;
}

export interface PemulihanBiayaTarifItem {
  unit: string;
  unitSingkat: string;
  unitCostRerata: number;
  tarifBerlakuRerata: number;
  costRecoveryRatio: number; // Persentase Tarif / Unit Cost
  layanan: string;
  satuanLayanan: string;
  bentukTarif: string;
  dasarHukum: string;
  statusTarif: 'Sesuai Biaya Riil' | 'Perlu Penyesuaian' | 'Evaluasi Subsidi';
}

export interface StatusTarifLevelItem {
  levelPengaturan: string;
  berlaku: number;
  dalamKajian: number;
  tidakBerlaku: number;
  total: number;
  unitDanDasarHukum: string;
}

export interface SurveiKewajaranTarifItem {
  kriteria: string;
  persentaseWajar: number;
  jumlahResponden: number;
  instrumenPenelitian: string;
  keterangan: string;
}

export interface RdpPimpinanBulanItem {
  bulan: string;
  bulanFull: string;
  jumlahRapat: number;
  judulRapat: string;
  tempat: string;
  waktu: string;
  statusTindakLanjut: string;
}

export interface PusatHarmonisasiMasterData {
  sinkronisasiInternal: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    filterPeriodeList: string[];
    byFilter: Record<
      string,
      {
        totalKebijakan: number;
        totalSudahSinkron: number;
        persenSudahSinkron: number;
        records: SinkronisasiInternalItem[];
      }
    >;
  };
  sinkronisasiEksternal: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        totalKebijakanEksternal: number;
        records: SinkronisasiEksternalItem[];
      }
    >;
  };
  pemulihanBiayaTarif: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    filterStatusList: string[];
    byFilter: Record<
      string,
      {
        rerataCostRecoveryRatio: number;
        records: PemulihanBiayaTarifItem[];
      }
    >;
  };
  statusTarifLevel: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    filterUnitList: string[];
    byFilter: Record<
      string,
      {
        totalBerlaku: number;
        records: StatusTarifLevelItem[];
      }
    >;
  };
  surveiKewajaranTarif: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    filterLokasiList: string[];
    byFilter: Record<
      string,
      {
        kriteriaTertinggiNama: string;
        kriteriaTertinggiPersen: number;
        records: SurveiKewajaranTarifItem[];
      }
    >;
  };
  rdpPimpinanPerBulan: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        totalRapatSetahun: number;
        records: RdpPimpinanBulanItem[];
      }
    >;
  };
}

export const PUSAT_HARMONISASI_MASTER_DATA: PusatHarmonisasiMasterData = {
  // ==========================================================================
  // BARIS 1 - KARTU 1: SINKRONISASI KEBIJAKAN INTERNAL PER KATEGORI (STACKED BAR HORIZ)
  // Dataset: Rekapitulasi Hasil Sinkronisasi Kebijakan Internal (Tertutup, pertahun)
  // ==========================================================================
  sinkronisasiInternal: {
    datasetName: 'Rekapitulasi Hasil Sinkronisasi Kebijakan Internal',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025', '2024'],
    filterPeriodeList: ['Semua Semester', 'Semester I', 'Semester II'],
    byFilter: {
      '2026-Semua Semester': {
        totalKebijakan: 78,
        totalSudahSinkron: 64,
        persenSudahSinkron: 82.1,
        records: [
          {
            kategori: 'Peraturan Kepala (Perka)',
            sudahSinkron: 24,
            dalamProses: 4,
            perluRevisi: 2,
            total: 30,
            persenSinkron: 80.0,
            nomorDanTentang: 'Perka No. 3/2024 tt. Tata Cara Penetapan Tarif Sewa Lahan KPBPB',
          },
          {
            kategori: 'Keputusan Kepala (Kepka)',
            sudahSinkron: 22,
            dalamProses: 3,
            perluRevisi: 1,
            total: 26,
            persenSinkron: 84.6,
            nomorDanTentang: 'Kepka No. 89/2024 tt. Tim Terpadu Harmonisasi Regulasi Pelabuhan',
          },
          {
            kategori: 'Standar Operasional (SOP)',
            sudahSinkron: 12,
            dalamProses: 2,
            perluRevisi: 1,
            total: 15,
            persenSinkron: 80.0,
            nomorDanTentang: 'SOP-014/P3S/2025 tt. Prosedur Uji Publik Rancangan Perka Tarif',
          },
          {
            kategori: 'Surat Edaran / Instruksi',
            sudahSinkron: 6,
            dalamProses: 1,
            perluRevisi: 0,
            total: 7,
            persenSinkron: 85.7,
            nomorDanTentang: 'SE No. 04/KA/2026 tt. Penyelarasan Dokumen Kebijakan BLU',
          },
        ],
      },
      '2026-Semester I': {
        totalKebijakan: 42,
        totalSudahSinkron: 36,
        persenSudahSinkron: 85.7,
        records: [
          {
            kategori: 'Peraturan Kepala (Perka)',
            sudahSinkron: 14,
            dalamProses: 2,
            perluRevisi: 1,
            total: 17,
            persenSinkron: 82.4,
            nomorDanTentang: 'Perka No. 3/2024 tt. Tata Cara Penetapan Tarif Sewa Lahan',
          },
          {
            kategori: 'Keputusan Kepala (Kepka)',
            sudahSinkron: 12,
            dalamProses: 1,
            perluRevisi: 1,
            total: 14,
            persenSinkron: 85.7,
            nomorDanTentang: 'Kepka No. 89/2024 tt. Tim Terpadu Harmonisasi Pelabuhan',
          },
          {
            kategori: 'Standar Operasional (SOP)',
            sudahSinkron: 7,
            dalamProses: 1,
            perluRevisi: 0,
            total: 8,
            persenSinkron: 87.5,
            nomorDanTentang: 'SOP-014/P3S/2025 tt. Uji Publik Rancangan Perka',
          },
          {
            kategori: 'Surat Edaran / Instruksi',
            sudahSinkron: 3,
            dalamProses: 0,
            perluRevisi: 0,
            total: 3,
            persenSinkron: 100.0,
            nomorDanTentang: 'SE No. 04/KA/2026 tt. Penyelarasan Dokumen Kebijakan',
          },
        ],
      },
      '2026-Semester II': {
        totalKebijakan: 36,
        totalSudahSinkron: 28,
        persenSudahSinkron: 77.8,
        records: [
          {
            kategori: 'Peraturan Kepala (Perka)',
            sudahSinkron: 10,
            dalamProses: 2,
            perluRevisi: 1,
            total: 13,
            persenSinkron: 76.9,
            nomorDanTentang: 'Rancangan Perka Tarif Layanan BLU SPAM 2026',
          },
          {
            kategori: 'Keputusan Kepala (Kepka)',
            sudahSinkron: 10,
            dalamProses: 2,
            perluRevisi: 0,
            total: 12,
            persenSinkron: 83.3,
            nomorDanTentang: 'Kepka Penetapan Tarif Konsesi Kargo Bandara Hang Nadim',
          },
          {
            kategori: 'Standar Operasional (SOP)',
            sudahSinkron: 5,
            dalamProses: 1,
            perluRevisi: 1,
            total: 7,
            persenSinkron: 71.4,
            nomorDanTentang: 'SOP Harmonisasi Antar-Direktorat BP Batam',
          },
          {
            kategori: 'Surat Edaran / Instruksi',
            sudahSinkron: 3,
            dalamProses: 1,
            perluRevisi: 0,
            total: 4,
            persenSinkron: 75.0,
            nomorDanTentang: 'Instruksi Kepala Pelaksanaan Konsultasi Publik',
          },
        ],
      },
      '2025-Semua Semester': {
        totalKebijakan: 85,
        totalSudahSinkron: 69,
        persenSudahSinkron: 81.2,
        records: [
          {
            kategori: 'Peraturan Kepala (Perka)',
            sudahSinkron: 26,
            dalamProses: 5,
            perluRevisi: 3,
            total: 34,
            persenSinkron: 76.5,
            nomorDanTentang: 'Perka No. 8/2024 Standarisasi Pelayanan OSS-RBA',
          },
          {
            kategori: 'Keputusan Kepala (Kepka)',
            sudahSinkron: 24,
            dalamProses: 3,
            perluRevisi: 1,
            total: 28,
            persenSinkron: 85.7,
            nomorDanTentang: 'Kepka Struktur Tarif Pelabuhan Peti Kemas',
          },
          {
            kategori: 'Standar Operasional (SOP)',
            sudahSinkron: 13,
            dalamProses: 2,
            perluRevisi: 1,
            total: 16,
            persenSinkron: 81.3,
            nomorDanTentang: 'SOP Reviu Berkala Tarif Layanan Rumah Sakit',
          },
          {
            kategori: 'Surat Edaran / Instruksi',
            sudahSinkron: 6,
            dalamProses: 1,
            perluRevisi: 0,
            total: 7,
            persenSinkron: 85.7,
            nomorDanTentang: 'SE Pelaporan Kepatuhan Perizinan Berusaha',
          },
        ],
      },
      '2024-Semua Semester': {
        totalKebijakan: 72,
        totalSudahSinkron: 56,
        persenSudahSinkron: 77.8,
        records: [
          {
            kategori: 'Peraturan Kepala (Perka)',
            sudahSinkron: 21,
            dalamProses: 4,
            perluRevisi: 4,
            total: 29,
            persenSinkron: 72.4,
            nomorDanTentang: 'Perka Penataan Koridor Utilitas Batam',
          },
          {
            kategori: 'Keputusan Kepala (Kepka)',
            sudahSinkron: 20,
            dalamProses: 3,
            perluRevisi: 2,
            total: 25,
            persenSinkron: 80.0,
            nomorDanTentang: 'Kepka Tarif Jasa Kepelabuhanan Kabil',
          },
          {
            kategori: 'Standar Operasional (SOP)',
            sudahSinkron: 10,
            dalamProses: 2,
            perluRevisi: 1,
            total: 13,
            persenSinkron: 76.9,
            nomorDanTentang: 'SOP Verifikasi Unit Cost Layanan RSBP',
          },
          {
            kategori: 'Surat Edaran / Instruksi',
            sudahSinkron: 5,
            dalamProses: 0,
            perluRevisi: 0,
            total: 5,
            persenSinkron: 100.0,
            nomorDanTentang: 'SE Pemanfaatan Tanah Alokasi',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 1 - KARTU 2: SINKRONISASI KEBIJAKAN EKSTERNAL PER PERIODE (STACKED COLUMN)
  // Dataset: Rekapitulasi Hasil Sinkronisasi Kebijakan Eksternal (Tertutup, pertahun)
  // Sumbu X: Periode (Triwulan). Segmen: Status. Sumbu Y: Jumlah kebijakan.
  // ==========================================================================
  sinkronisasiEksternal: {
    datasetName: 'Rekapitulasi Hasil Sinkronisasi Kebijakan Eksternal',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025', '2024'],
    byTahun: {
      '2026': {
        totalKebijakanEksternal: 48,
        records: [
          {
            periode: 'Triwulan I',
            sudahSinkron: 11,
            dalamProses: 2,
            perluRevisi: 1,
            total: 14,
            kategoriTentangNomor: 'PP No. 41/2021 tt. KPBPB & PMK No. 173/2023 (Kemenkeu)',
          },
          {
            periode: 'Triwulan II',
            sudahSinkron: 10,
            dalamProses: 2,
            perluRevisi: 0,
            total: 12,
            kategoriTentangNomor: 'Permenko Perekonomian No. 11/2024 tt. KEK Batam & Permenhub Tarif',
          },
          {
            periode: 'Triwulan III',
            sudahSinkron: 9,
            dalamProses: 3,
            perluRevisi: 1,
            total: 13,
            kategoriTentangNomor: 'Permen Investasi/BKPM tt. Norma Standar OSS-RBA & Kepmenkes RS',
          },
          {
            periode: 'Triwulan IV',
            sudahSinkron: 7,
            dalamProses: 2,
            perluRevisi: 0,
            total: 9,
            kategoriTentangNomor: 'Permen ATR/BPN No. 18/2024 tt. Hak Pengelolaan Lahan & HGB',
          },
        ],
      },
      '2025': {
        totalKebijakanEksternal: 54,
        records: [
          {
            periode: 'Triwulan I',
            sudahSinkron: 12,
            dalamProses: 3,
            perluRevisi: 1,
            total: 16,
            kategoriTentangNomor: 'PMK Standar Biaya Masukan & UU Harmonisasi Perpajakan',
          },
          {
            periode: 'Triwulan II',
            sudahSinkron: 11,
            dalamProses: 2,
            perluRevisi: 1,
            total: 14,
            kategoriTentangNomor: 'Perpres Penataan Ruang Kawasan Strategis Nasional Batam',
          },
          {
            periode: 'Triwulan III',
            sudahSinkron: 10,
            dalamProses: 2,
            perluRevisi: 0,
            total: 12,
            kategoriTentangNomor: 'Permenhub Keselamatan Alur Pelayaran Selat Riau',
          },
          {
            periode: 'Triwulan IV',
            sudahSinkron: 9,
            dalamProses: 2,
            perluRevisi: 1,
            total: 12,
            kategoriTentangNomor: 'Kepmen LHK Pengelolaan Kawasan Lindung & Waduk',
          },
        ],
      },
      '2024': {
        totalKebijakanEksternal: 46,
        records: [
          {
            periode: 'Triwulan I',
            sudahSinkron: 10,
            dalamProses: 2,
            perluRevisi: 1,
            total: 13,
            kategoriTentangNomor: 'PP Tarif Pelayanan Publik BLU Nasional',
          },
          {
            periode: 'Triwulan II',
            sudahSinkron: 9,
            dalamProses: 2,
            perluRevisi: 0,
            total: 11,
            kategoriTentangNomor: 'Permendag Ekspor Impor Kawasan Bebas',
          },
          {
            periode: 'Triwulan III',
            sudahSinkron: 8,
            dalamProses: 2,
            perluRevisi: 1,
            total: 11,
            kategoriTentangNomor: 'Permen BUMN Kerjasama Kemitraan Strategis Konsorsium',
          },
          {
            periode: 'Triwulan IV',
            sudahSinkron: 9,
            dalamProses: 1,
            perluRevisi: 1,
            total: 11,
            kategoriTentangNomor: 'Instruksi Mendagri Penyelenggaraan Perizinan Terpadu',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 2 - KARTU 3: PEMULIHAN BIAYA TARIF PER UNIT (PROGRESS BAR HORIZONTAL)
  // Dataset: Daftar Tarif Layanan (Terbuka, pertahun)
  // Rasio = Tarif Berlaku / Unit Cost. Bar hijau jika >= 100%, oranye jika < 100%.
  // ==========================================================================
  pemulihanBiayaTarif: {
    datasetName: 'Daftar Tarif Layanan',
    accessLabel: 'Terbuka',
    filterTahunList: ['2026', '2025'],
    filterStatusList: [
      'Semua Status',
      'Sesuai Biaya Riil',
      'Perlu Penyesuaian',
      'Evaluasi Subsidi',
    ],
    byFilter: {
      '2026-Semua Status': {
        rerataCostRecoveryRatio: 108.4,
        records: [
          {
            unit: 'Badan Usaha Pelabuhan',
            unitSingkat: 'BU Pelabuhan',
            unitCostRerata: 172000,
            tarifBerlakuRerata: 185000,
            costRecoveryRatio: 107.6,
            layanan: 'Jasa Tambat, Dermaga & Bongkar Muat Peti Kemas',
            satuanLayanan: 'Per TEUs / GT-Etmal',
            bentukTarif: 'Nominal Pasti (Fixed)',
            dasarHukum: 'PMK No. 173/PMK.05/2023 & Perka No. 12/2023',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'Badan Usaha Rumah Sakit (RSBP)',
            unitSingkat: 'BU Rumah Sakit',
            unitCostRerata: 410000,
            tarifBerlakuRerata: 450000,
            costRecoveryRatio: 109.8,
            layanan: 'Pelayanan Rawat Inap & Tindakan Medis Spesialistik',
            satuanLayanan: 'Per Pasien / Prosedur',
            bentukTarif: 'Paket INA-CBGs & FFS',
            dasarHukum: 'Perka BP Batam No. 18/2022 tt. Tarif RSBP',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'BU Fasilitas & Lingkungan (SPAM)',
            unitSingkat: 'BU SPAM / Fasling',
            unitCostRerata: 35000,
            tarifBerlakuRerata: 38000,
            costRecoveryRatio: 108.6,
            layanan: 'Penyaluran Air Bersih Industri & Pengolahan Limbah B3',
            satuanLayanan: 'Per Meter Kubik (m³)',
            bentukTarif: 'Tarif Progresif Golongan',
            dasarHukum: 'Perka BP Batam No. 04/2023 tt. SPAM Batam',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'Direktorat Pengelolaan Lahan',
            unitSingkat: 'Pengelolaan Lahan',
            unitCostRerata: 260000,
            tarifBerlakuRerata: 290000,
            costRecoveryRatio: 111.5,
            layanan: 'Uang Wajib Tahunan (UWT) & Perpanjangan Alokasi',
            satuanLayanan: 'Per Meter Persegi (m²)',
            bentukTarif: 'Berdasarkan Zona Peruntukan',
            dasarHukum: 'PMK Tarif Lahan & Perka No. 3/2024',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'BU Bandar Udara Hang Nadim',
            unitSingkat: 'BU Bandara',
            unitCostRerata: 138000,
            tarifBerlakuRerata: 145000,
            costRecoveryRatio: 105.1,
            layanan: 'PJP2U (Passenger Service Charge) & Jasa Pendaratan',
            satuanLayanan: 'Per Pax & Pesawat',
            bentukTarif: 'Berdasarkan MTOW Pesawat',
            dasarHukum: 'Kepmenhub & Perjanjian Konsesi KPBU BIB',
            statusTarif: 'Sesuai Biaya Riil',
          },
        ],
      },
      '2026-Perlu Penyesuaian': {
        rerataCostRecoveryRatio: 92.4,
        records: [
          {
            unit: 'BU Fasilitas & Lingkungan (SPAM)',
            unitSingkat: 'BU SPAM / Fasling',
            unitCostRerata: 42000,
            tarifBerlakuRerata: 38000,
            costRecoveryRatio: 90.5,
            layanan: 'Penyaluran Air Rumah Tangga MBR (Subsidi Silang)',
            satuanLayanan: 'Per m³ (0-10 m³)',
            bentukTarif: 'Tarif Dasar Rendah',
            dasarHukum: 'Perka BP Batam No. 04/2023',
            statusTarif: 'Perlu Penyesuaian',
          },
          {
            unit: 'Badan Usaha Rumah Sakit (RSBP)',
            unitSingkat: 'BU Rumah Sakit',
            unitCostRerata: 165000,
            tarifBerlakuRerata: 155000,
            costRecoveryRatio: 93.9,
            layanan: 'Pelayanan Poliklinik Umum Non-BPJS',
            satuanLayanan: 'Per Kunjungan',
            bentukTarif: 'Plafon Terkendali',
            dasarHukum: 'Kepka Tarif Dasar Medis',
            statusTarif: 'Perlu Penyesuaian',
          },
        ],
      },
      '2025-Semua Status': {
        rerataCostRecoveryRatio: 106.8,
        records: [
          {
            unit: 'Badan Usaha Pelabuhan',
            unitSingkat: 'BU Pelabuhan',
            unitCostRerata: 168000,
            tarifBerlakuRerata: 178000,
            costRecoveryRatio: 106.0,
            layanan: 'Tambat & Dermaga Batu Ampar',
            satuanLayanan: 'Per GT-Etmal',
            bentukTarif: 'Fixed',
            dasarHukum: 'PMK No. 173/2023',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'Badan Usaha Rumah Sakit (RSBP)',
            unitSingkat: 'BU Rumah Sakit',
            unitCostRerata: 395000,
            tarifBerlakuRerata: 425000,
            costRecoveryRatio: 107.6,
            layanan: 'Rawat Inap Paviliun',
            satuanLayanan: 'Per Malam',
            bentukTarif: 'Paket',
            dasarHukum: 'Perka Tarif RSBP',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'BU Fasilitas & Lingkungan (SPAM)',
            unitSingkat: 'BU SPAM / Fasling',
            unitCostRerata: 34000,
            tarifBerlakuRerata: 365000,
            costRecoveryRatio: 107.4,
            layanan: 'Distribusi Air Kawasan Industri',
            satuanLayanan: 'Per m³',
            bentukTarif: 'Progresif',
            dasarHukum: 'Perka SPAM',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'Direktorat Pengelolaan Lahan',
            unitSingkat: 'Pengelolaan Lahan',
            unitCostRerata: 250000,
            tarifBerlakuRerata: 275000,
            costRecoveryRatio: 110.0,
            layanan: 'UWT Zona Industri Muka Kuning',
            satuanLayanan: 'Per m²',
            bentukTarif: 'Zona',
            dasarHukum: 'Perka No. 3/2024',
            statusTarif: 'Sesuai Biaya Riil',
          },
          {
            unit: 'BU Bandar Udara Hang Nadim',
            unitSingkat: 'BU Bandara',
            unitCostRerata: 132000,
            tarifBerlakuRerata: 136000,
            costRecoveryRatio: 103.0,
            layanan: 'Pelayanan Kargo Domestik',
            satuanLayanan: 'Per Kg',
            bentukTarif: 'Tarif Terbuka',
            dasarHukum: 'Perjanjian Konsesi',
            statusTarif: 'Sesuai Biaya Riil',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 2 - KARTU 4: STATUS TARIF PER LEVEL PENGATURAN (STACKED BAR HORIZ)
  // Dataset: Daftar Tarif Layanan (Terbuka, pertahun)
  // Sumbu Y: Level Pengaturan Tarif. Segmen: Status Tarif (Berlaku, Dalam Kajian, Tidak Berlaku).
  // ==========================================================================
  statusTarifLevel: {
    datasetName: 'Daftar Tarif Layanan',
    accessLabel: 'Terbuka',
    filterTahunList: ['2026', '2025'],
    filterUnitList: [
      'Semua Unit',
      'BU Pelabuhan',
      'BU Rumah Sakit',
      'BU SPAM / Fasling',
      'Pengelolaan Lahan',
      'BU Bandar Udara',
    ],
    byFilter: {
      '2026-Semua Unit': {
        totalBerlaku: 242,
        records: [
          {
            levelPengaturan: 'PMK (Kemenkeu)',
            berlaku: 88,
            dalamKajian: 8,
            tidakBerlaku: 2,
            total: 98,
            unitDanDasarHukum: 'Seluruh BLU BP Batam • PMK No. 173/PMK.05/2023',
          },
          {
            levelPengaturan: 'Peraturan Kepala (Perka)',
            berlaku: 94,
            dalamKajian: 12,
            tidakBerlaku: 4,
            total: 110,
            unitDanDasarHukum: 'Pelabuhan, Lahan, RSBP, SPAM • Perka No. 3 & 4/2024',
          },
          {
            levelPengaturan: 'Keputusan Kepala (Kepka)',
            berlaku: 42,
            dalamKajian: 6,
            tidakBerlaku: 2,
            total: 50,
            unitDanDasarHukum: 'Penetapan Teknis Satuan Layanan Khusus • Kepka 2024-2025',
          },
          {
            levelPengaturan: 'Petunjuk Teknis Direktur',
            berlaku: 18,
            dalamKajian: 3,
            tidakBerlaku: 1,
            total: 22,
            unitDanDasarHukum: 'SOP Operasional Internal Badan Usaha • Juknis Unit',
          },
        ],
      },
      '2026-BU Pelabuhan': {
        totalBerlaku: 76,
        records: [
          {
            levelPengaturan: 'PMK (Kemenkeu)',
            berlaku: 32,
            dalamKajian: 2,
            tidakBerlaku: 1,
            total: 35,
            unitDanDasarHukum: 'BU Pelabuhan • PMK No. 173/PMK.05/2023',
          },
          {
            levelPengaturan: 'Peraturan Kepala (Perka)',
            berlaku: 28,
            dalamKajian: 3,
            tidakBerlaku: 1,
            total: 32,
            unitDanDasarHukum: 'BU Pelabuhan • Perka Tarif Kepelabuhanan 2024',
          },
          {
            levelPengaturan: 'Keputusan Kepala (Kepka)',
            berlaku: 12,
            dalamKajian: 1,
            tidakBerlaku: 0,
            total: 13,
            unitDanDasarHukum: 'BU Pelabuhan • Kepka Operasional Terminal Batu Ampar',
          },
          {
            levelPengaturan: 'Petunjuk Teknis Direktur',
            berlaku: 4,
            dalamKajian: 1,
            tidakBerlaku: 0,
            total: 5,
            unitDanDasarHukum: 'BU Pelabuhan • Juknis Pandu & Tunda Kapal',
          },
        ],
      },
      '2025-Semua Unit': {
        totalBerlaku: 228,
        records: [
          {
            levelPengaturan: 'PMK (Kemenkeu)',
            berlaku: 82,
            dalamKajian: 10,
            tidakBerlaku: 3,
            total: 95,
            unitDanDasarHukum: 'Seluruh BLU BP Batam • PMK No. 173/2023',
          },
          {
            levelPengaturan: 'Peraturan Kepala (Perka)',
            berlaku: 88,
            dalamKajian: 14,
            tidakBerlaku: 5,
            total: 107,
            unitDanDasarHukum: 'Pelabuhan, Lahan, RSBP, SPAM • Perka BP Batam',
          },
          {
            levelPengaturan: 'Keputusan Kepala (Kepka)',
            berlaku: 40,
            dalamKajian: 7,
            tidakBerlaku: 3,
            total: 50,
            unitDanDasarHukum: 'Penetapan Tarif Layanan Musiman',
          },
          {
            levelPengaturan: 'Petunjuk Teknis Direktur',
            berlaku: 18,
            dalamKajian: 4,
            tidakBerlaku: 1,
            total: 23,
            unitDanDasarHukum: 'Standar Prosedur Badan Usaha',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 3 - KARTU 5: HASIL SURVEI KEWAJARAN TARIF PER KRITERIA (BAR HORIZ URUT TURUN)
  // Dataset: Survei Kewajaran dan Evaluasi Tarif (Tertutup, pertahun)
  // Sumbu Y: Kriteria. Sumbu X: Persentase (urut dari nilai tertinggi).
  // ==========================================================================
  surveiKewajaranTarif: {
    datasetName: 'Survei Kewajaran dan Evaluasi Tarif',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    filterLokasiList: [
      'Semua Lokasi',
      'Pelabuhan Batu Ampar',
      'RSBP Batam (Sekupang)',
      'SPAM Kantor Pelayanan',
      'Mall Pelayanan Publik (PTSP)',
    ],
    byFilter: {
      '2026-Semua Lokasi': {
        kriteriaTertinggiNama: 'Keterjangkauan Daya Beli',
        kriteriaTertinggiPersen: 88.5,
        records: [
          {
            kriteria: 'Keterjangkauan Daya Beli',
            persentaseWajar: 88.5,
            jumlahResponden: 450,
            instrumenPenelitian: 'Kuesioner Skala Likert 5 Poin & Wawancara Mendalam',
            keterangan: 'Masyarakat & pelaku usaha menilai tarif terjangkau sesuai UMK Batam',
          },
          {
            kriteria: 'Kesesuaian Kualitas Layanan',
            persentaseWajar: 86.2,
            jumlahResponden: 450,
            instrumenPenelitian: 'Evaluasi Service Quality Gap (ServQual) & Observasi Lapangan',
            keterangan: 'Kualitas fasilitas dan kecepatan respon sepadan dengan biaya',
          },
          {
            kriteria: 'Transparansi Biaya & Mutu',
            persentaseWajar: 84.8,
            jumlahResponden: 450,
            instrumenPenelitian: 'Audit Publikasi Tarif Resmi di Portal Satu Data & MPP',
            keterangan: 'Rincian invoice jelas tanpa pungutan tidak resmi',
          },
          {
            kriteria: 'Daya Saing Regional Kepri',
            persentaseWajar: 82.4,
            jumlahResponden: 450,
            instrumenPenelitian: 'Benchmarking Tarif Pelabuhan Johor & Singapura',
            keterangan: 'Struktur tarif kompetitif mendukung iklim logistik transhipment',
          },
          {
            kriteria: 'Efisiensi Waktu Pelayanan',
            persentaseWajar: 79.5,
            jumlahResponden: 450,
            instrumenPenelitian: 'Pencatatan SLA Digital & Pengaduan Konsumen',
            keterangan: 'Waktu tunggu dan proses verifikasi semakin ringkas',
          },
        ],
      },
      '2026-Pelabuhan Batu Ampar': {
        kriteriaTertinggiNama: 'Daya Saing Regional Kepri',
        kriteriaTertinggiPersen: 91.0,
        records: [
          {
            kriteria: 'Daya Saing Regional Kepri',
            persentaseWajar: 91.0,
            jumlahResponden: 180,
            instrumenPenelitian: 'Wawancara INSA, ALFI/ILFA & Eksportir Batam',
            keterangan: 'Biaya handling STS Crane kompetitif dibandingkan pelabuhan sekitarnya',
          },
          {
            kriteria: 'Keterjangkauan Daya Beli',
            persentaseWajar: 87.5,
            jumlahResponden: 180,
            instrumenPenelitian: 'Kuesioner Agen Pelayaran',
            keterangan: 'Tarif labuh & tambat kapal proporsional',
          },
          {
            kriteria: 'Transparansi Biaya & Mutu',
            persentaseWajar: 86.0,
            jumlahResponden: 180,
            instrumenPenelitian: 'Billing Online Port System (BOS)',
            keterangan: 'Semua tagihan terbit secara digital via host-to-host perbankan',
          },
          {
            kriteria: 'Kesesuaian Kualitas Layanan',
            persentaseWajar: 83.5,
            jumlahResponden: 180,
            instrumenPenelitian: 'Evaluasi Produktivitas Bongkar Muat Box/Jam',
            keterangan: 'Kecepatan crane listrik stabil mencapai 24 BCH',
          },
          {
            kriteria: 'Efisiensi Waktu Pelayanan',
            persentaseWajar: 81.0,
            jumlahResponden: 180,
            instrumenPenelitian: 'Turnaround Time Kapal & Gate In/Out Terminal',
            keterangan: 'Dwelling time rata-rata di bawah 2,8 hari',
          },
        ],
      },
      '2025-Semua Lokasi': {
        kriteriaTertinggiNama: 'Keterjangkauan Daya Beli',
        kriteriaTertinggiPersen: 86.0,
        records: [
          {
            kriteria: 'Keterjangkauan Daya Beli',
            persentaseWajar: 86.0,
            jumlahResponden: 420,
            instrumenPenelitian: 'Kuesioner Survei Berkala Satu Data',
            keterangan: 'Sesuai kemampuan bayar pengguna jasa',
          },
          {
            kriteria: 'Transparansi Biaya & Mutu',
            persentaseWajar: 83.5,
            jumlahResponden: 420,
            instrumenPenelitian: 'Audit Portal Resmi',
            keterangan: 'Keterbukaan informasi tarif',
          },
          {
            kriteria: 'Kesesuaian Kualitas Layanan',
            persentaseWajar: 82.0,
            jumlahResponden: 420,
            instrumenPenelitian: 'Observasi Lapangan',
            keterangan: 'Fasilitas memadai',
          },
          {
            kriteria: 'Daya Saing Regional Kepri',
            persentaseWajar: 80.5,
            jumlahResponden: 420,
            instrumenPenelitian: 'Benchmarking Regional',
            keterangan: 'Daya saing regional cukup baik',
          },
          {
            kriteria: 'Efisiensi Waktu Pelayanan',
            persentaseWajar: 77.0,
            jumlahResponden: 420,
            instrumenPenelitian: 'SLA Tracking',
            keterangan: 'Peningkatan kecepatan layanan',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 3 - KARTU 6: RAPAT DENGAR PENDAPAT PIMPINAN PER BULAN (COLUMN CHART)
  // Dataset: Daftar Risalah Rapat Dengar Pendapat Pimpinan (Tertutup, perbulan)
  // Sumbu X: Bulan (dari Tanggal Rapat). Sumbu Y: Jumlah rapat.
  // ==========================================================================
  rdpPimpinanPerBulan: {
    datasetName: 'Daftar Risalah Rapat Dengar Pendapat Pimpinan',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    byTahun: {
      '2026': {
        totalRapatSetahun: 46,
        records: [
          {
            bulan: 'Jan',
            bulanFull: 'Januari 2026',
            jumlahRapat: 4,
            judulRapat: 'RDP Harmonisasi Tarif Air Bersih SPAM & Uji Publik Perka',
            tempat: 'Ruang Rapat Pimpinan Gedung Utama BP Batam Lt. 3',
            waktu: '10:00 - 12:30 WIB',
            statusTindakLanjut: 'Selesai 100% (Risalah Ditetapkan)',
          },
          {
            bulan: 'Feb',
            bulanFull: 'Februari 2026',
            jumlahRapat: 3,
            judulRapat: 'RDP Evaluasi Kepatuhan Perizinan Berusaha OSS-RBA di KEK',
            tempat: 'Ruang Multimedia Gedung BIDA Lt. 2',
            waktu: '09:00 - 11:30 WIB',
            statusTindakLanjut: 'Selesai 100% (Notulensi Terdistribusi)',
          },
          {
            bulan: 'Mar',
            bulanFull: 'Maret 2026',
            jumlahRapat: 5,
            judulRapat: 'RDP Pembahasan Draf PMK Revisi Tarif Jasa Kepelabuhanan',
            tempat: 'Ruang VIP Wisma Batam & Virtual Zoom Bersama Kemenkeu',
            waktu: '13:30 - 16:30 WIB',
            statusTindakLanjut: 'Dalam Harmonisasi Lanjutan Kemenkeu',
          },
          {
            bulan: 'Apr',
            bulanFull: 'April 2026',
            jumlahRapat: 4,
            judulRapat: 'RDP Harmonisasi Hak Pengelolaan Lahan & RDTR Wilayah',
            tempat: 'Ruang Rapat Pimpinan Gedung Utama Lt. 3',
            waktu: '09:30 - 12:00 WIB',
            statusTindakLanjut: 'Selesai 100% (Matriks Rekomendasi)',
          },
          {
            bulan: 'Mei',
            bulanFull: 'Mei 2026',
            jumlahRapat: 4,
            judulRapat: 'RDP Penyelarasan SOP Rekomendasi Pas Lintas Batas',
            tempat: 'Ruang Rapat PTSP Lt. 1 MPP Batam',
            waktu: '14:00 - 16:00 WIB',
            statusTindakLanjut: 'Selesai 100% (Perka Harmonis)',
          },
          {
            bulan: 'Jun',
            bulanFull: 'Juni 2026',
            jumlahRapat: 5,
            judulRapat: 'RDP Evaluasi Tengah Tahun Penyerapan Tarif BLU',
            tempat: 'Ruang Rapat Pimpinan Gedung Utama Lt. 3',
            waktu: '10:00 - 13:00 WIB',
            statusTindakLanjut: 'Selesai 100% (Laporan Ditandatangani)',
          },
          {
            bulan: 'Jul',
            bulanFull: 'Juli 2026',
            jumlahRapat: 4,
            judulRapat: 'RDP Pembahasan Regulasi Penataan Utilitas Bawah Tanah',
            tempat: 'Ruang Rapat Dit. Infrastruktur',
            waktu: '09:00 - 11:30 WIB',
            statusTindakLanjut: 'On-Progress Koordinasi PLN/PGN/Telkom',
          },
          {
            bulan: 'Agu',
            bulanFull: 'Agustus 2026',
            jumlahRapat: 3,
            judulRapat: 'RDP Harmonisasi Tarif Konsesi Aerotropolis Hang Nadim',
            tempat: 'Ruang Rapat BIB Hang Nadim Airport Lt. 2',
            waktu: '14:00 - 16:30 WIB',
            statusTindakLanjut: 'Selesai 100% (Persetujuan Bersama)',
          },
          {
            bulan: 'Sep',
            bulanFull: 'September 2026',
            jumlahRapat: 5,
            judulRapat: 'RDP Reviu Kebijakan Insentif Pajak Kawasan Bebas Batam',
            tempat: 'Ruang Rapat Pimpinan Gedung Utama Lt. 3',
            waktu: '09:30 - 12:30 WIB',
            statusTindakLanjut: 'Selesai 100% (Nota Pengantar KA)',
          },
          {
            bulan: 'Okt',
            bulanFull: 'Oktober 2026',
            jumlahRapat: 4,
            judulRapat: 'RDP Sinkronisasi Peraturan Zonasi Pesisir & Reklamasi',
            tempat: 'Ruang Rapat Dit. Pesisir Lt. 4',
            waktu: '13:30 - 16:00 WIB',
            statusTindakLanjut: 'Koordinasi KKP & Pemko Batam',
          },
          {
            bulan: 'Nov',
            bulanFull: 'November 2026',
            jumlahRapat: 3,
            judulRapat: 'RDP Pembahasan Draf Rencana Strategis Regulasi 2027',
            tempat: 'Ruang Rapat Pimpinan Gedung Utama Lt. 3',
            waktu: '10:00 - 12:00 WIB',
            statusTindakLanjut: 'Finalisasi Matriks Tindak Lanjut',
          },
          {
            bulan: 'Des',
            bulanFull: 'Desember 2026',
            jumlahRapat: 2,
            judulRapat: 'RDP Rapat Pleno Akhir Tahun Harmonisasi Regulasi BP Batam',
            tempat: 'Auditorium Gedung Utama BP Batam Lt. 1',
            waktu: '09:00 - 13:00 WIB',
            statusTindakLanjut: 'Selesai 100% (Buku Laporan Tahunan)',
          },
        ],
      },
      '2025': {
        totalRapatSetahun: 44,
        records: [
          {
            bulan: 'Jan',
            bulanFull: 'Januari 2025',
            jumlahRapat: 3,
            judulRapat: 'RDP Sinkronisasi Regulasi Pelabuhan',
            tempat: 'Gedung Utama',
            waktu: '10:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Feb',
            bulanFull: 'Februari 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Pengawasan Tarif Lahan',
            tempat: 'Gedung Utama',
            waktu: '09:30 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Mar',
            bulanFull: 'Maret 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Reviu Tarif RSBP Batam',
            tempat: 'RSBP Lt. 2',
            waktu: '13:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Apr',
            bulanFull: 'April 2025',
            jumlahRapat: 3,
            judulRapat: 'RDP Koordinasi Bappenas Renstra',
            tempat: 'Gedung Utama',
            waktu: '10:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Mei',
            bulanFull: 'Mei 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Regulasi KEK Nongsa Digital',
            tempat: 'Gedung Utama',
            waktu: '14:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Jun',
            bulanFull: 'Juni 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Pembahasan Tarif Bandara',
            tempat: 'Hang Nadim',
            waktu: '09:30 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Jul',
            bulanFull: 'Juli 2025',
            jumlahRapat: 3,
            judulRapat: 'RDP Uji Publik Perka Lingkungan',
            tempat: 'Gedung Utama',
            waktu: '10:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Agu',
            bulanFull: 'Agustus 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Kebijakan Investasi PMA',
            tempat: 'Gedung Utama',
            waktu: '13:30 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Sep',
            bulanFull: 'September 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Harmonisasi Layanan PTSP',
            tempat: 'MPP Batam',
            waktu: '09:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Okt',
            bulanFull: 'Oktober 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Evaluasi Standar Tarif BLU',
            tempat: 'Gedung Utama',
            waktu: '14:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Nov',
            bulanFull: 'November 2025',
            jumlahRapat: 4,
            judulRapat: 'RDP Penyusunan Risalah Akhir Tahun',
            tempat: 'Gedung Utama',
            waktu: '10:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
          {
            bulan: 'Des',
            bulanFull: 'Desember 2025',
            jumlahRapat: 3,
            judulRapat: 'RDP Pleno Regulasi 2025',
            tempat: 'Auditorium',
            waktu: '09:00 WIB',
            statusTindakLanjut: 'Selesai',
          },
        ],
      },
    },
  },
};
