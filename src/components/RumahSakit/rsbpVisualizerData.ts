/**
 * UNIFIED DATA STORE: BADAN USAHA RUMAH SAKIT (RSBP BATAM)
 * Satu Objek JSON Utuh (RSBP_BATAM_DATA) untuk memudahkan penggantian dengan data riil API / Satu Data BP Batam.
 * Sesuai Dokumen Atribut Daftar Data Satu Data BP Batam (Hal. 19-21).
 */

export interface KunjunganBulananItem {
  bulan: string;
  rawatJalan: number;
  rawatInap: number;
  igd: number;
  total: number;
  bagianTerbanyak: string;
  jumlahBagianTerbanyak: number;
}

export interface KomposisiItem {
  label: string;
  jumlah: number;
  persen: number;
  color: string;
}

export interface LayananUnggulanItem {
  id: string;
  namaLayanan: string;
  singkatan: string;
  jumlahKasus: number;
  persen: number;
  pertumbuhanYoy: number;
  rentangRekap: string;
  keunggulanTeknis: string;
}

export interface PenyakitIcdItem {
  peringkat: number;
  kodeIcd: string;
  namaPenyakit: string;
  jenisRawat: 'Rawat Jalan' | 'Rawat Inap';
  jumlahKasus: number;
  persen: number;
  keteranganKlinis: string;
}

export interface IndikatorEfisiensiItem {
  bulan: string;
  bor: number;    // Bed Occupancy Rate (%) [ideal 60-85%]
  alos: number;   // Average Length of Stay (Hari) [ideal 3-5 hari]
  toi: number;    // Turn Over Interval (Hari) [ideal 1-3 hari]
  bto: number;    // Bed Turn Over (Kali) [ideal 40-50 kali / thn prorata]
  gdr: number;    // Gross Death Rate (‰) [ideal < 45‰]
  ndr: number;    // Net Death Rate (‰) [ideal < 25‰]
}

export interface PasienKeluarItem {
  bulan: string;
  sembuh: number;
  pulangAps: number;
  dirujuk: number;
  meninggalKurang48: number;
  meninggalLebih48: number;
  meninggalTotal: number;
  totalPasienKeluar: number;
  rataLamaRawatHari: number;
  totalHariRawat: number;
  topDiagnosa: string[];
}

export interface TenagaRsItem {
  kategori: string;
  singkatan: string;
  pns: number;
  p3k: number;
  kontrakBlu: number;
  total: number;
  persen: number;
}

export interface ResepDispensItem {
  bulan: string;
  rawatJalan: number;
  rawatInap: number;
  gawatDarurat: number;
  totalResep: number;
  resepGenerik: number;
  resepNonGenerik: number;
  persenGenerik: number;
}

export interface KeuanganBelanjaItem {
  tahun: number;
  paguMiliar: number;
  realisasiMiliar: number;
  sisaPaguMiliar: number;
  persenRealisasi: number;
  proyeksiPencairanMiliar: number;
  targetAnggaranMiliar: number;
}

export interface PorsiMakananItem {
  bulan: string;
  makananPadat: number; // Makanan Biasa & Lunak
  makananCair: number;  // Diet Khusus, Enteral, Sonde
  totalPorsi: number;
  rataPerHari: number;
  rentangRekap: string;
}

// =========================================================================
// SATU OBJEK DATA UTUH: RSBP_BATAM_DATA
// =========================================================================
export const RSBP_BATAM_DATA = {
  informasiUnit: {
    namaUnit: 'Rumah Sakit Badan Pengusahaan Batam (RSBP Batam)',
    entitas: 'Badan Usaha Rumah Sakit BP Batam',
    tipe: 'Rumah Sakit Umum Daerah Khusus / BLU Tipe B Pendidikan & KEK Medis',
    lokasi: 'Jl. Dr. Cipto Mangunkusumo No. 1, Sekupang, Kota Batam',
    kapasitasTempatTidur: 212,
    tahunBerjalan: 2026,
    tahunPembanding: 2025,
  },

  // 1. KUNJUNGAN PASIEN PER BULAN (DS-5: JUMLAH KUNJUNGAN PASIEN DI RUMAH SAKIT BP BATAM)
  kunjunganPasien: {
    datasetInfo: {
      nama: 'Jumlah Kunjungan Pasien di Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    tahun2026: [
      { bulan: 'Jan', rawatJalan: 9850, rawatInap: 2040, igd: 1320, total: 13210, bagianTerbanyak: 'Poli Penyakit Dalam', jumlahBagianTerbanyak: 2840 },
      { bulan: 'Feb', rawatJalan: 9420, rawatInap: 1980, igd: 1260, total: 12660, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2710 },
      { bulan: 'Mar', rawatJalan: 10450, rawatInap: 2180, igd: 1380, total: 14010, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 3020 },
      { bulan: 'Apr', rawatJalan: 10820, rawatInap: 2240, igd: 1420, total: 14480, bagianTerbanyak: 'Poli Penyakit Dalam', jumlahBagianTerbanyak: 3140 },
      { bulan: 'Mei', rawatJalan: 10210, rawatInap: 2110, igd: 1350, total: 13670, bagianTerbanyak: 'Poli Bedah Umum/Ortopedi', jumlahBagianTerbanyak: 2890 },
      { bulan: 'Jun', rawatJalan: 10760, rawatInap: 2210, igd: 1390, total: 14360, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 3110 },
      { bulan: 'Jul', rawatJalan: 11140, rawatInap: 2290, igd: 1460, total: 14890, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 3290 },
      { bulan: 'Agu', rawatJalan: 10580, rawatInap: 2170, igd: 1390, total: 14140, bagianTerbanyak: 'Poli Penyakit Dalam', jumlahBagianTerbanyak: 3050 },
      { bulan: 'Sep', rawatJalan: 10320, rawatInap: 2130, igd: 1340, total: 13790, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2980 },
      { bulan: 'Okt', rawatJalan: 10690, rawatInap: 2200, igd: 1380, total: 14270, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 3120 },
      { bulan: 'Nov', rawatJalan: 10180, rawatInap: 2090, igd: 1330, total: 13600, bagianTerbanyak: 'Poli Onkologi', jumlahBagianTerbanyak: 2820 },
      { bulan: 'Des', rawatJalan: 11250, rawatInap: 2310, igd: 1490, total: 15050, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 3340 },
    ] as KunjunganBulananItem[],
    tahun2025: [
      { bulan: 'Jan', rawatJalan: 8450, rawatInap: 1980, igd: 1180, total: 11610, bagianTerbanyak: 'Poli Penyakit Dalam', jumlahBagianTerbanyak: 2450 },
      { bulan: 'Feb', rawatJalan: 8120, rawatInap: 1890, igd: 1120, total: 11130, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2360 },
      { bulan: 'Mar', rawatJalan: 8940, rawatInap: 2050, igd: 1240, total: 12230, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2590 },
      { bulan: 'Apr', rawatJalan: 9150, rawatInap: 2120, igd: 1290, total: 12560, bagianTerbanyak: 'Poli Penyakit Dalam', jumlahBagianTerbanyak: 2680 },
      { bulan: 'Mei', rawatJalan: 8780, rawatInap: 2010, igd: 1210, total: 12000, bagianTerbanyak: 'Poli Bedah', jumlahBagianTerbanyak: 2470 },
      { bulan: 'Jun', rawatJalan: 9240, rawatInap: 2160, igd: 1310, total: 12710, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2650 },
      { bulan: 'Jul', rawatJalan: 9450, rawatInap: 2190, igd: 1340, total: 12980, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2790 },
      { bulan: 'Agu', rawatJalan: 8820, rawatInap: 2040, igd: 1230, total: 12090, bagianTerbanyak: 'Poli Penyakit Dalam', jumlahBagianTerbanyak: 2520 },
      { bulan: 'Sep', rawatJalan: 8690, rawatInap: 1990, igd: 1200, total: 11880, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2480 },
      { bulan: 'Okt', rawatJalan: 8910, rawatInap: 2080, igd: 1250, total: 12240, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2610 },
      { bulan: 'Nov', rawatJalan: 8540, rawatInap: 1970, igd: 1190, total: 11700, bagianTerbanyak: 'Poli Onkologi', jumlahBagianTerbanyak: 2380 },
      { bulan: 'Des', rawatJalan: 9350, rawatInap: 2180, igd: 1290, total: 12820, bagianTerbanyak: 'Poli Jantung & Vaskular', jumlahBagianTerbanyak: 2750 },
    ] as KunjunganBulananItem[],
  },

  // 2. KOMPOSISI PASIEN (CARA BAYAR & GENDER) (DS-5: JUMLAH KUNJUNGAN PASIEN DI RUMAH SAKIT BP BATAM)
  komposisiPasien: {
    datasetInfo: {
      nama: 'Jumlah Kunjungan Pasien di Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    caraBayar: [
      { label: 'BPJS Kesehatan (JKN/KIS)', jumlah: 112340, persen: 66.8, color: '#2563eb' },
      { label: 'Asuransi Swasta & Admedika', jumlah: 24850, persen: 14.8, color: '#38bdf8' },
      { label: 'Jaminan Perusahaan Kemitraan', jumlah: 14620, persen: 8.7, color: '#6366f1' },
      { label: 'BPJS Ketenagakerjaan (Trauma)', jumlah: 7980, persen: 4.7, color: '#0ea5e9' },
      { label: 'Umum / Mandiri (Out-of-Pocket)', jumlah: 8340, persen: 5.0, color: '#94a3b8' },
    ] as KomposisiItem[],
    jenisKelamin: [
      { label: 'Perempuan', jumlah: 89640, persen: 53.3, color: '#2563eb' },
      { label: 'Laki-laki', jumlah: 78490, persen: 46.7, color: '#64748b' },
    ] as KomposisiItem[],
  },

  // 3. KUNJUNGAN PER LAYANAN UNGGULAN (DS-6: JUMLAH KUNJUNGAN PASIEN BERDASARKAN LAYANAN UNGGULAN)
  layananUnggulan: {
    datasetInfo: {
      nama: 'Jumlah Kunjungan Pasien Berdasarkan Layanan Unggulan Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    rentangRekapUmum: '01 Jan 2026 s.d 31 Des 2026',
    items: [
      {
        id: 'jantung',
        namaLayanan: 'Kardiologi & Kedokteran Vaskular (Cath Lab/Jantung)',
        singkatan: 'Cardiac Center',
        jumlahKasus: 14850,
        persen: 32.4,
        pertumbuhanYoy: 19.3,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: 'Cathlab Biplane canggih, PCI angioplasti, CABG bypass koroner, & EPS aritmia',
      },
      {
        id: 'onkologi',
        namaLayanan: 'Onkologi Terpadu (Kemoterapi & Radioterapi Linac)',
        singkatan: 'Oncology Center',
        jumlahKasus: 9680,
        persen: 21.1,
        pertumbuhanYoy: 22.5,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: 'Linear Accelerator (LINAC) stereotaktik, Brachytherapy, & Clean Room Kemo Terpusat',
      },
      {
        id: 'hemodialisa',
        namaLayanan: 'Hemodialisa (Pusat Dialisis Ginjal Modern)',
        singkatan: 'Hemodialysis Unit',
        jumlahKasus: 8420,
        persen: 18.4,
        pertumbuhanYoy: 7.3,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: '40 Mesin Hemodialisis High-Flux, ISO Reverse Osmosis, & Layanan CAPD Mandiri',
      },
      {
        id: 'trauma',
        namaLayanan: 'Trauma Center & Bedah Rekonstruksi Ortopedi',
        singkatan: 'Trauma Center',
        jumlahKasus: 5930,
        persen: 12.9,
        pertumbuhanYoy: 11.8,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: 'Layanan 24 Jam kecelakaan industri KEK kemaritiman, arthroskopi & mikro-bedah saraf',
      },
      {
        id: 'nuklir',
        namaLayanan: 'Kedokteran Nuklir & Teranostik Molekuler',
        singkatan: 'Nuclear Medicine',
        jumlahKasus: 3280,
        persen: 7.2,
        pertumbuhanYoy: 38.6,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: 'SPECT-CT scan gamma camera, terapi ablasi iodium I-131 tiroid pertama di Kepri',
      },
      {
        id: 'mcu',
        namaLayanan: 'Pelayanan Eksekutif & Medical Check Up (MCU)',
        singkatan: 'Executive MCU',
        jumlahKasus: 2150,
        persen: 4.7,
        pertumbuhanYoy: 14.1,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: 'Paket fit-to-work tenaga ahli offshore maritim internasional & ekspatriat KEK',
      },
      {
        id: 'hyperbaric',
        namaLayanan: 'Hyperbaric Oxygen Chamber (HBOT Penyelam)',
        singkatan: 'Hyperbaric Center',
        jumlahKasus: 1520,
        persen: 3.3,
        pertumbuhanYoy: 12.4,
        rentangRekap: '01 Jan - 31 Des 2026',
        keunggulanTeknis: 'Chamber multiplace untuk dekompresi dekompression diving & penyembuhan luka diabetik',
      },
    ] as LayananUnggulanItem[],
  },

  // 4. 10 PENYAKIT TERBANYAK (DS-4: JUMLAH KASUS PENYAKIT TERBANYAK DI RUMAH SAKIT BP BATAM)
  topPenyakit: {
    datasetInfo: {
      nama: 'Jumlah Kasus Penyakit Terbanyak di Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    rawatJalan: [
      { peringkat: 1, kodeIcd: 'I10', namaPenyakit: 'Hipertensi Primer / Esensial', jenisRawat: 'Rawat Jalan', jumlahKasus: 16420, persen: 24.2, keteranganKlinis: 'Pemeriksaan rutin tekanan darah poliklinik jantung & dalam' },
      { peringkat: 2, kodeIcd: 'E11', namaPenyakit: 'Diabetes Melitus Tipe 2 (NIDDM)', jenisRawat: 'Rawat Jalan', jumlahKasus: 13950, persen: 20.6, keteranganKlinis: 'Manajemen gula darah kronis & komplikasi vaskular' },
      { peringkat: 3, kodeIcd: 'K30', namaPenyakit: 'Dispepsia Fungsional / Gastritis', jenisRawat: 'Rawat Jalan', jumlahKasus: 10240, persen: 15.1, keteranganKlinis: 'Keluhan asam lambung dan tukak lambung pekerja usia produktif' },
      { peringkat: 4, kodeIcd: 'I25.9', namaPenyakit: 'Penyakit Jantung Iskemik Kronik', jenisRawat: 'Rawat Jalan', jumlahKasus: 8940, persen: 13.2, keteranganKlinis: 'Evaluasi pasca pemasangan stent & terapi antiplatelet' },
      { peringkat: 5, kodeIcd: 'N18.5', namaPenyakit: 'Gagal Ginjal Kronik Tahap Akhir', jenisRawat: 'Rawat Jalan', jumlahKasus: 5890, persen: 8.7, keteranganKlinis: 'Pasien rawat jalan rutin unit hemodialisa' },
      { peringkat: 6, kodeIcd: 'M19.9', namaPenyakit: 'Osteoartritis & Gangguan Sendi Degeneratif', jenisRawat: 'Rawat Jalan', jumlahKasus: 4120, persen: 6.1, keteranganKlinis: 'Poliklinik ortopedi & rehabilitasi medik' },
      { peringkat: 7, kodeIcd: 'J45.9', namaPenyakit: 'Asma Bronkial Tak Terspesifikasi', jenisRawat: 'Rawat Jalan', jumlahKasus: 3280, persen: 4.8, keteranganKlinis: 'Poliklinik paru & spirometri kontrol' },
      { peringkat: 8, kodeIcd: 'H25.9', namaPenyakit: 'Katarak Senilis / Degeneratif', jenisRawat: 'Rawat Jalan', jumlahKasus: 2150, persen: 3.2, keteranganKlinis: 'Skrining dan pra-operasi fakoemulsifikasi mata' },
      { peringkat: 9, kodeIcd: 'C50.9', namaPenyakit: 'Neoplasma Ganas Payudara (Kanker)', jenisRawat: 'Rawat Jalan', jumlahKasus: 1740, persen: 2.6, keteranganKlinis: 'Siklus kemoterapi berulang & radioterapi' },
      { peringkat: 10, kodeIcd: 'G40.9', namaPenyakit: 'Epilepsi & Gangguan Neurologis Kronik', jenisRawat: 'Rawat Jalan', jumlahKasus: 1080, persen: 1.5, keteranganKlinis: 'Kontrol obat antikonvulsan poliklinik saraf' },
    ] as PenyakitIcdItem[],
    rawatInap: [
      { peringkat: 1, kodeIcd: 'I21.9', namaPenyakit: 'Infark Miokard Akut (STEMI / NSTEMI)', jenisRawat: 'Rawat Inap', jumlahKasus: 3840, persen: 18.2, keteranganKlinis: 'Perawatan intensif ICCU pasca PCI darurat 24 jam' },
      { peringkat: 2, kodeIcd: 'I64', namaPenyakit: 'Stroke Iskemik Akut / Perdarahan Otak', jenisRawat: 'Rawat Inap', jumlahKasus: 3410, persen: 16.1, keteranganKlinis: 'Perawatan Unit Stroke Terpadu & pemulihan fungsional' },
      { peringkat: 3, kodeIcd: 'J18.9', namaPenyakit: 'Pneumonia Bakterial & Infeksi Paru Akut', jenisRawat: 'Rawat Inap', jumlahKasus: 2790, persen: 13.2, keteranganKlinis: 'Terapi antibiotik intravena & oksigenasi bangsal rawat inap' },
      { peringkat: 4, kodeIcd: 'A91', namaPenyakit: 'Demam Berdarah Dengue (DBD Derajat I-IV)', jenisRawat: 'Rawat Inap', jumlahKasus: 2450, persen: 11.6, keteranganKlinis: 'Monitoring trombosit harian & rehidrasi cairan intensif' },
      { peringkat: 5, kodeIcd: 'S06.0', namaPenyakit: 'Cedera Otak / Fraktur Trauma Ekstremitas', jenisRawat: 'Rawat Inap', jumlahKasus: 2180, persen: 10.3, keteranganKlinis: 'Pasien operasi ortopedi & observasi neurologi trauma center' },
      { peringkat: 6, kodeIcd: 'K35.8', namaPenyakit: 'Apendisitis Akut Perforasi / Bedah Darurat', jenisRawat: 'Rawat Inap', jumlahKasus: 1720, persen: 8.1, keteranganKlinis: 'Laparoskopi apendektomi & observasi pasca bedah' },
      { peringkat: 7, kodeIcd: 'N18.5', namaPenyakit: 'Gagal Ginjal Kronik Eksaserbasi Akut (CKD)', jenisRawat: 'Rawat Inap', jumlahKasus: 1540, persen: 7.3, keteranganKlinis: 'Hemodialisa darurat cito & koreksi asidosis metabolik' },
      { peringkat: 8, kodeIcd: 'A09', namaPenyakit: 'Gastroenteritis Akut dengan Dehidrasi Sedang', jenisRawat: 'Rawat Inap', jumlahKasus: 1290, persen: 6.1, keteranganKlinis: 'Rehidrasi cairan intravena bangsal anak & dewasa' },
      { peringkat: 9, kodeIcd: 'O80', namaPenyakit: 'Persalinan Spontan & Seksio Sesarea Berpenyulit', jenisRawat: 'Rawat Inap', jumlahKasus: 1050, persen: 5.0, keteranganKlinis: 'Kamar bersalin VK dan bangsal rawat nifas' },
      { peringkat: 10, kodeIcd: 'C34.9', namaPenyakit: 'Neoplasma Ganas Paru & Bronkus', jenisRawat: 'Rawat Inap', jumlahKasus: 860, persen: 4.1, keteranganKlinis: 'Perawatan suportif paliatif kemoterapi fase lanjut' },
    ] as PenyakitIcdItem[],
  },

  // 5. INDIKATOR EFISIENSI RUMAH SAKIT (DS-9: NILAI INDIKATOR EFISIENSI RUMAH SAKIT BP BATAM)
  indikatorEfisiensi: {
    datasetInfo: {
      nama: 'Nilai Indikator Efisiensi Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    standarKemenkes: {
      bor: { min: 60, max: 85, satuan: '%', nama: 'Bed Occupancy Rate (BOR)', labelKemenkes: 'Standar Ideal Kemenkes: 60% - 85%', deskripsi: 'Persentase pemakaian tempat tidur rawat inap.' },
      alos: { min: 3, max: 5, satuan: 'Hari', nama: 'Average Length of Stay (AvLOS)', labelKemenkes: 'Standar Ideal Kemenkes: 3 - 5 Hari', deskripsi: 'Rata-rata lama perawatan pasien rawat inap.' },
      toi: { min: 1, max: 3, satuan: 'Hari', nama: 'Turn Over Interval (TOI)', labelKemenkes: 'Standar Ideal Kemenkes: 1 - 3 Hari', deskripsi: 'Rata-rata ranjang kosong dari pasien pulang ke pasien baru.' },
      bto: { min: 40, max: 50, satuan: 'Kali/TT/Thn', nama: 'Bed Turn Over (BTO)', labelKemenkes: 'Standar Ideal Kemenkes: 40 - 50 Kali/Thn', deskripsi: 'Frekuensi pemakaian tempat tidur dalam satu tahun.' },
      gdr: { min: 0, max: 45, satuan: '‰ (per mil)', nama: 'Gross Death Rate (GDR)', labelKemenkes: 'Standar Ideal Kemenkes: < 45 ‰', deskripsi: 'Angka kematian umum seluruh pasien rawat inap.' },
      ndr: { min: 0, max: 25, satuan: '‰ (per mil)', nama: 'Net Death Rate (NDR)', labelKemenkes: 'Standar Ideal Kemenkes: < 25 ‰', deskripsi: 'Angka kematian pasien yang dirawat lebih dari 48 jam.' },
    },
    tahun2026: [
      { bulan: 'Jan', bor: 71.8, alos: 4.1, toi: 1.6, bto: 3.9, gdr: 22.4, ndr: 13.8 },
      { bulan: 'Feb', bor: 73.2, alos: 4.0, toi: 1.5, bto: 4.1, gdr: 23.1, ndr: 14.1 },
      { bulan: 'Mar', bor: 75.4, alos: 4.2, toi: 1.4, bto: 4.3, gdr: 21.8, ndr: 13.5 },
      { bulan: 'Apr', bor: 76.8, alos: 4.3, toi: 1.3, bto: 4.4, gdr: 20.5, ndr: 12.9 },
      { bulan: 'Mei', bor: 74.5, alos: 4.1, toi: 1.5, bto: 4.2, gdr: 22.9, ndr: 14.2 },
      { bulan: 'Jun', bor: 76.1, alos: 4.2, toi: 1.4, bto: 4.3, gdr: 21.2, ndr: 13.1 },
      { bulan: 'Jul', bor: 78.5, alos: 4.4, toi: 1.2, bto: 4.5, gdr: 19.8, ndr: 12.4 },
      { bulan: 'Agu', bor: 75.9, alos: 4.2, toi: 1.4, bto: 4.2, gdr: 22.1, ndr: 13.7 },
      { bulan: 'Sep', bor: 74.8, alos: 4.1, toi: 1.5, bto: 4.1, gdr: 23.4, ndr: 14.5 },
      { bulan: 'Okt', bor: 77.2, alos: 4.3, toi: 1.3, bto: 4.4, gdr: 20.9, ndr: 13.0 },
      { bulan: 'Nov', bor: 73.6, alos: 4.0, toi: 1.5, bto: 4.0, gdr: 24.1, ndr: 14.9 },
      { bulan: 'Des', bor: 79.4, alos: 4.4, toi: 1.1, bto: 4.6, gdr: 20.1, ndr: 12.6 },
    ] as IndikatorEfisiensiItem[],
    tahun2025: [
      { bulan: 'Jan', bor: 68.2, alos: 4.3, toi: 1.8, bto: 3.6, gdr: 24.8, ndr: 15.2 },
      { bulan: 'Feb', bor: 67.5, alos: 4.2, toi: 1.9, bto: 3.5, gdr: 25.4, ndr: 15.8 },
      { bulan: 'Mar', bor: 70.1, alos: 4.3, toi: 1.7, bto: 3.8, gdr: 23.6, ndr: 14.5 },
      { bulan: 'Apr', bor: 71.9, alos: 4.4, toi: 1.6, bto: 3.9, gdr: 22.8, ndr: 14.0 },
      { bulan: 'Mei', bor: 69.4, alos: 4.2, toi: 1.7, bto: 3.7, gdr: 24.1, ndr: 14.9 },
      { bulan: 'Jun', bor: 72.8, alos: 4.3, toi: 1.5, bto: 4.0, gdr: 23.0, ndr: 14.2 },
      { bulan: 'Jul', bor: 74.2, alos: 4.5, toi: 1.4, bto: 4.1, gdr: 21.9, ndr: 13.6 },
      { bulan: 'Agu', bor: 71.0, alos: 4.2, toi: 1.6, bto: 3.8, gdr: 23.7, ndr: 14.7 },
      { bulan: 'Sep', bor: 69.8, alos: 4.1, toi: 1.7, bto: 3.7, gdr: 25.0, ndr: 15.4 },
      { bulan: 'Okt', bor: 72.5, alos: 4.3, toi: 1.5, bto: 4.0, gdr: 22.5, ndr: 13.9 },
      { bulan: 'Nov', bor: 68.9, alos: 4.1, toi: 1.8, bto: 3.6, gdr: 26.2, ndr: 16.1 },
      { bulan: 'Des', bor: 74.6, alos: 4.4, toi: 1.4, bto: 4.2, gdr: 22.0, ndr: 13.8 },
    ] as IndikatorEfisiensiItem[],
  },

  // 6. LAMA DIRAWAT DAN CARA PASIEN KELUAR (DS-16: REGISTRASI PELAYANAN RAWAT INAP, RAWAT JALAN DAN IGD)
  lamaDirawatCaraKeluar: {
    datasetInfo: {
      nama: 'Registrasi Pelayanan Rawat Inap, Rawat Jalan dan IGD di Rumah Sakit BP Batam',
      sifat: 'Tertutup' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 21 Dokumen Satu Data',
    },
    tahun2026: [
      {
        bulan: 'Jan',
        sembuh: 1845,
        pulangAps: 102,
        dirujuk: 48,
        meninggalKurang48: 18,
        meninggalLebih48: 27,
        meninggalTotal: 45,
        totalPasienKeluar: 2040,
        rataLamaRawatHari: 4.1,
        totalHariRawat: 8364,
        topDiagnosa: ['Infark Miokard Akut (I21.9)', 'Stroke Iskemik (I64)', 'Pneumonia (J18.9)'],
      },
      {
        bulan: 'Feb',
        sembuh: 1792,
        pulangAps: 98,
        dirujuk: 44,
        meninggalKurang48: 18,
        meninggalLebih48: 28,
        meninggalTotal: 46,
        totalPasienKeluar: 1980,
        rataLamaRawatHari: 4.0,
        totalHariRawat: 7920,
        topDiagnosa: ['Demam Berdarah Dengue (A91)', 'Infark Miokard Akut (I21.9)', 'Cedera Otak (S06.0)'],
      },
      {
        bulan: 'Mar',
        sembuh: 1982,
        pulangAps: 105,
        dirujuk: 46,
        meninggalKurang48: 19,
        meninggalLebih48: 28,
        meninggalTotal: 47,
        totalPasienKeluar: 2180,
        rataLamaRawatHari: 4.2,
        totalHariRawat: 9156,
        topDiagnosa: ['Stroke Iskemik (I64)', 'Gagal Ginjal Kronik (N18.5)', 'Infark Miokard Akut (I21.9)'],
      },
      {
        bulan: 'Apr',
        sembuh: 2046,
        pulangAps: 99,
        dirujuk: 49,
        meninggalKurang48: 17,
        meninggalLebih48: 29,
        meninggalTotal: 46,
        totalPasienKeluar: 2240,
        rataLamaRawatHari: 4.3,
        totalHariRawat: 9632,
        topDiagnosa: ['Infark Miokard Akut (I21.9)', 'Pneumonia (J18.9)', 'Apendisitis Akut (K35.8)'],
      },
      {
        bulan: 'Mei',
        sembuh: 1918,
        pulangAps: 104,
        dirujuk: 40,
        meninggalKurang48: 19,
        meninggalLebih48: 30,
        meninggalTotal: 49,
        totalPasienKeluar: 2111,
        rataLamaRawatHari: 4.1,
        totalHariRawat: 8655,
        topDiagnosa: ['Demam Berdarah Dengue (A91)', 'Stroke Iskemik (I64)', 'Gagal Ginjal (N18.5)'],
      },
      {
        bulan: 'Jun',
        sembuh: 2018,
        pulangAps: 101,
        dirujuk: 44,
        meninggalKurang48: 18,
        meninggalLebih48: 29,
        meninggalTotal: 47,
        totalPasienKeluar: 2210,
        rataLamaRawatHari: 4.2,
        totalHariRawat: 9282,
        topDiagnosa: ['Infark Miokard Akut (I21.9)', 'Cedera Otak (S06.0)', 'Pneumonia (J18.9)'],
      },
      {
        bulan: 'Jul',
        sembuh: 2102,
        pulangAps: 96,
        dirujuk: 47,
        meninggalKurang48: 16,
        meninggalLebih48: 29,
        meninggalTotal: 45,
        totalPasienKeluar: 2290,
        rataLamaRawatHari: 4.4,
        totalHariRawat: 10076,
        topDiagnosa: ['Infark Miokard Akut (I21.9)', 'Stroke Iskemik (I64)', 'Kanker Payudara (C50.9)'],
      },
      {
        bulan: 'Agu',
        sembuh: 1980,
        pulangAps: 102,
        dirujuk: 40,
        meninggalKurang48: 19,
        meninggalLebih48: 29,
        meninggalTotal: 48,
        totalPasienKeluar: 2170,
        rataLamaRawatHari: 4.2,
        totalHariRawat: 9114,
        topDiagnosa: ['Gastroenteritis Akut (A09)', 'Pneumonia (J18.9)', 'Infark Miokard Akut (I21.9)'],
      },
      {
        bulan: 'Sep',
        sembuh: 1932,
        pulangAps: 108,
        dirujuk: 40,
        meninggalKurang48: 20,
        meninggalLebih48: 30,
        meninggalTotal: 50,
        totalPasienKeluar: 2130,
        rataLamaRawatHari: 4.1,
        totalHariRawat: 8733,
        topDiagnosa: ['Stroke Iskemik (I64)', 'Demam Berdarah (A91)', 'Apendisitis (K35.8)'],
      },
      {
        bulan: 'Okt',
        sembuh: 2012,
        pulangAps: 97,
        dirujuk: 45,
        meninggalKurang48: 17,
        meninggalLebih48: 29,
        meninggalTotal: 46,
        totalPasienKeluar: 2200,
        rataLamaRawatHari: 4.3,
        totalHariRawat: 9460,
        topDiagnosa: ['Infark Miokard Akut (I21.9)', 'Pneumonia (J18.9)', 'Gagal Ginjal (N18.5)'],
      },
      {
        bulan: 'Nov',
        sembuh: 1898,
        pulangAps: 103,
        dirujuk: 40,
        meninggalKurang48: 20,
        meninggalLebih48: 29,
        meninggalTotal: 49,
        totalPasienKeluar: 2090,
        rataLamaRawatHari: 4.0,
        totalHariRawat: 8360,
        topDiagnosa: ['Stroke Iskemik (I64)', 'Cedera Fraktur (S06.0)', 'Demam Berdarah (A91)'],
      },
      {
        bulan: 'Des',
        sembuh: 2125,
        pulangAps: 94,
        dirujuk: 45,
        meninggalKurang48: 17,
        meninggalLebih48: 29,
        meninggalTotal: 46,
        totalPasienKeluar: 2310,
        rataLamaRawatHari: 4.4,
        totalHariRawat: 10164,
        topDiagnosa: ['Infark Miokard Akut (I21.9)', 'Stroke Iskemik (I64)', 'Pneumonia (J18.9)'],
      },
    ] as PasienKeluarItem[],
  },

  // 7. TENAGA RUMAH SAKIT (DS-7: DATA PEGAWAI RUMAH SAKIT BP BATAM)
  tenagaRumahSakit: {
    datasetInfo: {
      nama: 'Data Pegawai Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Pertahun',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    tahun2026: {
      totalPegawai: 583,
      items: [
        { kategori: 'Dokter Spesialis & Subspesialis', singkatan: 'Spesialis', pns: 32, p3k: 18, kontrakBlu: 18, total: 68, persen: 11.7 },
        { kategori: 'Dokter Umum & Dokter Gigi', singkatan: 'Dr. Umum/Gigi', pns: 12, p3k: 8, kontrakBlu: 8, total: 28, persen: 4.8 },
        { kategori: 'Perawat Klinis & Ners', singkatan: 'Perawat/Ners', pns: 104, p3k: 62, kontrakBlu: 80, total: 246, persen: 42.2 },
        { kategori: 'Bidan Terampil & Mahir', singkatan: 'Bidan', pns: 20, p3k: 12, kontrakBlu: 10, total: 42, persen: 7.2 },
        { kategori: 'Penunjang Medis (Farmasi, Lab, Radiologi, Gizi)', singkatan: 'Penunjang Medis', pns: 36, p3k: 24, kontrakBlu: 24, total: 84, persen: 14.4 },
        { kategori: 'Tenaga Administrasi, IT & Manajemen RS', singkatan: 'Admin & Manajemen', pns: 48, p3k: 25, kontrakBlu: 42, total: 115, persen: 19.7 },
      ] as TenagaRsItem[],
    },
    tahun2025: {
      totalPegawai: 556,
      items: [
        { kategori: 'Dokter Spesialis & Subspesialis', singkatan: 'Spesialis', pns: 30, p3k: 16, kontrakBlu: 16, total: 62, persen: 11.2 },
        { kategori: 'Dokter Umum & Dokter Gigi', singkatan: 'Dr. Umum/Gigi', pns: 12, p3k: 7, kontrakBlu: 7, total: 26, persen: 4.7 },
        { kategori: 'Perawat Klinis & Ners', singkatan: 'Perawat/Ners', pns: 100, p3k: 58, kontrakBlu: 78, total: 236, persen: 42.4 },
        { kategori: 'Bidan Terampil & Mahir', singkatan: 'Bidan', pns: 19, p3k: 11, kontrakBlu: 10, total: 40, persen: 7.2 },
        { kategori: 'Penunjang Medis (Farmasi, Lab, Radiologi, Gizi)', singkatan: 'Penunjang Medis', pns: 34, p3k: 22, kontrakBlu: 24, total: 80, persen: 14.4 },
        { kategori: 'Tenaga Administrasi, IT & Manajemen RS', singkatan: 'Admin & Manajemen', pns: 46, p3k: 24, kontrakBlu: 42, total: 112, persen: 20.1 },
      ] as TenagaRsItem[],
    },
  },

  // 8. RESEP DISPENS OBAT (DS-17: REKAPITULASI RESEP DISPENS OBAT GENERIK DAN NON GENERIK)
  resepDispensObat: {
    datasetInfo: {
      nama: 'Rekapitulasi Resep Dispens Obat Generik dan Non Generik',
      sifat: 'Tertutup' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 21 Dokumen Satu Data',
    },
    tahun2026: [
      { bulan: 'Jan', rawatJalan: 9850, rawatInap: 3240, gawatDarurat: 2410, totalResep: 15500, resepGenerik: 12942, resepNonGenerik: 2558, persenGenerik: 83.5 },
      { bulan: 'Feb', rawatJalan: 9420, rawatInap: 3120, gawatDarurat: 2320, totalResep: 14860, resepGenerik: 12438, resepNonGenerik: 2422, persenGenerik: 83.7 },
      { bulan: 'Mar', rawatJalan: 10450, rawatInap: 3450, gawatDarurat: 2580, totalResep: 16480, resepGenerik: 13744, resepNonGenerik: 2736, persenGenerik: 83.4 },
      { bulan: 'Apr', rawatJalan: 10820, rawatInap: 3580, gawatDarurat: 2640, totalResep: 17040, resepGenerik: 14245, resepNonGenerik: 2795, persenGenerik: 83.6 },
      { bulan: 'Mei', rawatJalan: 10210, rawatInap: 3370, gawatDarurat: 2490, totalResep: 16070, resepGenerik: 13386, resepNonGenerik: 2684, persenGenerik: 83.3 },
      { bulan: 'Jun', rawatJalan: 10760, rawatInap: 3520, gawatDarurat: 2610, totalResep: 16890, resepGenerik: 14120, resepNonGenerik: 2770, persenGenerik: 83.6 },
      { bulan: 'Jul', rawatJalan: 11140, rawatInap: 3680, gawatDarurat: 2720, totalResep: 17540, resepGenerik: 14663, resepNonGenerik: 2877, persenGenerik: 83.6 },
      { bulan: 'Agu', rawatJalan: 10580, rawatInap: 3480, gawatDarurat: 2590, totalResep: 16650, resepGenerik: 13903, resepNonGenerik: 2747, persenGenerik: 83.5 },
      { bulan: 'Sep', rawatJalan: 10320, rawatInap: 3390, gawatDarurat: 2510, totalResep: 16220, resepGenerik: 13544, resepNonGenerik: 2676, persenGenerik: 83.5 },
      { bulan: 'Okt', rawatJalan: 10690, rawatInap: 3510, gawatDarurat: 2620, totalResep: 16820, resepGenerik: 14061, resepNonGenerik: 2759, persenGenerik: 83.6 },
      { bulan: 'Nov', rawatJalan: 10180, rawatInap: 3350, gawatDarurat: 2480, totalResep: 16010, resepGenerik: 13352, resepNonGenerik: 2658, persenGenerik: 83.4 },
      { bulan: 'Des', rawatJalan: 11250, rawatInap: 3710, gawatDarurat: 2750, totalResep: 17710, resepGenerik: 14805, resepNonGenerik: 2905, persenGenerik: 83.6 },
    ] as ResepDispensItem[],
  },

  // 9. REALISASI BELANJA TERHADAP PAGU DAN PROYEKSI (DS-12 & DS-15)
  // DS-12: Nilai Realisasi Belanja dan Penerimaan BP Batam
  // DS-15: Rekapitulasi Proyeksi Penerimaan dan Pencairan Dana Badan Usaha Rumah Sakit
  keuanganBelanja5Tahun: {
    datasetInfo: {
      nama: 'Nilai Realisasi Belanja & Rekapitulasi Proyeksi Pencairan Dana BU RS',
      sifat: 'Tertutup' as const,
      periode: 'Pertahun',
      halamanPdf: 'Hal. 20 - 21 Dokumen Satu Data',
    },
    items: [
      { tahun: 2022, paguMiliar: 108.5, realisasiMiliar: 94.4, sisaPaguMiliar: 14.1, persenRealisasi: 87.0, proyeksiPencairanMiliar: 96.0, targetAnggaranMiliar: 105.0 },
      { tahun: 2023, paguMiliar: 118.2, realisasiMiliar: 105.2, sisaPaguMiliar: 13.0, persenRealisasi: 89.0, proyeksiPencairanMiliar: 106.5, targetAnggaranMiliar: 115.0 },
      { tahun: 2024, paguMiliar: 125.0, realisasiMiliar: 114.3, sisaPaguMiliar: 10.7, persenRealisasi: 91.4, proyeksiPencairanMiliar: 115.0, targetAnggaranMiliar: 122.0 },
      { tahun: 2025, paguMiliar: 130.0, realisasiMiliar: 118.9, sisaPaguMiliar: 11.1, persenRealisasi: 91.5, proyeksiPencairanMiliar: 120.0, targetAnggaranMiliar: 128.0 },
      { tahun: 2026, paguMiliar: 135.0, realisasiMiliar: 109.35, sisaPaguMiliar: 25.65, persenRealisasi: 81.0, proyeksiPencairanMiliar: 125.0, targetAnggaranMiliar: 135.0 },
    ] as KeuanganBelanjaItem[],
  },

  // 10. PORSI MAKANAN PASIEN (DS-10: DATA PORSI MAKANAN PASIEN DI RUMAH SAKIT BP BATAM)
  porsiMakanan: {
    datasetInfo: {
      nama: 'Data Porsi Makanan Pasien di Rumah Sakit BP Batam',
      sifat: 'Terbuka' as const,
      periode: 'Perbulan',
      halamanPdf: 'Hal. 20 Dokumen Satu Data',
    },
    tahun2026: [
      { bulan: 'Jan', makananPadat: 16820, makananCair: 3140, totalPorsi: 19960, rataPerHari: 644, rentangRekap: '01 Jan - 31 Jan 2026' },
      { bulan: 'Feb', makananPadat: 16150, makananCair: 2980, totalPorsi: 19130, rataPerHari: 683, rentangRekap: '01 Feb - 28 Feb 2026' },
      { bulan: 'Mar', makananPadat: 17890, makananCair: 3340, totalPorsi: 21230, rataPerHari: 685, rentangRekap: '01 Mar - 31 Mar 2026' },
      { bulan: 'Apr', makananPadat: 18450, makananCair: 3460, totalPorsi: 21910, rataPerHari: 730, rentangRekap: '01 Apr - 30 Apr 2026' },
      { bulan: 'Mei', makananPadat: 17380, makananCair: 3260, totalPorsi: 20640, rataPerHari: 666, rentangRekap: '01 Mei - 31 Mei 2026' },
      { bulan: 'Jun', makananPadat: 18240, makananCair: 3410, totalPorsi: 21650, rataPerHari: 722, rentangRekap: '01 Jun - 30 Jun 2026' },
      { bulan: 'Jul', makananPadat: 18920, makananCair: 3540, totalPorsi: 22460, rataPerHari: 725, rentangRekap: '01 Jul - 31 Jul 2026' },
      { bulan: 'Agu', makananPadat: 17950, makananCair: 3360, totalPorsi: 21310, rataPerHari: 687, rentangRekap: '01 Agu - 31 Agu 2026' },
      { bulan: 'Sep', makananPadat: 17480, makananCair: 3290, totalPorsi: 20770, rataPerHari: 692, rentangRekap: '01 Sep - 30 Sep 2026' },
      { bulan: 'Okt', makananPadat: 18120, makananCair: 3390, totalPorsi: 21510, rataPerHari: 694, rentangRekap: '01 Okt - 31 Okt 2026' },
      { bulan: 'Nov', makananPadat: 17290, makananCair: 3230, totalPorsi: 20520, rataPerHari: 684, rentangRekap: '01 Nov - 30 Nov 2026' },
      { bulan: 'Des', makananPadat: 19180, makananCair: 3590, totalPorsi: 22770, rataPerHari: 735, rentangRekap: '01 Des - 31 Des 2026' },
    ] as PorsiMakananItem[],
    tahun2025: [
      { bulan: 'Jan', makananPadat: 15420, makananCair: 2890, totalPorsi: 18310, rataPerHari: 591, rentangRekap: '01 Jan - 31 Jan 2025' },
      { bulan: 'Feb', makananPadat: 14890, makananCair: 2780, totalPorsi: 17670, rataPerHari: 631, rentangRekap: '01 Feb - 28 Feb 2025' },
      { bulan: 'Mar', makananPadat: 16320, makananCair: 3050, totalPorsi: 19370, rataPerHari: 625, rentangRekap: '01 Mar - 31 Mar 2025' },
      { bulan: 'Apr', makananPadat: 16890, makananCair: 3160, totalPorsi: 20050, rataPerHari: 668, rentangRekap: '01 Apr - 30 Apr 2025' },
      { bulan: 'Mei', makananPadat: 15980, makananCair: 2990, totalPorsi: 18970, rataPerHari: 612, rentangRekap: '01 Mei - 31 Mei 2025' },
      { bulan: 'Jun', makananPadat: 16750, makananCair: 3130, totalPorsi: 19880, rataPerHari: 663, rentangRekap: '01 Jun - 30 Jun 2025' },
      { bulan: 'Jul', makananPadat: 17420, makananCair: 3250, totalPorsi: 20670, rataPerHari: 667, rentangRekap: '01 Jul - 31 Jul 2025' },
      { bulan: 'Agu', makananPadat: 16480, makananCair: 3080, totalPorsi: 19560, rataPerHari: 631, rentangRekap: '01 Agu - 31 Agu 2025' },
      { bulan: 'Sep', makananPadat: 16050, makananCair: 3010, totalPorsi: 19060, rataPerHari: 635, rentangRekap: '01 Sep - 30 Sep 2025' },
      { bulan: 'Okt', makananPadat: 16680, makananCair: 3120, totalPorsi: 19800, rataPerHari: 639, rentangRekap: '01 Okt - 31 Okt 2025' },
      { bulan: 'Nov', makananPadat: 15890, makananCair: 2970, totalPorsi: 18860, rataPerHari: 629, rentangRekap: '01 Nov - 30 Nov 2025' },
      { bulan: 'Des', makananPadat: 17650, makananCair: 3300, totalPorsi: 20950, rataPerHari: 676, rentangRekap: '01 Des - 31 Des 2025' },
    ] as PorsiMakananItem[],
  },
};
