import React from 'react';
import { HardHat, Activity, CheckCircle2, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

// Data Kurva S Kumulatif (Rencana vs Realisasi Fisik %)
const KURVA_S_KUMULATIF = [
  { bln: 'Jan', rencana: 8.0, realisasi: 8.5 },
  { bln: 'Feb', rencana: 18.0, realisasi: 19.2 },
  { bln: 'Mar', rencana: 30.0, realisasi: 31.8 },
  { bln: 'Apr', rencana: 45.0, realisasi: 46.5 },
  { bln: 'Mei', rencana: 58.0, realisasi: 59.4 },
  { bln: 'Jun', rencana: 72.0, realisasi: 73.8 },
  { bln: 'Jul', rencana: 84.0, realisasi: 85.6 },
  { bln: 'Ags', rencana: 92.0, realisasi: 92.4 },
  { bln: 'Sep', rencana: 96.0, realisasi: 96.8 },
  { bln: 'Okt', rencana: 98.5, realisasi: null },
  { bln: 'Nov', rencana: 99.5, realisasi: null },
  { bln: 'Des', rencana: 100.0, realisasi: null },
];

interface ProyekFisik {
  nama: string;
  lokasi: string;
  paguMiliar: number;
  progresFisik: number;
  targetFisik: number;
  deviasi: number;
  status: 'Ahead' | 'On Schedule' | 'Minor Delay';
  kontraktor: string;
  targetSelesai: string;
}

const PROYEK_STRATEGIS_LIST: ProyekFisik[] = [
  {
    nama: 'Pembangunan Flyover Simpang Sei Ladi',
    lokasi: 'Sekupang - Batam Center',
    paguMiliar: 132.8,
    progresFisik: 94.2,
    targetFisik: 91.5,
    deviasi: 2.7,
    status: 'Ahead',
    kontraktor: 'PT Adhi Karya (Persero) Tbk',
    targetSelesai: 'Mei 2026',
  },
  {
    nama: 'Modernisasi Terminal Peti Kemas Batu Ampar (STS Crane)',
    lokasi: 'Dermaga Utara Batu Ampar',
    paguMiliar: 380.0,
    progresFisik: 86.5,
    targetFisik: 85.0,
    deviasi: 1.5,
    status: 'Ahead',
    kontraktor: 'Konsorsium PT Wika - PT Pelindo',
    targetSelesai: 'Agustus 2026',
  },
  {
    nama: 'Pelebaran Jalan Arteri Sudirman (ROW 100)',
    lokasi: 'Batam Center - Mukakuning',
    paguMiliar: 215.4,
    progresFisik: 91.0,
    targetFisik: 90.0,
    deviasi: 1.0,
    status: 'Ahead',
    kontraktor: 'PT Pembangunan Perumahan Tbk',
    targetSelesai: 'Juli 2026',
  },
  {
    nama: 'Terminal 2 & Fasilitas Kargo Bandara Hang Nadim',
    lokasi: 'Kawasan Bandara Hang Nadim',
    paguMiliar: 420.5,
    progresFisik: 78.4,
    targetFisik: 77.0,
    deviasi: 1.4,
    status: 'On Schedule',
    kontraktor: 'PT BIB (Incheon & Wika)',
    targetSelesai: 'Desember 2026',
  },
  {
    nama: 'Pipa Transmisi SPAM & Booster Duriangkang-Mukakuning',
    lokasi: 'Duriangkang - Batu Aji',
    paguMiliar: 185.0,
    progresFisik: 88.2,
    targetFisik: 87.5,
    deviasi: 0.7,
    status: 'On Schedule',
    kontraktor: 'PT Nindya Karya (Persero)',
    targetSelesai: 'September 2026',
  },
  {
    nama: 'Pembangunan Koridor Jalan Akses & Jembatan Rempang',
    lokasi: 'Rempang Eco-City',
    paguMiliar: 168.2,
    progresFisik: 72.5,
    targetFisik: 74.0,
    deviasi: -1.5,
    status: 'Minor Delay',
    kontraktor: 'PT Hutama Karya (Persero) Tbk',
    targetSelesai: 'November 2026',
  },
];

export const MegaproyekKurvaSModule: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Peta Proyek Konstruksi &amp; Kurva S Progres Fisik
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                14 Megaproyek Strategis
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pemantauan kumulatif kurva S rencana vs realisasi fisik konstruksi konektivitas, pelabuhan, bandara, dan SPAM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Deviasi Rata-rata</span>
            <span className="font-bold text-emerald-700">+0,8% (Ahead of Schedule)</span>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Total Pagu Belanja Fisik</span>
            <span className="font-bold text-blue-700">Rp 1,50 Triliun</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kolom Kiri: Kurva S Recharts Line Chart */}
        <div className="lg:col-span-6 bg-slate-50/60 rounded-2xl border border-slate-100 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Kurva S Kumulatif Fisik Konstruksi (%)</h4>
              <p className="text-[11px] text-slate-500">Januari - Desember 2026</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-0.5 bg-slate-400 inline-block" /> Rencana
              </span>
              <span className="flex items-center gap-1.5 font-bold text-blue-600">
                <span className="w-2.5 h-1 bg-blue-600 inline-block rounded-full" /> Realisasi (+0,8%)
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={KURVA_S_KUMULATIF} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bln" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val}%`, name === 'rencana' ? 'Rencana Fisik' : 'Realisasi Aktual']}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                />
                <Line
                  type="monotone"
                  dataKey="rencana"
                  stroke="#94A3B8"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={{ r: 2, fill: '#94A3B8' }}
                  name="rencana"
                />
                <Line
                  type="monotone"
                  dataKey="realisasi"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#2563EB' }}
                  name="realisasi"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-slate-700 flex items-center justify-between">
            <span>Status Progres: <strong>Ahead of Schedule (+0,8%)</strong></span>
            <span className="text-emerald-800 font-semibold">5 dari 6 Proyek Lebih Cepat</span>
          </div>
        </div>

        {/* Kolom Kanan: Daftar 6 Proyek Konstruksi Strategis */}
        <div className="lg:col-span-6 space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
          {PROYEK_STRATEGIS_LIST.map((p, idx) => (
            <div key={idx} className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-all space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">{p.nama}</h5>
                  <span className="text-[10px] text-slate-500 block">{p.lokasi} &bull; {p.kontraktor}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    p.status === 'Ahead'
                      ? 'bg-emerald-50 text-emerald-700'
                      : p.status === 'On Schedule'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {p.status} ({p.deviasi > 0 ? `+${p.deviasi}%` : `${p.deviasi}%`})
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <span>Pagu: <strong>Rp {p.paguMiliar} M</strong></span>
                <span>Fisik: <strong className="text-slate-900">{p.progresFisik}%</strong> / {p.targetFisik}%</span>
                <span>Target: <strong>{p.targetSelesai}</strong></span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    p.status === 'Ahead' ? 'bg-emerald-500' : p.status === 'On Schedule' ? 'bg-blue-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${p.progresFisik}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
