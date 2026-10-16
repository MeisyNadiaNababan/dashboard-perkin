import React from 'react';
import {
  Stethoscope,
  Droplets,
  Shield,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HeartPulse,
  Activity,
  Award,
  Users,
  Flame,
  Building2,
  BedDouble,
  DollarSign,
  Package,
  Layers,
  MapPin,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';

interface UnitDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (formulaId?: string) => void;
}

// =========================================================================
// DATASET 1: BU RUMAH SAKIT (RSBP BATAM) (HAL. 19-21 SATU DATA BP BATAM)
// =========================================================================

// Dataset #5: Tren Bulanan Kunjungan Pasien (Rawat Jalan, Rawat Inap, IGD)
const RSBP_MONTHLY_PATIENTS = [
  { bulan: 'Jan', rawatJalan: 8450, rawatInap: 1980, igd: 1180, total: 11610 },
  { bulan: 'Feb', rawatJalan: 8120, rawatInap: 1890, igd: 1120, total: 11130 },
  { bulan: 'Mar', rawatJalan: 8940, rawatInap: 2050, igd: 1240, total: 12230 },
  { bulan: 'Apr', rawatJalan: 9150, rawatInap: 2120, igd: 1290, total: 12560 },
  { bulan: 'Mei', rawatJalan: 8780, rawatInap: 2010, igd: 1210, total: 12000 },
  { bulan: 'Jun', rawatJalan: 9240, rawatInap: 2160, igd: 1310, total: 12710 },
  { bulan: 'Jul', rawatJalan: 9450, rawatInap: 2190, igd: 1340, total: 12980 },
  { bulan: 'Agu', rawatJalan: 8820, rawatInap: 2040, igd: 1230, total: 12090 },
  { bulan: 'Sep', rawatJalan: 8690, rawatInap: 1990, igd: 1200, total: 11880 },
  { bulan: 'Okt', rawatJalan: 8910, rawatInap: 2080, igd: 1250, total: 12240 },
  { bulan: 'Nov', rawatJalan: 8540, rawatInap: 1970, igd: 1190, total: 11700 },
  { bulan: 'Des', rawatJalan: 9350, rawatInap: 2180, igd: 1290, total: 12820 },
];

// Dataset #4: Kasus Morbiditas Terbanyak (Top 5 ICD-10 di RSBP)
const RSBP_TOP_MORBIDITAS = [
  { namaPenyakit: 'Hipertensi Primer / Esensial (I10)', kasus: 14250, porsi: '28,5%', kodeIcd: 'I10' },
  { namaPenyakit: 'Penyakit Jantung Iskemik & Koroner (I25)', kasus: 11840, porsi: '23,7%', kodeIcd: 'I25' },
  { namaPenyakit: 'Diabetes Melitus Tipe 2 (E11)', kasus: 9680, porsi: '19,4%', kodeIcd: 'E11' },
  { namaPenyakit: 'Cerebrovascular Disease / Stroke (I64)', kasus: 7850, porsi: '15,7%', kodeIcd: 'I64' },
  { namaPenyakit: 'Dispepsia & Gangguan Lambung (K30)', kasus: 6380, porsi: '12,7%', kodeIcd: 'K30' },
];

// Dataset #6: Kunjungan Layanan Unggulan KEK Kesehatan Sekupang
const RSBP_LAYANAN_UNGGULAN = [
  { center: 'Cardiovascular Center (Cath Lab & Bedah Jantung)', pasien: 12450, share: 43.8, pnbpM: 52.4 },
  { center: 'Onkologi Terpadu (Kemoterapi & Radioterapi)', pasien: 6820, share: 24.0, pnbpM: 28.5 },
  { center: 'Trauma Center & Bedah Ortopedi Terpadu', pasien: 4950, share: 17.4, pnbpM: 21.2 },
  { center: 'Hyperbaric Chamber Center (Penyelam & Medis)', pasien: 2480, share: 8.7, pnbpM: 9.8 },
  { center: 'Aesthetic & Medical Wellness KEK', pasien: 1750, share: 6.1, pnbpM: 7.9 },
];

// Dataset #14: Daftar Tenant Fasilitas RSBP (Dataset #14 Hal. 21 Satu Data)
const RSBP_TENANT_LIST = [
  { tenant: 'Apotek Kimia Farma RSBP', objek: 'Pelayanan Farmasi Rawat Jalan', luas: '120 m²', masaSewa: '2024 - 2027', nilaiTahun: 'Rp 480 Juta', status: 'Aktif' },
  { tenant: 'Bank BNI Kantor Kas & ATM', objek: 'Layanan Transaksi & Pembayaran', luas: '45 m²', masaSewa: '2023 - 2026', nilaiTahun: 'Rp 220 Juta', status: 'Aktif' },
  { tenant: 'Kantin Medika Sehat RSBP', objek: 'Food & Beverage Pengunjung', luas: '180 m²', masaSewa: '2024 - 2026', nilaiTahun: 'Rp 360 Juta', status: 'Aktif' },
  { tenant: 'Optik Tunggal Medika', objek: 'Layanan Kacamata & Lensa Medis', luas: '35 m²', masaSewa: '2025 - 2028', nilaiTahun: 'Rp 180 Juta', status: 'Aktif' },
  { tenant: 'Convenience Store Alfamart', objek: 'Kebutuhan Pasien & Keluarga', luas: '80 m²', masaSewa: '2024 - 2027', nilaiTahun: 'Rp 310 Juta', status: 'Aktif' },
];

// =========================================================================
// DATASET 2: BU SPAM, FASILITAS DAN LINGKUNGAN (HAL. 28-37 SATU DATA BP BATAM)
// =========================================================================

// Dataset #2: Kapasitas vs Produksi 6 WTP / IPA Utama Batam (Liter / Detik)
const SPAM_WTP_CAPACITY_DATA = [
  { wtp: 'Duriangkang', kapasitas: 2200, produksi: 2120, utilisasi: 96.4, color: '#0284C7' },
  { wtp: 'Mukakuning', kapasitas: 600, produksi: 580, utilisasi: 96.7, color: '#0EA5E9' },
  { wtp: 'Tembesi', kapasitas: 350, produksi: 240, utilisasi: 68.6, color: '#10B981' },
  { wtp: 'Sei Ladi', kapasitas: 240, produksi: 230, utilisasi: 95.8, color: '#38BDF8' },
  { wtp: 'Sei Harapan', kapasitas: 210, produksi: 195, utilisasi: 92.9, color: '#06B6D4' },
  { wtp: 'Nongsa', kapasitas: 60, produksi: 55, utilisasi: 91.7, color: '#14B8A6' },
];

// Dataset #8, 9, 10: Komposisi Sumber PNBP SPAM Fasling
const SPAM_REVENUE_KOMPOSISI = [
  { sumber: 'Penjualan Air Bersih Curah (WTP)', targetM: 90.0, realisasiM: 92.4, share: 64.8 },
  { sumber: 'Pengolahan Limbah Industri B3 KPLI', targetM: 26.5, realisasiM: 28.6, share: 20.1 },
  { sumber: 'Sewa Rusunawa Pekerja (32 Twin Block)', targetM: 13.8, realisasiM: 14.2, share: 10.0 },
  { sumber: 'Aset Komersial & Destinasi Wisata', targetM: 7.0, realisasiM: 7.3, share: 5.1 },
];

// Dataset #37: Status Daya Tampung 6 Waduk Air Baku
const SPAM_WADUK_STATUS = [
  { nama: 'Waduk Duriangkang', dayaTampung: 101.2, luasHa: 1260, elevasi: '+0.18 m', status: 'Normal / Prima', ketahanan: '14 Bulan', debitWtp: '2.200 L/s' },
  { nama: 'Waduk Tembesi', dayaTampung: 56.0, luasHa: 850, elevasi: 'Desalinasi Siap', status: 'Estuari Siap Operasi', ketahanan: '16 Bulan', debitWtp: '350 L/s' },
  { nama: 'Waduk Mukakuning', dayaTampung: 13.1, luasHa: 230, elevasi: '+0.05 m', status: 'Normal / Prima', ketahanan: '11 Bulan', debitWtp: '600 L/s' },
  { nama: 'Waduk Sei Ladi', dayaTampung: 9.4, luasHa: 190, elevasi: '+0.10 m', status: 'Normal / Prima', ketahanan: '12 Bulan', debitWtp: '240 L/s' },
  { nama: 'Waduk Sei Harapan', dayaTampung: 3.8, luasHa: 95, elevasi: '-0.12 m', status: 'Sedimen Terpantau', ketahanan: '8 Bulan', debitWtp: '210 L/s' },
  { nama: 'Waduk Nongsa', dayaTampung: 0.7, luasHa: 35, elevasi: '+0.02 m', status: 'Normal', ketahanan: '9 Bulan', debitWtp: '60 L/s' },
];

// Dataset #41, 68, 70: Monitoring Tekanan JDU & NRW per Zona DMZ
const SPAM_DMZ_MONITORING = [
  { zona: 'Batam Centre (DMZ 07)', pelanggan: 41300, tekanan: '1.55 bar', nrw: 23.8 },
  { zona: 'Nagoya - Jodoh (DMZ 11)', pelanggan: 31800, tekanan: '1.40 bar', nrw: 27.2 },
  { zona: 'Batu Ampar (DMZ 01)', pelanggan: 24500, tekanan: '1.45 bar', nrw: 26.4 },
  { zona: 'Sekupang (DMZ 04)', pelanggan: 18200, tekanan: '1.50 bar', nrw: 22.1 },
  { zona: 'Mukakuning KEK (DMZ 21)', pelanggan: 16800, tekanan: '1.60 bar', nrw: 21.0 },
  { zona: 'Kabil Industri (DMZ 16)', pelanggan: 14200, tekanan: '1.65 bar', nrw: 19.4 },
];

// Dataset #25: Okupansi Rusunawa Pekerja BP Batam (32 Twin Block)
const SPAM_RUSUN_DATA = [
  { lokasi: 'Rusunawa Mukakuning (Blok 1 - 10)', unit: 960, terisi: 904, okupansi: '94,2%', pnbpBulan: 'Rp 412 Juta' },
  { lokasi: 'Rusunawa Batu Ampar (Blok 1 - 6)', unit: 576, terisi: 524, okupansi: '91,0%', pnbpBulan: 'Rp 238 Juta' },
  { lokasi: 'Rusunawa Sekupang (Blok 1 - 8)', unit: 768, terisi: 680, okupansi: '88,5%', pnbpBulan: 'Rp 305 Juta' },
  { lokasi: 'Rusunawa Kabil (Blok 1 - 8)', unit: 768, terisi: 709, okupansi: '92,3%', pnbpBulan: 'Rp 320 Juta' },
];

// =========================================================================
// DATASET 3: DIT. PENGAMANAN ASET DAN KAWASAN (HAL. 17-19 SATU DATA BP BATAM)
// =========================================================================

// Dataset #1, 8, 9: Tren Penertiban Bangunan Liar & Penggarap Hutan/Waduk
const DITPAM_PENERTIBAN_MONTHLY = [
  { bulan: 'Jan', penertibanRutin: 68, timTerpadu: 14, selesai: 80 },
  { bulan: 'Feb', penertibanRutin: 62, timTerpadu: 12, selesai: 71 },
  { bulan: 'Mar', penertibanRutin: 74, timTerpadu: 18, selesai: 89 },
  { bulan: 'Apr', penertibanRutin: 78, timTerpadu: 16, selesai: 91 },
  { bulan: 'Mei', penertibanRutin: 71, timTerpadu: 15, selesai: 84 },
  { bulan: 'Jun', penertibanRutin: 75, timTerpadu: 17, selesai: 88 },
  { bulan: 'Jul', penertibanRutin: 80, timTerpadu: 19, selesai: 96 },
  { bulan: 'Agu', penertibanRutin: 72, timTerpadu: 14, selesai: 83 },
  { bulan: 'Sep', penertibanRutin: 69, timTerpadu: 13, selesai: 80 },
  { bulan: 'Okt', penertibanRutin: 76, timTerpadu: 16, selesai: 89 },
  { bulan: 'Nov', penertibanRutin: 70, timTerpadu: 15, selesai: 82 },
  { bulan: 'Des', penertibanRutin: 79, timTerpadu: 18, selesai: 94 },
];

// Dataset #3: Distribusi Personel & Pos Pengamanan Ditpam (624 Personel)
const DITPAM_PERSONEL_SEBARAN = [
  { pos: 'Patroli Daerah Tangkapan Air (DTA) & Waduk', personel: 185, share: 29.6, posko: '6 Pos Waduk' },
  { pos: 'Pengamanan Objek Vital Bandara & Pelabuhan', personel: 162, share: 26.0, posko: '8 Terminal & Pos' },
  { pos: 'Pengamanan Kantor Pusat, Gedung BIDA & IT Centre', personel: 124, share: 19.9, posko: 'Mako & Gedung BIDA' },
  { pos: 'Patroli Hutan Lindung, Mangrove & Lahan Mangkrak', personel: 95, share: 15.2, posko: 'Pos Barelang & Sei Beduk' },
  { pos: 'Unit Reaksi Cepat (URC) & Rescue Bencana', personel: 58, share: 9.3, posko: 'Posko Siaga 24 Jam' },
];

// Dataset #5 & #6: Rekapitulasi Mitigasi Rescue & Bencana Alam
const DITPAM_RESCUE_DATA = [
  { jenis: 'Penanganan Pohon Tumbang Jalur Protokol', giat: 54, responseMenit: 9.5, status: '100% Tertangani' },
  { jenis: 'Mitigasi Longsor & Sedimentasi DTA Waduk', giat: 38, responseMenit: 12.0, status: '100% Tertangani' },
  { jenis: 'Penanganan Genangan & Evakuasi Banjir', giat: 26, responseMenit: 14.2, status: '100% Tertangani' },
  { jenis: 'Pencegahan Kebakaran Lahan Hutan Lindung', giat: 21, responseMenit: 10.5, status: 'Zero Fire Spread' },
];

// Dataset #7: Rekapitulasi Pengamanan Unjuk Rasa & Aksi Damai
const DITPAM_UNJUK_RASA = [
  { lokasi: 'Gedung BP Batam Batam Centre', aksi: 16, personelDitpam: 180, kondisi: 'Aman & Tertib' },
  { lokasi: 'Kawasan Industri Mukakuning / Batamindo', aksi: 6, personelDitpam: 90, kondisi: 'Aman & Kondusif' },
  { lokasi: 'Kawasan Pelabuhan Batu Ampar', aksi: 4, personelDitpam: 65, kondisi: 'Kondusif' },
  { lokasi: 'Area Objek Vital Lainnya', aksi: 2, personelDitpam: 40, kondisi: 'Kondusif' },
];

export const UnitDeepDiveCenter: React.FC<UnitDeepDiveCenterProps> = ({
  selectedUnitId,
  onSelectUnit,
  onNavigateToFullDashboard,
  onOpenFormulaModal: _onOpenFormulaModal,
}) => {
  // Normalize unit: 'bu-rumah-sakit' | 'bu-spam-fasling' | 'dit-pam-aset'
  const activeUnit =
    selectedUnitId === 'bu-spam-fasling' || selectedUnitId === 'dit-pam-aset'
      ? selectedUnitId
      : 'bu-rumah-sakit';

  return (
    <div
      id="unit-deep-dive-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4.5 space-y-4 font-sans"
    >
      {/* ================================================================== */}
      {/* 1. HEADER SECTION & UNIT TABS (PERSIS MODEL DASHBOARD DEP-A4 & A5) */}
      {/* ================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#0A2540] to-blue-900 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4.5 h-4.5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                UNIT DEEP-DIVE MONITORING
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Buku Satu Data BP Batam (3 Unit Pengampu A6 &bull; 121 Dataset)
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              Unit Deep-Dive Center: Rumah Sakit, SPAM Fasling &amp; Pengamanan Aset
            </h3>
          </div>
        </div>

        {/* 3 Unit Selection Tabs - Persis DEP-A4, A5 & A3 */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => onSelectUnit('bu-rumah-sakit')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'bu-rumah-sakit'
                ? 'bg-white text-rose-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
            <span>BU Rumah Sakit (18 DS)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('bu-spam-fasling')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'bu-spam-fasling'
                ? 'bg-white text-cyan-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-600" />
            <span>BU SPAM Fasling (91 DS)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pam-aset')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeUnit === 'dit-pam-aset'
                ? 'bg-white text-amber-700 shadow-2xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Dit. Pengamanan Aset (12 DS)</span>
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. TAB CONTENT: BU RUMAH SAKIT (RSBP BATAM) (18 DATASET SATU DATA) */}
      {/* Semua Informasi Visualisasi Digabung Langsung Satu Tampilan        */}
      {/* ================================================================== */}
      {activeUnit === 'bu-rumah-sakit' && (
        <div className="space-y-3.5">
          {/* Top Quick Highlights Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-rose-800 font-bold block">PNBP RSBP (DS 2)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">Rp 121,80 M</span>
              <span className="text-[9.5px] text-emerald-700 font-bold">104,5% dari Target</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-600 font-bold block">Kunjungan Pasien (DS 5)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">142.350 Org</span>
              <span className="text-[9.5px] text-slate-500">R.Jalan 104k &bull; R.Inap 24k</span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-emerald-800 font-bold block">Efisiensi BOR (DS 9)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">76,2% BOR</span>
              <span className="text-[9.5px] text-emerald-700 font-semibold">ALOS 4,2 Hari (Ideal)</span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-blue-800 font-bold block">Layanan Unggulan (DS 6)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">28.450 Pasien</span>
              <span className="text-[9.5px] text-blue-700 font-semibold">KEK Medis Sekupang</span>
            </div>

            <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-purple-800 font-bold block">Resep Obat (DS 17)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">84,5% Generik</span>
              <span className="text-[9.5px] text-purple-700 font-semibold">Rasionalitas Terjaga</span>
            </div>
          </div>

          {/* DUAL VISUALISASI UTAMA: Tren Bulanan Kunjungan + Morbiditas Top 5 ICD-10 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Tren Bulanan Kunjungan Pasien (Dataset #5) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-rose-600" />
                    <span>Tren Bulanan Kunjungan Pasien RSBP (Dataset #5 Hal. 20 Satu Data)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Volume Pasien Rawat Jalan, Rawat Inap &amp; IGD (Jan s.d Des 2025)
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded">
                  RSBP Sekupang
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={RSBP_MONTHLY_PATIENTS} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} domain={[0, 12000]} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} domain={[9000, 14000]} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: any, name: any) => [`${Number(v).toLocaleString('id-ID')} Pasien`, name]} />
                    <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                    <Bar yAxisId="left" dataKey="rawatJalan" name="Rawat Jalan" fill="#E11D48" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="left" dataKey="rawatInap" name="Rawat Inap" fill="#0284C7" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="left" dataKey="igd" name="IGD 24 Jam" fill="#D97706" radius={[3, 3, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="total" name="Total Kunjungan" stroke="#4F46E5" strokeWidth={2} dot={{ r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visual 2: Kasus Morbiditas Terbanyak ICD-10 (Dataset #4) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-rose-600" />
                    <span>Top 5 Kasus Morbiditas ICD-10 (Dataset #4 Hal. 20)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Prevalensi Diagnosa Terbanyak Pasien Rumah Sakit BP Batam
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {RSBP_TOP_MORBIDITAS.map((m, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{m.namaPenyakit}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Kode ICD: {m.kodeIcd} &bull; {m.kasus.toLocaleString('id-ID')} Kasus
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-rose-700 text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {m.porsi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Layanan Unggulan KEK Medis & Efisiensi Operasional */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Layanan Unggulan KEK Kesehatan Sekupang (Dataset #6) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Kunjungan Pasien Layanan Unggulan KEK Kesehatan (Dataset #6)</span>
              </h4>
              <p className="text-[10px] text-slate-500">
                Pangsa Pasien &amp; Kontribusi Pendapatan Layanan Spesialisasi Unggulan RSBP
              </p>

              <div className="space-y-1.5 pt-1">
                {RSBP_LAYANAN_UNGGULAN.map((u, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{u.center}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {u.pasien.toLocaleString('id-ID')} Pasien &bull; PNBP Rp {u.pnbpM} M
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-slate-900 text-sm">{u.share}%</span>
                      <div className="w-20 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-rose-600 h-full rounded-full" style={{ width: `${u.share}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Daftar Tenant Fasilitas RSBP (Dataset #14) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>Daftar Penyewa Fasilitas &amp; Tenant Medis (Dataset #14 Hal. 21)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Penerimaan Sewa Komersial Penunjang Pelayanan Rumah Sakit
                  </p>
                </div>
                {onNavigateToFullDashboard && (
                  <button
                    type="button"
                    onClick={() => onNavigateToFullDashboard('rumah-sakit')}
                    className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Dashboard RSBP</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-left">
                      <th className="py-1.5 px-2">Nama Tenant</th>
                      <th className="py-1.5 px-2">Peruntukan</th>
                      <th className="py-1.5 px-2">Periode</th>
                      <th className="py-1.5 px-2 text-right">Nilai / Thn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {RSBP_TENANT_LIST.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-1.5 px-2 font-semibold text-slate-800">{t.tenant}</td>
                        <td className="py-1.5 px-2 text-slate-600">{t.objek}</td>
                        <td className="py-1.5 px-2 text-slate-500 font-mono text-[11px]">{t.masaSewa}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">{t.nilaiTahun}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 3. TAB CONTENT: BU SPAM, FASILITAS DAN LINGKUNGAN (91 DATASET)     */}
      {/* Semua Informasi Visualisasi Digabung Langsung Satu Tampilan        */}
      {/* ================================================================== */}
      {activeUnit === 'bu-spam-fasling' && (
        <div className="space-y-3.5">
          {/* Top Quick Highlights Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-cyan-800 font-bold block">PNBP SPAM Fasling (DS 8-10)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">Rp 142,50 M</span>
              <span className="text-[9.5px] text-cyan-700 font-bold">102,4% dari Target</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-600 font-bold block">Produksi Air WTP (DS 2)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">3.420 L/dtk</span>
              <span className="text-[9.5px] text-slate-500">Kapasitas 3.660 L/dtk</span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-blue-800 font-bold block">Daya Tampung 6 Waduk (DS 37)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">184,8 Juta m³</span>
              <span className="text-[9.5px] text-blue-700 font-semibold">Ketahanan 12-16 Bulan</span>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-amber-800 font-bold block">Limbah B3 KPLI (DS 54 &amp; 55)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">14.850 Ton</span>
              <span className="text-[9.5px] text-amber-700 font-semibold">99,2% Terolah Sesuai Baku</span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-emerald-800 font-bold block">Okupansi Rusunawa (DS 25)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">91,5% Terisi</span>
              <span className="text-[9.5px] text-emerald-700 font-semibold">32 Twin Block (3.072 Unit)</span>
            </div>
          </div>

          {/* DUAL VISUALISASI UTAMA: Kapasitas WTP + Komposisi Sumber Pendapatan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Kapasitas vs Produksi 6 WTP / IPA (Dataset #2 Hal. 28) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>Kapasitas Desain vs Produksi Riil 6 WTP Batam (Dataset #2 Hal. 28)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Instalasi Pengolahan Air (IPA) Bersih dalam Liter per Detik (L/s)
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded">
                  SPAM Batam
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPAM_WTP_CAPACITY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="wtp" tick={{ fontSize: 9.5 }} />
                    <YAxis tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${v} L/s`} />
                    <Tooltip formatter={(v: any, name: any) => [`${v} L/detik`, name]} />
                    <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                    <Bar dataKey="kapasitas" name="Kapasitas Desain" fill="#94A3B8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="produksi" name="Produksi Aktual" fill="#0284C7" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visual 2: Komposisi Pendapatan SPAM Fasling (Dataset #8, 9, 10 Hal. 28) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-cyan-600" />
                <span>Komposisi Sumber Pendapatan PNBP (Dataset #8, #9, #10)</span>
              </h4>
              <p className="text-[10px] text-slate-500">
                Penerimaan Air Curah, Limbah B3 KPLI, Rusunawa &amp; Destinasi Wisata
              </p>

              <div className="space-y-1.5 pt-1">
                {SPAM_REVENUE_KOMPOSISI.map((r, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{r.sumber}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Target Rp {r.targetM} M &bull; Realisasi Rp {r.realisasiM} M
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-cyan-700 text-xs bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        {r.share}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Waduk Air Baku & Monitoring DMZ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Ketahanan 6 Waduk Air Baku (Dataset #37 Hal. 31) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>Ketahanan &amp; Daya Tampung 6 Waduk Air Baku (Dataset #37)</span>
              </h4>
              <p className="text-[10px] text-slate-500">
                Kapasitas Waduk (Juta m³), Luas Daerah Genangan, dan Ketahanan Pasokan
              </p>

              <div className="space-y-1.5 pt-1">
                {SPAM_WADUK_STATUS.map((w, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{w.nama}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Daya Tampung {w.dayaTampung} Jt m³ &bull; Elevasi {w.elevasi} &bull; WTP {w.debitWtp}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {w.ketahanan}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Monitoring Tekanan JDU & NRW per Zona DMZ (Dataset #41, 68, 70) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-600" />
                <span>Tekanan JDU &amp; Pengendalian NRW per Zona DMZ (Dataset #41, #68, #70)</span>
              </h4>
              <p className="text-[10px] text-slate-500">
                Tekanan Jaringan Distribusi Utama (bar) dan Rasio Kehilangan Air (NRW %)
              </p>

              <div className="space-y-1.5 pt-1">
                {SPAM_DMZ_MONITORING.map((d, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{d.zona}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {d.pelanggan.toLocaleString('id-ID')} Pelanggan &bull; Tekanan {d.tekanan}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                        d.nrw < 25 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        NRW {d.nrw}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table: Pemanfaatan Rusunawa Pekerja (32 Twin Block) */}
          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-3 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Rekapitulasi Okupansi Rumah Susun Sederhana Sewa (Rusunawa) Pekerja BP Batam (Dataset #25 Hal. 30)</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-left">
                    <th className="py-1.5 px-2">Lokasi Rusunawa</th>
                    <th className="py-1.5 px-2 text-right">Kapasitas Unit</th>
                    <th className="py-1.5 px-2 text-right">Unit Terisi</th>
                    <th className="py-1.5 px-2 text-right">Tingkat Okupansi</th>
                    <th className="py-1.5 px-2 text-right">PNBP / Bulan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {SPAM_RUSUN_DATA.map((r, i) => (
                    <tr key={i} className="hover:bg-white/80">
                      <td className="py-1.5 px-2 font-semibold text-slate-800">{r.lokasi}</td>
                      <td className="py-1.5 px-2 text-right font-mono text-slate-600">{r.unit} Unit</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-cyan-700">{r.terisi} Unit</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">{r.okupansi}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-slate-700">{r.pnbpBulan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 4. TAB CONTENT: DIREKTORAT PENGAMANAN ASET & KAWASAN (12 DATASET)   */}
      {/* Semua Informasi Visualisasi Digabung Langsung Satu Tampilan        */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pam-aset' && (
        <div className="space-y-3.5">
          {/* Top Quick Highlights Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-amber-800 font-bold block">Response Time SLA</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">11,8 Menit</span>
              <span className="text-[9.5px] text-emerald-700 font-bold">Standar Maks 15 Menit</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <span className="text-[10px] text-slate-600 font-bold block">Kegiatan Penertiban (DS 1 &amp; 9)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">874 Kasus</span>
              <span className="text-[9.5px] text-slate-500">Bangunan Liar &amp; Hutan</span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-blue-800 font-bold block">Kekuatan Personel (DS 2 &amp; 3)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">624 Personel</span>
              <span className="text-[9.5px] text-blue-700 font-semibold">148 Sertifikasi Khusus</span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-emerald-800 font-bold block">Proteksi Kebakaran (DS 4)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">312 Obvit</span>
              <span className="text-[9.5px] text-emerald-700 font-semibold">Inspeksi Berkala Tuntas</span>
            </div>

            <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-2.5">
              <span className="text-[10px] text-purple-800 font-bold block">Pengamanan Aksi (DS 7)</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">28 Aksi Damai</span>
              <span className="text-[9.5px] text-purple-700 font-semibold">100% Kondusif &amp; Tertib</span>
            </div>
          </div>

          {/* DUAL VISUALISASI UTAMA: Tren Bulanan Penertiban + Distribusi Personel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Tren Bulanan Penertiban Rutin vs Tim Terpadu (Dataset #1 & #9) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span>Tren Penertiban Bangunan Liar &amp; Penggarap Hutan (Dataset #1 &amp; #9 Hal. 17-19)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Penertiban Rutin Ditpam &amp; Operasi Gabungan Tim Terpadu Kota Batam
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                  Ditpam BP Batam
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={DITPAM_PENERTIBAN_MONTHLY} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} domain={[0, 30]} />
                    <Tooltip formatter={(v: any, name: any) => [`${v} Kegiatan`, name]} />
                    <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                    <Bar yAxisId="left" dataKey="penertibanRutin" name="Penertiban Rutin Ditpam" fill="#D97706" radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="right" dataKey="timTerpadu" name="Operasi Tim Terpadu" fill="#0284C7" radius={[3, 3, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="selesai" name="Tuntas Diselesaikan" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visual 2: Distribusi Penempatan Personel Pengamanan (Dataset #3) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Distribusi Kekuatan 624 Personel Ditpam (Dataset #3 Hal. 18)</span>
              </h4>
              <p className="text-[10px] text-slate-500">
                Alokasi Pos Pengamanan Objek Vital, Waduk &amp; Hutan Lindung
              </p>

              <div className="space-y-1.5 pt-1">
                {DITPAM_PERSONEL_SEBARAN.map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{p.pos}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {p.personel} Personel &bull; {p.posko}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-amber-700 text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {p.share}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Rescue Bencana & Pengamanan Unjuk Rasa */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Mitigasi Rescue & Bencana Alam (Dataset #5 & #6) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Mitigasi, Rescue &amp; Bencana Alam (Dataset #5 &amp; #6 Hal. 18)</span>
              </h4>
              <p className="text-[10px] text-slate-500">
                Penanganan Pohon Tumbang, Longsor, Banjir &amp; Karhutla
              </p>

              <div className="space-y-1.5 pt-1">
                {DITPAM_RESCUE_DATA.map((r, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{r.jenis}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {r.giat} Kejadian &bull; Response Time {r.responseMenit} Menit
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Pengamanan Aksi Unjuk Rasa (Dataset #7) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Pengamanan Unjuk Rasa &amp; Objek Vital (Dataset #7 Hal. 18)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    28 Giat Aksi Damai &bull; 100% Kondusif Tanpa Kerusakan Aset BP Batam
                  </p>
                </div>
                {onNavigateToFullDashboard && (
                  <button
                    type="button"
                    onClick={() => onNavigateToFullDashboard('pengamanan-aset')}
                    className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Dashboard Ditpam</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="space-y-1.5 pt-1">
                {DITPAM_UNJUK_RASA.map((u, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{u.lokasi}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {u.aksi} Aksi Damai &bull; {u.personelDitpam} Personel Dikerahkan
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {u.kondisi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
