import React, { useState } from 'react';
import {
  AlertTriangle,
  Droplets,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Activity,
  ChevronRight,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

interface StrategicIssue {
  id: string;
  kode: string;
  judul: string;
  kategori: string;
  lokus: string;
  satker: string;
  urgensi: 'Tinggi' | 'Sedang' | 'Rendah';
  dampak: 'Tinggi' | 'Sedang' | 'Rendah';
  urgensiScore: number; // 0 - 100
  dampakScore: number;  // 0 - 100
  metrikKunci: string;
  ambangBatas: string;
  progresIntervensi: number; // %
  targetSelesai: string;
  statusArahan: 'Instruksi Berjalan' | 'Perlu Eskalasi' | 'On Schedule' | 'Tuntas';
  tindakanNyata: string;
  warna: string;
}

const STRATEGIC_ISSUES: StrategicIssue[] = [
  {
    id: 'issue-1',
    kode: 'AT-01',
    judul: 'Penurunan Elevasi Air Waduk Sei Ladi (-0,6m)',
    kategori: 'Ketahanan Sumber Daya Air',
    lokus: 'Waduk Sei Ladi, Sekupang',
    satker: 'BU SPAM & Ditpam',
    urgensi: 'Tinggi',
    dampak: 'Tinggi',
    urgensiScore: 88,
    dampakScore: 85,
    metrikKunci: 'Elevasi 9,60m DPL (Vol: 9,45M m³)',
    ambangBatas: 'Normal &ge; 10,20m &bull; Kritis &le; 9,00m',
    progresIntervensi: 82,
    targetSelesai: '15 Mei 2026',
    statusArahan: 'Perlu Eskalasi',
    tindakanNyata: 'Aktivasi pipa booster interkoneksi Tembesi-Mukakuning & razia terpadu catchment area',
    warna: '#F59E0B' // Amber
  },
  {
    id: 'issue-2',
    kode: 'AT-02',
    judul: 'Tingkat Kehilangan Air (NRW) Selisih Gap +1,8%',
    kategori: 'Efisiensi Distribusi Air',
    lokus: 'Jaringan Pipa Transmisi Batu Aji Ujung',
    satker: 'BU SPAM',
    urgensi: 'Tinggi',
    dampak: 'Sedang',
    urgensiScore: 78,
    dampakScore: 72,
    metrikKunci: 'NRW 26,8% (Potensi Rp 18,4M/thn)',
    ambangBatas: 'Toleransi Maksimal &le; 25,0%',
    progresIntervensi: 65,
    targetSelesai: '30 Jun 2026',
    statusArahan: 'Instruksi Berjalan',
    tindakanNyata: 'Peremajaan pipa asbes uzur & pemasangan 23 DMZ telemetri tekanan otomatis',
    warna: '#EF4444' // Red
  },
  {
    id: 'issue-3',
    kode: 'AT-03',
    judul: 'Akselerasi Realisasi Investasi PMDN (Gap 11,1% thd PMA)',
    kategori: 'Iklim Investasi & KEK',
    lokus: 'KEK Nongsa Digital Park & Batam Aero',
    satker: 'Dit. Investasi & PTSP',
    urgensi: 'Sedang',
    dampak: 'Tinggi',
    urgensiScore: 58,
    dampakScore: 90,
    metrikKunci: 'PMDN 69,9% (Rp 12,58 T) vs PMA 81,0%',
    ambangBatas: 'Target Perkin Minimal 75,0% YTD',
    progresIntervensi: 88,
    targetSelesai: '30 Apr 2026',
    statusArahan: 'Instruksi Berjalan',
    tindakanNyata: 'Relaksasi AMDAL di MPP Digital & fasilitasi pipeline 52 calon investor Data Center Rp 8,4T',
    warna: '#3B82F6' // Blue
  },
  {
    id: 'issue-4',
    kode: 'AT-04',
    judul: 'Deviasi Positif Megaproyek Flyover Sei Ladi (+0,8%)',
    kategori: 'Infrastruktur Strategis',
    lokus: 'Simpang Sei Ladi & Gajah Mada',
    satker: 'Dit. Pembangunan Infrastruktur',
    urgensi: 'Rendah',
    dampak: 'Tinggi',
    urgensiScore: 35,
    dampakScore: 82,
    metrikKunci: 'Fisik 94,2% (Ahead of Schedule)',
    ambangBatas: 'Target Rencana 93,4% (Deviasi +0,8%)',
    progresIntervensi: 94,
    targetSelesai: '28 Mei 2026',
    statusArahan: 'On Schedule',
    tindakanNyata: 'Penyelesaian erection girder segmental & sinkronisasi traffic light cerdas ATCS',
    warna: '#10B981' // Emerald
  }
];

export const MatriksPengawasanStrategisCockpit: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>('issue-1');

  const activeIssue = STRATEGIC_ISSUES.find((item) => item.id === selectedIssueId) || STRATEGIC_ISSUES[0];

  return (
    <section className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs space-y-6 font-sans">
      {/* 1. HEADER & SINGLE CONSOLIDATED EXECUTIVE STATUS LINE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Matriks Pengawasan Cepat &amp; Cockpit Atensi Strategis Pimpinan
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Surveillance Dashboard &bull; Real-Time
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Instrumen visual pemantauan titik kritis, ambang batas toleransi operasional, dan kepatuhan tindak lanjut arahan Kepala BP Batam
          </p>
        </div>

        {/* Compact Strip Metrics (NO separate cards, just 1 clean inline status bar) */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 px-3.5 py-1.5 rounded-xl text-xs overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-slate-500">Isu Terpantau:</span>
            <span className="font-extrabold text-slate-900">4 Titik Kritis</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Kepatuhan Arahan:</span>
            <span className="font-extrabold text-emerald-600">94,4% (34/36)</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Kemandirian BLU:</span>
            <span className="font-extrabold text-blue-600">0,96 (Sehat)</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Opini BPK:</span>
            <span className="font-extrabold text-indigo-600">WTP 8x</span>
          </div>
        </div>
      </div>

      {/* 2. DUA KOLOM VISUAL: GAUGES & THRESHOLD BARS (KIRI) vs MATRIKS 2D URGENSI & DAMPAK (KANAN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KOLOM KIRI (7 Kolom): SPEEDOMETER & THRESHOLD BARS AMBANG BATAS OPERASIONAL */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              Toleransi Ambang Batas Operasional (Threshold Meters)
            </span>
            <span className="text-slate-400 text-[11px]">Standar Operasi KPBPB 2026</span>
          </div>

          <div className="space-y-3.5 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            {/* Meter 1: Elevasi Air Waduk Sei Ladi */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-amber-500" />
                  Elevasi Waduk Sei Ladi: <span className="text-amber-700 font-extrabold">9,60 m DPL</span>
                </span>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Status: Waspada 86,4%
                </span>
              </div>
              {/* Visual Multi-Segment Threshold Bar */}
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                {/* Safe zone indicator */}
                <div style={{ width: '40%' }} className="bg-red-400/80" title="Zona Kritis (< 9,0m)"></div>
                <div style={{ width: '35%' }} className="bg-amber-400" title="Zona Waspada (9,0m - 9,8m)"></div>
                <div style={{ width: '25%' }} className="bg-emerald-500" title="Zona Aman (> 9,8m)"></div>
                {/* Pointer Marker */}
                <div
                  style={{ left: '72%' }}
                  className="absolute top-0 bottom-0 w-1.5 bg-slate-900 shadow-md -translate-x-1/2"
                  title="Posisi Saat Ini: 9,60m DPL"
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Kritis &le; 9,00m</span>
                <span className="text-amber-700 font-bold">▲ Aktual 9,60m (Gap -0,6m)</span>
                <span>Normal &ge; 10,20m</span>
              </div>
            </div>

            {/* Meter 2: Tingkat Kehilangan Air (NRW) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  Tingkat Kehilangan Air (NRW): <span className="text-red-600 font-extrabold">26,8%</span>
                </span>
                <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Gap +1,8% di Atas Toleransi
                </span>
              </div>
              {/* Visual Multi-Segment Threshold Bar */}
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                <div style={{ width: '70%' }} className="bg-emerald-500" title="Zona Optimal (< 22%)"></div>
                <div style={{ width: '13%' }} className="bg-amber-400" title="Zona Toleransi (22% - 25%)"></div>
                <div style={{ width: '17%' }} className="bg-red-500" title="Zona Merah (> 25%)"></div>
                {/* Pointer Marker */}
                <div
                  style={{ left: '88%' }}
                  className="absolute top-0 bottom-0 w-1.5 bg-slate-900 shadow-md -translate-x-1/2"
                  title="Posisi Aktual: 26,8%"
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Efisiensi Prima &le; 22%</span>
                <span className="text-slate-600 font-semibold">Toleransi Maks. 25,0%</span>
                <span className="text-red-600 font-bold">▲ Aktual 26,8%</span>
              </div>
            </div>

            {/* Meter 3: Rasio Realisasi Investasi PMDN thd Target */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Investasi PMDN vs PMA: <span className="text-blue-700 font-extrabold">Rp 12,58 T (69,9%)</span>
                </span>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  PMA Prima 81,0%
                </span>
              </div>
              {/* Visual Progress Bar */}
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                <div style={{ width: '69.9%' }} className="bg-blue-600 rounded-full"></div>
                <div
                  style={{ left: '75%' }}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-700 dashed"
                  title="Target Minimal YTD 75%"
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0%</span>
                <span className="text-blue-700 font-bold">PMDN 69,9%</span>
                <span className="text-slate-600">Target YTD 75% | PMA 81%</span>
              </div>
            </div>

            {/* Meter 4: Rasio Likuiditas & Kemandirian BLU */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Kemandirian Fiskal BLU: <span className="text-emerald-700 font-extrabold">Rasio 0,96</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Saldo Kas Rp 1,428 T
                </span>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                <div style={{ width: '96%' }} className="bg-emerald-500 rounded-full"></div>
                <div
                  style={{ left: '90%' }}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900"
                  title="Ambang Sehat 0,90"
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Defisit &lt; 0,80</span>
                <span>Batas Sehat 0,90</span>
                <span className="text-emerald-700 font-bold">▲ Sangat Sehat (0,96)</span>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (5 Kolom): 2D SCATTER / COORDINATE MATRIX (URGENSI vs DAMPAK) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Matriks 2D Koordinat (Urgensi vs Dampak)
            </span>
            <span className="text-slate-400 text-[10px]">Klik titik untuk detail</span>
          </div>

          {/* SVG Matrix Quadrant Plot */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 relative flex-1 flex flex-col justify-center">
            {/* Quadrant Visual Board */}
            <div className="w-full h-52 relative border-l-2 border-b-2 border-slate-400/70 p-2">
              {/* Quadrant grid lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 border-dashed border-t border-slate-300"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 border-dashed border-l border-slate-300"></div>

              {/* Quadrant Labels */}
              <span className="absolute top-1.5 left-2 text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                Kuadran II: Dampak Tinggi (Terkendali)
              </span>
              <span className="absolute top-1.5 right-2 text-[9.5px] font-bold text-red-500 uppercase tracking-wider">
                Kuadran I: Prioritas Intervensi Segera
              </span>
              <span className="absolute bottom-1.5 left-2 text-[9.5px] font-bold text-emerald-600 uppercase tracking-wider">
                Kuadran IV: Pemantauan Rutin
              </span>
              <span className="absolute bottom-1.5 right-2 text-[9.5px] font-bold text-blue-600 uppercase tracking-wider">
                Kuadran III: Akselerasi Peluang
              </span>

              {/* Axis Labels */}
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold text-slate-500">
                DAMPAK ▲
              </span>
              <span className="absolute bottom-0 right-2 translate-y-4 text-[9px] font-bold text-slate-500">
                URGENSI ►
              </span>

              {/* Plot Points */}
              {STRATEGIC_ISSUES.map((issue) => {
                const isSelected = issue.id === selectedIssueId;
                return (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    style={{
                      left: `${issue.urgensiScore}%`,
                      bottom: `${issue.dampakScore}%`,
                      backgroundColor: issue.warna
                    }}
                    className={`absolute -translate-x-1/2 translate-y-1/2 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all cursor-pointer ${
                      isSelected
                        ? 'w-7 h-7 text-xs ring-4 ring-blue-300 scale-125 z-20'
                        : 'w-5 h-5 text-[10px] opacity-85 hover:opacity-100 hover:scale-110 z-10'
                    }`}
                    title={`${issue.kode}: ${issue.judul}`}
                  >
                    {issue.kode.replace('AT-', '')}
                  </button>
                );
              })}
            </div>

            {/* Selected Issue Preview Box */}
            <div className="mt-2.5 p-2.5 bg-white rounded-lg border border-slate-200/90 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: activeIssue.warna }}
                  ></span>
                  {activeIssue.kode}: {activeIssue.judul}
                </span>
                <span className="text-[10.5px] font-bold px-2 py-0.2 rounded bg-slate-100 text-slate-700">
                  {activeIssue.satker}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                {activeIssue.tindakanNyata}
              </p>
              <div className="flex justify-between text-[10.5px] pt-1 text-slate-500 border-t border-slate-100">
                <span>Target: <strong>{activeIssue.targetSelesai}</strong></span>
                <span className="font-bold text-blue-600">Progres: {activeIssue.progresIntervensi}% Selesai</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABEL VISUAL KENDALI INTERVENSI STRATEGIS PIMPINAN (BUKAN KARTU TEKS, TAPI TABEL PROGRESS) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-extrabold text-slate-900 tracking-tight text-xs uppercase">
            Matriks Pelacak Arahan &amp; Intervensi Terpadu Kepala BP Batam
          </span>
          <span className="text-slate-400 text-[11px]">4 Program Pengawasan Prioritas</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/80">
          <table className="w-full text-left text-xs border-collapse bg-white">
            <thead>
              <tr className="bg-slate-50/90 text-slate-600 border-b border-slate-200 text-[11px] font-bold">
                <th className="py-2.5 px-3 w-16">KODE</th>
                <th className="py-2.5 px-3">ISU STRATEGIS &amp; LOKUS</th>
                <th className="py-2.5 px-3 w-40">SATKER (PIC)</th>
                <th className="py-2.5 px-3 w-48">METRIK &amp; AMBANG BATAS</th>
                <th className="py-2.5 px-3 w-48">PROGRES INTERVENSI</th>
                <th className="py-2.5 px-3 w-32 text-center">STATUS ARAHAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STRATEGIC_ISSUES.map((issue) => {
                const isSelected = issue.id === selectedIssueId;
                return (
                  <tr
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/60 font-medium' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10.5px] text-white"
                        style={{ backgroundColor: issue.warna }}
                      >
                        {issue.kode}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{issue.judul}</div>
                      <div className="text-[11px] text-slate-500">{issue.lokus}</div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">
                      {issue.satker}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-800">{issue.metrikKunci}</div>
                      <div
                        className="text-[10.5px] text-slate-500"
                        dangerouslySetInnerHTML={{ __html: issue.ambangBatas }}
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-700">{issue.progresIntervensi}%</span>
                        <span className="text-[10px] text-slate-500">Tenggat: {issue.targetSelesai}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{
                            width: `${issue.progresIntervensi}%`,
                            backgroundColor: issue.warna
                          }}
                          className="h-full rounded-full transition-all"
                        ></div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                          issue.statusArahan === 'Perlu Eskalasi'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : issue.statusArahan === 'Instruksi Berjalan'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {issue.statusArahan}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
