import React, { useState } from 'react';
import {
  Compass,
  Scale,
  ShieldCheck,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  IPPN_KOMPONEN_DATA,
  SPBE_DOMAINS_DATA,
  PTSP_IKM_9_UNSUR,
  IKK_DIMENSI_DATA,
} from './kebijakanStrategisData';

interface KebijakanStrategisVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// Data Radar Capaian 4 IKP Perkin A2 (Normalized to 100 for visual symmetry)
const RADAR_4_IKP_A2 = [
  { subject: '1. IPPN (Pusren)', target: 100, realisasi: 102.4, skorAsli: '94,20 / 100' },
  { subject: '2. IKK (Harmonisasi)', target: 100, realisasi: 110.5, skorAsli: '71,80 / 100' },
  { subject: '3. SPBE (PDSI)', target: 100, realisasi: 105.6, skorAsli: '4,12 / L4' },
  { subject: '4. IKM PTSP', target: 100, realisasi: 102.2, skorAsli: '88,42 / Mutu A' },
];

// Tren Tahunan IPPN
const IPPN_TREND_ANNUAL = [
  { tahun: '2022', skor: 88.5, target: 88.0 },
  { tahun: '2023', skor: 90.2, target: 90.0 },
  { tahun: '2024', skor: 92.1, target: 91.0 },
  { tahun: '2025', skor: 93.4, target: 92.0 },
  { tahun: '2026', skor: 94.2, target: 92.0 },
];

// Tren Tahunan IKK LAN RI
const IKK_TREND_ANNUAL = [
  { tahun: '2022', skor: 62.0, target: 60.0 },
  { tahun: '2023', skor: 65.5, target: 63.0 },
  { tahun: '2024', skor: 68.2, target: 65.0 },
  { tahun: '2025', skor: 70.4, target: 65.0 },
  { tahun: '2026', skor: 71.8, target: 65.0 },
];

// Tren Tahunan SPBE
const SPBE_TREND_ANNUAL = [
  { tahun: '2022', skor: 3.25, target: 3.00 },
  { tahun: '2023', skor: 3.52, target: 3.40 },
  { tahun: '2024', skor: 3.80, target: 3.60 },
  { tahun: '2025', skor: 3.98, target: 3.80 },
  { tahun: '2026', skor: 4.12, target: 3.90 },
];

// Tren Tahunan IKM PTSP
const IKM_TREND_ANNUAL = [
  { tahun: '2022', skor: 83.5, target: 82.0 },
  { tahun: '2023', skor: 85.2, target: 84.0 },
  { tahun: '2024', skor: 86.8, target: 85.0 },
  { tahun: '2025', skor: 87.6, target: 86.0 },
  { tahun: '2026', skor: 88.42, target: 86.5 },
];

export const KebijakanStrategisVisualCharts: React.FC<
  KebijakanStrategisVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Sheet swap tab state for 4 IKP (mirrors AdministrasiKeuanganVisualCharts)
  const [activeTab, setActiveTab] = useState<'ippn' | 'ikk' | 'spbe' | 'ikm'>('ippn');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5">
      {/* Two Column Grid - Model Terpadu Persis DEP-A1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 4 IKP + INSIGHT DI RADAR CAPAIAN    */}
        {/* ================================================================== */}
        <div className="lg:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Radar Capaian 4 IKP DEP-A2
              </h3>
              <p className="text-[10px] text-slate-500">
                Realisasi Aktual vs Target Perkin A2 2026
              </p>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
              0 - 130%
            </span>
          </div>

          {/* Radar Visual */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_4_IKP_A2} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
                <PolarGrid stroke="#CBD5E1" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#334155', fontSize: 9.5, fontWeight: 700 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 130]} stroke="#94A3B8" fontSize={8} />
                <Radar
                  name="Target Perkin (100%)"
                  dataKey="target"
                  stroke="#94A3B8"
                  fill="#94A3B8"
                  fillOpacity={0.12}
                  strokeDasharray="4 4"
                />
                <Radar
                  name="Realisasi Aktual"
                  dataKey="realisasi"
                  stroke="#0284C7"
                  fill="#0284C7"
                  fillOpacity={0.35}
                />
                <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '4px' }} />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${Number(val).toFixed(1)}% (${item.payload.skorAsli})`,
                    name,
                  ]}
                  contentStyle={{
                    fontSize: '11px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 2 Status Mini Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-200/60">
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <span className="text-[9.5px] text-slate-500 block">Kinerja Melampaui</span>
              <span className="text-[11px] font-bold text-emerald-700">IKK (110,5%) &bull; SPBE</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <span className="text-[9.5px] text-slate-500 block">Kinerja On Track</span>
              <span className="text-[11px] font-bold text-sky-700">IPPN (102,4%) &bull; IKM A</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KOLOM KANAN: TAB INTERAKTIF DETAIL 4 IKP (TABEL + GRAFIK + INSIGHT) */}
        {/* ================================================================== */}
        <div className="lg:col-span-7 space-y-3">
          {/* Tab Selector Pills (Sheet Swap 4 IKP) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/80 rounded-lg">
            <button
              onClick={() => setActiveTab('ippn')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'ippn'
                  ? 'bg-white text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>1. IPPN (Pusren)</span>
            </button>
            <button
              onClick={() => setActiveTab('ikk')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'ikk'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Scale className="w-3 h-3" />
              <span>2. IKK (Harmonisasi)</span>
            </button>
            <button
              onClick={() => setActiveTab('spbe')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'spbe'
                  ? 'bg-white text-indigo-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>3. SPBE (PDSI)</span>
            </button>
            <button
              onClick={() => setActiveTab('ikm')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'ikm'
                  ? 'bg-white text-emerald-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>4. IKM (PTSP)</span>
            </button>
          </div>

          {/* ================================================================ */}
          {/* TAB 1: INDEKS PERENCANAAN PEMBANGUNAN (IPPN)                     */}
          {/* ================================================================ */}
          {activeTab === 'ippn' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Indeks Perencanaan Pembangunan (IPPN SE Bappenas)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 font-mono">
                    102,4% Tercapai
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-1-perencanaan')}
                    className="text-[11px] font-medium text-sky-700 hover:text-sky-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 1 */}
              <div className="bg-sky-50/70 border border-sky-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-sky-950 font-bold">Insight Strategis IPPN:</strong> Penyelarasan Renstra 2025-2029 terhadap prioritas nasional meraih nilai 95,0 (poin 28,50). Alokasi RKA DIPA dan 5 masterplan wilayah memperkuat kepatuhan evaluasi SE Menteri PPN/Bappenas.
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">94,20 / 100</span>
                  <span className="text-[9.5px] text-sky-700 block mt-0.5">102,4% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">92,00</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">Sangat Baik</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Pusren P3S</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Pagu Rp 13,66 M</span>
                </div>
              </div>

              {/* Tabel Komponen IPPN & Tren Grafik */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                <div className="sm:col-span-7 overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[10.5px]">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-2">Komponen IPPN</th>
                        <th className="py-1.5 px-1.5 text-center">Bobot</th>
                        <th className="py-1.5 px-1.5 text-right">Nilai</th>
                        <th className="py-1.5 px-2 text-right">Poin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {IPPN_KOMPONEN_DATA.map((k) => (
                        <tr key={k.no} className="hover:bg-slate-50/60">
                          <td className="py-1.5 px-2 font-sans font-medium text-slate-800 text-[10px]">
                            {k.komponen}
                          </td>
                          <td className="py-1.5 px-1.5 text-center text-slate-500">{k.bobotPersen}%</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-800">{k.nilai.toFixed(1)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-sky-700">{k.poin.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-sky-50/60 font-bold border-t border-sky-200">
                        <td className="py-1.5 px-2 font-sans text-sky-950">Skor Akhir IPPN</td>
                        <td className="py-1.5 px-1.5 text-center text-sky-800">100%</td>
                        <td className="py-1.5 px-1.5 text-slate-500 text-right">-</td>
                        <td className="py-1.5 px-2 text-right text-sky-900 font-black">94.20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tren Skor Tahunan IPPN */}
                <div className="sm:col-span-5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-700 block mb-1">
                    Tren Skor IPPN (2022 - 2026)
                  </span>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={IPPN_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[85, 96]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: '10.5px', borderRadius: '6px' }} />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                        <Line type="monotone" dataKey="skor" stroke="#0284C7" strokeWidth={2} dot={{ r: 2.5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                    Tren konsisten meningkat dari 88,5 ke 94,20
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: INDEKS KUALITAS KEBIJAKAN (IKK)                           */}
          {/* ================================================================ */}
          {activeTab === 'ikk' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Indeks Kualitas Kebijakan (4 Tahap IKK LAN-RI)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                    110,5% Tercapai
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-2-kebijakan')}
                    className="text-[11px] font-medium text-blue-700 hover:text-blue-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 2 */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-blue-950 font-bold">Insight Strategis IKK:</strong> Agenda Setting (skor 74,0) dan Formulasi Kebijakan (skor 72,5) melampaui standar LAN RI. 42 Perka/Kepka berhasil disinkronkan 100% selaras dengan PP 41/2021.
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">71,80 / 100</span>
                  <span className="text-[9.5px] text-blue-700 block mt-0.5">110,5% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">65,00</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">Cukup Baik</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Pusat Harmonisasi</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Pagu Rp 4,55 M</span>
                </div>
              </div>

              {/* Tabel 4 Dimensi IKK & Tren Grafik */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                <div className="sm:col-span-7 overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[10.5px]">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-2">Dimensi IKK (LAN RI)</th>
                        <th className="py-1.5 px-1.5 text-center">Bobot</th>
                        <th className="py-1.5 px-1.5 text-right">Target</th>
                        <th className="py-1.5 px-2 text-right">Skor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {IKK_DIMENSI_DATA.map((d, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-1.5 px-2 font-sans font-medium text-slate-800 text-[10px]">
                            {d.dimensi}
                          </td>
                          <td className="py-1.5 px-1.5 text-center text-slate-500">{d.bobot}%</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-500">{d.target.toFixed(1)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-blue-700">{d.skor.toFixed(1)}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50/60 font-bold border-t border-blue-200">
                        <td className="py-1.5 px-2 font-sans text-blue-950">Skor Komposit IKK</td>
                        <td className="py-1.5 px-1.5 text-center text-blue-800">100%</td>
                        <td className="py-1.5 px-1.5 text-slate-500 text-right">65.0</td>
                        <td className="py-1.5 px-2 text-right text-blue-900 font-black">71.80</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tren Skor Tahunan IKK */}
                <div className="sm:col-span-5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-700 block mb-1">
                    Tren Skor IKK (2022 - 2026)
                  </span>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={IKK_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[55, 75]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: '10.5px', borderRadius: '6px' }} />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                        <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                    Skor meningkat bertahap melampaui target standar LAN RI
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: TINGKAT KEMATANGAN SPBE (PDSI)                            */}
          {/* ================================================================ */}
          {activeTab === 'spbe' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Tingkat Kematangan SPBE (6 Domain Arsitektur TIK)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
                    105,6% Tercapai
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-3-spbe')}
                    className="text-[11px] font-medium text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 3 */}
              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-700 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-indigo-950 font-bold">Insight Strategis SPBE:</strong> Kebijakan Internal (4,45) dan Layanan Administrasi Pemerintahan (4,30) mencapai Level 4 Terpadu. 48 aplikasi aktif terintegrasi Satu Data dan TTE tersertifikasi BSrE.
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">4,12 / 5,00</span>
                  <span className="text-[9.5px] text-indigo-700 block mt-0.5">Level 4 Terpadu</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">3,90</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">Sangat Baik</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">PDSI BP Batam</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Pagu Rp 53,78 M</span>
                </div>
              </div>

              {/* Tabel 6 Domain SPBE & Tren Grafik */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                <div className="sm:col-span-7 overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[10.5px]">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-2">Domain Arsitektur SPBE</th>
                        <th className="py-1.5 px-1.5 text-center">Bobot</th>
                        <th className="py-1.5 px-1.5 text-right">Target</th>
                        <th className="py-1.5 px-2 text-right">Skor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {SPBE_DOMAINS_DATA.map((d, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-1.5 px-2 font-sans font-medium text-slate-800 text-[10px]">
                            {d.domain}
                          </td>
                          <td className="py-1.5 px-1.5 text-center text-slate-500">{d.bobot}%</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-500">{d.target.toFixed(1)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-indigo-700">{d.skor.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-indigo-50/60 font-bold border-t border-indigo-200">
                        <td className="py-1.5 px-2 font-sans text-indigo-950">Indeks Komposit SPBE</td>
                        <td className="py-1.5 px-1.5 text-center text-indigo-800">100%</td>
                        <td className="py-1.5 px-1.5 text-slate-500 text-right">3.90</td>
                        <td className="py-1.5 px-2 text-right text-indigo-900 font-black">4.12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tren Skor Tahunan SPBE */}
                <div className="sm:col-span-5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-700 block mb-1">
                    Tren Skor SPBE (2022 - 2026)
                  </span>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={SPBE_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[3.0, 4.5]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: '10.5px', borderRadius: '6px' }} />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                        <Line type="monotone" dataKey="skor" stroke="#4F46E5" strokeWidth={2} dot={{ r: 2.5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                    Kenaikan bertahap Level 3 ke Level 4 Terpadu
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: IKM LAYANAN PTSP                                          */}
          {/* ================================================================ */}
          {activeTab === 'ikm' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Indeks Kepuasan Masyarakat (9 Unsur PermenPAN-RB 14/2017)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono">
                    102,2% Tercapai
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-4-ikm-ptsp')}
                    className="text-[11px] font-medium text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 4 */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-emerald-950 font-bold">Insight Strategis IKM PTSP:</strong> Mutu A (Sangat Baik) diraih dengan skor 88,42. Unsur biaya/tarif (92,1) dan perilaku pelaksana (91,2) tertinggi. Percepatan izin berusaha memangkas lead time rata-rata ke 2,1 hari kerja.
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">88,42 / 100</span>
                  <span className="text-[9.5px] text-emerald-700 block mt-0.5">Mutu A (Sangat Baik)</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">86,50</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">Sangat Baik</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">PTSP BP Batam</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Pagu Rp 3,88 M</span>
                </div>
              </div>

              {/* Tabel 9 Unsur IKM & Tren Grafik */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                <div className="sm:col-span-7 overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[10.5px]">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-2">Unsur Penilaian IKM</th>
                        <th className="py-1.5 px-1.5 text-right">Nilai</th>
                        <th className="py-1.5 px-2 text-center">Predikat Mutu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {PTSP_IKM_9_UNSUR.map((u) => (
                        <tr key={u.no} className="hover:bg-slate-50/60">
                          <td className="py-1 px-2 font-sans font-medium text-slate-800 text-[10px]">
                            {u.no}. {u.unsur}
                          </td>
                          <td className="py-1 px-1.5 text-right font-bold text-emerald-700">{u.skor.toFixed(1)}</td>
                          <td className="py-1 px-2 text-center text-[9.5px] text-slate-600">{u.mutu}</td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50/60 font-bold border-t border-emerald-200">
                        <td className="py-1.5 px-2 font-sans text-emerald-950">Skor Akhir IKM PTSP</td>
                        <td className="py-1.5 px-1.5 text-right text-emerald-900 font-black">88.42</td>
                        <td className="py-1.5 px-2 text-center text-emerald-800 text-[10px]">Mutu A (Sangat Baik)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Tren Skor Tahunan IKM */}
                <div className="sm:col-span-5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-700 block mb-1">
                    Tren Skor IKM PTSP (2022 - 2026)
                  </span>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={IKM_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[80, 92]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: '10.5px', borderRadius: '6px' }} />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                        <Line type="monotone" dataKey="skor" stroke="#059669" strokeWidth={2} dot={{ r: 2.5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                    Kepuasan masyarakat stabil pada kategori Mutu A
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
