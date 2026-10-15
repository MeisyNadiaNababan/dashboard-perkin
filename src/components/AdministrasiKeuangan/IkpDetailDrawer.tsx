import React, { useState } from 'react';
import {
  X,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import {
  PerkinIkpItem,
  STATUS_CONFIG,
  KomponenIkpDrawer,
  SkalaPredikatItem
} from './administrasiKeuanganData';

interface IkpDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ikp: PerkinIkpItem | null;
}

export const IkpDetailDrawer: React.FC<IkpDetailDrawerProps> = ({
  isOpen,
  onClose,
  ikp,
}) => {
  const [showPredikatScale, setShowPredikatScale] = useState(false);

  if (!isOpen || !ikp) return null;

  const statusCfg = STATUS_CONFIG[ikp.status];

  // Urutkan komponen dari capaian terendah ke tertinggi
  const sortedKomponen: KomponenIkpDrawer[] = [...ikp.komponenDrawer].sort(
    (a, b) => a.capaianPersen - b.capaianPersen
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[520px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          {/* Header Drawer */}
          <div className="p-5 border-b border-slate-200/80 bg-slate-50/70 flex items-start justify-between gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-700">IKP {ikp.no} Perkin 2025</span>
                <span>·</span>
                <span className="text-slate-600 font-medium">{ikp.biroPengampu}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {ikp.namaLengkap}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
            {/* Top Stat Box: Nilai, Target, Predikat, Status */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Realisasi Capaian
                  </span>
                  <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5 tabular-nums">
                    {ikp.nilaiUtama}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {ikp.barisKonteks}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Target &amp; Status
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-md border ${statusCfg.bgClass} ${statusCfg.colorClass} ${statusCfg.borderClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass}`} />
                      {statusCfg.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 block mt-1.5">
                    Predikat: {ikp.predikat}
                  </span>
                </div>
              </div>
            </div>

            {/* CHART ATAU CHECKLIST SESUAI SPESIFIKASI */}
            {ikp.id === 'ikp-4-wtp' ? (
              /* OPINI BPK: 4 KRITERIA SAP BERUPA DAFTAR CENTANG (BUKAN CHART) */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    4 Kriteria Standar Akuntansi Pemerintahan (SAP)
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    4/4 Terpenuhi
                  </span>
                </div>

                <div className="space-y-2">
                  {ikp.kriteriaSapChecklist?.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-lg border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {item.kriteria}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* RB, SISTEM MERIT, SPIP: SATU BAR CHART HORIZONTAL KOMPONEN VS BOBOT */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Komponen Capaian vs Bobot Maksimal
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Diurutkan dari capaian terendah (3 terendah diberi perhatian)
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  {sortedKomponen.map((komp, idx) => {
                    const isLowestThree = idx < 3;
                    const barColor = isLowestThree
                      ? komp.capaianPersen < 75
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                      : 'bg-slate-700';

                    return (
                      <div
                        key={komp.nama}
                        className={`p-2.5 rounded-lg border transition-colors ${
                          isLowestThree
                            ? 'bg-amber-50/40 border-amber-200/70'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-slate-900 truncate max-w-[280px]">
                            {komp.nama}
                          </span>
                          <div className="flex items-center gap-2 text-right">
                            <span className="text-slate-500 font-medium tabular-nums">
                              {komp.skorCapaian} / {komp.bobotMaksimal}
                            </span>
                            <span
                              className={`font-bold tabular-nums ${
                                isLowestThree
                                  ? komp.capaianPersen < 75
                                    ? 'text-rose-700'
                                    : 'text-amber-700'
                                  : 'text-slate-800'
                              }`}
                            >
                              {komp.capaianPersen.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        {/* Horizontal Bar */}
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                            style={{ width: `${Math.min(komp.capaianPersen, 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                          <span className="truncate">{komp.keterangan}</span>
                          {isLowestThree && (
                            <span className="text-amber-700 font-semibold shrink-0 ml-1">
                              Perlu Evaluasi
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TOMBOL LIHAT SKALA PREDIKAT PERKIN */}
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => setShowPredikatScale(!showPredikatScale)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/70 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Lihat Skala Predikat Perkin ({ikp.judulSingkat})</span>
                {showPredikatScale ? (
                  <ChevronUp className="w-4 h-4 text-slate-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {showPredikatScale && (
                <div className="mt-2.5 bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3 font-semibold">Tingkat/Kategori</th>
                        <th className="py-2 px-3 font-semibold">Rentang Nilai</th>
                        <th className="py-2 px-3 font-semibold">Predikat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ikp.skalaPredikat.map((scale) => (
                        <tr
                          key={scale.kode}
                          className={scale.isTarget ? 'bg-emerald-50/70 font-semibold text-emerald-900' : ''}
                        >
                          <td className="py-2 px-3">
                            {scale.kode}
                            {scale.isTarget && (
                              <span className="ml-1 text-[9.5px] px-1 py-0.2 bg-emerald-200 text-emerald-900 rounded font-normal">
                                Target
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 font-mono text-[10.5px]">{scale.rentang}</td>
                          <td className="py-2 px-3">{scale.predikat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* SUMBER DATA & DASAR HUKUM SATU DATA */}
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[11px]">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Referensi Satu Data BP Batam</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Dataset:</strong> {ikp.datasetSatuData}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Rumus:</strong> {ikp.rumusPerhitungan}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                <strong>Dasar Regulasi:</strong> {ikp.dasarHukum}
              </p>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-500">
              Perjanjian Kinerja BP Batam TA 2025
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-xs transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
