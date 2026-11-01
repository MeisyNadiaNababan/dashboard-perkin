import React, { useState } from 'react';
import {
  Compass,
  ShieldCheck,
  Layers,
  Scale,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Server,
  Network,
  Activity,
  FileText,
  DollarSign,
  MapPin,
  AlertTriangle,
  Flame,
  ThumbsUp,
  Users,
  MessageSquareQuote,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { PusatPerencanaanDeepDive } from './PusatPerencanaanDeepDive';
import { PusatHarmonisasiDeepDive } from './PusatHarmonisasiDeepDive';
import { PusatPtspDeepDive } from './PusatPtspDeepDive';
import { PusatPdsiDeepDive } from './PusatPdsiDeepDive';

interface KebijakanStrategisDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const KebijakanStrategisDeepDiveCenter: React.FC<
  KebijakanStrategisDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
}) => {
  // Unit tab: 4 units (Pusren, Harmonisasi, PDSI, PTSP)
  const activeUnit =
    selectedUnitId === 'pdsi' || selectedUnitId === 'pusat-pdsi' || selectedUnitId === 'pusat-data-dan-sistem-informasi'
      ? 'pdsi'
      : selectedUnitId === 'ptsp' || selectedUnitId === 'pusat-ptsp'
      ? 'ptsp'
      : selectedUnitId === 'pusat-harmonisasi' || selectedUnitId === 'harmonisasi'
      ? 'harmonisasi'
      : 'pusren';


  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans">
      {/* 1. Header with Tab Switcher for 4 Units (Pusren, Harmonisasi, PDSI, PTSP) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Kebijakan Strategis &amp; Perizinan
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 4 unit kerja pengampu Perkin DEP-A2 (Pusat Perencanaan Program, Harmonisasi Kebijakan, PDSI, PTSP)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            onClick={() => onSelectUnit('pusat-perencanaan-program')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'pusren'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pusren</span>
          </button>

          <button
            onClick={() => onSelectUnit('pusat-harmonisasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'harmonisasi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Harmonisasi</span>
          </button>

          <button
            onClick={() => onSelectUnit('pdsi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'pdsi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PDSI</span>
          </button>

          <button
            onClick={() => onSelectUnit('ptsp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'ptsp'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>PTSP</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TAB KONTEN 1: PUSREN (PUSAT PERENCANAAN PROGRAM STRATEGIS)        */}
      {/* ==================================================================== */}
      {activeUnit === 'pusren' && (
        <PusatPerencanaanDeepDive />
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN 2: PUSAT HARMONISASI KEBIJAKAN STRATEGIS (PHKS)        */}
      {/* ==================================================================== */}
      {activeUnit === 'harmonisasi' && (
        <PusatHarmonisasiDeepDive />
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN 3: PUSAT DATA DAN SISTEM INFORMASI (PDSI)              */}
      {/* ==================================================================== */}
      {activeUnit === 'pdsi' && (
        <PusatPdsiDeepDive />
      )}

      {/* ==================================================================== */}
      {/* 4. TAB KONTEN 4: PTSP (PUSAT PELAYANAN TERPADU SATU PINTU)            */}
      {/* ==================================================================== */}
      {activeUnit === 'ptsp' && (
        <PusatPtspDeepDive />
      )}
    </div>
  );
};
