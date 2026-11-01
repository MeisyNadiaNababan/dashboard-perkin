/**
 * Master Data Dummy Visualisasi Direktorat Pengawasan Infrastruktur BP Batam
 * Sesuai arahan: unit baru pengganti Dit. Pengamanan Aset pada Deep Dive DEP-A7.
 * Semua data disimpan dalam 1 objek JSON/TypeScript terpadu agar mudah disubstitusi data riil.
 */

export interface PengawasanPaketItem {
  id: string;
  kode: string;
  namaPaket: string;
  subdirektorat:
    | 'Pembangunan Jalan dan Jembatan'
    | 'Pembangunan Drainase'
    | 'Pembangunan Gedung'
    | 'Pematangan Tanah';
  kontraktor: string;
  supervisi: string;
  rencanaPersen: number;
  realisasiPersen: number;
  deviasiPoin: number; // Realisasi - Rencana
  jenisKendala:
    | 'Cuaca'
    | 'Pembebasan Lahan'
    | 'Ketersediaan Material'
    | 'Perizinan'
    | 'Utilitas Eksisting'
    | 'Tidak Ada Kendala';
  kurvaSBulanan: {
    bulan: string;
    rencana: number;
    realisasi: number | null;
  }[];
}

export interface TemuanPengawasanItem {
  id: string;
  paket: string;
  temuan: string;
  kategori: 'Mutu Pekerjaan' | 'K3' | 'Administrasi' | 'Lingkungan' | 'Waktu';
  tingkatKeparahan: 'Ringan' | 'Sedang' | 'Berat';
  bulan: string;
  batasWaktu: string;
  status: 'Selesai' | 'Proses' | 'Belum';
}

export interface InspeksiLapanganItem {
  id: string;
  tanggal: string;
  bulan: string;
  paket: string;
  lokasi: string;
  hasilInspeksi: string;
  kategori: string;
}

export interface SerahTerimaItem {
  tahun: string;
  phoSelesai: number;
  masaPemeliharaan: number;
  fhoSelesai: number;
}

export interface PengawasanInfrastrukturMasterData {
  paketPengawasan: PengawasanPaketItem[];
  rekapTemuanKategoriKeparahan: {
    kategori: 'Mutu Pekerjaan' | 'K3' | 'Administrasi' | 'Lingkungan' | 'Waktu';
    Ringan: number;
    Sedang: number;
    Berat: number;
    total: number;
  }[];
  statusTindakLanjutBulanan: {
    bulan: string;
    Selesai: number;
    Proses: number;
    Belum: number;
  }[];
  daftarTemuanTabel: TemuanPengawasanItem[];
  konsultanSupervisiBeban: {
    supervisi: string;
    jumlahPaket: number;
    rataRataProgres: number;
    daftarPaket: string[];
  }[];
  inspeksiBulanan: {
    bulan: string;
    jumlahInspeksi: number;
  }[];
  daftarInspeksiTabel: InspeksiLapanganItem[];
  rekapSerahTerimaTahunan: SerahTerimaItem[];
}

export const PENGAWASAN_INFRASTRUKTUR_MASTER_DATA: PengawasanInfrastrukturMasterData = {
  // =========================================================================
  // 1. DATASET PENGAWASAN PROGRES (20 PAKET PEKERJAAN KONSTRUKSI DUMMY)
  // Sifat Data: Terbatas (usulan)
  // =========================================================================
  paketPengawasan: [
    {
      id: 'PK-01',
      kode: 'PK-01',
      namaPaket: 'Pembangunan Flyover Sei Ladi & Penataan Simpang',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kontraktor: 'PT Wijaya Karya (Persero) Tbk',
      supervisi: 'PT Virama Karya (Persero)',
      rencanaPersen: 90.5,
      realisasiPersen: 92.4,
      deviasiPoin: 1.9,
      jenisKendala: 'Utilitas Eksisting',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 5.0, realisasi: 6.2 },
        { bulan: 'Feb', rencana: 15.0, realisasi: 16.5 },
        { bulan: 'Mar', rencana: 30.0, realisasi: 32.0 },
        { bulan: 'Apr', rencana: 48.0, realisasi: 51.5 },
        { bulan: 'Mei', rencana: 65.0, realisasi: 68.0 },
        { bulan: 'Jun', rencana: 78.0, realisasi: 80.5 },
        { bulan: 'Jul', rencana: 85.0, realisasi: 87.0 },
        { bulan: 'Agt', rencana: 88.0, realisasi: 90.2 },
        { bulan: 'Sep', rencana: 90.5, realisasi: 92.4 },
        { bulan: 'Okt', rencana: 94.0, realisasi: null },
        { bulan: 'Nov', rencana: 97.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-02',
      kode: 'PK-02',
      namaPaket: 'Pelebaran Jalan Sudirman Tahap 4 (Jalur Cepat)',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kontraktor: 'PT Adhi Karya (Persero) Tbk',
      supervisi: 'PT Yodya Karya',
      rencanaPersen: 82.0,
      realisasiPersen: 78.5,
      deviasiPoin: -3.5,
      jenisKendala: 'Cuaca',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.5, realisasi: 4.2 },
        { bulan: 'Feb', rencana: 12.0, realisasi: 11.8 },
        { bulan: 'Mar', rencana: 25.0, realisasi: 23.5 },
        { bulan: 'Apr', rencana: 42.0, realisasi: 39.0 },
        { bulan: 'Mei', rencana: 58.0, realisasi: 54.5 },
        { bulan: 'Jun', rencana: 68.0, realisasi: 64.0 },
        { bulan: 'Jul', rencana: 74.0, realisasi: 70.5 },
        { bulan: 'Agt', rencana: 78.0, realisasi: 75.0 },
        { bulan: 'Sep', rencana: 82.0, realisasi: 78.5 },
        { bulan: 'Okt', rencana: 88.0, realisasi: null },
        { bulan: 'Nov', rencana: 95.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-03',
      kode: 'PK-03',
      namaPaket: 'Pembangunan Kolam Retensi Baloi & Saluran Primer',
      subdirektorat: 'Pembangunan Drainase',
      kontraktor: 'PT Brantas Abipraya (Persero)',
      supervisi: 'PT Bina Karya (Persero)',
      rencanaPersen: 72.0,
      realisasiPersen: 68.2,
      deviasiPoin: -3.8,
      jenisKendala: 'Pembebasan Lahan',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 3.0, realisasi: 2.8 },
        { bulan: 'Feb', rencana: 10.0, realisasi: 9.5 },
        { bulan: 'Mar', rencana: 22.0, realisasi: 20.0 },
        { bulan: 'Apr', rencana: 36.0, realisasi: 33.5 },
        { bulan: 'Mei', rencana: 48.0, realisasi: 45.0 },
        { bulan: 'Jun', rencana: 58.0, realisasi: 54.0 },
        { bulan: 'Jul', rencana: 64.0, realisasi: 60.5 },
        { bulan: 'Agt', rencana: 68.0, realisasi: 64.8 },
        { bulan: 'Sep', rencana: 72.0, realisasi: 68.2 },
        { bulan: 'Okt', rencana: 80.0, realisasi: null },
        { bulan: 'Nov', rencana: 90.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-04',
      kode: 'PK-04',
      namaPaket: 'Normalisasi Drainase Primer Sukajadi Batam Center',
      subdirektorat: 'Pembangunan Drainase',
      kontraktor: 'PT Hutama Karya Infrastruktur',
      supervisi: 'PT Indah Karya',
      rencanaPersen: 81.0,
      realisasiPersen: 84.1,
      deviasiPoin: 3.1,
      jenisKendala: 'Tidak Ada Kendala',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 6.0, realisasi: 6.5 },
        { bulan: 'Feb', rencana: 18.0, realisasi: 19.5 },
        { bulan: 'Mar', rencana: 32.0, realisasi: 34.0 },
        { bulan: 'Apr', rencana: 49.0, realisasi: 52.0 },
        { bulan: 'Mei', rencana: 62.0, realisasi: 65.5 },
        { bulan: 'Jun', rencana: 72.0, realisasi: 75.0 },
        { bulan: 'Jul', rencana: 76.0, realisasi: 79.2 },
        { bulan: 'Agt', rencana: 79.0, realisasi: 82.0 },
        { bulan: 'Sep', rencana: 81.0, realisasi: 84.1 },
        { bulan: 'Okt', rencana: 88.0, realisasi: null },
        { bulan: 'Nov', rencana: 94.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-05',
      kode: 'PK-05',
      namaPaket: 'Pematangan Lahan Rempang Eco-City Zona A (280 Ha)',
      subdirektorat: 'Pematangan Tanah',
      kontraktor: 'PT Pembangunan Perumahan (Persero) Tbk',
      supervisi: 'PT Ciriajasa Cipta Mandiri',
      rencanaPersen: 84.5,
      realisasiPersen: 86.8,
      deviasiPoin: 2.3,
      jenisKendala: 'Cuaca',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 5.5, realisasi: 6.0 },
        { bulan: 'Feb', rencana: 16.0, realisasi: 17.5 },
        { bulan: 'Mar', rencana: 30.0, realisasi: 32.5 },
        { bulan: 'Apr', rencana: 46.0, realisasi: 49.0 },
        { bulan: 'Mei', rencana: 60.0, realisasi: 63.5 },
        { bulan: 'Jun', rencana: 71.0, realisasi: 74.0 },
        { bulan: 'Jul', rencana: 78.0, realisasi: 80.2 },
        { bulan: 'Agt', rencana: 82.0, realisasi: 84.5 },
        { bulan: 'Sep', rencana: 84.5, realisasi: 86.8 },
        { bulan: 'Okt', rencana: 90.0, realisasi: null },
        { bulan: 'Nov', rencana: 96.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    // PAKET DENGAN DEVIASI KRITIS < -10 POIN (WARNA AKSEN)
    {
      id: 'PK-06',
      kode: 'PK-06',
      namaPaket: 'Pematangan Lahan KEK Batam Aero Technic Tahap 3',
      subdirektorat: 'Pematangan Tanah',
      kontraktor: 'PT Jaya Konstruksi MP Tbk',
      supervisi: 'PT Delta Buana Konsultan',
      rencanaPersen: 56.0,
      realisasiPersen: 42.5,
      deviasiPoin: -13.5, // < -10 (AKSEN KRITIS)
      jenisKendala: 'Ketersediaan Material',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.0, realisasi: 3.5 },
        { bulan: 'Feb', rencana: 12.0, realisasi: 9.8 },
        { bulan: 'Mar', rencana: 24.0, realisasi: 18.2 },
        { bulan: 'Apr', rencana: 35.0, realisasi: 26.5 },
        { bulan: 'Mei', rencana: 42.0, realisasi: 31.0 },
        { bulan: 'Jun', rencana: 48.0, realisasi: 35.2 },
        { bulan: 'Jul', rencana: 51.0, realisasi: 38.0 },
        { bulan: 'Agt', rencana: 54.0, realisasi: 40.5 },
        { bulan: 'Sep', rencana: 56.0, realisasi: 42.5 },
        { bulan: 'Okt', rencana: 70.0, realisasi: null },
        { bulan: 'Nov', rencana: 85.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    // PAKET DENGAN DEVIASI KRITIS < -10 POIN (WARNA AKSEN)
    {
      id: 'PK-07',
      kode: 'PK-07',
      namaPaket: 'Pembangunan Gedung Pusat Logistik & Arsip BP Batam',
      subdirektorat: 'Pembangunan Gedung',
      kontraktor: 'PT Nindya Karya (Persero)',
      supervisi: 'PT Artefak Arkindo',
      rencanaPersen: 52.5,
      realisasiPersen: 38.0,
      deviasiPoin: -14.5, // < -10 (AKSEN KRITIS)
      jenisKendala: 'Perizinan',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 3.0, realisasi: 2.0 },
        { bulan: 'Feb', rencana: 10.0, realisasi: 7.5 },
        { bulan: 'Mar', rencana: 20.0, realisasi: 14.0 },
        { bulan: 'Apr', rencana: 32.0, realisasi: 22.0 },
        { bulan: 'Mei', rencana: 40.0, realisasi: 27.5 },
        { bulan: 'Jun', rencana: 45.0, realisasi: 31.0 },
        { bulan: 'Jul', rencana: 48.0, realisasi: 33.5 },
        { bulan: 'Agt', rencana: 50.0, realisasi: 35.8 },
        { bulan: 'Sep', rencana: 52.5, realisasi: 38.0 },
        { bulan: 'Okt', rencana: 68.0, realisasi: null },
        { bulan: 'Nov', rencana: 84.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-08',
      kode: 'PK-08',
      namaPaket: 'Revitalisasi Gedung Klinik Rawat Inap RSBP Sekupang',
      subdirektorat: 'Pembangunan Gedung',
      kontraktor: 'PT Total Bangun Persada Tbk',
      supervisi: 'PT Cipta Multi Kreasi',
      rencanaPersen: 74.0,
      realisasiPersen: 71.5,
      deviasiPoin: -2.5,
      jenisKendala: 'Tidak Ada Kendala',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 6.0, realisasi: 5.5 },
        { bulan: 'Feb', rencana: 16.0, realisasi: 15.0 },
        { bulan: 'Mar', rencana: 28.0, realisasi: 27.0 },
        { bulan: 'Apr', rencana: 42.0, realisasi: 40.5 },
        { bulan: 'Mei', rencana: 54.0, realisasi: 52.0 },
        { bulan: 'Jun', rencana: 62.0, realisasi: 59.8 },
        { bulan: 'Jul', rencana: 68.0, realisasi: 65.2 },
        { bulan: 'Agt', rencana: 71.0, realisasi: 68.5 },
        { bulan: 'Sep', rencana: 74.0, realisasi: 71.5 },
        { bulan: 'Okt', rencana: 84.0, realisasi: null },
        { bulan: 'Nov', rencana: 92.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-09',
      kode: 'PK-09',
      namaPaket: 'Peningkatan Jalan Akses Kargo Pelabuhan Batu Ampar',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kontraktor: 'PT Waskita Karya (Persero) Tbk',
      supervisi: 'PT Seecons Engineering',
      rencanaPersen: 68.0,
      realisasiPersen: 63.8,
      deviasiPoin: -4.2,
      jenisKendala: 'Utilitas Eksisting',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.0, realisasi: 3.8 },
        { bulan: 'Feb', rencana: 11.5, realisasi: 10.5 },
        { bulan: 'Mar', rencana: 23.0, realisasi: 21.0 },
        { bulan: 'Apr', rencana: 36.0, realisasi: 33.2 },
        { bulan: 'Mei', rencana: 48.0, realisasi: 44.5 },
        { bulan: 'Jun', rencana: 56.0, realisasi: 52.0 },
        { bulan: 'Jul', rencana: 62.0, realisasi: 58.0 },
        { bulan: 'Agt', rencana: 65.0, realisasi: 61.2 },
        { bulan: 'Sep', rencana: 68.0, realisasi: 63.8 },
        { bulan: 'Okt', rencana: 78.0, realisasi: null },
        { bulan: 'Nov', rencana: 90.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    // PAKET DENGAN DEVIASI KRITIS < -10 POIN (WARNA AKSEN)
    {
      id: 'PK-10',
      kode: 'PK-10',
      namaPaket: 'Pembangunan JPO Ikonik Penghubung Batam Center',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kontraktor: 'PT Sumber Rancang Bangun',
      supervisi: 'PT Multi Konsultan',
      rencanaPersen: 46.5,
      realisasiPersen: 34.5,
      deviasiPoin: -12.0, // < -10 (AKSEN KRITIS)
      jenisKendala: 'Perizinan',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 3.5, realisasi: 2.5 },
        { bulan: 'Feb', rencana: 9.0, realisasi: 6.8 },
        { bulan: 'Mar', rencana: 18.0, realisasi: 13.0 },
        { bulan: 'Apr', rencana: 28.0, realisasi: 20.5 },
        { bulan: 'Mei', rencana: 35.0, realisasi: 25.5 },
        { bulan: 'Jun', rencana: 39.0, realisasi: 28.5 },
        { bulan: 'Jul', rencana: 42.0, realisasi: 31.0 },
        { bulan: 'Agt', rencana: 44.5, realisasi: 32.8 },
        { bulan: 'Sep', rencana: 46.5, realisasi: 34.5 },
        { bulan: 'Okt', rencana: 64.0, realisasi: null },
        { bulan: 'Nov', rencana: 82.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-11',
      kode: 'PK-11',
      namaPaket: 'Normalisasi Sungai Jodoh & Penguatan Dinding Beton',
      subdirektorat: 'Pembangunan Drainase',
      kontraktor: 'PT Bumi Karsa',
      supervisi: 'PT Duta Graha Konsultan',
      rencanaPersen: 54.0,
      realisasiPersen: 46.2,
      deviasiPoin: -7.8,
      jenisKendala: 'Pembebasan Lahan',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 3.0, realisasi: 2.2 },
        { bulan: 'Feb', rencana: 9.5, realisasi: 8.0 },
        { bulan: 'Mar', rencana: 19.0, realisasi: 16.0 },
        { bulan: 'Apr', rencana: 30.0, realisasi: 25.5 },
        { bulan: 'Mei', rencana: 38.0, realisasi: 32.0 },
        { bulan: 'Jun', rencana: 44.0, realisasi: 37.5 },
        { bulan: 'Jul', rencana: 48.0, realisasi: 41.0 },
        { bulan: 'Agt', rencana: 51.5, realisasi: 44.0 },
        { bulan: 'Sep', rencana: 54.0, realisasi: 46.2 },
        { bulan: 'Okt', rencana: 70.0, realisasi: null },
        { bulan: 'Nov', rencana: 85.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-12',
      kode: 'PK-12',
      namaPaket: 'Pembangunan Pintu Air & Rumah Pompa Banjir Marina',
      subdirektorat: 'Pembangunan Drainase',
      kontraktor: 'PT Minarta Dutahutama',
      supervisi: 'PT Prima Desain Konsulindo',
      rencanaPersen: 64.0,
      realisasiPersen: 58.0,
      deviasiPoin: -6.0,
      jenisKendala: 'Ketersediaan Material',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.0, realisasi: 3.2 },
        { bulan: 'Feb', rencana: 12.0, realisasi: 10.5 },
        { bulan: 'Mar', rencana: 24.0, realisasi: 21.0 },
        { bulan: 'Apr', rencana: 37.0, realisasi: 32.5 },
        { bulan: 'Mei', rencana: 47.0, realisasi: 42.0 },
        { bulan: 'Jun', rencana: 54.0, realisasi: 48.5 },
        { bulan: 'Jul', rencana: 58.5, realisasi: 52.8 },
        { bulan: 'Agt', rencana: 61.5, realisasi: 55.6 },
        { bulan: 'Sep', rencana: 64.0, realisasi: 58.0 },
        { bulan: 'Okt', rencana: 76.0, realisasi: null },
        { bulan: 'Nov', rencana: 88.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-13',
      kode: 'PK-13',
      namaPaket: 'Pematangan Lahan Kawasan Industri Kabil Terpadu',
      subdirektorat: 'Pematangan Tanah',
      kontraktor: 'PT Bangun Cipta Kontraktor',
      supervisi: 'PT Geodinamik Konsultan',
      rencanaPersen: 80.0,
      realisasiPersen: 82.0,
      deviasiPoin: 2.0,
      jenisKendala: 'Tidak Ada Kendala',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 5.0, realisasi: 5.5 },
        { bulan: 'Feb', rencana: 15.0, realisasi: 16.0 },
        { bulan: 'Mar', rencana: 28.0, realisasi: 29.5 },
        { bulan: 'Apr', rencana: 44.0, realisasi: 46.0 },
        { bulan: 'Mei', rencana: 58.0, realisasi: 60.5 },
        { bulan: 'Jun', rencana: 68.0, realisasi: 70.2 },
        { bulan: 'Jul', rencana: 73.0, realisasi: 75.5 },
        { bulan: 'Agt', rencana: 77.0, realisasi: 79.2 },
        { bulan: 'Sep', rencana: 80.0, realisasi: 82.0 },
        { bulan: 'Okt', rencana: 88.0, realisasi: null },
        { bulan: 'Nov', rencana: 95.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    // PAKET DENGAN DEVIASI KRITIS < -10 POIN (WARNA AKSEN)
    {
      id: 'PK-14',
      kode: 'PK-14',
      namaPaket: 'Pematangan Tanah Relokasi Warga Dapur 6 Rempang',
      subdirektorat: 'Pematangan Tanah',
      kontraktor: 'PT Modern Surya Jaya',
      supervisi: 'PT Bina Mandiri Rekayasa',
      rencanaPersen: 60.5,
      realisasiPersen: 49.0,
      deviasiPoin: -11.5, // < -10 (AKSEN KRITIS)
      jenisKendala: 'Cuaca',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.0, realisasi: 3.0 },
        { bulan: 'Feb', rencana: 11.5, realisasi: 9.0 },
        { bulan: 'Mar', rencana: 23.0, realisasi: 17.5 },
        { bulan: 'Apr', rencana: 36.0, realisasi: 28.0 },
        { bulan: 'Mei', rencana: 46.0, realisasi: 36.0 },
        { bulan: 'Jun', rencana: 52.0, realisasi: 41.5 },
        { bulan: 'Jul', rencana: 56.0, realisasi: 44.8 },
        { bulan: 'Agt', rencana: 58.5, realisasi: 47.0 },
        { bulan: 'Sep', rencana: 60.5, realisasi: 49.0 },
        { bulan: 'Okt', rencana: 74.0, realisasi: null },
        { bulan: 'Nov', rencana: 88.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-15',
      kode: 'PK-15',
      namaPaket: 'Pembangunan Gedung Lab Uji Lingkungan BP Batam',
      subdirektorat: 'Pembangunan Gedung',
      kontraktor: 'PT Pulauintan Bajaperkasa Konstruksi',
      supervisi: 'PT Pola Data Konsultan',
      rencanaPersen: 65.0,
      realisasiPersen: 61.5,
      deviasiPoin: -3.5,
      jenisKendala: 'Perizinan',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.5, realisasi: 4.0 },
        { bulan: 'Feb', rencana: 12.5, realisasi: 11.5 },
        { bulan: 'Mar', rencana: 24.0, realisasi: 22.0 },
        { bulan: 'Apr', rencana: 38.0, realisasi: 35.5 },
        { bulan: 'Mei', rencana: 48.0, realisasi: 45.0 },
        { bulan: 'Jun', rencana: 55.0, realisasi: 51.8 },
        { bulan: 'Jul', rencana: 59.0, realisasi: 55.6 },
        { bulan: 'Agt', rencana: 62.0, realisasi: 58.8 },
        { bulan: 'Sep', rencana: 65.0, realisasi: 61.5 },
        { bulan: 'Okt', rencana: 78.0, realisasi: null },
        { bulan: 'Nov', rencana: 90.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-16',
      kode: 'PK-16',
      namaPaket: 'Pembangunan Terminal Penumpang Telaga Punggur Tahap 2',
      subdirektorat: 'Pembangunan Gedung',
      kontraktor: 'PT Tripatra Engineering',
      supervisi: 'PT Surya Abadi Mandiri',
      rencanaPersen: 56.0,
      realisasiPersen: 53.2,
      deviasiPoin: -2.8,
      jenisKendala: 'Tidak Ada Kendala',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.0, realisasi: 3.5 },
        { bulan: 'Feb', rencana: 11.0, realisasi: 10.0 },
        { bulan: 'Mar', rencana: 21.0, realisasi: 19.5 },
        { bulan: 'Apr', rencana: 33.0, realisasi: 31.0 },
        { bulan: 'Mei', rencana: 42.0, realisasi: 39.5 },
        { bulan: 'Jun', rencana: 48.0, realisasi: 45.0 },
        { bulan: 'Jul', rencana: 52.0, realisasi: 49.0 },
        { bulan: 'Agt', rencana: 54.5, realisasi: 51.5 },
        { bulan: 'Sep', rencana: 56.0, realisasi: 53.2 },
        { bulan: 'Okt', rencana: 70.0, realisasi: null },
        { bulan: 'Nov', rencana: 85.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-17',
      kode: 'PK-17',
      namaPaket: 'Pembangunan Jalan Lingkar Luar Sei Lekop - Sagulung',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kontraktor: 'PT Nusa Raya Cipta Tbk',
      supervisi: 'PT Prisma Engineering',
      rencanaPersen: 68.5,
      realisasiPersen: 65.0,
      deviasiPoin: -3.5,
      jenisKendala: 'Utilitas Eksisting',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 4.0, realisasi: 3.8 },
        { bulan: 'Feb', rencana: 12.0, realisasi: 11.0 },
        { bulan: 'Mar', rencana: 24.0, realisasi: 22.5 },
        { bulan: 'Apr', rencana: 38.0, realisasi: 35.8 },
        { bulan: 'Mei', rencana: 50.0, realisasi: 47.0 },
        { bulan: 'Jun', rencana: 58.0, realisasi: 54.5 },
        { bulan: 'Jul', rencana: 63.0, realisasi: 59.5 },
        { bulan: 'Agt', rencana: 66.0, realisasi: 62.5 },
        { bulan: 'Sep', rencana: 68.5, realisasi: 65.0 },
        { bulan: 'Okt', rencana: 80.0, realisasi: null },
        { bulan: 'Nov', rencana: 92.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-18',
      kode: 'PK-18',
      namaPaket: 'Saluran Sekunder Tiban Kampung Pengendali Genangan',
      subdirektorat: 'Pembangunan Drainase',
      kontraktor: 'PT Jaya Mandiri Konstruksi',
      supervisi: 'PT Griya Teknika',
      rencanaPersen: 75.0,
      realisasiPersen: 76.5,
      deviasiPoin: 1.5,
      jenisKendala: 'Tidak Ada Kendala',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 5.0, realisasi: 5.5 },
        { bulan: 'Feb', rencana: 15.0, realisasi: 16.0 },
        { bulan: 'Mar', rencana: 28.0, realisasi: 29.5 },
        { bulan: 'Apr', rencana: 44.0, realisasi: 45.8 },
        { bulan: 'Mei', rencana: 56.0, realisasi: 58.0 },
        { bulan: 'Jun', rencana: 64.0, realisasi: 66.0 },
        { bulan: 'Jul', rencana: 69.0, realisasi: 71.0 },
        { bulan: 'Agt', rencana: 72.5, realisasi: 74.0 },
        { bulan: 'Sep', rencana: 75.0, realisasi: 76.5 },
        { bulan: 'Okt', rencana: 86.0, realisasi: null },
        { bulan: 'Nov', rencana: 94.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    // PAKET DENGAN DEVIASI KRITIS < -10 POIN (WARNA AKSEN)
    {
      id: 'PK-19',
      kode: 'PK-19',
      namaPaket: 'Pematangan Lahan Terminal Kargo Bandara Hang Nadim',
      subdirektorat: 'Pematangan Tanah',
      kontraktor: 'PT Tunas Baru Konstruksi',
      supervisi: 'PT Wahana Konsultan Cipta',
      rencanaPersen: 45.0,
      realisasiPersen: 29.0,
      deviasiPoin: -16.0, // < -10 (AKSEN KRITIS)
      jenisKendala: 'Ketersediaan Material',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 3.0, realisasi: 2.0 },
        { bulan: 'Feb', rencana: 8.5, realisasi: 5.8 },
        { bulan: 'Mar', rencana: 16.0, realisasi: 10.5 },
        { bulan: 'Apr', rencana: 25.0, realisasi: 16.0 },
        { bulan: 'Mei', rencana: 32.0, realisasi: 20.5 },
        { bulan: 'Jun', rencana: 37.0, realisasi: 23.5 },
        { bulan: 'Jul', rencana: 40.5, realisasi: 25.8 },
        { bulan: 'Agt', rencana: 43.0, realisasi: 27.5 },
        { bulan: 'Sep', rencana: 45.0, realisasi: 29.0 },
        { bulan: 'Okt', rencana: 62.0, realisasi: null },
        { bulan: 'Nov', rencana: 80.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
    {
      id: 'PK-20',
      kode: 'PK-20',
      namaPaket: 'Pembangunan Jembatan Sei Tiram Pengganti Gelagar Baja',
      subdirektorat: 'Pembangunan Jalan dan Jembatan',
      kontraktor: 'PT Krakatau Engineering',
      supervisi: 'PT Rekayasa Rekanindo',
      rencanaPersen: 76.0,
      realisasiPersen: 73.0,
      deviasiPoin: -3.0,
      jenisKendala: 'Cuaca',
      kurvaSBulanan: [
        { bulan: 'Jan', rencana: 5.0, realisasi: 4.5 },
        { bulan: 'Feb', rencana: 14.0, realisasi: 13.0 },
        { bulan: 'Mar', rencana: 27.0, realisasi: 25.5 },
        { bulan: 'Apr', rencana: 42.0, realisasi: 40.0 },
        { bulan: 'Mei', rencana: 54.0, realisasi: 51.5 },
        { bulan: 'Jun', rencana: 63.0, realisasi: 60.0 },
        { bulan: 'Jul', rencana: 69.0, realisasi: 66.0 },
        { bulan: 'Agt', rencana: 73.0, realisasi: 70.0 },
        { bulan: 'Sep', rencana: 76.0, realisasi: 73.0 },
        { bulan: 'Okt', rencana: 86.0, realisasi: null },
        { bulan: 'Nov', rencana: 94.0, realisasi: null },
        { bulan: 'Des', rencana: 100.0, realisasi: null },
      ],
    },
  ],

  // =========================================================================
  // 2. DATASET TEMUAN PENGAWASAN PER KATEGORI & TINGKAT KEPARAHAN
  // Sifat Data: Terbatas (usulan)
  // =========================================================================
  rekapTemuanKategoriKeparahan: [
    { kategori: 'Mutu Pekerjaan', Ringan: 14, Sedang: 9, Berat: 4, total: 27 },
    { kategori: 'K3', Ringan: 18, Sedang: 11, Berat: 3, total: 32 },
    { kategori: 'Administrasi', Ringan: 12, Sedang: 6, Berat: 2, total: 20 },
    { kategori: 'Lingkungan', Ringan: 9, Sedang: 7, Berat: 2, total: 18 },
    { kategori: 'Waktu', Ringan: 6, Sedang: 10, Berat: 5, total: 21 },
  ],

  // =========================================================================
  // 3. STATUS TINDAK LANJUT TEMUAN PER BULAN (JAN - DES)
  // Sifat Data: Terbatas (usulan)
  // =========================================================================
  statusTindakLanjutBulanan: [
    { bulan: 'Jan', Selesai: 8, Proses: 2, Belum: 0 },
    { bulan: 'Feb', Selesai: 11, Proses: 3, Belum: 1 },
    { bulan: 'Mar', Selesai: 14, Proses: 4, Belum: 1 },
    { bulan: 'Apr', Selesai: 16, Proses: 5, Belum: 2 },
    { bulan: 'Mei', Selesai: 15, Proses: 6, Belum: 2 },
    { bulan: 'Jun', Selesai: 13, Proses: 7, Belum: 3 },
    { bulan: 'Jul', Selesai: 12, Proses: 8, Belum: 3 },
    { bulan: 'Agt', Selesai: 10, Proses: 9, Belum: 4 },
    { bulan: 'Sep', Selesai: 9, Proses: 8, Belum: 4 },
    { bulan: 'Okt', Selesai: 0, Proses: 0, Belum: 0 },
    { bulan: 'Nov', Selesai: 0, Proses: 0, Belum: 0 },
    { bulan: 'Des', Selesai: 0, Proses: 0, Belum: 0 },
  ],

  // TABEL RINCIAN TEMUAN PENGAWASAN
  daftarTemuanTabel: [
    {
      id: 'TM-01',
      paket: 'Flyover Sei Ladi',
      temuan: 'Pemasangan rambu K3 malam hari pada area crossing utilitas kurang memadai',
      kategori: 'K3',
      tingkatKeparahan: 'Sedang',
      bulan: 'September',
      batasWaktu: '05 Okt 2026',
      status: 'Selesai',
    },
    {
      id: 'TM-02',
      paket: 'Pelebaran Jalan Sudirman',
      temuan: 'Slump test beton rigid pavement lajur lambat di bawah spesifikasi (8 cm vs min 10 cm)',
      kategori: 'Mutu Pekerjaan',
      tingkatKeparahan: 'Berat',
      bulan: 'September',
      batasWaktu: '28 Sep 2026',
      status: 'Proses',
    },
    {
      id: 'TM-03',
      paket: 'Gedung Pusat Logistik',
      temuan: 'Keterlambatan shop drawing struktur atap baja bentang 32 meter',
      kategori: 'Waktu',
      tingkatKeparahan: 'Berat',
      bulan: 'September',
      batasWaktu: '30 Sep 2026',
      status: 'Belum',
    },
    {
      id: 'TM-04',
      paket: 'Pematangan KEK Batam Aero',
      temuan: 'Pemadatan lapis tanah zona hanggar 4 belum mencapai 98% standar proctor',
      kategori: 'Mutu Pekerjaan',
      tingkatKeparahan: 'Berat',
      bulan: 'Agustus',
      batasWaktu: '15 Sep 2026',
      status: 'Proses',
    },
    {
      id: 'TM-05',
      paket: 'JPO Ikonik Batam Center',
      temuan: 'Izin amdal lalu lintas dan pengalihan trayek malam belum ditandatangani PPK & Dishub',
      kategori: 'Administrasi',
      tingkatKeparahan: 'Sedang',
      bulan: 'Agustus',
      batasWaktu: '20 Sep 2026',
      status: 'Belum',
    },
    {
      id: 'TM-06',
      paket: 'Kolam Retensi Baloi Indah',
      temuan: 'Sedimen runoff galian tanah mencemari saluran sekunder perumahan warga sekitar',
      kategori: 'Lingkungan',
      tingkatKeparahan: 'Sedang',
      bulan: 'Agustus',
      batasWaktu: '10 Sep 2026',
      status: 'Selesai',
    },
    {
      id: 'TM-07',
      paket: 'Normalisasi Sungai Jodoh',
      temuan: 'Penimbunan sisa material bongkaran bronjong menutup akses jalan inspeksi darurat',
      kategori: 'Lingkungan',
      tingkatKeparahan: 'Ringan',
      bulan: 'Juli',
      batasWaktu: '15 Agu 2026',
      status: 'Selesai',
    },
    {
      id: 'TM-08',
      paket: 'Pintu Air Pompa Marina',
      temuan: 'Sertifikat kalibrasi manometer uji tekan pipa submersible belum diperbarui',
      kategori: 'Administrasi',
      tingkatKeparahan: 'Ringan',
      bulan: 'Juli',
      batasWaktu: '30 Agu 2026',
      status: 'Selesai',
    },
    {
      id: 'TM-09',
      paket: 'Terminal Kargo Hang Nadim',
      temuan: 'Mobilisasi dump truck tidak menggunakan terpal penutup sehingga menimbulkan debu',
      kategori: 'Lingkungan',
      tingkatKeparahan: 'Sedang',
      bulan: 'September',
      batasWaktu: '08 Okt 2026',
      status: 'Proses',
    },
    {
      id: 'TM-10',
      paket: 'Jembatan Sei Tiram',
      temuan: 'Pekerja bekisting pierhead tidak mengenakan safety harness di ketinggian > 2 meter',
      kategori: 'K3',
      tingkatKeparahan: 'Berat',
      bulan: 'September',
      batasWaktu: '25 Sep 2026',
      status: 'Selesai',
    },
  ],

  // =========================================================================
  // 4. KONSULTAN SUPERVISI & BEBAN PAKET
  // Sifat Data: Terbatas (usulan)
  // =========================================================================
  konsultanSupervisiBeban: [
    {
      supervisi: 'PT Virama Karya (Persero)',
      jumlahPaket: 2,
      rataRataProgres: 92.4,
      daftarPaket: ['Flyover Sei Ladi & Penataan Simpang'],
    },
    {
      supervisi: 'PT Yodya Karya',
      jumlahPaket: 2,
      rataRataProgres: 78.5,
      daftarPaket: ['Pelebaran Jalan Sudirman Tahap 4'],
    },
    {
      supervisi: 'PT Bina Karya (Persero)',
      jumlahPaket: 2,
      rataRataProgres: 68.2,
      daftarPaket: ['Pembangunan Kolam Retensi Baloi'],
    },
    {
      supervisi: 'PT Indah Karya',
      jumlahPaket: 1,
      rataRataProgres: 84.1,
      daftarPaket: ['Normalisasi Drainase Primer Batam Center'],
    },
    {
      supervisi: 'PT Ciriajasa Cipta Mandiri',
      jumlahPaket: 2,
      rataRataProgres: 86.8,
      daftarPaket: ['Pematangan Lahan Rempang Eco-City Zona A'],
    },
    {
      supervisi: 'PT Delta Buana Konsultan',
      jumlahPaket: 1,
      rataRataProgres: 42.5,
      daftarPaket: ['Pematangan Lahan KEK Batam Aero Technic'],
    },
    {
      supervisi: 'PT Artefak Arkindo',
      jumlahPaket: 2,
      rataRataProgres: 38.0,
      daftarPaket: ['Pembangunan Gedung Pusat Logistik & Arsip'],
    },
    {
      supervisi: 'PT Cipta Multi Kreasi',
      jumlahPaket: 1,
      rataRataProgres: 71.5,
      daftarPaket: ['Revitalisasi Gedung Klinik Rawat Inap RSBP'],
    },
    {
      supervisi: 'PT Multi Konsultan',
      jumlahPaket: 2,
      rataRataProgres: 34.5,
      daftarPaket: ['Pembangunan JPO Ikonik Batam Center'],
    },
    {
      supervisi: 'PT Wahana Konsultan Cipta',
      jumlahPaket: 2,
      rataRataProgres: 29.0,
      daftarPaket: ['Pematangan Lahan Kargo Hang Nadim'],
    },
    {
      supervisi: 'PT Rekayasa Rekanindo',
      jumlahPaket: 1,
      rataRataProgres: 73.0,
      daftarPaket: ['Pembangunan Jembatan Sei Tiram'],
    },
    {
      supervisi: 'PT Geodinamik Konsultan',
      jumlahPaket: 1,
      rataRataProgres: 82.0,
      daftarPaket: ['Pematangan Kawasan Industri Kabil'],
    },
  ],

  // =========================================================================
  // 5. INSPEKSI LAPANGAN BULANAN & TABEL LOG INSPEKSI
  // Sifat Data: Terbatas (usulan)
  // =========================================================================
  inspeksiBulanan: [
    { bulan: 'Januari', jumlahInspeksi: 12 },
    { bulan: 'Februari', jumlahInspeksi: 18 },
    { bulan: 'Maret', jumlahInspeksi: 24 },
    { bulan: 'April', jumlahInspeksi: 31 },
    { bulan: 'Mei', jumlahInspeksi: 28 },
    { bulan: 'Juni', jumlahInspeksi: 26 },
    { bulan: 'Juli', jumlahInspeksi: 29 },
    { bulan: 'Agustus', jumlahInspeksi: 34 },
    { bulan: 'September', jumlahInspeksi: 38 },
    { bulan: 'Oktober', jumlahInspeksi: 15 },
    { bulan: 'November', jumlahInspeksi: 0 },
    { bulan: 'Desember', jumlahInspeksi: 0 },
  ],

  daftarInspeksiTabel: [
    {
      id: 'INS-01',
      tanggal: '24 Sep 2026',
      bulan: 'September',
      paket: 'Flyover Sei Ladi',
      lokasi: 'Abutmen 2 & Simpang Jam',
      hasilInspeksi: 'Uji pembebanan dinamis gelagar girder lulus toleransi defleksi < 2 mm.',
      kategori: 'Struktur Jembatan',
    },
    {
      id: 'INS-02',
      tanggal: '22 Sep 2026',
      bulan: 'September',
      paket: 'Pelebaran Jalan Sudirman',
      lokasi: 'STA 4+100 Jalur Cepat',
      hasilInspeksi: 'Tebal core drill aspal AC-WC memenuhi syarat tebal desain 4.0 cm.',
      kategori: 'Perkerasan Jalan',
    },
    {
      id: 'INS-03',
      tanggal: '18 Sep 2026',
      bulan: 'September',
      paket: 'Gedung Pusat Logistik',
      lokasi: 'Lantai 1 Zona Arsip',
      hasilInspeksi: 'Instalasi grounding penangkal petir belum terpasang sesuai standar PUIL.',
      kategori: 'MEP & Utilitas',
    },
    {
      id: 'INS-04',
      tanggal: '15 Sep 2026',
      bulan: 'September',
      paket: 'Kolam Retensi Baloi',
      lokasi: 'Inlet Tanggul Barat',
      hasilInspeksi: 'Pemasangan retaining wall pasangan batu kali sesuai elevasi gambar kerja.',
      kategori: 'Drainase & Tanah',
    },
    {
      id: 'INS-05',
      tanggal: '10 Sep 2026',
      bulan: 'September',
      paket: 'Pematangan Rempang BSW',
      lokasi: 'Zona Industri A2',
      hasilInspeksi: 'Kepadatan timbunan lapis ke-8 mencapai CBR 8.5% (Target min 6.0%).',
      kategori: 'Pematangan Tanah',
    },
    {
      id: 'INS-06',
      tanggal: '05 Sep 2026',
      bulan: 'September',
      paket: 'Jembatan Sei Tiram',
      lokasi: 'Pier P1 Sisi Muara',
      hasilInspeksi: 'Mutu beton pierhead K-350 umur 28 hari mencapai 362 kg/cm² (Memenuhi).',
      kategori: 'Uji Kuat Tekan',
    },
    {
      id: 'INS-07',
      tanggal: '28 Agu 2026',
      bulan: 'Agustus',
      paket: 'Pintu Air Marina',
      lokasi: 'Chamber Pompa 1',
      hasilInspeksi: 'Simulasi buka-tutup pintu air otomatis berjalan normal dalam 90 detik.',
      kategori: 'Uji Fungsi Mekanikal',
    },
  ],

  // =========================================================================
  // 6. SERAH TERIMA PEKERJAAN PER TAHUN (2023 - 2026 BERJALAN)
  // Sifat Data: Terbatas (usulan)
  // =========================================================================
  rekapSerahTerimaTahunan: [
    {
      tahun: '2023',
      phoSelesai: 22,
      masaPemeliharaan: 4,
      fhoSelesai: 18,
    },
    {
      tahun: '2024',
      phoSelesai: 25,
      masaPemeliharaan: 6,
      fhoSelesai: 21,
    },
    {
      tahun: '2025',
      phoSelesai: 28,
      masaPemeliharaan: 8,
      fhoSelesai: 24,
    },
    {
      tahun: '2026 (Berjalan)',
      phoSelesai: 6,
      masaPemeliharaan: 14,
      fhoSelesai: 8,
    },
  ],
};
