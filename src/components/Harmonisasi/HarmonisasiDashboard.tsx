import React, { useState } from 'react';
import {
  Compass,
  FileCheck,
  Scale,
  Award,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  PHKS_IKK_POLICIES,
  PHKS_TARIF_LAYANAN,
  PHKS_SINKRONISASI_REGULASI,
  PHKS_SURVEI_KEWAJARAN,
  PhksTarifLayananDetail,
} from '../../data/harmonisasiData';
import { PusatHarmonisasiDeepDive } from '../KebijakanStrategis/PusatHarmonisasiDeepDive';

interface HarmonisasiDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const HarmonisasiDashboard: React.FC<HarmonisasiDashboardProps> = ({
  activeSubTab = 'deep-dive',
  onOpenFormulaModal,
  onOpenExportModal,
}) => {
  const [currentTab, setCurrentTab] = useState<'deep-dive' | 'ikk' | 'tarif' | 'regulasi' | 'survei'>(
    (activeSubTab as any) || 'deep-dive'
  );
  const [selectedTarifUnit, setSelectedTarifUnit] = useState<string>('ALL');
  const [tarifSearch, setTarifSearch] = useState('');

  const filteredTarif = PHKS_TARIF_LAYANAN.filter((t) => {
    const matchesUnit = selectedTarifUnit === 'ALL' || t.unit.toLowerCase().includes(selectedTarifUnit.toLowerCase());
    const matchesSearch =
      tarifSearch === '' ||
      t.layanan.toLowerCase().includes(tarifSearch.toLowerCase()) ||
      t.level3.toLowerCase().includes(tarifSearch.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  // 4 Dimensi IKK chart data
  const ikkDimensiChartData = [
    { dimensi: 'Agenda Setting', skor: 75.0, target: 65.0, fullMark: 100 },
    { dimensi: 'Formulasi Kebijakan', skor: 72.5, target: 65.0, fullMark: 100 },
    { dimensi: 'Implementasi', skor: 68.0, target: 65.0, fullMark: 100 },
    { dimensi: 'Evaluasi & Manfaat', skor: 71.7, target: 65.0, fullMark: 100 },
  ];

  // Tarif visual comparison per Unit (Rata-rata Cost vs Tarif)
  const tarifUnitSummary = [
    { unit: 'Pelabuhan', tarifAvg: 185000, costAvg: 172000, validitas: 92 },
    { unit: 'RSBP', tarifAvg: 450000, costAvg: 410000, validitas: 94 },
    { unit: 'SPAM / Air', tarifAvg: 38000, costAvg: 35000, validitas: 88 },
    { unit: 'Lahan', tarifAvg: 290000, costAvg: 260000, validitas: 89 },
    { unit: 'Bandara', tarifAvg: 145000, costAvg: 138000, validitas: 91 },
  ];

  // Regulasi Status chart data
  const regulasiStatusData = [
    { name: 'Harmonis Selesai', count: 34, color: '#10B981' },
    { name: 'Dalam Pembahasan', count: 5, color: '#0284C7' },
    { name: 'Reviu Antar-Instansi', count: 3, color: '#F59E0B' },
  ];

  // Survei Kewajaran data
  const surveiChartData = PHKS_SURVEI_KEWAJARAN.map((s) => ({
    lokasi: s.lokasi.replace('Kawasan ', ''),
    wajar: s.persentaseWajar,
    responden: s.jumlahResponden,
  }));

  return (
    <div className="space-y-4 font-sans select-none pb-12">
      {/* 4 Summary Cards for PHKS with Official Satu Data Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => onOpenFormulaModal && onOpenFormulaModal('ikp-2-kebijakan')}
          className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 hover:border-indigo-400 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Indeks Kualitas Kebijakan</span>
            <span className="text-[9px] font-mono text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 font-bold">
              Data PHKS No. 1
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-indigo-700">71.80 / 100</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">Cukup Baik (LAN RI Standard)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Sinkronisasi Eksternal</span>
            <span className="text-[9px] font-mono text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 font-bold">
              Data PHKS No. 2
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">94.4% Selaras</div>
          <span className="text-[10.5px] font-semibold text-emerald-600 block">Harmonisasi K/L &amp; PP 41/2021</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Daftar Tarif Layanan</span>
            <span className="text-[9px] font-mono text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 font-bold">
              Data PHKS No. 3
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">7 Level Tarif</div>
          <span className="text-[10.5px] font-semibold text-slate-500 block">Unit Cost vs Tarif Berlaku</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Regulasi Internal BP Batam</span>
            <span className="text-[9px] font-mono text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 font-bold">
              Data PHKS No. 4
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">42 Produk Hukum</div>
          <span className="text-[10.5px] font-semibold text-teal-600 block">Perka &amp; Kepka Harmonis</span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setCurrentTab('deep-dive')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'deep-dive' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Visualisasi 6-Grid Satu Data BP Batam</span>
        </button>
        <button
          onClick={() => setCurrentTab('ikk')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'ikk' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>4 Dimensi IKK &amp; Kebijakan (DS 1)</span>
        </button>
        <button
          onClick={() => setCurrentTab('tarif')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'tarif' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>7 Level Tarif Layanan &amp; Unit Cost (DS 3)</span>
        </button>
        <button
          onClick={() => setCurrentTab('regulasi')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'regulasi' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Sinkronisasi Regulasi Eksternal &amp; Internal (DS 2 &amp; 4)</span>
        </button>
        <button
          onClick={() => setCurrentTab('survei')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentTab === 'survei' ? 'bg-[#002B49] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Survei Kewajaran &amp; Evaluasi Tarif (DS 5)</span>
        </button>
      </div>

      {/* Tab 0: Visualisasi 6-Grid Satu Data BP Batam */}
      {currentTab === 'deep-dive' && (
        <div className="pt-1">
          <PusatHarmonisasiDeepDive />
        </div>
      )}

      {/* Tab 1: IKK 4 Dimensi Policy Evaluation + Compact Visual Chart */}
      {currentTab === 'ikk' && (
        <div className="space-y-4">
          {/* Compact Chart: 4 Dimensi IKK vs Target LAN RI */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs sm:text-sm font-black uppercase text-slate-900">
                  Visualisasi 4 Dimensi Indeks Kualitas Kebijakan (IKK: 71.80)
                </h3>
              </div>
              <span className="text-[9.5px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Data PHKS No. 1 (Satu Data)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-3">
              {/* Compact Bar Chart (Height 170px) */}
              <div className="lg:col-span-8 h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ikkDimensiChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="dimensi" tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                    <Tooltip formatter={(val: any) => [`${val} Poin`, 'Skor']} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                    <Bar dataKey="skor" fill="#6366F1" name="Skor Riil Dimensi" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="#CBD5E1" name="Standar Target LAN (65.0)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Metrics */}
              <div className="lg:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                  Evaluasi Kualitas Kebijakan:
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Skor Konsolidasi:</span>
                  <span className="font-mono font-black text-indigo-700">71.80 / 100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Kategori:</span>
                  <span className="font-bold text-emerald-700">Cukup Baik (Melampaui Target)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Dimensi Tertinggi:</span>
                  <span className="font-bold text-slate-800">Agenda Setting (75.0)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-900">
              Evaluasi 5 Sampel Kebijakan Utama BP Batam (Standar LAN RI)
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Nomor Perka / Kepka</th>
                    <th className="py-2.5 px-3">Nama Kebijakan Strategis</th>
                    <th className="py-2.5 px-2">Penetapan</th>
                    <th className="py-2.5 px-2">MAK</th>
                    <th className="py-2.5 px-3">Analis Instansi</th>
                    <th className="py-2.5 px-2 text-right">Skor IKK</th>
                    <th className="py-2.5 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {PHKS_IKK_POLICIES.map((p) => (
                    <tr key={p.nomor} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-800">{p.nomor}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-900 block">{p.namaKebijakan}</span>
                        <span className="text-[10px] text-slate-500">Dimensi Unggul: {p.dimensiUnggul}</span>
                      </td>
                      <td className="py-2.5 px-2 font-mono text-slate-500">{p.tahunPenetapan}</td>
                      <td className="py-2.5 px-2 font-mono text-slate-600">{p.mak}</td>
                      <td className="py-2.5 px-3 text-slate-700">{p.analisInstansi}</td>
                      <td className="py-2.5 px-2 text-right font-mono font-black text-indigo-700">{p.skorIkk}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${
                            p.status === 'Efektif'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 7 Level Tarif Layanan + Compact Chart */}
      {currentTab === 'tarif' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Daftar Tarif Layanan 7 Level Hierarki BP Batam (Evaluasi PMK &amp; Cost-Recovery)
              </h3>
              <p className="text-[11px] text-slate-500">
                Meliputi Kepelabuhanan, RSBP, SPAM &amp; KPLI, Lahan Industri, dan Kebandaraan.
              </p>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Data PHKS No. 3 (Satu Data)
            </span>
          </div>

          {/* Compact Chart: Rata-rata Validitas Tarif per Unit BU */}
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tarifUnitSummary} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="unit" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Tingkat Validitas & Kewajaran']} />
                  <Bar dataKey="validitas" fill="#0D9488" name="Tingkat Validitas Biaya Riil (%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select
                value={selectedTarifUnit}
                onChange={(e) => setSelectedTarifUnit(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800"
              >
                <option value="ALL">Semua Unit Layanan</option>
                <option value="Pelabuhan">Badan Usaha Pelabuhan</option>
                <option value="Rumah Sakit">Rumah Sakit (RSBP)</option>
                <option value="SPAM">BU SPAM &amp; Lingkungan (KPLI)</option>
                <option value="Lahan">Direktorat Lahan</option>
                <option value="Bandara">Badan Usaha Bandara</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari layanan tarif..."
                  value={tarifSearch}
                  onChange={(e) => setTarifSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Unit Pelaksana</th>
                  <th className="py-2.5 px-3">Nama Layanan &amp; Hierarki Level 1-7</th>
                  <th className="py-2.5 px-2">Satuan</th>
                  <th className="py-2.5 px-3 text-right">Unit Cost Riil</th>
                  <th className="py-2.5 px-3 text-right">Tarif Berlaku</th>
                  <th className="py-2.5 px-3 text-right">Plafon Maksimal</th>
                  <th className="py-2.5 px-3">Dasar Regulasi</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredTarif.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{t.unit}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Tahun: {t.tahun}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block">{t.layanan}</span>
                      <span className="text-[10px] text-slate-500 block">
                        Level: {t.level1} → {t.level2} → {t.level3} → {t.level7}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 font-mono">{t.satuanLayanan}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      Rp {t.unitCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-800">
                      Rp {t.tarifBerlaku.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                      Rp {t.tarifBerlakuMaksimal.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3 text-[10.5px] text-slate-600">{t.dasarHukum}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
                        {t.statusTarif}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Sinkronisasi Regulasi + Compact Chart */}
      {currentTab === 'regulasi' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Pipeline Regulasi &amp; Sinkronisasi Kebijakan (42 Produk Hukum)
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Harmonisasi Vertikal UU Ciptaker / PP 41/2021</span>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Data PHKS No. 4 (Satu Data)
            </span>
          </div>

          {/* Compact Chart: Status Regulasi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="lg:col-span-6 h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regulasiStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`${val} Produk Hukum`, 'Jumlah']} />
                  <Bar dataKey="count" name="Jumlah Produk Hukum" radius={[4, 4, 0, 0]}>
                    {regulasiStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-6 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Status Harmonisasi:</span>
                <span className="text-base font-black font-mono">34 Regulasi Harmonis (81.0%)</span>
                <p className="text-[10px] text-emerald-800 mt-0.5">Sesuai ketentuan perundang-undangan kawasan bebas Batam.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dalam Tahapan Pembahasan:</span>
                <span className="font-bold text-slate-800">5 Perka Proses Konsultasi Teknis &amp; 3 Reviu</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Nomor Regulasi</th>
                  <th className="py-2.5 px-3">Tentang Regulasi</th>
                  <th className="py-2.5 px-2">Kategori</th>
                  <th className="py-2.5 px-2">Jenis</th>
                  <th className="py-2.5 px-3">Catatan Harmonisasi</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {PHKS_SINKRONISASI_REGULASI.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-800">{r.nomor}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{r.tentang}</td>
                    <td className="py-2.5 px-2 text-slate-600">{r.kategori}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                        {r.jenis}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[10.5px] text-slate-600">{r.catatanHarmonisasi}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded border ${
                          r.status === 'Harmonis'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Survei Kewajaran & Evaluasi Tarif (Dataset No. 5) */}
      {currentTab === 'survei' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900">
                Survei Kewajaran dan Evaluasi Tarif Layanan BLU BP Batam
              </h3>
              <p className="text-[11px] text-slate-500">
                Tingkat Penerimaan Wajar Publik Berdasarkan Instrumen Survei ATP/WTP &amp; Cost-Recovery Unit Cost
              </p>
            </div>
            <span className="text-[9.5px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Data PHKS No. 5 (Satu Data Hal. 13)
            </span>
          </div>

          {/* Formula Explanation Callout Box */}
          <div className="p-3 bg-linear-to-r from-indigo-50/80 to-sky-50/80 rounded-xl border border-indigo-200/70 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-900 font-bold">
              <Scale className="w-4 h-4 text-indigo-700" />
              <span>Metodologi &amp; Formula Perhitungan Skor Kewajaran Tarif (Data No. 3 &amp; No. 5):</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Skor Kewajaran dihitung melalui 2 pilar terpadu:
              <strong> (1) Cost Recovery Rate (CRR)</strong> = <code className="font-mono bg-white px-1 py-0.5 rounded border border-indigo-200">(Tarif Berlaku ÷ Unit Cost) × 100%</code>, serta
              <strong> (2) Survei Penerimaan Publik (WTP/ATP)</strong> = persentase responden yang menilai tarif sebanding dengan kualitas fasilitas.
              Kategori <strong>"Valid"</strong> diberikan bila Skor Kewajaran ≥ 85.0% dan CRR berada dalam koridor PMK/Perka.
            </p>
          </div>

          {/* Compact Chart: Persentase Kewajaran per Lokasi */}
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={surveiChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="lokasi" tick={{ fill: '#334155', fontSize: 10, fontWeight: 700 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`${val}% Wajar`, 'Tingkat Penerimaan']} />
                  <Bar dataKey="wajar" fill="#4F46E5" name="Tingkat Penerimaan / Kewajaran (%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PHKS_SURVEI_KEWAJARAN.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{s.lokasi}</h4>
                    <span className="text-[10px] text-slate-500">Kriteria: {s.kriteria}</span>
                  </div>
                  <span className="font-mono text-sm font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {s.persentaseWajar}% Wajar
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div>Metodologi: <span className="font-medium text-slate-800">{s.instrumentPenelitian}</span></div>
                  <div>Sampel Responden: <span className="font-mono font-bold text-slate-900">{s.jumlahResponden} Orang/Badan Usaha</span></div>
                  <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <strong>Rekomendasi:</strong> {s.rekomendasi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
