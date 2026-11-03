import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  PUSAT_HARMONISASI_MASTER_DATA,
  SinkronisasiInternalItem,
  SinkronisasiEksternalItem,
  PemulihanBiayaTarifItem,
  StatusTarifLevelItem,
  SurveiKewajaranTarifItem,
  RdpPimpinanBulanItem,
} from './pusatHarmonisasiData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const PusatHarmonisasiDeepDive: React.FC = () => {
  // Sheet Swap States for 6 Cards
  const [internalViewMode, setInternalViewMode] = useState<'chart' | 'table'>('chart');
  const [eksternalViewMode, setEksternalViewMode] = useState<'chart' | 'table'>('chart');
  const [pemulihanViewMode, setPemulihanViewMode] = useState<'chart' | 'table'>('chart');
  const [statusTarifViewMode, setStatusTarifViewMode] = useState<'chart' | 'table'>('chart');
  const [surveiViewMode, setSurveiViewMode] = useState<'chart' | 'table'>('chart');
  const [rdpViewMode, setRdpViewMode] = useState<'chart' | 'table'>('chart');

  // ==========================================================================
  // KARTU 1: SINKRONISASI KEBIJAKAN INTERNAL STATES
  // ==========================================================================
  const [internalTahun, setInternalTahun] = useState<string>('2026');
  const [internalPeriode, setInternalPeriode] = useState<string>('Semua Semester');

  const dataInternal = useMemo(() => {
    const key = `${internalTahun}-${internalPeriode}`;
    const dict = PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiInternal.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${internalTahun}-Semua Semester`;
    return dict[fallbackKey] || dict['2026-Semua Semester'];
  }, [internalTahun, internalPeriode]);

  // ==========================================================================
  // KARTU 2: SINKRONISASI KEBIJAKAN EKSTERNAL STATES
  // ==========================================================================
  const [eksternalTahun, setEksternalTahun] = useState<string>('2026');

  const dataEksternal = useMemo(() => {
    return (
      PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiEksternal.byTahun[eksternalTahun] ||
      PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiEksternal.byTahun['2026']
    );
  }, [eksternalTahun]);

  // ==========================================================================
  // KARTU 3: PEMULIHAN BIAYA TARIF STATES (PROGRESS BAR HORIZONTAL PER UNIT)
  // ==========================================================================
  const [tarifTahun, setTarifTahun] = useState<string>('2026');
  const [tarifStatus, setTarifStatus] = useState<string>('Semua Status');
  const [activeUnitHoverIndex, setActiveUnitHoverIndex] = useState<number | null>(null);

  const dataPemulihan = useMemo(() => {
    const key = `${tarifTahun}-${tarifStatus}`;
    const dict = PUSAT_HARMONISASI_MASTER_DATA.pemulihanBiayaTarif.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${tarifTahun}-Semua Status`;
    return dict[fallbackKey] || dict['2026-Semua Status'];
  }, [tarifTahun, tarifStatus]);

  // ==========================================================================
  // KARTU 4: STATUS TARIF PER LEVEL PENGATURAN STATES
  // ==========================================================================
  const [levelTahun, setLevelTahun] = useState<string>('2026');
  const [levelUnit, setLevelUnit] = useState<string>('Semua Unit');

  const dataStatusTarif = useMemo(() => {
    const key = `${levelTahun}-${levelUnit}`;
    const dict = PUSAT_HARMONISASI_MASTER_DATA.statusTarifLevel.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${levelTahun}-Semua Unit`;
    return dict[fallbackKey] || dict['2026-Semua Unit'];
  }, [levelTahun, levelUnit]);

  // ==========================================================================
  // KARTU 5: HASIL SURVEI KEWAJARAN TARIF PER KRITERIA STATES
  // ==========================================================================
  const [surveiTahun, setSurveiTahun] = useState<string>('2026');
  const [surveiLokasi, setSurveiLokasi] = useState<string>('Semua Lokasi');

  const rawSurveiData = useMemo(() => {
    const key = `${surveiTahun}-${surveiLokasi}`;
    const dict = PUSAT_HARMONISASI_MASTER_DATA.surveiKewajaranTarif.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${surveiTahun}-Semua Lokasi`;
    return dict[fallbackKey] || dict['2026-Semua Lokasi'];
  }, [surveiTahun, surveiLokasi]);

  // Urut dari nilai persentase tertinggi
  const sortedSurveiRecords = useMemo(() => {
    return [...rawSurveiData.records].sort((a, b) => b.persentaseWajar - a.persentaseWajar);
  }, [rawSurveiData]);

  const surveiTertinggi = useMemo(() => {
    if (!sortedSurveiRecords.length) return { kriteria: '-', persen: 0 };
    return {
      kriteria: sortedSurveiRecords[0].kriteria,
      persen: sortedSurveiRecords[0].persentaseWajar,
    };
  }, [sortedSurveiRecords]);

  // ==========================================================================
  // KARTU 6: RAPAT DENGAR PENDAPAT PIMPINAN PER BULAN STATES
  // ==========================================================================
  const [rdpTahun, setRdpTahun] = useState<string>('2026');

  const dataRdp = useMemo(() => {
    return (
      PUSAT_HARMONISASI_MASTER_DATA.rdpPimpinanPerBulan.byTahun[rdpTahun] ||
      PUSAT_HARMONISASI_MASTER_DATA.rdpPimpinanPerBulan.byTahun['2026']
    );
  }, [rdpTahun]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA h-[430px])       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Sinkronisasi Kebijakan Internal per Kategori    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Sinkronisasi Kebijakan Internal per Kategori
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataInternal.persenSudahSinkron.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Kebijakan Sudah Sinkron
                </span>
              </div>
            </div>

            {/* Legenda & Filter Periode/Tahun + Sheet Swap Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Sudah Sinkron</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Dalam Proses</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Perlu Revisi</span>
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Periode Kebijakan Internal"
                  value={internalPeriode}
                  onChange={(e) => setInternalPeriode(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiInternal.filterPeriodeList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Kebijakan Internal"
                  value={internalTahun}
                  onChange={(e) => setInternalTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiInternal.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>

                <SheetSwapToggle mode={internalViewMode} onChange={setInternalViewMode} />
              </div>
            </div>
          </div>

          {/* Stacked Horizontal Bar Chart / Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {internalViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={dataInternal.records}
                  margin={{ top: 5, right: 30, left: 125, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kategori"
                    tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={120}
                    tickFormatter={(v: string) => (v.length > 20 ? `${v.slice(0, 18)}...` : v)}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const statusMap: Record<string, string> = {
                        sudahSinkron: 'Sudah Sinkron',
                        dalamProses: 'Dalam Proses',
                        perluRevisi: 'Perlu Revisi',
                      };
                      return [`${val} Kebijakan`, statusMap[name] || name];
                    }}
                    labelFormatter={(_label, items) => {
                      const p = items && (items[0]?.payload as SinkronisasiInternalItem);
                      if (!p) return '';
                      return `${p.kategori} • Total: ${p.total} (${p.persenSinkron.toFixed(1)}% Sinkron)\nContoh: ${p.nomorDanTentang}`;
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
                  <Bar dataKey="sudahSinkron" stackId="stk" fill="#2563eb" barSize={13} />
                  <Bar dataKey="dalamProses" stackId="stk" fill="#94a3b8" barSize={13} />
                  <Bar dataKey="perluRevisi" stackId="stk" fill="#f97316" radius={[0, 2, 2, 0]} barSize={13} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Kategori Kebijakan</th>
                      <th className="py-1.5 px-1.5 text-right">Sudah Sinkron</th>
                      <th className="py-1.5 px-1.5 text-right">Dalam Proses</th>
                      <th className="py-1.5 px-1.5 text-right">Perlu Revisi</th>
                      <th className="py-1.5 px-1.5 text-right">Total</th>
                      <th className="py-1.5 px-1.5 text-right">% Sinkron</th>
                      <th className="py-1.5 px-2">Contoh Regulasi / SK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataInternal.records.map((r, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{r.kategori}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{r.sudahSinkron}</td>
                        <td className="py-1.5 px-1.5 text-right text-slate-600">{r.dalamProses}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-orange-600">{r.perluRevisi}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{r.total}</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                            r.persenSinkron >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {r.persenSinkron.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[150px]" title={r.nomorDanTentang}>
                          {r.nomorDanTentang}
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
              {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiInternal.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiInternal.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Sinkronisasi Kebijakan Eksternal per Periode    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Sinkronisasi Kebijakan Eksternal per Periode
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataEksternal.totalKebijakanEksternal} Kebijakan
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Regulasi K/L TA {eksternalTahun}
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun + Sheet Swap Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Sudah Sinkron</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Dalam Proses</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Perlu Revisi</span>
                </span>
              </div>

              {/* Filter Tahun & Sheet Swap */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Tahun Kebijakan Eksternal"
                  value={eksternalTahun}
                  onChange={(e) => setEksternalTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiEksternal.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>

                <SheetSwapToggle mode={eksternalViewMode} onChange={setEksternalViewMode} />
              </div>
            </div>
          </div>

          {/* Stacked Column Chart / Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {eksternalViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataEksternal.records}
                  margin={{ top: 8, right: 15, left: -15, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="periode"
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
                      const statusMap: Record<string, string> = {
                        sudahSinkron: 'Sudah Sinkron',
                        dalamProses: 'Dalam Proses',
                        perluRevisi: 'Perlu Revisi',
                      };
                      return [`${val} Regulasi`, statusMap[name] || name];
                    }}
                    labelFormatter={(lbl, items) => {
                      const p = items && (items[0]?.payload as SinkronisasiEksternalItem);
                      if (!p) return `Periode ${lbl}`;
                      return `Periode ${lbl} • Total: ${p.total} Kebijakan Eksternal\nFokus: ${p.kategoriTentangNomor}`;
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
                  <Bar dataKey="sudahSinkron" stackId="ext" fill="#2563eb" barSize={26} />
                  <Bar dataKey="dalamProses" stackId="ext" fill="#94a3b8" barSize={26} />
                  <Bar dataKey="perluRevisi" stackId="ext" fill="#f97316" radius={[3, 3, 0, 0]} barSize={26} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Periode Semester</th>
                      <th className="py-1.5 px-1.5 text-right">Sudah Sinkron</th>
                      <th className="py-1.5 px-1.5 text-right">Dalam Proses</th>
                      <th className="py-1.5 px-1.5 text-right">Perlu Revisi</th>
                      <th className="py-1.5 px-1.5 text-right">Total</th>
                      <th className="py-1.5 px-2">Fokus Regulasi &amp; K/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataEksternal.records.map((r, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{r.periode}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{r.sudahSinkron}</td>
                        <td className="py-1.5 px-1.5 text-right text-slate-600">{r.dalamProses}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-orange-600">{r.perluRevisi}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{r.total}</td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[180px]" title={r.kategoriTentangNomor}>
                          {r.kategoriTentangNomor}
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
              {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiEksternal.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_HARMONISASI_MASTER_DATA.sinkronisasiEksternal.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Pemulihan Biaya Tarif per Unit (Progress Bar)   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Pemulihan Biaya Tarif per Unit
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataPemulihan.rerataCostRecoveryRatio.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Rata-rata Rasio Tarif / Unit Cost
                </span>
              </div>
            </div>

            {/* Legenda & Filter + Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Rasio ≥ 100% (Cost Recovered)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Rasio &lt; 100% (Subsidi)</span>
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Status Tarif"
                  value={tarifStatus}
                  onChange={(e) => setTarifStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[130px] truncate"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.pemulihanBiayaTarif.filterStatusList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Tarif"
                  value={tarifTahun}
                  onChange={(e) => setTarifTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.pemulihanBiayaTarif.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>

                <SheetSwapToggle mode={pemulihanViewMode} onChange={setPemulihanViewMode} />
              </div>
            </div>
          </div>

          {/* List of Progress Bars / Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {pemulihanViewMode === 'chart' ? (
              <div className="h-full overflow-y-auto space-y-2.5 pr-1">
                {dataPemulihan.records.map((item, idx) => {
                  const isCovered = item.costRecoveryRatio >= 100;
                  const isHovered = activeUnitHoverIndex === idx;

                  return (
                    <div
                      key={item.unit}
                      onMouseEnter={() => setActiveUnitHoverIndex(idx)}
                      onMouseLeave={() => setActiveUnitHoverIndex(null)}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-blue-50/60 border-blue-200 shadow-2xs'
                          : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-900 truncate max-w-[240px]">
                          {item.unit}
                        </span>
                        <span
                          className={`font-mono font-bold text-xs ${
                            isCovered ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {item.costRecoveryRatio.toFixed(1)}%
                        </span>
                      </div>

                      {/* Progress track */}
                      <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden flex">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCovered ? 'bg-[#10b981]' : 'bg-[#f97316]'
                          }`}
                          style={{ width: `${Math.min(item.costRecoveryRatio, 130) * 0.76}%` }}
                        />
                      </div>

                      {/* Tooltip inline metadata */}
                      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="truncate max-w-[250px]" title={item.layanan}>
                          {item.layanan} ({item.satuanLayanan})
                        </span>
                        <span className="font-mono text-[9.5px] text-slate-600 shrink-0 ml-1">
                          Rp {(item.tarifBerlakuRerata / 1000).toFixed(0)}k / {(item.unitCostRerata / 1000).toFixed(0)}k
                        </span>
                      </div>

                      {isHovered && (
                        <div className="mt-1.5 pt-1 border-t border-blue-100 text-[9.5px] text-slate-600 flex items-center justify-between">
                          <span className="truncate">Dasar Hukum: {item.dasarHukum}</span>
                          <span className="font-semibold text-blue-700 shrink-0 ml-2">
                            Bentuk: {item.bentukTarif}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Unit Kerja</th>
                      <th className="py-1.5 px-2">Layanan &amp; Satuan</th>
                      <th className="py-1.5 px-1.5 text-right">Tarif Berlaku</th>
                      <th className="py-1.5 px-1.5 text-right">Unit Cost</th>
                      <th className="py-1.5 px-1.5 text-right">Cost Recovery (%)</th>
                      <th className="py-1.5 px-1.5 text-center">Status</th>
                      <th className="py-1.5 px-2">Dasar Hukum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataPemulihan.records.map((item, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{item.unit}</td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-700">{item.layanan} ({item.satuanLayanan})</td>
                        <td className="py-1.5 px-1.5 text-right text-slate-900">Rp {item.tarifBerlakuRerata.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-1.5 text-right text-slate-600">Rp {item.unitCostRerata.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{item.costRecoveryRatio.toFixed(1)}%</td>
                        <td className="py-1.5 px-1.5 text-center font-sans">
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                            item.costRecoveryRatio >= 100 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {item.statusTarif}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-500 truncate max-w-[140px]" title={item.dasarHukum}>
                          {item.dasarHukum}
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
              {PUSAT_HARMONISASI_MASTER_DATA.pemulihanBiayaTarif.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_HARMONISASI_MASTER_DATA.pemulihanBiayaTarif.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Status Tarif per Level Pengaturan               */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Status Tarif per Level Pengaturan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataStatusTarif.totalBerlaku} Tarif
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Status Berlaku Resmi
                </span>
              </div>
            </div>

            {/* Legenda & Filter + Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Berlaku</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Dalam Kajian</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Tidak Berlaku</span>
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Unit Status Tarif"
                  value={levelUnit}
                  onChange={(e) => setLevelUnit(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[125px] truncate"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.statusTarifLevel.filterUnitList.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Status Tarif"
                  value={levelTahun}
                  onChange={(e) => setLevelTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.statusTarifLevel.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>

                <SheetSwapToggle mode={statusTarifViewMode} onChange={setStatusTarifViewMode} />
              </div>
            </div>
          </div>

          {/* Stacked Horizontal Bar Chart / Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {statusTarifViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={dataStatusTarif.records}
                  margin={{ top: 5, right: 30, left: 130, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="levelPengaturan"
                    tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={125}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const statusMap: Record<string, string> = {
                        berlaku: 'Berlaku Resmi',
                        dalamKajian: 'Dalam Kajian',
                        tidakBerlaku: 'Tidak Berlaku',
                      };
                      return [`${val} Item Tarif`, statusMap[name] || name];
                    }}
                    labelFormatter={(_label, items) => {
                      const p = items && (items[0]?.payload as StatusTarifLevelItem);
                      if (!p) return '';
                      return `${p.levelPengaturan} • Total: ${p.total} Tarif\nDasar Hukum & Unit: ${p.unitDanDasarHukum}`;
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
                  <Bar dataKey="berlaku" stackId="lvl" fill="#2563eb" barSize={13} />
                  <Bar dataKey="dalamKajian" stackId="lvl" fill="#94a3b8" barSize={13} />
                  <Bar dataKey="tidakBerlaku" stackId="lvl" fill="#ef4444" radius={[0, 2, 2, 0]} barSize={13} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Level Pengaturan</th>
                      <th className="py-1.5 px-1.5 text-right">Berlaku Resmi</th>
                      <th className="py-1.5 px-1.5 text-right">Dalam Kajian</th>
                      <th className="py-1.5 px-1.5 text-right">Tidak Berlaku</th>
                      <th className="py-1.5 px-1.5 text-right">Total</th>
                      <th className="py-1.5 px-2">Unit &amp; Dasar Hukum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataStatusTarif.records.map((r, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{r.levelPengaturan}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{r.berlaku}</td>
                        <td className="py-1.5 px-1.5 text-right text-slate-600">{r.dalamKajian}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-rose-600">{r.tidakBerlaku}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{r.total}</td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[200px]" title={r.unitDanDasarHukum}>
                          {r.unitDanDasarHukum}
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
              {PUSAT_HARMONISASI_MASTER_DATA.statusTarifLevel.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_HARMONISASI_MASTER_DATA.statusTarifLevel.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Hasil Survei Kewajaran Tarif (Urut Turun)       */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Hasil Survei Kewajaran Tarif per Kriteria
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {surveiTertinggi.persen.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Kriteria Tertinggi: {surveiTertinggi.kriteria}
                </span>
              </div>
            </div>

            {/* Legenda & Filters + Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Persentase Kewajaran</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-[#10b981]" />
                  <span className="text-slate-600 font-medium text-[10px]">Standar Layak (80%)</span>
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Lokasi Survei"
                  value={surveiLokasi}
                  onChange={(e) => setSurveiLokasi(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[130px] truncate"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.surveiKewajaranTarif.filterLokasiList.map((lok) => (
                    <option key={lok} value={lok}>
                      {lok}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Survei"
                  value={surveiTahun}
                  onChange={(e) => setSurveiTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.surveiKewajaranTarif.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>

                <SheetSwapToggle mode={surveiViewMode} onChange={setSurveiViewMode} />
              </div>
            </div>
          </div>

          {/* Sorted Horizontal Bar Chart / Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {surveiViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sortedSurveiRecords}
                  margin={{ top: 5, right: 35, left: 125, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    domain={[65, 100]}
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}%`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kriteria"
                    tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={120}
                  />
                  <ReferenceLine
                    x={80}
                    stroke="#10b981"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ value: 'Standar 80%', fill: '#10b981', fontSize: 9, position: 'top' }}
                  />
                  <Tooltip
                    formatter={(val: any, _name: any, item: any) => {
                      const p = item.payload as SurveiKewajaranTarifItem;
                      return [
                        `${Number(val).toFixed(1)}% (${p.jumlahResponden} Responden)`,
                        'Tingkat Kewajaran',
                      ];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && (items[0]?.payload as SurveiKewajaranTarifItem);
                      if (!p) return label;
                      return `${label}\nInstrumen: ${p.instrumenPenelitian}\nKeterangan: ${p.keterangan}`;
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
                  <Bar
                    dataKey="persentaseWajar"
                    name="persentaseWajar"
                    fill="#2563eb"
                    radius={[0, 2, 2, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Kriteria Survei</th>
                      <th className="py-1.5 px-1.5 text-right">% Kewajaran</th>
                      <th className="py-1.5 px-1.5 text-right">Responden</th>
                      <th className="py-1.5 px-2">Instrumen Evaluasi</th>
                      <th className="py-1.5 px-2">Keterangan / Temuan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {sortedSurveiRecords.map((r, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{r.kriteria}</td>
                        <td className="py-1.5 px-1.5 text-right">
                          <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                            r.persentaseWajar >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {r.persentaseWajar.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-slate-800">{r.jumlahResponden}</td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[150px]" title={r.instrumenPenelitian}>
                          {r.instrumenPenelitian}
                        </td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[180px]" title={r.keterangan}>
                          {r.keterangan}
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
              {PUSAT_HARMONISASI_MASTER_DATA.surveiKewajaranTarif.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_HARMONISASI_MASTER_DATA.surveiKewajaranTarif.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Rapat Dengar Pendapat Pimpinan per Bulan         */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Rapat Dengar Pendapat Pimpinan per Bulan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataRdp.totalRapatSetahun} Rapat
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total RDP Pimpinan {rdpTahun}
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun + Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Frekuensi RDP</span>
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-500 text-[10.5px]">Rerata: {(dataRdp.totalRapatSetahun / 12).toFixed(1)} Rapat/Bulan</span>
              </div>

              {/* Filter Tahun & Sheet Swap */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Tahun RDP"
                  value={rdpTahun}
                  onChange={(e) => setRdpTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_HARMONISASI_MASTER_DATA.rdpPimpinanPerBulan.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>

                <SheetSwapToggle mode={rdpViewMode} onChange={setRdpViewMode} />
              </div>
            </div>
          </div>

          {/* Column Chart / Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {rdpViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataRdp.records}
                  margin={{ top: 8, right: 15, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val} Agenda Rapat`, 'Jumlah RDP']}
                    labelFormatter={(lbl, items) => {
                      const p = items && (items[0]?.payload as RdpPimpinanBulanItem);
                      if (!p) return `Bulan ${lbl}`;
                      return `Bulan ${p.bulanFull} (${p.jumlahRapat} Rapat)\nAgenda Utama: ${p.judulRapat}\nTempat: ${p.tempat} | Waktu: ${p.waktu}\nStatus: ${p.statusTindakLanjut}`;
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
                  <Bar
                    dataKey="jumlahRapat"
                    name="jumlahRapat"
                    fill="#2563eb"
                    radius={[3, 3, 0, 0]}
                    barSize={18}
                  >
                    {dataRdp.records.map((entry, idx) => (
                      <Cell
                        key={`cell-rdp-${idx}`}
                        fill={entry.jumlahRapat >= 5 ? '#2563eb' : '#3b82f6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan</th>
                      <th className="py-1.5 px-1.5 text-right">Jumlah RDP</th>
                      <th className="py-1.5 px-2">Agenda Utama</th>
                      <th className="py-1.5 px-2">Lokasi / Tempat</th>
                      <th className="py-1.5 px-1.5 text-center">Waktu</th>
                      <th className="py-1.5 px-2">Status Tindak Lanjut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataRdp.records.map((r, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{r.bulanFull}</td>
                        <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{r.jumlahRapat}</td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-800 font-medium truncate max-w-[180px]" title={r.judulRapat}>
                          {r.judulRapat}
                        </td>
                        <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[130px]">{r.tempat}</td>
                        <td className="py-1.5 px-1.5 text-center text-[10px] text-slate-500">{r.waktu}</td>
                        <td className="py-1.5 px-2 font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {r.statusTindakLanjut}
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
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              {PUSAT_HARMONISASI_MASTER_DATA.rdpPimpinanPerBulan.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {PUSAT_HARMONISASI_MASTER_DATA.rdpPimpinanPerBulan.datasetName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
