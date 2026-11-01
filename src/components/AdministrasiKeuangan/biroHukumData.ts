// ============================================================================
// DATASET MASTER BIRO HUKUM BP BATAM
// Seluruh data disimpan dalam satu objek JSON terpadu agar mudah diganti data riil
// ============================================================================

export interface LayananHukumBulanan {
  bulan: string;
  kajianHukum: number;          // Kajian Hukum / Rekomendasi Penyelesaian
  pendampinganHukum: number;    // Kegiatan Pendampingan Hukum
  nonLitigasi: number;          // Pelayanan Hukum Non Litigasi
  total: number;
}

export interface KomposisiLayananTahunan {
  tahun: string;
  items: {
    nama: string;
    jumlah: number;
    persentase: number;
    color: string;
  }[];
  totalKegiatan: number;
  layananTerbesar: {
    nama: string;
    persentase: number;
  };
}

export interface PerkaraBulanan {
  bulan: string;
  jumlahDokumen: number;
}

export interface PerkaraTerbaruItem {
  id: string;
  tanggal: string;
  tentang: string;
  klasifikasi: string;
  status: string;
}

export interface RancanganProdukHukumBulanan {
  bulan: string;
  rancanganPeraturan: number;
  rancanganKeputusan: number;
  rancanganPerjanjianMOU: number;
  total: number;
}

export interface RegulasiInvestasiSemester {
  semesterTahun: string;
  jumlahDokumen: number;
}

export interface RegulasiInvestasiItem {
  id: string;
  tanggal: string;
  tentang: string;
  nomorRegulasi: string;
  sektor: string;
}

export interface TingkatPenyelesaianHukumTahunan {
  tahun: string;
  perkaraMasuk: number;
  perkaraSelesai: number;
  persentasePerkara: number; // 0 - 100
  masalahMasuk: number;
  masalahSelesai: number;
  persentaseMasalah: number; // 0 - 100
  rerataPersentase: number;
}

export interface BiroHukumMasterData {
  metadata: {
    unit: string;
    induk: string;
    pemutakhiranTerakhir: string;
    temaVisual: string;
  };
  trenLayananHukum: {
    datasetName: string;
    accessLabel: 'Tertutup';
    monthlyRecords: LayananHukumBulanan[];
  };
  komposisiLayananHukum: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<string, KomposisiLayananTahunan>;
  };
  penangananPerkara: {
    datasetName: string;
    accessLabel: 'Tertutup';
    monthlyRecords: PerkaraBulanan[];
    perkaraTerbaru: PerkaraTerbaruItem[];
  };
  rancanganProdukHukum: {
    datasetName: string;
    accessLabel: 'Tertutup';
    monthlyRecords: RancanganProdukHukumBulanan[];
  };
  regulasiInvestasi: {
    datasetName: string;
    accessLabel: 'Terbatas';
    semesterRecords: RegulasiInvestasiSemester[];
    daftarRegulasiTerbaru: RegulasiInvestasiItem[];
  };
  penyelesaianPerkaraDanPermasalahan: {
    datasetName: string;
    accessLabel: 'Tertutup';
    yearlyRecords: TingkatPenyelesaianHukumTahunan[];
  };
}

export const BIRO_HUKUM_MASTER_DATA: BiroHukumMasterData = {
  metadata: {
    unit: 'Biro Hukum BP Batam',
    induk: 'Deputi Bidang Administrasi dan Keuangan (DEP-A1)',
    pemutakhiranTerakhir: 'Oktober 2026',
    temaVisual: 'Clean Blue & White Theme (2-Column Grid)',
  },

  // 1. KARTU 1 - TREN LAYANAN HUKUM PER BULAN (STACKED COLUMN)
  trenLayananHukum: {
    datasetName: 'Kajian Hukum, Kegiatan Pendampingan Hukum, Pelayanan Hukum Non Litigasi (Tertutup, perbulan)',
    accessLabel: 'Tertutup',
    monthlyRecords: [
      { bulan: 'Jan', kajianHukum: 7, pendampinganHukum: 5, nonLitigasi: 3, total: 15 },
      { bulan: 'Feb', kajianHukum: 8, pendampinganHukum: 4, nonLitigasi: 4, total: 16 },
      { bulan: 'Mar', kajianHukum: 9, pendampinganHukum: 6, nonLitigasi: 4, total: 19 },
      { bulan: 'Apr', kajianHukum: 8, pendampinganHukum: 5, nonLitigasi: 3, total: 16 },
      { bulan: 'Mei', kajianHukum: 9, pendampinganHukum: 7, nonLitigasi: 5, total: 21 },
      { bulan: 'Jun', kajianHukum: 10, pendampinganHukum: 6, nonLitigasi: 4, total: 20 },
      { bulan: 'Jul', kajianHukum: 8, pendampinganHukum: 5, nonLitigasi: 4, total: 17 },
      { bulan: 'Agu', kajianHukum: 9, pendampinganHukum: 6, nonLitigasi: 3, total: 18 },
      { bulan: 'Sep', kajianHukum: 8, pendampinganHukum: 5, nonLitigasi: 4, total: 17 },
      { bulan: 'Okt', kajianHukum: 7, pendampinganHukum: 4, nonLitigasi: 3, total: 14 },
      { bulan: 'Nov', kajianHukum: 4, pendampinganHukum: 3, nonLitigasi: 2, total: 9 },
      { bulan: 'Des', kajianHukum: 0, pendampinganHukum: 0, nonLitigasi: 0, total: 0 },
    ],
  },

  // 2. KARTU 2 - KOMPOSISI LAYANAN HUKUM (DONUT CHART)
  komposisiLayananHukum: {
    datasetName: 'Kajian Hukum, Kegiatan Pendampingan Hukum, Pelayanan Hukum Non Litigasi (Tertutup, perbulan)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025', '2024'],
    byTahun: {
      '2026': {
        tahun: '2026',
        items: [
          { nama: 'Kajian Hukum / Rekomendasi', jumlah: 87, persentase: 47.8, color: '#2563eb' },
          { nama: 'Pendampingan Hukum', jumlah: 56, persentase: 30.8, color: '#60a5fa' },
          { nama: 'Pelayanan Non Litigasi', jumlah: 39, persentase: 21.4, color: '#94a3b8' },
        ],
        totalKegiatan: 182,
        layananTerbesar: {
          nama: 'Kajian Hukum',
          persentase: 47.8,
        },
      },
      '2025': {
        tahun: '2025',
        items: [
          { nama: 'Kajian Hukum / Rekomendasi', jumlah: 98, persentase: 46.2, color: '#2563eb' },
          { nama: 'Pendampingan Hukum', jumlah: 68, persentase: 32.1, color: '#60a5fa' },
          { nama: 'Pelayanan Non Litigasi', jumlah: 46, persentase: 21.7, color: '#94a3b8' },
        ],
        totalKegiatan: 212,
        layananTerbesar: {
          nama: 'Kajian Hukum',
          persentase: 46.2,
        },
      },
      '2024': {
        tahun: '2024',
        items: [
          { nama: 'Kajian Hukum / Rekomendasi', jumlah: 92, persentase: 45.1, color: '#2563eb' },
          { nama: 'Pendampingan Hukum', jumlah: 64, persentase: 31.4, color: '#60a5fa' },
          { nama: 'Pelayanan Non Litigasi', jumlah: 48, persentase: 23.5, color: '#94a3b8' },
        ],
        totalKegiatan: 204,
        layananTerbesar: {
          nama: 'Kajian Hukum',
          persentase: 45.1,
        },
      },
    },
  },

  // 3. KARTU 3 - PENANGANAN PERKARA PER BULAN (LINE CHART + 5 PERKARA TERBARU)
  penangananPerkara: {
    datasetName: 'Kegiatan Penanganan Perkara (Tertutup, perbulan)',
    accessLabel: 'Tertutup',
    monthlyRecords: [
      { bulan: 'Jan', jumlahDokumen: 4 },
      { bulan: 'Feb', jumlahDokumen: 5 },
      { bulan: 'Mar', jumlahDokumen: 6 },
      { bulan: 'Apr', jumlahDokumen: 4 },
      { bulan: 'Mei', jumlahDokumen: 7 },
      { bulan: 'Jun', jumlahDokumen: 5 },
      { bulan: 'Jul', jumlahDokumen: 4 },
      { bulan: 'Agu', jumlahDokumen: 5 },
      { bulan: 'Sep', jumlahDokumen: 3 },
      { bulan: 'Okt', jumlahDokumen: 3 },
      { bulan: 'Nov', jumlahDokumen: 0 },
      { bulan: 'Des', jumlahDokumen: 0 },
    ],
    perkaraTerbaru: [
      { id: 'PKR-2026-042', tanggal: '18 Okt 2026', tentang: 'Gugatan TUN Sengketa Alokasi Lahan Industri Sekupang', klasifikasi: 'Perkara TUN', status: 'Sidang Pembuktian' },
      { id: 'PKR-2026-039', tanggal: '05 Okt 2026', tentang: 'Permohonan Mediasi Wanprestasi Sewa Dermaga Curah Kabil', klasifikasi: 'Perdata Non-Litigasi', status: 'Mediasi Tercapai' },
      { id: 'PKR-2026-035', tanggal: '22 Sep 2026', tentang: 'Sengketa Tumpang Tindih Batas PL Kawasan Nongsa Digital', klasifikasi: 'Sengketa Lahan', status: 'Pemeriksaan Lapangan' },
      { id: 'PKR-2026-031', tanggal: '14 Sep 2026', tentang: 'Praperadilan Keabsahan Penertiban Bangunan Liar Ditpam', klasifikasi: 'Pidana / Praperadilan', status: 'Putusan Menang BP' },
      { id: 'PKR-2026-028', tanggal: '29 Agu 2026', tentang: 'Klarifikasi Dugaan Pelanggaran Kontrak Pengadaan Pompa SPAM', klasifikasi: 'Perdata Arbitrase', status: 'Penyusunan Eksepsi' },
    ],
  },

  // 4. KARTU 4 - RANCANGAN PRODUK HUKUM PER BULAN (CLUSTERED COLUMN)
  rancanganProdukHukum: {
    datasetName: 'Daftar Rancangan Peraturan, Keputusan, serta Perjanjian dan Nota Kesepahaman BP Batam (Tertutup, perbulan)',
    accessLabel: 'Tertutup',
    monthlyRecords: [
      { bulan: 'Jan', rancanganPeraturan: 2, rancanganKeputusan: 4, rancanganPerjanjianMOU: 2, total: 8 },
      { bulan: 'Feb', rancanganPeraturan: 1, rancanganKeputusan: 5, rancanganPerjanjianMOU: 3, total: 9 },
      { bulan: 'Mar', rancanganPeraturan: 3, rancanganKeputusan: 6, rancanganPerjanjianMOU: 4, total: 13 },
      { bulan: 'Apr', rancanganPeraturan: 1, rancanganKeputusan: 4, rancanganPerjanjianMOU: 2, total: 7 },
      { bulan: 'Mei', rancanganPeraturan: 2, rancanganKeputusan: 5, rancanganPerjanjianMOU: 3, total: 10 },
      { bulan: 'Jun', rancanganPeraturan: 2, rancanganKeputusan: 6, rancanganPerjanjianMOU: 4, total: 12 },
      { bulan: 'Jul', rancanganPeraturan: 1, rancanganKeputusan: 3, rancanganPerjanjianMOU: 2, total: 6 },
      { bulan: 'Agu', rancanganPeraturan: 2, rancanganKeputusan: 4, rancanganPerjanjianMOU: 3, total: 9 },
      { bulan: 'Sep', rancanganPeraturan: 0, rancanganKeputusan: 0, rancanganPerjanjianMOU: 0, total: 0 },
      { bulan: 'Okt', rancanganPeraturan: 0, rancanganKeputusan: 0, rancanganPerjanjianMOU: 0, total: 0 },
      { bulan: 'Nov', rancanganPeraturan: 0, rancanganKeputusan: 0, rancanganPerjanjianMOU: 0, total: 0 },
      { bulan: 'Des', rancanganPeraturan: 0, rancanganKeputusan: 0, rancanganPerjanjianMOU: 0, total: 0 },
    ],
  },

  // 5. KARTU 5 - REGULASI YANG RELEVAN DENGAN INVESTASI (COLUMN CHART + TABEL KECIL)
  regulasiInvestasi: {
    datasetName: 'Daftar Regulasi yang Relevan dengan Investasi (Terbatas, persemester)',
    accessLabel: 'Terbatas',
    semesterRecords: [
      { semesterTahun: 'Sem I 2024', jumlahDokumen: 7 },
      { semesterTahun: 'Sem II 2024', jumlahDokumen: 9 },
      { semesterTahun: 'Sem I 2025', jumlahDokumen: 8 },
      { semesterTahun: 'Sem II 2025', jumlahDokumen: 11 },
      { semesterTahun: 'Sem I 2026', jumlahDokumen: 12 },
    ],
    daftarRegulasiTerbaru: [
      { id: 'REG-01', tanggal: '24 Jun 2026', tentang: 'Penyederhanaan Tata Cara Perizinan Berusaha Terintegrasi KEK Batam', nomorRegulasi: 'Perka No. 14 Th 2026', sektor: 'Investasi & KEK' },
      { id: 'REG-02', tanggal: '15 Mei 2026', tentang: 'Petunjuk Teknis Pemanfaatan Lahan Reklamasi Pesisir Batam', nomorRegulasi: 'Perka No. 11 Th 2026', sektor: 'Pertanahan' },
      { id: 'REG-03', tanggal: '02 Apr 2026', tentang: 'Tarif Layanan Pengelolaan Air Baku dan Limbah Industri Kawasan', nomorRegulasi: 'Kepka No. 89 Th 2026', sektor: 'Utilitas & SPAM' },
      { id: 'REG-04', tanggal: '19 Feb 2026', tentang: 'Tata Kelola Terminal Khusus dan TUKS Pelabuhan Bebas Batam', nomorRegulasi: 'Perka No. 04 Th 2026', sektor: 'Kepelabuhanan' },
      { id: 'REG-05', tanggal: '12 Jan 2026', tentang: 'Insentif Kemudahan Impor Barang Modal Industri High-Tech Batam', nomorRegulasi: 'Perka No. 01 Th 2026', sektor: 'Fasilitas & Cukai' },
    ],
  },

  // 6. KARTU 6 - PERSENTASE PENYELESAIAN PERKARA DAN PERMASALAHAN HUKUM (LINE DUA SERI + TARGET 100%)
  penyelesaianPerkaraDanPermasalahan: {
    datasetName: 'Persentase Penanganan Perkara yang Diselesaikan dan Persentase Pelayanan dan Penanganan Permasalahan Hukum yang Diselesaikan (Tertutup, pertahun)',
    accessLabel: 'Tertutup',
    yearlyRecords: [
      { tahun: '2022', perkaraMasuk: 38, perkaraSelesai: 34, persentasePerkara: 89.5, masalahMasuk: 142, masalahSelesai: 130, persentaseMasalah: 91.5, rerataPersentase: 90.5 },
      { tahun: '2023', perkaraMasuk: 42, perkaraSelesai: 38, persentasePerkara: 90.5, masalahMasuk: 165, masalahSelesai: 154, persentaseMasalah: 93.3, rerataPersentase: 91.9 },
      { tahun: '2024', perkaraMasuk: 45, perkaraSelesai: 42, persentasePerkara: 93.3, masalahMasuk: 184, masalahSelesai: 175, persentaseMasalah: 95.1, rerataPersentase: 94.2 },
      { tahun: '2025', perkaraMasuk: 48, perkaraSelesai: 46, persentasePerkara: 95.8, masalahMasuk: 206, masalahSelesai: 198, persentaseMasalah: 96.1, rerataPersentase: 95.9 },
      { tahun: '2026', perkaraMasuk: 46, perkaraSelesai: 44, persentasePerkara: 95.7, masalahMasuk: 182, masalahSelesai: 175, persentaseMasalah: 96.2, rerataPersentase: 95.9 },
    ],
  },
};
