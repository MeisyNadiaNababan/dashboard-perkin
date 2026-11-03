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
  BarChart3,
  FileText,
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
import { PERKIN_A4_KPIS } from './investasiPengusahaanData';

interface InvestasiPengusahaanVisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar Capaian 4 IKP Perkin A4 (Normalized to 100% target baseline)
const RADAR_4_IKP_A4 = [
  { subject: '1. Investasi (Promosi & Fasilitasi)', target: 100, realisasi: 106.4, skorAsli: 'Rp 63,85 T / Rp 60 T' },
  { subject: '2. Promosi (Promosi & Fasilitasi)', target: 100, realisasi: 109.0, skorAsli: '218 Leads / 200 Leads' },
  { subject: '3. Kajian KEK (Perencanaan & KEK)', target: 100, realisasi: 100.0, skorAsli: '100% / 100%' },
  { subject: '4. Pengendalian BU (Pengendalian Pengusahaan)', target: 100, realisasi: 95.5, skorAsli: '95,45% / 100%' },
];

// 1. Data Tabel & Komparasi Sektor Investasi (IKP 1 - Model Persis Gambar Referensi)
const INVESTASI_SEKTOR_TABLE_DATA = [
  { komponen: 'Industri Elektronik & Perakitan', bobot: 25, target: 'Rp 14,0 T', nilai: 15.85, status: 'Sangat Baik' },
  { komponen: 'Semikonduktor & Komponen Presisi', bobot: 22, target: 'Rp 12,5 T', nilai: 13.90, status: 'Optimal' },
  { komponen: 'Data Center & Infrastruktur Digital (KEK)', bobot: 18, target: 'Rp 10,0 T', nilai: 11.20, status: 'Sangat Baik' },
  { komponen: 'Fabrikasi Maritim & Alat Berat', bobot: 14, target: 'Rp 8,5 T', nilai: 8.80, status: 'Baik' },
  { komponen: 'Industri Kimia & Farmasi', bobot: 10, target: 'Rp 6,0 T', nilai: 6.25, status: 'Optimal' },
  { komponen: 'Pariwisata & Hospitaliti KEK', bobot: 7, target: 'Rp 5,0 T', nilai: 4.85, status: 'Baik' },
  { komponen: 'Jasa Penunjang & Logistik Kawasan', bobot: 4, target: 'Rp 4,0 T', nilai: 3.00, status: 'Baik' },
];

const INVESTASI_TREND_TAHUNAN = [
  { tahun: '2021', target: 40.0, skor: 42.0 },
  { tahun: '2022', target: 45.0, skor: 48.2 },
  { tahun: '2023', target: 50.0, skor: 52.4 },
  { tahun: '2024', target: 52.0, skor: 54.2 },
  { tahun: '2025', target: 60.0, skor: 63.85 },
  { tahun: '2026', target: 65.0, skor: 68.5 },
];

// 2. Data Tabel & Komparasi Agenda Promosi (IKP 2 - Model Persis Gambar Referensi)
const PROMOSI_AGENDA_TABLE_DATA = [
  { komponen: 'Singapore Business Mission & Forum', bobot: 25, target: '50 Leads', nilai: 58, status: 'Sangat Baik' },
  { komponen: 'Batam International Business Summit', bobot: 22, target: '45 Leads', nilai: 54, status: 'Sangat Baik' },
  { komponen: 'Hannover Messe Industri (Jerman)', bobot: 20, target: '35 Leads', nilai: 42, status: 'Optimal' },
  { komponen: 'Tokyo High-Tech & Semiconductor Expo', bobot: 15, target: '30 Leads', nilai: 35, status: 'Optimal' },
  { komponen: 'World Cities Summit (Singapura)', bobot: 10, target: '25 Leads', nilai: 28, status: 'Baik' },
  { komponen: 'Taipei Electronics & EV Mission', bobot: 8, target: '15 Leads', nilai: 21, status: 'Optimal' },
];

const PROMOSI_TREND_TAHUNAN = [
  { tahun: '2021', target: 120, skor: 128 },
  { tahun: '2022', target: 140, skor: 145 },
  { tahun: '2023', target: 160, skor: 168 },
  { tahun: '2024', target: 180, skor: 185 },
  { tahun: '2025', target: 200, skor: 218 },
  { tahun: '2026', target: 220, skor: 240 },
];

// 3. Data Tabel & Komparasi Pilar KEK (IKP 3 - Model Persis Gambar Referensi)
const KEK_PILAR_TABLE_DATA = [
  { komponen: 'Hilirisasi Semikonduktor & Rantai Pasok EV', bobot: 30, target: '100%', nilai: 100, status: 'Optimal' },
  { komponen: 'Kemitraan KEK Nongsa Digital Park & AI Hub', bobot: 25, target: '100%', nilai: 100, status: 'Optimal' },
  { komponen: 'Daya Saing Logistik Maritim & MRO KEK BAT', bobot: 25, target: '100%', nilai: 100, status: 'Sangat Baik' },
  { komponen: 'Pengembangan KEK Hijau & Green Data Center', bobot: 20, target: '100%', nilai: 100, status: 'Sangat Baik' },
];

const KEK_TREND_TAHUNAN = [
  { tahun: '2021', target: 100, skor: 98 },
  { tahun: '2022', target: 100, skor: 100 },
  { tahun: '2023', target: 100, skor: 100 },
  { tahun: '2024', target: 100, skor: 100 },
  { tahun: '2025', target: 100, skor: 100 },
  { tahun: '2026', target: 100, skor: 100 },
];

// 4. Data Tabel & Komparasi Pengendalian BU (IKP 4 - Model Persis Gambar Referensi)
const PENGENDALIAN_BU_TABLE_DATA = [
  { komponen: 'BU Pelabuhan & Logistik Maritim (10 PKS)', bobot: 30, target: '100%', nilai: 97.4, status: 'Optimal' },
  { komponen: 'BU Fasilitas Bandara & Kargo (6 PKS)', bobot: 25, target: '100%', nilai: 96.2, status: 'Optimal' },
  { komponen: 'BU SPAM & Pengelolaan Air Baku (8 PKS)', bobot: 25, target: '100%', nilai: 93.3, status: 'Baik' },
  { komponen: 'BU Rumah Sakit & Fasilitas Medis (4 PKS)', bobot: 20, target: '100%', nilai: 93.8, status: 'Baik' },
];

const PENGENDALIAN_TREND_TAHUNAN = [
  { tahun: '2021', target: 75.0, skor: 78.0 },
  { tahun: '2022', target: 80.0, skor: 82.4 },
  { tahun: '2023', target: 85.0, skor: 85.8 },
  { tahun: '2024', target: 90.0, skor: 88.5 },
  { tahun: '2025', target: 100.0, skor: 95.45 },
  { tahun: '2026', target: 100.0, skor: 97.2 },
];

export const InvestasiPengusahaanVisualCharts: React.FC<
  InvestasiPengusahaanVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Tab state: ikp-1, ikp-2, ikp-3, ikp-4
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'ikp-3' | 'ikp-4'>('ikp-1');
  const [radarMode, setRadarMode] = useState<'grafik' | 'tabel'>('grafik');
  const [investasiChartMode, setInvestasiChartMode] = useState<'grafik' | 'tabel'>('grafik');
  const [promosiChartMode, setPromosiChartMode] = useState<'grafik' | 'tabel'>('grafik');
  const [kekChartMode, setKekChartMode] = useState<'grafik' | 'tabel'>('grafik');
  const [pengendalianChartMode, setPengendalianChartMode] = useState<'grafik' | 'tabel'>('grafik');

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
        <div className="lg:col-span-3 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5 flex flex-col justify-between self-stretch">
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
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 font-mono">
                  0-130%
                </span>
                <div className="inline-flex items-center p-0.5 bg-white border border-slate-200 rounded-md shrink-0">
                  <button
                    type="button"
                    onClick={() => setRadarMode('grafik')}
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      radarMode === 'grafik' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>Grafik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRadarMode('tabel')}
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      radarMode === 'tabel' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Tabel</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Radar Visual vs Tabel Detail */}
            {radarMode === 'grafik' ? (
              <div className="h-36 sm:h-40 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={RADAR_4_IKP_A4} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                    <PolarGrid stroke="#CBD5E1" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#334155', fontSize: 9, fontWeight: 700 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 130]} stroke="#94A3B8" fontSize={7.5} />
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
                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '2px' }} />
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
            ) : (
              <div className="h-36 sm:h-40 w-full mt-1 overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                    <tr>
                      <th className="py-1 px-1.5">Indikator IKP</th>
                      <th className="py-1 px-1 text-right">Target</th>
                      <th className="py-1 px-1 text-right font-black">Realisasi</th>
                      <th className="py-1 px-1 text-center">Capaian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[10px]">
                    {RADAR_4_IKP_A4.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-1.5 font-bold text-slate-800">{row.subject}</td>
                        <td className="py-1.5 px-1 text-right text-slate-500">100%</td>
                        <td className="py-1.5 px-1 text-right font-semibold text-slate-900">{row.skorAsli}</td>
                        <td className="py-1.5 px-1 text-center">
                          <span className={`px-1 py-0.2 rounded font-bold text-[9.5px] ${
                            row.realisasi >= 100
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                            {row.realisasi.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Status: 4 IKP Optimal On Track
            </span>
            <span className="font-mono text-emerald-600 font-bold">102.72% Rerata</span>
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
              className={`flex-1 min-w-[120px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-1'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>1. Realisasi Investasi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ikp-2')}
              className={`flex-1 min-w-[120px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-2'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>2. Fasilitasi Promosi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ikp-3')}
              className={`flex-1 min-w-[120px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-3'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3. Kajian KEK</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ikp-4')}
              className={`flex-1 min-w-[120px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikp-4'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4. Pengendalian BU</span>
            </button>
          </div>

          {/* ================================================================ */}
          {/* TAB 1: IKP 1 - REALISASI INVESTASI                              */}
          {/* ================================================================ */}
          {activeTab === 'ikp-1' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Realisasi Penanaman Modal di KPBPB Batam (7 Sektor Unggulan)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    106,4% Melampaui
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-1-investasi-kpbpb')}
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
                  <span className="text-base font-bold text-slate-900">Rp 63,85 T</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">106,4% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">Rp 60,00 T</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">KPU Bea Cukai &amp; BKPM</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Sektor Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">Elektronik (15,85 T)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Bobot 25%</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Sektor Industri Investasi</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai (Rp T)</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {INVESTASI_SEKTOR_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">Rp {row.nilai.toFixed(2)} T</td>
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

                {/* Visualisasi Grafis Tren & Komparasi (WITH SHEET SWAP) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                    <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => setInvestasiChartMode('grafik')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          investasiChartMode === 'grafik'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan grafik"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>Grafik</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvestasiChartMode('tabel')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          investasiChartMode === 'tabel'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan tabel detail"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Tabel Detail</span>
                      </button>
                    </div>
                  </div>

                  {investasiChartMode === 'grafik' ? (
                    <>
                      {/* Box 1: Tren Realisasi Investasi */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Tren Realisasi Investasi (2021 - 2026)
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={INVESTASI_TREND_TAHUNAN} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis domain={[35, 75]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v) => [`Rp ${v} T`, 'Investasi']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                              <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} name="Realisasi" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Box 2: Capaian Nilai vs Bobot 7 Sektor */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Capaian Nilai vs Bobot 7 Sektor
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={INVESTASI_SEKTOR_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis
                                dataKey="komponen"
                                tick={{ fontSize: 7, fill: '#64748B' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => val.split(' ')[0]}
                              />
                              <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v, name) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai (Rp T)']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                              <Bar dataKey="nilai" fill="#3B82F6" radius={[2, 2, 0, 0]} name="nilai" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                      <table className="w-full text-[10px] text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                          <tr>
                            <th className="p-1.5">Tahun</th>
                            <th className="p-1.5 text-right">Target</th>
                            <th className="p-1.5 text-right">Realisasi</th>
                            <th className="p-1.5 text-right">Capaian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {INVESTASI_TREND_TAHUNAN.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-1.5 font-medium">{row.tahun}</td>
                              <td className="p-1.5 text-right font-mono text-slate-500">Rp {row.target.toFixed(1)} T</td>
                              <td className="p-1.5 text-right font-mono font-bold text-blue-700">Rp {row.skor.toFixed(2)} T</td>
                              <td className="p-1.5 text-right font-mono text-emerald-600 font-semibold">
                                {((row.skor / row.target) * 100).toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: IKP 2 - FASILITASI PROMOSI INVESTASI                     */}
          {/* ================================================================ */}
          {activeTab === 'ikp-2' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Minat &amp; Fasilitasi Promosi Investasi (6 Agenda Internasional)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    109,0% Melampaui
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-2-promosi-investasi')}
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
                  <span className="text-base font-bold text-slate-900">218 Leads LOI</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">109,0% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">200 Leads</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Dit. Promosi &amp; Fasilitasi</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Agenda Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">Singapore Mission (58)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Bobot 25%</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Agenda Promosi / Forum Bisnis</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai (Leads)</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PROMOSI_AGENDA_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.nilai} Leads</td>
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

                {/* Visualisasi Grafis Tren & Komparasi (WITH SHEET SWAP) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                    <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => setPromosiChartMode('grafik')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          promosiChartMode === 'grafik'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan grafik"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>Grafik</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPromosiChartMode('tabel')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          promosiChartMode === 'tabel'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan tabel detail"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Tabel Detail</span>
                      </button>
                    </div>
                  </div>

                  {promosiChartMode === 'grafik' ? (
                    <>
                      {/* Box 1: Tren Minat Investasi */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Tren Minat Investasi Masuk (2021 - 2026)
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={PROMOSI_TREND_TAHUNAN} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis domain={[100, 260]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v) => [`${v} Leads`, 'Minat Investasi']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                              <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} name="Realisasi" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Box 2: Capaian Nilai vs Bobot 6 Agenda */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Capaian Nilai vs Bobot 6 Agenda
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PROMOSI_AGENDA_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis
                                dataKey="komponen"
                                tick={{ fontSize: 7, fill: '#64748B' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => val.split(' ')[0]}
                              />
                              <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v, name) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai (Leads)']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                              <Bar dataKey="nilai" fill="#3B82F6" radius={[2, 2, 0, 0]} name="nilai" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                      <table className="w-full text-[10px] text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                          <tr>
                            <th className="p-1.5">Tahun</th>
                            <th className="p-1.5 text-right">Target</th>
                            <th className="p-1.5 text-right">Realisasi</th>
                            <th className="p-1.5 text-right">Capaian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {PROMOSI_TREND_TAHUNAN.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-1.5 font-medium">{row.tahun}</td>
                              <td className="p-1.5 text-right font-mono text-slate-500">{row.target} Leads</td>
                              <td className="p-1.5 text-right font-mono font-bold text-blue-700">{row.skor} Leads</td>
                              <td className="p-1.5 text-right font-mono text-emerald-600 font-semibold">
                                {((row.skor / row.target) * 100).toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: IKP 3 - KAJIAN KEK                                        */}
          {/* ================================================================ */}
          {activeTab === 'ikp-3' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Kajian Kebutuhan &amp; Rekomendasi Fasilitas KEK (4 Pilar Utama)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    100,0% Tercapai
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-3-kajian-kek')}
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
                  <span className="text-base font-bold text-slate-900">100% Selesai</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">4 dari 4 Pilar Tuntas</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">100% Dokumen</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Dit. Perencanaan &amp; KEK</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Pilar Prioritas</span>
                  <span className="text-base font-bold text-slate-900">Semikonduktor (100%)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Bobot 30%</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Pilar Kajian &amp; Fasilitasi KEK</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai (%)</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {KEK_PILAR_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.nilai}%</td>
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

                {/* Visualisasi Grafis Tren & Komparasi (WITH SHEET SWAP) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                    <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => setKekChartMode('grafik')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          kekChartMode === 'grafik'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan grafik"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>Grafik</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setKekChartMode('tabel')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          kekChartMode === 'tabel'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan tabel detail"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Tabel Detail</span>
                      </button>
                    </div>
                  </div>

                  {kekChartMode === 'grafik' ? (
                    <>
                      {/* Box 1: Tren Kepatuhan Kajian KEK */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Tren Kepatuhan Kajian KEK (2021 - 2026)
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={KEK_TREND_TAHUNAN} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis domain={[90, 105]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v) => [`${v}%`, 'Kajian KEK']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                              <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} name="Realisasi" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Box 2: Capaian Nilai vs Bobot 4 Pilar */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Capaian Nilai vs Bobot 4 Pilar
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={KEK_PILAR_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis
                                dataKey="komponen"
                                tick={{ fontSize: 7, fill: '#64748B' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => val.split(' ')[0]}
                              />
                              <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v, name) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai (%)']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                              <Bar dataKey="nilai" fill="#3B82F6" radius={[2, 2, 0, 0]} name="nilai" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                      <table className="w-full text-[10px] text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                          <tr>
                            <th className="p-1.5">Tahun</th>
                            <th className="p-1.5 text-right">Target</th>
                            <th className="p-1.5 text-right">Realisasi</th>
                            <th className="p-1.5 text-right">Capaian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {KEK_TREND_TAHUNAN.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-1.5 font-medium">{row.tahun}</td>
                              <td className="p-1.5 text-right font-mono text-slate-500">{row.target}%</td>
                              <td className="p-1.5 text-right font-mono font-bold text-blue-700">{row.skor}%</td>
                              <td className="p-1.5 text-right font-mono text-emerald-600 font-semibold">
                                {((row.skor / row.target) * 100).toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: IKP 4 - PENGENDALIAN BADAN USAHA                          */}
          {/* ================================================================ */}
          {activeTab === 'ikp-4' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Pengendalian &amp; Kepatuhan PKS Badan Usaha (4 Klaster Layanan)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    95,5% Optimal
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenFormulaModal('ikp-4-pengendalian-pengusahaan')}
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
                  <span className="text-base font-bold text-slate-900">95,45% Kepatuhan</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">Optimal On Track</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">100,00% Kepatuhan</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Dit. Pengendalian BU</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Klaster Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">Kepelabuhanan (97,4%)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">10 PKS Aktif (Bobot 30%)</span>
                </div>
              </div>

              {/* Grid: Tabel Kiri (7 Col) & Grafik Kanan (5 Col) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                {/* Tabel Rincian */}
                <div className="lg:col-span-7 overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                      <tr>
                        <th className="py-1.5 px-2.5">Klaster Layanan Kerja Sama BU</th>
                        <th className="py-1.5 px-2 text-right">Bobot</th>
                        <th className="py-1.5 px-2 text-right">Nilai (%)</th>
                        <th className="py-1.5 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PENGENDALIAN_BU_TABLE_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                          <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                          <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.nilai.toFixed(1)}%</td>
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

                {/* Visualisasi Grafis Tren & Komparasi (WITH SHEET SWAP) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Tren &amp; Komparasi</span>
                    <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => setPengendalianChartMode('grafik')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          pengendalianChartMode === 'grafik'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan grafik"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>Grafik</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPengendalianChartMode('tabel')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          pengendalianChartMode === 'tabel'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan tabel detail"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Tabel Detail</span>
                      </button>
                    </div>
                  </div>

                  {pengendalianChartMode === 'grafik' ? (
                    <>
                      {/* Box 1: Tren Kepatuhan PKS */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Tren Kepatuhan Mitra PKS (2021 - 2026)
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={PENGENDALIAN_TREND_TAHUNAN} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis domain={[70, 105]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v) => [`${v}%`, 'Kepatuhan PKS']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} name="Target" />
                              <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} name="Realisasi" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Box 2: Capaian Nilai vs Bobot 4 Klaster */}
                      <div className="bg-slate-50/60 p-2 rounded-lg border border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          Capaian Nilai vs Bobot 4 Klaster
                        </span>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PENGENDALIAN_BU_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis
                                dataKey="komponen"
                                tick={{ fontSize: 7, fill: '#64748B' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => val.split(' ')[0]}
                              />
                              <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <Tooltip formatter={(v, name) => [`${v}`, name === 'bobot' ? 'Bobot (%)' : 'Nilai (%)']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                              <Bar dataKey="bobot" fill="#CBD5E1" radius={[2, 2, 0, 0]} name="bobot" />
                              <Bar dataKey="nilai" fill="#3B82F6" radius={[2, 2, 0, 0]} name="nilai" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
                      <table className="w-full text-[10px] text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                          <tr>
                            <th className="p-1.5">Tahun</th>
                            <th className="p-1.5 text-right">Target</th>
                            <th className="p-1.5 text-right">Realisasi</th>
                            <th className="p-1.5 text-right">Capaian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {PENGENDALIAN_TREND_TAHUNAN.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-1.5 font-medium">{row.tahun}</td>
                              <td className="p-1.5 text-right font-mono text-slate-500">{row.target}%</td>
                              <td className="p-1.5 text-right font-mono font-bold text-blue-700">{row.skor}%</td>
                              <td className="p-1.5 text-right font-mono text-emerald-600 font-semibold">
                                {((row.skor / row.target) * 100).toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

