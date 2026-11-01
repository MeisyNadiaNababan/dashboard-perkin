import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
} from 'recharts';
import {
  PENGAMANAN_ASET_KAWASAN_DATA,
  PenertibanBangunanLiarSemester,
  KegiatanPenertibanSemester,
  PenghuniPenggarapNelayanItem,
  PenindakanKawasanItem,
  KejadianBencanaMitigasiItem,
  PengamananUnjukRasaItem,
  PersonilPengamananItem,
  ProteksiKebakaranItem,
  KegiatanSubditItem,
} from './pengamananAsetKawasanData';
import {
  Shield,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Flame,
  Users,
  Building2,
  Layers,
  Trees,
  Activity,
  Award,
} from 'lucide-react';

// Format angka Indonesia
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(Math.round(num));
};

// Format Rupiah ringkas (Juta / Miliar / Ribu)
const formatRupiahShort = (val: number): string => {
  if (Math.abs(val) >= 1_000_000_000) {
    return `Rp ${(val / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} M`;
  }
  if (Math.abs(val) >= 1_000_000) {
    return `Rp ${(val / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 1 })} Jt`;
  }
  if (val === 0) return 'Rp 0';
  return `Rp ${formatNumber(val)}`;
};

export const DirektoratPengamananAsetVisualizer: React.FC = () => {
  // Global filter default tahun berjalan (2026) dan Semester
  const [filterTahunGlobal, setFilterTahunGlobal] = useState<number>(2026);
  const [filterSemesterGlobal, setFilterSemesterGlobal] = useState<string>('all');

  // Filter Kartu 1: Penertiban Bangunan Liar
  const [filterTahun1, setFilterTahun1] = useState<string>('all');
  const [filterSemester1, setFilterSemester1] = useState<string>('all');

  // Filter Kartu 2: Kegiatan Penertiban
  const [filterTahun2, setFilterTahun2] = useState<string>('all');
  const [filterJenisKegiatan2, setFilterJenisKegiatan2] = useState<string>('all');

  // Filter Kartu 3: Penghuni, Penggarap & Nelayan Liar
  const [filterTahun3, setFilterTahun3] = useState<number>(2026);
  const [filterCara3, setFilterCara3] = useState<string>('all');

  // Filter Kartu 4: Penindakan Kawasan (TAB)
  const [tab4, setTab4] = useState<'aset' | 'hutan'>('aset');
  const [filterTahun4, setFilterTahun4] = useState<string>('all');
  const [filterJenis4, setFilterJenis4] = useState<string>('all');

  // Filter Kartu 5: Kejadian Bencana Alam & Mitigasi (TAB)
  const [tab5, setTab5] = useState<'bencana' | 'mitigasi'>('bencana');
  const [filterTahun5, setFilterTahun5] = useState<number>(2026);
  const [filterJenis5, setFilterJenis5] = useState<string>('all');

  // Filter Kartu 6: Pengamanan Unjuk Rasa
  const [filterTahun6, setFilterTahun6] = useState<string>('all');

  // Filter Kartu 7: Personil Pengamanan (TAB)
  const [tab7, setTab7] = useState<'distribusi' | 'sertifikasi'>('distribusi');
  const [filterStatus7, setFilterStatus7] = useState<string>('all');

  // Filter Kartu 8: Proteksi Kebakaran dan Kegiatan Pengamanan (TAB)
  const [tab8, setTab8] = useState<'proteksi' | 'kegiatan'>('proteksi');
  const [filterTahun8, setFilterTahun8] = useState<number>(2026);

  // =========================================================================
  // KARTU 1: PENERTIBAN BANGUNAN LIAR
  // Stacked column by Semester. Angka ringkasan: total bangunan liar tahun berjalan + delta vs tahun lalu.
  // =========================================================================
  const dataCard1 = useMemo(() => {
    return PENGAMANAN_ASET_KAWASAN_DATA.penertibanBangunanLiar.filter((item) => {
      if (filterTahun1 !== 'all' && item.tahun.toString() !== filterTahun1) return false;
      if (filterSemester1 !== 'all' && item.semester !== filterSemester1) return false;
      return true;
    });
  }, [filterTahun1, filterSemester1]);

  // Hitung ringkasan tahun berjalan (2026) vs tahun lalu (2025)
  const summaryCard1 = useMemo(() => {
    const total2026 = PENGAMANAN_ASET_KAWASAN_DATA.penertibanBangunanLiar
      .filter((i) => i.tahun === 2026)
      .reduce((acc, curr) => acc + curr.total, 0);
    const total2025 = PENGAMANAN_ASET_KAWASAN_DATA.penertibanBangunanLiar
      .filter((i) => i.tahun === 2025)
      .reduce((acc, curr) => acc + curr.total, 0);
    const diff = total2026 - total2025;
    const diffPercent = total2025 > 0 ? ((diff / total2025) * 100).toFixed(1) : '0';
    return { total2026, total2025, diff, diffPercent };
  }, []);

  // =========================================================================
  // KARTU 2: KEGIATAN PENERTIBAN (RUTIN DAN TIM TERPADU)
  // Clustered column by Semester. Angka ringkasan: total kegiatan penertiban tahun berjalan.
  // =========================================================================
  const dataCard2 = useMemo(() => {
    return PENGAMANAN_ASET_KAWASAN_DATA.kegiatanPenertiban.filter((item) => {
      if (filterTahun2 !== 'all' && item.tahun.toString() !== filterTahun2) return false;
      return true;
    });
  }, [filterTahun2]);

  const summaryCard2 = useMemo(() => {
    const items2026 = PENGAMANAN_ASET_KAWASAN_DATA.kegiatanPenertiban.filter((i) => i.tahun === 2026);
    const total2026 = items2026.reduce((acc, curr) => acc + curr.total, 0);
    const rutin2026 = items2026.reduce((acc, curr) => acc + curr.rutin, 0);
    const timTerpadu2026 = items2026.reduce((acc, curr) => acc + curr.timTerpadu, 0);
    return { total2026, rutin2026, timTerpadu2026 };
  }, []);

  // =========================================================================
  // KARTU 3: PENGHUNI, PENGGARAP, DAN NELAYAN LIAR
  // Horizontal stacked bar, urut terbanyak. Y: Lokasi. Stacks: Jenis Bangunan / Garapan.
  // =========================================================================
  const dataCard3 = useMemo(() => {
    return PENGAMANAN_ASET_KAWASAN_DATA.penghuniPenggarapNelayan
      .filter((item) => {
        if (item.tahun !== filterTahun3) return false;
        if (filterCara3 !== 'all' && item.caraMendapatkanDominan !== filterCara3) return false;
        return true;
      })
      .sort((a, b) => b.totalJiwaKK - a.totalJiwaKK);
  }, [filterTahun3, filterCara3]);

  const summaryCard3 = useMemo(() => {
    const totalJiwa = dataCard3.reduce((acc, curr) => acc + curr.totalJiwaKK, 0);
    const totalLuas = dataCard3.reduce((acc, curr) => acc + curr.totalLuasHa, 0).toFixed(1);
    return { totalJiwa, totalLuas };
  }, [dataCard3]);

  // =========================================================================
  // KARTU 4: PENINDAKAN KAWASAN (TAB A: Aset & Obvit | TAB B: Lingkungan & Hutan)
  // Clustered column per Semester: Luas (ha) per jenis kegiatan.
  // =========================================================================
  const rawDataCard4 = tab4 === 'aset'
    ? PENGAMANAN_ASET_KAWASAN_DATA.penindakanKawasan.asetDanObvit
    : PENGAMANAN_ASET_KAWASAN_DATA.penindakanKawasan.lingkunganDanHutan;

  const dataCard4 = useMemo(() => {
    return rawDataCard4.filter((item) => {
      if (filterTahun4 !== 'all' && item.tahun.toString() !== filterTahun4) return false;
      return true;
    });
  }, [rawDataCard4, filterTahun4]);

  const summaryCard4 = useMemo(() => {
    const totalLuasAktif = dataCard4.reduce((acc, curr) => acc + curr.totalLuasHa, 0).toFixed(1);
    const totalLuas2026 = rawDataCard4
      .filter((i) => i.tahun === 2026)
      .reduce((acc, curr) => acc + curr.totalLuasHa, 0)
      .toFixed(1);
    return { totalLuasAktif, totalLuas2026 };
  }, [dataCard4, rawDataCard4]);

  // =========================================================================
  // KARTU 5: KEJADIAN BENCANA ALAM DAN MITIGASI (TAB A: Bencana | TAB B: Mitigasi)
  // Horizontal bar. Y: Jenis Kegiatan/Kejadian. X: Jumlah.
  // =========================================================================
  const rawDataCard5 = tab5 === 'bencana'
    ? PENGAMANAN_ASET_KAWASAN_DATA.kejadianDanMitigasi.kejadianBencana
    : PENGAMANAN_ASET_KAWASAN_DATA.kejadianDanMitigasi.mitigasiRescueSosialisasi;

  const dataCard5 = useMemo(() => {
    return rawDataCard5.filter((item) => {
      if (item.tahun !== filterTahun5) return false;
      if (filterJenis5 !== 'all' && !item.jenis.toLowerCase().includes(filterJenis5.toLowerCase())) return false;
      return true;
    });
  }, [rawDataCard5, filterTahun5, filterJenis5]);

  const summaryCard5 = useMemo(() => {
    const totalJumlah = dataCard5.reduce((acc, curr) => acc + curr.jumlah, 0);
    const totalKorban = dataCard5.reduce((acc, curr) => acc + curr.korban, 0);
    const totalKerugian = dataCard5.reduce((acc, curr) => acc + curr.kerugianRp, 0);
    return { totalJumlah, totalKorban, totalKerugian };
  }, [dataCard5]);

  // =========================================================================
  // KARTU 6: PENGAMANAN UNJUK RASA
  // Column + garis sumbu kanan. Batang: Jumlah Aksi. Garis: Personil Dikerahkan.
  // =========================================================================
  const dataCard6 = useMemo(() => {
    return PENGAMANAN_ASET_KAWASAN_DATA.pengamananUnjukRasa.filter((item) => {
      if (filterTahun6 !== 'all' && item.tahun.toString() !== filterTahun6) return false;
      return true;
    });
  }, [filterTahun6]);

  const summaryCard6 = useMemo(() => {
    const items2026 = PENGAMANAN_ASET_KAWASAN_DATA.pengamananUnjukRasa.filter((i) => i.tahun === 2026);
    const totalAksi2026 = items2026.reduce((acc, curr) => acc + curr.jumlahAksi, 0);
    const totalPersonil2026 = items2026.reduce((acc, curr) => acc + curr.personilDikerahkan, 0);
    return { totalAksi2026, totalPersonil2026 };
  }, []);

  // =========================================================================
  // KARTU 7: PERSONIL PENGAMANAN (TAB A: Distribusi | TAB B: Sertifikasi Khusus)
  // Stacked Bar. Y: Penempatan / Sertifikasi. Stacks: Status Pegawai.
  // =========================================================================
  const rawDataCard7 = tab7 === 'distribusi'
    ? PENGAMANAN_ASET_KAWASAN_DATA.personil.distribusiPersonil
    : PENGAMANAN_ASET_KAWASAN_DATA.personil.sertifikasiKhusus;

  const dataCard7 = useMemo(() => {
    return rawDataCard7.map((item) => {
      let filteredTotal = item.total;
      let pnsVal = item.pns;
      let p3kVal = item.p3k;
      let kontrakVal = item.kontrakDitpam;

      if (filterStatus7 === 'pns') {
        filteredTotal = item.pns;
        p3kVal = 0;
        kontrakVal = 0;
      } else if (filterStatus7 === 'p3k') {
        filteredTotal = item.p3k;
        pnsVal = 0;
        kontrakVal = 0;
      } else if (filterStatus7 === 'kontrak') {
        filteredTotal = item.kontrakDitpam;
        pnsVal = 0;
        p3kVal = 0;
      }

      return {
        ...item,
        pns: pnsVal,
        p3k: p3kVal,
        kontrakDitpam: kontrakVal,
        total: filteredTotal,
      };
    });
  }, [rawDataCard7, filterStatus7]);

  const summaryCard7 = useMemo(() => {
    const totalAll = rawDataCard7.reduce((acc, curr) => acc + curr.total, 0);
    const totalPns = rawDataCard7.reduce((acc, curr) => acc + curr.pns, 0);
    const totalP3k = rawDataCard7.reduce((acc, curr) => acc + curr.p3k, 0);
    const totalKontrak = rawDataCard7.reduce((acc, curr) => acc + curr.kontrakDitpam, 0);
    return { totalAll, totalPns, totalP3k, totalKontrak };
  }, [rawDataCard7]);

  // =========================================================================
  // KARTU 8: PROTEKSI KEBAKARAN DAN KEGIATAN PENGAMANAN PER SUBDIT (TAB)
  // TAB A: Pengecekan Proteksi (APAR, Hidran, Sprinkler, Detektor)
  // TAB B: Kegiatan Subdit (Patroli, Razia, VVIP, Event)
  // =========================================================================
  const dataProteksi = useMemo(() => {
    return PENGAMANAN_ASET_KAWASAN_DATA.proteksiDanKegiatan.proteksiKebakaran.filter(
      (item) => item.tahun === filterTahun8
    );
  }, [filterTahun8]);

  const dataSubdit = useMemo(() => {
    return PENGAMANAN_ASET_KAWASAN_DATA.proteksiDanKegiatan.kegiatanSubdit.filter(
      (item) => item.tahun === filterTahun8
    );
  }, [filterTahun8]);

  const summaryCard8 = useMemo(() => {
    if (tab8 === 'proteksi') {
      const totalAlat = dataProteksi.reduce((acc, curr) => acc + curr.totalAlat, 0);
      const totalApar = dataProteksi.reduce((acc, curr) => acc + curr.apar, 0);
      const totalHidran = dataProteksi.reduce((acc, curr) => acc + curr.hidran, 0);
      return {
        primaryVal: `${formatNumber(totalAlat)} Alat`,
        secondaryText: `${totalApar} APAR • ${totalHidran} Hidran • 100% Laik`,
      };
    } else {
      const totalKegiatan = dataSubdit.reduce((acc, curr) => acc + curr.totalKegiatan, 0);
      const totalPersonil = dataSubdit.reduce((acc, curr) => acc + curr.personilTerlibat, 0);
      return {
        primaryVal: `${formatNumber(totalKegiatan)} Giat`,
        secondaryText: `${formatNumber(totalPersonil)} Personil • 4 Subdit Siaga`,
      };
    }
  }, [tab8, dataProteksi, dataSubdit]);

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* ================================================================== */}
      {/* TOP COMPACT UNIT HEADER (Bukan landing page, hanya identitas unit) */}
      {/* ================================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-slate-900 tracking-tight">
                Direktorat Pengamanan Aset dan Kawasan (Ditpam BP Batam)
              </h1>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                DEP A6
              </span>
              <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                Periode: Persemester
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dashboard visualisasi operasional terpadu: penertiban bangunan liar, mitigasi bencana, perlindungan hutan/DTA waduk, penindakan kawasan, dan kesiapsiagaan personil.
            </p>
          </div>
        </div>

        {/* Global Year & Semester Selector Quick Filter */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Tahun:</span>
            <select
              value={filterTahunGlobal}
              onChange={(e) => {
                const val = Number(e.target.value);
                setFilterTahunGlobal(val);
                setFilterTahun3(val);
                setFilterTahun5(val);
                setFilterTahun8(val);
              }}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* GRID 2 KOLOM x 4 BARIS = TOTAL 8 KARTU GRAFIK BERUKURAN SAMA      */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* ---------------------------------------------------------------- */}
        {/* BARIS 1 - KARTU 1: PENERTIBAN BANGUNAN LIAR                     */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Penertiban Bangunan Liar
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                    <span>Rumah Liar</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#60a5fa] inline-block" />
                    <span>Kios/Gudang Liar</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8] inline-block" />
                    <span>Pos Liar</span>
                  </div>
                </div>
              </div>

              {/* Angka Ringkasan Besar + Keterangan Kecil Biru */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {formatNumber(summaryCard1.total2026)} Unit
                </div>
                <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-blue-600 mt-0.5">
                  {summaryCard1.diff <= 0 ? (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      {Math.abs(summaryCard1.diff)} unit ({Math.abs(Number(summaryCard1.diffPercent))}%) vs 2025
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-amber-600 font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +{summaryCard1.diff} unit ({summaryCard1.diffPercent}%) vs 2025
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-Filter: Tahun & Semester */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun1}
                onChange={(e) => setFilterTahun1(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <select
                value={filterSemester1}
                onChange={(e) => setFilterSemester1(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Semester</option>
                <option value="Semester I">Semester I</option>
                <option value="Semester II">Semester II</option>
              </select>
            </div>

            {/* Visualisasi: Stacked Column */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCard1} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 10.5 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as PenertibanBangunanLiarSemester;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.period} &bull; {d.semester}
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] font-mono">
                            <span>Rumah Liar:</span>
                            <span className="font-bold text-white text-right">{d.rumahLiar} Unit</span>
                            <span>Kios/Gudang Liar:</span>
                            <span className="font-bold text-white text-right">{d.kiosGudangLiar} Unit</span>
                            <span>Pos Liar:</span>
                            <span className="font-bold text-white text-right">{d.posLiar} Unit</span>
                            <span className="border-t border-slate-700 text-sky-300 font-sans">Total Ditertibkan:</span>
                            <span className="border-t border-slate-700 font-bold text-emerald-400 text-right font-mono">
                              {d.total} Unit
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                            <div><strong className="text-slate-300">Lokasi Dominan:</strong> {d.lokasiTerbanyak}</div>
                            <div><strong className="text-slate-300">Pemilik Unik:</strong> {d.namaPemilikUnik} Orang</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="rumahLiar" name="Rumah Liar" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="kiosGudangLiar" name="Kios/Gudang Liar" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="posLiar" name="Pos Liar" stackId="a" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 1 */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Tertutup
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: Data Penertiban Bangunan Liar (persemester)
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 1 - KARTU 2: KEGIATAN PENERTIBAN (RUTIN & TIM TERPADU)    */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Kegiatan Penertiban (Rutin dan Tim Terpadu)
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                    <span>Rutin Ditpam</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8] inline-block" />
                    <span>Tim Terpadu</span>
                  </div>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {summaryCard2.total2026} Kegiatan
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  {summaryCard2.rutin2026} Rutin &bull; {summaryCard2.timTerpadu2026} Tim Terpadu
                </div>
              </div>
            </div>

            {/* Filter Jenis Kegiatan & Tahun */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun2}
                onChange={(e) => setFilterTahun2(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <select
                value={filterJenisKegiatan2}
                onChange={(e) => setFilterJenisKegiatan2(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Jenis Kegiatan</option>
                <option value="rutin">Rutin Ditpam Saja</option>
                <option value="timTerpadu">Tim Terpadu Saja</option>
              </select>
            </div>

            {/* Visualisasi: Clustered Column */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCard2} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 10.5 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as KegiatanPenertibanSemester;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 max-w-xs font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.period} &bull; Total {d.total} Operasi
                          </div>
                          <div className="flex justify-between text-[11px] font-mono">
                            <span>Rutin Ditpam: <strong className="text-white">{d.rutin}</strong></span>
                            <span>Tim Terpadu: <strong className="text-sky-300">{d.timTerpadu}</strong></span>
                          </div>
                          <div className="text-[10.5px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                            <div><strong className="text-slate-400">Objek:</strong> {d.objekPenertiban}</div>
                            <div><strong className="text-slate-400">Inisiator:</strong> {d.inisiator}</div>
                            <div><strong className="text-slate-400">Lokasi:</strong> {d.lokasiDominan}</div>
                            <div><strong className="text-emerald-400">Hasil:</strong> {d.hasil}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  {(filterJenisKegiatan2 === 'all' || filterJenisKegiatan2 === 'rutin') && (
                    <Bar dataKey="rutin" name="Rutin Ditpam" fill="#2563eb" radius={[3, 3, 0, 0]} />
                  )}
                  {(filterJenisKegiatan2 === 'all' || filterJenisKegiatan2 === 'timTerpadu') && (
                    <Bar dataKey="timTerpadu" name="Tim Terpadu" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 2 */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: Rekap Kegiatan Penertiban (Rutin dan Tim Terpadu) (persemester)
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 2 - KARTU 3: PENGHUNI, PENGGARAP, DAN NELAYAN LIAR         */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Penghuni, Penggarap, dan Nelayan Liar
                </h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                    <span>Rumah</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8] inline-block" />
                    <span>Gubuk</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981] inline-block" />
                    <span>Kebun</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b] inline-block" />
                    <span>Keramba</span>
                  </div>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {formatNumber(summaryCard3.totalJiwa)} Jiwa / KK
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  Total Luas Garapan: {summaryCard3.totalLuas} Ha
                </div>
              </div>
            </div>

            {/* Filter: Tahun & Cara Mendapatkan */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun3}
                onChange={(e) => setFilterTahun3(Number(e.target.value))}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value={2026}>Tahun 2026</option>
                <option value={2025}>Tahun 2025</option>
              </select>
              <select
                value={filterCara3}
                onChange={(e) => setFilterCara3(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Cara Mendapatkan</option>
                <option value="Garap Sendiri">Garap Sendiri</option>
                <option value="Beli">Beli dari Pihak Lain</option>
                <option value="Warisan">Warisan / Turun-temurun</option>
              </select>
            </div>

            {/* Visualisasi: Horizontal Stacked Bar */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard3}
                  layout="vertical"
                  margin={{ top: 5, right: 15, left: 35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <YAxis
                    dataKey="lokasi"
                    type="category"
                    tick={{ fontSize: 9.5 }}
                    width={110}
                    stroke="#64748b"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as PenghuniPenggarapNelayanItem;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.lokasi}
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 text-[11px] font-mono">
                            <span>Rumah Tinggal:</span>
                            <span className="text-right font-bold text-white">{d.rumahTinggal}</span>
                            <span>Pondok/Gubuk:</span>
                            <span className="text-right font-bold text-sky-300">{d.pondokGubuk}</span>
                            <span>Kebun Garapan:</span>
                            <span className="text-right font-bold text-emerald-400">{d.kebunGarapan}</span>
                            <span>Keramba/Bagan:</span>
                            <span className="text-right font-bold text-amber-400">{d.kerambaBagan}</span>
                          </div>
                          <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                            <div><strong className="text-slate-400">Total:</strong> {d.totalJiwaKK} KK / Jiwa &bull; {d.totalLuasHa} Ha</div>
                            <div><strong className="text-slate-400">Rata-rata Menempati:</strong> {d.rataLamaMenempatiTahun} Tahun</div>
                            <div><strong className="text-slate-400">Dominan:</strong> {d.caraMendapatkanDominan}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="rumahTinggal" name="Rumah" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="pondokGubuk" name="Gubuk" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="kebunGarapan" name="Kebun" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="kerambaBagan" name="Keramba" stackId="a" fill="#f59e0b" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 3 */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: Data Penghuni Penggarap dan Nelayan Liar (persemester)
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 2 - KARTU 4: PENINDAKAN KAWASAN (TAB)                     */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Tab di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Penindakan Kawasan
                </h2>
                {/* 2 Tab Kecil di Bawah Judul */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button
                    onClick={() => setTab4('aset')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab4 === 'aset'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Aset &amp; Objek Vital
                  </button>
                  <button
                    onClick={() => setTab4('hutan')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab4 === 'hutan'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Lingkungan &amp; Hutan
                  </button>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {summaryCard4.totalLuas2026} Ha
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  Ditindak Tahun 2026 ({tab4 === 'aset' ? 'Aset & Obvit' : 'Hutan Lindung'})
                </div>
              </div>
            </div>

            {/* Filter Tahun */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun4}
                onChange={(e) => setFilterTahun4(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
              <span className="text-[10.5px] text-slate-500 font-mono">
                Satuan: Luas (Hektar / Ha)
              </span>
            </div>

            {/* Visualisasi: Clustered Column Luas (Ha) per Kegiatan */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataCard4} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 10.5 }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as PenindakanKawasanItem;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 max-w-xs font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.period} &bull; Total {d.totalLuasHa} Ha Ditindak
                          </div>
                          <div className="space-y-0.5 text-[11px] font-mono">
                            <div className="flex justify-between">
                              <span>{d.kegiatan1Nama}:</span>
                              <strong className="text-white">{d.kegiatan1LuasHa} Ha</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>{d.kegiatan2Nama}:</span>
                              <strong className="text-sky-300">{d.kegiatan2LuasHa} Ha</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>{d.kegiatan3Nama}:</span>
                              <strong className="text-amber-300">{d.kegiatan3LuasHa} Ha</strong>
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                            <div><strong className="text-slate-400">Lokasi:</strong> {d.namaKawasan}</div>
                            <div><strong className="text-emerald-400">Status:</strong> {d.keterangan}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="kegiatan1LuasHa"
                    name={tab4 === 'aset' ? 'Penyerobotan HPL' : 'Perambahan Hutan'}
                    fill="#2563eb"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="kegiatan2LuasHa"
                    name={tab4 === 'aset' ? 'Bangli Obvit' : 'Tambang Pasir/Galian C'}
                    fill="#38bdf8"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="kegiatan3LuasHa"
                    name={tab4 === 'aset' ? 'Lahan Tanpa SPJ' : 'Illegal Logging'}
                    fill={tab4 === 'aset' ? '#94a3b8' : '#f59e0b'}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 4: Dinamis mengikuti Tab Aktif */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Tertutup
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: {tab4 === 'aset'
                ? 'Data Penindakan Kawasan Aset dan Objek Vital (persemester)'
                : 'Data Penindakan Kawasan Lingkungan dan Hutan (persemester)'}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 3 - KARTU 5: KEJADIAN BENCANA ALAM DAN MITIGASI (TAB)     */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Tab di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Kejadian Bencana Alam dan Mitigasi
                </h2>
                {/* 2 Tab Kecil di Bawah Judul */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button
                    onClick={() => setTab5('bencana')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab5 === 'bencana'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Kejadian Bencana Alam
                  </button>
                  <button
                    onClick={() => setTab5('mitigasi')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab5 === 'mitigasi'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Mitigasi, Rescue &amp; Sosialisasi
                  </button>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {summaryCard5.totalJumlah} {tab5 === 'bencana' ? 'Kejadian' : 'Kegiatan'}
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  {tab5 === 'bencana' ? (
                    <span>{summaryCard5.totalKorban} Korban Terdampak &bull; {formatRupiahShort(summaryCard5.totalKerugian)}</span>
                  ) : (
                    <span>3.420 Warga Diedukasi &bull; 0 Korban Jiwa</span>
                  )}
                </div>
              </div>
            </div>

            {/* Filter: Tahun */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun5}
                onChange={(e) => setFilterTahun5(Number(e.target.value))}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value={2026}>Tahun 2026</option>
                <option value={2025}>Tahun 2025</option>
              </select>
            </div>

            {/* Visualisasi: Horizontal Bar */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard5}
                  layout="vertical"
                  margin={{ top: 5, right: 15, left: 35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <YAxis
                    dataKey="jenis"
                    type="category"
                    tick={{ fontSize: 9.5 }}
                    width={130}
                    stroke="#64748b"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as KejadianBencanaMitigasiItem;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 max-w-xs font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.jenis} &bull; {d.jumlah} Insiden/Giat
                          </div>
                          <div className="space-y-0.5 text-[11px]">
                            <div><strong className="text-slate-400">Lokasi:</strong> {d.lokasi}</div>
                            <div><strong className="text-slate-400">Personil Ditpam:</strong> {d.personil} Orang</div>
                            <div><strong className="text-slate-400">Korban:</strong> {d.korban} Orang</div>
                            {d.kerugianRp > 0 && (
                              <div><strong className="text-amber-400">Estimasi Kerugian:</strong> {formatRupiahShort(d.kerugianRp)}</div>
                            )}
                            <div><strong className="text-slate-400">Durasi / Respons:</strong> {d.waktuMulaiAkhir}</div>
                            <div className="text-emerald-400"><strong className="text-slate-300">Hasil:</strong> {d.keterangan}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="jumlah"
                    name={tab5 === 'bencana' ? 'Jumlah Kejadian' : 'Jumlah Kegiatan'}
                    fill="#2563eb"
                    radius={[0, 3, 3, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 5: Dinamis mengikuti Tab Aktif */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: {tab5 === 'bencana'
                ? 'Rekapitulasi Kejadian Bencana Alam (persemester)'
                : 'Rekap Kegiatan Mitigasi Rescue dan Sosialisasi Direktorat Pengamanan (persemester)'}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 3 - KARTU 6: PENGAMANAN UNJUK RASA                         */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Pengamanan Unjuk Rasa
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb] inline-block" />
                    <span>Jumlah Aksi (Batang Kiri)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <span className="w-2.5 h-0.5 bg-[#10b981] inline-block" />
                    <span>Personil Dikerahkan (Garis Kanan)</span>
                  </div>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {summaryCard6.totalAksi2026} Aksi
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  {formatNumber(summaryCard6.totalPersonil2026)} Personil Dikerahkan (2026)
                </div>
              </div>
            </div>

            {/* Filter: Tahun */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun6}
                onChange={(e) => setFilterTahun6(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
            </div>

            {/* Visualisasi: ComposedChart (Column Aksi + Garis Personil) */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dataCard6} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 10.5 }} stroke="#64748b" />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 9.5, fontFamily: 'monospace' }}
                    stroke="#10b981"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as PengamananUnjukRasaItem;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 max-w-xs font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.period} &bull; {d.jumlahAksi} Aksi Unjuk Rasa
                          </div>
                          <div className="flex justify-between text-[11px] font-mono">
                            <span>Personil Ditpam:</span>
                            <span className="font-bold text-emerald-400">{d.personilDikerahkan} Personil</span>
                          </div>
                          <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                            <div><strong className="text-slate-400">Aliansi:</strong> {d.aliansiMasyarakat}</div>
                            <div><strong className="text-slate-400">Tuntutan:</strong> {d.permasalahanUtama}</div>
                            <div><strong className="text-slate-400">Lokasi:</strong> {d.lokasiAksi}</div>
                            <div><strong className="text-emerald-300">Hasil:</strong> {d.keterangan}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar yAxisId="left" dataKey="jumlahAksi" name="Jumlah Aksi" fill="#2563eb" radius={[3, 3, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="personilDikerahkan"
                    name="Personil Dikerahkan"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#10b981' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 6 */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: Rekap Pengamanan Unjuk Rasa (persemester)
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 4 - KARTU 7: PERSONIL PENGAMANAN (TAB)                    */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Tab di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Personil Pengamanan
                </h2>
                {/* 2 Tab Kecil di Bawah Judul */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button
                    onClick={() => setTab7('distribusi')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab7 === 'distribusi'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Distribusi Personil
                  </button>
                  <button
                    onClick={() => setTab7('sertifikasi')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab7 === 'sertifikasi'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Sertifikasi Khusus
                  </button>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {tab7 === 'distribusi'
                    ? `${formatNumber(summaryCard7.totalAll)} Personil`
                    : `${formatNumber(summaryCard7.totalAll)} Sertifikat`}
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  {summaryCard7.totalPns} PNS &bull; {summaryCard7.totalP3k} P3K &bull; {summaryCard7.totalKontrak} Ditpam
                </div>
              </div>
            </div>

            {/* Filter: Status Pegawai */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterStatus7}
                onChange={(e) => setFilterStatus7(e.target.value)}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value="all">Semua Status Pegawai</option>
                <option value="pns">PNS Sahaja</option>
                <option value="p3k">P3K Sahaja</option>
                <option value="kontrak">Tenaga Kontrak Ditpam</option>
              </select>
            </div>

            {/* Visualisasi: Horizontal Stacked Bar */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataCard7}
                  layout="vertical"
                  margin={{ top: 5, right: 15, left: 35, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                  <YAxis
                    dataKey="penempatanAtauSertifikasi"
                    type="category"
                    tick={{ fontSize: 9 }}
                    width={130}
                    stroke="#64748b"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0].payload as PersonilPengamananItem;
                      return (
                        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 font-sans">
                          <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                            {d.penempatanAtauSertifikasi}
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 text-[11px] font-mono">
                            <span>PNS:</span>
                            <span className="text-right font-bold text-white">{d.pns}</span>
                            <span>P3K:</span>
                            <span className="text-right font-bold text-sky-300">{d.p3k}</span>
                            <span>Tenaga Ditpam:</span>
                            <span className="text-right font-bold text-slate-300">{d.kontrakDitpam}</span>
                            <span className="border-t border-slate-700 text-sky-300">Total:</span>
                            <span className="border-t border-slate-700 font-bold text-emerald-400 text-right">
                              {d.total} Personil
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                            <div><strong className="text-slate-400">Subdit / Lembaga:</strong> {d.subditAtauPenerbit}</div>
                            <div><strong className="text-slate-400">Keterangan:</strong> {d.keteranganTambahan}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="pns" name="PNS" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="p3k" name="P3K" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="kontrakDitpam" name="Kontrak Ditpam" stackId="a" fill="#94a3b8" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 7: Dinamis mengikuti Tab Aktif */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Terbuka
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: {tab7 === 'distribusi'
                ? 'Rekap Distribusi Personil Pengamanan (persemester)'
                : 'Data Personil Bersertifikasi Khusus (persemester)'}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BARIS 4 - KARTU 8: PROTEKSI KEBAKARAN & KEGIATAN SUBDIT (TAB)   */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Tab di kiri atas, Ringkasan di kanan atas */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Proteksi Kebakaran dan Kegiatan Pengamanan
                </h2>
                {/* 2 Tab Kecil di Bawah Judul */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button
                    onClick={() => setTab8('proteksi')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab8 === 'proteksi'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Pengecekan Proteksi Damkar
                  </button>
                  <button
                    onClick={() => setTab8('kegiatan')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      tab8 === 'kegiatan'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Kegiatan Pengamanan per Subdit
                  </button>
                </div>
              </div>

              {/* Angka Ringkasan Besar */}
              <div className="text-right shrink-0">
                <div className="text-lg sm:text-xl font-black text-slate-900 font-mono tracking-tight">
                  {summaryCard8.primaryVal}
                </div>
                <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                  {summaryCard8.secondaryText}
                </div>
              </div>
            </div>

            {/* Filter Tahun */}
            <div className="flex items-center gap-2 mb-2 pb-1 text-xs">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={filterTahun8}
                onChange={(e) => setFilterTahun8(Number(e.target.value))}
                className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium text-[11px] cursor-pointer"
              >
                <option value={2026}>Tahun 2026</option>
                <option value={2025}>Tahun 2025</option>
              </select>
            </div>

            {/* Visualisasi: Horizontal Bar */}
            <div className="h-60 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                {tab8 === 'proteksi' ? (
                  <BarChart
                    data={dataProteksi}
                    layout="vertical"
                    margin={{ top: 5, right: 15, left: 35, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                    <YAxis
                      dataKey="jenisBangunan"
                      type="category"
                      tick={{ fontSize: 9 }}
                      width={130}
                      stroke="#64748b"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d = payload[0].payload as ProteksiKebakaranItem;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 font-sans">
                            <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                              {d.jenisBangunan}
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 text-[11px] font-mono">
                              <span>APAR:</span>
                              <span className="text-right font-bold text-white">{d.apar} Unit</span>
                              <span>Hidran:</span>
                              <span className="text-right font-bold text-sky-300">{d.hidran} Titik</span>
                              <span>Sprinkler:</span>
                              <span className="text-right font-bold text-emerald-400">{d.sprinkler} Head</span>
                              <span>Detektor Asap:</span>
                              <span className="text-right font-bold text-slate-300">{d.detektorAsap} Sensor</span>
                              <span className="border-t border-slate-700 text-sky-300">Total Alat:</span>
                              <span className="border-t border-slate-700 font-bold text-emerald-400 text-right">
                                {d.totalAlat} Unit
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                              <div><strong className="text-slate-400">Rekomendasi:</strong> {d.rekomendasi}</div>
                              <div><strong className="text-slate-400">Periode:</strong> {d.periodeInspeksi}</div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="apar" name="APAR" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="hidran" name="Hidran" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="sprinkler" name="Sprinkler" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="detektorAsap" name="Detektor Asap" stackId="a" fill="#94a3b8" radius={[0, 3, 3, 0]} />
                  </BarChart>
                ) : (
                  <BarChart
                    data={dataSubdit}
                    layout="vertical"
                    margin={{ top: 5, right: 15, left: 35, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#64748b" />
                    <YAxis
                      dataKey="subdit"
                      type="category"
                      tick={{ fontSize: 9 }}
                      width={130}
                      stroke="#64748b"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;
                        const d = payload[0].payload as KegiatanSubditItem;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg space-y-1 font-sans">
                            <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                              {d.subdit}
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 text-[11px] font-mono">
                              <span>Patroli Rutin:</span>
                              <span className="text-right font-bold text-white">{d.patroliRutin} Giat</span>
                              <span>Razia Gabungan:</span>
                              <span className="text-right font-bold text-amber-400">{d.raziaGabungan} Giat</span>
                              <span>Pengawalan VVIP:</span>
                              <span className="text-right font-bold text-sky-300">{d.pengawalanVvip} Giat</span>
                              <span>Pengamanan Event:</span>
                              <span className="text-right font-bold text-emerald-400">{d.pengamananEvent} Giat</span>
                              <span className="border-t border-slate-700 text-sky-300">Total Kegiatan:</span>
                              <span className="border-t border-slate-700 font-bold text-emerald-400 text-right">
                                {d.totalKegiatan} Giat
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800 space-y-0.5">
                              <div><strong className="text-slate-400">Sasaran:</strong> {d.lokasiSasaran}</div>
                              <div><strong className="text-slate-400">Personil:</strong> {d.personilTerlibat} Orang</div>
                              <div><strong className="text-emerald-300">Temuan:</strong> {d.hasilTemuan}</div>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="patroliRutin" name="Patroli Rutin" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="raziaGabungan" name="Razia Gabungan" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="pengawalanVvip" name="Pengawalan VVIP" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="pengamananEvent" name="Pengamanan Event" stackId="a" fill="#10b981" radius={[0, 3, 3, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Kartu 8: Dinamis mengikuti Tab Aktif */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Tertutup
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Sumber: {tab8 === 'proteksi'
                ? 'Rekap Pengecekan Proteksi Pemadam Kebakaran (persemester)'
                : 'Kegiatan dalam Rangka Pengamanan Lingkungan, Hutan, Aset dan Objek Vital (persemester)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
