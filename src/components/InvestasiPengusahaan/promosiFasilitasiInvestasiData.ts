// ============================================================================
// DATASET DUMMY RESMI: DIREKTORAT PROMOSI DAN FASILITASI INVESTASI
// BADAN PENGUSAHAAN BATAM (BP BATAM) - DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN
// Seluruh dataset dummy terstruktur rapi dalam satu objek JSON terpadu
// ============================================================================

export interface TentatifPromosiItem {
  id: string;
  namaKegiatan: string;
  kategori: string;
  namaPenyelenggara: string;
  tanggalPelaksanaan: string;
  lokasi: string;
  jumlahTamu: number;
  tahun: number;
  statusKegiatan: 'Terjadwal' | 'Terlaksana' | 'Persiapan';
  deskripsi: string;
}

export interface FasilitasiBulananItem {
  bulan: string; // 'Jan', 'Feb', dst.
  bulanIndex: number;
  tahun: number;
  pendampinganIzin: number;
  fasilitasiLahan: number;
  mediasiRegulasi: number;
  konsultasiInsentif: number;
  totalKegiatan: number;
  totalTamu: number;
  highlightKegiatan: string;
  penyelenggaraUtama: string;
}

export interface KunjunganInvestorItem {
  triwulan: string; // 'TW I', 'TW II', 'TW III', 'TW IV'
  tahun: number;
  jumlahKunjungan: number;
  jumlahKunjunganTahunLalu: number;
  kunjunganPMA: number;
  kunjunganPMDN: number;
  negaraAsalTerbanyak: string;
  sektorDominan: string;
  catatan: string;
}

export interface TrafficWebsiteItem {
  periode: string; // 'TW I 2024', 'TW II 2024', ... 'TW IV 2026'
  tahun: number;
  triwulan: string;
  traffic: number;
  trafficSebelumnya: number;
  deltaPersen: number; // positif hijau, negatif oranye
  pengunjungUnik: number;
  topAsalNegara: string;
  halamanTerpopuler: string;
}

export interface PenerimaInsentifItem {
  triwulan: string; // 'TW I', 'TW II', 'TW III', 'TW IV'
  tahun: number;
  insentifFiskal: number;
  insentifNonFiskal: number;
  totalPenerima: number;
  contohPerusahaanFiskal: string[];
  contohPerusahaanNonFiskal: string[];
  jenisFasilitasDominan: string;
}

export interface ProyekInfrastrukturItem {
  id: string;
  namaProject: string;
  namaSingkat: string;
  nilaiInvestasiRpT: number; // Nilai Investasi dalam Rp Triliun
  nilaiInvestasiRaw: number; // Nilai dalam Rupiah penuh
  statusProject: 'Rencana' | 'Berjalan' | 'Selesai';
  lokasi: string;
  luas: string;
  pemilikProject: string;
  kapasitas: string;
  jadwal: string; // Periode pengerjaan
  kategoriSektor: string;
}

export interface PromosiFasilitasiDatabase {
  unitInfo: {
    namaUnit: string;
    kodeDeputi: string;
    deputi: string;
    instansi: string;
    versiData: string;
    tahunAnggaran: number;
  };
  tentatifKegiatanPromosi: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: TentatifPromosiItem[];
  };
  fasilitasiPendampingan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: FasilitasiBulananItem[];
  };
  kunjunganPeminatInvestor: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: KunjunganInvestorItem[];
  };
  kunjunganWebsiteInvest: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: TrafficWebsiteItem[];
  };
  penerimaInsentifInvestasi: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: PenerimaInsentifItem[];
  };
  proyekInfrastrukturBatam: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: ProyekInfrastrukturItem[];
  };
}

export const PROMOSI_FASILITASI_DATA: PromosiFasilitasiDatabase = {
  unitInfo: {
    namaUnit: 'Direktorat Promosi dan Fasilitasi Investasi',
    kodeDeputi: 'DEP-A4',
    deputi: 'Deputi Bidang Investasi dan Pengusahaan',
    instansi: 'Badan Pengusahaan Batam (BP Batam)',
    versiData: 'Katalog Satu Data BP Batam 2025/2026',
    tahunAnggaran: 2026,
  },

  // --------------------------------------------------------------------------
  // KARTU 1: TENTATIF KEGIATAN PROMOSI PER KATEGORI (DATASET TERBUKA, PERTAHUN)
  // --------------------------------------------------------------------------
  tentatifKegiatanPromosi: {
    metadata: {
      namaDataset: 'Tentatif Kegiatan Promosi',
      sifatData: 'Terbuka',
      periodeUpdate: 'Pertahun',
    },
    records: [
      {
        id: 'PRM-001',
        namaKegiatan: 'Hannover Messe Industrial Expo 2026',
        kategori: 'Pameran Investasi Internasional',
        namaPenyelenggara: 'Kementerian Investasi / BKPM & BP Batam',
        tanggalPelaksanaan: '20-24 April 2026',
        lokasi: 'Hannover Exhibition Center, Jerman',
        jumlahTamu: 320,
        tahun: 2026,
        statusKegiatan: 'Persiapan',
        deskripsi: 'Paviliun promosi industri semikonduktor, digital park, dan otomasi KEK Batam.',
      },
      {
        id: 'PRM-002',
        namaKegiatan: 'Singapore-Batam B2B Investment Forum',
        kategori: 'Forum Bisnis & Investment Summit',
        namaPenyelenggara: 'Singapore Business Federation (SBF) & BP Batam',
        tanggalPelaksanaan: '18 Mei 2026',
        lokasi: 'Marina Bay Sands Convention, Singapura',
        jumlahTamu: 280,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Forum dialog investasi teknologi tinggi, energi hijau, dan logistik trans-selat.',
      },
      {
        id: 'PRM-003',
        namaKegiatan: 'Batam International Green Energy Matchmaking',
        kategori: 'Business Matching B2B',
        namaPenyelenggara: 'Direktorat Promosi & Asosiasi PLTS Batam',
        tanggalPelaksanaan: '12-13 Juni 2026',
        lokasi: 'Radisson Golf & Convention Center Batam',
        jumlahTamu: 195,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Pencocokan bisnis antara investor panel surya, baterai ESS, dan industri manufaktur.',
      },
      {
        id: 'PRM-004',
        namaKegiatan: 'Misi Delegasi Investasi ke Tokyo & Osaka',
        kategori: 'Delegasi Kunjungan Luar Negeri',
        namaPenyelenggara: 'JETRO & BP Batam Diplomatic Mission',
        tanggalPelaksanaan: '07-11 Juli 2026',
        lokasi: 'Tokyo & Osaka, Jepang',
        jumlahTamu: 140,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Kunjungan ke prinsipal manufaktur presisi tinggi, alat kesehatan, dan chip design.',
      },
      {
        id: 'PRM-005',
        namaKegiatan: 'Batam Investment Roadshow Seoul 2026',
        kategori: 'Delegasi Kunjungan Luar Negeri',
        namaPenyelenggara: 'KOTRA & BP Batam Representative Office',
        tanggalPelaksanaan: '18-21 Agustus 2026',
        lokasi: 'COEX Convention Center Seoul, Korea Selatan',
        jumlahTamu: 165,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Roadshow kemudahan insentif KEK Nongsa Digital Park & BAT MRO kepada korporasi Korea.',
      },
      {
        id: 'PRM-006',
        namaKegiatan: 'Industrial Transformation Asia Pacific (ITAP)',
        kategori: 'Pameran Investasi Internasional',
        namaPenyelenggara: 'Deutsche Messe & SingEx Exhibitions',
        tanggalPelaksanaan: '14-16 Oktober 2026',
        lokasi: 'Singapore EXPO',
        jumlahTamu: 410,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Pameran manufaktur cerdas Industri 4.0 dan kesiapan infrastruktur KEK Batam.',
      },
      {
        id: 'PRM-007',
        namaKegiatan: 'Batam Global Investment Summit 2026',
        kategori: 'Forum Bisnis & Investment Summit',
        namaPenyelenggara: 'BP Batam & Kadin Kepulauan Riau',
        tanggalPelaksanaan: '04-05 November 2026',
        lokasi: 'Swiss-Belhotel Harbour Bay Batam',
        jumlahTamu: 450,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Summit tahunan puncak investasi BP Batam mengundang 500+ pimpinan korporasi multinasional.',
      },
      {
        id: 'PRM-008',
        namaKegiatan: 'Virtual Business Matching: Data Center Hub',
        kategori: 'Webinar & Roadshow Virtual',
        namaPenyelenggara: 'Invest in Batam Digital Marketing Unit',
        tanggalPelaksanaan: '25 Maret 2026',
        lokasi: 'Online Webinar Platform',
        jumlahTamu: 185,
        tahun: 2026,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Sesi temu bisnis daring bersama hyperscaler data center dari AS, Hong Kong, dan Eropa.',
      },
      {
        id: 'PRM-009',
        namaKegiatan: 'Webinar Regulasi PP 41/2021 & Kemudahan KEK',
        kategori: 'Webinar & Roadshow Virtual',
        namaPenyelenggara: 'Direktorat Promosi & Fasilitasi Investasi',
        tanggalPelaksanaan: '15 Februari 2026',
        lokasi: 'Zoom & Live YouTube Invest Batam',
        jumlahTamu: 230,
        tahun: 2026,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Sosialisasi fasilitas pembebasan bea masuk dan tax holiday kawasan bebas Batam.',
      },
      {
        id: 'PRM-010',
        namaKegiatan: 'Investor Networking Gala Dinner Batam',
        kategori: 'Investor Gathering & Temu Pelaku Usaha',
        namaPenyelenggara: 'BP Batam Corporate Relations',
        tanggalPelaksanaan: '28 Januari 2026',
        lokasi: 'Batam Marriott Hotel Harbour Bay',
        jumlahTamu: 210,
        tahun: 2026,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Apresiasi PMA/PMDN kontributor ekspor terbesar dan penyampaian roadmap investasi 2026.',
      },
      {
        id: 'PRM-011',
        namaKegiatan: 'China International Fair for Investment & Trade (CIFIT)',
        kategori: 'Pameran Investasi Internasional',
        namaPenyelenggara: 'Ministry of Commerce PRC & BP Batam',
        tanggalPelaksanaan: '08-11 September 2026',
        lokasi: 'Xiamen International Conference & Exhibition Center',
        jumlahTamu: 350,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Penjajakan investasi smelter bernilai tambah tinggi dan supply chain komponen elektronik.',
      },
      {
        id: 'PRM-012',
        namaKegiatan: 'Batam Medical Tourism & Healthcare Expo',
        kategori: 'Pameran Investasi Internasional',
        namaPenyelenggara: 'BP Batam RSBP & Konsorsium KEK Pariwisata Kesehatan',
        tanggalPelaksanaan: '10-12 Desember 2026',
        lokasi: 'Grand Batam Convention Hall',
        jumlahTamu: 260,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Pameran investasi rumah sakit internasional, stem-cell, dan wellness resort Sekupang.',
      },
      {
        id: 'PRM-013',
        namaKegiatan: 'Supplier Development Matching Day Batam',
        kategori: 'Business Matching B2B',
        namaPenyelenggara: 'Himpunan Kawasan Industri (HKI) & BP Batam',
        tanggalPelaksanaan: '22 Juli 2026',
        lokasi: 'Batamindo Industrial Park Multipurpose Hall',
        jumlahTamu: 175,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Menghubungkan tier-1 tenant manufaktur Batam dengan 40 UKM lokal tersertifikasi.',
      },
      {
        id: 'PRM-014',
        namaKegiatan: 'Diaspora & Tech Founders Meetup Singapore',
        kategori: 'Investor Gathering & Temu Pelaku Usaha',
        namaPenyelenggara: 'Nongsa Digital Park & BP Batam Tech Desk',
        tanggalPelaksanaan: '29 Agustus 2026',
        lokasi: 'One Raffles Quay Singapore',
        jumlahTamu: 140,
        tahun: 2026,
        statusKegiatan: 'Terjadwal',
        deskripsi: 'Pengenalan ekosistem digital talent dan insentif KEK Nongsa kepada venture capital.',
      },
      // Data Rekap Tahun 2025 (untuk pembanding filter tahun)
      {
        id: 'PRM-2025-01',
        namaKegiatan: 'Hannover Messe 2025 Indonesia Partner Country',
        kategori: 'Pameran Investasi Internasional',
        namaPenyelenggara: 'BKPM & BP Batam',
        tanggalPelaksanaan: '21-25 April 2025',
        lokasi: 'Hannover, Jerman',
        jumlahTamu: 290,
        tahun: 2025,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Partisipasi pameran manufaktur global paviliun Indonesia.',
      },
      {
        id: 'PRM-2025-02',
        namaKegiatan: 'Batam Investment Summit 2025',
        kategori: 'Forum Bisnis & Investment Summit',
        namaPenyelenggara: 'BP Batam & Apindo Batam',
        tanggalPelaksanaan: '06 November 2025',
        lokasi: 'Harbour Bay Convention Batam',
        jumlahTamu: 420,
        tahun: 2025,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Summit investasi tahunan pencapaian target komitmen 2025.',
      },
      {
        id: 'PRM-2025-03',
        namaKegiatan: 'Singapore B2B Matchmaking Elektronika',
        kategori: 'Business Matching B2B',
        namaPenyelenggara: 'SBF & BP Batam',
        tanggalPelaksanaan: '14 Mei 2025',
        lokasi: 'Suntec City Singapore',
        jumlahTamu: 180,
        tahun: 2025,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Temu bisnis ekspansi vendor komponen elektronik trans-border.',
      },
      {
        id: 'PRM-2025-04',
        namaKegiatan: 'Misi Investasi Taiwan Semiconductor Tour',
        kategori: 'Delegasi Kunjungan Luar Negeri',
        namaPenyelenggara: 'KDEI Taipei & BP Batam',
        tanggalPelaksanaan: '12-16 Agustus 2025',
        lokasi: 'Hsinchu Science Park & Taipei',
        jumlahTamu: 130,
        tahun: 2025,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Kunjungan delegasi penjajakan OSAT dan PCB fabrikasi ke Batam.',
      },
      {
        id: 'PRM-2025-05',
        namaKegiatan: 'Webinar Masterlist & PPN DTP Kawasan Bebas',
        kategori: 'Webinar & Roadshow Virtual',
        namaPenyelenggara: 'Direktorat Promosi BP Batam',
        tanggalPelaksanaan: '20 Maret 2025',
        lokasi: 'Zoom Webinar Online',
        jumlahTamu: 210,
        tahun: 2025,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Sosialisasi PMK dan kemudahan bea cukai mesin industri.',
      },
      {
        id: 'PRM-2025-06',
        namaKegiatan: 'CEO Gathering Industri Galangan Kapal',
        kategori: 'Investor Gathering & Temu Pelaku Usaha',
        namaPenyelenggara: 'BP Batam & IPERINDO',
        tanggalPelaksanaan: '18 September 2025',
        lokasi: 'Pacific Palace Hotel Batam',
        jumlahTamu: 160,
        tahun: 2025,
        statusKegiatan: 'Terlaksana',
        deskripsi: 'Temu eksekutif pelaku industri galangan kapal Tanjung Uncang.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 2: KEGIATAN FASILITASI DAN PENDAMPINGAN INVESTASI (TERBUKA, PERTAHUN)
  // --------------------------------------------------------------------------
  fasilitasiPendampingan: {
    metadata: {
      namaDataset: 'Data Kegiatan Fasilitasi Pendampingan Investasi',
      sifatData: 'Terbuka',
      periodeUpdate: 'Pertahun',
    },
    records: [
      {
        bulan: 'Jan',
        bulanIndex: 1,
        tahun: 2026,
        pendampinganIzin: 6,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 18,
        totalTamu: 245,
        highlightKegiatan: 'Fasilitasi Izin Lingkungan & Lokasi Konsorsium PLTS Surya Terapung Duriangkang',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2026,
        pendampinganIzin: 5,
        fasilitasiLahan: 5,
        mediasiRegulasi: 4,
        konsultasiInsentif: 6,
        totalKegiatan: 20,
        totalTamu: 280,
        highlightKegiatan: 'Pendampingan Ekspansi Pabrik PCB PT Pegatron & PT Infineon Batamindo',
        penyelenggaraUtama: 'Subdit Pendampingan Kawasan Industri',
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        pendampinganIzin: 7,
        fasilitasiLahan: 6,
        mediasiRegulasi: 3,
        konsultasiInsentif: 7,
        totalKegiatan: 23,
        totalTamu: 340,
        highlightKegiatan: 'Mediasi Akses Grid Listrik & Gardu Induk Data Center Nongsa Digital Park',
        penyelenggaraUtama: 'Subdit Advokasi & Mediasi Regulasi',
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        pendampinganIzin: 8,
        fasilitasiLahan: 5,
        mediasiRegulasi: 5,
        konsultasiInsentif: 8,
        totalKegiatan: 26,
        totalTamu: 390,
        highlightKegiatan: 'Konsultasi Pemberian Tax Holiday Fasilitas Perakitan EV & Baterai Tunas Prima',
        penyelenggaraUtama: 'Subdit Fasilitasi Insentif & Perpajakan',
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2026,
        pendampinganIzin: 6,
        fasilitasiLahan: 4,
        mediasiRegulasi: 4,
        konsultasiInsentif: 6,
        totalKegiatan: 20,
        totalTamu: 295,
        highlightKegiatan: 'Pendampingan Rekomendasi RPTKA Tenaga Kerja Ahli Aviasi Batam Aero Technic',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2026,
        pendampinganIzin: 7,
        fasilitasiLahan: 5,
        mediasiRegulasi: 3,
        konsultasiInsentif: 7,
        totalKegiatan: 22,
        totalTamu: 325,
        highlightKegiatan: 'Fasilitasi Sertifikasi Amdal Kawasan Industri Hijau Pulau Galang',
        penyelenggaraUtama: 'Subdit Pendampingan Kawasan Industri',
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2026,
        pendampinganIzin: 8,
        fasilitasiLahan: 6,
        mediasiRegulasi: 4,
        konsultasiInsentif: 7,
        totalKegiatan: 25,
        totalTamu: 360,
        highlightKegiatan: 'Asistensi Teknis Dokumen Masterlist Bebas Bea Masuk Mesin CNC Precision',
        penyelenggaraUtama: 'Subdit Fasilitasi Insentif & Perpajakan',
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2026,
        pendampinganIzin: 6,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 18,
        totalTamu: 260,
        highlightKegiatan: 'Mediasi Alur Logistik Ekspor Komponen Elektronik Melalui Pelabuhan Batu Ampar',
        penyelenggaraUtama: 'Subdit Advokasi & Mediasi Regulasi',
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2026,
        pendampinganIzin: 7,
        fasilitasiLahan: 5,
        mediasiRegulasi: 4,
        konsultasiInsentif: 6,
        totalKegiatan: 22,
        totalTamu: 310,
        highlightKegiatan: 'Fasilitasi Peletakan Batu Pertama Groundbreaking Farmasi RSBP Sekupang',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2026,
        pendampinganIzin: 8,
        fasilitasiLahan: 6,
        mediasiRegulasi: 4,
        konsultasiInsentif: 8,
        totalKegiatan: 26,
        totalTamu: 380,
        highlightKegiatan: 'Pendampingan Pra-Audit Kepatuhan KEK Galang & Fasilitas Subkontrak Kawasan Bebas',
        penyelenggaraUtama: 'Subdit Pendampingan Kawasan Industri',
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2026,
        pendampinganIzin: 7,
        fasilitasiLahan: 5,
        mediasiRegulasi: 3,
        konsultasiInsentif: 6,
        totalKegiatan: 21,
        totalTamu: 290,
        highlightKegiatan: 'Klinik Layanan Satu Pintu IBOSS & OSS RBA bagi Calon Investor Jepang & Jerman',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2026,
        pendampinganIzin: 5,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 17,
        totalTamu: 235,
        highlightKegiatan: 'Evaluasi Tahunan Debottlenecking Kendala Investasi 50 Perusahaan Penanaman Modal',
        penyelenggaraUtama: 'Subdit Advokasi & Mediasi Regulasi',
      },
      // Data Pembanding 2025
      {
        bulan: 'Jan',
        bulanIndex: 1,
        tahun: 2025,
        pendampinganIzin: 4,
        fasilitasiLahan: 3,
        mediasiRegulasi: 2,
        konsultasiInsentif: 4,
        totalKegiatan: 13,
        totalTamu: 180,
        highlightKegiatan: 'Pendampingan perizinan awal ekspansi manufaktur Tunas Batam Centre',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2025,
        pendampinganIzin: 4,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 4,
        totalKegiatan: 15,
        totalTamu: 210,
        highlightKegiatan: 'Fasilitasi alokasi lahan perluasan pabrik semikonduktor Mukakuning',
        penyelenggaraUtama: 'Subdit Pendampingan Kawasan Industri',
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2025,
        pendampinganIzin: 5,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 17,
        totalTamu: 240,
        highlightKegiatan: 'Mediasi koordinasi pasokan air bersih industri Kabil',
        penyelenggaraUtama: 'Subdit Advokasi & Mediasi Regulasi',
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2025,
        pendampinganIzin: 6,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 6,
        totalKegiatan: 19,
        totalTamu: 265,
        highlightKegiatan: 'Sosialisasi insentif fiskal KEK Nongsa Digital Park',
        penyelenggaraUtama: 'Subdit Fasilitasi Insentif & Perpajakan',
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2025,
        pendampinganIzin: 5,
        fasilitasiLahan: 3,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 16,
        totalTamu: 220,
        highlightKegiatan: 'Fasilitasi izin operasional fasilitas cold storage logistik',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2025,
        pendampinganIzin: 6,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 18,
        totalTamu: 250,
        highlightKegiatan: 'Konsultasi Masterlist mesin injeksi plastik',
        penyelenggaraUtama: 'Subdit Fasilitasi Insentif & Perpajakan',
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2025,
        pendampinganIzin: 6,
        fasilitasiLahan: 5,
        mediasiRegulasi: 4,
        konsultasiInsentif: 6,
        totalKegiatan: 21,
        totalTamu: 290,
        highlightKegiatan: 'Pendampingan percepatan izin PBG gedung workshop MRO Hang Nadim',
        penyelenggaraUtama: 'Subdit Pendampingan Kawasan Industri',
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2025,
        pendampinganIzin: 5,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 4,
        totalKegiatan: 16,
        totalTamu: 215,
        highlightKegiatan: 'Mediasi penyelesaian dispute tarif sewa pergudangan',
        penyelenggaraUtama: 'Subdit Advokasi & Mediasi Regulasi',
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2025,
        pendampinganIzin: 6,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 18,
        totalTamu: 245,
        highlightKegiatan: 'Fasilitasi izin riset teknologi digital KEK Nongsa',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2025,
        pendampinganIzin: 7,
        fasilitasiLahan: 5,
        mediasiRegulasi: 3,
        konsultasiInsentif: 6,
        totalKegiatan: 21,
        totalTamu: 300,
        highlightKegiatan: 'Asistensi integrasi sistem OSS RBA dengan IBOSS BP Batam',
        penyelenggaraUtama: 'Subdit Fasilitasi & Layanan Investasi',
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2025,
        pendampinganIzin: 5,
        fasilitasiLahan: 4,
        mediasiRegulasi: 3,
        konsultasiInsentif: 5,
        totalKegiatan: 17,
        totalTamu: 230,
        highlightKegiatan: 'Pendampingan verifikasi kesesuaian ruang KEK Kesehatan Sekupang',
        penyelenggaraUtama: 'Subdit Pendampingan Kawasan Industri',
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2025,
        pendampinganIzin: 4,
        fasilitasiLahan: 3,
        mediasiRegulasi: 2,
        konsultasiInsentif: 4,
        totalKegiatan: 13,
        totalTamu: 175,
        highlightKegiatan: 'Rekapitulasi tahunan fasilitasi & evaluasi kepuasan layanan investor',
        penyelenggaraUtama: 'Subdit Advokasi & Mediasi Regulasi',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 3: KUNJUNGAN PEMINAT INVESTOR (TERTUTUP, PERTRIWULAN)
  // --------------------------------------------------------------------------
  kunjunganPeminatInvestor: {
    metadata: {
      namaDataset: 'Data Kunjungan Peminat Investor',
      sifatData: 'Tertutup',
      periodeUpdate: 'Pertriwulan',
    },
    records: [
      {
        triwulan: 'TW I',
        tahun: 2026,
        jumlahKunjungan: 68,
        jumlahKunjunganTahunLalu: 54,
        kunjunganPMA: 51,
        kunjunganPMDN: 17,
        negaraAsalTerbanyak: 'Singapura (26), Tiongkok (14), Jepang (9)',
        sektorDominan: 'Data Center & Manufaktur Semikonduktor',
        catatan: 'Lonjakan minat pasca penetapan insentif fiskal pusat data energi terbarukan.',
      },
      {
        triwulan: 'TW II',
        tahun: 2026,
        jumlahKunjungan: 76,
        jumlahKunjunganTahunLalu: 61,
        kunjunganPMA: 58,
        kunjunganPMDN: 18,
        negaraAsalTerbanyak: 'Singapura (28), AS (12), Korea Selatan (10)',
        sektorDominan: 'Pembangkit PLTS Terapung & Perakitan EV',
        catatan: 'Kunjungan delegasi konsorsium konsultan energi ramah lingkungan trans-ASEAN.',
      },
      {
        triwulan: 'TW III',
        tahun: 2026,
        jumlahKunjungan: 84,
        jumlahKunjunganTahunLalu: 70,
        kunjunganPMA: 64,
        kunjunganPMDN: 20,
        negaraAsalTerbanyak: 'Tiongkok (24), Singapura (22), Jerman (11)',
        sektorDominan: 'Komponen Otomotif & Galangan Logistik Kapal',
        catatan: 'Penjajakan fasilitas dermaga heavy-lift di Kabil dan Sagulung.',
      },
      {
        triwulan: 'TW IV',
        tahun: 2026,
        jumlahKunjungan: 92,
        jumlahKunjunganTahunLalu: 80,
        kunjunganPMA: 71,
        kunjunganPMDN: 21,
        negaraAsalTerbanyak: 'Singapura (31), Malaysia (16), Taiwan (14)',
        sektorDominan: 'MRO Dirgantara Hang Nadim & Farmasi Sekupang',
        catatan: 'Finalisasi pra-komitmen studi kelayakan ekspansi hanggar dan laboratorium.',
      },
      // Data Rekap 2025
      {
        triwulan: 'TW I',
        tahun: 2025,
        jumlahKunjungan: 54,
        jumlahKunjunganTahunLalu: 46,
        kunjunganPMA: 39,
        kunjunganPMDN: 15,
        negaraAsalTerbanyak: 'Singapura (22), Malaysia (12), Jepang (8)',
        sektorDominan: 'Pergudangan Berikat & Logistik Elektronik',
        catatan: 'Kunjungan penjajakan awal rantai pasok semikonduktor regional.',
      },
      {
        triwulan: 'TW II',
        tahun: 2025,
        jumlahKunjungan: 61,
        jumlahKunjunganTahunLalu: 51,
        kunjunganPMA: 45,
        kunjunganPMDN: 16,
        negaraAsalTerbanyak: 'Singapura (25), Tiongkok (11), AS (9)',
        sektorDominan: 'Data Center KEK Nongsa & Manufaktur Presisi',
        catatan: 'Kunjungan teknis lokasi gardu induk dan jaringan fiber optik bawah laut.',
      },
      {
        triwulan: 'TW III',
        tahun: 2025,
        jumlahKunjungan: 70,
        jumlahKunjunganTahunLalu: 58,
        kunjunganPMA: 52,
        kunjunganPMDN: 18,
        negaraAsalTerbanyak: 'Tiongkok (19), Singapura (18), Korsel (10)',
        sektorDominan: 'Solar Panel Modul & Kemasan Industri Hijau',
        catatan: 'Site visit kesiapan lahan industri Wiraraja dan Batamindo.',
      },
      {
        triwulan: 'TW IV',
        tahun: 2025,
        jumlahKunjungan: 80,
        jumlahKunjunganTahunLalu: 65,
        kunjunganPMA: 60,
        kunjunganPMDN: 20,
        negaraAsalTerbanyak: 'Singapura (27), Taiwan (13), Jepang (11)',
        sektorDominan: 'MRO Aviasi & Fasilitas Kesehatan KEK Sekupang',
        catatan: 'Audiensi teknis insentif bea masuk peralatan medis dan suku cadang pesawat.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 4: KUNJUNGAN WEBSITE INVEST IN BATAM (TERBUKA, PERTRIWULAN)
  // Menampilkan multi-tahun untuk melihat tren pertumbuhan traffic
  // --------------------------------------------------------------------------
  kunjunganWebsiteInvest: {
    metadata: {
      namaDataset: 'Jumlah Kunjungan Website Invest in Batam',
      sifatData: 'Terbuka',
      periodeUpdate: 'Pertriwulan',
    },
    records: [
      {
        periode: 'TW I 2024',
        tahun: 2024,
        triwulan: 'TW I',
        traffic: 28450,
        trafficSebelumnya: 26100,
        deltaPersen: 9.0,
        pengunjungUnik: 19800,
        topAsalNegara: 'Singapura, Indonesia, Malaysia',
        halamanTerpopuler: '/kek-overview, /tax-incentives',
      },
      {
        periode: 'TW II 2024',
        tahun: 2024,
        triwulan: 'TW II',
        traffic: 31200,
        trafficSebelumnya: 28450,
        deltaPersen: 9.7,
        pengunjungUnik: 22400,
        topAsalNegara: 'Singapura, Tiongkok, AS',
        halamanTerpopuler: '/land-availability, /free-trade-zone-guide',
      },
      {
        periode: 'TW III 2024',
        tahun: 2024,
        triwulan: 'TW III',
        traffic: 34850,
        trafficSebelumnya: 31200,
        deltaPersen: 11.7,
        pengunjungUnik: 25100,
        topAsalNegara: 'Singapura, Jepang, Korsel',
        halamanTerpopuler: '/nongsa-digital-park, /bat-mro',
      },
      {
        periode: 'TW IV 2024',
        tahun: 2024,
        triwulan: 'TW IV',
        traffic: 38900,
        trafficSebelumnya: 34850,
        deltaPersen: 11.6,
        pengunjungUnik: 27900,
        topAsalNegara: 'Singapura, Tiongkok, Jerman',
        halamanTerpopuler: '/investor-handbook, /interactive-map',
      },
      {
        periode: 'TW I 2025',
        tahun: 2025,
        triwulan: 'TW I',
        traffic: 41600,
        trafficSebelumnya: 38900,
        deltaPersen: 6.9,
        pengunjungUnik: 30200,
        topAsalNegara: 'Singapura, Indonesia, AS',
        halamanTerpopuler: '/investment-incentives, /iboss-portal',
      },
      {
        periode: 'TW II 2025',
        tahun: 2025,
        triwulan: 'TW II',
        traffic: 45800,
        trafficSebelumnya: 41600,
        deltaPersen: 10.1,
        pengunjungUnik: 33500,
        topAsalNegara: 'Singapura, Tiongkok, Korea Selatan',
        halamanTerpopuler: '/green-energy-batam, /solar-farm-duriangkang',
      },
      {
        periode: 'TW III 2025',
        tahun: 2025,
        triwulan: 'TW III',
        traffic: 49300,
        trafficSebelumnya: 45800,
        deltaPersen: 7.6,
        pengunjungUnik: 36200,
        topAsalNegara: 'Singapura, Jepang, Jerman',
        halamanTerpopuler: '/manufacturing-hub, /port-batu-ampar',
      },
      {
        periode: 'TW IV 2025',
        tahun: 2025,
        triwulan: 'TW IV',
        traffic: 47900,
        trafficSebelumnya: 49300,
        deltaPersen: -2.8, // Penurunan minor akhir tahun
        pengunjungUnik: 34800,
        topAsalNegara: 'Singapura, Tiongkok, Malaysia',
        halamanTerpopuler: '/annual-report-2025, /masterlist-guide',
      },
      {
        periode: 'TW I 2026',
        tahun: 2026,
        triwulan: 'TW I',
        traffic: 54200,
        trafficSebelumnya: 47900,
        deltaPersen: 13.2,
        pengunjungUnik: 39600,
        topAsalNegara: 'Singapura, AS, Tiongkok',
        halamanTerpopuler: '/data-center-hub, /kek-kesehatan-sekupang',
      },
      {
        periode: 'TW II 2026',
        tahun: 2026,
        triwulan: 'TW II',
        traffic: 59800,
        trafficSebelumnya: 54200,
        deltaPersen: 10.3,
        pengunjungUnik: 44100,
        topAsalNegara: 'Singapura, Tiongkok, Jepang',
        halamanTerpopuler: '/tax-holiday-calculator, /land-inquiry',
      },
      {
        periode: 'TW III 2026',
        tahun: 2026,
        triwulan: 'TW III',
        traffic: 64500,
        trafficSebelumnya: 59800,
        deltaPersen: 7.9,
        pengunjungUnik: 47800,
        topAsalNegara: 'Singapura, Jerman, Korsel',
        halamanTerpopuler: '/investment-guidebook-2026, /hang-nadim-aeropolis',
      },
      {
        periode: 'TW IV 2026',
        tahun: 2026,
        triwulan: 'TW IV',
        traffic: 68900,
        trafficSebelumnya: 64500,
        deltaPersen: 6.8,
        pengunjungUnik: 51200,
        topAsalNegara: 'Singapura, AS, Tiongkok',
        halamanTerpopuler: '/global-summit-2026, /consultation-booking',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 5: PENERIMA INSENTIF DAN KEMUDAHAN INVESTASI (TERBUKA, PERTRIWULAN)
  // --------------------------------------------------------------------------
  penerimaInsentifInvestasi: {
    metadata: {
      namaDataset: 'Data Fasilitas Insentif (Fiskal dan Non-Fiskal) dan Pemberian Kemudahan Investasi',
      sifatData: 'Terbuka',
      periodeUpdate: 'Pertriwulan',
    },
    records: [
      {
        triwulan: 'TW I',
        tahun: 2026,
        insentifFiskal: 14,
        insentifNonFiskal: 22,
        totalPenerima: 36,
        contohPerusahaanFiskal: [
          'PT Schneider Electric Manufacturing Batam (Tax Allowance)',
          'PT Pegatron Technology Indonesia (Masterlist Bebas Bea Masuk)',
          'PT Infineon Technologies Batam (PPN DTP Kawasan Bebas)',
          'PT Batam Fast Precision (Pembebasan PPh Pasal 22 Impor)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Nongsa Digital Park (Jalur Hijau Golden Visa Talenta TI)',
          'PT Batam Aero Technic (Izin Akses Airside Prioritas)',
          'PT Sunseap Surya Batam (Persetujuan Kesesuaian Ruang Cepat)',
          'PT Maritim Logistik Terpadu (Prioritas Bongkar Muat STS)',
        ],
        jenisFasilitasDominan: 'Fasilitas Masterlist Mesin & Jalur Khusus Impor Bahan Baku',
      },
      {
        triwulan: 'TW II',
        tahun: 2026,
        insentifFiskal: 18,
        insentifNonFiskal: 25,
        totalPenerima: 43,
        contohPerusahaanFiskal: [
          'PT GDS IDC Batam Data Center (Tax Holiday 100% 10 Tahun)',
          'PT CIkarang Listrindo Batam (Pembebasan Bea Cukai Turbin Gas)',
          'PT Shimano Batam (Fasilitas KITE Pembebasan Bahan Baku)',
          'PT Tunas Energi Hijau (Super Tax Deduction Riset & Vokasi)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Singatac Offshore Technology (Kemudahan Izin Lingkungan UKL-UPL)',
          'PT Medika Healthcare Batam (Perizinan Dokter Spesialis WNA KEK)',
          'PT Venture Electronics (Akselerasi Layanan IBOSS Online)',
          'PT McDermott Indonesia (Kemudahan Perluasan Galangan Fabrikasi)',
        ],
        jenisFasilitasDominan: 'Tax Holiday KEK & Super Tax Deduction Pelatihan Vokasi',
      },
      {
        triwulan: 'TW III',
        tahun: 2026,
        insentifFiskal: 15,
        insentifNonFiskal: 28,
        totalPenerima: 43,
        contohPerusahaanFiskal: [
          'PT Flextronics Technology Indonesia (Bebas Bea Masuk SMT Line)',
          'PT Epcos Indonesia / TDK (Tax Allowance Investasi Baru)',
          'PT Caterpillar Batam (Pembebasan PPh Pasal 22 Logam Presisi)',
          'PT Yokohama Batam (Fasilitas Restitusi PPN Percepatan)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Princeton Digital Group (Penyediaan Pasokan Daya 50 MW Ganda)',
          'PT Air Liquide Indonesia (Fasilitas Koridor Pipa Gas Industri)',
          'PT Excelitas Technologies (Layanan Pendampingan Tenaga Kerja Terampil)',
          'PT Bandar Abadi Shipyard (Fasilitas Sertifikasi Laik Laut Cepat)',
        ],
        jenisFasilitasDominan: 'Fasilitas Utilitas Prioritas Ganda & Pembebasan Bea Impor',
      },
      {
        triwulan: 'TW IV',
        tahun: 2026,
        insentifFiskal: 19,
        insentifNonFiskal: 31,
        totalPenerima: 50,
        contohPerusahaanFiskal: [
          'PT Volex Cable Assembler Indonesia (Tax Holiday Investasi Ekspansi)',
          'PT Sinar Mas Land Data Center (Masterlist Server & Chiller Pendingin)',
          'PT Sat Nusapersada Tbk (Insentif Riset Perakitan Smartphone 5G)',
          'PT Philips Industries Batam (Pembebasan Bea Impor Suku Cadang)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Batam Aero Maintenance (Kemudahan Visa On Arrival Kerja Teknisi)',
          'PT Kabil Citranusa (Pemberian Hak Guna Bangunan KSP Percepatan)',
          'PT Batam Riau Solar (Kemudahan Akses Transmisi Listrik Nasional)',
          'PT Rumah Sakit BP Internasional (Izin Operasional Alat Radioterapi KEK)',
        ],
        jenisFasilitasDominan: 'Tax Holiday Industri Pionir & Fast-Track Visa Kerja Teknisi',
      },
      // Data Rekap 2025
      {
        triwulan: 'TW I',
        tahun: 2025,
        insentifFiskal: 11,
        insentifNonFiskal: 18,
        totalPenerima: 29,
        contohPerusahaanFiskal: [
          'PT Schneider Electric (Masterlist Mesin)',
          'PT Infineon Technologies (PPN DTP)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Nongsa Digital Park (Jalur Hijau TI)',
          'PT Sunseap Solar (Kesesuaian Ruang Cepat)',
        ],
        jenisFasilitasDominan: 'Masterlist Mesin Otomasi & PPN DTP',
      },
      {
        triwulan: 'TW II',
        tahun: 2025,
        insentifFiskal: 14,
        insentifNonFiskal: 20,
        totalPenerima: 34,
        contohPerusahaanFiskal: [
          'PT GDS IDC Batam (Tax Holiday Awal)',
          'PT Shimano Batam (KITE Pembebasan)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Medika Batam (Izin Dokter Asing KEK)',
          'PT McDermott Indonesia (Kemudahan Galangan)',
        ],
        jenisFasilitasDominan: 'Tax Holiday Fasilitas Awal & Perizinan KEK',
      },
      {
        triwulan: 'TW III',
        tahun: 2025,
        insentifFiskal: 13,
        insentifNonFiskal: 22,
        totalPenerima: 35,
        contohPerusahaanFiskal: [
          'PT Flextronics (Bebas Bea Masuk SMT)',
          'PT Epcos Indonesia (Tax Allowance)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Princeton Digital Group (Pasokan Listrik Khusus)',
          'PT Air Liquide (Fasilitas Pipa Gas)',
        ],
        jenisFasilitasDominan: 'Kemudahan Utilitas Khusus & Tax Allowance',
      },
      {
        triwulan: 'TW IV',
        tahun: 2025,
        insentifFiskal: 16,
        insentifNonFiskal: 26,
        totalPenerima: 42,
        contohPerusahaanFiskal: [
          'PT Volex Cable Assembler (Tax Holiday)',
          'PT Sat Nusapersada Tbk (Super Tax Deduction Vokasi)',
        ],
        contohPerusahaanNonFiskal: [
          'PT Batam Aero Maintenance (Visa Kerja Cepat)',
          'PT Kabil Citranusa (Pemberian HGB Mitra)',
        ],
        jenisFasilitasDominan: 'Super Tax Deduction Vokasi & HGB KSP',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 6: PROYEK INFRASTRUKTUR YANG AKAN DIBANGUN DI BATAM (TERBUKA, PERTAHUN)
  // Atribut: Nama Project, Nilai Investasi (Rp), Lokasi, Luas, Pemilik, Kapasitas, Jadwal
  // Warna batang sesuai Status Project: Rencana (#2563eb), Berjalan (#16a34a), Selesai (#64748b)
  // --------------------------------------------------------------------------
  proyekInfrastrukturBatam: {
    metadata: {
      namaDataset: 'Informasi Infrastruktur yang Akan Dibangun di Batam',
      sifatData: 'Terbuka',
      periodeUpdate: 'Pertahun',
    },
    records: [
      {
        id: 'INF-001',
        namaProject: 'Pembangunan Terminal 2 Bandara Hang Nadim & Cargo Hub',
        namaSingkat: 'Terminal 2 Hang Nadim',
        nilaiInvestasiRpT: 6.80,
        nilaiInvestasiRaw: 6800000000000,
        statusProject: 'Berjalan',
        lokasi: 'Kawasan Bandara Internasional Hang Nadim, Nongsa',
        luas: '45,2 Hektar',
        pemilikProject: 'PT Bandara Internasional Batam (BIB - Konsorsium Incheon & WIKA)',
        kapasitas: '16 Juta Penumpang/Tahun & 80.000 Ton Kargo/Tahun',
        jadwal: '2024 - Q3 2026',
        kategoriSektor: 'Transportasi Udara & Logistik',
      },
      {
        id: 'INF-002',
        namaProject: 'Modernisasi Container Yard & Crane Dermaga Utara Batu Ampar',
        namaSingkat: 'Dermaga Kontainer Batu Ampar',
        nilaiInvestasiRpT: 3.80,
        nilaiInvestasiRaw: 3800000000000,
        statusProject: 'Berjalan',
        lokasi: 'Pelabuhan Batu Ampar, Batam',
        luas: '28,5 Hektar',
        pemilikProject: 'PT Batam Terminal Peti Kemas (KSO Pelindo & BP Batam)',
        kapasitas: '1,6 Juta TEUs/Tahun (Direct Call Ekspor Asia-Eropa)',
        jadwal: '2023 - Q4 2026',
        kategoriSektor: 'Kepelabuhanan & Maritim',
      },
      {
        id: 'INF-003',
        namaProject: 'PLTS Terapung Waduk Tembesi & Duriangkang Fase 1',
        namaSingkat: 'PLTS Terapung Waduk Tembesi',
        nilaiInvestasiRpT: 4.25,
        nilaiInvestasiRaw: 4250000000000,
        statusProject: 'Berjalan',
        lokasi: 'Genangan Waduk Tembesi & Duriangkang, Batam',
        luas: '180 Hektar Permukaan Air',
        pemilikProject: 'Konsorsium Medco Power Indonesia & BP Batam',
        kapasitas: '333 MWp Pembangkit Energi Hijau Terbarukan',
        jadwal: '2024 - Q2 2027',
        kategoriSektor: 'Energi Terbarukan & Transisi Bersih',
      },
      {
        id: 'INF-004',
        namaProject: 'Jembatan Batam-Bintan (Kelapa Riau Interconnection)',
        namaSingkat: 'Jembatan Batam - Bintan',
        nilaiInvestasiRpT: 14.74,
        nilaiInvestasiRaw: 14740000000000,
        statusProject: 'Rencana',
        lokasi: 'Tanjung Sauh - Pulau Buau - Lobam Bintan',
        luas: 'Panjang 14,75 Km (Bentang Tol Laut)',
        pemilikProject: 'Kementerian PUPR & Skema KPBU Pemprov Kepri / BP Batam',
        kapasitas: '4 Lajur Tol Laut Cepat Batam-Bintan (Konektivitas Trans-Kawasan)',
        jadwal: 'Q4 2026 - 2029 (Tahap Tender & Pembebasan)',
        kategoriSektor: 'Konektivitas Jalan Tol & Jembatan Laut',
      },
      {
        id: 'INF-005',
        namaProject: 'Sistem Penyediaan Air Minum (SPAM) & Instalasi Pengolahan Waduk Mukakuning 2',
        namaSingkat: 'Instalasi SPAM Mukakuning 2',
        nilaiInvestasiRpT: 2.15,
        nilaiInvestasiRaw: 2150000000000,
        statusProject: 'Berjalan',
        lokasi: 'Waduk Mukakuning, Sei Beduk',
        luas: '12,0 Hektar',
        pemilikProject: 'PT Air Batam Hilir & BP Batam Fasling',
        kapasitas: '500 Liter/Detik Pasokan Industri & Rumah Tangga',
        jadwal: '2025 - Q1 2027',
        kategoriSektor: 'Utilitas Air Bersih & Sanitasi Industri',
      },
      {
        id: 'INF-006',
        namaProject: 'Pelebaran Jalan Arteri Gajah Mada & Flyover Simpang Sei Ladi',
        namaSingkat: 'Flyover Sei Ladi & Koridor Gajah Mada',
        nilaiInvestasiRpT: 0.85,
        nilaiInvestasiRaw: 850000000000,
        statusProject: 'Selesai',
        lokasi: 'Koridor Simpang Jam - Sei Ladi - Sekupang',
        luas: 'Panjang 4,2 Km (5-6 Lajur)',
        pemilikProject: 'BP Batam Biro Sarana & Dit Infrastruktur Kawasan',
        kapasitas: '85.000 Kendaraan/Hari (Penghilang Bottleneck Menuju RSBP Sekupang)',
        jadwal: '2024 - Q1 2026 (Selesai Beroperasi)',
        kategoriSektor: 'Jalan Raya & Rekayasa Lalu Lintas',
      },
      {
        id: 'INF-007',
        namaProject: 'Submarine Power Interconnector 230 kV Batam - Singapura',
        namaSingkat: 'Kabel Bawah Laut Batam - Singapura',
        nilaiInvestasiRpT: 7.50,
        nilaiInvestasiRaw: 7500000000000,
        statusProject: 'Rencana',
        lokasi: 'Gardu Induk Nongsa - Selat Singapura - Tuas',
        luas: 'Koridor Bawah Laut 38 Km',
        pemilikProject: 'Konsorsium PacificLight Power & Mitra Ekspor Listrik Hijau Batam',
        kapasitas: '1,2 GW Daya Listrik Hijau Trans-Perbatasan',
        jadwal: '2027 - 2030 (Tahap Feasibility Study & Perizinan Lintas Negara)',
        kategoriSektor: 'Transmisi Energi Internasional',
      },
      {
        id: 'INF-008',
        namaProject: 'Pengembangan Kawasan Logistik Berikat Aeropolis Hang Nadim',
        namaSingkat: 'Logistik Aeropolis Hang Nadim',
        nilaiInvestasiRpT: 2.80,
        nilaiInvestasiRaw: 2800000000000,
        statusProject: 'Rencana',
        lokasi: 'Sisi Timur Bandara Hang Nadim, Nongsa',
        luas: '60,0 Hektar',
        pemilikProject: 'BP Batam & Konsorsium Logistik Udara Multinasional',
        kapasitas: 'Fasilitas Pergudangan Dingin (Cold Chain) & Cross-Docking Transhipment',
        jadwal: 'Q1 2027 - 2029',
        kategoriSektor: 'Logistik Bandara & Pergudangan Berikat',
      },
    ],
  },
};
