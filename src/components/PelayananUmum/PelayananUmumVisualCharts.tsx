import React, { useState } from 'react';
import {
  TrendingUp,
  Scale,
  Award,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { SheetSwapToggle } from '../SheetSwapToggle';

interface PelayananUmumVisualChartsProps {
  onOpenFormulaModal: (kpiId?: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar Capaian 4 IKP DEP-A6 Pelayanan Umum
const RADAR_4_IKP_A6 = [
  { subject: '1. Peningkatan Kinerja BU', target: 100, realisasi: 112.7, skorAsli: '1,24% / 1,1%' },
  { subject: '2. Rasio PNBP BU', target: 100, realisasi: 104.4, skorAsli: '0,71 / 0,68' },
  { subject: '3. IKM Layanan BU', target: 100, realisasi: 100.4, skorAsli: '88,66 / 88,31' },
  { subject: '4. Sinergi Pelayanan', target: 100, realisasi: 104.7, skorAsli: 'Rp 264,3 M' },
];

// ============================================================================
// DATA DETAIL TAB 1: PENINGKATAN KINERJA BADAN USAHA (IKP-1)
// ============================================================================
const KINERJA_BU_8_AREA = [
  { code: 'A1', area: 'Manajemen Rawat Inap & Bedah RSBP', bobot: 20, nilai: 4.80, status: 'Sangat Baik' },
  { code: 'A2', area: 'Poliklinik Spesialis & Rawat Jalan', bobot: 15, nilai: 4.15, status: 'Optimal' },
  { code: 'A3', area: 'Farmasi, Laboratorium & Diagnostik', bobot: 15, nilai: 4.60, status: 'Sangat Baik' },
  { code: 'A4', area: 'Produksi & Distribusi Air WTP', bobot: 20, nilai: 2.45, status: 'Optimal' },
  { code: 'A5', area: 'Pengolahan Limbah B3 KPLI Kabil', bobot: 10, nilai: 2.15, status: 'Baik' },
  { code: 'A6', area: 'Sewa Gedung Komersial & Rusunawa', bobot: 10, nilai: 2.30, status: 'Baik' },
  { code: 'A7', area: 'Pengamanan Objek Vital Kawasan', bobot: 5, nilai: 1.95, status: 'Baik' },
  { code: 'A8', area: 'Respon Cepat & Penertiban Aset', bobot: 5, nilai: 1.80, status: 'Baik' },
];

const KINERJA_BU_TREND = [
  { tahun: '2021', skor: 0.75, target: 0.90 },
  { tahun: '2022', skor: 0.85, target: 1.00 },
  { tahun: '2023', skor: 0.98, target: 1.00 },
  { tahun: '2024', skor: 1.12, target: 1.10 },
  { tahun: '2025', skor: 1.24, target: 1.10 },
  { tahun: '2026', skor: 1.35, target: 1.20 },
];

// ============================================================================
// DATA DETAIL TAB 2: RASIO PNBP BADAN USAHA (IKP-2)
// ============================================================================
const RASIO_PNBP_8_AREA = [
  { code: 'A1', area: 'Pasien Rawat Inap & Bedah RSBP', bobot: 20, nilai: 16.0, status: 'Optimal' },
  { code: 'A2', area: 'Klaim BPJS Kesehatan & Asuransi', bobot: 15, nilai: 11.0, status: 'Sangat Baik' },
  { code: 'A3', area: 'Kerjasama Tenant, Apotek & Lab', bobot: 10, nilai: 6.0, status: 'Optimal' },
  { code: 'A4', area: 'Penjualan Air Bersih Pelanggan SPAM', bobot: 25, nilai: 20.0, status: 'Sangat Baik' },
  { code: 'A5', area: 'Pengolahan Limbah Industri B3 KPLI', bobot: 10, nilai: 7.0, status: 'Optimal' },
  { code: 'A6', area: 'Pemanfaatan Wisma & Gedung BIDA', bobot: 10, nilai: 6.0, status: 'Baik' },
  { code: 'A7', area: 'Retribusi Pengamanan Objek Vital', bobot: 5, nilai: 3.0, status: 'Baik' },
  { code: 'A8', area: 'Layanan PPID & Keterbukaan Publik', bobot: 5, nilai: 2.0, status: 'Baik' },
];

const RASIO_PNBP_TREND = [
  { tahun: '2021', skor: 0.58, target: 0.55 },
  { tahun: '2022', skor: 0.62, target: 0.60 },
  { tahun: '2023', skor: 0.65, target: 0.64 },
  { tahun: '2024', skor: 0.68, target: 0.66 },
  { tahun: '2025', skor: 0.71, target: 0.68 },
  { tahun: '2026', skor: 0.73, target: 0.70 },
];

// ============================================================================
// DATA DETAIL TAB 3: IKM LAYANAN BADAN USAHA (IKP-3)
// ============================================================================
const IKM_8_AREA = [
  { code: 'A1', area: 'Kesesuaian Persyaratan Layanan', bobot: 10, nilai: 8.94, status: 'Sangat Baik' },
  { code: 'A2', area: 'Kemudahan Prosedur & Alur Layanan', bobot: 10, nilai: 8.88, status: 'Optimal' },
  { code: 'A3', area: 'Kecepatan Waktu Penyelesaian', bobot: 15, nilai: 13.18, status: 'Baik' },
  { code: 'A4', area: 'Kewajaran Tarif & Transparansi', bobot: 10, nilai: 8.91, status: 'Sangat Baik' },
  { code: 'A5', area: 'Kesesuaian Produk Spesifikasi', bobot: 15, nilai: 13.31, status: 'Sangat Baik' },
  { code: 'A6', area: 'Kompetensi Petugas / Medis', bobot: 15, nilai: 13.44, status: 'Sangat Baik' },
  { code: 'A7', area: 'Perilaku Keramahan Petugas', bobot: 15, nilai: 13.33, status: 'Optimal' },
  { code: 'A8', area: 'Penanganan Pengaduan & Sarpras', bobot: 10, nilai: 8.82, status: 'Optimal' },
];

const IKM_TREND = [
  { tahun: '2021', skor: 83.2, target: 81.0 },
  { tahun: '2022', skor: 84.5, target: 82.0 },
  { tahun: '2023', skor: 86.2, target: 85.0 },
  { tahun: '2024', skor: 87.8, target: 86.5 },
  { tahun: '2025', skor: 88.66, target: 88.31 },
  { tahun: '2026', skor: 89.8, target: 88.5 },
];

// ============================================================================
// DATA DETAIL TAB 4: SINERGI PELAYANAN UMUM (IKP-4)
// ============================================================================
const SINERGI_8_AREA = [
  { code: 'A1', area: 'Pelayanan Medik & Kamar Bedah RSBP', bobot: 20, nilai: 21.20, status: 'Sangat Baik' },
  { code: 'A2', area: 'Modernisasi Fasilitas Alkes RSBP', bobot: 15, nilai: 15.80, status: 'Sangat Baik' },
  { code: 'A3', area: 'Produksi & Distribusi Air Bersih WTP', bobot: 20, nilai: 20.90, status: 'Sangat Baik' },
  { code: 'A4', area: 'Pengendalian NRW & Meterisasi DMZ', bobot: 10, nilai: 9.80, status: 'Optimal' },
  { code: 'A5', area: 'Pengolahan Limbah B3 KPLI Batam', bobot: 10, nilai: 10.20, status: 'Optimal' },
  { code: 'A6', area: 'Reaksi Cepat Patroli Obvit Ditpam', bobot: 10, nilai: 10.40, status: 'Sangat Baik' },
  { code: 'A7', area: 'Penertiban Aset Lahan & Bangunan', bobot: 10, nilai: 9.60, status: 'Baik' },
  { code: 'A8', area: 'Diseminasi & PPID Keterbukaan', bobot: 5, nilai: 5.10, status: 'Sangat Baik' },
];

const SINERGI_TREND = [
  { tahun: '2021', skor: 74.2, target: 70.0 },
  { tahun: '2022', skor: 78.4, target: 75.0 },
  { tahun: '2023', skor: 81.2, target: 80.0 },
  { tahun: '2024', skor: 83.5, target: 82.0 },
  { tahun: '2025', skor: 88.2, target: 85.0 },
  { tahun: '2026', skor: 91.5, target: 88.0 },
];

export const PelayananUmumVisualCharts: React.FC<PelayananUmumVisualChartsProps> = ({
  onOpenFormulaModal,
}) => {
  // Tab state: 'kinerja', 'rasio', 'ikm', 'sinergi'
  const [activeTab, setActiveTab] = useState<'kinerja' | 'rasio' | 'ikm' | 'sinergi'>('kinerja');
  // Fullscreen / Expanded Mode
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Sheet Swap View Modes
  const [radarViewMode, setRadarViewMode] = useState<'chart' | 'table'>('chart');
  const [trendViewMode, setTrendViewMode] = useState<'chart' | 'table'>('chart');
  const [barViewMode, setBarViewMode] = useState<'chart' | 'table'>('chart');

  // Configuration mapper based on activeTab
  const currentTabConfig = {
    kinerja: {
      ikpId: 'ikp-1',
      title: 'Peningkatan Kinerja Badan Usaha (8 Komponen Layanan)',
      badge: '112,7% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: '1,24%',
      capaianDisplay: '112,7% Capaian',
      targetLabel: 'Target Perkin',
      targetDisplay: '1,10%',
      targetSub: 'Perkin A6 No. 6/2025',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'RSBP (+4,55%)',
      areaTertinggiSub: 'Bobot 20%',
      tableData: KINERJA_BU_8_AREA,
      tableHeaderLabel: 'Komponen Layanan BU',
      trendData: KINERJA_BU_TREND,
      trendTitle: 'Tren Peningkatan Kinerja BU (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Area',
      lineDomain: [0.6, 1.5] as [number, number],
      barDomain: [0, 25] as [number, number],
      unitSatuan: '%',
    },
    rasio: {
      ikpId: 'ikp-2',
      title: 'Rasio PNBP Badan Usaha terhadap BP Batam (8 Sumber Pendapatan)',
      badge: '104,4% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: '0,71 / Rasio',
      capaianDisplay: '104,4% Capaian',
      targetLabel: 'Target Perkin',
      targetDisplay: '0,68',
      targetSub: 'Laporan Keuangan & RKKL',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'SPAM Fasling (0,38)',
      areaTertinggiSub: 'Bobot 25%',
      tableData: RASIO_PNBP_8_AREA,
      tableHeaderLabel: 'Sumber Pendapatan PNBP',
      trendData: RASIO_PNBP_TREND,
      trendTitle: 'Tren Rasio PNBP BU (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Sumber',
      lineDomain: [0.5, 0.8] as [number, number],
      barDomain: [0, 30] as [number, number],
      unitSatuan: 'Poin',
    },
    ikm: {
      ikpId: 'ikp-3',
      title: 'Indeks Kepuasan Masyarakat BU (8 Komponen Mutu Layanan)',
      badge: '100,4% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: '88,66 / A',
      capaianDisplay: '100,4% Capaian',
      targetLabel: 'Target Perkin',
      targetDisplay: '88,31 (Mutu A)',
      targetSub: 'PermenPAN-RB No. 14/2017',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'Kompetensi Medis (89,60)',
      areaTertinggiSub: 'Bobot 15%',
      tableData: IKM_8_AREA,
      tableHeaderLabel: 'Komponen Mutu Layanan (PermenPAN-RB)',
      trendData: IKM_TREND,
      trendTitle: 'Tren Skor Indeks IKM (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Komponen Mutu',
      lineDomain: [80, 95] as [number, number],
      barDomain: [0, 20] as [number, number],
      unitSatuan: 'Skor',
    },
    sinergi: {
      ikpId: 'ikp-4',
      title: 'Sinergi Kinerja & Belanja 4 Satker Pelayanan Umum (8 Program)',
      badge: '104,7% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: 'Rp 264,3 M',
      capaianDisplay: '104,7% Capaian',
      targetLabel: 'Target Perkin',
      targetDisplay: 'Rp 252,4 M',
      targetSub: 'Pagu Rencana Belanja',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'BU SPAM (Rp 142,5 M)',
      areaTertinggiSub: 'Porsi 53,9%',
      tableData: SINERGI_8_AREA,
      tableHeaderLabel: 'Program Sinergi Pelayanan',
      trendData: SINERGI_TREND,
      trendTitle: 'Tren Serapan Sinergi (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Program',
      lineDomain: [70, 95] as [number, number],
      barDomain: [0, 25] as [number, number],
      unitSatuan: '%',
    },
  }[activeTab];

  // Helper status color badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Optimal':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Optimal
          </span>
        );
      case 'Sangat Baik':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            Sangat Baik
          </span>
        );
      case 'Baik':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
            Baik
          </span>
        );
      case 'Melampaui':
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
            Melampaui
          </span>
        );
      default:
        return (
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs space-y-3 font-sans">
      {/* Top Controls: Mode Switcher */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-xs sm:text-sm">
            Model Tampilan Tabel Detail &amp; Analisis Kinerja DEP-A6
          </span>
          <span className="text-[10.5px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
            Format Standar Perkin Eksekutif
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          title={isExpanded ? 'Beralih ke tampilan standar dengan radar' : 'Perluas tampilan penuh tabel detail'}
        >
          {isExpanded ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Tampilan Kolom (Radar + Detail)</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Tampilan Penuh (Model Sesuai Desain)</span>
            </>
          )}
        </button>
      </div>

      <div className={`grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-3.5 items-start`}>
        {/* ================================================================== */}
        {/* KOLOM KIRI: RADAR CHART CAPAIAN 4 IKP (Hanya tampil jika tidak expanded) */}
        {/* ================================================================== */}
        {!isExpanded && (
          <div className="lg:col-span-3 bg-slate-50/70 rounded-xl border border-slate-200/70 p-3 space-y-2.5 flex flex-col justify-between self-stretch">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Radar Capaian 4 IKP DEP-A6
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Realisasi Aktual vs Target Perkin A6 2025
                  </p>
                </div>
                <SheetSwapToggle mode={radarViewMode} onChange={setRadarViewMode} />
              </div>

              {/* Radar Chart or Sheet Swap Table */}
              <div className="h-44 w-full mt-2">
                {radarViewMode === 'chart' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={RADAR_4_IKP_A6} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                      <PolarGrid stroke="#CBD5E1" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#334155', fontSize: 8.5, fontWeight: 700 }}
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
                        stroke="#2563EB"
                        fill="#2563EB"
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
                ) : (
                  <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[9px] z-10 border-b border-slate-200">
                        <tr>
                          <th className="py-1 px-1.5">Indikator</th>
                          <th className="py-1 px-1 text-right">Target</th>
                          <th className="py-1 px-1 text-right">Realisasi</th>
                          <th className="py-1 px-1 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {RADAR_4_IKP_A6.map((r, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/40">
                            <td className="py-1 px-1.5 font-medium text-slate-800">{r.subject}</td>
                            <td className="py-1 px-1 text-right font-mono text-slate-500">{r.target}%</td>
                            <td className="py-1 px-1 text-right font-mono font-bold text-blue-700">{r.realisasi}%</td>
                            <td className="py-1 px-1 text-center">
                              <span className="px-1 py-0.5 rounded text-[8.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {r.realisasi >= 100 ? 'Melampaui' : 'Tercapai'}
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

            {/* Status Info Box */}
            <div className="pt-2 border-t border-slate-200/70 text-[10.5px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-slate-500">Rerata Capaian IKP:</span>
                <span className="text-emerald-700 font-bold font-mono">105,55%</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Status Kinerja:</span>
                <span className="font-bold text-blue-700">Optimal &amp; Melampaui</span>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODEL TAMPILAN TABEL DETAIL & DUAL CHARTS PERSIS GAMBAR REFERENSI  */}
        {/* ================================================================== */}
        <div className={`${isExpanded ? 'lg:col-span-12' : 'lg:col-span-9'} space-y-3`}>
          {/* 1. TOP SEGMENTED TABS: 4 PILIHAN IKP DENGAN DESAIN PERSIS GAMBAR */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveTab('kinerja')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'kinerja'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>1. Peningkatan Kinerja BU</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rasio')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'rasio'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>2. Rasio PNBP BU</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ikm')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'ikm'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>3. IKM Layanan BU</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sinergi')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'sinergi'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4. Sinergi Pelayanan Umum</span>
            </button>
          </div>

          {/* 2. HEADER BAR: JUDUL AREA + BADGE CAPAIAN + TOMBOL MANUAL IKP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {currentTabConfig.title}
              </h4>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                {currentTabConfig.badge}
              </span>
              <button
                type="button"
                onClick={() => onOpenFormulaModal(currentTabConfig.ikpId)}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
              >
                <span>Manual IKP</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. TIGA KARTU RINGKAS KPI DI ATAS TABEL DETAIL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 shadow-2xs">
              <span className="text-[10.5px] text-slate-500 font-medium block">
                {currentTabConfig.realisasiLabel}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono block mt-0.5">
                {currentTabConfig.realisasiDisplay}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold block mt-1">
                {currentTabConfig.capaianDisplay}
              </span>
            </div>

            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 shadow-2xs">
              <span className="text-[10.5px] text-slate-500 font-medium block">
                {currentTabConfig.targetLabel}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono block mt-0.5">
                {currentTabConfig.targetDisplay}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block mt-1">
                {currentTabConfig.targetSub}
              </span>
            </div>

            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 shadow-2xs">
              <span className="text-[10.5px] text-slate-500 font-medium block">
                {currentTabConfig.areaTertinggiLabel}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 font-mono block mt-0.5 truncate">
                {currentTabConfig.areaTertinggiDisplay}
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-1">
                {currentTabConfig.areaTertinggiSub}
              </span>
            </div>
          </div>

          {/* 4. SPLIT LAYOUT: TABEL DETAIL (KIRI) & DUAL CHARTS TREN + BAR CAPAIAN (KANAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* KOLOM KIRI: TABEL DETAIL DENGAN BOBOT, NILAI, & STATUS (PERSIS MODEL REFERENSI) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto max-h-[380px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-semibold text-[11px] sticky top-0 bg-slate-50 z-10">
                    <tr>
                      <th className="py-2.5 px-3">{currentTabConfig.tableHeaderLabel}</th>
                      <th className="py-2.5 px-2.5 text-right font-semibold">Bobot</th>
                      <th className="py-2.5 px-2.5 text-right font-bold">Nilai</th>
                      <th className="py-2.5 px-3 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    {currentTabConfig.tableData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2 px-3 font-medium text-slate-800">
                          {row.area}
                        </td>
                        <td className="py-2 px-2.5 text-right text-slate-500 font-mono text-[11px]">
                          {row.bobot}%
                        </td>
                        <td className="py-2 px-2.5 text-right font-bold text-slate-900 font-mono text-[11px]">
                          {row.nilai.toFixed(2)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {renderStatusBadge(row.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Total Konsolidasi Baris Bawah */}
                  <tfoot className="bg-slate-50/80 border-t border-slate-200 font-bold text-[11px]">
                    <tr>
                      <td className="py-2 px-3 text-slate-900 font-black">
                        Total Agregasi Komponen
                      </td>
                      <td className="py-2 px-2.5 text-right text-slate-700 font-mono font-bold">
                        100%
                      </td>
                      <td className="py-2 px-2.5 text-right text-blue-700 font-mono font-black">
                        {currentTabConfig.tableData.reduce((acc, curr) => acc + curr.nilai, 0).toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                          {currentTabConfig.badge}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* KOLOM KANAN: DUAL STACKED CHARTS (TREN LINE CHART + CAPAIAN BAR CHART) */}
            <div className="lg:col-span-5 space-y-2.5">
              {/* Header */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">
                  Visualisasi Tren &amp; Komparasi
                </span>
              </div>

              {/* CHART 1 (ATAS): TREN LINE CHART (2021 - 2026) */}
              <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10.5px] font-bold text-slate-800">
                    {currentTabConfig.trendTitle}
                  </span>
                  <SheetSwapToggle mode={trendViewMode} onChange={setTrendViewMode} />
                </div>
                <div className="h-28 w-full">
                  {trendViewMode === 'chart' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentTabConfig.trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="tahun" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={currentTabConfig.lineDomain} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(v: any) => [`${v} ${currentTabConfig.unitSatuan}`, 'Realisasi']}
                          contentStyle={{ fontSize: '10px', borderRadius: '6px' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#94A3B8"
                          strokeDasharray="3 3"
                          strokeWidth={1.5}
                          dot={false}
                          name="Target Perkin"
                        />
                        <Line
                          type="monotone"
                          dataKey="skor"
                          stroke="#2563EB"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#2563EB' }}
                          name="Realisasi Aktual"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left border-collapse text-[10px]">
                        <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[9px] z-10 border-b border-slate-200">
                          <tr>
                            <th className="py-1 px-2">Tahun</th>
                            <th className="py-1 px-2 text-right">Target</th>
                            <th className="py-1 px-2 text-right">Realisasi Aktual</th>
                            <th className="py-1 px-2 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentTabConfig.trendData.map((row, idx) => {
                            const achieved = (row.skor / row.target) * 100;
                            return (
                              <tr key={idx} className="hover:bg-blue-50/40">
                                <td className="py-1 px-2 font-bold text-slate-800 font-mono">{row.tahun}</td>
                                <td className="py-1 px-2 text-right font-mono text-slate-500">{row.target} {currentTabConfig.unitSatuan}</td>
                                <td className="py-1 px-2 text-right font-mono font-bold text-blue-700">{row.skor} {currentTabConfig.unitSatuan}</td>
                                <td className="py-1 px-2 text-center">
                                  <span className={`px-1 py-0.5 rounded text-[8.5px] font-bold ${
                                    achieved >= 100 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}>
                                    {achieved >= 100 ? 'Melampaui' : 'Tercapai'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* CHART 2 (BAWAH): PAIRED BAR CHART (CAPAIAN NILAI VS BOBOT 8 AREA) */}
              <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10.5px] font-bold text-slate-800 block">
                    {currentTabConfig.barTitle}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-[9.5px]">
                      <span className="flex items-center gap-1 text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#CBD5E1]" />
                        <span>Bobot</span>
                      </span>
                      <span className="flex items-center gap-1 text-blue-700 font-semibold">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                        <span>Nilai</span>
                      </span>
                    </div>
                    <SheetSwapToggle mode={barViewMode} onChange={setBarViewMode} />
                  </div>
                </div>
                <div className="h-28 w-full">
                  {barViewMode === 'chart' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentTabConfig.tableData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="code" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={currentTabConfig.barDomain} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(val: any, name: any) => [
                            `${val}${name === 'Bobot (%)' ? '%' : ''}`,
                            name,
                          ]}
                          labelFormatter={(_label, payload) => {
                            if (payload && payload.length > 0) {
                              return payload[0].payload.area;
                            }
                            return '';
                          }}
                          contentStyle={{ fontSize: '10px', borderRadius: '6px' }}
                        />
                        <Bar dataKey="bobot" name="Bobot (%)" fill="#CBD5E1" radius={[2, 2, 0, 0]} maxBarSize={12} />
                        <Bar dataKey="nilai" name="Nilai Capaian" fill="#2563EB" radius={[2, 2, 0, 0]} maxBarSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left border-collapse text-[10px]">
                        <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[9px] z-10 border-b border-slate-200">
                          <tr>
                            <th className="py-1 px-1.5">Kode</th>
                            <th className="py-1 px-2">Komponen / Area</th>
                            <th className="py-1 px-2 text-right">Bobot</th>
                            <th className="py-1 px-2 text-right">Nilai Capaian</th>
                            <th className="py-1 px-2 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentTabConfig.tableData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/40">
                              <td className="py-1 px-1.5 font-bold font-mono text-slate-600">{row.code}</td>
                              <td className="py-1 px-2 font-medium text-slate-800 truncate max-w-[140px]">{row.area}</td>
                              <td className="py-1 px-2 text-right font-mono text-slate-500">{row.bobot}%</td>
                              <td className="py-1 px-2 text-right font-mono font-bold text-blue-700">{row.nilai.toFixed(2)}</td>
                              <td className="py-1 px-2 text-center">
                                {renderStatusBadge(row.status)}
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
        </div>
      </div>
    </div>
  );
};
