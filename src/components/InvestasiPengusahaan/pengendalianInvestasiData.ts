// ============================================================================
// DATASET DUMMY RESMI: DIREKTORAT PENGENDALIAN INVESTASI
// BADAN PENGUSAHAAN BATAM (BP BATAM) - DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN (DEP-A4)
// Seluruh dataset dummy terstruktur rapi dalam satu objek JSON terpadu
// ============================================================================

export interface RekomendasiItem {
  id: string;
  tanggal: string; // YYYY-MM-DD
  tanggalDisplay: string; // DD MMM YYYY
  bulan: string; // 'Jan', 'Feb', dst.
  bulanIndex: number;
  tahun: number;
  judul: string;
  rekomendasi: string;
  rekomendasiSingkat: string;
  objekKerjasama: string;
  mitra: string;
  kategori: 'Operasional' | 'Kepatuhan Hukum' | 'Bagi Hasil' | 'Infrastruktur' | 'Layanan';
  status: 'Tuntas' | 'Dalam Proses' | 'Monitoring';
}

export interface RekomendasiBulananItem {
  bulan: string;
  bulanNama?: string;
  bulanIndex: number;
  tahun: number;
  jumlahRekomendasi: number;
  items: {
    judul: string;
    rekomendasi: string;
    mitra: string;
  }[];
}

export interface LaporanPengawasanItem {
  id: string;
  bulan: string;
  bulanNama?: string;
  bulanIndex: number;
  tahun: number;
  jumlahLaporan: number;
  laporanList: {
    nomorDokumen: string;
    judulLaporan: string;
    objekPengawasan: string;
    tanggalTerbit: string;
  }[];
}

export interface TrenRekomendasiTahunanItem {
  tahun: number;
  jumlahRekomendasi: number;
  jumlahTahunLalu: number;
  perubahanCount: number;
  perubahanPersen: number;
  isPositive: boolean; // Positif jika naik
  fokusEvaluasi: string;
}

export interface PengendalianInvestasiDatabase {
  unitInfo: {
    namaUnit: string;
    kodeDeputi: string;
    deputi: string;
    instansi: string;
    versiData: string;
    tahunAnggaran: number;
  };
  rekomendasiBulanan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: RekomendasiBulananItem[];
  };
  laporanPengawasanBulanan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: LaporanPengawasanItem[];
  };
  trenRekomendasiTahunan: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: TrenRekomendasiTahunanItem[];
  };
  daftarRekomendasiTerbaru: {
    metadata: {
      namaDataset: string;
      sifatData: 'Tertutup';
      periodeUpdate: string;
    };
    records: RekomendasiItem[];
  };
}

export const PENGENDALIAN_INVESTASI_DATA: PengendalianInvestasiDatabase = {
  unitInfo: {
    namaUnit: 'Direktorat Pengendalian Investasi',
    kodeDeputi: 'DEP-A4',
    deputi: 'Deputi Bidang Investasi dan Pengusahaan',
    instansi: 'Badan Pengusahaan Batam (BP Batam)',
    versiData: 'Katalog Satu Data BP Batam 2025/2026',
    tahunAnggaran: 2026,
  },

  // --------------------------------------------------------------------------
  // KARTU 1: REKOMENDASI EVALUASI DAN PENGENDALIAN PER BULAN
  // Dataset: Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan Badan Usaha (Tertutup)
  // --------------------------------------------------------------------------
  rekomendasiBulanan: {
    metadata: {
      namaDataset: 'Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan Badan Usaha',
      sifatData: 'Tertutup',
      periodeUpdate: 'Pertahun / Perbulan',
    },
    records: [
      // Data Tahun 2026
      {
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Pembagian Royalti dan Tarif Sandar Dermaga Logistik Kabil',
            rekomendasi: 'Penyesuaian formulasi bagi hasil laba kotor 12% dan audit volume kargo cair curah.',
            mitra: 'PT Citra Kabil Port',
          },
          {
            judul: 'Pengendalian Standar Keselamatan Crane Pelabuhan Batu Ampar',
            rekomendasi: 'Wajibkan sertifikasi berkala alat STS crane dan penataan jalur trailer peti kemas.',
            mitra: 'PT Batam Terminal Peti Kemas',
          },
          {
            judul: 'Verifikasi Kewajiban Investasi Minimum Tenant KEK Nongsa',
            rekomendasi: 'Pemberian batas waktu 60 hari penyampaian bukti realisasi capex server pusat data.',
            mitra: 'PT Taman Resor Internet',
          },
          {
            judul: 'Monev Kepatuhan Pembayaran Sewa Lahan Workshop Galangan Tanjung Uncang',
            rekomendasi: 'Penerbitan surat tagihan kedua dan penertiban tapal batas lokasi sewa galangan kapal.',
            mitra: 'PT Graha Marine Indah',
          },
        ],
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2026,
        jumlahRekomendasi: 5,
        items: [
          {
            judul: 'Evaluasi Kelaikan Hanggar MRO Pesawat Bandara Hang Nadim',
            rekomendasi: 'Perluasan apron khusus taxiway B dan perbaikan drainase run-off runway bandara.',
            mitra: 'PT Batam Aero Technic',
          },
          {
            judul: 'Audit PKS Pemanfaatan Terminal Feri Internasional Batam Centre',
            rekomendasi: 'Modernisasi sistem autogate tiket terpadu dan penambahan eskalator keberangkatan.',
            mitra: 'PT Sinergi Feri Batam',
          },
          {
            judul: 'Pengendalian Limbah Industri Pengerukan Alur Laut Sagulung',
            rekomendasi: 'Kewajiban penyiapan silt curtain perairan untuk memitigasi sedimentasi pesisir.',
            mitra: 'PT Mitra Maritim Pasifik',
          },
          {
            judul: 'Evaluasi KSO Pengelolaan Rumah Susun Pekerja Batamindo',
            rekomendasi: 'Optimalisasi fasilitas pemadam kebakaran hidran rusun blok C dan D.',
            mitra: 'PT Batamindo Investment Corp',
          },
          {
            judul: 'Monev Pemenuhan TKDN Komponen Perakitan Solar Cell Kabil',
            rekomendasi: 'Asistensi verifikasi sertifikat TKDN material inverter dan modul fotovoltaik.',
            mitra: 'PT Solar Panel Batam',
          },
        ],
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Pengendalian Pasokan Listrik Gardu Induk Data Center Rempang',
            rekomendasi: 'Penyediaan redundant feeder line jalur ganda 150 kV guna menjamin uptime 99,99%.',
            mitra: 'PT Batam Power Lestari',
          },
          {
            judul: 'Audit Finansial Kemitraan Pengelolaan SPAM Hulu Duriangkang',
            rekomendasi: 'Klarifikasi biaya operasional desalinasi air baku dan rasio kebocoran pipa utama.',
            mitra: 'PT Air Bersih Nusantara',
          },
          {
            judul: 'Evaluasi Pemanfaatan Fasilitas Cold Storage Pelabuhan Sekupang',
            rekomendasi: 'Penyediaan cadangan genset 500 kVA untuk mencegah pembusukan komoditas perikanan ekspor.',
            mitra: 'PT Samudera Bahari Sentosa',
          },
          {
            judul: 'Monev Pelaksanaan Masterlist Impor Mesin CNC Kawasan Tunas',
            rekomendasi: 'Verifikasi fisik kesesuaian serial number mesin injection presisi pabrik elektronik.',
            mitra: 'PT Precision Component Batam',
          },
        ],
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        jumlahRekomendasi: 5,
        items: [
          {
            judul: 'Evaluasi Perjanjian KSP Pembangunan Hotel & Mall Harbour Bay',
            rekomendasi: 'Penyelesaian denda keterlambatan termin 2 dan pemutakhiran sertifikat laik fungsi gedung.',
            mitra: 'PT Citra Harbour Promosindo',
          },
          {
            judul: 'Pengawasan Amandemen PKS Terminal Kargo Udara Hang Nadim',
            rekomendasi: 'Harmonisasi klausul masa konsesi pengelolaan terminal kargo internasional 25 tahun.',
            mitra: 'PT Bandara Internasional Batam',
          },
          {
            judul: 'Monev Integrasi Data Pelaporan LKPM Melalui IBOSS System',
            rekomendasi: 'Klinik pendampingan teknis pelaporan bagi 120 tenant baru kawasan industri.',
            mitra: 'Asosiasi Pengusaha Batam',
          },
          {
            judul: 'Rekomendasi Penertiban Pemanfaatan Sempadan Waduk Muka Kuning',
            rekomendasi: 'Pembongkaran bangunan non-izin di buffer zone waduk untuk menjaga resapan air bersih.',
            mitra: 'Tim Gabungan Pengendalian',
          },
          {
            judul: 'Evaluasi Bagi Hasil Pemanfaatan Dermaga Floating Crane Sekupang',
            rekomendasi: 'Penerbitan surat keputusan Direktur terkait skema bagi hasil laba kotor 8,5%.',
            mitra: 'PT Maritim Trans Samudera',
          },
        ],
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Pengendalian Tingkat Hunian Kawasan Industri Terpadu Rempang',
            rekomendasi: 'Percepatan pembukaan akses jalan inspeksi lingkar kawasan industri solar glass.',
            mitra: 'PT Makmur Elok Graha',
          },
          {
            judul: 'Audit Kelaikan Lingkungan Pengolahan Limbah B3 Kabil',
            rekomendasi: 'Penambahan kolam netralisasi pH air limbah industri kimia sebelum dibuang ke laut.',
            mitra: 'PT Pengelola Limbah Batam',
          },
          {
            judul: 'Evaluasi Kemitraan Penyediaan Jaringan Fiber Optik Dark Fiber',
            rekomendasi: 'Penetapan tarif batas atas sewa saluran kabel bawah laut Batam-Singapura.',
            mitra: 'PT Batam Link Telekomunikasi',
          },
          {
            judul: 'Rekomendasi Akselerasi Izin PBG Fasilitas Manufaktur Medis Sekupang',
            rekomendasi: 'Koordinasi lintas kedeputian untuk penerbitan izin persetujuan bangunan gedung 7 hari kerja.',
            mitra: 'PT Medika Biomedikal Batam',
          },
        ],
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Pengawasan Kontrak KSO Pengoperasian Parkir Bandara Hang Nadim',
            rekomendasi: 'Pemberlakuan sistem pembayaran cashless terintegrasi QRIS dan kartu multi-bank.',
            mitra: 'PT Secure Parking Batam',
          },
          {
            judul: 'Evaluasi Implementasi Tax Holiday KEK Batam Aero Technic',
            rekomendasi: 'Verifikasi pemenuhan kualifikasi industri pionir pemeliharaan turbin pesawat jet.',
            mitra: 'PT Batam Aero Technic',
          },
          {
            judul: 'Monev Pemanfaatan Lahan Reklamasi Kawasan Ocarina Batam Centre',
            rekomendasi: 'Penertiban pemanfaatan ruang sesuai peruntukan pariwisata bahari terpadu.',
            mitra: 'PT Ocarina Bahari Megah',
          },
          {
            judul: 'Audit Keselamatan Kerja Proyek Perluasan Dermaga Curah Kabil',
            rekomendasi: 'Penerapan standar zero accident dan pengadaan alat pelindung diri bersertifikasi SNI.',
            mitra: 'PT Kabil Citranusa',
          },
        ],
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Kepatuhan Perjanjian BOT Gedung Komersial Nagoya',
            rekomendasi: 'Percepatan serah terima aset sesuai jadwal berakhirnya masa perjanjian bangun-guna-serah.',
            mitra: 'PT Nagoya City Development',
          },
          {
            judul: 'Pengendalian Kecepatan Bongkar Muat Peti Kemas Terminal Batu Ampar',
            rekomendasi: 'Peningkatan box crane per hour (BCH) dari 18 box menjadi minimal 24 box per jam.',
            mitra: 'PT Batam Terminal Peti Kemas',
          },
          {
            judul: 'Rekomendasi Penyelesaian Sengketa Lahan Kawasan Industri Batu Ampar',
            rekomendasi: 'Mediasi kesepakatan batas patok tanah antara BP Batam dengan pemilik hak guna bangunan.',
            mitra: 'PT Riau Industri Mas',
          },
          {
            judul: 'Monev Kualitas Layanan Air Bersih Kawasan Industri Tunas 1 & 2',
            rekomendasi: 'Pemasangan flowmeter digital pada pipa distribusi utama untuk audit debit air riil.',
            mitra: 'PT Air Batam Hilir',
          },
        ],
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Perjanjian Kerjasama Pengelolaan Fasilitas Olahraga Temenggung',
            rekomendasi: 'Audit transparansi penerimaan sewa venue olahraga dan pemeliharaan rumput stadion.',
            mitra: 'PT Sarana Olahraga Batam',
          },
          {
            judul: 'Pengawasan Kepatuhan Lingkungan Pengolahan Pasir Silika Rempang',
            rekomendasi: 'Kewajiban reklamasi pasca tambang dan revegetasi tanaman penutup tanah kritis.',
            mitra: 'PT Riau Silika Utama',
          },
          {
            judul: 'Rekomendasi Peremajaan Armada Transportasi Shuttle Bus Kawasan Bandara',
            rekomendasi: 'Pergantian armada minibus berbahan bakar fosil menjadi electric bus ramah lingkungan.',
            mitra: 'PT Transportasi Bandara Prima',
          },
          {
            judul: 'Monev Standarisasi Tarif Masuk Terminal Peti Kemas Domestik',
            rekomendasi: 'Sosialisasi penyeragaman tarif storage penumpukan kontainer empty kepada asosiasi logistik.',
            mitra: 'ALFI/ILFA Batam',
          },
        ],
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Kepatuhan Laporan Pajak dan Dividen Konsorsium Bandara',
            rekomendasi: 'Penyampaian laporan keuangan tahunan audited BPKP selambatnya akhir triwulan III.',
            mitra: 'PT Bandara Internasional Batam',
          },
          {
            judul: 'Pengendalian Alokasi Lahan Gudang Logistik E-Commerce Nongsa',
            rekomendasi: 'Optimalisasi luas koefisien dasar bangunan (KDB) guna efisiensi tata ruang kawasan.',
            mitra: 'PT Logistik Digital Batam',
          },
          {
            judul: 'Rekomendasi Penertiban Pemasangan Reklame Komersial Jalur Bandara',
            rekomendasi: 'Pembongkaran 8 tiang baliho liar yang mengganggu ruang bebas pandang pengemudi.',
            mitra: 'Biro Sarana & Prasarana',
          },
          {
            judul: 'Monev Progres Konstruksi Pembangkit Gas Engine 100 MW Panbil',
            rekomendasi: 'Penambahan jam kerja shift malam untuk mengejar deviasi minus progres kurva S 3,2%.',
            mitra: 'PT Energi Listrik Panbil',
          },
        ],
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Perjanjian Kerjasama Pemanfaatan Dermaga Minyak Sambu',
            rekomendasi: 'Perpanjangan addendum kontrak bunkering bahan bakar kapal niaga internasional.',
            mitra: 'PT Pertamina Trans Kontinental',
          },
          {
            judul: 'Audit Pemeliharaan Pompa Intake Waduk Tembesi',
            rekomendasi: 'Penggantian 2 unit impeller pompa submersible berkapasitas 300 liter per detik.',
            mitra: 'PT Fasilitas Lingkungan Batam',
          },
          {
            judul: 'Pengendalian Kepadatan Truk Kontainer Simpang Sei Ladi',
            rekomendasi: 'Pemberlakuan jam operasional truk pengangkut kontainer di luar jam sibuk pagi dan sore.',
            mitra: 'Ditlantas & Dinas Perhubungan',
          },
          {
            judul: 'Rekomendasi Penyesuaian Nilai Jaminan Pelaksanaan Kontrak KSO',
            rekomendasi: 'Wajibkan pembaruan bank garansi senilai 5% nilai investasi sebelum tutup tahun buku.',
            mitra: 'PT Multi Mitra Konsorsium',
          },
        ],
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2026,
        jumlahRekomendasi: 3,
        items: [
          {
            judul: 'Evaluasi Kinerja Pengelolaan Fasilitas Sanitasi Kawasan Industri Cammo',
            rekomendasi: 'Perbaikan instalasi pipa air limbah domestik dan uji laboratorium baku mutu air buangan.',
            mitra: 'PT Cammo Industrial Estate',
          },
          {
            judul: 'Monev Serah Terima Aset Bangunan Terminal Feri Telaga Punggur',
            rekomendasi: 'Inventarisasi fisik peralatan x-ray scanner dan timbangan kargo pelabuhan penyeberangan.',
            mitra: 'PT ASDP Indonesia Ferry',
          },
          {
            judul: 'Rekomendasi Penetapan Sanksi Peringatan Pertama Keterlambatan Realisasi Investasi',
            rekomendasi: 'Pemberian SP-1 kepada 4 badan usaha yang belum memulai pematangan lahan lebih dari 180 hari.',
            mitra: 'Direktorat Pengendalian Lahan',
          },
        ],
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2026,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Rekapitulasi Tahunan Penyelesaian Rekomendasi Kerjasama Badan Usaha 2026',
            rekomendasi: 'Finalisasi berita acara penyelesaian 45 dari 48 butir rekomendasi evaluasi tahun berjalan.',
            mitra: 'Seluruh Mitra Kerja Sama',
          },
          {
            judul: 'Evaluasi Proyeksi Bagi Hasil PNBP Badan Usaha Tahun Anggaran 2027',
            rekomendasi: 'Penyusunan target penerimaan jasa kepelabuhanan dan kebandarudaraan naik 8,5% di 2027.',
            mitra: 'Biro Keuangan BP Batam',
          },
          {
            judul: 'Rekomendasi Pembaruan Standard Operating Procedure (SOP) Pengawasan Kerjasama',
            rekomendasi: 'Penerbitan Keputusan Kepala BP Batam tentang integrasi audit berkala dan digital warning.',
            mitra: 'Bagian Hukum & Kepatuhan',
          },
          {
            judul: 'Monev Kepatuhan Asuransi All-Risk Fasilitas Gedung Kemitraan',
            rekomendasi: 'Verifikasi polis asuransi risiko kebakaran dan bencana alam seluruh gedung konsesi.',
            mitra: 'Konsorsium Asuransi BUMN',
          },
        ],
      },
      // Data Tahun 2025 (untuk pembanding filter tahun)
      {
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2025,
        jumlahRekomendasi: 3,
        items: [
          {
            judul: 'Evaluasi Awal KSO Container Crane Pelabuhan Batu Ampar 2025',
            rekomendasi: 'Penetapan target ketersediaan alat minimum 95% selama jam sibuk sandar kapal.',
            mitra: 'PT Batam Terminal Peti Kemas',
          },
          {
            judul: 'Monev PKS Sewa Terminal Kargo Hang Nadim 2025',
            rekomendasi: 'Pemasangan timbangan elektronik bersertifikasi metrologi legal.',
            mitra: 'PT Bandara Internasional Batam',
          },
          {
            judul: 'Penertiban Retribusi Fasilitas Parkir Kawasan Komersial Nagoya',
            rekomendasi: 'Pemberian batas waktu migrasi menuju sistem karcis digital.',
            mitra: 'PT Secure Parking Batam',
          },
        ],
      },
      {
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2025,
        jumlahRekomendasi: 3,
        items: [
          {
            judul: 'Evaluasi Kemitraan Air Bersih Industri Kabil',
            rekomendasi: 'Pemutakhiran perjanjian suplai air curah minimal 120 liter per detik.',
            mitra: 'PT Air Bersih Nusantara',
          },
          {
            judul: 'Pengendalian Reklamasi Kawasan Ocarina 2025',
            rekomendasi: 'Penyesuaian batas patok izin PKKPRL pesisir timur.',
            mitra: 'PT Ocarina Bahari Megah',
          },
          {
            judul: 'Audit Standar Keselamatan Kerja Galangan Tanjung Uncang',
            rekomendasi: 'Kewajiban pelaporan inspeksi berkala tali kawat sling crane.',
            mitra: 'PT Graha Marine Indah',
          },
        ],
      },
      {
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Royalti Pengelolaan Gas Industri Panbil',
            rekomendasi: 'Penetapan tarif dasar gas pipa industri bersama regulator energi.',
            mitra: 'PT Energi Listrik Panbil',
          },
          {
            judul: 'Monev Pelaksanaan Masterlist Mesin Pabrik Semikonduktor Batamindo',
            rekomendasi: 'Penyampaian realisasi pemasangan mesin sesuai kuota bebas bea.',
            mitra: 'PT Precision Component Batam',
          },
          {
            judul: 'Audit Kesesuaian Tata Ruang KEK Batam Aero Technic',
            rekomendasi: 'Penetapan batas zona steril run-up engine pengujian pesawat udara.',
            mitra: 'PT Batam Aero Technic',
          },
          {
            judul: 'Pengawasan Kontrak Pengelolaan Rusun Kabil',
            rekomendasi: 'Perbaikan berkala fasilitas tangki air atap rusun pekerja.',
            mitra: 'PT Batamindo Investment Corp',
          },
        ],
      },
      {
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi KSP Kawasan Terpadu Harbour Bay',
            rekomendasi: 'Percepatan renovasi jalur pedestrian dermaga internasional.',
            mitra: 'PT Citra Harbour Promosindo',
          },
          {
            judul: 'Audit Pembayaran Sewa Lahan Pelabuhan Sekupang',
            rekomendasi: 'Penyelesaian tunggakan sewa pergudangan eks-bunkering.',
            mitra: 'PT Samudera Bahari Sentosa',
          },
          {
            judul: 'Pengendalian Limbah Lumpur Pengerukan Alur Pelayaran',
            rekomendasi: 'Pembuangan dumping silt hanya pada koordinat laut lepas resmi.',
            mitra: 'PT Mitra Maritim Pasifik',
          },
          {
            judul: 'Monev Pelaporan Investasi Melalui IBOSS Semester I 2025',
            rekomendasi: 'Penyuluhan berkala bagi 80 pelaku usaha kawasan bebas.',
            mitra: 'Asosiasi Pengusaha Batam',
          },
        ],
      },
      {
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2025,
        jumlahRekomendasi: 3,
        items: [
          {
            judul: 'Pengawasan Perjanjian Sewa Pipa Gas Bawah Laut Kabil',
            rekomendasi: 'Uji hidrostatik berkala pipa transmisi gas alam industri.',
            mitra: 'PT Batam Power Lestari',
          },
          {
            judul: 'Evaluasi Fasilitas Bongkar Muat Curah Kabil Port',
            rekomendasi: 'Penambahan dust collector pada conveyor curah kering pupuk.',
            mitra: 'PT Citra Kabil Port',
          },
          {
            judul: 'Audit Kepatuhan Asuransi Gedung Konsesi BP Batam',
            rekomendasi: 'Pembaruan polis jaminan asuransi aset negara.',
            mitra: 'Konsorsium Asuransi BUMN',
          },
        ],
      },
      {
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Paruh Waktu KSO Bandara Internasional Batam',
            rekomendasi: 'Penyusunan mitigasi lonjakan penumpang mudik Idul Fitri.',
            mitra: 'PT Bandara Internasional Batam',
          },
          {
            judul: 'Monev Kepatuhan Pembayaran Dividen Interim 2025',
            rekomendasi: 'Penyetoran bagi hasil keuntungan operasional tepat waktu.',
            mitra: 'PT Batam Terminal Peti Kemas',
          },
          {
            judul: 'Pengendalian Tingkat Kebisingan Pabrik Fabrikasi Galangan',
            rekomendasi: 'Pemasangan peredam suara pada bengkel sandblasting kapal.',
            mitra: 'PT Graha Marine Indah',
          },
          {
            judul: 'Audit Pengelolaan Air Limbah Domestik Rusun Batamindo',
            rekomendasi: 'Pembersihan sedimentasi grease trap kantin rusun pekerja.',
            mitra: 'PT Batamindo Investment Corp',
          },
        ],
      },
      {
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2025,
        jumlahRekomendasi: 3,
        items: [
          {
            judul: 'Evaluasi Tata Kelola Dermaga Khusus Galang',
            rekomendasi: 'Penerbitan surat rekomendasi perpanjangan izin dermaga operasional.',
            mitra: 'PT Makmur Elok Graha',
          },
          {
            judul: 'Pengawasan Sengketa Batas Lahan Kabil Industrial Park',
            rekomendasi: 'Pemasangan patok beton pembatas permanen.',
            mitra: 'PT Kabil Citranusa',
          },
          {
            judul: 'Rekomendasi Penggantian Pompa Intake Waduk Duriangkang',
            rekomendasi: 'Pengadaan pompa booster air baku cadangan.',
            mitra: 'PT Air Bersih Nusantara',
          },
        ],
      },
      {
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Pembagian Royalti Terminal Feri Batam Centre',
            rekomendasi: 'Audit independen pelaporan jumlah penumpang pelabuhan.',
            mitra: 'PT Sinergi Feri Batam',
          },
          {
            judul: 'Monev Pembangunan Hanggar Baru Pesawat BAT',
            rekomendasi: 'Penyelesaian struktur atap baja hanggar tepat jadwal.',
            mitra: 'PT Batam Aero Technic',
          },
          {
            judul: 'Audit Keselamatan Bongkar Muat Peti Kemas Batu Ampar',
            rekomendasi: 'Penertiban kecepatan armada truk container di dermaga.',
            mitra: 'PT Batam Terminal Peti Kemas',
          },
          {
            judul: 'Rekomendasi Penerbitan SP-1 Keterlambatan Sewa Gedung',
            rekomendasi: 'Surat peringatan penyelesaian tunggakan sewa komersial.',
            mitra: 'PT Nagoya City Development',
          },
        ],
      },
      {
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Penerimaan Jasa Kepelabuhanan Kabil',
            rekomendasi: 'Integrasi sistem billing pembayaran kapal dengan portal BP Batam.',
            mitra: 'PT Citra Kabil Port',
          },
          {
            judul: 'Monev Kualitas Layanan Air Bersih Kawasan Tunas',
            rekomendasi: 'Pembersihan pipa transmisi utama dari endapan lumpur.',
            mitra: 'PT Air Batam Hilir',
          },
          {
            judul: 'Pengendalian Penataan Jalur Kabel Optik Nongsa',
            rekomendasi: 'Relokasi kabel udara menjadi pipa bawah tanah (ducting).',
            mitra: 'PT Batam Link Telekomunikasi',
          },
          {
            judul: 'Audit Kepatuhan Sertifikat Laik Fungsi Gedung Terminal BIB',
            rekomendasi: 'Pengujian berkala alarm kebakaran dan smoke detector bandara.',
            mitra: 'PT Bandara Internasional Batam',
          },
        ],
      },
      {
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2025,
        jumlahRekomendasi: 5,
        items: [
          {
            judul: 'Evaluasi Implementasi Amandemen PKS Pelabuhan Batu Ampar',
            rekomendasi: 'Penyelarasan target investasi crane STS tahap kedua.',
            mitra: 'PT Batam Terminal Peti Kemas',
          },
          {
            judul: 'Pengawasan Kemitraan Hotel & Mall Harbour Bay 2025',
            rekomendasi: 'Penyelesaian kewajiban bagi hasil kuartal ketiga.',
            mitra: 'PT Citra Harbour Promosindo',
          },
          {
            judul: 'Audit Pemeliharaan Saluran Drainase Kawasan Panbil',
            rekomendasi: 'Normalisasi parit pembuangan air hujan utama.',
            mitra: 'PT Energi Listrik Panbil',
          },
          {
            judul: 'Rekomendasi Penyesuaian Tarif Sewa Gudang Sekupang',
            rekomendasi: 'Pemberlakuan penyesuaian sewa sesuai inflasi daerah.',
            mitra: 'PT Samudera Bahari Sentosa',
          },
          {
            judul: 'Monev Kepatuhan Asuransi Pembangkit Listrik Sambu',
            rekomendasi: 'Penyampaian sertifikat reasuransi fasilitas tangki minyak.',
            mitra: 'PT Pertamina Trans Kontinental',
          },
        ],
      },
      {
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Evaluasi Kepatuhan Pelaporan Keuangan Tahunan Mitra',
            rekomendasi: 'Batas akhir penyerahan audited report per 31 Desember.',
            mitra: 'Seluruh Mitra Kerja Sama',
          },
          {
            judul: 'Monev Tindak Lanjut Rekomendasi Audit BPKP Pengusahaan',
            rekomendasi: 'Penyelesaian 100% catatan pembagian hasil kerjasama.',
            mitra: 'Biro Keuangan BP Batam',
          },
          {
            judul: 'Audit Pengelolaan Lingkungan Galangan Kapal Tanjung Uncang',
            rekomendasi: 'Pengolahan limbah air bilga kapal sesuai standar maritim.',
            mitra: 'PT Graha Marine Indah',
          },
          {
            judul: 'Pengendalian Pemanfaatan Lahan Hijau Bandara Hang Nadim',
            rekomendasi: 'Penetapan batas zona vegetasi penahan angin landasan.',
            mitra: 'PT Bandara Internasional Batam',
          },
        ],
      },
      {
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2025,
        jumlahRekomendasi: 4,
        items: [
          {
            judul: 'Rekapitulasi Tahunan Penyelesaian Rekomendasi 2025',
            rekomendasi: 'Penetapan capaian kepatuhan tindak lanjut mencapai 95,2%.',
            mitra: 'Seluruh Mitra Badan Usaha',
          },
          {
            judul: 'Evaluasi Kontrak BOT Terminal Feri Telaga Punggur',
            rekomendasi: 'Pembaruan sarana ruang tunggu VIP dan toilet penumpang.',
            mitra: 'PT ASDP Indonesia Ferry',
          },
          {
            judul: 'Rekomendasi Perencanaan Pengawasan Kerjasama 2026',
            rekomendasi: 'Penyusunan jadwal audit berkala terpadu pada 18 mitra strategis.',
            mitra: 'Tim Pengendalian Kerjasama',
          },
          {
            judul: 'Monev Pembayaran Retribusi Pemanfaatan Ruang Pesisir',
            rekomendasi: 'Penerbitan surat tanda lunas kewajiban tahun anggaran 2025.',
            mitra: 'Direktorat Pengelolaan Pesisir',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 2: LAPORAN PENGAWASAN PENGENDALIAN PENGUSAHAAN PER BULAN
  // Dataset: Laporan Pengawasan Pengendalian Pengusahaan (Tertutup, perbulan, dokumen digital)
  // --------------------------------------------------------------------------
  laporanPengawasanBulanan: {
    metadata: {
      namaDataset: 'Laporan Pengawasan Pengendalian Pengusahaan',
      sifatData: 'Tertutup',
      periodeUpdate: 'Perbulan / Dokumen Digital',
    },
    records: [
      // Tahun 2026
      {
        id: 'LAP-2026-01',
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/01/2026',
            judulLaporan: 'Laporan Pengawasan Kepatuhan PKS Pengoperasian Dermaga Logistik Kabil Triwulan I',
            objekPengawasan: 'Dermaga Kargo Curah Kabil (PT Citra Kabil Port)',
            tanggalTerbit: '28 Jan 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-02',
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/02/2026',
            judulLaporan: 'Laporan Evaluasi Pelaksanaan Standar Kelaikan Hanggar MRO Bandara Hang Nadim',
            objekPengawasan: 'Hanggar Fasilitas MRO Pesawat (PT Batam Aero Technic)',
            tanggalTerbit: '25 Feb 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-03',
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/03/2026',
            judulLaporan: 'Laporan Audit Kinerja Layanan Bongkar Muat Peti Kemas Terminal Batu Ampar',
            objekPengawasan: 'Terminal Kontainer Batu Ampar (PT Batam Terminal Peti Kemas)',
            tanggalTerbit: '27 Mar 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-04',
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/04/2026',
            judulLaporan: 'Laporan Pengawasan Klausul Finansial & Bagi Hasil PKS Terminal Feri Harbour Bay',
            objekPengawasan: 'Terminal Penumpang Internasional Harbour Bay (PT Citra Harbour Promosindo)',
            tanggalTerbit: '29 Apr 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-05',
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/05/2026',
            judulLaporan: 'Laporan Evaluasi Kepatuhan Lingkungan Pengelolaan Limbah Industri B3 Kawasan Kabil',
            objekPengawasan: 'Instalasi Pengolahan Limbah Terpadu (PT Pengelola Limbah Batam)',
            tanggalTerbit: '28 Mei 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-06',
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/06/2026',
            judulLaporan: 'Laporan Monev Semester I Penerapan Masterlist Mesin Industri Bebas Bea Masuk',
            objekPengawasan: '18 Perusahaan Penerima Fasilitas Masterlist Penanaman Modal',
            tanggalTerbit: '26 Jun 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-07',
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/07/2026',
            judulLaporan: 'Laporan Audit Kepatuhan Kontrak KSO Pengelolaan Sistem Parkir Bandara Hang Nadim',
            objekPengawasan: 'Area Parkir & Akses Gate Masuk Bandara (PT Secure Parking Batam)',
            tanggalTerbit: '29 Jul 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-08',
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/08/2026',
            judulLaporan: 'Laporan Pengawasan Kelaikan Pipa Transmisi Air Bersih Industri Waduk Duriangkang',
            objekPengawasan: 'Jaringan Pipa Distribusi Utama Air Curah (PT Air Bersih Nusantara)',
            tanggalTerbit: '27 Agu 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-09',
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/09/2026',
            judulLaporan: 'Laporan Evaluasi Progres Fisik Pembangunan Terminal Kargo Udara Baru Hang Nadim',
            objekPengawasan: 'Proyek Konstruksi Terminal Kargo (PT Bandara Internasional Batam)',
            tanggalTerbit: '25 Sep 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-10',
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/10/2026',
            judulLaporan: 'Laporan Pengawasan Kepatuhan Pemanfaatan Lahan Pesisir & Reklamasi Ocarina',
            objekPengawasan: 'Area Reklamasi Pariwisata Bahari (PT Ocarina Bahari Megah)',
            tanggalTerbit: '28 Okt 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-11',
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/11/2026',
            judulLaporan: 'Laporan Audit Kelaikan Jaringan Transmisi Pembangkit Listrik Gas Engine Panbil',
            objekPengawasan: 'Fasilitas Pembangkit Listrik Kawasan Industri (PT Energi Listrik Panbil)',
            tanggalTerbit: '26 Nov 2026',
          },
        ],
      },
      {
        id: 'LAP-2026-12',
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2026,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/12/2026',
            judulLaporan: 'Laporan Tahunan Konsolidasi Pengendalian & Evaluasi Kerjasama Badan Usaha 2026',
            objekPengawasan: 'Seluruh 28 Kemitraan Strategis Badan Usaha BP Batam',
            tanggalTerbit: '23 Des 2026',
          },
        ],
      },
      // Tahun 2025
      {
        id: 'LAP-2025-01',
        bulan: 'Jan',
        bulanNama: 'Januari',
        bulanIndex: 1,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/01/2025',
            judulLaporan: 'Laporan Pengawasan Kepatuhan PKS Pengoperasian Dermaga Kabil Triwulan I 2025',
            objekPengawasan: 'Dermaga Kabil (PT Citra Kabil Port)',
            tanggalTerbit: '29 Jan 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-02',
        bulan: 'Feb',
        bulanIndex: 2,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/02/2025',
            judulLaporan: 'Laporan Evaluasi Pemenuhan SOP Bongkar Muat Peti Kemas Batu Ampar 2025',
            objekPengawasan: 'Terminal Peti Kemas Batu Ampar (PT Batam Terminal Peti Kemas)',
            tanggalTerbit: '26 Feb 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-03',
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/03/2025',
            judulLaporan: 'Laporan Audit Kepatuhan Pembayaran Dividen & Royalti KSO Terminal Feri Batam Centre',
            objekPengawasan: 'Pelabuhan Feri Batam Centre (PT Sinergi Feri Batam)',
            tanggalTerbit: '28 Mar 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-04',
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/04/2025',
            judulLaporan: 'Laporan Pengawasan Fasilitas Workshop MRO Pesawat Udara Hang Nadim',
            objekPengawasan: 'Hanggar MRO Pesawat (PT Batam Aero Technic)',
            tanggalTerbit: '25 Apr 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-05',
        bulan: 'Mei',
        bulanIndex: 5,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/05/2025',
            judulLaporan: 'Laporan Evaluasi Pengelolaan Rusunawa Pekerja Batamindo',
            objekPengawasan: 'Rusunawa Industri Mukakuning (PT Batamindo Investment Corp)',
            tanggalTerbit: '27 Mei 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-06',
        bulan: 'Jun',
        bulanIndex: 6,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/06/2025',
            judulLaporan: 'Laporan Monev Semester I Kepatuhan Perjanjian Konsesi Bandara Hang Nadim',
            objekPengawasan: 'Terminal 1 & Terminal Kargo (PT Bandara Internasional Batam)',
            tanggalTerbit: '27 Jun 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-07',
        bulan: 'Jul',
        bulanIndex: 7,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/07/2025',
            judulLaporan: 'Laporan Audit Kualitas Layanan Air Bersih SPAM Mukakuning & Tembesi',
            objekPengawasan: 'Fasilitas SPAM Industri (PT Air Batam Hilir)',
            tanggalTerbit: '29 Jul 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-08',
        bulan: 'Agu',
        bulanIndex: 8,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/08/2025',
            judulLaporan: 'Laporan Pengawasan Tata Kelola Pemanfaatan Lahan Galangan Kapal Tanjung Uncang',
            objekPengawasan: 'Kawasan Galangan Kapal (PT Graha Marine Indah)',
            tanggalTerbit: '28 Agu 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-09',
        bulan: 'Sep',
        bulanIndex: 9,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/09/2025',
            judulLaporan: 'Laporan Evaluasi Kepatuhan Pelaporan Pajak & Retribusi Pelabuhan Sambu',
            objekPengawasan: 'Dermaga Penimbunan BBM (PT Pertamina Trans Kontinental)',
            tanggalTerbit: '26 Sep 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-10',
        bulan: 'Okt',
        bulanIndex: 10,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/10/2025',
            judulLaporan: 'Laporan Pengawasan Fasilitas Cold Storage & Perikanan Pelabuhan Sekupang',
            objekPengawasan: 'Cold Storage Logistik Perikanan (PT Samudera Bahari Sentosa)',
            tanggalTerbit: '29 Okt 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-11',
        bulan: 'Nov',
        bulanIndex: 11,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/11/2025',
            judulLaporan: 'Laporan Audit Kesiapan Fasilitas Kelistrikan & Jaringan Gas Alam Panbil',
            objekPengawasan: 'Pembangkit Tenaga Gas Panbil (PT Energi Listrik Panbil)',
            tanggalTerbit: '27 Nov 2025',
          },
        ],
      },
      {
        id: 'LAP-2025-12',
        bulan: 'Des',
        bulanIndex: 12,
        tahun: 2025,
        jumlahLaporan: 1,
        laporanList: [
          {
            nomorDokumen: 'LAP-WAS/DPU/12/2025',
            judulLaporan: 'Laporan Tahunan Evaluasi & Pengendalian Kerjasama Badan Usaha BP Batam 2025',
            objekPengawasan: 'Seluruh Kemitraan Badan Usaha BP Batam',
            tanggalTerbit: '22 Des 2025',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 3: TREN REKOMENDASI PER TAHUN (5 TAHUN TERAKHIR: 2022 - 2026)
  // Dataset: Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan Badan Usaha (Tertutup)
  // --------------------------------------------------------------------------
  trenRekomendasiTahunan: {
    metadata: {
      namaDataset: 'Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan Badan Usaha',
      sifatData: 'Tertutup',
      periodeUpdate: 'Pertahun (5 Tahun Terakhir)',
    },
    records: [
      {
        tahun: 2022,
        jumlahRekomendasi: 32,
        jumlahTahunLalu: 28,
        perubahanCount: 4,
        perubahanPersen: 14.3,
        isPositive: true,
        fokusEvaluasi: 'Pemulihan pasca pandemi & renegosiasi kelonggaran termin sewa fasilitas usaha.',
      },
      {
        tahun: 2023,
        jumlahRekomendasi: 36,
        jumlahTahunLalu: 32,
        perubahanCount: 4,
        perubahanPersen: 12.5,
        isPositive: true,
        fokusEvaluasi: 'Modernisasi alat STS container crane Batu Ampar & penertiban PKS feri internasional.',
      },
      {
        tahun: 2024,
        jumlahRekomendasi: 40,
        jumlahTahunLalu: 36,
        perubahanCount: 4,
        perubahanPersen: 11.1,
        isPositive: true,
        fokusEvaluasi: 'Pengawasan transisi konsesi Terminal Bandara Hang Nadim & utilitas KEK Nongsa.',
      },
      {
        tahun: 2025,
        jumlahRekomendasi: 42,
        jumlahTahunLalu: 40,
        perubahanCount: 2,
        perubahanPersen: 5.0,
        isPositive: true,
        fokusEvaluasi: 'Optimalisasi kepatuhan PKS bagi hasil PNBP & audit standar operasional 28 mitra usaha.',
      },
      {
        tahun: 2026,
        jumlahRekomendasi: 48,
        jumlahTahunLalu: 42,
        perubahanCount: 6,
        perubahanPersen: 14.3,
        isPositive: true,
        fokusEvaluasi: 'Perluasan pengawasan KEK Pariwisata Kesehatan Sekupang & hilirisasi PLTS terbarukan.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // KARTU 4: DAFTAR REKOMENDASI TERBARU (8 BARIS TERBARU)
  // Dataset: Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan Badan Usaha (Tertutup)
  // --------------------------------------------------------------------------
  daftarRekomendasiTerbaru: {
    metadata: {
      namaDataset: 'Rekomendasi Evaluasi dan Pengendalian Kerjasama Pengusahaan Badan Usaha',
      sifatData: 'Tertutup',
      periodeUpdate: 'Real-time / Per Rekomendasi',
    },
    records: [
      {
        id: 'REK-2026-048',
        tanggal: '2026-04-24',
        tanggalDisplay: '24 Apr 2026',
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        judul: 'Evaluasi Perjanjian KSP Pembangunan Hotel & Mall Harbour Bay',
        rekomendasi: 'Penyelesaian denda keterlambatan termin 2 dan pemutakhiran sertifikat laik fungsi gedung.',
        rekomendasiSingkat: 'Penyelesaian denda keterlambatan termin 2 dan pemutakhiran sertifikat laik fungsi gedung.',
        objekKerjasama: 'Kawasan Komersial & Mall Harbour Bay',
        mitra: 'PT Citra Harbour Promosindo',
        kategori: 'Kepatuhan Hukum',
        status: 'Dalam Proses',
      },
      {
        id: 'REK-2026-047',
        tanggal: '2026-04-18',
        tanggalDisplay: '18 Apr 2026',
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        judul: 'Pengawasan Amandemen PKS Terminal Kargo Udara Hang Nadim',
        rekomendasi: 'Harmonisasi klausul masa konsesi pengelolaan terminal kargo internasional 25 tahun.',
        rekomendasiSingkat: 'Harmonisasi klausul masa konsesi pengelolaan terminal kargo internasional 25 tahun.',
        objekKerjasama: 'Terminal Kargo Udara Hang Nadim',
        mitra: 'PT Bandara Internasional Batam',
        kategori: 'Operasional',
        status: 'Tuntas',
      },
      {
        id: 'REK-2026-046',
        tanggal: '2026-04-12',
        tanggalDisplay: '12 Apr 2026',
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        judul: 'Monev Integrasi Data Pelaporan LKPM Melalui IBOSS System',
        rekomendasi: 'Klinik pendampingan teknis pelaporan bagi 120 tenant baru kawasan industri.',
        rekomendasiSingkat: 'Klinik pendampingan teknis pelaporan bagi 120 tenant baru kawasan industri.',
        objekKerjasama: 'Sistem Pelaporan Penanaman Modal',
        mitra: 'Asosiasi Pengusaha Batam',
        kategori: 'Layanan',
        status: 'Tuntas',
      },
      {
        id: 'REK-2026-045',
        tanggal: '2026-04-05',
        tanggalDisplay: '05 Apr 2026',
        bulan: 'Apr',
        bulanIndex: 4,
        tahun: 2026,
        judul: 'Penertiban Pemanfaatan Sempadan Waduk Muka Kuning',
        rekomendasi: 'Pembongkaran bangunan non-izin di buffer zone waduk untuk menjaga resapan air bersih.',
        rekomendasiSingkat: 'Pembongkaran bangunan non-izin di buffer zone waduk untuk menjaga resapan air bersih.',
        objekKerjasama: 'Buffer Zone Sumber Daya Air Muka Kuning',
        mitra: 'Tim Gabungan Pengendalian',
        kategori: 'Infrastruktur',
        status: 'Dalam Proses',
      },
      {
        id: 'REK-2026-044',
        tanggal: '2026-03-27',
        tanggalDisplay: '27 Mar 2026',
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        judul: 'Evaluasi Pasokan Daya Gardu Induk Data Center Rempang',
        rekomendasi: 'Penyediaan redundant feeder line jalur ganda 150 kV guna menjamin uptime 99,99%.',
        rekomendasiSingkat: 'Penyediaan redundant feeder line jalur ganda 150 kV guna menjamin uptime 99,99%.',
        objekKerjasama: 'Jaringan Gardu Induk Tegangan Tinggi',
        mitra: 'PT Batam Power Lestari',
        kategori: 'Infrastruktur',
        status: 'Tuntas',
      },
      {
        id: 'REK-2026-043',
        tanggal: '2026-03-20',
        tanggalDisplay: '20 Mar 2026',
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        judul: 'Audit Finansial Kemitraan SPAM Hulu Waduk Duriangkang',
        rekomendasi: 'Klarifikasi biaya operasional desalinasi air baku dan rasio kebocoran pipa utama.',
        rekomendasiSingkat: 'Klarifikasi biaya operasional desalinasi air baku dan rasio kebocoran pipa utama.',
        objekKerjasama: 'Instalasi Pengolahan Air Duriangkang',
        mitra: 'PT Air Bersih Nusantara',
        kategori: 'Bagi Hasil',
        status: 'Tuntas',
      },
      {
        id: 'REK-2026-042',
        tanggal: '2026-03-14',
        tanggalDisplay: '14 Mar 2026',
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        judul: 'Evaluasi Fasilitas Cold Storage Pelabuhan Sekupang',
        rekomendasi: 'Penyediaan cadangan genset 500 kVA untuk mencegah pembusukan komoditas perikanan ekspor.',
        rekomendasiSingkat: 'Penyediaan cadangan genset 500 kVA untuk mencegah pembusukan komoditas perikanan ekspor.',
        objekKerjasama: 'Pergudangan Dingin Pelabuhan Sekupang',
        mitra: 'PT Samudera Bahari Sentosa',
        kategori: 'Operasional',
        status: 'Monitoring',
      },
      {
        id: 'REK-2026-041',
        tanggal: '2026-03-08',
        tanggalDisplay: '08 Mar 2026',
        bulan: 'Mar',
        bulanIndex: 3,
        tahun: 2026,
        judul: 'Monev Masterlist Impor Mesin CNC Kawasan Tunas',
        rekomendasi: 'Verifikasi fisik kesesuaian serial number mesin injection presisi pabrik elektronik.',
        rekomendasiSingkat: 'Verifikasi fisik kesesuaian serial number mesin injection presisi pabrik elektronik.',
        objekKerjasama: 'Fasilitas Bebas Bea Masuk Mesin Produksi',
        mitra: 'PT Precision Component Batam',
        kategori: 'Kepatuhan Hukum',
        status: 'Tuntas',
      },
    ],
  },
};
