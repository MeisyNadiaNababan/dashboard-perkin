import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, FileCheck, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface RiskItem {
  id: string;
  nama: string;
  kategori: string;
  dampak: number; // 1 - 5
  kemungkinan: number; // 1 - 5
  level: 'Tinggi' | 'Sedang' | 'Rendah';
  mitigasi: string;
}

const STRATEGIC_RISKS: RiskItem[] = [
  {
    id: 'R-01',
    nama: 'Ketergantungan Pasokan Air Waduk Tunggal Duriangkang (48% Suplai Kota)',
    kategori: 'Operasional Utilitas',
    dampak: 5,
    kemungkinan: 3,
    level: 'Tinggi',
    mitigasi: 'Pembangunan pipa interkoneksi Tembesi-Mukakuning dan pengamanan sempadan catchment area.',
  },
  {
    id: 'R-02',
    nama: 'Volatilitas Nilai Tukar & Suku Bunga pada Realisasi Modal Lancar Ekspor-Impor',
    kategori: 'Finansial & Investasi',
    dampak: 4,
    kemungkinan: 3,
    level: 'Sedang',
    mitigasi: 'Fasilitas tax incentive FTZ Batam dan percepatan clearance dokumen kepabeanan KPU BC.',
  },
  {
    id: 'R-03',
    nama: 'Sengketa Okupasi Lahan HPL BP Batam oleh Pihak Ketiga & Pemukiman Liar',
    kategori: 'Hukum & Tata Ruang',
    dampak: 4,
    kemungkinan: 2,
    level: 'Sedang',
    mitigasi: 'Operasi penertiban terpadu Ditpam bersama Pemko Batam dan sertifikasi batas spasial.',
  },
  {
    id: 'R-04',
    nama: 'Fluktuasi Throughput Kontainer Internasional akibat Geopolitik Selat Malaka',
    kategori: 'Maritim & Logistik',
    dampak: 3,
    kemungkinan: 2,
    level: 'Rendah',
    mitigasi: 'Otomatisasi STS Crane Batu Ampar untuk menekan dwell time menjadi di bawah 2 hari.',
  },
  {
    id: 'R-05',
    nama: 'Kerentanan Siber pada Sistem Satu Data & Server Tier-3 PDSI BP Batam',
    kategori: 'Teknologi & SPBE',
    dampak: 4,
    kemungkinan: 1,
    level: 'Rendah',
    mitigasi: 'Security Operation Center (SOC) 24/7 dan sertifikasi ISO 27001 Sistem Manajemen Keamanan Informasi.',
  },
];

export const RisikoAuditModule: React.FC = () => {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem>(STRATEGIC_RISKS[0]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Peta Panas Risiko (Risk Heatmap) &amp; Tindak Lanjut Audit BPK / SPI
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Opini WTP 8x
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Matriks probabilitas vs dampak risiko institusi serta kepatuhan tindak lanjut rekomendasi audit pemeriksa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            Penyelesaian BPK: 93,9% Tuntas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kolom Kiri: Matriks Panas Risiko (5x5 Visual Grid) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Matriks Panas Risiko Strategis (Probabilitas vs Dampak):</span>
            <span className="text-[11px] text-slate-500">5 Isu Kunci Teridentifikasi</span>
          </div>

          <div className="space-y-2">
            {STRATEGIC_RISKS.map((risk) => (
              <div
                key={risk.id}
                onClick={() => setSelectedRisk(risk)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedRisk.id === risk.id
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 font-mono text-[11px]">{risk.id}</span>
                    <span className="font-semibold text-slate-900">{risk.kategori}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      risk.level === 'Tinggi'
                        ? 'bg-rose-50 text-rose-700'
                        : risk.level === 'Sedang'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    Tingkat Risiko: {risk.level} (Dampak {risk.dampak} &bull; Prob {risk.kemungkinan})
                  </span>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-snug">
                  {risk.nama}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 pt-1 border-t border-slate-200/50 leading-relaxed">
                  <strong className="text-blue-700">Mitigasi Pengendalian: </strong>
                  {risk.mitigasi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Pelacak Rekomendasi Audit BPK RI & SPI */}
        <div className="lg:col-span-5 bg-slate-50/60 rounded-2xl border border-slate-100 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900">
              Pelacak Tindak Lanjut Temuan BPK RI &amp; SPI Internal
            </h4>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Kategori Terkendali
            </span>
          </div>

          {/* BPK Card */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">BPK RI (Audit Laporan Keuangan)</span>
              <span className="font-bold text-emerald-700">93,9% Selesai</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '93.9%' }} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Temuan</span>
                <strong className="text-slate-900 font-bold">148</strong>
              </div>
              <div>
                <span className="text-emerald-600 block text-[10px]">Tuntas</span>
                <strong className="text-emerald-700 font-bold">139 (93,9%)</strong>
              </div>
              <div>
                <span className="text-amber-600 block text-[10px]">Proses</span>
                <strong className="text-amber-700 font-bold">9 (6,1%)</strong>
              </div>
            </div>
          </div>

          {/* SPI Card */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Satuan Pengawas Internal (SPI)</span>
              <span className="font-bold text-blue-700">94,0% Selesai</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '94.0%' }} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Temuan</span>
                <strong className="text-slate-900 font-bold">84</strong>
              </div>
              <div>
                <span className="text-blue-600 block text-[10px]">Tuntas</span>
                <strong className="text-blue-700 font-bold">79 (94,0%)</strong>
              </div>
              <div>
                <span className="text-amber-600 block text-[10px]">Proses</span>
                <strong className="text-amber-700 font-bold">5 (6,0%)</strong>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-slate-600">
            <strong>Catatan Audit: </strong>
            Tidak ditemukan temuan material yang berdampak pada opini laporan keuangan. Seluruh sisa 14 rekomendasi sedang dalam tahap rekonsiliasi administrasi aset lama.
          </div>
        </div>
      </div>
    </div>
  );
};
