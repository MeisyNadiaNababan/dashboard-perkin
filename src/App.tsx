import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NavigationRail } from './components/NavigationRail';
import { UnitsDrawer } from './components/UnitsDrawer';
import { ExecutiveFilters } from './components/ExecutiveFilters';
import { KpiMetricsRow } from './components/KpiMetricsRow';
import { RevenuePerformanceCard } from './components/RevenuePerformanceCard';
import { BudgetAbsorptionCard } from './components/BudgetAbsorptionCard';
import { KepalaBpDashboard } from './components/KepalaBP/KepalaBpDashboard';
import { AdministrasiKeuanganDashboard } from './components/AdministrasiKeuangan/AdministrasiKeuanganDashboard';
import { PelayananUmumDashboard } from './components/PelayananUmum/PelayananUmumDashboard';
import { BiroKeuanganDashboard } from './components/BiroKeuangan/BiroKeuanganDashboard';
import { BiroKeuanganFinancialCard } from './components/BiroKeuanganFinancialCard';
import { ReceivablesSection } from './components/ReceivablesSection';
import { FiscalIndependenceDonutCards } from './components/FiscalIndependenceDonutCards';
import { FiscalInsightsRow } from './components/FiscalInsightsRow';
import { PdsiDashboard } from './components/PDSI/PdsiDashboard';
import { PtspDashboard } from './components/PTSP/PtspDashboard';
import { KekDashboard } from './components/KEK/KekDashboard';
import { InvestasiDashboard } from './components/Investasi/InvestasiDashboard';
import { LaluLintasBarangDashboard } from './components/LaluLintasBarang/LaluLintasBarangDashboard';
import { KepelabuhananDashboard } from './components/Kepelabuhanan/KepelabuhananDashboard';
import { RumahSakitDashboard } from './components/RumahSakit/RumahSakitDashboard';
import { BiroHukumDashboard } from './components/BiroHukum/BiroHukumDashboard';
import { PengelolaanLahanDashboard } from './components/PengelolaanLahan/PengelolaanLahanDashboard';
import { PengendalianLahanDashboard } from './components/PengendalianLahan/PengendalianLahanDashboard';
import { PesisirReklamasiDashboard } from './components/PesisirReklamasi/PesisirReklamasiDashboard';
import { PengamananAsetDashboard } from './components/PengamananAset/PengamananAsetDashboard';
import { PembangunanInfrastrukturDashboard } from './components/PembangunanInfrastruktur/PembangunanInfrastrukturDashboard';
import { PerencanaanInfrastrukturDashboard } from './components/PerencanaanInfrastruktur/PerencanaanInfrastrukturDashboard';
import { PengendalianPengusahaanDashboard } from './components/PengendalianPengusahaan/PengendalianPengusahaanDashboard';
import { PengelolaanBandaraDashboard } from './components/PengelolaanBandara/PengelolaanBandaraDashboard';
import { BiroOrganisasiDashboard } from './components/BiroOrganisasi/BiroOrganisasiDashboard';
import { BiroSDMDashboard } from './components/BiroSDM/BiroSDMDashboard';
import { KebijakanStrategisDashboard } from './components/KebijakanStrategis/KebijakanStrategisDashboard';
import { PengelolaanLahanPesisirDashboard } from './components/PengelolaanLahanPesisir/PengelolaanLahanPesisirDashboard';
import { InvestasiPengusahaanDashboard } from './components/InvestasiPengusahaan/InvestasiPengusahaanDashboard';
import { BandaraPelabuhanLlbDashboard } from './components/BandaraPelabuhanLlb/BandaraPelabuhanLlbDashboard';
import { InfrastrukturPerkinA7Dashboard } from './components/InfrastrukturPerkinA7/InfrastrukturPerkinA7Dashboard';
import { HarmonisasiDashboard } from './components/Harmonisasi/HarmonisasiDashboard';
import { OtherUnitPlaceholder } from './components/OtherUnitPlaceholder';
import { BiroKeuanganKamusRumusView } from './components/BiroKeuanganKamusRumusView';
import { KpiWordDocumentView } from './components/KpiWordDocumentView';
import { DetailModal, ModalType } from './components/Modals/DetailModal';
import { ExportModal } from './components/Modals/ExportModal';
import { TableauGuideModal } from './components/Modals/TableauGuideModal';
import { KpiFormulaExplanationModal } from './components/Modals/KpiFormulaExplanationModal';
import { KatalogVisualisasiDashboardModal } from './components/Modals/KatalogVisualisasiDashboardModal';
import { KPI_METRICS_DATA, REVENUE_DATA, EXPENSE_DATA } from './data/mockData';
import { BP_BATAM_24_UNITS, BpBatamUnit } from './data/bpBatamUnits';
import { CheckCircle2, FileCode2, Database, Layers, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Multi-Unit State - Set default to kepala-bp (Perkin 2026 Kepala BP Batam)
  const [activeUnitId, setActiveUnitId] = useState<string>('kepala-bp');
  const [isUnitsDrawerOpen, setIsUnitsDrawerOpen] = useState<boolean>(false);
  const [activeSheet, setActiveSheet] = useState<string>('ikhtisar');

  // Filters State - Complete Tableau Context Dimensions
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedQuarter, setSelectedQuarter] = useState('Q2');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [selectedFunding, setSelectedFunding] = useState('ALL');
  const [basis, setBasis] = useState<'ytd' | 'monthly'>('ytd');
  const [selectedPeriod, setSelectedPeriod] = useState('April 2026');

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Modals
  const [detailModalType, setDetailModalType] = useState<ModalType>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTableauGuideOpen, setIsTableauGuideOpen] = useState(false);
  const [selectedKpiFormulaId, setSelectedKpiFormulaId] = useState<string | null>(null);
  const [isKpiFormulaModalOpen, setIsKpiFormulaModalOpen] = useState(false);
  const [isVisualCatalogModalOpen, setIsVisualCatalogModalOpen] = useState(false);

  // Active Unit Object
  const currentUnit = useMemo(() => {
    return BP_BATAM_24_UNITS.find((u) => u.id === activeUnitId) || BP_BATAM_24_UNITS[0];
  }, [activeUnitId]);

  // Unit Change Handler
  const handleSelectUnit = (unitId: string) => {
    setActiveUnitId(unitId);
    if (unitId === 'biro-keuangan') {
      setActiveSheet('overview');
    } else if (unitId === 'pdsi') {
      setActiveSheet('ikhtisar');
    } else {
      setActiveSheet('ikhtisar');
    }
    const unitObj = BP_BATAM_24_UNITS.find((u) => u.id === unitId);
    setToastMessage(`Berpindah ke dashboard: ${unitObj?.name || unitId}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Filter Handlers with Feedback Toast
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedPeriod(`${selectedMonth} ${year}`);
    setToastMessage(`Tahun Anggaran diubah ke TA ${year}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedPeriod(`${month} ${selectedYear}`);
    setToastMessage(`Periode Cut-Off diubah ke ${month} ${selectedYear}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleQuarterChange = (q: string) => {
    setSelectedQuarter(q);
    setToastMessage(`Filter Triwulan diterapkan: ${q}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
    const unitLabel = unit === 'ALL' ? 'Konsolidasi Seluruh Satker' : unit;
    setToastMessage(`Filter Satker diterapkan: ${unitLabel}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleFundingChange = (funding: string) => {
    setSelectedFunding(funding);
    const label = funding === 'ALL' ? 'Semua Sumber Pendanaan' : funding;
    setToastMessage(`Filter Sumber Dana: ${label}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleBasisChange = (b: 'ytd' | 'monthly') => {
    setBasis(b);
    setToastMessage(`Metode Tampilan: ${b === 'ytd' ? 'Kumulatif (YTD)' : 'Per Bulan'}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleResetFilters = () => {
    setSelectedYear('2026');
    setSelectedMonth('April');
    setSelectedQuarter('Q2');
    setSelectedUnit('ALL');
    setSelectedFunding('ALL');
    setBasis('ytd');
    setSelectedPeriod('April 2026');
    setToastMessage('Semua filter berhasil direset ke default (TA 2026 • April Q2 • Konsolidasi).');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filtered Datasets based on selectedUnit
  const filteredRevenue = useMemo(() => {
    if (selectedUnit === 'ALL') return REVENUE_DATA;
    const lowerUnit = selectedUnit.toLowerCase();
    const result = REVENUE_DATA.filter((item) => {
      const lowerSumber = item.sumber.toLowerCase();
      if (lowerSumber.includes(lowerUnit)) return true;
      if (lowerUnit.includes('biro keuangan') && lowerSumber.includes('biro keuangan')) return true;
      if (lowerUnit.includes('pertanahan') && lowerSumber.includes('pertanahan')) return true;
      if (lowerUnit.includes('pelabuhan') && (lowerSumber.includes('pelabuhan') || lowerSumber.includes('kepelabuhanan'))) return true;
      if (lowerUnit.includes('bandara') && lowerSumber.includes('bandara')) return true;
      if (lowerUnit.includes('fasilitas') && (lowerSumber.includes('fasilitas') || lowerSumber.includes('spam'))) return true;
      if (lowerUnit.includes('pdsi') && lowerSumber.includes('pdsi')) return true;
      if (lowerUnit.includes('infrastruktur') && lowerSumber.includes('infrastruktur')) return true;
      return false;
    });
    return result.length > 0 ? result : REVENUE_DATA;
  }, [selectedUnit]);

  const filteredExpense = useMemo(() => {
    if (selectedUnit === 'ALL') return EXPENSE_DATA;
    const lowerUnit = selectedUnit.toLowerCase();
    const result = EXPENSE_DATA.filter((item) => {
      const lowerKerja = item.unitKerja.toLowerCase();
      const lowerProg = (item.program || '').toLowerCase();
      if (lowerKerja.includes(lowerUnit) || lowerProg.includes(lowerUnit)) return true;
      if (lowerUnit.includes('infrastruktur') && (lowerKerja.includes('infrastruktur') || lowerProg.includes('infrastruktur'))) return true;
      if (lowerUnit.includes('pertanahan') && (lowerKerja.includes('pertanahan') || lowerProg.includes('pertanahan'))) return true;
      if (lowerUnit.includes('biro keuangan') && (lowerKerja.includes('keuangan') || lowerProg.includes('dukungan manajemen'))) return true;
      return false;
    });
    return result.length > 0 ? result : EXPENSE_DATA;
  }, [selectedUnit]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('Data extract berhasil diperbarui.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  const handleSelectSheet = (sheetId: string) => {
    setActiveSheet(sheetId);
    if (sheetId === 'overview') {
      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'pendapatan') {
      document.getElementById('pendapatan-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'belanja') {
      document.getElementById('belanja-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'piutang') {
      document.getElementById('piutang-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'kas_bank') {
      document.getElementById('kas-bank-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'aset') {
      document.getElementById('aset-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sheetId === 'fiskal') {
      document.getElementById('kemandirian-fiskal')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMetric = (metricId: string) => {
    setSelectedKpiFormulaId(metricId);
    setIsKpiFormulaModalOpen(true);
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F6F8] text-slate-800 font-sans overflow-hidden antialiased selection:bg-[#002B49] selection:text-white">
      {/* Main Workspace Area (Tanpa Sidebar Navigation Rail) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header with Unit switcher and Sub-menus */}
        <Header
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenTableauGuide={() => setIsTableauGuideOpen(true)}
          onOpenUnitsDrawer={() => setIsUnitsDrawerOpen(true)}
          onOpenVisualCatalog={() => setIsVisualCatalogModalOpen(true)}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          activeSheet={activeSheet}
          onSelectSheet={handleSelectSheet}
          activeUnitId={activeUnitId}
          onSelectUnit={handleSelectUnit}
        />

        {/* Scrollable Main Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 lg:pt-5 pb-2 sm:pb-2 lg:pb-2 space-y-4 scroll-smooth">
          <div className="max-w-[1920px] mx-auto space-y-4">

            {/* VIEW ROUTING ACCORDING TO ACTIVE UNIT */}
            {activeUnitId === 'kepala-bp' ? (
              /* --- DASHBOARD KEPALA BP BATAM (4 IKS & PERKIN 2026) --- */
              <KepalaBpDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
                onNavigateToUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-kebijakan-strategis' ? (
              /* --- DASHBOARD DEPUTI BIDANG KEBIJAKAN STRATEGIS DAN PERIZINAN (DEP A2 / PERKIN A2) --- */
              <KebijakanStrategisDashboard
                activeSheet={activeSheet}
                onSelectSheet={handleSelectSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1-perencanaan');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onNavigateToFullDashboard={(unitId) => handleSelectUnit(unitId)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-administrasi-keuangan' ? (
              /* --- DASHBOARD DEPUTI BIDANG ADMINISTRASI DAN KEUANGAN (PERKIN A1) --- */
              <AdministrasiKeuanganDashboard
                activeSheet={activeSheet}
                activeSubTab={activeSheet}
                onSelectSheet={handleSelectSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1-rb');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-pengelolaan-lahan' ? (
              /* --- DASHBOARD DEPUTI BIDANG PENGELOLAAN LAHAN, PESISIR DAN REKLAMASI (PERKIN A3) --- */
              <PengelolaanLahanPesisirDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1-lahan-investasi');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-investasi' ? (
              /* --- DASHBOARD DEPUTI BIDANG INVESTASI DAN PENGUSAHAAN (PERKIN A4) --- */
              <InvestasiPengusahaanDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1-investasi-kpbpb');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-bandara-pelabuhan' ? (
              /* --- DASHBOARD DEPUTI BIDANG PENGELOLAAN BANDARA, PELABUHAN DAN LALU LINTAS BARANG (PERKIN A5) --- */
              <BandaraPelabuhanLlbDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1-ikm-gabungan');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-pelayanan-umum' ? (
              /* --- DASHBOARD DEPUTI PELAYANAN UMUM (PERKIN A6) --- */
              <PelayananUmumDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeUnitId === 'deputi-infrastruktur' ? (
              /* --- DASHBOARD DEPUTI BIDANG INFRASTRUKTUR (PERKIN A7) --- */
              <InfrastrukturPerkinA7Dashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId || 'ikp-1-pembangunan-infrastruktur');
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onSwitchUnit={(unitId) => handleSelectUnit(unitId)}
              />
            ) : activeSheet === 'kpi_word_doc' ? (
              <KpiWordDocumentView
                activeUnitId={activeUnitId}
                onBackToDashboard={() => setActiveSheet(activeUnitId === 'biro-keuangan' ? 'overview' : 'ikhtisar')}
              />
            ) : activeUnitId === 'biro-keuangan' ? (
              /* --- BIRO KEUANGAN DASHBOARD & KAMUS RUMUS --- */
              activeSheet === 'kamus_rumus' ? (
                <BiroKeuanganKamusRumusView />
              ) : (
                <>
                  {/* Top Parameter & Filter Bar */}
                  <ExecutiveFilters
                    selectedYear={selectedYear}
                    onChangeYear={handleYearChange}
                    selectedMonth={selectedMonth}
                    onChangeMonth={handleMonthChange}
                    selectedQuarter={selectedQuarter}
                    onChangeQuarter={handleQuarterChange}
                    selectedUnit={selectedUnit}
                    onChangeUnit={handleUnitChange}
                    selectedFunding={selectedFunding}
                    onChangeFunding={handleFundingChange}
                    basis={basis}
                    onChangeBasis={handleBasisChange}
                    onResetFilters={handleResetFilters}
                    onRefresh={handleRefresh}
                    isRefreshing={isRefreshing}
                    onOpenExportModal={() => setIsExportModalOpen(true)}
                    onOpenDataExploration={() => setIsTableauGuideOpen(true)}
                    selectedPeriod={selectedPeriod}
                    onChangePeriod={setSelectedPeriod}
                  />

                  {/* Biro Keuangan Worksheets - Official Satu Data BP Batam */}
                  <BiroKeuanganDashboard
                    onOpenFormulaModal={(kpiId) => {
                      setSelectedKpiFormulaId(kpiId);
                      setIsKpiFormulaModalOpen(true);
                    }}
                    onOpenExportModal={() => setIsExportModalOpen(true)}
                  />
                </>
              )
            ) : activeUnitId === 'pdsi' ? (
              /* --- PUSAT DATA DAN SISTEM INFORMASI (PDSI) DASHBOARD --- */
              <PdsiDashboard
                activeSubMenu={activeSheet}
                onSelectSubMenu={handleSelectSheet}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'ptsp' ? (
              /* --- PUSAT PELAYANAN TERPADU SATU PINTU (PTSP) DASHBOARD --- */
              <PtspDashboard
                activeSubMenu={activeSheet}
                onSelectSubMenu={handleSelectSheet}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'pusat-harmonisasi' ? (
              /* --- PUSAT HARMONISASI KEBIJAKAN STRATEGIS (PHKS) DASHBOARD (HALAMAN 12-13 PDF) --- */
              <HarmonisasiDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
              />
            ) : activeUnitId === 'dit-pengembangan-kek' ? (
              /* --- DIREKTORAT PENGEMBANGAN KPBPBB DAN KEK DASHBOARD --- */
              <KekDashboard
                activeSubMenu={activeSheet}
                onSelectSubMenu={handleSelectSheet}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'dit-investasi' ? (
              /* --- DIREKTORAT INVESTASI DASHBOARD --- */
              <InvestasiDashboard
                activeSubMenu={activeSheet}
                onSubMenuChange={handleSelectSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'dit-lalu-lintas-barang' ? (
              /* --- DIREKTORAT LALU LINTAS BARANG DASHBOARD --- */
              <LaluLintasBarangDashboard
                activeSubMenu={activeSheet}
                onSelectSubMenu={handleSelectSheet}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'dit-pelabuhan' ? (
              /* --- DIREKTORAT PENGELOLAAN KEPELABUHANAN DASHBOARD --- */
              <KepelabuhananDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'bu-rumah-sakit' ? (
              /* --- BADAN USAHA RUMAH SAKIT (RSBP BATAM) DASHBOARD --- */
              <RumahSakitDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'biro-hukum' ? (
              /* --- BIRO HUKUM BP BATAM DASHBOARD --- */
              <BiroHukumDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : activeUnitId === 'dit-perencanaan-infrastruktur' ? (
              /* --- DIREKTORAT PERENCANAAN INFRASTRUKTUR DASHBOARD --- */
              <PerencanaanInfrastrukturDashboard />
            ) : activeUnitId === 'dit-pembangunan-infrastruktur' ? (
              /* --- DIREKTORAT PEMBANGUNAN INFRASTRUKTUR DASHBOARD --- */
              <PembangunanInfrastrukturDashboard />
            ) : activeUnitId === 'dit-pam-aset' ? (
              /* --- DIREKTORAT PENGAMANAN ASET DAN KAWASAN DASHBOARD --- */
              <PengamananAsetDashboard />
            ) : activeUnitId === 'dit-pesisir-reklamasi' ? (
              /* --- DIREKTORAT PENGELOLAAN KAWASAN PESISIR DAN REKLAMASI DASHBOARD --- */
              <PesisirReklamasiDashboard />
            ) : activeUnitId === 'dit-pengendalian-lahan' ? (
              /* --- DIREKTORAT PENGENDALIAN PENGELOLAAN LAHAN, PESISIR DAN REKLAMASI DASHBOARD --- */
              <PengendalianLahanDashboard activeSubTab={activeSheet} />
            ) : activeUnitId === 'dit-lahan' ? (
              /* --- DIREKTORAT PENGELOLAAN LAHAN DASHBOARD --- */
              <PengelolaanLahanDashboard />
            ) : activeUnitId === 'dit-pengendalian-usaha' ? (
              /* --- DIREKTORAT PENGENDALIAN PENGUSAHAAN DASHBOARD --- */
              <PengendalianPengusahaanDashboard activeSubTab={activeSheet} />
            ) : activeUnitId === 'dit-bandara' ? (
              /* --- DIREKTORAT PENGELOLAAN KAWASAN BANDARA DASHBOARD --- */
              <PengelolaanBandaraDashboard />
            ) : activeUnitId === 'biro-organisasi' ? (
              /* --- BIRO ORGANISASI, KEPATUHAN DAN MANAJEMEN RISIKO (BOKMR) DASHBOARD --- */
              <BiroOrganisasiDashboard />
            ) : activeUnitId === 'biro-sdm' ? (
              /* --- BIRO SUMBER DAYA MANUSIA (SDM) DASHBOARD --- */
              <BiroSDMDashboard
                activeSubTab={activeSheet}
                onOpenFormulaModal={(kpiId) => {
                  setSelectedKpiFormulaId(kpiId);
                  setIsKpiFormulaModalOpen(true);
                }}
              />
            ) : (
              /* --- OTHER UNITS DASHBOARD & DESIGNER --- */
              <OtherUnitPlaceholder
                unit={currentUnit}
                onOpen24UnitsDrawer={() => setIsUnitsDrawerOpen(true)}
                onSwitchToKeuangan={() => handleSelectUnit('biro-keuangan')}
                onSwitchToPdsi={() => handleSelectUnit('pdsi')}
              />
            )}
          </div>
        </main>

        {/* Status Bar */}
        <footer className="h-7 bg-[#F2F4F7] border-t border-slate-300 px-4 flex items-center justify-between text-[11px] text-slate-600 font-sans select-none shrink-0">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={() => setIsUnitsDrawerOpen(true)}
              className="flex items-center gap-1 text-[#1F3864] hover:text-blue-700 font-bold hover:underline cursor-pointer"
              title="Buka Direktori 24 Unit Kerja BP Batam"
            >
              <Layers className="w-3 h-3 text-[#4E79A7]" />
              <span>Unit Aktif: {currentUnit.name} ({currentUnit.code})</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="hidden sm:inline font-mono text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{BP_BATAM_24_UNITS.filter((u) => u.status === 'active').length} dari 24 Unit Aktif Siap Pakai</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden md:inline font-mono">
              {activeUnitId === 'biro-keuangan'
                ? '28 Item Katalog PDF'
                : activeUnitId === 'pdsi'
                ? '21 Item Katalog PDF'
                : `${currentUnit.itemCount} Item Katalog PDF`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTableauGuideOpen(true)}
              className="text-[#4E79A7] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <FileCode2 className="w-3 h-3 text-[#E15759]" />
              <span>Tableau Calculated Fields &amp; Guide</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-500 font-medium">
              Command Center v2026.4
            </span>
          </div>
        </footer>
      </div>

      {/* 24 Units Sliding Drawer */}
      <UnitsDrawer
        isOpen={isUnitsDrawerOpen}
        onClose={() => setIsUnitsDrawerOpen(false)}
        activeUnitId={activeUnitId}
        onSelectUnit={handleSelectUnit}
      />

      {/* Drill-down Detail Modal */}
      <DetailModal
        type={detailModalType}
        isOpen={detailModalType !== null}
        onClose={() => setDetailModalType(null)}
      />

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lastUpdated="24 Apr 2026 10:24 WIB"
        activeUnitId={activeUnitId}
      />

      {/* Tableau Guide Modal */}
      <TableauGuideModal
        isOpen={isTableauGuideOpen}
        onClose={() => setIsTableauGuideOpen(false)}
      />

      {/* KPI Formula & Calculation Logic Pop-up Modal (Biro Keuangan & PDSI) */}
      <KpiFormulaExplanationModal
        kpiId={selectedKpiFormulaId}
        isOpen={isKpiFormulaModalOpen}
        onClose={() => {
          setIsKpiFormulaModalOpen(false);
          setSelectedKpiFormulaId(null);
        }}
        onSelectAnotherKpi={(id) => setSelectedKpiFormulaId(id)}
      />

      {/* Katalog Nama Visualisasi di Setiap Informasi Seluruh Dashboard Modal */}
      <KatalogVisualisasiDashboardModal
        isOpen={isVisualCatalogModalOpen}
        onClose={() => setIsVisualCatalogModalOpen(false)}
        initialFilterUnit={activeUnitId}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-6 z-50 bg-slate-900 text-white px-4 py-2 shadow-lg border border-slate-700 flex items-center gap-2 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
