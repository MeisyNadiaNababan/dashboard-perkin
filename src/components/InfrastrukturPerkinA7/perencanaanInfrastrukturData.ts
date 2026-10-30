/**
 * DATA RESMI VISUALISASI DATA DIREKTORAT PERENCANAAN INFRASTRUKTUR BP BATAM
 * Disimpan dalam satu objek JSON terpadu agar mudah diganti dengan data riil API / Satu Data.
 * 
 * Sifat Data:
 * - Grafik 1 - 5: "Tertutup" (Dataset: Rekapitulasi Perencanaan Pembangunan Infrastruktur Darat, Laut, Utilitas, Gedung, Lainnya)
 * - Grafik 6 - 8: "Terbuka" (Dataset: Persentase Pemanfaatan Dokumen Perencanaan Teknis Infrastruktur / Lingkungan / Bangunan)
 */

export interface DedTahunItem {
  tahun: string;
  Darat: number;
  Laut: number;
  Utilitas: number;
  Gedung: number;
  Lainnya: number;
  total: number;
}

export interface DedBiayaWaktuItem {
  id: string;
  jenis: 'Darat' | 'Laut' | 'Utilitas' | 'Gedung' | 'Lainnya';
  tahun: string;
  biayaMiliar: number;
  waktuHari: number;
  jumlahDed: number;
}

export interface PemanfaatanTahunItem {
  tahun: string;
  teknisInfrastruktur: number;
  teknisLingkungan: number;
  teknisBangunan: number;
}

export interface NilaiDedTahunItem {
  tahun: string;
  teknisInfrastruktur: number; // Miliar Rupiah
  teknisLingkungan: number;
  teknisBangunan: number;
}

export interface DedPerUnitPenggunaItem {
  id: string;
  namaPaket: string;
  kategori: 'Teknis Infrastruktur' | 'Teknis Lingkungan' | 'Teknis Bangunan';
  tahun: string;
  nilaiDedMiliar: number;
  unitPengguna: number;
  nilaiPerUnit: number; // Miliar per unit
  keterangan: string;
  isHighestAccent?: boolean;
}

export interface PerencanaanInfrastrukturDataStructure {
  metadata: {
    unit: string;
    kementerianLembaga: string;
    rentangTahun: string;
    sumberDatasetTertutup: string;
    sumberDatasetTerbuka: string;
  };
  rekapitulasiTahunan: DedTahunItem[];
  biayaDanWaktuPerTahun: Record<string, {
    jenis: string;
    biayaMiliar: number;
    waktuHari: number;
    jumlahDed: number;
  }[]>;
  rataRataWaktuPerJenis: {
    jenis: string;
    waktuHari: number;
    isTerlama: boolean;
  }[];
  bubbleBiayaVsWaktu: DedBiayaWaktuItem[];
  pemanfaatanUnitPengguna: PemanfaatanTahunItem[];
  nilaiDedPerTahun: NilaiDedTahunItem[];
  top10NilaiPerUnitPengguna: DedPerUnitPenggunaItem[];
}

export const DATA_PERENCANAAN_INFRASTRUKTUR: PerencanaanInfrastrukturDataStructure = {
  metadata: {
    unit: 'Direktorat Perencanaan Infrastruktur',
    kementerianLembaga: 'Badan Pengusahaan Batam',
    rentangTahun: '2021-2025',
    sumberDatasetTertutup: 'Rekapitulasi Perencanaan Pembangunan Infrastruktur Darat, Laut, Utilitas, Gedung, Lainnya (Tertutup, pertahun)',
    sumberDatasetTerbuka: 'Persentase Pemanfaatan Dokumen Perencanaan Teknis Infrastruktur / Lingkungan / Bangunan (Terbuka, pertahun)',
  },

  // A.1: Jumlah DED per tahun menurut jenis infrastruktur (Stacked Column)
  rekapitulasiTahunan: [
    { tahun: '2021', Darat: 12, Laut: 5, Utilitas: 8, Gedung: 10, Lainnya: 4, total: 39 },
    { tahun: '2022', Darat: 14, Laut: 6, Utilitas: 9, Gedung: 12, Lainnya: 5, total: 46 },
    { tahun: '2023', Darat: 18, Laut: 8, Utilitas: 11, Gedung: 15, Lainnya: 6, total: 58 },
    { tahun: '2024', Darat: 22, Laut: 10, Utilitas: 14, Gedung: 18, Lainnya: 7, total: 71 },
    { tahun: '2025', Darat: 25, Laut: 12, Utilitas: 16, Gedung: 20, Lainnya: 8, total: 81 },
  ],

  // A.2 & B.3: Data biaya & jumlah per jenis infrastruktur per tahun (dapat difilter Tahun)
  biayaDanWaktuPerTahun: {
    Semua: [
      { jenis: 'Darat', biayaMiliar: 63.7, waktuHari: 88, jumlahDed: 91 },
      { jenis: 'Gedung', biayaMiliar: 53.6, waktuHari: 104, jumlahDed: 75 },
      { jenis: 'Laut', biayaMiliar: 46.2, waktuHari: 130, jumlahDed: 41 },
      { jenis: 'Utilitas', biayaMiliar: 31.3, waktuHari: 68, jumlahDed: 58 },
      { jenis: 'Lainnya', biayaMiliar: 16.6, waktuHari: 50, jumlahDed: 30 },
    ],
    '2021': [
      { jenis: 'Darat', biayaMiliar: 7.8, waktuHari: 85, jumlahDed: 12 },
      { jenis: 'Gedung', biayaMiliar: 6.9, waktuHari: 95, jumlahDed: 10 },
      { jenis: 'Laut', biayaMiliar: 5.2, waktuHari: 120, jumlahDed: 5 },
      { jenis: 'Utilitas', biayaMiliar: 4.1, waktuHari: 65, jumlahDed: 8 },
      { jenis: 'Lainnya', biayaMiliar: 2.1, waktuHari: 45, jumlahDed: 4 },
    ],
    '2022': [
      { jenis: 'Darat', biayaMiliar: 9.4, waktuHari: 88, jumlahDed: 14 },
      { jenis: 'Gedung', biayaMiliar: 8.2, waktuHari: 100, jumlahDed: 12 },
      { jenis: 'Laut', biayaMiliar: 6.8, waktuHari: 125, jumlahDed: 6 },
      { jenis: 'Utilitas', biayaMiliar: 4.8, waktuHari: 68, jumlahDed: 9 },
      { jenis: 'Lainnya', biayaMiliar: 2.7, waktuHari: 50, jumlahDed: 5 },
    ],
    '2023': [
      { jenis: 'Darat', biayaMiliar: 12.5, waktuHari: 92, jumlahDed: 18 },
      { jenis: 'Gedung', biayaMiliar: 10.4, waktuHari: 105, jumlahDed: 15 },
      { jenis: 'Laut', biayaMiliar: 8.9, waktuHari: 130, jumlahDed: 8 },
      { jenis: 'Utilitas', biayaMiliar: 5.9, waktuHari: 70, jumlahDed: 11 },
      { jenis: 'Lainnya', biayaMiliar: 3.2, waktuHari: 52, jumlahDed: 6 },
    ],
    '2024': [
      { jenis: 'Darat', biayaMiliar: 15.8, waktuHari: 90, jumlahDed: 22 },
      { jenis: 'Gedung', biayaMiliar: 13.1, waktuHari: 110, jumlahDed: 18 },
      { jenis: 'Laut', biayaMiliar: 11.5, waktuHari: 140, jumlahDed: 10 },
      { jenis: 'Utilitas', biayaMiliar: 7.6, waktuHari: 72, jumlahDed: 14 },
      { jenis: 'Lainnya', biayaMiliar: 4.0, waktuHari: 55, jumlahDed: 7 },
    ],
    '2025': [
      { jenis: 'Darat', biayaMiliar: 18.2, waktuHari: 86, jumlahDed: 25 },
      { jenis: 'Gedung', biayaMiliar: 15.0, waktuHari: 102, jumlahDed: 20 },
      { jenis: 'Laut', biayaMiliar: 13.8, waktuHari: 135, jumlahDed: 12 },
      { jenis: 'Utilitas', biayaMiliar: 8.9, waktuHari: 66, jumlahDed: 16 },
      { jenis: 'Lainnya', biayaMiliar: 4.6, waktuHari: 48, jumlahDed: 8 },
    ],
  },

  // B.4: Rata-rata waktu penyusunan DED per jenis infrastruktur (Laut terlama = aksen)
  rataRataWaktuPerJenis: [
    { jenis: 'Laut', waktuHari: 130, isTerlama: true },
    { jenis: 'Gedung', waktuHari: 104, isTerlama: false },
    { jenis: 'Darat', waktuHari: 88, isTerlama: false },
    { jenis: 'Utilitas', waktuHari: 68, isTerlama: false },
    { jenis: 'Lainnya', waktuHari: 50, isTerlama: false },
  ],

  // B.5: Biaya vs waktu penyusunan (Bubble Chart: X = Waktu (hari), Y = Biaya (M), Z = Jumlah DED)
  bubbleBiayaVsWaktu: [
    { id: 'b-1', jenis: 'Darat', tahun: '2021', waktuHari: 85, biayaMiliar: 7.8, jumlahDed: 12 },
    { id: 'b-2', jenis: 'Darat', tahun: '2022', waktuHari: 88, biayaMiliar: 9.4, jumlahDed: 14 },
    { id: 'b-3', jenis: 'Darat', tahun: '2023', waktuHari: 92, biayaMiliar: 12.5, jumlahDed: 18 },
    { id: 'b-4', jenis: 'Darat', tahun: '2024', waktuHari: 90, biayaMiliar: 15.8, jumlahDed: 22 },
    { id: 'b-5', jenis: 'Darat', tahun: '2025', waktuHari: 86, biayaMiliar: 18.2, jumlahDed: 25 },

    { id: 'b-6', jenis: 'Laut', tahun: '2021', waktuHari: 120, biayaMiliar: 5.2, jumlahDed: 5 },
    { id: 'b-7', jenis: 'Laut', tahun: '2022', waktuHari: 125, biayaMiliar: 6.8, jumlahDed: 6 },
    { id: 'b-8', jenis: 'Laut', tahun: '2023', waktuHari: 130, biayaMiliar: 8.9, jumlahDed: 8 },
    { id: 'b-9', jenis: 'Laut', tahun: '2024', waktuHari: 140, biayaMiliar: 11.5, jumlahDed: 10 },
    { id: 'b-10', jenis: 'Laut', tahun: '2025', waktuHari: 135, biayaMiliar: 13.8, jumlahDed: 12 },

    { id: 'b-11', jenis: 'Utilitas', tahun: '2021', waktuHari: 65, biayaMiliar: 4.1, jumlahDed: 8 },
    { id: 'b-12', jenis: 'Utilitas', tahun: '2022', waktuHari: 68, biayaMiliar: 4.8, jumlahDed: 9 },
    { id: 'b-13', jenis: 'Utilitas', tahun: '2023', waktuHari: 70, biayaMiliar: 5.9, jumlahDed: 11 },
    { id: 'b-14', jenis: 'Utilitas', tahun: '2024', waktuHari: 72, biayaMiliar: 7.6, jumlahDed: 14 },
    { id: 'b-15', jenis: 'Utilitas', tahun: '2025', waktuHari: 66, biayaMiliar: 8.9, jumlahDed: 16 },

    { id: 'b-16', jenis: 'Gedung', tahun: '2021', waktuHari: 95, biayaMiliar: 6.9, jumlahDed: 10 },
    { id: 'b-17', jenis: 'Gedung', tahun: '2022', waktuHari: 100, biayaMiliar: 8.2, jumlahDed: 12 },
    { id: 'b-18', jenis: 'Gedung', tahun: '2023', waktuHari: 105, biayaMiliar: 10.4, jumlahDed: 15 },
    { id: 'b-19', jenis: 'Gedung', tahun: '2024', waktuHari: 110, biayaMiliar: 13.1, jumlahDed: 18 },
    { id: 'b-20', jenis: 'Gedung', tahun: '2025', waktuHari: 102, biayaMiliar: 15.0, jumlahDed: 20 },

    { id: 'b-21', jenis: 'Lainnya', tahun: '2021', waktuHari: 45, biayaMiliar: 2.1, jumlahDed: 4 },
    { id: 'b-22', jenis: 'Lainnya', tahun: '2022', waktuHari: 50, biayaMiliar: 2.7, jumlahDed: 5 },
    { id: 'b-23', jenis: 'Lainnya', tahun: '2023', waktuHari: 52, biayaMiliar: 3.2, jumlahDed: 6 },
    { id: 'b-24', jenis: 'Lainnya', tahun: '2024', waktuHari: 55, biayaMiliar: 4.0, jumlahDed: 7 },
    { id: 'b-25', jenis: 'Lainnya', tahun: '2025', waktuHari: 48, biayaMiliar: 4.6, jumlahDed: 8 },
  ],

  // C.6: Jumlah unit pengguna DED per tahun pembuatan (Clustered Column)
  pemanfaatanUnitPengguna: [
    { tahun: '2021', teknisInfrastruktur: 14, teknisLingkungan: 8, teknisBangunan: 11 },
    { tahun: '2022', teknisInfrastruktur: 17, teknisLingkungan: 10, teknisBangunan: 13 },
    { tahun: '2023', teknisInfrastruktur: 22, teknisLingkungan: 12, teknisBangunan: 16 },
    { tahun: '2024', teknisInfrastruktur: 26, teknisLingkungan: 15, teknisBangunan: 19 },
    { tahun: '2025', teknisInfrastruktur: 30, teknisLingkungan: 18, teknisBangunan: 22 },
  ],

  // C.7: Nilai DED per tahun pembuatan (Line Chart)
  nilaiDedPerTahun: [
    { tahun: '2021', teknisInfrastruktur: 14.5, teknisLingkungan: 6.2, teknisBangunan: 9.8 },
    { tahun: '2022', teknisInfrastruktur: 18.2, teknisLingkungan: 7.8, teknisBangunan: 11.5 },
    { tahun: '2023', teknisInfrastruktur: 23.8, teknisLingkungan: 9.5, teknisBangunan: 14.6 },
    { tahun: '2024', teknisInfrastruktur: 30.5, teknisLingkungan: 12.1, teknisBangunan: 18.4 },
    { tahun: '2025', teknisInfrastruktur: 36.2, teknisLingkungan: 14.4, teknisBangunan: 21.8 },
  ],

  // C.8: Nilai DED per unit pengguna (Top 10 Horizontal Bar + Table)
  // Nilai per pengguna tertinggi di-highlight aksen (indikasi pemanfaatan rendah)
  top10NilaiPerUnitPengguna: [
    {
      id: 'ded-1',
      namaPaket: 'DED Dermaga Terminal Kargo Khusus Batu Ampar',
      kategori: 'Teknis Infrastruktur',
      tahun: '2024',
      nilaiDedMiliar: 4.80,
      unitPengguna: 2,
      nilaiPerUnit: 2.40,
      keterangan: 'Indikasi pemanfaatan rendah, perlu diseminasi ke BPPK dan pengelola terminal',
      isHighestAccent: true,
    },
    {
      id: 'ded-2',
      namaPaket: 'DED Pengendalian Rembesan Bendungan Sei Harapan',
      kategori: 'Teknis Lingkungan',
      tahun: '2023',
      nilaiDedMiliar: 3.90,
      unitPengguna: 2,
      nilaiPerUnit: 1.95,
      keterangan: 'Pemanfaatan terbatas pada unit penanganan darurat & SPAM',
      isHighestAccent: false,
    },
    {
      id: 'ded-3',
      namaPaket: 'DED Terminal VVIP Hang Nadim Apron Selatan',
      kategori: 'Teknis Bangunan',
      tahun: '2025',
      nilaiDedMiliar: 5.20,
      unitPengguna: 3,
      nilaiPerUnit: 1.73,
      keterangan: 'Tahap finalisasi dokumen review BPKBU & konsorsium bandara',
      isHighestAccent: false,
    },
    {
      id: 'ded-4',
      namaPaket: 'DED Kolam Retensi & Pompa Banjir Batam Centre',
      kategori: 'Teknis Lingkungan',
      tahun: '2024',
      nilaiDedMiliar: 3.20,
      unitPengguna: 2,
      nilaiPerUnit: 1.60,
      keterangan: 'Implementasi fisik bertahap menunggu pembebasan ROW',
      isHighestAccent: false,
    },
    {
      id: 'ded-5',
      namaPaket: 'DED Underpass Penyeberangan Simpang Franky',
      kategori: 'Teknis Infrastruktur',
      tahun: '2023',
      nilaiDedMiliar: 4.50,
      unitPengguna: 3,
      nilaiPerUnit: 1.50,
      keterangan: 'Diadopsi Dit. Pembangunan & Ditlantas Polda Kepri',
      isHighestAccent: false,
    },
    {
      id: 'ded-6',
      namaPaket: 'DED Jaringan Pipa Interkoneksi Muka Kuning',
      kategori: 'Teknis Infrastruktur',
      tahun: '2022',
      nilaiDedMiliar: 2.80,
      unitPengguna: 2,
      nilaiPerUnit: 1.40,
      keterangan: 'DED dimanfaatkan operasional BU SPAM & Kawasan Industri',
      isHighestAccent: false,
    },
    {
      id: 'ded-7',
      namaPaket: 'DED Gedung Pusat Diklat & Simulasi Naker',
      kategori: 'Teknis Bangunan',
      tahun: '2024',
      nilaiDedMiliar: 3.60,
      unitPengguna: 3,
      nilaiPerUnit: 1.20,
      keterangan: 'Kesiapan lelang paket multi-years TA 2026',
      isHighestAccent: false,
    },
    {
      id: 'ded-8',
      namaPaket: 'DED Peningkatan TPA Telaga Punggur Cell 4',
      kategori: 'Teknis Lingkungan',
      tahun: '2025',
      nilaiDedMiliar: 3.40,
      unitPengguna: 3,
      nilaiPerUnit: 1.13,
      keterangan: 'Integrasi masterplan persampahan regional Dit. Fasling',
      isHighestAccent: false,
    },
    {
      id: 'ded-9',
      namaPaket: 'DED Flyover Simpang Barelang & Tembesi',
      kategori: 'Teknis Infrastruktur',
      tahun: '2025',
      nilaiDedMiliar: 4.20,
      unitPengguna: 4,
      nilaiPerUnit: 1.05,
      keterangan: 'Pemanfaatan optimal bersama BPJN Kepri & Pemko Batam',
      isHighestAccent: false,
    },
    {
      id: 'ded-10',
      namaPaket: 'DED Penataan Koridor ROW 200 Simpang Kabil',
      kategori: 'Teknis Infrastruktur',
      tahun: '2024',
      nilaiDedMiliar: 2.90,
      unitPengguna: 3,
      nilaiPerUnit: 0.97,
      keterangan: 'Pemanfaatan aktif oleh PPK Jalan Strategis & Utilitas',
      isHighestAccent: false,
    },
  ],
};
