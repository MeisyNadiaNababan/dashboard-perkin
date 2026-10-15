import React from 'react';
import {
  TrendingUp,
  Smile,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  BarChart3,
  Layers,
} from 'lucide-react';
import { EMPAT_IKS_KEPALA_BP, IksPerkinItem } from './kepalaBpData';

interface KepalaBpKpisProps {
  onSelectIks?: (iksId: string) => void;
  onOpenManualModal?: (iksId: string) => void;
}

interface IksCardTheme {
  borderTop: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  titleHover: string;
  kicker: string;
  kickerBg: string;
  kickerColor: string;
  kickerBorder: string;
  title: string;
  heroGradient: string;
  heroBorder: string;
  heroTitle: string;
  heroBadge: string;
  heroBadgeColor: string;
  ikpLabel: string;
  bigValue: string;
  subValue: string;
  subValueColor: string;
  targetFormatted: string;
  barGradient: string;
  progressWidth: number;
  realisasiFormatted: string;
  capaianFormatted: string;
  statusBadge: string;
  statusBadgeColor: string;
  footerStatus: string;
  footnote: string;
}

const IKS_THEMES: Record<string, IksCardTheme> = {
  'iks-1': {
    borderTop: 'border-t-[#0A2540]',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-200',
    iconColor: 'text-[#0A2540]',
    titleHover: 'group-hover:text-[#0A2540]',
    kicker: 'IKS 1 \u2022 INVESTASI KPBPB',
    kickerBg: 'bg-slate-100',
    kickerColor: 'text-slate-900',
    kickerBorder: 'border-slate-300',
    title: 'Nilai Realisasi Investasi',
    heroGradient: 'from-slate-50 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    heroBadge: 'ON TRACK',
    heroBadgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
    ikpLabel: 'IKP #1: Realisasi Investasi KPBPB',
    bigValue: 'Rp 54,68 T',
    subValue: 'PMA & PMDN',
    subValueColor: 'text-amber-800',
    targetFormatted: 'Rp 70 T',
    barGradient: 'from-[#0A2540] to-amber-500',
    progressWidth: 78.1,
    realisasiFormatted: 'Rp 54,68 Triliun',
    capaianFormatted: '78.1% Target',
    statusBadge: '78.1% ON TRACK',
    statusBadgeColor: 'text-amber-800 bg-amber-50 border-amber-300',
    footerStatus: 'Investasi Terkendali',
    footnote: 'Modal Tetap (KPU BC) + Modal Lancar (KPU BC & BPS)',
  },
  'iks-2': {
    borderTop: 'border-t-[#0A2540]',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-200',
    iconColor: 'text-[#0A2540]',
    titleHover: 'group-hover:text-[#0A2540]',
    kicker: 'IKS 2 \u2022 PELAYANAN PUBLIK',
    kickerBg: 'bg-slate-100',
    kickerColor: 'text-slate-900',
    kickerBorder: 'border-slate-300',
    title: 'Indeks Kepuasan Masyarakat (IKM)',
    heroGradient: 'from-slate-50 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    heroBadge: 'TERCAPAI',
    heroBadgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
    ikpLabel: 'IKP #2: Indeks Layanan & Kawasan',
    bigValue: '88.42',
    subValue: 'Mutu A (Sangat Baik)',
    subValueColor: 'text-amber-800',
    targetFormatted: '88,00',
    barGradient: 'from-[#0A2540] to-amber-500',
    progressWidth: 100,
    realisasiFormatted: '88.42 Poin (SKM)',
    capaianFormatted: '100.5% Target',
    statusBadge: '100.5% TERCAPAI',
    statusBadgeColor: 'text-amber-800 bg-amber-50 border-amber-300',
    footerStatus: 'Pelayanan Prima (Mutu A)',
    footnote: 'Rerata Tertimbang 9 Unsur SKM pada 5 Lokus Pelayanan BP Batam',
  },
  'iks-3': {
    borderTop: 'border-t-[#0A2540]',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-200',
    iconColor: 'text-[#0A2540]',
    titleHover: 'group-hover:text-[#0A2540]',
    kicker: 'IKS 3 \u2022 PENDAPATAN BLU',
    kickerBg: 'bg-slate-100',
    kickerColor: 'text-slate-900',
    kickerBorder: 'border-slate-300',
    title: 'Penerimaan PNBP BP Batam',
    heroGradient: 'from-slate-50 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    heroBadge: 'ON TRACK',
    heroBadgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
    ikpLabel: 'IKP #3: PNBP 10 Satker Penghasil',
    bigValue: 'Rp 1,89 T',
    subValue: '10 Satker BLU',
    subValueColor: 'text-amber-800',
    targetFormatted: 'Rp 2,447 T',
    barGradient: 'from-[#0A2540] to-amber-500',
    progressWidth: 77.3,
    realisasiFormatted: 'Rp 1.892,4 Miliar',
    capaianFormatted: '77.3% Target',
    statusBadge: '77.3% ON TRACK',
    statusBadgeColor: 'text-amber-800 bg-amber-50 border-amber-300',
    footerStatus: 'Pendapatan BLU Sehat',
    footnote: '\u03a3(Realisasi PNBP 2026 10 Unit Kerja Penghasil & Badan Usaha)',
  },
  'iks-4': {
    borderTop: 'border-t-[#0A2540]',
    iconBg: 'bg-slate-100',
    iconBorder: 'border-slate-200',
    iconColor: 'text-[#0A2540]',
    titleHover: 'group-hover:text-[#0A2540]',
    kicker: 'IKS 4 \u2022 TATA KELOLA & RB',
    kickerBg: 'bg-slate-100',
    kickerColor: 'text-slate-900',
    kickerBorder: 'border-slate-300',
    title: 'Indeks Reformasi Birokrasi',
    heroGradient: 'from-slate-50 to-white',
    heroBorder: 'border-slate-200',
    heroTitle: 'text-[#0A2540]',
    heroBadge: 'TERCAPAI',
    heroBadgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
    ikpLabel: 'IKP #4: RB General & Tematik',
    bigValue: '81.35',
    subValue: 'Predikat A (Memuaskan)',
    subValueColor: 'text-amber-800',
    targetFormatted: '80 (BB)',
    barGradient: 'from-[#0A2540] to-amber-500',
    progressWidth: 100,
    realisasiFormatted: '81.35 Poin (KemenPAN-RB)',
    capaianFormatted: '101.7% Target',
    statusBadge: '101.7% TERCAPAI',
    statusBadgeColor: 'text-amber-800 bg-amber-50 border-amber-300',
    footerStatus: 'Akuntabel & SAKIP A',
    footnote: 'Verifikasi KemenPAN-RB atas Akuntabilitas & Reformasi Birokrasi',
  },
};

const IKS_ICONS = {
  'iks-1': TrendingUp,
  'iks-2': Smile,
  'iks-3': DollarSign,
  'iks-4': ShieldCheck,
};

export const KepalaBpKpis: React.FC<KepalaBpKpisProps> = ({
  onSelectIks,
  onOpenManualModal,
}) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Header Bar - Model Tampilan Satker Eksekutif Terpadu (Persis Model Deputi A1) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>4 INDIKATOR KINERJA STRATEGIS (IKS) KEPALA BP BATAM</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
              PERKIN NO. 1/SPJ/KA/1/2026
            </span>
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          DIPA Program: <span className="font-bold text-slate-700">Rp 2,52 Triliun</span> &bull; Sasaran:{' '}
          <span className="font-bold text-emerald-600">Akselerasi Investasi &amp; Pelayanan Prima KPBPB</span>
        </div>
      </div>

      {/* 4 CONSOLIDATED WORK UNIT KPI CARDS (IDENTIK MODEL KARTU DEPUTI A1 TANPA RINGKASAN KINERJA KESELURUHAN) */}
      <div className="grid gap-3.5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {EMPAT_IKS_KEPALA_BP.map((iks) => {
          const IconComp = IKS_ICONS[iks.id as keyof typeof IKS_ICONS] || BarChart3;
          const theme = IKS_THEMES[iks.id] || IKS_THEMES['iks-1'];

          return (
            <div
              key={iks.id}
              className={`bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden group border-t-4 ${theme.borderTop}`}
            >
              <div>
                {/* Top Badge & Unit Header (Persis Model Deputi A1) */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg ${theme.iconBg} border ${theme.iconBorder} flex items-center justify-center ${theme.iconColor} shrink-0`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded ${theme.kickerBg} ${theme.kickerColor} border ${theme.kickerBorder} uppercase truncate block`}
                      >
                        {theme.kicker}
                      </span>
                      <h3
                        className={`text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug ${theme.titleHover} transition-colors truncate`}
                        title={iks.indikatorKinerjaStrategis}
                      >
                        {theme.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className={`text-[10px] font-bold ${theme.statusBadgeColor} px-2 py-0.5 rounded border flex items-center gap-1 font-mono`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {theme.statusBadge}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenManualModal?.(iks.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title={`Formula & Manual Teknis ${theme.title}`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary IKP Card Block: KPI Utama Perkin (Identik Persis Model Deputi A1) */}
                <div
                  className={`bg-gradient-to-br ${theme.heroGradient} rounded-lg p-3 border ${theme.heroBorder} my-3`}
                >
                  <div className="text-[10.5px] font-bold text-blue-950 flex items-center justify-between">
                    <span>{theme.ikpLabel}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${theme.heroBadgeColor}`}
                    >
                      {theme.heroBadge}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-1.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                        {theme.bigValue}
                      </span>
                      <span className={`text-xs font-bold ${theme.subValueColor}`}>
                        {theme.subValue}
                      </span>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                      <span className="font-bold font-mono text-slate-700">
                        {theme.targetFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.barGradient} transition-all duration-700`}
                      style={{ width: `${Math.min(theme.progressWidth, 100)}%` }}
                    />
                  </div>

                  {/* Realisasi vs Capaian Context */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2">
                    <span>
                      Realisasi YTD: <strong className="text-slate-700">{theme.realisasiFormatted}</strong>
                    </span>
                    <span className="font-bold text-slate-800">
                      {theme.capaianFormatted}
                    </span>
                  </div>

                  {/* Brief Footnote / Regulatory Note */}
                  <div className="text-[10px] text-slate-500 mt-2 leading-relaxed line-clamp-1 border-t border-slate-200/50 pt-1.5">
                    {theme.footnote}
                  </div>
                </div>

                {/* Sasaran Strategis */}
                <div className="text-[10.5px] text-slate-600 line-clamp-2 px-0.5 font-medium leading-snug">
                  <span className="font-semibold text-slate-700">Sasaran: </span>
                  {iks.sasaranStrategis}
                </div>
              </div>

              {/* Bottom Card Footer (Identik Model Deputi A1) */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Status: {theme.footerStatus}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectIks?.(iks.id)}
                    className="font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                    title={`Buka Analisis Detail ${theme.title}`}
                  >
                    <span>Detail IKS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenManualModal?.(iks.id)}
                    className="text-slate-500 hover:text-blue-700 text-xs font-semibold cursor-pointer"
                    title="Kamus & Manual Regulasi Naskah"
                  >
                    Manual Naskah ↗
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
