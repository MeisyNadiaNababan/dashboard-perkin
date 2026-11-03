import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Treemap,
  Cell,
} from 'recharts';
import { BIRO_KEUANGAN_MASTER_DATA } from './biroKeuanganData';

// Helper formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatRupiahMiliar = (val?: number): string => {
  if (val === undefined || val === null) return '-';
  return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
};



// Custom Tile Content for Bank Liquidity Treemap
const CustomBankTreemapNode = (props: any) => {
  const { x, y, width, height, name, shortName, saldoMiliar, porsiPersen, color } = props;
  if (!width || !height || width < 15 || height < 15) return null;

  return (
    <g>
      <rect
        x={x + 1.5}
        y={y + 1.5}
        width={width - 3}
        height={height - 3}
        rx={6}
        ry={6}
        fill={color || '#2563eb'}
        stroke="#ffffff"
        strokeWidth={1.5}
      />
      {width > 45 && height > 30 && (
        <foreignObject x={x + 3.5} y={y + 3.5} width={width - 7} height={height - 7}>
          <div className="text-white h-full flex flex-col justify-between overflow-hidden select-none pointer-events-none p-1 leading-tight">
            <div className="truncate">
              <span className="font-bold text-[10px] sm:text-[11px] truncate block text-white">
                {width > 75 ? name : shortName || name}
              </span>
            </div>
            <div>
              <span className="font-mono font-bold text-[10px] sm:text-[11px] block text-white/95 leading-none">
                Rp {saldoMiliar} M
              </span>
              <span className="text-[8.5px] font-semibold bg-black/25 px-1 py-0.2 rounded text-white/90 inline-block mt-0.5 font-mono">
                {porsiPersen}%
              </span>
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

export const BiroKeuanganDeepDive: React.FC = () => {
  // --------------------------------------------------------------------------
  // Summary for Kartu 1: % YTD Capaian Belanja Triwulan Terakhir (TW III 2026)
  // --------------------------------------------------------------------------
  const dataTriwulanTerakhir = useMemo(() => {
    const list = BIRO_KEUANGAN_MASTER_DATA.capaianRealisasiYtd.quarterlyRecords;
    return list[list.length - 1];
  }, []);

  // --------------------------------------------------------------------------
  // Filter States for Kartu 2: Anggaran vs Realisasi
  // --------------------------------------------------------------------------
  const [anggaranTahun, setAnggaranTahun] = useState<string>('2026');
  const [anggaranTriwulan, setAnggaranTriwulan] = useState<string>('Semua Triwulan');
  const [anggaranJenis, setAnggaranJenis] = useState<string>('Semua Jenis');

  const dataAnggaranRealisasi = useMemo(() => {
    const key = `${anggaranTahun}-${anggaranTriwulan}-${anggaranJenis}`;
    const dict = BIRO_KEUANGAN_MASTER_DATA.anggaranVsRealisasi.recordsByFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${anggaranTahun}-Semua Triwulan-Semua Jenis`;
    return dict[fallbackKey] || dict['2026-Semua Triwulan-Semua Jenis'];
  }, [anggaranTahun, anggaranTriwulan, anggaranJenis]);

  const rerataPersentaseRealisasi = useMemo(() => {
    if (!dataAnggaranRealisasi.length) return 0;
    const sum = dataAnggaranRealisasi.reduce((acc, curr) => acc + curr.persentase, 0);
    return sum / dataAnggaranRealisasi.length;
  }, [dataAnggaranRealisasi]);

  // --------------------------------------------------------------------------
  // States & Filters for Kartu 3: Surplus / Defisit per Unit Kerja (Sheet Swap)
  // --------------------------------------------------------------------------
  const [surplusViewMode, setSurplusViewMode] = useState<'chart' | 'table'>('chart');
  const [surplusKategori, setSurplusKategori] = useState<string>('Semua Kategori');
  const [surplusChartType, setSurplusChartType] = useState<'comparison' | 'diverging'>('comparison');

  const rawSurplusRecords = BIRO_KEUANGAN_MASTER_DATA.surplusDefisitUnit.records;

  const filteredSurplusData = useMemo(() => {
    if (surplusKategori === 'Semua Kategori') return rawSurplusRecords;
    return rawSurplusRecords.filter((r) => r.kategori === surplusKategori);
  }, [surplusKategori, rawSurplusRecords]);

  const totalSurplusFiltered = useMemo(() => {
    return filteredSurplusData.reduce((acc, curr) => acc + curr.surplus, 0);
  }, [filteredSurplusData]);

  const totalPendapatanFiltered = useMemo(() => {
    return filteredSurplusData.reduce((acc, curr) => acc + curr.pendapatan, 0);
  }, [filteredSurplusData]);

  const totalBelanjaFiltered = useMemo(() => {
    return filteredSurplusData.reduce((acc, curr) => acc + curr.belanja, 0);
  }, [filteredSurplusData]);

  // States for Kartu 1: YTD Belanja (View Toggle: Grafik vs Tabel)
  const [ytdViewMode, setYtdViewMode] = useState<'chart' | 'table'>('chart');

  // States for Kartu 2: Anggaran vs Realisasi (View Toggle: Grafik vs Tabel)
  const [anggaranViewMode, setAnggaranViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // Filter States for Kartu 4: Penerimaan per Sumber Dana
  // --------------------------------------------------------------------------
  const [sumberDanaUnit, setSumberDanaUnit] = useState<string>('Semua Unit Kerja');
  const [sumberDanaViewMode, setSumberDanaViewMode] = useState<'chart' | 'table'>('chart');

  const dataPenerimaanBulanan = useMemo(() => {
    const dict = BIRO_KEUANGAN_MASTER_DATA.penerimaanSumberDana.monthlyRecords;
    return dict[sumberDanaUnit] || dict['Semua Unit Kerja'];
  }, [sumberDanaUnit]);

  const totalPenerimaanYtd = useMemo(() => {
    return dataPenerimaanBulanan.reduce((acc, curr) => acc + curr.total, 0);
  }, [dataPenerimaanBulanan]);

  // --------------------------------------------------------------------------
  // States for Kartu 5: Piutang (View Toggle: Grafik vs Tabel)
  // --------------------------------------------------------------------------
  const [piutangViewMode, setPiutangViewMode] = useState<'chart' | 'table'>('chart');
  const dataPiutang = BIRO_KEUANGAN_MASTER_DATA.piutangMenurutUmur;

  // --------------------------------------------------------------------------
  // Filter States for Kartu 6: Saldo Bank Real Time Treemap
  // --------------------------------------------------------------------------
  const [saldoKategoriUnit, setSaldoKategoriUnit] = useState<string>('Semua Kategori Unit');
  const [saldoTanggal, setSaldoTanggal] = useState<string>('31 Oktober 2026');
  const [saldoBankViewMode, setSaldoBankViewMode] = useState<'chart' | 'table'>('chart');

  const dataSaldoBank = useMemo(() => {
    const key = `${saldoKategoriUnit}-${saldoTanggal}`;
    const dict = BIRO_KEUANGAN_MASTER_DATA.saldoBankRealTime.byFilter;
    return dict[key] || dict['Semua Kategori Unit-31 Oktober 2026'];
  }, [saldoKategoriUnit, saldoTanggal]);

  const bankTreemapFormattedData = useMemo(() => {
    return [
      {
        name: 'Saldo Kas & Bank',
        children: dataSaldoBank.banks.map((b) => ({
          name: b.name,
          shortName: b.shortName,
          saldoMiliar: b.saldoMiliar,
          size: b.saldoMiliar,
          porsiPersen: b.porsiPersen,
          kategoriRekening: b.kategoriRekening,
          kegunaanRekening: b.kegunaanRekening,
          color: b.color,
        })),
      },
    ];
  }, [dataSaldoBank]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA)                 */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Capaian Realisasi Belanja dan Penerimaan (YTD)  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Capaian Realisasi Belanja dan Penerimaan (YTD)
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataTriwulanTerakhir ? `${dataTriwulanTerakhir.capaianBelanja.toFixed(1)}%` : '85,5%'}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  % Belanja {dataTriwulanTerakhir?.triwulanTahun || 'TW III 2026'}
                </span>
              </div>
            </div>

            {/* Legenda & Toggle Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">% YTD Belanja</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded-xs bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[11px]">% YTD Penerimaan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-[#ef4444]" />
                  <span className="text-slate-600 font-medium text-[10px]">Target (100%)</span>
                </span>
              </div>

              {/* Sheet Swap Toggle Buttons: Grafik vs Tabel Detail */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setYtdViewMode('chart')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    ytdViewMode === 'chart'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik
                </button>
                <button
                  type="button"
                  onClick={() => setYtdViewMode('table')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    ytdViewMode === 'table'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel Detail
                </button>
              </div>
            </div>
          </div>

          {/* Line Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {ytdViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={BIRO_KEUANGAN_MASTER_DATA.capaianRealisasiYtd.quarterlyRecords}
                  margin={{ top: 12, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="triwulanTahun"
                    tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 115]}
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}%`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <ReferenceLine
                    y={100}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ value: '100%', fill: '#ef4444', fontSize: 9.5, position: 'top' }}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `${Number(val).toFixed(1)}%`,
                      name === 'capaianBelanja' ? '% YTD Capaian Belanja' : '% YTD Capaian Penerimaan',
                    ]}
                    labelFormatter={(label) => `Periode: ${label}`}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="capaianBelanja"
                    name="capaianBelanja"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#2563eb' }}
                    activeDot={{ r: 5.5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="capaianPenerimaan"
                    name="capaianPenerimaan"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#10b981' }}
                    activeDot={{ r: 5.5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Triwulan / Periode</th>
                      <th className="py-1.5 px-2 text-right">Belanja (Rp Miliar)</th>
                      <th className="py-1.5 px-2 text-right">% Capaian Belanja</th>
                      <th className="py-1.5 px-2 text-right">Penerimaan (Rp Miliar)</th>
                      <th className="py-1.5 px-2 text-right">% Capaian PNBP</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {BIRO_KEUANGAN_MASTER_DATA.capaianRealisasiYtd.quarterlyRecords.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.triwulanTahun}</td>
                        <td className="py-1.5 px-2 text-right text-slate-700">{formatRupiahMiliar(row.nominalBelanjaMiliar)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-blue-700">{row.capaianBelanja.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-right text-slate-700">{formatRupiahMiliar(row.nominalPenerimaanMiliar)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{row.capaianPenerimaan.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                            row.capaianBelanja >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {row.capaianBelanja >= 80 ? 'Optimal' : 'Waspada'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.capaianRealisasiYtd.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Anggaran vs Realisasi per Kategori              */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Anggaran vs Realisasi per Kategori
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {rerataPersentaseRealisasi.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Rerata Realisasi
                </span>
              </div>
            </div>

            {/* Legenda & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[11px]">Pagu Anggaran</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">Realisasi (Rp)</span>
                </span>
              </div>

              {/* Filters: Jenis, Triwulan, Tahun & Sheet Swap Toggle */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <select
                  aria-label="Filter Tahun Anggaran"
                  value={anggaranTahun}
                  onChange={(e) => setAnggaranTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {BIRO_KEUANGAN_MASTER_DATA.anggaranVsRealisasi.filterTahunList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Triwulan Anggaran"
                  value={anggaranTriwulan}
                  onChange={(e) => setAnggaranTriwulan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {BIRO_KEUANGAN_MASTER_DATA.anggaranVsRealisasi.filterTriwulanList.map((tw) => (
                    <option key={tw} value={tw}>
                      {tw}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Jenis Belanja"
                  value={anggaranJenis}
                  onChange={(e) => setAnggaranJenis(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer max-w-[110px] truncate"
                >
                  {BIRO_KEUANGAN_MASTER_DATA.anggaranVsRealisasi.filterJenisList.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>

                {/* Sheet Swap Toggle Buttons: Grafik vs Tabel Detail */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAnggaranViewMode('chart')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      anggaranViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnggaranViewMode('table')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      anggaranViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tabel Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clustered Bar Horizontal Chart vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {anggaranViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={dataAnggaranRealisasi}
                  margin={{ top: 2, right: 35, left: 110, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `Rp ${val}M`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="uraian"
                    tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={105}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const pct = item.payload.persentase;
                      if (name === 'realisasi') {
                        return [`${formatRupiahMiliar(num)} (${pct}%)`, 'Realisasi Aktual'];
                      }
                      return [formatRupiahMiliar(num), 'Pagu Anggaran'];
                    }}
                    labelFormatter={(label, items) => {
                      const pct = items && items[0]?.payload?.persentase;
                      return pct ? `${label} • Capaian: ${pct}%` : label;
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar
                    dataKey="anggaran"
                    name="anggaran"
                    fill="#94a3b8"
                    radius={[0, 2, 2, 0]}
                    barSize={10}
                  />
                  <Bar
                    dataKey="realisasi"
                    name="realisasi"
                    fill="#2563eb"
                    radius={[0, 2, 2, 0]}
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Uraian / Jenis Belanja</th>
                      <th className="py-1.5 px-2 text-right">Pagu Anggaran</th>
                      <th className="py-1.5 px-2 text-right">Realisasi Aktual</th>
                      <th className="py-1.5 px-2 text-right">Sisa Anggaran</th>
                      <th className="py-1.5 px-2 text-right">% Capaian</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataAnggaranRealisasi.map((row, idx) => {
                      const sisa = row.anggaran - row.realisasi;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[140px]">{row.uraian}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{formatRupiahMiliar(row.anggaran)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-blue-700">{formatRupiahMiliar(row.realisasi)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-500">{formatRupiahMiliar(sisa)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{row.persentase.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                              row.persentase >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {row.persentase >= 90 ? 'Optimal' : row.persentase >= 80 ? 'Baik' : 'On Track'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                    <tr>
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Belanja</td>
                      <td className="py-1.5 px-2 text-right text-slate-800">
                        {formatRupiahMiliar(dataAnggaranRealisasi.reduce((a, b) => a + b.anggaran, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800">
                        {formatRupiahMiliar(dataAnggaranRealisasi.reduce((a, b) => a + b.realisasi, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-slate-600">
                        {formatRupiahMiliar(dataAnggaranRealisasi.reduce((a, b) => a + (b.anggaran - b.realisasi), 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-emerald-700 font-black">
                        {rerataPersentaseRealisasi.toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                          RERATA
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.anggaranVsRealisasi.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Surplus / Defisit per Unit Kerja (Sheet Swap)   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Surplus / Defisit per Unit Kerja
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {totalSurplusFiltered >= 0 ? `+Rp ${totalSurplusFiltered.toFixed(1)} M` : `-Rp ${Math.abs(totalSurplusFiltered).toFixed(1)} M`}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  (Net Konsolidasi)
                </span>
              </div>
            </div>

            {/* Sub-header Controls: Legenda, Filter Kategori & Sheet Swap Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
              {/* Left Side: Legenda / Sub-mode */}
              {surplusViewMode === 'chart' ? (
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="flex items-center gap-1 text-[10.5px] text-slate-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Pendapatan
                  </span>
                  <span className="flex items-center gap-1 text-[10.5px] text-slate-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Belanja
                  </span>
                  <span className="flex items-center gap-1 text-[10.5px] text-emerald-700 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" /> Surplus
                  </span>
                  <div className="inline-flex rounded border border-slate-200 bg-slate-50 p-0.5 text-[9.5px] ml-1">
                    <button
                      onClick={() => setSurplusChartType('comparison')}
                      className={`px-1.5 py-0.2 rounded font-semibold transition-all cursor-pointer ${
                        surplusChartType === 'comparison'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Komparasi 3-Batang: Pendapatan, Belanja, Surplus"
                    >
                      3-Bar
                    </button>
                    <button
                      onClick={() => setSurplusChartType('diverging')}
                      className={`px-1.5 py-0.2 rounded font-semibold transition-all cursor-pointer ${
                        surplusChartType === 'diverging'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Net Divergen: Positif ke Kanan, Negatif ke Kiri"
                    >
                      Divergen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[10.5px] text-slate-600 font-medium">
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                    6 Unit Surplus
                  </span>
                  <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 font-bold">
                    3 Unit Defisit
                  </span>
                  <span className="text-slate-400">({filteredSurplusData.length} Satker)</span>
                </div>
              )}

              {/* Right Side: Filter Kategori & Sheet Swap Toggle */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Kategori Satker"
                  value={surplusKategori}
                  onChange={(e) => setSurplusKategori(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[125px] truncate"
                >
                  {BIRO_KEUANGAN_MASTER_DATA.surplusDefisitUnit.filterKategoriList.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                {/* Sheet Swap Toggle Buttons: Grafik vs Tabel Detail */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    onClick={() => setSurplusViewMode('chart')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      surplusViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grafik
                  </button>
                  <button
                    onClick={() => setSurplusViewMode('table')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      surplusViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tabel Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Visual or Table Section */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {surplusViewMode === 'chart' ? (
              surplusChartType === 'comparison' ? (
                /* Mode 1: Komparasi 3-Bar (Pendapatan vs Belanja vs Surplus) */
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredSurplusData}
                    margin={{ top: 8, right: 10, left: -15, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="unit"
                      tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={32}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                      tickFormatter={(val) => `Rp ${val}M`}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val: any, name: any, item: any) => {
                        const num = Number(val);
                        const cov = item.payload.coverageRatio;
                        if (name === 'pendapatan') return [`Rp ${num.toFixed(1)} Miliar`, 'Pendapatan'];
                        if (name === 'belanja') return [`Rp ${num.toFixed(1)} Miliar`, 'Belanja'];
                        return [
                          `${num >= 0 ? '+' : ''}Rp ${num.toFixed(1)} Miliar (Coverage: ${cov}%)`,
                          'Surplus / (Defisit)',
                        ];
                      }}
                      labelFormatter={(label, items) => {
                        const fullName = items?.[0]?.payload?.namaLengkap;
                        return fullName ? `${label} • ${fullName}` : label;
                      }}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                      }}
                    />
                    <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1} />
                    <Bar dataKey="pendapatan" name="pendapatan" fill="#2563eb" radius={[2, 2, 0, 0]} barSize={8} />
                    <Bar dataKey="belanja" name="belanja" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={8} />
                    <Bar dataKey="surplus" name="surplus" radius={[2, 2, 0, 0]} barSize={8}>
                      {filteredSurplusData.map((entry, index) => (
                        <Cell
                          key={`cell-surplus-${index}`}
                          fill={entry.surplus >= 0 ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                /* Mode 2: Diverging Bar Chart (Net Surplus/Defisit Horizontal) */
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={filteredSurplusData}
                    margin={{ top: 5, right: 30, left: 85, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                      tickFormatter={(val) => `Rp ${val}M`}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="unit"
                      tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip
                      formatter={(val: any, _name: any, item: any) => [
                        `${Number(val) >= 0 ? '+' : ''}Rp ${Number(val).toFixed(1)} Miliar (${item.payload.status}) • Pendapatan: Rp ${item.payload.pendapatan}M, Belanja: Rp ${item.payload.belanja}M`,
                        'Net Surplus/Defisit',
                      ]}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                      }}
                    />
                    <ReferenceLine x={0} stroke="#475569" strokeWidth={1.5} />
                    <Bar dataKey="surplus" radius={[2, 2, 2, 2]} barSize={11}>
                      {filteredSurplusData.map((entry, index) => (
                        <Cell
                          key={`diverge-cell-${index}`}
                          fill={entry.surplus >= 0 ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )
            ) : (
              /* Sheet Swap: Tabel Detail Kinerja Fiskal per Unit Kerja */
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Unit Kerja / Badan Usaha</th>
                      <th className="py-1.5 px-2">Kategori</th>
                      <th className="py-1.5 px-2 text-right">Pendapatan</th>
                      <th className="py-1.5 px-2 text-right">Belanja</th>
                      <th className="py-1.5 px-2 text-right">Surplus / Defisit</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                      <th className="py-1.5 px-2 text-right">Coverage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {filteredSurplusData.map((row) => {
                      const isSurplus = row.surplus >= 0;
                      return (
                        <tr key={row.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[130px]">
                            <span className="block truncate">{row.unit}</span>
                            <span className="text-[9px] text-slate-400 font-normal block truncate">
                              {row.namaLengkap}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 font-sans text-slate-600 text-[9.5px]">
                            <span className="px-1 py-0.2 rounded bg-slate-100 border border-slate-200 inline-block truncate max-w-[100px]">
                              {row.kategori}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-semibold">
                            Rp {row.pendapatan.toFixed(1)} M
                          </td>
                          <td className="py-1.5 px-2 text-right text-slate-600">
                            Rp {row.belanja.toFixed(1)} M
                          </td>
                          <td
                            className={`py-1.5 px-2 text-right font-bold ${
                              isSurplus ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {isSurplus ? '+' : ''}Rp {row.surplus.toFixed(1)} M
                          </td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold inline-block ${
                                isSurplus
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-right">
                            <span
                              className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                                row.coverageRatio >= 100
                                  ? 'text-emerald-700 bg-emerald-50'
                                  : 'text-amber-700 bg-amber-50'
                              }`}
                            >
                              {row.coverageRatio.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Baris Total Konsolidasi */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Konsolidasi</td>
                      <td className="py-1.5 px-2 font-sans text-slate-500">Semua Satker</td>
                      <td className="py-1.5 px-2 text-right text-blue-800">
                        Rp {totalPendapatanFiltered.toFixed(1)} M
                      </td>
                      <td className="py-1.5 px-2 text-right text-slate-800">
                        Rp {totalBelanjaFiltered.toFixed(1)} M
                      </td>
                      <td
                        className={`py-1.5 px-2 text-right font-black ${
                          totalSurplusFiltered >= 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {totalSurplusFiltered >= 0 ? '+' : ''}Rp {totalSurplusFiltered.toFixed(1)} M
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          NET SURPLUS
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-right text-indigo-700">
                        {totalBelanjaFiltered > 0
                          ? ((totalPendapatanFiltered / totalBelanjaFiltered) * 100).toFixed(1)
                          : 0}
                        %
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.surplusDefisitUnit.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Penerimaan per Sumber Dana (Stacked Column)     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penerimaan per Sumber Dana
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(totalPenerimaanYtd)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Penerimaan YTD
                </span>
              </div>
            </div>

            {/* Legenda & Filter Unit Kerja */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" /> Pelabuhan
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Lahan (UWT)
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" /> Bandara
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" /> RSBP
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> SPAM Air
                </span>
              </div>

              {/* Controls: Filter & Sheet Swap */}
              <div className="flex items-center gap-2">
                <select
                  aria-label="Filter Unit Kerja Penerimaan"
                  value={sumberDanaUnit}
                  onChange={(e) => setSumberDanaUnit(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[130px] truncate"
                >
                  {BIRO_KEUANGAN_MASTER_DATA.penerimaanSumberDana.filterUnitList.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>

                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSumberDanaViewMode('chart')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      sumberDanaViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setSumberDanaViewMode('table')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      sumberDanaViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tabel Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stacked Column Chart or Table Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            {sumberDanaViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataPenerimaanBulanan}
                  margin={{ top: 8, right: 15, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 10, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `Rp ${val}M`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const total = item.payload.total;
                      const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                      const map: Record<string, string> = {
                        pelabuhan: 'Jasa Pelabuhan',
                        uwtLahan: 'UWT Pertanahan',
                        bandara: 'Jasa Bandara',
                        rsbpMedis: 'Layanan RSBP',
                        spamAir: 'Air Minum SPAM',
                      };
                      return [`${formatRupiahMiliar(num)} (${pct}%)`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const total = items && items[0]?.payload?.total;
                      return total ? `Bulan ${label} • Total Penerimaan: ${formatRupiahMiliar(total)}` : `Bulan ${label}`;
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar dataKey="pelabuhan" name="pelabuhan" stackId="dana" fill="#1e40af" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="uwtLahan" name="uwtLahan" stackId="dana" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="bandara" name="bandara" stackId="dana" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="rsbpMedis" name="rsbpMedis" stackId="dana" fill="#10b981" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="spamAir" name="spamAir" stackId="dana" fill="#94a3b8" radius={[3, 3, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan</th>
                      <th className="py-1.5 px-2 text-right">Pelabuhan (Rp M)</th>
                      <th className="py-1.5 px-2 text-right">Lahan UWT (Rp M)</th>
                      <th className="py-1.5 px-2 text-right">Bandara (Rp M)</th>
                      <th className="py-1.5 px-2 text-right">RSBP (Rp M)</th>
                      <th className="py-1.5 px-2 text-right">SPAM Air (Rp M)</th>
                      <th className="py-1.5 px-2 text-right">Total (Rp M)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataPenerimaanBulanan.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">Bulan {row.bulan}</td>
                        <td className="py-1.5 px-2 text-right text-blue-900">{row.pelabuhan.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-right text-blue-700">{row.uwtLahan.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-right text-sky-700">{row.bandara.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-right text-emerald-700">{row.rsbpMedis.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{row.spamAir.toFixed(1)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/70">{row.total.toFixed(1)}</td>
                      </tr>
                    ))}
                    {/* Baris Total Kumulatif */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Kumulatif YTD</td>
                      <td className="py-1.5 px-2 text-right text-blue-900">
                        {dataPenerimaanBulanan.reduce((sum, r) => sum + r.pelabuhan, 0).toFixed(1)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-700">
                        {dataPenerimaanBulanan.reduce((sum, r) => sum + r.uwtLahan, 0).toFixed(1)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-sky-700">
                        {dataPenerimaanBulanan.reduce((sum, r) => sum + r.bandara, 0).toFixed(1)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-emerald-700">
                        {dataPenerimaanBulanan.reduce((sum, r) => sum + r.rsbpMedis, 0).toFixed(1)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-slate-600">
                        {dataPenerimaanBulanan.reduce((sum, r) => sum + r.spamAir, 0).toFixed(1)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-700 font-black bg-blue-50/80">
                        {totalPenerimaanYtd.toFixed(1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.penerimaanSumberDana.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Piutang per Pelanggan menurut Umur               */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Piutang per Pelanggan menurut Umur
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(dataPiutang.totalSaldoMiliar)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {dataPiutang.totalPelanggan} Pelanggan Utama
                </span>
              </div>
            </div>

            {/* Legenda & Toggle Mode Grafik | Tabel */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> &lt;1 Tahun
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" /> 1-2 Tahun
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" /> 2-3 Tahun
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" /> &gt;3 Tahun
                </span>
              </div>

              {/* Toggle Grafik | Tabel */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  onClick={() => setPiutangViewMode('chart')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    piutangViewMode === 'chart'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik
                </button>
                <button
                  onClick={() => setPiutangViewMode('table')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    piutangViewMode === 'table'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel
                </button>
              </div>
            </div>
          </div>

          {/* Chart or Table Section */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {piutangViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={dataPiutang.records}
                  margin={{ top: 2, right: 25, left: 110, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `Rp ${val}M`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="namaPelanggan"
                    tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={105}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const total = item.payload.saldoAkhir;
                      const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                      const map: Record<string, string> = {
                        kurang1Tahun: 'Usia <1 Tahun (Lancar)',
                        antara1sd2Tahun: 'Usia 1-2 Tahun (Kurang Lancar)',
                        antara2sd3Tahun: 'Usia 2-3 Tahun (Diragukan)',
                        lebih3Tahun: 'Usia >3 Tahun (Macet)',
                      };
                      return [`${formatRupiahMiliar(num)} (${pct}%)`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const total = items && items[0]?.payload?.saldoAkhir;
                      return total ? `${label} • Total Saldo: ${formatRupiahMiliar(total)}` : label;
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar dataKey="kurang1Tahun" name="kurang1Tahun" stackId="piutang" fill="#2563eb" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="antara1sd2Tahun" name="antara1sd2Tahun" stackId="piutang" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="antara2sd3Tahun" name="antara2sd3Tahun" stackId="piutang" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="lebih3Tahun" name="lebih3Tahun" stackId="piutang" fill="#ef4444" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="py-1 px-2">Nama Pelanggan</th>
                      <th className="py-1 px-2 text-right">&lt;1 Th</th>
                      <th className="py-1 px-2 text-right">1-2 Th</th>
                      <th className="py-1 px-2 text-right">2-3 Th</th>
                      <th className="py-1 px-2 text-right">&gt;3 Th</th>
                      <th className="py-1 px-2 text-right">Saldo Akhir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataPiutang.records.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1 px-2 font-sans font-semibold text-slate-900 truncate max-w-[120px]">
                          {row.namaPelanggan}
                        </td>
                        <td className="py-1 px-2 text-right text-blue-700">{row.kurang1Tahun}</td>
                        <td className="py-1 px-2 text-right text-sky-600">{row.antara1sd2Tahun}</td>
                        <td className="py-1 px-2 text-right text-amber-600">{row.antara2sd3Tahun}</td>
                        <td className="py-1 px-2 text-right text-red-600">{row.lebih3Tahun}</td>
                        <td className="py-1 px-2 text-right font-bold text-slate-900">
                          {formatRupiahMiliar(row.saldoAkhir)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.piutangMenurutUmur.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Saldo Bank per Bank & Kategori Rekening         */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Saldo Bank per Bank dan Kategori Rekening
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(dataSaldoBank.totalSaldoMiliar)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {dataSaldoBank.jumlahBank} Bank Mitra
                </span>
              </div>
            </div>

            {/* Legenda & Filter Kategori Unit & Tanggal */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" /> Mandiri
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> BRI
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" /> BNI
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0d9488]" /> BRKS
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <select
                    aria-label="Filter Kategori Unit Saldo Bank"
                    value={saldoKategoriUnit}
                    onChange={(e) => setSaldoKategoriUnit(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[130px] truncate"
                  >
                    {BIRO_KEUANGAN_MASTER_DATA.saldoBankRealTime.filterKategoriUnitList.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Filter Tanggal Rekap Saldo Bank"
                    value={saldoTanggal}
                    onChange={(e) => setSaldoTanggal(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                  >
                    {BIRO_KEUANGAN_MASTER_DATA.saldoBankRealTime.filterTanggalList.map((d) => (
                      <option key={d} value={d}>
                        {d.replace('2026', '26')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSaldoBankViewMode('chart')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      saldoBankViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaldoBankViewMode('table')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      saldoBankViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tabel Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Treemap or Table Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            {saldoBankViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={bankTreemapFormattedData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                  content={<CustomBankTreemapNode />}
                >
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const p = item.payload;
                      return [
                        `${formatRupiahMiliar(p.saldoMiliar || val)} (${p.porsiPersen}%) • ${p.kategoriRekening} • ${p.kegunaanRekening}`,
                        p.name,
                      ];
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                </Treemap>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Nama Bank Mitra</th>
                      <th className="py-1.5 px-2">Kategori Rekening</th>
                      <th className="py-1.5 px-2">Kegunaan Operasional</th>
                      <th className="py-1.5 px-2 text-right">Saldo Kas</th>
                      <th className="py-1.5 px-2 text-right">Porsi</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataSaldoBank.banks.map((bank, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-xs shrink-0"
                            style={{ backgroundColor: bank.color }}
                          />
                          <span className="truncate">{bank.name}</span>
                        </td>
                        <td className="py-1.5 px-2 font-sans text-slate-600 text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 inline-block">
                            {bank.kategoriRekening}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 font-sans text-slate-600 text-[10px] truncate max-w-[120px]">
                          {bank.kegunaanRekening}
                        </td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900">
                          {formatRupiahMiliar(bank.saldoMiliar)}
                        </td>
                        <td className="py-1.5 px-2 text-right text-blue-700 font-semibold">
                          {bank.porsiPersen.toFixed(1)}%
                        </td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Aktif
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Baris Total Saldo Konsolidasi */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={3}>
                        Total Saldo Kas Konsolidasi ({dataSaldoBank.jumlahBank} Bank Mitra)
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">
                        {formatRupiahMiliar(dataSaldoBank.totalSaldoMiliar)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-700 font-black">
                        100.0%
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                          Reconciled
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.saldoBankRealTime.datasetName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
