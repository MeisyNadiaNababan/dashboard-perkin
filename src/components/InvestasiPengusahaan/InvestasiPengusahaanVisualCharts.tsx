import React, { useState } from 'react';
import {
  TrendingUp,
  Globe,
  Building2,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileCode2,
  Layers,
  Sparkles,
  ChevronRight,
  Briefcase,
  Award,
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
import { PERKIN_A4_KPIS } from './investasiPengusahaanData';

interface InvestasiPengusahaanVisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar Capaian 4 IKP Perkin A4 (Normalized to 100% target baseline)
const RADAR_4_IKP_A4 = [
  { subject: '1. Investasi (Dit. Investasi)', target: 100, realisasi: 106.4, skorAsli: 'Rp 63,85 T / Rp 60 T' },
  { subject: '2. Promosi (Dit. Investasi)', target: 100, realisasi: 109.0, skorAsli: '218 Leads / 200 Leads' },
  { subject: '3. Kajian KEK (Dit. KEK)', target: 100, realisasi: 100.0, skorAsli: '100% / 100%' },
  { subject: '4. Pengendalian BU (Dit. Pengendalian)', target: 100, realisasi: 95.5, skorAsli: '95,45% / 100%' },
];

// Tren Tahunan IKP 1: Realisasi Penanaman Modal (Rp Triliun)
const INVESTASI_TREND_ANNUAL = [
  { tahun: '2022', skor: 48.2, target: 45.0 },
  { tahun: '2023', skor: 52.4, target: 50.0 },
  { tahun: '2024', skor: 54.2, target: 52.0 },
  { tahun: '2025', skor: 63.85, target: 60.0 },
  { tahun: '2026', skor: 68.5, target: 65.0 },
];

// Tren Tahunan IKP 2: Minat Investasi dari Promosi (Leads)
const PROMOSI_TREND_ANNUAL = [
  { tahun: '2022', skor: 145, target: 140 },
  { tahun: '2023', skor: 168, target: 160 },
  { tahun: '2024', skor: 185, target: 180 },
  { tahun: '2025', skor: 218, target: 200 },
  { tahun: '2026', skor: 240, target: 220 },
];

// Tren Tahunan IKP 3: Kajian KEK Berkelanjutan (%)
const KEK_TREND_ANNUAL = [
  { tahun: '2022', skor: 100, target: 100 },
  { tahun: '2023', skor: 100, target: 100 },
  { tahun: '2024', skor: 100, target: 100 },
  { tahun: '2025', skor: 100, target: 100 },
  { tahun: '2026', skor: 100, target: 100 },
];

// Tren Tahunan IKP 4: Pengendalian Pengusahaan & Kerja Sama (%)
const PENGENDALIAN_TREND_ANNUAL = [
  { tahun: '2022', skor: 82.4, target: 80.0 },
  { tahun: '2023', skor: 85.8, target: 85.0 },
  { tahun: '2024', skor: 88.5, target: 90.0 },
  { tahun: '2025', skor: 95.45, target: 100.0 },
  { tahun: '2026', skor: 97.2, target: 100.0 },
];

// Tren Konsolidasi Sinergi 3 Satker DEP-A4
const SINERGI_TREND_ANNUAL = [
  { tahun: '2022', serapanPersen: 38.5, capaianIku: 98.4 },
  { tahun: '2023', serapanPersen: 40.2, capaianIku: 100.2 },
  { tahun: '2024', serapanPersen: 41.5, capaianIku: 101.5 },
  { tahun: '2025', serapanPersen: 42.6, capaianIku: 102.72 },
  { tahun: '2026', serapanPersen: 45.0, capaianIku: 104.5 },
];

export const InvestasiPengusahaanVisualCharts: React.FC<
  InvestasiPengusahaanVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Tab state: ikp-1, ikp-2, ikp-3, ikp-4, matriks
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'ikp-3' | 'ikp-4' | 'matriks'>('ikp-1');

  const ikpInvestasi = PERKIN_A4_KPIS[0];
  const ikpPromosi = PERKIN_A4_KPIS[1];
  const ikpKek = PERKIN_A4_KPIS[2];
  const ikpPengendalian = PERKIN_A4_KPIS[3];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5 font-sans">
      {/* Two Column Grid: Left is Radar Chart (NO MINI CARDS BELOW IT AS REQUESTED), Right is Detailed Table + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 4 IKP (TANPA KARTU MINI DI BAWAHNYA) */}
        {/* ================================================================== */}
        <div className="lg:col-span-4 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Radar Capaian 4 IKP DEP-A4
                </h3>
                <p className="text-[10px] text-slate-500">
                  Realisasi Aktual vs Target Penetapan Perkin A4 2025
                </p>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                0 - 130%
              </span>
            </div>

            {/* Radar Visual */}
            <div className="h-56 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_4_IKP_A4} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
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
              Status: 4 IKP Optimal On Track
            </span>
            <span className="font-mono text-emerald-600 font-bold">102.72% Rerata</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KOLOM KANAN: TABEL DETAIL PERSIS GAMBAR REFERENSI + GRAFIK TREN     */}
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
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>IKP 1 &bull; Investasi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-2')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikp-2'
                    ? 'bg-white text-sky-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>IKP 2 &bull; Promosi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-3')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikp-3'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>IKP 3 &bull; KEK</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-4')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ikp-4'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>IKP 4 &bull; Pengendalian BU</span>
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
                <span>Matriks Sinergi Satker</span>
              </button>
            </div>

            {onOpenFormulaModal && (
              <button
                onClick={() =>
                  onOpenFormulaModal(
                    activeTab === 'ikp-1'
                      ? 'ikp-1-investasi-kpbpb'
                      : activeTab === 'ikp-2'
                      ? 'ikp-2-promosi-investasi'
                      : activeTab === 'ikp-3'
                      ? 'ikp-3-kajian-kek'
                      : activeTab === 'ikp-4'
                      ? 'ikp-4-pengendalian-pengusahaan'
                      : 'ikp-1-investasi-kpbpb'
                  )
                }
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Lihat Metodologi Formula</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* DYNAMIC TAB BODY: SIDE-BY-SIDE (DETAIL TABEL & GRAFIK TREN SEPERTI DEP-A3) */}

          {/* TAB 1: IKP-1 DIT. INVESTASI */}
          {activeTab === 'ikp-1' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
              {/* KOLOM A: TABEL PERUSAHAAN SAMPEL INVESTASI */}
              <div className="xl:col-span-7 bg-white rounded-xl border border-blue-200 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      IKP-1 &bull; DIT. INVESTASI
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      106.42% Melampaui Target
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Meningkatnya Kualitas Pelayanan Penanaman Modal di KPBPB Batam
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Unit: Direktorat Investasi (Sumber: KPU Bea Cukai, BPS, BKPM/OSS)
                  </p>

                  <div className="flex items-baseline justify-between mt-2 mb-2 pb-2 border-b border-blue-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-blue-700">Rp 63,85</span>
                      <span className="text-xs font-bold text-slate-600">Triliun Rupiah</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500">
                      Target: <strong className="text-slate-800">Rp 60,00 T</strong> <span className="text-emerald-600 font-bold">(+Rp 3,85 T)</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1">
                    <span>Realisasi Penanaman Modal (5 Perusahaan Sampel):</span>
                    <span className="text-[9.5px] font-normal text-slate-400">Modal Tetap &amp; Lancar</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                          <th className="py-1 px-1.5">NAMA PERUSAHAAN</th>
                          <th className="py-1 px-1.5">SEKTOR / WILAYAH</th>
                          <th className="py-1 px-1.5 text-center">JENIS</th>
                          <th className="py-1 px-1.5 text-right">NILAI (RP T)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1 px-1.5 font-medium">PT Schneider Electric Batam</td>
                          <td className="py-1 px-1.5 text-slate-500">Semikonduktor &bull; Batamindo</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9px]"><span className="px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">PMA</span></td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">Rp 5,40 T</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">PT Pegatron Technology Batam</td>
                          <td className="py-1 px-1.5 text-slate-500">Elektronik &bull; Batamindo</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9px]"><span className="px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">PMA</span></td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">Rp 6,25 T</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">PT Nongsa Digital Park Data Center</td>
                          <td className="py-1 px-1.5 text-slate-500">Data Center &bull; KEK Nongsa</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9px]"><span className="px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">PMDN</span></td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">Rp 4,89 T</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">PT McDermott Indonesia</td>
                          <td className="py-1 px-1.5 text-slate-500">Konstruksi Lepas Pantai &bull; Batu Ampar</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9px]"><span className="px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">PMA</span></td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">Rp 4,15 T</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">PT Infineon Technologies Batam</td>
                          <td className="py-1 px-1.5 text-slate-500">Semikonduktor &bull; Batamindo</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9px]"><span className="px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">PMA</span></td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">Rp 3,80 T</td>
                        </tr>
                        <tr className="bg-blue-50/60 font-bold border-t border-blue-200">
                          <td className="py-1 px-1.5 text-blue-900">Total Realisasi Investasi</td>
                          <td className="py-1 px-1.5 text-[10px] text-blue-700">PMA 74,7% &bull; PMDN 25,3%</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9px] text-blue-800">100%</td>
                          <td className="py-1 px-1.5 text-right font-mono text-blue-800">Rp 63,85 T</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-1-investasi-kpbpb')}
                    className="text-[10.5px] font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Lihat Manual &amp; Formula IKP-1 (Penanaman Modal)</span>
                  </button>
                </div>
              </div>

              {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
              <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-slate-800">
                      Tren Historis Realisasi Investasi (2022 - 2026)
                    </h5>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Rp Triliun
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Trajektori realisasi investasi PMA dan PMDN di KPBPB Batam
                  </p>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={INVESTASI_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <YAxis domain={[40, 75]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [`Rp ${val} Triliun`, name]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target Perkin"
                          stroke="#94A3B8"
                          strokeDasharray="4 4"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="skor"
                          name="Realisasi Investasi"
                          stroke="#2563EB"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#2563EB' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Surplus Capaian</span>
                    <span className="text-xs font-black text-emerald-600">+Rp 3,85 T (+6,4%)</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Pertumbuhan YoY</span>
                    <span className="text-xs font-black text-blue-700">+17,80% YoY</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IKP-2 DIT. INVESTASI (PROMOSI & MINAT) */}
          {activeTab === 'ikp-2' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
              {/* KOLOM A: TABEL AGENDA PROMOSI & MINAT INVESTASI */}
              <div className="xl:col-span-7 bg-white rounded-xl border border-sky-200 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-sky-700" />
                      IKP-2 &bull; DIT. INVESTASI (PROMOSI)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      109.00% Melampaui Target
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Terlaksananya Kegiatan Promosi Dalam Maupun Luar Negeri
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Unit: Direktorat Investasi (Log Promosi, Pameran &amp; Business Matching)
                  </p>

                  <div className="flex items-baseline justify-between mt-2 mb-2 pb-2 border-b border-sky-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-sky-700">218</span>
                      <span className="text-xs font-bold text-slate-600">Minat Investasi (Leads)</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500">
                      Target: <strong className="text-slate-800">200 Minat</strong> <span className="text-emerald-600 font-bold">(+18 Minat)</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1">
                    <span>Agenda Promosi &amp; Minat Investasi (5 Kegiatan Sampel):</span>
                    <span className="text-[9.5px] font-normal text-slate-400">97 Agenda Aktif</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                          <th className="py-1 px-1.5">NAMA KEGIATAN PROMOSI</th>
                          <th className="py-1 px-1.5">LOKASI / NEGARA</th>
                          <th className="py-1 px-1.5 text-center">TAMU</th>
                          <th className="py-1 px-1.5 text-right">MINAT (LEADS)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Hannover Messe Industri</td>
                          <td className="py-1 px-1.5 text-slate-500">Hannover, Jerman</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">1.250</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-sky-700">42 Leads</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Singapore Business Mission</td>
                          <td className="py-1 px-1.5 text-slate-500">Singapura</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">890</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-sky-700">58 Leads</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Tokyo High-Tech Investment Forum</td>
                          <td className="py-1 px-1.5 text-slate-500">Tokyo, Jepang</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">620</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-sky-700">36 Leads</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Batam International Business Summit</td>
                          <td className="py-1 px-1.5 text-slate-500">Batam, Indonesia</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">1.840</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-sky-700">54 Leads</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Taipei Electronics Show</td>
                          <td className="py-1 px-1.5 text-slate-500">Taipei, Taiwan</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">920</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-sky-700">28 Leads</td>
                        </tr>
                        <tr className="bg-sky-50/60 font-bold border-t border-sky-200">
                          <td className="py-1 px-1.5 text-sky-950">Total Kumulatif Promosi</td>
                          <td className="py-1 px-1.5 text-[10px] text-sky-800">97 Pelaksanaan Promosi</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9.5px] text-sky-900">5.520</td>
                          <td className="py-1 px-1.5 text-right font-mono text-sky-900">218 Leads</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-2-promosi-investasi')}
                    className="text-[10.5px] font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Lihat Manual &amp; Formula IKP-2 (Promosi Investasi)</span>
                  </button>
                </div>
              </div>

              {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
              <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-slate-800">
                      Tren Minat Investasi Promosi (2022 - 2026)
                    </h5>
                    <span className="text-[10px] font-mono font-bold text-sky-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Minat (Leads)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Jumlah calon investor potensial hasil promosi aktif
                  </p>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PROMOSI_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <YAxis domain={[120, 260]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [`${val} Leads`, name]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target Perkin"
                          stroke="#94A3B8"
                          strokeDasharray="4 4"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="skor"
                          name="Realisasi Minat"
                          stroke="#0284C7"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#0284C7' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Surplus Capaian</span>
                    <span className="text-xs font-black text-sky-700">+18 Leads (+9,0%)</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Konversi ke Proyek</span>
                    <span className="text-xs font-black text-emerald-600">38,4% Lolos Studi</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IKP-3 DIT. PENGEMBANGAN KPBPBB DAN KEK */}
          {activeTab === 'ikp-3' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
              {/* KOLOM A: TABEL KAJIAN STRATEGIS KEK */}
              <div className="xl:col-span-7 bg-white rounded-xl border border-emerald-200 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-emerald-700" />
                      IKP-3 &bull; DIT. PENGEMBANGAN KEK
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      100.00% Tercapai Penuh
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Persentase Kajian Pengembangan, Kerja Sama &amp; KEK Berkelanjutan
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Unit: Dit. Pengembangan KPBPBB dan KEK (20 Dokumen Analisis Strategis)
                  </p>

                  <div className="flex items-baseline justify-between mt-2 mb-2 pb-2 border-b border-emerald-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700">100,0</span>
                      <span className="text-xs font-bold text-slate-600">% Ditindaklanjuti</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500">
                      Target: <strong className="text-slate-800">100,0%</strong> <span className="text-emerald-600 font-bold">(20 / 20 Selesai)</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1">
                    <span>Dokumen Kajian Pengembangan KEK (4 Pilar Utama):</span>
                    <span className="text-[9.5px] font-normal text-slate-400">100% Ditindaklanjuti</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                          <th className="py-1 px-1.5">PILAR KAJIAN STRATEGIS</th>
                          <th className="py-1 px-1.5 text-center">DOKUMEN</th>
                          <th className="py-1 px-1.5">OUTPUT KEBIJAKAN</th>
                          <th className="py-1 px-1.5 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Hilirisasi Industri Semikonduktor &amp; EV</td>
                          <td className="py-1 px-1.5 text-center font-mono">6 Dok</td>
                          <td className="py-1 px-1.5 text-slate-500 text-[9.5px]">Roadmap Rantai Pasok Chip KPBPB</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">100% Tuntas</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Kemitraan Strategis KEK Nongsa Digital</td>
                          <td className="py-1 px-1.5 text-center font-mono">5 Dok</td>
                          <td className="py-1 px-1.5 text-slate-500 text-[9.5px]">Insentif Subsea Cable &amp; AI Hub</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">100% Tuntas</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Daya Saing Logistik Maritim KEK BAT</td>
                          <td className="py-1 px-1.5 text-center font-mono">5 Dok</td>
                          <td className="py-1 px-1.5 text-slate-500 text-[9.5px]">Regulasi Fasilitas MRO Pesawat</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">100% Tuntas</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">Pengembangan KEK Hijau &amp; Energi Terbarukan</td>
                          <td className="py-1 px-1.5 text-center font-mono">4 Dok</td>
                          <td className="py-1 px-1.5 text-slate-500 text-[9.5px]">Kajian PLTS &amp; Green Data Center</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">100% Tuntas</td>
                        </tr>
                        <tr className="bg-emerald-50/60 font-bold border-t border-emerald-200">
                          <td className="py-1 px-1.5 text-emerald-950">Total Kajian Strategis KEK</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9.5px] text-emerald-900">20 Dok</td>
                          <td className="py-1 px-1.5 text-[9.5px] text-emerald-800">4 Pilar Regulasi Diselaraskan</td>
                          <td className="py-1 px-1.5 text-right font-mono text-emerald-900">100.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-3-kajian-kek')}
                    className="text-[10.5px] font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Lihat Manual &amp; Formula IKP-3 (Kajian KEK)</span>
                  </button>
                </div>
              </div>

              {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
              <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-slate-800">
                      Tren Capaian Kajian KEK (2022 - 2026)
                    </h5>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Persentase (%)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Konsistensi penyelesaian dan tindak lanjut rekomendasi KEK
                  </p>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={KEK_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <YAxis domain={[90, 105]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [`${val}%`, name]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target Perkin"
                          stroke="#94A3B8"
                          strokeDasharray="4 4"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="skor"
                          name="Realisasi Kajian"
                          stroke="#059669"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#059669' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Kajian Selesai</span>
                    <span className="text-xs font-black text-emerald-700">20 / 20 Dokumen</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Kesiapan Regulasi</span>
                    <span className="text-xs font-black text-blue-700">100% Selaras PP 41</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IKP-4 DIT. PENGENDALIAN PENGUSAHAAN */}
          {activeTab === 'ikp-4' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
              {/* KOLOM A: TABEL PENGENDALIAN KERJASAMA BADAN USAHA */}
              <div className="xl:col-span-7 bg-white rounded-xl border border-indigo-200 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-indigo-700" />
                      IKP-4 &bull; DIT. PENGENDALIAN PENGUSAHAAN
                    </span>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
                      95.45% Kepatuhan Sangat Tinggi
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Persentase Pelaksanaan Pengendalian Pengusahaan &amp; Kerja Sama BU
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Unit: Dit. Pengendalian Pengusahaan (110 Rekomendasi Pengawasan &amp; Pembinaan)
                  </p>

                  <div className="flex items-baseline justify-between mt-2 mb-2 pb-2 border-b border-indigo-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-indigo-700">95,45</span>
                      <span className="text-xs font-bold text-slate-600">% Ditindaklanjuti</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500">
                      Target: <strong className="text-slate-800">100,0%</strong> <span className="text-indigo-600 font-bold">(105 / 110 Tuntas)</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1">
                    <span>Pengawasan &amp; Pembinaan 4 Klaster Badan Usaha:</span>
                    <span className="text-[9.5px] font-normal text-slate-400">28 Dokumen PKS</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                          <th className="py-1 px-1.5">KLASTER BADAN USAHA</th>
                          <th className="py-1 px-1.5 text-center">PKS</th>
                          <th className="py-1 px-1.5 text-center">REKOMENDASI</th>
                          <th className="py-1 px-1.5 text-right">TINDAK LANJUT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1 px-1.5 font-medium">BU Pelabuhan &amp; Logistik Maritim</td>
                          <td className="py-1 px-1.5 text-center font-mono">10 PKS</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">38 Rek</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-indigo-700">37 Tuntas (97,4%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">BU Fasilitas Bandara &amp; Kargo</td>
                          <td className="py-1 px-1.5 text-center font-mono">6 PKS</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">26 Rek</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-indigo-700">25 Tuntas (96,2%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">BU SPAM &amp; Pengelolaan Air Baku</td>
                          <td className="py-1 px-1.5 text-center font-mono">8 PKS</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">30 Rek</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-indigo-700">28 Tuntas (93,3%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-medium">BU Rumah Sakit &amp; Fasilitas Medis</td>
                          <td className="py-1 px-1.5 text-center font-mono">4 PKS</td>
                          <td className="py-1 px-1.5 text-center font-mono text-slate-600">16 Rek</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-indigo-700">15 Tuntas (93,8%)</td>
                        </tr>
                        <tr className="bg-indigo-50/60 font-bold border-t border-indigo-200">
                          <td className="py-1 px-1.5 text-indigo-950">Total Pengawasan Badan Usaha</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9.5px] text-indigo-900">28 PKS</td>
                          <td className="py-1 px-1.5 text-center font-mono text-[9.5px] text-indigo-900">110 Rek</td>
                          <td className="py-1 px-1.5 text-right font-mono text-indigo-900">105 Tuntas (95,45%)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 text-center">
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-4-pengendalian-pengusahaan')}
                    className="text-[10.5px] font-bold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Lihat Manual &amp; Formula IKP-4 (Pengendalian BU)</span>
                  </button>
                </div>
              </div>

              {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
              <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-slate-800">
                      Tren Kepatuhan Badan Usaha (2022 - 2026)
                    </h5>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Persentase (%)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Tingkat kepatuhan mitra terhadap rekomendasi pembinaan BU
                  </p>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PENGENDALIAN_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <YAxis domain={[75, 105]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [`${val}%`, name]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target Perkin"
                          stroke="#94A3B8"
                          strokeDasharray="4 4"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="skor"
                          name="Realisasi Kepatuhan"
                          stroke="#4F46E5"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#4F46E5' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">PKS Diawasi</span>
                    <span className="text-xs font-black text-indigo-700">28 Kemitraan Aktif</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Tingkat Tindak Lanjut</span>
                    <span className="text-xs font-black text-emerald-600">95,45% Kepatuhan</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KONSOLIDASI • MATRIKS SINERGI SATKER */}
          {activeTab === 'matriks' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
              {/* KOLOM A: TABEL MATRIKS SINERGI 3 SATKER */}
              <div className="xl:col-span-7 bg-white rounded-xl border border-purple-200 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-purple-700" />
                      KONSOLIDASI &bull; 3 UNIT KERJA PENGAMPU PERKIN A4
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      102.72% Rata-Rata Capaian
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Matriks Sinergi Anggaran, IKP &amp; Capaian 3 Satker
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Integrasi Portofolio: Dit. Investasi (14 DS), Dit. KEK (12 DS), Dit. Pengendalian BU (4 DS)
                  </p>

                  <div className="flex items-baseline justify-between mt-2 mb-2 pb-2 border-b border-purple-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-purple-700">Rp 18,43</span>
                      <span className="text-xs font-bold text-slate-600">Miliar Pagu DIPA</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500">
                      Serapan Berjalan: <strong className="text-slate-800">Rp 7,85 M (42,6%)</strong>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1">
                    <span>Kontribusi 3 Satker Bidang Deputi A4:</span>
                    <span className="text-[9.5px] font-normal text-slate-400">Konsolidasi Terpadu</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                          <th className="py-1 px-1.5">SATKER PELAKSANA</th>
                          <th className="py-1 px-1.5 text-right">PAGU DIPA</th>
                          <th className="py-1 px-1.5 text-right">SERAPAN</th>
                          <th className="py-1 px-1.5 text-right">OUTPUT UTAMA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1 px-1.5 font-semibold text-slate-900">
                            <div>DINV</div>
                            <div className="text-[9px] text-slate-400 font-normal">Direktorat Investasi</div>
                          </td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 9,68 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 4,12 M (42,6%)</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">Rp 63,85 T Investasi (106,4%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-semibold text-slate-900">
                            <div>DKPB</div>
                            <div className="text-[9px] text-slate-400 font-normal">Dit. Pengembangan KPBPBB &amp; KEK</div>
                          </td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 7,33 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 3,18 M (43,4%)</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">20 Kajian KEK (100%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-semibold text-slate-900">
                            <div>DPPU</div>
                            <div className="text-[9px] text-slate-400 font-normal">Dit. Pengendalian Pengusahaan</div>
                          </td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 1,42 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 0,55 M (38,7%)</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-purple-700">105 Rekomendasi (95,5%)</td>
                        </tr>
                        <tr className="bg-purple-50/60 font-bold border-t border-purple-200">
                          <td className="py-1 px-1.5 text-purple-950">Total Konsolidasi DEP-A4:</td>
                          <td className="py-1 px-1.5 text-right font-mono text-purple-900">Rp 18,43 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-purple-900">Rp 7,85 M (42,6%)</td>
                          <td className="py-1 px-1.5 text-right font-mono text-purple-900">4 IKP Melampaui</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 mt-2 text-[10px] text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Sinergi 3 Unit Kerja Pengampu: 39 Dataset Terintegrasi Buku Satu Data BP Batam</span>
                </div>
              </div>

              {/* KOLOM B: GRAFIK TREN KONSOLIDASI */}
              <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-slate-800">
                      Tren Capaian Kinerja Program (2022 - 2026)
                    </h5>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Persentase (%)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Rata-rata capaian IKP dan efisiensi serapan DIPA
                  </p>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={SINERGI_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <YAxis domain={[30, 110]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [`${val}%`, name]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="capaianIku"
                          name="Rerata Capaian IKP (%)"
                          stroke="#7C3AED"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#7C3AED' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="serapanPersen"
                          name="Serapan Anggaran (%)"
                          stroke="#94A3B8"
                          strokeDasharray="4 4"
                          strokeWidth={1.5}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Efektivitas Kinerja</span>
                    <span className="text-xs font-black text-emerald-700">102.72% Melampaui</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Status DIPA</span>
                    <span className="text-xs font-black text-purple-700">On Track Optimal</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
