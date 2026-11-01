// ============================================================================
// DATASET DUMMY RESMI: BADAN PENGELOLAAN DAN PENGUSAHAAN KEPELABUHANAN
// PELABUHAN BATAM (BATU AMPAR, SEKUPANG, KABIL, TELAGA PUNGGUR, BATAM CENTRE, HARBOUR BAY)
// BADAN PENGUSAHAAN BATAM (BP BATAM) - DEPUTI BIDANG PENGELOLAAN BANDARA, PELABUHAN & PENGELOLAAN KAWASAN (DEP-A5)
// Seluruh dataset dummy terstruktur rapi dalam satu objek JSON terpadu
// ============================================================================

export interface JasaDermagaBulananItem {
  id: string;
  tahun: number;
  bulan: string; // 'Jan', 'Feb', dst.
  pelabuhan: string; // 'Semua Pelabuhan' | 'Batu Ampar' | 'Sekupang' | 'Kabil' | 'Telaga Punggur'
  tambatBarangTon: number;
  tambatPenumpangTon: number;
  dermagaKhususTersusTon: number;
  dermagaRakyatTon: number;
  totalVolumeTon: number;
  rentangTanggalRekap: string;
}

export interface KunjunganKapalBarangBulananItem {
  id: string;
  tahun: number;
  bulan: string;
  namaPelabuhan: string; // 'Semua Pelabuhan' | 'Batu Ampar' | 'Kabil' | 'Sekupang'
  callDalam: number; // Pelayaran Dalam Negeri
  callLuar: number; // Pelayaran Luar Negeri
  totalCall: number;
  gtDalam: number;
  gtLuar: number;
  totalGt: number;
  tonDalam: number;
  tonLuar: number;
  totalTon: number;
  tipeKapalTerbanyak: string;
}

export interface KunjunganKapalPenumpangItem {
  id: string;
  tahun: number;
  bulan: string; // 'Semua' | 'Jan' ... 'Des'
  pelabuhan: string;
  callDalam: number;
  callLuar: number;
  totalCall: number;
  gtDalam: number;
  gtLuar: number;
  totalGt: number;
  tipeKapal: string;
}

export interface PenumpangPelabuhanItem {
  id: string;
  tahun: number;
  namaTerminal: string;
  jenisPenumpang: 'Semua' | 'Domestik' | 'Internasional';
  kedatangan: number;
  keberangkatan: number;
  totalPenumpang: number;
  porsiDomestikPersen: number;
  porsiInternasionalPersen: number;
  kewarganegaraan: {
    wniPersen: number;
    wnaPersen: number;
  };
}

export interface BongkarMuatTerminalBatuAmparYearly {
  tahun: number;
  // Panel 1: Kargo Batu Ampar (Ton)
  bongkarCargoTon: number;
  bongkarMuatGeneralCargoTon: number;
  totalKargoTon: number;

  // Panel 2: Peti Kemas Batu Ampar (TEUs)
  bongkarTeus: number;
  muatTeus: number;
  totalTeus: number;

  // Panel 3: Curah Cair (Ton)
  bongkarCurahCairTon: number;
  muatCurahCairTon: number;
  totalCurahCairTon: number;
}

export interface ArusBarangNegaraItem {
  id: string;
  tahun: number;
  bulan: string; // 'Semua' | 'Jan' ... 'Des'
  negara: string;
  volumeBongkarTon: number; // Datang / Import
  volumeMuatTon: number; // Pergi / Export
  totalTon: number;
  pelabuhanAsalTujuanTerbanyak: string;
  namaTerminal: string;
  benderaKapal: string;
}

export interface PengelolaanKepelabuhananDatabase {
  unitInfo: {
    namaUnit: string;
    kodeDeputi: string;
    deputi: string;
    instansi: string;
    tahunAnggaran: number;
    versiData: string;
  };
  jasaDermagaBulanan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: JasaDermagaBulananItem[];
  };
  kunjunganKapalBarang: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: KunjunganKapalBarangBulananItem[];
  };
  kunjunganKapalPenumpang: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: KunjunganKapalPenumpangItem[];
  };
  penumpangDomestikInternasional: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: PenumpangPelabuhanItem[];
  };
  bongkarMuatBatuAmpar: {
    metadata: {
      namaDataset: string;
      sifatData: 'Terbuka';
      periodeUpdate: string;
    };
    records: BongkarMuatTerminalBatuAmparYearly[];
  };
  arusBarangNegara: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: ArusBarangNegaraItem[];
  };
}

export const PENGELOLAAN_KEPELABUHANAN_DATA: PengelolaanKepelabuhananDatabase = {
  unitInfo: {
    namaUnit: 'Badan Pengelolaan dan Pengusahaan Kepelabuhanan',
    kodeDeputi: 'DEP-A5',
    deputi: 'Deputi Bidang Pengelolaan Bandara, Pelabuhan & Pengelolaan Kawasan',
    instansi: 'Badan Pengusahaan Batam (BP Batam)',
    tahunAnggaran: 2026,
    versiData: 'v2026.Q4-Verified',
  },

  // --------------------------------------------------------------------------
  // DATASET 1: REKAPITULASI KEGIATAN JASA DERMAGA PER BULAN (STACKED COLUMN)
  // --------------------------------------------------------------------------
  jasaDermagaBulanan: {
    metadata: {
      namaDataset: 'Rekapitulasi Kegiatan Jasa Dermaga BP Batam (Terbuka, perbulan)',
      sifatData: 'Terbuka',
      periodeUpdate: 'Perbulan (Jan - Des)',
    },
    records: [
      // === 2026 SEMUA PELABUHAN ===
      { id: 'jd-2026-all-01', tahun: 2026, bulan: 'Jan', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 485000, tambatPenumpangTon: 142000, dermagaKhususTersusTon: 320000, dermagaRakyatTon: 45000, totalVolumeTon: 992000, rentangTanggalRekap: '01 Jan - 31 Jan 2026' },
      { id: 'jd-2026-all-02', tahun: 2026, bulan: 'Feb', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 462000, tambatPenumpangTon: 138000, dermagaKhususTersusTon: 305000, dermagaRakyatTon: 42000, totalVolumeTon: 947000, rentangTanggalRekap: '01 Feb - 28 Feb 2026' },
      { id: 'jd-2026-all-03', tahun: 2026, bulan: 'Mar', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 512000, tambatPenumpangTon: 155000, dermagaKhususTersusTon: 345000, dermagaRakyatTon: 48000, totalVolumeTon: 1060000, rentangTanggalRekap: '01 Mar - 31 Mar 2026' },
      { id: 'jd-2026-all-04', tahun: 2026, bulan: 'Apr', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 528000, tambatPenumpangTon: 162000, dermagaKhususTersusTon: 360000, dermagaRakyatTon: 51000, totalVolumeTon: 1101000, rentangTanggalRekap: '01 Apr - 30 Apr 2026' },
      { id: 'jd-2026-all-05', tahun: 2026, bulan: 'Mei', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 515000, tambatPenumpangTon: 158000, dermagaKhususTersusTon: 352000, dermagaRakyatTon: 49000, totalVolumeTon: 1074000, rentangTanggalRekap: '01 Mei - 31 Mei 2026' },
      { id: 'jd-2026-all-06', tahun: 2026, bulan: 'Jun', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 535000, tambatPenumpangTon: 168000, dermagaKhususTersusTon: 368000, dermagaRakyatTon: 53000, totalVolumeTon: 1124000, rentangTanggalRekap: '01 Jun - 30 Jun 2026' },
      { id: 'jd-2026-all-07', tahun: 2026, bulan: 'Jul', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 542000, tambatPenumpangTon: 172000, dermagaKhususTersusTon: 374000, dermagaRakyatTon: 54000, totalVolumeTon: 1142000, rentangTanggalRekap: '01 Jul - 31 Jul 2026' },
      { id: 'jd-2026-all-08', tahun: 2026, bulan: 'Agu', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 520000, tambatPenumpangTon: 154000, dermagaKhususTersusTon: 358000, dermagaRakyatTon: 50000, totalVolumeTon: 1082000, rentangTanggalRekap: '01 Agu - 31 Agu 2026' },
      { id: 'jd-2026-all-09', tahun: 2026, bulan: 'Sep', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 510000, tambatPenumpangTon: 150000, dermagaKhususTersusTon: 348000, dermagaRakyatTon: 48000, totalVolumeTon: 1056000, rentangTanggalRekap: '01 Sep - 30 Sep 2026' },
      { id: 'jd-2026-all-10', tahun: 2026, bulan: 'Okt', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 525000, tambatPenumpangTon: 156000, dermagaKhususTersusTon: 362000, dermagaRakyatTon: 51000, totalVolumeTon: 1094000, rentangTanggalRekap: '01 Okt - 31 Okt 2026' },
      { id: 'jd-2026-all-11', tahun: 2026, bulan: 'Nov', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 505000, tambatPenumpangTon: 148000, dermagaKhususTersusTon: 345000, dermagaRakyatTon: 47000, totalVolumeTon: 1045000, rentangTanggalRekap: '01 Nov - 30 Nov 2026' },
      { id: 'jd-2026-all-12', tahun: 2026, bulan: 'Des', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 560000, tambatPenumpangTon: 185000, dermagaKhususTersusTon: 385000, dermagaRakyatTon: 56000, totalVolumeTon: 1186000, rentangTanggalRekap: '01 Des - 31 Des 2026' },

      // 2026 BATU AMPAR
      { id: 'jd-2026-ba-01', tahun: 2026, bulan: 'Jan', pelabuhan: 'Batu Ampar', tambatBarangTon: 320000, tambatPenumpangTon: 12000, dermagaKhususTersusTon: 140000, dermagaRakyatTon: 15000, totalVolumeTon: 487000, rentangTanggalRekap: '01 Jan - 31 Jan 2026' },
      { id: 'jd-2026-ba-02', tahun: 2026, bulan: 'Feb', pelabuhan: 'Batu Ampar', tambatBarangTon: 305000, tambatPenumpangTon: 11000, dermagaKhususTersusTon: 135000, dermagaRakyatTon: 14000, totalVolumeTon: 465000, rentangTanggalRekap: '01 Feb - 28 Feb 2026' },
      { id: 'jd-2026-ba-03', tahun: 2026, bulan: 'Mar', pelabuhan: 'Batu Ampar', tambatBarangTon: 340000, tambatPenumpangTon: 14000, dermagaKhususTersusTon: 155000, dermagaRakyatTon: 16000, totalVolumeTon: 525000, rentangTanggalRekap: '01 Mar - 31 Mar 2026' },
      { id: 'jd-2026-ba-04', tahun: 2026, bulan: 'Apr', pelabuhan: 'Batu Ampar', tambatBarangTon: 350000, tambatPenumpangTon: 15000, dermagaKhususTersusTon: 160000, dermagaRakyatTon: 17000, totalVolumeTon: 542000, rentangTanggalRekap: '01 Apr - 30 Apr 2026' },
      { id: 'jd-2026-ba-05', tahun: 2026, bulan: 'Mei', pelabuhan: 'Batu Ampar', tambatBarangTon: 342000, tambatPenumpangTon: 14000, dermagaKhususTersusTon: 158000, dermagaRakyatTon: 16000, totalVolumeTon: 530000, rentangTanggalRekap: '01 Mei - 31 Mei 2026' },
      { id: 'jd-2026-ba-06', tahun: 2026, bulan: 'Jun', pelabuhan: 'Batu Ampar', tambatBarangTon: 355000, tambatPenumpangTon: 16000, dermagaKhususTersusTon: 164000, dermagaRakyatTon: 18000, totalVolumeTon: 553000, rentangTanggalRekap: '01 Jun - 30 Jun 2026' },
      { id: 'jd-2026-ba-07', tahun: 2026, bulan: 'Jul', pelabuhan: 'Batu Ampar', tambatBarangTon: 360000, tambatPenumpangTon: 16000, dermagaKhususTersusTon: 168000, dermagaRakyatTon: 18000, totalVolumeTon: 562000, rentangTanggalRekap: '01 Jul - 31 Jul 2026' },
      { id: 'jd-2026-ba-08', tahun: 2026, bulan: 'Agu', pelabuhan: 'Batu Ampar', tambatBarangTon: 345000, tambatPenumpangTon: 14000, dermagaKhususTersusTon: 160000, dermagaRakyatTon: 17000, totalVolumeTon: 536000, rentangTanggalRekap: '01 Agu - 31 Agu 2026' },
      { id: 'jd-2026-ba-09', tahun: 2026, bulan: 'Sep', pelabuhan: 'Batu Ampar', tambatBarangTon: 338000, tambatPenumpangTon: 13000, dermagaKhususTersusTon: 154000, dermagaRakyatTon: 16000, totalVolumeTon: 521000, rentangTanggalRekap: '01 Sep - 30 Sep 2026' },
      { id: 'jd-2026-ba-10', tahun: 2026, bulan: 'Okt', pelabuhan: 'Batu Ampar', tambatBarangTon: 348000, tambatPenumpangTon: 14000, dermagaKhususTersusTon: 162000, dermagaRakyatTon: 17000, totalVolumeTon: 541000, rentangTanggalRekap: '01 Okt - 31 Okt 2026' },
      { id: 'jd-2026-ba-11', tahun: 2026, bulan: 'Nov', pelabuhan: 'Batu Ampar', tambatBarangTon: 335000, tambatPenumpangTon: 13000, dermagaKhususTersusTon: 152000, dermagaRakyatTon: 16000, totalVolumeTon: 516000, rentangTanggalRekap: '01 Nov - 30 Nov 2026' },
      { id: 'jd-2026-ba-12', tahun: 2026, bulan: 'Des', pelabuhan: 'Batu Ampar', tambatBarangTon: 372000, tambatPenumpangTon: 18000, dermagaKhususTersusTon: 172000, dermagaRakyatTon: 19000, totalVolumeTon: 581000, rentangTanggalRekap: '01 Des - 31 Des 2026' },

      // 2025 SEMUA PELABUHAN
      { id: 'jd-2025-all-01', tahun: 2025, bulan: 'Jan', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 450000, tambatPenumpangTon: 132000, dermagaKhususTersusTon: 295000, dermagaRakyatTon: 41000, totalVolumeTon: 918000, rentangTanggalRekap: '01 Jan - 31 Jan 2025' },
      { id: 'jd-2025-all-02', tahun: 2025, bulan: 'Feb', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 430000, tambatPenumpangTon: 128000, dermagaKhususTersusTon: 282000, dermagaRakyatTon: 38000, totalVolumeTon: 878000, rentangTanggalRekap: '01 Feb - 28 Feb 2025' },
      { id: 'jd-2025-all-03', tahun: 2025, bulan: 'Mar', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 475000, tambatPenumpangTon: 142000, dermagaKhususTersusTon: 318000, dermagaRakyatTon: 44000, totalVolumeTon: 979000, rentangTanggalRekap: '01 Mar - 31 Mar 2025' },
      { id: 'jd-2025-all-04', tahun: 2025, bulan: 'Apr', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 490000, tambatPenumpangTon: 151000, dermagaKhususTersusTon: 332000, dermagaRakyatTon: 47000, totalVolumeTon: 1020000, rentangTanggalRekap: '01 Apr - 30 Apr 2025' },
      { id: 'jd-2025-all-05', tahun: 2025, bulan: 'Mei', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 480000, tambatPenumpangTon: 146000, dermagaKhususTersusTon: 324000, dermagaRakyatTon: 45000, totalVolumeTon: 995000, rentangTanggalRekap: '01 Mei - 31 Mei 2025' },
      { id: 'jd-2025-all-06', tahun: 2025, bulan: 'Jun', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 498000, tambatPenumpangTon: 156000, dermagaKhususTersusTon: 339000, dermagaRakyatTon: 49000, totalVolumeTon: 1042000, rentangTanggalRekap: '01 Jun - 30 Jun 2025' },
      { id: 'jd-2025-all-07', tahun: 2025, bulan: 'Jul', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 505000, tambatPenumpangTon: 160000, dermagaKhususTersusTon: 345000, dermagaRakyatTon: 50000, totalVolumeTon: 1060000, rentangTanggalRekap: '01 Jul - 31 Jul 2025' },
      { id: 'jd-2025-all-08', tahun: 2025, bulan: 'Agu', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 485000, tambatPenumpangTon: 142000, dermagaKhususTersusTon: 330000, dermagaRakyatTon: 46000, totalVolumeTon: 1003000, rentangTanggalRekap: '01 Agu - 31 Agu 2025' },
      { id: 'jd-2025-all-09', tahun: 2025, bulan: 'Sep', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 472000, tambatPenumpangTon: 139000, dermagaKhususTersusTon: 320000, dermagaRakyatTon: 44000, totalVolumeTon: 975000, rentangTanggalRekap: '01 Sep - 30 Sep 2025' },
      { id: 'jd-2025-all-10', tahun: 2025, bulan: 'Okt', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 488000, tambatPenumpangTon: 144000, dermagaKhususTersusTon: 334000, dermagaRakyatTon: 47000, totalVolumeTon: 1013000, rentangTanggalRekap: '01 Okt - 31 Okt 2025' },
      { id: 'jd-2025-all-11', tahun: 2025, bulan: 'Nov', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 469000, tambatPenumpangTon: 136000, dermagaKhususTersusTon: 318000, dermagaRakyatTon: 43000, totalVolumeTon: 966000, rentangTanggalRekap: '01 Nov - 30 Nov 2025' },
      { id: 'jd-2025-all-12', tahun: 2025, bulan: 'Des', pelabuhan: 'Semua Pelabuhan', tambatBarangTon: 520000, tambatPenumpangTon: 172000, dermagaKhususTersusTon: 355000, dermagaRakyatTon: 52000, totalVolumeTon: 1099000, rentangTanggalRekap: '01 Des - 31 Des 2025' },
    ],
  },

  // --------------------------------------------------------------------------
  // DATASET 2: REKAPITULASI KUNJUNGAN KAPAL BARANG (CLUSTERED COLUMN PER BULAN)
  // --------------------------------------------------------------------------
  kunjunganKapalBarang: {
    metadata: {
      namaDataset: 'Rekapitulasi Kunjungan Kapal Barang (Terbuka, perbulan)',
      sifatData: 'Terbuka',
      periodeUpdate: 'Perbulan (Jan - Des)',
    },
    records: [
      // 2026 - Semua Pelabuhan
      { id: 'kb-2026-all-01', tahun: 2026, bulan: 'Jan', namaPelabuhan: 'Semua Pelabuhan', callDalam: 685, callLuar: 345, totalCall: 1030, gtDalam: 2450000, gtLuar: 3120000, totalGt: 5570000, tonDalam: 1420000, tonLuar: 1850000, totalTon: 3270000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2026-all-02', tahun: 2026, bulan: 'Feb', namaPelabuhan: 'Semua Pelabuhan', callDalam: 640, callLuar: 320, totalCall: 960, gtDalam: 2310000, gtLuar: 2980000, totalGt: 5290000, tonDalam: 1350000, tonLuar: 1740000, totalTon: 3090000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Curah Cair' },
      { id: 'kb-2026-all-03', tahun: 2026, bulan: 'Mar', namaPelabuhan: 'Semua Pelabuhan', callDalam: 710, callLuar: 365, totalCall: 1075, gtDalam: 2580000, gtLuar: 3340000, totalGt: 5920000, tonDalam: 1510000, tonLuar: 1960000, totalTon: 3470000, tipeKapalTerbanyak: 'Kapal Peti Kemas, Bulk Carrier' },
      { id: 'kb-2026-all-04', tahun: 2026, bulan: 'Apr', namaPelabuhan: 'Semua Pelabuhan', callDalam: 735, callLuar: 380, totalCall: 1115, gtDalam: 2650000, gtLuar: 3480000, totalGt: 6130000, tonDalam: 1560000, tonLuar: 2040000, totalTon: 3600000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Tanker' },
      { id: 'kb-2026-all-05', tahun: 2026, bulan: 'Mei', namaPelabuhan: 'Semua Pelabuhan', callDalam: 720, callLuar: 370, totalCall: 1090, gtDalam: 2610000, gtLuar: 3410000, totalGt: 6020000, tonDalam: 1530000, tonLuar: 1990000, totalTon: 3520000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2026-all-06', tahun: 2026, bulan: 'Jun', namaPelabuhan: 'Semua Pelabuhan', callDalam: 745, callLuar: 390, totalCall: 1135, gtDalam: 2710000, gtLuar: 3560000, totalGt: 6270000, tonDalam: 1590000, tonLuar: 2090000, totalTon: 3680000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Bulk Carrier' },
      { id: 'kb-2026-all-07', tahun: 2026, bulan: 'Jul', namaPelabuhan: 'Semua Pelabuhan', callDalam: 755, callLuar: 395, totalCall: 1150, gtDalam: 2750000, gtLuar: 3610000, totalGt: 6360000, tonDalam: 1610000, tonLuar: 2120000, totalTon: 3730000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Tanker' },
      { id: 'kb-2026-all-08', tahun: 2026, bulan: 'Agu', namaPelabuhan: 'Semua Pelabuhan', callDalam: 725, callLuar: 375, totalCall: 1100, gtDalam: 2630000, gtLuar: 3430000, totalGt: 6060000, tonDalam: 1540000, tonLuar: 2010000, totalTon: 3550000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2026-all-09', tahun: 2026, bulan: 'Sep', namaPelabuhan: 'Semua Pelabuhan', callDalam: 715, callLuar: 368, totalCall: 1083, gtDalam: 2590000, gtLuar: 3380000, totalGt: 5970000, tonDalam: 1520000, tonLuar: 1980000, totalTon: 3500000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Curah Cair' },
      { id: 'kb-2026-all-10', tahun: 2026, bulan: 'Okt', namaPelabuhan: 'Semua Pelabuhan', callDalam: 730, callLuar: 378, totalCall: 1108, gtDalam: 2640000, gtLuar: 3450000, totalGt: 6090000, tonDalam: 1550000, tonLuar: 2030000, totalTon: 3580000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2026-all-11', tahun: 2026, bulan: 'Nov', namaPelabuhan: 'Semua Pelabuhan', callDalam: 705, callLuar: 360, totalCall: 1065, gtDalam: 2540000, gtLuar: 3310000, totalGt: 5850000, tonDalam: 1490000, tonLuar: 1940000, totalTon: 3430000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Bulk Carrier' },
      { id: 'kb-2026-all-12', tahun: 2026, bulan: 'Des', namaPelabuhan: 'Semua Pelabuhan', callDalam: 765, callLuar: 405, totalCall: 1170, gtDalam: 2790000, gtLuar: 3680000, totalGt: 6470000, tonDalam: 1640000, tonLuar: 2180000, totalTon: 3820000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Tanker' },

      // 2026 - Batu Ampar
      { id: 'kb-2026-ba-01', tahun: 2026, bulan: 'Jan', namaPelabuhan: 'Batu Ampar', callDalam: 420, callLuar: 260, totalCall: 680, gtDalam: 1650000, gtLuar: 2420000, totalGt: 4070000, tonDalam: 980000, tonLuar: 1450000, totalTon: 2430000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-02', tahun: 2026, bulan: 'Feb', namaPelabuhan: 'Batu Ampar', callDalam: 395, callLuar: 240, totalCall: 635, gtDalam: 1560000, gtLuar: 2310000, totalGt: 3870000, tonDalam: 930000, tonLuar: 1360000, totalTon: 2290000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-03', tahun: 2026, bulan: 'Mar', namaPelabuhan: 'Batu Ampar', callDalam: 440, callLuar: 275, totalCall: 715, gtDalam: 1740000, gtLuar: 2580000, totalGt: 4320000, tonDalam: 1040000, tonLuar: 1540000, totalTon: 2580000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-04', tahun: 2026, bulan: 'Apr', namaPelabuhan: 'Batu Ampar', callDalam: 455, callLuar: 285, totalCall: 740, gtDalam: 1790000, gtLuar: 2690000, totalGt: 4480000, tonDalam: 1080000, tonLuar: 1610000, totalTon: 2690000, tipeKapalTerbanyak: 'Kapal Peti Kemas & STS Crane' },
      { id: 'kb-2026-ba-05', tahun: 2026, bulan: 'Mei', namaPelabuhan: 'Batu Ampar', callDalam: 445, callLuar: 280, totalCall: 725, gtDalam: 1760000, gtLuar: 2630000, totalGt: 4390000, tonDalam: 1060000, tonLuar: 1570000, totalTon: 2630000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-06', tahun: 2026, bulan: 'Jun', namaPelabuhan: 'Batu Ampar', callDalam: 460, callLuar: 295, totalCall: 755, gtDalam: 1820000, gtLuar: 2750000, totalGt: 4570000, tonDalam: 1100000, tonLuar: 1650000, totalTon: 2750000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-07', tahun: 2026, bulan: 'Jul', namaPelabuhan: 'Batu Ampar', callDalam: 465, callLuar: 300, totalCall: 765, gtDalam: 1850000, gtLuar: 2790000, totalGt: 4640000, tonDalam: 1110000, tonLuar: 1670000, totalTon: 2780000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-08', tahun: 2026, bulan: 'Agu', namaPelabuhan: 'Batu Ampar', callDalam: 450, callLuar: 285, totalCall: 735, gtDalam: 1780000, gtLuar: 2650000, totalGt: 4430000, tonDalam: 1070000, tonLuar: 1580000, totalTon: 2650000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-09', tahun: 2026, bulan: 'Sep', namaPelabuhan: 'Batu Ampar', callDalam: 442, callLuar: 278, totalCall: 720, gtDalam: 1750000, gtLuar: 2610000, totalGt: 4360000, tonDalam: 1050000, tonLuar: 1560000, totalTon: 2610000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-10', tahun: 2026, bulan: 'Okt', namaPelabuhan: 'Batu Ampar', callDalam: 452, callLuar: 288, totalCall: 740, gtDalam: 1790000, gtLuar: 2670000, totalGt: 4460000, tonDalam: 1075000, tonLuar: 1600000, totalTon: 2675000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-11', tahun: 2026, bulan: 'Nov', namaPelabuhan: 'Batu Ampar', callDalam: 435, callLuar: 272, totalCall: 707, gtDalam: 1720000, gtLuar: 2560000, totalGt: 4280000, tonDalam: 1030000, tonLuar: 1530000, totalTon: 2560000, tipeKapalTerbanyak: 'Kapal Peti Kemas (Container)' },
      { id: 'kb-2026-ba-12', tahun: 2026, bulan: 'Des', namaPelabuhan: 'Batu Ampar', callDalam: 475, callLuar: 310, totalCall: 785, gtDalam: 1890000, gtLuar: 2860000, totalGt: 4750000, tonDalam: 1140000, tonLuar: 1720000, totalTon: 2860000, tipeKapalTerbanyak: 'Kapal Peti Kemas & STS Crane' },

      // 2025 - Semua Pelabuhan
      { id: 'kb-2025-all-01', tahun: 2025, bulan: 'Jan', namaPelabuhan: 'Semua Pelabuhan', callDalam: 645, callLuar: 320, totalCall: 965, gtDalam: 2280000, gtLuar: 2880000, totalGt: 5160000, tonDalam: 1320000, tonLuar: 1710000, totalTon: 3030000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2025-all-02', tahun: 2025, bulan: 'Feb', namaPelabuhan: 'Semua Pelabuhan', callDalam: 605, callLuar: 298, totalCall: 903, gtDalam: 2150000, gtLuar: 2750000, totalGt: 4900000, tonDalam: 1250000, tonLuar: 1610000, totalTon: 2860000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Curah Cair' },
      { id: 'kb-2025-all-03', tahun: 2025, bulan: 'Mar', namaPelabuhan: 'Semua Pelabuhan', callDalam: 670, callLuar: 340, totalCall: 1010, gtDalam: 2410000, gtLuar: 3080000, totalGt: 5490000, tonDalam: 1400000, tonLuar: 1820000, totalTon: 3220000, tipeKapalTerbanyak: 'Kapal Peti Kemas, Bulk Carrier' },
      { id: 'kb-2025-all-04', tahun: 2025, bulan: 'Apr', namaPelabuhan: 'Semua Pelabuhan', callDalam: 695, callLuar: 355, totalCall: 1050, gtDalam: 2470000, gtLuar: 3210000, totalGt: 5680000, tonDalam: 1450000, tonLuar: 1890000, totalTon: 3340000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Tanker' },
      { id: 'kb-2025-all-05', tahun: 2025, bulan: 'Mei', namaPelabuhan: 'Semua Pelabuhan', callDalam: 680, callLuar: 345, totalCall: 1025, gtDalam: 2430000, gtLuar: 3150000, totalGt: 5580000, tonDalam: 1420000, tonLuar: 1840000, totalTon: 3260000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2025-all-06', tahun: 2025, bulan: 'Jun', namaPelabuhan: 'Semua Pelabuhan', callDalam: 705, callLuar: 362, totalCall: 1067, gtDalam: 2520000, gtLuar: 3290000, totalGt: 5810000, tonDalam: 1470000, tonLuar: 1930000, totalTon: 3400000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Bulk Carrier' },
      { id: 'kb-2025-all-07', tahun: 2025, bulan: 'Jul', namaPelabuhan: 'Semua Pelabuhan', callDalam: 715, callLuar: 370, totalCall: 1085, gtDalam: 2560000, gtLuar: 3340000, totalGt: 5900000, tonDalam: 1500000, tonLuar: 1960000, totalTon: 3460000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Tanker' },
      { id: 'kb-2025-all-08', tahun: 2025, bulan: 'Agu', namaPelabuhan: 'Semua Pelabuhan', callDalam: 685, callLuar: 350, totalCall: 1035, gtDalam: 2450000, gtLuar: 3170000, totalGt: 5620000, tonDalam: 1430000, tonLuar: 1860000, totalTon: 3290000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2025-all-09', tahun: 2025, bulan: 'Sep', namaPelabuhan: 'Semua Pelabuhan', callDalam: 675, callLuar: 342, totalCall: 1017, gtDalam: 2410000, gtLuar: 3120000, totalGt: 5530000, tonDalam: 1410000, tonLuar: 1830000, totalTon: 3240000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Curah Cair' },
      { id: 'kb-2025-all-10', tahun: 2025, bulan: 'Okt', namaPelabuhan: 'Semua Pelabuhan', callDalam: 690, callLuar: 352, totalCall: 1042, gtDalam: 2460000, gtLuar: 3190000, totalGt: 5650000, tonDalam: 1440000, tonLuar: 1880000, totalTon: 3320000, tipeKapalTerbanyak: 'Kapal Peti Kemas & General Cargo' },
      { id: 'kb-2025-all-11', tahun: 2025, bulan: 'Nov', namaPelabuhan: 'Semua Pelabuhan', callDalam: 665, callLuar: 335, totalCall: 1000, gtDalam: 2360000, gtLuar: 3060000, totalGt: 5420000, tonDalam: 1380000, tonLuar: 1800000, totalTon: 3180000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Bulk Carrier' },
      { id: 'kb-2025-all-12', tahun: 2025, bulan: 'Des', namaPelabuhan: 'Semua Pelabuhan', callDalam: 725, callLuar: 378, totalCall: 1103, gtDalam: 2590000, gtLuar: 3400000, totalGt: 5990000, tonDalam: 1530000, tonLuar: 2020000, totalTon: 3550000, tipeKapalTerbanyak: 'Kapal Peti Kemas & Tanker' },
    ],
  },

  // --------------------------------------------------------------------------
  // DATASET 3: KUNJUNGAN KAPAL PENUMPANG PER PELABUHAN (CLUSTERED BAR HORIZONTAL)
  // --------------------------------------------------------------------------
  kunjunganKapalPenumpang: {
    metadata: {
      namaDataset: 'Rekapitulasi Kunjungan Kapal Penumpang (Terbuka, perbulan)',
      sifatData: 'Terbuka',
      periodeUpdate: 'Perbulan (Jan - Des)',
    },
    records: [
      // 2026 - Semua Bulan
      { id: 'kp-2026-all-bc', tahun: 2026, bulan: 'Semua', pelabuhan: 'Batam Centre', callDalam: 4200, callLuar: 14800, totalCall: 19000, gtDalam: 840000, gtLuar: 4250000, totalGt: 5090000, tipeKapal: 'Fast Ferry / High Speed Craft (HSC)' },
      { id: 'kp-2026-all-hb', tahun: 2026, bulan: 'Semua', pelabuhan: 'Harbour Bay', callDalam: 3600, callLuar: 11200, totalCall: 14800, gtDalam: 720000, gtLuar: 3450000, totalGt: 4170000, tipeKapal: 'Fast Ferry Internasional' },
      { id: 'kp-2026-all-skp', tahun: 2026, bulan: 'Semua', pelabuhan: 'Sekupang (Domestik & Int)', callDalam: 10400, callLuar: 3200, totalCall: 13600, gtDalam: 2180000, gtLuar: 980000, totalGt: 3160000, tipeKapal: 'Ferry Cepat Antar Pulau & KM Pelni' },
      { id: 'kp-2026-all-tp', tahun: 2026, bulan: 'Semua', pelabuhan: 'Telaga Punggur (RORO & Speed)', callDalam: 11200, callLuar: 0, totalCall: 11200, gtDalam: 3850000, gtLuar: 0, totalGt: 3850000, tipeKapal: 'KMP RORO ASDP & Speedboat' },
      { id: 'kp-2026-all-ngs', tahun: 2026, bulan: 'Semua', pelabuhan: 'Nongsapura Ferry Terminal', callDalam: 150, callLuar: 2950, totalCall: 3100, gtDalam: 35000, gtLuar: 920000, totalGt: 955000, tipeKapal: 'Fast Ferry Pariwisata & Resort' },
      { id: 'kp-2026-all-mts', tahun: 2026, bulan: 'Semua', pelabuhan: 'Marina Teluk Senimba', callDalam: 180, callLuar: 1450, totalCall: 1630, gtDalam: 42000, gtLuar: 480000, totalGt: 522000, tipeKapal: 'Fast Ferry Wisata' },

      // 2025 - Semua Bulan
      { id: 'kp-2025-all-bc', tahun: 2025, bulan: 'Semua', pelabuhan: 'Batam Centre', callDalam: 3950, callLuar: 13900, totalCall: 17850, gtDalam: 790000, gtLuar: 3980000, totalGt: 4770000, tipeKapal: 'Fast Ferry / High Speed Craft (HSC)' },
      { id: 'kp-2025-all-hb', tahun: 2025, bulan: 'Semua', pelabuhan: 'Harbour Bay', callDalam: 3380, callLuar: 10500, totalCall: 13880, gtDalam: 676000, gtLuar: 3230000, totalGt: 3906000, tipeKapal: 'Fast Ferry Internasional' },
      { id: 'kp-2025-all-skp', tahun: 2025, bulan: 'Semua', pelabuhan: 'Sekupang (Domestik & Int)', callDalam: 9850, callLuar: 2980, totalCall: 12830, gtDalam: 2050000, gtLuar: 910000, totalGt: 2960000, tipeKapal: 'Ferry Cepat Antar Pulau & KM Pelni' },
      { id: 'kp-2025-all-tp', tahun: 2025, bulan: 'Semua', pelabuhan: 'Telaga Punggur (RORO & Speed)', callDalam: 10500, callLuar: 0, totalCall: 10500, gtDalam: 3620000, gtLuar: 0, totalGt: 3620000, tipeKapal: 'KMP RORO ASDP & Speedboat' },
      { id: 'kp-2025-all-ngs', tahun: 2025, bulan: 'Semua', pelabuhan: 'Nongsapura Ferry Terminal', callDalam: 130, callLuar: 2750, totalCall: 2880, gtDalam: 31000, gtLuar: 860000, totalGt: 891000, tipeKapal: 'Fast Ferry Pariwisata & Resort' },
      { id: 'kp-2025-all-mts', tahun: 2025, bulan: 'Semua', pelabuhan: 'Marina Teluk Senimba', callDalam: 160, callLuar: 1320, totalCall: 1480, gtDalam: 38000, gtLuar: 435000, totalGt: 473000, tipeKapal: 'Fast Ferry Wisata' },
    ],
  },

  // --------------------------------------------------------------------------
  // DATASET 4: JUMLAH PENUMPANG PELABUHAN DOMESTIK DAN INTERNASIONAL
  // --------------------------------------------------------------------------
  penumpangDomestikInternasional: {
    metadata: {
      namaDataset: 'Jumlah Penumpang Pelabuhan Domestik dan Internasional (Tertutup, pertahun)',
      sifatData: 'Tertutup',
      periodeUpdate: 'Pertahun',
    },
    records: [
      // 2026
      {
        id: 'pp-2026-bc',
        tahun: 2026,
        namaTerminal: 'Terminal Ferry Internasional Batam Centre',
        jenisPenumpang: 'Semua',
        kedatangan: 1985000,
        keberangkatan: 2045000,
        totalPenumpang: 4030000,
        porsiDomestikPersen: 8.5,
        porsiInternasionalPersen: 91.5,
        kewarganegaraan: { wniPersen: 64.2, wnaPersen: 35.8 },
      },
      {
        id: 'pp-2026-hb',
        tahun: 2026,
        namaTerminal: 'Terminal Ferry Internasional Harbour Bay',
        jenisPenumpang: 'Semua',
        kedatangan: 1340000,
        keberangkatan: 1385000,
        totalPenumpang: 2725000,
        porsiDomestikPersen: 14.2,
        porsiInternasionalPersen: 85.8,
        kewarganegaraan: { wniPersen: 58.6, wnaPersen: 41.4 },
      },
      {
        id: 'pp-2026-skp-dom',
        tahun: 2026,
        namaTerminal: 'Terminal Domestik Sekupang',
        jenisPenumpang: 'Domestik',
        kedatangan: 890000,
        keberangkatan: 925000,
        totalPenumpang: 1815000,
        porsiDomestikPersen: 100.0,
        porsiInternasionalPersen: 0.0,
        kewarganegaraan: { wniPersen: 98.4, wnaPersen: 1.6 },
      },
      {
        id: 'pp-2026-tp-roro',
        tahun: 2026,
        namaTerminal: 'Terminal RORO Telaga Punggur',
        jenisPenumpang: 'Domestik',
        kedatangan: 745000,
        keberangkatan: 780000,
        totalPenumpang: 1525000,
        porsiDomestikPersen: 100.0,
        porsiInternasionalPersen: 0.0,
        kewarganegaraan: { wniPersen: 99.1, wnaPersen: 0.9 },
      },
      {
        id: 'pp-2026-skp-int',
        tahun: 2026,
        namaTerminal: 'Terminal Internasional Sekupang',
        jenisPenumpang: 'Internasional',
        kedatangan: 345000,
        keberangkatan: 360000,
        totalPenumpang: 705000,
        porsiDomestikPersen: 0.0,
        porsiInternasionalPersen: 100.0,
        kewarganegaraan: { wniPersen: 78.5, wnaPersen: 21.5 },
      },
      {
        id: 'pp-2026-ngs',
        tahun: 2026,
        namaTerminal: 'Terminal Ferry Nongsapura',
        jenisPenumpang: 'Internasional',
        kedatangan: 265000,
        keberangkatan: 278000,
        totalPenumpang: 543000,
        porsiDomestikPersen: 0.0,
        porsiInternasionalPersen: 100.0,
        kewarganegaraan: { wniPersen: 42.0, wnaPersen: 58.0 },
      },

      // 2025
      {
        id: 'pp-2025-bc',
        tahun: 2025,
        namaTerminal: 'Terminal Ferry Internasional Batam Centre',
        jenisPenumpang: 'Semua',
        kedatangan: 1860000,
        keberangkatan: 1910000,
        totalPenumpang: 3770000,
        porsiDomestikPersen: 8.8,
        porsiInternasionalPersen: 91.2,
        kewarganegaraan: { wniPersen: 65.4, wnaPersen: 34.6 },
      },
      {
        id: 'pp-2025-hb',
        tahun: 2025,
        namaTerminal: 'Terminal Ferry Internasional Harbour Bay',
        jenisPenumpang: 'Semua',
        kedatangan: 1250000,
        keberangkatan: 1290000,
        totalPenumpang: 2540000,
        porsiDomestikPersen: 14.5,
        porsiInternasionalPersen: 85.5,
        kewarganegaraan: { wniPersen: 59.8, wnaPersen: 40.2 },
      },
      {
        id: 'pp-2025-skp-dom',
        tahun: 2025,
        namaTerminal: 'Terminal Domestik Sekupang',
        jenisPenumpang: 'Domestik',
        kedatangan: 835000,
        keberangkatan: 868000,
        totalPenumpang: 1703000,
        porsiDomestikPersen: 100.0,
        porsiInternasionalPersen: 0.0,
        kewarganegaraan: { wniPersen: 98.6, wnaPersen: 1.4 },
      },
      {
        id: 'pp-2025-tp-roro',
        tahun: 2025,
        namaTerminal: 'Terminal RORO Telaga Punggur',
        jenisPenumpang: 'Domestik',
        kedatangan: 702000,
        keberangkatan: 735000,
        totalPenumpang: 1437000,
        porsiDomestikPersen: 100.0,
        porsiInternasionalPersen: 0.0,
        kewarganegaraan: { wniPersen: 99.2, wnaPersen: 0.8 },
      },
      {
        id: 'pp-2025-skp-int',
        tahun: 2025,
        namaTerminal: 'Terminal Internasional Sekupang',
        jenisPenumpang: 'Internasional',
        kedatangan: 320000,
        keberangkatan: 335000,
        totalPenumpang: 655000,
        porsiDomestikPersen: 0.0,
        porsiInternasionalPersen: 100.0,
        kewarganegaraan: { wniPersen: 79.2, wnaPersen: 20.8 },
      },
      {
        id: 'pp-2025-ngs',
        tahun: 2025,
        namaTerminal: 'Terminal Ferry Nongsapura',
        jenisPenumpang: 'Internasional',
        kedatangan: 245000,
        keberangkatan: 258000,
        totalPenumpang: 503000,
        porsiDomestikPersen: 0.0,
        porsiInternasionalPersen: 100.0,
        kewarganegaraan: { wniPersen: 43.5, wnaPersen: 56.5 },
      },
    ],
  },

  // --------------------------------------------------------------------------
  // DATASET 5: BONGKAR MUAT TERMINAL BATU AMPAR (SMALL MULTIPLES: 3 MINI PANELS)
  // Panel 1: Kargo (Ton), Panel 2: Peti Kemas (TEUs), Panel 3: Curah Cair (Ton)
  // --------------------------------------------------------------------------
  bongkarMuatBatuAmpar: {
    metadata: {
      namaDataset:
        'Jumlah Pelayanan Bongkar Muat Terminal Kargo Batu Ampar, Terminal Peti Kemas Batu Ampar, dan Terminal Curah (Terbuka, pertahun)',
      sifatData: 'Terbuka',
      periodeUpdate: 'Pertahun (5 Tahun Terakhir: 2022 - 2026)',
    },
    records: [
      {
        tahun: 2022,
        bongkarCargoTon: 2850000,
        bongkarMuatGeneralCargoTon: 1980000,
        totalKargoTon: 4830000,
        bongkarTeus: 275000,
        muatTeus: 268000,
        totalTeus: 543000,
        bongkarCurahCairTon: 1420000,
        muatCurahCairTon: 1180000,
        totalCurahCairTon: 2600000,
      },
      {
        tahun: 2023,
        bongkarCargoTon: 3080000,
        bongkarMuatGeneralCargoTon: 2150000,
        totalKargoTon: 5230000,
        bongkarTeus: 295000,
        muatTeus: 288000,
        totalTeus: 583000,
        bongkarCurahCairTon: 1540000,
        muatCurahCairTon: 1290000,
        totalCurahCairTon: 2830000,
      },
      {
        tahun: 2024,
        bongkarCargoTon: 3340000,
        bongkarMuatGeneralCargoTon: 2320000,
        totalKargoTon: 5660000,
        bongkarTeus: 318000,
        muatTeus: 310000,
        totalTeus: 628000,
        bongkarCurahCairTon: 1680000,
        muatCurahCairTon: 1410000,
        totalCurahCairTon: 3090000,
      },
      {
        tahun: 2025,
        bongkarCargoTon: 3580000,
        bongkarMuatGeneralCargoTon: 2480000,
        totalKargoTon: 6060000,
        bongkarTeus: 342000,
        muatTeus: 335000,
        totalTeus: 677000,
        bongkarCurahCairTon: 1810000,
        muatCurahCairTon: 1520000,
        totalCurahCairTon: 3330000,
      },
      {
        tahun: 2026,
        bongkarCargoTon: 3850000,
        bongkarMuatGeneralCargoTon: 2680000,
        totalKargoTon: 6530000,
        bongkarTeus: 375000,
        muatTeus: 368000,
        totalTeus: 743000,
        bongkarCurahCairTon: 1960000,
        muatCurahCairTon: 1650000,
        totalCurahCairTon: 3610000,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // DATASET 6: ARUS BARANG MENURUT NEGARA ASAL DAN TUJUAN (TOP 10 NEGARA)
  // --------------------------------------------------------------------------
  arusBarangNegara: {
    metadata: {
      namaDataset:
        'Data Volume/Tonase Barang yang Datang dan Pergi dari/ke Pelabuhan Batam beserta Asal/Tujuan Negara (Tertutup, perbulan)',
      sifatData: 'Tertutup',
      periodeUpdate: 'Perbulan / Pertahun',
    },
    records: [
      // 2026 - Semua Bulan (10 Negara Teratas)
      {
        id: 'ab-2026-sin',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Singapura',
        volumeBongkarTon: 4850000,
        volumeMuatTon: 4120000,
        totalTon: 8970000,
        pelabuhanAsalTujuanTerbanyak: 'Jurong Port & Pasir Panjang Terminal',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Singapura, Panama, Indonesia',
      },
      {
        id: 'ab-2026-mys',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Malaysia',
        volumeBongkarTon: 2950000,
        volumeMuatTon: 2680000,
        totalTon: 5630000,
        pelabuhanAsalTujuanTerbanyak: 'Port Klang & Tanjung Pelepas',
        namaTerminal: 'Terminal Batu Ampar & Kabil',
        benderaKapal: 'Malaysia, Liberia, Indonesia',
      },
      {
        id: 'ab-2026-chn',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Tiongkok',
        volumeBongkarTon: 2420000,
        volumeMuatTon: 1980000,
        totalTon: 4400000,
        pelabuhanAsalTujuanTerbanyak: 'Shanghai & Shenzhen Port',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Tiongkok, Marshall Islands, Hong Kong',
      },
      {
        id: 'ab-2026-jpn',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Jepang',
        volumeBongkarTon: 1540000,
        volumeMuatTon: 1320000,
        totalTon: 2860000,
        pelabuhanAsalTujuanTerbanyak: 'Yokohama & Kobe Port',
        namaTerminal: 'Terminal Batu Ampar & Kabil',
        benderaKapal: 'Panama, Jepang, Singapura',
      },
      {
        id: 'ab-2026-kor',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Korea Selatan',
        volumeBongkarTon: 1280000,
        volumeMuatTon: 1150000,
        totalTon: 2430000,
        pelabuhanAsalTujuanTerbanyak: 'Busan Port',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Korea Selatan, Panama, Liberia',
      },
      {
        id: 'ab-2026-tha',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Thailand',
        volumeBongkarTon: 980000,
        volumeMuatTon: 840000,
        totalTon: 1820000,
        pelabuhanAsalTujuanTerbanyak: 'Laem Chabang Port',
        namaTerminal: 'Terminal Kargo Batu Ampar',
        benderaKapal: 'Thailand, Singapura, Indonesia',
      },
      {
        id: 'ab-2026-vnm',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Vietnam',
        volumeBongkarTon: 850000,
        volumeMuatTon: 720000,
        totalTon: 1570000,
        pelabuhanAsalTujuanTerbanyak: 'Hai Phong & Cai Mep',
        namaTerminal: 'Terminal Batu Ampar',
        benderaKapal: 'Vietnam, Panama, Indonesia',
      },
      {
        id: 'ab-2026-twn',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Taiwan',
        volumeBongkarTon: 760000,
        volumeMuatTon: 680000,
        totalTon: 1440000,
        pelabuhanAsalTujuanTerbanyak: 'Kaohsiung Port',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Taiwan, Liberia, Panama',
      },
      {
        id: 'ab-2026-aus',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Australia',
        volumeBongkarTon: 620000,
        volumeMuatTon: 540000,
        totalTon: 1160000,
        pelabuhanAsalTujuanTerbanyak: 'Fremantle & Melbourne Port',
        namaTerminal: 'Terminal Kabil & Curah',
        benderaKapal: 'Australia, Bahamas, Singapura',
      },
      {
        id: 'ab-2026-nld',
        tahun: 2026,
        bulan: 'Semua',
        negara: 'Belanda',
        volumeBongkarTon: 480000,
        volumeMuatTon: 420000,
        totalTon: 900000,
        pelabuhanAsalTujuanTerbanyak: 'Port of Rotterdam',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Belanda, Liberia, Marshall Islands',
      },

      // 2025 - Semua Bulan
      {
        id: 'ab-2025-sin',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Singapura',
        volumeBongkarTon: 4520000,
        volumeMuatTon: 3840000,
        totalTon: 8360000,
        pelabuhanAsalTujuanTerbanyak: 'Jurong Port & Pasir Panjang Terminal',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Singapura, Panama, Indonesia',
      },
      {
        id: 'ab-2025-mys',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Malaysia',
        volumeBongkarTon: 2750000,
        volumeMuatTon: 2490000,
        totalTon: 5240000,
        pelabuhanAsalTujuanTerbanyak: 'Port Klang & Tanjung Pelepas',
        namaTerminal: 'Terminal Batu Ampar & Kabil',
        benderaKapal: 'Malaysia, Liberia, Indonesia',
      },
      {
        id: 'ab-2025-chn',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Tiongkok',
        volumeBongkarTon: 2250000,
        volumeMuatTon: 1840000,
        totalTon: 4090000,
        pelabuhanAsalTujuanTerbanyak: 'Shanghai & Shenzhen Port',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Tiongkok, Marshall Islands, Hong Kong',
      },
      {
        id: 'ab-2025-jpn',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Jepang',
        volumeBongkarTon: 1440000,
        volumeMuatTon: 1230000,
        totalTon: 2670000,
        pelabuhanAsalTujuanTerbanyak: 'Yokohama & Kobe Port',
        namaTerminal: 'Terminal Batu Ampar & Kabil',
        benderaKapal: 'Panama, Jepang, Singapura',
      },
      {
        id: 'ab-2025-kor',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Korea Selatan',
        volumeBongkarTon: 1190000,
        volumeMuatTon: 1070000,
        totalTon: 2260000,
        pelabuhanAsalTujuanTerbanyak: 'Busan Port',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Korea Selatan, Panama, Liberia',
      },
      {
        id: 'ab-2025-tha',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Thailand',
        volumeBongkarTon: 910000,
        volumeMuatTon: 780000,
        totalTon: 1690000,
        pelabuhanAsalTujuanTerbanyak: 'Laem Chabang Port',
        namaTerminal: 'Terminal Kargo Batu Ampar',
        benderaKapal: 'Thailand, Singapura, Indonesia',
      },
      {
        id: 'ab-2025-vnm',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Vietnam',
        volumeBongkarTon: 790000,
        volumeMuatTon: 670000,
        totalTon: 1460000,
        pelabuhanAsalTujuanTerbanyak: 'Hai Phong & Cai Mep',
        namaTerminal: 'Terminal Batu Ampar',
        benderaKapal: 'Vietnam, Panama, Indonesia',
      },
      {
        id: 'ab-2025-twn',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Taiwan',
        volumeBongkarTon: 710000,
        volumeMuatTon: 630000,
        totalTon: 1340000,
        pelabuhanAsalTujuanTerbanyak: 'Kaohsiung Port',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Taiwan, Liberia, Panama',
      },
      {
        id: 'ab-2025-aus',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Australia',
        volumeBongkarTon: 580000,
        volumeMuatTon: 505000,
        totalTon: 1085000,
        pelabuhanAsalTujuanTerbanyak: 'Fremantle & Melbourne Port',
        namaTerminal: 'Terminal Kabil & Curah',
        benderaKapal: 'Australia, Bahamas, Singapura',
      },
      {
        id: 'ab-2025-nld',
        tahun: 2025,
        bulan: 'Semua',
        negara: 'Belanda',
        volumeBongkarTon: 450000,
        volumeMuatTon: 390000,
        totalTon: 840000,
        pelabuhanAsalTujuanTerbanyak: 'Port of Rotterdam',
        namaTerminal: 'Terminal Peti Kemas Batu Ampar',
        benderaKapal: 'Belanda, Liberia, Marshall Islands',
      },
    ],
  },
};

export default PENGELOLAAN_KEPELABUHANAN_DATA;
