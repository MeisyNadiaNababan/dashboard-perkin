import React from 'react';
import {
  Award,
  DollarSign,
  TrendingUp,
  Plane,
  Anchor,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Scale,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A5_KPIS } from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedQuarter?: string;
  selectedUnit?: string;
}

// Sparkline Mock Data for 3 IKPs + 1 Consolidated Total in DEP-A5
const SPARKLINE_IKP1 = [
  { v: 84.1 }, { v: 85.2 }, { v: 86.3 }, { v: 87.1 }, { v: 87.9 }, { v: 88.45 },
];
const SPARKLINE_IKP2 = [
  { v: 485 }, { v: 502 }, { v: 518 }, { v: 535 }, { v: 549 }, { v: 562.85 },
];
const SPARKLINE_IKP3 = [
  { v: 1.8 }, { v: 1.95 }, { v: 2.1 }, { v: 2.2 }, { v: 2.35 }, { v: 2.48 },
];
const SPARKLINE_TOTAL = [
  { v: 486.8 }, { v: 503.95 }, { v: 520.1 }, { v: 537.2 }, { v: 551.35 }, { v: 565.33 },
];

import { DeputiKpiCard } from '../DeputiKpiCard';

export const BandaraPelabuhanLlbKpiRow: React.FC<BandaraPelabuhanLlbKpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
}) => {
  const ikp1 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-1-ikm-gabungan') || PERKIN_A5_KPIS[0];
  const ikp2 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-2-pnbp-bandara-pelabuhan') || PERKIN_A5_KPIS[1];
  const ikp3 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-3-pnbp-lalu-lintas-barang') || PERKIN_A5_KPIS[2];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A5 (SESUAI REFERENSI DESAIN)   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Rata-rata Nilai IKM Layanan Gabungan */}
        <DeputiKpiCard
          title="IKP 1 • Rata-rata IKM Layanan"
          value={String(ikp1.realization)}
          unitLabel="Mutu A"
          targetLabel="Target 86,30 (102,5%)"
          yoyLabel="+3,8% YoY"
          icon={Award}
          onClick={() => onOpenFormulaModal(ikp1.id)}
          tooltip="Buka detail IKP 1 Rata-rata IKM Layanan Gabungan Bandara & Pelabuhan"
        />

        {/* IKP 2: Realisasi PNBP Bandara & Kepelabuhanan */}
        <DeputiKpiCard
          title="IKP 2 • PNBP Bandara & Pelabuhan"
          value="Rp 562,85 M"
          targetLabel="Target Rp 518,21 M (108,6%)"
          yoyLabel="+12,9% YoY"
          icon={Plane}
          onClick={() => onOpenFormulaModal(ikp2.id)}
          tooltip="Buka detail IKP 2 Realisasi PNBP Badan Pengelolaan Kawasan Bandara & Pelabuhan"
        />

        {/* IKP 3: Realisasi PNBP Dit. Lalu Lintas Barang */}
        <DeputiKpiCard
          title="IKP 3 • PNBP Lalu Lintas Barang"
          value="Rp 2,48 M"
          targetLabel="Target Rp 2,20 M (112,7%)"
          yoyLabel="+15,3% YoY"
          icon={Truck}
          onClick={() => onOpenFormulaModal(ikp3.id)}
          tooltip="Buka detail IKP 3 Realisasi PNBP Direktorat Lalu Lintas Barang"
        />

        {/* KONSOLIDASI TOTAL PNBP DEP-A5 */}
        <DeputiKpiCard
          title="Total • PNBP Konsolidasi A5"
          value="Rp 565,33 M"
          targetLabel="Target Rp 520,41 M (108,6%)"
          yoyLabel="+12,9% YoY"
          icon={DollarSign}
          onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
          tooltip="Total PNBP Gabungan 3 Satker Perkin A5 (Bandara, Pelabuhan, Lalu Lintas Barang)"
        />
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL TAMBAHAN DI BAWAH UTAMA     */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: HUB KONEKTIVITAS PENUMPANG - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-bandara')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Rasio Hub Konektivitas Penumpang Gabungan (Laut & Udara)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Compass className="w-2.5 h-2.5" />
              </span>
              Hub Konektivitas Penumpang
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              +8,4% YoY
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              12,54 Juta Orang
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Gabungan Laut &amp; Udara
            </span>
          </div>
        </div>

        {/* KPI 2: KEPATUHAN SAFETY & SECURITY REGULASI - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pelabuhan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tingkat Kepatuhan Regulasi Keselamatan ICAO & IMO (Bandara & Pelabuhan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Standar Safety ICAO &amp; IMO
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              98,8% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Zero Accident
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              ISPS Code &amp; Airport Security
            </span>
          </div>
        </div>

        {/* KPI 3: INDEKS KEPUASAN PENGGUNA JASA LOGISTIK - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pelabuhan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Kepuasan Pengguna Jasa Logistik & Bongkar Muat"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Scale className="w-2.5 h-2.5" />
              </span>
              IKP Jasa Logistik
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              89,20 / 100
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Kategori Prima
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Dwelling Time 2,4 Hari
            </span>
          </div>
        </div>

        {/* KPI 4: EFISIENSI WAKTU LAYANAN IZIN KAWASAN - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-lalu-lintas-barang')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Efisiensi Waktu Layanan SLA Izin Kawasan & Dokumen LLB (Dit. LLB)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Izin &amp; Dokumen LLB
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              97,4% On-Time
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              1,6 Hari Kerja
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar Regulasi: 3 Hari
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
