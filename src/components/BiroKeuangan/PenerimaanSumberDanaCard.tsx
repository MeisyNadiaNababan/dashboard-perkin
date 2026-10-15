import React, { useState, useMemo } from 'react';
import {
  Coins,
  Building2,
  Download,
  Search,
  CheckCircle2,
  Table as TableIcon,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Layers,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  PENERIMAAN_SUMBER_DANA_DATA,
  PenerimaanSumberDanaItem,
} from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface PenerimaanSumberDanaCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

const PALETTE = [
  '#0284C7', // Pelabuhan (Sky)
  '#059669', // Lahan (Emerald)
  '#F59E0B', // Bandara (Amber)
  '#EC4899', // Rumah Sakit (Pink)
  '#8B5CF6', // SPAM Fasling (Purple)
  '#14B8A6', // Jasa Giro (Teal)
];

export const PenerimaanSumberDanaCard: React.FC<PenerimaanSumberDanaCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'donut' | 'table'>('donut');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return PENERIMAAN_SUMBER_DANA_DATA;
    const q = searchQuery.toLowerCase().trim();
    return PENERIMAAN_SUMBER_DANA_DATA.filter(
      (item) =>
        item.sumberDana.toLowerCase().includes(q) ||
        item.unitKerja.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalNilai = useMemo(() => {
    return filteredItems.reduce((acc, item) => acc + item.nilai, 0);
  }, [filteredItems]);

  const formatMiliar = (val: number) => {
    return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  const chartData = useMemo(() => {
    return filteredItems.map((item, idx) => ({
      name: item.sumberDana.replace('PNBP ', ''),
      fullName: item.sumberDana,
      unit: item.unitKerja,
      value: Math.round(item.nilai / 1e9),
      exactValue: item.nilai,
      percent: item.pangsaPersen,
      color: PALETTE[idx % PALETTE.length],
    }));
  }, [filteredItems]);

  const handleExportCsv = () => {
    const headers = ['Sumber Dana', 'Unit Kerja', 'Nilai (Rp)', 'Pangsa (%)'];
    const rows = filteredItems.map((item) => [
      `"${item.sumberDana}"`,
      `"${item.unitKerja}"`,
      item.nilai,
      item.pangsaPersen,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'PENERIMAAN_SUMBER_DANA_BP_BATAM.csv');
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
          pdfPages="Hal. 4-5"
          classification="TERTUTUP"
          periode="PERBULAN"
          title="LAPORAN PENERIMAAN SUMBER DANA"
          visualName="Donut Pangsa &amp; Tabel Rincian Penerimaan per Sumber Dana &amp; Satker Penerima"
          attributes={['SUMBER DANA', 'UNIT KERJA', 'NILAI', 'PANGSA (%)']}
          onOpenFormula={() =>
            onOpenFormulaModal && onOpenFormulaModal('penerimaan_sumber_dana')
          }
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* View Switcher */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('donut')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'donut'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Donut Pangsa
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === 'table'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel Sumber Dana</span>
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Total Penerimaan
          </div>
          <div className="text-base font-bold text-sky-700">{formatMiliar(totalNilai)}</div>
          <div className="text-[10.5px] text-slate-500 font-mono">
            Rp {totalNilai.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Kontributor Terbesar #1
          </div>
          <div className="text-base font-bold text-emerald-700">Pelabuhan (35.8%)</div>
          <div className="text-[10.5px] text-slate-500">Nilai: {formatMiliar(295420000000)}</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Kontributor Terbesar #2
          </div>
          <div className="text-base font-bold text-sky-700">Lahan (26.5%)</div>
          <div className="text-[10.5px] text-slate-500">Nilai: {formatMiliar(218750000000)}</div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Jumlah Sumber Dana
          </div>
          <div className="text-base font-bold text-slate-900">6 Aliran Dana Pokok</div>
          <div className="text-[10.5px] text-slate-500">PNBP BLU &amp; Kas Layanan</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'donut' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Donut Chart */}
            <div className="lg:col-span-6 h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any, item: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')} M (${item.payload.percent}%)`,
                      item.payload.fullName,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Side Legend & List */}
            <div className="lg:col-span-6 space-y-1.5">
              <span className="text-xs font-bold text-slate-800 block mb-1">
                Pangsa Penerimaan Berdasarkan Sumber Dana
              </span>
              {chartData.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <div>
                      <div className="font-semibold text-slate-800">{d.fullName}</div>
                      <div className="text-[10.5px] text-slate-500">{d.unit}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{formatMiliar(d.exactValue)}</div>
                    <div className="text-[10.5px] font-bold text-sky-700">{d.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Table: Clean 4 attributes */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rincian Penerimaan Sumber Dana
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Sumber Dana..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Sumber Dana</th>
                    <th className="py-2.5 px-3">Unit Kerja</th>
                    <th className="py-2.5 px-3 text-right">Nilai Penerimaan (Rp)</th>
                    <th className="py-2.5 px-3 text-right">Pangsa (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-sans font-bold text-slate-900">
                        {item.sumberDana}
                      </td>
                      <td className="py-2.5 px-3 font-sans text-slate-600">{item.unitKerja}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                        Rp {item.nilai.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800">
                          {item.pangsaPersen}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                    <td className="py-2.5 px-3 font-sans">TOTAL PENERIMAAN</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">Konsolidasi Seluruh Satker</td>
                    <td className="py-2.5 px-3 text-right text-emerald-800">
                      Rp {totalNilai.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-800">100.0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          <strong>Rekonsiliasi Kas:</strong> Penerimaan disetor langsung ke Rekening Kas BLU dan disahkan secara periodik (SP3B BLU).
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 4-5 Item 14</span>
      </div>
    </div>
  );
};
