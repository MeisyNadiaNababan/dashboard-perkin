import React, { useState } from 'react';
import { X, FileCode2, Award, ShieldCheck, Server, BookOpen, CheckCircle2 } from 'lucide-react';
import { IKP_METRICS_LIST } from './kebijakanStrategisData';

interface KebijakanStrategisFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKpiId?: string;
  kpiId?: string;
}

export const KebijakanStrategisFormulaModal: React.FC<KebijakanStrategisFormulaModalProps> = ({
  isOpen,
  onClose,
  initialKpiId = 'ikp-1-perencanaan',
  kpiId,
}) => {
  const [selectedIkpId, setSelectedIkpId] = useState(kpiId || initialKpiId);

  if (!isOpen) return null;

  const currentIkp = IKP_METRICS_LIST.find((m) => m.id === selectedIkpId) || IKP_METRICS_LIST[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#002B49] text-white flex items-center justify-center">
              <FileCode2 className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                KAMUS RUMUS &amp; MANUAL 4 IKP · PERKIN A2 (DEP A2)
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Dasar Hukum: Perjanjian Kinerja No. 3/KA/8/2025 &amp; Regulasi Nasional Terkait
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector for 4 IKP */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {IKP_METRICS_LIST.map((ikp) => (
            <button
              key={ikp.id}
              onClick={() => setSelectedIkpId(ikp.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedIkpId === ikp.id
                  ? 'bg-white text-[#002B49] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="font-mono text-[10.5px] font-black">{ikp.code}</span>
              <span className="truncate max-w-[130px]">{ikp.title.split(' ')[0]} {ikp.title.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Card Title & Overview */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black bg-indigo-100 text-indigo-900">
                {currentIkp.code} · BUTIR #{currentIkp.number}
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {currentIkp.predikat}
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900">{currentIkp.title}</h4>
            <p className="text-slate-600 leading-relaxed">{currentIkp.keterangan}</p>
          </div>

          {/* Metric Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Target 2025</span>
              <span className="text-base font-black font-mono text-slate-900">{currentIkp.target}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Realisasi</span>
              <span className="text-base font-black font-mono text-emerald-700">{currentIkp.realisasi}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Satuan Ukur</span>
              <span className="text-xs font-black text-slate-800">{currentIkp.satuan}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Polaritas</span>
              <span className="text-xs font-black text-sky-700">{currentIkp.polarisasi}</span>
            </div>
          </div>

          {/* Formula & Calculation Method */}
          <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-xs">
              <FileCode2 className="w-4 h-4 text-sky-700" />
              <span>Metodologi Perhitungan &amp; Skala Rentang Penilaian</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-sky-100 font-mono text-[11px] text-slate-800 leading-relaxed">
              {currentIkp.formulaRingkas}
            </div>
          </div>

          {/* Specific Technical Detail Per IKP */}
          {currentIkp.id === 'ikp-1-perencanaan' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">Rincian Indeks Perencanaan Pembangunan (IPPN):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li>Berdasarkan SE Menteri PPN/Kepala Bappenas Nomor 3 Tahun 2023.</li>
                <li>Menilai konsistensi Renstra BP Batam 2025-2029 terhadap RPJMN 2025-2029.</li>
                <li>Evaluasi ketepatan alokasi RKA DIPA terhadap KRO (Keluaran Rincian Output) prioritas.</li>
                <li>Tingkat partisipasi pelaporan triwulanan secara elektronik via e-Monev Bappenas.</li>
              </ul>
            </div>
          )}

          {currentIkp.id === 'ikp-2-kebijakan' && (
            <div className="space-y-3">
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                Formula Perhitungan Indeks Kualitas Kebijakan (IKK LAN-RI) per Dimensi &amp; Poin:
              </h5>
              
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-2">
                <div className="font-mono text-sky-950 font-bold">
                  Rumus Matematika: IKK = &Sigma; (Skor Mentah Dimensi &times; Bobot Dimensi %)
                </div>
                <p className="text-[11px] text-slate-600">
                  Setiap dimensi dinilai dengan skala 0 - 100 berdasarkan instrumen evaluasi kebijakan LAN RI, kemudian dikalikan dengan bobot persentase masing-masing untuk menghasilkan kontribusi poin indeks:
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {/* Dimensi 1 */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>1. Agenda Setting Kebijakan (Bobot: 20% / 0.20)</span>
                    <span className="font-mono text-sky-700 font-extrabold">14.80 Poin</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-100">
                    Perhitungan: Skor Mentah <strong>74.00</strong> &times; 20% = <strong>14.80 Poin</strong>
                  </div>
                  <p className="text-[10.5px] text-slate-500">
                    Indikator: Keterlibatan stakeholder kawasan (asosiasi pengusaha/Kadin), analisis urgensi isu strategis, dan kelengkapan basis data riset pendukung.
                  </p>
                </div>

                {/* Dimensi 2 */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>2. Formulasi Kebijakan (Bobot: 30% / 0.30)</span>
                    <span className="font-mono text-sky-700 font-extrabold">21.90 Poin</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-100">
                    Perhitungan: Skor Mentah <strong>73.00</strong> &times; 30% = <strong>21.90 Poin</strong>
                  </div>
                  <p className="text-[10.5px] text-slate-500">
                    Indikator: Analisis Regulatory Impact Assessment (RIA), penyusunan naskah urgensi/kajian akademis, proses harmonisasi kementerian/lembaga terkait, dan konsultasi publik transparan.
                  </p>
                </div>

                {/* Dimensi 3 */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>3. Implementasi Kebijakan (Bobot: 25% / 0.25)</span>
                    <span className="font-mono text-sky-700 font-extrabold">17.80 Poin</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-100">
                    Perhitungan: Skor Mentah <strong>71.20</strong> &times; 25% = <strong>17.80 Poin</strong>
                  </div>
                  <p className="text-[10.5px] text-slate-500">
                    Indikator: Kecepatan penerbitan petunjuk teknis pelaksanaan (Juknis), standardisasi SOP unit kerja operasional, dan sosialisasi Perka/Kepka kepada pelaku usaha.
                  </p>
                </div>

                {/* Dimensi 4 */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>4. Evaluasi Kemanfaatan Kebijakan (Bobot: 25% / 0.25)</span>
                    <span className="font-mono text-sky-700 font-extrabold">17.30 Poin</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 bg-white p-1.5 rounded border border-slate-100">
                    Perhitungan: Skor Mentah <strong>69.20</strong> &times; 25% = <strong>17.30 Poin</strong>
                  </div>
                  <p className="text-[10.5px] text-slate-500">
                    Indikator: Pengukuran kepatuhan tarif dan evaluasi purna regulasi, survei kepuasan stakeholders, dan rekomendasi penyempurnaan regulasi.
                  </p>
                </div>
              </div>

              {/* Total Aggregate Calculation Box */}
              <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1 font-mono text-xs">
                <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                  AKUMULASI TOTAL INDEKS KUALITAS KEBIJAKAN (IKK):
                </div>
                <div className="text-sm font-black text-emerald-400">
                  14.80 + 21.90 + 17.80 + 17.30 = 71.80 Poin
                </div>
                <div className="text-[10.5px] text-slate-300 font-sans">
                  Target Perkin: <strong>65.00 Poin</strong> &bull; Capaian: <strong className="text-emerald-300">110.46% (Kategori Cukup Baik)</strong>
                </div>
              </div>
            </div>
          )}

          {currentIkp.id === 'ikp-3-spbe' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">Tingkat Kematangan Arsitektur SPBE (Skala 0 - 5):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li>(0) Belum memiliki arsitektur SPBE.</li>
                <li>(1) Sudah memiliki arsitektur kondisi saat ini (as-is).</li>
                <li>(2) Memenuhi kriteria (1) dan telah memiliki target arsitektur to-be.</li>
                <li>(3) Memenuhi kriteria (2), telah melakukan gap analysis serta menyusun peta rencana SPBE terpadu.</li>
                <li>(4) <strong>Level BP Batam Saat Ini (4.12):</strong> Telah mengimplementasikan arsitektur SPBE dalam perencanaan penganggaran dan evaluasi belanja TIK.</li>
                <li>(5) Melakukan evaluasi berkala berkelanjutan sebagai mekanisme Continuous Improvement.</li>
              </ul>
            </div>
          )}

          {currentIkp.id === 'ikp-4-ikm-ptsp' && (
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900">9 Unsur Indeks Kepuasan Masyarakat (PermenPAN-RB No. 14/2017):</h5>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
                <li>Persyaratan, Sistem/Mekanisme/Prosedur, Waktu Penyelesaian.</li>
                <li>Biaya/Tarif Layanan, Produk Spesifikasi Layanan, Kompetensi Pelaksana Layanan.</li>
                <li>Perilaku Pelaksana, Penanganan Pengaduan/Saran/Masukan, Sarana &amp; Prasarana MPP.</li>
                <li>Konversi Nilai Interval: <strong>3.5324 - 4.00 (Kategori A / Sangat Baik = 88.31 - 100)</strong>.</li>
              </ul>
            </div>
          )}

          {/* Unit & Activity attribution */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
            <div>
              <span className="text-slate-500">Unit Penanggung Jawab:</span>
              <span className="font-bold text-slate-900 ml-1">{currentIkp.unitKerja}</span>
            </div>
            <div>
              <span className="text-slate-500">Status Kinerja:</span>
              <span className="font-bold text-emerald-700 ml-1">{currentIkp.statusKinerja}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Tutup Manual
          </button>
        </div>
      </div>
    </div>
  );
};
