/**
 * DATA RESMI VISUALISASI DATA DIREKTORAT PERENCANAAN INFRASTRUKTUR BP BATAM
 * Disimpan dalam satu objek JSON terpadu agar mudah diganti dengan data riil API / Satu Data BP Batam.
 *
 * 6 Kategori Infrastruktur Resmi:
 * 1. Gedung
 * 2. Utilitas
 * 3. Darat
 * 4. Laut
 * 5. Lingkungan
 * 6. Pesisir dan Reklamasi
 *
 * Sifat Dataset: Tertutup (Rekapitulasi Perencanaan Pembangunan Infrastruktur)
 */

export type KategoriInfrastruktur =
  | 'Gedung'
  | 'Utilitas'
  | 'Darat'
  | 'Laut'
  | 'Lingkungan'
  | 'Pesisir dan Reklamasi';

export const KATEGORI_INFRASTRUKTUR_LIST: KategoriInfrastruktur[] = [
  'Gedung',
  'Utilitas',
  'Darat',
  'Laut',
  'Lingkungan',
  'Pesisir dan Reklamasi',
];

export interface DedKategoriItem {
  kategori: KategoriInfrastruktur;
  jumlahDed: number;
  totalBiayaMiliar: number;
  waktuHari: number; // Rata-rata waktu pelaksanaan penyusunan DED
  biayaPerDedMiliar: number;
}

export interface DedYearSummary {
  tahun: string;
  totalDed: number;
  totalBiayaMiliar: number;
  rerataWaktuHari: number;
  rerataBiayaPerDedMiliar: number;
  items: DedKategoriItem[];
}

export interface DedStackedYearItem {
  tahun: string;
  Gedung: number;
  Utilitas: number;
  Darat: number;
  Laut: number;
  Lingkungan: number;
  'Pesisir dan Reklamasi': number;
  totalBiaya: number;
  totalDed: number;
}

export interface MasterPerencanaanData {
  metadata: {
    unit: string;
    deputi: string;
    kategoriList: KategoriInfrastruktur[];
    tahunList: string[];
    datasetKartu1: string;
    datasetKartu2: string;
    datasetKartu3: string;
    datasetKartu4: string;
  };
  rekapPerTahun: Record<string, DedYearSummary>;
  biayaDed5Tahun: DedStackedYearItem[];
}

export const DATA_PERENCANAAN_INFRASTRUKTUR: MasterPerencanaanData = {
  metadata: {
    unit: 'Direktorat Perencanaan Infrastruktur',
    deputi: 'Anggota/Deputi Bidang Infrastruktur (DEP A7)',
    kategoriList: KATEGORI_INFRASTRUKTUR_LIST,
    tahunList: ['2026', '2025', '2024', '2023', '2022'],
    datasetKartu1:
      'Rekapitulasi Perencanaan Pembangunan Infrastruktur Gedung, Utilitas, Darat, Laut, dan kategori lainnya (Tertutup, pertahun)',
    datasetKartu2:
      'Rekapitulasi Perencanaan Pembangunan Infrastruktur (semua kategori) (Tertutup, pertahun)',
    datasetKartu3:
      'Rekapitulasi Perencanaan Pembangunan Infrastruktur (semua kategori) (Tertutup, pertahun)',
    datasetKartu4:
      'Rekapitulasi Perencanaan Pembangunan Infrastruktur (semua kategori) (Tertutup, pertahun)',
  },

  // Rincian per tahun (2022 - 2026) untuk Kartu 1, Kartu 3, dan Kartu 4
  rekapPerTahun: {
    '2026': {
      tahun: '2026',
      totalDed: 48,
      totalBiayaMiliar: 61.30,
      rerataWaktuHari: 89.1,
      rerataBiayaPerDedMiliar: 1.28,
      items: [
        {
          kategori: 'Gedung',
          jumlahDed: 12,
          totalBiayaMiliar: 14.80,
          waktuHari: 82,
          biayaPerDedMiliar: 1.23,
        },
        {
          kategori: 'Utilitas',
          jumlahDed: 10,
          totalBiayaMiliar: 11.50,
          waktuHari: 75,
          biayaPerDedMiliar: 1.15,
        },
        {
          kategori: 'Darat',
          jumlahDed: 9,
          totalBiayaMiliar: 13.20,
          waktuHari: 94, // di atas rerata
          biayaPerDedMiliar: 1.47,
        },
        {
          kategori: 'Lingkungan',
          jumlahDed: 7,
          totalBiayaMiliar: 5.60,
          waktuHari: 68,
          biayaPerDedMiliar: 0.80,
        },
        {
          kategori: 'Laut',
          jumlahDed: 6,
          totalBiayaMiliar: 9.80,
          waktuHari: 125, // di atas rerata
          biayaPerDedMiliar: 1.63,
        },
        {
          kategori: 'Pesisir dan Reklamasi',
          jumlahDed: 4,
          totalBiayaMiliar: 6.40,
          waktuHari: 118, // di atas rerata
          biayaPerDedMiliar: 1.60,
        },
      ],
    },

    '2025': {
      tahun: '2025',
      totalDed: 42,
      totalBiayaMiliar: 51.80,
      rerataWaktuHari: 92.4,
      rerataBiayaPerDedMiliar: 1.23,
      items: [
        {
          kategori: 'Gedung',
          jumlahDed: 10,
          totalBiayaMiliar: 12.10,
          waktuHari: 85,
          biayaPerDedMiliar: 1.21,
        },
        {
          kategori: 'Utilitas',
          jumlahDed: 9,
          totalBiayaMiliar: 9.80,
          waktuHari: 78,
          biayaPerDedMiliar: 1.09,
        },
        {
          kategori: 'Darat',
          jumlahDed: 8,
          totalBiayaMiliar: 11.40,
          waktuHari: 96,
          biayaPerDedMiliar: 1.43,
        },
        {
          kategori: 'Lingkungan',
          jumlahDed: 6,
          totalBiayaMiliar: 4.60,
          waktuHari: 70,
          biayaPerDedMiliar: 0.77,
        },
        {
          kategori: 'Laut',
          jumlahDed: 5,
          totalBiayaMiliar: 7.90,
          waktuHari: 128,
          biayaPerDedMiliar: 1.58,
        },
        {
          kategori: 'Pesisir dan Reklamasi',
          jumlahDed: 4,
          totalBiayaMiliar: 6.00,
          waktuHari: 120,
          biayaPerDedMiliar: 1.50,
        },
      ],
    },

    '2024': {
      tahun: '2024',
      totalDed: 37,
      totalBiayaMiliar: 44.00,
      rerataWaktuHari: 94.6,
      rerataBiayaPerDedMiliar: 1.19,
      items: [
        {
          kategori: 'Gedung',
          jumlahDed: 9,
          totalBiayaMiliar: 10.50,
          waktuHari: 88,
          biayaPerDedMiliar: 1.17,
        },
        {
          kategori: 'Utilitas',
          jumlahDed: 8,
          totalBiayaMiliar: 8.40,
          waktuHari: 80,
          biayaPerDedMiliar: 1.05,
        },
        {
          kategori: 'Darat',
          jumlahDed: 7,
          totalBiayaMiliar: 9.60,
          waktuHari: 98,
          biayaPerDedMiliar: 1.37,
        },
        {
          kategori: 'Lingkungan',
          jumlahDed: 5,
          totalBiayaMiliar: 3.70,
          waktuHari: 72,
          biayaPerDedMiliar: 0.74,
        },
        {
          kategori: 'Laut',
          jumlahDed: 5,
          totalBiayaMiliar: 7.50,
          waktuHari: 130,
          biayaPerDedMiliar: 1.50,
        },
        {
          kategori: 'Pesisir dan Reklamasi',
          jumlahDed: 3,
          totalBiayaMiliar: 4.40,
          waktuHari: 122,
          biayaPerDedMiliar: 1.47,
        },
      ],
    },

    '2023': {
      tahun: '2023',
      totalDed: 32,
      totalBiayaMiliar: 36.90,
      rerataWaktuHari: 97.2,
      rerataBiayaPerDedMiliar: 1.15,
      items: [
        {
          kategori: 'Gedung',
          jumlahDed: 8,
          totalBiayaMiliar: 8.90,
          waktuHari: 90,
          biayaPerDedMiliar: 1.11,
        },
        {
          kategori: 'Utilitas',
          jumlahDed: 7,
          totalBiayaMiliar: 7.10,
          waktuHari: 82,
          biayaPerDedMiliar: 1.01,
        },
        {
          kategori: 'Darat',
          jumlahDed: 6,
          totalBiayaMiliar: 8.00,
          waktuHari: 102,
          biayaPerDedMiliar: 1.33,
        },
        {
          kategori: 'Lingkungan',
          jumlahDed: 4,
          totalBiayaMiliar: 2.90,
          waktuHari: 75,
          biayaPerDedMiliar: 0.73,
        },
        {
          kategori: 'Laut',
          jumlahDed: 4,
          totalBiayaMiliar: 5.80,
          waktuHari: 132,
          biayaPerDedMiliar: 1.45,
        },
        {
          kategori: 'Pesisir dan Reklamasi',
          jumlahDed: 3,
          totalBiayaMiliar: 4.20,
          waktuHari: 124,
          biayaPerDedMiliar: 1.40,
        },
      ],
    },

    '2022': {
      tahun: '2022',
      totalDed: 28,
      totalBiayaMiliar: 31.20,
      rerataWaktuHari: 99.8,
      rerataBiayaPerDedMiliar: 1.11,
      items: [
        {
          kategori: 'Gedung',
          jumlahDed: 7,
          totalBiayaMiliar: 7.50,
          waktuHari: 92,
          biayaPerDedMiliar: 1.07,
        },
        {
          kategori: 'Utilitas',
          jumlahDed: 6,
          totalBiayaMiliar: 5.90,
          waktuHari: 84,
          biayaPerDedMiliar: 0.98,
        },
        {
          kategori: 'Darat',
          jumlahDed: 5,
          totalBiayaMiliar: 6.40,
          waktuHari: 105,
          biayaPerDedMiliar: 1.28,
        },
        {
          kategori: 'Lingkungan',
          jumlahDed: 4,
          totalBiayaMiliar: 2.80,
          waktuHari: 78,
          biayaPerDedMiliar: 0.70,
        },
        {
          kategori: 'Laut',
          jumlahDed: 4,
          totalBiayaMiliar: 5.50,
          waktuHari: 135,
          biayaPerDedMiliar: 1.38,
        },
        {
          kategori: 'Pesisir dan Reklamasi',
          jumlahDed: 2,
          totalBiayaMiliar: 2.70,
          waktuHari: 126,
          biayaPerDedMiliar: 1.35,
        },
      ],
    },
  },

  // 5 Tahun Terakhir untuk Kartu 2 (Stacked Column Biaya Penyusunan DED)
  biayaDed5Tahun: [
    {
      tahun: '2022',
      Gedung: 7.50,
      Utilitas: 5.90,
      Darat: 6.40,
      Laut: 5.50,
      Lingkungan: 2.80,
      'Pesisir dan Reklamasi': 2.70,
      totalBiaya: 31.20,
      totalDed: 28,
    },
    {
      tahun: '2023',
      Gedung: 8.90,
      Utilitas: 7.10,
      Darat: 8.00,
      Laut: 5.80,
      Lingkungan: 2.90,
      'Pesisir dan Reklamasi': 4.20,
      totalBiaya: 36.90,
      totalDed: 32,
    },
    {
      tahun: '2024',
      Gedung: 10.50,
      Utilitas: 8.40,
      Darat: 9.60,
      Laut: 7.50,
      Lingkungan: 3.70,
      'Pesisir dan Reklamasi': 4.40,
      totalBiaya: 44.00,
      totalDed: 37,
    },
    {
      tahun: '2025',
      Gedung: 12.10,
      Utilitas: 9.80,
      Darat: 11.40,
      Laut: 7.90,
      Lingkungan: 4.60,
      'Pesisir dan Reklamasi': 6.00,
      totalBiaya: 51.80,
      totalDed: 42,
    },
    {
      tahun: '2026',
      Gedung: 14.80,
      Utilitas: 11.50,
      Darat: 13.20,
      Laut: 9.80,
      Lingkungan: 5.60,
      'Pesisir dan Reklamasi': 6.40,
      totalBiaya: 61.30,
      totalDed: 48,
    },
  ],
};
