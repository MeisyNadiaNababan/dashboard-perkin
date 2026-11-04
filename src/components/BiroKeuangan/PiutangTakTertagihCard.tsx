import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  Table as TableIcon,
  BarChart3,
  Clock,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import {
  PIUTANG_AGING_DURATION_DATA,
  PIUTANG_TAK_TERTAGIH_DATA,
  PiutangAgingDurationBracket,
} from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface PiutangTakTertagihCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PiutangTakTertagihCard: React.FC<PiutangTakTertagihCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Total Piutang Keseluruhan
  const totalHutangKeseluruhan = useMemo(() => {
    return PIUTANG_AGING_DURATION_DATA.reduce((acc, curr) => acc + curr.totalHutang, 0);
  }, []);

  const totalFakturKeseluruhan = useMemo(() => {
    return PIUTANG_AGING_DURATION_DATA.reduce((acc, curr) => acc + curr.jumlahFaktur, 0);
  }, []);

  // Filtered Invoices if drill-down is used
  const filteredInvoices = useMemo(() => {
    let list = PIUTANG_TAK_TERTAGIH_DATA;
    if (selectedDuration !== 'all') {
      list = list.filter((item) => item.bracketDurasi === selectedDuration);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.namaPelanggan.toLowerCase().includes(q) ||
          item.nomorFaktur.toLowerCase().includes(q) ||
          item.unitLayanan.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedDuration, searchQuery]);

  const formatRupiah = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  const formatMiliar = (val: number) => {
    return `Rp ${(val / 1e9).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} M`;
  };

  const chartData = useMemo(() => {
    return PIUTANG_AGING_DURATION_DATA.map((item) => ({
      durasi: item.durasi,
      singkat: item.singkat,
      totalHutangMiliar: item.totalHutangMiliar,
      totalHutangExact: item.totalHutang,
      jumlahFaktur: item.jumlahFaktur,
      persentase: item.persentase,
      status: item.statusKolektibilitas,
      color: item.color,
      tindakan: item.tindakanPenagihan,
    }));
  }, []);

  const handleExportCsv = () => {
    const headers = [
      'Lamanya Piutang',
      'Total Hutang (Rp)',
      'Total Hutang (Miliar)',
      'Jumlah Faktur',
      'Porsi (%)',
      'Status Kolektibilitas',
      'Tindakan Penagihan',
    ];
    const rows = PIUTANG_AGING_DURATION_DATA.map((item) => [
      `"${item.durasi}"`,
      item.totalHutang,
      item.totalHutangMiliar,
      item.jumlahFaktur,
      item.persentase,
      `"${item.statusKolektibilitas}"`,
      `"${item.tindakanPenagihan}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'REKAPITULASI_PIUTANG_BERDASARKAN_LAMANYA_BP_BATAM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standard Header */}
      <div className="p-4 pb-0">
        <KeuanganVisualHeader
          datasetNumber={20}
          pdfPages="Hal. 5"
          classification="TERTUTUP"
          periode="PERTAHUN / JIKA UPDATE"
          title="REKAPITULASI PIUTANG TAK TERTAGIH"
          visualName="Visualisasi Jumlah Piutang Berdasarkan Lamanya (30 Hari, 60 Hari, 90 Hari, 180 Hari, 365 Hari, >1 Tahun)"
          attributes={[
            'LAMANYA PIUTANG',
            'TOTAL HUTANG (RP)',
            'JUMLAH FAKTUR',
            '% PORSI',
            'STATUS KOLEKTIBILITAS',
          ]}
          onOpenFormula={() =>
            onOpenFormulaModal && onOpenFormulaModal('piutang_tak_tertagih')
          }
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Duration Filter Dropdown / Pill */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <span className="text-[10.5px] font-semibold text-slate-500 pl-2 pr-1">
                  Durasi:
                </span>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="bg-white text-slate-800 font-medium text-xs px-2 py-1 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
                >
                  <option value="all">Semua Lamanya Piutang</option>
                  {PIUTANG_AGING_DURATION_DATA.map((b) => (
                    <option key={b.durasi} value={b.durasi}>
                      {b.durasi} ({formatMiliar(b.totalHutang)})
                    </option>
                  ))}
                </select>
              </div>

              {/* View Switcher */}
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
                  <span>Grafik Lamanya</span>
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
                  <span>Tabel Rekap</span>
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

      {/* KPI Highlights: Total Hutang Keseluruhan */}
      <div className="p-3 bg-slate-50/70 border-b border-slate-200">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Total Keseluruhan Piutang
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                Semua Lamanya Jatuh Tempo
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {formatMiliar(totalHutangKeseluruhan)}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {formatRupiah(totalHutangKeseluruhan)} • {totalFakturKeseluruhan} Faktur Terbuka
            </div>
          </div>

          {/* Quick breakdown hint */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-[9.5px] uppercase font-bold text-emerald-800">≤ 30 Hari</div>
              <div className="font-bold text-emerald-700">Rp 48,65 M</div>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-sky-50 border border-sky-200">
              <div className="text-[9.5px] uppercase font-bold text-sky-800">31-60 Hari</div>
              <div className="font-bold text-sky-700">Rp 29,40 M</div>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-[9.5px] uppercase font-bold text-amber-800">61-90 Hari</div>
              <div className="font-bold text-amber-700">Rp 18,75 M</div>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-[9.5px] uppercase font-bold text-purple-800">&gt; 365 Hari</div>
              <div className="font-bold text-purple-700">Rp 44,75 M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {viewMode === 'chart' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                Visualisasi Total Hutang Berdasarkan Lamanya (Miliar Rupiah)
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                {selectedDuration === 'all'
                  ? 'Menampilkan 6 Kategori Durasi Tunggakan'
                  : `Difilter: Kategori ${selectedDuration}`}
              </span>
            </div>

            <div className="h-[280px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 25, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="durasi"
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    label={{
                      value: 'Total Hutang (Rp Miliar)',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#64748B',
                      fontSize: 10.5,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#CBD5E1',
                      borderRadius: '8px',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val: any, name: any, item: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID', { minimumFractionDigits: 2 })} Miliar (${formatRupiah(item.payload.totalHutangExact)})`,
                      `Total Hutang (${item.payload.durasi})`,
                    ]}
                    labelFormatter={(label) => `Lamanya: ${label}`}
                  />
                  <Bar
                    dataKey="totalHutangMiliar"
                    name="Total Hutang (Rp Miliar)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                    onClick={(entry: any) =>
                      setSelectedDuration(
                        selectedDuration === entry?.durasi ? 'all' : (entry?.durasi || 'all')
                      )
                    }
                    className="cursor-pointer"
                  >
                    <LabelList
                      dataKey="totalHutangMiliar"
                      position="top"
                      formatter={(val: any) => `Rp ${Number(val).toLocaleString('id-ID', { minimumFractionDigits: 1 })} M`}
                      style={{ fontSize: '10.5px', fill: '#1E293B', fontWeight: 'bold' }}
                    />
                    {chartData.map((entry, index) => {
                      const isHighlighted =
                        selectedDuration === 'all' || selectedDuration === entry.durasi;
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={isHighlighted ? 1 : 0.35}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Drill-down list if filtered or available */}
            {selectedDuration !== 'all' && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Contoh Berkas / Faktur dengan Lamanya: {selectedDuration}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {filteredInvoices.length} Faktur Terdata
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs bg-white border border-slate-200 rounded-lg">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Nama Pelanggan / Debitur</th>
                        <th className="py-2 px-3">Nomor Faktur</th>
                        <th className="py-2 px-3">Jatuh Tempo</th>
                        <th className="py-2 px-3 text-center">Lamanya (Hari)</th>
                        <th className="py-2 px-3 text-right">Saldo Hutang (Rp)</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-sans font-bold text-slate-900">
                            {inv.namaPelanggan}
                          </td>
                          <td className="py-2 px-3 text-slate-600">{inv.nomorFaktur}</td>
                          <td className="py-2 px-3 font-sans text-slate-700">
                            {inv.tanggalJatuhTempo}
                          </td>
                          <td className="py-2 px-3 text-center font-bold text-amber-700">
                            {inv.umurPiutangHari} Hari
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-rose-700">
                            Rp {inv.saldoPiutangTakTertagih.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {inv.statusKpknl}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Table View: Rekapitulasi Berdasarkan Lamanya */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Tabel Rekapitulasi Total Hutang Berdasarkan Lamanya
              </span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari faktur / debitur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                />
              </div>
            </div>

            {/* Summary Bracket Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Lamanya Piutang</th>
                    <th className="py-2.5 px-3">Klasifikasi Kolektibilitas</th>
                    <th className="py-2.5 px-3 text-center">Jumlah Faktur</th>
                    <th className="py-2.5 px-3 text-right">Total Hutang (Rp)</th>
                    <th className="py-2.5 px-3 text-right">% Porsi</th>
                    <th className="py-2.5 px-3">Tindakan Penagihan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PIUTANG_AGING_DURATION_DATA.map((b) => (
                    <tr
                      key={b.durasi}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedDuration(b.durasi);
                        setViewMode('chart');
                      }}
                      title="Klik untuk melihat grafik kategori ini"
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        <span>{b.durasi}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10.5px] font-bold border ${b.badgeClass}`}
                        >
                          {b.statusKolektibilitas}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-700">
                        {b.jumlahFaktur} Faktur
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        Rp {b.totalHutang.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-700">
                        {b.persentase.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {b.tindakanPenagihan}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300">
                    <td className="py-2.5 px-3 font-sans" colSpan={2}>
                      TOTAL KESELURUHAN PIUTANG
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">
                      {totalFakturKeseluruhan} Faktur
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-800">
                      Rp {totalHutangKeseluruhan.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-800">
                      100.0%
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                      Monitoring &amp; Rekonsiliasi Rutin
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-2">
        <span>
          ⏱️ <strong>Visualisasi Lamanya Piutang:</strong> Menampilkan akumulasi total hutang berdasarkan durasi hari jatuh tempo sesuai PMK Tata Kelola Piutang BLU.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 5 Item 20</span>
      </div>
    </div>
  );
};
