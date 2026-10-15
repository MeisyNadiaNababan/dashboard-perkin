import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  ShieldAlert,
  Award,
  ChevronRight,
  TrendingUp,
  Scale,
  CheckCircle2,
  FileCode2,
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
  Info,
  Calendar,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

interface AdministrasiKeuanganVisualChartsProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// Data Radar Capaian 4 IKP Perkin A1
const RADAR_4_IKP_DATA = [
  { subject: 'Indeks RB', target: 100, realisasi: 104.6, skorAsli: '78,45 / BB' },
  { subject: 'Sistem Merit', target: 100, realisasi: 122.3, skorAsli: '342,5 / IV' },
  { subject: 'Maturitas SPIP', target: 100, realisasi: 106.9, skorAsli: '3,42 / L3' },
  { subject: 'Opini BPK WTP', target: 100, realisasi: 100.0, skorAsli: 'WTP 8x' },
];

// Tabel Komponen 8 Area Perubahan RB
const RB_8_AREA_TABLE_DATA = [
  { no: 1, komponen: 'Manajemen Perubahan', bobot: 10.0, nilai: 8.40, status: 'Optimal' },
  { no: 2, komponen: 'Deregulasi Kebijakan', bobot: 10.0, nilai: 8.15, status: 'Optimal' },
  { no: 3, komponen: 'Penataan Organisasi', bobot: 10.0, nilai: 7.90, status: 'Baik' },
  { no: 4, komponen: 'Penataan Tata Laksana (SPBE)', bobot: 15.0, nilai: 12.80, status: 'Sangat Baik' },
  { no: 5, komponen: 'Penataan Manajemen SDM', bobot: 15.0, nilai: 12.65, status: 'Sangat Baik' },
  { no: 6, komponen: 'Penguatan Akuntabilitas (SAKIP)', bobot: 15.0, nilai: 12.40, status: 'Sangat Baik' },
  { no: 7, komponen: 'Penguatan Pengawasan Intern', bobot: 10.0, nilai: 8.15, status: 'Optimal' },
  { no: 8, komponen: 'Peningkatan Pelayanan Publik', bobot: 15.0, nilai: 8.00, status: 'Baik' },
];

// Tren Skor RB Tahunan
const RB_TREND_TAHUNAN = [
  { tahun: '2021', skor: 72.4, target: 70.0 },
  { tahun: '2022', skor: 74.8, target: 72.0 },
  { tahun: '2023', skor: 76.5, target: 74.0 },
  { tahun: '2024', skor: 77.2, target: 75.0 },
  { tahun: '2025', skor: 78.45, target: 75.0 },
  { tahun: '2026', skor: 81.35, target: 80.0 },
];

// Tabel Komponen 8 Aspek Sistem Merit
const MERIT_8_ASPEK_TABLE_DATA = [
  { no: 1, aspek: '1. Perencanaan Kebutuhan ASN', bobotMax: 24, skor: 22.0, persen: 91.7, status: 'Sangat Baik' },
  { no: 2, aspek: '2. Pengadaan ASN & Pegawai', bobotMax: 24, skor: 23.0, persen: 95.8, status: 'Sangat Baik' },
  { no: 3, aspek: '3. Pengembangan Karier Pegawai', bobotMax: 80, skor: 71.5, persen: 89.4, status: 'Sangat Baik' },
  { no: 4, aspek: '4. Promosi dan Mutasi Terbuka', bobotMax: 40, skor: 36.0, persen: 90.0, status: 'Sangat Baik' },
  { no: 5, aspek: '5. Manajemen Kinerja ASN', bobotMax: 80, skor: 68.0, persen: 85.0, status: 'Baik' },
  { no: 6, aspek: '6. Penggajian & Disiplin ASN', bobotMax: 60, skor: 52.0, persen: 86.7, status: 'Sangat Baik' },
  { no: 7, aspek: '7. Perlindungan & Layanan ASN', bobotMax: 16, skor: 15.0, persen: 93.8, status: 'Sangat Baik' },
  { no: 8, aspek: '8. Sistem Informasi ASN (SIMPEG)', bobotMax: 76, skor: 55.0, persen: 72.4, status: 'Baik' },
];

// Tren Skor Sistem Merit BP Batam (2022 - 2026)
const MERIT_TREND_ANNUAL_DATA = [
  { tahun: '2022', skor: 268.0, target: 280, kategori: 'Baik (Kategori III)' },
  { tahun: '2023', skor: 295.5, target: 280, kategori: 'Baik (Kategori III)' },
  { tahun: '2024', skor: 318.0, target: 280, kategori: 'Baik (Kategori III)' },
  { tahun: '2025', skor: 334.0, target: 280, kategori: 'Sangat Baik (Kategori IV)' },
  { tahun: '2026', skor: 342.5, target: 280, kategori: 'Sangat Baik (Kategori IV)' },
];

// Tabel Komponen 5 Unsur SPIP
const SPIP_5_UNSUR_TABLE_DATA = [
  { no: 1, unsur: '1. Lingkungan Pengendalian', bobot: '30%', standarL3: 3.00, skor: 3.50, status: 'Level 3 Terdefinisi' },
  { no: 2, unsur: '2. Penilaian Risiko (Risk Assessment)', bobot: '20%', standarL3: 3.00, skor: 3.38, status: 'Level 3 Terdefinisi' },
  { no: 3, unsur: '3. Kegiatan Pengendalian Intern', bobot: '25%', standarL3: 3.00, skor: 3.45, status: 'Level 3 Terdefinisi' },
  { no: 4, unsur: '4. Informasi dan Komunikasi', bobot: '10%', standarL3: 3.00, skor: 3.40, status: 'Level 3 Terdefinisi' },
  { no: 5, unsur: '5. Pemantauan Pengendalian Intern', bobot: '15%', standarL3: 3.00, skor: 3.35, status: 'Level 3 Terdefinisi' },
];

// Tabel Komponen 4 Kriteria Opini BPK
const OPINI_BPK_TABLE_DATA = [
  { no: 1, kriteria: 'Kesesuaian Standar Akuntansi (SAP)', dasar: 'PP No. 71/2010', hasil: 'Sesuai (Akrual Penuh)', status: 'WTP' },
  { no: 2, kriteria: 'Kecukupan Pengungkapan (CaLK)', dasar: 'PSAP 04', hasil: 'Lengkap & Informatif', status: 'WTP' },
  { no: 3, kriteria: 'Kepatuhan Regulasi Keuangan', dasar: 'UU No. 15/2004', hasil: 'Nihil Temuan Material', status: 'WTP' },
  { no: 4, kriteria: 'Efektivitas Pengendalian Intern (SPI)', dasar: 'PP No. 60/2008', hasil: 'SPI Kas & BMN Efektif', status: 'WTP' },
];

// Riwayat 8 Tahun Opini BPK (2018 - 2025)
const OPINI_BPK_HISTORY = [
  { thn: '2018', opini: 'WTP', skorTindakLanjut: 88.5 },
  { thn: '2019', opini: 'WTP', skorTindakLanjut: 89.2 },
  { thn: '2020', opini: 'WTP', skorTindakLanjut: 90.4 },
  { thn: '2021', opini: 'WTP', skorTindakLanjut: 91.1 },
  { thn: '2022', opini: 'WTP', skorTindakLanjut: 92.0 },
  { thn: '2023', opini: 'WTP', skorTindakLanjut: 92.8 },
  { thn: '2024', opini: 'WTP', skorTindakLanjut: 93.4 },
  { thn: '2025', opini: 'WTP', skorTindakLanjut: 93.9 },
];

export const AdministrasiKeuanganVisualCharts: React.FC<
  AdministrasiKeuanganVisualChartsProps
> = ({ onOpenFormulaModal }) => {
  const [activeTab, setActiveTab] = useState<'rb' | 'merit' | 'spip' | 'wtp'>('rb');

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3.5">
      {/* Two Column Grid - Model Terpadu Persis Kompas Performa Dashboard Kepala BP Batam */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 4 IKP + INSIGHT DI RADAR CAPAIAN    */}
        {/* ================================================================== */}
        <div className="lg:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 sm:p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Radar Capaian 4 IKP DEP-A1
              </h3>
              <p className="text-[10px] text-slate-500">
                Realisasi Aktual vs Target Perkin A1 2026
              </p>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
              0 - 130%
            </span>
          </div>

          {/* Radar Visual */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_4_IKP_DATA} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
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
                  stroke="#2563EB"
                  fill="#2563EB"
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
              <span className="text-[9.5px] text-slate-500 block">Kinerja Di Atas Target</span>
              <span className="text-[11px] font-bold text-emerald-700">Merit (122,3%) &bull; WTP</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <span className="text-[9.5px] text-slate-500 block">Kinerja On Track</span>
              <span className="text-[11px] font-bold text-blue-700">RB (104,6%) &bull; SPIP (106,9%)</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* KOLOM KANAN: TAB INTERAKTIF DETAIL 4 IKP (TABEL + GRAFIK + INSIGHT) */}
        {/* ================================================================== */}
        <div className="lg:col-span-7 space-y-3">
          {/* Tab Selector Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/80 rounded-lg">
            <button
              onClick={() => setActiveTab('rb')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'rb'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>1. Indeks RB</span>
            </button>
            <button
              onClick={() => setActiveTab('merit')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'merit'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>2. Sistem Merit</span>
            </button>
            <button
              onClick={() => setActiveTab('spip')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'spip'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>3. Maturitas SPIP</span>
            </button>
            <button
              onClick={() => setActiveTab('wtp')}
              className={`flex-1 min-w-[90px] py-1.5 px-2 text-[11px] font-semibold rounded-md transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'wtp'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>4. Opini BPK WTP</span>
            </button>
          </div>

          {/* ================================================================ */}
          {/* TAB 1: INDEKS REFORMASI BIROKRASI                                */}
          {/* ================================================================ */}
          {activeTab === 'rb' && (
            <div className="space-y-3">
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Indeks Reformasi Birokrasi (8 Area Perubahan)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    104,6% Tercapai
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-1-rb')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 1 */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 font-bold">Insight Strategis RB:</strong> Penataan Tata Laksana SPBE (12,80) dan Manajemen SDM (12,65) menjadi pengungkit skor tertinggi. Akselerasi evaluasi kelembagaan agile di 24 satker berpotensi menaikkan indeks ke predikat A (&gt;80,00).
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Realisasi Nilai</span>
                  <span className="text-base font-bold text-slate-900">78,45 / BB</span>
                  <span className="text-[9.5px] text-blue-600 block mt-0.5">104,6% Capaian</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">BB (75,00)</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">KemenPAN-RB</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Area Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">SPBE (12,80)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Bobot 15%</span>
                </div>
              </div>

              {/* Tabel Rincian 8 Area Perubahan */}
              <div className="overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-36 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                    <tr>
                      <th className="py-1.5 px-2.5">Area Perubahan RB</th>
                      <th className="py-1.5 px-2 text-right">Bobot</th>
                      <th className="py-1.5 px-2 text-right">Nilai</th>
                      <th className="py-1.5 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {RB_8_AREA_TABLE_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.komponen}</td>
                        <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}%</td>
                        <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.nilai.toFixed(2)}</td>
                        <td className="py-1 px-2.5 text-center">
                          <span className="inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-emerald-50 text-emerald-700">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Visualisasi Grafis Tren & Komparasi (Persis Model Kepala BP) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-slate-100">
                <div className="sm:col-span-6 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60">
                  <span className="text-[10.5px] font-bold text-slate-800 block mb-1">
                    Tren Skor Indeks RB (2021 - 2026)
                  </span>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={RB_TREND_TAHUNAN} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[65, 85]} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: any) => [`${v} Poin`, 'Skor RB']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                        <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                        <Line type="monotone" dataKey="skor" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="sm:col-span-6 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60">
                  <span className="text-[10.5px] font-bold text-slate-800 block mb-1">
                    Capaian Nilai vs Bobot 8 Area
                  </span>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={RB_8_AREA_TABLE_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="komponen" tick={false} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: any, name: any) => [`${v}`, name === 'nilai' ? 'Realisasi' : 'Bobot']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                        <Bar dataKey="bobot" fill="#CBD5E1" barSize={8} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="nilai" fill="#3B82F6" barSize={8} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: INDEKS SISTEM MERIT                                       */}
          {/* ================================================================ */}
          {activeTab === 'merit' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Indeks Sistem Merit ASN BP Batam (8 Aspek)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    122,3% Sangat Baik
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-2-merit')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 2 */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-emerald-900 font-bold">Insight Strategis Sistem Merit:</strong> Skor 342,5 melampaui target Kategori IV (Sangat Baik). Pengembangan Karier (71,5/80) dan Pengadaan (23/24) menunjukkan integritas tinggi. Fokus peningkatan selanjutnya adalah integrasi modul SIMPEG Satu Data ASN.
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Skor Realisasi</span>
                  <span className="text-base font-bold text-slate-900">342,5 / Kategori IV</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">Sangat Baik (Skala 400)</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">280 (Baik)</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Standar KASN</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Aspek Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">Karier (71,5/80)</span>
                  <span className="text-[9.5px] text-emerald-600 font-semibold block mt-0.5">Kategori IV Sangat Baik</span>
                </div>
              </div>

              {/* Tabel Rincian 8 Aspek Sistem Merit */}
              <div className="overflow-x-auto rounded-lg border border-slate-200/70 bg-white max-h-36 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px] sticky top-0 bg-slate-50">
                    <tr>
                      <th className="py-1.5 px-2.5">Aspek Penilaian Merit</th>
                      <th className="py-1.5 px-2 text-right">Maks</th>
                      <th className="py-1.5 px-2 text-right">Skor</th>
                      <th className="py-1.5 px-2 text-right">%</th>
                      <th className="py-1.5 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MERIT_8_ASPEK_TABLE_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-1 px-2.5 font-medium text-slate-800 text-[11px]">{row.aspek}</td>
                        <td className="py-1 px-2 text-right text-slate-500 text-[10.5px]">{row.bobotMax}</td>
                        <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.skor.toFixed(1)}</td>
                        <td className="py-1 px-2 text-right font-bold text-slate-900 text-[11px]">{row.persen.toFixed(0)}%</td>
                        <td className="py-1 px-2.5 text-center">
                          <span className="inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-emerald-50 text-emerald-700">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Visualisasi Grafis: Bar Chart 8 Aspek & Tren Skor Sistem Merit */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1 border-t border-slate-100">
                <div className="sm:col-span-7 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60">
                  <span className="text-[10.5px] font-bold text-slate-800 block mb-1">
                    Capaian Skor 8 Aspek Sistem Merit (Realisasi vs Maks)
                  </span>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MERIT_8_ASPEK_TABLE_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="aspek" tick={false} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(v: any, name: any) => [`${v} Poin`, name === 'skor' ? 'Realisasi' : 'Bobot Maksimal']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                        <Bar dataKey="bobotMax" fill="#CBD5E1" barSize={8} radius={[2, 2, 0, 0]} />
                        <Bar dataKey="skor" fill="#10B981" barSize={8} radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="sm:col-span-5 bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10.5px] font-bold text-slate-800 truncate">
                      Tren Skor Sistem Merit
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-700 font-mono shrink-0">
                      342,5 / IV
                    </span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MERIT_TREND_ANNUAL_DATA} margin={{ top: 5, right: 8, left: -24, bottom: 0 }}>
                        <defs>
                          <linearGradient id="meritTrendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[250, 360]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(v: any, _name: any, item: any) => [
                            `${v} Poin (${item?.payload?.kategori || ''})`,
                            'Skor Sistem Merit',
                          ]}
                          contentStyle={{ fontSize: '10px', borderRadius: '6px' }}
                        />
                        <ReferenceLine y={280} stroke="#94A3B8" strokeDasharray="3 3" label={{ value: 'Target 280', fontSize: 7, fill: '#64748B' }} />
                        <Area type="monotone" dataKey="skor" stroke="#10B981" strokeWidth={2} fill="url(#meritTrendGrad)" dot={{ r: 2.5, fill: '#10B981' }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between text-[8.5px] text-slate-500 pt-1 border-t border-slate-200/50 mt-0.5">
                    <span>Naik +74,5 Poin sejak 2022</span>
                    <span className="font-semibold text-emerald-700">Kategori IV Sangat Baik</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: INDEKS MATURITAS SPIP                                     */}
          {/* ================================================================ */}
          {activeTab === 'spip' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Maturitas SPIP Terintegrasi (5 Unsur Pengendalian)
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                    106,9% Terdefinisi
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-3-spip')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 3 */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-amber-900 font-bold">Insight Strategis SPIP:</strong> Skor 3,42 menetapkan BP Batam pada Level 3 (Terdefinisi). Lingkungan Pengendalian (3,50) dan Kegiatan Pengendalian (3,45) berjalan efektif. Langkah mitigasi risiko perlu didokumentasikan berkala pada register risiko unit operasional.
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Skor Maturitas</span>
                  <span className="text-base font-bold text-slate-900">3,42 / Level 3</span>
                  <span className="text-[9.5px] text-amber-600 block mt-0.5">Terdefinisi (Skala 1 - 5)</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">3,20</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Standar BPKP RI</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Unsur Tertinggi</span>
                  <span className="text-base font-bold text-slate-900">Lingkungan (3,50)</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Integritas & Etika</span>
                </div>
              </div>

              {/* Tabel Rincian 5 Unsur SPIP */}
              <div className="overflow-x-auto rounded-lg border border-slate-200/70 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px]">
                    <tr>
                      <th className="py-1.5 px-2.5">Unsur Pengendalian Intern</th>
                      <th className="py-1.5 px-2 text-right">Bobot</th>
                      <th className="py-1.5 px-2 text-right">Standar L3</th>
                      <th className="py-1.5 px-2 text-right">Skor Aktual</th>
                      <th className="py-1.5 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SPIP_5_UNSUR_TABLE_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-1.5 px-2.5 font-medium text-slate-800 text-[11px]">{row.unsur}</td>
                        <td className="py-1.5 px-2 text-right text-slate-500 text-[10.5px]">{row.bobot}</td>
                        <td className="py-1.5 px-2 text-right text-slate-500 text-[10.5px]">{row.standarL3.toFixed(2)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900 text-[11px]">{row.skor.toFixed(2)}</td>
                        <td className="py-1.5 px-2.5 text-center">
                          <span className="inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-emerald-50 text-emerald-700">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Visualisasi Grafis Bar Chart 5 Unsur SPIP vs Standar */}
              <div className="bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60 pt-1">
                <span className="text-[10.5px] font-bold text-slate-800 block mb-1">
                  Komparasi 5 Unsur SPIP terhadap Standar Level 3 Terdefinisi (3,00)
                </span>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SPIP_5_UNSUR_TABLE_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="unsur" tick={{ fontSize: 8, fill: '#475569' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[2.5, 4.0]} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: any, name: any) => [`${v}`, name === 'skor' ? 'Skor Aktual' : 'Standar Level 3']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                      <Bar dataKey="standarL3" fill="#CBD5E1" barSize={14} radius={[2, 2, 0, 0]} />
                      <Bar dataKey="skor" fill="#F59E0B" barSize={14} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: OPINI BPK RI LAPORAN KEUANGAN                             */}
          {/* ================================================================ */}
          {activeTab === 'wtp' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Opini BPK RI atas Laporan Keuangan BP Batam
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    100% Tercapai WTP
                  </span>
                  <button
                    onClick={() => onOpenFormulaModal?.('ikp-4-wtp')}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>Manual IKP</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Insight Khusus IKP 4 */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-slate-700 leading-relaxed">
                  <strong className="text-emerald-900 font-bold">Insight Strategis Opini BPK:</strong> BP Batam sukses mempertahankan predikat Opini Wajar Tanpa Pengecualian (WTP) selama 8 tahun berturut-turut. Tingkat penyelesaian rekomendasi tindak lanjut hasil pemeriksaan (TLHP) BPK RI telah mencapai 93,9% (139 dari 148 rekomendasi tuntas).
                </p>
              </div>

              {/* 3 Kartu Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Opini Auditor</span>
                  <span className="text-base font-bold text-slate-900">Wajar Tanpa Pengecualian</span>
                  <span className="text-[9.5px] text-emerald-600 block mt-0.5">8 Tahun Berturut-turut</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Target Perkin</span>
                  <span className="text-base font-bold text-slate-900">Opini WTP</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">Laporan Keuangan TA 2025</span>
                </div>
                <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[9.5px] text-slate-500 block">Penyelesaian Temuan</span>
                  <span className="text-base font-bold text-slate-900">93,9% Selesai</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">139 dari 148 Rekomendasi</span>
                </div>
              </div>

              {/* Tabel Rincian 4 Kriteria Penilaian BPK */}
              <div className="overflow-x-auto rounded-lg border border-slate-200/70 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px]">
                    <tr>
                      <th className="py-1.5 px-2.5">Kriteria Penilaian BPK</th>
                      <th className="py-1.5 px-2">Dasar Standar</th>
                      <th className="py-1.5 px-2">Hasil Evaluasi</th>
                      <th className="py-1.5 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {OPINI_BPK_TABLE_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-1.5 px-2.5 font-medium text-slate-800 text-[11px]">{row.kriteria}</td>
                        <td className="py-1.5 px-2 text-slate-500 text-[10.5px]">{row.dasar}</td>
                        <td className="py-1.5 px-2 font-semibold text-slate-900 text-[11px]">{row.hasil}</td>
                        <td className="py-1.5 px-2.5 text-center">
                          <span className="inline-block px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-emerald-50 text-emerald-700">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Visualisasi Grafis Tren Tindak Lanjut & Rekam Jejak 8 Tahun WTP */}
              <div className="bg-slate-50/60 p-2.5 rounded-lg border border-slate-200/60 pt-1">
                <div className="flex items-center justify-between mb-1 text-[10.5px] font-bold text-slate-800">
                  <span>Rekam Jejak 8 Tahun WTP &amp; Tingkat Tindak Lanjut TLHP BPK RI</span>
                  <span className="text-emerald-700 font-semibold">93,9% Tuntas</span>
                </div>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={OPINI_BPK_HISTORY} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="thn" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[85, 100]} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: any) => [`${v}% Tuntas (Opini WTP)`, 'Tindak Lanjut']} contentStyle={{ fontSize: '10px', borderRadius: '6px' }} />
                      <Line type="monotone" dataKey="skorTindakLanjut" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3, fill: '#10B981' }} />
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
