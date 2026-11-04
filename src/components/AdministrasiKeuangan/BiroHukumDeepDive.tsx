import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { BIRO_HUKUM_MASTER_DATA } from './biroHukumData';
import { BarChart3, Table as TableIcon, Scale, FileText, CheckCircle2 } from 'lucide-react';

// Helper formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

export const BiroHukumDeepDive: React.FC = () => {
  // Sheet Swap State Modes ('chart' | 'table') for all 6 cards
  const [layananViewMode, setLayananViewMode] = useState<'chart' | 'table'>('chart');
  const [komposisiViewMode, setKomposisiViewMode] = useState<'chart' | 'table'>('chart');
  const [perkaraViewMode, setPerkaraViewMode] = useState<'chart' | 'table'>('chart');
  const [perkaraSubTab, setPerkaraSubTab] = useState<'rekap' | 'register'>('rekap');
  const [produkHukumViewMode, setProdukHukumViewMode] = useState<'chart' | 'table'>('chart');
  const [regulasiViewMode, setRegulasiViewMode] = useState<'chart' | 'table'>('chart');
  const [regulasiSubTab, setRegulasiSubTab] = useState<'rekap' | 'daftar'>('rekap');
  const [penyelesaianViewMode, setPenyelesaianViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // Summary for Kartu 1: Total Kegiatan Tahun Berjalan (2026)
  // --------------------------------------------------------------------------
  const recordsLayananHukum = BIRO_HUKUM_MASTER_DATA.trenLayananHukum.monthlyRecords;
  const totalKegiatanTahunBerjalan = useMemo(() => {
    return recordsLayananHukum.reduce((acc, curr) => acc + curr.total, 0);
  }, [recordsLayananHukum]);

  const totalKajianHukum = useMemo(() => recordsLayananHukum.reduce((acc, c) => acc + c.kajianHukum, 0), [recordsLayananHukum]);
  const totalPendampinganHukum = useMemo(() => recordsLayananHukum.reduce((acc, c) => acc + c.pendampinganHukum, 0), [recordsLayananHukum]);
  const totalNonLitigasi = useMemo(() => recordsLayananHukum.reduce((acc, c) => acc + c.nonLitigasi, 0), [recordsLayananHukum]);

  // --------------------------------------------------------------------------
  // State and Data for Kartu 2: Komposisi Layanan Hukum (Donut Chart)
  // --------------------------------------------------------------------------
  const [komposisiTahun, setKomposisiTahun] = useState<string>('2026');

  const dataKomposisi = useMemo(() => {
    return (
      BIRO_HUKUM_MASTER_DATA.komposisiLayananHukum.byTahun[komposisiTahun] ||
      BIRO_HUKUM_MASTER_DATA.komposisiLayananHukum.byTahun['2026']
    );
  }, [komposisiTahun]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 3: Total Dokumen Perkara
  // --------------------------------------------------------------------------
  const recordsPerkaraBulanan = BIRO_HUKUM_MASTER_DATA.penangananPerkara.monthlyRecords;
  const totalDokumenPerkara = useMemo(() => {
    return recordsPerkaraBulanan.reduce((acc, curr) => acc + curr.jumlahDokumen, 0);
  }, [recordsPerkaraBulanan]);

  const daftarPerkaraTerbaru = BIRO_HUKUM_MASTER_DATA.penangananPerkara.perkaraTerbaru;

  // --------------------------------------------------------------------------
  // Summary for Kartu 4: Total Rancangan Produk Hukum
  // --------------------------------------------------------------------------
  const recordsProdukHukum = BIRO_HUKUM_MASTER_DATA.rancanganProdukHukum.monthlyRecords;
  const totalRancanganProdukHukum = useMemo(() => {
    return recordsProdukHukum.reduce((acc, curr) => acc + curr.total, 0);
  }, [recordsProdukHukum]);

  const totalPeraturan = useMemo(() => recordsProdukHukum.reduce((acc, c) => acc + c.rancanganPeraturan, 0), [recordsProdukHukum]);
  const totalKeputusan = useMemo(() => recordsProdukHukum.reduce((acc, c) => acc + c.rancanganKeputusan, 0), [recordsProdukHukum]);
  const totalPerjanjianMou = useMemo(() => recordsProdukHukum.reduce((acc, c) => acc + c.rancanganPerjanjianMOU, 0), [recordsProdukHukum]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 5: Total Dokumen Regulasi Investasi
  // --------------------------------------------------------------------------
  const recordsRegulasiInvestasi = BIRO_HUKUM_MASTER_DATA.regulasiInvestasi.semesterRecords;
  const totalRegulasiInvestasi = useMemo(() => {
    return recordsRegulasiInvestasi.reduce((acc, curr) => acc + curr.jumlahDokumen, 0);
  }, [recordsRegulasiInvestasi]);

  const daftarRegulasiInvestasi = BIRO_HUKUM_MASTER_DATA.regulasiInvestasi.daftarRegulasiTerbaru;

  // --------------------------------------------------------------------------
  // Summary for Kartu 6: Rerata Persentase Tahun Terakhir (2026)
  // --------------------------------------------------------------------------
  const recordsPenyelesaian = BIRO_HUKUM_MASTER_DATA.penyelesaianPerkaraDanPermasalahan.yearlyRecords;
  const dataPenyelesaianTerakhir = useMemo(() => {
    return recordsPenyelesaian[recordsPenyelesaian.length - 1];
  }, [recordsPenyelesaian]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA DENGAN SHEET SWAP)*/}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Tren Layanan Hukum per Bulan                    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Tren Layanan Hukum per Bulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volume kajian, rekomendasi hukum, pendampingan &amp; non-litigasi
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setLayananViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      layananViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayananViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      layananViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Tabel Detail
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                    {formatNumberId(totalKegiatanTahunBerjalan)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Kegiatan 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Kajian Hukum</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[11px]">Pendampingan Hukum</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Non Litigasi</span>
              </span>
            </div>
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {layananViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recordsLayananHukum}
                  margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
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
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const total = item.payload.total;
                      const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                      const labelMap: Record<string, string> = {
                        kajianHukum: 'Kajian Hukum / Rekomendasi',
                        pendampinganHukum: 'Pendampingan Hukum',
                        nonLitigasi: 'Pelayanan Non Litigasi',
                      };
                      return [`${num} kegiatan (${pct}%)`, labelMap[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const total = items && items[0]?.payload?.total;
                      return total ? `Bulan ${label} • Total Kegiatan: ${total}` : `Bulan ${label}`;
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
                  <Bar dataKey="kajianHukum" name="kajianHukum" stackId="layanan" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={20} />
                  <Bar dataKey="pendampinganHukum" name="pendampinganHukum" stackId="layanan" fill="#60a5fa" radius={[0, 0, 0, 0]} barSize={20} />
                  <Bar dataKey="nonLitigasi" name="nonLitigasi" stackId="layanan" fill="#94a3b8" radius={[3, 3, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan (2026)</th>
                      <th className="py-1.5 px-2 text-right">Kajian Hukum</th>
                      <th className="py-1.5 px-2 text-right">Pendampingan</th>
                      <th className="py-1.5 px-2 text-right">Non Litigasi</th>
                      <th className="py-1.5 px-2 text-right">Total Kegiatan</th>
                      <th className="py-1.5 px-2 text-right">Kontribusi</th>
                      <th className="py-1.5 px-2 text-center">Status Beban</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsLayananHukum.map((row, idx) => {
                      const kontribusi = totalKegiatanTahunBerjalan > 0 ? (row.total / totalKegiatanTahunBerjalan) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.bulan} 2026</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{row.kajianHukum}</td>
                          <td className="py-1.5 px-2 text-right text-sky-700">{row.pendampinganHukum}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{row.nonLitigasi}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{row.total}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{kontribusi.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            {row.total >= 40 ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                Tinggi
                              </span>
                            ) : row.total >= 25 ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                Moderat
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                Normal
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Akumulasi 2026</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-bold">{totalKajianHukum}</td>
                      <td className="py-1.5 px-2 text-right text-sky-800">{totalPendampinganHukum}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{totalNonLitigasi}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{totalKegiatanTahunBerjalan}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">Terkendali</td>
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
              {BIRO_HUKUM_MASTER_DATA.trenLayananHukum.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Komposisi Layanan Hukum (Donut Chart)           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Komposisi Layanan Hukum
                </h3>
                <p className="text-[11px] text-slate-500">
                  Proporsi penugasan legal advisory dan pendampingan litigasi
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setKomposisiViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      komposisiViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomposisiViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      komposisiViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Tabel Detail
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                    {dataKomposisi.layananTerbesar.persentase.toFixed(1)}%
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    {dataKomposisi.layananTerbesar.nama}
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda & Filter Tahun */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {dataKomposisi.items.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium text-[11px]">{item.nama}</span>
                  </span>
                ))}
              </div>

              {/* Filter Tahun */}
              <select
                aria-label="Filter Tahun Komposisi Layanan"
                value={komposisiTahun}
                onChange={(e) => setKomposisiTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {BIRO_HUKUM_MASTER_DATA.komposisiLayananHukum.filterTahunList.map((t) => (
                  <option key={t} value={t}>
                    Th {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Donut vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 flex items-center justify-center my-1 overflow-hidden">
            {komposisiViewMode === 'chart' ? (
              <div className="w-full h-full flex flex-col justify-between">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataKomposisi.items}
                        dataKey="jumlah"
                        nameKey="nama"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        label={(props: any) => {
                          const { cx, cy, midAngle, innerRadius, outerRadius } = props;
                          const persentase = props.persentase ?? (props.percent ? props.percent * 100 : 0);
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#FFFFFF"
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="text-[10px] font-mono font-bold"
                            >
                              {`${Number(persentase).toFixed(0)}%`}
                            </text>
                          );
                        }}
                        labelLine={false}
                      >
                        {dataKomposisi.items.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          `${val} Kegiatan (${item.payload.persentase}%)`,
                          item.payload.nama,
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
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Detail List Box di Bawah Donut */}
                <div className="grid grid-cols-3 gap-2 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-mono mb-1">
                  {dataKomposisi.items.map((it, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-slate-500 block truncate text-[9px] font-sans">{it.nama}</span>
                      <span className="font-bold text-slate-800">{it.jumlah} keg ({it.persentase}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">No</th>
                      <th className="py-1.5 px-2">Klasifikasi Layanan Hukum</th>
                      <th className="py-1.5 px-2 text-right">Jumlah Kegiatan</th>
                      <th className="py-1.5 px-2 text-right">Porsi Komposisi</th>
                      <th className="py-1.5 px-2 text-right">Rerata / Bulan</th>
                      <th className="py-1.5 px-2 text-center">Fokus Kebijakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataKomposisi.items.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 text-slate-400 font-sans">{idx + 1}</td>
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                          <span>{row.nama}</span>
                        </td>
                        <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{row.jumlah} berkas</td>
                        <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{row.persentase.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{(row.jumlah / 12).toFixed(1)} /bln</td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          {row.persentase >= 40 ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              Layanan Dominan
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              Fasilitasi Rutin
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={2}>
                        Total Beban Kerja Layanan ({komposisiTahun})
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">
                        {dataKomposisi.totalKegiatan} kegiatan
                      </td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
                      <td className="py-1.5 px-2 text-right text-slate-800">
                        {(dataKomposisi.totalKegiatan / 12).toFixed(1)} /bln
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">100% Terlayani</td>
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
              {BIRO_HUKUM_MASTER_DATA.komposisiLayananHukum.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Penanganan Perkara per Bulan                    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penanganan Perkara per Bulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Register penanganan perkara perdata, TUN, pidana, dan arbitrase
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPerkaraViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      perkaraViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerkaraViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      perkaraViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Tabel Detail
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                    {formatNumberId(totalDokumenPerkara)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Dokumen
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-controls row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">Dokumen Perkara Masuk</span>
                </span>
              </div>

              {perkaraViewMode === 'table' && (
                <div className="inline-flex rounded-md border border-slate-200 bg-slate-100 p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setPerkaraSubTab('rekap')}
                    className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      perkaraSubTab === 'rekap' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Rekap Bulanan
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerkaraSubTab('register')}
                    className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      perkaraSubTab === 'register' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Register Perkara
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {perkaraViewMode === 'chart' ? (
              <div className="w-full h-full flex flex-col justify-between">
                {/* Line Chart Section */}
                <div className="h-28 w-full my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={recordsPerkaraBulanan}
                      margin={{ top: 8, right: 15, left: -15, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(val: any) => [`${val} Dokumen`, 'Dokumen Perkara']}
                        labelFormatter={(label) => `Bulan ${label}`}
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
                        dataKey="jumlahDokumen"
                        name="jumlahDokumen"
                        stroke="#2563eb"
                        strokeWidth={2.2}
                        dot={{ r: 3, fill: '#2563eb' }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Tabel Kecil 5 Perkara Terbaru (Tanggal, Tentang) */}
                <div className="border border-slate-200/90 rounded-lg overflow-hidden bg-slate-50/50 my-1">
                  <div className="px-2.5 py-1 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-800">5 Perkara Hukum Terbaru</span>
                    <span className="text-slate-500 font-mono">Status Proses</span>
                  </div>
                  <div className="overflow-x-auto max-h-[110px] overflow-y-auto">
                    <table className="w-full text-left border-collapse text-[10.5px]">
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {daftarPerkaraTerbaru.map((p) => (
                          <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                            <td className="py-1 px-2.5 font-mono text-slate-500 whitespace-nowrap text-[9.5px]">
                              {p.tanggal}
                            </td>
                            <td className="py-1 px-2.5 text-slate-800 font-medium">
                              <span className="line-clamp-1" title={p.tentang}>
                                {p.tentang}
                              </span>
                            </td>
                            <td className="py-1 px-2.5 text-right whitespace-nowrap">
                              <span className="text-[9px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : perkaraSubTab === 'rekap' ? (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan (2026)</th>
                      <th className="py-1.5 px-2 text-right">Jumlah Dokumen</th>
                      <th className="py-1.5 px-2 text-right">Akumulasi YTD</th>
                      <th className="py-1.5 px-2 text-right">Porsi (%)</th>
                      <th className="py-1.5 px-2 text-center">Status Aktivitas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsPerkaraBulanan.map((row, idx) => {
                      const akumulasi = recordsPerkaraBulanan.slice(0, idx + 1).reduce((acc, c) => acc + c.jumlahDokumen, 0);
                      const porsi = totalDokumenPerkara > 0 ? (row.jumlahDokumen / totalDokumenPerkara) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.bulan} 2026</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{row.jumlahDokumen} dok</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{akumulasi} dok</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{porsi.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            {row.jumlahDokumen >= 15 ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                Intensif
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Terkendali
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Tahunan (12 Bulan)</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{totalDokumenPerkara} dok</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{totalDokumenPerkara} dok</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">100% Ditindaklanjuti</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">ID</th>
                      <th className="py-1.5 px-2">Tanggal Register</th>
                      <th className="py-1.5 px-2">Perihal / Objek Perkara</th>
                      <th className="py-1.5 px-2">Klasifikasi</th>
                      <th className="py-1.5 px-2 text-center">Status Sidang/Mediasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {daftarPerkaraTerbaru.map((p) => (
                      <tr key={p.id} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 text-blue-700 font-bold">{p.id}</td>
                        <td className="py-1.5 px-2 font-sans text-slate-600 whitespace-nowrap">{p.tanggal}</td>
                        <td className="py-1.5 px-2 font-sans font-medium text-slate-900 max-w-[220px]" title={p.tentang}>
                          {p.tentang}
                        </td>
                        <td className="py-1.5 px-2 font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {p.klasifikasi}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={3}>
                        Register Perkara Terpilih ({daftarPerkaraTerbaru.length} Dokumen Perkara Terkini)
                      </td>
                      <td className="py-1.5 px-2 font-sans text-slate-500">Kepatuhan Hukum</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">Pendampingan Penuh</td>
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
              {BIRO_HUKUM_MASTER_DATA.penangananPerkara.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Rancangan Produk Hukum per Bulan                */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Rancangan Produk Hukum per Bulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Penyusunan Peraturan Kepala BP, Keputusan &amp; Nota Kesepahaman/MoU
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setProdukHukumViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      produkHukumViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setProdukHukumViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      produkHukumViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Tabel Detail
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                    {formatNumberId(totalRancanganProdukHukum)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Rancangan
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" />
                <span className="text-slate-700 font-medium text-[11px]">Rancangan Peraturan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Rancangan Keputusan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Perjanjian &amp; MoU</span>
              </span>
            </div>
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {produkHukumViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recordsProdukHukum}
                  margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
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
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const labelMap: Record<string, string> = {
                        rancanganPeraturan: 'Rancangan Peraturan',
                        rancanganKeputusan: 'Rancangan Keputusan',
                        rancanganPerjanjianMOU: 'Perjanjian & MoU',
                      };
                      return [`${val} Dokumen`, labelMap[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const total = items && items[0]?.payload?.total;
                      return total ? `Bulan ${label} • Total Rancangan: ${total}` : `Bulan ${label}`;
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
                  <Bar dataKey="rancanganPeraturan" name="rancanganPeraturan" fill="#1e40af" radius={[3, 3, 0, 0]} barSize={8} />
                  <Bar dataKey="rancanganKeputusan" name="rancanganKeputusan" fill="#2563eb" radius={[3, 3, 0, 0]} barSize={8} />
                  <Bar dataKey="rancanganPerjanjianMOU" name="rancanganPerjanjianMOU" fill="#94a3b8" radius={[3, 3, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan (2026)</th>
                      <th className="py-1.5 px-2 text-right">Rancangan Peraturan</th>
                      <th className="py-1.5 px-2 text-right">Rancangan Keputusan</th>
                      <th className="py-1.5 px-2 text-right">Perjanjian &amp; MoU</th>
                      <th className="py-1.5 px-2 text-right">Total Produk</th>
                      <th className="py-1.5 px-2 text-right">Porsi (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsProdukHukum.map((row, idx) => {
                      const porsi = totalRancanganProdukHukum > 0 ? (row.total / totalRancanganProdukHukum) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.bulan} 2026</td>
                          <td className="py-1.5 px-2 text-right text-indigo-700 font-bold">{row.rancanganPeraturan}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700">{row.rancanganKeputusan}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{row.rancanganPerjanjianMOU}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{row.total}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{porsi.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Akumulasi TA 2026</td>
                      <td className="py-1.5 px-2 text-right text-indigo-900 font-bold">{totalPeraturan}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-bold">{totalKeputusan}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{totalPerjanjianMou}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{totalRancanganProdukHukum}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
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
              {BIRO_HUKUM_MASTER_DATA.rancanganProdukHukum.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Regulasi yang Relevan dengan Investasi          */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Regulasi yang Relevan dengan Investasi
                </h3>
                <p className="text-[11px] text-slate-500">
                  Kepastian hukum &amp; deregulasi kemudahan berinvestasi di KPBPB &amp; KEK
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setRegulasiViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      regulasiViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegulasiViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      regulasiViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Tabel Detail
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                    {formatNumberId(totalRegulasiInvestasi)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Regulasi
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-controls row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">Jumlah Regulasi Investasi per Semester</span>
                </span>
              </div>

              {regulasiViewMode === 'table' && (
                <div className="inline-flex rounded-md border border-slate-200 bg-slate-100 p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setRegulasiSubTab('rekap')}
                    className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      regulasiSubTab === 'rekap' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Rekap Semester
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegulasiSubTab('daftar')}
                    className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      regulasiSubTab === 'daftar' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Daftar Regulasi
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {regulasiViewMode === 'chart' ? (
              <div className="w-full h-full flex flex-col justify-between">
                {/* Column Chart Section */}
                <div className="h-28 w-full my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={recordsRegulasiInvestasi}
                      margin={{ top: 8, right: 15, left: -15, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis
                        dataKey="semesterTahun"
                        tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(val: any) => [`${val} Dokumen`, 'Regulasi Investasi']}
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
                        dataKey="jumlahDokumen"
                        name="jumlahDokumen"
                        fill="#2563eb"
                        radius={[3, 3, 0, 0]}
                        barSize={24}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Tabel Kecil (Tanggal, Tentang) di Bawah Grafik */}
                <div className="border border-slate-200/90 rounded-lg overflow-hidden bg-slate-50/50 my-1">
                  <div className="px-2.5 py-1 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-800">Daftar Regulasi Investasi Terbaru</span>
                    <span className="text-slate-500 font-mono">Nomor Regulasi</span>
                  </div>
                  <div className="overflow-x-auto max-h-[110px] overflow-y-auto">
                    <table className="w-full text-left border-collapse text-[10.5px]">
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {daftarRegulasiInvestasi.map((r) => (
                          <tr key={r.id} className="hover:bg-blue-50/40 transition-colors">
                            <td className="py-1 px-2.5 font-mono text-slate-500 whitespace-nowrap text-[9.5px]">
                              {r.tanggal}
                            </td>
                            <td className="py-1 px-2.5 text-slate-800 font-medium">
                              <span className="line-clamp-1" title={r.tentang}>
                                {r.tentang}
                              </span>
                            </td>
                            <td className="py-1 px-2.5 text-right whitespace-nowrap">
                              <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
                                {r.nomorRegulasi}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : regulasiSubTab === 'rekap' ? (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Periode Semester</th>
                      <th className="py-1.5 px-2 text-right">Jumlah Regulasi Diterbitkan</th>
                      <th className="py-1.5 px-2 text-right">Porsi Akumulasi</th>
                      <th className="py-1.5 px-2 text-center">Fokus Deregulasi</th>
                      <th className="py-1.5 px-2 text-center">Status Berlaku</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsRegulasiInvestasi.map((row, idx) => {
                      const porsi = totalRegulasiInvestasi > 0 ? (row.jumlahDokumen / totalRegulasiInvestasi) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.semesterTahun}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{row.jumlahDokumen} regulasi</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{porsi.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-center font-sans text-slate-600">Insentif Fiskal &amp; Lahan</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Berlaku Efektif
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Produk Regulasi</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{totalRegulasiInvestasi} regulasi</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
                      <td className="py-1.5 px-2 text-center font-sans text-slate-700">Pemberdayaan KEK &amp; FTZ</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">100% Harmonis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">ID</th>
                      <th className="py-1.5 px-2">Tanggal</th>
                      <th className="py-1.5 px-2">Nomor Regulasi</th>
                      <th className="py-1.5 px-2">Tentang / Muatan Pokok</th>
                      <th className="py-1.5 px-2 text-center">Sektor Relevan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {daftarRegulasiInvestasi.map((r) => (
                      <tr key={r.id} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 text-blue-700 font-bold">{r.id}</td>
                        <td className="py-1.5 px-2 font-sans text-slate-600 whitespace-nowrap">{r.tanggal}</td>
                        <td className="py-1.5 px-2 font-bold text-slate-900 whitespace-nowrap">{r.nomorRegulasi}</td>
                        <td className="py-1.5 px-2 font-sans text-slate-800 max-w-[220px]" title={r.tentang}>
                          {r.tentang}
                        </td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {r.sektor}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={3}>
                        Total Regulasi Terdata ({daftarRegulasiInvestasi.length} Kebijakan Hukum Kemudahan Usaha)
                      </td>
                      <td className="py-1.5 px-2 font-sans text-slate-500">Legal Certainty BP Batam</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">Terpublikasi JDIH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_HUKUM_MASTER_DATA.regulasiInvestasi.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Persentase Penyelesaian Perkara & Masalah Hukum  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Persentase Penyelesaian Perkara &amp; Permasalahan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Rasio tuntas penyelesaian sengketa perdata, tata usaha negara &amp; konsultasi
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPenyelesaianViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      penyelesaianViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setPenyelesaianViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      penyelesaianViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TableIcon className="w-3 h-3" />
                    Tabel Detail
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                    {dataPenyelesaianTerakhir ? `${dataPenyelesaianTerakhir.rerataPersentase.toFixed(1)}%` : '95.9%'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Rerata Capaian 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Perkara Diselesaikan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[11px]">Permasalahan Diselesaikan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-t border-dashed border-[#ef4444]" />
                <span className="text-slate-600 font-medium text-[10px]">Target (100%)</span>
              </span>
            </div>
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {penyelesaianViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={recordsPenyelesaian}
                  margin={{ top: 12, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 10, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[80, 105]}
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
                    label={{ value: 'Target 100%', fill: '#ef4444', fontSize: 9, position: 'top' }}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      if (name === 'persentasePerkara') {
                        return [
                          `${num.toFixed(1)}% (${item.payload.perkaraSelesai}/${item.payload.perkaraMasuk} Perkara)`,
                          'Perkara Diselesaikan',
                        ];
                      }
                      return [
                        `${num.toFixed(1)}% (${item.payload.masalahSelesai}/${item.payload.masalahMasuk} Masalah)`,
                        'Permasalahan Hukum Diselesaikan',
                      ];
                    }}
                    labelFormatter={(label) => `Tahun Anggaran ${label}`}
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
                    dataKey="persentasePerkara"
                    name="persentasePerkara"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#2563eb' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="persentaseMasalah"
                    name="persentaseMasalah"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Tahun Anggaran</th>
                      <th className="py-1.5 px-2 text-right">Perkara Masuk</th>
                      <th className="py-1.5 px-2 text-right">Perkara Tuntas</th>
                      <th className="py-1.5 px-2 text-right">% Perkara</th>
                      <th className="py-1.5 px-2 text-right">Masalah Masuk</th>
                      <th className="py-1.5 px-2 text-right">Masalah Tuntas</th>
                      <th className="py-1.5 px-2 text-right">% Masalah</th>
                      <th className="py-1.5 px-2 text-right">Rerata Capaian</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsPenyelesaian.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">TA {row.tahun}</td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{row.perkaraMasuk}</td>
                        <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{row.perkaraSelesai}</td>
                        <td className="py-1.5 px-2 text-right text-blue-800 font-bold">{row.persentasePerkara.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{row.masalahMasuk}</td>
                        <td className="py-1.5 px-2 text-right text-emerald-700 font-bold">{row.masalahSelesai}</td>
                        <td className="py-1.5 px-2 text-right text-emerald-800 font-bold">{row.persentaseMasalah.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-right font-black text-indigo-800 bg-blue-50/60">
                          {row.rerataPersentase.toFixed(1)}%
                        </td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          {row.rerataPersentase >= 95 ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Sangat Baik
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              Baik
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Rerata Historis (4 Tahun)</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">
                        {Math.round(recordsPenyelesaian.reduce((acc, c) => acc + c.perkaraMasuk, 0) / recordsPenyelesaian.length)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-bold">
                        {Math.round(recordsPenyelesaian.reduce((acc, c) => acc + c.perkaraSelesai, 0) / recordsPenyelesaian.length)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-bold">
                        {(recordsPenyelesaian.reduce((acc, c) => acc + c.persentasePerkara, 0) / recordsPenyelesaian.length).toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-right text-slate-700">
                        {Math.round(recordsPenyelesaian.reduce((acc, c) => acc + c.masalahMasuk, 0) / recordsPenyelesaian.length)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-bold">
                        {Math.round(recordsPenyelesaian.reduce((acc, c) => acc + c.masalahSelesai, 0) / recordsPenyelesaian.length)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-emerald-900 font-bold">
                        {(recordsPenyelesaian.reduce((acc, c) => acc + c.persentaseMasalah, 0) / recordsPenyelesaian.length).toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-right text-indigo-900 font-black bg-blue-50/80">
                        {(recordsPenyelesaian.reduce((acc, c) => acc + c.rerataPersentase, 0) / recordsPenyelesaian.length).toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">Konsisten Tinggi</td>
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
              {BIRO_HUKUM_MASTER_DATA.penyelesaianPerkaraDanPermasalahan.datasetName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
