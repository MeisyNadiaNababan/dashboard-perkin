import React from 'react';
import { Sparkles } from 'lucide-react';

export const NarasiAiInsightBar: React.FC = () => {
  return (
    <div className="bg-[#051329] rounded-xl border border-slate-800/90 text-white shadow-md p-4 sm:px-6 sm:py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 font-sans">
      {/* Kolom Kiri: Branding Narasi AI Strategis persis referensi screenshot */}
      <div className="flex items-center gap-3 shrink-0 lg:pr-6 lg:border-r lg:border-slate-700/80">
        <Sparkles className="w-5 h-5 text-white shrink-0" />
        <div className="leading-tight">
          <span className="block text-xs font-black tracking-wider uppercase text-white">
            NARASI AI
          </span>
          <span className="block text-xs font-black tracking-wider uppercase text-white">
            STRATEGIS
          </span>
        </div>
      </div>

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01 */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Investasi tumbuh positif mencapai 78,1% dari target tahunan; percepatan pipeline ke tahap operasional adalah prioritas utama.
          </p>
        </div>

        {/* Poin 02 */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Backlog perizinan di sektor kelautan dan konstruksi menyumbang 40% dari total antrean; diperlukan intervensi manajerial segera.
          </p>
        </div>

        {/* Poin 03 */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Rasio serapan belanja 85,5% menunjukkan perlunya akselerasi belanja modal pada unit dengan serapan rendah untuk menjaga stabilitas fiskal.
          </p>
        </div>
      </div>
    </div>
  );
};
