import React, { useState } from 'react';
import {
  FileCheck2,
  FileSpreadsheet,
  BarChart2,
  Table,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  XCircle,
  Inbox,
  ArrowUpDown,
} from 'lucide-react';
import {
  PTSP_DATASET_7_DAFTAR_PERIZINAN,
  PTSP_DATASET_16_DAFTAR_NON_PERIZINAN,
  PtspDaftarPerizinanItem,
  PtspDaftarNonPerizinanItem,
} from '../../data/ptspData';

interface PtspPerizinanSheetSwapSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspPerizinanSheetSwapSection: React.FC<PtspPerizinanSheetSwapSectionProps> = ({
  onExplainKpi,
}) => {
  // Sheet Swap State: 'perizinan' (Poin 8, Dataset 7) OR 'non_perizinan' (Poin 9, Dataset 16)
  const [activeSheet, setActiveSheet] = useState<'perizinan' | 'non_perizinan'>('perizinan');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [searchQuery, setSearchQuery] = useState('');

  // Perizinan Data (Dataset 7)
  const perizinanData = PTSP_DATASET_7_DAFTAR_PERIZINAN.filter((item) =>
    item.jenisPerizinan.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPerizinanMasuk = perizinanData.reduce((acc, curr) => acc + curr.masuk, 0);
  const totalPerizinanSelesai = perizinanData.reduce((acc, curr) => acc + curr.selesai, 0);
  const totalPerizinanProses = perizinanData.reduce((acc, curr) => acc + curr.proses, 0);
  const totalPerizinanDitolak = perizinanData.reduce((acc, curr) => acc + curr.ditolak, 0);
  const maxPerizinanMasuk = Math.max(...perizinanData.map((d) => d.masuk), 1);

  // Non-Perizinan Data (Dataset 16)
  const nonPerizinanData = PTSP_DATASET_16_DAFTAR_NON_PERIZINAN.filter((item) =>
    item.jenisNonPerizinan.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalNonPerizinanMasuk = nonPerizinanData.reduce((acc, curr) => acc + curr.masuk, 0);
  const totalNonPerizinanSelesai = nonPerizinanData.reduce((acc, curr) => acc + curr.selesai, 0);
  const totalNonPerizinanProses = nonPerizinanData.reduce((acc, curr) => acc + curr.proses, 0);
  const totalNonPerizinanDitolak = nonPerizinanData.reduce((acc, curr) => acc + curr.ditolak, 0);
  const maxNonPerizinanMasuk = Math.max(...nonPerizinanData.map((d) => d.masuk), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Container with Sheet Swap Switcher */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3" />
              POIN #10 • SHEET SWAP VIEW
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
              Visualisasi: Sheet Swap Stacked Bar Chart &amp; Tabel Monitoring Status Berkas
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mt-0.5">
            {activeSheet === 'perizinan' ? (
              <>
                <FileCheck2 className="w-4 h-4 text-[#002B49]" />
                Daftar Perizinan BP Batam (Poin #8 • Dataset 7)
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4 text-[#002B49]" />
                Daftar Non Perizinan BP Batam (Poin #9 • Dataset 16)
              </>
            )}
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
              {activeSheet === 'perizinan' ? (
                <>
                  Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>JENIS PERIZINAN</strong>, <strong>MASUK</strong>, <strong>DITOLAK</strong>, <strong>PROSES</strong>, <strong>SELESAI</strong>, &amp; <strong>TINGKAT TERBIT (%)</strong> (Hal. 27)
                </>
              ) : (
                <>
                  Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>JENIS NON PERIZINAN</strong>, <strong>MASUK</strong>, <strong>DITOLAK</strong>, <strong>PROSES</strong>, &amp; <strong>SELESAI</strong> (Hal. 30)
                </>
              )}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {activeSheet === 'perizinan'
              ? 'Monitoring status berkas izin: Masuk, Ditolak, Proses, dan Selesai (Dataset 7)'
              : 'Monitoring status layanan administrasi non-perizinan: Masuk, Ditolak, Proses, dan Selesai (Dataset 16)'}
          </p>
        </div>

        {/* Sheet Swap Controller & View Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* SHEET SWAP BUTTONS (POIN 10) */}
          <div className="flex items-center bg-blue-50/70 p-1 rounded-lg border border-blue-200">
            <button
              onClick={() => setActiveSheet('perizinan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'perizinan'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-blue-900 hover:bg-blue-100/60'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Daftar Perizinan (Dataset 7)</span>
            </button>
            <button
              onClick={() => setActiveSheet('non_perizinan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeSheet === 'non_perizinan'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-blue-900 hover:bg-blue-100/60'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Daftar Non Perizinan (Dataset 16)</span>
            </button>
          </div>

          {/* Chart / Table View Mode */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
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
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
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

      {/* Summary KPI Strip for Active Sheet */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-600">
            Rekap Status:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-slate-500">Masuk:</span>
            <strong className="font-mono text-slate-800">
              {(activeSheet === 'perizinan' ? totalPerizinanMasuk : totalNonPerizinanMasuk).toLocaleString('id-ID')}
            </strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">Selesai:</span>
            <strong className="font-mono text-emerald-700">
              {(activeSheet === 'perizinan' ? totalPerizinanSelesai : totalNonPerizinanSelesai).toLocaleString('id-ID')}
            </strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-slate-500">Proses:</span>
            <strong className="font-mono text-amber-700">
              {(activeSheet === 'perizinan' ? totalPerizinanProses : totalNonPerizinanProses).toLocaleString('id-ID')}
            </strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-slate-500">Ditolak:</span>
            <strong className="font-mono text-rose-700">
              {(activeSheet === 'perizinan' ? totalPerizinanDitolak : totalNonPerizinanDitolak).toLocaleString('id-ID')}
            </strong>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-medium">
          Tingkat Penyelesaian Selesai:{' '}
          <strong className="text-emerald-700 font-mono">
            {activeSheet === 'perizinan'
              ? ((totalPerizinanSelesai / totalPerizinanMasuk) * 100).toFixed(1)
              : ((totalNonPerizinanSelesai / totalNonPerizinanMasuk) * 100).toFixed(1)}
            %
          </strong>
        </div>
      </div>

      {/* Sheet Content Area */}
      <div className="p-4">
        {activeSheet === 'perizinan' ? (
          /* ================= SHEET 1: DAFTAR PERIZINAN (DATASET 7) ================= */
          viewMode === 'chart' ? (
            <div className="space-y-2.5">
              {perizinanData.map((item) => {
                const selesaiPercent = Math.round((item.selesai / item.masuk) * 100);
                const prosesPercent = Math.round((item.proses / item.masuk) * 100);
                const tolakPercent = Math.round((item.ditolak / item.masuk) * 100);

                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.jenisPerizinan}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          {item.persentaseSelesai}% Selesai
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-600">
                          Masuk: <strong className="text-slate-900">{item.masuk.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Selesai: <strong>{item.selesai.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-amber-700">
                          Proses: <strong>{item.proses.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-rose-700">
                          Ditolak: <strong>{item.ditolak.toLocaleString('id-ID')}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Tight Segmented Status Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex shadow-inner">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500 rounded-l-full"
                        style={{ width: `${(item.selesai / item.masuk) * 100}%` }}
                        title={`Selesai: ${item.selesai.toLocaleString('id-ID')} (${item.persentaseSelesai}%)`}
                      />
                      <div
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: `${(item.proses / item.masuk) * 100}%` }}
                        title={`Proses: ${item.proses.toLocaleString('id-ID')}`}
                      />
                      <div
                        className="bg-rose-500 h-full transition-all duration-500 rounded-r-full"
                        style={{ width: `${(item.ditolak / item.masuk) * 100}%` }}
                        title={`Ditolak: ${item.ditolak.toLocaleString('id-ID')}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Jenis Perizinan</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Masuk</th>
                    <th className="py-2.5 px-3 font-semibold text-right text-emerald-700">Selesai</th>
                    <th className="py-2.5 px-3 font-semibold text-right text-amber-700">Proses</th>
                    <th className="py-2.5 px-3 font-semibold text-right text-rose-700">Ditolak</th>
                    <th className="py-2.5 px-3 font-semibold text-right">% Selesai</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Avg SLA (Hari)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {perizinanData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{item.jenisPerizinan}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {item.masuk.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                        {item.selesai.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-600">
                        {item.proses.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-600">
                        {item.ditolak.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.persentaseSelesai}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {item.slaRataRataHari} hari
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                  <tr>
                    <td className="py-2.5 px-3">Total Akumulasi Perizinan</td>
                    <td className="py-2.5 px-3 text-right font-mono">{totalPerizinanMasuk.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-600">{totalPerizinanSelesai.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-600">{totalPerizinanProses.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-600">{totalPerizinanDitolak.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                      {((totalPerizinanSelesai / totalPerizinanMasuk) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">2.1 hari</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        ) : (
          /* ================= SHEET 2: DAFTAR NON PERIZINAN (DATASET 16) ================= */
          viewMode === 'chart' ? (
            <div className="space-y-2.5">
              {nonPerizinanData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{item.jenisNonPerizinan}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                          {item.unitPelayanan}
                        </span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          {item.persentaseSelesai}% Selesai
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-slate-600">
                          Masuk: <strong className="text-slate-900">{item.masuk.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-emerald-700">
                          Selesai: <strong>{item.selesai.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-amber-700">
                          Proses: <strong>{item.proses.toLocaleString('id-ID')}</strong>
                        </span>
                        <span className="text-rose-700">
                          Ditolak: <strong>{item.ditolak.toLocaleString('id-ID')}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Tight Segmented Status Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex shadow-inner">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500 rounded-l-full"
                        style={{ width: `${(item.selesai / item.masuk) * 100}%` }}
                        title={`Selesai: ${item.selesai.toLocaleString('id-ID')} (${item.persentaseSelesai}%)`}
                      />
                      <div
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: `${(item.proses / item.masuk) * 100}%` }}
                        title={`Proses: ${item.proses.toLocaleString('id-ID')}`}
                      />
                      <div
                        className="bg-rose-500 h-full transition-all duration-500 rounded-r-full"
                        style={{ width: `${(item.ditolak / item.masuk) * 100}%` }}
                        title={`Ditolak: ${item.ditolak.toLocaleString('id-ID')}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Jenis Non Perizinan</th>
                    <th className="py-2.5 px-3 font-semibold">Unit Pelayanan</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Masuk</th>
                    <th className="py-2.5 px-3 font-semibold text-right text-emerald-700">Selesai</th>
                    <th className="py-2.5 px-3 font-semibold text-right text-amber-700">Proses</th>
                    <th className="py-2.5 px-3 font-semibold text-right text-rose-700">Ditolak</th>
                    <th className="py-2.5 px-3 font-semibold text-right">% Selesai</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Avg SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {nonPerizinanData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{item.jenisNonPerizinan}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.unitPelayanan}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {item.masuk.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                        {item.selesai.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-600">
                        {item.proses.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-600">
                        {item.ditolak.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.persentaseSelesai}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {item.slaRataRataHari} hari
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                  <tr>
                    <td className="py-2.5 px-3">Total Akumulasi Non Perizinan</td>
                    <td className="py-2.5 px-3">-</td>
                    <td className="py-2.5 px-3 text-right font-mono">{totalNonPerizinanMasuk.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-600">{totalNonPerizinanSelesai.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-600">{totalNonPerizinanProses.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-600">{totalNonPerizinanDitolak.toLocaleString('id-ID')}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700">
                      {((totalNonPerizinanSelesai / totalNonPerizinanMasuk) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">1.3 hari</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};
