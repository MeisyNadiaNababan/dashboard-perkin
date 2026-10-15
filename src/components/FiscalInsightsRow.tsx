import React, { useState } from 'react';
import {
  Download,
  BarChart3,
  Table as TableIcon,
  HelpCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Building2,
  Layers
} from 'lucide-react';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface FiscalInsightsRowProps {
  onOpenExportModal: () => void;
  onOpenTableauGuide?: () => void;
  onExplainKpi?: (kpiId: string) => void;
  lastUpdated: string;
}

// Authentic Tableau Diverging Bar Chart Data (Surplus / Deficit per Unit Kerja)
const SURPLUS_DEFISIT_DATA = [
  {
    unit: 'Dit. Pengelolaan Lahan & Kawasan',
    singkatan: 'Dit. Lahan',
    pendapatan: 428.0,
    belanja: 61.0,
    net: 367.0, // Surplus (+367 M)
    keterangan: 'Sewa lahan industri Batam Center, Kabil & Batu Ampar',
    kategori: 'Donor Terbesar',
  },
  {
    unit: 'Kantor Bandara Hang Nadim',
    singkatan: 'Bandara HN',
    pendapatan: 315.0,
    belanja: 142.0,
    net: 173.0, // Surplus (+173 M)
    keterangan: 'Penerimaan jasa kebandarudaraan & konsesi kargo',
    kategori: 'Surplus Operasional',
  },
  {
    unit: 'Dit. Pelabuhan & Terminal',
    singkatan: 'Dit. Pelabuhan',
    pendapatan: 226.2,
    belanja: 159.0,
    net: 67.2, // Surplus (+67.2 M)
    keterangan: 'Jasa labuh, tambat & terminal kargo curah/peti kemas',
    kategori: 'Surplus Operasional',
  },
  {
    unit: 'Dit. Fasilitas Usaha & Promosi',
    singkatan: 'Dit. Fasilitas',
    pendapatan: 28.0,
    belanja: 68.0,
    net: -40.0, // Defisit (-40 M)
    keterangan: 'Subsidi promosi investasi asing & pemeliharaan aset umum',
    kategori: 'Penerima Subsidi',
  },
  {
    unit: 'Dit. Pembangunan Infrastruktur',
    singkatan: 'Dit. Infrastruktur',
    pendapatan: 12.0,
    belanja: 183.0,
    net: -171.0, // Defisit (-171 M)
    keterangan: 'Belanja modal jalan arteri, drainase & fasilitas umum',
    kategori: 'Penerima Subsidi Terbesar',
  },
];

export const FiscalInsightsRow: React.FC<FiscalInsightsRowProps> = ({
  onOpenExportModal,
  onOpenTableauGuide,
  onExplainKpi,
  lastUpdated,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  // Diverging Bar Calculations (-200 to +400 M)
  const minVal = -200;
  const maxVal = 400;
  const totalRange = maxVal - minVal; // 600
  const zeroPosPercent = ((0 - minVal) / totalRange) * 100; // ~33.33%

  return (
    <div id="fiskal-section" className="space-y-4 font-sans select-none">
      {/* KESEIMBANGAN SURPLUS & DEFISIT PER UNIT KERJA (STANDARISASI VISUAL MODEL SEPERTI LAINNYA) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#59A14F]" />
              <span>ANALISIS FISKAL &amp; SUBSIDI SILANG BLU</span>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                Item #16
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight">
                Surplus dan Defisit per Unit Kerja
              </h3>
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('keseimbangan_surplus')}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1F4E79] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Lihat Formula Lengkap & Penjelasan Insight untuk Atasan"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Keseimbangan anggaran operasional: Surplus sewa lahan &amp; kepelabuhanan mensubsidi silang belanja infrastruktur umum
            </p>
          </div>

          {/* Right Controls: View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium border border-slate-200/80">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'chart'
                    ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Format Tampilan: Tableau Diverging Bar Chart"
              >
                <BarChart3 className="w-3 h-3" />
                <span>Visual Bar</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'table'
                    ? 'bg-white text-[#002B49] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Format Tampilan: Tabel In-Cell Crosstab"
              >
                <TableIcon className="w-3 h-3" />
                <span>Tabel In-Cell</span>
              </button>
            </div>
          </div>
        </div>

        {/* Executive BAN Strip (2 Tiles: Net Surplus & Keseluruhan Jumlah Defisit) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => onExplainKpi?.('keseimbangan_surplus')}
            className="p-3 bg-slate-50/90 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 rounded-xl transition-all cursor-pointer group shadow-2xs"
            title="Klik untuk membuka formula Surplus Konsolidasi"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>Net Surplus Konsolidasi</span>
              <HelpCircle className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#002B49] font-mono leading-tight">
              +Rp 196,2 M
            </div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5 truncate">
              Penerimaan Lebih Tinggi dari Belanja
            </div>
          </div>

          <div
            onClick={() => onExplainKpi?.('keseimbangan_surplus')}
            className="p-3 bg-slate-50/90 hover:bg-rose-50/70 border border-slate-200/80 hover:border-rose-300 rounded-xl transition-all cursor-pointer group shadow-2xs"
            title="Klik untuk melihat rincian keseluruhan defisit unit kerja"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>Keseluruhan Jumlah Defisit</span>
              <HelpCircle className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#E15759] font-mono leading-tight">
              -Rp 211,0 M
            </div>
            <div className="text-[10px] text-rose-700 font-semibold mt-0.5 truncate">
              Dit. Infrastruktur (-Rp 171,0 M) &amp; Fasilitas (-Rp 40,0 M)
            </div>
          </div>
        </div>

        {/* Marks & Legend Shelf Standardized */}
        <div className="px-3.5 py-2 bg-slate-50/70 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-[11px]">Marks &amp; Saldo Fiskal:</span>
            <div className="flex items-center gap-3 text-[11px] flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#59A14F]" />
                <span>Surplus Operasional (+Rp M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#E15759]" />
                <span>Defisit Operasional (-Rp M)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2.5 border-r-2 border-slate-700 inline-block" />
                <span>Titik Nol Keseimbangan (Rp 0 M)</span>
              </div>
            </div>
          </div>
          <span className="text-[10.5px] font-mono text-slate-400">
            Show Me #6 (Diverging Bar) &amp; #1 (Crosstab)
          </span>
        </div>

        {/* Tableau Shelves Mapping Badge */}
        <TableauShelvesBadge
          showMe="Show Me #6 (Diverging Bar) / #1 (Crosstab with In-Cell Bullet)"
          rows="[unit] (Unit Kerja Pengampu)"
          columns="[Net Variance] = SUM([pendapatan]) - SUM([belanja])"
          color="IF [Net Variance] >= 0 THEN 'Surplus' ELSE 'Defisit' END"
          referenceLine="Zero Constant Line (Rp 0 M)"
          detail="[keterangan], [pendapatan], [belanja]"
        />

        {/* Worksheet Content Body */}
        <div>
          {viewMode === 'chart' ? (
            <div className="space-y-4">
              {/* Diverging Bar Chart Canvas */}
              <div className="relative border border-slate-200/80 bg-white rounded-xl p-4 shadow-2xs space-y-3">
                {/* Axis Scale Top with Zero Indicator */}
                <div className="relative h-6 border-b border-slate-200 mb-2 text-[10px] font-mono text-slate-500">
                  <span className="absolute left-0 text-slate-400">-Rp 200 M</span>
                  <span className="absolute left-[16.66%] -translate-x-1/2 text-slate-400">-Rp 100 M</span>
                  <span className="absolute left-[33.33%] -translate-x-1/2 font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                    Rp 0 M (Titik Impas)
                  </span>
                  <span className="absolute left-[50%] -translate-x-1/2 text-slate-400">+Rp 100 M</span>
                  <span className="absolute left-[66.66%] -translate-x-1/2 text-slate-400">+Rp 200 M</span>
                  <span className="absolute left-[83.33%] -translate-x-1/2 text-slate-400">+Rp 300 M</span>
                  <span className="absolute right-0 text-slate-400">+Rp 400 M</span>
                </div>

                {/* Center Zero Gridline across chart */}
                <div
                  className="absolute top-10 bottom-4 w-0.5 bg-slate-400/90 z-10 pointer-events-none"
                  style={{ left: `calc(${zeroPosPercent}% + 16px)` }}
                />

                {/* Rows of Diverging Bars (Narrow, compact spacing) */}
                <div className="space-y-1.5 relative z-20">
                  {SURPLUS_DEFISIT_DATA.map((item) => {
                    const isPositive = item.net >= 0;
                    const barWidthPct = (Math.abs(item.net) / totalRange) * 100;
                    const isHovered = hoveredUnit === item.unit;

                    return (
                      <div
                        key={item.unit}
                        onClick={() => onExplainKpi?.('keseimbangan_surplus')}
                        onMouseEnter={() => setHoveredUnit(item.unit)}
                        onMouseLeave={() => setHoveredUnit(null)}
                        className={`p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer border ${
                          isHovered
                            ? 'bg-blue-50/60 border-blue-300 shadow-2xs ring-1 ring-blue-200'
                            : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-50'
                        }`}
                        title="Klik untuk membuka formula perhitungan Keseimbangan Fiskal"
                      >
                        {/* Unit Label and details */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 group-hover:text-blue-700">
                              {item.unit}
                            </span>
                            <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
                              ({item.keterangan})
                            </span>
                            <span className="text-[9px] text-blue-600 bg-blue-50 px-1 py-0.2 rounded font-mono border border-blue-200">
                              Rumus
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10.5px] font-mono shrink-0">
                            <span className="text-slate-500">
                              P: <strong className="text-slate-800">Rp {item.pendapatan.toFixed(1)} M</strong>
                            </span>
                            <span className="text-slate-300">|</span>
                            <span className="text-slate-500">
                              B: <strong className="text-slate-800">Rp {item.belanja.toFixed(1)} M</strong>
                            </span>
                            <span className="text-slate-300">|</span>
                            <span
                              className={`font-black px-1.5 py-0.2 rounded text-[10px] ${
                                isPositive
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {isPositive ? `+Rp ${item.net.toFixed(1)} M` : `-Rp ${Math.abs(item.net).toFixed(1)} M`}
                            </span>
                          </div>
                        </div>

                        {/* Narrow Bar Track */}
                        <div className="relative h-2.5 sm:h-3 bg-slate-200/80 rounded overflow-hidden">
                          {/* Zero Line Marker inside bar */}
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-500 z-10"
                            style={{ left: `${zeroPosPercent}%` }}
                          />

                          {/* Colored Tableau Bar */}
                          {isPositive ? (
                            <div
                              className="absolute top-0 bottom-0 bg-[#59A14F] hover:bg-[#4E8F45] rounded-r transition-all flex items-center pl-1.5 text-[9px] font-mono font-bold text-white shadow-2xs"
                              style={{
                                left: `${zeroPosPercent}%`,
                                width: `${barWidthPct}%`,
                              }}
                            />
                          ) : (
                            <div
                              className="absolute top-0 bottom-0 bg-[#E15759] hover:bg-[#C94749] rounded-l transition-all flex items-center justify-end pr-1.5 text-[9px] font-mono font-bold text-white shadow-2xs"
                              style={{
                                right: `${100 - zeroPosPercent}%`,
                                width: `${barWidthPct}%`,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Crosstab View (Show Me #1 Matching BiroKeuanganFinancialCard) */
            <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead className="bg-[#0B2545] text-white font-bold text-[10.5px]">
                  <tr>
                    <th className="py-2.5 px-3">UNIT KERJA PENGAMPU (KLIK RUMUS)</th>
                    <th className="py-2.5 px-3 text-right">PENDAPATAN</th>
                    <th className="py-2.5 px-3 text-right">BELANJA</th>
                    <th className="py-2.5 px-3 text-right">NET (SURPLUS/DEFISIT)</th>
                    <th className="py-2.5 px-3 text-center">KLASIFIKASI FISKAL</th>
                    <th className="py-2.5 px-3">CATATAN TATA KELOLA ANGGARAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {SURPLUS_DEFISIT_DATA.map((item, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <tr
                        key={item.unit}
                        onClick={() => onExplainKpi?.('keseimbangan_surplus')}
                        className={`hover:bg-blue-50/70 transition-colors cursor-pointer group ${
                          isEven ? 'bg-white' : 'bg-slate-50/50'
                        }`}
                        title="Klik untuk melihat formula Keseimbangan Fiskal"
                      >
                        <td className="py-2.5 px-3 font-sans font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between gap-1">
                          <span>{item.unit}</span>
                          <HelpCircle className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-700">
                          Rp {item.pendapatan.toFixed(1)} M
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-700">
                          Rp {item.belanja.toFixed(1)} M
                        </td>
                        <td
                          className={`py-2.5 px-3 text-right font-bold ${
                            item.net >= 0 ? 'text-[#2B542C]' : 'text-[#922B21]'
                          }`}
                        >
                          {item.net >= 0 ? `+Rp ${item.net.toFixed(1)} M` : `-Rp ${Math.abs(item.net).toFixed(1)} M`}
                        </td>
                        <td className="py-2.5 px-3 text-center font-sans">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                              item.net >= 0
                                ? 'bg-[#EBF3E8] text-[#2B542C] border border-[#59A14F]/40'
                                : 'bg-[#FDEDEC] text-[#922B21] border border-[#E15759]/40'
                            }`}
                          >
                            {item.net >= 0 ? 'Surplus (Donor)' : 'Defisit (Penerima)'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-sans text-slate-600 text-xs">
                          {item.keterangan}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 font-mono text-xs">
                  <tr>
                    <td className="py-3 px-3 font-sans text-slate-900 uppercase tracking-wider text-[10.5px]">
                      TOTAL KONSOLIDASI (NETTO)
                    </td>
                    <td className="py-3 px-3 text-right text-slate-900">
                      Rp 999,2 M
                    </td>
                    <td className="py-3 px-3 text-right text-slate-900">
                      Rp 803,0 M
                    </td>
                    <td className="py-3 px-3 text-right font-black text-[#2B542C] text-sm">
                      +Rp 196,2 M
                    </td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className="bg-[#EBF3E8] text-[#2B542C] px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full border border-[#59A14F]/40">
                        Surplus Bersih
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-600 text-xs">
                      Kondisi likuiditas fiskal BP Batam prima &amp; mandiri
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Interpretasi Tata Kelola Subsidi Silang */}
        <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs">
          <span className="font-bold text-[#002B49] block mb-1">
            <span className="font-bold text-slate-700">Prinsip Tata Kelola Subsidi Silang Anggaran BLU BP Batam:</span>
          </span>
          <p className="text-[11.5px] text-slate-600">
            Defisit pada unit kerja pembangunan infrastruktur publik (Rp -171,0 M) dan promosi fasilitas usaha (Rp -40,0 M) <strong>bukan merupakan kerugian operasional</strong>, melainkan investasi penyediaan fasilitas publik yang sepenuhnya disubsidi silang secara tertutup oleh surplus dari unit pengelola lahan industri (Rp +367,0 M) serta konsesi kebandarudaraan &amp; pelabuhan (Rp +240,2 M). Hal ini mencerminkan kemandirian fiskal BLU BP Batam yang tidak bergantung pada transfer APBN.
          </p>
        </div>

        {/* Worksheet Caption / Footnote */}
        <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Tableau Server BI • Data Source: SIMKEU BP Batam • Extracted: {lastUpdated}</span>
          <button
            onClick={onOpenExportModal}
            className="text-[#002B49] hover:underline font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Crosstab ke Excel / CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
