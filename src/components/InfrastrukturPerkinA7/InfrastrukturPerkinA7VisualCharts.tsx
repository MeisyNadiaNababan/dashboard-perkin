import React, { useState } from 'react';
import {
  HardHat,
  Coins,
  Route,
  Layers,
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
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface InfrastrukturPerkinA7VisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

// Data Radar Capaian 4 IKP & Makro DEP-A7
const RADAR_4_IKP_A7 = [
  { subject: '1. Penyelenggaraan Fisik', target: 100, realisasi: 92.4, skorAsli: '92,40% / 100%' },
  { subject: '2. PNBP ROW Utilitas/RTH', target: 100, realisasi: 109.22, skorAsli: 'Rp 7,45 M / Rp 6,82 M' },
  { subject: '3. Kemantapan Jalan', target: 100, realisasi: 91.4, skorAsli: '496,1 Km / 542,8 Km' },
  { subject: '4. Sinergi 3 Dit Infras', target: 100, realisasi: 100.81, skorAsli: 'Rp 682,4 M' },
];

// ============================================================================
// DATA DETAIL TAB 1: PENYELENGGARAAN INFRASTRUKTUR FISIK (IKP-1)
// ============================================================================
const FISIK_8_PAKET = [
  { code: 'P1', area: 'Flyover & Jembatan Sei Ladi Gajah Mada', bobot: 20, nilai: 19.20, status: 'Sangat Baik' },
  { code: 'P2', area: 'Pelebaran Jalan Sudirman Koridor 5', bobot: 15, nilai: 14.10, status: 'Optimal' },
  { code: 'P3', area: 'Pematangan Lahan Rempang BSW Zona A', bobot: 15, nilai: 13.80, status: 'Optimal' },
  { code: 'P4', area: 'Revitalisasi Drainase Primer Baloi Indah', bobot: 10, nilai: 9.50, status: 'Optimal' },
  { code: 'P5', area: 'Dermaga Logistik Curah Batu Ampar', bobot: 15, nilai: 13.20, status: 'Baik' },
  { code: 'P6', area: 'Pembangunan ROW Jalan Hang Jebat', bobot: 10, nilai: 9.10, status: 'Baik' },
  { code: 'P7', area: 'DED Perencanaan Kawasan Kabil & Nongsa', bobot: 10, nilai: 9.52, status: 'Sangat Baik' },
  { code: 'P8', area: 'Sterilisasi Sempadan & ROW Ditpam', bobot: 5, nilai: 4.48, status: 'Baik' },
];

const FISIK_TREND_ANNUAL = [
  { tahun: '2021', skor: 83.5, target: 95.0 },
  { tahun: '2022', skor: 86.4, target: 100.0 },
  { tahun: '2023', skor: 88.9, target: 100.0 },
  { tahun: '2024', skor: 90.5, target: 100.0 },
  { tahun: '2025', skor: 92.4, target: 100.0 },
  { tahun: '2026', skor: 95.0, target: 100.0 },
];

// ============================================================================
// DATA DETAIL TAB 2: REALISASI PNBP ROW UTILITAS & PENGHIJAUAN (IKP-2)
// ============================================================================
const PNBP_8_SUBPENERIMAAN = [
  { code: 'N1', area: 'Sewa ROW Fiber Optik & Telko', bobot: 35, nilai: 38.2, status: 'Melampaui' },
  { code: 'N2', area: 'Sewa ROW Pipa Minyak, Gas & Avtur', bobot: 20, nilai: 22.4, status: 'Melampaui' },
  { code: 'N3', area: 'Izin Pematangan Lahan (Cut & Fill)', bobot: 15, nilai: 15.6, status: 'Optimal' },
  { code: 'N4', area: 'Penataan Reklame & Media Ruang Luar', bobot: 10, nilai: 11.2, status: 'Melampaui' },
  { code: 'N5', area: 'Pemanfaatan ROW Listrik PLN', bobot: 10, nilai: 10.5, status: 'Optimal' },
  { code: 'N6', area: 'Layanan Penghijauan & Taman Koridor', bobot: 5, nilai: 5.2, status: 'Optimal' },
  { code: 'N7', area: 'Retribusi Jaringan Pipa Air Bersih', bobot: 3, nilai: 3.3, status: 'Optimal' },
  { code: 'N8', area: 'Denda & Penertiban Reklame Ilegal', bobot: 2, nilai: 2.8, status: 'Melampaui' },
];

const PNBP_TREND_ANNUAL = [
  { tahun: '2021', skor: 4.80, target: 4.50 },
  { tahun: '2022', skor: 5.20, target: 4.80 },
  { tahun: '2023', skor: 5.85, target: 5.40 },
  { tahun: '2024', skor: 6.40, target: 6.00 },
  { tahun: '2025', skor: 7.45, target: 6.82 },
  { tahun: '2026', skor: 8.00, target: 7.20 },
];

// ============================================================================
// DATA DETAIL TAB 3: KEMANTAPAN JALAN & DRAINASE (IKP-3)
// ============================================================================
const JALAN_8_KORIDOR = [
  { code: 'J1', area: 'Koridor Arteri Batu Ampar - Nagoya', bobot: 20, nilai: 19.64, status: 'Sangat Baik' },
  { code: 'J2', area: 'Koridor Sudirman - Bandara Hang Nadim', bobot: 20, nilai: 19.10, status: 'Sangat Baik' },
  { code: 'J3', area: 'Koridor Industri Mukakuning - Batamindo', bobot: 15, nilai: 14.18, status: 'Optimal' },
  { code: 'J4', area: 'Koridor Pelabuhan Punggur - Kabil', bobot: 15, nilai: 13.50, status: 'Optimal' },
  { code: 'J5', area: 'Saluran Primer Baloi & Sei Ladi', bobot: 10, nilai: 9.48, status: 'Optimal' },
  { code: 'J6', area: 'Drainase Sekunder Batam Center', bobot: 10, nilai: 8.80, status: 'Baik' },
  { code: 'J7', area: 'Jaringan Kolektor Sekupang - Tiban', bobot: 5, nilai: 4.40, status: 'Baik' },
  { code: 'J8', area: 'Akses Penghubung Rempang - Galang', bobot: 5, nilai: 4.25, status: 'Baik' },
];

const JALAN_TREND_ANNUAL = [
  { tahun: '2021', skor: 84.0, target: 82.0 },
  { tahun: '2022', skor: 86.2, target: 85.0 },
  { tahun: '2023', skor: 88.0, target: 87.5 },
  { tahun: '2024', skor: 89.8, target: 89.0 },
  { tahun: '2025', skor: 91.4, target: 90.0 },
  { tahun: '2026', skor: 93.5, target: 92.0 },
];

// ============================================================================
// DATA DETAIL TAB 4: SINERGI 3 DIREKTORAT INFRASTRUKTUR (IKP-4)
// ============================================================================
const SINERGI_8_PROGRAM = [
  { code: 'S1', area: 'Paket Konstruksi Jalan & Jembatan', bobot: 30, nilai: 30.80, status: 'Melampaui' },
  { code: 'S2', area: 'Normalisasi Drainase & Kolam Retensi', bobot: 15, nilai: 15.20, status: 'Optimal' },
  { code: 'S3', area: 'Pematangan Lahan Kawasan Industri BSW', bobot: 15, nilai: 14.80, status: 'Optimal' },
  { code: 'S4', area: 'Penyusunan DED Jalan & Utilitas (Pusren)', bobot: 10, nilai: 10.40, status: 'Sangat Baik' },
  { code: 'S5', area: 'DED Pengendalian Banjir & Kolam Baloi', bobot: 10, nilai: 9.80, status: 'Optimal' },
  { code: 'S6', area: 'Penertiban Bangunan Liar di ROW (Ditpam)', bobot: 10, nilai: 10.20, status: 'Optimal' },
  { code: 'S7', area: 'Pengamanan Obvit Jembatan Barelang', bobot: 5, nilai: 5.00, status: 'Sangat Baik' },
  { code: 'S8', area: 'Mitigasi Longsor & DTA Waduk Air Baku', bobot: 5, nilai: 4.80, status: 'Baik' },
];

const SINERGI_TREND_ANNUAL = [
  { tahun: '2021', skor: 71.0, target: 70.0 },
  { tahun: '2022', skor: 76.5, target: 75.0 },
  { tahun: '2023', skor: 79.2, target: 78.0 },
  { tahun: '2024', skor: 81.8, target: 80.0 },
  { tahun: '2025', skor: 84.38, target: 82.0 },
  { tahun: '2026', skor: 88.0, target: 85.0 },
];

export const InfrastrukturPerkinA7VisualCharts: React.FC<
  InfrastrukturPerkinA7VisualChartsProps
> = ({ onOpenFormulaModal }) => {
  // Tab state: 'fisik', 'pnbp', 'jalan', 'sinergi'
  const [activeTab, setActiveTab] = useState<'fisik' | 'pnbp' | 'jalan' | 'sinergi'>('fisik');
  // Fullscreen / Expanded Mode
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Configuration mapper based on activeTab
  const currentTabConfig = {
    fisik: {
      ikpId: 'ikp-1-pembangunan-infrastruktur',
      title: 'Penyelenggaraan Infrastruktur Fisik (8 Paket / Sektor Strategis)',
      badge: '92,40% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: '92,40%',
      capaianDisplay: '92,4% Capaian Rencana',
      targetLabel: 'Target Perkin',
      targetDisplay: '100,00%',
      targetSub: 'Perkin A7 No. 8/2025',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'Sei Ladi (19,20)',
      areaTertinggiSub: 'Bobot 20%',
      tableData: FISIK_8_PAKET,
      tableHeaderLabel: 'Paket / Sektor Pekerjaan Fisik',
      trendData: FISIK_TREND_ANNUAL,
      trendTitle: 'Tren Penyelenggaraan Fisik (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Paket',
      lineDomain: [75, 105] as [number, number],
      barDomain: [0, 25] as [number, number],
      unitSatuan: '%',
    },
    pnbp: {
      ikpId: 'ikp-2-pnbp-infrastruktur',
      title: 'Realisasi PNBP ROW Utilitas & Penghijauan (8 Sub-Penerimaan)',
      badge: '109,22% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: 'Rp 7,450 M',
      capaianDisplay: '109,2% Melampaui Target',
      targetLabel: 'Target Perkin',
      targetDisplay: 'Rp 6,821 M',
      targetSub: 'DIPA BP Batam TA 2025',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'ROW Fiber Optik (38,2)',
      areaTertinggiSub: 'Bobot 35%',
      tableData: PNBP_8_SUBPENERIMAAN,
      tableHeaderLabel: 'Sub-Penerimaan PNBP ROW',
      trendData: PNBP_TREND_ANNUAL,
      trendTitle: 'Tren Penerimaan PNBP ROW (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Sub-Penerimaan',
      lineDomain: [4.0, 9.0] as [number, number],
      barDomain: [0, 45] as [number, number],
      unitSatuan: 'Miliar',
    },
    jalan: {
      ikpId: 'ikp-jalan-drainase',
      title: 'Kemantapan Jaringan Jalan & Drainase (8 Wilayah Pengembangan)',
      badge: '91,4% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: '496,1 Km',
      capaianDisplay: '91,4% Kondisi Mantap',
      targetLabel: 'Target Perkin',
      targetDisplay: '542,8 Km',
      targetSub: 'Total Ruas Jalan Strategis',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'Batu Ampar (19,64)',
      areaTertinggiSub: 'Bobot 20%',
      tableData: JALAN_8_KORIDOR,
      tableHeaderLabel: 'Koridor Jalan & Jaringan Drainase',
      trendData: JALAN_TREND_ANNUAL,
      trendTitle: 'Tren Kemantapan Jalan (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Koridor',
      lineDomain: [80, 98] as [number, number],
      barDomain: [0, 25] as [number, number],
      unitSatuan: '%',
    },
    sinergi: {
      ikpId: 'ikp-sinergi-infrastruktur',
      title: 'Sinergi Belanja Modal & Kinerja 3 Unit Infrastruktur (8 Program)',
      badge: '100,8% Tercapai',
      realisasiLabel: 'Realisasi Nilai',
      realisasiDisplay: 'Rp 682,4 M',
      capaianDisplay: '84,4% Serapan Anggaran',
      targetLabel: 'Target Perkin',
      targetDisplay: 'Rp 808,7 M',
      targetSub: 'Pagu Alokasi 3 Direktorat',
      areaTertinggiLabel: 'Area Tertinggi',
      areaTertinggiDisplay: 'Jalan & Jembatan (30,80)',
      areaTertinggiSub: 'Bobot 30%',
      tableData: SINERGI_8_PROGRAM,
      tableHeaderLabel: 'Program Sinergi 3 Direktorat',
      trendData: SINERGI_TREND_ANNUAL,
      trendTitle: 'Tren Serapan Sinergi (2021 - 2026)',
      barTitle: 'Capaian Nilai vs Bobot 8 Program',
      lineDomain: [65, 95] as [number, number],
      barDomain: [0, 35] as [number, number],
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
            Model Tampilan Tabel Detail &amp; Analisis Kinerja DEP-A7
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
                    Radar Capaian 4 IKP DEP-A7
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Realisasi Aktual vs Target Penetapan Perkin A7 2025
                  </p>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="h-44 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={RADAR_4_IKP_A7} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
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
              </div>
            </div>

            {/* Status Info Box */}
            <div className="pt-2 border-t border-slate-200/70 text-[10.5px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-slate-500">Rerata Capaian IKP:</span>
                <span className="text-emerald-700 font-bold font-mono">98,46%</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Status Konstruksi &amp; PNBP:</span>
                <span className="font-bold text-blue-700">On Schedule &amp; Surplus</span>
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
              onClick={() => setActiveTab('fisik')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'fisik'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>1. Penyelenggaraan Fisik</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pnbp')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'pnbp'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>2. Realisasi PNBP ROW</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('jalan')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-xs rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'jalan'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>3. Kemantapan Jalan</span>
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
              <Layers className="w-3.5 h-3.5" />
              <span>4. Sinergi 3 Unit Infras</span>
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
              {/* Header Visualisasi Tren & Komparasi */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">
                  Visualisasi Tren &amp; Komparasi
                </span>
              </div>

              {/* CHART 1 (ATAS): TREN LINE CHART (2021 - 2026) */}
              <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <span className="text-[10.5px] font-bold text-slate-800 block mb-1">
                  {currentTabConfig.trendTitle}
                </span>
                <div className="h-28 w-full">
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
                </div>
              </div>

              {/* CHART 2 (BAWAH): PAIRED BAR CHART (CAPAIAN NILAI VS BOBOT 8 AREA) */}
              <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10.5px] font-bold text-slate-800 block">
                    {currentTabConfig.barTitle}
                  </span>
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
                </div>
                <div className="h-28 w-full">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
