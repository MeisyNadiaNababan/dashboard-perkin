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

// Helper formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

export const BiroHukumDeepDive: React.FC = () => {
  // --------------------------------------------------------------------------
  // Summary for Kartu 1: Total Kegiatan Tahun Berjalan (2026)
  // --------------------------------------------------------------------------
  const totalKegiatanTahunBerjalan = useMemo(() => {
    return BIRO_HUKUM_MASTER_DATA.trenLayananHukum.monthlyRecords.reduce(
      (acc, curr) => acc + curr.total,
      0
    );
  }, []);

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
  const totalDokumenPerkara = useMemo(() => {
    return BIRO_HUKUM_MASTER_DATA.penangananPerkara.monthlyRecords.reduce(
      (acc, curr) => acc + curr.jumlahDokumen,
      0
    );
  }, []);

  // --------------------------------------------------------------------------
  // Summary for Kartu 4: Total Rancangan Produk Hukum
  // --------------------------------------------------------------------------
  const totalRancanganProdukHukum = useMemo(() => {
    return BIRO_HUKUM_MASTER_DATA.rancanganProdukHukum.monthlyRecords.reduce(
      (acc, curr) => acc + curr.total,
      0
    );
  }, []);

  // --------------------------------------------------------------------------
  // Summary for Kartu 5: Total Dokumen Regulasi Investasi
  // --------------------------------------------------------------------------
  const totalRegulasiInvestasi = useMemo(() => {
    return BIRO_HUKUM_MASTER_DATA.regulasiInvestasi.semesterRecords.reduce(
      (acc, curr) => acc + curr.jumlahDokumen,
      0
    );
  }, []);

  // --------------------------------------------------------------------------
  // Summary for Kartu 6: Rerata Persentase Tahun Terakhir (2026)
  // --------------------------------------------------------------------------
  const dataPenyelesaianTerakhir = useMemo(() => {
    const list = BIRO_HUKUM_MASTER_DATA.penyelesaianPerkaraDanPermasalahan.yearlyRecords;
    return list[list.length - 1];
  }, []);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA PER BARIS)       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Tren Layanan Hukum per Bulan                    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Tren Layanan Hukum per Bulan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalKegiatanTahunBerjalan)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Kegiatan 2026
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Kajian Hukum / Rekomendasi</span>
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

          {/* Chart Section: Stacked Column */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BIRO_HUKUM_MASTER_DATA.trenLayananHukum.monthlyRecords}
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
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Komposisi Layanan Hukum
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataKomposisi.layananTerbesar.persentase.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {dataKomposisi.layananTerbesar.nama}
                </span>
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

          {/* Chart Section: Donut Chart with percentage labels */}
          <div className="flex-1 w-full min-h-0 flex items-center justify-center my-1">
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
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, persentase }) => {
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
                        {`${persentase.toFixed(0)}%`}
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
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalDokumenPerkara)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Dokumen Perkara
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Jumlah Dokumen Perkara</span>
              </span>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="h-32 w-full my-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={BIRO_HUKUM_MASTER_DATA.penangananPerkara.monthlyRecords}
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
                  {BIRO_HUKUM_MASTER_DATA.penangananPerkara.perkaraTerbaru.map((p) => (
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
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalRancanganProdukHukum)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Rancangan
                </span>
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

          {/* Chart Section: Clustered Column */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BIRO_HUKUM_MASTER_DATA.rancanganProdukHukum.monthlyRecords}
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
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalRegulasiInvestasi)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Regulasi
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Jumlah Dokumen Regulasi per Semester</span>
              </span>
            </div>
          </div>

          {/* Column Chart Section */}
          <div className="h-32 w-full my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BIRO_HUKUM_MASTER_DATA.regulasiInvestasi.semesterRecords}
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
                  {BIRO_HUKUM_MASTER_DATA.regulasiInvestasi.daftarRegulasiTerbaru.map((r) => (
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
                  Persentase Penyelesaian Perkara dan Permasalahan Hukum
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataPenyelesaianTerakhir ? `${dataPenyelesaianTerakhir.rerataPersentase.toFixed(1)}%` : '95.9%'}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Rerata Capaian 2026
                </span>
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
                <span className="text-slate-700 font-medium text-[11px]">Permasalahan Hukum Diselesaikan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-t border-dashed border-[#ef4444]" />
                <span className="text-slate-600 font-medium text-[10px]">Target (100%)</span>
              </span>
            </div>
          </div>

          {/* Chart Section: Line Chart 2 Seri dengan Garis Target 100% */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={BIRO_HUKUM_MASTER_DATA.penyelesaianPerkaraDanPermasalahan.yearlyRecords}
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
