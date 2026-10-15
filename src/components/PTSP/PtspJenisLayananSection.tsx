import React, { useState } from 'react';
import {
  Layers,
  BarChart2,
  Table,
  CheckCircle2,
  Clock,
  Inbox,
  Filter,
  ArrowUpDown,
  Download,
} from 'lucide-react';
import {
  PTSP_DATASET_14_JENIS_LAYANAN,
  PtspJenisLayananItem,
} from '../../data/ptspData';

interface PtspJenisLayananSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspJenisLayananSection: React.FC<PtspJenisLayananSectionProps> = ({
  onExplainKpi,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [sortField, setSortField] = useState<'permohonanMasuk' | 'selesai' | 'persentaseSelesai'>('permohonanMasuk');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const data = [...PTSP_DATASET_14_JENIS_LAYANAN].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const totalMasuk = data.reduce((acc, curr) => acc + curr.permohonanMasuk, 0);
  const totalSelesai = data.reduce((acc, curr) => acc + curr.selesai, 0);
  const totalBelumSelesai = data.reduce((acc, curr) => acc + curr.belumSelesai, 0);
  const maxMasuk = Math.max(...data.map((d) => d.permohonanMasuk));

  const handleSort = (field: 'permohonanMasuk' | 'selesai' | 'persentaseSelesai') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Container */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              POIN #7 • DATASET 14
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              Visualisasi: Grafik Batang Komparatif Horisontal &amp; Tabel Monitoring Layanan
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mt-0.5">
            <Layers className="w-4 h-4 text-[#002B49]" />
            Jenis Layanan BP Batam (Dataset 14)
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>JENIS LAYANAN</strong>, <strong>PERMOHONAN MASUK</strong>, <strong>SELESAI</strong>, <strong>BELUM SELESAI</strong>, &amp; <strong>PERSENTASE SELESAI (%)</strong> (Hal. 24)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitoring volume permohonan masuk, berkas selesai, dan berkas belum selesai per jenis layanan
          </p>
        </div>

        {/* View Toggle & Summary Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Total Masuk:</span>
              <span className="font-mono font-bold text-[#002B49]">{totalMasuk.toLocaleString('id-ID')}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Selesai:</span>
              <span className="font-mono font-bold text-emerald-600">{totalSelesai.toLocaleString('id-ID')}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Belum Selesai:</span>
              <span className="font-mono font-bold text-amber-600">{totalBelumSelesai.toLocaleString('id-ID')}</span>
            </div>
          </div>

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
              <span>Visual Bar</span>
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
              <span>Tabel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {viewMode === 'chart' ? (
          <div className="space-y-3">
            {/* Chart Legend */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <span className="font-medium text-slate-500">Jenis Layanan &amp; Kategori</span>
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                  <span className="text-slate-600">Permohonan Masuk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  <span className="text-slate-600">Selesai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                  <span className="text-slate-600">Belum Selesai</span>
                </div>
              </div>
            </div>

            {/* Tight Compact Bars */}
            <div className="space-y-2.5">
              {data.map((item) => {
                const masukPercent = Math.round((item.permohonanMasuk / maxMasuk) * 100);
                const selesaiWidth = Math.round((item.selesai / item.permohonanMasuk) * 100);
                const belumWidth = 100 - selesaiWidth;

                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.jenisLayanan}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                          {item.kategori}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-600">
                          Masuk: <strong className="text-slate-900">{item.permohonanMasuk.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Selesai: <strong>{item.selesai.toLocaleString('id-ID')}</strong> ({item.persentaseSelesai}%)
                        </span>
                        <span className="text-amber-700">
                          Belum Selesai: <strong>{item.belumSelesai.toLocaleString('id-ID')}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Dual Compact Stacked Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex shadow-inner">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500 rounded-l-full"
                        style={{ width: `${(item.selesai / maxMasuk) * 100}%` }}
                        title={`Selesai: ${item.selesai.toLocaleString('id-ID')} (${item.persentaseSelesai}%)`}
                      />
                      <div
                        className="bg-amber-400 h-full transition-all duration-500 rounded-r-full"
                        style={{ width: `${(item.belumSelesai / maxMasuk) * 100}%` }}
                        title={`Belum Selesai: ${item.belumSelesai.toLocaleString('id-ID')}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Jenis Layanan</th>
                  <th className="py-2.5 px-3 font-semibold">Kategori</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('permohonanMasuk')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Permohonan Masuk</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('selesai')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Selesai</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">Belum Selesai</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('persentaseSelesai')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>% Selesai</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.jenisLayanan}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {item.permohonanMasuk.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                      {item.selesai.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-600">
                      {item.belumSelesai.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.persentaseSelesai}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <tr>
                  <td className="py-2.5 px-3">Total Akumulasi YTD</td>
                  <td className="py-2.5 px-3">-</td>
                  <td className="py-2.5 px-3 text-right font-mono">{totalMasuk.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-600">{totalSelesai.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-amber-600">{totalBelumSelesai.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                    {((totalSelesai / totalMasuk) * 100).toFixed(1)}%
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
