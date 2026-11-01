/**
 * Master Data Dummy Visualisasi Direktorat Pembangunan Infrastruktur BP Batam
 * Tersimpan dalam satu objek JSON terpadu agar mudah disubstitusi dengan data riil API/database.
 */

export interface PaketPekerjaanItem {
  id: string;
  kode: string;
  namaPaket: string;
  subdirektorat:
    | 'Pembangunan Jalan dan Jembatan'
    | 'Pembangunan Drainase'
    | 'Pembangunan Gedung'
    | 'Pematangan Tanah';
  kategoriPekerjaan:
    | 'Konektivitas & Transportasi'
    | 'Pengendalian Banjir'
    | 'Fasilitas Publik & Gedung'
    | 'Pengembangan Kawasan Industri';
  jenisPekerjaan:
    | 'Pelebaran Jalan'
    | 'Flyover & Jembatan'
    | 'Saluran Drainase Primer'
    | 'Kolam Retensi'
    | 'Gedung Kantor / Arsip'
    | 'Gedung Layanan Publik'
    | 'Cut and Fill BSW'
    | 'Pematangan Lahan';
  kontraktor: string;
  supervisi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  bulan: 'Januari' | 'Februari' | 'Maret' | 'April' | 'Mei' | 'Juni' | 'Juli' | 'Agustus' | 'September' | 'Oktober' | 'November' | 'Desember';
  nilaiPagu: number; // Dalam Juta Rupiah
  nilaiHps: number; // Dalam Juta Rupiah
  nilaiKontrak: number; // Dalam Juta Rupiah
  progresPersen: number; // 0 - 100 %
  jenisKendala:
    | 'Cuaca'
    | 'Pembebasan Lahan'
    | 'Ketersediaan Material'
    | 'Perizinan'
    | 'Utilitas Eksisting'
    | 'Tidak Ada Kendala';
  kendalaDetail: string;
}

export interface PematanganTanahBulananItem {
  bulan: string;
  volumeM3: number;
  progresKumulatifPersen: number;
}

export interface JaringanJalanItem {
  wilayah: string;
  kelasJalan: 'Arteri' | 'Kolektor' | 'Lokal' | 'Lingkungan';
  aspalKm: number;
  betonKm: number;
  pavingKm: number;
  tanahKerikilKm: number;
}

export interface LebarJalanStatusItem {
  statusJalan: string;
  rataRataLebarMeter: number;
  jumlahRuas: number;
  totalPanjangKm: number;
}

export interface PembangunanInfrastrukturMasterData {
  paketPekerjaan: PaketPekerjaanItem[];
  pematanganTanahBulanan: PematanganTanahBulananItem[];
  jaringanJalanData: JaringanJalanItem[];
  lebarJalanStatusData: LebarJalanStatusItem[];
}

export const PEMBANGUNAN_INFRASTRUKTUR_MASTER_DATA: PembangunanInfrastrukturMasterData = {
  // =========================================================================
  // DATASET 1: LAPORAN PROGRES PEKERJAAN KONSTRUKSI TAHUN BERJALAN (20 PAKET)
  // Sifat Data: TERBATAS (Perbulan)
  // =========================================================================
  paketPekerjaan: [
    {
      id: 'PK-01',
      kode: 'PK-01',
      namaPaket: 'Pembangunan Flyover Sei Ladi & Penataan Simpang',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kategoriPekerjaan: 'Konektivitas & Transportasi',
      jenisPekerjaan: 'Flyover & Jembatan',
      kontraktor: 'PT Wijaya Karya (Persero) Tbk',
      supervisi: 'PT Virama Karya (Persero)',
      tanggalMulai: '15 Jan 2026',
      tanggalSelesai: '15 Des 2026',
      bulan: 'April',
      nilaiPagu: 132000,
      nilaiHps: 128500,
      nilaiKontrak: 124800,
      progresPersen: 92.4,
      jenisKendala: 'Utilitas Eksisting',
      kendalaDetail: 'Relokasi utilitas pipa transmisi gas dan kabel FO pada bentang tengah pier P3 selesai 100%.',
    },
    {
      id: 'PK-02',
      kode: 'PK-02',
      namaPaket: 'Pelebaran Jalan Sudirman Tahap 4 (Jalur Lambat & Cepat)',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kategoriPekerjaan: 'Konektivitas & Transportasi',
      jenisPekerjaan: 'Pelebaran Jalan',
      kontraktor: 'PT Adhi Karya (Persero) Tbk',
      supervisi: 'PT Yodya Karya',
      tanggalMulai: '01 Feb 2026',
      tanggalSelesai: '30 Okt 2026',
      bulan: 'April',
      nilaiPagu: 98500,
      nilaiHps: 95000,
      nilaiKontrak: 92400,
      progresPersen: 78.5,
      jenisKendala: 'Cuaca',
      kendalaDetail: 'Presipitasi hujan sore hari memperlambat pemadatan lapisan base course A STA 3+200.',
    },
    {
      id: 'PK-03',
      kode: 'PK-03',
      namaPaket: 'Pembangunan Kolam Retensi Baloi & Saluran Primer',
      subdirektorat: 'Pembangunan Drainase',
      kategoriPekerjaan: 'Pengendalian Banjir',
      jenisPekerjaan: 'Kolam Retensi',
      kontraktor: 'PT Brantas Abipraya (Persero)',
      supervisi: 'PT Bina Karya (Persero)',
      tanggalMulai: '10 Feb 2026',
      tanggalSelesai: '25 Nov 2026',
      bulan: 'April',
      nilaiPagu: 48000,
      nilaiHps: 46200,
      nilaiKontrak: 44500,
      progresPersen: 68.2,
      jenisKendala: 'Pembebasan Lahan',
      kendalaDetail: 'Negosiasi relokasi 3 unit kios semi-permanen pada bibir saluran masuk inlet kolam.',
    },
    {
      id: 'PK-04',
      kode: 'PK-04',
      namaPaket: 'Normalisasi Drainase Primer Batam Center (Hilir Sukajadi)',
      subdirektorat: 'Pembangunan Drainase',
      kategoriPekerjaan: 'Pengendalian Banjir',
      jenisPekerjaan: 'Saluran Drainase Primer',
      kontraktor: 'PT Hutama Karya Infrastruktur',
      supervisi: 'PT Indah Karya',
      tanggalMulai: '05 Jan 2026',
      tanggalSelesai: '15 Sep 2026',
      bulan: 'April',
      nilaiPagu: 36500,
      nilaiHps: 35100,
      nilaiKontrak: 33800,
      progresPersen: 84.1,
      jenisKendala: 'Tidak Ada Kendala',
      kendalaDetail: 'Pemasangan sheet pile CCSP W-325 dan dredging sedimen berjalan sesuai schedule.',
    },
    {
      id: 'PK-05',
      kode: 'PK-05',
      namaPaket: 'Pematangan Lahan Rempang Eco-City Zona A (280 Ha)',
      subdirektorat: 'Pematangan Tanah',
      kategoriPekerjaan: 'Pengembangan Kawasan Industri',
      jenisPekerjaan: 'Cut and Fill BSW',
      kontraktor: 'PT Pembangunan Perumahan (Persero) Tbk',
      supervisi: 'PT Ciriajasa Cipta Mandiri',
      tanggalMulai: '12 Jan 2026',
      tanggalSelesai: '30 Des 2026',
      bulan: 'April',
      nilaiPagu: 185000,
      nilaiHps: 180000,
      nilaiKontrak: 174500,
      progresPersen: 86.8,
      jenisKendala: 'Cuaca',
      kendalaDetail: 'Kondisi track hauling licin saat hujan lebat; penambahan grader dan compactor aktif.',
    },
    {
      id: 'PK-06',
      kode: 'PK-06',
      namaPaket: 'Pematangan Lahan KEK Batam Aero Technic Tahap 3',
      subdirektorat: 'Pematangan Tanah',
      kategoriPekerjaan: 'Pengembangan Kawasan Industri',
      jenisPekerjaan: 'Pematangan Lahan',
      kontraktor: 'PT Jaya Konstruksi MP Tbk',
      supervisi: 'PT Delta Buana Konsultan',
      tanggalMulai: '20 Jan 2026',
      tanggalSelesai: '15 Nov 2026',
      bulan: 'April',
      nilaiPagu: 82000,
      nilaiHps: 79500,
      nilaiKontrak: 78900, // Rasio 96.2% (>95%)
      progresPersen: 42.5, // <50% (Aksen)
      jenisKendala: 'Ketersediaan Material',
      kendalaDetail: 'Keterlambatan tongkang agregat batu pecah dari quarry Karimun karena ombak tinggi selat.',
    },
    {
      id: 'PK-07',
      kode: 'PK-07',
      namaPaket: 'Pembangunan Gedung Pusat Logistik & Arsip BP Batam',
      subdirektorat: 'Pembangunan Gedung',
      kategoriPekerjaan: 'Fasilitas Publik & Gedung',
      jenisPekerjaan: 'Gedung Kantor / Arsip',
      kontraktor: 'PT Nindya Karya (Persero)',
      supervisi: 'PT Artefak Arkindo',
      tanggalMulai: '01 Mar 2026',
      tanggalSelesai: '15 Des 2026',
      bulan: 'April',
      nilaiPagu: 62000,
      nilaiHps: 60500,
      nilaiKontrak: 59800, // Rasio 96.5% (>95%)
      progresPersen: 38.0, // <50% (Aksen)
      jenisKendala: 'Perizinan',
      kendalaDetail: 'Revisi rekomendasi proteksi kebakaran dan kajian teknis PBG gedung arsip bernilai tinggi.',
    },
    {
      id: 'PK-08',
      kode: 'PK-08',
      namaPaket: 'Revitalisasi Gedung Klinik Rawat Inap RSBP Sekupang',
      subdirektorat: 'Pembangunan Gedung',
      kategoriPekerjaan: 'Fasilitas Publik & Gedung',
      jenisPekerjaan: 'Gedung Layanan Publik',
      kontraktor: 'PT Total Bangun Persada Tbk',
      supervisi: 'PT Cipta Multi Kreasi',
      tanggalMulai: '15 Jan 2026',
      tanggalSelesai: '30 Ags 2026',
      bulan: 'April',
      nilaiPagu: 41000,
      nilaiHps: 39800,
      nilaiKontrak: 38200,
      progresPersen: 71.5,
      jenisKendala: 'Tidak Ada Kendala',
      kendalaDetail: 'Instalasi gas medik dan finishing lantai vinyl antibakteri rampung sesuai spesifikasi.',
    },
    {
      id: 'PK-09',
      kode: 'PK-09',
      namaPaket: 'Peningkatan Jalan Akses Kargo Pelabuhan Batu Ampar',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kategoriPekerjaan: 'Konektivitas & Transportasi',
      jenisPekerjaan: 'Pelebaran Jalan',
      kontraktor: 'PT Waskita Karya (Persero) Tbk',
      supervisi: 'PT Seecons Engineering',
      tanggalMulai: '18 Jan 2026',
      tanggalSelesai: '20 Okt 2026',
      bulan: 'April',
      nilaiPagu: 74500,
      nilaiHps: 72000,
      nilaiKontrak: 68900,
      progresPersen: 63.8,
      jenisKendala: 'Utilitas Eksisting',
      kendalaDetail: 'Penataan kabel bawah tanah SKTM 20kV PLN dan crossing drainase jalan pelabuhan.',
    },
    {
      id: 'PK-10',
      kode: 'PK-10',
      namaPaket: 'Pembangunan JPO Ikonik Penghubung Batam Center',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kategoriPekerjaan: 'Konektivitas & Transportasi',
      jenisPekerjaan: 'Flyover & Jembatan',
      kontraktor: 'PT Sumber Rancang Bangun',
      supervisi: 'PT Multi Konsultan',
      tanggalMulai: '10 Feb 2026',
      tanggalSelesai: '10 Okt 2026',
      bulan: 'April',
      nilaiPagu: 28500,
      nilaiHps: 27800,
      nilaiKontrak: 27400, // Rasio 96.1% (>95%)
      progresPersen: 34.5, // <50% (Aksen)
      jenisKendala: 'Perizinan',
      kendalaDetail: 'Izin rekayasa lalu lintas malam hari (traffic diversion) sedang sinkronisasi bersama Dishub.',
    },
    {
      id: 'PK-11',
      kode: 'PK-11',
      namaPaket: 'Normalisasi Sungai Jodoh & Penguatan Dinding Beton',
      subdirektorat: 'Pembangunan Drainase',
      kategoriPekerjaan: 'Pengendalian Banjir',
      jenisPekerjaan: 'Saluran Drainase Primer',
      kontraktor: 'PT Bumi Karsa',
      supervisi: 'PT Duta Graha Konsultan',
      tanggalMulai: '22 Jan 2026',
      tanggalSelesai: '15 Nov 2026',
      bulan: 'April',
      nilaiPagu: 52000,
      nilaiHps: 50400,
      nilaiKontrak: 49200,
      progresPersen: 46.2, // <50% (Aksen)
      jenisKendala: 'Pembebasan Lahan',
      kendalaDetail: 'Sisa 4 persil lahan belum steril di tikungan sungai arah outlet laut Kampung Nelayan.',
    },
    {
      id: 'PK-12',
      kode: 'PK-12',
      namaPaket: 'Pembangunan Pintu Air & Rumah Pompa Banjir Marina',
      subdirektorat: 'Pembangunan Drainase',
      kategoriPekerjaan: 'Pengendalian Banjir',
      jenisPekerjaan: 'Kolam Retensi',
      kontraktor: 'PT Minarta Dutahutama',
      supervisi: 'PT Prima Desain Konsulindo',
      tanggalMulai: '05 Feb 2026',
      tanggalSelesai: '30 Nov 2026',
      bulan: 'April',
      nilaiPagu: 33000,
      nilaiHps: 32000,
      nilaiKontrak: 30800,
      progresPersen: 58.0,
      jenisKendala: 'Ketersediaan Material',
      kendalaDetail: 'Pengapalan mechanical pump unit debit 2.500 liter/detik dalam pengawasan bea cukai pelabuhan.',
    },
    {
      id: 'PK-13',
      kode: 'PK-13',
      namaPaket: 'Pematangan Lahan Kawasan Industri Kabil Terpadu',
      subdirektorat: 'Pematangan Tanah',
      kategoriPekerjaan: 'Pengembangan Kawasan Industri',
      jenisPekerjaan: 'Pematangan Lahan',
      kontraktor: 'PT Bangun Cipta Kontraktor',
      supervisi: 'PT Geodinamik Konsultan',
      tanggalMulai: '15 Jan 2026',
      tanggalSelesai: '28 Okt 2026',
      bulan: 'April',
      nilaiPagu: 67000,
      nilaiHps: 64800,
      nilaiKontrak: 63100,
      progresPersen: 82.0,
      jenisKendala: 'Tidak Ada Kendala',
      kendalaDetail: 'Elevasi cut & fill zona fabrikasi pipa minyak mencapai leveling +14.50 mdpl.',
    },
    {
      id: 'PK-14',
      kode: 'PK-14',
      namaPaket: 'Pematangan Tanah Relokasi Warga Dapur 6 Rempang',
      subdirektorat: 'Pematangan Tanah',
      kategoriPekerjaan: 'Pengembangan Kawasan Industri',
      jenisPekerjaan: 'Cut and Fill BSW',
      kontraktor: 'PT Modern Surya Jaya',
      supervisi: 'PT Bina Mandiri Rekayasa',
      tanggalMulai: '01 Feb 2026',
      tanggalSelesai: '30 Nov 2026',
      bulan: 'April',
      nilaiPagu: 55000,
      nilaiHps: 53500,
      nilaiKontrak: 51200,
      progresPersen: 49.0, // <50% (Aksen)
      jenisKendala: 'Cuaca',
      kendalaDetail: 'Tanah ekspansif memerlukan penambahan stabilisasi semen saat musim basah awal triwulan.',
    },
    {
      id: 'PK-15',
      kode: 'PK-15',
      namaPaket: 'Pembangunan Gedung Lab Uji Lingkungan BP Batam',
      subdirektorat: 'Pembangunan Gedung',
      kategoriPekerjaan: 'Fasilitas Publik & Gedung',
      jenisPekerjaan: 'Gedung Kantor / Arsip',
      kontraktor: 'PT Pulauintan Bajaperkasa Konstruksi',
      supervisi: 'PT Pola Data Konsultan',
      tanggalMulai: '25 Jan 2026',
      tanggalSelesai: '10 Des 2026',
      bulan: 'April',
      nilaiPagu: 38000,
      nilaiHps: 37100,
      nilaiKontrak: 36500, // Rasio 96.1% (>95%)
      progresPersen: 61.5,
      jenisKendala: 'Perizinan',
      kendalaDetail: 'Sertifikasi akreditasi ruang isolasi kimia menunggu verifikasi standar KAN.',
    },
    {
      id: 'PK-16',
      kode: 'PK-16',
      namaPaket: 'Pembangunan Terminal Penumpang Telaga Punggur Tahap 2',
      subdirektorat: 'Pembangunan Gedung',
      kategoriPekerjaan: 'Fasilitas Publik & Gedung',
      jenisPekerjaan: 'Gedung Layanan Publik',
      kontraktor: 'PT Tripatra Engineering',
      supervisi: 'PT Surya Abadi Mandiri',
      tanggalMulai: '12 Feb 2026',
      tanggalSelesai: '20 Des 2026',
      bulan: 'April',
      nilaiPagu: 47500,
      nilaiHps: 46000,
      nilaiKontrak: 43900,
      progresPersen: 53.2,
      jenisKendala: 'Tidak Ada Kendala',
      kendalaDetail: 'Pengecoran plat lantai 2 dan instalasi struktur baja canopy ruang tunggu selesai tepat waktu.',
    },
    {
      id: 'PK-17',
      kode: 'PK-17',
      namaPaket: 'Pembangunan Jalan Lingkar Luar Sei Lekop - Sagulung',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kategoriPekerjaan: 'Konektivitas & Transportasi',
      jenisPekerjaan: 'Pelebaran Jalan',
      kontraktor: 'PT Nusa Raya Cipta Tbk',
      supervisi: 'PT Prisma Engineering',
      tanggalMulai: '05 Feb 2026',
      tanggalSelesai: '15 Des 2026',
      bulan: 'April',
      nilaiPagu: 58000,
      nilaiHps: 56500,
      nilaiKontrak: 54200,
      progresPersen: 65.0,
      jenisKendala: 'Utilitas Eksisting',
      kendalaDetail: 'Pergeseran 18 titik tiang PJU dan pipa air bersih SPAM di bahu jalan segmen barat.',
    },
    {
      id: 'PK-18',
      kode: 'PK-18',
      namaPaket: 'Saluran Sekunder Tiban Kampung Pengendali Genangan',
      subdirektorat: 'Pembangunan Drainase',
      kategoriPekerjaan: 'Pengendalian Banjir',
      jenisPekerjaan: 'Saluran Drainase Primer',
      kontraktor: 'PT Jaya Mandiri Konstruksi',
      supervisi: 'PT Griya Teknika',
      tanggalMulai: '15 Jan 2026',
      tanggalSelesai: '30 Sep 2026',
      bulan: 'April',
      nilaiPagu: 24500,
      nilaiHps: 23800,
      nilaiKontrak: 23100,
      progresPersen: 76.5,
      jenisKendala: 'Tidak Ada Kendala',
      kendalaDetail: 'Ekskavasi dan perkuatan dinding pasangan batu kali dengan mortar K-225 berjalan mulus.',
    },
    {
      id: 'PK-19',
      kode: 'PK-19',
      namaPaket: 'Pematangan Lahan Terminal Kargo Bandara Hang Nadim',
      subdirektorat: 'Pematangan Tanah',
      kategoriPekerjaan: 'Pengembangan Kawasan Industri',
      jenisPekerjaan: 'Pematangan Lahan',
      kontraktor: 'PT Tunas Baru Konstruksi',
      supervisi: 'PT Wahana Konsultan Cipta',
      tanggalMulai: '01 Mar 2026',
      tanggalSelesai: '30 Nov 2026',
      bulan: 'April',
      nilaiPagu: 43000,
      nilaiHps: 42000,
      nilaiKontrak: 41200, // Rasio 95.8% (>95%)
      progresPersen: 29.0, // <50% (Aksen)
      jenisKendala: 'Ketersediaan Material',
      kendalaDetail: 'Dua unit dozer D85 overhaul suku cadang mesin, relokasi alat sewa pengganti segera tiba.',
    },
    {
      id: 'PK-20',
      kode: 'PK-20',
      namaPaket: 'Pembangunan Jembatan Sei Tiram Pengganti Gelagar Baja',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kategoriPekerjaan: 'Konektivitas & Transportasi',
      jenisPekerjaan: 'Flyover & Jembatan',
      kontraktor: 'PT Krakatau Engineering',
      supervisi: 'PT Rekayasa Rekanindo',
      tanggalMulai: '20 Jan 2026',
      tanggalSelesai: '15 Okt 2026',
      bulan: 'April',
      nilaiPagu: 32000,
      nilaiHps: 31000,
      nilaiKontrak: 29500,
      progresPersen: 73.0,
      jenisKendala: 'Cuaca',
      kendalaDetail: 'Pasang air rob laut di muara sungai mempersempit jendela waktu pemasangan bore pile abutmen.',
    },
  ],

  // =========================================================================
  // DATASET 2: PEMATANGAN TANAH (BSW) BULANAN TAHUN BERJALAN
  // Sifat Data: TERBATAS (Perbulan)
  // =========================================================================
  pematanganTanahBulanan: [
    { bulan: 'Januari', volumeM3: 340000, progresKumulatifPersen: 7.2 },
    { bulan: 'Februari', volumeM3: 460000, progresKumulatifPersen: 17.0 },
    { bulan: 'Maret', volumeM3: 580000, progresKumulatifPersen: 29.3 },
    { bulan: 'April', volumeM3: 720000, progresKumulatifPersen: 44.6 },
    { bulan: 'Mei', volumeM3: 690000, progresKumulatifPersen: 59.3 },
    { bulan: 'Juni', volumeM3: 540000, progresKumulatifPersen: 70.8 },
    { bulan: 'Juli', volumeM3: 470000, progresKumulatifPersen: 80.8 },
    { bulan: 'Agustus', volumeM3: 410000, progresKumulatifPersen: 89.5 },
    { bulan: 'September', volumeM3: 310000, progresKumulatifPersen: 96.1 },
    { bulan: 'Oktober', volumeM3: 185000, progresKumulatifPersen: 100.0 },
  ],

  // =========================================================================
  // DATASET 3: JARINGAN JALAN EKSISTING PER KELAS & MATERIAL
  // Sifat Data: TERBUKA (Jika update)
  // =========================================================================
  jaringanJalanData: [
    // Batam Center
    { wilayah: 'Batam Center', kelasJalan: 'Arteri', aspalKm: 42.5, betonKm: 18.2, pavingKm: 1.5, tanahKerikilKm: 0.0 },
    { wilayah: 'Batam Center', kelasJalan: 'Kolektor', aspalKm: 34.0, betonKm: 12.5, pavingKm: 3.2, tanahKerikilKm: 0.8 },
    { wilayah: 'Batam Center', kelasJalan: 'Lokal', aspalKm: 28.5, betonKm: 8.4, pavingKm: 5.6, tanahKerikilKm: 1.2 },
    { wilayah: 'Batam Center', kelasJalan: 'Lingkungan', aspalKm: 19.0, betonKm: 14.5, pavingKm: 12.0, tanahKerikilKm: 2.5 },

    // Batu Ampar & Bengkong
    { wilayah: 'Batu Ampar & Bengkong', kelasJalan: 'Arteri', aspalKm: 26.0, betonKm: 15.4, pavingKm: 0.5, tanahKerikilKm: 0.0 },
    { wilayah: 'Batu Ampar & Bengkong', kelasJalan: 'Kolektor', aspalKm: 21.5, betonKm: 9.8, pavingKm: 1.8, tanahKerikilKm: 0.5 },
    { wilayah: 'Batu Ampar & Bengkong', kelasJalan: 'Lokal', aspalKm: 18.0, betonKm: 7.2, pavingKm: 4.1, tanahKerikilKm: 1.0 },
    { wilayah: 'Batu Ampar & Bengkong', kelasJalan: 'Lingkungan', aspalKm: 14.5, betonKm: 11.0, pavingKm: 9.5, tanahKerikilKm: 3.0 },

    // Nongsa
    { wilayah: 'Nongsa', kelasJalan: 'Arteri', aspalKm: 38.5, betonKm: 10.2, pavingKm: 0.8, tanahKerikilKm: 0.0 },
    { wilayah: 'Nongsa', kelasJalan: 'Kolektor', aspalKm: 29.0, betonKm: 8.5, pavingKm: 2.4, tanahKerikilKm: 1.5 },
    { wilayah: 'Nongsa', kelasJalan: 'Lokal', aspalKm: 24.5, betonKm: 6.8, pavingKm: 3.8, tanahKerikilKm: 2.8 },
    { wilayah: 'Nongsa', kelasJalan: 'Lingkungan', aspalKm: 16.0, betonKm: 9.2, pavingKm: 7.4, tanahKerikilKm: 5.2 },

    // Sekupang
    { wilayah: 'Sekupang', kelasJalan: 'Arteri', aspalKm: 31.0, betonKm: 12.0, pavingKm: 0.4, tanahKerikilKm: 0.0 },
    { wilayah: 'Sekupang', kelasJalan: 'Kolektor', aspalKm: 25.5, betonKm: 9.0, pavingKm: 2.0, tanahKerikilKm: 1.0 },
    { wilayah: 'Sekupang', kelasJalan: 'Lokal', aspalKm: 22.0, betonKm: 7.5, pavingKm: 3.5, tanahKerikilKm: 1.8 },
    { wilayah: 'Sekupang', kelasJalan: 'Lingkungan', aspalKm: 15.0, betonKm: 10.5, pavingKm: 8.2, tanahKerikilKm: 3.5 },

    // Batu Aji & Sagulung
    { wilayah: 'Batu Aji & Sagulung', kelasJalan: 'Arteri', aspalKm: 35.0, betonKm: 16.8, pavingKm: 0.8, tanahKerikilKm: 0.0 },
    { wilayah: 'Batu Aji & Sagulung', kelasJalan: 'Kolektor', aspalKm: 28.5, betonKm: 11.2, pavingKm: 2.8, tanahKerikilKm: 1.2 },
    { wilayah: 'Batu Aji & Sagulung', kelasJalan: 'Lokal', aspalKm: 24.0, betonKm: 8.5, pavingKm: 4.5, tanahKerikilKm: 2.5 },
    { wilayah: 'Batu Aji & Sagulung', kelasJalan: 'Lingkungan', aspalKm: 18.5, betonKm: 13.0, pavingKm: 11.5, tanahKerikilKm: 4.8 },

    // Rempang & Galang
    { wilayah: 'Rempang & Galang', kelasJalan: 'Arteri', aspalKm: 48.0, betonKm: 8.5, pavingKm: 0.0, tanahKerikilKm: 0.0 },
    { wilayah: 'Rempang & Galang', kelasJalan: 'Kolektor', aspalKm: 32.5, betonKm: 6.0, pavingKm: 1.2, tanahKerikilKm: 3.8 },
    { wilayah: 'Rempang & Galang', kelasJalan: 'Lokal', aspalKm: 21.0, betonKm: 4.5, pavingKm: 2.0, tanahKerikilKm: 6.5 },
    { wilayah: 'Rempang & Galang', kelasJalan: 'Lingkungan', aspalKm: 12.0, betonKm: 5.8, pavingKm: 4.2, tanahKerikilKm: 11.0 },
  ],

  // =========================================================================
  // DATASET 4: LEBAR JALAN RATA-RATA PER STATUS JALAN
  // Sifat Data: TERBUKA (Jika update)
  // =========================================================================
  lebarJalanStatusData: [
    {
      statusJalan: 'Jalan Nasional',
      rataRataLebarMeter: 24.5,
      jumlahRuas: 18,
      totalPanjangKm: 112.4,
    },
    {
      statusJalan: 'Jalan Strategis BP Batam',
      rataRataLebarMeter: 19.8,
      jumlahRuas: 46,
      totalPanjangKm: 248.6,
    },
    {
      statusJalan: 'Jalan Provinsi',
      rataRataLebarMeter: 14.2,
      jumlahRuas: 22,
      totalPanjangKm: 86.5,
    },
    {
      statusJalan: 'Jalan Kawasan Industri / Khusus',
      rataRataLebarMeter: 12.0,
      jumlahRuas: 38,
      totalPanjangKm: 95.3,
    },
  ],
};
