import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  PUSAT_PTSP_MASTER_DATA,
  PermohonanPerizinanItem,
  InvestasiSektorItem,
  NonPerizinanItem,
  PengaduanMasyarakatItem,
  BongkarMuatItem,
} from './pusatPtspData';

export const PusatPtspDeepDive: React.FC = () => {
  // ==========================================================================
  // KARTU 1: PERMOHONAN PERIZINAN BERUSAHA PER BULAN STATES & FILTERS
  // ==========================================================================
  const [perizinanTahun, setPerizinanTahun] = useState<string>('2026');
  const [perizinanSektor, setPerizinanSektor] = useState<string>('Semua Sektor');
  const [perizinanRisiko, setPerizinanRisiko] = useState<string>('Semua Risiko');

  const dataPerizinan = useMemo(() => {
    const key = `${perizinanTahun}-${perizinanSektor}-${perizinanRisiko}`;
    const dict = PUSAT_PTSP_MASTER_DATA.permohonanPerizinan.byFilter;
    if (dict[key]) return dict[key];

    // fallback 1: by tahun + sektor + Semua Risiko
    const fallbackKey1 = `${perizinanTahun}-${perizinanSektor}-Semua Risiko`;
    if (dict[fallbackKey1]) return dict[fallbackKey1];

    // fallback 2: by tahun + Semua Sektor + Semua Risiko
    const fallbackKey2 = `${perizinanTahun}-Semua Sektor-Semua Risiko`;
    if (dict[fallbackKey2]) return dict[fallbackKey2];

    return dict['2026-Semua Sektor-Semua Risiko'];
  }, [perizinanTahun, perizinanSektor, perizinanRisiko]);

  // ==========================================================================
  // KARTU 2: RENCANA VS REALISASI INVESTASI PER SEKTOR STATES & FILTERS
  // ==========================================================================
  const [investasiTahun, setInvestasiTahun] = useState<string>('2026');
  const [investasiStatusModal, setInvestasiStatusModal] = useState<string>('Semua Penanaman Modal');

  const dataInvestasi = useMemo(() => {
    const key = `${investasiTahun}-${investasiStatusModal}`;
    const dict = PUSAT_PTSP_MASTER_DATA.investasiPerSektor.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${investasiTahun}-Semua Penanaman Modal`;
    return dict[fallbackKey] || dict['2026-Semua Penanaman Modal'];
  }, [investasiTahun, investasiStatusModal]);

  // ==========================================================================
  // KARTU 3: PENYELESAIAN LAYANAN PER JENIS LAYANAN (PROGRESS BARS HORIZONTAL)
  // ==========================================================================
  const [layananTahun, setLayananTahun] = useState<string>('2026');
  const [layananBulan, setLayananBulan] = useState<string>('Semua Bulan');
  const [activeLayananHoverIndex, setActiveLayananHoverIndex] = useState<number | null>(null);

  const dataPenyelesaian = useMemo(() => {
    const key = `${layananTahun}-${layananBulan}`;
    const dict = PUSAT_PTSP_MASTER_DATA.penyelesaianLayanan.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${layananTahun}-Semua Bulan`;
    return dict[fallbackKey] || dict['2026-Semua Bulan'];
  }, [layananTahun, layananBulan]);

  // ==========================================================================
  // KARTU 4: LAYANAN NON PERIZINAN PER JENIS STATES & FILTERS
  // ==========================================================================
  const [nonIzinTahun, setNonIzinTahun] = useState<string>('2026');
  const [nonIzinBulan, setNonIzinBulan] = useState<string>('Semua Bulan');

  const dataNonPerizinan = useMemo(() => {
    const key = `${nonIzinTahun}-${nonIzinBulan}`;
    const dict = PUSAT_PTSP_MASTER_DATA.layananNonPerizinan.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${nonIzinTahun}-Semua Bulan`;
    return dict[fallbackKey] || dict['2026-Semua Bulan'];
  }, [nonIzinTahun, nonIzinBulan]);

  // ==========================================================================
  // KARTU 5: PENGADUAN MASYARAKAT PER SALURAN STATES & FILTERS
  // ==========================================================================
  const [aduanTahun, setAduanTahun] = useState<string>('2026');
  const [aduanSemester, setAduanSemester] = useState<string>('Semua Semester');

  const dataAduan = useMemo(() => {
    const key = `${aduanTahun}-${aduanSemester}`;
    const dict = PUSAT_PTSP_MASTER_DATA.pengaduanMasyarakat.byFilter;
    if (dict[key]) return dict[key];
    const fallbackKey = `${aduanTahun}-Semua Semester`;
    return dict[fallbackKey] || dict['2026-Semua Semester'];
  }, [aduanTahun, aduanSemester]);

  // ==========================================================================
  // KARTU 6: VOLUME BONGKAR MUAT PER JENIS MUATAN (SKKBM)
  // ==========================================================================
  const [muatanTahun, setMuatanTahun] = useState<string>('2026');
  const [muatanBulan, setMuatanBulan] = useState<string>('Semua Bulan');
  const [muatanPelabuhan, setMuatanPelabuhan] = useState<string>('Semua Pelabuhan');

  const rawBongkarMuat = useMemo(() => {
    const key = `${muatanTahun}-${muatanBulan}-${muatanPelabuhan}`;
    const dict = PUSAT_PTSP_MASTER_DATA.bongkarMuat.byFilter;
    if (dict[key]) return dict[key];

    const fallbackKey1 = `${muatanTahun}-Semua Bulan-${muatanPelabuhan}`;
    if (dict[fallbackKey1]) return dict[fallbackKey1];

    const fallbackKey2 = `${muatanTahun}-Semua Bulan-Semua Pelabuhan`;
    return dict[fallbackKey2] || dict['2026-Semua Bulan-Semua Pelabuhan'];
  }, [muatanTahun, muatanBulan, muatanPelabuhan]);

  // Diurutkan dari nilai volume tertinggi ke terendah
  const sortedBongkarMuatRecords = useMemo(() => {
    return [...rawBongkarMuat.records].sort(
      (a, b) => b.volumeBongkarMuat - a.volumeBongkarMuat
    );
  }, [rawBongkarMuat]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA h-[430px])       */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Permohonan Perizinan Berusaha per Bulan         */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Permohonan Perizinan Berusaha per Bulan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataPerizinan.totalPermohonan.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Permohonan Berusaha
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2.5 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Masuk</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Proses</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Selesai</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Ditolak</span>
                </span>
              </div>

              {/* 3 Filters: Sektor, Risiko, Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Sektor Perizinan"
                  value={perizinanSektor}
                  onChange={(e) => setPerizinanSektor(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[110px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.permohonanPerizinan.filterSektorList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tingkat Risiko"
                  value={perizinanRisiko}
                  onChange={(e) => setPerizinanRisiko(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[95px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.permohonanPerizinan.filterRisikoList.map((r) => (
                    <option key={r} value={r}>
                      {r.replace('Tingkat Risiko ', '')}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Perizinan"
                  value={perizinanTahun}
                  onChange={(e) => setPerizinanTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.permohonanPerizinan.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stacked Column Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataPerizinan.records}
                margin={{ top: 8, right: 12, left: -14, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="bulan"
                  tick={{ fontSize: 9.5, fill: '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const statusLabels: Record<string, string> = {
                      masuk: 'Berkas Masuk',
                      proses: 'Dalam Proses',
                      selesai: 'Selesai Terbit',
                      ditolak: 'Ditolak',
                    };
                    return [`${val} Berkas`, statusLabels[name] || name];
                  }}
                  labelFormatter={(_label, payload) => {
                    if (payload && payload[0]) {
                      const p = payload[0].payload as PermohonanPerizinanItem;
                      return (
                        <span className="block space-y-1">
                          <span className="block font-bold text-slate-900 border-b border-slate-200 pb-0.5">
                            Bulan {p.bulan} ({p.total} Total Berkas)
                          </span>
                          <span className="block text-[10px] text-slate-600">
                            <strong>Perizinan Teratas:</strong> {p.namaPerizinanTeratas}
                          </span>
                          <span className="block text-[10px] text-blue-700">
                            <strong>Status Penanaman Modal:</strong> {p.statusModalDominan}
                          </span>
                          <span className="block text-[10px] text-emerald-700 font-semibold">
                            Capaian Selesai: {p.persenSelesai}%
                          </span>
                        </span>
                      );
                    }
                    return '';
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '8px',
                    borderColor: '#CBD5E1',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="masuk" stackId="a" fill="#94a3b8" barSize={16} />
                <Bar dataKey="proses" stackId="a" fill="#3b82f6" barSize={16} />
                <Bar dataKey="selesai" stackId="a" fill="#2563eb" barSize={16} />
                <Bar dataKey="ditolak" stackId="a" fill="#f97316" radius={[3, 3, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Tertutup
              </span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[280px]">
                Data Permohonan Perizinan Berusaha (Tertutup, perbulan)
              </span>
            </div>
            <div className="text-right text-[10.5px] font-mono text-emerald-700 font-bold">
              {dataPerizinan.persenSelesaiRata}% Selesai Terbit
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Rencana vs Realisasi Investasi per Sektor        */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Rencana vs Realisasi Investasi per Sektor
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataInvestasi.persenRealisasiTotal.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Realisasi Investasi
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Rencana (Rp Miliar)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Realisasi (Rp Miliar)</span>
                </span>
              </div>

              {/* Filters: Status Penanaman Modal & Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Status Penanaman Modal"
                  value={investasiStatusModal}
                  onChange={(e) => setInvestasiStatusModal(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[145px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.investasiPerSektor.filterStatusModalList.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Investasi"
                  value={investasiTahun}
                  onChange={(e) => setInvestasiTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.investasiPerSektor.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Clustered Horizontal Bar Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataInvestasi.records}
                margin={{ top: 5, right: 30, left: 135, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `Rp ${val >= 1000 ? (val / 1000).toFixed(1) + 'T' : val + 'M'}`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="sektor"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={130}
                  tickFormatter={(v: string) => (v.length > 21 ? `${v.slice(0, 19)}...` : v)}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    return [
                      `Rp ${Number(val).toLocaleString('id-ID')} Miliar`,
                      name === 'rencanaInvestasi' ? 'Rencana Investasi' : 'Realisasi Investasi',
                    ];
                  }}
                  labelFormatter={(_label, payload) => {
                    if (payload && payload[0]) {
                      const p = payload[0].payload as InvestasiSektorItem;
                      return (
                        <span className="block space-y-1">
                          <span className="block font-bold text-slate-900 border-b border-slate-200 pb-0.5">
                            {p.sektor}
                          </span>
                          <span className="block text-[10px] text-blue-700 font-semibold">
                            Capaian: {p.persenRealisasi.toFixed(1)}% Realisasi
                          </span>
                          <span className="block text-[10px] text-slate-600">
                            <strong>Standar Usaha:</strong> {p.pemenuhanStandarUsaha}
                          </span>
                          <span className="block text-[10px] text-slate-700 font-mono">
                            <strong>Tenaga Kerja:</strong> TKI {p.tenagaKerjaTki.toLocaleString('id-ID')} | TKA {p.tenagaKerjaTka} (Total: {p.totalTenagaKerja.toLocaleString('id-ID')})
                          </span>
                        </span>
                      );
                    }
                    return '';
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '8px',
                    borderColor: '#CBD5E1',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="rencanaInvestasi" name="rencanaInvestasi" fill="#94a3b8" barSize={10} radius={[0, 3, 3, 0]} />
                <Bar dataKey="realisasiInvestasi" name="realisasiInvestasi" fill="#2563eb" barSize={10} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Tertutup
              </span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[280px]">
                Data Pemantauan dan Evaluasi Perizinan (Tertutup, perbulan)
              </span>
            </div>
            <div className="text-right text-[10.5px] font-mono text-slate-700">
              Total Realisasi: <strong className="text-blue-700">Rp {(dataInvestasi.totalRealisasiMiliar / 1000).toFixed(2)} T</strong>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Penyelesaian Layanan per Jenis Layanan           */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Penyelesaian Layanan per Jenis Layanan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataPenyelesaian.persenTerselesaikanTotal.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Layanan Terselesaikan
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">&ge; 90% Tuntas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">&lt; 90% (Perlu Perhatian)</span>
                </span>
              </div>

              {/* Filters: Bulan & Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Bulan Penyelesaian"
                  value={layananBulan}
                  onChange={(e) => setLayananBulan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[110px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.penyelesaianLayanan.filterBulanList.map((bln) => (
                    <option key={bln} value={bln}>
                      {bln}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Penyelesaian"
                  value={layananTahun}
                  onChange={(e) => setLayananTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.penyelesaianLayanan.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Progress Bar List */}
          <div className="flex-1 overflow-y-auto pr-1 my-1 space-y-2.5">
            {dataPenyelesaian.records.map((item, idx) => {
              const isGreen = item.persenCapaian >= 90;
              const isHovered = activeLayananHoverIndex === idx;

              return (
                <div
                  key={item.id}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    isHovered ? 'bg-blue-50/70 border border-blue-200 shadow-2xs' : 'hover:bg-slate-50'
                  }`}
                  onMouseEnter={() => setActiveLayananHoverIndex(idx)}
                  onMouseLeave={() => setActiveLayananHoverIndex(null)}
                >
                  {/* Title & Percentage */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className="text-slate-800 font-semibold text-[11px] truncate max-w-[70%]"
                      title={item.jenisLayanan}
                    >
                      {item.jenisLayanan}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isGreen ? 'text-emerald-700' : 'text-orange-600'
                      }`}
                    >
                      {item.persenCapaian.toFixed(1)}%
                    </span>
                  </div>

                  {/* Progress Track & Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex items-center">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isGreen ? 'bg-[#10b981]' : 'bg-[#f97316]'
                      }`}
                      style={{ width: `${Math.min(item.persenCapaian, 100)}%` }}
                    />
                  </div>

                  {/* Tooltip / Details on hover */}
                  <div className="flex items-center justify-between text-[9.5px] text-slate-500 mt-1">
                    <span>
                      Masuk: <strong>{item.layananMasuk.toLocaleString('id-ID')}</strong> | Selesai:{' '}
                      <strong className={isGreen ? 'text-emerald-700' : 'text-orange-600'}>
                        {item.layananSelesai.toLocaleString('id-ID')}
                      </strong>
                    </span>
                    <span className="font-mono">
                      SLA: {item.realisasiHari} Hari (Std: {item.standarSlaHari} Hari)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Tertutup
              </span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[280px]">
                Data Penyelesaian Perizinan yang Tepat Waktu (Tertutup, perbulan)
              </span>
            </div>
            <div className="text-right text-[10.5px] font-mono text-slate-600">
              Total Berkas: <strong>{dataPenyelesaian.totalMasuk.toLocaleString('id-ID')}</strong>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Layanan Non Perizinan per Jenis                 */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Layanan Non Perizinan per Jenis
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataNonPerizinan.totalPermohonan.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Permohonan
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2.5 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Masuk</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Proses</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Selesai</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Tolak</span>
                </span>
              </div>

              {/* Filters: Bulan & Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Bulan Non Perizinan"
                  value={nonIzinBulan}
                  onChange={(e) => setNonIzinBulan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[110px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.layananNonPerizinan.filterBulanList.map((bln) => (
                    <option key={bln} value={bln}>
                      {bln}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Non Perizinan"
                  value={nonIzinTahun}
                  onChange={(e) => setNonIzinTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.layananNonPerizinan.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stacked Horizontal Bar Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataNonPerizinan.records}
                margin={{ top: 5, right: 30, left: 140, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val}`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="jenisNonPerizinan"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={135}
                  tickFormatter={(v: string) => (v.length > 22 ? `${v.slice(0, 20)}...` : v)}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const statusLabels: Record<string, string> = {
                      masuk: 'Masuk',
                      proses: 'Proses',
                      selesai: 'Selesai',
                      tolak: 'Ditolak',
                    };
                    return [`${val} Berkas`, statusLabels[name] || name];
                  }}
                  labelFormatter={(_label, payload) => {
                    if (payload && payload[0]) {
                      const p = payload[0].payload as NonPerizinanItem;
                      return (
                        <span className="block space-y-1">
                          <span className="block font-bold text-slate-900 border-b border-slate-200 pb-0.5">
                            {p.jenisNonPerizinan}
                          </span>
                          <span className="block text-[10px] text-slate-600">
                            <strong>Total:</strong> {p.total} berkas | <strong>Rata-rata SLA:</strong> {p.slaRataRata}
                          </span>
                          <span className="block text-[10px] text-emerald-700 font-semibold">
                            Selesai: {p.selesai} ({((p.selesai / (p.total || 1)) * 100).toFixed(1)}%)
                          </span>
                        </span>
                      );
                    }
                    return '';
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '8px',
                    borderColor: '#CBD5E1',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="masuk" stackId="b" fill="#94a3b8" barSize={14} />
                <Bar dataKey="proses" stackId="b" fill="#3b82f6" barSize={14} />
                <Bar dataKey="selesai" stackId="b" fill="#2563eb" barSize={14} />
                <Bar dataKey="tolak" stackId="b" fill="#f97316" radius={[0, 3, 3, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Terbuka
              </span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[280px]">
                Jumlah Non Perizinan (Terbuka, perbulan)
              </span>
            </div>
            <div className="text-right text-[10.5px] font-mono text-emerald-700 font-bold">
              {dataNonPerizinan.totalSelesai.toLocaleString('id-ID')} Berkas Tuntas
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Pengaduan Masyarakat per Saluran                 */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Pengaduan Masyarakat per Saluran
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {dataAduan.persenSelesaiTotal.toFixed(1)}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Aduan Terselesaikan
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Selesai</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Belum Selesai</span>
                </span>
              </div>

              {/* Filters: Semester & Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Semester Pengaduan"
                  value={aduanSemester}
                  onChange={(e) => setAduanSemester(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.pengaduanMasyarakat.filterSemesterList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Pengaduan"
                  value={aduanTahun}
                  onChange={(e) => setAduanTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.pengaduanMasyarakat.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stacked Horizontal Bar Chart */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dataAduan.records}
                margin={{ top: 5, right: 30, left: 140, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val}`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="saluran"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={135}
                  tickFormatter={(v: string) => (v.length > 22 ? `${v.slice(0, 20)}...` : v)}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    return [
                      `${val} Pengaduan`,
                      name === 'selesai' ? 'Selesai Ditindaklanjuti' : 'Dalam Tindak Lanjut',
                    ];
                  }}
                  labelFormatter={(_label, payload) => {
                    if (payload && payload[0]) {
                      const p = payload[0].payload as PengaduanMasyarakatItem;
                      return (
                        <span className="block space-y-1">
                          <span className="block font-bold text-slate-900 border-b border-slate-200 pb-0.5">
                            {p.saluran}
                          </span>
                          <span className="block text-[10px] text-blue-700 font-medium">
                            <strong>Kode Aduan:</strong> {p.kodeSampel}
                          </span>
                          <span className="block text-[10px] text-slate-600">
                            <strong>Jenis Pengaduan:</strong> {p.jenisPengaduanTerbanyak}
                          </span>
                          <span className="block text-[10px] text-emerald-700">
                            <strong>Penyelesaian:</strong> {p.solusiPenyelesaian}
                          </span>
                          <span className="block text-[10px] font-mono font-semibold text-slate-800">
                            Status: {p.selesai} Selesai / {p.total} Masuk ({p.persenSelesai.toFixed(1)}%)
                          </span>
                        </span>
                      );
                    }
                    return '';
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '8px',
                    borderColor: '#CBD5E1',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="selesai" stackId="c" fill="#2563eb" barSize={14} />
                <Bar dataKey="belumSelesai" stackId="c" fill="#f97316" radius={[0, 3, 3, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Terbuka
              </span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[270px]">
                Data Monitoring &amp; Evaluasi Aduan PTSP (Terbuka, persemester)
              </span>
            </div>
            <div className="text-right text-[10.5px] font-mono text-emerald-700 font-bold">
              {dataAduan.totalSelesai} / {dataAduan.totalPengaduan} Tuntas
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Volume Bongkar Muat per Jenis Muatan (SKKBM)     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[430px]">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Volume Bongkar Muat per Jenis Muatan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {rawBongkarMuat.totalVolumeBongkarMuat.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Volume (Ton/TEUs)
                </span>
              </div>
            </div>

            {/* Legenda & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Jumlah Bongkar Muat (Urut Terbesar)</span>
                </span>
              </div>

              {/* Filters: Pelabuhan, Bulan, Tahun */}
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Pelabuhan Bongkar Muat"
                  value={muatanPelabuhan}
                  onChange={(e) => setMuatanPelabuhan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[125px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.bongkarMuat.filterPelabuhanList.map((pel) => (
                    <option key={pel} value={pel}>
                      {pel}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Bulan Bongkar Muat"
                  value={muatanBulan}
                  onChange={(e) => setMuatanBulan(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs max-w-[100px] truncate"
                >
                  {PUSAT_PTSP_MASTER_DATA.bongkarMuat.filterBulanList.map((bln) => (
                    <option key={bln} value={bln}>
                      {bln}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Tahun Bongkar Muat"
                  value={muatanTahun}
                  onChange={(e) => setMuatanTahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-1.5 py-0.5 text-[10px] font-medium outline-none hover:bg-slate-100 cursor-pointer shadow-2xs"
                >
                  {PUSAT_PTSP_MASTER_DATA.bongkarMuat.filterTahunList.map((th) => (
                    <option key={th} value={th}>
                      Th {th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bar Horizontal Urut Nilai Tertinggi */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedBongkarMuatRecords}
                margin={{ top: 5, right: 30, left: 145, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="jenisMuatan"
                  tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={140}
                  tickFormatter={(v: string) => (v.length > 23 ? `${v.slice(0, 21)}...` : v)}
                />
                <Tooltip
                  formatter={(val: any, _name: any, item: any) => {
                    const sat = item?.payload?.satuan || 'Ton';
                    return [`${Number(val).toLocaleString('id-ID')} ${sat}`, 'Volume Bongkar Muat'];
                  }}
                  labelFormatter={(_label, payload) => {
                    if (payload && payload[0]) {
                      const p = payload[0].payload as BongkarMuatItem;
                      return (
                        <span className="block space-y-1">
                          <span className="block font-bold text-slate-900 border-b border-slate-200 pb-0.5">
                            {p.jenisMuatan}
                          </span>
                          <span className="block text-[10px] text-blue-700">
                            <strong>Pelabuhan:</strong> {p.pelabuhan}
                          </span>
                          <span className="block text-[10px] text-slate-600">
                            <strong>Peralatan:</strong> {p.peralatanUtama}
                          </span>
                          <span className="block text-[10px] text-slate-700 font-mono">
                            <strong>TKBM:</strong> {p.jumlahTkbm} Orang | <strong>Utilisasi Dermaga:</strong> {p.persenKapasitasDermaga}%
                          </span>
                        </span>
                      );
                    }
                    return '';
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: '8px',
                    borderColor: '#CBD5E1',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar
                  dataKey="volumeBongkarMuat"
                  name="volumeBongkarMuat"
                  fill="#2563eb"
                  barSize={14}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Tertutup
              </span>
              <span className="text-[10.5px] text-slate-500 truncate max-w-[270px]">
                Data Permohonan SKKBM (Tertutup, perbulan)
              </span>
            </div>
            <div className="text-right text-[10.5px] font-mono text-slate-600">
              Pelabuhan: <strong className="text-blue-700">{muatanPelabuhan}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
