import React, { useState } from 'react';
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Layers,
  FileCode2,
  Copy,
  Check,
  Download,
  HelpCircle,
  BarChart3,
  PieChart as PieIcon,
  MessageSquare,
  Building,
  Target,
  FileSpreadsheet,
  Zap,
  ExternalLink,
  Smile,
} from 'lucide-react';
import {
  BOKMR_SUMMARY,
  SAKIP_COMPONENTS_DATA,
  TOTAL_NILAI_SAKIP,
  PREDIKAT_SAKIP,
  SPIP_MATURITAS_ITEMS,
  SKOR_AGREGAT_SPIP,
  PIAGAM_RISIKO_DATA,
  PENYELESAIAN_REKOMENDASI_BLU,
  MODERNISASI_BLU_DATA,
  PENGADUAN_BADAN_USAHA_DATA,
  SKM_KATEGORI_DATA,
  PEKPPP_DATA,
  MRI_DATA,
} from './bokmrData';
import { BokmrFilterState } from './types';

// Import the 7 standardized visualization cards matching Pembangunan Infrastruktur style
import { SakipEvaluationView } from './SakipEvaluationView';
import { PenyelesaianBluPieChart } from './PenyelesaianBluPieChart';
import { PengaduanMasyarakatChart } from './PengaduanMasyarakatChart';
import { SkmSurveyChart } from './SkmSurveyChart';
import { PiagamRisikoChart } from './PiagamRisikoChart';
import { PekpppChart } from './PekpppChart';
import { SpipMaturitasChart } from './SpipMaturitasChart';
import { ReformasiBirokrasiCard } from './ReformasiBirokrasiCard';
import { SpipMaturitasCard } from './SpipMaturitasCard';

interface OkmrTableauDashboardProps {
  filters: BokmrFilterState;
  onOpenFormulaModal?: (datasetIndex: number) => void;
  hideKpis?: boolean;
}

type TableauTab =
  | 'rb'
  | 'sakip'
  | 'blu_pie'
  | 'pengaduan'
  | 'skm'
  | 'piagam_risiko'
  | 'pekppp'
  | 'spip'
  | 'tableau_spec';

export const OkmrTableauDashboard: React.FC<OkmrTableauDashboardProps> = ({
  filters,
  onOpenFormulaModal,
  hideKpis = false,
}) => {
  const [activeTab, setActiveTab] = useState<TableauTab>('rb');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Rata-rata Indeks Pelayanan Publik (PEKPPP)
  const avgPekppp = (
    PEKPPP_DATA.reduce((acc, curr) => acc + curr.capaianIndeks, 0) / PEKPPP_DATA.length
  ).toFixed(2);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Tableau CSV Generator for raw export
  const handleDownloadTableauCSV = () => {
    const csvContent = [
      'Worksheet,Dimensi,Kategori,Target,Realisasi,Satuan,Persentase_Capaian,Status',
      ...SAKIP_COMPONENTS_DATA.map(
        (s) =>
          `SAKIP,"${s.komponen}","Bobot",${s.bobot},${s.nilai},"Poin",${s.capaianPersen.toFixed(1)},"${s.tingkatAkuntabilitas}"`
      ),
      ...SPIP_MATURITAS_ITEMS.map(
        (sp) =>
          `SPIP,"${sp.komponenPenilaian}","Maturitas",${sp.targetSkor},${sp.skor},"Level",${((sp.skor / sp.targetSkor) * 100).toFixed(1)},"${sp.levelMaturitas}"`
      ),
      ...PENYELESAIAN_REKOMENDASI_BLU.map(
        (b) =>
          `BLU,"${b.entitasPengawas}","Rekomendasi",${b.rekomendasiTotal},${b.rekomendasiSelesai},"Kasus",${b.persentasePenyelesaian.toFixed(1)},"Selesai"`
      ),
      ...PENGADUAN_BADAN_USAHA_DATA.map(
        (p) =>
          `PENGADUAN,"${p.unitPelayanan}","Layanan",${p.jmlPengaduanDiterima},${p.jmlPengaduanSelesai},"Aduan",${p.persentaseSelesai.toFixed(1)},"Selesai"`
      ),
      ...PEKPPP_DATA.map(
        (pk) =>
          `PEKPPP,"${pk.unitKerja}","Indeks",4.00,${pk.capaianIndeks},"Skor",${((pk.capaianIndeks / 5) * 100).toFixed(1)},"${pk.predikat}"`
      ),
      ...PIAGAM_RISIKO_DATA.map(
        (pr) =>
          `RISIKO,"${pr.unitKerja}","${pr.kejadianRisiko}",${pr.besaranRisikoAwalTahun},${pr.besaranRisikoAkhirTahun},"Skor",${(((pr.besaranRisikoAwalTahun - pr.besaranRisikoAkhirTahun) / pr.besaranRisikoAwalTahun) * 100).toFixed(1)},"${pr.statusMitigasi}"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Tableau_Dataset_BOKMR_BPBatam_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Action Controls (Banner removed as requested) */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-xs font-bold text-slate-700">
          Katalog Visualisasi Tata Kelola, Kepatuhan &amp; Manajemen Risiko (Biro OKMR)
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={handleDownloadTableauCSV}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Download CSV siap import ke Tableau Desktop"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Ekspor Dataset Tableau (.csv)</span>
          </button>

          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal(2)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10.5px] font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors border border-sky-200"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Kamus &amp; Formula</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB WORKBOOK NAVIGATION */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-1 overflow-x-auto text-[11px] bg-slate-100 p-1 rounded-xl border border-slate-200/80">
        {[
          { id: 'rb', label: '1. Indeks Reformasi Birokrasi (8 Area)', icon: Award },
          { id: 'sakip', label: '2. SAKIP (DS #2)', icon: Activity },
          { id: 'blu_pie', label: '3. Penyelesaian BLU (DS #6 & #7)', icon: PieIcon },
          { id: 'pengaduan', label: '4. Pengaduan Layanan (DS #10)', icon: MessageSquare },
          { id: 'skm', label: '5. Rekap SKM (DS #11)', icon: Smile },
          { id: 'piagam_risiko', label: '6. Piagam Risiko (DS #14)', icon: ShieldAlert },
          { id: 'pekppp', label: '7. Evaluasi PEKPPP (DS #16)', icon: Building },
          { id: 'spip', label: '8. Maturitas SPIP (DS #17)', icon: ShieldCheck },
          { id: 'tableau_spec', label: '📐 Blueprint Tableau', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TableauTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E9762B]' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. 4 CORE EXECUTIVE KPI CARDS PER PERSYARATAN #6 & #8 */}
      {/* ========================================================================= */}
      {!hideKpis && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2 px-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                Indikator Utama Tata Kelola, Akuntabilitas &amp; Manajemen Risiko
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-mono">
                Visualisasi: Kartu Metrik KPI Eksekutif (Executive BANs)
              </span>
            </div>
            <span className="text-[10.5px] font-mono text-slate-500">
              Atribut: SAKIP (Hal. 38), SPIP (Hal. 40), PEKPPP (Hal. 40), MRI (Hal. 40)
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* KPI 1: SAKIP */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Nilai SAKIP (DS #2)
              </span>
              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Predikat {PREDIKAT_SAKIP}
              </span>
            </div>
            <div className="my-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {TOTAL_NILAI_SAKIP.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">/ 100</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${TOTAL_NILAI_SAKIP}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Target: <strong>80.00</strong></span>
              <span className="text-indigo-700 font-bold font-mono">+2.68 Pts</span>
            </div>
          </div>

          {/* KPI 2: SPIP */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Maturitas SPIP (DS #17)
              </span>
              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Level 3 - Terdefinisi
              </span>
            </div>
            <div className="my-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {SKOR_AGREGAT_SPIP.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">/ 5.00</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${(SKOR_AGREGAT_SPIP / 5) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Target BPKP: <strong>3.20</strong></span>
              <span className="text-emerald-700 font-bold font-mono">+0.22 (Matur)</span>
            </div>
          </div>

          {/* KPI 3: INDEKS PELAYANAN PUBLIK (PEKPPP) - DITAMBAHKAN PER SYARAT #6 */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Indeks Pelayanan Publik (DS #16)
              </span>
              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                Pelayanan Prima
              </span>
            </div>
            <div className="my-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {avgPekppp}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">/ 5.00</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-teal-600 h-full rounded-full"
                  style={{ width: `${(Number(avgPekppp) / 5) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Kategori: <strong>A (Prima)</strong></span>
              <span className="text-teal-700 font-bold font-mono">109.5% Capaian</span>
            </div>
          </div>

          {/* KPI 4: INDEKS MANAJEMEN RISIKO (MRI) - DITAMBAHKAN PER SYARAT #8 */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Indeks Manajemen Risiko (DS #18)
              </span>
              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                Tingkat 3 - Terkelola
              </span>
            </div>
            <div className="my-1.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {MRI_DATA.skor.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">/ 5.00</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-rose-500 h-full rounded-full"
                  style={{ width: `${(MRI_DATA.skor / 5) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[9.5px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Efektivitas Mitigasi:</span>
              <span className="text-rose-700 font-bold font-mono">{MRI_DATA.persentaseMitigasi}% Efektif</span>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* ========================================================================= */}
      {/* 4. CONTENT SECTIONS ACCORDING TO USER'S 7 REQUESTED VISUALIZATIONS */}
      {/* ========================================================================= */}

      {/* 0. INDEKS REFORMASI BIROKRASI (8 AREA PERUBAHAN MENPAN-RB) */}
      {activeTab === 'rb' && (
        <ReformasiBirokrasiCard onOpenFormulaModal={() => onOpenFormulaModal?.(2)} />
      )}

      {/* 0b. INDEKS MATURITAS SPIP (5 UNSUR BPKP & 5 LEVEL MATURITAS) */}
      {activeTab === 'spip' && (
        <SpipMaturitasCard onOpenFormulaModal={() => onOpenFormulaModal?.(17)} />
      )}

      {/* 1. VISUALISASI SAKIP (Persyaratan #1 & #10) */}
      {activeTab === 'sakip' && (
        <SakipEvaluationView onOpenFormula={onOpenFormulaModal} />
      )}

      {/* 2. VISUALISASI PERSENTASE PENYELESAIAN BLU & MODERNISASI DIGABUNG DALAM PIE CHART (Persyaratan #2 & #10) */}
      {activeTab === 'blu_pie' && (
        <PenyelesaianBluPieChart onOpenFormula={onOpenFormulaModal} />
      )}

      {/* 3. VISUALISASI MONITORING & EVALUASI PENGELOLAAN PENGADUAN MASYARAKAT (Persyaratan #3 & #10) */}
      {activeTab === 'pengaduan' && (
        <PengaduanMasyarakatChart filters={filters} onOpenFormula={onOpenFormulaModal} />
      )}

      {/* 4. VISUALISASI REKAPITULASI HASIL SURVEI KEPUASAN MASYARAKAT (SKM) (Persyaratan #4 & #10) */}
      {activeTab === 'skm' && (
        <SkmSurveyChart onOpenFormula={onOpenFormulaModal} />
      )}

      {/* 5. VISUALISASI PIAGAM RISIKO UNIT KERJA (Persyaratan #5 & #10) */}
      {activeTab === 'piagam_risiko' && (
        <PiagamRisikoChart onOpenFormula={onOpenFormulaModal} />
      )}

      {/* 7. VISUALISASI PEKPPP PELAYANAN PUBLIK (Persyaratan #7 & #10) */}
      {activeTab === 'pekppp' && (
        <PekpppChart onOpenFormula={onOpenFormulaModal} />
      )}

      {/* ========================================================================= */}
      {/* 5. BLUEPRINT WORKSHEET TABLEAU & SPECIFICATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'tableau_spec' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#E9762B]" />
                <span>Panduan Implementasi Tableau (Tableau Worksheet Recipes)</span>
              </h3>
              <p className="text-[10.5px] text-slate-500">
                Spesifikasi konfigurasi Rows, Columns, Marks, dan Rumus Calculated Field untuk diimplementasikan langsung di Tableau Desktop / Public.
              </p>
            </div>

            <button
              onClick={handleDownloadTableauCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E9762B] text-white hover:bg-[#D4651E] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Raw Dataset (.CSV)</span>
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                sheet: 'Worksheet 1: SAKIP (Komponen, Bobot & Nilai)',
                chartType: 'Grouped Bar / Bullet Graph',
                dimensions: ['[Komponen yang Dinilai] (Columns: Discrete Dimension)'],
                measures: ['SUM([Bobot]) (Columns)', 'SUM([Nilai]) (Columns)'],
                calculatedField: `// Formula % Capaian SAKIP
[% Capaian SAKIP] = SUM([Nilai]) / SUM([Bobot]) * 100`,
                marks: 'Side-by-side Bars with Bobot (Gray) and Nilai (Indigo). Target Line at 80% (Predikat A)',
              },
              {
                sheet: 'Worksheet 2: Persentase Penyelesaian Pengawasan & Modernisasi BLU',
                chartType: 'Combined Pie / Donut Chart',
                dimensions: ['[Entitas / Inisiatif Pengawasan] (Color/Detail: Pengelola, Dewas, Komite Audit, SPI, Modernisasi)'],
                measures: ['AVG([Persentase Penyelesaian]) (Angle / Size)'],
                calculatedField: `// Formula Rata-rata Penyelesaian BLU
[Avg Penyelesaian BLU] = AVG([Persentase Penyelesaian])`,
                marks: 'Pie Chart / Donut Chart with inner cutout 60% displaying Average 94.84%',
              },
              {
                sheet: 'Worksheet 3: Pengaduan Masyarakat Layanan Badan Usaha',
                chartType: 'Multi-Bar Chart (Diterima, Diproses, Selesai)',
                dimensions: ['[Unit Pelayanan] (Columns: BU RS, Pelabuhan, Bandara, SPAM, PTSP)'],
                measures: ['SUM([Jumlah Diterima])', 'SUM([Jumlah Diproses])', 'SUM([Jumlah Selesai])'],
                calculatedField: `// Resolusi Pengaduan
[% Resolusi Aduan] = SUM([Jumlah Selesai]) / SUM([Jumlah Diterima]) * 100`,
                marks: 'Bar Cluster with 3 measures: Diterima (Blue), Diproses (Amber), Selesai (Emerald)',
              },
              {
                sheet: 'Worksheet 4: Rekapitulasi Survei Kepuasan Masyarakat (SKM)',
                chartType: 'Horizontal Bar Chart',
                dimensions: ['[Unit Usaha] (Rows)', '[Kategori Unsur] (Rows)'],
                measures: ['AVG([Nilai Skor])', 'AVG([Persentase])'],
                calculatedField: `// Nilai Konversi SKM
[Nilai Konversi SKM] = AVG([Nilai]) * 25`,
                marks: 'Horizontal Bar colored by Persentase (Amber-600)',
              },
              {
                sheet: 'Worksheet 5: Piagam Risiko Unit Kerja (Awal vs Akhir Tahun)',
                chartType: 'Dumbbell / Dual-Axis Bar Chart',
                dimensions: ['[Unit Kerja] (Rows)', '[Kejadian Risiko] (Rows)'],
                measures: ['SUM([Besaran Risiko Awal Tahun])', 'SUM([Besaran Risiko Akhir Tahun])'],
                calculatedField: `// Reduksi Risiko
[Poin Reduksi] = SUM([Besaran Risiko Awal Tahun]) - SUM([Besaran Risiko Akhir Tahun])
[% Reduksi Risiko] = [Poin Reduksi] / SUM([Besaran Risiko Awal Tahun]) * 100`,
                marks: 'Dual-Axis: Mark 1 = Line (Path), Mark 2 = Circle (Awal = Red, Akhir = Green)',
              },
              {
                sheet: 'Worksheet 6: Pemantauan dan Evaluasi Kinerja Pelayanan Publik (PEKPPP)',
                chartType: 'Ranked Bar Chart with Reference Line',
                dimensions: ['[Unit Kerja] (Columns)'],
                measures: ['AVG([Capaian Indeks]) (Rows)'],
                calculatedField: `// Kategori PEKPPP
[Status Capaian] = IF AVG([Capaian Indeks]) >= 4.50 THEN "Prima" ELSE "Sangat Baik" END`,
                marks: 'Bar (Teal), Reference Lines at 4.00 (Target) and 4.50 (Prima)',
              },
              {
                sheet: 'Worksheet 7: Penilaian Maturitas SPIP',
                chartType: 'Horizontal Ranked Bar with Reference Line',
                dimensions: ['[Komponen yang Dinilai] (Rows: 5 Unsur SPIP)'],
                measures: ['AVG([Bobot])', 'AVG([Nilai Skor])'],
                calculatedField: `// Deviasi SPIP terhadap Standar BPKP
[Deviasi SPIP] = AVG([Nilai Skor]) - 3.20`,
                marks: 'Bar (Emerald-600), Reference Line at Value = 3.20 (Level 3 - Terdefinisi)',
              },
            ].map((spec, idx) => (
              <div
                key={spec.sheet}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-[10.5px] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {spec.sheet}
                    </span>
                    <span className="bg-amber-100 text-[#C45E1B] px-1.5 py-0.2 rounded font-bold text-[9px] border border-amber-200">
                      {spec.chartType}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(spec.calculatedField, `calc_${idx}`)}
                    className="flex items-center gap-1 text-[9.5px] text-sky-700 hover:text-sky-800 font-semibold"
                  >
                    {copiedCode === `calc_${idx}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Rumus Calculated Field</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-900 block">Dimensions (Blue Pills):</span>
                    <ul className="list-disc list-inside text-[9.5px]">
                      {spec.dimensions.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Measures (Green Pills):</span>
                    <ul className="list-disc list-inside text-[9.5px]">
                      {spec.measures.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-100 p-2 rounded font-mono text-[9px] overflow-x-auto">
                  {spec.calculatedField}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
