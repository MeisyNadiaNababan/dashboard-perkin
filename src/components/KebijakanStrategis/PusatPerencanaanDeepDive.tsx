import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  PUSAT_PERENCANAAN_MASTER_DATA,
  AlokasiProgramItem,
  SerapanKegiatanItem,
  PanjangJalanItem,
} from './pusatPerencanaanData';

export const PusatPerencanaanDeepDive: React.FC = () => {
  // ==========================================================================
  // KARTU 1: ALOKASI ANGGARAN PER PROGRAM STATES
  // ==========================================================================
  const [alokasiTahun, setAlokasiTahun] = useState<string>('2026');
  const dataAlokasi = useMemo(() => {
    return (
      PUSAT_PERENCANAAN_MASTER_DATA.alokasiAnggaranProgram.byTahun[alokasiTahun] ||
      PUSAT_PERENCANAAN_MASTER_DATA.alokasiAnggaranProgram.byTahun['2026']
    );
  }, [alokasiTahun]);

  // ==========================================================================
  // KARTU 2: KOMPOSISI RKA PER SUMBER DANA STATES
  // ==========================================================================
  const [rkaTahun, setRkaTahun] = useState<string>('2026');
  const dataRka = useMemo(() => {
    return (
      PUSAT_PERENCANAAN_MASTER_DATA.komposisiRkaSumberDana.byTahun[rkaTahun] ||
      PUSAT_PERENCANAAN_MASTER_DATA.komposisiRkaSumberDana.byTahun['2026']
    );
  }, [rkaTahun]);

  // ==========================================================================
  // KARTU 3: SERAPAN PAGU PER KEGIATAN STATES
  // ==========================================================================
  const [serapanTahun, setSerapanTahun] = useState<string>('2026');
  const [serapanTriwulan, setSerapanTriwulan] = useState<string>('Semua Triwulan');
  const dataSerapan = useMemo(() => {
    const key = `${serapanTahun}-${serapanTriwulan}`;
    const dict = PUSAT_PERENCANAAN_MASTER_DATA.serapanPaguKegiatan.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${serapanTahun}-Semua Triwulan`;
    return dict[fallbackKey] || dict['2026-Semua Triwulan'];
  }, [serapanTahun, serapanTriwulan]);

  // ==========================================================================
  // KARTU 4: TARGET INDIKATOR RENSTRA STATES
  // ==========================================================================
  const [renstraSasaran, setRenstraSasaran] = useState<string>('Semua Sasaran');
  const filteredRenstraRecords = useMemo(() => {
    const all = PUSAT_PERENCANAAN_MASTER_DATA.targetIndikatorRenstra.records;
    if (renstraSasaran === 'Semua Sasaran') return all;
    return all.filter((r) => r.sasaranStrategis === renstraSasaran);
  }, [renstraSasaran]);

  // Transform for multi-series LineChart: Array of { tahun: '2025', [id]: val, ... }
  const renstraLineChartData = useMemo(() => {
    const tahunList = PUSAT_PERENCANAAN_MASTER_DATA.targetIndikatorRenstra.tahunList;
    return tahunList.map((th) => {
      const row: Record<string, any> = { tahun: th };
      filteredRenstraRecords.forEach((rec) => {
        row[rec.id] = rec.targetPerTahun[th as keyof typeof rec.targetPerTahun];
      });
      return row;
    });
  }, [filteredRenstraRecords]);

  // ==========================================================================
  // KARTU 5: PENYELESAIAN PERUNTUKAN LAHAN DATA
  // ==========================================================================
  const dataPeruntukanLahan = PUSAT_PERENCANAAN_MASTER_DATA.penyelesaianPeruntukanLahan;

  // ==========================================================================
  // KARTU 6: PANJANG JALAN RENCANA STATES
  // ==========================================================================
  const [jalanFilterTahun, setJalanFilterTahun] = useState<string>('Semua Rencana');
  const dataJalan = useMemo(() => {
    return (
      PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.byFilter[jalanFilterTahun] ||
      PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.byFilter['Semua Rencana']
    );
  }, [jalanFilterTahun]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA h-[430px])       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Alokasi Anggaran per Program (Stacked Bar Horiz)*/}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Alokasi Anggaran per Program
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  Rp {dataAlokasi.totalAlokasiMiliar.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Alokasi TA {alokasiTahun}
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Pusren</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Dit. Infrastruktur</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Dit. Bandara/Pelabuhan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#93c5fd]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Dit. PTSP</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Biro Umum/Keuangan</span>
                </span>
              </div>

              {/* Filter Tahun */}
              <select
                aria-label="Filter Tahun Alokasi Program"
                value={alokasiTahun}
                onChange={(e) => setAlokasiTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {PUSAT_PERENCANAAN_MASTER_DATA.alokasiAnggaranProgram.filterTahunList.map((th) => (
                  <option key={th} value={th}>
                    Th {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacked Horizontal Bar Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataAlokasi.records}
                margin={{ top: 5, right: 30, left: 130, bottom: 0 }}
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
                  dataKey="program"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={125}
                  tickFormatter={(v: string) => (v.length > 22 ? `${v.slice(0, 20)}...` : v)}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const unitMap: Record<string, string> = {
                      pusatPerencanaan: 'Pusat Perencanaan',
                      ditInfrastruktur: 'Dit. Infrastruktur',
                      ditBandaraPelabuhan: 'Dit. Bandara & Pelabuhan',
                      ditPtsp: 'Dit. PTSP',
                      biroUmumKeuangan: 'Biro Umum & Keuangan',
                    };
                    return [`Rp ${Number(val).toFixed(1)} Miliar`, unitMap[name] || name];
                  }}
                  labelFormatter={(_label, items) => {
                    const p = items && (items[0]?.payload as AlokasiProgramItem);
                    if (!p) return '';
                    return `${p.program} • Total: Rp ${p.total.toFixed(1)} M\nSasaran: ${p.sasaranProgram} | ${p.kroRo} | Target: ${p.targetSatuan}`;
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    maxWidth: '380px',
                    whiteSpace: 'pre-wrap',
                  }}
                />
                <Bar dataKey="pusatPerencanaan" stackId="a" fill="#2563eb" barSize={13} />
                <Bar dataKey="ditInfrastruktur" stackId="a" fill="#3b82f6" barSize={13} />
                <Bar dataKey="ditBandaraPelabuhan" stackId="a" fill="#60a5fa" barSize={13} />
                <Bar dataKey="ditPtsp" stackId="a" fill="#93c5fd" barSize={13} />
                <Bar dataKey="biroUmumKeuangan" stackId="a" fill="#94a3b8" radius={[0, 2, 2, 0]} barSize={13} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {PUSAT_PERENCANAAN_MASTER_DATA.alokasiAnggaranProgram.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_PERENCANAAN_MASTER_DATA.alokasiAnggaranProgram.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Komposisi RKA per Sumber Dana (Donut Chart)     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Komposisi RKA per Sumber Dana
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  Rp {dataRka.totalAlokasiMiliar.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Alokasi Dana TA {rkaTahun}
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {dataRka.records.map((item) => (
                  <span key={item.sumberDana} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium text-[10.5px]">
                      {item.sumberDana} ({item.persen.toFixed(0)}%)
                    </span>
                  </span>
                ))}
              </div>

              {/* Filter Tahun */}
              <select
                aria-label="Filter Tahun RKA"
                value={rkaTahun}
                onChange={(e) => setRkaTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {PUSAT_PERENCANAAN_MASTER_DATA.komposisiRkaSumberDana.filterTahunList.map((th) => (
                  <option key={th} value={th}>
                    Th {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Donut Chart with Total in Center */}
          <div className="relative flex-1 w-full min-h-0 my-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataRka.records}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={98}
                  paddingAngle={3}
                  dataKey="alokasiMiliar"
                  nameKey="sumberDana"
                >
                  {dataRka.records.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, _name: any, item: any) => {
                    const p = item.payload;
                    return [
                      `Rp ${Number(val).toFixed(1)} Miliar (${p.persen}%)`,
                      `${p.sumberDana} [${p.kode}]`,
                    ];
                  }}
                  labelFormatter={(_label, items) => {
                    const p = items && items[0]?.payload;
                    return p ? `${p.uraian}\nVolume: ${p.volume}` : '';
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    maxWidth: '340px',
                    whiteSpace: 'pre-wrap',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Total Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total RKA</span>
              <span className="text-base sm:text-lg font-mono font-black text-slate-900 leading-tight">
                Rp {dataRka.totalAlokasiMiliar.toFixed(0)}M
              </span>
              <span className="text-[9.5px] font-medium text-emerald-600">4 Sumber Dana</span>
            </div>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              {PUSAT_PERENCANAAN_MASTER_DATA.komposisiRkaSumberDana.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_PERENCANAAN_MASTER_DATA.komposisiRkaSumberDana.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Serapan Pagu per Kegiatan (Clustered Bar Horiz)  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Serapan Pagu per Kegiatan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataSerapan.persenSerapanKeseluruhan.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Serapan Pagu {serapanTriwulan}
                </span>
              </div>
            </div>

            {/* Legenda & Filter Triwulan/Tahun */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Pagu DIPA</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Terserap (≥60%)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Terserap (&lt;60%)</span>
                </span>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Triwulan Serapan"
                  value={serapanTriwulan}
                  onChange={(e) => setSerapanTriwulan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PERENCANAAN_MASTER_DATA.serapanPaguKegiatan.filterTriwulanList.map((tw) => (
                    <option key={tw} value={tw}>
                      {tw}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Serapan"
                  value={serapanTahun}
                  onChange={(e) => setSerapanTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PERENCANAAN_MASTER_DATA.serapanPaguKegiatan.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Clustered Bar Horizontal */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataSerapan.records}
                margin={{ top: 5, right: 30, left: 135, bottom: 0 }}
                barGap={2}
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
                  dataKey="kegiatanOutput"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={130}
                  tickFormatter={(v: string) => (v.length > 22 ? `${v.slice(0, 20)}...` : v)}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const isTerserap = name === 'terserap';
                    const num = Number(val);
                    const p = item.payload as SerapanKegiatanItem;
                    if (isTerserap) {
                      return [
                        `Rp ${num.toFixed(1)} M (${p.persenSerapan.toFixed(1)}%)`,
                        'Terserap (Pagu - Sisa)',
                      ];
                    }
                    return [`Rp ${num.toFixed(1)} Miliar`, 'Pagu DIPA'];
                  }}
                  labelFormatter={(_label, items) => {
                    const p = items && (items[0]?.payload as SerapanKegiatanItem);
                    if (!p) return '';
                    return `${p.kegiatanOutput}\nKode MA: ${p.kodeMa} | Sisa Pagu: Rp ${p.sisaPagu.toFixed(1)}M\nProgres Fisik: ${p.progresPaketFisik}% | Keuangan: ${p.progresKeuangan}% (${p.status})`;
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    maxWidth: '360px',
                    whiteSpace: 'pre-wrap',
                  }}
                />
                <Bar dataKey="paguDipa" name="paguDipa" fill="#94a3b8" radius={[0, 2, 2, 0]} barSize={8} />
                <Bar dataKey="terserap" name="terserap" radius={[0, 2, 2, 0]} barSize={8}>
                  {dataSerapan.records.map((entry, index) => (
                    <Cell
                      key={`cell-serap-${index}`}
                      fill={entry.persenSerapan < 60 ? '#f97316' : '#2563eb'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              {PUSAT_PERENCANAAN_MASTER_DATA.serapanPaguKegiatan.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_PERENCANAAN_MASTER_DATA.serapanPaguKegiatan.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Target Indikator Renstra per Tahun (Multi Line)  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Target Indikator Renstra per Tahun
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {filteredRenstraRecords.length} Indikator
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Renstra BP Batam 2025-2029
                </span>
              </div>
            </div>

            {/* Legenda & Filter Sasaran Strategis */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                {filteredRenstraRecords.slice(0, 3).map((item) => (
                  <span key={item.id} className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 rounded-xs" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium text-[10px] truncate max-w-[110px]" title={item.indikatorKinerja}>
                      {item.indikatorKinerja}
                    </span>
                  </span>
                ))}
              </div>

              {/* Filter Sasaran Strategis */}
              <select
                aria-label="Filter Sasaran Strategis Renstra"
                value={renstraSasaran}
                onChange={(e) => setRenstraSasaran(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[160px] truncate"
              >
                {PUSAT_PERENCANAAN_MASTER_DATA.targetIndikatorRenstra.filterSasaranList.map((sas) => (
                  <option key={sas} value={sas}>
                    {sas}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Multi-Series Line Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={renstraLineChartData} margin={{ top: 10, right: 25, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const rec = filteredRenstraRecords.find((r) => r.id === name);
                    if (!rec) return [val, name];
                    return [`${val} ${rec.satuan}`, rec.indikatorKinerja];
                  }}
                  labelFormatter={(lbl) => `Tahun Target: ${lbl}`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    maxWidth: '340px',
                  }}
                />
                {filteredRenstraRecords.map((item) => (
                  <Line
                    key={item.id}
                    type="monotone"
                    dataKey={item.id}
                    name={item.id}
                    stroke={item.color}
                    strokeWidth={2.2}
                    dot={{ r: 3.5, fill: item.color }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {PUSAT_PERENCANAAN_MASTER_DATA.targetIndikatorRenstra.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_PERENCANAAN_MASTER_DATA.targetIndikatorRenstra.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Rekomendasi Peruntukan Lahan (Clustered Column)  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penyelesaian Rekomendasi Perubahan Peruntukan Lahan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataPeruntukanLahan.persenSelesaiRerata.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {dataPeruntukanLahan.totalSelesai.toLocaleString('id-ID')} Rekomendasi Terbit
                </span>
              </div>
            </div>

            {/* Legenda */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Jumlah Permohonan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Selesai</span>
                </span>
              </div>
              <span className="text-[10.5px] font-mono text-slate-500">
                Total: {dataPeruntukanLahan.totalPermohonan} Berkas
              </span>
            </div>
          </div>

          {/* Clustered Column Chart (Vertical Bars) */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataPeruntukanLahan.records}
                margin={{ top: 8, right: 15, left: -15, bottom: 0 }}
                barGap={3}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const isPermohonan = name === 'jumlahPermohonan';
                    const p = item.payload;
                    if (isPermohonan) {
                      return [`${val} Berkas Masuk`, 'Jumlah Permohonan'];
                    }
                    return [
                      `${val} Berkas Selesai (${p.persenSelesai}%)`,
                      'Rekomendasi Selesai',
                    ];
                  }}
                  labelFormatter={(lbl, items) => {
                    const p = items && items[0]?.payload;
                    return p ? `Tahun ${lbl} • ${p.keterangan}` : `Tahun ${lbl}`;
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
                  dataKey="jumlahPermohonan"
                  name="jumlahPermohonan"
                  fill="#2563eb"
                  radius={[3, 3, 0, 0]}
                  barSize={14}
                />
                <Bar
                  dataKey="selesai"
                  name="selesai"
                  fill="#10b981"
                  radius={[3, 3, 0, 0]}
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {dataPeruntukanLahan.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {dataPeruntukanLahan.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Panjang Jalan Rencana (Stacked Bar Horizontal)  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Panjang Jalan Rencana per Klasifikasi
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataJalan.totalPanjangKm.toFixed(1)} Km
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Koridor Rencana
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                {PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.wilayahList.map((w) => (
                  <span key={w.key} className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: w.color }} />
                    <span className="text-slate-700 font-medium text-[10px]">{w.label}</span>
                  </span>
                ))}
              </div>

              {/* Filter Rencana */}
              <select
                aria-label="Filter Tahun Rencana Jalan"
                value={jalanFilterTahun}
                onChange={(e) => setJalanFilterTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.filterTahunList.map((th) => (
                  <option key={th} value={th}>
                    {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacked Bar Horizontal Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataJalan.records}
                margin={{ top: 5, right: 30, left: 115, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val} Km`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="klasifikasiJalan"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={110}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const wil = PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.wilayahList.find(
                      (w) => w.key === name
                    );
                    return [`${Number(val).toFixed(1)} Km`, wil?.label || name];
                  }}
                  labelFormatter={(_label, items) => {
                    const p = items && (items[0]?.payload as PanjangJalanItem);
                    if (!p) return '';
                    return `${p.klasifikasiJalan} • Total: ${p.totalKm.toFixed(1)} Km\nSub Wilayah: ${p.subWilayah} | Lebar ROW: ${p.lebarRowMeter}`;
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    maxWidth: '360px',
                    whiteSpace: 'pre-wrap',
                  }}
                />
                <Bar dataKey="batamCenter" stackId="j" fill="#2563eb" barSize={13} />
                <Bar dataKey="nongsa" stackId="j" fill="#0284c7" barSize={13} />
                <Bar dataKey="batuAmpar" stackId="j" fill="#38bdf8" barSize={13} />
                <Bar dataKey="sekupang" stackId="j" fill="#10b981" barSize={13} />
                <Bar dataKey="batuAjiSagulung" stackId="j" fill="#6366f1" barSize={13} />
                <Bar dataKey="kabil" stackId="j" fill="#64748b" radius={[0, 2, 2, 0]} barSize={13} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_PERENCANAAN_MASTER_DATA.panjangJalanRencana.datasetName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
