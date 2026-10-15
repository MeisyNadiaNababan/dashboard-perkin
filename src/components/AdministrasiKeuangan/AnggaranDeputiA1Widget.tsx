import React, { useState } from 'react';
import { Info, DollarSign, Wallet } from 'lucide-react';
import {
  KEGIATAN_ANGGARAN_A1,
  TOTAL_PAGU_A1,
  TOTAL_REALISASI_A1,
  PERSENTASE_SERAPAN_A1,
} from './administrasiKeuanganData';

export const AnggaranDeputiA1Widget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between font-sans h-full">
      <div>
        {/* Header Widget */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Realisasi Anggaran Deputi A1
              </h3>
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                DIPA TA 2025
              </span>
            </div>
            {/* 1 Baris Utama: Total Realisasi vs Total Pagu */}
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight tabular-nums">
                Rp 263,26 M
              </span>
              <span className="text-xs text-slate-500 font-medium">
                dari <strong className="text-slate-800">Rp 725,15 M</strong>
              </span>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 tabular-nums">
                {PERSENTASE_SERAPAN_A1}% Terserap
              </span>
            </div>
          </div>

          {/* Ikon Tooltip Atribut Satu Data */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Info Atribut Anggaran"
            >
              <Info className="w-4 h-4" />
            </button>

            {showTooltip && (
              <div className="absolute right-0 top-6 z-30 w-72 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-[11px] space-y-1.5 pointer-events-none">
                <div className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                  Atribut Satu Data BP Batam
                </div>
                <div>
                  <span className="text-slate-400">Dasar Pagu:</span>{' '}
                  <span className="text-slate-200">
                    Rekapitulasi Pagu Anggaran / Rincian Kertas Kerja Satker
                    (KODE KEGIATAN, NAMA KEGIATAN, Hal. 5 No. 22-23)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Realisasi:</span>{' '}
                  <span className="text-slate-200">
                    Laporan Realisasi Anggaran (ANGGARAN, REALISASI, PERSENTASE,
                    Hal. 4 No. 12)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5 Kegiatan Bar Horizontal */}
        <div className="space-y-3.5 mt-4">
          {KEGIATAN_ANGGARAN_A1.map((keg) => (
            <div key={keg.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  <span className="font-bold text-slate-400 text-[11px] shrink-0">
                    0{keg.nomor}
                  </span>
                  <span
                    className="font-semibold text-slate-800 truncate"
                    title={keg.namaKegiatan}
                  >
                    {keg.namaKegiatan}
                  </span>
                  <span className="text-slate-400 shrink-0">·</span>
                  <span className="text-slate-500 font-medium shrink-0">
                    Pagu {keg.paguFormatted}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {keg.isDummy && (
                    <span className="text-[9.5px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-normal">
                      data contoh
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {keg.persentaseRealisasi}%
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium tabular-nums hidden sm:inline">
                    ({keg.realisasiFormatted})
                  </span>
                </div>
              </div>

              {/* Progress Bar Sumbu 0-100% */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div
                  className="h-full rounded-full bg-[#0F2942] transition-all duration-500"
                  style={{ width: `${Math.min(keg.persentaseRealisasi, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Axis Scale Footer */}
      <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
};
