import React, { useState } from 'react';
import { InfrastrukturSatuDataDashboard } from './InfrastrukturSatuDataDashboard';
import { InfrastrukturFormulaModal } from './InfrastrukturFormulaModal';
import { InfrastrukturWordDocView } from './InfrastrukturWordDocView';
import { KatalogVisualisasiDashboardModal } from '../Modals/KatalogVisualisasiDashboardModal';
import { PembangunanInfrastrukturVisualSuite } from '../InfrastrukturPerkinA7/PembangunanInfrastrukturVisualSuite';
import { BarChart3, Database } from 'lucide-react';

export const PembangunanInfrastrukturDashboard: React.FC = () => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'dashboard' | 'word-doc'>('dashboard');
  const [dashboardTab, setDashboardTab] = useState<'visual-suite' | 'satu-data'>('visual-suite');

  // Modal State
  const [formulaKpiType, setFormulaKpiType] = useState<
    | 'kpi-pembangunan'
    | 'kpi-progres-fisik'
    | 'kpi-progres-keuangan'
    | 'kpi-kurva-s'
    | 'kpi-row-utilitas'
    | 'kpi-row-penghijauan'
    | 'kpi-ruas-jalan'
    | 'kpi-pematangan'
    | null
  >(null);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);
  const [isVisualCatalogOpen, setIsVisualCatalogOpen] = useState<boolean>(false);

  const handleOpenFormula = (
    kpiType:
      | 'kpi-pembangunan'
      | 'kpi-progres-fisik'
      | 'kpi-progres-keuangan'
      | 'kpi-kurva-s'
      | 'kpi-row-utilitas'
      | 'kpi-row-penghijauan'
      | 'kpi-ruas-jalan'
      | 'kpi-pematangan'
  ) => {
    setFormulaKpiType(kpiType);
    setIsFormulaOpen(true);
  };

  // If in Word Document view
  if (activeView === 'word-doc') {
    return <InfrastrukturWordDocView onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="space-y-4 pb-12 font-sans">
      {/* Tab Switcher: Suite Visualisasi 10 Grafik vs Satu Data Ekstrak */}
      <div className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setDashboardTab('visual-suite')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              dashboardTab === 'visual-suite'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Visualisasi Pekerjaan Konstruksi (A - E)</span>
          </button>
          <button
            onClick={() => setDashboardTab('satu-data')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              dashboardTab === 'satu-data'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Katalog Dataset Satu Data (Hal. 48-51)</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Direktorat Pembangunan Infrastruktur &bull; BP Batam
        </span>
      </div>

      {/* Main View Area */}
      {dashboardTab === 'visual-suite' ? (
        <PembangunanInfrastrukturVisualSuite onOpenFormulaModal={handleOpenFormula} />
      ) : (
        <InfrastrukturSatuDataDashboard
          onOpenFormula={handleOpenFormula}
          onOpenWordDoc={() => setActiveView('word-doc')}
          onOpenVisualCatalog={() => setIsVisualCatalogOpen(true)}
        />
      )}

      {/* Kamus Atribut & Formula Explanation Modal */}
      <InfrastrukturFormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
        kpiType={formulaKpiType}
      />

      {/* Katalog Nama Visualisasi Seluruh Dashboard Modal */}
      <KatalogVisualisasiDashboardModal
        isOpen={isVisualCatalogOpen}
        onClose={() => setIsVisualCatalogOpen(false)}
        initialFilterUnit="dit-pembangunan-infrastruktur"
      />
    </div>
  );
};
