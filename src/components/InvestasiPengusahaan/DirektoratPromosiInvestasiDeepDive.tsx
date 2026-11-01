import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  Briefcase,
  Users,
  Globe,
  Award,
  Building2,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Maximize2,
  UserCheck,
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
  // FILTER STATES TIAP KARTU
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
  // KARTU 1: TENTATIF KEGIATAN PROMOSI PER KATEGORI (HORIZONTAL BAR, SORTED)
  // --------------------------------------------------------------------------
  const k1FilteredRecords = useMemo(() => {
    return db.tentatifKegiatanPromosi.records.filter((item) => {
      if (k1Tahun === 'Semua') return true;
      return item.tahun === Number(k1Tahun);
    });
  }, [db.tentatifKegiatanPromosi.records, k1Tahun]);

  const k1CategoryData = useMemo(() => {
    const map = new Map<
      string,
      {
        kategori: string;
        jumlah: number;
        totalTamu: number;
        terjadwal: number;
        items: TentatifPromosiItem[];
      }
    >();

    k1FilteredRecords.forEach((item) => {
      const existing = map.get(item.kategori) || {
        kategori: item.kategori,
        jumlah: 0,
        totalTamu: 0,
        terjadwal: 0,
        items: [],
      };
      existing.jumlah += 1;
      existing.totalTamu += item.jumlahTamu;
      if (item.statusKegiatan === 'Terjadwal' || item.statusKegiatan === 'Persiapan') {
        existing.terjadwal += 1;
      }
      existing.items.push(item);
      map.set(item.kategori, existing);
    });

    return Array.from(map.values()).sort((a, b) => b.jumlah - a.jumlah);
  }, [k1FilteredRecords]);

  // Angka Ringkasan Kartu 1: Total kegiatan promosi terjadwal
  const k1Summary = useMemo(() => {
    const terjadwal = k1FilteredRecords.filter(
      (r) => r.statusKegiatan === 'Terjadwal' || r.statusKegiatan === 'Persiapan'
    ).length;
    const totalSemua = k1FilteredRecords.length;
    return {
      totalTerjadwal: terjadwal,
      keteranganBiru: `Kegiatan Terjadwal (TA ${k1Tahun})`,
      totalSemua,
    };
  }, [k1FilteredRecords, k1Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 2: KEGIATAN FASILITASI DAN PENDAMPINGAN INVESTASI (CLUSTERED COLUMN)
  // --------------------------------------------------------------------------
  const k2FilteredRecords = useMemo(() => {
    return db.fasilitasiPendampingan.records.filter(
      (item) => item.tahun === Number(k2Tahun)
    );
  }, [db.fasilitasiPendampingan.records, k2Tahun]);

  // Angka Ringkasan Kartu 2: Total kegiatan dan total tamu yang difasilitasi
  const k2Summary = useMemo(() => {
    const totalKegiatan = k2FilteredRecords.reduce(
      (acc, curr) => acc + curr.totalKegiatan,
      0
    );
    const totalTamu = k2FilteredRecords.reduce(
      (acc, curr) => acc + curr.totalTamu,
      0
    );
    return {
      totalKegiatan,
      keteranganBiru: `Kegiatan • ${totalTamu.toLocaleString('id-ID')} Tamu Difasilitasi (TA ${k2Tahun})`,
    };
  }, [k2FilteredRecords, k2Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 3: KUNJUNGAN PEMINAT INVESTOR (COLUMN + GARIS PEMBANDING TAHUN LALU)
  // --------------------------------------------------------------------------
  const k3FilteredRecords = useMemo(() => {
    return db.kunjunganPeminatInvestor.records.filter(
      (item) => item.tahun === Number(k3Tahun)
    );
  }, [db.kunjunganPeminatInvestor.records, k3Tahun]);

  // Angka Ringkasan Kartu 3: Total kunjungan tahun berjalan beserta selisih dibanding tahun lalu
  const k3Summary = useMemo(() => {
    const totalBerjalan = k3FilteredRecords.reduce(
      (acc, curr) => acc + curr.jumlahKunjungan,
      0
    );
    const totalTahunLalu = k3FilteredRecords.reduce(
      (acc, curr) => acc + curr.jumlahKunjunganTahunLalu,
      0
    );
    const deltaCount = totalBerjalan - totalTahunLalu;
    const deltaPercent =
      totalTahunLalu > 0
        ? ((totalBerjalan - totalTahunLalu) / totalTahunLalu) * 100
        : 0;
    const isPositive = deltaCount >= 0;

    return {
      totalBerjalan,
      deltaCount,
      deltaPercent: deltaPercent.toFixed(1),
      isPositive,
      keteranganBiru: `Kunjungan (${isPositive ? '+' : ''}${deltaPercent.toFixed(1)}% vs Thn Lalu / ${isPositive ? '+' : ''}${deltaCount} Delegasi)`,
    };
  }, [k3FilteredRecords, k3Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 4: KUNJUNGAN WEBSITE INVEST IN BATAM (LINE CHART DENGAN AREA TIPIS)
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

  // Angka Ringkasan Kartu 4: Total traffic tahun berjalan (2026)
  const k4Summary = useMemo(() => {
    const records2026 = db.kunjunganWebsiteInvest.records.filter(
      (item) => item.tahun === 2026
    );
    const totalTraffic2026 = records2026.reduce(
      (acc, curr) => acc + curr.traffic,
      0
    );
    const records2025 = db.kunjunganWebsiteInvest.records.filter(
      (item) => item.tahun === 2025
    );
    const totalTraffic2025 = records2025.reduce(
      (acc, curr) => acc + curr.traffic,
      0
    );
    const yoyGrowth =
      totalTraffic2025 > 0
        ? ((totalTraffic2026 - totalTraffic2025) / totalTraffic2025) * 100
        : 0;

    return {
      totalTraffic2026: totalTraffic2026.toLocaleString('id-ID'),
      keteranganBiru: `Hits Traffic (Tahun Berjalan 2026 • +${yoyGrowth.toFixed(1)}% YoY)`,
    };
  }, [db.kunjunganWebsiteInvest.records]);

  // --------------------------------------------------------------------------
  // KARTU 5: PENERIMA INSENTIF DAN KEMUDAHAN INVESTASI (STACKED COLUMN)
  // --------------------------------------------------------------------------
  const k5FilteredRecords = useMemo(() => {
    return db.penerimaInsentifInvestasi.records.filter(
      (item) => item.tahun === Number(k5Tahun)
    );
  }, [db.penerimaInsentifInvestasi.records, k5Tahun]);

  // Angka Ringkasan Kartu 5: Jumlah perusahaan penerima insentif triwulan terakhir
  const k5Summary = useMemo(() => {
    if (k5FilteredRecords.length === 0) {
      return {
        totalTerakhir: 0,
        tw: 'TW IV',
        keteranganBiru: '0 Perusahaan',
      };
    }
    const lastItem = k5FilteredRecords[k5FilteredRecords.length - 1];
    return {
      totalTerakhir: lastItem.totalPenerima,
      tw: `${lastItem.triwulan} ${lastItem.tahun}`,
      insentifFiskal: lastItem.insentifFiskal,
      insentifNonFiskal: lastItem.insentifNonFiskal,
      keteranganBiru: `Perusahaan Penerima (${lastItem.triwulan} ${lastItem.tahun}: ${lastItem.insentifFiskal} Fiskal, ${lastItem.insentifNonFiskal} Non-Fiskal)`,
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

  // Angka Ringkasan Kartu 6: Total nilai investasi proyek (Rp)
  const k6Summary = useMemo(() => {
    const totalRpT = k6FilteredRecords.reduce(
      (acc, curr) => acc + curr.nilaiInvestasiRpT,
      0
    );
    const count = k6FilteredRecords.length;
    return {
      totalRpT: `Rp ${totalRpT.toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} T`,
      keteranganBiru: `${count} Proyek Strategis`,
    };
  }, [k6FilteredRecords]);

  // Warna Batang Kartu 6 Sesuai Status Project:
  // biru (#2563eb) = rencana, hijau (#16a34a) = berjalan, abu-abu (#64748b) = selesai
  const getProjectStatusColor = (status: 'Rencana' | 'Berjalan' | 'Selesai') => {
    switch (status) {
      case 'Rencana':
        return '#2563eb';
      case 'Berjalan':
        return '#16a34a';
      case 'Selesai':
        return '#64748b';
      default:
        return '#2563eb';
    }
  };

  return (
    <div className="w-full font-sans text-slate-900">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM x 3 BARIS (TOTAL 6 KARTU GRAFIK BERUKURAN SAMA)         */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 1, KARTU 1: TENTATIF KEGIATAN PROMOSI PER KATEGORI          */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Tentatif Kegiatan Promosi per Kategori
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Jumlah Kegiatan Terjadwal</span>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    Diurutkan dari Terbanyak
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k1Summary.totalTerjadwal}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Kegiatan
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k1Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs">
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

            {/* Bar Horizontal, Urut dari Terbanyak */}
            <div className="h-64 w-full">
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
                        const row = payload[0].payload as {
                          kategori: string;
                          jumlah: number;
                          totalTamu: number;
                          terjadwal: number;
                          items: TentatifPromosiItem[];
                        };
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex items-center justify-between">
                              <span className="truncate pr-2">{row.kategori}</span>
                              <span className="font-mono text-white shrink-0 bg-blue-900/60 px-1.5 py-0.5 rounded text-[10px] border border-blue-700">
                                {row.jumlah} Kegiatan
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[10px] bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/50">
                              <div>
                                <span className="text-slate-400 block">Status Terjadwal:</span>
                                <span className="font-bold text-emerald-400">{row.terjadwal} Agenda</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Estimasi Tamu:</span>
                                <span className="font-bold text-sky-400">{row.totalTamu.toLocaleString('id-ID')} Orang</span>
                              </div>
                            </div>

                            <div className="space-y-1.5 pt-1 border-t border-slate-700/80 text-[10.5px]">
                              <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
                                Rincian Agenda Kegiatan Terjadwal:
                              </span>
                              {row.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-1.5 rounded bg-slate-800/80 border border-slate-700/60 space-y-0.5"
                                >
                                  <div className="font-bold text-white flex items-start gap-1">
                                    <span className="text-[#2563eb]">&bull;</span>
                                    <span>{item.namaKegiatan}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-300 pl-2">
                                    <span className="text-slate-400">Penyelenggara: </span>
                                    <span className="text-sky-200">{item.namaPenyelenggara}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 pl-2 font-mono">
                                    <span>Tanggal: <span className="text-white">{item.tanggalPelaksanaan}</span></span>
                                    <span className="text-emerald-300 font-bold">{item.jumlahTamu} Tamu</span>
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
                    dataKey="jumlah"
                    name="Jumlah Kegiatan"
                    fill="#2563eb"
                    radius={[0, 4, 4, 0]}
                    barSize={16}
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
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Kegiatan Fasilitasi dan Pendampingan Investasi
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Izin Berusaha &amp; OSS</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                    <span>Lokasi &amp; Lahan</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                    <span>Mediasi Regulasi</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                    <span>Insentif &amp; Perpajakan</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k2Summary.totalKegiatan}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Kegiatan
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k2Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs">
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

            {/* Clustered Column per Bulan */}
            <div className="h-64 w-full">
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
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as FasilitasiBulananItem;
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex items-center justify-between">
                              <span>Bulan {label} {data.tahun}</span>
                              <span className="font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-700 px-1.5 py-0.5 rounded text-[10px]">
                                {data.totalKegiatan} Kegiatan &bull; {data.totalTamu} Tamu
                              </span>
                            </div>

                            {/* Nama Kegiatan dan Penyelenggara sesuai instruksi prompt */}
                            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 space-y-1">
                              <div>
                                <span className="text-slate-400 font-semibold block text-[10px]">Nama Kegiatan:</span>
                                <span className="font-bold text-white text-[11px] leading-snug">
                                  {data.highlightKegiatan}
                                </span>
                              </div>
                              <div className="pt-1 border-t border-slate-700/50">
                                <span className="text-slate-400 font-semibold block text-[10px]">Penyelenggara:</span>
                                <span className="text-sky-300 font-medium text-[10.5px]">
                                  {data.penyelenggaraUtama}
                                </span>
                              </div>
                            </div>

                            {/* Rincian Jumlah Kegiatan per Kategori */}
                            <div className="space-y-1 text-slate-300 font-mono text-[10px] pt-1">
                              <span className="text-slate-400 font-sans block text-[10px] uppercase font-semibold">
                                Distribusi per Kategori Kegiatan:
                              </span>
                              <div className="flex justify-between items-center text-blue-300">
                                <span>&bull; Izin Berusaha &amp; OSS:</span>
                                <span className="font-bold">{data.pendampinganIzin} Kegiatan</span>
                              </div>
                              <div className="flex justify-between items-center text-sky-300">
                                <span>&bull; Lokasi &amp; Lahan Industri:</span>
                                <span className="font-bold">{data.fasilitasiLahan} Kegiatan</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-300">
                                <span>&bull; Mediasi Regulasi:</span>
                                <span className="font-bold">{data.mediasiRegulasi} Kegiatan</span>
                              </div>
                              <div className="flex justify-between items-center text-emerald-300">
                                <span>&bull; Insentif &amp; Perpajakan:</span>
                                <span className="font-bold">{data.konsultasiInsentif} Kegiatan</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="pendampinganIzin" name="Izin Berusaha" fill="#2563eb" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="fasilitasiLahan" name="Lokasi & Lahan" fill="#0284c7" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="mediasiRegulasi" name="Mediasi Regulasi" fill="#64748b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="konsultasiInsentif" name="Insentif & Pajak" fill="#10b981" radius={[2, 2, 0, 0]} />
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
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Kunjungan Peminat Investor
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Kunjungan Tahun Ini</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-3.5 h-0.5 bg-[#64748b] rounded-full inline-block" />
                    <span>Pembanding Tahun Sebelumnya</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k3Summary.totalBerjalan}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Kunjungan
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1 text-[11px] font-semibold mt-0.5">
                  {k3Summary.isPositive ? (
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5 inline" />
                      +{k3Summary.deltaPercent}% vs Thn Lalu
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-0.5">
                      <ArrowDownRight className="w-3.5 h-3.5 inline" />
                      {k3Summary.deltaPercent}% vs Thn Lalu
                    </span>
                  )}
                  <span className="text-[#2563eb] font-semibold">
                    (TA {k3Tahun})
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Toolbar: Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs">
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
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k3Tahun === thn
                        ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {thn}
                  </button>
                ))}
              </div>
            </div>

            {/* Composed Chart: Column Bar + Line Pembanding Tahun Lalu */}
            <div className="h-64 w-full">
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
                        const growthPct = ((delta / data.jumlahKunjunganTahunLalu) * 100).toFixed(1);
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex justify-between items-center">
                              <span>{label} Tahun {data.tahun}</span>
                              <span className="text-white font-mono bg-blue-900/70 border border-blue-700 px-1.5 py-0.5 rounded text-[10px]">
                                {data.jumlahKunjungan} Kunjungan
                              </span>
                            </div>
                            <div className="space-y-1 text-slate-300 font-mono text-[10.5px]">
                              <div className="flex justify-between">
                                <span>&bull; Realisasi Tahun Ini ({data.tahun}):</span>
                                <span className="font-bold text-sky-400">{data.jumlahKunjungan} Delegasi</span>
                              </div>
                              <div className="flex justify-between">
                                <span>&bull; Tahun Sebelumnya ({data.tahun - 1}):</span>
                                <span className="text-slate-400">{data.jumlahKunjunganTahunLalu} Delegasi</span>
                              </div>
                              <div className="flex justify-between border-t border-slate-800 pt-1">
                                <span>Pertumbuhan Tahunan:</span>
                                <span
                                  className={`font-bold flex items-center gap-0.5 ${
                                    delta >= 0 ? 'text-emerald-400' : 'text-amber-400'
                                  }`}
                                >
                                  {delta >= 0 ? `+${delta}` : delta} kunjungan ({delta >= 0 ? `+${growthPct}` : growthPct}%)
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-400 text-[10px]">
                                <span>Komposisi Asal:</span>
                                <span>{data.kunjunganPMA} PMA / {data.kunjunganPMDN} PMDN</span>
                              </div>
                            </div>
                            <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-300 space-y-0.5">
                              <div>
                                <span className="text-slate-400">Negara Terbanyak: </span>
                                <span className="text-slate-200 font-medium">{data.negaraAsalTerbanyak}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Sektor Dominan: </span>
                                <span className="text-slate-200 font-medium">{data.sektorDominan}</span>
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
                    name="Pembanding Tahun Sebelumnya"
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
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {db.kunjunganPeminatInvestor.metadata.sifatData} &bull; {db.kunjunganPeminatInvestor.metadata.periodeUpdate}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BARIS 2, KARTU 4: KUNJUNGAN WEBSITE INVEST IN BATAM (LINE + AREA)   */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Kunjungan Website Invest in Batam
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Traffic Web per Triwulan</span>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    investinbatam.bpbatam.go.id
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k4Summary.totalTraffic2026}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Hits
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k4Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Rentang Triwulan Multi-Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs">
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
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k4Range === rng
                        ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rng}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Chart dengan Area Tipis */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={k4FilteredRecords}
                  margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorInvestTrafficRefined" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
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
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex justify-between items-center">
                              <span>Periode {label}</span>
                              <span className="text-white font-mono bg-blue-900/70 border border-blue-700 px-1.5 py-0.5 rounded text-[10px]">
                                {data.traffic.toLocaleString('id-ID')} Hits
                              </span>
                            </div>

                            {/* Indikator Tooltip Perubahan Triwulan Sebelumnya (Hijau jika naik, oranye jika turun) */}
                            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                              <span className="text-[10px] text-slate-400 block mb-0.5">
                                Perubahan dari Triwulan Sebelumnya:
                              </span>
                              <div
                                className={`inline-flex items-center gap-1 font-bold font-mono text-[11px] px-2 py-0.5 rounded border ${
                                  isUp
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                                    : 'bg-amber-950/80 text-amber-300 border-amber-700'
                                }`}
                              >
                                {isUp ? (
                                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <ArrowDownRight className="w-3.5 h-3.5 text-amber-400" />
                                )}
                                <span>
                                  {isUp ? '+' : ''}
                                  {data.deltaPersen.toFixed(1)}% {isUp ? 'Meningkat' : 'Menurun'} vs TW Sebelumnya
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1 text-slate-300 font-mono text-[10.5px]">
                              <div className="flex justify-between">
                                <span>Pengunjung Unik:</span>
                                <span className="font-bold text-white">
                                  {data.pengunjungUnik.toLocaleString('id-ID')} Pengguna
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-400 text-[10px]">
                                <span>Trafik Triwulan Lalu:</span>
                                <span>{data.trafficSebelumnya.toLocaleString('id-ID')} Hits</span>
                              </div>
                            </div>

                            <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-300 space-y-0.5">
                              <div>
                                <span className="text-slate-400">Asal Negara Terbanyak: </span>
                                <span className="text-slate-200">{data.topAsalNegara}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Laman Populer: </span>
                                <span className="text-sky-300 font-mono">{data.halamanTerpopuler}</span>
                              </div>
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
                    fill="url(#colorInvestTrafficRefined)"
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
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Penerima Insentif dan Kemudahan Investasi
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Insentif Fiskal</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                    <span>Kemudahan Non-Fiskal</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k5Summary.totalTerakhir}
                  </span>
                  <span className="text-xs font-bold text-[#2563eb]">
                    Perusahaan
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k5Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Tahun */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs">
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
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k5Tahun === thn
                        ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {thn}
                  </button>
                ))}
              </div>
            </div>

            {/* Stacked Column Chart */}
            <div className="h-64 w-full">
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
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex justify-between items-center">
                              <span>{label} Tahun {data.tahun}</span>
                              <span className="text-white font-mono bg-blue-900/70 border border-blue-700 px-1.5 py-0.5 rounded text-[10px]">
                                Total {data.totalPenerima} Perusahaan
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[10.5px]">
                              <div className="bg-blue-950/60 p-1.5 rounded border border-blue-800/60">
                                <span className="text-blue-300 block text-[10px]">Insentif Fiskal:</span>
                                <span className="font-bold text-white text-xs">{data.insentifFiskal} BU</span>
                              </div>
                              <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700/60">
                                <span className="text-slate-300 block text-[10px]">Kemudahan Non-Fiskal:</span>
                                <span className="font-bold text-white text-xs">{data.insentifNonFiskal} BU</span>
                              </div>
                            </div>

                            <div className="text-[10px] text-emerald-300 bg-emerald-950/50 p-1.5 rounded border border-emerald-800/40">
                              <span className="text-emerald-400 font-semibold block">Fokus Fasilitas:</span>
                              <span>{data.jenisFasilitasDominan}</span>
                            </div>

                            {/* Contoh Nama Perusahaan Penerima sesuai instruksi prompt */}
                            <div className="space-y-1.5 pt-1 border-t border-slate-800 text-[10px]">
                              <div>
                                <span className="text-blue-400 font-bold block mb-0.5">
                                  Contoh Perusahaan Penerima Fiskal:
                                </span>
                                {data.contohPerusahaanFiskal.map((item, i) => (
                                  <div key={i} className="text-slate-200 pl-1">
                                    &bull; {item}
                                  </div>
                                ))}
                              </div>
                              <div className="pt-1 border-t border-slate-800/60">
                                <span className="text-slate-300 font-bold block mb-0.5">
                                  Contoh Perusahaan Penerima Non-Fiskal:
                                </span>
                                {data.contohPerusahaanNonFiskal.map((item, i) => (
                                  <div key={i} className="text-slate-300 pl-1">
                                    &bull; {item}
                                  </div>
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
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-4.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Proyek Infrastruktur yang Akan Dibangun di Batam
                  </h3>
                </div>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Rencana (Biru)</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a]" />
                    <span>Berjalan (Hijau)</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                    <span>Selesai (Abu-abu)</span>
                  </span>
                </div>
              </div>

              {/* Angka Ringkasan Kanan Atas + Keterangan Kecil Biru di Sampingnya */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight leading-none">
                    {k6Summary.totalRpT}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#2563eb] block mt-0.5">
                  {k6Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Toolbar: Status Project */}
            <div className="flex items-center justify-between gap-2 py-1.5 mb-2.5 border-y border-slate-100 text-xs">
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
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      k6Status === st
                        ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Horizontal per Proyek dengan Warna Sesuai Status Project */}
            <div className="h-64 w-full">
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
                    width={180}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as ProyekInfrastrukturItem;
                        return (
                          <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-[11px] max-w-sm space-y-2 z-50">
                            <div className="font-bold text-sky-300 border-b border-slate-700 pb-1.5 flex items-center justify-between">
                              <span className="truncate pr-2">{data.namaProject}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${
                                  data.statusProject === 'Berjalan'
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                    : data.statusProject === 'Rencana'
                                    ? 'bg-blue-950 text-blue-300 border-blue-700'
                                    : 'bg-slate-800 text-slate-300 border-slate-600'
                                }`}
                              >
                                {data.statusProject}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-slate-300 font-mono bg-slate-800/70 p-1.5 rounded border border-slate-700/60">
                              <span>Nilai Investasi:</span>
                              <span className="font-bold text-emerald-400 text-xs">
                                Rp {data.nilaiInvestasiRpT.toFixed(2)} Triliun
                              </span>
                            </div>

                            {/* Tooltip lengkap sesuai prompt: Lokasi, Luas, Pemilik Project, Kapasitas, Jadwal */}
                            <div className="space-y-1 text-[10.5px] text-slate-300 pt-1 border-t border-slate-800">
                              <div className="flex items-start gap-1">
                                <span className="text-slate-400 shrink-0 font-medium">📍 Lokasi:</span>
                                <span className="text-white">{data.lokasi}</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <span className="text-slate-400 shrink-0 font-medium">📐 Luas:</span>
                                <span className="text-white">{data.luas}</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <span className="text-slate-400 shrink-0 font-medium">🏢 Pemilik Project:</span>
                                <span className="text-sky-200">{data.pemilikProject}</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <span className="text-slate-400 shrink-0 font-medium">⚡ Kapasitas:</span>
                                <span className="text-white">{data.kapasitas}</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <span className="text-slate-400 shrink-0 font-medium">⏱️ Jadwal:</span>
                                <span className="font-mono text-emerald-300 font-bold">{data.jadwal}</span>
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
                    barSize={16}
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
