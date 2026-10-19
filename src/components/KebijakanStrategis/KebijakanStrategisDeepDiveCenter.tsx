import React, { useState } from 'react';
import {
  Compass,
  ShieldCheck,
  Layers,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Server,
  Network,
  Activity,
  FileText,
  DollarSign,
  MapPin,
  AlertTriangle,
  Flame,
  ThumbsUp,
  Users,
  MessageSquareQuote,
  Check,
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
} from 'recharts';
import {
  REKOMENDASI_PERUNTUKAN_LAHAN_DATA,
  MASTERPLAN_JALAN_DATA,
  RAK_DATA_CENTER_RUANGAN_DATA,
  KEPUASAN_PELANGGAN_DC_DATA,
  SERANGAN_KEAMANAN_IT_DATA,
  SLA_PENYELESAIAN_PERIZINAN_DATA,
  PENGADUAN_MASYARAKAT_PTSP_DATA,
  PTSP_SEKTOR_PERFORMANCES,
} from './kebijakanStrategisData';
import { DATA_JALUR_FIBER_OPTIC } from '../../data/pdsiData';
import { PUSREN_MASTERPLANS } from '../../data/pusrenData';

interface KebijakanStrategisDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
}

export const KebijakanStrategisDeepDiveCenter: React.FC<
  KebijakanStrategisDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
}) => {
  // Unit tab: only 3 units (Pusren, PDSI, PTSP) - Pusat Harmonisasi is removed
  const activeUnit =
    selectedUnitId === 'pdsi'
      ? 'pdsi'
      : selectedUnitId === 'ptsp'
      ? 'ptsp'
      : 'pusren';

  // Status Pie Data for PTSP
  const STATUS_PIE_DATA = [
    { name: 'Izin Terbit Resmi', value: 1486, color: '#10B981' },
    { name: 'Dalam Proses Verifikasi', value: 219, color: '#0284C7' },
    { name: 'Menunggu Revisi Pemohon', value: 104, color: '#F59E0B' },
    { name: 'Berkas Ditolak', value: 33, color: '#EF4444' },
  ];

  // Fiber Optic top routes
  const foChartData = [...DATA_JALUR_FIBER_OPTIC]
    .sort((a, b) => (b.panjangKm || 0) - (a.panjangKm || 0))
    .slice(0, 5)
    .map((item) => ({
      name: item.bagianWilayah.length > 16 ? item.bagianWilayah.slice(0, 14) + '...' : item.bagianWilayah,
      fullName: item.bagianWilayah,
      panjangKm: item.panjangKm || 0,
      kapasitasCore: item.kapasitasCore || 0,
    }));

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans">
      {/* 1. Header with Tab Switcher for 3 Units (Pusren, PDSI, PTSP) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Kebijakan Strategis &amp; Perizinan
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 3 unit kerja pengampu Perkin DEP-A2 (Pusat Perencanaan Program, PDSI, PTSP)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            onClick={() => onSelectUnit('pusat-perencanaan-program')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'pusren'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pusren</span>
          </button>

          <button
            onClick={() => onSelectUnit('pdsi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'pdsi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PDSI</span>
          </button>

          <button
            onClick={() => onSelectUnit('ptsp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'ptsp'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>PTSP</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TAB KONTEN 1: PUSREN (REKAP PERUNTUKAN LAHAN & MASTERPLAN JALAN)   */}
      {/* ==================================================================== */}
      {activeUnit === 'pusren' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU VISUAL UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: REKAPITULASI REKOMENDASI PERUBAHAN PERUNTUKAN LAHAN SETIAP TAHUN */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-sky-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Rekapitulasi Rekomendasi Perubahan Peruntukan Lahan
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Tren tahunan jumlah pemohon dan rekomendasi selesai (Dataset No. 8 Hal. 52)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-slate-900 leading-none">1.303</span>
                    <span className="text-[10px] text-sky-700 font-medium block">Total Pemohon</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-sky-600" /> Jumlah Pemohon
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> Rekomendasi Selesai
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-emerald-700 font-bold">Rerata Selesai: 95,8%</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={REKOMENDASI_PERUNTUKAN_LAHAN_DATA} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any) => [
                          `${val} Berkas`,
                          name === 'jumlahPermohonan' ? 'Jumlah Pemohon' : 'Rekomendasi Selesai',
                        ]}
                        labelFormatter={(label) => `Tahun ${label}`}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="jumlahPermohonan" name="jumlahPermohonan" fill="#0284C7" radius={[4, 4, 0, 0]} barSize={16} />
                      <Bar dataKey="selesai" name="selesai" fill="#10B981" radius={[4, 4, 0, 0]} barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Tahun 2026 berjalan: <strong>184 Pemohon</strong> &bull; <strong>175 Selesai (95,1%)</strong>
                </span>
                <span className="font-bold text-emerald-700 font-mono">1.248 Rekomendasi Terbit</span>
              </div>
            </div>

            {/* CARD 2: MASTERPLAN JALAN (KLASIFIKASI, WILAYAH, SUB WILAYAH, PANJANG, LEBAR) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Master Plan Jaringan Jalan Strategis KPBPB Batam
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Klasifikasi Jalan, Wilayah, Sub Wilayah (SWP), Panjang &amp; Lebar (Dataset No. 12 Hal. 52)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded font-mono">
                    94,9 Km Koridor
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Panjang Koridor (Km)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500" /> Lebar ROW (Meter)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>7 Koridor Prioritas Masterplan</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={MASTERPLAN_JALAN_DATA.map((item) => ({
                        koridor: item.wilayah.length > 14 ? item.wilayah.slice(0, 13) + '..' : item.wilayah,
                        fullKoridor: item.wilayah,
                        klasifikasi: item.klasifikasiJalan,
                        subWilayah: item.subWilayah,
                        panjangKm: item.panjangKm,
                        lebarMeter: item.lebarMeter,
                        status: item.statusKonstruksi,
                      }))}
                      margin={{ top: 8, right: 10, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="koridor" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          name === 'panjangKm' ? `${val} Km` : `${val} Meter ROW`,
                          name === 'panjangKm' ? 'Panjang Jalan' : 'Lebar Ruang Jalan',
                        ]}
                        labelFormatter={(_label, payload) => {
                          if (payload && payload[0]) {
                            const p = payload[0].payload;
                            return `${p.fullKoridor} (${p.klasifikasi}) • ${p.subWilayah}`;
                          }
                          return '';
                        }}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="panjangKm" name="panjangKm" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={16} />
                      <Bar dataKey="lebarMeter" name="lebarMeter" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Klasifikasi Utama: <strong>Arteri Primer (49,5 Km / 52,2%)</strong>
                </span>
                <span className="font-bold text-blue-800 font-mono">Lebar ROW Maks: 40 Meter</span>
              </div>
            </div>
          </div>

          {/* ROW 2: DETAIL TABEL MASTERPLAN JALAN & REKAP PERUNTUKAN LAHAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* TABEL ATRIBUT MASTERPLAN JALAN */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Rincian Atribut Master Plan Jalan BP Batam (Dataset No. 12 Hal. 52)
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                  TA 2025-2029
                </span>
              </div>

              <div className="overflow-x-auto max-h-48">
                <table className="w-full text-[11px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-1 px-2">Klasifikasi Jalan</th>
                      <th className="py-1 px-2">Wilayah</th>
                      <th className="py-1 px-2">Sub Wilayah (SWP)</th>
                      <th className="py-1 px-2 text-right">Panjang</th>
                      <th className="py-1 px-2 text-right">Lebar</th>
                      <th className="py-1 px-2">Status Masterplan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {MASTERPLAN_JALAN_DATA.map((jln) => (
                      <tr key={jln.id} className="hover:bg-blue-50/50">
                        <td className="py-1.5 px-2 font-semibold text-slate-900">{jln.klasifikasiJalan}</td>
                        <td className="py-1.5 px-2">{jln.wilayah}</td>
                        <td className="py-1.5 px-2 text-[10px] text-slate-500">{jln.subWilayah}</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700">{jln.panjangKm} Km</td>
                        <td className="py-1.5 px-2 text-right font-mono font-bold text-indigo-700">{jln.lebarMeter} m</td>
                        <td className="py-1.5 px-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {jln.statusKonstruksi}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RINGKASAN REKOMENDASI PERUBAHAN PERUNTUKAN LAHAN */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Status Pemohon Perubahan Peruntukan
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    6 Tahun Rekap
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-lg bg-sky-50/70 border border-sky-100 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Total Akumulasi Pemohon:</span>
                    <span className="font-black font-mono text-sky-800 text-sm">1.303 Pemohon</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Rekomendasi Selesai Terbit:</span>
                    <span className="font-black font-mono text-emerald-800 text-sm">1.248 Berkas (95,8%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">Dalam Verifikasi Spasial GIS:</span>
                    <span className="font-black font-mono text-amber-800 text-sm">55 Berkas (4,2%)</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 mt-2">
                Seluruh rekomendasi perubahan peruntukan divalidasi silang terhadap Perda RTRW Kota Batam dan RDTR Bappenas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN 2: PDSI (OKUPANSI RAK RUANGAN, KEPUASAN DC, SERANGAN)  */}
      {/* ==================================================================== */}
      {activeUnit === 'pdsi' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA (OKUPANSI RAK RUANGAN & KEPUASAN PELANGGAN DC) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: OKUPANSI RAK DATA CENTER (RUANGAN, RAK TERISI, RAK KOSONG) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-blue-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Okupansi Rak Data Center per Ruangan
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Ruangan, Jenis Rak, Total Rak, Rak Terisi, Rak Kosong (Dataset No. 8 Hal. 41)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-blue-800 leading-none">81,3%</span>
                    <span className="text-[10px] text-blue-600 font-medium block">78/96 Rak Terisi</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Rak Terisi (78 Rak)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-300" /> Rak Kosong (18 Rak)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Standar 42U Server Blade &amp; Storage</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={RAK_DATA_CENTER_RUANGAN_DATA.map((r) => ({
                        namaRuang: r.ruangan.replace(' (BIDA Lt. 3)', '').replace(' (DRC Sekupang)', ' DRC'),
                        fullRuang: r.ruangan,
                        jenisRak: r.jenisRak,
                        totalRak: r.totalRak,
                        jumlahRakTerisi: r.jumlahRakTerisi,
                        jumlahRakKosong: r.jumlahRakKosong,
                        persentaseTerisi: r.persentaseTerisi,
                      }))}
                      margin={{ top: 8, right: 10, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="namaRuang" tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          `${val} Rak (${name === 'jumlahRakTerisi' ? 'Terisi' : 'Kosong'})`,
                          item.payload.fullRuang,
                        ]}
                        labelFormatter={(_label, payload) => {
                          if (payload && payload[0]) {
                            const p = payload[0].payload;
                            return `${p.fullRuang} • Total ${p.totalRak} Rak (${p.persentaseTerisi}%)`;
                          }
                          return '';
                        }}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="jumlahRakTerisi" name="jumlahRakTerisi" stackId="rak" fill="#2563EB" radius={[0, 0, 0, 0]} barSize={26} />
                      <Bar dataKey="jumlahRakKosong" name="jumlahRakKosong" stackId="rak" fill="#CBD5E1" radius={[4, 4, 0, 0]} barSize={26} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Fasilitas: <strong>Tier-3 Data Center BIDA &amp; DRC Sekupang</strong>
                </span>
                <span className="font-bold text-emerald-700 font-mono">Uptime SLA 99,98%</span>
              </div>
            </div>

            {/* CARD 2: DATA KEPUASAN PELANGGAN DATA CENTER (KATEGORI & PERSENTASE) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-emerald-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Survei Kepuasan Pelanggan Data Center
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Kategori &amp; Persentase (%) Kepuasan Pengguna Colocation (Dataset No. 11 Hal. 42)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-emerald-800 leading-none">93,9%</span>
                    <span className="text-[10px] text-emerald-600 font-medium block">Sangat Puas</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> Persentase Kepuasan (%)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>52 Responden Instansi K/L, BUMN &amp; Swasta</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={KEPUASAN_PELANGGAN_DC_DATA.map((item) => ({
                        kategoriPendek: item.kategori.length > 20 ? item.kategori.slice(0, 18) + '..' : item.kategori,
                        fullKategori: item.kategori,
                        tingkatKepuasan: item.tingkatKepuasan,
                        persentase: item.persentase,
                        skor: item.skor,
                      }))}
                      layout="vertical"
                      margin={{ top: 5, right: 25, left: 20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" domain={[80, 100]} tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="kategoriPendek" tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} width={120} />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [
                          `${val}% (${item.payload.tingkatKepuasan} • Skor ${item.payload.skor}/5)`,
                          item.payload.fullKategori,
                        ]}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="persentase" fill="#059669" radius={[0, 4, 4, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Kepuasan Tertinggi: <strong>Keandalan Daya Listrik &amp; UPS (96,5%)</strong>
                </span>
                <span className="font-bold text-emerald-800 font-mono">Skor Rerata: 4,70 / 5,00</span>
              </div>
            </div>
          </div>

          {/* ROW 2: DATA SERANGAN KEAMANAN IT & RINCIAN HELPDESK/FIBER OPTIK */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 3: DATA SERANGAN KEAMANAN IT (PERIODE, THREAT ACTIVITY, JUMLAH SERANGAN) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-600" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Data Serangan Keamanan IT &amp; Threat Activity (SOC CSIRT)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Periode, Threat Activity, Status Keamanan, Jumlah Serangan (Dataset No. 12 Hal. 42)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-rose-700 leading-none">15.710</span>
                    <span className="text-[10px] text-rose-600 font-medium block">Serangan YTD</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-rose-600" /> Jumlah Serangan Dihalau
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-emerald-700 font-bold">Status: 100% Termitigasi oleh SOC CSIRT</span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={SERANGAN_KEAMANAN_IT_DATA.map((item) => ({
                        threatPendek: item.threatActivity.length > 20 ? item.threatActivity.slice(0, 18) + '..' : item.threatActivity,
                        fullThreat: item.threatActivity,
                        periode: item.periode,
                        statusKeamanan: item.statusKeamanan,
                        jmlSerangan: item.jmlSerangan,
                      }))}
                      margin={{ top: 8, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="threatPendek" tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [
                          `${Number(val).toLocaleString('id-ID')} Kali Serangan (${item.payload.statusKeamanan})`,
                          item.payload.fullThreat,
                        ]}
                        labelFormatter={(_label, payload) => {
                          if (payload && payload[0]) {
                            const p = payload[0].payload;
                            return `${p.periode} • ${p.fullThreat}`;
                          }
                          return '';
                        }}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="jmlSerangan" name="jmlSerangan" fill="#E11D48" radius={[4, 4, 0, 0]} barSize={22} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Ancaman Terbanyak: <strong>DDoS Volumetric (6.420 Serangan &bull; WAF Blocked)</strong>
                </span>
                <span className="font-bold text-emerald-700 font-mono">Zero Security Breach</span>
              </div>
            </div>

            {/* CARD 4: JALUR FIBER OPTIK & RING BACKBONE */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-indigo-600" />
                    Koridor Utama Jaringan Fiber Optik (FO)
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                    210 Km FO Ring
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  {foChartData.map((fo, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-slate-800 block text-[11px]">{fo.fullName}</span>
                          <span className="text-[10px] text-slate-500">{fo.kapasitasCore} Core Single Mode</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-indigo-700 text-xs">{fo.panjangKm} Km</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 mt-2">
                <span className="text-slate-500">Kapasitas Core Utama:</span>
                <span className="font-bold text-emerald-700 font-mono">96 Core Ring Pulau Batam</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. TAB KONTEN 3: PTSP (SLA PERIZINAN TEPAT WAKTU & PENGADUAN LAYANAN) */}
      {/* ==================================================================== */}
      {activeUnit === 'ptsp' && (
        <div className="space-y-3.5">
          {/* ROW 1: DUA KARTU UTAMA (SLA PERIZINAN TEPAT WAKTU & MONITORING PENGADUAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* CARD 1: DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (SLA) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Data Penyelesaian Perizinan yang Tepat Waktu (SLA)
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Nama Perizinan, Status Masuk, Proses, Selesai, SLA % (Dataset No. 17 Hal. 28)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-emerald-800 leading-none">94,8%</span>
                    <span className="text-[10px] text-emerald-600 font-medium block">Target: 90,0%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> Capaian SLA (%)
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-slate-400" /> Target Regulasi (90%)
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>14.850 Permohonan YTD</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={SLA_PENYELESAIAN_PERIZINAN_DATA.map((item) => ({
                        namaPendek: item.namaPerizinanBerusaha.length > 18 ? item.namaPerizinanBerusaha.slice(0, 16) + '..' : item.namaPerizinanBerusaha,
                        fullName: item.namaPerizinanBerusaha,
                        jenis: item.jenisPerizinan,
                        masuk: item.permohonanStatusMasuk,
                        proses: item.permohonanStatusProses,
                        selesai: item.permohonanStatusSelesai,
                        slaPercent: item.slaPercent,
                        targetSla: item.targetSla,
                        rataRataHari: item.rataRataHari,
                      }))}
                      margin={{ top: 8, right: 10, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="namaPendek" tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[80, 100]} tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          name === 'slaPercent' ? `${val}% (Target ${item.payload.targetSla}%)` : `${val} Berkas`,
                          name === 'slaPercent' ? 'Capaian SLA Tepat Waktu' : 'Target SLA',
                        ]}
                        labelFormatter={(_label, payload) => {
                          if (payload && payload[0]) {
                            const p = payload[0].payload;
                            return `${p.fullName} • Masuk: ${p.masuk} | Selesai: ${p.selesai} (${p.rataRataHari} Hari)`;
                          }
                          return '';
                        }}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="slaPercent" name="slaPercent" fill="#059669" radius={[4, 4, 0, 0]} barSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Lead Time Rerata: <strong>2,1 Hari Kerja (Standar PP 41: 5 Hari)</strong>
                </span>
                <span className="font-bold text-emerald-800 font-mono">14.080 Izin Terbit Tepat Waktu</span>
              </div>
            </div>

            {/* CARD 2: DATA MONITORING & EVALUASI PENGADUAN MASYARAKAT TERHADAP LAYANAN PTSP */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4 text-blue-700" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        Data Monitoring &amp; Evaluasi Pengelolaan Pengaduan Masyarakat
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Atribut: Jenis Pengaduan, Jumlah Pengaduan &amp; Jumlah Penyelesaian (Dataset No. 6 Hal. 24)
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-blue-800 leading-none">98,4%</span>
                    <span className="text-[10px] text-blue-600 font-medium block">185 / 188 Selesai</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" /> Jumlah Pengaduan Masuk
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" /> Jumlah Penyelesaian
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span>Saluran: SP4N LAPOR, WhatsApp, Loket MPP</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={PENGADUAN_MASYARAKAT_PTSP_DATA.map((item) => ({
                        jenisPendek: item.jenisPengaduan.length > 18 ? item.jenisPengaduan.slice(0, 16) + '..' : item.jenisPengaduan,
                        fullJenis: item.jenisPengaduan,
                        saluran: item.saluranPengaduan,
                        jumlahPengaduan: item.jumlahPengaduan,
                        penyelesaianPengaduan: item.penyelesaianPengaduan,
                        statusSelesai: item.statusSelesai,
                        persen: item.persentaseSelesai,
                      }))}
                      margin={{ top: 8, right: 10, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="jenisPendek" tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          `${val} Aduan`,
                          name === 'jumlahPengaduan' ? 'Jumlah Aduan Masuk' : 'Jumlah Selesai Ditangani',
                        ]}
                        labelFormatter={(_label, payload) => {
                          if (payload && payload[0]) {
                            const p = payload[0].payload;
                            return `${p.fullJenis} (${p.saluran}) • ${p.statusSelesai}`;
                          }
                          return '';
                        }}
                        contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                      />
                      <Bar dataKey="jumlahPengaduan" name="jumlahPengaduan" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={16} />
                      <Bar dataKey="penyelesaianPengaduan" name="penyelesaianPengaduan" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-slate-500">
                  Respon Awal Rata-rata: <strong>1,2 Hari Kerja</strong>
                </span>
                <span className="font-bold text-emerald-700 font-mono">100% Saluran Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* ROW 2: KOMPOSISI BERKAS PERIZINAN & RINCIAN SEKTOR UNGGULAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* SEKTOR PERIZINAN BERUSAHA */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  Kinerja Pelayanan Perizinan per Sektor Usaha (Dataset No. 9 Hal. 25)
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  OSS-RBA MPP
                </span>
              </div>

              <div className="space-y-2 mt-2">
                {PTSP_SEKTOR_PERFORMANCES.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px]">{s.sektor}</span>
                      <span className="text-[10px] text-slate-500">
                        {s.terbit} Terbit dari {s.volume} Masuk &bull; Lead Time: {s.avgLeadTimeHari} Hari
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-700 text-xs block">{s.slaPercent}% SLA</span>
                      <span className="text-[9.5px] font-bold text-slate-400">Target 85%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STATUS DONUT CHART */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    Proporsi Status Dokumen Izin
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                    1.842 Total Berkas
                  </span>
                </div>

                <div className="h-40 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={STATUS_PIE_DATA}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={58}
                        innerRadius={36}
                        paddingAngle={3}
                      >
                        {STATUS_PIE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any, name: any) => [`${val} Berkas`, name]} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-1 text-[10px]">
                  {STATUS_PIE_DATA.map((st, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                      <span className="text-slate-600 truncate">{st.name}:</span>
                      <span className="font-bold font-mono text-slate-800">{st.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 mt-2">
                <span className="text-slate-500">Tingkat Penolakan:</span>
                <span className="font-bold text-rose-600 font-mono">1,8% (33 Berkas)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
