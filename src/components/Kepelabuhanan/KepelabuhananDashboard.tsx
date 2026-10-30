import React, { useState } from 'react';
import {
  Ship,
  Anchor,
  DollarSign,
  CreditCard,
  Users,
  Box,
  Layers,
  FileText,
  BookOpen,
  Sparkles,
  BarChart3,
  TrendingUp,
  Globe2,
  PieChart as PieChartIcon,
  HelpCircle,
  Compass,
} from 'lucide-react';
import { PelabuhanFilters, PelabuhanFilterState } from './PelabuhanFilters';
import { PelabuhanKpiRow } from './PelabuhanKpiRow';
import { PelabuhanPnbpCoaCard } from './PelabuhanPnbpCoaCard';
import { PelabuhanBelanjaCoaCard } from './PelabuhanBelanjaCoaCard';
import { PelabuhanDermagaPeruntukanCard } from './PelabuhanDermagaPeruntukanCard';
import { PelabuhanKunjunganKapalSheetSwap } from './PelabuhanKunjunganKapalSheetSwap';
import { PelabuhanArusBarangSheetSwap } from './PelabuhanArusBarangSheetSwap';
import { PelabuhanBongkarMuatPieCard } from './PelabuhanBongkarMuatPieCard';
import { PelabuhanPenumpangArusCard } from './PelabuhanPenumpangArusCard';
import { PelabuhanKamusRumusView } from './PelabuhanKamusRumusView';
import { PelabuhanKpiWordDocView } from './PelabuhanKpiWordDocView';

interface KepelabuhananDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const KepelabuhananDashboard: React.FC<KepelabuhananDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
}) => {
  const [internalTab, setInternalTab] = useState<string>(activeSubTab || 'ikhtisar');

  const [filters, setFilters] = useState<PelabuhanFilterState>({
    tahun: 2026,
    bulan: 'ALL',
    pelabuhan: 'ALL',
    jenisPelayaran: 'ALL',
    kategoriOperasional: 'ALL',
  });

  const handleFilterChange = (newFilters: Partial<PelabuhanFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      tahun: 2026,
      bulan: 'ALL',
      pelabuhan: 'ALL',
      jenisPelayaran: 'ALL',
      kategoriOperasional: 'ALL',
    });
  };

  // Quick navigation subtabs
  const subTabs = [
    { id: 'ikhtisar', label: 'Ikhtisar Lengkap (Satu Data)', icon: Sparkles },
    { id: 'pnbp', label: '1. PNBP COA & Satker', icon: DollarSign },
    { id: 'belanja', label: '2. Belanja COA & Pagu', icon: CreditCard },
    { id: 'dermaga', label: '3. Daftar Dermaga & Peruntukan', icon: Anchor },
    { id: 'kunjungan', label: '4. Kunjungan Kapal (Sheet Swap)', icon: Ship },
    { id: 'arus-barang', label: '5. Tonase Barang Negara (Sheet Swap)', icon: Globe2 },
    { id: 'bongkar-muat', label: '6. Pelayanan Bongkar Muat (Pie Chart)', icon: PieChartIcon },
    { id: 'penumpang', label: '7. Penumpang Dom & Int', icon: Users },
    { id: 'kamus_rumus', label: 'Kamus KPI & Rumus', icon: BookOpen },
    { id: 'kpi_word_doc', label: 'Dokumen Word Resmi', icon: FileText },
  ];

  const currentTab = activeSubTab !== 'ikhtisar' && activeSubTab ? activeSubTab : internalTab;

  // Render specific subtab views if selected
  if (currentTab === 'kpi_word_doc') {
    return <PelabuhanKpiWordDocView />;
  }

  if (currentTab === 'kamus_rumus') {
    return <PelabuhanKamusRumusView />;
  }

  return (
    <div id="kepelabuhanan-dashboard" className="space-y-4 font-sans">
      {/* 1. Header Banner Satu Data Kepelabuhanan */}
      <div className="bg-gradient-to-r from-[#0B1E36] via-[#122B4D] to-[#1E3A8A] text-white p-4 rounded-xl shadow-xs border border-blue-900/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 font-mono text-[10.5px] font-bold border border-blue-400/30 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5" />
                Badan Pengelolaan dan Pengusahaan Kepelabuhanan BP Batam
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono">
                Buku Satu Data Hal. 14 - 17
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
              Executive Dashboard Kepelabuhanan Batam
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Monitoring terpadu operasional maritim: realisasi PNBP &amp; belanja COA, fasilitas dermaga, 
              kunjungan kapal barang/penumpang, arus tonase internasional, produktivitas bongkar muat terminal, dan pergerakan penumpang ferry.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('kpi-pnbp-pelabuhan')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-300" />
              <span>Kamus Rumus</span>
            </button>
            <button
              onClick={() => setInternalTab('kpi_word_doc')}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dokumen KPI</span>
            </button>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pt-3 mt-3 border-t border-blue-800/60 no-scrollbar">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setInternalTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Executive Filter Panel */}
      <PelabuhanFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 3. Mandated KPI BANs Row (REQ 8: TETAP JANGAN DIHAPUS, REQ 9: NAMA VISUALISASI + ATRIBUT) */}
      <PelabuhanKpiRow
        realisasiPnbpMiliar={428.5}
        targetPnbpMiliar={480.0}
        realisasiBelanjaMiliar={184.25}
        paguBelanjaMiliar={215.0}
        nilaiIkm={88.4}
        totalPenumpangJuta={7.43}
        totalPenumpangDatangJuta={3.68}
        totalPenumpangBerangkatJuta={3.75}
        jumlahDermaga={24}
        borPersen={64.8}
        totalCallKapal={48650}
        callBarang={16240}
        callPenumpang={32410}
        onExplainKpi={onOpenFormulaModal}
      />

      {/* 4. VISUALISASI UTAMA KEPELABUHANAN (REQS 1 TO 7) */}
      {currentTab === 'ikhtisar' && (
        <div className="space-y-4">
          {/* SECTION A: KEUANGAN (PNBP & BELANJA COA) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Req 1: Realisasi PNBP Kepelabuhanan (COA/Jenis Layanan, Terminal/Satker, Jumlah) */}
            <PelabuhanPnbpCoaCard onOpenFormulaModal={onOpenFormulaModal} />

            {/* Req 2: Realisasi Belanja Kepelabuhanan (COA, Jumlah) */}
            <PelabuhanBelanjaCoaCard onOpenFormulaModal={onOpenFormulaModal} />
          </div>

          {/* SECTION B: FASILITAS DERMAGA & PERUNTUKAN */}
          {/* Req 3: Daftar Dermaga (Pelabuhan, Peruntukan) */}
          <PelabuhanDermagaPeruntukanCard onOpenFormulaModal={onOpenFormulaModal} />

          {/* SECTION C: KUNJUNGAN KAPAL (SHEET SWAP) */}
          {/* Req 4: Kunjungan Kapal Barang & Penumpang (Sheet Swap: Tren Bulanan vs Tabel Detail) */}
          <PelabuhanKunjunganKapalSheetSwap onOpenFormulaModal={onOpenFormulaModal} />

          {/* SECTION D: ARUS TONASE BARANG NEGARA (SHEET SWAP) */}
          {/* Req 5: Tonase Barang Masuk/Keluar per Negara (Sheet Swap: Total Negara Asal vs Tabel Detail Ringkas) */}
          <PelabuhanArusBarangSheetSwap onOpenFormulaModal={onOpenFormulaModal} />

          {/* SECTION E: OPERASIONAL BONGKAR MUAT & PENUMPANG */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Req 6: Pelayanan Bongkar Muat Terminal Peti Kemas Batu Ampar & Curah (Pie Chart) */}
            <PelabuhanBongkarMuatPieCard onOpenFormulaModal={onOpenFormulaModal} />

            {/* Req 7: Penumpang Pelabuhan Domestik dan Internasional (Kedatangan & Keberangkatan) */}
            <PelabuhanPenumpangArusCard onOpenFormulaModal={onOpenFormulaModal} />
          </div>
        </div>
      )}

      {/* SINGLE SUBTAB VIEWS */}
      {currentTab === 'pnbp' && (
        <PelabuhanPnbpCoaCard onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {currentTab === 'belanja' && (
        <PelabuhanBelanjaCoaCard onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {currentTab === 'dermaga' && (
        <PelabuhanDermagaPeruntukanCard onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {currentTab === 'kunjungan' && (
        <PelabuhanKunjunganKapalSheetSwap onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {currentTab === 'arus-barang' && (
        <PelabuhanArusBarangSheetSwap onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {currentTab === 'bongkar-muat' && (
        <PelabuhanBongkarMuatPieCard onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {currentTab === 'penumpang' && (
        <PelabuhanPenumpangArusCard onOpenFormulaModal={onOpenFormulaModal} />
      )}
    </div>
  );
};
