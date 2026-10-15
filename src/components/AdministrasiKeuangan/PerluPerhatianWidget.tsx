import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import {
  DAFTAR_PERLU_PERHATIAN,
  PerluPerhatianItem,
} from './administrasiKeuanganData';

interface PerluPerhatianWidgetProps {
  onSelectItem?: (item: PerluPerhatianItem) => void;
}

export const PerluPerhatianWidget: React.FC<PerluPerhatianWidgetProps> = ({
  onSelectItem,
}) => {
  const items = DAFTAR_PERLU_PERHATIAN.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between font-sans h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Perlu Perhatian Pimpinan</span>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {items.length} Isu
              </span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
              Diurutkan berdasarkan prioritas dan tingkat deviasi
            </span>
          </div>
        </div>

        {/* List of Attention Items */}
        <div className="divide-y divide-slate-100 mt-2">
          {items.length === 0 ? (
            <div className="py-8 text-center text-xs text-emerald-700 font-semibold flex flex-col items-center gap-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <span>Semua indikator aman. Tidak ada isu kritis yang memerlukan atensi.</span>
            </div>
          ) : (
            items.map((item) => {
              const isAlert = item.keparahan === 'TINGGI';

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem && onSelectItem(item)}
                  className="py-2.5 flex items-start gap-3 hover:bg-slate-50/80 rounded-lg px-1.5 -mx-1.5 transition-colors cursor-pointer group"
                >
                  {/* Status Icon */}
                  <div className="mt-0.5 shrink-0">
                    {isAlert ? (
                      <div className="w-5 h-5 rounded-md bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Kalimat + Angka */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800 font-medium leading-snug group-hover:text-slate-900">
                      {item.kalimat}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-slate-900 tabular-nums">
                        {item.angka}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[10.5px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        {item.tagBiro}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span>Otomatis dievaluasi dari capaian unit kerja</span>
        <span className="text-slate-500 font-semibold">Tindak Lanjut Segera</span>
      </div>
    </div>
  );
};
