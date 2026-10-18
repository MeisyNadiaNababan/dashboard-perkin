import React, { useState } from 'react';
import {
  MapPin,
  Anchor,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  Clock,
  Building2,
  FileCode2,
  Table,
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

interface PengelolaanLahanPesisirVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// Data Radar Capaian 3 IKP Perkin A3 (Normalized to 100% target baseline)
const RADAR_3_IKP_A3 = [
  { subject: '1. Alokasi Lahan (Dit. Lahan)', target: 100, realisasi: 124.3, skorAsli: '248,50 Ha / 200,00 Ha' },
  { subject: '2. Izin Pesisir (Dit. Pesisir)', target: 100, realisasi: 108.5, skorAsli: '162,80 Ha / 150,00 Ha' },
  { subject: '3. Pengawasan (Dit. Pengendalian)', target: 100, realisasi: 117.3, skorAsli: '93,80% / 80,00%' },
];

// Tren Tahunan IKP 1: Alokasi Lahan untuk Investasi (Ha)
const LAHAN_TREND_ANNUAL = [
  { tahun: '2022', skor: 175.4, target: 160.0 },
  { tahun: '2023', skor: 192.8, target: 180.0 },
  { tahun: '2024', skor: 215.2, target: 190.0 },
  { tahun: '2025', skor: 236.0, target: 200.0 },
  { tahun: '2026', skor: 248.5, target: 200.0 },
];

// Tren Tahunan IKP 2: Luas Izin Pesisir dan Reklamasi (Ha)
const PESISIR_TREND_ANNUAL = [
  { tahun: '2022', skor: 118.2, target: 110.0 },
  { tahun: '2023', skor: 130.5, target: 125.0 },
  { tahun: '2024', skor: 142.1, target: 135.0 },
  { tahun: '2025', skor: 154.6, target: 145.0 },
  { tahun: '2026', skor: 162.8, target: 150.0 },
];

// Tren Tahunan IKP 3: Keberhasilan Pengawasan & Pengendalian (%)
const PENGAWASAN_TREND_ANNUAL = [
  { tahun: '2022', skor: 76.5, target: 70.0 },
  { tahun: '2023', skor: 81.2, target: 75.0 },
  { tahun: '2024', skor: 86.4, target: 75.0 },
  { tahun: '2025', skor: 90.5, target: 78.0 },
  { tahun: '2026', skor: 93.8, target: 80.0 },
];

// Tren Konsolidasi Anggaran & PNBP (2022 - 2026)
const KONSOLIDASI_TREND_ANNUAL = [
  { tahun: '2022', pnbpM: 610.5, paguM: 78.2 },
  { tahun: '2023', pnbpM: 680.2, paguM: 82.5 },
  { tahun: '2024', pnbpM: 742.0, paguM: 88.0 },
  { tahun: '2025', pnbpM: 775.4, paguM: 90.5 },
  { tahun: '2026', pnbpM: 800.7, paguM: 92.5 },
];

export const PengelolaanLahanPesisirVisualCharts: React.FC<
  PengelolaanLahanPesisirVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Tab state matching user reference: ikp-1, ikp-2, ikp-3, matriks
  const [activeTab, setActiveTab] = useState<'ikp-1' | 'ikp-2' | 'ikp-3' | 'matriks'>('ikp-1');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5 font-sans">
      {/* Two Column Grid: Left is Radar Chart (NO MINI CARDS BELOW IT AS REQUESTED), Right is Detailed Table + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 3 IKP (TANPA KARTU MINI DI BAWAHNYA) */}
        {/* ================================================================== */}
        <div className="lg:col-span-4 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Radar Capaian 3 IKP DEP-A3
                </h3>
                <p className="text-[10px] text-slate-500">
                  Realisasi Aktual vs Target Penetapan Perkin A3 2026
                </p>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                0 - 130%
              </span>
            </div>

            {/* Radar Visual */}
            <div className="h-56 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_3_IKP_A3} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
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
              Status: 3 IKP Melampaui Target
            </span>
            <span className="font-mono text-emerald-600 font-bold">116.68% Rerata</span>
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
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>IKP 1 &bull; Dit. Lahan</span>
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
                <Anchor className="w-3.5 h-3.5 text-cyan-600" />
                <span>IKP 2 &bull; Dit. Pesisir</span>
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
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>IKP 3 &bull; Pengendalian</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('matriks')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'matriks'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Matriks Sinergi Satker</span>
              </button>
            </div>

            {onOpenFormulaModal && (
              <button
                onClick={() =>
                  onOpenFormulaModal(
                    activeTab === 'ikp-1'
                      ? 'ikp-1-lahan-investasi'
                      : activeTab === 'ikp-2'
                      ? 'ikp-2-pesisir-reklamasi'
                      : activeTab === 'ikp-3'
                      ? 'ikp-3-pengawasan-pengendalian'
                      : 'ikp-1-lahan-investasi'
                  )
                }
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Lihat Metodologi Formula</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* DYNAMIC TAB BODY: SIDE-BY-SIDE (DETAIL TABEL PERSIS GAMBAR REFERENSI & GRAFIK TREN SEPERTI DEP-A2) */}

          {/* TAB 1: IKP-1 DIT. PENGELOLAAN LAHAN */}
          {activeTab === 'ikp-1' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Luas Lahan yang Dialokasikan untuk Investasi (Halaman 6-8 Buku Satu Data)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                    124,3% Melampaui Target
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-1-lahan-investasi')}
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
                  <span className="text-base font-bold text-slate-900">248,50 Hektar</span>
                  <span className="text-[9.5px] text-blue-700 block mt-0.5">124,3% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">200,00 Hektar</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">+48,50 Ha Surplus</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Dit. Pengelolaan Lahan</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">KPBPB Batam</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Side-by-Side Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
                <div className="xl:col-span-7 bg-white rounded-xl border border-blue-200 p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1.5">
                      <span>Daftar Alokasi Lahan Investasi:</span>
                      <span className="text-[9.5px] font-normal text-slate-400">5 Perusahaan Sampel</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-[10.5px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                            <th className="py-1 px-1.5">NAMA PERUSAHAAN</th>
                            <th className="py-1 px-1.5">WILAYAH</th>
                            <th className="py-1 px-1.5 text-right">LUAS (HA)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Nongsa Digital Park</td>
                            <td className="py-1 px-1.5 text-slate-500">SWP II Nongsa (KEK Digital)</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">58.20 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Kabil Citranusa</td>
                            <td className="py-1 px-1.5 text-slate-500">SWP III Kabil (Industri Berat)</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">96.40 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Batam City Centre Propertindo</td>
                            <td className="py-1 px-1.5 text-slate-500">SWP I Batam Centre (Komersial)</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">41.80 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Batam Island Hospital &amp; Wellness</td>
                            <td className="py-1 px-1.5 text-slate-500">SWP V Sekupang (KEK Kesehatan)</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">31.50 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Batam Integrated Logistics</td>
                            <td className="py-1 px-1.5 text-slate-500">SWP IV Batu Ampar (Depo Logistik)</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">20.60 Ha</td>
                          </tr>
                          <tr className="bg-blue-50/60 font-bold border-t border-blue-200">
                            <td className="py-1 px-1.5 text-blue-900">Total Alokasi Investasi</td>
                            <td className="py-1 px-1.5 text-[10px] text-blue-700">KPBPB Batam (Target: 200,00 Ha)</td>
                            <td className="py-1 px-1.5 text-right font-mono text-blue-800">248.50 Ha</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
                <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xs font-bold text-slate-800">
                        Tren Historis Alokasi Lahan (2022 - 2026)
                      </h5>
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        Hektar
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">
                      Trajektori realisasi alokasi investasi riil vs target Perkin
                    </p>

                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={LAHAN_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                          <YAxis domain={[140, 270]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                          <Tooltip
                            formatter={(val: any, name: any) => [`${val} Ha`, name]}
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
                            name="Realisasi Alokasi"
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
                      <span className="text-xs font-black text-emerald-600">+48,5 Ha (+24,3%)</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-500 block">Komitmen Investasi</span>
                      <span className="text-xs font-black text-blue-700">Rp 18,42 Triliun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IKP-2 DIT. PESISIR & REKLAMASI */}
          {activeTab === 'ikp-2' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Luas Izin Kawasan Pesisir &amp; Izin Reklamasi Investasi (Hal. 13-14)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 font-mono">
                    108,5% Tercapai Sangat Baik
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-2-pesisir-reklamasi')}
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
                  <span className="text-base font-bold text-slate-900">162,80 Hektar</span>
                  <span className="text-[9.5px] text-cyan-700 block mt-0.5">108,5% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">150,00 Hektar</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">+12,80 Ha Surplus</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Dit. Pesisir &amp; Reklamasi</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Ruang Laut KPBPB</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Side-by-Side Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
                <div className="xl:col-span-7 bg-white rounded-xl border border-cyan-200 p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1.5">
                      <span>Daftar Izin Pesisir &amp; Reklamasi (PKKPRL):</span>
                      <span className="text-[9.5px] font-normal text-slate-400">5 Perusahaan Sampel</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-[10.5px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                            <th className="py-1 px-1.5">NAMA PERUSAHAAN</th>
                            <th className="py-1 px-1.5">WILAYAH</th>
                            <th className="py-1 px-1.5 text-right">LUAS (HA)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Kabil Indonusa Maritim</td>
                            <td className="py-1 px-1.5 text-slate-500">Kabil &amp; Pesisir Timur</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-cyan-700">56.20 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Tanjung Sauh Port Development</td>
                            <td className="py-1 px-1.5 text-slate-500">Tanjung Sauh</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-cyan-700">44.80 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Sambau Luxury Marina &amp; Resort</td>
                            <td className="py-1 px-1.5 text-slate-500">Nongsa &amp; Sambau (Pesisir Utara)</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-cyan-700">32.50 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Sekupang Shipyard Nusantara</td>
                            <td className="py-1 px-1.5 text-slate-500">Batam Barat &amp; Sekupang</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-cyan-700">19.40 Ha</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">PT Galang Bahari Nusantara</td>
                            <td className="py-1 px-1.5 text-slate-500">Galang &amp; Sekitarnya</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-cyan-700">9.90 Ha</td>
                          </tr>
                          <tr className="bg-cyan-50/60 font-bold border-t border-cyan-200">
                            <td className="py-1 px-1.5 text-cyan-950">Total Izin Pesisir &amp; Reklamasi</td>
                            <td className="py-1 px-1.5 text-[10px] text-cyan-800">Ruang Laut KPBPB (Target: 150,00 Ha)</td>
                            <td className="py-1 px-1.5 text-right font-mono text-cyan-900">162.80 Ha</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
                <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xs font-bold text-slate-800">
                        Tren Historis Izin Pesisir (2022 - 2026)
                      </h5>
                      <span className="text-[10px] font-mono font-bold text-cyan-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        Hektar
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">
                      Kinerja penerbitan izin pemanfaatan perairan &amp; reklamasi
                    </p>

                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={PESISIR_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                          <YAxis domain={[100, 180]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
                          <Tooltip
                            formatter={(val: any, name: any) => [`${val} Ha`, name]}
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
                            name="Realisasi Izin"
                            stroke="#0891B2"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: '#0891B2' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 mt-1">
                    <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-500 block">Surplus Capaian</span>
                      <span className="text-xs font-black text-cyan-700">+12,8 Ha (+8,5%)</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-500 block">Kepatuhan Zonasi</span>
                      <span className="text-xs font-black text-emerald-600">100% Nir-Konflik</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IKP-3 DIT. PENGENDALIAN PENGELOLAAN LAHAN */}
          {activeTab === 'ikp-3' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Persentase Keberhasilan Pengawasan dan Pengendalian Lahan (Hal. 11)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-mono">
                    117,3% Kepatuhan Tinggi
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-3-pengawasan-pengendalian')}
                    className="text-[11px] font-medium text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 transition-colors cursor-pointer"
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
                  <span className="text-base font-bold text-slate-900">93,80%</span>
                  <span className="text-[9.5px] text-emerald-700 block mt-0.5">117,3% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-base font-bold text-slate-700">80,00%</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">+13,80% Melampaui Target</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unit Pengampu</span>
                  <span className="text-base font-bold text-slate-900">Dit. Pengendalian Lahan</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">422/450 Objek Terawasi</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Side-by-Side Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">
                <div className="xl:col-span-7 bg-white rounded-xl border border-emerald-200 p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1.5">
                      <span>Tabel Komponen Pengawasan &amp; Penertiban:</span>
                      <span className="text-[9.5px] font-normal text-slate-400">4 Sub-Sektor</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                            <th className="py-1 px-1.5">KOMPONEN PENGAWASAN</th>
                            <th className="py-1 px-1.5 text-center">BOBOT</th>
                            <th className="py-1 px-1.5 text-center">OBJEK (REALISASI/TARGET)</th>
                            <th className="py-1 px-1.5 text-right">POIN CAPAIAN</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr>
                            <td className="py-1 px-1.5 font-medium">Pengawasan Kesesuaian Pemanfaatan Lahan (5 SWP)</td>
                            <td className="py-1 px-1.5 text-center font-mono">35%</td>
                            <td className="py-1 px-1.5 text-center font-mono text-slate-600">174 / 180</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">33.83</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">Penertiban Lahan Mangkrak (SP-1 s.d SP-3 &amp; Rekuperasi)</td>
                            <td className="py-1 px-1.5 text-center font-mono">25%</td>
                            <td className="py-1 px-1.5 text-center font-mono text-slate-600">86 / 90</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">23.89</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">Pengawasan Sempadan Pesisir &amp; Reklamasi Non-Izin</td>
                            <td className="py-1 px-1.5 text-center font-mono">20%</td>
                            <td className="py-1 px-1.5 text-center font-mono text-slate-600">75 / 80</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">18.75</td>
                          </tr>
                          <tr>
                            <td className="py-1 px-1.5 font-medium">Rekomendasi Teknis Pembaruan &amp; Tindak Lanjut BAPL</td>
                            <td className="py-1 px-1.5 text-center font-mono">20%</td>
                            <td className="py-1 px-1.5 text-center font-mono text-slate-600">87 / 100</td>
                            <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">17.40</td>
                          </tr>
                          <tr className="bg-emerald-50/60 font-bold border-t border-emerald-200">
                            <td className="py-1 px-1.5 text-emerald-950">Total Realisasi Pengawasan</td>
                            <td className="py-1 px-1.5 text-center font-mono">100%</td>
                            <td className="py-1 px-1.5 text-center font-mono text-emerald-800">422 / 450</td>
                            <td className="py-1 px-1.5 text-right font-mono text-emerald-800">93.80% (Tgt 80%)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* KOLOM B: GRAFIK TREN MULTI-TAHUN */}
                <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xs font-bold text-slate-800">
                        Tren Keberhasilan Pengawasan (2022 - 2026)
                      </h5>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        Persentase (%)
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">
                      Persentase kepatuhan pemanfaatan lahan dan ruang laut
                    </p>

                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={PENGAWASAN_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                          <YAxis domain={[65, 100]} tick={{ fontSize: 9.5, fill: '#64748B' }} />
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
                            name="Realisasi Pengawasan"
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
                      <span className="text-[9px] text-slate-500 block">Objek Terawasi</span>
                      <span className="text-xs font-black text-emerald-700">422 dari 450 Lokasi</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                      <span className="text-[9px] text-slate-500 block">Lahan Diselamatkan</span>
                      <span className="text-xs font-black text-blue-700">94,6 Ha (SP1-Cabut)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KONSOLIDASI • MATRIKS SINERGI ANGGARAN, PNBP & CAPAIAN 3 SATKER */}
          {activeTab === 'matriks' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
              {/* KOLOM A: TABEL MATRIKS SINERGI PERSIS GAMBAR USER */}
              <div className="xl:col-span-7 bg-white rounded-xl border border-indigo-200 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-indigo-700" />
                      KONSOLIDASI &bull; 3 UNIT PILAR PERKIN A3
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      116.68% Rata-Rata Capaian
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Matriks Sinergi Anggaran, PNBP &amp; Capaian 3 Satker
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Integrasi Portofolio: Lahan (15 DS), Pesisir (4 DS), Pengendalian (4 DS)
                  </p>

                  {/* Metric Value & Target */}
                  <div className="flex items-baseline justify-between mt-2 mb-2 pb-2 border-b border-indigo-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black font-mono text-indigo-700">800.70</span>
                      <span className="text-xs font-bold text-slate-600">Miliar PNBP</span>
                    </div>
                    <span className="text-[10.5px] text-slate-500">
                      Total Pagu DIPA: <strong className="text-slate-800">Rp 92,50 M</strong> <span className="text-blue-700 font-bold">(Serapan 39,8%)</span>
                    </span>
                  </div>

                  {/* Table Header */}
                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-700 mb-1">
                    <span>Kontribusi 3 Unit Pelaksana Bidang Deputi A3:</span>
                    <span className="text-[9.5px] font-normal text-slate-400">Konsolidasi Terpadu</span>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                          <th className="py-1 px-1.5">SATKER PELAKSANA</th>
                          <th className="py-1 px-1.5 text-right">PAGU</th>
                          <th className="py-1 px-1.5 text-right">SERAPAN</th>
                          <th className="py-1 px-1.5 text-right">PNBP</th>
                          <th className="py-1 px-1.5 text-right">OUTPUT KUNCI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-1 px-1.5 font-semibold text-slate-900">
                            <div>DPL</div>
                            <div className="text-[9px] text-slate-400 font-normal">Direktorat Pengelolaan Lahan</div>
                          </td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 48,20 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 19,85 M (41,2%)</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">Rp 714,0 Miliar</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-blue-700">248,5 Ha Teralokasi (124,25%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-semibold text-slate-900">
                            <div>DPKPR</div>
                            <div className="text-[9px] text-slate-400 font-normal">Dit. Pengelolaan Kawasan Pesisir &amp; Reklamasi</div>
                          </td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 21,50 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 8,12 M (37,8%)</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">Rp 68,5 Miliar</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-cyan-700">162,8 Ha Izin Terbit (108,53%)</td>
                        </tr>
                        <tr>
                          <td className="py-1 px-1.5 font-semibold text-slate-900">
                            <div>DP2LPR</div>
                            <div className="text-[9px] text-slate-400 font-normal">Dit. Pengendalian Pengelolaan Lahan, Pesisir</div>
                          </td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 22,80 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-slate-600">Rp 8,88 M (38,9%)</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">Rp 18,2 Miliar</td>
                          <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">422 Objek Terawasi (93,8% Realisasi)</td>
                        </tr>
                        <tr className="bg-indigo-50/60 font-bold border-t border-indigo-200">
                          <td className="py-1 px-1.5 text-indigo-950">Total Konsolidasi DEP-A3:</td>
                          <td className="py-1 px-1.5 text-right font-mono text-indigo-900">Rp 92,50 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-indigo-900">Rp 36,85 M (39,8%)</td>
                          <td className="py-1 px-1.5 text-right font-mono text-emerald-800">Rp 800,7 M</td>
                          <td className="py-1 px-1.5 text-right font-mono text-indigo-800">3 IKP Melampaui</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="pt-2 border-t border-slate-100 mt-2 text-[10px] text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Sinergi UWT Lahan Rp 714M + Jasa Pesisir Rp 68,5M + Pengawasan 422 Objek Wilayah KPBPB</span>
                </div>
              </div>

              {/* KOLOM B: GRAFIK TREN KONSOLIDASI */}
              <div className="xl:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-slate-800">
                      Tren Sinergi PNBP &amp; Pagu (2022 - 2026)
                    </h5>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      Rp Miliar
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Pertumbuhan kontribusi PNBP sektor pertanahan dan kawasan
                  </p>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={KONSOLIDASI_TREND_ANNUAL} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} />
                        <Tooltip
                          formatter={(val: any, name: any) => [`Rp ${val} Miliar`, name]}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line
                          type="monotone"
                          dataKey="pnbpM"
                          name="Realisasi PNBP (Rp M)"
                          stroke="#4F46E5"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: '#4F46E5' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="paguM"
                          name="Pagu DIPA (Rp M)"
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
                    <span className="text-[9px] text-slate-500 block">Rasio Fiskal</span>
                    <span className="text-xs font-black text-emerald-700">8,6x Lipat Pagu</span>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-slate-200 text-center">
                    <span className="text-[9px] text-slate-500 block">Status Perkin A3</span>
                    <span className="text-xs font-black text-indigo-700">100% On Track</span>
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
