import React from 'react';
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
  onOpenFormulaModal: _onOpenFormulaModal,
  onNavigateToFullDashboard: _onNavigateToFullDashboard,
}) => {
  return (
    <div
      id="infrastruktur-deep-dive-section"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans"
    >
      {/* ============================================================== */}
      {/* 1. TOP HEADER & 3-UNIT SELECTOR TABS (PERSIS MODEL DEP-A1)      */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Pembangunan, Perencanaan &amp; Pengamanan Infrastruktur
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 3 unit kerja pengampu Perkin DEP-A7 (Dit. Pembangunan Infrastruktur, Dit. Perencanaan Infrastruktur, Dit. Pengamanan Aset)
          </p>
        </div>

        {/* 3 Main Unit Selectors */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            type="button"
            onClick={() => onSelectUnit('dit-pembangunan-infrastruktur')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'dit-pembangunan-infrastruktur'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Dit. Pembangunan</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-perencanaan-infrastruktur')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'dit-perencanaan-infrastruktur'
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Dit. Perencanaan</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pam-aset')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'dit-pam-aset'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dit. Pengamanan Aset</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. UNIT 1: DIT. PEMBANGUNAN INFRASTRUKTUR DEEP-DIVE            */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pembangunan-infrastruktur' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: Kurva S Bulanan + ROW Utilitas & RTH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Kurva S Progres Konstruksi (Dataset 4 & 6) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>Kurva S Agregat Konstruksi Fisik &amp; Keuangan</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Target Kumulatif (VOL_PEK) vs Realisasi Fisik (PRGRS_PEK) vs Serapan SP2D
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      86,5% Lapangan
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold ml-1.5">
                      (Target 88,0% &bull; On Track)
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
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
            </div>

            {/* Visual 2: ROW Utilitas & Penghijauan (Dataset 1 & 2) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Route className="w-4 h-4 text-cyan-600" />
                      <span>Pemanfaatan ROW &amp; Penerimaan PNBP</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Panjang Galian Kabel FO/Gas &amp; Penerimaan PNBP per Triwulan
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      Rp 7,45 M
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">
                      (109,22% Surplus)
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
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
          </div>

          {/* TABEL MONITORING 14 PAKET PROYEK STRATEGIS DIT. PEMBANGUNAN INFRASTRUKTUR */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <HardHat className="w-4 h-4 text-blue-600" />
                  <span>Monitoring Progres Fisik 14 Paket Konstruksi Strategis</span>
                </h3>
                <p className="text-[10px] text-slate-500">
                  Parameter: NAMOBJ, KD_ANGG, KTGR_PEK, NM_PPK, NPAGU_F, NKON_S, VOL_PEK, PRGRS_PEK &amp; KENDALA
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                  Rp 742,8 M
                </span>
                <span className="text-[10px] text-blue-600 font-bold ml-1.5">
                  (Realisasi Rp 602,8 M &bull; 81,2%)
                </span>
              </div>
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
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-perencanaan-infrastruktur' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: 6 Sektor DED + Estimasi Capex */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Distribusi 6 Sektor Perencanaan DED */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-purple-600" />
                      <span>Distribusi Pagu &amp; Paket DED 6 Sektor</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Biaya DED (Rp Miliar) vs Jumlah Paket Perencanaan Teknis
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      Rp 53,68 M
                    </span>
                    <span className="text-[10px] text-purple-600 font-bold ml-1.5">
                      (43 Paket DED &bull; 6 Sektor)
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
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
            </div>

            {/* Visual 2: Estimasi Capex Konstruksi dari DED */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span>Estimasi Capex Fisik Siap Lelang</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Nilai konstruksi fisik lanjutan pasca penyusunan DED
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      Rp 1,42 Triliun
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">
                      (Readiness Criteria 100%)
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
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
          </div>

          {/* TABEL MONITORING 6 SEKTOR PERENCANAAN DED (HAL. 53) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Monitoring 6 Sektor Perencanaan Teknis (DED)</span>
                </h3>
                <p className="text-[10px] text-slate-500">
                  Rincian 43 Dokumen DED, Alokasi Pagu, Durasi Penyusunan &amp; Estimasi Capex Fisik
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                  5,5 Bulan
                </span>
                <span className="text-[10px] text-cyan-600 font-bold ml-1.5">
                  (92,5% Pemanfaatan DED)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-2 px-3">Sektor Perencanaan</th>
                    <th className="py-2 px-3">Dataset</th>
                    <th className="py-2 px-3 text-right">Jumlah DED</th>
                    <th className="py-2 px-3 text-right">Pagu (Rp M)</th>
                    <th className="py-2 px-3 text-right">Durasi Rerata</th>
                    <th className="py-2 px-3 text-right">Estimasi Capex</th>
                    <th className="py-2 px-3">Unit Pengguna</th>
                    <th className="py-2 px-3">Kesiapan</th>
                  </tr>
                </thead>
                <tbody>
                  {DED_6_SEKTOR.map((d) => (
                    <tr key={d.sektor} className="border-b border-slate-100 hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-bold text-slate-900">{d.sektor}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono text-[10px]">{d.dataset}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-purple-700">{d.jumlahDed} Paket</td>
                      <td className="py-2 px-3 text-right font-mono">Rp {d.paguM.toFixed(2)} M</td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600">{d.durasiBulan} Bulan</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">Rp {d.estimasiCapexM.toFixed(1)} M</td>
                      <td className="py-2 px-3 text-slate-600">{d.unitPengguna}</td>
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
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pam-aset' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: Penertiban Bangli per Wilayah + Distribusi Personel Pos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Penertiban Bangunan Liar di Koridor ROW Jalan */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Penertiban Bangunan Liar Koridor ROW Jalan</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Jumlah Unit Bangunan Liar Ditertibkan &amp; Luas Ruang (m²) per Wilayah
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      1.030 Unit
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold ml-1.5">
                      (42 Giat Tim Terpadu)
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PENERTIBAN_WILAYAH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis
                        dataKey="wilayah"
                        tick={{ fontSize: 9 }}
                        angle={-15}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis tick={{ fontSize: 9.5 }} />
                      <Tooltip formatter={(v: any) => [`${v} Unit Bangli`, 'Penertiban']} />
                      <Bar dataKey="bangliUnit" name="Bangunan Liar Ditertibkan" fill="#D97706" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 2: Distribusi Personel Ditpam & Kesiapsiagaan Pos */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Distribusi Kekuatan Personel Ditpam</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Alokasi Pos Pengamanan Bandara, Pelabuhan, Kantor Pusat, Waduk &amp; Rescue
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                      524 Personel
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold ml-1.5">
                      (186 Bersertifikasi Khusus)
                    </span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
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
          </div>

          {/* TABEL MONITORING PENERTIBAN DAN PENGAMANAN DITPAM */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Log Operasi Penertiban &amp; Pengamanan Aset Strategis Ditpam</span>
                </h3>
                <p className="text-[10px] text-slate-500">
                  Parameter: SEMESTER, TAHUN, NAMA PEMILIK/LOKASI, JENIS KEGIATAN, HASIL &amp; KETERANGAN
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                  100% Kondusif
                </span>
                <span className="text-[10px] text-emerald-600 font-bold ml-1.5">
                  (48 Obvitnas &bull; 142 Ha Waduk/Hutan)
                </span>
              </div>
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
