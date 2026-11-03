import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  DISEMINASI_INFORMASI_DATA,
  KegiatanPublikasiItem,
  IklanAdvertorialItem,
  WebsiteTrafficCategory,
  KunjunganTamuCategory,
  KeprotokolanItem,
  PermohonanBantuanItem,
  PermohonanInformasiBulan,
  MouTriwulanItem,
} from './diseminasiInformasiData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { SheetSwapToggle } from '../SheetSwapToggle';

// Formatters
const formatNumberId = (val: number): string => {
  return new Intl.NumberFormat('id-ID').format(val);
};

export const DirektoratDiseminasiInformasiVisualizer: React.FC = () => {
  // =========================================================================
  // STATE FILTERS
  // =========================================================================

  // Kartu 1: Filter Tahun
  const [k1Tahun, setK1Tahun] = useState<string>('2026');
  const [k1ViewMode, setK1ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 2: Filter Tahun
  const [k2Tahun, setK2Tahun] = useState<string>('Semua Tahun');
  const [k2ViewMode, setK2ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 3: Filter Tahun
  const [k3Tahun, setK3Tahun] = useState<string>('2026');
  const [k3ViewMode, setK3ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 4: Filter Tahun
  const [k4Tahun, setK4Tahun] = useState<string>('2026');
  const [k4ViewMode, setK4ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 5: Filter Tahun
  const [k5Tahun, setK5Tahun] = useState<string>('2026');
  const [k5ViewMode, setK5ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 6: Filter Tahun & Kategori Bantuan
  const [k6Tahun, setK6Tahun] = useState<string>('Semua Tahun');
  const [k6Kategori, setK6Kategori] = useState<string>('Semua Kategori');
  const [k6ViewMode, setK6ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 7: Filter Tahun
  const [k7Tahun, setK7Tahun] = useState<string>('2026');
  const [k7ViewMode, setK7ViewMode] = useState<'chart' | 'table'>('chart');

  // Kartu 8: Tab Aktif & Filter Tahun
  const [k8Tab, setK8Tab] = useState<'A' | 'B' | 'C'>('A');
  const [k8Tahun, setK8Tahun] = useState<string>('2026');
  const [k8ViewMode, setK8ViewMode] = useState<'chart' | 'table'>('chart');

  // =========================================================================
  // DATA PROCESSING: KARTU 1 - Kegiatan Publikasi & Tentatif
  // =========================================================================
  const k1Data: KegiatanPublikasiItem[] = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.kegiatanPublikasi[k1Tahun] || DISEMINASI_INFORMASI_DATA.kegiatanPublikasi['2026'];
  }, [k1Tahun]);

  const k1Summary = useMemo(() => {
    const totalPublikasi = k1Data.reduce((acc, curr) => acc + curr.publikasi, 0);
    const totalDokumentasi = k1Data.reduce((acc, curr) => acc + curr.dokumentasi, 0);
    const persenDokumentasi = totalPublikasi > 0 ? ((totalDokumentasi / totalPublikasi) * 100).toFixed(1) : '0';
    return { totalPublikasi, totalDokumentasi, persenDokumentasi };
  }, [k1Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 2 - Iklan & Advertorial Media
  // =========================================================================
  const k2Data: IklanAdvertorialItem[] = useMemo(() => {
    if (k2Tahun === 'Semua Tahun') {
      const all: IklanAdvertorialItem[] = [];
      Object.keys(DISEMINASI_INFORMASI_DATA.iklanAdvertorial)
        .sort()
        .forEach((th) => {
          all.push(...DISEMINASI_INFORMASI_DATA.iklanAdvertorial[th]);
        });
      return all;
    }
    return DISEMINASI_INFORMASI_DATA.iklanAdvertorial[k2Tahun] || DISEMINASI_INFORMASI_DATA.iklanAdvertorial['2026'];
  }, [k2Tahun]);

  const k2Summary = useMemo(() => {
    const totalTayangan = k2Data.reduce((acc, curr) => acc + curr.nasionalLokal + curr.asing, 0);
    return { totalTayangan };
  }, [k2Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 3 - Kunjungan Website
  // =========================================================================
  const k3Data: WebsiteTrafficCategory[] = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.kunjunganWebsite[k3Tahun] || DISEMINASI_INFORMASI_DATA.kunjunganWebsite['2026'];
  }, [k3Tahun]);

  const k3Summary = useMemo(() => {
    const totalKunjungan = k3Data.reduce((acc, curr) => acc + curr.total, 0);
    // Bandingkan dengan data 2025 jika aktif 2026
    let yoyDiff = '+18,4%';
    if (k3Tahun === '2025') {
      yoyDiff = '+12,6% vs 2024';
    } else {
      yoyDiff = '+18,4% vs 2025';
    }
    return { totalKunjungan, yoyDiff };
  }, [k3Data, k3Tahun]);

  // =========================================================================
  // DATA PROCESSING: KARTU 4 - Kunjungan Tamu BP Batam
  // =========================================================================
  const k4Data: KunjunganTamuCategory[] = useMemo(() => {
    const raw = DISEMINASI_INFORMASI_DATA.kunjunganTamu[k4Tahun] || DISEMINASI_INFORMASI_DATA.kunjunganTamu['2026'];
    return [...raw].sort((a, b) => b.total - a.total);
  }, [k4Tahun]);

  const k4Summary = useMemo(() => {
    const totalTamu = k4Data.reduce((acc, curr) => acc + curr.total, 0);
    return { totalTamu };
  }, [k4Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 5 - Pelayanan Keprotokolan
  // =========================================================================
  const k5Data: KeprotokolanItem[] = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.pelayananKeprotokolan[k5Tahun] || DISEMINASI_INFORMASI_DATA.pelayananKeprotokolan['2026'];
  }, [k5Tahun]);

  const k5Summary = useMemo(() => {
    const totalDilayani = k5Data.reduce((acc, curr) => acc + curr.dilayani, 0);
    const totalTerlaksana = k5Data.reduce((acc, curr) => acc + curr.terlaksana, 0);
    const persentase = totalDilayani > 0 ? (totalTerlaksana / totalDilayani) * 100 : 0;
    const isSuccess = persentase >= 90;
    return {
      totalDilayani,
      totalTerlaksana,
      persentase: persentase.toFixed(1),
      isSuccess,
    };
  }, [k5Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 6 - Permohonan Bantuan
  // =========================================================================
  const k6Data = useMemo(() => {
    let source: PermohonanBantuanItem[] = [];
    if (k6Tahun === 'Semua Tahun') {
      Object.keys(DISEMINASI_INFORMASI_DATA.permohonanBantuan)
        .sort()
        .forEach((th) => {
          source.push(...DISEMINASI_INFORMASI_DATA.permohonanBantuan[th]);
        });
    } else {
      source = DISEMINASI_INFORMASI_DATA.permohonanBantuan[k6Tahun] || DISEMINASI_INFORMASI_DATA.permohonanBantuan['2026'];
    }

    if (k6Kategori === 'Semua Kategori') {
      return source;
    }

    // Filter kategori terpilih: hanya isi kategori itu, nolkan lainnya
    return source.map((item) => {
      const copy = { ...item };
      const kategoriKeyMap: Record<string, keyof PermohonanBantuanItem> = {
        Sosial: 'sosial',
        Keagamaan: 'keagamaan',
        Olahraga: 'olahraga',
        Pendidikan: 'pendidikan',
        Kebencanaan: 'kebencanaan',
        Lainnya: 'lainnya',
      };
      const activeKey = kategoriKeyMap[k6Kategori];
      (Object.keys(kategoriKeyMap) as (keyof typeof kategoriKeyMap)[]).forEach((kat) => {
        const k = kategoriKeyMap[kat];
        if (k !== activeKey) {
          (copy as any)[k] = 0;
        }
      });
      copy.total = (copy as any)[activeKey] || 0;
      return copy;
    });
  }, [k6Tahun, k6Kategori]);

  const k6Summary = useMemo(() => {
    const totalPermohonan = k6Data.reduce((acc, curr) => acc + curr.total, 0);
    return { totalPermohonan };
  }, [k6Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 7 - Permohonan Informasi Publik & Indeks Keterbukaan
  // =========================================================================
  const k7Data: PermohonanInformasiBulan[] = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.permohonanInformasi[k7Tahun] || DISEMINASI_INFORMASI_DATA.permohonanInformasi['2026'];
  }, [k7Tahun]);

  const k7Summary = useMemo(() => {
    const totalPermohonan = k7Data.reduce((acc, curr) => acc + curr.permohonan, 0);
    const latestIndeks = DISEMINASI_INFORMASI_DATA.indeksKeterbukaan5Tahun[DISEMINASI_INFORMASI_DATA.indeksKeterbukaan5Tahun.length - 1];
    return {
      totalPermohonan,
      indeksTerakhir: latestIndeks ? latestIndeks.nilaiIndeks.toFixed(2) : '95.20',
      predikat: latestIndeks ? latestIndeks.predikat : 'Informatif',
    };
  }, [k7Data]);

  // =========================================================================
  // DATA PROCESSING: KARTU 8 - Kerja Sama dan Koordinasi Antar Lembaga
  // =========================================================================
  const k8MouData: MouTriwulanItem[] = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.mouAntarLembaga[k8Tahun] || DISEMINASI_INFORMASI_DATA.mouAntarLembaga['2026'];
  }, [k8Tahun]);

  const k8KoordinasiData = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.koordinasiLayanan[k8Tahun] || DISEMINASI_INFORMASI_DATA.koordinasiLayanan['2026'];
  }, [k8Tahun]);

  const k8MitraData = useMemo(() => {
    return DISEMINASI_INFORMASI_DATA.mitraJakartaList;
  }, []);

  const k8Summary = useMemo(() => {
    if (k8Tab === 'A') {
      const activeMou = k8MouData.reduce((acc, curr) => acc + curr.total, 0);
      return { value: `${activeMou}`, label: 'MoU Aktif' };
    } else if (k8Tab === 'B') {
      const totalKegiatan = k8KoordinasiData.reduce((acc, curr) => acc + curr.jumlah, 0);
      return { value: `${totalKegiatan}`, label: 'Kegiatan Koordinasi' };
    } else {
      return { value: `${k8MitraData.length}`, label: 'Instansi Mitra' };
    }
  }, [k8Tab, k8MouData, k8KoordinasiData, k8MitraData]);

  return (
    <div className="w-full font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* GRID 2 KOLOM, 4 BARIS (TOTAL 8 KARTU BERUKURAN SAMA)                 */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 1: Kegiatan Terpublikasi, Terdokumentasi, Tentatif */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            {/* Header: Judul di Kiri, Angka Ringkasan di Kanan */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kegiatan Terpublikasi, Terdokumentasi, dan Tentatif
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(k1Summary.totalPublikasi)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Kegiatan ({k1Summary.persenDokumentasi}% Terdokumentasi)
                </span>
              </div>
            </div>

            {/* Legenda di Bawah Judul */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Dipublikasikan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">Terdokumentasi</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#f59e0b] rounded-full" />
                <span className="text-slate-700 font-medium text-[11px]">Tentatif Kegiatan</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Kegiatan"
                value={k1Tahun}
                onChange={(e) => setK1Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                {DISEMINASI_INFORMASI_DATA.tahunTersedia.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>
              <SheetSwapToggle mode={k1ViewMode} onChange={setK1ViewMode} />
            </div>
          </div>

          {/* Chart Section or Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {k1ViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={k1Data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
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
                        publikasi: 'Kegiatan Dipublikasikan',
                        dokumentasi: 'Kegiatan Terdokumentasi',
                        tentatif: 'Tentatif Kegiatan (Agenda)',
                      };
                      return [`${num} Kegiatan`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (p) {
                        return `Bulan ${label} • Contoh: "${p.contohNamaKegiatan}" (${p.lokasi})`;
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
                  <Bar dataKey="publikasi" name="publikasi" fill="#2563eb" radius={[2, 2, 0, 0]} barSize={11} />
                  <Bar dataKey="dokumentasi" name="dokumentasi" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={11} />
                  <Line
                    type="monotone"
                    dataKey="tentatif"
                    name="tentatif"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: '#f59e0b' }}
                    activeDot={{ r: 4.5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">Bulan</th>
                      <th className="py-2 px-2 text-right">Publikasi</th>
                      <th className="py-2 px-2 text-right">Dokumentasi</th>
                      <th className="py-2 px-2 text-right">Tentatif</th>
                      <th className="py-2 px-2.5">Contoh Agenda</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k1Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.bulan}</td>
                        <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.publikasi}</td>
                        <td className="py-2 px-2 text-right font-mono text-slate-600">{row.dokumentasi}</td>
                        <td className="py-2 px-2 text-right font-mono text-amber-600">{row.tentatif}</td>
                        <td className="py-2 px-2.5 text-slate-600 truncate max-w-xs">{row.contohNamaKegiatan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Terbuka
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Tertutup
              </span>
            </div>
            <span className="truncate ml-2 text-slate-600 text-right">
              Kegiatan Dipublikasikan &amp; Terdokumentasi (Terbuka), Tentatif Kegiatan (Tertutup, perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 1 - KARTU 2: Iklan dan Advertorial Media                     */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Iklan dan Advertorial Media
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(k2Summary.totalTayangan)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Tayangan
                </span>
              </div>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Media Nasional/Lokal</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[11px]">Media Asing/Bahasa Asing</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Iklan"
                value={k2Tahun}
                onChange={(e) => setK2Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="Semua Tahun">Semua Tahun (Multi-Tahun)</option>
                {DISEMINASI_INFORMASI_DATA.tahunTersedia.map((th) => (
                  <option key={th} value={th}>
                    Tahun {th}
                  </option>
                ))}
              </select>
              <SheetSwapToggle mode={k2ViewMode} onChange={setK2ViewMode} />
            </div>
          </div>

          {/* Chart Section or Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {k2ViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={k2Data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="semester"
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
                      return [
                        `${num} Tayangan`,
                        name === 'nasionalLokal' ? 'Media Nasional & Lokal' : 'Media Asing / Berbahasa Asing',
                      ];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (p) {
                        return `${label} • Media: ${p.namaMedia}\nJudul: "${p.contohJudul}"`;
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
                  <Bar dataKey="nasionalLokal" name="nasionalLokal" stackId="advertorial" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={24} />
                  <Bar dataKey="asing" name="asing" stackId="advertorial" fill="#60a5fa" radius={[3, 3, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">Semester / Periode</th>
                      <th className="py-2 px-2 text-right">Nasional/Lokal</th>
                      <th className="py-2 px-2 text-right">Asing</th>
                      <th className="py-2 px-2 text-right">Total</th>
                      <th className="py-2 px-2.5">Media Utama &amp; Judul</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k2Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.semester}</td>
                        <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.nasionalLokal}</td>
                        <td className="py-2 px-2 text-right font-mono text-sky-600">{row.asing}</td>
                        <td className="py-2 px-2 text-right font-mono font-black text-slate-800">{row.nasionalLokal + row.asing}</td>
                        <td className="py-2 px-2.5 text-slate-600 truncate max-w-xs" title={`${row.namaMedia} - ${row.contohJudul}`}>
                          <span className="font-semibold text-slate-800">{row.namaMedia}:</span> {row.contohJudul}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Rekapitulasi Iklan &amp; Advertorial Nasional &amp; Asing (Terbuka, persemester)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 3: Kunjungan Website                              */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kunjungan Website
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(k3Summary.totalKunjungan)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Sesi ({k3Summary.yoyDiff})
                </span>
              </div>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Portal Berita</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[11px]">Layanan Perizinan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[11px]">Potensi Investasi</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[11px]">PPID Publik</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Kunjungan Website"
                value={k3Tahun}
                onChange={(e) => setK3Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <SheetSwapToggle mode={k3ViewMode} onChange={setK3ViewMode} />
            </div>
          </div>

          {/* Chart Section or Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {k3ViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={k3Data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const num = Number(val);
                      const map: Record<string, string> = {
                        portalBerita: 'Portal Berita Utama',
                        layananPerizinan: 'Layanan Perizinan IBOSS',
                        potensiInvestasi: 'Kanal Potensi Investasi',
                        ppidPublik: 'Keterbukaan Informasi PPID',
                      };
                      return [`${formatNumberId(num)} sesi`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (p) {
                        const isUp = p.growthPct >= 0;
                        const sign = isUp ? '+' : '';
                        return `Bulan ${label} • Total: ${formatNumberId(p.total)} (${sign}${p.growthPct}% MoM)`;
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
                  <Area type="monotone" dataKey="portalBerita" name="portalBerita" stackId="web" stroke="#2563eb" fill="#2563eb" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="layananPerizinan" name="layananPerizinan" stackId="web" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="potensiInvestasi" name="potensiInvestasi" stackId="web" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.5} />
                  <Area type="monotone" dataKey="ppidPublik" name="ppidPublik" stackId="web" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">Bulan</th>
                      <th className="py-2 px-2 text-right">Portal Berita</th>
                      <th className="py-2 px-2 text-right">Perizinan</th>
                      <th className="py-2 px-2 text-right">Investasi</th>
                      <th className="py-2 px-2 text-right">PPID</th>
                      <th className="py-2 px-2 text-right">Total Sesi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k3Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.bulan}</td>
                        <td className="py-2 px-2 text-right font-mono text-blue-700">{formatNumberId(row.portalBerita)}</td>
                        <td className="py-2 px-2 text-right font-mono text-sky-600">{formatNumberId(row.layananPerizinan)}</td>
                        <td className="py-2 px-2 text-right font-mono text-cyan-600">{formatNumberId(row.potensiInvestasi)}</td>
                        <td className="py-2 px-2 text-right font-mono text-slate-500">{formatNumberId(row.ppidPublik)}</td>
                        <td className="py-2 px-2 text-right font-mono font-black text-slate-800">{formatNumberId(row.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Jumlah Kunjungan Website (Tertutup, perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 2 - KARTU 4: Kunjungan Tamu BP Batam                         */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kunjungan Tamu BP Batam
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(k4Summary.totalTamu)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Tamu
                </span>
              </div>
            </div>

            {/* Legenda 5 Unit Teratas + Lainnya */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Dit. Investasi</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Pimpinan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Pelabuhan/Bandara</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#93c5fd]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Lahan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Humas</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Lainnya</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Kunjungan Tamu"
                value={k4Tahun}
                onChange={(e) => setK4Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <SheetSwapToggle mode={k4ViewMode} onChange={setK4ViewMode} />
            </div>
          </div>

          {/* Chart Section or Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {k4ViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={k4Data} margin={{ top: 2, right: 15, left: 110, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    tickFormatter={(val) => formatNumberId(val)}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="kategori"
                    tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                    width={105}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const num = Number(val);
                      const map: Record<string, string> = {
                        investasiKek: 'Dit. Investasi & KEK',
                        kantorPimpinan: 'Kantor Pimpinan / BPH',
                        pelabuhanBandara: 'Dit. Pelabuhan & Bandara',
                        pengelolaanLahan: 'Dit. Pengelolaan Lahan',
                        humasProtokol: 'Biro Humas & Protokol',
                        lainnya: 'Unit Kerja Lainnya',
                      };
                      return [`${formatNumberId(num)} tamu`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (p) {
                        return `${label} • Total: ${formatNumberId(p.total)}\nJabatan: ${p.pekerjaanJabatan}\nAcara: "${p.contohAcara}"`;
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
                  <Bar dataKey="investasiKek" name="investasiKek" stackId="tamu" fill="#2563eb" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="kantorPimpinan" name="kantorPimpinan" stackId="tamu" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="pelabuhanBandara" name="pelabuhanBandara" stackId="tamu" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="pengelolaanLahan" name="pengelolaanLahan" stackId="tamu" fill="#93c5fd" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="humasProtokol" name="humasProtokol" stackId="tamu" fill="#0284c7" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="lainnya" name="lainnya" stackId="tamu" fill="#94a3b8" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">Kategori Tamu / Instansi</th>
                      <th className="py-2 px-2 text-right">Total Tamu</th>
                      <th className="py-2 px-2.5">Jabatan / Delegasi</th>
                      <th className="py-2 px-2.5">Agenda / Topik Acara</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k4Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.kategori}</td>
                        <td className="py-2 px-2 text-right font-mono font-black text-blue-700">{formatNumberId(row.total)}</td>
                        <td className="py-2 px-2.5 text-slate-700 font-medium">{row.pekerjaanJabatan}</td>
                        <td className="py-2 px-2.5 text-slate-600 truncate max-w-xs" title={row.contohAcara}>{row.contohAcara}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Data Kunjungan Tamu BP Batam (Tertutup, pertahun)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 5: Pelayanan Keprotokolan                          */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Pelayanan Keprotokolan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-lg sm:text-xl font-mono font-black leading-none ${
                    k5Summary.isSuccess ? 'text-emerald-600' : 'text-amber-500'
                  }`}
                >
                  {k5Summary.persentase}%
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Terlaksana ({formatNumberId(k5Summary.totalDilayani)} Kegiatan Dilayani)
                </span>
              </div>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Kegiatan Dilayani</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#10b981] rounded-full" />
                <span className="text-slate-700 font-medium text-[11px]">% Terlaksana (&ge;90% Sukses)</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Keprotokolan"
                value={k5Tahun}
                onChange={(e) => setK5Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <SheetSwapToggle mode={k5ViewMode} onChange={setK5ViewMode} />
            </div>
          </div>

          {/* Chart Section or Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {k5ViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={k5Data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 9.5, fill: '#1E293B', fontWeight: 600 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[90, 100]}
                    tick={{ fontSize: 9.5, fill: '#10B981', fontFamily: 'monospace' }}
                    tickFormatter={(v) => `${v}%`}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => {
                      const num = Number(val);
                      if (name === 'dilayani') return [`${num} Kegiatan`, 'Jumlah Kegiatan Dilayani'];
                      return [`${num.toFixed(1)}%`, 'Persentase Terlaksana'];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (p) {
                        return `Bulan ${label} • ${p.hariTanggal}\nUraian: "${p.contohUraian}"`;
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
                  <Bar yAxisId="left" dataKey="dilayani" name="dilayani" fill="#2563eb" radius={[3, 3, 0, 0]} barSize={16} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="persentase"
                    name="persentase"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#10b981' }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">Bulan</th>
                      <th className="py-2 px-2 text-right">Dilayani</th>
                      <th className="py-2 px-2 text-right">Terlaksana</th>
                      <th className="py-2 px-2 text-right">% Terlaksana</th>
                      <th className="py-2 px-2.5">Agenda / Uraian Protokol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k5Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.bulan}</td>
                        <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.dilayani}</td>
                        <td className="py-2 px-2 text-right font-mono text-emerald-600">{row.terlaksana}</td>
                        <td className="py-2 px-2 text-right font-mono font-black text-emerald-700">{row.persentase.toFixed(1)}%</td>
                        <td className="py-2 px-2.5 text-slate-600 truncate max-w-xs" title={`${row.hariTanggal} - ${row.contohUraian}`}>
                          <span className="font-semibold text-slate-800">{row.hariTanggal}:</span> {row.contohUraian}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Tertutup
            </span>
            <span className="truncate ml-2 text-slate-600">
              Persentase Pelaksanaan Pelayanan Keprotokolan (Tertutup, perbulan)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 3 - KARTU 6: Permohonan Bantuan                              */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Permohonan Bantuan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(k6Summary.totalPermohonan)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Total Permohonan
                </span>
              </div>
            </div>

            {/* Legenda 6 Kategori Bantuan */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Sosial</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Keagamaan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Olahraga</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#6366f1]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Pendidikan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Kebencanaan</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                <span className="text-slate-700 font-medium text-[10.5px]">Lainnya</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1 text-[11px]">
              <div className="flex items-center gap-1.5">
                <select
                  aria-label="Filter Tahun Bantuan"
                  value={k6Tahun}
                  onChange={(e) => setK6Tahun(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
                >
                  <option value="Semua Tahun">Semua Tahun</option>
                  {DISEMINASI_INFORMASI_DATA.tahunTersedia.map((th) => (
                    <option key={th} value={th}>
                      Tahun {th}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter Kategori Bantuan"
                  value={k6Kategori}
                  onChange={(e) => setK6Kategori(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
                >
                  <option value="Semua Kategori">Semua Kategori</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Keagamaan">Keagamaan</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Kebencanaan">Kebencanaan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <SheetSwapToggle mode={k6ViewMode} onChange={setK6ViewMode} />
            </div>
          </div>

          {/* Chart Section or Table */}
          <div className="flex-1 w-full min-h-0 my-1">
            {k6ViewMode === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={k6Data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="semester"
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
                    formatter={(val: any, name: any, item: any) => {
                      const num = Number(val);
                      const total = item.payload.total;
                      const pct = total > 0 ? ((num / total) * 100).toFixed(1) : '0';
                      const map: Record<string, string> = {
                        sosial: 'Bantuan Sosial',
                        keagamaan: 'Bantuan Keagamaan',
                        olahraga: 'Bantuan Olahraga',
                        pendidikan: 'Bantuan Pendidikan',
                        kebencanaan: 'Bantuan Kebencanaan',
                        lainnya: 'Bantuan Lainnya',
                      };
                      return [`${num} (${pct}%)`, map[name] || name];
                    }}
                    labelFormatter={(label, items) => {
                      const total = items && items[0]?.payload?.total;
                      return total ? `${label} • Total: ${total} permohonan` : `${label}`;
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
                  <Bar dataKey="sosial" name="sosial" stackId="bantuan" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={22} />
                  <Bar dataKey="keagamaan" name="keagamaan" stackId="bantuan" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={22} />
                  <Bar dataKey="olahraga" name="olahraga" stackId="bantuan" fill="#10b981" radius={[0, 0, 0, 0]} barSize={22} />
                  <Bar dataKey="pendidikan" name="pendidikan" stackId="bantuan" fill="#6366f1" radius={[0, 0, 0, 0]} barSize={22} />
                  <Bar dataKey="kebencanaan" name="kebencanaan" stackId="bantuan" fill="#ef4444" radius={[0, 0, 0, 0]} barSize={22} />
                  <Bar dataKey="lainnya" name="lainnya" stackId="bantuan" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-[10.5px]">
                  <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">Semester</th>
                      <th className="py-2 px-2 text-right">Sosial</th>
                      <th className="py-2 px-2 text-right">Keagamaan</th>
                      <th className="py-2 px-2 text-right">Olahraga</th>
                      <th className="py-2 px-2 text-right">Pendidikan</th>
                      <th className="py-2 px-2 text-right">Bencana</th>
                      <th className="py-2 px-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {k6Data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.semester}</td>
                        <td className="py-2 px-2 text-right font-mono text-blue-700">{row.sosial}</td>
                        <td className="py-2 px-2 text-right font-mono text-sky-600">{row.keagamaan}</td>
                        <td className="py-2 px-2 text-right font-mono text-emerald-600">{row.olahraga}</td>
                        <td className="py-2 px-2 text-right font-mono text-indigo-600">{row.pendidikan}</td>
                        <td className="py-2 px-2 text-right font-mono text-red-600">{row.kebencanaan}</td>
                        <td className="py-2 px-2 text-right font-mono font-black text-slate-900">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Rekapitulasi Permohonan Bantuan (Terbuka, persemester)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 4 - KARTU 7: Permohonan Info & Indeks Keterbukaan            */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Permohonan Informasi Publik &amp; Indeks Keterbukaan
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {formatNumberId(k7Summary.totalPermohonan)}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  Permohonan &bull; Indeks {k7Summary.indeksTerakhir} ({k7Summary.predikat})
                </span>
              </div>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                <span className="text-slate-700 font-medium text-[11px]">Permohonan Masuk</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]" />
                <span className="text-slate-700 font-medium text-[11px]">Selesai Ditindaklanjuti</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#3b82f6] rounded-full" />
                <span className="text-slate-700 font-medium text-[11px]">Indeks Keterbukaan (5 Tahun)</span>
              </span>
            </div>

            {/* Filter Bar & Sheet Swap */}
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[11px]">
              <select
                aria-label="Filter Tahun Permohonan Informasi"
                value={k7Tahun}
                onChange={(e) => setK7Tahun(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
              >
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <SheetSwapToggle mode={k7ViewMode} onChange={setK7ViewMode} />
            </div>
          </div>

          {/* DUA SISI DALAM KARTU 7 or Table */}
          {k7ViewMode === 'chart' ? (
          <div className="flex-1 w-full min-h-0 my-1 grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* Kolom Kiri: Column per Bulan */}
            <div className="md:col-span-8 h-full min-h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={k7Data} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 9, fill: '#1E293B', fontWeight: 600 }}
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
                      const num = Number(val);
                      return [`${num} Permohonan`, name === 'permohonan' ? 'Permohonan Masuk' : 'Selesai'];
                    }}
                    labelFormatter={(label, items) => {
                      const p = items && items[0]?.payload;
                      if (p) {
                        return `Bulan ${label}\nInfo Diminta: "${p.contohInformasiDiminta}"`;
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
                  <Bar dataKey="permohonan" name="permohonan" fill="#2563eb" radius={[2, 2, 0, 0]} barSize={9} />
                  <Bar dataKey="selesai" name="selesai" fill="#10b981" radius={[2, 2, 0, 0]} barSize={9} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Kolom Kanan: Mini Card Tren Indeks 5 Tahun */}
            <div className="md:col-span-4 bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Tren Indeks Keterbukaan
                  </span>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    5 Tahun
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-base font-mono font-black text-slate-900">
                    {k7Summary.indeksTerakhir}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    / 100 ({k7Summary.predikat})
                  </span>
                </div>
              </div>

              <div className="h-28 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DISEMINASI_INFORMASI_DATA.indeksKeterbukaan5Tahun} margin={{ top: 5, right: 8, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="tahun"
                      tick={{ fontSize: 8.5, fill: '#64748B', fontWeight: 600 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[80, 100]}
                      tick={{ fontSize: 8.5, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val: any) => [`Skor ${val}`, 'Nilai Indeks']}
                      labelFormatter={(label, items) => {
                        const p = items && items[0]?.payload;
                        if (p) {
                          return `TA ${label} (${p.predikat})\nInovasi: ${p.inovasi}\nKetersediaan: ${p.ketersediaanInformasi}`;
                        }
                        return `TA ${label}`;
                      }}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E2E8F0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                        fontSize: '10.5px',
                        fontFamily: 'monospace',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="nilaiIndeks"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ r: 2.5, fill: '#2563eb' }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <span className="text-[9.5px] text-slate-500 italic block text-center border-t border-slate-200/60 pt-1">
                Predikat Tertinggi: Badan Publik Informatif
              </span>
            </div>
          </div>
          ) : (
            <div className="flex-1 w-full min-h-0 my-1 overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-[10.5px]">
                <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-2.5">Bulan</th>
                    <th className="py-2 px-2 text-right">Permohonan</th>
                    <th className="py-2 px-2 text-right">Selesai</th>
                    <th className="py-2 px-2 text-right">% Selesai</th>
                    <th className="py-2 px-2.5">Contoh Informasi Diminta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {k7Data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40">
                      <td className="py-2 px-2.5 font-bold text-slate-900">{row.bulan}</td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-blue-700">{row.permohonan}</td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-emerald-600">{row.selesai}</td>
                      <td className="py-2 px-2 text-right font-mono text-emerald-700 font-bold">
                        {Math.round((row.selesai / (row.permohonan || 1)) * 100)}%
                      </td>
                      <td className="py-2 px-2.5 text-slate-600 truncate max-w-xs" title={row.contohInformasiDiminta}>
                        {row.contohInformasiDiminta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              Daftar Permohonan Informasi Publik (Terbuka, pertahun) &amp; Indeks Keterbukaan Informasi (Terbuka, pertahun)
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* BARIS 4 - KARTU 8: Kerja Sama dan Koordinasi Antar Lembaga (3 Tab) */}
        {/* ================================================================== */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between h-[420px]">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight leading-snug">
                  Kerja Sama dan Koordinasi Antar Lembaga
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg sm:text-xl font-mono font-black text-slate-900 leading-none">
                  {k8Summary.value}
                </span>
                <span className="text-[11px] font-semibold text-[#2563eb] ml-1.5 inline-block">
                  {k8Summary.label}
                </span>
              </div>
            </div>

            {/* Tab Switcher Kecil di Bawah Judul */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setK8Tab('A')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    k8Tab === 'A'
                      ? 'bg-white text-blue-700 shadow-2xs font-extrabold ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tab A: MoU
                </button>
                <button
                  type="button"
                  onClick={() => setK8Tab('B')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    k8Tab === 'B'
                      ? 'bg-white text-blue-700 shadow-2xs font-extrabold ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tab B: Layanan Koordinasi
                </button>
                <button
                  type="button"
                  onClick={() => setK8Tab('C')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    k8Tab === 'C'
                      ? 'bg-white text-blue-700 shadow-2xs font-extrabold ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tab C: Mitra di Jakarta
                </button>
              </div>

              {/* Filter Tahun untuk Tab A & B */}
              {k8Tab !== 'C' && (
                <div className="flex items-center gap-1.5 text-[11px]">
                  <select
                    aria-label="Filter Tahun Kerja Sama"
                    value={k8Tahun}
                    onChange={(e) => setK8Tahun(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 rounded px-2 py-0.5 text-[11px] font-medium outline-none hover:bg-slate-100 cursor-pointer"
                  >
                    <option value="2026">Tahun 2026</option>
                    <option value="2025">Tahun 2025</option>
                  </select>
                  <SheetSwapToggle mode={k8ViewMode} onChange={setK8ViewMode} />
                </div>
              )}
            </div>

            {/* Legenda Khusus Tab A */}
            {k8Tab === 'A' && (
              <div className="flex flex-wrap items-center gap-2.5 text-xs mb-1">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Infrastruktur</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Investasi &amp; KEK</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Pengusahaan</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" />
                  <span className="text-slate-700 font-medium text-[10.5px]">Pelayanan Umum</span>
                </span>
              </div>
            )}
          </div>

          {/* TAB CONTENT: TAB A (MoU Stacked Column or Table) */}
          {k8Tab === 'A' && (
            <div className="flex-1 w-full min-h-0 my-1">
              {k8ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={k8MouData} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="triwulan"
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
                          infrastruktur: 'Klaster Infrastruktur',
                          investasiKek: 'Klaster Investasi & KEK',
                          pengusahaan: 'Klaster Pengusahaan',
                          pelayananUmum: 'Klaster Pelayanan Umum',
                        };
                        return [`${num} MoU`, map[name] || name];
                      }}
                      labelFormatter={(label, items) => {
                        const p = items && items[0]?.payload;
                        if (p) {
                          const isWarning = p.sisaHari < 90;
                          const warningText = isWarning
                            ? `\n⚠️ PERINGATAN: Sisa masa berlaku < 90 hari (${p.sisaHari} hari tersisa)!`
                            : '';
                          return `${label} • Total: ${p.total} MoU\nNomor: ${p.nomorMou}\nUraian: "${p.uraian}"\nKurun Waktu: ${p.kurunWaktu}${warningText}`;
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
                    <Bar dataKey="infrastruktur" name="infrastruktur" stackId="mou" fill="#2563eb" radius={[0, 0, 0, 0]} barSize={26} />
                    <Bar dataKey="investasiKek" name="investasiKek" stackId="mou" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={26} />
                    <Bar dataKey="pengusahaan" name="pengusahaan" stackId="mou" fill="#60a5fa" radius={[0, 0, 0, 0]} barSize={26} />
                    <Bar dataKey="pelayananUmum" name="pelayananUmum" stackId="mou" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={26} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Triwulan</th>
                        <th className="py-2 px-2 text-right">Infrastruktur</th>
                        <th className="py-2 px-2 text-right">Investasi</th>
                        <th className="py-2 px-2 text-right">Pengusahaan</th>
                        <th className="py-2 px-2 text-right">Pelayanan</th>
                        <th className="py-2 px-2 text-right">Total MoU</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k8MouData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900">{row.triwulan}</td>
                          <td className="py-2 px-2 text-right font-mono text-blue-700">{row.infrastruktur}</td>
                          <td className="py-2 px-2 text-right font-mono text-sky-600">{row.investasiKek}</td>
                          <td className="py-2 px-2 text-right font-mono text-cyan-600">{row.pengusahaan}</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-500">{row.pelayananUmum}</td>
                          <td className="py-2 px-2 text-right font-mono font-black text-slate-900">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: TAB B (Horizontal Bar per Kategori Kegiatan or Table) */}
          {k8Tab === 'B' && (
            <div className="flex-1 w-full min-h-0 my-1">
              {k8ViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={k8KoordinasiData}
                    margin={{ top: 5, right: 15, left: 145, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="kategori"
                      tick={{ fontSize: 8.5, fill: '#1E293B', fontWeight: 600 }}
                      axisLine={{ stroke: '#E2E8F0' }}
                      tickLine={false}
                      width={140}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val} Kegiatan`, 'Jumlah Kegiatan']}
                      labelFormatter={(label, items) => {
                        const p = items && items[0]?.payload;
                        if (p) {
                          return `${label}\nLokasi: ${p.lokasi}\nJadwal/Waktu: ${p.tanggalKegiatan}`;
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
                    <Bar dataKey="jumlah" name="jumlah" fill="#2563eb" radius={[0, 3, 3, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider text-[10px] z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-2.5">Kategori Koordinasi</th>
                        <th className="py-2 px-2 text-right">Jumlah</th>
                        <th className="py-2 px-2.5">Lokasi</th>
                        <th className="py-2 px-2.5">Jadwal / Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {k8KoordinasiData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2.5 font-bold text-slate-900">{row.kategori}</td>
                          <td className="py-2 px-2 text-right font-mono font-black text-blue-700">{row.jumlah}</td>
                          <td className="py-2 px-2.5 text-slate-700 font-medium">{row.lokasi}</td>
                          <td className="py-2 px-2.5 text-slate-600 font-mono text-[10px]">{row.tanggalKegiatan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: TAB C (Tabel Ringkas 8 Baris Mitra Jakarta) */}
          {k8Tab === 'C' && (
            <div className="flex-1 w-full min-h-0 my-1 overflow-y-auto pr-1">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                    <th className="py-1 px-1.5 w-6 text-center">No</th>
                    <th className="py-1 px-2">Nama Instansi Mitra</th>
                    <th className="py-1 px-2">Kategori</th>
                    <th className="py-1 px-2">Alamat di Jakarta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {k8MitraData.map((m) => (
                    <tr key={m.no} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-1.5 px-1.5 text-center font-mono text-slate-400 font-bold text-[10px]">
                        {m.no}
                      </td>
                      <td className="py-1.5 px-2 font-bold text-slate-900 leading-tight">
                        {m.namaInstansi}
                      </td>
                      <td className="py-1.5 px-2">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 whitespace-nowrap">
                          {m.kategori}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-slate-600 text-[10.5px] leading-tight">
                        {m.alamat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Mengikuti Tab Aktif */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Terbuka
            </span>
            <span className="truncate ml-2 text-slate-600">
              {k8Tab === 'A' && 'Daftar MoU (Memorandum of Understanding) BP Batam (Terbuka, pertriwulan)'}
              {k8Tab === 'B' && 'Rekapitulasi Kinerja Pendampingan/Layanan Koordinasi (Terbuka, jika update)'}
              {k8Tab === 'C' && 'Rekapitulasi Daftar Mitra Kerja BP Batam di Jakarta (Terbuka, jika update)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
