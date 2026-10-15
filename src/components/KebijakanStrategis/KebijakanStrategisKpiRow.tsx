import React from 'react';
import {
  Award,
  Layers,
  Scale,
  ShieldCheck,
  CheckCircle2,
  FileText,
  FileCheck,
  Sparkles,
  Compass,
  Zap,
  Target,
  BarChart3,
  Network,
  HelpCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { IKP_METRICS_LIST } from './kebijakanStrategisData';

interface KebijakanStrategisKpiRowProps {
  onOpenFormulaModal: (kpiId: string) => void;
  selectedUnit?: string;
  onSelectUnit?: (unitId: string) => void;
}

// Sparkline Mock Data for 4 IKPs in DEP-A2
const SPARKLINE_IKP1 = [
  { v: 88 }, { v: 90 }, { v: 91 }, { v: 92.5 }, { v: 93.8 }, { v: 94.2 },
];
const SPARKLINE_IKP2 = [
  { v: 62 }, { v: 64 }, { v: 66 }, { v: 68 }, { v: 70 }, { v: 71.8 },
];
const SPARKLINE_IKP3 = [
  { v: 3.4 }, { v: 3.6 }, { v: 3.75 }, { v: 3.9 }, { v: 4.02 }, { v: 4.12 },
];
const SPARKLINE_IKP4 = [
  { v: 82.5 }, { v: 84.1 }, { v: 85.6 }, { v: 86.8 }, { v: 87.5 }, { v: 88.42 },
];

export const KebijakanStrategisKpiRow: React.FC<KebijakanStrategisKpiRowProps> = ({
  onOpenFormulaModal,
  selectedUnit: _selectedUnit,
  onSelectUnit,
}) => {
  const ikpPusren = IKP_METRICS_LIST.find((k) => k.id === 'ikp-1-perencanaan') || IKP_METRICS_LIST[0];
  const ikpHarmonisasi = IKP_METRICS_LIST.find((k) => k.id === 'ikp-2-kebijakan') || IKP_METRICS_LIST[1];
  const ikpPdsi = IKP_METRICS_LIST.find((k) => k.id === 'ikp-3-spbe') || IKP_METRICS_LIST[2];
  const ikpPtsp = IKP_METRICS_LIST.find((k) => k.id === 'ikp-4-ikm-ptsp') || IKP_METRICS_LIST[3];

  return (
    <div className="space-y-2.5 font-sans">
      {/* ================================================================== */}
      {/* 1. BARIS ATAS: 4 KARTU IKP UTAMA DEP-A2 (KOMPAK, GRADIENT & EKSEKUTIF) */}
      {/* Model Persis DEP-A1: 4 Kolom dengan Sparkline Area Chart               */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* IKP 1: Indeks Perencanaan Pembangunan (IPPN) - PUSREN */}
        <div
          onClick={() => onOpenFormulaModal('ikp-1-perencanaan')}
          className="bg-gradient-to-br from-sky-600 via-sky-600 to-blue-700 text-white rounded-xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between border border-sky-500/40"
          title="Buka detail IKP 1 Indeks Perencanaan Pembangunan (IPPN)"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-sky-100">IKP 1 &bull; Pusren (IPPN)</span>
              <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs">
                <Compass className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-white tracking-tight block">
              94,20 / 100
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-sky-100/90">Target 92,00 (Sangat Baik)</span>
              <span className="font-bold text-white bg-white/20 px-1.5 py-0.2 rounded-full text-[9.5px] backdrop-blur-xs">
                {ikpPusren.capaianPersen.toFixed(1)}% Tercapai
              </span>
            </div>
          </div>

          <div className="h-6 w-full mt-1.5 pt-0.5 border-t border-white/15">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_IKP1} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sparkIkp1A2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#FFFFFF" strokeWidth={1.5} fill="url(#sparkIkp1A2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IKP 2: Indeks Kualitas Kebijakan (IKK) - HARMONISASI */}
        <div
          onClick={() => onOpenFormulaModal('ikp-2-kebijakan')}
          className="bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-blue-50/30 border border-blue-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 2 Indeks Kualitas Kebijakan (IKK)"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-blue-800">IKP 2 &bull; Harmonisasi (IKK)</span>
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Scale className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              71,80 / 100
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 65,00 (Cukup Baik)</span>
              <span className="font-bold text-blue-800 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpHarmonisasi.capaianPersen.toFixed(1)}% Melampaui
              </span>
            </div>
          </div>

          <div className="h-6 w-full mt-1.5 pt-0.5 border-t border-blue-200/50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_IKP2} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sparkIkp2A2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={1.5} fill="url(#sparkIkp2A2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IKP 3: Tingkat Kematangan SPBE - PDSI */}
        <div
          onClick={() => onOpenFormulaModal('ikp-3-spbe')}
          className="bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-indigo-50/30 border border-indigo-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 3 Tingkat Kematangan SPBE"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-indigo-800">IKP 3 &bull; SPBE (PDSI)</span>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              4,12 / Level 4
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 3,90 (Terpadu)</span>
              <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpPdsi.capaianPersen.toFixed(1)}% Optimal
              </span>
            </div>
          </div>

          <div className="h-6 w-full mt-1.5 pt-0.5 border-t border-indigo-200/50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_IKP3} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sparkIkp3A2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#4F46E5" strokeWidth={1.5} fill="url(#sparkIkp3A2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IKP 4: IKM Pengguna Layanan PTSP - PTSP */}
        <div
          onClick={() => onOpenFormulaModal('ikp-4-ikm-ptsp')}
          className="bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-emerald-50/30 border border-emerald-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Buka detail IKP 4 IKM Layanan PTSP"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-emerald-800">IKP 4 &bull; IKM PTSP</span>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight block">
              88,42 / Mutu A
            </span>
            <div className="flex items-center justify-between text-[10.5px] mt-0.5">
              <span className="text-slate-500 font-medium">Target 86,50 (Sangat Baik)</span>
              <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs">
                {ikpPtsp.capaianPersen.toFixed(1)}% Sangat Baik
              </span>
            </div>
          </div>

          <div className="h-6 w-full mt-1.5 pt-0.5 border-t border-emerald-200/50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_IKP4} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sparkIkp4A2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#059669" strokeWidth={1.5} fill="url(#sparkIkp4A2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. BARIS KEDUA: 8 KARTU KPI OPERASIONAL ULTRA-SLIM                   */}
      {/* Sesuai Permintaan Poin 5:                                          */}
      {/* - KPI turunan tidak boleh menduplikasi visualisasi di unit deep dive */}
      {/*   (misalnya panjang FO 151,2 km sudah ada di deep dive, jadi TIDAK   */}
      {/*   dimasukkan ke sini).                                               */}
      {/* - Mengambil KPI strategis dari 4 unit kerja DEP-A2:                */}
      {/*   Pusren, Harmonisasi, PDSI, PTSP dari Buku Satu Data                  */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {/* KPI 1: KESELARASAN RENSTRA & DIPA THD PRIORITAS NASIONAL (PUSREN - DATASET #3) */}
        <div
          onClick={() => onSelectUnit?.('pusat-perencanaan-program')}
          className="bg-gradient-to-br from-sky-50/80 via-blue-50/40 to-white rounded-lg border border-sky-200/80 hover:border-sky-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Keselarasan Renstra & DIPA thd Prioritas Nasional (Buku Satu Data Pusren Hal. 51)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                <Compass className="w-2.5 h-2.5" />
              </span>
              Keselarasan Renstra
            </span>
            <span className="font-bold text-sky-800 bg-white/90 border border-sky-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Optimal
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              98,2% Selaras
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Evaluasi SE Bappenas
            </span>
          </div>
        </div>

        {/* KPI 2: KETERCAPAIAN RINCIAN OUTPUT (RO) RENSTRA (PUSREN - DATASET #17) */}
        <div
          onClick={() => onSelectUnit?.('pusat-perencanaan-program')}
          className="bg-gradient-to-br from-blue-50/80 via-sky-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Ketercapaian Rincian Output (RO) Renstra BP Batam (Dataset No. 17)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Target className="w-2.5 h-2.5" />
              </span>
              Target RO Renstra
            </span>
            <span className="font-bold text-blue-700 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              96,5% Selesai
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              28 / 29 RO
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Target KRO DIPA On Track
            </span>
          </div>
        </div>

        {/* KPI 3: SINKRONISASI EKSTERNAL REGULASI K/L & PP 41/2021 (HARMONISASI - DATASET #2) */}
        <div
          onClick={() => onSelectUnit?.('pusat-harmonisasi')}
          className="bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-white rounded-lg border border-indigo-200/80 hover:border-indigo-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Sinkronisasi Regulasi Internal-Eksternal dengan Regulasi K/L Pusat (Hal. 12)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                <FileCheck className="w-2.5 h-2.5" />
              </span>
              Sinkronisasi Regulasi K/L
            </span>
            <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              100% Selaras
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              42 Perka Diselaraskan
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Harmonisasi PP 41/2021
            </span>
          </div>
        </div>

        {/* KPI 4: SURVEI KEWAJARAN 7 LEVEL TARIF BADAN USAHA (HARMONISASI - DATASET #5) */}
        <div
          onClick={() => onSelectUnit?.('pusat-harmonisasi')}
          className="bg-gradient-to-br from-teal-50/80 via-emerald-50/40 to-white rounded-lg border border-teal-200/80 hover:border-teal-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Uji Kewajaran Tarif Layanan Badan Usaha BP Batam (Dataset No. 5 Hal. 13)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                <Scale className="w-2.5 h-2.5" />
              </span>
              Kewajaran Tarif Layanan
            </span>
            <span className="font-bold text-teal-800 bg-white/90 border border-teal-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Validasi 7 Level
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              89,2% Wajar
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Survei Pelaku Usaha
            </span>
          </div>
        </div>

        {/* KPI 5: PENERAPAN TANDA TANGAN ELEKTRONIK (TTE) PADA SISTEM (PDSI - DATASET #15) */}
        <div
          onClick={() => onSelectUnit?.('pdsi')}
          className="bg-gradient-to-br from-indigo-50/80 via-sky-50/40 to-white rounded-lg border border-indigo-200/80 hover:border-indigo-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Integrasi Tanda Tangan Elektronik Tersertifikasi BSrE (Dataset No. 15 Hal. 42)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-2.5 h-2.5" />
              </span>
              Integrasi TTE BSrE
            </span>
            <span className="font-bold text-indigo-800 bg-white/90 border border-indigo-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              BSrE Certified
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              48 Aplikasi TTE
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              100% Modul Naskah Dinas
            </span>
          </div>
        </div>

        {/* KPI 6: EFISIENSI WAKTU PENERBITAN IZIN BERUSAHA (PTSP - DATASET #17) */}
        <div
          onClick={() => onSelectUnit?.('ptsp')}
          className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Lead Time Penerbitan Izin Berusaha vs Batas Waktu Standar (Dataset No. 17 Hal. 28)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                <Zap className="w-2.5 h-2.5" />
              </span>
              Kecepatan Terbit Izin
            </span>
            <span className="font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              EODB Unggul
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              2,1 Hari Kerja
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              Standar PP: 5 Hari Kerja
            </span>
          </div>
        </div>

        {/* KPI 7: TINGKAT PENYELESAIAN PENGADUAN LAYANAN MPP (PTSP - DATASET #6) */}
        <div
          onClick={() => onSelectUnit?.('ptsp')}
          className="bg-gradient-to-br from-blue-50/80 via-teal-50/40 to-white rounded-lg border border-blue-200/80 hover:border-blue-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tindak Lanjut & Solusi Pengaduan Masyarakat Mal Pelayanan Publik (Dataset No. 6 Hal. 24)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <CheckCircle2 className="w-2.5 h-2.5" />
              </span>
              Penyelesaian Aduan MPP
            </span>
            <span className="font-bold text-blue-700 bg-white/90 border border-blue-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              SP4N Lapor
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              98,4% Selesai
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              122 dari 124 Aduan Tuntas
            </span>
          </div>
        </div>

        {/* KPI 8: TINDAK LANJUT HASIL RAPIM & RDP DEPUTI A2 (HARMONISASI - DATASET #6 & 7) */}
        <div
          onClick={() => onSelectUnit?.('pusat-harmonisasi')}
          className="bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-white rounded-lg border border-purple-200/80 hover:border-purple-400 px-2.5 py-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          title="Tindak Lanjut Risalah RDP & Rapim Koordinasi Kebijakan (Dataset No. 6 & 7 Hal. 13)"
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                <FileText className="w-2.5 h-2.5" />
              </span>
              Tindak Lanjut Rapim
            </span>
            <span className="font-bold text-purple-800 bg-white/90 border border-purple-200 px-1.5 py-0.2 rounded-full text-[9.5px] shadow-2xs shrink-0">
              Akuntabel
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              94,5% Tuntas
            </span>
            <span className="text-[9.5px] text-slate-500 font-medium truncate">
              76 dari 80 Arahan Strategis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
