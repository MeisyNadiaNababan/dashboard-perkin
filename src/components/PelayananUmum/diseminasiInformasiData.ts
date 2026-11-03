/**
 * Data Master Visualisasi Direktorat Diseminasi Informasi dan Hubungan Antar Lembaga
 * BP Batam (Deputi Bidang Pelayanan Umum - DEP A6)
 *
 * Seluruh data dummy realistis disimpan dalam satu objek JSON terstruktur
 * agar mudah disinkronkan atau diganti dengan data asli Satu Data BP Batam.
 *
 * PERINGATAN PRIVASI:
 * Tidak memuat data pribadi pemohon (nomor KTP, nama pemohon, alamat pribadi, kontak).
 */

export interface KegiatanPublikasiItem {
  bulan: string;
  publikasi: number;
  dokumentasi: number;
  tentatif: number;
  contohNamaKegiatan: string;
  lokasi: string;
}

export interface IklanAdvertorialItem {
  semester: string;
  tahun: string;
  nasionalLokal: number;
  asing: number;
  namaMedia: string;
  contohJudul: string;
}

export interface WebsiteTrafficCategory {
  bulan: string;
  portalBerita: number;
  layananPerizinan: number;
  potensiInvestasi: number;
  ppidPublik: number;
  total: number;
  prevTotal: number;
  growthPct: number;
}

export interface KunjunganTamuCategory {
  kategori: string;
  investasiKek: number;
  kantorPimpinan: number;
  pelabuhanBandara: number;
  pengelolaanLahan: number;
  humasProtokol: number;
  lainnya: number;
  total: number;
  pekerjaanJabatan: string;
  contohAcara: string;
}

export interface KeprotokolanItem {
  bulan: string;
  dilayani: number;
  terlaksana: number;
  persentase: number;
  contohUraian: string;
  hariTanggal: string;
}

export interface PermohonanBantuanItem {
  semester: string;
  tahun: string;
  sosial: number;
  keagamaan: number;
  olahraga: number;
  pendidikan: number;
  kebencanaan: number;
  lainnya: number;
  total: number;
}

export interface PermohonanInformasiBulan {
  bulan: string;
  permohonan: number;
  selesai: number;
  contohInformasiDiminta: string;
}

export interface IndeksKeterbukaanTahun {
  tahun: string;
  nilaiIndeks: number;
  predikat: string;
  inovasi: string;
  ketersediaanInformasi: string;
}

export interface MouTriwulanItem {
  triwulan: string;
  infrastruktur: number;
  investasiKek: number;
  pengusahaan: number;
  pelayananUmum: number;
  total: number;
  nomorMou: string;
  uraian: string;
  kurunWaktu: string;
  sisaHari: number;
}

export interface KoordinasiKategoriItem {
  kategori: string;
  jumlah: number;
  lokasi: string;
  tanggalKegiatan: string;
}

export interface MitraJakartaItem {
  no: number;
  namaInstansi: string;
  kategori: string;
  alamat: string;
  fokusKerjasama: string;
  status: string;
}

export interface DiseminasiInformasiDataStructure {
  tahunTersedia: string[];

  // BARIS 1 - KARTU 1: Kegiatan Terpublikasi, Terdokumentasi, dan Tentatif
  kegiatanPublikasi: Record<string, KegiatanPublikasiItem[]>;

  // BARIS 1 - KARTU 2: Iklan dan Advertorial Media
  iklanAdvertorial: Record<string, IklanAdvertorialItem[]>;

  // BARIS 2 - KARTU 3: Kunjungan Website
  kunjunganWebsite: Record<string, WebsiteTrafficCategory[]>;

  // BARIS 2 - KARTU 4: Kunjungan Tamu BP Batam
  kunjunganTamu: Record<string, KunjunganTamuCategory[]>;

  // BARIS 3 - KARTU 5: Pelayanan Keprotokolan
  pelayananKeprotokolan: Record<string, KeprotokolanItem[]>;

  // BARIS 3 - KARTU 6: Permohonan Bantuan
  permohonanBantuan: Record<string, PermohonanBantuanItem[]>;

  // BARIS 4 - KARTU 7: Permohonan Informasi Publik & Indeks Keterbukaan
  permohonanInformasi: Record<string, PermohonanInformasiBulan[]>;
  indeksKeterbukaan5Tahun: IndeksKeterbukaanTahun[];

  // BARIS 4 - KARTU 8: Kerja Sama dan Koordinasi Antar Lembaga
  mouAntarLembaga: Record<string, MouTriwulanItem[]>;
  koordinasiLayanan: Record<string, KoordinasiKategoriItem[]>;
  mitraJakartaList: MitraJakartaItem[];
}

export const DISEMINASI_INFORMASI_DATA: DiseminasiInformasiDataStructure = {
  tahunTersedia: ['2026', '2025', '2024'],

  // =========================================================================
  // KARTU 1: Kegiatan Terpublikasi, Terdokumentasi, dan Tentatif
  // =========================================================================
  kegiatanPublikasi: {
    '2026': [
      { bulan: 'Jan', publikasi: 38, dokumentasi: 36, tentatif: 42, contohNamaKegiatan: 'Press Briefing Capaian Investasi Batam TA 2026', lokasi: 'Marketing Centre BP Batam' },
      { bulan: 'Feb', publikasi: 42, dokumentasi: 40, tentatif: 45, contohNamaKegiatan: 'Liputan Peresmian Fasilitas Solar Farm KEK Galang', lokasi: 'Pulau Galang, Barelang' },
      { bulan: 'Mar', publikasi: 45, dokumentasi: 43, tentatif: 48, contohNamaKegiatan: 'Sosialisasi Sistem Perizinan IBOSS Versi 3.0', lokasi: 'Gedung IT Centre Batam' },
      { bulan: 'Apr', publikasi: 48, dokumentasi: 46, tentatif: 50, contohNamaKegiatan: 'Konferensi Pers Ekspor Perdana Transformator Listrik', lokasi: 'Pelabuhan Batu Ampar' },
      { bulan: 'Mei', publikasi: 44, dokumentasi: 41, tentatif: 46, contohNamaKegiatan: 'Liputan Groundbreaking Pusat Riset Semikonduktor', lokasi: 'KEK Nongsa Digital Park' },
      { bulan: 'Jun', publikasi: 49, dokumentasi: 47, tentatif: 52, contohNamaKegiatan: 'Kunjungan Kerja Komisi VI DPR RI ke Batam', lokasi: 'Ruang Rapat Pimpinan BPH' },
      { bulan: 'Jul', publikasi: 52, dokumentasi: 49, tentatif: 55, contohNamaKegiatan: 'Batam Investment Forum & Mini Expo Internasional', lokasi: 'Radisson Golf & Convention' },
      { bulan: 'Agu', publikasi: 46, dokumentasi: 44, tentatif: 48, contohNamaKegiatan: 'Upacara HUT RI ke-81 & Pesta Rakyat Pekerja', lokasi: 'Lapangan Parkir BP Batam' },
      { bulan: 'Sep', publikasi: 43, dokumentasi: 40, tentatif: 45, contohNamaKegiatan: 'Diseminasi Peluang Kemitraan UMKM bersama Tenant Industri', lokasi: 'Mega Mall Batam Centre' },
      { bulan: 'Okt', publikasi: 55, dokumentasi: 52, tentatif: 58, contohNamaKegiatan: 'Peringatan Hari Bakti BP Batam ke-55 & Expo Layanan', lokasi: 'Dataran Engku Putri' },
      { bulan: 'Nov', publikasi: 47, dokumentasi: 44, tentatif: 50, contohNamaKegiatan: 'Sosialisasi Tata Kelola SPBE & Keamanan Siber', lokasi: 'Auditorium Politeknik Negeri' },
      { bulan: 'Des', publikasi: 51, dokumentasi: 48, tentatif: 54, contohNamaKegiatan: 'Refleksi Akhir Tahun & Peluncuran Kalender Event 2027', lokasi: 'Balairung BP Batam' },
    ],
    '2025': [
      { bulan: 'Jan', publikasi: 34, dokumentasi: 31, tentatif: 38, contohNamaKegiatan: 'Peninjauan Revitalisasi Terminal Hang Nadim', lokasi: 'Bandara Hang Nadim' },
      { bulan: 'Feb', publikasi: 36, dokumentasi: 33, tentatif: 40, contohNamaKegiatan: 'Forum Koordinasi Kehumasan Lintas Instansi', lokasi: 'Gedung BIDA Batam Centre' },
      { bulan: 'Mar', publikasi: 40, dokumentasi: 37, tentatif: 42, contohNamaKegiatan: 'Publikasi Progres Konstruksi Flyover Sei Ladi', lokasi: 'Ruas Jalan Sei Ladi - Sekupang' },
      { bulan: 'Apr', publikasi: 42, dokumentasi: 39, tentatif: 44, contohNamaKegiatan: 'Penyambutan Delegasi Bisnis Uni Emirat Arab', lokasi: 'VIP Room Bandara Hang Nadim' },
      { bulan: 'Mei', publikasi: 41, dokumentasi: 38, tentatif: 43, contohNamaKegiatan: 'Seminar Hilirisasi Logistik Maritim Modern', lokasi: 'Batu Ampar Port Hall' },
      { bulan: 'Jun', publikasi: 46, dokumentasi: 43, tentatif: 48, contohNamaKegiatan: 'Peresmian Jalur Sepeda Protokol Batam Centre', lokasi: 'Bundaran Madani' },
      { bulan: 'Jul', publikasi: 48, dokumentasi: 45, tentatif: 50, contohNamaKegiatan: 'Pameran Foto Pembangunan Batam Masa Depan', lokasi: 'Grand Batam Mall' },
      { bulan: 'Agu', publikasi: 43, dokumentasi: 40, tentatif: 45, contohNamaKegiatan: 'Liputan Semarak Kemerdekaan RI di BP Batam', lokasi: 'Halaman Gedung Utama' },
      { bulan: 'Sep', publikasi: 39, dokumentasi: 36, tentatif: 42, contohNamaKegiatan: 'Sosialisasi Keterbukaan Informasi Publik PPID', lokasi: 'Ruang Rapat Pelayanan Umum' },
      { bulan: 'Okt', publikasi: 50, dokumentasi: 47, tentatif: 53, contohNamaKegiatan: 'Hari Bakti BP Batam: Gowes & Bhakti Sosial', lokasi: 'Dam Muka Kuning' },
      { bulan: 'Nov', publikasi: 44, dokumentasi: 41, tentatif: 46, contohNamaKegiatan: 'Diseminasi Regulasi Baru UWT & Pertanahan', lokasi: 'Hotel Pasific Batam' },
      { bulan: 'Des', publikasi: 47, dokumentasi: 44, tentatif: 49, contohNamaKegiatan: 'Laporan Capaian Kinerja Publikasi Akhir Tahun', lokasi: 'Media Centre BP Batam' },
    ],
    '2024': [
      { bulan: 'Jan', publikasi: 30, dokumentasi: 28, tentatif: 35, contohNamaKegiatan: 'Peluncuran Logo & Tema Hari Jadi BP Batam', lokasi: 'Gedung Utama BP Batam' },
      { bulan: 'Feb', publikasi: 32, dokumentasi: 29, tentatif: 36, contohNamaKegiatan: 'Liputan Penataan Simpang Kepri Mall', lokasi: 'Simpang Kabil - Sukajadi' },
      { bulan: 'Mar', publikasi: 35, dokumentasi: 32, tentatif: 38, contohNamaKegiatan: 'Pertemuan Rutin PWI & Forum Jurnalis Batam', lokasi: 'Kantin Diplomasi BP Batam' },
      { bulan: 'Apr', publikasi: 37, dokumentasi: 34, tentatif: 40, contohNamaKegiatan: 'Sosialisasi Perizinan Online OSS Berbasis Risiko', lokasi: 'MPP Batam Centre' },
      { bulan: 'Mei', publikasi: 38, dokumentasi: 35, tentatif: 41, contohNamaKegiatan: 'Kunjungan Diplomatik Dubes Singapura untuk RI', lokasi: 'Gedung BIDA Batam Centre' },
      { bulan: 'Jun', publikasi: 42, dokumentasi: 39, tentatif: 45, contohNamaKegiatan: 'Publikasi Realisasi Triwulan II PMA/PMDN', lokasi: 'Marketing Centre BP Batam' },
      { bulan: 'Jul', publikasi: 44, dokumentasi: 41, tentatif: 47, contohNamaKegiatan: 'Penyelenggaraan Batam Triathlon & Sport Tourism', lokasi: 'Nongsa Coast Marina' },
      { bulan: 'Agu', publikasi: 40, dokumentasi: 37, tentatif: 42, contohNamaKegiatan: 'Perayaan HUT Kemerdekaan RI ke-79', lokasi: 'Lapangan Utama BP Batam' },
      { bulan: 'Sep', publikasi: 36, dokumentasi: 33, tentatif: 39, contohNamaKegiatan: 'Sosialisasi Pencegahan Gratifikasi & WBS', lokasi: 'Gedung BIDA Lantai 3' },
      { bulan: 'Okt', publikasi: 46, dokumentasi: 43, tentatif: 49, contohNamaKegiatan: 'Hari Bakti BP Batam ke-53 & Festival Seni', lokasi: 'Dataran Engku Putri' },
      { bulan: 'Nov', publikasi: 41, dokumentasi: 38, tentatif: 44, contohNamaKegiatan: 'Kunjungan Asosiasi Pengusaha Jepang (JETRO)', lokasi: 'Batam Centre' },
      { bulan: 'Des', publikasi: 43, dokumentasi: 40, tentatif: 46, contohNamaKegiatan: 'Konferensi Pers Akhir Tahun BP Batam', lokasi: 'Media Centre BP Batam' },
    ],
  },

  // =========================================================================
  // KARTU 2: Iklan dan Advertorial Media
  // =========================================================================
  iklanAdvertorial: {
    '2026': [
      { semester: '2026-S1', tahun: '2026', nasionalLokal: 64, asing: 28, namaMedia: 'Kompas, Bisnis Indonesia, The Straits Times, Batam Pos', contohJudul: 'Batam Menuju Pusat Hilirisasi Hijau dan Data Center Asia Pasifik' },
      { semester: '2026-S2', tahun: '2026', nasionalLokal: 72, asing: 34, namaMedia: 'Tempo, Jakarta Post, Nikkei Asia, Bloomberg Technoz', contohJudul: 'Akselerasi KEK Nongsa & Daya Saing Logistik Maritim Global' },
    ],
    '2025': [
      { semester: '2025-S1', tahun: '2025', nasionalLokal: 56, asing: 22, namaMedia: 'Media Indonesia, Investor Daily, The Business Times SG', contohJudul: 'Konektivitas Logistik Tanpa Hambatan: Modernisasi Pelabuhan Batu Ampar' },
      { semester: '2025-S2', tahun: '2025', nasionalLokal: 62, asing: 26, namaMedia: 'Detikcom, CNBC Indonesia, Channel News Asia', contohJudul: 'Insentif Fiskal KPBPB Batam: Magnet Kuat Relokasi Manufaktur' },
    ],
    '2024': [
      { semester: '2024-S1', tahun: '2024', nasionalLokal: 48, asing: 18, namaMedia: 'Republika, Koran Sindo, Lianhe Zaobao Singapore', contohJudul: 'Pertumbuhan Ekonomi Batam Melaju 7,04%: Fondasi Kuat Investasi' },
      { semester: '2024-S2', tahun: '2024', nasionalLokal: 54, asing: 20, namaMedia: 'Tribun Batam, Kontan, Asia Times', contohJudul: 'Transformasi Infrastruktur Jalan & Bandara Internasional Hang Nadim' },
    ],
  },

  // =========================================================================
  // KARTU 3: Kunjungan Website (Tertutup, perbulan)
  // =========================================================================
  kunjunganWebsite: {
    '2026': [
      { bulan: 'Jan', portalBerita: 48200, layananPerizinan: 54100, potensiInvestasi: 31200, ppidPublik: 12400, total: 145900, prevTotal: 138500, growthPct: 5.3 },
      { bulan: 'Feb', portalBerita: 50400, layananPerizinan: 56800, potensiInvestasi: 33100, ppidPublik: 13100, total: 153400, prevTotal: 145900, growthPct: 5.1 },
      { bulan: 'Mar', portalBerita: 53100, layananPerizinan: 61200, potensiInvestasi: 35400, ppidPublik: 14200, total: 163900, prevTotal: 153400, growthPct: 6.8 },
      { bulan: 'Apr', portalBerita: 55800, layananPerizinan: 63900, potensiInvestasi: 38200, ppidPublik: 14800, total: 172700, prevTotal: 163900, growthPct: 5.4 },
      { bulan: 'Mei', portalBerita: 52400, layananPerizinan: 61500, potensiInvestasi: 36700, ppidPublik: 13900, total: 164500, prevTotal: 172700, growthPct: -4.7 },
      { bulan: 'Jun', portalBerita: 57200, layananPerizinan: 66400, potensiInvestasi: 40100, ppidPublik: 15400, total: 179100, prevTotal: 164500, growthPct: 8.9 },
      { bulan: 'Jul', portalBerita: 60100, layananPerizinan: 69200, potensiInvestasi: 42500, ppidPublik: 16200, total: 188000, prevTotal: 179100, growthPct: 5.0 },
      { bulan: 'Agu', portalBerita: 58400, layananPerizinan: 67100, potensiInvestasi: 41200, ppidPublik: 15800, total: 182500, prevTotal: 188000, growthPct: -2.9 },
      { bulan: 'Sep', portalBerita: 61200, layananPerizinan: 71300, potensiInvestasi: 43900, ppidPublik: 16900, total: 193300, prevTotal: 182500, growthPct: 5.9 },
      { bulan: 'Okt', portalBerita: 65800, layananPerizinan: 75200, potensiInvestasi: 47100, ppidPublik: 18200, total: 206300, prevTotal: 193300, growthPct: 6.7 },
      { bulan: 'Nov', portalBerita: 63400, layananPerizinan: 73100, potensiInvestasi: 45600, ppidPublik: 17400, total: 199500, prevTotal: 206300, growthPct: -3.3 },
      { bulan: 'Des', portalBerita: 68900, layananPerizinan: 78500, potensiInvestasi: 49800, ppidPublik: 19400, total: 216600, prevTotal: 199500, growthPct: 8.6 },
    ],
    '2025': [
      { bulan: 'Jan', portalBerita: 41200, layananPerizinan: 46200, potensiInvestasi: 26500, ppidPublik: 10400, total: 124300, prevTotal: 121000, growthPct: 2.7 },
      { bulan: 'Feb', portalBerita: 42800, layananPerizinan: 48100, potensiInvestasi: 27900, ppidPublik: 10800, total: 129600, prevTotal: 124300, growthPct: 4.3 },
      { bulan: 'Mar', portalBerita: 45100, layananPerizinan: 51200, potensiInvestasi: 29800, ppidPublik: 11500, total: 137600, prevTotal: 129600, growthPct: 6.2 },
      { bulan: 'Apr', portalBerita: 47400, layananPerizinan: 53800, potensiInvestasi: 31400, ppidPublik: 12100, total: 144700, prevTotal: 137600, growthPct: 5.2 },
      { bulan: 'Mei', portalBerita: 44900, layananPerizinan: 51900, potensiInvestasi: 30100, ppidPublik: 11700, total: 138600, prevTotal: 144700, growthPct: -4.2 },
      { bulan: 'Jun', portalBerita: 48600, layananPerizinan: 55400, potensiInvestasi: 33200, ppidPublik: 12900, total: 150100, prevTotal: 138600, growthPct: 8.3 },
      { bulan: 'Jul', portalBerita: 51200, layananPerizinan: 58100, potensiInvestasi: 34900, ppidPublik: 13500, total: 157700, prevTotal: 150100, growthPct: 5.1 },
      { bulan: 'Agu', portalBerita: 49800, layananPerizinan: 56300, potensiInvestasi: 33800, ppidPublik: 13100, total: 153000, prevTotal: 157700, growthPct: -3.0 },
      { bulan: 'Sep', portalBerita: 52300, layananPerizinan: 59800, potensiInvestasi: 36100, ppidPublik: 14200, total: 162400, prevTotal: 153000, growthPct: 6.1 },
      { bulan: 'Okt', portalBerita: 56100, layananPerizinan: 63400, potensiInvestasi: 38900, ppidPublik: 15100, total: 173500, prevTotal: 162400, growthPct: 6.8 },
      { bulan: 'Nov', portalBerita: 53900, layananPerizinan: 61200, potensiInvestasi: 37400, ppidPublik: 14600, total: 167100, prevTotal: 173500, growthPct: -3.7 },
      { bulan: 'Des', portalBerita: 58200, layananPerizinan: 65900, potensiInvestasi: 40800, ppidPublik: 16200, total: 181100, prevTotal: 167100, growthPct: 8.4 },
    ],
  },

  // =========================================================================
  // KARTU 4: Kunjungan Tamu BP Batam (Tertutup, pertahun)
  // =========================================================================
  kunjunganTamu: {
    '2026': [
      { kategori: 'Instansi Pemerintah', investasiKek: 280, kantorPimpinan: 350, pelabuhanBandara: 210, pengelolaanLahan: 190, humasProtokol: 180, lainnya: 90, total: 1300, pekerjaanJabatan: 'Kementerian/Lembaga, Pemda Provinsi/Kota, Bappenas', contohAcara: 'Studi Kebijakan Tata Kelola FTZ & Kemitraan Strategis' },
      { kategori: 'Investor & Pelaku Usaha', investasiKek: 420, kantorPimpinan: 190, pelabuhanBandara: 160, pengelolaanLahan: 240, humasProtokol: 90, lainnya: 80, total: 1180, pekerjaanJabatan: 'Managing Director, Investment Director, CEO Korporasi', contohAcara: 'Eksplorasi Lahan Industri & Fasilitasi Perizinan KEK' },
      { kategori: 'Delegasi Asing & Konsulat', investasiKek: 140, kantorPimpinan: 110, pelabuhanBandara: 70, pengelolaanLahan: 40, humasProtokol: 80, lainnya: 30, total: 470, pekerjaanJabatan: 'Duta Besar, Konsul Jenderal, Trade Commissioner', contohAcara: 'Courtesy Call Pimpinan & Tinjauan Ekosistem Batam' },
      { kategori: 'Lembaga Pendidikan/Akademia', investasiKek: 50, kantorPimpinan: 40, pelabuhanBandara: 60, pengelolaanLahan: 50, humasProtokol: 90, lainnya: 60, total: 350, pekerjaanJabatan: 'Rektor, Dosen Peneliti, Mahasiswa Pascasarjana', contohAcara: 'Kuliah Kerja Lapangan & Penelitian Manajemen Kawasan' },
      { kategori: 'Organisasi Masyarakat/LSM', investasiKek: 30, kantorPimpinan: 50, pelabuhanBandara: 40, pengelolaanLahan: 60, humasProtokol: 60, lainnya: 40, total: 280, pekerjaanJabatan: 'Tokoh Lembaga Adat, Pengurus Ormas, Asosiasi Profesi', contohAcara: 'Audiensi Pembangunan Fasilitas Sosial & Lingkungan' },
      { kategori: 'Media Massa Nasional/Lokal', investasiKek: 20, kantorPimpinan: 30, pelabuhanBandara: 25, pengelolaanLahan: 15, humasProtokol: 110, lainnya: 20, total: 220, pekerjaanJabatan: 'Pemimpin Redaksi, Jurnalis Senior, Kontributor Media', contohAcara: 'Media Gathering & Wawancara Khusus Progres Batam' },
    ],
    '2025': [
      { kategori: 'Instansi Pemerintah', investasiKek: 250, kantorPimpinan: 310, pelabuhanBandara: 190, pengelolaanLahan: 170, humasProtokol: 160, lainnya: 80, total: 1160, pekerjaanJabatan: 'Kementerian Keuangan, Kemenko Perekonomian, DPRD', contohAcara: 'Koordinasi Regulasi Fiskal & Evaluasi Kinerja KPBPB' },
      { kategori: 'Investor & Pelaku Usaha', investasiKek: 370, kantorPimpinan: 170, pelabuhanBandara: 140, pengelolaanLahan: 210, humasProtokol: 80, lainnya: 70, total: 1040, pekerjaanJabatan: 'Direktur Operasional, Konsorsium Bisnis Multinasional', contohAcara: 'Survei Site KEK Nongsa Digital Park & Sei Lekop' },
      { kategori: 'Delegasi Asing & Konsulat', investasiKek: 120, kantorPimpinan: 95, pelabuhanBandara: 60, pengelolaanLahan: 35, humasProtokol: 70, lainnya: 25, total: 405, pekerjaanJabatan: 'Atase Perdagangan, KADIN Negara Sahabat', contohAcara: 'Bilateral Trade Meeting & Ekspedisi Jalur Maritim' },
      { kategori: 'Lembaga Pendidikan/Akademia', investasiKek: 45, kantorPimpinan: 35, pelabuhanBandara: 50, pengelolaanLahan: 40, humasProtokol: 80, lainnya: 50, total: 300, pekerjaanJabatan: 'Dekan Fakultas Ekonomi, Peneliti Kebijakan Publik', contohAcara: 'Studi Banding Praktik Terbaik Pengelolaan Kawasan FTZ' },
      { kategori: 'Organisasi Masyarakat/LSM', investasiKek: 25, kantorPimpinan: 45, pelabuhanBandara: 35, pengelolaanLahan: 50, humasProtokol: 55, lainnya: 35, total: 245, pekerjaanJabatan: 'Pengurus Kerukunan Warga, Asosiasi Maritim', contohAcara: 'Sosialisasi Pemberdayaan Tenaga Kerja Tempatan' },
      { kategori: 'Media Massa Nasional/Lokal', investasiKek: 18, kantorPimpinan: 25, pelabuhanBandara: 20, pengelolaanLahan: 12, humasProtokol: 95, lainnya: 18, total: 188, pekerjaanJabatan: 'Koresponden Media Nasional, Koordinator Liputan', contohAcara: 'Press Tour Infrastruktur Jalan & Pelabuhan Batu Ampar' },
    ],
  },

  // =========================================================================
  // KARTU 5: Pelayanan Keprotokolan (Tertutup, perbulan)
  // =========================================================================
  pelayananKeprotokolan: {
    '2026': [
      { bulan: 'Jan', dilayani: 28, terlaksana: 27, persentase: 96.4, contohUraian: 'Penyambutan Kunjungan Kerja Menteri Koordinator Perekonomian', hariTanggal: 'Kamis, 15 Jan 2026' },
      { bulan: 'Feb', dilayani: 31, terlaksana: 30, persentase: 96.8, contohUraian: 'Pengawalan Protokol Tamu Diplomatik Duta Besar Perancis', hariTanggal: 'Selasa, 10 Feb 2026' },
      { bulan: 'Mar', dilayani: 34, terlaksana: 33, persentase: 97.1, contohUraian: 'Upacara Serah Terima Jabatan & Pelantikan Pejabat Struktural', hariTanggal: 'Jumat, 20 Mar 2026' },
      { bulan: 'Apr', dilayani: 36, terlaksana: 35, persentase: 97.2, contohUraian: 'Penyambutan Delegasi Bisnis Temasek Holdings Singapura', hariTanggal: 'Rabu, 08 Apr 2026' },
      { bulan: 'Mei', dilayani: 32, terlaksana: 31, persentase: 96.9, contohUraian: 'Fasilitasi Protokoler Acara Groundbreaking Pabrik Baterai EV', hariTanggal: 'Senin, 18 Mei 2026' },
      { bulan: 'Jun', dilayani: 38, terlaksana: 37, persentase: 97.4, contohUraian: 'Kunjungan Kerja Spesifik Komisi VI DPR RI ke BP Batam', hariTanggal: 'Kamis, 11 Jun 2026' },
      { bulan: 'Jul', dilayani: 40, terlaksana: 39, persentase: 97.5, contohUraian: 'Jamuan Makan Malam Kenegaraan Batam Investment Summit', hariTanggal: 'Sabtu, 25 Jul 2026' },
      { bulan: 'Agu', dilayani: 35, terlaksana: 34, persentase: 97.1, contohUraian: 'Upacara Peringatan Detik-Detik Proklamasi Kemerdekaan RI', hariTanggal: 'Senin, 17 Agu 2026' },
      { bulan: 'Sep', dilayani: 33, terlaksana: 32, persentase: 97.0, contohUraian: 'Kunjungan Kerja Tim Asistensi Kementerian Koordinator Polkam', hariTanggal: 'Rabu, 09 Sep 2026' },
      { bulan: 'Okt', dilayani: 42, terlaksana: 41, persentase: 97.6, contohUraian: 'Rangkaian Upacara & Resepsi Peringatan Hari Bakti BP Batam', hariTanggal: 'Senin, 26 Okt 2026' },
      { bulan: 'Nov', dilayani: 34, terlaksana: 33, persentase: 97.1, contohUraian: 'Penyambutan Delegasi World Free Zones Organization (WFZO)', hariTanggal: 'Kamis, 12 Nov 2026' },
      { bulan: 'Des', dilayani: 36, terlaksana: 35, persentase: 97.2, contohUraian: 'Fasilitasi Protokol Rapat Terbuka Akhir Tahun Badan Pengusahaan Batam', hariTanggal: 'Selasa, 22 Des 2026' },
    ],
    '2025': [
      { bulan: 'Jan', dilayani: 25, terlaksana: 24, persentase: 96.0, contohUraian: 'Kunjungan Kerja Gubernur Lemhannas RI', hariTanggal: 'Rabu, 22 Jan 2025' },
      { bulan: 'Feb', dilayani: 27, terlaksana: 26, persentase: 96.3, contohUraian: 'Audiensi Konsul Jenderal Australia di Medan & Batam', hariTanggal: 'Kamis, 13 Feb 2025' },
      { bulan: 'Mar', dilayani: 30, terlaksana: 29, persentase: 96.7, contohUraian: 'Pengawalan Protokoler Inspeksi Lapangan Terminal Kontainer', hariTanggal: 'Senin, 17 Mar 2025' },
      { bulan: 'Apr', dilayani: 32, terlaksana: 31, persentase: 96.9, contohUraian: 'Penyambutan Delegasi Kamar Dagang Korea Selatan (KOCHAM)', hariTanggal: 'Selasa, 15 Apr 2025' },
      { bulan: 'Mei', dilayani: 29, terlaksana: 28, persentase: 96.6, contohUraian: 'Fasilitasi VIP Penandatanganan MoU Konsorsium Bandara', hariTanggal: 'Jumat, 09 Mei 2025' },
      { bulan: 'Jun', dilayani: 34, terlaksana: 33, persentase: 97.1, contohUraian: 'Kunjungan Lapangan Rombongan Dewan Riset Nasional', hariTanggal: 'Kamis, 19 Jun 2025' },
      { bulan: 'Jul', dilayani: 36, terlaksana: 35, persentase: 97.2, contohUraian: 'Gala Dinner Batam International Maritim Forum', hariTanggal: 'Sabtu, 12 Jul 2025' },
      { bulan: 'Agu', dilayani: 31, terlaksana: 30, persentase: 96.8, contohUraian: 'Upacara HUT RI ke-80 Tingkat Badan Pengusahaan Batam', hariTanggal: 'Minggu, 17 Agu 2025' },
      { bulan: 'Sep', dilayani: 28, terlaksana: 27, persentase: 96.4, contohUraian: 'Penerimaan Tamu Kehormatan Panglima Komando Gabungan Wilayah', hariTanggal: 'Senin, 08 Sep 2025' },
      { bulan: 'Okt', dilayani: 38, terlaksana: 37, persentase: 97.4, contohUraian: 'Peringatan Hari Bakti ke-54 BP Batam & Ramah Tamah Veteran', hariTanggal: 'Minggu, 26 Okt 2025' },
      { bulan: 'Nov', dilayani: 30, terlaksana: 29, persentase: 96.7, contohUraian: 'Fasilitasi Pertemuan Tahunan Pimpinan Mitra Perbankan', hariTanggal: 'Rabu, 19 Nov 2025' },
      { bulan: 'Des', dilayani: 33, terlaksana: 32, persentase: 97.0, contohUraian: 'Resepsi Apresiasi Insan Media & Mitra Strategis Batam', hariTanggal: 'Jumat, 19 Des 2025' },
    ],
  },

  // =========================================================================
  // KARTU 6: Permohonan Bantuan (Terbuka, persemester)
  // =========================================================================
  permohonanBantuan: {
    '2026': [
      { semester: '2026-S1', tahun: '2026', sosial: 48, keagamaan: 42, olahraga: 26, pendidikan: 32, kebencanaan: 12, lainnya: 14, total: 174 },
      { semester: '2026-S2', tahun: '2026', sosial: 54, keagamaan: 46, olahraga: 30, pendidikan: 38, kebencanaan: 8, lainnya: 16, total: 192 },
    ],
    '2025': [
      { semester: '2025-S1', tahun: '2025', sosial: 42, keagamaan: 36, olahraga: 22, pendidikan: 28, kebencanaan: 15, lainnya: 11, total: 154 },
      { semester: '2025-S2', tahun: '2025', sosial: 46, keagamaan: 40, olahraga: 25, pendidikan: 31, kebencanaan: 9, lainnya: 13, total: 164 },
    ],
    '2024': [
      { semester: '2024-S1', tahun: '2024', sosial: 38, keagamaan: 32, olahraga: 18, pendidikan: 24, kebencanaan: 10, lainnya: 9, total: 131 },
      { semester: '2024-S2', tahun: '2024', sosial: 41, keagamaan: 35, olahraga: 21, pendidikan: 27, kebencanaan: 7, lainnya: 12, total: 143 },
    ],
  },

  // =========================================================================
  // KARTU 7: Permohonan Informasi Publik dan Indeks Keterbukaan
  // =========================================================================
  permohonanInformasi: {
    '2026': [
      { bulan: 'Jan', permohonan: 12, selesai: 12, contohInformasiDiminta: 'Data Masterplan Pengembangan KEK Nongsa Digital Park & Sei Lekop' },
      { bulan: 'Feb', permohonan: 14, selesai: 14, contohInformasiDiminta: 'Statistik Rekapitulasi Arus Peti Kemas Pelabuhan Batu Ampar TA 2025' },
      { bulan: 'Mar', permohonan: 16, selesai: 15, contohInformasiDiminta: 'Salinan Perka BP Batam tentang Tarif Layanan UWT & Pemanfaatan Lahan' },
      { bulan: 'Apr', permohonan: 18, selesai: 18, contohInformasiDiminta: 'Informasi Realisasi Investasi PMA Sektor Elektronika & Semikonduktor' },
      { bulan: 'Mei', permohonan: 15, selesai: 15, contohInformasiDiminta: 'Peta Rencana Tata Ruang Kawasan Strategis Barelang & Sempadan Pantai' },
      { bulan: 'Jun', permohonan: 19, selesai: 18, contohInformasiDiminta: 'Daftar Perizinan Lingkungan & Rekap Penanganan Limbah B3 KPLI Kabil' },
      { bulan: 'Jul', permohonan: 21, selesai: 20, contohInformasiDiminta: 'Laporan Keuangan Audited BLU BP Batam & Opini BPK Tahun Sebelumnya' },
      { bulan: 'Agu', permohonan: 17, selesai: 17, contohInformasiDiminta: 'Statistik Kunjungan Penumpang Ferry Domestik & Internasional Harbour Bay' },
      { bulan: 'Sep', permohonan: 15, selesai: 15, contohInformasiDiminta: 'Data Teknis & Kapasitas Instalasi Pengolahan Air (IPA) Waduk Duriangkang' },
      { bulan: 'Okt', permohonan: 22, selesai: 22, contohInformasiDiminta: 'Daftar Mitra Penyewa Rusunawa Pekerja & Alur Pengajuan Hunian' },
      { bulan: 'Nov', permohonan: 16, selesai: 16, contohInformasiDiminta: 'Regulasi Alur Perizinan Pemasukan Barang Konsumsi & Kuota Logistik' },
      { bulan: 'Des', permohonan: 20, selesai: 19, contohInformasiDiminta: 'Ringkasan Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) 2026' },
    ],
    '2025': [
      { bulan: 'Jan', permohonan: 10, selesai: 10, contohInformasiDiminta: 'Statistik Luas Lahan Tersedia di 9 Sub Wilayah Pengembangan' },
      { bulan: 'Feb', permohonan: 11, selesai: 11, contohInformasiDiminta: 'Salinan Kepka tentang Standar Pelayanan Minimal Rumah Sakit BP Batam' },
      { bulan: 'Mar', permohonan: 13, selesai: 13, contohInformasiDiminta: 'Informasi Prosedur Perpanjangan UWT Hunian & Komersial' },
      { bulan: 'Apr', permohonan: 15, selesai: 14, contohInformasiDiminta: 'Data Trafik Penerbangan Kargo di Bandara Hang Nadim 2024' },
      { bulan: 'Mei', permohonan: 12, selesai: 12, contohInformasiDiminta: 'Dokumen Kerjasama Konsorsium Bandara Angkasa Pura - Incheon' },
      { bulan: 'Jun', permohonan: 16, selesai: 16, contohInformasiDiminta: 'Rekapitulasi Layanan Perizinan OSS MPP Batam Centre' },
      { bulan: 'Jul', permohonan: 17, selesai: 16, contohInformasiDiminta: 'Rencana Pembangunan Jaringan Jalan & Jalur Transportasi Publik' },
      { bulan: 'Agu', permohonan: 14, selesai: 14, contohInformasiDiminta: 'Data Demografi Kepegawaian BP Batam & Sistem Seleksi Terbuka' },
      { bulan: 'Sep', permohonan: 13, selesai: 13, contohInformasiDiminta: 'Data Pemanfaatan Fasilitas Kesehatan Unggulan Cardiac Centre RSBP' },
      { bulan: 'Okt', permohonan: 18, selesai: 18, contohInformasiDiminta: 'Laporan Capaian Kinerja Program Pengembangan Kawasan Strategis' },
      { bulan: 'Nov', permohonan: 14, selesai: 14, contohInformasiDiminta: 'Informasi Pengadaan Barang & Jasa Lewat LPSE BP Batam' },
      { bulan: 'Des', permohonan: 16, selesai: 15, contohInformasiDiminta: 'Data Evaluasi Kepuasan Pengguna Layanan Terpadu Satu Pintu' },
    ],
  },

  indeksKeterbukaan5Tahun: [
    { tahun: '2022', nilaiIndeks: 86.40, predikat: 'Informatif', inovasi: 'Peluncuran Aplikasi PPID Online Mobile BP Batam', ketersediaanInformasi: 'Katalog DIP Terbuka 78%' },
    { tahun: '2023', nilaiIndeks: 89.20, predikat: 'Informatif', inovasi: 'Integrasi Single Sign-On Pemohon Informasi & Dashboard Lacak Status', ketersediaanInformasi: 'Katalog DIP Terbuka 84%' },
    { tahun: '2024', nilaiIndeks: 91.80, predikat: 'Menuju Informatif Unggul', inovasi: 'Penyediaan Format Open Data (JSON/CSV) untuk Peneliti & Industri', ketersediaanInformasi: 'Katalog DIP Terbuka 89%' },
    { tahun: '2025', nilaiIndeks: 93.50, predikat: 'Badan Publik Informatif', inovasi: 'Layanan Desk Informasi Ramah Disabilitas & AI FAQ Assistant', ketersediaanInformasi: 'Katalog DIP Terbuka 93%' },
    { tahun: '2026', nilaiIndeks: 95.20, predikat: 'Informatif Terbaik Nasional', inovasi: 'Portal Satu Data Terpadu Real-time API & Transparansi Regulasi Digital', ketersediaanInformasi: 'Katalog DIP Terbuka 97%' },
  ],

  // =========================================================================
  // KARTU 8: Kerja Sama dan Koordinasi Antar Lembaga (3 Tab)
  // =========================================================================
  mouAntarLembaga: {
    '2026': [
      {
        triwulan: 'TW 1',
        infrastruktur: 4,
        investasiKek: 5,
        pengusahaan: 3,
        pelayananUmum: 2,
        total: 14,
        nomorMou: 'MoU/01/BPH/01/2026',
        uraian: 'Kemitraan Pembangunan Pusat Logistik Terpadu Kabil bersama Pelindo & Kemenhub',
        kurunWaktu: 'Jan 2026 - Jan 2029 (3 Tahun)',
        sisaHari: 720,
      },
      {
        triwulan: 'TW 2',
        infrastruktur: 3,
        investasiKek: 6,
        pengusahaan: 4,
        pelayananUmum: 3,
        total: 16,
        nomorMou: 'MoU/14/BPH/04/2026',
        uraian: 'Kerjasama Pertukaran Data Kawasan Industri Berikat dengan DJBC & LNSW',
        kurunWaktu: 'Apr 2026 - Apr 2028 (2 Tahun)',
        sisaHari: 520,
      },
      {
        triwulan: 'TW 3',
        infrastruktur: 5,
        investasiKek: 4,
        pengusahaan: 2,
        pelayananUmum: 4,
        total: 15,
        nomorMou: 'MoU/22/BPH/07/2026',
        uraian: 'Pemanfaatan Riset & Magang Talenta Digital KEK bersama Politeknik Negeri Batam',
        kurunWaktu: 'Jul 2026 - Des 2026 (6 Bulan)',
        sisaHari: 65, // < 90 hari (Peringatan oranye)
      },
      {
        triwulan: 'TW 4',
        infrastruktur: 3,
        investasiKek: 5,
        pengusahaan: 3,
        pelayananUmum: 3,
        total: 14,
        nomorMou: 'MoU/31/BPH/10/2026',
        uraian: 'Konsolidasi Jaringan Transmisi Listrik Energi Terbarukan bersama PT PLN Batam',
        kurunWaktu: 'Okt 2026 - Okt 2031 (5 Tahun)',
        sisaHari: 1200,
      },
    ],
    '2025': [
      {
        triwulan: 'TW 1',
        infrastruktur: 3,
        investasiKek: 4,
        pengusahaan: 3,
        pelayananUmum: 2,
        total: 12,
        nomorMou: 'MoU/03/BPH/02/2025',
        uraian: 'Integrasi Layanan Perizinan Maritim Terpadu bersama KSOP Khusus Batam',
        kurunWaktu: 'Feb 2025 - Feb 2028',
        sisaHari: 450,
      },
      {
        triwulan: 'TW 2',
        infrastruktur: 4,
        investasiKek: 5,
        pengusahaan: 2,
        pelayananUmum: 3,
        total: 14,
        nomorMou: 'MoU/11/BPH/05/2025',
        uraian: 'Pengembangan Jaringan Telekomunikasi Bawah Laut bersama Telkom Indonesia',
        kurunWaktu: 'Mei 2025 - Mei 2028',
        sisaHari: 540,
      },
      {
        triwulan: 'TW 3',
        infrastruktur: 3,
        investasiKek: 4,
        pengusahaan: 3,
        pelayananUmum: 2,
        total: 12,
        nomorMou: 'MoU/19/BPH/08/2025',
        uraian: 'Pendampingan Hukum Pengadaan Tanah & Aset Negara bersama Kejati Kepri',
        kurunWaktu: 'Agu 2025 - Agu 2027',
        sisaHari: 280,
      },
      {
        triwulan: 'TW 4',
        infrastruktur: 4,
        investasiKek: 3,
        pengusahaan: 4,
        pelayananUmum: 3,
        total: 14,
        nomorMou: 'MoU/28/BPH/11/2025',
        uraian: 'Sinergi Penegakan Ketertiban Kawasan Hutan Lindung bersama Polda Kepri',
        kurunWaktu: 'Nov 2025 - Nov 2028',
        sisaHari: 610,
      },
    ],
  },

  koordinasiLayanan: {
    '2026': [
      { kategori: 'Fasilitasi Audiensi Kementerian & Lembaga Pusat', jumlah: 28, lokasi: 'Jakarta (Kemenko Perekonomian, BKPM, Kemenhub)', tanggalKegiatan: 'Rutin Mingguan TA 2026' },
      { kategori: 'Harmonisasi Regulasi Lintas Sektor & Pemda', jumlah: 24, lokasi: 'Batam Centre & Kantor Gubernur Kepri Dompak', tanggalKegiatan: 'Setiap Triwulan TA 2026' },
      { kategori: 'Rapat Koordinasi Dewan Kawasan PBPB Batam', jumlah: 16, lokasi: 'Gedung Ali Sadikin / Kantor Menko Perekonomian RI', tanggalKegiatan: 'Siklus Berkala Triwulanan' },
      { kategori: 'Pendampingan Tim Penilai Kinerja & Audit K/L', jumlah: 18, lokasi: 'Kantor BIDA Batam Centre', tanggalKegiatan: 'Semester I & II 2026' },
      { kategori: 'Layanan Mediasi & Koordinasi Konflik Kawasan', jumlah: 12, lokasi: 'Ruang Mediasi Gedung BPH Batam', tanggalKegiatan: 'Sesuai Kasus Lapangan' },
      { kategori: 'Fasilitasi Hubungan Diplomatik & Kedutaan Asing', jumlah: 14, lokasi: 'Jakarta & Batam', tanggalKegiatan: 'Bulan Berjalan 2026' },
    ],
    '2025': [
      { kategori: 'Fasilitasi Audiensi Kementerian & Lembaga Pusat', jumlah: 24, lokasi: 'Jakarta (BKPM, Bappenas, Kemenkeu)', tanggalKegiatan: 'Rutin TA 2025' },
      { kategori: 'Harmonisasi Regulasi Lintas Sektor & Pemda', jumlah: 20, lokasi: 'Batam & Tanjungpinang', tanggalKegiatan: 'Triwulan I - IV 2025' },
      { kategori: 'Rapat Koordinasi Dewan Kawasan PBPB Batam', jumlah: 14, lokasi: 'Jakarta', tanggalKegiatan: 'Siklus Triwulanan 2025' },
      { kategori: 'Pendampingan Tim Penilai Kinerja & Audit K/L', jumlah: 16, lokasi: 'Batam Centre', tanggalKegiatan: 'Semesteran 2025' },
      { kategori: 'Layanan Mediasi & Koordinasi Konflik Kawasan', jumlah: 10, lokasi: 'Batam', tanggalKegiatan: 'Insidental 2025' },
      { kategori: 'Fasilitasi Hubungan Diplomatik & Kedutaan Asing', jumlah: 12, lokasi: 'Jakarta & Batam', tanggalKegiatan: 'Sepanjang 2025' },
    ],
  },

  mitraJakartaList: [
    { no: 1, namaInstansi: 'Kementerian Koordinator Bidang Perekonomian RI', kategori: 'Kementerian Pembina', alamat: 'Jl. Lapangan Banteng Timur No. 2-4, Pasar Baru, Jakarta Pusat', fokusKerjasama: 'Sekretariat Dewan Kawasan KPBPB Batam, Bintan, Karimun', status: 'Mitra Utama' },
    { no: 2, namaInstansi: 'Kementerian Investasi / Badan Koordinasi Penanaman Modal (BKPM)', kategori: 'Kementerian Teknis', alamat: 'Jl. Jend. Gatot Subroto No. 44, Kebayoran Baru, Jakarta Selatan', fokusKerjasama: 'Integrasi Sistem OSS Berbasis Risiko & Promosi Investasi Global', status: 'Aktif Sinergis' },
    { no: 3, namaInstansi: 'Kementerian Keuangan RI (Ditjen Bea Cukai & DJA)', kategori: 'Fiskal & Keuangan', alamat: 'Jl. Dr. Wahidin Raya No. 1, Pasar Baru, Sawah Besar, Jakarta Pusat', fokusKerjasama: 'Fasilitas Kepabeanan FTZ, Anggaran DIPA & Optimalisasi PNBP BLU', status: 'Aktif Sinergis' },
    { no: 4, namaInstansi: 'Kementerian Perhubungan RI (Ditjen Hubla & Hubud)', kategori: 'Kementerian Teknis', alamat: 'Jl. Medan Merdeka Barat No. 8, Gambir, Jakarta Pusat', fokusKerjasama: 'Kelaikan Pelabuhan Batu Ampar & Kawasan Keselamatan Bandara', status: 'Aktif Sinergis' },
    { no: 5, namaInstansi: 'Kementerian ATR / Badan Pertanahan Nasional (BPN)', kategori: 'Pertanahan', alamat: 'Jl. Sisingamangaraja No. 2, Selong, Kebayoran Baru, Jakarta Selatan', fokusKerjasama: 'Sinkronisasi Hak Pengelolaan Lahan (HPL) & Sertifikasi Digital', status: 'Aktif Sinergis' },
    { no: 6, namaInstansi: 'Kementerian Pendayagunaan Aparatur Negara & RB (KemenPAN-RB)', kategori: 'Tata Kelola', alamat: 'Jl. Jend. Sudirman Kav. 69, Senayan, Jakarta Selatan', fokusKerjasama: 'Evaluasi SAKIP, Kelembagaan BLU, Mal Pelayanan Publik (MPP)', status: 'Aktif Sinergis' },
    { no: 7, namaInstansi: 'Kantor Perwakilan BP Batam di Jakarta', kategori: 'Unit BP Batam', alamat: 'Jl. D.I. Panjaitan No. 24, Cawang, Jakarta Timur', fokusKerjasama: 'Pusat Layanan Informasi, Diplomasi Antar Lembaga & Promosi', status: 'Kantor Perwakilan' },
    { no: 8, namaInstansi: 'Badan Pengawasan Keuangan dan Pembangunan (BPKP Pusat)', kategori: 'Pengawasan', alamat: 'Jl. Pramuka No. 33, Utan Kayu Utara, Matraman, Jakarta Timur', fokusKerjasama: 'Pendampingan Tata Kelola SPIP, Good Corporate Governance & MRI', status: 'Konsultan Pengawas' },
  ],
};
