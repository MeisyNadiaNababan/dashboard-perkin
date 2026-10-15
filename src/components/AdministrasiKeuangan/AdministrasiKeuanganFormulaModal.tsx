import React from 'react';
import {
  X,
  FileText,
  Scale,
  BookOpen,
} from 'lucide-react';
import { PERKIN_A1_IKP_LIST, PERKIN_A1_INFO, PerkinIkpItem } from './administrasiKeuanganData';

interface AdministrasiKeuanganFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiId: string | null;
}

export const AdministrasiKeuanganFormulaModal: React.FC<
  AdministrasiKeuanganFormulaModalProps
> = ({ isOpen, onClose, kpiId }) => {
  if (!isOpen) return null;

  const currentKpi: PerkinIkpItem =
    PERKIN_A1_IKP_LIST.find((k) => k.id === kpiId) || PERKIN_A1_IKP_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F2942] text-white p-4 sm:p-5 flex items-start justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 text-[10px] font-bold uppercase">
                Perkin A1 &bull; No. {PERKIN_A1_INFO.nomorPerkin}
              </span>
              <span className="text-xs text-slate-300">
                Manual Teknis Indikator
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-white/10 text-cyan-300 text-xs flex items-center justify-center font-bold">
                0{currentKpi.no}
              </span>
              <span>{currentKpi.namaLengkap}</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs text-slate-700">
          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Target 2025
                </span>
                <span className="text-sm font-black text-slate-900">
                  {currentKpi.targetTeks}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Realisasi 2025
                </span>
                <span className="text-sm font-black text-emerald-700">
                  {currentKpi.nilaiUtama}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Predikat Mutu
                </span>
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {currentKpi.predikat}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Status
                </span>
                <span className="text-xs font-bold text-emerald-700 block">
                  {currentKpi.status}
                </span>
              </div>
            </div>
          </div>

          {/* Dasar Hukum & Formula */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-slate-600" />
              <span>Dasar Hukum &amp; Formula Perhitungan</span>
            </h4>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
                  Regulasi Pengukuran:
                </span>
                <p className="text-xs text-slate-600 leading-snug">
                  {currentKpi.dasarHukum}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
                  Formula Matematis / Metode Pengukuran:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentKpi.rumusPerhitungan}
                </p>
              </div>
            </div>
          </div>

          {/* Rincian Komponen Drawer */}
          {currentKpi.komponenDrawer.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>Rincian Komponen Penilaian</span>
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Komponen / Aspek</th>
                      <th className="py-2 px-3 text-center">Bobot</th>
                      <th className="py-2 px-3 text-center">Skor Capaian</th>
                      <th className="py-2 px-3 text-center">% Capaian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentKpi.komponenDrawer.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {item.nama}
                        </td>
                        <td className="py-2 px-3 text-center text-slate-600">
                          {item.bobotMaksimal}
                        </td>
                        <td className="py-2 px-3 text-center font-bold text-slate-900">
                          {item.skorCapaian}
                        </td>
                        <td className="py-2 px-3 text-center font-bold text-slate-900">
                          {item.capaianPersen.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Meta & Sumber Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600 border-t border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">Unit Sumber Data:</span>
              <span>{currentKpi.sumberData}</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Dataset Satu Data:</span>
              <span>{currentKpi.datasetSatuData}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-3.5 px-6 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            BP Batam &bull; Perjanjian Kinerja Tahun 2025
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
