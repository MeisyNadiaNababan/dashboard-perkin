// ============================================================================
// DATASET DUMMY REALISTIS: BADAN USAHA PEMANFAATAN ASET - BP BATAM
// Disimpan dalam satu objek JSON terpadu agar mudah diganti dengan data API/asli.
// ============================================================================

export interface PendapatanPenyewaanItem {
  bulan: string;
  guestHouse: number; // Dalam Rupiah
  asramaHaji: number;
  rusun: number;
  sportHall: number;
  totalNominal: number;
  jumlahTransaksi: number;
  belumBayarInvoice: number;
  belumBayarNominal: number;
}

export interface KuninganGuestHouseItem {
  bulan: string;
  kamarTerpakai: number;
  jumlahKamar: number; // 35 kamar total
  hariDalamBulan: number;
  tingkatKeterisianPersen: number; // kamarTerpakai / (jumlahKamar * hariDalamBulan) * 100
  rataLamaMenginapHari: number;
  rataTarifKamarRp: number;
  asalTamuDominan: string;
  tipeKamarFavorit: string;
}

export interface KunjunganWisataItem {
  lokasi: string;
  pengunjungTahunBerjalan: number;
  pengunjungTahunLalu: number;
  selisihPersen: number;
  jumlahKendaraanRoda2: number;
  jumlahKendaraanRoda4: number;
  totalKendaraan: number;
  nominalRp: number;
}

export interface SewaLahanMenaraItem {
  namaProvider: string;
  lunasRp: number;
  belumLunasRp: number;
  totalSewaRp: number;
  jumlahTower: number;
  lokasiDominan: string;
  noSpj: string;
  rentangRekap: string;
}

export interface PeternakanPemotonganItem {
  bulan: string;
  jumlahPenyewaKandang: number;
  jumlahTernakDipotong: number;
  jenisTernakDominan: string;
  pendapatanRetribusiRp: number;
}

export interface FakturAsetItem {
  jasa: string;
  lunasRp: number;
  belumBayarRp: number;
  lewatJatuhTempoRp: number;
  totalNilaiFakturRp: number;
  jumlahFaktur: number;
  jumlahKoreksi: number;
  kursAcuan: string;
}

export interface BadanUsahaPemanfaatanAsetDataYear {
  // Kartu 1: Data Penyewaan Fasilitas dan Kamar
  penyewaanFasilitasPerBulan: PendapatanPenyewaanItem[];
  // Kartu 2: Rekapitulasi Tamu & Profil Kuningan Guest House
  kuninganGuestHousePerBulan: KuninganGuestHouseItem[];
  // Kartu 3: Kunjungan Wisata
  kunjunganWisataPerLokasi: KunjunganWisataItem[];
  // Kartu 4: Data Sewa Lahan Menara Telekomunikasi & Tower BTS
  sewaLahanMenaraPerProvider: SewaLahanMenaraItem[];
  // Kartu 5: Penyewaan Tapak/Kandang Peternakan & Pemotongan Ternak
  peternakanDanPemotonganPerBulan: PeternakanPemotonganItem[];
  // Kartu 6: Penerbitan Faktur Aset per Jenis Jasa
  penerbitanFakturPerJenisJasa: FakturAsetItem[];
}

export interface BadanUsahaPemanfaatanAsetDatabase {
  metadata: {
    unit: string;
    deputi: string;
    lembaga: string;
    versiData: string;
    tahunTersedia: number[];
  };
  tahunan: {
    [tahun: number]: BadanUsahaPemanfaatanAsetDataYear;
  };
}

export const BU_PEMANFAATAN_ASET_DATA: BadanUsahaPemanfaatanAsetDatabase = {
  metadata: {
    unit: 'Badan Usaha Pemanfaatan Aset',
    deputi: 'Deputi Bidang Pengusahaan (DEP-A5)',
    lembaga: 'Badan Pengusahaan Batam (BP Batam)',
    versiData: '2026.1-Official',
    tahunTersedia: [2026, 2025],
  },
  tahunan: {
    2026: {
      // KARTU 1: Pendapatan Penyewaan Fasilitas per Bulan (Rp)
      penyewaanFasilitasPerBulan: [
        {
          bulan: 'Jan',
          guestHouse: 385000000,
          asramaHaji: 620000000,
          rusun: 890000000,
          sportHall: 245000000,
          totalNominal: 2140000000,
          jumlahTransaksi: 142,
          belumBayarInvoice: 8,
          belumBayarNominal: 115000000,
        },
        {
          bulan: 'Feb',
          guestHouse: 340000000,
          asramaHaji: 580000000,
          rusun: 910000000,
          sportHall: 260000000,
          totalNominal: 2090000000,
          jumlahTransaksi: 138,
          belumBayarInvoice: 6,
          belumBayarNominal: 92000000,
        },
        {
          bulan: 'Mar',
          guestHouse: 420000000,
          asramaHaji: 710000000,
          rusun: 905000000,
          sportHall: 310000000,
          totalNominal: 2345000000,
          jumlahTransaksi: 156,
          belumBayarInvoice: 9,
          belumBayarNominal: 130000000,
        },
        {
          bulan: 'Apr',
          guestHouse: 460000000,
          asramaHaji: 840000000,
          rusun: 920000000,
          sportHall: 350000000,
          totalNominal: 2570000000,
          jumlahTransaksi: 168,
          belumBayarInvoice: 7,
          belumBayarNominal: 98000000,
        },
        {
          bulan: 'Mei',
          guestHouse: 510000000,
          asramaHaji: 920000000,
          rusun: 935000000,
          sportHall: 390000000,
          totalNominal: 2755000000,
          jumlahTransaksi: 182,
          belumBayarInvoice: 11,
          belumBayarNominal: 162000000,
        },
        {
          bulan: 'Jun',
          guestHouse: 540000000,
          asramaHaji: 980000000,
          rusun: 940000000,
          sportHall: 420000000,
          totalNominal: 2880000000,
          jumlahTransaksi: 195,
          belumBayarInvoice: 12,
          belumBayarNominal: 175000000,
        },
        {
          bulan: 'Jul',
          guestHouse: 565000000,
          asramaHaji: 1050000000,
          rusun: 950000000,
          sportHall: 460000000,
          totalNominal: 3025000000,
          jumlahTransaksi: 204,
          belumBayarInvoice: 14,
          belumBayarNominal: 198000000,
        },
        {
          bulan: 'Agu',
          guestHouse: 520000000,
          asramaHaji: 890000000,
          rusun: 945000000,
          sportHall: 430000000,
          totalNominal: 2785000000,
          jumlahTransaksi: 188,
          belumBayarInvoice: 9,
          belumBayarNominal: 125000000,
        },
        {
          bulan: 'Sep',
          guestHouse: 490000000,
          asramaHaji: 820000000,
          rusun: 930000000,
          sportHall: 400000000,
          totalNominal: 2640000000,
          jumlahTransaksi: 174,
          belumBayarInvoice: 8,
          belumBayarNominal: 110000000,
        },
        {
          bulan: 'Okt',
          guestHouse: 480000000,
          asramaHaji: 780000000,
          rusun: 935000000,
          sportHall: 380000000,
          totalNominal: 2575000000,
          jumlahTransaksi: 170,
          belumBayarInvoice: 10,
          belumBayarNominal: 145000000,
        },
        {
          bulan: 'Nov',
          guestHouse: 450000000,
          asramaHaji: 740000000,
          rusun: 925000000,
          sportHall: 360000000,
          totalNominal: 2475000000,
          jumlahTransaksi: 162,
          belumBayarInvoice: 7,
          belumBayarNominal: 95000000,
        },
        {
          bulan: 'Des',
          guestHouse: 580000000,
          asramaHaji: 950000000,
          rusun: 960000000,
          sportHall: 480000000,
          totalNominal: 2970000000,
          jumlahTransaksi: 198,
          belumBayarInvoice: 13,
          belumBayarNominal: 188000000,
        },
      ],

      // KARTU 2: Keterisian Kuningan Guest House
      // Total kamar = 35 kamar. Kapasitas room-nights = 35 x hari dalam bulan
      kuninganGuestHousePerBulan: [
        {
          bulan: 'Jan',
          kamarTerpakai: 724,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 66.7,
          rataLamaMenginapHari: 2.2,
          rataTarifKamarRp: 475000,
          asalTamuDominan: 'Jakarta, Pekanbaru',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Feb',
          kamarTerpakai: 686,
          jumlahKamar: 35,
          hariDalamBulan: 28,
          tingkatKeterisianPersen: 70.0,
          rataLamaMenginapHari: 2.1,
          rataTarifKamarRp: 480000,
          asalTamuDominan: 'Medan, Jakarta',
          tipeKamarFavorit: 'Deluxe Twin (12)',
        },
        {
          bulan: 'Mar',
          kamarTerpakai: 785,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 72.4,
          rataLamaMenginapHari: 2.4,
          rataTarifKamarRp: 490000,
          asalTamuDominan: 'Surabaya, Jakarta',
          tipeKamarFavorit: 'Executive Suite (5)',
        },
        {
          bulan: 'Apr',
          kamarTerpakai: 812,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 77.3,
          rataLamaMenginapHari: 2.5,
          rataTarifKamarRp: 495000,
          asalTamuDominan: 'Bandung, Palembang',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Mei',
          kamarTerpakai: 868,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 80.0,
          rataLamaMenginapHari: 2.6,
          rataTarifKamarRp: 510000,
          asalTamuDominan: 'Jakarta, Singapura',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Jun',
          kamarTerpakai: 894,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 85.1,
          rataLamaMenginapHari: 2.8,
          rataTarifKamarRp: 520000,
          asalTamuDominan: 'Jakarta, Riau',
          tipeKamarFavorit: 'Executive Suite (5)',
        },
        {
          bulan: 'Jul',
          kamarTerpakai: 945,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 87.1,
          rataLamaMenginapHari: 2.9,
          rataTarifKamarRp: 525000,
          asalTamuDominan: 'Jakarta, Medan',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Agu',
          kamarTerpakai: 882,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 81.3,
          rataLamaMenginapHari: 2.6,
          rataTarifKamarRp: 510000,
          asalTamuDominan: 'Surabaya, Semarang',
          tipeKamarFavorit: 'Deluxe Twin (12)',
        },
        {
          bulan: 'Sep',
          kamarTerpakai: 830,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 79.0,
          rataLamaMenginapHari: 2.4,
          rataTarifKamarRp: 500000,
          asalTamuDominan: 'Jakarta, Padang',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Okt',
          kamarTerpakai: 815,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 75.1,
          rataLamaMenginapHari: 2.3,
          rataTarifKamarRp: 495000,
          asalTamuDominan: 'Bandung, Jakarta',
          tipeKamarFavorit: 'Deluxe Twin (12)',
        },
        {
          bulan: 'Nov',
          kamarTerpakai: 775,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 73.8,
          rataLamaMenginapHari: 2.2,
          rataTarifKamarRp: 490000,
          asalTamuDominan: 'Pekanbaru, Medan',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Des',
          kamarTerpakai: 962,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 88.7,
          rataLamaMenginapHari: 3.1,
          rataTarifKamarRp: 540000,
          asalTamuDominan: 'Jakarta, Mancanegara',
          tipeKamarFavorit: 'Executive Suite (5)',
        },
      ],

      // KARTU 3: Kunjungan Wisata per Lokasi
      kunjunganWisataPerLokasi: [
        {
          lokasi: 'Taman Rusa Sekupang',
          pengunjungTahunBerjalan: 154200,
          pengunjungTahunLalu: 128500,
          selisihPersen: 20.0,
          jumlahKendaraanRoda2: 38400,
          jumlahKendaraanRoda4: 19200,
          totalKendaraan: 57600,
          nominalRp: 2313000000,
        },
        {
          lokasi: 'Agrowisata BP Batam (Marina)',
          pengunjungTahunBerjalan: 98400,
          pengunjungTahunLalu: 84200,
          selisihPersen: 16.9,
          jumlahKendaraanRoda2: 24600,
          jumlahKendaraanRoda4: 12800,
          totalKendaraan: 37400,
          nominalRp: 1476000000,
        },
        {
          lokasi: 'Wisata Sejarah Galang (Camp Vietnam)',
          pengunjungTahunBerjalan: 86500,
          pengunjungTahunLalu: 75100,
          selisihPersen: 15.2,
          jumlahKendaraanRoda2: 14200,
          jumlahKendaraanRoda4: 16800,
          totalKendaraan: 31000,
          nominalRp: 1730000000,
        },
        {
          lokasi: 'Taman Kolam Sekupang',
          pengunjungTahunBerjalan: 64200,
          pengunjungTahunLalu: 53800,
          selisihPersen: 19.3,
          jumlahKendaraanRoda2: 19500,
          jumlahKendaraanRoda4: 7600,
          totalKendaraan: 27100,
          nominalRp: 642000000,
        },
      ],

      // KARTU 4: Sewa Lahan Menara Telekomunikasi
      sewaLahanMenaraPerProvider: [
        {
          namaProvider: 'PT Telkomsel',
          lunasRp: 6450000000,
          belumLunasRp: 420000000,
          totalSewaRp: 6870000000,
          jumlahTower: 98,
          lokasiDominan: 'Batam Kota, Batu Aji, Sekupang',
          noSpj: 'SPJ-MENARA/TS/014/2026',
          rentangRekap: 'Januari - Desember 2026',
        },
        {
          namaProvider: 'PT Dayamitra Telekomunikasi (Mitratel)',
          lunasRp: 4820000000,
          belumLunasRp: 310000000,
          totalSewaRp: 5130000000,
          jumlahTower: 76,
          lokasiDominan: 'Nongsa, Batam Kota, Sei Beduk',
          noSpj: 'SPJ-MENARA/MT/022/2026',
          rentangRekap: 'Januari - Desember 2026',
        },
        {
          namaProvider: 'PT Profesional Telekomunikasi Indonesia (Protelindo)',
          lunasRp: 3950000000,
          belumLunasRp: 260000000,
          totalSewaRp: 4210000000,
          jumlahTower: 62,
          lokasiDominan: 'Batu Ampar, Lubuk Baja, Sagulung',
          noSpj: 'SPJ-MENARA/PTI/031/2026',
          rentangRekap: 'Januari - Desember 2026',
        },
        {
          namaProvider: 'PT Tower Bersama Group (TBG)',
          lunasRp: 2840000000,
          belumLunasRp: 190000000,
          totalSewaRp: 3030000000,
          jumlahTower: 45,
          lokasiDominan: 'Sekupang, Batu Aji, Bengkong',
          noSpj: 'SPJ-MENARA/TBG/018/2026',
          rentangRekap: 'Januari - Desember 2026',
        },
        {
          namaProvider: 'PT Indosat Ooredoo Hutchison',
          lunasRp: 2310000000,
          belumLunasRp: 175000000,
          totalSewaRp: 2485000000,
          jumlahTower: 36,
          lokasiDominan: 'Batam Kota, Bengkong, Galang',
          noSpj: 'SPJ-MENARA/IOH/009/2026',
          rentangRekap: 'Januari - Desember 2026',
        },
        {
          namaProvider: 'PT XL Axiata Tbk',
          lunasRp: 1880000000,
          belumLunasRp: 140000000,
          totalSewaRp: 2020000000,
          jumlahTower: 29,
          lokasiDominan: 'Batu Ampar, Nongsa, Batam Kota',
          noSpj: 'SPJ-MENARA/XL/005/2026',
          rentangRekap: 'Januari - Desember 2026',
        },
      ],

      // KARTU 5: Penyewaan Tapak/Kandang Peternakan & Pemotongan Ternak (Sei Temiang)
      peternakanDanPemotonganPerBulan: [
        {
          bulan: 'Jan',
          jumlahPenyewaKandang: 94,
          jumlahTernakDipotong: 980,
          jenisTernakDominan: 'Sapi Bali, Kambing PE',
          pendapatanRetribusiRp: 88200000,
        },
        {
          bulan: 'Feb',
          jumlahPenyewaKandang: 96,
          jumlahTernakDipotong: 1040,
          jenisTernakDominan: 'Sapi Bali, Sapi PO',
          pendapatanRetribusiRp: 93600000,
        },
        {
          bulan: 'Mar',
          jumlahPenyewaKandang: 98,
          jumlahTernakDipotong: 1120,
          jenisTernakDominan: 'Sapi Bali, Kambing Kacang',
          pendapatanRetribusiRp: 100800000,
        },
        {
          bulan: 'Apr',
          jumlahPenyewaKandang: 102,
          jumlahTernakDipotong: 1350,
          jenisTernakDominan: 'Sapi Limousin, Sapi Bali',
          pendapatanRetribusiRp: 121500000,
        },
        {
          bulan: 'Mei',
          jumlahPenyewaKandang: 115,
          jumlahTernakDipotong: 2480, // Menjelang Idul Adha
          jenisTernakDominan: 'Sapi Bali, Domba Garut',
          pendapatanRetribusiRp: 223200000,
        },
        {
          bulan: 'Jun',
          jumlahPenyewaKandang: 124,
          jumlahTernakDipotong: 3850, // Puncak Idul Adha
          jenisTernakDominan: 'Sapi Bali, Sapi Brahman, Kambing',
          pendapatanRetribusiRp: 346500000,
        },
        {
          bulan: 'Jul',
          jumlahPenyewaKandang: 110,
          jumlahTernakDipotong: 1150,
          jenisTernakDominan: 'Sapi Bali, Kambing',
          pendapatanRetribusiRp: 103500000,
        },
        {
          bulan: 'Agu',
          jumlahPenyewaKandang: 105,
          jumlahTernakDipotong: 1080,
          jenisTernakDominan: 'Sapi Bali, Sapi PO',
          pendapatanRetribusiRp: 97200000,
        },
        {
          bulan: 'Sep',
          jumlahPenyewaKandang: 104,
          jumlahTernakDipotong: 1020,
          jenisTernakDominan: 'Sapi Bali, Kambing PE',
          pendapatanRetribusiRp: 91800000,
        },
        {
          bulan: 'Okt',
          jumlahPenyewaKandang: 106,
          jumlahTernakDipotong: 1140,
          jenisTernakDominan: 'Sapi Bali, Kambing Kacang',
          pendapatanRetribusiRp: 102600000,
        },
        {
          bulan: 'Nov',
          jumlahPenyewaKandang: 108,
          jumlahTernakDipotong: 1210,
          jenisTernakDominan: 'Sapi Limousin, Kambing',
          pendapatanRetribusiRp: 108900000,
        },
        {
          bulan: 'Des',
          jumlahPenyewaKandang: 112,
          jumlahTernakDipotong: 1540,
          jenisTernakDominan: 'Sapi Bali, Domba',
          pendapatanRetribusiRp: 138600000,
        },
      ],

      // KARTU 6: Penerbitan Faktur Aset per Jenis Jasa
      penerbitanFakturPerJenisJasa: [
        {
          jasa: 'Lahan Komersial & Industri',
          lunasRp: 44250000000,
          belumBayarRp: 5800000000,
          lewatJatuhTempoRp: 2150000000,
          totalNilaiFakturRp: 52200000000,
          jumlahFaktur: 384,
          jumlahKoreksi: 6,
          kursAcuan: 'IDR & USD (BI Rp 16.250)',
        },
        {
          jasa: 'Ruang Kantor & Fasilitas Gedung',
          lunasRp: 16800000000,
          belumBayarRp: 2450000000,
          lewatJatuhTempoRp: 950000000,
          totalNilaiFakturRp: 20200000000,
          jumlahFaktur: 248,
          jumlahKoreksi: 4,
          kursAcuan: 'IDR murni',
        },
        {
          jasa: 'Gudang & Tempat Penimbunan',
          lunasRp: 12600000000,
          belumBayarRp: 1850000000,
          lewatJatuhTempoRp: 720000000,
          totalNilaiFakturRp: 15170000000,
          jumlahFaktur: 172,
          jumlahKoreksi: 3,
          kursAcuan: 'IDR & SGD (BI Rp 12.180)',
        },
        {
          jasa: 'Pengelolaan Kawasan & Utilitas',
          lunasRp: 9150000000,
          belumBayarRp: 1280000000,
          lewatJatuhTempoRp: 490000000,
          totalNilaiFakturRp: 10920000000,
          jumlahFaktur: 196,
          jumlahKoreksi: 2,
          kursAcuan: 'IDR murni',
        },
      ],
    },

    2025: {
      // KARTU 1: Pendapatan Penyewaan Fasilitas per Bulan (Rp) - 2025
      penyewaanFasilitasPerBulan: [
        {
          bulan: 'Jan',
          guestHouse: 320000000,
          asramaHaji: 520000000,
          rusun: 840000000,
          sportHall: 210000000,
          totalNominal: 1890000000,
          jumlahTransaksi: 125,
          belumBayarInvoice: 5,
          belumBayarNominal: 72000000,
        },
        {
          bulan: 'Feb',
          guestHouse: 290000000,
          asramaHaji: 490000000,
          rusun: 850000000,
          sportHall: 220000000,
          totalNominal: 1850000000,
          jumlahTransaksi: 120,
          belumBayarInvoice: 4,
          belumBayarNominal: 61000000,
        },
        {
          bulan: 'Mar',
          guestHouse: 360000000,
          asramaHaji: 610000000,
          rusun: 855000000,
          sportHall: 270000000,
          totalNominal: 2095000000,
          jumlahTransaksi: 136,
          belumBayarInvoice: 7,
          belumBayarNominal: 95000000,
        },
        {
          bulan: 'Apr',
          guestHouse: 390000000,
          asramaHaji: 720000000,
          rusun: 860000000,
          sportHall: 290000000,
          totalNominal: 2260000000,
          jumlahTransaksi: 148,
          belumBayarInvoice: 6,
          belumBayarNominal: 80000000,
        },
        {
          bulan: 'Mei',
          guestHouse: 430000000,
          asramaHaji: 790000000,
          rusun: 870000000,
          sportHall: 330000000,
          totalNominal: 2420000000,
          jumlahTransaksi: 159,
          belumBayarInvoice: 8,
          belumBayarNominal: 110000000,
        },
        {
          bulan: 'Jun',
          guestHouse: 460000000,
          asramaHaji: 850000000,
          rusun: 880000000,
          sportHall: 360000000,
          totalNominal: 2550000000,
          jumlahTransaksi: 170,
          belumBayarInvoice: 9,
          belumBayarNominal: 125000000,
        },
        {
          bulan: 'Jul',
          guestHouse: 480000000,
          asramaHaji: 910000000,
          rusun: 890000000,
          sportHall: 390000000,
          totalNominal: 2670000000,
          jumlahTransaksi: 178,
          belumBayarInvoice: 10,
          belumBayarNominal: 140000000,
        },
        {
          bulan: 'Agu',
          guestHouse: 440000000,
          asramaHaji: 770000000,
          rusun: 885000000,
          sportHall: 370000000,
          totalNominal: 2465000000,
          jumlahTransaksi: 164,
          belumBayarInvoice: 7,
          belumBayarNominal: 92000000,
        },
        {
          bulan: 'Sep',
          guestHouse: 410000000,
          asramaHaji: 710000000,
          rusun: 875000000,
          sportHall: 340000000,
          totalNominal: 2335000000,
          jumlahTransaksi: 152,
          belumBayarInvoice: 6,
          belumBayarNominal: 84000000,
        },
        {
          bulan: 'Okt',
          guestHouse: 400000000,
          asramaHaji: 670000000,
          rusun: 880000000,
          sportHall: 320000000,
          totalNominal: 2270000000,
          jumlahTransaksi: 149,
          belumBayarInvoice: 7,
          belumBayarNominal: 96000000,
        },
        {
          bulan: 'Nov',
          guestHouse: 380000000,
          asramaHaji: 630000000,
          rusun: 870000000,
          sportHall: 300000000,
          totalNominal: 2180000000,
          jumlahTransaksi: 142,
          belumBayarInvoice: 5,
          belumBayarNominal: 70000000,
        },
        {
          bulan: 'Des',
          guestHouse: 490000000,
          asramaHaji: 810000000,
          rusun: 900000000,
          sportHall: 410000000,
          totalNominal: 2610000000,
          jumlahTransaksi: 175,
          belumBayarInvoice: 9,
          belumBayarNominal: 130000000,
        },
      ],

      // KARTU 2: Keterisian Kuningan Guest House - 2025
      kuninganGuestHousePerBulan: [
        {
          bulan: 'Jan',
          kamarTerpakai: 642,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 59.2,
          rataLamaMenginapHari: 2.0,
          rataTarifKamarRp: 450000,
          asalTamuDominan: 'Jakarta, Pekanbaru',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Feb',
          kamarTerpakai: 615,
          jumlahKamar: 35,
          hariDalamBulan: 28,
          tingkatKeterisianPersen: 62.8,
          rataLamaMenginapHari: 1.9,
          rataTarifKamarRp: 455000,
          asalTamuDominan: 'Medan, Jakarta',
          tipeKamarFavorit: 'Deluxe Twin (12)',
        },
        {
          bulan: 'Mar',
          kamarTerpakai: 698,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 64.3,
          rataLamaMenginapHari: 2.1,
          rataTarifKamarRp: 460000,
          asalTamuDominan: 'Surabaya, Jakarta',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Apr',
          kamarTerpakai: 725,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 69.0,
          rataLamaMenginapHari: 2.3,
          rataTarifKamarRp: 465000,
          asalTamuDominan: 'Bandung, Palembang',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Mei',
          kamarTerpakai: 780,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 71.9,
          rataLamaMenginapHari: 2.4,
          rataTarifKamarRp: 475000,
          asalTamuDominan: 'Jakarta, Riau',
          tipeKamarFavorit: 'Executive Suite (5)',
        },
        {
          bulan: 'Jun',
          kamarTerpakai: 810,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 77.1,
          rataLamaMenginapHari: 2.5,
          rataTarifKamarRp: 480000,
          asalTamuDominan: 'Jakarta, Medan',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Jul',
          kamarTerpakai: 852,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 78.5,
          rataLamaMenginapHari: 2.6,
          rataTarifKamarRp: 485000,
          asalTamuDominan: 'Jakarta, Bandung',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Agu',
          kamarTerpakai: 795,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 73.3,
          rataLamaMenginapHari: 2.4,
          rataTarifKamarRp: 475000,
          asalTamuDominan: 'Surabaya, Jakarta',
          tipeKamarFavorit: 'Deluxe Twin (12)',
        },
        {
          bulan: 'Sep',
          kamarTerpakai: 745,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 71.0,
          rataLamaMenginapHari: 2.2,
          rataTarifKamarRp: 470000,
          asalTamuDominan: 'Jakarta, Padang',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Okt',
          kamarTerpakai: 730,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 67.3,
          rataLamaMenginapHari: 2.1,
          rataTarifKamarRp: 465000,
          asalTamuDominan: 'Bandung, Jakarta',
          tipeKamarFavorit: 'Deluxe Twin (12)',
        },
        {
          bulan: 'Nov',
          kamarTerpakai: 690,
          jumlahKamar: 35,
          hariDalamBulan: 30,
          tingkatKeterisianPersen: 65.7,
          rataLamaMenginapHari: 2.0,
          rataTarifKamarRp: 460000,
          asalTamuDominan: 'Pekanbaru, Medan',
          tipeKamarFavorit: 'Deluxe Queen (18)',
        },
        {
          bulan: 'Des',
          kamarTerpakai: 865,
          jumlahKamar: 35,
          hariDalamBulan: 31,
          tingkatKeterisianPersen: 79.7,
          rataLamaMenginapHari: 2.8,
          rataTarifKamarRp: 500000,
          asalTamuDominan: 'Jakarta, Mancanegara',
          tipeKamarFavorit: 'Executive Suite (5)',
        },
      ],

      // KARTU 3: Kunjungan Wisata per Lokasi - 2025
      kunjunganWisataPerLokasi: [
        {
          lokasi: 'Taman Rusa Sekupang',
          pengunjungTahunBerjalan: 128500,
          pengunjungTahunLalu: 110200,
          selisihPersen: 16.6,
          jumlahKendaraanRoda2: 32000,
          jumlahKendaraanRoda4: 16000,
          totalKendaraan: 48000,
          nominalRp: 1927500000,
        },
        {
          lokasi: 'Agrowisata BP Batam (Marina)',
          pengunjungTahunBerjalan: 84200,
          pengunjungTahunLalu: 73500,
          selisihPersen: 14.6,
          jumlahKendaraanRoda2: 21000,
          jumlahKendaraanRoda4: 10900,
          totalKendaraan: 31900,
          nominalRp: 1263000000,
        },
        {
          lokasi: 'Wisata Sejarah Galang (Camp Vietnam)',
          pengunjungTahunBerjalan: 75100,
          pengunjungTahunLalu: 66800,
          selisihPersen: 12.4,
          jumlahKendaraanRoda2: 12500,
          jumlahKendaraanRoda4: 14600,
          totalKendaraan: 27100,
          nominalRp: 1502000000,
        },
        {
          lokasi: 'Taman Kolam Sekupang',
          pengunjungTahunBerjalan: 53800,
          pengunjungTahunLalu: 46200,
          selisihPersen: 16.5,
          jumlahKendaraanRoda2: 16400,
          jumlahKendaraanRoda4: 6400,
          totalKendaraan: 22800,
          nominalRp: 538000000,
        },
      ],

      // KARTU 4: Sewa Lahan Menara Telekomunikasi - 2025
      sewaLahanMenaraPerProvider: [
        {
          namaProvider: 'PT Telkomsel',
          lunasRp: 5850000000,
          belumLunasRp: 490000000,
          totalSewaRp: 6340000000,
          jumlahTower: 92,
          lokasiDominan: 'Batam Kota, Batu Aji, Sekupang',
          noSpj: 'SPJ-MENARA/TS/012/2025',
          rentangRekap: 'Januari - Desember 2025',
        },
        {
          namaProvider: 'PT Dayamitra Telekomunikasi (Mitratel)',
          lunasRp: 4350000000,
          belumLunasRp: 360000000,
          totalSewaRp: 4710000000,
          jumlahTower: 71,
          lokasiDominan: 'Nongsa, Batam Kota, Sei Beduk',
          noSpj: 'SPJ-MENARA/MT/019/2025',
          rentangRekap: 'Januari - Desember 2025',
        },
        {
          namaProvider: 'PT Profesional Telekomunikasi Indonesia (Protelindo)',
          lunasRp: 3520000000,
          belumLunasRp: 310000000,
          totalSewaRp: 3830000000,
          jumlahTower: 58,
          lokasiDominan: 'Batu Ampar, Lubuk Baja, Sagulung',
          noSpj: 'SPJ-MENARA/PTI/028/2025',
          rentangRekap: 'Januari - Desember 2025',
        },
        {
          namaProvider: 'PT Tower Bersama Group (TBG)',
          lunasRp: 2540000000,
          belumLunasRp: 220000000,
          totalSewaRp: 2760000000,
          jumlahTower: 42,
          lokasiDominan: 'Sekupang, Batu Aji, Bengkong',
          noSpj: 'SPJ-MENARA/TBG/015/2025',
          rentangRekap: 'Januari - Desember 2025',
        },
        {
          namaProvider: 'PT Indosat Ooredoo Hutchison',
          lunasRp: 2050000000,
          belumLunasRp: 195000000,
          totalSewaRp: 2245000000,
          jumlahTower: 33,
          lokasiDominan: 'Batam Kota, Bengkong, Galang',
          noSpj: 'SPJ-MENARA/IOH/007/2025',
          rentangRekap: 'Januari - Desember 2025',
        },
        {
          namaProvider: 'PT XL Axiata Tbk',
          lunasRp: 1680000000,
          belumLunasRp: 160000000,
          totalSewaRp: 1840000000,
          jumlahTower: 27,
          lokasiDominan: 'Batu Ampar, Nongsa, Batam Kota',
          noSpj: 'SPJ-MENARA/XL/004/2025',
          rentangRekap: 'Januari - Desember 2025',
        },
      ],

      // KARTU 5: Penyewaan Tapak/Kandang & Pemotongan Ternak - 2025
      peternakanDanPemotonganPerBulan: [
        {
          bulan: 'Jan',
          jumlahPenyewaKandang: 88,
          jumlahTernakDipotong: 910,
          jenisTernakDominan: 'Sapi Bali, Kambing PE',
          pendapatanRetribusiRp: 81900000,
        },
        {
          bulan: 'Feb',
          jumlahPenyewaKandang: 90,
          jumlahTernakDipotong: 960,
          jenisTernakDominan: 'Sapi Bali, Sapi PO',
          pendapatanRetribusiRp: 86400000,
        },
        {
          bulan: 'Mar',
          jumlahPenyewaKandang: 92,
          jumlahTernakDipotong: 1030,
          jenisTernakDominan: 'Sapi Bali, Kambing Kacang',
          pendapatanRetribusiRp: 92700000,
        },
        {
          bulan: 'Apr',
          jumlahPenyewaKandang: 95,
          jumlahTernakDipotong: 1220,
          jenisTernakDominan: 'Sapi Limousin, Sapi Bali',
          pendapatanRetribusiRp: 109800000,
        },
        {
          bulan: 'Mei',
          jumlahPenyewaKandang: 108,
          jumlahTernakDipotong: 2240,
          jenisTernakDominan: 'Sapi Bali, Domba Garut',
          pendapatanRetribusiRp: 201600000,
        },
        {
          bulan: 'Jun',
          jumlahPenyewaKandang: 116,
          jumlahTernakDipotong: 3450,
          jenisTernakDominan: 'Sapi Bali, Sapi Brahman, Kambing',
          pendapatanRetribusiRp: 310500000,
        },
        {
          bulan: 'Jul',
          jumlahPenyewaKandang: 102,
          jumlahTernakDipotong: 1060,
          jenisTernakDominan: 'Sapi Bali, Kambing',
          pendapatanRetribusiRp: 95400000,
        },
        {
          bulan: 'Agu',
          jumlahPenyewaKandang: 98,
          jumlahTernakDipotong: 990,
          jenisTernakDominan: 'Sapi Bali, Sapi PO',
          pendapatanRetribusiRp: 89100000,
        },
        {
          bulan: 'Sep',
          jumlahPenyewaKandang: 96,
          jumlahTernakDipotong: 950,
          jenisTernakDominan: 'Sapi Bali, Kambing PE',
          pendapatanRetribusiRp: 85500000,
        },
        {
          bulan: 'Okt',
          jumlahPenyewaKandang: 99,
          jumlahTernakDipotong: 1050,
          jenisTernakDominan: 'Sapi Bali, Kambing Kacang',
          pendapatanRetribusiRp: 94500000,
        },
        {
          bulan: 'Nov',
          jumlahPenyewaKandang: 101,
          jumlahTernakDipotong: 1120,
          jenisTernakDominan: 'Sapi Limousin, Kambing',
          pendapatanRetribusiRp: 100800000,
        },
        {
          bulan: 'Des',
          jumlahPenyewaKandang: 105,
          jumlahTernakDipotong: 1410,
          jenisTernakDominan: 'Sapi Bali, Domba',
          pendapatanRetribusiRp: 126900000,
        },
      ],

      // KARTU 6: Penerbitan Faktur Aset per Jenis Jasa - 2025
      penerbitanFakturPerJenisJasa: [
        {
          jasa: 'Lahan Komersial & Industri',
          lunasRp: 39800000000,
          belumBayarRp: 6200000000,
          lewatJatuhTempoRp: 2650000000,
          totalNilaiFakturRp: 48650000000,
          jumlahFaktur: 356,
          jumlahKoreksi: 8,
          kursAcuan: 'IDR & USD (BI Rp 15.850)',
        },
        {
          jasa: 'Ruang Kantor & Fasilitas Gedung',
          lunasRp: 14900000000,
          belumBayarRp: 2750000000,
          lewatJatuhTempoRp: 1100000000,
          totalNilaiFakturRp: 18750000000,
          jumlahFaktur: 230,
          jumlahKoreksi: 5,
          kursAcuan: 'IDR murni',
        },
        {
          jasa: 'Gudang & Tempat Penimbunan',
          lunasRp: 11200000000,
          belumBayarRp: 2100000000,
          lewatJatuhTempoRp: 890000000,
          totalNilaiFakturRp: 14190000000,
          jumlahFaktur: 158,
          jumlahKoreksi: 4,
          kursAcuan: 'IDR & SGD (BI Rp 11.890)',
        },
        {
          jasa: 'Pengelolaan Kawasan & Utilitas',
          lunasRp: 8100000000,
          belumBayarRp: 1450000000,
          lewatJatuhTempoRp: 580000000,
          totalNilaiFakturRp: 10130000000,
          jumlahFaktur: 182,
          jumlahKoreksi: 3,
          kursAcuan: 'IDR murni',
        },
      ],
    },
  },
};
