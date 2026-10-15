import React from 'react';
import { Sparkles } from 'lucide-react';

export const KebijakanStrategisNarasiAi: React.FC = () => {
  return (
    <div className="bg-[#051329] rounded-xl border border-slate-800/90 text-white shadow-md p-4 sm:px-6 sm:py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 font-sans">
      {/* Kolom Kiri: Branding Narasi AI Strategis persis referensi screenshot DEP-A1 */}
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

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: Perencanaan Strategis (Pusren) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Indeks Perencanaan (IPPN) mencapai 94,20 (Sangat Baik) didukung penetapan Master Plan Jalan 94,9 Km dan penyelesaian rekomendasi peruntukan lahan 95,8% (1.248 berkas selesai).
          </p>
        </div>

        {/* Poin 02: Transformasi SPBE, Data Center & Keamanan Siber (PDSI) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Kematangan SPBE mencapai 4,12 dan evaluasi EPSS 2,85 (Baik); okupansi rak data center 81,3% di 4 ruangan dengan kepuasan pelanggan 93,9% serta 100% mitigasi serangan IT SOC.
          </p>
        </div>

        {/* Poin 03: Efisiensi Perizinan & Layanan MPP (PTSP) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            IKM PTSP mencapai 88,42 (Mutu A) dengan kepatuhan SLA perizinan tepat waktu 94,8% (14.080 izin) serta penyelesaian monitoring pengaduan masyarakat tuntas 98,4% (185 dari 188 aduan).
          </p>
        </div>
      </div>
    </div>
  );
};
