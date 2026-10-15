import React, { useState, useMemo } from 'react';
import {
  FileText,
  TrendingUp,
  Download,
  Search,
  CheckCircle2,
  Table as TableIcon,
  BarChart3,
  Layers,
  Coins,
  Scale,
  Activity,
  ArrowRight,
  ChevronRight,
  Calendar,
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
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  LO_BLU_DATA,
  LPE_BLU_DATA,
  LAK_BLU_DATA,
  NERACA_BLU_DATA,
  KONSOLIDASI_4_LAPORAN_DATA,
  FinansialItem,
} from './keuanganData';
import { KeuanganVisualHeader } from './KeuanganVisualHeader';

interface LaporanFinansialBlu4WayCardProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

type FinancialSheetMode = 'gabungan' | 'lo' | 'lpe' | 'lak' | 'neraca';

export const LaporanFinansialBlu4WayCard: React.FC<LaporanFinansialBlu4WayCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<FinancialSheetMode>('lo');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formatTriliunMiliar = (val: number) => {
    const abs = Math.abs(val);
    const sign = val < 0 ? '-' : '';
    if (abs >= 1e12) {
      return `${sign}Rp ${(abs / 1e12).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;
    }
    return `${sign}Rp ${(abs / 1e9).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;
  };

  // Metadata based on activeSheet
  const currentSheetMeta = useMemo(() => {
    switch (activeSheet) {
      case 'gabungan':
        return {
          datasetNumber: '2-6',
          pdfPages: 'Hal. 2-3',
          title: 'KONSOLIDASI 4 LAPORAN POKOK FINANSIAL BADAN LAYANAN UMUM (BLU)',
          visualName: 'Komparasi Terpadu Hasil Nilai Tahun Baru & Persentase Pertumbuhan (Sheet Swap)',
          attributes: [
            'LAPORAN POKOK',
            'INDIKATOR UTAMA',
            'NILAI TAHUN BARU',
            'NILAI TAHUN SEBELUM',
            'KENAIKAN / PENURUNAN',
            'PERSENTASE (%)',
          ],
        };
      case 'lo':
        return {
          datasetNumber: 2,
          pdfPages: 'Hal. 2-3',
          title: 'LAPORAN OPERASIONAL BADAN LAYANAN UMUM (LO BLU)',
          visualName: 'Grafik Batang Komparasi Beban & Pendapatan Operasional Serta Surplus LO',
          attributes: [
            'URAIAN',
            'PERIODE BARU',
            'NILAI PERIODE BARU',
            'NILAI PERIODE SEBELUM',
            'PERSENTASE (%)',
          ],
        };
      case 'lpe':
        return {
          datasetNumber: 4,
          pdfPages: 'Hal. 3',
          title: 'LAPORAN PERUBAHAN EKUITAS BADAN LAYANAN UMUM (LPE BLU)',
          visualName: 'Waterfall Chart Komparasi Mutasi Ekuitas & Revaluasi Aset BMN',
          attributes: [
            'URAIAN',
            'PERIODE BARU',
            'NILAI PERIODE BARU',
            'NILAI PERIODE SEBELUM',
            'PERSENTASE (%)',
          ],
        };
      case 'lak':
        return {
          datasetNumber: 5,
          pdfPages: 'Hal. 3',
          title: 'LAPORAN ARUS KAS BADAN LAYANAN UMUM (LAK BLU)',
          visualName: 'Cascade Bar Chart Arus Kas Bersih Operasi, Investasi & Kas Akhir',
          attributes: [
            'URAIAN',
            'PERIODE BARU',
            'NILAI PERIODE BARU',
            'NILAI PERIODE SEBELUM',
            'PERSENTASE (%)',
          ],
        };
      case 'neraca':
        return {
          datasetNumber: 6,
          pdfPages: 'Hal. 3',
          title: 'LAPORAN NERACA BADAN LAYANAN UMUM (NERACA BLU)',
          visualName: 'Horizontal Stacked Posisi Aset Lancar, Aset Tetap, Utang & Ekuitas',
          attributes: [
            'URAIAN',
            'NILAI TAHUN BARU',
            'NILAI TAHUN SEBELUMNYA',
            'PERSENTASE (%)',
          ],
        };
    }
  }, [activeSheet]);

  // Active items list for table/search
  const currentDatasetItems: FinansialItem[] = useMemo(() => {
    switch (activeSheet) {
      case 'lo':
        return LO_BLU_DATA;
      case 'lpe':
        return LPE_BLU_DATA;
      case 'lak':
        return LAK_BLU_DATA;
      case 'neraca':
        return NERACA_BLU_DATA;
      default:
        return [];
    }
  }, [activeSheet]);

  const filteredDatasetItems = useMemo(() => {
    if (!searchQuery.trim()) return currentDatasetItems;
    const q = searchQuery.toLowerCase().trim();
    return currentDatasetItems.filter((item) =>
      item.uraian.toLowerCase().includes(q)
    );
  }, [currentDatasetItems, searchQuery]);

  // Chart data for active sheet
  const activeChartData = useMemo(() => {
    if (activeSheet === 'gabungan') {
      return KONSOLIDASI_4_LAPORAN_DATA.map((k) => ({
        name: k.laporan.replace(' Badan Layanan Umum (BLU)', '').replace(' BLU', ''),
        fullName: k.laporan,
        indikator: k.indikatorUtama,
        nilai2026M: Math.round(k.nilaiTahunBaru / 1e9),
        nilai2025M: Math.round(k.nilaiTahunSebelum / 1e9),
        persen: k.persentase,
        color: k.color,
      }));
    }
    return currentDatasetItems
      .filter((d) => !d.isTotal || activeSheet === 'neraca')
      .slice(0, 6)
      .map((d) => ({
        name: d.uraian.length > 25 ? d.uraian.substring(0, 23) + '...' : d.uraian,
        fullName: d.uraian,
        nilaiBaruM: Math.round(d.nilaiPeriodeBaru / 1e9),
        nilaiSebelumM: Math.round(d.nilaiPeriodeSebelum / 1e9),
        persen: d.persentase,
      }));
  }, [activeSheet, currentDatasetItems]);

  // Export CSV
  const handleExportCsv = () => {
    let headers: string[] = [];
    let rows: any[][] = [];

    if (activeSheet === 'gabungan') {
      headers = [
        'Laporan Finansial',
        'Indikator Utama',
        'Periode Baru',
        'Nilai Tahun Baru (Rp)',
        'Nilai Tahun Sebelum (Rp)',
        'Kenaikan (Rp)',
        'Persentase (%)',
      ];
      rows = KONSOLIDASI_4_LAPORAN_DATA.map((k) => [
        `"${k.laporan}"`,
        `"${k.indikatorUtama}"`,
        `"${k.periodeBaru}"`,
        k.nilaiTahunBaru,
        k.nilaiTahunSebelum,
        k.kenaikan,
        k.persentase,
      ]);
    } else {
      headers = [
        'Uraian',
        'Nilai Periode Baru (Rp)',
        'Nilai Periode Sebelum (Rp)',
        'Selisih (Rp)',
        'Persentase (%)',
      ];
      rows = currentDatasetItems.map((item) => [
        `"${item.uraian}"`,
        item.nilaiPeriodeBaru,
        item.nilaiPeriodeSebelum,
        item.nilaiKenaikanPenurunan,
        item.persentase,
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LAPORAN_${activeSheet.toUpperCase()}_BLU_BP_BATAM.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col font-sans">
      {/* Standard Header */}
      <div className="p-4 pb-0">
        <KeuanganVisualHeader
          datasetNumber={currentSheetMeta.datasetNumber}
          pdfPages={currentSheetMeta.pdfPages}
          classification="TERTUTUP"
          periode="PERTRIWULAN"
          title={currentSheetMeta.title}
          visualName={currentSheetMeta.visualName}
          attributes={currentSheetMeta.attributes}
          onOpenFormula={() =>
            onOpenFormulaModal && onOpenFormulaModal(`finansial_${activeSheet}`)
          }
          rightControls={
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Sheet Swap Controls for Requirements 2-5 & 6 */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  onClick={() => setActiveSheet('lo')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'lo'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Operasional (LO)
                </button>
                <button
                  onClick={() => setActiveSheet('lpe')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'lpe'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Perubahan Ekuitas (LPE)
                </button>
                <button
                  onClick={() => setActiveSheet('lak')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'lak'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Arus Kas (LAK)
                </button>
                <button
                  onClick={() => setActiveSheet('neraca')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeSheet === 'neraca'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Neraca BLU
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCsv}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Unduh Data CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          }
        />
      </div>

      {/* KPI Highlights for the 4 Statements */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 bg-slate-50/70 border-b border-slate-200 text-xs">
        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Surplus LO (Operasi)</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
              +13.1% YoY
            </span>
          </div>
          <div className="text-base font-bold text-sky-700">
            {formatTriliunMiliar(346136364875)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Semester I 2026 (2025: Rp 306,00 M)
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Ekuitas Akhir (LPE)</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              +8.2% YoY
            </span>
          </div>
          <div className="text-base font-bold text-emerald-700">
            {formatTriliunMiliar(21914652079496)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Bertambah Rp 1,67 Triliun
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Saldo Kas Akhir (LAK)</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
              +13.9% YoY
            </span>
          </div>
          <div className="text-base font-bold text-amber-700">
            {formatTriliunMiliar(1852906100254)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Kenaikan Kas Bersih: +Rp 357,09 M
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Aset (Neraca)</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
              +1.7% YoY
            </span>
          </div>
          <div className="text-base font-bold text-indigo-700">
            {formatTriliunMiliar(22197296100254)}
          </div>
          <div className="text-[10.5px] text-slate-500 mt-0.5">
            Aset Lancar: {formatTriliunMiliar(2353936100254)}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-3">
        {activeSheet === 'gabungan' ? (
          /* SHEET SWAP: POINT 6 - Visualisasi Gabungan 4 Laporan */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Perbandingan Indikator Pokok: Nilai Tahun Baru 2026 vs Tahun Sebelumnya 2025 &amp; Persentase Pertumbuhan
              </span>
              <span className="text-[10.5px] font-mono text-slate-500">
                Terpadu Sesuai Standar Akuntansi BLU (SAP)
              </span>
            </div>

            {/* 4 Cards Grid with Visual Bar & Percent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {KONSOLIDASI_4_LAPORAN_DATA.map((k) => (
                <div
                  key={k.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{k.laporan}</span>
                    <button
                      onClick={() => setActiveSheet(k.id as FinancialSheetMode)}
                      className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      Buka Rincian <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 mb-1">
                    Indikator: <span className="font-semibold text-slate-700">{k.indikatorUtama}</span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-lg font-bold text-slate-900">
                        {formatTriliunMiliar(k.nilaiTahunBaru)}
                      </div>
                      <div className="text-[10.5px] text-slate-500 font-mono">
                        Sebelum: {formatTriliunMiliar(k.nilaiTahunSebelum)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                        +{k.persentase}%
                      </span>
                      <div className="text-[10px] text-emerald-700 mt-0.5">
                        +{formatTriliunMiliar(k.kenaikan)}
                      </div>
                    </div>
                  </div>

                  {/* Visual Bar representation */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/80">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono">
                      <span>TA 2025</span>
                      <span>TA 2026 (Tahun Baru)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div
                        className="bg-slate-400 h-full"
                        style={{ width: '47%' }}
                        title="Tahun 2025"
                      />
                      <div
                        className="h-full rounded-r-full"
                        style={{ width: '53%', backgroundColor: k.color }}
                        title="Tahun 2026"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Consolidated Summary Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Laporan Keuangan</th>
                      <th className="py-2.5 px-3">Indikator Kunci</th>
                      <th className="py-2.5 px-3 text-right">Nilai Tahun Baru (2026)</th>
                      <th className="py-2.5 px-3 text-right">Nilai Sebelumnya (2025)</th>
                      <th className="py-2.5 px-3 text-right">Kenaikan / Pertumbuhan</th>
                      <th className="py-2.5 px-3 text-center">Aksi Lembar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {KONSOLIDASI_4_LAPORAN_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-sans font-bold text-slate-900">
                          {row.laporan}
                        </td>
                        <td className="py-2 px-3 font-sans text-slate-600">{row.indikatorUtama}</td>
                        <td className="py-2 px-3 text-right font-bold text-sky-700">
                          {row.nilaiTahunBaru.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right text-slate-600">
                          {row.nilaiTahunSebelum.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700">
                          +{row.persentase}%
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => setActiveSheet(row.id as FinancialSheetMode)}
                            className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 text-[11px] font-sans font-medium cursor-pointer"
                          >
                            Buka Sheet
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* INDIVIDUAL REPORT SHEET (LO, LPE, LAK, NERACA) */
          <div className="space-y-3">
            {/* Chart for the individual statement */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-800">
                Visualisasi Nilai: Periode Baru (2026) vs Periode Sebelumnya (2025) - Satuan Miliar Rp
              </span>
              <button
                onClick={() => setActiveSheet('gabungan')}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 cursor-pointer"
              >
                ← Kembali ke Ringkasan Gabungan
              </button>
            </div>

            <div className="h-[220px] w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeChartData} margin={{ top: 10, right: 15, left: 10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#475569', fontSize: 10.5 }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10.5 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                    formatter={(val: any, name: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')} Miliar`,
                      name === 'nilaiBaruM' ? 'Periode Baru (2026)' : 'Periode Sebelum (2025)',
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={26}
                    formatter={(val) => (
                      <span className="text-xs font-semibold text-slate-700">
                        {val === 'nilaiBaruM' ? 'Periode Baru (2026)' : 'Periode Sebelum (2025)'}
                      </span>
                    )}
                  />
                  <Bar dataKey="nilaiBaruM" name="nilaiBaruM" fill="#0284C7" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="nilaiSebelumM" name="nilaiSebelumM" fill="#94A3B8" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table of the report */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800">
                  Tabel Rincian Akun &amp; Kenaikan/Penurunan (Satu Data Hal. 2-3)
                </span>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari uraian..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 w-52 sm:w-64"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="overflow-x-auto max-h-[320px]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Uraian Akun Finansial</th>
                        <th className="py-2.5 px-3 text-right">Nilai Periode Baru (Rp)</th>
                        <th className="py-2.5 px-3 text-right">Nilai Sebelum (Rp)</th>
                        <th className="py-2.5 px-3 text-right">Kenaikan / Penurunan (Rp)</th>
                        <th className="py-2.5 px-3 text-right">% Pertumbuhan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {filteredDatasetItems.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-50 transition-colors ${
                            item.isTotal ? 'bg-slate-50/80 font-bold border-t border-slate-200' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                            {item.uraian}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-sky-700">
                            {item.nilaiPeriodeBaru.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-600">
                            {item.nilaiPeriodeSebelum.toLocaleString('id-ID')}
                          </td>
                          <td
                            className={`py-2 px-3 text-right ${
                              item.nilaiKenaikanPenurunan >= 0 ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {item.nilaiKenaikanPenurunan >= 0 ? '+' : ''}
                            {item.nilaiKenaikanPenurunan.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-3 text-right font-bold">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] ${
                                item.persentase >= 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {item.persentase >= 0 ? '+' : ''}
                              {item.persentase}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          <strong>Standar Akuntansi Pemerintah (SAP) Berbasis Akrual:</strong> LO, LPE, LAK, dan Neraca
          terhubung secara sistematis dengan jurnal penutup dan mutasi kas BLU.
        </span>
        <span className="text-slate-600 font-medium">Buku Satu Data BP Batam Hal. 2-3 Item 2, 4, 5, 6</span>
      </div>
    </div>
  );
};
