import React from 'react';
import { Calendar, Download } from 'lucide-react';

export interface KepalaBpFilterState {
  periode: string; // e.g. '2026', '2025', '2024'
  klaster?: 'ALL' | 'Pimpinan' | 'Badan Usaha' | 'Direktorat' | 'Biro' | 'Pusat' | 'Satuan';
  statusCapaian?: 'ALL' | 'Tercapai' | 'On Track' | 'Perlu Perhatian';
  searchQuery?: string;
}

interface KepalaBpCompactFilterProps {
  filterState: KepalaBpFilterState;
  onFilterChange: (newFilter: Partial<KepalaBpFilterState>) => void;
  onResetFilter?: () => void;
  onExportCsv?: () => void;
  activeView?: string;
  onSelectView?: (view: string) => void;
}

export const KepalaBpCompactFilter: React.FC<KepalaBpCompactFilterProps> = ({
  filterState,
  onFilterChange,
  onExportCsv,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs px-3.5 py-2 transition-all">
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Hanya Filter Tahun */}
        <div className="flex items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A2540] text-amber-300 font-bold shrink-0 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span className="tracking-wide">FILTER TAHUN:</span>
          </div>

          <div className="relative">
            <select
              value={filterState.periode}
              onChange={(e) => onFilterChange({ periode: e.target.value })}
              aria-label="Filter Tahun Anggaran / Kinerja"
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
            >
              <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
              <option value="2025">Tahun Anggaran 2025</option>
              <option value="2024">Tahun Anggaran 2024</option>
              <option value="2023">Tahun Anggaran 2023</option>
            </select>
          </div>
          <span className="text-[11px] text-slate-600 italic hidden sm:inline">
            Menampilkan data penetapan Perkin &amp; capaian multi-indikator
          </span>
        </div>

        {/* Right Side: Ekspor Data */}
        {onExportCsv && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onExportCsv}
              className="px-3 py-1.5 rounded-lg bg-[#0A2540] text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Ekspor Data</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

