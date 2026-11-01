import { PerkinA7Metadata, PerkinA7KpiItem } from './types';

// ====================================================================
// 1. DOKUMEN METADATA RESMI PERKIN A.7 TAHUN 2025
// Sesuai Dokumen Resmi: 7. PERKIN A.7 Tahun 2025.pdf
// Nomor: 8 /KA/ 3 /2025 | Batam, 13 Maret 2025
// ====================================================================
export const PERKIN_A7_METADATA: PerkinA7Metadata = {
  nomorPerkin: 'Nomor: 8/KA/3/2025',
  tanggalPenetapan: '13 Maret 2025',
  tahunAnggaran: '2025',
  pihakPertama: {
    nama: 'Mouris Limanto',
    jabatan: 'Anggota/Deputi Bidang Infrastruktur BP Batam',
    nip: '196808011993031005',
  },
  pihakKedua: {
    nama: 'Amsakar Achmad',
    jabatan: 'Kepala Badan Pengusahaan Perdagangan Bebas dan Pelabuhan Bebas Batam',
    nip: '196808011993031005',
  },
  sasaranProgram: 'Meningkatnya Realisasi Investasi & Kualitas Pelayanan Perizinan di KPBPB Batam',
  totalAnggaran: 'Rp 808.710.679.000,-',
  totalAnggaranRupiah: 808710679000,
  realisasiAnggaran: 'Rp 682.425.000.000,-',
  realisasiAnggaranRupiah: 682425000000,
  persenRealisasiAnggaran: 84.38,
  totalPnbpTarget: 'Rp 6.821.000.000,-',
  totalPnbpTargetRupiah: 6821000000,
  totalPnbpRealisasi: 'Rp 7.450.000.000,-',
  totalPnbpRealisasiRupiah: 7450000000,
  persenPnbpRealisasi: 109.22,
};

// ====================================================================
// 2. DUA POINT UTAMA INDIKATOR KINERJA PROGRAM (IKP) PERKIN A.7
// 1. Persentase Penyelenggaraan Infrastruktur yang Mendukung Investasi di KPBPB Batam (Target: 100%)
// 2. Nilai realisasi PNBP (Target: 6,821 M | Realisasi: Rp 7,450 M)
// ====================================================================
export const PERKIN_A7_KPIS: PerkinA7KpiItem[] = [
  {
    id: 'ikp-1-pembangunan-infrastruktur',
    number: 1,
    code: 'IKP-1',
    name: 'Persentase Penyelenggaraan Infrastruktur yang Mendukung Investasi di KPBPB Batam',
    fullName: 'Persentase Penyelenggaraan Infrastruktur yang Mendukung Investasi di KPBPB Batam (Konsolidasi 3 Direktorat)',
    sasaranProgram: 'Meningkatnya Realisasi Investasi di KPBPB Batam',
    statusKinerja: 'Tercapai Sesuai Rencana',
    satkerShort: '3 Dit. Terpadu',
    programTarget: 100.0,
    programTargetLabel: '100%',
    realization: 92.4,
    realizationLabel: '92,40%',
    achievement: 92.4,
    unit: '%',
    status: 'Sesuai Target',
    statusColor: 'emerald',
    unitPengampu: 'Dit. Pembangunan Infras, Dit. Perencanaan Infras & Dit. Pengamanan Aset',
    datasetSumber: 'Dataset No. 4 & 6 (Pembangunan), No. 1-9 (Perencanaan), No. 1-12 (Pengamanan Aset)',
    halamanPdf: 'Hal. 2-3 Perkin A.7 Tahun 2025',
    formula: '% Capaian = (%Capaian(1) + %Capaian(2) + %Capaian(3)) / 3',
    tableauCalculation: 'AVG([% Capaian Dit Pembangunan], [% Capaian Dit Perencanaan], [% Capaian Dit Pengamanan])',
    deskripsi: 'Nilai didapatkan untuk mengevaluasi realisasi dengan target dari kegiatan penyelenggaraan infrastruktur yang mendukung investasi di KPBPB Batam, menggabungkan capaian Dit. Pembangunan (92,4%), Dit. Perencanaan (95,2%), dan Dit. Pengamanan Aset (89,6%).',
    catatanKinerja: 'Dari 14 paket konstruksi strategis, 12 paket (85.7%) berjalan lancar (Ahead dan On Schedule), 1 paket waspada (-3.5%), dan 1 paket dalam penanganan Show Cause Meeting (SCM) percepatan di Dermaga Kargo Batu Ampar.',
    triwulanTrend: {
      q1: 88.5,
      q2: 90.8,
      q3: 92.4,
      q4: 95.0,
      targetQ: 100.0,
    },
  },
  {
    id: 'ikp-2-pnbp-infrastruktur',
    number: 2,
    code: 'IKP-2',
    name: 'Nilai realisasi PNBP',
    fullName: 'Nilai Realisasi PNBP dari Izin Pematangan Lahan, Pemanfaatan ROW Utilitas, Layanan Penataan Reklame dan Penghijauan',
    sasaranProgram: 'Meningkatnya Kualitas Pelayanan Perizinan',
    statusKinerja: 'Melampaui Target',
    satkerShort: 'Dit. Pembangunan',
    programTarget: 6.821,
    programTargetLabel: '6,821 M',
    realization: 7.450,
    realizationLabel: '7,450 M',
    achievement: 109.22,
    unit: 'Miliar',
    status: 'Melampaui Target',
    statusColor: 'cyan',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (Subdit ROW Utilitas & Penghijauan)',
    datasetSumber: 'Dataset No. 1 (Perizinan ROW Utilitas) & Dataset No. 2 (ROW Penghijauan) Hal. 48-49 Satu Data',
    halamanPdf: 'Hal. 2 & 4 Perkin A.7 Tahun 2025',
    formula: '% Capaian = (Realisasi Penerimaan / Target Penerimaan) × 100%',
    tableauCalculation: 'ZN(SUM([Realisasi Penerimaan PNBP])) / 6821000000 * 100',
    deskripsi: 'Nilai didapatkan untuk mengevaluasi realisasi dengan target dari kegiatan pembangunan Direktorat Pembangunan Infrastruktur. Terdapat penerimaan PNBP atas pelaksanaan izin pematangan lahan, pemanfaatan ROW untuk utilitas, layanan penataan reklame dan penghijauan.',
    catatanKinerja: 'Target penerimaan PNBP DIPA TA 2025 sebesar 6,821 M (Rp 6,821 Miliar) telah terlampaui dengan perolehan realisasi Rp 7,450 M (109,22%), surplus +Rp 629 Juta didorong utilitas telekomunikasi & pipa industri.',
    triwulanTrend: {
      q1: 28.4,
      q2: 61.2,
      q3: 84.5,
      q4: 109.22,
      targetQ: 100.0,
    },
  },
];

// ====================================================================
// 3. KURVA S AGREGAT KONSTRUKSI BULANAN (Jan - Des)
// Mengintegrasikan Dataset No. 4 & 6 Dit. Pembangunan Infrastruktur
// Atribut Utama: PRGRS_PEK, VOL_PEK, KTGR_PEK, KD_ANGG, NPAGU_F, NKON_S
// Dan Data Realisasi Belanja Biro Keuangan (Data No. 1 & 12)
// ====================================================================
export const KURVA_S_METADATA_ATRIBUT = {
  rencanaFisik: {
    unit: 'Direktorat Pembangunan Infrastruktur',
    dataNo: 'Data No. 4 & Data No. 6',
    namaData: 'Laporan Progres Pekerjaan Kontruksi Tahun Berjalan (Hal. 49-50) & Pembangunan Infrastruktur BP Batam (Hal. 50-51)',
    atributUtama: 'VOL_PEK',
    atributPendukung: ['KTGR_PEK', 'TGL_MUL', 'TGL_SEL', 'KD_ANGG', 'NPAGU_F'],
    deskripsi: 'Target kurva S rencana fisik kumulatif dihitung dari bobot volume pekerjaan (VOL_PEK) terhadap rentang waktu kontrak (TGL_MUL s.d. TGL_SEL).',
  },
  realisasiFisik: {
    unit: 'Direktorat Pembangunan Infrastruktur',
    dataNo: 'Data No. 4 & Data No. 6',
    namaData: 'Laporan Progres Pekerjaan Kontruksi Tahun Berjalan (Hal. 49-50) & Pembangunan Infrastruktur BP Batam (Hal. 50-51)',
    atributUtama: 'PRGRS_PEK',
    atributPendukung: ['NAMOBJ', 'VOL_PEK', 'NKON_S', 'KENDALA', 'SUBDIT', 'NM_PPK'],
    deskripsi: 'Realisasi fisik kumulatif lapangan dicatat resmi dari opname mingguan/bulanan konsultan supervisi dan PPK pada atribut PRGRS_PEK.',
  },
  realisasiKeuangan: {
    unit: 'Biro Keuangan & Pusat Perencanaan Program Strategis',
    dataNo: 'Biro Keuangan: Data No. 1 & Data No. 12 | Pusren: Data No. 2',
    namaData: 'Persentase Realisasi Belanja & Laporan Realisasi Anggaran (Hal. 2, 4) & Monev Program Kerja (Hal. 51)',
    atributUtama: 'REALISASI',
    atributPendukung: ['% YTD CAPAIAN BELANJA', 'ANGGARAN', 'PAGU DIPA', 'PROGRES PAKET', 'KODE MA'],
    deskripsi: 'Serapan pencairan keuangan belanja modal kumulatif DIPA BP Batam berbasis SP2D per bendahara pengeluaran.',
  },
  skemaAtributLengkapPdf: [
    { kode: 'PRGRS_PEK', nama: 'Progres Pekerjaan Fisik (%)', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4 & 6', hal: 'Hal. 49-51', deskripsi: 'Atribut persentase capaian riil fisik lapangan proyek konstruksi.' },
    { kode: 'VOL_PEK', nama: 'Volume Pekerjaan', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4, 5 & 6', hal: 'Hal. 49-51', deskripsi: 'Ukuran kuantitas fisik (m2, km, meter lari, unit) pekerjaan kontraktual.' },
    { kode: 'KTGR_PEK', nama: 'Kategori Pekerjaan', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4, 5 & 6', hal: 'Hal. 49-51', deskripsi: 'Klasifikasi sektor: jalan & jembatan, drainase, dermaga, pematangan tanah.' },
    { kode: 'NPAGU_F', nama: 'Nilai Pagu Finansial (Rp)', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4, 5 & 6', hal: 'Hal. 49-51', deskripsi: 'Alokasi plafon pagu anggaran DIPA per paket pekerjaan fisik.' },
    { kode: 'NKON_S / NKON_F', nama: 'Nilai Kontrak (Rp)', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4, 5 & 6', hal: 'Hal. 49-51', deskripsi: 'Nilai kontrak penyedia jasa fisik dan konsultan supervisi.' },
    { kode: 'KD_ANGG', nama: 'Kode Anggaran (MAK)', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4, 5 & 6', hal: 'Hal. 49-51', deskripsi: 'Mata anggaran akun keluaran belanja modal infrastruktur BP Batam.' },
    { kode: 'TGL_MUL & TGL_SEL', nama: 'Jadwal Kontrak (Mulai-Selesai)', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4 & 5', hal: 'Hal. 49-50', deskripsi: 'Tanggal mulai SPMK dan batas akhir penyelesaian pekerjaan (PHO).' },
    { kode: 'KENDALA', nama: 'Catatan Kendala Lapangan', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4 & 6', hal: 'Hal. 49-51', deskripsi: 'Catatan hambatan utilitas PLN/Telkom, cuaca, atau penertiban ruang jalan.' },
    { kode: 'SUBDIT', nama: 'Subdit Pengampu', unit: 'Dit. Pembangunan', dataNo: 'Data No. 4 & 6', hal: 'Hal. 49-51', deskripsi: 'Sub-Direktorat teknis pengampu pengawasan paket proyek.' },
    { kode: 'REALISASI', nama: 'Realisasi Belanja Kas (Rp)', unit: 'Biro Keuangan', dataNo: 'Data No. 12', hal: 'Hal. 4', deskripsi: 'Angka realisasi belanja kas SP2D pada Laporan Realisasi Anggaran.' },
  ],
};

export const KURVA_S_INFRASTRUKTUR_BULANAN = [
  { bulan: 'Jan', targetFisik: 5.2, realisasiFisik: 5.8, keuangan: 5.0, status: 'Ahead', deviasi: '+0.6%', atributFisik: 'PRGRS_PEK: 5.8%', catatan: 'Mobilisasi alat berat & material tiang pancang Sei Ladi.' },
  { bulan: 'Feb', targetFisik: 12.8, realisasiFisik: 13.5, keuangan: 12.0, status: 'Ahead', deviasi: '+0.7%', atributFisik: 'PRGRS_PEK: 13.5%', catatan: 'Pekerjaan bore pile & cut & fill Rempang BSW Zona A.' },
  { bulan: 'Mar', targetFisik: 22.4, realisasiFisik: 24.1, keuangan: 20.5, status: 'Ahead', deviasi: '+1.7%', atributFisik: 'PRGRS_PEK: 24.1%', catatan: 'Struktur pier flyover & pemancangan dermaga utara Batu Ampar.' },
  { bulan: 'Apr', targetFisik: 33.5, realisasiFisik: 34.2, keuangan: 31.0, status: 'Ahead', deviasi: '+0.7%', atributFisik: 'PRGRS_PEK: 34.2%', catatan: 'Erection girder jembatan & penimbunan badan jalan Sudirman.' },
  { bulan: 'Mei', targetFisik: 45.0, realisasiFisik: 44.8, keuangan: 40.2, status: 'On Track', deviasi: '-0.2%', atributFisik: 'PRGRS_PEK: 44.8%', catatan: 'Percepatan drainase primer Baloi Indah antisipasi pasang rob.' },
  { bulan: 'Jun', targetFisik: 56.4, realisasiFisik: 55.1, keuangan: 51.5, status: 'On Track', deviasi: '-1.3%', atributFisik: 'PRGRS_PEK: 55.1%', catatan: 'Pengecoran lantai jembatan & pengaspalan AC-Base ruas Sudirman.' },
  { bulan: 'Jul', targetFisik: 68.0, realisasiFisik: 67.2, keuangan: 62.0, status: 'On Track', deviasi: '-0.8%', atributFisik: 'PRGRS_PEK: 67.2%', catatan: 'Pemasangan box culvert & perapihan koridor ROW Nongsa.' },
  { bulan: 'Agt', targetFisik: 79.5, realisasiFisik: 78.8, keuangan: 73.4, status: 'On Track', deviasi: '-0.7%', atributFisik: 'PRGRS_PEK: 78.8%', catatan: 'Pengaspalan AC-WC & finishing lantai dermaga kontainer.' },
  { bulan: 'Sep', targetFisik: 88.0, realisasiFisik: 86.5, keuangan: 81.0, status: 'On Track', deviasi: '-1.5%', atributFisik: 'PRGRS_PEK: 86.5%', catatan: 'Finishing trotoar Sei Ladi, uji beban & perapihan marka jalan.' },
  { bulan: 'Okt (T)', targetFisik: 94.2, realisasiFisik: null, keuangan: null, status: 'Target', deviasi: 'Proyeksi', atributFisik: 'Target VOL_PEK', catatan: 'Proyeksi penyelesaian fisik 94,2% (Uji fungsi dermaga & kolam retensi).' },
  { bulan: 'Nov (T)', targetFisik: 98.0, realisasiFisik: null, keuangan: null, status: 'Target', deviasi: 'Proyeksi', atributFisik: 'Target VOL_PEK', catatan: 'Proyeksi PHO 11 paket pekerjaan fisik utama.' },
  { bulan: 'Des (T)', targetFisik: 100.0, realisasiFisik: null, keuangan: null, status: 'Target', deviasi: 'Proyeksi', atributFisik: 'Target VOL_PEK', catatan: 'Target akhir tahun 100% tuntas tepat waktu & tepat mutu.' },
];

// ====================================================================
// 4. ALOKASI PAGU & REALISASI BELANJA PER SEKTOR INFRASTRUKTUR
// Mengintegrasikan:
// - Biro Keuangan Data No. 12 & 23 (Hal. 4-5)
// - Dit. Pembangunan Infrastruktur Data No. 4, 5, 6 (Hal. 49-51)
// - Dit. Perencanaan Infrastruktur Data No. 1 s.d. 6 (Hal. 53)
// ====================================================================
export const SEKTOR_INFRASTRUKTUR_ALOKASI = [
  {
    kategori: 'Peningkatan Jalan & Jembatan',
    paguMiliar: 420.4,
    realisasiMiliar: 344.7,
    persen: 82.0,
    totalPaket: 6,
    icon: 'Route',
    keterangan: 'Pelebaran 5 lajur Sudirman, Flyover Sei Ladi, Koridor KEK Nongsa, dll',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur & Biro Keuangan',
    dataNoSatuData: 'Dit. Pembangunan: Data No. 4 & 6 | Dit. Perencanaan: Data No. 5 | Biro Keuangan: Data No. 12 & 23',
    namaDatasetSatuData: 'Laporan Progres Kontruksi & Rekapitulasi Pagu Anggaran',
    atributTerpakai: ['KD_ANGG', 'KTGR_PEK', 'JNS_PEK', 'NPAGU_F', 'NKON_S', 'PRGRS_PEK', 'NM_PPK', 'SUMBER DANA_RM', 'SUMBER DANA_PNBP'],
    halamanPdf: 'Buku Satu Data Hal. 49-51, Hal. 53, Hal. 4-5',
  },
  {
    kategori: 'Pematangan Kawasan BSW Rempang',
    paguMiliar: 185.0,
    realisasiMiliar: 148.0,
    persen: 80.0,
    totalPaket: 5,
    icon: 'Mountain',
    keterangan: 'Cut & Fill 280 Ha di Rempang Eco-City, Kabil, Sekupang, Tg Sengkuang',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur & Biro Keuangan',
    dataNoSatuData: 'Dit. Pembangunan: Data No. 5 | Biro Keuangan: Data No. 22',
    namaDatasetSatuData: 'Pematangan Tanah (BSW) & Rincian Kertas Kerja Satker',
    atributTerpakai: ['NAMOBJ', 'KD_ANGG', 'KTGR_PEK', 'NPAGU_F', 'NKON_S', 'VOL_PEK', 'KONTRAKTOR', 'NM_PPK', 'HARGA SATUAN', 'JUMLAH BIAYA'],
    halamanPdf: 'Buku Satu Data Hal. 50 & Hal. 5',
  },
  {
    kategori: 'Drainase & Pengendalian Banjir',
    paguMiliar: 98.5,
    realisasiMiliar: 83.7,
    persen: 85.0,
    totalPaket: 3,
    icon: 'Droplets',
    keterangan: 'Kolam Retensi Baloi Indah, Saluran U-Ditch Batam Centre',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur & Dit. Perencanaan',
    dataNoSatuData: 'Dit. Pembangunan: Data No. 4 & 6 | Dit. Perencanaan: Data No. 3 | Biro Keuangan: Data No. 12',
    namaDatasetSatuData: 'Laporan Progres Kontruksi, DED Drainase/Air, Laporan Realisasi Anggaran',
    atributTerpakai: ['KTGR_PEK', 'JNS_PEK', 'NPAGU_F', 'NKON_S', 'PRGRS_PEK', 'BIAYA DED', 'JUMLAH DED', 'ANGGARAN', 'REALISASI'],
    halamanPdf: 'Buku Satu Data Hal. 49-51 & Hal. 53',
  },
  {
    kategori: 'Dermaga & Pelabuhan Logistik',
    paguMiliar: 75.0,
    realisasiMiliar: 52.5,
    persen: 70.0,
    totalPaket: 2,
    icon: 'Ship',
    keterangan: 'Revitalisasi Dermaga Utara Kargo Batu Ampar Tahap 2',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur & Dit. Perencanaan',
    dataNoSatuData: 'Dit. Pembangunan: Data No. 4 & 6 | Dit. Perencanaan: Data No. 6 | Biro Keuangan: Data No. 12',
    namaDatasetSatuData: 'Laporan Progres Kontruksi & DED Infrastruktur Laut',
    atributTerpakai: ['KTGR_PEK', 'NPAGU_F', 'NKON_S', 'PRGRS_PEK', 'NM_PPK', 'BIAYA DED', 'WAKTU PELAKSANAAN PENYUSUNAN DED'],
    halamanPdf: 'Buku Satu Data Hal. 49-51 & Hal. 53',
  },
  {
    kategori: 'Perencanaan & Kajian DED 6 Sektor',
    paguMiliar: 63.6,
    realisasiMiliar: 53.5,
    persen: 84.1,
    totalPaket: 43,
    icon: 'Compass',
    keterangan: 'Detail Engineering Design Gedung, Utilitas, Wisata, Pertanaman, Laut/Udara',
    unitPengampu: 'Direktorat Perencanaan Infrastruktur & Biro Keuangan',
    dataNoSatuData: 'Dit. Perencanaan: Data No. 1 s.d. No. 6 | Biro Keuangan: Data No. 12 & 23',
    namaDatasetSatuData: 'Rekapitulasi Perencanaan Pembangunan (Gedung, Utilitas, Air, Kawasan, Darat, Laut)',
    atributTerpakai: ['JUMLAH DED', 'BIAYA DED', 'WAKTU PELAKSANAAN PENYUSUNAN DED', 'ANGGARAN', 'REALISASI', 'SUMBER DANA_PNBP'],
    halamanPdf: 'Buku Satu Data Hal. 53 & Hal. 4-5',
  },
];

// ====================================================================
// 5. KEMANTAPAN RUAS JARINGAN JALAN BP BATAM (Dataset 3 Satu Data Hal. 48-49)
// Unit: DIREKTORAT PEMBANGUNAN INFRASTRUKTUR
// Nama Data: JARINGAN JALAN (EKSISTING) (Data Spasial | Terbuka)
// Atribut Data: NAMOBJ, RUAS, LBRJLN, KONRJL, KLSRJL, FGSRJL, MATRJL, SHAPE_LENG, WLYRJL, REMARK
// ====================================================================
export const KEMANTAPAN_JALAN_METADATA = {
  unitPengampu: 'Direktorat Pembangunan Infrastruktur',
  dataNoSatuData: 'Data No. 3: JARINGAN JALAN (EKSISTING)',
  jenisData: 'Data Spasial',
  sifatData: 'Terbuka',
  periodeData: 'Jika Update',
  halamanPdf: 'Buku Satu Data Hal. 48-49',
  atributTerpakai: [
    { kode: 'NAMOBJ', label: 'Nama Objek Ruas Jalan' },
    { kode: 'RUAS', label: 'Kode Ruas Jalan' },
    { kode: 'LBRJLN', label: 'Lebar Badan Jalan (Meter)' },
    { kode: 'KONRJL', label: 'Kondisi Ruas Jalan (Mantap / Rusak Ringan / Rusak Berat)' },
    { kode: 'KLSRJL', label: 'Kelas Jalan (Kelas I, II, III)' },
    { kode: 'FGSRJL', label: 'Fungsi Jaringan Jalan (Arteri / Kolektor / Lokal / Akses Khusus)' },
    { kode: 'MATRJL', label: 'Material Perkerasan (Hotmix Aspal / Rigid Beton)' },
    { kode: 'SHAPE_LENG', label: 'Panjang Segmen Jalan (Km)' },
    { kode: 'WLYRJL', label: 'Wilayah Administrasi / Kecamatan' },
    { kode: 'REMARK', label: 'Catatan Spesifikasi Teknis' },
  ],
};

export const KEMANTAPAN_JALAN_DATA = {
  totalPanjangKm: 542.8,
  ruasMantapKm: 496.1,
  persenMantap: 91.4,
  ruasRusakRinganKm: 32.5,
  persenRusakRingan: 6.0,
  ruasRusakBeratKm: 14.2,
  persenRusakBerat: 2.6,
  distribusiHierarki: [
    { nama: 'Arteri Primer', panjangKm: 184.5, mantapKm: 175.2, persen: 95.0, lajur: '4 - 10 Lajur', atributFgs: 'FGSRJL: Arteri Primer', atributMat: 'MATRJL: Aspal Hotmix / Rigid', atributLbr: 'LBRJLN: 14 - 35 m' },
    { nama: 'Kolektor Primer', panjangKm: 198.2, mantapKm: 182.3, persen: 92.0, lajur: '2 - 4 Lajur', atributFgs: 'FGSRJL: Kolektor Primer', atributMat: 'MATRJL: Aspal Hotmix', atributLbr: 'LBRJLN: 9 - 14 m' },
    { nama: 'Lokal Primer', panjangKm: 112.4, mantapKm: 98.4, persen: 87.5, lajur: '2 Lajur', atributFgs: 'FGSRJL: Lokal Primer', atributMat: 'MATRJL: Aspal / Beton', atributLbr: 'LBRJLN: 6 - 9 m' },
    { nama: 'Akses Kawasan Khusus (Pelabuhan/Bandara/KEK)', panjangKm: 47.7, mantapKm: 40.2, persen: 84.3, lajur: '4 Lajur', atributFgs: 'FGSRJL: Akses Strategis', atributMat: 'MATRJL: Rigid Beton Heavy Duty', atributLbr: 'LBRJLN: 14 - 24 m' },
  ],
};

// ====================================================================
// 6. REKAPITULASI PNBP ROW UTILITAS & PENGHIJAUAN (Dataset 1 & 2 Satu Data)
// Unit: DIREKTORAT PEMBANGUNAN INFRASTRUKTUR & BIRO KEUANGAN
// ====================================================================
export const PNBP_ROW_METADATA = {
  utilitas: {
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (Subdit ROW Utilitas)',
    dataNoSatuData: 'Data No. 1: REKAPITULASI PERIZINAN PEMANFAATAN ROW UNTUK UTILITAS',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'Tertutup',
    halamanPdf: 'Buku Satu Data Hal. 48',
    atribut: [
      'TAHUN TERBIT', 'NOMOR SURAT', 'TANGGAL SURAT', 'NAMA PEMOHON', 'LOKASI KEGIATAN',
      'JENIS UTILITAS', 'GALIAN TERBUKA', 'GALIAN CROSSING', 'TOTAL GALIAN',
      'TMT MULAI IZIN', 'TMT AKHIR IZIN', 'KODE TRANSAKSI'
    ],
  },
  penghijauan: {
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (Subdit ROW Penghijauan)',
    dataNoSatuData: 'Data No. 2: REKAPITULASI PERIZINAN PEMANFAATAN ROW UNTUK PENGHIJAUAN',
    jenisData: 'Data Statistik',
    periodeData: 'Perbulan',
    sifatData: 'Tertutup',
    halamanPdf: 'Buku Satu Data Hal. 48',
    atribut: [
      'TAHUN TERBIT', 'NOMOR SURAT', 'TANGGAL SURAT', 'NAMA PEMOHON', 'NIB/NIK PEMOHON',
      'LOKASI KEGIATAN', 'JENIS PENGHIJAUAN', 'LUAS PENGHIJAUAN',
      'TMT MULAI IZIN', 'TMT AKHIR IZIN', 'KODE TRANSAKSI'
    ],
  },
  keuangan: {
    unitPengampu: 'Biro Keuangan BP Batam',
    dataNoSatuData: 'Data No. 7 & No. 8: RINCIAN & REKAPITULASI TARGET PNBP',
    jenisData: 'Data Statistik',
    periodeData: 'Pertahun',
    sifatData: 'Tertutup',
    halamanPdf: 'Buku Satu Data Hal. 4',
    atribut: [
      'KODE', 'PENGGUNA', 'MATA UANG', 'SATUAN', 'TARIF', 'VOLUME', 'JUMLAH',
      'KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN'
    ],
  },
};


// ====================================================================
// 6. REKAPITULASI PNBP ROW UTILITAS & PENGHIJAUAN (Dataset 1 & 2 Satu Data)
// ====================================================================
export const PNBP_INFRASTRUKTUR_DETAIL = {
  targetDipaTotalRupiah: 6821000000,
  realisasiTotalRupiah: 7450000000,
  persenTotal: 109.22,
  komponen: [
    {
      sumber: 'Izin Pemanfaatan ROW Utilitas',
      kodeDataset: 'Dataset No. 1 (Hal. 48)',
      targetRupiah: 4800000000,
      realisasiRupiah: 5250000000,
      persen: 109.38,
      volume: '482 Km Jaringan Kabel FO / Pipa Gas & Air',
      skTerbit: 148,
      slaHari: '3.2 Hari (Target 5 Hari)',
      mitraUtama: 'Telkomsel, PLN Batam, PGN, Air Batam Hilir, Indosat',
    },
    {
      sumber: 'Izin Pemanfaatan ROW Penghijauan',
      kodeDataset: 'Dataset No. 2 (Hal. 48)',
      targetRupiah: 2021000000,
      realisasiRupiah: 2200000000,
      persen: 108.86,
      volume: '84 Lokasi RTH / Koridor Taman Median Jalan',
      skTerbit: 52,
      slaHari: '2.8 Hari (Target 5 Hari)',
      mitraUtama: 'Batamindo, Panbil Group, Nongsa Digital Park, Citra Buana',
    },
  ],
};

// ====================================================================
// 7. TIGA UNIT KERJA PENGAMPU PERKIN A.7 (INFRASTRUKTUR)
// ====================================================================
export const INFRASTRUKTUR_3_UNITS = [
  {
    id: 'dit-perencanaan-infrastruktur',
    code: 'DPRINF',
    name: 'Direktorat Perencanaan Infrastruktur',
    shortName: 'Perencanaan Infrastruktur',
    roleInPerkin: 'Pengampu Perencanaan Teknis & Detail Engineering Design (DED)',
    pilarUtama: 'Pilar 1: Desain, DED & Readiness Criteria Proyek',
    headOfUnit: 'Direktur Perencanaan Infrastruktur',
    paguAnggaran: 'Rp 63.680.000.000,-',
    paguAnggaranRupiah: 63680000000,
    realisasiAnggaran: 'Rp 53.550.000.000,-',
    persenRealisasi: 84.1,
    datasetCount: 6,
    kpiRingkasan: [
      { label: 'Total Paket DED', value: '43 Paket' },
      { label: 'Total Pagu DED', value: 'Rp 53,68 M' },
      { label: 'Sektor Perencanaan', value: '6 Sektor Terpadu' },
      { label: 'Rata-rata Durasi DED', value: '5,5 Bulan' },
    ],
    statusPilar: 'Optimal (On Track)',
    statusColor: 'emerald',
    deskripsi: 'Menyusun Detail Engineering Design (DED) 6 sektor: Gedung, Utilitas & Drainase, Fasilitas Wisata, Pertanaman/RTH, Darat, serta Laut & Udara, memastikan seluruh readiness criteria tender fisik terpenuhi 100%.',
    datasetList: [
      'Dataset 1: DED Infrastruktur Gedung (7 Paket)',
      'Dataset 2: DED Utilitas dan Drainase (9 Paket)',
      'Dataset 3: DED Fasilitas Wisata & Lingkungan (8 Paket)',
      'Dataset 4: DED Pertanaman & Penghijauan (6 Paket)',
      'Dataset 5: DED Infrastruktur Darat (7 Paket)',
      'Dataset 6: DED Infrastruktur Laut & Udara (6 Paket)',
    ],
  },
  {
    id: 'dit-pembangunan-infrastruktur',
    code: 'DPINF',
    name: 'Direktorat Pembangunan Infrastruktur',
    shortName: 'Pembangunan Infrastruktur',
    roleInPerkin: 'Pengampu Eksekusi Konstruksi Fisik & Penghasil Utama PNBP ROW',
    pilarUtama: 'Pilar 2: Pelaksanaan Fisik & Pengendalian Konstruksi',
    headOfUnit: 'Direktur Pembangunan Infrastruktur',
    paguAnggaran: 'Rp 742.820.000.000,-',
    paguAnggaranRupiah: 742820000000,
    realisasiAnggaran: 'Rp 602.875.000.000,-',
    persenRealisasi: 81.2,
    datasetCount: 6,
    kpiRingkasan: [
      { label: 'Paket Proyek Berjalan', value: '14 Paket Strategis' },
      { label: 'Realisasi Fisik Rata-rata', value: '71,3 %' },
      { label: 'PNBP ROW Utilitas/RTH', value: 'Rp 7,45 M (109,2%)' },
      { label: 'Pematangan Lahan BSW', value: '280 Ha (4,27 Juta m³)' },
    ],
    statusPilar: 'Tinggi (Ahead/On Track)',
    statusColor: 'sky',
    deskripsi: 'Melaksanakan pembangunan fisik jalan utama, jembatan, flyover, saluran drainase perkotaan, dermaga kargo, izin pemanfaatan ROW utilitas/penghijauan, serta kurva S pekerjaan konstruksi strategis.',
    datasetList: [
      'Dataset 1: Perizinan Pemanfaatan ROW Utilitas',
      'Dataset 2: Perizinan Pemanfaatan ROW Penghijauan',
      'Dataset 3: Ruas Jaringan Jalan BP Batam (542,8 Km)',
      'Dataset 4: Laporan Progres Pekerjaan Konstruksi Berjalan',
      'Dataset 5: Pematangan Tanah Cut & Fill BSW (280 Ha)',
      'Dataset 6: Pembangunan Infrastruktur Paket JNS_PEK',
    ],
  },
  {
    id: 'dit-pengawasan-infrastruktur',
    code: 'DPWAS',
    name: 'Direktorat Pengawasan Infrastruktur',
    shortName: 'Pengawasan Infrastruktur',
    roleInPerkin: 'Pengampu Pengawasan Progres, Penjaminan Mutu & Serah Terima (PHO/FHO)',
    pilarUtama: 'Pilar 3: Pengawasan Progres, Inspeksi Mutu & Kepatuhan Proyek',
    headOfUnit: 'Direktur Pengawasan Infrastruktur',
    paguAnggaran: 'Rp 36.000.000.000,-',
    paguAnggaranRupiah: 36000000000,
    realisasiAnggaran: 'Rp 28.500.000.000,-',
    persenRealisasi: 79.17,
    datasetCount: 8,
    kpiRingkasan: [
      { label: 'Paket Diawasi', value: '20 Paket' },
      { label: 'Rata-rata Deviasi', value: '-4,2 Poin %' },
      { label: 'Temuan Tertangani', value: '88,2 %' },
      { label: 'Total Inspeksi', value: '227 Giat Lapangan' },
    ],
    statusPilar: 'Optimal (Pengawasan Terpadu)',
    statusColor: 'sky',
    deskripsi: 'Melakukan monitoring berkala kurva S rencana vs realisasi, pengendalian deviasi kritis kontraktor, audit kepatuhan mutu/K3/lingkungan, evaluasi konsultan supervisi, serta verifikasi teknis serah terima pertama (PHO) dan akhir (FHO).',
    datasetList: [
      'Dataset 1: Laporan Pengawasan Progres Pekerjaan (Terbatas, perbulan)',
      'Dataset 2: Rekapitulasi Temuan Pengawasan (Terbatas, perbulan)',
      'Dataset 3: Daftar Paket dan Supervisi (Terbatas, perbulan)',
      'Dataset 4: Daftar Inspeksi Lapangan (Terbatas, perbulan)',
      'Dataset 5: Rekapitulasi Serah Terima Pekerjaan (Terbatas, pertahun)',
    ],
  },
];
