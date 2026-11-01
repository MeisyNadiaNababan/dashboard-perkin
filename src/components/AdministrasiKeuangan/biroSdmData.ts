// ============================================================================
// DATASET MASTER BIRO SUMBER DAYA MANUSIA (SDM) BP BATAM
// Seluruh data disimpan dalam satu objek JSON terpadu agar mudah diganti data riil
// ============================================================================

export interface SdmStatusBulanItem {
  bulan: string;
  pns: number;
  p2k: number;
  pppk: number;
  ptt: number;
  profesional: number;
  total: number;
}

export interface SdmGenderItem {
  name: string;
  total: number;
  persen: number;
  color: string;
}

export interface SdmPendidikanItem {
  tingkat: string;
  short: string;
  total: number;
  persen: number;
  color: string;
}

export interface SdmGenderPendidikan {
  gender: SdmGenderItem[];
  pendidikan: SdmPendidikanItem[];
  totalPegawai: number;
  persenPerempuan: number;
}

export interface SdmGajiUnitRecord {
  unit: string;
  namaLengkap: string;
  gajiPokokJuta: number;        // Juta Rupiah
  tunjanganKinerjaJuta: number; // Juta Rupiah
  tunjanganLainJuta: number;    // Juta Rupiah
  totalGajiJuta: number;        // Juta Rupiah
  jumlahPegawai: number;
  rerataGajiPerPegawaiJuta: number; // dihitung
}

export interface SdmAsuransiRecord {
  jenisAsuransi: string;
  singkat: string;
  pembayaranPegawaiJuta: number;  // Juta Rupiah
  pembayaranInstansiJuta: number; // Juta Rupiah
  totalPembayaranJuta: number;
  porsiInstansiPersen: number;
}

export interface SdmKompetensiYearItem {
  tahun: string;
  pesertaDiklat: number;
  pesertaUdpi: number;
  totalPeserta: number;
  totalPegawai: number;
  persentase: number; // %
}

export interface SdmSistemMeritYearItem {
  tahun: string;
  nilai: number;
  target: number;
  kategori: string;
}

export interface BiroSdmMasterData {
  metadata: {
    unit: string;
    induk: string;
    pemutakhiranTerakhir: string;
    temaVisual: string;
  };
  statusKepegawaianBulanan: {
    datasetName: string;
    accessLabel: 'Terbuka';
    records: SdmStatusBulanItem[];
  };
  profilPegawai: {
    datasetName: string;
    accessLabel: 'Terbuka';
    data: SdmGenderPendidikan;
  };
  gajiPerUnitKerja: {
    datasetName: string;
    accessLabel: 'Terbatas';
    filterTahunList: string[];
    filterBulanList: string[];
    filterStatusList: string[];
    recordsByFilter: Record<string, SdmGajiUnitRecord[]>;
  };
  asuransiPegawai: {
    datasetName: string;
    accessLabel: 'Terbatas';
    filterStatusList: string[];
    filterBulanList: string[];
    recordsByFilter: Record<string, SdmAsuransiRecord[]>;
  };
  pengembanganKompetensi: {
    datasetName: string;
    accessLabel: 'Terbatas';
    records: SdmKompetensiYearItem[];
    targetPersen: number;
  };
  indeksSistemMerit: {
    datasetName: string;
    accessLabel: 'Terbatas';
    records: SdmSistemMeritYearItem[];
    targetNasional: number;
  };
}

export const BIRO_SDM_MASTER_DATA: BiroSdmMasterData = {
  metadata: {
    unit: 'Biro Sumber Daya Manusia BP Batam',
    induk: 'Deputi Bidang Administrasi dan Keuangan (DEP-A1)',
    pemutakhiranTerakhir: 'Oktober 2026',
    temaVisual: 'Clean Blue & White Theme (2-Column Grid, 3 Rows, 6 Cards)',
  },

  // BARIS 1 - KARTU 1: JUMLAH PEGAWAI PER STATUS KEPEGAWAIAN (STACKED COLUMN)
  statusKepegawaianBulanan: {
    datasetName: 'Jumlah Pegawai Berdasarkan Status Kepegawaian (Terbuka, perbulan)',
    accessLabel: 'Terbuka',
    records: [
      { bulan: 'Jan', pns: 1048, p2k: 860, pppk: 480, ptt: 405, profesional: 178, total: 2971 },
      { bulan: 'Feb', pns: 1047, p2k: 862, pppk: 480, ptt: 403, profesional: 178, total: 2970 },
      { bulan: 'Mar', pns: 1046, p2k: 864, pppk: 482, ptt: 401, profesional: 179, total: 2972 },
      { bulan: 'Apr', pns: 1045, p2k: 865, pppk: 482, ptt: 400, profesional: 180, total: 2972 },
      { bulan: 'Mei', pns: 1045, p2k: 867, pppk: 485, ptt: 398, profesional: 180, total: 2975 },
      { bulan: 'Jun', pns: 1044, p2k: 868, pppk: 485, ptt: 398, profesional: 181, total: 2976 },
      { bulan: 'Jul', pns: 1043, p2k: 870, pppk: 485, ptt: 397, profesional: 181, total: 2976 },
      { bulan: 'Agu', pns: 1043, p2k: 870, pppk: 485, ptt: 396, profesional: 182, total: 2976 },
      { bulan: 'Sep', pns: 1042, p2k: 871, pppk: 485, ptt: 396, profesional: 182, total: 2976 },
      { bulan: 'Okt', pns: 1042, p2k: 872, pppk: 485, ptt: 396, profesional: 183, total: 2978 },
    ],
  },

  // BARIS 1 - KARTU 2: PROFIL PEGAWAI (DONUT JENIS KELAMIN + BAR TINGKAT PENDIDIKAN)
  profilPegawai: {
    datasetName: 'Jumlah Pegawai Berdasarkan Jenis Kelamin dan Berdasarkan Pendidikan (Terbuka, perbulan)',
    accessLabel: 'Terbuka',
    data: {
      totalPegawai: 2978,
      persenPerempuan: 39.7,
      gender: [
        { name: 'Laki-laki', total: 1796, persen: 60.3, color: '#2563eb' },
        { name: 'Perempuan', total: 1182, persen: 39.7, color: '#0ea5e9' },
      ],
      pendidikan: [
        { tingkat: 'S3 (Doktor)', short: 'S3', total: 24, persen: 0.8, color: '#1e3a8a' },
        { tingkat: 'S2 (Magister)', short: 'S2', total: 312, persen: 10.5, color: '#1e40af' },
        { tingkat: 'S1 / D4', short: 'S1/D4', total: 1584, persen: 53.2, color: '#2563eb' },
        { tingkat: 'D3 (Diploma)', short: 'D3', total: 428, persen: 14.4, color: '#3b82f6' },
        { tingkat: 'SMA / SMK', short: 'SMA', total: 562, persen: 18.9, color: '#60a5fa' },
        { tingkat: 'SMP / SD', short: 'Dasar', total: 68, persen: 2.3, color: '#94a3b8' },
      ],
    },
  },

  // BARIS 2 - KARTU 3: GAJI PER UNIT KERJA (BAR HORIZONTAL, DIURUTKAN TERBESAR)
  gajiPerUnitKerja: {
    datasetName: 'Rekapitulasi Gaji per Unit Kerja BP Batam (Terbatas, perbulan)',
    accessLabel: 'Terbatas',
    filterTahunList: ['2026', '2025'],
    filterBulanList: ['Oktober', 'September', 'Agustus'],
    filterStatusList: ['Semua Status', 'PNS', 'P2K Tetap', 'PPPK', 'PTT'],
    recordsByFilter: {
      '2026-Oktober-Semua Status': [
        {
          unit: 'BU Pelabuhan',
          namaLengkap: 'Badan Usaha Pelabuhan (BUP)',
          gajiPokokJuta: 3250.0,
          tunjanganKinerjaJuta: 3820.0,
          tunjanganLainJuta: 850.0,
          totalGajiJuta: 7920.0,
          jumlahPegawai: 582,
          rerataGajiPerPegawaiJuta: 13.6,
        },
        {
          unit: 'BU Bandara',
          namaLengkap: 'BU Bandar Udara Hang Nadim',
          gajiPokokJuta: 2450.0,
          tunjanganKinerjaJuta: 2850.0,
          tunjanganLainJuta: 620.0,
          totalGajiJuta: 5920.0,
          jumlahPegawai: 445,
          rerataGajiPerPegawaiJuta: 13.3,
        },
        {
          unit: 'RSBP Batam',
          namaLengkap: 'Badan Usaha Rumah Sakit BP Batam',
          gajiPokokJuta: 2180.0,
          tunjanganKinerjaJuta: 2540.0,
          tunjanganLainJuta: 890.0,
          totalGajiJuta: 5610.0,
          jumlahPegawai: 512,
          rerataGajiPerPegawaiJuta: 10.9,
        },
        {
          unit: 'Pengelolaan Lahan',
          namaLengkap: 'Dit. Pengelolaan Pertanahan & Lahan',
          gajiPokokJuta: 1620.0,
          tunjanganKinerjaJuta: 1950.0,
          tunjanganLainJuta: 410.0,
          totalGajiJuta: 3980.0,
          jumlahPegawai: 275,
          rerataGajiPerPegawaiJuta: 14.5,
        },
        {
          unit: 'Dit. Infrastruktur',
          namaLengkap: 'Dit. Pembangunan Infrastruktur',
          gajiPokokJuta: 1480.0,
          tunjanganKinerjaJuta: 1760.0,
          tunjanganLainJuta: 380.0,
          totalGajiJuta: 3620.0,
          jumlahPegawai: 260,
          rerataGajiPerPegawaiJuta: 13.9,
        },
        {
          unit: 'Biro Umum & Sekr',
          namaLengkap: 'Biro Umum & Sekretariat Kantor Pusat',
          gajiPokokJuta: 1250.0,
          tunjanganKinerjaJuta: 1480.0,
          tunjanganLainJuta: 310.0,
          totalGajiJuta: 3040.0,
          jumlahPegawai: 242,
          rerataGajiPerPegawaiJuta: 12.6,
        },
        {
          unit: 'BU SPAM',
          namaLengkap: 'Badan Usaha SPAM & Fasling',
          gajiPokokJuta: 1120.0,
          tunjanganKinerjaJuta: 1340.0,
          tunjanganLainJuta: 290.0,
          totalGajiJuta: 2750.0,
          jumlahPegawai: 210,
          rerataGajiPerPegawaiJuta: 13.1,
        },
        {
          unit: 'PDSI',
          namaLengkap: 'Pusat Data dan Sistem Informasi',
          gajiPokokJuta: 640.0,
          tunjanganKinerjaJuta: 790.0,
          tunjanganLainJuta: 180.0,
          totalGajiJuta: 1610.0,
          jumlahPegawai: 118,
          rerataGajiPerPegawaiJuta: 13.6,
        },
        {
          unit: 'Balai Diklat',
          namaLengkap: 'Pusat Pengembangan SDM & Diklat',
          gajiPokokJuta: 480.0,
          tunjanganKinerjaJuta: 560.0,
          tunjanganLainJuta: 120.0,
          totalGajiJuta: 1160.0,
          jumlahPegawai: 94,
          rerataGajiPerPegawaiJuta: 12.3,
        },
      ],
      '2026-September-Semua Status': [
        {
          unit: 'BU Pelabuhan',
          namaLengkap: 'Badan Usaha Pelabuhan (BUP)',
          gajiPokokJuta: 3240.0,
          tunjanganKinerjaJuta: 3810.0,
          tunjanganLainJuta: 840.0,
          totalGajiJuta: 7890.0,
          jumlahPegawai: 581,
          rerataGajiPerPegawaiJuta: 13.6,
        },
        {
          unit: 'BU Bandara',
          namaLengkap: 'BU Bandar Udara Hang Nadim',
          gajiPokokJuta: 2440.0,
          tunjanganKinerjaJuta: 2840.0,
          tunjanganLainJuta: 610.0,
          totalGajiJuta: 5890.0,
          jumlahPegawai: 444,
          rerataGajiPerPegawaiJuta: 13.3,
        },
        {
          unit: 'RSBP Batam',
          namaLengkap: 'Badan Usaha Rumah Sakit BP Batam',
          gajiPokokJuta: 2170.0,
          tunjanganKinerjaJuta: 2530.0,
          tunjanganLainJuta: 880.0,
          totalGajiJuta: 5580.0,
          jumlahPegawai: 512,
          rerataGajiPerPegawaiJuta: 10.9,
        },
        {
          unit: 'Pengelolaan Lahan',
          namaLengkap: 'Dit. Pengelolaan Pertanahan & Lahan',
          gajiPokokJuta: 1610.0,
          tunjanganKinerjaJuta: 1940.0,
          tunjanganLainJuta: 400.0,
          totalGajiJuta: 3950.0,
          jumlahPegawai: 275,
          rerataGajiPerPegawaiJuta: 14.4,
        },
        {
          unit: 'Dit. Infrastruktur',
          namaLengkap: 'Dit. Pembangunan Infrastruktur',
          gajiPokokJuta: 1470.0,
          tunjanganKinerjaJuta: 1750.0,
          tunjanganLainJuta: 370.0,
          totalGajiJuta: 3590.0,
          jumlahPegawai: 260,
          rerataGajiPerPegawaiJuta: 13.8,
        },
        {
          unit: 'Biro Umum & Sekr',
          namaLengkap: 'Biro Umum & Sekretariat Kantor Pusat',
          gajiPokokJuta: 1240.0,
          tunjanganKinerjaJuta: 1470.0,
          tunjanganLainJuta: 300.0,
          totalGajiJuta: 3010.0,
          jumlahPegawai: 242,
          rerataGajiPerPegawaiJuta: 12.4,
        },
        {
          unit: 'BU SPAM',
          namaLengkap: 'Badan Usaha SPAM & Fasling',
          gajiPokokJuta: 1110.0,
          tunjanganKinerjaJuta: 1330.0,
          tunjanganLainJuta: 280.0,
          totalGajiJuta: 2720.0,
          jumlahPegawai: 210,
          rerataGajiPerPegawaiJuta: 13.0,
        },
        {
          unit: 'PDSI',
          namaLengkap: 'Pusat Data dan Sistem Informasi',
          gajiPokokJuta: 630.0,
          tunjanganKinerjaJuta: 780.0,
          tunjanganLainJuta: 170.0,
          totalGajiJuta: 1580.0,
          jumlahPegawai: 118,
          rerataGajiPerPegawaiJuta: 13.4,
        },
        {
          unit: 'Balai Diklat',
          namaLengkap: 'Pusat Pengembangan SDM & Diklat',
          gajiPokokJuta: 470.0,
          tunjanganKinerjaJuta: 550.0,
          tunjanganLainJuta: 110.0,
          totalGajiJuta: 1130.0,
          jumlahPegawai: 94,
          rerataGajiPerPegawaiJuta: 12.0,
        },
      ],
      '2026-Oktober-PNS': [
        {
          unit: 'BU Pelabuhan',
          namaLengkap: 'Badan Usaha Pelabuhan (BUP)',
          gajiPokokJuta: 1540.0,
          tunjanganKinerjaJuta: 2180.0,
          tunjanganLainJuta: 420.0,
          totalGajiJuta: 4140.0,
          jumlahPegawai: 210,
          rerataGajiPerPegawaiJuta: 19.7,
        },
        {
          unit: 'Pengelolaan Lahan',
          namaLengkap: 'Dit. Pengelolaan Pertanahan & Lahan',
          gajiPokokJuta: 1120.0,
          tunjanganKinerjaJuta: 1480.0,
          tunjanganLainJuta: 290.0,
          totalGajiJuta: 2890.0,
          jumlahPegawai: 150,
          rerataGajiPerPegawaiJuta: 19.3,
        },
        {
          unit: 'BU Bandara',
          namaLengkap: 'BU Bandar Udara Hang Nadim',
          gajiPokokJuta: 1080.0,
          tunjanganKinerjaJuta: 1420.0,
          tunjanganLainJuta: 270.0,
          totalGajiJuta: 2770.0,
          jumlahPegawai: 145,
          rerataGajiPerPegawaiJuta: 19.1,
        },
        {
          unit: 'Dit. Infrastruktur',
          namaLengkap: 'Dit. Pembangunan Infrastruktur',
          gajiPokokJuta: 980.0,
          tunjanganKinerjaJuta: 1290.0,
          tunjanganLainJuta: 250.0,
          totalGajiJuta: 2520.0,
          jumlahPegawai: 130,
          rerataGajiPerPegawaiJuta: 19.4,
        },
        {
          unit: 'RSBP Batam',
          namaLengkap: 'Badan Usaha Rumah Sakit BP Batam',
          gajiPokokJuta: 920.0,
          tunjanganKinerjaJuta: 1210.0,
          tunjanganLainJuta: 380.0,
          totalGajiJuta: 2510.0,
          jumlahPegawai: 135,
          rerataGajiPerPegawaiJuta: 18.6,
        },
        {
          unit: 'Biro Umum & Sekr',
          namaLengkap: 'Biro Umum & Sekretariat Kantor Pusat',
          gajiPokokJuta: 850.0,
          tunjanganKinerjaJuta: 1120.0,
          tunjanganLainJuta: 210.0,
          totalGajiJuta: 2180.0,
          jumlahPegawai: 115,
          rerataGajiPerPegawaiJuta: 19.0,
        },
        {
          unit: 'BU SPAM',
          namaLengkap: 'Badan Usaha SPAM & Fasling',
          gajiPokokJuta: 540.0,
          tunjanganKinerjaJuta: 710.0,
          tunjanganLainJuta: 140.0,
          totalGajiJuta: 1390.0,
          jumlahPegawai: 72,
          rerataGajiPerPegawaiJuta: 19.3,
        },
        {
          unit: 'PDSI',
          namaLengkap: 'Pusat Data dan Sistem Informasi',
          gajiPokokJuta: 380.0,
          tunjanganKinerjaJuta: 510.0,
          tunjanganLainJuta: 98.0,
          totalGajiJuta: 988.0,
          jumlahPegawai: 52,
          rerataGajiPerPegawaiJuta: 19.0,
        },
        {
          unit: 'Balai Diklat',
          namaLengkap: 'Pusat Pengembangan SDM & Diklat',
          gajiPokokJuta: 240.0,
          tunjanganKinerjaJuta: 320.0,
          tunjanganLainJuta: 62.0,
          totalGajiJuta: 622.0,
          jumlahPegawai: 33,
          rerataGajiPerPegawaiJuta: 18.8,
        },
      ],
    },
  },

  // BARIS 2 - KARTU 4: PEMBAYARAN ASURANSI PEGAWAI VS INSTANSI (CLUSTERED BAR HORIZONTAL)
  asuransiPegawai: {
    datasetName: 'Nilai Asuransi Pegawai BP Batam (Terbatas, perbulan)',
    accessLabel: 'Terbatas',
    filterStatusList: ['Semua Status', 'PNS', 'P2K Tetap', 'PPPK', 'PTT'],
    filterBulanList: ['Oktober 2026', 'September 2026', 'Agustus 2026'],
    recordsByFilter: {
      'Semua Status-Oktober 2026': [
        {
          jenisAsuransi: 'BPJS Kesehatan',
          singkat: 'BPJS Kes',
          pembayaranPegawaiJuta: 184.2,
          pembayaranInstansiJuta: 736.8,
          totalPembayaranJuta: 921.0,
          porsiInstansiPersen: 80.0,
        },
        {
          jenisAsuransi: 'Jaminan Hari Tua (JHT)',
          singkat: 'BPJS TK - JHT',
          pembayaranPegawaiJuta: 245.5,
          pembayaranInstansiJuta: 454.5,
          totalPembayaranJuta: 700.0,
          porsiInstansiPersen: 64.9,
        },
        {
          jenisAsuransi: 'Jaminan Pensiun (JP)',
          singkat: 'BPJS TK - JP',
          pembayaranPegawaiJuta: 118.0,
          pembayaranInstansiJuta: 236.0,
          totalPembayaranJuta: 354.0,
          porsiInstansiPersen: 66.7,
        },
        {
          jenisAsuransi: 'JKK & JKM (Kerja & Kematian)',
          singkat: 'BPJS TK - JKK/JKM',
          pembayaranPegawaiJuta: 0.0,
          pembayaranInstansiJuta: 268.4,
          totalPembayaranJuta: 268.4,
          porsiInstansiPersen: 100.0,
        },
        {
          jenisAsuransi: 'Kesehatan Tambahan (RSBP)',
          singkat: 'RSBP Tambahan',
          pembayaranPegawaiJuta: 95.0,
          pembayaranInstansiJuta: 215.0,
          totalPembayaranJuta: 310.0,
          porsiInstansiPersen: 69.4,
        },
      ],
      'PNS-Oktober 2026': [
        {
          jenisAsuransi: 'BPJS Kesehatan',
          singkat: 'BPJS Kes',
          pembayaranPegawaiJuta: 92.0,
          pembayaranInstansiJuta: 368.0,
          totalPembayaranJuta: 460.0,
          porsiInstansiPersen: 80.0,
        },
        {
          jenisAsuransi: 'Jaminan Hari Tua (JHT)',
          singkat: 'Taspen - JHT',
          pembayaranPegawaiJuta: 128.0,
          pembayaranInstansiJuta: 238.0,
          totalPembayaranJuta: 366.0,
          porsiInstansiPersen: 65.0,
        },
        {
          jenisAsuransi: 'Jaminan Pensiun (JP)',
          singkat: 'Taspen - JP',
          pembayaranPegawaiJuta: 62.0,
          pembayaranInstansiJuta: 124.0,
          totalPembayaranJuta: 186.0,
          porsiInstansiPersen: 66.7,
        },
        {
          jenisAsuransi: 'JKK & JKM (Kerja & Kematian)',
          singkat: 'Taspen - JKK/JKM',
          pembayaranPegawaiJuta: 0.0,
          pembayaranInstansiJuta: 142.0,
          totalPembayaranJuta: 142.0,
          porsiInstansiPersen: 100.0,
        },
        {
          jenisAsuransi: 'Kesehatan Tambahan (RSBP)',
          singkat: 'RSBP Tambahan',
          pembayaranPegawaiJuta: 50.0,
          pembayaranInstansiJuta: 112.0,
          totalPembayaranJuta: 162.0,
          porsiInstansiPersen: 69.1,
        },
      ],
    },
  },

  // BARIS 3 - KARTU 5: PEGAWAI YANG MENGIKUTI PENGEMBANGAN KOMPETENSI (COMBO CHART)
  pengembanganKompetensi: {
    datasetName: 'Persentase Pegawai yang Mengikuti Program Pengembangan Kompetensi (Terbatas, perbulan)',
    accessLabel: 'Terbatas',
    targetPersen: 80.0,
    records: [
      { tahun: '2021', pesertaDiklat: 1420, pesertaUdpi: 180, totalPeserta: 1600, totalPegawai: 2650, persentase: 60.4 },
      { tahun: '2022', pesertaDiklat: 1680, pesertaUdpi: 210, totalPeserta: 1890, totalPegawai: 2740, persentase: 69.0 },
      { tahun: '2023', pesertaDiklat: 1940, pesertaUdpi: 240, totalPeserta: 2180, totalPegawai: 2820, persentase: 77.3 },
      { tahun: '2024', pesertaDiklat: 2210, pesertaUdpi: 270, totalPeserta: 2480, totalPegawai: 2890, persentase: 85.8 },
      { tahun: '2025', pesertaDiklat: 2380, pesertaUdpi: 290, totalPeserta: 2670, totalPegawai: 2940, persentase: 90.8 },
      { tahun: '2026', pesertaDiklat: 2350, pesertaUdpi: 288, totalPeserta: 2638, totalPegawai: 2978, persentase: 88.6 },
    ],
  },

  // BARIS 3 - KARTU 6: INDEKS SISTEM MERIT (LINE CHART DENGAN TARGET)
  indeksSistemMerit: {
    datasetName: 'Indeks Sistem Merit (Terbatas, perbulan)',
    accessLabel: 'Terbatas',
    targetNasional: 350.0,
    records: [
      { tahun: '2021', nilai: 288.5, target: 350.0, kategori: 'Baik' },
      { tahun: '2022', nilai: 310.0, target: 350.0, kategori: 'Baik' },
      { tahun: '2023', nilai: 332.5, target: 350.0, kategori: 'Baik' },
      { tahun: '2024', nilai: 348.0, target: 350.0, kategori: 'Sangat Baik' },
      { tahun: '2025', nilai: 356.5, target: 350.0, kategori: 'Sangat Baik' },
      { tahun: '2026', nilai: 362.5, target: 350.0, kategori: 'Sangat Baik (Predikat Tertinggi)' },
    ],
  },
};
