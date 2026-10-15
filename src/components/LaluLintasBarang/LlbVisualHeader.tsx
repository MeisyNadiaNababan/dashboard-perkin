import React from 'react';
import { Database, BarChart3, HelpCircle } from 'lucide-react';

interface LlbVisualHeaderProps {
  datasetNumber: number;
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

export const LlbVisualHeader: React.FC<LlbVisualHeaderProps> = ({
  datasetNumber,
  pdfPages = 'Hal. 9',
  title,
  visualName,
  visualIcon,
  attributes,
  classification = 'TERBUKA',
  periode = 'PERBULAN',
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
    <div className="flex flex-col gap-2 pb-3 mb-3.5 border-b border-slate-100 w-full font-sans">
      {/* Top Row: Badges (Left) & Controls (Right) */}
      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Dataset Number & Page Reference */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono flex items-center gap-1 shrink-0 border border-sky-200">
            <Database className="w-3 h-3 text-sky-700" />
            DATASET NO. {datasetNumber} ({pdfPages})
          </span>

          {/* Classification Badge */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono shrink-0 ${getBadgeColor()}`}>
            {classification}
          </span>

          {/* Periode Badge */}
          {periode && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono shrink-0">
              {periode}
            </span>
          )}
        </div>

        {/* Right-aligned controls (Sheet switches, Export CSV, Formula) */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {rightControls}
          {onOpenFormula && (
            <button
              onClick={onOpenFormula}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Kamus & Atribut Data Satu Data BP Batam"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Middle Row: Full-width Official Dataset Title */}
      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug w-full">
        {title}
      </h2>

      {/* Bottom Row: Visual Name Badge & Attributes Tags */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5 w-full">
        {/* Visualization Name Badge */}
        <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200 font-mono inline-flex items-center gap-1.5 shadow-2xs shrink-0">
          {visualIcon || <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />}
          <span>Nama Visualisasi: {visualName}</span>
        </span>

        {/* Attributes Label & Tags */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[10.5px] font-semibold text-slate-500 mr-0.5">
            Atribut yang Ditampilkan:
          </span>
          {attributes.map((attr, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium font-mono px-2 py-0.2 rounded-sm bg-slate-100 text-slate-700 border border-slate-200/80"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
