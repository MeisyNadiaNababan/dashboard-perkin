import React, { useState } from 'react';
import {
  HardHat,
  Compass,
  ShieldCheck,
  Building2,
  Route,
  Droplets,
  Trees,
  Mountain,
  Ship,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Flame,
  Users,
  Search,
  ExternalLink,
  ShieldAlert,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  INFRASTRUKTUR_3_UNITS,
  KURVA_S_INFRASTRUKTUR_BULANAN,
  SEKTOR_INFRASTRUKTUR_ALOKASI,
  KEMANTAPAN_JALAN_DATA,
  PNBP_INFRASTRUKTUR_DETAIL,
} from './perkinA7Data';

interface InfrastrukturPerkinA7DeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

// =========================================================================
// DATASET 1: DIREKTORAT PEMBANGUNAN INFRASTRUKTUR (HAL. 48-50)
// =========================================================================

// 14 Paket Konstruksi Fisik Strategis BP Batam (Dataset 4 & 6)
const PROYEK_STRATEGIS_14 = [
  {
    kode: 'PK-01',
    nama: 'Pembangunan Flyover Sei Ladi & Penataan Simpang',
    kategori: 'Jalan & Jembatan',
    ppk: 'PPK Jembatan & Jalan Khusus',
    paguM: 132.0,
    kontrakM: 124.8,
    rencanaFisik: 95.0,
    realisasiFisik: 96.2,
    deviasi: '+1.2%',
    status: 'Ahead',
    statusColor: 'emerald',
    kendala: 'Relokasi pipa air baku selesai 100%, erection girder tuntas.',
  },
  {
    kode: 'PK-02',
    nama: 'Pelebaran Jalan Sudirman Tahap 4 (5 Lajur Kiri-Kanan)',
    kategori: 'Jalan & Jembatan',
    ppk: 'PPK Jalan Strategis Utama',
    paguM: 98.5,
    kontrakM: 92.4,
    rencanaFisik: 90.0,
    realisasiFisik: 91.5,
    deviasi: '+1.5%',
    status: 'Ahead',
    statusColor: 'emerald',
    kendala: 'Pengaspalan AC-WC lajur 4 dan 5 lancar.',
  },
  {
    kode: 'PK-03',
    nama: 'Revitalisasi Dermaga Utara Kargo Batu Ampar Tahap 2',
    kategori: 'Dermaga & Pelabuhan',
    ppk: 'PPK Infrastruktur Maritim',
    paguM: 75.0,
    kontrakM: 71.2,
    rencanaFisik: 82.0,
    realisasiFisik: 78.5,
    deviasi: '-3.5%',
    status: 'Waspada',
    statusColor: 'amber',
    kendala: 'Percepatan tiang pancang laut, penambahan shift kerja 24 jam.',
  },
  {
    kode: 'PK-04',
    nama: 'Pembangunan Kolam Retensi Baloi Indah & Saluran Primer',
    kategori: 'Drainase Perkotaan',
    ppk: 'PPK Drainase & Pengendalian Banjir',
    paguM: 48.0,
    kontrakM: 44.5,
    rencanaFisik: 88.0,
    realisasiFisik: 89.2,
    deviasi: '+1.2%',
    status: 'Ahead',
    statusColor: 'emerald',
    kendala: 'Pemasangan sheet pile beton dan pompa submersible tuntas.',
  },
  {
    kode: 'PK-05',
    nama: 'Pematangan Lahan & Cut/Fill Rempang Eco-City Zona A (280 Ha)',
    kategori: 'Pematangan Lahan (BSW)',
    ppk: 'PPK Pematangan Tanah & BSW',
    paguM: 185.0,
    kontrakM: 174.5,
    rencanaFisik: 85.0,
    realisasiFisik: 86.8,
    deviasi: '+1.8%',
    status: 'Ahead',
    statusColor: 'emerald',
    kendala: 'Volume cut & fill mencapai 4,27 juta m³, alat berat 45 unit.',
  },
  {
    kode: 'PK-06',
    nama: 'Peningkatan Jalan Akses Bandara Hang Nadim - Nongsa',
    kategori: 'Jalan & Jembatan',
    ppk: 'PPK Jalan Strategis Utama',
    paguM: 64.2,
    kontrakM: 60.5,
    rencanaFisik: 84.0,
    realisasiFisik: 84.0,
    deviasi: '0.0%',
    status: 'On Track',
    statusColor: 'blue',
    kendala: 'Pelebaran 4 lajur median jalan dan trotoar pedestrian.',
  },
  {
    kode: 'PK-07',
    nama: 'Normalisasi Drainase Primer Batam Centre & U-Ditch 4 Km',
    kategori: 'Drainase Perkotaan',
    ppk: 'PPK Drainase & Pengendalian Banjir',
    paguM: 32.5,
    kontrakM: 30.2,
    rencanaFisik: 92.0,
    realisasiFisik: 92.5,
    deviasi: '+0.5%',
    status: 'Ahead',
    statusColor: 'emerald',
    kendala: 'Penataan outlet saluran ke laut bebas endapan sedimentasi.',
  },
  {
    kode: 'PK-08',
    nama: 'Pembangunan Jembatan Penyeberangan Orang (JPO) Mega Mall',
    kategori: 'Jalan & Jembatan',
    ppk: 'PPK Sarana Pelengkap Jalan',
    paguM: 18.5,
    kontrakM: 17.2,
    rencanaFisik: 96.0,
    realisasiFisik: 97.0,
    deviasi: '+1.0%',
    status: 'Ahead',
    statusColor: 'emerald',
    kendala: 'Finishing lift disabilitas dan kanopi estetik modern.',
  },
];

// Data Triwulan ROW Utilitas & Penghijauan (Dataset 1 & 2)
const ROW_TRIWULAN_DATA = [
  { triwulan: 'TW I', utilitasGalianKm: 112.5, rthLokasi: 18, pnbpM: 1.85 },
  { triwulan: 'TW II', utilitasGalianKm: 135.2, rthLokasi: 24, pnbpM: 2.15 },
  { triwulan: 'TW III', utilitasGalianKm: 148.8, rthLokasi: 28, pnbpM: 2.45 },
  { triwulan: 'TW IV', utilitasGalianKm: 85.5, rthLokasi: 14, pnbpM: 1.00 },
];

// =========================================================================
// DATASET 2: DIREKTORAT PERENCANAAN INFRASTRUKTUR (HAL. 53)
// =========================================================================

// 6 Sektor Perencanaan DED (Dataset 1 s.d. 6)
const DED_6_SEKTOR = [
  {
    sektor: 'Infrastruktur Gedung & Perkantoran',
    dataset: 'Dataset 1 (Hal. 53)',
    jumlahDed: 7,
    paguM: 9.85,
    durasiBulan: 5.2,
    estimasiCapexM: 215.0,
    unitPengguna: 'Biro Umum, Dit. Lahan & PTSP',
    readiness: '100% Siap Lelang',
    readinessColor: 'emerald',
  },
  {
    sektor: 'Infrastruktur Drainase & Utilitas Perkotaan',
    dataset: 'Dataset 2 (Hal. 53)',
    jumlahDed: 9,
    paguM: 12.40,
    durasiBulan: 5.6,
    estimasiCapexM: 320.0,
    unitPengguna: 'Dit. Pembangunan & BU SPAM',
    readiness: '100% Siap Lelang',
    readinessColor: 'emerald',
  },
  {
    sektor: 'Infrastruktur Fasilitas Wisata & Lingkungan',
    dataset: 'Dataset 3 (Hal. 53)',
    jumlahDed: 8,
    paguM: 8.50,
    durasiBulan: 4.8,
    estimasiCapexM: 185.0,
    unitPengguna: 'Dit. Investasi & BU SPAM Fasling',
    readiness: '100% Siap Lelang',
    readinessColor: 'emerald',
  },
  {
    sektor: 'Infrastruktur Pertanaman, RTH & Taman',
    dataset: 'Dataset 4 (Hal. 53)',
    jumlahDed: 6,
    paguM: 5.65,
    durasiBulan: 4.5,
    estimasiCapexM: 95.0,
    unitPengguna: 'Dit. Pembangunan Subdit Penghijauan',
    readiness: '100% Siap Lelang',
    readinessColor: 'emerald',
  },
  {
    sektor: 'Infrastruktur Transportasi Darat (Jalan/Jembatan)',
    dataset: 'Dataset 5 (Hal. 53)',
    jumlahDed: 7,
    paguM: 11.20,
    durasiBulan: 6.0,
    estimasiCapexM: 480.0,
    unitPengguna: 'Dit. Pembangunan Subdit Jalan',
    readiness: '100% Siap Lelang',
    readinessColor: 'emerald',
  },
  {
    sektor: 'Infrastruktur Maritim & Udara (Pelabuhan/Bandara)',
    dataset: 'Dataset 6 (Hal. 53)',
    jumlahDed: 6,
    paguM: 6.08,
    durasiBulan: 5.8,
    estimasiCapexM: 125.0,
    unitPengguna: 'Dit. Pelabuhan & Dit. Bandara',
    readiness: '100% Siap Lelang',
    readinessColor: 'emerald',
  },
];

// =========================================================================
// DATASET 3: DIREKTORAT PENGAMANAN ASET DAN KAWASAN (HAL. 17-19)
// =========================================================================

// Penertiban Bangunan Liar per Wilayah (Dataset 1 & 9)
const PENERTIBAN_WILAYAH_DATA = [
  { wilayah: 'Batam Kota', bangliUnit: 285, giatOperasi: 12, luasM2: 14200, status: 'Steril 100%' },
  { wilayah: 'Batu Aji & Sagulung', bangliUnit: 210, giatOperasi: 9, luasM2: 11500, status: 'Steril 100%' },
  { wilayah: 'Nongsa (Koridor KEK)', bangliUnit: 180, giatOperasi: 8, luasM2: 9800, status: 'Steril 100%' },
  { wilayah: 'Sekupang & Tiban', bangliUnit: 145, giatOperasi: 6, luasM2: 7600, status: 'Steril 100%' },
  { wilayah: 'Bengkong & Batu Ampar', bangliUnit: 120, giatOperasi: 5, luasM2: 6200, status: 'Steril 100%' },
  { wilayah: 'Rempang & Galang', bangliUnit: 90, giatOperasi: 2, luasM2: 4500, status: 'Terkendali' },
];

// Sebaran Personel Ditpam & Kesiapsiagaan Pos (Dataset 2 & 3)
const PERSONEL_DITPAM_SEBARAN = [
  { penempatan: 'Kawasan Bandara Hang Nadim', personil: 115, posAktif: 6, sertifikasiK3: 42, status: 'Siaga 24 Jam' },
  { penempatan: 'Pelabuhan Batu Ampar & Ferry', personil: 128, posAktif: 8, sertifikasiK3: 48, status: 'Siaga 24 Jam' },
  { penempatan: 'Kawasan Kantor Pusat & BIDA', personil: 86, posAktif: 4, sertifikasiK3: 34, status: 'Siaga 24 Jam' },
  { penempatan: 'Waduk DTA & Hutan Lindung', personil: 110, posAktif: 7, sertifikasiK3: 38, status: 'Patroli Rutin' },
  { penempatan: 'Unit Reaksi Cepat / Rescue', personil: 65, posAktif: 3, sertifikasiK3: 24, status: 'Kesiagaan Khusus' },
];

export const InfrastrukturPerkinA7DeepDiveCenter: React.FC<
  InfrastrukturPerkinA7DeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal,
  onNavigateToFullDashboard,
}) => {
  const currentUnit =
    INFRASTRUKTUR_3_UNITS.find((u) => u.id === selectedUnitId) ||
    INFRASTRUKTUR_3_UNITS[1]; // default pembangunan

  return (
    <div
      id="infrastruktur-deep-dive-section"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans"
    >
      {/* ============================================================== */}
      {/* 1. TOP HEADER & 3-UNIT SELECTOR TABS (SEPERTI DEP A1/2/3/4/5/6) */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-800">
              UNIT DEEP-DIVE CENTER &bull; 3 UNIT KERJA PERKIN A.7
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Satu Data Interaktif Terpadu
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Eksplorasi data operasional mendalam yang diintegrasikan langsung dari 3 unit kerja pengampu: <strong>Dit. Pembangunan Infrastruktur</strong>, <strong>Dit. Perencanaan Infrastruktur</strong>, dan <strong>Dit. Pengamanan Aset dan Kawasan</strong>.
          </p>
        </div>

        {/* 3 Main Unit Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => onSelectUnit('dit-pembangunan-infrastruktur')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedUnitId === 'dit-pembangunan-infrastruktur'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <HardHat className="w-3.5 h-3.5 text-blue-400" />
            <span>Dit. Pembangunan (6 DS)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-perencanaan-infrastruktur')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedUnitId === 'dit-perencanaan-infrastruktur'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Dit. Perencanaan (9 DS)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pam-aset')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedUnitId === 'dit-pam-aset'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Dit. Pengamanan Aset (12 DS)</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. UNIT 1: DIT. PEMBANGUNAN INFRASTRUKTUR DEEP-DIVE            */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pembangunan-infrastruktur' && (
        <div className="space-y-3.5">
          {/* Top 5 Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">14 Paket Proyek (DS 4 &amp; 6)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">Rp 742,8 M</span>
              <span className="text-[9.5px] text-blue-700 font-bold">Realisasi Rp 602,8 M (81,2%)</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Kurva S Fisik Kumulatif</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">86,5% Lapangan</span>
              <span className="text-[9.5px] text-slate-500">Target 88,0% &bull; On Track</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">PNBP ROW Utilitas/RTH (DS 1)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">Rp 7,45 M</span>
              <span className="text-[9.5px] text-emerald-700 font-bold">109,22% (+629 Jt Surplus)</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Kemantapan Jalan (DS 3)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">91,4% Mantap</span>
              <span className="text-[9.5px] text-purple-700 font-semibold">496,1 Km dari 542,8 Km</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Cut &amp; Fill BSW (DS 5)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">280 Hektar</span>
              <span className="text-[9.5px] text-amber-700 font-semibold">Rempang, Kabil, Sekupang</span>
            </div>
          </div>

          {/* DUAL VISUALISASI UTAMA: Kurva S Bulanan + ROW Utilitas & RTH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Kurva S Progres Konstruksi (Dataset 4 & 6) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Kurva S Agregat Konstruksi Fisik &amp; Keuangan (Dataset 4 &amp; 6 Hal. 49-51)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Target Kumulatif (VOL_PEK) vs Realisasi Fisik (PRGRS_PEK) vs Serapan SP2D
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                  TA 2025
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={KURVA_S_INFRASTRUKTUR_BULANAN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 9.5 }} />
                    <YAxis tick={{ fontSize: 9.5 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v: any, name: any) => [`${v ? `${Number(v).toFixed(1)}%` : 'Proyeksi'}`, name]} />
                    <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                    <Line type="monotone" dataKey="targetFisik" name="Target Rencana Fisik" stroke="#94A3B8" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="realisasiFisik" name="Realisasi Fisik (PRGRS_PEK)" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Bar dataKey="keuangan" name="Serapan Keuangan SP2D" fill="#7C3AED" radius={[3, 3, 0, 0]} opacity={0.4} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visual 2: ROW Utilitas & Penghijauan (Dataset 1 & 2) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Route className="w-4 h-4 text-cyan-600" />
                    <span>Pemanfaatan ROW &amp; Penerimaan PNBP (Dataset 1 &amp; 2 Hal. 48)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Panjang Galian Kabel FO/Gas &amp; Penerimaan PNBP per Triwulan
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded">
                  Surplus +109%
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ROW_TRIWULAN_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="triwulan" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${v} Km`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `Rp ${v}M`} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                    <Bar yAxisId="left" dataKey="utilitasGalianKm" name="Galian ROW (Km)" fill="#0284C7" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="right" dataKey="pnbpM" name="PNBP (Rp Miliar)" fill="#10B981" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TABEL MONITORING 14 PAKET PROYEK STRATEGIS DIT. PEMBANGUNAN INFRASTRUKTUR */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <HardHat className="w-4 h-4 text-blue-600" />
                  <span>Monitoring Progres Fisik 14 Paket Konstruksi Strategis (Atribut Satu Data Hal. 49-51)</span>
                </h4>
                <p className="text-[10px] text-slate-500">
                  Parameter: NAMOBJ, KD_ANGG, KTGR_PEK, NM_PPK, NPAGU_F, NKON_S, VOL_PEK, PRGRS_PEK &amp; KENDALA
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                8 Paket Unggulan Ditampilkan
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2 px-3">Kode</th>
                    <th className="py-2 px-3">Nama Paket / Pekerjaan (NAMOBJ)</th>
                    <th className="py-2 px-3">Kategori</th>
                    <th className="py-2 px-3">Pagu (NPAGU_F)</th>
                    <th className="py-2 px-3">Kontrak (NKON_S)</th>
                    <th className="py-2 px-3">Rencana</th>
                    <th className="py-2 px-3">Realisasi (PRGRS_PEK)</th>
                    <th className="py-2 px-3">Deviasi</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Kendala &amp; Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody>
                  {PROYEK_STRATEGIS_14.map((p) => (
                    <tr key={p.kode} className="border-b border-slate-100 hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-mono font-bold text-slate-800">{p.kode}</td>
                      <td className="py-2 px-3 font-bold text-slate-900 max-w-xs">{p.nama}</td>
                      <td className="py-2 px-3 text-slate-600 whitespace-nowrap">{p.kategori}</td>
                      <td className="py-2 px-3 font-mono">Rp {p.paguM.toFixed(1)} M</td>
                      <td className="py-2 px-3 font-mono font-semibold text-blue-700">Rp {p.kontrakM.toFixed(1)} M</td>
                      <td className="py-2 px-3 font-mono text-slate-500">{p.rencanaFisik.toFixed(1)}%</td>
                      <td className="py-2 px-3 font-mono font-black text-slate-900">{p.realisasiFisik.toFixed(1)}%</td>
                      <td className={`py-2 px-3 font-mono font-bold ${p.deviasi.startsWith('+') ? 'text-emerald-700' : p.deviasi.startsWith('-') ? 'text-amber-700' : 'text-slate-700'}`}>
                        {p.deviasi}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.status === 'Ahead' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          p.status === 'Waspada' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-600 text-[10.5px] max-w-sm">{p.kendala}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. UNIT 2: DIT. PERENCANAAN INFRASTRUKTUR DEEP-DIVE            */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-perencanaan-infrastruktur' && (
        <div className="space-y-3.5">
          {/* Top 5 Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">43 Paket DED (DS 1-6)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">6 Sektor</span>
              <span className="text-[9.5px] text-purple-700 font-bold">100% Kesiapan Tender</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Pagu DED Konsultansi</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">Rp 53,68 M</span>
              <span className="text-[9.5px] text-blue-700 font-semibold">Realisasi Rp 53,55 M (84,1%)</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Estimasi Capex Fisik</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">Rp 1,42 T</span>
              <span className="text-[9.5px] text-emerald-700 font-bold">Readiness Criteria Proyek</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Durasi Rerata DED</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">5,5 Bulan</span>
              <span className="text-[9.5px] text-cyan-700 font-semibold">Target Standar &lt; 6 Bulan</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Pemanfaatan DED (DS 7-9)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">92,5% Terpakai</span>
              <span className="text-[9.5px] text-amber-700 font-semibold">Tender Konstruksi Sukses</span>
            </div>
          </div>

          {/* DUAL VISUALISASI UTAMA: 6 Sektor DED + Estimasi Capex */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Distribusi 6 Sektor Perencanaan DED */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-purple-600" />
                    <span>Distribusi Pagu &amp; Paket DED 6 Sektor (Dataset 1 s.d. 6 Hal. 53 Satu Data)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Biaya DED (Rp Miliar) vs Jumlah Paket Perencanaan Teknis
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">
                  43 Paket DED
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DED_6_SEKTOR} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="sektor"
                      tick={{ fontSize: 9 }}
                      angle={-15}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `Rp ${v}M`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${v} Pkt`} />
                    <Tooltip formatter={(v: any, name: any) => [`${name.includes('Biaya') ? `Rp ${v} Miliar` : `${v} Paket`}`, name]} />
                    <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '15px' }} />
                    <Bar yAxisId="left" dataKey="paguM" name="Biaya DED (Rp Miliar)" fill="#7C3AED" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="right" dataKey="jumlahDed" name="Jumlah Paket DED" fill="#0891B2" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visual 2: Estimasi Capex Konstruksi dari DED */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>Estimasi Capex Fisik Siap Lelang (Total Rp 1,42 Triliun)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Nilai konstruksi fisik lanjutan pasca penyusunan DED
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                  Pipeline 2025-2026
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DED_6_SEKTOR} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis type="number" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `Rp ${v}M`} />
                    <YAxis
                      dataKey="sektor"
                      type="category"
                      width={110}
                      tick={{ fontSize: 8.5 }}
                      tickFormatter={(v) => v.split(' ')[1] || v}
                    />
                    <Tooltip formatter={(v: any) => [`Rp ${Number(v).toFixed(1)} Miliar`, 'Estimasi Capex Fisik']} />
                    <Bar dataKey="estimasiCapexM" name="Estimasi Capex Fisik" fill="#059669" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TABEL MONITORING 6 SEKTOR PERENCANAAN DED (HAL. 53) */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Daftar 6 Sektor Perencanaan Teknis DED (Buku Satu Data Hal. 53)</span>
                </h4>
                <p className="text-[10px] text-slate-500">
                  Parameter: JUMLAH DED, BIAYA DED, WAKTU PELAKSANAAN PENYUSUNAN DED &amp; NILAI DED PEMANFAATAN
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                Lengkap 6 Sektor
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2 px-3">Sektor Perencanaan</th>
                    <th className="py-2 px-3">Dataset Satu Data</th>
                    <th className="py-2 px-3">Jumlah DED</th>
                    <th className="py-2 px-3">Biaya DED (Rp)</th>
                    <th className="py-2 px-3">Durasi</th>
                    <th className="py-2 px-3">Estimasi Capex Fisik</th>
                    <th className="py-2 px-3">Unit Kerja Pengguna DED</th>
                    <th className="py-2 px-3">Readiness Status</th>
                  </tr>
                </thead>
                <tbody>
                  {DED_6_SEKTOR.map((d) => (
                    <tr key={d.sektor} className="border-b border-slate-100 hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-bold text-slate-900">{d.sektor}</td>
                      <td className="py-2 px-3 font-mono text-sky-800 text-[10px]">{d.dataset}</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">{d.jumlahDed} Paket</td>
                      <td className="py-2 px-3 font-mono font-bold text-purple-700">Rp {d.paguM.toFixed(2)} M</td>
                      <td className="py-2 px-3 font-mono text-slate-700">{d.durasiBulan} Bulan</td>
                      <td className="py-2 px-3 font-mono font-black text-emerald-800">Rp {d.estimasiCapexM.toFixed(1)} M</td>
                      <td className="py-2 px-3 text-slate-600 max-w-xs">{d.unitPengguna}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-800 border-emerald-200">
                          {d.readiness}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. UNIT 3: DIT. PENGAMANAN ASET DAN KAWASAN (DITPAM) DEEP-DIVE */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pam-aset' && (
        <div className="space-y-3.5">
          {/* Top 5 Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Penertiban Bangli (DS 1 &amp; 9)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">1.030 Unit</span>
              <span className="text-[9.5px] text-amber-700 font-bold">42 Giat Tim Terpadu</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Personel Ditpam (DS 2 &amp; 3)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">524 Personel</span>
              <span className="text-[9.5px] text-blue-700 font-semibold">186 Bersertifikasi Khusus</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Pengamanan Obvitnas (DS 10)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">48 Kawasan</span>
              <span className="text-[9.5px] text-emerald-700 font-bold">100% Kondusif Terjaga</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Proteksi Hutan &amp; DTA (DS 11)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">142 Hektar</span>
              <span className="text-[9.5px] text-purple-700 font-semibold">Waduk Duriangkang/M.Kuning</span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
              <span className="text-[10px] text-slate-700 font-bold block">Pengamanan Unjuk Rasa (DS 7)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">18 Aksi Damai</span>
              <span className="text-[9.5px] text-cyan-700 font-semibold">0 Insiden Kerusakan Aset</span>
            </div>
          </div>

          {/* DUAL VISUALISASI UTAMA: Penertiban Bangli per Wilayah + Distribusi Personel Pos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Penertiban Bangunan Liar di Koridor ROW Jalan */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>Penertiban Bangunan Liar Koridor ROW Jalan (Dataset 1 &amp; 9 Hal. 17-19)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Jumlah Unit Bangunan Liar Ditertibkan &amp; Luas Ruang (m²) per Wilayah
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                  1.030 Unit Bangli
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PENERTIBAN_WILAYAH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="wilayah"
                      tick={{ fontSize: 9 }}
                      angle={-15}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${v} Unit`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k m²`} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '15px' }} />
                    <Bar yAxisId="left" dataKey="bangliUnit" name="Bangunan Liar (Unit)" fill="#D97706" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="right" dataKey="luasM2" name="Luas Steril (m²)" fill="#0284C7" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visual 2: Sebaran Personel Ditpam & Pos Obvitnas */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Kekuatan Personel Ditpam per Obvitnas (Dataset 2 &amp; 3 Hal. 17)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Distribusi Personel Siaga &amp; Sertifikasi Khusus (K3, Damkar)
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                  524 Personel
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERSONEL_DITPAM_SEBARAN} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis type="number" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${v} Org`} />
                    <YAxis
                      dataKey="penempatan"
                      type="category"
                      width={110}
                      tick={{ fontSize: 8.5 }}
                      tickFormatter={(v) => v.split(' ')[1] || v}
                    />
                    <Tooltip />
                    <Bar dataKey="personil" name="Kekuatan Personel" fill="#2563EB" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="sertifikasiK3" name="Sertifikasi Khusus" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TABEL MONITORING PENERTIBAN DAN PENGAMANAN DITPAM */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Log Operasi Penertiban &amp; Pengamanan Aset Strategis Ditpam (Hal. 17-19)</span>
                </h4>
                <p className="text-[10px] text-slate-500">
                  Parameter: SEMESTER, TAHUN, NAMA PEMILIK/LOKASI, JENIS KEGIATAN, HASIL &amp; KETERANGAN
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                Data Terverifikasi Ditpam
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2 px-3">Wilayah / Sektor</th>
                    <th className="py-2 px-3">Giat Operasi</th>
                    <th className="py-2 px-3">Bangunan Liar</th>
                    <th className="py-2 px-3">Luas Sterilisasi</th>
                    <th className="py-2 px-3">Tim Terpadu</th>
                    <th className="py-2 px-3">Status Kamtibmas</th>
                  </tr>
                </thead>
                <tbody>
                  {PENERTIBAN_WILAYAH_DATA.map((w) => (
                    <tr key={w.wilayah} className="border-b border-slate-100 hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-bold text-slate-900">{w.wilayah}</td>
                      <td className="py-2 px-3 font-mono text-slate-700">{w.giatOperasi} Kali Operasi</td>
                      <td className="py-2 px-3 font-mono font-bold text-amber-700">{w.bangliUnit} Unit Bangli</td>
                      <td className="py-2 px-3 font-mono text-blue-700">{w.luasM2.toLocaleString('id-ID')} m²</td>
                      <td className="py-2 px-3 text-slate-600">Ditpam, Satpol PP, Polri/TNI</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-800 border-emerald-200">
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
