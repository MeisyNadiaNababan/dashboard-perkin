import React from 'react';
import {
  HardHat,
  Coins,
  ShieldCheck,
  Award,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  Clock,
  Droplets,
  Route,
  CheckCircle2,
  Trees,
  DollarSign,
  Building2,
  Flame,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7KpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedKpiId?: string | null;
  selectedQuarter?: string;
}

// Mini Sparkline Data for 4 Primary Cards
const SPARKLINE_IKP1 = [
  { val: 88.5 },
  { val: 89.2 },
  { val: 90.4 },
  { val: 91.2 },
  { val: 92.4 },
];

const SPARKLINE_IKP2 = [
  { val: 5.2 },
  { val: 5.8 },
  { val: 6.4 },
  { val: 7.1 },
  { val: 7.45 },
];

const SPARKLINE_ANGGARAN = [
  { val: 180 },
  { val: 320 },
  { val: 490 },
  { val: 610 },
  { val: 682.4 },
];

const SPARKLINE_JALAN = [
  { val: 87.2 },
  { val: 88.5 },
  { val: 89.9 },
  { val: 90.8 },
  { val: 91.4 },
];

export const InfrastrukturPerkinA7KpiRow: React.FC<InfrastrukturPerkinA7KpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
  selectedKpiId,
}) => {
  const ikp1 = PERKIN_A7_KPIS[0];
  const ikp2 = PERKIN_A7_KPIS[1];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS PERTAMA: 4 KARTU KPI UTAMA EKSEKUTIF DENGAN SPARKLINES    */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* KARTU 1: IKP 1 - PENYELENGGARAAN INFRASTRUKTUR */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className={`bg-white rounded-xl p-3 border transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between cursor-pointer border-blue-200/90 hover:border-blue-400 group ${
            selectedKpiId === ikp1.id ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/15' : ''
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black font-mono bg-blue-50 text-blue-700 border border-blue-200/70">
                IKP 01 &bull; PERKIN A7
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200">
                  92,40% Capaian
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFormulaModal(ikp1.id);
                  }}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Lihat Manual Rumus & Atribut Satu Data"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-medium truncate mb-0.5">
              Konsolidasi 3 Dit: Pembangunan, Perencanaan &amp; Ditpam
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-blue-700 transition-colors">
              {ikp1.name}
            </h3>

            {/* Sparkline & Target vs Realisasi */}
            <div className="mt-2 grid grid-cols-12 gap-1 items-end bg-slate-50/80 p-2 rounded-lg border border-slate-100">
              <div className="col-span-7 space-y-0.5">
                <div className="text-[9px] uppercase font-bold text-slate-500">
                  Target: <span className="font-mono text-slate-800 font-black">100%</span>
                </div>
                <div className="text-sm sm:text-base font-black font-mono text-slate-900 tracking-tight">
                  92,40% <span className="text-[10px] font-bold text-emerald-600">YTD</span>
                </div>
              </div>
              <div className="col-span-5 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SPARKLINE_IKP1}>
                    <defs>
                      <linearGradient id="gradIkp1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#2563EB" strokeWidth={1.8} fill="url(#gradIkp1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate">14 Paket Strategis BP Batam</span>
            <span className="font-bold text-blue-700">On Track</span>
          </div>
        </div>

        {/* KARTU 2: IKP 2 - NILAI REALISASI PNBP */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className={`bg-white rounded-xl p-3 border transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between cursor-pointer border-cyan-200/90 hover:border-cyan-400 group ${
            selectedKpiId === ikp2.id ? 'ring-2 ring-cyan-500 border-cyan-400 bg-cyan-50/15' : ''
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black font-mono bg-cyan-50 text-cyan-800 border border-cyan-200/70">
                IKP 02 &bull; PERKIN A7
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full border bg-cyan-50 text-cyan-800 border-cyan-200">
                  109,22% Capaian
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFormulaModal(ikp2.id);
                  }}
                  className="p-1 text-slate-400 hover:text-cyan-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Lihat Manual Rumus & Atribut Satu Data"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-medium truncate mb-0.5">
              Dit. Pembangunan: Subdit ROW Utilitas &amp; RTH
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-cyan-700 transition-colors">
              {ikp2.name}
            </h3>

            {/* Sparkline & Target vs Realisasi */}
            <div className="mt-2 grid grid-cols-12 gap-1 items-end bg-slate-50/80 p-2 rounded-lg border border-slate-100">
              <div className="col-span-7 space-y-0.5">
                <div className="text-[9px] uppercase font-bold text-slate-500">
                  Target: <span className="font-mono text-slate-800 font-black">Rp 6,821 M</span>
                </div>
                <div className="text-sm sm:text-base font-black font-mono text-cyan-800 tracking-tight">
                  Rp 7,450 M <span className="text-[10px] font-bold text-emerald-600">+629 Jt</span>
                </div>
              </div>
              <div className="col-span-5 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SPARKLINE_IKP2}>
                    <defs>
                      <linearGradient id="gradIkp2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0891B2" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#0891B2" strokeWidth={1.8} fill="url(#gradIkp2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate">ROW FO/Gas: 5,25 M &bull; RTH: 2,20 M</span>
            <span className="font-bold text-emerald-600">Surplus</span>
          </div>
        </div>

        {/* KARTU 3: PAGU & SERAPAN BELANJA MODAL INFRASTRUKTUR */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-white rounded-xl p-3 border transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between cursor-pointer border-slate-200/90 hover:border-slate-400 group"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black font-mono bg-purple-50 text-purple-700 border border-purple-200/70">
                BELANJA MODAL
              </span>
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full border bg-purple-50 text-purple-800 border-purple-200">
                84,38% Serapan
              </span>
            </div>

            <div className="text-[10px] text-slate-500 font-medium truncate mb-0.5">
              DIPA BP Batam TA 2025 (Pembangunan &amp; Perencanaan)
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-purple-700 transition-colors">
              Pagu &amp; Serapan Belanja Fisik Infrastruktur
            </h3>

            {/* Sparkline & Target vs Realisasi */}
            <div className="mt-2 grid grid-cols-12 gap-1 items-end bg-slate-50/80 p-2 rounded-lg border border-slate-100">
              <div className="col-span-7 space-y-0.5">
                <div className="text-[9px] uppercase font-bold text-slate-500">
                  Pagu: <span className="font-mono text-slate-800 font-black">Rp 808,71 M</span>
                </div>
                <div className="text-sm sm:text-base font-black font-mono text-purple-800 tracking-tight">
                  Rp 682,43 M <span className="text-[9.5px] text-slate-500 font-normal">Real</span>
                </div>
              </div>
              <div className="col-span-5 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SPARKLINE_ANGGARAN}>
                    <defs>
                      <linearGradient id="gradAnggaran" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#7C3AED" strokeWidth={1.8} fill="url(#gradAnggaran)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate">Pembangunan: 602,8 M &bull; DED: 53,5 M</span>
            <span className="font-bold text-purple-700">Tepat Waktu</span>
          </div>
        </div>

        {/* KARTU 4: KEMANTAPAN JARINGAN JALAN BP BATAM */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-white rounded-xl p-3 border transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between cursor-pointer border-slate-200/90 hover:border-slate-400 group"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                DATASET 03 &bull; SPASIAL
              </span>
              <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200">
                91,40% Mantap
              </span>
            </div>

            <div className="text-[10px] text-slate-500 font-medium truncate mb-0.5">
              Dit. Pembangunan: Jaringan Jalan Eksisting (Hal. 48)
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-emerald-700 transition-colors">
              Kemantapan Ruas Jaringan Jalan BP Batam
            </h3>

            {/* Sparkline & Target vs Realisasi */}
            <div className="mt-2 grid grid-cols-12 gap-1 items-end bg-slate-50/80 p-2 rounded-lg border border-slate-100">
              <div className="col-span-7 space-y-0.5">
                <div className="text-[9px] uppercase font-bold text-slate-500">
                  Total Ruas: <span className="font-mono text-slate-800 font-black">542,8 Km</span>
                </div>
                <div className="text-sm sm:text-base font-black font-mono text-emerald-800 tracking-tight">
                  496,1 Km <span className="text-[9.5px] text-emerald-700 font-bold">Mantap</span>
                </div>
              </div>
              <div className="col-span-5 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SPARKLINE_JALAN}>
                    <defs>
                      <linearGradient id="gradJalan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#059669" strokeWidth={1.8} fill="url(#gradJalan)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium truncate">Arteri 184 Km &bull; Kolektor 198 Km</span>
            <span className="font-bold text-emerald-700">Prima</span>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI TURUNAN OPERASIONAL DI BAWAH UTAMA     */}
      {/* Sesuai Instruksi: Non-duplikasi terhadap data di Unit Deep Dive      */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI TURUNAN 1: KEPATUHAN SLA IZIN ROW UTILITAS & PENGHIJAUAN */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-gradient-to-br from-blue-50/80 via-cyan-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kecepatan Layanan & SLA Izin Pemanfaatan ROW (Dit. Pembangunan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Izin ROW Utilitas &amp; RTH
            </span>
            <span className="font-bold text-blue-800 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              SLA 3,5 Hari
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              200 Izin Terbit
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              98,5% Tepat Waktu (Max 5 Hari)
            </span>
          </div>
        </div>

        {/* KPI TURUNAN 2: EFISIENSI TENDER HPS KONTRAK FISIK (SAVING PENGADAAN) */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Efisiensi Nilai Kontrak vs Pagu HPS 14 Proyek Strategis"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <DollarSign className="w-2.5 h-2.5" />
              </span>
              Efisiensi HPS Kontrak Fisik
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Saving 5,72%
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Rp 48,25 Miliar
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Efisiensi Pengadaan Proyek
            </span>
          </div>
        </div>

        {/* KPI TURUNAN 3: KEANDALAN DRAINASE PERKOTAAN & KOLAM RETENSI */}
        <div
          onClick={() => onSelectUnit?.('dit-perencanaan-infrastruktur')}
          className="bg-gradient-to-br from-cyan-50/80 via-sky-50/40 to-white rounded-lg border border-cyan-200/80 hover:border-cyan-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Keandalan Kapasitas Tampung Banjir & Drainase Primer"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-cyan-600 text-white flex items-center justify-center font-bold shrink-0">
                <Droplets className="w-2.5 h-2.5" />
              </span>
              Keandalan Drainase &amp; Kolam
            </span>
            <span className="font-bold text-cyan-800 bg-white/90 border border-cyan-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              94,8% Bebas Banjir
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              3 Kolam Retensi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Baloi, Batam Ctr &amp; 42 Km U-Ditch
            </span>
          </div>
        </div>

        {/* KPI TURUNAN 4: KONDUSIFITAS PENGAMANAN OBVITNAS & HUTAN LINDUNG */}
        <div
          onClick={() => onSelectUnit?.('dit-pam-aset')}
          className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white rounded-lg border border-amber-200/80 hover:border-amber-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Pengamanan Objek Vital Nasional & Sempadan DTA Waduk (Ditpam)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Kondusifitas Obvitnas &amp; DTA
            </span>
            <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              100% Kondusif
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              48 Kawasan Obvit
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              142 Ha Hutan DTA Terjaga
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
