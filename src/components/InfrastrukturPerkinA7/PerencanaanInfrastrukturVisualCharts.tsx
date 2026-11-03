import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import {
  DATA_PERENCANAAN_INFRASTRUKTUR,
  KategoriInfrastruktur,
  KATEGORI_INFRASTRUKTUR_LIST,
  DedKategoriItem,
} from './perencanaanInfrastrukturData';

// Palet Warna Resmi untuk 6 Kategori Infrastruktur
const KATEGORI_COLORS: Record<KategoriInfrastruktur, string> = {
  Gedung: '#2563eb', // Biru utama
  Utilitas: '#0284c7', // Cyan / Sky
  Darat: '#3b82f6', // Biru medium
  Laut: '#60a5fa', // Biru muda
  Lingkungan: '#10b981', // Hijau
  'Pesisir dan Reklamasi': '#0d9488', // Teal
};

// Formatter Helpers
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatRupiahMiliar = (valM: number): string => {
  return `Rp ${valM.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
};

export const PerencanaanInfrastrukturVisualCharts: React.FC = () => {
  // =========================================================================
  // STATE FILTERS
  // =========================================================================

  // Kartu 1: Filter Tahun
  const [k1Tahun, setK1Tahun] = useState<string>('2026');

  // Kartu 2: Filter Kategori Infrastruktur
  const [k2Kategori, setK2Kategori] = useState<string>('Semua Kategori');

  // Kartu 3: Filter Tahun
  const [k3Tahun, setK3Tahun] = useState<string>('2026');

  // Kartu 4: Filter Tahun
  const [k4Tahun, setK4Tahun] = useState<string>('2026');

  // =========================================================================
  // DATA PROCESSING: KARTU 1 - Jumlah DED per Kategori Infrastruktur
  // =========================================================================
  const k1Data = useMemo(() => {
    const yearObj =
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun[k1Tahun] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun['2026'];
    // Urutkan dari jumlah DED terbanyak ke terkecil
    return [...yearObj.items].sort((a, b) => b.jumlahDed - a.jumlahDed);
  }, [k1Tahun]);

  const k1Summary = useMemo(() => {
    const currYearObj =
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun[k1Tahun] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun['2026'];
    const totalDed = currYearObj.totalDed;

    // Hitung perbandingan dengan tahun sebelumnya
    const prevYearNum = parseInt(k1Tahun, 10) - 1;
    const prevYearObj = DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun[String(prevYearNum)];

    let diffText = '';
    let isPositive = true;

    if (prevYearObj) {
      const diff = totalDed - prevYearObj.totalDed;
      const pct = ((diff / prevYearObj.totalDed) * 100).toFixed(1);
      const sign = diff >= 0 ? '+' : '';
      diffText = `${sign}${diff} DED (${sign}${pct}%) vs ${prevYearNum}`;
      isPositive = diff >= 0;
    } else {
      diffText = 'Tahun Dasar';
      isPositive = true;
    }

    return { totalDed, diffText, isPositive };
  }, [k1Tahun]);

  // =========================================================================
  // DATA PROCESSING: KARTU 2 - Biaya Penyusunan DED per Tahun (5 Tahun)
  // =========================================================================
  const k2Data = useMemo(() => {
    const source = DATA_PERENCANAAN_INFRASTRUKTUR.biayaDed5Tahun;
    if (k2Kategori === 'Semua Kategori') {
      return source;
    }

    // Jika filter kategori spesifik dipilih: hanya tampilkan kategori tersebut
    return source.map((item) => {
      const filtered: any = {
        tahun: item.tahun,
        totalDed: item.totalDed,
        totalBiaya: item[k2Kategori as KategoriInfrastruktur] || 0,
      };
      KATEGORI_INFRASTRUKTUR_LIST.forEach((kat) => {
        filtered[kat] = kat === k2Kategori ? item[kat] : 0;
      });
      return filtered;
    });
  }, [k2Kategori]);

  const k2Summary = useMemo(() => {
    // Total biaya DED tahun berjalan (2026)
    const year2026 = DATA_PERENCANAAN_INFRASTRUKTUR.biayaDed5Tahun.find((d) => d.tahun === '2026');
    if (!year2026) return { totalBiaya: 'Rp 61,30 Miliar' };

    if (k2Kategori === 'Semua Kategori') {
      return { totalBiaya: formatRupiahMiliar(year2026.totalBiaya) };
    }
    const val = (year2026 as any)[k2Kategori] || 0;
    return { totalBiaya: formatRupiahMiliar(val) };
  }, [k2Kategori]);

  // =========================================================================
  // DATA PROCESSING: KARTU 3 - Biaya vs Waktu Penyusunan DED (Bubble Chart)
  // =========================================================================
  const k3Data = useMemo(() => {
    const yearObj =
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun[k3Tahun] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun['2026'];
    const avgWaktuGlobal = yearObj.rerataWaktuHari;

    return yearObj.items.map((item) => {
      const isAboveAvg = item.waktuHari > avgWaktuGlobal;
      return {
        ...item,
        name: item.kategori,
        x: item.waktuHari,
        y: item.biayaPerDedMiliar,
        z: item.jumlahDed,
        isAboveAvg,
        color: isAboveAvg ? '#f59e0b' : '#2563eb', // Oranye jika di atas rerata, biru jika tidak
      };
    });
  }, [k3Tahun]);

  const k3Summary = useMemo(() => {
    const yearObj =
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun[k3Tahun] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun['2026'];
    return {
      rerataWaktu: `${Math.round(yearObj.rerataWaktuHari)} Hari`,
    };
  }, [k3Tahun]);

  // =========================================================================
  // DATA PROCESSING: KARTU 4 - Rekapitulasi DED per Kategori (Tabel Ringkas)
  // =========================================================================
  const k4YearObj = useMemo(() => {
    return (
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun[k4Tahun] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.rekapPerTahun['2026']
    );
  }, [k4Tahun]);

  const maxBiayaKategori = useMemo(() => {
    return Math.max(...k4YearObj.items.map((it) => it.totalBiayaMiliar), 1);
  }, [k4YearObj]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 2 BARIS (TOTAL 4 KARTU BERUKURAN SAMA)                 */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Jumlah DED per Kategori Infrastruktur           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            {/* Header: Judul di Kiri, Angka Ringkasan di Kanan */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Jumlah DED per Kategori Infrastruktur
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k1Summary.totalDed} DED
                </span>
                <span
                  className={`text-[11px] font-semibold ml-1.5 inline-block ${
                    k1Summary.isPositive ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                >
                  {k1Summary.diffText}
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Jumlah Dokumen DED</span>
              </span>
              <span className="text-[10.5px] text-slate-500 italic">
                (Diurutkan dari Terbanyak)
              </span>
            </div>

            {/* Filter Bar: Tahun */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Jumlah DED"
                value={k1Tahun}
                onChange={(e) => setK1Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.tahunList.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Horizontal Bar Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={k1Data}
                margin={{ top: 5, right: 25, left: 110, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val} DED`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="kategori"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={105}
                />
                <Tooltip
                  formatter={(val: any, _name: any, item: any) => {
                    const p = item.payload;
                    return [
                      `${val} Dokumen DED (Total Biaya: ${formatRupiahMiliar(p.totalBiayaMiliar)} • Rerata Waktu: ${p.waktuHari} Hari)`,
                      'Jumlah DED',
                    ];
                  }}
                  labelFormatter={(label) => `Kategori Infrastruktur: ${label}`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                />
                <Bar dataKey="jumlahDed" name="Jumlah DED" radius={[0, 3, 3, 0]} barSize={18}>
                  {k1Data.map((entry, index) => (
                    <Cell
                      key={`cell-k1-${index}`}
                      fill={KATEGORI_COLORS[entry.kategori] || '#2563eb'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.datasetKartu1}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Biaya Penyusunan DED per Tahun                  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Biaya Penyusunan DED per Tahun
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k2Summary.totalBiaya}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Biaya DED TA 2026
                </span>
              </div>
            </div>

            {/* Legenda 6 Kategori Infrastruktur */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              {KATEGORI_INFRASTRUKTUR_LIST.map((kat) => (
                <span key={kat} className="flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-xs"
                    style={{ backgroundColor: KATEGORI_COLORS[kat] }}
                  />
                  <span className="text-slate-700 font-medium text-[10px]">{kat}</span>
                </span>
              ))}
            </div>

            {/* Filter Bar: Kategori Infrastruktur */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Kategori Biaya DED"
                value={k2Kategori}
                onChange={(e) => setK2Kategori(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="Semua Kategori">Semua Kategori</option>
                {KATEGORI_INFRASTRUKTUR_LIST.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Stacked Column 5 Tahun */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={k2Data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
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
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    return [`${formatRupiahMiliar(num)}`, name];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    if (p) {
                      const rerataPerDed =
                        p.totalDed > 0 ? (p.totalBiaya / p.totalDed).toFixed(2) : '0';
                      return `Tahun ${label} • Total: ${formatRupiahMiliar(p.totalBiaya)} (${p.totalDed} DED • Rerata Rp ${rerataPerDed} M/DED)`;
                    }
                    return `Tahun ${label}`;
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
                {KATEGORI_INFRASTRUKTUR_LIST.map((kat, idx) => (
                  <Bar
                    key={kat}
                    dataKey={kat}
                    name={kat}
                    stackId="biaya"
                    fill={KATEGORI_COLORS[kat]}
                    radius={idx === KATEGORI_INFRASTRUKTUR_LIST.length - 1 ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                    barSize={24}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.datasetKartu2}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Biaya vs Waktu Penyusunan DED (Bubble Chart)    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Biaya vs Waktu Penyusunan DED
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k3Summary.rerataWaktu}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Rata-rata Waktu DED
                </span>
              </div>
            </div>

            {/* Legenda Gelembung: Biru (Normal) vs Oranye (> Rerata) */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">
                  &le; Rata-rata Seluruh Kategori
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span className="text-amber-700 font-medium text-[11px]">
                  &gt; Rata-rata (Waspada Waktu Lama)
                </span>
              </span>
            </div>

            {/* Filter Bar: Tahun */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Bubble Chart"
                value={k3Tahun}
                onChange={(e) => setK3Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.tahunList.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Scatter / Bubble Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 25, left: -10, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Waktu Pelaksanaan"
                  unit=" Hari"
                  domain={[55, 140]}
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  label={{
                    value: 'Waktu Pelaksanaan Penyusunan (Hari)',
                    position: 'insideBottom',
                    offset: -10,
                    style: { fontSize: 10, fill: '#64748B', fontWeight: 600 },
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Biaya Rata-rata per DED"
                  domain={[0.5, 2.0]}
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(v) => `Rp ${v}M`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  label={{
                    value: 'Biaya per DED (Rp Miliar)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 15,
                    style: { fontSize: 10, fill: '#64748B', fontWeight: 600 },
                  }}
                />
                <ZAxis
                  type="number"
                  dataKey="z"
                  range={[90, 420]}
                  name="Jumlah DED"
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as any;
                      return (
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-md text-xs font-mono">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1 flex items-center gap-1.5 font-sans">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: data.color }}
                            />
                            <span>{data.name}</span>
                            {data.isAboveAvg && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                &gt; Rerata
                              </span>
                            )}
                          </div>
                          <div className="space-y-0.5 text-slate-600 text-[11px]">
                            <div>
                              Waktu Pelaksanaan:{' '}
                              <strong className="text-slate-900">{data.waktuHari} Hari</strong>
                            </div>
                            <div>
                              Biaya Rata-rata per DED:{' '}
                              <strong className="text-slate-900">
                                {formatRupiahMiliar(data.biayaPerDedMiliar)}
                              </strong>
                            </div>
                            <div>
                              Total Dokumen (Ukuran Gelembung):{' '}
                              <strong className="text-blue-700">{data.jumlahDed} DED</strong>
                            </div>
                            <div>
                              Total Biaya Kategori:{' '}
                              <strong className="text-slate-800">
                                {formatRupiahMiliar(data.totalBiayaMiliar)}
                              </strong>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={k3Data} name="Kategori Infrastruktur">
                  {k3Data.map((entry, index) => (
                    <Cell
                      key={`bubble-${index}`}
                      fill={entry.color}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.datasetKartu3}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Rekapitulasi DED per Kategori (Tabel Ringkas)   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Rekapitulasi DED per Kategori
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  6 Kategori
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  ({k4YearObj.totalDed} Total DED)
                </span>
              </div>
            </div>

            {/* Legenda Ringkas */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="text-[11px] text-slate-500">
                Tabel rekapitulasi DED, alokasi biaya, durasi, dan rasio biaya per dokumen
              </span>
            </div>

            {/* Filter Bar: Tahun */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Tabel Rekapitulasi"
                value={k4Tahun}
                onChange={(e) => setK4Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.tahunList.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Section */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/80">
                  <th className="py-1.5 px-2">Kategori</th>
                  <th className="py-1.5 px-2 text-right">Jumlah DED</th>
                  <th className="py-1.5 px-2 text-left">Total Biaya DED</th>
                  <th className="py-1.5 px-2 text-right">Rerata Waktu</th>
                  <th className="py-1.5 px-2 text-right">Biaya / DED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {k4YearObj.items.map((row) => {
                  const barPct = Math.round((row.totalBiayaMiliar / maxBiayaKategori) * 100);
                  return (
                    <tr key={row.kategori} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-1.5 px-2 font-semibold text-slate-900 flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: KATEGORI_COLORS[row.kategori] }}
                        />
                        <span>{row.kategori}</span>
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-slate-800">
                        {row.jumlahDed}
                      </td>
                      <td className="py-1.5 px-2 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-900 font-bold text-[10.5px] w-20 shrink-0">
                            {formatRupiahMiliar(row.totalBiayaMiliar)}
                          </span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono text-slate-700">
                        {row.waktuHari} Hari
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono text-slate-700">
                        {formatRupiahMiliar(row.biayaPerDedMiliar)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300 font-bold bg-slate-100/90 text-slate-900">
                  <td className="py-1.5 px-2 uppercase text-[10px] tracking-wider">
                    Total
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono text-blue-700 font-black">
                    {k4YearObj.totalDed}
                  </td>
                  <td className="py-1.5 px-2 font-mono text-slate-900 font-black">
                    {formatRupiahMiliar(k4YearObj.totalBiayaMiliar)}
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono text-slate-900">
                    {Math.round(k4YearObj.rerataWaktuHari)} Hari
                  </td>
                  <td className="py-1.5 px-2 text-right font-mono text-slate-900">
                    {formatRupiahMiliar(k4YearObj.rerataBiayaPerDedMiliar)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              {DATA_PERENCANAAN_INFRASTRUKTUR.metadata.datasetKartu4}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
