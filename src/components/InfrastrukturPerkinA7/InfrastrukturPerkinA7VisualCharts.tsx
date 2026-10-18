import React, { useState } from 'react';
import {
  TrendingUp,
  HardHat,
  Coins,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileCode2,
  Layers,
  Sparkles,
  ChevronRight,
  Compass,
  Award,
  DollarSign,
  Route,
  Droplets,
  Trees,
  Zap,
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
  BarChart,
  Bar,
} from 'recharts';
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7VisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar / Target vs Realisasi Capaian 2 IKP Perkin A7 (Normalized to 100% target baseline)
const RADAR_2_IKP_A7 = [
  { subject: '1. Penyelenggaraan Fisik (3 Dit)', target: 100, realisasi: 92.4, skorAsli: '92,40% / 100%' },
  { subject: '2. PNBP ROW Utilitas/RTH', target: 100, realisasi: 109.22, skorAsli: 'Rp 7,45 M / Rp 6,82 M' },
  { subject: '3. Serapan Belanja Modal', target: 100, realisasi: 84.38, skorAsli: 'Rp 682,4 M / Rp 808,7 M' },
  { subject: '4. Kemantapan Jalan (Spasial)', target: 100, realisasi: 91.4, skorAsli: '496,1 Km / 542,8 Km' },
];

// Tren Tahunan IKP 1: Penyelenggaraan Infrastruktur (%)
const INFRASTRUKTUR_TREND_ANNUAL = [
  { tahun: '2022', realisasi: 86.4, target: 100.0 },
  { tahun: '2023', realisasi: 88.9, target: 100.0 },
  { tahun: '2024', realisasi: 90.5, target: 100.0 },
  { tahun: '2025', realisasi: 92.4, target: 100.0 },
  { tahun: '2026', realisasi: 95.0, target: 100.0 },
];

// Tren Tahunan IKP 2: Realisasi PNBP ROW Utilitas & Penghijauan (Rp Miliar)
const PNBP_TREND_ANNUAL = [
  { tahun: '2022', realisasi: 5.20, target: 4.80 },
  { tahun: '2023', realisasi: 5.85, target: 5.40 },
  { tahun: '2024', realisasi: 6.40, target: 6.00 },
  { tahun: '2025', realisasi: 7.45, target: 6.821 },
  { tahun: '2026', realisasi: 8.00, target: 7.20 },
];

// Tren Konsolidasi Sinergi 3 Satker DEP-A7
const SINERGI_TREND_ANNUAL = [
  { tahun: '2022', serapanPersen: 76.5, capaianIku: 86.4 },
  { tahun: '2023', serapanPersen: 79.2, capaianIku: 88.9 },
  { tahun: '2024', serapanPersen: 81.8, capaianIku: 90.5 },
  { tahun: '2025', serapanPersen: 84.38, capaianIku: 100.81 },
  { tahun: '2026', serapanPersen: 88.0, capaianIku: 102.5 },
];

export const InfrastrukturPerkinA7VisualCharts: React.FC<
  InfrastrukturPerkinA7VisualChartsProps
> = ({ onOpenFormulaModal, onNavigateToUnit }) => {
  // Tab state: ikp-1, ikp-2, matriks
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'matriks'>('ikp-1');

  const ikp1 = PERKIN_A7_KPIS[0];
  const ikp2 = PERKIN_A7_KPIS[1];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5 font-sans">
      {/* Two Column Grid: Left is Radar Chart, Right is Detailed Table + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 2 IKP + MAKRO DEP-A7               */}
        {/* ================================================================== */}
        <div className="lg:col-span-4 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Radar Capaian 2 IKP DEP-A7
                </h3>
                <p className="text-[10px] text-slate-500">
                  Realisasi Aktual vs Target Penetapan Perkin A7 2025
                </p>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                0 - 120%
              </span>
            </div>

            {/* Radar Visual */}
            <div className="h-56 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_2_IKP_A7} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#CBD5E1" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#334155', fontSize: 9.5, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 120]} stroke="#94A3B8" fontSize={8} />
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
                  <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '6px' }} />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${Number(val).toFixed(1)}% (${item.payload.skorAsli})`,
                      name,
                    ]}
                    contentStyle={{
                      fontSize: '11px',
                      borderRadius: '8px',
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-200/60 text-[10.5px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Status: 2 IKP Sesuai Target &amp; Surplus
            </span>
            <span className="font-mono text-emerald-600 font-bold">100.81% Rerata IKP</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KOLOM KANAN: TABEL DETAIL PERSIS MODEL DEP-A4 + GRAFIK TREN         */}
        {/* ================================================================== */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 space-y-3">
          {/* Header Tab Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/60 overflow-x-auto text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('ikp-1')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikp-1'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HardHat className="w-3.5 h-3.5 text-blue-600" />
                <span>IKP 1 &bull; Penyelenggaraan Fisik</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-2')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikp-2'
                    ? 'bg-white text-cyan-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-cyan-600" />
                <span>IKP 2 &bull; Realisasi PNBP</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('matriks')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'matriks'
                    ? 'bg-white text-purple-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>Sinergi 3 Dit &bull; Matriks Konsolidasi</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
              Perjanjian Kinerja {PERKIN_A7_METADATA.nomorPerkin}
            </div>
          </div>

          {/* TAB 1: IKP 1 - PENYELENGGARAAN INFRASTRUKTUR */}
          {activeTab === 'ikp-1' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Penyelenggaraan Infrastruktur Kawasan Batam (14 Paket Fisik)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                    92,4% Sesuai Rencana
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal(ikp1.id)}
                    className="text-[11px] font-medium text-blue-700 hover:text-blue-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">92,40%</span>
                  <span className="text-[9.5px] text-blue-700 block mt-0.5">14 Paket Strategis</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">100,00%</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">Sesuai Rencana DIPA</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Dit. Pembangunan</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Pagu Rp 842,5 M</span>
                </div>
              </div>

              {/* Tabel Rincian & Tren Grafik dalam 1 Baris (Side-by-Side Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <tbody>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="py-1.5 px-3 font-semibold text-slate-500 w-1/3">Indikator Kinerja</td>
                        <td className="py-1.5 px-3 font-bold text-slate-900">{ikp1.name}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Unit Pengampu</td>
                        <td className="py-1.5 px-3 text-slate-800">
                          Dit. Pembangunan (92,4%), Dit. Perencanaan (95,2%), Dit. Ditpam (89,6%)
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Target vs Realisasi</td>
                        <td className="py-1.5 px-3 font-mono font-bold text-slate-900">
                          Target: <span className="text-slate-700">100%</span> &bull; Realisasi:{' '}
                          <span className="text-blue-700">92,40%</span> &bull; Status:{' '}
                          <span className="text-emerald-700 font-bold">On Schedule</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Metode &amp; Formula</td>
                        <td className="py-1.5 px-3 font-mono text-slate-700">
                          % Capaian = (Capaian Pembangunan + Perencanaan + Ditpam) / 3
                        </td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Dataset Satu Data</td>
                        <td className="py-1.5 px-3 font-mono text-sky-800 text-[10.5px]">
                          Dit. Pembangunan No. 4 &amp; 6 &bull; Dit. Perencanaan No. 1-9 (Hal. 49-53)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Multi-Year Trend Chart (2022 - 2026) */}
                <div className="lg:col-span-5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 text-[10.5px]">
                      Tren Realisasi Fisik (2022 - 2026)
                    </span>
                    <span className="text-[9.5px] text-blue-600 font-mono font-bold">Satuan: %</span>
                  </div>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={INFRASTRUKTUR_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[80, 105]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: any, name: any) => [`${Number(v).toFixed(1)}%`, name]} contentStyle={{ fontSize: '10.5px', borderRadius: '6px' }} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target (100%)"
                          stroke="#94A3B8"
                          strokeDasharray="3 3"
                          strokeWidth={1.5}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="realisasi"
                          name="Realisasi Fisik"
                          stroke="#2563EB"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#2563EB' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                    Progres 14 paket proyek konstruksi rata-rata 92,40%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IKP 2 - NILAI REALISASI PNBP */}
          {activeTab === 'ikp-2' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Nilai Realisasi Penerimaan PNBP ROW Utilitas &amp; Penghijauan
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 font-mono">
                    109,2% Surplus Target
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal(ikp2.id)}
                    className="text-[11px] font-medium text-cyan-700 hover:text-cyan-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">Rp 7,45 Miliar</span>
                  <span className="text-[9.5px] text-cyan-700 block mt-0.5">109,2% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">Rp 6,82 Miliar</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">+Rp 629 Juta Surplus</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Dit. Pembangunan</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Subdit ROW Utilitas</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Side-by-Side Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <tbody>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="py-1.5 px-3 font-semibold text-slate-500 w-1/3">Indikator Kinerja</td>
                        <td className="py-1.5 px-3 font-bold text-slate-900">{ikp2.name}</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Unit Pengampu</td>
                        <td className="py-1.5 px-3 text-slate-800">
                          Dit. Pembangunan Infrastruktur (Subdit ROW Utilitas &amp; ROW Penghijauan)
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Target vs Realisasi</td>
                        <td className="py-1.5 px-3 font-mono font-bold text-slate-900">
                          Target: <span className="text-slate-700">Rp 6,821 M</span> &bull; Realisasi:{' '}
                          <span className="text-cyan-700">Rp 7,450 M</span> &bull; Status:{' '}
                          <span className="text-emerald-700 font-bold">Surplus +Rp 629 Jt</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Rincian Komponen</td>
                        <td className="py-1.5 px-3 text-slate-700">
                          ROW Kabel FO &amp; Pipa (Rp 5,25 M / 70,5%) &bull; ROW Penghijauan &amp; RTH (Rp 2,20 M / 29,5%)
                        </td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-1.5 px-3 font-semibold text-slate-500">Dataset Satu Data</td>
                        <td className="py-1.5 px-3 font-mono text-cyan-800 text-[10.5px]">
                          Dataset No. 1 (ROW Utilitas) &amp; Dataset No. 2 (ROW Penghijauan) Hal. 48 Buku Satu Data
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Multi-Year Trend Chart (2022 - 2026) */}
                <div className="lg:col-span-5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 text-[10.5px]">
                      Tren PNBP ROW (2022 - 2026)
                    </span>
                    <span className="text-[9.5px] text-cyan-700 font-mono font-bold">Satuan: Rp M</span>
                  </div>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PNBP_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[4.0, 9.0]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: any, name: any) => [`Rp ${Number(v).toFixed(2)} Miliar`, name]} contentStyle={{ fontSize: '10.5px', borderRadius: '6px' }} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target DIPA"
                          stroke="#94A3B8"
                          strokeDasharray="3 3"
                          strokeWidth={1.5}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="realisasi"
                          name="Realisasi PNBP"
                          stroke="#0891B2"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#0891B2' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                    Penerimaan konsisten melampaui target penetapan DIPA
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SINERGI 3 DIREKTORAT MATRIKS */}
          {activeTab === 'matriks' && (
            <div className="space-y-3">
              {/* Detailed Sinergi Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2 px-3">Unit Pelaksana</th>
                      <th className="py-2 px-3">Pagu DIPA</th>
                      <th className="py-2 px-3">Realisasi Belanja</th>
                      <th className="py-2 px-3">Serapan (%)</th>
                      <th className="py-2 px-3">Kontribusi IKP</th>
                      <th className="py-2 px-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-bold text-slate-900">Dit. Pembangunan Infrastruktur</td>
                      <td className="py-2 px-3 font-mono">Rp 742,82 M</td>
                      <td className="py-2 px-3 font-mono text-blue-700">Rp 602,87 M</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">81,2%</td>
                      <td className="py-2 px-3 font-bold text-emerald-700">Fisik 92,4% &bull; PNBP 109,2%</td>
                      <td className="py-2 px-3">
                        <button
                          type="button"
                          onClick={() => onNavigateToUnit?.('dit-pembangunan-infrastruktur')}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10px] cursor-pointer"
                        >
                          Deep-Dive &rarr;
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-bold text-slate-900">Dit. Perencanaan Infrastruktur</td>
                      <td className="py-2 px-3 font-mono">Rp 63,68 M</td>
                      <td className="py-2 px-3 font-mono text-purple-700">Rp 53,55 M</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">84,1%</td>
                      <td className="py-2 px-3 font-bold text-emerald-700">DED 43 Paket (95,2%)</td>
                      <td className="py-2 px-3">
                        <button
                          type="button"
                          onClick={() => onNavigateToUnit?.('dit-perencanaan-infrastruktur')}
                          className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-[10px] cursor-pointer"
                        >
                          Deep-Dive &rarr;
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-bold text-slate-900">Dit. Pengamanan Aset &amp; Kawasan</td>
                      <td className="py-2 px-3 font-mono">Rp 36,00 M</td>
                      <td className="py-2 px-3 font-mono text-amber-700">Rp 26,00 M</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">72,2%</td>
                      <td className="py-2 px-3 font-bold text-emerald-700">Steril ROW &amp; Obvit 89,6%</td>
                      <td className="py-2 px-3">
                        <button
                          type="button"
                          onClick={() => onNavigateToUnit?.('dit-pam-aset')}
                          className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-[10px] cursor-pointer"
                        >
                          Deep-Dive &rarr;
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-slate-100/70 font-black">
                      <td className="py-2 px-3 text-slate-900">KONSOLIDASI DEP-A7</td>
                      <td className="py-2 px-3 font-mono text-slate-900">Rp 842,50 M</td>
                      <td className="py-2 px-3 font-mono text-emerald-800">Rp 682,43 M</td>
                      <td className="py-2 px-3 font-mono text-emerald-800">81,0%</td>
                      <td className="py-2 px-3 font-mono text-emerald-800">Rerata IKP 100,81%</td>
                      <td className="py-2 px-3 text-[10px] text-slate-500 font-medium">Terpadu</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Multi-Year Synergy Trend */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    Korelasi Serapan Belanja Modal (%) vs Capaian IKP Rerata (2022 - 2026)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Satuan: Persen (%)</span>
                </div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SINERGI_TREND_ANNUAL} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 10 }} />
                      <YAxis domain={[70, 110]} tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${v}%`} />
                      <Tooltip formatter={(v: any, name: any) => [`${Number(v).toFixed(2)}%`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                      <Line
                        type="monotone"
                        dataKey="serapanPersen"
                        name="Serapan Belanja Modal"
                        stroke="#7C3AED"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="capaianIku"
                        name="Capaian IKP Rerata"
                        stroke="#059669"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#059669' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
