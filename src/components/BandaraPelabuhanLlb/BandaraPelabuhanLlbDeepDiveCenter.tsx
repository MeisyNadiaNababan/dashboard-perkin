import React from 'react';
import {
  Plane,
  Anchor,
  Building,
  Droplets,
} from 'lucide-react';
import { BadanUsahaPemanfaatanAsetVisualizer } from './BadanUsahaPemanfaatanAsetVisualizer';
import { SpamPengelolaanLimbahVisualizer } from './SpamPengelolaanLimbahVisualizer';
import { BadanPengelolaanKawasanBandaraDeepDive } from './BadanPengelolaanKawasanBandaraDeepDive';
import { BadanPengelolaanKepelabuhananDeepDive } from './BadanPengelolaanKepelabuhananDeepDive';

interface BandaraPelabuhanLlbDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbDeepDiveCenter: React.FC<
  BandaraPelabuhanLlbDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal: _onOpenFormulaModal = () => {},
  onNavigateToFullDashboard,
}) => {
  // Normalize active unit: 'dit-bandara' | 'dit-pelabuhan' | 'bu-pemanfaatan-aset' | 'bu-spam-limbah'
  const activeUnit =
    selectedUnitId === 'dit-pelabuhan' ||
    selectedUnitId === 'bu-pemanfaatan-aset' ||
    selectedUnitId === 'bu-spam-limbah'
      ? selectedUnitId
      : 'dit-bandara';

  return (
    <div
      id="bandara-pelabuhan-deep-dive-section"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans"
    >
      {/* ================================================================== */}
      {/* 1. HEADER SECTION & UNIT TABS (PERSIS MODEL DEP-A1)                 */}
      {/* ================================================================== */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Deputi Bidang Pengusahaan
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            Analisis granular 4 unit operasional pengampu Perkin DEP-A5 (Badan Pengelolaan Kawasan Bandar Udara, Badan Pengelolaan dan Pengusahaan Kepelabuhanan, BU Pemanfaatan Aset, BU SPAM &amp; Limbah)
          </p>
        </div>

        {/* 4 Unit Selection Tabs - Selalu sebaris (flex-nowrap) */}
        <div className="inline-flex flex-nowrap items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 overflow-x-auto max-w-full shrink-0">
          <button
            type="button"
            onClick={() => onSelectUnit('dit-bandara')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeUnit === 'dit-bandara'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Plane className="w-3.5 h-3.5 shrink-0" />
            <span>Badan Pengelolaan Kawasan Bandar Udara</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pelabuhan')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeUnit === 'dit-pelabuhan'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Anchor className="w-3.5 h-3.5 shrink-0" />
            <span>Badan Pengelolaan dan Pengusahaan Kepelabuhanan</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('bu-pemanfaatan-aset')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeUnit === 'bu-pemanfaatan-aset'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Building className="w-3.5 h-3.5 shrink-0" />
            <span>Badan Usaha Pemanfaatan Aset</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('bu-spam-limbah')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeUnit === 'bu-spam-limbah'
                ? 'bg-sky-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 shrink-0" />
            <span>BU SPAM &amp; Limbah</span>
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. TAB CONTENT: BADAN PENGELOLAAN KAWASAN BANDAR UDARA (HAL. 11-12) */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header          */}
      {/* ================================================================== */}
      {activeUnit === 'dit-bandara' && (
        <BadanPengelolaanKawasanBandaraDeepDive />
      )}


      {/* ================================================================== */}
      {/* 3. TAB CONTENT: BADAN PENGELOLAAN DAN PENGUSAHAAN KEPELABUHANAN     */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header          */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pelabuhan' && (
        <BadanPengelolaanKepelabuhananDeepDive />
      )}


      {/* ================================================================== */}
      {/* 3. TAB CONTENT: BADAN USAHA PEMANFAATAN ASET                      */}
      {/* ================================================================== */}
      {activeUnit === 'bu-pemanfaatan-aset' && (
        <BadanUsahaPemanfaatanAsetVisualizer />
      )}

      {/* ================================================================== */}
      {/* 4. TAB CONTENT: BADAN USAHA SPAM & PENGELOLAAN LIMBAH             */}
      {/* ================================================================== */}
      {activeUnit === 'bu-spam-limbah' && (
        <SpamPengelolaanLimbahVisualizer />
      )}
    </div>
  );
};

