import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  Building,
  Scale,
  Info,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import {
  BIRO_KEUANGAN_KPIS,
  TREN_TRIWULAN_KEUANGAN,
  SURPLUS_DEFISIT_PER_SATKER,
  AGING_PIUTANG_DATA,
  BIRO_SDM_KPIS,
  KOMPOSISI_STATUS_SDM,
  KOMPOSISI_PENDIDIKAN_SDM,
  KOMPOSISI_GENDER_SDM,
  PENGEMBANGAN_SDM_JALUR,
  BIRO_OKMR_KPIS,
  PENGADUAN_PER_UNIT,
  MANAJEMEN_RISIKO_PER_UNIT,
  BIRO_UMUM_KPIS,
  PENGADAAN_SISTEM_DATA,
  BIRO_HUKUM_KPIS,
  PERKARA_PER_BULAN_DATA,
  BiroKpiCard,
  STATUS_CONFIG
} from './administrasiKeuanganData';

export const MonitoringBiroTab: React.FC = () => {
  // Segmented control state
  const [activeSegment, setActiveSegment] = useState<'keuangan' | 'sdm' | 'okmr' | 'umum' | 'hukum'>('keuangan');

  // Chart A toggles
  const [keuanganToggle, setKeuanganToggle] = useState<'tren' | 'satker'>('tren');
  const [sdmToggle, setSdmToggle] = useState<'status' | 'pendidikan' | 'gender'>('status');

  // Tooltip helper
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="space-y-4 font-sans">
      {/* 1. SEGMENTED CONTROL BIRO */}
      <div className="flex items-center justify-between gap-3 bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'keuangan', label: 'Biro Keuangan', icon: Building2 },
            { id: 'sdm', label: 'Biro SDM', icon: Users },
            { id: 'okmr', label: 'Biro OKMR', icon: ShieldCheck },
            { id: 'umum', label: 'Biro Umum', icon: Building },
            { id: 'hukum', label: 'Biro Hukum', icon: Scale },
          ].map((seg) => {
            const Icon = seg.icon;
            const isActive = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0F2942] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{seg.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-400 font-medium hidden md:block pr-2">
          Pemantauan Kinerja &amp; Atribut Satu Data
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SEGMEN 1: BIRO KEUANGAN                                             */}
      {/* ==================================================================== */}
      {activeSegment === 'keuangan' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* BARIS 1: 4 KPI KECIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BIRO_KEUANGAN_KPIS.map((kpi, idx) => {
              const statusCfg = STATUS_CONFIG[kpi.status];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>{kpi.label}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTooltip(
                            activeTooltip === `keuangan-${idx}` ? null : `keuangan-${idx}`
                          )
                        }
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                        title={kpi.tooltipRumus}
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                      {kpi.nilai}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{kpi.targetKonteks}</span>
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${statusCfg.bgClass} ${statusCfg.colorClass}`}
                    >
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BARIS 2: 2 CHART (50/50 SPLIT) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart A: Toggle "Tren | Per Satker" */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    {keuanganToggle === 'tren'
                      ? 'Tren Realisasi Belanja & Pendapatan YTD'
                      : 'Net Surplus / Defisit Per Unit Usaha'}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {keuanganToggle === 'tren'
                      ? 'Realisasi kumulatif terhadap target per triwulan'
                      : 'Pendapatan dikurangi belanja operasional (Miliar Rp)'}
                  </span>
                </div>

                {/* Toggle Tren | Per Satker */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
                  <button
                    onClick={() => setKeuanganToggle('tren')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      keuanganToggle === 'tren'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tren
                  </button>
                  <button
                    onClick={() => setKeuanganToggle('satker')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      keuanganToggle === 'satker'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Per Satker
                  </button>
                </div>
              </div>

              {/* Chart A Display */}
              <div className="h-60 w-full">
                {keuanganToggle === 'tren' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TREN_TRIWULAN_KEUANGAN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 130]} unit="%" />
                      <Tooltip formatter={(value: any) => [`${value}%`, '']} />
                      <ReferenceLine y={100} stroke="#94A3B8" strokeDasharray="3 3" label={{ value: 'Target 100%', fill: '#64748B', fontSize: 10 }} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Line type="monotone" dataKey="pendapatan" name="% Capaian Pendapatan" stroke="#16A34A" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="belanja" name="% Capaian Belanja" stroke="#0F2942" strokeWidth={2.5} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SURPLUS_DEFISIT_PER_SATKER} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} unit=" M" />
                      <YAxis type="category" dataKey="satker" tick={{ fontSize: 10, fill: '#334155' }} width={80} />
                      <Tooltip formatter={(val: any) => [`Rp ${val} Miliar`, 'Net Hasil']} />
                      <ReferenceLine x={0} stroke="#475569" />
                      <Bar dataKey="surplus" radius={[2, 2, 2, 2]}>
                        {SURPLUS_DEFISIT_PER_SATKER.map((entry, idx) => (
                          <Cell key={idx} fill={entry.surplus >= 0 ? '#16A34A' : '#DC2626'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Chart B: Aging Piutang */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Aging Piutang BP Batam
                  </h4>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    Total Rp 261,9 M
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Rekapitulasi Kualitas Piutang &bull; Penyerahan berkas macet ke KPKNL
                </p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AGING_PIUTANG_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="umur" tick={{ fontSize: 9.5, fill: '#334155' }} interval={0} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} unit=" M" />
                    <Tooltip formatter={(value: any, name: any, props: any) => [`Rp ${value} M (${props.payload.persen})`, 'Piutang']} />
                    <Bar dataKey="nilai" fill="#0F2942" radius={[4, 4, 0, 0]}>
                      {AGING_PIUTANG_DATA.map((entry, idx) => (
                        <Cell
                          key={idx}
                          fill={idx === 3 ? '#DC2626' : idx === 2 ? '#D97706' : '#0F2942'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SEGMEN 2: BIRO SUMBER DAYA MANUSIA (SDM)                             */}
      {/* ==================================================================== */}
      {activeSegment === 'sdm' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* BARIS 1: 4 KPI KECIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BIRO_SDM_KPIS.map((kpi, idx) => {
              const statusCfg = STATUS_CONFIG[kpi.status];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>{kpi.label}</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" title={kpi.tooltipRumus} />
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                      {kpi.nilai}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{kpi.targetKonteks}</span>
                    <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${statusCfg.bgClass} ${statusCfg.colorClass}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BARIS 2: 2 CHART (50/50 SPLIT) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart A: Toggle Status | Pendidikan | Jenis Kelamin */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Komposisi Pegawai BP Batam
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Berdasarkan {sdmToggle === 'status' ? 'Status Kepegawaian' : sdmToggle === 'pendidikan' ? 'Tingkat Pendidikan' : 'Jenis Kelamin'}
                  </span>
                </div>

                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
                  <button
                    onClick={() => setSdmToggle('status')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      sdmToggle === 'status' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Status
                  </button>
                  <button
                    onClick={() => setSdmToggle('pendidikan')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      sdmToggle === 'pendidikan' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Pendidikan
                  </button>
                  <button
                    onClick={() => setSdmToggle('gender')}
                    className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                      sdmToggle === 'gender' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Gender
                  </button>
                </div>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      sdmToggle === 'status'
                        ? KOMPOSISI_STATUS_SDM
                        : sdmToggle === 'pendidikan'
                        ? KOMPOSISI_PENDIDIKAN_SDM
                        : KOMPOSISI_GENDER_SDM
                    }
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="kategori" tick={{ fontSize: 10, fill: '#334155' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                    <Tooltip formatter={(val: any) => [`${val} Pegawai`, 'Jumlah']} />
                    <Bar dataKey="jumlah" fill="#0F2942" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart B: Partisipasi Pengembangan SDM */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="mb-3 pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Partisipasi Pengembangan SDM per Jalur
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tugas Belajar, Diklat Teknis/Manajerial, UDPI, Seminar (Jumlah Pegawai)
                </p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PENGEMBANGAN_SDM_JALUR} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis type="category" dataKey="jalur" tick={{ fontSize: 10, fill: '#334155' }} width={120} />
                    <Tooltip formatter={(val: any) => [`${val} Peserta`, 'Partisipasi']} />
                    <Bar dataKey="peserta" fill="#16A34A" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SEGMEN 3: BIRO OKMR                                                 */}
      {/* ==================================================================== */}
      {activeSegment === 'okmr' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* BARIS 1: 4 KPI KECIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BIRO_OKMR_KPIS.map((kpi, idx) => {
              const statusCfg = STATUS_CONFIG[kpi.status];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>{kpi.label}</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" title={kpi.tooltipRumus} />
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                      {kpi.nilai}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{kpi.targetKonteks}</span>
                    <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${statusCfg.bgClass} ${statusCfg.colorClass}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BARIS 2: 2 CHART (50/50 SPLIT) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart A: Pengaduan per Unit Pelayanan */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="mb-3 pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Pengaduan per Unit Pelayanan (Stacked Bar)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Status penyelesaian aduan: Diterima, Diproses, dan Selesai
                </p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PENGADUAN_PER_UNIT} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="unit" tick={{ fontSize: 10, fill: '#334155' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="selesai" name="Selesai" stackId="a" fill="#16A34A" />
                    <Bar dataKey="proses" name="Diproses" stackId="a" fill="#D97706" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart B: Indeks Manajemen Risiko per Unit Kerja */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
              <div className="mb-3 pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Indeks Manajemen Risiko (MRI) per Unit
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Capaian indeks kepatuhan risiko satker (Target &ge; 3,50)
                </p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MANAJEMEN_RISIKO_PER_UNIT} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" domain={[0, 4.5]} tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis type="category" dataKey="unit" tick={{ fontSize: 10, fill: '#334155' }} width={90} />
                    <Tooltip formatter={(val: any) => [`${val} Indeks`, 'Capaian MRI']} />
                    <ReferenceLine x={3.5} stroke="#DC2626" strokeDasharray="3 3" label={{ value: 'Target 3.5', fill: '#DC2626', fontSize: 10 }} />
                    <Bar dataKey="indeks" fill="#0F2942" radius={[0, 4, 4, 0]}>
                      {MANAJEMEN_RISIKO_PER_UNIT.map((entry, idx) => (
                        <Cell key={idx} fill={entry.indeks >= 3.5 ? '#16A34A' : '#D97706'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SEGMEN 4: BIRO UMUM (SEGMEN RINGAN: 4 KPI + 1 CHART)                */}
      {/* ==================================================================== */}
      {activeSegment === 'umum' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BIRO_UMUM_KPIS.map((kpi, idx) => {
              const statusCfg = STATUS_CONFIG[kpi.status];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>{kpi.label}</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" title={kpi.tooltipRumus} />
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                      {kpi.nilai}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{kpi.targetKonteks}</span>
                    <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${statusCfg.bgClass} ${statusCfg.colorClass}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
            <div className="mb-3 pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Pemanfaatan Sistem Pengadaan BP Batam
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Jumlah transaksi dan realisasi nilai pengadaan per kanal (SIRUP, E-Katalog, E-Tendering, Toko Daring, E-Kontrak)
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PENGADAAN_SISTEM_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="kanal" tick={{ fontSize: 10, fill: '#334155' }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748B' }} unit=" M" />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar yAxisId="left" dataKey="transaksi" name="Jumlah Transaksi" fill="#0F2942" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="nilaiMiliar" name="Nilai Pagu (Rp M)" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SEGMEN 5: BIRO HUKUM (SEGMEN RINGAN: 3 KPI + 1 CHART)                */}
      {/* ==================================================================== */}
      {activeSegment === 'hukum' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BIRO_HUKUM_KPIS.map((kpi, idx) => {
              const statusCfg = STATUS_CONFIG[kpi.status];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                      <span>{kpi.label}</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" title={kpi.tooltipRumus} />
                    </div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                      {kpi.nilai}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{kpi.targetKonteks}</span>
                    <span className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${statusCfg.bgClass} ${statusCfg.colorClass}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
            <div className="mb-3 pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Kegiatan Penanganan Perkara Hukum per Bulan
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Sebaran perkara litigasi dan non-litigasi yang ditangani Biro Hukum sepanjang tahun berjalan
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERKARA_PER_BULAN_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#334155' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} allowDecimals={false} />
                  <Tooltip formatter={(val: any) => [`${val} Perkara`, 'Jumlah']} />
                  <Bar dataKey="perkara" fill="#0F2942" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
