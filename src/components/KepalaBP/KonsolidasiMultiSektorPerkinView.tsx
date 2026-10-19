import React, { useState } from 'react';
import {
  Ship,
  Plane,
  Truck,
  FileCheck2,
  DollarSign,
  Building2,
  Clock,
  Users,
  Droplets,
  HeartPulse,
  ShieldCheck,
  MapPin,
  Anchor,
  HardHat,
  Server,
  Award,
  Activity,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  X,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Sparkles,
  BarChart3,
  TrendingUp,
  CreditCard,
  Shield,
  Search,
  Calculator,
  Database,
  Info,
} from 'lucide-react';
import {
  KONSOLIDASI_MULTI_SEKTOR_BP_BATAM,
  MultiSektorStrategicSummary,
  MultiMetrikItem,
} from './kepalaBpData';
import { KonsolidasiSatuDataFormulaModal } from './KonsolidasiSatuDataFormulaModal';

interface KonsolidasiMultiSektorPerkinViewProps {
  onNavigateToUnit?: (unitId: string) => void;
  onNavigateToCrossUnitMatrix?: () => void;
}

// Configuration for each sector adhering to the exact Perkin A1 design pattern
interface SectorThemeConfig {
  borderTop: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  titleHover: string;
  heroGradient: string;
  heroBorder: string;
  heroTitle: string;
  subHighlightColor: string;
  barGradient: string;
  statusBg: string;
  statusText: string;
  statusBorder: string;
  primaryKpiName: string;
  primaryKpiValue: string;
  primaryKpiTarget: string;
  primaryKpiProgress: number;
  primaryKpiTag: string;
  statusOverall: string;
  klasterNumber: string;
  formulaCode: string;
}

const SECTOR_CONFIGS: Record<string, SectorThemeConfig> = {
  'sektor-logistik-aviasi': {
    borderTop: 'border-t-[#0A2540]',
    badgeBg: 'bg-slate-100',
    badgeColor: 'text-[#0A2540]',
    badgeBorder: 'border-slate-300',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-300',
    iconColor: 'text-[#0A2540]',
    titleHover: 'text-[#0A2540]',
    heroGradient: 'from-slate-50 via-amber-50/20 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    subHighlightColor: 'text-amber-800',
    barGradient: 'from-[#0A2540] to-amber-500',
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-900',
    statusBorder: 'border-amber-300',
    primaryKpiName: 'Arus Peti Kemas Batu Ampar (STS Crane)',
    primaryKpiValue: '612.400 TEUs',
    primaryKpiTarget: '650.000 TEUs',
    primaryKpiProgress: 94.2,
    primaryKpiTag: '94.2% TERCAPAI',
    statusOverall: 'Throughput & Logistik Prima',
    klasterNumber: 'KLASTER 1',
    formulaCode: 'kpi-arus-peti-kemas-batu-ampar',
  },
  'sektor-investasi-kek': {
    borderTop: 'border-t-[#0A2540]',
    badgeBg: 'bg-slate-100',
    badgeColor: 'text-[#0A2540]',
    badgeBorder: 'border-slate-300',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-300',
    iconColor: 'text-[#0A2540]',
    titleHover: 'text-[#0A2540]',
    heroGradient: 'from-slate-50 via-amber-50/20 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    subHighlightColor: 'text-amber-800',
    barGradient: 'from-[#0A2540] to-amber-500',
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-900',
    statusBorder: 'border-amber-300',
    primaryKpiName: 'Nilai Realisasi Investasi (PMA & PMDN)',
    primaryKpiValue: 'Rp 54,68 T',
    primaryKpiTarget: 'Rp 70,0 T',
    primaryKpiProgress: 78.1,
    primaryKpiTag: '78.1% ON TRACK',
    statusOverall: 'Iklim Investasi Prima',
    klasterNumber: 'KLASTER 2',
    formulaCode: 'kpi-realisasi-investasi-pma-pmdn',
  },
  'sektor-air-medis-lingkungan': {
    borderTop: 'border-t-[#0A2540]',
    badgeBg: 'bg-slate-100',
    badgeColor: 'text-[#0A2540]',
    badgeBorder: 'border-slate-300',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-300',
    iconColor: 'text-[#0A2540]',
    titleHover: 'text-[#0A2540]',
    heroGradient: 'from-slate-50 via-amber-50/20 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    subHighlightColor: 'text-amber-800',
    barGradient: 'from-[#0A2540] to-amber-500',
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-900',
    statusBorder: 'border-amber-300',
    primaryKpiName: 'Volume Tampungan 6 Waduk Air Baku',
    primaryKpiValue: '161,96M m³',
    primaryKpiTarget: '167,3M m³',
    primaryKpiProgress: 96.8,
    primaryKpiTag: '96.8% AMAN & NORMAL',
    statusOverall: 'Ketahanan Air Terjaga',
    klasterNumber: 'KLASTER 3',
    formulaCode: 'kpi-volume-tampungan-6-waduk',
  },
  'sektor-lahan-aset-keamanan': {
    borderTop: 'border-t-[#0A2540]',
    badgeBg: 'bg-slate-100',
    badgeColor: 'text-[#0A2540]',
    badgeBorder: 'border-slate-300',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-300',
    iconColor: 'text-[#0A2540]',
    titleHover: 'text-[#0A2540]',
    heroGradient: 'from-slate-50 via-amber-50/20 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    subHighlightColor: 'text-amber-800',
    barGradient: 'from-[#0A2540] to-amber-500',
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-900',
    statusBorder: 'border-amber-300',
    primaryKpiName: 'Alokasi Lahan Investasi 7 SWP Batam',
    primaryKpiValue: '248,50 Ha',
    primaryKpiTarget: '200,00 Ha',
    primaryKpiProgress: 100,
    primaryKpiTag: '124.3% MELAMPAUI TARGET',
    statusOverall: 'Optimalisasi Lahan Efektif',
    klasterNumber: 'KLASTER 4',
    formulaCode: 'kpi-alokasi-lahan-7-swp',
  },
  'sektor-infrastruktur-teknis': {
    borderTop: 'border-t-[#0A2540]',
    badgeBg: 'bg-slate-100',
    badgeColor: 'text-[#0A2540]',
    badgeBorder: 'border-slate-300',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-300',
    iconColor: 'text-[#0A2540]',
    titleHover: 'text-[#0A2540]',
    heroGradient: 'from-slate-50 via-amber-50/20 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    subHighlightColor: 'text-amber-800',
    barGradient: 'from-[#0A2540] to-amber-500',
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-900',
    statusBorder: 'border-amber-300',
    primaryKpiName: 'Proyek Konstruksi Fisik & Jalan Arteri',
    primaryKpiValue: '14 Paket',
    primaryKpiTarget: 'Kurva S 92,4%',
    primaryKpiProgress: 92.4,
    primaryKpiTag: '92.4% ON SCHEDULE',
    statusOverall: 'Progres Fisik Sesuai Jadwal',
    klasterNumber: 'KLASTER 5',
    formulaCode: 'kpi-proyek-konstruksi-infrastruktur',
  },
  'sektor-tata-kelola-institusi': {
    borderTop: 'border-t-[#0A2540]',
    badgeBg: 'bg-slate-100',
    badgeColor: 'text-[#0A2540]',
    badgeBorder: 'border-slate-300',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-300',
    iconColor: 'text-[#0A2540]',
    titleHover: 'text-[#0A2540]',
    heroGradient: 'from-slate-50 via-amber-50/20 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    subHighlightColor: 'text-amber-800',
    barGradient: 'from-[#0A2540] to-amber-500',
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-900',
    statusBorder: 'border-amber-300',
    primaryKpiName: 'Akuntabilitas SAKIP & Opini BPK WTP',
    primaryKpiValue: '82,68',
    primaryKpiTarget: 'Predikat A',
    primaryKpiProgress: 98.4,
    primaryKpiTag: 'PREDIKAT A (MEMUASKAN)',
    statusOverall: 'Akuntabel & WTP 8x Berturut',
    klasterNumber: 'KLASTER 6',
    formulaCode: 'kpi-akuntabilitas-sakip-wtp',
  },
};

export const KonsolidasiMultiSektorPerkinView: React.FC<KonsolidasiMultiSektorPerkinViewProps> = ({
  onNavigateToUnit,
  onNavigateToCrossUnitMatrix,
}) => {
  const [selectedKlasterFilter, setSelectedKlasterFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailModal, setActiveDetailModal] = useState<MultiSektorStrategicSummary | null>(null);

  // Modal Satu Data & Rumus Perhitungan state
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [selectedFormulaMetric, setSelectedFormulaMetric] = useState<string | null>(null);

  // Helper to open formula modal for a specific metric
  const handleOpenFormulaModal = (metricKeywordOrId: string) => {
    setSelectedFormulaMetric(metricKeywordOrId);
    setIsFormulaModalOpen(true);
  };

  // Helper for jumping to sub-unit dashboard
  const handleJumpToUnit = (unitIdOrCode: string) => {
    if (!onNavigateToUnit) return;
    const lower = unitIdOrCode.toLowerCase();
    if (lower.includes('rsbp') || lower.includes('burs') || lower.includes('rumah sakit')) {
      onNavigateToUnit('bu-rumah-sakit');
    } else if (lower.includes('ditpam') || lower.includes('pengamanan')) {
      onNavigateToUnit('dit-pam-aset');
    } else if (lower.includes('ptsp')) {
      onNavigateToUnit('ptsp');
    } else if (lower.includes('pelabuhan') || lower.includes('bup')) {
      onNavigateToUnit('dit-pelabuhan');
    } else if (lower.includes('bandara')) {
      onNavigateToUnit('dit-bandara');
    } else if (lower.includes('lahan') || lower.includes('dpl') || lower.includes('pertanahan')) {
      onNavigateToUnit('dit-lahan');
    } else if (lower.includes('pembangunan') || lower.includes('infrastruktur')) {
      onNavigateToUnit('dit-pembangunan-infrastruktur');
    } else if (lower.includes('pdsi')) {
      onNavigateToUnit('pdsi');
    } else if (lower.includes('keuangan')) {
      onNavigateToUnit('biro-keuangan');
    } else if (lower.includes('sdm')) {
      onNavigateToUnit('biro-sdm');
    } else if (lower.includes('organisasi') || lower.includes('okmr')) {
      onNavigateToUnit('biro-organisasi');
    } else if (lower.includes('hukum')) {
      onNavigateToUnit('biro-hukum');
    } else if (lower.includes('investasi')) {
      onNavigateToUnit('dit-investasi');
    } else if (lower.includes('kek')) {
      onNavigateToUnit('dit-kek');
    } else if (lower.includes('lalu-lintas') || lower.includes('llb')) {
      onNavigateToUnit('dit-lalu-lintas-barang');
    } else if (lower.includes('spam') || lower.includes('pelayanan-umum')) {
      onNavigateToUnit('deputi-pelayanan-umum');
    } else if (lower.includes('dep-a1')) {
      onNavigateToUnit('deputi-administrasi-keuangan');
    } else if (lower.includes('dep-a2')) {
      onNavigateToUnit('deputi-kebijakan-strategis');
    } else if (lower.includes('dep-a3')) {
      onNavigateToUnit('deputi-pengelolaan-lahan');
    } else if (lower.includes('dep-a4')) {
      onNavigateToUnit('deputi-investasi');
    } else if (lower.includes('dep-a5')) {
      onNavigateToUnit('deputi-bandara-pelabuhan');
    } else if (lower.includes('dep-a6')) {
      onNavigateToUnit('deputi-pelayanan-umum');
    } else if (lower.includes('dep-a7')) {
      onNavigateToUnit('deputi-infrastruktur');
    } else if (onNavigateToCrossUnitMatrix) {
      onNavigateToCrossUnitMatrix();
    }
  };

  // Helper icon renderer for sector headers
  const renderSectorIcon = (iconName: string, iconClass: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Ship':
        return <Ship className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'Droplets':
        return <Droplets className={iconClass} />;
      case 'Shield':
        return <ShieldCheck className={iconClass} />;
      case 'HardHat':
        return <HardHat className={iconClass} />;
      case 'Building2':
        return <Award className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  // Helper for sub-metric icons
  const getSubMetricIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('ekspor') || l.includes('devisa') || l.includes('ftz')) return <Ship className="w-3.5 h-3.5" />;
    if (l.includes('peti kemas') || l.includes('teus')) return <Ship className="w-3.5 h-3.5" />;
    if (l.includes('penumpang') || l.includes('aviasi') || l.includes('pesawat')) return <Plane className="w-3.5 h-3.5" />;
    if (l.includes('kargo') || l.includes('jalan') || l.includes('logistik')) return <Truck className="w-3.5 h-3.5" />;
    if (l.includes('dokumen') || l.includes('ppftz') || l.includes('ded') || l.includes('izin')) return <FileCheck2 className="w-3.5 h-3.5" />;
    if (l.includes('pnbp') || l.includes('investasi') || l.includes('anggaran') || l.includes('belanja') || l.includes('kemandirian')) return <DollarSign className="w-3.5 h-3.5" />;
    if (l.includes('kek') || l.includes('industri') || l.includes('gedung')) return <Building2 className="w-3.5 h-3.5" />;
    if (l.includes('sla') || l.includes('waktu') || l.includes('kecepatan')) return <Clock className="w-3.5 h-3.5" />;
    if (l.includes('investor') || l.includes('merit') || l.includes('aparatur') || l.includes('pasien')) return <Users className="w-3.5 h-3.5" />;
    if (l.includes('waduk') || l.includes('air') || l.includes('wtp')) return <Droplets className="w-3.5 h-3.5" />;
    if (l.includes('bor') || l.includes('medis') || l.includes('rsbp')) return <HeartPulse className="w-3.5 h-3.5" />;
    if (l.includes('limbah') || l.includes('kpli') || l.includes('penertiban') || l.includes('tertib') || l.includes('spip')) return <ShieldCheck className="w-3.5 h-3.5" />;
    if (l.includes('lahan') || l.includes('swp') || l.includes('lokasi')) return <MapPin className="w-3.5 h-3.5" />;
    if (l.includes('ruang laut') || l.includes('reklamasi') || l.includes('kapal')) return <Anchor className="w-3.5 h-3.5" />;
    if (l.includes('proyek') || l.includes('konstruksi') || l.includes('fisik') || l.includes('flyover')) return <HardHat className="w-3.5 h-3.5" />;
    if (l.includes('spbe') || l.includes('satu data') || l.includes('server')) return <Server className="w-3.5 h-3.5" />;
    if (l.includes('sakip') || l.includes('wtp') || l.includes('opini')) return <Award className="w-3.5 h-3.5" />;
    return <Activity className="w-3.5 h-3.5" />;
  };

  // Helper for sub-metric icon background styling
  const getSubMetricIconBg = (sectorId: string) => {
    switch (sectorId) {
      case 'sektor-logistik-aviasi':
        return 'bg-blue-100 text-blue-700';
      case 'sektor-investasi-kek':
        return 'bg-sky-100 text-sky-700';
      case 'sektor-air-medis-lingkungan':
        return 'bg-teal-100 text-teal-700';
      case 'sektor-lahan-aset-keamanan':
        return 'bg-emerald-100 text-emerald-700';
      case 'sektor-infrastruktur-teknis':
        return 'bg-amber-100 text-amber-700';
      case 'sektor-tata-kelola-institusi':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Filter sectors based on selected tab and search
  const filteredSectors = KONSOLIDASI_MULTI_SEKTOR_BP_BATAM.filter((item) => {
    const matchFilter = selectedKlasterFilter === 'all' || item.id === selectedKlasterFilter;
    if (!matchFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.sektor.toLowerCase().includes(q) ||
      item.judul.toLowerCase().includes(q) ||
      item.deskripsi.toLowerCase().includes(q) ||
      item.highlightUtama.toLowerCase().includes(q) ||
      item.satkerTerkait.some((s) => s.nama.toLowerCase().includes(q) || s.kode.toLowerCase().includes(q)) ||
      item.metrikList.some((m) => m.label.toLowerCase().includes(q) || m.nilai.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* 1. SECTION HEADER (IDENTIK DENGAN CONTOH MODEL KPI PERKIN A1)       */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  KONSOLIDASI MULTI-INDIKATOR STRATEGIS DIREKTORAT, BIRO & BADAN USAHA
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold border border-blue-200 shadow-2xs">
                  6 KLASTER SEKTORAL TERPADU
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 shadow-2xs flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  <span>BUKU SATU DATA (HAL. 1 - 53)</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Klik kartu atau indikator untuk memeriksa Satker Pengampu, Nomor Dataset Resmi, dan Formula Perhitungan Matematis
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleOpenFormulaModal('kpi-arus-peti-kemas-batu-ampar')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#002B49] text-white hover:bg-blue-900 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Buka Kamus Master Satu Data & Formula Perhitungan"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-300" />
              <span>Kamus Rumus &amp; Sumber Satu Data ↗</span>
            </button>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded font-mono text-[11px]">
              24 Satker Terintegrasi
            </span>
          </div>
        </div>

        {/* Filter Bar: Segmented Klaster Controls & Search */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedKlasterFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                selectedKlasterFilter === 'all'
                  ? 'bg-white text-blue-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Klaster ({KONSOLIDASI_MULTI_SEKTOR_BP_BATAM.length})
            </button>
            {KONSOLIDASI_MULTI_SEKTOR_BP_BATAM.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setSelectedKlasterFilter(k.id)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer truncate max-w-[155px] ${
                  selectedKlasterFilter === k.id
                    ? 'bg-white text-blue-900 shadow-xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={k.sektor}
              >
                {k.sektor.split('&')[0].trim()}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari indikator / satker / rumus..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. GRID KARTU KONSOLIDASI IDENTIK DENGAN CONTOH KPI PERKIN A1        */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
        {filteredSectors.map((sektor) => {
          const cfg = SECTOR_CONFIGS[sektor.id] || SECTOR_CONFIGS['sektor-logistik-aviasi'];
          return (
            <div
              key={sektor.id}
              className={`bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group border-t-4 ${cfg.borderTop}`}
            >
              <div>
                {/* Top Badge & Sector Header (Persis Format Perkin A1) */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl ${cfg.iconBg} ${cfg.iconBorder} border flex items-center justify-center ${cfg.iconColor} shrink-0 shadow-2xs`}
                    >
                      {renderSectorIcon(sektor.iconName, 'w-5 h-5')}
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded ${cfg.badgeBg} ${cfg.badgeColor} border ${cfg.badgeBorder} uppercase tracking-wider inline-block`}
                      >
                        {cfg.klasterNumber} &bull; {sektor.sektor}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug group-hover:${cfg.titleHover} transition-colors mt-0.5 truncate`}
                        title={sektor.judul}
                      >
                        {sektor.judul}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[10px] font-bold ${cfg.statusText} ${cfg.statusBg} px-2 py-0.5 rounded border ${cfg.statusBorder} flex items-center gap-1 font-mono shadow-2xs`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {cfg.primaryKpiTag}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenFormulaModal(cfg.primaryKpiName)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                      title={`Buka Sumber Data & Formula: ${cfg.primaryKpiName}`}
                    >
                      <Calculator className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Sektor Narrative Description */}
                <p className="text-xs text-slate-500 leading-relaxed mt-2.5 line-clamp-2">
                  {sektor.deskripsi}
                </p>

                {/* ============================================================== */}
                {/* PRIMARY IKP CARD BLOCK: INTERAKTIF MEMBUKA SUMBER DATA & RUMUS */}
                {/* ============================================================== */}
                <div
                  onClick={() => handleOpenFormulaModal(cfg.primaryKpiName)}
                  className="bg-white rounded-xl p-3.5 border border-slate-200/90 my-3.5 shadow-2xs cursor-pointer group/hero hover:border-blue-400 hover:shadow-xs transition-all"
                  title="Klik untuk membuka rincian Sumber Satu Data, Nomor Dataset, & Rumus Perhitungan"
                >
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>{cfg.primaryKpiName}</span>
                    </span>

                    {/* Button Badge: Lihat Sumber & Rumus */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFormulaModal(cfg.primaryKpiName);
                      }}
                      className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 hover:bg-blue-700 hover:text-white border border-blue-200 transition-colors flex items-center gap-1 font-bold cursor-pointer shadow-2xs"
                    >
                      <Calculator className="w-3 h-3" />
                      <span>Sumber &amp; Rumus ↗</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-2 mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                        {cfg.primaryKpiValue}
                      </span>
                      <span className={`text-xs font-bold ${cfg.subHighlightColor}`}>
                        {cfg.statusOverall}
                      </span>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-[10px] text-slate-500 block">Target / Acuan:</span>
                      <span className="font-bold font-mono text-slate-800 text-xs sm:text-sm">
                        {cfg.primaryKpiTarget}
                      </span>
                    </div>
                  </div>

                  {/* Highlight Utama Narrative */}
                  <div className="mt-2.5 p-2 rounded-lg bg-white/80 border border-slate-200/70 text-xs text-slate-700 font-medium leading-relaxed flex items-start justify-between gap-2">
                    <span>{sektor.highlightUtama}</span>
                    <span className="text-[10px] text-blue-600 font-mono font-bold shrink-0 flex items-center gap-0.5">
                      <span>Detail</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Progress Bar (Identik Model Perkin A1) */}
                  <div className="w-full h-2 rounded-full bg-slate-200/90 mt-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${cfg.barGradient} transition-all duration-500`}
                      style={{ width: `${Math.min(100, cfg.primaryKpiProgress)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1">
                    <span>Ketercapaian Target Klaster</span>
                    <span className="font-bold text-slate-800">{cfg.primaryKpiProgress}% Realisasi</span>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* RINGKASAN INDIKATOR TAMBAHAN: DEDUPLIKASI KETAT & INTERAKTIF   */}
                {/* ============================================================== */}
                {(() => {
                  // FILTER TEGAS: JANGAN TAMPILKAN METRIK YANG SUDAH ADA DI BOX UTAMA (MENCEGAH DOUBLE INFORMASI)
                  const displayedMetrics = sektor.metrikList.filter((m) => {
                    const normLabel = m.label.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const normPrimary = cfg.primaryKpiName.toLowerCase().replace(/[^a-z0-9]/g, '');

                    // 1. Direct label containment
                    if (normPrimary.includes(normLabel) || normLabel.includes(normPrimary)) return false;

                    // 2. Peti kemas & Batu Ampar deduplication (Permintaan eksplisit user)
                    if (
                      cfg.primaryKpiName.toLowerCase().includes('peti kemas') &&
                      (m.label.toLowerCase().includes('peti kemas') ||
                        m.label.toLowerCase().includes('batu ampar') ||
                        m.label.toLowerCase().includes('sts crane'))
                    ) {
                      return false;
                    }

                    // 3. Investasi deduplication
                    if (
                      cfg.primaryKpiName.toLowerCase().includes('investasi') &&
                      m.label.toLowerCase().includes('realisasi investasi')
                    ) {
                      return false;
                    }

                    // 4. Waduk & Air deduplication
                    if (
                      cfg.primaryKpiName.toLowerCase().includes('waduk') &&
                      (m.label.toLowerCase().includes('tampungan') ||
                        m.label.toLowerCase().includes('waduk air baku'))
                    ) {
                      return false;
                    }

                    // 5. Lahan deduplication
                    if (
                      cfg.primaryKpiName.toLowerCase().includes('lahan') &&
                      m.label.toLowerCase().includes('alokasi lahan')
                    ) {
                      return false;
                    }

                    // 6. Proyek konstruksi deduplication
                    if (
                      cfg.primaryKpiName.toLowerCase().includes('konstruksi') &&
                      m.label.toLowerCase().includes('proyek konstruksi')
                    ) {
                      return false;
                    }

                    // 7. SAKIP & WTP deduplication
                    if (
                      cfg.primaryKpiName.toLowerCase().includes('sakip') &&
                      (m.label.toLowerCase().includes('sakip') ||
                        m.label.toLowerCase().includes('akuntabilitas'))
                    ) {
                      return false;
                    }

                    return true;
                  });

                  return (
                    <div className="space-y-2 mt-3">
                      <div className="text-[10.5px] font-bold font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>INDIKATOR OUTPUT STRATEGIS SEKTOR:</span>
                        <span className="text-[9.5px] text-slate-400 font-normal">
                          {displayedMetrics.length} Indikator Kunci (Klik untuk Rumus)
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {displayedMetrics.map((m, idx) => {
                          const iconBgClass = getSubMetricIconBg(sektor.id);
                          const isSuccess = m.status === 'Tercapai' || m.status === 'Normal';
                          return (
                            <div
                              key={idx}
                              onClick={() => handleOpenFormulaModal(m.label)}
                              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/90 border border-slate-100 hover:bg-blue-50/60 hover:border-blue-200 transition-all text-xs cursor-pointer group/row"
                              title={`Klik untuk melihat Sumber Data Satu Data & Rumus: ${m.label}`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <div
                                  className={`w-7 h-7 rounded-lg ${iconBgClass} flex items-center justify-center shrink-0 shadow-2xs group-hover/row:scale-105 transition-transform`}
                                >
                                  {getSubMetricIcon(m.label)}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-800 truncate text-xs leading-snug group-hover/row:text-blue-900 transition-colors flex items-center gap-1.5">
                                    <span>{m.label}</span>
                                    <span className="opacity-0 group-hover/row:opacity-100 text-[9.5px] text-blue-600 font-mono font-normal">
                                      Rumus ↗
                                    </span>
                                  </div>
                                  <div className="text-[10.5px] text-slate-500 truncate mt-0.5">
                                    {m.subtext} {m.target ? `· ${m.target}` : ''}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <div className="font-black font-mono text-slate-900 text-xs sm:text-sm">
                                  {m.nilai}
                                </div>
                                <span
                                  className={`text-[9.5px] font-bold font-mono px-1.5 py-0.2 rounded border inline-block mt-0.5 ${
                                    isSuccess
                                      ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                                      : 'text-blue-800 bg-blue-50 border-blue-200'
                                  }`}
                                >
                                  {m.status}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Bottom Card Footer: Status & Unit Kerja Pengampu (Persis Model Perkin A1) */}
              <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs mt-3.5 gap-2">
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Status: Terkendali &amp; Renstra</span>
                </span>

                {/* Direct Jump Buttons to Underlying Units */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {sektor.satkerTerkait.map((u) => (
                    <button
                      key={u.routeId}
                      type="button"
                      onClick={() => handleJumpToUnit(u.routeId)}
                      className="px-2 py-1 rounded-md text-[10.5px] font-mono font-bold bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                      title={`Buka Analisis Dashboard ${u.nama}`}
                    >
                      <span>{u.kode || u.nama}</span>
                      <ChevronRight className="w-2.5 h-2.5 opacity-70" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleOpenFormulaModal(cfg.primaryKpiName)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold cursor-pointer pl-1 flex items-center gap-0.5 hover:underline"
                    title="Buka Lembar Rumus Matematis & Dokumen Satu Data"
                  >
                    <span>Kamus &amp; Rumus ↗</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 3. MODAL UTAMA: KAMUS SUMBER DATA SATU DATA & FORMULA PERHITUNGAN    */}
      {/* ==================================================================== */}
      <KonsolidasiSatuDataFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialMetricIdOrKeyword={selectedFormulaMetric}
        onNavigateToUnit={onNavigateToUnit}
      />

      {/* ==================================================================== */}
      {/* 4. MODAL DETAIL REGULASI & MANIFEST LENGKAP SEKTOR                   */}
      {/* ==================================================================== */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  {renderSectorIcon(activeDetailModal.iconName, 'w-5 h-5')}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    MANUAL RESMI KINERJA SEKTORAL
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {activeDetailModal.judul}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailModal(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Breakdown */}
            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-1">
                  Deskripsi &amp; Sasaran Strategis Sektor:
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {activeDetailModal.deskripsi}
                </p>
                <div className="mt-2 text-blue-800 font-semibold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{activeDetailModal.highlightUtama}</span>
                </div>
              </div>

              {/* Tabel Semua Indikator Sektor */}
              <div>
                <div className="text-[11px] font-mono font-bold text-slate-700 uppercase mb-2">
                  Daftar Metrik &amp; Verifikasi Satu Data BP Batam:
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/90 text-slate-700 font-mono text-[11px]">
                      <tr>
                        <th className="p-2.5 font-bold">Nama Indikator</th>
                        <th className="p-2.5 font-bold text-right">Realisasi</th>
                        <th className="p-2.5 font-bold">Target / Acuan</th>
                        <th className="p-2.5 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {activeDetailModal.metrikList.map((m, idx) => (
                        <tr
                          key={idx}
                          onClick={() => {
                            setActiveDetailModal(null);
                            handleOpenFormulaModal(m.label);
                          }}
                          className="hover:bg-blue-50/60 cursor-pointer"
                        >
                          <td className="p-2.5 font-semibold text-slate-800">
                            <div className="text-blue-900 font-bold flex items-center gap-1">
                              <span>{m.label}</span>
                              <Calculator className="w-3 h-3 text-blue-500" />
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal">{m.subtext}</div>
                          </td>
                          <td className="p-2.5 font-mono font-black text-slate-900 text-right whitespace-nowrap">
                            {m.nilai}
                          </td>
                          <td className="p-2.5 text-slate-600 text-[11px] font-mono">
                            {m.target || '-'}
                          </td>
                          <td className="p-2.5 text-center">
                            <span
                              className={`text-[9.5px] font-bold font-mono px-2 py-0.5 rounded border inline-block ${
                                m.status === 'Tercapai' || m.status === 'Normal'
                                  ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                                  : 'text-blue-800 bg-blue-50 border-blue-200'
                              }`}
                            >
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Satker Pengampu Terkait */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] font-mono font-bold text-blue-900 uppercase">
                    UNIT KERJA PENGAMPU DATA:
                  </div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Klik unit kerja di bawah untuk membuka dashboard analisis rinci
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeDetailModal.satkerTerkait.map((u) => (
                    <button
                      key={u.routeId}
                      type="button"
                      onClick={() => {
                        setActiveDetailModal(null);
                        handleJumpToUnit(u.routeId);
                      }}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-white text-blue-800 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>{u.nama}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveDetailModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
