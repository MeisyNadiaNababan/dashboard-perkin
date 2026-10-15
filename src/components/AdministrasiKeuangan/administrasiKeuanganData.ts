/**
 * DATA & KONSTANTA RESMI DASHBOARD DEPUTI BIDANG ADMINISTRASI DAN KEUANGAN (DEP-A1)
 * Landasan Hukum & Acuan:
 * 1. Dokumen Perjanjian Kinerja (Perkin A1) Nomor: 4 /KA/ 3 /2025
 *    Pihak Pertama: Alexander Zulkarnain (Anggota/Deputi Bidang Administrasi dan Keuangan)
 *    Pihak Kedua: Amsakar Achmad (Kepala Badan Pengusahaan Batam), Batam 13 Maret 2025
 * 2. Lampiran I & II Perkin: Penetapan & Penjelasan 4 IKP (RB, Sistem Merit, SPIP, Opini BPK)
 * 3. 5 Kegiatan Anggaran Perkin 2025 (Total Pagu Rp 725.148.975.000,-)
 * 4. Dokumen Resmi Buku Satu Data BP Batam:
 *    - Biro Sumber Daya Manusia (Hal. 1-2)
 *    - Biro Keuangan (Hal. 2-6)
 *    - Biro Organisasi, Kepatuhan dan Manajemen Risiko (Hal. 38-40)
 *    - Biro Umum (Hal. 43-46)
 *    - Biro Hukum (Hal. 2)
 */

export interface PerkinA1HeaderInfo {
  nomorPerkin: string;
  tanggalPenetapan: string;
  pejabatPihakPertama: string;
  jabatanPihakPertama: string;
  pejabatPihakKedua: string;
  jabatanPihakKedua: string;
  sasaranProgram: string;
  totalPaguAnggaran: number;
  totalPaguFormatted: string;
  realisasiTotalAnggaran: number;
  persentaseSerapan: number;
  terakhirDiperbarui: string;
}

export const PERKIN_A1_INFO: PerkinA1HeaderInfo = {
  nomorPerkin: '4 /KA/ 3 /2025',
  tanggalPenetapan: '13 Maret 2025',
  pejabatPihakPertama: 'Alexander Zulkarnain',
  jabatanPihakPertama: 'Anggota / Deputi Bidang Administrasi dan Keuangan',
  pejabatPihakKedua: 'Amsakar Achmad',
  jabatanPihakKedua: 'Kepala Badan Pengusahaan Batam',
  sasaranProgram: 'Meningkatkan kualitas pengelolaan internal BP Batam',
  totalPaguAnggaran: 725148975000,
  totalPaguFormatted: 'Rp 725,15 M',
  realisasiTotalAnggaran: 263255140000,
  persentaseSerapan: 36.3,
  terakhirDiperbarui: '12/10/2026',
};

// ============================================================================
// 1. ATURAN STATUS (3 STATUS SAJA: TERCAPAI, DALAM PANTAUAN, PERLU PERHATIAN)
// ============================================================================
export type StatusKpi = 'TERCAPAI' | 'DALAM_PANTAUAN' | 'PERLU_PERHATIAN';

export interface StatusConfig {
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  dotClass: string;
}

export const STATUS_CONFIG: Record<StatusKpi, StatusConfig> = {
  TERCAPAI: {
    label: 'Tercapai',
    colorClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    dotClass: 'bg-emerald-500',
  },
  DALAM_PANTAUAN: {
    label: 'Dalam Pantauan',
    colorClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    dotClass: 'bg-amber-500',
  },
  PERLU_PERHATIAN: {
    label: 'Perlu Perhatian',
    colorClass: 'text-rose-700',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    dotClass: 'bg-rose-500',
  },
};

export const getStatusFromAchievement = (capaianPersen: number): StatusKpi => {
  if (capaianPersen >= 100) return 'TERCAPAI';
  if (capaianPersen >= 90) return 'DALAM_PANTAUAN';
  return 'PERLU_PERHATIAN';
};

// ============================================================================
// 2. DATA 4 INDIKATOR KINERJA PROGRAM (IKP) PERKIN DEP-A1
// ============================================================================
export interface KomponenIkpDrawer {
  nama: string;
  bobotMaksimal: number;
  skorCapaian: number;
  capaianPersen: number;
  status: StatusKpi;
  keterangan: string;
}

export interface SkalaPredikatItem {
  kode: string;
  rentang: string;
  predikat: string;
  keterangan?: string;
  isTarget?: boolean;
}

export interface PerkinIkpItem {
  id: string;
  no: number;
  judulSingkat: string; // Maks 4 kata
  namaLengkap: string;
  biroPengampu: string;
  nilaiUtama: string;
  angkaTampil: number | string;
  targetTeks: string;
  targetAngka: number;
  realisasiAngka: number;
  capaianPersen: number;
  status: StatusKpi;
  predikat: string;
  barisKonteks: string;
  jenisPeriode: 'Tahunan' | 'Kuartal';
  deltaVsTahunLalu?: string;
  sparklineTw?: number[];
  sumberData: string;
  datasetSatuData: string;
  rumusPerhitungan: string;
  dasarHukum: string;
  komponenDrawer: KomponenIkpDrawer[];
  skalaPredikat: SkalaPredikatItem[];
  kriteriaSapChecklist?: {
    id: string;
    kriteria: string;
    deskripsi: string;
    terpenuhi: boolean;
  }[];
}

// Skala Predikat Reformasi Birokrasi (PermenPAN-RB No. 3/2023 & KepmenPAN-RB No. 182/2025)
export const SKALA_PREDIKAT_RB: SkalaPredikatItem[] = [
  { kode: 'AA', rentang: '> 90 - 100', predikat: 'Sangat Memuaskan' },
  { kode: 'A', rentang: '> 80 - 90', predikat: 'Memuaskan' },
  { kode: 'BB', rentang: '> 70 - 80', predikat: 'Sangat Baik', isTarget: true },
  { kode: 'B', rentang: '> 60 - 70', predikat: 'Baik' },
  { kode: 'CC', rentang: '> 50 - 60', predikat: 'Cukup' },
  { kode: 'C', rentang: '> 30 - 50', predikat: 'Kurang' },
  { kode: 'D', rentang: '0 - 30', predikat: 'Sangat Kurang' },
];

// Skala Predikat Sistem Merit (PermenPAN-RB No. 40/2018 & Perka KASN No. 9/2019)
export const SKALA_PREDIKAT_MERIT: SkalaPredikatItem[] = [
  { kode: 'Kategori IV', rentang: '325 - 400', predikat: 'Sangat Baik' },
  { kode: 'Kategori III', rentang: '250 - 324', predikat: 'Baik', isTarget: true },
  { kode: 'Kategori II', rentang: '175 - 249', predikat: 'Kurang' },
  { kode: 'Kategori I', rentang: '100 - 174', predikat: 'Buruk' },
];

// Skala Predikat Maturitas SPIP (PP No. 60/2008 & Perka BPKP No. 5/2021)
export const SKALA_PREDIKAT_SPIP: SkalaPredikatItem[] = [
  { kode: 'Level 5', rentang: '4,50 - 5,00', predikat: 'Optimum', keterangan: 'Pengendalian intern adaptif & membudaya' },
  { kode: 'Level 4', rentang: '3,50 - 4,49', predikat: 'Terdefinisi', keterangan: 'Terintegrasi dalam manajemen berkala' },
  { kode: 'Level 3', rentang: '3,00 - 3,49', predikat: 'Berkembang', keterangan: 'Terdokumentasi & diterapkan konsisten', isTarget: true },
  { kode: 'Level 2', rentang: '2,00 - 2,99', predikat: 'Rintisan', keterangan: 'Kebijakan dasar ada, belum menyeluruh' },
  { kode: 'Level 1', rentang: '1,00 - 1,99', predikat: 'Rintisan Awal', keterangan: 'Belum ada penerapan formal' },
];

export const PERKIN_A1_IKP_LIST: PerkinIkpItem[] = [
  {
    id: 'ikp-1-rb',
    no: 1,
    judulSingkat: 'Reformasi Birokrasi',
    namaLengkap: 'Indeks Reformasi Birokrasi',
    biroPengampu: 'Biro OKMR',
    nilaiUtama: '81,14',
    angkaTampil: 81.14,
    targetTeks: 'Target BB (80,00)',
    targetAngka: 80.0,
    realisasiAngka: 81.14,
    capaianPersen: 101.4,
    status: 'TERCAPAI',
    predikat: 'Sangat Baik (A)',
    barisKonteks: 'Target 80,00 (BB) · +2,69 vs 2024 (78,45)',
    jenisPeriode: 'Tahunan',
    deltaVsTahunLalu: '+2,69 vs tahun lalu',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    datasetSatuData: 'Buku Satu Data Hal. 39 No. 12: Data Kebijakan Road Map Reformasi Birokrasi',
    rumusPerhitungan:
      'Penjumlahan pembobotan 8 area perubahan RB General (Manajemen Perubahan, Deregulasi, Organisasi, Tata Laksana, SDM, SAKIP, Pengawasan, Pelayanan Publik) dan RB Tematik.',
    dasarHukum:
      'PermenPAN-RB No. 3/2023 tentang Road Map Reformasi Birokrasi dan KepmenPAN-RB No. 182/2025 tentang Petunjuk Teknis Evaluasi RB.',
    komponenDrawer: [
      {
        nama: 'Peningkatan Kualitas Pelayanan Publik',
        bobotMaksimal: 15.0,
        skorCapaian: 11.2,
        capaianPersen: 74.7,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Perlu optimalisasi SLA perizinan dan digitalisasi PTSP',
      },
      {
        nama: 'Penataan Organisasi',
        bobotMaksimal: 10.0,
        skorCapaian: 7.8,
        capaianPersen: 78.0,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Right-sizing kelembagaan dan efisiensi tugas fungsi',
      },
      {
        nama: 'Penguatan Pengawasan Intern',
        bobotMaksimal: 10.0,
        skorCapaian: 8.05,
        capaianPersen: 80.5,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Tindak lanjut rekomendasi audit SPI dan pengaduan WBS',
      },
      {
        nama: 'Deregulasi Kebijakan',
        bobotMaksimal: 10.0,
        skorCapaian: 8.3,
        capaianPersen: 83.0,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Harmonisasi Perka terkait kemudahan berusaha',
      },
      {
        nama: 'Manajemen Perubahan',
        bobotMaksimal: 10.0,
        skorCapaian: 8.5,
        capaianPersen: 85.0,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Implementasi budaya kerja BerAKHLAK satker',
      },
      {
        nama: 'Penataan Sistem Manajemen SDM',
        bobotMaksimal: 15.0,
        skorCapaian: 13.1,
        capaianPersen: 87.3,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Penerapan sistem merit dan manajemen talenta',
      },
      {
        nama: 'Penguatan Akuntabilitas (SAKIP)',
        bobotMaksimal: 15.0,
        skorCapaian: 13.25,
        capaianPersen: 88.3,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Kualitas pelaporan kinerja berorientasi dampak',
      },
      {
        nama: 'Penataan Tata Laksana (SPBE)',
        bobotMaksimal: 15.0,
        skorCapaian: 13.4,
        capaianPersen: 89.3,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Keterpaduan proses bisnis dan layanan Satu Data',
      },
    ],
    skalaPredikat: SKALA_PREDIKAT_RB,
  },
  {
    id: 'ikp-2-merit',
    no: 2,
    judulSingkat: 'Sistem Merit',
    namaLengkap: 'Indeks Sistem Merit',
    biroPengampu: 'Biro SDM',
    nilaiUtama: '342,5',
    angkaTampil: 342.5,
    targetTeks: 'Target 280 (Baik)',
    targetAngka: 280.0,
    realisasiAngka: 342.5,
    capaianPersen: 122.3,
    status: 'TERCAPAI',
    predikat: 'Sangat Baik (Kategori IV)',
    barisKonteks: 'Target 280 · Tren naik TW1–TW4 (Kategori IV)',
    jenisPeriode: 'Kuartal',
    sparklineTw: [315.0, 328.0, 336.0, 342.5],
    sumberData: 'Biro Sumber Daya Manusia (BSDM)',
    datasetSatuData: 'Buku Satu Data Hal. 2 No. 12: Indeks Sistem Merit',
    rumusPerhitungan:
      'Penjumlahan perkalian skor atas 36 parameter kegiatan pada 8 aspek penilaian mandiri Sistem Merit (skala maksimal 400 poin).',
    dasarHukum:
      'PermenPAN-RB No. 40/2018 tentang Pedoman Sistem Merit dan Peraturan KASN No. 9/2019 tentang Tata Cara Penilaian Mandiri Sistem Merit.',
    komponenDrawer: [
      {
        nama: '7. Perlindungan dan Pelayanan',
        bobotMaksimal: 16.0,
        skorCapaian: 12.0,
        capaianPersen: 75.0,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Peningkatan jaminan kesehatan, hukum, dan asuransi',
      },
      {
        nama: '8. Sistem Informasi Kepegawaian',
        bobotMaksimal: 76.0,
        skorCapaian: 60.5,
        capaianPersen: 79.6,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Integrasi SIMPEG dengan Satu Data dan presensi digital',
      },
      {
        nama: '4. Promosi dan Mutasi',
        bobotMaksimal: 40.0,
        skorCapaian: 32.5,
        capaianPersen: 81.3,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Optimalisasi uji kompetensi assessment center berkala',
      },
      {
        nama: '6. Penggajian, Penghargaan, Disiplin',
        bobotMaksimal: 60.0,
        skorCapaian: 51.5,
        capaianPersen: 85.8,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Remunerasi BLU dan penegakan disiplin pegawai',
      },
      {
        nama: '5. Manajemen Kinerja Pegawai',
        bobotMaksimal: 80.0,
        skorCapaian: 69.5,
        capaianPersen: 86.9,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Kesesuaian SKP periodik dan evaluasi kinerja bawahan',
      },
      {
        nama: '3. Pengembangan Karier',
        bobotMaksimal: 80.0,
        skorCapaian: 71.0,
        capaianPersen: 88.8,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Talent mapping 9-box grid dan jalur pendidikan tubel',
      },
      {
        nama: '1. Perencanaan Kebutuhan ASN',
        bobotMaksimal: 24.0,
        skorCapaian: 22.5,
        capaianPersen: 93.8,
        status: 'TERCAPAI',
        keterangan: 'Anjab & ABK 5 tahunan terverifikasi KemenPAN-RB',
      },
      {
        nama: '2. Pengadaan ASN',
        bobotMaksimal: 24.0,
        skorCapaian: 23.0,
        capaianPersen: 95.8,
        status: 'TERCAPAI',
        keterangan: 'Proses seleksi berbasis CAT transparan dan akuntabel',
      },
    ],
    skalaPredikat: SKALA_PREDIKAT_MERIT,
  },
  {
    id: 'ikp-3-spip',
    no: 3,
    judulSingkat: 'Maturitas SPIP',
    namaLengkap: 'Indeks Maturitas SPIP',
    biroPengampu: 'Biro OKMR',
    nilaiUtama: '3,42',
    angkaTampil: 3.42,
    targetTeks: 'Target 3,2 (Level 3)',
    targetAngka: 3.2,
    realisasiAngka: 3.42,
    capaianPersen: 106.9,
    status: 'TERCAPAI',
    predikat: 'Level 3 (Berkembang)',
    barisKonteks: 'Target 3,2 · +0,24 vs 2024 (3,18)',
    jenisPeriode: 'Tahunan',
    deltaVsTahunLalu: '+0,24 vs tahun lalu',
    sumberData: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    datasetSatuData: 'Buku Satu Data Hal. 40 No. 17: Data Penilaian Maturitas SPIP',
    rumusPerhitungan:
      'Penilaian mandiri terintegrasi BPKP atas 5 unsur SPIP dikombinasikan dengan Manajemen Risiko Indeks (MRI) dan Indeks Efektivitas Pencegahan Korupsi (IEPK).',
    dasarHukum:
      'PP No. 60/2008 tentang Sistem Pengendalian Intern Pemerintah dan Perka BPKP No. 5/2021 tentang Penilaian Maturitas SPIP Terintegrasi.',
    komponenDrawer: [
      {
        nama: '2. Penilaian Risiko (Risk Assessment)',
        bobotMaksimal: 5.0,
        skorCapaian: 3.25,
        capaianPersen: 65.0,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Register risiko unit operasional dan rencana mitigasi',
      },
      {
        nama: '5. Pemantauan Pengendalian Intern',
        bobotMaksimal: 5.0,
        skorCapaian: 3.35,
        capaianPersen: 67.0,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Reviu berkala dan pemantauan tindak lanjut audit SPI',
      },
      {
        nama: '4. Informasi dan Komunikasi',
        bobotMaksimal: 5.0,
        skorCapaian: 3.4,
        capaianPersen: 68.0,
        status: 'PERLU_PERHATIAN',
        keterangan: 'Diseminasi kebijakan pengendalian dan saluran WBS',
      },
      {
        nama: '3. Kegiatan Pengendalian',
        bobotMaksimal: 5.0,
        skorCapaian: 3.52,
        capaianPersen: 70.4,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Pemisahan otorisasi, standar SOP, dan verifikasi dokumen',
      },
      {
        nama: '1. Lingkungan Pengendalian',
        bobotMaksimal: 5.0,
        skorCapaian: 3.58,
        capaianPersen: 71.6,
        status: 'DALAM_PANTAUAN',
        keterangan: 'Keteladanan integritas, kode etik pimpinan, komitmen SDM',
      },
    ],
    skalaPredikat: SKALA_PREDIKAT_SPIP,
  },
  {
    id: 'ikp-4-wtp',
    no: 4,
    judulSingkat: 'Opini BPK',
    namaLengkap: 'Opini Badan Pemeriksa Keuangan (BPK)',
    biroPengampu: 'Biro Keuangan',
    nilaiUtama: 'WTP',
    angkaTampil: 'WTP',
    targetTeks: 'Target WTP',
    targetAngka: 100.0,
    realisasiAngka: 100.0,
    capaianPersen: 100.0,
    status: 'TERCAPAI',
    predikat: 'Wajar Tanpa Pengecualian',
    barisKonteks: 'Target WTP · 8x Berturut-turut (TA 2017–2024)',
    jenisPeriode: 'Tahunan',
    deltaVsTahunLalu: 'Konsisten 8 tahun berturut-turut',
    sumberData: 'Biro Keuangan BP Batam',
    datasetSatuData: 'Buku Satu Data Hal. 6 No. 27: Data Opini BPK Tahunan',
    rumusPerhitungan:
      'Kesesuaian penyusunan Laporan Keuangan BP Batam terhadap Standar Akuntansi Pemerintahan (SAP), kecukupan pengungkapan, efektivitas SPI, dan kepatuhan perundang-undangan.',
    dasarHukum:
      'UU No. 15/2004 tentang Pemeriksaan Pengelolaan dan Tanggung Jawab Keuangan Negara & Standar Akuntansi Pemerintahan (SAP).',
    komponenDrawer: [],
    skalaPredikat: [
      { kode: 'WTP', rentang: 'Nilai Terbaik', predikat: 'Wajar Tanpa Pengecualian', isTarget: true },
      { kode: 'WDP', rentang: 'Modifikasi Tertentu', predikat: 'Wajar Dengan Pengecualian' },
      { kode: 'TW', rentang: 'Penyimpangan Material', predikat: 'Tidak Wajar' },
      { kode: 'TMP', rentang: 'Batasan Lingkup Pemeriksaan', predikat: 'Tidak Memberikan Pendapat (Disclaimer)' },
    ],
    kriteriaSapChecklist: [
      {
        id: 'sap-1',
        kriteria: 'Kesesuaian Standar Akuntansi Pemerintahan (SAP)',
        deskripsi: 'Penerapan standar akuntansi berbasis akrual penuh pada seluruh transaksi keuangan BP Batam.',
        terpenuhi: true,
      },
      {
        id: 'sap-2',
        kriteria: 'Kecukupan Pengungkapan Informasi (CaLK)',
        deskripsi: 'Catatan atas Laporan Keuangan memadai, transparan, dan lengkap menjelaskan pos pendapatan serta belanja.',
        terpenuhi: true,
      },
      {
        id: 'sap-3',
        kriteria: 'Kepatuhan terhadap Peraturan Perundang-undangan',
        deskripsi: 'Nihil temuan kerugian negara atau ketidakpatuhan perundang-undangan yang bersifat material.',
        terpenuhi: true,
      },
      {
        id: 'sap-4',
        kriteria: 'Efektivitas Sistem Pengendalian Intern (SPI Keuangan)',
        deskripsi: 'Pencegahan risiko fraud andal melalui rekonsiliasi kas, persediaan, dan BMN secara berkala.',
        terpenuhi: true,
      },
    ],
  },
];

export const PERKIN_A1_KPIS = PERKIN_A1_IKP_LIST;

// ============================================================================
// 3. PAGU 5 KEGIATAN ANGGARAN DEPUTI A1 (DATA RESMI PERKIN 2025)
// ============================================================================
export interface KegiatanAnggaranItem {
  id: string;
  nomor: number;
  namaKegiatan: string;
  namaSingkat: string;
  paguAnggaran: number; // Rupiah
  paguFormatted: string; // Misal Rp 114,34 M
  realisasiAnggaran: number; // Data contoh realistis
  realisasiFormatted: string;
  persentaseRealisasi: number;
  biroPengampu: string;
  isDummy: boolean; // Tanda kecil "data contoh" sesuai aturan
}

export const KEGIATAN_ANGGARAN_A1: KegiatanAnggaranItem[] = [
  {
    id: 'keg-1',
    nomor: 1,
    namaKegiatan: 'Kerumahtanggaan, Kesekretariatan & Pengadaan Barang/Jasa',
    namaSingkat: 'Pelayanan Kerumahtanggaan, Kesekretariatan & Pengadaan',
    paguAnggaran: 114344199000,
    paguFormatted: 'Rp 114,34 M',
    realisasiAnggaran: 42307353630,
    realisasiFormatted: 'Rp 42,31 M',
    persentaseRealisasi: 37.0,
    biroPengampu: 'Biro Umum',
    isDummy: true,
  },
  {
    id: 'keg-2',
    nomor: 2,
    namaKegiatan: 'Perencanaan Anggaran & Pengelolaan Administrasi Keuangan',
    namaSingkat: 'Perencanaan Anggaran & Administrasi Keuangan',
    paguAnggaran: 7101918000,
    paguFormatted: 'Rp 7,10 M',
    realisasiAnggaran: 3053824740,
    realisasiFormatted: 'Rp 3,05 M',
    persentaseRealisasi: 43.0,
    biroPengampu: 'Biro Keuangan',
    isDummy: true,
  },
  {
    id: 'keg-3',
    nomor: 3,
    namaKegiatan: 'Pengelolaan & Pelayanan SDM',
    namaSingkat: 'Pengelolaan & Pelayanan Sumber Daya Manusia',
    paguAnggaran: 590444268000,
    paguFormatted: 'Rp 590,44 M',
    realisasiAnggaran: 212559936480,
    realisasiFormatted: 'Rp 212,56 M',
    persentaseRealisasi: 36.0,
    biroPengampu: 'Biro SDM',
    isDummy: true,
  },
  {
    id: 'keg-4',
    nomor: 4,
    namaKegiatan: 'Pelayanan Regulasi & Hukum serta Pelaksanaan Organisasi & Tata Laksana',
    namaSingkat: 'Pelayanan Regulasi, Hukum & Tata Laksana',
    paguAnggaran: 7681392000,
    paguFormatted: 'Rp 7,68 M',
    realisasiAnggaran: 3226184640,
    realisasiFormatted: 'Rp 3,23 M',
    persentaseRealisasi: 42.0,
    biroPengampu: 'Biro Hukum & OKMR',
    isDummy: true,
  },
  {
    id: 'keg-5',
    nomor: 5,
    namaKegiatan: 'Penyusunan & Penyelarasan Kebijakan, Pentarifan & Manajemen Kinerja Organisasi',
    namaSingkat: 'Penyelarasan Kebijakan, Pentarifan & Kinerja',
    paguAnggaran: 5577198000,
    paguFormatted: 'Rp 5,58 M',
    realisasiAnggaran: 2107840840,
    realisasiFormatted: 'Rp 2,11 M',
    persentaseRealisasi: 37.8,
    biroPengampu: 'Biro OKMR',
    isDummy: true,
  },
];

// Perhitungan Ringkasan Anggaran
export const TOTAL_PAGU_A1 = 725148975000; // Rp 725,15 M
export const TOTAL_REALISASI_A1 = KEGIATAN_ANGGARAN_A1.reduce((acc, curr) => acc + curr.realisasiAnggaran, 0);
export const PERSENTASE_SERAPAN_A1 = Number(((TOTAL_REALISASI_A1 / TOTAL_PAGU_A1) * 100).toFixed(1)); // 36.3%

// ============================================================================
// 4. WIDGET "PERLU PERHATIAN" (MAKS 5 BARIS, URUT TINGKAT KEPARAHAN)
// ============================================================================
export interface PerluPerhatianItem {
  id: string;
  keparahan: 'TINGGI' | 'SEDANG';
  status: StatusKpi;
  kalimat: string;
  angka: string;
  tagBiro: string;
}

export const DAFTAR_PERLU_PERHATIAN: PerluPerhatianItem[] = [
  {
    id: 'att-1',
    keparahan: 'TINGGI',
    status: 'PERLU_PERHATIAN',
    kalimat: 'Piutang macet > 2 tahun memerlukan percepatan penyelesaian bersama KPKNL',
    angka: 'Rp 48,20 M',
    tagBiro: 'Biro Keuangan',
  },
  {
    id: 'att-2',
    keparahan: 'SEDANG',
    status: 'DALAM_PANTAUAN',
    kalimat: 'Pengaduan layanan publik masih dalam proses penyelesaian (18 berkas)',
    angka: '96,2% (450/468)',
    tagBiro: 'Biro OKMR',
  },
  {
    id: 'att-3',
    keparahan: 'SEDANG',
    status: 'DALAM_PANTAUAN',
    kalimat: 'Komponen pelayanan publik pada evaluasi RB memerlukan penguatan standar SLA',
    angka: '74,7% skor',
    tagBiro: 'Biro OKMR',
  },
  {
    id: 'att-4',
    keparahan: 'SEDANG',
    status: 'DALAM_PANTAUAN',
    kalimat: 'Aspek perlindungan & integrasi sistem informasi kepegawaian belum optimal',
    angka: '75,0% skor',
    tagBiro: 'Biro SDM',
  },
  {
    id: 'att-5',
    keparahan: 'SEDANG',
    status: 'DALAM_PANTAUAN',
    kalimat: 'Penilaian register risiko unit operasional memerlukan reviu triwulanan',
    angka: '65,0% unsur',
    tagBiro: 'Biro OKMR',
  },
];

// ============================================================================
// 5. DATA MONITORING BIRO (5 SEGMEN: KEUANGAN, SDM, OKMR, UMUM, HUKUM)
// ============================================================================
export interface BiroKpiCard {
  label: string;
  nilai: string;
  targetKonteks: string;
  status: StatusKpi;
  tooltipRumus: string;
}

// ----------------------------------------------------------------------------
// A. BIRO KEUANGAN
// ----------------------------------------------------------------------------
export const BIRO_KEUANGAN_KPIS: BiroKpiCard[] = [
  {
    label: 'Pendapatan vs Target',
    nilai: 'Rp 2,49 T',
    targetKonteks: 'Target Rp 2,05 T (121,5%)',
    status: 'TERCAPAI',
    tooltipRumus: 'Rincian/Rekap Target PNBP + Laporan Penerimaan Sumber Dana (Hal. 4 No. 8 & 14)',
  },
  {
    label: 'Serapan Belanja',
    nilai: '94,8%',
    targetKonteks: 'Realisasi Rp 2,48 T / Pagu Rp 2,62 T',
    status: 'TERCAPAI',
    tooltipRumus: 'Laporan Realisasi Anggaran: ANGGARAN, REALISASI, PERSENTASE (Hal. 4 No. 12)',
  },
  {
    label: 'Indeks Pelaksanaan (IKPA)',
    nilai: '96,25',
    targetKonteks: 'Kategori Sangat Baik (Target ≥ 95,0)',
    status: 'TERCAPAI',
    tooltipRumus: 'Indeks Pelaksanaan Anggaran Kementerian Keuangan (Hal. 6 No. 25)',
  },
  {
    label: 'Saldo Kas & Bank',
    nilai: 'Rp 1,42 T',
    targetKonteks: 'Posisi Kas Operasional Real Time',
    status: 'TERCAPAI',
    tooltipRumus: 'Laporan Saldo Bank Real Time: NILAI, TANGGAL REKAP (Hal. 4 No. 13)',
  },
];

export const TREN_TRIWULAN_KEUANGAN = [
  { triwulan: 'TW1', belanja: 18.4, pendapatan: 26.2, target: 25.0 },
  { triwulan: 'TW2', belanja: 46.2, pendapatan: 54.8, target: 50.0 },
  { triwulan: 'TW3', belanja: 72.5, pendapatan: 83.1, target: 75.0 },
  { triwulan: 'TW4', belanja: 94.8, pendapatan: 121.5, target: 100.0 },
];

export const SURPLUS_DEFISIT_PER_SATKER = [
  { satker: 'Biro Keuangan', surplus: 142.5 },
  { satker: 'BU Pelabuhan', surplus: 98.4 },
  { satker: 'BU Bandara', surplus: 34.2 },
  { satker: 'Dit. Pertanahan', surplus: 185.0 },
  { satker: 'BU SPAM', surplus: 41.6 },
  { satker: 'RSBP Batam', surplus: 12.4 },
  { satker: 'Biro Umum', surplus: -58.2 },
  { satker: 'Biro SDM', surplus: -124.6 },
];

export const AGING_PIUTANG_DATA = [
  { umur: '< 3 Bulan (Lancar)', nilai: 142.8, persen: '54.5%' },
  { umur: '3–12 Bulan (Kurang Lancar)', nilai: 48.5, persen: '18.5%' },
  { umur: '1–2 Tahun (Diragukan)', nilai: 22.4, persen: '8.6%' },
  { umur: '> 2 Tahun (Macet/KPKNL)', nilai: 48.2, persen: '18.4%' },
];

// ----------------------------------------------------------------------------
// B. BIRO SDM
// ----------------------------------------------------------------------------
export const BIRO_SDM_KPIS: BiroKpiCard[] = [
  {
    label: 'Total Pegawai Aktif',
    nilai: '2.978',
    targetKonteks: 'PNS: 842 · P3K: 618 · PTT: 1.518',
    status: 'TERCAPAI',
    tooltipRumus: 'Jumlah Pegawai berdasarkan Status Kepegawaian (Hal. 1 No. 8)',
  },
  {
    label: 'Pendidikan S1–S3',
    nilai: '72,4%',
    targetKonteks: '2.156 dari 2.978 Pegawai (Target ≥ 70%)',
    status: 'TERCAPAI',
    tooltipRumus: 'Jumlah Pegawai berdasarkan Pendidikan (Hal. 1 No. 9)',
  },
  {
    label: 'Pengembangan Kompetensi',
    nilai: '92,6%',
    targetKonteks: '2.758 Pegawai Mengikuti Diklat/Uji',
    status: 'TERCAPAI',
    tooltipRumus: 'Persentase Pegawai Mengikuti Program Pengembangan Kompetensi (Hal. 2 No. 13)',
  },
  {
    label: 'KGB Tepat Waktu',
    nilai: '100%',
    targetKonteks: '642 Berkas KGB Selesai Tepat Waktu',
    status: 'TERCAPAI',
    tooltipRumus: 'Kenaikan Gaji Berkala Pegawai BP Batam per Bulan (Hal. 1 No. 1)',
  },
];

export const KOMPOSISI_STATUS_SDM = [
  { kategori: 'Pegawai Tetap (PNS)', jumlah: 842 },
  { kategori: 'Pegawai Pemerintah (P3K)', jumlah: 618 },
  { kategori: 'Pegawai Tidak Tetap (PTT)', jumlah: 1518 },
];

export const KOMPOSISI_PENDIDIKAN_SDM = [
  { kategori: 'S3 (Doktor)', jumlah: 24 },
  { kategori: 'S2 (Magister)', jumlah: 412 },
  { kategori: 'S1 / D4 (Sarjana)', jumlah: 1720 },
  { kategori: 'D3 / Diploma', jumlah: 422 },
  { kategori: 'SMA / SMK', jumlah: 400 },
];

export const KOMPOSISI_GENDER_SDM = [
  { kategori: 'Laki-laki', jumlah: 1788 },
  { kategori: 'Perempuan', jumlah: 1190 },
];

export const PENGEMBANGAN_SDM_JALUR = [
  { jalur: 'Diklat Teknis & Manajerial', peserta: 1420 },
  { jalur: 'Workshop & Seminar', peserta: 976 },
  { jalur: 'Ujian Dinas/Prajab (UDPI)', peserta: 312 },
  { jalur: 'Tugas Belajar (Tubel)', peserta: 48 },
];

// ----------------------------------------------------------------------------
// C. BIRO OKMR
// ----------------------------------------------------------------------------
export const BIRO_OKMR_KPIS: BiroKpiCard[] = [
  {
    label: 'Nilai SAKIP BP Batam',
    nilai: '83,50',
    targetKonteks: 'Tingkat Akuntabilitas Kinerja: A (Target 82)',
    status: 'TERCAPAI',
    tooltipRumus: 'Nilai Sistem Akuntabilitas Kinerja Instansi Pemerintah (Hal. 38 No. 2)',
  },
  {
    label: 'Indeks Layanan Publik',
    nilai: '4,38',
    targetKonteks: 'Skala 5,0 (Sangat Baik / PEKPPP)',
    status: 'TERCAPAI',
    tooltipRumus: 'Pemantauan dan Evaluasi Kinerja Penyelenggaraan Pelayanan Publik (Hal. 40 No. 15-16)',
  },
  {
    label: 'Pengaduan Terselesaikan',
    nilai: '96,2%',
    targetKonteks: '450 dari 468 Pengaduan Tuntas',
    status: 'TERCAPAI',
    tooltipRumus: 'Monitoring dan Evaluasi Pengaduan Masyarakat Terhadap Layanan (Hal. 39 No. 10)',
  },
  {
    label: 'Rekomendasi Monev Selesai',
    nilai: '91,4%',
    targetKonteks: 'Tindak Lanjut PPK BLU & BPK RI',
    status: 'TERCAPAI',
    tooltipRumus: 'Persentase Penyelesaian Rekomendasi Hasil Monev PPK BLU & BPK RI (Hal. 39 No. 6)',
  },
];

export const PENGADUAN_PER_UNIT = [
  { unit: 'PTSP Pelayanan', selesai: 164, proses: 6, diterima: 170 },
  { unit: 'Dit. Pertanahan', selesai: 122, proses: 5, diterima: 127 },
  { unit: 'BU SPAM', selesai: 86, proses: 4, diterima: 90 },
  { unit: 'BU Pelabuhan', selesai: 48, proses: 2, diterima: 50 },
  { unit: 'RSBP Batam', selesai: 30, proses: 1, diterima: 31 },
];

export const MANAJEMEN_RISIKO_PER_UNIT = [
  { unit: 'Biro Keuangan', indeks: 3.82, target: 3.5 },
  { unit: 'Biro SDM', indeks: 3.68, target: 3.5 },
  { unit: 'Biro Umum', indeks: 3.54, target: 3.5 },
  { unit: 'Biro Hukum', indeks: 3.6, target: 3.5 },
  { unit: 'Biro OKMR', indeks: 3.88, target: 3.5 },
  { unit: 'Pusat PDSI', indeks: 3.42, target: 3.5 },
];

// ----------------------------------------------------------------------------
// D. BIRO UMUM
// ----------------------------------------------------------------------------
export const BIRO_UMUM_KPIS: BiroKpiCard[] = [
  {
    label: 'Keterbukaan Informasi',
    nilai: '89,4',
    targetKonteks: 'Predikat Informatif (Target ≥ 85)',
    status: 'TERCAPAI',
    tooltipRumus: 'Indeks Keterbukaan Informasi Publik (Hal. 46 No. 27)',
  },
  {
    label: 'Indeks Pengelolaan Aset',
    nilai: '3,74',
    targetKonteks: 'Skala 4,00 (Kategori Baik)',
    status: 'TERCAPAI',
    tooltipRumus: 'Nilai Indeks Pengelolaan Aset dan BMN (Hal. 46 No. 25)',
  },
  {
    label: 'Pelayanan Keprotokolan',
    nilai: '98,5%',
    targetKonteks: '196 Acara Kedinasan Tepat Waktu',
    status: 'TERCAPAI',
    tooltipRumus: 'Persentase Pelaksanaan Pelayanan Keprotokolan (Hal. 46 No. 26)',
  },
  {
    label: 'Permohonan Info Publik',
    nilai: '124',
    targetKonteks: '100% Berkas Permohonan Terlayani',
    status: 'TERCAPAI',
    tooltipRumus: 'Daftar Permohonan Informasi Publik (Hal. 44 No. 11)',
  },
];

export const PENGADAAN_SISTEM_DATA = [
  { kanal: 'SIRUP (Rencana Umum)', transaksi: 485, nilaiMiliar: 342.5 },
  { kanal: 'E-Katalog', transaksi: 312, nilaiMiliar: 184.2 },
  { kanal: 'E-Tendering', transaksi: 88, nilaiMiliar: 112.6 },
  { kanal: 'Toko Daring', transaksi: 214, nilaiMiliar: 28.4 },
  { kanal: 'E-Kontrak', transaksi: 165, nilaiMiliar: 198.0 },
];

// ----------------------------------------------------------------------------
// E. BIRO HUKUM
// ----------------------------------------------------------------------------
export const BIRO_HUKUM_KPIS: BiroKpiCard[] = [
  {
    label: 'Penanganan Perkara',
    nilai: '88,9%',
    targetKonteks: '24 dari 27 Perkara Selesai / Incracht',
    status: 'DALAM_PANTAUAN',
    tooltipRumus: 'Persentase Penanganan Perkara yang Diselesaikan (Hal. 2 No. 9)',
  },
  {
    label: 'Permasalahan Hukum',
    nilai: '94,2%',
    targetKonteks: 'Pelayanan Non-Litigasi Tuntas Tepat Waktu',
    status: 'TERCAPAI',
    tooltipRumus: 'Persentase Pelayanan dan Penanganan Permasalahan Hukum (Hal. 2 No. 10)',
  },
  {
    label: 'Rancangan Regulasi',
    nilai: '86',
    targetKonteks: '18 Perka · 68 Keputusan Kepala BP',
    status: 'TERCAPAI',
    tooltipRumus: 'Daftar Rancangan Peraturan & Keputusan BP Batam (Hal. 2 No. 5-7)',
  },
];

export const PERKARA_PER_BULAN_DATA = [
  { bulan: 'Jan', perkara: 2 },
  { bulan: 'Feb', perkara: 3 },
  { bulan: 'Mar', perkara: 2 },
  { bulan: 'Apr', perkara: 4 },
  { bulan: 'Mei', perkara: 1 },
  { bulan: 'Jun', perkara: 3 },
  { bulan: 'Jul', perkara: 2 },
  { bulan: 'Agu', perkara: 3 },
  { bulan: 'Sep', perkara: 2 },
  { bulan: 'Okt', perkara: 2 },
  { bulan: 'Nov', perkara: 2 },
  { bulan: 'Des', perkara: 1 },
];
