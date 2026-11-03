import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  FileText,
  TrendingUp,
  ListFilter,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  Building2,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import {
  PENGENDALIAN_INVESTASI_DATA,
  RekomendasiBulananItem,
  LaporanPengawasanItem,
  TrenRekomendasiTahunanItem,
  RekomendasiItem,
} from './pengendalianInvestasiData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const DirektoratPengendalianInvestasiDeepDive: React.FC = () => {
  const db = PENGENDALIAN_INVESTASI_DATA;

  // --------------------------------------------------------------------------
  // SHEET SWAP STATES
  // --------------------------------------------------------------------------
  const [k1ViewMode, setK1ViewMode] = useState<'chart' | 'table'>('chart');
  const [k2ViewMode, setK2ViewMode] = useState<'chart' | 'table'>('chart');
  const [k3ViewMode, setK3ViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // FILTER STATES TIAP KARTU
  // --------------------------------------------------------------------------
  // Kartu 1: Filter Tahun
  const [k1Tahun, setK1Tahun] = useState<string>('2026');

  // Kartu 2: Filter Tahun
  const [k2Tahun, setK2Tahun] = useState<string>('2026');

  // State Tooltip Baris Tabel Kartu 4
  const [activeTableRow, setActiveTableRow] = useState<RekomendasiItem | null>(null);

  // --------------------------------------------------------------------------
  // KARTU 1: REKOMENDASI EVALUASI DAN PENGENDALIAN PER BULAN
  // --------------------------------------------------------------------------
  const k1FilteredRecords = useMemo(() => {
    return db.rekomendasiBulanan.records.filter(
      (item) => item.tahun === Number(k1Tahun)
    );
  }, [db.rekomendasiBulanan.records, k1Tahun]);

  const k1Summary = useMemo(() => {
    const totalRekomendasi = k1FilteredRecords.reduce(
      (acc, curr) => acc + curr.jumlahRekomendasi,
      0
    );
    return {
      total: totalRekomendasi,
      keteranganBiru: `Rekomendasi Terbit (TA ${k1Tahun})`,
    };
  }, [k1FilteredRecords, k1Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 2: LAPORAN PENGAWASAN PENGENDALIAN PENGUSAHAAN PER BULAN
  // --------------------------------------------------------------------------
  const k2FilteredRecords = useMemo(() => {
    return db.laporanPengawasanBulanan.records.filter(
      (item) => item.tahun === Number(k2Tahun)
    );
  }, [db.laporanPengawasanBulanan.records, k2Tahun]);

  const k2Summary = useMemo(() => {
    const totalLaporan = k2FilteredRecords.reduce(
      (acc, curr) => acc + curr.jumlahLaporan,
      0
    );
    return {
      total: totalLaporan,
      keteranganBiru: `Laporan Pengawasan Terbit (TA ${k2Tahun})`,
    };
  }, [k2FilteredRecords, k2Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 3: TREN REKOMENDASI PER TAHUN (5 TAHUN TERAKHIR)
  // --------------------------------------------------------------------------
  const k3Records = useMemo(() => {
    return db.trenRekomendasiTahunan.records;
  }, [db.trenRekomendasiTahunan.records]);

  const k3Summary = useMemo(() => {
    const currentYearRecord = k3Records.find((r) => r.tahun === 2026) || k3Records[k3Records.length - 1];
    const prevYearRecord = k3Records.find((r) => r.tahun === currentYearRecord.tahun - 1);
    const countDiff = currentYearRecord.jumlahRekomendasi - (prevYearRecord ? prevYearRecord.jumlahRekomendasi : currentYearRecord.jumlahTahunLalu);
    const pctDiff = prevYearRecord && prevYearRecord.jumlahRekomendasi > 0
      ? ((countDiff) / prevYearRecord.jumlahRekomendasi) * 100
      : currentYearRecord.perubahanPersen;
    const isPositive = countDiff >= 0;

    return {
      currentCount: currentYearRecord.jumlahRekomendasi,
      pctDiffStr: `${isPositive ? '+' : ''}${pctDiff.toFixed(1)}%`,
      countDiffStr: `${isPositive ? '+' : ''}${countDiff} Rekomendasi`,
      isPositive,
      keteranganBiru: `vs Tahun ${currentYearRecord.tahun - 1} (${isPositive ? '+' : ''}${countDiff} Rekomendasi)`,
    };
  }, [k3Records]);

  // --------------------------------------------------------------------------
  // KARTU 4: DAFTAR REKOMENDASI TERBARU (8 BARIS TERBARU)
  // --------------------------------------------------------------------------
  const k4Records = useMemo(() => {
    return db.daftarRekomendasiTerbaru.records.slice(0, 8);
  }, [db.daftarRekomendasiTerbaru.records]);

  const k4Summary = useMemo(() => {
    // Hitung rekomendasi 3 bulan terakhir (misal Feb, Mar, Apr 2026)
    const records3Bulan = db.daftarRekomendasiTerbaru.records.filter(
      (r) => r.tahun === 2026 && r.bulanIndex >= 2 && r.bulanIndex <= 4
    );
    const count3Bulan = records3Bulan.length;
    return {
      count: count3Bulan > 0 ? count3Bulan : 8,
      keteranganBiru: `Rekomendasi (3 Bulan Terakhir: Feb - Apr 2026)`,
    };
  }, [db.daftarRekomendasiTerbaru.records]);

  return (
    <div className="w-full font-sans text-slate-900">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM x 2 BARIS (TOTAL 4 KARTU BERUKURAN SAMA)                */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 1, KARTU 1: REKOMENDASI EVALUASI & PENGENDALIAN PER BULAN    */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Rekomendasi Evaluasi dan Pengendalian per Bulan
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Jumlah Rekomendasi Terbit</span>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    Evaluasi Kemitraan Badan Usaha
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k1Summary.total}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Rekomendasi
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k1Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Tahun & Sheet Swap */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filter Tahun:</span>
                </div>
                <div className="flex items-center gap-1">
                  {['2026', '2025'].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setK1Tahun(thn)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                        k1Tahun === thn
                          ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
              <SheetSwapToggle mode={k1ViewMode} onChange={setK1ViewMode} />
            </div>

            {/* Container Visual: Chart atau Tabel Detail */}
            <div className="h-64 w-full">
              {k1ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k1FilteredRecords}
                    margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="bulan"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as RekomendasiBulananItem;
                          return (
                            <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                              <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex justify-between items-center">
                                <span>Bulan {data.bulanNama} {data.tahun}</span>
                                <span className="text-white font-mono bg-blue-900/70 border border-blue-700 px-1.5 py-0.5 rounded text-[10px]">
                                  {data.jumlahRekomendasi} Rekomendasi Terbit
                                </span>
                              </div>

                              <div className="space-y-1.5 text-[10.5px]">
                                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
                                  Judul &amp; Rekomendasi pada Bulan Ini:
                                </span>
                                {data.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="p-1.5 rounded bg-slate-800/80 border border-slate-700/60 space-y-0.5"
                                  >
                                    <div className="font-bold text-white flex items-start gap-1">
                                      <span className="text-[#2563eb]">&bull;</span>
                                      <span>{item.judul}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-300 pl-2">
                                      <span className="text-slate-400">Rekomendasi: </span>
                                      <span className="text-emerald-300 font-medium">{item.rekomendasi}</span>
                                    </div>
                                    <div className="text-[9.5px] text-slate-400 pl-2">
                                      Mitra: <span className="text-sky-200">{item.mitra}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="jumlahRekomendasi"
                      name="Jumlah Rekomendasi"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Bulan &amp; Tahun</th>
                        <th className="py-2 px-2 text-center">Jml Rekomendasi</th>
                        <th className="py-2 px-2">Judul &amp; Rincian Rekomendasi</th>
                        <th className="py-2 px-2">Mitra Terkait</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k1FilteredRecords.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-slate-800 whitespace-nowrap align-top">
                            {item.bulanNama} {item.tahun}
                          </td>
                          <td className="py-2 px-2 text-center font-mono font-bold text-blue-700 align-top">
                            {item.jumlahRekomendasi}
                          </td>
                          <td className="py-2 px-2 align-top space-y-1">
                            {item.items && item.items.length > 0 ? (
                              item.items.map((it, itIdx) => (
                                <div key={itIdx} className="text-[10px]">
                                  <div className="font-semibold text-slate-800">{it.judul}</div>
                                  <div className="text-slate-500 text-[9.5px]">{it.rekomendasi}</div>
                                </div>
                              ))
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>
                          <td className="py-2 px-2 align-top text-slate-600">
                            {item.items && item.items.length > 0
                              ? item.items.map((it) => it.mitra).filter(Boolean).join(', ')
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Dataset: {db.rekomendasiBulanan.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {db.rekomendasiBulanan.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 1, KARTU 2: LAPORAN PENGAWASAN PENGENDALIAN PENGUSAHAAN      */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Laporan Pengawasan Pengendalian Pengusahaan per Bulan
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-3.5 h-0.5 bg-[#2563eb] rounded-full inline-block" />
                    <span className="w-2 h-2 rounded-full bg-[#2563eb] -ml-2 inline-block" />
                    <span>Laporan Terbit per Bulan (Dokumen Digital)</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k2Summary.total}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Laporan
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k2Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Tahun & Sheet Swap */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filter Tahun Terbit:</span>
                </div>
                <div className="flex items-center gap-1">
                  {['2026', '2025'].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setK2Tahun(thn)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                        k2Tahun === thn
                          ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
              <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
            </div>

            {/* Container Visual: Chart atau Tabel Detail */}
            <div className="h-64 w-full">
              {k2ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={k2FilteredRecords}
                    margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="bulan"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 3]}
                      tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as LaporanPengawasanItem;
                          return (
                            <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                              <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex justify-between items-center">
                                <span>Bulan {data.bulanNama} {data.tahun}</span>
                                <span className="text-white font-mono bg-blue-900/70 border border-blue-700 px-1.5 py-0.5 rounded text-[10px]">
                                  {data.jumlahLaporan} Laporan Terbit
                                </span>
                              </div>

                              {/* Tooltip: Judul Laporan */}
                              <div className="space-y-1.5 text-[10.5px]">
                                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
                                  Judul Laporan Pengawasan:
                                </span>
                                {data.laporanList.map((lap, idx) => (
                                  <div
                                    key={idx}
                                    className="p-2 rounded bg-slate-800/80 border border-slate-700/60 space-y-1"
                                  >
                                    <div className="font-bold text-white leading-snug">
                                      {lap.judulLaporan}
                                    </div>
                                    <div className="text-[10px] text-slate-300">
                                      <span className="text-slate-400">Objek Pengawasan: </span>
                                      <span className="text-emerald-300">{lap.objekPengawasan}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9.5px] text-slate-400 font-mono pt-0.5 border-t border-slate-700/50">
                                      <span>No: {lap.nomorDokumen}</span>
                                      <span>Tgl: {lap.tanggalTerbit}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="jumlahLaporan"
                      name="Jumlah Laporan"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ r: 4.5, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2 }}
                      activeDot={{ r: 6.5, fill: '#1d4ed8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Bulan &amp; Tahun</th>
                        <th className="py-2 px-2 text-center">Jml Laporan</th>
                        <th className="py-2 px-2">Judul Laporan &amp; Objek</th>
                        <th className="py-2 px-2">No. Dokumen &amp; Tgl</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k2FilteredRecords.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-slate-800 whitespace-nowrap align-top">
                            {item.bulanNama} {item.tahun}
                          </td>
                          <td className="py-2 px-2 text-center font-mono font-bold text-blue-700 align-top">
                            {item.jumlahLaporan}
                          </td>
                          <td className="py-2 px-2 align-top space-y-1">
                            {item.laporanList && item.laporanList.length > 0 ? (
                              item.laporanList.map((lap, lapIdx) => (
                                <div key={lapIdx} className="text-[10px]">
                                  <div className="font-semibold text-slate-800">{lap.judulLaporan}</div>
                                  <div className="text-slate-500 text-[9.5px]">Objek: {lap.objekPengawasan}</div>
                                </div>
                              ))
                            ) : (
                              <span className="text-slate-400 italic">Nihil / Belum Ada Terbit</span>
                            )}
                          </td>
                          <td className="py-2 px-2 align-top text-slate-600 font-mono text-[9.5px]">
                            {item.laporanList && item.laporanList.length > 0
                              ? item.laporanList.map((lap) => `${lap.nomorDokumen} (${lap.tanggalTerbit})`).join('; ')
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Dataset: {db.laporanPengawasanBulanan.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {db.laporanPengawasanBulanan.metadata.sifatData} &bull; Dokumen Digital
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 2, KARTU 3: TREN REKOMENDASI PER TAHUN (5 TAHUN TERAKHIR)    */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Tren Rekomendasi per Tahun
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Jumlah Rekomendasi Tahunan</span>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    Rentang 5 Tahun Terakhir (2022 - 2026)
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Perubahan dibanding Tahun Lalu (Hijau/Oranye) */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k3Summary.currentCount}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Rekomendasi
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 text-[11px] font-semibold mt-0.5">
                  {k3Summary.isPositive ? (
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5 inline" />
                      {k3Summary.pctDiffStr}
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-0.5">
                      <ArrowDownRight className="w-3.5 h-3.5 inline" />
                      {k3Summary.pctDiffStr}
                    </span>
                  )}
                  <span className="text-[#2563eb] font-semibold">
                    {k3Summary.keteranganBiru}
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Header Toolbar: Label 5 Tahun & Sheet Swap */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Periode Evaluasi Multi-Tahun:</span>
                </div>
                <div className="text-[11px] font-mono text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  2022 &rarr; 2026 (Konsisten Naik)
                </div>
              </div>
              <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
            </div>

            {/* Container Visual: Chart atau Tabel Detail */}
            <div className="h-64 w-full">
              {k3ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k3Records}
                    margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="tahun"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as TrenRekomendasiTahunanItem;
                          return (
                            <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                              <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex justify-between items-center">
                                <span>Tahun Anggaran {data.tahun}</span>
                                <span className="text-white font-mono bg-blue-900/70 border border-blue-700 px-1.5 py-0.5 rounded text-[10px]">
                                  {data.jumlahRekomendasi} Rekomendasi
                                </span>
                              </div>

                              <div className="space-y-1 text-slate-300 font-mono text-[10.5px]">
                                <div className="flex justify-between items-center">
                                  <span>Perubahan vs Thn Lalu:</span>
                                  <span
                                    className={`font-bold flex items-center gap-0.5 ${
                                      data.isPositive ? 'text-emerald-400' : 'text-amber-400'
                                    }`}
                                  >
                                    {data.isPositive ? '+' : ''}
                                    {data.perubahanCount} Rekomendasi ({data.isPositive ? '+' : ''}
                                    {data.perubahanPersen.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="flex justify-between text-slate-400 text-[10px]">
                                  <span>Tahun Sebelumnya:</span>
                                  <span>{data.jumlahTahunLalu} Rekomendasi</span>
                                </div>
                              </div>

                              <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-300">
                                <span className="text-slate-400 font-semibold block mb-0.5">Fokus Evaluasi &amp; Pengendalian:</span>
                                <span className="text-slate-200">{data.fokusEvaluasi}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="jumlahRekomendasi"
                      name="Jumlah Rekomendasi"
                      radius={[4, 4, 0, 0]}
                      barSize={32}
                    >
                      {k3Records.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.tahun === 2026 ? '#2563eb' : '#94a3b8'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Tahun</th>
                        <th className="py-2 px-2 text-center">Jml Rekomendasi</th>
                        <th className="py-2 px-2 text-center">Thn Sebelumnya</th>
                        <th className="py-2 px-2 text-right">Perubahan</th>
                        <th className="py-2 px-2">Fokus Evaluasi &amp; Pengendalian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k3Records.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-slate-800 whitespace-nowrap">
                            TA {item.tahun}
                          </td>
                          <td className="py-2 px-2 text-center font-mono font-bold text-blue-700">
                            {item.jumlahRekomendasi}
                          </td>
                          <td className="py-2 px-2 text-center font-mono text-slate-500">
                            {item.jumlahTahunLalu}
                          </td>
                          <td className="py-2 px-2 text-right font-mono font-bold whitespace-nowrap">
                            <span className={item.isPositive ? 'text-emerald-700' : 'text-amber-700'}>
                              {item.isPositive ? '+' : ''}{item.perubahanCount} ({item.perubahanPersen.toFixed(1)}%)
                            </span>
                          </td>
                          <td className="py-2 px-2 text-slate-600">
                            {item.fokusEvaluasi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Dataset: {db.trenRekomendasiTahunan.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {db.trenRekomendasiTahunan.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 2, KARTU 4: DAFTAR REKOMENDASI TERBARU (TABEL RINGKAS)        */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                    <ListFilter className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Daftar Rekomendasi Terbaru
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>8 Rekomendasi Terkini</span>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 text-[10.5px]">
                    Arahkan kursor untuk teks lengkap
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k4Summary.count}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Rekomendasi
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k4Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Sub-Header Toolbar Tabel */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Format Tabel Ringkas (8 Baris Terbaru):</span>
              </div>
              <span className="text-[10px] font-mono font-medium text-slate-500">
                Kolom: Tanggal &bull; Judul &bull; Rekomendasi
              </span>
            </div>

            {/* Tabel Ringkas dengan Tooltip */}
            <div className="relative h-64 overflow-x-auto overflow-y-auto no-scrollbar border border-slate-200/80 rounded-lg">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 border-b border-slate-200 z-10">
                  <tr>
                    <th className="py-2 px-2.5 font-mono text-[10px] uppercase tracking-wider w-24">
                      Tanggal
                    </th>
                    <th className="py-2 px-2.5 text-[10px] uppercase tracking-wider min-w-[140px]">
                      Judul
                    </th>
                    <th className="py-2 px-2.5 text-[10px] uppercase tracking-wider">
                      Rekomendasi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {k4Records.map((row) => (
                    <tr
                      key={row.id}
                      onMouseEnter={() => setActiveTableRow(row)}
                      onMouseLeave={() => setActiveTableRow(null)}
                      className="hover:bg-blue-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-2 px-2.5 font-mono text-[10px] text-slate-600 whitespace-nowrap align-top">
                        {row.tanggalDisplay}
                      </td>
                      <td className="py-2 px-2.5 font-semibold text-slate-900 group-hover:text-blue-700 transition-colors align-top max-w-[160px]">
                        <div className="truncate" title={row.judul}>
                          {row.judul}
                        </div>
                        <div className="text-[9.5px] font-normal text-slate-400 truncate">
                          {row.mitra}
                        </div>
                      </td>
                      <td className="py-2 px-2.5 text-slate-600 align-top max-w-[200px]">
                        <div className="truncate" title={row.rekomendasi}>
                          {row.rekomendasi}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Popover Tooltip jika cursor berada di salah satu baris */}
              {activeTableRow && (
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 backdrop-blur-xs text-white p-2.5 rounded-lg border border-slate-700 shadow-2xl text-[10.5px] z-30 pointer-events-none transition-all">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-1 mb-1">
                    <span className="font-bold text-sky-300 truncate pr-2">
                      {activeTableRow.judul}
                    </span>
                    <span className="font-mono text-[9.5px] text-slate-300 shrink-0">
                      {activeTableRow.tanggalDisplay}
                    </span>
                  </div>
                  <div className="text-slate-200 leading-snug">
                    <span className="text-slate-400 font-semibold">Rekomendasi Lengkap: </span>
                    <span className="text-emerald-300 font-medium">{activeTableRow.rekomendasi}</span>
                  </div>
                  <div className="flex justify-between items-center text-[9.5px] text-slate-400 pt-1 mt-1 border-t border-slate-800">
                    <span>Mitra: <span className="text-white font-medium">{activeTableRow.mitra}</span></span>
                    <span>Status: <span className="text-sky-300 font-medium">{activeTableRow.status}</span></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Dataset: {db.daftarRekomendasiTerbaru.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {db.daftarRekomendasiTerbaru.metadata.sifatData}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
