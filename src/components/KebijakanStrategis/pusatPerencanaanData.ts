/**
 * Master Data Dummy Satu Objek JSON untuk Unit:
 * "Pusat Perencanaan Program Strategis" (P3S) - BP Batam
 * Sesuai Standarisasi Satu Data BP Batam & Dokumen Kamus KPI / Perkin DEP-A2
 */

export interface AlokasiProgramItem {
  program: string;
  sasaranProgram: string;
  kroRo: string;
  targetSatuan: string;
  pusatPerencanaan: number;
  ditInfrastruktur: number;
  ditBandaraPelabuhan: number;
  ditPtsp: number;
  biroUmumKeuangan: number;
  total: number;
}

export interface KomposisiRkaItem {
  sumberDana: 'PNBP' | 'Rupiah Murni' | 'PHLN' | 'PDLN';
  alokasiMiliar: number;
  persen: number;
  kode: string;
  uraian: string;
  volume: string;
  color: string;
}

export interface SerapanKegiatanItem {
  kegiatanOutput: string;
  kodeMa: string;
  paguDipa: number;
  sisaPagu: number;
  terserap: number;
  persenSerapan: number;
  progresPaketFisik: number;
  progresKeuangan: number;
  status: string;
}

export interface TargetRenstraItem {
  id: string;
  sasaranStrategis: string;
  program: string;
  indikatorKinerja: string;
  satuan: string;
  targetPerTahun: {
    '2025': number;
    '2026': number;
    '2027': number;
    '2028': number;
    '2029': number;
  };
  color: string;
}

export interface PeruntukanLahanItem {
  tahun: string;
  jumlahPermohonan: number;
  selesai: number;
  persenSelesai: number;
  keterangan: string;
}

export interface PanjangJalanItem {
  klasifikasiJalan: string;
  batamCenter: number;
  nongsa: number;
  batuAmpar: number;
  sekupang: number;
  batuAjiSagulung: number;
  kabil: number;
  totalKm: number;
  subWilayah: string;
  lebarRowMeter: string;
}

export interface PusatPerencanaanMasterData {
  alokasiAnggaranProgram: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        totalAlokasiMiliar: number;
        records: AlokasiProgramItem[];
      }
    >;
  };
  komposisiRkaSumberDana: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    byTahun: Record<
      string,
      {
        totalAlokasiMiliar: number;
        records: KomposisiRkaItem[];
      }
    >;
  };
  serapanPaguKegiatan: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    filterTriwulanList: string[];
    byFilter: Record<
      string,
      {
        totalPaguDipa: number;
        totalTerserap: number;
        persenSerapanKeseluruhan: number;
        records: SerapanKegiatanItem[];
      }
    >;
  };
  targetIndikatorRenstra: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    periode: string;
    filterSasaranList: string[];
    tahunList: string[];
    records: TargetRenstraItem[];
  };
  penyelesaianPeruntukanLahan: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    totalPermohonan: number;
    totalSelesai: number;
    persenSelesaiRerata: number;
    records: PeruntukanLahanItem[];
  };
  panjangJalanRencana: {
    datasetName: string;
    accessLabel: 'Terbuka' | 'Tertutup';
    filterTahunList: string[];
    wilayahList: { key: string; label: string; color: string }[];
    byFilter: Record<
      string,
      {
        totalPanjangKm: number;
        records: PanjangJalanItem[];
      }
    >;
  };
}

export const PUSAT_PERENCANAAN_MASTER_DATA: PusatPerencanaanMasterData = {
  // ==========================================================================
  // BARIS 1 - KARTU 1: ALOKASI ANGGARAN PER PROGRAM (STACKED BAR HORIZONTAL)
  // Dataset: Rekapitulasi Rencana Kerja BP Batam (Terbuka, pertahun)
  // ==========================================================================
  alokasiAnggaranProgram: {
    datasetName: 'Rekapitulasi Rencana Kerja BP Batam',
    accessLabel: 'Terbuka',
    filterTahunList: ['2026', '2025', '2024'],
    byTahun: {
      '2026': {
        totalAlokasiMiliar: 1485.4,
        records: [
          {
            program: 'Pembangunan Infrastruktur & Konektivitas Kawasan',
            sasaranProgram: 'Terwujudnya infrastruktur terpadu berstandar internasional di KPBPB',
            kroRo: 'KRO.001 - Jaringan Jalan Arteri & Jembatan Strategis',
            targetSatuan: '14 Paket Pekerjaan Fisik Strategis',
            pusatPerencanaan: 45.2,
            ditInfrastruktur: 380.5,
            ditBandaraPelabuhan: 120.0,
            ditPtsp: 12.5,
            biroUmumKeuangan: 24.8,
            total: 583.0,
          },
          {
            program: 'Pengembangan Kawasan Industri & Investasi Strategis',
            sasaranProgram: 'Peningkatan realisasi investasi PMA/PMDN & hilirisasi bernilai tambah',
            kroRo: 'KRO.002 - Fasilitasi KEK & Kawasan Industri Prioritas',
            targetSatuan: '8 Dokumen Rekomendasi Tata Ruang KEK',
            pusatPerencanaan: 38.5,
            ditInfrastruktur: 110.2,
            ditBandaraPelabuhan: 48.0,
            ditPtsp: 64.5,
            biroUmumKeuangan: 18.2,
            total: 279.4,
          },
          {
            program: 'Pengelolaan Lingkungan Hidup, SPAM & Sanitasi Fasling',
            sasaranProgram: 'Ketersediaan air baku dan pengelolaan limbah berkelanjutan',
            kroRo: 'KRO.003 - Revitalisasi Waduk & Sistem Drainase Primer',
            targetSatuan: '5 Waduk & 18 Kolam Retensi Pengendali Banjir',
            pusatPerencanaan: 29.8,
            ditInfrastruktur: 165.4,
            ditBandaraPelabuhan: 18.6,
            ditPtsp: 8.4,
            biroUmumKeuangan: 15.2,
            total: 237.4,
          },
          {
            program: 'Modernisasi Hub Logistik Bandara & Pelabuhan Laut',
            sasaranProgram: 'Peningkatan kapasitas transhipment Selat Malaka & kargo udara',
            kroRo: 'KRO.004 - Modernisasi STS Crane & Aerotropolis',
            targetSatuan: '2 Dermaga Container Yard & Terminal 2',
            pusatPerencanaan: 31.0,
            ditInfrastruktur: 85.0,
            ditBandaraPelabuhan: 105.4,
            ditPtsp: 7.2,
            biroUmumKeuangan: 14.0,
            total: 242.6,
          },
          {
            program: 'Penyelenggaraan Tata Kelola, Riset Perencanaan & TI',
            sasaranProgram: 'Transformasi digital dan standarisasi Satu Data terintegrasi',
            kroRo: 'KRO.005 - Masterplan Wilayah & Command Center SPBE',
            targetSatuan: '19 Dokumen Masterplan & Dashboard Perkin',
            pusatPerencanaan: 62.4,
            ditInfrastruktur: 22.0,
            ditBandaraPelabuhan: 15.0,
            ditPtsp: 24.6,
            biroUmumKeuangan: 19.0,
            total: 143.0,
          },
        ],
      },
      '2025': {
        totalAlokasiMiliar: 1392.8,
        records: [
          {
            program: 'Pembangunan Infrastruktur & Konektivitas Kawasan',
            sasaranProgram: 'Terwujudnya infrastruktur terpadu berstandar internasional di KPBPB',
            kroRo: 'KRO.001 - Jaringan Jalan Arteri & Jembatan Strategis',
            targetSatuan: '12 Paket Pekerjaan Fisik Strategis',
            pusatPerencanaan: 41.0,
            ditInfrastruktur: 355.0,
            ditBandaraPelabuhan: 110.0,
            ditPtsp: 11.0,
            biroUmumKeuangan: 22.5,
            total: 539.5,
          },
          {
            program: 'Pengembangan Kawasan Industri & Investasi Strategis',
            sasaranProgram: 'Peningkatan realisasi investasi PMA/PMDN & hilirisasi bernilai tambah',
            kroRo: 'KRO.002 - Fasilitasi KEK & Kawasan Industri Prioritas',
            targetSatuan: '7 Dokumen Rekomendasi Tata Ruang KEK',
            pusatPerencanaan: 35.0,
            ditInfrastruktur: 102.0,
            ditBandaraPelabuhan: 45.0,
            ditPtsp: 60.0,
            biroUmumKeuangan: 16.5,
            total: 258.5,
          },
          {
            program: 'Pengelolaan Lingkungan Hidup, SPAM & Sanitasi Fasling',
            sasaranProgram: 'Ketersediaan air baku dan pengelolaan limbah berkelanjutan',
            kroRo: 'KRO.003 - Revitalisasi Waduk & Sistem Drainase Primer',
            targetSatuan: '4 Waduk & 15 Kolam Retensi',
            pusatPerencanaan: 26.5,
            ditInfrastruktur: 154.0,
            ditBandaraPelabuhan: 16.0,
            ditPtsp: 8.0,
            biroUmumKeuangan: 14.0,
            total: 218.5,
          },
          {
            program: 'Modernisasi Hub Logistik Bandara & Pelabuhan Laut',
            sasaranProgram: 'Peningkatan kapasitas transhipment Selat Malaka & kargo udara',
            kroRo: 'KRO.004 - Modernisasi STS Crane & Aerotropolis',
            targetSatuan: '1 Dermaga Curah & Fasilitas Sisi Udara',
            pusatPerencanaan: 28.5,
            ditInfrastruktur: 80.0,
            ditBandaraPelabuhan: 98.0,
            ditPtsp: 6.8,
            biroUmumKeuangan: 13.0,
            total: 226.3,
          },
          {
            program: 'Penyelenggaraan Tata Kelola, Riset Perencanaan & TI',
            sasaranProgram: 'Transformasi digital dan standarisasi Satu Data terintegrasi',
            kroRo: 'KRO.005 - Masterplan Wilayah & Command Center SPBE',
            targetSatuan: '16 Dokumen Masterplan & Dashboard Perkin',
            pusatPerencanaan: 65.0,
            ditInfrastruktur: 20.0,
            ditBandaraPelabuhan: 14.0,
            ditPtsp: 32.0,
            biroUmumKeuangan: 19.0,
            total: 150.0,
          },
        ],
      },
      '2024': {
        totalAlokasiMiliar: 1260.5,
        records: [
          {
            program: 'Pembangunan Infrastruktur & Konektivitas Kawasan',
            sasaranProgram: 'Terwujudnya infrastruktur terpadu berstandar internasional di KPBPB',
            kroRo: 'KRO.001 - Jaringan Jalan Arteri & Jembatan Strategis',
            targetSatuan: '10 Paket Pekerjaan Fisik Strategis',
            pusatPerencanaan: 36.0,
            ditInfrastruktur: 320.0,
            ditBandaraPelabuhan: 98.0,
            ditPtsp: 10.0,
            biroUmumKeuangan: 20.0,
            total: 484.0,
          },
          {
            program: 'Pengembangan Kawasan Industri & Investasi Strategis',
            sasaranProgram: 'Peningkatan realisasi investasi PMA/PMDN & hilirisasi bernilai tambah',
            kroRo: 'KRO.002 - Fasilitasi KEK & Kawasan Industri Prioritas',
            targetSatuan: '6 Dokumen Rekomendasi Tata Ruang KEK',
            pusatPerencanaan: 30.0,
            ditInfrastruktur: 95.0,
            ditBandaraPelabuhan: 40.0,
            ditPtsp: 54.0,
            biroUmumKeuangan: 15.0,
            total: 234.0,
          },
          {
            program: 'Pengelolaan Lingkungan Hidup, SPAM & Sanitasi Fasling',
            sasaranProgram: 'Ketersediaan air baku dan pengelolaan limbah berkelanjutan',
            kroRo: 'KRO.003 - Revitalisasi Waduk & Sistem Drainase Primer',
            targetSatuan: '4 Waduk & 12 Kolam Retensi',
            pusatPerencanaan: 24.0,
            ditInfrastruktur: 142.0,
            ditBandaraPelabuhan: 15.0,
            ditPtsp: 7.5,
            biroUmumKeuangan: 13.0,
            total: 201.5,
          },
          {
            program: 'Modernisasi Hub Logistik Bandara & Pelabuhan Laut',
            sasaranProgram: 'Peningkatan kapasitas transhipment Selat Malaka & kargo udara',
            kroRo: 'KRO.004 - Modernisasi STS Crane & Aerotropolis',
            targetSatuan: 'Studi Kelayakan & Pengadaan Alat Pelabuhan',
            pusatPerencanaan: 25.0,
            ditInfrastruktur: 74.0,
            ditBandaraPelabuhan: 90.0,
            ditPtsp: 6.0,
            biroUmumKeuangan: 12.0,
            total: 207.0,
          },
          {
            program: 'Penyelenggaraan Tata Kelola, Riset Perencanaan & TI',
            sasaranProgram: 'Transformasi digital dan standarisasi Satu Data terintegrasi',
            kroRo: 'KRO.005 - Masterplan Wilayah & Command Center SPBE',
            targetSatuan: '14 Dokumen Masterplan & Dashboard Perkin',
            pusatPerencanaan: 58.0,
            ditInfrastruktur: 18.0,
            ditBandaraPelabuhan: 12.0,
            ditPtsp: 29.0,
            biroUmumKeuangan: 17.0,
            total: 134.0,
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 1 - KARTU 2: KOMPOSISI RKA PER SUMBER DANA (DONUT CHART)
  // Dataset: RKA (Rencana Kerja dan Anggaran) (Tertutup, pertahun)
  // Segmen: PNBP, Rupiah Murni, PHLN, PDLN
  // ==========================================================================
  komposisiRkaSumberDana: {
    datasetName: 'RKA (Rencana Kerja dan Anggaran)',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025', '2024'],
    byTahun: {
      '2026': {
        totalAlokasiMiliar: 1840.0,
        records: [
          {
            sumberDana: 'PNBP',
            alokasiMiliar: 1472.0,
            persen: 80.0,
            kode: 'SD-PNBP-BLU',
            uraian: 'Penerimaan Negara Bukan Pajak BLU (Pengelolaan Lahan, Pelabuhan, Bandara, SPAM)',
            volume: '4 Badan Layanan Usaha Teknis',
            color: '#2563eb', // Blue utama
          },
          {
            sumberDana: 'Rupiah Murni',
            alokasiMiliar: 239.2,
            persen: 13.0,
            kode: 'SD-RM-APBN',
            uraian: 'Alokasi Rupiah Murni APBN (Belanja Pegawai, Operasional Kantor & Tugas Pengawasan)',
            volume: '1 Satuan Kerja Pusat',
            color: '#10b981', // Green positif
          },
          {
            sumberDana: 'PHLN',
            alokasiMiliar: 92.0,
            persen: 5.0,
            kode: 'SD-PHLN-LOAN',
            uraian: 'Pinjaman & Hibah Luar Negeri (Kerjasama Pendanaan Green Port & Smart Mobility)',
            volume: '2 Proyek Strategis Bilateral',
            color: '#0284c7', // Sky blue
          },
          {
            sumberDana: 'PDLN',
            alokasiMiliar: 36.8,
            persen: 2.0,
            kode: 'SD-PDLN-DOM',
            uraian: 'Pinjaman / Penerusan Pinjaman Dalam Negeri (Sindikasi Lembaga Keuangan Nasional)',
            volume: '1 Paket Kerjasama Multi-Utility',
            color: '#64748b', // Slate abu-abu
          },
        ],
      },
      '2025': {
        totalAlokasiMiliar: 1680.0,
        records: [
          {
            sumberDana: 'PNBP',
            alokasiMiliar: 1310.4,
            persen: 78.0,
            kode: 'SD-PNBP-BLU',
            uraian: 'Penerimaan Negara Bukan Pajak BLU BP Batam',
            volume: '4 Badan Usaha',
            color: '#2563eb',
          },
          {
            sumberDana: 'Rupiah Murni',
            alokasiMiliar: 235.2,
            persen: 14.0,
            kode: 'SD-RM-APBN',
            uraian: 'Alokasi Rupiah Murni APBN',
            volume: '1 Satker Operasional',
            color: '#10b981',
          },
          {
            sumberDana: 'PHLN',
            alokasiMiliar: 100.8,
            persen: 6.0,
            kode: 'SD-PHLN-LOAN',
            uraian: 'Pinjaman / Hibah Luar Negeri Kemitraan',
            volume: '2 Proyek Bilateral',
            color: '#0284c7',
          },
          {
            sumberDana: 'PDLN',
            alokasiMiliar: 33.6,
            persen: 2.0,
            kode: 'SD-PDLN-DOM',
            uraian: 'Pendanaan Dalam Negeri Khusus',
            volume: '1 Paket Pembiayaan',
            color: '#64748b',
          },
        ],
      },
      '2024': {
        totalAlokasiMiliar: 1520.0,
        records: [
          {
            sumberDana: 'PNBP',
            alokasiMiliar: 1140.0,
            persen: 75.0,
            kode: 'SD-PNBP-BLU',
            uraian: 'Penerimaan Negara Bukan Pajak Operasional Kawasan',
            volume: '4 Badan Usaha',
            color: '#2563eb',
          },
          {
            sumberDana: 'Rupiah Murni',
            alokasiMiliar: 243.2,
            persen: 16.0,
            kode: 'SD-RM-APBN',
            uraian: 'Belanja Dukungan Manajemen APBN',
            volume: '1 Satker',
            color: '#10b981',
          },
          {
            sumberDana: 'PHLN',
            alokasiMiliar: 106.4,
            persen: 7.0,
            kode: 'SD-PHLN-LOAN',
            uraian: 'Hibah Konstruksi Sanitasi & Pelabuhan',
            volume: '2 Paket PHLN',
            color: '#0284c7',
          },
          {
            sumberDana: 'PDLN',
            alokasiMiliar: 30.4,
            persen: 2.0,
            kode: 'SD-PDLN-DOM',
            uraian: 'Pinjaman Sindikasi Dalam Negeri',
            volume: '1 Paket Sindikasi',
            color: '#64748b',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 2 - KARTU 3: SERAPAN PAGU PER KEGIATAN (CLUSTERED BAR HORIZONTAL)
  // Dataset: Rekapitulasi Monitoring dan Evaluasi Program Kerja BP Batam (Tertutup, pertriwulan)
  // Sumbu Y: Kegiatan/Output. Batang: Pagu DIPA dan Terserap (Pagu DIPA - Sisa Pagu)
  // Batang terserap oranye jika serapan di bawah 60%.
  // ==========================================================================
  serapanPaguKegiatan: {
    datasetName: 'Rekapitulasi Monitoring dan Evaluasi Program Kerja BP Batam',
    accessLabel: 'Tertutup',
    filterTahunList: ['2026', '2025'],
    filterTriwulanList: [
      'Semua Triwulan',
      'Triwulan I',
      'Triwulan II',
      'Triwulan III',
      'Triwulan IV',
    ],
    byFilter: {
      '2026-Semua Triwulan': {
        totalPaguDipa: 215.5,
        totalTerserap: 168.9,
        persenSerapanKeseluruhan: 78.4,
        records: [
          {
            kegiatanOutput: 'Penyusunan Rencana Induk Drainase & Retensi',
            kodeMa: 'MA-001.01.P3S',
            paguDipa: 42.5,
            sisaPagu: 7.2,
            terserap: 35.3,
            persenSerapan: 83.1,
            progresPaketFisik: 88.5,
            progresKeuangan: 83.1,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'Kajian Multi-Utility Tunnel Koridor Arteri',
            kodeMa: 'MA-002.04.P3S',
            paguDipa: 38.0,
            sisaPagu: 4.8,
            terserap: 33.2,
            persenSerapan: 87.4,
            progresPaketFisik: 92.0,
            progresKeuangan: 87.4,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'Masterplan Jaringan Jalan KPBPB 2025-2029',
            kodeMa: 'MA-003.02.P3S',
            paguDipa: 54.0,
            sisaPagu: 6.5,
            terserap: 47.5,
            persenSerapan: 88.0,
            progresPaketFisik: 95.0,
            progresKeuangan: 88.0,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'DED & Amdal Zona Aerotropolis Hang Nadim',
            kodeMa: 'MA-004.03.P3S',
            paguDipa: 46.0,
            sisaPagu: 21.0,
            terserap: 25.0,
            persenSerapan: 54.3, // Di bawah 60% -> Warning oranye!
            progresPaketFisik: 58.0,
            progresKeuangan: 54.3,
            status: 'Perlu Perhatian',
          },
          {
            kegiatanOutput: 'Monev Renstra & Tata Ruang Peruntukan Kawasan',
            kodeMa: 'MA-005.01.P3S',
            paguDipa: 35.0,
            sisaPagu: 7.1,
            terserap: 27.9,
            persenSerapan: 79.7,
            progresPaketFisik: 84.0,
            progresKeuangan: 79.7,
            status: 'On-Track',
          },
        ],
      },
      '2026-Triwulan I': {
        totalPaguDipa: 215.5,
        totalTerserap: 74.2,
        persenSerapanKeseluruhan: 34.4,
        records: [
          {
            kegiatanOutput: 'Penyusunan Rencana Induk Drainase & Retensi',
            kodeMa: 'MA-001.01.P3S',
            paguDipa: 42.5,
            sisaPagu: 28.5,
            terserap: 14.0,
            persenSerapan: 32.9,
            progresPaketFisik: 38.0,
            progresKeuangan: 32.9,
            status: 'On-Track Tahap Awal',
          },
          {
            kegiatanOutput: 'Kajian Multi-Utility Tunnel Koridor Arteri',
            kodeMa: 'MA-002.04.P3S',
            paguDipa: 38.0,
            sisaPagu: 21.3,
            terserap: 16.7,
            persenSerapan: 43.9,
            progresPaketFisik: 46.0,
            progresKeuangan: 43.9,
            status: 'On-Track Tahap Awal',
          },
          {
            kegiatanOutput: 'Masterplan Jaringan Jalan KPBPB 2025-2029',
            kodeMa: 'MA-003.02.P3S',
            paguDipa: 54.0,
            sisaPagu: 32.4,
            terserap: 21.6,
            persenSerapan: 40.0,
            progresPaketFisik: 42.0,
            progresKeuangan: 40.0,
            status: 'On-Track Tahap Awal',
          },
          {
            kegiatanOutput: 'DED & Amdal Zona Aerotropolis Hang Nadim',
            kodeMa: 'MA-004.03.P3S',
            paguDipa: 46.0,
            sisaPagu: 36.8,
            terserap: 9.2,
            persenSerapan: 20.0,
            progresPaketFisik: 22.0,
            progresKeuangan: 20.0,
            status: 'Persiapan Tender',
          },
          {
            kegiatanOutput: 'Monev Renstra & Tata Ruang Peruntukan Kawasan',
            kodeMa: 'MA-005.01.P3S',
            paguDipa: 35.0,
            sisaPagu: 22.3,
            terserap: 12.7,
            persenSerapan: 36.3,
            progresPaketFisik: 39.0,
            progresKeuangan: 36.3,
            status: 'On-Track Tahap Awal',
          },
        ],
      },
      '2026-Triwulan II': {
        totalPaguDipa: 215.5,
        totalTerserap: 128.5,
        persenSerapanKeseluruhan: 59.6,
        records: [
          {
            kegiatanOutput: 'Penyusunan Rencana Induk Drainase & Retensi',
            kodeMa: 'MA-001.01.P3S',
            paguDipa: 42.5,
            sisaPagu: 15.3,
            terserap: 27.2,
            persenSerapan: 64.0,
            progresPaketFisik: 68.0,
            progresKeuangan: 64.0,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'Kajian Multi-Utility Tunnel Koridor Arteri',
            kodeMa: 'MA-002.04.P3S',
            paguDipa: 38.0,
            sisaPagu: 11.4,
            terserap: 26.6,
            persenSerapan: 70.0,
            progresPaketFisik: 74.0,
            progresKeuangan: 70.0,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'Masterplan Jaringan Jalan KPBPB 2025-2029',
            kodeMa: 'MA-003.02.P3S',
            paguDipa: 54.0,
            sisaPagu: 16.7,
            terserap: 37.3,
            persenSerapan: 69.1,
            progresPaketFisik: 72.0,
            progresKeuangan: 69.1,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'DED & Amdal Zona Aerotropolis Hang Nadim',
            kodeMa: 'MA-004.03.P3S',
            paguDipa: 46.0,
            sisaPagu: 28.5,
            terserap: 17.5,
            persenSerapan: 38.0, // Di bawah 60%
            progresPaketFisik: 42.0,
            progresKeuangan: 38.0,
            status: 'Perlu Perhatian',
          },
          {
            kegiatanOutput: 'Monev Renstra & Tata Ruang Peruntukan Kawasan',
            kodeMa: 'MA-005.01.P3S',
            paguDipa: 35.0,
            sisaPagu: 15.1,
            terserap: 19.9,
            persenSerapan: 56.9, // Di bawah 60%
            progresPaketFisik: 60.0,
            progresKeuangan: 56.9,
            status: 'Perlu Perhatian',
          },
        ],
      },
      '2026-Triwulan III': {
        totalPaguDipa: 215.5,
        totalTerserap: 168.9,
        persenSerapanKeseluruhan: 78.4,
        records: [
          {
            kegiatanOutput: 'Penyusunan Rencana Induk Drainase & Retensi',
            kodeMa: 'MA-001.01.P3S',
            paguDipa: 42.5,
            sisaPagu: 7.2,
            terserap: 35.3,
            persenSerapan: 83.1,
            progresPaketFisik: 88.5,
            progresKeuangan: 83.1,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'Kajian Multi-Utility Tunnel Koridor Arteri',
            kodeMa: 'MA-002.04.P3S',
            paguDipa: 38.0,
            sisaPagu: 4.8,
            terserap: 33.2,
            persenSerapan: 87.4,
            progresPaketFisik: 92.0,
            progresKeuangan: 87.4,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'Masterplan Jaringan Jalan KPBPB 2025-2029',
            kodeMa: 'MA-003.02.P3S',
            paguDipa: 54.0,
            sisaPagu: 6.5,
            terserap: 47.5,
            persenSerapan: 88.0,
            progresPaketFisik: 95.0,
            progresKeuangan: 88.0,
            status: 'On-Track',
          },
          {
            kegiatanOutput: 'DED & Amdal Zona Aerotropolis Hang Nadim',
            kodeMa: 'MA-004.03.P3S',
            paguDipa: 46.0,
            sisaPagu: 21.0,
            terserap: 25.0,
            persenSerapan: 54.3,
            progresPaketFisik: 58.0,
            progresKeuangan: 54.3,
            status: 'Perlu Perhatian',
          },
          {
            kegiatanOutput: 'Monev Renstra & Tata Ruang Peruntukan Kawasan',
            kodeMa: 'MA-005.01.P3S',
            paguDipa: 35.0,
            sisaPagu: 7.1,
            terserap: 27.9,
            persenSerapan: 79.7,
            progresPaketFisik: 84.0,
            progresKeuangan: 79.7,
            status: 'On-Track',
          },
        ],
      },
      '2026-Triwulan IV': {
        totalPaguDipa: 215.5,
        totalTerserap: 204.8,
        persenSerapanKeseluruhan: 95.0,
        records: [
          {
            kegiatanOutput: 'Penyusunan Rencana Induk Drainase & Retensi',
            kodeMa: 'MA-001.01.P3S',
            paguDipa: 42.5,
            sisaPagu: 1.5,
            terserap: 41.0,
            persenSerapan: 96.5,
            progresPaketFisik: 100.0,
            progresKeuangan: 96.5,
            status: 'Selesai Ditetapkan',
          },
          {
            kegiatanOutput: 'Kajian Multi-Utility Tunnel Koridor Arteri',
            kodeMa: 'MA-002.04.P3S',
            paguDipa: 38.0,
            sisaPagu: 1.2,
            terserap: 36.8,
            persenSerapan: 96.8,
            progresPaketFisik: 100.0,
            progresKeuangan: 96.8,
            status: 'Selesai Ditetapkan',
          },
          {
            kegiatanOutput: 'Masterplan Jaringan Jalan KPBPB 2025-2029',
            kodeMa: 'MA-003.02.P3S',
            paguDipa: 54.0,
            sisaPagu: 1.8,
            terserap: 52.2,
            persenSerapan: 96.7,
            progresPaketFisik: 100.0,
            progresKeuangan: 96.7,
            status: 'Selesai Ditetapkan',
          },
          {
            kegiatanOutput: 'DED & Amdal Zona Aerotropolis Hang Nadim',
            kodeMa: 'MA-004.03.P3S',
            paguDipa: 46.0,
            sisaPagu: 4.6,
            terserap: 41.4,
            persenSerapan: 90.0,
            progresPaketFisik: 92.0,
            progresKeuangan: 90.0,
            status: 'Selesai Berkas',
          },
          {
            kegiatanOutput: 'Monev Renstra & Tata Ruang Peruntukan Kawasan',
            kodeMa: 'MA-005.01.P3S',
            paguDipa: 35.0,
            sisaPagu: 1.6,
            terserap: 33.4,
            persenSerapan: 95.4,
            progresPaketFisik: 100.0,
            progresKeuangan: 95.4,
            status: 'Selesai Ditetapkan',
          },
        ],
      },
      '2025-Semua Triwulan': {
        totalPaguDipa: 198.0,
        totalTerserap: 184.5,
        persenSerapanKeseluruhan: 93.2,
        records: [
          {
            kegiatanOutput: 'Penyusunan Rencana Induk Drainase & Retensi',
            kodeMa: 'MA-001.01.P3S',
            paguDipa: 40.0,
            sisaPagu: 2.2,
            terserap: 37.8,
            persenSerapan: 94.5,
            progresPaketFisik: 98.0,
            progresKeuangan: 94.5,
            status: 'Selesai',
          },
          {
            kegiatanOutput: 'Kajian Multi-Utility Tunnel Koridor Arteri',
            kodeMa: 'MA-002.04.P3S',
            paguDipa: 35.0,
            sisaPagu: 2.1,
            terserap: 32.9,
            persenSerapan: 94.0,
            progresPaketFisik: 96.0,
            progresKeuangan: 94.0,
            status: 'Selesai',
          },
          {
            kegiatanOutput: 'Masterplan Jaringan Jalan KPBPB 2025-2029',
            kodeMa: 'MA-003.02.P3S',
            paguDipa: 48.0,
            sisaPagu: 2.4,
            terserap: 45.6,
            persenSerapan: 95.0,
            progresPaketFisik: 99.0,
            progresKeuangan: 95.0,
            status: 'Selesai',
          },
          {
            kegiatanOutput: 'DED & Amdal Zona Aerotropolis Hang Nadim',
            kodeMa: 'MA-004.03.P3S',
            paguDipa: 43.0,
            sisaPagu: 4.8,
            terserap: 38.2,
            persenSerapan: 88.8,
            progresPaketFisik: 90.0,
            progresKeuangan: 88.8,
            status: 'Selesai',
          },
          {
            kegiatanOutput: 'Monev Renstra & Tata Ruang Peruntukan Kawasan',
            kodeMa: 'MA-005.01.P3S',
            paguDipa: 32.0,
            sisaPagu: 2.0,
            terserap: 30.0,
            persenSerapan: 93.8,
            progresPaketFisik: 96.0,
            progresKeuangan: 93.8,
            status: 'Selesai',
          },
        ],
      },
    },
  },

  // ==========================================================================
  // BARIS 2 - KARTU 4: TARGET INDIKATOR RENSTRA PER TAHUN (LINE CHART MULTI-SERI)
  // Dataset: Rekapitulasi Rencana Strategis BP Batam (Terbuka, per 5 tahun)
  // Sumbu X: Tahun 2025-2029 (5 tahun periode Renstra)
  // ==========================================================================
  targetIndikatorRenstra: {
    datasetName: 'Rekapitulasi Rencana Strategis BP Batam',
    accessLabel: 'Terbuka',
    periode: '2025-2029 (5 Tahun)',
    filterSasaranList: [
      'Semua Sasaran',
      'Peningkatan Investasi & Daya Saing Industri',
      'Akselerasi Infrastruktur & Konektivitas Wilayah',
      'Tata Kelola Pemerintahan & Layanan Publik',
    ],
    tahunList: ['2025', '2026', '2027', '2028', '2029'],
    records: [
      {
        id: 'renstra-1',
        sasaranStrategis: 'Peningkatan Investasi & Daya Saing Industri',
        program: 'Pengembangan Kawasan Industri & Investasi',
        indikatorKinerja: 'Tingkat Keselarasan Dokumen Perencanaan & RTRW',
        satuan: '%',
        targetPerTahun: {
          '2025': 88.0,
          '2026': 91.5,
          '2027': 94.0,
          '2028': 96.5,
          '2029': 98.0,
        },
        color: '#2563eb', // Biru utama
      },
      {
        id: 'renstra-2',
        sasaranStrategis: 'Akselerasi Infrastruktur & Konektivitas Wilayah',
        program: 'Pembangunan Infrastruktur & Konektivitas',
        indikatorKinerja: 'Persentase Rekomendasi Masterplan Tereksekusi Fisik',
        satuan: '%',
        targetPerTahun: {
          '2025': 82.0,
          '2026': 86.0,
          '2027': 89.5,
          '2028': 93.0,
          '2029': 96.0,
        },
        color: '#10b981', // Emerald positif
      },
      {
        id: 'renstra-3',
        sasaranStrategis: 'Akselerasi Infrastruktur & Konektivitas Wilayah',
        program: 'Modernisasi Hub Logistik',
        indikatorKinerja: 'Indeks Kualitas & Ketepatan Waktu Studi Kelayakan (FS)',
        satuan: 'Skor 1-100',
        targetPerTahun: {
          '2025': 84.5,
          '2026': 88.0,
          '2027': 91.0,
          '2028': 93.5,
          '2029': 95.0,
        },
        color: '#0284c7', // Sky blue
      },
      {
        id: 'renstra-4',
        sasaranStrategis: 'Tata Kelola Pemerintahan & Layanan Publik',
        program: 'Penyelenggaraan Tata Kelola & Riset TI',
        indikatorKinerja: 'Capaian Integrasi Satu Data Perencanaan Program',
        satuan: '%',
        targetPerTahun: {
          '2025': 78.0,
          '2026': 85.0,
          '2027': 90.0,
          '2028': 95.0,
          '2029': 99.0,
        },
        color: '#6366f1', // Indigo
      },
      {
        id: 'renstra-5',
        sasaranStrategis: 'Peningkatan Investasi & Daya Saing Industri',
        program: 'Pengembangan Kawasan Industri & Investasi',
        indikatorKinerja: 'Kecepatan Penerbitan Rekomendasi Peruntukan Lahan',
        satuan: 'Hari Kerja (Maks)',
        targetPerTahun: {
          '2025': 14.0,
          '2026': 12.0,
          '2027': 10.0,
          '2028': 8.0,
          '2029': 7.0,
        },
        color: '#64748b', // Slate abu-abu
      },
    ],
  },

  // ==========================================================================
  // BARIS 3 - KARTU 5: PENYELESAIAN REKOMENDASI PERUBAHAN PERUNTUKAN LAHAN
  // Dataset: Rekapitulasi Rekomendasi Perubahan Peruntukan Lahan (Terbuka, jika update)
  // Jenis: Clustered Column (Sumbu X: Tahun. Dua batang: Jumlah Permohonan & Selesai)
  // ==========================================================================
  penyelesaianPeruntukanLahan: {
    datasetName: 'Rekapitulasi Rekomendasi Perubahan Peruntukan Lahan',
    accessLabel: 'Terbuka',
    totalPermohonan: 1303,
    totalSelesai: 1248,
    persenSelesaiRerata: 95.8,
    records: [
      {
        tahun: '2021',
        jumlahPermohonan: 178,
        selesai: 168,
        persenSelesai: 94.4,
        keterangan: 'Normalisasi zona resapan dan fasilitas umum',
      },
      {
        tahun: '2022',
        jumlahPermohonan: 215,
        selesai: 204,
        persenSelesai: 94.9,
        keterangan: 'Perubahan parsial zona komersial Batu Ampar',
      },
      {
        tahun: '2023',
        jumlahPermohonan: 242,
        selesai: 232,
        persenSelesai: 95.9,
        keterangan: 'Penyesuaian peruntukan KEK Nongsa Digital Park',
      },
      {
        tahun: '2024',
        jumlahPermohonan: 256,
        selesai: 248,
        persenSelesai: 96.9,
        keterangan: 'Relokasi pergudangan & logistik Kabil',
      },
      {
        tahun: '2025',
        jumlahPermohonan: 228,
        selesai: 221,
        persenSelesai: 96.9,
        keterangan: 'Harmonisasi RDTR Kawasan Sekupang & Batam Center',
      },
      {
        tahun: '2026',
        jumlahPermohonan: 184,
        selesai: 175,
        persenSelesai: 95.1,
        keterangan: 'Tahun berjalan per Triwulan III 2026',
      },
    ],
  },

  // ==========================================================================
  // BARIS 3 - KARTU 6: PANJANG JALAN RENCANA PER KLASIFIKASI (STACKED BAR HORIZONTAL)
  // Dataset: Masterplan Jalan (Terbuka, jika update)
  // Sumbu Y: Klasifikasi Jalan. Segmen: Wilayah. Sumbu X: Panjang (Km)
  // ==========================================================================
  panjangJalanRencana: {
    datasetName: 'Masterplan Jalan',
    accessLabel: 'Terbuka',
    filterTahunList: ['Semua Rencana', '2026', '2025'],
    wilayahList: [
      { key: 'batamCenter', label: 'Batam Center', color: '#2563eb' },
      { key: 'nongsa', label: 'Nongsa', color: '#0284c7' },
      { key: 'batuAmpar', label: 'Batu Ampar', color: '#38bdf8' },
      { key: 'sekupang', label: 'Sekupang', color: '#10b981' },
      { key: 'batuAjiSagulung', label: 'Batu Aji / Sagulung', color: '#6366f1' },
      { key: 'kabil', label: 'Kabil', color: '#64748b' },
    ],
    byFilter: {
      'Semua Rencana': {
        totalPanjangKm: 215.8,
        records: [
          {
            klasifikasiJalan: 'Arteri Primer',
            batamCenter: 24.5,
            nongsa: 22.0,
            batuAmpar: 18.5,
            sekupang: 12.0,
            batuAjiSagulung: 14.8,
            kabil: 9.2,
            totalKm: 101.0,
            subWilayah: 'SWP I Batam Center & SWP IV Nongsa',
            lebarRowMeter: '40 - 70 Meter (5-6 Lajur)',
          },
          {
            klasifikasiJalan: 'Arteri Sekunder',
            batamCenter: 14.0,
            nongsa: 10.5,
            batuAmpar: 8.0,
            sekupang: 8.5,
            batuAjiSagulung: 9.4,
            kabil: 5.6,
            totalKm: 56.0,
            subWilayah: 'SWP II Batu Ampar & SWP III Sekupang',
            lebarRowMeter: '30 - 40 Meter (4 Lajur)',
          },
          {
            klasifikasiJalan: 'Kolektor Primer',
            batamCenter: 7.5,
            nongsa: 6.2,
            batuAmpar: 5.0,
            sekupang: 5.8,
            batuAjiSagulung: 6.1,
            kabil: 4.4,
            totalKm: 35.0,
            subWilayah: 'Konektor Kawasan Industri Kabil & Muka Kuning',
            lebarRowMeter: '25 - 30 Meter (2-4 Lajur)',
          },
          {
            klasifikasiJalan: 'Kolektor Sekunder',
            batamCenter: 3.5,
            nongsa: 2.8,
            batuAmpar: 2.2,
            sekupang: 2.9,
            batuAjiSagulung: 3.1,
            kabil: 1.5,
            totalKm: 16.0,
            subWilayah: 'Akses Perkantoran & Sentra Niaga',
            lebarRowMeter: '18 - 22 Meter (2 Lajur)',
          },
          {
            klasifikasiJalan: 'Jalan Lokal Strategis',
            batamCenter: 1.8,
            nongsa: 1.6,
            batuAmpar: 1.2,
            sekupang: 1.3,
            batuAjiSagulung: 1.2,
            kabil: 0.7,
            totalKm: 7.8,
            subWilayah: 'Akses Dermaga & Kolam Retensi Drainase',
            lebarRowMeter: '12 - 16 Meter',
          },
        ],
      },
      '2026': {
        totalPanjangKm: 94.9,
        records: [
          {
            klasifikasiJalan: 'Arteri Primer',
            batamCenter: 12.5,
            nongsa: 11.0,
            batuAmpar: 9.5,
            sekupang: 6.0,
            batuAjiSagulung: 6.5,
            kabil: 4.0,
            totalKm: 49.5,
            subWilayah: 'SWP I Batam Center & SWP IV Nongsa',
            lebarRowMeter: '40 - 70 Meter',
          },
          {
            klasifikasiJalan: 'Arteri Sekunder',
            batamCenter: 6.5,
            nongsa: 5.0,
            batuAmpar: 3.8,
            sekupang: 4.0,
            batuAjiSagulung: 4.2,
            kabil: 2.5,
            totalKm: 26.0,
            subWilayah: 'SWP II Batu Ampar',
            lebarRowMeter: '30 - 40 Meter',
          },
          {
            klasifikasiJalan: 'Kolektor Primer',
            batamCenter: 3.0,
            nongsa: 2.5,
            batuAmpar: 2.0,
            sekupang: 2.2,
            batuAjiSagulung: 2.3,
            kabil: 1.8,
            totalKm: 13.8,
            subWilayah: 'Konektor Logistik',
            lebarRowMeter: '25 - 30 Meter',
          },
          {
            klasifikasiJalan: 'Kolektor Sekunder',
            batamCenter: 1.2,
            nongsa: 0.9,
            batuAmpar: 0.8,
            sekupang: 0.9,
            batuAjiSagulung: 1.0,
            kabil: 0.8,
            totalKm: 5.6,
            subWilayah: 'Akses Niaga',
            lebarRowMeter: '18 - 22 Meter',
          },
        ],
      },
      '2025': {
        totalPanjangKm: 120.9,
        records: [
          {
            klasifikasiJalan: 'Arteri Primer',
            batamCenter: 12.0,
            nongsa: 11.0,
            batuAmpar: 9.0,
            sekupang: 6.0,
            batuAjiSagulung: 8.3,
            kabil: 5.2,
            totalKm: 51.5,
            subWilayah: 'SWP I & IV',
            lebarRowMeter: '40 - 70 Meter',
          },
          {
            klasifikasiJalan: 'Arteri Sekunder',
            batamCenter: 7.5,
            nongsa: 5.5,
            batuAmpar: 4.2,
            sekupang: 4.5,
            batuAjiSagulung: 5.2,
            kabil: 3.1,
            totalKm: 30.0,
            subWilayah: 'SWP II & III',
            lebarRowMeter: '30 - 40 Meter',
          },
          {
            klasifikasiJalan: 'Kolektor Primer',
            batamCenter: 4.5,
            nongsa: 3.7,
            batuAmpar: 3.0,
            sekupang: 3.6,
            batuAjiSagulung: 3.8,
            kabil: 2.6,
            totalKm: 21.2,
            subWilayah: 'Konektor Industri',
            lebarRowMeter: '25 - 30 Meter',
          },
          {
            klasifikasiJalan: 'Kolektor Sekunder',
            batamCenter: 2.3,
            nongsa: 1.9,
            batuAmpar: 1.4,
            sekupang: 2.0,
            batuAjiSagulung: 2.1,
            kabil: 0.7,
            totalKm: 10.4,
            subWilayah: 'Akses Perkantoran',
            lebarRowMeter: '18 - 22 Meter',
          },
          {
            klasifikasiJalan: 'Jalan Lokal Strategis',
            batamCenter: 1.8,
            nongsa: 1.6,
            batuAmpar: 1.2,
            sekupang: 1.3,
            batuAjiSagulung: 1.2,
            kabil: 0.7,
            totalKm: 7.8,
            subWilayah: 'Dermaga & Drainase',
            lebarRowMeter: '12 - 16 Meter',
          },
        ],
      },
    },
  },
};
