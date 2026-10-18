import React from 'react';
import {
  FileCode2,
  Award,
  Clock,
  Inbox,
  CheckCircle,
  FileSpreadsheet,
  MessageSquare,
  Calculator,
  LucideIcon,
} from 'lucide-react';
import { PTSP_OFFICIAL_6_KPIS, PtspOfficial6Kpi } from '../../data/ptspData';

interface PtspKpiRowProps {
  onSelectMetric?: (kpiId: string) => void;
  onOpenKamusRumus?: () => void;
}

interface PtspCardConfig {
  acronym: string;
  icon: LucideIcon;
  badgeBg: string;
  badgeText: string;
  themeColor: string;
  sparkline: number[];
}

const PTSP_CARD_CONFIG: Record<string, PtspCardConfig> = {
  ikm_ptsp: {
    acronym: 'IKM',
    icon: Award,
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
    themeColor: '#7C3AED',
    sparkline: [78, 82, 85, 87, 89],
  },
  sla_tepat_waktu: {
    acronym: 'SLA',
    icon: Clock,
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    themeColor: '#059669',
    sparkline: [88, 91, 92, 93, 95],
  },
  permohonan_masuk: {
    acronym: 'DEMAND',
    icon: Inbox,
    badgeBg: 'bg-[#1F4E79]',
    badgeText: 'text-white',
    themeColor: '#1F4E79',
    sparkline: [11200, 11900, 12400, 13100, 13820],
  },
  izin_terbit: {
    acronym: 'TERBIT',
    icon: CheckCircle,
    badgeBg: 'bg-teal-600',
    badgeText: 'text-white',
    themeColor: '#0D9488',
    sparkline: [10500, 11200, 11800, 12600, 13192],
  },
  non_perizinan: {
    acronym: 'NON-IZIN',
    icon: FileSpreadsheet,
    badgeBg: 'bg-sky-600',
    badgeText: 'text-white',
    themeColor: '#0284C7',
    sparkline: [1600, 1750, 1880, 2010, 2140],
  },
  jumlah_pengaduan: {
    acronym: 'ADUAN',
    icon: MessageSquare,
    badgeBg: 'bg-rose-600',
    badgeText: 'text-white',
    themeColor: '#E11D48',
    sparkline: [220, 205, 198, 192, 188],
  },
};

const MicroBarSparkline: React.FC<{ data?: number[]; color?: string }> = ({
  data = [40, 60, 55, 75, 90],
  color = '#1F4E79',
}) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-4 w-12 shrink-0">
      {data.map((val, i) => {
        const heightPercent = Math.max(15, Math.round((val / max) * 100));
        return (
          <div
            key={i}
            className="w-2 rounded-xs transition-all duration-300 opacity-80 group-hover:opacity-100"
            style={{
              height: `${heightPercent}%`,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
};

export const PtspKpiRow: React.FC<PtspKpiRowProps> = ({
  onSelectMetric,
  onOpenKamusRumus,
}) => {
  // Hanya 3 KPI Utama yang Dipertahankan Sesuai Instruksi User:
  // 1. Total Berkas Permohonan Masuk
  // 2. Total Berkas Selesai
  // 3. Indeks Kepuasan Masyarakat (IKM)
  const allowedKpiIds = ['permohonan_masuk', 'izin_terbit', 'ikm_ptsp'];
  const retainedKpis = PTSP_OFFICIAL_6_KPIS.filter((kpi) => allowedKpiIds.includes(kpi.id));

  return (
    <div className="space-y-3">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 pb-1">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
              POIN #1 SAMPAI #6
            </span>
            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800">
              INDIKATOR KINERJA UTAMA PTSP BP BATAM (3 KPI EKSEKUTIF)
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              Visualisasi: Executive Scorecard Banner &amp; Micro-Sparkline Trend
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>TOTAL PERMOHONAN MASUK</strong>, <strong>BERKAS SELESAI</strong>, &amp; <strong>INDEKS KEPUASAN MASYARAKAT (IKM)</strong> (Katalog Satu Data PTSP)
            </span>
          </div>
        </div>
        {onOpenKamusRumus && (
          <button
            onClick={onOpenKamusRumus}
            className="flex items-center gap-1.5 text-xs text-[#002B49] hover:text-blue-700 font-bold hover:underline cursor-pointer transition-colors shrink-0"
          >
            <FileCode2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Kamus Rumus &amp; Calculated Fields PTSP</span>
          </button>
        )}
      </div>

      {/* Grid of 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {retainedKpis.map((kpi, idx) => {
          const config = PTSP_CARD_CONFIG[kpi.id] || {
            acronym: 'PTSP',
            icon: Award,
            badgeBg: 'bg-[#1F4E79]',
            badgeText: 'text-white',
            themeColor: '#1F4E79',
            sparkline: [50, 60, 70, 80, 90],
          };
          const Icon = config.icon;

          return (
            <div
              key={kpi.id}
              onClick={() => onSelectMetric && onSelectMetric(kpi.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 sm:p-4.5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title={`Poin #${kpi.pointNo}: ${kpi.title} • Klik untuk membuka penjelasan lengkap formula & cara kerja KPI`}
            >
              {/* Subtle top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
                style={{ backgroundColor: config.themeColor }}
              />

              <div>
                {/* Header Row: Index Number + Acronym Block + Title + Rumus Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      #{idx + 1}
                    </span>
                    <div
                      className={`${config.badgeBg} ${config.badgeText} text-[10px] font-black font-mono px-1.5 py-0.5 rounded shadow-2xs shrink-0 flex items-center gap-1`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{config.acronym}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors truncate">
                      {kpi.title}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 group-hover:bg-blue-100 border border-blue-200/80 px-1.5 py-0.5 rounded transition-colors flex items-center gap-0.5 shrink-0">
                    <Calculator className="w-2.5 h-2.5" />
                    <span>Rumus</span>
                  </span>
                </div>

                {/* Big Number Value */}
                <div className="my-1.5">
                  <div className="text-2xl sm:text-[26px] font-black text-slate-900 font-mono tracking-tight leading-none">
                    {kpi.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                    {kpi.subValue}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Target Metric */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-500 font-medium truncate">
                  {kpi.target}
                </span>
                <span className="text-[10.5px] font-bold text-emerald-700 font-mono">
                  {kpi.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

