import React, { useState } from 'react';
import {
  MessageSquare,
  BarChart2,
  Table,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpDown,
} from 'lucide-react';
import {
  PTSP_DATASET_6_PENGADUAN,
  PtspPengaduanLayananItem,
} from '../../data/ptspData';

interface PtspPengaduanLayananSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspPengaduanLayananSection: React.FC<PtspPengaduanLayananSectionProps> = ({
  onExplainKpi,
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [sortField, setSortField] = useState<'total' | 'selesai' | 'tingkatPenyelesaian'>('total');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const data = [...PTSP_DATASET_6_PENGADUAN].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const totalPengaduan = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalSelesai = data.reduce((acc, curr) => acc + curr.selesai, 0);
  const totalBelumDitangani = data.reduce((acc, curr) => acc + curr.belumDitangani, 0);
  const maxTotal = Math.max(...data.map((d) => d.total));

  const handleSort = (field: 'total' | 'selesai' | 'tingkatPenyelesaian') => {
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
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
              POIN #12 • DATASET 6
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              Visualisasi: Bar Chart Status Penanganan Aduan (SP4N-LAPOR! &amp; Helpdesk) &amp; Tabel Rincian
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mt-0.5">
            <MessageSquare className="w-4 h-4 text-[#002B49]" />
            Pengaduan Pelayanan PTSP (Dataset 6)
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>JENIS PENGADUAN</strong>, <strong>TOTAL ADUAN</strong>, <strong>SELESAI</strong>, <strong>BELUM DITANGANI</strong>, &amp; <strong>TINGKAT SELESAI (%)</strong> (Hal. 35)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitoring penyelesaian keluhan layanan publik, permohonan informasi teknis, dan konsultasi
          </p>
        </div>

        {/* View Controls & Totals */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Total Aduan:</span>
              <span className="font-mono font-bold text-[#002B49]">{totalPengaduan}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Selesai:</span>
              <span className="font-mono font-bold text-emerald-600">{totalSelesai}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Belum Ditangani:</span>
              <span className="font-mono font-bold text-rose-600">{totalBelumDitangani}</span>
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
              <span className="font-medium text-slate-500">Jenis Pengaduan</span>
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  <span className="text-slate-600">Selesai Ditangani</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                  <span className="text-slate-600">Belum Ditangani</span>
                </div>
              </div>
            </div>

            {/* Compact Bar Visual */}
            <div className="space-y-2.5">
              {data.map((item) => {
                const selesaiWidth = (item.selesai / item.total) * 100;
                const belumWidth = (item.belumDitangani / item.total) * 100;

                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.jenisPengaduan}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                          {item.saluranUtama}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.2 rounded border font-bold ${
                            item.tingkatPenyelesaian === 100
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {item.tingkatPenyelesaian}% Selesai
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-600">
                          Total: <strong className="text-slate-900">{item.total}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Selesai: <strong>{item.selesai}</strong>
                        </span>
                        <span className="text-rose-700">
                          Belum: <strong>{item.belumDitangani}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Tight Segmented Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex shadow-inner">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500 rounded-l-full"
                        style={{ width: `${(item.selesai / maxTotal) * 100}%` }}
                        title={`Selesai: ${item.selesai}`}
                      />
                      {item.belumDitangani > 0 && (
                        <div
                          className="bg-rose-500 h-full transition-all duration-500 rounded-r-full"
                          style={{ width: `${(item.belumDitangani / maxTotal) * 100}%` }}
                          title={`Belum Ditangani: ${item.belumDitangani}`}
                        />
                      )}
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
                  <th className="py-2.5 px-3 font-semibold">Jenis Pengaduan</th>
                  <th className="py-2.5 px-3 font-semibold">Saluran Utama</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Total</span>
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
                  <th className="py-2.5 px-3 font-semibold text-right text-rose-700">Belum Ditangani</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[#002B49]"
                    onClick={() => handleSort('tingkatPenyelesaian')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>% Selesai</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">Avg SLA (Hari)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.jenisPengaduan}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.saluranUtama}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{item.total}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">{item.selesai}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-600">
                      {item.belumDitangani}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span
                        className={`px-2 py-0.5 rounded border ${
                          item.tingkatPenyelesaian === 100
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {item.tingkatPenyelesaian}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      {item.rataRataHariPenyelesaian} hari
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <tr>
                  <td className="py-2.5 px-3">Total Seluruh Pengaduan</td>
                  <td className="py-2.5 px-3">-</td>
                  <td className="py-2.5 px-3 text-right font-mono">{totalPengaduan}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-600">{totalSelesai}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-rose-600">{totalBelumDitangani}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                    {((totalSelesai / totalPengaduan) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">1.2 hari</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
