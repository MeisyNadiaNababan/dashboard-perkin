import React from 'react';
import { Database, BarChart3, HelpCircle } from 'lucide-react';

export interface InvestasiVisualHeaderProps {
  datasetNumber: number | string;
  pdfPages?: string;
  title: string;
  visualName: string;
  visualIcon?: React.ReactNode;
  attributes: string[];
  classification?: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  periode?: string;
  rightControls?: React.ReactNode;
  onOpenFormula?: () => void;
}

export const InvestasiVisualHeader: React.FC<InvestasiVisualHeaderProps> = ({
  datasetNumber,
  pdfPages = 'Hal. 46-48',
  title,
  visualName,
  visualIcon,
  attributes,
  classification = 'TERBUKA',
  periode = 'PERTRIWULAN',
  rightControls,
  onOpenFormula,
}) => {
  const getBadgeColor = () => {
    switch (classification) {
      case 'TERBUKA':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'TERBATAS':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'TERTUTUP':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-sky-50 text-sky-800 border-sky-200';
    }
  };

  return (
    <div className="flex flex-col gap-2 pb-3 mb-3 border-b border-slate-100 w-full font-sans">
      {/* Baris 1: Badges & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Dataset Number & Halaman Satu Data */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono flex items-center gap-1 shrink-0 border border-sky-200">
            <Database className="w-3 h-3 text-sky-700" />
            DATASET NO. {datasetNumber} ({pdfPages})
          </span>

          {/* Sifat Data */}
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono shrink-0 ${getBadgeColor()}`}
          >
            {classification}
          </span>

          {/* Periode Data */}
          {periode && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono shrink-0">
              {periode}
            </span>
          )}
        </div>

        {/* Right-aligned controls (e.g. Switcher, CSV export, Info) */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {rightControls}
          {onOpenFormula && (
            <button
              onClick={onOpenFormula}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Kamus Atribut Data Satu Data BP Batam"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
            </button>
          )}
        </div>
      </div>

      {/* Baris 2: Nama Dataset Resmi */}
      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug w-full">
        {title}
      </h2>

      {/* Baris 3: Nama Visualisasi & Atribut yang Ditampilkan (Standar Dashboard Pembangunan Infrastruktur) */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5 w-full">
        {/* Nama Visualisasi Badge */}
        <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-900 border border-teal-200 font-mono inline-flex items-center gap-1.5 shadow-2xs shrink-0">
          {visualIcon || <BarChart3 className="w-3.5 h-3.5 text-teal-600" />}
          <span>Visualisasi: {visualName}</span>
        </span>

        {/* Atribut yang Ditampilkan Badges */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-slate-200">
          <span className="text-[10.5px] font-semibold text-slate-600 mr-0.5">
            Atribut yang Ditampilkan:
          </span>
          {attributes.map((attr, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white text-slate-800 border border-slate-300 shadow-2xs"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
