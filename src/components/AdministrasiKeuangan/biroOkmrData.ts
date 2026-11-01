// ============================================================================
// DATASET MASTER BIRO ORGANISASI, KEPATUHAN DAN MANAJEMEN RISIKO (BOKMR) BP BATAM
// Seluruh data disimpan dalam satu objek JSON terpadu agar mudah diganti data riil
// ============================================================================

export interface SakipKomponenItem {
  komponen: string;
  bobot: number;
  nilai: number;
  persen: number;
  tingkat: string;
  keterangan: string;
}

export interface CapaianIkuItem {
  unit: string;
  sasaranStrategis: string;
  iku: string;
  target: number;
  realisasi: number;
  persen: number;
  pjSatker: string;
}

export interface PiagamRisikoItem {
  unit: string;
  sasaranOrganisasi: string;
  kejadianRisiko: string;
  risikoAwal: number;   // Nilai Tingkat Risiko Awal (skala 1-25)
  risikoAkhir: number;  // Nilai Tingkat Risiko Setelah Mitigasi (skala 1-25)
  penurunan: number;
  status: string;
  mitigasi: string;
}

export interface PengaduanMasyarakatItem {
  unit: string;
  diterima: number;
  diproses: number;
  selesai: number;
  persenSelesai: number;
  slaHari: number;
  saluranTerbanyak: string;
}

export interface SurveiKepuasanItem {
  kategori: string;
  detail: string;
  skor: number;       // Skala 1 - 4
  persen: number;     // 0 - 100%
  mutu: string;       // Mutu A / B
  responden: number;
}

export interface SpipUnsurItem {
  unsur: string;
  singkat: string;
  skorSekarang: number;
  skorSebelum: number;
  target: number;
  penjelasan: string;
}

export interface BiroOkmrMasterData {
  metadata: {
    unit: string;
    induk: string;
    pemutakhiranTerakhir: string;
    temaVisual: string;
  };
  sakipPerKomponen: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        nilaiAkhir: number;
        predikat: string;
        komponen: SakipKomponenItem[];
      }
    >;
  };
  capaianIkuUnit: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    filterTriwulanList: string[];
    recordsByFilter: Record<string, CapaianIkuItem[]>;
  };
  perubahanRisikoUnit: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        totalUnitTurun: number;
        persenUnitTurun: number;
        records: PiagamRisikoItem[];
      }
    >;
  };
  pengaduanMasyarakat: {
    datasetName: string;
    accessLabel: 'Terbuka';
    filterTahunList: string[];
    filterPeriodeList: string[];
    recordsByFilter: Record<string, PengaduanMasyarakatItem[]>;
  };
  surveiKepuasanMasyarakat: {
    datasetName: string;
    accessLabel: 'Terbuka';
    filterTahunList: string[];
    filterUnitUsahaList: string[];
    byFilter: Record<string, SurveiKepuasanItem[]>;
  };
  maturitasSpip: {
    datasetName: string;
    accessLabel: 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        periodeSekarangLabel: string;
        periodeSebelumLabel: string;
        skorRerataSekarang: number;
        levelMaturitas: string;
        komponen: SpipUnsurItem[];
      }
    >;
  };
}

export const BIRO_OKMR_MASTER_DATA: BiroOkmrMasterData = {
  metadata: {
    unit: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    induk: 'Deputi Bidang Administrasi dan Keuangan (DEP-A1)',
    pemutakhiranTerakhir: 'Oktober 2026',
    temaVisual: 'Clean Blue & White Theme (2-Column Grid, 3 Rows, 6 Cards)',
  },

  // ==========================================================================
  // BARIS 1 - KARTU 1: Penilaian SAKIP per Komponen (Clustered Bar Horizontal)
  // ==========================================================================
  sakipPerKomponen: {
    datasetName: 'Nilai Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP) (Tertutup, pertahun)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    byTahun: {
      '2026': {
        nilaiAkhir: 82.68,
        predikat: 'Predikat A (Memuaskan)',
        komponen: [
          {
            komponen: 'Perencanaan Kinerja',
            bobot: 30.0,
            nilai: 25.10,
            persen: 83.67,
            tingkat: 'A',
            keterangan: 'Renstra 2025-2029, RKT, Cascading Indikator Kinerja Utama selaras target nasional',
          },
          {
            komponen: 'Pengukuran Kinerja',
            bobot: 30.0,
            nilai: 24.60,
            persen: 82.00,
            tingkat: 'A',
            keterangan: 'Pengukuran digital IKU berkala, validasi capaian output fisik dan penyerapan dana',
          },
          {
            komponen: 'Evaluasi Akuntabilitas',
            bobot: 25.0,
            nilai: 20.23,
            persen: 80.92,
            tingkat: 'A',
            keterangan: 'Evaluasi internal oleh SPI/OKMR dan tindak lanjut rekomendasi KemenPAN-RB',
          },
          {
            komponen: 'Pelaporan Kinerja',
            bobot: 15.0,
            nilai: 12.75,
            persen: 85.00,
            tingkat: 'A',
            keterangan: 'Penyusunan Laporan Kinerja Instansi Pemerintah (LKjIP) tepat waktu dan komprehensif',
          },
        ],
      },
      '2025': {
        nilaiAkhir: 80.45,
        predikat: 'Predikat A (Memuaskan)',
        komponen: [
          {
            komponen: 'Perencanaan Kinerja',
            bobot: 30.0,
            nilai: 24.50,
            persen: 81.67,
            tingkat: 'A',
            keterangan: 'Penyelarasan target kinerja unit eselon II dengan Renstra BP Batam',
          },
          {
            komponen: 'Pengukuran Kinerja',
            bobot: 30.0,
            nilai: 23.90,
            persen: 79.67,
            tingkat: 'BB',
            keterangan: 'Pengukuran manual triwulanan dan integrasi aplikasi e-Kinerja',
          },
          {
            komponen: 'Evaluasi Akuntabilitas',
            bobot: 25.0,
            nilai: 19.65,
            persen: 78.60,
            tingkat: 'BB',
            keterangan: 'Audit internal kepatuhan berkala dan telaah manajemen risiko',
          },
          {
            komponen: 'Pelaporan Kinerja',
            bobot: 15.0,
            nilai: 12.40,
            persen: 82.67,
            tingkat: 'A',
            keterangan: 'LKjIP 2024 diselesaikan sebelum batas waktu KemenPAN-RB',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 1 - KARTU 2: Capaian IKU per Unit Kerja (Progress Bar Horizontal)
  // ==========================================================================
  capaianIkuUnit: {
    datasetName: 'Presentasi Pemenuhan Kontrak Kinerja BP Batam (Tertutup, pertriwulan)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    filterTriwulanList: ['Semua Triwulan', 'TW I', 'TW II', 'TW III'],
    recordsByFilter: {
      '2026-Semua Triwulan': [
        {
          unit: 'Dit. Pelabuhan (BUP)',
          sasaranStrategis: 'Peningkatan Konektivitas & Logistik Maritim Internasional',
          iku: 'Arus Bongkar Muat Petikemas & PNBP Jasa Kepelabuhanan',
          target: 100,
          realisasi: 98.4,
          persen: 98.4,
          pjSatker: 'Direktur Badan Usaha Pelabuhan',
        },
        {
          unit: 'Pusat PTSP',
          sasaranStrategis: 'Kemudahan Berusaha & Transformasi Digital Perizinan',
          iku: 'Indeks Kepuasan Layanan Perizinan & SLA Penerbitan Berusaha',
          target: 100,
          realisasi: 96.8,
          persen: 96.8,
          pjSatker: 'Kepala Pusat PTSP',
        },
        {
          unit: 'Biro Keuangan',
          sasaranStrategis: 'Tata Kelola Fiskal & Optimalisasi Pendapatan BLU',
          iku: 'Rasio Kemandirian Finansial & Realisasi Penerimaan PNBP',
          target: 100,
          realisasi: 95.2,
          persen: 95.2,
          pjSatker: 'Kepala Biro Keuangan',
        },
        {
          unit: 'Dit. Pengelolaan Lahan',
          sasaranStrategis: 'Optimalisasi Pemanfaatan Lahan Produktif Kawasan',
          iku: 'Realisasi Alokasi Lahan Investasi & Kepatuhan Pembayaran UWT',
          target: 100,
          realisasi: 94.1,
          persen: 94.1,
          pjSatker: 'Direktur Pengelolaan Lahan',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          sasaranStrategis: 'Modernisasi Hub Aviasi & Pertumbuhan Penumpang',
          iku: 'Pergerakan Penumpang & Efisiensi Pengelolaan Fasilitas Udara',
          target: 100,
          realisasi: 91.5,
          persen: 91.5,
          pjSatker: 'Direktur BU Bandara',
        },
        {
          unit: 'BU RSBP Batam',
          sasaranStrategis: 'Layanan Kesehatan Rujukan Unggul & KEK Medis',
          iku: 'Bed Occupancy Rate (BOR) & Standar Mutu Pelayanan Klinis',
          target: 100,
          realisasi: 89.2,
          persen: 89.2,
          pjSatker: 'Direktur Badan Usaha Rumah Sakit',
        },
        {
          unit: 'BU SPAM (Fasling)',
          sasaranStrategis: 'Keandalan Distribusi Air Minum & Penurunan NRW',
          iku: 'Kontinuitas Suplai 24 Jam & Penurunan Kebocoran Non-Revenue Water',
          target: 100,
          realisasi: 87.6,
          persen: 87.6,
          pjSatker: 'Direktur BU SPAM & Fasilitas Lingkungan',
        },
      ],
      '2026-TW III': [
        {
          unit: 'Dit. Pelabuhan (BUP)',
          sasaranStrategis: 'Peningkatan Konektivitas & Logistik Maritim',
          iku: 'Arus Petikemas Terminal Batu Ampar TW III',
          target: 100,
          realisasi: 99.1,
          persen: 99.1,
          pjSatker: 'Direktur Badan Usaha Pelabuhan',
        },
        {
          unit: 'Pusat PTSP',
          sasaranStrategis: 'SLA Perizinan Investasi Terpadu',
          iku: 'Ketepatan Waktu Penerbitan Dokumen PB-UMKU',
          target: 100,
          realisasi: 97.4,
          persen: 97.4,
          pjSatker: 'Kepala Pusat PTSP',
        },
        {
          unit: 'Biro Keuangan',
          sasaranStrategis: 'Likuiditas Kas & Penyelesaian Piutang BLU',
          iku: 'Tingkat Serapan Anggaran & Penagihan Piutang Lancar',
          target: 100,
          realisasi: 96.0,
          persen: 96.0,
          pjSatker: 'Kepala Biro Keuangan',
        },
        {
          unit: 'Dit. Pengelolaan Lahan',
          sasaranStrategis: 'Penyelesaian Hak Atas Tanah & Pengendalian',
          iku: 'Penerbitan Rekomendasi Hak dan Legalitas Persil',
          target: 100,
          realisasi: 93.5,
          persen: 93.5,
          pjSatker: 'Direktur Pengelolaan Lahan',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          sasaranStrategis: 'Peningkatan Konektivitas Rute Aviasi',
          iku: 'Ketepatan Penanganan Penumpang & Kargo Aviasi',
          target: 100,
          realisasi: 92.0,
          persen: 92.0,
          pjSatker: 'Direktur BU Bandara',
        },
        {
          unit: 'BU RSBP Batam',
          sasaranStrategis: 'Pemberian Layanan Medis Jantung & KEK',
          iku: 'Angka Kepuasan Pasien BPJS & Pasien Internasional',
          target: 100,
          realisasi: 88.5,
          persen: 88.5,
          pjSatker: 'Direktur Badan Usaha Rumah Sakit',
        },
        {
          unit: 'BU SPAM (Fasling)',
          sasaranStrategis: 'Penggantian Pipa Transmisi Tua & Tekanan Air',
          iku: 'Cakupan Layanan Wilayah Batu Aji & Sagulung',
          target: 100,
          realisasi: 86.8,
          persen: 86.8,
          pjSatker: 'Direktur BU SPAM & Fasilitas Lingkungan',
        },
      ],
      '2026-TW II': [
        {
          unit: 'Dit. Pelabuhan (BUP)',
          sasaranStrategis: 'Peningkatan Produktivitas STS Crane',
          iku: 'Turnaround Time (TRT) Kapal Kontainer',
          target: 100,
          realisasi: 97.8,
          persen: 97.8,
          pjSatker: 'Direktur Badan Usaha Pelabuhan',
        },
        {
          unit: 'Pusat PTSP',
          sasaranStrategis: 'Digitalisasi MPP Batam',
          iku: 'Jumlah Izin Terintegrasi Online Single Submission (OSS)',
          target: 100,
          realisasi: 96.2,
          persen: 96.2,
          pjSatker: 'Kepala Pusat PTSP',
        },
        {
          unit: 'Biro Keuangan',
          sasaranStrategis: 'Penerimaan PNBP Semester I',
          iku: 'Target Penerimaan UWT & Jasa Pelabuhan Smt I',
          target: 100,
          realisasi: 94.8,
          persen: 94.8,
          pjSatker: 'Kepala Biro Keuangan',
        },
        {
          unit: 'Dit. Pengelolaan Lahan',
          sasaranStrategis: 'Perizinan Pemanfaatan Ruang',
          iku: 'Validasi Persil SWP Nongsa & Batam Kota',
          target: 100,
          realisasi: 93.0,
          persen: 93.0,
          pjSatker: 'Direktur Pengelolaan Lahan',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          sasaranStrategis: 'Pengembangan Fasilitas Terminal',
          iku: 'Rehabilitasi Runway & Sertifikasi Keselamatan Aviasi',
          target: 100,
          realisasi: 90.5,
          persen: 90.5,
          pjSatker: 'Direktur BU Bandara',
        },
        {
          unit: 'BU RSBP Batam',
          sasaranStrategis: 'Revitalisasi Gedung Terpadu',
          iku: 'Waktu Tanggap Pelayanan IGD < 5 Menit',
          target: 100,
          realisasi: 88.0,
          persen: 88.0,
          pjSatker: 'Direktur Badan Usaha Rumah Sakit',
        },
        {
          unit: 'BU SPAM (Fasling)',
          sasaranStrategis: 'Optimalisasi WTP Duriangkang & Mukakuning',
          iku: 'Penanganan Gangguan Pipa Pecah < 6 Jam',
          target: 100,
          realisasi: 85.5,
          persen: 85.5,
          pjSatker: 'Direktur BU SPAM & Fasilitas Lingkungan',
        },
      ],
      '2026-TW I': [
        {
          unit: 'Dit. Pelabuhan (BUP)',
          sasaranStrategis: 'Operasional Dermaga Awal Tahun',
          iku: 'Kesiapan Alat Bongkar Muat & Dermaga',
          target: 100,
          realisasi: 96.5,
          persen: 96.5,
          pjSatker: 'Direktur Badan Usaha Pelabuhan',
        },
        {
          unit: 'Pusat PTSP',
          sasaranStrategis: 'Penyusunan Standar Pelayanan Baru',
          iku: 'Sosialisasi Standar Pelayanan Publik 2026',
          target: 100,
          realisasi: 95.0,
          persen: 95.0,
          pjSatker: 'Kepala Pusat PTSP',
        },
        {
          unit: 'Biro Keuangan',
          sasaranStrategis: 'Penyusunan RBA BLU 2026',
          iku: 'Kesesuaian Alokasi Pagu & Rencana Bisnis Anggaran',
          target: 100,
          realisasi: 94.0,
          persen: 94.0,
          pjSatker: 'Kepala Biro Keuangan',
        },
        {
          unit: 'Dit. Pengelolaan Lahan',
          sasaranStrategis: 'Penertiban Database Persil',
          iku: 'Migrasi Peta Spasial Pertanahan ke GIS',
          target: 100,
          realisasi: 92.5,
          persen: 92.5,
          pjSatker: 'Direktur Pengelolaan Lahan',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          sasaranStrategis: 'Kesiapan Angkutan Aviasi',
          iku: 'Kepatuhan Standar Keselamatan Otoritas Bandara',
          target: 100,
          realisasi: 89.8,
          persen: 89.8,
          pjSatker: 'Direktur BU Bandara',
        },
        {
          unit: 'BU RSBP Batam',
          sasaranStrategis: 'Pengadaan Obat & Alkes Rutin',
          iku: 'Ketersediaan Obat Vital Rumah Sakit',
          target: 100,
          realisasi: 87.2,
          persen: 87.2,
          pjSatker: 'Direktur Badan Usaha Rumah Sakit',
        },
        {
          unit: 'BU SPAM (Fasling)',
          sasaranStrategis: 'Pemeliharaan Intake Waduk Sei Harapan',
          iku: 'Kualitas Air Baku Sesuai Standar Permenkes',
          target: 100,
          realisasi: 84.5,
          persen: 84.5,
          pjSatker: 'Direktur BU SPAM & Fasilitas Lingkungan',
        },
      ],
      '2025-Semua Triwulan': [
        {
          unit: 'Dit. Pelabuhan (BUP)',
          sasaranStrategis: 'Peningkatan Pelayanan Kepelabuhanan',
          iku: 'Target Kontrak Kinerja BUP 2025',
          target: 100,
          realisasi: 96.2,
          persen: 96.2,
          pjSatker: 'Direktur Badan Usaha Pelabuhan',
        },
        {
          unit: 'Pusat PTSP',
          sasaranStrategis: 'Penyelenggaraan Perizinan Terpadu',
          iku: 'Indeks Kepatuhan Pelayanan Publik Ombudsman',
          target: 100,
          realisasi: 95.4,
          persen: 95.4,
          pjSatker: 'Kepala Pusat PTSP',
        },
        {
          unit: 'Biro Keuangan',
          sasaranStrategis: 'Akuntabilitas Pengelolaan Kas BLU',
          iku: 'Opini Laporan Keuangan WTP dari BPK RI',
          target: 100,
          realisasi: 94.0,
          persen: 94.0,
          pjSatker: 'Kepala Biro Keuangan',
        },
        {
          unit: 'Dit. Pengelolaan Lahan',
          sasaranStrategis: 'Legalitas Alokasi Tanah',
          iku: 'Realisasi Surat Perjanjian Pemanfaatan Lahan',
          target: 100,
          realisasi: 91.8,
          persen: 91.8,
          pjSatker: 'Direktur Pengelolaan Lahan',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          sasaranStrategis: 'Operasional Terminal Hang Nadim',
          iku: 'Pemenuhan Standar ICAO Airport Safety',
          target: 100,
          realisasi: 89.5,
          persen: 89.5,
          pjSatker: 'Direktur BU Bandara',
        },
        {
          unit: 'BU RSBP Batam',
          sasaranStrategis: 'Akreditasi Rumah Sakit Paripurna',
          iku: 'Pemenuhan Indikator Nasional Mutu Kemenkes',
          target: 100,
          realisasi: 87.5,
          persen: 87.5,
          pjSatker: 'Direktur Badan Usaha Rumah Sakit',
        },
        {
          unit: 'BU SPAM (Fasling)',
          sasaranStrategis: 'Transisi Pengelolaan SPAM Mandiri',
          iku: 'Penyaluran Air Bersih Pelanggan Domestik',
          target: 100,
          realisasi: 85.0,
          persen: 85.0,
          pjSatker: 'Direktur BU SPAM & Fasilitas Lingkungan',
        },
      ],
    },
  },

  // ==========================================================================
  // BARIS 2 - KARTU 3: Perubahan Besaran Risiko per Unit Kerja (Dumbbell Chart)
  // ==========================================================================
  perubahanRisikoUnit: {
    datasetName: 'Piagam Risiko Unit Kerja (Tertutup, pertahun)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    byTahun: {
      '2026': {
        totalUnitTurun: 6,
        persenUnitTurun: 100,
        records: [
          {
            unit: 'BU Pelabuhan (BUP)',
            sasaranOrganisasi: 'Keandalan Bongkar Muat & Dermaga Internasional',
            kejadianRisiko: 'Kongesti Kapal Petikemas & Kerusakan STS Crane',
            risikoAwal: 20, // Risiko Tinggi (Merah)
            risikoAkhir: 8,  // Risiko Rendah (Hijau)
            penurunan: 12,
            status: 'Efektif (Turun 12 Poin)',
            mitigasi: 'SOP Preventive Maintenance STS mingguan, buffer suku cadang, dan B-TOS digital routing',
          },
          {
            unit: 'BU SPAM (Fasling)',
            sasaranOrganisasi: 'Kontinuitas Distribusi Air Bersih ke Kawasan Industri',
            kejadianRisiko: 'Pecah Pipa Transmisi Induk & Elevasi Kritis Waduk',
            risikoAwal: 22, // Risiko Sangat Tinggi (Merah Tua)
            risikoAkhir: 10, // Risiko Sedang (Kuning)
            penurunan: 12,
            status: 'Terkendali (Turun 12 Poin)',
            mitigasi: 'Pemasangan PRV Valve penstabil tekanan, peremajaan pipa HDPE, dan telemetri DMZ',
          },
          {
            unit: 'Dit. Lahan (Pertanahan)',
            sasaranOrganisasi: 'Kepastian Hukum & Alokasi Ruang Investasi',
            kejadianRisiko: 'Sengketa Tumpang Tindih Persil & Keterlambatan UWTO',
            risikoAwal: 19,
            risikoAkhir: 9,
            penurunan: 10,
            status: 'Efektif (Turun 10 Poin)',
            mitigasi: 'Validasi spasial GIS drone orthophoto, e-Billing UWT otomatis, dan mediasi perdata',
          },
          {
            unit: 'Pusat PTSP',
            sasaranOrganisasi: 'Pelayanan Perizinan Investasi Cepat dan Akuntabel',
            kejadianRisiko: 'Downtime Server Perizinan & Keterlambatan Verifikasi Berkas',
            risikoAwal: 18,
            risikoAkhir: 7,
            penurunan: 11,
            status: 'Efektif (Turun 11 Poin)',
            mitigasi: 'Redundant leased line 1 Gbps, server failover tier-3, dan helpdesk digital 24/7',
          },
          {
            unit: 'BU Bandara Hang Nadim',
            sasaranOrganisasi: 'Keselamatan Aviasi & Keamanan Lingkungan Sisi Udara',
            kejadianRisiko: 'Foreign Object Debris (FOD) Runway & Genangan Drainase',
            risikoAwal: 16,
            risikoAkhir: 6,
            penurunan: 10,
            status: 'Efektif (Turun 10 Poin)',
            mitigasi: 'Armada FOD sweeper berkala, revitalisasi saluran box culvert, dan runway friction test',
          },
          {
            unit: 'BU RSBP Batam',
            sasaranOrganisasi: 'Keamanan Pasien & Mutu Tindakan Medis Kritis',
            kejadianRisiko: 'Kekosongan Reagen/Obat Vital & Gangguan Listrik Ruang OK',
            risikoAwal: 15,
            risikoAkhir: 7,
            penurunan: 8,
            status: 'Efektif (Turun 8 Poin)',
            mitigasi: 'Dual UPS sentral kapasitas 500 kVA, kontrak payung buffer stock obat 3 bulan, dan SIMRS',
          },
        ],
      },
      '2025': {
        totalUnitTurun: 5,
        persenUnitTurun: 83.3,
        records: [
          {
            unit: 'BU Pelabuhan (BUP)',
            sasaranOrganisasi: 'Operasional Terminal Kargo Batu Ampar',
            kejadianRisiko: 'Keterlambatan Sandar Kapal Feeder Singapura',
            risikoAwal: 21,
            risikoAkhir: 11,
            penurunan: 10,
            status: 'Terkendali (Turun 10 Poin)',
            mitigasi: 'Penyusunan slot booking berth dan penambahan tug boat pemandu',
          },
          {
            unit: 'BU SPAM (Fasling)',
            sasaranOrganisasi: 'Ketersediaan Air Baku Waduk Duriangkang',
            kejadianRisiko: 'Sedimentasi Gulma Enceng Gondok Waduk',
            risikoAwal: 20,
            risikoAkhir: 12,
            penurunan: 8,
            status: 'Terkendali (Turun 8 Poin)',
            mitigasi: 'Pembersihan mekanis berkala bersama Ditpam dan masyarakat konservasi',
          },
          {
            unit: 'Dit. Lahan (Pertanahan)',
            sasaranOrganisasi: 'Pengelolaan Hak Pengelolaan Lahan (HPL)',
            kejadianRisiko: 'Okupasi Lahan Tanpa Izin di Row Jalan',
            risikoAwal: 19,
            risikoAkhir: 10,
            penurunan: 9,
            status: 'Terkendali (Turun 9 Poin)',
            mitigasi: 'Patroli terpadu Ditpam dan penerbitan Surat Peringatan penertiban persil',
          },
          {
            unit: 'Pusat PTSP',
            sasaranOrganisasi: 'Standar Pelayanan Prima MPP',
            kejadianRisiko: 'Antrean Panjang Layanan Tatap Muka',
            risikoAwal: 17,
            risikoAkhir: 8,
            penurunan: 9,
            status: 'Efektif (Turun 9 Poin)',
            mitigasi: 'Pemberlakuan antrean daring via mobile app dan counter mandiri',
          },
          {
            unit: 'BU Bandara Hang Nadim',
            sasaranOrganisasi: 'Kelancaran Arus Bagasi Penumpang',
            kejadianRisiko: 'Malfungsi Baggage Handling System (BHS)',
            risikoAwal: 16,
            risikoAkhir: 9,
            penurunan: 7,
            status: 'Efektif (Turun 7 Poin)',
            mitigasi: 'Pergantian belt conveyor motoris dan inspeksi harian',
          },
          {
            unit: 'BU RSBP Batam',
            sasaranOrganisasi: 'Sterilisasi Ruang Operasi Bedah Jantung',
            kejadianRisiko: 'Kontaminasi Udara Ruang Bersih (Cleanroom)',
            risikoAwal: 14,
            risikoAkhir: 8,
            penurunan: 6,
            status: 'Efektif (Turun 6 Poin)',
            mitigasi: 'Penggantian filter HEPA berkala dan kalibrasi mikrobiologis',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 2 - KARTU 4: Pengaduan Masyarakat terhadap Layanan (Clustered Bar)
  // ==========================================================================
  pengaduanMasyarakat: {
    datasetName: 'Data Monitoring dan Evaluasi Pengelolaan Pengaduan Masyarakat terhadap Layanan Badan Usaha (Terbuka, persemester)',
    accessLabel: 'Terbuka',
    filterTahunList: ['2026', '2025'],
    filterPeriodeList: ['Semua Semester', 'Semester I', 'Semester II'],
    recordsByFilter: {
      '2026-Semua Semester': [
        {
          unit: 'BU RSBP Batam',
          diterima: 142,
          diproses: 4,
          selesai: 138,
          persenSelesai: 97.2,
          slaHari: 1.2,
          saluranTerbanyak: 'Helpdesk Rawat Jalan & WhatsApp Care',
        },
        {
          unit: 'BU Pelabuhan',
          diterima: 126,
          diproses: 5,
          selesai: 121,
          persenSelesai: 96.0,
          slaHari: 1.5,
          saluranTerbanyak: 'Loket Terminal Ferry & SP4N-LAPOR!',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          diterima: 98,
          diproses: 4,
          selesai: 94,
          persenSelesai: 95.9,
          slaHari: 1.8,
          saluranTerbanyak: 'Customer Service Counter & Portal Web',
        },
        {
          unit: 'BU SPAM (Air Bersih)',
          diterima: 185,
          diproses: 8,
          selesai: 177,
          persenSelesai: 95.7,
          slaHari: 1.6,
          saluranTerbanyak: 'Call Center 24 Jam & Media Sosial',
        },
        {
          unit: 'Pusat PTSP (MPP)',
          diterima: 84,
          diproses: 3,
          selesai: 81,
          persenSelesai: 96.4,
          slaHari: 1.1,
          saluranTerbanyak: 'Aplikasi Konsultasi OSS & Kotak Saran',
        },
      ],
      '2026-Semester I': [
        {
          unit: 'BU RSBP Batam',
          diterima: 78,
          diproses: 2,
          selesai: 76,
          persenSelesai: 97.4,
          slaHari: 1.1,
          saluranTerbanyak: 'Helpdesk Rawat Jalan',
        },
        {
          unit: 'BU Pelabuhan',
          diterima: 68,
          diproses: 3,
          selesai: 65,
          persenSelesai: 95.6,
          slaHari: 1.4,
          saluranTerbanyak: 'SP4N-LAPOR!',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          diterima: 52,
          diproses: 2,
          selesai: 50,
          persenSelesai: 96.2,
          slaHari: 1.7,
          saluranTerbanyak: 'Customer Service Counter',
        },
        {
          unit: 'BU SPAM (Air Bersih)',
          diterima: 98,
          diproses: 4,
          selesai: 94,
          persenSelesai: 95.9,
          slaHari: 1.5,
          saluranTerbanyak: 'Call Center 24 Jam',
        },
        {
          unit: 'Pusat PTSP (MPP)',
          diterima: 44,
          diproses: 1,
          selesai: 43,
          persenSelesai: 97.7,
          slaHari: 1.0,
          saluranTerbanyak: 'Aplikasi Konsultasi OSS',
        },
      ],
      '2026-Semester II': [
        {
          unit: 'BU RSBP Batam',
          diterima: 64,
          diproses: 2,
          selesai: 62,
          persenSelesai: 96.9,
          slaHari: 1.3,
          saluranTerbanyak: 'WhatsApp Care',
        },
        {
          unit: 'BU Pelabuhan',
          diterima: 58,
          diproses: 2,
          selesai: 56,
          persenSelesai: 96.6,
          slaHari: 1.6,
          saluranTerbanyak: 'Loket Terminal Ferry',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          diterima: 46,
          diproses: 2,
          selesai: 44,
          persenSelesai: 95.7,
          slaHari: 1.9,
          saluranTerbanyak: 'Portal Web Bandara',
        },
        {
          unit: 'BU SPAM (Air Bersih)',
          diterima: 87,
          diproses: 4,
          selesai: 83,
          persenSelesai: 95.4,
          slaHari: 1.7,
          saluranTerbanyak: 'Media Sosial & WhatsApp',
        },
        {
          unit: 'Pusat PTSP (MPP)',
          diterima: 40,
          diproses: 2,
          selesai: 38,
          persenSelesai: 95.0,
          slaHari: 1.2,
          saluranTerbanyak: 'Kotak Saran Digital',
        },
      ],
      '2025-Semua Semester': [
        {
          unit: 'BU RSBP Batam',
          diterima: 130,
          diproses: 6,
          selesai: 124,
          persenSelesai: 95.4,
          slaHari: 1.4,
          saluranTerbanyak: 'Helpdesk Layanan Medis',
        },
        {
          unit: 'BU Pelabuhan',
          diterima: 115,
          diproses: 7,
          selesai: 108,
          persenSelesai: 93.9,
          slaHari: 1.8,
          saluranTerbanyak: 'Loket Terminal & Kotak Pengaduan',
        },
        {
          unit: 'BU Bandara Hang Nadim',
          diterima: 90,
          diproses: 5,
          selesai: 85,
          persenSelesai: 94.4,
          slaHari: 2.0,
          saluranTerbanyak: 'Customer Service Counter',
        },
        {
          unit: 'BU SPAM (Air Bersih)',
          diterima: 170,
          diproses: 11,
          selesai: 159,
          persenSelesai: 93.5,
          slaHari: 1.9,
          saluranTerbanyak: 'Call Center Layanan Air',
        },
        {
          unit: 'Pusat PTSP (MPP)',
          diterima: 76,
          diproses: 4,
          selesai: 72,
          persenSelesai: 94.7,
          slaHari: 1.3,
          saluranTerbanyak: 'Aplikasi SP4N-LAPOR!',
        },
      ],
    },
  },

  // ==========================================================================
  // BARIS 3 - KARTU 5: Hasil Survei Kepuasan Masyarakat (Bar Horizontal Urut)
  // ==========================================================================
  surveiKepuasanMasyarakat: {
    datasetName: 'Rekap Hasil Survei Kepuasan Masyarakat (Terbuka, pertahun)',
    accessLabel: 'Terbuka',
    filterTahunList: ['2026', '2025'],
    filterUnitUsahaList: [
      'Semua Unit Usaha',
      'Pusat PTSP',
      'Dit. Lalu Lintas Barang',
      'BU Pelabuhan',
      'BU RSBP Batam',
      'BU Bandara Hang Nadim',
      'BU SPAM (Air Bersih)',
    ],
    byFilter: {
      'Semua Unit Usaha-2026': [
        {
          kategori: 'Persyaratan & Prosedur Layanan',
          detail: 'Kejelasan alur tahapan pengajuan, transparansi syarat berkas, dan keandalan regulasi',
          skor: 3.72,
          persen: 93.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 4250,
        },
        {
          kategori: 'Kompetensi & Sikap Petugas',
          detail: 'Keramahan, kesigapan petugas, profesionalisme teknis, dan etika pelayanan',
          skor: 3.68,
          persen: 92.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 4250,
        },
        {
          kategori: 'Kepastian Biaya / Tarif Layanan',
          detail: 'Kesesuaian tarif resmi PNBP dengan ketentuan perundangan tanpa pungli',
          skor: 3.65,
          persen: 91.25,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 4250,
        },
        {
          kategori: 'Sarana & Prasarana Fasilitas',
          detail: 'Kenyamanan ruang tunggu, kebersihan toilet, AC, fasilitas disabilitas, dan WiFi',
          skor: 3.56,
          persen: 89.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 4250,
        },
        {
          kategori: 'Kecepatan Waktu Pelayanan',
          detail: 'Realisasi ketepatan waktu penyelesaian proses izin/layanan sesuai SLA maklumat',
          skor: 3.52,
          persen: 88.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 4250,
        },
        {
          kategori: 'Penanganan Pengaduan & Saran',
          detail: 'Responsivitas tindak lanjut keluhan masyarakat serta kejelasan kanal feedback',
          skor: 3.48,
          persen: 87.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 4250,
        },
      ],
      'Pusat PTSP-2026': [
        {
          kategori: 'Persyaratan & Prosedur Layanan',
          detail: 'Prosedur izin online OSS RBA dan panduan berkas persyaratan jelas',
          skor: 3.78,
          persen: 94.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 1120,
        },
        {
          kategori: 'Kompetensi & Sikap Petugas',
          detail: 'Petugas loket ramah, responsif dan menguasai teknis perizinan berusaha',
          skor: 3.74,
          persen: 93.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 1120,
        },
        {
          kategori: 'Kepastian Biaya / Tarif Layanan',
          detail: 'Gratis/Nol rupiah untuk perizinan dasar, tarif PNBP transparan',
          skor: 3.72,
          persen: 93.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 1120,
        },
        {
          kategori: 'Sarana & Prasarana Fasilitas',
          detail: 'Gedung Mal Pelayanan Publik (MPP) modern, ber-AC, antrean digital rapi',
          skor: 3.66,
          persen: 91.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 1120,
        },
        {
          kategori: 'Kecepatan Waktu Pelayanan',
          detail: 'Izin otomatis terbit tepat waktu sesuai standar pelayanan prima',
          skor: 3.60,
          persen: 90.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 1120,
        },
        {
          kategori: 'Penanganan Pengaduan & Saran',
          detail: 'Helpdesk tatap muka & daring merespons pertanyaan dengan cepat',
          skor: 3.58,
          persen: 89.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 1120,
        },
      ],
      'BU Pelabuhan-2026': [
        {
          kategori: 'Persyaratan & Prosedur Layanan',
          detail: 'Prosedur sandar kapal dan manifest petikemas tersistem digital B-TOS',
          skor: 3.66,
          persen: 91.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 890,
        },
        {
          kategori: 'Kompetensi & Sikap Petugas',
          detail: 'Petugas pandu kapal dan loket terminal ferry sigap bertugas',
          skor: 3.62,
          persen: 90.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 890,
        },
        {
          kategori: 'Kepastian Biaya / Tarif Layanan',
          detail: 'Tarif jasa labuh tambat dan pass penumpang sesuai regulasi resmi',
          skor: 3.60,
          persen: 90.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 890,
        },
        {
          kategori: 'Sarana & Prasarana Fasilitas',
          detail: 'Dermaga Batu Ampar, ruang tunggu boarding dan garbarata bersih',
          skor: 3.52,
          persen: 88.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 890,
        },
        {
          kategori: 'Kecepatan Waktu Pelayanan',
          detail: 'Bongkar muat kontainer per jam (box/hour) meningkat signifikan',
          skor: 3.48,
          persen: 87.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 890,
        },
        {
          kategori: 'Penanganan Pengaduan & Saran',
          detail: 'Tindak lanjut laporan keterlambatan bagasi/jadwal ferry tertangani baik',
          skor: 3.42,
          persen: 85.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 890,
        },
      ],
      'Semua Unit Usaha-2025': [
        {
          kategori: 'Persyaratan & Prosedur Layanan',
          detail: 'Panduan persyaratan pelayanan publik instansi',
          skor: 3.65,
          persen: 91.25,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 3950,
        },
        {
          kategori: 'Kompetensi & Sikap Petugas',
          detail: 'Sikap sopan santun dan kesigapan petugas loket',
          skor: 3.62,
          persen: 90.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 3950,
        },
        {
          kategori: 'Kepastian Biaya / Tarif Layanan',
          detail: 'Transparansi pungutan retribusi dan jasa BLU',
          skor: 3.58,
          persen: 89.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 3950,
        },
        {
          kategori: 'Sarana & Prasarana Fasilitas',
          detail: 'Kenyamanan fasilitas gedung pelayanan publik',
          skor: 3.50,
          persen: 87.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 3950,
        },
        {
          kategori: 'Kecepatan Waktu Pelayanan',
          detail: 'Ketepatan waktu penyelesaian proses dokumen',
          skor: 3.46,
          persen: 86.50,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 3950,
        },
        {
          kategori: 'Penanganan Pengaduan & Saran',
          detail: 'Tindak lanjut pengaduan masyarakat',
          skor: 3.40,
          persen: 85.00,
          mutu: 'Mutu A (Sangat Baik)',
          responden: 3950,
        },
      ],
    },
  },

  // ==========================================================================
  // BARIS 3 - KARTU 6: Maturitas SPIP per Komponen (Radar Chart)
  // ==========================================================================
  maturitasSpip: {
    datasetName: 'Data Penilaian Maturitas SPIP (Tertutup, pertahun)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    byTahun: {
      '2026': {
        periodeSekarangLabel: 'Tahun 2026',
        periodeSebelumLabel: 'Tahun 2025',
        skorRerataSekarang: 3.42,
        levelMaturitas: 'Level 3 (Terdefinisi)',
        komponen: [
          {
            unsur: 'Lingkungan Pengendalian',
            singkat: 'Lingkungan',
            skorSekarang: 3.48,
            skorSebelum: 3.32,
            target: 3.50,
            penjelasan: 'Integritas etika pimpinan, struktur organisasi yang adaptif, dan kebijakan SDM berbasis meritokrasi',
          },
          {
            unsur: 'Penilaian Risiko',
            singkat: 'Risiko',
            skorSekarang: 3.35,
            skorSebelum: 3.18,
            target: 3.50,
            penjelasan: 'Identifikasi risiko operasional & fraud, analisis konsekuensi dan probabilitas kejadian pada 24 satker',
          },
          {
            unsur: 'Kegiatan Pengendalian',
            singkat: 'Pengendalian',
            skorSekarang: 3.44,
            skorSebelum: 3.26,
            target: 3.50,
            penjelasan: 'SOP digital, otorisasi berjenjang keuangan BLU, pemisahan fungsi tugas, dan proteksi aset institusi',
          },
          {
            unsur: 'Informasi & Komunikasi',
            singkat: 'Infokom',
            skorSekarang: 3.38,
            skorSebelum: 3.20,
            target: 3.50,
            penjelasan: 'Integrasi sistem Satu Data BP Batam, dashboard pimpinan real-time, dan keterbukaan informasi publik',
          },
          {
            unsur: 'Pemantauan Pengendalian Intern',
            singkat: 'Pemantauan',
            skorSekarang: 3.46,
            skorSebelum: 3.28,
            target: 3.50,
            penjelasan: 'Audit independen SPI berkala, telaah tindak lanjut temuan BPK/BPKP, serta pemantauan manajemen risiko',
          },
        ],
      },
      '2025': {
        periodeSekarangLabel: 'Tahun 2025',
        periodeSebelumLabel: 'Tahun 2024',
        skorRerataSekarang: 3.25,
        levelMaturitas: 'Level 3 (Terdefinisi)',
        komponen: [
          {
            unsur: 'Lingkungan Pengendalian',
            singkat: 'Lingkungan',
            skorSekarang: 3.32,
            skorSebelum: 3.12,
            target: 3.25,
            penjelasan: 'Penegakan pakta integritas dan kode etik pegawai BP Batam',
          },
          {
            unsur: 'Penilaian Risiko',
            singkat: 'Risiko',
            skorSekarang: 3.18,
            skorSebelum: 2.98,
            target: 3.25,
            penjelasan: 'Penyusunan register risiko satker secara berjenjang',
          },
          {
            unsur: 'Kegiatan Pengendalian',
            singkat: 'Pengendalian',
            skorSekarang: 3.26,
            skorSebelum: 3.05,
            target: 3.25,
            penjelasan: 'Reviu SOP operasional unit kerja dan pengendalian belanja',
          },
          {
            unsur: 'Informasi & Komunikasi',
            singkat: 'Infokom',
            skorSekarang: 3.20,
            skorSebelum: 3.00,
            target: 3.25,
            penjelasan: 'Penyampaian laporan berkala dan saluran komunikasi internal',
          },
          {
            unsur: 'Pemantauan Pengendalian Intern',
            singkat: 'Pemantauan',
            skorSekarang: 3.28,
            skorSebelum: 3.10,
            target: 3.25,
            penjelasan: 'Evaluasi kepatuhan internal oleh Satuan Pemeriksa Intern',
          },
        ],
      },
    },
  },
};
