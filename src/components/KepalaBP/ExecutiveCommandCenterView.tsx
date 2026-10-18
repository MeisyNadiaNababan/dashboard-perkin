import React, { useState } from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  Compass,
  Search,
  Calendar,
  Download,
  Building2,
  HardHat,
  Droplets,
  MapPin,
  Sparkles,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Coins,
  Shield,
  FileCheck2,
  Clock,
  ArrowRight
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
  // Search & Period State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('TA 2026 (Berjalan)');

  // Formula Modal State
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(null);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);

  const handleOpenFormula = (metricId: string) => {
    setSelectedMetricId(metricId);
    setIsFormulaModalOpen(true);
  };

  const handleExportCsv = () => {
    const csvData = [
      ['KONSOLIDASI EKSEKUTIF PERKIN & DATA STRATEGIS KEPALA BP BATAM 2026'],
      ['No', 'Indikator / Satker', 'Target / Pagu', 'Realisasi YTD', 'Capaian (%)', 'Status'],
      ['1', 'IKS 1: Realisasi Investasi di KPBPB', 'Rp 70,00 T', 'Rp 54,68 T', '78,11%', 'On Track'],
      ['2', 'IKS 2: Indeks Kepuasan Masyarakat (IKM)', '88,00 Poin', '88,42 Poin', '100,48%', 'Tercapai (Mutu A)'],
      ['3', 'IKS 3: Realisasi PNBP BP Batam', 'Rp 2.447,8 M', 'Rp 1.892,4 M', '77,31%', 'On Track'],
      ['4', 'IKS 4: Indeks Reformasi Birokrasi', '80,00 (BB)', '81,35 (A)', '101,69%', 'Tercapai (Memuaskan)'],
      ['5', 'Dit. Pengelolaan Pertanahan (UWT)', 'Rp 964,3 M', 'Rp 748,2 M', '77,59%', '248,5 Ha Alokasi'],
      ['6', 'Dit. Pengelolaan Kepelabuhanan', '650.000 TEUs', '612.400 TEUs', '94,20%', '18.420 Call Kapal'],
      ['7', 'BU SPAM (Kapasitas 6 Waduk)', '167,3M m³', '161,96M m³', '96,80%', 'Suplai 3.840 L/s'],
      ['8', 'Dit. Kawasan Bandara Hang Nadim', 'Rp 130,5 M', 'Rp 106,8 M', '81,87%', '4,12M Pax & 42k Ton EMPU'],
      ['9', 'Dit. Pembangunan Infrastruktur', '14 Megaproyek', '92,4% Fisik', '100,8%', 'Flyover Sei Ladi 94,2%'],
      ['10', 'Biro Keuangan (Kas Bank BLU)', 'Rp 2.447,8 M', 'Rp 1.428,5 M Kas', 'WTP 8x', 'Serapan Belanja 77,6%'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvData.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Konsolidasi_Eksekutif_Kepala_BP_Batam_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans antialiased min-h-screen space-y-3.5 pb-8">
      {/* ================================================================== */}
      {/* 1. TOP HEADER EKSEKUTIF (FULL-WIDTH, TANPA SIDEBAR)                */}
      {/* ================================================================== */}
      <header className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Executive Command Center BP Batam
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Perkin 2026 &bull; Satu Data Terpadu
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Sistem Pengawasan Terpadu Kinerja 4 IKS &amp; Multi-Indikator 24 Satker (Direktorat, Biro &amp; Badan Usaha)
            </p>
          </div>
        </div>

        {/* Right: Search, Filter Periode & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari indikator, satker, proyek..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-0.5"
              >
                &times;
              </button>
            )}
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-xl text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="TA 2026 (Berjalan)">Tahun Anggaran 2026 (Berjalan)</option>
              <option value="Triwulan I 2026">Triwulan I 2026 (Jan - Mar)</option>
              <option value="Triwulan II 2026">Triwulan II 2026 (Apr - Jun)</option>
              <option value="Kumulatif YTD">Kumulatif Cut-Off YTD</option>
            </select>
          </div>

          {/* Export Report Button */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data</span>
          </button>

          {/* Manual IKS Link */}
          <button
            onClick={() => onOpenManualModal('iks-1')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/70 transition-colors cursor-pointer"
            title="Buka Manual Definisi & Rumus IKS"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Manual IKS</span>
          </button>
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
                <span className="text-[11px] font-semibold text-blue-100">IKS 1 &bull; Investasi</span>
                <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-white tracking-tight block">
                Rp 54,68 T
              </span>
              <div className="flex items-center justify-between text-[10.5px] mt-0.5">
                <span className="text-blue-100/90">Target Rp 70 T</span>
                <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                  78,1% On Track
                </span>
              </div>
            </div>
          </div>

          {/* KPI 2: Indeks Kepuasan Masyarakat (IKM) - SOFT MINT / PASTEL GREEN */}
          <div
            onClick={() => onSelectIksDetail('iks-2')}
            className="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-emerald-800">IKS 2 &bull; Kepuasan IKM</span>
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Smile className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
                88,42
              </span>
              <div className="flex items-center justify-between text-[10.5px] mt-0.5">
                <span className="text-slate-500 font-medium">Target 88,00</span>
                <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                  100,5% Tercapai
                </span>
              </div>
            </div>
          </div>

          {/* KPI 3: Realisasi Penerimaan PNBP - SOFT WARM AMBER / GOLD */}
          <div
            onClick={() => onSelectIksDetail('iks-3')}
            className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/30 border border-amber-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-amber-800">IKS 3 &bull; Penerimaan PNBP</span>
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <DollarSign className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
                Rp 1.892,4 M
              </span>
              <div className="flex items-center justify-between text-[10.5px] mt-0.5">
                <span className="text-slate-500 font-medium">Target Rp 2.447,8 M</span>
                <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                  77,3% On Track
                </span>
              </div>
            </div>
          </div>

          {/* KPI 4: Indeks Reformasi Birokrasi - SOFT PASTEL PURPLE / LAVENDER */}
          <div
            onClick={() => onSelectIksDetail('iks-4')}
            className="bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-purple-50/30 border border-purple-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-purple-800">IKS 4 &bull; Reformasi Birokrasi</span>
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
                81,35 / A
              </span>
              <div className="flex items-center justify-between text-[10.5px] mt-0.5">
                <span className="text-slate-500 font-medium">Target 80,00</span>
                <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                  101,7% Tercapai
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
      {/* 5. NARASI AI STRATEGIS (SESUAI REFERENSI SCREENSHOT PIMPINAN)      */}
      {/* ================================================================== */}
      <section>
        <NarasiAiInsightBar />
      </section>

      {/* ================================================================== */}
      {/* 6. FOOTER RESMI EKSEKUTIF                                          */}
      {/* ================================================================== */}
      <footer className="pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span>Sistem Pemantauan Terpadu &bull; Badan Pengusahaan Kawasan Batam (KPBPB) TA 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onOpenManualModal('iks-1')}
            className="hover:text-blue-600 transition-colors cursor-pointer font-medium"
          >
            Manual IKS
          </button>
          <span>&bull;</span>
          <button
            onClick={onNavigateToCrossUnitMatrix}
            className="hover:text-blue-600 transition-colors cursor-pointer font-medium"
          >
            Matriks 24 Satker
          </button>
          <span>&bull;</span>
          <span className="font-semibold text-slate-700">Perkin No. 1/SPJ/KA/1/2026</span>
        </div>
      </footer>

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
