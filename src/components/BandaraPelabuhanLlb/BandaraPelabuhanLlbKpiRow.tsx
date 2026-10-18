import React from 'react';
import {
  Award,
  DollarSign,
  TrendingUp,
  Plane,
  Anchor,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Scale,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A5_KPIS } from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedQuarter?: string;
  selectedUnit?: string;
}

// Sparkline Mock Data for 3 IKPs + 1 Consolidated Total in DEP-A5
const SPARKLINE_IKP1 = [
  { v: 84.1 }, { v: 85.2 }, { v: 86.3 }, { v: 87.1 }, { v: 87.9 }, { v: 88.45 },
];
const SPARKLINE_IKP2 = [
  { v: 485 }, { v: 502 }, { v: 518 }, { v: 535 }, { v: 549 }, { v: 562.85 },
];
const SPARKLINE_IKP3 = [
  { v: 1.8 }, { v: 1.95 }, { v: 2.1 }, { v: 2.2 }, { v: 2.35 }, { v: 2.48 },
];
const SPARKLINE_TOTAL = [
  { v: 486.8 }, { v: 503.95 }, { v: 520.1 }, { v: 537.2 }, { v: 551.35 }, { v: 565.33 },
];

export const BandaraPelabuhanLlbKpiRow: React.FC<BandaraPelabuhanLlbKpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
}) => {
  const ikp1 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-1-ikm-gabungan') || PERKIN_A5_KPIS[0];
  const ikp2 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-2-pnbp-bandara-pelabuhan') || PERKIN_A5_KPIS[1];
  const ikp3 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-3-pnbp-lalu-lintas-barang') || PERKIN_A5_KPIS[2];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A5 (KOMPAK, GRADIENT & EKSEKUTIF) */}
      {/* Model Persis DEP-A4: 4 Kolom dengan Sparkline Area Chart           */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Rata-rata Nilai IKM Layanan Gabungan */}
        <div
          onClick={() => onOpenFormulaModal(ikp1.id)}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 1 Rata-rata IKM Layanan Gabungan"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5 truncate">
                <Award className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
                <span className="truncate">IKP 1 &bull; Rata-rata IKM Layanan</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {ikp1.realization}
              </span>
              <span className="text-xs font-bold text-blue-100">Mutu A (Sangat Baik)</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: {ikp1.programTarget}</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikp1.achievement.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* IKP 2: Realisasi PNBP Bandara & Kepelabuhanan */}
        <div
          onClick={() => onOpenFormulaModal(ikp2.id)}
          className="bg-gradient-to-br from-sky-50/95 via-blue-50/60 to-sky-50/30 border border-sky-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 2 Realisasi PNBP Bandara & Kepelabuhanan"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-sky-900 flex items-center gap-1.5 truncate">
                <Plane className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span className="truncate">IKP 2 &bull; PNBP Bandara &amp; Pelabuhan</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <Anchor className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Rp 562,85
              </span>
              <span className="text-xs font-bold text-slate-600">Miliar</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: Rp 518,21 M</span>
              <span className="font-bold text-sky-800 bg-white/90 border border-sky-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikp2.achievement.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* IKP 3: Realisasi PNBP Dit. Lalu Lintas Barang */}
        <div
          onClick={() => onOpenFormulaModal(ikp3.id)}
          className="bg-gradient-to-br from-amber-50/95 via-orange-50/60 to-amber-50/30 border border-amber-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 3 Realisasi PNBP Lalu Lintas Barang"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1.5 truncate">
                <Truck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="truncate">IKP 3 &bull; PNBP Lalu Lintas Barang</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <Truck className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Rp 2,48
              </span>
              <span className="text-xs font-bold text-slate-600">Miliar</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: Rp 2,20 M</span>
              <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikp3.achievement.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>
        </div>

        {/* KONSOLIDASI TOTAL PNBP DEP-A5 (3 SATKER) */}
        <div
          onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
          className="bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Total PNBP Gabungan 3 Satker Perkin A5"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-900 flex items-center gap-1.5 truncate">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">Total PNBP Konsolidasi A5</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Rp 565,33
              </span>
              <span className="text-xs font-bold text-slate-600">Miliar</span>
            </div>

            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: Rp 520,41 M</span>
              <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                108,6% Melampaui
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL TAMBAHAN DI BAWAH UTAMA     */}
      {/* Sesuai Instruksi User: Non-duplikasi terhadap data di Unit Deep Dive */}
      {/* (Tidak membuat metrik yang sudah tampil di deep dive seperti kargo)   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: HUB KONEKTIVITAS PENUMPANG (LAUT & UDARA) */}
        <div
          onClick={() => onSelectUnit?.('dit-bandara')}
          className="bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Rasio Hub Konektivitas Penumpang Gabungan (Laut & Udara)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Compass className="w-2.5 h-2.5" />
              </span>
              Hub Konektivitas Penumpang
            </span>
            <span className="font-bold text-blue-800 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              +8,4% YoY
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              12,54 Juta Orang
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Gabungan Laut &amp; Udara
            </span>
          </div>
        </div>

        {/* KPI 2: KEPATUHAN SAFETY & SECURITY REGULASI (ICAO & IMO) */}
        <div
          onClick={() => onSelectUnit?.('dit-pelabuhan')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tingkat Kepatuhan Regulasi Keselamatan ICAO & IMO (Bandara & Pelabuhan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Standar Safety ICAO &amp; IMO
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              98,8% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Zero Accident
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              ISPS Code &amp; Airport Security
            </span>
          </div>
        </div>

        {/* KPI 3: INDEKS KEPUASAN PENGGUNA JASA LOGISTIK & BONGKAR MUAT */}
        <div
          onClick={() => onSelectUnit?.('dit-pelabuhan')}
          className="bg-gradient-to-br from-sky-50/80 via-blue-50/40 to-white rounded-lg border border-sky-200/80 hover:border-sky-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Kepuasan Pengguna Jasa Logistik & Bongkar Muat"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                <Scale className="w-2.5 h-2.5" />
              </span>
              IKP Jasa Logistik
            </span>
            <span className="font-bold text-sky-800 bg-white/90 border border-sky-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              89,20 / 100
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Kategori Prima
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Dwelling Time 2,4 Hari
            </span>
          </div>
        </div>

        {/* KPI 4: EFISIENSI WAKTU LAYANAN IZIN KAWASAN & DOKUMEN LLB (SLA) */}
        <div
          onClick={() => onSelectUnit?.('dit-lalu-lintas-barang')}
          className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white rounded-lg border border-amber-200/80 hover:border-amber-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Efisiensi Waktu Layanan SLA Izin Kawasan & Dokumen LLB (Dit. LLB)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Izin &amp; Dokumen LLB
            </span>
            <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              97,4% On-Time
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              1,6 Hari Kerja
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar Regulasi: 3 Hari
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
