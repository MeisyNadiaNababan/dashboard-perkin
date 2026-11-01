import React, { useState } from 'react';
import {
  MapPin,
  Anchor,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Building2,
  Layers,
  Activity,
  AlertTriangle,
  Scale,
  DollarSign,
  FileText,
  Search,
  Filter,
  Check,
  Flame,
  ArrowUpRight,
  Sparkles,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';
import { DirektoratPertanahanDeepDive } from './DirektoratPertanahanDeepDive';

interface PengelolaanLahanPesisirDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

// =====================================================================
// DATASET DIREKTORAT PENGELOLAAN PERTANAHAN (SEBELUMNYA DIT. LAHAN)
// Kini terisolasi & modular di DirektoratPertanahanDeepDive.tsx
// =====================================================================



// =====================================================================
// DATASET DIT. PESISIR & REKLAMASI SESUAI BUKU SATU DATA (HAL. 13-14)
// =====================================================================

// Dataset #4: LUAS IZIN PEMANFAATAN KAWASAN PESISIR & REKLAMASI UNTUK INVESTASI
const IZIN_PESISIR_INVESTASI_DATA = [
  {
    namaPerusahaan: 'PT Kabil Indonusa Maritim',
    nomorIzin: 'PKKPRL/2025/082/DPKPR',
    koordinat: "1°08'42\"N 104°09'15\"E",
    wilayah: 'Kabil & Pesisir Timur',
    luasHa: 56.20,
    tahunPenerbitan: 2025,
  },
  {
    namaPerusahaan: 'PT Tanjung Sauh Port Dev',
    nomorIzin: 'PKKPRL/2025/104/DPKPR',
    koordinat: "1°06'18\"N 104°12'30\"E",
    wilayah: 'Tanjung Sauh',
    luasHa: 44.80,
    tahunPenerbitan: 2025,
  },
  {
    namaPerusahaan: 'PT Sambau Luxury Marina',
    nomorIzin: 'PKKPRL/2026/012/DPKPR',
    koordinat: "1°11'05\"N 104°05'48\"E",
    wilayah: 'Nongsa & Sambau',
    luasHa: 32.50,
    tahunPenerbitan: 2026,
  },
  {
    namaPerusahaan: 'PT Sekupang Shipyard Nusantara',
    nomorIzin: 'PKKPRL/2026/028/DPKPR',
    koordinat: "1°07'22\"N 103°55'10\"E",
    wilayah: 'Batam Barat & Sekupang',
    luasHa: 19.40,
    tahunPenerbitan: 2026,
  },
  {
    namaPerusahaan: 'PT Galang Bahari Nusantara',
    nomorIzin: 'PKKPRL/2026/035/DPKPR',
    koordinat: "0°48'15\"N 104°14'22\"E",
    wilayah: 'Galang & Sekitarnya',
    luasHa: 9.90,
    tahunPenerbitan: 2026,
  },
];

// Dataset #1: PERSENTASE PENYELESAIAN PERMASALAHAN PESISIR DAN REKLAMASI
const PERMASALAHAN_PESISIR_TABLE = [
  {
    id: 1,
    namaPerusahaan: 'PT Marina Nusantara Indah',
    dokumenPerizinan: 'PKKPRL/2024/014',
    dokumenPendukung: 'BA Patroli & SK Penghentian',
    wilayah: 'Batu Ampar & Bengkong',
    luasYangDiterbitkan: 4.8,
    triwulan: 'TW I',
    tahun: 2026,
    status: 'Selesai',
  },
  {
    id: 2,
    namaPerusahaan: 'CV Bahari Indah Sentosa',
    dokumenPerizinan: 'SIPR-021/BTM/2024',
    dokumenPendukung: 'Verifikasi Spasial GIS',
    wilayah: 'Nongsa & Kabil',
    luasYangDiterbitkan: 1.2,
    triwulan: 'TW I',
    tahun: 2026,
    status: 'Selesai',
  },
  {
    id: 3,
    namaPerusahaan: 'PT Batam Maritim Lestari',
    dokumenPerizinan: 'PKKPRL/2025/042',
    dokumenPendukung: 'Nota Dinas Pengawasan',
    wilayah: 'Tanjung Uncang',
    luasYangDiterbitkan: 3.5,
    triwulan: 'TW II',
    tahun: 2026,
    status: 'Proses',
  },
  {
    id: 4,
    namaPerusahaan: 'PT Samudera Pasifik Rekatama',
    dokumenPerizinan: 'PKKPRL/2025/091',
    dokumenPendukung: 'Surat Peringatan & Denda',
    wilayah: 'Sekupang',
    luasYangDiterbitkan: 2.1,
    triwulan: 'TW II',
    tahun: 2026,
    status: 'Selesai',
  },
];

// Dataset #3: PERSENTASE PERIZINAN SELESAI TEPAT WAKTU (JUMLAH PERMOHONAN, TOTAL LUASAN, TAHUN)
const PERIZINAN_TEPAT_WAKTU_TREND = [
  { tahun: '2023', jumlahPermohonan: 124, totalLuasanHa: 1420.5, persenTepatWaktu: 88.5 },
  { tahun: '2024', jumlahPermohonan: 138, totalLuasanHa: 1580.2, persenTepatWaktu: 90.2 },
  { tahun: '2025', jumlahPermohonan: 148, totalLuasanHa: 1720.0, persenTepatWaktu: 91.8 },
  { tahun: '2026', jumlahPermohonan: 158, totalLuasanHa: 1820.5, persenTepatWaktu: 92.4 },
];

// =====================================================================
// DATASET DIT. PENGENDALIAN SESUAI BUKU SATU DATA (HAL. 11)
// =====================================================================

// Dataset #1, #2, #3, #4: CAPAIAN TRIWULANAN 4 INDIKATOR KINERJA PENGENDALIAN
const PENGENDALIAN_TRIWULAN_DATA = [
  {
    triwulan: 'TW I',
    pengawasanKewajiban: 91.2,
    tindakanPembatalan: 84.0,
    dokumentasiLahan: 92.0,
    rekomendasiPembaruan: 88.5,
  },
  {
    triwulan: 'TW II',
    pengawasanKewajiban: 92.5,
    tindakanPembatalan: 86.2,
    dokumentasiLahan: 93.4,
    rekomendasiPembaruan: 90.1,
  },
  {
    triwulan: 'TW III',
    pengawasanKewajiban: 93.8,
    tindakanPembatalan: 87.6,
    dokumentasiLahan: 94.2,
    rekomendasiPembaruan: 91.5,
  },
  {
    triwulan: 'TW IV (Est)',
    pengawasanKewajiban: 94.5,
    tindakanPembatalan: 89.0,
    dokumentasiLahan: 95.0,
    rekomendasiPembaruan: 92.8,
  },
];

// Dataset #2: Detail Pipeline Tindakan Evaluasi & Pembatalan Alokasi
const PIPELINE_PENERTIBAN_DATA = [
  { tahap: 'Surat Peringatan I (SP-1)', kasus: 74, luasHa: 312.4, status: 'Masa Pemenuhan Komitmen 30 Hari' },
  { tahap: 'Surat Peringatan II (SP-2)', kasus: 48, luasHa: 186.2, status: 'Verifikasi Fisik Lapangan Tim Wasdal' },
  { tahap: 'Surat Peringatan III (SP-3)', kasus: 26, luasHa: 93.5, status: 'Panggilan Sidang Evaluasi Lahan' },
  { tahap: 'Pencabutan & Rekuperasi Resmi', kasus: 14, luasHa: 50.6, status: 'Lahan Resmi Kembali ke Kas BP Batam' },
];

export const PengelolaanLahanPesisirDeepDiveCenter: React.FC<
  PengelolaanLahanPesisirDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal: _onOpenFormulaModal,
}) => {
  const activeUnit =
    selectedUnitId === 'dit-pesisir-reklamasi' || selectedUnitId === 'pesisir'
      ? 'dit-pesisir-reklamasi'
      : selectedUnitId === 'dit-pengendalian-lahan' || selectedUnitId === 'pengendalian'
      ? 'dit-pengendalian-lahan'
      : 'dit-pertanahan';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans">
      {/* 1. Header with Tab Switcher for 3 Units (Identical to Deputi A2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Pengelolaan Pertanahan, Pesisir &amp; Pengendalian
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 3 unit kerja pengampu Perkin DEP-A3 berdasarkan atribut Buku Satu Data BP Batam
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            onClick={() => onSelectUnit('dit-pertanahan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-pertanahan'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Direktorat Pengelolaan Pertanahan (sebelumnya Direktorat Pengelolaan Lahan)"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Dit. Pengelolaan Pertanahan (15 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pesisir-reklamasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-pesisir-reklamasi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>Dit. Pesisir &amp; Reklamasi (4 DS)</span>
          </button>

          <button
            onClick={() => onSelectUnit('dit-pengendalian-lahan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-pengendalian-lahan'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dit. Pengendalian (4 DS)</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TAB KONTEN 1: DIT. PENGELOLAAN PERTANAHAN (SEBELUMNYA DIT. LAHAN) */}
      {/* 6 Kartu Visualisasi Terpadu (Grid 2 Kolom x 3 Baris)                */}
      {/* ==================================================================== */}
      {activeUnit === 'dit-pertanahan' && (
        <DirektoratPertanahanDeepDive />
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN 2: DIT. PESISIR & REKLAMASI                             */}
      {/* Target: Luas Izin Investasi (#4), Permasalahan (#1), Tepat Waktu (#3) */}
      {/* ==================================================================== */}
      {activeUnit === 'dit-pesisir-reklamasi' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: LUAS IZIN INVESTASI PESISIR & REKLAMASI PER WILAYAH (DATASET #4) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-cyan-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Luas Izin Kawasan Pesisir &amp; Reklamasi Investasi (Dataset #4 Hal. 14)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Nama Perusahaan, Nomor Izin PKKPRL, Koordinat, Wilayah, Luas (Ha), Tahun
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-cyan-800 leading-none">162.80 Ha</span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Target 150 Ha (+8,5%)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-cyan-600" /> Luas Izin Terbit (Hektar)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>5 Proyek Investasi Pesisir Terbesar</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={IZIN_PESISIR_INVESTASI_DATA}
                      margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis
                        type="category"
                        dataKey="namaPerusahaan"
                        tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                        width={140}
                      />
                      <Tooltip
                        formatter={(val: any) => [`${val} Ha`, 'Luas Izin PKKPRL']}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="luasHa" name="luasHa" fill="#0891B2" radius={[0, 4, 4, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Total Izin Terbit Resmi: <strong>48 Dokumen PKKPRL</strong>
                </span>
                <span className="font-bold text-cyan-800 font-mono">100% Selaras Zonasi Laut</span>
              </div>
            </div>

            {/* CARD 2: KINERJA PERIZINAN TEPAT WAKTU (DATASET #3 HAL. 14) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Perizinan Selesai Tepat Waktu (Dataset #3 Hal. 14)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Jumlah Permohonan, Total Luasan (Ha), Tahun, dan % Tepat Waktu
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-mono">
                    92,4% Tepat Waktu
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" /> Permohonan
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-teal-600" /> % Tepat Waktu
                  </span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={PERIZINAN_TEPAT_WAKTU_TREND} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="right" orientation="right" domain={[80, 100]} tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                      <Bar yAxisId="left" dataKey="jumlahPermohonan" name="Permohonan Masuk" fill="#CBD5E1" radius={[4, 4, 0, 0]} barSize={16} />
                      <Line yAxisId="right" type="monotone" dataKey="persenTepatWaktu" name="% Tepat Waktu" stroke="#0D9488" strokeWidth={2.5} dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Total Luasan 2026: <strong>1.820,5 Ha</strong>
                </span>
                <span className="font-bold text-teal-800 font-mono">146 dari 158 Tepat Waktu</span>
              </div>
            </div>
          </div>

          {/* ROW 2: DETAIL TABEL PERMASALAHAN PESISIR & REKLAMASI (DATASET #1 HAL. 13-14) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* TABEL ATRIBUT LENGKAP PERMASALAHAN PESISIR */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Penyelesaian Permasalahan Pesisir &amp; Reklamasi (Dataset #1 Hal. 13-14)
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  88,6% Kasus Selesai
                </span>
              </div>

              <div className="overflow-x-auto max-h-48">
                <table className="w-full text-[10.5px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-1 px-1.5">NAMA PERUSAHAAN</th>
                      <th className="py-1 px-1.5">DOKUMEN PERIZINAN</th>
                      <th className="py-1 px-1.5">DOKUMEN PENDUKUNG</th>
                      <th className="py-1 px-1.5">WILAYAH</th>
                      <th className="py-1 px-1.5 text-right">LUAS (HA)</th>
                      <th className="py-1 px-1.5">TRIWULAN</th>
                      <th className="py-1 px-1.5">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {PERMASALAHAN_PESISIR_TABLE.map((row) => (
                      <tr key={row.id} className="hover:bg-cyan-50/50">
                        <td className="py-1.5 px-1.5 font-semibold text-slate-900">{row.namaPerusahaan}</td>
                        <td className="py-1.5 px-1.5 text-slate-600 font-mono text-[9.5px]">{row.dokumenPerizinan}</td>
                        <td className="py-1.5 px-1.5 text-[9.5px] text-slate-500">{row.dokumenPendukung}</td>
                        <td className="py-1.5 px-1.5">{row.wilayah}</td>
                        <td className="py-1.5 px-1.5 text-right font-mono font-bold text-cyan-700">{row.luasYangDiterbitkan.toFixed(1)} Ha</td>
                        <td className="py-1.5 px-1.5 font-mono">{row.triwulan}</td>
                        <td className="py-1.5 px-1.5">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            row.status === 'Selesai'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL ATRIBUT DETAIL PROYEK IZIN INVESTASI (DATASET #4) */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-600" />
                    Koordinat Proyek Pesisir &amp; Reklamasi
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded border border-cyan-200">
                    Satu Data Spasial
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  {IZIN_PESISIR_INVESTASI_DATA.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span className="truncate">{item.namaPerusahaan}</span>
                        <span className="font-mono text-cyan-800 shrink-0">{item.luasHa} Ha</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Titik: {item.koordinat} &bull; {item.wilayah}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[10px] text-slate-500">
                <span>Rencana Pemanfaatan: 2.150 Ha</span>
                <span className="font-bold text-cyan-700">26 Titik Strategis</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. TAB KONTEN 3: DIT. PENGENDALIAN PENGELOLAAN LAHAN, PESISIR & REKLAMASI */}
      {/* Target: 4 Indikator Triwulan (Hal. 11), Evaluasi/Pembatalan, Wasdal   */}
      {/* ==================================================================== */}
      {activeUnit === 'dit-pengendalian-lahan' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: CAPAIAN TRIWULANAN 4 INDIKATOR KINERJA PENGENDALIAN (HAL. 11) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Capaian Triwulanan 4 Indikator Pengendalian (Buku Satu Data Hal. 11)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Triwulan, Tahun, Persentase Capaian (%) untuk 4 Dataset Pengendalian
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-emerald-800 leading-none">93,80%</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">Kepatuhan Tertinggi</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> Pengawasan Kewajiban (DS #1)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Evaluasi &amp; Pembatalan (DS #2)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" /> Dokumentasi Lahan (DS #3)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-indigo-600" /> Rekomendasi Alokasi (DS #4)
                  </span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={PENGENDALIAN_TRIWULAN_DATA} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[80, 100]} tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [`${val}%`, name]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="pengawasanKewajiban" name="Pengawasan Kewajiban" stroke="#059669" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="tindakanPembatalan" name="Evaluasi & Pembatalan" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="dokumentasiLahan" name="Dokumentasi Lahan" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="rekomendasiPembaruan" name="Rekomendasi Pembaruan" stroke="#6366F1" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Target Triwulanan: <strong>80% s.d 90%</strong>
                </span>
                <span className="font-bold text-emerald-800 font-mono">Seluruh Target Triwulan Terlampaui</span>
              </div>
            </div>

            {/* CARD 2: REKAPITULASI PENERTIBAN LAHAN MANGKRAK & REKUPERASI ASET (DATASET #2) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-teal-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Pipeline Penertiban Lahan Terlantar (SP-1 s.d Cabut)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Eskalasi penertiban alokasi lahan mangkrak &bull; 94,6 Ha Diselamatkan
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                    87,6% Selesai
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Jumlah Kasus
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> Luas Lahan (Ha)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>4 Tahap Eskalasi</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={PIPELINE_PENERTIBAN_DATA}
                      margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis
                        type="category"
                        dataKey="tahap"
                        tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                        width={130}
                      />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          name === 'kasus' ? `${val} Kasus` : `${val} Ha`,
                          name === 'kasus' ? 'Jumlah Kasus' : 'Luas Lahan',
                        ]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="kasus" name="kasus" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={10} />
                      <Bar dataKey="luasHa" name="luasHa" fill="#059669" radius={[0, 4, 4, 0]} barSize={10} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Total Lahan Terpapar: <strong>642,7 Ha</strong>
                </span>
                <span className="font-bold text-emerald-800 font-mono">221,8 Ha Re-Komitmen Bangun</span>
              </div>
            </div>
          </div>

          {/* ROW 2: DETAIL TABEL TINDAKAN PENERTIBAN & MEDIASI SENGKETA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* TABEL ATRIBUT PIPELINE PENERTIBAN (DATASET #2 HAL. 11) */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" />
                  Rincian Tindakan Evaluasi &amp; Pembatalan (Dataset No. 2 Hal. 11)
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  162 Kasus Terlaksana
                </span>
              </div>

              <div className="overflow-x-auto max-h-48">
                <table className="w-full text-[11px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-1 px-2">TAHAPAN PENERTIBAN</th>
                      <th className="py-1 px-2 text-right">KASUS</th>
                      <th className="py-1 px-2 text-right">LUAS (HA)</th>
                      <th className="py-1 px-2">STATUS PENANGANAN REGULASI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {PIPELINE_PENERTIBAN_DATA.map((item, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/50">
                        <td className="py-1.5 px-2 font-semibold text-slate-900">{item.tahap}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700">{item.kasus} Kasus</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">{item.luasHa.toFixed(1)} Ha</td>
                        <td className="py-1.5 px-2 text-[10.5px] text-slate-600">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RINGKASAN REKUPERASI ASET DAN MEDIASI SENGKETA */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Rekuperasi Aset Lahan BP Batam
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    Rp 3,48 T Aset
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Lahan Mangkrak Dicabut:</span>
                    <span className="font-black font-mono text-emerald-800 text-xs">94,6 Ha Kembali ke BP</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Investor Re-Komitmen:</span>
                    <span className="font-black font-mono text-teal-800 text-xs">221,8 Ha Lanjut Bangun</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Penyelesaian Sengketa:</span>
                    <span className="font-black font-mono text-blue-800 text-xs">182 / 192 Tuntas (94,8%)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[10px] text-slate-500">
                <span>Efektivitas Pengawasan: 89,4%</span>
                <span className="font-bold text-emerald-700">422 Lokasi Terawasi</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
