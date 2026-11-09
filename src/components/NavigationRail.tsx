import React from 'react';
import {
  Building2,
  Server,
  Users,
  Scale,
  ShieldAlert,
  Building,
  ClipboardCheck,
  Compass,
  CheckSquare,
  Target,
  MapPin,
  ShieldCheck,
  Truck,
  PieChart,
  Plane,
  Anchor,
  Briefcase,
  Ship,
  Shield,
  TrendingUp,
  HardHat,
  DraftingCompass,
  Stethoscope,
  Droplets,
  Layers,
  Search,
  CheckCircle2,
  Award
} from 'lucide-react';
import { BP_BATAM_24_UNITS, BpBatamUnit } from '../data/bpBatamUnits';

interface NavigationRailProps {
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenUnitsDrawer: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Award,
  Building2,
  Server,
  Users,
  Scale,
  ShieldAlert,
  Building,
  ClipboardCheck,
  Compass,
  CheckSquare,
  Target,
  MapPin,
  ShieldCheck,
  Truck,
  PieChart,
  Plane,
  Anchor,
  Briefcase,
  Ship,
  Shield,
  TrendingUp,
  HardHat,
  DraftingCompass,
  Stethoscope,
  Droplets,
};

export const NavigationRail: React.FC<NavigationRailProps> = ({
  activeUnitId,
  onSelectUnit,
  onOpenUnitsDrawer,
}) => {
  const activeCount = BP_BATAM_24_UNITS.filter((u) => u.status === 'active').length;
  const onProgressCount = BP_BATAM_24_UNITS.filter((u) => u.status === 'on_progress').length;

  return (
    <nav
      id="bp-batam-left-rail"
      aria-label="Direktori Dashboard Pimpinan & Deputi BP Batam"
      className="w-16 bg-[#0B1728] border-r border-[#152744] flex flex-col items-center py-2.5 z-40 shrink-0 select-none transition-all h-full"
    >
      {/* 1. BP BATAM LOGO EMBLEM */}
      <button
        onClick={onOpenUnitsDrawer}
        title="Buka Direktori Dashboard Pimpinan & Deputi BP Batam"
        className="w-11 h-11 mb-2.5 rounded-xl bg-[#091526] hover:bg-[#132742] border border-[#1f3864] flex flex-col items-center justify-center cursor-pointer transition-all shadow-md group relative shrink-0"
      >
        {/* Authentic BP Batam Shield / Emblem SVG */}
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
            {/* Outer Shield */}
            <path
              d="M16 2L5 6V14C5 21.5 9.8 28.2 16 30C22.2 28.2 27 21.5 27 14V6L16 2Z"
              fill="#002B49"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            {/* Inner Emblem Core */}
            <path
              d="M16 6L9 9V14C9 19 12.1 23.6 16 25C19.9 23.6 23 19 23 14V9L16 6Z"
              fill="#1F3864"
            />
            {/* Gear / Lighthouse Center */}
            <circle cx="16" cy="14" r="3.5" fill="#38BDF8" />
            <path d="M16 8V10M16 18V20M10 14H12M20 14H22" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
        </div>
        <span className="text-[7.5px] font-bold tracking-wider text-sky-200 mt-0.5 uppercase">
          BP BATAM
        </span>

        {/* Hover Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs font-semibold whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Direktori Dashboard Pimpinan &amp; Deputi</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block">{activeCount} Dashboard Aktif</span>
          {onProgressCount > 0 && (
            <span className="text-[10px] text-amber-400 font-bold block">{onProgressCount} Unit On Progress</span>
          )}
        </div>
      </button>

      {/* 2. 8 EXECUTIVE DASHBOARDS DIRECTORY BUTTON */}
      <button
        onClick={onOpenUnitsDrawer}
        className="w-11 h-11 mb-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative group bg-[#132742] hover:bg-[#1a3559] border border-[#2a4d7d] text-sky-300 shrink-0"
        title={`Buka Direktori Dashboard Pimpinan & Deputi BP Batam (${activeCount} Aktif)`}
      >
        <Layers className="w-4 h-4 text-sky-300" />
        <span className="text-[7.5px] font-bold text-sky-200 mt-0.5">8 UNIT</span>

        {/* Notification / Count badge */}
        <span className="absolute -top-1 -right-1 px-1 min-w-[17px] h-4 rounded-full bg-emerald-500 text-white font-mono text-[8.5px] font-extrabold flex items-center justify-center shadow-xs" title={`${activeCount} Dashboard Aktif Siap Pakai`}>
          {activeCount}
        </span>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs font-semibold whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="font-bold text-sky-300">Direktori Dashboard Pimpinan &amp; Deputi</div>
          <div className="text-[10px] text-emerald-400 font-bold">{activeCount} Dashboard Aktif</div>
          <div className="text-[9.5px] text-slate-300">Kepala BP Batam &amp; Deputi A1 - A7</div>
        </div>
      </button>

      <div className="w-8 h-px bg-[#1a3052] mb-1.5 shrink-0" />

      {/* 3. SCROLLABLE DIRECTORY OF EXECUTIVE DASHBOARDS */}
      <div
        className="flex-1 w-full flex flex-col items-center space-y-1.5 overflow-y-auto px-1 py-1 no-scrollbar"
        title="Pilih Dashboard Kepala BP & Deputi A1-A7"
      >
        {BP_BATAM_24_UNITS.map((unit) => {
          const IconComponent = ICON_MAP[unit.iconName] || Building2;
          const isActive = activeUnitId === unit.id;
          const isReady = unit.status === 'active';
          const isOnProgress = unit.status === 'on_progress';

          return (
            <div key={unit.id} className="relative group flex items-center shrink-0">
              <button
                onClick={() => onSelectUnit(unit.id)}
                className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative ${
                  isActive
                    ? 'bg-[#1E40AF] text-white shadow-md ring-2 ring-sky-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-[#132742]'
                }`}
                title={unit.name}
              >
                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <span className="absolute -left-1 top-2 bottom-2 w-1 rounded-r-full bg-sky-400 shadow-xs" />
                )}

                <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                <span className="text-[7.5px] font-semibold truncate max-w-[42px] mt-0.5 tracking-tight font-mono">
                  {unit.code}
                </span>

                {/* Status Dot for Active / On Progress Dashboard */}
                {isReady && !isActive && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-[#0B1728]" />
                )}
                {isOnProgress && !isActive && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 ring-1 ring-[#0B1728] animate-pulse" />
                )}
              </button>

              {/* Tooltip on Hover */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-[#0F1E36] text-white text-xs whitespace-nowrap rounded-lg border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 min-w-[210px]">
                <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-1 mb-1">
                  <span className="text-[9.5px] font-bold text-sky-400 uppercase tracking-wider font-mono">
                    [{unit.code}] {unit.category}
                  </span>
                  {isReady ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Aktif
                    </span>
                  ) : isOnProgress ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      On Progress
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      Siap Rancang
                    </span>
                  )}
                </div>
                <div className="font-bold text-slate-100 text-xs leading-tight mb-1">
                  {unit.name}
                </div>
                <div className="text-[10.5px] text-slate-400 flex items-center gap-2">
                  <span>{unit.itemCount} Indikator / Dataset</span>
                  <span>•</span>
                  <span className="text-sky-300 font-mono text-[10px]">{unit.pdfPages}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-8 h-px bg-[#1a3052] my-1.5 shrink-0" />

      {/* 4. FOOTER: BROWSE ALL 24 UNITS DRAWER TOGGLE */}
      <button
        onClick={onOpenUnitsDrawer}
        className="w-11 h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative group text-slate-400 hover:text-white hover:bg-[#132742] shrink-0"
        title="Buka Pencarian &amp; Direktori 24 Unit Kerja BP Batam"
      >
        <Search className="w-4 h-4 text-slate-300 group-hover:text-sky-300" />
        <span className="text-[7.5px] font-semibold text-slate-300 group-hover:text-white mt-0.5">CARI</span>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0F1E36] text-white text-xs whitespace-nowrap rounded-md border border-slate-700 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          <div className="font-bold text-sky-300">Pencarian Unit Kerja</div>
          <div className="text-[10px] text-slate-300">Cari dari 24 Unit Kerja BP Batam</div>
        </div>
      </button>
    </nav>
  );
};
