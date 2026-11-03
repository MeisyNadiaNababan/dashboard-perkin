import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from 'recharts';
import {
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HardHat,
  Building2,
  Calendar,
} from 'lucide-react';
import {
  PENGAWASAN_INFRASTRUKTUR_MASTER_DATA,
  PaketPengawasanDetail,
} from './pengawasanInfrastrukturVisualData';

interface PengawasanInfrastrukturVisualSuiteProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const PengawasanInfrastrukturVisualSuite: React.FC<
  PengawasanInfrastrukturVisualSuiteProps
> = () => {
  const masterData = PENGAWASAN_INFRASTRUKTUR_MASTER_DATA;

  // -------------------------------------------------------------
  // Filter States per Card
  // -------------------------------------------------------------
  // Kartu 1: Subdit, Bulan, Tahun
  const [filterSubdit1, setFilterSubdit1] = useState<string>('Semua Subdit');
  const [filterBulan1, setFilterBulan1] = useState<string>('September');
  const [filterTahun1, setFilterTahun1] = useState<number>(2026);
  const [hoveredPaketId1, setHoveredPaketId1] = useState<string | null>(null);

  // Kartu 2: Subdit, Kategori, Tahun
  const [filterSubdit2, setFilterSubdit2] = useState<string>('Semua Subdit');
  const [filterKategori2, setFilterKategori2] = useState<string>('Semua Kategori');
  const [filterTahun2, setFilterTahun2] = useState<number>(2026);

  // Kartu 3: Subdit, Bulan, Tahun
  const [filterSubdit3, setFilterSubdit3] = useState<string>('Semua Subdit');
  const [filterBulan3, setFilterBulan3] = useState<string>('September');
  const [filterTahun3, setFilterTahun3] = useState<number>(2026);

  // Kartu 4: Subdit, Tahun
  const [filterSubdit4, setFilterSubdit4] = useState<string>('Semua Subdit');
  const [filterTahun4, setFilterTahun4] = useState<number>(2026);

  // =============================================================
  // 1. DATA KARTU 1 - Progres Fisik Paket Pekerjaan
  // =============================================================
  const kartu1Data = useMemo(() => {
    // Filter paket berdasarkan Tahun & Subdit
    const filtered = masterData.paketList.filter((p) => {
      const matchTahun = p.tahun === filterTahun1;
      const matchSubdit = filterSubdit1 === 'Semua Subdit' || p.subdit === filterSubdit1;
      return matchTahun && matchSubdit;
    });

    // Petakan progres bulan terpilih
    const mapped = filtered.map((p) => {
      const bData = p.bulanData[filterBulan1];
      const rencana = bData ? bData.rencana : 0;
      const realisasi = bData && bData.realisasi !== null ? bData.realisasi : 0;
      const deviasi = realisasi - rencana;
      const isAheadOrOnTrack = realisasi >= rencana;

      return {
        ...p,
        rencanaBulan: rencana,
        realisasiBulan: realisasi,
        deviasiBulan: deviasi,
        isAheadOrOnTrack,
        kendalaBulan: bData?.kendala || 'Tidak Ada Kendala',
      };
    });

    // Hitung rata-rata progres fisik seluruh paket
    const totalRealisasi = mapped.reduce((acc, curr) => acc + curr.realisasiBulan, 0);
    const avgRealisasi = mapped.length > 0 ? totalRealisasi / mapped.length : 0;

    // Urutkan 10 paket teratas dari progres terendah
    const sortedLowest10 = [...mapped]
      .sort((a, b) => a.realisasiBulan - b.realisasiBulan)
      .slice(0, 10);

    return {
      paketList10: sortedLowest10,
      avgRealisasi: parseFloat(avgRealisasi.toFixed(1)),
      totalPaket: mapped.length,
    };
  }, [masterData.paketList, filterTahun1, filterSubdit1, filterBulan1]);

  // =============================================================
  // 2. DATA KARTU 2 - Kurva Progres Rencana vs Realisasi
  // =============================================================
  const kartu2Data = useMemo(() => {
    // Filter paket berdasarkan Tahun, Subdit, & Kategori
    const filtered = masterData.paketList.filter((p) => {
      const matchTahun = p.tahun === filterTahun2;
      const matchSubdit = filterSubdit2 === 'Semua Subdit' || p.subdit === filterSubdit2;
      const matchKategori = filterKategori2 === 'Semua Kategori' || p.kategoriPekerjaan === filterKategori2;
      return matchTahun && matchSubdit && matchKategori;
    });

    const bulanKeys = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agt',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];

    let lastKnownDeviasi = 0;
    let lastKnownMonth = 'Sep';

    const curveData = masterData.bulanList.map((blnFull, idx) => {
      let sumRencana = 0;
      let sumRealisasi = 0;
      let countRealisasi = 0;

      filtered.forEach((p) => {
        const bData = p.bulanData[blnFull];
        if (bData) {
          sumRencana += bData.rencana;
          if (bData.realisasi !== null) {
            sumRealisasi += bData.realisasi;
            countRealisasi += 1;
          }
        }
      });

      const totalP = filtered.length || 1;
      const avgRnc = parseFloat((sumRencana / totalP).toFixed(1));
      const avgRls = countRealisasi > 0 ? parseFloat((sumRealisasi / countRealisasi).toFixed(1)) : null;

      // Area arsir oranye jika realisasi di bawah rencana
      let deficitValue: number | null = null;
      let deficitBottom: number | null = null;
      if (avgRls !== null && avgRls < avgRnc) {
        deficitBottom = avgRls;
        deficitValue = parseFloat((avgRnc - avgRls).toFixed(1));
      }

      if (avgRls !== null) {
        lastKnownDeviasi = parseFloat((avgRls - avgRnc).toFixed(1));
        lastKnownMonth = bulanKeys[idx];
      }

      return {
        bulanKey: bulanKeys[idx],
        bulanFull: blnFull,
        rencana: avgRnc,
        realisasi: avgRls,
        deficitBottom,
        deficitValue,
        gapRange: avgRls !== null && avgRls < avgRnc ? [avgRls, avgRnc] : undefined,
      };
    });

    return {
      curveData,
      lastDeviasi: lastKnownDeviasi,
      lastMonth: lastKnownMonth,
      totalPaket: filtered.length,
    };
  }, [masterData.paketList, masterData.bulanList, filterTahun2, filterSubdit2, filterKategori2]);

  // =============================================================
  // 3. DATA KARTU 3 - Kendala Pelaksanaan Pekerjaan
  // =============================================================
  const kartu3Data = useMemo(() => {
    // Filter paket berdasarkan Tahun & Subdit
    const filtered = masterData.paketList.filter((p) => {
      const matchTahun = p.tahun === filterTahun3;
      const matchSubdit = filterSubdit3 === 'Semua Subdit' || p.subdit === filterSubdit3;
      return matchTahun && matchSubdit;
    });

    // Kelompokkan kendala
    const kategoriMap: Record<
      string,
      { count: number; paketContoh: string[]; subditSet: Set<string> }
    > = {
      'Lahan Belum Bebas': { count: 0, paketContoh: [], subditSet: new Set() },
      Cuaca: { count: 0, paketContoh: [], subditSet: new Set() },
      Material: { count: 0, paketContoh: [], subditSet: new Set() },
      Perizinan: { count: 0, paketContoh: [], subditSet: new Set() },
      'Utilitas Eksisting': { count: 0, paketContoh: [], subditSet: new Set() },
      'Administrasi Kontrak': { count: 0, paketContoh: [], subditSet: new Set() },
    };

    let paketBerkendalaCount = 0;

    filtered.forEach((p) => {
      const bData = p.bulanData[filterBulan3];
      const k = bData?.kendala;
      if (k && kategoriMap[k]) {
        paketBerkendalaCount += 1;
        kategoriMap[k].count += 1;
        if (kategoriMap[k].paketContoh.length < 2) {
          kategoriMap[k].paketContoh.push(p.namaPaket);
        }
        kategoriMap[k].subditSet.add(p.subdit);
      }
    });

    // Urutkan dari jumlah paket terbanyak
    const chartData = Object.entries(kategoriMap)
      .map(([kategori, val]) => ({
        kategori,
        jumlahPaket: val.count,
        contohPaket: val.paketContoh.join(', ') || '-',
        subditTerkait: Array.from(val.subditSet).join(', ') || '-',
      }))
      .sort((a, b) => b.jumlahPaket - a.jumlahPaket);

    const totalPaket = filtered.length;
    const persentaseBerkendala =
      totalPaket > 0 ? parseFloat(((paketBerkendalaCount / totalPaket) * 100).toFixed(1)) : 0;

    return {
      chartData,
      paketBerkendalaCount,
      totalPaket,
      persentaseBerkendala,
    };
  }, [masterData.paketList, filterTahun3, filterSubdit3, filterBulan3]);

  // =============================================================
  // 4. DATA KARTU 4 - Beban Supervisi per Konsultan/Pengawas
  // =============================================================
  const kartu4Data = useMemo(() => {
    // Filter paket berdasarkan Tahun & Subdit
    const filtered = masterData.paketList.filter((p) => {
      const matchTahun = p.tahun === filterTahun4;
      const matchSubdit = filterSubdit4 === 'Semua Subdit' || p.subdit === filterSubdit4;
      return matchTahun && matchSubdit;
    });

    const supervisiMap: Record<
      string,
      {
        supervisi: string;
        sesuaiRencana: number;
        terlambat: number;
        selesai: number;
        totalPaket: number;
        totalNilaiKontrakRp: number;
        sumProgres: number;
        volumeList: string[];
      }
    > = {};

    filtered.forEach((p) => {
      const sup = p.supervisi;
      if (!supervisiMap[sup]) {
        supervisiMap[sup] = {
          supervisi: sup,
          sesuaiRencana: 0,
          terlambat: 0,
          selesai: 0,
          totalPaket: 0,
          totalNilaiKontrakRp: 0,
          sumProgres: 0,
          volumeList: [],
        };
      }

      // Ambil status progres bulan berjalan (September 2026 atau status terkini)
      const bData = p.bulanData['September'];
      const st = bData ? bData.status : 'Sesuai Rencana';
      const rls = bData && bData.realisasi !== null ? bData.realisasi : 0;

      if (st === 'Selesai' || rls >= 100) {
        supervisiMap[sup].selesai += 1;
      } else if (st === 'Terlambat') {
        supervisiMap[sup].terlambat += 1;
      } else {
        supervisiMap[sup].sesuaiRencana += 1;
      }

      supervisiMap[sup].totalPaket += 1;
      supervisiMap[sup].totalNilaiKontrakRp += p.nilaiKontrakRp;
      supervisiMap[sup].sumProgres += rls;
      supervisiMap[sup].volumeList.push(p.volumePekerjaan);
    });

    // Format dan urutkan dari paket terbanyak
    const chartData = Object.values(supervisiMap)
      .map((item) => {
        const avgProgres = item.totalPaket > 0 ? (item.sumProgres / item.totalPaket).toFixed(1) : '0';
        const nilaiMiliar = (item.totalNilaiKontrakRp / 1_000_000_000).toFixed(1);
        return {
          ...item,
          rataProgres: parseFloat(avgProgres),
          nilaiKontrakDisplay: `Rp ${nilaiMiliar} M`,
          volumeDisplay: item.volumeList.slice(0, 2).join('; '),
        };
      })
      .sort((a, b) => b.totalPaket - a.totalPaket);

    const totalPengawas = chartData.length;
    const totalSemuaPaket = filtered.length;
    const avgPaketPerPengawas =
      totalPengawas > 0 ? (totalSemuaPaket / totalPengawas).toFixed(1) : '0';

    return {
      chartData,
      totalPengawas,
      avgPaketPerPengawas,
    };
  }, [masterData.paketList, filterTahun4, filterSubdit4]);

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* ============================================================== */}
      {/* GRID 2 KOLOM x 2 BARIS = 4 KARTU BERUKURAN SAMA                */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ============================================================ */}
        {/* BARIS 1 / KARTU 1 - Progres Fisik Paket Pekerjaan             */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri & Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Progres Fisik Paket Pekerjaan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  10 paket konstruksi dengan progres terendah untuk prioritas percepatan
                </p>
              </div>

              {/* Angka Ringkasan Monospace & Keterangan Biru */}
              <div className="text-right shrink-0">
                <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                  {kartu1Data.avgRealisasi}%
                </span>
                <span className="block text-[10px] text-blue-600 font-semibold mt-0.5">
                  Rata-rata Progres Fisik
                </span>
              </div>
            </div>

            {/* Filter Controls & Legenda */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
              {/* Legenda Bar Hijau / Oranye */}
              <div className="flex items-center gap-3 text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                  <span>Progres &ge; Rencana</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
                  <span>Di Bawah Rencana</span>
                </span>
              </div>

              {/* Filters: Subdit, Bulan, Tahun */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <select
                  aria-label="Filter Subdit Kartu 1"
                  value={filterSubdit1}
                  onChange={(e) => setFilterSubdit1(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.subditList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Bulan Kartu 1"
                  value={filterBulan1}
                  onChange={(e) => setFilterBulan1(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.bulanList.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Kartu 1"
                  value={filterTahun1}
                  onChange={(e) => setFilterTahun1(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-mono text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.tahunList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* List Progress Bar Horizontal (10 Paket Terendah) */}
            <div className="space-y-2 pt-0.5">
              {kartu1Data.paketList10.map((paket, idx) => {
                const isHovered = hoveredPaketId1 === paket.id;
                return (
                  <div
                    key={paket.id}
                    className={`relative rounded-lg p-1.5 transition-all cursor-default border ${
                      isHovered
                        ? 'bg-blue-50/70 border-blue-200 shadow-2xs'
                        : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                    }`}
                    onMouseEnter={() => setHoveredPaketId1(paket.id)}
                    onMouseLeave={() => setHoveredPaketId1(null)}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <span className="font-mono text-[10px] text-slate-400 font-semibold w-4">
                          {idx + 1}.
                        </span>
                        <span className="font-semibold text-slate-800 truncate" title={paket.namaPaket}>
                          {paket.namaPaket}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-400 font-mono">
                          Renc: {paket.rencanaBulan}%
                        </span>
                        <span
                          className={`font-mono font-bold text-xs ${
                            paket.isAheadOrOnTrack ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {paket.realisasiBulan}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex items-center">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          paket.isAheadOrOnTrack ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, paket.realisasiBulan))}%` }}
                      ></div>
                    </div>

                    {/* Tooltip Hover Overlay */}
                    {isHovered && (
                      <div className="absolute left-6 right-6 -top-24 z-30 bg-slate-900/95 text-white text-[10.5px] p-2.5 rounded-lg shadow-xl backdrop-blur-xs border border-slate-700 animate-in fade-in zoom-in-95 duration-150">
                        <p className="font-bold text-blue-300 pb-1 border-b border-slate-800">
                          {paket.kode} - {paket.namaPaket}
                        </p>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1 text-[10px]">
                          <div>
                            <span className="text-slate-400">Kategori: </span>
                            <span className="font-semibold text-slate-200">{paket.kategoriPekerjaan}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Volume: </span>
                            <span className="font-semibold text-slate-200">{paket.volumePekerjaan}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Kontraktor: </span>
                            <span className="text-slate-300 truncate">{paket.kontraktor}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Supervisi: </span>
                            <span className="text-slate-300 truncate">{paket.supervisi}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Periode: </span>
                            <span className="text-slate-300">
                              {paket.tglMulai} s.d. {paket.tglSelesai}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Nilai Kontrak: </span>
                            <span className="text-amber-300 font-semibold font-mono">
                              {paket.nilaiKontrakDisplay}
                            </span>
                          </div>
                          <div className="col-span-2 pt-0.5 border-t border-slate-800/80 flex justify-between">
                            <span>
                              Status:{' '}
                              <span
                                className={
                                  paket.isAheadOrOnTrack ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'
                                }
                              >
                                {paket.isAheadOrOnTrack ? 'On Track / Ahead' : 'Terlambat'} (Deviasi:{' '}
                                {paket.deviasiBulan > 0 ? `+${paket.deviasiBulan.toFixed(1)}` : paket.deviasiBulan.toFixed(1)}%)
                              </span>
                            </span>
                            <span className="text-slate-400">Kendala: {paket.kendalaBulan}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Card 1 */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Terbatas
            </span>
            <span className="truncate ml-2">
              Laporan Progres Pekerjaan Konstruksi Tahun Berjalan (Terbatas, perbulan)
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BARIS 1 / KARTU 2 - Kurva Progres Rencana vs Realisasi       */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri & Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Kurva Progres Rencana vs Realisasi
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Komparasi kurva S progres kumulatif (%) dengan area defisit keterlambatan
                </p>
              </div>

              {/* Angka Ringkasan: Deviasi Terakhir */}
              <div className="text-right shrink-0">
                <span
                  className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
                    kartu2Data.lastDeviasi >= 0 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {kartu2Data.lastDeviasi > 0
                    ? `+${kartu2Data.lastDeviasi}`
                    : kartu2Data.lastDeviasi}
                  %
                </span>
                <span className="block text-[10px] text-blue-600 font-semibold mt-0.5">
                  Deviasi Progres ({kartu2Data.lastMonth})
                </span>
              </div>
            </div>

            {/* Filter Controls & Legenda */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
              {/* Legenda Kurva S */}
              <div className="flex items-center gap-3 text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-0.5 bg-blue-600 inline-block"></span>
                  <span>Realisasi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-0.5 border-t border-dashed border-slate-400 inline-block"></span>
                  <span>Rencana</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-200 border border-amber-300"></span>
                  <span>Defisit</span>
                </span>
              </div>

              {/* Filters: Subdit, Kategori, Tahun */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <select
                  aria-label="Filter Subdit Kartu 2"
                  value={filterSubdit2}
                  onChange={(e) => setFilterSubdit2(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.subditList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Kategori Kartu 2"
                  value={filterKategori2}
                  onChange={(e) => setFilterKategori2(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.kategoriList.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Kartu 2"
                  value={filterTahun2}
                  onChange={(e) => setFilterTahun2(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-mono text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.tahunList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Line Chart Kurva S dengan Area Defisit */}
            <div className="h-68 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={kartu2Data.curveData}
                  margin={{ top: 12, right: 15, left: -15, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="deficitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.08} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="bulanKey"
                    tick={{ fontSize: 10, fill: '#334155', fontWeight: 500 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 9.5, fill: '#64748B' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const cur = payload[0].payload;
                        const rnc = cur.rencana;
                        const rls = cur.realisasi;
                        const dev =
                          rls !== null && rls !== undefined ? (rls - rnc).toFixed(1) : null;
                        return (
                          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 text-xs space-y-1">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              Bulan {cur.bulanFull}
                            </p>
                            <div className="flex justify-between gap-4 text-slate-600">
                              <span>Rencana Kumulatif:</span>
                              <span className="font-mono font-bold text-slate-800">{rnc}%</span>
                            </div>
                            <div className="flex justify-between gap-4 text-blue-600">
                              <span>Realisasi Lapangan:</span>
                              <span className="font-mono font-bold">
                                {rls !== null ? `${rls}%` : 'Proyeksi'}
                              </span>
                            </div>
                            {dev !== null && (
                              <div
                                className={`flex justify-between gap-4 font-semibold pt-1 border-t border-slate-100 ${
                                  Number(dev) >= 0 ? 'text-emerald-600' : 'text-amber-600'
                                }`}
                              >
                                <span>Deviasi:</span>
                                <span className="font-mono">
                                  {Number(dev) > 0 ? `+${dev}` : dev}%
                                  {Number(dev) < 0 ? ' (Tertinggal)' : ' (Ahead/On Track)'}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  {/* Shading Area Defisit: saat realisasi < rencana */}
                  <Area
                    type="monotone"
                    dataKey="gapRange"
                    fill="url(#deficitGradient)"
                    stroke="none"
                    connectNulls={false}
                  />

                  {/* Garis Rencana */}
                  <Line
                    type="monotone"
                    dataKey="rencana"
                    name="Rencana (%)"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 2.5, fill: '#94A3B8' }}
                  />

                  {/* Garis Realisasi */}
                  <Line
                    type="monotone"
                    dataKey="realisasi"
                    name="Realisasi (%)"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#2563EB' }}
                    connectNulls={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Card 2 */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Terbatas
            </span>
            <span className="truncate ml-2">
              Laporan Progres Pekerjaan Konstruksi Tahun Berjalan (Terbatas, perbulan)
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BARIS 2 / KARTU 3 - Kendala Pelaksanaan Pekerjaan             */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri & Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Kendala Pelaksanaan Pekerjaan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi isu kritis penghambat progres fisik pekerjaan konstruksi
                </p>
              </div>

              {/* Angka Ringkasan: Paket Berkendala & % */}
              <div className="text-right shrink-0">
                <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-amber-600">
                  {kartu3Data.paketBerkendalaCount} Paket
                </span>
                <span className="block text-[10px] text-blue-600 font-semibold mt-0.5">
                  {kartu3Data.persentaseBerkendala}% Paket Terkendala
                </span>
              </div>
            </div>

            {/* Filter Controls & Legenda */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
              {/* Legenda */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
                <span>Frekuensi Paket Berkendala (Urut Terbanyak)</span>
              </div>

              {/* Filters: Subdit, Bulan, Tahun */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <select
                  aria-label="Filter Subdit Kartu 3"
                  value={filterSubdit3}
                  onChange={(e) => setFilterSubdit3(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.subditList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Bulan Kartu 3"
                  value={filterBulan3}
                  onChange={(e) => setFilterBulan3(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.bulanList.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Kartu 3"
                  value={filterTahun3}
                  onChange={(e) => setFilterTahun3(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-mono text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.tahunList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Horizontal Bar Chart (Oranye, Urut Terbanyak) */}
            <div className="h-68 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={kartu3Data.chartData}
                  layout="vertical"
                  margin={{ top: 8, right: 25, left: 15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B' }}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kategori"
                    width={130}
                    tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload as (typeof kartu3Data.chartData)[0];
                        return (
                          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 text-xs space-y-1.5 max-w-xs">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              {item.kategori}
                            </p>
                            <div className="flex justify-between text-slate-700 text-[11px]">
                              <span>Jumlah Paket Terdampak:</span>
                              <span className="font-mono font-bold text-amber-600">
                                {item.jumlahPaket} Paket
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 space-y-0.5">
                              <p>
                                <span className="font-semibold text-slate-700">Subdit Terkait: </span>
                                {item.subditTerkait}
                              </p>
                              <p>
                                <span className="font-semibold text-slate-700">Contoh Paket: </span>
                                {item.contohPaket}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="jumlahPaket" name="Jumlah Paket" fill="#F59E0B" radius={[0, 4, 4, 0]}>
                    {kartu3Data.chartData.map((_, index) => (
                      <Cell key={`cell-k3-${index}`} fill={index === 0 ? '#EA580C' : '#F59E0B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Card 3 */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Terbatas
            </span>
            <span className="truncate ml-2">
              Laporan Progres Pekerjaan Konstruksi Tahun Berjalan (Terbatas, perbulan)
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BARIS 2 / KARTU 4 - Beban Supervisi per Konsultan/Pengawas   */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri & Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Beban Supervisi per Konsultan/Pengawas
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi beban pengawasan paket per konsultan serta status capaian
                </p>
              </div>

              {/* Angka Ringkasan: Pengawas Aktif & Rata-rata Paket */}
              <div className="text-right shrink-0">
                <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                  {kartu4Data.totalPengawas} Pengawas
                </span>
                <span className="block text-[10px] text-blue-600 font-semibold mt-0.5">
                  Rata-rata {kartu4Data.avgPaketPerPengawas} Paket / Konsultan
                </span>
              </div>
            </div>

            {/* Filter Controls & Legenda */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
              {/* Legenda Tumpukan */}
              <div className="flex items-center gap-3 text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                  <span>Sesuai Rencana</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
                  <span>Terlambat</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span>
                  <span>Selesai</span>
                </span>
              </div>

              {/* Filters: Subdit, Tahun */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <select
                  aria-label="Filter Subdit Kartu 4"
                  value={filterSubdit4}
                  onChange={(e) => setFilterSubdit4(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-medium text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.subditList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Kartu 4"
                  value={filterTahun4}
                  onChange={(e) => setFilterTahun4(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[11px] font-mono text-slate-700 outline-none hover:bg-slate-100 cursor-pointer"
                >
                  {masterData.tahunList.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stacked Horizontal Bar Chart */}
            <div className="h-68 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={kartu4Data.chartData}
                  layout="vertical"
                  margin={{ top: 8, right: 25, left: 15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#E2E8F0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B' }}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="supervisi"
                    width={145}
                    tick={{ fontSize: 9, fill: '#334155', fontWeight: 500 }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload as (typeof kartu4Data.chartData)[0];
                        return (
                          <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 text-xs space-y-1.5 max-w-xs">
                            <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              {item.supervisi}
                            </p>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                              <span className="text-slate-500">Total Paket:</span>
                              <span className="font-bold text-slate-800">{item.totalPaket} Paket</span>
                              <span className="text-emerald-600">Sesuai Rencana:</span>
                              <span className="font-bold text-emerald-700">{item.sesuaiRencana}</span>
                              <span className="text-amber-600">Terlambat:</span>
                              <span className="font-bold text-amber-700">{item.terlambat}</span>
                              <span className="text-blue-600">Selesai:</span>
                              <span className="font-bold text-blue-700">{item.selesai}</span>
                              <span className="text-slate-500">Rata-rata Progres:</span>
                              <span className="font-bold font-mono text-slate-800">{item.rataProgres}%</span>
                              <span className="text-slate-500">Total Nilai Kontrak:</span>
                              <span className="font-bold font-mono text-amber-600">
                                {item.nilaiKontrakDisplay}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                              <span className="font-semibold text-slate-700">Volume: </span>
                              {item.volumeDisplay}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="sesuaiRencana"
                    name="Sesuai Rencana"
                    stackId="supervisiStack"
                    fill="#10B981"
                  />
                  <Bar
                    dataKey="terlambat"
                    name="Terlambat"
                    stackId="supervisiStack"
                    fill="#F59E0B"
                  />
                  <Bar
                    dataKey="selesai"
                    name="Selesai"
                    stackId="supervisiStack"
                    fill="#2563EB"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Card 4 */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Terbatas
            </span>
            <span className="truncate ml-2">
              Laporan Progres Pekerjaan Konstruksi &amp; Pembangunan BP Batam (Terbatas, pertahun)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
