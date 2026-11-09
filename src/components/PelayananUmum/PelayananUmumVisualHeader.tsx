import React from 'react';
import {
  ShieldCheck,
  Building2,
  Stethoscope,
  Shield,
  Megaphone,
  Layers,
  FileCode2,
  Download,
  Database,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { PERKIN_A6_METADATA } from './pelayananUmumData';

interface VisualHeaderProps {
  onOpenFormulaModal: () => void;
  onOpenExportModal?: () => void;
  onSelectSubView: (view: 'ikhtisar' | 'finansial' | 'operasional' | 'deep_dive' | 'satu_data') => void;
  currentSubView: string;
}

export const PelayananUmumVisualHeader: React.FC<VisualHeaderProps> = ({
  onOpenFormulaModal,
  onOpenExportModal,
  onSelectSubView,
  currentSubView,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#002B49] via-[#0A3D62] to-[#1E3A8A] text-white rounded-xl shadow-lg border border-slate-700/40 p-4 sm:p-5 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side: Breadcrumb & Title */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider">
            <span>Dashboard Eksekutif</span>
            <span>&rsaquo;</span>
            <span className="text-white bg-blue-500/30 px-2 py-0.5 rounded font-mono">DASHBOARD DEPUTI</span>
            <span>&rsaquo;</span>
            <span className="text-emerald-300 font-mono">PERKIN A6</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <span>DASHBOARD DEPUTI PELAYANAN UMUM</span>
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Perkin No. 6 /KA/ 3 /2025
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Pusat Komando Eksekutif Perkin A6 berbasis 3 Indikator Kinerja Program resmi: <strong className="text-white">1. Peningkatan Kinerja BU</strong>, <strong className="text-white">2. Rasio PNBP BU</strong>, dan <strong className="text-white">3. Rata-rata IKM Layanan BU</strong>. Mengonsolidasikan 3 pilar pelayanan: <strong className="text-white">BU Rumah Sakit (RSBP)</strong>, <strong className="text-white">Dit. Pengamanan Aset & Kawasan</strong>, dan <strong className="text-white">BU SPAM, Fasilitas & Lingkungan</strong>.
          </p>

          {/* Quick Unit Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => onSelectSubView('deep_dive')}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
              title="Klik untuk Deep-Dive Diseminasi Informasi"
            >
              <Megaphone className="w-3.5 h-3.5 text-blue-300" />
              <span>Dit. Diseminasi Informasi</span>
            </button>
            <button
              onClick={() => onSelectSubView('deep_dive')}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
              title="Klik untuk Deep-Dive RSBP"
            >
              <Stethoscope className="w-3.5 h-3.5 text-rose-300" />
              <span>BU Rumah Sakit (18 DS)</span>
            </button>
            <button
              onClick={() => onSelectSubView('deep_dive')}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
              title="Klik untuk Deep-Dive Ditpam"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Dit. Pengamanan Aset (12 DS)</span>
            </button>
            <span className="text-xs text-blue-300 font-mono hidden sm:inline">• 3 Unit Deep-Dive Aktif</span>
          </div>
        </div>

        {/* Right Side: Quick Action Buttons & Stats */}
        <div className="flex flex-wrap sm:flex-col sm:items-end justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFormulaModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              title="Lihat Formula dan Metodologi 3 KPI Perkin A6"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Kamus Rumus Perkin A6</span>
            </button>

            {onOpenExportModal && (
              <button
                onClick={onOpenExportModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                title="Ekspor Laporan Eksekutif Perkin A6"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor Laporan</span>
              </button>
            )}
          </div>

          {/* Quick Indicator Strip */}
          <div className="flex items-center gap-3 text-[11px] text-blue-100 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-300" />
              <span>Cut-Off: <strong>{PERKIN_A6_METADATA.periodeCutOff}</strong></span>
            </div>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span className="text-emerald-300 font-medium">Net Fiscal Surplus: +Rp 5.8M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
