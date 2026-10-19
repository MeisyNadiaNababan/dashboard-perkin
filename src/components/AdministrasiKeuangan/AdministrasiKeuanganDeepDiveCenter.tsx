import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  DollarSign,
  Coins,
  Scale,
  Award,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MessageSquare,
  BarChart3,
  List,
  AlertTriangle,
  Activity,
  TrendingUp,
  Target,
  FileCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Treemap,
} from 'recharts';

interface AdministrasiKeuanganDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
}

// ============================================================================
// DATA FOR BIRO KEUANGAN (5 CARDS)
// ============================================================================
const DATA_SURPLUS_DEFISIT = [
  { unit: 'Dit. Infrastruktur', pendapatan: 84.5, belanja: 72.4, surplus: 12.1 },
  { unit: 'BU SPAM', pendapatan: 42.8, belanja: 35.2, surplus: 7.6 },
  { unit: 'Dit. Pelabuhan', pendapatan: 295.4, belanja: 182.7, surplus: 112.7 },
  { unit: 'Biro Umum', pendapatan: 21.0, belanja: 28.2, surplus: -7.2 },
  { unit: 'Dit. Pertanahan', pendapatan: 218.7, belanja: 85.4, surplus: 133.3 },
  { unit: 'BU RSBP Batam', pendapatan: 108.3, belanja: 109.4, surplus: -1.1 },
];

const DATA_KAS_BANK_TREEMAP = [
  {
    name: 'Kas & Bank',
    children: [
      { name: 'Bank Mandiri', shortName: 'Mandiri', saldo: 624.5, size: 624.5, persen: 43.8, color: '#2563EB' },
      { name: 'Bank BRI', shortName: 'BRI', saldo: 418.2, size: 418.2, persen: 29.3, color: '#0284C7' },
      { name: 'Bank BNI', shortName: 'BNI', saldo: 352.1, size: 352.1, persen: 24.7, color: '#0D9488' },
      { name: 'BRK Syariah', shortName: 'BRKS', saldo: 215.4, size: 215.4, persen: 15.1, color: '#10B981' },
      { name: 'BTN & Lainnya', shortName: 'BTN & Lain', saldo: 242.6, size: 242.6, persen: 17.0, color: '#7C3AED' },
    ],
  },
];

// Custom Tile Content for Bank Liquidity Treemap
const CustomTreemapKasContent = (props: any) => {
  const { x, y, width, height, name, shortName, saldo, color, persen } = props;
  if (!width || !height || width < 15 || height < 15) return null;

  return (
    <g>
      <rect
        x={x + 1.5}
        y={y + 1.5}
        width={width - 3}
        height={height - 3}
        rx={6}
        ry={6}
        fill={color || '#0284C7'}
        stroke="#ffffff"
        strokeWidth={1.5}
        className="transition-all hover:opacity-95 cursor-pointer"
      />
      {width > 42 && height > 28 && (
        <foreignObject x={x + 3.5} y={y + 3.5} width={width - 7} height={height - 7}>
          <div className="text-white h-full flex flex-col justify-between overflow-hidden select-none pointer-events-none leading-tight p-0.5">
            <div className="truncate">
              <span className="font-bold text-[10px] sm:text-[11px] truncate drop-shadow-xs block text-white">
                {width > 70 ? name : shortName || name}
              </span>
            </div>
            <div className="truncate">
              <span className="font-mono font-bold text-[10px] sm:text-[11px] block text-white/95 leading-none">
                Rp {saldo} M
              </span>
              <span className="text-[8px] font-semibold bg-black/25 px-1 py-0.2 rounded text-white/90 inline-block mt-0.5 font-mono">
                {persen}%
              </span>
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

const DATA_SUMBER_DANA = [
  { sumber: 'Pelabuhan', target: 350, realisasi: 295.4 },
  { sumber: 'Lahan (UWT)', target: 280, realisasi: 218.7 },
  { sumber: 'Bandara', target: 180, realisasi: 139.4 },
  { sumber: 'RSBP', target: 140, realisasi: 108.3 },
  { sumber: 'SPAM', target: 60, realisasi: 42.8 },
  { sumber: 'Jasa Giro', target: 30, realisasi: 21.2 },
];

// REKAPITULASI PIUTANG TAK TERTAGIH BERDASARKAN LAMANYA (AGING DURATION)
const DATA_PIUTANG_TAK_TERTAGIH = [
  {
    durasi: '≤ 30 Hari',
    singkat: '≤ 30 Hari',
    totalHutangMiliar: 48.65,
    jumlahFaktur: 48,
    persentase: 29.6,
    status: 'Lancar',
    color: '#10B981',
    tindakan: 'Monitoring e-Billing & Notifikasi',
  },
  {
    durasi: '31 – 60 Hari',
    singkat: '31-60 Hari',
    totalHutangMiliar: 29.40,
    jumlahFaktur: 32,
    persentase: 17.9,
    status: 'Kurang Lancar',
    color: '#0284C7',
    tindakan: 'Surat Peringatan I (SP-1)',
  },
  {
    durasi: '61 – 90 Hari',
    singkat: '61-90 Hari',
    totalHutangMiliar: 18.75,
    jumlahFaktur: 21,
    persentase: 11.4,
    status: 'Diragukan',
    color: '#F59E0B',
    tindakan: 'Surat Peringatan II (SP-2)',
  },
  {
    durasi: '91 – 180 Hari',
    singkat: '91-180 Hari',
    totalHutangMiliar: 14.80,
    jumlahFaktur: 16,
    persentase: 9.0,
    status: 'Perhatian Khusus',
    color: '#EA580C',
    tindakan: 'Peringatan Keras (SP-3)',
  },
  {
    durasi: '181 – 365 Hari',
    singkat: '181-365 Hari',
    totalHutangMiliar: 7.82,
    jumlahFaktur: 9,
    persentase: 4.8,
    status: 'Kritis',
    color: '#E11D48',
    tindakan: 'Verifikasi & Somasi Hukum',
  },
  {
    durasi: '> 365 Hari',
    singkat: '> 1 Tahun',
    totalHutangMiliar: 44.75,
    jumlahFaktur: 8,
    persentase: 27.3,
    status: 'Macet',
    color: '#991B1B',
    tindakan: 'Penyerahan Pengurusan ke PUPN/DJKN',
  },
];

const DATA_SERAPAN_KEUANGAN = [
  { unit: 'Biro Keuangan', realisasi: 241.6, pagu: 254.8, persen: 94.8 },
  { unit: 'Biro SDM', realisasi: 82.4, pagu: 88.2, persen: 93.4 },
  { unit: 'Biro OKMR', realisasi: 34.5, pagu: 36.8, persen: 93.7 },
  { unit: 'Bagian Perbendaharaan', realisasi: 58.2, pagu: 60.5, persen: 96.2 },
  { unit: 'Satuan Audit Intern', realisasi: 18.4, pagu: 19.5, persen: 94.3 },
];

// ============================================================================
// DATA FOR BIRO SDM (KUALIFIKASI PENDIDIKAN & STATUS KEPEGAWAIAN/GENDER)
// ============================================================================
const DATA_PENDIDIKAN_DONUT = [
  { name: 'S3 (Doktor)', total: 24, persen: 0.81, color: '#4338CA' },
  { name: 'S2 (Magister)', total: 312, persen: 10.48, color: '#2563EB' },
  { name: 'S1 / D4 (Sarjana)', total: 1584, persen: 53.19, color: '#0284C7' },
  { name: 'D3 (Diploma)', total: 428, persen: 14.37, color: '#10B981' },
  { name: 'SMA / SMK', total: 562, persen: 18.87, color: '#F59E0B' },
  { name: 'SMP / SD', total: 68, persen: 2.28, color: '#94A3B8' },
];

const DATA_STATUS_PEGAWAI = [
  { kategori: 'PNS', pria: 624, wanita: 418, total: 1042, persen: 35.0, color: '#2563EB' },
  { kategori: 'P2K (Tetap BP)', pria: 526, wanita: 346, total: 872, persen: 29.3, color: '#0D9488' },
  { kategori: 'PPPK (P3K)', pria: 298, wanita: 187, total: 485, persen: 16.3, color: '#7C3AED' },
  { kategori: 'PTT (Kontrak)', pria: 242, wanita: 154, total: 396, persen: 13.3, color: '#EA580C' },
  { kategori: 'Profesional', pria: 106, wanita: 77, total: 183, persen: 6.1, color: '#D97706' },
];

// ============================================================================
// DATA FOR BIRO OKMR (SAKIP, MANAJEMEN RISIKO, PEKPPP, SKM, PENGADUAN, SPIP)
// ============================================================================

// 1. DATASET NO. 2: NILAI SAKIP (KOMPONEN, BOBOT, NILAI, TINGKAT AKUNTABILITAS)
const DATA_SAKIP_KOMPONEN = [
  {
    komponen: 'Perencanaan Kinerja',
    short: 'Perencanaan',
    bobot: 30.0,
    nilai: 25.10,
    persen: 83.67,
    tingkat: 'A',
    color: '#2563EB',
    detail: 'Renstra 5 Tahunan, RKT & Perjanjian Kinerja berjenjang (Cascading SMART)',
  },
  {
    komponen: 'Pengukuran Kinerja',
    short: 'Pengukuran',
    bobot: 30.0,
    nilai: 24.60,
    persen: 82.00,
    tingkat: 'A',
    color: '#0284C7',
    detail: 'Pemenuhan 47 IKU, digital e-Kinerja, validitas berkala data capaian triwulanan',
  },
  {
    komponen: 'Pelaporan Kinerja',
    short: 'Pelaporan',
    bobot: 15.0,
    nilai: 12.75,
    persen: 85.00,
    tingkat: 'A',
    color: '#10B981',
    detail: 'Dokumen LKjIP/LAKIP, analisis efisiensi sumber daya dan keberhasilan output',
  },
  {
    komponen: 'Evaluasi Akuntabilitas',
    short: 'Evaluasi',
    bobot: 25.0,
    nilai: 20.23,
    persen: 80.92,
    tingkat: 'A',
    color: '#7C3AED',
    detail: 'Evaluasi internal akuntabilitas oleh SPI/OKMR, tindak lanjut evaluasi KemenPAN-RB',
  },
];

// 2. DATASET NO. 18: INDEKS MANAJEMEN RISIKO (MRI) - TREN PERIODE PENILAIAN & SKOR
const DATA_MANAJEMEN_RISIKO_PERIODE = [
  { periode: '2022', label: 'Tahun 2022', skor: 2.90, target: 3.25, level: 'Level 2 (Berkembang)', color: '#94A3B8' },
  { periode: '2023', label: 'Tahun 2023', skor: 3.15, target: 3.25, level: 'Level 3 (Terdefinisi)', color: '#64748B' },
  { periode: '2024', label: 'Tahun 2024', skor: 3.38, target: 3.25, level: 'Level 3 (Terkelola)', color: '#0284C7' },
  { periode: '2025', label: 'Tahun 2025', skor: 3.52, target: 3.25, level: 'Level 3 (Terkelola)', color: '#2563EB' },
  { periode: '2025/2026', label: 'Tahun 2025/2026', skor: 3.65, target: 3.25, level: 'Level 3 (Managed)', color: '#10B981' },
];

const DATA_PIAGAM_RISIKO_UNIT = [
  { unit: 'Badan Usaha Pelabuhan (BUP)', risikoAwal: 20, risikoAkhir: 8, status: 'Efektif (Rendah)', mitigasi: 'SOP Maintenance STS & B-TOS' },
  { unit: 'Bandara Hang Nadim (BUBU)', risikoAwal: 16, risikoAkhir: 6, status: 'Efektif (Rendah)', mitigasi: 'FOD Sweeper & Box Culvert Drainase' },
  { unit: 'RSBP Batam (BURSBP)', risikoAwal: 15, risikoAkhir: 9, status: 'Terkendali (Sedang)', mitigasi: 'Buffer Stock Obat 3 Bln & e-Katalog' },
  { unit: 'Pusat PTSP Batam', risikoAwal: 18, risikoAkhir: 7, status: 'Efektif (Rendah)', mitigasi: 'Redundant Leased Line 1 Gbps' },
  { unit: 'BU Fasling (SPAM Batam)', risikoAwal: 22, risikoAkhir: 10, status: 'Terkendali (Sedang)', mitigasi: 'PRV Valve & Revitalisasi WTP' },
];

// 3. DATASET NO. 15 & 16: EVALUASI KINERJA PENYELENGGARAAN PELAYANAN PUBLIK (PEKPPP)
const DATA_PEKPPP = [
  { unit: 'PTSP BP Batam (MPP)', short: 'PTSP', indeks: 4.62, kategori: 'A (Pelayanan Prima)', color: '#059669' },
  { unit: 'RSBP Batam (Poli/IGD)', short: 'RSBP', indeks: 4.45, kategori: 'A- (Sangat Baik)', color: '#0284C7' },
  { unit: 'Bandara Hang Nadim', short: 'Bandara', indeks: 4.35, kategori: 'A- (Sangat Baik)', color: '#2563EB' },
  { unit: 'Pelabuhan Batam', short: 'Pelabuhan', indeks: 4.28, kategori: 'A- (Sangat Baik)', color: '#4F46E5' },
];

// 4. DATASET NO. 11: REKAPITULASI SURVEI KEPUASAN MASYARAKAT (SKM) BERDASARKAN UNIT USAHA, NILAI, PERSENTASE
const DATA_SKM_UNIT_USAHA = [
  { unitUsaha: 'Dit. Pelayanan Terpadu Satu Pintu (PTSP)', short: 'PTSP MPP', nilai: 3.68, persentase: 92.00, color: '#059669', mutu: 'Mutu A' },
  { unitUsaha: 'Dit. Pelayanan Lalu Lintas Barang & Penanaman Modal', short: 'Lalu Lintas Barang', nilai: 3.57, persentase: 89.25, color: '#0284C7', mutu: 'Mutu A' },
  { unitUsaha: 'Badan Usaha Pelabuhan Batam (BUP)', short: 'BU Pelabuhan', nilai: 3.55, persentase: 88.75, color: '#2563EB', mutu: 'Mutu A' },
  { unitUsaha: 'Badan Usaha Rumah Sakit BP Batam (RSBP)', short: 'BU RSBP', nilai: 3.54, persentase: 88.50, color: '#7C3AED', mutu: 'Mutu A' },
  { unitUsaha: 'Badan Usaha Bandar Udara Hang Nadim', short: 'BU Bandara', nilai: 3.53, persentase: 88.25, color: '#0D9488', mutu: 'Mutu A' },
  { unitUsaha: 'Badan Usaha Fasilitas & Lingkungan (SPAM)', short: 'BU SPAM', nilai: 3.51, persentase: 87.75, color: '#D97706', mutu: 'Mutu A' },
];

// 5. DATASET NO. 10: MONITORING PENGELOLAAN PENGADUAN LAYANAN BADAN USAHA
const DATA_PENGADUAN = [
  { unit: 'RSBP Batam', diterima: 142, selesai: 138, diproses: 4, persen: 97.2, sla: '1.2 Hari' },
  { unit: 'Pelabuhan Batam', diterima: 126, selesai: 121, diproses: 5, persen: 96.0, sla: '1.5 Hari' },
  { unit: 'Bandara Hang Nadim', diterima: 98, selesai: 94, diproses: 4, persen: 95.9, sla: '1.8 Hari' },
  { unit: 'BU SPAM Batam', diterima: 92, selesai: 87, diproses: 5, persen: 94.6, sla: '1.6 Hari' },
];

// 6. DATASET NO. 17: MATURITAS 5 UNSUR SISTEM PENGENDALIAN INTERN PEMERINTAH (SPIP)
const DATA_SPIP_DONUT = [
  { name: 'Lingkungan Pengendalian', short: 'Lingkungan', nilai: 3.48, persen: 30, color: '#2563EB' },
  { name: 'Penilaian Risiko', short: 'Risiko', nilai: 3.35, persen: 20, color: '#0284C7' },
  { name: 'Kegiatan Pengendalian', short: 'Pengendalian', nilai: 3.44, persen: 25, color: '#10B981' },
  { name: 'Informasi & Komunikasi', short: 'Infokom', nilai: 3.38, persen: 10, color: '#F59E0B' },
  { name: 'Pemantauan Pengendalian Intern', short: 'Pemantauan', nilai: 3.46, persen: 15, color: '#8B5CF6' },
];

export const AdministrasiKeuanganDeepDiveCenter: React.FC<
  AdministrasiKeuanganDeepDiveCenterProps
> = ({ selectedUnitId, onSelectUnit, onOpenFormulaModal: _onOpenFormulaModal }) => {
  // State for Piutang View Mode in Biro Keuangan
  const [piutangViewMode, setPiutangViewMode] = useState<'chart' | 'table'>('chart');
  // State for Manajemen Risiko View Mode in Biro OKMR
  const [mriViewMode, setMriViewMode] = useState<'periode' | 'piagam'>('periode');

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans">
      {/* 1. Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Administrasi, Keuangan &amp; Tata Kelola
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 3 pilar biro pengampu Perkin DEP-A1 (Biro Keuangan, Biro SDM, Biro OKMR)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            onClick={() => onSelectUnit('biro-keuangan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'biro-keuangan'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Biro Keuangan</span>
          </button>

          <button
            onClick={() => onSelectUnit('biro-sdm')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'biro-sdm'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Biro SDM</span>
          </button>

          <button
            onClick={() => onSelectUnit('biro-organisasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedUnitId === 'biro-organisasi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Biro OKMR</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TAB KONTEN: BIRO KEUANGAN (5 KARTU)                               */}
      {/* ==================================================================== */}
      {selectedUnitId === 'biro-keuangan' && (
        <div className="space-y-3.5">
          {/* GRID 1: DUA KARTU UTAMA (ROW 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: Surplus/Defisit per Unit Kerja - SOFT BLUE TINT */}
            <div className="lg:col-span-7 bg-gradient-to-br from-blue-50/70 via-sky-50/30 to-white rounded-xl border border-blue-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Surplus / Defisit per Unit Kerja
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">+Rp 280,3 M</span>
                    <span className="text-[10px] text-blue-600 font-medium ml-1.5">(Net Konsolidasi)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-blue-600" /> Pendapatan
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-xs bg-slate-400" /> Belanja
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-xs bg-emerald-500" /> Surplus
                  </span>
                </div>

                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_SURPLUS_DEFISIT} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="unit" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`Rp ${val} M`, name]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="pendapatan" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={8} />
                      <Bar dataKey="belanja" fill="#94A3B8" radius={[2, 2, 0, 0]} barSize={8} />
                      <Bar dataKey="surplus" fill="#10B981" radius={[2, 2, 0, 0]} barSize={8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* CARD 2: LIKUIDITAS KAS & BANK BLU (TREEMAP 5 BANK REKENING OPERASIONAL) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-cyan-50/70 via-sky-50/40 to-white rounded-xl border border-cyan-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Likuiditas Kas &amp; Bank BLU
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">Rp 1,42 T</span>
                    <span className="text-[10px] text-cyan-700 font-medium ml-1.5">(242,8% Likuid)</span>
                  </div>
                </div>

                <div className="h-36 w-full my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={DATA_KAS_BANK_TREEMAP}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="#fff"
                      content={<CustomTreemapKasContent />}
                    >
                      <Tooltip
                        content={({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-2 rounded shadow-lg text-[10.5px]">
                                <div className="font-bold text-sky-300">{data.name}</div>
                                <div className="text-white">Saldo: Rp {data.saldo} Miliar</div>
                                <div className="text-emerald-300">Pangsa: {data.persen}%</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </Treemap>
                  </ResponsiveContainer>
                </div>

                <div className="pt-1.5 mt-0.5 border-t border-cyan-100/80 flex items-center justify-between text-[9px] text-slate-500">
                  <span>Mandiri &bull; BRI &bull; BNI &bull; BRKS &bull; BTN</span>
                  <span className="font-semibold text-cyan-700">5 Bank BLU Resmi</span>
                </div>
              </div>
            </div>
          </div>

          {/* GRID 2: TIGA KARTU MENENGAH (ROW 2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* CARD 3: Komparasi Target vs Realisasi Sumber Dana PNBP - SOFT BLUE TINT */}
            <div className="bg-gradient-to-br from-blue-50/70 via-slate-50/40 to-white rounded-xl border border-blue-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    Sumber Dana PNBP
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black text-slate-900 leading-none">83,4%</span>
                    <span className="text-[10px] text-blue-600 font-medium ml-1">(Rerata)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[9.5px] text-slate-500 mb-1">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-slate-300" /> Target
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-blue-600">
                    <span className="w-1.5 h-1.5 rounded-xs bg-blue-600" /> Realisasi
                  </span>
                </div>

                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_SUMBER_DANA} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="sumber" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`Rp ${val} M`, name]}
                        contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="target" fill="#CBD5E1" radius={[2, 2, 0, 0]} barSize={8} />
                      <Bar dataKey="realisasi" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* CARD 4: REKAPITULASI PIUTANG TAK TERTAGIH (AGING DURATION) - SOFT ROSE TINT */}
            <div className="bg-gradient-to-br from-rose-50/70 via-orange-50/30 to-white rounded-xl border border-rose-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                      Rekapitulasi Piutang Tak Tertagih
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black text-rose-900 leading-none">
                      Rp 164,17 M
                    </span>
                    <span className="text-[10px] text-rose-600 font-medium ml-1">
                      (134 Faktur)
                    </span>
                  </div>
                </div>

                {/* Sub-header controls: View Switcher */}
                <div className="flex items-center justify-between mt-1 mb-1.5">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Lancar: 48 Faktur</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 ml-1" />
                    <span>Macet: 8 Faktur</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 rounded-md border border-slate-200/70">
                    <button
                      onClick={() => setPiutangViewMode('chart')}
                      className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        piutangViewMode === 'chart'
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Tampilan Grafik Batang Aging"
                    >
                      <BarChart3 className="w-2.5 h-2.5" />
                      <span>Grafik</span>
                    </button>
                    <button
                      onClick={() => setPiutangViewMode('table')}
                      className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        piutangViewMode === 'table'
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Tampilan Rincian Durasi Piutang"
                    >
                      <List className="w-2.5 h-2.5" />
                      <span>Durasi</span>
                    </button>
                  </div>
                </div>

                {/* Visual View */}
                {piutangViewMode === 'chart' ? (
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DATA_PIUTANG_TAK_TERTAGIH} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="singkat" tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(val: any, _name: any, item: any) => [
                            `Rp ${val} Miliar (${item.payload.jumlahFaktur} Faktur • ${item.payload.persentase}%)`,
                            `Status: ${item.payload.status}`,
                          ]}
                          contentStyle={{ fontSize: '10px', borderRadius: '8px' }}
                        />
                        <Bar dataKey="totalHutangMiliar" radius={[2, 2, 0, 0]} barSize={12}>
                          {DATA_PIUTANG_TAK_TERTAGIH.map((entry, idx) => (
                            <Cell key={`bar-piutang-${idx}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-32 overflow-y-auto space-y-1 pr-1 text-[9.5px]">
                    {DATA_PIUTANG_TAK_TERTAGIH.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1 bg-white/80 rounded border border-slate-100 hover:bg-rose-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-semibold text-slate-800">{item.durasi}</span>
                          <span className="text-[8.5px] text-slate-400">({item.jumlahFaktur} faktur)</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono font-bold text-slate-900">
                            Rp {item.totalHutangMiliar.toFixed(2)} M
                          </span>
                          <span
                            className="px-1 py-0.2 rounded text-[8px] font-bold"
                            style={{
                              backgroundColor: `${item.color}15`,
                              color: item.color,
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-1.5 mt-1 border-t border-rose-200/50 flex items-center justify-between text-[9px] text-slate-600">
                <span className="text-rose-700 font-semibold truncate">
                  Macet &gt;1 Thn: Rp 44,75 M (Penyerahan PUPN)
                </span>
                <span className="text-slate-500 font-mono shrink-0">
                  Total 134 Faktur
                </span>
              </div>
            </div>

            {/* CARD 5: Serapan Belanja Satker Perkin A1 - SOFT EMERALD TINT */}
            <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white rounded-xl border border-emerald-200/70 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    Serapan Belanja Satker
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black text-slate-900 leading-none">94,4%</span>
                    <span className="text-[10px] text-emerald-600 font-medium ml-1">(Rerata A1)</span>
                  </div>
                </div>

                <div className="space-y-1.5 mt-1">
                  {DATA_SERAPAN_KEUANGAN.map((s, idx) => (
                    <div key={idx} className="group hover:bg-slate-50/80 px-1 py-0.5 rounded transition-colors">
                      <div className="flex items-center justify-between text-[10px] mb-0.5">
                        <span className="font-semibold text-slate-700 truncate max-w-[130px]">
                          {s.unit}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[9px] text-slate-500 font-mono">
                            Rp {s.realisasi} M
                          </span>
                          <span className="font-bold text-emerald-700 text-[9px]">
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
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN: BIRO SDM (KUALIFIKASI PENDIDIKAN & STATUS KEPEGAWAIAN) */}
      {/* Sesuai instruksi: Tren Skor Sistem Merit, Distribusi Jabatan, dan      */}
      {/* Pemenuhan 20 JP Pelatihan telah DIHAPUS. Tampilan lebih rapi 2 kolom. */}
      {/* ==================================================================== */}
      {selectedUnitId === 'biro-sdm' && (
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
            {/* CARD 1: Kualifikasi Pendidikan SDM - WHITE CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Kualifikasi Pendidikan Pegawai
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Sebaran 2.978 Pegawai BP Batam berdasarkan Jenjang Ijazah
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none">64,5%</span>
                    <span className="text-[10px] text-blue-600 font-medium block">Sarjana &amp; Pascasarjana</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center my-2">
                  <div className="sm:col-span-5 relative h-36 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={DATA_PENDIDIKAN_DONUT}
                          innerRadius={42}
                          outerRadius={62}
                          paddingAngle={2.5}
                          dataKey="total"
                        >
                          {DATA_PENDIDIKAN_DONUT.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(val: any, name: any) => [`${val} Pegawai`, name]}
                          contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-base font-black text-slate-900 leading-none">2.978</span>
                      <span className="text-[9px] text-slate-500 font-medium">Pegawai</span>
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-1.5">
                    {DATA_PENDIDIKAN_DONUT.map((b, idx) => (
                      <div key={idx} className="group hover:bg-blue-50/60 p-1 rounded transition-colors">
                        <div className="flex items-center justify-between text-[10.5px] mb-0.5">
                          <span className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                            {b.name}
                          </span>
                          <div className="flex items-center gap-2 shrink-0 font-mono">
                            <span className="text-slate-500 text-[10px]">{b.total} Org</span>
                            <span className="font-bold text-slate-900 text-[10px]">{b.persen.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${b.persen}%`, backgroundColor: b.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-blue-100 flex items-center justify-between text-[10px] text-slate-600">
                <span className="font-medium text-blue-800">
                  S1/D4: 1.584 Org (53,2%) &bull; S2/S3: 336 Org (11,3%)
                </span>
                <span className="text-slate-500">Dataset #9 Buku Satu Data</span>
              </div>
            </div>

            {/* CARD 2: Status Kepegawaian & Gender - WHITE CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Status Kepegawaian &amp; Rasio Gender
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Komposisi Formasi ASN, Pegawai Tetap, PPPK &amp; Tenaga Kontrak
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none">60,3% : 39,7%</span>
                    <span className="text-[10px] text-emerald-700 font-medium block">Pria : Wanita (1.796 : 1.182)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                    <span className="font-medium text-slate-700">Laki-laki (1.796 Org)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
                    <span className="font-semibold text-rose-600">Perempuan (1.182 Org)</span>
                  </span>
                </div>

                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_STATUS_PEGAWAI} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="kategori" tick={{ fontSize: 9.5, fill: '#334155' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`${val} Pegawai`, name === 'pria' ? 'Laki-laki' : 'Perempuan']}
                        contentStyle={{ fontSize: '10.5px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="pria" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={12} />
                      <Bar dataKey="wanita" fill="#F43F5E" radius={[2, 2, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-emerald-100 flex items-center justify-between text-[10px] text-slate-600">
                <span className="font-medium text-emerald-800">
                  PNS: 1.042 (35,0%) &bull; P2K Tetap: 872 (29,3%) &bull; PPPK: 485 (16,3%)
                </span>
                <span className="text-slate-500">Dataset #7 &amp; #8 Buku Satu Data</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. TAB KONTEN: BIRO OKMR                                             */}
      {/* Memuat: SAKIP (Req 5), Manajemen Risiko MRI Periode & Skor (Req 7),   */}
      {/* PEKPPP, SKM Unit Usaha & Nilai & Persentase (Req 6), Pengaduan, SPIP */}
      {/* ==================================================================== */}
      {selectedUnitId === 'biro-organisasi' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA PILAR STRATEGIS (SAKIP 82.68 A & MANAJEMEN RISIKO MRI 3.65) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: NILAI SISTEM AKUNTABILITAS KINERJA INSTANSI PEMERINTAH (SAKIP) - WHITE CARD */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-indigo-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                        Nilai SAKIP BP Batam
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Evaluasi Akuntabilitas Kinerja 4 Komponen Standar KemenPAN-RB
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-indigo-950 leading-none">82,68</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Predikat A (Memuaskan)</span>
                  </div>
                </div>

                {/* SAKIP 4 Components Progress */}
                <div className="space-y-2 mt-2">
                  {DATA_SAKIP_KOMPONEN.map((k, idx) => (
                    <div key={idx} className="group hover:bg-indigo-50/50 p-1 rounded transition-colors">
                      <div className="flex items-center justify-between text-[10px] mb-0.5">
                        <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                          {k.komponen}
                        </span>
                        <div className="flex items-center gap-2 shrink-0 font-mono text-[9.5px]">
                          <span className="text-slate-500">
                            {k.nilai.toFixed(2)} / {k.bobot.toFixed(0)} Poin
                          </span>
                          <span className="font-bold text-indigo-700 bg-white border border-indigo-200 px-1 py-0.2 rounded">
                            {k.persen.toFixed(1)}% (Predikat {k.tingkat})
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${k.persen}%`, backgroundColor: k.color }}
                        />
                      </div>
                      <p className="text-[8.5px] text-slate-400 mt-0.5 truncate">{k.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-indigo-100 flex items-center justify-between text-[9.5px] text-slate-600">
                <span className="text-indigo-800 font-semibold">
                  Akumulasi Bobot 100% &bull; Sangat Akuntabel
                </span>
                <span className="text-slate-500">Dataset #2 Buku Satu Data</span>
              </div>
            </div>

            {/* CARD 2: INDEKS MANAJEMEN RISIKO (MRI) - WHITE CARD */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                        Indeks Manajemen Risiko (MRI)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Tren Skor Periode Penilaian &amp; Efektivitas Mitigasi BPKP
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-emerald-950 leading-none">3,65 / 5,00</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">Tingkat 3 (Managed / Terkelola)</span>
                  </div>
                </div>

                {/* Sub-header controls: Periode vs Piagam Unit */}
                <div className="flex items-center justify-between mt-1 mb-2">
                  <div className="flex items-center gap-2 text-[9.5px] text-slate-600">
                    <span className="font-semibold text-emerald-700">Target BPKP: 3,25</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="font-semibold text-slate-700">Mitigasi: 94,2% Efektif</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 rounded-md border border-slate-200/70">
                    <button
                      onClick={() => setMriViewMode('periode')}
                      className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        mriViewMode === 'periode'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>Periode Skor</span>
                    </button>
                    <button
                      onClick={() => setMriViewMode('piagam')}
                      className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        mriViewMode === 'piagam'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileCheck className="w-2.5 h-2.5" />
                      <span>Piagam Unit</span>
                    </button>
                  </div>
                </div>

                {/* View Mode: Periode Skor Chart */}
                {mriViewMode === 'periode' ? (
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DATA_MANAJEMEN_RISIKO_PERIODE} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="periode" tick={{ fontSize: 8.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[2.5, 4.0]} tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(val: any, _name: any, item: any) => [
                            `Skor ${val} (${item.payload.level})`,
                            `Periode Penilaian: ${item.payload.label}`,
                          ]}
                          contentStyle={{ fontSize: '10px', borderRadius: '8px' }}
                        />
                        <ReferenceLine y={3.25} stroke="#059669" strokeDasharray="3 3" label={{ value: 'Target 3.25', fontSize: 8, fill: '#059669' }} />
                        <Bar dataKey="skor" radius={[2, 2, 0, 0]} barSize={16}>
                          {DATA_MANAJEMEN_RISIKO_PERIODE.map((entry, idx) => (
                            <Cell key={`bar-mri-${idx}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  /* View Mode: Piagam Risiko Unit Kerja */
                  <div className="h-36 overflow-y-auto space-y-1 pr-1 text-[9.5px]">
                    {DATA_PIAGAM_RISIKO_UNIT.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 bg-white/80 rounded border border-slate-100 hover:bg-emerald-50/50 transition-colors"
                      >
                        <div className="truncate pr-2">
                          <span className="font-semibold text-slate-800 block truncate">{item.unit}</span>
                          <span className="text-[8.5px] text-slate-400 block truncate">{item.mitigasi}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-[9px] text-slate-600 block">
                            Risiko {item.risikoAwal} &rarr; {item.risikoAkhir}
                          </span>
                          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-emerald-100 flex items-center justify-between text-[9.5px] text-slate-600">
                <span className="text-emerald-800 font-semibold">
                  Tahun 2025/2026: 3,65 (Naik dari 2,90 pada 2022)
                </span>
                <span className="text-slate-500">Dataset #18 Buku Satu Data</span>
              </div>
            </div>
          </div>

          {/* ROW 2: TIGA KARTU PELAYANAN & SATISFACTION (PEKPPP, SKM UNIT USAHA, PENGADUAN) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* CARD 3: EVALUASI KINERJA PELAYANAN PUBLIK (PEKPPP) - WHITE CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Evaluasi Pelayanan Publik (PEKPPP)
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-emerald-900 leading-none">4,38 / 5,00</span>
                    <span className="text-[10px] text-emerald-700 font-medium ml-1.5">(Kategori A-)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                  <span>Evaluasi Standar KemenPAN-RB</span>
                  <span className="text-emerald-700 font-bold">Ambang Prima: 4.50</span>
                </div>

                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_PEKPPP} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="short" tick={{ fontSize: 8, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[3.5, 5.0]} tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [
                          `Indeks ${val} • ${item.payload.kategori}`,
                          item.payload.unit,
                        ]}
                        contentStyle={{ fontSize: '10px', borderRadius: '8px' }}
                      />
                      <ReferenceLine y={4.5} stroke="#059669" strokeDasharray="3 3" label={{ value: 'Prima', fontSize: 8, fill: '#059669' }} />
                      <Bar dataKey="indeks" radius={[2, 2, 0, 0]} barSize={14}>
                        {DATA_PEKPPP.map((entry, idx) => (
                          <Cell key={`bar-pekppp-${idx}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-1.5 border-t border-emerald-200/50 flex items-center justify-between text-[9px] text-emerald-800">
                <span>PTSP Batam: 4.62 (Pelayanan Prima A)</span>
                <span className="font-semibold">Dataset #15 &amp; #16</span>
              </div>
            </div>

            {/* CARD 4: REKAPITULASI HASIL SURVEI KEPUASAN (SKM) - WHITE CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Hasil Survei Kepuasan (SKM)
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-amber-900 leading-none">88,62%</span>
                    <span className="text-[10px] text-amber-700 font-medium ml-1.5">(Mutu Layanan A)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>Unit Usaha BP Batam</span>
                  <span className="font-mono text-[9px] text-slate-600">Rerata Skor 3,55 / 4.00</span>
                </div>

                {/* List of Unit Usaha with Nilai & Persentase as requested */}
                <div className="space-y-1.5 mt-1">
                  {DATA_SKM_UNIT_USAHA.map((item, idx) => (
                    <div key={idx} className="group hover:bg-slate-50/80 px-1 py-0.5 rounded transition-colors">
                      <div className="flex items-center justify-between text-[9.5px] mb-0.5">
                        <span className="font-semibold text-slate-700 truncate max-w-[150px]" title={item.unitUsaha}>
                          {item.short}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[9px]">
                          <span className="text-slate-600 font-semibold">{item.nilai.toFixed(2)}</span>
                          <span className="font-bold text-amber-800 bg-white border border-amber-200 px-1 py-0.2 rounded">
                            {item.persentase.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.persentase}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1.5 mt-1 border-t border-amber-200/50 flex items-center justify-between text-[9px] text-amber-800">
                <span>Tertinggi: Dit. PTSP (3,68 / 92,0%)</span>
                <span className="font-semibold">Dataset #10 &amp; #11</span>
              </div>
            </div>

            {/* CARD 5: MONITORING PENGELOLAAN PENGADUAN LAYANAN - WHITE CARD */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    Pengaduan Layanan Badan Usaha
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black text-violet-900 leading-none">96,1%</span>
                    <span className="text-[10px] text-violet-700 font-medium ml-1">(440/458 Tuntas)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[9.5px] text-slate-500 mb-1">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-slate-300" /> Diterima
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-violet-600">
                    <span className="w-1.5 h-1.5 rounded-xs bg-violet-600" /> Selesai
                  </span>
                  <span className="ml-auto text-[9px] text-slate-500">
                    Rerata SLA: 1.5 Hari
                  </span>
                </div>

                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_PENGADUAN} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="unit" tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 7.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          `${val} Aduan (${item.payload.persen}% Selesai • SLA ${item.payload.sla})`,
                          name === 'diterima' ? 'Pengaduan Masuk' : 'Telah Tuntas',
                        ]}
                        contentStyle={{ fontSize: '10px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="diterima" fill="#CBD5E1" radius={[2, 2, 0, 0]} barSize={8} />
                      <Bar dataKey="selesai" fill="#7C3AED" radius={[2, 2, 0, 0]} barSize={8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-1.5 mt-1 border-t border-violet-200/50 flex items-center justify-between text-[9px] text-violet-800">
                <span>Kanal: SP4N-LAPOR! &bull; Hotline BU</span>
                <span className="font-semibold text-violet-700">18 Aduan Diproses</span>
              </div>
            </div>
          </div>

          {/* ROW 3: MATURITAS 5 UNSUR SPIP & PENGENDALIAN INTERN - WHITE CARD */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-cyan-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Maturitas 5 Unsur Sistem Pengendalian Intern Pemerintah (SPIP)
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Pemantauan Berkala Tingkat Kematangan Pengendalian Intern Seluruh Satker BP Batam
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-none">3,42 / 5,00</span>
                <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(Level 3 Terdefinisi)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
              {DATA_SPIP_DONUT.map((s, idx) => (
                <div key={idx} className="bg-white/80 p-2 rounded-lg border border-cyan-100/80 shadow-2xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-600 mb-1">
                    <span className="font-semibold truncate">{s.short}</span>
                    <span className="text-slate-400 font-mono">{s.persen}%</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-black text-slate-900 font-mono">{s.nilai.toFixed(2)}</span>
                    <span className="text-[8.5px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                      Matur
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(s.nilai / 4.0) * 100}%`, backgroundColor: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
