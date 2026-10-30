import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  Droplets,
  Layers,
  MapPin,
  Filter,
  CheckSquare,
  Square,
  Info,
  Activity,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { SPAM_LIMBAH_DATA } from './spamPengelolaanLimbahData';

// Format currency
const formatRupiahMiliar = (val: number) => `Rp ${val.toFixed(1)} M`;
const formatNumber = (val: number) => val.toLocaleString('id-ID');

// Nature Badge Component
const NatureBadge: React.FC<{ type: 'Terbuka' | 'Tertutup' | 'Terbatas' }> = ({ type }) => {
  if (type === 'Terbuka') {
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200">
        Terbuka
      </span>
    );
  }
  if (type === 'Terbatas') {
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
        Terbatas
      </span>
    );
  }
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-300">
      Tertutup
    </span>
  );
};

// Section Header Component (clean blue & white)
const SectionHeader: React.FC<{ letter: string; title: string }> = ({ letter, title }) => (
  <div className="flex items-center gap-2.5 pb-2 border-b border-blue-100 mt-2 mb-3">
    <div className="w-7 h-7 rounded-lg bg-blue-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
      {letter}
    </div>
    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
      {title}
    </h2>
  </div>
);

// Custom Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-2.5 border border-blue-200 rounded-lg shadow-lg text-xs z-50 min-w-[160px]">
        <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1.5">
          {label}
        </div>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="flex items-center gap-1.5" style={{ color: entry.color || entry.stroke || entry.fill }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color || entry.stroke || entry.fill }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold font-mono text-slate-800">
                {typeof entry.value === 'number'
                  ? entry.value >= 1000000
                    ? `${(entry.value / 1000000).toFixed(2)} Juta`
                    : entry.value.toLocaleString('id-ID')
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const SpamPengelolaanLimbahVisualizer: React.FC = () => {
  // Interactive filters
  const [filterWtpKimia, setFilterWtpKimia] = useState<string>('Semua');
  const [filterKppKonsumsi, setFilterKppKonsumsi] = useState<string>('Semua');
  const [filterPeriodePersepsi, setFilterPeriodePersepsi] = useState<string>('Semester 1 2026');
  const [filterUnitPenerimaan, setFilterUnitPenerimaan] = useState<string>('Semua Unit');
  const [filterUnitProduksi, setFilterUnitProduksi] = useState<string>('Semua Unit');

  // Map interactive state
  const [mapLayers, setMapLayers] = useState({
    ipa: true,
    jaringan: true,
    waduk: true,
    tanki: true,
    booster: true,
    meterLogger: true,
    sebaran: false,
    stressArea: true,
    dmz: true,
  });
  const [mapHoveredItem, setMapHoveredItem] = useState<{
    type: string;
    nama: string;
    info: string;
    coords?: string;
  } | null>(null);

  const toggleLayer = (key: keyof typeof mapLayers) => {
    setMapLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* A. PRODUKSI DAN AIR BAKU                                             */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <SectionHeader letter="A" title="Produksi dan Air Baku" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 1. Kapasitas produksi per instalasi pengolahan air */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  1. Kapasitas Produksi per Instalasi Pengolahan Air (IPA / WTP)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Tren bulanan kapasitas operasional masing-masing WTP (Liter/detik)
                </p>
              </div>
              <NatureBadge type="Terbuka" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SPAM_LIMBAH_DATA.kapasitasProduksiPerWtp}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Line type="monotone" dataKey="Duriangkang" stroke="#1D4ED8" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="Mukakuning" stroke="#0284C7" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="SeiLadi" stroke="#2563EB" strokeWidth={1.5} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="SeiHarapan" stroke="#60A5FA" strokeWidth={1.5} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="Piayu" stroke="#93C5FD" strokeWidth={1.5} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="Nongsa" stroke="#38BDF8" strokeWidth={1.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Pemakaian air baku per WTP per semester */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  2. Pemakaian Air Baku per WTP per Semester
                </h3>
                <p className="text-[11px] text-slate-500">
                  Akumulasi pemakaian volume air baku dari waduk (m³)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPAM_LIMBAH_DATA.pemakaianAirBakuSemester}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="Duriangkang" stackId="a" fill="#1E40AF" />
                  <Bar dataKey="Mukakuning" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="SeiLadi" stackId="a" fill="#60A5FA" />
                  <Bar dataKey="SeiHarapan" stackId="a" fill="#93C5FD" />
                  <Bar dataKey="Piayu" stackId="a" fill="#BAE6FD" />
                  <Bar dataKey="Nongsa" stackId="a" fill="#E0F2FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Volume air baku vs air curah per bulan */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  3. Volume Air Baku vs Air Curah per Bulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Perbandingan intake air baku dengan output air curah olahan (m³)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPAM_LIMBAH_DATA.volumeBakuVsCurah}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="volumeAirBaku" name="Volume Air Baku" fill="#1D4ED8" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="volumeAirCurah" name="Volume Air Curah" fill="#60A5FA" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Kapasitas tampung dan luas permukaan waduk */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  4. Kapasitas Tampung &amp; Luas Permukaan Waduk
                </h3>
                <p className="text-[11px] text-slate-500">
                  Kapasitas daya tampung (Juta m³, kolom) dan luas permukaan (Hektar, garis)
                </p>
              </div>
              <NatureBadge type="Terbuka" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={SPAM_LIMBAH_DATA.kapasitasDanLuasWaduk}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: '#1E40AF' }}
                    tickFormatter={(v) => `${v}M m³`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 10, fill: '#0284C7' }}
                    tickFormatter={(v) => `${v} Ha`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar
                    yAxisId="left"
                    dataKey="kapasitasTampungJutaM3"
                    name="Kapasitas Daya Tampung (Juta m³)"
                    fill="#2563EB"
                    radius={[3, 3, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="luasPermukaanHa"
                    name="Luas Permukaan (Ha)"
                    stroke="#0284C7"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#0284C7' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. Penyediaan air baku ke industri Batamindo */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  5. Penyediaan Air Baku ke Industri Batamindo
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volume penyaluran air baku untuk kawasan industri Batamindo (m³)
                </p>
              </div>
              <NatureBadge type="Terbuka" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPAM_LIMBAH_DATA.airBakuBatamindo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="jumlahM3" name="Jumlah Air Baku (m³)" fill="#1D4ED8" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 6. Penggunaan bahan kimia pengolahan air */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  6. Penggunaan Bahan Kimia Pengolahan Air
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volume koagulan &amp; desinfektan: PAC, Klorin, Soda Ash, Polimer (kg)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Filter WTP Bahan Kimia"
                  value={filterWtpKimia}
                  onChange={(e) => setFilterWtpKimia(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 font-bold text-blue-900"
                >
                  <option value="Semua">Semua WTP</option>
                  <option value="WTP Duriangkang">WTP Duriangkang</option>
                  <option value="WTP Mukakuning">WTP Mukakuning</option>
                  <option value="WTP Sei Ladi">WTP Sei Ladi</option>
                </select>
                <NatureBadge type="Tertutup" />
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    SPAM_LIMBAH_DATA.bahanKimiaPerWtp[
                      filterWtpKimia as keyof typeof SPAM_LIMBAH_DATA.bahanKimiaPerWtp
                    ] || SPAM_LIMBAH_DATA.bahanKimiaPerWtp.Semua
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="pacKg" name="PAC (kg)" stackId="k" fill="#1E40AF" />
                  <Bar dataKey="klorinKg" name="Klorin (kg)" stackId="k" fill="#3B82F6" />
                  <Bar dataKey="sodaAshKg" name="Soda Ash (kg)" stackId="k" fill="#60A5FA" />
                  <Bar dataKey="polimerKg" name="Polimer (kg)" stackId="k" fill="#93C5FD" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* B. DISTRIBUSI DAN PELANGGAN                                          */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <SectionHeader letter="B" title="Distribusi dan Pelanggan" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 7. Volume air baca vs volume tagih */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  7. Volume Air Baca vs Volume Tagih
                </h3>
                <p className="text-[11px] text-slate-500">
                  Perbandingan pembacaan meter vs volume yang diterbitkan dalam rekening tagihan (m³)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Filter KPP Konsumsi Pelanggan"
                  value={filterKppKonsumsi}
                  onChange={(e) => setFilterKppKonsumsi(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 font-bold text-blue-900"
                >
                  <option value="Semua">Semua KPP</option>
                  <option value="KPP Batam Center">KPP Batam Center</option>
                  <option value="KPP Batu Aji">KPP Batu Aji</option>
                  <option value="KPP Tiban">KPP Tiban</option>
                </select>
                <NatureBadge type="Tertutup" />
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={
                    SPAM_LIMBAH_DATA.volumeBacaVsTagihPerKpp[
                      filterKppKonsumsi as keyof typeof SPAM_LIMBAH_DATA.volumeBacaVsTagihPerKpp
                    ] || SPAM_LIMBAH_DATA.volumeBacaVsTagihPerKpp.Semua
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const baca = payload.find((p) => p.dataKey === 'volumeBaca')?.value || 0;
                        const tagih = payload.find((p) => p.dataKey === 'volumeTagih')?.value || 0;
                        const selisih = Number(baca) - Number(tagih);
                        return (
                          <div className="bg-white/95 backdrop-blur-md p-2.5 border border-blue-200 rounded-lg shadow-lg text-xs z-50">
                            <div className="font-bold text-slate-900 border-b pb-1 mb-1">{label}</div>
                            <div className="text-[11px] text-blue-700">Volume Baca: {formatNumber(Number(baca))} m³</div>
                            <div className="text-[11px] text-sky-700">Volume Tagih: {formatNumber(Number(tagih))} m³</div>
                            <div className="text-[11px] font-bold text-amber-700 mt-1 pt-1 border-t border-slate-100">
                              Selisih (Under/Unbilled): {formatNumber(selisih)} m³ ({((selisih / Number(baca)) * 100).toFixed(1)}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Line type="monotone" dataKey="volumeBaca" name="Volume Baca (m³)" stroke="#1D4ED8" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="volumeTagih" name="Volume Tagih (m³)" stroke="#0284C7" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 8. Non Revenue Water (NRW) per triwulan */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  8. Non Revenue Water (NRW) per Triwulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Persentase tingkat kehilangan air fisik &amp; komersial vs batas target toleransi (%)
                </p>
              </div>
              <NatureBadge type="Terbuka" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SPAM_LIMBAH_DATA.nrwPerTriwulan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="triwulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    domain={[12, 20]}
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <ReferenceLine y={15.0} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'Ambang Batas Target 15.0%', fill: '#EF4444', fontSize: 9 }} />
                  <Line type="monotone" dataKey="nrwPersen" name="Realisasi NRW (%)" stroke="#1E40AF" strokeWidth={2.5} dot={{ r: 4, fill: '#1E40AF' }} />
                  <Line type="monotone" dataKey="targetNrw" name="Target NRW (%)" stroke="#60A5FA" strokeWidth={1.5} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 9. Jumlah pelanggan per DMZ (23 DMZ) */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between lg:col-span-2">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  9. Jumlah Pelanggan per District Meter Zone (DMZ) - 23 DMZ
                </h3>
                <p className="text-[11px] text-slate-500">
                  Distribusi sambungan langganan aktif (SL) diurutkan dari wilayah terpadat ke terendah
                </p>
              </div>
              <NatureBadge type="Terbuka" />
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPAM_LIMBAH_DATA.pelangganPerDmz} margin={{ bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis
                    dataKey="dmz"
                    tick={{ fontSize: 9, fill: '#475569' }}
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={50}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar dataKey="pelanggan" name="Jumlah Pelanggan (SL)" fill="#2563EB" radius={[3, 3, 0, 0]}>
                    {SPAM_LIMBAH_DATA.pelangganPerDmz.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index < 5 ? '#1E40AF' : index < 12 ? '#3B82F6' : '#60A5FA'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 10. Volume air baca per DMZ per bulan (Heatmap matrix) */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  10. Volume Air Baca per DMZ per Bulan (Heatmap)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Intensitas warna biru menggambarkan volume konsumsi air baca (Ribu m³)
                </p>
              </div>
              <NatureBadge type="Terbuka" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-blue-50/80 text-blue-900">
                    <th className="p-1.5 text-left border border-blue-100 font-bold sticky left-0 bg-blue-50 z-10">
                      DMZ
                    </th>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map((b) => (
                      <th key={b} className="p-1 text-center border border-blue-100 font-bold">
                        {b}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SPAM_LIMBAH_DATA.heatmapDmzBulan.map((row) => (
                    <tr key={row.dmz} className="hover:bg-slate-50">
                      <td className="p-1 text-slate-800 font-medium border border-slate-100 sticky left-0 bg-white z-10 whitespace-nowrap">
                        {row.dmz}
                      </td>
                      {(['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'] as const).map(
                        (b) => {
                          const val = (row as any)[b];
                          // Scale color based on volume (400 to 960)
                          const ratio = (val - 400) / 560;
                          const bgStyle =
                            ratio > 0.8
                              ? '#1E40AF'
                              : ratio > 0.6
                              ? '#2563EB'
                              : ratio > 0.4
                              ? '#3B82F6'
                              : ratio > 0.2
                              ? '#60A5FA'
                              : '#93C5FD';
                          const textColor = ratio > 0.4 ? '#FFFFFF' : '#1E293B';
                          return (
                            <td
                              key={b}
                              title={`${row.dmz} - ${b}: ${val.toLocaleString('id-ID')} Ribu m³`}
                              className="p-1 text-center font-mono font-bold border border-slate-100 cursor-pointer"
                              style={{ backgroundColor: bgStyle, color: textColor }}
                            >
                              {val}
                            </td>
                          );
                        }
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 mt-2">
                <span>Rendah (400k m³)</span>
                <div className="flex h-2.5 w-24 rounded overflow-hidden">
                  <div className="w-1/5 bg-[#93C5FD]" />
                  <div className="w-1/5 bg-[#60A5FA]" />
                  <div className="w-1/5 bg-[#3B82F6]" />
                  <div className="w-1/5 bg-[#2563EB]" />
                  <div className="w-1/5 bg-[#1E40AF]" />
                </div>
                <span>Tinggi (&gt;900k m³)</span>
              </div>
            </div>
          </div>

          {/* 11. Komposisi volume menurut kategori pelanggan */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  11. Komposisi Volume Menurut Kategori Pelanggan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Pangsa volume tagihan air per segmen pemakai (m³)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3">
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SPAM_LIMBAH_DATA.komposisiPelangganVolume}
                      dataKey="volumeTagihM3"
                      nameKey="kategori"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={2}
                    >
                      {SPAM_LIMBAH_DATA.komposisiPelangganVolume.map((entry, index) => (
                        <Cell key={`slice-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 text-xs">
                {SPAM_LIMBAH_DATA.komposisiPelangganVolume.map((item) => (
                  <div key={item.kategori} className="flex items-center justify-between text-[11px] border-b border-slate-50 pb-1">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="truncate text-slate-700">{item.kategori}</span>
                    </span>
                    <span className="font-bold text-slate-900 shrink-0 font-mono">
                      {item.persentase}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* C. KEPUASAN LAYANAN                                                  */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <SectionHeader letter="C" title="Kepuasan Layanan" />

        {/* 12. Persepsi pengguna jasa per pertanyaan (100% stacked bar) */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                12. Persepsi Pengguna Jasa per Pertanyaan (100% Stacked Bar)
              </h3>
              <p className="text-[11px] text-slate-500">
                Distribusi survei kepuasan pelanggan SPAM Fasling berdasarkan dimensi pelayanan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                aria-label="Filter Periode Kepuasan Layanan"
                value={filterPeriodePersepsi}
                onChange={(e) => setFilterPeriodePersepsi(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1 font-bold text-blue-900"
              >
                <option value="Semester 1 2026">Semester 1 2026</option>
                <option value="Tahun 2025">Tahun 2025</option>
              </select>
              <NatureBadge type="Tertutup" />
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={
                  SPAM_LIMBAH_DATA.persepsiPenggunaJasa[
                    filterPeriodePersepsi as keyof typeof SPAM_LIMBAH_DATA.persepsiPenggunaJasa
                  ] || SPAM_LIMBAH_DATA.persepsiPenggunaJasa['Semester 1 2026']
                }
                margin={{ left: 160, right: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="pertanyaan"
                  tick={{ fontSize: 10, fill: '#334155' }}
                  width={155}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                <Bar dataKey="sangatPuas" name="Sangat Puas" stackId="p" fill="#1D4ED8" />
                <Bar dataKey="puas" name="Puas" stackId="p" fill="#3B82F6" />
                <Bar dataKey="cukupPuas" name="Cukup Puas" stackId="p" fill="#93C5FD" />
                <Bar dataKey="tidakPuas" name="Tidak Puas" stackId="p" fill="#CBD5E1" />
                <Bar dataKey="sangatTidakPuas" name="Sangat Tidak Puas" stackId="p" fill="#94A3B8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* D. PENGELOLAAN LIMBAH                                                */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <SectionHeader letter="D" title="Pengelolaan Limbah" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 13. Volume layanan limbah per bulan */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  13. Volume Layanan Limbah per Bulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volume penanganan limbah cair, domestik umum, dan sedot tinja IPLT (m³)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPAM_LIMBAH_DATA.volumeLayananLimbah}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="limbahCairM3" name="Pengolahan Limbah Cair (m³)" stackId="l" fill="#1E40AF" />
                  <Bar dataKey="limbahDomestikM3" name="Pemesanan Limbah Domestik (m³)" stackId="l" fill="#3B82F6" />
                  <Bar dataKey="sumurTinjaM3" name="Pengurasan Sumur Tinja (m³)" stackId="l" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 14. Jumlah trip pengurasan per zona */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  14. Jumlah Trip Pengurasan per Zona
                </h3>
                <p className="text-[11px] text-slate-500">
                  Aktivitas armada mobil tangki IPLT diurutkan dari zona terbanyak
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={SPAM_LIMBAH_DATA.tripPengurasanZona}
                  margin={{ left: 130 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis type="category" dataKey="zona" tick={{ fontSize: 10, fill: '#334155' }} width={125} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="trip" name="Jumlah Trip Armada" fill="#2563EB" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 15. Berat limbah B3 dan persentase yang ditangani */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  15. Berat Limbah B3 &amp; Persentase yang Ditangani
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volume limbah B3 masuk (Padat, Sludge, Cair dlm Ton) dan rasio pengolahan (%)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={SPAM_LIMBAH_DATA.limbahB3Ditangani}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: '#1E40AF' }}
                    tickFormatter={(v) => `${v} T`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[90, 100]}
                    tick={{ fontSize: 10, fill: '#0284C7' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar yAxisId="left" dataKey="padatTon" name="Padat (Ton)" stackId="b3" fill="#1D4ED8" />
                  <Bar yAxisId="left" dataKey="sludgeTon" name="Sludge (Ton)" stackId="b3" fill="#3B82F6" />
                  <Bar yAxisId="left" dataKey="cairTon" name="Cair (Ton)" stackId="b3" fill="#60A5FA" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="persentase"
                    name="% Ditangani/Diolah"
                    stroke="#0284C7"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#0284C7' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 16. Produksi dan distribusi kompos organik */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  16. Produksi &amp; Distribusi Kompos Organik
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hasil produksi, distribusi pemesanan (karung/25 kg), serta sisa persediaan
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={SPAM_LIMBAH_DATA.komposOrganik}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="produksiKarung" name="Hasil Produksi (Karung)" fill="#1E40AF" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="distribusiKarung" name="Distribusi (Karung)" fill="#60A5FA" radius={[2, 2, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="stockAkhirKarung"
                    name="Stock Akhir (Karung)"
                    stroke="#0284C7"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* E. PENERIMAAN DAN KINERJA                                            */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <SectionHeader letter="E" title="Penerimaan dan Kinerja" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 17. PNBP air per bulan */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  17. PNBP Air per Bulan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Realisasi penerimaan negara bukan pajak Pengelolaan Air &amp; HGAT (Rupiah Miliar)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SPAM_LIMBAH_DATA.pnbpAirBulanan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748B' }}
                    tickFormatter={(v) => `Rp ${v}M`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="pnbpAirMiliar" name="PNBP Pengelolaan Air (Miliar)" stackId="pnbp" fill="#1D4ED8" />
                  <Bar dataKey="pnbpHgatMiliar" name="PNBP HGAT (Miliar)" stackId="pnbp" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 18. Capaian penerimaan terhadap target */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  18. Capaian Penerimaan terhadap Target
                </h3>
                <p className="text-[11px] text-slate-500">
                  Perbandingan target s/d periode dengan realisasi penerimaan (Rupiah Miliar)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Filter Unit Capaian Penerimaan"
                  value={filterUnitPenerimaan}
                  onChange={(e) => setFilterUnitPenerimaan(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 font-bold text-blue-900"
                >
                  <option value="Semua Unit">Semua Unit</option>
                  <option value="Subdit Air Minum">Subdit Air Minum</option>
                  <option value="Subdit Pengelolaan Limbah">Subdit Pengelolaan Limbah</option>
                </select>
                <NatureBadge type="Tertutup" />
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={
                    SPAM_LIMBAH_DATA.capaianPenerimaan[
                      filterUnitPenerimaan as keyof typeof SPAM_LIMBAH_DATA.capaianPenerimaan
                    ] || SPAM_LIMBAH_DATA.capaianPenerimaan['Semua Unit']
                  }
                  margin={{ left: 140 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(v) => `${v}M`} />
                  <YAxis type="category" dataKey="jenis" tick={{ fontSize: 10, fill: '#334155' }} width={135} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="targetMiliar" name="Target s/d Periode (Miliar)" fill="#93C5FD" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="realisasiMiliar" name="Realisasi (Miliar)" fill="#1D4ED8" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 19. Capaian produksi terhadap target */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  19. Capaian Produksi terhadap Target
                </h3>
                <p className="text-[11px] text-slate-500">
                  Volume target vs realisasi produksi air dan pengolahan limbah (Juta m³ / Satuan)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Filter Unit Capaian Produksi"
                  value={filterUnitProduksi}
                  onChange={(e) => setFilterUnitProduksi(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 font-bold text-blue-900"
                >
                  <option value="Semua Unit">Semua Unit</option>
                  <option value="Subdit Air Minum">Subdit Air Minum</option>
                  <option value="Subdit Pengelolaan Limbah">Subdit Pengelolaan Limbah</option>
                </select>
                <NatureBadge type="Tertutup" />
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={
                    SPAM_LIMBAH_DATA.capaianProduksi[
                      filterUnitProduksi as keyof typeof SPAM_LIMBAH_DATA.capaianProduksi
                    ] || SPAM_LIMBAH_DATA.capaianProduksi['Semua Unit']
                  }
                  margin={{ left: 160 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis type="category" dataKey="jenis" tick={{ fontSize: 10, fill: '#334155' }} width={155} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="targetVolumeJuta" name="Target (Juta m³)" fill="#93C5FD" radius={[0, 2, 2, 0]} />
                  <Bar dataKey="realisasiVolumeJuta" name="Realisasi (Juta m³)" fill="#2563EB" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 20. Penyelesaian piutang per jenis piutang */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  20. Penyelesaian Piutang per Jenis Piutang
                </h3>
                <p className="text-[11px] text-slate-500">
                  Status penagihan piutang rekening air dan retribusi limbah (Miliar Rupiah)
                </p>
              </div>
              <NatureBadge type="Tertutup" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={SPAM_LIMBAH_DATA.penyelesaianPiutang}
                  margin={{ left: 160 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(v) => `Rp ${v}M`} />
                  <YAxis type="category" dataKey="jenis" tick={{ fontSize: 10, fill: '#334155' }} width={155} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                  <Bar dataKey="realisasiMiliar" name="Realisasi Penyelesaian (Miliar)" stackId="p" fill="#1D4ED8" />
                  <Bar dataKey="sisaPiutangMiliar" name="Sisa Piutang (Miliar)" stackId="p" fill="#BFDBFE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* F. PETA INFRASTRUKTUR AIR MINUM                                      */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <SectionHeader letter="F" title="Peta Infrastruktur Air Minum" />

        <div className="bg-white rounded-xl border border-blue-100 shadow-xs p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900">
                  21. Peta Spasial Infrastruktur Air Minum &amp; Jaringan Distribusi Pulau Batam
                </h3>
                <NatureBadge type="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pemetaan geografis interaktif waduk, instalasi WTP, pipa transmisi, booster pump, reservoir, dan stress area
              </p>
            </div>

            {/* Quick Map Legend/Stats */}
            <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-blue-50/70 px-3 py-1.5 rounded-lg border border-blue-100">
              <span className="font-bold text-blue-900">6 Waduk Utama</span>
              <span className="text-slate-300">&bull;</span>
              <span className="font-bold text-blue-900">6 IPA WTP</span>
              <span className="text-slate-300">&bull;</span>
              <span className="font-bold text-blue-900">23 DMZ Zone</span>
              <span className="text-slate-300">&bull;</span>
              <span className="font-bold text-blue-900">4 Stress Area</span>
            </div>
          </div>

          {/* Layer Checkboxes */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Layer Peta Aktif (Centang untuk menampilkan):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.waduk}
                  onChange={() => toggleLayer('waduk')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span className="text-slate-700 font-medium">Waduk (6)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.ipa}
                  onChange={() => toggleLayer('ipa')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-800 inline-block" />
                <span className="text-slate-700 font-medium">IPA / WTP (6)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.jaringan}
                  onChange={() => toggleLayer('jaringan')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-4 h-0.5 bg-blue-600 inline-block" />
                <span className="text-slate-700 font-medium">Jaringan Pipa (Trunk)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.tanki}
                  onChange={() => toggleLayer('tanki')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rounded bg-sky-500 inline-block" />
                <span className="text-slate-700 font-medium">Tanki / Reservoir (6)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.booster}
                  onChange={() => toggleLayer('booster')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rotate-45 bg-amber-500 inline-block" />
                <span className="text-slate-700 font-medium">Booster Pump (5)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.meterLogger}
                  onChange={() => toggleLayer('meterLogger')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-slate-700 font-medium">Meter Logger (5)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.sebaran}
                  onChange={() => toggleLayer('sebaran')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 opacity-60 inline-block" />
                <span className="text-slate-700 font-medium">Sebaran Pelanggan</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.stressArea}
                  onChange={() => toggleLayer('stressArea')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/50 inline-block" />
                <span className="text-slate-700 font-medium">Peta Stress Area (4)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mapLayers.dmz}
                  onChange={() => toggleLayer('dmz')}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="w-3 h-2 border border-blue-500 bg-blue-100 inline-block" />
                <span className="text-slate-700 font-medium">Wilayah DMZ</span>
              </label>
            </div>
          </div>

          {/* Interactive Map Canvas Container */}
          <div className="relative w-full h-[520px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center">
            {/* SVG Interactive Map of Pulau Batam */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="batamLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <radialGradient id="stressAreaGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#DC2626" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.0" />
                </radialGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ocean / Background Details */}
              <rect width="100" height="100" fill="#0B1329" />
              {/* Subtle coastal grid */}
              <path
                d="M 10,0 L 10,100 M 20,0 L 20,100 M 30,0 L 30,100 M 40,0 L 40,100 M 50,0 L 50,100 M 60,0 L 60,100 M 70,0 L 70,100 M 80,0 L 80,100 M 90,0 L 90,100"
                stroke="#1E293B"
                strokeWidth="0.2"
                strokeDasharray="1,2"
              />
              <path
                d="M 0,10 L 100,10 M 0,20 L 100,20 M 0,30 L 100,30 M 0,40 L 100,40 M 0,50 L 100,50 M 0,60 L 100,60 M 0,70 L 100,70 M 0,80 L 100,80 M 0,90 L 100,90"
                stroke="#1E293B"
                strokeWidth="0.2"
                strokeDasharray="1,2"
              />

              {/* Pulau Batam Coastline Polygon */}
              <polygon
                points="30,42 32,36 38,32 44,28 50,28 58,26 66,28 72,32 75,38 72,46 68,52 65,60 62,68 58,74 52,78 44,76 36,74 30,70 26,62 26,52 28,46"
                fill="url(#batamLandGradient)"
                stroke="#3B82F6"
                strokeWidth="0.6"
              />

              {/* Pulau Rempang & Galang (Southern outline) */}
              <polygon
                points="48,82 56,80 58,86 54,92 46,90"
                fill="#1E293B"
                stroke="#1D4ED8"
                strokeWidth="0.4"
                strokeDasharray="0.5,0.5"
              />

              {/* LAYER: Wilayah DMZ (Polygons) */}
              {mapLayers.dmz &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.wilayahDmz.map((dmz) => (
                  <polygon
                    key={dmz.id}
                    points={dmz.points}
                    fill={dmz.warna}
                    fillOpacity={0.25}
                    stroke={dmz.warna}
                    strokeWidth="0.4"
                    strokeDasharray="0.8,0.8"
                    className="cursor-pointer transition-all hover:fill-opacity-50"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Wilayah DMZ',
                        nama: dmz.nama,
                        info: 'Distrik meter terisolasi untuk pemantauan flow & tekanan',
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  />
                ))}

              {/* LAYER: Stress Area (Low pressure / vulnerable zones) */}
              {mapLayers.stressArea &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.stressArea.map((sa) => (
                  <circle
                    key={sa.id}
                    cx={sa.x}
                    cy={sa.y}
                    r={sa.r / 3}
                    fill="url(#stressAreaGradient)"
                    stroke="#EF4444"
                    strokeWidth="0.3"
                    strokeDasharray="0.5,0.5"
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Peta Stress Area (Rawan Tekanan)',
                        nama: sa.nama,
                        info: sa.masalah,
                        coords: `X:${sa.x}, Y:${sa.y}`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  />
                ))}

              {/* LAYER: Jaringan Pipa (Trunk lines) */}
              {mapLayers.jaringan &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.pipaJaringan.map((pipe) => (
                  <polyline
                    key={pipe.id}
                    points={pipe.points}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer hover:stroke-cyan-300 transition-colors"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Jaringan Pipa Transmisi',
                        nama: pipe.nama,
                        info: 'Pipa Utama Pasokan Air Bersih Curah',
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  />
                ))}

              {/* LAYER: Waduk (Reservoirs / Lakes) */}
              {mapLayers.waduk &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.waduk.map((w) => (
                  <g
                    key={w.id}
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Waduk Sumber Air Baku',
                        nama: w.nama,
                        info: `Daya Tampung: ${w.volumeJutaM3} Juta m³ | Luas: ${w.luasHa} Ha`,
                        coords: `${w.lat.toFixed(3)}° N, ${w.lng.toFixed(3)}° E`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  >
                    <ellipse
                      cx={w.x}
                      cy={w.y}
                      rx={w.id === 'w-1' ? 4.5 : 2.8}
                      ry={w.id === 'w-1' ? 3.5 : 2.0}
                      fill="#0284C7"
                      fillOpacity={0.7}
                      stroke="#38BDF8"
                      strokeWidth="0.5"
                    />
                    <text
                      x={w.x}
                      y={w.y + 0.8}
                      fontSize="1.6"
                      fill="#FFFFFF"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {w.nama.replace('Waduk ', '')}
                    </text>
                  </g>
                ))}

              {/* LAYER: IPA WTP (Water Treatment Plants) */}
              {mapLayers.ipa &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.ipaWtp.map((ipa) => (
                  <g
                    key={ipa.id}
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Instalasi Pengolahan Air (IPA / WTP)',
                        nama: ipa.nama,
                        info: `Kapasitas: ${ipa.kapasitas} | Teknologi: ${ipa.teknologi}`,
                        coords: `${ipa.lat.toFixed(3)}° N, ${ipa.lng.toFixed(3)}° E`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  >
                    <circle cx={ipa.x} cy={ipa.y} r="1.8" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="0.4" />
                    <circle cx={ipa.x} cy={ipa.y} r="2.8" fill="none" stroke="#60A5FA" strokeWidth="0.2" className="animate-ping" />
                    <text x={ipa.x} y={ipa.y - 2.5} fontSize="1.8" fill="#93C5FD" textAnchor="middle" fontWeight="bold">
                      {ipa.nama.replace('IPA WTP ', 'WTP ')}
                    </text>
                  </g>
                ))}

              {/* LAYER: Tanki / Reservoir */}
              {mapLayers.tanki &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.tankiReservoir.map((tk) => (
                  <g
                    key={tk.id}
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Tanki / Reservoir Distribusi',
                        nama: tk.nama,
                        info: `Kapasitas: ${tk.kapasitasM3.toLocaleString('id-ID')} m³ | Elevasi: ${tk.elevasiM} mdpl`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  >
                    <rect x={tk.x - 1.2} y={tk.y - 1.2} width="2.4" height="2.4" rx="0.4" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="0.3" />
                  </g>
                ))}

              {/* LAYER: Booster Pump */}
              {mapLayers.booster &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.boosterPump.map((bp) => (
                  <g
                    key={bp.id}
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Booster Pump Station',
                        nama: bp.nama,
                        info: `Debit: ${bp.debitLps} L/detik | Head: ${bp.headM} m`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  >
                    <polygon
                      points={`${bp.x},${bp.y - 1.5} ${bp.x + 1.3},${bp.y + 1.2} ${bp.x - 1.3},${bp.y + 1.2}`}
                      fill="#F59E0B"
                      stroke="#FFFFFF"
                      strokeWidth="0.3"
                    />
                  </g>
                ))}

              {/* LAYER: Meter Logger */}
              {mapLayers.meterLogger &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.meterLogger.map((ml) => (
                  <g
                    key={ml.id}
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'DMA Meter Logger Real-Time',
                        nama: ml.nama,
                        info: `Tekanan: ${ml.tekananBar} bar | Flow: ${ml.flowLps} Lps | Status: ${ml.status}`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  >
                    <circle cx={ml.x} cy={ml.y} r="1.1" fill="#10B981" stroke="#FFFFFF" strokeWidth="0.3" />
                  </g>
                ))}

              {/* LAYER: Sebaran Pelanggan (Cluster heatpoint) */}
              {mapLayers.sebaran &&
                SPAM_LIMBAH_DATA.petaInfrastruktur.sebaranPelanggan.map((sp) => (
                  <circle
                    key={sp.id}
                    cx={sp.x}
                    cy={sp.y}
                    r={sp.density / 22}
                    fill="#38BDF8"
                    fillOpacity={0.2}
                    stroke="#38BDF8"
                    strokeWidth="0.2"
                    strokeDasharray="0.5,0.5"
                    className="cursor-pointer"
                    onMouseEnter={() =>
                      setMapHoveredItem({
                        type: 'Sebaran Klaster Pelanggan',
                        nama: sp.nama,
                        info: `Kerapatan Beban Jaringan: ${sp.density}%`,
                      })
                    }
                    onMouseLeave={() => setMapHoveredItem(null)}
                  />
                ))}
            </svg>

            {/* Hover Tooltip Overlay on Map */}
            {mapHoveredItem ? (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-blue-300 p-3 rounded-lg shadow-xl text-xs max-w-sm pointer-events-none transition-all">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span>{mapHoveredItem.type}</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {mapHoveredItem.nama}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  {mapHoveredItem.info}
                </div>
                {mapHoveredItem.coords && (
                  <div className="text-[10px] font-mono text-blue-800 font-bold mt-1 pt-1 border-t border-slate-100">
                    Koordinat: {mapHoveredItem.coords}
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 rounded-lg text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Arahkan kursor pada waduk, WTP, jaringan pipa, atau stress area untuk melihat detail spasial</span>
              </div>
            )}

            {/* Compass Rose overlay */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 border border-slate-700 p-2 rounded-lg text-center text-[10px] text-slate-400 font-bold pointer-events-none">
              <div className="text-blue-400 font-mono text-xs">U</div>
              <div className="text-slate-500 font-mono text-[9px]">B &bull; T</div>
              <div className="text-slate-500 font-mono text-[9px]">S</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
