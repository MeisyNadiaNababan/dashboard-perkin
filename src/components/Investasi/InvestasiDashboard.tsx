import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Download,
  Share2,
  Calendar,
  Layers,
  FileSpreadsheet,
  Globe2,
  Building2,
  Megaphone,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import {
  REALISASI_INVESTASI_DATA,
  WEBSITE_VISIT_DATA,
  MINAT_INVESTASI_DATA,
  INFRASTRUKTUR_DATA,
  KEGIATAN_PROMOSI_DATA,
} from '../../data/investasiData';
import { InvestasiKpiRow } from './InvestasiKpiRow';
import { InvestasiRealisasiCard } from './InvestasiRealisasiCard';
import { InvestasiSektorMinatCard } from './InvestasiSektorMinatCard';
import { InvestasiInfrastrukturCard } from './InvestasiInfrastrukturCard';
import { InvestasiWebsiteTrafficCard } from './InvestasiWebsiteTrafficCard';
import { InvestasiPromosiCard } from './InvestasiPromosiCard';
import { InvestasiFilters, InvestasiFilterState } from './InvestasiFilters';
import { InvestasiKamusRumusView } from './InvestasiKamusRumusView';
import { DirektoratPromosiInvestasiDeepDive } from '../InvestasiPengusahaan/DirektoratPromosiInvestasiDeepDive';

interface InvestasiDashboardProps {
  onOpenFormulaModal: (formulaId: string) => void;
  activeSubMenu?: string;
  onSubMenuChange?: (menuId: string) => void;
}

export const InvestasiDashboard: React.FC<InvestasiDashboardProps> = ({
  onOpenFormulaModal,
  activeSubMenu = 'ikhtisar',
  onSubMenuChange,
}) => {
  // Global Filters State
  const [filters, setFilters] = useState<InvestasiFilterState>({
    tahun: 2025,
    triwulan: 'ALL',
    jenisInvestasi: 'ALL',
    sektor: 'ALL',
  });

  const handleResetFilters = () => {
    setFilters({
      tahun: 2025,
      triwulan: 'ALL',
      jenisInvestasi: 'ALL',
      sektor: 'ALL',
    });
  };

  // 1. Filter data realisasi investasi
  const filteredInvestasi = useMemo(() => {
    return REALISASI_INVESTASI_DATA.filter((item) => {
      const matchTahun = filters.tahun === 'ALL' || item.tahun === filters.tahun;
      const matchTriwulan = filters.triwulan === 'ALL' || item.triwulan === filters.triwulan;
      const matchJenis = filters.jenisInvestasi === 'ALL' || item.jenis === filters.jenisInvestasi;
      const matchSektor = filters.sektor === 'ALL' || item.sektor === filters.sektor;
      return matchTahun && matchTriwulan && matchJenis && matchSektor;
    });
  }, [filters]);

  // Agregasi KPI 1: Realisasi Investasi, Target, dan % Capaian
  const totalRealisasi = useMemo(() => {
    return filteredInvestasi.reduce((sum, item) => sum + item.realisasiInvestasi, 0);
  }, [filteredInvestasi]);

  const totalTarget = useMemo(() => {
    return filteredInvestasi.reduce((sum, item) => sum + item.targetInvestasi, 0);
  }, [filteredInvestasi]);

  const capaianInvestasiPersen = useMemo(() => {
    if (totalTarget === 0) return 0;
    return (totalRealisasi / totalTarget) * 100;
  }, [totalRealisasi, totalTarget]);

  // Agregasi KPI 2: Kunjungan Website Invest In-Batam (Dataset 10)
  const totalKunjunganWebsite = useMemo(() => {
    return WEBSITE_VISIT_DATA.reduce((sum, item) => sum + item.kunjunganTotal, 0);
  }, []);

  // Agregasi KPI 3: Minat Investasi Hasil Kunjungan dan Pameran (Dataset 14)
  const filteredMinatList = useMemo(() => {
    return MINAT_INVESTASI_DATA.filter((item) => {
      const matchSektor = filters.sektor === 'ALL' || item.sektor.includes(filters.sektor) || filters.sektor.includes(item.sektor);
      const matchJenis =
        filters.jenisInvestasi === 'ALL' ||
        (filters.jenisInvestasi === 'PMA' && item.kategoriAsal === 'Luar Negeri') ||
        (filters.jenisInvestasi === 'PMDN' && item.kategoriAsal === 'Dalam Negeri');
      return matchSektor && matchJenis;
    });
  }, [filters]);

  const totalMinatInvestasi = filteredMinatList.length;
  const totalNilaiMinatInvestasi = useMemo(() => {
    return filteredMinatList.reduce((sum, item) => sum + item.nilaiMinatInvestasi, 0);
  }, [filteredMinatList]);

  // Ekspor Seluruh Ringkasan
  const handleExportFullCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'DIREKTORAT INVESTASI BP BATAM - EXECUTIVE SUMMARY\n\n';
    csvContent += `Total Realisasi Investasi,${totalRealisasi}\n`;
    csvContent += `Total Target Investasi,${totalTarget}\n`;
    csvContent += `% Capaian Investasi,${capaianInvestasiPersen.toFixed(2)}%\n`;
    csvContent += `Total Kunjungan Website,${totalKunjunganWebsite}\n`;
    csvContent += `Total Calon Investor (LoI),${totalMinatInvestasi}\n`;
    csvContent += `Total Potensi Nilai Minat,${totalNilaiMinatInvestasi}\n\n`;

    csvContent += 'RINCIAN REALISASI INVESTASI (DATASET 13)\n';
    csvContent += 'Tahun,Triwulan,Jenis,Sektor,Negara Asal,Target (Rp),Realisasi (Rp),Proyek,Naker\n';
    filteredInvestasi.forEach((r) => {
      csvContent += `${r.tahun},Q${r.triwulan},${r.jenis},"${r.sektor}","${r.negaraAsal}",${r.targetInvestasi},${r.realisasiInvestasi},${r.jumlahProyek},${r.penyerapanNaker}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ringkasan_eksekutif_direktorat_investasi.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* 1. Header Bar Top Navigation & Actions */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-emerald-600 text-white tracking-wider">
              DIT-INVESTASI
            </span>
            <span className="text-xs font-semibold text-slate-500 font-mono">
              Unit Kerja #14 • BP Batam
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-1">
            Dashboard Direktorat Promosi dan Fasilitasi Investasi
          </h1>
          <p className="text-xs text-slate-500">
            Monitoring Realisasi PMA/PMDN (Dataset 13), Traffic Portal Invest In-Batam (Dataset 10), Minat Pameran (Dataset 14), dan Pipeline Infrastruktur (Dataset 6)
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleExportFullCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Unduh seluruh data dashboard dalam format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor Ringkasan</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Menu Quick Navigation Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 px-3 py-2 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSubMenuChange && onSubMenuChange('visualisasi_unit')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'visualisasi_unit'
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'text-blue-700 bg-blue-50/70 hover:bg-blue-100 hover:text-blue-900 border border-blue-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Dashboard Visualisasi Unit (6 Kartu)</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('ikhtisar')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'ikhtisar'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Ikhtisar Eksekutif</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('realisasi')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'realisasi'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Realisasi Investasi (Dataset 13)</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('sektor_minat')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'sektor_minat'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Sektor Minat Investasi</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('infrastruktur')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'infrastruktur'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Infrastruktur Batam</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('website_traffic')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'website_traffic'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Traffic Website In-Batam</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('promosi')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'promosi'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Tentatif Kegiatan Promosi</span>
          </button>

          <button
            onClick={() => onSubMenuChange && onSubMenuChange('kamus_rumus')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubMenu === 'kamus_rumus'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Kamus Rumus &amp; Satu Data</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 hidden lg:block">
          Satu Data BP Batam • Updated 2025/2026
        </div>
      </div>

      {/* 3. Filter Bar (Item 8: Filter yang cocok untuk Dit Investasi) */}
      {activeSubMenu !== 'kamus_rumus' && (
        <InvestasiFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          totalFilteredRecords={filteredInvestasi.length + filteredMinatList.length}
        />
      )}

      {/* 4. VIEW ROUTING BERDASARKAN SUB-MENU */}
      {activeSubMenu === 'kamus_rumus' ? (
        <InvestasiKamusRumusView />
      ) : activeSubMenu === 'realisasi' ? (
        <div className="space-y-4">
          <InvestasiKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalKunjunganWebsite={totalKunjunganWebsite}
            totalMinatInvestasi={totalMinatInvestasi}
            totalNilaiMinatInvestasi={totalNilaiMinatInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <InvestasiRealisasiCard
            onOpenFormulaModal={onOpenFormulaModal}
            filterTahun={filters.tahun}
            filterJenis={filters.jenisInvestasi}
            filterSektor={filters.sektor}
          />
        </div>
      ) : activeSubMenu === 'sektor_minat' ? (
        <div className="space-y-4">
          <InvestasiKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalKunjunganWebsite={totalKunjunganWebsite}
            totalMinatInvestasi={totalMinatInvestasi}
            totalNilaiMinatInvestasi={totalNilaiMinatInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <InvestasiSektorMinatCard
            minatList={filteredMinatList}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : activeSubMenu === 'infrastruktur' ? (
        <div className="space-y-4">
          <InvestasiKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalKunjunganWebsite={totalKunjunganWebsite}
            totalMinatInvestasi={totalMinatInvestasi}
            totalNilaiMinatInvestasi={totalNilaiMinatInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <InvestasiInfrastrukturCard
            onOpenFormulaModal={onOpenFormulaModal}
            filterYear={filters.tahun}
          />
        </div>
      ) : activeSubMenu === 'website_traffic' ? (
        <div className="space-y-4">
          <InvestasiKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalKunjunganWebsite={totalKunjunganWebsite}
            totalMinatInvestasi={totalMinatInvestasi}
            totalNilaiMinatInvestasi={totalNilaiMinatInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <InvestasiWebsiteTrafficCard
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : activeSubMenu === 'promosi' ? (
        <div className="space-y-4">
          <InvestasiKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalKunjunganWebsite={totalKunjunganWebsite}
            totalMinatInvestasi={totalMinatInvestasi}
            totalNilaiMinatInvestasi={totalNilaiMinatInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <InvestasiPromosiCard
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : (
        /* DEFAULT EXECUTIVE VIEW: ALL REQUESTED COMPONENTS */
        <div className="space-y-4">
          {/* A. 3 KPI ROW CARDS (Realisasi Investasi, Kunjungan Website, Minat Investasi) */}
          <section id="investasi-kpi-cards" aria-label="KPI Direktorat Investasi">
            <InvestasiKpiRow
              totalRealisasiInvestasi={totalRealisasi}
              totalTargetInvestasi={totalTarget}
              capaianInvestasiPersen={capaianInvestasiPersen}
              totalKunjunganWebsite={totalKunjunganWebsite}
              totalMinatInvestasi={totalMinatInvestasi}
              totalNilaiMinatInvestasi={totalNilaiMinatInvestasi}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* B. REALISASI INVESTASI DI KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS (Dataset 13) */}
          <section id="investasi-realisasi-section" aria-label="Realisasi Investasi KPBPBB">
            <InvestasiRealisasiCard
              onOpenFormulaModal={onOpenFormulaModal}
              filterTahun={filters.tahun}
              filterJenis={filters.jenisInvestasi}
              filterSektor={filters.sektor}
            />
          </section>

          {/* C. INFRASTRUKTUR YANG AKAN DIBANGUN DI BATAM (Dataset 6: Nama Project, Lokasi, Nilai Investasi) */}
          <section id="investasi-infrastruktur-section" aria-label="Infrastruktur yang Akan Dibangun">
            <InvestasiInfrastrukturCard
              onOpenFormulaModal={onOpenFormulaModal}
              filterYear={filters.tahun}
            />
          </section>

          {/* D. TRAFFIC WEBSITE INVEST IN-BATAM DARI TAHUN KE TAHUN (Dataset 10) */}
          <section id="investasi-website-traffic-section" aria-label="Traffic Website Invest In-Batam dari Tahun ke Tahun">
            <InvestasiWebsiteTrafficCard
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* E. DATA MINAT INVESTASI BERDASARKAN SEKTOR & TABEL MATRIKS PERUSAHAAN (Dataset 14) */}
          <section id="investasi-sektor-minat-section" aria-label="Minat Investasi Berdasarkan Sektor">
            <InvestasiSektorMinatCard
              minatList={filteredMinatList}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* F. TENTATIF KEGIATAN PROMOSI (Kategori Kegiatan, Jumlah Tamu, Pelaksanaan) */}
          <section id="investasi-promosi-section" aria-label="Tentatif Kegiatan Promosi">
            <InvestasiPromosiCard
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>
        </div>
      )}
    </div>
  );
};
