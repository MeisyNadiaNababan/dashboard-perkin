// ============================================================================
// KAMUS RESMI SUMBER DATA & FORMULA PERHITUNGAN SATU DATA BP BATAM
// Mengacu Dokumen Resmi: "Atribut Daftar Data Satu Data BP Batam" (Hal. 1 - 53)
// Digunakan khusus untuk Konsolidasi Multi-Indikator Strategis Kepala BP Batam
// ============================================================================

export interface KomponenVariabelData {
  namaVariabel: string;
  simbol?: string;
  deskripsi: string;
  nilaiRiil: string;
  satuan: string;
  satkerAsal: string;
  nomorDataset: string;
  halamanSatuData: string;
  atributFisik: string;
}

export interface IndikatorSatuDataFormula {
  id: string;
  namaIndikator: string;
  namaSingkat: string;
  klasterId: string;
  klasterNama: string;
  satkerPengampuUtama: string;
  kodeSatker: string;
  routeIdSatker: string;
  satkerTerkaitLain?: Array<{ nama: string; kode: string; routeId: string }>;
  nomorDataset: string;
  halamanBukuSatuData: string;
  daftarAtributResmi: string[];
  jenisKarakteristikData:
    | 'DATASET_TUNGGAL'
    | 'GABUNGAN_MULTI_SATKER'
    | 'FORMULA_RASIO'
    | 'FORMULA_PERSENTASE'
    | 'KOMPOSIT_INDEKS';
  penjelasanIntegrasi: string;
  rumusFormulaMatematis: string;
  formulaDisplayHtml?: string;
  targetResmi: string;
  realisasiTerkini: string;
  tingkatCapaianPersen: number;
  statusKetercapaian: 'Tercapai' | 'On Track' | 'Aman & Normal' | 'Melampaui Target';
  komponenVariabel: KomponenVariabelData[];
  dasarRegulasi: string;
  catatanTeknis: string;
}

export const KAMUS_SATU_DATA_FORMULA_LIST: IndikatorSatuDataFormula[] = [
  // ==========================================================================
  // KLASTER 1: KONEKTIVITAS LOGISTIK & AVIASI BEBAS (HAL. 8-9, 11-12, 14-17)
  // ==========================================================================
  {
    id: 'kpi-arus-peti-kemas-batu-ampar',
    namaIndikator: 'Jumlah Pelayanan Bongkar Muat Terminal Peti Kemas Batu Ampar',
    namaSingkat: 'Bongkar Muat Peti Kemas Batu Ampar',
    klasterId: 'sektor-logistik-aviasi',
    klasterNama: 'Konektivitas Logistik & Aviasi Bebas',
    satkerPengampuUtama: 'Direktorat Pengelolaan Kepelabuhanan',
    kodeSatker: 'BUP',
    routeIdSatker: 'dit-pelabuhan',
    satkerTerkaitLain: [
      { nama: 'Terminal Peti Kemas Batu Ampar', kode: 'TPK', routeId: 'dit-pelabuhan' },
      { nama: 'Daftar Dermaga BP Batam (Dataset #4 Hal. 15)', kode: 'DERMAGA', routeId: 'dit-pelabuhan' }
    ],
    nomorDataset: 'Dataset #23: Jumlah Pelayanan Bongkar Muat Terminal Peti Kemas Batu Ampar',
    halamanBukuSatuData: 'Halaman 17, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'TAHUN',
      'VOLUME BONGKAR KEMAS BATU AMPAR (TEUS)',
      'VOLUME MUAT PETI KEMAS BATU AMPAR (TEUS)'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber langsung dari Dataset #23 (Halaman 17 PDF Satu Data) Direktorat Pengelolaan Kepelabuhanan. Nilai total arus kontainer dihitung dengan menjumlahkan atribut VOLUME BONGKAR KEMAS BATU AMPAR (TEUS) dan VOLUME MUAT PETI KEMAS BATU AMPAR (TEUS) yang dilayani fasilitas STS Crane dan dermaga terminal.',
    rumusFormulaMatematis:
      'Total Arus Peti Kemas Batu Ampar (TEUs) = VOLUME BONGKAR KEMAS BATU AMPAR (TEUS) + VOLUME MUAT PETI KEMAS BATU AMPAR (TEUS); Capaian (%) = (Total TEUs / Target Perkin [650.000 TEUs]) × 100%',
    targetResmi: '650.000 TEUs / Tahun',
    realisasiTerkini: '612.400 TEUs',
    tingkatCapaianPersen: 94.2,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Volume Bongkar Peti Kemas (Inbound)',
        simbol: 'Bongkar_TEUs',
        deskripsi: 'Arus kontainer impor dan domestik masuk yang diturunkan dari kapal',
        nilaiRiil: '318.200 TEUs',
        satuan: 'TEUs',
        satkerAsal: 'Dit. Pengelolaan Kepelabuhanan',
        nomorDataset: 'Dataset #23',
        halamanSatuData: 'Hal. 17',
        atributFisik: 'VOLUME BONGKAR KEMAS BATU AMPAR (TEUS)'
      },
      {
        namaVariabel: 'Volume Muat Peti Kemas (Outbound)',
        simbol: 'Muat_TEUs',
        deskripsi: 'Arus kontainer ekspor komoditas industri dan antar pulau dimuat ke kapal',
        nilaiRiil: '294.200 TEUs',
        satuan: 'TEUs',
        satkerAsal: 'Dit. Pengelolaan Kepelabuhanan',
        nomorDataset: 'Dataset #23',
        halamanSatuData: 'Hal. 17',
        atributFisik: 'VOLUME MUAT PETI KEMAS BATU AMPAR (TEUS)'
      },
      {
        namaVariabel: 'Kapasitas Penumpukan Dermaga (TOP m²)',
        simbol: 'TOP',
        deskripsi: 'Kapasitas container yard Dermaga Utara Batu Ampar (Dataset #4)',
        nilaiRiil: '120.000 m²',
        satuan: 'm²',
        satkerAsal: 'Dit. Pengelolaan Kepelabuhanan',
        nomorDataset: 'Dataset #4',
        halamanSatuData: 'Hal. 15',
        atributFisik: 'KAPASITAS (TOP M2)'
      }
    ],
    dasarRegulasi:
      'Peraturan Kepala BP Batam tentang Pengelolaan Jasa Kepelabuhanan di Pelabuhan Bebas Batam.',
    catatanTeknis:
      'Tercatat pada dokumen Satu Data Halaman 17 nomor baris 23 dengan sifat data Terbuka dan periode per-tahun.'
  },
  {
    id: 'kpi-izin-pengeluaran-barang',
    namaIndikator: 'Rekapitulasi Penerbitan Layanan Perizinan Pengeluaran Barang',
    namaSingkat: 'Penerbitan Izin Pengeluaran Barang',
    klasterId: 'sektor-logistik-aviasi',
    klasterNama: 'Konektivitas Logistik & Aviasi Bebas',
    satkerPengampuUtama: 'Direktorat Lalu Lintas Barang',
    kodeSatker: 'LLB',
    routeIdSatker: 'dit-lalu-lintas-barang',
    satkerTerkaitLain: [
      { nama: 'Seksi Industri & Seksi Perdagangan Dit. LLB', kode: 'LLB-SEKSI', routeId: 'dit-lalu-lintas-barang' }
    ],
    nomorDataset: 'Dataset #7: Rekapitulasi Penerbitan Layanan Perizinan Pengeluaran Barang',
    halamanBukuSatuData: 'Halaman 9, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'URAIAN IZIN PENGELUARAN BARANG',
      'JUMLAH PENERBITAN PER BULAN'
    ],
    jenisKarakteristikData: 'DATASET_TUNGGAL',
    penjelasanIntegrasi:
      'Data bersumber langsung dari Dataset #7 (Halaman 9 PDF Satu Data) Direktorat Lalu Lintas Barang. Mencatat seluruh volume penerbitan izin pengeluaran barang hasil olahan industri pabrik, re-ekspor, dan limbah/scrap dari KPBPB Batam ke luar daerah pabean.',
    rumusFormulaMatematis:
      'Total Penerbitan Izin Pengeluaran Tahunan = ∑ JUMLAH PENERBITAN PER BULAN (12 Bulan Siklus Kalender)',
    targetResmi: '1.800 Izin Terbit / Bulan (SLA Sesuai Standar)',
    realisasiTerkini: '1.842 Izin Terbit / Bulan (22.104 Kumulatif)',
    tingkatCapaianPersen: 102.3,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Uraian Izin Pengeluaran Barang',
        simbol: 'Uraian_Keluar',
        deskripsi: 'Nomenklatur izin pengeluaran barang industri dan komoditas',
        nilaiRiil: 'Izin Pengeluaran Produk Jadi Olahan & Scrap',
        satuan: 'Jenis Izin',
        satkerAsal: 'Dit. Lalu Lintas Barang',
        nomorDataset: 'Dataset #7',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'URAIAN IZIN PENGELUARAN BARANG'
      },
      {
        namaVariabel: 'Jumlah Penerbitan Bulanan',
        simbol: 'Jml_Keluar_Bulan',
        deskripsi: 'Volume dokumen izin pengeluaran yang disahkan per bulan',
        nilaiRiil: '1.842 Berkas / Bulan',
        satuan: 'Berkas',
        satkerAsal: 'Dit. Lalu Lintas Barang',
        nomorDataset: 'Dataset #7',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'JUMLAH PENERBITAN PER BULAN'
      }
    ],
    dasarRegulasi:
      'PP No. 41 Tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 9 nomor baris 7 dengan jenis Data Statistik, periode per-bulan, sifat data Terbuka.'
  },
  {
    id: 'kpi-izin-pemasukan-barang',
    namaIndikator: 'Rekapitulasi Penerbitan Layanan Perizinan Pemasukan Barang',
    namaSingkat: 'Penerbitan Izin Pemasukan Barang',
    klasterId: 'sektor-logistik-aviasi',
    klasterNama: 'Konektivitas Logistik & Aviasi Bebas',
    satkerPengampuUtama: 'Direktorat Lalu Lintas Barang',
    kodeSatker: 'LLB',
    routeIdSatker: 'dit-lalu-lintas-barang',
    satkerTerkaitLain: [
      { nama: 'Seksi Industri Dit. Lalu Lintas Barang', kode: 'LLB-IND', routeId: 'dit-lalu-lintas-barang' }
    ],
    nomorDataset: 'Dataset #6: Rekapitulasi Penerbitan Layanan Perizinan Pemasukan Barang',
    halamanBukuSatuData: 'Halaman 9, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'URAIAN IZIN PEMASUKAN BARANG',
      'JUMLAH PENERBITAN PER BULAN'
    ],
    jenisKarakteristikData: 'DATASET_TUNGGAL',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #6 (Halaman 9 PDF Satu Data) Direktorat Lalu Lintas Barang. Mencatat perizinan pemasukan bahan baku, barang modal, mesin, dan bahan penolong industri manufaktur ke dalam KPBPB Batam.',
    rumusFormulaMatematis:
      'Total Penerbitan Izin Pemasukan Tahunan = ∑ JUMLAH PENERBITAN PER BULAN',
    targetResmi: '2.400 Izin Terbit / Bulan',
    realisasiTerkini: '2.450 Izin Terbit / Bulan (29.400 Kumulatif)',
    tingkatCapaianPersen: 102.1,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Uraian Izin Pemasukan Barang',
        simbol: 'Uraian_Masuk',
        deskripsi: 'Nomenklatur izin pemasukan bahan baku dan barang modal',
        nilaiRiil: 'Izin Pemasukan Bahan Baku & Komponen Elektronik',
        satuan: 'Jenis Izin',
        satkerAsal: 'Dit. Lalu Lintas Barang',
        nomorDataset: 'Dataset #6',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'URAIAN IZIN PEMASUKAN BARANG'
      },
      {
        namaVariabel: 'Jumlah Penerbitan Bulanan',
        simbol: 'Jml_Masuk_Bulan',
        deskripsi: 'Volume dokumen izin pemasukan yang disahkan per bulan',
        nilaiRiil: '2.450 Berkas / Bulan',
        satuan: 'Berkas',
        satkerAsal: 'Dit. Lalu Lintas Barang',
        nomorDataset: 'Dataset #6',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'JUMLAH PENERBITAN PER BULAN'
      }
    ],
    dasarRegulasi:
      'Peraturan Kepala BP Batam tentang Tata Kelola Pemasukan Barang ke KPBPB Batam.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 9 nomor baris 6 dengan jenis Data Statistik, periode per-bulan, sifat data Terbuka.'
  },
  {
    id: 'kpi-pelayanan-llb-tepat-waktu',
    namaIndikator: 'Persentase Pelayanan Lalu Lintas Barang yang Selesai Tepat Waktu',
    namaSingkat: 'Ketepatan Waktu Layanan LLB',
    klasterId: 'sektor-logistik-aviasi',
    klasterNama: 'Konektivitas Logistik & Aviasi Bebas',
    satkerPengampuUtama: 'Direktorat Lalu Lintas Barang',
    kodeSatker: 'LLB',
    routeIdSatker: 'dit-lalu-lintas-barang',
    nomorDataset: 'Dataset #8 & #9: Persentase Pelayanan LLB Perdagangan & Industri yang Selesai Tepat Waktu',
    halamanBukuSatuData: 'Halaman 9, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'NO',
      'URAIAN IZIN',
      'PERSENTASE LAYANAN TEPAT WAKTU',
      'RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #8 & #9 (Halaman 9 PDF Satu Data) Direktorat Lalu Lintas Barang. Mengukur kepatuhan durasi layanan izin industri dan perdagangan terhadap standar jam pelayanan.',
    rumusFormulaMatematis:
      'Rerata Waktu = RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM); Persentase = PERSENTASE LAYANAN TEPAT WAKTU',
    targetResmi: 'Waktu Rerata ≤ 2,0 Jam (Kepatuhan ≥ 95,0%)',
    realisasiTerkini: '98,2% Tepat Waktu (Rerata 1,3 Jam)',
    tingkatCapaianPersen: 103.4,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Persentase Layanan Tepat Waktu',
        simbol: 'P_tepat',
        deskripsi: 'Persentase dokumen permohonan selesai sebelum batas toleransi',
        nilaiRiil: '98,2%',
        satuan: '%',
        satkerAsal: 'Dit. Lalu Lintas Barang',
        nomorDataset: 'Dataset #8 & #9',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'PERSENTASE LAYANAN TEPAT WAKTU'
      },
      {
        namaVariabel: 'Rata-Rata Waktu Penyelesaian',
        simbol: 'Waktu_Jam',
        deskripsi: 'Rerata jam kerja penyelesaian berkas perizinan lalu lintas barang',
        nilaiRiil: '1,3 Jam',
        satuan: 'Jam',
        satkerAsal: 'Dit. Lalu Lintas Barang',
        nomorDataset: 'Dataset #8 & #9',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'RATA-RATA WAKTU PENYELESAIAN DOKUMEN (DALAM JAM)'
      }
    ],
    dasarRegulasi:
      'Standar Operasional Prosedur (SOP) Pelayanan Direktorat Lalu Lintas Barang BP Batam.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 9 nomor baris 8 dan 9.'
  },

  // ==========================================================================
  // KLASTER 2: INVESTASI, KEK & KEMUDAHAN BERUSAHA (HAL. 9-11, 21-28, 46-48)
  // ==========================================================================
  {
    id: 'kpi-sla-perizinan-ptsp',
    namaIndikator: 'Data Penyelesaian Perizinan yang Tepat Waktu',
    namaSingkat: 'SLA Perizinan Berusaha PTSP',
    klasterId: 'sektor-investasi-kek',
    klasterNama: 'Investasi, KEK & Kemudahan Berusaha',
    satkerPengampuUtama: 'Pusat Pelayanan Terpadu Satu Pintu',
    kodeSatker: 'PTSP',
    routeIdSatker: 'ptsp',
    satkerTerkaitLain: [
      { nama: 'Data Permohonan Perizinan Berusaha (Dataset #9 Hal. 25)', kode: 'PTSP-IZIN', routeId: 'ptsp' }
    ],
    nomorDataset: 'Dataset #17: Data Penyelesaian Perizinan yang Tepat Waktu',
    halamanBukuSatuData: 'Halaman 28, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'BULAN',
      'TANGGAL IZIN',
      'TANGGAL REKAP AWAL',
      'TANGGAL REKAP AKHIR',
      'JENIS PERIZINAN',
      'NAMA PERIZINAN BERUSAHA',
      'PERMOHONAN STATUS MASUK',
      'PERMOHONAN STATUS PROSES',
      'PERMOHONAN STATUS SELESAI',
      'SERVICE LEVEL AGREEMENT (SLA)'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #17 (Halaman 28 PDF Satu Data) Pusat Pelayanan Terpadu Satu Pintu. Mengukur ketepatan penyelesaian izin terhadap standar Service Level Agreement (SLA) berdasarkan rasio PERMOHONAN STATUS SELESAI terhadap PERMOHONAN STATUS MASUK.',
    rumusFormulaMatematis:
      'Persentase Ketepatan Waktu (%) = (PERMOHONAN STATUS SELESAI Tepat Waktu / PERMOHONAN STATUS MASUK) × 100%; Durasi Rerata = SERVICE LEVEL AGREEMENT (SLA) [Hari]',
    targetResmi: 'SLA < 3,0 Hari Kerja (Ketepatan Waktu ≥ 85,0%)',
    realisasiTerkini: '1,8 Hari Kerja (88,6% Tepat Waktu)',
    tingkatCapaianPersen: 104.2,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Permohonan Status Selesai',
        simbol: 'Status_Selesai',
        deskripsi: 'Jumlah izin investasi yang disahkan sebelum batas toleransi SLA',
        nilaiRiil: '13.150 Berkas',
        satuan: 'Berkas',
        satkerAsal: 'PTSP BP Batam',
        nomorDataset: 'Dataset #17',
        halamanSatuData: 'Hal. 28',
        atributFisik: 'PERMOHONAN STATUS SELESAI'
      },
      {
        namaVariabel: 'Permohonan Status Masuk',
        simbol: 'Status_Masuk',
        deskripsi: 'Total seluruh permohonan izin lengkap yang masuk di portal perizinan',
        nilaiRiil: '14.850 Berkas',
        satuan: 'Berkas',
        satkerAsal: 'PTSP BP Batam',
        nomorDataset: 'Dataset #17',
        halamanSatuData: 'Hal. 28',
        atributFisik: 'PERMOHONAN STATUS MASUK'
      },
      {
        namaVariabel: 'Realisasi Service Level Agreement',
        simbol: 'SLA_Hari',
        deskripsi: 'Rata-rata hari kerja penyelesaian izin usaha',
        nilaiRiil: '1,8 Hari Kerja',
        satuan: 'Hari',
        satkerAsal: 'PTSP BP Batam',
        nomorDataset: 'Dataset #17',
        halamanSatuData: 'Hal. 28',
        atributFisik: 'SERVICE LEVEL AGREEMENT (SLA)'
      }
    ],
    dasarRegulasi:
      'Peraturan BP Batam No. 3 Tahun 2022 tentang Standar Pelayanan Perizinan Terpadu Satu Pintu di KPBPB Batam.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 28 nomor baris 17 dengan jenis Data Statistik, periode per-bulan, sifat data Terbuka.'
  },
  {
    id: 'kpi-realisasi-investasi-pma-pmdn',
    namaIndikator: 'Laporan Realisasi Investasi di KPBPB Batam & KEK',
    namaSingkat: 'Realisasi Investasi BP Batam',
    klasterId: 'sektor-investasi-kek',
    klasterNama: 'Investasi, KEK & Kemudahan Berusaha',
    satkerPengampuUtama: 'Direktorat Investasi',
    kodeSatker: 'INVESTASI',
    routeIdSatker: 'dit-investasi',
    satkerTerkaitLain: [
      { nama: 'Dit. Pengembangan KEK (Dataset #1 Hal. 9)', kode: 'KEK', routeId: 'dit-kek' },
      { nama: 'PTSP BP Batam (Dataset #8 Hal. 25)', kode: 'PTSP', routeId: 'ptsp' }
    ],
    nomorDataset: 'Dataset #13 (Hal. 48: Dit. Investasi) & Dataset #1 (Hal. 9: Dit. KEK)',
    halamanBukuSatuData: 'Halaman 48 (Dit. Investasi) & Halaman 9 (Dit. KEK), Buku Satu Data',
    daftarAtributResmi: [
      'TRIWULAN',
      'TAHUN',
      'LAPORAN REALISASI INVESTASI',
      'NAMA KAWASAN EKONOMI KHUSUS',
      'JENIS INVESTASI (PMA/PMDN)',
      'TARGET INVESTASI',
      'REALISASI INVESTASI'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #13 (Halaman 48) Direktorat Investasi dan Dataset #1 (Halaman 9) Direktorat KEK. Nilai akumulasi realisasi penanaman modal tetap dan lancar (PMA dan PMDN) diverifikasi berkala melalui LKPM.',
    rumusFormulaMatematis:
      'Total Realisasi Investasi (Rp Triliun) = REALISASI INVESTASI (PMA) + REALISASI INVESTASI (PMDN); Capaian (%) = (Total Realisasi / Target Perkin [Rp 70,0 Triliun]) × 100%',
    targetResmi: 'Rp 70,00 Triliun (Perkin TA 2026)',
    realisasiTerkini: 'Rp 54,68 Triliun',
    tingkatCapaianPersen: 78.1,
    statusKetercapaian: 'On Track',
    komponenVariabel: [
      {
        namaVariabel: 'Realisasi Penanaman Modal Asing (PMA)',
        simbol: 'PMA_Rp',
        deskripsi: 'Realisasi modal asing sektor manufaktur dan industri presisi',
        nilaiRiil: 'Rp 41,20 Triliun',
        satuan: 'Rp Triliun',
        satkerAsal: 'Dit. Investasi',
        nomorDataset: 'Dataset #13',
        halamanSatuData: 'Hal. 48',
        atributFisik: 'LAPORAN REALISASI INVESTASI'
      },
      {
        namaVariabel: 'Realisasi Penanaman Modal Dalam Negeri (PMDN)',
        simbol: 'PMDN_Rp',
        deskripsi: 'Realisasi modal domestik sektor properti, logistik dan jasa kawasan',
        nilaiRiil: 'Rp 13,48 Triliun',
        satuan: 'Rp Triliun',
        satkerAsal: 'Dit. Investasi',
        nomorDataset: 'Dataset #13',
        halamanSatuData: 'Hal. 48',
        atributFisik: 'LAPORAN REALISASI INVESTASI'
      },
      {
        namaVariabel: 'Realisasi Investasi Kawasan KEK',
        simbol: 'KEK_Rp',
        deskripsi: 'Realisasi investasi di 4 KEK (BAT, Nongsa Digital, Sekupang, Tanjung Sauh)',
        nilaiRiil: 'Rp 9,09 Triliun',
        satuan: 'Rp Triliun',
        satkerAsal: 'Dit. KEK',
        nomorDataset: 'Dataset #1',
        halamanSatuData: 'Hal. 9',
        atributFisik: 'REALISASI INVESTASI'
      }
    ],
    dasarRegulasi:
      'Perjanjian Kinerja Kepala BP Batam No. 1/SPJ/KA/1/2026 Indikator Kinerja Strategis (IKS) #1.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 48 baris 13 dan Halaman 9 baris 1.'
  },

  // ==========================================================================
  // KLASTER 3: KETAHANAN AIR BAKU, MEDIS & FASILITAS (HAL. 19-21, 28-38)
  // ==========================================================================
  {
    id: 'kpi-volume-tampungan-6-waduk',
    namaIndikator: 'Kapasitas Tampung Waduk & Rekapitulasi Volume Air Baku',
    namaSingkat: 'Air Baku 6 Waduk',
    klasterId: 'sektor-air-medis-lingkungan',
    klasterNama: 'Ketahanan Air Baku, Medis & Fasilitas Kawasan',
    satkerPengampuUtama: 'Badan Usaha SPAM, Fasilitas dan Lingkungan',
    kodeSatker: 'SPAM',
    routeIdSatker: 'deputi-pelayanan-umum',
    satkerTerkaitLain: [
      { nama: 'Kapasitas Produksi Instalasi IPA/WTP (Dataset #2 Hal. 28)', kode: 'WTP', routeId: 'deputi-pelayanan-umum' }
    ],
    nomorDataset: 'Dataset #37: Kapasitas Tampung Waduk & Dataset #35: Rekapitulasi Volume Air Baku',
    halamanBukuSatuData: 'Halaman 31, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'TAHUN',
      'KAPASITAS DAYA TAMPUNG',
      'LUAS PERMUKAAN',
      'VOLUME M3'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #37 (Kapasitas Tampung Waduk) dan Dataset #35 (Rekapitulasi Volume Air Baku) pada Halaman 31 PDF Satu Data. Mengukur tingkat keterisian volume riil 6 waduk terhadap KAPASITAS DAYA TAMPUNG desain.',
    rumusFormulaMatematis:
      'Persentase Ketahanan Tampungan (%) = (Total VOLUME M3 Tersimpan 6 Waduk / KAPASITAS DAYA TAMPUNG Desain [167,30 Juta m³]) × 100%',
    targetResmi: '167,30 Juta m³ (Kapasitas Normal ≥ 90,0%)',
    realisasiTerkini: '161,96 Juta m³ (96,8% Kapasitas)',
    tingkatCapaianPersen: 96.8,
    statusKetercapaian: 'Aman & Normal',
    komponenVariabel: [
      {
        namaVariabel: 'Volume Efektif Tersimpan Saat Ini',
        simbol: 'Vol_Riil',
        deskripsi: 'Total volume cadangan air baku riil pada 6 waduk',
        nilaiRiil: '161,96 Juta m³',
        satuan: 'm³',
        satkerAsal: 'BU SPAM BP Batam',
        nomorDataset: 'Dataset #35',
        halamanSatuData: 'Hal. 31',
        atributFisik: 'VOLUME M3'
      },
      {
        namaVariabel: 'Kapasitas Daya Tampung Maksimal',
        simbol: 'Kapasitas_Desain',
        deskripsi: 'Total kapasitas desain maksimal tampungan 6 waduk',
        nilaiRiil: '167,30 Juta m³',
        satuan: 'm³',
        satkerAsal: 'BU SPAM BP Batam',
        nomorDataset: 'Dataset #37',
        halamanSatuData: 'Hal. 31',
        atributFisik: 'KAPASITAS DAYA TAMPUNG'
      }
    ],
    dasarRegulasi:
      'Peraturan Kepala BP Batam tentang Penyelenggaraan Sistem Penyediaan Air Minum (SPAM).',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 31 nomor baris 35 dan 37.'
  },

  // ==========================================================================
  // KLASTER 4: TATA RUANG DARAT, PESISIR & PENGAMANAN ASET (HAL. 6-8, 17-19)
  // ==========================================================================
  {
    id: 'kpi-penertiban-aset-bangunan-liar',
    namaIndikator: 'Data Penertiban Bangunan Liar',
    namaSingkat: 'Penertiban Aset Ditpam',
    klasterId: 'sektor-lahan-aset-keamanan',
    klasterNama: 'Tata Ruang Darat, Pesisir & Pengamanan Aset',
    satkerPengampuUtama: 'Direktorat Pengamanan Aset dan Kawasan',
    kodeSatker: 'DITPAM',
    routeIdSatker: 'dit-pam-aset',
    satkerTerkaitLain: [
      { nama: 'Rekap Kegiatan Penertiban Rutin & Tim Terpadu (Dataset #9 Hal. 19)', kode: 'DITPAM-TERPADU', routeId: 'dit-pam-aset' }
    ],
    nomorDataset: 'Dataset #1: Data Penertiban Bangunan Liar & Dataset #9: Rekap Kegiatan Penertiban',
    halamanBukuSatuData: 'Halaman 17 & Halaman 19, Buku Dokumen Atribut Satu Data BP Batam',
    daftarAtributResmi: [
      'SEMESTER',
      'TAHUN',
      'NAMA PEMILIK',
      'JENIS BANGUNAN',
      'LOKASI',
      'JUMLAH',
      'HASIL',
      'KETERANGAN'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #1 (Halaman 17) dan Dataset #9 (Halaman 19) Direktorat Pengamanan Aset dan Kawasan. Mengukur efektivitas operasi penertiban bangunan liar dan pengamanan lahan HPL dari pendudukan tanpa izin.',
    rumusFormulaMatematis:
      'Persentase Penertiban (%) = (JUMLAH Lokasi Ditertibkan [874 Lokasi] / Total Target Lokasi Pelanggaran [1.030 Lokasi]) × 100%',
    targetResmi: '1.030 Lokasi Terdata (Target Penyelesaian ≥ 80,0%)',
    realisasiTerkini: '874 Lokasi Tertib (84,8% Selesai)',
    tingkatCapaianPersen: 84.8,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Jumlah Lokasi Berhasil Ditertibkan',
        simbol: 'L_tertib',
        deskripsi: 'Lokasi yang telah steril dari bangunan liar tanpa izin',
        nilaiRiil: '874 Lokasi',
        satuan: 'Lokasi',
        satkerAsal: 'Dit. Pengamanan Aset',
        nomorDataset: 'Dataset #9',
        halamanSatuData: 'Hal. 19',
        atributFisik: 'JUMLAH'
      },
      {
        namaVariabel: 'Hasil dan Keterangan Operasi',
        simbol: 'Hasil_Op',
        deskripsi: 'Catatan hasil penertiban lapangan dan pemulihan fungsi kawasan',
        nilaiRiil: '874 Lokasi Tertib & Kondusif',
        satuan: 'Keterangan',
        satkerAsal: 'Dit. Pengamanan Aset',
        nomorDataset: 'Dataset #9',
        halamanSatuData: 'Hal. 19',
        atributFisik: 'HASIL'
      }
    ],
    dasarRegulasi:
      'Peraturan Kepala BP Batam tentang Pengamanan Kawasan dan Aset Tetap Milik BP Batam.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 17 baris 1 dan Halaman 19 baris 9.'
  },
  {
    id: 'kpi-alokasi-lahan-7-swp',
    namaIndikator: 'Lahan yang Tersedia dengan Area Sub Wilayah Pengembangan',
    namaSingkat: 'Alokasi Lahan 7 SWP',
    klasterId: 'sektor-lahan-aset-keamanan',
    klasterNama: 'Tata Ruang Darat, Pesisir & Pengamanan Aset',
    satkerPengampuUtama: 'Direktorat Pengelolaan Lahan',
    kodeSatker: 'DPL',
    routeIdSatker: 'dit-lahan',
    nomorDataset: 'Dataset #15: Lahan yang Tersedia dengan Area Sub Wilayah Pengembangan',
    halamanBukuSatuData: 'Halaman 8, Buku Dokumen Atribut Daftar Data Satu Data BP Batam',
    daftarAtributResmi: [
      'SWP',
      'LUAS',
      'JUMLAH PERSIL'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #15 (Halaman 8 PDF Satu Data) Direktorat Pengelolaan Lahan. Mengukur luas hamparan tanah yang dialokasikan efektif untuk kegiatan berusaha dan investasi di 7 Sub-Wilayah Pengembangan.',
    rumusFormulaMatematis:
      'Capaian Alokasi Lahan (%) = (Total LUAS Teralokasi Efektif [Ha] / Target Rencana Perkin [200,00 Ha]) × 100%',
    targetResmi: '200,00 Hektar',
    realisasiTerkini: '248,50 Hektar',
    tingkatCapaianPersen: 124.3,
    statusKetercapaian: 'Melampaui Target',
    komponenVariabel: [
      {
        namaVariabel: 'Luas Lahan Teralokasi Efektif',
        simbol: 'Luas_Ha',
        deskripsi: 'Luas tanah yang disahkan dalam SKPT dan Perjanjian Lahan',
        nilaiRiil: '248,50 Ha',
        satuan: 'Hektar',
        satkerAsal: 'Dit. Pengelolaan Lahan',
        nomorDataset: 'Dataset #15',
        halamanSatuData: 'Hal. 8',
        atributFisik: 'LUAS'
      },
      {
        namaVariabel: 'Sub Wilayah Pengembangan',
        simbol: 'SWP_Area',
        deskripsi: 'Cakupan spasial 7 SWP di Pulau Batam',
        nilaiRiil: '7 SWP Aktif',
        satuan: 'Wilayah',
        satkerAsal: 'Dit. Pengelolaan Lahan',
        nomorDataset: 'Dataset #15',
        halamanSatuData: 'Hal. 8',
        atributFisik: 'SWP'
      }
    ],
    dasarRegulasi:
      'Perka BP Batam No. 28 Tahun 2021 tentang Penyelenggaraan Pengelolaan Pertanahan di KPBPB Batam.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 8 nomor baris 15.'
  },

  // ==========================================================================
  // KLASTER 5: INFRASTRUKTUR KONEKTIVITAS & DESAIN TEKNIS (HAL. 48-50, 51-53)
  // ==========================================================================
  {
    id: 'kpi-proyek-konstruksi-infrastruktur',
    namaIndikator: 'Laporan Progres Pekerjaan Konstruksi Tahun Berjalan',
    namaSingkat: 'Proyek Konstruksi Fisik Tahun Berjalan',
    klasterId: 'sektor-infrastruktur-teknis',
    klasterNama: 'Infrastruktur Konektivitas & Desain Teknis',
    satkerPengampuUtama: 'Direktorat Pembangunan Infrastruktur',
    kodeSatker: 'DPI',
    routeIdSatker: 'dit-pembangunan-infrastruktur',
    satkerTerkaitLain: [
      { nama: 'Jaringan Jalan Eksisting (Dataset #3 Hal. 49)', kode: 'JALAN', routeId: 'dit-pembangunan-infrastruktur' },
      { nama: 'Dit. Perencanaan Infrastruktur (DED Hal. 53)', kode: 'DED', routeId: 'dit-perencanaan-infrastruktur' }
    ],
    nomorDataset: 'Dataset #4: Laporan Progres Pekerjaan Konstruksi Tahun Berjalan',
    halamanBukuSatuData: 'Halaman 49 - 50, Buku Dokumen Atribut Satu Data BP Batam',
    daftarAtributResmi: [
      'KD_ANGG',
      'TGL_MUL',
      'TGL_SEL',
      'KTGR_PEK',
      'JNS_PEK',
      'KLAS_PEK',
      'NM_PPK',
      'NPAGU_F',
      'NHPS_S',
      'NKON_S',
      'SUPERVISI',
      'VOL_PEK',
      'PRGRS_PEK',
      'KENDALA',
      'SUBDIT'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #4 (Halaman 49) Direktorat Pembangunan Infrastruktur. Memantau progres kurva-S fisik (PRGRS_PEK) terhadap jadwal rencana pada seluruh kontrak konstruksi aktif.',
    rumusFormulaMatematis:
      'Rerata Progres Kurva S (%) = ∑ PRGRS_PEK Tiap Paket Konstruksi / Total Paket Pekerjaan Berjalan',
    targetResmi: 'Kurva S 92,4% (On Schedule)',
    realisasiTerkini: '14 Paket Aktif (92,4% Progres Fisik)',
    tingkatCapaianPersen: 92.4,
    statusKetercapaian: 'On Track',
    komponenVariabel: [
      {
        namaVariabel: 'Realisasi Progres Pekerjaan (PRGRS_PEK)',
        simbol: 'PRGRS_PEK',
        deskripsi: 'Persentase capaian fisik lapangan berdasarkan berita acara verifikasi konsultan supervisi',
        nilaiRiil: '92,4% Kurva-S',
        satuan: '%',
        satkerAsal: 'Dit. Pembangunan Infrastruktur',
        nomorDataset: 'Dataset #4',
        halamanSatuData: 'Hal. 50',
        atributFisik: 'PRGRS_PEK'
      },
      {
        namaVariabel: 'Nilai Kontrak Konstruksi (NKON_S)',
        simbol: 'NKON_S',
        deskripsi: 'Total nilai komitmen kontraktual paket konstruksi',
        nilaiRiil: 'Rp 682,43 Miliar',
        satuan: 'Rp Miliar',
        satkerAsal: 'Dit. Pembangunan Infrastruktur',
        nomorDataset: 'Dataset #4',
        halamanSatuData: 'Hal. 49',
        atributFisik: 'NKON_S'
      }
    ],
    dasarRegulasi:
      'Peraturan Kepala BP Batam tentang Tata Cara Pengadaan Jasa Konstruksi & Renstra Pembangunan Jalan.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 49 nomor baris 4.'
  },

  // ==========================================================================
  // KLASTER 6: TATA KELOLA, KEUANGAN, SDM & SPBE DIGITAL (HAL. 1-6, 38-43)
  // ==========================================================================
  {
    id: 'kpi-serapan-realisasi-belanja',
    namaIndikator: 'Persentase Realisasi Belanja dan Penerimaan BP Batam',
    namaSingkat: 'Serapan Realisasi Belanja',
    klasterId: 'sektor-tata-kelola-institusi',
    klasterNama: 'Tata Kelola, Keuangan, SDM & SPBE Digital',
    satkerPengampuUtama: 'Biro Keuangan',
    kodeSatker: 'BK',
    routeIdSatker: 'biro-keuangan',
    satkerTerkaitLain: [
      { nama: 'Laporan Realisasi Anggaran BLU (Dataset #3 Hal. 3)', kode: 'BK-LRA', routeId: 'biro-keuangan' }
    ],
    nomorDataset: 'Dataset #1 (Hal. 2) & Dataset #3 (Hal. 3): Laporan Realisasi Anggaran BLU',
    halamanBukuSatuData: 'Halaman 2 & Halaman 3, Buku Dokumen Atribut Satu Data BP Batam',
    daftarAtributResmi: [
      'TAHUN',
      'TRIWULAN',
      '% YTD CAPAIAN BELANJA',
      '% YTD CAPAIAN PENERIMAAN',
      'JENIS ANGGARAN',
      'KATEGORI',
      'URAIAN',
      'ANGGARAN',
      'REALISASI',
      'PERSENTASE'
    ],
    jenisKarakteristikData: 'FORMULA_PERSENTASE',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #1 (Halaman 2) dan Dataset #3 (Halaman 3) Biro Keuangan. Mengukur penyerapan kas anggaran DIPA BP Batam melalui persentase capaian % YTD CAPAIAN BELANJA dan perbandingan REALISASI terhadap ANGGARAN.',
    rumusFormulaMatematis:
      '% YTD CAPAIAN BELANJA = (Total REALISASI Belanja Kas / Total ANGGARAN Pagu DIPA) × 100%',
    targetResmi: 'Target Perkin: 75,0%',
    realisasiTerkini: '77,6% (Rp 1,96 Triliun / Pagu Rp 2,53 Triliun)',
    tingkatCapaianPersen: 103.5,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Realisasi Kas Belanja DIPA',
        simbol: 'Realisasi_Rp',
        deskripsi: 'Total penerbitan Surat Perintah Pencairan Dana (SP2D)',
        nilaiRiil: 'Rp 1,96 Triliun',
        satuan: 'Rp Triliun',
        satkerAsal: 'Biro Keuangan',
        nomorDataset: 'Dataset #3',
        halamanSatuData: 'Hal. 3',
        atributFisik: 'REALISASI'
      },
      {
        namaVariabel: 'Pagu Anggaran DIPA Definitif',
        simbol: 'Anggaran_Rp',
        deskripsi: 'Alokasi pagu belanja dalam DIPA APBN/BLU BP Batam',
        nilaiRiil: 'Rp 2,53 Triliun',
        satuan: 'Rp Triliun',
        satkerAsal: 'Biro Keuangan',
        nomorDataset: 'Dataset #3',
        halamanSatuData: 'Hal. 3',
        atributFisik: 'ANGGARAN'
      }
    ],
    dasarRegulasi:
      'PMK No. 129/PMK.05/2020 tentang Pedoman Pengelolaan Keuangan Badan Layanan Umum.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 2 baris 1 dan Halaman 3 baris 3.'
  },
  {
    id: 'kpi-kemandirian-finansial-blu',
    namaIndikator: 'Laporan Saldo Bank Real Time & Kemandirian Finansial BLU',
    namaSingkat: 'Kemandirian Finansial BLU',
    klasterId: 'sektor-tata-kelola-institusi',
    klasterNama: 'Tata Kelola, Keuangan, SDM & SPBE Digital',
    satkerPengampuUtama: 'Biro Keuangan',
    kodeSatker: 'BK',
    routeIdSatker: 'biro-keuangan',
    nomorDataset: 'Dataset #13 (Hal. 4: Saldo Bank Real Time) & Dataset #1 (Hal. 2: Capaian Penerimaan)',
    halamanBukuSatuData: 'Halaman 4 & Halaman 2, Buku Dokumen Atribut Satu Data BP Batam',
    daftarAtributResmi: [
      'NAMA BANK',
      'UNIT',
      'KATEGORI UNIT',
      'NOMOR REKENING',
      'KEGUNAAN REKENING',
      'KATEGORI REKENING',
      'TANGGAL REKAP',
      'NILAI',
      '% YTD CAPAIAN PENERIMAAN',
      '% YTD CAPAIAN BELANJA'
    ],
    jenisKarakteristikData: 'FORMULA_RASIO',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #13 (Halaman 4) dan Dataset #1 (Halaman 2) Biro Keuangan. Mengukur rasio kemandirian dari perbandingan penerimaan pendapatan terhadap pengeluaran operasional serta mencatat saldo kas penampung likuid pada rekening bank mitra.',
    rumusFormulaMatematis:
      'Rasio Kemandirian Finansial BLU = Total Penerimaan Pendapatan PNBP Operasional / Total Belanja Operasional; Saldo Kas Likuid = ∑ NILAI Rekening Saldo Bank Real Time',
    targetResmi: 'Rasio Mandiri ≥ 0,90 (Kas Likuid Terjaga)',
    realisasiTerkini: 'Rasio 0,96 (Kas BLU: Rp 1,42 Triliun)',
    tingkatCapaianPersen: 106.7,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Saldo Bank Rekening Penampung BLU',
        simbol: 'Saldo_Kas',
        deskripsi: 'Saldo kas pada rekening bank mitra persepsi BP Batam',
        nilaiRiil: 'Rp 1,42 Triliun',
        satuan: 'Rp Triliun',
        satkerAsal: 'Biro Keuangan',
        nomorDataset: 'Dataset #13',
        halamanSatuData: 'Hal. 4',
        atributFisik: 'NILAI'
      },
      {
        namaVariabel: 'Nama Bank & Nomor Rekening',
        simbol: 'Bank_Rek',
        deskripsi: 'Rekening bank operasional penampung penerimaan BLU',
        nilaiRiil: 'Bank Persepsi Terdaftar BP Batam',
        satuan: 'Rekening',
        satkerAsal: 'Biro Keuangan',
        nomorDataset: 'Dataset #13',
        halamanSatuData: 'Hal. 4',
        atributFisik: 'NAMA BANK'
      }
    ],
    dasarRegulasi:
      'PP No. 23 Tahun 2005 juncto PP No. 74 Tahun 2012 tentang Pengelolaan Keuangan BLU.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 4 baris 13 dan Halaman 2 baris 1.'
  },
  {
    id: 'kpi-akuntabilitas-sakip-wtp',
    namaIndikator: 'Nilai SAKIP & Data Opini Badan Pemeriksa Keuangan (BPK) Tahunan',
    namaSingkat: 'Akuntabilitas SAKIP & Opini BPK WTP',
    klasterId: 'sektor-tata-kelola-institusi',
    klasterNama: 'Tata Kelola, Keuangan, SDM & SPBE Digital',
    satkerPengampuUtama: 'Biro Organisasi, Kepatuhan dan Manajemen Risiko (BOKMR)',
    kodeSatker: 'BOKMR',
    routeIdSatker: 'biro-organisasi',
    satkerTerkaitLain: [
      { nama: 'Biro Keuangan (Opini BPK Dataset #27 Hal. 6)', kode: 'BK', routeId: 'biro-keuangan' }
    ],
    nomorDataset: 'Dataset #2 (Hal. 38: Nilai SAKIP) & Dataset #27 (Hal. 6: Data Opini BPK)',
    halamanBukuSatuData: 'Halaman 38 (BOKMR) & Halaman 6 (Biro Keuangan), Buku Satu Data',
    daftarAtributResmi: [
      'TAHUN',
      'KOMPONEN YANG DINILAI',
      'BOBOT',
      'NILAI',
      'TINGKAT AKUNTABILITAS KINERJA',
      'TAHUN ANGGARAN DAN OPINI'
    ],
    jenisKarakteristikData: 'KOMPOSIT_INDEKS',
    penjelasanIntegrasi:
      'Data bersumber dari Dataset #2 (Halaman 38) Biro OKMR dan Dataset #27 (Halaman 6) Biro Keuangan. Menggabungkan hasil evaluasi akuntabilitas kinerja SAKIP dengan opini profesional BPK RI atas Laporan Keuangan.',
    rumusFormulaMatematis:
      'Skor Akhir SAKIP = ∑ (BOBOT Komponen × NILAI Hasil Evaluasi); Status Laporan Keuangan = TAHUN ANGGARAN DAN OPINI [WTP]',
    targetResmi: 'Predikat A (Skor ≥ 80,00) & Opini WTP',
    realisasiTerkini: 'Skor 82,68 (Predikat A Memuaskan) & WTP 8x Berturut-turut',
    tingkatCapaianPersen: 103.35,
    statusKetercapaian: 'Tercapai',
    komponenVariabel: [
      {
        namaVariabel: 'Nilai Evaluasi SAKIP KemenPAN-RB',
        simbol: 'Nilai_SAKIP',
        deskripsi: 'Hasil penilaian Sistem Akuntabilitas Kinerja Instansi Pemerintah',
        nilaiRiil: '82,68 (Predikat A)',
        satuan: 'Skor',
        satkerAsal: 'Biro OKMR',
        nomorDataset: 'Dataset #2',
        halamanSatuData: 'Hal. 38',
        atributFisik: 'NILAI'
      },
      {
        namaVariabel: 'Tahun Anggaran dan Opini BPK',
        simbol: 'Opini_LapKeu',
        deskripsi: 'Opini Badan Pemeriksa Keuangan atas Laporan Keuangan BP Batam',
        nilaiRiil: 'Wajar Tanpa Pengecualian (WTP)',
        satuan: 'Opini',
        satkerAsal: 'Biro Keuangan & BPK RI',
        nomorDataset: 'Dataset #27',
        halamanSatuData: 'Hal. 6',
        atributFisik: 'TAHUN ANGGARAN DAN OPINI'
      }
    ],
    dasarRegulasi:
      'PermenPAN-RB No. 88 Tahun 2021 tentang Evaluasi Akuntabilitas Kinerja & UU No. 15 Tahun 2004.',
    catatanTeknis:
      'Tercatat pada Dokumen Satu Data Halaman 38 baris 2 dan Halaman 6 baris 27.'
  }
];

// Helper to look up an indicator by id or search query/keyword
export const findKamusSatuDataItem = (keywordOrId: string): IndikatorSatuDataFormula | undefined => {
  const norm = keywordOrId.toLowerCase().trim();
  // 1. Direct ID match
  const byId = KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id.toLowerCase() === norm);
  if (byId) return byId;

  // 2. Exact or substring match in name
  const byName = KAMUS_SATU_DATA_FORMULA_LIST.find(
    (k) =>
      k.namaIndikator.toLowerCase().includes(norm) ||
      k.namaSingkat.toLowerCase().includes(norm) ||
      norm.includes(k.namaSingkat.toLowerCase()) ||
      norm.includes(k.namaIndikator.toLowerCase())
  );
  if (byName) return byName;

  // 3. Keyword matching (all strictly mapped to real datasets in Satu Data PDF)
  if (norm.includes('peti kemas') || norm.includes('batu ampar') || norm.includes('sts')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-arus-peti-kemas-batu-ampar');
  }
  if (norm.includes('pengeluaran barang') || norm.includes('ekspor') || norm.includes('ldp')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-izin-pengeluaran-barang');
  }
  if (norm.includes('pemasukan barang') || norm.includes('impor')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-izin-pemasukan-barang');
  }
  if (norm.includes('tepat waktu') && (norm.includes('llb') || norm.includes('barang'))) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-pelayanan-llb-tepat-waktu');
  }
  if (norm.includes('sla') || norm.includes('ptsp') || norm.includes('izin berusaha')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-sla-perizinan-ptsp');
  }
  if (norm.includes('investasi') || norm.includes('pma') || norm.includes('pmdn') || norm.includes('kek')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-realisasi-investasi-pma-pmdn');
  }
  if (norm.includes('waduk') || norm.includes('air') || norm.includes('tampungan') || norm.includes('wtp')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-volume-tampungan-6-waduk');
  }
  if (norm.includes('penertiban') || norm.includes('bangunan liar') || norm.includes('ditpam')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-penertiban-aset-bangunan-liar');
  }
  if (norm.includes('lahan') || norm.includes('swp') || norm.includes('uwt')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-alokasi-lahan-7-swp');
  }
  if (norm.includes('serapan') || norm.includes('belanja') || norm.includes('pagu')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-serapan-realisasi-belanja');
  }
  if (norm.includes('kemandirian') || norm.includes('blu') || norm.includes('kas blu') || norm.includes('saldo bank')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-kemandirian-finansial-blu');
  }
  if (norm.includes('konstruksi') || norm.includes('fisik') || norm.includes('pekerjaan konstruksi') || norm.includes('jalan arteri')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-proyek-konstruksi-infrastruktur');
  }
  if (norm.includes('sakip') || norm.includes('wtp') || norm.includes('opini bpk')) {
    return KAMUS_SATU_DATA_FORMULA_LIST.find((k) => k.id === 'kpi-akuntabilitas-sakip-wtp');
  }

  return KAMUS_SATU_DATA_FORMULA_LIST[0];
};
