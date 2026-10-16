import React from 'react';
import { Sparkles } from 'lucide-react';

export const BandaraPelabuhanLlbNarasiAi: React.FC = () => {
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

      {/* Kolom Kanan: 3 Poin Inti Sejajar Horizontal Khusus DEP-A5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-6 flex-1">
        {/* Poin 01: Kawasan Bandara Hang Nadim (Dit. Bandara) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            01
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Kinerja Kawasan Bandara Internasional Hang Nadim mencapai IKM 88,50 (Mutu A) dan realisasi PNBP Rp 124,50 M (107,03%), didukung 34.250 pergerakan pesawat, 4,12 juta penumpang, serta 42.150 ton kargo udara EMPU.
          </p>
        </div>

        {/* Poin 02: Pelabuhan Batu Ampar & Logistik Maritim (Dit. Pelabuhan) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            02
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Sektor kepelabuhanan mencatatkan IKM 88,40 dan PNBP Rp 250,40 M (107,37%) dengan volume peti kemas 628.400 TEUs di Terminal Batu Ampar berkat operasional STS Crane baru serta arus 18.420 call kapal.
          </p>
        </div>

        {/* Poin 03: Efisiensi Layanan & Kuota Barang (Dit. Lalu Lintas Barang) */}
        <div className="flex items-start gap-2.5">
          <span className="text-slate-400 font-black text-xs sm:text-sm font-mono shrink-0 leading-snug">
            03
          </span>
          <p className="text-xs text-white font-medium leading-relaxed">
            Layanan perizinan lalu lintas barang meraih IKM tertinggi 88,45 dan PNBP Rp 2,48 M (112,73%) dengan kepatuhan SLA 96,8% (rata-rata 1,8 jam) dan realisasi kuota komoditas pokok mencapai 98,2%.
          </p>
        </div>
      </div>
    </div>
  );
};
