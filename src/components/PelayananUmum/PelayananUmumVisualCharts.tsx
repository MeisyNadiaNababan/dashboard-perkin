import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  ReferenceLine,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  Layers,
  HelpCircle,
  Award,
  CheckCircle2,
  Stethoscope,
  Droplets,
  Sparkles,
} from 'lucide-react';
import {
  MONTHLY_FINANCIAL_PERFORMANCE,
  IKM_BU_GABUNGAN_DATA,
  IKM_BU_RINGKASAN,
  PIE_PNBP_DATA,
  FINANCIAL_TOWER_CONSOLIDATED,
} from './pelayananUmumData';

interface VisualChartsProps {
  onOpenFormulaModal?: () => void;
}

export const PelayananUmumVisualCharts: React.FC<VisualChartsProps> = ({
  onOpenFormulaModal,
}) => {
  const [chartTab, setChartTab] = useState<'financial' | 'ikm' | 'distribution'>('ikm');
  const [ikmChartMode, setIkmChartMode] = useState<'bar_line' | 'radar'>('bar_line');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 p-4 sm:p-5 space-y-4">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>ANALISIS VISUAL KINERJA STRATEGIS PELAYANAN UMUM</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              EVALUASI TA 2025/2026
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Korelasikan serapan belanja vs penerimaan PNBP bulanan, visualisasi IKM gabungan 2 Badan Usaha, serta proporsi penerimaan
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setChartTab('financial')}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
              chartTab === 'financial'
                ? 'bg-white text-slate-900 shadow-2xs font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tren Belanja vs PNBP
          </button>
          <button
            onClick={() => setChartTab('ikm')}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
              chartTab === 'ikm'
                ? 'bg-white text-blue-700 shadow-2xs font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gabungan IKM RS & SPAM
          </button>
          <button
            onClick={() => setChartTab('distribution')}
            className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
              chartTab === 'distribution'
                ? 'bg-white text-slate-900 shadow-2xs font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Proporsi PNBP
          </button>
        </div>
      </div>

      {/* Dynamic Chart Display */}
      {chartTab === 'financial' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Grafik Bulanan: Anggaran Belanja (Bar) vs Capaian PNBP (Line) - TA 2025/2026 (Rp Miliar)</span>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-[#002B49]" /> Total Belanja (3 Unit)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-xs bg-emerald-500" /> Total PNBP (3 Unit)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_FINANCIAL_PERFORMANCE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="bulan" tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis unit=" M" tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700 font-mono">
                          <strong className="text-cyan-300 block border-b border-slate-700 pb-1">{label}</strong>
                          <div className="flex justify-between gap-4">
                            <span>Total Belanja:</span>
                            <span className="font-bold text-white">Rp {payload[0]?.value} M</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span>Total PNBP:</span>
                            <span className="font-bold text-emerald-400">Rp {payload[1]?.value} M</span>
                          </div>
                          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                            Realisasi Konsolidasi 3 Satker Deputi 4
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="totalBelanja" name="Total Belanja" fill="#002B49" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line
                  type="monotone"
                  dataKey="totalPnbp"
                  name="Total PNBP"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981' }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* COMBINED IKM VISUALIZATION (RUMAH SAKIT & SPAM) */}
      {chartTab === 'ikm' && (
        <div className="space-y-4">
          {/* Executive Summary Cards for 2 Badan Usaha */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric Gabungan */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  RERATA GABUNGAN 2 BU
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono">
                  {IKM_BU_RINGKASAN.mutuGabungan}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-2xl font-black text-emerald-950 font-mono">
                  {IKM_BU_RINGKASAN.rataRataGabungan}
                </span>
                <span className="text-xs font-bold text-emerald-700 font-mono">
                  / 100
                </span>
              </div>
              <div className="mt-1 text-[11px] text-emerald-700 flex items-center justify-between font-mono">
                <span>Target Perkin: {IKM_BU_RINGKASAN.targetPerkin}</span>
                <span className="font-bold">+{ (IKM_BU_RINGKASAN.rataRataGabungan - IKM_BU_RINGKASAN.targetPerkin).toFixed(2) } Terlampaui</span>
              </div>
            </div>

            {/* BU Rumah Sakit */}
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                  <span>BU RUMAH SAKIT (RSBP)</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-800 font-mono">
                  {IKM_BU_RINGKASAN.buRumahSakit.mutu}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-2xl font-black text-rose-950 font-mono">
                  {IKM_BU_RINGKASAN.buRumahSakit.skor}
                </span>
                <span className="text-xs font-bold text-rose-700 font-mono">
                  Sangat Baik
                </span>
              </div>
              <p className="mt-1 text-[10px] text-rose-700 leading-tight">
                Keunggulan: Kompetensi Medis (92.5) & Kesopanan (91.8)
              </p>
            </div>

            {/* BU SPAM Fasling */}
            <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  <span>BU SPAM, FASILITAS & LINGKUNGAN</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-200 text-cyan-800 font-mono">
                  {IKM_BU_RINGKASAN.buSpamFasling.mutu}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-2xl font-black text-cyan-950 font-mono">
                  {IKM_BU_RINGKASAN.buSpamFasling.skor}
                </span>
                <span className="text-xs font-bold text-cyan-700 font-mono">
                  Sangat Baik
                </span>
              </div>
              <p className="mt-1 text-[10px] text-cyan-700 leading-tight">
                Keunggulan: Kepastian Tarif (89.6) & Sarana WTP/Rusun (89.0)
              </p>
            </div>
          </div>

          {/* Sub-header with chart view switch */}
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">
                Visualisasi 9 Unsur Pelayanan Publik (PermenPAN-RB No. 14/2017)
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                • Target Perkin: 88.31
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-[10px] font-bold">
              <button
                onClick={() => setIkmChartMode('bar_line')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  ikmChartMode === 'bar_line'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Grafik Batang & Garis Gabungan
              </button>
              <button
                onClick={() => setIkmChartMode('radar')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  ikmChartMode === 'radar'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Radar Gabungan (RSBP vs SPAM)
              </button>
            </div>
          </div>

          {/* Chart View 1: Composed Bar + Line Gabungan */}
          {ikmChartMode === 'bar_line' ? (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={IKM_BU_GABUNGAN_DATA}
                  margin={{ top: 15, right: 15, left: -10, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="unsur"
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis domain={[80, 100]} tick={{ fill: '#64748B', fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 font-mono border border-slate-700">
                            <strong className="text-cyan-300 block border-b border-slate-700 pb-1">
                              {label}
                            </strong>
                            <div className="text-rose-400 flex justify-between gap-4">
                              <span>BU Rumah Sakit:</span>
                              <span className="font-bold">{payload[0]?.value}</span>
                            </div>
                            <div className="text-cyan-400 flex justify-between gap-4">
                              <span>BU SPAM Fasling:</span>
                              <span className="font-bold">{payload[1]?.value}</span>
                            </div>
                            <div className="text-emerald-400 flex justify-between gap-4 pt-1 border-t border-slate-800">
                              <span className="font-bold">Rerata Gabungan:</span>
                              <span className="font-extrabold">{payload[2]?.value}</span>
                            </div>
                            <div className="text-indigo-300 text-[10px] pt-0.5">
                              Target Perkin No. 6/KA/3/2025: 88.31
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: 11 }}
                  />
                  <ReferenceLine
                    y={88.31}
                    stroke="#6366F1"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: 'Target Perkin (88.31)',
                      fill: '#6366F1',
                      fontSize: 10,
                      position: 'insideTopRight',
                    }}
                  />
                  <Bar
                    dataKey="rs"
                    name="BU Rumah Sakit (RSBP)"
                    fill="#F43F5E"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={24}
                  />
                  <Bar
                    dataKey="spam"
                    name="BU SPAM, Fasilitas & Lingkungan"
                    fill="#06B6D4"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={24}
                  />
                  <Line
                    type="monotone"
                    dataKey="gabungan"
                    name="Rerata Gabungan 2 BU"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            /* Chart View 2: Radar Chart Gabungan RSBP & SPAM */
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  outerRadius={105}
                  data={IKM_BU_GABUNGAN_DATA.map((item) => ({
                    unsur: item.unsur ? (item.unsur.split('.')?.[0] + '.' + (item.unsur.split('.')?.[1]?.slice(0, 10) || '')) : '',
                    fullUnsur: item.unsur,
                    rs: item.rs,
                    spam: item.spam,
                    gabungan: item.gabungan,
                  }))}
                >
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="unsur" tick={{ fill: '#475569', fontSize: 10 }} />
                  <PolarRadiusAxis domain={[80, 95]} stroke="#CBD5E1" tick={{ fontSize: 9 }} />
                  <Radar
                    name="BU Rumah Sakit (RSBP)"
                    dataKey="rs"
                    stroke="#F43F5E"
                    fill="#F43F5E"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="BU SPAM Fasling"
                    dataKey="spam"
                    stroke="#06B6D4"
                    fill="#06B6D4"
                    fillOpacity={0.25}
                  />
                  <Radar
                    name="Rerata Gabungan 2 BU"
                    dataKey="gabungan"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0]?.payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 font-mono border border-slate-700">
                            <strong className="text-cyan-300 block">{data?.fullUnsur}</strong>
                            <div className="text-rose-400">RSBP: {data?.rs}</div>
                            <div className="text-cyan-400">SPAM: {data?.spam}</div>
                            <div className="text-emerald-400 font-bold border-t border-slate-800 pt-1">
                              Gabungan: {data?.gabungan}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Context Note */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Catatan Tata Kelola:</strong> Sesuai Indikator Kinerja Program Deputi 4 (Indikator 3: <em>Rata-rata IKM Pengguna Layanan Badan Usaha</em>), survei IKM difokuskan langsung pada 2 Badan Usaha pemberi layanan publik transaksional (RSBP Batam dan BU SPAM Fasling). Direktorat Pengamanan Aset dan Kawasan merupakan direktorat operasional/penegakan kepatuhan kawasan yang dievaluasi melalui Indikator Keamanan dan Pengawasan Aset.
            </p>
          </div>
        </div>
      )}

      {/* PROPORSI PNBP */}
      {chartTab === 'distribution' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_PNBP_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {PIE_PNBP_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`Rp ${val} Miliar`, 'Realisasi PNBP']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                PROPORSI KONTRIBUSI PNBP (TOTAL RP {FINANCIAL_TOWER_CONSOLIDATED.totalRealisasiPnbpMiliar.toFixed(1)}M)
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                107.9% Capaian
              </span>
            </div>

            <div className="space-y-2">
              {PIE_PNBP_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.persen.toFixed(1)}% dari total PNBP Deputi
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 font-mono">
                    Rp {item.value.toFixed(1)}M
                  </span>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-900">
              <strong>Kontribusi Terbesar:</strong> BU SPAM Fasling menyumbang 53.2% dari total PNBP fungsional, disusul oleh BU Rumah Sakit sebesar 45.4%. Kedua Badan Usaha menghasilkan surplus operasional mandiri senilai +Rp {FINANCIAL_TOWER_CONSOLIDATED.buNetSurplusMiliar.toFixed(1)}M.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

