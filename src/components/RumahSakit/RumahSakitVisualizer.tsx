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
  PieChart,
  Pie,
  Cell,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import {
  RSBP_BATAM_DATA,
  KunjunganBulananItem,
  IndikatorEfisiensiItem,
  PasienKeluarItem,
  ResepDispensItem,
  PorsiMakananItem,
  LayananUnggulanItem,
} from './rsbpVisualizerData';
import { SheetSwapToggle } from '../SheetSwapToggle';
import {
  HeartPulse,
  Activity,
  Award,
  FileSpreadsheet,
  Users,
  Pill,
  DollarSign,
  Utensils,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
} from 'lucide-react';

// Format angka Indonesia
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(Math.round(num));
};

// Format Rupiah ringkas
const formatRupiahMiliar = (val: number): string => {
  return `Rp ${val.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} M`;
};

export const RumahSakitVisualizer: React.FC = () => {
  // Sheet Swap View Modes
  const [k1ViewMode, setK1ViewMode] = useState<'chart' | 'table'>('chart');
  const [k2ViewMode, setK2ViewMode] = useState<'chart' | 'table'>('chart');
  const [k3ViewMode, setK3ViewMode] = useState<'chart' | 'table'>('chart');
  const [k4ViewMode, setK4ViewMode] = useState<'chart' | 'table'>('chart');
  const [k5ViewMode, setK5ViewMode] = useState<'chart' | 'table'>('chart');
  const [k6ViewMode, setK6ViewMode] = useState<'chart' | 'table'>('chart');
  const [k7ViewMode, setK7ViewMode] = useState<'chart' | 'table'>('chart');
  const [k8ViewMode, setK8ViewMode] = useState<'chart' | 'table'>('chart');
  const [k9ViewMode, setK9ViewMode] = useState<'chart' | 'table'>('chart');
  const [k10ViewMode, setK10ViewMode] = useState<'chart' | 'table'>('chart');

  // Global / Card-Specific Filters
  // Kartu 1: Kunjungan Pasien per Bulan
  const [tahunKunjungan, setTahunKunjungan] = useState<number>(2026);
  const [filterBagianLayanan1, setFilterBagianLayanan1] = useState<string>('all');

  // Kartu 2: Komposisi Pasien (Dimensi toggle: Cara Bayar / Gender)
  const [dimensiKomposisi, setDimensiKomposisi] = useState<'caraBayar' | 'gender'>('caraBayar');
  const [filterJenisKunjungan2, setFilterJenisKunjungan2] = useState<string>('all');

  // Kartu 3: Layanan Unggulan
  const [tahunUnggulan, setTahunUnggulan] = useState<number>(2026);
  const [filterPeriodeUnggulan, setFilterPeriodeUnggulan] = useState<'all' | 'sem1' | 'sem2'>('all');

  // Kartu 4: 10 Penyakit Terbanyak
  const [jenisRawatPenyakit, setJenisRawatPenyakit] = useState<'Rawat Jalan' | 'Rawat Inap'>('Rawat Jalan');

  // Kartu 5: Indikator Efisiensi Rumah Sakit
  const [tahunEfisiensi, setTahunEfisiensi] = useState<number>(2026);
  const [indikatorAktif, setIndikatorAktif] = useState<'bor' | 'alos' | 'toi' | 'bto' | 'gdr' | 'ndr'>('bor');

  // Kartu 6: Lama Dirawat dan Cara Pasien Keluar
  const [tahunPasienKeluar, setTahunPasienKeluar] = useState<number>(2026);

  // Kartu 7: Tenaga Rumah Sakit
  const [tahunTenaga, setTahunTenaga] = useState<number>(2026);

  // Kartu 8: Resep Dispens Obat
  const [tahunResep, setTahunResep] = useState<number>(2026);
  const [modeTampilanResep, setModeTampilanResep] = useState<'instalasi' | 'golongan'>('instalasi');

  // Kartu 9: Realisasi Belanja
  // 5 tahun clustered column (2022 - 2026)

  // Kartu 10: Porsi Makanan Pasien
  const [tahunMakanan, setTahunMakanan] = useState<number>(2026);

  // =========================================================================
  // KARTU 1: KUNJUNGAN PASIEN PER BULAN
  // =========================================================================
  const dataKunjungan = useMemo(() => {
    return tahunKunjungan === 2026
      ? RSBP_BATAM_DATA.kunjunganPasien.tahun2026
      : RSBP_BATAM_DATA.kunjunganPasien.tahun2025;
  }, [tahunKunjungan]);

  const totalKunjunganTahun = useMemo(() => {
    return dataKunjungan.reduce((acc, curr) => acc + curr.total, 0);
  }, [dataKunjungan]);

  const totalKunjungan2025 = useMemo(() => {
    return RSBP_BATAM_DATA.kunjunganPasien.tahun2025.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  const totalKunjungan2026 = useMemo(() => {
    return RSBP_BATAM_DATA.kunjunganPasien.tahun2026.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  const growthKunjunganYoY = useMemo(() => {
    return (((totalKunjungan2026 - totalKunjungan2025) / totalKunjungan2025) * 100).toFixed(1);
  }, [totalKunjungan2026, totalKunjungan2025]);

  // =========================================================================
  // KARTU 2: KOMPOSISI PASIEN
  // =========================================================================
  const dataKomposisi = useMemo(() => {
    if (dimensiKomposisi === 'caraBayar') {
      return RSBP_BATAM_DATA.komposisiPasien.caraBayar;
    }
    return RSBP_BATAM_DATA.komposisiPasien.jenisKelamin;
  }, [dimensiKomposisi]);

  const persenJaminan = useMemo(() => {
    // Total jaminan = 100% - out-of-pocket (5.0%) = 95.0%
    const umum = RSBP_BATAM_DATA.komposisiPasien.caraBayar.find((c) => c.label.includes('Umum'))?.persen || 5.0;
    return (100 - umum).toFixed(1);
  }, []);

  // =========================================================================
  // KARTU 3: KUNJUNGAN PER LAYANAN UNGGULAN
  // =========================================================================
  const dataLayananUnggulan = useMemo(() => {
    const raw = RSBP_BATAM_DATA.layananUnggulan.items;
    let factor = tahunUnggulan === 2026 ? 1 : 0.86;
    if (filterPeriodeUnggulan === 'sem1') factor *= 0.49;
    if (filterPeriodeUnggulan === 'sem2') factor *= 0.51;

    return raw
      .map((item) => ({
        ...item,
        kasusAktif: Math.round(item.jumlahKasus * factor),
      }))
      .sort((a, b) => b.kasusAktif - a.kasusAktif);
  }, [tahunUnggulan, filterPeriodeUnggulan]);

  const topLayanan = dataLayananUnggulan[0];

  // =========================================================================
  // KARTU 4: 10 PENYAKIT TERBANYAK (ICD-10)
  // =========================================================================
  const dataTopPenyakit = useMemo(() => {
    const list =
      jenisRawatPenyakit === 'Rawat Jalan'
        ? RSBP_BATAM_DATA.topPenyakit.rawatJalan
        : RSBP_BATAM_DATA.topPenyakit.rawatInap;
    return [...list].sort((a, b) => b.jumlahKasus - a.jumlahKasus);
  }, [jenisRawatPenyakit]);

  const rank1Penyakit = dataTopPenyakit[0];

  // =========================================================================
  // KARTU 5: INDIKATOR EFISIENSI RUMAH SAKIT
  // =========================================================================
  const dataEfisiensi = useMemo(() => {
    return tahunEfisiensi === 2026
      ? RSBP_BATAM_DATA.indikatorEfisiensi.tahun2026
      : RSBP_BATAM_DATA.indikatorEfisiensi.tahun2025;
  }, [tahunEfisiensi]);

  const infoIndikator = RSBP_BATAM_DATA.indikatorEfisiensi.standarKemenkes[indikatorAktif];
  const lastBulanEfisiensi = dataEfisiensi[dataEfisiensi.length - 1];
  const lastBorValue = lastBulanEfisiensi ? lastBulanEfisiensi.bor : 79.4;
  const isBorIdeal = lastBorValue >= 60 && lastBorValue <= 85;

  // =========================================================================
  // KARTU 6: LAMA DIRAWAT DAN CARA PASIEN KELUAR
  // =========================================================================
  const dataPasienKeluar = useMemo(() => {
    return tahunPasienKeluar === 2026
      ? RSBP_BATAM_DATA.lamaDirawatCaraKeluar.tahun2026
      : RSBP_BATAM_DATA.lamaDirawatCaraKeluar.tahun2026.map((item) => ({
          ...item,
          sembuh: Math.round(item.sembuh * 0.93),
          pulangAps: Math.round(item.pulangAps * 0.95),
          dirujuk: Math.round(item.dirujuk * 0.96),
          meninggalTotal: Math.round(item.meninggalTotal * 0.97),
          totalHariRawat: Math.round(item.totalHariRawat * 0.94),
          totalPasienKeluar: Math.round(item.totalPasienKeluar * 0.93),
          rataLamaRawatHari: Number((item.rataLamaRawatHari + 0.1).toFixed(1)),
        }));
  }, [tahunPasienKeluar]);

  const rataAlosTahunan = useMemo(() => {
    const totalHari = dataPasienKeluar.reduce((sum, d) => sum + d.totalHariRawat, 0);
    const totalPasien = dataPasienKeluar.reduce((sum, d) => sum + d.totalPasienKeluar, 0);
    return totalPasien > 0 ? (totalHari / totalPasien).toFixed(2) : '4.2';
  }, [dataPasienKeluar]);

  // =========================================================================
  // KARTU 7: TENAGA RUMAH SAKIT
  // =========================================================================
  const dataTenaga = useMemo(() => {
    return tahunTenaga === 2026
      ? RSBP_BATAM_DATA.tenagaRumahSakit.tahun2026
      : RSBP_BATAM_DATA.tenagaRumahSakit.tahun2025;
  }, [tahunTenaga]);

  // =========================================================================
  // KARTU 8: RESEP DISPENS OBAT
  // =========================================================================
  const dataResep = useMemo(() => {
    return tahunResep === 2026
      ? RSBP_BATAM_DATA.resepDispensObat.tahun2026
      : RSBP_BATAM_DATA.resepDispensObat.tahun2026.map((d) => ({
          ...d,
          rawatJalan: Math.round(d.rawatJalan * 0.91),
          rawatInap: Math.round(d.rawatInap * 0.92),
          gawatDarurat: Math.round(d.gawatDarurat * 0.93),
          totalResep: Math.round(d.totalResep * 0.915),
          resepGenerik: Math.round(d.resepGenerik * 0.91),
          resepNonGenerik: Math.round(d.resepNonGenerik * 0.94),
        }));
  }, [tahunResep]);

  const totalResepTahunan = useMemo(() => {
    return dataResep.reduce((sum, d) => sum + d.totalResep, 0);
  }, [dataResep]);

  const avgPersenGenerik = useMemo(() => {
    const gen = dataResep.reduce((sum, d) => sum + d.resepGenerik, 0);
    return totalResepTahunan > 0 ? ((gen / totalResepTahunan) * 100).toFixed(1) : '83.5';
  }, [dataResep, totalResepTahunan]);

  // =========================================================================
  // KARTU 9: REALISASI BELANJA TERHADAP PAGU DAN PROYEKSI
  // =========================================================================
  const dataKeuangan5Tahun = RSBP_BATAM_DATA.keuanganBelanja5Tahun.items;
  const lastKeuangan = dataKeuangan5Tahun[dataKeuangan5Tahun.length - 1];
  const isSerapanTinggi = lastKeuangan.persenRealisasi >= 90;

  // =========================================================================
  // KARTU 10: PORSI MAKANAN PASIEN
  // =========================================================================
  const dataMakanan = useMemo(() => {
    return tahunMakanan === 2026
      ? RSBP_BATAM_DATA.porsiMakanan.tahun2026
      : RSBP_BATAM_DATA.porsiMakanan.tahun2025;
  }, [tahunMakanan]);

  const totalPorsiTahunan = useMemo(() => {
    return dataMakanan.reduce((sum, d) => sum + d.totalPorsi, 0);
  }, [dataMakanan]);

  const avgPorsiPerHari = useMemo(() => {
    const avg = dataMakanan.reduce((sum, d) => sum + d.rataPerHari, 0) / dataMakanan.length;
    return Math.round(avg);
  }, [dataMakanan]);

  return (
    <div className="space-y-4">
      {/* GRID 2 KOLOM: TOTAL 5 BARIS, 10 KARTU */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

        {/* ================================================================= */}
        {/* BARIS 1 - KARTU 1: Kunjungan Pasien per Bulan                      */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Kunjungan Pasien per Bulan</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Volume pasien terdaftar rawat jalan, rawat inap, dan IGD 24 jam
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {formatNumber(totalKunjunganTahun)}
                  <span className="text-xs font-normal text-slate-500 ml-1">Pasien</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1 flex items-center sm:justify-end gap-1">
                  <span>+{growthKunjunganYoY}% vs Tahun Lalu</span>
                  <span className="text-[10px] text-slate-400 font-normal">(YoY)</span>
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 1 */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Filter:</span>
                <select
                  value={tahunKunjungan}
                  onChange={(e) => setTahunKunjungan(Number(e.target.value))}
                  aria-label="Filter Tahun Kunjungan Pasien"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                >
                  <option value={2026}>Tahun 2026 (Berjalan)</option>
                  <option value={2025}>Tahun 2025</option>
                </select>

                <select
                  value={filterBagianLayanan1}
                  onChange={(e) => setFilterBagianLayanan1(e.target.value)}
                  aria-label="Filter Bagian Layanan"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-medium text-slate-700 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="all">Semua Bagian Layanan</option>
                  <option value="rawatJalan">Rawat Jalan Saja</option>
                  <option value="rawatInap">Rawat Inap Saja</option>
                  <option value="igd">IGD Saja</option>
                </select>

                <SheetSwapToggle mode={k1ViewMode} onChange={setK1ViewMode} />
              </div>

              {/* Legenda Ringkas */}
              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span>R. Jalan</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                  <span>R. Inap</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" />
                  <span>IGD</span>
                </div>
              </div>
            </div>

            {/* Visualisasi Stacked Column / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k1ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataKunjungan} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null;
                        const item = payload[0].payload as KunjunganBulananItem;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[210px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                              <span>Bulan {label} {tahunKunjungan}</span>
                              <span className="font-mono text-blue-600 font-black">{formatNumber(item.total)} Pasien</span>
                            </div>
                            <div className="space-y-1 pt-0.5 text-slate-600">
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-xs bg-[#2563eb]" />
                                  Rawat Jalan:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(item.rawatJalan)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-xs bg-[#0284c7]" />
                                  Rawat Inap:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(item.rawatInap)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-xs bg-[#38bdf8]" />
                                  IGD 24 Jam:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(item.igd)}</span>
                              </div>
                            </div>
                            <div className="bg-blue-50/70 p-1.5 rounded border border-blue-100 text-[11px] text-blue-900 mt-1">
                              <span className="font-bold">Klinik Terbanyak:</span> {item.bagianTerbanyak} ({formatNumber(item.jumlahBagianTerbanyak)} pasien)
                            </div>
                          </div>
                        );
                      }}
                    />
                    {(filterBagianLayanan1 === 'all' || filterBagianLayanan1 === 'rawatJalan') && (
                      <Bar dataKey="rawatJalan" name="Rawat Jalan" stackId="a" fill="#2563eb" />
                    )}
                    {(filterBagianLayanan1 === 'all' || filterBagianLayanan1 === 'rawatInap') && (
                      <Bar dataKey="rawatInap" name="Rawat Inap" stackId="a" fill="#0284c7" />
                    )}
                    {(filterBagianLayanan1 === 'all' || filterBagianLayanan1 === 'igd') && (
                      <Bar dataKey="igd" name="IGD 24 Jam" stackId="a" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Bulan</th>
                        <th className="px-3 py-2 text-right">Rawat Jalan</th>
                        <th className="px-3 py-2 text-right">Rawat Inap</th>
                        <th className="px-3 py-2 text-right">IGD 24 Jam</th>
                        <th className="px-3 py-2 text-right">Total Pasien</th>
                        <th className="px-3 py-2">Klinik Terbanyak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataKunjungan.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900">{item.bulan} {tahunKunjungan}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.rawatJalan)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.rawatInap)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.igd)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{formatNumber(item.total)}</td>
                          <td className="px-3 py-2 text-slate-600">
                            <span className="font-medium text-slate-800">{item.bagianTerbanyak}</span>{' '}
                            <span className="text-[10px] text-slate-400">({formatNumber(item.jumlahBagianTerbanyak)})</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.kunjunganPasien.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.kunjunganPasien.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.kunjunganPasien.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 1 - KARTU 2: Komposisi Pasien (Cara Bayar & Jenis Kelamin)   */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Komposisi Pasien</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Proporsi kepesertaan penjaminan biaya kesehatan &amp; profil demografi
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  66,8%
                  <span className="text-xs font-bold text-blue-600 ml-1">BPJS</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1">
                  (Total Terjamin {persenJaminan}%)
                </div>
              </div>
            </div>

            {/* Filter & Toggle Dimensi */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              {/* Toggle Dimensi: Cara Bayar vs Jenis Kelamin */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setDimensiKomposisi('caraBayar')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    dimensiKomposisi === 'caraBayar'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cara Bayar
                </button>
                <button
                  type="button"
                  onClick={() => setDimensiKomposisi('gender')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    dimensiKomposisi === 'gender'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Jenis Kelamin
                </button>
              </div>

              {/* Filter Jenis Kunjungan & SheetSwap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kunjungan:</span>
                  <select
                    value={filterJenisKunjungan2}
                    onChange={(e) => setFilterJenisKunjungan2(e.target.value)}
                    aria-label="Filter Jenis Kunjungan Komposisi"
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-medium text-slate-700 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value="all">Semua Kunjungan</option>
                    <option value="rawatJalan">Rawat Jalan</option>
                    <option value="rawatInap">Rawat Inap</option>
                    <option value="igd">IGD</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
              </div>
            </div>

            {/* Visualisasi Donut Chart + Legend Grid / Tabel Detail */}
            <div className="h-64 pt-1">
              {k2ViewMode === 'chart' ? (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center h-full">
                  <div className="sm:col-span-6 h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dataKomposisi}
                          dataKey="jumlah"
                          nameKey="label"
                          innerRadius={48}
                          outerRadius={75}
                          paddingAngle={3}
                        >
                          {dataKomposisi.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload || !payload.length) return null;
                            const item = payload[0].payload;
                            return (
                              <div className="bg-white p-2.5 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1">
                                <div className="font-bold text-slate-900">{item.label}</div>
                                <div className="font-mono text-blue-600 font-bold">
                                  {formatNumber(item.jumlah)} Pasien ({item.persen}%)
                                </div>
                              </div>
                            );
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Rincian Kategori di Samping */}
                  <div className="sm:col-span-6 space-y-1.5 overflow-y-auto max-h-56 pr-1">
                    {dataKomposisi.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded-lg bg-slate-50/80 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-1 truncate">
                          <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-700 font-medium truncate">{item.label}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-slate-900 text-xs">{item.persen}%</span>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {formatNumber(item.jumlah)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Kategori / Segmen</th>
                        <th className="px-3 py-2 text-right">Jumlah Pasien</th>
                        <th className="px-3 py-2 text-right">Persentase</th>
                        <th className="px-3 py-2 text-center">Status Jaminan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataKomposisi.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span>{item.label}</span>
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.jumlah)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{item.persen}%</td>
                          <td className="px-3 py-2 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {dimensiKomposisi === 'caraBayar' ? 'Terverifikasi' : 'Demografi RS'}
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

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.komposisiPasien.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.komposisiPasien.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.komposisiPasien.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 2 - KARTU 3: Kunjungan per Layanan Unggulan                 */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Kunjungan per Layanan Unggulan</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Centres of Excellence KEK Kesehatan Sekupang (sorted descending)
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {formatNumber(topLayanan?.kasusAktif || 0)}
                  <span className="text-xs font-normal text-slate-500 ml-1">Kasus</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1 truncate max-w-[220px]">
                  {topLayanan?.singkatan} ({topLayanan?.persen}%)
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 3 */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tahun:</span>
                <select
                  value={tahunUnggulan}
                  onChange={(e) => setTahunUnggulan(Number(e.target.value))}
                  aria-label="Filter Tahun Layanan Unggulan"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                >
                  <option value={2026}>Tahun 2026</option>
                  <option value={2025}>Tahun 2025</option>
                </select>

                <select
                  value={filterPeriodeUnggulan}
                  onChange={(e) => setFilterPeriodeUnggulan(e.target.value as any)}
                  aria-label="Filter Periode Layanan Unggulan"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-medium text-slate-700 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="all">Setahun Penuh</option>
                  <option value="sem1">Semester I</option>
                  <option value="sem2">Semester II</option>
                </select>

                <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
              </div>

              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                Rekap: {topLayanan?.rentangRekap}
              </span>
            </div>

            {/* Horizontal Bar Chart (Sorted Descending) / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k3ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataLayananUnggulan}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 35, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="singkatan"
                      tick={{ fontSize: 10.5, fill: '#334155', fontWeight: 600 }}
                      width={90}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d = payload[0].payload as LayananUnggulanItem & { kasusAktif: number };
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 max-w-[260px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              {d.namaLayanan}
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Jumlah Kasus:</span>
                              <span className="font-mono font-bold text-blue-600">{formatNumber(d.kasusAktif)} Kasus</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Pangsa Kunjungan:</span>
                              <span className="font-mono font-bold text-slate-800">{d.persen}%</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Pertumbuhan:</span>
                              <span className="font-mono font-bold text-emerald-600">+{d.pertumbuhanYoy}% YoY</span>
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 italic">
                              {d.keunggulanTeknis}
                            </div>
                            <div className="text-[10px] text-blue-500 font-mono">
                              Periode Rekap: {d.rentangRekap}
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="kasusAktif"
                      name="Jumlah Kasus"
                      fill="#2563eb"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Layanan Unggulan</th>
                        <th className="px-3 py-2 text-right">Kasus Aktif</th>
                        <th className="px-3 py-2 text-right">Pangsa (%)</th>
                        <th className="px-3 py-2 text-right">YoY (%)</th>
                        <th className="px-3 py-2">Keunggulan Klinis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataLayananUnggulan.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2">
                            <div className="font-semibold text-slate-900">{item.namaLayanan}</div>
                            <div className="text-[10px] font-mono text-blue-600 font-bold">{item.singkatan}</div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">{formatNumber(item.kasusAktif)}</td>
                          <td className="px-3 py-2 text-right font-mono text-blue-600 font-bold">{item.persen}%</td>
                          <td className="px-3 py-2 text-right font-mono text-emerald-600 font-bold">+{item.pertumbuhanYoy}%</td>
                          <td className="px-3 py-2 text-slate-600 max-w-[200px] truncate" title={item.keunggulanTeknis}>
                            {item.keunggulanTeknis}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.layananUnggulan.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.layananUnggulan.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.layananUnggulan.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 2 - KARTU 4: 10 Penyakit Terbanyak (Top 10 Morbidity ICD-10) */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>10 Penyakit Terbanyak</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Surveilans morbiditas utama pasien berdasar klasifikasi ICD-10
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {formatNumber(rank1Penyakit?.jumlahKasus || 0)}
                  <span className="text-xs font-normal text-slate-500 ml-1">Kasus</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1 truncate max-w-[240px]">
                  #1 {rank1Penyakit?.kodeIcd} - {rank1Penyakit?.namaPenyakit}
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 4 */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jenis Rawat:</span>
                <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setJenisRawatPenyakit('Rawat Jalan')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      jenisRawatPenyakit === 'Rawat Jalan'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Rawat Jalan
                  </button>
                  <button
                    type="button"
                    onClick={() => setJenisRawatPenyakit('Rawat Inap')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      jenisRawatPenyakit === 'Rawat Inap'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Rawat Inap
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  Top 10 ICD-10 Kemenkes
                </span>
                <SheetSwapToggle mode={k4ViewMode} onChange={setK4ViewMode} />
              </div>
            </div>

            {/* Horizontal Bar Top 10 Penyakit / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k4ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataTopPenyakit}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 30, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="kodeIcd"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 700, fontFamily: 'monospace' }}
                      width={50}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const p = payload[0].payload as any;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 max-w-[270px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              <span className="font-mono text-blue-600 mr-1">[{p.kodeIcd}]</span>
                              {p.namaPenyakit}
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Jenis Pelayanan:</span>
                              <span className="font-medium text-slate-800">{p.jenisRawat}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Jumlah Kasus:</span>
                              <span className="font-mono font-bold text-blue-600">{formatNumber(p.jumlahKasus)} Pasien</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Proporsi:</span>
                              <span className="font-mono font-bold text-slate-800">{p.persen}%</span>
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 italic">
                              {p.keteranganKlinis}
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey="jumlahKasus"
                      name="Kasus Penyakit"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2 text-center">No</th>
                        <th className="px-3 py-2">Kode ICD</th>
                        <th className="px-3 py-2">Nama Diagnosis / Morbiditas</th>
                        <th className="px-3 py-2 text-right">Jumlah Kasus</th>
                        <th className="px-3 py-2 text-right">Porsi (%)</th>
                        <th className="px-3 py-2">Jenis Rawat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataTopPenyakit.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 text-center font-mono text-slate-400 font-bold">#{idx + 1}</td>
                          <td className="px-3 py-2 font-mono font-bold text-blue-600">{item.kodeIcd}</td>
                          <td className="px-3 py-2">
                            <div className="font-semibold text-slate-900">{item.namaPenyakit}</div>
                            <div className="text-[10px] text-slate-500 italic truncate max-w-[220px]">{item.keteranganKlinis}</div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">{formatNumber(item.jumlahKasus)}</td>
                          <td className="px-3 py-2 text-right font-mono text-blue-600 font-bold">{item.persen}%</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {item.jenisRawat}
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

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.topPenyakit.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.topPenyakit.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.topPenyakit.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 3 - KARTU 5: Indikator Efisiensi Rumah Sakit (Barber Johnson)*/}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Indikator Efisiensi Rumah Sakit</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Grafik Barber-Johnson efisiensi pemanfaatan tempat tidur &amp; mutu asuhan
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru (Hijau jika ideal 60-85%, Oranye jika tidak) */}
              <div className="text-left sm:text-right shrink-0">
                <div className={`font-mono font-black text-xl sm:text-2xl leading-none ${isBorIdeal ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {lastBorValue}%
                  <span className="text-xs font-semibold ml-1">BOR</span>
                </div>
                <div className={`text-xs font-semibold mt-1 flex items-center sm:justify-end gap-1 ${isBorIdeal ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isBorIdeal ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ideal Kemenkes (60-85%)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Di Luar Batas Standar</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Tahun & Toggle Indikator */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              {/* Toggle Indikator Efisiensi */}
              <div className="flex flex-wrap gap-1">
                {(['bor', 'alos', 'toi', 'bto', 'gdr', 'ndr'] as const).map((key) => {
                  const meta = RSBP_BATAM_DATA.indikatorEfisiensi.standarKemenkes[key];
                  const isActive = indikatorAktif === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setIndikatorAktif(key)}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={meta.deskripsi}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              {/* Filter Tahun & SheetSwap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tahun:</span>
                  <select
                    value={tahunEfisiensi}
                    onChange={(e) => setTahunEfisiensi(Number(e.target.value))}
                    aria-label="Filter Tahun Indikator Efisiensi"
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value={2026}>2026</option>
                    <option value={2025}>2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k5ViewMode} onChange={setK5ViewMode} />
              </div>
            </div>

            {/* Keterangan Standar Kemenkes */}
            <div className="bg-blue-50/60 rounded-lg px-2.5 py-1 mb-2 border border-blue-100 flex items-center justify-between text-[11px]">
              <span className="font-bold text-blue-900">{infoIndikator.nama} ({infoIndikator.satuan}):</span>
              <span className="font-semibold text-blue-700">{infoIndikator.labelKemenkes}</span>
            </div>

            {/* Line Chart dengan Reference Band Ideal / Tabel Detail */}
            <div className="h-56 w-full pt-1">
              {k5ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dataEfisiensi} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                    <YAxis
                      domain={
                        indikatorAktif === 'bor'
                          ? [50, 95]
                          : indikatorAktif === 'alos'
                          ? [2, 6]
                          : indikatorAktif === 'toi'
                          ? [0.5, 3]
                          : [0, 'auto']
                      }
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}${infoIndikator.satuan === '%' ? '%' : ''}`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null;
                        const val = payload[0].value as number;
                        const isNormal = val >= infoIndikator.min && val <= infoIndikator.max;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[200px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                              <span>Bulan {label} {tahunEfisiensi}</span>
                              <span className="font-mono text-blue-600 font-bold">{val} {infoIndikator.satuan}</span>
                            </div>
                            <div className="text-slate-600">
                              <div><span className="font-medium">Indikator:</span> {infoIndikator.nama}</div>
                              <div><span className="font-medium">Standar Ideal:</span> {infoIndikator.min} - {infoIndikator.max} {infoIndikator.satuan}</div>
                            </div>
                            <div className={`p-1 rounded text-center font-bold text-[10px] ${
                              isNormal ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {isNormal ? 'Sesuai Standar Kemenkes RI' : 'Di Luar Rentang Ideal'}
                            </div>
                          </div>
                        );
                      }}
                    />
                    {/* Reference Line Batas Ideal Standar Kemenkes RI */}
                    {indikatorAktif === 'bor' && (
                      <>
                        <ReferenceLine
                          y={60}
                          stroke="#059669"
                          strokeDasharray="3 3"
                          label={{ value: 'Ideal Bawah 60%', position: 'insideBottomLeft', fill: '#059669', fontSize: 10 }}
                        />
                        <ReferenceLine
                          y={85}
                          stroke="#059669"
                          strokeDasharray="3 3"
                          label={{ value: 'Ideal Atas 85%', position: 'insideTopLeft', fill: '#059669', fontSize: 10 }}
                        />
                      </>
                    )}
                    {indikatorAktif === 'alos' && (
                      <>
                        <ReferenceLine
                          y={3}
                          stroke="#059669"
                          strokeDasharray="3 3"
                          label={{ value: 'Min 3 Hari', position: 'insideBottomLeft', fill: '#059669', fontSize: 10 }}
                        />
                        <ReferenceLine
                          y={5}
                          stroke="#059669"
                          strokeDasharray="3 3"
                          label={{ value: 'Maks 5 Hari', position: 'insideTopLeft', fill: '#059669', fontSize: 10 }}
                        />
                      </>
                    )}
                    {indikatorAktif === 'toi' && (
                      <>
                        <ReferenceLine
                          y={1}
                          stroke="#059669"
                          strokeDasharray="3 3"
                          label={{ value: 'Min 1 Hari', position: 'insideBottomLeft', fill: '#059669', fontSize: 10 }}
                        />
                        <ReferenceLine
                          y={3}
                          stroke="#059669"
                          strokeDasharray="3 3"
                          label={{ value: 'Maks 3 Hari', position: 'insideTopLeft', fill: '#059669', fontSize: 10 }}
                        />
                      </>
                    )}
                    <Line
                      type="monotone"
                      dataKey={indikatorAktif}
                      name={infoIndikator.nama}
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#2563eb', strokeWidth: 1, stroke: '#fff' }}
                      activeDot={{ r: 6, fill: '#1d4ed8' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Bulan</th>
                        <th className="px-3 py-2 text-right">Nilai {indikatorAktif.toUpperCase()} ({infoIndikator.satuan})</th>
                        <th className="px-3 py-2 text-center">Standar Ideal Kemenkes</th>
                        <th className="px-3 py-2 text-center">Evaluasi Mutu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataEfisiensi.map((item, idx) => {
                        const val = (item as any)[indikatorAktif] as number;
                        const isNormal = val >= infoIndikator.min && val <= infoIndikator.max;
                        return (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3 py-2 font-medium text-slate-900">{item.bulan} {tahunEfisiensi}</td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">
                              {val} {infoIndikator.satuan}
                            </td>
                            <td className="px-3 py-2 text-center font-mono text-slate-600">
                              {infoIndikator.min} - {infoIndikator.max} {infoIndikator.satuan}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isNormal ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {isNormal ? 'Ideal Sesuai Standar' : 'Di Luar Batas Standar'}
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

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.indikatorEfisiensi.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.indikatorEfisiensi.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.indikatorEfisiensi.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 3 - KARTU 6: Lama Dirawat dan Cara Pasien Keluar             */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Lama Dirawat &amp; Cara Pasien Keluar</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distribusi status kepulangan rawat inap dan tren rata-rata hari rawat (AvLOS)
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {rataAlosTahunan}
                  <span className="text-xs font-normal text-slate-500 ml-1">Hari</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1">
                  (Standar Kemenkes 3 - 5 Hari)
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 6 & Legenda */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tahun:</span>
                  <select
                    value={tahunPasienKeluar}
                    onChange={(e) => setTahunPasienKeluar(Number(e.target.value))}
                    aria-label="Filter Tahun Pasien Keluar"
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value={2026}>Tahun 2026</option>
                    <option value={2025}>Tahun 2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k6ViewMode} onChange={setK6ViewMode} />
              </div>

              <div className="flex items-center gap-2.5 text-[10px] text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span>Sembuh</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                  <span>APS</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0ea5e9]" />
                  <span>Rujuk</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#dc2626]" />
                  <span>Meninggal</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-[#16a34a]" />
                  <span>AvLOS (hr)</span>
                </div>
              </div>
            </div>

            {/* Stacked Column + Line (Dual Axis) / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k6ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dataPasienKeluar} margin={{ top: 10, right: -10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 8]}
                      tick={{ fontSize: 10, fill: '#16a34a' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}h`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d = payload[0].payload as PasienKeluarItem;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[220px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                              <span>Bulan {label} {tahunPasienKeluar}</span>
                              <span className="font-mono text-blue-600 font-bold">{formatNumber(d.totalPasienKeluar)} Pasien</span>
                            </div>
                            <div className="space-y-1 pt-0.5 text-slate-600">
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#2563eb]" /> Sembuh / Membaik:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(d.sembuh)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#64748b]" /> Pulang Paksa (APS):
                                </span>
                                <span className="font-mono font-bold text-slate-800">{d.pulangAps}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#0ea5e9]" /> Dirujuk Faskes Lain:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{d.dirujuk}</span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#dc2626]" /> Pasien Meninggal:
                                </span>
                                <span className="font-mono font-bold">{d.meninggalTotal}</span>
                              </div>
                            </div>
                            <div className="bg-slate-50 p-1.5 rounded border border-slate-100 text-[11px] text-slate-700">
                              <div className="flex justify-between font-bold text-emerald-700">
                                <span>Rata Lama Dirawat (AvLOS):</span>
                                <span className="font-mono">{d.rataLamaRawatHari} Hari</span>
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                                Total Hari Rawat: {formatNumber(d.totalHariRawat)} hari
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-500 pt-0.5">
                              <span className="font-bold">Top 3 Diagnosa:</span> {d.topDiagnosa.join(', ')}
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar yAxisId="left" dataKey="sembuh" name="Sembuh" stackId="a" fill="#2563eb" />
                    <Bar yAxisId="left" dataKey="pulangAps" name="Pulang APS" stackId="a" fill="#64748b" />
                    <Bar yAxisId="left" dataKey="dirujuk" name="Dirujuk" stackId="a" fill="#0ea5e9" />
                    <Bar yAxisId="left" dataKey="meninggalTotal" name="Meninggal" stackId="a" fill="#dc2626" radius={[3, 3, 0, 0]} />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rataLamaRawatHari"
                      name="Rata Lama Dirawat (AvLOS)"
                      stroke="#16a34a"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#16a34a' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Bulan</th>
                        <th className="px-3 py-2 text-right">Sembuh</th>
                        <th className="px-3 py-2 text-right">APS</th>
                        <th className="px-3 py-2 text-right">Rujuk</th>
                        <th className="px-3 py-2 text-right">Meninggal</th>
                        <th className="px-3 py-2 text-right">Total Keluar</th>
                        <th className="px-3 py-2 text-right">AvLOS (Hari)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataPasienKeluar.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900">{item.bulan} {tahunPasienKeluar}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.sembuh)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{item.pulangAps}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{item.dirujuk}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-red-600">{item.meninggalTotal}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{formatNumber(item.totalPasienKeluar)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-emerald-600">{item.rataLamaRawatHari} hr</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Tertutup & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.lamaDirawatCaraKeluar.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.lamaDirawatCaraKeluar.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {RSBP_BATAM_DATA.lamaDirawatCaraKeluar.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 4 - KARTU 7: Tenaga Rumah Sakit (SDM Kesehatan)              */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tenaga Rumah Sakit</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Komposisi profesi tenaga medis, keperawatan &amp; manajemen RSBP
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {formatNumber(dataTenaga.totalPegawai)}
                  <span className="text-xs font-normal text-slate-500 ml-1">Pegawai</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1">
                  (68 Dokter Spesialis &bull; 246 Perawat)
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 7 & Legenda Status Pegawai */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tahun:</span>
                  <select
                    value={tahunTenaga}
                    onChange={(e) => setTahunTenaga(Number(e.target.value))}
                    aria-label="Filter Tahun Tenaga RS"
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value={2026}>Tahun 2026</option>
                    <option value={2025}>Tahun 2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k7ViewMode} onChange={setK7ViewMode} />
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1d4ed8]" />
                  <span>PNS BP Batam</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                  <span>PPPK</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#93c5fd]" />
                  <span>Kontrak BLU</span>
                </div>
              </div>
            </div>

            {/* Horizontal Stacked Bar / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k7ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataTenaga.items}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 35, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="singkatan"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      width={95}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const t = payload[0].payload as any;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[220px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                              {t.kategori}
                            </div>
                            <div className="flex justify-between items-center text-slate-700">
                              <span>Total Ketenagaan:</span>
                              <span className="font-mono font-bold text-blue-600">{t.total} Orang ({t.persen}%)</span>
                            </div>
                            <div className="space-y-1 pt-1 border-t border-slate-100 text-slate-600">
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#1d4ed8]" /> PNS BP Batam:
                                </span>
                                <span className="font-mono font-bold">{t.pns} Org</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#3b82f6]" /> Tenaga PPPK:
                                </span>
                                <span className="font-mono font-bold">{t.p3k} Org</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#93c5fd]" /> Tenaga BLU Profesional:
                                </span>
                                <span className="font-mono font-bold">{t.kontrakBlu} Org</span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="pns" name="PNS" stackId="t" fill="#1d4ed8" />
                    <Bar dataKey="p3k" name="PPPK" stackId="t" fill="#3b82f6" />
                    <Bar dataKey="kontrakBlu" name="Kontrak BLU" stackId="t" fill="#93c5fd" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Kategori SDM Kesehatan</th>
                        <th className="px-3 py-2 text-right">PNS</th>
                        <th className="px-3 py-2 text-right">PPPK</th>
                        <th className="px-3 py-2 text-right">Kontrak BLU</th>
                        <th className="px-3 py-2 text-right">Total Pegawai</th>
                        <th className="px-3 py-2 text-right">Proporsi (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataTenaga.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900">
                            <div>{item.kategori}</div>
                            <div className="text-[10px] font-mono text-blue-600">{item.singkatan}</div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{item.pns}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{item.p3k}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{item.kontrakBlu}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{item.total}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">{item.persen}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.tenagaRumahSakit.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.tenagaRumahSakit.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.tenagaRumahSakit.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 4 - KARTU 8: Resep Dispens Obat (Generik vs Non-Generik)    */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Resep Dispens Obat</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pelayanan farmasi klinis &amp; rasionalitas penggunaan obat formularium
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {formatNumber(totalResepTahunan)}
                  <span className="text-xs font-normal text-slate-500 ml-1">Resep</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1">
                  ({avgPersenGenerik}% Generik &bull; Patuh Fornas)
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 8 & Toggle Opsi Tampilan */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tahun:</span>
                <select
                  value={tahunResep}
                  onChange={(e) => setTahunResep(Number(e.target.value))}
                  aria-label="Filter Tahun Resep Obat"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                >
                  <option value={2026}>Tahun 2026</option>
                  <option value={2025}>Tahun 2025</option>
                </select>

                <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setModeTampilanResep('instalasi')}
                    className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      modeTampilanResep === 'instalasi'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Per Instalasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeTampilanResep('golongan')}
                    className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      modeTampilanResep === 'golongan'
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Generik vs Non
                  </button>
                </div>

                <SheetSwapToggle mode={k8ViewMode} onChange={setK8ViewMode} />
              </div>

              {/* Legenda Resep */}
              <div className="flex items-center gap-2.5 text-[11px] text-slate-600 font-medium">
                {modeTampilanResep === 'instalasi' ? (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                      <span>R. Jalan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                      <span>R. Inap</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" />
                      <span>IGD</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                      <span>Generik ({avgPersenGenerik}%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#cbd5e1]" />
                      <span>Non-Generik</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Stacked Column Resep / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k8ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataResep} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d = payload[0].payload as ResepDispensItem;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[210px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                              <span>Bulan {label} {tahunResep}</span>
                              <span className="font-mono text-blue-600 font-bold">{formatNumber(d.totalResep)} Resep</span>
                            </div>
                            <div className="space-y-1 pt-0.5 text-slate-600">
                              <div className="flex justify-between">
                                <span>Resep Rawat Jalan:</span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(d.rawatJalan)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Resep Rawat Inap:</span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(d.rawatInap)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Resep IGD 24 Jam:</span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(d.gawatDarurat)}</span>
                              </div>
                            </div>
                            <div className="bg-blue-50/70 p-1.5 rounded border border-blue-100 text-[11px] text-blue-900 space-y-0.5">
                              <div className="flex justify-between font-bold">
                                <span>Kepatuhan Obat Generik:</span>
                                <span className="font-mono">{d.persenGenerik}%</span>
                              </div>
                              <div className="text-[10px] text-slate-600 flex justify-between">
                                <span>Generik: {formatNumber(d.resepGenerik)}</span>
                                <span>Paten: {formatNumber(d.resepNonGenerik)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    {modeTampilanResep === 'instalasi' ? (
                      <>
                        <Bar dataKey="rawatJalan" name="Rawat Jalan" stackId="r" fill="#2563eb" />
                        <Bar dataKey="rawatInap" name="Rawat Inap" stackId="r" fill="#0284c7" />
                        <Bar dataKey="gawatDarurat" name="IGD" stackId="r" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                      </>
                    ) : (
                      <>
                        <Bar dataKey="resepGenerik" name="Obat Generik" stackId="r" fill="#2563eb" />
                        <Bar dataKey="resepNonGenerik" name="Obat Non-Generik" stackId="r" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Bulan</th>
                        <th className="px-3 py-2 text-right">Rawat Jalan</th>
                        <th className="px-3 py-2 text-right">Rawat Inap</th>
                        <th className="px-3 py-2 text-right">IGD</th>
                        <th className="px-3 py-2 text-right">Total Resep</th>
                        <th className="px-3 py-2 text-right">Generik</th>
                        <th className="px-3 py-2 text-right">Non-Generik</th>
                        <th className="px-3 py-2 text-right">% Generik</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataResep.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900">{item.bulan} {tahunResep}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.rawatJalan)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.rawatInap)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.gawatDarurat)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{formatNumber(item.totalResep)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.resepGenerik)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.resepNonGenerik)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-emerald-600">{item.persenGenerik}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Tertutup & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.resepDispensObat.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.resepDispensObat.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {RSBP_BATAM_DATA.resepDispensObat.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 5 - KARTU 9: Realisasi Belanja terhadap Pagu dan Proyeksi    */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Realisasi Belanja thd Pagu &amp; Proyeksi</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kinerja serapan anggaran BLU Rumah Sakit 5 tahun berturut-turut (2022-2026)
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru (Warna Hijau >=90%, Oranye <90%) */}
              <div className="text-left sm:text-right shrink-0">
                <div className={`font-mono font-black text-xl sm:text-2xl leading-none ${isSerapanTinggi ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {lastKeuangan.persenRealisasi}%
                  <span className="text-xs font-semibold ml-1">Serapan</span>
                </div>
                <div className={`text-xs font-semibold mt-1 ${isSerapanTinggi ? 'text-emerald-700' : 'text-amber-700'}`}>
                  (Sisa Pagu {formatRupiahMiliar(lastKeuangan.sisaPaguMiliar)})
                </div>
              </div>
            </div>

            {/* Legenda & Status Serapan & SheetSwap */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span>Pagu Anggaran</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                  <span>Realisasi</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#cbd5e1]" />
                  <span>Sisa Pagu</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-[#10b981]" />
                  <span>Proyeksi Pencairan</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  Periode 2022 - 2026
                </span>
                <SheetSwapToggle mode={k9ViewMode} onChange={setK9ViewMode} />
              </div>
            </div>

            {/* Clustered Column + Proyeksi Line / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k9ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dataKeuangan5Tahun} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `Rp ${v}M`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null;
                        const k = payload[0].payload as any;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[230px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                              <span>Tahun Anggaran {label}</span>
                              <span className="font-mono text-blue-600 font-bold">{k.persenRealisasi}% Serapan</span>
                            </div>
                            <div className="space-y-1 text-slate-600">
                              <div className="flex justify-between">
                                <span>Pagu Anggaran:</span>
                                <span className="font-mono font-bold text-slate-800">{formatRupiahMiliar(k.paguMiliar)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Realisasi Belanja:</span>
                                <span className="font-mono font-bold text-blue-600">{formatRupiahMiliar(k.realisasiMiliar)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Sisa Pagu:</span>
                                <span className="font-mono font-bold text-slate-600">{formatRupiahMiliar(k.sisaPaguMiliar)}</span>
                              </div>
                              <div className="flex justify-between text-emerald-700 font-medium">
                                <span>Proyeksi Pencairan RBA:</span>
                                <span className="font-mono font-bold">{formatRupiahMiliar(k.proyeksiPencairanMiliar)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="paguMiliar" name="Pagu Anggaran" fill="#2563eb" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="realisasiMiliar" name="Realisasi Belanja" fill="#0284c7" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="sisaPaguMiliar" name="Sisa Pagu" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                    <Line
                      type="monotone"
                      dataKey="proyeksiPencairanMiliar"
                      name="Proyeksi Pencairan Dana"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 3, fill: '#10b981' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Tahun Anggaran</th>
                        <th className="px-3 py-2 text-right">Pagu Anggaran</th>
                        <th className="px-3 py-2 text-right">Realisasi Belanja</th>
                        <th className="px-3 py-2 text-right">Sisa Pagu</th>
                        <th className="px-3 py-2 text-right">Serapan (%)</th>
                        <th className="px-3 py-2 text-right">Proyeksi Pencairan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataKeuangan5Tahun.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900">{item.tahun}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatRupiahMiliar(item.paguMiliar)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{formatRupiahMiliar(item.realisasiMiliar)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-600">{formatRupiahMiliar(item.sisaPaguMiliar)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-emerald-600">{item.persenRealisasi}%</td>
                          <td className="px-3 py-2 text-right font-mono text-emerald-700">{formatRupiahMiliar(item.proyeksiPencairanMiliar)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Tertutup & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.keuanganBelanja5Tahun.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.keuanganBelanja5Tahun.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              {RSBP_BATAM_DATA.keuanganBelanja5Tahun.datasetInfo.sifat}
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BARIS 5 - KARTU 10: Porsi Makanan Pasien                           */}
        {/* ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            {/* Header: Judul Kiri Atas & Angka Ringkasan Kanan Atas */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Porsi Makanan Pasien</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Penyediaan nutrisi gizi klinis pasien rawat inap instalasi gizi RSBP
                </p>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-left sm:text-right shrink-0">
                <div className="font-mono font-black text-xl sm:text-2xl text-slate-900 leading-none">
                  {formatNumber(totalPorsiTahunan)}
                  <span className="text-xs font-normal text-slate-500 ml-1">Porsi</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1">
                  (Rata-rata {formatNumber(avgPorsiPerHari)} Porsi / Hari)
                </div>
              </div>
            </div>

            {/* Filter Baris Kartu 10 & Legenda */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tahun:</span>
                  <select
                    value={tahunMakanan}
                    onChange={(e) => setTahunMakanan(Number(e.target.value))}
                    aria-label="Filter Tahun Porsi Makanan"
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs rounded-md px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value={2026}>Tahun 2026 (Berjalan)</option>
                    <option value={2025}>Tahun 2025</option>
                  </select>
                </div>
                <SheetSwapToggle mode={k10ViewMode} onChange={setK10ViewMode} />
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span>Makanan Padat (Biasa &amp; Lunak)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" />
                  <span>Makanan Cair &amp; Diet Khusus</span>
                </div>
              </div>
            </div>

            {/* Stacked Column Makanan Padat & Makanan Cair / Tabel Detail */}
            <div className="h-64 w-full pt-1">
              {k10ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataMakanan} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) return null;
                        const m = payload[0].payload as PorsiMakananItem;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1.5 min-w-[210px]">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between">
                              <span>Bulan {label} {tahunMakanan}</span>
                              <span className="font-mono text-blue-600 font-bold">{formatNumber(m.totalPorsi)} Porsi</span>
                            </div>
                            <div className="space-y-1 pt-0.5 text-slate-600">
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#2563eb]" /> Makanan Padat:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(m.makananPadat)} Porsi</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-xs bg-[#38bdf8]" /> Makanan Cair / Enteral:
                                </span>
                                <span className="font-mono font-bold text-slate-800">{formatNumber(m.makananCair)} Porsi</span>
                              </div>
                            </div>
                            <div className="bg-blue-50/70 p-1.5 rounded border border-blue-100 text-[11px] text-blue-900 flex justify-between">
                              <span>Rata-rata Pelayanan Harian:</span>
                              <span className="font-mono font-bold">{formatNumber(m.rataPerHari)} porsi/hari</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Periode: {m.rentangRekap}
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="makananPadat" name="Makanan Padat" stackId="m" fill="#2563eb" />
                    <Bar dataKey="makananCair" name="Makanan Cair" stackId="m" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Bulan</th>
                        <th className="px-3 py-2 text-right">Makanan Padat</th>
                        <th className="px-3 py-2 text-right">Makanan Cair &amp; Diet</th>
                        <th className="px-3 py-2 text-right">Total Porsi</th>
                        <th className="px-3 py-2 text-right">Rata-rata/Hari</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataMakanan.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-900">{item.bulan} {tahunMakanan}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.makananPadat)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">{formatNumber(item.makananCair)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-blue-600">{formatNumber(item.totalPorsi)}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-emerald-600">{formatNumber(item.rataPerHari)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kecil: Badge Terbuka & Nama Dataset Sumber */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-600">Dataset:</span>
              <span className="italic truncate">{RSBP_BATAM_DATA.porsiMakanan.datasetInfo.nama}</span>
              <span>&bull;</span>
              <span>{RSBP_BATAM_DATA.porsiMakanan.datasetInfo.periode}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {RSBP_BATAM_DATA.porsiMakanan.datasetInfo.sifat}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
