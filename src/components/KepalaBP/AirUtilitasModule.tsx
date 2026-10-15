import React from 'react';
import { Droplets, AlertTriangle, CheckCircle2, Activity, ShieldAlert, Waves } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface WadukItem {
  id: string;
  nama: string;
  kapasitasJutaM3: number;
  persenIsi: number;
  elevasiM: number;
  suplaiLps: number;
  status: 'Normal' | 'Siaga' | 'Waspada';
}

const DATA_WADUK: WadukItem[] = [
  { id: 'w-dur', nama: 'Waduk Duriangkang', kapasitasJutaM3: 78.56, persenIsi: 98.2, elevasiM: 6.12, suplaiLps: 2200, status: 'Normal' },
  { id: 'w-tem', nama: 'Waduk Tembesi', kapasitasJutaM3: 56.40, persenIsi: 96.5, elevasiM: 4.85, suplaiLps: 600, status: 'Normal' },
  { id: 'w-muk', nama: 'Waduk Mukakuning', kapasitasJutaM3: 13.20, persenIsi: 95.0, elevasiM: 12.40, suplaiLps: 310, status: 'Normal' },
  { id: 'w-lad', nama: 'Waduk Sei Ladi', kapasitasJutaM3: 9.45, persenIsi: 86.4, elevasiM: 9.60, suplaiLps: 240, status: 'Siaga' },
  { id: 'w-har', nama: 'Waduk Sei Harapan', kapasitasJutaM3: 3.63, persenIsi: 94.1, elevasiM: 7.80, suplaiLps: 210, status: 'Normal' },
  { id: 'w-non', nama: 'Waduk Nongsa', kapasitasJutaM3: 0.72, persenIsi: 92.0, elevasiM: 3.20, suplaiLps: 60, status: 'Normal' },
];

interface StressZone {
  zona: string;
  tingkatStress: 'Tinggi' | 'Sedang' | 'Rendah (Stabil)';
  masalah: string;
  langkahMitigasi: string;
  tekananBar: number;
}

const STRESS_ZONES: StressZone[] = [
  {
    zona: 'Zona 1: Tanjung Uncang & Batu Aji Ujung',
    tingkatStress: 'Tinggi',
    masalah: 'Penurunan tekanan pada jam puncak pemakaian industri galangan (17.00 - 21.00 WIB)',
    langkahMitigasi: 'Operasional Booster Pump Tembesi & instalasi pipa transmisi dia. 800mm',
    tekananBar: 0.8,
  },
  {
    zona: 'Zona 2: Bengkong Puncak Bukit & Batam Center Utara',
    tingkatStress: 'Sedang',
    masalah: 'Elevasi topografi tinggi menyebabkan debit berkurang saat beban puncak',
    langkahMitigasi: 'Penyesuaian valve regulator malam hari & distribusi tangki air darurat',
    tekananBar: 1.2,
  },
  {
    zona: 'Zona 3: Mukakuning, Kabil & Kawasan Industri Batam Center',
    tingkatStress: 'Rendah (Stabil)',
    masalah: 'Suplai debit terjamin stabil 24 jam dengan redundancy pipa ganda',
    langkahMitigasi: 'Pemeliharaan sensor telemetri 23 DMZ secara berkala',
    tekananBar: 2.4,
  },
];

export const AirUtilitasModule: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Ketahanan Air Baku 6 Waduk &amp; Peta Stress Area (NRW)
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                BU SPAM &amp; Fasling
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pemantauan ketinggian elevasi waduk, kehilangan air fisik/komersial (Non-Revenue Water), dan titik rawan suplai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Total Tampungan Waduk</span>
            <span className="font-bold text-slate-900">161,96 Juta m³ (96,8%)</span>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Debit Suplai WTP</span>
            <span className="font-bold text-blue-600">3.840 L/detik</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kolom Kiri: Gauge NRW & Status 6 Waduk */}
        <div className="lg:col-span-7 space-y-4">
          {/* NRW Metric Card */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-18 h-18 rounded-full border-4 border-slate-200 border-t-amber-500 border-r-amber-500 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-lg font-bold text-slate-900 block leading-none">26,8%</span>
                  <span className="text-[9px] font-semibold text-amber-700 block mt-0.5">NRW</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Tingkat Non-Revenue Water (Kehilangan Air)</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  Target batas toleransi: <strong>&le; 25,0%</strong> &bull; Selisih gap 1,8% (~916 L/detik)
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                    Status: Waspada Tekanan
                  </span>
                  <span className="text-slate-500">23 DMZ aktif telemetri</span>
                </div>
              </div>
            </div>

            <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200/60 text-right w-full sm:w-auto">
              <span className="text-[10px] text-slate-400 block">Potensi Revenue Loss:</span>
              <span className="font-bold text-slate-900 text-sm">Rp 18,4 Miliar / Thn</span>
              <span className="text-[10px] text-blue-600 block">Fokus rekayasa pipa tua</span>
            </div>
          </div>

          {/* Tabel 6 Waduk Penopang */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Status 6 Waduk Penopang Utama Kota Batam:</span>
              <span className="text-[11px] text-slate-500">Kapasitas Maks: 167,3 Juta m³</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DATA_WADUK.map((w) => (
                <div key={w.id} className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 truncate text-[11px]">{w.nama.replace('Waduk ', '')}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        w.status === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-[11px]">
                    <span className="text-slate-500">{w.kapasitasJutaM3}M m³</span>
                    <span className="font-bold text-blue-600">{w.persenIsi}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${w.persenIsi < 90 ? 'bg-amber-500' : 'bg-blue-600'}`}
                      style={{ width: `${w.persenIsi}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                    <span>Suplai:</span>
                    <span className="font-medium text-slate-600">{w.suplaiLps} L/s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Peta Stress Area Suplai Air */}
        <div className="lg:col-span-5 bg-slate-50/60 rounded-2xl border border-slate-100 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900">
              Peta Stress Area Distribusi Pipa Air
            </h4>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              3 Zona Pemantauan
            </span>
          </div>

          <div className="space-y-2.5">
            {STRESS_ZONES.map((z, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 text-[11px]">{z.zona}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      z.tingkatStress === 'Tinggi'
                        ? 'bg-rose-50 text-rose-700'
                        : z.tingkatStress === 'Sedang'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    Tekanan {z.tekananBar} Bar &bull; {z.tingkatStress}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  <strong className="text-slate-800">Isu: </strong>{z.masalah}
                </p>
                <p className="text-[10.5px] text-slate-500 leading-tight pt-1 border-t border-slate-100">
                  <strong className="text-blue-700">Mitigasi: </strong>{z.langkahMitigasi}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
            <span>Interkoneksi Waduk Tembesi - Mukakuning:</span>
            <strong className="text-emerald-700 font-bold">Aktif 600 L/detik</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
