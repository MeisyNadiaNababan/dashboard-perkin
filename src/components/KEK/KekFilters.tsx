import React from 'react';
import { Filter, RotateCcw, Building2, Calendar, DollarSign, Layers } from 'lucide-react';

interface KekFiltersProps {
  selectedKek: string;
  onChangeKek: (kek: string) => void;
  selectedQuarter: string;
  onChangeQuarter: (q: string) => void;
  selectedJenisInvestasi: string;
  onChangeJenisInvestasi: (j: string) => void;
  selectedYear: string;
  onChangeYear: (y: string) => void;
  onResetFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export const KekFilters: React.FC<KekFiltersProps> = ({
  selectedKek,
  onChangeKek,
  selectedQuarter,
  onChangeQuarter,
  selectedJenisInvestasi,
  onChangeJenisInvestasi,
  selectedYear,
  onChangeYear,
  onResetFilters,
  filteredCount,
  totalCount,
}) => {
  const isFiltered =
    selectedKek !== 'ALL' ||
    selectedQuarter !== 'ALL' ||
    selectedJenisInvestasi !== 'ALL' ||
    selectedYear !== '2025';

  return (
    <div
      id="kek-executive-filters"
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 text-xs font-sans"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Filter Header & Badges */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">
                Filter Parameter Dashboard KEK
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                {filteredCount} / {totalCount} Entri
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Direktorat Perencanaan dan Pengembangan Investasi • Realisasi Investasi &amp; Perizinan
            </p>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* 1. Filter KEK */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px] text-slate-500 font-semibold">Kawasan:</span>
            <select
              value={selectedKek}
              onChange={(e) => onChangeKek(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer text-xs"
            >
              <option value="ALL">Semua KEK (3 Kawasan)</option>
              <option value="KEK Nongsa">KEK Nongsa</option>
              <option value="KEK Batam Teknik">KEK Batam Teknik</option>
              <option value="KEK Pariwisata dan Kesehatan Internasional Batam">
                KEK Pariwisata &amp; Kesehatan
              </option>
            </select>
          </div>

          {/* 2. Filter Triwulan */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px] text-slate-500 font-semibold">Periode:</span>
            <select
              value={selectedQuarter}
              onChange={(e) => onChangeQuarter(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer text-xs"
            >
              <option value="ALL">Semua Triwulan (Q1 - Q4)</option>
              <option value="1">Triwulan I (Q1)</option>
              <option value="2">Triwulan II (Q2)</option>
              <option value="3">Triwulan III (Q3)</option>
              <option value="4">Triwulan IV (Q4)</option>
            </select>
          </div>

          {/* 3. Filter Jenis Investasi */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <DollarSign className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px] text-slate-500 font-semibold">Jenis:</span>
            <select
              value={selectedJenisInvestasi}
              onChange={(e) => onChangeJenisInvestasi(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer text-xs"
            >
              <option value="ALL">Semua (PMA &amp; PMDN)</option>
              <option value="PMA">PMA (Modal Asing)</option>
              <option value="PMDN">PMDN (Modal Dalam Negeri)</option>
            </select>
          </div>

          {/* 4. Filter Tahun */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 font-semibold">Tahun:</span>
            <select
              value={selectedYear}
              onChange={(e) => onChangeYear(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer text-xs"
            >
              <option value="2025">2025 (Data Resmi)</option>
              <option value="2026">2026 (Outlook)</option>
            </select>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Reset semua filter ke default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
