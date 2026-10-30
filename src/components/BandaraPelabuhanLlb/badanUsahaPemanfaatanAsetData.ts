// ============================================================================
// DATASET ATRIBUT DOKUMEN DIREKTORAT PENGAMANAN ASET DAN KAWASAN
// UNIT: BADAN USAHA PEMANFAATAN ASET - BP BATAM
// Disimpan dalam satu objek JSON terpadu agar mudah diganti dengan data API/asli.
// ============================================================================

export interface PemanfaatanAsetJson {
  penertibanBangunanLiar: {
    bangunanDitertibkanPerSemester: {
      semester: string;
      rumahTinggal: number;
      kiosWarung: number;
      gudangBengkel: number;
      posBagan: number;
      total: number;
    }[];
    lokasiBangunanLiar: {
      id: number;
      tahun: string;
      semester: string;
      lokasi: string;
      namaPemilik: string;
      jenisBangunan: string;
      jumlah: number;
    }[];
    rekapRutinDanTimTerpadu: {
      semester: string;
      rutin: number;
      timTerpadu: number;
    }[];
    objekPenertiban: {
      kategori: string;
      jumlah: number;
      color: string;
    }[];
    hasilPenertibanLokasi: {
      id: number;
      tanggal: string;
      lokasi: string;
      objekPenertiban: string;
      jumlah: string;
      hasil: string;
      keterangan: string;
      inisiator: string;
      tahun: string;
    }[];
  };
  penggarapDanNelayanLiar: {
    penghuniMenurutLokasiCara: {
      lokasi: string;
      membeli: number;
      mewarisi: number;
      membukaSendiri: number;
      menyewa: number;
      total: number;
    }[];
    lamaMenempatiLahan: {
      kelompokLama: string;
      jumlah: number;
      persentase: number;
    }[];
    luasLahanPerLokasi: {
      lokasi: string;
      totalLuasM2: number;
      jenisBangunanDominan: string;
      rumahPanggung: number;
      baganIkan: number;
      kolamTambak: number;
      gudangAlat: number;
    }[];
  };
  penindakanDanPengamananAset: {
    luasKawasanDitindakPerSemester: {
      semester: string;
      penghentianKegiatanIlegal: number;
      pembongkaranPatokLiar: number;
      pemasanganPapanPlang: number;
      pengamananBatasKawasan: number;
      totalLuas: number;
    }[];
    tabelPenindakanKawasan: {
      id: number;
      tanggal: string;
      nama: string;
      jenisKegiatan: string;
      luasM2: number;
      keterangan: string;
    }[];
    kegiatanPengamananPerSubdit: {
      subdit: string;
      patroliRutin: number;
      pengamananBatas: number;
      penindakanPelanggaran: number;
      operasiPenertiban: number;
      tooltipInfo: {
        lokasi: string;
        personil: string;
        hasilKegiatan: string;
      };
    }[];
  };
  proteksiKebakaranBangunanAset: {
    alatProteksiPerJenisBangunan: {
      jenisBangunan: string;
      aparPowder: number;
      aparCo2: number;
      hydrant: number;
      fireAlarmSmoke: number;
      sprinkler: number;
      totalAlat: number;
    }[];
    tabelPengecekanProteksi: {
      id: number;
      lokasi: string;
      rekomendasi: string;
      tanggalMulai: string;
      tanggalAkhir: string;
      status: string;
    }[];
  };
}

export const PEMANFAATAN_ASET_DATA: PemanfaatanAsetJson = {
  // =========================================================================
  // A. PENERTIBAN BANGUNAN LIAR
  // =========================================================================
  penertibanBangunanLiar: {
    // 1. Bangunan liar yang ditertibkan per semester (Stacked Column)
    bangunanDitertibkanPerSemester: [
      { semester: '2024-S1', rumahTinggal: 142, kiosWarung: 88, gudangBengkel: 34, posBagan: 26, total: 290 },
      { semester: '2024-S2', rumahTinggal: 165, kiosWarung: 95, gudangBengkel: 42, posBagan: 31, total: 333 },
      { semester: '2025-S1', rumahTinggal: 184, kiosWarung: 110, gudangBengkel: 38, posBagan: 29, total: 361 },
      { semester: '2025-S2', rumahTinggal: 156, kiosWarung: 104, gudangBengkel: 46, posBagan: 35, total: 341 },
      { semester: '2026-S1', rumahTinggal: 98, kiosWarung: 64, gudangBengkel: 22, posBagan: 18, total: 202 },
    ],

    // 2. Lokasi dengan bangunan liar terbanyak (10 Teratas Horizontal Bar + Tabel Detail)
    lokasiBangunanLiar: [
      { id: 1, tahun: '2026', semester: 'S1', lokasi: 'Tanjung Uncang (Buffer Zone Industri)', namaPemilik: 'H. Syamsudin / Komp. Liar', jenisBangunan: 'Rumah Tinggal & Kios', jumlah: 48 },
      { id: 2, tahun: '2026', semester: 'S1', lokasi: 'Batu Ampar (ROW Jalan & Dermaga)', namaPemilik: 'Sdr. Hendra dkk', jenisBangunan: 'Kios & Bengkel Las', jumlah: 42 },
      { id: 3, tahun: '2025', semester: 'S2', lokasi: 'Sei Beduk (Hutan Lindung Duriangkang)', namaPemilik: 'Kelompok Penggarap Aset', jenisBangunan: 'Rumah Semi Permanen', jumlah: 39 },
      { id: 4, tahun: '2025', semester: 'S2', lokasi: 'Batam Centre (Jalur Hijau Simpang Kara)', namaPemilik: 'Paguyuban Pedagang Liar', jenisBangunan: 'Kios Warung & Tenda', jumlah: 35 },
      { id: 5, tahun: '2025', semester: 'S1', lokasi: 'Nongsa (Kawasan Pesisir Sambau)', namaPemilik: 'Bpk. Herman / Nelayan Lepas', jenisBangunan: 'Pos Bagan & Pondok', jumlah: 32 },
      { id: 6, tahun: '2025', semester: 'S1', lokasi: 'Sagulung (ROW Pipa Transmisi SPAM)', namaPemilik: 'Sdr. Marzuki dkk', jenisBangunan: 'Rumah Tinggal Liar', jumlah: 29 },
      { id: 7, tahun: '2024', semester: 'S2', lokasi: 'Sekupang (Zona Catchment Sei Ladi)', namaPemilik: 'Kelompok Kebun Liar', jenisBangunan: 'Gudang Kayu & Pondok', jumlah: 27 },
      { id: 8, tahun: '2024', semester: 'S2', lokasi: 'Bengkong Sadai (Lahan Cadangan Industri)', namaPemilik: 'Ibu Ratna & Bpk. Joko', jenisBangunan: 'Rumah Papan & Kios', jumlah: 25 },
      { id: 9, tahun: '2024', semester: 'S1', lokasi: 'Kabil (Penyangga Kawasan Industri Terpadu)', namaPemilik: 'Sdr. Mulyadi dkk', jenisBangunan: 'Bengkel & Gudang Rongsok', jumlah: 23 },
      { id: 10, tahun: '2024', semester: 'S1', lokasi: 'Batu Aji (Depan RSUD Embung Fatimah)', namaPemilik: 'Pedagang Kaki Lima Liar', jenisBangunan: 'Kios PKL & Lapak Kayu', jumlah: 21 },
    ],

    // 3. Penertiban rutin dan tim terpadu per semester (Clustered Column)
    rekapRutinDanTimTerpadu: [
      { semester: '2024-S1', rutin: 64, timTerpadu: 18 },
      { semester: '2024-S2', rutin: 72, timTerpadu: 24 },
      { semester: '2025-S1', rutin: 85, timTerpadu: 28 },
      { semester: '2025-S2', rutin: 79, timTerpadu: 22 },
      { semester: '2026-S1', rutin: 48, timTerpadu: 14 },
    ],

    // 4. Objek penertiban (Donut Chart)
    objekPenertiban: [
      { kategori: 'Bangunan Liar & Kavling Ilegal', jumlah: 580, color: '#1E40AF' },
      { kategori: 'Kios & Lapak PKL Tanpa Izin', jumlah: 410, color: '#2563EB' },
      { kategori: 'Reklame & Spanduk Liar', jumlah: 260, color: '#3B82F6' },
      { kategori: 'Pagar & Tenda Pembatas Liar', jumlah: 175, color: '#60A5FA' },
      { kategori: 'Gudang & Bengkel Rongsok', jumlah: 142, color: '#93C5FD' },
    ],

    // 5. Hasil penertiban per lokasi (Tabel dengan filter Inisiator dan Tahun)
    hasilPenertibanLokasi: [
      {
        id: 1,
        tanggal: '18 Apr 2026',
        lokasi: 'Tanjung Uncang (ROW Buffer Zone Industri)',
        objekPenertiban: '24 Unit Kios & Bengkel Liar',
        jumlah: '24 Bangunan',
        hasil: 'Dibongkar Tim Terpadu',
        keterangan: 'Lahan aset BP Batam disterilkan dan dipasang kawat berduri & plang kepemilikan.',
        inisiator: 'Tim Terpadu Pemko-BP',
        tahun: '2026',
      },
      {
        id: 2,
        tanggal: '12 Mar 2026',
        lokasi: 'Sei Ladi (Kawasan DTA Waduk Sei Ladi)',
        objekPenertiban: '12 Unit Pondok Kebun Liar',
        jumlah: '12 Bangunan',
        hasil: 'Bongkar Mandiri Warga',
        keterangan: 'Warga mematuhi SP-3 dan membongkar mandiri dengan pengawalan Ditpam.',
        inisiator: 'Ditpam BP Batam',
        tahun: '2026',
      },
      {
        id: 3,
        tanggal: '24 Feb 2026',
        lokasi: 'Batu Ampar (Jalur Pipa & ROW Jalan)',
        objekPenertiban: '18 Kios Kayu & PKL Semi Permanen',
        jumlah: '18 Bangunan',
        hasil: 'Ditertibkan Patroli Rutin',
        keterangan: 'Material dipindahkan ke gudang penyimpanan barang bukti Ditpam Sekupang.',
        inisiator: 'Patroli Rutin',
        tahun: '2026',
      },
      {
        id: 4,
        tanggal: '15 Des 2025',
        lokasi: 'Hutan Lindung Duriangkang (Sub-DAS Muka Kuning)',
        objekPenertiban: '16 Bangunan Rumah Papan Penggarap',
        jumlah: '16 Bangunan',
        hasil: 'Dibongkar Tim Terpadu',
        keterangan: 'Penertiban terpadu bersama TNI/Polri dan Kehutanan, pemulihan fungsi resapan air.',
        inisiator: 'Tim Terpadu Pemko-BP',
        tahun: '2025',
      },
      {
        id: 5,
        tanggal: '08 Nov 2025',
        lokasi: 'Batam Centre (Jalur Hijau Simpang Kara)',
        objekPenertiban: '28 Lapak Warung Tenda Liar',
        jumlah: '28 Bangunan',
        hasil: 'Ditertibkan Patroli Rutin',
        keterangan: 'Penataan kembali trotoar dan taman kota aset BP Batam.',
        inisiator: 'Ditpam BP Batam',
        tahun: '2025',
      },
      {
        id: 6,
        tanggal: '20 Okt 2025',
        lokasi: 'Nongsa (Kawasan Pesisir Teluk Mata Ikan)',
        objekPenertiban: '14 Pos Bagan & Pondok Ikan Liar',
        jumlah: '14 Bangunan',
        hasil: 'Bongkar Mandiri Warga',
        keterangan: 'Kesepakatan pemindahan alat tangkap ke dermaga nelayan berizin BP Batam.',
        inisiator: 'Laporan Masyarakat',
        tahun: '2025',
      },
      {
        id: 7,
        tanggal: '14 Agu 2025',
        lokasi: 'Sagulung (ROW Pipa Transmisi Air Bersih)',
        objekPenertiban: '19 Bangunan Liar di Atas Pipa',
        jumlah: '19 Bangunan',
        hasil: 'Dibongkar Tim Terpadu',
        keterangan: 'Pencegahan risiko kebocoran pipa transmisi utama SPAM BP Batam.',
        inisiator: 'Tim Terpadu Pemko-BP',
        tahun: '2025',
      },
      {
        id: 8,
        tanggal: '19 Mei 2025',
        lokasi: 'Kabil (Penyangga Kawasan Industri Terpadu)',
        objekPenertiban: '15 Gudang Penampungan Rongsok',
        jumlah: '15 Bangunan',
        hasil: 'Penyegelan & Pembongkaran',
        keterangan: 'Aktivitas membahayakan jalur utilitas tegangan tinggi; disegel dan dibersihkan.',
        inisiator: 'Ditpam BP Batam',
        tahun: '2025',
      },
      {
        id: 9,
        tanggal: '11 Nov 2024',
        lokasi: 'Bengkong Sadai (Lahan Cadangan Industri)',
        objekPenertiban: '22 Unit Rumah Semi Permanen',
        jumlah: '22 Bangunan',
        hasil: 'Dibongkar Tim Terpadu',
        keterangan: 'Lahan dialokasikan untuk pemanfaatan investasi industri elektronika berizin.',
        inisiator: 'Tim Terpadu Pemko-BP',
        tahun: '2024',
      },
      {
        id: 10,
        tanggal: '16 Jul 2024',
        lokasi: 'Batu Aji (Depan RSUD Embung Fatimah)',
        objekPenertiban: '21 Kios PKL Liar & Parkir Ilegal',
        jumlah: '21 Bangunan',
        hasil: 'Ditertibkan Patroli Rutin',
        keterangan: 'Kelancaran akses ambulans dan sterilisasi trotoar pejalan kaki.',
        inisiator: 'Patroli Rutin',
        tahun: '2024',
      },
    ],
  },

  // =========================================================================
  // B. PENGGARAP DAN NELAYAN LIAR
  // =========================================================================
  penggarapDanNelayanLiar: {
    // 6. Penghuni menurut lokasi dan cara mendapatkan lahan (Stacked Bar Horizontal)
    penghuniMenurutLokasiCara: [
      { lokasi: 'Tanjung Piayu Laut', membeli: 84, mewarisi: 52, membukaSendiri: 68, menyewa: 26, total: 230 },
      { lokasi: 'Batu Besar Pesisir', membeli: 72, mewarisi: 48, membukaSendiri: 54, menyewa: 18, total: 192 },
      { lokasi: 'Teluk Lengung', membeli: 58, mewarisi: 44, membukaSendiri: 46, menyewa: 14, total: 162 },
      { lokasi: 'Bengkong Sadai Pesisir', membeli: 65, mewarisi: 28, membukaSendiri: 38, menyewa: 22, total: 153 },
      { lokasi: 'Sei Ladi Catchment', membeli: 36, mewarisi: 18, membukaSendiri: 58, menyewa: 8, total: 120 },
      { lokasi: 'Tiban Kerapu', membeli: 42, mewarisi: 24, membukaSendiri: 32, menyewa: 12, total: 110 },
    ],

    // 7. Lama menempati lahan (Histogram / Column: <5, 5-10, 11-20, >20 tahun)
    lamaMenempatiLahan: [
      { kelompokLama: '< 5 Tahun', jumlah: 178, persentase: 18.4 },
      { kelompokLama: '5 - 10 Tahun', jumlah: 385, persentase: 39.8 },
      { kelompokLama: '11 - 20 Tahun', jumlah: 284, persentase: 29.4 },
      { kelompokLama: '> 20 Tahun', jumlah: 120, persentase: 12.4 },
    ],

    // 8. Luas lahan yang dikuasai per lokasi (Bar Horizontal, Diurutkan Terbesar, Aksen Warna Tertinggi)
    luasLahanPerLokasi: [
      {
        lokasi: 'Tanjung Piayu Laut',
        totalLuasM2: 54200,
        jenisBangunanDominan: 'Rumah Panggung & Bagan Ikan',
        rumahPanggung: 24500,
        baganIkan: 18200,
        kolamTambak: 7500,
        gudangAlat: 4000,
      },
      {
        lokasi: 'Batu Besar Pesisir',
        totalLuasM2: 41800,
        jenisBangunanDominan: 'Rumah Panggung & Tambak',
        rumahPanggung: 19200,
        baganIkan: 11400,
        kolamTambak: 8200,
        gudangAlat: 3000,
      },
      {
        lokasi: 'Teluk Lengung Pesisir',
        totalLuasM2: 36500,
        jenisBangunanDominan: 'Bagan Ikan & Rumah Panggung',
        rumahPanggung: 16400,
        baganIkan: 13200,
        kolamTambak: 4500,
        gudangAlat: 2400,
      },
      {
        lokasi: 'Bengkong Sadai Pesisir',
        totalLuasM2: 28900,
        jenisBangunanDominan: 'Rumah Papan & Kolam',
        rumahPanggung: 14500,
        baganIkan: 6200,
        kolamTambak: 5800,
        gudangAlat: 2400,
      },
      {
        lokasi: 'Sei Ladi Catchment',
        totalLuasM2: 24100,
        jenisBangunanDominan: 'Pondok Kebun & Rumah Semi',
        rumahPanggung: 11200,
        baganIkan: 2100,
        kolamTambak: 7800,
        gudangAlat: 3000,
      },
      {
        lokasi: 'Tiban Kerapu',
        totalLuasM2: 18600,
        jenisBangunanDominan: 'Pondok Nelayan Lepas',
        rumahPanggung: 9400,
        baganIkan: 5200,
        kolamTambak: 2500,
        gudangAlat: 1500,
      },
    ],
  },

  // =========================================================================
  // C. PENINDAKAN DAN PENGAMANAN ASET
  // =========================================================================
  penindakanDanPengamananAset: {
    // 9. Luas kawasan aset yang ditindak per semester (Stacked Column + Tabel)
    luasKawasanDitindakPerSemester: [
      {
        semester: '2024-S1',
        penghentianKegiatanIlegal: 28400,
        pembongkaranPatokLiar: 19200,
        pemasanganPapanPlang: 34500,
        pengamananBatasKawasan: 24000,
        totalLuas: 106100,
      },
      {
        semester: '2024-S2',
        penghentianKegiatanIlegal: 32100,
        pembongkaranPatokLiar: 22800,
        pemasanganPapanPlang: 38200,
        pengamananBatasKawasan: 27500,
        totalLuas: 120600,
      },
      {
        semester: '2025-S1',
        penghentianKegiatanIlegal: 36800,
        pembongkaranPatokLiar: 26400,
        pemasanganPapanPlang: 42100,
        pengamananBatasKawasan: 31200,
        totalLuas: 136500,
      },
      {
        semester: '2025-S2',
        penghentianKegiatanIlegal: 34200,
        pembongkaranPatokLiar: 24100,
        pemasanganPapanPlang: 39500,
        pengamananBatasKawasan: 29800,
        totalLuas: 127600,
      },
      {
        semester: '2026-S1',
        penghentianKegiatanIlegal: 21500,
        pembongkaranPatokLiar: 14800,
        pemasanganPapanPlang: 25600,
        pengamananBatasKawasan: 18400,
        totalLuas: 80300,
      },
    ],

    // Tabel di bawah grafik #9
    tabelPenindakanKawasan: [
      {
        id: 1,
        tanggal: '14 Apr 2026',
        nama: 'Kawasan Buffer Industri Nongsa Digital Park',
        jenisKegiatan: 'Penghentian Pematangan Lahan Ilegal',
        luasM2: 14200,
        keterangan: 'Excavator liar disita, kegiatan cut and fill tanpa izin dihentikan seketika.',
      },
      {
        id: 2,
        tanggal: '26 Mar 2026',
        nama: 'Aset Lahan Cadangan Pelabuhan Kabil',
        jenisKegiatan: 'Pembongkaran Patok & Pagar Liar',
        luasM2: 9800,
        keterangan: 'Pencabutan 64 patok beton ilegal yang dipasang oknum klaim adat.',
      },
      {
        id: 3,
        tanggal: '10 Feb 2026',
        nama: 'Zona Penyangga Waduk Duriangkang',
        jenisKegiatan: 'Pemasangan Papan Plang Aset BP Batam',
        luasM2: 25600,
        keterangan: 'Pemasangan 8 unit plang peringatan larangan mendirikan bangunan dan merusak DAS.',
      },
      {
        id: 4,
        tanggal: '18 Nov 2025',
        nama: 'Kawasan Bandara Hang Nadim Outer Fence',
        jenisKegiatan: 'Pengamanan Batas Kawasan & Pagar',
        luasM2: 18400,
        keterangan: 'Perbaikan pagar perimeter bandara dan sterilisasi akses masuk tak berizin.',
      },
      {
        id: 5,
        tanggal: '05 Sep 2025',
        nama: 'Lahan Komersial Batam Centre Simpang Jam',
        jenisKegiatan: 'Penghentian Aktivitas Usaha Ilegal',
        luasM2: 12300,
        keterangan: 'Penyegelan aktivitas pencucian mobil dan lapak tambal ban liar.',
      },
    ],

    // 10. Kegiatan pengamanan aset per subdit (Stacked Bar Horizontal + Tooltip Lengkap)
    kegiatanPengamananPerSubdit: [
      {
        subdit: 'Subdit Pengamanan Aset & Objek Vital',
        patroliRutin: 148,
        pengamananBatas: 62,
        penindakanPelanggaran: 44,
        operasiPenertiban: 26,
        tooltipInfo: {
          lokasi: 'Kantor BP Batam, RSBP, Waduk, Pelabuhan & Bandara',
          personil: '124 Personil BKO & Ditpam',
          hasilKegiatan: '280 Kegiatan Pengamanan; Zero Sabotase & Obvit Aman',
        },
      },
      {
        subdit: 'Subdit Pengamanan Lingkungan & Hutan',
        patroliRutin: 112,
        pengamananBatas: 78,
        penindakanPelanggaran: 38,
        operasiPenertiban: 19,
        tooltipInfo: {
          lokasi: 'Hutan Lindung Duriangkang, Sei Harapan, Tiban & Mukakuning',
          personil: '86 Personil Polisi Kehutanan & Ditpam',
          hasilKegiatan: '247 Kegiatan; 18 Titik Perambahan Hutan Dihentikan',
        },
      },
      {
        subdit: 'Subdit Penertiban & Operasi Kawasan',
        patroliRutin: 96,
        pengamananBatas: 54,
        penindakanPelanggaran: 58,
        operasiPenertiban: 32,
        tooltipInfo: {
          lokasi: 'ROW Jalan Protokol, Kavling Siap Bangun & Buffer Zone',
          personil: '98 Personil Terpadu Tim Gabungan',
          hasilKegiatan: '240 Kegiatan; 134 Bangunan Liar Berhasil Ditertibkan',
        },
      },
    ],
  },

  // =========================================================================
  // D. PROTEKSI KEBAKARAN BANGUNAN ASET
  // =========================================================================
  proteksiKebakaranBangunanAset: {
    // 11. Jumlah alat proteksi kebakaran per jenis bangunan (Stacked Column + Tabel)
    alatProteksiPerJenisBangunan: [
      {
        jenisBangunan: 'Gedung Kantor BP Batam',
        aparPowder: 164,
        aparCo2: 82,
        hydrant: 36,
        fireAlarmSmoke: 142,
        sprinkler: 220,
        totalAlat: 644,
      },
      {
        jenisBangunan: 'Rusunawa & Hunian Aset',
        aparPowder: 210,
        aparCo2: 45,
        hydrant: 48,
        fireAlarmSmoke: 180,
        sprinkler: 160,
        totalAlat: 643,
      },
      {
        jenisBangunan: 'Gedung RSBP Batam',
        aparPowder: 185,
        aparCo2: 110,
        hydrant: 42,
        fireAlarmSmoke: 240,
        sprinkler: 380,
        totalAlat: 957,
      },
      {
        jenisBangunan: 'Gudang & Logistik Aset',
        aparPowder: 135,
        aparCo2: 38,
        hydrant: 28,
        fireAlarmSmoke: 64,
        sprinkler: 95,
        totalAlat: 360,
      },
      {
        jenisBangunan: 'Terminal Bandara & Feri',
        aparPowder: 195,
        aparCo2: 92,
        hydrant: 52,
        fireAlarmSmoke: 210,
        sprinkler: 340,
        totalAlat: 889,
      },
    ],

    // Tabel di bawah grafik #11
    tabelPengecekanProteksi: [
      {
        id: 1,
        lokasi: 'Gedung Utama Kantor BP Batam (Lantai 1 - 8)',
        rekomendasi: 'Uji Tekan Hydrant & Refill 24 Tabung APAR Kadaluwarsa',
        tanggalMulai: '05 Jan 2026',
        tanggalAkhir: '19 Jan 2026',
        status: 'Selesai 100% (Laik Operasi)',
      },
      {
        id: 2,
        lokasi: 'Rusunawa Muka Kuning Blok A - D',
        rekomendasi: 'Penggantian Nozzle Hydrant Pillar & Penambahan APAR Powder',
        tanggalMulai: '02 Feb 2026',
        tanggalAkhir: '16 Feb 2026',
        status: 'Selesai 100% (Laik Operasi)',
      },
      {
        id: 3,
        lokasi: 'Gedung Medik Sentral RSBP Sekupang',
        rekomendasi: 'Kalibrasi Smoke Detector Ruang Operasi & ICU',
        tanggalMulai: '10 Feb 2026',
        tanggalAkhir: '24 Feb 2026',
        status: 'Selesai 100% (Laik Operasi)',
      },
      {
        id: 4,
        lokasi: 'Terminal Domestik Feri Sekupang',
        rekomendasi: 'Perbaikan Pompa Jockey Fire Hydrant & Simulasi Evakuasi',
        tanggalMulai: '03 Mar 2026',
        tanggalAkhir: '17 Mar 2026',
        status: 'Selesai 100% (Laik Operasi)',
      },
      {
        id: 5,
        lokasi: 'Gudang Logistik BMN Sekupang',
        rekomendasi: 'Pemasangan Box Hydrant Baru Sisi Timur & Inspeksi APAR CO2',
        tanggalMulai: '15 Mar 2026',
        tanggalAkhir: '29 Mar 2026',
        status: 'Selesai 100% (Laik Operasi)',
      },
    ],
  },
};
