import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Table as TableIcon,
  Layers,
  Info,
  Award,
  Sparkles,
  Download,
  AlertCircle,
  Radar as RadarIcon,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

export interface SpipUnsurItem {
  id: string;
  no: number;
  nama: string;
  singkatan: string;
  bobot: number; // in percent
  target: number;
  nilai: number; // 1.00 - 5.00
  nilaiTerbobot: number;
  capaianPersen: number;
  level: string;
  statusColor: string;
  fokusArea: string;
  subUnsur: { nama: string; bobot: number; nilai: number }[];
  tindakLanjut: string;
}

export const SPIP_5_UNSUR_ITEMS: SpipUnsurItem[] = [
  {
    id: 'spip-1-lingkungan',
    no: 1,
    nama: 'Lingkungan Pengendalian',
    singkatan: 'Lingkungan Pengendalian',
    bobot: 30.0,
    target: 3.20,
    nilai: 3.48,
    nilaiTerbobot: 1.04,
    capaianPersen: 108.8,
    level: 'Level 3 (Terdefinisi)',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    fokusArea: 'Penegakan integritas, kode etik pegawai, komitmen kompetensi sumber daya manusia, kepemimpinan kondusif, dan struktur organisasi akuntabel.',
    subUnsur: [
      { nama: 'Penegakan Integritas & Nilai Etika ASN/Pegawai', bobot: 10.0, nilai: 3.52 },
      { nama: 'Komitmen terhadap Kompetensi Pegawai BP Batam', bobot: 10.0, nilai: 3.46 },
      { nama: 'Struktur Organisasi & Pendelegasian Wewenang Sehat', bobot: 10.0, nilai: 3.45 },
    ],
    tindakLanjut: 'Tingkatkan internalisasi core values BerAKHLAK dan pengawasan disiplin kerja secara berkala.',
  },
  {
    id: 'spip-2-penilaian-risiko',
    no: 2,
    nama: 'Penilaian Risiko',
    singkatan: 'Penilaian Risiko',
    bobot: 20.0,
    target: 3.20,
    nilai: 3.35,
    nilaiTerbobot: 0.67,
    capaianPersen: 104.7,
    level: 'Level 3 (Terdefinisi)',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    fokusArea: 'Identifikasi risiko strategis & operasional unit kerja, piagam register risiko 24 satker, serta mitigasi risiko fraud dan korupsi.',
    subUnsur: [
      { nama: 'Identifikasi Risiko Strategis Organisasi', bobot: 10.0, nilai: 3.38 },
      { nama: 'Analisis Risiko Fraud/Korupsi & Mitigasi Pengendalian', bobot: 10.0, nilai: 3.32 },
    ],
    tindakLanjut: 'Lakukan reviu pemutakhiran profil risiko triwulanan bersama Satuan Pengawas Intern (SPI).',
  },
  {
    id: 'spip-3-kegiatan-pengendalian',
    no: 3,
    nama: 'Kegiatan Pengendalian',
    singkatan: 'Kegiatan Pengendalian',
    bobot: 25.0,
    target: 3.20,
    nilai: 3.44,
    nilaiTerbobot: 0.86,
    capaianPersen: 107.5,
    level: 'Level 3 (Terdefinisi)',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    fokusArea: 'Reviu kinerja pimpinan, pengendalian sistem informasi & otorisasi transaksi, pemisahan fungsi tugas, dan pengamanan aset fisik BMN.',
    subUnsur: [
      { nama: 'Reviu Kinerja Manajemen & Supervisi Atasan', bobot: 10.0, nilai: 3.46 },
      { nama: 'Pengendalian Umum & Aplikasi Sistem Informasi (IT)', bobot: 8.0, nilai: 3.42 },
      { nama: 'Pemisahan Fungsi Tugas & SOP Otorisasi Keuangan', bobot: 7.0, nilai: 3.43 },
    ],
    tindakLanjut: 'Perkuat kontrol akses log sistem perizinan investasi IBISSS dan pengamanan perimeter data center.',
  },
  {
    id: 'spip-4-informasi-komunikasi',
    no: 4,
    nama: 'Informasi dan Komunikasi',
    singkatan: 'Informasi & Komunikasi',
    bobot: 10.0,
    target: 3.20,
    nilai: 3.38,
    nilaiTerbobot: 0.34,
    capaianPersen: 105.6,
    level: 'Level 3 (Terdefinisi)',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    fokusArea: 'Ketersediaan saluran whistleblowing system (WBS), keterbukaan informasi publik (PPID), koordinasi lintas satker, dan transparansi laporan berkala.',
    subUnsur: [
      { nama: 'Kanal Whistleblowing System (WBS) & Pengaduan', bobot: 5.0, nilai: 3.40 },
      { nama: 'Keterbukaan Informasi Publik & Integrasi Lintas Biro', bobot: 5.0, nilai: 3.36 },
    ],
    tindakLanjut: 'Integrasikan aplikasi kanal aduan pengaduan ke dalam portal Satu Data BP Batam secara real-time.',
  },
  {
    id: 'spip-5-pemantauan',
    no: 5,
    nama: 'Pemantauan Pengendalian Intern',
    singkatan: 'Pemantauan Pengendalian',
    bobot: 15.0,
    target: 3.20,
    nilai: 3.46,
    nilaiTerbobot: 0.52,
    capaianPersen: 108.1,
    level: 'Level 3 (Terdefinisi)',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    fokusArea: 'Pemantauan berkelanjutan, evaluasi terpisah oleh Satuan Pengawas Intern (SPI), dan percepatan penyelesaian rekomendasi tindak lanjut temuan BPK RI.',
    subUnsur: [
      { nama: 'Pemantauan Berkelanjutan & Audit Kepatuhan SPI', bobot: 8.0, nilai: 3.48 },
      { nama: 'Tindak Lanjut Rekomendasi Hasil Pemeriksaan BPK/BPKP', bobot: 7.0, nilai: 3.44 },
    ],
    tindakLanjut: 'Pertahankan tindak lanjut rekomendasi audit hingga mencapai 100% tuntas sebelum batas semester.',
  },
];

export const STANDAR_LEVEL_MATURITAS_SPIP = [
  {
    level: 'Level 1',
    nama: 'Belum Terkembang',
    rentang: '1,00 - 1,99',
    minNilai: 1.00,
    maxNilai: 1.99,
    deskripsi: 'Belum ada penerapan SPIP memadai. Pengendalian bersifat ad-hoc, tidak terencana, dan rentan terhadap risiko kegagalan pencapaian target.',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    level: 'Level 2',
    nama: 'Rintisan',
    rentang: '2,00 - 2,99',
    minNilai: 2.00,
    maxNilai: 2.99,
    deskripsi: 'Kebijakan dasar ada, implementasi belum konsisten/terdokumentasi. Praktik pengendalian dilakukan namun belum terstruktur secara menyeluruh.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    level: 'Level 3',
    nama: 'Berkembang',
    rentang: '3,00 - 3,49',
    minNilai: 3.00,
    maxNilai: 3.49,
    deskripsi: 'Proses pengendalian sudah berjalan & terdokumentasi cukup baik. Telah disusun piagam risiko dan evaluasi berkala oleh SPI.',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
  },
  {
    level: 'Level 4',
    nama: 'Terdefinisi',
    rentang: '3,50 - 4,49',
    minNilai: 3.50,
    maxNilai: 4.49,
    deskripsi: 'SPIP terintegrasi dalam aktivitas manajemen instansi. Pengendalian terotomatisasi secara komprehensif dengan manajemen risiko terpadu.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    level: 'Level 5',
    nama: 'Optimal',
    rentang: '4,50 - 5,00',
    minNilai: 4.50,
    maxNilai: 5.00,
    deskripsi: 'SPIP menjadi budaya organisasi, terus dievaluasi secara adaptif melalui inovasi berkelanjutan dan mitigasi prediktif.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

interface SpipMaturitasCardProps {
  onOpenFormulaModal?: (kpiIdOrDatasetIndex?: number | string) => void;
}

export const SpipMaturitasCard: React.FC<SpipMaturitasCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'radar' | 'cards' | 'table' | 'levels'>('radar');
  const [selectedUnsurId, setSelectedUnsurId] = useState<string>('spip-1-lingkungan');

  const selectedUnsur =
    SPIP_5_UNSUR_ITEMS.find((u) => u.id === selectedUnsurId) || SPIP_5_UNSUR_ITEMS[0];

  const totalSkorTerbobot = SPIP_5_UNSUR_ITEMS.reduce((acc, curr) => acc + curr.nilaiTerbobot, 0);
  const targetAgregat = 3.20;

  // Radar Polygon Coordinates for 5 Points
  const radarAngles = [
    -90,        // Point 1: Top (Lingkungan Pengendalian)
    -18,        // Point 2: Top Right (Penilaian Risiko)
    54,         // Point 3: Bottom Right (Kegiatan Pengendalian)
    126,        // Point 4: Bottom Left (Informasi & Komunikasi)
    198,        // Point 5: Top Left (Pemantauan Pengendalian Intern)
  ];

  const centerX = 160;
  const centerY = 150;
  const maxRadius = 100; // Represents score = 5.00

  // Realized points
  const realPoints = SPIP_5_UNSUR_ITEMS.map((item, i) => {
    const angleRad = (radarAngles[i] * Math.PI) / 180;
    const r = (item.nilai / 5.0) * maxRadius;
    const x = centerX + r * Math.cos(angleRad);
    const y = centerY + r * Math.sin(angleRad);
    return { x, y, ...item };
  });

  // Target points (target = 3.20)
  const targetPoints = SPIP_5_UNSUR_ITEMS.map((_, i) => {
    const angleRad = (radarAngles[i] * Math.PI) / 180;
    const r = (targetAgregat / 5.0) * maxRadius;
    const x = centerX + r * Math.cos(angleRad);
    const y = centerY + r * Math.sin(angleRad);
    return { x, y };
  });

  const realPathStr = realPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const targetPathStr = targetPoints.map((p) => `${p.x},${p.y}`).join(' ');

  const handleExportCSV = () => {
    const headers = [
      'No',
      'Unsur SPIP',
      'Bobot (%)',
      'Target',
      'Skor Realisasi',
      'Nilai Terbobot',
      'Capaian (%)',
      'Level Maturitas',
      'Fokus Area Implementasi',
    ];
    const rows = SPIP_5_UNSUR_ITEMS.map((u) => [
      u.no,
      `"${u.nama}"`,
      u.bobot,
      u.target.toFixed(2),
      u.nilai.toFixed(2),
      u.nilaiTerbobot.toFixed(2),
      `${u.capaianPersen}%`,
      `"${u.level}"`,
      `"${u.fokusArea}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'PENILAIAN_MATURITAS_SPIP_BP_BATAM.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs font-sans overflow-hidden space-y-3.5 p-4 sm:p-5">
      {/* 1. HEADER KARTU DENGAN IDENTITAS DATASET NO. 17 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-2xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                DATASET NO. 17 (Hal. 40)
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight uppercase">
                Penilaian Indeks Maturitas Sistem Pengendalian Intern Pemerintah (SPIP)
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                5 Unsur Penilaian BPKP (PP No. 60/2008)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Evaluasi tingkat kematangan penyelenggaraan SPIP pada seluruh unit kerja BP Batam untuk memastikan efektivitas tata kelola, keandalan laporan, dan mitigasi risiko
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Download CSV 5 Unsur SPIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>

          {onOpenFormulaModal && (
            <button
              onClick={() => onOpenFormulaModal(17)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
              title="Kamus &amp; Formula SPIP"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Manual SPIP</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. SUMMARY STRIP: TOTAL SKOR AGREGAT & LEVEL MATURITAS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-slate-50 border border-emerald-100 text-xs">
        <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
            Skor Maturitas SPIP
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              {totalSkorTerbobot.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 5.00</span>
          </div>
          <span className="text-[10.5px] font-bold text-emerald-700 font-mono flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Terlampaui (+0.22 Poin)
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
            Tingkat Maturitas (BPKP)
          </span>
          <div className="text-lg sm:text-xl font-black text-emerald-800 font-mono mt-0.5">
            Level 3 (Terdefinisi)
          </div>
          <span className="text-[10.5px] text-slate-500 block mt-1">
            Rentang Skor Level 3: 3,00 - 3,49
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
            Target Standar Perkin
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-black text-slate-800 font-mono">
              {targetAgregat.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">Skor Min BPKP</span>
          </div>
          <span className="text-[10.5px] text-slate-500 block mt-1">
            Dokumen Perkin A1 KemenPAN-RB
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
            Kepatuhan Satker
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
            100% Satker
          </div>
          <span className="text-[10.5px] text-emerald-700 font-bold block mt-1">
            24 Unit Kerja Memiliki Register Risiko
          </span>
        </div>
      </div>

      {/* 3. TAB CONTROLS (RADAR, KARTU RINCIAN, TABEL MASTER DATASET, MATRIKS 5 LEVEL) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'radar'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <RadarIcon className="w-3.5 h-3.5" />
            <span>Radar Chart (5 Unsur)</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cards'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Kartu 5 Unsur Pengendalian</span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabel Master Dataset (5 Unsur)</span>
          </button>

          <button
            onClick={() => setActiveTab('levels')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'levels'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Matriks 5 Level Maturitas SPIP (BPKP)</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-500 hidden md:inline">
          Rujukan: Perka BPKP No. 5/2021 &amp; PP No. 60/2008
        </span>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: RADAR CHART 5 UNSUR INTERAKTIF DENGAN DETAIL SELEKSI              */}
      {/* ========================================================================= */}
      {activeTab === 'radar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* SVG Spider Chart */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 bg-slate-50/70 rounded-xl border border-slate-200/90 relative">
            <svg viewBox="0 0 320 300" className="w-full max-w-[340px] h-auto overflow-visible">
              {/* Concentric Polygons for scale 1.0, 2.0, 3.0, 4.0, 5.0 */}
              {[1, 2, 3, 4, 5].map((scaleVal) => {
                const r = (scaleVal / 5) * maxRadius;
                const polyPoints = radarAngles
                  .map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    return `${centerX + r * Math.cos(rad)},${centerY + r * Math.sin(rad)}`;
                  })
                  .join(' ');
                return (
                  <g key={scaleVal}>
                    <polygon
                      points={polyPoints}
                      fill={scaleVal === 5 ? '#F8FAFC' : 'none'}
                      stroke={scaleVal === 3 ? '#94A3B8' : '#E2E8F0'}
                      strokeWidth={scaleVal === 3 ? 1.5 : 1}
                      strokeDasharray={scaleVal === 3 ? '3 3' : 'none'}
                    />
                    <text
                      x={centerX + 4}
                      y={centerY - r + 3}
                      fontSize="8"
                      fill="#94A3B8"
                      fontFamily="monospace"
                    >
                      {scaleVal}.0
                    </text>
                  </g>
                );
              })}

              {/* Axis lines */}
              {radarAngles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = centerX + maxRadius * Math.cos(rad);
                const y2 = centerY + maxRadius * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={x2}
                    y2={y2}
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Target Line Polygon (Target = 3.20) */}
              <polygon
                points={targetPathStr}
                fill="#94A3B8"
                fillOpacity="0.15"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Realization Polygon (Realisasi BP Batam) */}
              <polygon
                points={realPathStr}
                fill="#059669"
                fillOpacity="0.4"
                stroke="#047857"
                strokeWidth="2.5"
              />

              {/* Interactive Data Point Circles */}
              {realPoints.map((p) => {
                const isSelected = p.id === selectedUnsurId;
                return (
                  <g
                    key={p.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setSelectedUnsurId(p.id)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isSelected ? 6 : 4.5}
                      fill={isSelected ? '#065F46' : '#10B981'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}

              {/* Axis Label Badges */}
              {realPoints.map((p, i) => {
                const angle = radarAngles[i];
                const rad = (angle * Math.PI) / 180;
                const labelRadius = maxRadius + 26;
                const lx = centerX + labelRadius * Math.cos(rad);
                const ly = centerY + labelRadius * Math.sin(rad);
                const isSelected = p.id === selectedUnsurId;

                return (
                  <text
                    key={p.id}
                    x={lx}
                    y={ly}
                    fontSize="9.5"
                    fontWeight={isSelected ? 'bold' : '600'}
                    fill={isSelected ? '#065F46' : '#334155'}
                    textAnchor="middle"
                    className="cursor-pointer select-none"
                    onClick={() => setSelectedUnsurId(p.id)}
                  >
                    {p.singkatan} ({p.nilai.toFixed(2)})
                  </text>
                );
              })}
            </svg>

            {/* Legend underneath radar */}
            <div className="flex items-center gap-4 text-[10.5px] font-mono mt-1 pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-600 border border-emerald-700" />
                <span className="font-bold text-slate-700">Realisasi BP Batam (Skala 5.0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-300 border border-slate-400" />
                <span className="text-slate-500">Target Perkin (3.20)</span>
              </div>
            </div>
          </div>

          {/* Interactive Inspection Details for Selected Unsur */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Unsur #{selectedUnsur.no}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Bobot: {selectedUnsur.bobot}%
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                    {selectedUnsur.nama}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl font-black text-emerald-800 font-mono block">
                    {selectedUnsur.nilai.toFixed(2)} / 5.00
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Nilai Terbobot: {selectedUnsur.nilaiTerbobot.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Progress Bar vs Target */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-slate-500">Ketercapaian Target BPKP (3.20):</span>
                  <span className="font-bold font-mono text-emerald-700">
                    {selectedUnsur.capaianPersen}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (selectedUnsur.nilai / 5.0) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Fokus Area Description */}
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-[11px] space-y-1">
                <span className="font-bold text-slate-800 block">Fokus Implementasi:</span>
                <p className="text-slate-600 leading-relaxed">{selectedUnsur.fokusArea}</p>
              </div>

              {/* Sub-Unsur List: Rincian Sub-Komponen Penilaian (Identik Sistem Merit) */}
              <div className="space-y-2 pt-1 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-slate-800 uppercase tracking-wider block font-mono">
                    Rincian Sub-Komponen Penilaian (Detail Komponen &amp; Nilai):
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {selectedUnsur.subUnsur.length} Sub-Komponen
                  </span>
                </div>
                <div className="space-y-1.5">
                  {selectedUnsur.subUnsur.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-slate-800 font-medium">{sub.nama}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10.5px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          Bobot {sub.bobot}%
                        </span>
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-200">
                          {sub.nilai.toFixed(2)} Poin
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rekomendasi / Tindak Lanjut */}
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[10.5px] text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Arah Penguatan Berkelanjutan: </span>
                  <span>{selectedUnsur.tindakLanjut}</span>
                </div>
              </div>

              {/* QUICK UNSUR SELECTOR BUTTONS (Identik Sistem Merit) */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono mb-1.5">
                  Pilih Unsur Pengendalian (Klik untuk melihat rincian sub-komponen &amp; nilainya):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {SPIP_5_UNSUR_ITEMS.map((u) => {
                    const isSelected = selectedUnsurId === u.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => setSelectedUnsurId(u.id)}
                        className={`p-2 rounded-lg text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono font-bold">Unsur #{u.no}</span>
                          <span className={isSelected ? 'text-emerald-200 font-mono' : 'text-slate-500 font-mono'}>
                            {u.nilai.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-[10px] font-semibold truncate mt-0.5">
                          {u.singkatan}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: KARTU 5 UNSUR PENGENDALIAN INTERN                                 */}
      {/* ========================================================================= */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPIP_5_UNSUR_ITEMS.map((unsur) => (
            <div
              key={unsur.id}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-2xs transition-all flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      Unsur #{unsur.no}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
                      Bobot: {unsur.bobot}%
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {unsur.level}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {unsur.nama}
                </h4>

                <p className="text-[10.5px] text-slate-500 line-clamp-2 leading-relaxed">
                  {unsur.fokusArea}
                </p>
              </div>

              {/* Scores & Progress */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[9.5px] text-slate-400 font-mono block">Skor Realisasi:</span>
                    <span className="text-lg font-black text-slate-900 font-mono">
                      {unsur.nilai.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono"> / 5.00</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] text-slate-400 font-mono block">Terbobot:</span>
                    <span className="text-sm font-bold text-emerald-700 font-mono">
                      {unsur.nilaiTerbobot.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(unsur.nilai / 5.0) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: TABEL MASTER DATASET 5 UNSUR SPIP (DATASET NO. 17)                */}
      {/* ========================================================================= */}
      {activeTab === 'table' && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200">
                <th className="py-2.5 px-3 font-bold text-center border-r border-slate-200 w-12 font-mono">
                  No
                </th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-200">
                  Komponen Penilaian (5 Unsur SPIP)
                </th>
                <th className="py-2.5 px-3 font-bold text-center border-r border-slate-200 w-24 font-mono">
                  Bobot (%)
                </th>
                <th className="py-2.5 px-3 font-bold text-center border-r border-slate-200 w-24 font-mono">
                  Target BPKP
                </th>
                <th className="py-2.5 px-3 font-bold text-center border-r border-slate-200 w-28 font-mono">
                  Skor Realisasi
                </th>
                <th className="py-2.5 px-3 font-bold text-center border-r border-slate-200 w-28 font-mono">
                  Nilai Terbobot
                </th>
                <th className="py-2.5 px-3 font-bold text-center border-r border-slate-200 w-24 font-mono">
                  Capaian (%)
                </th>
                <th className="py-2.5 px-3 font-bold text-center w-36 font-mono">
                  Tingkat Maturitas
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SPIP_5_UNSUR_ITEMS.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500 border-r border-slate-200">
                    {row.no}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <span className="font-bold text-slate-900 block">{row.nama}</span>
                    <span className="text-[10.5px] text-slate-500 line-clamp-1">{row.fokusArea}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700 border-r border-slate-200">
                    {row.bobot}%
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-500 border-r border-slate-200">
                    {row.target.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-black text-slate-900 border-r border-slate-200 text-sm">
                    {row.nilai.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">
                    {row.nilaiTerbobot.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800 border-r border-slate-200">
                    {row.capaianPersen}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {row.level}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Row Total */}
              <tr className="bg-emerald-50/80 font-bold text-slate-900 border-t-2 border-emerald-200">
                <td colSpan={2} className="py-3 px-3 text-center font-mono uppercase tracking-wider text-xs border-r border-slate-200">
                  Rata-rata Terbobot Indeks Maturitas SPIP BP Batam
                </td>
                <td className="py-3 px-3 text-center font-mono border-r border-slate-200">
                  100%
                </td>
                <td className="py-3 px-3 text-center font-mono border-r border-slate-200">
                  3.20
                </td>
                <td colSpan={2} className="py-3 px-3 text-center font-mono text-base font-black text-emerald-800 border-r border-slate-200">
                  {totalSkorTerbobot.toFixed(2)} / 5.00
                </td>
                <td className="py-3 px-3 text-center font-mono text-emerald-700 border-r border-slate-200">
                  106.9%
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2.5 py-1 rounded bg-emerald-700 text-white font-mono font-bold text-xs shadow-2xs">
                    Level 3 (Terdefinisi)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: MATRIKS 5 LEVEL MATURITAS SPIP (METODE BPKP)                      */}
      {/* ========================================================================= */}
      {activeTab === 'levels' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 font-mono uppercase">
              Standar Penetapan Level Maturitas SPIP (Metode BPKP)
            </span>
            <span className="text-[10.5px] font-mono text-slate-500">
              Skala Penilaian: 1,00 - 5,00
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            {STANDAR_LEVEL_MATURITAS_SPIP.map((lvl) => {
              const isCurrentLevel = lvl.level === 'Level 3';

              return (
                <div
                  key={lvl.level}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition-all ${
                    isCurrentLevel
                      ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-2 ring-emerald-400/40'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black font-mono text-slate-900">
                        {lvl.level}
                      </span>
                      {isCurrentLevel && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-700 text-white uppercase">
                          Capaian BP
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-xs text-slate-800 leading-tight">
                      {lvl.nama}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 inline-block">
                      Rentang: {lvl.rentang}
                    </span>
                    <p className="text-[10px] text-slate-600 leading-snug pt-1">
                      {lvl.deskripsi}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80">
                    {isCurrentLevel ? (
                      <div className="text-[10px] font-bold text-emerald-800 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Skor BP: {totalSkorTerbobot.toFixed(2)} (Matur)</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">Metode Standar BPKP</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FOOTER: TABLEAU BLUEPRINT SHELVES SPECIFICATION */}
      <div className="pt-2 border-t border-slate-100">
        <TableauShelvesBadge
          showMe="Radar / Spider Chart & Horizontal Ranked Bar Chart with Benchmark Line"
          columns="[Komponen yang Dinilai (5 Unsur)], AVG([Nilai Skor]), AVG([Nilai Terbobot])"
          rows="[Periode Penilaian], [Bobot %]"
          color="[Tingkat Maturitas (Level 1 - 5)]"
          detail="[Fokus Area Implementasi], [Sub-Unsur Penilaian]"
          text="AVG([Nilai Skor])"
          calculatedField="[Nilai Terbobot] = [Nilai Skor] * ([Bobot] / 100); [Indeks SPIP] = SUM([Nilai Terbobot]); [Deviasi SPIP] = [Nilai Skor] - 3.20"
          compact={true}
        />
      </div>
    </div>
  );
};
