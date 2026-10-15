import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';

interface InsightCard {
  tipe: 'Peluang' | 'Risiko' | 'Peringatan' | 'Saran Kebijakan';
  judul: string;
  deskripsi: string;
  dampak: string;
  satkerTerkait: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}

const INSIGHTS_LIST: InsightCard[] = [
  {
    tipe: 'Peluang',
    judul: 'Akselerasi Pusat Data & AI Hub KEK Nongsa Digital Park (54 MW)',
    deskripsi:
      'Terdapat komitmen investasi baru dari 3 operator data center tier-3 internasional senilai Rp 8,4 Triliun yang dapat mendongkrak capaian IKS-1 melampaui target Rp 70 T.',
    dampak: 'Potensi penambahan investasi +Rp 8,4 Triliun dan serapan 2.450 tenaga kerja digital.',
    satkerTerkait: 'Dit. KEK & Investasi &bull; PDSI',
    borderColor: 'border-l-blue-600',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
  },
  {
    tipe: 'Risiko',
    judul: 'Keterisian Waduk Sei Ladi di Angka 86,4% Menjelang Musim Kering Q3',
    deskripsi:
      'Elevasi air waduk Sei Ladi turun 0,6 meter di bawah ambang normal akibat proyek pengalihan utilitas pipa dan curah hujan rendah di catchment area Sekupang.',
    dampak: 'Risiko gangguan suplai air 240 L/detik bagi 28.000 pelanggan Sekupang & Tiban.',
    satkerTerkait: 'BU SPAM & Fasling &bull; Ditpam',
    borderColor: 'border-l-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
  },
  {
    tipe: 'Peringatan',
    judul: 'Tingkat Kehilangan Air (Non-Revenue Water) Masih di Atas Ambang 25%',
    deskripsi:
      'Realisasi NRW tercatat 26,8% (selisih gap 1,8%), terutama pada jaringan pipa asbes tua zona Batu Aji & Sagulung yang belum terintegrasi telemetri DMZ modern.',
    dampak: 'Estimasi potensi kehilangan pendapatan air curah mencapai Rp 18,4 Miliar per tahun.',
    satkerTerkait: 'BU SPAM & Fasling &bull; Biro Keuangan',
    borderColor: 'border-l-amber-500',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
  },
  {
    tipe: 'Saran Kebijakan',
    judul: 'Insentif Diskon Denda Perpanjangan UWT untuk Pacu Likuiditas BLU',
    deskripsi:
      'Pemberian stimulus penghapusan denda keterlambatan UWT bagi pemilik persil lahan industri dan perumahan sebelum 31 Desember 2026 dapat mempercepat realisasi PNBP.',
    dampak: 'Diproyeksikan menarik likuiditas kas masuk Rp 180 - 220 Miliar dalam 60 hari kerja.',
    satkerTerkait: 'Dit. Pengelolaan Pertanahan &bull; Biro Keuangan',
    borderColor: 'border-l-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    icon: <Lightbulb className="w-4 h-4 text-emerald-600" />,
  },
];

export const AiInsightsModule: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                AI Strategic Insights &amp; Rekomendasi Kebijakan Pimpinan
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Analitik Prediktif
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Rekomendasi cerdas berbasis data historis Satu Data BP Batam untuk mitigasi risiko dan optimalisasi target Perkin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Diperbarui otomatis tiap siklus cut-off data</span>
        </div>
      </div>

      {/* 4 Cards Grid with colored left border */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {INSIGHTS_LIST.map((item, idx) => (
          <div
            key={idx}
            className={`bg-slate-50/60 hover:bg-slate-50 p-4 rounded-xl border border-slate-100 border-l-4 ${item.borderColor} transition-all space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${item.badgeBg} ${item.badgeText}`}
              >
                {item.icon}
                <span>{item.tipe}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium" dangerouslySetInnerHTML={{ __html: item.satkerTerkait }} />
            </div>

            <h4 className="text-xs font-bold text-slate-900 leading-snug">
              {item.judul}
            </h4>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              {item.deskripsi}
            </p>

            <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">
                <strong className="text-slate-800">Dampak Strategis: </strong>{item.dampak}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
