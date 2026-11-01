// ============================================================================
// DATASET DUMMY RESMI: DIREKTORAT LALU LINTAS BARANG
// BADAN PENGUSAHAAN BATAM (BP BATAM) - DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN (DEP-A4)
// Seluruh dataset dummy terstruktur rapi dalam satu objek JSON terpadu
// ============================================================================

export interface IzinUsahaKawasanBulananItem {
  bulan: string; // 'Jan', 'Feb', dst.
  bulanNama?: string;
  bulanIndex: number;
  tahun: number;
  iukBaru: number;
  perpanjanganIuk: number;
  perubahanIuk: number;
  penutupanIuk: number;
  totalIzin: number;
  uraianList: {
    uraian: string;
    jumlah: number;
  }[];
}

export interface PemasukanPengeluaranBulananItem {
  bulan: string;
  bulanNama?: string;
  bulanIndex: number;
  tahun: number;
  pemasukanBarang: number;
  pengeluaranBarang: number;
  totalDokumen: number;
  rincianPemasukan: {
    uraianIzin: string;
    jumlah: number;
  }[];
  rincianPengeluaran: {
    uraianIzin: string;
    jumlah: number;
  }[];
}

export interface LayananPerizinanLlbItem {
  id: string;
  namaLayanan: string;
  tahun: number;
  bulan: string; // 'Jan', 'Feb', dst.
  bidangIndustri: number;
  bidangPerdagangan: number;
  totalDokumen: number;
  rentangTanggalRekap: string;
}

export interface KetepatanWaktuSlaItem {
  id: string;
  uraianIzin: string;
  bidang: 'Industri' | 'Perdagangan';
  bulan: string;
  bulanIndex: number;
  tahun: number;
  persentaseTepatWaktu: number; // e.g. 96.5%
  rataRataWaktuJam: number; // e.g. 2.4 jam
  standarSlaJam: number; // e.g. 6.0 jam
  totalDokumen: number;
  dokumenTepatWaktu: number;
}

export interface KuotaIndukKonsumsiItem {
  id: string;
  kodeHs: string;
  komoditas: string;
  tahun: number;
  kuotaTon: number;
  realisasiTon: number;
  persentaseRealisasi: number;
  satuan: string;
  noSk: string;
  tanggalSk: string;
}

export interface KbliPerusahaanIukItem {
  id: string;
  kodeKbli: string;
  namaKbli: string;
  displayKbli: string;
  jumlahPerusahaan: number;
  porsiPersen: number;
  contohPerusahaan: {
    namaPerusahaan: string;
    noIzinUsahaKawasan: string;
    lokasiKawasan: string;
  }[];
}

export interface LaluLintasBarangDatabase {
  unitInfo: {
    namaUnit: string;
    kodeDeputi: string;
    deputi: string;
    instansi: string;
    versiData: string;
    tahunAnggaran: number;
  };
  penerbitanIzinUsahaKawasan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: IzinUsahaKawasanBulananItem[];
  };
  pemasukanVsPengeluaran: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka / Terbatas';
      periodeUpdate: string;
    };
    records: PemasukanPengeluaranBulananItem[];
  };
  layananPerizinanBidang: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: LayananPerizinanLlbItem[];
  };
  ketepatanWaktuPelayanan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: KetepatanWaktuSlaItem[];
  };
  realisasiKuotaKonsumsi: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: KuotaIndukKonsumsiItem[];
  };
  sebaranKbliIuk: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: KbliPerusahaanIukItem[];
  };
}

export const LALU_LINTAS_BARANG_DATA: LaluLintasBarangDatabase = {
  unitInfo: {
    namaUnit: 'Direktorat Lalu Lintas Barang',
    kodeDeputi: 'DEP-A4',
    deputi: 'Deputi Bidang Investasi dan Pengusahaan',
    instansi: 'Badan Pengusahaan Batam (BP Batam)',
    versiData: 'Katalog Satu Data BP Batam 2025/2026',
    tahunAnggaran: 2026,
  },

  // --------------------------------------------------------------------------
  // KARTU 1: REKAPITULASI PENERBITAN LAYANAN IZIN USAHA KAWASAN (TERBUKA, PERBULAN)
  // --------------------------------------------------------------------------
  penerbitanIzinUsahaKawasan: {
    metadata: {
      namaDataset: 'Rekapitulasi Penerbitan Layanan Izin Usaha Kawasan',
      sifatData: 'Terbuka',
      periodeUpdate: 'Perbulan',
    },
    records: [
      // Tahun 2026
      {
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2026,
        iukBaru: 42,
        perpanjanganIuk: 58,
        perubahanIuk: 18,
        penutupanIuk: 4,
        totalIzin: 122,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 42 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 58 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 18 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2026,
        iukBaru: 48,
        perpanjanganIuk: 62,
        perubahanIuk: 20,
        penutupanIuk: 5,
        totalIzin: 135,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 48 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 62 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 20 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 5 },
        ],
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        iukBaru: 52,
        perpanjanganIuk: 65,
        perubahanIuk: 22,
        penutupanIuk: 3,
        totalIzin: 142,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 52 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 65 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 22 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        iukBaru: 55,
        perpanjanganIuk: 70,
        perubahanIuk: 24,
        penutupanIuk: 6,
        totalIzin: 155,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 55 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 70 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 24 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 6 },
        ],
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2026,
        iukBaru: 46,
        perpanjanganIuk: 60,
        perubahanIuk: 19,
        penutupanIuk: 5,
        totalIzin: 130,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 46 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 60 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 19 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 5 },
        ],
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2026,
        iukBaru: 50,
        perpanjanganIuk: 68,
        perubahanIuk: 21,
        penutupanIuk: 4,
        totalIzin: 143,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 50 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 68 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 21 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2026,
        iukBaru: 54,
        perpanjanganIuk: 72,
        perubahanIuk: 25,
        penutupanIuk: 5,
        totalIzin: 156,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 54 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 72 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 25 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 5 },
        ],
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2026,
        iukBaru: 48,
        perpanjanganIuk: 64,
        perubahanIuk: 18,
        penutupanIuk: 4,
        totalIzin: 134,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 48 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 64 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 18 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2026,
        iukBaru: 51,
        perpanjanganIuk: 69,
        perubahanIuk: 23,
        penutupanIuk: 5,
        totalIzin: 148,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 51 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 69 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 23 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 5 },
        ],
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2026,
        iukBaru: 56,
        perpanjanganIuk: 75,
        perubahanIuk: 26,
        penutupanIuk: 4,
        totalIzin: 161,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 56 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 75 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 26 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2026,
        iukBaru: 45,
        perpanjanganIuk: 61,
        perubahanIuk: 20,
        penutupanIuk: 3,
        totalIzin: 129,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 45 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 61 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 20 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2026,
        iukBaru: 39,
        perpanjanganIuk: 56,
        perubahanIuk: 16,
        penutupanIuk: 4,
        totalIzin: 115,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 39 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 56 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 16 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      // Data Tahun 2025 (Pembanding)
      {
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2025,
        iukBaru: 36,
        perpanjanganIuk: 50,
        perubahanIuk: 15,
        penutupanIuk: 3,
        totalIzin: 104,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 36 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 50 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 15 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2025,
        iukBaru: 40,
        perpanjanganIuk: 54,
        perubahanIuk: 17,
        penutupanIuk: 4,
        totalIzin: 115,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 40 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 54 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 17 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2025,
        iukBaru: 44,
        perpanjanganIuk: 58,
        perubahanIuk: 19,
        penutupanIuk: 3,
        totalIzin: 124,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 44 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 58 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 19 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2025,
        iukBaru: 47,
        perpanjanganIuk: 62,
        perubahanIuk: 21,
        penutupanIuk: 5,
        totalIzin: 135,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 47 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 62 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 21 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 5 },
        ],
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2025,
        iukBaru: 41,
        perpanjanganIuk: 52,
        perubahanIuk: 16,
        penutupanIuk: 4,
        totalIzin: 113,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 41 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 52 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 16 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2025,
        iukBaru: 45,
        perpanjanganIuk: 59,
        perubahanIuk: 18,
        penutupanIuk: 3,
        totalIzin: 125,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 45 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 59 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 18 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2025,
        iukBaru: 48,
        perpanjanganIuk: 64,
        perubahanIuk: 22,
        penutupanIuk: 4,
        totalIzin: 138,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 48 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 64 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 22 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2025,
        iukBaru: 43,
        perpanjanganIuk: 56,
        perubahanIuk: 15,
        penutupanIuk: 3,
        totalIzin: 117,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 43 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 56 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 15 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2025,
        iukBaru: 46,
        perpanjanganIuk: 61,
        perubahanIuk: 20,
        penutupanIuk: 4,
        totalIzin: 131,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 46 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 61 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 20 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2025,
        iukBaru: 50,
        perpanjanganIuk: 66,
        perubahanIuk: 23,
        penutupanIuk: 4,
        totalIzin: 143,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 50 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 66 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 23 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 4 },
        ],
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2025,
        iukBaru: 40,
        perpanjanganIuk: 53,
        perubahanIuk: 17,
        penutupanIuk: 3,
        totalIzin: 113,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 40 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 53 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 17 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2025,
        iukBaru: 35,
        perpanjanganIuk: 48,
        perubahanIuk: 14,
        penutupanIuk: 3,
        totalIzin: 100,
        uraianList: [
          { uraian: 'Izin Usaha Kawasan Baru', jumlah: 35 },
          { uraian: 'Perpanjangan Izin Usaha Kawasan', jumlah: 48 },
          { uraian: 'Perubahan / Perluasan IUK', jumlah: 14 },
          { uraian: 'Penutupan / Pembatalan IUK', jumlah: 3 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 2: REKAPITULASI IZIN PEMASUKAN VS PENGELUARAN BARANG (TERBUKA & TERBATAS, PERBULAN)
  // --------------------------------------------------------------------------
  pemasukanVsPengeluaran: {
    metadata: {
      namaDataset: 'Rekapitulasi Penerbitan Layanan Perizinan Pemasukan & Pengeluaran Barang',
      sifatData: 'Terbuka / Terbatas',
      periodeUpdate: 'Perbulan',
    },
    records: [
      // Tahun 2026
      {
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2026,
        pemasukanBarang: 680,
        pengeluaranBarang: 450,
        totalDokumen: 1130,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 340 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 180 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 160 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 290 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 160 },
        ],
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2026,
        pemasukanBarang: 720,
        pengeluaranBarang: 480,
        totalDokumen: 1200,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 360 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 195 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 165 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 310 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 170 },
        ],
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        pemasukanBarang: 760,
        pengeluaranBarang: 510,
        totalDokumen: 1270,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 380 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 205 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 175 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 330 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 180 },
        ],
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        pemasukanBarang: 810,
        pengeluaranBarang: 540,
        totalDokumen: 1350,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 410 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 215 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 185 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 350 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 190 },
        ],
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2026,
        pemasukanBarang: 740,
        pengeluaranBarang: 490,
        totalDokumen: 1230,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 370 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 200 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 170 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 320 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 170 },
        ],
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2026,
        pemasukanBarang: 770,
        pengeluaranBarang: 520,
        totalDokumen: 1290,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 390 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 205 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 175 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 340 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 180 },
        ],
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2026,
        pemasukanBarang: 830,
        pengeluaranBarang: 560,
        totalDokumen: 1390,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 420 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 220 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 190 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 365 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 195 },
        ],
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2026,
        pemasukanBarang: 750,
        pengeluaranBarang: 500,
        totalDokumen: 1250,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 375 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 200 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 175 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 325 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 175 },
        ],
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2026,
        pemasukanBarang: 790,
        pengeluaranBarang: 530,
        totalDokumen: 1320,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 400 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 210 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 180 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 345 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 185 },
        ],
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2026,
        pemasukanBarang: 840,
        pengeluaranBarang: 570,
        totalDokumen: 1410,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 430 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 220 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 190 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 370 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 200 },
        ],
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2026,
        pemasukanBarang: 730,
        pengeluaranBarang: 490,
        totalDokumen: 1220,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 370 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 190 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 170 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 320 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 170 },
        ],
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2026,
        pemasukanBarang: 660,
        pengeluaranBarang: 430,
        totalDokumen: 1090,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 330 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 175 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 155 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 280 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 150 },
        ],
      },
      // Tahun 2025
      {
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2025,
        pemasukanBarang: 610,
        pengeluaranBarang: 400,
        totalDokumen: 1010,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 310 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 160 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 140 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 260 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 140 },
        ],
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2025,
        pemasukanBarang: 640,
        pengeluaranBarang: 420,
        totalDokumen: 1060,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 320 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 170 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 150 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 270 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 150 },
        ],
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2025,
        pemasukanBarang: 680,
        pengeluaranBarang: 450,
        totalDokumen: 1130,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 340 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 180 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 160 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 290 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 160 },
        ],
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2025,
        pemasukanBarang: 720,
        pengeluaranBarang: 480,
        totalDokumen: 1200,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 360 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 195 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 165 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 310 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 170 },
        ],
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2025,
        pemasukanBarang: 660,
        pengeluaranBarang: 430,
        totalDokumen: 1090,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 330 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 175 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 155 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 280 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 150 },
        ],
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2025,
        pemasukanBarang: 690,
        pengeluaranBarang: 460,
        totalDokumen: 1150,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 350 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 185 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 155 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 300 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 160 },
        ],
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2025,
        pemasukanBarang: 740,
        pengeluaranBarang: 490,
        totalDokumen: 1230,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 370 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 200 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 170 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 320 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 170 },
        ],
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2025,
        pemasukanBarang: 670,
        pengeluaranBarang: 440,
        totalDokumen: 1110,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 335 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 180 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 155 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 290 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 150 },
        ],
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2025,
        pemasukanBarang: 710,
        pengeluaranBarang: 470,
        totalDokumen: 1180,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 360 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 190 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 160 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 310 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 160 },
        ],
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2025,
        pemasukanBarang: 750,
        pengeluaranBarang: 500,
        totalDokumen: 1250,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 380 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 200 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 170 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 330 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 170 },
        ],
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2025,
        pemasukanBarang: 650,
        pengeluaranBarang: 430,
        totalDokumen: 1080,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 330 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 175 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 145 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 280 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 150 },
        ],
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2025,
        pemasukanBarang: 590,
        pengeluaranBarang: 390,
        totalDokumen: 980,
        rincianPemasukan: [
          { uraianIzin: 'Bahan Baku Industri Elektronika', jumlah: 300 },
          { uraianIzin: 'Barang Modal & Mesin Pabrik', jumlah: 155 },
          { uraianIzin: 'Barang Konsumsi Terbatas', jumlah: 135 },
        ],
        rincianPengeluaran: [
          { uraianIzin: 'Ekspor Barang Jadi ke Luar Negeri', jumlah: 255 },
          { uraianIzin: 'Pengeluaran Barang Antar Kawasan Bebas', jumlah: 135 },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 3: REKAPITULASI PENERBITAN LAYANAN PERIZINAN LALU LINTAS BARANG
  // (INDUSTRI & PERDAGANGAN) (TERBUKA, JIKA UPDATE)
  // --------------------------------------------------------------------------
  layananPerizinanBidang: {
    metadata: {
      namaDataset: 'Rekapitulasi Penerbitan Layanan Perizinan Lalu Lintas Barang (Industri dan Perdagangan)',
      sifatData: 'Terbuka',
      periodeUpdate: 'Jika Update',
    },
    records: [
      {
        id: 'LAY-01',
        namaLayanan: 'Izin Pemasukan Bahan Baku & Penolong',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 3240,
        bidangPerdagangan: 820,
        totalDokumen: 4060,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-02',
        namaLayanan: 'Izin Pengeluaran Barang Antar Kawasan Bebas',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 2150,
        bidangPerdagangan: 980,
        totalDokumen: 3130,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-03',
        namaLayanan: 'Pemasukan Barang Modal & Mesin Pabrik',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 1840,
        bidangPerdagangan: 420,
        totalDokumen: 2260,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-04',
        namaLayanan: 'Izin Usaha Kawasan (IUK) Baru & Perpanjangan',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 980,
        bidangPerdagangan: 710,
        totalDokumen: 1690,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-05',
        namaLayanan: 'Rekomendasi Kuota Barang Konsumsi Pokok',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 310,
        bidangPerdagangan: 1240,
        totalDokumen: 1550,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-06',
        namaLayanan: 'Izin Pengeluaran Barang Sisa (Scrap/Waste)',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 890,
        bidangPerdagangan: 180,
        totalDokumen: 1070,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-07',
        namaLayanan: 'Surat Keterangan Bebas Cukai Mesin Industri',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 740,
        bidangPerdagangan: 150,
        totalDokumen: 890,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
      {
        id: 'LAY-08',
        namaLayanan: 'Izin Pemasukan Bahan Berbahaya & Kimia (B2/B3)',
        tahun: 2026,
        bulan: 'Semua Bulan',
        bidangIndustri: 520,
        bidangPerdagangan: 190,
        totalDokumen: 710,
        rentangTanggalRekap: '01 Jan 2026 - 31 Des 2026',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 4: PERSENTASE PELAYANAN LALU LINTAS BARANG SELESAI TEPAT WAKTU (SLA)
  // (TERBUKA, PERBULAN)
  // --------------------------------------------------------------------------
  ketepatanWaktuPelayanan: {
    metadata: {
      namaDataset: 'Persentase Pelayanan Lalu Lintas Barang Industri dan Perdagangan yang Selesai Tepat Waktu',
      sifatData: 'Terbuka',
      periodeUpdate: 'Perbulan',
    },
    records: [
      {
        id: 'SLA-01',
        uraianIzin: 'Izin Pemasukan Bahan Baku Industri',
        bidang: 'Industri',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 98.4,
        rataRataWaktuJam: 1.8,
        standarSlaJam: 3.0,
        totalDokumen: 3240,
        dokumenTepatWaktu: 3188,
      },
      {
        id: 'SLA-02',
        uraianIzin: 'Izin Pengeluaran Barang Antar Kawasan Bebas',
        bidang: 'Industri',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 97.2,
        rataRataWaktuJam: 2.1,
        standarSlaJam: 3.0,
        totalDokumen: 2150,
        dokumenTepatWaktu: 2090,
      },
      {
        id: 'SLA-03',
        uraianIzin: 'Pemasukan Barang Modal & Mesin Pabrik',
        bidang: 'Industri',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 96.5,
        rataRataWaktuJam: 3.2,
        standarSlaJam: 6.0,
        totalDokumen: 1840,
        dokumenTepatWaktu: 1775,
      },
      {
        id: 'SLA-04',
        uraianIzin: 'Izin Usaha Kawasan (IUK) Baru',
        bidang: 'Industri',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 95.8,
        rataRataWaktuJam: 14.5,
        standarSlaJam: 24.0,
        totalDokumen: 590,
        dokumenTepatWaktu: 565,
      },
      {
        id: 'SLA-05',
        uraianIzin: 'Rekomendasi Kuota Pemasukan Barang Konsumsi',
        bidang: 'Perdagangan',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 94.2,
        rataRataWaktuJam: 16.8,
        standarSlaJam: 24.0,
        totalDokumen: 1240,
        dokumenTepatWaktu: 1168,
      },
      {
        id: 'SLA-06',
        uraianIzin: 'Izin Pemasukan Bahan Berbahaya & Kimia (B2/B3)',
        bidang: 'Industri',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 91.5,
        rataRataWaktuJam: 8.5,
        standarSlaJam: 12.0,
        totalDokumen: 520,
        dokumenTepatWaktu: 476,
      },
      {
        id: 'SLA-07',
        uraianIzin: 'Izin Pengeluaran Barang Sisa (Scrap/Waste)',
        bidang: 'Perdagangan',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 88.6, // Di bawah 90% (Oranye peringatan)
        rataRataWaktuJam: 18.4,
        standarSlaJam: 16.0,
        totalDokumen: 180,
        dokumenTepatWaktu: 159,
      },
      {
        id: 'SLA-08',
        uraianIzin: 'Surat Keterangan Asal (SKA) Perdagangan',
        bidang: 'Perdagangan',
        bulan: 'Semua Bulan',
        bulanIndex: 0,
        tahun: 2026,
        persentaseTepatWaktu: 86.4, // Di bawah 90% (Oranye peringatan)
        rataRataWaktuJam: 7.2,
        standarSlaJam: 6.0,
        totalDokumen: 260,
        dokumenTepatWaktu: 225,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 5: DATA REALISASI KUOTA INDUK BARANG KONSUMSI (TERTUTUP, JIKA UPDATE)
  // --------------------------------------------------------------------------
  realisasiKuotaKonsumsi: {
    metadata: {
      namaDataset: 'Data Realisasi Kuota Induk Barang Konsumsi',
      sifatData: 'Tertutup',
      periodeUpdate: 'Jika Update',
    },
    records: [
      {
        id: 'KUO-01',
        kodeHs: 'HS 1006.30 (Beras)',
        komoditas: 'Beras Premium & Medium',
        tahun: 2026,
        kuotaTon: 48000,
        realisasiTon: 43200,
        persentaseRealisasi: 90.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/01/2026',
        tanggalSk: '15 Jan 2026',
      },
      {
        id: 'KUO-02',
        kodeHs: 'HS 1701.99 (Gula Pasir)',
        komoditas: 'Gula Kristal Putih',
        tahun: 2026,
        kuotaTon: 32000,
        realisasiTon: 29440,
        persentaseRealisasi: 92.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/02/2026',
        tanggalSk: '18 Jan 2026',
      },
      {
        id: 'KUO-03',
        kodeHs: 'HS 0201.30 (Daging Sapi)',
        komoditas: 'Daging Sapi Beku & Segar',
        tahun: 2026,
        kuotaTon: 8500,
        realisasiTon: 7650,
        persentaseRealisasi: 90.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/03/2026',
        tanggalSk: '22 Jan 2026',
      },
      {
        id: 'KUO-04',
        kodeHs: 'HS 0703.20 (Bawang Putih)',
        komoditas: 'Bawang Putih & Bombay',
        tahun: 2026,
        kuotaTon: 12000,
        realisasiTon: 11160,
        persentaseRealisasi: 93.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/04/2026',
        tanggalSk: '25 Jan 2026',
      },
      {
        id: 'KUO-05',
        kodeHs: 'HS 1511.90 (Minyak Goreng)',
        komoditas: 'Minyak Goreng Sawit Kemasan',
        tahun: 2026,
        kuotaTon: 18000,
        realisasiTon: 15300,
        persentaseRealisasi: 85.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/05/2026',
        tanggalSk: '29 Jan 2026',
      },
      {
        id: 'KUO-06',
        kodeHs: 'HS 1101.00 (Tepung Terigu)',
        komoditas: 'Tepung Gandum / Terigu',
        tahun: 2026,
        kuotaTon: 22000,
        realisasiTon: 19800,
        persentaseRealisasi: 90.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/06/2026',
        tanggalSk: '02 Feb 2026',
      },
      {
        id: 'KUO-07',
        kodeHs: 'HS 0402.10 (Susu Bubuk)',
        komoditas: 'Susu Bubuk & Olahan Lembu',
        tahun: 2026,
        kuotaTon: 6500,
        realisasiTon: 5200,
        persentaseRealisasi: 80.0,
        satuan: 'Ton',
        noSk: 'SK.KUOTA/LLB/07/2026',
        tanggalSk: '05 Feb 2026',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 6: DATA KBLI PERUSAHAAN PEMILIK IZIN USAHA KAWASAN (TERBUKA, PERBULAN)
  // --------------------------------------------------------------------------
  sebaranKbliIuk: {
    metadata: {
      namaDataset: 'Data KBLI Perusahaan yang Memiliki Izin Usaha Kawasan',
      sifatData: 'Terbuka',
      periodeUpdate: 'Perbulan',
    },
    records: [
      {
        id: 'KBLI-01',
        kodeKbli: '26110',
        namaKbli: 'Industri Komponen Elektronika',
        displayKbli: '26110 - Komponen Elektronika',
        jumlahPerusahaan: 385,
        porsiPersen: 27.1,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Infineon Technologies Batam', noIzinUsahaKawasan: 'IUK-BTM/2024/0112', lokasiKawasan: 'Batamindo' },
          { namaPerusahaan: 'PT Pegatron Technology Indonesia', noIzinUsahaKawasan: 'IUK-BTM/2023/0488', lokasiKawasan: 'Batamindo' },
          { namaPerusahaan: 'PT Schneider Electric Manufacturing', noIzinUsahaKawasan: 'IUK-BTM/2022/0091', lokasiKawasan: 'Mukakuning' },
        ],
      },
      {
        id: 'KBLI-02',
        kodeKbli: '30111',
        namaKbli: 'Industri Pembuatan Kapal & Perahu',
        displayKbli: '30111 - Galangan Kapal & Maritim',
        jumlahPerusahaan: 245,
        porsiPersen: 17.3,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Bandar Abadi Shipyard', noIzinUsahaKawasan: 'IUK-BTM/2023/0204', lokasiKawasan: 'Tanjung Uncang' },
          { namaPerusahaan: 'PT Graha Marine Indah', noIzinUsahaKawasan: 'IUK-BTM/2024/0315', lokasiKawasan: 'Sagulung' },
          { namaPerusahaan: 'PT Citra Shipyard Batam', noIzinUsahaKawasan: 'IUK-BTM/2022/0150', lokasiKawasan: 'Sei Lekop' },
        ],
      },
      {
        id: 'KBLI-03',
        kodeKbli: '52101',
        namaKbli: 'Pergudangan & Penyimpanan Kawasan Bebas',
        displayKbli: '52101 - Pergudangan Berikat & Logistik',
        jumlahPerusahaan: 215,
        porsiPersen: 15.1,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Batam Logistik Terpadu', noIzinUsahaKawasan: 'IUK-BTM/2024/0621', lokasiKawasan: 'Batu Ampar' },
          { namaPerusahaan: 'PT Kabil Warehouse Sentosa', noIzinUsahaKawasan: 'IUK-BTM/2023/0512', lokasiKawasan: 'Kabil Port' },
        ],
      },
      {
        id: 'KBLI-04',
        kodeKbli: '20111',
        namaKbli: 'Industri Kimia Dasar Anorganik',
        displayKbli: '20111 - Industri Kimia Dasar',
        jumlahPerusahaan: 148,
        porsiPersen: 10.4,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Air Liquide Indonesia Batam', noIzinUsahaKawasan: 'IUK-BTM/2023/0187', lokasiKawasan: 'Kabil' },
          { namaPerusahaan: 'PT Vopak Terminal Batam', noIzinUsahaKawasan: 'IUK-BTM/2022/0290', lokasiKawasan: 'Tanjung Sauh' },
        ],
      },
      {
        id: 'KBLI-05',
        kodeKbli: '28111',
        namaKbli: 'Industri Mesin & Turbin Presisi',
        displayKbli: '28111 - Mesin & Turbin Presisi',
        jumlahPerusahaan: 122,
        porsiPersen: 8.6,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Caterpillar Batam Industrial', noIzinUsahaKawasan: 'IUK-BTM/2023/0411', lokasiKawasan: 'Batu Ampar' },
          { namaPerusahaan: 'PT Precision Tooling Batam', noIzinUsahaKawasan: 'IUK-BTM/2024/0074', lokasiKawasan: 'Panbil' },
        ],
      },
      {
        id: 'KBLI-06',
        kodeKbli: '63111',
        namaKbli: 'Pusat Data (Data Center & Hosting)',
        displayKbli: '63111 - Pusat Data & Cloud AI',
        jumlahPerusahaan: 92,
        porsiPersen: 6.5,
        contohPerusahaan: [
          { namaPerusahaan: 'PT GDS IDC Batam Data Center', noIzinUsahaKawasan: 'IUK-BTM/2024/0702', lokasiKawasan: 'KEK Nongsa' },
          { namaPerusahaan: 'PT Princeton Digital Group Batam', noIzinUsahaKawasan: 'IUK-BTM/2023/0650', lokasiKawasan: 'Nongsa' },
        ],
      },
      {
        id: 'KBLI-07',
        kodeKbli: '27201',
        namaKbli: 'Industri Sel Surya & Baterai Listrik',
        displayKbli: '27201 - Sel Surya & Baterai Energi',
        jumlahPerusahaan: 78,
        porsiPersen: 5.5,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Sunseap Solar Batam', noIzinUsahaKawasan: 'IUK-BTM/2024/0231', lokasiKawasan: 'Tunas Prima' },
          { namaPerusahaan: 'PT Batam Energy Storage System', noIzinUsahaKawasan: 'IUK-BTM/2024/0519', lokasiKawasan: 'Kabil' },
        ],
      },
      {
        id: 'KBLI-08',
        kodeKbli: '33151',
        namaKbli: 'Reparasi & Perawatan Pesawat Terbang (MRO)',
        displayKbli: '33151 - Aviasi & MRO Pesawat',
        jumlahPerusahaan: 54,
        porsiPersen: 3.8,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Batam Aero Technic (Lion Group)', noIzinUsahaKawasan: 'IUK-BTM/2022/0018', lokasiKawasan: 'KEK Hang Nadim' },
        ],
      },
      {
        id: 'KBLI-09',
        kodeKbli: '21012',
        namaKbli: 'Industri Farmasi & Alat Kesehatan',
        displayKbli: '21012 - Farmasi & Alat Kesehatan',
        jumlahPerusahaan: 45,
        porsiPersen: 3.2,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Medika Biomedikal Batam', noIzinUsahaKawasan: 'IUK-BTM/2024/0488', lokasiKawasan: 'KEK Sekupang' },
        ],
      },
      {
        id: 'KBLI-10',
        kodeKbli: '46311',
        namaKbli: 'Perdagangan Besar Bahan Makanan Pokok',
        displayKbli: '46311 - Distribusi Bahan Pokok',
        jumlahPerusahaan: 36,
        porsiPersen: 2.5,
        contohPerusahaan: [
          { namaPerusahaan: 'PT Sinar Pangan Batam Mandiri', noIzinUsahaKawasan: 'IUK-BTM/2023/0312', lokasiKawasan: 'Batu Ampar' },
        ],
      },
    ],
  },
};
