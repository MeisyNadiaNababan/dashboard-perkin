import React, { useState } from 'react';
import {
  TrendingUp,
  HardHat,
  Route,
  Coins,
  ShieldAlert,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  BarChart3,
  PieChart as PieIcon,
  Filter,
  Maximize2,
  Trees,
  Droplets,
  Mountain,
  Compass,
  Ship,
  DollarSign,
  ArrowUpRight,
  Database,
  FileText,
  Info,
  ChevronDown,
  ChevronUp,
  Tag,
  BookOpen,
  ShieldCheck,
  Flame,
  Users,
  Search,
  Activity,
  AlertCircle,
  Table,
  BarChart2,
  Award,
  Download,
  FileCode2,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
} from 'recharts';
import {
  KURVA_S_INFRASTRUKTUR_BULANAN,
  KURVA_S_METADATA_ATRIBUT,
  SEKTOR_INFRASTRUKTUR_ALOKASI,
  PNBP_INFRASTRUKTUR_DETAIL,
  PNBP_ROW_METADATA,
  PERKIN_A7_KPIS,
  PERKIN_A7_METADATA,
} from './perkinA7Data';
import {
  DATASET_4_PROGRES_KONSTRUKSI,
  DATASET_6_PEMBANGUNAN_INFRASTRUKTUR,
} from '../PembangunanInfrastruktur/infrastrukturData';
import { InfrastrukturProgresKonstruksiVisualizer } from './InfrastrukturProgresKonstruksiVisualizer';
import {
  TREND_BULANAN_OPERASI_DITPAM,
  PENERTIBAN_BY_JENIS_KEGIATAN,
  BANGUNAN_LIAR_SUMMARY,
  BANGUNAN_LIAR_SAMPLES,
  UNJUK_RASA_DATA,
  TOTAL_PERSONIL_DITPAM,
  TOTAL_LUAS_PENINDAKAN_HA,
} from '../PengamananAset/pengamananAsetData';

interface InfrastrukturPerkinA7VisualChartsProps {
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7VisualCharts: React.FC<InfrastrukturPerkinA7VisualChartsProps> = ({
  onOpenFormulaModal,
  onNavigateToUnit,
}) => {
  // Pilihan tab utama:
  // 1. 'evaluasi-ikp' (Capaian Evaluasi 2 Indikator Kinerja Program Perkin A.7 - Model DEP-A5)
  // 2. 'progres-konstruksi' (Laporan Progres Pekerjaan Kontruksi & Pembangunan Infras Data No. 4 & 6)
  // 3. 'anggaran-kepala-bp' (Ringkasan Keuangan 5 Realisasi Belanja Gaya Kepala BP Batam)
  // 4. 'pengamanan-aset' (Visualisasi Inti Pengamanan Aset & Kawasan - Ditpam)
  // 5. 'pnbp-row' (PNBP ROW Utilitas & Penghijauan)
  const [activeVisualTab, setActiveVisualTab] = useState<
    'evaluasi-ikp' | 'progres-konstruksi' | 'anggaran-kepala-bp' | 'pengamanan-aset' | 'pnbp-row'
  >('evaluasi-ikp');

  // Sub-tab untuk Evaluasi 2 IKP (Identik model DEP-A5):
  // 'ikp_1' = IKP-1 Penyelenggaraan Infrastruktur (100% vs 92,40%)
  // 'ikp_2' = IKP-2 Nilai Realisasi PNBP (Target: 6,821 M | Realisasi: 7,450 M)
  const [activeIkpSubTab, setActiveIkpSubTab] = useState<'ikp_1' | 'ikp_2'>('ikp_1');

  // Data Donut PNBP IKP-2 (Konsolidasi 2 Komponen Resmi Sesuai Hal. 48 & 4 Satu Data)
  const pnbpDonutDataA7 = [
    {
      name: 'ROW Utilitas',
      fullName: 'Pemanfaatan ROW Utilitas (Kabel FO, Pipa Air & Gas, Listrik)',
      value: 5.25,
      target: 4.775,
      percentage: 70.47,
      color: '#0284c7', // Sky-600
      skTerbit: 142,
      slaHari: '4,2 Hari',
      volume: '142.500 Meter',
    },
    {
      name: 'ROW Penghijauan & Lahan',
      fullName: 'Pemanfaatan ROW Penghijauan & Pematangan Lahan (BSW)',
      value: 2.20,
      target: 2.046,
      percentage: 29.53,
      color: '#10b981', // Emerald-500
      skTerbit: 88,
      slaHari: '3,8 Hari',
      volume: '34,2 Ha & 5 Kawasan',
    },
  ];

  const totalTargetPnbpA7 = 6.821;
  const totalRealisasiPnbpA7 = 7.450;
  const totalCapaianPnbpA7 = ((totalRealisasiPnbpA7 / totalTargetPnbpA7) * 100).toFixed(2);
  const totalSurplusPnbpA7 = (totalRealisasiPnbpA7 - totalTargetPnbpA7).toFixed(3);

  const getSektorIcon = (icon: string) => {
    switch (icon) {
      case 'Route':
        return <Route className="w-4 h-4 text-blue-600" />;
      case 'Mountain':
        return <Mountain className="w-4 h-4 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'Ship':
        return <Ship className="w-4 h-4 text-indigo-600" />;
      default:
        return <Compass className="w-4 h-4 text-emerald-600" />;
    }
  };

  const handleExportCsv = () => {
    let csv = 'CAPAIAN EVALUASI PERKIN A.7 TAHUN 2025 (INFRASTRUKTUR BP BATAM)\n';
    if (activeVisualTab === 'evaluasi-ikp') {
      if (activeIkpSubTab === 'ikp_1') {
        csv += 'IKP-1: PERSENTASE PENYELENGGARAAN INFRASTRUKTUR YANG MENDUKUNG INVESTASI DI KPBPB BATAM\n';
        csv += 'Target Perkin,100%\nRealisasi YTD,92.40%\nCapaian,92.40%\nStatus,Tercapai Sesuai Rencana\n\n';
        csv += 'No,Unit Kerja Pengampu,Bobot,Target (%),Realisasi (%),Capaian (%),Mutu Status,Keterangan\n';
        csv += '1,"Direktorat Pembangunan Infrastruktur",33.3%,100%,92.4%,92.4%,"Mutu A (Sesuai Rencana)","14 Paket Konstruksi Strategis (Flyover Sei Ladi, Sudirman, Terminal Peti Kemas Batu Ampar)"\n';
        csv += '2,"Direktorat Perencanaan Infrastruktur",33.3%,100%,95.2%,95.2%,"Mutu A (Melampaui Rencana)","43 Paket DED 6 Sektor (Gedung, Darat, Drainase, Laut/Udara)"\n';
        csv += '3,"Direktorat Pengamanan Aset dan Kawasan",33.3%,100%,89.6%,89.6%,"Mutu A (Terkendali Baik)","1.030 Penertiban Bangunan Liar ROW, 142 Ha Hutan Lindung, 524 Personel Ditpam"\n';
      } else {
        csv += 'IKP-2: NILAI REALISASI PNBP SEKTOR INFRASTRUKTUR BP BATAM\n';
        csv += 'Target Perkin,6.821 M\nRealisasi YTD,7.450 M\nCapaian,109.22%\nStatus,Melampaui Target (Surplus +0.629 M)\n\n';
        csv += 'No,Komponen Layanan PNBP,Target (Rp M),Realisasi (Rp M),Capaian (%),Kontribusi (%),Surplus (Rp M),Volume / Izin Terbit\n';
        pnbpDonutDataA7.forEach((p, idx) => {
          csv += `${idx + 1},"${p.fullName}",${p.target},${p.value},${((p.value / p.target) * 100).toFixed(1)}%,${p.percentage}%,+${(p.value - p.target).toFixed(3)},"${p.volume} (${p.skTerbit} SK)"\n`;
        });
        csv += `TOTAL KONSOLIDASI,${totalTargetPnbpA7},${totalRealisasiPnbpA7},${totalCapaianPnbpA7}%,100%,+${totalSurplusPnbpA7},"230 SK Terbit"\n`;
      }
    } else if (activeVisualTab === 'anggaran-kepala-bp') {
      csv += 'RINGKASAN KEUANGAN 5 SEKTOR BELANJA INFRASTRUKTUR\n';
      csv += 'Kategori Sektor,Paket,Pagu (Rp M),Realisasi (Rp M),Serapan (%),Sisa Pagu (Rp M)\n';
      SEKTOR_INFRASTRUKTUR_ALOKASI.forEach((s) => {
        csv += `"${s.kategori}",${s.totalPaket},${s.paguMiliar},${s.realisasiMiliar},${s.persen}%,${(s.paguMiliar - s.realisasiMiliar).toFixed(1)}\n`;
      });
    } else if (activeVisualTab === 'pnbp-row') {
      csv += 'RINCIAN DATASET NO. 1 & 2 ROW INFRASTRUKTUR\n';
      csv += 'Sumber Komponen,Kode Dataset,Target (Rp),Realisasi (Rp),Capaian (%),Volume,Izin Terbit\n';
      PNBP_INFRASTRUKTUR_DETAIL.komponen.forEach((k) => {
        csv += `"${k.sumber}",${k.kodeDataset},${k.targetRupiah},${k.realisasiRupiah},${k.persen}%,${k.volume},${k.skTerbit}\n`;
      });
    } else {
      csv += 'LAPORAN PROGRES KONSTRUKSI STRATEGIS\n';
      csv += 'Bulan,Target Fisik (%),Realisasi Fisik (%),Realisasi Keuangan (%)\n';
      KURVA_S_INFRASTRUKTUR_BULANAN.forEach((k) => {
        csv += `${k.bulan},${k.targetFisik},${k.realisasiFisik ?? '-'},${k.keuangan}\n`;
      });
    }

    const encoded = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `evaluasi_infrastruktur_perkin_a7_${activeVisualTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden font-sans space-y-0">
      {/* ============================================================== */}
      {/* 1. TOP METRICS HEADER BAR (IDENTIK GAYA CAPAIAN EVALUASI DEP-A5) */}
      {/* ============================================================== */}
      <div className="p-4 bg-white border-b border-slate-200 text-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                  EVALUASI PROGRAM TERPADU
                </span>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                  DEP-A7 BP Batam &bull; Perkin TA 2025
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                Capaian Evaluasi 2 Indikator Kinerja Program (IKP)
              </h2>
            </div>
          </div>

          {/* Action Tabs & Toggle - Menampilkan Evaluasi 2 IKP + 4 Sheet Operasional */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveVisualTab('evaluasi-ikp')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVisualTab === 'evaluasi-ikp'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Evaluasi 2 IKP</span>
              </button>

              <button
                onClick={() => setActiveVisualTab('progres-konstruksi')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVisualTab === 'progres-konstruksi'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HardHat className="w-3.5 h-3.5 text-amber-600" />
                <span>Progres Konstruksi (Data 4 &amp; 6)</span>
              </button>

              <button
                onClick={() => setActiveVisualTab('anggaran-kepala-bp')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVisualTab === 'anggaran-kepala-bp'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ringkasan Keuangan 5 Belanja</span>
              </button>

              <button
                onClick={() => setActiveVisualTab('pengamanan-aset')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVisualTab === 'pengamanan-aset'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Pengamanan Aset &amp; Kawasan</span>
              </button>

              <button
                onClick={() => setActiveVisualTab('pnbp-row')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVisualTab === 'pnbp-row'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-cyan-600" />
                <span>PNBP ROW Utilitas</span>
              </button>
            </div>

            <button
              onClick={handleExportCsv}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
              title="Unduh Data CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. BODY CONTENT BERDASARKAN TAB AKTIF                          */}
      {/* ============================================================== */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* ==================================================================== */}
        {/* TAB 1: EVALUASI 2 IKP DEP-A7 (MENDETAILKAN 2 IKP PERSIS DEP-A5)      */}
        {/* ==================================================================== */}
        {activeVisualTab === 'evaluasi-ikp' && (
          <div className="space-y-4">
            {/* Sub-tab Switcher: IKP-1 vs IKP-2 (Gaya DEP-A5) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-200">
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => setActiveIkpSubTab('ikp_1')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeIkpSubTab === 'ikp_1'
                      ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5 text-blue-600" />
                  <span>IKP-1: Penyelenggaraan Infrastruktur (100% vs 92,40%)</span>
                </button>

                <button
                  onClick={() => setActiveIkpSubTab('ikp_2')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeIkpSubTab === 'ikp_2'
                      ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>IKP-2: Nilai Realisasi PNBP (6,821 M vs 7,450 M)</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Sesuai Dokumen Resmi: <strong>7. PERKIN A.7 Tahun 2025.pdf</strong>
              </div>
            </div>

            {/* ================================================================ */}
            {/* SUB-TAB IKP-1: PENYELENGGARAAN INFRASTRUKTUR (KONSOLIDASI 3 DIT) */}
            {/* ================================================================ */}
            {activeIkpSubTab === 'ikp_1' && (
              <div className="space-y-4">
                {/* Header Callout IKP-1 */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/70 via-white to-sky-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                          IKP-1 PERKIN A.7 &bull; EVALUASI FISIK TERPADU
                        </span>
                        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                          Perkin No. {PERKIN_A7_METADATA.nomorPerkin} (Hal. 1-3)
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        Persentase Penyelenggaraan Infrastruktur yang Mendukung Investasi di KPBPB Batam
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[9.5px] uppercase font-bold text-slate-500 block font-mono">
                        Target: 100% | Realisasi YTD
                      </span>
                      <div className="flex items-baseline justify-end gap-1.5">
                        <span className="text-2xl font-black font-mono text-emerald-800">
                          92,40%
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          Tercapai Sesuai Rencana
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenFormulaModal('ikp-1-pembangunan-infrastruktur')}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Manual Rumus IKP-1"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-600" />
                      <span>Manual Rumus</span>
                    </button>
                  </div>
                </div>

                {/* 3 KARTU RINCIAN CAPAIAN 3 DIREKTORAT PENGAMPU (PERSIS MODEL 3 KARTU DEP-A5) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* KARTU 1: DIREKTORAT PEMBANGUNAN INFRASTRUKTUR */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded text-[10px] border border-sky-200 flex items-center gap-1">
                        <HardHat className="w-3 h-3 text-sky-700" />
                        <span>IKP-1 &bull; DIT. PEMBANGUNAN</span>
                      </span>
                      <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                        92,40% Sesuai Rencana
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        Penyelenggaraan Fisik &amp; Konstruksi Proyek
                      </h4>
                      <span className="text-[10.5px] text-slate-500 font-mono block mt-0.5">
                        Unit: Dit. Pembangunan Infrastruktur (Hal. 48-51)
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                            92,40%
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-mono">Capaian</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-600">
                          Target: <strong className="text-slate-800">100,00%</strong> (-7,60%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          style={{ width: '92.4%' }}
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Tabel Rincian Klaster Proyek Dit. Pembangunan */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">Rincian Komponen Kegiatan:</span>
                        <span className="text-slate-400 font-mono text-[10px]">14 Paket Strategis</span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[9px] border-b border-slate-200 font-mono">
                            <tr>
                              <th className="py-1.5 px-2">Komponen Evaluasi</th>
                              <th className="py-1.5 px-1 text-center w-12">Bobot</th>
                              <th className="py-1.5 px-1.5 text-right w-14">Skor</th>
                              <th className="py-1.5 px-1.5 text-center w-16">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="14 Paket Konstruksi Jalan, Flyover & Dermaga">
                                14 Paket Konstruksi Strategis
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">40%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">94.8%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Ahead</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Serapan Anggaran Belanja Modal Fisik">
                                Realisasi Belanja Modal (Rp 602,88 M)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">25%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">81.2%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Tinggi</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Manajemen Kurva S (Ahead / On Schedule)">
                                Paket On-Schedule / Selesai (12 Paket)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">15%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">85.7%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">Baik</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Pematangan Tanah Kawasan BSW 280 Ha">
                                Pematangan BSW (280 Ha Cut &amp; Fill)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">10%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">100.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Tuntas</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Pengendalian Proyek Kritis & SCM">
                                Penanganan SCM Proyek Kritis
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">10%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">80.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">Mitigasi</span>
                              </td>
                            </tr>
                            <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-200">
                              <td className="py-1.5 px-2 font-mono text-[10px] uppercase font-bold text-slate-950">
                                Total Capaian Dit. Pembangunan
                              </td>
                              <td className="py-1.5 px-1 text-center font-mono text-[10px] text-slate-600 font-bold">100%</td>
                              <td className="py-1.5 px-1.5 text-right font-mono font-black text-emerald-800 text-xs">
                                92,40%
                              </td>
                              <td className="py-1.5 px-1.5 text-center font-mono">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white">
                                  Mutu A
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveVisualTab('progres-konstruksi')}
                      className="w-full py-2 px-3 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100 text-sky-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Lihat Detail Progres Konstruksi & Kurva S"
                    >
                      <HardHat className="w-3.5 h-3.5 text-sky-600" />
                      <span>Lihat Detail Kurva S &amp; Progres Proyek</span>
                    </button>
                  </div>

                  {/* KARTU 2: DIREKTORAT PERENCANAAN INFRASTRUKTUR */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded text-[10px] border border-blue-200 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-blue-700" />
                        <span>IKP-1 &bull; DIT. PERENCANAAN</span>
                      </span>
                      <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                        95,20% Melampaui Rencana
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        Penyusunan Perencanaan &amp; DED 6 Sektor
                      </h4>
                      <span className="text-[10.5px] text-slate-500 font-mono block mt-0.5">
                        Unit: Dit. Perencanaan Infrastruktur (Hal. 53)
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                            95,20%
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-mono">Capaian</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-600">
                          Target: <strong className="text-slate-800">100,00%</strong> (-4,80%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          style={{ width: '95.2%' }}
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Tabel Rincian 6 Sektor DED Dit. Perencanaan */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">Rincian Paket DED Perencanaan:</span>
                        <span className="text-slate-400 font-mono text-[10px]">43 Dokumen DED</span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[9px] border-b border-slate-200 font-mono">
                            <tr>
                              <th className="py-1.5 px-2">Sektor Perencanaan</th>
                              <th className="py-1.5 px-1 text-center w-12">Bobot</th>
                              <th className="py-1.5 px-1.5 text-right w-14">Skor</th>
                              <th className="py-1.5 px-1.5 text-center w-16">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="DED Gedung Pemerintah & Fasilitas Komersial">
                                DED Gedung &amp; Utilitas (14 Paket)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">30%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">100.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">100%</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="DED Jalan Tol, Arteri & Jembatan Strategis">
                                DED Darat &amp; Jembatan (12 Paket)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">25%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">95.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Selesai</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="DED Drainase Utama & Kolam Retensi Banjir">
                                DED Drainase &amp; Tata Air (8 Paket)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">20%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">92.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">Selesai</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="DED Pelabuhan, Bandara & Wisata Kawasan">
                                DED Laut, Udara &amp; Wisata (9 Paket)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">15%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">94.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Selesai</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Realisasi Belanja DED (Pagu Rp 53,68 M / Realisasi Rp 53,55 M)">
                                Realisasi Keuangan DED (84,1%)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">10%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">99.8%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Optimal</span>
                              </td>
                            </tr>
                            <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-200">
                              <td className="py-1.5 px-2 font-mono text-[10px] uppercase font-bold text-slate-950">
                                Total Capaian Dit. Perencanaan
                              </td>
                              <td className="py-1.5 px-1 text-center font-mono text-[10px] text-slate-600 font-bold">100%</td>
                              <td className="py-1.5 px-1.5 text-right font-mono font-black text-emerald-800 text-xs">
                                95,20%
                              </td>
                              <td className="py-1.5 px-1.5 text-center font-mono">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white">
                                  Mutu A
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateToUnit && onNavigateToUnit('dit-perencanaan-infrastruktur')}
                      className="w-full py-2 px-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Lihat Detail Satker Dit. Perencanaan"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      <span>Lihat Detail Satker Dit. Perencanaan</span>
                    </button>
                  </div>

                  {/* KARTU 3: DIREKTORAT PENGAMANAN ASET DAN KAWASAN */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded text-[10px] border border-indigo-200 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-indigo-700" />
                        <span>IKP-1 &bull; DIT. PENGAMANAN ASET</span>
                      </span>
                      <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                        89,60% Terkendali Baik
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        Pengamanan Aset, ROW Lahan &amp; Kawasan
                      </h4>
                      <span className="text-[10.5px] text-slate-500 font-mono block mt-0.5">
                        Unit: Dit. Pengamanan Aset dan Kawasan (Hal. 17-19)
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
                            89,60%
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-mono">Capaian</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-600">
                          Target: <strong className="text-slate-800">100,00%</strong> (-10,40%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          style={{ width: '89.6%' }}
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Tabel Rincian Pengamanan Ditpam */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">Rincian Operasi Pengamanan:</span>
                        <span className="text-slate-400 font-mono text-[10px]">1.030 Penertiban</span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-slate-100/90 text-slate-700 font-bold uppercase text-[9px] border-b border-slate-200 font-mono">
                            <tr>
                              <th className="py-1.5 px-2">Fokus Pengamanan</th>
                              <th className="py-1.5 px-1 text-center w-12">Bobot</th>
                              <th className="py-1.5 px-1.5 text-right w-14">Skor</th>
                              <th className="py-1.5 px-1.5 text-center w-16">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Penertiban Bangunan Liar Koridor ROW Jalan">
                                Penertiban Bangunan Liar (1.030 Unit)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">35%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">92.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Tuntas</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Pengamanan Hutan Lindung & Catchment Area Waduk">
                                Pengamanan Catchment Area (142 Ha)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">25%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">88.5%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">Terjaga</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Kesiapan Personel Ditpam di Pos Jaga Obvitnas">
                                Penyiagaan Personel (524 Anggota)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">15%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">95.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Siaga</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Kecepatan Response Penanganan Insiden & Unras">
                                Response Time Tindakan (12,4 Menit)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">15%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">90.0%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">Cepat</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-1 px-2 truncate max-w-[130px]" title="Realisasi Anggaran Operasi Penertiban (Rp 26,0 M / 72.2%)">
                                Realisasi Belanja Ops (Rp 26,0 M)
                              </td>
                              <td className="py-1 px-1 text-center font-mono text-[10px] text-slate-500">10%</td>
                              <td className="py-1 px-1.5 text-right font-mono font-bold text-slate-900">72.2%</td>
                              <td className="py-1 px-1.5 text-center font-mono">
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-slate-200 text-slate-800">Hemat</span>
                              </td>
                            </tr>
                            <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-200">
                              <td className="py-1.5 px-2 font-mono text-[10px] uppercase font-bold text-slate-950">
                                Total Capaian Dit. Ditpam
                              </td>
                              <td className="py-1.5 px-1 text-center font-mono text-[10px] text-slate-600 font-bold">100%</td>
                              <td className="py-1.5 px-1.5 text-right font-mono font-black text-emerald-800 text-xs">
                                89,60%
                              </td>
                              <td className="py-1.5 px-1.5 text-center font-mono">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-600 text-white">
                                  Mutu A
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveVisualTab('pengamanan-aset')}
                      className="w-full py-2 px-3 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Lihat Detail Visual Pengamanan Ditpam"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Lihat Detail Operasi Ditpam</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================ */}
            {/* SUB-TAB IKP-2: NILAI REALISASI PNBP SEKTOR INFRASTRUKTUR         */}
            {/* KIRI: DONUT KONTRIBUSI | KANAN: TABEL DETAIL GAYA KEPALA BP      */}
            {/* ================================================================ */}
            {activeIkpSubTab === 'ikp_2' && (
              <div className="space-y-4">
                {/* Header Callout IKP-2 (Angka Realisasi 7,450 M, BUKAN PERSEN) */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-white to-teal-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase">
                          IKP-2 PERKIN A.7 &bull; NILAI REALISASI PNBP
                        </span>
                        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                          Subdit ROW Utilitas &amp; Penataan Reklame (Buku Satu Data Hal. 48-49 &amp; Hal. 4)
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        Nilai realisasi PNBP dari Pemanfaatan ROW Utilitas, Reklame &amp; Penghijauan
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">
                        Target Perkin: 6,821 M | Realisasi YTD
                      </span>
                      <div className="flex items-baseline justify-end gap-1.5">
                        <span className="text-2xl font-black font-mono text-emerald-800">
                          7,450 M
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          {totalCapaianPnbpA7}% (Surplus +0,629 M)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenFormulaModal('ikp-2-pnbp-infrastruktur')}
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Manual Rumus IKP-2"
                    >
                      <Info className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Manual Rumus</span>
                    </button>
                  </div>
                </div>

                {/* Grid Side-by-Side: Donut Kontribusi (Kiri 5 Kolom) & Tabel Realisasi (Kanan 7 Kolom) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* SISI KIRI (5 KOLOM): KONTRIBUSI PNBP PER KOMPONEN */}
                  <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <PieIcon className="w-4 h-4 text-emerald-600" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                            Kontribusi Komponen PNBP Infrastruktur
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          2 Komponen
                        </span>
                      </div>

                      {/* Donut Chart Recharts */}
                      <div className="h-56 relative flex items-center justify-center mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pnbpDonutDataA7}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={80}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {pnbpDonutDataA7.map((entry, index) => (
                                <Cell key={`cell-a7-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(val: any, name: any, item: any) => [
                                `${val} Miliar (${item.payload.percentage.toFixed(1)}%)`,
                                item.payload.fullName,
                              ]}
                              contentStyle={{
                                backgroundColor: '#0F1E36',
                                border: '1px solid #1E293B',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '11px',
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>

                        {/* Donut Center Display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[9.5px] text-slate-500 font-bold uppercase font-mono">
                            TOTAL REALISASI
                          </span>
                          <span className="text-xl font-black font-mono text-slate-900 leading-tight">
                            7,450 M
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 font-mono">
                            {totalCapaianPnbpA7}% (Surplus)
                          </span>
                        </div>
                      </div>

                      {/* Legend breakdown list */}
                      <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200">
                        {pnbpDonutDataA7.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-slate-700 font-medium truncate max-w-[170px]" title={item.fullName}>
                                {item.fullName}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 shrink-0">
                              {item.value.toFixed(3)} M ({item.percentage.toFixed(1)}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[10.5px] text-slate-500 font-sans">
                      Target Perkin DIPA TA 2025: <strong>6,821 M</strong> | Surplus Penerimaan: <strong className="text-emerald-700">+{totalSurplusPnbpA7} M</strong> (+Rp 629 Juta).
                    </div>
                  </div>

                  {/* SISI KANAN (7 KOLOM): TABEL DETAIL PENERIMAAN PNBP */}
                  <div className="lg:col-span-7 p-4 rounded-xl border border-slate-200 bg-white space-y-3 flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <Table className="w-4 h-4 text-slate-700" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                            Rincian Realisasi &amp; Kontribusi PNBP Sektor Infrastruktur
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                          Buku Satu Data Hal. 48-49
                        </span>
                      </div>

                      {/* Tabel Rincian Realisasi PNBP Gaya Kepala BP Batam */}
                      <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[9.5px] border-b border-slate-200 font-mono">
                            <tr>
                              <th className="py-2 px-2.5 w-8 text-center">No</th>
                              <th className="py-2 px-2.5">Komponen Layanan ROW</th>
                              <th className="py-2 px-2 text-right">Target (M)</th>
                              <th className="py-2 px-2 text-right">Realisasi (M)</th>
                              <th className="py-2 px-2 text-right">Capaian</th>
                              <th className="py-2 px-2 text-right">Surplus (M)</th>
                              <th className="py-2 px-2 text-center">Izin / SLA</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
                            {pnbpDonutDataA7.map((item, idx) => {
                              const itemCapaian = ((item.value / item.target) * 100).toFixed(1);
                              const itemSurplus = (item.value - item.target).toFixed(3);

                              return (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="py-2 px-2.5 text-center font-bold text-slate-500">{idx + 1}</td>
                                  <td className="py-2 px-2.5 font-sans font-semibold text-slate-900">
                                    <div>{item.name}</div>
                                    <div className="text-[10px] text-slate-500 font-mono font-normal">
                                      Vol: {item.volume}
                                    </div>
                                  </td>
                                  <td className="py-2 px-2 text-right text-slate-600">{item.target.toFixed(3)}</td>
                                  <td className="py-2 px-2 text-right font-bold text-emerald-800">{item.value.toFixed(3)}</td>
                                  <td className="py-2 px-2 text-right">
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                                      {itemCapaian}%
                                    </span>
                                  </td>
                                  <td className="py-2 px-2 text-right font-bold text-emerald-700">+{itemSurplus}</td>
                                  <td className="py-2 px-2 text-center font-sans text-[10px]">
                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">{item.skTerbit} SK</span>
                                    <span className="text-slate-400 block text-[9px] mt-0.5">SLA: {item.slaHari}</span>
                                  </td>
                                </tr>
                              );
                            })}

                            {/* Total Row */}
                            <tr className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-300">
                              <td colSpan={2} className="py-2 px-2.5 font-sans uppercase text-[11px] font-black text-slate-950">
                                Total Konsolidasi IKP-2
                              </td>
                              <td className="py-2 px-2 text-right font-black text-slate-900">{totalTargetPnbpA7.toFixed(3)} M</td>
                              <td className="py-2 px-2 text-right font-black text-emerald-800">{totalRealisasiPnbpA7.toFixed(3)} M</td>
                              <td className="py-2 px-2 text-right">
                                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black text-[10.5px]">
                                  {totalCapaianPnbpA7}%
                                </span>
                              </td>
                              <td className="py-2 px-2 text-right font-black text-emerald-800">+{totalSurplusPnbpA7} M</td>
                              <td className="py-2 px-2 text-center font-sans text-[10px]">
                                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">230 SK Terbit</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="text-slate-600 text-[11px] font-sans">
                        <strong>Catatan Kinerja:</strong> Surplus penerimaan PNBP (+Rp 629 Juta) didorong oleh tingginya penetrasi galian jaringan kabel serat optik bawah tanah (FTTH &amp; Backbone Kabil-Batu Ampar) dan retribusi reklame ROW koridor Batam Center.
                      </div>
                      <button
                        onClick={() => setActiveVisualTab('pnbp-row')}
                        className="font-bold text-blue-700 hover:underline shrink-0 text-left sm:text-right cursor-pointer whitespace-nowrap"
                      >
                        Detail ROW Utilitas &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* SHEET 1: LAPORAN PROGRES PEKERJAAN KONTRUKSI TAHUN BERJALAN    */}
        {/* DATA NO. 4 & DATA NO. 6 DIT. PEMBANGUNAN INFRASTRUKTUR         */}
        {/* ============================================================== */}
        {activeVisualTab === 'progres-konstruksi' && (
          <InfrastrukturProgresKonstruksiVisualizer
            onOpenFormulaModal={onOpenFormulaModal}
            onNavigateToUnit={onNavigateToUnit}
          />
        )}

        {/* ============================================================== */}
        {/* SHEET 2: RINGKASAN KEUANGAN 5 BELANJA (GAYA KEPALA BP BATAM)   */}
        {/* ============================================================== */}
        {activeVisualTab === 'anggaran-kepala-bp' && (
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3.5 font-sans">
            {/* Header bergaya Ringkasan Keuangan Dashboard Kepala BP Batam */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 font-mono">
                    RINGKASAN KEUANGAN
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                    KONSOLIDASI DEP-A7
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Alokasi Pagu &amp; Serapan Belanja Modal Terintegrasi (Buku Satu Data Hal. 4-5 &amp; Hal. 48-53)
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                  REALISASI YTD
                </span>
                <span className="text-sm sm:text-base font-black font-mono text-emerald-700">
                  Rp 682,43 M <span className="text-xs text-emerald-600 font-bold">(81,00%)</span>
                </span>
              </div>
            </div>

            {/* Strip Dua Kotak: TOTAL PAGU vs BELANJA (Persis Gaya Kepala BP Batam) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">TOTAL PAGU PROGRAM (5 SEKTOR)</span>
                  <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    DIPA BP BATAM
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Rp 842,50 M
                </div>
                <div className="text-[10.5px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>14 Paket Konstruksi + 43 Paket DED</span>
                  <span className="font-bold text-slate-700">Sisa: Rp 160,07 M</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">REALISASI BELANJA</span>
                  <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    81,00% SERAPAN
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">
                  Rp 682,43 M
                </div>
                <div className="text-[10.5px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>On-Track Capaian Tahunan</span>
                  <span className="font-bold text-emerald-700">Target Akhir: 85,0%</span>
                </div>
              </div>
            </div>

            {/* 5 REALISASI BELANJA INFRASTRUKTUR (VISUALISASI LANGSUNG PENUH GAYA KEPALA BP BATAM) */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 font-sans">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 font-mono block">
                  5 REALISASI BELANJA INFRASTRUKTUR (KONSOLIDASI PROGRAM)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Data Statistik Terverifikasi Buku Satu Data
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 font-mono">
                {SEKTOR_INFRASTRUKTUR_ALOKASI.map((sektor) => (
                  <div
                    key={sektor.kategori}
                    className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 transition-all space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                          {getSektorIcon(sektor.icon)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">{sektor.kategori}</div>
                          <div className="text-[10.5px] text-slate-500 flex items-center gap-1.5 font-sans">
                            <span>{sektor.totalPaket} Paket Terintegrasi</span>
                            <span>&bull;</span>
                            <span className="text-slate-400 truncate max-w-xs">{sektor.keterangan}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="font-black text-slate-900 text-xs sm:text-sm">
                          {sektor.persen}% <span className="text-emerald-700 font-bold">(Rp {sektor.realisasiMiliar} M)</span>
                        </div>
                        <div className="text-[10.5px] text-slate-500 font-normal">
                          Pagu: Rp {sektor.paguMiliar} M | <span className="text-slate-400">Sisa: Rp {(sektor.paguMiliar - sektor.realisasiMiliar).toFixed(1)} M</span>
                        </div>
                      </div>
                    </div>

                    {/* Multi-stop Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 rounded-full transition-all"
                        style={{ width: `${sektor.persen}%` }}
                      />
                    </div>

                    {/* Embedded Attribute & Dataset Citations directly in the card */}
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] pt-0.5 text-slate-500 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-sans">Sumber:</span>
                        <span className="font-semibold text-slate-700 truncate max-w-[280px] sm:max-w-md">
                          {sektor.unitPengampu} ({sektor.dataNoSatuData.split('|')[0].trim()})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[9.5px]">
                        <span className="text-slate-400 font-sans">Atribut:</span>
                        <span className="bg-white px-1.5 py-0.2 rounded border border-slate-200 text-slate-700 font-mono">
                          {sektor.atributTerpakai.slice(0, 4).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Status Bergaya Kepala BP Batam */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Status: Serapan belanja modal infrastruktur on-track (81,0% dari target akhir tahun 85,0%).</span>
              </div>
              <button
                onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pembangunan-infrastruktur')}
                className="font-bold text-blue-700 hover:underline shrink-0 text-left sm:text-right cursor-pointer"
              >
                Lihat Rincian Sektor &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SHEET 3: PENGAMANAN ASET & KAWASAN (DITPAM BP BATAM)           */}
        {/* ============================================================== */}
        {activeVisualTab === 'pengamanan-aset' && (
          <div className="space-y-4 font-sans">
            {/* Header Metadata Attribution Box for Ditpam */}
            <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white">
                    DIREKTORAT PENGAMANAN ASET DAN KAWASAN (DITPAM)
                  </span>
                  <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    DATA NO. 1, 6, 7 &amp; 9 (Buku Satu Data Hal. 17-19)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Kinerja Operasi Pengamanan Aset Vital, Penertiban Bangunan Liar, Pengamanan Unjuk Rasa, dan Penanggulangan Bencana Alam di Batam.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-cyan-300">
                  {TOTAL_PERSONIL_DITPAM} Personil Ditpam Aktif
                </span>
              </div>
            </div>

            {/* Quick Ditpam Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">PENERTIBAN BANGUNAN</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 mt-0.5 block">{BANGUNAN_LIAR_SUMMARY.totalBangunanDitertibkan} Unit</span>
                <span className="text-[10.5px] text-slate-500 font-mono">Buku Satu Data Hal. 17 Data No. 1</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">LUAS PENINDAKAN LAHAN</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 mt-0.5 block">{TOTAL_LUAS_PENINDAKAN_HA} Ha</span>
                <span className="text-[10.5px] text-slate-500 font-mono">Koridor ROW &amp; Aset BP Batam</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">UNJUK RASA DIAMANKAN</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 mt-0.5 block">{UNJUK_RASA_DATA.length} Aksi</span>
                <span className="text-[10.5px] text-emerald-700 font-bold font-mono">100% Berjalan Kondusif</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">STATUS RESPONSE TIME</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700 mt-0.5 block">12,4 Menit</span>
                <span className="text-[10.5px] text-slate-500 font-mono">SLA Standar: &lt; 15 Menit</span>
              </div>
            </div>

            {/* Visualisasi Tren Operasi Ditpam & Sebaran Kegiatan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {/* Grafik Tren Bulanan Operasi */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">Tren Operasi Pengamanan Bulanan</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Data No. 1 Hal. 17</span>
                </div>

                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={TREND_BULANAN_OPERASI_DITPAM}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F1E36',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '11px',
                        }}
                      />
                      <Bar dataKey="operasiPenertiban" name="Operasi Penertiban" fill="#2563EB" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="patroliRutin" name="Patroli Obvitnas" fill="#0D9488" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sebaran Penertiban by Jenis Kegiatan */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <PieIcon className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">Distribusi Jenis Penindakan</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Data No. 6 Hal. 18</span>
                </div>

                <div className="space-y-2 pt-1 font-mono text-xs">
                  {PENERTIBAN_BY_JENIS_KEGIATAN.map((item) => (
                    <div key={item.jenisKegiatan} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-800">{item.jenisKegiatan}</span>
                        <span className="font-bold text-slate-900">{item.jumlahKegiatan} Kegiatan ({item.totalObjekDitertibkan} Objek)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min((item.jumlahKegiatan / 250) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10.5px]">
                  <span className="text-slate-500">Kepatuhan Prosedur SP1 - SP3: <strong>98,4%</strong></span>
                  <button
                    onClick={() => onNavigateToUnit && onNavigateToUnit('dit-pam-aset')}
                    className="font-bold text-blue-700 hover:underline shrink-0 cursor-pointer"
                  >
                    Detail Ditpam &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SHEET 4: PNBP ROW UTILITAS & PENGHIJAUAN (DATA NO. 1 & 2)      */}
        {/* ============================================================== */}
        {activeVisualTab === 'pnbp-row' && (
          <div className="space-y-4 font-sans">
            {/* Header Metadata Attribution Banner */}
            <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200/80 text-xs text-cyan-950 space-y-1">
              <div className="flex items-center gap-2 font-bold text-cyan-900">
                <Database className="w-3.5 h-3.5 text-cyan-700" />
                <span>PEMETAAN SUMBER DATASET RESMI PENERIMAAN PNBP INFRASTRUKTUR (PDF Hal. 48 &amp; Hal. 4):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-white p-2 rounded-lg border border-cyan-200">
                  <div className="font-bold text-slate-800">Dit. Pembangunan Infrastruktur (Hal. 48):</div>
                  <div className="text-slate-600">
                    &bull; Data No. 1: <em>Pemanfaatan ROW Utilitas</em> (<code>TOTAL GALIAN</code>, <code>GALIAN TERBUKA</code>, <code>KODE TRANSAKSI</code>)
                    <br />
                    &bull; Data No. 2: <em>Pemanfaatan ROW Penghijauan</em> (<code>LUAS PENGHIJAUAN</code>, <code>JENIS PENGHIJAUAN</code>, <code>KODE TRANSAKSI</code>)
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-cyan-200">
                  <div className="font-bold text-slate-800">Biro Keuangan (Hal. 4):</div>
                  <div className="text-slate-600">
                    &bull; Data No. 7 &amp; 8: <em>Rincian &amp; Rekapitulasi Target PNBP</em> (<code>KODE</code>, <code>PENGGUNA</code>, <code>TARIF</code>, <code>VOLUME</code>, <code>JUMLAH</code>, <code>NAMA UNIT</code>)
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {PNBP_INFRASTRUKTUR_DETAIL.komponen.map((komp) => (
                <div key={komp.sumber} className="bg-slate-50/80 rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-200">
                        {komp.kodeDataset}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600">
                        +{ (komp.persen - 100).toFixed(1) }% Surplus
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      {komp.sumber}
                    </h5>

                    <div className="my-2 p-2 rounded-lg bg-white border border-slate-200 flex items-baseline justify-between">
                      <div>
                        <div className="text-[9.5px] uppercase font-mono text-slate-400">Realisasi Penerimaan</div>
                        <div className="text-base font-black font-mono text-slate-900">
                          Rp {(komp.realisasiRupiah / 1000000000).toFixed(2)} M
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9.5px] uppercase font-mono text-slate-400">Target DIPA</div>
                        <div className="text-xs font-mono font-bold text-slate-600">
                          Rp {(komp.targetRupiah / 1000000000).toFixed(2)} M
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-600">
                      <div><strong>Volume:</strong> {komp.volume}</div>
                      <div><strong>Izin Terbit:</strong> {komp.skTerbit} SK (SLA: {komp.slaHari})</div>
                      <div className="text-slate-500 truncate"><strong>Mitra:</strong> {komp.mitraUtama}</div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10.5px]">
                    <span className="text-emerald-700 font-bold">Capaian: {komp.persen.toFixed(1)}%</span>
                    <span
                      className="text-blue-600 font-semibold cursor-pointer hover:underline"
                      onClick={() => onOpenFormulaModal('ikp-2-pnbp-infrastruktur')}
                    >
                      Rumus PNBP &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
