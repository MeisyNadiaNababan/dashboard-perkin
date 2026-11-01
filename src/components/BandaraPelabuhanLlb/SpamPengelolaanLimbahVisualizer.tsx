import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ReferenceLine,
} from 'recharts';
import {
  SPAM_LIMBAH_DATA,
  BakuCurahBatamindoRecord,
  NrwRecord,
  DmzAirBacaRecord,
  WtpProduksiRecord,
  WadukKapasitasRecord,
  LimbahB3KpliRecord,
  LayananLimbahDomestikRecord,
  PengujianLabRecord,
} from './spamPengelolaanLimbahData';
import {
  Droplets,
  Gauge,
  MapPin,
  Factory,
  Database,
  Skull,
  Truck,
  FlaskConical,
  Filter,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Info,
} from 'lucide-react';

// Format angka Indonesia
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(Math.round(num));
};

// Format desimal Indonesia
const formatDecimal = (num: number, digits = 1): string => {
  return num.toLocaleString('id-ID', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

// Format Rupiah ringkas (Miliar / Juta)
const formatRupiahShort = (val: number): string => {
  if (Math.abs(val) >= 1_000_000_000) {
    return `Rp ${(val / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
  }
  if (Math.abs(val) >= 1_000_000) {
    return `Rp ${(val / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Jt`;
  }
  return `Rp ${formatNumber(val)}`;
};

export const SpamPengelolaanLimbahVisualizer: React.FC = () => {
  // Individual Card Filters
  const [filterTahun1, setFilterTahun1] = useState<number>(2026);
  const [filterTahun2, setFilterTahun2] = useState<string>('2026'); // '2026' | '2025' | 'komparasi'
  const [filterTahun3, setFilterTahun3] = useState<number>(2026);
  const [filterKategori3, setFilterKategori3] = useState<string>('all');
  const [filterTahun4, setFilterTahun4] = useState<number>(2026);
  const [filterPeriode4, setFilterPeriode4] = useState<string>('Semester 1');
  const [filterTahun5, setFilterTahun5] = useState<number>(2026);
  const [filterTahun6, setFilterTahun6] = useState<number>(2026);
  const [filterTahun7, setFilterTahun7] = useState<number>(2026);
  const [filterZona7, setFilterZona7] = useState<string>('all');
  const [filterTahun8, setFilterTahun8] = useState<number>(2026);
  const [filterJenis8, setFilterJenis8] = useState<string>('all');

  // =========================================================================
  // CARD 1: VOLUME AIR BAKU, AIR CURAH, DAN PENYEDIAAN KE INDUSTRI
  // =========================================================================
  const datasetTahun1 = SPAM_LIMBAH_DATA.tahunan[filterTahun1] || SPAM_LIMBAH_DATA.tahunan[2026];
  const dataCard1 = useMemo(() => {
    return datasetTahun1.bakuCurahBatamindo.map((item) => ({
      ...item,
      airBakuJutaM3: item.airBakuM3 / 1_000_000,
      airCurahJutaM3: item.airCurahM3 / 1_000_000,
      penyediaanBatamindoRibuM3: item.penyediaanBatamindoM3 / 1_000,
    }));
  }, [datasetTahun1]);

  const totalAirBakuTahun1 = useMemo(() => {
    return datasetTahun1.bakuCurahBatamindo.reduce((sum, item) => sum + item.airBakuM3, 0);
  }, [datasetTahun1]);

  // =========================================================================
  // CARD 2: NON REVENUE WATER (NRW)
  // =========================================================================
  const dataCard2 = useMemo(() => {
    const data2026 = SPAM_LIMBAH_DATA.tahunan[2026].nrwTriwulan;
    const data2025 = SPAM_LIMBAH_DATA.tahunan[2025].nrwTriwulan;

    return data2026.map((item, idx) => {
      const prevYearItem = data2025[idx] || { tahun2025: 25.0 };
      return {
        triwulan: item.triwulan.replace('Triwulan ', 'TW '),
        nrw2026: item.tahun2026,
        nrw2025: prevYearItem.tahun2025,
        target: item.target,
        deltaVsPrevQ: item.deltaVsPrevQ,
        catatan: item.catatan,
      };
    });
  }, []);

  const latestNrwItem = useMemo(() => {
    const list = filterTahun2 === '2025'
      ? SPAM_LIMBAH_DATA.tahunan[2025].nrwTriwulan
      : SPAM_LIMBAH_DATA.tahunan[2026].nrwTriwulan;
    return list[list.length - 1];
  }, [filterTahun2]);

  // =========================================================================
  // CARD 3: VOLUME AIR BACA DAN PELANGGAN PER DMZ
  // =========================================================================
  const datasetTahun3 = SPAM_LIMBAH_DATA.tahunan[filterTahun3] || SPAM_LIMBAH_DATA.tahunan[2026];
  const dataCard3 = useMemo(() => {
    const rawList = datasetTahun3.dmzAirBaca.Semua || [];
    let filtered = [...rawList];
    if (filterKategori3 !== 'all') {
      filtered = filtered.filter((d) => d.kategori === filterKategori3);
    }
    // Urut dari volume air baca terbesar
    return filtered
      .sort((a, b) => b.volumeAirBacaM3 - a.volumeAirBacaM3)
      .slice(0, 10)
      .map((item) => ({
        ...item,
        volumeAirBacaRibuM3: Math.round(item.volumeAirBacaM3 / 1_000),
        volumeTagihRibuM3: Math.round(item.volumeTagihM3 / 1_000),
      }));
  }, [datasetTahun3, filterKategori3]);

  const totalAirBacaCard3 = useMemo(() => {
    return dataCard3.reduce((sum, item) => sum + item.volumeAirBacaM3, 0);
  }, [dataCard3]);

  const totalPelangganCard3 = useMemo(() => {
    return dataCard3.reduce((sum, item) => sum + item.jumlahPelanggan, 0);
  }, [dataCard3]);

  // =========================================================================
  // CARD 4: KAPASITAS PRODUKSI & PEMAKAIAN AIR BAKU PER WTP
  // =========================================================================
  const datasetTahun4 = SPAM_LIMBAH_DATA.tahunan[filterTahun4] || SPAM_LIMBAH_DATA.tahunan[2026];
  const dataCard4 = useMemo(() => {
    const list = datasetTahun4.wtpProduksiBulanan[filterPeriode4] || datasetTahun4.wtpProduksiBulanan['Semester 1'] || [];
    return [...list].sort((a, b) => b.kapasitasTerpasangLps - a.kapasitasTerpasangLps);
  }, [datasetTahun4, filterPeriode4]);

  const totalKapasitasTerpasangWtp = useMemo(() => {
    return dataCard4.reduce((sum, item) => sum + item.kapasitasTerpasangLps, 0);
  }, [dataCard4]);

  const totalPemakaianAirBakuWtp = useMemo(() => {
    return dataCard4.reduce((sum, item) => sum + item.pemakaianAirBakuLps, 0);
  }, [dataCard4]);

  const avgUtilisasiWtp = totalKapasitasTerpasangWtp > 0
    ? ((totalPemakaianAirBakuWtp / totalKapasitasTerpasangWtp) * 100)
    : 0;

  // =========================================================================
  // CARD 5: KAPASITAS TAMPUNG WADUK
  // =========================================================================
  const dataCard5 = useMemo(() => {
    const list = SPAM_LIMBAH_DATA.daftarWadukHistoris[filterTahun5] || SPAM_LIMBAH_DATA.daftarWadukHistoris[2026] || [];
    return [...list].sort((a, b) => b.kapasitasJutaM3 - a.kapasitasJutaM3);
  }, [filterTahun5]);

  const totalKapasitasWaduk = useMemo(() => {
    return dataCard5.reduce((sum, item) => sum + item.kapasitasJutaM3, 0);
  }, [dataCard5]);

  // =========================================================================
  // CARD 6: PENGOLAHAN LIMBAH B3 DI KPLI
  // =========================================================================
  const datasetTahun6 = SPAM_LIMBAH_DATA.tahunan[filterTahun6] || SPAM_LIMBAH_DATA.tahunan[2026];
  const dataCard6 = useMemo(() => {
    return datasetTahun6.limbahB3Kpli;
  }, [datasetTahun6]);

  const totalBeratLimbahB3 = useMemo(() => {
    return dataCard6.reduce((sum, item) => sum + item.totalTon, 0);
  }, [dataCard6]);

  const avgPersenDiolahB3 = useMemo(() => {
    if (dataCard6.length === 0) return 0;
    const sum = dataCard6.reduce((acc, item) => acc + item.persenDiolah, 0);
    return sum / dataCard6.length;
  }, [dataCard6]);

  // =========================================================================
  // CARD 7: LAYANAN LIMBAH DOMESTIK
  // =========================================================================
  const datasetTahun7 = SPAM_LIMBAH_DATA.tahunan[filterTahun7] || SPAM_LIMBAH_DATA.tahunan[2026];
  const dataCard7 = useMemo(() => {
    return datasetTahun7.layananLimbahDomestik.map((item) => {
      let multiplier = 1.0;
      if (filterZona7 === 'Zona Batam Centre') multiplier = 0.35;
      else if (filterZona7 === 'Zona Sekupang') multiplier = 0.24;
      else if (filterZona7 === 'Zona Batu Aji') multiplier = 0.23;
      else if (filterZona7 === 'Zona Nongsa') multiplier = 0.10;
      else if (filterZona7 === 'Zona Bengkong') multiplier = 0.08;

      const umum = Math.round(item.limbahDomestikUmum * multiplier);
      const tinja = Math.round(item.pengurasanSumurTinja * multiplier);
      const aset = Math.round(item.pengurasanAsetBpBatam * multiplier);
      const totalPesanan = umum + tinja + aset;
      const totalVolumeM3 = Math.round(item.totalVolumeM3 * multiplier);
      const jumlahRupiah = Math.round(item.jumlahRupiah * multiplier);

      return {
        ...item,
        limbahDomestikUmum: umum,
        pengurasanSumurTinja: tinja,
        pengurasanAsetBpBatam: aset,
        totalPesanan,
        totalVolumeM3,
        jumlahRupiah,
      };
    });
  }, [datasetTahun7, filterZona7]);

  const totalPesananDomestik = useMemo(() => {
    return dataCard7.reduce((sum, item) => sum + item.totalPesanan, 0);
  }, [dataCard7]);

  const totalVolumeDomestik = useMemo(() => {
    return dataCard7.reduce((sum, item) => sum + item.totalVolumeM3, 0);
  }, [dataCard7]);

  // =========================================================================
  // CARD 8: LAYANAN PENGUJIAN LABORATORIUM
  // =========================================================================
  const datasetTahun8 = SPAM_LIMBAH_DATA.tahunan[filterTahun8] || SPAM_LIMBAH_DATA.tahunan[2026];
  const dataCard8 = useMemo(() => {
    return datasetTahun8.pengujianLab.map((item) => {
      let sampel = item.sampelUji;
      let biaya = item.biayaRetribusiRp;

      if (filterJenis8 === 'Fisika-Kimia Air') {
        sampel = item.jenisBreakdown?.['Fisika-Kimia Air'] || Math.round(item.sampelUji * 0.58);
        biaya = Math.round(biaya * 0.58);
      } else if (filterJenis8 === 'Mikrobiologi Air') {
        sampel = item.jenisBreakdown?.['Mikrobiologi Air'] || Math.round(item.sampelUji * 0.26);
        biaya = Math.round(biaya * 0.26);
      } else if (filterJenis8 === 'Uji Air Limbah B3') {
        sampel = item.jenisBreakdown?.['Uji Air Limbah B3'] || Math.round(item.sampelUji * 0.16);
        biaya = Math.round(biaya * 0.16);
      }

      return {
        ...item,
        sampelUji: sampel,
        biayaRetribusiRp: biaya,
        biayaRetribusiJuta: Math.round(biaya / 1_000_000),
      };
    });
  }, [datasetTahun8, filterJenis8]);

  const totalSampelUji = useMemo(() => {
    return dataCard8.reduce((sum, item) => sum + item.sampelUji, 0);
  }, [dataCard8]);

  const totalBiayaLab = useMemo(() => {
    return dataCard8.reduce((sum, item) => sum + item.biayaRetribusiRp, 0);
  }, [dataCard8]);

  return (
    <div className="space-y-5 font-sans">
      {/* 
        GRID 2 KOLOM, 4 BARIS = TOTAL 8 KARTU
        Baris 1-3 sisi air, Baris 3-4 sisi limbah
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5 sm:gap-5">

        {/* ================================================================= */}
        {/* BARIS 1 - KARTU 1: Volume Air Baku, Air Curah, dan Penyediaan ke Industri */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                  Volume Air Baku, Air Curah, &amp; Penyediaan ke Industri
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Air Baku (Juta m³)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#94a3b8]" />
                    <span>Air Curah (Juta m³)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1 bg-[#10b981]" />
                    <span>Batamindo (Ribu m³)</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filter */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatDecimal(totalAirBakuTahun1 / 1_000_000, 2)} Juta m³
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    Total Air Baku {filterTahun1}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200 mt-1">
                  {[2026, 2025].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setFilterTahun1(yr)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        filterTahun1 === yr
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={dataCard1}
                  margin={{ top: 12, right: 14, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                    domain={[0, 16]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10, fill: '#10b981' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}k`}
                    domain={[250, 420]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as BakuCurahBatamindoRecord & {
                        airBakuJutaM3: number;
                        airCurahJutaM3: number;
                        penyediaanBatamindoRibuM3: number;
                      };
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {label} {filterTahun1} &bull; <span className="text-blue-300 font-mono">{d.nomorBA}</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Volume Air Baku:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {formatNumber(d.airBakuM3)} m³
                            </span>
                            <span className="text-slate-300">Volume Air Curah:</span>
                            <span className="font-mono font-bold text-right text-slate-300">
                              {formatNumber(d.airCurahM3)} m³
                            </span>
                            <span className="text-slate-300">Penyediaan Batamindo:</span>
                            <span className="font-mono font-bold text-right text-emerald-300">
                              {formatNumber(d.penyediaanBatamindoM3)} m³
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="airBakuJutaM3"
                    name="Volume Air Baku"
                    fill="#2563eb"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={18}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="airCurahJutaM3"
                    name="Volume Air Curah"
                    fill="#94a3b8"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={18}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="penyediaanBatamindoRibuM3"
                    name="Penyediaan Batamindo"
                    stroke="#10b981"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Rekapitulasi Volume Air Baku, Air Curah, &amp; Penyediaan Batamindo
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <span className="font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300">
                Tertutup
              </span>
              <span className="font-bold px-1.5 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200">
                Terbuka
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 1 - KARTU 2: Non Revenue Water (NRW) */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-blue-600 shrink-0" />
                  Non Revenue Water (NRW)
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1 bg-[#2563eb]" />
                    <span>Realisasi 2026 (%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1 bg-[#94a3b8]" />
                    <span>Realisasi 2025 (%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 border-t border-dashed border-red-500" />
                    <span className="text-red-500 font-semibold">Batas Target (25%)</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filter */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight flex items-center justify-end gap-1.5">
                    <span>{formatDecimal(latestNrwItem.tahun2026, 1)}%</span>
                    <span
                      className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        latestNrwItem.deltaVsPrevQ <= 0
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {latestNrwItem.deltaVsPrevQ <= 0 ? (
                        <TrendingDown className="w-3 h-3 mr-0.5 text-emerald-600 inline" />
                      ) : (
                        <TrendingUp className="w-3 h-3 mr-0.5 text-amber-600 inline" />
                      )}
                      {latestNrwItem.deltaVsPrevQ > 0 ? '+' : ''}
                      {formatDecimal(latestNrwItem.deltaVsPrevQ, 1)}%
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    NRW Triwulan Terakhir vs Sebelumnya
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200 mt-1">
                  {[
                    { id: '2026', label: '2026' },
                    { id: '2025', label: '2025' },
                    { id: 'komparasi', label: 'Komparasi' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFilterTahun2(opt.id)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        filterTahun2 === opt.id
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataCard2}
                  margin={{ top: 12, right: 16, left: -14, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="triwulan"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    domain={[21, 28]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {label} &bull; Batas Ambang 25.0%
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">NRW 2026:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {formatDecimal(d.nrw2026, 1)}%
                            </span>
                            <span className="text-slate-300">NRW 2025:</span>
                            <span className="font-mono font-bold text-right text-slate-300">
                              {formatDecimal(d.nrw2025, 1)}%
                            </span>
                            <span className="text-slate-300">Delta vs Q Lalu:</span>
                            <span
                              className={`font-mono font-bold text-right ${
                                d.deltaVsPrevQ <= 0 ? 'text-emerald-400' : 'text-amber-400'
                              }`}
                            >
                              {d.deltaVsPrevQ > 0 ? '+' : ''}
                              {formatDecimal(d.deltaVsPrevQ, 1)}%
                            </span>
                          </div>
                          {d.catatan && (
                            <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800">
                              {d.catatan}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine
                    y={25.0}
                    stroke="#ef4444"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'Target ≤ 25%',
                      fill: '#ef4444',
                      fontSize: 10,
                      position: 'insideTopRight',
                    }}
                  />
                  {(filterTahun2 === '2026' || filterTahun2 === 'komparasi') && (
                    <Line
                      type="monotone"
                      dataKey="nrw2026"
                      name="Realisasi 2026"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                  )}
                  {(filterTahun2 === '2025' || filterTahun2 === 'komparasi') && (
                    <Line
                      type="monotone"
                      dataKey="nrw2025"
                      name="Realisasi 2025"
                      stroke="#94a3b8"
                      strokeWidth={2.2}
                      strokeDasharray={filterTahun2 === 'komparasi' ? '3 3' : undefined}
                      dot={{ r: 3.5, fill: '#94a3b8', strokeWidth: 1.5, stroke: '#fff' }}
                      activeDot={{ r: 5 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Rekapitulasi Non Revenue Water (Terbuka, pertriwulan)
            </span>
            <span className="font-bold px-1.5 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200 shrink-0 ml-2">
              Terbuka
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 2 - KARTU 3: Volume Air Baca dan Pelanggan per DMZ */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  Volume Air Baca &amp; Pelanggan per DMZ
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Volume Air Baca (Ribu m³) - Top 10 DMZ</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filters */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatDecimal(totalAirBacaCard3 / 1_000_000, 2)} Juta m³
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    {formatNumber(totalPelangganCard3)} Pelanggan Aktif
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {/* Filter Tahun */}
                  <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
                    {[2026, 2025].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setFilterTahun3(yr)}
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                          filterTahun3 === yr
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>

                  {/* Filter Kategori */}
                  <select
                    value={filterKategori3}
                    onChange={(e) => setFilterKategori3(e.target.value)}
                    className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="Rumah Tangga">Rumah Tangga</option>
                    <option value="Niaga">Niaga</option>
                    <option value="Industri">Industri</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chart Container - Horizontal Bar */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard3}
                  layout="vertical"
                  margin={{ top: 8, right: 18, left: 35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="dmz"
                    tick={{ fontSize: 9.5, fill: '#334155' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as DmzAirBacaRecord;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {d.dmz} &bull; <span className="text-blue-300">{d.kpp}</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Volume Baca:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {formatNumber(d.volumeAirBacaM3)} m³
                            </span>
                            <span className="text-slate-300">Volume Tagih:</span>
                            <span className="font-mono font-bold text-right text-slate-300">
                              {formatNumber(d.volumeTagihM3)} m³
                            </span>
                            <span className="text-slate-300">Selisih (Baca vs Tagih):</span>
                            <span className="font-mono font-bold text-right text-amber-300">
                              {formatDecimal(d.selisihPersen, 1)}%
                            </span>
                            <span className="text-slate-300">Jumlah Pelanggan:</span>
                            <span className="font-mono font-bold text-right text-emerald-300">
                              {formatNumber(d.jumlahPelanggan)} SL
                            </span>
                            <span className="text-slate-300">Kategori:</span>
                            <span className="font-semibold text-right text-slate-200">
                              {d.kategori}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="volumeAirBacaRibuM3"
                    name="Volume Air Baca"
                    fill="#2563eb"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Volume Air Baca, Pelanggan per DMZ &amp; Konsumsi Pelanggan
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <span className="font-bold px-1.5 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200">
                Terbuka
              </span>
              <span className="font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300">
                Tertutup
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 2 - KARTU 4: Kapasitas Produksi dan Pemakaian Air Baku per WTP */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-blue-600 shrink-0" />
                  Kapasitas Produksi &amp; Pemakaian per WTP
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#94a3b8]" />
                    <span>Kapasitas Terpasang (L/dtk)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Pemakaian Air Baku (L/dtk)</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filters */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatNumber(totalKapasitasTerpasangWtp)} L/dtk
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    Utilisasi Rata-rata {formatDecimal(avgUtilisasiWtp, 1)}%
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {/* Filter Tahun */}
                  <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
                    {[2026, 2025].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setFilterTahun4(yr)}
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                          filterTahun4 === yr
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>

                  {/* Filter Periode / Semester */}
                  <select
                    value={filterPeriode4}
                    onChange={(e) => setFilterPeriode4(e.target.value)}
                    className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chart Container - Horizontal Clustered Bar */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard4}
                  layout="vertical"
                  margin={{ top: 8, right: 18, left: 30, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="wtp"
                    tick={{ fontSize: 9.5, fill: '#334155' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    width={105}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as WtpProduksiRecord;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {d.wtp} &bull; <span className="text-slate-300 font-normal">{d.periode}</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Kapasitas Terpasang:</span>
                            <span className="font-mono font-bold text-right text-slate-300">
                              {formatNumber(d.kapasitasTerpasangLps)} L/dtk
                            </span>
                            <span className="text-slate-300">Pemakaian Air Baku:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {formatNumber(d.pemakaianAirBakuLps)} L/dtk
                            </span>
                            <span className="text-slate-300">Tingkat Utilisasi:</span>
                            <span className="font-mono font-bold text-right text-emerald-300">
                              {formatDecimal(d.utilisasiPersen, 1)}%
                            </span>
                            <span className="text-slate-300">Teknologi:</span>
                            <span className="text-right text-slate-200 font-semibold truncate">
                              {d.teknologi}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="kapasitasTerpasangLps"
                    name="Kapasitas Terpasang"
                    fill="#94a3b8"
                    radius={[0, 3, 3, 0]}
                    maxBarSize={14}
                  />
                  <Bar
                    dataKey="pemakaianAirBakuLps"
                    name="Pemakaian Air Baku"
                    fill="#2563eb"
                    radius={[0, 3, 3, 0]}
                    maxBarSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Kapasitas Produksi IPA Bersih &amp; Pemakaian Air Baku di Batam
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <span className="font-bold px-1.5 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200">
                Terbuka
              </span>
              <span className="font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300">
                Tertutup
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 3 - KARTU 5: Kapasitas Tampung Waduk */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-blue-600 shrink-0" />
                  Kapasitas Tampung Waduk
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Daya Tampung Efektif (Juta m³)</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filter */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatDecimal(totalKapasitasWaduk, 1)} Juta m³
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    {dataCard5.length} Waduk Utama BP Batam
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200 mt-1">
                  {[2026, 2025, 2024, 2023].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setFilterTahun5(yr)}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        filterTahun5 === yr
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Container - Horizontal Bar */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard5}
                  layout="vertical"
                  margin={{ top: 8, right: 18, left: 30, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                    domain={[0, 90]}
                  />
                  <YAxis
                    type="category"
                    dataKey="namaWaduk"
                    tick={{ fontSize: 9.5, fill: '#334155' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as WadukKapasitasRecord;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {d.namaWaduk} &bull; <span className="text-blue-300">Tahun {d.tahun}</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Daya Tampung:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {formatDecimal(d.kapasitasJutaM3, 1)} Juta m³
                            </span>
                            <span className="text-slate-300">Luas Permukaan:</span>
                            <span className="font-mono font-bold text-right text-emerald-300">
                              {formatNumber(d.luasPermukaanHa)} Ha
                            </span>
                            <span className="text-slate-300">Elevasi Muka Air:</span>
                            <span className="font-mono font-bold text-right text-slate-200">
                              +{formatDecimal(d.elevasiMukaAirM, 1)} m
                            </span>
                            <span className="text-slate-300">Status Operasi:</span>
                            <span className="font-semibold text-right text-slate-300">
                              {d.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800">
                            Periode Rekap: {d.periodeRekap}
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="kapasitasJutaM3"
                    name="Kapasitas Tampung (Juta m³)"
                    fill="#2563eb"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Kapasitas Tampung Waduk &amp; Luas Permukaan Genangan
            </span>
            <span className="font-bold px-1.5 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200 shrink-0 ml-2">
              Terbuka
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 3 - KARTU 6: Pengolahan Limbah B3 di KPLI (Limbah B3) */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Skull className="w-4 h-4 text-blue-600 shrink-0" />
                  Pengolahan Limbah B3 di KPLI
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Padat</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#38bdf8]" />
                    <span>Sludge</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#94a3b8]" />
                    <span>Cair</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1 bg-[#10b981]" />
                    <span>% Diolah (Kanan)</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filter */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatNumber(totalBeratLimbahB3)} Ton
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    Rata-rata Diolah {formatDecimal(avgPersenDiolahB3, 1)}%
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200 mt-1">
                  {[2026, 2025].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setFilterTahun6(yr)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                        filterTahun6 === yr
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Container - Stacked Column + Garis Sumbu Kanan */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={dataCard6}
                  margin={{ top: 12, right: 14, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                    domain={[0, 1700]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10, fill: '#10b981' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[95, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as LimbahB3KpliRecord;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {label} {filterTahun6} &bull; <span className="text-emerald-300 font-mono">{formatDecimal(d.persenDiolah, 1)}% Diolah</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Limbah Padat:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {formatNumber(d.padatTon)} Ton
                            </span>
                            <span className="text-slate-300">Sludge B3:</span>
                            <span className="font-mono font-bold text-right text-sky-300">
                              {formatNumber(d.sludgeTon)} Ton
                            </span>
                            <span className="text-slate-300">Limbah Cair:</span>
                            <span className="font-mono font-bold text-right text-slate-300">
                              {formatNumber(d.cairTon)} Ton
                            </span>
                            <span className="text-slate-300 font-bold">Total Masuk KPLI:</span>
                            <span className="font-mono font-bold text-right text-white">
                              {formatNumber(d.totalTon)} Ton
                            </span>
                          </div>
                          <p className="text-[10px] text-blue-200 pt-1 border-t border-slate-800">
                            Penghasil Terbanyak: <span className="font-semibold">{d.perusahaanTerbanyak}</span>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine
                    yAxisId="right"
                    y={98.0}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Target 98%',
                      fill: '#f59e0b',
                      fontSize: 9.5,
                      position: 'insideTopLeft',
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="padatTon"
                    name="Limbah Padat"
                    stackId="limbah"
                    fill="#2563eb"
                    maxBarSize={22}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="sludgeTon"
                    name="Sludge B3"
                    stackId="limbah"
                    fill="#38bdf8"
                    maxBarSize={22}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="cairTon"
                    name="Limbah Cair"
                    stackId="limbah"
                    fill="#94a3b8"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={22}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="persenDiolah"
                    name="% Ditangani / Diolah"
                    stroke="#10b981"
                    strokeWidth={2.4}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Berat Limbah B3 &amp; Persentase Limbah B3 yang Ditangani/Diolah
            </span>
            <span className="font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300 shrink-0 ml-2">
              Tertutup
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 4 - KARTU 7: Layanan Limbah Domestik (Limbah Domestik) */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  Layanan Limbah Domestik
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Limbah Domestik Umum</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#0284c7]" />
                    <span>Sumur Tinja Warga</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#94a3b8]" />
                    <span>Aset BP Batam</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filters */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatNumber(totalPesananDomestik)} Pesanan
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    Total Volume {formatNumber(totalVolumeDomestik)} m³
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {/* Filter Tahun */}
                  <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
                    {[2026, 2025].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setFilterTahun7(yr)}
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                          filterTahun7 === yr
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>

                  {/* Filter Zona */}
                  <select
                    value={filterZona7}
                    onChange={(e) => setFilterZona7(e.target.value)}
                    className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">Semua Zona</option>
                    <option value="Zona Batam Centre">Zona Batam Centre</option>
                    <option value="Zona Sekupang">Zona Sekupang</option>
                    <option value="Zona Batu Aji">Zona Batu Aji</option>
                    <option value="Zona Nongsa">Zona Nongsa</option>
                    <option value="Zona Bengkong">Zona Bengkong</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chart Container - Clustered Column per Bulan */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard7}
                  margin={{ top: 12, right: 14, left: -14, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as LayananLimbahDomestikRecord;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {label} {filterTahun7} &bull; <span className="text-blue-300 font-mono">{d.totalPesanan} Pesanan</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Limbah Domestik Umum:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {d.limbahDomestikUmum} Order
                            </span>
                            <span className="text-slate-300">Pengurasan Sumur Tinja:</span>
                            <span className="font-mono font-bold text-right text-sky-300">
                              {d.pengurasanSumurTinja} Order
                            </span>
                            <span className="text-slate-300">Aset BP Batam:</span>
                            <span className="font-mono font-bold text-right text-slate-300">
                              {d.pengurasanAsetBpBatam} Order
                            </span>
                            <span className="text-slate-300 font-bold">Total Volume:</span>
                            <span className="font-mono font-bold text-right text-white">
                              {formatNumber(d.totalVolumeM3)} m³ ({d.trip} Trip)
                            </span>
                            <span className="text-slate-300 font-bold">Penerimaan:</span>
                            <span className="font-mono font-bold text-right text-emerald-300">
                              {formatRupiahShort(d.jumlahRupiah)}
                            </span>
                          </div>
                          <p className="text-[10px] text-blue-200 pt-1 border-t border-slate-800">
                            Zona Terbanyak: <span className="font-semibold">{d.zonaTerbanyak}</span>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="limbahDomestikUmum"
                    name="Domestik Umum"
                    fill="#2563eb"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={14}
                  />
                  <Bar
                    dataKey="pengurasanSumurTinja"
                    name="Pengurasan Tinja"
                    fill="#0284c7"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={14}
                  />
                  <Bar
                    dataKey="pengurasanAsetBpBatam"
                    name="Aset BP Batam"
                    fill="#94a3b8"
                    radius={[2, 2, 0, 0]}
                    maxBarSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Pemesanan Layanan Domestik Umum, Pengurasan Tinja, &amp; Aset BP Batam
            </span>
            <span className="font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300 shrink-0 ml-2">
              Tertutup
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 4 - KARTU 8: Layanan Pengujian Laboratorium (Laboratorium) */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between transition-all hover:shadow-xs">
          <div>
            {/* Header: Title & Big Summary Metric */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-blue-600 shrink-0" />
                  Layanan Pengujian Laboratorium
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-2xs bg-[#2563eb]" />
                    <span>Sampel Uji (Kiri)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-1 bg-[#10b981]" />
                    <span>Biaya Retribusi (Juta Rp - Kanan)</span>
                  </div>
                </div>
              </div>

              {/* Summary Metric & Filters */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black font-mono text-slate-900 leading-tight">
                    {formatNumber(totalSampelUji)} Sampel Uji
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold">
                    {formatRupiahShort(totalBiayaLab)} Retribusi
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {/* Filter Tahun */}
                  <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
                    {[2026, 2025].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setFilterTahun8(yr)}
                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                          filterTahun8 === yr
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>

                  {/* Filter Jenis Pengujian */}
                  <select
                    value={filterJenis8}
                    onChange={(e) => setFilterJenis8(e.target.value)}
                    className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">Semua Jenis Uji</option>
                    <option value="Fisika-Kimia Air">Fisika-Kimia Air</option>
                    <option value="Mikrobiologi Air">Mikrobiologi Air</option>
                    <option value="Uji Air Limbah B3">Air Limbah B3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chart Container - Column + Garis Sumbu Kanan */}
            <div className="h-64 sm:h-72 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={dataCard8}
                  margin={{ top: 12, right: 14, left: -14, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                    domain={[0, 220]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10, fill: '#10b981' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 180]}
                    tickFormatter={(v) => `${v}Jt`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const d = payload[0].payload as PengujianLabRecord & { biayaRetribusiJuta: number };
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-md text-xs font-sans space-y-1">
                          <p className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                            {label} {filterTahun8} &bull; <span className="text-blue-300 font-mono">{d.sampelUji} Sampel</span>
                          </p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5 text-[11px]">
                            <span className="text-slate-300">Jumlah Sampel Uji:</span>
                            <span className="font-mono font-bold text-right text-blue-300">
                              {d.sampelUji} Sampel
                            </span>
                            <span className="text-slate-300">Biaya Retribusi:</span>
                            <span className="font-mono font-bold text-right text-emerald-300">
                              {formatRupiahShort(d.biayaRetribusiRp)}
                            </span>
                            <span className="text-slate-300">Uji Terbanyak:</span>
                            <span className="text-right text-slate-200 font-semibold truncate">
                              {d.jenisTerbanyak}
                            </span>
                          </div>
                          <p className="text-[10px] text-blue-200 pt-1 border-t border-slate-800">
                            Pemesan Terbanyak: <span className="font-semibold">{d.perusahaanTerbanyak}</span>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="sampelUji"
                    name="Sampel Uji"
                    fill="#2563eb"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={20}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="biayaRetribusiJuta"
                    name="Biaya Retribusi (Juta Rp)"
                    stroke="#10b981"
                    strokeWidth={2.4}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="truncate">
              Dataset: Jumlah Pemesanan Uji Lab BP Batam &amp; Data Pemakaian Fasilitas Lab
            </span>
            <span className="font-bold px-1.5 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300 shrink-0 ml-2">
              Tertutup
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
