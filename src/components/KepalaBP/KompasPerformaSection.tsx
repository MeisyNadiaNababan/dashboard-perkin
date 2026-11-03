import React, { useState } from 'react';
import {
  Compass,
  ChevronRight,
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  PieChart as PieIcon,
  BarChart2,
  SlidersHorizontal,
  BarChart3,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

// Radar dataset - normalized to 100%
const RADAR_4_IKS_DATA = [
  {
    subject: '1. Investasi (Rp 70 T)',
    target: 100,
    realisasi: 78.1,
    skorAsli: 'Rp 54,68 T / Rp 70,0 T',
  },
  {
    subject: '2. Kepuasan IKM (88)',
    target: 100,
    realisasi: 100.5,
    skorAsli: '88,42 / 88,00 Poin',
  },
  {
    subject: '3. PNBP (Rp 2,45 T)',
    target: 100,
    realisasi: 77.3,
    skorAsli: 'Rp 1.892,4 M / Rp 2.447,8 M',
  },
  {
    subject: '4. Reformasi Birokrasi',
    target: 100,
    realisasi: 101.7,
    skorAsli: '81,35 (A) / 80,00 (BB)',
  },
];

// Data Tab 1: Investasi
const INVESTASI_KOMPONEN_TABLE = [
  { komponen: 'Modal Tetap (KPU Bea Cukai)', target: 'Rp 48,00 T', realisasi: 'Rp 38,20 T', persen: 79.58, status: 'On Track' },
  { komponen: 'Modal Lancar (KPU BC & BPS)', target: 'Rp 22,00 T', realisasi: 'Rp 16,48 T', persen: 74.91, status: 'On Track' },
  { komponen: 'PMA (Penanaman Modal Asing)', target: 'Rp 52,00 T', realisasi: 'Rp 42,10 T', persen: 80.96, status: 'On Track' },
  { komponen: 'PMDN (Modal Dalam Negeri)', target: 'Rp 18,00 T', realisasi: 'Rp 12,58 T', persen: 69.89, status: 'Waspada' },
  { komponen: 'KEK Batam Aero Technic (BAT)', target: 'Rp 5,50 T', realisasi: 'Rp 4,82 T', persen: 87.64, status: 'Tercapai' },
  { komponen: 'KEK Nongsa Digital Park (NDP)', target: 'Rp 4,20 T', realisasi: 'Rp 4,10 T', persen: 97.62, status: 'Tercapai' },
];

const INVESTASI_DONUT_PMA_PMDN = [
  { name: 'PMA (Modal Asing)', value: 42.10, percent: '77,0%', color: '#2563EB' },
  { name: 'PMDN (Domestik)', value: 12.58, percent: '23,0%', color: '#0284C7' },
];

const INVESTASI_TREND_BULANAN = [
  { bln: 'Jan', total: 3.8, pma: 2.9, pmdn: 0.9 },
  { bln: 'Feb', total: 8.4, pma: 6.5, pmdn: 1.9 },
  { bln: 'Mar', total: 14.2, pma: 11.0, pmdn: 3.2 },
  { bln: 'Apr', total: 20.8, pma: 16.1, pmdn: 4.7 },
  { bln: 'Mei', total: 27.5, pma: 21.2, pmdn: 6.3 },
  { bln: 'Jun', total: 34.6, pma: 26.8, pmdn: 7.8 },
  { bln: 'Jul', total: 41.2, pma: 31.9, pmdn: 9.3 },
  { bln: 'Ags', total: 48.0, pma: 37.1, pmdn: 10.9 },
  { bln: 'Sep', total: 54.68, pma: 42.1, pmdn: 12.58 },
];

// Data Tab 2: IKM
const IKM_LOKUS_TABLE = [
  { lokus: 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)', target: 88.0, skor: 89.42, mutu: 'A', predikat: 'Sangat Baik', capaian: 101.61 },
  { lokus: 'Dit. Pengelolaan Kepelabuhanan (BUP)', target: 88.0, skor: 88.65, mutu: 'A', predikat: 'Sangat Baik', capaian: 100.74 },
  { lokus: 'Dit. Pengelolaan Pertanahan (Lahan)', target: 88.0, skor: 87.24, mutu: 'B', predikat: 'Baik', capaian: 99.14 },
  { lokus: 'BU Rumah Sakit BP Batam (RSBP)', target: 88.0, skor: 88.92, mutu: 'A', predikat: 'Sangat Baik', capaian: 101.05 },
  { lokus: 'BU SPAM, Fasilitas & Lingkungan (Rusun)', target: 88.0, skor: 87.88, mutu: 'B', predikat: 'Baik', capaian: 99.86 },
];

const IKM_BAR_COMPARISON = [
  { name: 'PTSP', skor: 89.42, target: 88.0 },
  { name: 'RSBP', skor: 88.92, target: 88.0 },
  { name: 'Pelabuhan', skor: 88.65, target: 88.0 },
  { name: 'SPAM/Rusun', skor: 87.88, target: 88.0 },
  { name: 'Pertanahan', skor: 87.24, target: 88.0 },
];

// Data Tab 3: PNBP (10 Unit Penghasil Sesuai Manual IKS Perkin Halaman 5)
const PNBP_10_UNIT_TABLE = [
  { no: 1, unit: 'Biro Keuangan', targetJuta: 46720.87, realisasiJuta: 38450.20, capaian: 82.30, status: 'On Track' },
  { no: 2, unit: 'Dit. Pengelolaan Pertanahan', targetJuta: 964304.32, realisasiJuta: 748210.40, capaian: 77.59, status: 'On Track' },
  { no: 3, unit: 'Dit. Pembangunan Infrastruktur', targetJuta: 8854.66, realisasiJuta: 7120.15, capaian: 80.41, status: 'On Track' },
  { no: 4, unit: 'Dit. Lalu Lintas Barang', targetJuta: 2371.25, realisasiJuta: 1940.80, capaian: 81.85, status: 'On Track' },
  { no: 5, unit: 'Pusat Data dan Sistem Informasi (PDSI)', targetJuta: 13494.63, realisasiJuta: 10850.50, capaian: 80.41, status: 'On Track' },
  { no: 6, unit: 'Kantor Penghubung Jakarta', targetJuta: 925.97, realisasiJuta: 745.20, capaian: 80.48, status: 'On Track' },
  { no: 7, unit: 'Dit. Pengelolaan Kepelabuhanan', targetJuta: 490154.13, realisasiJuta: 382400.10, capaian: 78.02, status: 'On Track' },
  { no: 8, unit: 'Dit. Kawasan Bandara Hang Nadim', targetJuta: 130482.43, realisasiJuta: 106820.70, capaian: 81.87, status: 'On Track' },
  { no: 9, unit: 'BU Rumah Sakit (RSBP)', targetJuta: 4098.98, realisasiJuta: 3290.45, capaian: 80.27, status: 'On Track' },
  { no: 10, unit: 'BU SPAM, Fasilitas dan Lingkungan', targetJuta: 786541.31, realisasiJuta: 592616.50, capaian: 75.34, status: 'Waspada' },
];

const PNBP_RANKING_BARS = [
  { name: 'Biro Keuangan', capaian: 82.30 },
  { name: 'Bandara', capaian: 81.87 },
  { name: 'Lalu Lintas Brg', capaian: 81.85 },
  { name: 'Kantor Jakarta', capaian: 80.48 },
  { name: 'Infrastruktur', capaian: 80.41 },
  { name: 'Pusat Data (PDSI)', capaian: 80.41 },
  { name: 'Rumah Sakit', capaian: 80.27 },
  { name: 'Pelabuhan', capaian: 78.02 },
  { name: 'Pertanahan (UWT)', capaian: 77.59 },
  { name: 'BU SPAM', capaian: 75.34 },
];

// Data Tab 4: Reformasi Birokrasi
const RB_8_AREA_TABLE = [
  { area: '1. Manajemen Perubahan & Budaya ASN', bobot: '10%', target: 8.00, skor: 8.40, capaian: '105.0%', predikat: 'A' },
  { area: '2. Deregulasi & Harmonisasi Regulasi', bobot: '10%', target: 8.00, skor: 8.20, capaian: '102.5%', predikat: 'A' },
  { area: '3. Penataan Struktur Organisasi Agile', bobot: '10%', target: 8.00, skor: 8.10, capaian: '101.3%', predikat: 'A' },
  { area: '4. Penataan Tata Laksana SPBE', bobot: '15%', target: 12.00, skor: 12.60, capaian: '105.0%', predikat: 'A' },
  { area: '5. Manajemen SDM & Sistem Merit', bobot: '15%', target: 12.00, skor: 12.80, capaian: '106.7%', predikat: 'A' },
  { area: '6. Penguatan Akuntabilitas (SAKIP)', bobot: '15%', target: 12.00, skor: 12.40, capaian: '103.3%', predikat: 'A' },
  { area: '7. Penguatan Pengawasan (SPIP)', bobot: '15%', target: 12.00, skor: 12.30, capaian: '102.5%', predikat: 'A' },
  { area: '8. Peningkatan Kualitas Pelayanan (PEKPPP)', bobot: '10%', target: 8.00, skor: 8.70, capaian: '108.8%', predikat: 'A' },
];

const RB_TREND_TAHUNAN = [
  { tahun: '2021', skor: 74.20, target: 70.0 },
  { tahun: '2022', skor: 76.80, target: 72.0 },
  { tahun: '2023', skor: 78.50, target: 75.0 },
  { tahun: '2024', skor: 79.80, target: 78.0 },
  { tahun: '2025', skor: 80.60, target: 80.0 },
  { tahun: '2026', skor: 81.35, target: 80.0 },
];

interface KompasPerformaSectionProps {
  onSelectIksDetail: (iksId: string) => void;
  onOpenManualModal?: (iksId: string) => void;
}

export const KompasPerformaSection: React.FC<KompasPerformaSectionProps> = ({
  onSelectIksDetail,
  onOpenManualModal,
}) => {
  const [activeTab, setActiveTab] = useState<'investasi' | 'ikm' | 'pnbp' | 'rb'>('investasi');
  const [radarViewMode, setRadarViewMode] = useState<'grafik' | 'tabel'>('grafik');
  const [investasiChartMode, setInvestasiChartMode] = useState<'grafik' | 'tabel'>('grafik');
  const [ikmChartMode, setIkmChartMode] = useState<'grafik' | 'tabel'>('grafik');
  const [pnbpChartMode, setPnbpChartMode] = useState<'grafik' | 'tabel'>('grafik');
  const [rbChartMode, setRbChartMode] = useState<'grafik' | 'tabel'>('grafik');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs space-y-3">

      {/* Two Column Grid: Radar Lebih Kecil (col-span-3) & Tabel Luas (col-span-9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        {/* Kolom Kiri: Radar Chart Capaian 4 IKS (WITH SHEET SWAP TOGGLE) */}
        <div className="lg:col-span-3 bg-slate-50/60 rounded-xl border border-slate-100 p-2.5 sm:p-3 space-y-2">
          <div className="flex items-center justify-between gap-1">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Radar Kinerja 4 IKS</h3>
              <p className="text-[10px] text-slate-500">Realisasi vs Target</p>
            </div>

            {/* Sheet Swap Toggle */}
            <div className="inline-flex items-center p-0.5 bg-white border border-slate-200 rounded-md shrink-0">
              <button
                type="button"
                onClick={() => setRadarViewMode('grafik')}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  radarViewMode === 'grafik'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilkan grafik radar"
              >
                <BarChart3 className="w-3 h-3" />
                <span>Grafik</span>
              </button>
              <button
                type="button"
                onClick={() => setRadarViewMode('tabel')}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  radarViewMode === 'tabel'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tampilkan tabel rincian 4 IKS"
              >
                <FileText className="w-3 h-3" />
                <span>Tabel</span>
              </button>
            </div>
          </div>

          {/* Konten Sheet Swap: Radar Chart vs Tabel Detail */}
          {radarViewMode === 'grafik' ? (
            <>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={RADAR_4_IKS_DATA} margin={{ top: 2, right: 10, bottom: 2, left: 10 }}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#334155', fontSize: 8.5, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={8} />
                    <Radar
                      name="Target Perkin"
                      dataKey="target"
                      stroke="#94A3B8"
                      fill="#94A3B8"
                      fillOpacity={0.12}
                      strokeDasharray="3 3"
                    />
                    <Radar
                      name="Realisasi YTD"
                      dataKey="realisasi"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.35}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '9.5px', paddingTop: '4px' }}
                    />
                    <Tooltip
                      formatter={(val: any, name: any, item: any) => [
                        `${Number(val).toFixed(1)}% (${item.payload.skorAsli})`,
                        name,
                      ]}
                      contentStyle={{
                        fontSize: '11px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-xs pt-1.5 border-t border-slate-200/60">
                <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Di Atas Target</span>
                  <span className="text-[10.5px] font-bold text-emerald-700 font-mono">IKM 100,5% &bull; RB 101,7%</span>
                </div>
                <div className="bg-white px-2 py-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">On Track</span>
                  <span className="text-[10.5px] font-bold text-blue-700 font-mono">Inv 78,1% &bull; PNBP 77,3%</span>
                </div>
              </div>
            </>
          ) : (
            /* TABEL DETAIL 4 IKS */
            <div className="h-52 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                  <tr>
                    <th className="py-1 px-1.5 whitespace-nowrap">Indikator IKS</th>
                    <th className="py-1 px-1 text-right whitespace-nowrap">Target</th>
                    <th className="py-1 px-1 text-right whitespace-nowrap font-black">Realisasi</th>
                    <th className="py-1 px-1 text-center whitespace-nowrap">Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[10px]">
                  {RADAR_4_IKS_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-1.5 px-1.5 font-bold text-slate-800 leading-tight">
                        {row.subject}
                      </td>
                      <td className="py-1.5 px-1 text-right font-mono text-slate-500 whitespace-nowrap">
                        100%
                      </td>
                      <td className="py-1.5 px-1 text-right font-mono font-bold text-blue-700 whitespace-nowrap">
                        {row.skorAsli.split('/')[0].trim()}
                      </td>
                      <td className="py-1.5 px-1 text-center whitespace-nowrap">
                        <span
                          className={`font-mono font-bold px-1 py-0.2 rounded text-[9.5px] ${
                            row.realisasi >= 100
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}
                        >
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

        {/* Kolom Kanan: Tab Interaktif Detail 4 IKS (LUAS UNTUK TABEL) */}
        <div className="lg:col-span-9 space-y-3">
          {/* Tab Selector Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/80 rounded-lg">
            <button
              onClick={() => setActiveTab('investasi')}
              className={`flex-1 min-w-[100px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'investasi'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>1. Investasi</span>
            </button>
            <button
              onClick={() => setActiveTab('ikm')}
              className={`flex-1 min-w-[100px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikm'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Smile className="w-3 h-3" />
              <span>2. IKM</span>
            </button>
            <button
              onClick={() => setActiveTab('pnbp')}
              className={`flex-1 min-w-[100px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'pnbp'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <DollarSign className="w-3 h-3" />
              <span>3. PNBP</span>
            </button>
            <button
              onClick={() => setActiveTab('rb')}
              className={`flex-1 min-w-[100px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'rb'
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>4. Reformasi RB</span>
            </button>
          </div>

          {/* ================================================================ */}
          {/* TAB 1: INVESTASI                                                 */}
          {/* ================================================================ */}
          {activeTab === 'investasi' && (
            <div className="space-y-4">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Nilai Realisasi Investasi di KPBPB Batam
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      78,1%
                    </span>
                    <span className="text-xs text-blue-600 font-bold ml-1.5">
                      On Track
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectIksDetail('iks-1')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Detail IKS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Realisasi YTD</span>
                  <span className="text-lg font-bold text-slate-900">Rp 54,68 Triliun</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">78,11% dari target</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Target Tahunan</span>
                  <span className="text-lg font-bold text-slate-900">Rp 70,00 Triliun</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Renstra &amp; Perkin 2026</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Kontributor Terbesar</span>
                  <span className="text-lg font-bold text-slate-900">PMA (Rp 42,10 T)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Porsi 77,0% portofolio</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Tabel Luas 8 Kolom) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200/70 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                      <tr>
                        <th className="py-2 px-3">Komponen Investasi</th>
                        <th className="py-2 px-2 text-right">Target</th>
                        <th className="py-2 px-2 text-right">Realisasi</th>
                        <th className="py-2 px-2 text-right">Capaian</th>
                        <th className="py-2 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {INVESTASI_KOMPONEN_TABLE.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-medium text-slate-800">{row.komponen}</td>
                          <td className="py-2 px-2 text-right text-slate-500">{row.target}</td>
                          <td className="py-2 px-2 text-right font-semibold text-slate-900">{row.realisasi}</td>
                          <td className="py-2 px-2 text-right font-bold text-slate-900">{row.persen.toFixed(1)}%</td>
                          <td className="py-2 px-3 text-center">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                row.status === 'Tercapai'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : row.status === 'On Track'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Charts: Donut PMA vs PMDN & Area Trend Bulanan (WITH SHEET SWAP) */}
                <div className="lg:col-span-4 space-y-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Analisis Komposisi &amp; Tren</span>
                    {/* Sheet Swap Toggle */}
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
                        title="Tampilkan tabel rincian"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Tabel</span>
                      </button>
                    </div>
                  </div>

                  {investasiChartMode === 'grafik' ? (
                    <>
                      <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>Komposisi PMA vs PMDN</span>
                          <span className="text-[10px] text-slate-500">Nilai (Rp T)</span>
                        </div>
                        <div className="h-24 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={INVESTASI_DONUT_PMA_PMDN}
                                innerRadius={24}
                                outerRadius={40}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {INVESTASI_DONUT_PMA_PMDN.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(val: any) => [`Rp ${val} Triliun`, 'Realisasi']}
                                contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-0.5 text-[10.5px] text-slate-600 pt-1 border-t border-slate-200/50">
                          <div className="flex justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-blue-600" /> PMA (Asing)
                            </span>
                            <span className="font-semibold text-slate-900">Rp 42,10 T (77,0%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-sky-600" /> PMDN (Domestik)
                            </span>
                            <span className="font-semibold text-slate-900">Rp 12,58 T (23,0%)</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>Tren Realisasi Kumulatif Bulanan</span>
                          <span className="text-[10px] font-semibold text-blue-600">+14,2% YoY</span>
                        </div>
                        <div className="h-24 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={INVESTASI_TREND_BULANAN} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                              <defs>
                                <linearGradient id="invGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35}/>
                                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="bln" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 60]} />
                              <Tooltip
                                formatter={(val: any) => [`Rp ${val} Triliun`, 'Realisasi Kumulatif']}
                                contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                              />
                              <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} fill="url(#invGradient)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* TABEL DETAIL TREN INVESTASI BULANAN */
                    <div className="h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                          <tr>
                            <th className="py-1 px-1.5 whitespace-nowrap">Bulan</th>
                            <th className="py-1 px-1 text-right whitespace-nowrap">PMA (T)</th>
                            <th className="py-1 px-1 text-right whitespace-nowrap">PMDN (T)</th>
                            <th className="py-1 px-1 text-right whitespace-nowrap font-black">Total (T)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[10.5px]">
                          {INVESTASI_TREND_BULANAN.map((row) => (
                            <tr key={row.bln} className="hover:bg-slate-50 transition-colors">
                              <td className="py-1 px-1.5 font-bold text-slate-800">{row.bln} 2026</td>
                              <td className="py-1 px-1 text-right font-mono text-blue-700 font-semibold">{row.pma.toFixed(2)}</td>
                              <td className="py-1 px-1 text-right font-mono text-sky-700 font-semibold">{row.pmdn.toFixed(2)}</td>
                              <td className="py-1 px-1 text-right font-mono font-bold text-slate-900 bg-slate-50/50">{row.total.toFixed(2)}</td>
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
          {/* TAB 2: KEPUASAN IKM                                              */}
          {/* ================================================================ */}
          {activeTab === 'ikm' && (
            <div className="space-y-4">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Indeks Kepuasan Masyarakat (IKM) 5 Lokus Pelayanan Utama
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      100,5%
                    </span>
                    <span className="text-xs text-emerald-600 font-bold ml-1.5">
                      Tercapai (Mutu A)
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectIksDetail('iks-2')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Detail IKS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Skor Tertimbang YTD</span>
                  <span className="text-lg font-bold text-slate-900">88,42 Poin</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Mutu Pelayanan A (Sangat Baik)</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-lg font-bold text-slate-900">88,00 Poin</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">PermenPAN-RB No. 14/2017</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Lokus Skor Tertinggi</span>
                  <span className="text-lg font-bold text-slate-900">PTSP (89,42)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Mutu A &bull; 1.420 responden</span>
                </div>
              </div>

              {/* Tabel Rincian & Chart dalam 1 Baris (Tabel Luas 8 Kolom) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200/70 bg-white">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
                      <tr>
                        <th className="py-2 px-3">Lokus Survei Layanan</th>
                        <th className="py-2 px-2 text-right">Target</th>
                        <th className="py-2 px-2 text-right">Skor IKM</th>
                        <th className="py-2 px-2 text-center">Mutu</th>
                        <th className="py-2 px-2 text-right">Capaian</th>
                        <th className="py-2 px-3 text-center">Predikat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {IKM_LOKUS_TABLE.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-medium text-slate-800">{row.lokus}</td>
                          <td className="py-2 px-2 text-right text-slate-500">{row.target.toFixed(1)}</td>
                          <td className="py-2 px-2 text-right font-bold text-slate-900">{row.skor.toFixed(2)}</td>
                          <td className="py-2 px-2 text-center">
                            <span
                              className={`inline-block font-bold px-2 py-0.5 rounded text-[10px] ${
                                row.mutu === 'A' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              {row.mutu}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right font-semibold text-slate-900">{row.capaian.toFixed(1)}%</td>
                          <td className="py-2 px-3 text-center text-slate-600 text-[11px]">{row.predikat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Chart: Bar Chart Perbandingan Antar Lokus (WITH SHEET SWAP) */}
                <div className="lg:col-span-4 bg-slate-50/60 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2 pb-1 border-b border-slate-200/50">
                    <span className="truncate pr-1">Skor Kepuasan Antar Lokus</span>
                    {/* Sheet Swap Toggle */}
                    <div className="inline-flex items-center p-0.5 bg-white border border-slate-200 rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => setIkmChartMode('grafik')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          ikmChartMode === 'grafik'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan grafik batang"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>Grafik</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIkmChartMode('tabel')}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          ikmChartMode === 'tabel'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="Tampilkan tabel rincian"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Tabel</span>
                      </button>
                    </div>
                  </div>

                  {ikmChartMode === 'grafik' ? (
                    <>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={IKM_BAR_COMPARISON} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis domain={[84, 92]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(val: any) => [`${val} Poin`, 'Skor IKM']}
                              contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                            />
                            <Bar dataKey="skor" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={22} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="text-[9.5px] text-slate-500 text-center block mt-1">
                        Target 88,00 &bull; Seluruh lokus mencapai predikat Baik hingga Sangat Baik
                      </span>
                    </>
                  ) : (
                    /* TABEL DETAIL IKM LOKUS */
                    <div className="h-48 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                          <tr>
                            <th className="py-1 px-1.5 whitespace-nowrap">Lokus Layanan</th>
                            <th className="py-1 px-1 text-right whitespace-nowrap">Target</th>
                            <th className="py-1 px-1 text-right whitespace-nowrap font-black">Skor IKM</th>
                            <th className="py-1 px-1 text-center whitespace-nowrap">Mutu</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[10.5px]">
                          {IKM_BAR_COMPARISON.map((row) => (
                            <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                              <td className="py-1.5 px-1.5 font-bold text-slate-800">{row.name}</td>
                              <td className="py-1.5 px-1 text-right font-mono text-slate-500">{row.target.toFixed(1)}</td>
                              <td className="py-1.5 px-1 text-right font-mono font-bold text-blue-700">{row.skor.toFixed(2)}</td>
                              <td className="py-1.5 px-1 text-center">
                                <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[9.5px] ${
                                  row.skor >= row.target
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-blue-50 text-blue-700 border border-blue-100'
                                }`}>
                                  {row.skor >= row.target ? 'A (Sangat Baik)' : 'B (Baik)'}
                                </span>
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
          {/* TAB 3: PNBP (10 UNIT PENGHASIL)                                  */}
          {/* ================================================================ */}
          {activeTab === 'pnbp' && (
            <div className="space-y-4">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Nilai Realisasi PNBP BP Batam (Target Rp 2,447 Triliun)
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      77,3%
                    </span>
                    <span className="text-xs text-blue-600 font-bold ml-1.5">
                      On Track
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectIksDetail('iks-3')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Detail IKS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Realisasi PNBP YTD</span>
                  <span className="text-lg font-bold text-slate-900">Rp 1.892,4 Miliar</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">77,31% dari total pagu</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Target Pagu PNBP</span>
                  <span className="text-lg font-bold text-slate-900">Rp 2.447,8 Miliar</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Tabel Manual IKS Hal. 5</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Penghasil Terbesar</span>
                  <span className="text-lg font-bold text-slate-900">Dit. Lahan (Rp 748,2 M)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">UWT Baru &amp; Perpanjangan</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200/70 bg-white max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px] z-10">
                      <tr>
                        <th className="py-2 px-2.5 text-center">No</th>
                        <th className="py-2 px-3">Unit Kerja / Badan Usaha</th>
                        <th className="py-2 px-2 text-right">Target (Juta Rp)</th>
                        <th className="py-2 px-2 text-right">Realisasi (Juta Rp)</th>
                        <th className="py-2 px-2 text-right">Capaian</th>
                        <th className="py-2 px-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {PNBP_10_UNIT_TABLE.map((row) => (
                        <tr key={row.no} className="hover:bg-slate-50/50">
                          <td className="py-1.5 px-2.5 text-center text-slate-400 font-mono text-[11px]">{row.no}</td>
                          <td className="py-1.5 px-3 font-medium text-slate-800">{row.unit}</td>
                          <td className="py-1.5 px-2 text-right text-slate-500">
                            {row.targetJuta.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                          </td>
                          <td className="py-1.5 px-2 text-right font-semibold text-slate-900">
                            {row.realisasiJuta.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                          </td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900">{row.capaian.toFixed(1)}%</td>
                          <td className="py-1.5 px-2.5 text-center">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                row.status === 'On Track' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Chart: Horizontal Bar Peringkat Capaian PNBP 10 Unit (WITH SHEET SWAP) */}
                <div className="lg:col-span-4">
                  <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2 pb-1 border-b border-slate-200/50">
                      <span className="truncate pr-1">Peringkat Capaian PNBP</span>
                      {/* Sheet Swap Toggle */}
                      <div className="inline-flex items-center p-0.5 bg-white border border-slate-200 rounded-md shrink-0">
                        <button
                          type="button"
                          onClick={() => setPnbpChartMode('grafik')}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            pnbpChartMode === 'grafik'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                          title="Tampilkan grafik batang"
                        >
                          <BarChart3 className="w-3 h-3" />
                          <span>Grafik</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPnbpChartMode('tabel')}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            pnbpChartMode === 'tabel'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                          title="Tampilkan tabel rincian"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Tabel</span>
                        </button>
                      </div>
                    </div>

                    {pnbpChartMode === 'grafik' ? (
                      <>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={PNBP_RANKING_BARS} layout="vertical" margin={{ top: 4, right: 15, left: 35, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                              <XAxis type="number" domain={[70, 85]} tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                              <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} />
                              <Tooltip
                                formatter={(val: any) => [`${val}%`, 'Capaian']}
                                contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                              />
                              <Bar dataKey="capaian" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={10} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <span className="text-[9.5px] text-slate-500 text-center block mt-1.5">
                          Seluruh 10 satker penghasil mencapai rata-rata serapan &gt;75% (On Track)
                        </span>
                      </>
                    ) : (
                      /* TABEL DETAIL PERINGKAT CAPAIAN PNBP */
                      <div className="h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                            <tr>
                              <th className="py-1 px-1.5 text-center">Rank</th>
                              <th className="py-1 px-1.5 whitespace-nowrap">Satker Penghasil</th>
                              <th className="py-1 px-1.5 text-right whitespace-nowrap font-black">Capaian</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-[10.5px]">
                            {PNBP_RANKING_BARS.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="py-1.5 px-1.5 text-center font-mono text-slate-500">{idx + 1}</td>
                                <td className="py-1.5 px-1.5 font-semibold text-slate-800">{row.name}</td>
                                <td className="py-1.5 px-1.5 text-right font-mono font-bold text-blue-700">
                                  {row.capaian.toFixed(2)}%
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
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: REFORMASI BIROKRASI                                       */}
          {/* ================================================================ */}
          {activeTab === 'rb' && (
            <div className="space-y-4">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Indeks Reformasi Birokrasi (8 Area Perubahan)
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      101,7%
                    </span>
                    <span className="text-xs text-emerald-600 font-bold ml-1.5">
                      Tercapai (Predikat A)
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectIksDetail('iks-4')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Detail IKS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Nilai Indeks RB 2026</span>
                  <span className="text-lg font-bold text-slate-900">81,35 (Predikat A)</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">Kategori Memuaskan</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Target Perkin 2026</span>
                  <span className="text-lg font-bold text-slate-900">80,00 (BB)</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Sangat Baik KemenPAN-RB</span>
                </div>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Opini BPK RI</span>
                  <span className="text-lg font-bold text-slate-900">WTP (8x Berturut)</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Laporan Keuangan Sehat</span>
                </div>
              </div>

              {/* Tabel Rincian & Charts dalam 1 Baris (Persis Model Deputi A2) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200/70 bg-white max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px] z-10">
                      <tr>
                        <th className="py-2 px-3">Area Perubahan RB</th>
                        <th className="py-2 px-2 text-center">Bobot</th>
                        <th className="py-2 px-2 text-right">Target</th>
                        <th className="py-2 px-2 text-right">Skor</th>
                        <th className="py-2 px-2 text-right">Capaian</th>
                        <th className="py-2 px-3 text-center">Predikat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {RB_8_AREA_TABLE.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-1.5 px-3 font-medium text-slate-800">{row.area}</td>
                          <td className="py-1.5 px-2 text-center text-slate-500">{row.bobot}</td>
                          <td className="py-1.5 px-2 text-right text-slate-500">{row.target.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-right font-semibold text-slate-900">{row.skor.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900">{row.capaian}</td>
                          <td className="py-1.5 px-3 text-center">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                              {row.predikat}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Charts: Gauge Predikat RB & Line Tren Skor Antar Periode */}
                <div className="lg:col-span-4 space-y-2.5">
                  <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-xs font-bold text-slate-800 block mb-1">Gauge Predikat RB</span>
                    <div className="relative inline-flex flex-col items-center justify-center my-1">
                      <div className="w-20 h-20 rounded-full border-4 border-slate-200 border-t-emerald-500 border-r-emerald-500 border-b-blue-500 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-lg font-extrabold text-slate-900 block leading-none">81,35</span>
                          <span className="text-[9px] font-bold text-emerald-600 block mt-0.5">PREDIKAT A</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500 px-2 pt-0.5 border-t border-slate-200/50">
                      <span>D (&lt;30)</span>
                      <span>BB (70-80)</span>
                      <span className="font-bold text-emerald-600">A (80-90)</span>
                      <span>AA (&gt;90)</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5 pb-1 border-b border-slate-200/50">
                      <div>
                        <span>Tren Perkembangan Skor RB</span>
                        <span className="text-[10px] font-semibold text-emerald-600 ml-2">+9,6% Kenaikan</span>
                      </div>
                      {/* Sheet Swap Toggle */}
                      <div className="inline-flex items-center p-0.5 bg-white border border-slate-200 rounded-md shrink-0">
                        <button
                          type="button"
                          onClick={() => setRbChartMode('grafik')}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            rbChartMode === 'grafik'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                          title="Tampilkan grafik garis"
                        >
                          <BarChart3 className="w-3 h-3" />
                          <span>Grafik</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRbChartMode('tabel')}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            rbChartMode === 'tabel'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                          title="Tampilkan tabel rincian"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Tabel</span>
                        </button>
                      </div>
                    </div>

                    {rbChartMode === 'grafik' ? (
                      <div className="h-28 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={RB_TREND_TAHUNAN} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="tahun" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[70, 85]} tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                            <Tooltip
                              formatter={(val: any) => [`${val} Poin`, 'Skor Indeks RB']}
                              contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                            />
                            <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                            <Line type="monotone" dataKey="skor" stroke="#059669" strokeWidth={2} dot={{ r: 2.5, fill: '#059669' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      /* TABEL DETAIL TREN PERKEMBANGAN SKOR RB */
                      <div className="h-28 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                            <tr>
                              <th className="py-1 px-1.5 text-center">Tahun</th>
                              <th className="py-1 px-1.5 text-right whitespace-nowrap">Target</th>
                              <th className="py-1 px-1.5 text-right whitespace-nowrap font-black">Skor</th>
                              <th className="py-1 px-1.5 text-center whitespace-nowrap">Predikat</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-[10.5px]">
                            {RB_TREND_TAHUNAN.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="py-1 px-1.5 text-center font-mono font-semibold text-slate-700">{row.tahun}</td>
                                <td className="py-1 px-1.5 text-right font-mono text-slate-500">{row.target.toFixed(1)}</td>
                                <td className="py-1 px-1.5 text-right font-mono font-bold text-emerald-700">{row.skor.toFixed(2)}</td>
                                <td className="py-1 px-1.5 text-center font-bold text-blue-700">
                                  {row.skor >= 80 ? 'A' : 'BB'}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
