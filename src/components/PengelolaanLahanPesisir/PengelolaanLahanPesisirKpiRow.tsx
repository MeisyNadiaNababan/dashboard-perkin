import React from 'react';
import {
  MapPin,
  Anchor,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  AlertTriangle,
  Scale,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A3_KPIS } from './pengelolaanLahanPesisirData';
import { DeputiKpiCard } from '../DeputiKpiCard';

interface PengelolaanLahanPesisirKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
}

// Sparkline Mock Data for 3 IKPs in DEP-A3
const SPARKLINE_IKP1 = [
  { v: 180 }, { v: 195 }, { v: 210 }, { v: 225 }, { v: 238 }, { v: 248.5 },
];
const SPARKLINE_IKP2 = [
  { v: 120 }, { v: 132 }, { v: 140 }, { v: 148 }, { v: 155 }, { v: 162.8 },
];
const SPARKLINE_IKP3 = [
  { v: 75.0 }, { v: 78.5 }, { v: 81.2 }, { v: 84.0 }, { v: 86.8 }, { v: 89.4 },
];

export const PengelolaanLahanPesisirKpiRow: React.FC<PengelolaanLahanPesisirKpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
}) => {
  const ikpLahan = PERKIN_A3_KPIS[0];
  const ikpPesisir = PERKIN_A3_KPIS[1];
  const ikpPengendalian = PERKIN_A3_KPIS[2];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A3 (SESUAI REFERENSI DESAIN)   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Luas Alokasi Lahan untuk Investasi */}
        <DeputiKpiCard
          title="IKP 1 • Alokasi Lahan Investasi"
          value="248,5 Ha"
          targetLabel="Target 200,0 Ha (124,3%)"
          yoyLabel="+15,5% YoY"
          icon={MapPin}
          onClick={() => onOpenFormulaModal('ikp-1-lahan-investasi')}
          tooltip="Buka detail IKP 1 Luas Lahan yang Dialokasikan untuk Investasi (Dit. Pengelolaan Lahan)"
        />

        {/* IKP 2: Luas Izin Pengelolaan Kawasan Pesisir & Reklamasi */}
        <DeputiKpiCard
          title="IKP 2 • Izin Pesisir & Reklamasi"
          value="162,8 Ha"
          targetLabel="Target 150,0 Ha (108,5%)"
          yoyLabel="+14,2% YoY"
          icon={Anchor}
          onClick={() => onOpenFormulaModal('ikp-2-pesisir-reklamasi')}
          tooltip="Buka detail IKP 2 Luas Izin Kawasan Pesisir & Reklamasi (Dit. Pesisir & Reklamasi)"
        />

        {/* IKP 3: Keberhasilan Pengawasan & Pengendalian Lahan */}
        <DeputiKpiCard
          title="IKP 3 • Pengawasan Lahan"
          value="89,40%"
          targetLabel="Target 80,00% (111,8%)"
          yoyLabel="+8,9% YoY"
          icon={ShieldCheck}
          onClick={() => onOpenFormulaModal('ikp-3-pengawasan-pengendalian')}
          tooltip="Buka detail IKP 3 Tingkat Keberhasilan Pengawasan & Pengendalian Lahan"
        />

        {/* IKP 4 / Operasional: Penerimaan PNBP Pengelolaan Lahan */}
        <DeputiKpiCard
          title="Total • PNBP Pengelolaan Lahan"
          value="Rp 482,5 M"
          targetLabel="Target Rp 450,0 M (107,2%)"
          yoyLabel="+9,8% YoY"
          icon={DollarSign}
          onClick={() => onSelectUnit?.('dit-pertanahan')}
          tooltip="Total Realisasi PNBP Sektor Pengelolaan Pertanahan & Lahan"
        />
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL TAMBAHAN DI BAWAH UTAMA     */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: SLA KECEPATAN PENERBITAN IZIN PERTANAHAN - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pertanahan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kecepatan Layanan & SLA Izin Pertanahan (Dit. Pengelolaan Pertanahan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Layanan Pertanahan
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              96,2% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              2,4 Hari Kerja
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar SOP: 4,0 Hari Kerja
            </span>
          </div>
        </div>

        {/* KPI 2: KESESUAIAN ZONASI LAUT & REKLAMASI / PKKPRL - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pesisir-reklamasi')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kesesuaian Tata Ruang Laut & Zonasi PKKPRL (Dit. Pesisir & Reklamasi)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Compass className="w-2.5 h-2.5" />
              </span>
              Kesesuaian RZWP3K
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              100% Selaras
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              28 Rekomendasi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Nir-Konflik Tata Ruang Laut
            </span>
          </div>
        </div>

        {/* KPI 3: EFEKTIVITAS PENANGANAN SENGKETA & PENEGAKAN REGULASI - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pengendalian-lahan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Efektivitas Penanganan Sengketa & Mediasi Pertanahan (Dit. Pengendalian Lahan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Scale className="w-2.5 h-2.5" />
              </span>
              Penyelesaian Sengketa
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              Target 90%
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              94,8% Tuntas
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              182 dari 192 Kasus Selesai
            </span>
          </div>
        </div>

        {/* KPI 4: UTILISASI AREA SUB-WILAYAH PENGEMBANGAN (SWP) LAHAN - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pertanahan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Rasio Utilisasi SWP Lahan Produktif (Buku Satu Data Pertanahan #15)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Layers className="w-2.5 h-2.5" />
              </span>
              Utilisasi SWP Lahan
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              Optimal
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              86,5% Terutilisasi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              8 SWP Aktif &amp; Siap Bangun
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
