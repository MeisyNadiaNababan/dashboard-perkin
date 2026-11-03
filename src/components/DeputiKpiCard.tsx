import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface DeputiKpiCardProps {
  /** Label e.g. "IKP 1 • Reformasi Birokrasi" */
  title: string;
  /** Nilai KPI besar e.g. "78,45 / BB" atau "Rp 63,85 T" */
  value: string;
  /** Sub-label opsional di samping nilai jika dibutuhkan */
  unitLabel?: string;
  /** Target dan persentase capaian e.g. "Target 75,00 (104,6%)" */
  targetLabel: string;
  /** Perbandingan dengan tahun sebelumnya e.g. "+3,0% YoY" */
  yoyLabel: string;
  /** Ikon Lucide */
  icon: LucideIcon;
  /** Aksi klik */
  onClick?: () => void;
  /** Tooltip saat hover */
  tooltip?: string;
}

/**
 * Kartu KPI Utama Deputi 1-7 yang seragam sesuai referensi desain BP Batam
 * Berisi: Judul KPI, Nilai KPI, Target & Persentase Capaian, dan Perbandingan YoY.
 */
export const DeputiKpiCard: React.FC<DeputiKpiCardProps> = ({
  title,
  value,
  unitLabel,
  targetLabel,
  yoyLabel,
  icon: Icon,
  onClick,
  tooltip,
}) => {
  return (
    <div
      onClick={onClick}
      title={tooltip || title}
      className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between border border-blue-500/40 relative overflow-hidden"
    >
      <div>
        {/* Baris Atas: Judul KPI & Ikon Bulat Transparan */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-blue-100 tracking-tight flex items-center gap-1.5 truncate">
            {title}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold backdrop-blur-xs shrink-0">
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Baris Tengah: Nilai KPI Utama */}
        <div className="flex items-baseline gap-1.5 my-1">
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono block">
            {value}
          </span>
          {unitLabel && (
            <span className="text-xs font-bold text-blue-200">
              {unitLabel}
            </span>
          )}
        </div>

        {/* Baris Bawah: Garis Pembatas Tipis, Target (Capaian %), dan YoY */}
        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/20">
          <span className="text-blue-100/90 font-medium truncate mr-2">
            {targetLabel}
          </span>
          <span className="text-blue-100/90 font-mono font-semibold shrink-0">
            {yoyLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
