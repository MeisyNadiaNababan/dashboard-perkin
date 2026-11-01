// ============================================================================
// DATASET DUMMY REALISTIS: DIREKTORAT PENGAMANAN ASET DAN KAWASAN (DITPAM)
// BP BATAM - DEPUTI BIDANG PELAYANAN UMUM (DEP A6)
// Seluruh dataset tersimpan dalam SATU objek JSON terpadu agar mudah diganti data asli/API.
// Periode: Semesteran (Semester I & Semester II, Tahun 2025 - 2026).
// ============================================================================

export interface PenertibanBangunanLiarSemester {
  period: string; // e.g., '2025 S1'
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  rumahLiar: number;
  kiosGudangLiar: number;
  posLiar: number;
  total: number;
  lokasiTerbanyak: string;
  namaPemilikUnik: number;
}

export interface KegiatanPenertibanSemester {
  period: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  rutin: number;
  timTerpadu: number;
  total: number;
  objekPenertiban: string;
  inisiator: string;
  lokasiDominan: string;
  hasil: string;
}

export interface PenghuniPenggarapNelayanItem {
  lokasi: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  rumahTinggal: number;
  pondokGubuk: number;
  kebunGarapan: number;
  kerambaBagan: number;
  totalJiwaKK: number;
  totalLuasHa: number;
  rataLamaMenempatiTahun: number;
  caraMendapatkanDominan: 'Garap Sendiri' | 'Beli' | 'Warisan';
}

export interface PenindakanKawasanItem {
  period: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  // Untuk Tab A (Aset & Obvit): Penyerobotan Lahan, Pembangunan Liar, Pemanfaatan Tanpa Izin
  // Untuk Tab B (Lingkungan & Hutan): Illegal Logging, Galian C Ilegal, Perambahan Hutan
  kegiatan1LuasHa: number;
  kegiatan1Nama: string;
  kegiatan2LuasHa: number;
  kegiatan2Nama: string;
  kegiatan3LuasHa: number;
  kegiatan3Nama: string;
  totalLuasHa: number;
  namaKawasan: string;
  keterangan: string;
}

export interface KejadianBencanaMitigasiItem {
  jenis: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  jumlah: number;
  lokasi: string;
  personil: number;
  korban: number; // jiwa / terdampak
  kerugianRp: number; // dalam rupiah
  waktuMulaiAkhir: string;
  keterangan: string;
}

export interface PengamananUnjukRasaItem {
  period: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  jumlahAksi: number;
  personilDikerahkan: number;
  aliansiMasyarakat: string;
  permasalahanUtama: string;
  lokasiAksi: string;
  keterangan: string;
}

export interface PersonilPengamananItem {
  penempatanAtauSertifikasi: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  pns: number;
  p3k: number;
  kontrakDitpam: number;
  total: number;
  subditAtauPenerbit: string;
  keteranganTambahan: string;
}

export interface ProteksiKebakaranItem {
  jenisBangunan: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  apar: number;
  hidran: number;
  sprinkler: number;
  detektorAsap: number;
  totalAlat: number;
  rekomendasi: string;
  periodeInspeksi: string;
}

export interface KegiatanSubditItem {
  subdit: string;
  tahun: number;
  semester: 'Semester I' | 'Semester II';
  patroliRutin: number;
  raziaGabungan: number;
  pengawalanVvip: number;
  pengamananEvent: number;
  totalKegiatan: number;
  lokasiSasaran: string;
  personilTerlibat: number;
  hasilTemuan: string;
}

export interface DitpamSingleDataObject {
  meta: {
    unit: string;
    kodeUnit: string;
    deputi: string;
    dasarHukum: string;
    terakhirDiperbarui: string;
  };
  penertibanBangunanLiar: PenertibanBangunanLiarSemester[];
  kegiatanPenertiban: KegiatanPenertibanSemester[];
  penghuniPenggarapNelayan: PenghuniPenggarapNelayanItem[];
  penindakanKawasan: {
    asetDanObvit: PenindakanKawasanItem[];
    lingkunganDanHutan: PenindakanKawasanItem[];
  };
  kejadianDanMitigasi: {
    kejadianBencana: KejadianBencanaMitigasiItem[];
    mitigasiRescueSosialisasi: KejadianBencanaMitigasiItem[];
  };
  pengamananUnjukRasa: PengamananUnjukRasaItem[];
  personil: {
    distribusiPersonil: PersonilPengamananItem[];
    sertifikasiKhusus: PersonilPengamananItem[];
  };
  proteksiDanKegiatan: {
    proteksiKebakaran: ProteksiKebakaranItem[];
    kegiatanSubdit: KegiatanSubditItem[];
  };
}

export const PENGAMANAN_ASET_KAWASAN_DATA: DitpamSingleDataObject = {
  meta: {
    unit: 'Direktorat Pengamanan Aset dan Kawasan (Ditpam)',
    kodeUnit: 'DITPAM-A6',
    deputi: 'Deputi Bidang Pelayanan Umum (DEP A6)',
    dasarHukum: 'Peraturan Kepala BP Batam Nomor 14 Tahun 2021 tentang Penyelenggaraan Pengamanan Kawasan',
    terakhirDiperbarui: 'Semester II 2026',
  },

  // --------------------------------------------------------------------------
  // KARTU 1: PENERTIBAN BANGUNAN LIAR (Stacked Column per Semester)
  // Dataset: Data Penertiban Bangunan Liar (Tertutup, persemester)
  // --------------------------------------------------------------------------
  penertibanBangunanLiar: [
    {
      period: '2025 S1',
      tahun: 2025,
      semester: 'Semester I',
      rumahLiar: 215,
      kiosGudangLiar: 84,
      posLiar: 31,
      total: 330,
      lokasiTerbanyak: 'Sidomulyo & Catchment Waduk Duriangkang',
      namaPemilikUnik: 278,
    },
    {
      period: '2025 S2',
      tahun: 2025,
      semester: 'Semester II',
      rumahLiar: 198,
      kiosGudangLiar: 76,
      posLiar: 28,
      total: 302,
      lokasiTerbanyak: 'Tembesi Lama & Sempadan Waduk Mukakuning',
      namaPemilikUnik: 245,
    },
    {
      period: '2026 S1',
      tahun: 2026,
      semester: 'Semester I',
      rumahLiar: 162,
      kiosGudangLiar: 62,
      posLiar: 22,
      total: 246,
      lokasiTerbanyak: 'Sei Beduk & Buffer Zone Jalur Bandara',
      namaPemilikUnik: 204,
    },
    {
      period: '2026 S2',
      tahun: 2026,
      semester: 'Semester II',
      rumahLiar: 134,
      kiosGudangLiar: 48,
      posLiar: 16,
      total: 198,
      lokasiTerbanyak: 'Kabil & Kawasan Sempadan Sei Ladi',
      namaPemilikUnik: 162,
    },
  ],

  // --------------------------------------------------------------------------
  // KARTU 2: KEGIATAN PENERTIBAN (Rutin vs Tim Terpadu - Clustered Column)
  // Dataset: Rekap Kegiatan Penertiban (Rutin dan Tim Terpadu) (Terbuka, persemester)
  // --------------------------------------------------------------------------
  kegiatanPenertiban: [
    {
      period: '2025 S1',
      tahun: 2025,
      semester: 'Semester I',
      rutin: 34,
      timTerpadu: 9,
      total: 43,
      objekPenertiban: 'Rumah Liar & Kios Tanpa Izin di Buffer Zone',
      inisiator: 'Ditpam & Satpol PP Kota Batam',
      lokasiDominan: 'Buffer Zone Batam Centre & Waduk Duriangkang',
      hasil: '43 Lokasi Tertib, 100% Berita Acara Ditandatangani',
    },
    {
      period: '2025 S2',
      tahun: 2025,
      semester: 'Semester II',
      rutin: 38,
      timTerpadu: 12,
      total: 50,
      objekPenertiban: 'Penyerobotan Lahan HPL & Kebun Liar di Catchment',
      inisiator: 'Ditpam BP Batam & Tim Terpadu (TNI/Polri/Satpol PP)',
      lokasiDominan: 'Catchment Area Waduk Mukakuning & Sei Harapan',
      hasil: 'Penutupan 12 Lokasi Tambang Pasir & 38 Bangli Diratakan',
    },
    {
      period: '2026 S1',
      tahun: 2026,
      semester: 'Semester I',
      rutin: 41,
      timTerpadu: 11,
      total: 52,
      objekPenertiban: 'Gudang Ilegal, Kios Liar & Dermaga Nelayan Tanpa Izin',
      inisiator: 'Ditpam bersama Tim Terpadu Kota Batam',
      lokasiDominan: 'Jalur Arteri Bandara - Pelabuhan Kabil & Tanjung Riau',
      hasil: '52 Kegiatan Berjalan Kondusif & 87 Peringatan Diterbitkan',
    },
    {
      period: '2026 S2',
      tahun: 2026,
      semester: 'Semester II',
      rutin: 45,
      timTerpadu: 14,
      total: 59,
      objekPenertiban: 'Pondok Liar, Pembukaan Kebun Sawit Ilegal & Reklamasi Tanpa Izin',
      inisiator: 'Ditpam, Dit. Lahan & Tim Terpadu Gabungan',
      lokasiDominan: 'DTA Duriangkang Sektor Barat & Tembesi Hulu',
      hasil: '59 Operasi Selesai, Pemulihan 18,4 Ha Area Konservasi',
    },
  ],

  // --------------------------------------------------------------------------
  // KARTU 3: PENGHUNI, PENGGARAP, DAN NELAYAN LIAR (Horizontal Stacked Bar)
  // Dataset: Data Penghuni Penggarap dan Nelayan Liar (Terbuka, persemester)
  // --------------------------------------------------------------------------
  penghuniPenggarapNelayan: [
    {
      lokasi: 'Duriangkang & Catchment Area',
      tahun: 2026,
      semester: 'Semester I',
      rumahTinggal: 72,
      pondokGubuk: 28,
      kebunGarapan: 44,
      kerambaBagan: 12,
      totalJiwaKK: 156,
      totalLuasHa: 24.5,
      rataLamaMenempatiTahun: 8.5,
      caraMendapatkanDominan: 'Garap Sendiri',
    },
    {
      lokasi: 'Mukakuning & Sempadan Waduk',
      tahun: 2026,
      semester: 'Semester I',
      rumahTinggal: 48,
      pondokGubuk: 19,
      kebunGarapan: 32,
      kerambaBagan: 6,
      totalJiwaKK: 105,
      totalLuasHa: 14.2,
      rataLamaMenempatiTahun: 6.2,
      caraMendapatkanDominan: 'Beli',
    },
    {
      lokasi: 'Tembesi & Sei Ladi',
      tahun: 2026,
      semester: 'Semester I',
      rumahTinggal: 39,
      pondokGubuk: 14,
      kebunGarapan: 21,
      kerambaBagan: 18,
      totalJiwaKK: 92,
      totalLuasHa: 11.8,
      rataLamaMenempatiTahun: 5.1,
      caraMendapatkanDominan: 'Garap Sendiri',
    },
    {
      lokasi: 'Tanjung Piayu & Pesisir Kabil',
      tahun: 2026,
      semester: 'Semester I',
      rumahTinggal: 26,
      pondokGubuk: 11,
      kebunGarapan: 15,
      kerambaBagan: 27,
      totalJiwaKK: 79,
      totalLuasHa: 8.6,
      rataLamaMenempatiTahun: 9.8,
      caraMendapatkanDominan: 'Warisan',
    },
    {
      lokasi: 'Baloi Kolam & Batam Centre',
      tahun: 2026,
      semester: 'Semester I',
      rumahTinggal: 34,
      pondokGubuk: 8,
      kebunGarapan: 12,
      kerambaBagan: 0,
      totalJiwaKK: 54,
      totalLuasHa: 4.8,
      rataLamaMenempatiTahun: 4.4,
      caraMendapatkanDominan: 'Beli',
    },
    // Data Pembanding 2025
    {
      lokasi: 'Duriangkang & Catchment Area',
      tahun: 2025,
      semester: 'Semester II',
      rumahTinggal: 94,
      pondokGubuk: 36,
      kebunGarapan: 58,
      kerambaBagan: 16,
      totalJiwaKK: 204,
      totalLuasHa: 31.2,
      rataLamaMenempatiTahun: 9.2,
      caraMendapatkanDominan: 'Garap Sendiri',
    },
    {
      lokasi: 'Mukakuning & Sempadan Waduk',
      tahun: 2025,
      semester: 'Semester II',
      rumahTinggal: 62,
      pondokGubuk: 24,
      kebunGarapan: 41,
      kerambaBagan: 9,
      totalJiwaKK: 136,
      totalLuasHa: 18.5,
      rataLamaMenempatiTahun: 7.0,
      caraMendapatkanDominan: 'Beli',
    },
    {
      lokasi: 'Tembesi & Sei Ladi',
      tahun: 2025,
      semester: 'Semester II',
      rumahTinggal: 48,
      pondokGubuk: 18,
      kebunGarapan: 28,
      kerambaBagan: 22,
      totalJiwaKK: 116,
      totalLuasHa: 15.4,
      rataLamaMenempatiTahun: 5.8,
      caraMendapatkanDominan: 'Garap Sendiri',
    },
    {
      lokasi: 'Tanjung Piayu & Pesisir Kabil',
      tahun: 2025,
      semester: 'Semester II',
      rumahTinggal: 32,
      pondokGubuk: 15,
      kebunGarapan: 19,
      kerambaBagan: 31,
      totalJiwaKK: 97,
      totalLuasHa: 10.9,
      rataLamaMenempatiTahun: 10.4,
      caraMendapatkanDominan: 'Warisan',
    },
    {
      lokasi: 'Baloi Kolam & Batam Centre',
      tahun: 2025,
      semester: 'Semester II',
      rumahTinggal: 46,
      pondokGubuk: 12,
      kebunGarapan: 16,
      kerambaBagan: 0,
      totalJiwaKK: 74,
      totalLuasHa: 6.7,
      rataLamaMenempatiTahun: 5.1,
      caraMendapatkanDominan: 'Beli',
    },
  ],

  // --------------------------------------------------------------------------
  // KARTU 4: PENINDAKAN KAWASAN (TAB A: Aset & Obvit | TAB B: Lingkungan & Hutan)
  // Clustered Column per Semester (Luas Ha per Jenis Kegiatan)
  // --------------------------------------------------------------------------
  penindakanKawasan: {
    asetDanObvit: [
      {
        period: '2025 S1',
        tahun: 2025,
        semester: 'Semester I',
        kegiatan1LuasHa: 14.5,
        kegiatan1Nama: 'Penyerobotan Lahan HPL',
        kegiatan2LuasHa: 9.8,
        kegiatan2Nama: 'Pembangunan Bangli Obvit',
        kegiatan3LuasHa: 6.2,
        kegiatan3Nama: 'Pemanfaatan Lahan Tanpa SPJ',
        totalLuasHa: 30.5,
        namaKawasan: 'Buffer Zone Hang Nadim & Akses Pelabuhan Batu Ampar',
        keterangan: 'Pemasangan patok pengamanan & surat peringatan pertama s/d ketiga',
      },
      {
        period: '2025 S2',
        tahun: 2025,
        semester: 'Semester II',
        kegiatan1LuasHa: 16.2,
        kegiatan1Nama: 'Penyerobotan Lahan HPL',
        kegiatan2LuasHa: 11.4,
        kegiatan2Nama: 'Pembangunan Bangli Obvit',
        kegiatan3LuasHa: 7.8,
        kegiatan3Nama: 'Pemanfaatan Lahan Tanpa SPJ',
        totalLuasHa: 35.4,
        namaKawasan: 'Kawasan Industri Kabil, Batamindo & Waduk Duriangkang',
        keterangan: 'Pembongkaran mandiri 24 unit & penertiban paksa 8 gudang liar',
      },
      {
        period: '2026 S1',
        tahun: 2026,
        semester: 'Semester I',
        kegiatan1LuasHa: 11.8,
        kegiatan1Nama: 'Penyerobotan Lahan HPL',
        kegiatan2LuasHa: 7.9,
        kegiatan2Nama: 'Pembangunan Bangli Obvit',
        kegiatan3LuasHa: 4.5,
        kegiatan3Nama: 'Pemanfaatan Lahan Tanpa SPJ',
        totalLuasHa: 24.2,
        namaKawasan: 'Ring 1 Waduk Mukakuning & ROW Jalan Tol Batu Ampar - Muka Kuning',
        keterangan: 'Pemagaran kawat berduri 2.400 meter & sterilisasi area buffer',
      },
      {
        period: '2026 S2',
        tahun: 2026,
        semester: 'Semester II',
        kegiatan1LuasHa: 9.4,
        kegiatan1Nama: 'Penyerobotan Lahan HPL',
        kegiatan2LuasHa: 6.1,
        kegiatan2Nama: 'Pembangunan Bangli Obvit',
        kegiatan3LuasHa: 3.2,
        kegiatan3Nama: 'Pemanfaatan Lahan Tanpa SPJ',
        totalLuasHa: 18.7,
        namaKawasan: 'Kawasan Pesisir Pelabuhan Sekupang & Aset Idle Tanjung Pinggir',
        keterangan: 'Selesai 100% dipulihkan menjadi status aset steril BP Batam',
      },
    ],
    lingkunganDanHutan: [
      {
        period: '2025 S1',
        tahun: 2025,
        semester: 'Semester I',
        kegiatan1LuasHa: 18.2,
        kegiatan1Nama: 'Perambahan Hutan Lindung',
        kegiatan2LuasHa: 12.6,
        kegiatan2Nama: 'Galian C / Tambang Pasir Ilegal',
        kegiatan3LuasHa: 7.4,
        kegiatan3Nama: 'Illegal Logging & Pembakaran',
        totalLuasHa: 38.2,
        namaKawasan: 'Hutan Lindung Duriangkang Sektor Selatan',
        keterangan: 'Penyitaan 4 unit excavator & penutupan 6 kolam cucian pasir ilegal',
      },
      {
        period: '2025 S2',
        tahun: 2025,
        semester: 'Semester II',
        kegiatan1LuasHa: 21.0,
        kegiatan1Nama: 'Perambahan Hutan Lindung',
        kegiatan2LuasHa: 14.8,
        kegiatan2Nama: 'Galian C / Tambang Pasir Ilegal',
        kegiatan3LuasHa: 8.5,
        kegiatan3Nama: 'Illegal Logging & Pembakaran',
        totalLuasHa: 44.3,
        namaKawasan: 'DTA Waduk Mukakuning & Hutan Lindung Sei Ladi',
        keterangan: 'Operasi gabungan Gakkum KLHK & pemusnahan pondok perambah liar',
      },
      {
        period: '2026 S1',
        tahun: 2026,
        semester: 'Semester I',
        kegiatan1LuasHa: 14.6,
        kegiatan1Nama: 'Perambahan Hutan Lindung',
        kegiatan2LuasHa: 9.3,
        kegiatan2Nama: 'Galian C / Tambang Pasir Ilegal',
        kegiatan3LuasHa: 5.1,
        kegiatan3Nama: 'Illegal Logging & Pembakaran',
        totalLuasHa: 29.0,
        namaKawasan: 'Taman Wisata Alam Muka Kuning & Catchment Area Sei Harapan',
        keterangan: 'Penanaman 3.500 bibit mangrove & pohon endemik untuk pemulihan DTA',
      },
      {
        period: '2026 S2',
        tahun: 2026,
        semester: 'Semester II',
        kegiatan1LuasHa: 11.2,
        kegiatan1Nama: 'Perambahan Hutan Lindung',
        kegiatan2LuasHa: 6.8,
        kegiatan2Nama: 'Galian C / Tambang Pasir Ilegal',
        kegiatan3LuasHa: 3.7,
        kegiatan3Nama: 'Illegal Logging & Pembakaran',
        totalLuasHa: 21.7,
        namaKawasan: 'Kawasan Konservasi Hutan Lindung Tiban & Tanjung Piayu',
        keterangan: 'Patroli helikopter & pemantauan drone thermal mendeteksi nihil hotspot baru',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 5: KEJADIAN BENCANA ALAM DAN MITIGASI (TAB A: Bencana | TAB B: Mitigasi)
  // Horizontal Bar Chart
  // --------------------------------------------------------------------------
  kejadianDanMitigasi: {
    kejadianBencana: [
      {
        jenis: 'Pohon Tumbang',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 28,
        lokasi: 'Jalan Sudirman, Mukakuning, Sekupang & Sei Ladi',
        personil: 84,
        korban: 0,
        kerugianRp: 45000000,
        waktuMulaiAkhir: 'Jan - Jun 2026 (Avg Response: 11,2 Menit)',
        keterangan: 'Pembersihan ranting & batang pohon menghalangi jalan protokol',
      },
      {
        jenis: 'Banjir / Genangan',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 19,
        lokasi: 'Simpang Kepri Mall, Marina City & Seipanas',
        personil: 76,
        korban: 12,
        kerugianRp: 180000000,
        waktuMulaiAkhir: 'Feb - Mei 2026 (Avg Response: 13,5 Menit)',
        keterangan: 'Pompa mobile Ditpam dikerahkan, evakuasi 12 warga terjebak genangan',
      },
      {
        jenis: 'Tanah Longsor',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 11,
        lokasi: 'Tanjung Pinggir, Tiban Bukit & Seraya Atas',
        personil: 55,
        korban: 4,
        kerugianRp: 220000000,
        waktuMulaiAkhir: 'Jan - Mar 2026 (Avg Response: 14,0 Menit)',
        keterangan: 'Pemasangan terpal bronjong & relokasi sementara 4 penghuni lereng',
      },
      {
        jenis: 'Karhutla / Kebakaran Lahan',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 8,
        lokasi: 'Semak Belukar Sekitar Hang Nadim & Sei Beduk',
        personil: 62,
        korban: 0,
        kerugianRp: 65000000,
        waktuMulaiAkhir: 'Mar - Apr 2026 (Avg Response: 9,8 Menit)',
        keterangan: 'Pemadaman cepat 8 titik api sebelum mendekati perimeter runway bandara',
      },
      // 2025 Data
      {
        jenis: 'Pohon Tumbang',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 34,
        lokasi: 'Sei Ladi, Sukajadi & Batam Centre',
        personil: 92,
        korban: 1,
        kerugianRp: 60000000,
        waktuMulaiAkhir: 'Jul - Des 2025 (Avg Response: 12,0 Menit)',
        keterangan: '1 korban luka ringan tertimpa dahan, lalu lintas lancar dalam 25 menit',
      },
      {
        jenis: 'Banjir / Genangan',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 24,
        lokasi: 'Batu Aji, Marina & Nagoya Point',
        personil: 88,
        korban: 18,
        kerugianRp: 260000000,
        waktuMulaiAkhir: 'Okt - Des 2025 (Avg Response: 14,2 Menit)',
        keterangan: 'Evakuasi perahu karet dan penyedotan drainase tersumbat',
      },
      {
        jenis: 'Tanah Longsor',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 15,
        lokasi: 'Bukit Senyum, Tiban & Tanjung Sengkuang',
        personil: 70,
        korban: 6,
        kerugianRp: 310000000,
        waktuMulaiAkhir: 'Nov - Des 2025 (Avg Response: 15,4 Menit)',
        keterangan: 'Penanganan material longsoran menutup akses jalan permukiman',
      },
      {
        jenis: 'Karhutla / Kebakaran Lahan',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 13,
        lokasi: 'Kawasan Nongsa & Tembesi Sempadan Waduk',
        personil: 78,
        korban: 0,
        kerugianRp: 95000000,
        waktuMulaiAkhir: 'Agu - Sep 2025 (Avg Response: 10,5 Menit)',
        keterangan: 'Armada water cannon & damkar gabungan memadamkan 13 titik api',
      },
    ],
    mitigasiRescueSosialisasi: [
      {
        jenis: 'Sosialisasi Mitigasi Bahaya Kebakaran',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 32,
        lokasi: 'Rusunawa BP Batam, Gedung Kantor & Kawasan Industri',
        personil: 64,
        korban: 0,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Jan - Jun 2026 (Total 3.420 Peserta Edukasi)',
        keterangan: 'Pelatihan penggunaan APAR & simulasi evakuasi darurat gedung bertingkat',
      },
      {
        jenis: 'Pembersihan Aliran & Drainase Rawan Banjir',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 26,
        lokasi: 'Saluran Primer Duriangkang, Bengkong & Sei Baloi',
        personil: 95,
        korban: 0,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Jan - Mei 2026 (Pengerukan 4.200 M3 Sampah/Sedimen)',
        keterangan: 'Mencegah potensi banjir luapan saat curah hujan tinggi',
      },
      {
        jenis: 'Evakuasi & Water Rescue Waduk',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 18,
        lokasi: 'Waduk Duriangkang, Sei Harapan & Tembesi',
        personil: 52,
        korban: 5,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Feb - Jun 2026 (5 Korban Terselamatkan Hidup)',
        keterangan: 'Penyelamatan nelayan sampan bocor & perambah air terjebak pusaran',
      },
      {
        jenis: 'Pemasangan Plang Peringatan Bahaya Bencana',
        tahun: 2026,
        semester: 'Semester I',
        jumlah: 14,
        lokasi: 'Lereng Bukit Rawan Longsor & Tebing Pesisir Nongsa',
        personil: 36,
        korban: 0,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Mar - Mei 2026 (48 Titik Rawan Terpasang Signboard)',
        keterangan: 'Early warning system sederhana & nomor hotline darurat Ditpam BP Batam',
      },
      // 2025 Data
      {
        jenis: 'Sosialisasi Mitigasi Bahaya Kebakaran',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 28,
        lokasi: 'Pelabuhan Domestik, RSBP Batam & Pasar TPID',
        personil: 58,
        korban: 0,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Jul - Nov 2025 (Total 2.890 Peserta)',
        keterangan: 'Edukasi standar K3 & mitigasi dini kebakaran aset komersial',
      },
      {
        jenis: 'Pembersihan Aliran & Drainase Rawan Banjir',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 22,
        lokasi: 'Catchment Sei Beduk & Kanal Utama Batu Aji',
        personil: 82,
        korban: 0,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Agu - Des 2025 (Pembersihan 18 Titik Rawan)',
        keterangan: 'Kolaborasi Ditpam bersama masyarakat sekitar DTA',
      },
      {
        jenis: 'Evakuasi & Water Rescue Waduk',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 15,
        lokasi: 'Catchment Mukakuning & Dam Sei Ladi',
        personil: 46,
        korban: 4,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Jul - Des 2025 (Rescue 4 Korban)',
        keterangan: 'Patroli air rutin Ditpam mencegah kecelakaan perahu rakitan',
      },
      {
        jenis: 'Pemasangan Plang Peringatan Bahaya Bencana',
        tahun: 2025,
        semester: 'Semester II',
        jumlah: 12,
        lokasi: 'Titik Rawan Genangan Mukakuning & Seraya',
        personil: 30,
        korban: 0,
        kerugianRp: 0,
        waktuMulaiAkhir: 'Sep - Nov 2025 (36 Signboard)',
        keterangan: 'Penetapan zona merah rawan pergerakan tanah',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 6: PENGAMANAN UNJUK RASA (ComposedChart: Batang Aksi + Garis Personil)
  // Dataset: Rekap Pengamanan Unjuk Rasa (Terbuka, persemester)
  // --------------------------------------------------------------------------
  pengamananUnjukRasa: [
    {
      period: '2025 S1',
      tahun: 2025,
      semester: 'Semester I',
      jumlahAksi: 14,
      personilDikerahkan: 680,
      aliansiMasyarakat: 'Aliansi Pekerja/Buruh Kota Batam & Serikat Mandiri',
      permasalahanUtama: 'Tuntutan Penyesuaian Upah Minimum Kota (UMK) & Jaminan Keselamatan Kerja',
      lokasiAksi: 'Depan Gedung Graha Kepri & Gerbang Utama BP Batam',
      keterangan: 'Aksi berjalan aman, perwakilan diterima audiensi oleh Direktur terkait',
    },
    {
      period: '2025 S2',
      tahun: 2025,
      semester: 'Semester II',
      jumlahAksi: 18,
      personilDikerahkan: 920,
      aliansiMasyarakat: 'Solidaritas Warga Tempatan & Forum Komunikasi Masyarakat Pesisir',
      permasalahanUtama: 'Penyampaian Aspirasi Terkait Tata Batas Lahan Kampung Tua & Relokasi',
      lokasiAksi: 'Bundaran BP Batam Centre & Halaman Parkir Depan',
      keterangan: 'Pengawalan humanis dengan barikade Ditpam, situasi kondusif tanpa insiden',
    },
    {
      period: '2026 S1',
      tahun: 2026,
      semester: 'Semester I',
      jumlahAksi: 12,
      personilDikerahkan: 590,
      aliansiMasyarakat: 'Federasi Serikat Pekerja Logam & Asosiasi Pengemudi Angkutan',
      permasalahanUtama: 'Kebijakan Pengaturan Tarif Angkutan Kawasan Pelabuhan & Fasilitas Kesejahteraan',
      lokasiAksi: 'Kawasan Pelabuhan Domestik Telaga Punggur & BP Batam Centre',
      keterangan: 'Audiensi langsung disepakati berita acara kesepahaman bersama',
    },
    {
      period: '2026 S2',
      tahun: 2026,
      semester: 'Semester II',
      jumlahAksi: 9,
      personilDikerahkan: 450,
      aliansiMasyarakat: 'Koalisi Lembaga Swadaya Masyarakat Pemerhati Lingkungan',
      permasalahanUtama: 'Tuntutan Penegakan Hukum Penambangan Pasir Ilegal di Catchment Waduk',
      lokasiAksi: 'Lobi Utama Gedung BP Batam Centre',
      keterangan: 'Pemberian apresiasi atas tindakan tegas penutupan 12 tambang pasir oleh Ditpam',
    },
  ],

  // --------------------------------------------------------------------------
  // KARTU 7: PERSONIL PENGAMANAN (TAB A: Distribusi | TAB B: Sertifikasi Khusus)
  // Stacked Bar Chart per Status Pegawai (PNS, P3K, Kontrak/Ditpam)
  // --------------------------------------------------------------------------
  personil: {
    distribusiPersonil: [
      {
        penempatanAtauSertifikasi: 'Kantor Pusat BP Batam Centre',
        tahun: 2026,
        semester: 'Semester I',
        pns: 18,
        p3k: 32,
        kontrakDitpam: 95,
        total: 145,
        subditAtauPenerbit: 'Subdit Pengamanan Objek Vital & Gedung Utama',
        keteranganTambahan: 'Pengamanan 24 Jam 3 Shift, Lobi, VIP Lounge & Command Center',
      },
      {
        penempatanAtauSertifikasi: 'Waduk Duriangkang & Catchment Area',
        tahun: 2026,
        semester: 'Semester I',
        pns: 12,
        p3k: 24,
        kontrakDitpam: 86,
        total: 122,
        subditAtauPenerbit: 'Subdit Pengamanan Hutan & Konservasi Sumber Air',
        keteranganTambahan: 'Posko Utama Duriangkang, 6 Menara Pantau & 2 Unit Speedboat Patroli',
      },
      {
        penempatanAtauSertifikasi: 'Bandara Internasional Hang Nadim',
        tahun: 2026,
        semester: 'Semester I',
        pns: 10,
        p3k: 22,
        kontrakDitpam: 74,
        total: 106,
        subditAtauPenerbit: 'Subdit Pengamanan Aset dan Fasilitas Penerbangan',
        keteranganTambahan: 'Perimeter Pagar Luar, Buffer Runway & Akses Kargo Bandara',
      },
      {
        penempatanAtauSertifikasi: 'Pelabuhan Batu Ampar & Terminal Penumpang',
        tahun: 2026,
        semester: 'Semester I',
        pns: 8,
        p3k: 19,
        kontrakDitpam: 68,
        total: 95,
        subditAtauPenerbit: 'Subdit Pengamanan Pelabuhan & Jalur Logistik',
        keteranganTambahan: 'Gerbang ISPS Code, Container Yard & Dermaga Pelabuhan',
      },
      {
        penempatanAtauSertifikasi: 'Waduk Mukakuning, Tembesi & Sei Ladi',
        tahun: 2026,
        semester: 'Semester I',
        pns: 9,
        p3k: 16,
        kontrakDitpam: 59,
        total: 84,
        subditAtauPenerbit: 'Subdit Pengamanan Hutan Lindung & Buffer Zone',
        keteranganTambahan: 'Patroli Jalur Trail, Pos Jaga Intake Air Baku & Patroli Drone',
      },
      {
        penempatanAtauSertifikasi: 'Subdit Patroli Reaksi Cepat & Damkar Ditpam',
        tahun: 2026,
        semester: 'Semester I',
        pns: 8,
        p3k: 15,
        kontrakDitpam: 49,
        total: 72,
        subditAtauPenerbit: 'Subdit Mitigasi, Penanggulangan Bahaya Kebakaran & Penertiban',
        keteranganTambahan: 'Kesiapsiagaan Quick Response Call 112 & Operasi Gabungan',
      },
    ],
    sertifikasiKhusus: [
      {
        penempatanAtauSertifikasi: 'Gada Pratama (Kualifikasi Dasar Polsus/Satpam)',
        tahun: 2026,
        semester: 'Semester I',
        pns: 24,
        p3k: 68,
        kontrakDitpam: 284,
        total: 376,
        subditAtauPenerbit: 'Polda Kepulauan Riau & Mabes Polri',
        keteranganTambahan: 'Sertifikasi kompetensi pengamanan fisik & wewenang kepolisian terbatas',
      },
      {
        penempatanAtauSertifikasi: 'Gada Madya (Supervisor & Komandan Regu)',
        tahun: 2026,
        semester: 'Semester I',
        pns: 19,
        p3k: 34,
        kontrakDitpam: 42,
        total: 95,
        subditAtauPenerbit: 'Korbinmas Baharkam Mabes Polri',
        keteranganTambahan: 'Sertifikasi kepemimpinan taktis lapangan & manajemen kontingensi',
      },
      {
        penempatanAtauSertifikasi: 'SAR, Water Rescue & Penyelamatan Air',
        tahun: 2026,
        semester: 'Semester I',
        pns: 8,
        p3k: 16,
        kontrakDitpam: 38,
        total: 62,
        subditAtauPenerbit: 'Badan Nasional Pencarian dan Pertolongan (BASARNAS)',
        keteranganTambahan: 'Kualifikasi pertolongan korban tenggelam di waduk & bencana air',
      },
      {
        penempatanAtauSertifikasi: 'Damkar Tingkat 1 & Petugas K3 Kebakaran',
        tahun: 2026,
        semester: 'Semester I',
        pns: 7,
        p3k: 14,
        kontrakDitpam: 35,
        total: 56,
        subditAtauPenerbit: 'Kementerian Ketenagakerjaan RI & Dinas Damkar',
        keteranganTambahan: 'Standar penanggulangan kebakaran gedung bertingkat & kawasan industri',
      },
      {
        penempatanAtauSertifikasi: 'Kualifikasi Menembak & Senjata Api Khusus',
        tahun: 2026,
        semester: 'Semester I',
        pns: 12,
        p3k: 15,
        kontrakDitpam: 21,
        total: 48,
        subditAtauPenerbit: 'Perbakin & Ditintelkam Polda Kepri',
        keteranganTambahan: 'Izin penggunaan senjata peluru karet/gas air mata untuk pengawalan VIP',
      },
      {
        penempatanAtauSertifikasi: 'Intelijen Pengamanan & Investigasi Aset',
        tahun: 2026,
        semester: 'Semester I',
        pns: 9,
        p3k: 11,
        kontrakDitpam: 16,
        total: 36,
        subditAtauPenerbit: 'Lembaga Pendidikan & Pelatihan Intelkam Polri',
        keteranganTambahan: 'Penyelidikan mafia tanah, perambahan ilegal & penyerobotan HPL',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 8: PROTEKSI KEBAKARAN DAN KEGIATAN PENGAMANAN PER SUBDIT
  // TAB A: Proteksi Kebakaran (APAR, Hidran, Sprinkler, Detektor Asap)
  // TAB B: Kegiatan Pengamanan per Subdit (Patroli, Razia, dsb)
  // --------------------------------------------------------------------------
  proteksiDanKegiatan: {
    proteksiKebakaran: [
      {
        jenisBangunan: 'Gedung Kantor Pusat BP Batam & Annex',
        tahun: 2026,
        semester: 'Semester I',
        apar: 142,
        hidran: 36,
        sprinkler: 380,
        detektorAsap: 410,
        totalAlat: 968,
        rekomendasi: '100% Laik Pakai, Tekanan Hidran 7,5 Bar Terjaga',
        periodeInspeksi: 'Inspeksi Berkala Triwulan I & II 2026',
      },
      {
        jenisBangunan: 'Terminal Bandara Hang Nadim',
        tahun: 2026,
        semester: 'Semester I',
        apar: 186,
        hidran: 54,
        sprinkler: 620,
        detektorAsap: 780,
        totalAlat: 1640,
        rekomendasi: 'Sertifikasi Kelaikan Sistem Kebakaran Diperpanjang s/d 2027',
        periodeInspeksi: 'Inspeksi Terpadu Bersama Otoritas Bandara (Maret 2026)',
      },
      {
        jenisBangunan: 'Terminal Pelabuhan Batu Ampar & Sekupang',
        tahun: 2026,
        semester: 'Semester I',
        apar: 118,
        hidran: 42,
        sprinkler: 190,
        detektorAsap: 240,
        totalAlat: 590,
        rekomendasi: 'Penggantian 14 tabung APAR CO2 kedaluwarsa telah selesai',
        periodeInspeksi: 'Audit Kesiapan Keselamatan Maritim (April 2026)',
      },
      {
        jenisBangunan: 'Rusunawa BP Batam (Muka Kuning & Kabil)',
        tahun: 2026,
        semester: 'Semester I',
        apar: 96,
        hidran: 28,
        sprinkler: 0,
        detektorAsap: 160,
        totalAlat: 284,
        rekomendasi: 'Uji pompa hisap hidran lancar, edukasi warga blok A-F terlaksana',
        periodeInspeksi: 'Inspeksi Keselamatan Penghuni Rusun (Februari 2026)',
      },
      {
        jenisBangunan: 'Rumah Sakit BP Batam (RSBP)',
        tahun: 2026,
        semester: 'Semester I',
        apar: 154,
        hidran: 48,
        sprinkler: 450,
        detektorAsap: 560,
        totalAlat: 1212,
        rekomendasi: 'Pintu Darurat & Smoke Evacuation Fan 100% Berfungsi Normal',
        periodeInspeksi: 'Audit Akreditasi KARS Sektor Proteksi Kebakaran (Mei 2026)',
      },
    ],
    kegiatanSubdit: [
      {
        subdit: 'Subdit Pengamanan Aset & Tanah HPL',
        tahun: 2026,
        semester: 'Semester I',
        patroliRutin: 64,
        raziaGabungan: 18,
        pengawalanVvip: 12,
        pengamananEvent: 8,
        totalKegiatan: 102,
        lokasiSasaran: 'Aset Idle BP Batam, Lahan Cadangan Industri & Batam Centre',
        personilTerlibat: 280,
        hasilTemuan: 'Nihil penyerobotan baru, 14 patok batas diperbaiki',
      },
      {
        subdit: 'Subdit Pengamanan Hutan & Konservasi Waduk',
        tahun: 2026,
        semester: 'Semester I',
        patroliRutin: 78,
        raziaGabungan: 24,
        pengawalanVvip: 0,
        pengamananEvent: 4,
        totalKegiatan: 106,
        lokasiSasaran: 'Catchment Duriangkang, Sei Ladi, Tembesi & Mukakuning',
        personilTerlibat: 310,
        hasilTemuan: 'Penutupan 6 akses jalan tikus perambah & pembongkaran 8 pondok liar',
      },
      {
        subdit: 'Subdit Pengamanan Objek Vital & Kawasan Khusus',
        tahun: 2026,
        semester: 'Semester I',
        patroliRutin: 86,
        raziaGabungan: 14,
        pengawalanVvip: 26,
        pengamananEvent: 16,
        totalKegiatan: 142,
        lokasiSasaran: 'Bandara Hang Nadim, Pelabuhan Batu Ampar & Gedung Utama',
        personilTerlibat: 420,
        hasilTemuan: '100% Event kenegaraan aman terkendali tanpa kompromi keamanan',
      },
      {
        subdit: 'Subdit Mitigasi, Rescue & Penanggulangan Kebakaran',
        tahun: 2026,
        semester: 'Semester I',
        patroliRutin: 52,
        raziaGabungan: 12,
        pengawalanVvip: 6,
        pengamananEvent: 14,
        totalKegiatan: 84,
        lokasiSasaran: 'Titik Rawan Genangan, Lereng Longsor & Posko Siaga 112',
        personilTerlibat: 240,
        hasilTemuan: 'Rata-rata Response Time 11,2 Menit melampaui target SLA (<15 Menit)',
      },
    ],
  },
};
