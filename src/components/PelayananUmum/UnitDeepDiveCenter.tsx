import React from 'react';
import {
  Stethoscope,
  Shield,
  Megaphone,
} from 'lucide-react';
import { DirektoratPengamananAsetVisualizer } from '../PengamananAset/DirektoratPengamananAsetVisualizer';
import { RumahSakitVisualizer } from '../RumahSakit/RumahSakitVisualizer';
import { DirektoratDiseminasiInformasiVisualizer } from './DirektoratDiseminasiInformasiVisualizer';

interface UnitDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (formulaId?: string) => void;
}

export const UnitDeepDiveCenter: React.FC<UnitDeepDiveCenterProps> = ({
  selectedUnitId,
  onSelectUnit,
  onNavigateToFullDashboard: _onNavigateToFullDashboard,
  onOpenFormulaModal: _onOpenFormulaModal,
}) => {
  // Normalize unit: 'dit-diseminasi' | 'bu-rumah-sakit' | 'dit-pam-aset'
  const activeUnit =
    selectedUnitId === 'bu-rumah-sakit' ||
    selectedUnitId === 'dit-pam-aset'
      ? selectedUnitId
      : 'dit-diseminasi';

  return (
    <div
      id="unit-deep-dive-section"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans"
    >
      {/* ================================================================== */}
      {/* 1. HEADER SECTION & UNIT TABS                                      */}
      {/* ================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Diseminasi Informasi, RSBP &amp; Ditpam
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 3 unit pengampu Perkin DEP-A6 (Dit. Diseminasi Informasi &amp; Hubungan Antar Lembaga, BU Rumah Sakit, Dit. Pengamanan Aset)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80 flex-wrap">
          <button
            type="button"
            onClick={() => onSelectUnit('dit-diseminasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-diseminasi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Dit. Diseminasi Informasi</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('bu-rumah-sakit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'bu-rumah-sakit'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>BU Rumah Sakit</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pam-aset')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-pam-aset'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Dit. Pengamanan Aset</span>
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. TAB CONTENT: DIT. DISEMINASI INFORMASI & HUBUNGAN ANTAR LEMBAGA */}
      {/* ================================================================== */}
      {activeUnit === 'dit-diseminasi' && (
        <DirektoratDiseminasiInformasiVisualizer />
      )}

      {/* ================================================================== */}
      {/* 3. TAB CONTENT: BU RUMAH SAKIT (RSBP BATAM) (10 KARTU VISUALISASI) */}
      {/* ================================================================== */}
      {activeUnit === 'bu-rumah-sakit' && (
        <RumahSakitVisualizer />
      )}

      {/* ================================================================== */}
      {/* 4. TAB CONTENT: DIREKTORAT PENGAMANAN ASET & KAWASAN (12 DATASET)   */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pam-aset' && (
        <DirektoratPengamananAsetVisualizer />
      )}
    </div>
  );
};
