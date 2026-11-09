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
  Sparkles,
  Users,
  Layers,
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
import { PERKIN_A5_KPIS } from './bandaraPelabuhanLlbData';
import { SheetSwapToggle } from '../SheetSwapToggle';

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

// 1. Data Detail IKM Layanan (IKP 1 - Model Persis Gambar Referensi)
const IKM_LOKUS_TABLE_DATA = [
  { komponen: 'Bandara Internasional Hang Nadim (Terminal & Sisi Udara)', bobot: 35, target: '86,00', nilai: 87.80, status: 'Sangat Baik' },
  { komponen: 'Pelabuhan Batu Ampar (Terminal Petikemas & Kargo)', bobot: 25, target: '86,30', nilai: 88.20, status: 'Optimal' },
  { komponen: 'Pelabuhan Domestik & Internasional (Sekupang & Punggur)', bobot: 15, target: '86,30', nilai: 88.00, status: 'Optimal' },
  { komponen: 'Pelayanan Perizinan Masuk/Keluar Barang Bebas (LLB)', bobot: 15, target: '86,50', nilai: 89.35, status: 'Optimal' },
  { komponen: 'Layanan Logistik & Konsolidasi Distribusi Kawasan', bobot: 10, target: '86,00', nilai: 88.50, status: 'Baik' },
];

const IKM_TREND_ANNUAL = [
  { tahun: '2021', target: 78.0, skor: 80.2 },
  { tahun: '2022', target: 80.0, skor: 82.5 },
  { tahun: '2023', target: 82.5, skor: 84.1 },
  { tahun: '2024', target: 85.0, skor: 86.2 },
  { tahun: '2025', target: 86.3, skor: 88.45 },
  { tahun: '2026', target: 87.0, skor: 90.1 },
];

// 2. Data Detail PNBP Bandara & Kepelabuhanan (IKP 2 - Model Persis Gambar Referensi)
const PNBP_BANDARA_LAUT_TABLE_DATA = [
  { komponen: 'Jasa Aeronautika & PJP2U (Bandara Hang Nadim)', bobot: 32, target: 'Rp 165 M', nilai: 182.50, status: 'Optimal' },
  { komponen: 'Jasa Labuh, Tambat & Dermaga Pelabuhan', bobot: 26, target: 'Rp 132 M', nilai: 142.10, status: 'Optimal' },
  { komponen: 'Jasa Non-Aeronautika (Kargo & Konsesi Bandara)', bobot: 23, target: 'Rp 120 M', nilai: 129.95, status: 'Sangat Baik' },
  { komponen: 'Jasa Bongkar Muat & Petikemas Batu Ampar', bobot: 14, target: 'Rp 78 M', nilai: 85.30, status: 'Sangat Baik' },
  { komponen: 'Pemanfaatan Fasilitas & Lahan Kawasan Pelabuhan', bobot: 5, target: 'Rp 23 M', nilai: 23.00, status: 'Baik' },
];

const PNBP_BANDARA_LAUT_TREND_ANNUAL = [
  { tahun: '2021', target: 360.0, skor: 375.0 },
  { tahun: '2022', target: 400.0, skor: 412.5 },
  { tahun: '2023', target: 450.0, skor: 468.2 },
  { tahun: '2024', target: 490.0, skor: 512.4 },
  { tahun: '2025', target: 518.21, skor: 562.85 },
  { tahun: '2026', target: 560.0, skor: 610.5 },
];

// 3. Data Detail PNBP & SLA Lalu Lintas Barang (IKP 3 - Model Persis Gambar Referensi)
const PNBP_LLB_TABLE_DATA = [
  { komponen: 'PNBP Layanan Perizinan Dokumen LLB', bobot: 40, target: 'Rp 2,20 M', nilai: 2.48, status: 'Optimal' },
  { komponen: 'Kepatuhan Waktu Layanan SLA (<3 Jam)', bobot: 30, target: '95,0%', nilai: 96.80, status: 'Optimal' },
  { komponen: 'Pengawasan Kuota Konsumsi Pokok BP Batam', bobot: 18, target: '100,0%', nilai: 98.20, status: 'Sangat Baik' },
  { komponen: 'Integrasi Single Window INSW & CEISA Ekspor-Impor', bobot: 12, target: '100,0%', nilai: 100.0, status: 'Optimal' },
];

const PNBP_LLB_TREND_ANNUAL = [
  { tahun: '2021', target: 1.30, skor: 1.45 },
  { tahun: '2022', target: 1.50, skor: 1.65 },
  { tahun: '2023', target: 1.80, skor: 1.88 },
  { tahun: '2024', target: 2.00, skor: 2.15 },
  { tahun: '2025', target: 2.20, skor: 2.48 },
  { tahun: '2026', target: 2.50, skor: 2.80 },
];

export const BandaraPelabuhanLlbVisualCharts: React.FC<
  BandaraPelabuhanLlbVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Tab state: ikp-1, ikp-2, ikp-3
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'ikp-3'>('ikp-1');

  // Sheet Swap View Modes
  const [radarViewMode, setRadarViewMode] = useState<'chart' | 'table'>('chart');
  const [ikmTrendViewMode, setIkmTrendViewMode] = useState<'chart' | 'table'>('chart');
  const [ikmBarViewMode, setIkmBarViewMode] = useState<'chart' | 'table'>('chart');
  const [pnbpTrendViewMode, setPnbpTrendViewMode] = useState<'chart' | 'table'>('chart');
  const [pnbpBarViewMode, setPnbpBarViewMode] = useState<'chart' | 'table'>('chart');
  const [llbTrendViewMode, setLlbTrendViewMode] = useState<'chart' | 'table'>('chart');
  const [llbBarViewMode, setLlbBarViewMode] = useState<'chart' | 'table'>('chart');

  const ikp1 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-1-ikm-gabungan') || PERKIN_A5_KPIS[0];
  const ikp2 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-2-pnbp-bandara-pelabuhan') || PERKIN_A5_KPIS[1];
  const ikp3 = PERKIN_A5_KPIS.find((k) => k.id === 'ikp-3-pnbp-lalu-lintas-barang') || PERKIN_A5_KPIS[2];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5 font-sans">
      {/* Two Column Grid: Left is Radar Chart (NO MINI CARDS), Right is Detailed Table + Dual Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 3 IKP (TANPA KARTU MINI DI BAWAHNYA) */}
        {/* ================================================================== */}
        <div className="lg:col-span-3 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5 flex flex-col justify-between self-stretch">
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
              <SheetSwapToggle mode={radarViewMode} onChange={setRadarViewMode} />
            </div>

            {/* Radar Visual / Table Sheet Swap */}
            {radarViewMode === 'chart' ? (
              <div className="h-44 sm:h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={RADAR_3_IKP_A5} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="#CBD5E1" strokeDasharray="2 2" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#334155', fontSize: 9.5, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 130]}
                      tick={{ fill: '#94A3B8', fontSize: 8 }}
                      stroke="#E2E8F0"
                    />
                    <Radar
                      name="Target (100%)"
                      dataKey="target"
                      stroke="#94A3B8"
                      fill="#94A3B8"
                      fillOpacity={0.15}
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                    />
                    <Radar
                      name="Realisasi (%)"
                      dataKey="realisasi"
                      stroke="#2563EB"
                      fill="#3B82F6"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={20}
                      iconType="circle"
                      iconSize={7}
                      wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }}
                    />
                    <Tooltip
                      formatter={(value: any, name: any, item: any) => {
                        const raw = item?.payload?.skorAsli || '';
                        return [`${value}% (${raw})`, name];
                      }}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        color: '#F8FAFC',
                        borderRadius: '6px',
                        fontSize: '11px',
                        padding: '4px 8px',
                        border: 'none',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-44 sm:h-48 w-full mt-2 overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="px-2.5 py-1.5">Indikator IKP</th>
                      <th className="px-2 py-1.5 text-right">Target</th>
                      <th className="px-2 py-1.5 text-right">Realisasi</th>
                      <th className="px-2 py-1.5 text-right">Skor Asli</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {RADAR_3_IKP_A5.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-2.5 py-1.5 font-medium text-slate-900 text-[10.5px]">{row.subject}</td>
                        <td className="px-2 py-1.5 text-right font-mono text-slate-500 text-[10.5px]">{row.target}%</td>
                        <td className="px-2 py-1.5 text-right font-mono font-bold text-blue-600 text-[10.5px]">{row.realisasi}%</td>
                        <td className="px-2 py-1.5 text-right font-mono text-slate-700 text-[10px]">{row.skorAsli}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200/70 text-[10.5px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-slate-500">Rerata IKP:</span>
              <span className="text-emerald-700 font-bold font-mono">107,94%</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KOLOM KANAN: MODEL PERSIS GAMBAR REFERENSI (TABEL DETAIL + DUAL GRAFIK) */}
        {/* ================================================================== */}
        <div className="lg:col-span-9 space-y-3">
          {/* Tab Selector Pills (Persis Gambar Referensi) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/80 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('ikp-1')}
              className={`flex-1 min-w-[130px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-1'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>1. IKM Layanan</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ikp-2')}
              className={`flex-1 min-w-[130px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-2'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>2. PNBP Bandara &amp; Laut</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ikp-3')}
              className={`flex-1 min-w-[130px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-3'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>3. PNBP Lalu Lintas Barang</span>
            </button>
          </div>

          {/* ================================================================ */}
          {/* TAB 1: IKP 1 - RATA-RATA IKM GABUNGAN 3 SATKER                   */}
          {/* ================================================================ */}
          {activeTab === 'ikp-1' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Indeks Kepuasan Masyarakat (5 Lokus Pelayanan Publik DEP-A5)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    102,5% Tercapai
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-1-ikm-gabungan')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
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
                  <span className="text-base font-bold text-slate-900">88,45 / Mutu A</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">102,5% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">86,30 (Mutu A)</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Rerata 3 Satker Pengampu</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Lokus Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">Dit. LLB (89,35)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Kategori Pelayanan Prima</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Lokus Pelayanan Publik</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai (IKM)</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {IKM_LOKUS_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.nilai.toFixed(2)}</td>
                          <td className="py-1 px-2.5 text-center">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                              row.status === 'Optimal'
                                ? 'bg-emerald-50 text-emerald-700'
                                : row.status === 'Sangat Baik'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Visualisasi Grafis Tren & Komparasi */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                  </div>

                  {/* Box 1: Tren Skor IKM */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-800">
                        Tren Skor IKM Gabungan (2021 - 2026)
                      </span>
                    </div>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={IKM_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <YAxis domain={[75, 95]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: any) => [`${v} Poin`, 'Skor IKM']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                          <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                          <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} name="Realisasi IKM" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Box 2: Capaian Nilai vs Bobot Lokus */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-800">
                        Capaian Nilai vs Bobot 5 Lokus Layanan
                      </span>
                    </div>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={IKM_LOKUS_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis
                            dataKey="komponen"
                            tick={{ fontSize: 7, fill: '#64748B' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => val.split(' ')[0]}
                          />
                          <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: any, name: any) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai IKM']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                          <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                          <Bar dataKey="nilai" fill="#3B82F6" radius={[2, 2, 0, 0]} name="nilai" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: IKP 2 - PNBP BANDARA & KEPELABUHANAN                      */}
          {/* ================================================================ */}
          {activeTab === 'ikp-2' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Realisasi PNBP Bandara &amp; Kepelabuhanan (2 Badan Usaha Strategis)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    108,6% Melampaui
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-2-pnbp-bandara-pelabuhan')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
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
                  <span className="text-base font-bold text-slate-900">Rp 562,85 M</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">108,6% Capaian (+Rp 44,6 M)</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">Rp 518,21 M</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">BP Bandara &amp; BP Pelabuhan</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Kontributor Terbesar</span>
                  <span className="text-base font-bold text-slate-900">Hang Nadim (312,45 M)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Share 55,5% PNBP</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Unit Kerja / Sumber PNBP</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai (Rp M)</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PNBP_BANDARA_LAUT_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">Rp {row.nilai.toFixed(2)} M</td>
                          <td className="py-1 px-2.5 text-center">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                              row.status === 'Optimal'
                                ? 'bg-emerald-50 text-emerald-700'
                                : row.status === 'Sangat Baik'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Visualisasi Grafis Tren & Komparasi */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                  </div>

                  {/* Box 1: Tren Realisasi PNBP */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-800 block mb-1">
                      Tren Realisasi PNBP Bandara &amp; Laut (2021 - 2026)
                    </span>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={PNBP_BANDARA_LAUT_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <YAxis domain={[340, 640]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: any) => [`Rp ${v} M`, 'PNBP']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                          <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                          <Line type="monotone" dataKey="skor" stroke="#0284C7" strokeWidth={2} dot={{ r: 2.5, fill: '#0284C7' }} name="Realisasi PNBP" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Box 2: Capaian Nilai vs Bobot Sektor */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-800 block mb-1">
                      Capaian Nilai vs Bobot 5 Sumber PNBP
                    </span>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={PNBP_BANDARA_LAUT_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis
                            dataKey="komponen"
                            tick={{ fontSize: 7, fill: '#64748B' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => val.split(' ')[0]}
                          />
                          <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: any, name: any) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai (Rp M)']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                          <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                          <Bar dataKey="nilai" fill="#0284C7" radius={[2, 2, 0, 0]} name="nilai" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: IKP 3 - PNBP & SLA LALU LINTAS BARANG                     */}
          {/* ================================================================ */}
          {activeTab === 'ikp-3' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Realisasi PNBP &amp; SLA Pelayanan Dit. Lalu Lintas Barang
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    112,7% Melampaui
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-3-pnbp-lalu-lintas-barang')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
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
                  <span className="text-base font-bold text-slate-900">Rp 2,48 M</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">112,7% Capaian (+Rp 0,28 M)</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">Rp 2,20 M</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Dit. Lalu Lintas Barang</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">SLA Tepat Waktu</span>
                  <span className="text-base font-bold text-slate-900">96,8% (&lt;3 Jam)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Rerata Durasi 1,8 Jam</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Komponen Kinerja Pelayanan LLB</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PNBP_LLB_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">
                            {typeof row.nilai === 'number' && row.nilai < 10
                              ? `Rp ${row.nilai.toFixed(2)} M`
                              : `${row.nilai.toFixed(1)}%`}
                          </td>
                          <td className="py-1 px-2.5 text-center">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-semibold ${
                              row.status === 'Optimal'
                                ? 'bg-emerald-50 text-emerald-700'
                                : row.status === 'Sangat Baik'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Visualisasi Grafis Tren & Komparasi */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                  </div>

                  {/* Box 1: Tren Realisasi PNBP LLB */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-800 block mb-1">
                      Tren Realisasi PNBP LLB (2021 - 2026)
                    </span>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={PNBP_LLB_TREND_ANNUAL} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <YAxis domain={[1.0, 3.2]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: any) => [`Rp ${v} M`, 'PNBP LLB']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                          <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                          <Line type="monotone" dataKey="skor" stroke="#D97706" strokeWidth={2} dot={{ r: 2.5, fill: '#D97706' }} name="Realisasi" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Box 2: Capaian Nilai vs Bobot Komponen */}
                  <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-800 block mb-1">
                      Capaian Nilai vs Bobot 4 Komponen LLB
                    </span>
                    <div className="h-24 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={PNBP_LLB_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis
                            dataKey="komponen"
                            tick={{ fontSize: 7, fill: '#64748B' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => val.split(' ')[0]}
                          />
                          <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: any, name: any) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai Capaian']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                          <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                          <Bar dataKey="nilai" fill="#D97706" radius={[2, 2, 0, 0]} name="nilai" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
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
