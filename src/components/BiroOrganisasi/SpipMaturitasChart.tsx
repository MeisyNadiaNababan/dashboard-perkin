import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Award,
  BarChart3,
  Table as TableIcon,
} from 'lucide-react';
import { SPIP_MATURITAS_ITEMS, SKOR_AGREGAT_SPIP } from './bokmrData';

interface SpipMaturitasChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const SpipMaturitasChart: React.FC<SpipMaturitasChartProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const chartData = SPIP_MATURITAS_ITEMS.map((item) => ({
    name: item.komponenPenilaian.replace('Lingkungan ', 'Lingk. ').replace('Pengendalian', 'Pengend.'),
    fullName: item.komponenPenilaian,
    bobot: item.bobot,
    nilai: item.skor,
    nilaiTerbobot: Number(((item.bobot / 100) * item.skor).toFixed(2)),
    level: item.levelMaturitas,
    fokusArea: item.fokusArea,
  }));

  const totalBobot = SPIP_MATURITAS_ITEMS.reduce((acc, curr) => acc + curr.bobot, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-emerald-300">{data.fullName}</div>
          <div className="text-[10.5px] text-slate-300">Fokus: {data.fokusArea}</div>
          <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Bobot Komponen:</span>
              <span className="font-mono font-bold text-amber-400">{data.bobot}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Nilai (Skor Realisasi):</span>
              <span className="font-mono font-bold text-emerald-400">{data.nilai.toFixed(2)} / 5.00</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Nilai Terbobot:</span>
              <span className="font-mono font-bold text-sky-300">{data.nilaiTerbobot}</span>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-300">
              Tingkat Maturitas: {data.level}
            </div>
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
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                DATASET NO. 17 (Hal. 40)
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Penilaian Maturitas Sistem Pengendalian Intern Pemerintah (SPIP)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                Visualisasi: Grafik Batang 5 Unsur Pengendalian Intern (Bar Chart with Benchmark Line)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut yang Ditampilkan: <strong>Komponen yang Dinilai</strong>, <strong>Bobot</strong>, <strong>Nilai (Skor)</strong>, <strong>Periode Penilaian</strong> (Hal. 40)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* SHEET SWAP TOGGLE */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel</span>
            </button>
          </div>

          <div className="text-right px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="text-[9.5px] font-bold text-emerald-800 block">Skor Agregat SPIP</span>
            <span className="font-mono font-black text-xs text-emerald-950">
              {SKOR_AGREGAT_SPIP.toFixed(2)} / 5.00 (Level 3 - Terdefinisi)
            </span>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(17)}
              className="text-[10.5px] text-emerald-700 hover:text-emerald-900 font-semibold px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1 transition-colors"
              title="Kamus & Formula SPIP"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS */}
      {viewMode === 'chart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* BAR CHART: NILAI SKOR REALISASI */}
          <div className="lg:col-span-7 h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                  iconType="circle"
                />
                <ReferenceLine
                  y={3.2}
                  stroke="#059669"
                  strokeDasharray="3 3"
                  label={{
                    value: 'Target BPKP (3.20)',
                    fill: '#047857',
                    fontSize: 10,
                    position: 'right',
                  }}
                />
                <Bar
                  dataKey="nilai"
                  name="Nilai (Skor / 5.00)"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 5 COMPONENT SUMMARY TILES */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2">
            {SPIP_MATURITAS_ITEMS.map((item) => (
              <div
                key={item.no}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    KOMPONEN #{item.no}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Bobot {item.bobot}%
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-slate-900 mt-1 line-clamp-1" title={item.komponenPenilaian}>
                  {item.komponenPenilaian}
                </h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-black text-emerald-900 font-mono">
                    {item.skor.toFixed(2)}
                  </span>
                  <span className="text-[10.5px] text-slate-400 font-medium">/ 5.00</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(item.skor / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABEL (NO, KOMPONEN, BOBOT, NILAI, PERIODE PENILAIAN) */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Komponen yang Dinilai</th>
                <th className="py-2.5 px-3 text-right">Bobot</th>
                <th className="py-2.5 px-3 text-right">Nilai (Skor / 5.00)</th>
                <th className="py-2.5 px-3 text-center">Periode Penilaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SPIP_MATURITAS_ITEMS.map((item) => (
                <tr key={item.no} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {item.no}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {item.komponenPenilaian}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-700">
                    {item.bobot}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-emerald-700 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      {item.skor.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                      Tahun 2024
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50/70 border-t-2 border-emerald-200 font-black text-slate-900">
                <td colSpan={2} className="py-2.5 px-3 text-emerald-950 uppercase text-[10.5px]">
                  Skor Agregat Maturitas SPIP BP Batam
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-950">
                  {totalBobot}%
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-950 text-xs">
                  {SKOR_AGREGAT_SPIP.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-center text-[10px] text-emerald-900 font-normal">
                  Evaluasi Tahunan BPKP RI
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
