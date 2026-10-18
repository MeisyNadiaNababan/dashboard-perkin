import React from 'react';
import {
  TrendingUp,
  Globe,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck2,
  ArrowUpRight,
  Briefcase,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A4_KPIS } from './investasiPengusahaanData';

interface InvestasiPengusahaanKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedQuarter?: string;
  selectedSatker?: string;
}

// Sparkline Mock Data for 4 IKPs in DEP-A4
const SPARKLINE_IKP1 = [
  { v: 54.2 }, { v: 56.8 }, { v: 59.1 }, { v: 61.4 }, { v: 62.7 }, { v: 63.85 },
];
const SPARKLINE_IKP2 = [
  { v: 185 }, { v: 192 }, { v: 198 }, { v: 205 }, { v: 212 }, { v: 218 },
];
const SPARKLINE_IKP3 = [
  { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 },
];
const SPARKLINE_IKP4 = [
  { v: 88.5 }, { v: 90.2 }, { v: 92.1 }, { v: 93.8 }, { v: 94.6 }, { v: 95.45 },
];

export const InvestasiPengusahaanKpiRow: React.FC<InvestasiPengusahaanKpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
}) => {
  const ikpInvestasi = PERKIN_A4_KPIS[0];
  const ikpPromosi = PERKIN_A4_KPIS[1];
  const ikpKek = PERKIN_A4_KPIS[2];
  const ikpPengendalian = PERKIN_A4_KPIS[3];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A4 (KOMPAK, GRADIENT & EKSEKUTIF) */}
      {/* Model Persis DEP-A3: 4 Kolom dengan Sparkline Area Chart           */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Realisasi Penanaman Modal di KPBPB - DIT. INVESTASI */}
        <div
          onClick={() => onOpenFormulaModal(ikpInvestasi.id)}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 1 Realisasi Investasi KPBPB"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5 truncate">
                <Briefcase className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
                <span className="truncate">IKP 1 &bull; Dit. Investasi (Realisasi)</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Rp 63,85
              </span>
              <span className="text-xs font-bold text-blue-100">Triliun</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: Rp 60,00 T</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikpInvestasi.capaianPersen.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* IKP 2: Minat Investasi dari Promosi - DIT. INVESTASI */}
        <div
          onClick={() => onOpenFormulaModal(ikpPromosi.id)}
          className="bg-gradient-to-br from-sky-50/95 via-blue-50/60 to-sky-50/30 border border-sky-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 2 Minat Investasi Promosi"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-sky-900 flex items-center gap-1.5 truncate">
                <Globe className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span className="truncate">IKP 2 &bull; Promosi (Minat Leads)</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <Globe className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                218
              </span>
              <span className="text-xs font-bold text-slate-600">Minat Leads</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: 200 Minat</span>
              <span className="font-bold text-sky-800 bg-white/90 border border-sky-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpPromosi.capaianPersen.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* IKP 3: Kajian Pengembangan & KEK Berkelanjutan - DIT. PENGEMBANGAN KEK */}
        <div
          onClick={() => onOpenFormulaModal(ikpKek.id)}
          className="bg-gradient-to-br from-emerald-50/95 via-teal-50/60 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 3 Kajian KEK Berkelanjutan"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-900 flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">IKP 3 &bull; Dit. KEK (Kajian KEK)</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                100,0%
              </span>
              <span className="text-xs font-bold text-slate-600">Selesai</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: 100%</span>
              <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                100% Tercapai
              </span>
            </div>
          </div>
        </div>

        {/* IKP 4: Pengendalian Pengusahaan & Kerja Sama BU - DIT. PENGENDALIAN USAHA */}
        <div
          onClick={() => onOpenFormulaModal(ikpPengendalian.id)}
          className="bg-gradient-to-br from-indigo-50/95 via-purple-50/50 to-indigo-50/30 border border-indigo-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 4 Pengendalian Pengusahaan"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-indigo-900 flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                <span className="truncate">IKP 4 &bull; Dit. Pengendalian BU</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                95,45%
              </span>
              <span className="text-xs font-bold text-slate-600">Kepatuhan</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: 100%</span>
              <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                95,5% Optimal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL TAMBAHAN DI BAWAH UTAMA     */}
      {/* Sesuai Instruksi: Non-duplikasi terhadap data di Unit Deep Dive      */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: RASIO PENANAMAN MODAL ASING (PMA) VS DALAM NEGERI (PMDN) */}
        <div
          onClick={() => onSelectUnit?.('dit-investasi')}
          className="bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Rasio Investasi PMA vs PMDN (Dit. Investasi)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Briefcase className="w-2.5 h-2.5" />
              </span>
              Porsi PMA : PMDN
            </span>
            <span className="font-bold text-blue-800 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              PMA 74,7%
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Rp 47,7 T PMA
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              PMDN: Rp 16,15 Triliun
            </span>
          </div>
        </div>

        {/* KPI 2: KEPATUHAN LAPORAN LKPM INVESTOR (DATASET #2 HAL. 46) */}
        <div
          onClick={() => onSelectUnit?.('dit-investasi')}
          className="bg-gradient-to-br from-sky-50/80 via-blue-50/40 to-white rounded-lg border border-sky-200/80 hover:border-sky-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tingkat Kepatuhan Laporan LKPM Investor (Dit. Investasi)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                <FileCheck2 className="w-2.5 h-2.5" />
              </span>
              Kepatuhan LKPM
            </span>
            <span className="font-bold text-sky-800 bg-white/90 border border-sky-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              96,4% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              1.248 Badan Usaha
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Tertib Pelaporan BKPM
            </span>
          </div>
        </div>

        {/* KPI 3: KECEPATAN LAYANAN ADMINISTRATOR KEK (DATASET #3 HAL. 10) */}
        <div
          onClick={() => onSelectUnit?.('dit-pengembangan-kek')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kecepatan Layanan Administrator KEK (Dit. KEK)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Izin Administrator KEK
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              SLA 2,1 Hari
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              342 Izin Terbit
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar Regulasi: 3 Hari Kerja
            </span>
          </div>
        </div>

        {/* KPI 4: KEPATUHAN PKS KERJA SAMA BADAN USAHA (DATASET #1 & #3 HAL. 14) */}
        <div
          onClick={() => onSelectUnit?.('dit-pengendalian-usaha')}
          className="bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-white rounded-lg border border-indigo-200/80 hover:border-indigo-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kepatuhan PKS Kerja Sama Badan Usaha (Dit. Pengendalian Usaha)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Kepatuhan PKS BU
            </span>
            <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              95,5% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              105 / 110 Rekomendasi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              28 Dokumen PKS Diawasi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
