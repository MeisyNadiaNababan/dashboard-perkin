import React, { useState, useMemo } from 'react';
import {
  Plane,
  Users,
  Package,
  TrendingUp,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Building,
  Navigation,
  Globe,
  Share2,
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
  Cell,
} from 'recharts';
import {
  KAWASAN_BANDARA_DATA,
  PenumpangTriwulanItem,
  PergerakanPesawatKeterisianItem,
  PenumpangOperatorItem,
  MuatanBagasiKargoPosItem,
  MuatanEmpuItem,
  RutePenerbanganLangsungItem,
} from './kawasanBandaraData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const BadanPengelolaanKawasanBandaraDeepDive: React.FC = () => {
  const db = KAWASAN_BANDARA_DATA;

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
  // Kartu 1: Filter Tahun & A/D (Arus Datang / Berangkat)
  const [k1Tahun, setK1Tahun] = useState<string>('2026');
  const [k1Arus, setK1Arus] = useState<string>('Semua'); // 'Semua' | 'Datang' | 'Berangkat'

  // Kartu 2: Filter Tahun & Jenis Penerbangan
  const [k2Tahun, setK2Tahun] = useState<string>('2026');
  const [k2Jenis, setK2Jenis] = useState<string>('Semua'); // 'Semua' | 'Domestik' | 'Internasional'

  // Kartu 3: Filter Tahun & Triwulan
  const [k3Tahun, setK3Tahun] = useState<string>('2026');
  const [k3Triwulan, setK3Triwulan] = useState<string>('Semua'); // 'Semua' | 'TW I' | 'TW II' | 'TW III' | 'TW IV'

  // Kartu 4: Filter Tahun & Datang/Berangkat
  const [k4Tahun, setK4Tahun] = useState<string>('2026');
  const [k4Arus, setK4Arus] = useState<string>('Semua'); // 'Semua' | 'Datang' | 'Berangkat'

  // Kartu 5: Filter Tahun & Triwulan
  const [k5Tahun, setK5Tahun] = useState<string>('2026');
  const [k5Triwulan, setK5Triwulan] = useState<string>('Semua'); // 'Semua' | 'TW I' | 'TW II' | 'TW III' | 'TW IV'

  // --------------------------------------------------------------------------
  // KARTU 1: JUMLAH PENUMPANG PER TRIWULAN (STACKED COLUMN)
  // --------------------------------------------------------------------------
  const k1Data = useMemo(() => {
    const list = db.arusPenumpangTriwulan.records.filter((item) => {
      const matchTahun = item.tahun === Number(k1Tahun);
      const matchArus = k1Arus === 'Semua' || item.tipeArus === k1Arus;
      return matchTahun && matchArus;
    });

    const triwulanMap = new Map<
      string,
      {
        triwulan: string;
        tahun: number;
        penumpangDewasa: number;
        penumpangAnak: number;
        penumpangBayi: number;
        totalPenumpang: number;
        transitDewasa: number;
        transitAnak: number;
        transitBayi: number;
        totalTransit: number;
      }
    >();

    ['TW I', 'TW II', 'TW III', 'TW IV'].forEach((tw) => {
      triwulanMap.set(tw, {
        triwulan: tw,
        tahun: Number(k1Tahun),
        penumpangDewasa: 0,
        penumpangAnak: 0,
        penumpangBayi: 0,
        totalPenumpang: 0,
        transitDewasa: 0,
        transitAnak: 0,
        transitBayi: 0,
        totalTransit: 0,
      });
    });

    list.forEach((item) => {
      const existing = triwulanMap.get(item.triwulan);
      if (existing) {
        existing.penumpangDewasa += item.penumpangDewasa;
        existing.penumpangAnak += item.penumpangAnak;
        existing.penumpangBayi += item.penumpangBayi;
        existing.totalPenumpang += item.totalPenumpang;
        existing.transitDewasa += item.transitDewasa;
        existing.transitAnak += item.transitAnak;
        existing.transitBayi += item.transitBayi;
        existing.totalTransit += item.totalTransit;
      }
    });

    return Array.from(triwulanMap.values());
  }, [db.arusPenumpangTriwulan.records, k1Tahun, k1Arus]);

  // Perbandingan dengan Tahun Lalu (YoY)
  const k1Summary = useMemo(() => {
    const totalCurrent = k1Data.reduce((acc, curr) => acc + curr.totalPenumpang, 0);

    // Hitung tahun lalu
    const prevYear = Number(k1Tahun) - 1;
    const prevList = db.arusPenumpangTriwulan.records.filter((item) => {
      const matchTahun = item.tahun === prevYear;
      const matchArus = k1Arus === 'Semua' || item.tipeArus === k1Arus;
      return matchTahun && matchArus;
    });
    const totalPrev = prevList.reduce((acc, curr) => acc + curr.totalPenumpang, 0);

    const diff = totalCurrent - totalPrev;
    const diffPct =
      totalPrev > 0 ? Math.round((diff / totalPrev) * 1000) / 10 : 0;
    const isPositive = diff >= 0;

    return {
      total: totalCurrent,
      diff,
      diffPct,
      isPositive,
      keteranganBiru: `Total Pax TA ${k1Tahun} (${k1Arus === 'Semua' ? 'Datang + Berangkat' : k1Arus})`,
    };
  }, [k1Data, db.arusPenumpangTriwulan.records, k1Tahun, k1Arus]);

  // --------------------------------------------------------------------------
  // KARTU 2: PERGERAKAN PESAWAT DAN TINGKAT KETERISIAN KURSI (CLUSTERED + LINE)
  // --------------------------------------------------------------------------
  const k2Data = useMemo(() => {
    const list = db.pergerakanPesawatKeterisian.records.filter((item) => {
      const matchTahun = item.tahun === Number(k2Tahun);
      const matchJenis = k2Jenis === 'Semua' || item.jenisPenerbangan === k2Jenis;
      return matchTahun && matchJenis;
    });

    const triwulanMap = new Map<
      string,
      {
        triwulan: string;
        penerbanganDatang: number;
        penerbanganBerangkat: number;
        totalPenerbangan: number;
        kapasitasKursi: number;
        totalPenumpang: number;
        keterisianKursiPersen: number;
        tipePesawatTerbanyak: string;
      }
    >();

    ['TW I', 'TW II', 'TW III', 'TW IV'].forEach((tw) => {
      triwulanMap.set(tw, {
        triwulan: tw,
        penerbanganDatang: 0,
        penerbanganBerangkat: 0,
        totalPenerbangan: 0,
        kapasitasKursi: 0,
        totalPenumpang: 0,
        keterisianKursiPersen: 0,
        tipePesawatTerbanyak: '',
      });
    });

    list.forEach((item) => {
      const existing = triwulanMap.get(item.triwulan);
      if (existing) {
        existing.penerbanganDatang += item.penerbanganDatang;
        existing.penerbanganBerangkat += item.penerbanganBerangkat;
        existing.totalPenerbangan += item.totalPenerbangan;
        existing.kapasitasKursi += item.kapasitasKursi;
        existing.totalPenumpang += item.totalPenumpang;
        existing.tipePesawatTerbanyak = item.tipePesawatTerbanyak;
      }
    });

    return Array.from(triwulanMap.values()).map((item) => {
      const loadFactor =
        item.kapasitasKursi > 0
          ? Math.round((item.totalPenumpang / item.kapasitasKursi) * 1000) / 10
          : 0;
      return {
        ...item,
        keterisianKursiPersen: loadFactor,
      };
    });
  }, [db.pergerakanPesawatKeterisian.records, k2Tahun, k2Jenis]);

  const k2Summary = useMemo(() => {
    const totalCap = k2Data.reduce((acc, curr) => acc + curr.kapasitasKursi, 0);
    const totalPax = k2Data.reduce((acc, curr) => acc + curr.totalPenumpang, 0);
    const avgLoadFactor =
      totalCap > 0 ? Math.round((totalPax / totalCap) * 1000) / 10 : 0;
    return {
      avgLoadFactor,
      keteranganBiru: `Rata-rata Keterisian Kursi (${k2Jenis === 'Semua' ? 'Domestik & Int' : k2Jenis})`,
    };
  }, [k2Data, k2Jenis]);

  // --------------------------------------------------------------------------
  // KARTU 3: PENUMPANG PER OPERATOR PENERBANGAN (HORIZONTAL BAR, TOP 10)
  // --------------------------------------------------------------------------
  const k3Data = useMemo(() => {
    const filtered = db.penumpangPerOperator.records.filter((item) => {
      const matchTahun = item.tahun === Number(k3Tahun);
      const matchTw = item.triwulan === k3Triwulan;
      return matchTahun && matchTw;
    });

    return [...filtered].sort((a, b) => b.jumlahPenumpang - a.jumlahPenumpang).slice(0, 10);
  }, [db.penumpangPerOperator.records, k3Tahun, k3Triwulan]);

  const k3Summary = useMemo(() => {
    const activeOperators = k3Data.length;
    const topOperator = k3Data[0]?.operator || 'Lion Air';
    return {
      count: activeOperators,
      keteranganBiru: `Operator Teraktif (Dipimpin ${topOperator})`,
    };
  }, [k3Data]);

  // --------------------------------------------------------------------------
  // KARTU 4: BAGASI, KARGO, DAN POS (CLUSTERED COLUMN)
  // --------------------------------------------------------------------------
  const k4Data = useMemo(() => {
    const list = db.muatanBagasiKargoPos.records.filter((item) => {
      const matchTahun = item.tahun === Number(k4Tahun);
      const matchArus = k4Arus === 'Semua' || item.tipeArus === k4Arus;
      return matchTahun && matchArus;
    });

    const triwulanMap = new Map<
      string,
      {
        triwulan: string;
        bagasiKg: number;
        kargoKg: number;
        posKg: number;
        totalMuatanKg: number;
        bagasiTon: number;
        kargoTon: number;
        posTon: number;
      }
    >();

    ['TW I', 'TW II', 'TW III', 'TW IV'].forEach((tw) => {
      triwulanMap.set(tw, {
        triwulan: tw,
        bagasiKg: 0,
        kargoKg: 0,
        posKg: 0,
        totalMuatanKg: 0,
        bagasiTon: 0,
        kargoTon: 0,
        posTon: 0,
      });
    });

    list.forEach((item) => {
      const existing = triwulanMap.get(item.triwulan);
      if (existing) {
        existing.bagasiKg += item.bagasiKg;
        existing.kargoKg += item.kargoKg;
        existing.posKg += item.posKg;
        existing.totalMuatanKg += item.totalMuatanKg;
      }
    });

    return Array.from(triwulanMap.values()).map((item) => ({
      ...item,
      bagasiTon: Math.round(item.bagasiKg / 1000),
      kargoTon: Math.round(item.kargoKg / 1000),
      posTon: Math.round(item.posKg / 1000),
    }));
  }, [db.muatanBagasiKargoPos.records, k4Tahun, k4Arus]);

  const k4Summary = useMemo(() => {
    const totalKargoKg = k4Data.reduce((acc, curr) => acc + curr.kargoKg, 0);
    const totalKargoTon = Math.round(totalKargoKg / 1000);
    return {
      kargoTon: totalKargoTon,
      keteranganBiru: `Tonase Kargo Murni TA ${k4Tahun} (${k4Arus === 'Semua' ? 'Total Masuk/Keluar' : k4Arus})`,
    };
  }, [k4Data, k4Tahun, k4Arus]);

  // --------------------------------------------------------------------------
  // KARTU 5: MUATAN EKSPEDISI MUATAN PESAWAT UDARA (EMPU) (CLUSTERED BAR HORIZONTAL, TOP 8)
  // --------------------------------------------------------------------------
  const k5Data = useMemo(() => {
    const filtered = db.muatanEmpu.records.filter((item) => {
      const matchTahun = item.tahun === Number(k5Tahun);
      const matchTw = item.triwulan === k5Triwulan;
      return matchTahun && matchTw;
    });

    return [...filtered].sort((a, b) => b.totalTon - a.totalTon).slice(0, 8);
  }, [db.muatanEmpu.records, k5Tahun, k5Triwulan]);

  const k5Summary = useMemo(() => {
    const totalTon = k5Data.reduce((acc, curr) => acc + curr.totalTon, 0);
    return {
      totalTon,
      keteranganBiru: `Total Muatan EMPU (${k5Triwulan === 'Semua' ? '1 Tahun' : k5Triwulan} ${k5Tahun})`,
    };
  }, [k5Data, k5Tahun, k5Triwulan]);

  // --------------------------------------------------------------------------
  // KARTU 6: RUTE PENERBANGAN LANGSUNG DARI BATAM (TABEL RINGKAS, TOP 10)
  // --------------------------------------------------------------------------
  const k6Data = useMemo(() => {
    return [...db.rutePenerbanganLangsung.records]
      .sort((a, b) => b.frekuensiPerMinggu - a.frekuensiPerMinggu)
      .slice(0, 10);
  }, [db.rutePenerbanganLangsung.records]);

  const k6Summary = useMemo(() => {
    const totalRute = k6Data.length;
    const kotaUnik = new Set(k6Data.map((r) => r.kotaTujuan)).size;
    const totalFlightsPerMinggu = k6Data.reduce(
      (acc, curr) => acc + curr.frekuensiPerMinggu,
      0
    );
    return {
      totalRute,
      kotaUnik,
      totalFlightsPerMinggu,
      keteranganBiru: `${totalFlightsPerMinggu} Penerbangan/Minggu ke ${kotaUnik} Kota`,
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
        {/* KARTU 1: Jumlah Penumpang per Triwulan                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Jumlah Penumpang per Triwulan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Volume penumpang udara (Dewasa, Anak, Bayi) dan perbandingan tahun sebelumnya
                </p>
              </div>

              <div className="flex flex-col items-end shrink-0 self-end sm:self-auto text-right">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {k1Summary.total.toLocaleString('id-ID')}
                  </span>
                  <span
                    className={`inline-flex items-center text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                      k1Summary.isPositive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {k1Summary.isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    )}
                    {k1Summary.isPositive ? '+' : ''}
                    {k1Summary.diffPct}% YoY
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  {k1Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Dewasa
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" /> Anak
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Bayi
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
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
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Arus:</span>
                  <select
                    value={k1Arus}
                    onChange={(e) => setK1Arus(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua (A/D)</option>
                    <option value="Datang">Datang (A)</option>
                    <option value="Berangkat">Berangkat (D)</option>
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
                      dataKey="triwulan"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.triwulan} {item.tahun}</span>
                              <span className="font-mono text-blue-600 font-black">
                                {item.totalPenumpang.toLocaleString('id-ID')} Pax
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Penumpang Dewasa:</span>
                                <span className="font-mono font-bold">
                                  {item.penumpangDewasa.toLocaleString('id-ID')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sky-700">
                                <span>• Penumpang Anak:</span>
                                <span className="font-mono font-bold">
                                  {item.penumpangAnak.toLocaleString('id-ID')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Penumpang Bayi:</span>
                                <span className="font-mono font-bold">
                                  {item.penumpangBayi.toLocaleString('id-ID')}
                                </span>
                              </div>
                            </div>
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] bg-slate-50 p-1.5 rounded text-slate-600 space-y-0.5">
                              <div className="font-semibold text-slate-800">Penumpang Transit:</div>
                              <div className="flex justify-between">
                                <span>Dewasa / Anak / Bayi:</span>
                                <span className="font-mono font-bold">
                                  {item.transitDewasa.toLocaleString('id-ID')} / {item.transitAnak.toLocaleString('id-ID')} / {item.transitBayi.toLocaleString('id-ID')}
                                </span>
                              </div>
                              <div className="flex justify-between text-blue-600 font-bold">
                                <span>Total Transit:</span>
                                <span className="font-mono">{item.totalTransit.toLocaleString('id-ID')} Pax</span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="penumpangDewasa" stackId="a" fill="#2563eb" name="Dewasa" />
                    <Bar dataKey="penumpangAnak" stackId="a" fill="#38bdf8" name="Anak" />
                    <Bar dataKey="penumpangBayi" stackId="a" fill="#94a3b8" radius={[3, 3, 0, 0]} name="Bayi" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Triwulan / Periode</th>
                      <th className="py-2 px-2 text-right">Dewasa (Pax)</th>
                      <th className="py-2 px-2 text-right">Anak (Pax)</th>
                      <th className="py-2 px-2 text-right">Bayi (Pax)</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Total Penumpang</th>
                      <th className="py-2 px-2 text-right text-emerald-700 bg-emerald-50/70">Total Transit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k1Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.triwulan} {row.tahun}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.penumpangDewasa.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.penumpangAnak.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.penumpangBayi.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">{row.totalPenumpang.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">{row.totalTransit.toLocaleString('id-ID')}</td>
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
              <span className="truncate">{db.arusPenumpangTriwulan.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.arusPenumpangTriwulan.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 2: Pergerakan Pesawat dan Tingkat Keterisian Kursi           */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Pergerakan Pesawat dan Tingkat Keterisian Kursi
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Jumlah penerbangan datang/berangkat dan rasio keterisian kursi (Load Factor)
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k2Summary.avgLoadFactor}%
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
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Datang
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" /> Berangkat
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-3 h-0.5 bg-[#16a34a]" /> Keterisian Kursi (%)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
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
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Jenis:</span>
                  <select
                    value={k2Jenis}
                    onChange={(e) => setK2Jenis(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Domestik">Domestik</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
              </div>
            </div>

            {/* Clustered Column + Line Chart vs Detail Table */}
            {k2ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={k2Data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="triwulan"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 10, fill: '#16a34a' }}
                      domain={[60, 100]}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.triwulan} {k2Tahun}</span>
                              <span className="font-mono text-emerald-600 font-black">
                                LF: {item.keterisianKursiPersen}%
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Flight Datang:</span>
                                <span className="font-mono font-bold">
                                  {item.penerbanganDatang.toLocaleString('id-ID')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Flight Berangkat:</span>
                                <span className="font-mono font-bold">
                                  {item.penerbanganBerangkat.toLocaleString('id-ID')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-900 font-bold border-t border-slate-100 pt-1">
                                <span>Total Pergerakan:</span>
                                <span className="font-mono text-blue-600 font-black">
                                  {item.totalPenerbangan.toLocaleString('id-ID')} Flight
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-500 pt-0.5">
                                <span>Kapasitas Kursi:</span>
                                <span className="font-mono">
                                  {item.kapasitasKursi.toLocaleString('id-ID')} Kursi
                                </span>
                              </div>
                            </div>
                            {item.tipePesawatTerbanyak && (
                              <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500">
                                <span className="font-semibold text-slate-700">Tipe Pesawat Terbanyak:</span>
                                <div className="font-mono text-slate-800 mt-0.5">{item.tipePesawatTerbanyak}</div>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="penerbanganDatang"
                      fill="#2563eb"
                      radius={[3, 3, 0, 0]}
                      name="Penerbangan Datang"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="penerbanganBerangkat"
                      fill="#64748b"
                      radius={[3, 3, 0, 0]}
                      name="Penerbangan Berangkat"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="keterisianKursiPersen"
                      stroke="#16a34a"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#16a34a', strokeWidth: 1.5, stroke: '#fff' }}
                      name="Keterisian Kursi (%)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Triwulan / Periode</th>
                      <th className="py-2 px-2 text-right">Flight Datang</th>
                      <th className="py-2 px-2 text-right">Flight Berangkat</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Total Pergerakan</th>
                      <th className="py-2 px-2 text-right">Kapasitas Kursi</th>
                      <th className="py-2 px-2 text-right text-emerald-700 bg-emerald-50/70">Load Factor (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k2Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.triwulan} {k2Tahun}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.penerbanganDatang.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.penerbanganBerangkat.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">{row.totalPenerbangan.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.kapasitasKursi.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {row.keterisianKursiPersen}%
                          </span>
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
              <span className="truncate">{db.pergerakanPesawatKeterisian.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.pergerakanPesawatKeterisian.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARIS 2: KARTU 3 & KARTU 4                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 3: Penumpang per Operator Penerbangan (Horizontal Bar Top 10)*/}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Penumpang per Operator Penerbangan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  10 maskapai penerbangan teratas dengan volume penumpang tertinggi di Hang Nadim
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k3Summary.count} Maskapai
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
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Jumlah Penumpang
                </span>
                <span className="text-[10px] text-slate-400">10 Operator Teratas</span>
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
                  <span className="text-[11px] text-slate-400 font-medium">Triwulan:</span>
                  <select
                    value={k3Triwulan}
                    onChange={(e) => setK3Triwulan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua (1 Thn)</option>
                    <option value="TW I">TW I</option>
                    <option value="TW II">TW II</option>
                    <option value="TW III">TW III</option>
                    <option value="TW IV">TW IV</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
              </div>
            </div>

            {/* Horizontal Bar Chart (Top 10 Operators) vs Detail Table */}
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
                      dataKey="operator"
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
                        const item = payload[0].payload as PenumpangOperatorItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.operator}</span>
                              <span className="font-mono text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">
                                {item.kodeIcao} / {item.kodeIata}
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Total Penumpang:</span>
                                <span className="font-mono font-bold">
                                  {item.jumlahPenumpang.toLocaleString('id-ID')} Pax
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600">
                                <span>• Pergerakan Penerbangan:</span>
                                <span className="font-mono font-bold">
                                  {item.jumlahPenerbangan.toLocaleString('id-ID')} Flight
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-emerald-700 font-bold border-t border-slate-100 pt-1">
                                <span>Pangsa Pasar:</span>
                                <span className="font-mono font-black">{item.pangsaPersen}%</span>
                              </div>
                            </div>
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500">
                              <span className="font-semibold text-slate-700">Rute Asal-Tujuan Terbanyak:</span>
                              <div className="font-mono text-slate-800 mt-0.5">{item.ruteAsalTujuanTerbanyak}</div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="jumlahPenumpang"
                      fill="#2563eb"
                      radius={[0, 4, 4, 0]}
                      name="Jumlah Penumpang"
                    >
                      {k3Data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#2563eb' : index < 3 ? '#3b82f6' : '#60a5fa'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2 text-center w-8">No</th>
                      <th className="py-2 px-2.5">Maskapai Penerbangan</th>
                      <th className="py-2 px-2 text-center">Kode</th>
                      <th className="py-2 px-2 text-right">Flight</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Penumpang (Pax)</th>
                      <th className="py-2 px-2 text-right text-emerald-700 bg-emerald-50/70">Pangsa (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k3Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">
                          <div>{row.operator}</div>
                          <div className="text-[9.5px] font-normal text-slate-500 truncate max-w-[150px]">{row.ruteAsalTujuanTerbanyak}</div>
                        </td>
                        <td className="py-1.5 px-2 text-center">
                          <span className="font-mono text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                            {row.kodeIata || row.kodeIcao}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.jumlahPenerbangan.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">{row.jumlahPenumpang.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {row.pangsaPersen}%
                          </span>
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
              <span className="truncate">{db.penumpangPerOperator.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.penumpangPerOperator.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 4: Bagasi, Kargo, dan Pos (Clustered Column)                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Bagasi, Kargo, dan Pos
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Volume muatan bagasi terdaftar penumpang, kargo logistik, dan pos udara (kg/ton)
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k4Summary.kargoTon.toLocaleString('id-ID')} Ton
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
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" /> Bagasi (Kg)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Kargo (Kg)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" /> Pos (Kg)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
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
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Arus:</span>
                  <select
                    value={k4Arus}
                    onChange={(e) => setK4Arus(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Datang">Datang</option>
                    <option value="Berangkat">Berangkat</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k4ViewMode} onChange={setK4ViewMode} />
              </div>
            </div>

            {/* Clustered Column Chart vs Detail Table */}
            {k4ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={k4Data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="triwulan"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000000).toFixed(1)}k T`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.triwulan} {k4Tahun}</span>
                              <span className="font-mono text-blue-600 font-black">
                                Total: {(item.totalMuatanKg / 1000).toLocaleString('id-ID')} Ton
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-slate-700">
                                <span>• Bagasi Penumpang:</span>
                                <span className="font-mono font-bold">
                                  {item.bagasiKg.toLocaleString('id-ID')} Kg ({(item.bagasiKg / 1000).toFixed(0)} T)
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Kargo Logistik:</span>
                                <span className="font-mono font-bold">
                                  {item.kargoKg.toLocaleString('id-ID')} Kg ({(item.kargoKg / 1000).toFixed(0)} T)
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-amber-700">
                                <span>• Pos Udara:</span>
                                <span className="font-mono font-bold">
                                  {item.posKg.toLocaleString('id-ID')} Kg ({(item.posKg / 1000).toFixed(1)} T)
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="bagasiKg"
                      fill="#64748b"
                      radius={[3, 3, 0, 0]}
                      name="Bagasi (Kg)"
                    />
                    <Bar
                      dataKey="kargoKg"
                      fill="#2563eb"
                      radius={[3, 3, 0, 0]}
                      name="Kargo (Kg)"
                    />
                    <Bar
                      dataKey="posKg"
                      fill="#f59e0b"
                      radius={[3, 3, 0, 0]}
                      name="Pos (Kg)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Triwulan / Periode</th>
                      <th className="py-2 px-2 text-right">Bagasi (Ton)</th>
                      <th className="py-2 px-2 text-right text-blue-700">Kargo (Ton)</th>
                      <th className="py-2 px-2 text-right text-amber-700">Pos (Ton)</th>
                      <th className="py-2 px-2 text-right text-slate-900 bg-slate-200/60 font-black">Total Muatan (Ton)</th>
                      <th className="py-2 px-2 text-right">Total (Kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k4Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">{row.triwulan} {k4Tahun}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{row.bagasiTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">{row.kargoTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-amber-700 bg-amber-50/30">{row.posTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-black text-slate-900 bg-slate-100/70">{Math.round(row.totalMuatanKg / 1000).toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-500 text-[9.5px]">{row.totalMuatanKg.toLocaleString('id-ID')}</td>
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
              <span className="truncate">{db.muatanBagasiKargoPos.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.muatanBagasiKargoPos.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARIS 3: KARTU 5 & KARTU 6                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 5: Muatan Ekspedisi Muatan Pesawat Udara (EMPU)              */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Muatan Ekspedisi Muatan Pesawat Udara (EMPU)
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi tonase kargo dan pos udara 8 operator EMPU teratas di Bandara Batam
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k5Summary.totalTon.toLocaleString('id-ID')} Ton
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k5Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Kargo (Ton)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" /> Pos (Ton)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k5Tahun}
                    onChange={(e) => setK5Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">TW:</span>
                  <select
                    value={k5Triwulan}
                    onChange={(e) => setK5Triwulan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="TW I">TW I</option>
                    <option value="TW II">TW II</option>
                    <option value="TW III">TW III</option>
                    <option value="TW IV">TW IV</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k5ViewMode} onChange={setK5ViewMode} />
              </div>
            </div>

            {/* Clustered Bar Horizontal (Top 8 Operators) vs Detail Table */}
            {k5ViewMode === 'chart' ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={k5Data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: number) => `${(val / 1000).toFixed(0)}k T`}
                    />
                    <YAxis
                      type="category"
                      dataKey="operator"
                      tick={{ fontSize: 10, fill: '#334155' }}
                      width={110}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(val: string) =>
                        val.replace('PT ', '').length > 15
                          ? `${val.replace('PT ', '').slice(0, 15)}…`
                          : val.replace('PT ', '')
                      }
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as MuatanEmpuItem;
                        return (
                          <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>{item.operator}</span>
                              <span className="font-mono text-blue-600 font-bold">
                                {item.totalTon.toLocaleString('id-ID')} Ton
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between items-center text-blue-700">
                                <span>• Muatan Kargo:</span>
                                <span className="font-mono font-bold">
                                  {item.kargoTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-amber-700">
                                <span>• Muatan Pos:</span>
                                <span className="font-mono font-bold">
                                  {item.posTon.toLocaleString('id-ID')} Ton
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-600 pt-0.5 border-t border-slate-100">
                                <span>Jenis Penerbangan:</span>
                                <span className="font-semibold text-slate-800">{item.jenisPenerbangan}</span>
                              </div>
                            </div>
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500 space-y-0.5">
                              <div><span className="font-semibold text-slate-700">Tipe Pesawat:</span> {item.tipePesawat}</div>
                              <div><span className="font-semibold text-slate-700">No Penerbangan:</span> {item.nomorPenerbanganContoh}</div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="kargoTon"
                      fill="#2563eb"
                      name="Kargo (Ton)"
                      radius={[0, 3, 3, 0]}
                    />
                    <Bar
                      dataKey="posTon"
                      fill="#f59e0b"
                      name="Pos (Ton)"
                      radius={[0, 3, 3, 0]}
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
                      <th className="py-2 px-2.5">Perusahaan Ekspedisi (EMPU)</th>
                      <th className="py-2 px-2 text-right text-blue-700">Kargo (Ton)</th>
                      <th className="py-2 px-2 text-right text-amber-700">Pos (Ton)</th>
                      <th className="py-2 px-2 text-right text-slate-900 bg-slate-200/60 font-black">Total (Ton)</th>
                      <th className="py-2 px-2 text-center">Jenis Flight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k5Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">
                          <div>{row.operator}</div>
                          <div className="text-[9.5px] font-normal text-slate-500">Tipe: {row.tipePesawat}</div>
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">{row.kargoTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-amber-700 bg-amber-50/30">{row.posTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-black text-slate-900 bg-slate-100/70">{row.totalTon.toLocaleString('id-ID')}</td>
                        <td className="py-1.5 px-2 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">
                            {row.jenisPenerbangan}
                          </span>
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
              <span className="truncate">{db.muatanEmpu.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.muatanEmpu.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 6: Rute Penerbangan Langsung dari Batam (Sheet Swap)         */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Rute Penerbangan Langsung dari Batam
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  10 rute penerbangan langsung terpadat berdasarkan frekuensi mingguan
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k6Summary.totalRute} Rute
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k6Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Subheader / Legend + Sheet Swap Toggle */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Frekuensi Penerbangan per Minggu
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 hidden sm:inline">10 Destinasi Teratas</span>
                <SheetSwapToggle mode={k6ViewMode} onChange={setK6ViewMode} />
              </div>
            </div>

            {/* Visual Bar Chart vs Detail Table */}
            {k6ViewMode === 'chart' ? (
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
                    />
                    <YAxis
                      type="category"
                      dataKey="kotaTujuan"
                      tick={{ fontSize: 10, fill: '#334155' }}
                      width={100}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip
                      formatter={(val: any, name: any, item: any) => [
                        `${val} flight/minggu (LF: ${item.payload.loadFactorPersen}%)`,
                        `Frekuensi Rute (${item.payload.operator})`,
                      ]}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontFamily: 'sans-serif',
                      }}
                    />
                    <Bar
                      dataKey="frekuensiPerMinggu"
                      fill="#2563eb"
                      radius={[0, 4, 4, 0]}
                      name="Frekuensi / Minggu"
                    >
                      {k6Data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? '#1d4ed8' : index < 3 ? '#2563eb' : '#60a5fa'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-2 px-2 text-center w-8">No</th>
                      <th className="py-2 px-2.5">Kota &amp; Bandara Tujuan</th>
                      <th className="py-2 px-2">Operator Utama</th>
                      <th className="py-2 px-2 text-center">Jenis</th>
                      <th className="py-2 px-2 text-right text-blue-700 bg-blue-50/70">Frek/Minggu</th>
                      <th className="py-2 px-2 text-right text-emerald-700 bg-emerald-50/70">Load Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k6Data.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-1.5 px-2 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-1.5 px-2.5 font-bold text-slate-900">
                          <div>{r.kotaTujuan}</div>
                          <div className="text-[9.5px] font-normal text-slate-500">{r.namaBandara}</div>
                        </td>
                        <td className="py-1.5 px-2 text-slate-600 truncate max-w-[140px]">{r.operator}</td>
                        <td className="py-1.5 px-2 text-center">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                              r.jenis === 'Domestik'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}
                          >
                            {r.jenis}
                          </span>
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {r.frekuensiPerMinggu}x
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            {r.loadFactorPersen}%
                          </span>
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
              <span className="truncate">{db.rutePenerbanganLangsung.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.rutePenerbanganLangsung.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadanPengelolaanKawasanBandaraDeepDive;
