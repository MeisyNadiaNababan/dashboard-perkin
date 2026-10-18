import React from 'react';
import {
  TrendingUp,
  FileCheck2,
  FileText,
  Layers,
  Award,
  Calculator,
} from 'lucide-react';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface KekKpiRowProps {
  // 1. Nilai Investasi
  totalRealisasiInvestasi: number; // Rupiah
  totalTargetInvestasi: number; // Rupiah
  capaianInvestasiPersen: number; // %
  // 2. Perizinan Berusaha
  totalPerizinanBerusaha: number;
  // 3. Non Perizinan
  totalNonPerizinan: number;
  // 4. Perizinan Lainnya
  totalPerizinanLainnya: number;
  // 5. Kajian Perkin
  totalDokumenAnalisis: number;
  totalAnalisisDitindaklanjuti: number;
  capaianKajianPersen: number;
  // Modal callback
  onOpenFormulaModal: (formulaId: string) => void;
}

// Micro Sparkline Bar Component (matches Biro Keuangan MicroBarSparkline)
const MicroBarSparkline: React.FC<{ data?: number[]; color?: string }> = ({
  data = [],
  color = '#1F4E79',
}) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-1 h-5 shrink-0" title="Tren Historis Performa">
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

export const KekKpiRow: React.FC<KekKpiRowProps> = ({
  totalRealisasiInvestasi,
  totalTargetInvestasi,
  capaianInvestasiPersen,
  totalPerizinanBerusaha,
  totalNonPerizinan,
  totalPerizinanLainnya,
  totalDokumenAnalisis,
  totalAnalisisDitindaklanjuti,
  capaianKajianPersen,
  onOpenFormulaModal,
}) => {
  const kpiItems = [
    {
      id: 'kpi_kek_investasi',
      acronym: 'INVESTASI',
      icon: TrendingUp,
      badgeBg: 'bg-emerald-600',
      badgeText: 'text-white',
      themeColor: '#059669', // Emerald
      title: 'Nilai Investasi KEK',
      value: formatRupiahMiliar(totalRealisasiInvestasi),
      subLabel: `Target: ${formatRupiahMiliar(totalTargetInvestasi)} • Capaian: ${capaianInvestasiPersen.toFixed(1)}%`,
      bottomText: `Capaian: (Realisasi/Target) × 100% = ${capaianInvestasiPersen.toFixed(1)}%`,
      sparkline: [35, 60, 80, 100, 95],
    },
    {
      id: 'kpi_kek_izin_berusaha',
      acronym: 'IZIN-ADM',
      icon: FileCheck2,
      badgeBg: 'bg-blue-600',
      badgeText: 'text-white',
      themeColor: '#1E40AF', // Navy Blue
      title: 'Perizinan Berusaha',
      value: `${totalPerizinanBerusaha} Izin`,
      subLabel: '100% Pemohon Terlayani • Zero Backlog',
      bottomText: 'Dataset No. 3 • Administrator KEK',
      sparkline: [50, 65, 85, 100, 90],
    },
    {
      id: 'kpi_kek_non_perizinan',
      acronym: 'NON-IZIN',
      icon: FileText,
      badgeBg: 'bg-amber-600',
      badgeText: 'text-white',
      themeColor: '#D97706', // Amber
      title: 'Daftar Non Perizinan',
      value: `${totalNonPerizinan} Layanan`,
      subLabel: 'Rekomendasi Fiskal, Masterlist & Fasilitas',
      bottomText: 'Dataset No. 4 • Tax Holiday & Fasilitas BC',
      sparkline: [40, 60, 75, 85, 100],
    },
    {
      id: 'kpi_kek_perizinan_lainnya',
      acronym: 'IZIN-LAIN',
      icon: Layers,
      badgeBg: 'bg-purple-600',
      badgeText: 'text-white',
      themeColor: '#7C3AED', // Purple
      title: 'Perizinan Lainnya',
      value: `${totalPerizinanLainnya} Izin`,
      subLabel: 'Izin Khusus Operasional, Limbah & Genset',
      bottomText: 'Dataset No. 7 • Administrator KEK',
      sparkline: [30, 50, 70, 90, 80],
    },
    {
      id: 'kpi_kek_kajian_perkin',
      acronym: 'KAJIAN',
      icon: Award,
      badgeBg: 'bg-rose-600',
      badgeText: 'text-white',
      themeColor: '#E11D48', // Rose
      title: '% Kajian Berkelanjutan',
      value: `${capaianKajianPersen.toFixed(1)}%`,
      subLabel: `${totalAnalisisDitindaklanjuti} dari ${totalDokumenAnalisis} Dokumen Ditindaklanjuti`,
      bottomText: 'Formula Perkin: (Ditindaklanjuti/Dokumen) × 100%',
      sparkline: [60, 75, 85, 95, 100],
    },
  ];

  const renderCard = (item: typeof kpiItems[0], idx: number) => {
    const Icon = item.icon;

    return (
      <div
        key={item.id}
        id={`kpi-card-${item.id}`}
        onClick={() => onOpenFormulaModal(item.id)}
        className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden"
        title="Klik untuk membuka formula perhitungan & rincian katalog data"
      >
        {/* Subtle top indicator bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
          style={{ backgroundColor: item.themeColor }}
        />

        <div>
          {/* Card Top: Index Number + Acronym with Icon + Title, Rumus button on right */}
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

          {/* Card Center: Big Bold Number & SubLabel */}
          <div className="my-1.5">
            <div className="text-2xl sm:text-[28px] font-black text-slate-900 font-mono tracking-tight leading-none">
              {item.value}
            </div>
            <div className="text-[11.5px] text-slate-500 font-medium mt-1 truncate">
              {item.subLabel}
            </div>
          </div>
        </div>

        {/* Bottom Row: Target / Summary text */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 font-medium truncate">
            {item.bottomText}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-3.5 font-sans select-none">
      {/* Tableau Shelves Mapping for Executive BANs */}
      <TableauShelvesBadge
        showMe="Show Me #1 (Text / KPI Tile Cards) — In-Cell Bullet & Formula Popups"
        columns="Measure Names"
        text="Measure Values"
        filters="[tahun]='2025', [kek]='ALL', [satker]='DIT-KEK'"
        detail="Klik kartu KPI untuk melihat pop-up rumus matematis & breakdown angka riil"
      />

      {/* Baris Atas: 3 Kartu KPI (Investasi, Izin Berusaha, Non Perizinan) */}
      <div
        id="kek-kpi-row-top"
        className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4"
      >
        {kpiItems.slice(0, 3).map((item, idx) => renderCard(item, idx))}
      </div>

      {/* Baris Bawah: 2 Kartu KPI (Perizinan Lainnya, % Kajian Berkelanjutan) */}
      <div
        id="kek-kpi-row-bottom"
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4"
      >
        {kpiItems.slice(3, 5).map((item, idx) => renderCard(item, idx + 3))}
      </div>
    </div>
  );
};
