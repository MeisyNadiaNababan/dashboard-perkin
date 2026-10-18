import React from 'react';
import {
  Award,
  Layers,
  Scale,
  ShieldCheck,
  CheckCircle2,
  FileText,
  FileCheck,
  Sparkles,
  Compass,
  Zap,
  Target,
  BarChart3,
  Network,
  HelpCircle,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { IKP_METRICS_LIST } from './kebijakanStrategisData';

interface KebijakanStrategisKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedUnit?: string;
  onSelectUnit?: (unitId: string) => void;
}

// Sparkline Mock Data for 4 IKPs in DEP-A2
const SPARKLINE_IKP1 = [
  { v: 88 }, { v: 90 }, { v: 91 }, { v: 92.5 }, { v: 93.8 }, { v: 94.2 },
];
const SPARKLINE_IKP2 = [
  { v: 62 }, { v: 64 }, { v: 66 }, { v: 68 }, { v: 70 }, { v: 71.8 },
];
const SPARKLINE_IKP3 = [
  { v: 3.4 }, { v: 3.6 }, { v: 3.75 }, { v: 3.9 }, { v: 4.02 }, { v: 4.12 },
];
const SPARKLINE_IKP4 = [
  { v: 82.5 }, { v: 84.1 }, { v: 85.6 }, { v: 86.8 }, { v: 87.5 }, { v: 88.42 },
];

export const KebijakanStrategisKpiRow: React.FC<KebijakanStrategisKpiRowProps> = ({
  onOpenFormulaModal,
  selectedUnit: _selectedUnit,
  onSelectUnit,
}) => {
  const ikpPusren = IKP_METRICS_LIST.find((k) => k.id === 'ikp-1-perencanaan') || IKP_METRICS_LIST[0];
  const ikpHarmonisasi = IKP_METRICS_LIST.find((k) => k.id === 'ikp-2-kebijakan') || IKP_METRICS_LIST[1];
  const ikpPdsi = IKP_METRICS_LIST.find((k) => k.id === 'ikp-3-spbe') || IKP_METRICS_LIST[2];
  const ikpPtsp = IKP_METRICS_LIST.find((k) => k.id === 'ikp-4-ikm-ptsp') || IKP_METRICS_LIST[3];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A2 (KOMPAK, GRADIENT & EKSEKUTIF) */}
      {/* Model Persis DEP-A1: 4 Kolom dengan Sparkline Area Chart               */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Indeks Perencanaan Pembangunan (IPPN) - PUSREN */}
        <div
          onClick={() => onOpenFormulaModal('ikp-1-perencanaan')}
          className="bg-gradient-to-br from-sky-600 via-sky-600 to-blue-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-sky-500/40"
          title="Buka detail IKP 1 Indeks Perencanaan Pembangunan (IPPN)"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-sky-100">IKP 1 &bull; Pusren (IPPN)</span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                <Compass className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-white tracking-tight block">
              94,20 / 100
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-sky-100/90">Target 92,00 (Sangat Baik)</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikpPusren.capaianPersen.toFixed(1)}% Tercapai
              </span>
            </div>
          </div>
        </div>

        {/* IKP 2: Indeks Kualitas Kebijakan (IKK) - HARMONISASI */}
        <div
          onClick={() => onOpenFormulaModal('ikp-2-kebijakan')}
          className="bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-blue-50/30 border border-blue-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 2 Indeks Kualitas Kebijakan (IKK)"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-800">IKP 2 &bull; Harmonisasi (IKK)</span>
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Scale className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              71,80 / 100
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 65,00 (Cukup Baik)</span>
              <span className="font-bold text-blue-800 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpHarmonisasi.capaianPersen.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* IKP 3: Tingkat Kematangan SPBE - PDSI */}
        <div
          onClick={() => onOpenFormulaModal('ikp-3-spbe')}
          className="bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-indigo-50/30 border border-indigo-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 3 Tingkat Kematangan SPBE"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-indigo-800">IKP 3 &bull; SPBE (PDSI)</span>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              4,12 / Level 4
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 3,90 (Terpadu)</span>
              <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpPdsi.capaianPersen.toFixed(1)}% Optimal
              </span>
            </div>
          </div>
        </div>

        {/* IKP 4: IKM Pengguna Layanan PTSP - PTSP */}
        <div
          onClick={() => onOpenFormulaModal('ikp-4-ikm-ptsp')}
          className="bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 4 IKM Layanan PTSP"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-800">IKP 4 &bull; IKM PTSP</span>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              88,42 / Mutu A
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 86,50 (Sangat Baik)</span>
              <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpPtsp.capaianPersen.toFixed(1)}% Sangat Baik
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL SESUAI BUKU SATU DATA        */}
      {/* (SLA Penyelesaian Izin, Evaluasi EPSS, Permintaan IT Helpdesk, dsb)  */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: SLA DATA PENYELESAIAN PERIZINAN TEPAT WAKTU (PTSP - DATASET #17 HAL. 28) */}
        <div
          onClick={() => onSelectUnit?.('ptsp')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Data Penyelesaian Perizinan yang Tepat Waktu (Buku Satu Data PTSP Hal. 28 No. 17)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <CheckCircle2 className="w-2.5 h-2.5" />
              </span>
              SLA Penyelesaian Izin
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Target 90% (PP 41)
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              94,8% Tepat Waktu
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              14.080 dari 14.850 Berkas Terbit
            </span>
          </div>
        </div>

        {/* KPI 2: LAPORAN PEMANTAUAN DAN EVALUASI EPSS MENAMPILKAN NILAI (PDSI - DATASET #20 HAL. 43) */}
        <div
          onClick={() => onSelectUnit?.('pdsi')}
          className="bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-white rounded-lg border border-indigo-200/80 hover:border-indigo-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Laporan Pemantauan dan Evaluasi EPSS (Buku Satu Data PDSI Hal. 43 No. 20)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                <BarChart3 className="w-2.5 h-2.5" />
              </span>
              Evaluasi EPSS (BPS)
            </span>
            <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Predikat Baik
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Nilai: 2,85 / 5,00
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Target 2,60 (BPS Satu Data)
            </span>
          </div>
        </div>

        {/* KPI 3: DATA PERMINTAAN LAYANAN IT (HELPDESK) MENAMPILKAN JUMLAH (PDSI - DATASET #21 HAL. 43) */}
        <div
          onClick={() => onSelectUnit?.('pdsi')}
          className="bg-gradient-to-br from-blue-50/80 via-sky-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Data Permintaan Layanan IT Helpdesk (Buku Satu Data PDSI Hal. 43 No. 21)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Activity className="w-2.5 h-2.5" />
              </span>
              Permintaan Layanan IT
            </span>
            <span className="font-bold text-blue-700 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              97,8% Selesai
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              1.482 Tiket Masuk
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              1.450 Selesai Ditangani
            </span>
          </div>
        </div>

        {/* KPI 4: EFISIENSI WAKTU PENERBITAN IZIN BERUSAHA / EODB (PTSP - DATASET #17 HAL. 28) */}
        <div
          onClick={() => onSelectUnit?.('ptsp')}
          className="bg-gradient-to-br from-teal-50/80 via-emerald-50/40 to-white rounded-lg border border-teal-200/80 hover:border-teal-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kecepatan Waktu Penyelesaian Izin Berusaha (Lead Time EODB)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                <Zap className="w-2.5 h-2.5" />
              </span>
              Kecepatan Terbit Izin
            </span>
            <span className="font-bold text-teal-800 bg-white/90 border border-teal-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              EODB Unggul
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              2,1 Hari Kerja
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar PP 41: 5 Hari Kerja
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
