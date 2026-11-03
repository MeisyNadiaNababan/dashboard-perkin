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
  ExternalLink,
  Layers,
  ListFilter
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
  { name: 'Duriangkang', volume: 78.56, kapasitasDesain: 80.0, elevasiM: '18.4 m', persen: 98.2, status: 'Normal', color: '#2563EB' },
  { name: 'Tembesi', volume: 56.40, kapasitasDesain: 58.5, elevasiM: '14.2 m', persen: 96.5, status: 'Normal', color: '#0284C7' },
  { name: 'Mukakuning', volume: 13.20, kapasitasDesain: 13.9, elevasiM: '26.8 m', persen: 95.0, status: 'Normal', color: '#4F46E5' },
  { name: 'Sei Ladi', volume: 9.45, kapasitasDesain: 10.9, elevasiM: '19.1 m', persen: 86.4, status: 'Waspada', color: '#F59E0B' }, // Waspada
  { name: 'Sei Harapan', volume: 3.63, kapasitasDesain: 3.85, elevasiM: '22.3 m', persen: 94.1, status: 'Normal', color: '#10B981' },
  { name: 'Nongsa', volume: 0.72, kapasitasDesain: 0.78, elevasiM: '11.5 m', persen: 92.0, status: 'Normal', color: '#9333EA' },
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

// 5. Kinerja Serapan Belanja Multi-Unit (Pagu vs Realisasi) LENGKAP 24 UNIT SATKER BP BATAM
interface SerapanMultiUnitItem {
  id: string;
  satker: string;
  unitSingkat: string;
  deputiId: string;
  pagu: number; // Miliar Rp
  realisasi: number; // Miliar Rp
  persen: number;
  targetTriwulan: number;
}

const DATA_SERAPAN_24_UNIT: SerapanMultiUnitItem[] = [
  { id: '1', satker: 'Dit. Pembangunan Infrastruktur', unitSingkat: 'Dit. Pembangunan Infras', deputiId: 'deputi-infrastruktur', pagu: 842.5, realisasi: 724.6, persen: 86.0, targetTriwulan: 80.0 },
  { id: '2', satker: 'BU SPAM, Fasilitas & Lingkungan', unitSingkat: 'BU SPAM & Lingkungan', deputiId: 'deputi-pelayanan-umum', pagu: 420.0, realisasi: 352.8, persen: 84.0, targetTriwulan: 80.0 },
  { id: '3', satker: 'Dit. Pengelolaan Kepelabuhanan', unitSingkat: 'Dit. Kepelabuhanan', deputiId: 'deputi-bandara-pelabuhan', pagu: 385.0, realisasi: 327.3, persen: 85.0, targetTriwulan: 80.0 },
  { id: '4', satker: 'Biro Umum & Operasional', unitSingkat: 'Biro Umum & Ops', deputiId: 'deputi-administrasi-keuangan', pagu: 210.0, realisasi: 182.7, persen: 87.0, targetTriwulan: 80.0 },
  { id: '5', satker: 'Dit. Pengelolaan Pertanahan', unitSingkat: 'Dit. Pertanahan / Lahan', deputiId: 'deputi-pengelolaan-lahan', pagu: 180.0, realisasi: 158.4, persen: 88.0, targetTriwulan: 80.0 },
  { id: '6', satker: 'BU Rumah Sakit BP Batam', unitSingkat: 'BU Rumah Sakit (RSBP)', deputiId: 'deputi-pelayanan-umum', pagu: 135.0, realisasi: 109.4, persen: 81.0, targetTriwulan: 80.0 },
  { id: '7', satker: 'Dit. Kawasan Bandara Hang Nadim', unitSingkat: 'Dit. Bandara Hang Nadim', deputiId: 'deputi-bandara-pelabuhan', pagu: 130.5, realisasi: 106.8, persen: 81.9, targetTriwulan: 80.0 },
  { id: '8', satker: 'Biro Keuangan BP Batam', unitSingkat: 'Biro Keuangan (BLU)', deputiId: 'biro-keuangan', pagu: 115.0, realisasi: 89.2, persen: 77.6, targetTriwulan: 80.0 },
  { id: '9', satker: 'Pusat Data dan Sistem Informasi', unitSingkat: 'PDSI (Satu Data)', deputiId: 'pdsi', pagu: 78.0, realisasi: 64.5, persen: 82.7, targetTriwulan: 80.0 },
  { id: '10', satker: 'Dit. Pelayanan Terpadu Satu Pintu', unitSingkat: 'Dit. PTSP (Perizinan)', deputiId: 'ptsp', pagu: 52.0, realisasi: 45.2, persen: 86.9, targetTriwulan: 80.0 },
  { id: '11', satker: 'Dit. Lalu Lintas Barang & Penanaman Modal', unitSingkat: 'Dit. Lalu Lintas Barang', deputiId: 'lalu-lintas-barang', pagu: 69.5, realisasi: 58.4, persen: 84.0, targetTriwulan: 80.0 },
  { id: '12', satker: 'Dit. Kawasan Ekonomi Khusus (KEK)', unitSingkat: 'Dit. Kawasan KEK', deputiId: 'kek', pagu: 46.0, realisasi: 38.6, persen: 83.9, targetTriwulan: 80.0 },
  { id: '13', satker: 'Dit. Pengembangan Investasi', unitSingkat: 'Dit. Investasi', deputiId: 'investasi', pagu: 51.0, realisasi: 42.1, persen: 82.5, targetTriwulan: 80.0 },
  { id: '14', satker: 'Biro Hukum BP Batam', unitSingkat: 'Biro Hukum', deputiId: 'biro-hukum', pagu: 34.0, realisasi: 28.5, persen: 83.8, targetTriwulan: 80.0 },
  { id: '15', satker: 'Biro Organisasi dan Kepatuhan (BOKMR)', unitSingkat: 'Biro Organisasi / BOKMR', deputiId: 'biro-organisasi', pagu: 26.5, realisasi: 22.4, persen: 84.5, targetTriwulan: 80.0 },
  { id: '16', satker: 'Biro Sumber Daya Manusia (SDM)', unitSingkat: 'Biro SDM', deputiId: 'biro-sdm', pagu: 42.0, realisasi: 36.8, persen: 87.6, targetTriwulan: 80.0 },
  { id: '17', satker: 'Pusat Perencanaan Program Strategis', unitSingkat: 'Pusren BP Batam', deputiId: 'pusren', pagu: 30.5, realisasi: 25.1, persen: 82.3, targetTriwulan: 80.0 },
  { id: '18', satker: 'Satuan Pemeriksaan Intern (SPI)', unitSingkat: 'Satuan SPI (Audit)', deputiId: 'deputi-administrasi-keuangan', pagu: 21.0, realisasi: 18.2, persen: 86.7, targetTriwulan: 80.0 },
  { id: '19', satker: 'Dit. Perencanaan Infrastruktur', unitSingkat: 'Dit. Perencanaan Infras', deputiId: 'perencanaan-infrastruktur', pagu: 63.7, realisasi: 53.6, persen: 84.1, targetTriwulan: 80.0 },
  { id: '20', satker: 'Dit. Pengawasan Infrastruktur', unitSingkat: 'Dit. Pengawasan Infras', deputiId: 'deputi-infrastruktur', pagu: 36.0, realisasi: 28.5, persen: 79.2, targetTriwulan: 80.0 },
  { id: '21', satker: 'Dit. Pengelolaan Lahan Pesisir & Reklamasi', unitSingkat: 'Dit. Pesisir & Reklamasi', deputiId: 'pesisir-reklamasi', pagu: 41.0, realisasi: 34.2, persen: 83.4, targetTriwulan: 80.0 },
  { id: '22', satker: 'Dit. Pengendalian Pengelolaan Lahan', unitSingkat: 'Dit. Pengendalian Lahan', deputiId: 'pengendalian-lahan', pagu: 38.5, realisasi: 31.8, persen: 82.6, targetTriwulan: 80.0 },
  { id: '23', satker: 'Kantor Perwakilan BP Batam Jakarta', unitSingkat: 'Perwakilan Jakarta', deputiId: 'deputi-administrasi-keuangan', pagu: 23.0, realisasi: 19.5, persen: 84.8, targetTriwulan: 80.0 },
  { id: '24', satker: 'Badan Pengawas & Dewan Pengawas', unitSingkat: 'Dewan Pengawas', deputiId: 'deputi-administrasi-keuangan', pagu: 18.5, realisasi: 15.6, persen: 84.3, targetTriwulan: 80.0 },
];

// 6. Papan Status Tindak Lanjut & Arahan Pimpinan
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
  onOpenSatuDataFormula: _onOpenSatuDataFormula,
  onNavigateToUnit,
}) => {
  // Sheet swap state untuk Card 1 (Arus Petikemas)
  const [petikemasViewMode, setPetikemasViewMode] = useState<'grafik' | 'tabel'>('grafik');

  // Sheet swap state untuk Card 2 (Kapasitas 6 Waduk)
  const [wadukViewMode, setWadukViewMode] = useState<'grafik' | 'tabel'>('grafik');

  // Sheet swap state untuk Card 3 (Ketersediaan Lahan 7 SWP)
  const [lahanViewMode, setLahanViewMode] = useState<'grafik' | 'tabel'>('grafik');

  // Sheet swap state untuk Card 4 (Kurva S 14 Megaproyek)
  const [proyekViewMode, setProyekViewMode] = useState<'grafik' | 'tabel'>('grafik');

  // Sheet swap state untuk Card 5 (Serapan Belanja Multi-Unit)
  const [serapanViewMode, setSerapanViewMode] = useState<'grafik' | 'tabel'>('grafik');

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 1: DUA KARTU UTAMA                                              */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* CARD 1: Logistik Maritim Terminal Batu Ampar (WITH SHEET SWAP) */}
        <div className="lg:col-span-7 bg-white text-slate-800 rounded-xl p-3 sm:p-3.5 shadow-2xs border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    Arus Petikemas Terminal Batu Ampar
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Throughput Petikemas Ekspor, Impor, dan Domestik (TEUs)
                  </p>
                </div>
              </div>

              {/* Header Right: Angka Menonjol Model 612.400 + Sheet Swap Button */}
              <div className="flex items-center gap-3">
                <div className="text-right shrink-0">
                  <span className="text-lg sm:text-xl font-black text-slate-900 leading-none font-mono">
                    612.400
                  </span>
                  <span className="text-xs text-slate-500 font-semibold ml-1.5">
                    TEUs (94,2%)
                  </span>
                </div>

                {/* Sheet Swap Toggle */}
                <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg shrink-0">
                  <button
                    type="button"
                    onClick={() => setPetikemasViewMode('grafik')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      petikemasViewMode === 'grafik'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan grafik batang bulanan"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grafik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetikemasViewMode('tabel')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      petikemasViewMode === 'tabel'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan tabel rincian bulanan"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tabel Detail</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Konten Sheet Swap Card 1 */}
            {petikemasViewMode === 'grafik' ? (
              <div>
                {/* Legenda Ringkas */}
                <div className="flex items-center gap-4 text-xs py-1 text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 shrink-0" />
                    <span>Ekspor 46% (299 rb TEUs)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-sky-500 shrink-0" />
                    <span>Impor 33% (204 rb TEUs)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-purple-500 shrink-0" />
                    <span>Domestik 21% (109 rb TEUs)</span>
                  </span>
                </div>

                {/* Stacked Bar Chart */}
                <div className="h-32 sm:h-36 w-full mt-1.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_LOGISTIK_BULANAN} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `${val}.000 TEUs`,
                          name === 'ekspor' ? 'Ekspor' : name === 'impor' ? 'Impor' : 'Domestik',
                        ]}
                        contentStyle={{
                          fontSize: '11px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#0F172A',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Bar dataKey="ekspor" stackId="a" fill="#2563EB" barSize={16} name="ekspor" />
                      <Bar dataKey="impor" stackId="a" fill="#0EA5E9" barSize={16} name="impor" />
                      <Bar dataKey="domestik" stackId="a" fill="#A855F7" radius={[3, 3, 0, 0]} barSize={16} name="domestik" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              /* TABEL DETAIL ARUS PETIKEMAS */
              <div className="h-36 sm:h-40 w-full overflow-y-auto rounded-lg border border-slate-200 mt-1 scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                    <tr>
                      <th className="py-1.5 px-3">Bulan</th>
                      <th className="py-1.5 px-3 text-right">Ekspor (TEUs)</th>
                      <th className="py-1.5 px-3 text-right">Impor (TEUs)</th>
                      <th className="py-1.5 px-3 text-right">Domestik (TEUs)</th>
                      <th className="py-1.5 px-3 text-right font-black">Total (TEUs)</th>
                      <th className="py-1.5 px-3 text-center">Pangsa Ekspor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {DATA_LOGISTIK_BULANAN.map((row) => (
                      <tr key={row.bln} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-1.5 px-3 font-bold text-slate-900">{row.bln} 2026</td>
                        <td className="py-1.5 px-3 text-right font-mono text-blue-700 font-semibold">
                          {(row.ekspor * 1000).toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-3 text-right font-mono text-sky-700 font-semibold">
                          {(row.impor * 1000).toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-3 text-right font-mono text-purple-700 font-semibold">
                          {(row.domestik * 1000).toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-3 text-right font-mono font-black text-slate-900 bg-slate-50/50">
                          {(row.total * 1000).toLocaleString('id-ID')}
                        </td>
                        <td className="py-1.5 px-3 text-center">
                          <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-100">
                            {((row.ekspor / row.total) * 100).toFixed(1)}%
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

        {/* CARD 2: Ketahanan 6 Waduk Air Baku (WITH SHEET SWAP) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Kapasitas 6 Waduk Air Baku
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Cadangan Suplai Air Bersih BP Batam
                </p>
              </div>

              {/* TAMPILAN MODEL SEPERTI 612.400 DI ARUS PETIKEMAS */}
              <div className="flex items-center gap-2.5">
                <div className="text-right shrink-0">
                  <span className="text-lg sm:text-xl font-black text-slate-900 leading-none font-mono">
                    96,8%
                  </span>
                  <span className="text-xs text-emerald-600 font-bold ml-1.5">
                    Siaga Aman
                  </span>
                </div>

                {/* Sheet Swap Toggle */}
                <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg shrink-0">
                  <button
                    type="button"
                    onClick={() => setWadukViewMode('grafik')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      wadukViewMode === 'grafik'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan grafik lingkaran"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grafik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWadukViewMode('tabel')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      wadukViewMode === 'tabel'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan tabel rincian 6 waduk"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tabel Detail</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Konten Sheet Swap Card 2 */}
            {wadukViewMode === 'grafik' ? (
              <div>
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
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      161,9M
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">m³ efektif</span>
                  </div>
                </div>

                {/* Mini Legend List per Waduk */}
                <div className="grid grid-cols-3 gap-x-2.5 gap-y-1.5 text-xs pt-2 border-t border-slate-100">
                  {DATA_6_WADUK_DONUT.map((w, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-700 truncate font-medium">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                        {w.name}
                      </span>
                      <span className={`font-mono font-bold ${w.persen < 90 ? 'text-amber-700' : 'text-slate-800'}`}>
                        {w.persen}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* TABEL DETAIL 6 WADUK AIR BAKU */
              <div className="h-36 sm:h-40 w-full overflow-y-auto rounded-lg border border-slate-200 mt-1 scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[11px]">
                    <tr>
                      <th className="py-1.5 px-3">Nama Waduk</th>
                      <th className="py-1.5 px-2 text-right">Vol. Efektif</th>
                      <th className="py-1.5 px-2 text-right">Kapasitas</th>
                      <th className="py-1.5 px-2 text-right">Elevasi</th>
                      <th className="py-1.5 px-2 text-center">Isi (%)</th>
                      <th className="py-1.5 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {DATA_6_WADUK_DONUT.map((row) => (
                      <tr key={row.name} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-1.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                          {row.name}
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700">
                          {row.volume.toFixed(1)} Juta m³
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-600">
                          {row.kapasitasDesain.toFixed(1)} Juta m³
                        </td>
                        <td className="py-1.5 px-2 text-right font-mono text-slate-700">
                          {row.elevasiM}
                        </td>
                        <td className="py-1.5 px-2 text-center">
                          <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10.5px] border ${
                            row.persen >= 95
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                              : 'text-blue-700 bg-blue-50 border-blue-100'
                          }`}>
                            {row.persen.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-1.5 px-2.5 text-center">
                          <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {row.status}
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
      </div>

      {/* ==================================================================== */}
      {/* GRID 2: TIGA KARTU VISUAL MENENGAH (LEBIH RINGKAS & PADAT)           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* CARD 3: Ketersediaan Lahan 7 SWP (WITH SHEET SWAP) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Lahan 7 Wilayah SWP
              </h3>

              <div className="flex items-center gap-2">
                <div className="text-right shrink-0">
                  <span className="text-sm sm:text-base font-black text-slate-900 leading-none font-mono">
                    3.250 Ha
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold ml-1">
                    Cadangan
                  </span>
                </div>

                {/* Sheet Swap Toggle */}
                <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                  <button
                    type="button"
                    onClick={() => setLahanViewMode('grafik')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      lahanViewMode === 'grafik'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan grafik batang"
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>Grafik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLahanViewMode('tabel')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      lahanViewMode === 'tabel'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan tabel rincian 7 SWP"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Tabel Detail</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Konten Sheet Swap Card 3 */}
            {lahanViewMode === 'grafik' ? (
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-1 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-blue-600" /> Terisi (12.382 Ha)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-emerald-500" /> Cadangan (3.250 Ha)
                  </span>
                </div>

                <div className="h-28 sm:h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_LAHAN_7_SWP} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="swp" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 500 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`${val} Ha`, name === 'terisi' ? 'Alokasi Terisi' : 'Cadangan Lahan']}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="terisi" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={9} />
                      <Bar dataKey="cadangan" fill="#10B981" radius={[2, 2, 0, 0]} barSize={9} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              /* TABEL DETAIL LAHAN 7 SWP */
              <div className="h-28 sm:h-32 w-full overflow-y-auto rounded-lg border border-slate-200 mt-1 scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                    <tr>
                      <th className="py-1 px-1.5 whitespace-nowrap">Wilayah SWP</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap">Terisi</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap">Cadangan</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap font-black">Total</th>
                      <th className="py-1 px-1 text-center whitespace-nowrap">Rasio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {DATA_LAHAN_7_SWP.map((row) => {
                      const total = row.terisi + row.cadangan;
                      const persenCadangan = ((row.cadangan / total) * 100).toFixed(1);
                      return (
                        <tr key={row.swp} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-1 px-1.5 font-bold text-slate-800 text-[10.5px]">
                            {row.swp}
                          </td>
                          <td className="py-1 px-1 text-right font-mono text-blue-700 font-semibold text-[10px]">
                            {row.terisi.toLocaleString('id-ID')} Ha
                          </td>
                          <td className="py-1 px-1 text-right font-mono text-emerald-700 font-semibold text-[10px]">
                            {row.cadangan.toLocaleString('id-ID')} Ha
                          </td>
                          <td className="py-1 px-1 text-right font-mono font-black text-slate-900 text-[10px]">
                            {total.toLocaleString('id-ID')} Ha
                          </td>
                          <td className="py-1 px-1 text-center">
                            <span className="font-mono font-bold text-[9.5px] text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-100">
                              {persenCadangan}%
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

        {/* CARD 4: Kurva S 14 Megaproyek Fisik (WITH SHEET SWAP) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Kurva S 14 Megaproyek
              </h3>

              <div className="flex items-center gap-2">
                <div className="text-right shrink-0">
                  <span className="text-sm sm:text-base font-black text-slate-900 leading-none font-mono">
                    96,8%
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-1">
                    Ahead +0,8%
                  </span>
                </div>

                {/* Sheet Swap Toggle */}
                <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                  <button
                    type="button"
                    onClick={() => setProyekViewMode('grafik')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      proyekViewMode === 'grafik'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan grafik garis"
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>Grafik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProyekViewMode('tabel')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      proyekViewMode === 'tabel'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Tampilkan tabel rincian kurva S"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Tabel Detail</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Konten Sheet Swap Card 4 */}
            {proyekViewMode === 'grafik' ? (
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-1 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-slate-400 inline-block" /> Target Rencana
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-blue-600">
                    <span className="w-2.5 h-1 bg-blue-600 inline-block rounded-full" /> Realisasi Lapangan
                  </span>
                </div>

                <div className="h-28 sm:h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={DATA_KURVA_S_PROYEK} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="bln" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`${val}%`, name === 'target' ? 'Rencana' : 'Realisasi']}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="aktual" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3, fill: '#2563EB' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              /* TABEL DETAIL KURVA S 14 MEGAPROYEK */
              <div className="h-28 sm:h-32 w-full overflow-y-auto rounded-lg border border-slate-200 mt-1 scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                    <tr>
                      <th className="py-1 px-1.5 whitespace-nowrap">Bulan</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap">Rencana</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap font-black">Realisasi</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap">Deviasi</th>
                      <th className="py-1 px-1 text-center whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {DATA_KURVA_S_PROYEK.map((row) => {
                      const deviasi = (row.aktual - row.target).toFixed(1);
                      const isAhead = Number(deviasi) >= 0;
                      return (
                        <tr key={row.bln} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-1 px-1.5 font-bold text-slate-900 text-[10.5px]">
                            {row.bln} 2026
                          </td>
                          <td className="py-1 px-1 text-right font-mono text-slate-600 text-[10px]">
                            {row.target.toFixed(1)}%
                          </td>
                          <td className="py-1 px-1 text-right font-mono font-bold text-blue-700 text-[10.5px]">
                            {row.aktual.toFixed(1)}%
                          </td>
                          <td className={`py-1 px-1 text-right font-mono font-bold text-[10px] ${isAhead ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {isAhead ? `+${deviasi}` : deviasi}%
                          </td>
                          <td className="py-1 px-1 text-center">
                            <span className={`font-mono font-bold text-[9.5px] px-1 py-0.2 rounded border ${
                              isAhead
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                                : 'text-amber-700 bg-amber-50 border-amber-100'
                            }`}>
                              {isAhead ? 'Ahead' : 'Delay'}
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

        {/* CARD 5: Kinerja Serapan Belanja Multi-Unit (WITH SHEET SWAP & SCROLL ALL 24 SATKER) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div>
            {/* Header: Title and Toggle Sheet Swap */}
            <div className="flex items-center justify-between gap-1 mb-1 pb-1 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                Serapan Belanja Multi-Unit
              </h3>

              {/* Sheet Swap Toggle: Grafik & Tabel Detail (Compact & Never overflows) */}
              <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md shrink-0">
                <button
                  type="button"
                  onClick={() => setSerapanViewMode('grafik')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    serapanViewMode === 'grafik'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tampilkan grafik batang perbandingan"
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>Grafik</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSerapanViewMode('tabel')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    serapanViewMode === 'tabel'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Tampilkan tabel detail 24 satker"
                >
                  <FileText className="w-3 h-3" />
                  <span>Tabel Detail</span>
                </button>
              </div>
            </div>

            {/* Metric row: 85,5% (24 Satker) */}
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                  85,5%
                </span>
                <span className="text-xs text-emerald-600 font-bold">
                  (24 Satker)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {serapanViewMode === 'grafik' ? 'Top 8 Unit' : '24 Satker (Scroll)'}
              </span>
            </div>

            {/* Konten Sheet Swap Card 5: GRAFIK ATAU TABEL DETAIL DENGAN SCROLL */}
            {serapanViewMode === 'grafik' ? (
              /* GRAFIK SERAPAN MULTI-UNIT */
              <div className="h-28 sm:h-32 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DATA_SERAPAN_24_UNIT.slice(0, 8)}
                    layout="vertical"
                    margin={{ top: 2, right: 10, left: 15, bottom: 2 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      domain={[70, 100]}
                      tick={{ fontSize: 9, fill: '#64748B' }}
                      tickFormatter={(v) => `${v}%`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="unitSingkat"
                      width={100}
                      tick={{ fontSize: 8.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Serapan Anggaran']}
                      contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                    />
                    <Bar dataKey="persen" fill="#10B981" radius={[0, 3, 3, 0]} barSize={9} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              /* TABEL DETAIL 24 SATKER LENGKAP */
              <div className="h-28 sm:h-32 w-full overflow-y-auto overflow-x-auto rounded-lg border border-slate-200 mt-1 scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-700 font-bold text-[10px]">
                    <tr>
                      <th className="py-1 px-1.5 whitespace-nowrap">Satker</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap">Pagu</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap">Real.</th>
                      <th className="py-1 px-1 text-right whitespace-nowrap font-black">Serapan</th>
                      <th className="py-1 px-1 text-center whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {DATA_SERAPAN_24_UNIT.map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => onNavigateToUnit && onNavigateToUnit(s.deputiId)}
                        className="hover:bg-slate-50/90 cursor-pointer transition-colors"
                        title={`Klik untuk membuka dashboard ${s.satker}`}
                      >
                        <td className="py-1 px-1.5 font-semibold text-slate-800 truncate max-w-[95px] text-[10.5px]">
                          {s.unitSingkat}
                        </td>
                        <td className="py-1 px-1 text-right font-mono text-slate-600 text-[10px]">
                          {s.pagu.toFixed(0)} M
                        </td>
                        <td className="py-1 px-1 text-right font-mono text-blue-700 font-semibold text-[10px]">
                          {s.realisasi.toFixed(0)} M
                        </td>
                        <td className="py-1 px-1 text-right font-mono font-bold text-slate-900 text-[10.5px]">
                          {s.persen.toFixed(1)}%
                        </td>
                        <td className="py-1 px-1 text-center">
                          <span
                            className={`font-mono font-bold px-1 py-0.2 rounded text-[9.5px] ${
                              s.persen >= 85
                                ? 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                                : 'text-blue-700 bg-blue-50 border border-blue-100'
                            }`}
                          >
                            {s.persen >= 80 ? 'On Track' : 'Waspada'}
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
      </div>

      {/* ==================================================================== */}
      {/* GRID 4: PAPAN STATUS TINDAK LANJUT & PENYELESAIAN AUDIT (CLEAN TABLE)*/}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-3.5 shadow-2xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Papan Monitoring Tindak Lanjut &amp; Temuan Audit
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Progres Penyelesaian Rekomendasi BPK RI &amp; SPI Multi-Satker
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
              93,9%
            </span>
            <span className="text-xs text-emerald-600 font-bold ml-1.5">
              Tuntas Ditindaklanjuti
            </span>
          </div>
        </div>

        {/* Clean Responsive Table matching reference */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold text-xs">
              <tr>
                <th className="py-2.5 px-3">Unit Kerja</th>
                <th className="py-2.5 px-3">Subjek Arahan / Audit</th>
                <th className="py-2.5 px-3 text-center">Progres</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Tenggat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {DATA_TINDAK_LANJUT_TABLE.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                    {row.unit}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 leading-tight">
                    {row.topik}
                  </td>
                  <td className="py-2.5 px-3 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
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
                      <span className="font-mono font-bold text-slate-900">{row.progres}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        row.status === 'Selesai'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600 whitespace-nowrap font-mono">
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
