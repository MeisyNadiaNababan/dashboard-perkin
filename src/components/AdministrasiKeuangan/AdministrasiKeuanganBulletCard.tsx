import React, { useState } from 'react';
import {
  Info,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import {
  PerkinIkpItem,
  STATUS_CONFIG,
  StatusKpi
} from './administrasiKeuanganData';

interface BulletChartProps {
  currentValue: number;
  targetValue: number;
  maxValue: number;
  status: StatusKpi;
  unitLabel?: string;
}

// Komponen Bullet Chart Resmi: batang capaian + garis penanda target vertikal
export const BulletChartBar: React.FC<BulletChartProps> = ({
  currentValue,
  targetValue,
  maxValue,
  status,
  unitLabel = '',
}) => {
  const currentPct = Math.min((currentValue / maxValue) * 100, 100);
  const targetPct = Math.min((targetValue / maxValue) * 100, 100);

  const barColor =
    status === 'TERCAPAI'
      ? 'bg-emerald-600'
      : status === 'DALAM_PANTAUAN'
      ? 'bg-amber-500'
      : 'bg-rose-600';

  return (
    <div className="w-full space-y-1 my-2">
      <div className="relative h-3 w-full bg-slate-100 rounded-xs overflow-visible border border-slate-200">
        {/* Background range bands */}
        <div className="absolute inset-0 bg-slate-100 rounded-xs" />

        {/* Actual Performance Bar */}
        <div
          className={`h-full ${barColor} rounded-l-xs transition-all duration-500`}
          style={{ width: `${currentPct}%` }}
        />

        {/* Target Marker Line (Vertical Tick) */}
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[3px] bg-slate-900 z-10 rounded-xs shadow-xs"
          style={{ left: `calc(${targetPct}% - 1.5px)` }}
          title={`Garis Penanda Target: ${targetValue} ${unitLabel}`}
        />
      </div>

      {/* Axis Scale Legend */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <span>0</span>
        <span className="font-semibold text-slate-700">
          Target: {targetValue}
        </span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

// Mini Sparkline untuk Sistem Merit (TW1–TW4)
export const MeritSparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 24;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-[10px] text-slate-400 font-medium">TW1–TW4:</span>
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke="#0F2942"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {data.map((val, idx) => {
          const x = (idx / (data.length - 1)) * width;
          const y = height - ((val - min) / range) * (height - 6) - 3;
          const isLast = idx === data.length - 1;
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={isLast ? 3 : 2}
              className={isLast ? 'fill-emerald-600' : 'fill-slate-600'}
            />
          );
        })}
      </svg>
      <span className="text-[10.5px] font-bold text-emerald-700 tabular-nums">
        +27,5 pts
      </span>
    </div>
  );
};

interface AdministrasiKeuanganBulletCardProps {
  ikp: PerkinIkpItem;
  onOpenDrawer: (ikpId: string) => void;
}

export const AdministrasiKeuanganBulletCard: React.FC<
  AdministrasiKeuanganBulletCardProps
> = ({ ikp, onOpenDrawer }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const statusCfg = STATUS_CONFIG[ikp.status];

  // Penentuan skala maksimal untuk bullet chart
  const maxValue =
    ikp.id === 'ikp-1-rb' ? 100 : ikp.id === 'ikp-2-merit' ? 400 : 5.0;

  return (
    <div
      onClick={() => onOpenDrawer(ikp.id)}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
      style={{ minHeight: '230px' }}
      title={`Klik untuk membuka rincian IKP ${ikp.no}: ${ikp.namaLengkap}`}
    >
      <div>
        {/* Row 1: Judul maksimal 4 kata + Ikon Info Tooltip */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">
              IKP {ikp.no}
            </span>
            <span className="text-slate-300">·</span>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
              {ikp.judulSingkat}
            </h3>
          </div>

          {/* Ikon (i) Tooltip Sumber Data, Dataset Satu Data & Rumus */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(!showTooltip);
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Info Sumber Data & Rumus"
            >
              <Info className="w-4 h-4" />
            </button>

            {showTooltip && (
              <div
                className="absolute right-0 top-6 z-30 w-72 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-[11px] space-y-1.5 pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                  {ikp.namaLengkap}
                </div>
                <div>
                  <span className="text-slate-400">Sumber Data:</span>{' '}
                  <span className="text-slate-200">{ikp.sumberData}</span>
                </div>
                <div>
                  <span className="text-slate-400">Satu Data:</span>{' '}
                  <span className="text-slate-200">{ikp.datasetSatuData}</span>
                </div>
                <div>
                  <span className="text-slate-400">Rumus:</span>{' '}
                  <span className="text-slate-300">{ikp.rumusPerhitungan}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Angka KPI Besar (36-44px) */}
        <div className="mt-2.5 flex items-baseline justify-between gap-2">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            {ikp.nilaiUtama}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-md border ${statusCfg.bgClass} ${statusCfg.colorClass} ${statusCfg.borderClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass}`} />
            {statusCfg.label}
          </span>
        </div>

        {/* Row 3: 1 Baris Konteks (Target + Pembanding Tahun Lalu) */}
        <div className="text-xs text-slate-500 font-medium mt-1">
          {ikp.barisKonteks}
        </div>

        {/* Row 4: Visualisasi Sesuai Jenis IKP */}
        {ikp.id === 'ikp-4-wtp' ? (
          /* Opini BPK: Ikon Centang & Status WTP */
          <div className="my-2.5 p-2 bg-emerald-50/80 rounded-lg border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-emerald-900">
                8 Tahun Berturut-turut WTP
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold">
              Unqualified
            </span>
          </div>
        ) : (
          /* Bullet Chart untuk RB, Merit, SPIP */
          <div className="mt-1">
            <BulletChartBar
              currentValue={ikp.realisasiAngka}
              targetValue={ikp.targetAngka}
              maxValue={maxValue}
              status={ikp.status}
              unitLabel={ikp.id === 'ikp-1-rb' ? 'Indeks' : ikp.id === 'ikp-2-merit' ? 'Poin' : 'Skor'}
            />
          </div>
        )}

        {/* Sparkline khusus Sistem Merit (Kuartal) */}
        {ikp.id === 'ikp-2-merit' && ikp.sparklineTw && (
          <MeritSparkline data={ikp.sparklineTw} />
        )}
      </div>

      {/* Row 5: Biro Pengampu & Trigger Drilldown */}
      <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          {ikp.biroPengampu}
        </span>
        <span className="text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all flex items-center gap-0.5 font-medium">
          <span>Detail</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
