import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  Briefcase,
  Users,
  Globe,
  Award,
  Building2,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Layers,
  ChevronRight,
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
  Legend,
  ComposedChart,
  Line,
  AreaChart,
  Area,
  Cell,
} from 'recharts';
import {
  PROMOSI_FASILITASI_DATA,
  TentatifPromosiItem,
  FasilitasiBulananItem,
  KunjunganInvestorItem,
  TrafficWebsiteItem,
  PenerimaInsentifItem,
  ProyekInfrastrukturItem,
} from './promosiFasilitasiInvestasiData';

export const DirektoratPromosiInvestasiDeepDive: React.FC = () => {
  const db = PROMOSI_FASILITASI_DATA;

  // --------------------------------------------------------------------------
  // LOCAL FILTER STATES UNTUK SETIAP KARTU
  // --------------------------------------------------------------------------
  // Kartu 1: Filter Tahun
  const [k1Tahun, setK1Tahun] = useState<string>('2026');

  // Kartu 2: Filter Tahun
  const [k2Tahun, setK2Tahun] = useState<string>('2026');

  // Kartu 3: Filter Tahun
  const [k3Tahun, setK3Tahun] = useState<string>('2026');

  // Kartu 4: Filter Rentang Multi-Tahun
  const [k4Range, setK4Range] = useState<string>('Semua (2024-2026)');

  // Kartu 5: Filter Tahun
  const [k5Tahun, setK5Tahun] = useState<string>('2026');

  // Kartu 6: Filter Status Project
  const [k6Status, setK6Status] = useState<string>('Semua Status');

  // --------------------------------------------------------------------------
  // KARTU 1: TENTATIF KEGIATAN PROMOSI PER KATEGORI (HORIZONTAL BAR SORTED)
  // --------------------------------------------------------------------------
  const k1FilteredRecords = useMemo(() => {
    return db.tentatifKegiatanPromosi.records.filter((item) => {
      if (k1Tahun === 'Semua') return true;
      return item.tahun === Number(k1Tahun);
    });
  }, [db.tentatifKegiatanPromosi.records, k1Tahun]);

  const k1CategoryData = useMemo(() => {
    const map = new Map<string, { kategori: string; jumlah: number; totalTamu: number; items: TentatifPromosiItem[] }>();
    k1FilteredRecords.forEach((item) => {
      const existing = map.get(item.kategori) || { kategori: item.kategori, jumlah: 0, totalTamu: 0, items: [] };
      existing.jumlah += 1;
      existing.totalTamu += item.jumlahTamu;
      existing.items.push(item);
      map.set(item.kategori, existing);
    });

    return Array.from(map.values()).sort((a, b) => b.jumlah - a.jumlah);
  }, [k1FilteredRecords]);

  const k1Summary = useMemo(() => {
    const totalKegiatan = k1FilteredRecords.length;
    const terjadwal = k1FilteredRecords.filter((r) => r.statusKegiatan === 'Terjadwal' || r.statusKegiatan === 'Persiapan').length;
    return {
      total: totalKegiatan,
      labelKanan: `${terjadwal} Kegiatan Terjadwal`,
      keteranganBiru: `Tahun ${k1Tahun}`,
    };
  }, [k1FilteredRecords, k1Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 2: KEGIATAN FASILITASI DAN PENDAMPINGAN INVESTASI (CLUSTERED COLUMN)
  // --------------------------------------------------------------------------
  const k2FilteredRecords = useMemo(() => {
    return db.fasilitasiPendampingan.records.filter((item) => item.tahun === Number(k2Tahun));
  }, [db.fasilitasiPendampingan.records, k2Tahun]);

  const k2Summary = useMemo(() => {
    const totalKegiatan = k2FilteredRecords.reduce((acc, curr) => acc + curr.totalKegiatan, 0);
    const totalTamu = k2FilteredRecords.reduce((acc, curr) => acc + curr.totalTamu, 0);
    return {
      totalKegiatan,
      totalTamu: totalTamu.toLocaleString('id-ID'),
    };
  }, [k2FilteredRecords]);

  // --------------------------------------------------------------------------
  // KARTU 3: KUNJUNGAN PEMINAT INVESTOR (COLUMN + PREVIOUS YEAR LINE)
  // --------------------------------------------------------------------------
  const k3FilteredRecords = useMemo(() => {
    return db.kunjunganPeminatInvestor.records.filter((item) => item.tahun === Number(k3Tahun));
  }, [db.kunjunganPeminatInvestor.records, k3Tahun]);

  const k3Summary = useMemo(() => {
    const totalBerjalan = k3FilteredRecords.reduce((acc, curr) => acc + curr.jumlahKunjungan, 0);
    const totalTahunLalu = k3FilteredRecords.reduce((acc, curr) => acc + curr.jumlahKunjunganTahunLalu, 0);
    const delta = totalTahunLalu > 0 ? ((totalBerjalan - totalTahunLalu) / totalTahunLalu) * 100 : 0;
    const isPositive = delta >= 0;
    return {
      totalBerjalan,
      deltaStr: `${isPositive ? '+' : ''}${delta.toFixed(1)}% vs Thn Lalu`,
      isPositive,
      totalTahunLalu,
    };
  }, [k3FilteredRecords]);

  // --------------------------------------------------------------------------
  // KARTU 4: KUNJUNGAN WEBSITE INVEST IN BATAM (LINE + AREA CHART MULTI-TAHUN)
  // --------------------------------------------------------------------------
  const k4FilteredRecords = useMemo(() => {
    if (k4Range === '2026 Saja') {
      return db.kunjunganWebsiteInvest.records.filter((item) => item.tahun === 2026);
    }
    if (k4Range === '2025-2026') {
      return db.kunjunganWebsiteInvest.records.filter((item) => item.tahun >= 2025);
    }
    return db.kunjunganWebsiteInvest.records;
  }, [db.kunjunganWebsiteInvest.records, k4Range]);

  const k4Summary = useMemo(() => {
    const records2026 = db.kunjunganWebsiteInvest.records.filter((item) => item.tahun === 2026);
    const totalTraffic2026 = records2026.reduce((acc, curr) => acc + curr.traffic, 0);
    const records2025 = db.kunjunganWebsiteInvest.records.filter((item) => item.tahun === 2025);
    const totalTraffic2025 = records2025.reduce((acc, curr) => acc + curr.traffic, 0);
    const yoyGrowth = totalTraffic2025 > 0 ? ((totalTraffic2026 - totalTraffic2025) / totalTraffic2025) * 100 : 0;
    return {
      totalTraffic2026: totalTraffic2026.toLocaleString('id-ID'),
      yoyStr: `+${yoyGrowth.toFixed(1)}% YoY (2026)`,
    };
  }, [db.kunjunganWebsiteInvest.records]);

  // --------------------------------------------------------------------------
  // KARTU 5: PENERIMA INSENTIF DAN KEMUDAHAN INVESTASI (STACKED COLUMN)
  // --------------------------------------------------------------------------
  const k5FilteredRecords = useMemo(() => {
    return db.penerimaInsentifInvestasi.records.filter((item) => item.tahun === Number(k5Tahun));
  }, [db.penerimaInsentifInvestasi.records, k5Tahun]);

  const k5Summary = useMemo(() => {
    if (k5FilteredRecords.length === 0) {
      return { totalTerakhir: 0, rincian: '0 Fiskal, 0 Non-Fiskal', tw: 'TW IV' };
    }
    const lastItem = k5FilteredRecords[k5FilteredRecords.length - 1];
    return {
      totalTerakhir: lastItem.totalPenerima,
      rincian: `${lastItem.insentifFiskal} Fiskal, ${lastItem.insentifNonFiskal} Non-Fiskal`,
      tw: `${lastItem.triwulan} ${lastItem.tahun}`,
    };
  }, [k5FilteredRecords]);

  // --------------------------------------------------------------------------
  // KARTU 6: PROYEK INFRASTRUKTUR YANG AKAN DIBANGUN (HORIZONTAL BAR STATUS)
  // --------------------------------------------------------------------------
  const k6FilteredRecords = useMemo(() => {
    return db.proyekInfrastrukturBatam.records
      .filter((item) => {
        if (k6Status === 'Semua Status') return true;
        return item.statusProject === k6Status;
      })
      .sort((a, b) => b.nilaiInvestasiRpT - a.nilaiInvestasiRpT);
  }, [db.proyekInfrastrukturBatam.records, k6Status]);

  const k6Summary = useMemo(() => {
    const totalRpT = k6FilteredRecords.reduce((acc, curr) => acc + curr.nilaiInvestasiRpT, 0);
    const count = k6FilteredRecords.length;
    return {
      totalRpT: `Rp ${totalRpT.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`,
      countStr: `${count} Proyek Strategis`,
    };
  }, [k6FilteredRecords]);

  // Status Project Color Mapper
  const getProjectStatusColor = (status: 'Rencana' | 'Berjalan' | 'Selesai') => {
    switch (status) {
      case 'Rencana':
        return '#2563eb'; // Biru = rencana
      case 'Berjalan':
        return '#16a34a'; // Hijau = berjalan
      case 'Selesai':
        return '#64748b'; // Abu-abu = selesai
      default:
        return '#2563eb';
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-900">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM x 3 BARIS (TOTAL 6 KARTU GRAFIK BERUKURAN SAMA)         */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 1, KARTU 1: TENTATIF KEGIATAN PROMOSI PER KATEGORI          */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Ringkasan Besar Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Tentatif Kegiatan Promosi per Kategori
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Jumlah Kegiatan Terjadwal</span>
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    Diurutkan dari Terbanyak
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                    {k1Summary.total}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Kegiatan
                  </span>
                </div>
                <span className="text-[10px] text-[#2563eb] block font-medium">
                  {k1Summary.labelKanan} ({k1Summary.keteranganBiru})
                </span>
              </div>
            </div>

            {/* Sub-Header Toolbar: Filter Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter Periode:</span>
              </div>
              <div className="flex items-center gap-1">
                {['2026', '2025', 'Semua'].map((thn) => (
                  <button
                    key={thn}
                    type="button"
                    onClick={() => setK1Tahun(thn)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k1Tahun === thn
                        ? 'bg-[#2563eb] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {thn}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Bar Chart (Sorted Descending) */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={k1CategoryData}
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kategori"
                    tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    width={175}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const row = payload[0].payload as { kategori: string; jumlah: number; totalTamu: number; items: TentatifPromosiItem[] };
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-[11px] max-w-xs space-y-1.5 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1">
                              {row.kategori}
                            </div>
                            <div className="flex justify-between items-center text-slate-300 font-mono">
                              <span>Total Kegiatan:</span>
                              <span className="font-bold text-white">{row.jumlah} Kegiatan</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300 font-mono">
                              <span>Estimasi Tamu/Investor:</span>
                              <span className="font-bold text-emerald-400">{row.totalTamu} Orang</span>
                            </div>
                            <div className="pt-1 border-t border-slate-700/80 text-[10px] text-slate-300">
                              <span className="text-slate-400 block mb-0.5">Contoh Agenda Terjadwal:</span>
                              {row.items.slice(0, 2).map((item, i) => (
                                <div key={i} className="truncate">
                                  &bull; <span className="font-medium text-white">{item.namaKegiatan}</span> ({item.tanggalPelaksanaan})
                                </div>
                              ))}
                              {row.items.length > 2 && (
                                <span className="text-[9.5px] text-sky-400 italic block mt-0.5">
                                  +{row.items.length - 2} kegiatan lainnya
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="jumlah"
                    name="Jumlah Kegiatan"
                    fill="#2563eb"
                    radius={[0, 4, 4, 0]}
                    barSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Dataset: {db.tentatifKegiatanPromosi.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.tentatifKegiatanPromosi.metadata.sifatData} &bull; {db.tentatifKegiatanPromosi.metadata.periodeUpdate}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 1, KARTU 2: KEGIATAN FASILITASI DAN PENDAMPINGAN INVESTASI   */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Ringkasan Besar Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Kegiatan Fasilitasi dan Pendampingan Investasi
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Izin Berusaha</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#0d9488]" />
                    <span>Lokasi &amp; Lahan</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                    <span>Mediasi Regulasi</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                    <span>Insentif &amp; OSS</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                    {k2Summary.totalKegiatan}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Kegiatan
                  </span>
                </div>
                <span className="text-[10px] text-[#2563eb] block font-medium">
                  {k2Summary.totalTamu} Tamu Difasilitasi (Thn {k2Tahun})
                </span>
              </div>
            </div>

            {/* Sub-Header Toolbar: Filter Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter Tahun Pelaksanaan:</span>
              </div>
              <div className="flex items-center gap-1">
                {['2026', '2025'].map((thn) => (
                  <button
                    key={thn}
                    type="button"
                    onClick={() => setK2Tahun(thn)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k2Tahun === thn
                        ? 'bg-[#2563eb] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {thn}
                  </button>
                ))}
              </div>
            </div>

            {/* Clustered Column Chart per Bulan */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={k2FilteredRecords}
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
                    cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as FasilitasiBulananItem;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-[11px] max-w-xs space-y-1 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1 flex justify-between">
                              <span>Bulan {label} {data.tahun}</span>
                              <span className="text-white font-mono">{data.totalKegiatan} Kegiatan</span>
                            </div>
                            <div className="space-y-0.5 text-slate-300 pt-0.5">
                              <div className="flex justify-between font-mono">
                                <span className="text-blue-300">&bull; Izin Berusaha:</span>
                                <span>{data.pendampinganIzin}</span>
                              </div>
                              <div className="flex justify-between font-mono">
                                <span className="text-teal-300">&bull; Fasilitasi Lahan:</span>
                                <span>{data.fasilitasiLahan}</span>
                              </div>
                              <div className="flex justify-between font-mono">
                                <span className="text-amber-300">&bull; Mediasi Regulasi:</span>
                                <span>{data.mediasiRegulasi}</span>
                              </div>
                              <div className="flex justify-between font-mono">
                                <span className="text-slate-300">&bull; Konsultasi Insentif:</span>
                                <span>{data.konsultasiInsentif}</span>
                              </div>
                              <div className="flex justify-between font-mono pt-1 border-t border-slate-800 text-emerald-400 font-bold">
                                <span>Total Tamu/Audien:</span>
                                <span>{data.totalTamu} Orang</span>
                              </div>
                            </div>
                            <div className="pt-1 border-t border-slate-800 text-[9.5px] text-slate-300">
                              <span className="text-slate-400 font-bold block">Kegiatan Utama:</span>
                              <span className="text-slate-200">{data.highlightKegiatan}</span>
                              <span className="text-slate-400 block mt-0.5 font-medium">
                                Penyelenggara: {data.penyelenggaraUtama}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="pendampinganIzin" name="Izin Berusaha" fill="#2563eb" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="fasilitasiLahan" name="Lokasi & Lahan" fill="#0d9488" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="mediasiRegulasi" name="Mediasi Regulasi" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="konsultasiInsentif" name="Insentif & OSS" fill="#64748b" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Dataset: {db.fasilitasiPendampingan.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.fasilitasiPendampingan.metadata.sifatData} &bull; {db.fasilitasiPendampingan.metadata.periodeUpdate}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 2, KARTU 3: KUNJUNGAN PEMINAT INVESTOR (COLUMN + PREV LINE) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Ringkasan Besar Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Kunjungan Peminat Investor
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Kunjungan Tahun Ini</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#94a3b8] rounded-full inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#64748b] inline-block -ml-2" />
                    <span>Pembanding Tahun Lalu</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                    {k3Summary.totalBerjalan}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Kunjungan
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 text-[10px] font-bold">
                  {k3Summary.isPositive ? (
                    <span className="text-emerald-600 flex items-center">
                      <ArrowUpRight className="w-3 h-3 inline" />
                      {k3Summary.deltaStr}
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center">
                      <ArrowDownRight className="w-3 h-3 inline" />
                      {k3Summary.deltaStr}
                    </span>
                  )}
                  <span className="text-slate-400 font-normal">
                    (Thn {k3Tahun})
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Header Toolbar: Filter Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter Tahun Kunjungan:</span>
              </div>
              <div className="flex items-center gap-1">
                {['2026', '2025'].map((thn) => (
                  <button
                    key={thn}
                    type="button"
                    onClick={() => setK3Tahun(thn)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k3Tahun === thn
                        ? 'bg-[#2563eb] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {thn}
                  </button>
                ))}
              </div>
            </div>

            {/* Composed Chart: Bar Tahun Berjalan + Line Pembanding Tahun Lalu */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={k3FilteredRecords}
                  margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="triwulan"
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
                        const data = payload[0].payload as KunjunganInvestorItem;
                        const delta = data.jumlahKunjungan - data.jumlahKunjunganTahunLalu;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-[11px] max-w-xs space-y-1.5 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1 flex justify-between">
                              <span>{label} {data.tahun}</span>
                              <span className="text-white font-mono">{data.jumlahKunjungan} Kunjungan</span>
                            </div>
                            <div className="space-y-0.5 text-slate-300 font-mono text-[10.5px]">
                              <div className="flex justify-between">
                                <span>&bull; Tahun {data.tahun}:</span>
                                <span className="font-bold text-sky-400">{data.jumlahKunjungan} Delegasi</span>
                              </div>
                              <div className="flex justify-between">
                                <span>&bull; Tahun {data.tahun - 1}:</span>
                                <span className="text-slate-400">{data.jumlahKunjunganTahunLalu} Delegasi</span>
                              </div>
                              <div className="flex justify-between border-t border-slate-800 pt-0.5">
                                <span>Pertumbuhan:</span>
                                <span className={delta >= 0 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                                  {delta >= 0 ? `+${delta}` : delta} kunjungan ({((delta / data.jumlahKunjunganTahunLalu) * 100).toFixed(1)}%)
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-400 text-[10px]">
                                <span>Komposisi:</span>
                                <span>{data.kunjunganPMA} PMA / {data.kunjunganPMDN} PMDN</span>
                              </div>
                            </div>
                            <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-300 space-y-0.5">
                              <div>
                                <span className="text-slate-400">Negara Terbanyak: </span>
                                <span className="text-slate-200">{data.negaraAsalTerbanyak}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Sektor Dominan: </span>
                                <span className="text-slate-200">{data.sektorDominan}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="jumlahKunjungan"
                    name="Kunjungan Tahun Ini"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                  />
                  <Line
                    type="monotone"
                    dataKey="jumlahKunjunganTahunLalu"
                    name="Pembanding Tahun Lalu"
                    stroke="#64748b"
                    strokeWidth={2.5}
                    strokeDasharray="4 4"
                    dot={{ r: 4, fill: '#64748b' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Dataset: {db.kunjunganPeminatInvestor.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {db.kunjunganPeminatInvestor.metadata.sifatData} &bull; {db.kunjunganPeminatInvestor.metadata.periodeUpdate}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 2, KARTU 4: KUNJUNGAN WEBSITE INVEST IN BATAM (AREA CHART)   */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Ringkasan Besar Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Kunjungan Website Invest in Batam
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Total Traffic Web per Triwulan</span>
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    investinbatam.bpbatam.go.id
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                    {k4Summary.totalTraffic2026}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Hits
                  </span>
                </div>
                <span className="text-[10px] text-[#2563eb] block font-medium">
                  {k4Summary.yoyStr}
                </span>
              </div>
            </div>

            {/* Sub-Header Toolbar: Filter Rentang Multi-Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Rentang Triwulan:</span>
              </div>
              <div className="flex items-center gap-1">
                {['Semua (2024-2026)', '2025-2026', '2026 Saja'].map((rng) => (
                  <button
                    key={rng}
                    type="button"
                    onClick={() => setK4Range(rng)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k4Range === rng
                        ? 'bg-[#2563eb] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rng}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Chart: Line dengan Area Gradien Halus */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={k4FilteredRecords}
                  margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorInvestTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="periode"
                    tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 500 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9.5, fill: '#64748b', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as TrafficWebsiteItem;
                        const isUp = data.deltaPersen >= 0;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-[11px] max-w-xs space-y-1.5 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1 flex justify-between">
                              <span>Periode {label}</span>
                              <span className="text-white font-mono">
                                {data.traffic.toLocaleString('id-ID')} Hits
                              </span>
                            </div>
                            <div className="space-y-0.5 text-slate-300 font-mono text-[10.5px]">
                              <div className="flex justify-between items-center">
                                <span>Perubahan QoQ:</span>
                                <span
                                  className={`font-bold flex items-center gap-0.5 ${
                                    isUp ? 'text-emerald-400' : 'text-amber-400'
                                  }`}
                                >
                                  {isUp ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                  ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                  )}
                                  {isUp ? '+' : ''}
                                  {data.deltaPersen.toFixed(1)}% vs TW sebelumnya
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Pengunjung Unik:</span>
                                <span className="text-slate-200">
                                  {data.pengunjungUnik.toLocaleString('id-ID')} Users
                                </span>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                                <span>Trafik Lalu:</span>
                                <span>{data.trafficSebelumnya.toLocaleString('id-ID')} Hits</span>
                              </div>
                            </div>
                            <div className="pt-1 border-t border-slate-800 text-[9.5px] text-slate-300">
                              <span className="text-slate-400 block font-bold">Asal Negara Terbanyak:</span>
                              <span className="text-slate-200">{data.topAsalNegara}</span>
                              <span className="text-slate-400 block mt-1 font-bold">Laman Paling Banyak Diakses:</span>
                              <span className="text-sky-300 font-mono text-[9px]">{data.halamanTerpopuler}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="traffic"
                    name="Trafik Website"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#colorInvestTraffic)"
                    dot={{ r: 3, fill: '#2563eb' }}
                    activeDot={{ r: 5, fill: '#1d4ed8' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Dataset: {db.kunjunganWebsiteInvest.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.kunjunganWebsiteInvest.metadata.sifatData} &bull; {db.kunjunganWebsiteInvest.metadata.periodeUpdate}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 3, KARTU 5: PENERIMA INSENTIF DAN KEMUDAHAN INVESTASI        */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Ringkasan Besar Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Penerima Insentif dan Kemudahan Investasi
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Insentif Fiskal (Tax Holiday, Masterlist)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                    <span>Non-Fiskal (Izin Cepat, Utilitas)</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                    {k5Summary.totalTerakhir}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Perusahaan
                  </span>
                </div>
                <span className="text-[10px] text-[#2563eb] block font-medium">
                  {k5Summary.tw} ({k5Summary.rincian})
                </span>
              </div>
            </div>

            {/* Sub-Header Toolbar: Filter Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter Tahun Penerimaan:</span>
              </div>
              <div className="flex items-center gap-1">
                {['2026', '2025'].map((thn) => (
                  <button
                    key={thn}
                    type="button"
                    onClick={() => setK5Tahun(thn)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k5Tahun === thn
                        ? 'bg-[#2563eb] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {thn}
                  </button>
                ))}
              </div>
            </div>

            {/* Stacked Column Chart per Triwulan */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={k5FilteredRecords}
                  margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="triwulan"
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
                        const data = payload[0].payload as PenerimaInsentifItem;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-[11px] max-w-xs space-y-1.5 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1 flex justify-between">
                              <span>{label} {data.tahun}</span>
                              <span className="text-white font-mono">{data.totalPenerima} Perusahaan</span>
                            </div>
                            <div className="space-y-0.5 text-slate-300 font-mono text-[10.5px]">
                              <div className="flex justify-between">
                                <span className="text-blue-300">&bull; Fasilitas Fiskal:</span>
                                <span className="font-bold text-white">{data.insentifFiskal} Perusahaan</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">&bull; Kemudahan Non-Fiskal:</span>
                                <span className="font-bold text-white">{data.insentifNonFiskal} Perusahaan</span>
                              </div>
                              <div className="text-[10px] text-emerald-400 pt-0.5">
                                Fokus: {data.jenisFasilitasDominan}
                              </div>
                            </div>
                            <div className="pt-1 border-t border-slate-800 text-[9.5px] text-slate-300 space-y-1">
                              <div>
                                <span className="text-slate-400 font-bold block">Contoh Penerima Fiskal:</span>
                                {data.contohPerusahaanFiskal.slice(0, 2).map((item, i) => (
                                  <div key={i} className="truncate text-slate-200">&bull; {item}</div>
                                ))}
                              </div>
                              <div>
                                <span className="text-slate-400 font-bold block">Contoh Penerima Non-Fiskal:</span>
                                {data.contohPerusahaanNonFiskal.slice(0, 2).map((item, i) => (
                                  <div key={i} className="truncate text-slate-200">&bull; {item}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="insentifFiskal"
                    name="Insentif Fiskal"
                    stackId="a"
                    fill="#2563eb"
                    radius={[0, 0, 0, 0]}
                    barSize={32}
                  />
                  <Bar
                    dataKey="insentifNonFiskal"
                    name="Kemudahan Non-Fiskal"
                    stackId="a"
                    fill="#64748b"
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Dataset: {db.penerimaInsentifInvestasi.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.penerimaInsentifInvestasi.metadata.sifatData} &bull; {db.penerimaInsentifInvestasi.metadata.periodeUpdate}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 3, KARTU 6: PROYEK INFRASTRUKTUR YANG AKAN DIBANGUN          */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Ringkasan Besar Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Proyek Infrastruktur yang Akan Dibangun di Batam
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Rencana</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a]" />
                    <span>Berjalan</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                    <span>Selesai</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
                    {k6Summary.totalRpT}
                  </span>
                </div>
                <span className="text-[10px] text-[#2563eb] block font-medium">
                  {k6Summary.countStr}
                </span>
              </div>
            </div>

            {/* Sub-Header Toolbar: Filter Status Project */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter Status Proyek:</span>
              </div>
              <div className="flex items-center gap-1">
                {['Semua Status', 'Rencana', 'Berjalan', 'Selesai'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setK6Status(st)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k6Status === st
                        ? 'bg-[#2563eb] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Bar Chart per Proyek dengan Warna Sesuai Status */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={k6FilteredRecords}
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `Rp ${v}T`}
                  />
                  <YAxis
                    type="category"
                    dataKey="namaSingkat"
                    tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    width={175}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as ProyekInfrastrukturItem;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg border border-slate-800 text-[11px] max-w-xs space-y-1.5 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1">
                              {data.namaProject}
                            </div>
                            <div className="flex justify-between items-center text-slate-300 font-mono">
                              <span>Nilai Investasi:</span>
                              <span className="font-bold text-emerald-400">
                                Rp {data.nilaiInvestasiRpT.toFixed(2)} Triliun
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-300 font-mono">
                              <span>Status Proyek:</span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                  data.statusProject === 'Berjalan'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                    : data.statusProject === 'Rencana'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-700'
                                    : 'bg-slate-800 text-slate-300 border border-slate-600'
                                }`}
                              >
                                {data.statusProject}
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                              <div>
                                <span className="text-slate-400">Lokasi: </span>
                                <span>{data.lokasi}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Luas: </span>
                                <span>{data.luas}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Pemilik Proyek: </span>
                                <span className="text-slate-200">{data.pemilikProject}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Kapasitas: </span>
                                <span className="text-slate-200">{data.kapasitas}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Jadwal Pelaksanaan: </span>
                                <span className="font-mono text-sky-300">{data.jadwal}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="nilaiInvestasiRpT"
                    name="Nilai Investasi (Rp T)"
                    radius={[0, 4, 4, 0]}
                    barSize={14}
                  >
                    {k6FilteredRecords.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getProjectStatusColor(entry.statusProject)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Dataset: {db.proyekInfrastrukturBatam.metadata.namaDataset}</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.proyekInfrastrukturBatam.metadata.sifatData} &bull; {db.proyekInfrastrukturBatam.metadata.periodeUpdate}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
