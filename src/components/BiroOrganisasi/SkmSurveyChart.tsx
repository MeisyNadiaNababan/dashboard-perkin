import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';
import {
  Smile,
  CheckCircle2,
  HelpCircle,
  Award,
  Search,
  BarChart3,
  Table as TableIcon,
  Building2,
  Filter,
} from 'lucide-react';
import { SKM_KATEGORI_DATA } from './bokmrData';

interface SkmSurveyChartProps {
  onOpenFormula?: (datasetIndex: number) => void;
}

export const SkmSurveyChart: React.FC<SkmSurveyChartProps> = ({ onOpenFormula }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('ALL');

  // Extract unique Unit Usaha
  const uniqueUnits = useMemo(() => {
    return Array.from(new Set(SKM_KATEGORI_DATA.map((item) => item.unitUsaha)));
  }, []);

  // Compute unit summaries
  const unitSummaries = useMemo(() => {
    return uniqueUnits.map((unit) => {
      const items = SKM_KATEGORI_DATA.filter((i) => i.unitUsaha === unit);
      const avgNilai = items.reduce((acc, c) => acc + c.nilai, 0) / (items.length || 1);
      const avgPersen = items.reduce((acc, c) => acc + c.persentase, 0) / (items.length || 1);
      return {
        unit,
        itemsCount: items.length,
        avgNilai: Number(avgNilai.toFixed(2)),
        avgPersen: Number(avgPersen.toFixed(2)),
      };
    });
  }, [uniqueUnits]);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return SKM_KATEGORI_DATA.filter((item) => {
      const matchesUnit =
        selectedUnitFilter === 'ALL' || item.unitUsaha === selectedUnitFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.unitUsaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesUnit && matchesSearch;
    });
  }, [selectedUnitFilter, searchQuery]);

  // Chart data with clean labels and summary value
  const chartData = useMemo(() => {
    return filteredData.map((item) => {
      const shortUnit = item.unitUsaha
        .replace('Direktorat Pelayanan Lalu Lintas Barang & Penanaman Modal', 'Dit. LLB & PM')
        .replace('Badan Usaha Rumah Sakit BP Batam', 'BU RSBP')
        .replace('Direktorat Pelayanan Terpadu Satu Pintu (PTSP)', 'Dit. PTSP')
        .replace('Badan Usaha SPAM Batam', 'BU SPAM')
        .replace('Badan Usaha Pelabuhan Batam', 'BU Pelabuhan');

      const shortName = item.kategori
        .replace('Indeks Unsur ', '')
        .replace('Indeks Kepuasan ', '')
        .replace('Indeks ', '');

      return {
        id: item.id,
        name: `[${shortUnit}] ${shortName}`,
        fullName: item.kategori,
        unitUsaha: item.unitUsaha,
        shortUnit,
        nilai: item.nilai,
        persentase: item.persentase,
        displayLabel: `Nilai: ${item.nilai.toFixed(2)} | ${item.persentase.toFixed(2)}%`,
        keterangan: item.keterangan,
      };
    });
  }, [filteredData]);

  const avgNilai = (
    filteredData.reduce((acc, curr) => acc + curr.nilai, 0) / (filteredData.length || 1)
  ).toFixed(2);
  const avgPersen = (
    filteredData.reduce((acc, curr) => acc + curr.persentase, 0) / (filteredData.length || 1)
  ).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-sm">
          <div className="border-b border-slate-800 pb-1.5">
            <span className="text-[10px] font-mono font-bold text-amber-400 block uppercase">
              UNIT USAHA: {data.unitUsaha}
            </span>
            <div className="font-bold text-slate-100 text-sm mt-0.5">{data.fullName}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5">
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Nilai SKM (Skala 4):</span>
              <span className="font-mono font-black text-amber-400 text-sm">
                {data.nilai.toFixed(2)} / 4.00
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Persentase (%):</span>
              <span className="font-mono font-black text-emerald-400 text-sm">
                {data.persentase.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-[10.5px] text-slate-300 italic pt-1 border-t border-slate-800">
            {data.keterangan}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs font-sans space-y-4">
      {/* HEADER STANDAR PEMBANGUNAN INFRASTRUKTUR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
            <Smile className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                DATASET NO. 11 (Hal. 39)
              </span>
              <h3 className="text-xs sm:text-base font-bold text-slate-900">
                Rekapitulasi Hasil Survei Kepuasan Masyarakat (SKM)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                Grafik Batang Horizontal &amp; Rekapitulasi Unit Usaha
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                Atribut Wajib Ditampilkan: <strong>Unit Usaha</strong>, <strong>Nilai SKM (Skor 4.00)</strong>, <strong>Persentase (%)</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* SHEET SWAP TOGGLE */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-amber-800 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Grafis &amp; Bar</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-amber-800 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabel Rincian</span>
            </button>
          </div>

          {onOpenFormula && (
            <button
              onClick={() => onOpenFormula(11)}
              className="text-[10.5px] text-amber-700 hover:text-amber-900 font-semibold px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
              title="Kamus & Rumus SKM"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kamus</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HIGHLIGHT CARDS: UNIT USAHA, NILAI, DAN PERSENTASENYA                   */}
      {/* ========================================================================= */}
      <div className="space-y-1.5">
        <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
          <span>Rekapitulasi Kinerja SKM per Unit Usaha BP Batam:</span>
          <span className="text-[10px] text-slate-400 font-normal">Klik unit untuk memfilter data</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {unitSummaries.map((summary) => {
            const isSelected = selectedUnitFilter === summary.unit;
            return (
              <div
                key={summary.unit}
                onClick={() =>
                  setSelectedUnitFilter(isSelected ? 'ALL' : summary.unit)
                }
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-bold font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 truncate">
                      {summary.itemsCount} Unsur
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Mutu A
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {summary.unit}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-200/80 mt-2 space-y-1">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">Nilai SKM:</span>
                    <span className="font-mono font-black text-amber-700">
                      {summary.avgNilai.toFixed(2)}{' '}
                      <span className="text-[9.5px] text-slate-400 font-normal">/ 4.00</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">Persentase:</span>
                    <span className="font-mono font-black text-emerald-700">
                      {summary.avgPersen.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER SEARCH & RESPONDENT SUMMARY */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari unit usaha / kategori unsur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          {selectedUnitFilter !== 'ALL' && (
            <button
              onClick={() => setSelectedUnitFilter('ALL')}
              className="text-[11px] text-amber-700 hover:text-amber-900 font-bold bg-amber-50 px-2 py-1 rounded-md border border-amber-200 cursor-pointer flex items-center gap-1"
            >
              <span>Reset Filter Unit</span>
              <span className="font-mono">✕</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
            Responden: <strong className="text-slate-900">4.850 Pengguna</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-medium border border-amber-200">
            Rata-rata Nilai: <strong className="font-mono">{avgNilai} / 4.00</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
            Rata-rata %: <strong className="font-mono">{avgPersen}%</strong>
          </span>
        </div>
      </div>

      {/* SHEET SWAP VIEW 1: GRAFIS */}
      {viewMode === 'chart' ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Grafik Batang Horizontal: Unit Usaha, Nilai SKM, dan Persentase Kepuasan</span>
            <span className="font-mono">Skala Capaian 70% – 100%</span>
          </div>

          <div
            className="w-full"
            style={{ height: `${Math.max(260, chartData.length * 44 + 40)}px` }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 140, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[70, 100]}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  unit="%"
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                  width={210}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="persentase"
                  name="Persentase Kepuasan (%)"
                  fill="#d97706"
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                >
                  <LabelList
                    dataKey="displayLabel"
                    position="right"
                    style={{ fontSize: 10, fontWeight: 700, fill: '#78350f' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        /* SHEET SWAP VIEW 2: TABEL MENAMPILKAN UNIT USAHA, NILAI, DAN PERSENTASENYA */
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-2.5 px-3 text-center w-12">No</th>
                <th className="py-2.5 px-3">Unit Usaha</th>
                <th className="py-2.5 px-3">Kategori Unsur Pelayanan</th>
                <th className="py-2.5 px-3 text-right">Nilai (Skor / 4.00)</th>
                <th className="py-2.5 px-3 text-right">Persentase (%)</th>
                <th className="py-2.5 px-3">Keterangan / Mutu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-500 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[10.5px]">
                      {item.unitUsaha}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">
                    {item.kategori}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-amber-700 text-xs">
                    {item.nilai.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px]">
                      {item.persentase.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 text-[10.5px]">
                    {item.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-amber-50/70 border-t-2 border-amber-200 font-black text-slate-900">
                <td colSpan={3} className="py-2.5 px-3 text-amber-950 uppercase text-[10.5px]">
                  Rata-rata Keseluruhan Hasil Survei Kepuasan Masyarakat (SKM)
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-amber-900 text-xs">
                  {avgNilai} / 4.00
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-emerald-800 text-xs">
                  {avgPersen}%
                </td>
                <td className="py-2.5 px-3 text-[10.5px] text-emerald-800">
                  Mutu A (Sangat Baik)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
