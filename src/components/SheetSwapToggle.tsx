import React from 'react';

interface SheetSwapToggleProps {
  mode: 'chart' | 'table';
  onChange: (mode: 'chart' | 'table') => void;
  className?: string;
}

export const SheetSwapToggle: React.FC<SheetSwapToggleProps> = ({
  mode,
  onChange,
  className = '',
}) => {
  return (
    <div className={`inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px] shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => onChange('chart')}
        className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
          mode === 'chart'
            ? 'bg-blue-600 text-white shadow-2xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Grafik
      </button>
      <button
        type="button"
        onClick={() => onChange('table')}
        className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
          mode === 'table'
            ? 'bg-blue-600 text-white shadow-2xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Tabel Detail
      </button>
    </div>
  );
};
