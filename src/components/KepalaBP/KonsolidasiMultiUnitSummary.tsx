import React, { useState } from 'react';
import {
  Ship,
  Droplets,
  MapPin,
  HardHat,
  Clock,
  Stethoscope,
  Plane,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileText,
  BarChart3,
  Calendar,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

// ============================================================================
// DATASET VISUALISASI BERDASARKAN DOKUMEN ATRIBUT SATU DATA BP BATAM (NON-IKS)
// ============================================================================

// 1. Logistik Maritim & Arus Petikemas Bulanan (Buku Satu Data Hal. 14-17)
const DATA_LOGISTIK_BULANAN = [
  { bln: 'Jan', ekspor: 24, impor: 18, domestik: 12, total: 54 },
  { bln: 'Feb', ekspor: 26, impor: 19, domestik: 13, total: 58 },
  { bln: 'Mar', ekspor: 29, impor: 21, domestik: 14, total: 64 },
  { bln: 'Apr', ekspor: 31, impor: 23, domestik: 15, total: 69 },
  { bln: 'Mei', ekspor: 34, impor: 24, domestik: 16, total: 74 },
  { bln: 'Jun', ekspor: 36, impor: 26, domestik: 16, total: 78 },
  { bln: 'Jul', ekspor: 38, impor: 27, domestik: 17, total: 82 },
  { bln: 'Ags', ekspor: 40, impor: 28, domestik: 18, total: 86 },
  { bln: 'Sep', ekspor: 42, impor: 30, domestik: 19, total: 91 },
];

// 2. Ketahanan 6 Waduk Air Baku (Buku Satu Data Hal. 28-37)
const DATA_6_WADUK_DONUT = [
  { name: 'Duriangkang', volume: 78.56, persen: 98.2, color: '#2563EB' },
  { name: 'Tembesi', volume: 56.40, persen: 96.5, color: '#38BDF8' },
  { name: 'Mukakuning', volume: 13.20, persen: 95.0, color: '#6366F1' },
  { name: 'Sei Ladi', volume: 9.45, persen: 86.4, color: '#F59E0B' }, // Waspada
  { name: 'Sei Harapan', volume: 3.63, persen: 94.1, color: '#10B981' },
  { name: 'Nongsa', volume: 0.72, persen: 92.0, color: '#A855F7' },
];

// 3. Ketersediaan Lahan 7 SWP Batam (Buku Satu Data Hal. 6-8)
const DATA_LAHAN_7_SWP = [
  { swp: 'Batam Kota', terisi: 2500, cadangan: 340 },
  { swp: 'Nongsa', terisi: 2680, cadangan: 1440 },
  { swp: 'Sekupang', terisi: 1740, cadangan: 710 },
  { swp: 'Batu Aji', terisi: 1624, cadangan: 356 },
  { swp: 'Sagulung', terisi: 1824, cadangan: 296 },
  { swp: 'Lubuk Baja', terisi: 1110, cadangan: 70 },
  { swp: 'Batu Ampar', terisi: 902, cadangan: 38 },
];

// 4. Kurva S Kumulatif 14 Megaproyek Fisik (Buku Satu Data Hal. 48-50)
const DATA_KURVA_S_PROYEK = [
  { bln: 'Jan', target: 8.0, aktual: 8.5 },
  { bln: 'Feb', target: 18.0, aktual: 19.2 },
  { bln: 'Mar', target: 30.0, aktual: 31.8 },
  { bln: 'Apr', target: 45.0, aktual: 46.5 },
  { bln: 'Mei', target: 58.0, aktual: 59.4 },
  { bln: 'Jun', target: 72.0, aktual: 73.8 },
  { bln: 'Jul', target: 84.0, aktual: 85.6 },
  { bln: 'Ags', target: 92.0, aktual: 92.4 },
  { bln: 'Sep', target: 96.0, aktual: 96.8 },
];

// 5. Kinerja Serapan Belanja Multi-Unit (Pagu vs Realisasi) (Buku Satu Data Hal. 2-5, 14, 20, 28, 48)
interface SerapanMultiUnitItem {
  satker: string;
  unitSingkat: string;
  deputiId: string;
  pagu: number; // Miliar Rp
  realisasi: number; // Miliar Rp
  persen: number;
  targetTriwulan: number;
}

const DATA_SERAPAN_MULTI_UNIT: SerapanMultiUnitItem[] = [
  { satker: 'Dit. Pembangunan Infrastruktur', unitSingkat: 'Dit. Infrastruktur', deputiId: 'deputi-infrastruktur', pagu: 842.5, realisasi: 724.6, persen: 86.0, targetTriwulan: 80.0 },
  { satker: 'BU SPAM, Fasilitas & Lingkungan', unitSingkat: 'BU SPAM & Fasling', deputiId: 'deputi-pelayanan-umum', pagu: 420.0, realisasi: 352.8, persen: 84.0, targetTriwulan: 80.0 },
  { satker: 'Dit. Pengelolaan Kepelabuhanan', unitSingkat: 'Dit. Kepelabuhanan', deputiId: 'deputi-bandara-pelabuhan', pagu: 385.0, realisasi: 327.3, persen: 85.0, targetTriwulan: 80.0 },
  { satker: 'Biro Umum & Operasional', unitSingkat: 'Biro Umum & Ops', deputiId: 'deputi-administrasi-keuangan', pagu: 210.0, realisasi: 182.7, persen: 87.0, targetTriwulan: 80.0 },
  { satker: 'Dit. Pengelolaan Pertanahan', unitSingkat: 'Dit. Pertanahan', deputiId: 'deputi-pengelolaan-lahan', pagu: 180.0, realisasi: 158.4, persen: 88.0, targetTriwulan: 80.0 },
  { satker: 'BU Rumah Sakit BP Batam', unitSingkat: 'BU RSBP', deputiId: 'deputi-pelayanan-umum', pagu: 135.0, realisasi: 109.4, persen: 81.0, targetTriwulan: 80.0 },
];

// 6. Papan Status Tindak Lanjut & Arahan Pimpinan (Tabel Elegan Referensi)
const DATA_TINDAK_LANJUT_TABLE = [
  { unit: 'Dit. Pembangunan Infrastruktur', topik: 'Flyover Sei Ladi segmen barat & penataan simpang', halSatuData: 'Hal. 48', status: 'Selesai', progres: 100, tenggat: '15 Maret 2026' },
  { unit: 'Dit. Pengelolaan Pertanahan', topik: 'Penagihan piutang UWT & penerbitan 1.650 SKPT/PL', halSatuData: 'Hal. 6', status: 'On Track', progres: 82, tenggat: '30 April 2026' },
  { unit: 'BU SPAM, Fasilitas & Lingkungan', topik: 'Booster pump Waduk Tembesi-Mukakuning & 23 DMZ', halSatuData: 'Hal. 34', status: 'On Track', progres: 90, tenggat: '10 Mei 2026' },
  { unit: 'Dit. Pengelolaan Kepelabuhanan', topik: 'Otomatisasi STS Crane Dermaga Utara Batu Ampar', halSatuData: 'Hal. 17', status: 'Selesai', progres: 100, tenggat: '28 Februari 2026' },
  { unit: 'Satuan Pemeriksaan Intern (SPI)', topik: 'Penyelesaian 148 rekomendasi BPK RI (Opini WTP)', halSatuData: 'Hal. 8', status: 'On Track', progres: 94, tenggat: '30 Juni 2026' },
  { unit: 'Biro Sumber Daya Manusia', topik: 'Pemenuhan 20 JP diklat & Sistem Merit Skor 342,5', halSatuData: 'Hal. 2', status: 'Selesai', progres: 91, tenggat: '15 Mei 2026' },
];

interface KonsolidasiMultiUnitSummaryProps {
  onOpenSatuDataFormula: (metricId: string) => void;
  onNavigateToUnit?: (unitId: string) => void;
}

export const KonsolidasiMultiUnitSummary: React.FC<KonsolidasiMultiUnitSummaryProps> = ({
  onOpenSatuDataFormula,
  onNavigateToUnit,
}) => {
  const [selectedBln, setSelectedBln] = useState<string>('Sep');

  return (
    <div className="space-y-5">


      {/* ==================================================================== */}
      {/* GRID 1: DUA KARTU UTAMA (VIBRANT ROYAL BLUE & SOFT CYAN TINT)        */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* CARD 1: Logistik Maritim Terminal Batu Ampar - SIGNATURE VIBRANT ROYAL BLUE CARD */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-xl p-3.5 sm:p-4 shadow-xs border border-blue-500/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Arus Petikemas Terminal Batu Ampar
              </h3>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-white leading-none">612.400</span>
                <span className="text-[10px] text-blue-200 font-medium ml-1.5">TEUs (94,2%)</span>
              </div>
            </div>

            {/* Legenda Ringkas */}
            <div className="flex items-center gap-3 text-[10px] py-1 text-blue-100">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-xs bg-white" /> Ekspor 46%
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-xs bg-sky-300" /> Impor 33%
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-xs bg-purple-300" /> Domestik 21%
              </span>
            </div>

            {/* Stacked Bar Chart Compact */}
            <div className="h-28 sm:h-32 w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_LOGISTIK_BULANAN} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.15)" />
                  <XAxis dataKey="bln" tick={{ fontSize: 9, fill: '#E0E7FF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8.5, fill: '#E0E7FF' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val}.000 TEUs`, name === 'ekspor' ? 'Ekspor' : name === 'impor' ? 'Impor' : 'Domestik']}
                    contentStyle={{ fontSize: '10.5px', borderRadius: '8px', border: '1px solid #3B82F6', backgroundColor: '#1E293B', color: '#fff' }}
                  />
                  <Bar dataKey="ekspor" stackId="a" fill="#FFFFFF" barSize={14} />
                  <Bar dataKey="impor" stackId="a" fill="#7DD3FC" barSize={14} />
                  <Bar dataKey="domestik" stackId="a" fill="#D8B4FE" radius={[3, 3, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CARD 2: Ketahanan 6 Waduk Air Baku (Segmented Donut) - SOFT CYAN / SKY TINT */}
        <div className="lg:col-span-5 bg-gradient-to-br from-cyan-50/70 via-sky-50/40 to-white rounded-xl border border-cyan-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Kapasitas 6 Waduk Air Baku
              </h3>
              <span className="text-[10.5px] font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                96,8% Siaga Aman
              </span>
            </div>

            {/* Donut Chart with Center Metric */}
            <div className="relative h-28 flex items-center justify-center my-0.5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DATA_6_WADUK_DONUT}
                    innerRadius={36}
                    outerRadius={50}
                    paddingAngle={2.5}
                    dataKey="volume"
                  >
                    {DATA_6_WADUK_DONUT.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val} Juta m³ (${item.payload.persen}%)`,
                      name,
                    ]}
                    contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-black text-slate-900 leading-none">161,9M</span>
                <span className="text-[8.5px] text-slate-400 font-medium">m³</span>
              </div>
            </div>

            {/* Mini Legend List per Waduk Compact */}
            <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-[10px] pt-1.5 border-t border-slate-100">
              {DATA_6_WADUK_DONUT.map((w, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-600 truncate">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                    {w.name}
                  </span>
                  <span className={`font-semibold ${w.persen < 90 ? 'text-amber-700 font-bold' : 'text-slate-700'}`}>
                    {w.persen}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* GRID 2: TIGA KARTU VISUAL MENENGAH (LEBIH RINGKAS & PADAT)           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* CARD 3: Ketersediaan Lahan 7 SWP (Grouped Bar Chart) - SOFT BLUE TINT */}
        <div className="bg-gradient-to-br from-blue-50/70 via-slate-50/40 to-white rounded-xl border border-blue-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-slate-900">
                Lahan 7 SWP
              </h3>
              <span className="text-[10px] font-bold text-blue-800 bg-white/90 border border-blue-200 px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                3.250 Ha Cadangan
              </span>
            </div>

            <div className="flex items-center gap-3 text-[9.5px] text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-blue-600" /> Terisi
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-emerald-500" /> Cadangan
              </span>
            </div>

            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_LAHAN_7_SWP} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="swp" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Ha`, name === 'terisi' ? 'Alokasi' : 'Cadangan']}
                    contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                  />
                  <Bar dataKey="terisi" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={7} />
                  <Bar dataKey="cadangan" fill="#10B981" radius={[2, 2, 0, 0]} barSize={7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CARD 4: Kurva S 14 Megaproyek Fisik (Double Line Spline) - SOFT INDIGO TINT */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/30 to-white rounded-xl border border-indigo-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-slate-900">
                Kurva S 14 Megaproyek
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                Ahead +0,8%
              </span>
            </div>

            <div className="flex items-center gap-3 text-[9.5px] text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-slate-400 inline-block" /> Rencana
              </span>
              <span className="flex items-center gap-1 font-semibold text-blue-600">
                <span className="w-2 h-0.5 bg-blue-600 inline-block" /> Realisasi
              </span>
            </div>

            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DATA_KURVA_S_PROYEK} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="bln" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val}%`, name === 'target' ? 'Rencana' : 'Realisasi']}
                    contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="aktual" stroke="#2563EB" strokeWidth={2} dot={{ r: 2.5, fill: '#2563EB' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CARD 5: Kinerja Serapan Belanja Multi-Unit (Pagu vs Realisasi) - SOFT EMERALD TINT */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white rounded-xl border border-emerald-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold text-slate-900">
                Serapan Belanja Multi-Unit
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs shrink-0">
                85,5% On Track
              </span>
            </div>

            {/* List Satker dengan Bar Capaian & Nilai Miliar */}
            <div className="space-y-1.5 mt-1">
              {DATA_SERAPAN_MULTI_UNIT.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigateToUnit && onNavigateToUnit(s.deputiId)}
                  className="group cursor-pointer hover:bg-slate-50/80 px-1 py-0.5 rounded transition-colors"
                  title={`Klik untuk membuka dashboard Deputi terkait (${s.satker})`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="font-semibold text-slate-700 truncate max-w-[130px] group-hover:text-blue-600 transition-colors">
                      {s.unitSingkat}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[9px] text-slate-500 font-mono">
                        {s.realisasi.toFixed(1)} / {s.pagu.toFixed(1)} M
                      </span>
                      <span className="font-bold text-emerald-700 text-[9px] bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100/60">
                        {s.persen.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${s.persen}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* ==================================================================== */}
      {/* GRID 4: PAPAN STATUS TINDAK LANJUT & PENYELESAIAN AUDIT (CLEAN TABLE)*/}
      {/* SESUAI REFERENSI TABEL COURSE/ACTIVITY DI CANSAAS ANALYTICS           */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Papan Monitoring Tindak Lanjut &amp; Temuan Audit
            </h3>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            Tindak Lanjut BPK: 93,9% Tuntas
          </span>
        </div>

        {/* Clean Responsive Table matching reference */}
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-600 font-semibold text-[10.5px]">
              <tr>
                <th className="py-2 px-2.5">Unit Kerja</th>
                <th className="py-2 px-2.5">Subjek Arahan / Audit</th>
                <th className="py-2 px-2 text-center">Ref.</th>
                <th className="py-2 px-2.5 text-center">Progres</th>
                <th className="py-2 px-2.5 text-center">Status</th>
                <th className="py-2 px-2.5 text-right">Tenggat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DATA_TINDAK_LANJUT_TABLE.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-1.5 px-2.5 font-semibold text-slate-900 whitespace-nowrap text-[11px]">
                    {row.unit}
                  </td>
                  <td className="py-1.5 px-2.5 text-slate-700 leading-tight text-[11px]">
                    {row.topik}
                  </td>
                  <td className="py-2.5 px-2 text-center text-slate-400 font-medium whitespace-nowrap text-[11px]">
                    {row.halSatuData}
                  </td>
                  <td className="py-2.5 px-3 min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.progres === 100
                              ? 'bg-emerald-500'
                              : row.progres >= 85
                              ? 'bg-blue-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${row.progres}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">{row.progres}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.status === 'Selesai'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-500 whitespace-nowrap text-[11px]">
                    {row.tenggat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
