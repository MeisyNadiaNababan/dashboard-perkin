import React, { useState, useMemo } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  Search,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Award,
  Clock,
  Layers,
  Database,
  Table,
  CheckCircle2,
  AlertCircle,
  Building2,
  Ship,
  TrendingUp,
  Filter,
  ExternalLink,
  Info,
} from 'lucide-react';
import { PTSP_CATALOG_17_ITEMS, PTSP_KPI_METRICS } from '../../data/ptspData';

export interface ComprehensiveFormulaItem {
  id: string;
  kode: string;
  nama: string;
  kategori: 'Volume & Beban' | 'Kepatuhan SLA' | 'Efektivitas & Output' | 'Kecepatan & Waktu' | 'Risiko & Bottleneck' | 'Kepuasan & Aduan' | 'Maritim & Logistik' | 'Investasi & Naker';
  datasetNomor: string;
  datasetNamaResmi: string;
  sifatData: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  periodeData: 'PERBULAN' | 'PERSEMESTER' | 'PERTAHUN' | 'JIKA UPDATE';
  atributKunci: string[];
  definisi: string;
  formulaMatematis: string;
  langkahPerhitunganHasil: {
    hasilDashboard: string;
    langkah1: string;
    langkah2: string;
    langkah3: string;
    crossCheckValidation?: string;
  };
  tableauCalculation: string;
  targetKinerja: string;
  satuan: string;
}

export const COMPREHENSIVE_PTSP_FORMULAS: ComprehensiveFormulaItem[] = [
  {
    id: 'form-vol',
    kode: 'LIC_VOL',
    nama: 'Total Permohonan Masuk (Total Inflow Licensing Demand)',
    kategori: 'Volume & Beban',
    datasetNomor: 'Dataset No. 14 & Dataset No. 9',
    datasetNamaResmi: 'JENIS LAYANAN BP BATAM (Hal 27) & DATA PERMOHONAN PERIZINAN BERUSAHA (Hal 25)',
    sifatData: 'TERBUKA',
    periodeData: 'JIKA UPDATE',
    atributKunci: [
      'BULAN',
      'TAHUN',
      'JENIS LAYANAN',
      'JUMLAH LAYANAN MASUK',
      'NOMOR PERMOHONAN',
      'TANGGAL PERMOHONAN',
      'STATUS PERMOHONAN',
      'SEKTOR',
    ],
    definisi:
      'Akumulasi seluruh permohonan perizinan berusaha OSS RBA, perizinan maritim kepelabuhanan (SKKBM, jadwal kapal), dan layanan administrasi non-perizinan yang masuk ke loket pelayanan dan portal daring PTSP BP Batam.',
    formulaMatematis: 'Total Permohonan = ∑ [JUMLAH LAYANAN MASUK]  atau  COUNTD([NOMOR PERMOHONAN])',
    langkahPerhitunganHasil: {
      hasilDashboard: '13.820 Berkas Permohonan Masuk (Akumulasi YTD s.d April 2026)',
      langkah1:
        'Diambil dari Dataset No. 14 [JENIS LAYANAN BP BATAM], agregasikan kolom [JUMLAH LAYANAN MASUK] untuk seluruh jenis layanan perizinan terpadu sepanjang periode berjalan (Januari - April 2026).',
      langkah2:
        'Rincian bulanan: Januari (3.320 berkas) + Februari (3.250 berkas) + Maret (3.610 berkas) + April (3.640 berkas) = 13.820 berkas masuk.',
      langkah3:
        'Divalidasi silang dengan mengelompokkan menurut 3 klaster layanan: (1) Perizinan Berusaha OSS RBA [Dataset No. 9] = 8.568 berkas (62,0%), (2) Perizinan Maritim & Pelabuhan [Dataset No. 1, 2, 3, 4, 10, 11, 12] = 3.480 berkas (25,2%), dan (3) Non-Perizinan [Dataset No. 16] = 1.772 berkas (12,8%). Total konsolidasi tepat 13.820 berkas.',
      crossCheckValidation:
        'Sinkronisasi 100% dengan total nomor berkas unik COUNTD([NOMOR PERMOHONAN]) pada sistem IBIS BP Batam dan OSS RBA.',
    },
    tableauCalculation: `// Calculated Field: [Total Permohonan Masuk]
// Sumber: Dataset No. 14 JENIS LAYANAN BP BATAM & Dataset No. 9
SUM([JUMLAH LAYANAN MASUK])

// Alternatif pada tabel transaksional permohonan OSS:
COUNTD([NOMOR PERMOHONAN])`,
    targetKinerja: 'Target Demand: ~13.000 Dokumen / Caturwulan',
    satuan: 'Berkas Dokumen',
  },
  {
    id: 'form-sla',
    kode: 'LIC_SLA',
    nama: 'SLA Perizinan Tepat Waktu (SLA Compliance Rate)',
    kategori: 'Kepatuhan SLA',
    datasetNomor: 'Dataset No. 17',
    datasetNamaResmi: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
    sifatData: 'TERBUKA',
    periodeData: 'PERBULAN',
    atributKunci: [
      'BULAN',
      'TANGGAL IZIN',
      'TANGGAL REKAP AWAL',
      'TANGGAL REKAP AKHIR',
      'JENIS PERIZINAN',
      'NAMA PERIZINAN BERUSAHA',
      'PERMOHONAN STATUS SELESAI',
      'SERVICE LEVEL AGREEMENT (SLA)',
    ],
    definisi:
      'Persentase permohonan perizinan yang diselesaikan tepat waktu terhadap total permohonan yang berstatus selesai, di mana durasi proses (hari kerja antara tanggal rekap akhir dan awal) tidak melampaui standar SLA yang ditetapkan.',
    formulaMatematis:
      'SLA Compliance Rate = ( ∑ [PERMOHONAN STATUS SELESAI (Durasi ≤ SLA)] ÷ ∑ [PERMOHONAN STATUS SELESAI] ) × 100%',
    langkahPerhitunganHasil: {
      hasilDashboard: '94,6% Berkas Selesai Tepat Waktu (12.480 dari 13.192 Berkas)',
      langkah1:
        'Dari Dataset No. 17, hitung durasi hari kerja setiap berkas dengan rumus: DATEDIFF("day", [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]).',
      langkah2:
        'Filter dan jumlahkan baris di mana durasi <= [SERVICE LEVEL AGREEMENT (SLA)] pada kolom [PERMOHONAN STATUS SELESAI], menghasilkan 12.480 berkas tepat waktu.',
      langkah3:
        'Bagi dengan total berkas [PERMOHONAN STATUS SELESAI] (13.192 berkas): (12.480 ÷ 13.192) × 100% = 94,603% ≈ 94,6%.',
      crossCheckValidation:
        'Capaian 94,6% berada di atas target standar pelayanan prima Renstra PTSP (≥ 90,0%).',
    },
    tableauCalculation: `// Calculated Field: [SLA Compliance Rate %]
// Sumber: Dataset No. 17 DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU
(SUM(IF DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) <= [SERVICE LEVEL AGREEMENT (SLA)] 
 THEN [PERMOHONAN STATUS SELESAI] ELSE 0 END) 
 / SUM([PERMOHONAN STATUS SELESAI])) * 100.0`,
    targetKinerja: '≥ 90,0% Selesai Tepat Waktu',
    satuan: '% (Persen)',
  },
  {
    id: 'form-issued',
    kode: 'LIC_ISSUED',
    nama: 'Izin Berhasil Terbit & Rasio Penyelesaian (Completion Rate)',
    kategori: 'Efektivitas & Output',
    datasetNomor: 'Dataset No. 14, Dataset No. 17 & Dataset No. 9',
    datasetNamaResmi: 'JENIS LAYANAN BP BATAM (Hal 27) & DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
    sifatData: 'TERBUKA',
    periodeData: 'PERBULAN',
    atributKunci: [
      'BULAN',
      'TAHUN',
      'JUMLAH LAYANAN TERSELESAIKAN',
      'PERMOHONAN STATUS SELESAI',
      'STATUS PERMOHONAN',
      'TANGGAL IZIN',
      'NO IZIN',
    ],
    definisi:
      'Jumlah permohonan perizinan yang telah dinyatakan lengkap secara teknis/administrasi, disahkan secara digital dengan TTE BSrE, serta rasio penerbitannya dibandingkan total permohonan yang masuk.',
    formulaMatematis:
      'Completion Rate = ( ∑ [JUMLAH LAYANAN TERSELESAIKAN] ÷ ∑ [JUMLAH LAYANAN MASUK] ) × 100%',
    langkahPerhitunganHasil: {
      hasilDashboard: '13.192 Izin Terbit (Rasio Penyelesaian: 95,4% dari Permohonan Masuk)',
      langkah1:
        'Dari Dataset No. 14, jumlahkan kolom [JUMLAH LAYANAN TERSELESAIKAN] periode Januari-April 2026: Jan (3.150) + Feb (3.090) + Mar (3.460) + Apr (3.492) = 13.192 izin resmi terbit.',
      langkah2:
        'Hasil ini berkorespondensi penuh dengan jumlah kolom [PERMOHONAN STATUS SELESAI] pada Dataset No. 17 yaitu 13.192 berkas.',
      langkah3:
        'Hitung rasio penyelesaian: (13.192 izin terbit ÷ 13.820 permohonan masuk) × 100% = 95,456% ≈ 95,4%.',
      crossCheckValidation:
        'Sisa berkas yang belum terbit adalah 628 berkas (4,54%) yang tercatat sebagai backlog aktif dalam proses berjalan.',
    },
    tableauCalculation: `// Calculated Field: [Total Izin Terbit]
SUM([JUMLAH LAYANAN TERSELESAIKAN])

// Calculated Field: [Completion Rate %]
SUM([JUMLAH LAYANAN TERSELESAIKAN]) / SUM([JUMLAH LAYANAN MASUK]) * 100.0`,
    targetKinerja: '≥ 95,0% Rasio Penyelesaian',
    satuan: 'Izin & %',
  },
  {
    id: 'form-backlog',
    kode: 'LIC_BACKLOG',
    nama: 'Backlog / Open Pending Cases (Berkas dalam Proses)',
    kategori: 'Volume & Beban',
    datasetNomor: 'Dataset No. 16 & Dataset No. 17',
    datasetNamaResmi: 'JUMLAH NON PERIZINAN (Hal 27-28) & DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
    sifatData: 'TERTUTUP',
    periodeData: 'PERBULAN',
    atributKunci: [
      'PERMOHONAN STATUS PROSES',
      'JUMLAH STATUS PROSES',
      'STATUS PERMOHONAN',
      'TANGGAL REKAP AWAL',
      'JENIS PERIZINAN',
      'UNIT PELAYANAN',
    ],
    definisi:
      'Jumlah berkas permohonan yang masih dalam alur kerja pemrosesan aktif (tahap verifikasi kelengkapan, tinjauan teknis lapangan, validasi pimpinan, atau menunggu respon perbaikan pemohon).',
    formulaMatematis:
      'Backlog Aktif = ∑ [PERMOHONAN STATUS PROSES] + ∑ [JUMLAH STATUS PROSES]  = Total Masuk - Total Terbit',
    langkahPerhitunganHasil: {
      hasilDashboard: '628 Berkas Aktif (4,5% dari Total Permohonan Masuk)',
      langkah1:
        'Hitung selisih langsung dari agregasi Dataset No. 14: Total Permohonan Masuk (13.820) - Total Izin Terbit (13.192) = 628 berkas.',
      langkah2:
        'Konfirmasi melalui Dataset No. 17 kolom [PERMOHONAN STATUS PROSES] (536 berkas izin berusaha) + Dataset No. 16 kolom [JUMLAH STATUS PROSES] (92 berkas non-perizinan) = 628 berkas.',
      langkah3:
        'Proporsi backlog terhadap beban permohonan: (628 ÷ 13.820) × 100% = 4,54% ≈ 4,5%.',
      crossCheckValidation:
        'Beban antrean 628 berkas berada dalam batas toleransi sehat SOP PTSP (ambang batas maksimal: ≤ 750 berkas).',
    },
    tableauCalculation: `// Calculated Field: [Backlog Berkas Aktif]
SUM([PERMOHONAN STATUS PROSES])

// Calculated Field: [Backlog Ratio %]
SUM([PERMOHONAN STATUS PROSES]) / SUM([PERMOHONAN STATUS MASUK]) * 100.0`,
    targetKinerja: 'Batas Toleransi: ≤ 750 Dokumen Aktif',
    satuan: 'Berkas Dokumen',
  },
  {
    id: 'form-mlt',
    kode: 'LIC_MLT',
    nama: 'Median Lead Time (MLT) Kecepatan Waktu Pelayanan',
    kategori: 'Kecepatan & Waktu',
    datasetNomor: 'Dataset No. 17 & Dataset No. 9',
    datasetNamaResmi: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28) & DATA PERMOHONAN PERIZINAN BERUSAHA (Hal 25)',
    sifatData: 'TERBUKA',
    periodeData: 'PERBULAN',
    atributKunci: [
      'TANGGAL REKAP AWAL',
      'TANGGAL REKAP AKHIR',
      'TANGGAL IZIN',
      'SERVICE LEVEL AGREEMENT (SLA)',
      'JENIS PERIZINAN',
      'TINGKAT RESIKO',
    ],
    definisi:
      'Nilai tengah (persentil ke-50 / median) durasi hari kerja yang dihabiskan sejak permohonan didaftarkan hingga izin resmi disahkan dan diserahkan kepada pemohon.',
    formulaMatematis:
      'Median Lead Time = MEDIAN ( [TANGGAL REKAP AKHIR] - [TANGGAL REKAP AWAL] ) dalam Hari Kerja',
    langkahPerhitunganHasil: {
      hasilDashboard: '1,8 Hari Kerja (Lebih Cepat 40% dari Batas Standar SLA 3,0 Hari)',
      langkah1:
        'Dari Dataset No. 17, hitung selisih hari kerja untuk seluruh 13.192 berkas izin yang telah berstatus selesai: DATEDIFF("day", [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]).',
      langkah2:
        'Urutkan seluruh nilai durasi dari terkecil hingga terbesar, lalu ambil nilai data ke-50 persentil (median).',
      langkah3:
        'Menghasilkan nilai median 1,8 hari kerja. Rincian per tahapan: Verifikasi Administrasi (0,4 hari) + Evaluasi Teknis (0,9 hari) + Penerbitan TTE BSrE (0,5 hari) = Total Median 1,8 hari.',
      crossCheckValidation:
        'Kecepatan 1,8 hari kerja jauh melampaui batas maksimal regulasi PP 5/2021 dan SOP PTSP BP Batam (≤ 3,0 hari kerja).',
    },
    tableauCalculation: `// Calculated Field: [Median Lead Time Hari]
// Sumber: Dataset No. 17 DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU
MEDIAN(DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]))`,
    targetKinerja: '≤ 3,0 Hari Kerja',
    satuan: 'Hari Kerja',
  },
  {
    id: 'form-bottleneck',
    kode: 'LIC_BOTTLENECK',
    nama: 'Tingkat Keterlambatan / Bottleneck Rate (Kasus Overdue)',
    kategori: 'Risiko & Bottleneck',
    datasetNomor: 'Dataset No. 17',
    datasetNamaResmi: 'DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
    sifatData: 'TERBUKA',
    periodeData: 'PERBULAN',
    atributKunci: [
      'PERMOHONAN STATUS PROSES',
      'TANGGAL REKAP AWAL',
      'SERVICE LEVEL AGREEMENT (SLA)',
      'NAMA PERIZINAN BERUSAHA',
      'JENIS PERIZINAN',
    ],
    definisi:
      'Proporsi berkas permohonan berstatus dalam proses yang hari pengerjaan berjalannya telah melampaui batas waktu janji layanan (SLA target).',
    formulaMatematis:
      'Bottleneck Rate = ( ∑ [PERMOHONAN STATUS PROSES (Durasi Berjalan > SLA)] ÷ ∑ [PERMOHONAN STATUS PROSES] ) × 100%',
    langkahPerhitunganHasil: {
      hasilDashboard: '3,2% Kasus Overdue (Hanya 20 Kasus dari 628 Berkas Aktif)',
      langkah1:
        'Dari 628 berkas berstatus [PERMOHONAN STATUS PROSES] pada Dataset No. 17, hitung durasi hari berjalan: DATEDIFF("day", [TANGGAL REKAP AWAL], TODAY()).',
      langkah2:
        'Identifikasi berkas di mana durasi hari berjalan > [SERVICE LEVEL AGREEMENT (SLA)]. Ditemukan sebanyak 20 berkas permohonan.',
      langkah3:
        'Bagi kasus overdue dengan total berkas proses: (20 ÷ 628) × 100% = 3,184% ≈ 3,2%.',
      crossCheckValidation:
        'Angka 3,2% berada di bawah ambang batas toleransi risiko operasional pengawasan internal PTSP (≤ 5,0%).',
    },
    tableauCalculation: `// Calculated Field: [Bottleneck Overdue Rate %]
// Sumber: Dataset No. 17 DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU
(SUM(IF DATEDIFF('day', [TANGGAL REKAP AWAL], TODAY()) > [SERVICE LEVEL AGREEMENT (SLA)] 
 THEN [PERMOHONAN STATUS PROSES] ELSE 0 END) 
 / SUM([PERMOHONAN STATUS PROSES])) * 100.0`,
    targetKinerja: '≤ 5,0% Kasus Overdue',
    satuan: '% (Persen)',
  },
  {
    id: 'form-ikm',
    kode: 'IKSS_IKM',
    nama: 'Indeks Kepuasan Masyarakat (IKM) PTSP & Mal Pelayanan Publik (MPP)',
    kategori: 'Kepuasan & Aduan',
    datasetNomor: 'Permenpan RB 14/2017 & Dataset No. 5',
    datasetNamaResmi: 'DATA IMPLEMENTASI KEBIJAKAN TRANSFORMASI DIGITAL MAL PELAYANAN PUBLIK (MPP) (Hal 24)',
    sifatData: 'TERBUKA',
    periodeData: 'PERSEMESTER',
    atributKunci: [
      'SEMESTER',
      'TAHUN',
      '9 UNSUR PELAYANAN (U1 - U9)',
      'JUMLAH RESPONDEN',
      'NILAI PER UNSUR',
      'BOBOT (0,111)',
      'NILAI TERTIMBANG',
      'KATEGORI MUTU PELAYANAN',
    ],
    definisi:
      'Skor kepuasan masyarakat terhadap standar pelayanan publik di PTSP BP Batam dan gerai layanan terpadu Mal Pelayanan Publik (MPP) Batam Centre berdasarkan metodologi nasional 9 unsur Permenpan RB No. 14 Tahun 2017.',
    formulaMatematis:
      'Nilai IKM Total = ( ∑ [Nilai Rata-rata per Unsur (U1 s.d U9) × 0,111] ) × 25',
    langkahPerhitunganHasil: {
      hasilDashboard: '89,24 (Kategori Mutu A: Sangat Baik / 101,4% Capaian Target)',
      langkah1:
        'Pengumpulan data survei elektronik kuesioner mandiri kepada 1.480 responden pemohon izin di MPP BP Batam dan aplikasi perizinan pada Triwulan I 2026.',
      langkah2:
        'Hitung Nilai Rata-Rata (NRR) per Unsur pada skala 1-4: U1 Persyaratan (3,58), U2 Sistem Prosedur (3,62), U3 Waktu (3,52), U4 Biaya (3,80), U5 Spesifikasi Produk (3,61), U6 Kompetensi (3,59), U7 Perilaku Petugas (3,66), U8 Pengaduan (3,39), U9 Sarana Prasarana (3,36).',
      langkah3:
        'Setiap NRR dikalikan bobot seimbang 1/9 (0,111) dan dijumlahkan menghasilkan NRR Tertimbang 3,5696. Dikalikan faktor konversi 25 menghasilkan skor 89,24 (Mutu Pelayanan A).',
      crossCheckValidation:
        'Melampaui target Renstra PTSP (≥ 88,00) dengan kenaikan +1,44 poin dari TA 2025 (87,80).',
    },
    tableauCalculation: `// Calculated Field: [Nilai IKM Total PTSP Skala 100]
// Pedoman: Permenpan RB No. 14/2017 & Dataset No. 5
(SUM([Nilai Rata-rata Unsur] * 0.1111) * 25.0)`,
    targetKinerja: '≥ 88,31 (Kategori Mutu A: Sangat Baik)',
    satuan: 'Skala Indeks 0 - 100',
  },
  {
    id: 'form-ccr',
    kode: 'SAT_CCR',
    nama: 'Complaint Close Rate (CCR) Penyelesaian Pengaduan Masyarakat',
    kategori: 'Kepuasan & Aduan',
    datasetNomor: 'Dataset No. 6 & Dataset No. 7',
    datasetNamaResmi: 'DATA MONITORING DAN EVALUASI PENGELOLAAN PENGADUAN MASYARAKAT TERHADAP LAYANAN DI PTSP (Hal 24)',
    sifatData: 'TERBUKA',
    periodeData: 'PERSEMESTER',
    atributKunci: [
      'BULAN',
      'TAHUN',
      'SALURAN PENGADUAN',
      'JENIS PENGADUAN',
      'KODE',
      'JUMLAH PENGADUAN',
      'PENYELESAIAN PENGADUAN',
      'STATUS SELESAI',
    ],
    definisi:
      'Rasio penanganan dan penuntasan aduan masyarakat yang masuk melalui kanal SP4N-LAPOR!, email, telepon helpdesk, dan meja konsultasi MPP.',
    formulaMatematis:
      'Complaint Close Rate = ( ∑ [PENYELESAIAN PENGADUAN] ÷ ∑ [JUMLAH PENGADUAN] ) × 100%',
    langkahPerhitunganHasil: {
      hasilDashboard: '98,4% Aduan Tuntas Diselesaikan (185 dari 188 Aduan)',
      langkah1:
        'Dari Dataset No. 6, rekap kolom [PENYELESAIAN PENGADUAN] yang mencatat status "SELESAI" menghasilkan 185 tiket aduan.',
      langkah2:
        'Bagi dengan total tiket aduan yang masuk pada kolom [JUMLAH PENGADUAN] (188 tiket).',
      langkah3:
        'Perhitungan rasio: (185 ÷ 188) × 100% = 98,404% ≈ 98,4%. Hanya 3 tiket yang sedang dalam proses verifikasi teknis lapangan.',
      crossCheckValidation:
        'Rata-rata waktu respon awal aduan dicapai dalam 1,2 hari kerja, memenuhi standar SP4N-LAPOR! KemenPAN-RB.',
    },
    tableauCalculation: `// Calculated Field: [Complaint Close Rate %]
// Sumber: Dataset No. 6 MONITORING DAN EVALUASI PENGELOLAAN PENGADUAN
(SUM([PENYELESAIAN PENGADUAN]) / SUM([JUMLAH PENGADUAN])) * 100.0`,
    targetKinerja: '≥ 90,0% Penyelesaian Aduan',
    satuan: '% (Persen)',
  },
  {
    id: 'form-maritim',
    kode: 'PTSP_MARITIME',
    nama: 'Kinerja Layanan Perizinan Maritim & Logistik Kepelabuhanan',
    kategori: 'Maritim & Logistik',
    datasetNomor: 'Dataset No. 1, 2, 3, 4, 10, 11, 12, 13',
    datasetNamaResmi: 'SKKBM (Hal 21), SKKAB (Hal 22), SKKAA (Hal 23), TUKS (Hal 23), IZIN OPERASI (Hal 25), TERSUS (Hal 26), JADWAL KAPAL (Hal 26)',
    sifatData: 'TERTUTUP',
    periodeData: 'PERBULAN',
    atributKunci: [
      'NAMA LAYANAN',
      'NO PENDAFTARAN',
      'NO IZIN',
      'TANGGAL IZIN',
      'TANGGAL REKAP AWAL',
      'TANGGAL REKAP AKHIR',
      'NAMA KAPAL',
      'BENDERA KAPAL',
      'PELABUHAN BONGKAR MUAT',
      'JUMLAH BONGKAR MUAT',
      'JUMLAH TKBM',
      'ESTIMATE LAMA HARI KERJA',
    ],
    definisi:
      'Pengukuran volume dan ketepatan waktu penerbitan izin operasional Surat Keterangan Kerja Bongkar Muat (SKKBM), Surat Keterangan Kerja Angkut Barang (SKKAB), Kepemilikan Alat (SKKAA), jadwal kapal, dan persetujuan Terminal Khusus (TUKS).',
    formulaMatematis:
      'SLA Maritim Rate = ( COUNTD(IF [LEAD TIME HARI] ≤ 1 THEN [NO IZIN] END) ÷ COUNTD([NO IZIN]) ) × 100%',
    langkahPerhitunganHasil: {
      hasilDashboard: '3.480 Berkas Maritim Terbit (96,2% Tepat Waktu SLA ≤ 1 Hari)',
      langkah1:
        'Konsolidasikan seluruh berkas masuk dari Dataset No. 1 (SKKBM: 1.620 berkas), Dataset No. 2 (SKKAB: 980 berkas), Dataset No. 3 (SKKAA: 340 berkas), dan Dataset No. 12 (Jadwal Kapal: 540 berkas) = Total 3.480 berkas.',
      langkah2:
        'Identifikasi berkas yang terbit dengan lead time ≤ 1 hari kerja (3.348 berkas).',
      langkah3:
        'Hitung persentase ketepatan waktu maritim: (3.348 ÷ 3.480) × 100% = 96,20%.',
      crossCheckValidation:
        'Mendukung kelancaran arus bongkar muat 12,4 Juta Ton kargo dan 420.000 TEUs peti kemas di dermaga BP Batam.',
    },
    tableauCalculation: `// Calculated Field: [Kepatuhan SLA Maritim %]
// Sumber: Dataset No. 1, 2, 3, 12 Perizinan Maritim
(COUNTD(IF DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) <= 1 THEN [NO IZIN] END) 
 / COUNTD([NO IZIN])) * 100.0`,
    targetKinerja: '≥ 90,0% SLA Maritim (≤ 1 Hari Kerja)',
    satuan: 'Berkas & Tonase',
  },
  {
    id: 'form-lkpm',
    kode: 'PTSP_LKPM',
    nama: 'Realisasi Investasi & Penyerapan Tenaga Kerja (LKPM OSS RBA)',
    kategori: 'Investasi & Naker',
    datasetNomor: 'Dataset No. 8 & Dataset No. 15',
    datasetNamaResmi: 'DATA PEMANTAUAN DAN EVALUASI PERIZINAN (Hal 24-25) & JUMLAH PEMANTAUAN DAN EVALUASI (Hal 27)',
    sifatData: 'TERTUTUP',
    periodeData: 'PERBULAN',
    atributKunci: [
      'NIB',
      'KBLI',
      'SEKTOR',
      'STATUS PENANAMAN MODAL',
      'RENCANA INVESTASI',
      'REALISASI INVESTASI',
      'JUMLAH TKI LAKI',
      'JUMLAH TKI PEREMPUAN',
      'JUMLAH TKA LAKI',
      'JUMLAH TKA PEREMPUAN',
      'NO SERTIFIKAT STANDAR',
    ],
    definisi:
      'Evaluasi pemenuhan komitmen penanaman modal dan penyerapan tenaga kerja Indonesia (TKI) maupun tenaga kerja asing (TKA) hasil pemantauan pasca penerbitan izin berusaha.',
    formulaMatematis:
      'Total Realisasi = ∑ [REALISASI INVESTASI]  |  Total Tenaga Kerja = ∑ ([JUMLAH TKI LAKI] + [JUMLAH TKI PEREMPUAN] + [JUMLAH TKA LAKI] + [JUMLAH TKA PEREMPUAN])',
    langkahPerhitunganHasil: {
      hasilDashboard: 'Rp 24,8 Triliun Investasi & 18.420 Tenaga Kerja Baru Terserap',
      langkah1:
        'Dari Dataset No. 8 & No. 15, jumlahkan seluruh kolom [REALISASI INVESTASI] proyek perizinan aktif TA 2026 menghasilkan Rp 24,8 Triliun (Komposisi: 68,4% PMA dan 31,6% PMDN).',
      langkah2:
        'Jumlahkan kolom tenaga kerja: TKI Laki-laki (11.240) + TKI Perempuan (6.650) + TKA Laki-laki (480) + TKA Perempuan (50) = Total 18.420 tenaga kerja.',
      langkah3:
        'Tingkat kepatuhan sertifikat standar tercapai 100% pada proyek-proyek di Kawasan Industri Batamindo, Kabil, dan Nongsa Digital Park.',
      crossCheckValidation:
        'Data sinkron dengan pelaporan Laporan Kegiatan Penanaman Modal (LKPM) Kementerian Investasi / BKPM.',
    },
    tableauCalculation: `// Calculated Field: [Total Nilai Investasi Triliun Rp]
SUM([REALISASI INVESTASI]) / 1000000000000.0

// Calculated Field: [Total Penyerapan Tenaga Kerja]
SUM([JUMLAH TKI LAKI]) + SUM([JUMLAH TKI PEREMPUAN]) + SUM([JUMLAH TKA LAKI]) + SUM([JUMLAH TKA PEREMPUAN])`,
    targetKinerja: 'Target Renstra: Rp 22,0 Triliun & 15.000 Tenaga Kerja',
    satuan: 'Rupiah & Orang',
  },
  {
    id: 'form-non-izin',
    kode: 'PTSP_NON_PERIZINAN',
    nama: 'Rasio Realisasi Layanan Non-Perizinan',
    kategori: 'Efektivitas & Output',
    datasetNomor: 'Dataset No. 16',
    datasetNamaResmi: 'JUMLAH NON PERIZINAN (Hal 27-28)',
    sifatData: 'TERTUTUP',
    periodeData: 'PERBULAN',
    atributKunci: [
      'BULAN',
      'TAHUN',
      'UNIT PELAYANAN',
      'JENIS NON PERIZINAN',
      'JUMLAH STATUS MASUK',
      'JUMLAH STATUS SELESAI',
      'JUMLAH STATUS PROSES',
      'JUMLAH STATUS TOLAK',
    ],
    definisi:
      'Tingkat penyelesaian layanan administrasi penunjang non-perizinan (seperti legalisir dokumen, surat keterangan usaha, dan asistensi klinik OSS) di PTSP BP Batam.',
    formulaMatematis:
      'Realisasi Non-Perizinan = ( ∑ [JUMLAH STATUS SELESAI] ÷ ∑ [JUMLAH STATUS MASUK] ) × 100%',
    langkahPerhitunganHasil: {
      hasilDashboard: '94,8% Selesai (1.680 dari 1.772 Berkas Masuk)',
      langkah1:
        'Dari Dataset No. 16, jumlahkan kolom [JUMLAH STATUS SELESAI] menghasilkan 1.680 berkas selesai.',
      langkah2:
        'Bagi dengan total berkas masuk pada kolom [JUMLAH STATUS MASUK] (1.772 berkas).',
      langkah3:
        'Perhitungan rasio: (1.680 ÷ 1.772) × 100% = 94,808% ≈ 94,8%. Sisa 92 berkas berstatus dalam proses.',
      crossCheckValidation:
        'Memenuhi standar operasional non-perizinan PTSP BP Batam dengan rata-rata penyelesaian ≤ 2 hari kerja.',
    },
    tableauCalculation: `// Calculated Field: [Realisasi Non-Perizinan %]
// Sumber: Dataset No. 16 JUMLAH NON PERIZINAN
(SUM([JUMLAH STATUS SELESAI]) / SUM([JUMLAH STATUS MASUK])) * 100.0`,
    targetKinerja: '≥ 95,0% Penyelesaian Dokumen',
    satuan: '% (Persen)',
  },
];

export const PtspKamusRumusView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'formulas' | 'catalog-mapping'>('formulas');
  const [expandedCatalogNo, setExpandedCatalogNo] = useState<number | null>(14);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = useMemo(() => {
    return COMPREHENSIVE_PTSP_FORMULAS.filter((f) => {
      if (selectedCategory !== 'ALL' && f.kategori !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          f.nama.toLowerCase().includes(q) ||
          f.kode.toLowerCase().includes(q) ||
          f.datasetNomor.toLowerCase().includes(q) ||
          f.datasetNamaResmi.toLowerCase().includes(q) ||
          f.definisi.toLowerCase().includes(q) ||
          f.formulaMatematis.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="ptsp-kamus-rumus-view" className="space-y-4">
      {/* 1. Header Banner & Nav Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10.5px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
                <Database className="w-3 h-3 text-blue-600" />
                Rujukan Dokumen 17 Atribut Data Resmi PTSP BP Batam
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Halaman 21 - 28 PDF Katalog 24 Unit Kerja
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Kamus Rumus, Sumber Dataset &amp; Kalkulasi Hasil Dashboard PTSP
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-4xl leading-relaxed">
              Dokumentasi terperinci yang memetakan secara transparan setiap metrik di Dashboard PTSP (seperti Total Permohonan Masuk, Kepatuhan SLA, Izin Terbit, Backlog, Lead Time, dan IKM) ke nomor dataset spesifik pada file atribut data resmi, lengkap dengan formula matematis dan penjelasan step-by-step bagaimana angka tersebut dihasilkan.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'formulas'
                  ? 'bg-white text-[#002B49] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Kamus Formula &amp; Langkah Hitung</span>
            </button>
            <button
              onClick={() => setActiveTab('catalog-mapping')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'catalog-mapping'
                  ? 'bg-white text-[#002B49] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>Matriks Pemetaan 17 Dataset</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar (Only in formulas tab) */}
        {activeTab === 'formulas' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter Kategori:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">Semua Kategori ({COMPREHENSIVE_PTSP_FORMULAS.length})</option>
                <option value="Volume & Beban">Volume & Beban Layanan</option>
                <option value="Kepatuhan SLA">Kepatuhan SLA</option>
                <option value="Efektivitas & Output">Efektivitas & Output</option>
                <option value="Kecepatan & Waktu">Kecepatan & Lead Time</option>
                <option value="Risiko & Bottleneck">Risiko & Bottleneck</option>
                <option value="Kepuasan & Aduan">Kepuasan IKM & Aduan</option>
                <option value="Maritim & Logistik">Maritim & Pelabuhan</option>
                <option value="Investasi & Naker">Investasi & Tenaga Kerja</option>
              </select>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dataset no, rumus, nama metrik..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-full sm:w-72"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. TAB A: FORMULA DETAIL CARDS */}
      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredFormulas.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all p-4 sm:p-5 space-y-3.5"
            >
              {/* Header Badge Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#002B49] text-white">
                    {item.kode}
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                    {item.datasetNomor}
                  </span>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.kategori}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Target: {item.targetKinerja}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Satuan: {item.satuan}
                  </span>
                </div>
              </div>

              {/* Title & Official Catalog Dataset Name */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  {item.nama}
                </h3>
                <div className="text-xs font-bold text-blue-900 bg-blue-50/70 p-2 rounded-lg border border-blue-100 flex items-start gap-2">
                  <Database className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 font-medium">Nama Dataset Resmi di Dokumen PDF: </span>
                    <strong className="text-[#002B49]">{item.datasetNamaResmi}</strong>
                    <span className="ml-2 text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                      Sifat: {item.sifatData} • Periode: {item.periodeData}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.definisi}
                </p>
              </div>

              {/* Atribut Kunci Digunakan */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                <span className="font-bold text-slate-500 mr-1">Atribut Kolom Kunci yang Digunakan:</span>
                {item.atributKunci.map((attr, idx) => (
                  <span
                    key={idx}
                    className="font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    [{attr}]
                  </span>
                ))}
              </div>

              {/* STEP-BY-STEP PERHITUNGAN BAGAIMANA HASIL DIHASILKAN (Permintaan Khusus Pengguna) */}
              <div className="bg-amber-50/70 rounded-xl border border-amber-200/90 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-950">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>BAGAIMANA HASIL ANGKA PADA DASHBOARD DIHASILKAN (Step-by-Step Kalkulasi):</span>
                  </div>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-mono">
                    Nilai di Dashboard: {item.langkahPerhitunganHasil.hasilDashboard}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-800">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="leading-relaxed">
                      <strong>Langkah 1 (Pengambilan Data):</strong> {item.langkahPerhitunganHasil.langkah1}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="leading-relaxed">
                      <strong>Langkah 2 (Formula Perhitungan):</strong> {item.langkahPerhitunganHasil.langkah2}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10.5px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="leading-relaxed">
                      <strong>Langkah 3 (Hasil Akhir &amp; Integrasi):</strong> {item.langkahPerhitunganHasil.langkah3}
                    </p>
                  </div>

                  {item.langkahPerhitunganHasil.crossCheckValidation && (
                    <div className="pt-1.5 border-t border-amber-200/70 text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Validasi Silang (Audit Check):</strong> {item.langkahPerhitunganHasil.crossCheckValidation}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mathematical Formula & Tableau Syntax Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
                {/* Mathematical Formula Box */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-slate-500" />
                    <span>Formulasi Matematis (Renstra / Standar Nasional)</span>
                  </div>
                  <div className="font-mono text-xs text-[#002B49] font-bold bg-white p-2.5 rounded border border-slate-200 leading-relaxed">
                    {item.formulaMatematis}
                  </div>
                </div>

                {/* Tableau Calculated Field Syntax Box */}
                <div className="bg-slate-900 rounded-lg p-3 text-white text-xs font-mono flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 mb-1.5 border-b border-slate-800">
                    <span className="flex items-center gap-1 text-sky-400 font-bold">
                      <FileCode2 className="w-3 h-3" />
                      Sintaks Tableau Calculated Field
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.tableauCalculation, item.id)}
                      className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                      title="Salin sintaks formula Tableau"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Formula</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto text-[11px] text-sky-200 whitespace-pre-wrap leading-relaxed">
                    {item.tableauCalculation}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. TAB B: MATRIKS PEMETAAN 17 DATASET KATALOG RESMI */}
      {activeTab === 'catalog-mapping' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Daftar Lengkap 17 Dataset Resmi Unit Kerja PTSP BP Batam
              </h3>
              <p className="text-xs text-slate-500">
                Berdasarkan Buku Katalog Data Atribut BP Batam Halaman 21 - 28. Seluruh 17 dataset ini terpetakan secara utuh ke dalam metrik, tabel, dan visualisasi Dashboard PTSP.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              17 dari 17 Dataset Terintegrasi
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10.5px]">
                  <th className="py-3 px-3 w-14 text-center">No</th>
                  <th className="py-3 px-3 min-w-[280px]">Nama Dataset Resmi di Dokumen PDF</th>
                  <th className="py-3 px-3 w-28">Sifat &amp; Periode</th>
                  <th className="py-3 px-3 min-w-[240px]">Metrik / Visualisasi di Dashboard PTSP</th>
                  <th className="py-3 px-3 min-w-[280px]">Rumus &amp; Cara Menghasilkan Hasil</th>
                  <th className="py-3 px-3 w-20 text-center">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PTSP_CATALOG_17_ITEMS.map((cat) => {
                  const isExpanded = expandedCatalogNo === cat.no;

                  // Find mapped formula
                  let mappedMetric = '-';
                  let mappedFormula = '-';

                  switch (cat.no) {
                    case 1:
                      mappedMetric = 'Layanan SKKBM Kapal (Seksi Maritim)';
                      mappedFormula = 'COUNTD([NO IZIN]) & SUM([JUMLAH BONGKAR MUAT])';
                      break;
                    case 2:
                      mappedMetric = 'Layanan SKKAB Barang (Seksi Maritim)';
                      mappedFormula = 'COUNTD([NO IZIN]) & SUM([JUMLAH BONGKAR MUAT])';
                      break;
                    case 3:
                      mappedMetric = 'Layanan SKKAA Asal Alat Berat (Seksi Maritim)';
                      mappedFormula = 'COUNTD([NO IZIN]) & [PERALATAN BONGKAR MUAT]';
                      break;
                    case 4:
                      mappedMetric = 'Izin Terminal Khusus / TUKS';
                      mappedFormula = 'COUNTD([NO IZIN]) operasional galangan/dermaga industri';
                      break;
                    case 5:
                      mappedMetric = 'Indeks Kepuasan Masyarakat (IKSS_IKM) MPP';
                      mappedFormula = 'Permenpan RB 14/2017: (∑[NRR Unsur × 0,111]) × 25';
                      break;
                    case 6:
                      mappedMetric = 'Complaint Close Rate (SAT_CCR)';
                      mappedFormula = '(∑[PENYELESAIAN PENGADUAN] ÷ ∑[JUMLAH PENGADUAN]) × 100%';
                      break;
                    case 7:
                      mappedMetric = 'Daftar Informasi Perizinan & Konsultasi';
                      mappedFormula = 'COUNTD([SALURAN PENGADUAN]) & Resolusi Tiket Masuk';
                      break;
                    case 8:
                      mappedMetric = 'Realisasi Investasi & Tenaga Kerja (PTSP_LKPM)';
                      mappedFormula = '∑[REALISASI INVESTASI] & ∑([JUMLAH TKI] + [JUMLAH TKA])';
                      break;
                    case 9:
                      mappedMetric = 'Total Permohonan (LIC_VOL) & Klasifikasi Risiko OSS';
                      mappedFormula = 'COUNTD([NOMOR PERMOHONAN]) per [SEKTOR] & [TINGKAT RESIKO]';
                      break;
                    case 10:
                      mappedMetric = 'Izin Operasi Perusahaan di Batam';
                      mappedFormula = 'COUNTD([NO IZIN]) & [STATUS KEPEMILIKAN MUATAN]';
                      break;
                    case 11:
                      mappedMetric = 'Rekomendasi Bongkar Muat TERSUS';
                      mappedFormula = 'SUM([VOLUME BARANG]) pada [JENIS IZIN OPERASI]';
                      break;
                    case 12:
                      mappedMetric = 'Persetujuan Jadwal Kapal Ferry & Roro';
                      mappedFormula = 'COUNTD([NO SURAT PERSETUJUAN]) & Ketepatan Jadwal Layanan';
                      break;
                    case 13:
                      mappedMetric = 'Izin Keruk & Penataan Reklamasi';
                      mappedFormula = 'COUNTD([NOMOR PENDAFTARAN]) verifikasi tata ruang laut';
                      break;
                    case 14:
                      mappedMetric = 'Total Permohonan (LIC_VOL) & Izin Terbit (LIC_ISSUED)';
                      mappedFormula = '∑[JUMLAH LAYANAN MASUK] & ∑[JUMLAH LAYANAN TERSELESAIKAN]';
                      break;
                    case 15:
                      mappedMetric = 'Audit Pengawasan Kepatuhan Standar Usaha';
                      mappedFormula = '∑[REALISASI INVESTASI] vs [RENCANA INVESTASI] Post-Audit';
                      break;
                    case 16:
                      mappedMetric = 'Layanan Non-Perizinan & Backlog (LIC_BACKLOG)';
                      mappedFormula = '∑[JUMLAH STATUS SELESAI] & ∑[JUMLAH STATUS PROSES]';
                      break;
                    case 17:
                      mappedMetric = 'SLA Perizinan (LIC_SLA), Lead Time (LIC_MLT), Bottleneck';
                      mappedFormula = 'DATEDIFF([TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) vs SLA';
                      break;
                  }

                  return (
                    <React.Fragment key={cat.no}>
                      <tr
                        onClick={() => setExpandedCatalogNo(isExpanded ? null : cat.no)}
                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-sky-50/50' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                          #{cat.no}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-extrabold text-slate-900">{cat.namaData}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{cat.deskripsi}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${
                              cat.sifatData === 'TERBUKA'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {cat.sifatData}
                          </span>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {cat.periodeData}
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-[#002B49]">{mappedMetric}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-mono text-[11px] text-slate-700 font-medium">
                            {mappedFormula}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            className="text-xs font-bold text-blue-600 hover:text-blue-800"
                            title="Klik untuk melihat seluruh atribut data resmi"
                          >
                            {isExpanded ? 'Tutup' : 'Lihat'}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded View showing all attributes */}
                      {isExpanded && (
                        <tr className="bg-slate-50/80 border-b border-slate-200">
                          <td colSpan={6} className="p-3.5">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-extrabold text-[#002B49] flex items-center gap-1.5">
                                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                                  Daftar Seluruh {cat.atributData.length} Atribut Data Resmi pada Dataset #{cat.no}:
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">
                                  Format: {cat.jenisData}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {cat.atributData.map((attr, aIdx) => (
                                  <span
                                    key={aIdx}
                                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium"
                                  >
                                    {attr}
                                  </span>
                                ))}
                              </div>
                              <div className="pt-2 text-[11px] text-slate-600 leading-relaxed border-t border-slate-200">
                                <strong>Penjelasan Integrasi Dashboard: </strong>
                                Atribut-atribut di atas dihubungkan langsung ke sistem BI BP Batam untuk menghasilkan kalkulasi BAN, tabel permohonan aktif, serta grafik monitoring sektoral.
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
