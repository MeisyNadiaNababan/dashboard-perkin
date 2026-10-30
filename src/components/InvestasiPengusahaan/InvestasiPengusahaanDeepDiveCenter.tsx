import React from 'react';
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Briefcase,
  Globe,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Layers,
  Activity,
  AlertTriangle,
  Scale,
  DollarSign,
  FileText,
  Search,
  ArrowUpRight,
  Compass,
  FileCheck2,
  Truck,
  Package,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from 'recharts';

interface InvestasiPengusahaanDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

// =====================================================================
// DATASET DIREKTORAT INVESTASI (HAL. 46-48 BUKU SATU DATA)
// =====================================================================

// Dataset #14: DATA MINAT INVESTASI PER SEKTOR (SEMESTER, TAHUN, PERUSAHAAN, SEKTOR, MINAT INVESTASI)
const INVESTASI_SEKTOR_DATA = [
  { sektor: 'Semikonduktor & Elektronika', minatRpT: 32.5, realisasiRpT: 24.8, porsi: '38,8%', pma: 85 },
  { sektor: 'Data Center & AI Computing', minatRpT: 26.0, realisasiRpT: 18.5, porsi: '29,0%', pma: 70 },
  { sektor: 'Farmasi & Alat Kesehatan', minatRpT: 14.5, realisasiRpT: 9.2, porsi: '14,4%', pma: 60 },
  { sektor: 'Industri Galangan & Maritim', minatRpT: 12.8, realisasiRpT: 7.4, porsi: '11,6%', pma: 80 },
  { sektor: 'Energi Hijau & Solar PV', minatRpT: 9.0, realisasiRpT: 3.95, porsi: '6,2%', pma: 75 },
];

const TOTAL_MINAT_INVESTASI = {
  totalMinat: 94.8,
  totalRealisasi: 63.85,
  rasioKonversi: 67.35,
};

// Dataset #14: 5 DAFTAR INVESTOR SAMPEL MINAT & FASILITASI (DATASET #1 & #14)
const DAFTAR_MINAT_INVESTOR = [
  {
    namaPerusahaan: 'PT Silicon Micro Batam',
    sektor: 'Semikonduktor Chip',
    negara: 'Singapura / Taiwan',
    nilaiInvestasiUsd: '$ 450 Juta',
    nilaiInvestasiIdr: 'Rp 7,20 T',
    kawasan: 'Batamindo Industrial Park',
    status: 'Konstruksi Pabrik',
  },
  {
    namaPerusahaan: 'PT Global Cloud Data Center',
    sektor: 'Tier-4 Hyperscale Data Center',
    negara: 'Amerika Serikat',
    nilaiInvestasiUsd: '$ 380 Juta',
    nilaiInvestasiIdr: 'Rp 6,08 T',
    kawasan: 'KEK Nongsa Digital Park',
    status: 'Izin Prinsip Terbit',
  },
  {
    namaPerusahaan: 'PT Bio Farma International Asia',
    sektor: 'Formulasi Vaksin & Medis',
    negara: 'Korea Selatan',
    nilaiInvestasiUsd: '$ 180 Juta',
    nilaiInvestasiIdr: 'Rp 2,88 T',
    kawasan: 'KEK Sekupang Kesehatan',
    status: 'Masterlist Mesin',
  },
  {
    namaPerusahaan: 'PT Batam Heavy Offshore Engineering',
    sektor: 'Fabrication & Jacket Module',
    negara: 'Belanda / Eropa',
    nilaiInvestasiUsd: '$ 150 Juta',
    nilaiInvestasiIdr: 'Rp 2,40 T',
    kawasan: 'Kabil Industrial Estate',
    status: 'Operasional Ekspansi',
  },
  {
    namaPerusahaan: 'PT Clean Solar Energy Nusantara',
    sektor: 'Solar Cell & Battery Storage',
    negara: 'Tiongkok',
    nilaiInvestasiUsd: '$ 120 Juta',
    nilaiInvestasiIdr: 'Rp 1,92 T',
    kawasan: 'Kawasan Barelang Terpadu',
    status: 'Uji Kelayakan (FS)',
  },
];

// Dataset #10 & #9: TREN TRAFIK WEB INVEST IN BATAM & TIKET INVESTASI
const TRAFIK_WEB_INVESTASI_TREND = [
  { triwulan: 'TW I 2025', visitors: 28500, tiketMasuk: 94, tiketSelesai: 92 },
  { triwulan: 'TW II 2025', visitors: 34200, tiketMasuk: 112, tiketSelesai: 110 },
  { triwulan: 'TW III 2025', visitors: 38100, tiketMasuk: 128, tiketSelesai: 126 },
  { triwulan: 'TW IV 2025', visitors: 41550, tiketMasuk: 142, tiketSelesai: 140 },
];

// Dataset #6: INFORMASI PROYEK INFRASTRUKTUR PENUNJANG INVESTASI (HAL. 47)
const INFRASTRUKTUR_INVESTASI_PROJECTS = [
  {
    namaProject: 'LRT Batam Fase 1 (Batam Centre - Bandara Hang Nadim)',
    lokasi: 'Batam Centre & Nongsa (10,8 Km)',
    nilaiInvestasi: 'Rp 8,20 Triliun',
    skemaBisnis: 'BUP Kerjasama Mitra (KSP)',
    statusProject: 'Finalisasi DED & Penetapan Trase',
    kapasitas: '15.000 Penumpang / Jam',
  },
  {
    namaProject: 'Modernisasi Terminal Peti Kemas Batu Ampar (STS Crane)',
    lokasi: 'Pelabuhan Batu Ampar',
    nilaiInvestasi: 'Rp 4,50 Triliun',
    skemaBisnis: 'KSO BP Batam & Konsorsium BUMN',
    statusProject: 'Konstruksi Otomasi 90%',
    kapasitas: '1,6 Juta TEUs / Tahun',
  },
  {
    namaProject: 'Flyover Sei Ladi & Simpang Kepri Mall',
    lokasi: 'Jalur Arteri Sekupang - Batam Centre',
    nilaiInvestasi: 'Rp 320 Miliar',
    skemaBisnis: 'APBN & BP Batam',
    statusProject: 'Penyelesaian Tahap Akhir (94%)',
    kapasitas: 'Pengurai Kemacetan Kawasan Industri',
  },
  {
    namaProject: 'Pembangunan Waduk & SPAM Tembesi - Barelang 250 Lps',
    lokasi: 'Tembesi & Trans Barelang',
    nilaiInvestasi: 'Rp 180 Miliar',
    skemaBisnis: 'Kerjasama BU SPAM BP Batam',
    statusProject: 'Uji Komisioning Jaringan Pipa',
    kapasitas: '250 Liter / Detik Air Industri',
  },
];

// =====================================================================
// DATASET DIREKTORAT PENGEMBANGAN KPBPBB DAN KEK (HAL. 9-11 SATU DATA)
// =====================================================================

// Dataset #1: REALISASI INVESTASI KEK (TARGET VS REALISASI PMA & PMDN)
const KEK_INVESTASI_KOMPARASI = [
  {
    kek: 'KEK Nongsa Digital',
    targetRpT: 5.5,
    realisasiRpT: 5.95,
    pmaRpT: 4.8,
    pmdnRpT: 1.15,
    capaianPersen: 108.2,
    luasHa: 166.45,
    naker: 4820,
    bupp: 'PT Taman Resor Internet',
  },
  {
    kek: 'KEK Batam Aero Technic',
    targetRpT: 4.5,
    realisasiRpT: 4.72,
    pmaRpT: 3.2,
    pmdnRpT: 1.52,
    capaianPersen: 104.9,
    luasHa: 30.0,
    naker: 3650,
    bupp: 'PT Batam Aero Technic (Lion Group)',
  },
  {
    kek: 'KEK Pariwisata Kesehatan',
    targetRpT: 4.0,
    realisasiRpT: 4.13,
    pmaRpT: 2.8,
    pmdnRpT: 1.33,
    capaianPersen: 103.3,
    luasHa: 47.85,
    naker: 2980,
    bupp: 'PT RSBP / Medika Batam',
  },
];

// Dataset #3 & #4: REKAPITULASI PERIZINAN BERUSAHA ADMINISTRATOR KEK
const KEK_PERIZINAN_ADMINISTRATOR_TABLE = [
  { jenisIzin: 'Persetujuan Kesesuaian Tata Ruang KEK', jumlah: 48, slaJam: 1.8, status: '100% Tepat Waktu' },
  { jenisIzin: 'Persetujuan Bangunan Gedung (PBG) KEK', jumlah: 64, slaJam: 2.4, status: '98,4% Sesuai Standar' },
  { jenisIzin: 'Persetujuan Lingkungan (Amdal/UKL-UPL KEK)', jumlah: 36, slaJam: 2.2, status: '100% Terverifikasi' },
  { jenisIzin: 'Izin Pemasukan Mesin & Peralatan Pabrik (Masterlist)', jumlah: 142, slaJam: 1.5, status: '100% Terbit Cepat' },
  { jenisIzin: 'Surat Keterangan Ketenagakerjaan WNA (RPTKA KEK)', jumlah: 52, slaJam: 2.0, status: '100% Terbit' },
];

// =====================================================================
// DATASET DIREKTORAT PENGENDALIAN PENGUSAHAAN (HAL. 14 SATU DATA)
// =====================================================================

// Dataset #3 & #4: CAPAIAN TRIWULAN EVALUASI & PERBAIKAN KERJASAMA PENGUSAHAAN
const PENGENDALIAN_BU_TRIWULAN_TREND = [
  { triwulan: 'TW I', evaluasiPembinaan: 92.4, targetEvaluasi: 90.0, perbaikanKerjasama: 94.2, targetPerbaikan: 95.0 },
  { triwulan: 'TW II', evaluasiPembinaan: 93.8, targetEvaluasi: 90.0, perbaikanKerjasama: 95.1, targetPerbaikan: 95.0 },
  { triwulan: 'TW III', evaluasiPembinaan: 94.6, targetEvaluasi: 90.0, perbaikanKerjasama: 95.8, targetPerbaikan: 95.0 },
  { triwulan: 'TW IV', evaluasiPembinaan: 95.45, targetEvaluasi: 90.0, perbaikanKerjasama: 96.2, targetPerbaikan: 95.0 },
];

// Dataset #1: REKOMENDASI & MONITORING PKS KERJASAMA PENGUSAHAAN MITRA
const PKS_PENGUSAHAAN_MITRA_TABLE = [
  {
    id: 1,
    namaMitra: 'PT Batam Terminal Peti Kemas (KSO)',
    objekKerjasama: 'Pengoperasian & Alat STS Container Batu Ampar',
    skema: 'KSO 20 Tahun',
    nilaiInvestasiKontrak: 'Rp 3,80 T',
    kontribusiPnbp: 'Rp 182,5 M/Thn',
    statusMonev: 'Kepatuhan 98,2% (Sangat Baik)',
    rekomendasi: 'Optimalisasi Yard Occupancy Ratio (YOR)',
  },
  {
    id: 2,
    namaMitra: 'PT Bandara Internasional Batam (BIB Konsorsium)',
    objekKerjasama: 'Pengelolaan & Pembangunan Terminal 2 Hang Nadim',
    skema: 'KSP 25 Tahun',
    nilaiInvestasiKontrak: 'Rp 6,80 T',
    kontribusiPnbp: 'Rp 215,0 M/Thn',
    statusMonev: 'Kepatuhan 96,5% (Baik)',
    rekomendasi: 'Akselerasi Pekerjaan Overlay Runway 2',
  },
  {
    id: 3,
    namaMitra: 'PT Air Batam Hilir (Moya Group)',
    objekKerjasama: 'Operasional Sistem Penyediaan Air Minum (SPAM)',
    skema: 'KSO 15 Tahun',
    nilaiInvestasiKontrak: 'Rp 2,20 T',
    kontribusiPnbp: 'Rp 145,2 M/Thn',
    statusMonev: 'Kepatuhan 95,8% (Baik)',
    rekomendasi: 'Peremajaan Pipa Transmisi Duriangkang',
  },
  {
    id: 4,
    namaMitra: 'PT Kabil Citranusa & Desamas Logistic',
    objekKerjasama: 'Pergudangan Berikat & Logistik Terpadu Kabil',
    skema: 'Sewa Aset 10 Tahun',
    nilaiInvestasiKontrak: 'Rp 340 M',
    kontribusiPnbp: 'Rp 28,4 M/Thn',
    statusMonev: 'Kepatuhan 94,0% (Baik)',
    rekomendasi: 'Penyelesaian Rekonsiliasi Tarif Sewa',
  },
];

// =========================================================================
// DATASET DIREKTORAT LALU LINTAS BARANG (HAL. 8-9 SATU DATA BP BATAM)
// =========================================================================

// Dataset #6 & #7: Tren Bulanan Penerbitan Izin Pemasukan vs Pengeluaran Barang
const PERIZINAN_LLB_MONTHLY = [
  { bulan: 'Jan', pemasukan: 680, pengeluaran: 460, slaPersen: 96.2 },
  { bulan: 'Feb', pemasukan: 640, pengeluaran: 430, slaPersen: 96.5 },
  { bulan: 'Mar', pemasukan: 720, pengeluaran: 510, slaPersen: 96.8 },
  { bulan: 'Apr', pemasukan: 750, pengeluaran: 530, slaPersen: 97.1 },
  { bulan: 'Mei', pemasukan: 710, pengeluaran: 490, slaPersen: 96.6 },
  { bulan: 'Jun', pemasukan: 740, pengeluaran: 520, slaPersen: 97.0 },
  { bulan: 'Jul', pemasukan: 760, pengeluaran: 540, slaPersen: 96.9 },
  { bulan: 'Agu', pemasukan: 715, pengeluaran: 495, slaPersen: 96.7 },
  { bulan: 'Sep', pemasukan: 705, pengeluaran: 485, slaPersen: 96.8 },
  { bulan: 'Okt', pemasukan: 730, pengeluaran: 510, slaPersen: 97.2 },
  { bulan: 'Nov', pemasukan: 695, pengeluaran: 475, slaPersen: 96.4 },
  { bulan: 'Des', pemasukan: 775, pengeluaran: 545, slaPersen: 97.5 },
];

// Dataset #2: Realisasi Kuota Induk Barang Konsumsi
const KUOTA_BARANG_KONSUMSI = [
  { komoditas: 'Beras Premium & Khusus', kuotaTon: 45000, realisasiTon: 44250, persen: 98.3, status: 'Tercukupi' },
  { komoditas: 'Gula Pasir Kristal', kuotaTon: 28000, realisasiTon: 27500, persen: 98.2, status: 'Tercukupi' },
  { komoditas: 'Daging Sapi & Unggas Beku', kuotaTon: 18500, realisasiTon: 18120, persen: 97.9, status: 'Tercukupi' },
  { komoditas: 'Bawang Putih & Bombai', kuotaTon: 12000, realisasiTon: 11840, persen: 98.7, status: 'Tercukupi' },
  { komoditas: 'Tepung Terigu & Kedelai', kuotaTon: 22000, realisasiTon: 21650, persen: 98.4, status: 'Tercukupi' },
];

// Dataset #5: Sebaran KBLI Industri & Perdagangan Kawasan Bebas
const SEBARAN_KBLI_INDUSTRI = [
  { sektor: 'Industri Elektronika & Semikonduktor (KBLI 26)', perusahaan: 485, porsi: '34,2%', share: 34.2 },
  { sektor: 'Galangan Kapal & Maritim (KBLI 301)', perusahaan: 312, porsi: '22,0%', share: 22.0 },
  { sektor: 'Kimia Dasar & Plastik (KBLI 20)', perusahaan: 228, porsi: '16,1%', share: 16.1 },
  { sektor: 'Gudang & Logistik Kawasan (KBLI 52)', perusahaan: 245, porsi: '17,2%', share: 17.2 },
  { sektor: 'Makanan, Minuman & Tekstil (KBLI 10/13)', perusahaan: 150, porsi: '10,5%', share: 10.5 },
];

// Dataset #8 & #9: Efektivitas Layanan SLA Dokumen (Jam)
const SLA_LAYANAN_LLB = [
  { layanan: 'Izin Pemasukan Barang Konsumsi', slaTargetJam: 3.0, aktualJam: 1.7, kepatuhan: '97,2%' },
  { layanan: 'Izin Pemasukan Bahan Baku Industri', slaTargetJam: 3.0, aktualJam: 1.5, kepatuhan: '98,0%' },
  { layanan: 'Izin Pengeluaran Barang Antar Kawasan', slaTargetJam: 3.0, aktualJam: 1.9, kepatuhan: '96,4%' },
  { layanan: 'Penerbitan Izin Usaha Kawasan (IUK)', slaTargetJam: 24.0, aktualJam: 14.5, kepatuhan: '95,8%' },
  { layanan: 'Rekomendasi Kuota Barang Induk', slaTargetJam: 24.0, aktualJam: 16.2, kepatuhan: '96,5%' },
];

export const InvestasiPengusahaanDeepDiveCenter: React.FC<
  InvestasiPengusahaanDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal = () => {},
  onNavigateToFullDashboard,
}) => {
  // Normalize unit: 'dit-investasi' | 'dit-pengembangan-kek' | 'dit-pengendalian-usaha' | 'dit-lalu-lintas-barang'
  const activeUnit =
    selectedUnitId === 'dit-pengembangan-kek' ||
    selectedUnitId === 'dit-pengendalian-usaha' ||
    selectedUnitId === 'dit-lalu-lintas-barang'
      ? selectedUnitId
      : 'dit-investasi';

  return (
    <div
      id="investasi-deep-dive-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4.5 space-y-4 font-sans"
    >
      {/* ================================================================== */}
      {/* 1. HEADER SECTION & UNIT TABS (PERSIS MODEL DASHBOARD DEP-A3)      */}
      {/* ================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#0A2540] to-blue-900 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4.5 h-4.5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                UNIT DEEP-DIVE MONITORING
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Buku Satu Data BP Batam (4 Unit Pengampu A4)
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Investasi, KEK, Pengusahaan &amp; Lalu Lintas Barang
            </h3>
          </div>
        </div>

        {/* 4 Unit Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => onSelectUnit('dit-investasi')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-investasi'
                ? 'bg-white text-blue-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Dir. Promosi dan Fasilitasi Investasi</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pengembangan-kek')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-pengembangan-kek'
                ? 'bg-white text-emerald-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dir. Perencanaan dan Pengembangan Investasi</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pengendalian-usaha')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-pengendalian-usaha'
                ? 'bg-white text-indigo-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Dir. Pengendalian Pengusahaan</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-lalu-lintas-barang')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-lalu-lintas-barang'
                ? 'bg-white text-amber-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            <span>Dir. Lalu Lintas Barang</span>
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. TAB CONTENT: DIREKTORAT PROMOSI DAN FASILITASI INVESTASI        */}
      {/* Banyak Visualisasi Sekaligus Terintegrasi Dalam 1 Tampilan        */}
      {/* ================================================================== */}
      {activeUnit === 'dit-investasi' && (
        <div className="space-y-3.5">
          {/* BARIS 1: DUAL VISUALISASI UTAMA (MINAT SEKTOR PRIORITAS + TRAFIK WEB & TIKET INVESTASI) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* KARTU 1: PIPELINE MINAT INVESTASI PER SEKTOR (DATASET #14 & #1) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Pipeline Minat Investasi per Sektor Prioritas
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Sektor, Minat Investasi, Realisasi Masuk, Porsi PMA (Dataset #14 Hal. 48)
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs">
                    <span className="text-[9.5px] text-slate-500 font-bold block uppercase tracking-wider">Total Minat</span>
                    <span className="text-sm sm:text-base font-black text-blue-700 font-mono">
                      Rp {TOTAL_MINAT_INVESTASI.totalMinat.toFixed(1)} T
                    </span>
                    <span className="text-[9.5px] text-emerald-600 font-bold block">
                      Realisasi Rp {TOTAL_MINAT_INVESTASI.totalRealisasi.toFixed(2)} T ({TOTAL_MINAT_INVESTASI.rasioKonversi.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" /> Minat Investasi (Rp Triliun)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Realisasi Komitmen (Rp Triliun)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-blue-700 font-bold">5 Sektor Utama BP Batam</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={INVESTASI_SEKTOR_DATA}
                      margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis
                        type="category"
                        dataKey="sektor"
                        tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                        width={150}
                      />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `Rp ${val} Triliun`,
                          name === 'minatRpT' ? 'Minat Investasi' : 'Realisasi Masuk',
                        ]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="minatRpT" name="minatRpT" fill="#94A3B8" radius={[0, 4, 4, 0]} barSize={10} />
                      <Bar dataKey="realisasiRpT" name="realisasiRpT" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={10} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rincian Tabel Atribut */}
              <div className="pt-2 border-t border-blue-100 mt-1 overflow-x-auto">
                <table className="w-full text-[10px] text-left border-collapse">
                  <thead>
                    <tr className="text-slate-500 font-bold border-b border-blue-200/60">
                      <th className="py-0.5">SEKTOR PRIORITAS</th>
                      <th className="py-0.5 text-right">MINAT INVESTASI</th>
                      <th className="py-0.5 text-right">REALISASI</th>
                      <th className="py-0.5 text-right">PORSI PMA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50 text-slate-700">
                    {INVESTASI_SEKTOR_DATA.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-1 font-medium">{row.sektor}</td>
                        <td className="py-1 text-right font-mono text-slate-600">Rp {row.minatRpT.toFixed(1)} T</td>
                        <td className="py-1 text-right font-mono font-bold text-blue-700">Rp {row.realisasiRpT.toFixed(2)} T</td>
                        <td className="py-1 text-right font-mono font-bold text-emerald-600">{row.pma}% PMA</td>
                      </tr>
                    ))}
                    <tr className="font-black bg-blue-100/50 text-blue-900 border-t border-blue-200">
                      <td className="py-1">TOTAL PIPELINE INVESTASI KPBPBB</td>
                      <td className="py-1 text-right font-mono">Rp {TOTAL_MINAT_INVESTASI.totalMinat.toFixed(1)} T</td>
                      <td className="py-1 text-right font-mono">Rp {TOTAL_MINAT_INVESTASI.totalRealisasi.toFixed(2)} T</td>
                      <td className="py-1 text-right font-mono text-emerald-700">74,7% PMA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* KARTU 2: TRAFIK WEB INVEST IN BATAM & TIKET KONSULTASI (DATASET #10 & #9) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Trafik Portal &amp; Layanan Tiket Investasi
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Kunjungan Web (Traffic), Tiket Masuk, SLA Respon (Dataset #9 &amp; #10)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded font-mono">
                    142.350 Hits
                  </span>
                </div>

                {/* KPI BANNER KECIL */}
                <div className="grid grid-cols-2 gap-2 my-2">
                  <div className="p-2 rounded-lg bg-white border border-sky-200/80">
                    <span className="text-[9.5px] text-slate-500 font-bold block">TIKET INVESTASI MASUK</span>
                    <span className="text-base font-black text-slate-900 font-mono">476 Pemohon</span>
                    <span className="text-[9.5px] text-emerald-600 font-bold block">468 Terverifikasi (98,3%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-sky-200/80">
                    <span className="text-[9.5px] text-slate-500 font-bold block">SLA RESPON KONSULTASI</span>
                    <span className="text-base font-black text-sky-700 font-mono">1,8 Hari</span>
                    <span className="text-[9.5px] text-blue-600 font-bold block">Standar: Max 3 Hari</span>
                  </div>
                </div>

                {/* CHART AREA TRAFIK TRIWULANAN */}
                <div className="h-36 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TRAFIK_WEB_INVESTASI_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTrafficDeepDive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 9, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748B' }} />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          name === 'visitors' ? `${val.toLocaleString()} Visitors` : `${val} Tiket`,
                          name === 'visitors' ? 'Kunjungan Portal' : 'Tiket Konsultasi Masuk',
                        ]}
                        contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                      />
                      <Area type="monotone" dataKey="visitors" stroke="#0284C7" strokeWidth={2} fill="url(#colorTrafficDeepDive)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ASAL NEGARA PENGUNJUNG INVESTASI */}
              <div className="pt-2 border-t border-sky-100 mt-1">
                <span className="text-[10px] font-bold text-slate-700 block mb-1">
                  Sebaran Asal Negara Investor (Top 5):
                </span>
                <div className="grid grid-cols-5 gap-1 text-center">
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block">Singapura</span>
                    <span className="text-xs font-black text-blue-700 font-mono">38%</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block">Tiongkok</span>
                    <span className="text-xs font-black text-blue-700 font-mono">24%</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block">Amerika</span>
                    <span className="text-xs font-black text-blue-700 font-mono">14%</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block">Jepang</span>
                    <span className="text-xs font-black text-blue-700 font-mono">12%</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[9px] text-slate-500 block">Eropa</span>
                    <span className="text-xs font-black text-blue-700 font-mono">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BARIS 2: TABEL SAMPLE INVESTOR (DATASET #14) & MONITORING PROYEK INFRASTRUKTUR (DATASET #6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* KOLOM KIRI: DAFTAR INVESTOR SAMPEL MASUK (DATASET #14) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Daftar Fasilitasi Minat Investor Terbesar (Dataset #1 &amp; #14)
                </h4>
                <span className="text-[9.5px] text-slate-500 font-mono">5 Perusahaan Sampel</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                      <th className="py-1 px-1.5">NAMA PERUSAHAAN</th>
                      <th className="py-1 px-1.5">SEKTOR / NEGARA</th>
                      <th className="py-1 px-1.5 text-right">KOMITMEN</th>
                      <th className="py-1 px-1.5 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {DAFTAR_MINAT_INVESTOR.map((inv, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-1.5 font-semibold text-slate-900">{inv.namaPerusahaan}</td>
                        <td className="py-1.5 px-1.5 text-slate-500">{inv.sektor} ({inv.negara})</td>
                        <td className="py-1.5 px-1.5 text-right font-mono font-bold text-blue-700">{inv.nilaiInvestasiIdr}</td>
                        <td className="py-1.5 px-1.5 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* KOLOM KANAN: MONITORING PROYEK INFRASTRUKTUR PENUNJANG (DATASET #6) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  Monitoring Proyek Infrastruktur Penunjang Investasi (Dataset #6 Hal. 47)
                </h4>
                <span className="text-[9.5px] text-slate-500 font-mono">Prioritas Strategis</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                      <th className="py-1 px-1.5">NAMA PROYEK</th>
                      <th className="py-1 px-1.5">LOKASI / SKEMA</th>
                      <th className="py-1 px-1.5 text-right">NILAI</th>
                      <th className="py-1 px-1.5 text-center">PROGRES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {INFRASTRUKTUR_INVESTASI_PROJECTS.map((prj, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50/40">
                        <td className="py-1.5 px-1.5 font-semibold text-slate-900">{prj.namaProject}</td>
                        <td className="py-1.5 px-1.5 text-slate-500">{prj.lokasi}</td>
                        <td className="py-1.5 px-1.5 text-right font-mono font-bold text-indigo-700">{prj.nilaiInvestasi}</td>
                        <td className="py-1.5 px-1.5 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {prj.statusProject}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 3. TAB CONTENT: DIREKTORAT PERENCANAAN DAN PENGEMBANGAN INVESTASI */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pengembangan-kek' && (
        <div className="space-y-3.5">
          {/* BARIS 1: REALISASI INVESTASI 3 KEK & SERAPAN TENAGA KERJA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* KARTU 1: REALISASI INVESTASI KEK PMA & PMDN (DATASET #1) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Realisasi Investasi Berdasarkan Jenis PMA vs PMDN di 3 KEK
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Nama KEK, Target vs Realisasi PMA/PMDN (Dataset #1 Hal. 9)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                    <span className="text-[9.5px] text-slate-500 font-bold block uppercase tracking-wider">Total KEK</span>
                    <span className="text-sm sm:text-base font-black text-emerald-700 font-mono">
                      Rp 14,80 Triliun
                    </span>
                    <span className="text-[9.5px] text-blue-600 font-bold block">
                      Target Rp 14,00 T (105,7%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" /> Target Investasi
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Realisasi PMA
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> Realisasi PMDN
                  </span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={KEK_INVESTASI_KOMPARASI} margin={{ top: 5, right: 15, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="kek" tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }} />
                      <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `Rp ${val} Triliun`,
                          name === 'targetRpT' ? 'Target Perkin' : name === 'pmaRpT' ? 'PMA' : 'PMDN',
                        ]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="targetRpT" name="targetRpT" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={14} />
                      <Bar dataKey="pmaRpT" name="pmaRpT" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={14} />
                      <Bar dataKey="pmdnRpT" name="pmdnRpT" fill="#059669" radius={[4, 4, 0, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rincian Tabel Atribut KEK */}
              <div className="pt-2 border-t border-emerald-100 mt-1 overflow-x-auto">
                <table className="w-full text-[10px] text-left border-collapse">
                  <thead>
                    <tr className="text-slate-500 font-bold border-b border-emerald-200/60">
                      <th className="py-0.5">NAMA KAWASAN EKONOMI KHUSUS</th>
                      <th className="py-0.5 text-right">TARGET</th>
                      <th className="py-0.5 text-right">REALISASI</th>
                      <th className="py-0.5 text-right">CAPAIAN (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50 text-slate-700">
                    {KEK_INVESTASI_KOMPARASI.map((k, idx) => (
                      <tr key={idx}>
                        <td className="py-1 font-medium">{k.kek}</td>
                        <td className="py-1 text-right font-mono text-slate-600">Rp {k.targetRpT.toFixed(2)} T</td>
                        <td className="py-1 text-right font-mono font-bold text-emerald-700">Rp {k.realisasiRpT.toFixed(2)} T</td>
                        <td className="py-1 text-right font-mono font-bold text-blue-700">{k.capaianPersen.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* KARTU 2: PROFIL PEMANFAATAN LAHAN & SERAPAN TENAGA KERJA (DATASET #2 & #6) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Profil Luas Lahan &amp; Tenaga Kerja 3 KEK
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Luas Lahan (Ha), Naker, Badan Usaha Pembangun (Dataset #2 &amp; #6)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-mono">
                    11.450 Naker
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  {KEK_INVESTASI_KOMPARASI.map((k, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-teal-100 shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{k.kek}</span>
                        <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                          {k.luasHa} Ha
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Serapan Tenaga Kerja:</span>
                        <strong className="text-slate-800 font-mono">{k.naker.toLocaleString()} Orang</strong>
                      </div>
                      <div className="text-[9.5px] text-slate-400 mt-0.5 truncate">
                        BUPP: {k.bupp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-teal-100 mt-2 flex items-center justify-between text-[10px] text-slate-600">
                <span>Total Lahan Ditetapkan KEK:</span>
                <span className="font-bold font-mono text-slate-900">244,30 Hektar</span>
              </div>
            </div>
          </div>

          {/* BARIS 2: REKAPITULASI PELAYANAN ADMINISTRATOR KEK (DATASET #3, #4, #7) */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                Rekapitulasi Pelayanan Perizinan &amp; Non-Perizinan Administrator KEK (Dataset #3, #4 &amp; #7 Hal. 10)
              </h4>
              <span className="text-[9.5px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Rata-rata Respon: 2,1 Jam (SLA Patuh 100%)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                    <th className="py-1 px-2">JENIS LAYANAN ADMINISTRATOR KEK</th>
                    <th className="py-1 px-2 text-right">JUMLAH TERBIT</th>
                    <th className="py-1 px-2 text-right">RATA-RATA WAKTU SELESAI</th>
                    <th className="py-1 px-2 text-center">STATUS KEPATUHAN STANDAR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {KEK_PERIZINAN_ADMINISTRATOR_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40">
                      <td className="py-1.5 px-2 font-semibold text-slate-900">{row.jenisIzin}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">{row.jumlah} Dokumen</td>
                      <td className="py-1.5 px-2 text-right font-mono text-slate-600">{row.slaJam} Jam Kerja</td>
                      <td className="py-1.5 px-2 text-center">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 4. TAB CONTENT: DIREKTORAT PENGENDALIAN PENGUSAHAAN (HAL. 14)      */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pengendalian-usaha' && (
        <div className="space-y-3.5">
          {/* BARIS 1: EVALUASI PEMBINAAN TRIWULANAN & DISTRIBUSI KEPATUHAN SATKER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* KARTU 1: TREN EVALUASI PEMBINAAN & PERBAIKAN KERJASAMA (DATASET #3 & #4) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Tren Triwulanan Evaluasi &amp; Perbaikan Kerjasama Usaha
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Triwulan, % Evaluasi Ditindaklanjuti, % Perbaikan PKS (Dataset #3 &amp; #4 Hal. 14)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs">
                    <span className="text-[9.5px] text-slate-500 font-bold block uppercase tracking-wider">Capaian Akhir</span>
                    <span className="text-sm sm:text-base font-black text-indigo-700 font-mono">
                      95,45%
                    </span>
                    <span className="text-[9.5px] text-emerald-600 font-bold block">
                      Target 90,0% (+5,45%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600" /> % Evaluasi Ditindaklanjuti
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-purple-600" /> % Perbaikan PKS Ditindaklanjuti
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-indigo-700 font-bold">Basis: 110 Rekomendasi</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={PENGENDALIAN_BU_TRIWULAN_TREND} margin={{ top: 5, right: 15, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }} />
                      <YAxis domain={[85, 100]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `${val}%`,
                          name === 'evaluasiPembinaan' ? 'Evaluasi Pembinaan BU' : 'Perbaikan Kerjasama BU',
                        ]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="evaluasiPembinaan"
                        name="evaluasiPembinaan"
                        stroke="#4F46E5"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#4F46E5' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="perbaikanKerjasama"
                        name="perbaikanKerjasama"
                        stroke="#9333EA"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#9333EA' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-100 mt-1 flex items-center justify-between text-[10px] text-slate-600">
                <span>Status Tindak Lanjut Rekomendasi:</span>
                <span className="font-bold text-emerald-700">105 dari 110 Selesai Ditindaklanjuti (95,5%)</span>
              </div>
            </div>

            {/* KARTU 2: REKAPITULASI DOKUMEN PENGAWASAN PENGENDALIAN (DATASET #2) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Kepatuhan Pengendalian Badan Usaha Mitra
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Laporan Pengawasan Pengendalian Pengusahaan (Dataset #2 Hal. 14)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded font-mono">
                    28 PKS Diawasi
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-lg bg-white border border-purple-100 flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-medium">BUP Pelabuhan Batam:</span>
                    <span className="font-bold font-mono text-purple-800">98,2% (Sangat Baik)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-purple-100 flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-medium">Badan Usaha Bandara Hang Nadim:</span>
                    <span className="font-bold font-mono text-purple-800">96,5% (Baik)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-purple-100 flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-medium">Badan Usaha SPAM &amp; Fasling:</span>
                    <span className="font-bold font-mono text-purple-800">95,8% (Baik)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-purple-100 flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-medium">Badan Usaha Rumah Sakit BP:</span>
                    <span className="font-bold font-mono text-purple-800">94,1% (Baik)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-100 mt-2 flex items-center justify-between text-[10px] text-slate-600">
                <span>Rerata Kepatuhan Tata Kelola Mitra:</span>
                <span className="font-black text-emerald-700 font-mono">96,15% Patuh</span>
              </div>
            </div>
          </div>

          {/* BARIS 2: MATRIKS PENGAWASAN PKS KERJASAMA PENGUSAHAAN MITRA (DATASET #1) */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Matriks Pengawasan Perjanjian Kerjasama Pengusahaan &amp; Kontribusi PNBP (Dataset #1 Hal. 14)
              </h4>
              <span className="text-[9.5px] text-slate-500 font-mono">Monitoring Mitra Strategis</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                    <th className="py-1 px-2">NAMA MITRA / BADAN USAHA</th>
                    <th className="py-1 px-2">OBJEK KERJASAMA</th>
                    <th className="py-1 px-2">SKEMA</th>
                    <th className="py-1 px-2 text-right">NILAI KONTRAK</th>
                    <th className="py-1 px-2 text-right">KONTRIBUSI PNBP</th>
                    <th className="py-1 px-2 text-center">STATUS KEPATUHAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {PKS_PENGUSAHAAN_MITRA_TABLE.map((row) => (
                    <tr key={row.id} className="hover:bg-purple-50/40">
                      <td className="py-1.5 px-2 font-semibold text-slate-900">{row.namaMitra}</td>
                      <td className="py-1.5 px-2 text-slate-600">{row.objekKerjasama}</td>
                      <td className="py-1.5 px-2 font-mono text-[9px] text-slate-500">{row.skema}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-indigo-700">{row.nilaiInvestasiKontrak}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">{row.kontribusiPnbp}</td>
                      <td className="py-1.5 px-2 text-center">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {row.statusMonev}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 5. TAB CONTENT: DIREKTORAT LALU LINTAS BARANG (HAL. 8-9 SATU DATA) */}
      {/* 9 Dataset Terintegrasi Dit. Lalu Lintas Barang & Penanaman Modal    */}
      {/* ================================================================== */}
      {activeUnit === 'dit-lalu-lintas-barang' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: Tren Bulanan Perizinan + Realisasi Kuota Barang Konsumsi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Tren Bulanan Perizinan Pemasukan vs Pengeluaran (Dataset #6 & #7) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span>Tren Perizinan Pemasukan vs Pengeluaran (Dataset #6 &amp; #7)</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Dokumen Layanan Perizinan Masuk/Keluar KPBPB Batam &amp; SLA On-Time
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">14.280 Dokumen</span>
                    <span className="text-[10px] text-amber-600 font-bold ml-1.5">(96,8% On-Time)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={PERIZINAN_LLB_MONTHLY} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} domain={[300, 900]} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} domain={[94, 100]} tickFormatter={(v) => `${v}%`} />
                      <Tooltip formatter={(v: any, name: any) => [name.includes('SLA') ? `${v}%` : `${v} Dokumen`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                      <Bar yAxisId="left" dataKey="pemasukan" name="Izin Pemasukan" fill="#D97706" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="pengeluaran" name="Izin Pengeluaran" fill="#0284C7" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="slaPersen" name="SLA On-Time (%)" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 2: Realisasi Kuota Induk Barang Konsumsi (Dataset #2) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>Realisasi Kuota Barang Konsumsi (Dataset #2)</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Alokasi Kuota vs Realisasi Pemasukan Komoditas Pokok Batam
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">98,2% Realisasi</span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(Tercukupi)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={KUOTA_BARANG_KONSUMSI} layout="vertical" margin={{ top: 5, right: 15, left: 35, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 9 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <YAxis type="category" dataKey="komoditas" tick={{ fontSize: 8.5 }} width={120} />
                      <Tooltip formatter={(v: any, name: any) => [`${Number(v).toLocaleString('id-ID')} Ton`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="kuotaTon" name="Alokasi Kuota" fill="#94A3B8" />
                      <Bar dataKey="realisasiTon" name="Realisasi Masuk" fill="#D97706" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Sebaran KBLI Industri & Kecepatan Waktu Layanan SLA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Sebaran KBLI Industri & Usaha Kawasan (Dataset #5) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>Sebaran KBLI Perusahaan Kawasan (Dataset #5)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    1.420 Perusahaan Penerima Izin Usaha Kawasan Bebas
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">1.420 BU Aktif</span>
                  <span className="text-[10px] text-blue-600 font-bold ml-1.5">(KBLI Industri &amp; Dagang)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {SEBARAN_KBLI_INDUSTRI.map((k, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{k.sektor}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {k.perusahaan} Perusahaan Beroperasi
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-slate-900 text-sm">{k.porsi}</span>
                      <div className="w-20 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-amber-600 h-full rounded-full" style={{ width: `${k.share}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Efektivitas Layanan SLA Perizinan (Dataset #8 & #9) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Efektivitas Waktu Layanan SLA Perizinan (Dataset #8 &amp; #9)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Waktu Penyelesaian Aktual vs Standar Regulasi Maksimal
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">Rp 2,48 M</span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(112,7% Target &bull; 1,8 Jam)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {SLA_LAYANAN_LLB.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{s.layanan}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Standar Maks {s.slaTargetJam} Jam &bull; Aktual: {s.aktualJam} Jam
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {s.kepatuhan} On-Time
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Link ke Full Unit Dashboard */}
          {onNavigateToFullDashboard && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => onNavigateToFullDashboard('lalu-lintas-barang')}
                className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Buka Dashboard Penuh: Direktorat Lalu Lintas Barang</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
