import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export interface TableauShelvesProps {
  rows?: string;
  columns?: string;
  color?: string;
  size?: string;
  detail?: string;
  text?: string;
  marks?: string;
  tooltip?: string;
  filters?: string;
  referenceLine?: string;
  showMe?: string;
  calculatedField?: string;
  compact?: boolean;
  className?: string;
}

export const TableauShelvesBadge: React.FC<TableauShelvesProps> = ({
  rows,
  columns,
  color,
  size,
  detail,
  text,
  marks,
  tooltip,
  filters,
  referenceLine,
  showMe,
  calculatedField,
  compact = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  // Generate plain text string for easy copying into Tableau Desktop project notes
  const generateShelfString = () => {
    const parts: string[] = [];
    if (showMe) parts.push(`Show Me: ${showMe}`);
    if (rows) parts.push(`Rows: ${rows}`);
    if (columns) parts.push(`Columns: ${columns}`);
    if (color) parts.push(`Color: ${color}`);
    if (size) parts.push(`Size: ${size}`);
    if (detail) parts.push(`Detail: ${detail}`);
    if (text) parts.push(`Text/Label: ${text}`);
    if (referenceLine) parts.push(`Analytics / Ref Line: ${referenceLine}`);
    if (filters) parts.push(`Filters: ${filters}`);
    if (calculatedField) parts.push(`Calc: ${calculatedField}`);
    return `Tableau Shelves -> ${parts.join(' | ')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShelfString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full px-3 py-1.5 bg-blue-50/60 hover:bg-blue-50/80 border border-blue-100/90 rounded-lg flex items-center justify-between text-[10.5px] text-blue-900 font-mono transition-colors gap-2 overflow-x-auto shadow-2xs group select-none ${className}`}>
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-extrabold text-[#002B49] tracking-tight shrink-0 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4E79A7]" />
          Tableau Shelves:
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0 text-[10px] sm:text-[10.5px] flex-wrap sm:flex-nowrap">
        {showMe && (
          <>
            <span className="bg-blue-100/70 text-blue-950 font-bold px-1.5 py-0.5 rounded text-[9.5px]">
              {showMe}
            </span>
            <span className="text-blue-300">•</span>
          </>
        )}

        {rows && (
          <>
            <span>
              Rows: <strong className="font-bold text-blue-950">{rows}</strong>
            </span>
            <span className="text-blue-300">•</span>
          </>
        )}

        {columns && (
          <>
            <span>
              Columns: <strong className="font-bold text-blue-950">{columns}</strong>
            </span>
            {(color || size || text || detail || referenceLine || filters) && (
              <span className="text-blue-300">•</span>
            )}
          </>
        )}

        {color && (
          <>
            <span>
              Color: <strong className="font-bold text-blue-950">{color}</strong>
            </span>
            {(size || text || detail || referenceLine || filters) && (
              <span className="text-blue-300">•</span>
            )}
          </>
        )}

        {size && (
          <>
            <span>
              Size: <strong className="font-bold text-blue-950">{size}</strong>
            </span>
            {(text || detail || referenceLine || filters) && (
              <span className="text-blue-300">•</span>
            )}
          </>
        )}

        {text && (
          <>
            <span>
              Text: <strong className="font-bold text-blue-950">{text}</strong>
            </span>
            {(detail || referenceLine || filters) && (
              <span className="text-blue-300">•</span>
            )}
          </>
        )}

        {detail && (
          <>
            <span>
              Detail: <strong className="font-bold text-blue-950">{detail}</strong>
            </span>
            {(referenceLine || filters) && (
              <span className="text-blue-300">•</span>
            )}
          </>
        )}

        {referenceLine && (
          <>
            <span>
              Ref Line: <strong className="font-bold text-amber-900">{referenceLine}</strong>
            </span>
            {filters && <span className="text-blue-300">•</span>}
          </>
        )}

        {filters && (
          <span>
            Filters: <strong className="font-bold text-slate-700">{filters}</strong>
          </span>
        )}
      </div>

      {/* Quick Copy Action */}
      <button
        type="button"
        onClick={handleCopy}
        className="ml-auto shrink-0 px-2 py-0.5 bg-white hover:bg-blue-100 text-blue-900 border border-blue-200 rounded text-[9.5px] font-bold flex items-center gap-1 transition-all cursor-pointer opacity-70 group-hover:opacity-100 active:scale-95"
        title="Salin konfigurasi Shelves Tableau ke Clipboard"
      >
        {copied ? (
          <>
            <Check className="w-2.5 h-2.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Tersalin</span>
          </>
        ) : (
          <>
            <Copy className="w-2.5 h-2.5 text-blue-700" />
            <span>Copy Spec</span>
          </>
        )}
      </button>
    </div>
  );
};
