import React from 'react';
import { Sparkles } from 'lucide-react';

export const AdministrasiKeuanganNarasiAi: React.FC = () => {
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

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: Fiskal & Belanja */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Realisasi belanja mencapai 85,5% (Rp 1.937,9 M) dengan likuiditas kas aman Rp 1,42 T; akselerasi serapan belanja modal pada satker operasional perlu dijaga.
          </p>
        </div>

        {/* Poin 02: Sistem Merit & SDM */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Indeks Sistem Merit meraih predikat Sangat Baik (342,5 / Kategori IV); perluasan talent pool 9-box dan pemenuhan 20 JP pelatihan per pegawai terus diperkuat.
          </p>
        </div>

        {/* Poin 03: Tata Kelola, SPIP & Opini BPK */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Opini WTP BPK RI berhasil dipertahankan 8 tahun berturut-turut dengan penyelesaian tindak lanjut 93,9% serta maturitas SPIP Level 3 Terdefinisi.
          </p>
        </div>
      </div>
    </div>
  );
};
