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
import { DirektoratPerencanaanInvestasiDeepDive } from './DirektoratPerencanaanInvestasiDeepDive';
import { DirektoratPromosiInvestasiDeepDive } from './DirektoratPromosiInvestasiDeepDive';
import { DirektoratPengendalianInvestasiDeepDive } from './DirektoratPengendalianInvestasiDeepDive';
import { DirektoratLaluLintasBarangDeepDive } from './DirektoratLaluLintasBarangDeepDive';

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
              Unit Deep-Dive Center: Investasi, KEK, Pengendalian Investasi &amp; Lalu Lintas Barang
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
            <span>Dir. Pengendalian Investasi</span>
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
      {/* Dashboard Visualisasi 6 Kartu (2 Kolom x 3 Baris)                */}
      {/* ================================================================== */}
      {activeUnit === 'dit-investasi' && (
        <DirektoratPromosiInvestasiDeepDive />
      )}

      {/* ================================================================== */}
      {/* 3. TAB CONTENT: DIREKTORAT PERENCANAAN DAN PENGEMBANGAN INVESTASI */}
      {/* Dashboard Visualisasi 6 Kartu (2 Kolom x 3 Baris)                */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pengembangan-kek' && (
        <DirektoratPerencanaanInvestasiDeepDive />
      )}

      {/* ================================================================== */}
      {/* 4. TAB CONTENT: DIREKTORAT PENGENDALIAN INVESTASI                  */}
      {/* Dashboard Visualisasi 4 Kartu (2 Kolom x 2 Baris)                */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pengendalian-usaha' && (
        <DirektoratPengendalianInvestasiDeepDive />
      )}

      {/* ================================================================== */}
      {/* 5. TAB CONTENT: DIREKTORAT LALU LINTAS BARANG (HAL. 8-9 SATU DATA) */}
      {/* 9 Dataset Terintegrasi Dit. Lalu Lintas Barang & Penanaman Modal    */}
      {/* ================================================================== */}
      {activeUnit === 'dit-lalu-lintas-barang' && (
        <DirektoratLaluLintasBarangDeepDive />
      )}

    </div>
  );
};
