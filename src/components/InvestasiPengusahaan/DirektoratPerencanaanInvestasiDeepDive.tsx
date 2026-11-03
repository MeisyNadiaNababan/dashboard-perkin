import React, { useState, useMemo } from 'react';
import {
  Building2,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Briefcase,
  Layers,
  FileCheck2,
  Activity,
  Calendar,
  Compass,
  FileSpreadsheet,
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
  Legend,
} from 'recharts';
import {
  PERENCANAAN_INVESTASI_DATA,
  KekProfilItem,
  DayaSaingItem,
  InvestasiKomitmenItem,
  UsulanKekItem,
} from './perencanaanPengembanganInvestasiData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const DirektoratPerencanaanInvestasiDeepDive: React.FC = () => {
  const data = PERENCANAAN_INVESTASI_DATA;

  // --------------------------------------------------------------------------
  // SHEET SWAP VIEW MODE STATES (GRAFIK VS TABEL DETAIL)
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
  // Kartu 1: Filter Kegiatan
  const [k1Kegiatan, setK1Kegiatan] = useState<string>('Semua Kegiatan');

  // Kartu 2: Filter Tahun Rekap
  const [k2Tahun, setK2Tahun] = useState<string>('2026 (YTD)');

  // Kartu 3: Filter Kawasan
  const [k3Kawasan, setK3Kawasan] = useState<string>('Semua Kawasan');

  // Kartu 4: Filter Kawasan
  const [k4Kawasan, setK4Kawasan] = useState<string>('Semua Kawasan');

  // Kartu 5: Filter Tahun & Nama KEK
  const [k5Tahun, setK5Tahun] = useState<string>('2026 (Berjalan)');
  const [k5Kek, setK5Kek] = useState<string>('Semua KEK');

  // --------------------------------------------------------------------------
  // COMPUTED DATA & SUMMARY RINGKASAN
  // --------------------------------------------------------------------------

  // KARTU 1: Luas Kawasan Ekonomi Khusus (KEK)
  const k1Data = useMemo(() => {
    return data.profilLuasKek.records
      .filter((item) => {
        if (k1Kegiatan === 'Semua Kegiatan') return true;
        return item.kategoriKegiatan === k1Kegiatan;
      })
      .sort((a, b) => b.luasHa - a.luasHa);
  }, [data.profilLuasKek.records, k1Kegiatan]);

  const k1Summary = useMemo(() => {
    const totalLuas = k1Data.reduce((acc, curr) => acc + curr.luasHa, 0);
    const countKek = k1Data.length;
    return {
      totalLuas: totalLuas.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      jumlahKek: `${countKek} KEK Ditetapkan`,
    };
  }, [k1Data]);

  // KARTU 2: Perbandingan Daya Saing Kawasan
  const k2Data = useMemo(() => {
    const records = data.dayaSaingKawasan.recordsByYear[k2Tahun] || data.dayaSaingKawasan.recordsByYear['2026 (YTD)'];
    return [...records];
  }, [data.dayaSaingKawasan.recordsByYear, k2Tahun]);

  const k2Summary = useMemo(() => {
    if (!k2Data.length) return { kategori: '-', skor: 0 };
    const sorted = [...k2Data].sort((a, b) => b.skorBatam - a.skorBatam);
    const top = sorted[0];
    return {
      kategori: top.kategoriSingkat,
      skor: top.skorBatam.toFixed(1),
    };
  }, [k2Data]);

  // KARTU 3: Nilai Investasi Komitmen per Kawasan
  const k3Data = useMemo(() => {
    return data.investasiKomitmen.records
      .filter((item) => {
        if (k3Kawasan === 'Semua Kawasan') return true;
        return item.kawasan === k3Kawasan;
      })
      .sort((a, b) => b.nilaiKomitmenRpT - a.nilaiKomitmenRpT);
  }, [data.investasiKomitmen.records, k3Kawasan]);

  const k3Summary = useMemo(() => {
    const totalKomitmen = k3Data.reduce((acc, curr) => acc + curr.nilaiKomitmenRpT, 0);
    const totalPerusahaan = k3Data.reduce((acc, curr) => acc + curr.jumlahPerusahaan, 0);
    return {
      totalKomitmen: `Rp ${totalKomitmen.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`,
      keterangan: `${totalPerusahaan} Pelaku Usaha`,
    };
  }, [k3Data]);

  // KARTU 4: Status Operasional Perusahaan di KEK
  const k4Data = useMemo(() => {
    const stat = data.statusOperasional.recordsPerKawasan[k4Kawasan] || data.statusOperasional.recordsPerKawasan['Semua Kawasan'];
    const total = stat.totalPerusahaan;
    return [
      {
        name: 'Beroperasi',
        value: stat.beroperasi,
        percent: total > 0 ? Number(((stat.beroperasi / total) * 100).toFixed(1)) : 0,
        color: '#16a34a', // hijau untuk positif / aktif beroperasi
      },
      {
        name: 'Konstruksi',
        value: stat.konstruksi,
        percent: total > 0 ? Number(((stat.konstruksi / total) * 100).toFixed(1)) : 0,
        color: '#2563eb', // biru #2563eb
      },
      {
        name: 'Belum Operasi',
        value: stat.belumOperasi,
        percent: total > 0 ? Number(((stat.belumOperasi / total) * 100).toFixed(1)) : 0,
        color: '#f97316', // oranye untuk perhatian/belum beroperasi
      },
    ];
  }, [data.statusOperasional.recordsPerKawasan, k4Kawasan]);

  const k4Summary = useMemo(() => {
    const stat = data.statusOperasional.recordsPerKawasan[k4Kawasan] || data.statusOperasional.recordsPerKawasan['Semua Kawasan'];
    const pct = stat.totalPerusahaan > 0 ? ((stat.beroperasi / stat.totalPerusahaan) * 100).toFixed(1) : '0';
    return {
      beroperasi: `${stat.beroperasi} Perusahaan`,
      keterangan: `${pct}% Beroperasi`,
    };
  }, [data.statusOperasional.recordsPerKawasan, k4Kawasan]);

  // KARTU 5: Kegiatan Monitoring dan Evaluasi Kawasan
  const k5Data = useMemo(() => {
    const records = data.monevKawasan.recordsByYear[k5Tahun] || data.monevKawasan.recordsByYear['2026 (Berjalan)'];
    return records.map((item) => {
      if (k5Kek === 'Semua KEK') {
        return item;
      }
      return {
        ...item,
        kekNongsa: k5Kek === 'KEK Nongsa Digital Park' ? item.kekNongsa : 0,
        kekBat: k5Kek === 'KEK Batam Aero Technic' ? item.kekBat : 0,
        kekSekupang: k5Kek === 'KEK Pariwisata Kesehatan Batam' ? item.kekSekupang : 0,
        kekTanjungSauh: k5Kek === 'KEK Tanjung Sauh' ? item.kekTanjungSauh : 0,
      };
    });
  }, [data.monevKawasan.recordsByYear, k5Tahun, k5Kek]);

  const k5Summary = useMemo(() => {
    const records = data.monevKawasan.recordsByYear[k5Tahun] || data.monevKawasan.recordsByYear['2026 (Berjalan)'];
    let total = 0;
    records.forEach((r) => {
      if (k5Kek === 'Semua KEK') {
        total += r.totalKegiatan;
      } else if (k5Kek === 'KEK Nongsa Digital Park') {
        total += r.kekNongsa;
      } else if (k5Kek === 'KEK Batam Aero Technic') {
        total += r.kekBat;
      } else if (k5Kek === 'KEK Pariwisata Kesehatan Batam') {
        total += r.kekSekupang;
      } else if (k5Kek === 'KEK Tanjung Sauh') {
        total += r.kekTanjungSauh;
      }
    });
    return {
      totalMonev: `${total} Kegiatan`,
      keterangan: k5Tahun.includes('2026') ? 'Tahun Berjalan' : 'Tahun 2025 Penuh',
    };
  }, [data.monevKawasan.recordsByYear, k5Tahun, k5Kek]);

  // KARTU 6: Perencanaan / Pengusulan KEK Baru
  const k6Data = useMemo(() => {
    return data.pengusulanKekBaru.records;
  }, [data.pengusulanKekBaru.records]);

  const k6Summary = useMemo(() => {
    const totalLuasUsulan = k6Data.reduce((acc, curr) => acc + curr.luasUsulanHa, 0);
    return {
      jumlahUsulan: `${k6Data.length} Usulan KEK`,
      keterangan: `${totalLuasUsulan.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Ha Total Usulan`,
    };
  }, [k6Data]);

  const maxLuasUsulan = useMemo(() => {
    return Math.max(...k6Data.map((d) => d.luasUsulanHa), 600);
  }, [k6Data]);

  return (
    <div className="space-y-4">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM x 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA)                */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: LUAS KAWASAN EKONOMI KHUSUS (KEK)               */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between transition-all hover:border-slate-300">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Luas Kawasan Ekonomi Khusus (KEK)
                </h3>
                <span className="text-xs text-slate-500">
                  Total luas lahan yang ditetapkan menurut kawasan (Ha)
                </span>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k1Summary.totalLuas} <span className="text-sm font-semibold text-slate-500">Ha</span>
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    {k1Summary.jumlahKek}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Diurutkan dari wilayah terluas
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2.5 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                  <span>Luas Wilayah (Hektar)</span>
                </span>
              </div>

              {/* Filter: Kegiatan & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Kegiatan:</span>
                  <select
                    value={k1Kegiatan}
                    onChange={(e) => setK1Kegiatan(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500 cursor-pointer"
                    aria-label="Filter Kegiatan Kartu 1"
                  >
                    {data.profilLuasKek.filterOptions.kegiatan.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <SheetSwapToggle mode={k1ViewMode} onChange={setK1ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik: Bar Horizontal vs Tabel Detail */}
            <div className="h-64 w-full mt-2">
              {k1ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k1Data}
                    margin={{ top: 8, right: 30, left: 10, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                      unit=" Ha"
                    />
                    <YAxis
                      type="category"
                      dataKey="namaSingkat"
                      tick={{ fontSize: 10.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={110}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as KekProfilItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 min-w-56">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.namaKek}
                              </span>
                              <span className="block text-[11px] text-blue-300 font-mono font-bold">
                                Luas: {item.luasHa.toLocaleString('id-ID')} Ha
                              </span>
                              <span className="block text-[11px] text-slate-300 mt-1">
                                <strong className="text-slate-400">Lokasi:</strong> {item.lokasi}
                              </span>
                              <span className="block text-[11px] text-slate-300 mt-0.5">
                                <strong className="text-slate-400">Kegiatan:</strong> {item.kegiatan}
                              </span>
                              <span className="block text-[11px] text-emerald-400 mt-0.5 font-medium">
                                <strong className="text-slate-400">Pengusul:</strong> {item.pengusul}
                              </span>
                              <span className="block text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-800 font-mono">
                                Dasar Hukum: {item.dasarHukum}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="luasHa"
                      name="Luas (Ha)"
                      fill="#2563eb"
                      radius={[0, 4, 4, 0]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Nama KEK</th>
                        <th className="py-2 px-2 text-right">Luas (Ha)</th>
                        <th className="py-2 px-2.5">Kategori Kegiatan</th>
                        <th className="py-2 px-2.5">Lokasi</th>
                        <th className="py-2 px-2.5">Pengusul / BUPP</th>
                        <th className="py-2 px-2">Dasar Hukum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k1Data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900">{row.namaKek}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.luasHa.toLocaleString('id-ID')} Ha</td>
                          <td className="py-2 px-2.5 text-slate-700">{row.kategoriKegiatan}</td>
                          <td className="py-2 px-2.5 text-slate-600 whitespace-nowrap">{row.lokasi}</td>
                          <td className="py-2 px-2.5 text-slate-800 font-medium truncate max-w-xs">{row.pengusul}</td>
                          <td className="py-2 px-2 font-mono text-slate-500 text-[10px] whitespace-nowrap">{row.dasarHukum}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer kecil */}
          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-blue-50 text-blue-700 border border-blue-200">
                {data.profilLuasKek.datasetInfo.sifat}
              </span>
              <span>Dataset: {data.profilLuasKek.datasetInfo.nama} ({data.profilLuasKek.datasetInfo.frekuensi})</span>
            </span>
            <span className="font-mono text-slate-400">BP Batam DPPI</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: PERBANDINGAN DAYA SAING KAWASAN                 */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between transition-all hover:border-slate-300">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Perbandingan Daya Saing Kawasan
                </h3>
                <span className="text-xs text-slate-500">
                  Benchmark KPBPBB Batam vs Johor, Vietnam &amp; Kendal
                </span>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k2Summary.skor}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Skor Tertinggi
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  {k2Summary.kategori}
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2.5 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1 text-slate-800 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                  <span>KPBPBB Batam</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b] inline-block" />
                  <span>Johor (Malaysia)</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8] inline-block" />
                  <span>Vietnam</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#cbd5e1] inline-block" />
                  <span>KEK Kendal</span>
                </span>
              </div>

              {/* Filter: Tahun Rekap & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Tahun:</span>
                  <select
                    value={k2Tahun}
                    onChange={(e) => setK2Tahun(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500 cursor-pointer"
                    aria-label="Filter Tahun Rekap Kartu 2"
                  >
                    {data.dayaSaingKawasan.filterOptions.tahunRekap.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik: Clustered Bar Horizontal vs Tabel Detail */}
            <div className="h-64 w-full mt-2">
              {k2ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k2Data}
                    margin={{ top: 6, right: 25, left: 10, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      domain={[60, 100]}
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="kategoriSingkat"
                      tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={118}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as DayaSaingItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 min-w-60">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.kategori}
                              </span>
                              <div className="space-y-0.5 font-mono text-[11px] my-1.5">
                                <div className="flex justify-between text-blue-400 font-bold">
                                  <span>KPBPBB Batam:</span>
                                  <span>{item.skorBatam.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                  <span>Johor (Malaysia):</span>
                                  <span>{item.skorJohor.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                  <span>Vietnam (VSIP):</span>
                                  <span>{item.skorVietnam.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                  <span>KEK Kendal:</span>
                                  <span>{item.skorKendal.toFixed(1)}</span>
                                </div>
                              </div>
                              <span className="block text-[10.5px] text-slate-300 border-t border-slate-800 pt-1 mt-1">
                                <strong className="text-slate-400">Uraian:</strong> {item.uraian}
                              </span>
                              <span className="block text-[10px] text-emerald-400 mt-0.5">
                                {item.keterangan}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="skorBatam" name="KPBPBB Batam" fill="#2563eb" barSize={5} radius={[0, 2, 2, 0]} />
                    <Bar dataKey="skorJohor" name="Johor" fill="#64748b" barSize={5} radius={[0, 2, 2, 0]} />
                    <Bar dataKey="skorVietnam" name="Vietnam" fill="#94a3b8" barSize={5} radius={[0, 2, 2, 0]} />
                    <Bar dataKey="skorKendal" name="KEK Kendal" fill="#cbd5e1" barSize={5} radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Kategori / Indikator</th>
                        <th className="py-2 px-2 text-right">Batam (KPBPBB)</th>
                        <th className="py-2 px-2 text-right">Johor (MY)</th>
                        <th className="py-2 px-2 text-right">Vietnam</th>
                        <th className="py-2 px-2 text-right">KEK Kendal</th>
                        <th className="py-2 px-2.5">Catatan Daya Saing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k2Data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900">{row.kategori}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.skorBatam.toFixed(1)}</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-600">{row.skorJohor.toFixed(1)}</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-500">{row.skorVietnam.toFixed(1)}</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-500">{row.skorKendal.toFixed(1)}</td>
                          <td className="py-2 px-2.5 text-emerald-700 font-medium truncate max-w-xs">{row.keterangan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer kecil */}
          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-slate-100 text-slate-700 border border-slate-300">
                {data.dayaSaingKawasan.datasetInfo.sifat}
              </span>
              <span>Dataset: {data.dayaSaingKawasan.datasetInfo.nama} ({data.dayaSaingKawasan.datasetInfo.frekuensi})</span>
            </span>
            <span className="font-mono text-slate-400">Indeks Komparasi</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: NILAI INVESTASI KOMITMEN PER KAWASAN            */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between transition-all hover:border-slate-300">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Nilai Investasi Komitmen per Kawasan
                </h3>
                <span className="text-xs text-slate-500">
                  Total komitmen investasi izin berusaha administrator KEK
                </span>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k3Summary.totalKomitmen}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Komitmen
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  {k3Summary.keterangan}
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2.5 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                  <span>Nilai Komitmen (Rp Triliun)</span>
                </span>
              </div>

              {/* Filter: Kawasan & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Kawasan:</span>
                  <select
                    value={k3Kawasan}
                    onChange={(e) => setK3Kawasan(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500 cursor-pointer"
                    aria-label="Filter Kawasan Kartu 3"
                  >
                    {data.investasiKomitmen.filterOptions.kawasan.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik: Bar Horizontal vs Tabel Detail */}
            <div className="h-64 w-full mt-2">
              {k3ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k3Data}
                    margin={{ top: 8, right: 30, left: 10, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                      unit=" T"
                    />
                    <YAxis
                      type="category"
                      dataKey="singkatan"
                      tick={{ fontSize: 10.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={110}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as InvestasiKomitmenItem;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 min-w-56">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                {item.kawasan}
                              </span>
                              <span className="block text-[11px] text-blue-300 font-mono font-bold">
                                Komitmen: Rp {item.nilaiKomitmenRpT.toFixed(2)} Triliun
                              </span>
                              <span className="block text-[11px] text-slate-300 mt-1">
                                <strong className="text-slate-400">Jumlah Perusahaan:</strong> {item.jumlahPerusahaan} entitas
                              </span>
                              <span className="block text-[11px] text-emerald-400 mt-0.5 font-medium">
                                <strong className="text-slate-400">Target Tenaga Kerja:</strong> {item.targetTenagaKerja.toLocaleString('id-ID')} orang
                              </span>
                              <span className="block text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-800 font-mono">
                                Dasar Hukum: {item.dasarHukum}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="nilaiKomitmenRpT"
                      name="Nilai Komitmen"
                      fill="#2563eb"
                      radius={[0, 4, 4, 0]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Kawasan KEK</th>
                        <th className="py-2 px-2 text-right">Nilai Komitmen (Rp T)</th>
                        <th className="py-2 px-2 text-right">Pelaku Usaha</th>
                        <th className="py-2 px-2 text-right">Target Naker</th>
                        <th className="py-2 px-2 text-right">Realisasi (%)</th>
                        <th className="py-2 px-2.5">Dasar Hukum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k3Data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900">{row.kawasan}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">Rp {row.nilaiKomitmenRpT.toFixed(2)} T</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-700">{row.jumlahPerusahaan} entitas</td>
                          <td className="py-2 px-2 text-right font-mono text-emerald-700">{row.targetTenagaKerja.toLocaleString('id-ID')}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-emerald-600">{row.persentaseRealisasiKomitmen}%</td>
                          <td className="py-2 px-2.5 text-slate-500 font-mono text-[10px] truncate max-w-xs">{row.dasarHukum}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer kecil */}
          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-slate-100 text-slate-700 border border-slate-300">
                {data.investasiKomitmen.datasetInfo.sifat}
              </span>
              <span>Dataset: {data.investasiKomitmen.datasetInfo.nama} ({data.investasiKomitmen.datasetInfo.frekuensi})</span>
            </span>
            <span className="font-mono text-slate-400">Komitmen KEK</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: STATUS OPERASIONAL PERUSAHAAN DI KEK            */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between transition-all hover:border-slate-300">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Status Operasional Perusahaan di KEK
                </h3>
                <span className="text-xs text-slate-500">
                  Proporsi kepatuhan operasional pelaku usaha penerima fasilitas KEK
                </span>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k4Summary.beroperasi}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    {k4Summary.keterangan}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Telah beroperasi komersial
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2.5 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a] inline-block" />
                  <span>Beroperasi</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                  <span>Konstruksi</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316] inline-block" />
                  <span>Belum Operasi</span>
                </span>
              </div>

              {/* Filter: Kawasan & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Kawasan:</span>
                  <select
                    value={k4Kawasan}
                    onChange={(e) => setK4Kawasan(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500 cursor-pointer"
                    aria-label="Filter Kawasan Kartu 4"
                  >
                    {data.statusOperasional.filterOptions.kawasan.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <SheetSwapToggle mode={k4ViewMode} onChange={setK4ViewMode} />
              </div>
            </div>

            {/* Visualisasi Donut Chart vs Tabel Detail */}
            <div className="h-64 w-full relative flex items-center justify-center mt-2">
              {k4ViewMode === 'chart' ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={k4Data}
                        cx="50%"
                        cy="50%"
                        innerRadius={68}
                        outerRadius={96}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {k4Data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const item = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 min-w-44">
                                <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                  Status: {item.name}
                                </span>
                                <span className="block text-[11px] text-blue-300 font-mono">
                                  Jumlah: {item.value} Perusahaan
                                </span>
                                <span className="block text-[11px] text-emerald-400 font-mono">
                                  Porsi: {item.percent}%
                                </span>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Overlay Donut Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Total
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 leading-tight">
                      {k4Data.reduce((acc, c) => acc + c.value, 0)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Perusahaan
                    </span>
                  </div>
                </>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Status Kepatuhan</th>
                        <th className="py-2 px-2 text-right">Jumlah Entitas</th>
                        <th className="py-2 px-2 text-right">Porsi (%)</th>
                        <th className="py-2 px-2.5">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k4Data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                            <span>{row.name}</span>
                          </td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.value} BU</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-emerald-700">{row.percent}%</td>
                          <td className="py-2 px-2.5 text-slate-600 text-[10px]">
                            {row.name === 'Beroperasi' ? 'Sudah beroperasi komersial aktif' : row.name === 'Konstruksi' ? 'Tahap pembangunan pabrik/sarana fisik' : 'Izin aktif belum memulai konstruksi'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer kecil */}
          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-slate-100 text-slate-700 border border-slate-300">
                {data.statusOperasional.datasetInfo.sifat}
              </span>
              <span>Dataset: {data.statusOperasional.datasetInfo.nama} ({data.statusOperasional.datasetInfo.frekuensi})</span>
            </span>
            <span className="font-mono text-slate-400">Monitoring KEK</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: KEGIATAN MONITORING DAN EVALUASI KAWASAN        */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between transition-all hover:border-slate-300">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Kegiatan Monitoring dan Evaluasi Kawasan
                </h3>
                <span className="text-xs text-slate-500">
                  Frekuensi pengawasan lapangan dan evaluasi kepatuhan KEK
                </span>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k5Summary.totalMonev}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    {k5Summary.keterangan}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  100% Agenda Terlaksana
                </span>
              </div>
            </div>

            {/* Legenda & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2.5 border-b border-slate-100 text-xs">
              {/* Legenda di bawah judul */}
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1 text-slate-800 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                  <span>KEK Nongsa</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b] inline-block" />
                  <span>KEK BAT</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a] inline-block" />
                  <span>KEK Sekupang</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8] inline-block" />
                  <span>KEK Tanjung Sauh</span>
                </span>
              </div>

              {/* Filter: Tahun & Nama KEK & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <select
                    value={k5Tahun}
                    onChange={(e) => setK5Tahun(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500 cursor-pointer"
                    aria-label="Filter Tahun Kartu 5"
                  >
                    {data.monevKawasan.filterOptions.tahun.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  <select
                    value={k5Kek}
                    onChange={(e) => setK5Kek(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-2 py-1 text-[11px] font-medium outline-none focus:border-blue-500 cursor-pointer"
                    aria-label="Filter Nama KEK Kartu 5"
                  >
                    {data.monevKawasan.filterOptions.namaKek.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <SheetSwapToggle mode={k5ViewMode} onChange={setK5ViewMode} />
              </div>
            </div>

            {/* Visualisasi Grafik: Clustered Column vs Tabel Detail */}
            <div className="h-64 w-full mt-2">
              {k5ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k5Data}
                    margin={{ top: 12, right: 15, left: -15, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="periode"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 min-w-56">
                              <span className="block font-bold text-slate-100 mb-1 border-b border-slate-700 pb-1">
                                Periode {item.periode}
                              </span>
                              <div className="space-y-0.5 font-mono text-[11px] my-1.5">
                                <div className="flex justify-between text-blue-400">
                                  <span>KEK Nongsa:</span>
                                  <span>{item.kekNongsa} kegiatan</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                  <span>KEK BAT:</span>
                                  <span>{item.kekBat} kegiatan</span>
                                </div>
                                <div className="flex justify-between text-emerald-400">
                                  <span>KEK Sekupang:</span>
                                  <span>{item.kekSekupang} kegiatan</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                  <span>KEK Tanjung Sauh:</span>
                                  <span>{item.kekTanjungSauh} kegiatan</span>
                                </div>
                                <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-1 mt-1">
                                  <span>Total Periode:</span>
                                  <span>{item.totalKegiatan} kegiatan</span>
                                </div>
                              </div>
                              <span className="block text-[10px] text-slate-300 border-t border-slate-800 pt-1 mt-1">
                                <strong className="text-slate-400">Fokus:</strong> {item.agendaUtama}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="kekNongsa" name="KEK Nongsa" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={10} />
                    <Bar dataKey="kekBat" name="KEK BAT" fill="#64748b" radius={[4, 4, 0, 0]} barSize={10} />
                    <Bar dataKey="kekSekupang" name="KEK Sekupang" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={10} />
                    <Bar dataKey="kekTanjungSauh" name="KEK Tanjung Sauh" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Periode</th>
                        <th className="py-2 px-2 text-right">KEK Nongsa</th>
                        <th className="py-2 px-2 text-right">KEK BAT</th>
                        <th className="py-2 px-2 text-right">KEK Sekupang</th>
                        <th className="py-2 px-2 text-right">KEK Tg. Sauh</th>
                        <th className="py-2 px-2 text-right">Total</th>
                        <th className="py-2 px-2.5">Fokus Agenda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k5Data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900 whitespace-nowrap">{row.periode}</td>
                          <td className="py-2 px-2 text-right font-mono text-blue-700">{row.kekNongsa}</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-600">{row.kekBat}</td>
                          <td className="py-2 px-2 text-right font-mono text-emerald-600">{row.kekSekupang}</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-500">{row.kekTanjungSauh}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-slate-900">{row.totalKegiatan}</td>
                          <td className="py-2 px-2.5 text-slate-600 truncate max-w-xs">{row.agendaUtama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer kecil */}
          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-slate-100 text-slate-700 border border-slate-300">
                {data.monevKawasan.datasetInfo.sifat}
              </span>
              <span>Dataset: {data.monevKawasan.datasetInfo.nama} ({data.monevKawasan.datasetInfo.frekuensi})</span>
            </span>
            <span className="font-mono text-slate-400">Monev Terpadu</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: PERENCANAAN / PENGUSULAN KEK BARU               */}
        {/* (COMPACT SUMMARY TABLE DENGAN INLINE MINI-BAR)                     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between transition-all hover:border-slate-300">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Perencanaan / Pengusulan KEK Baru
                </h3>
                <span className="text-xs text-slate-500">
                  Daftar pipeline pengusulan penetapan Kawasan Ekonomi Khusus baru di Batam
                </span>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                    {k6Summary.jumlahUsulan}
                  </span>
                  <span className="text-xs font-semibold text-blue-600">
                    Pipeline
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  {k6Summary.keterangan}
                </span>
              </div>
            </div>

            {/* Legenda & Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                  <span>Luas Usulan (Ha)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block" />
                  <span>Tahap Kesiapan Dokumen</span>
                </span>
              </div>
              <SheetSwapToggle mode={k6ViewMode} onChange={setK6ViewMode} />
            </div>

            {/* Container Visual: Chart atau Tabel Detail */}
            <div className="mt-2 min-h-[220px]">
              {k6ViewMode === 'chart' ? (
                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={k6Data}
                      layout="vertical"
                      margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickLine={false}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickFormatter={(val) => `${val} Ha`}
                      />
                      <YAxis
                        dataKey="namaKek"
                        type="category"
                        tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                        tickLine={false}
                        axisLine={{ stroke: '#cbd5e1' }}
                        width={120}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          color: '#f8fafc',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '11px',
                          padding: '8px 12px'
                        }}
                        formatter={(val: any, _name: any, item: any) => [
                          `${Number(val).toLocaleString('id-ID')} Ha (Est. Investasi: Rp ${item.payload.estimasiInvestasiRpT} T)`,
                          'Luas Usulan'
                        ]}
                      />
                      <Bar dataKey="luasUsulanHa" fill="#2563eb" radius={[0, 4, 4, 0]} name="Luas Usulan (Ha)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-56 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Nama KEK</th>
                        <th className="py-2 px-2">Pengusul</th>
                        <th className="py-2 px-2">Lokasi</th>
                        <th className="py-2 px-2 text-right">Luas (Ha)</th>
                        <th className="py-2 px-2 text-right">Est. Investasi</th>
                        <th className="py-2 px-2">Kegiatan Utama</th>
                        <th className="py-2 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k6Data.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-slate-800 whitespace-nowrap">{item.namaKek}</td>
                          <td className="py-2 px-2 text-slate-600 truncate max-w-36">{item.pengusul}</td>
                          <td className="py-2 px-2 text-slate-600 whitespace-nowrap">{item.lokasi}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{item.luasUsulanHa.toLocaleString('id-ID')}</td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-emerald-700">Rp {item.estimasiInvestasiRpT} T</td>
                          <td className="py-2 px-2 text-slate-600 truncate max-w-44">{item.kegiatan}</td>
                          <td className="py-2 px-2 text-center whitespace-nowrap">
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {item.dasarHukumStatus}
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

          {/* Footer kecil */}
          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-blue-50 text-blue-700 border border-blue-200">
                {data.pengusulanKekBaru.datasetInfo.sifat}
              </span>
              <span>Dataset: {data.pengusulanKekBaru.datasetInfo.nama} ({data.pengusulanKekBaru.datasetInfo.frekuensi})</span>
            </span>
            <span className="font-mono text-slate-400">Pipeline Dewan Kawasan</span>
          </div>
        </div>

      </div>
    </div>
  );
};
