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
import { BarChart3, Table as TableIcon, Layers, FileText } from 'lucide-react';

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

const formatRupiahExact = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
};

export const BiroUmumDeepDive: React.FC = () => {
  // Sheet Swap State Modes ('chart' | 'table') for all 6 cards
  const [bmnViewMode, setBmnViewMode] = useState<'chart' | 'table'>('chart');
  const [penghapusanViewMode, setPenghapusanViewMode] = useState<'chart' | 'table'>('chart');
  const [hpsViewMode, setHpsViewMode] = useState<'chart' | 'table'>('chart');
  const [hpsSubTab, setHpsSubTab] = useState<'unit' | 'paket'>('unit');
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

  const totalBmnBaik = useMemo(() => bmnChartData.reduce((acc, c) => acc + c.kondisiBaik, 0), [bmnChartData]);
  const totalBmnRusakRingan = useMemo(() => bmnChartData.reduce((acc, c) => acc + c.kondisiRusakRingan, 0), [bmnChartData]);
  const totalBmnRusakBerat = useMemo(() => bmnChartData.reduce((acc, c) => acc + c.kondisiRusakBerat, 0), [bmnChartData]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 2: Nilai Lelang
  // --------------------------------------------------------------------------
  const recordsPenghapusan = BIRO_UMUM_MASTER_DATA.penghapusanAset.records;
  const totalNilaiPerolehan = useMemo(() => recordsPenghapusan.reduce((acc, c) => acc + c.nilaiPerolehan, 0), [recordsPenghapusan]);
  const totalNilaiLelang = useMemo(() => recordsPenghapusan.reduce((acc, c) => acc + c.nilaiLelang, 0), [recordsPenghapusan]);
  const totalItemPenghapusan = useMemo(() => recordsPenghapusan.reduce((acc, c) => acc + c.jumlahItem, 0), [recordsPenghapusan]);
  const rerataRecoveryPenghapusan = useMemo(() => {
    return totalNilaiPerolehan > 0 ? (totalNilaiLelang / totalNilaiPerolehan) * 100 : 0;
  }, [totalNilaiPerolehan, totalNilaiLelang]);

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

  const totalHpsBarang = useMemo(() => hpsChartData.reduce((acc, c) => acc + c.barang, 0), [hpsChartData]);
  const totalHpsKonsultansi = useMemo(() => hpsChartData.reduce((acc, c) => acc + c.jasaKonsultansi, 0), [hpsChartData]);
  const totalHpsKonstruksi = useMemo(() => hpsChartData.reduce((acc, c) => acc + c.pekerjaanKonstruksi, 0), [hpsChartData]);
  const totalHpsJasaLainnya = useMemo(() => hpsChartData.reduce((acc, c) => acc + c.jasaLainnya, 0), [hpsChartData]);

  const filteredPaketPengadaan = useMemo(() => {
    return BIRO_UMUM_MASTER_DATA.pengadaanBarangJasa.paketPengadaanDetail.filter((p) => {
      const matchTahun = pengadaanTahun === 'Semua' || p.tahun === pengadaanTahun;
      const matchTw = pengadaanTriwulan === 'Semua Triwulan' || p.triwulan === pengadaanTriwulan;
      return matchTahun && matchTw;
    });
  }, [pengadaanTahun, pengadaanTriwulan]);

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

  const totalSkKepala = useMemo(() => dokumenChartData.reduce((acc, c) => acc + c.skKepala, 0), [dokumenChartData]);
  const totalSuratPerintah = useMemo(() => dokumenChartData.reduce((acc, c) => acc + c.suratPerintah, 0), [dokumenChartData]);
  const totalSuratTugas = useMemo(() => dokumenChartData.reduce((acc, c) => acc + c.suratTugas, 0), [dokumenChartData]);
  const totalSuratKeluar = useMemo(() => dokumenChartData.reduce((acc, c) => acc + c.suratKeluar, 0), [dokumenChartData]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 5: Total Arsip di Record Centre
  // --------------------------------------------------------------------------
  const recordsArsip = BIRO_UMUM_MASTER_DATA.recordCentreArsip.records;
  const totalArsipRecordCentre = useMemo(() => recordsArsip.reduce((acc, c) => acc + c.totalArsip, 0), [recordsArsip]);
  const totalArsipInaktif = useMemo(() => recordsArsip.reduce((acc, c) => acc + c.arsipInaktif, 0), [recordsArsip]);
  const totalArsipUsulMusnah = useMemo(() => recordsArsip.reduce((acc, c) => acc + c.usulMusnah, 0), [recordsArsip]);
  const totalArsipPermanen = useMemo(() => recordsArsip.reduce((acc, c) => acc + c.permanen, 0), [recordsArsip]);
  const totalArsipMusnah = useMemo(() => recordsArsip.reduce((acc, c) => acc + c.musnah, 0), [recordsArsip]);

  // --------------------------------------------------------------------------
  // Summary for Kartu 6: Total Kunjungan Bulan Terakhir (Desember 2026)
  // --------------------------------------------------------------------------
  const monthlyKunjungan = BIRO_UMUM_MASTER_DATA.kunjunganWebsite.monthlyRecords;
  const totalKunjunganBulanTerakhir = useMemo(() => {
    const lastMonth = monthlyKunjungan[monthlyKunjungan.length - 1];
    return lastMonth ? lastMonth.total : 0;
  }, [monthlyKunjungan]);

  const totalKunjunganTahunan = useMemo(() => monthlyKunjungan.reduce((acc, c) => acc + c.total, 0), [monthlyKunjungan]);
  const totalKunjunganInvestasi = useMemo(() => monthlyKunjungan.reduce((acc, c) => acc + c.layananInvestasi, 0), [monthlyKunjungan]);
  const totalKunjunganBerita = useMemo(() => monthlyKunjungan.reduce((acc, c) => acc + c.beritaPublikasi, 0), [monthlyKunjungan]);
  const totalKunjunganIboss = useMemo(() => monthlyKunjungan.reduce((acc, c) => acc + c.portalIboss, 0), [monthlyKunjungan]);
  const totalKunjunganPpid = useMemo(() => monthlyKunjungan.reduce((acc, c) => acc + c.ppidTransparansi, 0), [monthlyKunjungan]);
  const totalKunjunganLelang = useMemo(() => monthlyKunjungan.reduce((acc, c) => acc + c.katalogAsetLelang, 0), [monthlyKunjungan]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA DENGAN SHEET SWAP)*/}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Inventarisasi Aset per Jenis BMN                */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            {/* Header: Title Left, Sheet Swap Toggle & Big Summary Number Right */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Inventarisasi Aset per Jenis BMN
                </h3>
                <p className="text-[11px] text-slate-500">
                  Kondisi fisik aset negara (SIMAK-BMN Terpadu BP Batam)
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setBmnViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      bmnViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setBmnViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      bmnViewMode === 'table'
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
                    {formatNumberId(totalBarangBmn)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Unit
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda di Bawah Judul & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-3 text-xs">
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
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
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
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer max-w-[160px] truncate"
                >
                  {BIRO_UMUM_MASTER_DATA.inventarisasiAsetBmn.filters.uapkpbList.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chart Section vs Tabel Detail Sheet Swap */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {bmnViewMode === 'chart' ? (
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
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">No</th>
                      <th className="py-1.5 px-2">Jenis BMN</th>
                      <th className="py-1.5 px-2 text-right">Kondisi Baik</th>
                      <th className="py-1.5 px-2 text-right">Rusak Ringan</th>
                      <th className="py-1.5 px-2 text-right">Rusak Berat</th>
                      <th className="py-1.5 px-2 text-right">Total Unit</th>
                      <th className="py-1.5 px-2 text-right">% Baik</th>
                      <th className="py-1.5 px-2 text-center">Status Kelayakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {bmnChartData.map((row, idx) => {
                      const total = row.kondisiBaik + row.kondisiRusakRingan + row.kondisiRusakBerat;
                      const persenBaik = total > 0 ? (row.kondisiBaik / total) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 text-slate-400 font-sans">{idx + 1}</td>
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.jenisBmn}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{formatNumberId(row.kondisiBaik)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(row.kondisiRusakRingan)}</td>
                          <td className="py-1.5 px-2 text-right text-rose-600">{formatNumberId(row.kondisiRusakBerat)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{formatNumberId(total)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{persenBaik.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            {persenBaik >= 90 ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Sangat Baik
                              </span>
                            ) : persenBaik >= 75 ? (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                Baik
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                Perawatan
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={2}>
                        Total ({bmnTahun} • {bmnSemester})
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{formatNumberId(totalBmnBaik)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{formatNumberId(totalBmnRusakRingan)}</td>
                      <td className="py-1.5 px-2 text-right text-rose-700">{formatNumberId(totalBmnRusakBerat)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{formatNumberId(totalBarangBmn)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">
                        {totalBarangBmn > 0 ? ((totalBmnBaik / totalBarangBmn) * 100).toFixed(1) : 0}%
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">Rerata Siap Guna</td>
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
              Daftar Inventarisasi Aset BP Batam (Terbuka, persemester)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Penghapusan Aset: Nilai Perolehan vs Lelang     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penghapusan Aset: Nilai Perolehan vs Lelang
                </h3>
                <p className="text-[11px] text-slate-500">
                  Efektivitas pemindahtanganan dan recovery value aset lelang
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPenghapusanViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      penghapusanViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setPenghapusanViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      penghapusanViewMode === 'table'
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
                    {formatRupiahMiliar(totalNilaiLelang)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Lelang
                  </span>
                </div>
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
                <span className="text-slate-700 font-medium text-[11px]">Nilai Hasil Lelang</span>
              </span>
              <span className="text-slate-400 font-mono text-[10.5px]">
                • Recovery Rate: {rerataRecoveryPenghapusan.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {penghapusanViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recordsPenghapusan}
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
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Periode Semester</th>
                      <th className="py-1.5 px-2 text-right">Nilai Perolehan</th>
                      <th className="py-1.5 px-2 text-right">Nilai Lelang</th>
                      <th className="py-1.5 px-2 text-right">Penyusutan</th>
                      <th className="py-1.5 px-2 text-right">Recovery Rate</th>
                      <th className="py-1.5 px-2 text-right">Jml Item</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsPenghapusan.map((row, idx) => {
                      const penyusutan = row.nilaiPerolehan - row.nilaiLelang;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.semesterTahun}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{formatRupiahMiliar(row.nilaiPerolehan)}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{formatRupiahMiliar(row.nilaiLelang)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-500">{formatRupiahMiliar(penyusutan)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{row.persentaseRecovery.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-right text-slate-800">{formatNumberId(row.jumlahItem)} unit</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Lelang Selesai
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Akumulasi</td>
                      <td className="py-1.5 px-2 text-right text-slate-800">{formatRupiahMiliar(totalNilaiPerolehan)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">{formatRupiahMiliar(totalNilaiLelang)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-600">{formatRupiahMiliar(totalNilaiPerolehan - totalNilaiLelang)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">{rerataRecoveryPenghapusan.toFixed(1)}%</td>
                      <td className="py-1.5 px-2 text-right text-slate-900 font-bold">{formatNumberId(totalItemPenghapusan)} unit</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-700 font-bold">100% Tuntas</td>
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
              Daftar Penghapusan Aset BP Batam (Terbuka, persemester)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Nilai HPS Pengadaan per Unit                    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Nilai HPS Pengadaan per Unit
                </h3>
                <p className="text-[11px] text-slate-500">
                  Alokasi HPS Pengadaan Barang &amp; Jasa MANPRO/LPSE BP Batam
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setHpsViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      hpsViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setHpsViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      hpsViewMode === 'table'
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
                    {formatRupiahJuta(totalHpsPengadaanJuta)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total HPS
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda di Bawah Judul & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-3 text-xs">
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
                  <span className="text-slate-700 font-medium text-[11px]">Konstruksi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[11px]">Jasa Lainnya</span>
                </span>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                {hpsViewMode === 'table' && (
                  <div className="inline-flex rounded-md border border-slate-200 bg-slate-100 p-0.5 text-[10px] mr-1">
                    <button
                      type="button"
                      onClick={() => setHpsSubTab('unit')}
                      className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                        hpsSubTab === 'unit' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Rekap Unit
                    </button>
                    <button
                      type="button"
                      onClick={() => setHpsSubTab('paket')}
                      className={`px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                        hpsSubTab === 'paket' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Daftar Paket
                    </button>
                  </div>
                )}

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
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {hpsViewMode === 'chart' ? (
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
            ) : hpsSubTab === 'unit' ? (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Satuan Kerja / Unit</th>
                      <th className="py-1.5 px-2 text-right">Barang</th>
                      <th className="py-1.5 px-2 text-right">Konsultansi</th>
                      <th className="py-1.5 px-2 text-right">Konstruksi</th>
                      <th className="py-1.5 px-2 text-right">Jasa Lainnya</th>
                      <th className="py-1.5 px-2 text-right">Total HPS</th>
                      <th className="py-1.5 px-2 text-right">Porsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {hpsChartData.map((row, idx) => {
                      const porsi = totalHpsPengadaanJuta > 0 ? (row.totalHps / totalHpsPengadaanJuta) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.namaUnit}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700">{formatRupiahJuta(row.barang)}</td>
                          <td className="py-1.5 px-2 text-right text-sky-700">{formatRupiahJuta(row.jasaKonsultansi)}</td>
                          <td className="py-1.5 px-2 text-right text-indigo-700">{formatRupiahJuta(row.pekerjaanKonstruksi)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{formatRupiahJuta(row.jasaLainnya)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{formatRupiahJuta(row.totalHps)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{porsi.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Nilai HPS ({pengadaanTriwulan})</td>
                      <td className="py-1.5 px-2 text-right text-blue-800">{formatRupiahJuta(totalHpsBarang)}</td>
                      <td className="py-1.5 px-2 text-right text-sky-800">{formatRupiahJuta(totalHpsKonsultansi)}</td>
                      <td className="py-1.5 px-2 text-right text-indigo-800">{formatRupiahJuta(totalHpsKonstruksi)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{formatRupiahJuta(totalHpsJasaLainnya)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{formatRupiahJuta(totalHpsPengadaanJuta)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">ID Paket</th>
                      <th className="py-1.5 px-2">Nama Paket Pengadaan</th>
                      <th className="py-1.5 px-2">Unit Kerja</th>
                      <th className="py-1.5 px-2">Jenis</th>
                      <th className="py-1.5 px-2">Penyedia Terpilih</th>
                      <th className="py-1.5 px-2 text-right">Nilai Pagu / HPS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {filteredPaketPengadaan.map((row) => (
                      <tr key={row.id} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 text-blue-700 font-bold">{row.id}</td>
                        <td className="py-1.5 px-2 font-sans font-medium text-slate-900 truncate max-w-[200px]" title={row.namaPaket}>
                          {row.namaPaket}
                        </td>
                        <td className="py-1.5 px-2 font-sans text-slate-600 truncate max-w-[120px]">{row.namaUnit}</td>
                        <td className="py-1.5 px-2 font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {row.jenisPengadaan}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 font-sans text-slate-700 truncate max-w-[150px]">{row.namaPenyedia}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{formatRupiahExact(row.hpsRupiah)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={4}>
                        Total ({filteredPaketPengadaan.length} Paket Pekerjaan Terdaftar)
                      </td>
                      <td className="py-1.5 px-2 font-sans text-slate-500">Akumulasi HPS</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">
                        {formatRupiahExact(filteredPaketPengadaan.reduce((acc, c) => acc + c.hpsRupiah, 0))}
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
              Data Pengadaan Barang dan Jasa BP Batam (MANPRO)/LPSE (Terbuka, pertriwulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Dokumen Terbit per Unit Kerja                   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Dokumen Terbit per Unit Kerja
                </h3>
                <p className="text-[11px] text-slate-500">
                  Produktivitas tata naskah dinas &amp; korespondensi resmi
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setDokumenViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      dokumenViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setDokumenViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      dokumenViewMode === 'table'
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
                    {formatNumberId(totalDokumenTerbit)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Dokumen
                  </span>
                </div>
              </div>
            </div>

            {/* Legenda di Bawah Judul & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-3 text-xs">
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
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
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
          </div>

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {dokumenViewMode === 'chart' ? (
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
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Unit Kerja Pengusul</th>
                      <th className="py-1.5 px-2 text-right">SK Kepala</th>
                      <th className="py-1.5 px-2 text-right">Surat Perintah</th>
                      <th className="py-1.5 px-2 text-right">Surat Tugas</th>
                      <th className="py-1.5 px-2 text-right">Surat Keluar</th>
                      <th className="py-1.5 px-2 text-right">Total Dokumen</th>
                      <th className="py-1.5 px-2 text-right">Kontribusi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dokumenChartData.map((row, idx) => {
                      const persen = totalDokumenTerbit > 0 ? (row.totalDokumen / totalDokumenTerbit) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.unitKerja}</td>
                          <td className="py-1.5 px-2 text-right text-indigo-700 font-bold">{formatNumberId(row.skKepala)}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700">{formatNumberId(row.suratPerintah)}</td>
                          <td className="py-1.5 px-2 text-right text-sky-700">{formatNumberId(row.suratTugas)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(row.suratKeluar)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{formatNumberId(row.totalDokumen)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{persen.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Akumulasi Dokumen</td>
                      <td className="py-1.5 px-2 text-right text-indigo-900 font-bold">{formatNumberId(totalSkKepala)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900">{formatNumberId(totalSuratPerintah)}</td>
                      <td className="py-1.5 px-2 text-right text-sky-900">{formatNumberId(totalSuratTugas)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{formatNumberId(totalSuratKeluar)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{formatNumberId(totalDokumenTerbit)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800 font-black">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
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
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Komposisi Arsip di Record Centre
                </h3>
                <p className="text-[11px] text-slate-500">
                  Manajemen retensi arsip inaktif, usul musnah, permanen &amp; musnah
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setArsipViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      arsipViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setArsipViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      arsipViewMode === 'table'
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
                    {formatNumberId(totalArsipRecordCentre)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Total Berkas
                  </span>
                </div>
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

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {arsipViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={recordsArsip}
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
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Satker / Unit Asal</th>
                      <th className="py-1.5 px-2 text-right">Inaktif</th>
                      <th className="py-1.5 px-2 text-right">Usul Musnah</th>
                      <th className="py-1.5 px-2 text-right">Permanen</th>
                      <th className="py-1.5 px-2 text-right">Musnah</th>
                      <th className="py-1.5 px-2 text-right">Total Berkas</th>
                      <th className="py-1.5 px-2 text-right">% Inaktif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {recordsArsip.map((row, idx) => {
                      const persenInaktif = row.totalArsip > 0 ? (row.arsipInaktif / row.totalArsip) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.unitKerja}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{formatNumberId(row.arsipInaktif)}</td>
                          <td className="py-1.5 px-2 text-right text-amber-700">{formatNumberId(row.usulMusnah)}</td>
                          <td className="py-1.5 px-2 text-right text-emerald-700">{formatNumberId(row.permanen)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-500">{formatNumberId(row.musnah)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{formatNumberId(row.totalArsip)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-blue-700">{persenInaktif.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Seluruh Arsip Dikelola</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-bold">{formatNumberId(totalArsipInaktif)}</td>
                      <td className="py-1.5 px-2 text-right text-amber-800">{formatNumberId(totalArsipUsulMusnah)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800">{formatNumberId(totalArsipPermanen)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(totalArsipMusnah)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{formatNumberId(totalArsipRecordCentre)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">
                        {totalArsipRecordCentre > 0 ? ((totalArsipInaktif / totalArsipRecordCentre) * 100).toFixed(1) : 0}%
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
              Rekapitulasi Arsip Unit Kerja di Record Centre (Terbuka, pertahun)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Kunjungan Website per Kategori                   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[450px]">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kunjungan Website per Kategori
                </h3>
                <p className="text-[11px] text-slate-500">
                  Trafik akses kanal informasi publik &amp; portal bisnis BP Batam
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Sheet Swap Toggle Button */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setKunjunganViewMode('chart')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      kunjunganViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3" />
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setKunjunganViewMode('table')}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      kunjunganViewMode === 'table'
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
                    {formatNumberId(totalKunjunganBulanTerakhir)}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                    Desember 2026
                  </span>
                </div>
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

          {/* Chart Section vs Tabel Detail */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-hidden">
            {kunjunganViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyKunjungan}
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
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan (2026)</th>
                      <th className="py-1.5 px-2 text-right">Investasi</th>
                      <th className="py-1.5 px-2 text-right">Berita</th>
                      <th className="py-1.5 px-2 text-right">Portal IBOSS</th>
                      <th className="py-1.5 px-2 text-right">PPID</th>
                      <th className="py-1.5 px-2 text-right">Katalog Lelang</th>
                      <th className="py-1.5 px-2 text-right">Total Kunjungan</th>
                      <th className="py-1.5 px-2 text-right">Porsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {monthlyKunjungan.map((row, idx) => {
                      const porsi = totalKunjunganTahunan > 0 ? (row.total / totalKunjunganTahunan) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.bulan} 2026</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-bold">{formatNumberId(row.layananInvestasi)}</td>
                          <td className="py-1.5 px-2 text-right text-sky-700">{formatNumberId(row.beritaPublikasi)}</td>
                          <td className="py-1.5 px-2 text-right text-emerald-700">{formatNumberId(row.portalIboss)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(row.ppidTransparansi)}</td>
                          <td className="py-1.5 px-2 text-right text-amber-700">{formatNumberId(row.katalogAsetLelang)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/60">{formatNumberId(row.total)}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-blue-700">{porsi.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                    {/* Sticky Footer */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Akumulasi TA 2026</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-bold">{formatNumberId(totalKunjunganInvestasi)}</td>
                      <td className="py-1.5 px-2 text-right text-sky-800">{formatNumberId(totalKunjunganBerita)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-800">{formatNumberId(totalKunjunganIboss)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{formatNumberId(totalKunjunganPpid)}</td>
                      <td className="py-1.5 px-2 text-right text-amber-800">{formatNumberId(totalKunjunganLelang)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black bg-blue-50/80">{formatNumberId(totalKunjunganTahunan)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black">100.0%</td>
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
              Jumlah Kunjungan Website (Tertutup, perbulan)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
