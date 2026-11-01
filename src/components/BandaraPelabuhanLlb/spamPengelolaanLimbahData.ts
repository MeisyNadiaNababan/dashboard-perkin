// ============================================================================
// DATA TERPADU BADAN USAHA SISTEM PENGELOLAAN AIR MINUM & PENGELOLAAN LIMBAH
// BP BATAM (DEP A5) - DISIMPAN DALAM SATU OBJEK JSON AGAR MUDAH DIGANTI DATA ASLI
// ============================================================================

export interface BakuCurahBatamindoRecord {
  bulan: string;
  airBakuM3: number;
  airCurahM3: number;
  penyediaanBatamindoM3: number;
  nomorBA: string;
}

export interface NrwRecord {
  triwulan: string;
  tahun2026: number;
  tahun2025: number;
  target: number;
  deltaVsPrevQ: number;
  catatan?: string;
}

export interface DmzAirBacaRecord {
  dmz: string;
  volumeAirBacaM3: number;
  jumlahPelanggan: number;
  volumeTagihM3: number;
  selisihPersen: number;
  kategori: 'Rumah Tangga' | 'Niaga' | 'Industri';
  kpp: string;
}

export interface WtpProduksiRecord {
  wtp: string;
  kapasitasTerpasangLps: number;
  pemakaianAirBakuLps: number;
  utilisasiPersen: number;
  periode: string;
  teknologi: string;
}

export interface WadukKapasitasRecord {
  namaWaduk: string;
  kapasitasJutaM3: number;
  luasPermukaanHa: number;
  tahun: number;
  periodeRekap: string;
  status: string;
  elevasiMukaAirM: number;
}

export interface LimbahB3KpliRecord {
  bulan: string;
  padatTon: number;
  sludgeTon: number;
  cairTon: number;
  totalTon: number;
  persenDiolah: number;
  perusahaanTerbanyak: string;
  targetPersen: number;
}

export interface LayananLimbahDomestikRecord {
  bulan: string;
  limbahDomestikUmum: number;
  pengurasanSumurTinja: number;
  pengurasanAsetBpBatam: number;
  totalPesanan: number;
  totalVolumeM3: number;
  jumlahRupiah: number;
  trip: number;
  zonaTerbanyak: string;
  zonaBreakdown?: Record<string, { pesanan: number; volumeM3: number }>;
}

export interface PengujianLabRecord {
  bulan: string;
  sampelUji: number;
  biayaRetribusiRp: number;
  jenisTerbanyak: string;
  perusahaanTerbanyak: string;
  jenisBreakdown?: Record<string, number>;
}

export interface SpamLimbahYearData {
  bakuCurahBatamindo: BakuCurahBatamindoRecord[];
  nrwTriwulan: NrwRecord[];
  dmzAirBaca: Record<string, DmzAirBacaRecord[]>; // Keyed by month (e.g. 'Semua', 'Jan', 'Feb', ... 'Des')
  wtpProduksiBulanan: Record<string, WtpProduksiRecord[]>; // Keyed by month or semester ('Jan', 'Semester 1', etc.)
  wadukKapasitas: WadukKapasitasRecord[];
  limbahB3Kpli: LimbahB3KpliRecord[];
  layananLimbahDomestik: LayananLimbahDomestikRecord[];
  pengujianLab: PengujianLabRecord[];
}

export const SPAM_LIMBAH_DATA: {
  tahunan: Record<number, SpamLimbahYearData>;
  daftarWadukHistoris: Record<number, WadukKapasitasRecord[]>;
} = {
  tahunan: {
    2026: {
      // ----------------------------------------------------------------------
      // KARTU 1: Volume Air Baku, Air Curah, dan Penyediaan ke Industri
      // ----------------------------------------------------------------------
      bakuCurahBatamindo: [
        { bulan: 'Jan', airBakuM3: 12150000, airCurahM3: 10680000, penyediaanBatamindoM3: 328000, nomorBA: 'BA-AB/01/SPAM/2026' },
        { bulan: 'Feb', airBakuM3: 11420000, airCurahM3: 10040000, penyediaanBatamindoM3: 312000, nomorBA: 'BA-AB/02/SPAM/2026' },
        { bulan: 'Mar', airBakuM3: 12480000, airCurahM3: 10980000, penyediaanBatamindoM3: 339000, nomorBA: 'BA-AB/03/SPAM/2026' },
        { bulan: 'Apr', airBakuM3: 12240000, airCurahM3: 10760000, penyediaanBatamindoM3: 331000, nomorBA: 'BA-AB/04/SPAM/2026' },
        { bulan: 'Mei', airBakuM3: 12620000, airCurahM3: 11120000, penyediaanBatamindoM3: 345000, nomorBA: 'BA-AB/05/SPAM/2026' },
        { bulan: 'Jun', airBakuM3: 12380000, airCurahM3: 10890000, penyediaanBatamindoM3: 338000, nomorBA: 'BA-AB/06/SPAM/2026' },
        { bulan: 'Jul', airBakuM3: 12790000, airCurahM3: 11250000, penyediaanBatamindoM3: 352000, nomorBA: 'BA-AB/07/SPAM/2026' },
        { bulan: 'Agu', airBakuM3: 12560000, airCurahM3: 11060000, penyediaanBatamindoM3: 346000, nomorBA: 'BA-AB/08/SPAM/2026' },
        { bulan: 'Sep', airBakuM3: 12410000, airCurahM3: 10920000, penyediaanBatamindoM3: 340000, nomorBA: 'BA-AB/09/SPAM/2026' },
        { bulan: 'Okt', airBakuM3: 12750000, airCurahM3: 11220000, penyediaanBatamindoM3: 354000, nomorBA: 'BA-AB/10/SPAM/2026' },
        { bulan: 'Nov', airBakuM3: 12510000, airCurahM3: 11010000, penyediaanBatamindoM3: 348000, nomorBA: 'BA-AB/11/SPAM/2026' },
        { bulan: 'Des', airBakuM3: 12980000, airCurahM3: 11420000, penyediaanBatamindoM3: 362000, nomorBA: 'BA-AB/12/SPAM/2026' },
      ],

      // ----------------------------------------------------------------------
      // KARTU 2: Non Revenue Water (NRW) Triwulanan
      // ----------------------------------------------------------------------
      nrwTriwulan: [
        { triwulan: 'Triwulan I (Q1)', tahun2026: 24.2, tahun2025: 26.5, target: 25.0, deltaVsPrevQ: -0.6, catatan: 'Rehabilitasi pipa transmisi Duriangkang selesai' },
        { triwulan: 'Triwulan II (Q2)', tahun2026: 23.8, tahun2025: 25.9, target: 25.0, deltaVsPrevQ: -0.4, catatan: 'Pemasangan smart pressure logger di Nagoya & Sagulung' },
        { triwulan: 'Triwulan III (Q3)', tahun2026: 23.5, tahun2025: 25.4, target: 25.0, deltaVsPrevQ: -0.3, catatan: 'Inspeksi kebocoran DMA Batu Aji' },
        { triwulan: 'Triwulan IV (Q4)', tahun2026: 23.1, tahun2025: 24.8, target: 25.0, deltaVsPrevQ: -0.4, catatan: 'Target tercapai di bawah batas toleransi 25%' },
      ],

      // ----------------------------------------------------------------------
      // KARTU 3: Volume Air Baca dan Pelanggan per DMZ (Top 10 DMZ)
      // ----------------------------------------------------------------------
      dmzAirBaca: {
        Semua: [
          { dmz: 'DMZ Batam Centre 01', volumeAirBacaM3: 945000, jumlahPelanggan: 38240, volumeTagihM3: 885000, selisihPersen: 6.3, kategori: 'Rumah Tangga', kpp: 'KPP Batam Centre' },
          { dmz: 'DMZ Nagoya Hub 02', volumeAirBacaM3: 865000, jumlahPelanggan: 27500, volumeTagihM3: 820000, selisihPersen: 5.2, kategori: 'Niaga', kpp: 'KPP Nagoya' },
          { dmz: 'DMZ Batu Aji Raya 03', volumeAirBacaM3: 792000, jumlahPelanggan: 42100, volumeTagihM3: 735000, selisihPersen: 7.2, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Sagulung Permai 04', volumeAirBacaM3: 685000, jumlahPelanggan: 36800, volumeTagihM3: 638000, selisihPersen: 6.9, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Sekupang Marina 05', volumeAirBacaM3: 590000, jumlahPelanggan: 22400, volumeTagihM3: 558000, selisihPersen: 5.4, kategori: 'Rumah Tangga', kpp: 'KPP Tiban' },
          { dmz: 'DMZ Tiban Indah 06', volumeAirBacaM3: 535000, jumlahPelanggan: 25600, volumeTagihM3: 502000, selisihPersen: 6.2, kategori: 'Rumah Tangga', kpp: 'KPP Tiban' },
          { dmz: 'DMZ Kabil Industrial 07', volumeAirBacaM3: 512000, jumlahPelanggan: 8400, volumeTagihM3: 492000, selisihPersen: 3.9, kategori: 'Industri', kpp: 'KPP Batam Centre' },
          { dmz: 'DMZ Bengkong Kolam 08', volumeAirBacaM3: 480000, jumlahPelanggan: 24200, volumeTagihM3: 445000, selisihPersen: 7.3, kategori: 'Rumah Tangga', kpp: 'KPP Nagoya' },
          { dmz: 'DMZ Sei Beduk & Piayu 09', volumeAirBacaM3: 415000, jumlahPelanggan: 19800, volumeTagihM3: 388000, selisihPersen: 6.5, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Nongsa Heritage 10', volumeAirBacaM3: 360000, jumlahPelanggan: 12100, volumeTagihM3: 342000, selisihPersen: 5.0, kategori: 'Niaga', kpp: 'KPP Batam Centre' },
        ],
        Jan: [
          { dmz: 'DMZ Batam Centre 01', volumeAirBacaM3: 920000, jumlahPelanggan: 38100, volumeTagihM3: 860000, selisihPersen: 6.5, kategori: 'Rumah Tangga', kpp: 'KPP Batam Centre' },
          { dmz: 'DMZ Nagoya Hub 02', volumeAirBacaM3: 845000, jumlahPelanggan: 27400, volumeTagihM3: 800000, selisihPersen: 5.3, kategori: 'Niaga', kpp: 'KPP Nagoya' },
          { dmz: 'DMZ Batu Aji Raya 03', volumeAirBacaM3: 775000, jumlahPelanggan: 41900, volumeTagihM3: 718000, selisihPersen: 7.4, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Sagulung Permai 04', volumeAirBacaM3: 670000, jumlahPelanggan: 36600, volumeTagihM3: 622000, selisihPersen: 7.2, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Sekupang Marina 05', volumeAirBacaM3: 575000, jumlahPelanggan: 22300, volumeTagihM3: 542000, selisihPersen: 5.7, kategori: 'Rumah Tangga', kpp: 'KPP Tiban' },
          { dmz: 'DMZ Tiban Indah 06', volumeAirBacaM3: 520000, jumlahPelanggan: 25400, volumeTagihM3: 488000, selisihPersen: 6.2, kategori: 'Rumah Tangga', kpp: 'KPP Tiban' },
          { dmz: 'DMZ Kabil Industrial 07', volumeAirBacaM3: 495000, jumlahPelanggan: 8350, volumeTagihM3: 476000, selisihPersen: 3.8, kategori: 'Industri', kpp: 'KPP Batam Centre' },
          { dmz: 'DMZ Bengkong Kolam 08', volumeAirBacaM3: 468000, jumlahPelanggan: 24100, volumeTagihM3: 433000, selisihPersen: 7.5, kategori: 'Rumah Tangga', kpp: 'KPP Nagoya' },
          { dmz: 'DMZ Sei Beduk & Piayu 09', volumeAirBacaM3: 405000, jumlahPelanggan: 19650, volumeTagihM3: 378000, selisihPersen: 6.7, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Nongsa Heritage 10', volumeAirBacaM3: 350000, jumlahPelanggan: 12000, volumeTagihM3: 332000, selisihPersen: 5.1, kategori: 'Niaga', kpp: 'KPP Batam Centre' },
        ],
      },

      // ----------------------------------------------------------------------
      // KARTU 4: Kapasitas Produksi & Pemakaian Air Baku per WTP
      // ----------------------------------------------------------------------
      wtpProduksiBulanan: {
        'Semester 1': [
          { wtp: 'WTP Duriangkang', kapasitasTerpasangLps: 3000, pemakaianAirBakuLps: 2740, utilisasiPersen: 91.3, periode: 'Semester 1 2026', teknologi: 'DAF & Rapid Sand' },
          { wtp: 'WTP Mukakuning', kapasitasTerpasangLps: 600, pemakaianAirBakuLps: 545, utilisasiPersen: 90.8, periode: 'Semester 1 2026', teknologi: 'Clarifier Konvensional' },
          { wtp: 'WTP Sei Ladi', kapasitasTerpasangLps: 380, pemakaianAirBakuLps: 330, utilisasiPersen: 86.8, periode: 'Semester 1 2026', teknologi: 'Dual Media Rapid Filter' },
          { wtp: 'WTP Sei Harapan', kapasitasTerpasangLps: 210, pemakaianAirBakuLps: 182, utilisasiPersen: 86.7, periode: 'Semester 1 2026', teknologi: 'Multi-barrier Sand' },
          { wtp: 'WTP Tanjung Piayu', kapasitasTerpasangLps: 200, pemakaianAirBakuLps: 168, utilisasiPersen: 84.0, periode: 'Semester 1 2026', teknologi: 'Ultrafiltrasi Membran' },
          { wtp: 'WTP Nongsa', kapasitasTerpasangLps: 60, pemakaianAirBakuLps: 48, utilisasiPersen: 80.0, periode: 'Semester 1 2026', teknologi: 'Compact Clarifier' },
        ],
        'Semester 2': [
          { wtp: 'WTP Duriangkang', kapasitasTerpasangLps: 3200, pemakaianAirBakuLps: 2880, utilisasiPersen: 90.0, periode: 'Semester 2 2026', teknologi: 'DAF & Rapid Sand' },
          { wtp: 'WTP Mukakuning', kapasitasTerpasangLps: 650, pemakaianAirBakuLps: 585, utilisasiPersen: 90.0, periode: 'Semester 2 2026', teknologi: 'Clarifier Konvensional' },
          { wtp: 'WTP Sei Ladi', kapasitasTerpasangLps: 410, pemakaianAirBakuLps: 355, utilisasiPersen: 86.6, periode: 'Semester 2 2026', teknologi: 'Dual Media Rapid Filter' },
          { wtp: 'WTP Sei Harapan', kapasitasTerpasangLps: 230, pemakaianAirBakuLps: 196, utilisasiPersen: 85.2, periode: 'Semester 2 2026', teknologi: 'Multi-barrier Sand' },
          { wtp: 'WTP Tanjung Piayu', kapasitasTerpasangLps: 230, pemakaianAirBakuLps: 188, utilisasiPersen: 81.7, periode: 'Semester 2 2026', teknologi: 'Ultrafiltrasi Membran' },
          { wtp: 'WTP Nongsa', kapasitasTerpasangLps: 85, pemakaianAirBakuLps: 68, utilisasiPersen: 80.0, periode: 'Semester 2 2026', teknologi: 'Compact Clarifier' },
        ],
      },

      // ----------------------------------------------------------------------
      // KARTU 5: Kapasitas Tampung Waduk (Urut dari terbesar)
      // ----------------------------------------------------------------------
      wadukKapasitas: [
        { namaWaduk: 'Waduk Duriangkang', kapasitasJutaM3: 78.5, luasPermukaanHa: 2450, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal (Elevasi +7.2m)', elevasiMukaAirM: 7.2 },
        { namaWaduk: 'Waduk Tembesi', kapasitasJutaM3: 56.0, luasPermukaanHa: 1200, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal (Elevasi +4.8m)', elevasiMukaAirM: 4.8 },
        { namaWaduk: 'Waduk Mukakuning', kapasitasJutaM3: 12.3, luasPermukaanHa: 460, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal (Elevasi +11.4m)', elevasiMukaAirM: 11.4 },
        { namaWaduk: 'Waduk Sei Ladi', kapasitasJutaM3: 9.5, luasPermukaanHa: 380, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal (Elevasi +9.8m)', elevasiMukaAirM: 9.8 },
        { namaWaduk: 'Waduk Sei Harapan', kapasitasJutaM3: 3.6, luasPermukaanHa: 190, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal (Elevasi +14.2m)', elevasiMukaAirM: 14.2 },
        { namaWaduk: 'Waduk Nongsa', kapasitasJutaM3: 0.8, luasPermukaanHa: 95, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal (Elevasi +6.5m)', elevasiMukaAirM: 6.5 },
      ],

      // ----------------------------------------------------------------------
      // KARTU 6: Pengolahan Limbah B3 di KPLI Kabil
      // ----------------------------------------------------------------------
      limbahB3Kpli: [
        { bulan: 'Jan', padatTon: 620, sludgeTon: 410, cairTon: 215, totalTon: 1245, persenDiolah: 99.4, perusahaanTerbanyak: 'PT McDermott Indonesia', targetPersen: 98.0 },
        { bulan: 'Feb', padatTon: 585, sludgeTon: 395, cairTon: 205, totalTon: 1185, persenDiolah: 99.2, perusahaanTerbanyak: 'PT Schneider Electric', targetPersen: 98.0 },
        { bulan: 'Mar', padatTon: 660, sludgeTon: 435, cairTon: 230, totalTon: 1325, persenDiolah: 99.5, perusahaanTerbanyak: 'PT SMOE Indonesia', targetPersen: 98.0 },
        { bulan: 'Apr', padatTon: 635, sludgeTon: 420, cairTon: 220, totalTon: 1275, persenDiolah: 99.1, perusahaanTerbanyak: 'PT Caterpillar Indonesia', targetPersen: 98.0 },
        { bulan: 'Mei', padatTon: 680, sludgeTon: 450, cairTon: 240, totalTon: 1370, persenDiolah: 99.6, perusahaanTerbanyak: 'PT Infineon Technologies', targetPersen: 98.0 },
        { bulan: 'Jun', padatTon: 650, sludgeTon: 430, cairTon: 225, totalTon: 1305, persenDiolah: 98.9, perusahaanTerbanyak: 'PT Citra Tubindo Tbk', targetPersen: 98.0 },
        { bulan: 'Jul', padatTon: 695, sludgeTon: 460, cairTon: 245, totalTon: 1400, persenDiolah: 99.7, perusahaanTerbanyak: 'PT McDermott Indonesia', targetPersen: 98.0 },
        { bulan: 'Agu', padatTon: 670, sludgeTon: 445, cairTon: 235, totalTon: 1350, persenDiolah: 99.3, perusahaanTerbanyak: 'PT Pegatron Technology', targetPersen: 98.0 },
        { bulan: 'Sep', padatTon: 655, sludgeTon: 435, cairTon: 230, totalTon: 1320, persenDiolah: 99.0, perusahaanTerbanyak: 'PT Shimano Batam', targetPersen: 98.0 },
        { bulan: 'Okt', padatTon: 710, sludgeTon: 470, cairTon: 250, totalTon: 1430, persenDiolah: 99.8, perusahaanTerbanyak: 'PT SMOE Indonesia', targetPersen: 98.0 },
        { bulan: 'Nov', padatTon: 685, sludgeTon: 455, cairTon: 240, totalTon: 1380, persenDiolah: 99.4, perusahaanTerbanyak: 'PT Schneider Electric', targetPersen: 98.0 },
        { bulan: 'Des', padatTon: 730, sludgeTon: 485, cairTon: 260, totalTon: 1475, persenDiolah: 99.9, perusahaanTerbanyak: 'PT McDermott Indonesia', targetPersen: 98.0 },
      ],

      // ----------------------------------------------------------------------
      // KARTU 7: Layanan Limbah Domestik (IPLT & Sedot Tinja)
      // ----------------------------------------------------------------------
      layananLimbahDomestik: [
        {
          bulan: 'Jan',
          limbahDomestikUmum: 135,
          pengurasanSumurTinja: 142,
          pengurasanAsetBpBatam: 35,
          totalPesanan: 312,
          totalVolumeM3: 1560,
          jumlahRupiah: 187200000,
          trip: 390,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 110, volumeM3: 550 },
            'Zona Sekupang': { pesanan: 75, volumeM3: 375 },
            'Zona Batu Aji': { pesanan: 68, volumeM3: 340 },
            'Zona Nongsa': { pesanan: 32, volumeM3: 160 },
            'Zona Bengkong': { pesanan: 27, volumeM3: 135 },
          },
        },
        {
          bulan: 'Feb',
          limbahDomestikUmum: 128,
          pengurasanSumurTinja: 136,
          pengurasanAsetBpBatam: 30,
          totalPesanan: 294,
          totalVolumeM3: 1470,
          jumlahRupiah: 176400000,
          trip: 368,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 104, volumeM3: 520 },
            'Zona Sekupang': { pesanan: 70, volumeM3: 350 },
            'Zona Batu Aji': { pesanan: 64, volumeM3: 320 },
            'Zona Nongsa': { pesanan: 30, volumeM3: 150 },
            'Zona Bengkong': { pesanan: 26, volumeM3: 130 },
          },
        },
        {
          bulan: 'Mar',
          limbahDomestikUmum: 148,
          pengurasanSumurTinja: 155,
          pengurasanAsetBpBatam: 42,
          totalPesanan: 345,
          totalVolumeM3: 1725,
          jumlahRupiah: 207000000,
          trip: 432,
          zonaTerbanyak: 'Zona Batu Aji',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 118, volumeM3: 590 },
            'Zona Sekupang': { pesanan: 82, volumeM3: 410 },
            'Zona Batu Aji': { pesanan: 85, volumeM3: 425 },
            'Zona Nongsa': { pesanan: 34, volumeM3: 170 },
            'Zona Bengkong': { pesanan: 26, volumeM3: 130 },
          },
        },
        {
          bulan: 'Apr',
          limbahDomestikUmum: 140,
          pengurasanSumurTinja: 148,
          pengurasanAsetBpBatam: 38,
          totalPesanan: 326,
          totalVolumeM3: 1630,
          jumlahRupiah: 195600000,
          trip: 408,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 114, volumeM3: 570 },
            'Zona Sekupang': { pesanan: 78, volumeM3: 390 },
            'Zona Batu Aji': { pesanan: 76, volumeM3: 380 },
            'Zona Nongsa': { pesanan: 32, volumeM3: 160 },
            'Zona Bengkong': { pesanan: 26, volumeM3: 130 },
          },
        },
        {
          bulan: 'Mei',
          limbahDomestikUmum: 154,
          pengurasanSumurTinja: 162,
          pengurasanAsetBpBatam: 45,
          totalPesanan: 361,
          totalVolumeM3: 1805,
          jumlahRupiah: 216600000,
          trip: 452,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 125, volumeM3: 625 },
            'Zona Sekupang': { pesanan: 88, volumeM3: 440 },
            'Zona Batu Aji': { pesanan: 84, volumeM3: 420 },
            'Zona Nongsa': { pesanan: 36, volumeM3: 180 },
            'Zona Bengkong': { pesanan: 28, volumeM3: 140 },
          },
        },
        {
          bulan: 'Jun',
          limbahDomestikUmum: 146,
          pengurasanSumurTinja: 152,
          pengurasanAsetBpBatam: 40,
          totalPesanan: 338,
          totalVolumeM3: 1690,
          jumlahRupiah: 202800000,
          trip: 423,
          zonaTerbanyak: 'Zona Sekupang',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 116, volumeM3: 580 },
            'Zona Sekupang': { pesanan: 85, volumeM3: 425 },
            'Zona Batu Aji': { pesanan: 78, volumeM3: 390 },
            'Zona Nongsa': { pesanan: 33, volumeM3: 165 },
            'Zona Bengkong': { pesanan: 26, volumeM3: 130 },
          },
        },
        {
          bulan: 'Jul',
          limbahDomestikUmum: 158,
          pengurasanSumurTinja: 168,
          pengurasanAsetBpBatam: 48,
          totalPesanan: 374,
          totalVolumeM3: 1870,
          jumlahRupiah: 224400000,
          trip: 468,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 130, volumeM3: 650 },
            'Zona Sekupang': { pesanan: 90, volumeM3: 450 },
            'Zona Batu Aji': { pesanan: 88, volumeM3: 440 },
            'Zona Nongsa': { pesanan: 38, volumeM3: 190 },
            'Zona Bengkong': { pesanan: 28, volumeM3: 140 },
          },
        },
        {
          bulan: 'Agu',
          limbahDomestikUmum: 150,
          pengurasanSumurTinja: 158,
          pengurasanAsetBpBatam: 44,
          totalPesanan: 352,
          totalVolumeM3: 1760,
          jumlahRupiah: 211200000,
          trip: 440,
          zonaTerbanyak: 'Zona Batu Aji',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 122, volumeM3: 610 },
            'Zona Sekupang': { pesanan: 84, volumeM3: 420 },
            'Zona Batu Aji': { pesanan: 86, volumeM3: 430 },
            'Zona Nongsa': { pesanan: 34, volumeM3: 170 },
            'Zona Bengkong': { pesanan: 26, volumeM3: 130 },
          },
        },
        {
          bulan: 'Sep',
          limbahDomestikUmum: 144,
          pengurasanSumurTinja: 154,
          pengurasanAsetBpBatam: 41,
          totalPesanan: 339,
          totalVolumeM3: 1695,
          jumlahRupiah: 203400000,
          trip: 424,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 118, volumeM3: 590 },
            'Zona Sekupang': { pesanan: 82, volumeM3: 410 },
            'Zona Batu Aji': { pesanan: 80, volumeM3: 400 },
            'Zona Nongsa': { pesanan: 33, volumeM3: 165 },
            'Zona Bengkong': { pesanan: 26, volumeM3: 130 },
          },
        },
        {
          bulan: 'Okt',
          limbahDomestikUmum: 160,
          pengurasanSumurTinja: 172,
          pengurasanAsetBpBatam: 47,
          totalPesanan: 379,
          totalVolumeM3: 1895,
          jumlahRupiah: 227400000,
          trip: 474,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 132, volumeM3: 660 },
            'Zona Sekupang': { pesanan: 92, volumeM3: 460 },
            'Zona Batu Aji': { pesanan: 89, volumeM3: 445 },
            'Zona Nongsa': { pesanan: 38, volumeM3: 190 },
            'Zona Bengkong': { pesanan: 28, volumeM3: 140 },
          },
        },
        {
          bulan: 'Nov',
          limbahDomestikUmum: 152,
          pengurasanSumurTinja: 164,
          pengurasanAsetBpBatam: 43,
          totalPesanan: 359,
          totalVolumeM3: 1795,
          jumlahRupiah: 215400000,
          trip: 449,
          zonaTerbanyak: 'Zona Sekupang',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 124, volumeM3: 620 },
            'Zona Sekupang': { pesanan: 88, volumeM3: 440 },
            'Zona Batu Aji': { pesanan: 84, volumeM3: 420 },
            'Zona Nongsa': { pesanan: 35, volumeM3: 175 },
            'Zona Bengkong': { pesanan: 28, volumeM3: 140 },
          },
        },
        {
          bulan: 'Des',
          limbahDomestikUmum: 165,
          pengurasanSumurTinja: 178,
          pengurasanAsetBpBatam: 50,
          totalPesanan: 393,
          totalVolumeM3: 1965,
          jumlahRupiah: 235800000,
          trip: 492,
          zonaTerbanyak: 'Zona Batam Centre',
          zonaBreakdown: {
            'Zona Batam Centre': { pesanan: 138, volumeM3: 690 },
            'Zona Sekupang': { pesanan: 96, volumeM3: 480 },
            'Zona Batu Aji': { pesanan: 92, volumeM3: 460 },
            'Zona Nongsa': { pesanan: 39, volumeM3: 195 },
            'Zona Bengkong': { pesanan: 28, volumeM3: 140 },
          },
        },
      ],

      // ----------------------------------------------------------------------
      // KARTU 8: Layanan Pengujian Laboratorium Lingkungan & Air
      // ----------------------------------------------------------------------
      pengujianLab: [
        {
          bulan: 'Jan',
          sampelUji: 142,
          biayaRetribusiRp: 113600000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Moya Batam SPAM',
          jenisBreakdown: {
            'Fisika-Kimia Air': 82,
            'Mikrobiologi Air': 38,
            'Uji Air Limbah B3': 22,
          },
        },
        {
          bulan: 'Feb',
          sampelUji: 135,
          biayaRetribusiRp: 108000000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT McDermott Indonesia',
          jenisBreakdown: {
            'Fisika-Kimia Air': 76,
            'Mikrobiologi Air': 37,
            'Uji Air Limbah B3': 22,
          },
        },
        {
          bulan: 'Mar',
          sampelUji: 158,
          biayaRetribusiRp: 126400000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Batamindo Investment',
          jenisBreakdown: {
            'Fisika-Kimia Air': 90,
            'Mikrobiologi Air': 42,
            'Uji Air Limbah B3': 26,
          },
        },
        {
          bulan: 'Apr',
          sampelUji: 150,
          biayaRetribusiRp: 120000000,
          jenisTerbanyak: 'Mikrobiologi Air Minum',
          perusahaanTerbanyak: 'Dinas Lingkungan Hidup Batam',
          jenisBreakdown: {
            'Fisika-Kimia Air': 84,
            'Mikrobiologi Air': 41,
            'Uji Air Limbah B3': 25,
          },
        },
        {
          bulan: 'Mei',
          sampelUji: 165,
          biayaRetribusiRp: 132000000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Schneider Electric Batam',
          jenisBreakdown: {
            'Fisika-Kimia Air': 94,
            'Mikrobiologi Air': 44,
            'Uji Air Limbah B3': 27,
          },
        },
        {
          bulan: 'Jun',
          sampelUji: 156,
          biayaRetribusiRp: 124800000,
          jenisTerbanyak: 'Uji Air Limbah B3',
          perusahaanTerbanyak: 'PT SMOE Indonesia',
          jenisBreakdown: {
            'Fisika-Kimia Air': 88,
            'Mikrobiologi Air': 42,
            'Uji Air Limbah B3': 26,
          },
        },
        {
          bulan: 'Jul',
          sampelUji: 172,
          biayaRetribusiRp: 137600000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Moya Batam SPAM',
          jenisBreakdown: {
            'Fisika-Kimia Air': 98,
            'Mikrobiologi Air': 46,
            'Uji Air Limbah B3': 28,
          },
        },
        {
          bulan: 'Agu',
          sampelUji: 162,
          biayaRetribusiRp: 129600000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Citra Tubindo Tbk',
          jenisBreakdown: {
            'Fisika-Kimia Air': 92,
            'Mikrobiologi Air': 43,
            'Uji Air Limbah B3': 27,
          },
        },
        {
          bulan: 'Sep',
          sampelUji: 154,
          biayaRetribusiRp: 123200000,
          jenisTerbanyak: 'Mikrobiologi Air Minum',
          perusahaanTerbanyak: 'PT Caterpillar Indonesia Batam',
          jenisBreakdown: {
            'Fisika-Kimia Air': 86,
            'Mikrobiologi Air': 42,
            'Uji Air Limbah B3': 26,
          },
        },
        {
          bulan: 'Okt',
          sampelUji: 175,
          biayaRetribusiRp: 140000000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Moya Batam SPAM',
          jenisBreakdown: {
            'Fisika-Kimia Air': 100,
            'Mikrobiologi Air': 47,
            'Uji Air Limbah B3': 28,
          },
        },
        {
          bulan: 'Nov',
          sampelUji: 168,
          biayaRetribusiRp: 134400000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Pegatron Technology',
          jenisBreakdown: {
            'Fisika-Kimia Air': 95,
            'Mikrobiologi Air': 45,
            'Uji Air Limbah B3': 28,
          },
        },
        {
          bulan: 'Des',
          sampelUji: 182,
          biayaRetribusiRp: 145600000,
          jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum',
          perusahaanTerbanyak: 'PT Batamindo Investment',
          jenisBreakdown: {
            'Fisika-Kimia Air': 104,
            'Mikrobiologi Air': 49,
            'Uji Air Limbah B3': 29,
          },
        },
      ],
    },

    2025: {
      bakuCurahBatamindo: [
        { bulan: 'Jan', airBakuM3: 11840000, airCurahM3: 10420000, penyediaanBatamindoM3: 312500, nomorBA: 'BA-AB/01/SPAM/2025' },
        { bulan: 'Feb', airBakuM3: 11120000, airCurahM3: 9840000, penyediaanBatamindoM3: 298400, nomorBA: 'BA-AB/02/SPAM/2025' },
        { bulan: 'Mar', airBakuM3: 12150000, airCurahM3: 10750000, penyediaanBatamindoM3: 325600, nomorBA: 'BA-AB/03/SPAM/2025' },
        { bulan: 'Apr', airBakuM3: 11980000, airCurahM3: 10580000, penyediaanBatamindoM3: 319200, nomorBA: 'BA-AB/04/SPAM/2025' },
        { bulan: 'Mei', airBakuM3: 12350000, airCurahM3: 10920000, penyediaanBatamindoM3: 334100, nomorBA: 'BA-AB/05/SPAM/2025' },
        { bulan: 'Jun', airBakuM3: 12050000, airCurahM3: 10660000, penyediaanBatamindoM3: 328700, nomorBA: 'BA-AB/06/SPAM/2025' },
        { bulan: 'Jul', airBakuM3: 12500000, airCurahM3: 11050000, penyediaanBatamindoM3: 341200, nomorBA: 'BA-AB/07/SPAM/2025' },
        { bulan: 'Agu', airBakuM3: 12280000, airCurahM3: 10860000, penyediaanBatamindoM3: 338900, nomorBA: 'BA-AB/08/SPAM/2025' },
        { bulan: 'Sep', airBakuM3: 12120000, airCurahM3: 10710000, penyediaanBatamindoM3: 331400, nomorBA: 'BA-AB/09/SPAM/2025' },
        { bulan: 'Okt', airBakuM3: 12450000, airCurahM3: 11010000, penyediaanBatamindoM3: 345000, nomorBA: 'BA-AB/10/SPAM/2025' },
        { bulan: 'Nov', airBakuM3: 12200000, airCurahM3: 10790000, penyediaanBatamindoM3: 339800, nomorBA: 'BA-AB/11/SPAM/2025' },
        { bulan: 'Des', airBakuM3: 12680000, airCurahM3: 11210000, penyediaanBatamindoM3: 352100, nomorBA: 'BA-AB/12/SPAM/2025' },
      ],

      nrwTriwulan: [
        { triwulan: 'Triwulan I (Q1)', tahun2026: 24.2, tahun2025: 26.5, target: 25.0, deltaVsPrevQ: 0.3, catatan: 'Tingginya kebocoran jaringan di Nagoya' },
        { triwulan: 'Triwulan II (Q2)', tahun2026: 23.8, tahun2025: 25.9, target: 25.0, deltaVsPrevQ: -0.6, catatan: 'Penggantian meter induk' },
        { triwulan: 'Triwulan III (Q3)', tahun2026: 23.5, tahun2025: 25.4, target: 25.0, deltaVsPrevQ: -0.5, catatan: 'Penataan DMA Sekupang' },
        { triwulan: 'Triwulan IV (Q4)', tahun2026: 23.1, tahun2025: 24.8, target: 25.0, deltaVsPrevQ: -0.6, catatan: 'Pencapaian mendekati target ambang batas' },
      ],

      dmzAirBaca: {
        Semua: [
          { dmz: 'DMZ Batam Centre 01', volumeAirBacaM3: 915000, jumlahPelanggan: 37400, volumeTagihM3: 852000, selisihPersen: 6.9, kategori: 'Rumah Tangga', kpp: 'KPP Batam Centre' },
          { dmz: 'DMZ Nagoya Hub 02', volumeAirBacaM3: 840000, jumlahPelanggan: 26800, volumeTagihM3: 792000, selisihPersen: 5.7, kategori: 'Niaga', kpp: 'KPP Nagoya' },
          { dmz: 'DMZ Batu Aji Raya 03', volumeAirBacaM3: 765000, jumlahPelanggan: 41200, volumeTagihM3: 708000, selisihPersen: 7.5, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Sagulung Permai 04', volumeAirBacaM3: 660000, jumlahPelanggan: 35900, volumeTagihM3: 612000, selisihPersen: 7.3, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Sekupang Marina 05', volumeAirBacaM3: 570000, jumlahPelanggan: 21900, volumeTagihM3: 538000, selisihPersen: 5.6, kategori: 'Rumah Tangga', kpp: 'KPP Tiban' },
          { dmz: 'DMZ Tiban Indah 06', volumeAirBacaM3: 515000, jumlahPelanggan: 25000, volumeTagihM3: 482000, selisihPersen: 6.4, kategori: 'Rumah Tangga', kpp: 'KPP Tiban' },
          { dmz: 'DMZ Kabil Industrial 07', volumeAirBacaM3: 490000, jumlahPelanggan: 8200, volumeTagihM3: 470000, selisihPersen: 4.1, kategori: 'Industri', kpp: 'KPP Batam Centre' },
          { dmz: 'DMZ Bengkong Kolam 08', volumeAirBacaM3: 462000, jumlahPelanggan: 23700, volumeTagihM3: 426000, selisihPersen: 7.8, kategori: 'Rumah Tangga', kpp: 'KPP Nagoya' },
          { dmz: 'DMZ Sei Beduk & Piayu 09', volumeAirBacaM3: 400000, jumlahPelanggan: 19300, volumeTagihM3: 372000, selisihPersen: 7.0, kategori: 'Rumah Tangga', kpp: 'KPP Batu Aji' },
          { dmz: 'DMZ Nongsa Heritage 10', volumeAirBacaM3: 345000, jumlahPelanggan: 11800, volumeTagihM3: 327000, selisihPersen: 5.2, kategori: 'Niaga', kpp: 'KPP Batam Centre' },
        ],
      },

      wtpProduksiBulanan: {
        'Semester 1': [
          { wtp: 'WTP Duriangkang', kapasitasTerpasangLps: 3000, pemakaianAirBakuLps: 2680, utilisasiPersen: 89.3, periode: 'Semester 1 2025', teknologi: 'DAF & Rapid Sand' },
          { wtp: 'WTP Mukakuning', kapasitasTerpasangLps: 600, pemakaianAirBakuLps: 535, utilisasiPersen: 89.2, periode: 'Semester 1 2025', teknologi: 'Clarifier Konvensional' },
          { wtp: 'WTP Sei Ladi', kapasitasTerpasangLps: 380, pemakaianAirBakuLps: 320, utilisasiPersen: 84.2, periode: 'Semester 1 2025', teknologi: 'Dual Media Rapid Filter' },
          { wtp: 'WTP Sei Harapan', kapasitasTerpasangLps: 210, pemakaianAirBakuLps: 178, utilisasiPersen: 84.8, periode: 'Semester 1 2025', teknologi: 'Multi-barrier Sand' },
          { wtp: 'WTP Tanjung Piayu', kapasitasTerpasangLps: 200, pemakaianAirBakuLps: 160, utilisasiPersen: 80.0, periode: 'Semester 1 2025', teknologi: 'Ultrafiltrasi Membran' },
          { wtp: 'WTP Nongsa', kapasitasTerpasangLps: 60, pemakaianAirBakuLps: 45, utilisasiPersen: 75.0, periode: 'Semester 1 2025', teknologi: 'Compact Clarifier' },
        ],
        'Semester 2': [
          { wtp: 'WTP Duriangkang', kapasitasTerpasangLps: 3000, pemakaianAirBakuLps: 2720, utilisasiPersen: 90.7, periode: 'Semester 2 2025', teknologi: 'DAF & Rapid Sand' },
          { wtp: 'WTP Mukakuning', kapasitasTerpasangLps: 600, pemakaianAirBakuLps: 540, utilisasiPersen: 90.0, periode: 'Semester 2 2025', teknologi: 'Clarifier Konvensional' },
          { wtp: 'WTP Sei Ladi', kapasitasTerpasangLps: 380, pemakaianAirBakuLps: 325, utilisasiPersen: 85.5, periode: 'Semester 2 2025', teknologi: 'Dual Media Rapid Filter' },
          { wtp: 'WTP Sei Harapan', kapasitasTerpasangLps: 210, pemakaianAirBakuLps: 180, utilisasiPersen: 85.7, periode: 'Semester 2 2025', teknologi: 'Multi-barrier Sand' },
          { wtp: 'WTP Tanjung Piayu', kapasitasTerpasangLps: 200, pemakaianAirBakuLps: 165, utilisasiPersen: 82.5, periode: 'Semester 2 2025', teknologi: 'Ultrafiltrasi Membran' },
          { wtp: 'WTP Nongsa', kapasitasTerpasangLps: 60, pemakaianAirBakuLps: 46, utilisasiPersen: 76.7, periode: 'Semester 2 2025', teknologi: 'Compact Clarifier' },
        ],
      },

      wadukKapasitas: [
        { namaWaduk: 'Waduk Duriangkang', kapasitasJutaM3: 78.5, luasPermukaanHa: 2450, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 7.1 },
        { namaWaduk: 'Waduk Tembesi', kapasitasJutaM3: 56.0, luasPermukaanHa: 1200, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 4.6 },
        { namaWaduk: 'Waduk Mukakuning', kapasitasJutaM3: 12.3, luasPermukaanHa: 460, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 11.2 },
        { namaWaduk: 'Waduk Sei Ladi', kapasitasJutaM3: 9.5, luasPermukaanHa: 380, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 9.6 },
        { namaWaduk: 'Waduk Sei Harapan', kapasitasJutaM3: 3.6, luasPermukaanHa: 190, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 14.0 },
        { namaWaduk: 'Waduk Nongsa', kapasitasJutaM3: 0.8, luasPermukaanHa: 95, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 6.3 },
      ],

      limbahB3Kpli: [
        { bulan: 'Jan', padatTon: 590, sludgeTon: 390, cairTon: 205, totalTon: 1185, persenDiolah: 99.1, perusahaanTerbanyak: 'PT McDermott Indonesia', targetPersen: 98.0 },
        { bulan: 'Feb', padatTon: 560, sludgeTon: 375, cairTon: 195, totalTon: 1130, persenDiolah: 98.9, perusahaanTerbanyak: 'PT Schneider Electric', targetPersen: 98.0 },
        { bulan: 'Mar', padatTon: 630, sludgeTon: 415, cairTon: 220, totalTon: 1265, persenDiolah: 99.2, perusahaanTerbanyak: 'PT SMOE Indonesia', targetPersen: 98.0 },
        { bulan: 'Apr', padatTon: 605, sludgeTon: 400, cairTon: 210, totalTon: 1215, persenDiolah: 98.8, perusahaanTerbanyak: 'PT Caterpillar Indonesia', targetPersen: 98.0 },
        { bulan: 'Mei', padatTon: 650, sludgeTon: 430, cairTon: 230, totalTon: 1310, persenDiolah: 99.3, perusahaanTerbanyak: 'PT Infineon Technologies', targetPersen: 98.0 },
        { bulan: 'Jun', padatTon: 620, sludgeTon: 410, cairTon: 215, totalTon: 1245, persenDiolah: 98.7, perusahaanTerbanyak: 'PT Citra Tubindo Tbk', targetPersen: 98.0 },
        { bulan: 'Jul', padatTon: 665, sludgeTon: 440, cairTon: 235, totalTon: 1340, persenDiolah: 99.4, perusahaanTerbanyak: 'PT McDermott Indonesia', targetPersen: 98.0 },
        { bulan: 'Agu', padatTon: 640, sludgeTon: 425, cairTon: 225, totalTon: 1290, persenDiolah: 99.1, perusahaanTerbanyak: 'PT Pegatron Technology', targetPersen: 98.0 },
        { bulan: 'Sep', padatTon: 625, sludgeTon: 415, cairTon: 220, totalTon: 1260, persenDiolah: 98.9, perusahaanTerbanyak: 'PT Shimano Batam', targetPersen: 98.0 },
        { bulan: 'Okt', padatTon: 680, sludgeTon: 450, cairTon: 240, totalTon: 1370, persenDiolah: 99.5, perusahaanTerbanyak: 'PT SMOE Indonesia', targetPersen: 98.0 },
        { bulan: 'Nov', padatTon: 655, sludgeTon: 435, cairTon: 230, totalTon: 1320, persenDiolah: 99.2, perusahaanTerbanyak: 'PT Schneider Electric', targetPersen: 98.0 },
        { bulan: 'Des', padatTon: 700, sludgeTon: 465, cairTon: 250, totalTon: 1415, persenDiolah: 99.7, perusahaanTerbanyak: 'PT McDermott Indonesia', targetPersen: 98.0 },
      ],

      layananLimbahDomestik: [
        {
          bulan: 'Jan',
          limbahDomestikUmum: 125,
          pengurasanSumurTinja: 130,
          pengurasanAsetBpBatam: 30,
          totalPesanan: 285,
          totalVolumeM3: 1425,
          jumlahRupiah: 171000000,
          trip: 356,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Feb',
          limbahDomestikUmum: 118,
          pengurasanSumurTinja: 124,
          pengurasanAsetBpBatam: 28,
          totalPesanan: 270,
          totalVolumeM3: 1350,
          jumlahRupiah: 162000000,
          trip: 338,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Mar',
          limbahDomestikUmum: 136,
          pengurasanSumurTinja: 142,
          pengurasanAsetBpBatam: 36,
          totalPesanan: 314,
          totalVolumeM3: 1570,
          jumlahRupiah: 188400000,
          trip: 392,
          zonaTerbanyak: 'Zona Batu Aji',
        },
        {
          bulan: 'Apr',
          limbahDomestikUmum: 130,
          pengurasanSumurTinja: 138,
          pengurasanAsetBpBatam: 32,
          totalPesanan: 300,
          totalVolumeM3: 1500,
          jumlahRupiah: 180000000,
          trip: 375,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Mei',
          limbahDomestikUmum: 142,
          pengurasanSumurTinja: 150,
          pengurasanAsetBpBatam: 40,
          totalPesanan: 332,
          totalVolumeM3: 1660,
          jumlahRupiah: 199200000,
          trip: 415,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Jun',
          limbahDomestikUmum: 134,
          pengurasanSumurTinja: 140,
          pengurasanAsetBpBatam: 35,
          totalPesanan: 309,
          totalVolumeM3: 1545,
          jumlahRupiah: 185400000,
          trip: 386,
          zonaTerbanyak: 'Zona Sekupang',
        },
        {
          bulan: 'Jul',
          limbahDomestikUmum: 146,
          pengurasanSumurTinja: 155,
          pengurasanAsetBpBatam: 42,
          totalPesanan: 343,
          totalVolumeM3: 1715,
          jumlahRupiah: 205800000,
          trip: 429,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Agu',
          limbahDomestikUmum: 138,
          pengurasanSumurTinja: 145,
          pengurasanAsetBpBatam: 38,
          totalPesanan: 321,
          totalVolumeM3: 1605,
          jumlahRupiah: 192600000,
          trip: 401,
          zonaTerbanyak: 'Zona Batu Aji',
        },
        {
          bulan: 'Sep',
          limbahDomestikUmum: 132,
          pengurasanSumurTinja: 140,
          pengurasanAsetBpBatam: 35,
          totalPesanan: 307,
          totalVolumeM3: 1535,
          jumlahRupiah: 184200000,
          trip: 384,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Okt',
          limbahDomestikUmum: 148,
          pengurasanSumurTinja: 158,
          pengurasanAsetBpBatam: 42,
          totalPesanan: 348,
          totalVolumeM3: 1740,
          jumlahRupiah: 208800000,
          trip: 435,
          zonaTerbanyak: 'Zona Batam Centre',
        },
        {
          bulan: 'Nov',
          limbahDomestikUmum: 140,
          pengurasanSumurTinja: 150,
          pengurasanAsetBpBatam: 38,
          totalPesanan: 328,
          totalVolumeM3: 1640,
          jumlahRupiah: 196800000,
          trip: 410,
          zonaTerbanyak: 'Zona Sekupang',
        },
        {
          bulan: 'Des',
          limbahDomestikUmum: 152,
          pengurasanSumurTinja: 164,
          pengurasanAsetBpBatam: 45,
          totalPesanan: 361,
          totalVolumeM3: 1805,
          jumlahRupiah: 216600000,
          trip: 451,
          zonaTerbanyak: 'Zona Batam Centre',
        },
      ],

      pengujianLab: [
        { bulan: 'Jan', sampelUji: 130, biayaRetribusiRp: 104000000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Moya Batam SPAM' },
        { bulan: 'Feb', sampelUji: 122, biayaRetribusiRp: 97600000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT McDermott Indonesia' },
        { bulan: 'Mar', sampelUji: 145, biayaRetribusiRp: 116000000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Batamindo Investment' },
        { bulan: 'Apr', sampelUji: 138, biayaRetribusiRp: 110400000, jenisTerbanyak: 'Mikrobiologi Air Minum', perusahaanTerbanyak: 'Dinas Lingkungan Hidup Batam' },
        { bulan: 'Mei', sampelUji: 152, biayaRetribusiRp: 121600000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Schneider Electric Batam' },
        { bulan: 'Jun', sampelUji: 142, biayaRetribusiRp: 113600000, jenisTerbanyak: 'Uji Air Limbah B3', perusahaanTerbanyak: 'PT SMOE Indonesia' },
        { bulan: 'Jul', sampelUji: 158, biayaRetribusiRp: 126400000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Moya Batam SPAM' },
        { bulan: 'Agu', sampelUji: 148, biayaRetribusiRp: 118400000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Citra Tubindo Tbk' },
        { bulan: 'Sep', sampelUji: 140, biayaRetribusiRp: 112000000, jenisTerbanyak: 'Mikrobiologi Air Minum', perusahaanTerbanyak: 'PT Caterpillar Indonesia Batam' },
        { bulan: 'Okt', sampelUji: 160, biayaRetribusiRp: 128000000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Moya Batam SPAM' },
        { bulan: 'Nov', sampelUji: 152, biayaRetribusiRp: 121600000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Pegatron Technology' },
        { bulan: 'Des', sampelUji: 166, biayaRetribusiRp: 132800000, jenisTerbanyak: 'Fisika-Kimia Air Baku/Minum', perusahaanTerbanyak: 'PT Batamindo Investment' },
      ],
    },
  },

  // Historis Waduk untuk filter multi-tahun waduk
  daftarWadukHistoris: {
    2026: [
      { namaWaduk: 'Waduk Duriangkang', kapasitasJutaM3: 78.5, luasPermukaanHa: 2450, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal', elevasiMukaAirM: 7.2 },
      { namaWaduk: 'Waduk Tembesi', kapasitasJutaM3: 56.0, luasPermukaanHa: 1200, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal', elevasiMukaAirM: 4.8 },
      { namaWaduk: 'Waduk Mukakuning', kapasitasJutaM3: 12.3, luasPermukaanHa: 460, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal', elevasiMukaAirM: 11.4 },
      { namaWaduk: 'Waduk Sei Ladi', kapasitasJutaM3: 9.5, luasPermukaanHa: 380, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal', elevasiMukaAirM: 9.8 },
      { namaWaduk: 'Waduk Sei Harapan', kapasitasJutaM3: 3.6, luasPermukaanHa: 190, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal', elevasiMukaAirM: 14.2 },
      { namaWaduk: 'Waduk Nongsa', kapasitasJutaM3: 0.8, luasPermukaanHa: 95, tahun: 2026, periodeRekap: 'Desember 2026', status: 'Normal', elevasiMukaAirM: 6.5 },
    ],
    2025: [
      { namaWaduk: 'Waduk Duriangkang', kapasitasJutaM3: 78.5, luasPermukaanHa: 2450, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 7.1 },
      { namaWaduk: 'Waduk Tembesi', kapasitasJutaM3: 56.0, luasPermukaanHa: 1200, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 4.6 },
      { namaWaduk: 'Waduk Mukakuning', kapasitasJutaM3: 12.3, luasPermukaanHa: 460, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 11.2 },
      { namaWaduk: 'Waduk Sei Ladi', kapasitasJutaM3: 9.5, luasPermukaanHa: 380, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 9.6 },
      { namaWaduk: 'Waduk Sei Harapan', kapasitasJutaM3: 3.6, luasPermukaanHa: 190, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 14.0 },
      { namaWaduk: 'Waduk Nongsa', kapasitasJutaM3: 0.8, luasPermukaanHa: 95, tahun: 2025, periodeRekap: 'Desember 2025', status: 'Normal', elevasiMukaAirM: 6.3 },
    ],
    2024: [
      { namaWaduk: 'Waduk Duriangkang', kapasitasJutaM3: 78.5, luasPermukaanHa: 2450, tahun: 2024, periodeRekap: 'Desember 2024', status: 'Normal', elevasiMukaAirM: 7.0 },
      { namaWaduk: 'Waduk Tembesi', kapasitasJutaM3: 56.0, luasPermukaanHa: 1200, tahun: 2024, periodeRekap: 'Desember 2024', status: 'Normal', elevasiMukaAirM: 4.4 },
      { namaWaduk: 'Waduk Mukakuning', kapasitasJutaM3: 12.3, luasPermukaanHa: 460, tahun: 2024, periodeRekap: 'Desember 2024', status: 'Normal', elevasiMukaAirM: 11.0 },
      { namaWaduk: 'Waduk Sei Ladi', kapasitasJutaM3: 9.5, luasPermukaanHa: 380, tahun: 2024, periodeRekap: 'Desember 2024', status: 'Normal', elevasiMukaAirM: 9.5 },
      { namaWaduk: 'Waduk Sei Harapan', kapasitasJutaM3: 3.6, luasPermukaanHa: 190, tahun: 2024, periodeRekap: 'Desember 2024', status: 'Normal', elevasiMukaAirM: 13.8 },
      { namaWaduk: 'Waduk Nongsa', kapasitasJutaM3: 0.8, luasPermukaanHa: 95, tahun: 2024, periodeRekap: 'Desember 2024', status: 'Normal', elevasiMukaAirM: 6.1 },
    ],
    2023: [
      { namaWaduk: 'Waduk Duriangkang', kapasitasJutaM3: 78.5, luasPermukaanHa: 2450, tahun: 2023, periodeRekap: 'Desember 2023', status: 'Normal', elevasiMukaAirM: 6.9 },
      { namaWaduk: 'Waduk Tembesi', kapasitasJutaM3: 56.0, luasPermukaanHa: 1200, tahun: 2023, periodeRekap: 'Desember 2023', status: 'Normal', elevasiMukaAirM: 4.2 },
      { namaWaduk: 'Waduk Mukakuning', kapasitasJutaM3: 12.3, luasPermukaanHa: 460, tahun: 2023, periodeRekap: 'Desember 2023', status: 'Normal', elevasiMukaAirM: 10.9 },
      { namaWaduk: 'Waduk Sei Ladi', kapasitasJutaM3: 9.5, luasPermukaanHa: 380, tahun: 2023, periodeRekap: 'Desember 2023', status: 'Normal', elevasiMukaAirM: 9.4 },
      { namaWaduk: 'Waduk Sei Harapan', kapasitasJutaM3: 3.6, luasPermukaanHa: 190, tahun: 2023, periodeRekap: 'Desember 2023', status: 'Normal', elevasiMukaAirM: 13.5 },
      { namaWaduk: 'Waduk Nongsa', kapasitasJutaM3: 0.8, luasPermukaanHa: 95, tahun: 2023, periodeRekap: 'Desember 2023', status: 'Normal', elevasiMukaAirM: 6.0 },
    ],
  },
};
