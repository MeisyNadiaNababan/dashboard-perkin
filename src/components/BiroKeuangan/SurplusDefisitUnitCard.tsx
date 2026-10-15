import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  Table as TableIcon,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRightLeft,
  Building2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Legend,
} from 'recharts';
import {
  SURPLUS_DEFISIT_UNIT_DATA,
  SurplusDefisitUnitItem,
} from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface SurplusDefisitUnitCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type ViewMode = 'diverging' | 'comparison' | 'table';

export const SurplusDefisitUnitCard: React.FC<SurplusDefisitUnitCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('diverging');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SURPLUS' | 'DEFISIT'>('ALL');

  // Filter items
  const filteredUnits = useMemo(() => {
    let list = SURPLUS_DEFISIT_UNIT_DATA;
    if (statusFilter !== 'ALL') {
      list = list.filter((u) => u.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (u) =>
          u.unit.toLowerCase().includes(q) ||
          u.namaLengkap.toLowerCase().includes(q) ||
          u.kategori.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, statusFilter]);

  // Totals
  const totals = useMemo(() => {
    const totalPendapatan = SURPLUS_DEFISIT_UNIT_DATA.reduce((acc, u) => acc + u.pendapatan, 0);
    const totalBelanja = SURPLUS_DEFISIT_UNIT_DATA.reduce((acc, u) => acc + u.belanja, 0);
    const totalSurplus = totalPendapatan - totalBelanja;
    const ratio = totalBelanja > 0 ? (totalPendapatan / totalBelanja) * 100 : 0;
    const unitSurplusCount = SURPLUS_DEFISIT_UNIT_DATA.filter((u) => u.status === 'SURPLUS').length;
    const unitDefisitCount = SURPLUS_DEFISIT_UNIT_DATA.filter((u) => u.status === 'DEFISIT').length;

    return {
      totalPendapatan,
      totalBelanja,
      totalSurplus,
      ratio,
      unitSurplusCount,
      unitDefisitCount,
    };
  }, []);

  // Format IDR in Billions
  const formatMiliar = (val: number) => {
    const absVal = Math.abs(val);
    const formatted = (absVal / 1e9).toLocaleString('id-ID', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return val < 0 ? `-Rp ${formatted} M` : `Rp ${formatted} M`;
  };

  // Diverging Bar Chart Data (Net Surplus / Defisit)
  const divergingData = useMemo(() => {
    return filteredUnits.map((u) => ({
      name: u.unit,
      fullName: u.namaLengkap,
      surplusDefisitM: Math.round(u.surplusDefisit / 1e8) / 10, // In Miliar with 1 decimal
      surplusExact: u.surplusDefisit,
      pendapatanM: Math.round(u.pendapatan / 1e8) / 10,
      belanjaM: Math.round(u.belanja / 1e8) / 10,
      status: u.status,
      coverageRatio: u.coverageRatio,
    }));
  }, [filteredUnits]);

  // Comparison Bar Chart Data (Pendapatan vs Belanja side-by-side)
  const comparisonData = useMemo(() => {
    return filteredUnits.map((u) => ({
      name: u.unit,
      fullName: u.namaLengkap,
      pendapatanM: Math.round(u.pendapatan / 1e8) / 10,
      belanjaM: Math.round(u.belanja / 1e8) / 10,
      surplusExact: u.surplusDefisit,
      status: u.status,
    }));
  }, [filteredUnits]);

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      'Unit Kerja',
      'Nama Lengkap',
      'Kategori',
      'Pendapatan (Rp)',
      'Belanja (Rp)',
      'Surplus / Defisit (Rp)',
      'Status',
      'Coverage Ratio (%)',
    ];
    const rows = filteredUnits.map((u) => [
      `"${u.unit}"`,
      `"${u.namaLengkap}"`,
      `"${u.kategori}"`,
      u.pendapatan,
      u.belanja,
      u.surplusDefisit,
      `"${u.status}"`,
      u.coverageRatio,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SURPLUS_DEFISIT_SETIAP_UNIT_BP_BATAM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standard Header */}
      <div className="p-4 pb-0">
        <KeuanganVisualHeader
          datasetNumber={14}
          pdfPages="Satu Data Hal. 2-5 &amp; Analisis Fiskal Satker"
          classification="TERTUTUP"
          periode="SEMESTER / TAHUNAN"
          title="ANALISIS SURPLUS DAN DEFISIT SETIAP UNIT KERJA &amp; BADAN USAHA"
          visualName="Visualisasi Kinerja Fiskal: Pendapatan vs Belanja &amp; Net Surplus/Defisit per Unit"
          attributes={[
            'UNIT KERJA',
            'PENDAPATAN',
            'BELANJA',
            'SURPLUS / DEFISIT',
            'STATUS FISKAL',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('surplus_defisit_unit')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Filter Status: Semua / Surplus / Defisit */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    statusFilter === 'ALL'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua ({SURPLUS_DEFISIT_UNIT_DATA.length})
                </button>
                <button
                  onClick={() => setStatusFilter('SURPLUS')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    statusFilter === 'SURPLUS'
                      ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  Surplus ({totals.unitSurplusCount})
                </button>
                <button
                  onClick={() => setStatusFilter('DEFISIT')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    statusFilter === 'DEFISIT'
                      ? 'bg-rose-600 text-white shadow-2xs font-bold'
                      : 'text-rose-700 hover:text-rose-900'
                  }`}
                >
                  Defisit ({totals.unitDefisitCount})
                </button>
              </div>

              {/* View Switcher: Diverging vs Comparison vs Table */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('diverging')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'diverging'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Diverging Net Surplus/Defisit Chart"
                >
                  <Scale className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Net Surplus/Defisit</span>
                </button>
                <button
                  onClick={() => setViewMode('comparison')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'comparison'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Komparasi Pendapatan vs Belanja"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden sm:inline">Pendapatan vs Belanja</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tabel Rincian Fiskal"
                >
                  <TableIcon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Tabel</span>
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV Surplus Defisit"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* KPI Highlights: 4 Ringkasan Fiskal Konsolidasi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Pendapatan</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              Konsolidasi
            </span>
          </div>
          <div className="text-base font-bold text-emerald-700">
            {formatMiliar(totals.totalPendapatan)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Dari {SURPLUS_DEFISIT_UNIT_DATA.length} Unit Kerja / Badan Usaha
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Belanja</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
              Operasional &amp; Modal
            </span>
          </div>
          <div className="text-base font-bold text-slate-800">
            {formatMiliar(totals.totalBelanja)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Realisasi Pengeluaran Satker
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Surplus Bersih Satker</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              Fiskal Positif
            </span>
          </div>
          <div className="text-base font-bold text-emerald-700">
            +{formatMiliar(totals.totalSurplus)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Pendapatan &gt; Belanja ({totals.unitSurplusCount} Unit Surplus)
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Rasio Cakupan Fiskal</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
              {totals.ratio.toFixed(1)}%
            </span>
          </div>
          <div className="text-base font-bold text-indigo-700">Mandiri &amp; Surplus</div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Pendapatan menutup 1,52x total belanja
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'diverging' ? (
          /* Visualisasi 1: Diverging Bar Chart (Surplus ke kanan Hijau, Defisit ke kiri Merah) */
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Diagram Divergen Net Surplus (+) dan Defisit (-) per Unit (Satuan Miliar Rupiah)
                </span>
                <span className="text-[10.5px] text-slate-500">
                  Batang Hijau ke kanan = Surplus (Pendapatan &gt; Belanja) • Batang Merah ke kiri = Defisit (Belanja &gt; Pendapatan)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                  Surplus
                </span>
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-3 h-3 rounded bg-rose-600 inline-block" />
                  Defisit
                </span>
              </div>
            </div>

            <div className="h-[320px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={divergingData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    tick={{ fill: '#64748B', fontSize: 10.5 }}
                    unit=" M"
                    domain={[-60, 180]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val: any, name: any, item: any) => [
                      `${val >= 0 ? '+' : ''}Rp ${Number(val).toLocaleString('id-ID')} Miliar (${item.payload.status})`,
                      `Net Surplus/Defisit`,
                    ]}
                    labelFormatter={(label, items) => {
                      const p = items?.[0]?.payload;
                      if (!p) return label;
                      return `${p.fullName} | Pendapatan: Rp ${p.pendapatanM} M • Belanja: Rp ${p.belanjaM} M`;
                    }}
                  />
                  <ReferenceLine x={0} stroke="#475569" strokeWidth={2} />
                  <Bar dataKey="surplusDefisitM" radius={[4, 4, 4, 4]} maxBarSize={22}>
                    {divergingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.surplusDefisitM >= 0 ? '#059669' : '#E11D48'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : viewMode === 'comparison' ? (
          /* Visualisasi 2: Grouped Bar Chart (Pendapatan vs Belanja secara berdampingan) */
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Komparasi Nilai Pendapatan vs Belanja per Unit (Miliar Rupiah)
                </span>
                <span className="text-[10.5px] text-slate-500">
                  Perbandingan langsung kapasitas penerimaan mandiri terhadap beban pengeluaran operasional
                </span>
              </div>
            </div>

            <div className="h-[320px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10.5 }} unit=" M" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
                    width={140}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')} Miliar`,
                      name === 'pendapatanM' ? 'Pendapatan' : 'Belanja',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    formatter={(val) => (
                      <span className="text-xs font-semibold text-slate-700">
                        {val === 'pendapatanM' ? 'Pendapatan (Miliar Rp)' : 'Belanja (Miliar Rp)'}
                      </span>
                    )}
                  />
                  <Bar
                    dataKey="pendapatanM"
                    name="pendapatanM"
                    fill="#059669"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={16}
                  />
                  <Bar
                    dataKey="belanjaM"
                    name="belanjaM"
                    fill="#E11D48"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Visualisasi 3: Tabel Kinerja Fiskal Unit */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rincian Kinerja Fiskal per Unit Kerja
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Unit / Kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[360px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Unit Kerja / Badan Usaha</th>
                      <th className="py-2.5 px-3">Kategori</th>
                      <th className="py-2.5 px-3 text-right">Pendapatan (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Belanja (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Surplus / Defisit (Rp)</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-right">Coverage Ratio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredUnits.map((u) => {
                      const isSurplus = u.status === 'SURPLUS';
                      return (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-sans">
                            <span className="font-bold text-slate-900 block">{u.unit}</span>
                            <span className="text-[11px] text-slate-500 font-normal">{u.namaLengkap}</span>
                          </td>
                          <td className="py-2.5 px-3 font-sans text-slate-600 text-[11px]">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                              {u.kategori}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold text-emerald-700">
                            {u.pendapatan.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-700">
                            {u.belanja.toLocaleString('id-ID')}
                          </td>
                          <td
                            className={`py-2.5 px-3 text-right font-bold ${
                              isSurplus ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {isSurplus ? '+' : ''}
                            {u.surplusDefisit.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-center font-sans">
                            <span
                              className={`px-2 py-0.5 rounded text-[10.5px] font-bold inline-flex items-center gap-1 ${
                                isSurplus
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {isSurplus ? (
                                <TrendingUp className="w-3 h-3 text-emerald-700" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-rose-700" />
                              )}
                              {u.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] ${
                                u.coverageRatio >= 100
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {u.coverageRatio.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Konsolidasi Total Row */}
                    <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                      <td className="py-2.5 px-3 font-sans">TOTAL KONSOLIDASI</td>
                      <td className="py-2.5 px-3 font-sans text-slate-500">Semua Unit</td>
                      <td className="py-2.5 px-3 text-right text-emerald-800">
                        {totals.totalPendapatan.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-800">
                        {totals.totalBelanja.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-800">
                        +{totals.totalSurplus.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-center font-sans">
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-200 text-emerald-900">
                          SURPLUS NET
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-indigo-800">
                        {totals.ratio.toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-1">
        <span>
          <strong>Kemandirian Fiskal Satker:</strong> Unit Badan Usaha (Pelabuhan, Lahan, Bandara, RSBP) menghasilkan surplus untuk menopang layanan publik &amp; birokrasi penunjang.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 2-5</span>
      </div>
    </div>
  );
};
