import React from 'react';
import {
  Percent,
  DollarSign,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Scale,
  Sparkles,
  Layers,
  Activity,
  HeartPulse,
  Droplets,
  Shield,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A6_KPIS } from './pelayananUmumData';

interface PelayananUmumKpiRowProps {
  onOpenFormulaModal: (kpiId?: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedUnit?: string;
}

// Sparklines data for 3 IKP + 1 Consolidated Total DEP-A6
const SPARKLINE_IKP1 = [
  { v: 1.05 }, { v: 1.12 }, { v: 1.15 }, { v: 1.19 }, { v: 1.21 }, { v: 1.24 },
];
const SPARKLINE_IKP2 = [
  { v: 0.65 }, { v: 0.67 }, { v: 0.68 }, { v: 0.69 }, { v: 0.70 }, { v: 0.71 },
];
const SPARKLINE_IKP3 = [
  { v: 86.8 }, { v: 87.2 }, { v: 87.8 }, { v: 88.1 }, { v: 88.4 }, { v: 88.66 },
];
const SPARKLINE_TOTAL = [
  { v: 228.4 }, { v: 236.8 }, { v: 245.2 }, { v: 252.6 }, { v: 258.9 }, { v: 264.3 },
];

export const PelayananUmumKpiRow: React.FC<PelayananUmumKpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
}) => {
  const ikp1 = PERKIN_A6_KPIS[0]; // Peningkatan Kinerja BU
  const ikp2 = PERKIN_A6_KPIS[1]; // Rasio PNBP BU thd BP Batam
  const ikp3 = PERKIN_A6_KPIS[2]; // Rata-rata IKM Layanan BU

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A6 (KOMPAK, GRADIENT & EKSEKUTIF) */}
      {/* Model Persis DEP-A4: 4 Kolom dengan Sparkline Area Chart           */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Peningkatan Kinerja Badan Usaha */}
        <div
          onClick={() => onOpenFormulaModal('ikp-1')}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 1 Peningkatan Kinerja Badan Usaha"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5 truncate">
                <Percent className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
                <span className="truncate">IKP 1 &bull; Peningkatan Kinerja BU</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {ikp1.realisasiDisplay}
              </span>
              <span className="text-xs font-bold text-blue-100">Pertumbuhan</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: {ikp1.targetDisplay}</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikp1.persenCapaian.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* IKP 2: Rasio PNBP BU terhadap PNBP BP Batam - BLUE CARD */}
        <div
          onClick={() => onOpenFormulaModal('ikp-2')}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 2 Rasio PNBP BU thd BP Batam"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5 truncate">
                <Scale className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
                <span className="truncate">IKP 2 &bull; Rasio PNBP BU : BP Batam</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
                <Scale className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {ikp2.realisasiDisplay}
              </span>
              <span className="text-xs font-bold text-blue-100">Rasio Kontribusi</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: {ikp2.targetDisplay}</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikp2.persenCapaian.toFixed(1)}% Tercapai
              </span>
            </div>
          </div>
        </div>

        {/* IKP 3: Rata-rata IKM Pengguna Layanan Badan Usaha - BLUE CARD */}
        <div
          onClick={() => onOpenFormulaModal('ikp-3')}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 3 Rata-rata IKM Layanan BU"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5 truncate">
                <Award className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
                <span className="truncate">IKP 3 &bull; Rata-rata IKM Layanan</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {ikp3.realisasiDisplay}
              </span>
              <span className="text-xs font-bold text-blue-100">Mutu A (Sangat Baik)</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: {ikp3.targetDisplay}</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikp3.persenCapaian.toFixed(1)}% Sangat Baik
              </span>
            </div>
          </div>
        </div>

        {/* KONSOLIDASI TOTAL PNBP 2 BADAN USAHA - BLUE CARD */}
        <div
          onClick={() => onOpenFormulaModal('ikp-2')}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Total Realisasi PNBP Gabungan 2 Badan Usaha DEP-A6"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5 truncate">
                <DollarSign className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
                <span className="truncate">Total PNBP 2 Badan Usaha</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Rp 264,30
              </span>
              <span className="text-xs font-bold text-blue-100">Miliar</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: Rp 252,40 M</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                104,7% Surplus Rp 11,9 M
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL TAMBAHAN DI BAWAH UTAMA     */}
      {/* Sesuai Instruksi User: Kartu KPI tambahan berwarna putih            */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: COST RECOVERY RATIO (CRR) BADAN USAHA - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('bu-rumah-sakit')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Cost Recovery Ratio (CRR) Badan Usaha Pelayanan Umum"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <HeartPulse className="w-2.5 h-2.5" />
              </span>
              Cost Recovery Ratio (CRR)
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              108,4% Sehat
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Mandiri Finansial
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Pendapatan &gt; Biaya Ops BLU
            </span>
          </div>
        </div>

        {/* KPI 2: RESPONSE TIME TANGGAP DARURAT & PENGAMANAN - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pam-aset')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Response Time Tanggap Darurat & Pengamanan (Ditpam & IGD RSBP)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              Response Time Darurat
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              11,8 Menit
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Golden Hour Terjaga
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar Maksimal: 15 Menit
            </span>
          </div>
        </div>

        {/* KPI 3: EFISIENSI PENGENDALIAN KEHILANGAN AIR (NRW) - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('bu-spam-fasling')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Efisiensi Pengendalian Kehilangan Air / Non-Revenue Water (BU SPAM Fasling)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Droplets className="w-2.5 h-2.5" />
              </span>
              Pengendalian NRW
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              22,4% Terkendali
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Di Bawah Batas 25%
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Efisiensi Transmisi 23 DMZ
            </span>
          </div>
        </div>

        {/* KPI 4: TINGKAT KEPATUHAN SERTIFIKASI & BAKU MUTU LINGKUNGAN - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('bu-spam-fasling')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kepatuhan Sertifikasi Mutu & Pengolahan Limbah KPLI B3"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Kepatuhan Mutu &amp; KPLI
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              99,2% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Baku Mutu Terpenuhi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              KARS Paripurna &amp; KPLI B3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
