import React, { useState, useMemo } from 'react';
import {
  Plane,
  LayoutDashboard,
  FileText,
  FileCode2,
  TrendingUp,
  Users,
  Compass,
  Building2,
  Package,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';
import { BandaraFilterState } from './types';
import { OPERATOR_FLIGHT_DATA } from './bandaraData';
import { BandaraFilters } from './BandaraFilters';
import { BandaraKpis } from './BandaraKpis';
import { Dataset1PnbpBandaraCard } from './Dataset1PnbpBandaraCard';
import { Dataset2ArusLaluLintasUdaraCard } from './Dataset2ArusLaluLintasUdaraCard';
import { Dataset5EmpuKargoCard } from './Dataset5EmpuKargoCard';
import { Dataset9RuteLangsungCard } from './Dataset9RuteLangsungCard';
import { OperatorFlightChart } from './OperatorFlightChart';
import { StrategicAirportMetrics } from './StrategicAirportMetrics';
import { BandaraFormulaModal } from './BandaraFormulaModal';
import { BandaraWordDocView } from './BandaraWordDocView';

export const PengelolaanBandaraDashboard: React.FC = () => {
  // Navigation Sub-tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'word_doc'>('dashboard');

  // Filter State
  const [filters, setFilters] = useState<BandaraFilterState>({
    tahun: '2026',
    jenisPenerbangan: 'Semua',
    arahPergerakan: 'Semua',
    kategoriOperator: 'Semua',
    jenisPnbp: 'Semua',
    searchQuery: '',
  });

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedMetricForFormula, setSelectedMetricForFormula] = useState<string | number>('pnbp');

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<BandaraFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: '2026',
      jenisPenerbangan: 'Semua',
      arahPergerakan: 'Semua',
      kategoriOperator: 'Semua',
      jenisPnbp: 'Semua',
      searchQuery: '',
    });
  };

  // Filtered Count
  const filteredOperatorCount = useMemo(() => {
    return OPERATOR_FLIGHT_DATA.filter((op) => {
      if (filters.kategoriOperator !== 'Semua' && op.kategori !== filters.kategoriOperator) {
        return false;
      }
      if (filters.jenisPenerbangan !== 'Semua') {
        if (filters.jenisPenerbangan === 'Domestik' && !op.jenisPenerbangan.includes('DOMESTIK')) return false;
        if (filters.jenisPenerbangan === 'Internasional' && !op.jenisPenerbangan.includes('INTERNASIONAL')) return false;
      }
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchName = op.namaMaskapai.toLowerCase().includes(q);
        const matchCode = op.kodeIata.toLowerCase().includes(q);
        if (!matchName && !matchCode) return false;
      }
      return true;
    }).length;
  }, [filters]);

  const handleOpenFormulaModal = (metricKeyOrDataset: string | number) => {
    setSelectedMetricForFormula(metricKeyOrDataset);
    setIsFormulaModalOpen(true);
  };

  return (
    <div id="pengelolaan-bandara-dashboard-root" className="space-y-6">
      {/* UNIT BANNER HEADER */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden border border-sky-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-500/20 border border-sky-400/30 rounded-2xl text-sky-300 shadow-inner">
              <Plane className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-sky-400/20 text-sky-300 font-bold text-xs rounded-full border border-sky-400/30">
                  KODE UNIT: DPKB (UNIT NO. 17)
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Satu Data BP Batam (Halaman 11 - 12)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                Badan Pengelolaan Kawasan Bandar Udara
              </h1>
              <p className="text-xs md:text-sm text-sky-200/90 mt-1 max-w-3xl leading-relaxed">
                Pusat Komando Eksekutif Lalu Lintas Udara Bandara Internasional Hang Nadim (BTH / WIDD): Monitoring Realisasi PNBP (DS #1), Arus Penerbangan & Penumpang (DS #2), Operator Maskapai (DS #10), Rute Langsung (DS #9) & EMPU Kargo (DS #5).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenFormulaModal(1)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-800/80 hover:bg-sky-700 text-sky-100 rounded-xl text-xs font-semibold border border-sky-600/50 shadow-sm transition-colors"
            >
              <FileCode2 className="w-4 h-4 text-sky-300" />
              <span>Kamus Rumus & Atribut</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'dashboard' ? 'word_doc' : 'dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                activeTab === 'word_doc'
                  ? 'bg-white text-sky-900 font-bold'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{activeTab === 'word_doc' ? 'Kembali ke Dashboard' : 'Dokumen Word (.docx)'}</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'word_doc' ? (
        /* DOKUMEN LAPORAN WORD RESMI */
        <BandaraWordDocView />
      ) : (
        /* DASHBOARD VISUALISASI UTAMA */
        <div className="space-y-6">
          {/* FILTER PANEL */}
          <BandaraFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            totalFilteredCount={filteredOperatorCount}
          />

          {/* 5 HERO KPIS (PNBP, FLIGHTS, PASSENGERS, SLF, KARGO EMPU) - JANGAN DIRUBAH */}
          <BandaraKpis onOpenFormulaModal={handleOpenFormulaModal} />

          {/* PERMINTAAN 1: DATA REALISASI PENERIMAAN NEGARA BUKAN PAJAK (PNBP) (DATASET NO 1 - HAL 11) */}
          <Dataset1PnbpBandaraCard
            onOpenFormula={() => handleOpenFormulaModal(1)}
          />

          {/* PERMINTAAN 2: DAFTAR ARUS LALU LINTAS UDARA DENGAN SHEET SWAP (DATASET NO 2 - HAL 11) */}
          <Dataset2ArusLaluLintasUdaraCard
            filters={filters}
            onOpenFormula={() => handleOpenFormulaModal(2)}
          />

          {/* PERMINTAAN 3: EKSPEDISI MUATAN PESAWAT UDARA (EMPU) DI BATAM (DATASET NO 5 - HAL 12) */}
          <Dataset5EmpuKargoCard
            onOpenFormula={() => handleOpenFormulaModal(5)}
          />

          {/* PERMINTAAN 4: RUTE PENERBANGAN LANGSUNG DARI BATAM (DATASET NO 9 - HAL 12) */}
          <Dataset9RuteLangsungCard
            filters={filters}
            onOpenFormula={() => handleOpenFormulaModal(9)}
          />

          {/* VISUALISASI TAMBAHAN: JUMLAH PENERBANGAN BERDASARKAN OPERATOR (DATASET NO 10 - HAL 12) */}
          <OperatorFlightChart
            filters={filters}
            onOpenFormulaModal={handleOpenFormulaModal}
          />

          {/* RANCANGAN KHUSUS STRATEGIS ATASAN: RUTE LANGSUNG & SIKLUS PNBP (DATASET NO 9 & 1) */}
          <StrategicAirportMetrics
            filters={filters}
            onOpenFormulaModal={handleOpenFormulaModal}
          />
        </div>
      )}

      {/* MODAL KAMUS RUMUS SATU DATA BANDARA */}
      <BandaraFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialKey={selectedMetricForFormula}
      />
    </div>
  );
};
