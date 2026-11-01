// ============================================================================
// DATASET DUMMY RESMI: DIREKTORAT PERENCANAAN DAN PENGEMBANGAN INVESTASI
// BADAN PENGUSAHAAN BATAM (BP BATAM)
// Seluruh dataset dummy terstruktur rapi dalam satu objek JSON terpadu
// ============================================================================

export interface KekProfilItem {
  id: string;
  namaKek: string;
  namaSingkat: string;
  luasHa: number;
  lokasi: string;
  kegiatan: string;
  pengusul: string;
  kategoriKegiatan: 'Pariwisata & Kesehatan' | 'Industri Digital & Animasi' | 'Maintenance, Repair & Overhaul (MRO)' | 'Manufaktur & Energi';
  dasarHukum: string;
  tahunPenetapan: number;
}

export interface DayaSaingItem {
  kategori: string;
  kategoriSingkat: string;
  skorBatam: number;
  skorJohor: number;
  skorVietnam: number;
  skorKendal: number;
  satuan: string;
  uraian: string;
  keterangan: string;
}

export interface InvestasiKomitmenItem {
  id: string;
  kawasan: string;
  singkatan: string;
  nilaiKomitmenRpT: number;
  jumlahPerusahaan: number;
  targetTenagaKerja: number;
  dasarHukum: string;
  persentaseRealisasiKomitmen: number;
}

export interface StatusOperasionalItem {
  status: 'Beroperasi' | 'Konstruksi' | 'Belum Operasi';
  jumlah: number;
  persen: number;
  color: string;
  deskripsi: string;
}

export interface OperasionalPerKawasanItem {
  kawasan: string;
  totalPerusahaan: number;
  statusBreakdown: {
    beroperasi: number;
    konstruksi: number;
    belumOperasi: number;
  };
}

export interface MonevPeriodeItem {
  periode: string; // e.g. "TW I", "TW II", "TW III", "TW IV"
  kekNongsa: number;
  kekBat: number;
  kekSekupang: number;
  kekTanjungSauh: number;
  totalKegiatan: number;
  agendaUtama: string;
}

export interface UsulanKekItem {
  id: string;
  namaKek: string;
  pengusul: string;
  lokasi: string;
  luasUsulanHa: number;
  kegiatan: string;
  dasarHukumStatus: string;
  tahapanProgres: string;
  progresPersen: number;
  estimasiInvestasiRpT: number;
}

export interface PerencanaanInvestasiJsonData {
  unitInfo: {
    namaUnit: string;
    kodeUnit: string;
    deputi: string;
    tahun: number;
    deskripsi: string;
  };

  // KARTU 1: Profil Luas KEK
  profilLuasKek: {
    datasetInfo: {
      nama: string;
      sifat: 'Terbuka' | 'Tertutup';
      frekuensi: string;
    };
    filterOptions: {
      kegiatan: string[];
    };
    records: KekProfilItem[];
  };

  // KARTU 2: Perbandingan Daya Saing Kawasan
  dayaSaingKawasan: {
    datasetInfo: {
      nama: string;
      sifat: 'Terbuka' | 'Tertutup';
      frekuensi: string;
    };
    filterOptions: {
      tahunRekap: string[];
    };
    recordsByYear: Record<string, DayaSaingItem[]>;
  };

  // KARTU 3: Nilai Investasi Komitmen per Kawasan
  investasiKomitmen: {
    datasetInfo: {
      nama: string;
      sifat: 'Terbuka' | 'Tertutup';
      frekuensi: string;
    };
    filterOptions: {
      kawasan: string[];
    };
    records: InvestasiKomitmenItem[];
  };

  // KARTU 4: Status Operasional Perusahaan di KEK
  statusOperasional: {
    datasetInfo: {
      nama: string;
      sifat: 'Terbuka' | 'Tertutup';
      frekuensi: string;
    };
    filterOptions: {
      kawasan: string[];
    };
    recordsPerKawasan: Record<string, {
      totalPerusahaan: number;
      beroperasi: number;
      konstruksi: number;
      belumOperasi: number;
    }>;
  };

  // KARTU 5: Kegiatan Monitoring dan Evaluasi Kawasan
  monevKawasan: {
    datasetInfo: {
      nama: string;
      sifat: 'Terbuka' | 'Tertutup';
      frekuensi: string;
    };
    filterOptions: {
      tahun: string[];
      namaKek: string[];
    };
    recordsByYear: Record<string, MonevPeriodeItem[]>;
  };

  // KARTU 6: Perencanaan / Pengusulan KEK Baru
  pengusulanKekBaru: {
    datasetInfo: {
      nama: string;
      sifat: 'Terbuka' | 'Tertutup';
      frekuensi: string;
    };
    records: UsulanKekItem[];
  };
}

export const PERENCANAAN_INVESTASI_DATA: PerencanaanInvestasiJsonData = {
  unitInfo: {
    namaUnit: 'Direktorat Perencanaan dan Pengembangan Investasi',
    kodeUnit: 'DPPI',
    deputi: 'Deputi Bidang Investasi dan Pengusahaan (DEP-A4)',
    tahun: 2026,
    deskripsi: 'Pengembangan kawasan ekonomi terpadu, perbandingan daya saing KPBPBB & KEK, perizinan berusaha administrator, monitoring kepatuhan dan pipeline pengusulan KEK baru.',
  },

  // --------------------------------------------------------------------------
  // KARTU 1 - Luas Kawasan Ekonomi Khusus (KEK)
  // Dataset: Profil Kawasan Ekonomi Khusus (KEK) (Terbuka, jika update)
  // --------------------------------------------------------------------------
  profilLuasKek: {
    datasetInfo: {
      nama: 'Profil Kawasan Ekonomi Khusus (KEK)',
      sifat: 'Terbuka',
      frekuensi: 'jika update',
    },
    filterOptions: {
      kegiatan: [
        'Semua Kegiatan',
        'Manufaktur & Energi',
        'Industri Digital & Animasi',
        'Pariwisata & Kesehatan',
        'Maintenance, Repair & Overhaul (MRO)',
      ],
    },
    records: [
      {
        id: 'kek-tanjung-sauh',
        namaKek: 'KEK Tanjung Sauh',
        namaSingkat: 'Tanjung Sauh',
        luasHa: 840.67,
        lokasi: 'Pulau Tanjung Sauh, Nongsa, Batam',
        kegiatan: 'Manufaktur Komponen Elektronika & EBT',
        pengusul: 'PT Batam Port and Industrial Park (BPIP)',
        kategoriKegiatan: 'Manufaktur & Energi',
        dasarHukum: 'PP No. 24 Tahun 2024',
        tahunPenetapan: 2024,
      },
      {
        id: 'kek-nongsa',
        namaKek: 'KEK Nongsa Digital Park',
        namaSingkat: 'Nongsa Digital',
        luasHa: 166.45,
        lokasi: 'Kel. Sambau, Kec. Nongsa, Batam',
        kegiatan: 'Industri Digital, Software, AI & Animasi',
        pengusul: 'PT Taman Resor Internet',
        kategoriKegiatan: 'Industri Digital & Animasi',
        dasarHukum: 'PP No. 68 Tahun 2021',
        tahunPenetapan: 2021,
      },
      {
        id: 'kek-sekupang',
        namaKek: 'KEK Pariwisata Kesehatan Batam',
        namaSingkat: 'Pariwisata Kesehatan',
        luasHa: 47.85,
        lokasi: 'Kec. Sekupang, Batam',
        kegiatan: 'Pariwisata Medis & Fasilitas Kesehatan Internasional',
        pengusul: 'BP Batam & PT Medika Batam',
        kategoriKegiatan: 'Pariwisata & Kesehatan',
        dasarHukum: 'PP No. 39 Tahun 2024',
        tahunPenetapan: 2024,
      },
      {
        id: 'kek-bat',
        namaKek: 'KEK Batam Aero Technic',
        namaSingkat: 'Batam Aero Technic',
        luasHa: 30.00,
        lokasi: 'Bandara Internasional Hang Nadim, Batam',
        kegiatan: 'Perawatan, Perbaikan & Overhaul Pesawat (MRO)',
        pengusul: 'PT Batam Aero Technic (Lion Air Group)',
        kategoriKegiatan: 'Maintenance, Repair & Overhaul (MRO)',
        dasarHukum: 'PP No. 67 Tahun 2021',
        tahunPenetapan: 2021,
      },
      {
        id: 'kek-setokok',
        namaKek: 'KEK Setokok Industri Hijau',
        namaSingkat: 'Setokok Hijau',
        luasHa: 70.23,
        lokasi: 'Pulau Setokok, Kec. Bulang, Batam',
        kegiatan: 'Manufaktur Komponen Maritim Ramah Lingkungan',
        pengusul: 'PT Setokok Maritim Industri',
        kategoriKegiatan: 'Manufaktur & Energi',
        dasarHukum: 'Kepres No. 12 Tahun 2025',
        tahunPenetapan: 2025,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 2 - Perbandingan Daya Saing Kawasan
  // Dataset: Perbandingan Daya Saing Pengembangan KPBPB dan KEK (Tertutup, pertahun)
  // --------------------------------------------------------------------------
  dayaSaingKawasan: {
    datasetInfo: {
      nama: 'Perbandingan Daya Saing Pengembangan KPBPB dan KEK',
      sifat: 'Tertutup',
      frekuensi: 'pertahun',
    },
    filterOptions: {
      tahunRekap: ['2026 (YTD)', '2025', '2024'],
    },
    recordsByYear: {
      '2026 (YTD)': [
        {
          kategori: 'Konektivitas Logistik & Pelabuhan',
          kategoriSingkat: 'Konektivitas Logistik',
          skorBatam: 94.2,
          skorJohor: 91.5,
          skorVietnam: 86.0,
          skorKendal: 82.4,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Kedekatan jalur pelayaran internasional Malaka-Singapura, STS Batu Ampar',
          keterangan: 'Skor tertinggi Batam karena kedekatan direct transshipment hub Singapura',
        },
        {
          kategori: 'Insentif Fiskal & Fasilitas FTZ/KEK',
          kategoriSingkat: 'Insentif Fiskal FTZ',
          skorBatam: 92.5,
          skorJohor: 88.0,
          skorVietnam: 85.5,
          skorKendal: 84.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Bebas PPN, PPnBM, Bea Masuk, Tax Holiday s.d 20 tahun di KEK',
          keterangan: 'Paket insentif fiskal komprehensif diatur PP 41/2021 & regulasi KEK',
        },
        {
          kategori: 'Kemudahan Berusaha & OSS Terintegrasi',
          kategoriSingkat: 'Kemudahan Berusaha OSS',
          skorBatam: 88.6,
          skorJohor: 89.2,
          skorVietnam: 84.8,
          skorKendal: 86.5,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Layanan IBOSS BP Batam terintegrasi OSS Nasional, SLA izin < 3 jam',
          keterangan: 'Waktu perizinan berusaha administrator KEK terus membaik',
        },
        {
          kategori: 'Ketersediaan Infrastruktur & Energi Bersih',
          kategoriSingkat: 'Infrastruktur & Energi',
          skorBatam: 86.8,
          skorJohor: 92.0,
          skorVietnam: 81.5,
          skorKendal: 80.2,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Keandalan pasokan listrik industri, pasokan gas pipa PGN, PLTS Atap KEK',
          keterangan: 'Proyek interkoneksi energi hijau KEK Tanjung Sauh meningkatkan skor',
        },
        {
          kategori: 'Ketersediaan Lahan Industri Siap Bangun',
          kategoriSingkat: 'Ketersediaan Lahan',
          skorBatam: 85.0,
          skorJohor: 87.5,
          skorVietnam: 88.2,
          skorKendal: 89.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Bank tanah BP Batam dan kesiapan cut & fill di kawasan KEK baru',
          keterangan: 'Ketersediaan lahan matang diperluas melalui KEK Tanjung Sauh & Setokok',
        },
        {
          kategori: 'Kepastian Hukum & Regulasi Investasi',
          kategoriSingkat: 'Kepastian Hukum',
          skorBatam: 87.4,
          skorJohor: 90.0,
          skorVietnam: 83.0,
          skorKendal: 85.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Harmonisasi kewenangan BP Batam dan Pemko sesuai PP 62/2019',
          keterangan: 'Perlindungan kontrak investasi PMA dengan jaminan perpanjangan hak 80 thn',
        },
      ],
      '2025': [
        {
          kategori: 'Konektivitas Logistik & Pelabuhan',
          kategoriSingkat: 'Konektivitas Logistik',
          skorBatam: 93.5,
          skorJohor: 91.0,
          skorVietnam: 85.0,
          skorKendal: 81.5,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Kedekatan jalur pelayaran internasional Malaka-Singapura',
          keterangan: 'Skor stabil tinggi sepanjang 2025',
        },
        {
          kategori: 'Insentif Fiskal & Fasilitas FTZ/KEK',
          kategoriSingkat: 'Insentif Fiskal FTZ',
          skorBatam: 91.8,
          skorJohor: 87.5,
          skorVietnam: 84.8,
          skorKendal: 83.2,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Pembebasan bea masuk dan fasilitas masterlist KEK',
          keterangan: 'Daya tarik utama investor global',
        },
        {
          kategori: 'Kemudahan Berusaha & OSS Terintegrasi',
          kategoriSingkat: 'Kemudahan Berusaha OSS',
          skorBatam: 87.2,
          skorJohor: 88.8,
          skorVietnam: 83.9,
          skorKendal: 85.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Integrasi sistem IBOSS dengan kementerian investasi',
          keterangan: 'Proses simplifikasi perizinan berjalan',
        },
        {
          kategori: 'Ketersediaan Infrastruktur & Energi Bersih',
          kategoriSingkat: 'Infrastruktur & Energi',
          skorBatam: 85.2,
          skorJohor: 91.2,
          skorVietnam: 80.8,
          skorKendal: 79.5,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Kapasitas daya listrik dan cadangan air baku Waduk Tembesi',
          keterangan: 'Perlu peningkatan penetrasi energi terbarukan',
        },
        {
          kategori: 'Ketersediaan Lahan Industri Siap Bangun',
          kategoriSingkat: 'Ketersediaan Lahan',
          skorBatam: 83.8,
          skorJohor: 86.8,
          skorVietnam: 87.5,
          skorKendal: 88.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Alokasi lahan industri tahap 1 KEK baru',
          keterangan: 'Proses penyiapan infrastruktur dasar berlangsung',
        },
        {
          kategori: 'Kepastian Hukum & Regulasi Investasi',
          kategoriSingkat: 'Kepastian Hukum',
          skorBatam: 86.0,
          skorJohor: 89.5,
          skorVietnam: 82.2,
          skorKendal: 84.1,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Regulasi penataan ruang terpadu kawasan pulau Batam',
          keterangan: 'Implementasi kebijakan berjalan kondusif',
        },
      ],
      '2024': [
        {
          kategori: 'Konektivitas Logistik & Pelabuhan',
          kategoriSingkat: 'Konektivitas Logistik',
          skorBatam: 92.0,
          skorJohor: 90.2,
          skorVietnam: 84.0,
          skorKendal: 80.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Arus peti kemas dan konektivitas feeder Singapore',
          keterangan: 'Keunggulan geografis Batam',
        },
        {
          kategori: 'Insentif Fiskal & Fasilitas FTZ/KEK',
          kategoriSingkat: 'Insentif Fiskal FTZ',
          skorBatam: 90.5,
          skorJohor: 86.8,
          skorVietnam: 84.0,
          skorKendal: 82.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Pemberlakuan regulasi tax allowance & holiday',
          keterangan: 'Kompetitif di kawasan ASEAN',
        },
        {
          kategori: 'Kemudahan Berusaha & OSS Terintegrasi',
          kategoriSingkat: 'Kemudahan Berusaha OSS',
          skorBatam: 85.5,
          skorJohor: 88.0,
          skorVietnam: 82.5,
          skorKendal: 83.8,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Peluncuran sistem perizinan terintegrasi tahap awal',
          keterangan: 'Awal integrasi digitalisasi',
        },
        {
          kategori: 'Ketersediaan Infrastruktur & Energi Bersih',
          kategoriSingkat: 'Infrastruktur & Energi',
          skorBatam: 83.5,
          skorJohor: 90.0,
          skorVietnam: 79.5,
          skorKendal: 78.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Pembangunan jaringan pipa air dan gardu induk PLN Batam',
          keterangan: 'Infrastruktur dasar memadai',
        },
        {
          kategori: 'Ketersediaan Lahan Industri Siap Bangun',
          kategoriSingkat: 'Ketersediaan Lahan',
          skorBatam: 82.0,
          skorJohor: 85.5,
          skorVietnam: 86.0,
          skorKendal: 86.8,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Proses inventarisasi lahan tidur oleh BP Batam',
          keterangan: 'Penyiapan zonasi KEK baru',
        },
        {
          kategori: 'Kepastian Hukum & Regulasi Investasi',
          kategoriSingkat: 'Kepastian Hukum',
          skorBatam: 84.2,
          skorJohor: 88.8,
          skorVietnam: 81.0,
          skorKendal: 83.0,
          satuan: 'Skor Indeks (0-100)',
          uraian: 'Sosialisasi tata ruang kawasan bebas',
          keterangan: 'Perlu konsistensi pelaksanaan regulasi',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // KARTU 3 - Nilai Investasi Komitmen per Kawasan
  // Dataset: Daftar Perizinan Berusaha Administrator KEK (Tertutup, jika update)
  // --------------------------------------------------------------------------
  investasiKomitmen: {
    datasetInfo: {
      nama: 'Daftar Perizinan Berusaha Administrator KEK',
      sifat: 'Tertutup',
      frekuensi: 'jika update',
    },
    filterOptions: {
      kawasan: [
        'Semua Kawasan',
        'KEK Tanjung Sauh',
        'KEK Nongsa Digital Park',
        'KEK Batam Aero Technic',
        'KEK Pariwisata Kesehatan Batam',
        'KEK Setokok Industri Hijau',
      ],
    },
    records: [
      {
        id: 'komit-tanjung-sauh',
        kawasan: 'KEK Tanjung Sauh',
        singkatan: 'Tanjung Sauh',
        nilaiKomitmenRpT: 21.85,
        jumlahPerusahaan: 18,
        targetTenagaKerja: 14200,
        dasarHukum: 'PP No. 24/2024 & Izin Prinsip KEK No. 04/2024',
        persentaseRealisasiKomitmen: 42.5,
      },
      {
        id: 'komit-nongsa',
        kawasan: 'KEK Nongsa Digital Park',
        singkatan: 'Nongsa Digital',
        nilaiKomitmenRpT: 12.40,
        jumlahPerusahaan: 46,
        targetTenagaKerja: 6850,
        dasarHukum: 'PP No. 68/2021 & Administrator KEK NDP',
        persentaseRealisasiKomitmen: 78.4,
      },
      {
        id: 'komit-bat',
        kawasan: 'KEK Batam Aero Technic',
        singkatan: 'Batam Aero Technic',
        nilaiKomitmenRpT: 7.65,
        jumlahPerusahaan: 16,
        targetTenagaKerja: 4500,
        dasarHukum: 'PP No. 67/2021 & Administrator KEK BAT',
        persentaseRealisasiKomitmen: 84.2,
      },
      {
        id: 'komit-sekupang',
        kawasan: 'KEK Pariwisata Kesehatan Batam',
        singkatan: 'Pariwisata Kesehatan',
        nilaiKomitmenRpT: 5.80,
        jumlahPerusahaan: 20,
        targetTenagaKerja: 3950,
        dasarHukum: 'PP No. 39/2024 & Administrator KEK Sekupang',
        persentaseRealisasiKomitmen: 51.0,
      },
      {
        id: 'komit-setokok',
        kawasan: 'KEK Setokok Industri Hijau',
        singkatan: 'Setokok Hijau',
        nilaiKomitmenRpT: 3.25,
        jumlahPerusahaan: 8,
        targetTenagaKerja: 2100,
        dasarHukum: 'Kepres No. 12/2025 & NIB Administrator',
        persentaseRealisasiKomitmen: 31.8,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 4 - Status Operasional Perusahaan di KEK
  // Dataset: Daftar Perizinan Berusaha Administrator KEK (Tertutup, jika update)
  // --------------------------------------------------------------------------
  statusOperasional: {
    datasetInfo: {
      nama: 'Daftar Perizinan Berusaha Administrator KEK',
      sifat: 'Tertutup',
      frekuensi: 'jika update',
    },
    filterOptions: {
      kawasan: [
        'Semua Kawasan',
        'KEK Nongsa Digital Park',
        'KEK Batam Aero Technic',
        'KEK Pariwisata Kesehatan Batam',
        'KEK Tanjung Sauh',
        'KEK Setokok Industri Hijau',
      ],
    },
    recordsPerKawasan: {
      'Semua Kawasan': {
        totalPerusahaan: 108,
        beroperasi: 68,
        konstruksi: 26,
        belumOperasi: 14,
      },
      'KEK Nongsa Digital Park': {
        totalPerusahaan: 46,
        beroperasi: 34,
        konstruksi: 9,
        belumOperasi: 3,
      },
      'KEK Batam Aero Technic': {
        totalPerusahaan: 16,
        beroperasi: 13,
        konstruksi: 2,
        belumOperasi: 1,
      },
      'KEK Pariwisata Kesehatan Batam': {
        totalPerusahaan: 20,
        beroperasi: 11,
        konstruksi: 6,
        belumOperasi: 3,
      },
      'KEK Tanjung Sauh': {
        totalPerusahaan: 18,
        beroperasi: 7,
        konstruksi: 7,
        belumOperasi: 4,
      },
      'KEK Setokok Industri Hijau': {
        totalPerusahaan: 8,
        beroperasi: 3,
        konstruksi: 2,
        belumOperasi: 3,
      },
    },
  },

  // --------------------------------------------------------------------------
  // KARTU 5 - Kegiatan Monitoring dan Evaluasi Kawasan
  // Dataset: Daftar Kegiatan Monitoring dan Evaluasi Kawasan (Tertutup, jika update)
  // --------------------------------------------------------------------------
  monevKawasan: {
    datasetInfo: {
      nama: 'Daftar Kegiatan Monitoring dan Evaluasi Kawasan',
      sifat: 'Tertutup',
      frekuensi: 'jika update',
    },
    filterOptions: {
      tahun: ['2026 (Berjalan)', '2025'],
      namaKek: [
        'Semua KEK',
        'KEK Nongsa Digital Park',
        'KEK Batam Aero Technic',
        'KEK Pariwisata Kesehatan Batam',
        'KEK Tanjung Sauh',
      ],
    },
    recordsByYear: {
      '2026 (Berjalan)': [
        {
          periode: 'TW I 2026',
          kekNongsa: 4,
          kekBat: 3,
          kekSekupang: 3,
          kekTanjungSauh: 4,
          totalKegiatan: 14,
          agendaUtama: 'Verifikasi pemanfaatan ruang & kesiapan gardu listrik KEK',
        },
        {
          periode: 'TW II 2026',
          kekNongsa: 5,
          kekBat: 4,
          kekSekupang: 3,
          kekTanjungSauh: 5,
          totalKegiatan: 17,
          agendaUtama: 'Audit kepatuhan perizinan berusaha & implementasi fasilitas fiskal',
        },
        {
          periode: 'TW III 2026',
          kekNongsa: 4,
          kekBat: 3,
          kekSekupang: 4,
          kekTanjungSauh: 4,
          totalKegiatan: 15,
          agendaUtama: 'Evaluasi penyerapan naker lokal & progres konstruksi fisik BUPP',
        },
        {
          periode: 'TW IV 2026',
          kekNongsa: 4,
          kekBat: 3,
          kekSekupang: 3,
          kekTanjungSauh: 4,
          totalKegiatan: 14,
          agendaUtama: 'Penyusunan laporan tahunan kinerja Dewan Kawasan & Kemendagri',
        },
      ],
      '2025': [
        {
          periode: 'TW I 2025',
          kekNongsa: 3,
          kekBat: 3,
          kekSekupang: 2,
          kekTanjungSauh: 3,
          totalKegiatan: 11,
          agendaUtama: 'Monev penataan batas lahan & cut and fill tapak KEK',
        },
        {
          periode: 'TW II 2025',
          kekNongsa: 4,
          kekBat: 3,
          kekSekupang: 3,
          kekTanjungSauh: 4,
          totalKegiatan: 14,
          agendaUtama: 'Pengawasan fasilitas bea cukai & masterlist impor barang modal',
        },
        {
          periode: 'TW III 2025',
          kekNongsa: 4,
          kekBat: 3,
          kekSekupang: 3,
          kekTanjungSauh: 3,
          totalKegiatan: 13,
          agendaUtama: 'Monev fasilitas IPAL terpadu dan utilitas air bersih',
        },
        {
          periode: 'TW IV 2025',
          kekNongsa: 3,
          kekBat: 3,
          kekSekupang: 3,
          kekTanjungSauh: 4,
          totalKegiatan: 13,
          agendaUtama: 'Kompilasi capaian IKP investasi KEK tahun 2025',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // KARTU 6 - Perencanaan / Pengusulan KEK Baru
  // Dataset: Daftar Perencanaan/Pengusulan KEK (Terbuka, jika update)
  // --------------------------------------------------------------------------
  pengusulanKekBaru: {
    datasetInfo: {
      nama: 'Daftar Perencanaan/Pengusulan KEK',
      sifat: 'Terbuka',
      frekuensi: 'jika update',
    },
    records: [
      {
        id: 'usul-1',
        namaKek: 'KEK Rempang Eco-City Aerospace',
        pengusul: 'PT Makmur Elok Graha & Konsorsium',
        lokasi: 'Pulau Rempang, Galang, Batam',
        luasUsulanHa: 520.0,
        kegiatan: 'Industri Kaca Surya, Komponen Seluler & Aviasi',
        dasarHukumStatus: 'Tahap Verifikasi Dokumen Lingkungan (Amdal)',
        tahapanProgres: 'Persetujuan Teknis Dewan Kawasan',
        progresPersen: 85,
        estimasiInvestasiRpT: 18.5,
      },
      {
        id: 'usul-2',
        namaKek: 'KEK Galang Maritim & Offshore',
        pengusul: 'PT Galang Maritime Synergy',
        lokasi: 'Pulau Galang, Batam',
        luasUsulanHa: 380.5,
        kegiatan: 'Fabrikasi Modul Lepas Pantai & Ship Recycling Ramah Lingkungan',
        dasarHukumStatus: 'Pengusulan Rekomendasi Gubernur Kepri',
        tahapanProgres: 'Validasi Kesesuaian Tata Ruang Laut',
        progresPersen: 70,
        estimasiInvestasiRpT: 9.8,
      },
      {
        id: 'usul-3',
        namaKek: 'KEK Subang-Batam Logistics Hub',
        pengusul: 'PT Sentra Logistik Batam & BUMN',
        lokasi: 'Kabil, Nongsa, Batam',
        luasUsulanHa: 245.0,
        kegiatan: 'Pusat Logistik Berikat Hub Transshipment Multimoda',
        dasarHukumStatus: 'Penyusunan Dokumen Studi Kelayakan (FS)',
        tahapanProgres: 'Konsultasi Publik Dewan Nasional KEK',
        progresPersen: 60,
        estimasiInvestasiRpT: 6.4,
      },
      {
        id: 'usul-4',
        namaKek: 'KEK Tembesi Renewable Energy Hub',
        pengusul: 'Konsorsium Hijau Nusantara & BP Batam',
        lokasi: 'Tembesi, Sagulung, Batam',
        luasUsulanHa: 182.5,
        kegiatan: 'Pusat Riset & Manufaktur Baterai EV & Solar Panel',
        dasarHukumStatus: 'Pengajuan Surat Usulan ke Menko Perekonomian',
        tahapanProgres: 'Penetapan Lokasi (PL) BP Batam',
        progresPersen: 50,
        estimasiInvestasiRpT: 5.2,
      },
      {
        id: 'usul-5',
        namaKek: 'KEK Nongsa Artificial Intelligence Hub',
        pengusul: 'PT Nongsa Digital Synergy & Global Partner',
        lokasi: 'Perluasan Sambau, Nongsa, Batam',
        luasUsulanHa: 100.0,
        kegiatan: 'Pusat Riset Kecerdasan Buatan & Supercomputing Tier-IV',
        dasarHukumStatus: 'Penyusunan Rencana Induk & DED',
        tahapanProgres: 'Kajian Dampak Ekonomi Regional',
        progresPersen: 40,
        estimasiInvestasiRpT: 7.5,
      },
    ],
  },
};
