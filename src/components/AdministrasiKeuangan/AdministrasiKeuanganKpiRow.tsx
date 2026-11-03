import React from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Award,
  Activity,
  TrendingUp,
  Target,
} from 'lucide-react';
import { PERKIN_A1_KPIS } from './administrasiKeuanganData';

interface AdministrasiKeuanganKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
  onSelectUnit?: (unitId: string) => void;
}


import { DeputiKpiCard } from '../DeputiKpiCard';

export const AdministrasiKeuanganKpiRow: React.FC<AdministrasiKeuanganKpiRowProps> = ({
  onOpenFormulaModal,
  selectedKpiId: _selectedKpiId,
  onSelectUnit,
}) => {
  const ikpRb = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-1-rb') || PERKIN_A1_KPIS[0];
  const ikpMerit = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-2-merit') || PERKIN_A1_KPIS[1];
  const ikpSpip = PERKIN_A1_KPIS.find((k) => k.id === 'ikp-3-spip') || PERKIN_A1_KPIS[2];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A1 (SESUAI REFERENSI DESAIN)   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Indeks Reformasi Birokrasi */}
        <DeputiKpiCard
          title="IKP 1 • Reformasi Birokrasi"
          value="78,45 / BB"
          targetLabel="Target 75,00 BB (104,6%)"
          yoyLabel="+3,0% YoY"
          icon={ShieldCheck}
          onClick={() => onOpenFormulaModal('ikp-1-rb')}
          tooltip="Buka detail IKP 1 Indeks Reformasi Birokrasi (KemenPAN-RB)"
        />

        {/* IKP 2: Indeks Sistem Merit */}
        <DeputiKpiCard
          title="IKP 2 • Indeks Sistem Merit"
          value="342,5 / IV"
          targetLabel="Target 280,0 (122,3%)"
          yoyLabel="+5,1% YoY"
          icon={Users}
          onClick={() => onOpenFormulaModal('ikp-2-merit')}
          tooltip="Buka detail IKP 2 Penerapan Sistem Merit Manajemen ASN (KASN)"
        />

        {/* IKP 3: Indeks Maturitas SPIP */}
        <DeputiKpiCard
          title="IKP 3 • Maturitas SPIP"
          value="3,42 / Level 3"
          targetLabel="Target 3,20 (106,9%)"
          yoyLabel="+7,5% YoY"
          icon={ShieldAlert}
          onClick={() => onOpenFormulaModal('ikp-3-spip')}
          tooltip="Buka detail IKP 3 Tingkat Maturitas Penyelenggaraan SPIP (BPKP)"
        />

        {/* IKP 4: Opini BPK Laporan Keuangan */}
        <DeputiKpiCard
          title="IKP 4 • Opini BPK RI"
          value="WTP"
          targetLabel="Target WTP (100,0%)"
          yoyLabel="+0,0% YoY"
          icon={Award}
          onClick={() => onOpenFormulaModal('ikp-4-wtp')}
          tooltip="Buka detail IKP 4 Opini BPK RI atas Laporan Keuangan (8x WTP Berturut-turut)"
        />
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 4 KARTU KPI OPERASIONAL PILIHAN DI BAWAH UTAMA       */}
      {/* 4 KPI paling esensial untuk monitoring Deputi A1: IKPA, Serapan,    */}
      {/* IP ASN, dan Indeks Manajemen Risiko (MRI)                           */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* KPI 1: INDEKS KINERJA PELAKSANAAN ANGGARAN (IKPA) - BIRO KEUANGAN */}
        <div
          onClick={() => onSelectUnit?.('biro-keuangan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-3 py-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Kinerja Pelaksanaan Anggaran (IKPA) Kementerian Keuangan"
        >
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <TrendingUp className="w-3 h-3 text-blue-600" />
              </span>
              Indeks Pelaksanaan (IKPA)
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full text-[9.5px] shrink-0">
              Sangat Baik
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              96,25 / 100
            </span>
            <span className="text-[10px] text-slate-500 font-medium truncate">
              Target ≥ 95,00 &bull; Kemenkeu RI
            </span>
          </div>
        </div>

        {/* KPI 2: REALISASI SERAPAN BELANJA SATKER - BIRO KEUANGAN */}
        <div
          onClick={() => onSelectUnit?.('biro-keuangan')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-3 py-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Realisasi Belanja & Serapan Anggaran Satker Perkin A1"
        >
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Activity className="w-3 h-3 text-emerald-600" />
              </span>
              Serapan Belanja Satker
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.5 rounded-full text-[9.5px] shrink-0">
              94,8% Realisasi
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Rp 2,48 T
            </span>
            <span className="text-[10px] text-slate-500 font-medium truncate">
              Pagu Rp 2,62 T &bull; Efisiensi 94,4%
            </span>
          </div>
        </div>

        {/* KPI 3: INDEKS PROFESIONALITAS ASN (IP ASN) - BIRO SDM */}
        <div
          onClick={() => onSelectUnit?.('biro-sdm')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-3 py-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Profesionalitas ASN (IP ASN) & Layanan Kepegawaian"
        >
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Users className="w-3 h-3 text-indigo-600" />
              </span>
              Indeks Profesionalitas ASN
            </span>
            <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full text-[9.5px] shrink-0">
              Kategori Tinggi
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              84,60 / 100
            </span>
            <span className="text-[10px] text-slate-500 font-medium truncate">
              Target 80,00 &bull; 98,7% Layanan
            </span>
          </div>
        </div>

        {/* KPI 4: INDEKS MANAJEMEN RISIKO (MRI) - BIRO OKMR */}
        <div
          onClick={() => onSelectUnit?.('biro-organisasi')}
          className="bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 px-3 py-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Manajemen Risiko (MRI) BP Batam & Pengendalian Intern SPIP"
        >
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                <Target className="w-3 h-3 text-purple-600" />
              </span>
              Indeks Manajemen Risiko
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/90 px-1.5 py-0.5 rounded-full text-[9.5px] shrink-0">
              Tingkat 3 Managed
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              3,65 / 5,00
            </span>
            <span className="text-[10px] text-slate-500 font-medium truncate">
              Target 3,25 &bull; 94,2% Mitigasi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
