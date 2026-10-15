import React, { useState } from 'react';
import {
  RefreshCw,
  Download,
  Maximize2,
  Minimize2,
  RotateCcw,
  Pause,
  Play,
  FileSpreadsheet,
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Receipt,
  Building2,
  Scale,
  Server,
  Headphones,
  ShieldCheck,
  Network,
  Package,
  Layers,
  Sparkles,
  FileText,
  FileCode2,
  Award,
  FileCheck2,
  FileCheck,
  Clock,
  Search,
  Ship,
  MessageSquare,
  FolderKanban,
  ArrowRightLeft,
  Briefcase,
  MapPin,
  Megaphone,
  Users,
  Anchor,
  Activity,
  Pill,
  Stethoscope,
  Gavel,
  FolderOpen,
  Plane,
  Map,
  Compass,
  BarChart3,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  PieChart,
  Database,
} from 'lucide-react';
import { BP_BATAM_24_UNITS } from '../data/bpBatamUnits';

interface HeaderProps {
  onOpenExportModal?: () => void;
  onOpenTableauGuide?: () => void;
  onOpenUnitsDrawer?: () => void;
  onOpenVisualCatalog?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  activeSheet: string;
  onSelectSheet: (sheetId: string) => void;
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExportModal,
  onOpenTableauGuide,
  onOpenUnitsDrawer,
  onOpenVisualCatalog,
  onRefresh,
  isRefreshing = false,
  activeSheet,
  onSelectSheet,
  activeUnitId,
  onSelectUnit,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const currentUnit = BP_BATAM_24_UNITS.find((u) => u.id === activeUnitId) || BP_BATAM_24_UNITS[0];
  const activeUnitsCount = BP_BATAM_24_UNITS.filter((u) => u.status === 'active').length;
  const onProgressUnitsCount = BP_BATAM_24_UNITS.filter((u) => u.status === 'on_progress').length;

  // Dynamic Sub-Menu tabs based on active unit
  const getSubMenus = () => {
    if (activeUnitId === 'kepala-bp') {
      return [
        { id: 'ikhtisar', label: 'Executive Command Center', icon: Compass },
        { id: 'investasi', label: 'IKS 1: Realisasi Investasi (Rp 70 T)', icon: TrendingUp },
        { id: 'ikm', label: 'IKS 2: Kepuasan Masyarakat (IKM 88)', icon: Award },
        { id: 'pnbp', label: 'IKS 3: Realisasi PNBP (Rp 2,447 T)', icon: CreditCard },
        { id: 'rb', label: 'IKS 4: Reformasi Birokrasi (80 BB)', icon: ShieldCheck },
        { id: 'matriks_satker', label: 'Matriks 24 Satker (Satu Data)', icon: Building2, isSpecial: true },
        { id: 'naskah_perkin', label: 'Naskah Dinas Word (.doc)', icon: FileText, isSpecial: true },
        { id: 'kamus_iks', label: 'Manual 4 IKS (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'deputi-kebijakan-strategis') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 4 IKP & Eksekutif', icon: LayoutDashboard },
        { id: 'kpi_visual', label: 'Visualisasi 4 IKP & Kinerja', icon: Award },
        { id: 'unit_kinerja', label: 'Kinerja Unit Pelaksana (PTSP, PDSI)', icon: Building2 },
        { id: 'deep_dive', label: 'Unit Deep-Dive Center', icon: Sparkles, isSpecial: true },
        { id: 'satu_data', label: 'Katalog 45 Dataset (PDF)', icon: Database },
      ];
    } else if (activeUnitId === 'deputi-administrasi-keuangan') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 4 IKP & Tata Kelola', icon: LayoutDashboard },
        { id: 'fiskal', label: 'Performa Fiskal & Belanja Unit', icon: TrendingUp },
        { id: 'sdm_merit', label: 'Kualifikasi & 8 Aspek Sistem Merit', icon: Award },
        { id: 'deep_dive', label: 'Unit Deep-Dive (BK, SDM, OKMR)', icon: Sparkles, isSpecial: true },
        { id: 'kamus_rumus', label: 'Manual 4 IKP (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'deputi-pengelolaan-lahan') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 3 IKP Lahan & Pesisir', icon: LayoutDashboard },
        { id: 'kpi_visual', label: 'Visualisasi Spasial 7 SWP & Alokasi', icon: MapPin },
        { id: 'unit_kinerja', label: 'Kinerja 3 Direktorat Pilar', icon: Building2 },
        { id: 'deep_dive', label: 'Unit Deep-Dive Center', icon: Sparkles, isSpecial: true },
        { id: 'kamus_rumus', label: 'Manual 3 IKP (PDF)', icon: FileCode2 },
        { id: 'satu_data', label: 'Katalog 23 Dataset (PDF)', icon: Database },
      ];
    } else if (activeUnitId === 'deputi-investasi') {
      return [
        { id: 'deep_dive', label: 'Unit Deep-Dive Center (3 Unit)', icon: Sparkles, isSpecial: true },
        { id: 'kamus_rumus', label: 'Manual 4 IKP (PDF)', icon: FileCode2 },
        { id: 'satu_data', label: 'Katalog 30 Dataset (PDF)', icon: Database },
      ];
    } else if (activeUnitId === 'deputi-bandara-pelabuhan') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 2 IKP & Realisasi', icon: LayoutDashboard },
        { id: 'evaluasi_ikp', label: 'Capaian Evaluasi 3 IKP', icon: Award },
        { id: 'deep_dive', label: 'Unit Deep-Dive Center (3 Unit)', icon: Sparkles, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus Perkin A5', icon: FileCode2 },
        { id: 'satu_data', label: 'Katalog 46 Dataset (PDF)', icon: Database },
      ];
    } else if (activeUnitId === 'deputi-pelayanan-umum') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 3 IKP Pelayanan Umum', icon: LayoutDashboard },
        { id: 'finansial', label: 'Finansial & PNBP Control', icon: CreditCard },
        { id: 'operasional', label: 'Kinerja 3 Satker Layanan', icon: TrendingUp },
        { id: 'deep_dive', label: 'Unit Deep-Dive Center', icon: Sparkles, isSpecial: true },
        { id: 'satu_data', label: 'Katalog 121 Dataset (PDF)', icon: Database },
        { id: 'kamus_rumus', label: 'Kamus Rumus Perkin A6', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'biro-keuangan') {
      return [
        { id: 'overview', label: 'Ikhtisar Eksekutif', icon: LayoutDashboard },
        { id: 'pendapatan', label: 'Kinerja Pendapatan', icon: TrendingUp },
        { id: 'belanja', label: 'Serapan Belanja', icon: CreditCard },
        { id: 'piutang', label: 'Aging & Piutang', icon: Receipt },
        { id: 'kas_bank', label: 'Arus Kas & Bank', icon: Building2 },
        { id: 'fiskal', label: 'Surplus/Defisit & Fiskal', icon: Scale },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'pdsi') {
      return [
        { id: 'ikhtisar', label: '10 Poin Eksekutif PDSI', icon: LayoutDashboard },
        { id: 'datacenter', label: 'Poin 9: Rekap DC, Tenant & Server', icon: Server },
        { id: 'layanan_ti', label: 'Poin 10: Layanan & Permintaan TI', icon: Headphones },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus PDSI (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'ptsp') {
      return [
        { id: 'ikhtisar', label: '12 Poin Eksekutif PTSP', icon: LayoutDashboard },
        { id: 'jenis_layanan', label: 'Jenis Layanan (Dataset 14)', icon: Layers },
        { id: 'sheet_swap', label: 'Sheet Swap Perizinan & Non-Perizinan', icon: ArrowRightLeft },
        { id: 'sektor', label: 'Sektor Berusaha (Dataset 9)', icon: Briefcase },
        { id: 'pengaduan', label: 'Pengaduan (Dataset 6)', icon: MessageSquare },
        { id: 'kamus_rumus', label: 'Kamus Rumus PTSP', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'pusat-perencanaan-program') {
      return [
        { id: 'masterplan', label: '5 Masterplan Strategis (DS 6, 7, 10, 11, 12)', icon: Layers },
        { id: 'renstra', label: 'Renstra 2025-2029 & Bappenas (DS 3, 4, 15, 17)', icon: Award },
        { id: 'monev', label: 'Monev Paket DIPA (DS 2, 5)', icon: TrendingUp },
        { id: 'jalan', label: 'Masterplan Jalan & Spasial (DS 12, 13, 19)', icon: MapPin },
        { id: 'kajian', label: 'Kajian Kelayakan & FS (DS 1, 14, 18)', icon: FileText },
      ];
    } else if (activeUnitId === 'pusat-harmonisasi') {
      return [
        { id: 'ikk', label: '4 Dimensi IKK & Evaluasi (DS 1)', icon: Award },
        { id: 'tarif', label: 'Daftar 7 Level Tarif Layanan (DS 3)', icon: Scale },
        { id: 'regulasi', label: 'Sinkronisasi Regulasi (DS 2, 4)', icon: FileCheck },
        { id: 'rapim', label: 'Risalah RDP & Rapim (DS 6, 7)', icon: Clock },
        { id: 'survei', label: 'Survei Kewajaran Tarif (DS 5)', icon: Search },
      ];
    } else if (activeUnitId === 'dit-pengembangan-kek') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Eksekutif KEK', icon: LayoutDashboard },
        { id: 'investasi', label: 'Realisasi Investasi PMA/PMDN (DS 1)', icon: TrendingUp },
        { id: 'profil_kek', label: 'Profil KEK & Lokasi (DS 2)', icon: MapPin },
        { id: 'kajian_kek', label: 'Laporan Kajian & Daya Saing (DS 12 & 9)', icon: BookOpen },
        { id: 'sheet_swap', label: 'Sheet Swap Perizinan (DS 3, 4, 7)', icon: ArrowRightLeft },
        { id: 'perencanaan_kek', label: 'Usulan KEK Baru (DS 5)', icon: Compass },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & 12 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'dit-investasi') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Eksekutif Investasi', icon: LayoutDashboard },
        { id: 'sektor_minat', label: 'Sektor Minat Investasi (DS 14)', icon: Briefcase },
        { id: 'infrastruktur', label: 'Infrastruktur Multi-Tahun (DS 6)', icon: Building2 },
        { id: 'promosi', label: 'Tentatif Promosi (DS 11)', icon: Megaphone },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & Satu Data', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'dit-lalu-lintas-barang') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Eksekutif LLB', icon: LayoutDashboard },
        { id: 'perizinan', label: 'Rekap Perizinan LLB (DS 3)', icon: FileCheck2 },
        { id: 'bulanan_swap', label: 'Sheet Swap Bulanan (DS 4, 6, 7)', icon: ArrowRightLeft },
        { id: 'sla', label: 'Kinerja SLA Selesai Tepat Waktu (DS 8 & 9)', icon: CheckCircle2 },
        { id: 'kuota', label: 'Realisasi Kuota Konsumsi (DS 2)', icon: Package },
        { id: 'kbli', label: 'KBLI Kawasan & Alur Izin (DS 1 & 5)', icon: Building2 },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Data & Rumus (9 Dataset)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'dit-pelabuhan') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 6 KPI Kepelabuhanan', icon: LayoutDashboard },
        { id: 'keuangan', label: 'PNBP & Belanja (DS 3 & 2)', icon: TrendingUp },
        { id: 'kunjungan', label: 'Kunjungan Kapal (DS 5 & 7)', icon: Ship },
        { id: 'penumpang', label: 'Penumpang & IKM (DS 25 & 21)', icon: Users },
        { id: 'dermaga', label: 'Dermaga & Batu Ampar (DS 4 & Logistik)', icon: Anchor },
        { id: 'kpi_word_doc', label: 'Dokumen KPI & Word (.doc)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & 25 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'bu-rumah-sakit') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 6 KPI RSBP', icon: LayoutDashboard },
        { id: 'keuangan', label: 'PNBP & Belanja (DS 2 & 12)', icon: TrendingUp },
        { id: 'kunjungan', label: 'Kunjungan Pasien (DS 5 & 6)', icon: Users },
        { id: 'efisiensi', label: 'Indikator Efisiensi / BOR (DS 9)', icon: Activity },
        { id: 'sewa', label: 'Sewa Ruangan Tenant (DS 14)', icon: Building2 },
        { id: 'penyakit_obat', label: 'Morbiditas & Obat (DS 4 & 17)', icon: Pill },
        { id: 'kpi_word_doc', label: 'Dokumen KPI & Word (.doc)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & 18 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'biro-hukum') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar 4 KPI & Summary', icon: LayoutDashboard },
        { id: 'kegiatan_perkara', label: 'Kegiatan Perkara (DS #4)', icon: Gavel },
        { id: 'komparasi_litigasi', label: 'Litigasi vs Non-Litigasi (DS #9 & #10)', icon: Scale },
        { id: 'jdihn_nasional', label: 'Penilaian JDIHN (Skor 100)', icon: Award },
        { id: 'pipeline_regulasi', label: 'Pipeline Regulasi (DS #5-#8)', icon: FolderOpen },
        { id: 'kajian_mitigasi', label: 'Kajian & Pendampingan JPN', icon: ShieldCheck },
        { id: 'kpi_word_doc', label: 'Dokumen Laporan Word (.doc)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & 10 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'dit-pengendalian-usaha') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar & 2 KPI', icon: LayoutDashboard },
        { id: 'rekomendasi', label: 'Visual Rekomendasi (DS #1)', icon: PieChart },
        { id: 'kpi_ds3_ds4', label: 'KPI % Evaluasi & Perbaikan (DS #3 & #4)', icon: ShieldCheck },
        { id: 'skema_kemitraan', label: 'Daftar Kontrak PKS', icon: Briefcase },
        { id: 'kpi_word_doc', label: 'Kamus KPI Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus 4 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'dit-bandara') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Bandara Hang Nadim', icon: LayoutDashboard },
        { id: 'kpi_pnbp_arus', label: 'KPI PNBP & Penerbangan (DS 1 & 2)', icon: Plane },
        { id: 'operator_maskapai', label: 'Operator & Tren Penumpang', icon: Users },
        { id: 'kpi_word_doc', label: 'Kamus KPI Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus 12 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'biro-sdm') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar SDM & 3 KPI', icon: LayoutDashboard },
        { id: 'sistem_merit', label: 'Sistem Merit (8 Aspek KASN)', icon: Award },
        { id: 'status_kepegawaian', label: 'Status Kepegawaian (DS #8)', icon: Users },
        { id: 'pendidikan', label: 'Tingkat Pendidikan (DS #9)', icon: GraduationCap },
        { id: 'kpi_word_doc', label: 'Laporan Word (.doc)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & 13 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'dit-pengendalian-lahan') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar & 4 KPI', icon: LayoutDashboard },
        { id: 'penertiban', label: 'Pipeline Penertiban (DS #2)', icon: AlertTriangle },
        { id: 'spasial', label: 'Pengawasan 5 SWP & Pesisir (DS #1)', icon: Compass },
        { id: 'rekomendasi', label: 'Rekomendasi & Dokumen (DS #3 & #4)', icon: FileCheck2 },
        { id: 'kpi_word_doc', label: 'Dokumen Word (.doc)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus 4 Dataset (PDF)', icon: FileCode2 },
      ];
    } else if (activeUnitId === 'biro-organisasi') {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Tata Kelola & 7 KPI', icon: LayoutDashboard },
        { id: 'sakip', label: 'SAKIP & Akuntabilitas (DS #2)', icon: Activity },
        { id: 'spip', label: 'Maturitas SPIP (DS #17)', icon: ShieldCheck },
        { id: 'pengaduan', label: 'Pengaduan & SKM (DS #10 & #11)', icon: MessageSquare },
        { id: 'blu', label: 'Penyelesaian BLU (DS #6 & #7)', icon: Award },
        { id: 'kpi_word_doc', label: 'Kamus KPI Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus 18 Dataset (PDF)', icon: FileCode2 },
      ];
    } else {
      return [
        { id: 'ikhtisar', label: 'Ikhtisar Unit', icon: Layers },
        { id: 'kpi_word_doc', label: 'Tabel Kamus KPI & Word (.docx)', icon: FileText, isSpecial: true },
        { id: 'kamus_rumus', label: 'Kamus Rumus & Katalog PDF', icon: FileCode2 },
        { id: 'designer', label: '+ Rancang Dashboard Unit Ini', icon: Sparkles, isSpecial: true },
      ];
    }
  };

  const subMenus = getSubMenus();

  return (
    <header className="shrink-0 z-30 font-sans select-none shadow-xs">
      {/* 1. TOP NAV BAR: EXECUTIVE COMMAND CENTER BP BATAM */}
      <div className="bg-[#0F1E36] text-white border-b border-[#16294a] px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
        {/* Left: Unit Selector & Command Center Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* BP Batam Command Center Emblem Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md bg-[#1F3864] border border-blue-400/40 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M12 2L4 5V11C4 16.5 7.5 21.5 12 23C16.5 21.5 20 16.5 20 11V5L12 2Z" fill="#2E75B6" stroke="#60A5FA" strokeWidth="1" />
                <circle cx="12" cy="11" r="3" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-[11px] tracking-wider text-slate-100 uppercase block leading-tight">
                EXECUTIVE COMMAND CENTER
              </span>
              <span className="text-[9px] text-sky-300 font-mono block">
                BP BATAM • APRIL 2026
              </span>
            </div>
          </div>

          <span className="text-slate-500 text-xs hidden sm:inline">|</span>

          {/* Unit Switcher Dropdown Button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenUnitsDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A3358] hover:bg-[#234575] text-white rounded-lg border border-blue-400/40 text-xs font-bold cursor-pointer transition-all shadow-xs"
              title="Ganti Unit Kerja (24 Unit)"
            >
              <span className={`w-2 h-2 rounded-full ${
                currentUnit.status === 'active'
                  ? 'bg-emerald-400 animate-pulse'
                  : currentUnit.status === 'on_progress'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-slate-400'
              }`} />
              <span className="font-mono text-sky-200">[{currentUnit.code}]</span>
              <span className="truncate max-w-[130px] sm:max-w-[220px]">{currentUnit.name}</span>
              {currentUnit.status === 'on_progress' && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 border border-amber-400/40 uppercase">
                  On Progress
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-sky-300" />
            </button>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          {/* 24 Units Directory Button */}
          <button
            onClick={onOpenUnitsDrawer}
            className="flex items-center gap-1.5 text-xs bg-[#162D4D] hover:bg-[#203D68] text-sky-200 px-3 py-1.5 rounded-lg border border-sky-500/30 font-semibold cursor-pointer transition-all shadow-xs"
            title={`Buka Direktori 24 Unit Kerja BP Batam (${activeUnitsCount} Aktif${onProgressUnitsCount > 0 ? `, ${onProgressUnitsCount} On Progress` : ''})`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>24 Unit Kerja</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/40">
              {activeUnitsCount} Aktif
            </span>
            {onProgressUnitsCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/40">
                {onProgressUnitsCount} On Progress
              </span>
            )}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg cursor-pointer transition-colors"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. SUB-TOOLBAR: REVERT, REFRESH, DOWNLOAD */}
      <div className="bg-slate-100/95 border-b border-slate-200 px-3 sm:px-4 py-1.5 flex items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-1 overflow-x-auto">
          {/* Revert Button */}
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md cursor-pointer text-xs font-semibold transition-all shadow-2xs"
            title="Kembalikan Tampilan Awal (Revert)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">Revert</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-md cursor-pointer text-xs font-semibold transition-all shadow-2xs"
            title="Perbarui Sumber Data (Refresh Data)"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />

          {/* Katalog Nama Visualisasi Button */}
          {onOpenVisualCatalog && (
            <button
              onClick={onOpenVisualCatalog}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 rounded-md cursor-pointer text-xs font-bold transition-all shadow-2xs"
              title="Daftar Nama Visualisasi di Setiap Informasi Seluruh Dashboard"
            >
              <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
              <span>Katalog Nama Visualisasi</span>
              <span className="hidden lg:inline text-[9.5px] bg-sky-700 text-white px-1.5 py-0.2 rounded font-mono">
                Semua Dashboard
              </span>
            </button>
          )}
        </div>

        {/* Right Action: Export / Download */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 bg-[#002B49] hover:bg-[#003d66] text-white px-3 py-1 font-bold text-xs rounded-md shadow-2xs cursor-pointer border border-[#001D3D] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>
        </div>
      </div>

      {/* 3. SUB-MENU SHEETS - DITIADAKAN UNTUK KEPALA BP, DEPUTI ADM KEUANGAN, DAN DEPUTI KEBIJAKAN STRATEGIS AGAR BERSIH */}
      {activeUnitId !== 'kepala-bp' && activeUnitId !== 'deputi-administrasi-keuangan' && activeUnitId !== 'deputi-kebijakan-strategis' && (
        <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center gap-1 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase text-slate-500 px-1.5 tracking-wider shrink-0 hidden md:inline font-mono">
            Sub Menu:
          </span>
          {subMenus.map((menu) => {
            const isActive = activeSheet === menu.id;
            const Icon = menu.icon;

            return (
              <button
                key={menu.id}
                onClick={() => onSelectSheet(menu.id)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? menu.isSpecial
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'bg-[#1F3864] text-white shadow-xs font-bold'
                    : menu.isSpecial
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : menu.isSpecial ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{menu.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

