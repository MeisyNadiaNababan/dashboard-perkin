import React from 'react';
import { Sparkles } from 'lucide-react';

export const PelayananUmumNarasiAi: React.FC = () => {
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

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A6 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: BU Rumah Sakit (RSBP Batam) */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            BU Rumah Sakit (RSBP) mencatat pertumbuhan kinerja +4,55% dengan realisasi PNBP Rp 121,80 M (104,5% target) dan IKM 88,92 (Mutu A), didukung efisiensi BOR 76,2% serta penguatan layanan unggulan kardiovaskular dan KEK Kesehatan Sekupang.
          </p>
        </div>

        {/* Poin 02: BU SPAM, Fasilitas dan Lingkungan */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            BU SPAM Fasling menyumbang pendapatan Rp 142,50 M (102,4% target) dan IKM 88,40, mempertahankan produksi 3.420 L/dtk dari 6 waduk, pengendalian NRW 22,4% pada 23 DMZ, penanganan 14.850 ton limbah B3 KPLI, serta 91,5% okupansi Rusunawa.
          </p>
        </div>

        {/* Poin 03: Dit. Pengamanan Aset dan Kawasan */}
        <div className="flex items-start gap-2.5">
          <span className="text-blue-600 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            Ditpam mengamankan 100% objek vital nasional dan Daerah Tangkapan Air (DTA) waduk dengan response time cepat 11,8 menit, 874 kegiatan penertiban tuntas, serta nihil ancaman gangguan ketertiban institusi.
          </p>
        </div>
      </div>
    </div>
  );
};
