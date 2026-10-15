import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Building2,
  Filter,
  ArrowUpRight,
  Search
} from 'lucide-react';

interface DirectiveItem {
  id: string;
  unit: string;
  arahan: string;
  prioritas: 'Tinggi' | 'Sedang' | 'Rutin';
  tenggat: string;
  status: 'Selesai' | 'On Track' | 'Terlambat' | 'Perlu Perhatian';
  progresPersen: number;
  tanggalInput: string;
}

const DIRECTIVES_DATA: DirectiveItem[] = [
  {
    id: 'DIR-01',
    unit: 'Dit. Pembangunan Infrastruktur',
    arahan: 'Percepatan penyelesaian Flyover Sei Ladi segmen barat sebelum Lebaran 2026',
    prioritas: 'Tinggi',
    tenggat: '15 Maret 2026',
    status: 'Selesai',
    progresPersen: 100,
    tanggalInput: '10 Jan 2026',
  },
  {
    id: 'DIR-02',
    unit: 'Dit. Pengelolaan Pertanahan',
    arahan: 'Penyelesaian tunggakan UWT dan simplifikasi revisi PL kawasan industri Batam Center',
    prioritas: 'Tinggi',
    tenggat: '30 April 2026',
    status: 'On Track',
    progresPersen: 82,
    tanggalInput: '15 Jan 2026',
  },
  {
    id: 'DIR-03',
    unit: 'BU SPAM, Fasilitas & Lingkungan',
    arahan: 'Pemasangan telemetry pressure gauge di 23 DMZ rawan air & stabilisasi Waduk Sei Ladi',
    prioritas: 'Tinggi',
    tenggat: '10 Mei 2026',
    status: 'On Track',
    progresPersen: 90,
    tanggalInput: '20 Jan 2026',
  },
  {
    id: 'DIR-04',
    unit: 'Dit. Pengelolaan Kepelabuhanan',
    arahan: 'Uji coba operasional penuh STS Crane dermaga utara Terminal Peti Kemas Batu Ampar',
    prioritas: 'Tinggi',
    tenggat: '28 Februari 2026',
    status: 'Selesai',
    progresPersen: 100,
    tanggalInput: '05 Jan 2026',
  },
  {
    id: 'DIR-05',
    unit: 'Biro Keuangan',
    arahan: 'Rekonsiliasi piutang macet sewa rusunawa pekerja & percepatan pelaporan BLU semester 1',
    prioritas: 'Sedang',
    tenggat: '25 Mei 2026',
    status: 'On Track',
    progresPersen: 75,
    tanggalInput: '02 Feb 2026',
  },
  {
    id: 'DIR-06',
    unit: 'Dit. Kawasan Bandara Hang Nadim',
    arahan: 'Percepatan integrasi sistem BHS Terminal 2 dan penambahan kapasitas gudang EMPU kargo',
    prioritas: 'Tinggi',
    tenggat: '15 Juni 2026',
    status: 'Perlu Perhatian',
    progresPersen: 64,
    tanggalInput: '18 Jan 2026',
  },
  {
    id: 'DIR-07',
    unit: 'Dit. Pengamanan Aset & Kawasan',
    arahan: 'Sterilisasi batas sempadan 142 Ha hutan lindung tangkapan air Waduk Duriangkang',
    prioritas: 'Tinggi',
    tenggat: '20 April 2026',
    status: 'On Track',
    progresPersen: 88,
    tanggalInput: '12 Jan 2026',
  },
  {
    id: 'DIR-08',
    unit: 'Dit. Kawasan Pesisir & Reklamasi',
    arahan: 'Audit perizinan pemanfaatan ruang laut dan kesesuaian PKKPRL proyek galangan kapal',
    prioritas: 'Sedang',
    tenggat: '05 Mei 2026',
    status: 'Terlambat',
    progresPersen: 45,
    tanggalInput: '08 Feb 2026',
  },
];

export const ArahanPimpinanModule: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredDirectives = DIRECTIVES_DATA.filter((d) => {
    if (filterStatus === 'ALL') return true;
    return d.status === filterStatus;
  });

  const countSelesai = DIRECTIVES_DATA.filter((d) => d.status === 'Selesai').length;
  const countOnTrack = DIRECTIVES_DATA.filter((d) => d.status === 'On Track').length;
  const countPerluPerhatian = DIRECTIVES_DATA.filter((d) => d.status === 'Perlu Perhatian').length;
  const countTerlambat = DIRECTIVES_DATA.filter((d) => d.status === 'Terlambat').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Pelacak Arahan Pimpinan &amp; Tindak Lanjut Satker
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Kepatuhan 94,4%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring real-time instruksi strategis Kepala BP Batam beserta tenggat waktu dan status pelaksanaan
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterStatus === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({DIRECTIVES_DATA.length})
          </button>
          <button
            onClick={() => setFilterStatus('Selesai')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterStatus === 'Selesai' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Selesai ({countSelesai})
          </button>
          <button
            onClick={() => setFilterStatus('On Track')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterStatus === 'On Track' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            On Track ({countOnTrack})
          </button>
          <button
            onClick={() => setFilterStatus('Terlambat')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterStatus === 'Terlambat' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terlambat ({countTerlambat})
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
          <span className="text-[10px] text-slate-500 block">Arahan Tuntas</span>
          <span className="text-lg font-bold text-emerald-700">{countSelesai} Instruksi</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">100% verifikasi lapangan</span>
        </div>
        <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
          <span className="text-[10px] text-slate-500 block">Sedang Berjalan (On Track)</span>
          <span className="text-lg font-bold text-blue-700">{countOnTrack} Instruksi</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Sesuai timeline kerja</span>
        </div>
        <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
          <span className="text-[10px] text-slate-500 block">Mendekati Tenggat</span>
          <span className="text-lg font-bold text-amber-700">{countPerluPerhatian} Instruksi</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Sisa waktu &lt; 30 hari</span>
        </div>
        <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100">
          <span className="text-[10px] text-slate-500 block">Terlambat / Tertunda</span>
          <span className="text-lg font-bold text-rose-700">{countTerlambat} Instruksi</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Perlu atensi pimpinan</span>
        </div>
      </div>

      {/* Tabel Tindak Lanjut Terbaru */}
      <div className="overflow-x-auto rounded-xl border border-slate-200/70 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Unit Penanggung Jawab</th>
              <th className="py-2.5 px-3">Instruksi &amp; Arahan Pimpinan</th>
              <th className="py-2.5 px-2 text-center">Prioritas</th>
              <th className="py-2.5 px-2 text-center">Tenggat Waktu</th>
              <th className="py-2.5 px-3 text-center">Progres Fisik</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDirectives.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                  {d.unit}
                </td>
                <td className="py-2.5 px-3 text-slate-700 leading-snug">
                  {d.arahan}
                </td>
                <td className="py-2.5 px-2 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      d.prioritas === 'Tinggi'
                        ? 'bg-rose-50 text-rose-700'
                        : d.prioritas === 'Sedang'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {d.prioritas}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-center text-slate-500 font-medium whitespace-nowrap">
                  {d.tenggat}
                </td>
                <td className="py-2.5 px-3 text-center min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          d.progresPersen === 100
                            ? 'bg-emerald-500'
                            : d.progresPersen >= 70
                            ? 'bg-blue-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${d.progresPersen}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">{d.progresPersen}%</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      d.status === 'Selesai'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : d.status === 'On Track'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : d.status === 'Perlu Perhatian'
                        ? 'bg-amber-50 text-amber-700 border border-amber-100'
                        : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
