import React from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Award,
  Clock,
  Activity,
  CheckCircle2,
  TrendingUp,
  Target,
  FileText,
  FileCheck,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { PERKIN_A1_KPIS } from './administrasiKeuanganData';

interface AdministrasiKeuanganKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedKpiId?: string | null;
  onSelectUnit?: (unitId: string) => void;
}

// Sparkline Mock Data for 4 IKPs
const SPARKLINE_IKP1 = [
  { v: 72 }, { v: 74 }, { v: 76 }, { v: 75 }, { v: 77 }, { v: 78.45 },
];
const SPARKLINE_IKP2 = [
  { v: 290 }, { v: 310 }, { v: 315 }, { v: 330 }, { v: 338 }, { v: 342.5 },
];
const SPARKLINE_IKP3 = [
  { v: 3.1 }, { v: 3.18 }, { v: 3.25 }, { v: 3.32 }, { v: 3.38 }, { v: 3.42 },
];
const SPARKLINE_IKP4 = [
  { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 }, { v: 100 },
];

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
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A1 (KOMPAK & EKSEKUTIF)        */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Indeks Reformasi Birokrasi */}
        <div
          onClick={() => onOpenFormulaModal('ikp-1-rb')}
          className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40"
          title="Buka detail IKP 1 Reformasi Birokrasi"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-100">IKP 1 &bull; Reformasi RB</span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-white tracking-tight block">
              78,45 / BB
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-blue-100/90">Target BB (75,00)</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikpRb.capaianPersen.toFixed(1)}% Tercapai
              </span>
            </div>
          </div>
        </div>

        {/* IKP 2: Indeks Sistem Merit */}
        <div
          onClick={() => onOpenFormulaModal('ikp-2-merit')}
          className="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 2 Sistem Merit"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-800">IKP 2 &bull; Sistem Merit</span>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Users className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              342,5 / IV
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 280 (Baik)</span>
              <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpMerit.capaianPersen.toFixed(1)}% Sangat Baik
              </span>
            </div>
          </div>
        </div>

        {/* IKP 3: Indeks Maturitas SPIP */}
        <div
          onClick={() => onOpenFormulaModal('ikp-3-spip')}
          className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/30 border border-amber-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 3 Maturitas SPIP"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-amber-800">IKP 3 &bull; Maturitas SPIP</span>
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              3,42 / Level 3
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 3,20</span>
              <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpSpip.capaianPersen.toFixed(1)}% Terdefinisi
              </span>
            </div>
          </div>
        </div>

        {/* IKP 4: Opini BPK Laporan Keuangan */}
        <div
          onClick={() => onOpenFormulaModal('ikp-4-wtp')}
          className="bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-purple-50/30 border border-purple-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 4 Opini BPK WTP"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-purple-800">IKP 4 &bull; Opini BPK RI</span>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              WTP
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">8x Berturut-turut</span>
              <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                100% Tercapai
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 8 KARTU KPI OPERASIONAL ULTRA-SLIM                   */}
      {/* Sesuai instruksi 4, 7, dan 8:                                      */}
      {/* - Realisasi pendapatan, belanja, kas & bank, piutang, ip asn, dan   */}
      {/*   20 jp pelatihan DIHAPUS agar tidak duplikat dengan deep dive.      */}
      {/* - Ditambahkan Indeks Manajemen Risiko (MRI) dan KPI strategis baru  */}
      {/*   dari Buku Satu Data yang belum ada di deep dive.                   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: INDEKS MANAJEMEN RISIKO (MRI) - REQ #7 & DATASET #18 */}
        <div
          onClick={() => onSelectUnit?.('biro-organisasi')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Manajemen Risiko (MRI) BP Batam (Dataset #18)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <Target className="w-2.5 h-2.5" />
              </span>
              Indeks Manajemen Risiko
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Tingkat 3 Managed
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              3,65 / 5,00
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Target 3,25 &bull; 94,2% Mitigasi
            </span>
          </div>
        </div>

        {/* KPI 2: PENYELESAIAN MODERNISASI PENGELOLAAN BLU - DATASET #7 */}
        <div
          onClick={() => onSelectUnit?.('biro-keuangan')}
          className="bg-gradient-to-br from-blue-50/80 via-sky-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Persentase Penyelesaian Modernisasi Pengelolaan BLU (Dataset #7)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-2.5 h-2.5" />
              </span>
              Modernisasi BLU
            </span>
            <span className="font-bold text-blue-700 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Sesuai Target
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              93,2% Tuntas
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Integrasi BIOS &amp; Cash Hub
            </span>
          </div>
        </div>

        {/* KPI 3: KEPATUHAN STANDAR OPERASIONAL PROSEDUR (SOP) & PROBIS - DATASET #1 */}
        <div
          onClick={() => onSelectUnit?.('biro-organisasi')}
          className="bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-white rounded-lg border border-indigo-200/80 hover:border-indigo-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kepatuhan SOP dan Proses Bisnis Terstandarisasi SPBE (Dataset #1)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                <FileCheck className="w-2.5 h-2.5" />
              </span>
              Kepatuhan SOP &amp; Probis
            </span>
            <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Level 3 SPBE
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              94,9% Patuh
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              486 dari 512 SOP Aktif
            </span>
          </div>
        </div>

        {/* KPI 4: KETEPATAN LAYANAN PEGAWAI (KGB & PANGKAT) - DATASET #4 & #5 */}
        <div
          onClick={() => onSelectUnit?.('biro-sdm')}
          className="bg-gradient-to-br from-teal-50/80 via-emerald-50/40 to-white rounded-lg border border-teal-200/80 hover:border-teal-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Ketepatan Waktu Kenaikan Gaji Berkala & Pangkat Pegawai (Dataset #4 & #5)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                <Clock className="w-2.5 h-2.5" />
              </span>
              Ketepatan Layanan ASN
            </span>
            <span className="font-bold text-teal-800 bg-white/90 border border-teal-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Nol Sanggah
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              98,7% Tepat Waktu
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              742 ASN Otomasi SIASN
            </span>
          </div>
        </div>

        {/* KPI 5: REKOMENDASI PENGAWASAN BLU (DEWAS & SPI) - DATASET #6 */}
        <div
          onClick={() => onSelectUnit?.('biro-organisasi')}
          className="bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-white rounded-lg border border-purple-200/80 hover:border-purple-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tindak Lanjut Rekomendasi Pengawasan Dewas & SPI BLU (Dataset #6)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                <Scale className="w-2.5 h-2.5" />
              </span>
              Pengawasan BLU
            </span>
            <span className="font-bold text-purple-800 bg-white/90 border border-purple-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Dewas &amp; SPI
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              95,8% Tuntas
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              448/467 Rekomendasi Selesai
            </span>
          </div>
        </div>

        {/* KPI 6: KESESUAIAN BEBAN KERJA (ANJAB/ABK) - DATASET #13 */}
        <div
          onClick={() => onSelectUnit?.('biro-sdm')}
          className="bg-gradient-to-br from-cyan-50/80 via-sky-50/40 to-white rounded-lg border border-cyan-200/80 hover:border-cyan-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Kesesuaian Analisa Jabatan dan Beban Kerja (Dataset #13)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-cyan-600 text-white flex items-center justify-center font-bold shrink-0">
                <Users className="w-2.5 h-2.5" />
              </span>
              Formasi Anjab / ABK
            </span>
            <span className="font-bold text-cyan-800 bg-white/90 border border-cyan-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Peta Optimal
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              92,4% Sesuai
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Rerata Beban Kerja 110,5%
            </span>
          </div>
        </div>

        {/* KPI 7: PEMENUHAN KONTRAK KINERJA IKU SATKER - DATASET #5 */}
        <div
          onClick={() => onSelectUnit?.('biro-organisasi')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Pemenuhan Kontrak Kinerja IKU Satker Triwulanan (Dataset #5)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <TrendingUp className="w-2.5 h-2.5" />
              </span>
              Kontrak Kinerja IKU
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Melampaui
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              102,1% Tercapai
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Evaluasi Seluruh Satker A1
            </span>
          </div>
        </div>

        {/* KPI 8: INDEKS REFORMASI KEBIJAKAN (IRK) PUBLIK - DATASET REGULASI BOKMR */}
        <div
          onClick={() => onSelectUnit?.('biro-organisasi')}
          className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-white rounded-lg border border-amber-200/80 hover:border-amber-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Indeks Reformasi Kebijakan Publik & Kualitas Regulasi Perka BP Batam"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold shrink-0">
                <FileText className="w-2.5 h-2.5" />
              </span>
              Reformasi Kebijakan (IRK)
            </span>
            <span className="font-bold text-amber-800 bg-white/90 border border-amber-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Kategori A
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              84,75 / 100
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Harmonisasi Regulasi Perka
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
