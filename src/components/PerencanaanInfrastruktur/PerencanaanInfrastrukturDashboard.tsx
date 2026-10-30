import React, { useState, useMemo } from 'react';
import {
  Compass,
  FileText,
  Calculator,
  Download,
  Filter,
  Sparkles,
  Layers,
  Building2,
  Boxes,
  Palmtree,
  Trees,
  Route,
  Ship,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { PerencanaanFilterState, PaketPerencanaan } from './types';
import {
  SEMUA_PAKET_PERENCANAAN,
  KPI_SEKTOR_LIST,
  STAGE_GATE_FUNNEL_DATA,
  UTILISASI_DOKUMEN_SUMMARY,
} from './perencanaanData';
import { PerencanaanFilters } from './PerencanaanFilters';
import { PerencanaanKpis } from './PerencanaanKpis';
import { PerencanaanVisualisasiData } from './PerencanaanVisualisasiData';
import { PerencanaanFormulaModal } from './PerencanaanFormulaModal';
import { PerencanaanWordDocView } from './PerencanaanWordDocView';
import { PerencanaanInfrastrukturVisualCharts } from '../InfrastrukturPerkinA7/PerencanaanInfrastrukturVisualCharts';

export const PerencanaanInfrastrukturDashboard: React.FC = () => {
  // Main Navigation Sub-tab: default to official 8 visual charts
  const [activeTab, setActiveTab] = useState<'visualisasi' | 'dashboard' | 'word-doc' | 'formula'>('visualisasi');

  // Filter State
  const [filters, setFilters] = useState<PerencanaanFilterState>({
    tahun: 'Semua',
    sektor: 'Semua',
    statusKesiapan: 'Semua',
    statusUtilisasi: 'Semua',
    wilayah: 'Semua',
    searchQuery: '',
  });

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedDatasetForFormula, setSelectedDatasetForFormula] = useState(1);

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<PerencanaanFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'Semua',
      sektor: 'Semua',
      statusKesiapan: 'Semua',
      statusUtilisasi: 'Semua',
      wilayah: 'Semua',
      searchQuery: '',
    });
  };

  // Filtered list of packages
  const filteredPakets = useMemo(() => {
    return SEMUA_PAKET_PERENCANAAN.filter((item) => {
      // Filter Tahun
      if (filters.tahun !== 'Semua' && item.tahunAnggaran !== filters.tahun) {
        return false;
      }
      // Filter Sektor
      if (filters.sektor !== 'Semua' && item.sektor !== filters.sektor) {
        return false;
      }
      // Filter Status Kesiapan
      if (filters.statusKesiapan !== 'Semua' && item.statusKesiapan !== filters.statusKesiapan) {
        return false;
      }
      // Filter Status Utilisasi
      if (filters.statusUtilisasi !== 'Semua' && item.statusUtilisasi !== filters.statusUtilisasi) {
        return false;
      }
      // Filter Wilayah
      if (filters.wilayah !== 'Semua' && item.lokasiKawasan !== filters.wilayah) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = item.namaKegiatan.toLowerCase().includes(query);
        const matchesKode = item.kodePaket.toLowerCase().includes(query);
        const matchesKonsultan = item.konsultanPerencana.toLowerCase().includes(query);
        const matchesKawasan = item.lokasiKawasan.toLowerCase().includes(query);
        if (!matchesName && !matchesKode && !matchesKonsultan && !matchesKawasan) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  // Recalculated KPI Summaries based on filtered dataset or all
  const dynamicKpis = useMemo(() => {
    return KPI_SEKTOR_LIST.map((kpi) => {
      const paketsInSektor = filteredPakets.filter((p) => p.sektor === kpi.sektor);
      const totalPagu = paketsInSektor.reduce((acc, p) => acc + p.paguKonsultansi, 0);
      const totalCapex = paketsInSektor.reduce((acc, p) => acc + p.estimasiCapexFisik, 0);
      const siapLelang = paketsInSektor.filter((p) => p.statusKesiapan === 'Selesai (Siap Lelang Fisik)').length;

      return {
        ...kpi,
        totalPaket: paketsInSektor.length,
        totalPaguDED: totalPagu,
        totalEstimasiCapexFisik: totalCapex,
        paketSiapLelangCount: siapLelang,
        persenSelesaiSiapLelang: paketsInSektor.length > 0 ? (siapLelang / paketsInSektor.length) * 100 : 0,
      };
    });
  }, [filteredPakets]);

  const handleOpenFormulaModal = (datasetNo: number) => {
    setSelectedDatasetForFormula(datasetNo);
    setIsFormulaModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-sky-600/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Direktorat Perencanaan Infrastruktur BP Batam
                </h1>
                <span className="text-[11px] font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Satu Data Hal. 53 (Dataset 1 s.d. 6)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring Progres Detail Engineering Design (DED), Readiness Criteria, dan Proyeksi Capex Konstruksi Fisik
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('visualisasi')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'visualisasi'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Visualisasi Data (8 Grafik Resmi)</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Daftar Paket &amp; Filter Sektor</span>
            </button>

            <button
              onClick={() => handleOpenFormulaModal(1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              <span>Kamus Rumus Tableau</span>
            </button>

            <button
              onClick={() => setActiveTab('word-doc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'word-doc'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Format Word (.doc)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render View Based on Active Tab */}
      {activeTab === 'word-doc' ? (
        <PerencanaanWordDocView onBack={() => setActiveTab('visualisasi')} />
      ) : activeTab === 'visualisasi' ? (
        <PerencanaanInfrastrukturVisualCharts />
      ) : (
        <>
          {/* Filters Bar (User Request 8) */}
          <PerencanaanFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalFilteredCount={filteredPakets.length}
            totalOriginalCount={SEMUA_PAKET_PERENCANAAN.length}
          />

          {/* 2 Primary KPIs */}
          <PerencanaanKpis
            kpis={dynamicKpis}
            selectedSektor={filters.sektor}
            onSelectSektor={(sektor) => handleFilterChange({ sektor })}
            onOpenFormula={handleOpenFormulaModal}
          />

          {/* Visualisasi Data Direktorat Perencanaan Infrastruktur */}
          <PerencanaanVisualisasiData
            pakets={filteredPakets}
            selectedSektor={filters.sektor}
            onSelectSektor={(sektor) => handleFilterChange({ sektor })}
            onOpenFormula={handleOpenFormulaModal}
          />
        </>
      )}

      {/* Formula & Data Dictionary Modal */}
      <PerencanaanFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialDatasetNo={selectedDatasetForFormula}
      />
    </div>
  );
};
