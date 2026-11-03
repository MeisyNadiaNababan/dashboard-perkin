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
  FileCheck,
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
import { PerencanaanInfrastrukturVisualCharts } from './PerencanaanInfrastrukturVisualCharts';
import { PembangunanInfrastrukturVisualSuite } from './PembangunanInfrastrukturVisualSuite';
import { PengawasanInfrastrukturVisualSuite } from './PengawasanInfrastrukturVisualSuite';

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
            Analisis granular 3 unit kerja pengampu Perkin DEP-A7 (Dit. Pembangunan Infrastruktur, Dit. Perencanaan Infrastruktur, Dit. Pengawasan Infrastruktur)
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
            onClick={() => onSelectUnit('dit-pengawasan-infrastruktur')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'dit-pengawasan-infrastruktur' || selectedUnitId === 'dit-pam-aset'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Dit. Pengawasan Infrastruktur</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. UNIT 1: DIT. PEMBANGUNAN INFRASTRUKTUR DEEP-DIVE            */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-pembangunan-infrastruktur' && (
        <PembangunanInfrastrukturVisualSuite onOpenFormulaModal={onOpenFormulaModal} />
      )}

      {/* ============================================================== */}
      {/* 3. UNIT 2: DIT. PERENCANAAN INFRASTRUKTUR DEEP-DIVE            */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header      */}
      {/* ============================================================== */}
      {selectedUnitId === 'dit-perencanaan-infrastruktur' && (
        <PerencanaanInfrastrukturVisualCharts />
      )}

      {/* ============================================================== */}
      {/* 4. UNIT 3: DIT. PENGAWASAN INFRASTRUKTUR DEEP-DIVE            */}
      {/* Menggantikan Dit. Pengamanan Aset sesuai arahan user          */}
      {/* ============================================================== */}
      {(selectedUnitId === 'dit-pengawasan-infrastruktur' || selectedUnitId === 'dit-pam-aset') && (
        <PengawasanInfrastrukturVisualSuite onOpenFormulaModal={onOpenFormulaModal} />
      )}
    </div>
  );
};
