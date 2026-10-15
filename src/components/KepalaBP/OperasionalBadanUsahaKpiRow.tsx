import React from 'react';
import {
  DollarSign,
  Clock,
  ShieldCheck,
  Coins,
} from 'lucide-react';

interface OperasionalBadanUsahaKpiRowProps {
  onOpenFormula?: (metricId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const OperasionalBadanUsahaKpiRow: React.FC<OperasionalBadanUsahaKpiRowProps> = ({
  onNavigateToUnit,
}) => {
  const handleUnitClick = (targetDeputiId: string) => {
    if (onNavigateToUnit) {
      onNavigateToUnit(targetDeputiId);
    }
  };

  return (
    <section className="font-sans">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: SERAPAN BELANJA */}
        <div
          onClick={() => handleUnitClick('deputi-administrasi-keuangan')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-3 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka pengawasan Deputi 1 (Administrasi & Keuangan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <DollarSign className="w-2.5 h-2.5" />
              </span>
              Serapan Belanja
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              85,5% On Track
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Rp 1.937,9 M
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Pagu Rp 2.267,5 M
            </span>
          </div>
        </div>

        {/* KPI 2: KEPATUHAN SLA LAYANAN */}
        <div
          onClick={() => handleUnitClick('deputi-kebijakan-strategis')}
          className="bg-gradient-to-br from-sky-50/80 via-blue-50/40 to-white rounded-lg border border-sky-200/80 hover:border-sky-400 px-3 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka pengawasan Deputi 2 (Kebijakan Strategis / PTSP)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              Kepatuhan SLA
            </span>
            <span className="font-bold text-sky-800 bg-white/90 border border-sky-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              96,4% Terpenuhi
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              SOP Terpenuhi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              PTSP &amp; 5 Lokus Pelayanan
            </span>
          </div>
        </div>

        {/* KPI 3: LIKUIDITAS KAS BLU */}
        <div
          onClick={() => handleUnitClick('deputi-administrasi-keuangan')}
          className="bg-gradient-to-br from-cyan-50/80 via-sky-50/40 to-white rounded-lg border border-cyan-200/80 hover:border-cyan-400 px-3 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka pengawasan Kas & Bank BLU"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-cyan-600 text-white flex items-center justify-center font-bold shrink-0">
                <Coins className="w-2.5 h-2.5" />
              </span>
              Likuiditas Kas BLU
            </span>
            <span className="font-bold text-cyan-800 bg-white/90 border border-cyan-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              242,8% Likuid
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Rp 1,42 T
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              5 Bank Rekening BLU
            </span>
          </div>
        </div>

        {/* KPI 4: AUDIT SPI & BPK */}
        <div
          onClick={() => handleUnitClick('deputi-administrasi-keuangan')}
          className="bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-white rounded-lg border border-indigo-200/80 hover:border-indigo-400 px-3 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka pengawasan SPI / Audit BPK RI"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Audit SPI &amp; BPK
            </span>
            <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              91,4% Tuntas
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Opini WTP 8x
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              214/234 Rekomendasi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
