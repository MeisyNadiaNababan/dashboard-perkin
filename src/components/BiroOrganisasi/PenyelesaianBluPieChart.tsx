import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import {
  PieChart as PieIcon,
  CheckCircle2,
  HelpCircle,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { PENYELESAIAN_REKOMENDASI_BLU, MODERNISASI_BLU_DATA } from './bokmrData';

interface PenyelesaianBluPieChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const PenyelesaianBluPieChart: React.FC<PenyelesaianBluPieChartProps> = ({ onOpenFormula }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Modernisasi rata-rata persentase penyelesaian
  const avgModernisasi =
    MODERNISASI_BLU_DATA.reduce((acc, curr) => acc + curr.capaian, 0) / MODERNISASI_BLU_DATA.length;

  // 5 entitas/inisiatif yang langsung digabung dalam Pie Chart
  const combinedPieData = [
    {
      id: 'pengelola',
      name: 'Penyelesaian Pengelola BLU',
      shortName: 'Pengelola BLU',
      persentase: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'pengelola_blu')?.persentasePenyelesaian || 94.40,
      keterangan: 'Tindak lanjut rekomendasi operasional & DIPA BLU',
      selesai: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'pengelola_blu')?.rekomendasiSelesai || 118,
      total: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'pengelola_blu')?.rekomendasiTotal || 125,
      color: '#0284c7', // Sky-600
    },
    {
      id: 'dewas',
      name: 'Penyelesaian Dewan Pengawas BLU',
      shortName: 'Dewan Pengawas BLU',
      persentase: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'dewan_pengawas')?.persentasePenyelesaian || 96.51,
      keterangan: 'Tindak lanjut arahan rapat triwulanan Dewas',
      selesai: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'dewan_pengawas')?.rekomendasiSelesai || 83,
      total: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'dewan_pengawas')?.rekomendasiTotal || 86,
      color: '#10b981', // Emerald-500
    },
    {
      id: 'komite_audit',
      name: 'Penyelesaian Komite Audit BLU',
      shortName: 'Komite Audit BLU',
      persentase: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'komite_audit')?.persentasePenyelesaian || 92.19,
      keterangan: 'Pencegahan fraud & kepatuhan pelaporan keuangan',
      selesai: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'komite_audit')?.rekomendasiSelesai || 59,
      total: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'komite_audit')?.rekomendasiTotal || 64,
      color: '#f59e0b', // Amber-500
    },
    {
      id: 'spi',
      name: 'Penyelesaian Satuan Pengawas Intern BLU',
      shortName: 'Satuan Pengawas Intern BLU',
      persentase: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'spi_blu')?.persentasePenyelesaian || 97.92,
      keterangan: 'Penyelesaian temuan audit berkala SPI',
      selesai: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'spi_blu')?.rekomendasiSelesai || 188,
      total: PENYELESAIAN_REKOMENDASI_BLU.find((i) => i.id === 'spi_blu')?.rekomendasiTotal || 192,
      color: '#6366f1', // Indigo-500
    },
    {
      id: 'modernisasi',
      name: 'Penyelesaian Modernisasi Pengelolaan BLU',
      shortName: 'Modernisasi Pengelolaan BLU',
      persentase: Number(avgModernisasi.toFixed(2)),
      keterangan: '4 Inisiatif Modernisasi: BIOS, e-Billing, Risk, Remunerasi',
      selesai: 4,
      total: 4,
      color: '#ec4899', // Pink-500
    },
  ];

  const rataRataKeseluruhan = (
    combinedPieData.reduce((acc, curr) => acc + curr.persentase, 0) / combinedPieData.length
  ).toFixed(2);

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-sky-300">{data.name}</div>
          <div className="text-[11px] text-slate-300">{data.keterangan}</div>
          <div className="pt-1 border-t border-slate-800 flex items-center justify-between gap-4">
            <span className="text-slate-400">Persentase Penyelesaian:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">
              {data.persentase.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Realisasi Kasus/Inisiatif:</span>
            <span className="font-mono text-slate-200">
              {data.selesai} dari {data.total} tuntas
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs font-sans space-y-3.5">
      {/* HEADER STANDAR PEMBANGUNAN INFRASTRUKTUR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200 shrink-0">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                DATASET NO. 6 &amp; NO. 7 (Hal. 39)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Persentase Penyelesaian Pengawasan &amp; Modernisasi Pengelolaan BLU
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                Visualisasi: Grafik Lingkaran Terpadu (Combined Pie / Donut Chart)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Entitas / Inisiatif Pengawasan</strong> &amp; <strong>Persentase Penyelesaian (%)</strong> (Pengelola BLU, Dewan Pengawas BLU, Komite Audit BLU, Satuan Pengawas Intern BLU, Modernisasi Pengelolaan BLU)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="text-right px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-100">
            <span className="text-[9.5px] font-bold text-sky-700 block">Rata-rata Penyelesaian</span>
            <span className="font-mono font-black text-xs text-sky-950">
              {rataRataKeseluruhan}% Tuntas
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(6)}
              className="text-[10.5px] text-sky-700 hover:text-sky-900 font-semibold px-2 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 flex items-center gap-1 transition-colors"
              title="Kamus Formula BLU"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* COMBINED PIE CHART & BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* PIE / DONUT CHART */}
        <div className="lg:col-span-5 h-[250px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={combinedPieData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={96}
                paddingAngle={3}
                dataKey="persentase"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {combinedPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? '#0f172a' : '#ffffff'}
                    strokeWidth={activeIndex === index ? 2 : 1}
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[9.5px] uppercase font-bold text-slate-400">Rata-Rata</span>
            <span className="text-xl font-black text-slate-800 font-mono">{rataRataKeseluruhan}%</span>
            <span className="text-[9.5px] text-emerald-600 font-bold">5 Pilar BLU</span>
          </div>
        </div>

        {/* 5 ITEMS DETAIL CARDS */}
        <div className="lg:col-span-7 space-y-2">
          {combinedPieData.map((item, idx) => (
            <div
              key={item.id}
              className={`p-2.5 rounded-lg border transition-all ${
                activeIndex === idx
                  ? 'bg-slate-100/90 border-slate-400 shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/60'
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] font-bold text-slate-900">
                    {idx + 1}. {item.name}
                  </span>
                </div>
                <span className="font-mono font-black text-xs text-slate-900">
                  {item.persentase.toFixed(2)}%
                </span>
              </div>

              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-1">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.persentase}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[9.5px] text-slate-500">
                <span className="truncate">{item.keterangan}</span>
                <span className="font-mono text-emerald-700 font-bold shrink-0 ml-2">
                  ✓ {item.selesai} / {item.total} Selesai
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
