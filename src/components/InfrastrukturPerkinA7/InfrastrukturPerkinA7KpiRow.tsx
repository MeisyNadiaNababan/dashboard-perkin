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

import { DeputiKpiCard } from '../DeputiKpiCard';

export const InfrastrukturPerkinA7KpiRow: React.FC<InfrastrukturPerkinA7KpiRowProps> = ({
  onOpenFormulaModal,
  onSelectUnit,
  selectedKpiId: _selectedKpiId,
}) => {
  const ikp1 = PERKIN_A7_KPIS[0];
  const ikp2 = PERKIN_A7_KPIS[1];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS PERTAMA: 4 KARTU KPI UTAMA EKSEKUTIF (SESUAI REFERENSI DESAIN) */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* KARTU 1: IKP 1 - PENYELENGGARAAN INFRASTRUKTUR */}
        <DeputiKpiCard
          title="IKP 1 • Pembangunan Fisik"
          value="92,40%"
          targetLabel="Target 100,0% (92,4%)"
          yoyLabel="+6,8% YoY"
          icon={HardHat}
          onClick={() => {
            onOpenFormulaModal(ikp1.id);
            onSelectUnit?.('dit-pembangunan-infrastruktur');
          }}
          tooltip="Buka detail IKP 1 Persentase Penyelenggaraan Infrastruktur yang Sesuai Rencana"
        />

        {/* KARTU 2: NILAI REALISASI PNBP */}
        <DeputiKpiCard
          title="IKP 2 • Penerimaan PNBP"
          value="Rp 7,45 M"
          targetLabel="Target Rp 6,82 M (109,2%)"
          yoyLabel="+16,4% YoY"
          icon={Coins}
          onClick={() => {
            onOpenFormulaModal(ikp2.id);
            onSelectUnit?.('dit-pembangunan-infrastruktur');
          }}
          tooltip="Buka detail IKP 2 Nilai Realisasi Penerimaan PNBP Infrastruktur"
        />

        {/* KARTU 3: PAGU & SERAPAN BELANJA MODAL INFRASTRUKTUR */}
        <DeputiKpiCard
          title="IKP 3 • Belanja Modal Fisik"
          value="Rp 682,4 M"
          targetLabel="Target Rp 842,5 M (81,0%)"
          yoyLabel="+14,1% YoY"
          icon={Building2}
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          tooltip="Realisasi Belanja Modal Fisik Pembangunan & Perencanaan Infrastruktur"
        />

        {/* KARTU 4: KEMANTAPAN JARINGAN JALAN & PAKET STRATEGIS */}
        <DeputiKpiCard
          title="IKP 4 • Paket Strategis & Jalan"
          value="14 Paket"
          unitLabel="91,4%"
          targetLabel="Target 14 Paket (100,0%)"
          yoyLabel="+16,7% YoY"
          icon={Route}
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          tooltip="Realisasi Penyelesaian Paket Strategis & Kemantapan Jaringan Jalan"
        />
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI TURUNAN OPERASIONAL DI BAWAH UTAMA     */}
      {/* Sesuai Instruksi: KPI Tambahan / Lainnya berwarna putih             */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI TURUNAN 1: KEPATUHAN SLA IZIN ROW UTILITAS & PENGHIJAUAN - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kecepatan Layanan & SLA Izin Pemanfaatan ROW (Dit. Pembangunan)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              SLA Izin ROW Utilitas &amp; RTH
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
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

        {/* KPI TURUNAN 2: EFISIENSI TENDER HPS KONTRAK FISIK (SAVING PENGADAAN) - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pembangunan-infrastruktur')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Efisiensi Nilai Kontrak vs Pagu HPS 14 Proyek Strategis"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <DollarSign className="w-2.5 h-2.5" />
              </span>
              Efisiensi HPS Kontrak Fisik
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
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

        {/* KPI TURUNAN 3: KEANDALAN DRAINASE PERKOTAAN & KOLAM RETENSI - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-perencanaan-infrastruktur')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Keandalan Kapasitas Tampung Banjir & Drainase Primer"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Droplets className="w-2.5 h-2.5" />
              </span>
              Keandalan Drainase &amp; Kolam
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
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

        {/* KPI TURUNAN 4: KONDUSIFITAS PENGAMANAN OBVITNAS & HUTAN LINDUNG - WHITE CARD */}
        <div
          onClick={() => onSelectUnit?.('dit-pam-aset')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Pengamanan Objek Vital Nasional & Sempadan DTA Waduk (Ditpam)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Kondusifitas Obvitnas &amp; DTA
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.2 rounded-full text-[9.5px] shrink-0">
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
