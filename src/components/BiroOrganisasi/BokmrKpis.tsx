import React from 'react';
import {
  ShieldCheck,
  Award,
  Activity,
  Building,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { BOKMR_SUMMARY, MRI_DATA, PEKPPP_DATA } from './bokmrData';

interface BokmrKpisProps {
  onOpenFormulaModal: (datasetIndex: number) => void;
  onSelectKpiDetail?: (kpiKey: string) => void;
}

export const BokmrKpis: React.FC<BokmrKpisProps> = ({
  onOpenFormulaModal,
  onSelectKpiDetail,
}) => {
  // Rata-rata Indeks Pelayanan Publik
  const avgPekppp = (
    PEKPPP_DATA.reduce((acc, curr) => acc + curr.capaianIndeks, 0) / PEKPPP_DATA.length
  ).toFixed(2);

  return (
    <div className="space-y-3.5">
      {/* COMPACT SECTION TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Indikator Utama Tata Kelola &amp; Akuntabilitas (Satu Data Hal. 38 - 40)
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono">
            Visualisasi: Kartu Metrik KPI Eksekutif (BANs)
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 font-mono">
          Atribut: SAKIP (Hal. 38), SPIP (Hal. 40), PEKPPP (Hal. 40), MRI (Hal. 40)
        </span>
      </div>

      {/* 4 HIGH-IMPACT EXECUTIVE CARDS PER PERSYARATAN #6 & #8 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. SAKIP BP BATAM (DATASET #2) */}
        <div
          id="kpi-sakip-bp-batam"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
              <Activity className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[10px] font-mono">
              DATASET #2
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Nilai SAKIP BP Batam
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                {BOKMR_SUMMARY.nilaiSakip.nilai.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
              <span className="ml-auto text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                Predikat A
              </span>
            </div>

            {/* VISUAL PROGRESS GAUGE */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${BOKMR_SUMMARY.nilaiSakip.nilai}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-semibold">Tingkat: Memuaskan</span>
            <button
              onClick={() => onOpenFormulaModal(2)}
              className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline flex items-center gap-0.5"
            >
              Rincian <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. MATURITAS SPIP (DATASET #17) */}
        <div
          id="kpi-maturitas-spip"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] font-mono">
              DATASET #17
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Indeks Maturitas SPIP
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                {BOKMR_SUMMARY.indeksMaturitasSpip.nilai.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
              <span className="ml-auto text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Level 3 (Matur)
              </span>
            </div>

            {/* SEGMENTED LEVEL GAUGE */}
            <div className="grid grid-cols-5 gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div
                  key={lvl}
                  className={`h-2 rounded-full transition-all ${
                    lvl <= 3 ? 'bg-emerald-500' : 'bg-slate-100'
                  }`}
                  title={`Level ${lvl}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-semibold">Target BPKP: 3.20 (+0.22)</span>
            <button
              onClick={() => onOpenFormulaModal(17)}
              className="text-emerald-600 hover:text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
            >
              5 Unsur <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. INDEKS PELAYANAN PUBLIK (PEKPPP - DATASET #16) - DITAMBAHKAN PER SYARAT #6 */}
        <div
          id="kpi-indeks-pelayanan-publik"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl border border-teal-100">
              <Building className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-bold text-[10px] font-mono">
              DATASET #16
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Indeks Pelayanan Publik (PEKPPP)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                {avgPekppp}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
              <span className="ml-auto text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                Pelayanan Prima
              </span>
            </div>

            {/* PROGRESS GAUGE */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(Number(avgPekppp) / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-teal-700 font-semibold">Target: 4.00 (+0.38 Poin)</span>
            <button
              onClick={() => onOpenFormulaModal(16)}
              className="text-teal-600 hover:text-teal-800 font-bold hover:underline flex items-center gap-0.5"
            >
              Evaluasi <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. INDEKS MANAJEMEN RISIKO (MRI - DATASET #18) - DITAMBAHKAN PER SYARAT #8 */}
        <div
          id="kpi-indeks-manajemen-risiko"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl border border-rose-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold text-[10px] font-mono">
              DATASET #18
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Indeks Manajemen Risiko (MRI)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                {MRI_DATA.skor.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
              <span className="ml-auto text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Tingkat 3
              </span>
            </div>

            {/* PROGRESS GAUGE */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(MRI_DATA.skor / 5.0) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-rose-700 font-semibold">Mitigasi: 94.2% Efektif</span>
            <button
              onClick={() => onOpenFormulaModal(18)}
              className="text-rose-600 hover:text-rose-800 font-bold hover:underline flex items-center gap-0.5"
            >
              Matriks <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
