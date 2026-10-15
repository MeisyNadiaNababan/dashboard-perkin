import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  Table as TableIcon,
  LayoutGrid,
  RefreshCw,
  Landmark,
} from 'lucide-react';
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SALDO_BANK_REALTIME_DATA } from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface SaldoBankRealTimeCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

const BANK_COLORS = [
  '#0284C7', // Mandiri (Sky)
  '#059669', // BRI (Emerald)
  '#EA580C', // BNI (Orange)
  '#6366F1', // BRK Syariah (Indigo)
  '#D97706', // BTN (Amber)
  '#0D9488', // BCA (Teal)
];

// Custom Treemap Tile Content
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, value, nomorRekening, color, percent } = props;
  if (!width || !height || width < 25 || height < 25) return null;

  return (
    <g>
      <rect
        x={x + 2}
        y={y + 2}
        width={width - 4}
        height={height - 4}
        rx={8}
        ry={8}
        fill={color || '#0284C7'}
        stroke="#ffffff"
        strokeWidth={2}
        className="transition-all hover:opacity-90 cursor-pointer"
      />
      {width > 65 && height > 40 && (
        <foreignObject x={x + 8} y={y + 8} width={width - 16} height={height - 16}>
          <div className="text-white h-full flex flex-col justify-between overflow-hidden select-none pointer-events-none p-0.5">
            <div>
              <p className="font-bold text-xs sm:text-sm truncate drop-shadow-sm leading-tight">
                {name}
              </p>
              {width > 120 && height > 65 && (
                <p className="text-[10px] font-mono text-white/85 truncate mt-0.5">
                  Rek: {nomorRekening}
                </p>
              )}
            </div>
            <div>
              <p className="font-mono font-bold text-xs sm:text-base drop-shadow-sm">
                Rp {(value / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9.5px] font-bold bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-xs font-mono">
                  {percent}% Pangsa
                </span>
              </div>
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

export const SaldoBankRealTimeCard: React.FC<SaldoBankRealTimeCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'treemap' | 'table'>('treemap');

  // Filter bank items
  const filteredBanks = useMemo(() => {
    if (!searchQuery.trim()) return SALDO_BANK_REALTIME_DATA;
    const q = searchQuery.toLowerCase().trim();
    return SALDO_BANK_REALTIME_DATA.filter(
      (b) =>
        b.namaBank.toLowerCase().includes(q) ||
        b.nomorRekening.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalSaldo = useMemo(() => {
    return filteredBanks.reduce((acc, b) => acc + b.nilaiSaldo, 0);
  }, [filteredBanks]);

  // Treemap data format
  const treemapData = useMemo(() => {
    return [
      {
        name: 'Saldo Kas Bank',
        children: filteredBanks.map((b, idx) => ({
          name: b.namaBank.replace(' (Persero) Tbk', '').replace(' Tbk', ''),
          fullName: b.namaBank,
          nomorRekening: b.nomorRekening,
          size: b.nilaiSaldo,
          value: b.nilaiSaldo,
          percent: totalSaldo > 0 ? ((b.nilaiSaldo / totalSaldo) * 100).toFixed(1) : '0',
          color: BANK_COLORS[idx % BANK_COLORS.length],
        })),
      },
    ];
  }, [filteredBanks, totalSaldo]);

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['Nama Bank', 'Nomor Rekening', 'Nilai Saldo (Rp)'];
    const rows = filteredBanks.map((b) => [
      `"${b.namaBank}"`,
      `"${b.nomorRekening}"`,
      b.nilaiSaldo,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SALDO_BANK_REAL_TIME_BP_BATAM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standard Header */}
      <div className="p-4 pb-0">
        <KeuanganVisualHeader
          datasetNumber={13}
          pdfPages="Hal. 4"
          classification="TERTUTUP"
          periode="PERBULAN (REAL-TIME)"
          title="LAPORAN SALDO BANK REAL TIME"
          visualName="Treemap Proporsi Likuiditas Saldo Rekening Bank Operasional BLU"
          attributes={['NAMA BANK', 'NOMOR REKENING', 'NILAI SALDO']}
          onOpenFormula={() => onOpenFormulaModal && onOpenFormulaModal('saldo_bank_realtime')}
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                className="px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 cursor-pointer"
                title="Sinkronisasi Saldo Real-Time"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-sky-600 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline">Sinkron Live</span>
              </button>

              {/* View Switcher: Treemap vs Table */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setViewMode('treemap')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'treemap'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Treemap Saldo</span>
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
                  <span>Tabel Rekening</span>
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV Saldo Bank"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* Main Content: Treemap or Clean 3-Attribute Table (KPI Strip REMOVED per user request) */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'treemap' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Treemap Distribusi Likuiditas Kas Bank (Proporsional per Rekening Mitra)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Total Saldo Terpantau: Rp {totalSaldo.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="h-[290px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={treemapData[0].children}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                  content={<CustomTreemapContent />}
                >
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val: any, name: any, item: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')}`,
                      `Nomor Rekening: ${item?.payload?.nomorRekening || ''}`,
                    ]}
                  />
                </Treemap>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          /* Table: Strictly Concise (Nama Bank, Nomor Rekening, Nilai Saldo) */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Rincian Rekening Bank &amp; Saldo Terkini
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Bank / No Rekening..."
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
                    <th className="py-2.5 px-3">Nama Bank</th>
                    <th className="py-2.5 px-3">Nomor Rekening</th>
                    <th className="py-2.5 px-3 text-right">Nilai Saldo (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredBanks.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-sans font-semibold text-slate-900 flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-sky-700 shrink-0" />
                        <span>{b.namaBank}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 font-mono font-medium">
                        {b.nomorRekening}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-sky-700">
                        Rp {b.nilaiSaldo.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                    <td className="py-2.5 px-3 font-sans">TOTAL SALDO REAL-TIME</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600">6 Rekening Operasional BLU</td>
                    <td className="py-2.5 px-3 text-right text-emerald-800">
                      Rp {totalSaldo.toLocaleString('id-ID')}
                    </td>
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
          <strong>Integrasi Host-to-Host (H2H) CMS:</strong> Data saldo termutakhir dari Bank Mandiri, BRI, BNI, BRK Syariah, BTN, dan BCA.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 4 Item 13</span>
      </div>
    </div>
  );
};
