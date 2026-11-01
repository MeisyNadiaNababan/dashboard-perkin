import React, { useState } from 'react';
import {
  Stethoscope,
  DollarSign,
  TrendingUp,
  Activity,
  Users,
  Building2,
  FileText,
  FileCode2,
  Pill,
} from 'lucide-react';
import { RumahSakitFilters } from './RumahSakitFilters';
import { RumahSakitKpiRow } from './RumahSakitKpiRow';
import { RumahSakitPnbpBelanjaCard } from './RumahSakitPnbpBelanjaCard';
import { RumahSakitKunjunganLayananCard } from './RumahSakitKunjunganLayananCard';
import { RumahSakitEfisiensiCard } from './RumahSakitEfisiensiCard';
import { RumahSakitSewaTenantCard } from './RumahSakitSewaTenantCard';
import { RumahSakitMorbiditasObatCard } from './RumahSakitMorbiditasObatCard';
import { RumahSakitKamusRumusView } from './RumahSakitKamusRumusView';
import { RumahSakitKpiWordDocView } from './RumahSakitKpiWordDocView';
import { RumahSakitVisualizer } from './RumahSakitVisualizer';
import {
  RumahSakitFilterState,
  RS_KEUANGAN_SUMMARY,
  RS_IKM_TOTAL,
  RS_KUNJUNGAN_TOTAL,
  RS_TENANT_SEWA,
} from '../../data/rumahSakitData';

interface RumahSakitDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitDashboard: React.FC<RumahSakitDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
}) => {
  const [filters, setFilters] = useState<RumahSakitFilterState>({
    tahun: 2026,
    periodeBulan: 'ALL',
    bagianLayanan: 'ALL',
    caraBayar: 'ALL',
    statusTenant: 'ALL',
  });

  const [dashboardMode, setDashboardMode] = useState<'visualizer' | 'klasik'>('visualizer');

  const handleFilterChange = (newFilters: Partial<RumahSakitFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 2026,
      periodeBulan: 'ALL',
      bagianLayanan: 'ALL',
      caraBayar: 'ALL',
      statusTenant: 'ALL',
    });
  };

  // 0. SUBTAB ATAU MODE: 10 VISUALISASI TERPADU SATU DATA BP BATAM
  if (activeSubTab === 'visualizer' || activeSubTab === 'deep_dive') {
    return <RumahSakitVisualizer />;
  }

  // 1. SUBTAB: DOKUMEN KPI WORD (.DOC)
  if (activeSubTab === 'kpi_word_doc') {
    return <RumahSakitKpiWordDocView />;
  }

  // 2. SUBTAB: KAMUS RUMUS & 18 DATASET KATALOG
  if (activeSubTab === 'kamus_rumus') {
    return <RumahSakitKamusRumusView />;
  }

  // 3. SUBTAB: KEUANGAN (PNBP & BELANJA)
  if (activeSubTab === 'keuangan') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitPnbpBelanjaCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 4. SUBTAB: KUNJUNGAN & LAYANAN UNGGULAN
  if (activeSubTab === 'kunjungan') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 5. SUBTAB: INDIKATOR EFISIENSI (BARBER JOHNSON)
  if (activeSubTab === 'efisiensi') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 6. SUBTAB: SEWA RUANGAN TENANT
  if (activeSubTab === 'sewa') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // 7. SUBTAB: MORBIDITAS & OBAT
  if (activeSubTab === 'penyakit_obat') {
    return (
      <div className="space-y-3.5">
        <RumahSakitFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RumahSakitMorbiditasObatCard onOpenFormulaModal={onOpenFormulaModal} />
      </div>
    );
  }

  // DEFAULT VIEW: IKHTISAR EKSEKUTIF BADAN USAHA RUMAH SAKIT
  return (
    <div id="rsbp-dashboard" className="space-y-3.5 font-sans">
      {/* Mode Switcher: 10 Visualisasi Terpadu vs Ikhtisar Klasik */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Badan Usaha Rumah Sakit BP Batam (RSBP Batam)</h2>
          <p className="text-xs text-slate-500">
            {dashboardMode === 'visualizer'
              ? 'Dashboard Visualisasi 10 Dataset Satu Data BP Batam (Grid 2 Kolom, 5 Baris)'
              : 'Ikhtisar Perkin 2026, PNBP, Belanja &amp; Rekapitulasi Sewa Tenant'}
          </p>
        </div>
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDashboardMode('visualizer')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              dashboardMode === 'visualizer'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            10 Visualisasi Terpadu
          </button>
          <button
            type="button"
            onClick={() => setDashboardMode('klasik')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              dashboardMode === 'klasik'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ikhtisar Perkin &amp; Sewa
          </button>
        </div>
      </div>

      {dashboardMode === 'visualizer' ? (
        <RumahSakitVisualizer />
      ) : (
        <>
          {/* 1. Filter Panel */}
          <RumahSakitFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* 2. Top Executive 4 Core KPI Row */}
          <RumahSakitKpiRow
            realisasiPnbpMiliar={RS_KEUANGAN_SUMMARY.totalRealisasiPnbpMiliar}
            targetPnbpMiliar={RS_KEUANGAN_SUMMARY.totalTargetPnbpMiliar}
            realisasiBelanjaMiliar={RS_KEUANGAN_SUMMARY.totalRealisasiBelanjaMiliar}
            paguBelanjaMiliar={RS_KEUANGAN_SUMMARY.totalPaguBelanjaMiliar}
            nilaiIkm={RS_IKM_TOTAL}
            totalKunjunganPasien={RS_KUNJUNGAN_TOTAL}
            nilaiBor={74.2}
            jumlahTenant={RS_TENANT_SEWA.length}
            onExplainKpi={onOpenFormulaModal}
          />

          {/* 3. Primary Analytical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
            <RumahSakitKunjunganLayananCard onOpenFormulaModal={onOpenFormulaModal} />
            <RumahSakitEfisiensiCard onOpenFormulaModal={onOpenFormulaModal} />
          </div>

          {/* 4. Secondary Analytical Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            <RumahSakitSewaTenantCard onOpenFormulaModal={onOpenFormulaModal} />
          </div>
        </>
      )}
    </div>
  );
};
