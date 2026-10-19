import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Layers,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  HelpCircle,
  ArrowUpRight,
  Sparkles,
  Info,
  Download
} from 'lucide-react';
import {
  TREN_INVESTASI_TAHUNAN,
  KONTRIBUSI_KEK_KPBPB,
  SEKTOR_INVESTASI_DATA,
  EMPAT_IKS_KEPALA_BP
} from './kepalaBpData';

interface InvestasiDeepDiveCardProps {
  onOpenManualModal?: () => void;
}

export const InvestasiDeepDiveCard: React.FC<InvestasiDeepDiveCardProps> = ({
  onOpenManualModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'tren' | 'modal' | 'pma_pmdn' | 'kek_vs_non' | 'sektor' | 'tabel'
  >('tren');

  const [selectedTahun, setSelectedTahun] = useState<number>(2026);

  const iks1 = EMPAT_IKS_KEPALA_BP[0];
  const maxNilaiInvestasi = 80; // Scale max for chart

  // Selected year data
  const currentYearData =
    TREN_INVESTASI_TAHUNAN.find((d) => d.tahun === selectedTahun) ||
    TREN_INVESTASI_TAHUNAN[TREN_INVESTASI_TAHUNAN.length - 1];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* CARD HEADER */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 via-slate-50 to-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                  IKS-01 KEPALA BP BATAM
                </span>
                <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                  Sumber: Dit. Pengembangan KEK, KPU Bea Cukai &amp; BPS Batam
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Nilai Realisasi Investasi di KPBPB Batam (Target: Rp 70 Triliun)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-[10.5px] uppercase font-bold text-slate-500 block">
                Capaian YTD TA 2026
              </span>
              <span className="text-base font-black font-mono text-emerald-700">
                Rp 54,68 T{' '}
                <span className="text-xs text-slate-500 font-normal">
                  ({iks1.persenCapaian.toFixed(1)}%)
                </span>
              </span>
            </div>
            {onOpenManualModal && (
              <button
                onClick={onOpenManualModal}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Manual Rumus</span>
              </button>
            )}
          </div>
        </div>

        {/* SUB-TABS NAVIGATION */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-slate-200/60">
          <button
            onClick={() => setActiveSubTab('tren')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'tren'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Grafik Batang Tren Tahunan (2020–2026)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('modal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'modal'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Modal Tetap vs Modal Lancar</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pma_pmdn')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'pma_pmdn'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>PMA vs PMDN</span>
          </button>

          <button
            onClick={() => setActiveSubTab('kek_vs_non')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'kek_vs_non'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Kontribusi KEK vs Non-KEK</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sektor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'sektor'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Sektor Unggulan &amp; Naker</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tabel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'tabel'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Master Dataset</span>
          </button>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-4 sm:p-6">
        {/* VIEW 1: GRAFIK BATANG TREN TAHUNAN (2020 - 2026) */}
        {activeSubTab === 'tren' && (
          <div className="space-y-6">
            {/* Context Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                  Visualisasi Utama Permintaan Pimpinan
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Tren Pertumbuhan Nilai Realisasi Investasi KPBPB Batam (Triliun Rupiah)
                </h4>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-slate-300" />
                  <span className="text-slate-600">Target Perkin</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-blue-600 to-cyan-500" />
                  <span className="text-slate-900 font-bold">Realisasi Total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-emerald-500" />
                  <span className="text-emerald-700 font-bold">TA 2026 (YTD)</span>
                </div>
              </div>
            </div>

            {/* Interactive Custom Bar Chart */}
            <div className="h-72 w-full pt-6 pb-2 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6 bg-gradient-to-b from-slate-50/50 to-white rounded-xl border border-slate-100">
              {TREN_INVESTASI_TAHUNAN.map((item) => {
                const targetHeight = (item.target / maxNilaiInvestasi) * 100;
                const realisasiHeight = (item.realisasiTotal / maxNilaiInvestasi) * 100;
                const isSelected = item.tahun === selectedTahun;
                const is2026 = item.tahun === 2026;

                return (
                  <div
                    key={item.tahun}
                    onClick={() => setSelectedTahun(item.tahun)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Hover Value Badge */}
                    <div className="mb-2 text-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <span
                        className={`text-[10px] sm:text-xs font-mono font-bold block ${
                          is2026
                            ? 'text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded'
                            : 'text-slate-900'
                        }`}
                      >
                        Rp {item.realisasiTotal.toFixed(1)} T
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono hidden sm:block">
                        Tgt: {item.target} T
                      </span>
                    </div>

                    {/* Bars Container */}
                    <div className="w-full max-w-[56px] flex items-end justify-center gap-1 h-48 relative">
                      {/* Target Ghost Bar */}
                      <div
                        style={{ height: `${targetHeight}%` }}
                        className="w-1/2 bg-slate-200/80 rounded-t-sm group-hover:bg-slate-300 transition-colors"
                        title={`Target ${item.tahun}: Rp ${item.target} Triliun`}
                      />

                      {/* Realisasi Solid Bar */}
                      <div
                        style={{ height: `${realisasiHeight}%` }}
                        className={`w-1/2 rounded-t-sm transition-all duration-300 ${
                          is2026
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md ring-2 ring-emerald-400/50'
                            : isSelected
                            ? 'bg-gradient-to-t from-blue-700 to-cyan-400 ring-2 ring-blue-500 shadow-md'
                            : 'bg-gradient-to-t from-blue-600 to-cyan-500 group-hover:from-blue-700 group-hover:to-cyan-400'
                        }`}
                        title={`Realisasi ${item.tahun}: Rp ${item.realisasiTotal} Triliun`}
                      />
                    </div>

                    {/* Year Label */}
                    <div className="mt-2 text-center">
                      <span
                        className={`text-xs font-mono font-bold block ${
                          isSelected
                            ? 'text-blue-700 underline'
                            : is2026
                            ? 'text-emerald-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {item.tahun}
                      </span>
                      {is2026 && (
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter block">
                          Perkin
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drill-down Summary of Selected Year */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-xs font-bold">
                    TA {currentYearData.tahun}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900">
                    Rincian Komponen Investasi Sesuai Formula Perkin
                  </h5>
                </div>
                <span className="text-xs text-blue-800 font-mono font-bold">
                  {((currentYearData.realisasiTotal / currentYearData.target) * 100).toFixed(1)}% dari Target Rp {currentYearData.target} T
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Modal Tetap (Bea Cukai)
                  </span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-slate-900">
                    Rp {currentYearData.modalTetap.toFixed(2)} T
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {((currentYearData.modalTetap / currentYearData.realisasiTotal) * 100).toFixed(1)}% porsi
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Modal Lancar (BC &amp; BPS)
                  </span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-slate-900">
                    Rp {currentYearData.modalLancar.toFixed(2)} T
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {((currentYearData.modalLancar / currentYearData.realisasiTotal) * 100).toFixed(1)}% porsi
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Penanaman Modal Asing (PMA)
                  </span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-blue-700">
                    Rp {currentYearData.pma.toFixed(2)} T
                  </div>
                  <span className="text-[10px] text-blue-600">
                    {((currentYearData.pma / currentYearData.realisasiTotal) * 100).toFixed(1)}% porsi PMA
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Penanaman Modal Dalam Negeri
                  </span>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-emerald-700">
                    Rp {currentYearData.pmdn.toFixed(2)} T
                  </div>
                  <span className="text-[10px] text-emerald-600">
                    {((currentYearData.pmdn / currentYearData.realisasiTotal) * 100).toFixed(1)}% porsi PMDN
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MODAL TETAP VS MODAL LANCAR (FORMULA HALAMAN 3 PERKIN) */}
        {activeSubTab === 'modal' && (
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Implementasi Formula Resmi Manual IKS-1 (Halaman 3 Perkin):
              </h4>
              <p className="text-xs text-slate-600 font-mono bg-white p-2.5 rounded border border-slate-200">
                Realisasi Investasi Tahun 2026 = Modal Tetap + Modal Lancar
                <br />= (Impor Barang Modal + Margin Distribusi + Jasa Pemasangan + Biaya Lain-lain) + Modal Lancar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Modal Tetap Card */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                    1. Modal Tetap (Fixed Capital)
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-200 text-blue-900 rounded">
                    66,3% dari Total
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-blue-950 mb-2">
                  Rp 36,25 Triliun
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  <strong>Sumber Data Resmi:</strong> Kantor Pelayanan Utama Bea dan Cukai (KPU BC) Tipe B Batam. Terdiri dari mesin industri, alat berat, robotik manufaktur, dan sarana pabrik.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-blue-100">
                  <div className="flex justify-between">
                    <span>• Impor Barang Modal (BC 2.0 / PPFTZ)</span>
                    <strong className="font-mono">Rp 28,40 T</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• Margin Distribusi &amp; Logistik</span>
                    <strong className="font-mono">Rp 3,85 T</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• Jasa Instalasi &amp; Pemasangan Pabrik</span>
                    <strong className="font-mono">Rp 2,75 T</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• Biaya Lain-lain Terkait Modal Tetap</span>
                    <strong className="font-mono">Rp 1,25 T</strong>
                  </div>
                </div>
              </div>

              {/* Modal Lancar Card */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    2. Modal Lancar (Working Capital)
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded">
                    33,7% dari Total
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-emerald-950 mb-2">
                  Rp 18,43 Triliun
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  <strong>Sumber Data Resmi:</strong> KPU Bea dan Cukai Batam &amp; Badan Pusat Statistik (BPS) Kota Batam. Terdiri dari persediaan bahan baku impor, piutang usaha, dan kas operasional industri.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-emerald-100">
                  <div className="flex justify-between">
                    <span>• Impor Bahan Baku Produksi Kawasan Bebas</span>
                    <strong className="font-mono">Rp 12,20 T</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• Operasional &amp; Inventory Komponen Elektronik</span>
                    <strong className="font-mono">Rp 4,15 T</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• Biaya Overhead &amp; Utilitas Pabrik</span>
                    <strong className="font-mono">Rp 2,08 T</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PMA VS PMDN */}
        {activeSubTab === 'pma_pmdn' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Penanaman Modal Asing (PMA)
                </span>
                <div className="text-2xl font-black font-mono text-slate-900">
                  Rp 39,42 Triliun
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Porsi: <strong className="text-blue-700">72,1%</strong> dari total realisasi
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  <div>• Jumlah Proyek: <strong>1.140 Proyek</strong></div>
                  <div>• Top Negara Asal: Singapura, Taiwan, Jepang, AS, &amp; Tiongkok</div>
                  <div>• Penyerapan Tenaga Kerja: <strong>18.450 Orang</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Penanaman Modal Dalam Negeri (PMDN)
                </span>
                <div className="text-2xl font-black font-mono text-slate-900">
                  Rp 15,26 Triliun
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Porsi: <strong className="text-emerald-700">27,9%</strong> dari total realisasi
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-100 space-y-1 text-xs text-slate-600">
                  <div>• Jumlah Proyek: <strong>480 Proyek</strong></div>
                  <div>• Sektor Utama: Galangan Kapal, Maritim, Wisata &amp; Properti</div>
                  <div>• Penyerapan Tenaga Kerja: <strong>5.700 Orang</strong></div>
                </div>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Rasio Komposisi Investasi Asing (PMA) vs Domestik (PMDN) Batam:
              </span>
              <div className="w-full h-6 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: '72.1%' }}
                  className="bg-blue-600 flex items-center justify-center text-white text-xs font-bold font-mono"
                >
                  PMA 72.1%
                </div>
                <div
                  style={{ width: '27.9%' }}
                  className="bg-emerald-600 flex items-center justify-center text-white text-xs font-bold font-mono"
                >
                  PMDN 27.9%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: KONTRIBUSI KEK VS NON-KEK (SUMBER DIT KEK) */}
        {activeSubTab === 'kek_vs_non' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <strong>Integrasi Satu Data:</strong> Kawasan Ekonomi Khusus (KEK) merupakan motor akselerasi investasi Batam di bawah naungan Direktorat Pengembangan KPBPB &amp; KEK.
              </div>
              <span className="font-mono text-blue-800 font-bold hidden sm:inline">
                4 KEK Aktif + Kawasan Industri Terpadu
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200">
                    <th className="py-2.5 px-3 font-bold">Kawasan / Klaster</th>
                    <th className="py-2.5 px-3 font-bold text-center">Status</th>
                    <th className="py-2.5 px-3 font-bold text-right">Target 2026 (M)</th>
                    <th className="py-2.5 px-3 font-bold text-right">Realisasi 2026 (M)</th>
                    <th className="py-2.5 px-3 font-bold text-center">Capaian (%)</th>
                    <th className="py-2.5 px-3 font-bold text-center">Proyek</th>
                    <th className="py-2.5 px-3 font-bold">Fokus Bidang Unggulan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {KONTRIBUSI_KEK_KPBPB.map((row) => (
                    <tr
                      key={row.kawasan}
                      className={
                        row.tipe === 'KEK'
                          ? 'bg-blue-50/40 hover:bg-blue-50/80 font-medium'
                          : 'hover:bg-slate-50/80'
                      }
                    >
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-900 block">{row.kawasan}</span>
                        <span className="text-[10px] text-blue-600 font-semibold">{row.tipe}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status.includes('Beroperasi')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        Rp {row.target2026.toLocaleString('id-ID')} M
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        Rp {row.realisasi2026.toLocaleString('id-ID')} M
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="font-mono font-bold text-emerald-700">
                          {row.persen.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-semibold">
                        {row.proyek}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {row.bidang}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 5: SEKTOR UNGGULAN & NAKER */}
        {activeSubTab === 'sektor' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {SEKTOR_INVESTASI_DATA.map((sektor) => (
                <div
                  key={sektor.nama}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {sektor.nama}
                    </span>
                    <span
                      style={{ color: sektor.warna }}
                      className="text-xs font-mono font-bold"
                    >
                      {sektor.persen}%
                    </span>
                  </div>

                  <div className="text-lg font-black font-mono text-slate-900 mb-2">
                    Rp {sektor.nilaiT.toFixed(2)} Triliun
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                    <div
                      style={{
                        width: `${sektor.persen}%`,
                        backgroundColor: sektor.warna,
                      }}
                      className="h-full rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Penyerapan Tenaga Kerja:</span>
                    <strong className="text-slate-800 font-mono">
                      {sektor.naker.toLocaleString('id-ID')} Orang
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: MASTER DATASET */}
        {activeSubTab === 'tabel' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Rekapitulasi Lengkap Indikator Investasi KPBPB Batam (2020 - 2026):</span>
              <button
                onClick={() => alert('Mengunduh dataset tren investasi ke format CSV/Excel')}
                className="flex items-center gap-1 text-blue-600 font-bold hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dataset (.csv)</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="p-2.5 font-bold text-center">Tahun</th>
                    <th className="p-2.5 font-bold text-right">Target (T)</th>
                    <th className="p-2.5 font-bold text-right">Realisasi (T)</th>
                    <th className="p-2.5 font-bold text-right">Modal Tetap (T)</th>
                    <th className="p-2.5 font-bold text-right">Modal Lancar (T)</th>
                    <th className="p-2.5 font-bold text-right">PMA (T)</th>
                    <th className="p-2.5 font-bold text-right">PMDN (T)</th>
                    <th className="p-2.5 font-bold text-center">Proyek</th>
                    <th className="p-2.5 font-bold text-center">Tenaga Kerja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TREN_INVESTASI_TAHUNAN.map((row) => (
                    <tr
                      key={row.tahun}
                      className={
                        row.tahun === 2026
                          ? 'bg-emerald-50/80 font-bold'
                          : 'hover:bg-slate-50'
                      }
                    >
                      <td className="p-2.5 text-center font-mono">{row.tahun}</td>
                      <td className="p-2.5 text-right font-mono">Rp {row.target.toFixed(1)}</td>
                      <td className="p-2.5 text-right font-mono text-blue-700 font-bold">
                        Rp {row.realisasiTotal.toFixed(2)}
                      </td>
                      <td className="p-2.5 text-right font-mono">Rp {row.modalTetap.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-mono">Rp {row.modalLancar.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-mono text-indigo-700">
                        Rp {row.pma.toFixed(2)}
                      </td>
                      <td className="p-2.5 text-right font-mono text-emerald-700">
                        Rp {row.pmdn.toFixed(2)}
                      </td>
                      <td className="p-2.5 text-center font-mono">{row.jumlahProyek}</td>
                      <td className="p-2.5 text-center font-mono">
                        {row.tenagaKerja.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>
            Data dikonsolidasi dari Bea Cukai Batam (KPU BC), BPS Batam, dan Direktorat KEK BP Batam.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-600">
          Target Perkin 2026: <strong>Rp 70 Triliun</strong>
        </span>
      </div>
    </div>
  );
};
