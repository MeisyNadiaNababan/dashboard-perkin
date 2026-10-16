import React, { useState } from 'react';
import {
  Award,
  DollarSign,
  TrendingUp,
  Plane,
  Anchor,
  Truck,
  CheckCircle2,
  HelpCircle,
  FileCode2,
  ChevronRight,
  Layers,
  Sparkles,
  Users,
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
import { PERKIN_A5_KPIS } from './bandaraPelabuhanLlbData';

interface BandaraPelabuhanLlbVisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar Capaian 3 IKP Perkin A5 + Konsolidasi Total (Normalized to 100% target baseline)
const RADAR_3_IKP_A5 = [
  { subject: '1. IKM Layanan (3 Satker)', target: 100, realisasi: 102.5, skorAsli: '88,45 / 86,30' },
  { subject: '2. PNBP Bandara & Laut', target: 100, realisasi: 108.6, skorAsli: 'Rp 562,85 M / Rp 518,21 M' },
  { subject: '3. PNBP LLB', target: 100, realisasi: 112.7, skorAsli: 'Rp 2,48 M / Rp 2,20 M' },
  { subject: '4. Total PNBP A5', target: 100, realisasi: 108.63, skorAsli: 'Rp 565,33 M / Rp 520,41 M' },
];

// Tren Tahunan IKP 1: Rata-rata IKM Gabungan
const IKM_TREND_ANNUAL = [
  { tahun: '2022', skor: 82.5, target: 80.0 },
  { tahun: '2023', skor: 84.1, target: 82.5 },
  { tahun: '2024', skor: 86.2, target: 85.0 },
  { tahun: '2025', skor: 88.45, target: 86.3 },
  { tahun: '2026', skor: 90.1, target: 87.0 },
];

// Tren Tahunan IKP 2: Realisasi PNBP Bandara & Kepelabuhanan (Rp Miliar)
const PNBP_BANDARA_LAUT_TREND_ANNUAL = [
  { tahun: '2022', skor: 412.5, target: 400.0 },
  { tahun: '2023', skor: 468.2, target: 450.0 },
  { tahun: '2024', skor: 512.4, target: 490.0 },
  { tahun: '2025', skor: 562.85, target: 518.21 },
  { tahun: '2026', skor: 610.5, target: 560.0 },
];

// Tren Tahunan IKP 3: Realisasi PNBP Dit. Lalu Lintas Barang (Rp Miliar)
const PNBP_LLB_TREND_ANNUAL = [
  { tahun: '2022', skor: 1.65, target: 1.5 },
  { tahun: '2023', skor: 1.88, target: 1.8 },
  { tahun: '2024', skor: 2.15, target: 2.0 },
  { tahun: '2025', skor: 2.48, target: 2.2 },
  { tahun: '2026', skor: 2.8, target: 2.5 },
];

// Tren Konsolidasi Sinergi 3 Satker DEP-A5
const SINERGI_TREND_ANNUAL = [
  { tahun: '2022', serapanPersen: 36.8, capaianIku: 98.6 },
  { tahun: '2023', serapanPersen: 38.5, capaianIku: 101.2 },
  { tahun: '2024', serapanPersen: 39.4, capaianIku: 103.5 },
  { tahun: '2025', serapanPersen: 40.0, capaianIku: 107.94 },
  { tahun: '2026', serapanPersen: 43.5, capaianIku: 109.8 },
];

export const BandaraPelabuhanLlbVisualCharts: React.FC<
  BandaraPelabuhanLlbVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Tab state: ikp-1, ikp-2, ikp-3, matriks (Persis Model DEP-A4)
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'ikp-3' | 'matriks'>('ikp-1');

  const ikp1 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-1-ikm-gabungan') || PERKIN_A5_KPIS[0];
  const ikp2 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-2-pnbp-bandara-pelabuhan') || PERKIN_A5_KPIS[1];
  const ikp3 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-3-pnbp-lalu-lintas-barang') || PERKIN_A5_KPIS[2];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5 font-sans">
      {/* Two Column Grid: Left is Radar Chart (NO MINI CARDS BELOW IT PERSIS DEP-A4), Right is Detailed Table + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 3 IKP (TANPA KARTU MINI DI BAWAHNYA) */}
        {/* ================================================================== */}
        <div className="lg:col-span-4 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Radar Capaian 3 IKP DEP-A5
                </h3>
                <p className="text-[10px] text-slate-500">
                  Realisasi Aktual vs Target Penetapan Perkin A5 2025
                </p>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                0 - 130%
              </span>
            </div>

            {/* Radar Visual */}
            <div className="h-56 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_3_IKP_A5} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
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

          <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-slate-500">Rata-rata Capaian IKP:</span>
              <span className="text-emerald-700 font-bold font-mono">107,94% (Melampaui Target)</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Metode Agregasi:</span>
              <span className="font-mono">Akumulatif Jan - Des 2025</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KOLOM KANAN: SUB-TABS INDIKATOR + DETAIL EVALUASI + GRAFIK TREN    */}
        {/* Model Persis DEP-A4: Tab per IKP + Tabel Realisasi + Tren Tahunan   */}
        {/* ================================================================== */}
        <div className="lg:col-span-8 space-y-3">
          {/* Header & Sub-Tab Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Capaian Evaluasi 3 Indikator Kinerja Program Perkin A5</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-1.5 py-0.2 rounded">
                  TA 2025
                </span>
              </h4>
              <p className="text-[10.5px] text-slate-500">
                Pilih tab indikator untuk menganalisis breakdown target per satker dan tren tahunan
              </p>
            </div>

            {/* Sub-Tab Switcher */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('ikp-1')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'ikp-1'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>IKP 1: IKM Layanan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-2')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'ikp-2'
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>IKP 2: PNBP Bandara-Laut</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-3')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'ikp-3'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>IKP 3: PNBP LLB</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('matriks')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'matriks'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Matriks Sinergi A5</span>
              </button>
            </div>
          </div>

          {/* TAB 1: IKP 1 RATA-RATA IKM LAYANAN */}
          {activeTab === 'ikp-1' && (
            <div className="space-y-3">
              {/* Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-blue-700 font-bold block uppercase">Lokus Bandara Hang Nadim</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-lg font-black text-slate-900 font-mono">87,80</span>
                    <span className="text-[10px] font-bold text-emerald-700">102,1% (Mutu A)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Dit. Kawasan Bandara &bull; Target: 86,00</span>
                </div>

                <div className="bg-sky-50/70 border border-sky-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-sky-700 font-bold block uppercase">Lokus Kepelabuhanan</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-lg font-black text-slate-900 font-mono">88,20</span>
                    <span className="text-[10px] font-bold text-emerald-700">102,2% (Mutu A)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Dit. Kepelabuhanan &bull; Target: 86,30</span>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-amber-700 font-bold block uppercase">Lokus Lalu Lintas Barang</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-lg font-black text-slate-900 font-mono">89,35</span>
                    <span className="text-[10px] font-bold text-emerald-700">103,3% (Mutu A)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Dit. Lalu Lintas Barang &bull; Target: 86,50</span>
                </div>
              </div>

              {/* Table & Chart Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    Tabel Breakdown Capaian per Satker Pengampu IKP 1:
                  </span>
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Lokus Layanan</th>
                        <th className="py-1 text-right">Target</th>
                        <th className="py-1 text-right">Realisasi</th>
                        <th className="py-1 text-right">Capaian</th>
                        <th className="py-1 text-right">Mutu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">Hang Nadim (Bandara)</td>
                        <td className="py-1.5 text-right font-mono">86,00</td>
                        <td className="py-1.5 text-right font-mono font-bold text-blue-700">87,80</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">102,1%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">A</span></td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">Batu Ampar (Pelabuhan)</td>
                        <td className="py-1.5 text-right font-mono">86,30</td>
                        <td className="py-1.5 text-right font-mono font-bold text-blue-700">88,20</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">102,2%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">A</span></td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">Layanan Perizinan LLB</td>
                        <td className="py-1.5 text-right font-mono">86,50</td>
                        <td className="py-1.5 text-right font-mono font-bold text-blue-700">89,35</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">103,3%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">A</span></td>
                      </tr>
                      <tr className="bg-blue-50/50 font-bold">
                        <td className="py-1.5 text-blue-900">Rata-rata Gabungan DEP-A5</td>
                        <td className="py-1.5 text-right font-mono">86,30</td>
                        <td className="py-1.5 text-right font-mono text-blue-800 font-black">88,45</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">102,5%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-bold">A</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Trend Chart */}
                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren IKM Tahunan (2022-2026)</span>
                    <span className="text-[9px] font-mono text-slate-400">Skala 100</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={IKM_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis domain={[75, 95]} tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" name="Target" />
                        <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} name="Realisasi IKM" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IKP 2 PNBP BANDARA & KEPELABUHANAN */}
          {activeTab === 'ikp-2' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase">Dit. Kawasan Bandara (Hang Nadim)</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">Rp 312,45 M</span>
                    <span className="text-xs font-bold text-emerald-700">109,63% Capaian</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target Rp 285,00 M &bull; Surplus Rp 27,45 Miliar (55,2% Share)</span>
                </div>

                <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-blue-800 font-bold block uppercase">Dit. Pengelolaan Kepelabuhanan</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">Rp 250,40 M</span>
                    <span className="text-xs font-bold text-blue-700">107,37% Capaian</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target Rp 233,21 M &bull; Surplus Rp 17,19 Miliar (44,5% Share)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    Breakdown PNBP Gabungan Bandara &amp; Kepelabuhanan (IKP 2):
                  </span>
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Satker</th>
                        <th className="py-1 text-right">Target (M)</th>
                        <th className="py-1 text-right">Realisasi (M)</th>
                        <th className="py-1 text-right">Capaian</th>
                        <th className="py-1 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">Dit. Kawasan Bandara</td>
                        <td className="py-1.5 text-right font-mono">Rp 285,00</td>
                        <td className="py-1.5 text-right font-mono font-bold text-emerald-700">Rp 312,45</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">109,6%</td>
                        <td className="py-1.5 text-right text-emerald-600 font-bold text-[9.5px]">Melampaui</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">Dit. Kepelabuhanan</td>
                        <td className="py-1.5 text-right font-mono">Rp 233,21</td>
                        <td className="py-1.5 text-right font-mono font-bold text-blue-700">Rp 250,40</td>
                        <td className="py-1.5 text-right font-mono text-blue-700 font-bold">107,4%</td>
                        <td className="py-1.5 text-right text-blue-600 font-bold text-[9.5px]">Melampaui</td>
                      </tr>
                      <tr className="bg-sky-50/50 font-bold">
                        <td className="py-1.5 text-sky-900">Total IKP 2 Perkin A5</td>
                        <td className="py-1.5 text-right font-mono">Rp 518,21</td>
                        <td className="py-1.5 text-right font-mono text-sky-800 font-black">Rp 562,85</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">108,6%</td>
                        <td className="py-1.5 text-right text-emerald-700 font-bold text-[9.5px]">+Rp 44,6 M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren PNBP Bandara &amp; Laut (Rp Miliar)</span>
                    <span className="text-[9px] font-mono text-slate-400">2022-2026</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PNBP_BANDARA_LAUT_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" name="Target" />
                        <Line type="monotone" dataKey="skor" stroke="#0284C7" strokeWidth={2} dot={{ r: 3 }} name="Realisasi PNBP" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IKP 3 PNBP LALU LINTAS BARANG */}
          {activeTab === 'ikp-3' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-amber-800 font-bold block uppercase">Dit. Lalu Lintas Barang (Realisasi PNBP)</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">Rp 2,48 M</span>
                    <span className="text-xs font-bold text-amber-700">112,73% Capaian</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target Rp 2,20 M &bull; Surplus Rp 0,28 Miliar dari perizinan &amp; dokumen LLB</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <span className="text-[10px] text-slate-600 font-bold block uppercase">Kepatuhan Waktu Layanan SLA</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">96,8%</span>
                    <span className="text-xs font-bold text-emerald-700">Rata-rata 1,8 Jam</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Standar regulasi penyelesaian: maks 3,0 jam kerja</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    Detail Capaian Kinerja Dit. Lalu Lintas Barang (IKP 3):
                  </span>
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Indikator</th>
                        <th className="py-1 text-right">Target</th>
                        <th className="py-1 text-right">Realisasi</th>
                        <th className="py-1 text-right">Capaian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">PNBP Layanan Perizinan LLB</td>
                        <td className="py-1.5 text-right font-mono">Rp 2,20 M</td>
                        <td className="py-1.5 text-right font-mono font-bold text-amber-700">Rp 2,48 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">112,7%</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">SLA Perizinan Tepat Waktu</td>
                        <td className="py-1.5 text-right font-mono">95,0%</td>
                        <td className="py-1.5 text-right font-mono font-bold text-slate-800">96,8%</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">101,9%</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">Realisasi Kuota Induk Konsumsi</td>
                        <td className="py-1.5 text-right font-mono">100,0%</td>
                        <td className="py-1.5 text-right font-mono font-bold text-slate-800">98,2%</td>
                        <td className="py-1.5 text-right font-mono text-blue-700 font-bold">98,2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren PNBP LLB Tahunan (Rp M)</span>
                    <span className="text-[9px] font-mono text-slate-400">2022-2026</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PNBP_LLB_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" name="Target" />
                        <Line type="monotone" dataKey="skor" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} name="Realisasi" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MATRIKS SINERGI DEP-A5 */}
          {activeTab === 'matriks' && (
            <div className="space-y-3">
              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-lg p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-900">
                    Konsolidasi Anggaran Program &amp; Kinerja 3 Satker Pengampu Perkin A5
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    Pagu Total: Rp 59,51 Miliar
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Realisasi belanja operasional dan penyelenggaraan program TA 2025: Rp 23,80 Miliar (40,0% serapan anggaran per cut-off).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Kegiatan Program</th>
                        <th className="py-1 text-right">Pagu DIPA</th>
                        <th className="py-1 text-right">Realisasi</th>
                        <th className="py-1 text-right">Serapan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">1. Kawasan Bandara Hang Nadim</td>
                        <td className="py-1.5 text-right font-mono">Rp 11,43 M</td>
                        <td className="py-1.5 text-right font-mono">Rp 4,57 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">40,0%</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">2. Kepelabuhanan Batam</td>
                        <td className="py-1.5 text-right font-mono">Rp 46,29 M</td>
                        <td className="py-1.5 text-right font-mono">Rp 18,52 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">40,0%</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">3. Pelayanan Lalu Lintas Barang</td>
                        <td className="py-1.5 text-right font-mono">Rp 1,78 M</td>
                        <td className="py-1.5 text-right font-mono">Rp 0,71 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">40,0%</td>
                      </tr>
                      <tr className="bg-indigo-50/50 font-bold">
                        <td className="py-1.5 text-indigo-900">Total Program Perkin A5</td>
                        <td className="py-1.5 text-right font-mono">Rp 59,51 M</td>
                        <td className="py-1.5 text-right font-mono text-indigo-900">Rp 23,80 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">40,0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren Sinergi Serapan &amp; IKU (%)</span>
                    <span className="text-[9px] font-mono text-slate-400">2022-2026</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={SINERGI_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 9 }} domain={[30, 115]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="serapanPersen" stroke="#6366F1" strokeWidth={2} name="Serapan Pagu (%)" />
                        <Line type="monotone" dataKey="capaianIku" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} name="Rata-rata IKU (%)" />
                      </LineChart>
                    </ResponsiveContainer>
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
