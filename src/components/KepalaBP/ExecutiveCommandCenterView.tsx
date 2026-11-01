import React, { useState } from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { KepalaBpFilterState } from './KepalaBpCompactFilter';
import { KompasPerformaSection } from './KompasPerformaSection';
import { KonsolidasiMultiUnitSummary } from './KonsolidasiMultiUnitSummary';
import { KonsolidasiSatuDataFormulaModal } from './KonsolidasiSatuDataFormulaModal';
import { OperasionalBadanUsahaKpiRow } from './OperasionalBadanUsahaKpiRow';
import { NarasiAiInsightBar } from './NarasiAiInsightBar';

// Mini Sparkline Data for 4 KPI Cards
const SPARKLINE_INVESTASI = [
  { v: 12 }, { v: 18 }, { v: 24 }, { v: 31 }, { v: 38 }, { v: 45 }, { v: 54.68 }
];
const SPARKLINE_IKM = [
  { v: 86.4 }, { v: 87.1 }, { v: 87.5 }, { v: 87.9 }, { v: 88.2 }, { v: 88.42 }
];
const SPARKLINE_PNBP = [
  { v: 320 }, { v: 640 }, { v: 980 }, { v: 1250 }, { v: 1580 }, { v: 1892.4 }
];
const SPARKLINE_RB = [
  { v: 76.8 }, { v: 78.5 }, { v: 79.8 }, { v: 80.6 }, { v: 81.0 }, { v: 81.35 }
];

interface ExecutiveCommandCenterViewProps {
  filterState: KepalaBpFilterState;
  onSelectIksDetail: (iksId: string) => void;
  onOpenManualModal: (iksId: string) => void;
  onNavigateToCrossUnitMatrix: () => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const ExecutiveCommandCenterView: React.FC<ExecutiveCommandCenterViewProps> = ({
  filterState,
  onSelectIksDetail,
  onOpenManualModal,
  onNavigateToCrossUnitMatrix,
  onNavigateToUnit,
}) => {
  // Year Filter State (2026 vs 2025)
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025'>('2026');

  // Formula Modal State
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);

  const handleOpenFormula = (metricId: string) => {
    setSelectedMetricId(metricId);
    setIsFormulaModalOpen(true);
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans antialiased space-y-3 pb-0">
      {/* ================================================================== */}
      {/* 1. TOP HEADER EKSEKUTIF SLIM: HANYA TULISAN JUDUL & FILTER TAHUN   */}
      {/* ================================================================== */}
      <header className="bg-white rounded-xl border border-slate-200/80 px-4 py-2.5 shadow-2xs flex items-center justify-between gap-3">
        {/* Left: Hanya tulisan Executive Command Center BP Batam */}
        <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
          Executive Command Center BP Batam
        </h1>

        {/* Right: Filter Tahun 2026 dan Tahun 2025 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Tahun Anggaran:</span>
          <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedYear('2026')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                selectedYear === '2026'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2026
            </button>
            <button
              type="button"
              onClick={() => setSelectedYear('2025')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                selectedYear === '2025'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2025
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* 2. BARIS PERTAMA: 4 KARTU KPI INDIKATOR KINERJA STRATEGIS (IKS)    */}
      {/* ANGKA BESAR, IKON BULAT BERWARNA, CAPAIAN %, SPARKLINE MINI       */}
      {/* ================================================================== */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* KPI 1: Realisasi Investasi - SIGNATURE VIBRANT ROYAL BLUE CARD */}
          <div
            onClick={() => onSelectIksDetail('iks-1')}
            className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-100 tracking-tight">IKS 1 &bull; Investasi KPBPB</span>
                <div className="w-5.5 h-5.5 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-white tracking-tight font-mono block">
                {selectedYear === '2026' ? 'Rp 54,68 T' : 'Rp 49,20 T'}
              </span>
              <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-white/15">
                <span className="text-blue-100/90 font-medium">
                  {selectedYear === '2026' ? 'Target Rp 70 T (78,1%)' : 'Target Rp 60 T (82,0%)'}
                </span>
                <span className="text-blue-100/90 font-mono font-semibold">
                  {selectedYear === '2026' ? '+11,1% YoY' : 'Realisasi 2025'}
                </span>
              </div>
            </div>
          </div>

          {/* KPI 2: Indeks Kepuasan Masyarakat (IKM) - BLUE CARD */}
          <div
            onClick={() => onSelectIksDetail('iks-2')}
            className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-100 tracking-tight">IKS 2 &bull; Kepuasan IKM</span>
                <div className="w-5.5 h-5.5 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                  <Smile className="w-3 h-3 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-white tracking-tight font-mono block">
                {selectedYear === '2026' ? '88,42' : '86,10'}
              </span>
              <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-white/15">
                <span className="text-blue-100/90 font-medium">
                  {selectedYear === '2026' ? 'Target 88,00 (Mutu A)' : 'Target 85,00 (Mutu B)'}
                </span>
                <span className="text-blue-100/90 font-mono font-semibold">
                  {selectedYear === '2026' ? '+2,7% YoY' : 'Realisasi 2025'}
                </span>
              </div>
            </div>
          </div>

          {/* KPI 3: Realisasi Penerimaan PNBP - BLUE CARD */}
          <div
            onClick={() => onSelectIksDetail('iks-3')}
            className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-100 tracking-tight">IKS 3 &bull; Penerimaan PNBP</span>
                <div className="w-5.5 h-5.5 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                  <DollarSign className="w-3 h-3 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-white tracking-tight font-mono block">
                {selectedYear === '2026' ? 'Rp 1.892,4 M' : 'Rp 1.724,1 M'}
              </span>
              <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-white/15">
                <span className="text-blue-100/90 font-medium">
                  {selectedYear === '2026' ? 'Target Rp 2.447,8 M (77,3%)' : 'Target Rp 2.100,0 M (82,1%)'}
                </span>
                <span className="text-blue-100/90 font-mono font-semibold">
                  {selectedYear === '2026' ? '+9,8% YoY' : 'Realisasi 2025'}
                </span>
              </div>
            </div>
          </div>

          {/* KPI 4: Indeks Reformasi Birokrasi - BLUE CARD */}
          <div
            onClick={() => onSelectIksDetail('iks-4')}
            className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-100 tracking-tight">IKS 4 &bull; Reformasi Birokrasi</span>
                <div className="w-5.5 h-5.5 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-white tracking-tight font-mono block">
                {selectedYear === '2026' ? '81,35 / A' : '78,40 / BB'}
              </span>
              <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-white/15">
                <span className="text-blue-100/90 font-medium">
                  {selectedYear === '2026' ? 'Target 80,00 (BB)' : 'Target 78,00 (BB)'}
                </span>
                <span className="text-blue-100/90 font-mono font-semibold">
                  {selectedYear === '2026' ? '+3,8% YoY' : 'Realisasi 2025'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2B. KONSOLIDASI KINERJA OPERASIONAL MULTI-UNIT (3 KARTU KPI RINGKAS)*/}
      {/* (Serapan Belanja 85.5%, Kepatuhan SLA 96.4%, Audit BPK/SPI 91.4%)   */}
      {/* ================================================================== */}
      <section>
        <OperasionalBadanUsahaKpiRow
          onOpenFormula={handleOpenFormula}
          onNavigateToUnit={onNavigateToUnit}
        />
      </section>

      {/* ================================================================== */}
      {/* 3. SECTION 2: KOMPAS PERFORMA 4 IKS (DUA KOLOM SESUAI REFERENSI)   */}
      {/* KIRI: RADAR CHART 4 IKS | KANAN: TAB INTERAKTIF 4 IKS & CHARTS     */}
      {/* ================================================================== */}
      <section>
        <KompasPerformaSection
          onSelectIksDetail={onSelectIksDetail}
          onOpenManualModal={onOpenManualModal}
        />
      </section>

      {/* ================================================================== */}
      {/* 4. SECTION 3: KONSOLIDASI KINERJA MULTI-UNIT (DIREKTORAT, BIRO, BU)*/}
      {/* RINGKASAN DATA ATRIBUT RESMI BUKU SATU DATA BP BATAM (HAL. 1 - 53)  */}
      {/* ================================================================== */}
      <section>
        <KonsolidasiMultiUnitSummary
          onOpenSatuDataFormula={handleOpenFormula}
          onNavigateToUnit={onNavigateToUnit}
        />
      </section>

      {/* ================================================================== */}
      {/* 5. NARASI AI STRATEGIS                                             */}
      {/* ================================================================== */}
      <section>
        <NarasiAiInsightBar />
      </section>

      {/* Satu Data Formula Modal */}
      <KonsolidasiSatuDataFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialMetricIdOrKeyword={selectedMetricId}
        onNavigateToUnit={onNavigateToUnit}
      />
    </div>
  );
};
