import React from 'react';
import {
  Compass,
  Scale,
  ShieldCheck,
  Layers,
  Sparkles,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Server,
  Network,
  Activity,
  FileText,
  DollarSign,
  MapPin,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  PUSREN_MASTERPLANS,
  PUSREN_ROAD_DATA,
} from '../../data/pusrenData';
import {
  DATA_JALUR_FIBER_OPTIC,
} from '../../data/pdsiData';
import {
  PTSP_SEKTOR_PERFORMANCES,
} from './kebijakanStrategisData';

interface KebijakanStrategisDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const KebijakanStrategisDeepDiveCenter: React.FC<
  KebijakanStrategisDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
}) => {
  // Normalize Unit ID
  const activeUnit =
    selectedUnitId === 'pusat-perencanaan-program' || selectedUnitId === 'pusren'
      ? 'pusren'
      : selectedUnitId === 'pusat-harmonisasi' || selectedUnitId === 'harmonisasi'
      ? 'harmonisasi'
      : selectedUnitId === 'pdsi'
      ? 'pdsi'
      : 'ptsp';

  // Status Pie Data for PTSP
  const STATUS_PIE_DATA = [
    { name: 'Izin Terbit Resmi', value: 1486, color: '#10B981' },
    { name: 'Dalam Proses Verifikasi', value: 219, color: '#0284C7' },
    { name: 'Menunggu Revisi Pemohon', value: 104, color: '#F59E0B' },
    { name: 'Berkas Ditolak', value: 33, color: '#EF4444' },
  ];

  // Pusren: 5 Masterplan Data Prepared
  const masterplanChartData = PUSREN_MASTERPLANS.map((mp) => ({
    name: mp.kode.replace('MP-', ''),
    fullName: mp.nama,
    progres: mp.progresPersen,
    anggaranM: Number((mp.anggaran / 1e9).toFixed(2)),
  }));

  // Pusren: Sebaran Koridor Jalan & Spasial
  const roadChartData = PUSREN_ROAD_DATA.map((r) => ({
    wilayah: r.wilayah.length > 15 ? r.wilayah.slice(0, 13) + '...' : r.wilayah,
    panjangKm: r.panjangKm,
    status: r.statusKonstruksi,
  }));

  // Harmonisasi: 4 Dimensi IKK Data Prepared
  const ikkDimensiChartData = [
    { dimensi: 'Agenda Setting', skor: 75.0, target: 65.0 },
    { dimensi: 'Formulasi Kebijakan', skor: 72.5, target: 65.0 },
    { dimensi: 'Implementasi', skor: 68.0, target: 65.0 },
    { dimensi: 'Evaluasi & Manfaat', skor: 71.7, target: 65.0 },
  ];

  // Harmonisasi: Evaluasi Tarif Layanan
  const tarifUnitSummary = [
    { unit: 'Pelabuhan', tarifAvg: 185, costAvg: 172 },
    { unit: 'RSBP', tarifAvg: 450, costAvg: 410 },
    { unit: 'SPAM / Air', tarifAvg: 38, costAvg: 35 },
    { unit: 'Lahan', tarifAvg: 290, costAvg: 260 },
    { unit: 'Bandara', tarifAvg: 145, costAvg: 138 },
  ];

  // PDSI: Fiber Optic Data Prepared
  const foChartData = [...DATA_JALUR_FIBER_OPTIC]
    .sort((a, b) => (b.panjangKm || 0) - (a.panjangKm || 0))
    .slice(0, 6)
    .map((item) => ({
      name: item.bagianWilayah.length > 16 ? item.bagianWilayah.slice(0, 14) + '...' : item.bagianWilayah,
      fullName: item.bagianWilayah,
      panjangKm: item.panjangKm || 0,
      kapasitasCore: item.kapasitasCore || 0,
      fillColor: item.kapasitasCore === 96 ? '#059669' : item.kapasitasCore === 72 ? '#0284c7' : '#d97706',
    }));

  // PDSI: Data Center Occupancy
  const dcOccupancyData = [
    { name: 'Rak Terisi Tenant', value: 78, color: '#2563EB' },
    { name: 'Rak Dipesan (Reserve)', value: 8, color: '#F59E0B' },
    { name: 'Rak Tersedia Kosong', value: 10, color: '#E2E8F0' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans">
      {/* 1. Header with Tab Switcher - Model Persis AdministrasiKeuanganDeepDiveCenter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Kebijakan Strategis &amp; Perizinan
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 4 unit kerja pengampu Perkin DEP-A2 (Pusren, Harmonisasi, PDSI, PTSP)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            onClick={() => onSelectUnit('pusat-perencanaan-program')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'pusren'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pusren</span>
          </button>

          <button
            onClick={() => onSelectUnit('pusat-harmonisasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'harmonisasi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Harmonisasi</span>
          </button>

          <button
            onClick={() => onSelectUnit('pdsi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'pdsi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PDSI</span>
          </button>

          <button
            onClick={() => onSelectUnit('ptsp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'ptsp'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>PTSP</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TAB KONTEN 1: PUSREN (VISUALISASI UTAMA & RINGKAS TANPA TEKS BERLEBIH) */}
      {/* ==================================================================== */}
      {activeUnit === 'pusren' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU VISUAL UTAMA (5 MASTERPLAN WILAYAH & KORIDOR SPASIAL KONTUR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: 5 DOKUMEN MASTERPLAN STRATEGIS */}
            <div className="lg:col-span-7 bg-gradient-to-br from-sky-50/70 via-blue-50/30 to-white rounded-xl border border-sky-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-sky-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Progres 5 Dokumen Masterplan Strategis Wilayah
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">91,9%</span>
                    <span className="text-[10px] text-sky-700 font-medium ml-1.5">(Rerata Fisik)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-sky-600" /> Progres Penyusunan (%)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Drainase, Jalan, Utilitas Box, Bandara, Pelabuhan (Dataset No. 6 Hal. 51)</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={masterplanChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [`${val}%`, item.payload.fullName]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="progres" fill="#0284C7" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Alokasi DIPA Masterplan: <strong>Rp 13,66 M</strong></span>
                <span className="font-bold text-emerald-700 font-mono">100% On Schedule</span>
              </div>
            </div>

            {/* CARD 2: SEBARAN PANJANG KORIDOR JALAN & SPASIAL (KM) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white rounded-xl border border-blue-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Sebaran Panjang Koridor Jalan (Km) per Wilayah
                    </h3>
                  </div>
                  <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded font-mono">
                    184,5 Km
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-blue-600" /> Panjang Koridor (Km)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Dataset Spasial No. 12 &amp; 13 Hal. 52</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roadChartData} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="wilayah" tick={{ fontSize: 9, fill: '#475569' }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [`${val} Km (${item.payload.status})`, 'Panjang Jalan']}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="panjangKm" fill="#2563EB" radius={[0, 2, 2, 0]} barSize={9} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Integrasi Geospasial:</span>
                <span className="font-bold text-emerald-700">100% Terintegrasi BIG</span>
              </div>
            </div>
          </div>

          {/* ROW 2: TIGA KARTU INDIKATOR STRATEGIS PUSREN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* KARTU 1: MONEV DIPA 2026 */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Monev DIPA Belanja Perencanaan
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                    P3S No. 2
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-500">Pagu Total:</span>
                    <span className="font-black font-mono text-slate-800">Rp 13,66 M</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-500">Realisasi Serapan:</span>
                    <span className="font-black font-mono text-emerald-700">Rp 5,21 M (38,1%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '38.1%' }} />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Mencakup 29 rincian output perencanaan fisik &amp; studi kelayakan strategis.
              </p>
            </div>

            {/* KARTU 2: KONTUR SPASIAL 1M */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-sky-600" />
                    Peta Topografi &amp; Kontur 1M
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-sky-50 text-sky-800 px-1.5 py-0.2 rounded border border-sky-200">
                    Dataset 12 &amp; 13
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cakupan Wilayah:</span>
                    <span className="font-bold text-slate-800">7 Sub Wilayah (SWP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Akurasi Elevasi:</span>
                    <span className="font-black font-mono text-sky-700">Interval 1 Meter</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Aplikasi Penggunaan:</span>
                    <span className="font-bold text-emerald-600">Drainase &amp; Jalan Kota</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Data rujukan dasar rekayasa sipil seluruh proyek infrastruktur Batam.
              </p>
            </div>

            {/* KARTU 3: KAJIAN KELAYAKAN FS */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    Kajian Kelayakan (FS) &amp; Rekomendasi
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200">
                    Dataset 1, 14, 18
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dokumen Diselesaikan:</span>
                    <span className="font-black font-mono text-blue-700">12 Dokumen FS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rekomendasi Kebijakan:</span>
                    <span className="font-bold text-slate-800">8 Naskah Akademis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tindak Lanjut Pembangunan:</span>
                    <span className="font-bold text-emerald-600">92,5% Diterima Bappenas</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Penyelarasan target fisik proyek strategis KPBPBB Batam 2025-2029.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN 2: HARMONISASI (PHKS) (1 TAMPILAN BANYAK VISUALISASI)  */}
      {/* ==================================================================== */}
      {activeUnit === 'harmonisasi' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA (4 DIMENSI IKK & 7 LEVEL TARIF) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: 4 DIMENSI INDEKS KUALITAS KEBIJAKAN (IKK) */}
            <div className="lg:col-span-7 bg-gradient-to-br from-indigo-50/70 via-blue-50/30 to-white rounded-xl border border-indigo-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Capaian 4 Dimensi Indeks Kualitas Kebijakan (IKK)
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">71,80</span>
                    <span className="text-[10px] text-indigo-700 font-medium ml-1.5">(Target: 65,00)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-slate-400" /> Target Standard LAN RI (65,0)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-indigo-600" /> Skor Realisasi IKK
                  </span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ikkDimensiChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="dimensi" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`${val} Poin`, name]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="target" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={14} />
                      <Bar dataKey="skor" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Predikat Evaluasi LAN RI:</span>
                <span className="font-bold text-indigo-800 font-mono">Cukup Baik &bull; +6.80 Poin di Atas Target</span>
              </div>
            </div>

            {/* CARD 2: PERBANDINGAN UNIT COST VS TARIF LAYANAN 5 SEKTOR */}
            <div className="lg:col-span-5 bg-gradient-to-br from-teal-50/70 via-emerald-50/30 to-white rounded-xl border border-teal-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Evaluasi Tarif Layanan (Ribu Rp)
                    </h3>
                  </div>
                  <span className="text-xs font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-mono">
                    7 Level Tarif
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-slate-400" /> Unit Cost
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-teal-600" /> Tarif Berlaku
                  </span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tarifUnitSummary} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="unit" tick={{ fontSize: 9, fill: '#475569' }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`Rp ${val} Ribu`, name === 'tarifAvg' ? 'Tarif Berlaku' : 'Unit Cost']}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="costAvg" fill="#94A3B8" radius={[0, 2, 2, 0]} barSize={8} />
                      <Bar dataKey="tarifAvg" fill="#0D9488" radius={[0, 2, 2, 0]} barSize={8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Survei Kewajaran Tarif:</span>
                <span className="font-bold text-teal-800">89,2% Dinilai Wajar</span>
              </div>
            </div>
          </div>

          {/* ROW 2: TIGA KARTU BAWAH (SINKRONISASI REGULASI, RISALAH RAPIM, DUKUNGAN STRATEGIS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* KARTU 3: SINKRONISASI REGULASI INTERNAL-EKSTERNAL */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    Harmonisasi Produk Hukum BP Batam
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200">
                    Data No. 2 &amp; 4
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Regulasi Diharmonisasi:</span>
                    <span className="font-black font-mono text-blue-700">42 Produk Hukum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Peraturan Kepala (Perka):</span>
                    <span className="font-bold text-slate-800">26 Perka Disahkan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Keputusan Kepala (Kepka):</span>
                    <span className="font-bold text-slate-800">16 Kepka Operasional</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                100% regulasi telah diselaraskan dengan amanat PP 41/2021 dan PP 20/2024.
              </p>
            </div>

            {/* KARTU 4: TINDAK LANJUT RAPIM & RDP DEPUTI A2 */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    Monitoring Arahan Rapim &amp; RDP
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-indigo-50 text-indigo-800 px-1.5 py-0.2 rounded border border-indigo-200">
                    Data No. 6 &amp; 7
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Arahan Selesai Tuntas:</span>
                    <span className="font-black font-mono text-emerald-700">76 / 80 Nota Dinas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Persentase Tindak Lanjut:</span>
                    <span className="font-bold text-indigo-700">94,5% Tuntas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dalam Proses Pembahasan:</span>
                    <span className="font-bold text-amber-600">4 Arahan (On Track)</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Penyelarasan kebijakan lintas direktorat operasional dan dewan pengawas.
              </p>
            </div>

            {/* KARTU 5: ANGGARAN & DUKUNGAN STRATEGIS */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Pagu &amp; Serapan Kegiatan PHKS
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                    DIPA 2026
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-500">Pagu Kegiatan:</span>
                    <span className="font-black font-mono text-slate-800">Rp 4,55 M</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-500">Realisasi Serapan:</span>
                    <span className="font-black font-mono text-emerald-700">Rp 1,85 M (40,6%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '40.6%' }} />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Dukungan naskah kebijakan strategis, audiensi K/L pusat &amp; FGD asosiasi usaha.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. TAB KONTEN 3: PDSI (1 TAMPILAN BANYAK VISUALISASI SEPERTI DEP-A1) */}
      {/* ==================================================================== */}
      {activeUnit === 'pdsi' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA (JALUR FIBER OPTIK & OKUPANSI DATA CENTER) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: SEBARAN JALUR FIBER OPTIK (KM) PER KORIDOR */}
            <div className="lg:col-span-7 bg-gradient-to-br from-indigo-50/70 via-purple-50/30 to-white rounded-xl border border-indigo-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-indigo-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Sebaran Panjang Jalur Fiber Optik (FO) per Koridor
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">151,2 Km</span>
                    <span className="text-[10px] text-indigo-700 font-medium ml-1.5">(8 Koridor)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-emerald-600" /> 96 Core
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-sky-600" /> 72 Core
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-amber-600" /> 48 Core
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Dataset No. 2 &amp; 5 Hal. 40-41</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={foChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [`${val} Km (${item.payload.kapasitasCore} Core)`, item.payload.fullName]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="panjangKm" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={22} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Backbone Ring Pulau Batam:</span>
                <span className="font-bold text-emerald-700">100% Aktif &bull; Redundansi Dual-Ring</span>
              </div>
            </div>

            {/* CARD 2: OKUPANSI TIER-3 DATA CENTER (96 RAK SERVER) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/70 via-sky-50/30 to-white rounded-xl border border-blue-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-blue-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Okupansi Rak Tier-3 Data Center
                    </h3>
                  </div>
                  <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded font-mono">
                    81,25% Terisi
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-blue-600" /> Terisi (78 Rak)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-amber-500" /> Dipesan (8 Rak)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-slate-300" /> Kosong (10 Rak)
                  </span>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dcOccupancyData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        innerRadius={40}
                        paddingAngle={3}
                      >
                        {dcOccupancyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any, name: any) => [`${val} Rak`, name]} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Uptime SLA Data Center:</span>
                <span className="font-bold text-emerald-700 font-mono">99,98% (Sertifikasi Tier-3)</span>
              </div>
            </div>
          </div>

          {/* ROW 2: TIGA KARTU BAWAH (KEAMANAN SIBER CSIRT, SLA HELPDESK TI, DOMAIN SPBE) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* KARTU 3: KEAMANAN SIBER & MITIGASI SERANGAN IT */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Pertahanan Siber &amp; SOC CSIRT
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                    Data No. 12 Hal. 42
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Percobaan Serangan:</span>
                    <span className="font-black font-mono text-slate-800">12.450 Percobaan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tingkat Mitigasi Firewall:</span>
                    <span className="font-black font-mono text-emerald-700">99,85% Dihalau</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jenis Ancaman Terbanyak:</span>
                    <span className="font-bold text-slate-800">DDoS &amp; Port Scan</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Pusat komando SOC 24/7 mendeteksi dan mengisolasi insiden siber secara real-time.
              </p>
            </div>

            {/* KARTU 4: SLA KINERJA HELPDESK & ADUAN TI */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    Kepatuhan SLA Layanan Helpdesk TI
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200">
                    Data No. 17 &amp; 21
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tiket Helpdesk Selesai:</span>
                    <span className="font-black font-mono text-blue-700">1.342 Tiket</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kepatuhan Standar SLA:</span>
                    <span className="font-black font-mono text-emerald-700">94,6% Tepat Waktu</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rerata Respon Permintaan:</span>
                    <span className="font-bold text-slate-800">1,8 Jam (Target 4 Jam)</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Mencakup layanan perangkat, jaringan LAN, hak akses database &amp; email dinas.
              </p>
            </div>

            {/* KARTU 5: 6 DOMAIN ARSITEKTUR SPBE */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    6 Domain Kematangan SPBE (Level 4)
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-indigo-50 text-indigo-800 px-1.5 py-0.2 rounded border border-indigo-200">
                    Evaluasi TIK
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Indeks Komposit SPBE:</span>
                    <span className="font-black font-mono text-indigo-700">4,12 / 5,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Aplikasi Ber-TTE BSrE:</span>
                    <span className="font-bold text-emerald-700">48 Modul Terpadu</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pagu TIK &amp; Data Center:</span>
                    <span className="font-bold text-slate-800">Rp 53,78 M (Terbesar A2)</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Peringkat teratas penerapan arsitektur SPBE instansi pemerintah se-Kepulauan Riau.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. TAB KONTEN 4: PTSP (1 TAMPILAN BANYAK VISUALISASI SEPERTI DEP-A1) */}
      {/* ==================================================================== */}
      {activeUnit === 'ptsp' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA (VOLUME & SEBARAN SEKTOR, STATUS BERKAS PERIZINAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: VOLUME & PERSENTASE SLA PER SEKTOR USAHA */}
            <div className="lg:col-span-7 bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white rounded-xl border border-emerald-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Volume Izin Terbit &amp; Kepatuhan SLA per Sektor
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">1.486 Izin</span>
                    <span className="text-[10px] text-emerald-700 font-medium ml-1.5">(80,7% Sukses)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-emerald-600" /> Izin Terbit
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-slate-400" /> Total Permohonan
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Dataset No. 9 Hal. 25 OSS-RBA</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PTSP_SEKTOR_PERFORMANCES} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="kode" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          `${val} Berkas (${name === 'terbit' ? 'Terbit' : 'Total Masuk'})`,
                          item.payload.sektor,
                        ]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="volume" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={14} />
                      <Bar dataKey="terbit" fill="#059669" radius={[4, 4, 0, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Sektor Terbesar:</span>
                <span className="font-bold text-emerald-800">Logistik &amp; Maritim (542 Berkas &bull; SLA 91,1%)</span>
              </div>
            </div>

            {/* CARD 2: KOMPOSISI STATUS PENYELESAIAN BERKAS IZIN (DONUT CHART) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-teal-50/70 via-sky-50/30 to-white rounded-xl border border-teal-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      Komposisi Status Berkas Perizinan
                    </h3>
                  </div>
                  <span className="text-xs font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-mono">
                    1.842 Total
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-emerald-500" /> Terbit
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-blue-500" /> Verifikasi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-amber-500" /> Revisi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-rose-500" /> Ditolak
                  </span>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={STATUS_PIE_DATA}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        innerRadius={40}
                        paddingAngle={3}
                      >
                        {STATUS_PIE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any, name: any) => [`${val} Berkas`, name]} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">Rasio Penolakan:</span>
                <span className="font-bold text-rose-600 font-mono">1,8% (Hanya 33 Berkas Tidak Lengkap)</span>
              </div>
            </div>
          </div>

          {/* ROW 2: TIGA KARTU BAWAH (9 UNSUR IKM MUTU A, PENANGANAN PENGADUAN MPP, KECEPATAN EODB) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* KARTU 3: INDEKS KEPUASAN MASYARAKAT (IKM) 9 UNSUR */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    IKM 9 Unsur Pelayanan MPP (Mutu A)
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                    PermenPAN-RB 14
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Skor Akhir IKM PTSP:</span>
                    <span className="font-black font-mono text-emerald-700">88,42 / 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Predikat Mutu Layanan:</span>
                    <span className="font-bold text-emerald-800">Mutu A (Sangat Baik)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unsur Tertinggi:</span>
                    <span className="font-bold text-slate-800">Kesopanan &amp; Sarpras (89,6)</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Hasil survei berkala terhadap 1.250 pemohon izin di Gedung Mal Pelayanan Publik.
              </p>
            </div>

            {/* KARTU 4: PENGELOLAAN PENGADUAN SP4N LAPOR & MPP */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Monitoring Pengaduan Masyarakat
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200">
                    Dataset No. 6 Hal. 24
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pengaduan Masuk:</span>
                    <span className="font-black font-mono text-slate-800">124 Aduan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tindak Lanjut Tuntas:</span>
                    <span className="font-black font-mono text-emerald-700">122 Aduan (98,4%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rerata Penyelesaian:</span>
                    <span className="font-bold text-blue-700">1,2 Hari Kerja</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Integrasi kanal SP4N LAPOR, tatap muka loket MPP, dan hotline WhatsApp resmi.
              </p>
            </div>

            {/* KARTU 5: KECEPATAN LEAD TIME LAYANAN (EASE OF DOING BUSINESS) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                    Kecepatan Terbit &amp; Efisiensi EODB
                  </span>
                  <span className="text-[9.5px] font-mono font-bold bg-teal-50 text-teal-800 px-1.5 py-0.2 rounded border border-teal-200">
                    Dataset No. 17 Hal. 28
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rata-rata Terbit Izin:</span>
                    <span className="font-black font-mono text-teal-700">2,1 Hari Kerja</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Batas Standar Regulasi:</span>
                    <span className="font-bold text-slate-500">5 Hari Kerja PP 41</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kepatuhan SLA Total:</span>
                    <span className="font-bold text-emerald-700">88,6% Tepat Waktu</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                Pemangkasan rantai verifikasi memacu iklim penanaman modal PMA/PMDN di Batam.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
