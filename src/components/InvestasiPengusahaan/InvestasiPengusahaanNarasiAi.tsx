import React from 'react';
import { Sparkles } from 'lucide-react';

export const InvestasiPengusahaanNarasiAi: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 text-slate-900 shadow-2xs p-4 sm:px-6 sm:py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 font-sans">
      {/* Kolom Kiri: Branding Narasi AI Strategis */}
      <div className="flex items-center gap-3 shrink-0 lg:pr-6 lg:border-r lg:border-slate-200">
        <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
        <div className="leading-tight">
          <span className="block text-xs font-black tracking-wider uppercase text-slate-900">
            NARASI AI
          </span>
          <span className="block text-xs font-black tracking-wider uppercase text-slate-900">
            STRATEGIS
          </span>
        </div>
      </div>

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: Realisasi Investasi & Pelayanan Modal (Dit. Investasi) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Realisasi penanaman modal KPBPB Batam melampaui target mencapai Rp 63,85 T (106,42% dari target Rp 60 T), disumbang PMA 74,7% dan PMDN 25,3% pada klaster semikonduktor, data center, dan industri maritim.
          </p>
        </div>

        {/* Poin 02: Efektivitas Promosi & Akselerasi KEK (Dit. KEK) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Kegiatan promosi menghasilkan 218 minat investasi (leads) dari 97 agenda global; 100% kajian KEK ditindaklanjuti serta investasi KEK Nongsa Digital &amp; Batam Aero Technic terealisasi Rp 8,01 T (109,7%).
          </p>
        </div>

        {/* Poin 03: Pengendalian & Kemitraan Badan Usaha (Dit. Pengendalian Usaha) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Tingkat kepatuhan pengendalian kemitraan mencapai 95,45% dengan 105 dari 110 rekomendasi pembinaan tuntas ditindaklanjuti mitra dan 28 dokumen PKS kerja sama operasional diawasi akuntabel.
          </p>
        </div>
      </div>
    </div>
  );
};
