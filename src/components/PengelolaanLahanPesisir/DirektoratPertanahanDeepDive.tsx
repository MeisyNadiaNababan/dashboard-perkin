import React, { useState, useMemo } from 'react';
import {
  FileText,
  TrendingUp,
  Building2,
  Users,
  MapPin,
  PieChart as PieChartIcon,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  PERTANAHAN_VISUALISASI_DATA,
  LayananPertanahanItem,
  TrenPermohonanBulanItem,
  PersetujuanPemohonItem,
  PeralihanHakPemohonItem,
  SwpLahanTersediaItem,
  PnbpJenisPenerimaanItem,
} from './direktoratPertanahanData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const DirektoratPertanahanDeepDive: React.FC = () => {
  const data = PERTANAHAN_VISUALISASI_DATA;

  // --------------------------------------------------------------------------
  // SHEET SWAP STATES (GRAFIK | TABEL DETAIL) UNTUK 6 KARTU
  // --------------------------------------------------------------------------
  const [k1ViewMode, setK1ViewMode] = useState<'chart' | 'table'>('chart');
  const [k2ViewMode, setK2ViewMode] = useState<'chart' | 'table'>('chart');
  const [k3ViewMode, setK3ViewMode] = useState<'chart' | 'table'>('chart');
  const [k4ViewMode, setK4ViewMode] = useState<'chart' | 'table'>('chart');
  const [k5ViewMode, setK5ViewMode] = useState<'chart' | 'table'>('chart');
  const [k6ViewMode, setK6ViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // STATE FILTER SETIAP KARTU
  // --------------------------------------------------------------------------
  // Kartu 1: Periode Rekap & Jenis Pemohon
  const [k1Periode, setK1Periode] = useState('Semua Periode');
  const [k1Pemohon, setK1Pemohon] = useState('Semua Pemohon');

  // Kartu 2: Jenis Layanan & Jenis Pemohon
  const [k2Layanan, setK2Layanan] = useState('Semua Layanan');
  const [k2Pemohon, setK2Pemohon] = useState('Semua Pemohon');

  // Kartu 3: Jenis Layanan & Periode Rekap
  const [k3Layanan, setK3Layanan] = useState('Semua Layanan');
  const [k3Periode, setK3Periode] = useState('Semua Periode');

  // Kartu 4: Periode Rekap
  const [k4Periode, setK4Periode] = useState('Semua Periode');

  // Kartu 5: Tahun
  const [k5Tahun, setK5Tahun] = useState('2026');

  // --------------------------------------------------------------------------
  // COMPUTED DATA & SUMMARY NUMBERS
  // --------------------------------------------------------------------------

  // KARTU 1: Permohonan Layanan Pertanahan per Jenis Layanan
  const k1Data = useMemo(() => {
    let multiplier = 1.0;
    if (k1Periode === '2026 (YTD)') multiplier *= 0.65;
    else if (k1Periode === '2025') multiplier *= 0.95;
    else if (k1Periode === 'TW I 2026') multiplier *= 0.32;
    else if (k1Periode === 'TW II 2026') multiplier *= 0.33;

    if (k1Pemohon === 'Perorangan') multiplier *= 0.52;
    else if (k1Pemohon === 'Badan Usaha') multiplier *= 0.40;
    else if (k1Pemohon === 'Instansi Pemerintah') multiplier *= 0.08;

    return data.permohonanPerJenisLayanan.records
      .map((item) => {
        const disetujui = Math.round(item.disetujui * multiplier);
        const ditolak = Math.round(item.ditolak * multiplier);
        const total = disetujui + ditolak;
        const persen = total > 0 ? Number(((disetujui / total) * 100).toFixed(1)) : 0;
        return {
          ...item,
          disetujui,
          ditolak,
          total,
          persenDisetujui: persen,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [data.permohonanPerJenisLayanan.records, k1Periode, k1Pemohon]);

  const k1Summary = useMemo(() => {
    const totalSetuju = k1Data.reduce((acc, curr) => acc + curr.disetujui, 0);
    const totalSemua = k1Data.reduce((acc, curr) => acc + curr.total, 0);
    const persen = totalSemua > 0 ? ((totalSetuju / totalSemua) * 100).toFixed(1) : '0.0';
    return {
      persenDisetujui: persen,
      totalPermohonan: totalSemua.toLocaleString('id-ID'),
    };
  }, [k1Data]);

  // KARTU 2: Tren Permohonan per Periode Rekap (Bulanan)
  const k2Data = useMemo(() => {
    let multiplier = 1.0;
    if (k2Layanan === 'SKPT') multiplier *= 0.25;
    else if (k2Layanan === 'Perpanjangan Hak atas Tanah') multiplier *= 0.22;
    else if (k2Layanan === 'Pecah PL') multiplier *= 0.16;
    else if (k2Layanan === 'Revisi PL') multiplier *= 0.14;
    else if (k2Layanan !== 'Semua Layanan') multiplier *= 0.08;

    if (k2Pemohon === 'Perorangan') multiplier *= 0.52;
    else if (k2Pemohon === 'Badan Usaha') multiplier *= 0.40;
    else if (k2Pemohon === 'Instansi Pemerintah') multiplier *= 0.08;

    return data.trenPermohonanPerBulan.records.map((item) => {
      const disetujui = Math.round(item.disetujui * multiplier);
      const ditolak = Math.round(item.ditolak * multiplier);
      const total = disetujui + ditolak;
      const persen = total > 0 ? Number(((disetujui / total) * 100).toFixed(1)) : 0;
      return {
        ...item,
        disetujui,
        ditolak,
        total,
        persenDisetujui: persen,
      };
    });
  }, [data.trenPermohonanPerBulan.records, k2Layanan, k2Pemohon]);

  const k2Summary = useMemo(() => {
    const total = k2Data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSetuju = k2Data.reduce((acc, curr) => acc + curr.disetujui, 0);
    const persen = total > 0 ? ((totalSetuju / total) * 100).toFixed(1) : '0.0';
    return {
      totalPermohonan: total.toLocaleString('id-ID'),
      persenSetuju: persen,
    };
  }, [k2Data]);

  // KARTU 3: Tingkat Persetujuan per Jenis Pemohon
  const k3Data = useMemo(() => {
    let factor = 1.0;
    if (k3Periode === '2026 (YTD)') factor *= 0.65;
    else if (k3Periode === '2025') factor *= 0.95;

    return data.tingkatPersetujuanPemohon.records.map((item) => {
      let adjust = 0;
      if (k3Layanan === 'SKPT') adjust = 1.2;
      else if (k3Layanan === 'Pecah PL') adjust = -2.1;
      else if (k3Layanan === 'Revisi PL') adjust = -1.5;

      const disetujui = Math.round(item.disetujui * factor);
      const ditolak = Math.round(item.ditolak * factor);
      const total = disetujui + ditolak;
      let rawPersen = total > 0 ? (disetujui / total) * 100 + adjust : 0;
      rawPersen = Math.min(100, Math.max(0, rawPersen));
      return {
        ...item,
        disetujui,
        ditolak,
        total,
        persenDisetujui: Number(rawPersen.toFixed(1)),
      };
    });
  }, [data.tingkatPersetujuanPemohon.records, k3Layanan, k3Periode]);

  const k3Summary = useMemo(() => {
    const totalDisetujui = k3Data.reduce((acc, curr) => acc + curr.disetujui, 0);
    const totalSemua = k3Data.reduce((acc, curr) => acc + curr.total, 0);
    const rataRata = totalSemua > 0 ? ((totalDisetujui / totalSemua) * 100).toFixed(1) : '0.0';
    return {
      rataRataPersetujuan: rataRata,
      totalPemohon: totalSemua.toLocaleString('id-ID'),
    };
  }, [k3Data]);

  // KARTU 4: Perizinan Peralihan Hak atas Tanah per Jenis Pemohon
  const k4Data = useMemo(() => {
    let multiplier = 1.0;
    if (k4Periode === '2026 (YTD)') multiplier = 0.65;
    else if (k4Periode === '2025') multiplier = 0.95;
    else if (k4Periode === '2024') multiplier = 0.90;

    return data.peralihanHakPerPemohon.records
      .map((item) => ({
        ...item,
        jumlahBerkas: Math.round(item.jumlahBerkas * multiplier),
      }))
      .sort((a, b) => b.persentase - a.persentase);
  }, [data.peralihanHakPerPemohon.records, k4Periode]);

  const k4Summary = useMemo(() => {
    const totalBerkas = k4Data.reduce((acc, curr) => acc + curr.jumlahBerkas, 0);
    const avgPersen = (100 / (k4Data.length || 1)).toFixed(1);
    const topCategory = k4Data[0] || { jenisPemohon: '-', persentase: 0 };
    return {
      topPersen: `${topCategory.persentase.toFixed(1)}%`,
      topNama: topCategory.jenisPemohon,
      totalBerkas: totalBerkas.toLocaleString('id-ID'),
      avgPersen: `${avgPersen}%`,
    };
  }, [k4Data]);

  // KARTU 5: Lahan Tersedia per Sub Wilayah Pengembangan (SWP)
  const k5Data = useMemo(() => {
    const records = data.lahanTersediaSwp.recordsByYear[k5Tahun] || [];
    return [...records].sort((a, b) => b.luasHa - a.luasHa);
  }, [data.lahanTersediaSwp.recordsByYear, k5Tahun]);

  const k5Summary = useMemo(() => {
    const totalLuas = k5Data.reduce((acc, curr) => acc + curr.luasHa, 0);
    const totalPersil = k5Data.reduce((acc, curr) => acc + curr.jumlahPersil, 0);
    const rataRata = totalPersil > 0 ? (totalLuas / totalPersil).toFixed(2) : '0';
    return {
      totalLuas: `${totalLuas.toFixed(1)} Ha`,
      totalPersil: `${totalPersil} Persil`,
      rataRata: `${rataRata} Ha/Persil`,
    };
  }, [k5Data]);

  // KARTU 6: Target Penerimaan PNBP per Jenis Penerimaan
  const k6Data = data.targetPnbpPerJenisPenerimaan.records;
  const k6Total = data.targetPnbpPerJenisPenerimaan.totalAnggaranMiliar;

  return (
    <div className="w-full space-y-4 font-sans">
      {/* =====================================================================
       * GRID 2 KOLOM x 3 BARIS = 6 KARTU VISUALISASI BERUKURAN SAMA
       * Sesuai instruksi: Tidak ada baris KPI terpisah dan tidak ada pembuka
       * ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5">

        {/* ---------------------------------------------------------------------
         * BARIS 1 / KARTU 1: Permohonan Layanan Pertanahan per Jenis Layanan
         * --------------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul di kiri, Ringkasan di kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Permohonan Layanan Pertanahan per Jenis Layanan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  11 Jenis Layanan Pertanahan BP Batam, diurutkan dari volume terbesar
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k1Summary.persenDisetujui}%
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Disetujui
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Total {k1Summary.totalPermohonan} Berkas
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
                  <span>Disetujui</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-orange-500 inline-block" />
                  <span>Ditolak / Revisi</span>
                </span>
              </div>

              {/* Filter: Periode Rekap & Jenis Pemohon */}
              <div className="flex items-center gap-1.5">
                <select
                  value={k1Periode}
                  onChange={(e) => setK1Periode(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Periode Rekap Kartu 1"
                >
                  {data.permohonanPerJenisLayanan.filterOptions.periodeRekap.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={k1Pemohon}
                  onChange={(e) => setK1Pemohon(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Jenis Pemohon Kartu 1"
                >
                  {data.permohonanPerJenisLayanan.filterOptions.jenisPemohon.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <SheetSwapToggle mode={k1ViewMode} onChange={setK1ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik / Tabel Detail (Sheet Swap) */}
            <div className="h-68 w-full mt-2">
              {k1ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k1Data}
                    margin={{ top: 4, right: 20, left: 2, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="singkatan"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={118}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as LayananPertanahanItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 min-w-44">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.jenisLayanan}
                              </span>
                              <span className="block text-[11px] text-emerald-400 font-mono">
                                Disetujui: {item.disetujui.toLocaleString('id-ID')} ({item.persenDisetujui}%)
                              </span>
                              <span className="block text-[11px] text-orange-400 font-mono">
                                Ditolak: {item.ditolak.toLocaleString('id-ID')}
                              </span>
                              <span className="block text-[11px] text-slate-300 font-mono border-t border-slate-700/80 mt-1 pt-0.5">
                                Total: {item.total.toLocaleString('id-ID')} berkas
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="disetujui" stackId="layanan" fill="#2563EB" radius={[0, 0, 0, 0]} barSize={12} />
                    <Bar dataKey="ditolak" stackId="layanan" fill="#F97316" radius={[0, 3, 3, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Jenis Layanan Pertanahan</th>
                        <th className="py-1.5 px-1.5">Kode</th>
                        <th className="py-1.5 px-1.5 text-right">Disetujui</th>
                        <th className="py-1.5 px-1.5 text-right">Ditolak / Revisi</th>
                        <th className="py-1.5 px-1.5 text-right">Total Berkas</th>
                        <th className="py-1.5 px-1.5 text-right">% Disetujui</th>
                        <th className="py-1.5 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {k1Data.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{item.jenisLayanan}</td>
                          <td className="py-1.5 px-1.5 font-bold text-slate-600">{item.singkatan}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{item.disetujui.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-orange-600">{item.ditolak.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{item.total.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right">
                            <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${item.persenDisetujui >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                              {item.persenDisetujui.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${item.persenDisetujui >= 85 ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                              {item.persenDisetujui >= 85 ? 'Lancar' : 'Perhatian'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 1 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium truncate max-w-[85%]">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Terbuka
              </span>
              <span className="truncate" title={data.katalogDataset.datasetPermohonanLayanan.nama}>
                {data.katalogDataset.datasetPermohonanLayanan.nama} (Terbuka, jika update)
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">11 Layanan</span>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
         * BARIS 1 / KARTU 2: Tren Permohonan per Periode Rekap
         * --------------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul di kiri, Ringkasan di kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Tren Permohonan per Periode Rekap
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi bulanan permohonan disetujui vs ditolak (Januari - Desember)
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k2Summary.totalPermohonan}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Total Berkas
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-bold block">
                  {k2Summary.persenSetuju}% Disetujui
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
                  <span>Disetujui</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-orange-500 inline-block" />
                  <span>Ditolak</span>
                </span>
              </div>

              {/* Filter: Jenis Layanan & Jenis Pemohon */}
              <div className="flex items-center gap-1.5">
                <select
                  value={k2Layanan}
                  onChange={(e) => setK2Layanan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Jenis Layanan Kartu 2"
                >
                  {data.trenPermohonanPerBulan.filterOptions.jenisLayanan.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={k2Pemohon}
                  onChange={(e) => setK2Pemohon(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Jenis Pemohon Kartu 2"
                >
                  {data.trenPermohonanPerBulan.filterOptions.jenisPemohon.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik / Tabel Detail (Sheet Swap) */}
            <div className="h-68 w-full mt-2">
              {k2ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k2Data}
                    margin={{ top: 8, right: 10, left: -16, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="bulan"
                      tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => val.slice(0, 3)}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as TrenPermohonanBulanItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 min-w-40">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.bulan}
                              </span>
                              <span className="block text-[11px] text-blue-400 font-mono">
                                Disetujui: {item.disetujui.toLocaleString('id-ID')} ({item.persenDisetujui}%)
                              </span>
                              <span className="block text-[11px] text-orange-400 font-mono">
                                Ditolak: {item.ditolak.toLocaleString('id-ID')}
                              </span>
                              <span className="block text-[11px] text-slate-300 font-mono border-t border-slate-700/80 mt-1 pt-0.5">
                                Total: {item.total.toLocaleString('id-ID')} berkas
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="disetujui" stackId="tren" fill="#2563EB" radius={[0, 0, 0, 0]} barSize={16} />
                    <Bar dataKey="ditolak" stackId="tren" fill="#F97316" radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Bulan Rekap</th>
                        <th className="py-1.5 px-1.5 text-right">Disetujui</th>
                        <th className="py-1.5 px-1.5 text-right">Ditolak</th>
                        <th className="py-1.5 px-1.5 text-right">Total Berkas</th>
                        <th className="py-1.5 px-1.5 text-right">% Disetujui</th>
                        <th className="py-1.5 px-2 text-center">Status Tren</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {k2Data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{item.bulan}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{item.disetujui.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-orange-600">{item.ditolak.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{item.total.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right">
                            <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${item.persenDisetujui >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                              {item.persenDisetujui.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${item.persenDisetujui >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                              {item.persenDisetujui >= 85 ? 'Optimal' : 'Perlu Evaluasi'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 2 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium truncate max-w-[85%]">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Terbuka
              </span>
              <span className="truncate" title={data.katalogDataset.datasetPermohonanLayanan.nama}>
                {data.katalogDataset.datasetPermohonanLayanan.nama} (Terbuka, jika update)
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">12 Bulan</span>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
         * BARIS 2 / KARTU 3: Tingkat Persetujuan per Jenis Pemohon
         * --------------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul di kiri, Ringkasan di kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Tingkat Persetujuan per Jenis Pemohon
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Rasio disetujui / total permohonan (Hijau ≥ 90%, Oranye &lt; 90%)
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k3Summary.rataRataPersetujuan}%
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Rata-rata
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Total {k3Summary.totalPemohon} Pemohon
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
                  <span>Optimal (≥ 90%)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-orange-500 inline-block" />
                  <span>Perhatian (&lt; 90%)</span>
                </span>
              </div>

              {/* Filter: Jenis Layanan & Periode Rekap */}
              <div className="flex items-center gap-1.5">
                <select
                  value={k3Layanan}
                  onChange={(e) => setK3Layanan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Jenis Layanan Kartu 3"
                >
                  {data.tingkatPersetujuanPemohon.filterOptions.jenisLayanan.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <select
                  value={k3Periode}
                  onChange={(e) => setK3Periode(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Periode Rekap Kartu 3"
                >
                  {data.tingkatPersetujuanPemohon.filterOptions.periodeRekap.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik / Tabel Detail (Sheet Swap) */}
            <div className="h-68 w-full mt-2">
              {k3ViewMode === 'chart' ? (
                <div className="h-full flex flex-col justify-center space-y-3.5 py-1">
                  {k3Data.map((item) => {
                    const isOptimal = item.persenDisetujui >= 90;
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">{item.jenisPemohon}</span>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-[11px] text-slate-400">
                              {item.disetujui.toLocaleString('id-ID')} / {item.total.toLocaleString('id-ID')}
                            </span>
                            <span
                              className={`font-bold text-xs ${
                                isOptimal ? 'text-emerald-700' : 'text-orange-600'
                              }`}
                            >
                              {item.persenDisetujui.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Bar Horizontal */}
                        <div
                          className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative"
                          title={`Disetujui: ${item.disetujui}, Ditolak: ${item.ditolak}, Total: ${item.total}`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOptimal ? 'bg-emerald-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(0, item.persenDisetujui))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Jenis Pemohon</th>
                        <th className="py-1.5 px-1.5 text-right">Disetujui</th>
                        <th className="py-1.5 px-1.5 text-right">Ditolak</th>
                        <th className="py-1.5 px-1.5 text-right">Total Berkas</th>
                        <th className="py-1.5 px-1.5 text-right">Tingkat Persetujuan</th>
                        <th className="py-1.5 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {k3Data.map((item) => {
                        const isOptimal = item.persenDisetujui >= 90;
                        return (
                          <tr key={item.id} className="hover:bg-blue-50/40">
                            <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{item.jenisPemohon}</td>
                            <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{item.disetujui.toLocaleString('id-ID')}</td>
                            <td className="py-1.5 px-1.5 text-right text-slate-600">{item.ditolak.toLocaleString('id-ID')}</td>
                            <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{item.total.toLocaleString('id-ID')}</td>
                            <td className="py-1.5 px-1.5 text-right">
                              <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${isOptimal ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                {item.persenDisetujui.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-1.5 px-2 text-center font-sans">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isOptimal ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                                {isOptimal ? 'Optimal (≥90%)' : 'Perhatian (<90%)'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 3 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium truncate max-w-[85%]">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Terbuka
              </span>
              <span className="truncate" title={data.katalogDataset.datasetPermohonanLayanan.nama}>
                {data.katalogDataset.datasetPermohonanLayanan.nama} (Terbuka, jika update)
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">5 Kategori</span>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
         * BARIS 2 / KARTU 4: Perizinan Peralihan Hak atas Tanah per Jenis Pemohon
         * --------------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul di kiri, Ringkasan di kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Perizinan Peralihan Hak atas Tanah per Jenis Pemohon
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Proporsi pangsa peralihan hak tanah, diurutkan dari nilai tertinggi
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k4Summary.topPersen}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Porsi Terbesar
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Total {k4Summary.totalBerkas} Berkas
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
                  <span>Persentase Porsi Peralihan Hak (%)</span>
                </span>
              </div>

              {/* Filter: Periode Rekap */}
              <div className="flex items-center gap-1.5">
                <select
                  value={k4Periode}
                  onChange={(e) => setK4Periode(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Periode Rekap Kartu 4"
                >
                  {data.peralihanHakPerPemohon.filterOptions.periodeRekap.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <SheetSwapToggle mode={k4ViewMode} onChange={setK4ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik / Tabel Detail (Sheet Swap) */}
            <div className="h-68 w-full mt-2">
              {k4ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k4Data}
                    margin={{ top: 8, right: 30, left: 10, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      unit="%"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="jenisPemohon"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={130}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as PeralihanHakPemohonItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 min-w-44">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.jenisPemohon}
                              </span>
                              <span className="block text-[11px] text-blue-400 font-mono">
                                Porsi: {item.persentase.toFixed(1)}%
                              </span>
                              <span className="block text-[11px] text-slate-300 font-mono">
                                Estimasi Berkas: {item.jumlahBerkas.toLocaleString('id-ID')} berkas
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="persentase"
                      fill="#2563EB"
                      radius={[0, 4, 4, 0]}
                      barSize={18}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Jenis Pemohon</th>
                        <th className="py-1.5 px-1.5 text-right">Estimasi Berkas</th>
                        <th className="py-1.5 px-1.5 text-right">Porsi (%)</th>
                        <th className="py-1.5 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {k4Data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{item.jenisPemohon}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{item.jumlahBerkas.toLocaleString('id-ID')} berkas</td>
                          <td className="py-1.5 px-1.5 text-right">
                            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-50 text-blue-700">
                              {item.persentase.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">
                              {idx === 0 ? 'Porsi Dominan' : 'Aktif'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 4 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium truncate max-w-[85%]">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Terbuka
              </span>
              <span className="truncate" title={data.katalogDataset.datasetPeralihanHak.nama}>
                {data.katalogDataset.datasetPeralihanHak.nama} (Terbuka, jika update)
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">Peralihan Hak</span>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
         * BARIS 3 / KARTU 5: Lahan Tersedia per Sub Wilayah Pengembangan (SWP)
         * --------------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul di kiri, Ringkasan di kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Lahan Tersedia per Sub Wilayah Pengembangan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi luas cadangan lahan siap bangun per area SWP (Hektar)
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k5Summary.totalLuas}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Siap Bangun
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  {k5Summary.totalPersil} ({k5Summary.rataRata})
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" />
                  <span>Luas Lahan Tersedia (Ha)</span>
                </span>
              </div>

              {/* Filter: Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  value={k5Tahun}
                  onChange={(e) => setK5Tahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2.5 py-1 text-[11px] font-medium outline-none focus:border-blue-500"
                  aria-label="Filter Tahun Kartu 5"
                >
                  {data.lahanTersediaSwp.filterOptions.tahun.map((th) => (
                    <option key={th} value={th}>Tahun {th}</option>
                  ))}
                </select>

                <SheetSwapToggle mode={k5ViewMode} onChange={setK5ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik / Tabel Detail (Sheet Swap) */}
            <div className="h-68 w-full mt-2">
              {k5ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k5Data}
                    margin={{ top: 6, right: 30, left: 10, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      unit=" Ha"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="swpKode"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={60}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as SwpLahanTersediaItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 min-w-48">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.swpNama}
                              </span>
                              <span className="block text-[11px] text-blue-400 font-mono">
                                Luas Tersedia: {item.luasHa.toFixed(1)} Ha
                              </span>
                              <span className="block text-[11px] text-emerald-400 font-mono">
                                Jumlah Persil: {item.jumlahPersil} Persil
                              </span>
                              <span className="block text-[11px] text-slate-300 font-mono">
                                Rata-rata: {item.rataRataLuasPerPersil.toFixed(2)} Ha / Persil
                              </span>
                              <span className="block text-[10px] text-slate-400 italic mt-1 pt-1 border-t border-slate-700">
                                Zonasi: {item.peruntukan}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="luasHa"
                      fill="#2563EB"
                      radius={[0, 4, 4, 0]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Kode SWP</th>
                        <th className="py-1.5 px-2">Nama Sub Wilayah (SWP)</th>
                        <th className="py-1.5 px-1.5 text-right">Persil</th>
                        <th className="py-1.5 px-1.5 text-right">Luas (Ha)</th>
                        <th className="py-1.5 px-1.5 text-right">Rerata (Ha/Persil)</th>
                        <th className="py-1.5 px-2">Peruntukan Zonasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {k5Data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-bold text-blue-700">{item.swpKode}</td>
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{item.swpNama}</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-700">{item.jumlahPersil}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-emerald-700">{item.luasHa.toFixed(1)} Ha</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-600">{item.rataRataLuasPerPersil.toFixed(2)}</td>
                          <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[140px]" title={item.peruntukan}>{item.peruntukan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 5 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium truncate max-w-[85%]">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Tertutup
              </span>
              <span className="truncate" title={data.katalogDataset.datasetLahanTersediaSwp.nama}>
                {data.katalogDataset.datasetLahanTersediaSwp.nama} (Tertutup, pertahun)
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">7 Area SWP</span>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
         * BARIS 3 / KARTU 6: Target Penerimaan PNBP per Jenis Penerimaan
         * --------------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul di kiri, Ringkasan di kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Target Penerimaan PNBP per Jenis Penerimaan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Alokasi target anggaran PNBP Direktorat Pengelolaan Pertanahan
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                    Rp {k6Total.toFixed(1)} M
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Total Target
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  4 Pos Penerimaan UWT
                </span>
              </div>
            </div>

            {/* Legenda di bawah judul & Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-700">
                {k6Data.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 font-medium">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0 inline-block"
                      style={{ backgroundColor: item.warna }}
                    />
                    <span className="truncate max-w-[130px]" title={item.jenisPenerimaan}>
                      {item.jenisPenerimaan}
                    </span>
                  </span>
                ))}
              </div>

              <SheetSwapToggle mode={k6ViewMode} onChange={setK6ViewMode} />
            </div>

            {/* Visualisasi Grafik / Tabel Detail (Sheet Swap) */}
            <div className="h-68 w-full mt-2">
              {k6ViewMode === 'chart' ? (
                <div className="relative h-full w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={k6Data}
                        dataKey="anggaranIdrMiliar"
                        nameKey="jenisPenerimaan"
                        innerRadius={68}
                        outerRadius={95}
                        paddingAngle={3}
                      >
                        {k6Data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.warna} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const item = payload[0].payload as PnbpJenisPenerimaanItem;
                            return (
                              <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 min-w-44">
                                <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                  {item.jenisPenerimaan}
                                </span>
                                <span className="block text-[11px] text-blue-400 font-mono">
                                  Anggaran: Rp {item.anggaranIdrMiliar.toFixed(1)} Miliar
                                </span>
                                <span className="block text-[11px] text-emerald-400 font-mono">
                                  Porsi: {item.persenShare.toFixed(1)}% dari Total
                                </span>
                                <span className="block text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-700">
                                  {item.deskripsi}
                                </span>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Total di Tengah Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      TOTAL TARGET
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                      Rp {k6Total.toFixed(0)} M
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 font-mono">
                      100% PNBP
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Pos Penerimaan PNBP</th>
                        <th className="py-1.5 px-1.5 text-right">Target Anggaran</th>
                        <th className="py-1.5 px-1.5 text-right">Porsi (%)</th>
                        <th className="py-1.5 px-2">Deskripsi Operasional</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {k6Data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-xs shrink-0 inline-block"
                              style={{ backgroundColor: item.warna }}
                            />
                            <span>{item.jenisPenerimaan}</span>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">
                            Rp {item.anggaranIdrMiliar.toFixed(1)} M
                          </td>
                          <td className="py-1.5 px-1.5 text-right">
                            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-50 text-blue-700">
                              {item.persenShare.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-1.5 px-2 font-sans text-[10px] text-slate-600 truncate max-w-[170px]" title={item.deskripsi}>
                            {item.deskripsi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 6 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium truncate max-w-[85%]">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Tertutup
              </span>
              <span className="truncate" title={data.katalogDataset.datasetTargetPenerimaanPnbp.nama}>
                {data.katalogDataset.datasetTargetPenerimaanPnbp.nama} (Tertutup, jika update)
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">IDR Miliar</span>
          </div>
        </div>

      </div>
    </div>
  );
};
