// ============================================================================
// DATASET DIREKTORAT PENGELOLAAN PERTANAHAN (SEBELUMNYA DIT. PENGELOLAAN LAHAN)
// BP BATAM - BUKU SATU DATA & PERKIN DEP-A3
// Semua data dummy realistis dikemas dalam satu objek JSON terpadu
// ============================================================================

export interface LayananPertanahanItem {
  id: string;
  jenisLayanan: string;
  singkatan: string;
  disetujui: number;
  ditolak: number;
  total: number;
  persenDisetujui: number;
  slaHari: number;
}

export interface TrenPermohonanBulanItem {
  bulanKode: string;
  bulan: string;
  disetujui: number;
  ditolak: number;
  total: number;
  persenDisetujui: number;
}

export interface PersetujuanPemohonItem {
  id: string;
  jenisPemohon: string;
  disetujui: number;
  ditolak: number;
  total: number;
  persenDisetujui: number;
}

export interface PeralihanHakPemohonItem {
  id: string;
  jenisPemohon: string;
  persentase: number;
  jumlahBerkas: number;
}

export interface SwpLahanTersediaItem {
  swpKode: string;
  swpNama: string;
  luasHa: number;
  jumlahPersil: number;
  rataRataLuasPerPersil: number;
  peruntukan: string;
}

export interface PnbpJenisPenerimaanItem {
  jenisPenerimaan: string;
  anggaranIdrMiliar: number;
  persenShare: number;
  deskripsi: string;
  warna: string;
}

export interface DirektoratPertanahanDataSchema {
  metadata: {
    unitId: string;
    unitNama: string;
    unitNamaSebelumnya: string;
    deputiId: string;
    deputiNama: string;
    versiData: string;
    tahunAktif: number;
  };
  katalogDataset: {
    datasetPermohonanLayanan: {
      klasifikasi: 'Terbuka';
      frekuensi: 'jika update';
      nama: string;
    };
    datasetPeralihanHak: {
      klasifikasi: 'Terbuka';
      frekuensi: 'jika update';
      nama: string;
    };
    datasetLahanTersediaSwp: {
      klasifikasi: 'Tertutup';
      frekuensi: 'pertahun';
      nama: string;
    };
    datasetTargetPenerimaanPnbp: {
      klasifikasi: 'Tertutup';
      frekuensi: 'jika update';
      nama: string;
    };
  };
  // Kartu 1: Permohonan Layanan Pertanahan per Jenis Layanan
  permohonanPerJenisLayanan: {
    filterOptions: {
      periodeRekap: string[];
      jenisPemohon: string[];
    };
    records: LayananPertanahanItem[];
  };
  // Kartu 2: Tren Permohonan per Periode Rekap
  trenPermohonanPerBulan: {
    filterOptions: {
      jenisLayanan: string[];
      jenisPemohon: string[];
    };
    records: TrenPermohonanBulanItem[];
  };
  // Kartu 3: Tingkat Persetujuan per Jenis Pemohon
  tingkatPersetujuanPemohon: {
    filterOptions: {
      jenisLayanan: string[];
      periodeRekap: string[];
    };
    records: PersetujuanPemohonItem[];
  };
  // Kartu 4: Perizinan Peralihan Hak atas Tanah per Jenis Pemohon
  peralihanHakPerPemohon: {
    filterOptions: {
      periodeRekap: string[];
    };
    records: PeralihanHakPemohonItem[];
  };
  // Kartu 5: Lahan Tersedia per Sub Wilayah Pengembangan (SWP)
  lahanTersediaSwp: {
    filterOptions: {
      tahun: string[];
    };
    recordsByYear: Record<string, SwpLahanTersediaItem[]>;
  };
  // Kartu 6: Target Penerimaan PNBP per Jenis Penerimaan
  targetPnbpPerJenisPenerimaan: {
    totalAnggaranMiliar: number;
    records: PnbpJenisPenerimaanItem[];
  };
}

// ============================================================================
// SINGLE UNIFIED JSON OBJECT
// ============================================================================
export const PERTANAHAN_VISUALISASI_DATA: DirektoratPertanahanDataSchema = {
  metadata: {
    unitId: 'dit-pertanahan',
    unitNama: 'Direktorat Pengelolaan Pertanahan',
    unitNamaSebelumnya: 'Direktorat Pengelolaan Lahan',
    deputiId: 'deputi-3',
    deputiNama: 'Deputi Bidang Pengelolaan Lahan, Pesisir dan Reklamasi (DEP-A3)',
    versiData: 'Satu Data BP Batam 2026.1',
    tahunAktif: 2026,
  },
  katalogDataset: {
    datasetPermohonanLayanan: {
      klasifikasi: 'Terbuka',
      frekuensi: 'jika update',
      nama: 'Rekapitulasi Penerbitan SKPT dan SK Pengelolaan Tanah, Rekapitulasi Pecah Penetapan Lokasi (PL), Rekapitulasi Revisi Penetapan Lokasi (PL), Rekapitulasi Pembaharuan Hak atas Tanah, Rekapitulasi Pelayanan Penerbitan Faktur Perubahan Peruntukan, Rekapitulasi Hak Tanggungan, Rekapitulasi Dokumen Pengganti, Rekapitulasi Persetujuan Lelang, Rekapitulasi Layanan Rekomendasi, Rekapitulasi Jumlah Perizinan Perpanjangan Hak atas Tanah',
    },
    datasetPeralihanHak: {
      klasifikasi: 'Terbuka',
      frekuensi: 'jika update',
      nama: 'Rekapitulasi Jumlah Perizinan Peralihan Hak atas Tanah',
    },
    datasetLahanTersediaSwp: {
      klasifikasi: 'Tertutup',
      frekuensi: 'pertahun',
      nama: 'Lahan yang Tersedia dengan Area Sub Wilayah Pengembangan',
    },
    datasetTargetPenerimaanPnbp: {
      klasifikasi: 'Tertutup',
      frekuensi: 'jika update',
      nama: 'Laporan Target Penerimaan',
    },
  },

  // --------------------------------------------------------------------------
  // KARTU 1: PERMOHONAN LAYANAN PERTANAHAN PER JENIS LAYANAN (11 LAYANAN RESMI)
  // --------------------------------------------------------------------------
  permohonanPerJenisLayanan: {
    filterOptions: {
      periodeRekap: ['Semua Periode', '2026 (YTD)', '2025', 'TW I 2026', 'TW II 2026'],
      jenisPemohon: ['Semua Pemohon', 'Perorangan', 'Badan Usaha', 'Instansi Pemerintah'],
    },
    records: [
      {
        id: 'skpt',
        jenisLayanan: 'SKPT',
        singkatan: 'SKPT',
        disetujui: 1420,
        ditolak: 130,
        total: 1550,
        persenDisetujui: 91.6,
        slaHari: 3.2,
      },
      {
        id: 'perpanjangan-hak',
        jenisLayanan: 'Perpanjangan Hak atas Tanah',
        singkatan: 'Perpanjangan Hak',
        disetujui: 1250,
        ditolak: 110,
        total: 1360,
        persenDisetujui: 91.9,
        slaHari: 2.8,
      },
      {
        id: 'pecah-pl',
        jenisLayanan: 'Pecah PL',
        singkatan: 'Pecah PL',
        disetujui: 890,
        ditolak: 125,
        total: 1015,
        persenDisetujui: 87.7,
        slaHari: 3.5,
      },
      {
        id: 'revisi-pl',
        jenisLayanan: 'Revisi PL',
        singkatan: 'Revisi PL',
        disetujui: 780,
        ditolak: 95,
        total: 875,
        persenDisetujui: 89.1,
        slaHari: 3.0,
      },
      {
        id: 'hak-tanggungan',
        jenisLayanan: 'Hak Tanggungan',
        singkatan: 'Hak Tanggungan',
        disetujui: 640,
        ditolak: 42,
        total: 682,
        persenDisetujui: 93.8,
        slaHari: 1.8,
      },
      {
        id: 'pembaharuan-hak',
        jenisLayanan: 'Pembaharuan Hak atas Tanah',
        singkatan: 'Pembaharuan Hak',
        disetujui: 580,
        ditolak: 65,
        total: 645,
        persenDisetujui: 89.9,
        slaHari: 2.6,
      },
      {
        id: 'sk-pengelolaan-tanah',
        jenisLayanan: 'SK Pengelolaan Tanah',
        singkatan: 'SK Pengelolaan',
        disetujui: 490,
        ditolak: 38,
        total: 528,
        persenDisetujui: 92.8,
        slaHari: 2.5,
      },
      {
        id: 'faktur-perubahan-peruntukan',
        jenisLayanan: 'Faktur Perubahan Peruntukan',
        singkatan: 'Perubahan Peruntukan',
        disetujui: 410,
        ditolak: 72,
        total: 482,
        persenDisetujui: 85.1,
        slaHari: 3.8,
      },
      {
        id: 'layanan-rekomendasi',
        jenisLayanan: 'Layanan Rekomendasi',
        singkatan: 'Rekomendasi',
        disetujui: 320,
        ditolak: 35,
        total: 355,
        persenDisetujui: 90.1,
        slaHari: 2.0,
      },
      {
        id: 'dokumen-pengganti',
        jenisLayanan: 'Dokumen Pengganti',
        singkatan: 'Dok. Pengganti',
        disetujui: 210,
        ditolak: 18,
        total: 228,
        persenDisetujui: 92.1,
        slaHari: 1.5,
      },
      {
        id: 'persetujuan-lelang',
        jenisLayanan: 'Persetujuan Lelang',
        singkatan: 'Persetujuan Lelang',
        disetujui: 150,
        ditolak: 24,
        total: 174,
        persenDisetujui: 86.2,
        slaHari: 2.4,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 2: TREN PERMOHONAN PER PERIODE REKAP (12 BULAN LENGKAP)
  // --------------------------------------------------------------------------
  trenPermohonanPerBulan: {
    filterOptions: {
      jenisLayanan: [
        'Semua Layanan',
        'SKPT',
        'SK Pengelolaan Tanah',
        'Pecah PL',
        'Revisi PL',
        'Pembaharuan Hak atas Tanah',
        'Faktur Perubahan Peruntukan',
        'Hak Tanggungan',
        'Dokumen Pengganti',
        'Persetujuan Lelang',
        'Layanan Rekomendasi',
        'Perpanjangan Hak atas Tanah',
      ],
      jenisPemohon: ['Semua Pemohon', 'Perorangan', 'Badan Usaha', 'Instansi Pemerintah'],
    },
    records: [
      { bulanKode: '01', bulan: 'Januari', disetujui: 540, ditolak: 58, total: 598, persenDisetujui: 90.3 },
      { bulanKode: '02', bulan: 'Februari', disetujui: 512, ditolak: 52, total: 564, persenDisetujui: 90.8 },
      { bulanKode: '03', bulan: 'Maret', disetujui: 618, ditolak: 64, total: 682, persenDisetujui: 90.6 },
      { bulanKode: '04', bulan: 'April', disetujui: 645, ditolak: 68, total: 713, persenDisetujui: 90.5 },
      { bulanKode: '05', bulan: 'Mei', disetujui: 590, ditolak: 62, total: 652, persenDisetujui: 90.5 },
      { bulanKode: '06', bulan: 'Juni', disetujui: 632, ditolak: 66, total: 698, persenDisetujui: 90.5 },
      { bulanKode: '07', bulan: 'Juli', disetujui: 654, ditolak: 70, total: 724, persenDisetujui: 90.3 },
      { bulanKode: '08', bulan: 'Agustus', disetujui: 588, ditolak: 60, total: 648, persenDisetujui: 90.7 },
      { bulanKode: '09', bulan: 'September', disetujui: 575, ditolak: 58, total: 633, persenDisetujui: 90.8 },
      { bulanKode: '10', bulan: 'Oktober', disetujui: 624, ditolak: 65, total: 689, persenDisetujui: 90.6 },
      { bulanKode: '11', bulan: 'November', disetujui: 562, ditolak: 56, total: 618, persenDisetujui: 90.9 },
      { bulanKode: '12', bulan: 'Desember', disetujui: 600, ditolak: 75, total: 675, persenDisetujui: 88.9 },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 3: TINGKAT PERSETUJUAN PER JENIS PEMOHON (PROGRESS BAR DENGAN THRESHOLD 90%)
  // --------------------------------------------------------------------------
  tingkatPersetujuanPemohon: {
    filterOptions: {
      jenisLayanan: [
        'Semua Layanan',
        'SKPT',
        'SK Pengelolaan Tanah',
        'Pecah PL',
        'Revisi PL',
        'Perpanjangan Hak',
      ],
      periodeRekap: ['Semua Periode', '2026 (YTD)', '2025'],
    },
    records: [
      {
        id: 'instansi-pemerintah',
        jenisPemohon: 'Instansi Pemerintah',
        disetujui: 250,
        ditolak: 10,
        total: 260,
        persenDisetujui: 96.2,
      },
      {
        id: 'perorangan',
        jenisPemohon: 'Perorangan',
        disetujui: 3820,
        ditolak: 360,
        total: 4180,
        persenDisetujui: 91.4,
      },
      {
        id: 'badan-usaha',
        jenisPemohon: 'Badan Usaha (PT / CV)',
        disetujui: 2640,
        ditolak: 320,
        total: 2960,
        persenDisetujui: 89.2,
      },
      {
        id: 'yayasan',
        jenisPemohon: 'Yayasan & Lembaga Sosial',
        disetujui: 280,
        ditolak: 40,
        total: 320,
        persenDisetujui: 87.5,
      },
      {
        id: 'koperasi',
        jenisPemohon: 'Koperasi',
        disetujui: 150,
        ditolak: 24,
        total: 174,
        persenDisetujui: 86.2,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 4: PERIZINAN PERALIHAN HAK ATAS TANAH PER JENIS PEMOHON
  // --------------------------------------------------------------------------
  peralihanHakPerPemohon: {
    filterOptions: {
      periodeRekap: ['Semua Periode', '2026 (YTD)', '2025', '2024'],
    },
    records: [
      {
        id: 'pt-cv',
        jenisPemohon: 'Badan Usaha (PT / CV)',
        persentase: 44.5,
        jumlahBerkas: 845,
      },
      {
        id: 'perorangan-pribadi',
        jenisPemohon: 'Perorangan',
        persentase: 38.2,
        jumlahBerkas: 725,
      },
      {
        id: 'bumn-bumd',
        jenisPemohon: 'BUMN / BUMD',
        persentase: 8.5,
        jumlahBerkas: 162,
      },
      {
        id: 'yayasan-lembaga',
        jenisPemohon: 'Yayasan & Sosial',
        persentase: 5.4,
        jumlahBerkas: 103,
      },
      {
        id: 'koperasi-usaha',
        jenisPemohon: 'Koperasi',
        persentase: 3.4,
        jumlahBerkas: 65,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 5: LAHAN TERSEDIA PER SUB WILAYAH PENGEMBANGAN (SWP)
  // --------------------------------------------------------------------------
  lahanTersediaSwp: {
    filterOptions: {
      tahun: ['2026', '2025', '2024'],
    },
    recordsByYear: {
      '2026': [
        {
          swpKode: 'SWP III',
          swpNama: 'SWP III - Kabil (Industri Berat & Maritim)',
          luasHa: 94.2,
          jumlahPersil: 68,
          rataRataLuasPerPersil: 1.39,
          peruntukan: 'Industri Berat, Fabrikasi Lepas Pantai & Clean Energy Hub',
        },
        {
          swpKode: 'SWP II',
          swpNama: 'SWP II - Nongsa (Digital Park & Wisata)',
          luasHa: 72.4,
          jumlahPersil: 54,
          rataRataLuasPerPersil: 1.34,
          peruntukan: 'KEK Digital Park, Hyperscale Data Center & Marina',
        },
        {
          swpKode: 'SWP I',
          swpNama: 'SWP I - Batam Centre (Komersial & Bisnis)',
          luasHa: 48.5,
          jumlahPersil: 38,
          rataRataLuasPerPersil: 1.28,
          peruntukan: 'Pusat Pemerintahan, Finansial & High-Rise Komersial',
        },
        {
          swpKode: 'SWP V',
          swpNama: 'SWP V - Sekupang (KEK Kesehatan & Wisata)',
          luasHa: 36.8,
          jumlahPersil: 29,
          rataRataLuasPerPersil: 1.27,
          peruntukan: 'KEK Pariwisata & Kesehatan Internasional RSBP Batam',
        },
        {
          swpKode: 'SWP VI',
          swpNama: 'SWP VI - Batu Aji (Industri Ringan & Hunian)',
          luasHa: 24.5,
          jumlahPersil: 22,
          rataRataLuasPerPersil: 1.11,
          peruntukan: 'Industri Manufaktur Ringan, Gudang Logistik & Pemukiman',
        },
        {
          swpKode: 'SWP VII',
          swpNama: 'SWP VII - Tanjung Uncang (Galangan Kapal)',
          luasHa: 23.5,
          jumlahPersil: 19,
          rataRataLuasPerPersil: 1.24,
          peruntukan: 'Industri Maritim, Galangan Kapal & Heavy Engineering',
        },
        {
          swpKode: 'SWP IV',
          swpNama: 'SWP IV - Batu Ampar (Depo & Logistik)',
          luasHa: 18.6,
          jumlahPersil: 16,
          rataRataLuasPerPersil: 1.16,
          peruntukan: 'Logistik Multimoda, Depo Peti Kemas & Gudang Berikat Maritim',
        },
      ],
      '2025': [
        {
          swpKode: 'SWP III',
          swpNama: 'SWP III - Kabil (Industri Berat & Maritim)',
          luasHa: 106.8,
          jumlahPersil: 74,
          rataRataLuasPerPersil: 1.44,
          peruntukan: 'Industri Berat, Fabrikasi Lepas Pantai & Clean Energy Hub',
        },
        {
          swpKode: 'SWP II',
          swpNama: 'SWP II - Nongsa (Digital Park & Wisata)',
          luasHa: 88.0,
          jumlahPersil: 62,
          rataRataLuasPerPersil: 1.42,
          peruntukan: 'KEK Digital Park, Hyperscale Data Center & Marina',
        },
        {
          swpKode: 'SWP I',
          swpNama: 'SWP I - Batam Centre (Komersial & Bisnis)',
          luasHa: 56.2,
          jumlahPersil: 44,
          rataRataLuasPerPersil: 1.28,
          peruntukan: 'Pusat Pemerintahan, Finansial & High-Rise Komersial',
        },
        {
          swpKode: 'SWP V',
          swpNama: 'SWP V - Sekupang (KEK Kesehatan & Wisata)',
          luasHa: 42.5,
          jumlahPersil: 34,
          rataRataLuasPerPersil: 1.25,
          peruntukan: 'KEK Pariwisata & Kesehatan Internasional RSBP Batam',
        },
        {
          swpKode: 'SWP VI',
          swpNama: 'SWP VI - Batu Aji (Industri Ringan & Hunian)',
          luasHa: 28.0,
          jumlahPersil: 25,
          rataRataLuasPerPersil: 1.12,
          peruntukan: 'Industri Manufaktur Ringan, Gudang Logistik & Pemukiman',
        },
        {
          swpKode: 'SWP VII',
          swpNama: 'SWP VII - Tanjung Uncang (Galangan Kapal)',
          luasHa: 26.8,
          jumlahPersil: 21,
          rataRataLuasPerPersil: 1.28,
          peruntukan: 'Industri Maritim, Galangan Kapal & Heavy Engineering',
        },
        {
          swpKode: 'SWP IV',
          swpNama: 'SWP IV - Batu Ampar (Depo & Logistik)',
          luasHa: 21.4,
          jumlahPersil: 18,
          rataRataLuasPerPersil: 1.19,
          peruntukan: 'Logistik Multimoda, Depo Peti Kemas & Gudang Berikat Maritim',
        },
      ],
      '2024': [
        {
          swpKode: 'SWP III',
          swpNama: 'SWP III - Kabil (Industri Berat & Maritim)',
          luasHa: 122.5,
          jumlahPersil: 82,
          rataRataLuasPerPersil: 1.49,
          peruntukan: 'Industri Berat, Fabrikasi Lepas Pantai & Clean Energy Hub',
        },
        {
          swpKode: 'SWP II',
          swpNama: 'SWP II - Nongsa (Digital Park & Wisata)',
          luasHa: 98.6,
          jumlahPersil: 70,
          rataRataLuasPerPersil: 1.41,
          peruntukan: 'KEK Digital Park, Hyperscale Data Center & Marina',
        },
        {
          swpKode: 'SWP I',
          swpNama: 'SWP I - Batam Centre (Komersial & Bisnis)',
          luasHa: 64.0,
          jumlahPersil: 51,
          rataRataLuasPerPersil: 1.25,
          peruntukan: 'Pusat Pemerintahan, Finansial & High-Rise Komersial',
        },
        {
          swpKode: 'SWP V',
          swpNama: 'SWP V - Sekupang (KEK Kesehatan & Wisata)',
          luasHa: 49.2,
          jumlahPersil: 39,
          rataRataLuasPerPersil: 1.26,
          peruntukan: 'KEK Pariwisata & Kesehatan Internasional RSBP Batam',
        },
        {
          swpKode: 'SWP VI',
          swpNama: 'SWP VI - Batu Aji (Industri Ringan & Hunian)',
          luasHa: 32.5,
          jumlahPersil: 29,
          rataRataLuasPerPersil: 1.12,
          peruntukan: 'Industri Manufaktur Ringan, Gudang Logistik & Pemukiman',
        },
        {
          swpKode: 'SWP VII',
          swpNama: 'SWP VII - Tanjung Uncang (Galangan Kapal)',
          luasHa: 30.2,
          jumlahPersil: 24,
          rataRataLuasPerPersil: 1.26,
          peruntukan: 'Industri Maritim, Galangan Kapal & Heavy Engineering',
        },
        {
          swpKode: 'SWP IV',
          swpNama: 'SWP IV - Batu Ampar (Depo & Logistik)',
          luasHa: 25.0,
          jumlahPersil: 21,
          rataRataLuasPerPersil: 1.19,
          peruntukan: 'Logistik Multimoda, Depo Peti Kemas & Gudang Berikat Maritim',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // KARTU 6: TARGET PENERIMAAN PNBP PER JENIS PENERIMAAN (DONUT CHART)
  // --------------------------------------------------------------------------
  targetPnbpPerJenisPenerimaan: {
    totalAnggaranMiliar: 850.0,
    records: [
      {
        jenisPenerimaan: 'UWT Alokasi Baru (30 Tahun)',
        anggaranIdrMiliar: 380.0,
        persenShare: 44.71,
        deskripsi: 'Uang Wajib Tahunan alokasi baru masa 30 tahun untuk investasi',
        warna: '#2563EB', // Biru utama
      },
      {
        jenisPenerimaan: 'Perpanjangan UWT Hak Atas Tanah',
        anggaranIdrMiliar: 280.0,
        persenShare: 32.94,
        deskripsi: 'Perpanjangan masa berlaku hak pengelolaan tanah berkala',
        warna: '#3B82F6', // Biru medium
      },
      {
        jenisPenerimaan: 'Peralihan Hak & Administrasi',
        anggaranIdrMiliar: 110.0,
        persenShare: 12.94,
        deskripsi: 'Biaya peralihan hak kepemilikan/penguasaan dan legalitas',
        warna: '#60A5FA', // Biru muda
      },
      {
        jenisPenerimaan: 'Perubahan Peruntukan & Pecah/Revisi PL',
        anggaranIdrMiliar: 80.0,
        persenShare: 9.41,
        deskripsi: 'Penerbitan faktur perubahan zonasi peruntukan dan penyesuaian PL',
        warna: '#94A3B8', // Abu-abu netral
      },
    ],
  },
};
