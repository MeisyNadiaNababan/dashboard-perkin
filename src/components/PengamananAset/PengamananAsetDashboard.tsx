import React, { useState } from 'react';
import {
  Shield,
  FileText,
  HelpCircle,
  TrendingUp,
  Flame,
  Users,
  AlertTriangle,
  Layers,
  Activity,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';
import { PengamananAsetFilters } from './PengamananAsetFilters';
import { PengamananAsetKpis } from './PengamananAsetKpis';
import { RekapUnjukRasaCard } from './RekapUnjukRasaCard';
import { RekapBencanaAlamCard } from './RekapBencanaAlamCard';
import { RekapPenertibanCard } from './RekapPenertibanCard';
import { MonitoringPengamananAtasan } from './MonitoringPengamananAtasan';
import { PengamananFormulaModal } from './PengamananFormulaModal';
import { PengamananAsetWordDocView } from './PengamananAsetWordDocView';
import { DirektoratPengamananAsetVisualizer } from './DirektoratPengamananAsetVisualizer';
import { PengamananFilterState } from './types';

export const PengamananAsetDashboard: React.FC = () => {
  const [filters, setFilters] = useState<PengamananFilterState>({
    tahun: 'ALL',
    semester: 'ALL',
    lokasiSektor: 'ALL',
    jenisObjek: 'ALL',
    searchQuery: '',
  });

  const [activeFormulaKpi, setActiveFormulaKpi] = useState<string | null>(null);
  const [showWordDocView, setShowWordDocView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    'visualizer' | 'all' | 'unjuk_rasa' | 'bencana_alam' | 'penertiban' | 'monitoring'
  >('visualizer');

  const handleFilterChange = (newFilters: Partial<PengamananFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 'ALL',
      semester: 'ALL',
      lokasiSektor: 'ALL',
      jenisObjek: 'ALL',
      searchQuery: '',
    });
  };

  if (showWordDocView) {
    return <PengamananAsetWordDocView onBack={() => setShowWordDocView(false)} />;
  }

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Directorate Banner & Executive Action Bar - Clean Plain White Theme */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Direktorat Pengamanan Aset dan Kawasan (Ditpam BP Batam)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                  KODE: DPAMP
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                  SATU DATA HAL. 17 - 19 (12 DATASET)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-4xl leading-relaxed">
                Pemantauan terpadu komando operasional Ditpam BP Batam: penertiban bangunan liar, kekuatan personil, pengamanan 7 objek vital kritis &amp; hutan lindung, penindakan kawasan aset, rekap penanganan unjuk rasa, serta respon cepat mitigasi bencana alam.
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveFormulaKpi('kpi_bangunan_liar')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Kamus Rumus & Formula Tableau Desktop"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
              <span>Kamus Rumus &amp; Tableau</span>
            </button>

            <button
              onClick={() => setShowWordDocView(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Tampilkan Format Dokumen Resmi Word untuk Pimpinan"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format Word Dokumen</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Executive View Switch */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'visualizer'
                ? 'bg-blue-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Dashboard 8 Visualisasi (Grid 2 Kolom)</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Semua Modul Terperinci
          </button>
          <button
            onClick={() => setActiveTab('unjuk_rasa')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'unjuk_rasa'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Rekap Pengamanan Unjuk Rasa (Dataset #7)</span>
          </button>
          <button
            onClick={() => setActiveTab('bencana_alam')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'bencana_alam'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Rekap Bencana Alam (Dataset #6)</span>
          </button>
          <button
            onClick={() => setActiveTab('penertiban')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'penertiban'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Rekap Penertiban Rutin (Dataset #9)</span>
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'monitoring'
                ? 'bg-slate-900 text-white font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Kesiapsiagaan &amp; Penindakan Kawasan Hutan</span>
          </button>
        </div>
      </div>

      {/* Tampilan Visualisasi 8 Kartu (Grid 2 Kolom, Tanpa KPI Terpisah & Tanpa Cover) */}
      {activeTab === 'visualizer' && (
        <DirektoratPengamananAsetVisualizer />
      )}

      {/* Tampilan Alternatif Modul Terperinci */}
      {activeTab !== 'visualizer' && (
        <>
          {/* Interactive Global Filters Bar */}
          <PengamananAsetFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* 4 Main Executive BAN KPI Cards */}
          <PengamananAsetKpis onOpenFormulaModal={(kpiId) => setActiveFormulaKpi(kpiId)} />

          {/* Kesiapsiagaan & Penindakan Kawasan Lingkungan dan Hutan */}
          {(activeTab === 'all' || activeTab === 'monitoring') && (
            <MonitoringPengamananAtasan filters={filters} />
          )}

          {/* Section Content Rendering */}
          {(activeTab === 'all' || activeTab === 'unjuk_rasa') && (
            <RekapUnjukRasaCard filters={filters} />
          )}

          {(activeTab === 'all' || activeTab === 'bencana_alam') && (
            <RekapBencanaAlamCard filters={filters} />
          )}

          {(activeTab === 'all' || activeTab === 'penertiban') && (
            <RekapPenertibanCard filters={filters} />
          )}
        </>
      )}

      {/* Kamus Rumus & Tableau Desktop Formula Modal */}
      <PengamananFormulaModal
        isOpen={Boolean(activeFormulaKpi)}
        onClose={() => setActiveFormulaKpi(null)}
        initialKpiId={activeFormulaKpi}
      />
    </div>
  );
};
