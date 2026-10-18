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
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7KpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedKpiId?: string | null;
  selectedQuarter?: string;
}

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
      {/* 1. BARIS PERTAMA: 4 KARTU KPI UTAMA EKSEKUTIF (POLOS KOTAK TANPA GARIS) */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* KARTU 1: IKP 1 - PENYELENGGARAAN INFRASTRUKTUR */}
        <div
          onClick={() => {
            onOpenFormulaModal(ikp1.id);
            onSelectUnit?.('dit-pembangunan-infrastruktur');
          }}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 1 Penyelenggaraan Infrastruktur"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100 flex items-center gap-1.5">
                <HardHat className="w-3.5 h-3.5 text-cyan-200" />
                IKP 1 &bull; Pembangunan Fisik
              </span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                <HardHat className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-white tracking-tight block">
              92,40%
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target: 100% Rencana</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                92,4% Tercapai
              </span>
            </div>
          </div>
        </div>

        {/* KARTU 2: IKP 2 - NILAI REALISASI PNBP */}
        <div
          onClick={() => {
            onOpenFormulaModal(ikp2.id);
            onSelectUnit?.('dit-pembangunan-infrastruktur');
          }}
          className="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 2 Nilai Realisasi PNBP"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-700" />
                IKP 2 &bull; Penerimaan PNBP
              </span>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Coins className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              Rp 7,45 M
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target: Rp 6,82 M</span>
              <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                109,2% Tercapai
              </span>
            </div>
          </div>
        </div>

        {/* KARTU 3: PAGU & SERAPAN BELANJA MODAL INFRASTRUKTUR */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-gradient-to-br from-amber-50/90 via-yellow-50/50 to-amber-50/30 border border-amber-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Belanja Modal Fisik Pembangunan & Perencanaan"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                Belanja Modal Fisik
              </span>
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              Rp 682,4 M
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Pagu: Rp 842,5 M</span>
              <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                81,0% Serapan
              </span>
            </div>
          </div>
        </div>

        {/* KARTU 4: KEMANTAPAN JARINGAN JALAN & PAKET STRATEGIS */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-gradient-to-br from-purple-50/90 via-violet-50/50 to-purple-50/30 border border-purple-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Paket Strategis & Kelaikan Jalan"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-purple-800 flex items-center gap-1.5">
                <Route className="w-3.5 h-3.5 text-indigo-700" />
                Paket Strategis &amp; Jalan
              </span>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Route className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              14 Paket / 91,4%
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">542,8 Km Jalan</span>
              <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                Mantap Prima
              </span>
            </div>
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
