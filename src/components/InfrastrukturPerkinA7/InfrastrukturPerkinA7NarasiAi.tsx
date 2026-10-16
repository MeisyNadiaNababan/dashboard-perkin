import React from 'react';
import { Sparkles } from 'lucide-react';

export const InfrastrukturPerkinA7NarasiAi: React.FC = () => {
  return (
    <div className="bg-[#051329] rounded-xl border border-slate-800/90 text-white shadow-md p-4 sm:px-6 sm:py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 font-sans">
      {/* Kolom Kiri: Branding Narasi AI Strategis persis referensi DEP-A4 & DEP-A3 */}
      <div className="flex items-center gap-3 shrink-0 lg:pr-6 lg:border-r lg:border-slate-700/80">
        <Sparkles className="w-5 h-5 text-cyan-300 shrink-0" />
        <div className="leading-tight">
          <span className="block text-xs font-black tracking-wider uppercase text-white">
            NARASI AI
          </span>
          <span className="block text-xs font-black tracking-wider uppercase text-white">
            STRATEGIS
          </span>
        </div>
      </div>

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A7 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: Dit. Pembangunan Infrastruktur (Kurva S & PNBP ROW) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Penyelenggaraan konstruksi fisik mencapai progres kumulatif 92,40% dengan 12 dari 14 paket strategis (Flyover Sei Ladi, Jl. Sudirman, Dermaga Batu Ampar) berjalan on schedule, didukung realisasi PNBP ROW Rp 7,45 Miliar (109,22% melampaui target DIPA).
          </p>
        </div>

        {/* Poin 02: Dit. Perencanaan Infrastruktur (DED 6 Sektor) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Perencanaan teknis menyelesaikan 43 paket DED di 6 sektor strategis (Gedung, Drainase/Utilitas, Wisata, RTH, Darat, Laut/Udara) dengan pagu Rp 53,68 M (serapan 84,1%) dan durasi efisien 5,5 bulan guna menjamin kesiapan tender fisik 100%.
          </p>
        </div>

        {/* Poin 03: Dit. Pengamanan Aset dan Kawasan (Ditpam) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Sterilisasi koridor ROW jalan dan pengamanan aset menertibkan 1.030 unit bangunan liar tanpa resistensi hukum, patroli 48 objek vital nasional berjalan 100% kondusif, serta perlindungan 142 Ha hutan lindung tangkapan air (DTA) waduk.
          </p>
        </div>
      </div>
    </div>
  );
};
