import React, { useState } from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  FileText,
  BookOpen,
  LayoutDashboard,
  Layers,
  Sparkles,
  ArrowRight,
  Award,
  Compass,
  Building2,
  Database
} from 'lucide-react';
import { KepalaBpBanner } from './KepalaBpBanner';
import { ExecutiveCommandCenterView } from './ExecutiveCommandCenterView';
import { InvestasiDeepDiveCard } from './InvestasiDeepDiveCard';
import { IkmPelayananCard } from './IkmPelayananCard';
import { PnbpSatkerCard } from './PnbpSatkerCard';
import { ReformasiBirokrasiCard } from './ReformasiBirokrasiCard';
import { CrossUnitMatrixView } from './CrossUnitMatrixView';
import { KepalaBpWordDocView } from './KepalaBpWordDocView';
import { KepalaBpFormulaModal } from './KepalaBpFormulaModal';
import { KepalaBpCompactFilter, KepalaBpFilterState } from './KepalaBpCompactFilter';
import {
  EMPAT_IKS_KEPALA_BP,
  MATRIKS_24_SATKER_DATA,
  KONSOLIDASI_IKM_SELURUH_UNIT,
  KONSOLIDASI_PNBP_SELURUH_UNIT
} from './kepalaBpData';

interface KepalaBpDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const KepalaBpDashboard: React.FC<KepalaBpDashboardProps> = ({
  activeSubTab: externalSubTab,
  onOpenFormulaModal,
  onNavigateToUnit,
}) => {
  const [internalTab, setInternalTab] = useState<string>('ikhtisar');
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [selectedIksIdModal, setSelectedIksIdModal] = useState<string>('iks-1');

  // Filter state (Hanya Tahun)
  const [filterState, setFilterState] = useState<KepalaBpFilterState>({
    periode: '2026',
  });

  // Active view: external prop if provided, else internal state
  const activeTab = externalSubTab && externalSubTab !== 'ikhtisar' ? externalSubTab : internalTab;

  const handleFilterChange = (newFilter: Partial<KepalaBpFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilter = () => {
    setFilterState({
      periode: '2026',
    });
  };

  const handleSelectIks = (iksId: string) => {
    if (iksId === 'iks-1') setInternalTab('investasi');
    else if (iksId === 'iks-2') setInternalTab('ikm');
    else if (iksId === 'iks-3') setInternalTab('pnbp');
    else if (iksId === 'iks-4') setInternalTab('rb');
    else setInternalTab('ikhtisar');
  };

  const handleOpenManual = (iksId?: string) => {
    setSelectedIksIdModal(iksId || 'iks-1');
    setIsFormulaModalOpen(true);
    if (onOpenFormulaModal) {
      onOpenFormulaModal(iksId || 'iks-1');
    }
  };

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Nama Item/Satker', 'Target/Pagu', 'Realisasi', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add IKS rows
    EMPAT_IKS_KEPALA_BP.forEach((iks) => {
      rows.push([
        'IKS Kepala BP',
        `"${iks.indikatorKinerjaStrategis}"`,
        `"${iks.target}"`,
        iks.realisasiYtd,
        iks.persenCapaian,
        `"${iks.statusCapaian}"`,
      ]);
    });

    // Add IKM rows
    KONSOLIDASI_IKM_SELURUH_UNIT.forEach((ikm) => {
      rows.push([
        'IKM Unit Layanan',
        `"${ikm.namaUnit}"`,
        ikm.targetIkm,
        ikm.skorIkm,
        ((ikm.skorIkm / ikm.targetIkm) * 100).toFixed(1),
        `"${ikm.predikat}"`,
      ]);
    });

    // Add PNBP rows
    KONSOLIDASI_PNBP_SELURUH_UNIT.forEach((pnbp) => {
      rows.push([
        'PNBP Satker',
        `"${pnbp.namaSatker}"`,
        pnbp.targetMiliar,
        pnbp.realisasiMiliar,
        pnbp.persenCapaian,
        `"${pnbp.statusCapaian}"`,
      ]);
    });

    // Add 24 Satker rows
    MATRIKS_24_SATKER_DATA.forEach((s) => {
      rows.push([
        'Satker BP Batam',
        `"${s.nama}"`,
        s.paguMiliar,
        s.realisasiMiliar,
        s.serapanPersen,
        `"${s.statusKinerja}"`,
      ]);
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Ringkasan_Konsolidasi_Perkin_Kepala_BP_Batam_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="space-y-4 pb-4 font-sans text-slate-800 origin-top"
      style={{ zoom: '80%' }}
    >
      {/* 1. OFFICIAL LETTERHEAD & PERKIN HEADER (HANYA DI TAB NASKAH PERKIN AGAR COMMAND CENTER BERSIH) */}
      {activeTab === 'naskah_perkin' && (
        <KepalaBpBanner
          onOpenDocModal={() => setInternalTab('naskah_perkin')}
          onOpenManualModal={() => handleOpenManual('iks-1')}
        />
      )}

      {/* 2. COMPACT FILTER BAR (Hanya di tab sekunder agar Command Center bersih) */}
      {activeTab !== 'ikhtisar' && (
        <KepalaBpCompactFilter
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilter={handleResetFilter}
          onExportCsv={handleExportConsolidatedCsv}
          activeView={activeTab}
          onSelectView={(v) => setInternalTab(v)}
        />
      )}



      {/* 4. CONDITIONAL TAB CONTENTS */}
      {/* ------------------------------------------------------------------ */}
      {/* VIEW: EXECUTIVE COMMAND CENTER (FLAGSHIP INTEGRATED VIEW)          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'ikhtisar' && (
        <div className="space-y-6">
          <ExecutiveCommandCenterView
            filterState={filterState}
            onSelectIksDetail={handleSelectIks}
            onOpenManualModal={handleOpenManual}
            onNavigateToCrossUnitMatrix={() => setInternalTab('matriks_satker')}
            onNavigateToUnit={onNavigateToUnit}
          />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 1 REALISASI INVESTASI & KEK (DETAIL TAB)                */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'investasi' && (
        <div className="space-y-6">
          <InvestasiDeepDiveCard onOpenManualModal={() => handleOpenManual('iks-1')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 2 INDEKS KEPUASAN MASYARAKAT 5 LOKUS (DETAIL TAB)        */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'ikm' && (
        <div className="space-y-6">
          <IkmPelayananCard onOpenManualModal={() => handleOpenManual('iks-2')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 3 REALISASI PNBP 10 SATKER PENGHASIL (DETAIL TAB)        */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'pnbp' && (
        <div className="space-y-6">
          <PnbpSatkerCard onOpenManualModal={() => handleOpenManual('iks-3')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: IKS 4 REFORMASI BIROKRASI (8 AREA PERUBAHAN)                 */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'rb' && (
        <div className="space-y-6">
          <ReformasiBirokrasiCard onOpenManualModal={() => handleOpenManual('iks-4')} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: MATRIKS 24 SATKER & KATALOG SATU DATA (HAL. 1 - 53)          */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'matriks_satker' && (
        <div className="space-y-6">
          <CrossUnitMatrixView onSelectUnit={onNavigateToUnit} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* VIEW: NASKAH DINAS PERJANJIAN KINERJA 2026 (.DOC VIEW)            */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'naskah_perkin' && (
        <div className="space-y-6">
          <KepalaBpWordDocView />
        </div>
      )}

      {/* 5. FORMULA & MANUAL POP-UP MODAL */}
      <KepalaBpFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialIksId={selectedIksIdModal}
      />
    </div>
  );
};
