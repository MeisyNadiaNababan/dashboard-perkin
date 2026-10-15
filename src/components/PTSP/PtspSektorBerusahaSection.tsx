import React, { useState } from 'react';
import {
  Briefcase,
  BarChart2,
  Table,
  CheckCircle2,
  TrendingUp,
  Building2,
  ArrowUpDown,
  HelpCircle,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  PTSP_DATASET_9_SEKTOR_BERUSAHA,
  PtspSektorBerusahaItem,
} from '../../data/ptspData';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

interface PtspSektorBerusahaSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspSektorBerusahaSection: React.FC<PtspSektorBerusahaSectionProps> = ({
  onExplainKpi,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [sortField, setSortField] = useState<'permohonan' | 'terbit' | 'tingkatTerbit'>('permohonan');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const data = [...PTSP_DATASET_9_SEKTOR_BERUSAHA].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const totalPermohonan = data.reduce((acc, curr) => acc + curr.permohonan, 0);
  const totalTerbit = data.reduce((acc, curr) => acc + curr.terbit, 0);

  const handleSort = (field: 'permohonan' | 'terbit' | 'tingkatTerbit') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Prepare chart data for Recharts
  const chartData = data.map((item) => ({
    sektor: item.sektor.length > 22 ? `${item.sektor.slice(0, 20)}...` : item.sektor,
    fullSektor: item.sektor,
    permohonan: item.permohonan,
    terbit: item.terbit,
    belumTerbit: item.permohonan - item.terbit,
    tingkatTerbit: item.tingkatTerbit,
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Container */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              POIN #11 • DATASET 9
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              Visualisasi: Dual Axis Bar &amp; Line Trend Chart (Permohonan vs Terbit) serta Tabel Rasio
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mt-0.5">
            <Briefcase className="w-4 h-4 text-[#002B49]" />
            Perizinan Berusaha Berdasarkan Sektor (Dataset 9)
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>SEKTOR USAHA (KBLI)</strong>, <strong>PERMOHONAN</strong>, <strong>IZIN TERBIT</strong>, <strong>BELUM TERBIT</strong>, &amp; <strong>TINGKAT TERBIT (%)</strong> (Hal. 33)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sebaran volume permohonan dan penerbitan izin per sektor ekonomi strategis BP Batam
          </p>
        </div>

        {/* View Controls, Totals & Formula Trigger */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Total Masuk:</span>
              <span className="font-mono font-bold text-[#002B49]">{totalPermohonan.toLocaleString('id-ID')}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Terbit:</span>
              <span className="font-mono font-bold text-emerald-600">{totalTerbit.toLocaleString('id-ID')}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Rasio:</span>
              <span className="font-mono font-bold text-emerald-700">
                {((totalTerbit / totalPermohonan) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Sheet Swap Toggle Button */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-[#002B49] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Visual Bar (Tableau)</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#002B49] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Pivot Crosstab</span>
            </button>
          </div>

          {/* Formula Popup Button */}
          <button
            onClick={() => onExplainKpi && onExplainKpi('ptsp_sektor_kbli')}
            className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 font-semibold bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-200 transition-colors cursor-pointer"
            title="Buka Formula & Kamus Calculated Field Tableau"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Formula</span>
          </button>
        </div>
      </div>

      {/* Tableau Configuration Shelves */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
        <TableauShelvesBadge
          columns="Measure Values (SUM([Permohonan]), SUM([Terbit]))"
          rows="[Sektor Usaha KBLI]"
          marks="Bar (Clustered / Side-by-Side)"
          filters="[Tahun]=2026, [Status Validasi]='Valid'"
        />
      </div>

      {/* Content Area with Sheet Swap */}
      <div className="p-4">
        {viewMode === 'chart' ? (
          <div className="space-y-3">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 110, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} />
                  <YAxis
                    dataKey="sektor"
                    type="category"
                    tick={{ fill: '#1E293B', fontSize: 11, fontWeight: 600 }}
                    width={105}
                  />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      `${Number(value).toLocaleString('id-ID')} Berkas`,
                      name === 'permohonan' ? 'Permohonan Masuk' : 'Izin Terbit Selesai',
                    ]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return payload[0].payload.fullSektor;
                      }
                      return label;
                    }}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      color: '#FFF',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
                    formatter={(val) => (val === 'permohonan' ? 'Permohonan Masuk' : 'Izin Terbit Selesai')}
                  />
                  <Bar dataKey="permohonan" fill="#93C5FD" radius={[0, 4, 4, 0]} name="permohonan" />
                  <Bar dataKey="terbit" fill="#059669" radius={[0, 4, 4, 0]} name="terbit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span>Sektor Industri Pengolahan dan Perdagangan mendominasi volume pengajuan izin (OSS RBA).</span>
              <span className="font-bold text-emerald-700">Rata-rata Konversi Terbit: 95.5%</span>
            </div>
          </div>
        ) : (
          /* Pivot Crosstab View */
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Sektor Usaha (KBLI)</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('permohonan')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Permohonan Masuk</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('terbit')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Izin Terbit</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('tingkatTerbit')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Rasio (%)</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">Sisa Dalam Proses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.sektor}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {item.permohonan.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                      {item.terbit.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.tingkatTerbit}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                      {(item.permohonan - item.terbit).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <tr>
                  <td className="py-2.5 px-3">Total Seluruh Sektor</td>
                  <td className="py-2.5 px-3 text-right font-mono">{totalPermohonan.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-600">{totalTerbit.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                    {((totalTerbit / totalPermohonan) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                    {(totalPermohonan - totalTerbit).toLocaleString('id-ID')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
