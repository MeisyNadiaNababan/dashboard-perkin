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
} from 'recharts';
import { BIRO_KEUANGAN_MASTER_DATA } from './biroKeuanganData';

// Helper formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatRupiahMiliar = (val: number): string => {
  return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
};

// Custom Tile Content for PNBP Treemap
const CustomPnbpTreemapNode = (props: any) => {
  const { x, y, width, height, name, unit, targetMiliar, color } = props;
  if (!width || !height || width < 12 || height < 12) return null;

  return (
    <g>
      <rect
        x={x + 1}
        y={y + 1}
        width={width - 2}
        height={height - 2}
        rx={5}
        ry={5}
        fill={color || '#2563eb'}
        stroke="#ffffff"
        strokeWidth={1.5}
      />
      {width > 42 && height > 28 && (
        <foreignObject x={x + 3} y={y + 3} width={width - 6} height={height - 6}>
          <div className="text-white h-full flex flex-col justify-between overflow-hidden select-none pointer-events-none p-0.5 leading-tight">
            <span className="text-[9px] sm:text-[10px] font-bold truncate block text-white">
              {name}
            </span>
            <div>
              <span className="font-mono font-bold text-[9px] sm:text-[10px] block text-white/95">
                Rp {targetMiliar} M
              </span>
              {height > 44 && unit && (
                <span className="text-[8px] text-white/80 block truncate">
                  {unit}
                </span>
              )}
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
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
  // Filter States for Kartu 3: Target PNBP Treemap
  // --------------------------------------------------------------------------
  const [pnbpTahun, setPnbpTahun] = useState<string>('2026');

  const dataPnbpNodes = useMemo(() => {
    const entry = BIRO_KEUANGAN_MASTER_DATA.targetPnbpTreemap.byTahun[pnbpTahun] ||
      BIRO_KEUANGAN_MASTER_DATA.targetPnbpTreemap.byTahun['2026'];
    return entry;
  }, [pnbpTahun]);

  const pnbpTreemapFormattedData = useMemo(() => {
    return [
      {
        name: 'Target PNBP BP Batam',
        children: dataPnbpNodes.nodes.flatMap((unitNode) =>
          unitNode.children.map((child) => ({
            name: child.name,
            unit: child.unit,
            targetMiliar: child.targetMiliar,
            size: child.targetMiliar,
            tarif: child.tarif,
            volume: child.volume,
            color: child.color,
          }))
        ),
      },
    ];
  }, [dataPnbpNodes]);

  // --------------------------------------------------------------------------
  // Filter States for Kartu 4: Penerimaan per Sumber Dana
  // --------------------------------------------------------------------------
  const [sumberDanaUnit, setSumberDanaUnit] = useState<string>('Semua Unit Kerja');

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

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">% YTD Capaian Belanja</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[11px]">% YTD Capaian Penerimaan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-t border-dashed border-[#ef4444]" />
                <span className="text-slate-600 font-medium text-[10px]">Target Acuan (100%)</span>
              </span>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
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

              {/* Filters: Jenis, Triwulan, Tahun */}
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
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer max-w-[120px] truncate"
                >
                  {BIRO_KEUANGAN_MASTER_DATA.anggaranVsRealisasi.filterJenisList.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Clustered Bar Horizontal Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
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
        {/* BARIS 2 - KARTU 3: Target PNBP per Unit dan Layanan (Treemap)      */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Target PNBP per Unit dan Layanan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(dataPnbpNodes.totalTargetMiliar)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Target PNBP
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex items-center justify-between gap-2 mb-2 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" /> Pelabuhan
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" /> Pertanahan
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0d9488]" /> Bandara
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#7c3aed]" /> RSBP
                </span>
              </div>

              {/* Filter Tahun */}
              <select
                aria-label="Filter Tahun Target PNBP"
                value={pnbpTahun}
                onChange={(e) => setPnbpTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {BIRO_KEUANGAN_MASTER_DATA.targetPnbpTreemap.filterTahunList.map((t) => (
                  <option key={t} value={t}>
                    Th {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Treemap Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={pnbpTreemapFormattedData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={<CustomPnbpTreemapNode />}
              >
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const p = item.payload;
                    return [
                      `${formatRupiahMiliar(p.targetMiliar || val)} • Tarif: ${p.tarif} • Volume: ${p.volume}`,
                      `${p.name} (${p.unit})`,
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
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_KEUANGAN_MASTER_DATA.targetPnbpTreemap.datasetName}
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

              {/* Filter Unit Kerja */}
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
            </div>
          </div>

          {/* Stacked Column Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
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

              {/* Filters */}
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
            </div>
          </div>

          {/* Bank Treemap Section */}
          <div className="flex-1 w-full min-h-0 my-1">
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
