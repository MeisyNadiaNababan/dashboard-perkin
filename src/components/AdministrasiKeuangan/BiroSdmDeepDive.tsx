import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { BIRO_SDM_MASTER_DATA } from './biroSdmData';

// Helper formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatRupiahMiliar = (valMiliar: number): string => {
  return `Rp ${valMiliar.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
};

const formatRupiahJuta = (valJuta: number): string => {
  return `Rp ${valJuta.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Jt`;
};

export const BiroSdmDeepDive: React.FC = () => {
  // Sheet Swap View Mode States ('chart' | 'table') for all 6 cards
  const [statusViewMode, setStatusViewMode] = useState<'chart' | 'table'>('chart');
  const [profilViewMode, setProfilViewMode] = useState<'chart' | 'table'>('chart');
  const [gajiViewMode, setGajiViewMode] = useState<'chart' | 'table'>('chart');
  const [asuransiViewMode, setAsuransiViewMode] = useState<'chart' | 'table'>('chart');
  const [kompetensiViewMode, setKompetensiViewMode] = useState<'chart' | 'table'>('chart');
  const [sistemMeritViewMode, setSistemMeritViewMode] = useState<'chart' | 'table'>('chart');

  // --------------------------------------------------------------------------
  // KARTU 1: Status Kepegawaian (Stacked Column)
  // --------------------------------------------------------------------------
  const dataStatusBulan = BIRO_SDM_MASTER_DATA.statusKepegawaianBulanan.records;
  const statusBulanTerakhir = useMemo(() => {
    return dataStatusBulan[dataStatusBulan.length - 1];
  }, [dataStatusBulan]);

  // --------------------------------------------------------------------------
  // KARTU 2: Profil Pegawai (Donut Gender di Kiri + Bar Horizontal Pendidikan di Kanan)
  // --------------------------------------------------------------------------
  const dataProfil = BIRO_SDM_MASTER_DATA.profilPegawai.data;

  // --------------------------------------------------------------------------
  // KARTU 3: Gaji per Unit Kerja (Bar Horizontal Diurutkan Terbesar)
  // --------------------------------------------------------------------------
  const [gajiTahun, setGajiTahun] = useState<string>('2026');
  const [gajiBulan, setGajiBulan] = useState<string>('Oktober');
  const [gajiStatus, setGajiStatus] = useState<string>('Semua Status');

  const dataGajiRecords = useMemo(() => {
    const key = `${gajiTahun}-${gajiBulan}-${gajiStatus}`;
    const dict = BIRO_SDM_MASTER_DATA.gajiPerUnitKerja.recordsByFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = '2026-Oktober-Semua Status';
    return dict[fallbackKey] || [];
  }, [gajiTahun, gajiBulan, gajiStatus]);

  // Urutkan terbesar berdasarkan total gaji
  const sortedGajiRecords = useMemo(() => {
    return [...dataGajiRecords].sort((a, b) => b.totalGajiJuta - a.totalGajiJuta);
  }, [dataGajiRecords]);

  const totalGajiBulanTerpilihJuta = useMemo(() => {
    return sortedGajiRecords.reduce((acc, curr) => acc + curr.totalGajiJuta, 0);
  }, [sortedGajiRecords]);

  // --------------------------------------------------------------------------
  // KARTU 4: Pembayaran Asuransi Pegawai vs Instansi (Clustered Bar Horizontal)
  // --------------------------------------------------------------------------
  const [asuransiStatus, setAsuransiStatus] = useState<string>('Semua Status');
  const [asuransiBulan, setAsuransiBulan] = useState<string>('Oktober 2026');

  const dataAsuransiRecords = useMemo(() => {
    const key = `${asuransiStatus}-${asuransiBulan}`;
    const dict = BIRO_SDM_MASTER_DATA.asuransiPegawai.recordsByFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = 'Semua Status-Oktober 2026';
    return dict[fallbackKey] || [];
  }, [asuransiStatus, asuransiBulan]);

  const totalAsuransiInstansiJuta = useMemo(() => {
    return dataAsuransiRecords.reduce((acc, curr) => acc + curr.pembayaranInstansiJuta, 0);
  }, [dataAsuransiRecords]);

  // --------------------------------------------------------------------------
  // KARTU 5: Pengembangan Kompetensi (Combo Chart)
  // --------------------------------------------------------------------------
  const dataKompetensi = BIRO_SDM_MASTER_DATA.pengembanganKompetensi.records;
  const kompetensiTerbaru = useMemo(() => {
    return dataKompetensi[dataKompetensi.length - 1];
  }, [dataKompetensi]);

  // --------------------------------------------------------------------------
  // KARTU 6: Indeks Sistem Merit (Line Chart + Target)
  // --------------------------------------------------------------------------
  const dataSistemMerit = BIRO_SDM_MASTER_DATA.indeksSistemMerit.records;
  const sistemMeritTerbaru = useMemo(() => {
    return dataSistemMerit[dataSistemMerit.length - 1];
  }, [dataSistemMerit]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA H-[430PX])       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Jumlah Pegawai per Status Kepegawaian (Stacked) */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Jumlah Pegawai per Status Kepegawaian
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(statusBulanTerakhir?.total || 2978)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Pegawai Aktif ({statusBulanTerakhir?.bulan || 'Okt'} 2026)
                </span>
              </div>
            </div>

            {/* Legenda & Toggle Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" /> PNS
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> P2K Tetap
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" /> PPPK
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" /> PTT (Kontrak)
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Profesional
                </span>
              </div>

              {/* Sheet Swap Toggle Button */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setStatusViewMode('chart')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    statusViewMode === 'chart'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik
                </button>
                <button
                  type="button"
                  onClick={() => setStatusViewMode('table')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    statusViewMode === 'table'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel Detail
                </button>
              </div>
            </div>
          </div>

          {/* Stacked Column Chart or Detail Table Section */}
          <div className="flex-1 w-full min-h-0 my-1">
            {statusViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataStatusBulan}
                  margin={{ top: 8, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 3200]}
                    tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const total = item.payload.total;
                      const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                      const map: Record<string, string> = {
                        pns: 'PNS (Pegawai Negeri Sipil)',
                        p2k: 'P2K (Pegawai Tetap BP)',
                        pppk: 'PPPK (P3K)',
                        ptt: 'PTT (Kontrak)',
                        profesional: 'Tenaga Profesional / Ahli',
                      };
                      return [`${formatNumberId(num)} Orang (${pct}%)`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const total = items && items[0]?.payload?.total;
                      return total ? `Bulan ${label} 2026 • Total: ${formatNumberId(total)} Pegawai` : `Bulan ${label}`;
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar dataKey="pns" name="pns" stackId="status" fill="#1e40af" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="p2k" name="p2k" stackId="status" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="pppk" name="pppk" stackId="status" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="ptt" name="ptt" stackId="status" fill="#60a5fa" radius={[0, 0, 0, 0]} barSize={18} />
                  <Bar dataKey="profesional" name="profesional" stackId="status" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Bulan</th>
                      <th className="py-1.5 px-2 text-right">PNS</th>
                      <th className="py-1.5 px-2 text-right">P2K Tetap</th>
                      <th className="py-1.5 px-2 text-right">PPPK</th>
                      <th className="py-1.5 px-2 text-right">PTT</th>
                      <th className="py-1.5 px-2 text-right">Profesional</th>
                      <th className="py-1.5 px-2 text-right">Total Pegawai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataStatusBulan.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{row.bulan} 2026</td>
                        <td className="py-1.5 px-2 text-right text-blue-900">{formatNumberId(row.pns)}</td>
                        <td className="py-1.5 px-2 text-right text-blue-700">{formatNumberId(row.p2k)}</td>
                        <td className="py-1.5 px-2 text-right text-sky-700">{formatNumberId(row.pppk)}</td>
                        <td className="py-1.5 px-2 text-right text-blue-500">{formatNumberId(row.ptt)}</td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(row.profesional)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/70">{formatNumberId(row.total)}</td>
                      </tr>
                    ))}
                    {/* Baris Total / Posisi Terakhir */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Posisi Terakhir ({statusBulanTerakhir?.bulan || 'Okt'} 2026)</td>
                      <td className="py-1.5 px-2 text-right text-blue-900">{formatNumberId(statusBulanTerakhir?.pns || 1042)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-700">{formatNumberId(statusBulanTerakhir?.p2k || 872)}</td>
                      <td className="py-1.5 px-2 text-right text-sky-700">{formatNumberId(statusBulanTerakhir?.pppk || 485)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-500">{formatNumberId(statusBulanTerakhir?.ptt || 396)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(statusBulanTerakhir?.profesional || 183)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black bg-blue-50/80">{formatNumberId(statusBulanTerakhir?.total || 2978)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_SDM_MASTER_DATA.statusKepegawaianBulanan.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Profil Pegawai (Donut Gender + Bar Pendidikan)  */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Profil Pegawai
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataProfil.persenPerempuan.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Pegawai Perempuan (1.182 Org)
                </span>
              </div>
            </div>

            {/* Legenda Komposit & Toggle Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Laki-laki (60,3%)
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#0ea5e9]" /> Perempuan (39,7%)
                </span>
              </div>

              {/* Sheet Swap Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setProfilViewMode('chart')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    profilViewMode === 'chart'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik
                </button>
                <button
                  type="button"
                  onClick={() => setProfilViewMode('table')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    profilViewMode === 'table'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel Detail
                </button>
              </div>
            </div>
          </div>

          {/* Body: Chart or Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {profilViewMode === 'chart' ? (
              <div className="w-full h-full grid grid-cols-12 gap-2 items-center">
                {/* Donut Chart (Jenis Kelamin) */}
                <div className="col-span-5 relative h-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataProfil.gender}
                        innerRadius={48}
                        outerRadius={68}
                        paddingAngle={3}
                        dataKey="total"
                      >
                        {dataProfil.gender.map((entry, index) => (
                          <Cell key={`gender-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any, name: any, item: any) => [
                          `${formatNumberId(Number(val))} Pegawai (${item.payload.persen}%)`,
                          name,
                        ]}
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#E2E8F0',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Donut Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-base font-black font-mono text-slate-900 leading-tight">
                      {formatNumberId(dataProfil.totalPegawai)}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium leading-none">Total Pegawai</span>
                  </div>
                </div>

                {/* Horizontal Bar Chart (Tingkat Pendidikan) */}
                <div className="col-span-7 h-full flex flex-col justify-center">
                  <ResponsiveContainer width="100%" height="95%">
                    <BarChart
                      layout="vertical"
                      data={dataProfil.pendidikan}
                      margin={{ top: 2, right: 25, left: 45, bottom: 2 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 8.5, fill: '#64748B', fontFamily: 'monospace' }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="short"
                        tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                        width={42}
                      />
                      <Tooltip
                        formatter={(val: any, _name: any, item: any) => [
                          `${formatNumberId(Number(val))} Pegawai (${item.payload.persen}%)`,
                          item.payload.tingkat,
                        ]}
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#E2E8F0',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                        }}
                      />
                      <Bar dataKey="total" radius={[0, 3, 3, 0]} barSize={10}>
                        {dataProfil.pendidikan.map((entry, index) => (
                          <Cell key={`edu-cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Jenjang Pendidikan</th>
                      <th className="py-1.5 px-2">Kode</th>
                      <th className="py-1.5 px-2 text-right">Jumlah Pegawai</th>
                      <th className="py-1.5 px-2 text-right">Porsi (%)</th>
                      <th className="py-1.5 px-2 text-right">Pria (Est)</th>
                      <th className="py-1.5 px-2 text-right">Wanita (Est)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataProfil.pendidikan.map((edu, idx) => {
                      const priaEst = Math.round(edu.total * 0.603);
                      const wanitaEst = edu.total - priaEst;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-xs shrink-0"
                              style={{ backgroundColor: edu.color }}
                            />
                            <span>{edu.tingkat}</span>
                          </td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{edu.short}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900">{formatNumberId(edu.total)}</td>
                          <td className="py-1.5 px-2 text-right text-blue-700 font-semibold">{edu.persen.toFixed(1)}%</td>
                          <td className="py-1.5 px-2 text-right text-blue-900">{formatNumberId(priaEst)}</td>
                          <td className="py-1.5 px-2 text-right text-rose-600">{formatNumberId(wanitaEst)}</td>
                        </tr>
                      );
                    })}
                    {/* Baris Total Konsolidasi */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900" colSpan={2}>
                        Total Pegawai BP Batam
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">
                        {formatNumberId(dataProfil.totalPegawai)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-700 font-black">
                        100.0%
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-900 font-black">
                        1.796 (60,3%)
                      </td>
                      <td className="py-1.5 px-2 text-right text-rose-600 font-black">
                        1.182 (39,7%)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_SDM_MASTER_DATA.profilPegawai.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Gaji per Unit Kerja (Bar Horizontal Terbesar)   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Gaji per Unit Kerja
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(totalGajiBulanTerpilihJuta / 1000)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Gaji ({gajiBulan} {gajiTahun})
                </span>
              </div>
            </div>

            {/* Legenda & 3 Filter (Bulan, Tahun, Status Pegawai) */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#1e40af]" /> Gaji Pokok
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Tunj. Kinerja
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" /> Tunj. Lain
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10.5px]">
                  <select
                    aria-label="Filter Bulan Gaji"
                    value={gajiBulan}
                    onChange={(e) => setGajiBulan(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                  >
                    {BIRO_SDM_MASTER_DATA.gajiPerUnitKerja.filterBulanList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Filter Tahun Gaji"
                    value={gajiTahun}
                    onChange={(e) => setGajiTahun(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                  >
                    {BIRO_SDM_MASTER_DATA.gajiPerUnitKerja.filterTahunList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Filter Status Pegawai Gaji"
                    value={gajiStatus}
                    onChange={(e) => setGajiStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[105px] truncate"
                  >
                    {BIRO_SDM_MASTER_DATA.gajiPerUnitKerja.filterStatusList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sheet Swap Toggle */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setGajiViewMode('chart')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      gajiViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setGajiViewMode('table')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      gajiViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tabel Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Horizontal Section or Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {gajiViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sortedGajiRecords}
                  margin={{ top: 2, right: 35, left: 85, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `Rp ${(val / 1000).toFixed(1)}M`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="unit"
                    tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const map: Record<string, string> = {
                        gajiPokokJuta: 'Gaji Pokok',
                        tunjanganKinerjaJuta: 'Tunjangan Kinerja',
                        tunjanganLainJuta: 'Tunjangan Lainnya',
                      };
                      const label = map[name] || name;
                      return [`${formatRupiahJuta(num)}`, label];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (!p) return label;
                      return `${label} (${p.namaLengkap}) • ${p.jumlahPegawai} Pegawai • Rerata: Rp ${p.rerataGajiPerPegawaiJuta.toFixed(1)} Jt/Org`;
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar dataKey="gajiPokokJuta" name="gajiPokokJuta" stackId="gaji" fill="#1e40af" radius={[0, 0, 0, 0]} barSize={11} />
                  <Bar dataKey="tunjanganKinerjaJuta" name="tunjanganKinerjaJuta" stackId="gaji" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={11} />
                  <Bar dataKey="tunjanganLainJuta" name="tunjanganLainJuta" stackId="gaji" fill="#60a5fa" radius={[0, 2, 2, 0]} barSize={11} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Unit Kerja / Satker</th>
                      <th className="py-1.5 px-2 text-right">Pegawai</th>
                      <th className="py-1.5 px-2 text-right">Gaji Pokok (Rp Jt)</th>
                      <th className="py-1.5 px-2 text-right">Tunj. Kinerja (Rp Jt)</th>
                      <th className="py-1.5 px-2 text-right">Tunj. Lain (Rp Jt)</th>
                      <th className="py-1.5 px-2 text-right">Total Beban (Rp Jt)</th>
                      <th className="py-1.5 px-2 text-right">Rerata/Org</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {sortedGajiRecords.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">
                          <span className="block truncate">{row.unit}</span>
                          <span className="text-[9px] text-slate-400 font-normal block truncate">{row.namaLengkap}</span>
                        </td>
                        <td className="py-1.5 px-2 text-right font-sans text-slate-700">{row.jumlahPegawai}</td>
                        <td className="py-1.5 px-2 text-right text-blue-900">{formatRupiahJuta(row.gajiPokokJuta)}</td>
                        <td className="py-1.5 px-2 text-right text-blue-700">{formatRupiahJuta(row.tunjanganKinerjaJuta)}</td>
                        <td className="py-1.5 px-2 text-right text-sky-700">{formatRupiahJuta(row.tunjanganLainJuta)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/70">{formatRupiahJuta(row.totalGajiJuta)}</td>
                        <td className="py-1.5 px-2 text-right text-indigo-700 font-semibold">{formatRupiahJuta(row.rerataGajiPerPegawaiJuta)}</td>
                      </tr>
                    ))}
                    {/* Baris Total Konsolidasi Satker */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Konsolidasi ({sortedGajiRecords.length} Satker)</td>
                      <td className="py-1.5 px-2 text-right text-slate-800">
                        {sortedGajiRecords.reduce((sum, r) => sum + r.jumlahPegawai, 0)} Org
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-900">
                        {formatRupiahJuta(sortedGajiRecords.reduce((sum, r) => sum + r.gajiPokokJuta, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-700">
                        {formatRupiahJuta(sortedGajiRecords.reduce((sum, r) => sum + r.tunjanganKinerjaJuta, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-sky-700">
                        {formatRupiahJuta(sortedGajiRecords.reduce((sum, r) => sum + r.tunjanganLainJuta, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black bg-blue-50/80">
                        {formatRupiahMiliar(totalGajiBulanTerpilihJuta / 1000)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-indigo-800 font-black">
                        {sortedGajiRecords.length > 0
                          ? formatRupiahJuta(
                              totalGajiBulanTerpilihJuta /
                                sortedGajiRecords.reduce((sum, r) => sum + r.jumlahPegawai, 0)
                            )
                          : 'Rp 0 Jt'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_SDM_MASTER_DATA.gajiPerUnitKerja.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Pembayaran Asuransi Pegawai vs Instansi         */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Pembayaran Asuransi Pegawai vs Instansi
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatRupiahMiliar(totalAsuransiInstansiJuta / 1000)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Bayar Instansi ({asuransiBulan.replace(' 2026', '')})
                </span>
              </div>
            </div>

            {/* Legenda & Filter (Status Pegawai, Bulan) */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Bayar Pegawai
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Bayar Instansi (BP)
                </span>
              </div>

              {/* Filters & Sheet Swap */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10.5px]">
                  <select
                    aria-label="Filter Status Asuransi"
                    value={asuransiStatus}
                    onChange={(e) => setAsuransiStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[110px] truncate"
                  >
                    {BIRO_SDM_MASTER_DATA.asuransiPegawai.filterStatusList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Filter Bulan Asuransi"
                    value={asuransiBulan}
                    onChange={(e) => setAsuransiBulan(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                  >
                    {BIRO_SDM_MASTER_DATA.asuransiPegawai.filterBulanList.map((b) => (
                      <option key={b} value={b}>
                        {b.replace(' 2026', '')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sheet Swap Toggle */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAsuransiViewMode('chart')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      asuransiViewMode === 'chart'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Grafik
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsuransiViewMode('table')}
                    className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                      asuransiViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tabel Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clustered Bar Horizontal Section or Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {asuransiViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={dataAsuransiRecords}
                  margin={{ top: 2, right: 35, left: 95, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `Rp ${val}Jt`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="singkat"
                    tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const total = item.payload.totalPembayaranJuta;
                      const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                      const label = name === 'pembayaranInstansiJuta' ? 'Porsi Instansi BP' : 'Porsi Potong Gaji Pegawai';
                      return [`${formatRupiahJuta(num)} (${pct}%)`, label];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      return p ? `${p.jenisAsuransi} • Total: ${formatRupiahJuta(p.totalPembayaranJuta)}` : label;
                    }}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar
                    dataKey="pembayaranPegawaiJuta"
                    name="pembayaranPegawaiJuta"
                    fill="#94a3b8"
                    radius={[0, 2, 2, 0]}
                    barSize={9}
                  />
                  <Bar
                    dataKey="pembayaranInstansiJuta"
                    name="pembayaranInstansiJuta"
                    fill="#2563eb"
                    radius={[0, 2, 2, 0]}
                    barSize={9}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Program Asuransi / Jaminan</th>
                      <th className="py-1.5 px-2 text-right">Potongan Pegawai</th>
                      <th className="py-1.5 px-2 text-right">Beban BP Batam</th>
                      <th className="py-1.5 px-2 text-right">Total Iuran</th>
                      <th className="py-1.5 px-2 text-right">Porsi BP (%)</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataAsuransiRecords.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">
                          <span className="block truncate">{row.jenisAsuransi}</span>
                          <span className="text-[9px] text-slate-400 font-normal block truncate">Kanal: {row.singkat}</span>
                        </td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{formatRupiahJuta(row.pembayaranPegawaiJuta)}</td>
                        <td className="py-1.5 px-2 text-right text-blue-700 font-semibold">{formatRupiahJuta(row.pembayaranInstansiJuta)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/70">{formatRupiahJuta(row.totalPembayaranJuta)}</td>
                        <td className="py-1.5 px-2 text-right text-blue-800 font-bold">{row.porsiInstansiPersen.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Disetor
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Baris Total Beban Asuransi */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Total Beban ({asuransiBulan})</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">
                        {formatRupiahJuta(dataAsuransiRecords.reduce((sum, r) => sum + r.pembayaranPegawaiJuta, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">
                        {formatRupiahJuta(totalAsuransiInstansiJuta)}
                      </td>
                      <td className="py-1.5 px-2 text-right text-slate-900 font-black bg-slate-100">
                        {formatRupiahJuta(dataAsuransiRecords.reduce((sum, r) => sum + r.totalPembayaranJuta, 0))}
                      </td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">
                        {dataAsuransiRecords.length > 0
                          ? (
                              (totalAsuransiInstansiJuta /
                                dataAsuransiRecords.reduce((sum, r) => sum + r.totalPembayaranJuta, 0)) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </td>
                      <td className="py-1.5 px-2 text-center font-sans">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                          Tuntas
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_SDM_MASTER_DATA.asuransiPegawai.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Pengembangan Kompetensi (Combo Chart)           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Pegawai Mengikuti Pengembangan Kompetensi
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {kompetensiTerbaru?.persentase.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Capaian Th {kompetensiTerbaru?.tahun || '2026'} (Target 80%)
                </span>
              </div>
            </div>

            {/* Legenda & Sheet Swap Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Diklat Teknis
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" /> UDPI
                </span>
                <span className="flex items-center gap-1 text-[10.5px] text-emerald-700 font-semibold">
                  <span className="w-2.5 h-1 rounded-xs bg-[#10b981]" /> % Pegawai Ikut
                </span>
                <span className="flex items-center gap-1 text-[10px] text-rose-600 font-medium">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-[#ef4444]" /> Target (80%)
                </span>
              </div>

              {/* Sheet Swap Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setKompetensiViewMode('chart')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    kompetensiViewMode === 'chart'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik
                </button>
                <button
                  type="button"
                  onClick={() => setKompetensiViewMode('table')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    kompetensiViewMode === 'table'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel Detail
                </button>
              </div>
            </div>
          </div>

          {/* Combo Chart Section or Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {kompetensiViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataKompetensi}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  {/* Sumbu Y Kiri: Jumlah Pegawai */}
                  <YAxis
                    yAxisId="left"
                    domain={[0, 3200]}
                    tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  {/* Sumbu Y Kanan: Persentase */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[40, 100]}
                    tick={{ fontSize: 9, fill: '#10b981', fontFamily: 'monospace' }}
                    tickFormatter={(val) => `${val}%`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <ReferenceLine
                    yAxisId="right"
                    y={80}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ value: 'Target 80%', fill: '#ef4444', fontSize: 9, position: 'top' }}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const num = Number(val);
                      if (name === 'persentase') return [`${num.toFixed(1)}%`, 'Persentase Capaian'];
                      if (name === 'pesertaDiklat') return [`${formatNumberId(num)} Orang`, 'Diklat Teknis & Manajerial'];
                      if (name === 'pesertaUdpi') return [`${formatNumberId(num)} Orang`, 'UDPI / Penyesuaian Ijazah'];
                      return [val, name];
                    }}
                    labelFormatter={(label) => `Tahun ${label}`}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="pesertaDiklat"
                    name="pesertaDiklat"
                    stackId="kompetensi"
                    fill="#2563eb"
                    radius={[0, 0, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="pesertaUdpi"
                    name="pesertaUdpi"
                    stackId="kompetensi"
                    fill="#60a5fa"
                    radius={[2, 2, 0, 0]}
                    barSize={20}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="persentase"
                    name="persentase"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#10b981' }}
                    activeDot={{ r: 6 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Tahun Anggaran</th>
                      <th className="py-1.5 px-2 text-right">Peserta Diklat</th>
                      <th className="py-1.5 px-2 text-right">Peserta UDPI</th>
                      <th className="py-1.5 px-2 text-right">Total Terlatih</th>
                      <th className="py-1.5 px-2 text-right">Total Pegawai</th>
                      <th className="py-1.5 px-2 text-right">Capaian (%)</th>
                      <th className="py-1.5 px-2 text-center">Status Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataKompetensi.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">Tahun {row.tahun}</td>
                        <td className="py-1.5 px-2 text-right text-blue-900">{formatNumberId(row.pesertaDiklat)}</td>
                        <td className="py-1.5 px-2 text-right text-sky-700">{formatNumberId(row.pesertaUdpi)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-slate-900 bg-slate-50/70">{formatNumberId(row.totalPeserta)}</td>
                        <td className="py-1.5 px-2 text-right text-slate-600">{formatNumberId(row.totalPegawai)}</td>
                        <td className="py-1.5 px-2 text-right font-bold text-emerald-700">{row.persentase.toFixed(1)}%</td>
                        <td className="py-1.5 px-2 text-center font-sans">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                              row.persentase >= 80.0
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {row.persentase >= 80.0 ? 'Tercapai' : 'Proses'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Baris Total Terakhir */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Posisi Berjalan ({kompetensiTerbaru?.tahun || '2026'})</td>
                      <td className="py-1.5 px-2 text-right text-blue-900">{formatNumberId(kompetensiTerbaru?.pesertaDiklat || 2350)}</td>
                      <td className="py-1.5 px-2 text-right text-sky-700">{formatNumberId(kompetensiTerbaru?.pesertaUdpi || 288)}</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black bg-blue-50/80">{formatNumberId(kompetensiTerbaru?.totalPeserta || 2638)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">{formatNumberId(kompetensiTerbaru?.totalPegawai || 2978)}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-700 font-black">{kompetensiTerbaru?.persentase.toFixed(1)}%</td>
                      <td className="py-1.5 px-2 text-center font-sans">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          Target 80% OK
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_SDM_MASTER_DATA.pengembanganKompetensi.datasetName}
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Indeks Sistem Merit (Line Chart + Target)       */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Indeks Sistem Merit
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {sistemMeritTerbaru?.nilai.toFixed(1)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {sistemMeritTerbaru?.kategori || 'Sangat Baik (Predikat Tertinggi)'}
                </span>
              </div>
            </div>

            {/* Legenda & Sheet Swap Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[11px]">Nilai Sistem Merit</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-t border-dashed border-[#ef4444]" />
                  <span className="text-slate-600 font-medium text-[10px]">Batas Sangat Baik (350 Poin)</span>
                </span>
              </div>

              {/* Sheet Swap Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSistemMeritViewMode('chart')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    sistemMeritViewMode === 'chart'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik
                </button>
                <button
                  type="button"
                  onClick={() => setSistemMeritViewMode('table')}
                  className={`px-2 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                    sistemMeritViewMode === 'table'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel Detail
                </button>
              </div>
            </div>
          </div>

          {/* Line Chart Section or Detail Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {sistemMeritViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataSistemMerit}
                  margin={{ top: 12, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="tahun"
                    tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[260, 390]}
                    tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <ReferenceLine
                    y={350}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    label={{ value: 'Target 350', fill: '#ef4444', fontSize: 9, position: 'top' }}
                  />
                  <Tooltip
                    formatter={(val: any, _name: any, item: any) => [
                      `${Number(val).toFixed(1)} Poin (${item.payload.kategori})`,
                      'Nilai Sistem Merit',
                    ]}
                    labelFormatter={(label) => `Tahun Evaluasi: ${label}`}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nilai"
                    name="nilai"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#2563eb' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                    <tr>
                      <th className="py-1.5 px-2">Tahun Penilaian</th>
                      <th className="py-1.5 px-2 text-right">Skor Merit (Poin)</th>
                      <th className="py-1.5 px-2 text-right">Target KASN</th>
                      <th className="py-1.5 px-2 text-right">Deviasi</th>
                      <th className="py-1.5 px-2 text-center">Kategori Predikat</th>
                      <th className="py-1.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                    {dataSistemMerit.map((row, idx) => {
                      const dev = row.nilai - row.target;
                      const isPassing = row.nilai >= row.target;
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">Tahun {row.tahun}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-blue-700">{row.nilai.toFixed(1)}</td>
                          <td className="py-1.5 px-2 text-right text-slate-600">{row.target.toFixed(1)}</td>
                          <td
                            className={`py-1.5 px-2 text-right font-semibold ${
                              dev >= 0 ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {dev >= 0 ? '+' : ''}{dev.toFixed(1)}
                          </td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                              {row.kategori}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                isPassing
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {isPassing ? 'Memenuhi Standar' : 'Tahap Pemenuhan'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Baris Posisi Terakhir */}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 sticky bottom-0 text-[10px]">
                      <td className="py-1.5 px-2 font-sans text-slate-900">Posisi Evaluasi Mutakhir (2026)</td>
                      <td className="py-1.5 px-2 text-right text-blue-800 font-black">{sistemMeritTerbaru?.nilai.toFixed(1)}</td>
                      <td className="py-1.5 px-2 text-right text-slate-700">350.0</td>
                      <td className="py-1.5 px-2 text-right text-emerald-700 font-black">+12.5</td>
                      <td className="py-1.5 px-2 text-center font-sans text-emerald-800 font-black">SANGAT BAIK</td>
                      <td className="py-1.5 px-2 text-center font-sans">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          PREDIKAT TERTINGGI
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              {BIRO_SDM_MASTER_DATA.indeksSistemMerit.datasetName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
