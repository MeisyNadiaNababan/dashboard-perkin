import React, { useState, useMemo } from 'react';
import {
  FileText,
  TrendingUp,
  Download,
  Search,
  CheckCircle2,
  Table as TableIcon,
  BarChart3,
  PieChart as PieChartIcon,
  ChevronDown,
  ChevronUp,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
} from 'recharts';
import { LRA_BLU_OFFICIAL_DATA, LRA_SUMMARY, LraItem } from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface LraBluCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type LraViewMode = 'chart' | 'table';

export const LraBluCard: React.FC<LraBluCardProps> = ({ onOpenFormulaModal }) => {
  const [viewMode, setViewMode] = useState<LraViewMode>('chart');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');

  // Format IDR in Billions or exact
  const formatMiliar = (val: number) => {
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  const formatTriliun = (val: number) => {
    return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return LRA_BLU_OFFICIAL_DATA;
    const q = searchQuery.toLowerCase().trim();
    return LRA_BLU_OFFICIAL_DATA.filter((item) =>
      item.uraian.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Combined Belanja Barang (Barang + Modal)
  const belanjaGabungan = useMemo(() => {
    return {
      2025: {
        anggaran: 1412273964000 + 659123101000, // Rp 2.071,4 M
        realisasi: 356713746777 + 44816510190, // Rp 401,5 M
        persen: 19.4,
      },
      2026: {
        anggaran: 1673924064000 + 1364249812000, // Rp 3.038,2 M
        realisasi: 389535835159 + 66945264621, // Rp 456,5 M
        persen: 15.0,
      },
    };
  }, []);

  // Chart data for selected year ONLY (no side-by-side multiple realization clutter)
  const chartData = useMemo(() => {
    if (selectedYear === '2025') {
      return [
        {
          name: 'Pendapatan BLU',
          anggaran: LRA_SUMMARY.pendapatan.anggaran2025 / 1e9,
          realisasi: LRA_SUMMARY.pendapatan.realisasi2025 / 1e9,
          persen: LRA_SUMMARY.pendapatan.persentase2025,
          color: '#059669',
        },
        {
          name: 'Belanja Barang',
          anggaran: belanjaGabungan[2025].anggaran / 1e9,
          realisasi: belanjaGabungan[2025].realisasi / 1e9,
          persen: belanjaGabungan[2025].persen,
          color: '#0284C7',
        },
        {
          name: 'Total Belanja Negara',
          anggaran: belanjaGabungan[2025].anggaran / 1e9,
          realisasi: belanjaGabungan[2025].realisasi / 1e9,
          persen: belanjaGabungan[2025].persen,
          color: '#6366F1',
        },
      ];
    }

    // 2026
    return [
      {
        name: 'Pendapatan BLU',
        anggaran: LRA_SUMMARY.pendapatan.anggaran2026 / 1e9,
        realisasi: LRA_SUMMARY.pendapatan.realisasi2026 / 1e9,
        persen: LRA_SUMMARY.pendapatan.persentase2026,
        color: '#059669',
      },
      {
        name: 'Belanja Barang',
        anggaran: belanjaGabungan[2026].anggaran / 1e9,
        realisasi: belanjaGabungan[2026].realisasi / 1e9,
        persen: belanjaGabungan[2026].persen,
        color: '#0284C7',
      },
      {
        name: 'Total Belanja Negara',
        anggaran: LRA_SUMMARY.belanja.anggaran2026 / 1e9,
        realisasi: LRA_SUMMARY.belanja.realisasi2026 / 1e9,
        persen: LRA_SUMMARY.belanja.persentase2026,
        color: '#6366F1',
      },
    ];
  }, [selectedYear, belanjaGabungan]);

  // Dynamic KPI values based on selected year
  const activePendapatan =
    selectedYear === '2025'
      ? {
          realisasi: LRA_SUMMARY.pendapatan.realisasi2025,
          anggaran: LRA_SUMMARY.pendapatan.anggaran2025,
          persen: LRA_SUMMARY.pendapatan.persentase2025,
        }
      : {
          realisasi: LRA_SUMMARY.pendapatan.realisasi2026,
          anggaran: LRA_SUMMARY.pendapatan.anggaran2026,
          persen: LRA_SUMMARY.pendapatan.persentase2026,
        };

  const activeBelanja =
    selectedYear === '2025'
      ? {
          realisasi: belanjaGabungan[2025].realisasi,
          anggaran: belanjaGabungan[2025].anggaran,
          persen: belanjaGabungan[2025].persen,
        }
      : {
          realisasi: belanjaGabungan[2026].realisasi,
          anggaran: belanjaGabungan[2026].anggaran,
          persen: belanjaGabungan[2026].persen,
        };

  const activeSurplus = activePendapatan.realisasi - activeBelanja.realisasi;

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Uraian',
      'Anggaran 2026 (Rp)',
      'Realisasi 2026 (Rp)',
      'Selisih (Rp)',
      '% Capaian 2026',
    ];
    const rows = LRA_BLU_OFFICIAL_DATA.map((item) => [
      `"${item.uraian}"`,
      item.anggaran2026,
      item.realisasi2026,
      item.selisih2026,
      item.persentase2026,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'LRA_BLU_BP_BATAM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standard Header */}
      <div className="p-4 pb-0">
        <KeuanganVisualHeader
          datasetNumber={3}
          pdfPages="Hal. 3 &amp; Dokumen LRA Satker BLU"
          classification="TERTUTUP"
          periode="PERTRIWULAN"
          title="LAPORAN REALISASI ANGGARAN BADAN LAYANAN UMUM (LRA BLU)"
          visualName="Realisasi Anggaran (Bar Chart) &amp; Format Resmi LRA Satker BLU"
          attributes={[
            'URAIAN',
            'ANGGARAN',
            'REALISASI',
            'SELISIH',
            '% CAPAIAN',
          ]}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('lra_blu')}
          rightControls={
            <div className="flex items-center gap-2 flex-wrap">
              {/* View Switcher: Renamed from Target vs Realisasi */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'chart'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Grafik Realisasi</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel LRA Resmi</span>
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV LRA BLU"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* KPI Highlights: Merged Belanja Barang & Belanja Modal into Belanja Barang */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        {/* Card 1: Pendapatan BLU */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Pendapatan BLU ({selectedYear})
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              {activePendapatan.persen}% Capaian
            </span>
          </div>
          <div className="text-lg font-bold text-emerald-700">
            {formatMiliar(activePendapatan.realisasi)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Pagu: {formatTriliun(activePendapatan.anggaran)}
          </div>
        </div>

        {/* Card 2: Belanja Barang (Gabungan Barang & Modal) */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Belanja Barang ({selectedYear})
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
              {activeBelanja.persen.toFixed(0)}% Capaian
            </span>
          </div>
          <div className="text-lg font-bold text-sky-700">
            {formatMiliar(activeBelanja.realisasi)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Pagu: {formatTriliun(activeBelanja.anggaran)} (Gabungan Barang &amp; Modal)
          </div>
        </div>

        {/* Card 3: Surplus Kas LRA BLU */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Surplus Kas LRA BLU ({selectedYear})
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
              Surplus Positif
            </span>
          </div>
          <div className="text-lg font-bold text-indigo-700">
            {formatMiliar(activeSurplus)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Realisasi Pendapatan &gt; Total Belanja Negara
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'chart' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Komparasi Anggaran vs Realisasi Tahun {selectedYear} (Miliar Rupiah)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Data Realisasi Tahun {selectedYear}
              </span>
            </div>

            <div className="h-[280px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11 }} />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    label={{
                      value: 'Nilai (Miliar Rupiah)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#64748B',
                      fontSize: 10.5,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: any, name: any) => [
                      `Rp ${Number(value).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Miliar`,
                      name === 'anggaran'
                        ? `Pagu Anggaran ${selectedYear}`
                        : `Realisasi Tahun ${selectedYear}`,
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    formatter={(val) => (
                      <span className="text-xs font-semibold text-slate-700">
                        {val === 'anggaran'
                          ? `Pagu Anggaran ${selectedYear}`
                          : `Realisasi Tahun ${selectedYear}`}
                      </span>
                    )}
                  />
                  <Bar
                    dataKey="anggaran"
                    name="anggaran"
                    fill="#CBD5E1"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                  <Bar
                    dataKey="realisasi"
                    name="realisasi"
                    fill="#0284C7"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Table View: Official Format from PDF LRA Satker BLU (per 30 Juni 2026) */
          /* Kode, Realisasi 2025, and Rincian are REMOVED per user request */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Format Resmi Laporan Realisasi Anggaran Satker BLU (per 30 Juni 2026)
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari uraian LRA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto max-h-[380px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Uraian Akun Anggaran</th>
                      <th className="py-2.5 px-3 text-right">Anggaran 2026 (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Realisasi 2026 (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Selisih (Rp)</th>
                      <th className="py-2.5 px-3 text-right">% Capaian 2026</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">
                          {item.uraian}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-700">
                          {item.anggaran2026.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                          {item.realisasi2026.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">
                          ({Math.abs(item.selisih2026).toLocaleString('id-ID')})
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                              item.persentase2026 >= 30
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.persentase2026}%
                          </span>
                        </td>
                      </tr>
                    ))}

                    {/* Total Row */}
                    <tr className="bg-slate-100/80 font-bold border-t-2 border-slate-300">
                      <td className="py-2.5 px-3 font-sans">Jumlah Belanja Negara</td>
                      <td className="py-2.5 px-3 text-right">
                        {LRA_SUMMARY.belanja.anggaran2026.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-sky-800">
                        {LRA_SUMMARY.belanja.realisasi2026.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        ({(LRA_SUMMARY.belanja.anggaran2026 - LRA_SUMMARY.belanja.realisasi2026).toLocaleString('id-ID')})
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-800">
                        15%
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
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-1">
        <span>
          <strong>Kuasa Pengguna Anggaran (KPA):</strong> {LRA_SUMMARY.meta.penanggungJawab} • Satker {LRA_SUMMARY.meta.kodeSatker}
        </span>
        <span className="text-slate-600 font-mono text-[10.5px]">
          Status Data: FINAL (Dicetak 23/07/26 8:04 AM)
        </span>
      </div>
    </div>
  );
};
