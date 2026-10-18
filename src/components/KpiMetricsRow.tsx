import React from 'react';
import {
  Coins,
  CreditCard,
  Building2,
  Receipt,
  Scale,
  Award,
  Calculator,
} from 'lucide-react';
import { KpiMetric } from '../types';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface KpiMetricsRowProps {
  metrics: KpiMetric[];
  onSelectMetric?: (metricId: string) => void;
}

const MicroBarSparkline: React.FC<{ data?: number[]; color?: string }> = ({
  data = [],
  color = '#1F4E79',
}) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-1 h-5 shrink-0" title="Tren Historis Performa (MoM)">
      {data.map((val, idx) => {
        const heightPct = Math.max(20, Math.round(((val - min) / range) * 80 + 20));
        return (
          <div
            key={idx}
            className="w-1.5 rounded-t-xs transition-all duration-300"
            style={{
              height: `${heightPct}%`,
              backgroundColor: idx === data.length - 1 ? color : `${color}55`,
            }}
          />
        );
      })}
    </div>
  );
};

export const KpiMetricsRow: React.FC<KpiMetricsRowProps> = ({ metrics, onSelectMetric }) => {
  const getKpiConfig = (id: string) => {
    switch (id) {
      case 'pendapatan':
        return {
          acronym: 'PNBP',
          icon: Coins,
          badgeBg: 'bg-emerald-600',
          badgeText: 'text-white',
          themeColor: '#059669', // Emerald
          subLabel: 'Target: Rp 2.447,5 M • Capaian: 40,1%',
          bottomText: 'Capaian: (Realisasi/Target) × 100% = 40,1%',
        };
      case 'belanja':
        return {
          acronym: 'BELANJA',
          icon: CreditCard,
          badgeBg: 'bg-[#1F4E79]',
          badgeText: 'text-white',
          themeColor: '#1F4E79', // Navy Blue
          subLabel: 'Pagu DIPA: Rp 3.318,5 M • Serapan: 28,5%',
          bottomText: 'Serapan: (Realisasi/Pagu) × 100% = 28,5%',
        };
      case 'kas_bank':
        return {
          acronym: 'KAS',
          icon: Building2,
          badgeBg: 'bg-teal-600',
          badgeText: 'text-white',
          themeColor: '#0D9488', // Teal
          subLabel: 'Cadangan 3,89 Bulan Operasional',
          bottomText: 'Likuiditas Kas: Solven Prima (≥ 2 Bln)',
        };
      case 'piutang':
        return {
          acronym: 'PIUT',
          icon: Receipt,
          badgeBg: 'bg-rose-600',
          badgeText: 'text-white',
          themeColor: '#E11D48', // Rose
          subLabel: '73,8% Kolektibel (305 Debitur)',
          bottomText: 'Kolektibilitas 1 (Lancar): Rp 230,5 M',
        };
      case 'coverage_ratio':
        return {
          acronym: 'CCR',
          icon: Scale,
          badgeBg: 'bg-purple-600',
          badgeText: 'text-white',
          themeColor: '#7C3AED', // Purple
          subLabel: '103,8% Mandiri (Surplus Kas Operasional)',
          bottomText: 'Benchmark Kemandirian: ≥ 0,80x',
        };
      case 'ipa':
        return {
          acronym: 'IKPA',
          icon: Award,
          badgeBg: 'bg-amber-600',
          badgeText: 'text-white',
          themeColor: '#D97706', // Amber
          subLabel: 'Kategori Sangat Baik • Opini WTP BPK',
          bottomText: 'Standar Akuntansi Pemerintah (SAP) WTP',
        };
      default:
        return {
          acronym: 'KPI',
          icon: Coins,
          badgeBg: 'bg-slate-700',
          badgeText: 'text-white',
          themeColor: '#475569',
          subLabel: 'Indikator Utama',
          bottomText: 'Target & Realisasi 2026',
        };
    }
  };

  // Filter out any non-Biro Keuangan KPIs (FO & Apps belong to PDSI)
  const biroKeuanganMetrics = metrics.filter(
    (m) => m.id !== 'panjang_fiber' && m.id !== 'jaringan_fiber' && m.id !== 'jumlah_aplikasi'
  );

  return (
    <div className="space-y-2 font-sans select-none">
      {/* Tableau Shelves Mapping for Executive BANs */}
      <TableauShelvesBadge
        showMe="Show Me #1 (Text / KPI Tile Cards) — In-Cell Bullet & Formula Popups"
        columns="Measure Names"
        text="Measure Values"
        filters="[tahun]='2026', [bulan]='April', [satker]='ALL'"
        detail="Klik kartu KPI untuk melihat pop-up rumus matematis & breakdown angka riil"
      />

      {/* Grid of 6 Clean KPI Cards with Spacious Layout (3 columns on lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {biroKeuanganMetrics.map((metric, idx) => {
          const config = getKpiConfig(metric.id);
          const Icon = config.icon;

          return (
            <div
              key={metric.id}
              id={`kpi-card-${metric.id}`}
              onClick={() => onSelectMetric && onSelectMetric(metric.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 sm:p-4.5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title="Klik untuk membuka formula perhitungan & rincian katalog data"
            >
              {/* Subtle top indicator bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
                style={{ backgroundColor: config.themeColor }}
              />

              <div>
                {/* Card Top: Index Number + Acronym with Icon + Title, Rumus button on right */}
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
                      {metric.title}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 group-hover:bg-blue-100 border border-blue-200/80 px-1.5 py-0.5 rounded transition-colors flex items-center gap-0.5 shrink-0">
                    <Calculator className="w-2.5 h-2.5" />
                    <span>Rumus</span>
                  </span>
                </div>

                {/* Card Center: Big Bold Number & SubLabel */}
                <div className="my-1.5">
                  <div className="text-2xl sm:text-[26px] font-black text-slate-900 font-mono tracking-tight leading-none">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                    {config.subLabel}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Target / Summary text */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-slate-500 font-medium truncate">
                  {config.bottomText}
                </span>
                <span className="text-[10.5px] font-bold text-emerald-700 font-mono">
                  {metric.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
