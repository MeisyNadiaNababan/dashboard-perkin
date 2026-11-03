import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  PEMBANGUNAN_INFRASTRUKTUR_MASTER_DATA,
  RowUtilitasBulananItem,
  RowGalianJenisItem,
  RowPenghijauanBulananItem,
  KondisiJalanItem,
  PaketKategoriPekerjaanItem,
  PaketBswItem,
} from './pembangunanInfrastrukturVisualData';

interface PembangunanInfrastrukturVisualSuiteProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// Formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatRupiahMiliar = (valM: number): string => {
  return `Rp ${valM.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M`;
};

export const PembangunanInfrastrukturVisualSuite: React.FC<
  PembangunanInfrastrukturVisualSuiteProps
> = () => {
  const masterData = PEMBANGUNAN_INFRASTRUKTUR_MASTER_DATA;

  // =========================================================================
  // STATE FILTERS
  // =========================================================================

  // Kartu 1: Filter Tahun & Jenis Utilitas
  const [k1Tahun, setK1Tahun] = useState<string>('2026');
  const [k1JenisUtilitas, setK1JenisUtilitas] = useState<string>('Semua Utilitas');

  // Kartu 2: Filter Tahun & Bulan
  const [k2Tahun, setK2Tahun] = useState<string>('2026');
  const [k2Bulan, setK2Bulan] = useState<string>('Semua');

  // Kartu 3: Filter Tahun
  const [k3Tahun, setK3Tahun] = useState<string>('2026');

  // Kartu 4: Filter Wilayah
  const [k4Wilayah, setK4Wilayah] = useState<string>('Semua Wilayah');

  // Kartu 5: Filter Tahun & Subdit
  const [k5Tahun, setK5Tahun] = useState<string>('2026');
  const [k5Subdit, setK5Subdit] = useState<string>('Semua Subdit');

  // Kartu 6: Filter Tahun & Kategori Pekerjaan
  const [k6Tahun, setK6Tahun] = useState<string>('2026');
  const [k6Kategori, setK6Kategori] = useState<string>('Semua Kategori');

  // =========================================================================
  // DATA PROCESSING: KARTU 1 - Perizinan Pemanfaatan ROW untuk Utilitas
  // =========================================================================
  const k1Data = useMemo(() => {
    const raw = masterData.rowUtilitasPerTahun[k1Tahun] || masterData.rowUtilitasPerTahun['2026'];
    if (k1JenisUtilitas === 'Semua Utilitas') {
      return raw;
    }

    const keyMap: Record<string, keyof RowUtilitasBulananItem> = {
      'Fiber Optik': 'fiberOptik',
      Listrik: 'listrik',
      Air: 'air',
      Gas: 'gas',
      Telekomunikasi: 'telekomunikasi',
    };
    const activeKey = keyMap[k1JenisUtilitas];

    return raw.map((item) => {
      const copy: any = { ...item };
      ['fiberOptik', 'listrik', 'air', 'gas', 'telekomunikasi'].forEach((k) => {
        if (k !== activeKey) {
          copy[k] = 0;
        }
      });
      copy.totalIzin = copy[activeKey] || 0;
      return copy;
    });
  }, [masterData, k1Tahun, k1JenisUtilitas]);

  const k1Summary = useMemo(() => {
    const rawCurr = masterData.rowUtilitasPerTahun[k1Tahun] || masterData.rowUtilitasPerTahun['2026'];
    const totalIzinCurr = rawCurr.reduce((acc, curr) => acc + curr.totalIzin, 0);

    const prevYearNum = parseInt(k1Tahun, 10) - 1;
    const rawPrev = masterData.rowUtilitasPerTahun[String(prevYearNum)];

    let diffText = '';
    let isPositive = true;

    if (rawPrev) {
      const totalIzinPrev = rawPrev.reduce((acc, curr) => acc + curr.totalIzin, 0);
      const diff = totalIzinCurr - totalIzinPrev;
      const pct = totalIzinPrev > 0 ? ((diff / totalIzinPrev) * 100).toFixed(1) : '0';
      const sign = diff >= 0 ? '+' : '';
      diffText = `${sign}${diff} Izin (${sign}${pct}%) vs ${prevYearNum}`;
      isPositive = diff >= 0;
    } else {
      diffText = 'Tahun Dasar';
      isPositive = true;
    }

    return { totalIzinCurr, diffText, isPositive };
  }, [masterData, k1Tahun]);

  // =========================================================================
  // DATA PROCESSING: KARTU 2 - Panjang Galian per Jenis Utilitas
  // =========================================================================
  const k2Data: RowGalianJenisItem[] = useMemo(() => {
    const yearObj = masterData.panjangGalianPerTahun[k2Tahun] || masterData.panjangGalianPerTahun['2026'];
    const list = yearObj[k2Bulan] || yearObj['Semua'] || [];
    return [...list].sort((a, b) => b.totalGalianM - a.totalGalianM);
  }, [masterData, k2Tahun, k2Bulan]);

  const k2Summary = useMemo(() => {
    const totalGalian = k2Data.reduce((acc, curr) => acc + curr.totalGalianM, 0);
    return {
      totalGalianMeter: `${formatNumberId(totalGalian)} m`,
      totalKm: (totalGalian / 1000).toFixed(2),
    };
  }, [k2Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 3 - Perizinan Pemanfaatan ROW untuk Penghijauan
  // =========================================================================
  const k3Data: RowPenghijauanBulananItem[] = useMemo(() => {
    return masterData.rowPenghijauanPerTahun[k3Tahun] || masterData.rowPenghijauanPerTahun['2026'];
  }, [masterData, k3Tahun]);

  const k3Summary = useMemo(() => {
    const totalLuas = k3Data.reduce((acc, curr) => acc + curr.totalLuasM2, 0);
    const totalIzin = k3Data.reduce((acc, curr) => acc + curr.jumlahIzin, 0);
    return {
      totalLuasM2: `${formatNumberId(totalLuas)} m²`,
      totalIzin,
    };
  }, [k3Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 4 - Kondisi Jaringan Jalan Eksisting
  // =========================================================================
  const k4Data: KondisiJalanItem[] = useMemo(() => {
    return masterData.kondisiJalanPerWilayah[k4Wilayah] || masterData.kondisiJalanPerWilayah['Semua Wilayah'];
  }, [masterData, k4Wilayah]);

  const k4Summary = useMemo(() => {
    const totalPanjang = k4Data.reduce((acc, curr) => acc + curr.totalPanjangKm, 0);
    const totalBaik = k4Data.reduce((acc, curr) => acc + curr.baikKm, 0);
    const pctBaik = totalPanjang > 0 ? (totalBaik / totalPanjang) * 100 : 0;
    const isGood = pctBaik >= 80;
    return {
      totalPanjangKm: `${totalPanjang.toFixed(1)} km`,
      pctBaik: pctBaik.toFixed(1),
      isGood,
    };
  }, [k4Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 5 - Paket Pembangunan Infrastruktur
  // =========================================================================
  const k5Data = useMemo(() => {
    const raw = masterData.paketInfrastrukturPerTahun[k5Tahun] || masterData.paketInfrastrukturPerTahun['2026'];
    if (k5Subdit === 'Semua Subdit') {
      return raw;
    }
    return raw.filter((item) => item.subdit === k5Subdit);
  }, [masterData, k5Tahun, k5Subdit]);

  const k5Summary = useMemo(() => {
    const totalKontrak = k5Data.reduce((acc, curr) => acc + curr.nilaiKontrakM, 0);
    const totalPaket = k5Data.reduce((acc, curr) => acc + curr.jumlahPaket, 0);
    return {
      totalKontrakDisplay: formatRupiahMiliar(totalKontrak),
      totalPaket,
    };
  }, [k5Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 6 - Paket Pematangan Tanah (BSW)
  // =========================================================================
  const k6Data = useMemo(() => {
    const raw = masterData.paketBswPerTahun[k6Tahun] || masterData.paketBswPerTahun['2026'];
    let filtered = [...raw];
    if (k6Kategori !== 'Semua Kategori') {
      filtered = filtered.filter((item) => item.kategoriPekerjaan === k6Kategori);
    }
    // Urutkan nilai kontrak terbesar dan ambil 8 paket
    return filtered.sort((a, b) => b.nilaiKontrakM - a.nilaiKontrakM).slice(0, 8);
  }, [masterData, k6Tahun, k6Kategori]);

  const k6Summary = useMemo(() => {
    const totalVolume = k6Data.reduce((acc, curr) => acc + curr.volumePekerjaanM3, 0);
    return {
      jumlahPaket: k6Data.length,
      totalVolumeM3: `${formatNumberId(totalVolume)} m³`,
    };
  }, [k6Data]);

  const maxKontrakBsw = useMemo(() => {
    return Math.max(...k6Data.map((d) => d.nilaiKontrakM), 1);
  }, [k6Data]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 3 BARIS (TOTAL 6 KARTU BERUKURAN SAMA)                 */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Perizinan Pemanfaatan ROW untuk Utilitas        */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Perizinan Pemanfaatan ROW untuk Utilitas
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k1Summary.totalIzinCurr} Izin
                </span>
                <span
                  className={`text-[11px] font-semibold ml-1.5 inline-block ${
                    k1Summary.isPositive ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                >
                  {k1Summary.diffText}
                </span>
              </div>
            </div>

            {/* Legenda Jenis Utilitas */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Fiber Optik</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Listrik</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Air Bersih</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0d9488]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Gas Bumi</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Telekomunikasi</span>
              </span>
            </div>

            {/* Filter Bar: Tahun & Jenis Utilitas */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun ROW Utilitas"
                value={k1Tahun}
                onChange={(e) => setK1Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.tahunList.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Jenis Utilitas"
                value={k1JenisUtilitas}
                onChange={(e) => setK1JenisUtilitas(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="Semua Utilitas">Semua Utilitas</option>
                <option value="Fiber Optik">Fiber Optik</option>
                <option value="Listrik">Listrik</option>
                <option value="Air">Air Bersih</option>
                <option value="Gas">Gas Bumi</option>
                <option value="Telekomunikasi">Telekomunikasi</option>
              </select>
            </div>
          </div>

          {/* Chart Section: Stacked Column Bulanan */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={k1Data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="bulan"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    const map: Record<string, string> = {
                      fiberOptik: 'Fiber Optik',
                      listrik: 'Jaringan Listrik',
                      air: 'Pipa Air Bersih',
                      gas: 'Pipa Gas Bumi',
                      telekomunikasi: 'Telekomunikasi Seluler',
                    };
                    return [`${num} Izin`, map[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    if (p) {
                      return `Bulan ${label} • Total: ${p.totalIzin} Izin (${formatNumberId(p.totalGalianMeter)} m Galian)\nLokasi: ${p.lokasiTerbanyak}`;
                    }
                    return `Bulan ${label}`;
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
                <Bar dataKey="fiberOptik" name="fiberOptik" stackId="utilitas" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={15} />
                <Bar dataKey="listrik" name="listrik" stackId="utilitas" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={15} />
                <Bar dataKey="air" name="air" stackId="utilitas" fill="#0284c7" radius={[0, 0, 0, 0]} barSize={15} />
                <Bar dataKey="gas" name="gas" stackId="utilitas" fill="#0d9488" radius={[0, 0, 0, 0]} barSize={15} />
                <Bar dataKey="telekomunikasi" name="telekomunikasi" stackId="utilitas" fill="#64748b" radius={[2, 2, 0, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Rekapitulasi Perizinan Pemanfaatan ROW untuk Utilitas (Tertutup, perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Panjang Galian per Jenis Utilitas               */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Panjang Galian per Jenis Utilitas
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k2Summary.totalGalianMeter}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  ({k2Summary.totalKm} km)
                </span>
              </div>
            </div>

            {/* Legenda Galian Terbuka vs Crossing */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Galian Terbuka (Open Trench)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Galian Crossing (Boring / HDD)</span>
              </span>
            </div>

            {/* Filter Bar: Tahun & Bulan */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Galian"
                value={k2Tahun}
                onChange={(e) => setK2Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.tahunList.slice(0, 2).map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Bulan Galian"
                value={k2Bulan}
                onChange={(e) => setK2Bulan(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="Semua">Semua Bulan (Tahunan)</option>
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
              </select>
            </div>
          </div>

          {/* Chart Section: Clustered Horizontal Bar */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={k2Data}
                margin={{ top: 5, right: 25, left: 125, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}m`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="jenisUtilitas"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={120}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    return [
                      `${formatNumberId(num)} meter`,
                      name === 'galianTerbukaM' ? 'Galian Terbuka' : 'Galian Crossing',
                    ];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    if (p) {
                      const warning =
                        p.izinAkanBerakhir90Hari > 0
                          ? `\n⚠️ PERINGATAN: ${p.izinAkanBerakhir90Hari} izin akan berakhir dalam 90 hari!`
                          : '';
                      return `${label} • Total: ${formatNumberId(p.totalGalianM)} m\nLokasi Terbanyak: ${p.lokasiDominan}${warning}`;
                    }
                    return `${label}`;
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
                <Bar dataKey="galianTerbukaM" name="galianTerbukaM" fill="#2563eb" radius={[0, 2, 2, 0]} barSize={10} />
                <Bar dataKey="galianCrossingM" name="galianCrossingM" fill="#94a3b8" radius={[0, 2, 2, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Rekapitulasi Perizinan Pemanfaatan ROW untuk Utilitas (Tertutup, perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Perizinan Pemanfaatan ROW untuk Penghijauan      */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Perizinan Pemanfaatan ROW untuk Penghijauan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k3Summary.totalLuasM2}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  ({k3Summary.totalIzin} Izin Terbit)
                </span>
              </div>
            </div>

            {/* Legenda 4 Jenis Penghijauan */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Taman</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Median Jalan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Pot Gantung</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#059669]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Pohon Peneduh</span>
              </span>
            </div>

            {/* Filter Bar: Tahun */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun ROW Penghijauan"
                value={k3Tahun}
                onChange={(e) => setK3Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.tahunList.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Stacked Column Luas Penghijauan */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={k3Data} margin={{ top: 10, right: 15, left: -5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="bulan"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${Math.round(val / 1000)}k m²`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    const map: Record<string, string> = {
                      tamanM2: 'Penghijauan Taman',
                      medianM2: 'Penghijauan Median Jalan',
                      potGantungM2: 'Pot Gantung / Estetika',
                      pohonPeneduhM2: 'Pohon Peneduh Jalan',
                    };
                    return [`${formatNumberId(num)} m²`, map[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    if (p) {
                      return `Bulan ${label} • Total: ${formatNumberId(p.totalLuasM2)} m² (${p.jumlahIzin} Izin)\nLokasi Terbanyak: ${p.lokasiTerbanyak}`;
                    }
                    return `Bulan ${label}`;
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
                <Bar dataKey="tamanM2" name="tamanM2" stackId="hijau" fill="#10b981" radius={[0, 0, 0, 0]} barSize={16} />
                <Bar dataKey="medianM2" name="medianM2" stackId="hijau" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={16} />
                <Bar dataKey="potGantungM2" name="potGantungM2" stackId="hijau" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={16} />
                <Bar dataKey="pohonPeneduhM2" name="pohonPeneduhM2" stackId="hijau" fill="#059669" radius={[2, 2, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Rekapitulasi Perizinan Pemanfaatan ROW untuk Penghijauan (Tertutup, perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Kondisi Jaringan Jalan Eksisting                */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kondisi Jaringan Jalan Eksisting
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k4Summary.totalPanjangKm}
                </span>
                <span
                  className={`text-[11px] font-semibold ml-1.5 inline-block ${
                    k4Summary.isGood ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                >
                  ({k4Summary.pctBaik}% Baik)
                </span>
              </div>
            </div>

            {/* Legenda 4 Kondisi Jalan */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Baik</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Sedang</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Rusak Ringan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Rusak Berat</span>
              </span>
            </div>

            {/* Filter Bar: Wilayah */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Wilayah Jalan"
                value={k4Wilayah}
                onChange={(e) => setK4Wilayah(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.wilayahList.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Stacked Bar Horizontal */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={k4Data}
                margin={{ top: 5, right: 25, left: 110, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `${val} km`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="kelasJalan"
                  tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={105}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    const map: Record<string, string> = {
                      baikKm: 'Kondisi Baik',
                      sedangKm: 'Kondisi Sedang',
                      rusakRinganKm: 'Rusak Ringan',
                      rusakBeratKm: 'Rusak Berat',
                    };
                    return [`${num.toFixed(1)} km`, map[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    if (p) {
                      return `${label} • Total: ${p.totalPanjangKm.toFixed(1)} km\nLebar Rerata: ${p.lebarRataRataMeter} m\nPerkerasan: ${p.materialPerkerasan}`;
                    }
                    return `${label}`;
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
                <Bar dataKey="baikKm" name="baikKm" stackId="jalan" fill="#10b981" radius={[0, 0, 0, 0]} barSize={18} />
                <Bar dataKey="sedangKm" name="sedangKm" stackId="jalan" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={18} />
                <Bar dataKey="rusakRinganKm" name="rusakRinganKm" stackId="jalan" fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={18} />
                <Bar dataKey="rusakBeratKm" name="rusakBeratKm" stackId="jalan" fill="#ef4444" radius={[0, 3, 3, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Jaringan Jalan (Eksisting) (Terbuka, jika update; atribut tabular dari data spasial)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Paket Pembangunan Infrastruktur                 */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Paket Pembangunan Infrastruktur
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k5Summary.totalKontrakDisplay}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  ({k5Summary.totalPaket} Paket Kontrak)
                </span>
              </div>
            </div>

            {/* Legenda 3 Batang (Pagu, HPS, Kontrak) */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Nilai Pagu</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[11px]">Nilai HPS</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Nilai Kontrak</span>
              </span>
            </div>

            {/* Filter Bar: Tahun & Subdit */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Paket Infrastruktur"
                value={k5Tahun}
                onChange={(e) => setK5Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.tahunList.slice(0, 2).map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Subdit Infrastruktur"
                value={k5Subdit}
                onChange={(e) => setK5Subdit(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.subditList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Section: Clustered Horizontal Bar */}
          <div className="flex-1 w-full min-h-0 my-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={k5Data}
                margin={{ top: 5, right: 25, left: 145, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                  tickFormatter={(val) => `Rp ${val}M`}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="kategoriPekerjaan"
                  tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  width={140}
                />
                <Tooltip
                  formatter={(val: any, name: any) => {
                    const num = Number(val);
                    const map: Record<string, string> = {
                      nilaiPaguM: 'Nilai Pagu Anggaran',
                      nilaiHpsM: 'Nilai HPS Tender',
                      nilaiKontrakM: 'Nilai Kontrak Riil',
                    };
                    return [formatRupiahMiliar(num), map[name] || name];
                  }}
                  labelFormatter={(label, items) => {
                    const p = items && items[0]?.payload;
                    if (p) {
                      return `${label} • ${p.jumlahPaket} Paket\nPekerjaan Utama: ${p.jenisPekerjaanUtama}\nEfisiensi Tender: ${p.efisiensiTenderPct}% hemat terhadap pagu`;
                    }
                    return `${label}`;
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
                <Bar dataKey="nilaiPaguM" name="nilaiPaguM" fill="#94a3b8" radius={[0, 2, 2, 0]} barSize={9} />
                <Bar dataKey="nilaiHpsM" name="nilaiHpsM" fill="#60a5fa" radius={[0, 2, 2, 0]} barSize={9} />
                <Bar dataKey="nilaiKontrakM" name="nilaiKontrakM" fill="#2563eb" radius={[0, 2, 2, 0]} barSize={9} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              Pembangunan Infrastruktur BP Batam (Terbatas, pertahun; atribut tabular dari data spasial)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Paket Pematangan Tanah (BSW) - Tabel Ringkas    */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Paket Pematangan Tanah (BSW)
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k6Summary.jumlahPaket} Paket
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  ({k6Summary.totalVolumeM3} Cut &amp; Fill)
                </span>
              </div>
            </div>

            {/* Legenda Ringkas */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="text-[11px] text-slate-500">
                8 paket strategis pematangan tanah &amp; penyiapan kawasan industri / relokasi
              </span>
            </div>

            {/* Filter Bar: Tahun & Kategori Pekerjaan */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun BSW"
                value={k6Tahun}
                onChange={(e) => setK6Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.tahunList.slice(0, 2).map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter Kategori BSW"
                value={k6Kategori}
                onChange={(e) => setK6Kategori(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {masterData.metadata.kategoriBswList.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Section: 8 Paket Terbesar */}
          <div className="flex-1 w-full min-h-0 my-1 overflow-x-auto">
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/80">
                  <th className="py-1.5 px-2">Nama Paket</th>
                  <th className="py-1.5 px-2">Kategori</th>
                  <th className="py-1.5 px-2">PPK</th>
                  <th className="py-1.5 px-2">Kontraktor</th>
                  <th className="py-1.5 px-2 min-w-[130px]">Nilai Kontrak</th>
                  <th className="py-1.5 px-2 text-right">Volume (m³)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {k6Data.map((row) => {
                  const barPct = Math.round((row.nilaiKontrakM / maxKontrakBsw) * 100);
                  return (
                    <tr key={row.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-1 px-2 font-bold text-slate-900 max-w-[170px] truncate" title={row.namaPaket}>
                        {row.namaPaket}
                      </td>
                      <td className="py-1 px-2 whitespace-nowrap">
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                          {row.kategoriPekerjaan}
                        </span>
                      </td>
                      <td className="py-1 px-2 text-slate-600 text-[10px] whitespace-nowrap">
                        {row.ppk.replace('PPK ', '')}
                      </td>
                      <td className="py-1 px-2 text-slate-700 max-w-[120px] truncate" title={row.kontraktor}>
                        {row.kontraktor}
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-900 font-bold text-[10.5px] w-14 shrink-0">
                            {formatRupiahMiliar(row.nilaiKontrakM)}
                          </span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-1 px-2 text-right font-mono font-bold text-blue-700 whitespace-nowrap">
                        {formatNumberId(row.volumePekerjaanM3)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Kecil */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Terbatas
            </span>
            <span className="truncate ml-2 text-slate-600">
              Pematangan Tanah (BSW) (Terbatas, perbulan; atribut tabular dari data spasial)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
