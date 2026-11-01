/**
 * Master Data Dummy Realistis untuk Unit "Pusat Pelayanan Terpadu Satu Pintu" (PTSP) BP Batam
 * Sesuai Kamus KPI & Dokumen Layanan Perizinan Terpadu BP Batam
 * Semua data dikemas dalam satu objek JSON agar mudah diintegrasikan dengan database / API backend.
 * Catatan: IKM Pengguna Layanan PTSP TIDAK DIVISUALISASIKAN karena sudah tertera di Perkin Utama.
 */

export interface PermohonanPerizinanItem {
  bulan: string;
  masuk: number;
  proses: number;
  selesai: number;
  ditolak: number;
  total: number;
  namaPerizinanTeratas: string;
  statusModalDominan: string; // PMA / PMDN
  persenSelesai: number;
}

export interface InvestasiSektorItem {
  sektor: string;
  rencanaInvestasi: number; // Rp Miliar
  realisasiInvestasi: number; // Rp Miliar
  persenRealisasi: number;
  pemenuhanStandarUsaha: string; // e.g. "98.2% Terpenuhi (Audit KBLI)"
  tenagaKerjaTki: number;
  tenagaKerjaTka: number;
  totalTenagaKerja: number;
}

export interface PenyelesaianLayananItem {
  id: string;
  jenisLayanan: string;
  kategori: string;
  layananMasuk: number;
  layananSelesai: number;
  persenCapaian: number; // (selesai / masuk) * 100
  standarSlaHari: number;
  realisasiHari: number;
}

export interface NonPerizinanItem {
  jenisNonPerizinan: string;
  masuk: number;
  proses: number;
  selesai: number;
  tolak: number;
  total: number;
  slaRataRata: string;
}

export interface PengaduanMasyarakatItem {
  saluran: string;
  selesai: number;
  belumSelesai: number;
  total: number;
  persenSelesai: number;
  jenisPengaduanTerbanyak: string;
  kodeSampel: string;
  solusiPenyelesaian: string;
}

export interface BongkarMuatItem {
  jenisMuatan: string;
  volumeBongkarMuat: number; // Ton / TEUs
  satuan: string;
  pelabuhan: string;
  peralatanUtama: string;
  jumlahTkbm: number;
  persenKapasitasDermaga: number;
}

export interface PusatPtspMasterData {
  meta: {
    unit: string;
    namaResmi: string;
    deputi: string;
    lokasiUtama: string;
    kontakHelpdesk: string;
    catatan: string;
  };

  // 1. Permohonan Perizinan Berusaha per Bulan (Dataset: Tertutup, perbulan)
  permohonanPerizinan: {
    filterTahunList: string[];
    filterSektorList: string[];
    filterRisikoList: string[];
    byFilter: Record<
      string,
      {
        totalPermohonan: number;
        totalSelesai: number;
        persenSelesaiRata: number;
        records: PermohonanPerizinanItem[];
      }
    >;
  };

  // 2. Rencana vs Realisasi Investasi per Sektor (Dataset: Tertutup, perbulan)
  investasiPerSektor: {
    filterTahunList: string[];
    filterStatusModalList: string[];
    byFilter: Record<
      string,
      {
        totalRencanaMiliar: number;
        totalRealisasiMiliar: number;
        persenRealisasiTotal: number;
        records: InvestasiSektorItem[];
      }
    >;
  };

  // 3. Penyelesaian Layanan per Jenis Layanan (Dataset: Tertutup, perbulan)
  penyelesaianLayanan: {
    filterTahunList: string[];
    filterBulanList: string[];
    byFilter: Record<
      string,
      {
        totalMasuk: number;
        totalSelesai: number;
        persenTerselesaikanTotal: number;
        records: PenyelesaianLayananItem[];
      }
    >;
  };

  // 4. Layanan Non Perizinan per Jenis (Dataset: Terbuka, perbulan)
  layananNonPerizinan: {
    filterTahunList: string[];
    filterBulanList: string[];
    byFilter: Record<
      string,
      {
        totalPermohonan: number;
        totalSelesai: number;
        records: NonPerizinanItem[];
      }
    >;
  };

  // 5. Pengaduan Masyarakat per Saluran (Dataset: Terbuka, persemester)
  pengaduanMasyarakat: {
    filterTahunList: string[];
    filterSemesterList: string[];
    byFilter: Record<
      string,
      {
        totalPengaduan: number;
        totalSelesai: number;
        persenSelesaiTotal: number;
        records: PengaduanMasyarakatItem[];
      }
    >;
  };

  // 6. Volume Bongkar Muat per Jenis Muatan (Dataset: Tertutup, perbulan)
  bongkarMuat: {
    filterTahunList: string[];
    filterBulanList: string[];
    filterPelabuhanList: string[];
    byFilter: Record<
      string,
      {
        totalVolumeBongkarMuat: number;
        satuanRingkasan: string;
        records: BongkarMuatItem[];
      }
    >;
  };
}

export const PUSAT_PTSP_MASTER_DATA: PusatPtspMasterData = {
  meta: {
    unit: 'PTSP',
    namaResmi: 'Pusat Pelayanan Terpadu Satu Pintu',
    deputi: 'Deputi Bidang Kebijakan Strategis (Deputi A2)',
    lokasiUtama: 'Gedung Mal Pelayanan Publik (MPP) Batam Center',
    kontakHelpdesk: 'ptsp@bpbatam.go.id | 1500-117',
    catatan: 'Data dummy komprehensif tahun 2025-2026 untuk monitoring perizinan berusaha, investasi, SLA layanan, non-perizinan, aduan masyarakat, dan SKKBM',
  },

  // =========================================================================
  // KARTU 1: PERMOHONAN PERIZINAN BERUSAHA PER BULAN
  // =========================================================================
  permohonanPerizinan: {
    filterTahunList: ['2026', '2025'],
    filterSektorList: [
      'Semua Sektor',
      'Industri Manufaktur',
      'Jasa & Perdagangan',
      'Logistik & Maritim',
      'Pariwisata & Properti',
    ],
    filterRisikoList: [
      'Semua Risiko',
      'Tingkat Risiko Rendah',
      'Tingkat Risiko Menengah Rendah',
      'Tingkat Risiko Menengah Tinggi',
      'Tingkat Risiko Tinggi',
    ],
    byFilter: {
      // 2026 - Semua Sektor - Semua Risiko
      '2026-Semua Sektor-Semua Risiko': {
        totalPermohonan: 14820,
        totalSelesai: 13915,
        persenSelesaiRata: 93.9,
        records: [
          { bulan: 'Jan', masuk: 1120, proses: 78, selesai: 1018, ditolak: 24, total: 1120, namaPerizinanTeratas: 'PB-UMKU Peralatan Elektronika & Semikonduktor', statusModalDominan: 'PMA (68%) / PMDN (32%)', persenSelesai: 90.9 },
          { bulan: 'Feb', masuk: 1195, proses: 82, selesai: 1088, ditolak: 25, total: 1195, namaPerizinanTeratas: 'Persetujuan Kesesuaian Tata Ruang (PKKPR)', statusModalDominan: 'PMDN (54%) / PMA (46%)', persenSelesai: 91.0 },
          { bulan: 'Mar', masuk: 1280, proses: 90, selesai: 1162, ditolak: 28, total: 1280, namaPerizinanTeratas: 'Izin Operasional Galangan Kapal & Maritim', statusModalDominan: 'PMA (72%) / PMDN (28%)', persenSelesai: 90.8 },
          { bulan: 'Apr', masuk: 1240, proses: 65, selesai: 1150, ditolak: 25, total: 1240, namaPerizinanTeratas: 'Persetujuan Bangunan Gedung (PBG) Industri', statusModalDominan: 'PMDN (51%) / PMA (49%)', persenSelesai: 92.7 },
          { bulan: 'Mei', masuk: 1310, proses: 72, selesai: 1215, ditolak: 23, total: 1310, namaPerizinanTeratas: 'Izin Lingkungan AMDAL & UKL-UPL Terpadu', statusModalDominan: 'PMA (60%) / PMDN (40%)', persenSelesai: 92.7 },
          { bulan: 'Jun', masuk: 1350, proses: 68, selesai: 1258, ditolak: 24, total: 1350, namaPerizinanTeratas: 'Sertifikat Standar KBLI Industri Perakitan', statusModalDominan: 'PMA (65%) / PMDN (35%)', persenSelesai: 93.2 },
          { bulan: 'Jul', masuk: 1290, proses: 60, selesai: 1208, ditolak: 22, total: 1290, namaPerizinanTeratas: 'Izin Pemasukan Barang Modal Bukan Baru', statusModalDominan: 'PMA (75%) / PMDN (25%)', persenSelesai: 93.6 },
          { bulan: 'Ags', masuk: 1260, proses: 55, selesai: 1184, ditolak: 21, total: 1260, namaPerizinanTeratas: 'Surat Keterangan Bebas PPN/PPnBM Kawasan Bebas', statusModalDominan: 'PMDN (58%) / PMA (42%)', persenSelesai: 94.0 },
          { bulan: 'Sep', masuk: 1225, proses: 52, selesai: 1153, ditolak: 20, total: 1225, namaPerizinanTeratas: 'PB-UMKU Kelistrikan & Energi Terbarukan', statusModalDominan: 'PMA (80%) / PMDN (20%)', persenSelesai: 94.1 },
          { bulan: 'Okt', masuk: 1180, proses: 46, selesai: 1118, ditolak: 16, total: 1180, namaPerizinanTeratas: 'Izin Usaha Kawasan Logistik Berikat', statusModalDominan: 'PMDN (52%) / PMA (48%)', persenSelesai: 94.7 },
          { bulan: 'Nov', masuk: 1110, proses: 38, selesai: 1056, ditolak: 16, total: 1110, namaPerizinanTeratas: 'Persetujuan Ekspor Produk Presisi Tinggi', statusModalDominan: 'PMA (70%) / PMDN (30%)', persenSelesai: 95.1 },
          { bulan: 'Des', masuk: 1060, proses: 32, selesai: 1010, ditolak: 18, total: 1060, namaPerizinanTeratas: 'Perpanjangan Izin Operasional Pergudangan', statusModalDominan: 'PMDN (62%) / PMA (38%)', persenSelesai: 95.3 },
        ],
      },
      // 2026 - Industri Manufaktur
      '2026-Industri Manufaktur-Semua Risiko': {
        totalPermohonan: 6450,
        totalSelesai: 6120,
        persenSelesaiRata: 94.9,
        records: [
          { bulan: 'Jan', masuk: 510, proses: 30, selesai: 470, ditolak: 10, total: 510, namaPerizinanTeratas: 'PB-UMKU Perakitan Komponen Elektronik', statusModalDominan: 'PMA (78%) / PMDN (22%)', persenSelesai: 92.2 },
          { bulan: 'Feb', masuk: 530, proses: 32, selesai: 488, ditolak: 10, total: 530, namaPerizinanTeratas: 'Izin Operasional Manufaktur Presisi Tinggi', statusModalDominan: 'PMA (80%) / PMDN (20%)', persenSelesai: 92.1 },
          { bulan: 'Mar', masuk: 580, proses: 36, selesai: 534, ditolak: 10, total: 580, namaPerizinanTeratas: 'Persetujuan Standar KBLI 26120', statusModalDominan: 'PMA (82%) / PMDN (18%)', persenSelesai: 92.1 },
          { bulan: 'Apr', masuk: 540, proses: 24, selesai: 508, ditolak: 8, total: 540, namaPerizinanTeratas: 'PBG Gedung Pabrik Manufaktur', statusModalDominan: 'PMA (75%) / PMDN (25%)', persenSelesai: 94.1 },
          { bulan: 'Mei', masuk: 570, proses: 26, selesai: 535, ditolak: 9, total: 570, namaPerizinanTeratas: 'Sertifikasi Bebas Bahan B3 Kawasan Industri', statusModalDominan: 'PMA (76%) / PMDN (24%)', persenSelesai: 93.9 },
          { bulan: 'Jun', masuk: 590, proses: 22, selesai: 560, ditolak: 8, total: 590, namaPerizinanTeratas: 'AMDAL Kawasan Industri Terpadu Kabil', statusModalDominan: 'PMA (79%) / PMDN (21%)', persenSelesai: 94.9 },
          { bulan: 'Jul', masuk: 560, proses: 20, selesai: 533, ditolak: 7, total: 560, namaPerizinanTeratas: 'PB-UMKU Pemasukan Mesin Produksi Baru', statusModalDominan: 'PMA (84%) / PMDN (16%)', persenSelesai: 95.2 },
          { bulan: 'Ags', masuk: 540, proses: 18, selesai: 516, ditolak: 6, total: 540, namaPerizinanTeratas: 'Pembebasan Bea PPN Kawasan Bebas Batam', statusModalDominan: 'PMA (81%) / PMDN (19%)', persenSelesai: 95.6 },
          { bulan: 'Sep', masuk: 530, proses: 16, selesai: 508, ditolak: 6, total: 530, namaPerizinanTeratas: 'Perluasan Lahan Pabrik Muka Kuning', statusModalDominan: 'PMA (85%) / PMDN (15%)', persenSelesai: 95.8 },
          { bulan: 'Okt', masuk: 510, proses: 14, selesai: 491, ditolak: 5, total: 510, namaPerizinanTeratas: 'Izin Operasional Pengujian Produk Cleanroom', statusModalDominan: 'PMA (86%) / PMDN (14%)', persenSelesai: 96.3 },
          { bulan: 'Nov', masuk: 490, proses: 12, selesai: 474, ditolak: 4, total: 490, namaPerizinanTeratas: 'Sertifikat Kelayakan Mesin Industri Otomasi', statusModalDominan: 'PMA (82%) / PMDN (18%)', persenSelesai: 96.7 },
          { bulan: 'Des', masuk: 500, proses: 10, selesai: 485, ditolak: 5, total: 500, namaPerizinanTeratas: 'Perpanjangan Sertifikat K3 Manufaktur', statusModalDominan: 'PMA (77%) / PMDN (23%)', persenSelesai: 97.0 },
        ],
      },
      // 2026 - Logistik & Maritim
      '2026-Logistik & Maritim-Semua Risiko': {
        totalPermohonan: 4180,
        totalSelesai: 3950,
        persenSelesaiRata: 94.5,
        records: [
          { bulan: 'Jan', masuk: 320, proses: 24, selesai: 290, ditolak: 6, total: 320, namaPerizinanTeratas: 'Izin Pemanfaatan Garis Pantai & Jetty', statusModalDominan: 'PMA (55%) / PMDN (45%)', persenSelesai: 90.6 },
          { bulan: 'Feb', masuk: 340, proses: 25, selesai: 308, ditolak: 7, total: 340, namaPerizinanTeratas: 'Surat Izin Bongkar Muat Bahan Berbahaya', statusModalDominan: 'PMDN (60%) / PMA (40%)', persenSelesai: 90.6 },
          { bulan: 'Mar', masuk: 370, proses: 28, selesai: 335, ditolak: 7, total: 370, namaPerizinanTeratas: 'Izin Operasional Galangan Kapal Offshore', statusModalDominan: 'PMA (65%) / PMDN (35%)', persenSelesai: 90.5 },
          { bulan: 'Apr', masuk: 350, proses: 20, selesai: 324, ditolak: 6, total: 350, namaPerizinanTeratas: 'PKKPR Zona Perairan Pelabuhan Batu Ampar', statusModalDominan: 'PMDN (58%) / PMA (42%)', persenSelesai: 92.6 },
          { bulan: 'Mei', masuk: 360, proses: 22, selesai: 332, ditolak: 6, total: 360, namaPerizinanTeratas: 'Perpanjangan Izin Depo Peti Kemas', statusModalDominan: 'PMA (52%) / PMDN (48%)', persenSelesai: 92.2 },
          { bulan: 'Jun', masuk: 380, proses: 19, selesai: 355, ditolak: 6, total: 380, namaPerizinanTeratas: 'Sertifikat Agen Pelayaran Terakreditasi', statusModalDominan: 'PMDN (62%) / PMA (38%)', persenSelesai: 93.4 },
          { bulan: 'Jul', masuk: 360, proses: 16, selesai: 339, ditolak: 5, total: 360, namaPerizinanTeratas: 'Izin Kapal Pandu & Tunda Pelabuhan Kabil', statusModalDominan: 'PMDN (65%) / PMA (35%)', persenSelesai: 94.2 },
          { bulan: 'Ags', masuk: 350, proses: 14, selesai: 331, ditolak: 5, total: 350, namaPerizinanTeratas: 'Rekomendasi Penambatan Kapal Luar Negeri', statusModalDominan: 'PMA (68%) / PMDN (32%)', persenSelesai: 94.6 },
          { bulan: 'Sep', masuk: 340, proses: 15, selesai: 320, ditolak: 5, total: 340, namaPerizinanTeratas: 'Izin Pergudangan Logistik Dingin (Cold Storage)', statusModalDominan: 'PMDN (55%) / PMA (45%)', persenSelesai: 94.1 },
          { bulan: 'Okt', masuk: 330, proses: 12, selesai: 314, ditolak: 4, total: 330, namaPerizinanTeratas: 'Sertifikat Standar Jasa Pengurusan Transportasi', statusModalDominan: 'PMDN (64%) / PMA (36%)', persenSelesai: 95.2 },
          { bulan: 'Nov', masuk: 310, proses: 10, selesai: 296, ditolak: 4, total: 310, namaPerizinanTeratas: 'Surat Keterangan Kelaikan Alur Pelayaran', statusModalDominan: 'PMDN (70%) / PMA (30%)', persenSelesai: 95.5 },
          { bulan: 'Des', masuk: 270, proses: 8, selesai: 258, ditolak: 4, total: 270, namaPerizinanTeratas: 'Izin Terminal Khusus Industri Pengolahan Logam', statusModalDominan: 'PMA (60%) / PMDN (40%)', persenSelesai: 95.6 },
        ],
      },
      // 2025 - Semua Sektor - Semua Risiko
      '2025-Semua Sektor-Semua Risiko': {
        totalPermohonan: 13240,
        totalSelesai: 12050,
        persenSelesaiRata: 91.0,
        records: [
          { bulan: 'Jan', masuk: 1020, proses: 105, selesai: 885, ditolak: 30, total: 1020, namaPerizinanTeratas: 'PB-UMKU Peralatan Elektronika', statusModalDominan: 'PMA (64%) / PMDN (36%)', persenSelesai: 86.8 },
          { bulan: 'Feb', masuk: 1050, proses: 110, selesai: 910, ditolak: 30, total: 1050, namaPerizinanTeratas: 'Persetujuan Kesesuaian Tata Ruang (PKKPR)', statusModalDominan: 'PMDN (52%) / PMA (48%)', persenSelesai: 86.7 },
          { bulan: 'Mar', masuk: 1120, proses: 115, selesai: 975, ditolak: 30, total: 1120, namaPerizinanTeratas: 'Izin Galangan Kapal & Maritim', statusModalDominan: 'PMA (70%) / PMDN (30%)', persenSelesai: 87.1 },
          { bulan: 'Apr', masuk: 1100, proses: 95, selesai: 975, ditolak: 30, total: 1100, namaPerizinanTeratas: 'Persetujuan Bangunan Gedung (PBG)', statusModalDominan: 'PMDN (50%) / PMA (50%)', persenSelesai: 88.6 },
          { bulan: 'Mei', masuk: 1150, proses: 90, selesai: 1030, ditolak: 30, total: 1150, namaPerizinanTeratas: 'Izin Lingkungan AMDAL Terpadu', statusModalDominan: 'PMA (58%) / PMDN (42%)', persenSelesai: 89.6 },
          { bulan: 'Jun', masuk: 1180, proses: 85, selesai: 1065, ditolak: 30, total: 1180, namaPerizinanTeratas: 'Sertifikat Standar Industri Perakitan', statusModalDominan: 'PMA (62%) / PMDN (38%)', persenSelesai: 90.3 },
          { bulan: 'Jul', masuk: 1140, proses: 80, selesai: 1035, ditolak: 25, total: 1140, namaPerizinanTeratas: 'Izin Barang Modal Bukan Baru', statusModalDominan: 'PMA (72%) / PMDN (28%)', persenSelesai: 90.8 },
          { bulan: 'Ags', masuk: 1130, proses: 75, selesai: 1030, ditolak: 25, total: 1130, namaPerizinanTeratas: 'Surat Bebas PPN/PPnBM Kawasan Bebas', statusModalDominan: 'PMDN (56%) / PMA (44%)', persenSelesai: 91.2 },
          { bulan: 'Sep', masuk: 1110, proses: 70, selesai: 1015, ditolak: 25, total: 1110, namaPerizinanTeratas: 'PB-UMKU Kelistrikan & Energi', statusModalDominan: 'PMA (75%) / PMDN (25%)', persenSelesai: 91.4 },
          { bulan: 'Okt', masuk: 1090, proses: 65, selesai: 1005, ditolak: 20, total: 1090, namaPerizinanTeratas: 'Izin Kawasan Logistik Berikat', statusModalDominan: 'PMDN (54%) / PMA (46%)', persenSelesai: 92.2 },
          { bulan: 'Nov', masuk: 1070, proses: 55, selesai: 995, ditolak: 20, total: 1070, namaPerizinanTeratas: 'Persetujuan Ekspor Presisi Tinggi', statusModalDominan: 'PMA (68%) / PMDN (32%)', persenSelesai: 93.0 },
          { bulan: 'Des', masuk: 1080, proses: 50, selesai: 1010, ditolak: 20, total: 1080, namaPerizinanTeratas: 'Perpanjangan Izin Gudang Berikat', statusModalDominan: 'PMDN (60%) / PMA (40%)', persenSelesai: 93.5 },
        ],
      },
    },
  },

  // =========================================================================
  // KARTU 2: RENCANA VS REALISASI INVESTASI PER SEKTOR
  // =========================================================================
  investasiPerSektor: {
    filterTahunList: ['2026', '2025'],
    filterStatusModalList: [
      'Semua Penanaman Modal',
      'PMA (Penanaman Modal Asing)',
      'PMDN (Penanaman Modal Dalam Negeri)',
    ],
    byFilter: {
      // 2026 - Semua Status Modal
      '2026-Semua Penanaman Modal': {
        totalRencanaMiliar: 34500,
        totalRealisasiMiliar: 36820,
        persenRealisasiTotal: 106.7,
        records: [
          {
            sektor: 'Industri Elektronika & Semikonduktor',
            rencanaInvestasi: 12500,
            realisasiInvestasi: 13950,
            persenRealisasi: 111.6,
            pemenuhanStandarUsaha: '98,8% Kepatuhan Standar Industri & Cleanroom ISO',
            tenagaKerjaTki: 18450,
            tenagaKerjaTka: 480,
            totalTenagaKerja: 18930,
          },
          {
            sektor: 'Galangan Kapal & Maritim Offshore',
            rencanaInvestasi: 7800,
            realisasiInvestasi: 8120,
            persenRealisasi: 104.1,
            pemenuhanStandarUsaha: '96,4% Standar Keselamatan Migas & Galangan Kelas A',
            tenagaKerjaTki: 9200,
            tenagaKerjaTka: 210,
            totalTenagaKerja: 9410,
          },
          {
            sektor: 'Pusat Data (Data Center) & AI Hub',
            rencanaInvestasi: 6200,
            realisasiInvestasi: 6850,
            persenRealisasi: 110.5,
            pemenuhanStandarUsaha: '99,1% Sertifikasi Tier III/IV & Efisiensi PUE 1.25',
            tenagaKerjaTki: 2850,
            tenagaKerjaTka: 145,
            totalTenagaKerja: 2995,
          },
          {
            sektor: 'Logistik Terpadu & Kawasan Berikat',
            rencanaInvestasi: 4800,
            realisasiInvestasi: 4720,
            persenRealisasi: 98.3,
            pemenuhanStandarUsaha: '94,2% Sertifikasi AEO & Integrasi Manifest Digital',
            tenagaKerjaTki: 6100,
            tenagaKerjaTka: 85,
            totalTenagaKerja: 6185,
          },
          {
            sektor: 'Pariwisata Terpadu & Hospitaliti',
            rencanaInvestasi: 3200,
            realisasiInvestasi: 3180,
            persenRealisasi: 99.4,
            pemenuhanStandarUsaha: '95,7% Standar Bintang 5 & Sertifikasi CHSE Kemenparekraf',
            tenagaKerjaTki: 4300,
            tenagaKerjaTka: 60,
            totalTenagaKerja: 4360,
          },
        ],
      },
      // 2026 - PMA
      '2026-PMA (Penanaman Modal Asing)': {
        totalRencanaMiliar: 25800,
        totalRealisasiMiliar: 28150,
        persenRealisasiTotal: 109.1,
        records: [
          {
            sektor: 'Industri Elektronika & Semikonduktor',
            rencanaInvestasi: 10800,
            realisasiInvestasi: 12200,
            persenRealisasi: 113.0,
            pemenuhanStandarUsaha: '99,2% Standar Global ESD & IPC Electronics',
            tenagaKerjaTki: 15200,
            tenagaKerjaTka: 420,
            totalTenagaKerja: 15620,
          },
          {
            sektor: 'Pusat Data (Data Center) & AI Hub',
            rencanaInvestasi: 5500,
            realisasiInvestasi: 6150,
            persenRealisasi: 111.8,
            pemenuhanStandarUsaha: '99,5% Uptime Institute Tier IV & Green Grid PUE',
            tenagaKerjaTki: 2300,
            tenagaKerjaTka: 130,
            totalTenagaKerja: 2430,
          },
          {
            sektor: 'Galangan Kapal & Maritim Offshore',
            rencanaInvestasi: 5200,
            realisasiInvestasi: 5480,
            persenRealisasi: 105.4,
            pemenuhanStandarUsaha: '97,0% Regulasi IMO & Standar Rig Inspection API',
            tenagaKerjaTki: 6100,
            tenagaKerjaTka: 180,
            totalTenagaKerja: 6280,
          },
          {
            sektor: 'Logistik Terpadu & Kawasan Berikat',
            rencanaInvestasi: 2600,
            realisasiInvestasi: 2620,
            persenRealisasi: 100.8,
            pemenuhanStandarUsaha: '95,0% Hub Distribusi Internasional Asia Pasifik',
            tenagaKerjaTki: 3200,
            tenagaKerjaTka: 65,
            totalTenagaKerja: 3265,
          },
          {
            sektor: 'Pariwisata Terpadu & Hospitaliti',
            rencanaInvestasi: 1700,
            realisasiInvestasi: 1700,
            persenRealisasi: 100.0,
            pemenuhanStandarUsaha: '96,2% Jaringan Resor Internasional Nongsa',
            tenagaKerjaTki: 2100,
            tenagaKerjaTka: 45,
            totalTenagaKerja: 2145,
          },
        ],
      },
      // 2026 - PMDN
      '2026-PMDN (Penanaman Modal Dalam Negeri)': {
        totalRencanaMiliar: 8700,
        totalRealisasiMiliar: 8670,
        persenRealisasiTotal: 99.7,
        records: [
          {
            sektor: 'Galangan Kapal & Maritim Offshore',
            rencanaInvestasi: 2600,
            realisasiInvestasi: 2640,
            persenRealisasi: 101.5,
            pemenuhanStandarUsaha: '95,8% Standar Biro Klasifikasi Indonesia (BKI)',
            tenagaKerjaTki: 3100,
            tenagaKerjaTka: 30,
            totalTenagaKerja: 3130,
          },
          {
            sektor: 'Logistik Terpadu & Kawasan Berikat',
            rencanaInvestasi: 2200,
            realisasiInvestasi: 2100,
            persenRealisasi: 95.5,
            pemenuhanStandarUsaha: '93,5% Standar Pergudangan Nasional & KITE',
            tenagaKerjaTki: 2900,
            tenagaKerjaTka: 20,
            totalTenagaKerja: 2920,
          },
          {
            sektor: 'Industri Elektronika & Semikonduktor',
            rencanaInvestasi: 1700,
            realisasiInvestasi: 1750,
            persenRealisasi: 102.9,
            pemenuhanStandarUsaha: '96,0% Rantai Pasok Sub-Komponen Domestik',
            tenagaKerjaTki: 3250,
            tenagaKerjaTka: 60,
            totalTenagaKerja: 3310,
          },
          {
            sektor: 'Pariwisata Terpadu & Hospitaliti',
            rencanaInvestasi: 1500,
            realisasiInvestasi: 1480,
            persenRealisasi: 98.7,
            pemenuhanStandarUsaha: '95,1% Hotel Konvensi & Pusat Hiburan Keluarga',
            tenagaKerjaTki: 2200,
            tenagaKerjaTka: 15,
            totalTenagaKerja: 2215,
          },
          {
            sektor: 'Pusat Data (Data Center) & AI Hub',
            rencanaInvestasi: 700,
            realisasiInvestasi: 700,
            persenRealisasi: 100.0,
            pemenuhanStandarUsaha: '98,0% Sertifikasi Keamanan Cyber Kominfo & BSSN',
            tenagaKerjaTki: 550,
            tenagaKerjaTka: 15,
            totalTenagaKerja: 565,
          },
        ],
      },
      // 2025 - Semua Status Modal
      '2025-Semua Penanaman Modal': {
        totalRencanaMiliar: 31200,
        totalRealisasiMiliar: 31850,
        persenRealisasiTotal: 102.1,
        records: [
          {
            sektor: 'Industri Elektronika & Semikonduktor',
            rencanaInvestasi: 11200,
            realisasiInvestasi: 11980,
            persenRealisasi: 107.0,
            pemenuhanStandarUsaha: '97,5% Kepatuhan Standar KBLI Industri Perakitan',
            tenagaKerjaTki: 16800,
            tenagaKerjaTka: 450,
            totalTenagaKerja: 17250,
          },
          {
            sektor: 'Galangan Kapal & Maritim Offshore',
            rencanaInvestasi: 7200,
            realisasiInvestasi: 7350,
            persenRealisasi: 102.1,
            pemenuhanStandarUsaha: '95,0% Sertifikasi Kapal Niaga & Rig Perbaikan',
            tenagaKerjaTki: 8600,
            tenagaKerjaTka: 190,
            totalTenagaKerja: 8790,
          },
          {
            sektor: 'Pusat Data (Data Center) & AI Hub',
            rencanaInvestasi: 5100,
            realisasiInvestasi: 5320,
            persenRealisasi: 104.3,
            pemenuhanStandarUsaha: '98,0% Konstruksi Sipil Pusat Data Nongsa Digital Park',
            tenagaKerjaTki: 2100,
            tenagaKerjaTka: 120,
            totalTenagaKerja: 2220,
          },
          {
            sektor: 'Logistik Terpadu & Kawasan Berikat',
            rencanaInvestasi: 4700,
            realisasiInvestasi: 4480,
            persenRealisasi: 95.3,
            pemenuhanStandarUsaha: '93,0% Standar Fasilitas Bongkar Muat Peti Kemas',
            tenagaKerjaTki: 5800,
            tenagaKerjaTka: 70,
            totalTenagaKerja: 5870,
          },
          {
            sektor: 'Pariwisata Terpadu & Hospitaliti',
            rencanaInvestasi: 3000,
            realisasiInvestasi: 2720,
            persenRealisasi: 90.7,
            pemenuhanStandarUsaha: '94,0% Pemulihan Okupansi Wisata Bahari & MICE',
            tenagaKerjaTki: 3900,
            tenagaKerjaTka: 50,
            totalTenagaKerja: 3950,
          },
        ],
      },
    },
  },

  // =========================================================================
  // KARTU 3: PENYELESAIAN LAYANAN PER JENIS LAYANAN
  // =========================================================================
  penyelesaianLayanan: {
    filterTahunList: ['2026', '2025'],
    filterBulanList: [
      'Semua Bulan',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    byFilter: {
      // 2026 - Semua Bulan
      '2026-Semua Bulan': {
        totalMasuk: 15420,
        totalSelesai: 14618,
        persenTerselesaikanTotal: 94.8,
        records: [
          {
            id: 'lay-1',
            jenisLayanan: 'Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (PKKPR)',
            kategori: 'Tata Ruang',
            layananMasuk: 3240,
            layananSelesai: 3120,
            persenCapaian: 96.3,
            standarSlaHari: 5,
            realisasiHari: 2.8,
          },
          {
            id: 'lay-2',
            jenisLayanan: 'Izin Operasional Komersial & PB-UMKU Industri Elektronika',
            kategori: 'Perizinan Usaha',
            layananMasuk: 2950,
            layananSelesai: 2845,
            persenCapaian: 96.4,
            standarSlaHari: 3,
            realisasiHari: 1.6,
          },
          {
            id: 'lay-3',
            jenisLayanan: 'Persetujuan Bangunan Gedung (PBG) & Sertifikat Laik Fungsi (SLF)',
            kategori: 'Konstruksi',
            layananMasuk: 2480,
            layananSelesai: 2310,
            persenCapaian: 93.1,
            standarSlaHari: 7,
            realisasiHari: 4.2,
          },
          {
            id: 'lay-4',
            jenisLayanan: 'Persetujuan Lingkungan (AMDAL, UKL-UPL, SPPL)',
            kategori: 'Lingkungan',
            layananMasuk: 2150,
            layananSelesai: 2010,
            persenCapaian: 93.5,
            standarSlaHari: 10,
            realisasiHari: 6.5,
          },
          {
            id: 'lay-5',
            jenisLayanan: 'Pemasukan Barang Modal Bukan Baru Kawasan Bebas',
            kategori: 'Kepabeanan & FTZ',
            layananMasuk: 1850,
            layananSelesai: 1795,
            persenCapaian: 97.0,
            standarSlaHari: 3,
            realisasiHari: 1.4,
          },
          {
            id: 'lay-6',
            jenisLayanan: 'Izin Pemanfaatan Perairan, Dermaga Jetty & Reklamasi Terbatas',
            kategori: 'Kemaritiman',
            layananMasuk: 1420,
            layananSelesai: 1228,
            persenCapaian: 86.5, // di bawah 90% -> oranye
            standarSlaHari: 14,
            realisasiHari: 15.2,
          },
          {
            id: 'lay-7',
            jenisLayanan: 'Izin Pengeboran & Eksplorasi Air Tanah Kawasan Industri',
            kategori: 'Sumber Daya Air',
            layananMasuk: 1330,
            layananSelesai: 1310,
            persenCapaian: 98.5,
            standarSlaHari: 5,
            realisasiHari: 2.1,
          },
        ],
      },
      // 2026 - April
      '2026-April': {
        totalMasuk: 1240,
        totalSelesai: 1182,
        persenTerselesaikanTotal: 95.3,
        records: [
          {
            id: 'lay-1',
            jenisLayanan: 'Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (PKKPR)',
            kategori: 'Tata Ruang',
            layananMasuk: 270,
            layananSelesai: 262,
            persenCapaian: 97.0,
            standarSlaHari: 5,
            realisasiHari: 2.5,
          },
          {
            id: 'lay-2',
            jenisLayanan: 'Izin Operasional Komersial & PB-UMKU Industri Elektronika',
            kategori: 'Perizinan Usaha',
            layananMasuk: 245,
            layananSelesai: 239,
            persenCapaian: 97.6,
            standarSlaHari: 3,
            realisasiHari: 1.4,
          },
          {
            id: 'lay-3',
            jenisLayanan: 'Persetujuan Bangunan Gedung (PBG) & Sertifikat Laik Fungsi (SLF)',
            kategori: 'Konstruksi',
            layananMasuk: 195,
            layananSelesai: 184,
            persenCapaian: 94.4,
            standarSlaHari: 7,
            realisasiHari: 4.0,
          },
          {
            id: 'lay-4',
            jenisLayanan: 'Persetujuan Lingkungan (AMDAL, UKL-UPL, SPPL)',
            kategori: 'Lingkungan',
            layananMasuk: 175,
            layananSelesai: 165,
            persenCapaian: 94.3,
            standarSlaHari: 10,
            realisasiHari: 6.0,
          },
          {
            id: 'lay-5',
            jenisLayanan: 'Pemasukan Barang Modal Bukan Baru Kawasan Bebas',
            kategori: 'Kepabeanan & FTZ',
            layananMasuk: 155,
            layananSelesai: 151,
            persenCapaian: 97.4,
            standarSlaHari: 3,
            realisasiHari: 1.3,
          },
          {
            id: 'lay-6',
            jenisLayanan: 'Izin Pemanfaatan Perairan, Dermaga Jetty & Reklamasi Terbatas',
            kategori: 'Kemaritiman',
            layananMasuk: 110,
            layananSelesai: 94,
            persenCapaian: 85.5, // < 90%
            standarSlaHari: 14,
            realisasiHari: 15.8,
          },
          {
            id: 'lay-7',
            jenisLayanan: 'Izin Pengeboran & Eksplorasi Air Tanah Kawasan Industri',
            kategori: 'Sumber Daya Air',
            layananMasuk: 90,
            layananSelesai: 87,
            persenCapaian: 96.7,
            standarSlaHari: 5,
            realisasiHari: 2.2,
          },
        ],
      },
      // 2025 - Semua Bulan
      '2025-Semua Bulan': {
        totalMasuk: 14120,
        totalSelesai: 12960,
        persenTerselesaikanTotal: 91.8,
        records: [
          {
            id: 'lay-1',
            jenisLayanan: 'Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (PKKPR)',
            kategori: 'Tata Ruang',
            layananMasuk: 3010,
            layananSelesai: 2810,
            persenCapaian: 93.4,
            standarSlaHari: 5,
            realisasiHari: 3.5,
          },
          {
            id: 'lay-2',
            jenisLayanan: 'Izin Operasional Komersial & PB-UMKU Industri Elektronika',
            kategori: 'Perizinan Usaha',
            layananMasuk: 2710,
            layananSelesai: 2540,
            persenCapaian: 93.7,
            standarSlaHari: 3,
            realisasiHari: 2.1,
          },
          {
            id: 'lay-3',
            jenisLayanan: 'Persetujuan Bangunan Gedung (PBG) & Sertifikat Laik Fungsi (SLF)',
            kategori: 'Konstruksi',
            layananMasuk: 2310,
            layananSelesai: 2090,
            persenCapaian: 90.5,
            standarSlaHari: 7,
            realisasiHari: 5.2,
          },
          {
            id: 'lay-4',
            jenisLayanan: 'Persetujuan Lingkungan (AMDAL, UKL-UPL, SPPL)',
            kategori: 'Lingkungan',
            layananMasuk: 1980,
            layananSelesai: 1780,
            persenCapaian: 89.9, // < 90%
            standarSlaHari: 10,
            realisasiHari: 8.5,
          },
          {
            id: 'lay-5',
            jenisLayanan: 'Pemasukan Barang Modal Bukan Baru Kawasan Bebas',
            kategori: 'Kepabeanan & FTZ',
            layananMasuk: 1680,
            layananSelesai: 1580,
            persenCapaian: 94.0,
            standarSlaHari: 3,
            realisasiHari: 1.9,
          },
          {
            id: 'lay-6',
            jenisLayanan: 'Izin Pemanfaatan Perairan, Dermaga Jetty & Reklamasi Terbatas',
            kategori: 'Kemaritiman',
            layananMasuk: 1290,
            layananSelesai: 1080,
            persenCapaian: 83.7, // < 90%
            standarSlaHari: 14,
            realisasiHari: 16.5,
          },
          {
            id: 'lay-7',
            jenisLayanan: 'Izin Pengeboran & Eksplorasi Air Tanah Kawasan Industri',
            kategori: 'Sumber Daya Air',
            layananMasuk: 1150,
            layananSelesai: 1080,
            persenCapaian: 93.9,
            standarSlaHari: 5,
            realisasiHari: 2.8,
          },
        ],
      },
    },
  },

  // =========================================================================
  // KARTU 4: LAYANAN NON PERIZINAN PER JENIS
  // =========================================================================
  layananNonPerizinan: {
    filterTahunList: ['2026', '2025'],
    filterBulanList: [
      'Semua Bulan',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    byFilter: {
      // 2026 - Semua Bulan
      '2026-Semua Bulan': {
        totalPermohonan: 4280,
        totalSelesai: 4075,
        records: [
          {
            jenisNonPerizinan: 'Surat Rekomendasi Tenaga Kerja Asing (RPTKA)',
            masuk: 1240,
            proses: 45,
            selesai: 1170,
            tolak: 25,
            total: 1240,
            slaRataRata: '1,8 Hari',
          },
          {
            jenisNonPerizinan: 'Surat Keterangan Bebas Cukai & PPN Kawasan',
            masuk: 980,
            proses: 35,
            selesai: 930,
            tolak: 15,
            total: 980,
            slaRataRata: '1,2 Hari',
          },
          {
            jenisNonPerizinan: 'Surat Keterangan Asal (SKA / Form D/E/AK)',
            masuk: 860,
            proses: 28,
            selesai: 820,
            tolak: 12,
            total: 860,
            slaRataRata: '1,0 Hari',
          },
          {
            jenisNonPerizinan: 'Konsultasi Teknis & Asistensi Mandiri OSS',
            masuk: 680,
            proses: 18,
            selesai: 655,
            tolak: 7,
            total: 680,
            slaRataRata: 'Langsung (0 Hari)',
          },
          {
            jenisNonPerizinan: 'Rekomendasi Pembebasan Bea Masuk Mesin',
            masuk: 520,
            proses: 16,
            selesai: 500,
            tolak: 4,
            total: 520,
            slaRataRata: '2,2 Hari',
          },
        ],
      },
      // 2026 - April
      '2026-April': {
        totalPermohonan: 375,
        totalSelesai: 358,
        records: [
          {
            jenisNonPerizinan: 'Surat Rekomendasi Tenaga Kerja Asing (RPTKA)',
            masuk: 110,
            proses: 4,
            selesai: 104,
            tolak: 2,
            total: 110,
            slaRataRata: '1,6 Hari',
          },
          {
            jenisNonPerizinan: 'Surat Keterangan Bebas Cukai & PPN Kawasan',
            masuk: 85,
            proses: 3,
            selesai: 81,
            tolak: 1,
            total: 85,
            slaRataRata: '1,1 Hari',
          },
          {
            jenisNonPerizinan: 'Surat Keterangan Asal (SKA / Form D/E/AK)',
            masuk: 75,
            proses: 2,
            selesai: 72,
            tolak: 1,
            total: 75,
            slaRataRata: '0,9 Hari',
          },
          {
            jenisNonPerizinan: 'Konsultasi Teknis & Asistensi Mandiri OSS',
            masuk: 60,
            proses: 1,
            selesai: 59,
            tolak: 0,
            total: 60,
            slaRataRata: 'Langsung',
          },
          {
            jenisNonPerizinan: 'Rekomendasi Pembebasan Bea Masuk Mesin',
            masuk: 45,
            proses: 2,
            selesai: 42,
            tolak: 1,
            total: 45,
            slaRataRata: '2,0 Hari',
          },
        ],
      },
      // 2025 - Semua Bulan
      '2025-Semua Bulan': {
        totalPermohonan: 3850,
        totalSelesai: 3610,
        records: [
          {
            jenisNonPerizinan: 'Surat Rekomendasi Tenaga Kerja Asing (RPTKA)',
            masuk: 1120,
            proses: 55,
            selesai: 1035,
            tolak: 30,
            total: 1120,
            slaRataRata: '2,1 Hari',
          },
          {
            jenisNonPerizinan: 'Surat Keterangan Bebas Cukai & PPN Kawasan',
            masuk: 890,
            proses: 40,
            selesai: 830,
            tolak: 20,
            total: 890,
            slaRataRata: '1,4 Hari',
          },
          {
            jenisNonPerizinan: 'Surat Keterangan Asal (SKA / Form D/E/AK)',
            masuk: 780,
            proses: 32,
            selesai: 732,
            tolak: 16,
            total: 780,
            slaRataRata: '1,2 Hari',
          },
          {
            jenisNonPerizinan: 'Konsultasi Teknis & Asistensi Mandiri OSS',
            masuk: 610,
            proses: 20,
            selesai: 580,
            tolak: 10,
            total: 610,
            slaRataRata: 'Langsung',
          },
          {
            jenisNonPerizinan: 'Rekomendasi Pembebasan Bea Masuk Mesin',
            masuk: 450,
            proses: 18,
            selesai: 433,
            tolak: 9,
            total: 450,
            slaRataRata: '2,5 Hari',
          },
        ],
      },
    },
  },

  // =========================================================================
  // KARTU 5: PENGADUAN MASYARAKAT PER SALURAN
  // =========================================================================
  pengaduanMasyarakat: {
    filterTahunList: ['2026', '2025'],
    filterSemesterList: ['Semua Semester', 'Semester 1', 'Semester 2'],
    byFilter: {
      // 2026 - Semua Semester
      '2026-Semua Semester': {
        totalPengaduan: 248,
        totalSelesai: 242,
        persenSelesaiTotal: 97.6,
        records: [
          {
            saluran: 'Walk-in MPP Batam Center (Front Office)',
            selesai: 98,
            belumSelesai: 2,
            total: 100,
            persenSelesai: 98.0,
            jenisPengaduanTerbanyak: 'Konsultasi kelengkapan dokumen teknis PKKPR & OSS',
            kodeSampel: 'ADU-FO-2026-041',
            solusiPenyelesaian: 'Edukasi dan asistensi meja klinik izin langsung (SLA 15 menit)',
          },
          {
            saluran: 'Portal SP4N LAPOR! Nasional',
            selesai: 62,
            belumSelesai: 2,
            total: 64,
            persenSelesai: 96.9,
            jenisPengaduanTerbanyak: 'Klarifikasi batas waktu penertiban PBG & SLF',
            kodeSampel: 'ADU-SP4N-8812',
            solusiPenyelesaian: 'Pemberian berita acara percepatan validasi lintas dinas teknis',
          },
          {
            saluran: 'WhatsApp Center & Hotline PTSP',
            selesai: 46,
            belumSelesai: 1,
            total: 47,
            persenSelesai: 97.9,
            jenisPengaduanTerbanyak: 'Informasi status tracking berkas izin berusaha',
            kodeSampel: 'ADU-WA-0914',
            solusiPenyelesaian: 'Kirim link otomatis dashboard tracking barcode pemohon',
          },
          {
            saluran: 'Portal Resmi & Helpdesk Web BP Batam',
            selesai: 24,
            belumSelesai: 1,
            total: 25,
            persenSelesai: 96.0,
            jenisPengaduanTerbanyak: 'Integrasi sistem gateway pembayaran perizinan PNBP',
            kodeSampel: 'ADU-WEB-0219',
            solusiPenyelesaian: 'Rekonsiliasi otomatis SIMPONI Kemenkeu dalam 2 jam kerja',
          },
          {
            saluran: 'Surat Resmi & Kotak Saran MPP',
            selesai: 12,
            belumSelesai: 0,
            total: 12,
            persenSelesai: 100.0,
            jenisPengaduanTerbanyak: 'Permohonan dispensasi masa tenggang dokumen AMDAL',
            kodeSampel: 'ADU-SRT-0044',
            solusiPenyelesaian: 'Jawaban resmi telaah hukum direktorat terkait',
          },
        ],
      },
      // 2026 - Semester 1
      '2026-Semester 1': {
        totalPengaduan: 135,
        totalSelesai: 132,
        persenSelesaiTotal: 97.8,
        records: [
          {
            saluran: 'Walk-in MPP Batam Center (Front Office)',
            selesai: 54,
            belumSelesai: 1,
            total: 55,
            persenSelesai: 98.2,
            jenisPengaduanTerbanyak: 'Panduan akun hak akses OSS RBA sub-sektor maritim',
            kodeSampel: 'ADU-FO-2026-018',
            solusiPenyelesaian: 'Pendampingan langsung petugas helpdesk MPP ruang B2',
          },
          {
            saluran: 'Portal SP4N LAPOR! Nasional',
            selesai: 34,
            belumSelesai: 1,
            total: 35,
            persenSelesai: 97.1,
            jenisPengaduanTerbanyak: 'Lama verifikasi gambar arsitektur PBG industri',
            kodeSampel: 'ADU-SP4N-8740',
            solusiPenyelesaian: 'Rapat koordinasi tim penilai ahli gedung bertingkat',
          },
          {
            saluran: 'WhatsApp Center & Hotline PTSP',
            selesai: 25,
            belumSelesai: 1,
            total: 26,
            persenSelesai: 96.2,
            jenisPengaduanTerbanyak: 'Pertanyaan billing kode setor PNBP Batam',
            kodeSampel: 'ADU-WA-0881',
            solusiPenyelesaian: 'Penerbitan ulang invoice e-Billing secara instan',
          },
          {
            saluran: 'Portal Resmi & Helpdesk Web BP Batam',
            selesai: 13,
            belumSelesai: 0,
            total: 13,
            persenSelesai: 100.0,
            jenisPengaduanTerbanyak: 'Reset kata sandi profil perusahaan investor asing',
            kodeSampel: 'ADU-WEB-0184',
            solusiPenyelesaian: 'Verifikasi otentikasi korporat melalui email perwakilan',
          },
          {
            saluran: 'Surat Resmi & Kotak Saran MPP',
            selesai: 6,
            belumSelesai: 0,
            total: 6,
            persenSelesai: 100.0,
            jenisPengaduanTerbanyak: 'Usulan penambahan loket imigrasi di MPP Batam Center',
            kodeSampel: 'ADU-SRT-0031',
            solusiPenyelesaian: 'Penyampaian telaah ke Kantor Imigrasi Kelas I Khusus TPI',
          },
        ],
      },
      // 2025 - Semua Semester
      '2025-Semua Semester': {
        totalPengaduan: 284,
        totalSelesai: 271,
        persenSelesaiTotal: 95.4,
        records: [
          {
            saluran: 'Walk-in MPP Batam Center (Front Office)',
            selesai: 110,
            belumSelesai: 6,
            total: 116,
            persenSelesai: 94.8,
            jenisPengaduanTerbanyak: 'Antrean jam sibuk verifikasi berkas perizinan pertanahan',
            kodeSampel: 'ADU-FO-2025-112',
            solusiPenyelesaian: 'Penerapan kuota antrean online terpadu via mobile app',
          },
          {
            saluran: 'Portal SP4N LAPOR! Nasional',
            selesai: 72,
            belumSelesai: 4,
            total: 76,
            persenSelesai: 94.7,
            jenisPengaduanTerbanyak: 'Sanggahan hasil uji kelayakan lingkungan UKL-UPL',
            kodeSampel: 'ADU-SP4N-7650',
            solusiPenyelesaian: 'Fasilitasi mediasi verifikasi lapangan tim gabungan',
          },
          {
            saluran: 'WhatsApp Center & Hotline PTSP',
            selesai: 50,
            belumSelesai: 2,
            total: 52,
            persenSelesai: 96.2,
            jenisPengaduanTerbanyak: 'Permintaan status berkas izin tenaga kerja asing',
            kodeSampel: 'ADU-WA-0755',
            solusiPenyelesaian: 'Notifikasi SMS / WA gateway otomatis ke pemohon',
          },
          {
            saluran: 'Portal Resmi & Helpdesk Web BP Batam',
            selesai: 26,
            belumSelesai: 1,
            total: 27,
            persenSelesai: 96.3,
            jenisPengaduanTerbanyak: 'Kendala upload lampiran PDF ukuran besar pada OSS',
            kodeSampel: 'ADU-WEB-0145',
            solusiPenyelesaian: 'Peningkatan kapasitas server upload dokumen cloud hingga 50MB',
          },
          {
            saluran: 'Surat Resmi & Kotak Saran MPP',
            selesai: 13,
            belumSelesai: 0,
            total: 13,
            persenSelesai: 100.0,
            jenisPengaduanTerbanyak: 'Masukan kejelasan alur pengaduan gratifikasi & integritas',
            kodeSampel: 'ADU-SRT-0019',
            solusiPenyelesaian: 'Sosialisasi whistleblowing system (WBS) di seluruh loket',
          },
        ],
      },
    },
  },

  // =========================================================================
  // KARTU 6: VOLUME BONGKAR MUAT PER JENIS MUATAN (SKKBM)
  // =========================================================================
  bongkarMuat: {
    filterTahunList: ['2026', '2025'],
    filterBulanList: [
      'Semua Bulan',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    filterPelabuhanList: [
      'Semua Pelabuhan',
      'Pelabuhan Batu Ampar',
      'Pelabuhan Sekupang',
      'Pelabuhan Kabil',
      'Pelabuhan Telaga Punggur',
    ],
    byFilter: {
      // 2026 - Semua Bulan - Semua Pelabuhan
      '2026-Semua Bulan-Semua Pelabuhan': {
        totalVolumeBongkarMuat: 1482500,
        satuanRingkasan: 'Ton & TEUs',
        records: [
          {
            jenisMuatan: 'Peti Kemas / Kontainer Logistik (TEUs)',
            volumeBongkarMuat: 685000,
            satuan: 'TEUs',
            pelabuhan: 'Pelabuhan Batu Ampar & Kabil',
            peralatanUtama: 'Container Crane (CC) & Rubber Tyred Gantry (RTG)',
            jumlahTkbm: 480,
            persenKapasitasDermaga: 92.5,
          },
          {
            jenisMuatan: 'Komponen Elektronika & Presisi Manufaktur',
            volumeBongkarMuat: 324000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Harbour Mobile Crane (HMC) & Reach Stacker',
            jumlahTkbm: 260,
            persenKapasitasDermaga: 88.0,
          },
          {
            jenisMuatan: 'Baja, Struktur Pelat & Modul Offshore',
            volumeBongkarMuat: 215000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Kabil Industrial Port',
            peralatanUtama: 'Crawler Crane Kapasitas 250 Ton & SPMT',
            jumlahTkbm: 195,
            persenKapasitasDermaga: 84.2,
          },
          {
            jenisMuatan: 'Material Curah Kering & Konstruksi Pelabuhan',
            volumeBongkarMuat: 154000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Sekupang & Telaga Punggur',
            peralatanUtama: 'Conveyor Belt & Dump Truck Heavy Duty',
            jumlahTkbm: 140,
            persenKapasitasDermaga: 79.5,
          },
          {
            jenisMuatan: 'General Cargo, Mesin Pabrik & Rupa-rupa',
            volumeBongkarMuat: 104500,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Forklift Heavy-Duty 15 Ton & Ship Crane',
            jumlahTkbm: 115,
            persenKapasitasDermaga: 75.0,
          },
        ],
      },
      // 2026 - Semua Bulan - Pelabuhan Batu Ampar
      '2026-Semua Bulan-Pelabuhan Batu Ampar': {
        totalVolumeBongkarMuat: 945000,
        satuanRingkasan: 'Ton & TEUs',
        records: [
          {
            jenisMuatan: 'Peti Kemas / Kontainer Logistik (TEUs)',
            volumeBongkarMuat: 520000,
            satuan: 'TEUs',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Container Crane (CC) Dermaga Utara',
            jumlahTkbm: 320,
            persenKapasitasDermaga: 94.0,
          },
          {
            jenisMuatan: 'Komponen Elektronika & Presisi Manufaktur',
            volumeBongkarMuat: 260000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Harbour Mobile Crane (HMC)',
            jumlahTkbm: 180,
            persenKapasitasDermaga: 91.2,
          },
          {
            jenisMuatan: 'General Cargo, Mesin Pabrik & Rupa-rupa',
            volumeBongkarMuat: 95000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Reach Stacker & Forklift',
            jumlahTkbm: 90,
            persenKapasitasDermaga: 80.0,
          },
          {
            jenisMuatan: 'Baja, Struktur Pelat & Modul Offshore',
            volumeBongkarMuat: 70000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Heavy Crane 150 Ton',
            jumlahTkbm: 75,
            persenKapasitasDermaga: 78.5,
          },
        ],
      },
      // 2026 - Semua Bulan - Pelabuhan Kabil
      '2026-Semua Bulan-Pelabuhan Kabil': {
        totalVolumeBongkarMuat: 325000,
        satuanRingkasan: 'Ton & TEUs',
        records: [
          {
            jenisMuatan: 'Baja, Struktur Pelat & Modul Offshore',
            volumeBongkarMuat: 145000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Kabil Industrial Port',
            peralatanUtama: 'Crawler Crane & Gantry 250 Ton',
            jumlahTkbm: 120,
            persenKapasitasDermaga: 88.5,
          },
          {
            jenisMuatan: 'Peti Kemas / Kontainer Logistik (TEUs)',
            volumeBongkarMuat: 115000,
            satuan: 'TEUs',
            pelabuhan: 'Pelabuhan Kabil',
            peralatanUtama: 'Quay Crane Dermaga Khusus',
            jumlahTkbm: 110,
            persenKapasitasDermaga: 82.0,
          },
          {
            jenisMuatan: 'Komponen Elektronika & Presisi Manufaktur',
            volumeBongkarMuat: 65000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Kabil',
            peralatanUtama: 'Reach Stacker 45 Ton',
            jumlahTkbm: 80,
            persenKapasitasDermaga: 77.0,
          },
        ],
      },
      // 2025 - Semua Bulan - Semua Pelabuhan
      '2025-Semua Bulan-Semua Pelabuhan': {
        totalVolumeBongkarMuat: 1365000,
        satuanRingkasan: 'Ton & TEUs',
        records: [
          {
            jenisMuatan: 'Peti Kemas / Kontainer Logistik (TEUs)',
            volumeBongkarMuat: 615000,
            satuan: 'TEUs',
            pelabuhan: 'Pelabuhan Batu Ampar & Kabil',
            peralatanUtama: 'Container Crane (CC) & Reach Stacker',
            jumlahTkbm: 450,
            persenKapasitasDermaga: 89.0,
          },
          {
            jenisMuatan: 'Komponen Elektronika & Presisi Manufaktur',
            volumeBongkarMuat: 295000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Harbour Mobile Crane (HMC)',
            jumlahTkbm: 240,
            persenKapasitasDermaga: 85.0,
          },
          {
            jenisMuatan: 'Baja, Struktur Pelat & Modul Offshore',
            volumeBongkarMuat: 198000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Kabil Industrial Port',
            peralatanUtama: 'Crawler Crane 200 Ton',
            jumlahTkbm: 180,
            persenKapasitasDermaga: 81.5,
          },
          {
            jenisMuatan: 'Material Curah Kering & Konstruksi Pelabuhan',
            volumeBongkarMuat: 160000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Sekupang & Telaga Punggur',
            peralatanUtama: 'Conveyor & Dump Truck',
            jumlahTkbm: 130,
            persenKapasitasDermaga: 82.0,
          },
          {
            jenisMuatan: 'General Cargo, Mesin Pabrik & Rupa-rupa',
            volumeBongkarMuat: 97000,
            satuan: 'Ton',
            pelabuhan: 'Pelabuhan Batu Ampar',
            peralatanUtama: 'Forklift Heavy-Duty 15 Ton',
            jumlahTkbm: 105,
            persenKapasitasDermaga: 72.0,
          },
        ],
      },
    },
  },
};
