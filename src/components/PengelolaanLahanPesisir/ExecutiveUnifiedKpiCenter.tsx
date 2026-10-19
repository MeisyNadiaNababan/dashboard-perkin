import React from 'react';
import {
  MapPin,
  Building2,
  Waves,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  FileCheck2,
  FileText,
  DollarSign,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { PERKIN_A3_KPIS } from './pengelolaanLahanPesisirData';
import {
  ALOKASI_LAHAN_INVESTASI_DATA,
  TARGET_PENERIMAAN_PNBP_LAHAN,
  SWP_LAHAN_TERSEDIA_DATA,
} from '../PengelolaanLahan/lahanData';
import { KPI_PESISIR_REKLAMASI_DATA } from '../PesisirReklamasi/pesisirReklamasiData';
import {
  KPI_PENGAWASAN_DATA,
  KPI_EVALUASI_PEMBATALAN_DATA,
  KPI_PELAKSANAAN_DOKUMEN_DATA,
  KPI_REKOMENDASI_PEMBARUAN_DATA,
} from '../PengendalianLahan/pengendalianData';

interface ExecutiveUnifiedKpiCenterProps {
  onOpenFormulaModal?: (kpiId: string) => void;
  onSelectDirectorate?: (directorateId: string) => void;
}

export const ExecutiveUnifiedKpiCenter: React.FC<ExecutiveUnifiedKpiCenterProps> = ({
  onOpenFormulaModal,
  onSelectDirectorate,
}) => {
  // Datasets
  const alokasi = ALOKASI_LAHAN_INVESTASI_DATA;
  const pnbp = TARGET_PENERIMAAN_PNBP_LAHAN;
  const pesisir = KPI_PESISIR_REKLAMASI_DATA;
  const kpiPengawasan = KPI_PENGAWASAN_DATA;
  const kpiEvaluasi = KPI_EVALUASI_PEMBATALAN_DATA;
  const kpiDokumen = KPI_PELAKSANAAN_DOKUMEN_DATA;
  const kpiRekomendasi = KPI_REKOMENDASI_PEMBARUAN_DATA;

  const totalSwpHa = SWP_LAHAN_TERSEDIA_DATA.reduce((sum, item) => sum + item.luasHa, 0);
  const totalSwpPersil = SWP_LAHAN_TERSEDIA_DATA.reduce((sum, item) => sum + item.jumlahPersil, 0);

  // 3 Perkin A3 IKPs
  const ikpLahan = PERKIN_A3_KPIS[0];
  const ikpPesisir = PERKIN_A3_KPIS[1];
  const ikpPengendalian = PERKIN_A3_KPIS[2];

  return (
    <div className="space-y-3 font-sans">
      {/* THE 3 CONSOLIDATED DIRECTORATE KPI CARDS */}
      <div className="grid gap-3.5 grid-cols-1 lg:grid-cols-3">
        {/* ========================================================================= */}
        {/* DIREKTORAT 1: PENGELOLAAN LAHAN */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge & Directorate Header */}
            <div>
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                      DIREKTORAT 1
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                      Direktorat Pengelolaan Lahan
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {ikpLahan.capaianPersen.toFixed(1)}%
                  </span>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('ikp-1-lahan-investasi')}
                      className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Formula & Manual Teknis IKP 1 Dit. Lahan"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Primary IKP Card Block */}
              <div className="bg-white rounded-lg p-3 border border-slate-200/90 my-3 shadow-2xs">
                <div className="text-[10.5px] font-bold text-slate-900 flex items-center justify-between">
                  <span>IKP #1: Luas Lahan Dialokasikan Investasi</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>
                
                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpLahan.realisasi}
                    </span>
                    <span className="text-xs font-bold text-indigo-700">Hektar</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpLahan.target2025} Ha</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={{ width: `${Math.min(100, ikpLahan.capaianPersen)}%` }}
                  />
                </div>
              </div>

              {/* Essential Directorate Overall Metrics (Direct & Compact) */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Ringkasan Kinerja Keseluruhan:
                </div>

                {/* Metric 1: PNBP Lahan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Realisasi PNBP Lahan</div>
                      <div className="text-[10px] text-slate-500">Target Rp 850 M (SLA: {pnbp.rataRataSlaHari} Hari)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-emerald-700">Rp {(pnbp.realisasiPnbpRp / 1000000000).toFixed(1)} M</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      {pnbp.capaianPersen.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Metric 2: Komitmen Investasi & SKPT */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Alokasi SKPT Investasi</div>
                      <div className="text-[10px] text-slate-500">Estimasi Nilai Rp {alokasi.potensiNilaiInvestasiRpTriliun} T ({alokasi.rasioDisetujuiPersen}% ACC)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-slate-900">{alokasi.totalLuasAlokasiHa} Ha</div>
                    <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                      {alokasi.permohonanDisetujui} SKPT
                    </span>
                  </div>
                </div>

                {/* Metric 3: Kesiapan SWP */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Lahan Tersedia di 8 SWP</div>
                      <div className="text-[10px] text-slate-500">{totalSwpPersil} Persil Siap Bangun</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-indigo-700">{totalSwpHa.toLocaleString('id-ID')} Ha</div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1 py-0.2 rounded">
                      Kesiapan Tinggi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Status: Optimal &amp; Melampaui
              </span>
              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-1-lahan-investasi')}
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Manual Naskah</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        {/* ========================================================================= */}
        {/* DIREKTORAT 2: PENGELOLAAN KAWASAN PESISIR & REKLAMASI */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge & Directorate Header */}
            <div>
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 uppercase">
                      DIREKTORAT 2
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                      Dit. Kawasan Pesisir &amp; Reklamasi
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {ikpPesisir.capaianPersen.toFixed(1)}%
                  </span>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('ikp-2-pesisir-reklamasi')}
                      className="p-1 rounded-md text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors cursor-pointer"
                      title="Formula & Manual Teknis IKP 2 Dit. Pesisir"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Primary IKP Card Block */}
              <div className="bg-white rounded-lg p-3 border border-slate-200/90 my-3 shadow-2xs">
                <div className="text-[10.5px] font-bold text-slate-900 flex items-center justify-between">
                  <span>IKP #2: Luas Izin Pesisir &amp; Reklamasi</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    MELAMPAUI TARGET
                  </span>
                </div>
                
                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpPesisir.realisasi}
                    </span>
                    <span className="text-xs font-bold text-cyan-700">Hektar</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpPesisir.target2025} Ha</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-teal-600"
                    style={{ width: `${Math.min(100, ikpPesisir.capaianPersen)}%` }}
                  />
                </div>
              </div>

              {/* Essential Directorate Overall Metrics (Direct & Compact) */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Ringkasan Kinerja Keseluruhan:
                </div>

                {/* Metric 1: Ketepatan SLA Izin */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Ketepatan SLA Perizinan</div>
                      <div className="text-[10px] text-slate-500">{pesisir.kpi2_totalTepatWaktu}/{pesisir.kpi2_totalPerizinanSelesai} Berkas (SLA: {pesisir.kpi2_rataRataSlaHari} Hari)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-emerald-700">{pesisir.kpi2_persenTepatWaktu.toFixed(1)}%</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      SLA Terpenuhi
                    </span>
                  </div>
                </div>

                {/* Metric 2: Luas Izin & PKKPRL */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Penerbitan Izin Pesisir</div>
                      <div className="text-[10px] text-slate-500">Rata-rata {pesisir.kpi1_rataRataLuasHa} Ha per Izin</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-slate-900">{pesisir.kpi1_luasIzinInvestasiHa.toLocaleString('id-ID')} Ha</div>
                    <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                      {pesisir.kpi1_totalIzinTerbit} PKKPRL
                    </span>
                  </div>
                </div>

                {/* Metric 3: Penanganan Kasus & Spasial */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Penyelesaian Isu &amp; Masalah</div>
                      <div className="text-[10px] text-slate-500">{pesisir.kpi3_kasusSelesai}/{pesisir.kpi3_totalKasus} Kasus ({pesisir.kpi3_totalLuasTerdampakHa} Ha)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-amber-700">{pesisir.kpi3_persenPenyelesaianMasalah.toFixed(1)}%</div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1 py-0.2 rounded">
                      2.150 Ha RTRW Laut
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="text-cyan-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                Status: Tertib &amp; Berkelanjutan
              </span>
              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-2-pesisir-reklamasi')}
                  className="font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Manual Naskah</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        {/* ========================================================================= */}
        {/* DIREKTORAT 3: PENGENDALIAN PENGELOLAAN LAHAN, PESISIR & REKLAMASI */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge & Directorate Header */}
            <div>
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                      DIREKTORAT 3
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-snug">
                      Dit. Pengendalian Lahan &amp; Pesisir
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {ikpPengendalian.capaianPersen.toFixed(1)}%
                  </span>
                  {onOpenFormulaModal && (
                    <button
                      type="button"
                      onClick={() => onOpenFormulaModal('ikp-3-pengawasan-pengendalian')}
                      className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Formula & Manual Teknis IKP 3 Dit. Pengendalian"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Primary IKP Card Block */}
              <div className="bg-white rounded-lg p-3 border border-slate-200/90 my-3 shadow-2xs">
                <div className="text-[10.5px] font-bold text-slate-900 flex items-center justify-between">
                  <span>IKP #3: Keberhasilan Pengawasan &amp; Pengendalian</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.2 rounded">
                    KEPATUHAN TINGGI
                  </span>
                </div>
                
                <div className="flex items-baseline justify-between mt-1.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                      {ikpPengendalian.realisasi}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">% Target</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-500 block">Target Perkin:</span>
                    <span className="font-bold font-mono text-slate-700">{ikpPengendalian.target2025}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600"
                    style={{ width: `${Math.min(100, ikpPengendalian.capaianPersen)}%` }}
                  />
                </div>
              </div>

              {/* Essential Directorate Overall Metrics (Direct & Compact) */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Ringkasan Kinerja Keseluruhan:
                </div>

                {/* Metric 1: Pengawasan Lapangan */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Pengawasan Objek Lahan</div>
                      <div className="text-[10px] text-slate-500">Cakupan 3 Zona SWP Aktif</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-emerald-700">{kpiPengawasan.persentase.toFixed(1)}%</div>
                    <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                      {kpiPengawasan.realisasiObjek}/{kpiPengawasan.targetObjek} Objek
                    </span>
                  </div>
                </div>

                {/* Metric 2: Rekuperasi Lahan Mangkrak */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Evaluasi &amp; Rekuperasi Lahan</div>
                      <div className="text-[10px] text-slate-500">{kpiEvaluasi.realisasiKasus}/{kpiEvaluasi.targetKasus} Kasus Ditertibkan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-amber-700">{kpiEvaluasi.persentase.toFixed(1)}%</div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                      {kpiEvaluasi.luasLahanDiselamatkanHa} Ha Diselamatkan
                    </span>
                  </div>
                </div>

                {/* Metric 3: Legalitas Dokumen & Rekomendasi */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Dokumen Sah &amp; Rekomendasi</div>
                      <div className="text-[10px] text-slate-500">BAPL ({kpiDokumen.rataRataSlaHari} Hari) &amp; Hak ({kpiRekomendasi.rataRataSlaHari} Hari)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black font-mono text-emerald-700">95.0%</div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1 py-0.2 rounded">
                      {kpiDokumen.realisasiDokumen} BAPL / {kpiRekomendasi.totalRekomendasiSelesai} Hak
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Status: Pengawasan Efektif
              </span>
              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-3-pengawasan-pengendalian')}
                  className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Manual Naskah</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};
