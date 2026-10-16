import React, { useState } from 'react';
import {
  Percent,
  DollarSign,
  Award,
  TrendingUp,
  Stethoscope,
  Droplets,
  Shield,
  Layers,
  Scale,
  Sparkles,
  CheckCircle2,
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
import { PERKIN_A6_KPIS } from './pelayananUmumData';

interface PelayananUmumVisualChartsProps {
  onOpenFormulaModal: (kpiId?: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar Capaian 3 IKP Perkin A6 + Total PNBP (Normalized to 100% target baseline)
const RADAR_3_IKP_A6 = [
  { subject: '1. Peningkatan Kinerja BU', target: 100, realisasi: 112.7, skorAsli: '1,24% / 1,1%' },
  { subject: '2. Rasio PNBP BU', target: 100, realisasi: 104.4, skorAsli: '0,71 / 0,68' },
  { subject: '3. IKM Layanan BU', target: 100, realisasi: 100.4, skorAsli: '88,66 / 88,31' },
  { subject: '4. Total PNBP 2 BU', target: 100, realisasi: 104.7, skorAsli: 'Rp 264,3 M / Rp 252,4 M' },
];

// Tren Tahunan IKP 1: Peningkatan Kinerja Badan Usaha (%)
const PERTUMBUHAN_BU_TREND_ANNUAL = [
  { tahun: '2022', skor: 0.85, target: 1.0 },
  { tahun: '2023', skor: 0.98, target: 1.0 },
  { tahun: '2024', skor: 1.12, target: 1.1 },
  { tahun: '2025', skor: 1.24, target: 1.1 },
  { tahun: '2026', skor: 1.35, target: 1.2 },
];

// Tren Tahunan IKP 2: Rasio PNBP BU thd BP Batam
const RASIO_PNBP_TREND_ANNUAL = [
  { tahun: '2022', skor: 0.62, target: 0.60 },
  { tahun: '2023', skor: 0.65, target: 0.64 },
  { tahun: '2024', skor: 0.68, target: 0.66 },
  { tahun: '2025', skor: 0.71, target: 0.68 },
  { tahun: '2026', skor: 0.73, target: 0.70 },
];

// Tren Tahunan IKP 3: Rata-rata IKM Badan Usaha (Skala 100)
const IKM_BU_TREND_ANNUAL = [
  { tahun: '2022', skor: 84.5, target: 82.0 },
  { tahun: '2023', skor: 86.2, target: 85.0 },
  { tahun: '2024', skor: 87.8, target: 86.5 },
  { tahun: '2025', skor: 88.66, target: 88.31 },
  { tahun: '2026', skor: 89.8, target: 88.5 },
];

// Tren Konsolidasi Sinergi Serapan & Capaian Kinerja Pelayanan Umum
const SINERGI_TREND_ANNUAL = [
  { tahun: '2022', serapanPersen: 78.4, capaianIku: 99.2 },
  { tahun: '2023', serapanPersen: 81.2, capaianIku: 101.5 },
  { tahun: '2024', serapanPersen: 83.5, capaianIku: 103.8 },
  { tahun: '2025', serapanPersen: 85.0, capaianIku: 105.85 },
  { tahun: '2026', serapanPersen: 88.2, capaianIku: 107.5 },
];

export const PelayananUmumVisualCharts: React.FC<PelayananUmumVisualChartsProps> = ({
  onOpenFormulaModal: _onOpenFormulaModal,
}) => {
  // Tab state: ikp-1, ikp-2, ikp-3, matriks (Persis Model DEP-A4 & DEP-A5)
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'ikp-3' | 'matriks'>('ikp-1');

  const ikp1 = PERKIN_A6_KPIS[0];
  const ikp2 = PERKIN_A6_KPIS[1];
  const ikp3 = PERKIN_A6_KPIS[2];

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
                  Radar Capaian 3 IKP DEP-A6
                </h3>
                <p className="text-[10px] text-slate-500">
                  Realisasi Aktual vs Target Penetapan Perkin A6 2025
                </p>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                0 - 130%
              </span>
            </div>

            {/* Radar Visual */}
            <div className="h-56 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_3_IKP_A6} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
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
              <span className="text-emerald-700 font-bold font-mono">105,85% (Melampaui Target)</span>
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
                <span>Capaian Evaluasi 3 Indikator Kinerja Program Perkin A6</span>
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
                <Percent className="w-3.5 h-3.5" />
                <span>IKP 1: Kinerja BU</span>
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
                <Scale className="w-3.5 h-3.5" />
                <span>IKP 2: Rasio PNBP BU</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ikp-3')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'ikp-3'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>IKP 3: IKM Layanan</span>
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
                <span>Matriks Sinergi A6</span>
              </button>
            </div>
          </div>

          {/* TAB 1: IKP 1 PERSENTASE PENINGKATAN KINERJA BADAN USAHA */}
          {activeTab === 'ikp-1' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-rose-800 font-bold block uppercase">BU Rumah Sakit (RSBP Batam)</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">+4,55%</span>
                    <span className="text-xs font-bold text-emerald-700">413,6% Target</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Realisasi Rp 121,80 M vs Rp 116,50 M Tahun Lalu</span>
                </div>

                <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-cyan-800 font-bold block uppercase">BU SPAM, Fasilitas &amp; Lingkungan</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">+2,37%</span>
                    <span className="text-xs font-bold text-emerald-700">215,5% Target</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Realisasi Rp 142,50 M vs Rp 139,20 M Tahun Lalu</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    Breakdown Peningkatan Pendapatan per Satker (IKP 1):
                  </span>
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Badan Usaha</th>
                        <th className="py-1 text-right">Target</th>
                        <th className="py-1 text-right">Realisasi</th>
                        <th className="py-1 text-right">Capaian</th>
                        <th className="py-1 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">BU Rumah Sakit (RSBP)</td>
                        <td className="py-1.5 text-right font-mono">1,10%</td>
                        <td className="py-1.5 text-right font-mono font-bold text-rose-700">+4,55%</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">413,6%</td>
                        <td className="py-1.5 text-right text-emerald-600 font-bold text-[9.5px]">Melampaui</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">BU SPAM Fasling</td>
                        <td className="py-1.5 text-right font-mono">1,10%</td>
                        <td className="py-1.5 text-right font-mono font-bold text-cyan-700">+2,37%</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">215,5%</td>
                        <td className="py-1.5 text-right text-emerald-600 font-bold text-[9.5px]">Melampaui</td>
                      </tr>
                      <tr className="bg-blue-50/50 font-bold">
                        <td className="py-1.5 text-blue-900">Konsolidasi Rata-rata BU</td>
                        <td className="py-1.5 text-right font-mono">1,10%</td>
                        <td className="py-1.5 text-right font-mono text-blue-800 font-black">1,24%</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">112,7%</td>
                        <td className="py-1.5 text-right text-emerald-700 font-bold text-[9.5px]">Tuntas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren Peningkatan Kinerja BU (%)</span>
                    <span className="text-[9px] font-mono text-slate-400">2022-2026</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PERTUMBUHAN_BU_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" name="Target" />
                        <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} name="Realisasi (%)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IKP 2 RASIO PNBP BU TERHADAP BP BATAM */}
          {activeTab === 'ikp-2' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-sky-50/70 border border-sky-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-sky-800 font-bold block uppercase">Rasio Kontribusi BU RSBP</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">0,33</span>
                    <span className="text-xs font-bold text-emerald-700">106,5% Capaian</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target Rasio 0,31 &bull; Realisasi Rp 121,80 M</span>
                </div>

                <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-cyan-800 font-bold block uppercase">Rasio Kontribusi BU SPAM Fasling</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">0,38</span>
                    <span className="text-xs font-bold text-emerald-700">102,7% Capaian</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target Rasio 0,37 &bull; Realisasi Rp 142,50 M</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    Detail Kontribusi Rasio PNBP BU terhadap Target BP Batam:
                  </span>
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Badan Usaha</th>
                        <th className="py-1 text-right">Target</th>
                        <th className="py-1 text-right">Realisasi</th>
                        <th className="py-1 text-right">Capaian</th>
                        <th className="py-1 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">BU Rumah Sakit (RSBP)</td>
                        <td className="py-1.5 text-right font-mono">0,31</td>
                        <td className="py-1.5 text-right font-mono font-bold text-sky-700">0,33</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">106,5%</td>
                        <td className="py-1.5 text-right text-emerald-600 font-bold text-[9.5px]">Tercapai</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">BU SPAM, Fasilitas &amp; Lingkungan</td>
                        <td className="py-1.5 text-right font-mono">0,37</td>
                        <td className="py-1.5 text-right font-mono font-bold text-cyan-700">0,38</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">102,7%</td>
                        <td className="py-1.5 text-right text-emerald-600 font-bold text-[9.5px]">Tercapai</td>
                      </tr>
                      <tr className="bg-sky-50/50 font-bold">
                        <td className="py-1.5 text-sky-900">Total Rasio Kontribusi BU</td>
                        <td className="py-1.5 text-right font-mono">0,68</td>
                        <td className="py-1.5 text-right font-mono text-sky-800 font-black">0,71</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">104,4%</td>
                        <td className="py-1.5 text-right text-emerald-700 font-bold text-[9.5px]">Melampaui</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren Rasio PNBP Tahunan</span>
                    <span className="text-[9px] font-mono text-slate-400">2022-2026</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={RASIO_PNBP_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis domain={[0.55, 0.8]} tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" name="Target" />
                        <Line type="monotone" dataKey="skor" stroke="#0284C7" strokeWidth={2} dot={{ r: 3 }} name="Realisasi Rasio" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IKP 3 RATA-RATA IKM BADAN USAHA */}
          {activeTab === 'ikp-3' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase">IKM BU Rumah Sakit (RSBP)</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">88,92</span>
                    <span className="text-xs font-bold text-emerald-700">Mutu A (Sangat Baik)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target 88,31 &bull; 1.250 Responden Rawat Inap &amp; Jalan</span>
                </div>

                <div className="bg-teal-50/70 border border-teal-200/80 rounded-lg p-2.5">
                  <span className="text-[10px] text-teal-800 font-bold block uppercase">IKM BU SPAM, Fasilitas &amp; Lingkungan</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-black text-slate-900 font-mono">88,40</span>
                    <span className="text-xs font-bold text-teal-700">Mutu A (Sangat Baik)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Target 88,31 &bull; 1.480 Responden Pelanggan Air &amp; Fasilitas</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                    Breakdown IKM per Lokus Badan Usaha:
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
                        <td className="py-1.5 font-semibold text-slate-800">Rumah Sakit BP Batam (RSBP)</td>
                        <td className="py-1.5 text-right font-mono">88,31</td>
                        <td className="py-1.5 text-right font-mono font-bold text-emerald-700">88,92</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">100,7%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">A</span></td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">SPAM, Fasilitas &amp; Lingkungan</td>
                        <td className="py-1.5 text-right font-mono">88,31</td>
                        <td className="py-1.5 text-right font-mono font-bold text-teal-700">88,40</td>
                        <td className="py-1.5 text-right font-mono text-teal-700 font-bold">100,1%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">A</span></td>
                      </tr>
                      <tr className="bg-emerald-50/50 font-bold">
                        <td className="py-1.5 text-emerald-900">Rata-rata IKM Gabungan BU</td>
                        <td className="py-1.5 text-right font-mono">88,31</td>
                        <td className="py-1.5 text-right font-mono text-emerald-800 font-black">88,66</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">100,4%</td>
                        <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-bold">A</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="md:col-span-5 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-700">Tren IKM Tahunan (2022-2026)</span>
                    <span className="text-[9px] font-mono text-slate-400">Skala 100</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={IKM_BU_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9 }} />
                        <YAxis domain={[80, 95]} tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" name="Target" />
                        <Line type="monotone" dataKey="skor" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} name="Realisasi IKM" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MATRIKS SINERGI PELAYANAN UMUM */}
          {activeTab === 'matriks' && (
            <div className="space-y-3">
              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-lg p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-900">
                    Konsolidasi Anggaran Program &amp; Kinerja 3 Unit Pengampu Perkin A6
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    Total Belanja: Rp 420,0 Miliar
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Realisasi belanja operasional dan penyelenggaraan program TA 2025: Rp 326,8 Miliar (77,8% serapan anggaran kumulatif).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 bg-slate-50/80 rounded-lg border border-slate-200 p-2.5">
                  <table className="w-full text-[10.5px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-left">
                        <th className="py-1">Unit Pengampu</th>
                        <th className="py-1 text-right">Pagu Belanja</th>
                        <th className="py-1 text-right">PNBP</th>
                        <th className="py-1 text-right">Capaian IKM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">1. BU Rumah Sakit (RSBP)</td>
                        <td className="py-1.5 text-right font-mono">Rp 165,0 M</td>
                        <td className="py-1.5 text-right font-mono text-rose-700 font-bold">Rp 121,8 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">88,92 (A)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">2. BU SPAM, Fasilitas &amp; Lingkungan</td>
                        <td className="py-1.5 text-right font-mono">Rp 185,0 M</td>
                        <td className="py-1.5 text-right font-mono text-cyan-700 font-bold">Rp 142,5 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">88,40 (A)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-800">3. Dit. Pengamanan Aset (Ditpam)</td>
                        <td className="py-1.5 text-right font-mono">Rp 70,0 M</td>
                        <td className="py-1.5 text-right font-mono text-slate-500">-</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-bold">87,80 (B)</td>
                      </tr>
                      <tr className="bg-indigo-50/50 font-bold">
                        <td className="py-1.5 text-indigo-900">Total Konsolidasi DEP-A6</td>
                        <td className="py-1.5 text-right font-mono">Rp 420,0 M</td>
                        <td className="py-1.5 text-right font-mono text-indigo-900 font-black">Rp 264,3 M</td>
                        <td className="py-1.5 text-right font-mono text-emerald-700 font-black">88,66 (A)</td>
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
                        <YAxis tick={{ fontSize: 9 }} domain={[70, 115]} />
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
