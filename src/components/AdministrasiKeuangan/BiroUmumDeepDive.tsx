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
} from 'recharts';
import { BIRO_UMUM_MASTER_DATA } from './biroUmumData';

// Helper formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatRupiahMiliar = (val: number): string => {
  return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
};

const formatRupiahJuta = (valJuta: number): string => {
  if (valJuta >= 1000) {
    return `Rp ${(valJuta / 1000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} M`;
  }
  return `Rp ${valJuta.toLocaleString('id-ID')} Jt`;
};

export const BiroUmumDeepDive: React.FC = () => {
  // Sheet Swap State Modes
  const [bmnViewMode, setBmnViewMode] = useState<'chart' | 'table'>('chart');
  const [penghapusanViewMode, setPenghapusanViewMode] = useState<'chart' | 'table'>('chart');
  const [hpsViewMode, setHpsViewMode] = useState<'chart' | 'table'>('chart');
  const [dokumenViewMode, setDokumenViewMode] = useState<'chart' | 'table'>('chart');
  const [arsipViewMode, setArsipViewMode] = useState<'chart' | 'table'>('chart');
  const [kunjunganViewMode, setKunjunganViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // Filter States for Kartu 1: Inventarisasi Aset BMN
  // --------------------------------------------------------------------------
  const [bmnTahun, setBmnTahun] = useState<string>('2026');
  const [bmnSemester, setBmnSemester] = useState<string>('Semua Semester');
  const [bmnUapkpb, setBmnUapkpb] = useState<string>('Semua UAPKPB');

  const bmnChartData = useMemo(() => {
    const records = BIRO_UMUM_MASTER_DATA.inventarisasiAsetBmn.records;
    const match = records.find(
      (r) =>
        r.tahun === bmnTahun &&
        r.semester === bmnSemester &&
        r.uapkpb === bmnUapkpb
    );
    if (match) return match.items;

    const yearMatch = records.find((r) => r.tahun === bmnTahun && r.uapkpb === bmnUapkpb);
    if (yearMatch) return yearMatch.items;

    const baseMatch = records.find((r) => r.tahun === bmnTahun);
    return baseMatch ? baseMatch.items : records[0].items;
  }, [bmnTahun, bmnSemester, bmnUapkpb]);

  // Hitung total barang Kartu 1
  const totalBarangBmn = useMemo(() => {
    return bmnChartData.reduce(
      (acc, curr) => acc + curr.kondisiBaik + curr.kondisiRusakRingan + curr.kondisiRusakBerat,
      0
    );
  }, [bmnChartData]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 2: Nilai Lelang
  // --------------------------------------------------------------------------
  const totalNilaiLelang = useMemo(() => {
    return BIRO_UMUM_MASTER_DATA.penghapusanAset.records.reduce(
      (acc, curr) => acc + curr.nilaiLelang,
      0
    );
  }, []);

  // --------------------------------------------------------------------------
  // Filter States for Kartu 3: Nilai HPS Pengadaan
  // --------------------------------------------------------------------------
  const [pengadaanTahun, setPengadaanTahun] = useState<string>('2026');
  const [pengadaanTriwulan, setPengadaanTriwulan] = useState<string>('Semua Triwulan');

  const hpsChartData = useMemo(() => {
    const key = `${pengadaanTahun}-${pengadaanTriwulan}`;
    const dict = BIRO_UMUM_MASTER_DATA.pengadaanBarangJasa.recordsByFilter;
    return dict[key] || dict['2026-Semua Triwulan'];
  }, [pengadaanTahun, pengadaanTriwulan]);

  const totalHpsPengadaanJuta = useMemo(() => {
    return hpsChartData.reduce((acc, curr) => acc + curr.totalHps, 0);
  }, [hpsChartData]);

  // --------------------------------------------------------------------------
  // Filter States for Kartu 4: Penerbitan Dokumen
  // --------------------------------------------------------------------------
  const [dokumenTahun, setDokumenTahun] = useState<string>('2026');
  const [dokumenTriwulan, setDokumenTriwulan] = useState<string>('Semua Triwulan');

  const dokumenChartData = useMemo(() => {
    const key = `${dokumenTahun}-${dokumenTriwulan}`;
    const dict = BIRO_UMUM_MASTER_DATA.penerbitanDokumen.recordsByFilter;
    return dict[key] || dict['2026-Semua Triwulan'];
  }, [dokumenTahun, dokumenTriwulan]);

  const totalDokumenTerbit = useMemo(() => {
    return dokumenChartData.reduce((acc, curr) => acc + curr.totalDokumen, 0);
  }, [dokumenChartData]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 5: Total Arsip di Record Centre
  // --------------------------------------------------------------------------
  const totalArsipRecordCentre = useMemo(() => {
    return BIRO_UMUM_MASTER_DATA.recordCentreArsip.records.reduce(
      (acc, curr) => acc + curr.totalArsip,
      0
    );
  }, []);

  // --------------------------------------------------------------------------
  // Summary for Kartu 6: Total Kunjungan Bulan Terakhir (Desember 2026)
  // --------------------------------------------------------------------------
  const totalKunjunganBulanTerakhir = useMemo(() => {
    const monthly = BIRO_UMUM_MASTER_DATA.kunjunganWebsite.monthlyRecords;
    const lastMonth = monthly[monthly.length - 1];
    return lastMonth ? lastMonth.total : 0;
  }, []);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA)                 */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Inventarisasi Aset per Jenis BMN                */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Top Section */}
          <div>
            {/* Header: Title Left, Big Summary Number Right */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Inventarisasi Aset per Jenis BMN
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalBarangBmn)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Barang
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Baik</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Rusak Ringan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" />
                <span className="text-slate-700 font-medium text-[11px]">Rusak Berat</span>
              </span>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Aset BMN"
                value={bmnTahun}
                onChange={(e) => setBmnTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {BIRO_UMUM_MASTER_DATA.inventarisasiAsetBmn.filters.tahunList.map((t) => (
                  <option key={t} value={t}>
                    Th {t}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Semester Aset BMN"
                value={bmnSemester}
                onChange={(e) => setBmnSemester(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {BIRO_UMUM_MASTER_DATA.inventarisasiAsetBmn.filters.semesterList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter UAPKPB Aset BMN"
                value={bmnUapkpb}
                onChange={(e) => setBmnUapkpb(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer max-w-[180px] truncate"
              >
                {BIRO_UMUM_MASTER_DATA.inventarisasiAsetBmn.filters.uapkpbList.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={bmnChartData}
                margin={{ top: 2, right: 15, left: 105, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => formatNumberId(val)}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="jenisBmn"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  formatter={(value: any, name: any, item: any) => {
                    const payload = item.payload;
                    const total = payload.kondisiBaik + payload.kondisiRusakRingan + payload.kondisiRusakBerat;
                    const pct = total > 0 ? ((Number(value) / total) * 100).toFixed(1) : '0';
                    const labelMap: Record<string, string> = {
                      kondisiBaik: 'Kondisi Baik',
                      kondisiRusakRingan: 'Rusak Ringan',
                      kondisiRusakBerat: 'Rusak Berat',
                    };
                    return [`${formatNumberId(Number(value))} barang (${pct}%)`, labelMap[name] || name];
                  }}
                  labelFormatter={(label) => `Jenis: ${label}`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                />
                <Bar dataKey="kondisiBaik" name="kondisiBaik" stackId="bmn" fill="#2563eb" radius={[0, 0, 0, 0]} />
                <Bar dataKey="kondisiRusakRingan" name="kondisiRusakRingan" stackId="bmn" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                <Bar dataKey="kondisiRusakBerat" name="kondisiRusakBerat" stackId="bmn" fill="#ef4444" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Daftar Inventarisasi Aset BP Batam (Terbuka, persemester)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Penghapusan Aset: Nilai Perolehan vs Lelang     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penghapusan Aset: Nilai Perolehan vs Lelang
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(totalNilaiLelang)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Nilai Lelang
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Nilai Perolehan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Nilai Lelang</span>
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BIRO_UMUM_MASTER_DATA.penghapusanAset.records}
                margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="semesterTahun"
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
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    return [
                      formatRupiahMiliar(num),
                      name === 'nilaiPerolehan' ? 'Nilai Perolehan Aset' : 'Nilai Hasil Lelang',
                    ];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    return p
                      ? `${label} • Total Item: ${p.jumlahItem} • Rasio Recovery: ${p.persentaseRecovery}%`
                      : label;
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
                  dataKey="nilaiPerolehan"
                  name="nilaiPerolehan"
                  fill="#94a3b8"
                  radius={[3, 3, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="nilaiLelang"
                  name="nilaiLelang"
                  fill="#2563eb"
                  radius={[3, 3, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Daftar Penghapusan Aset BP Batam (Terbuka, persemester)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Nilai HPS Pengadaan per Unit                    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Nilai HPS Pengadaan per Unit
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahJuta(totalHpsPengadaanJuta)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total HPS
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Barang</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[11px]">Jasa Konsultansi</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[11px]">Pekerjaan Konstruksi</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Jasa Lainnya</span>
              </span>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Anggaran Pengadaan"
                value={pengadaanTahun}
                onChange={(e) => setPengadaanTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {BIRO_UMUM_MASTER_DATA.pengadaanBarangJasa.filters.tahunList.map((t) => (
                  <option key={t} value={t}>
                    TA {t}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Triwulan Pengadaan"
                value={pengadaanTriwulan}
                onChange={(e) => setPengadaanTriwulan(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {BIRO_UMUM_MASTER_DATA.pengadaanBarangJasa.filters.triwulanList.map((tw) => (
                  <option key={tw} value={tw}>
                    {tw}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={hpsChartData}
                margin={{ top: 2, right: 15, left: 110, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => formatRupiahJuta(val)}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="namaUnit"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={105}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const num = Number(val);
                    const total = item.payload.totalHps;
                    const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                    const labelMap: Record<string, string> = {
                      barang: 'Pengadaan Barang',
                      jasaKonsultansi: 'Jasa Konsultansi',
                      pekerjaanKonstruksi: 'Pekerjaan Konstruksi',
                      jasaLainnya: 'Jasa Lainnya',
                    };
                    return [`${formatRupiahJuta(num)} (${pct}%)`, labelMap[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const total = items && items[0]?.payload?.totalHps;
                    return total ? `${label} • Total: ${formatRupiahJuta(total)}` : label;
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
                <Bar dataKey="barang" name="barang" stackId="hps" fill="#2563eb" radius={[0, 0, 0, 0]} />
                <Bar dataKey="jasaKonsultansi" name="jasaKonsultansi" stackId="hps" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pekerjaanKonstruksi" name="pekerjaanKonstruksi" stackId="hps" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                <Bar dataKey="jasaLainnya" name="jasaLainnya" stackId="hps" fill="#94a3b8" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Data Pengadaan Barang dan Jasa BP Batam (MANPRO)/LPSE (Terbuka, pertriwulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Dokumen Terbit per Unit Kerja                   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Dokumen Terbit per Unit Kerja
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalDokumenTerbit)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Dokumen
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" />
                <span className="text-slate-700 font-medium text-[11px]">SK Kepala</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Surat Perintah</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[11px]">Surat Tugas</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Surat Keluar</span>
              </span>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Dokumen Terbit"
                value={dokumenTahun}
                onChange={(e) => setDokumenTahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {BIRO_UMUM_MASTER_DATA.penerbitanDokumen.filters.tahunList.map((t) => (
                  <option key={t} value={t}>
                    Tahun {t}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Triwulan Dokumen Terbit"
                value={dokumenTriwulan}
                onChange={(e) => setDokumenTriwulan(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {BIRO_UMUM_MASTER_DATA.penerbitanDokumen.filters.triwulanList.map((tw) => (
                  <option key={tw} value={tw}>
                    {tw}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dokumenChartData}
                margin={{ top: 2, right: 15, left: 110, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => formatNumberId(val)}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="unitKerja"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={105}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const num = Number(val);
                    const total = item.payload.totalDokumen;
                    const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                    const labelMap: Record<string, string> = {
                      skKepala: 'SK Kepala BP Batam',
                      suratPerintah: 'Surat Perintah',
                      suratTugas: 'Surat Tugas',
                      suratKeluar: 'Surat Keluar',
                    };
                    return [`${formatNumberId(num)} dok (${pct}%)`, labelMap[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const total = items && items[0]?.payload?.totalDokumen;
                    return total ? `${label} • Total: ${formatNumberId(total)} dokumen` : label;
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
                <Bar dataKey="skKepala" name="skKepala" stackId="dok" fill="#1e40af" radius={[0, 0, 0, 0]} />
                <Bar dataKey="suratPerintah" name="suratPerintah" stackId="dok" fill="#2563eb" radius={[0, 0, 0, 0]} />
                <Bar dataKey="suratTugas" name="suratTugas" stackId="dok" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                <Bar dataKey="suratKeluar" name="suratKeluar" stackId="dok" fill="#94a3b8" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Terbuka dan Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Daftar SK Kepala BP Batam, SP, ST, Surat Keluar menurut Unit Kerja (Terbuka dan Tertutup, pertriwulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Komposisi Arsip di Record Centre                */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Komposisi Arsip di Record Centre
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalArsipRecordCentre)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Arsip
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Inaktif</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                <span className="text-slate-700 font-medium text-[11px]">Usul Musnah</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[11px]">Permanen</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                <span className="text-slate-700 font-medium text-[11px]">Musnah</span>
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={BIRO_UMUM_MASTER_DATA.recordCentreArsip.records}
                margin={{ top: 2, right: 15, left: 110, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => formatNumberId(val)}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="unitKerja"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={105}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => {
                    const num = Number(val);
                    const total = item.payload.totalArsip;
                    const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                    const labelMap: Record<string, string> = {
                      arsipInaktif: 'Arsip Inaktif',
                      usulMusnah: 'Usul Musnah',
                      permanen: 'Arsip Permanen',
                      musnah: 'Telah Dimusnahkan',
                    };
                    return [`${formatNumberId(num)} berkas (${pct}%)`, labelMap[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const total = items && items[0]?.payload?.totalArsip;
                    return total ? `${label} • Total: ${formatNumberId(total)} arsip` : label;
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
                <Bar dataKey="arsipInaktif" name="arsipInaktif" stackId="arsip" fill="#2563eb" radius={[0, 0, 0, 0]} />
                <Bar dataKey="usulMusnah" name="usulMusnah" stackId="arsip" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="permanen" name="permanen" stackId="arsip" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="musnah" name="musnah" stackId="arsip" fill="#64748b" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Rekapitulasi Arsip Unit Kerja di Record Centre (Terbuka, pertahun)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Kunjungan Website per Kategori                   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kunjungan Website per Kategori
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(totalKunjunganBulanTerakhir)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Kunjungan Des 2026
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Investasi</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[11px]">Berita</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[11px]">IBOSS</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#64748b]" />
                <span className="text-slate-700 font-medium text-[11px]">PPID</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-xs bg-[#f59e0b]" />
                <span className="text-slate-700 font-medium text-[11px]">Katalog Lelang</span>
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={BIRO_UMUM_MASTER_DATA.kunjunganWebsite.monthlyRecords}
                margin={{ top: 10, right: 15, left: -5, bottom: 0 }}
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
                  tickFormatter={(val) => `${Math.round(val / 1000)}k`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    const map: Record<string, string> = {
                      layananInvestasi: 'Layanan Investasi',
                      beritaPublikasi: 'Berita & Publikasi',
                      portalIboss: 'Portal IBOSS',
                      ppidTransparansi: 'PPID Transparansi',
                      katalogAsetLelang: 'Katalog Lelang',
                    };
                    return [`${formatNumberId(num)} Kunjungan`, map[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const total = items && items[0]?.payload?.total;
                    return total
                      ? `Bulan ${label} • Total: ${formatNumberId(total)} sesi`
                      : `Bulan ${label}`;
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
                <Line
                  type="monotone"
                  dataKey="layananInvestasi"
                  name="layananInvestasi"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#2563eb' }}
                  activeDot={{ r: 4.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="beritaPublikasi"
                  name="beritaPublikasi"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#3b82f6' }}
                  activeDot={{ r: 4.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="portalIboss"
                  name="portalIboss"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#10b981' }}
                  activeDot={{ r: 4.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="ppidTransparansi"
                  name="ppidTransparansi"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#64748b' }}
                  activeDot={{ r: 4.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="katalogAsetLelang"
                  name="katalogAsetLelang"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#f59e0b' }}
                  activeDot={{ r: 4.5 }}
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
              Jumlah Kunjungan Website (Tertutup, perbulan)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
