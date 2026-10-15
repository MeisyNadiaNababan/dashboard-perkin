import React from 'react';
import { Filter, Users, TrendingUp, CheckCircle2, ArrowRight, DollarSign, Clock, Building } from 'lucide-react';

interface FunnelStage {
  stage: string;
  count: number;
  valueT: number;
  conversionFromPrev: string;
  description: string;
  color: string;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    stage: '1. Penjajakan & Promosi Investasi',
    count: 142,
    valueT: 64.50,
    conversionFromPrev: '100%',
    description: 'Calon investor baru yang mengakses portal investasi, inquiry MPP, dan forum bisnis internasional',
    color: '#2563EB', // blue-600
  },
  {
    stage: '2. Peminat Serius (Letter of Intent / LoI)',
    count: 52,
    valueT: 28.20,
    conversionFromPrev: '36,6%',
    description: 'Investor menandatangani LoI, registrasi NIB OSS-RBA, dan konsultasi kebutuhan tapak KEK',
    color: '#3B82F6', // blue-500
  },
  {
    stage: '3. Pemrosesan Perizinan & Lahan (KKPR / PL)',
    count: 38,
    valueT: 19.80,
    conversionFromPrev: '73,1%',
    description: 'Penetapan lokasi lahan (PL), izin amdal/lingkungan, dan verifikasi teknis masterplan industri',
    color: '#60A5FA', // blue-400
  },
  {
    stage: '4. Realisasi Investasi (Konstruksi & Operasi)',
    count: 24,
    valueT: 14.20,
    conversionFromPrev: '63,2%',
    description: 'Penyetoran modal tetap & lancar (KPU BC & BKPM), pematangan lahan, dan instalasi fasilitas',
    color: '#059669', // emerald-600
  },
];

export const InvestorJourneyModule: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Corong Perjalanan Investor (Investor Journey Funnel)
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Pipeline 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pemantauan konversi penanaman modal dari penjajakan awal hingga realisasi investasi fisik di Batam
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Tingkat Konversi Total</span>
            <span className="font-bold text-emerald-700">16,9% (Tinggi)</span>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Siklus Penutupan Rerata</span>
            <span className="font-bold text-blue-700">42 Hari Kerja</span>
          </div>
        </div>
      </div>

      {/* Visual Funnel Process */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {FUNNEL_STAGES.map((step, idx) => (
          <div
            key={idx}
            className="relative bg-slate-50/70 hover:bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-800 text-[11px]">{step.stage.split('.')[0]}</span>
                <span className="font-semibold text-[10px] px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  Konversi {step.conversionFromPrev}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900 mb-1 leading-snug">
                {step.stage.split('. ')[1]}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                {step.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex items-baseline justify-between">
              <div>
                <span className="text-xl font-bold text-slate-900 block leading-tight">
                  {step.count}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Investor Terdata</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-blue-600 block leading-tight">
                  Rp {step.valueT.toFixed(1)} T
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Nilai Potensi</span>
              </div>
            </div>

            {/* Funnel Progress Indicator bar at bottom of card */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(step.count / FUNNEL_STAGES[0].count) * 100}%`,
                  backgroundColor: step.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown Pipeline Sektor Unggulan */}
      <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Top Pipeline Sektor:</span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-medium">
            Pusat Data &amp; AI (8 Proyek &bull; Rp 8,4 T)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-medium">
            Semikonduktor (6 Proyek &bull; Rp 4,2 T)
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-medium">
            MRO Aviasi KEK BAT (4 Proyek &bull; Rp 1,8 T)
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          Sumber Data: Monitoring Dit. Pengembangan KEK &amp; PTSP BP Batam
        </div>
      </div>
    </div>
  );
};
