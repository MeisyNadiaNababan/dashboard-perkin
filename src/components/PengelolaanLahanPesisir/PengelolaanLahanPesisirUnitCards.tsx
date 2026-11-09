import React from 'react';
import {
  Building2,
  MapPin,
  Anchor,
  ShieldCheck,
  Trees,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  Database,
  Layers,
} from 'lucide-react';
import { UNIT_PILAR_LAHAN, UnitPilarLahanItem } from './pengelolaanLahanPesisirData';

interface PengelolaanLahanPesisirUnitCardsProps {
  onAnalyzeUnit: (unitId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const PengelolaanLahanPesisirUnitCards: React.FC<
  PengelolaanLahanPesisirUnitCardsProps
> = ({ onAnalyzeUnit, onNavigateToUnit }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'dit-pertanahan':
      case 'dit-lahan':
        return <MapPin className="w-5 h-5 text-blue-600" />;
      case 'dit-pesisir-reklamasi':
        return <Anchor className="w-5 h-5 text-cyan-600" />;
      case 'dit-pengendalian-lahan':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'dit-lingkungan-hidup':
        return <Trees className="w-5 h-5 text-emerald-700" />;
      default:
        return <Building2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const getHeaderColor = (id: string) => {
    switch (id) {
      case 'dit-pertanahan':
      case 'dit-lahan':
        return 'border-t-4 border-t-blue-600';
      case 'dit-pesisir-reklamasi':
        return 'border-t-4 border-t-cyan-600';
      case 'dit-pengendalian-lahan':
        return 'border-t-4 border-t-emerald-600';
      case 'dit-lingkungan-hidup':
        return 'border-t-4 border-t-emerald-700';
      default:
        return 'border-t-4 border-t-slate-600';
    }
  };

  return (
    <div className="space-y-3">
      {/* Header Section 3 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 rounded-full bg-indigo-600" />
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>3 PILAR DIREKTORAT OPERASIONAL PELAKSANA</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
              KONSOLIDASI 23 DATASET SATU DATA
            </span>
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          DIPA Program: <span className="font-bold text-slate-700">Rp 92,50 Miliar</span> • Serapan Rata-Rata:{' '}
          <span className="font-bold text-emerald-600">39,8%</span>
        </div>
      </div>

      {/* 3 Directorates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {UNIT_PILAR_LAHAN.map((unit) => (
          <div
            key={unit.id}
            className={`bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${getHeaderColor(
              unit.id
            )}`}
          >
            <div className="space-y-3">
              {/* Unit Title Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(unit.id)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {unit.kode}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                      {unit.nama}
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 whitespace-nowrap">
                  {unit.jumlahDataset} DS
                </span>
              </div>

              {/* DIPA Budget & Realization Strip */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Alokasi Pagu DIPA:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {unit.paguFormatted}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Realisasi Belanja:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {(unit.realisasiDipa / 1000000000).toFixed(2)} M ({unit.persenSerapan}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${unit.persenSerapan}%` }}
                  />
                </div>
              </div>

              {/* 3 Highlights Metrics */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {unit.highlightMetrics.map((hm, idx) => (
                  <div key={idx} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <span className="text-[9px] text-slate-400 block truncate" title={hm.label}>
                      {hm.label}
                    </span>
                    <span className="text-xs font-black font-mono text-slate-800 block truncate">
                      {hm.value}
                    </span>
                    <span className="text-[8.5px] text-slate-500 block truncate" title={hm.subtext}>
                      {hm.subtext}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Capabilities Bullet Points */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Cakupan Dataset &amp; Output:
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {unit.keyCapabilities.slice(0, 3).map((cap, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold leading-none mt-0.5">•</span>
                      <span className="leading-tight line-clamp-1">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons: Analisis Deep-Dive & Full Dashboard */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onAnalyzeUnit(unit.id)}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Analisis Deep-Dive</span>
              </button>

              {onNavigateToUnit && (
                <button
                  onClick={() => onNavigateToUnit(unit.id)}
                  className="py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                  title="Buka Lembar Dashboard Mandiri Satker"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
