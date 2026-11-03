import React from 'react';
import {
  TrendingUp,
  Globe,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck2,
  ArrowUpRight,
  Briefcase,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A4_KPIS } from './investasiPengusahaanData';

interface InvestasiPengusahaanKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onSelectUnit?: (unitId: string) => void;
  selectedQuarter?: string;
  selectedSatker?: string;
}

// Sparkline Mock Data for 4 IKPs in DEP-A4
const SPARKLINE_IKP1 = [
  { v: 54.2 }, { v: 56.8 }, { v: 59.1 }, { v: 61.4 }, { v: 62.7 }, { v: 63.85 },
];
const SPARKLINE_IKP2 = [
  { v: 185 }, { v: 192 }, { v: 198 }, { v: 205 }, { v: 212 }, { v: 218 },
];
const SPARKLINE_IKP3 = [
  { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 },
];
const SPARKLINE_IKP4 = [
  { v: 88.5 }, { v: 90.2 }, { v: 92.1 }, { v: 93.8 }, { v: 94.6 }, { v: 95.45 },
];

import { DeputiKpiCard } from '../DeputiKpiCard';

export const InvestasiPengusahaanKpiRow: React.FC<InvestasiPengusahaanKpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
}) => {
  const ikpInvestasi = PERKIN_A4_KPIS[0];
  const ikpPromosi = PERKIN_A4_KPIS[1];
  const ikpKek = PERKIN_A4_KPIS[2];
  const ikpPengendalian = PERKIN_A4_KPIS[3];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A4 (SESUAI REFERENSI DESAIN)   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Realisasi Penanaman Modal di KPBPB */}
        <DeputiKpiCard
          title="IKP 1 • Investasi KPBPB"
          value="Rp 63,85 T"
          targetLabel="Target Rp 60,00 T (106,4%)"
          yoyLabel="+15,2% YoY"
          icon={TrendingUp}
          onClick={() => onOpenFormulaModal(ikpInvestasi.id)}
          tooltip="Buka detail IKP 1 Realisasi Investasi KPBPB (Dir. Promosi & Fasilitasi)"
        />

        {/* IKP 2: Minat Investasi dari Promosi */}
        <DeputiKpiCard
          title="IKP 2 • Minat Investasi Promosi"
          value="218 Minat"
          targetLabel="Target 200 Minat (109,0%)"
          yoyLabel="+18,5% YoY"
          icon={Globe}
          onClick={() => onOpenFormulaModal(ikpPromosi.id)}
          tooltip="Buka detail IKP 2 Minat Investasi dari Kegiatan Promosi & Fasilitasi"
        />

        {/* IKP 3: Kajian Pengembangan & KEK Berkelanjutan */}
        <DeputiKpiCard
          title="IKP 3 • Kajian KEK Berkelanjutan"
          value="100,0%"
          targetLabel="Target 100,0% (100,0%)"
          yoyLabel="+5,3% YoY"
          icon={Building2}
          onClick={() => onOpenFormulaModal(ikpKek.id)}
          tooltip="Buka detail IKP 3 Kajian Pengembangan Kawasan & KEK Berkelanjutan"
        />

        {/* IKP 4: Pengendalian Pengusahaan & Kerja Sama BU */}
        <DeputiKpiCard
          title="IKP 4 • Pengendalian Pengusahaan"
          value="95,45%"
          targetLabel="Target 90,00% (106,1%)"
          yoyLabel="+8,2% YoY"
          icon={ShieldCheck}
          onClick={() => onOpenFormulaModal(ikpPengendalian.id)}
          tooltip="Buka detail IKP 4 Tingkat Kepatuhan Pengendalian Pengusahaan & Kerja Sama BU"
        />
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL TAMBAHAN DI BAWAH UTAMA     */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: RASIO PENANAMAN MODAL ASING (PMA) VS DALAM NEGERI - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-investasi')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Rasio Investasi PMA vs PMDN (Dir. Promosi dan Fasilitasi Investasi)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Briefcase className="w-2.5 h-2.5" />
              </span>
              Porsi PMA : PMDN
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              PMA 74,7%
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Rp 47,7 T PMA
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              PMDN: Rp 16,15 Triliun
            </span>
          </div>
        </div>

        {/* KPI 2: KEPATUHAN LAPORAN LKPM INVESTOR - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-investasi')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tingkat Kepatuhan Laporan LKPM Investor (Dir. Promosi dan Fasilitasi Investasi)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <FileCheck2 className="w-2.5 h-2.5" />
              </span>
              Kepatuhan LKPM
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              96,4% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              1.248 Badan Usaha
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Tertib Pelaporan BKPM
            </span>
          </div>
        </div>

        {/* KPI 3: KECEPATAN LAYANAN ADMINISTRATOR KEK - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pengembangan-kek')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kecepatan Layanan Administrator KEK (Dir. Perencanaan dan Pengembangan Investasi)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Izin Administrator KEK
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              SLA 2,1 Hari
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              342 Izin Terbit
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar Regulasi: 3 Hari Kerja
            </span>
          </div>
        </div>

        {/* KPI 4: KEPATUHAN PKS KERJA SAMA BADAN USAHA - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pengendalian-usaha')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kepatuhan PKS Kerja Sama Badan Usaha (Dir. Pengendalian Pengusahaan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Kepatuhan PKS BU
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
              95,5% Patuh
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              105 / 110 Rekomendasi
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              28 Dokumen PKS Diawasi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
