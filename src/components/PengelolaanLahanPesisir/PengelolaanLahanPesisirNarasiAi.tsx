import React from 'react';
import { Sparkles } from 'lucide-react';

export const PengelolaanLahanPesisirNarasiAi: React.FC = () => {
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

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: Pengelolaan Lahan & Alokasi Investasi (Dit. Lahan) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Alokasi lahan investasi terealisasi 248,5 Ha (124,3% dari target 200 Ha) dengan komitmen investasi Rp 18,42 T; didukung surplus PNBP Lahan Rp 1,42 T (108,6%) serta SLA percepatan izin 2,4 hari kerja.
          </p>
        </div>

        {/* Poin 02: Pemanfaatan Ruang Pesisir & Reklamasi (Dit. Pesisir) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Luas izin pemanfaatan pesisir &amp; reklamasi mencapai 162,8 Ha (108,5% dari target 150 Ha), 100% selaras zonasi RZWP3K dengan 48 izin resmi terbit dan 88,6% penyelesaian aduan pesisir tuntas.
          </p>
        </div>

        {/* Poin 03: Pengawasan & Rekuperasi Aset (Dit. Pengendalian) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Indeks pengawasan mencapai 89,40% (Target 80%) dengan 422 objek terpantau (93,8% patuh); 94,6 Ha lahan mangkrak berhasil direkuperasi menyelamatkan aset Rp 3,48 T serta 94,8% sengketa selesai.
          </p>
        </div>
      </div>
    </div>
  );
};
