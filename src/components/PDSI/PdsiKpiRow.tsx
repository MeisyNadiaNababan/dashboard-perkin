import React from 'react';
import { PDSI_KPI_METRICS } from '../../data/pdsiData';
import {
  Server,
  ShieldAlert,
  Cpu,
  Calculator,
  Layers,
  HeartHandshake,
  HardDrive,
  AppWindow,
  Network
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PdsiKpiRowProps {
  onSelectMetric?: (metricId: string) => void;
  onOpenKamusRumus?: (metricTag?: string) => void;
}

// Micro vertical bar sparkline matching the CRMS "Total MTD Revenue" card
const MicroBarSparkline: React.FC<{
  data?: number[];
  color: string;
}> = ({ data = [60, 70, 75, 80, 85, 95], color }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-5 w-12 shrink-0 justify-end">
      {data.slice(-5).map((val, i) => {
        const heightPct = Math.max(25, Math.round((val / max) * 100));
        const isLast = i === 4;
        return (
          <div
            key={i}
            className="w-1.5 rounded-xs transition-all"
            style={{
              height: `${heightPct}%`,
              backgroundColor: color,
              opacity: isLast ? 1 : 0.35 + i * 0.12,
            }}
          />
        );
      })}
    </div>
  );
};

export const PdsiKpiRow: React.FC<PdsiKpiRowProps> = ({ onSelectMetric, onOpenKamusRumus }) => {
  const getPdsiConfig = (id: string) => {
    switch (id) {
      case 'total_rak':
        return {
          acronym: 'DC-RAK',
          icon: Server,
          badgeBg: 'bg-[#1F4E79]',
          badgeText: 'text-white',
          themeColor: '#1F4E79',
          subLabel: 'Kapasitas Fisik 42U',
        };
      case 'rak_terisi':
        return {
          acronym: 'OKUP',
          icon: Layers,
          badgeBg: 'bg-emerald-600',
          badgeText: 'text-white',
          themeColor: '#059669',
          subLabel: 'Okupansi 78,6% (9 Sisa)',
        };
      case 'indeks_spbe':
        return {
          acronym: 'SPBE',
          icon: Cpu,
          badgeBg: 'bg-purple-600',
          badgeText: 'text-white',
          themeColor: '#7C3AED',
          subLabel: 'Predikat Sangat Baik',
        };
      case 'total_serangan':
        return {
          acronym: 'SOC',
          icon: ShieldAlert,
          badgeBg: 'bg-rose-600',
          badgeText: 'text-white',
          themeColor: '#E11D48',
          subLabel: '98,7% Termitigasi CSIRT',
        };
      case 'kepuasan_dc':
        return {
          acronym: 'CSAT',
          icon: HeartHandshake,
          badgeBg: 'bg-amber-600',
          badgeText: 'text-white',
          themeColor: '#D97706',
          subLabel: 'Indeks 4,71 dari 5,00',
        };
      case 'jumlah_core_fo':
      case 'kapasitas_core_fo':
        return {
          acronym: 'FO-CORE',
          icon: Network,
          badgeBg: 'bg-sky-600',
          badgeText: 'text-white',
          themeColor: '#0284C7',
          subLabel: '83,3% Utilisasi • 8 Koridor',
        };
      case 'jumlah_server':
        return {
          acronym: 'SRV',
          icon: HardDrive,
          badgeBg: 'bg-teal-600',
          badgeText: 'text-white',
          themeColor: '#0D9488',
          subLabel: '48 Aktif • 10 DRC Node',
        };
      case 'panjang_fiber':
        return {
          acronym: 'FO-KM',
          icon: Network,
          badgeBg: 'bg-blue-600',
          badgeText: 'text-white',
          themeColor: '#2563EB',
          subLabel: '8 Ruas Koridor Utama',
        };
      case 'jumlah_aplikasi':
        return {
          acronym: 'APP',
          icon: AppWindow,
          badgeBg: 'bg-indigo-600',
          badgeText: 'text-white',
          themeColor: '#4F46E5',
          subLabel: '84 Publik & Internal Aktif',
        };
      default:
        return {
          acronym: 'KPI',
          icon: Server,
          badgeBg: 'bg-slate-700',
          badgeText: 'text-white',
          themeColor: '#334155',
          subLabel: 'Metrik PDSI',
        };
    }
  };

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-[#1F4E79] rounded-2xs" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
            Key Performance Indicators — PDSI BP Batam
          </h3>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            (Klik kartu KPI manapun untuk membuka penjelasan rumus lengkap)
          </span>
        </div>
        {onOpenKamusRumus && (
          <button
            onClick={() => onOpenKamusRumus()}
            className="text-xs font-semibold text-[#1F4E79] hover:text-[#0B2545] flex items-center gap-1 cursor-pointer transition-colors bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs hover:bg-slate-50"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kamus Rumus PDSI</span>
          </button>
        )}
      </div>

      {/* Tableau Shelves Mapping for PDSI Executive BANs */}
      <TableauShelvesBadge
        showMe="Show Me #1 (Text / KPI Tile Cards) — In-Cell Sparkline & Formula Popups"
        columns="Measure Names"
        text="Measure Values"
        filters="[satker]='PDSI', [tahun]='2026', [domain]='Infrastruktur & SPBE'"
        detail="Klik kartu KPI untuk melihat pop-up rumus matematis & benchmark teknis"
      />

      {/* Grid of 6 Spacious CRMS Style Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {PDSI_KPI_METRICS.map((kpi, idx) => {
          const config = getPdsiConfig(kpi.id);
          const Icon = config.icon;

          return (
            <div
              key={kpi.id}
              onClick={() => onSelectMetric && onSelectMetric(kpi.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 sm:p-4.5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title="Klik untuk membuka penjelasan lengkap formula & cara kerja KPI"
            >
              {/* Subtle top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
                style={{ backgroundColor: config.themeColor }}
              />

              <div>
                {/* Header Row: Index Number + Acronym Block + Title */}
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
                    {config.subLabel}
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
