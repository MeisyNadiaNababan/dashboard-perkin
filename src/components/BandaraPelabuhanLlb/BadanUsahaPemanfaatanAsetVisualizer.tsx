import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import {
  BU_PEMANFAATAN_ASET_DATA,
  PendapatanPenyewaanItem,
  KuninganGuestHouseItem,
  KunjunganWisataItem,
  SewaLahanMenaraItem,
  PeternakanPemotonganItem,
  FakturAsetItem,
} from './badanUsahaPemanfaatanAsetData';
import { SheetSwapToggle } from '../SheetSwapToggle';
import {
  Building2,
  Hotel,
  Trees,
  Radio,
  Beef,
  ReceiptText,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

// Format angka Indonesia
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(Math.round(num));
};

// Format Rupiah ringkas (Miliar / Juta / Ribu)
const formatRupiahShort = (val: number): string => {
  if (Math.abs(val) >= 1_000_000_000_000) {
    return `Rp ${(val / 1_000_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} T`;
  }
  if (Math.abs(val) >= 1_000_000_000) {
    return `Rp ${(val / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} M`;
  }
  if (Math.abs(val) >= 1_000_000) {
    return `Rp ${(val / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 })} Jt`;
  }
  return `Rp ${formatNumber(val)}`;
};

export const BadanUsahaPemanfaatanAsetVisualizer: React.FC = () => {
  // Global & Individual Filters
  const [filterTahun1, setFilterTahun1] = useState<number>(2026);
  const [filterFasilitas1, setFilterFasilitas1] = useState<string>('all');
  const [filterTahun2, setFilterTahun2] = useState<number>(2026);
  const [filterTahun3, setFilterTahun3] = useState<number>(2026);
  const [filterTahun4, setFilterTahun4] = useState<number>(2026);
  const [filterTahun5, setFilterTahun5] = useState<number>(2026);
  const [filterTahun6, setFilterTahun6] = useState<number>(2026);

  // Sheet Swap View Modes (Chart vs Table)
  const [viewMode1, setViewMode1] = useState<'chart' | 'table'>('chart');
  const [viewMode2, setViewMode2] = useState<'chart' | 'table'>('chart');
  const [viewMode3, setViewMode3] = useState<'chart' | 'table'>('chart');
  const [viewMode4, setViewMode4] = useState<'chart' | 'table'>('chart');
  const [viewMode5, setViewMode5] = useState<'chart' | 'table'>('chart');
  const [viewMode6, setViewMode6] = useState<'chart' | 'table'>('chart');

  // =========================================================================
  // DATA CARD 1: PENDAPATAN PENYEWAAN FASILITAS PER BULAN
  // =========================================================================
  const datasetTahun1 = BU_PEMANFAATAN_ASET_DATA.tahunan[filterTahun1] || BU_PEMANFAATAN_ASET_DATA.tahunan[2026];
  const dataCard1 = useMemo(() => {
    return datasetTahun1.penyewaanFasilitasPerBulan.map((item) => {
      let filteredTotal = item.totalNominal;
      if (filterFasilitas1 === 'guestHouse') filteredTotal = item.guestHouse;
      else if (filterFasilitas1 === 'asramaHaji') filteredTotal = item.asramaHaji;
      else if (filterFasilitas1 === 'rusun') filteredTotal = item.rusun;
      else if (filterFasilitas1 === 'sportHall') filteredTotal = item.sportHall;

      return {
        ...item,
        displayTotal: filteredTotal,
        guestHouseJt: item.guestHouse / 1_000_000,
        asramaHajiJt: item.asramaHaji / 1_000_000,
        rusunJt: item.rusun / 1_000_000,
        sportHallJt: item.sportHall / 1_000_000,
        displayTotalJt: filteredTotal / 1_000_000,
      };
    });
  }, [datasetTahun1, filterFasilitas1]);

  const totalNominalPenyewaan1 = useMemo(() => {
    return dataCard1.reduce((acc, curr) => acc + curr.displayTotal, 0);
  }, [dataCard1]);

  // =========================================================================
  // DATA CARD 2: KETERISIAN KUNINGAN GUEST HOUSE
  // =========================================================================
  const datasetTahun2 = BU_PEMANFAATAN_ASET_DATA.tahunan[filterTahun2] || BU_PEMANFAATAN_ASET_DATA.tahunan[2026];
  const dataCard2 = datasetTahun2.kuninganGuestHousePerBulan;

  const rataRataOkupansi2 = useMemo(() => {
    const totalPersen = dataCard2.reduce((acc, curr) => acc + curr.tingkatKeterisianPersen, 0);
    return (totalPersen / (dataCard2.length || 1)).toFixed(1);
  }, [dataCard2]);

  // =========================================================================
  // DATA CARD 3: KUNJUNGAN WISATA PER LOKASI
  // =========================================================================
  const datasetTahun3 = BU_PEMANFAATAN_ASET_DATA.tahunan[filterTahun3] || BU_PEMANFAATAN_ASET_DATA.tahunan[2026];
  const dataCard3 = datasetTahun3.kunjunganWisataPerLokasi;

  const summaryKunjungan3 = useMemo(() => {
    const totalCurrent = dataCard3.reduce((acc, curr) => acc + curr.pengunjungTahunBerjalan, 0);
    const totalPrevious = dataCard3.reduce((acc, curr) => acc + curr.pengunjungTahunLalu, 0);
    const selisihPersen = totalPrevious > 0 ? ((totalCurrent - totalPrevious) / totalPrevious) * 100 : 0;
    return {
      totalCurrent,
      totalPrevious,
      selisihPersen: selisihPersen.toFixed(1),
    };
  }, [dataCard3]);

  // =========================================================================
  // DATA CARD 4: SEWA LAHAN MENARA TELEKOMUNIKASI
  // =========================================================================
  const datasetTahun4 = BU_PEMANFAATAN_ASET_DATA.tahunan[filterTahun4] || BU_PEMANFAATAN_ASET_DATA.tahunan[2026];
  const dataCard4 = useMemo(() => {
    // Diurutkan dari total nominal sewa terbesar
    return [...datasetTahun4.sewaLahanMenaraPerProvider]
      .sort((a, b) => b.totalSewaRp - a.totalSewaRp)
      .map((item) => ({
        ...item,
        lunasM: item.lunasRp / 1_000_000_000,
        belumLunasM: item.belumLunasRp / 1_000_000_000,
        totalSewaM: item.totalSewaRp / 1_000_000_000,
      }));
  }, [datasetTahun4]);

  const summaryMenara4 = useMemo(() => {
    const totalNominal = dataCard4.reduce((acc, curr) => acc + curr.totalSewaRp, 0);
    const totalTower = dataCard4.reduce((acc, curr) => acc + curr.jumlahTower, 0);
    return { totalNominal, totalTower };
  }, [dataCard4]);

  // =========================================================================
  // DATA CARD 5: PENYEWAAN TAPAK/KANDANG & PEMOTONGAN TERNAK
  // =========================================================================
  const datasetTahun5 = BU_PEMANFAATAN_ASET_DATA.tahunan[filterTahun5] || BU_PEMANFAATAN_ASET_DATA.tahunan[2026];
  const dataCard5 = datasetTahun5.peternakanDanPemotonganPerBulan;

  const summaryPeternakan5 = useMemo(() => {
    // Jumlah penyewa kandang aktif (ambil dari bulan terakhir / rata-rata aktif)
    const penyewaAktif = dataCard5[dataCard5.length - 1]?.jumlahPenyewaKandang || 0;
    const totalDipotong = dataCard5.reduce((acc, curr) => acc + curr.jumlahTernakDipotong, 0);
    return { penyewaAktif, totalDipotong };
  }, [dataCard5]);

  // =========================================================================
  // DATA CARD 6: PENERBITAN FAKTUR ASET PER JENIS JASA
  // =========================================================================
  const datasetTahun6 = BU_PEMANFAATAN_ASET_DATA.tahunan[filterTahun6] || BU_PEMANFAATAN_ASET_DATA.tahunan[2026];
  const dataCard6 = useMemo(() => {
    return datasetTahun6.penerbitanFakturPerJenisJasa.map((item) => ({
      ...item,
      lunasM: item.lunasRp / 1_000_000_000,
      belumBayarM: item.belumBayarRp / 1_000_000_000,
      lewatJatuhTempoM: item.lewatJatuhTempoRp / 1_000_000_000,
      totalNilaiFakturM: item.totalNilaiFakturRp / 1_000_000_000,
    }));
  }, [datasetTahun6]);

  const summaryFaktur6 = useMemo(() => {
    const totalNilai = dataCard6.reduce((acc, curr) => acc + curr.totalNilaiFakturRp, 0);
    const totalLunas = dataCard6.reduce((acc, curr) => acc + curr.lunasRp, 0);
    const persenLunas = totalNilai > 0 ? (totalLunas / totalNilai) * 100 : 0;
    return {
      totalNilai,
      persenLunas: persenLunas.toFixed(1),
    };
  }, [dataCard6]);

  return (
    <div className="w-full space-y-4">
      {/* GRID 2 KOLOM, 3 BARIS = 6 KARTU */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Pendapatan Penyewaan Fasilitas per Bulan       */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Pendapatan Penyewaan Fasilitas per Bulan
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Total nominal sewa Guest House, Asrama Haji, Rusun &amp; Sport Hall
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas & Toggle */}
              <div className="flex items-center gap-2.5 shrink-0">
                <SheetSwapToggle mode={viewMode1} onChange={setViewMode1} />
                <div className="text-right">
                  <div className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                    {formatRupiahShort(totalNominalPenyewaan1)}
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600">
                    Total Thn {filterTahun1}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 my-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-slate-400" />
                  Fasilitas:
                </label>
                <select
                  value={filterFasilitas1}
                  onChange={(e) => setFilterFasilitas1(e.target.value)}
                  className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">Semua Fasilitas</option>
                  <option value="guestHouse">Guest House</option>
                  <option value="asramaHaji">Asrama Haji</option>
                  <option value="rusun">Rusun BP Batam</option>
                  <option value="sportHall">Sport Hall Temenggung</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Tahun:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {[2026, 2025].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setFilterTahun1(thn)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-md font-semibold transition-all ${
                        filterTahun1 === thn
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode1 === 'chart' ? (
              <>
                {/* Legenda Custom */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-3 text-slate-600">
                  {filterFasilitas1 === 'all' ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                        <span>Guest House</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                        <span>Asrama Haji</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#0d9488]" />
                        <span>Rusun BP Batam</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#6366f1]" />
                        <span>Sport Hall Temenggung</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                      <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                      <span>
                        Fokus:{' '}
                        {filterFasilitas1 === 'guestHouse'
                          ? 'Guest House'
                          : filterFasilitas1 === 'asramaHaji'
                          ? 'Asrama Haji'
                          : filterFasilitas1 === 'rusun'
                          ? 'Rusun BP Batam'
                          : 'Sport Hall Temenggung'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Visualisasi Grafik: Stacked Column */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dataCard1}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickFormatter={(v) => `${(v / 1000).toFixed(1)}M`}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0]?.payload as PendapatanPenyewaanItem & { displayTotal: number };
                          return (
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 font-sans min-w-[210px]">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                                <span>Bulan {label} {filterTahun1}</span>
                                <span className="text-[10px] font-mono text-blue-600 font-semibold">
                                  {d.jumlahTransaksi} Transaksi
                                </span>
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                {filterFasilitas1 === 'all' ? (
                                  <>
                                    <div className="flex justify-between text-slate-600">
                                      <span>Guest House:</span>
                                      <span className="font-semibold text-slate-800">{formatRupiahShort(d.guestHouse)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                      <span>Asrama Haji:</span>
                                      <span className="font-semibold text-slate-800">{formatRupiahShort(d.asramaHaji)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                      <span>Rusun BP Batam:</span>
                                      <span className="font-semibold text-slate-800">{formatRupiahShort(d.rusun)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                      <span>Sport Hall:</span>
                                      <span className="font-semibold text-slate-800">{formatRupiahShort(d.sportHall)}</span>
                                    </div>
                                  </>
                                ) : null}
                                <div className="flex justify-between font-bold text-blue-700 border-t border-slate-100 pt-1">
                                  <span>Total Nominal:</span>
                                  <span>{formatRupiahShort(d.displayTotal)}</span>
                                </div>
                              </div>
                              <div className="bg-amber-50 text-amber-800 px-2 py-1 rounded text-[10px] flex items-center justify-between border border-amber-200/60 font-mono">
                                <span>Belum Bayar:</span>
                                <span className="font-bold">
                                  {d.belumBayarInvoice} invoice ({formatRupiahShort(d.belumBayarNominal)})
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      />
                      {filterFasilitas1 === 'all' ? (
                        <>
                          <Bar dataKey="guestHouseJt" stackId="penyewaan" fill="#2563eb" radius={[0, 0, 0, 0]} name="Guest House" />
                          <Bar dataKey="asramaHajiJt" stackId="penyewaan" fill="#0284c7" radius={[0, 0, 0, 0]} name="Asrama Haji" />
                          <Bar dataKey="rusunJt" stackId="penyewaan" fill="#0d9488" radius={[0, 0, 0, 0]} name="Rusun BP Batam" />
                          <Bar dataKey="sportHallJt" stackId="penyewaan" fill="#6366f1" radius={[3, 3, 0, 0]} name="Sport Hall" />
                        </>
                      ) : (
                        <Bar dataKey="displayTotalJt" fill="#2563eb" radius={[3, 3, 0, 0]} name="Nominal Terpilih" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-72 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Bulan</th>
                      <th className="py-2 px-2 text-right">Guest House</th>
                      <th className="py-2 px-2 text-right">Asrama Haji</th>
                      <th className="py-2 px-2 text-right">Rusun</th>
                      <th className="py-2 px-2 text-right">Sport Hall</th>
                      <th className="py-2 px-2 text-right bg-blue-50/70 text-blue-900">Total Nominal</th>
                      <th className="py-2 px-2 text-center">Transaksi</th>
                      <th className="py-2 px-2.5 text-right">Belum Bayar (Inv / Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataCard1.map((row) => (
                      <tr key={row.bulan} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.bulan}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatRupiahShort(row.guestHouse)}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatRupiahShort(row.asramaHaji)}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatRupiahShort(row.rusun)}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatRupiahShort(row.sportHall)}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {formatRupiahShort(row.displayTotal)}
                        </td>
                        <td className="py-1.5 px-2 text-center font-mono font-semibold text-slate-800">{row.jumlahTransaksi}</td>
                        <td className="py-1.5 px-2.5 text-right font-mono text-amber-700">
                          {row.belumBayarInvoice} inv ({formatRupiahShort(row.belumBayarNominal)})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kartu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">
              Sumber: Data Penyewaan Fasilitas dan Kamar Guest House, Asrama Haji, Rusun BP Batam, dan Data Pemakaian Sport Hall Temenggung Abdul Jamal
            </span>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka (Perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Keterisian Kuningan Guest House                 */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Hotel className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Keterisian Kuningan Guest House
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Jumlah kamar terpakai vs tingkat keterisian / okupansi bulanan
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas & Toggle */}
              <div className="flex items-center gap-2.5 shrink-0">
                <SheetSwapToggle mode={viewMode2} onChange={setViewMode2} />
                <div className="text-right">
                  <div className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                    {rataRataOkupansi2}%
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600">
                    Rata-rata Okupansi {filterTahun2}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-2 my-2.5 pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="font-medium text-slate-700">Kapasitas:</span>
                <span className="font-mono font-semibold text-slate-800">35 Kamar Aktif</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Tahun:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {[2026, 2025].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setFilterTahun2(thn)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-md font-semibold transition-all ${
                        filterTahun2 === thn
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode2 === 'chart' ? (
              <>
                {/* Legenda Custom */}
                <div className="flex items-center gap-4 text-xs mb-3 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Kamar Terpakai (Malam)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded-full bg-[#16a34a]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] -ml-2.5" />
                    <span>Tingkat Keterisian (%)</span>
                  </div>
                </div>

                {/* Visualisasi Grafik: Clustered Column + Line (Sumbu Kanan) */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={dataCard2}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={false}
                      />
                      {/* Sumbu Kiri: Kamar Terpakai */}
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 1100]}
                      />
                      {/* Sumbu Kanan: Keterisian % */}
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: '#16a34a' }}
                        tickFormatter={(v) => `${v}%`}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0]?.payload as KuninganGuestHouseItem;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 font-sans min-w-[220px]">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                                <span>Bulan {label} {filterTahun2}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                  {d.tingkatKeterisianPersen}% Okupansi
                                </span>
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                <div className="flex justify-between text-slate-700">
                                  <span>Kamar Terpakai:</span>
                                  <span className="font-semibold text-blue-700">{formatNumber(d.kamarTerpakai)} kamar/mlm</span>
                                </div>
                                <div className="flex justify-between text-slate-700">
                                  <span>Rata-rata Lama Inap:</span>
                                  <span className="font-semibold text-slate-800">{d.rataLamaMenginapHari} hari</span>
                                </div>
                                <div className="flex justify-between text-slate-700">
                                  <span>Rata-rata Tarif:</span>
                                  <span className="font-semibold text-slate-800">{formatRupiahShort(d.rataTarifKamarRp)}/mlm</span>
                                </div>
                              </div>
                              <div className="border-t border-slate-100 pt-1 text-[10px] text-slate-500 space-y-0.5">
                                <div><span className="text-slate-400">Asal Tamu Terbanyak:</span> <span className="font-medium text-slate-700">{d.asalTamuDominan}</span></div>
                                <div><span className="text-slate-400">Tipe Favorit:</span> <span className="font-medium text-slate-700">{d.tipeKamarFavorit}</span></div>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="kamarTerpakai"
                        fill="#2563eb"
                        radius={[3, 3, 0, 0]}
                        name="Kamar Terpakai"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="tingkatKeterisianPersen"
                        stroke="#16a34a"
                        strokeWidth={2.5}
                        dot={{ r: 3.5, fill: '#16a34a', strokeWidth: 1.5, stroke: '#ffffff' }}
                        activeDot={{ r: 5 }}
                        name="Keterisian (%)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-72 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Bulan</th>
                      <th className="py-2 px-2 text-right">Kamar Terpakai</th>
                      <th className="py-2 px-2 text-right bg-emerald-50/70 text-emerald-900">Okupansi (%)</th>
                      <th className="py-2 px-2 text-center">Rata Inap (Hari)</th>
                      <th className="py-2 px-2 text-right">Tarif Rata-rata</th>
                      <th className="py-2 px-2">Asal Tamu Terbanyak</th>
                      <th className="py-2 px-2.5">Tipe Kamar Favorit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataCard2.map((row) => (
                      <tr key={row.bulan} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.bulan}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700">{formatNumber(row.kamarTerpakai)}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                          {row.tingkatKeterisianPersen}%
                        </td>
                        <td className="py-1.5 px-2 text-center font-mono text-slate-700">{row.rataLamaMenginapHari}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatRupiahShort(row.rataTarifKamarRp)}</td>
                        <td className="py-1.5 px-2 text-slate-700 font-medium">{row.asalTamuDominan}</td>
                        <td className="py-1.5 px-2.5 text-slate-600">{row.tipeKamarFavorit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kartu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">
              Sumber: Rekapitulasi Jumlah Tamu Kuningan Guest House dan Profil Kuningan Guest House
            </span>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka (Perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Kunjungan Wisata per Lokasi                     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Trees className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Kunjungan Wisata per Lokasi
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Perbandingan wisatawan Taman Rusa, Agrowisata, Galang &amp; Taman Kolam
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas & Toggle */}
              <div className="flex items-center gap-2.5 shrink-0">
                <SheetSwapToggle mode={viewMode3} onChange={setViewMode3} />
                <div className="text-right">
                  <div className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                    {formatNumber(summaryKunjungan3.totalCurrent)}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 flex items-center justify-end gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+{summaryKunjungan3.selisihPersen}% vs Thn Lalu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-2 my-2.5 pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Tahun Evaluasi: <span className="font-mono font-bold text-slate-800">{filterTahun3}</span> vs <span className="font-mono text-slate-600">{filterTahun3 - 1}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Tahun:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {[2026, 2025].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setFilterTahun3(thn)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-md font-semibold transition-all ${
                        filterTahun3 === thn
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode3 === 'chart' ? (
              <>
                {/* Legenda Custom */}
                <div className="flex items-center gap-4 text-xs mb-3 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Pengunjung Thn {filterTahun3}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                    <span>Pengunjung Thn {filterTahun3 - 1}</span>
                  </div>
                </div>

                {/* Visualisasi Grafik: Horizontal Clustered Bar */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={dataCard3}
                      margin={{ top: 5, right: 20, left: 20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="lokasi"
                        tick={{ fontSize: 11, fill: '#334155' }}
                        width={110}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0]?.payload as KunjunganWisataItem;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 font-sans min-w-[210px]">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {d.lokasi}
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                <div className="flex justify-between text-blue-700 font-bold">
                                  <span>Thn {filterTahun3}:</span>
                                  <span>{formatNumber(d.pengunjungTahunBerjalan)} orang</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                  <span>Thn {filterTahun3 - 1}:</span>
                                  <span>{formatNumber(d.pengunjungTahunLalu)} orang</span>
                                </div>
                                <div className="flex justify-between text-emerald-600 font-semibold border-t border-slate-100 pt-1">
                                  <span>Pertumbuhan:</span>
                                  <span>+{d.selisihPersen}%</span>
                                </div>
                              </div>
                              <div className="bg-slate-50 p-2 rounded text-[10px] space-y-0.5 border border-slate-100 font-mono text-slate-600">
                                <div className="flex justify-between">
                                  <span>Roda 2 / Roda 4:</span>
                                  <span className="font-medium text-slate-800">
                                    {formatNumber(d.jumlahKendaraanRoda2)} / {formatNumber(d.jumlahKendaraanRoda4)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Pendapatan Tiket:</span>
                                  <span className="font-bold text-blue-700">{formatRupiahShort(d.nominalRp)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="pengunjungTahunBerjalan"
                        fill="#2563eb"
                        radius={[0, 3, 3, 0]}
                        name={`Thn ${filterTahun3}`}
                      />
                      <Bar
                        dataKey="pengunjungTahunLalu"
                        fill="#94a3b8"
                        radius={[0, 3, 3, 0]}
                        name={`Thn ${filterTahun3 - 1}`}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-72 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Lokasi Wisata</th>
                      <th className="py-2 px-2 text-right bg-blue-50/70 text-blue-900">Thn {filterTahun3} (Orang)</th>
                      <th className="py-2 px-2 text-right">Thn {filterTahun3 - 1} (Orang)</th>
                      <th className="py-2 px-2 text-right text-emerald-900">Pertumbuhan (%)</th>
                      <th className="py-2 px-2 text-right">Roda 2</th>
                      <th className="py-2 px-2 text-right">Roda 4</th>
                      <th className="py-2 px-2.5 text-right font-bold text-slate-800">Pendapatan Tiket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataCard3.map((row) => (
                      <tr key={row.lokasi} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.lokasi}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {formatNumber(row.pengunjungTahunBerjalan)}
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-600">{formatNumber(row.pengunjungTahunLalu)}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-600">+{row.selisihPersen}%</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatNumber(row.jumlahKendaraanRoda2)}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">{formatNumber(row.jumlahKendaraanRoda4)}</td>
                        <td className="py-1.5 px-2.5 text-right font-mono font-bold text-slate-900">
                          {formatRupiahShort(row.nominalRp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kartu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">
              Sumber: Kunjungan Wisata (Taman Rusa, Agrowisata, Wisata Galang, Taman Kolam)
            </span>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka (Pertahun)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Sewa Lahan Menara Telekomunikasi                */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Radio className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Sewa Lahan Menara Telekomunikasi
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Nominal sewa per provider BTS (diurutkan dari nominal terbesar)
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas & Toggle */}
              <div className="flex items-center gap-2.5 shrink-0">
                <SheetSwapToggle mode={viewMode4} onChange={setViewMode4} />
                <div className="text-right">
                  <div className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                    {formatRupiahShort(summaryMenara4.totalNominal)}
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600">
                    {summaryMenara4.totalTower} Tower BTS ({filterTahun4})
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-2 my-2.5 pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Status Pembayaran Provider BTS
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Tahun:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {[2026, 2025].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setFilterTahun4(thn)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-md font-semibold transition-all ${
                        filterTahun4 === thn
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode4 === 'chart' ? (
              <>
                {/* Legenda Custom */}
                <div className="flex items-center gap-4 text-xs mb-3 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a]" />
                    <span>Lunas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#ea580c]" />
                    <span>Belum Lunas</span>
                  </div>
                </div>

                {/* Visualisasi Grafik: Stacked Horizontal Bar */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={dataCard4}
                      margin={{ top: 5, right: 20, left: 20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickFormatter={(v) => `${v.toFixed(1)}M`}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="namaProvider"
                        tick={{ fontSize: 10, fill: '#334155' }}
                        width={110}
                        tickFormatter={(val) => {
                          if (val.includes('Telkomsel')) return 'Telkomsel';
                          if (val.includes('Mitratel')) return 'Mitratel';
                          if (val.includes('Protelindo')) return 'Protelindo';
                          if (val.includes('Tower Bersama')) return 'Tower Bersama';
                          if (val.includes('Indosat')) return 'Indosat Ooredoo';
                          if (val.includes('XL')) return 'XL Axiata';
                          return val;
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0]?.payload as SewaLahanMenaraItem;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 font-sans min-w-[220px]">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                                <span>{d.namaProvider}</span>
                                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                                  {d.jumlahTower} Tower
                                </span>
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                <div className="flex justify-between text-emerald-700 font-semibold">
                                  <span>Lunas:</span>
                                  <span>{formatRupiahShort(d.lunasRp)}</span>
                                </div>
                                <div className="flex justify-between text-orange-700 font-semibold">
                                  <span>Belum Lunas:</span>
                                  <span>{formatRupiahShort(d.belumLunasRp)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-1">
                                  <span>Total Sewa:</span>
                                  <span>{formatRupiahShort(d.totalSewaRp)}</span>
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 space-y-0.5">
                                <div><span className="text-slate-400">Lokasi:</span> <span className="font-medium text-slate-700">{d.lokasiDominan}</span></div>
                                <div><span className="text-slate-400">No SPJ:</span> <span className="font-mono text-slate-600">{d.noSpj}</span></div>
                                <div><span className="text-slate-400">Periode:</span> <span>{d.rentangRekap}</span></div>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="lunasM"
                        stackId="sewa"
                        fill="#16a34a"
                        radius={[0, 0, 0, 0]}
                        name="Lunas"
                      />
                      <Bar
                        dataKey="belumLunasM"
                        stackId="sewa"
                        fill="#ea580c"
                        radius={[0, 3, 3, 0]}
                        name="Belum Lunas"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-72 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Provider BTS</th>
                      <th className="py-2 px-2 text-center">Tower</th>
                      <th className="py-2 px-2 text-right text-emerald-800">Lunas (Rp)</th>
                      <th className="py-2 px-2 text-right text-orange-800">Belum Lunas (Rp)</th>
                      <th className="py-2 px-2 text-right bg-blue-50/70 text-blue-900 font-bold">Total Sewa</th>
                      <th className="py-2 px-2">Lokasi Dominan</th>
                      <th className="py-2 px-2.5 font-mono">No SPJ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataCard4.map((row) => (
                      <tr key={row.namaProvider} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.namaProvider}</td>
                        <td className="py-1.5 px-2 text-center font-mono font-bold text-blue-700">{row.jumlahTower}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-emerald-700">{formatRupiahShort(row.lunasRp)}</td>
                        <td className="py-1.5 px-2 text-right font-mono text-orange-700">{formatRupiahShort(row.belumLunasRp)}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                          {formatRupiahShort(row.totalSewaRp)}
                        </td>
                        <td className="py-1.5 px-2 text-slate-700 font-medium">{row.lokasiDominan}</td>
                        <td className="py-1.5 px-2.5 font-mono text-slate-600 text-[10px]">{row.noSpj}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kartu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">
              Sumber: Data Sewa Lahan Menara Telekomunikasi &amp; Data Tower BTS BP Batam
            </span>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka &amp; Tertutup
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Penyewaan Kandang & Pemotongan Ternak           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Beef className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Penyewaan Tapak/Kandang &amp; Pemotongan Ternak
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Penyewa tapak kandang peternakan Sei Temiang vs jumlah ternak dipotong
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas & Toggle */}
              <div className="flex items-center gap-2.5 shrink-0">
                <SheetSwapToggle mode={viewMode5} onChange={setViewMode5} />
                <div className="text-right">
                  <div className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                    {summaryPeternakan5.penyewaAktif} Kandang
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600">
                    {formatNumber(summaryPeternakan5.totalDipotong)} Ekor Dipotong ({filterTahun5})
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-2 my-2.5 pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Kawasan Peternakan &amp; RPH Sei Temiang
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Tahun:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {[2026, 2025].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setFilterTahun5(thn)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-md font-semibold transition-all ${
                        filterTahun5 === thn
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode5 === 'chart' ? (
              <>
                {/* Legenda Custom */}
                <div className="flex items-center gap-4 text-xs mb-3 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Penyewaan Tapak/Kandang</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 rounded-full bg-[#ea580c]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] -ml-2.5" />
                    <span>Ternak Dipotong (Ekor)</span>
                  </div>
                </div>

                {/* Visualisasi Grafik: Column + Line (Sumbu Kanan) */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={dataCard5}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={false}
                      />
                      {/* Sumbu Kiri: Jumlah Penyewa Kandang */}
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 150]}
                      />
                      {/* Sumbu Kanan: Jumlah Ternak Dipotong */}
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 10, fill: '#ea580c' }}
                        tickFormatter={(v) => `${v}`}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 4200]}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0]?.payload as PeternakanPemotonganItem;
                          return (
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 font-sans min-w-[210px]">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                                <span>Bulan {label} {filterTahun5}</span>
                                <span className="text-[10px] font-mono text-blue-600 font-semibold">
                                  {d.jumlahPenyewaKandang} Penyewa
                                </span>
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                <div className="flex justify-between text-slate-700">
                                  <span>Penyewa Kandang:</span>
                                  <span className="font-semibold text-blue-700">{d.jumlahPenyewaKandang} unit tapak</span>
                                </div>
                                <div className="flex justify-between text-orange-700 font-bold">
                                  <span>Ternak Dipotong:</span>
                                  <span>{formatNumber(d.jumlahTernakDipotong)} ekor</span>
                                </div>
                                <div className="flex justify-between text-slate-600 border-t border-slate-100 pt-1">
                                  <span>Retribusi Pemotongan:</span>
                                  <span className="font-semibold text-slate-800">{formatRupiahShort(d.pendapatanRetribusiRp)}</span>
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                                <span className="text-slate-400">Jenis Ternak Dominan:</span>{' '}
                                <span className="font-medium text-slate-700">{d.jenisTernakDominan}</span>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="jumlahPenyewaKandang"
                        fill="#2563eb"
                        radius={[3, 3, 0, 0]}
                        name="Penyewa Kandang"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="jumlahTernakDipotong"
                        stroke="#ea580c"
                        strokeWidth={2.5}
                        dot={{ r: 3.5, fill: '#ea580c', strokeWidth: 1.5, stroke: '#ffffff' }}
                        activeDot={{ r: 5 }}
                        name="Ternak Dipotong (Ekor)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-72 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Bulan</th>
                      <th className="py-2 px-2 text-center font-bold text-blue-900 bg-blue-50/70">Penyewa Kandang (Tapak)</th>
                      <th className="py-2 px-2 text-right font-bold text-orange-900 bg-orange-50/50">Ternak Dipotong (Ekor)</th>
                      <th className="py-2 px-2 text-right">Retribusi Pemotongan (Rp)</th>
                      <th className="py-2 px-2.5">Jenis Ternak Dominan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataCard5.map((row) => (
                      <tr key={row.bulan} className="hover:bg-slate-50">
                        <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.bulan}</td>
                        <td className="py-1.5 px-2 text-center font-mono font-bold text-blue-700 bg-blue-50/20">
                          {row.jumlahPenyewaKandang} unit
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-orange-700 bg-orange-50/20">
                          {formatNumber(row.jumlahTernakDipotong)}
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">
                          {formatRupiahShort(row.pendapatanRetribusiRp)}
                        </td>
                        <td className="py-1.5 px-2.5 text-slate-700 font-medium">{row.jenisTernakDominan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kartu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">
              Sumber: Jumlah Penyewaan Tapak/Kandang Peternakan dan Jumlah Pemotongan Ternak BP Batam
            </span>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka (Perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Penerbitan Faktur Aset per Jenis Jasa           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <ReceiptText className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Penerbitan Faktur Aset per Jenis Jasa
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Status pembayaran faktur Lahan, Ruang Kantor, Gudang &amp; Pengelolaan Kawasan
                </p>
              </div>

              {/* Angka Ringkasan Kanan Atas & Toggle */}
              <div className="flex items-center gap-2.5 shrink-0">
                <SheetSwapToggle mode={viewMode6} onChange={setViewMode6} />
                <div className="text-right">
                  <div className="font-mono font-bold text-lg sm:text-xl text-slate-900">
                    {formatRupiahShort(summaryFaktur6.totalNilai)}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600">
                    {summaryFaktur6.persenLunas}% Terbayar ({filterTahun6})
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-2 my-2.5 pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Klasifikasi Status Faktur Komersial
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Tahun:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  {[2026, 2025].map((thn) => (
                    <button
                      key={thn}
                      type="button"
                      onClick={() => setFilterTahun6(thn)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-md font-semibold transition-all ${
                        filterTahun6 === thn
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {thn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode6 === 'chart' ? (
              <>
                {/* Legenda Custom */}
                <div className="flex items-center gap-4 text-xs mb-3 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#16a34a]" />
                    <span>Lunas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                    <span>Belum Bayar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#ea580c]" />
                    <span>Lewat Jatuh Tempo</span>
                  </div>
                </div>

                {/* Visualisasi Grafik: Stacked Horizontal Bar */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={dataCard6}
                      margin={{ top: 5, right: 20, left: 20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickFormatter={(v) => `${v.toFixed(0)}M`}
                        axisLine={{ stroke: '#cbd5e1' }}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="jasa"
                        tick={{ fontSize: 10, fill: '#334155' }}
                        width={110}
                        tickFormatter={(val) => {
                          if (val.includes('Lahan')) return 'Lahan';
                          if (val.includes('Ruang Kantor')) return 'Ruang Kantor';
                          if (val.includes('Gudang')) return 'Gudang';
                          if (val.includes('Pengelolaan')) return 'Kawasan & Utilitas';
                          return val;
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null;
                          const d = payload[0]?.payload as FakturAsetItem;
                          const persenLunas = ((d.lunasRp / (d.totalNilaiFakturRp || 1)) * 100).toFixed(1);
                          return (
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 font-sans min-w-[220px]">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                                <span>{d.jasa}</span>
                                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold border border-emerald-200">
                                  {persenLunas}% Lunas
                                </span>
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                <div className="flex justify-between text-emerald-700 font-semibold">
                                  <span>Lunas:</span>
                                  <span>{formatRupiahShort(d.lunasRp)}</span>
                                </div>
                                <div className="flex justify-between text-blue-700 font-semibold">
                                  <span>Belum Bayar:</span>
                                  <span>{formatRupiahShort(d.belumBayarRp)}</span>
                                </div>
                                <div className="flex justify-between text-orange-700 font-semibold">
                                  <span>Lewat Jatuh Tempo:</span>
                                  <span>{formatRupiahShort(d.lewatJatuhTempoRp)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-1">
                                  <span>Total Nilai:</span>
                                  <span>{formatRupiahShort(d.totalNilaiFakturRp)}</span>
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 space-y-0.5">
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Jumlah Faktur:</span>
                                  <span className="font-mono text-slate-700">{d.jumlahFaktur} faktur</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Koreksi / Revisi:</span>
                                  <span className="font-mono text-slate-700">{d.jumlahKoreksi} faktur</span>
                                </div>
                                <div>
                                  <span className="text-slate-400">Kurs Acuan:</span>{' '}
                                  <span className="font-medium text-slate-700">{d.kursAcuan}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="lunasM"
                        stackId="faktur"
                        fill="#16a34a"
                        radius={[0, 0, 0, 0]}
                        name="Lunas"
                      />
                      <Bar
                        dataKey="belumBayarM"
                        stackId="faktur"
                        fill="#2563eb"
                        radius={[0, 0, 0, 0]}
                        name="Belum Bayar"
                      />
                      <Bar
                        dataKey="lewatJatuhTempoM"
                        stackId="faktur"
                        fill="#ea580c"
                        radius={[0, 3, 3, 0]}
                        name="Lewat Jatuh Tempo"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="h-64 sm:h-72 w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Jenis Jasa</th>
                      <th className="py-2 px-2 text-center">Faktur</th>
                      <th className="py-2 px-2 text-right text-emerald-800">Lunas (Rp)</th>
                      <th className="py-2 px-2 text-right text-blue-800">Belum Bayar (Rp)</th>
                      <th className="py-2 px-2 text-right text-orange-800">Lewat JT (Rp)</th>
                      <th className="py-2 px-2 text-right bg-blue-50/70 text-blue-900 font-bold">Total Nilai Faktur</th>
                      <th className="py-2 px-2 text-right text-emerald-700 font-bold">% Lunas</th>
                      <th className="py-2 px-2.5 text-center">Kurs Acuan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataCard6.map((row) => {
                      const persenLunas = ((row.lunasRp / (row.totalNilaiFakturRp || 1)) * 100).toFixed(1);
                      return (
                        <tr key={row.jasa} className="hover:bg-slate-50">
                          <td className="py-1.5 px-2.5 font-bold text-slate-800">{row.jasa}</td>
                          <td className="py-1.5 px-2 text-center font-mono font-bold text-slate-700">{row.jumlahFaktur}</td>
                          <td className="py-1.5 px-2 text-right font-mono text-emerald-700">{formatRupiahShort(row.lunasRp)}</td>
                          <td className="py-1.5 px-2 text-right font-mono text-blue-700">{formatRupiahShort(row.belumBayarRp)}</td>
                          <td className="py-1.5 px-2 text-right font-mono text-orange-700">{formatRupiahShort(row.lewatJatuhTempoRp)}</td>
                          <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700 bg-blue-50/30">
                            {formatRupiahShort(row.totalNilaiFakturRp)}
                          </td>
                          <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">
                            {persenLunas}%
                          </td>
                          <td className="py-1.5 px-2.5 text-center text-[10px] text-slate-600 font-medium">{row.kursAcuan}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kartu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate max-w-[70%]">
              Sumber: Jumlah Penerbitan Faktur Lahan, Ruang Kantor, Gudang, dan Pengelolaan Kawasan
            </span>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Tertutup (Pertahun)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
