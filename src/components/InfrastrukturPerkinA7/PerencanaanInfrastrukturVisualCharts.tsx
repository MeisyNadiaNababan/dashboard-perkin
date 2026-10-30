import React, { useState, useMemo } from 'react';
import {
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  Filter,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import {
  DATA_PERENCANAAN_INFRASTRUKTUR,
  DedTahunItem,
  DedPerUnitPenggunaItem,
} from './perencanaanInfrastrukturData';

// Color Palette - Tema Biru & Putih Elegan
const COLOR_DARAT = '#1D4ED8'; // Blue 700
const COLOR_LAUT = '#0284C7'; // Sky 600
const COLOR_UTILITAS = '#0D9488'; // Teal 600
const COLOR_GEDUNG = '#4338CA'; // Indigo 700
const COLOR_LAINNYA = '#64748B'; // Slate 500

const COLORS_INFRA: Record<string, string> = {
  Darat: COLOR_DARAT,
  Laut: COLOR_LAUT,
  Utilitas: COLOR_UTILITAS,
  Gedung: COLOR_GEDUNG,
  Lainnya: COLOR_LAINNYA,
};

const COLOR_AKSEN_WASPADA = '#EA580C'; // Aksen oranye/merah untuk waktu terlama / pemanfaatan rendah

// Colors for Section C Categories
const COLOR_TEKNIS_INFRA = '#2563EB'; // Blue 600
const COLOR_TEKNIS_LINGKUNGAN = '#059669'; // Emerald 600
const COLOR_TEKNIS_BANGUNAN = '#7C3AED'; // Purple 600

export const PerencanaanInfrastrukturVisualCharts: React.FC = () => {
  // Filter state for Grafik 2 & Grafik 3 (Tahun)
  const [selectedTahunKomposisi, setSelectedTahunKomposisi] = useState<string>('Semua');
  const [selectedTahunBiaya, setSelectedTahunBiaya] = useState<string>('Semua');

  // Search query for Tabel Grafik 8
  const [searchTableQuery, setSearchTableQuery] = useState<string>('');

  // --------------------------------------------------------------------------
  // Data processing for Grafik 2 (Donut Chart Komposisi DED)
  // --------------------------------------------------------------------------
  const dataKomposisiDed = useMemo(() => {
    const list =
      DATA_PERENCANAAN_INFRASTRUKTUR.biayaDanWaktuPerTahun[selectedTahunKomposisi] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.biayaDanWaktuPerTahun['Semua'];
    const totalDed = list.reduce((acc, curr) => acc + curr.jumlahDed, 0);

    return list.map((item) => ({
      name: item.jenis,
      value: item.jumlahDed,
      percentage: totalDed > 0 ? ((item.jumlahDed / totalDed) * 100).toFixed(1) : '0.0',
      color: COLORS_INFRA[item.jenis] || '#2563EB',
    }));
  }, [selectedTahunKomposisi]);

  // --------------------------------------------------------------------------
  // Data processing for Grafik 3 (Total Biaya DED per Jenis - Sorted Desc)
  // --------------------------------------------------------------------------
  const dataTotalBiayaSorted = useMemo(() => {
    const list =
      DATA_PERENCANAAN_INFRASTRUKTUR.biayaDanWaktuPerTahun[selectedTahunBiaya] ||
      DATA_PERENCANAAN_INFRASTRUKTUR.biayaDanWaktuPerTahun['Semua'];
    // Urutkan dari terbesar
    return [...list].sort((a, b) => b.biayaMiliar - a.biayaMiliar);
  }, [selectedTahunBiaya]);

  // --------------------------------------------------------------------------
  // Data processing for Grafik 8 Table (Filtered by Search)
  // --------------------------------------------------------------------------
  const filteredTableData = useMemo(() => {
    if (!searchTableQuery.trim()) {
      return DATA_PERENCANAAN_INFRASTRUKTUR.top10NilaiPerUnitPengguna;
    }
    const q = searchTableQuery.toLowerCase();
    return DATA_PERENCANAAN_INFRASTRUKTUR.top10NilaiPerUnitPengguna.filter(
      (item) =>
        item.namaPaket.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q) ||
        item.tahun.includes(q) ||
        item.keterangan.toLowerCase().includes(q)
    );
  }, [searchTableQuery]);

  return (
    <div className="w-full space-y-7 font-sans text-slate-800 antialiased">
      {/* ==================================================================== */}
      {/* BAGIAN A: DOKUMEN PERENCANAAN TEKNIS (DED)                          */}
      {/* ==================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-blue-600" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                A. DOKUMEN PERENCANAAN TEKNIS (DED)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Distribusi volume dan komposisi dokumen perencanaan teknis menurut jenis infrastruktur (2021–2025)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* 1. Stacked Column: Jumlah DED per tahun menurut jenis infrastruktur */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            {/* Corner Badge: Tertutup */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>1. Jumlah DED per Tahun Menurut Jenis Infrastruktur</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Dataset: Rekapitulasi Perencanaan Pembangunan Infrastruktur Darat, Laut, Utilitas, Gedung, Lainnya
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300/80 shrink-0 uppercase tracking-wider">
                Tertutup
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DATA_PERENCANAAN_INFRASTRUKTUR.rekapitulasiTahunan}
                  margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                    label={{
                      value: 'Jumlah DED',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 15,
                      style: { fontSize: 10.5, fill: '#64748B', fontWeight: 600 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [`${val} Dokumen DED`, name]}
                    labelFormatter={(label) => `Tahun Pembuatan: ${label}`}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar dataKey="Darat" stackId="ded" fill={COLOR_DARAT} name="Darat" />
                  <Bar dataKey="Laut" stackId="ded" fill={COLOR_LAUT} name="Laut" />
                  <Bar dataKey="Utilitas" stackId="ded" fill={COLOR_UTILITAS} name="Utilitas" />
                  <Bar dataKey="Gedung" stackId="ded" fill={COLOR_GEDUNG} name="Gedung" />
                  <Bar dataKey="Lainnya" stackId="ded" fill={COLOR_LAINNYA} name="Lainnya" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Sumbu X: Tahun &bull; Segmen: Jenis Infrastruktur</span>
              <span className="font-semibold text-blue-700">Akumulasi 2021–2025: 295 Dokumen</span>
            </div>
          </div>

          {/* 2. Donut Chart: Komposisi DED menurut jenis infrastruktur */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            {/* Header + Filter Tahun + Corner Badge */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  2. Komposisi DED Menurut Jenis Infrastruktur
                </h3>
                <p className="text-xs text-slate-500">
                  Proporsi persentase pembagian portofolio DED
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300/80 shrink-0 uppercase tracking-wider">
                Tertutup
              </span>
            </div>

            {/* Filter Tahun Button Group */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10.5px] font-bold text-slate-600 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-blue-600" />
                Tahun:
              </span>
              {['Semua', '2021', '2022', '2023', '2024', '2025'].map((thn) => (
                <button
                  key={thn}
                  onClick={() => setSelectedTahunKomposisi(thn)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    selectedTahunKomposisi === thn
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {thn}
                </button>
              ))}
            </div>

            <div className="h-60 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, _name: any, entry: any) => [
                      `${val} Dokumen (${entry.payload.percentage}%)`,
                      entry.payload.name,
                    ]}
                  />
                  <Pie
                    data={dataKomposisiDed}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {dataKomposisiDed.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Donut Center Total Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 leading-none">
                  {dataKomposisiDed.reduce((acc, c) => acc + c.value, 0)}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                  Total DED
                </span>
              </div>
            </div>

            {/* Donut Legend with percentage */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 text-[10.5px]">
              {dataKomposisiDed.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 truncate">{item.name}:</span>
                  <span className="font-bold text-slate-900 font-mono">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* BAGIAN B: BIAYA DAN WAKTU PENYUSUNAN                                */}
      {/* ==================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-blue-600" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                B. BIAYA DAN WAKTU PENYUSUNAN
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Analisis alokasi anggaran biaya DED, durasi rerata penyusunan, dan korelasi biaya vs waktu
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* 3. Horizontal Bar: Total biaya DED per jenis infrastruktur */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  3. Total Biaya DED per Jenis Infrastruktur
                </h3>
                <p className="text-xs text-slate-500">
                  Diurutkan dari terbesar &bull; Format Rupiah (Miliar)
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300/80 shrink-0 uppercase tracking-wider">
                Tertutup
              </span>
            </div>

            {/* Filter Tahun */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-1">
              <span className="text-[10.5px] font-bold text-slate-600 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-blue-600" />
                Filter Tahun:
              </span>
              {['Semua', '2021', '2022', '2023', '2024', '2025'].map((thn) => (
                <button
                  key={thn}
                  onClick={() => setSelectedTahunBiaya(thn)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    selectedTahunBiaya === thn
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {thn}
                </button>
              ))}
            </div>

            <div className="h-64 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataTotalBiayaSorted}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    tickFormatter={(v) => `Rp ${v}M`}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="jenis"
                    type="category"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any) => [`Rp ${Number(val).toFixed(2)} Miliar`, 'Biaya DED']}
                  />
                  <Bar
                    dataKey="biayaMiliar"
                    name="Biaya DED"
                    radius={[0, 4, 4, 0]}
                  >
                    {dataTotalBiayaSorted.map((entry, index) => (
                      <Cell
                        key={`cell-bar-${index}`}
                        fill={COLORS_INFRA[entry.jenis] || '#2563EB'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Sumbu Y: Jenis Infrastruktur &bull; Sumbu X: Biaya (Rp Miliar)</span>
              <span className="font-bold text-slate-700">
                Total: Rp {dataTotalBiayaSorted.reduce((a, b) => a + b.biayaMiliar, 0).toFixed(1)} Miliar
              </span>
            </div>
          </div>

          {/* 4. Horizontal Bar: Rata-rata waktu penyusunan DED per jenis infrastruktur */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4. Rata-rata Waktu Penyusunan DED per Jenis Infrastruktur
                </h3>
                <p className="text-xs text-slate-500">
                  Satuan hari kerja &bull; <strong className="text-amber-600">Warna aksen oranye</strong> menunjukkan waktu terlama
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300/80 shrink-0 uppercase tracking-wider">
                Tertutup
              </span>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DATA_PERENCANAAN_INFRASTRUKTUR.rataRataWaktuPerJenis}
                  layout="vertical"
                  margin={{ top: 5, right: 35, left: 15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    tickFormatter={(v) => `${v} Hari`}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="jenis"
                    type="category"
                    tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, _name: any, item: any) => [
                      `${val} Hari Kalender ${item.payload.isTerlama ? '(Durasi Terlama - Perlu Asistensi Khusus)' : ''}`,
                      'Rerata Waktu Penyusunan',
                    ]}
                  />
                  <Bar
                    dataKey="waktuHari"
                    name="Rerata Waktu (Hari)"
                    radius={[0, 4, 4, 0]}
                  >
                    {DATA_PERENCANAAN_INFRASTRUKTUR.rataRataWaktuPerJenis.map((entry, index) => (
                      <Cell
                        key={`cell-waktu-${index}`}
                        fill={entry.isTerlama ? COLOR_AKSEN_WASPADA : '#2563EB'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span>Infrastruktur Laut (130 Hari) memerlukan survei batimetri &amp; pasut laut</span>
              </span>
              <span className="font-semibold text-slate-700">Rerata Global: 88 Hari</span>
            </div>
          </div>

          {/* 5. Bubble Chart: Biaya vs Waktu Penyusunan */}
          <div className="lg:col-span-12 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  5. Biaya vs Waktu Penyusunan DED (Bubble Chart)
                </h3>
                <p className="text-xs text-slate-500">
                  Sumbu X: Waktu Pelaksanaan Penyusunan (Hari) &bull; Sumbu Y: Biaya DED (Rp Miliar) &bull; Ukuran Bubble: Jumlah DED &bull; Warna: Jenis Infrastruktur
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300/80 shrink-0 uppercase tracking-wider">
                Tertutup
              </span>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    dataKey="waktuHari"
                    name="Waktu Pelaksanaan"
                    unit=" Hari"
                    domain={[35, 155]}
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                    label={{
                      value: 'Waktu Pelaksanaan Penyusunan DED (Hari)',
                      position: 'insideBottom',
                      offset: -12,
                      style: { fontSize: 11, fill: '#475569', fontWeight: 600 },
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="biayaMiliar"
                    name="Biaya DED"
                    unit=" M"
                    domain={[0, 22]}
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                    label={{
                      value: 'Biaya DED (Rp Miliar)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 0,
                      style: { fontSize: 11, fill: '#475569', fontWeight: 600 },
                    }}
                  />
                  <ZAxis
                    type="number"
                    dataKey="jumlahDed"
                    range={[80, 500]}
                    name="Jumlah DED"
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as any;
                        return (
                          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs">
                            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1.5 flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: COLORS_INFRA[data.jenis] || '#2563EB' }}
                              />
                              <span>
                                {data.jenis} (TA {data.tahun})
                              </span>
                            </div>
                            <div className="space-y-1 text-slate-600">
                              <div>
                                Waktu Penyusunan: <strong className="text-slate-900">{data.waktuHari} Hari</strong>
                              </div>
                              <div>
                                Total Biaya DED: <strong className="text-slate-900">Rp {data.biayaMiliar} Miliar</strong>
                              </div>
                              <div>
                                Ukuran Bubble (Jumlah): <strong className="text-blue-700">{data.jumlahDed} Dokumen DED</strong>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }}
                    payload={Object.keys(COLORS_INFRA).map((jenis) => ({
                      value: jenis,
                      type: 'circle',
                      id: jenis,
                      color: COLORS_INFRA[jenis],
                    }))}
                  />

                  {/* Multiple Scatters per Jenis */}
                  {['Darat', 'Laut', 'Utilitas', 'Gedung', 'Lainnya'].map((jenis) => {
                    const subset = DATA_PERENCANAAN_INFRASTRUKTUR.bubbleBiayaVsWaktu.filter(
                      (item) => item.jenis === jenis
                    );
                    return (
                      <Scatter
                        key={jenis}
                        name={jenis}
                        data={subset}
                        fill={COLORS_INFRA[jenis]}
                        fillOpacity={0.8}
                        stroke="#FFFFFF"
                        strokeWidth={1.5}
                      />
                    );
                  })}
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span>Bubble mewakili cluster proyek DED tiap tahun anggaran. Ukuran lingkaran berbanding lurus dengan volume paket DED.</span>
              <span className="font-semibold text-slate-700">Total Sampel: 25 Klaster Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* BAGIAN C: PEMANFAATAN DOKUMEN PERENCANAAN                            */}
      {/* ==================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-blue-600" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                C. PEMANFAATAN DOKUMEN PERENCANAAN
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Tingkat serapan dokumen perencanaan teknis oleh unit pengguna, nilai DED, dan efisiensi utilisasi
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* 6. Clustered Column: Jumlah unit pengguna DED per tahun pembuatan */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  6. Jumlah Unit Pengguna DED per Tahun Pembuatan
                </h3>
                <p className="text-xs text-slate-500">
                  Dataset: Persentase Pemanfaatan Dokumen Perencanaan Teknis Infrastruktur / Lingkungan / Bangunan
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300/80 shrink-0 uppercase tracking-wider">
                Terbuka
              </span>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DATA_PERENCANAAN_INFRASTRUKTUR.pemanfaatanUnitPengguna}
                  margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                    label={{
                      value: 'Unit Pengguna DED',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 15,
                      style: { fontSize: 10.5, fill: '#64748B', fontWeight: 600 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [`${val} Unit Pengguna`, name]}
                    labelFormatter={(label) => `Tahun Pembuatan: ${label}`}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar
                    dataKey="teknisInfrastruktur"
                    fill={COLOR_TEKNIS_INFRA}
                    name="Teknis Infrastruktur"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="teknisLingkungan"
                    fill={COLOR_TEKNIS_LINGKUNGAN}
                    name="Teknis Lingkungan"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="teknisBangunan"
                    fill={COLOR_TEKNIS_BANGUNAN}
                    name="Teknis Bangunan"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Sumbu X: Tahun Pembuatan DED &bull; Sumbu Y: Jumlah Unit Pengguna</span>
              <span className="font-semibold text-emerald-700">Pertumbuhan Pengguna: +114% (2021-2025)</span>
            </div>
          </div>

          {/* 7. Line Chart: Nilai DED per tahun pembuatan */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  7. Nilai DED per Tahun Pembuatan
                </h3>
                <p className="text-xs text-slate-500">
                  Tiga garis tren kategori dokumen teknis &bull; Format Rupiah (Miliar)
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300/80 shrink-0 uppercase tracking-wider">
                Terbuka
              </span>
            </div>

            <div className="h-72 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={DATA_PERENCANAAN_INFRASTRUKTUR.nilaiDedPerTahun}
                  margin={{ top: 15, right: 20, left: -5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                    tickFormatter={(v) => `Rp ${v}M`}
                    label={{
                      value: 'Nilai DED (Rp Miliar)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 15,
                      style: { fontSize: 10.5, fill: '#64748B', fontWeight: 600 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [`Rp ${Number(val).toFixed(2)} Miliar`, name]}
                    labelFormatter={(label) => `Tahun Pembuatan: ${label}`}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line
                    type="monotone"
                    dataKey="teknisInfrastruktur"
                    name="Teknis Infrastruktur"
                    stroke={COLOR_TEKNIS_INFRA}
                    strokeWidth={2.5}
                    dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="teknisLingkungan"
                    name="Teknis Lingkungan"
                    stroke={COLOR_TEKNIS_LINGKUNGAN}
                    strokeWidth={2.5}
                    dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="teknisBangunan"
                    name="Teknis Bangunan"
                    stroke={COLOR_TEKNIS_BANGUNAN}
                    strokeWidth={2.5}
                    dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Format: Rupiah (Rp Miliar per Tahun Pembuatan)</span>
              <span className="font-semibold text-blue-700">Rerata Nilai TA 2025: Rp 24,1 M/Kategori</span>
            </div>
          </div>

          {/* 8. Horizontal Bar & Table: Nilai DED per unit pengguna (Top 10) */}
          <div className="lg:col-span-12 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between relative space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  8. Nilai DED per Unit Pengguna (10 Teratas) &amp; Tabel Rincian Pemanfaatan
                </h3>
                <p className="text-xs text-slate-500">
                  Diurutkan dari tertinggi &bull; <strong className="text-amber-600">Aksen oranye</strong> menandai DED dengan nilai per unit pengguna tertinggi (indikasi pemanfaatan rendah)
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300/80 self-start sm:self-auto shrink-0 uppercase tracking-wider">
                Terbuka
              </span>
            </div>

            {/* Horizontal Bar Chart (Top 10) */}
            <div className="h-80 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DATA_PERENCANAAN_INFRASTRUKTUR.top10NilaiPerUnitPengguna}
                  layout="vertical"
                  margin={{ top: 5, right: 35, left: 180, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10.5, fill: '#64748B' }}
                    tickFormatter={(v) => `Rp ${v}M/Unit`}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="namaPaket"
                    type="category"
                    tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                    width={175}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, _name: any, item: any) => [
                      `Rp ${Number(val).toFixed(2)} Miliar per Unit (${item.payload.unitPengguna} Unit Pengguna &bull; Nilai Total Rp ${item.payload.nilaiDedMiliar} M)`,
                      'Rasio Nilai per Pengguna',
                    ]}
                  />
                  <Bar
                    dataKey="nilaiPerUnit"
                    name="Nilai DED per Unit Pengguna"
                    radius={[0, 4, 4, 0]}
                  >
                    {DATA_PERENCANAAN_INFRASTRUKTUR.top10NilaiPerUnitPengguna.map((entry, index) => (
                      <Cell
                        key={`cell-top10-${index}`}
                        fill={entry.isHighestAccent ? COLOR_AKSEN_WASPADA : '#2563EB'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table Header with Search Bar */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Tabel Rincian Pemanfaatan Dokumen Perencanaan Teknis
                </span>

                {/* Search Input */}
                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTableQuery}
                    onChange={(e) => setSearchTableQuery(e.target.value)}
                    placeholder="Cari kategori, tahun, paket, atau keterangan..."
                    className="w-full pl-8 pr-3 py-1 text-xs rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                  />
                  {searchTableQuery && (
                    <button
                      onClick={() => setSearchTableQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2 px-3">Nama Paket Perencanaan</th>
                      <th className="py-2 px-3">Kategori</th>
                      <th className="py-2 px-3 text-center">Tahun Pembuatan DED</th>
                      <th className="py-2 px-3 text-right">Nilai DED</th>
                      <th className="py-2 px-3 text-center">Jumlah Unit Pengguna DED</th>
                      <th className="py-2 px-3 text-right">Nilai per Pengguna</th>
                      <th className="py-2 px-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableData.length > 0 ? (
                      filteredTableData.map((row) => (
                        <tr
                          key={row.id}
                          className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                            row.isHighestAccent ? 'bg-amber-50/40' : ''
                          }`}
                        >
                          <td className="py-2 px-3 font-semibold text-slate-900">
                            <div className="flex items-center gap-1.5">
                              {row.isHighestAccent && (
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              )}
                              <span>{row.namaPaket}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-slate-600">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                row.kategori === 'Teknis Infrastruktur'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : row.kategori === 'Teknis Lingkungan'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-purple-50 text-purple-700 border-purple-200'
                              }`}
                            >
                              {row.kategori}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-center font-mono font-bold text-slate-700">
                            {row.tahun}
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-semibold text-slate-900">
                            Rp {row.nilaiDedMiliar.toFixed(2)} M
                          </td>
                          <td className="py-2 px-3 text-center font-mono font-bold text-blue-700">
                            {row.unitPengguna} Unit
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                            <span
                              className={
                                row.isHighestAccent
                                  ? 'text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded'
                                  : ''
                              }
                            >
                              Rp {row.nilaiPerUnit.toFixed(2)} M
                            </span>
                          </td>
                          <td className="py-2 px-3 text-slate-500 max-w-xs">{row.keterangan}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-slate-400 italic">
                          Tidak ditemukan data dokumen perencanaan sesuai kata kunci "{searchTableQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
