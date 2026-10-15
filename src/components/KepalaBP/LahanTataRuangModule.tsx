import React, { useState } from 'react';
import { MapPin, Layers, CheckCircle2, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SwpLahanItem {
  swp: string;
  totalLuasHa: number;
  alokasiHa: number;
  sisaCadanganHa: number;
  persenTerisi: number;
  peruntukanUtama: string;
  status: 'Padat' | 'Tersedia' | 'Siap Investasi';
}

const DATA_7_SWP_LAHAN: SwpLahanItem[] = [
  { swp: 'Batam Kota', totalLuasHa: 2840, alokasiHa: 2500, sisaCadanganHa: 340, persenTerisi: 88.0, peruntukanUtama: 'Pemerintahan & Bisnis Komersial', status: 'Padat' },
  { swp: 'Nongsa (KEK)', totalLuasHa: 4120, alokasiHa: 2680, sisaCadanganHa: 1440, persenTerisi: 65.0, peruntukanUtama: 'Data Center, Digital Hub & Resor', status: 'Siap Investasi' },
  { swp: 'Batu Aji', totalLuasHa: 1980, alokasiHa: 1624, sisaCadanganHa: 356, persenTerisi: 82.0, peruntukanUtama: 'Residensial & UMKM Terpadu', status: 'Padat' },
  { swp: 'Sekupang (KEK)', totalLuasHa: 2450, alokasiHa: 1740, sisaCadanganHa: 710, persenTerisi: 71.0, peruntukanUtama: 'Wisata Medis, Maritim & Hijau', status: 'Siap Investasi' },
  { swp: 'Sagulung', totalLuasHa: 2120, alokasiHa: 1824, sisaCadanganHa: 296, persenTerisi: 86.0, peruntukanUtama: 'Galangan Kapal & Industri Berat', status: 'Padat' },
  { swp: 'Lubuk Baja', totalLuasHa: 1180, alokasiHa: 1110, sisaCadanganHa: 70, persenTerisi: 94.1, peruntukanUtama: 'Jasa Keuangan, Mall & Hotel', status: 'Padat' },
  { swp: 'Batu Ampar', totalLuasHa: 940, alokasiHa: 902, sisaCadanganHa: 38, persenTerisi: 96.0, peruntukanUtama: 'Terminal Kontainer & Pergudangan', status: 'Padat' },
];

const CORONG_PERMOHONAN_LAHAN = [
  { tahap: '1. Permohonan Masuk (SIHPL Online)', berkas: 1450, konversi: '100%', deskripsi: 'Pendaftaran berkas alokasi & perpanjangan UWT secara mandiri' },
  { tahap: '2. Verifikasi Spasial & RTRW BP Batam', berkas: 1280, konversi: '88,3%', deskripsi: 'Pengecekan tumpang tindih tata ruang, hutan lindung, & ROW jalan' },
  { tahap: '3. Pengukuran Lapangan & Pematangan', berkas: 1140, konversi: '89,1%', deskripsi: 'Pematokan batas fisik tapak bersama surveyor Dit. Lahan' },
  { tahap: '4. Pembayaran Faktur UWT & Sewa', berkas: 1020, konversi: '89,5%', deskripsi: 'Penerbitan billing PNBP UWT dan penyetoran ke kas penampung' },
  { tahap: '5. Penerbitan Surat Keputusan PL / SPPT', berkas: 985, konversi: '96,6%', deskripsi: 'Penetapan Lokasi (PL) sah diserahkan kepada pelaku usaha' },
];

export const LahanTataRuangModule: React.FC = () => {
  const [selectedSwp, setSelectedSwp] = useState<SwpLahanItem>(DATA_7_SWP_LAHAN[1]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Peta Ketersediaan Lahan 7 SWP &amp; Corong Permohonan
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Dit. Pengelolaan Pertanahan
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribusi cadangan ruang investasi di 7 Sub-Wilayah Pengembangan dan efisiensi konversi izin penetapan lokasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            Cadangan Tersedia: 3.250 Ha
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kolom Kiri: Matriks 7 SWP Lahan Batam */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Status Ketersediaan Lahan 7 SWP:</span>
            <span className="text-[11px] text-slate-500">Klik untuk melihat detail peruntukan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DATA_7_SWP_LAHAN.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedSwp(item)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedSwp.swp === item.swp
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <h4 className="font-bold text-slate-900">{item.swp}</h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'Siap Investasi'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-slate-500 mb-1.5">
                  <span>Terisi: {item.alokasiHa} Ha</span>
                  <span className="font-semibold text-slate-700">{item.persenTerisi}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${
                      item.persenTerisi >= 90 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${item.persenTerisi}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                  <span>Cadangan Lahan:</span>
                  <span className="font-bold text-blue-700">{item.sisaCadanganHa} Ha</span>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Focus SWP yang Terpilih */}
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">SWP Terpilih:</span>
              <strong className="text-slate-900 font-bold text-sm">{selectedSwp.swp}</strong>
              <span className="text-slate-600 block text-[11px] mt-0.5">
                Peruntukan: {selectedSwp.peruntukanUtama} &bull; Luas Total {selectedSwp.totalLuasHa} Ha
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 block">Sisa {selectedSwp.sisaCadanganHa} Ha</span>
              <span className="text-[10px] text-slate-500">Ready to Build</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Corong Permohonan Lahan (Funnel) */}
        <div className="lg:col-span-5 bg-slate-50/60 rounded-2xl border border-slate-100 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900">
              Corong Permohonan Alokasi Lahan (Pipeline YTD)
            </h4>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Efektivitas 67,9%
            </span>
          </div>

          <div className="space-y-2">
            {CORONG_PERMOHONAN_LAHAN.map((step, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 text-[11px]">{step.tahap}</span>
                  <span className="font-bold text-blue-600">{step.berkas} Berkas</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {step.deskripsi}
                </p>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden mt-1">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${(step.berkas / 1450) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
            <span>Rata-rata SLA Penerbitan PL:</span>
            <strong className="text-slate-900 font-bold">14 Hari Kerja (Sesuai SOP)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
