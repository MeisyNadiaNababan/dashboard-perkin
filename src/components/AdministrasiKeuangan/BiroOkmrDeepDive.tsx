import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { BIRO_OKMR_MASTER_DATA } from './biroOkmrData';

export const BiroOkmrDeepDive: React.FC = () => {
  // ==========================================================================
  // KARTU 1 - SAKIP STATES
  // ==========================================================================
  const [sakipTahun, setSakipTahun] = useState<string>('2026');
  const dataSakip = useMemo(() => {
    return (
      BIRO_OKMR_MASTER_DATA.sakipPerKomponen.byTahun[sakipTahun] ||
      BIRO_OKMR_MASTER_DATA.sakipPerKomponen.byTahun['2026']
    );
  }, [sakipTahun]);

  // ==========================================================================
  // KARTU 2 - CAPAIAN IKU PER UNIT KERJA STATES
  // ==========================================================================
  const [ikuTahun, setIkuTahun] = useState<string>('2026');
  const [ikuTriwulan, setIkuTriwulan] = useState<string>('Semua Triwulan');

  const dataIkuList = useMemo(() => {
    const key = `${ikuTahun}-${ikuTriwulan}`;
    const dict = BIRO_OKMR_MASTER_DATA.capaianIkuUnit.recordsByFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${ikuTahun}-Semua Triwulan`;
    return dict[fallbackKey] || dict['2026-Semua Triwulan'];
  }, [ikuTahun, ikuTriwulan]);

  const rerataCapaianIku = useMemo(() => {
    if (!dataIkuList.length) return 0;
    const sum = dataIkuList.reduce((acc, curr) => acc + curr.persen, 0);
    return sum / dataIkuList.length;
  }, [dataIkuList]);

  // Hover state for IKU tooltip
  const [activeIkuIndex, setActiveIkuIndex] = useState<number | null>(null);

  // ==========================================================================
  // KARTU 3 - PERUBAHAN RISIKO UNIT STATES (Dumbbell Chart)
  // ==========================================================================
  const [risikoTahun, setRisikoTahun] = useState<string>('2026');
  const dataRisiko = useMemo(() => {
    return (
      BIRO_OKMR_MASTER_DATA.perubahanRisikoUnit.byTahun[risikoTahun] ||
      BIRO_OKMR_MASTER_DATA.perubahanRisikoUnit.byTahun['2026']
    );
  }, [risikoTahun]);

  // Hover state for dumbbell item
  const [activeRisikoIndex, setActiveRisikoIndex] = useState<number | null>(null);

  // ==========================================================================
  // KARTU 4 - PENGADUAN MASYARAKAT STATES
  // ==========================================================================
  const [pengaduanTahun, setPengaduanTahun] = useState<string>('2026');
  const [pengaduanPeriode, setPengaduanPeriode] = useState<string>('Semua Semester');

  const dataPengaduanList = useMemo(() => {
    const key = `${pengaduanTahun}-${pengaduanPeriode}`;
    const dict = BIRO_OKMR_MASTER_DATA.pengaduanMasyarakat.recordsByFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${pengaduanTahun}-Semua Semester`;
    return dict[fallbackKey] || dict['2026-Semua Semester'];
  }, [pengaduanTahun, pengaduanPeriode]);

  const ringkasanPengaduan = useMemo(() => {
    const totalDiterima = dataPengaduanList.reduce((acc, curr) => acc + curr.diterima, 0);
    const totalSelesai = dataPengaduanList.reduce((acc, curr) => acc + curr.selesai, 0);
    const persenSelesai = totalDiterima > 0 ? (totalSelesai / totalDiterima) * 100 : 0;
    return {
      totalDiterima,
      totalSelesai,
      persenSelesai,
    };
  }, [dataPengaduanList]);

  // ==========================================================================
  // KARTU 5 - HASIL SURVEI KEPUASAN MASYARAKAT (SKM) STATES
  // ==========================================================================
  const [skmTahun, setSkmTahun] = useState<string>('2026');
  const [skmUnitUsaha, setSkmUnitUsaha] = useState<string>('Semua Unit Usaha');

  const rawSkmData = useMemo(() => {
    const key = `${skmUnitUsaha}-${skmTahun}`;
    const dict = BIRO_OKMR_MASTER_DATA.surveiKepuasanMasyarakat.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `Semua Unit Usaha-${skmTahun}`;
    return dict[fallbackKey] || dict['Semua Unit Usaha-2026'];
  }, [skmUnitUsaha, skmTahun]);

  // Sorted descending from highest percentage
  const sortedSkmData = useMemo(() => {
    return [...rawSkmData].sort((a, b) => b.persen - a.persen);
  }, [rawSkmData]);

  const rerataSkm = useMemo(() => {
    if (!sortedSkmData.length) return { persen: 0, skor: 0 };
    const sumPersen = sortedSkmData.reduce((acc, curr) => acc + curr.persen, 0);
    const sumSkor = sortedSkmData.reduce((acc, curr) => acc + curr.skor, 0);
    return {
      persen: sumPersen / sortedSkmData.length,
      skor: sumSkor / sortedSkmData.length,
    };
  }, [sortedSkmData]);


  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA h-[430px])       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Penilaian SAKIP per Komponen                    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penilaian SAKIP per Komponen
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataSakip.nilaiAkhir.toFixed(2)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {dataSakip.predikat}
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[11px]">Bobot Komponen</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">Nilai Diperoleh</span>
                </span>
              </div>

              {/* Filter Tahun */}
              <select
                aria-label="Filter Tahun SAKIP"
                value={sakipTahun}
                onChange={(e) => setSakipTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {BIRO_OKMR_MASTER_DATA.sakipPerKomponen.filterTahunList.map((t) => (
                  <option key={t} value={t}>
                    Th {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clustered Bar Horizontal Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataSakip.komponen}
                margin={{ top: 5, right: 35, left: 95, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  domain={[0, 35]}
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val} Poin`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="komponen"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={95}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const num = Number(val);
                    const pct = item.payload.persen;
                    const grade = item.payload.tingkat;
                    if (name === 'nilai') {
                      return [
                        `${num.toFixed(2)} Poin (${pct}% • Predikat ${grade})`,
                        'Nilai Diperoleh',
                      ];
                    }
                    return [`${num.toFixed(1)} Poin Maksimal`, 'Bobot Komponen'];
                  }}
                  labelFormatter={(label, items) => {
                    const desc = items && items[0]?.payload?.keterangan;
                    return desc ? `${label} • ${desc}` : label;
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
                  dataKey="bobot"
                  name="bobot"
                  fill="#94a3b8"
                  radius={[0, 2, 2, 0]}
                  barSize={10}
                />
                <Bar
                  dataKey="nilai"
                  name="nilai"
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
              {BIRO_OKMR_MASTER_DATA.sakipPerKomponen.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_OKMR_MASTER_DATA.sakipPerKomponen.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Capaian IKU per Unit Kerja (Progress Bar List)   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Capaian IKU per Unit Kerja
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {rerataCapaianIku.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Rerata Capaian IKU
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[11px]">&ge; 90% (Tercapai)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                  <span className="text-slate-700 font-medium text-[11px]">&lt; 90% (Perhatian)</span>
                </span>
              </div>

              {/* Filters: Triwulan & Tahun */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <select
                  aria-label="Filter Triwulan IKU"
                  value={ikuTriwulan}
                  onChange={(e) => setIkuTriwulan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {BIRO_OKMR_MASTER_DATA.capaianIkuUnit.filterTriwulanList.map((tw) => (
                    <option key={tw} value={tw}>
                      {tw}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun IKU"
                  value={ikuTahun}
                  onChange={(e) => setIkuTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {BIRO_OKMR_MASTER_DATA.capaianIkuUnit.filterTahunList.map((t) => (
                    <option key={t} value={t}>
                      Th {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Progress Bar List Section */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-y-auto space-y-2 pr-1">
            {dataIkuList.map((item, idx) => {
              const isTargetAchieved = item.persen >= 90;
              const barColor = isTargetAchieved ? '#10b981' : '#f59e0b';
              const isHovered = activeIkuIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIkuIndex(idx)}
                  onMouseLeave={() => setActiveIkuIndex(null)}
                  className="group relative p-1.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-default"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-[230px]">
                      {item.unit}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 font-mono">
                      <span className="text-[10px] text-slate-500 font-sans">
                        Realisasi: {item.realisasi}%
                      </span>
                      <span
                        className={`text-xs font-bold px-1.5 py-0.2 rounded ${
                          isTargetAchieved
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : 'text-amber-700 bg-amber-50 border border-amber-200'
                        }`}
                      >
                        {item.persen.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(item.persen, 100)}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>

                  {/* Interactive Tooltip Banner on Hover */}
                  {isHovered && (
                    <div className="mt-1.5 pt-1.5 border-t border-blue-100 text-[10px] text-slate-600 space-y-0.5 animate-fadeIn">
                      <div>
                        <strong className="text-slate-800">Sasaran: </strong>
                        {item.sasaranStrategis}
                      </div>
                      <div>
                        <strong className="text-blue-700">IKU: </strong>
                        {item.iku}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              {BIRO_OKMR_MASTER_DATA.capaianIkuUnit.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_OKMR_MASTER_DATA.capaianIkuUnit.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Perubahan Besaran Risiko per Unit Kerja (Dumbbell)*/}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Perubahan Besaran Risiko per Unit Kerja
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataRisiko.totalUnitTurun} Unit ({dataRisiko.persenUnitTurun.toFixed(0)}%)
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Risiko Menurun
                </span>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-slate-700 font-medium text-[11px]">Risiko Awal Tahun</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[11px]">Risiko Akhir Tahun</span>
                </span>
                <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                  (Skala Matriks 1-25)
                </span>
              </div>

              {/* Filter Tahun */}
              <select
                aria-label="Filter Tahun Piagam Risiko"
                value={risikoTahun}
                onChange={(e) => setRisikoTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {BIRO_OKMR_MASTER_DATA.perubahanRisikoUnit.filterTahunList.map((t) => (
                  <option key={t} value={t}>
                    Th {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dumbbell Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-y-auto space-y-2.5 pr-1 py-1">
            {dataRisiko.records.map((r, idx) => {
              // Scale: 0 to 25 -> mapped to percentage (0% to 100%)
              const leftPercent = (r.risikoAkhir / 25) * 100;
              const rightPercent = (r.risikoAwal / 25) * 100;
              const isHovered = activeRisikoIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveRisikoIndex(idx)}
                  onMouseLeave={() => setActiveRisikoIndex(null)}
                  className="group p-1.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-default"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-900 truncate max-w-[210px]">
                      {r.unit}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-rose-600 font-bold">Awal: {r.risikoAwal}</span>
                      <span className="text-slate-400">&rarr;</span>
                      <span className="text-emerald-700 font-bold">Akhir: {r.risikoAkhir}</span>
                      <span className="text-blue-700 font-bold bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                        -{r.penurunan}
                      </span>
                    </div>
                  </div>

                  {/* Dumbbell visual track */}
                  <div className="relative w-full h-5 flex items-center bg-slate-50 rounded px-2">
                    {/* Background scale reference lines */}
                    <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20">
                      <span className="border-r border-slate-400 h-full" />
                      <span className="border-r border-slate-400 h-full" />
                      <span className="border-r border-slate-400 h-full" />
                      <span className="border-r border-slate-400 h-full" />
                    </div>

                    {/* Connecting Bar */}
                    <div
                      className="absolute h-1.5 bg-gradient-to-r from-emerald-500 to-rose-500 rounded-full"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${Math.max(rightPercent - leftPercent, 4)}%`,
                      }}
                    />

                    {/* Green Dot (Risiko Akhir) */}
                    <div
                      className="absolute w-3.5 h-3.5 bg-emerald-600 rounded-full border-2 border-white shadow-xs -translate-x-1/2 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-125"
                      style={{ left: `${leftPercent}%` }}
                      title={`Risiko Akhir: ${r.risikoAkhir}`}
                    />

                    {/* Red Dot (Risiko Awal) */}
                    <div
                      className="absolute w-3.5 h-3.5 bg-rose-600 rounded-full border-2 border-white shadow-xs -translate-x-1/2 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-125"
                      style={{ left: `${rightPercent}%` }}
                      title={`Risiko Awal: ${r.risikoAwal}`}
                    />
                  </div>

                  {/* Tooltip Details on Hover */}
                  {isHovered && (
                    <div className="mt-1.5 pt-1.5 border-t border-blue-100 text-[10px] text-slate-600 space-y-0.5 animate-fadeIn">
                      <div>
                        <strong className="text-slate-800">Sasaran: </strong>
                        {r.sasaranOrganisasi}
                      </div>
                      <div>
                        <strong className="text-rose-700">Kejadian Risiko: </strong>
                        {r.kejadianRisiko}
                      </div>
                      <div>
                        <strong className="text-emerald-700">Mitigasi: </strong>
                        {r.mitigasi}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              {BIRO_OKMR_MASTER_DATA.perubahanRisikoUnit.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_OKMR_MASTER_DATA.perubahanRisikoUnit.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Pengaduan Masyarakat terhadap Layanan           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Pengaduan Masyarakat terhadap Layanan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {ringkasanPengaduan.persenSelesai.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Tingkat Penyelesaian
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[11px]">Diterima</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                  <span className="text-slate-700 font-medium text-[11px]">Diproses</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[11px]">Selesai</span>
                </span>
              </div>

              {/* Filters: Periode & Tahun */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <select
                  aria-label="Filter Periode Pengaduan"
                  value={pengaduanPeriode}
                  onChange={(e) => setPengaduanPeriode(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {BIRO_OKMR_MASTER_DATA.pengaduanMasyarakat.filterPeriodeList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Pengaduan"
                  value={pengaduanTahun}
                  onChange={(e) => setPengaduanTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10.5px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {BIRO_OKMR_MASTER_DATA.pengaduanMasyarakat.filterTahunList.map((t) => (
                    <option key={t} value={t}>
                      Th {t}
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
                data={dataPengaduanList}
                margin={{ top: 5, right: 35, left: 95, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="unit"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={95}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const num = Number(val);
                    const sla = item.payload.slaHari;
                    const pct = item.payload.persenSelesai;
                    if (name === 'selesai') {
                      return [
                        `${num} Laporan (${pct.toFixed(1)}% • Rerata SLA: ${sla} Hari)`,
                        'Selesai Ditindaklanjuti',
                      ];
                    }
                    if (name === 'diproses') {
                      return [`${num} Laporan`, 'Sedang Diproses'];
                    }
                    return [`${num} Laporan Masuk`, 'Total Pengaduan Diterima'];
                  }}
                  labelFormatter={(label, items) => {
                    const saluran = items && items[0]?.payload?.saluranTerbanyak;
                    return saluran ? `${label} • Saluran Utama: ${saluran}` : label;
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
                  dataKey="diterima"
                  name="diterima"
                  fill="#94a3b8"
                  radius={[0, 2, 2, 0]}
                  barSize={8}
                />
                <Bar
                  dataKey="diproses"
                  name="diproses"
                  fill="#f59e0b"
                  radius={[0, 2, 2, 0]}
                  barSize={8}
                />
                <Bar
                  dataKey="selesai"
                  name="selesai"
                  fill="#10b981"
                  radius={[0, 2, 2, 0]}
                  barSize={8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {BIRO_OKMR_MASTER_DATA.pengaduanMasyarakat.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_OKMR_MASTER_DATA.pengaduanMasyarakat.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Hasil Survei Kepuasan Masyarakat (Urut Turun)   */}
        {/* ================================================================== */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Hasil Survei Kepuasan Masyarakat
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {rerataSkm.persen.toFixed(1)}% ({rerataSkm.skor.toFixed(2)})
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Mutu A (Sangat Baik)
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">Skor Kepuasan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-[#10b981]" />
                  <span className="text-slate-600 font-medium text-[10px]">Standar Mutu A (90%)</span>
                </span>
              </div>

              {/* Filters: Unit Usaha & Tahun */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <select
                  aria-label="Filter Unit Usaha SKM"
                  value={skmUnitUsaha}
                  onChange={(e) => setSkmUnitUsaha(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[130px] truncate"
                >
                  {BIRO_OKMR_MASTER_DATA.surveiKepuasanMasyarakat.filterUnitUsahaList.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun SKM"
                  value={skmTahun}
                  onChange={(e) => setSkmTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {BIRO_OKMR_MASTER_DATA.surveiKepuasanMasyarakat.filterTahunList.map((t) => (
                    <option key={t} value={t}>
                      Th {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sorted Horizontal Bar Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedSkmData}
                margin={{ top: 5, right: 35, left: 115, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  domain={[75, 100]}
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val}%`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="kategori"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={110}
                />
                <ReferenceLine
                  x={90}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  strokeWidth={1.5}
                  label={{ value: '90% (Mutu A)', fill: '#10b981', fontSize: 9, position: 'top' }}
                />
                <Tooltip
                  formatter={(val: any, _name: any, item: any) => [
                    `${Number(val).toFixed(2)}% (Skor: ${item.payload.skor} • ${item.payload.mutu})`,
                    'Capaian Indeks',
                  ]}
                  labelFormatter={(label, items) => {
                    const detail = items && items[0]?.payload?.detail;
                    return detail ? `${label} • ${detail}` : label;
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
                  dataKey="persen"
                  name="persen"
                  fill="#2563eb"
                  radius={[0, 2, 2, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {BIRO_OKMR_MASTER_DATA.surveiKepuasanMasyarakat.accessLabel}
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_OKMR_MASTER_DATA.surveiKepuasanMasyarakat.datasetName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
