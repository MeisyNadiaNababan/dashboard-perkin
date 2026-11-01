import React, { useState } from 'react';
import {
  Compass,
  ShieldCheck,
  Layers,
  Scale,
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
} from 'recharts';
import {
  RAK_DATA_CENTER_RUANGAN_DATA,
  KEPUASAN_PELANGGAN_DC_DATA,
  SERANGAN_KEAMANAN_IT_DATA,
} from './kebijakanStrategisData';
import { DATA_JALUR_FIBER_OPTIC } from '../../data/pdsiData';
import { PusatPerencanaanDeepDive } from './PusatPerencanaanDeepDive';
import { PusatHarmonisasiDeepDive } from './PusatHarmonisasiDeepDive';
import { PusatPtspDeepDive } from './PusatPtspDeepDive';

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
  // Unit tab: 4 units (Pusren, Harmonisasi, PDSI, PTSP)
  const activeUnit =
    selectedUnitId === 'pdsi'
      ? 'pdsi'
      : selectedUnitId === 'ptsp'
      ? 'ptsp'
      : selectedUnitId === 'pusat-harmonisasi' || selectedUnitId === 'harmonisasi'
      ? 'harmonisasi'
      : 'pusren';


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
      {/* 1. Header with Tab Switcher for 4 Units (Pusren, Harmonisasi, PDSI, PTSP) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Kebijakan Strategis &amp; Perizinan
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 4 unit kerja pengampu Perkin DEP-A2 (Pusat Perencanaan Program, Harmonisasi Kebijakan, PDSI, PTSP)
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
            onClick={() => onSelectUnit('pusat-harmonisasi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'harmonisasi'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Harmonisasi</span>
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
      {/* 2. TAB KONTEN 1: PUSREN (PUSAT PERENCANAAN PROGRAM STRATEGIS)        */}
      {/* ==================================================================== */}
      {activeUnit === 'pusren' && (
        <PusatPerencanaanDeepDive />
      )}

      {/* ==================================================================== */}
      {/* 3. TAB KONTEN 2: PUSAT HARMONISASI KEBIJAKAN STRATEGIS (PHKS)        */}
      {/* ==================================================================== */}
      {activeUnit === 'harmonisasi' && (
        <PusatHarmonisasiDeepDive />
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
      {/* 4. TAB KONTEN 4: PTSP (PUSAT PELAYANAN TERPADU SATU PINTU)            */}
      {/* ==================================================================== */}
      {activeUnit === 'ptsp' && (
        <PusatPtspDeepDive />
      )}
    </div>
  );
};
