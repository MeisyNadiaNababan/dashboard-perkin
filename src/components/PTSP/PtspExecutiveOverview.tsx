import React, { useState } from 'react';
import {
  FileCheck2,
  Ship,
  Award,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info,
  FolderKanban,
  FileCode2,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { PTSP_KPI_METRICS, PtspKpiMetric } from '../../data/ptspData';

interface PtspExecutiveOverviewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  hideKpiCards?: boolean;
}

// Monthly trend data Jan - Apr 2026 (YTD)
const MONTHLY_PERMIT_TREND = [
  { bulan: 'Jan 2026', masuk: 3150, terbit: 2980, backlog: 170, slaPercent: 93.8 },
  { bulan: 'Feb 2026', masuk: 3340, terbit: 3180, backlog: 160, slaPercent: 94.2 },
  { bulan: 'Mar 2026', masuk: 3710, terbit: 3550, backlog: 160, slaPercent: 94.5 },
  { bulan: 'Apr 2026', masuk: 3620, terbit: 3482, backlog: 138, slaPercent: 94.6 },
];

// Risk distribution data (OSS RBA Item #9 Satu Data)
const RISK_DISTRIBUTION = [
  { name: 'Rendah (R)', value: 8568, percentage: '62%', color: '#10B981', sla: 'Otomatis Langsung Terbit' },
  { name: 'Menengah Rendah (MR)', value: 2902, percentage: '21%', color: '#3B82F6', sla: 'Sertifikat Standar (1 Hari)' },
  { name: 'Menengah Tinggi (MT)', value: 1658, percentage: '12%', color: '#F59E0B', sla: 'Verifikasi Teknis (3 Hari)' },
  { name: 'Tinggi (T)', value: 692, percentage: '5%', color: '#EF4444', sla: 'Verifikasi & Audit Lapangan (5 Hari)' },
];

// Sector breakdown
const SECTOR_DISTRIBUTION = [
  { name: 'Industri Manufaktur', total: 4210, terbit: 4050, pct: '96,2%', leadTime: '1,6 Hari', slaStatus: 'Optimal' },
  { name: 'Maritim & Kepelabuhanan', total: 3150, terbit: 3010, pct: '95,6%', leadTime: '1,4 Hari', slaStatus: 'Optimal' },
  { name: 'Perdagangan & Distribusi', total: 2840, terbit: 2720, pct: '95,8%', leadTime: '1,5 Hari', slaStatus: 'Optimal' },
  { name: 'Teknologi & Data Center', total: 1980, terbit: 1890, pct: '95,5%', leadTime: '1,9 Hari', slaStatus: 'Optimal' },
  { name: 'Pariwisata & Hospitaliti', total: 1640, terbit: 1522, pct: '92,8%', leadTime: '2,4 Hari', slaStatus: 'Perhatian' },
];

export const PtspExecutiveOverview: React.FC<PtspExecutiveOverviewProps> = ({
  onNavigateTab,
  onOpenFormulaModal,
  hideKpiCards = false,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'trend' | 'risk'>('trend');

  return (
    <div id="ptsp-executive-overview" className="space-y-4">
      {/* 1. EXECUTIVE KPI CARDS (Only rendered if hideKpiCards is false) */}
      {!hideKpiCards && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                6 Indikator Kunci PTSP (Sesuai Kamus KPI &amp; Atribut Satu Data BP Batam)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('kamus_rumus')}
              className="text-xs text-[#002B49] hover:text-blue-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Kamus Rumus Calculated Fields</span>
            </button>
          </div>

          {/* Responsive Grid: 6 Core KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {PTSP_KPI_METRICS.slice(0, 6).map((kpi) => {
              const isPositive = kpi.trend.isPositive;
              return (
                <div
                  key={kpi.id}
                  onClick={() => onOpenFormulaModal && onOpenFormulaModal(kpi.id)}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between group relative"
                  title="Klik untuk melihat formula perhitungan dan relasi atribut data"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="font-mono text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {kpi.code}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                          kpi.badge.variant === 'success'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}
                      >
                        {kpi.badge.text}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-slate-600 truncate" title={kpi.title}>
                      {kpi.title}
                    </div>

                    <div className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
                      {kpi.value}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <div className="text-slate-500 truncate max-w-[110px]" title={kpi.target}>
                      {kpi.target}
                    </div>
                    <div
                      className={`flex items-center gap-0.5 font-bold shrink-0 ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{kpi.trend.value}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. DUAL VISUALIZATION: TREN VOLUME & DISTRIBUSI RISIKO OSS RBA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Monthly Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Data PTSP No. 2 (Satu Data)
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kinerja Operasional PTSP
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Tren Volume Permohonan, Izin Terbit, dan Kepatuhan SLA (Jan - Apr 2026)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rasio terbit rata-rata 95,4% dengan kepatuhan SLA 94,6% (Target Renstra: ≥ 90,0%).
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenFormulaModal && (
                <button
                  onClick={() => onOpenFormulaModal('lic_sla')}
                  className="text-xs font-bold text-[#002B49] hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                SLA YTD: 94,6%
              </span>
            </div>
          </div>

          {/* Clean Custom SVG & Grid Visualizer (Zero External Dependencies) */}
          <div className="pt-3 flex flex-col justify-between flex-1">
            {/* Chart Legend with clear distinction */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200/70 text-xs mb-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
                  <span className="text-blue-900 font-bold text-[11px]">🔵 Biru: Permohonan Masuk (Diajukan)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                  <span className="text-emerald-900 font-bold text-[11px]">🟢 Hijau: Izin Terbit (Disetujui)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <span className="w-4 h-1 bg-amber-500 rounded inline-block" />
                  <span className="text-amber-900 font-bold text-[11px]">🟡 SLA Tepat Waktu</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono italic">
                Gap = Berkas Proses/Verifikasi
              </span>
            </div>

            {/* Visual Bar & Metric Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 items-end pt-2 pb-1">
              {MONTHLY_PERMIT_TREND.map((item) => {
                const maxVal = 4000;
                const masukHeight = Math.round((item.masuk / maxVal) * 120);
                const terbitHeight = Math.round((item.terbit / maxVal) * 120);

                return (
                  <div key={item.bulan} className="flex flex-col items-center group">
                    {/* SLA Badge */}
                    <div className="mb-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      SLA {item.slaPercent}%
                    </div>

                    {/* Dual Bars Container */}
                    <div className="w-full flex items-end justify-center gap-1.5 h-32 bg-slate-50/70 rounded-lg p-1.5 border border-slate-100 relative">
                      {/* Bar 1: Permohonan Masuk */}
                      <div
                        className="w-1/2 bg-blue-600 rounded-t transition-all group-hover:bg-blue-700 relative"
                        style={{ height: `${masukHeight}px` }}
                        title={`Permohonan Masuk: ${item.masuk.toLocaleString('id-ID')}`}
                      >
                        <span className="sr-only">{item.masuk}</span>
                      </div>

                      {/* Bar 2: Izin Terbit */}
                      <div
                        className="w-1/2 bg-emerald-500 rounded-t transition-all group-hover:bg-emerald-600 relative"
                        style={{ height: `${terbitHeight}px` }}
                        title={`Izin Terbit: ${item.terbit.toLocaleString('id-ID')}`}
                      >
                        <span className="sr-only">{item.terbit}</span>
                      </div>
                    </div>

                    {/* X-Axis Month Label */}
                    <div className="mt-2 text-center">
                      <div className="text-xs font-bold text-slate-800">{item.bulan}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        <span className="text-blue-700 font-bold">{item.masuk}</span> /{' '}
                        <span className="text-emerald-700 font-bold">{item.terbit}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Insight Footer */}
            <div className="mt-4 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
              <span>Rata-rata lead time proses: <strong className="text-slate-800">1,8 hari kerja</strong> (Target: &le; 3 hari)</span>
              <span>Backlog aktif saat ini: <strong className="text-slate-800">628 berkas</strong> (Toleransi: &le; 750)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Risk & Sector Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Item #9 Satu Data
                </span>
                <h4 className="text-xs font-extrabold text-slate-900 mt-1">
                  Klasifikasi Tingkat Risiko OSS RBA
                </h4>
              </div>
              <div className="flex items-center gap-1.5">
                {onOpenFormulaModal && (
                  <button
                    onClick={() => onOpenFormulaModal('lic_vol')}
                    className="text-[11px] font-bold text-[#002B49] hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <FileCode2 className="w-3 h-3 text-blue-600" />
                    <span>Formula</span>
                  </button>
                )}
                <span className="text-[10px] text-slate-500 font-mono">13.820 Dok</span>
              </div>
            </div>

            {/* Risk Category Progress Bars */}
            <div className="space-y-2.5">
              {RISK_DISTRIBUTION.map((r) => (
                <div key={r.name} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{r.name}</span>
                    <span className="font-mono font-extrabold text-slate-900">{r.percentage}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full"
                      style={{ width: r.percentage, backgroundColor: r.color }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{r.value.toLocaleString('id-ID')} Izin</span>
                    <span className="font-medium text-slate-600">{r.sla}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Sektor Dominan: <strong>Industri &amp; Maritim</strong></span>
            <button
              onClick={() => onNavigateTab('perizinan')}
              className="text-sky-700 hover:text-sky-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Detail</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. WORKSHEET: SEKTOR USAHA & ANALISIS BOTTLENECK LAYANAN OSS RBA */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Item #9 &amp; #17 Katalog PDF
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Distribusi Sektoral &amp; Analisis Kinerja Lead Time
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Performa Penerbitan Izin Berdasarkan Sektor Usaha Dominan di Batam
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('lic_issued')}
                className="text-xs font-bold text-[#002B49] hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
            <div className="text-xs font-medium text-slate-500">
              Standar SLA Maksimal: <strong className="text-slate-800">3,0 Hari Kerja</strong>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Sektor Usaha</th>
                <th className="py-2.5 px-3 text-right">Permohonan (LIC_VOL)</th>
                <th className="py-2.5 px-3 text-right">Terbit (LIC_ISSUED)</th>
                <th className="py-2.5 px-3 text-right">Efektivitas</th>
                <th className="py-2.5 px-3 text-right">Lead Time (LIC_MLT)</th>
                <th className="py-2.5 px-3 text-center">Status SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SECTOR_DISTRIBUTION.map((sec) => (
                <tr key={sec.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-800 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{sec.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-700">
                    {sec.total.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                    {sec.terbit.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">
                    {sec.pct}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    {sec.leadTime}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        sec.slaStatus === 'Optimal'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {sec.slaStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lead time pipeline stages breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[10px] uppercase font-bold">1. Verifikasi Administrasi Dokumen</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">0,4 Hari Kerja</div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Otomasi Sistem Validasi NIB</span>
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[10px] uppercase font-bold">2. Evaluasi Teknis Bidang / Rekomendasi</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">0,9 Hari Kerja</div>
            <p className="text-[10px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Terintegrasi Antar Unit Teknis</span>
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 text-[10px] uppercase font-bold">3. Penerbitan Sertifikat &amp; Izin Final</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">0,5 Hari Kerja</div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Tanda Tangan Elektronik (TTE BSrE)</span>
            </p>
          </div>
        </div>

        {/* Executive Insight Box */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs">
          <span className="font-bold text-[#002B49] flex items-center gap-1.5 mb-1 text-xs">
            <span></span> Executive Insight &amp; Interpretasi Kinerja Sektoral PTSP:
          </span>
          <p className="text-[11.5px] text-slate-600">
            Sektor <strong>Industri Manufaktur</strong> dan <strong>Maritim &amp; Kepelabuhanan</strong> menjadi motor perizinan utama dengan kontribusi 53,2% dari total permohonan, mencatat rasio izin terbit di atas 95,6% dan kecepatan median lead time optimal (&le; 1,6 hari kerja). Untuk sektor Pariwisata &amp; Hospitaliti, evaluasi teknis dokumen izin lingkungan dan tata ruang telah dipercepat melalui loket klinik asistensi OSS terpadu di MPP Batam Centre.
          </p>
        </div>
      </div>

      {/* 4. INFORMASI PENTING & STRATEGIS PTSP BP BATAM (Ringkas, Berbobot & Relevan) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Dampak Investasi */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Dampak Ekonomi
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Komitmen LKPM OSS RBA
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Realisasi Investasi &amp; Serapan Tenaga Kerja 2026
              </h4>
            </div>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('lic_issued')}
                className="text-xs font-bold text-[#002B49] hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] uppercase font-bold text-emerald-800">Total Nilai Investasi</span>
              <div className="text-base font-black text-slate-900 font-mono mt-0.5">Rp 24,8 Triliun</div>
              <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">68,4% PMA • 31,6% PMDN</span>
            </div>
            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100">
              <span className="text-[10px] uppercase font-bold text-blue-800">Penyerapan Tenaga Kerja</span>
              <div className="text-base font-black text-slate-900 font-mono mt-0.5">18.420 Pekerja</div>
              <span className="text-[10px] text-blue-700 font-semibold mt-0.5 block">17.890 TKI • 530 TKA Ahli</span>
            </div>
          </div>

          <p className="text-[11.5px] text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
            Kawasan Industri Batamindo, Kabil Integrated Industrial Estate, dan Nongsa Digital Park menyerap porsi terbesar komitmen investasi dan tenaga kerja baru.
          </p>
        </div>

        {/* Card 2: Kinerja Fast-Track Layanan */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                  Efisiensi Birokrasi
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kinerja Fast-Track SLA
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Penyaluran Jalur Cepat &amp; Kecepatan Terbit Izin
              </h4>
            </div>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('lic_sla')}
                className="text-xs font-bold text-[#002B49] hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-sky-50/70 border border-sky-100">
              <span className="text-[10px] uppercase font-bold text-sky-800">Otomasi Risiko Rendah</span>
              <div className="text-base font-black text-slate-900 font-mono mt-0.5">8.568 Izin (62%)</div>
              <span className="text-[10px] text-sky-700 font-semibold mt-0.5 block">Terbit Instant &lt; 1 Jam</span>
            </div>
            <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-100">
              <span className="text-[10px] uppercase font-bold text-purple-800">Persetujuan Tepat Waktu</span>
              <div className="text-base font-black text-slate-900 font-mono mt-0.5">12.480 Berkas</div>
              <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">Kepatuhan SLA 94,6%</span>
            </div>
          </div>

          <p className="text-[11.5px] text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
            Seluruh produk izin telah dilengkapi QR Code dan TTE tersertifikasi BSrE sehingga pemohon dapat memverifikasi keabsahan legalitas secara mandiri.
          </p>
        </div>
      </div>
    </div>
  );
};
