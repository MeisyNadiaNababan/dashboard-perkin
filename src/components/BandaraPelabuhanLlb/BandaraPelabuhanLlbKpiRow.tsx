import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Info,
  CheckCircle2,
  DollarSign,
  Users,
  Plane,
  Anchor,
  Truck,
  Package,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  HelpCircle,
  Clock,
  FileCheck2,
  Compass,
  FileText,
  BarChart2,
  Navigation,
  Scale,
  Sparkles,
  MapPin,
} from 'lucide-react';
import {
  PERKIN_A5_METADATA,
  PERKIN_A5_KPIS,
  SATKER_A5_LIST,
} from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedQuarter?: string;
  selectedUnit?: string;
  onNavigateToUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbKpiRow: React.FC<BandaraPelabuhanLlbKpiRowProps> = ({
  onOpenFormulaModal,
  selectedQuarter = 'ALL',
  selectedUnit = 'ALL',
  onNavigateToUnit,
}) => {
  // Display Mode: Semua Indikator vs Hanya KPI Utama Perkin vs Hanya KPI Selain Utama
  const [displayMode, setDisplayMode] = useState<
    'all' | 'primary_only' | 'operational_only'
  >('all');

  const ikp1 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-1-ikm-gabungan') || PERKIN_A5_KPIS[0];
  const ikp2 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-2-pnbp-bandara-pelabuhan') || PERKIN_A5_KPIS[1];
  const ikp3 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-3-pnbp-lalu-lintas-barang') || PERKIN_A5_KPIS[2];

  const unitBandara = SATKER_A5_LIST.find((u) => u.id === 'dit-bandara') || SATKER_A5_LIST[0];
  const unitPelabuhan = SATKER_A5_LIST.find((u) => u.id === 'dit-pelabuhan') || SATKER_A5_LIST[1];
  const unitLlb = SATKER_A5_LIST.find((u) => u.id === 'dit-lalu-lintas-barang') || SATKER_A5_LIST[2];

  return (
    <div className="space-y-4 font-sans">
      {/* ============================================================== */}
      {/* 1. OVERARCHING EXECUTIVE CONSOLIDATED STRIP (3 IKP PERKIN A5)  */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0A3D62] to-[#1F3864] rounded-2xl p-4 sm:p-5 text-white shadow-sm border border-slate-700/60 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-cyan-300 border border-sky-400/30 uppercase tracking-wider">
                PERJANJIAN KINERJA (PERKIN A.5 TAHUN 2025)
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                Nomor: {PERKIN_A5_METADATA.nomorPerkin} &bull; 13 Maret 2025
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>Konsolidasi 3 Indikator Kinerja Program (DEP-A5)</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 font-mono">
                100% Tercapai
              </span>
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl">
              Sasaran Program:{' '}
              <strong className="text-white font-semibold">
                {PERKIN_A5_METADATA.sasaranProgram}
              </strong>{' '}
              &bull; Total Pagu DIPA:{' '}
              <strong className="text-cyan-300 font-mono font-bold">
                Rp 59,51 Miliar
              </strong>{' '}
              (Realisasi Rp 23,80 M / 40,0%)
            </p>
          </div>

          {/* 3 Point Summary Metrics Pill Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0">
            {/* IKP 1 IKM */}
            <div
              onClick={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer space-y-0.5 group"
              title="Buka Formula & Detail IKP-1"
            >
              <div className="flex items-center justify-between text-[10px] text-cyan-200">
                <span className="font-mono font-bold">IKP-1: Rata-rata IKM</span>
                <span className="text-[9px] font-mono bg-cyan-400/20 px-1 rounded text-cyan-200">
                  {ikp1.achievement.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black font-mono text-white group-hover:text-cyan-300 transition-colors">
                  {ikp1.realization}
                </span>
                <span className="text-[10px] text-slate-300">Target {ikp1.programTarget}</span>
              </div>
              <div className="text-[9.5px] text-emerald-300 font-medium">Mutu A (Sangat Baik)</div>
            </div>

            {/* IKP 2 PNBP Bandara & Pelabuhan */}
            <div
              onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer space-y-0.5 group"
              title="Buka Formula & Detail IKP-2"
            >
              <div className="flex items-center justify-between text-[10px] text-cyan-200">
                <span className="font-mono font-bold">IKP-2: PNBP Bandara-Laut</span>
                <span className="text-[9px] font-mono bg-emerald-400/20 px-1 rounded text-emerald-200">
                  {ikp2.achievement.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black font-mono text-white group-hover:text-emerald-300 transition-colors">
                  Rp 562,8 M
                </span>
                <span className="text-[10px] text-slate-300">Target Rp 518,2 M</span>
              </div>
              <div className="text-[9.5px] text-emerald-300 font-medium">+Rp 44,6 M Surplus</div>
            </div>

            {/* IKP 3 PNBP LLB */}
            <div
              onClick={() => onOpenFormulaModal('ikp-3-pnbp-lalu-lintas-barang')}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer space-y-0.5 group"
              title="Buka Formula & Detail IKP-3"
            >
              <div className="flex items-center justify-between text-[10px] text-cyan-200">
                <span className="font-mono font-bold">IKP-3: PNBP LLB</span>
                <span className="text-[9px] font-mono bg-amber-400/20 px-1 rounded text-amber-200">
                  {ikp3.achievement.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black font-mono text-white group-hover:text-amber-300 transition-colors">
                  Rp 2,48 M
                </span>
                <span className="text-[10px] text-slate-300">Target Rp 2,20 M</span>
              </div>
              <div className="text-[9.5px] text-amber-300 font-medium">+Rp 0,28 M Melampaui</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION HEADER & VIEW MODE TOGGLE BUTTONS                   */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 rounded-full bg-blue-600" />
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 flex flex-wrap items-center gap-2">
            <span>3 PILAR UNIT KERJA PENGAMPU PERKIN A.5 (BANDARA, PELABUHAN &amp; LALU LINTAS BARANG)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
              KONSOLIDASI 46 DATASET SATU DATA
            </span>
          </h2>
        </div>

        {/* View Toggle: Semua vs Hanya KPI Utama vs Hanya KPI Selain Utama */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setDisplayMode('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              displayMode === 'all'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Indikator
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('primary_only')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              displayMode === 'primary_only'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>•</span>
            <span>Hanya KPI Utama Perkin</span>
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('operational_only')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              displayMode === 'operational_only'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>◆</span>
            <span>KPI Selain Utama (Operasional)</span>
          </button>
        </div>
      </div>

      <div className="text-xs text-slate-500 font-medium flex flex-wrap items-center justify-between gap-1 pb-1">
        <span>
          Pihak Pertama: <strong className="text-slate-700">{PERKIN_A5_METADATA.pihakPertama.nama}</strong> ({PERKIN_A5_METADATA.pihakPertama.jabatan})
        </span>
        <span className="font-mono text-[11px] text-slate-600">
          Struktur: 3 IKP Utama Perkin + 15 Indikator Operasional Lintas 46 Dataset
        </span>
      </div>

      {/* ============================================================== */}
      {/* 3. 3 WORK UNIT KPI CARDS (IDENTIK MODEL KARTU DEP-A1 & DEP-A3) */}
      {/* ============================================================== */}
      <div className="grid gap-3.5 grid-cols-1 lg:grid-cols-3">
        {/* ========================================================================= */}
        {/* KARTU 1: DIREKTORAT PENGELOLAAN KAWASAN BANDARA (HANG NADIM)              */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-emerald-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'dit-bandara'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                    UNIT KERJA 1 &bull; KAWASAN BANDARA
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors">
                    Dit. Pengelolaan Kawasan Bandara
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {unitBandara.capaianPnbpPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
                  className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis PNBP Bandara"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: Realisasi PNBP Bandara & IKM Bandara (KPI Utama Perkin) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-emerald-50/70 to-slate-50/90 rounded-lg p-3 border border-emerald-100/80 my-3">
                <div className="text-[10px] font-bold text-emerald-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-emerald-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    IKP #2 (Porsi 22%): PNBP Bandara
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      Rp 124,50 M
                    </span>
                    <span className="text-xs font-bold text-emerald-700">107,03%</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">Rp 116,32 M</span>
                  </div>
                </div>

                {/* Sub-IKP IKM Bandara */}
                <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-600" />
                    <span>Lokus IKM Bandara (Skor):</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black font-mono text-slate-900">87.80</span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Mutu B (Target 86.30)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500"
                    style={{ width: `${Math.min(100, unitBandara.capaianPnbpPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 11-12, 12 Dataset) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    12 Dataset
                  </span>
                </div>

                {/* Metric 1: Arus Penumpang Udara */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Arus Penumpang Udara</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 2 Hal. 11 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-emerald-700">4,12 Jt Pax</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      108,0% Target
                    </span>
                  </div>
                </div>

                {/* Metric 2: Pergerakan Pesawat / Throughput Penerbangan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Pergerakan Pesawat (Flight)</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 2 Hal. 11 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-teal-700">34.250 Call</div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1 py-0.2 rounded border border-teal-200">
                      102,5% Traffic
                    </span>
                  </div>
                </div>

                {/* Metric 3: Kargo Udara (EMPU) */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Ekspedisi Muatan Udara (EMPU)</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 5 Hal. 12 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-sky-700">42.150 Ton</div>
                    <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                      105,4% Porsi
                    </span>
                  </div>
                </div>

                {/* Metric 4: Rute Penerbangan Langsung */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Rute Penerbangan Langsung</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 9 Hal. 12 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-slate-900">28 Rute</div>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded">
                      Domestik/Intl
                    </span>
                  </div>
                </div>

                {/* Metric 5: Utilisasi Runway 4.025m & Fasilitas Sisi Udara */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Utilisasi Fasilitas Bandara</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 6, 7 &amp; 8 Hal. 12</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-indigo-700">94,2%</div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                      Runway 4.025m
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Optimal &amp; Melampaui
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateToUnit?.('dit-bandara')}
                className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Bandara"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
                className="text-slate-500 hover:text-emerald-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 2: DIREKTORAT PENGELOLAAN KEPELABUHANAN (PELABUHAN LAUT BATAM)       */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-blue-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'dit-pelabuhan'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <Anchor className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    UNIT KERJA 2 &bull; KEPELABUHANAN
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors">
                    Dit. Pengelolaan Kepelabuhanan
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  {unitPelabuhan.capaianPnbpPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
                  className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis PNBP Pelabuhan"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: Realisasi PNBP Kepelabuhanan & IKM Pelabuhan (KPI Utama Perkin) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-blue-50/70 to-slate-50/90 rounded-lg p-3 border border-blue-100/80 my-3">
                <div className="text-[10px] font-bold text-blue-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-blue-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    IKP #2 (Porsi 78%): PNBP Kepelabuhanan
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      Rp 438,35 M
                    </span>
                    <span className="text-xs font-bold text-blue-700">109,07%</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">Rp 401,89 M</span>
                  </div>
                </div>

                {/* Sub-IKP IKM Pelabuhan */}
                <div className="mt-2 pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-600" />
                    <span>Lokus IKM Pelabuhan (Skor):</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black font-mono text-slate-900">88.20</span>
                    <span className="text-[9.5px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
                      Mutu A (Target 86.30)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={{ width: `${Math.min(100, unitPelabuhan.capaianPnbpPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 14-17, 25 Dataset) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    25 Dataset
                  </span>
                </div>

                {/* Metric 1: Kunjungan Kapal Barang & Penumpang */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Anchor className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Kunjungan Kapal (Call)</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 5 &amp; 7 Hal. 15 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-blue-700">18.420 Call</div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                      104,2% Traffic
                    </span>
                  </div>
                </div>

                {/* Metric 2: Bongkar Muat Peti Kemas Batu Ampar */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Peti Kemas Batu Ampar</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 23 Hal. 17 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-indigo-700">612.400 TEUs</div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                      STS Crane
                    </span>
                  </div>
                </div>

                {/* Metric 3: Volume Curah Cair & General Cargo */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Volume Kargo &amp; Curah Cair</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 22 &amp; 24 Hal. 17 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-cyan-700">45,20 Jt Ton</div>
                    <span className="text-[10px] font-mono text-cyan-800 font-bold bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                      Kabil &amp; Ampar
                    </span>
                  </div>
                </div>

                {/* Metric 4: Arus Penumpang Laut Domestik & Internasional */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Arus Penumpang Pelabuhan</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 25 Hal. 17 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-slate-900">7,85 Jt Pax</div>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1 py-0.2 rounded border border-purple-200">
                      Dom / Intl Ferry
                    </span>
                  </div>
                </div>

                {/* Metric 5: Kepatuhan Standar Operasional Pelabuhan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Kepatuhan Standar SOP</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 1, 4 &amp; 13 Hal. 14-16</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-emerald-700">96,8%</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      12 Dermaga
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-blue-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Prima &amp; Melampaui
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateToUnit?.('dit-pelabuhan')}
                className="font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Pelabuhan"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
                className="text-slate-500 hover:text-blue-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KARTU 3: DIREKTORAT LALU LINTAS BARANG (LOGISTIK & PERIZINAN KAWASAN)     */}
        {/* ========================================================================= */}
        <div
          className={`bg-white rounded-xl border transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 border-t-amber-600 ${
            selectedUnit === 'ALL' || selectedUnit === 'dit-lalu-lintas-barang'
              ? 'border-slate-200/90 shadow-xs hover:shadow-md'
              : 'opacity-60 border-slate-100'
          }`}
        >
          <div>
            {/* Top Badge & Unit Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                    UNIT KERJA 3 &bull; LALU LINTAS BARANG
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
                    Dit. Lalu Lintas Barang
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-amber-600" />
                  {unitLlb.capaianPnbpPersen.toFixed(1)}%
                </span>
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-3-pnbp-lalu-lintas-barang')}
                  className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                  title="Formula & Manual Teknis PNBP LLB"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary IKP Card Block: Realisasi PNBP Lalu Lintas Barang (KPI Utama Perkin IKP-3) */}
            {displayMode !== 'operational_only' && (
              <div className="bg-gradient-to-br from-amber-50/70 to-slate-50/90 rounded-lg p-3 border border-amber-100/80 my-3">
                <div className="text-[10px] font-bold text-amber-950 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-black text-amber-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    IKP #3: PNBP Lalu Lintas Barang
                  </span>
                  <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      Rp 2,48 M
                    </span>
                    <span className="text-xs font-bold text-amber-700">112,73%</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">Rp 2,20 M</span>
                  </div>
                </div>

                {/* Sub-IKP IKM Lalu Lintas Barang */}
                <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-600 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-600" />
                    <span>Lokus IKM LLB (Skor):</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black font-mono text-slate-900">89.35</span>
                    <span className="text-[9.5px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                      Mutu A (Target 86.30)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-600 to-orange-500"
                    style={{ width: `${Math.min(100, unitLlb.capaianPnbpPersen)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ringkasan Kinerja Keseluruhan: KPI Selain KPI Utama dari Perkin (Buku Satu Data Hal. 8-9, 9 Dataset) */}
            {displayMode !== 'primary_only' && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div className="text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    <span>KPI SELAIN UTAMA (SATU DATA):</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                    9 Dataset
                  </span>
                </div>

                {/* Metric 1: Penerbitan Izin Lalu Lintas Barang */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Penerbitan Izin LLB (SK)</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 3 Hal. 9 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-amber-700">14.850 SK</div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                      100% Selesai
                    </span>
                  </div>
                </div>

                {/* Metric 2: Pengendalian Kuota Induk Konsumsi */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Realisasi Kuota Konsumsi</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 2 Hal. 8 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-emerald-700">128 Jenis</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      100% SK Kuota
                    </span>
                  </div>
                </div>

                {/* Metric 3: Izin Usaha Kawasan & KBLI */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Izin Usaha Kawasan (KBLI)</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 4 &amp; 5 Hal. 9 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-blue-700">382 PT</div>
                    <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                      Terverifikasi
                    </span>
                  </div>
                </div>

                {/* Metric 4: Izin Pemasukan & Pengeluaran Barang */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Inbound &amp; Outbound Cargo</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 6 &amp; 7 Hal. 9 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-slate-900">9.420 Dok</div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-200">
                      Sistem IBOSS
                    </span>
                  </div>
                </div>

                {/* Metric 5: Kepatuhan SLA Pelayanan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:bg-slate-100/70 transition-colors">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 truncate">Kepatuhan Waktu SLA Layanan</div>
                      <div className="text-[10px] text-slate-500 truncate">Data No. 8 &amp; 9 Hal. 9 Satu Data</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black font-mono text-cyan-700">96,8%</div>
                    <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1 py-0.2 rounded border border-cyan-200">
                      &lt; 24 Jam
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
            <span className="text-[11px] font-medium text-amber-700 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Status: Tepat Waktu &amp; Akuntabel
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateToUnit?.('dit-lalu-lintas-barang')}
                className="font-bold text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                title="Buka Analisis Satker Lalu Lintas Barang"
              >
                <span>Analisis Satker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenFormulaModal('ikp-3-pnbp-lalu-lintas-barang')}
                className="text-slate-500 hover:text-amber-700 text-xs font-semibold cursor-pointer"
                title="Kamus & Manual Regulasi"
              >
                Manual ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
