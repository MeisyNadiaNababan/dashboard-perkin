import React from 'react';
import {
  TrendingUp,
  Globe2,
  Briefcase,
  Calculator,
  ArrowUpRight,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface InvestasiKpiRowProps {
  totalRealisasiInvestasi: number;
  totalTargetInvestasi: number;
  capaianInvestasiPersen: number;
  totalKunjunganWebsite: number;
  totalMinatInvestasi: number;
  totalNilaiMinatInvestasi: number;
  onOpenFormulaModal: (formulaId: string) => void;
}

// Micro Sparkline Bar Component
const MicroBarSparkline: React.FC<{ data?: number[]; color?: string }> = ({
  data = [],
  color = '#1E40AF',
}) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-1 h-5 shrink-0" title="Tren Historis Triwulanan">
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

// Format Rupiah helper
const formatRupiahMiliar = (val: number): string => {
  if (val >= 1e12) {
    return `Rp ${(val / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
  }
  return `Rp ${(val / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
};

export const InvestasiKpiRow: React.FC<InvestasiKpiRowProps> = ({
  totalRealisasiInvestasi,
  totalTargetInvestasi,
  capaianInvestasiPersen,
  totalKunjunganWebsite,
  totalMinatInvestasi,
  totalNilaiMinatInvestasi,
  onOpenFormulaModal,
}) => {
  const kpiItems = [
    {
      id: 'kpi_investasi_realisasi',
      acronym: 'REALISASI',
      icon: TrendingUp,
      badgeBg: 'bg-emerald-600',
      badgeText: 'text-white',
      themeColor: '#059669', // Emerald
      title: 'Realisasi Investasi',
      value: formatRupiahMiliar(totalRealisasiInvestasi),
      targetText: `Target: ${formatRupiahMiliar(totalTargetInvestasi)}`,
      capaianBadge: `${capaianInvestasiPersen.toFixed(1)}% Capaian`,
      bottomText: `Formula: (Realisasi/Target) × 100% = ${capaianInvestasiPersen.toFixed(1)}%`,
      sparkline: [75, 82, 94, 105, 117],
      datasetInfo: 'Dataset No. 13 • Satu Data BP Batam',
    },
    {
      id: 'kpi_investasi_website',
      acronym: 'WEBSITE',
      icon: Globe2,
      badgeBg: 'bg-blue-600',
      badgeText: 'text-white',
      themeColor: '#2563EB', // Blue
      title: 'Kunjungan Website Invest In-Batam',
      value: `${totalKunjunganWebsite.toLocaleString('id-ID')} Hits`,
      targetText: 'investinbatam.bpbatam.go.id',
      capaianBadge: '+24.6% YoY Growth',
      bottomText: 'Dataset No. 10 • 12 Bulan Aktifitas Pengunjung Global',
      sparkline: [40, 52, 65, 78, 95],
      datasetInfo: 'Dataset No. 10 • Satu Data BP Batam',
    },
    {
      id: 'kpi_investasi_minat',
      acronym: 'MINAT-INV',
      icon: Briefcase,
      badgeBg: 'bg-indigo-600',
      badgeText: 'text-white',
      themeColor: '#4F46E5', // Indigo
      title: 'Minat Investasi Kunjungan & Pameran',
      value: `${totalMinatInvestasi} Investor (LoI)`,
      targetText: `Potensi Nilai: ${formatRupiahMiliar(totalNilaiMinatInvestasi)}`,
      capaianBadge: 'Dalam & Luar Negeri',
      bottomText: 'Dataset No. 14 • Hasil Promosi & Diplomatic Mission',
      sparkline: [30, 45, 60, 80, 100],
      datasetInfo: 'Dataset No. 14 • Satu Data BP Batam',
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-3.5 font-sans select-none">
      {/* Tableau Shelves Mapping for Executive BANs */}
      <TableauShelvesBadge
        showMe="Show Me #1 (Text / KPI Tile Cards) — In-Cell Bullet & Formula Popups"
        columns="Measure Names"
        text="Measure Values"
        filters="[tahun]='2025', [satker]='DIT-INVESTASI', [dataset]='10, 13, 14'"
        detail="Klik kartu KPI untuk melihat pop-up rumus matematis, target perkin & metadata Satu Data"
      />

      {/* Header Visualisasi Standar Pembangunan Infrastruktur */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono border border-sky-200">
              DATASET NO. 10, 13, 14 (Hal. 47-48)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 font-mono">
              TERBUKA
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Indikator Kinerja Strategis Investasi Batam
            </h3>
            <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200 font-mono">
              Visualisasi: Kartu Ringkasan Eksekutif & Micro-Sparklines (Executive BANs Scorecard)
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 mt-2 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200 text-xs">
          <span className="text-[10.5px] font-semibold text-slate-600 mr-0.5">
            Atribut yang Ditampilkan:
          </span>
          {[
            'REALISASI INVESTASI',
            'TARGET INVESTASI',
            'PERSENTASE CAPAIAN (%)',
            'TRAFFIC WEBSITE',
            'MINAT INVESTASI (LoI)',
            'POTENSI NILAI MINAT',
          ].map((attr, i) => (
            <span
              key={i}
              className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white text-slate-800 border border-slate-300 shadow-2xs"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>

      {/* Baris 3 Kartu KPI Sesuai Permintaan User */}
      <div
        id="investasi-kpi-row-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4.5"
      >
        {kpiItems.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              id={`kpi-card-${item.id}`}
              onClick={() => onOpenFormulaModal(item.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
              title="Klik untuk membuka formula perhitungan & rincian katalog data"
            >
              {/* Top colored accent indicator */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-80 group-hover:opacity-100"
                style={{ backgroundColor: item.themeColor }}
              />

              <div>
                {/* Header: Index Number + Acronym Badge with Icon + Title + Rumus Button */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      #{idx + 1}
                    </span>
                    <div
                      className={`${item.badgeBg} ${item.badgeText} text-[10px] font-black font-mono px-1.5 py-0.5 rounded shadow-2xs shrink-0 flex items-center gap-1`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.acronym}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 group-hover:bg-blue-100 border border-blue-200/80 px-1.5 py-0.5 rounded transition-colors flex items-center gap-0.5 shrink-0">
                    <Calculator className="w-2.5 h-2.5" />
                    <span>Rumus</span>
                  </span>
                </div>

                {/* Main Metric & Sublabel */}
                <div className="my-2">
                  <div className="text-2xl sm:text-[28px] font-black text-slate-900 font-mono tracking-tight leading-none">
                    {item.value}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 font-medium">
                    <span>{item.targetText}</span>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ArrowUpRight className="w-3 h-3" />
                      {item.capaianBadge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Calculation notes & Micro Bar Sparkline */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {item.bottomText}
                </span>

                <MicroBarSparkline
                  data={item.sparkline}
                  color={item.themeColor}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
