/**
 * Master Data Dummy Visualisasi Direktorat Pembangunan Infrastruktur BP Batam
 * (Deputi Bidang Infrastruktur - DEP A7)
 *
 * Tersimpan dalam satu objek JSON terpadu agar mudah disubstitusi dengan data riil API/database.
 *
 * PERINGATAN INTEGRITAS & PRIVASI:
 * - Tidak menampilkan nilai PNBP rupiah dari perizinan.
 * - Tidak menampilkan data pribadi pemohon (nama, NIK, NIB, kontak).
 * - Dataset spasial hanya digunakan atribut tabularnya, tanpa visualisasi peta.
 */

// KARTU 1 & 2: Row Utilitas
export interface RowUtilitasBulananItem {
  bulan: string;
  fiberOptik: number;
  listrik: number;
  air: number;
  gas: number;
  telekomunikasi: number;
  totalIzin: number;
  totalGalianMeter: number;
  lokasiTerbanyak: string;
}

export interface RowGalianJenisItem {
  jenisUtilitas: 'Fiber Optik' | 'Jaringan Listrik' | 'Pipa Air Bersih' | 'Pipa Gas Bumi' | 'Telekomunikasi Seluler';
  galianTerbukaM: number;
  galianCrossingM: number;
  totalGalianM: number;
  lokasiDominan: string;
  izinAkanBerakhir90Hari: number; // Jumlah izin yang akan berakhir dalam 90 hari
}

// KARTU 3: Row Penghijauan
export interface RowPenghijauanBulananItem {
  bulan: string;
  tamanM2: number;
  medianM2: number;
  potGantungM2: number;
  pohonPeneduhM2: number;
  totalLuasM2: number;
  jumlahIzin: number;
  lokasiTerbanyak: string;
}

// KARTU 4: Jaringan Jalan Eksisting
export interface KondisiJalanItem {
  kelasJalan: 'Jalan Arteri' | 'Jalan Kolektor' | 'Jalan Lokal' | 'Jalan Lingkungan';
  baikKm: number;
  sedangKm: number;
  rusakRinganKm: number;
  rusakBeratKm: number;
  totalPanjangKm: number;
  lebarRataRataMeter: number;
  materialPerkerasan: string;
}

// KARTU 5: Paket Pembangunan Infrastruktur per Kategori
export interface PaketKategoriPekerjaanItem {
  kategoriPekerjaan: 'Konektivitas & Transportasi' | 'Pengendalian Banjir' | 'Fasilitas Publik & Gedung' | 'Pengembangan Kawasan Industri';
  subdit: 'Pembangunan Jalan dan Jembatan' | 'Pembangunan Drainase' | 'Pembangunan Gedung' | 'Pematangan Tanah';
  nilaiPaguM: number;
  nilaiHpsM: number;
  nilaiKontrakM: number;
  jumlahPaket: number;
  jenisPekerjaanUtama: string;
  efisiensiTenderPct: number; // Selisih pagu thd kontrak (%)
}

// KARTU 6: Paket Pematangan Tanah (BSW)
export interface PaketBswItem {
  id: string;
  namaPaket: string;
  kategoriPekerjaan: 'Kawasan Industri' | 'Pemukiman Relokasi' | 'Pelabuhan & Logistik' | 'Fasilitas Bandara';
  ppk: string;
  kontraktor: string;
  nilaiKontrakM: number;
  volumePekerjaanM3: number;
  progresPersen: number;
}

export interface MasterPembangunanInfrastrukturData {
  metadata: {
    unit: string;
    deputi: string;
    tahunList: string[];
    wilayahList: string[];
    subditList: string[];
    kategoriBswList: string[];
  };

  // BARIS 1
  rowUtilitasPerTahun: Record<string, RowUtilitasBulananItem[]>;
  panjangGalianPerTahun: Record<string, Record<string, RowGalianJenisItem[]>>; // [tahun][bulan]

  // BARIS 2
  rowPenghijauanPerTahun: Record<string, RowPenghijauanBulananItem[]>;
  kondisiJalanPerWilayah: Record<string, KondisiJalanItem[]>;

  // BARIS 3
  paketInfrastrukturPerTahun: Record<string, PaketKategoriPekerjaanItem[]>;
  paketBswPerTahun: Record<string, PaketBswItem[]>;
}

export const PEMBANGUNAN_INFRASTRUKTUR_MASTER_DATA: MasterPembangunanInfrastrukturData = {
  metadata: {
    unit: 'Direktorat Pembangunan Infrastruktur',
    deputi: 'Anggota/Deputi Bidang Infrastruktur (DEP A7)',
    tahunList: ['2026', '2025', '2024'],
    wilayahList: ['Semua Wilayah', 'Batam Kota', 'Batu Ampar', 'Sekupang', 'Nongsa', 'Batu Aji', 'Sagulung'],
    subditList: ['Semua Subdit', 'Pembangunan Jalan dan Jembatan', 'Pembangunan Drainase', 'Pembangunan Gedung', 'Pematangan Tanah'],
    kategoriBswList: ['Semua Kategori', 'Kawasan Industri', 'Pemukiman Relokasi', 'Pelabuhan & Logistik', 'Fasilitas Bandara'],
  },

  // =========================================================================
  // BARIS 1 - KARTU 1: Perizinan Pemanfaatan ROW untuk Utilitas (Bulanan)
  // =========================================================================
  rowUtilitasPerTahun: {
    '2026': [
      { bulan: 'Jan', fiberOptik: 8, listrik: 5, air: 4, gas: 2, telekomunikasi: 3, totalIzin: 22, totalGalianMeter: 3850, lokasiTerbanyak: 'Jl. Sudirman & Batam Centre' },
      { bulan: 'Feb', fiberOptik: 9, listrik: 6, air: 3, gas: 2, telekomunikasi: 4, totalIzin: 24, totalGalianMeter: 4120, lokasiTerbanyak: 'Kawasan KEK Nongsa Digital' },
      { bulan: 'Mar', fiberOptik: 11, listrik: 7, air: 5, gas: 3, telekomunikasi: 4, totalIzin: 30, totalGalianMeter: 5240, lokasiTerbanyak: 'Jl. Ahmad Yani & Panbil' },
      { bulan: 'Apr', fiberOptik: 10, listrik: 6, air: 4, gas: 3, telekomunikasi: 5, totalIzin: 28, totalGalianMeter: 4890, lokasiTerbanyak: 'Batu Ampar - Seraya' },
      { bulan: 'Mei', fiberOptik: 8, listrik: 5, air: 4, gas: 2, telekomunikasi: 3, totalIzin: 22, totalGalianMeter: 3750, lokasiTerbanyak: 'Sei Ladi - Sekupang' },
      { bulan: 'Jun', fiberOptik: 12, listrik: 8, air: 5, gas: 4, telekomunikasi: 4, totalIzin: 33, totalGalianMeter: 5800, lokasiTerbanyak: 'Kabil Industrial Estate' },
      { bulan: 'Jul', fiberOptik: 10, listrik: 7, air: 4, gas: 3, telekomunikasi: 5, totalIzin: 29, totalGalianMeter: 5120, lokasiTerbanyak: 'Jl. Gajah Mada Tiban' },
      { bulan: 'Agu', fiberOptik: 9, listrik: 6, air: 5, gas: 2, telekomunikasi: 4, totalIzin: 26, totalGalianMeter: 4450, lokasiTerbanyak: 'Batu Aji - Tanjung Uncang' },
      { bulan: 'Sep', fiberOptik: 11, listrik: 7, air: 4, gas: 3, telekomunikasi: 4, totalIzin: 29, totalGalianMeter: 5020, lokasiTerbanyak: 'Bandara Hang Nadim Koridor' },
      { bulan: 'Okt', fiberOptik: 13, listrik: 8, air: 6, gas: 3, telekomunikasi: 5, totalIzin: 35, totalGalianMeter: 6150, lokasiTerbanyak: 'Batam Centre - Engku Putri' },
      { bulan: 'Nov', fiberOptik: 9, listrik: 5, air: 4, gas: 2, telekomunikasi: 4, totalIzin: 24, totalGalianMeter: 4180, lokasiTerbanyak: 'Piayu & Mukakuning' },
      { bulan: 'Des', fiberOptik: 10, listrik: 6, air: 5, gas: 3, telekomunikasi: 4, totalIzin: 28, totalGalianMeter: 4900, lokasiTerbanyak: 'Kawasan Barelang Simpang' },
    ],
    '2025': [
      { bulan: 'Jan', fiberOptik: 7, listrik: 4, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 19, totalGalianMeter: 3300, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Feb', fiberOptik: 8, listrik: 5, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 21, totalGalianMeter: 3650, lokasiTerbanyak: 'Nongsa' },
      { bulan: 'Mar', fiberOptik: 9, listrik: 6, air: 4, gas: 2, telekomunikasi: 4, totalIzin: 25, totalGalianMeter: 4300, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Apr', fiberOptik: 9, listrik: 5, air: 4, gas: 2, telekomunikasi: 4, totalIzin: 24, totalGalianMeter: 4150, lokasiTerbanyak: 'Batu Ampar' },
      { bulan: 'Mei', fiberOptik: 7, listrik: 4, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 19, totalGalianMeter: 3250, lokasiTerbanyak: 'Sekupang' },
      { bulan: 'Jun', fiberOptik: 10, listrik: 6, air: 4, gas: 3, telekomunikasi: 4, totalIzin: 27, totalGalianMeter: 4700, lokasiTerbanyak: 'Kabil' },
      { bulan: 'Jul', fiberOptik: 9, listrik: 6, air: 4, gas: 2, telekomunikasi: 4, totalIzin: 25, totalGalianMeter: 4350, lokasiTerbanyak: 'Tiban' },
      { bulan: 'Agu', fiberOptik: 8, listrik: 5, air: 4, gas: 2, telekomunikasi: 3, totalIzin: 22, totalGalianMeter: 3800, lokasiTerbanyak: 'Batu Aji' },
      { bulan: 'Sep', fiberOptik: 9, listrik: 6, air: 3, gas: 2, telekomunikasi: 4, totalIzin: 24, totalGalianMeter: 4100, lokasiTerbanyak: 'Hang Nadim' },
      { bulan: 'Okt', fiberOptik: 11, listrik: 7, air: 5, gas: 3, telekomunikasi: 4, totalIzin: 30, totalGalianMeter: 5200, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Nov', fiberOptik: 8, listrik: 4, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 20, totalGalianMeter: 3450, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Des', fiberOptik: 9, listrik: 5, air: 4, gas: 2, telekomunikasi: 4, totalIzin: 24, totalGalianMeter: 4100, lokasiTerbanyak: 'Barelang' },
    ],
    '2024': [
      { bulan: 'Jan', fiberOptik: 6, listrik: 4, air: 3, gas: 1, telekomunikasi: 2, totalIzin: 16, totalGalianMeter: 2800, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Feb', fiberOptik: 7, listrik: 4, air: 3, gas: 1, telekomunikasi: 3, totalIzin: 18, totalGalianMeter: 3100, lokasiTerbanyak: 'Sekupang' },
      { bulan: 'Mar', fiberOptik: 8, listrik: 5, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 21, totalGalianMeter: 3600, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Apr', fiberOptik: 8, listrik: 5, air: 4, gas: 2, telekomunikasi: 3, totalIzin: 22, totalGalianMeter: 3750, lokasiTerbanyak: 'Batu Ampar' },
      { bulan: 'Mei', fiberOptik: 6, listrik: 4, air: 3, gas: 1, telekomunikasi: 3, totalIzin: 17, totalGalianMeter: 2900, lokasiTerbanyak: 'Tiban' },
      { bulan: 'Jun', fiberOptik: 9, listrik: 5, air: 4, gas: 2, telekomunikasi: 3, totalIzin: 23, totalGalianMeter: 3950, lokasiTerbanyak: 'Kabil' },
      { bulan: 'Jul', fiberOptik: 8, listrik: 5, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 21, totalGalianMeter: 3600, lokasiTerbanyak: 'Nongsa' },
      { bulan: 'Agu', fiberOptik: 7, listrik: 4, air: 3, gas: 1, telekomunikasi: 3, totalIzin: 18, totalGalianMeter: 3100, lokasiTerbanyak: 'Batu Aji' },
      { bulan: 'Sep', fiberOptik: 8, listrik: 5, air: 4, gas: 2, telekomunikasi: 3, totalIzin: 22, totalGalianMeter: 3750, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Okt', fiberOptik: 10, listrik: 6, air: 4, gas: 2, telekomunikasi: 4, totalIzin: 26, totalGalianMeter: 4450, lokasiTerbanyak: 'Sudirman' },
      { bulan: 'Nov', fiberOptik: 7, listrik: 4, air: 3, gas: 1, telekomunikasi: 3, totalIzin: 18, totalGalianMeter: 3050, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Des', fiberOptik: 8, listrik: 5, air: 3, gas: 2, telekomunikasi: 3, totalIzin: 21, totalGalianMeter: 3550, lokasiTerbanyak: 'Barelang' },
    ],
  },

  // =========================================================================
  // BARIS 1 - KARTU 2: Panjang Galian per Jenis Utilitas (Terbuka vs Crossing)
  // =========================================================================
  panjangGalianPerTahun: {
    '2026': {
      Semua: [
        { jenisUtilitas: 'Fiber Optik', galianTerbukaM: 18450, galianCrossingM: 4200, totalGalianM: 22650, lokasiDominan: 'Jl. Sudirman, Nongsa Digital & Batam Centre', izinAkanBerakhir90Hari: 8 },
        { jenisUtilitas: 'Jaringan Listrik', galianTerbukaM: 9800, galianCrossingM: 2650, totalGalianM: 12450, lokasiDominan: 'Kabil Industrial Estate & Mukakuning', izinAkanBerakhir90Hari: 5 },
        { jenisUtilitas: 'Pipa Air Bersih', galianTerbukaM: 7200, galianCrossingM: 1850, totalGalianM: 9050, lokasiDominan: 'Sei Ladi - Tiban & Batu Aji', izinAkanBerakhir90Hari: 4 },
        { jenisUtilitas: 'Telekomunikasi Seluler', galianTerbukaM: 4600, galianCrossingM: 1120, totalGalianM: 5720, lokasiDominan: 'Batu Ampar & Nagoya', izinAkanBerakhir90Hari: 3 },
        { jenisUtilitas: 'Pipa Gas Bumi', galianTerbukaM: 2900, galianCrossingM: 850, totalGalianM: 3750, lokasiDominan: 'Kawasan Industri Tanjung Uncang', izinAkanBerakhir90Hari: 2 },
      ],
      Januari: [
        { jenisUtilitas: 'Fiber Optik', galianTerbukaM: 1550, galianCrossingM: 350, totalGalianM: 1900, lokasiDominan: 'Jl. Sudirman', izinAkanBerakhir90Hari: 1 },
        { jenisUtilitas: 'Jaringan Listrik', galianTerbukaM: 820, galianCrossingM: 220, totalGalianM: 1040, lokasiDominan: 'Kabil', izinAkanBerakhir90Hari: 0 },
        { jenisUtilitas: 'Pipa Air Bersih', galianTerbukaM: 610, galianCrossingM: 150, totalGalianM: 760, lokasiDominan: 'Sei Ladi', izinAkanBerakhir90Hari: 1 },
        { jenisUtilitas: 'Telekomunikasi Seluler', galianTerbukaM: 380, galianCrossingM: 100, totalGalianM: 480, lokasiDominan: 'Batam Centre', izinAkanBerakhir90Hari: 0 },
        { jenisUtilitas: 'Pipa Gas Bumi', galianTerbukaM: 240, galianCrossingM: 70, totalGalianM: 310, lokasiDominan: 'Tanjung Uncang', izinAkanBerakhir90Hari: 0 },
      ],
      Februari: [
        { jenisUtilitas: 'Fiber Optik', galianTerbukaM: 1680, galianCrossingM: 380, totalGalianM: 2060, lokasiDominan: 'Nongsa Digital', izinAkanBerakhir90Hari: 1 },
        { jenisUtilitas: 'Jaringan Listrik', galianTerbukaM: 880, galianCrossingM: 240, totalGalianM: 1120, lokasiDominan: 'Mukakuning', izinAkanBerakhir90Hari: 1 },
        { jenisUtilitas: 'Pipa Air Bersih', galianTerbukaM: 650, galianCrossingM: 170, totalGalianM: 820, lokasiDominan: 'Tiban', izinAkanBerakhir90Hari: 0 },
        { jenisUtilitas: 'Telekomunikasi Seluler', galianTerbukaM: 410, galianCrossingM: 110, totalGalianM: 520, lokasiDominan: 'Batu Ampar', izinAkanBerakhir90Hari: 1 },
        { jenisUtilitas: 'Pipa Gas Bumi', galianTerbukaM: 260, galianCrossingM: 80, totalGalianM: 340, lokasiDominan: 'Panbil', izinAkanBerakhir90Hari: 0 },
      ],
    },
    '2025': {
      Semua: [
        { jenisUtilitas: 'Fiber Optik', galianTerbukaM: 15800, galianCrossingM: 3600, totalGalianM: 19400, lokasiDominan: 'Batam Centre & Nagoya', izinAkanBerakhir90Hari: 6 },
        { jenisUtilitas: 'Jaringan Listrik', galianTerbukaM: 8400, galianCrossingM: 2200, totalGalianM: 10600, lokasiDominan: 'Kabil & Batamindo', izinAkanBerakhir90Hari: 4 },
        { jenisUtilitas: 'Pipa Air Bersih', galianTerbukaM: 6100, galianCrossingM: 1600, totalGalianM: 7700, lokasiDominan: 'Duriangkang - Mukakuning', izinAkanBerakhir90Hari: 3 },
        { jenisUtilitas: 'Telekomunikasi Seluler', galianTerbukaM: 3900, galianCrossingM: 950, totalGalianM: 4850, lokasiDominan: 'Sekupang & Tiban', izinAkanBerakhir90Hari: 2 },
        { jenisUtilitas: 'Pipa Gas Bumi', galianTerbukaM: 2400, galianCrossingM: 700, totalGalianM: 3100, lokasiDominan: 'Kabil', izinAkanBerakhir90Hari: 1 },
      ],
    },
  },

  // =========================================================================
  // BARIS 2 - KARTU 3: Perizinan Pemanfaatan ROW untuk Penghijauan (Bulanan)
  // =========================================================================
  rowPenghijauanPerTahun: {
    '2026': [
      { bulan: 'Jan', tamanM2: 5400, medianM2: 6800, potGantungM2: 1200, pohonPeneduhM2: 2400, totalLuasM2: 15800, jumlahIzin: 14, lokasiTerbanyak: 'Jl. Sudirman & Bundaran Madani' },
      { bulan: 'Feb', tamanM2: 5800, medianM2: 7200, potGantungM2: 1300, pohonPeneduhM2: 2600, totalLuasM2: 16900, jumlahIzin: 15, lokasiTerbanyak: 'Simpang Jam - Flyover Laluan Madani' },
      { bulan: 'Mar', tamanM2: 6400, medianM2: 7900, potGantungM2: 1450, pohonPeneduhM2: 2900, totalLuasM2: 18650, jumlahIzin: 17, lokasiTerbanyak: 'Koridor Bandara Hang Nadim' },
      { bulan: 'Apr', tamanM2: 6100, medianM2: 7500, potGantungM2: 1400, pohonPeneduhM2: 2750, totalLuasM2: 17750, jumlahIzin: 16, lokasiTerbanyak: 'Jl. Ahmad Yani Mukakuning' },
      { bulan: 'Mei', tamanM2: 5200, medianM2: 6600, potGantungM2: 1150, pohonPeneduhM2: 2350, totalLuasM2: 15300, jumlahIzin: 13, lokasiTerbanyak: 'Dataran Engku Putri Batam Centre' },
      { bulan: 'Jun', tamanM2: 6900, medianM2: 8400, potGantungM2: 1600, pohonPeneduhM2: 3200, totalLuasM2: 20100, jumlahIzin: 18, lokasiTerbanyak: 'Taman Rusa Sekupang & Marina' },
      { bulan: 'Jul', tamanM2: 6500, medianM2: 8000, potGantungM2: 1500, pohonPeneduhM2: 3000, totalLuasM2: 19000, jumlahIzin: 17, lokasiTerbanyak: 'Kawasan Pariwisata Nongsa' },
      { bulan: 'Agu', tamanM2: 5900, medianM2: 7300, potGantungM2: 1350, pohonPeneduhM2: 2700, totalLuasM2: 17250, jumlahIzin: 15, lokasiTerbanyak: 'Batu Aji - Sagulung Hijau' },
      { bulan: 'Sep', tamanM2: 6200, medianM2: 7700, potGantungM2: 1400, pohonPeneduhM2: 2850, totalLuasM2: 18150, jumlahIzin: 16, lokasiTerbanyak: 'Jl. Yos Sudarso Batu Ampar' },
      { bulan: 'Okt', tamanM2: 7200, medianM2: 8900, potGantungM2: 1700, pohonPeneduhM2: 3400, totalLuasM2: 21200, jumlahIzin: 19, lokasiTerbanyak: 'Taman Aspirasi & BIDA' },
      { bulan: 'Nov', tamanM2: 5600, medianM2: 7000, potGantungM2: 1250, pohonPeneduhM2: 2550, totalLuasM2: 16400, jumlahIzin: 14, lokasiTerbanyak: 'Tiban Raya Boulevard' },
      { bulan: 'Des', tamanM2: 6300, medianM2: 7800, potGantungM2: 1450, pohonPeneduhM2: 2950, totalLuasM2: 18500, jumlahIzin: 16, lokasiTerbanyak: 'Simpang Barelang Jembatan 1' },
    ],
    '2025': [
      { bulan: 'Jan', tamanM2: 4600, medianM2: 5800, potGantungM2: 1000, pohonPeneduhM2: 2000, totalLuasM2: 13400, jumlahIzin: 12, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Feb', tamanM2: 4900, medianM2: 6100, potGantungM2: 1100, pohonPeneduhM2: 2200, totalLuasM2: 14300, jumlahIzin: 13, lokasiTerbanyak: 'Nongsa' },
      { bulan: 'Mar', tamanM2: 5400, medianM2: 6700, potGantungM2: 1200, pohonPeneduhM2: 2450, totalLuasM2: 15750, jumlahIzin: 14, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Apr', tamanM2: 5200, medianM2: 6400, potGantungM2: 1150, pohonPeneduhM2: 2350, totalLuasM2: 15100, jumlahIzin: 13, lokasiTerbanyak: 'Batu Ampar' },
      { bulan: 'Mei', tamanM2: 4500, medianM2: 5600, potGantungM2: 950, pohonPeneduhM2: 2000, totalLuasM2: 13050, jumlahIzin: 11, lokasiTerbanyak: 'Sekupang' },
      { bulan: 'Jun', tamanM2: 5800, medianM2: 7200, potGantungM2: 1350, pohonPeneduhM2: 2700, totalLuasM2: 17050, jumlahIzin: 15, lokasiTerbanyak: 'Kabil' },
      { bulan: 'Jul', tamanM2: 5500, medianM2: 6800, potGantungM2: 1250, pohonPeneduhM2: 2550, totalLuasM2: 16100, jumlahIzin: 14, lokasiTerbanyak: 'Tiban' },
      { bulan: 'Agu', tamanM2: 5000, medianM2: 6200, potGantungM2: 1100, pohonPeneduhM2: 2300, totalLuasM2: 14600, jumlahIzin: 13, lokasiTerbanyak: 'Batu Aji' },
      { bulan: 'Sep', tamanM2: 5300, medianM2: 6500, potGantungM2: 1200, pohonPeneduhM2: 2400, totalLuasM2: 15400, jumlahIzin: 14, lokasiTerbanyak: 'Hang Nadim' },
      { bulan: 'Okt', tamanM2: 6100, medianM2: 7600, potGantungM2: 1400, pohonPeneduhM2: 2850, totalLuasM2: 17950, jumlahIzin: 16, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Nov', tamanM2: 4800, medianM2: 5900, potGantungM2: 1050, pohonPeneduhM2: 2150, totalLuasM2: 13900, jumlahIzin: 12, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Des', tamanM2: 5300, medianM2: 6600, potGantungM2: 1200, pohonPeneduhM2: 2450, totalLuasM2: 15550, jumlahIzin: 14, lokasiTerbanyak: 'Barelang' },
    ],
    '2024': [
      { bulan: 'Jan', tamanM2: 4100, medianM2: 5100, potGantungM2: 850, pohonPeneduhM2: 1800, totalLuasM2: 11850, jumlahIzin: 10, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Feb', tamanM2: 4300, medianM2: 5300, potGantungM2: 900, pohonPeneduhM2: 1900, totalLuasM2: 12400, jumlahIzin: 11, lokasiTerbanyak: 'Sekupang' },
      { bulan: 'Mar', tamanM2: 4700, medianM2: 5800, potGantungM2: 1050, pohonPeneduhM2: 2100, totalLuasM2: 13650, jumlahIzin: 12, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Apr', tamanM2: 4500, medianM2: 5600, potGantungM2: 1000, pohonPeneduhM2: 2000, totalLuasM2: 13100, jumlahIzin: 11, lokasiTerbanyak: 'Batu Ampar' },
      { bulan: 'Mei', tamanM2: 3900, medianM2: 4900, potGantungM2: 800, pohonPeneduhM2: 1750, totalLuasM2: 11350, jumlahIzin: 9, lokasiTerbanyak: 'Tiban' },
      { bulan: 'Jun', tamanM2: 5000, medianM2: 6200, potGantungM2: 1150, pohonPeneduhM2: 2300, totalLuasM2: 14650, jumlahIzin: 13, lokasiTerbanyak: 'Kabil' },
      { bulan: 'Jul', tamanM2: 4800, medianM2: 5900, potGantungM2: 1100, pohonPeneduhM2: 2200, totalLuasM2: 14000, jumlahIzin: 12, lokasiTerbanyak: 'Nongsa' },
      { bulan: 'Agu', tamanM2: 4400, medianM2: 5400, potGantungM2: 950, pohonPeneduhM2: 1950, totalLuasM2: 12700, jumlahIzin: 11, lokasiTerbanyak: 'Batu Aji' },
      { bulan: 'Sep', tamanM2: 4600, medianM2: 5700, potGantungM2: 1050, pohonPeneduhM2: 2050, totalLuasM2: 13400, jumlahIzin: 12, lokasiTerbanyak: 'Hang Nadim' },
      { bulan: 'Okt', tamanM2: 5300, medianM2: 6600, potGantungM2: 1200, pohonPeneduhM2: 2450, totalLuasM2: 15550, jumlahIzin: 14, lokasiTerbanyak: 'Batam Centre' },
      { bulan: 'Nov', tamanM2: 4200, medianM2: 5200, potGantungM2: 900, pohonPeneduhM2: 1850, totalLuasM2: 12150, jumlahIzin: 10, lokasiTerbanyak: 'Mukakuning' },
      { bulan: 'Des', tamanM2: 4600, medianM2: 5700, potGantungM2: 1050, pohonPeneduhM2: 2100, totalLuasM2: 13450, jumlahIzin: 12, lokasiTerbanyak: 'Barelang' },
    ],
  },

  // =========================================================================
  // BARIS 2 - KARTU 4: Kondisi Jaringan Jalan Eksisting (Tabular Spasial)
  // =========================================================================
  kondisiJalanPerWilayah: {
    'Semua Wilayah': [
      { kelasJalan: 'Jalan Arteri', baikKm: 184.2, sedangKm: 28.5, rusakRinganKm: 12.1, rusakBeratKm: 4.2, totalPanjangKm: 229.0, lebarRataRataMeter: 24.5, materialPerkerasan: 'Aspal Hotmix (AC-WC) 88%, Rigid Beton 12%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 142.8, sedangKm: 24.2, rusakRinganKm: 14.5, rusakBeratKm: 6.8, totalPanjangKm: 188.3, lebarRataRataMeter: 16.0, materialPerkerasan: 'Aspal Hotmix 82%, Rigid Beton 18%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 98.4, sedangKm: 18.6, rusakRinganKm: 11.2, rusakBeratKm: 5.4, totalPanjangKm: 133.6, lebarRataRataMeter: 9.5, materialPerkerasan: 'Aspal 74%, Rigid Beton 22%, Paving 4%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 66.8, sedangKm: 14.1, rusakRinganKm: 8.4, rusakBeratKm: 3.4, totalPanjangKm: 92.7, lebarRataRataMeter: 6.0, materialPerkerasan: 'Rigid Beton 62%, Paving Block 38%' },
    ],
    'Batam Kota': [
      { kelasJalan: 'Jalan Arteri', baikKm: 54.2, sedangKm: 6.5, rusakRinganKm: 2.1, rusakBeratKm: 0.6, totalPanjangKm: 63.4, lebarRataRataMeter: 28.0, materialPerkerasan: 'Aspal Hotmix 95%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 42.1, sedangKm: 5.2, rusakRinganKm: 2.8, rusakBeratKm: 1.2, totalPanjangKm: 51.3, lebarRataRataMeter: 18.0, materialPerkerasan: 'Aspal Hotmix 89%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 28.6, sedangKm: 3.8, rusakRinganKm: 2.1, rusakBeratKm: 0.9, totalPanjangKm: 35.4, lebarRataRataMeter: 10.0, materialPerkerasan: 'Aspal 80%, Beton 20%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 19.5, sedangKm: 2.8, rusakRinganKm: 1.5, rusakBeratKm: 0.5, totalPanjangKm: 24.3, lebarRataRataMeter: 7.0, materialPerkerasan: 'Rigid Beton 70%' },
    ],
    'Batu Ampar': [
      { kelasJalan: 'Jalan Arteri', baikKm: 32.5, sedangKm: 5.8, rusakRinganKm: 3.2, rusakBeratKm: 1.4, totalPanjangKm: 42.9, lebarRataRataMeter: 24.0, materialPerkerasan: 'Rigid Beton Pelabuhan 60%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 24.8, sedangKm: 4.6, rusakRinganKm: 3.1, rusakBeratKm: 1.5, totalPanjangKm: 34.0, lebarRataRataMeter: 14.0, materialPerkerasan: 'Aspal Hotmix 75%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 16.2, sedangKm: 3.4, rusakRinganKm: 2.4, rusakBeratKm: 1.1, totalPanjangKm: 23.1, lebarRataRataMeter: 8.5, materialPerkerasan: 'Aspal 70%, Beton 30%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 11.2, sedangKm: 2.5, rusakRinganKm: 1.8, rusakBeratKm: 0.8, totalPanjangKm: 16.3, lebarRataRataMeter: 5.5, materialPerkerasan: 'Paving & Beton' },
    ],
    'Sekupang': [
      { kelasJalan: 'Jalan Arteri', baikKm: 35.8, sedangKm: 5.2, rusakRinganKm: 2.4, rusakBeratKm: 0.8, totalPanjangKm: 44.2, lebarRataRataMeter: 22.0, materialPerkerasan: 'Aspal Hotmix 90%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 26.5, sedangKm: 4.1, rusakRinganKm: 2.5, rusakBeratKm: 1.1, totalPanjangKm: 34.2, lebarRataRataMeter: 15.0, materialPerkerasan: 'Aspal Hotmix 85%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 18.4, sedangKm: 3.2, rusakRinganKm: 2.0, rusakBeratKm: 0.9, totalPanjangKm: 24.5, lebarRataRataMeter: 9.0, materialPerkerasan: 'Aspal 75%, Beton 25%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 12.8, sedangKm: 2.6, rusakRinganKm: 1.4, rusakBeratKm: 0.6, totalPanjangKm: 17.4, lebarRataRataMeter: 6.0, materialPerkerasan: 'Rigid Beton 65%' },
    ],
    'Nongsa': [
      { kelasJalan: 'Jalan Arteri', baikKm: 28.4, sedangKm: 4.5, rusakRinganKm: 1.8, rusakBeratKm: 0.5, totalPanjangKm: 35.2, lebarRataRataMeter: 26.0, materialPerkerasan: 'Aspal Hotmix 92%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 21.2, sedangKm: 3.8, rusakRinganKm: 2.0, rusakBeratKm: 0.9, totalPanjangKm: 27.9, lebarRataRataMeter: 16.0, materialPerkerasan: 'Aspal Hotmix 86%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 14.5, sedangKm: 2.8, rusakRinganKm: 1.7, rusakBeratKm: 0.7, totalPanjangKm: 19.7, lebarRataRataMeter: 9.0, materialPerkerasan: 'Aspal 70%, Beton 30%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 9.8, sedangKm: 2.1, rusakRinganKm: 1.2, rusakBeratKm: 0.4, totalPanjangKm: 13.5, lebarRataRataMeter: 6.0, materialPerkerasan: 'Rigid Beton 60%' },
    ],
    'Batu Aji': [
      { kelasJalan: 'Jalan Arteri', baikKm: 18.5, sedangKm: 3.8, rusakRinganKm: 1.6, rusakBeratKm: 0.5, totalPanjangKm: 24.4, lebarRataRataMeter: 24.0, materialPerkerasan: 'Aspal Hotmix 85%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 15.2, sedangKm: 3.4, rusakRinganKm: 2.2, rusakBeratKm: 1.2, totalPanjangKm: 22.0, lebarRataRataMeter: 15.0, materialPerkerasan: 'Aspal Hotmix 80%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 11.2, sedangKm: 2.8, rusakRinganKm: 1.8, rusakBeratKm: 0.9, totalPanjangKm: 16.7, lebarRataRataMeter: 8.5, materialPerkerasan: 'Aspal 70%, Beton 30%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 7.5, sedangKm: 2.0, rusakRinganKm: 1.3, rusakBeratKm: 0.6, totalPanjangKm: 11.4, lebarRataRataMeter: 5.5, materialPerkerasan: 'Beton & Paving' },
    ],
    'Sagulung': [
      { kelasJalan: 'Jalan Arteri', baikKm: 14.8, sedangKm: 2.7, rusakRinganKm: 1.0, rusakBeratKm: 0.4, totalPanjangKm: 18.9, lebarRataRataMeter: 22.0, materialPerkerasan: 'Aspal Hotmix 88%' },
      { kelasJalan: 'Jalan Kolektor', baikKm: 13.0, sedangKm: 3.1, rusakRinganKm: 1.9, rusakBeratKm: 1.0, totalPanjangKm: 19.0, lebarRataRataMeter: 14.0, materialPerkerasan: 'Aspal Hotmix 82%' },
      { kelasJalan: 'Jalan Lokal', baikKm: 9.5, sedangKm: 2.6, rusakRinganKm: 1.2, rusakBeratKm: 0.9, totalPanjangKm: 14.2, lebarRataRataMeter: 8.0, materialPerkerasan: 'Aspal 72%, Beton 28%' },
      { kelasJalan: 'Jalan Lingkungan', baikKm: 6.0, sedangKm: 2.1, rusakRinganKm: 1.2, rusakBeratKm: 0.5, totalPanjangKm: 9.8, lebarRataRataMeter: 5.5, materialPerkerasan: 'Beton & Paving' },
    ],
  },

  // =========================================================================
  // BARIS 3 - KARTU 5: Paket Pembangunan Infrastruktur per Kategori Pekerjaan
  // =========================================================================
  paketInfrastrukturPerTahun: {
    '2026': [
      {
        kategoriPekerjaan: 'Konektivitas & Transportasi',
        subdit: 'Pembangunan Jalan dan Jembatan',
        nilaiPaguM: 230.5,
        nilaiHpsM: 222.8,
        nilaiKontrakM: 216.4,
        jumlahPaket: 10,
        jenisPekerjaanUtama: 'Flyover Sei Ladi, Pelebaran Sudirman 5 Lajur, Akses Hang Nadim',
        efisiensiTenderPct: 6.1,
      },
      {
        kategoriPekerjaan: 'Pengendalian Banjir',
        subdit: 'Pembangunan Drainase',
        nilaiPaguM: 115.0,
        nilaiHpsM: 110.2,
        nilaiKontrakM: 106.5,
        jumlahPaket: 8,
        jenisPekerjaanUtama: 'Kolam Retensi Baloi Indah, Saluran Primer Batam Centre U-Ditch',
        efisiensiTenderPct: 7.4,
      },
      {
        kategoriPekerjaan: 'Fasilitas Publik & Gedung',
        subdit: 'Pembangunan Gedung',
        nilaiPaguM: 88.0,
        nilaiHpsM: 84.5,
        nilaiKontrakM: 81.2,
        jumlahPaket: 6,
        jenisPekerjaanUtama: 'Gedung Arsip Record Centre, Renovasi Terminal Feri, JPO Estetik',
        efisiensiTenderPct: 7.7,
      },
      {
        kategoriPekerjaan: 'Pengembangan Kawasan Industri',
        subdit: 'Pematangan Tanah',
        nilaiPaguM: 130.0,
        nilaiHpsM: 124.6,
        nilaiKontrakM: 120.7,
        jumlahPaket: 4,
        jenisPekerjaanUtama: 'Pematangan Lahan Rempang Eco-City Zona A (280 Ha) & KPLI Kabil',
        efisiensiTenderPct: 7.2,
      },
    ],
    '2025': [
      {
        kategoriPekerjaan: 'Konektivitas & Transportasi',
        subdit: 'Pembangunan Jalan dan Jembatan',
        nilaiPaguM: 195.0,
        nilaiHpsM: 188.5,
        nilaiKontrakM: 182.8,
        jumlahPaket: 9,
        jenisPekerjaanUtama: 'Pelebaran Jalan Gajah Mada & Bundaran Punggur',
        efisiensiTenderPct: 6.3,
      },
      {
        kategoriPekerjaan: 'Pengendalian Banjir',
        subdit: 'Pembangunan Drainase',
        nilaiPaguM: 98.0,
        nilaiHpsM: 94.2,
        nilaiKontrakM: 91.0,
        jumlahPaket: 7,
        jenisPekerjaanUtama: 'Normalisasi Sungai Jodoh & Drainase Sei Tiram',
        efisiensiTenderPct: 7.1,
      },
      {
        kategoriPekerjaan: 'Fasilitas Publik & Gedung',
        subdit: 'Pembangunan Gedung',
        nilaiPaguM: 74.0,
        nilaiHpsM: 71.2,
        nilaiKontrakM: 68.5,
        jumlahPaket: 5,
        jenisPekerjaanUtama: 'Klinik Layanan Kesehatan & Shelter Logistik',
        efisiensiTenderPct: 7.4,
      },
      {
        kategoriPekerjaan: 'Pengembangan Kawasan Industri',
        subdit: 'Pematangan Tanah',
        nilaiPaguM: 105.0,
        nilaiHpsM: 100.8,
        nilaiKontrakM: 97.5,
        jumlahPaket: 4,
        jenisPekerjaanUtama: 'Cut & Fill Batam Centre Tahap 2 & Kabil Barat',
        efisiensiTenderPct: 7.1,
      },
    ],
  },

  // =========================================================================
  // BARIS 3 - KARTU 6: Paket Pematangan Tanah (BSW) - 8 Paket Terbesar
  // =========================================================================
  paketBswPerTahun: {
    '2026': [
      {
        id: 'BSW-01',
        namaPaket: 'Pematangan Lahan Rempang Eco-City Zona Industri A (280 Ha)',
        kategoriPekerjaan: 'Kawasan Industri',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Wijaya Karya (Persero) Tbk',
        nilaiKontrakM: 58.4,
        volumePekerjaanM3: 1420000,
        progresPersen: 86.8,
      },
      {
        id: 'BSW-02',
        namaPaket: 'Cut and Fill Kawasan Pemukiman Baru Tanjung Banon (120 Ha)',
        kategoriPekerjaan: 'Pemukiman Relokasi',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Adhi Karya (Persero) Tbk',
        nilaiKontrakM: 34.2,
        volumePekerjaanM3: 980000,
        progresPersen: 91.5,
      },
      {
        id: 'BSW-03',
        namaPaket: 'Perluasan Lahan KPLI Pengolahan Limbah Industri B3 Kabil',
        kategoriPekerjaan: 'Kawasan Industri',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Nindya Karya',
        nilaiKontrakM: 26.5,
        volumePekerjaanM3: 650000,
        progresPersen: 94.2,
      },
      {
        id: 'BSW-04',
        namaPaket: 'Pematangan Lahan Terminal Peti Kemas Baru Batu Ampar Utara',
        kategoriPekerjaan: 'Pelabuhan & Logistik',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Hutama Karya (Persero)',
        nilaiKontrakM: 22.8,
        volumePekerjaanM3: 540000,
        progresPersen: 78.5,
      },
      {
        id: 'BSW-05',
        namaPaket: 'Pematangan Site MRO dan Hanggar Bandara Hang Nadim',
        kategoriPekerjaan: 'Fasilitas Bandara',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT PP (Persero) Tbk',
        nilaiKontrakM: 19.4,
        volumePekerjaanM3: 460000,
        progresPersen: 88.0,
      },
      {
        id: 'BSW-06',
        namaPaket: 'Penataan Kontur Tanah & Lereng Bukit Senimba Sekupang',
        kategoriPekerjaan: 'Pemukiman Relokasi',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Waskita Karya (Persero) Tbk',
        nilaiKontrakM: 14.8,
        volumePekerjaanM3: 380000,
        progresPersen: 95.0,
      },
      {
        id: 'BSW-07',
        namaPaket: 'Pematangan Area Logistik Hub KEK Nongsa Digital Park',
        kategoriPekerjaan: 'Kawasan Industri',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Total Bangun Persada',
        nilaiKontrakM: 12.5,
        volumePekerjaanM3: 310000,
        progresPersen: 89.4,
      },
      {
        id: 'BSW-08',
        namaPaket: 'Pematangan Tanah Fasilitas Integrasi Pelabuhan Telaga Punggur',
        kategoriPekerjaan: 'Pelabuhan & Logistik',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Jaya Konstruksi MP Tbk',
        nilaiKontrakM: 9.6,
        volumePekerjaanM3: 210000,
        progresPersen: 96.0,
      },
    ],
    '2025': [
      {
        id: 'BSW-01',
        namaPaket: 'Pematangan Lahan Rempang Eco-City Zona Industri A (Tahap Awal)',
        kategoriPekerjaan: 'Kawasan Industri',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Wijaya Karya (Persero) Tbk',
        nilaiKontrakM: 46.5,
        volumePekerjaanM3: 1100000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-02',
        namaPaket: 'Pematangan Tanah Tahap 1 Tanjung Banon',
        kategoriPekerjaan: 'Pemukiman Relokasi',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Adhi Karya (Persero) Tbk',
        nilaiKontrakM: 28.0,
        volumePekerjaanM3: 750000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-03',
        namaPaket: 'Perluasan Lahan KPLI Kabil Tahap 2',
        kategoriPekerjaan: 'Kawasan Industri',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Nindya Karya',
        nilaiKontrakM: 21.0,
        volumePekerjaanM3: 520000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-04',
        namaPaket: 'Pematangan Depo Peti Kemas Batu Ampar Barat',
        kategoriPekerjaan: 'Pelabuhan & Logistik',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Hutama Karya (Persero)',
        nilaiKontrakM: 18.5,
        volumePekerjaanM3: 430000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-05',
        namaPaket: 'Pematangan Apron Kargo Hang Nadim',
        kategoriPekerjaan: 'Fasilitas Bandara',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT PP (Persero) Tbk',
        nilaiKontrakM: 16.2,
        volumePekerjaanM3: 390000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-06',
        namaPaket: 'Penataan Lahan Sempadan Waduk Sei Harapan',
        kategoriPekerjaan: 'Pemukiman Relokasi',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Waskita Karya (Persero) Tbk',
        nilaiKontrakM: 11.8,
        volumePekerjaanM3: 290000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-07',
        namaPaket: 'Cut & Fill Nongsa Digital Park Tahap 2',
        kategoriPekerjaan: 'Kawasan Industri',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Total Bangun Persada',
        nilaiKontrakM: 10.2,
        volumePekerjaanM3: 250000,
        progresPersen: 100.0,
      },
      {
        id: 'BSW-08',
        namaPaket: 'Pematangan Tanah Dermaga Telaga Punggur',
        kategoriPekerjaan: 'Pelabuhan & Logistik',
        ppk: 'PPK Pematangan Tanah & BSW',
        kontraktor: 'PT Jaya Konstruksi MP Tbk',
        nilaiKontrakM: 8.2,
        volumePekerjaanM3: 180000,
        progresPersen: 100.0,
      },
    ],
  },
};
