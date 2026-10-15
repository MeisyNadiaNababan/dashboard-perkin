import React from 'react';
import { Database, BarChart3, HelpCircle } from 'lucide-react';

interface PelabuhanVisualHeaderProps {
  datasetNumber: number;
  pdfPages: string;
  title: string;
  visualName: string;
  visualIcon?: React.ReactNode;
  attributes: string[];
  classification?: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  rightControls?: React.ReactNode;
  onOpenFormula?: () => void;
}

export const PelabuhanVisualHeader: React.FC<PelabuhanVisualHeaderProps> = ({
  datasetNumber,
  pdfPages,
  title,
  visualName,
  visualIcon,
  attributes,
  classification = 'TERBUKA',
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
    <div className="flex flex-col gap-2 pb-3 mb-3 border-b border-slate-100 w-full">
      {/* Top Row: Badges (Left) & Controls (Right) */}
      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Dataset Number & Page Reference */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono flex items-center gap-1 shrink-0">
            <Database className="w-3 h-3 text-sky-600" />
            DATASET NO. {datasetNumber} ({pdfPages})
          </span>

          {/* Classification Badge */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono shrink-0 ${getBadgeColor()}`}>
            {classification}
          </span>
        </div>

        {/* Right-aligned controls (Dropdowns, Tab switches, Formula help) */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {rightControls}
          {onOpenFormula && (
            <button
              onClick={onOpenFormula}
              className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Kamus & Atribut Data"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Middle Row: Full-width Title (Never squished or wrapping vertically) */}
      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug w-full">
        {title}
      </h2>

      {/* Bottom Row: Visual Name Badge & Attributes Tags */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5 w-full">
        {/* Visualization Name Badge (Req 9) */}
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200 font-mono inline-flex items-center gap-1 shadow-2xs shrink-0">
          {visualIcon || <BarChart3 className="w-3 h-3 text-purple-600" />}
          <span>Visualisasi: {visualName}</span>
        </span>

        {/* Attributes Label & Tags */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[10.5px] font-semibold text-slate-500 mr-0.5">
            Atribut:
          </span>
          {attributes.map((attr, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-mono"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
