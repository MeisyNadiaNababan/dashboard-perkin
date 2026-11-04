import React, { useState, useMemo } from 'react';
import {
  Anchor,
  Ship,
  Users,
  Package,
  Layers,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Compass,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  FileCheck2,
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
  Cell,
} from 'recharts';
import {
  PENGELOLAAN_KEPELABUHANAN_DATA,
  JasaDermagaBulananItem,
  KunjunganKapalBarangBulananItem,
  KunjunganKapalPenumpangItem,
  PenumpangPelabuhanItem,
  BongkarMuatTerminalBatuAmparYearly,
  ArusBarangNegaraItem,
} from './pengelolaanKepelabuhananData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const BadanPengelolaanKepelabuhananDeepDive: React.FC = () => {
  const db = PENGELOLAAN_KEPELABUHANAN_DATA;

  // --------------------------------------------------------------------------
  // SHEET SWAP VIEW MODES (GRAFIK VS TABEL DETAIL)
  // --------------------------------------------------------------------------
  const [k1ViewMode, setK1ViewMode] = useState<'chart' | 'table'>('chart');
  const [k2ViewMode, setK2ViewMode] = useState<'chart' | 'table'>('chart');
  const [k3ViewMode, setK3ViewMode] = useState<'chart' | 'table'>('chart');
  const [k4ViewMode, setK4ViewMode] = useState<'chart' | 'table'>('chart');
  const [k5ViewMode, setK5ViewMode] = useState<'chart' | 'table'>('chart');
  const [k6ViewMode, setK6ViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // FILTER STATES TIAP KARTU
  // --------------------------------------------------------------------------
  // Kartu 1: Filter Pelabuhan & Tahun
  const [k1Pelabuhan, setK1Pelabuhan] = useState<string>('Semua Pelabuhan');
  const [k1Tahun, setK1Tahun] = useState<string>('2026');

  // Kartu 2: Filter Nama Pelabuhan & Tahun
  const [k2Pelabuhan, setK2Pelabuhan] = useState<string>('Semua Pelabuhan');
  const [k2Tahun, setK2Tahun] = useState<string>('2026');

  // Kartu 3: Filter Bulan & Tahun
  const [k3Bulan, setK3Bulan] = useState<string>('Semua');
  const [k3Tahun, setK3Tahun] = useState<string>('2026');

  // Kartu 4: Filter Jenis Penumpang & Tahun
  const [k4Jenis, setK4Jenis] = useState<string>('Semua');
  const [k4Tahun, setK4Tahun] = useState<string>('2026');

  // Kartu 6: Filter Bulan & Tahun
  const [k6Bulan, setK6Bulan] = useState<string>('Semua');
  const [k6Tahun, setK6Tahun] = useState<string>('2026');

  // --------------------------------------------------------------------------
  // KARTU 1: KEGIATAN JASA DERMAGA PER BULAN (STACKED COLUMN)
  // --------------------------------------------------------------------------
  const k1Data = useMemo(() => {
    return db.jasaDermagaBulanan.records.filter((item) => {
      const matchTahun = item.tahun === Number(k1Tahun);
      const matchPel = item.pelabuhan === k1Pelabuhan;
      return matchTahun && matchPel;
    });
  }, [db.jasaDermagaBulanan.records, k1Tahun, k1Pelabuhan]);

  const k1Summary = useMemo(() => {
    const totalVolume = k1Data.reduce((acc, curr) => acc + curr.totalVolumeTon, 0);
    const totalJutaTon = (totalVolume / 1000000).toFixed(2);
    return {
      totalVolume,
      totalJutaTon,
      keteranganBiru: `Volume Jasa Dermaga TA ${k1Tahun} (${k1Pelabuhan})`,
    };
  }, [k1Data, k1Tahun, k1Pelabuhan]);

  // --------------------------------------------------------------------------
  // KARTU 2: KUNJUNGAN KAPAL BARANG (CLUSTERED COLUMN PER BULAN)
  // --------------------------------------------------------------------------
  const k2Data = useMemo(() => {
    return db.kunjunganKapalBarang.records.filter((item) => {
      const matchTahun = item.tahun === Number(k2Tahun);
      const matchPel = item.namaPelabuhan === k2Pelabuhan;
      return matchTahun && matchPel;
    });
  }, [db.kunjunganKapalBarang.records, k2Tahun, k2Pelabuhan]);

  const k2Summary = useMemo(() => {
    const totalCall = k2Data.reduce((acc, curr) => acc + curr.totalCall, 0);
    const totalGt = k2Data.reduce((acc, curr) => acc + curr.totalGt, 0);
    const totalJutaGt = (totalGt / 1000000).toFixed(2);
    return {
      totalCall,
      totalJutaGt,
      keteranganBiru: `Total ${totalCall.toLocaleString('id-ID')} Call (${totalJutaGt} Juta GT) TA ${k2Tahun}`,
    };
  }, [k2Data, k2Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 3: KUNJUNGAN KAPAL PENUMPANG PER PELABUHAN (CLUSTERED BAR HORIZONTAL)
  // --------------------------------------------------------------------------
  const k3Data = useMemo(() => {
    const filtered = db.kunjunganKapalPenumpang.records.filter((item) => {
      const matchTahun = item.tahun === Number(k3Tahun);
      const matchBulan = item.bulan === k3Bulan;
      return matchTahun && matchBulan;
    });

    return [...filtered].sort((a, b) => b.totalCall - a.totalCall);
  }, [db.kunjunganKapalPenumpang.records, k3Tahun, k3Bulan]);

  const k3Summary = useMemo(() => {
    const totalCall = k3Data.reduce((acc, curr) => acc + curr.totalCall, 0);
    const totalDalam = k3Data.reduce((acc, curr) => acc + curr.callDalam, 0);
    const totalLuar = k3Data.reduce((acc, curr) => acc + curr.callLuar, 0);
    return {
      totalCall,
      totalDalam,
      totalLuar,
      keteranganBiru: `${totalDalam.toLocaleString('id-ID')} Call Dalam | ${totalLuar.toLocaleString('id-ID')} Call Luar`,
    };
  }, [k3Data]);

  // --------------------------------------------------------------------------
  // KARTU 4: JUMLAH PENUMPANG PELABUHAN DOMESTIK DAN INTERNASIONAL (CLUSTERED BAR HORIZONTAL)
  // --------------------------------------------------------------------------
  const k4Data = useMemo(() => {
    const list = db.penumpangDomestikInternasional.records.filter((item) => {
      const matchTahun = item.tahun === Number(k4Tahun);
      const matchJenis = k4Jenis === 'Semua' || item.jenisPenumpang === k4Jenis;
      return matchTahun && matchJenis;
    });

    return [...list].sort((a, b) => b.totalPenumpang - a.totalPenumpang);
  }, [db.penumpangDomestikInternasional.records, k4Tahun, k4Jenis]);

  const k4Summary = useMemo(() => {
    const totalPax = k4Data.reduce((acc, curr) => acc + curr.totalPenumpang, 0);
    const totalDatang = k4Data.reduce((acc, curr) => acc + curr.kedatangan, 0);
    const totalBerangkat = k4Data.reduce((acc, curr) => acc + curr.keberangkatan, 0);
    const jutaPax = (totalPax / 1000000).toFixed(2);
    return {
      totalPax,
      jutaPax,
      totalDatang,
      totalBerangkat,
      keteranganBiru: `Total ${jutaPax} Juta Pax TA ${k4Tahun} (${k4Jenis})`,
    };
  }, [k4Data, k4Tahun, k4Jenis]);

  // --------------------------------------------------------------------------
  // KARTU 5: BONGKAR MUAT PER TERMINAL BATU AMPAR (SMALL MULTIPLES 3 PANELS)
  // --------------------------------------------------------------------------
  const k5Data = useMemo(() => {
    return db.bongkarMuatBatuAmpar.records;
  }, [db.bongkarMuatBatuAmpar.records]);

  const k5Summary = useMemo(() => {
    const latest = k5Data[k5Data.length - 1];
    const totalBongkarMuatTon = latest
      ? latest.totalKargoTon + latest.totalCurahCairTon
      : 0;
    const totalJutaTon = (totalBongkarMuatTon / 1000000).toFixed(2);
    const totalTeus = latest ? latest.totalTeus : 0;
    return {
      totalJutaTon,
      totalTeus,
      tahun: latest?.tahun || 2026,
      keteranganBiru: `Batu Ampar TA ${latest?.tahun}: ${totalJutaTon} Juta Ton Kargo & ${totalTeus.toLocaleString('id-ID')} TEUs`,
    };
  }, [k5Data]);

  // --------------------------------------------------------------------------
  // KARTU 6: ARUS BARANG MENURUT NEGARA ASAL DAN TUJUAN (CLUSTERED BAR HORIZONTAL, TOP 10)
  // --------------------------------------------------------------------------
  const k6Data = useMemo(() => {
    const filtered = db.arusBarangNegara.records.filter((item) => {
      const matchTahun = item.tahun === Number(k6Tahun);
      const matchBulan = item.bulan === k6Bulan;
      return matchTahun && matchBulan;
    });

    return [...filtered].sort((a, b) => b.totalTon - a.totalTon).slice(0, 10);
  }, [db.arusBarangNegara.records, k6Tahun, k6Bulan]);

  const k6Summary = useMemo(() => {
    const totalBongkar = k6Data.reduce((acc, curr) => acc + curr.volumeBongkarTon, 0);
    const totalMuat = k6Data.reduce((acc, curr) => acc + curr.volumeMuatTon, 0);
    const totalTon = totalBongkar + totalMuat;
    const jutaTon = (totalTon / 1000000).toFixed(2);
    const topNegara = k6Data[0]?.negara || 'Singapura';
    return {
      totalTon,
      jutaTon,
      totalBongkar,
      totalMuat,
      topNegara,
      keteranganBiru: `${(totalBongkar / 1000000).toFixed(1)}M Bongkar | ${(totalMuat / 1000000).toFixed(1)}M Muat (Mitra Terbesar: ${topNegara})`,
    };
  }, [k6Data]);

  // --------------------------------------------------------------------------
  // RENDER LAYOUT 2 KOLOM x 3 BARIS (TOTAL 6 KARTU)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* ==================================================================== */}
      {/* BARIS 1: KARTU 1 & KARTU 2                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 1: Kegiatan Jasa Dermaga per Bulan                           */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Kegiatan Jasa Dermaga per Bulan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Volume tambat kapal barang, penumpang, dermaga khusus (tersus), dan dermaga rakyat
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k1Summary.totalJutaTon} Juta Ton
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k1Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Tambat Barang
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" /> Tambat Penumpang
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Tersus/DUKS
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" /> Dermaga Rakyat
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Pelabuhan:</span>
                  <select
                    value={k1Pelabuhan}
                    onChange={(e) => setK1Pelabuhan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua Pelabuhan">Semua Pelabuhan</option>
                    <option value="Batu Ampar">Batu Ampar</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k1Tahun}
                    onChange={(e) => setK1Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k1ViewMode} onChange={setK1ViewMode} />
              </div>
            </div>

            {/* Stacked Column Chart vs Detail Table */}
            {k1ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={k1Data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="bulan"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000).toFixed(0)}k T`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as JasaDermagaBulananItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>Bulan {item.bulan} {item.tahun} ({item.pelabuhan})</span>
                              <span className="font-mono text-blue-600 font-black">
                                {(item.totalVolumeTon / 1000).toFixed(0)}k Ton
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Tambat Barang:</span>
                                <span className="font-mono font-bold">
                                  {item.tambatBarangTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sky-700">
                                <span>• Tambat Penumpang:</span>
                                <span className="font-mono font-bold">
                                  {item.tambatPenumpangTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Dermaga Khusus (Tersus):</span>
                                <span className="font-mono font-bold">
                                  {item.dermagaKhususTersusTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-orange-600">
                                <span>• Dermaga Rakyat:</span>
                                <span className="font-mono font-bold">
                                  {item.dermagaRakyatTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                            </div>
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-400">
                              Periode Rekap: {item.rentangTanggalRekap}
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="tambatBarangTon" stackId="a" fill="#2563eb" name="Tambat Barang" />
                    <Bar dataKey="tambatPenumpangTon" stackId="a" fill="#38bdf8" name="Tambat Penumpang" />
                    <Bar dataKey="dermagaKhususTersusTon" stackId="a" fill="#94a3b8" name="Dermaga Khusus" />
                    <Bar dataKey="dermagaRakyatTon" stackId="a" fill="#f97316" radius={[3, 3, 0, 0]} name="Dermaga Rakyat" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Bulan / Periode</th>
                      <th className="py-2 px-2 text-right">Barang (Ton)</th>
                      <th className="py-2 px-2 text-right">Penumpang (Ton)</th>
                      <th className="py-2 px-2 text-right">Tersus (Ton)</th>
                      <th className="py-2 px-2 text-right">Rakyat (Ton)</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Total Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k1Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.bulan} {row.tahun}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.tambatBarangTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.tambatPenumpangTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.dermagaKhususTersusTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.dermagaRakyatTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {row.totalVolumeTon.toLocaleString('id-ID')} Ton
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.jasaDermagaBulanan.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.jasaDermagaBulanan.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 2: Kunjungan Kapal Barang                                    */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Kunjungan Kapal Barang
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Jumlah kunjungan kapal barang (Call Dalam Negeri &amp; Luar Negeri) serta tonase GT
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k2Summary.totalCall.toLocaleString('id-ID')} Call
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k2Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Call Dalam (Domestik)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" /> Call Luar (Internasional)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Pelabuhan:</span>
                  <select
                    value={k2Pelabuhan}
                    onChange={(e) => setK2Pelabuhan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua Pelabuhan">Semua Pelabuhan</option>
                    <option value="Batu Ampar">Batu Ampar</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k2Tahun}
                    onChange={(e) => setK2Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
              </div>
            </div>

            {/* Clustered Column Chart per Bulan vs Detail Table */}
            {k2ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={k2Data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="bulan"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as KunjunganKapalBarangBulananItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>Bulan {item.bulan} {item.tahun} ({item.namaPelabuhan})</span>
                              <span className="font-mono text-blue-600 font-black">
                                Total: {item.totalCall} Call
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Call Dalam:</span>
                                <span className="font-mono font-bold">{item.callDalam} Call ({(item.gtDalam / 1000).toFixed(0)}k GT)</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Call Luar:</span>
                                <span className="font-mono font-bold">{item.callLuar} Call ({(item.gtLuar / 1000).toFixed(0)}k GT)</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-800 font-semibold border-t border-slate-100 pt-0.5">
                                <span>Total Gross Tonnage:</span>
                                <span className="font-mono font-bold text-blue-700">{(item.totalGt / 1000000).toFixed(2)} Juta GT</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-500">
                                <span>Tonase Barang:</span>
                                <span className="font-mono">{(item.totalTon / 1000000).toFixed(2)} Juta Ton</span>
                              </div>
                            </div>
                            {item.tipeKapalTerbanyak && (
                              <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500">
                                <span className="font-semibold text-slate-700">Tipe Kapal Terbanyak:</span>
                                <div className="font-mono text-slate-800 mt-0.5">{item.tipeKapalTerbanyak}</div>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="callDalam"
                      fill="#2563eb"
                      radius={[3, 3, 0, 0]}
                      name="Call Dalam"
                    />
                    <Bar
                      dataKey="callLuar"
                      fill="#64748b"
                      radius={[3, 3, 0, 0]}
                      name="Call Luar"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Bulan / Periode</th>
                      <th className="py-2 px-2 text-right">Call Dalam (Dom)</th>
                      <th className="py-2 px-2 text-right">Call Luar (Int)</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Total Call</th>
                      <th className="py-2 px-2 text-right">Gross Tonnage (GT)</th>
                      <th className="py-2 px-2 text-right text-emerald-700 bg-emerald-50/70">Tonase (Juta Ton)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k2Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.bulan} {row.tahun}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.callDalam.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.callLuar.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">{row.totalCall.toLocaleString('id-ID')} Call</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.totalGt.toLocaleString('id-ID')} GT</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          {(row.totalTon / 1000000).toFixed(2)} M Ton
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.kunjunganKapalBarang.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.kunjunganKapalBarang.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARIS 2: KARTU 3 & KARTU 4                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 3: Kunjungan Kapal Penumpang per Pelabuhan                   */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Kunjungan Kapal Penumpang per Pelabuhan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi kunjungan kapal feri, RORO, dan kapal penumpang di terminal Batam
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k3Summary.totalCall.toLocaleString('id-ID')} Call
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k3Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Call Dalam
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" /> Call Luar
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k3Tahun}
                    onChange={(e) => setK3Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bulan:</span>
                  <select
                    value={k3Bulan}
                    onChange={(e) => setK3Bulan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua (1 Thn)</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
              </div>
            </div>

            {/* Clustered Bar Horizontal (Sorted Descending) vs Detail Table */}
            {k3ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k3Data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="pelabuhan"
                      tick={{ fontSize: 10, fill: '#334155' }}
                      width={110}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: string) =>
                        val.length > 15 ? `${val.slice(0, 15)}…` : val
                      }
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as KunjunganKapalPenumpangItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.pelabuhan}</span>
                              <span className="font-mono text-blue-600 font-black">
                                Total: {item.totalCall.toLocaleString('id-ID')} Call
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Call Dalam:</span>
                                <span className="font-mono font-bold">
                                  {item.callDalam.toLocaleString('id-ID')} ({(item.gtDalam / 1000).toFixed(0)}k GT)
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sky-700">
                                <span>• Call Luar:</span>
                                <span className="font-mono font-bold">
                                  {item.callLuar.toLocaleString('id-ID')} ({(item.gtLuar / 1000).toFixed(0)}k GT)
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-800 font-semibold border-t border-slate-100 pt-0.5">
                                <span>Total Gross Tonnage:</span>
                                <span className="font-mono font-bold text-blue-700">{(item.totalGt / 1000000).toFixed(2)} Juta GT</span>
                              </div>
                            </div>
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500">
                              <span className="font-semibold text-slate-700">Tipe Kapal:</span>
                              <div className="font-mono text-slate-800 mt-0.5">{item.tipeKapal}</div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="callDalam"
                      fill="#2563eb"
                      radius={[0, 3, 3, 0]}
                      name="Call Dalam"
                    />
                    <Bar
                      dataKey="callLuar"
                      fill="#38bdf8"
                      radius={[0, 3, 3, 0]}
                      name="Call Luar"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2 text-center w-8">No</th>
                      <th className="py-2 px-2.5">Terminal / Pelabuhan</th>
                      <th className="py-2 px-2 text-right">Call Dalam</th>
                      <th className="py-2 px-2 text-right">Call Luar</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Total Call</th>
                      <th className="py-2 px-2 text-right text-emerald-700 bg-emerald-50/70">Gross Tonnage (GT)</th>
                      <th className="py-2 px-2">Tipe Armada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k3Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.pelabuhan}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.callDalam.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.callLuar.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {row.totalCall.toLocaleString('id-ID')} Call
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          {(row.totalGt / 1000000).toFixed(2)} M GT
                        </td>
                        <td className="py-1.5 px-2 text-slate-600 text-[10px]">{row.tipeKapal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.kunjunganKapalPenumpang.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.kunjunganKapalPenumpang.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 4: Jumlah Penumpang Pelabuhan Domestik dan Internasional     */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Jumlah Penumpang Pelabuhan Domestik &amp; Internasional
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Arus kedatangan dan keberangkatan penumpang laut di masing-masing terminal Batam
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k4Summary.jutaPax} Juta Pax
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k4Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Kedatangan
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" /> Keberangkatan
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Jenis:</span>
                  <select
                    value={k4Jenis}
                    onChange={(e) => setK4Jenis(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Domestik">Domestik</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k4Tahun}
                    onChange={(e) => setK4Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k4ViewMode} onChange={setK4ViewMode} />
              </div>
            </div>

            {/* Clustered Bar Horizontal vs Detail Table */}
            {k4ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k4Data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                    />
                    <YAxis
                      type="category"
                      dataKey="namaTerminal"
                      tick={{ fontSize: 10, fill: '#334155' }}
                      width={110}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: string) =>
                        val.replace('Terminal Ferry ', '').replace('Terminal ', '').length > 15
                          ? `${val.replace('Terminal Ferry ', '').replace('Terminal ', '').slice(0, 15)}…`
                          : val.replace('Terminal Ferry ', '').replace('Terminal ', '')
                      }
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as PenumpangPelabuhanItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.namaTerminal}</span>
                              <span className="font-mono text-blue-600 font-black">
                                Total: {(item.totalPenumpang / 1000000).toFixed(2)}M Pax
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Kedatangan:</span>
                                <span className="font-mono font-bold">
                                  {item.kedatangan.toLocaleString('id-ID')} Pax
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Keberangkatan:</span>
                                <span className="font-mono font-bold">
                                  {item.keberangkatan.toLocaleString('id-ID')} Pax
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-700 border-t border-slate-100 pt-0.5 font-semibold">
                                <span>Porsi Domestik / Int:</span>
                                <span className="font-mono">{item.porsiDomestikPersen}% / {item.porsiInternasionalPersen}%</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-500">
                                <span>Kewarganegaraan (WNI / WNA):</span>
                                <span className="font-mono">{item.kewarganegaraan.wniPersen}% / {item.kewarganegaraan.wnaPersen}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="kedatangan"
                      fill="#2563eb"
                      radius={[0, 3, 3, 0]}
                      name="Kedatangan"
                    />
                    <Bar
                      dataKey="keberangkatan"
                      fill="#64748b"
                      radius={[0, 3, 3, 0]}
                      name="Keberangkatan"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2 text-center w-8">No</th>
                      <th className="py-2 px-2.5">Terminal Pelabuhan</th>
                      <th className="py-2 px-2 text-right">Kedatangan</th>
                      <th className="py-2 px-2 text-right">Keberangkatan</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Total Penumpang</th>
                      <th className="py-2 px-2 text-center">Dom / Int (%)</th>
                      <th className="py-2 px-2 text-center">WNI / WNA (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k4Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.namaTerminal}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.kedatangan.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.keberangkatan.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {row.totalPenumpang.toLocaleString('id-ID')} Pax
                        </td>
                        <td className="py-1.5 px-2 text-center font-mono text-[9.5px]">
                          {row.porsiDomestikPersen}% / {row.porsiInternasionalPersen}%
                        </td>
                        <td className="py-1.5 px-2 text-center font-mono text-[9.5px] text-slate-600">
                          {row.kewarganegaraan.wniPersen}% / {row.kewarganegaraan.wnaPersen}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="truncate">{db.penumpangDomestikInternasional.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
              {db.penumpangDomestikInternasional.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARIS 3: KARTU 5 & KARTU 6                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 5: Bongkar Muat per Terminal Batu Ampar (Small Multiples)    */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Bongkar Muat per Terminal Batu Ampar
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tren 5 tahun: Kargo Umum (Ton), Peti Kemas (TEUs), dan Curah Cair (Ton)
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                <SheetSwapToggle mode={k5ViewMode} onChange={setK5ViewMode} />
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {k5Summary.totalJutaTon}M Ton
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600">
                    {k5Summary.keteranganBiru}
                  </div>
                </div>
              </div>
            </div>

            {k5ViewMode === 'chart' ? (
              /* Small Multiples: 3 Mini Column Charts Berdampingan */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                {/* Panel 1: Kargo Batu Ampar (Ton) */}
                <div className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs truncate">1. Kargo Umum</span>
                      <span className="text-[9.5px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-100">
                        Ton
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-xs bg-[#2563eb]" /> Bongkar
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-xs bg-[#38bdf8]" /> B/M General
                      </span>
                    </div>
                  </div>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={k5Data} margin={{ top: 5, right: 2, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748b' }} tickLine={false} />
                        <YAxis
                          tick={{ fontSize: 8.5, fill: '#64748b' }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload || !payload.length) return null;
                            const item = payload[0].payload as BongkarMuatTerminalBatuAmparYearly;
                            return (
                              <div className="bg-white/95 p-2 rounded border border-slate-200 shadow text-[10px] space-y-0.5">
                                <div className="font-bold text-slate-900">Kargo Tahun {item.tahun}</div>
                                <div className="text-blue-700">Bongkar: {(item.bongkarCargoTon / 1000000).toFixed(2)}M Ton</div>
                                <div className="text-sky-700">General Cargo: {(item.bongkarMuatGeneralCargoTon / 1000000).toFixed(2)}M Ton</div>
                                <div className="font-bold text-slate-800 border-t border-slate-100 pt-0.5">
                                  Total: {(item.totalKargoTon / 1000000).toFixed(2)}M Ton
                                </div>
                              </div>
                            );
                          }}
                        />
                        <Bar dataKey="bongkarCargoTon" fill="#2563eb" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="bongkarMuatGeneralCargoTon" fill="#38bdf8" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Panel 2: Peti Kemas Batu Ampar (TEUs) */}
                <div className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs truncate">2. Peti Kemas</span>
                      <span className="text-[9.5px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100">
                        TEUs
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-xs bg-[#2563eb]" /> Bongkar
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-xs bg-[#64748b]" /> Muat
                      </span>
                    </div>
                  </div>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={k5Data} margin={{ top: 5, right: 2, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748b' }} tickLine={false} />
                        <YAxis
                          tick={{ fontSize: 8.5, fill: '#64748b' }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload || !payload.length) return null;
                            const item = payload[0].payload as BongkarMuatTerminalBatuAmparYearly;
                            return (
                              <div className="bg-white/95 p-2 rounded border border-slate-200 shadow text-[10px] space-y-0.5">
                                <div className="font-bold text-slate-900">Peti Kemas {item.tahun}</div>
                                <div className="text-blue-700">Bongkar: {item.bongkarTeus.toLocaleString('id-ID')} TEUs</div>
                                <div className="text-slate-600">Muat: {item.muatTeus.toLocaleString('id-ID')} TEUs</div>
                                <div className="font-bold text-emerald-700 border-t border-slate-100 pt-0.5">
                                  Throughput: {item.totalTeus.toLocaleString('id-ID')} TEUs
                                </div>
                              </div>
                            );
                          }}
                        />
                        <Bar dataKey="bongkarTeus" fill="#2563eb" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="muatTeus" fill="#64748b" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Panel 3: Curah Cair (Ton) */}
                <div className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs truncate">3. Curah Cair</span>
                      <span className="text-[9.5px] font-mono font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-100">
                        Ton
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-xs bg-[#2563eb]" /> Bongkar
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-xs bg-[#f59e0b]" /> Muat
                      </span>
                    </div>
                  </div>

                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={k5Data} margin={{ top: 5, right: 2, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#64748b' }} tickLine={false} />
                        <YAxis
                          tick={{ fontSize: 8.5, fill: '#64748b' }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v: number) => `${(v / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload || !payload.length) return null;
                            const item = payload[0].payload as BongkarMuatTerminalBatuAmparYearly;
                            return (
                              <div className="bg-white/95 p-2 rounded border border-slate-200 shadow text-[10px] space-y-0.5">
                                <div className="font-bold text-slate-900">Curah Cair {item.tahun}</div>
                                <div className="text-blue-700">Bongkar: {(item.bongkarCurahCairTon / 1000000).toFixed(2)}M Ton</div>
                                <div className="text-amber-700">Muat: {(item.muatCurahCairTon / 1000000).toFixed(2)}M Ton</div>
                                <div className="font-bold text-slate-800 border-t border-slate-100 pt-0.5">
                                  Total: {(item.totalCurahCairTon / 1000000).toFixed(2)}M Ton
                                </div>
                              </div>
                            );
                          }}
                        />
                        <Bar dataKey="bongkarCurahCairTon" fill="#2563eb" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="muatCurahCairTon" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-52 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg mt-1">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Tahun</th>
                      <th className="py-2 px-2 text-right">Bongkar Kargo (Ton)</th>
                      <th className="py-2 px-2 text-right">General Cargo (Ton)</th>
                      <th className="py-2 px-2 text-right bg-blue-50/70 text-blue-900">Total Kargo</th>
                      <th className="py-2 px-2 text-right">Bongkar Peti Kemas</th>
                      <th className="py-2 px-2 text-right">Muat Peti Kemas</th>
                      <th className="py-2 px-2 text-right bg-emerald-50/70 text-emerald-900">Throughput (TEUs)</th>
                      <th className="py-2 px-2 text-right">Curah Cair Bongkar</th>
                      <th className="py-2 px-2 text-right">Curah Cair Muat</th>
                      <th className="py-2 px-2.5 text-right bg-amber-50/70 text-amber-900">Total Curah Cair</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k5Data.map((row) => (
                      <tr key={row.tahun} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.tahun}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.bongkarCargoTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.bongkarMuatGeneralCargoTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {row.totalKargoTon.toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.bongkarTeus.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.muatTeus.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          {row.totalTeus.toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.bongkarCurahCairTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.muatCurahCairTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2.5 text-right font-mono font-bold text-amber-700 bg-amber-50/30">
                          {row.totalCurahCairTon.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.bongkarMuatBatuAmpar.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.bongkarMuatBatuAmpar.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 6: Arus Barang Menurut Negara Asal dan Tujuan                */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Arus Barang Menurut Negara Asal dan Tujuan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  10 negara mitra dagang maritim utama Batam berdasarkan tonase bongkar dan muat
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k6Summary.jutaTon} Juta Ton
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k6Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Volume Bongkar (Impor)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" /> Volume Muat (Ekspor)
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <SheetSwapToggle mode={k6ViewMode} onChange={setK6ViewMode} />
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k6Tahun}
                    onChange={(e) => setK6Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bulan:</span>
                  <select
                    value={k6Bulan}
                    onChange={(e) => setK6Bulan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                  </select>
                </div>
              </div>
            </div>

            {k6ViewMode === 'chart' ? (
              /* Clustered Bar Horizontal (Top 10 Negara) */
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k6Data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000000).toFixed(1)}M`}
                    />
                    <YAxis
                      type="category"
                      dataKey="negara"
                      tick={{ fontSize: 10, fill: '#334155' }}
                      width={100}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as ArusBarangNegaraItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.negara}</span>
                              <span className="font-mono text-blue-600 font-black">
                                Total: {(item.totalTon / 1000000).toFixed(2)}M Ton
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Volume Bongkar (Impor):</span>
                                <span className="font-mono font-bold">
                                  {item.volumeBongkarTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Volume Muat (Ekspor):</span>
                                <span className="font-mono font-bold">
                                  {item.volumeMuatTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-700 border-t border-slate-100 pt-0.5">
                                <span>Terminal Pengampu:</span>
                                <span className="font-semibold text-slate-800">{item.namaTerminal}</span>
                              </div>
                            </div>
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500 space-y-0.5">
                              <div><span className="font-semibold text-slate-700">Pelabuhan Utama:</span> {item.pelabuhanAsalTujuanTerbanyak}</div>
                              <div><span className="font-semibold text-slate-700">Bendera Kapal:</span> {item.benderaKapal}</div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="volumeBongkarTon"
                      fill="#2563eb"
                      radius={[0, 3, 3, 0]}
                      name="Volume Bongkar"
                    />
                    <Bar
                      dataKey="volumeMuatTon"
                      fill="#64748b"
                      radius={[0, 3, 3, 0]}
                      name="Volume Muat"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">#</th>
                      <th className="py-2 px-2">Negara Mitra</th>
                      <th className="py-2 px-2 text-right">Bongkar / Impor (Ton)</th>
                      <th className="py-2 px-2 text-right">Muat / Ekspor (Ton)</th>
                      <th className="py-2 px-2 text-right bg-blue-50/70 text-blue-900">Total Arus (Ton)</th>
                      <th className="py-2 px-2">Terminal Pengampu</th>
                      <th className="py-2 px-2">Pelabuhan Utama</th>
                      <th className="py-2 px-2.5">Bendera</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k6Data.map((row, idx) => (
                      <tr key={row.negara} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 text-slate-400 font-mono font-bold">{idx + 1}</td>
                        <td className="py-1.5 px-2 font-bold text-slate-800">{row.negara}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.volumeBongkarTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.volumeMuatTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {row.totalTon.toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-2 text-slate-700 font-medium">{row.namaTerminal}</td>
                        <td className="py-1.5 px-2 text-slate-600 truncate max-w-[120px]">{row.pelabuhanAsalTujuanTerbanyak}</td>
                        <td className="py-1.5 px-2.5 text-slate-600">{row.benderaKapal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="truncate">{db.arusBarangNegara.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
              {db.arusBarangNegara.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadanPengelolaanKepelabuhananDeepDive;
