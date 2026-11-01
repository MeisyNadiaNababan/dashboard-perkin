import React, { useState, useMemo } from 'react';
import {
  HardHat,
  TrendingUp,
  FileText,
  DollarSign,
  AlertCircle,
  Mountain,
  Route,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronDown,
  Info,
} from 'lucide-react';
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
  ReferenceLine,
  ComposedChart,
  Line,
  Treemap,
} from 'recharts';
import {
  PEMBANGUNAN_INFRASTRUKTUR_MASTER_DATA,
  PaketPekerjaanItem,
} from './pembangunanInfrastrukturVisualData';

interface PembangunanInfrastrukturVisualSuiteProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// Format Rupiah (Juta)
const formatRupiahJuta = (val: number): string => {
  return `Rp ${val.toLocaleString('id-ID')} Jt`;
};

// Custom Badge Komponen Terbatas / Terbuka
const SifatDataBadge: React.FC<{ jenis: 'Terbatas' | 'Terbuka' }> = ({ jenis }) => {
  if (jenis === 'Terbatas') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-amber-50 text-amber-800 border border-amber-300/80">
        Terbatas
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-300/80">
      Terbuka
    </span>
  );
};

// Palet Warna Subdirektorat untuk Treemap & Chart
const SUBDIT_COLORS: Record<string, string> = {
  'Pembangunan Jalan dan Jembatan': '#1D4ED8', // Royal Blue
  'Pembangunan Drainase': '#0284C7', // Light Cyan/Blue
  'Pembangunan Gedung': '#4338CA', // Indigo
  'Pematangan Tanah': '#2563EB', // Blue
};

export const PembangunanInfrastrukturVisualSuite: React.FC<
  PembangunanInfrastrukturVisualSuiteProps
> = () => {
  const masterData = PEMBANGUNAN_INFRASTRUKTUR_MASTER_DATA;

  // -------------------------------------------------------------
  // FILTER STATE - GRAFIK 1 (Progres Fisik per Paket Pekerjaan)
  // -------------------------------------------------------------
  const [filterBulanG1, setFilterBulanG1] = useState<string>('Semua');
  const [filterSubditG1, setFilterSubditG1] = useState<string>('Semua');
  const [filterKategoriG1, setFilterKategoriG1] = useState<string>('Semua');

  // -------------------------------------------------------------
  // FILTER STATE - TABEL PAKET PEKERJAAN (GRAFIK 7)
  // -------------------------------------------------------------
  const [tableSearch, setTableSearch] = useState<string>('');
  const [tableSortBy, setTableSortBy] = useState<'progres-asc' | 'progres-desc' | 'nama' | 'kontrak-desc'>('progres-asc');

  // -------------------------------------------------------------
  // FILTER STATE - GRAFIK 9 (Jaringan Jalan)
  // -------------------------------------------------------------
  const [filterWilayahG9, setFilterWilayahG9] = useState<string>('Semua Wilayah');

  // =============================================================
  // 1. DATASET GRAFIK 1: 15 PAKET PROGRES TERENDAH
  // =============================================================
  const filteredPaketG1 = useMemo(() => {
    let list = [...masterData.paketPekerjaan];

    if (filterBulanG1 !== 'Semua') {
      list = list.filter((p) => p.bulan === filterBulanG1);
    }
    if (filterSubditG1 !== 'Semua') {
      list = list.filter((p) => p.subdirektorat === filterSubditG1);
    }
    if (filterKategoriG1 !== 'Semua') {
      list = list.filter((p) => p.kategoriPekerjaan === filterKategoriG1);
    }

    // Urutkan dari progres terendah ke tertinggi, ambil maksimal 15 paket
    return list
      .sort((a, b) => a.progresPersen - b.progresPersen)
      .slice(0, 15)
      .map((p) => ({
        ...p,
        // Short label for Y-axis (max 28 chars)
        shortName: p.namaPaket.length > 28 ? `${p.namaPaket.substring(0, 26)}...` : p.namaPaket,
        isUnder50: p.progresPersen < 50,
      }));
  }, [masterData.paketPekerjaan, filterBulanG1, filterSubditG1, filterKategoriG1]);

  // =============================================================
  // 2. DATASET GRAFIK 2: RATA-RATA PROGRES PER SUBDIREKTORAT
  // =============================================================
  const rataRataSubditData = useMemo(() => {
    const subditMap: Record<string, { totalProgres: number; count: number }> = {
      'Pembangunan Jalan dan Jembatan': { totalProgres: 0, count: 0 },
      'Pembangunan Drainase': { totalProgres: 0, count: 0 },
      'Pembangunan Gedung': { totalProgres: 0, count: 0 },
      'Pematangan Tanah': { totalProgres: 0, count: 0 },
    };

    masterData.paketPekerjaan.forEach((p) => {
      if (subditMap[p.subdirektorat]) {
        subditMap[p.subdirektorat].totalProgres += p.progresPersen;
        subditMap[p.subdirektorat].count += 1;
      }
    });

    return Object.entries(subditMap).map(([subdit, stat]) => ({
      subdirektorat: subdit,
      shortSubdit:
        subdit === 'Pembangunan Jalan dan Jembatan'
          ? 'Jalan & Jembatan'
          : subdit === 'Pembangunan Drainase'
          ? 'Drainase'
          : subdit === 'Pembangunan Gedung'
          ? 'Gedung'
          : 'Pematangan Tanah',
      rataRataProgres: stat.count > 0 ? parseFloat((stat.totalProgres / stat.count).toFixed(2)) : 0,
      jumlahPaket: stat.count,
    }));
  }, [masterData.paketPekerjaan]);

  // =============================================================
  // 3. DATASET GRAFIK 3: JUMLAH PAKET PER KATEGORI & JENIS PEKERJAAN (STACKED COLUMN)
  // =============================================================
  const kategoriJenisData = useMemo(() => {
    const categories: Record<string, Record<string, number>> = {
      'Konektivitas & Transportasi': {},
      'Pengendalian Banjir': {},
      'Fasilitas Publik & Gedung': {},
      'Pengembangan Kawasan Industri': {},
    };

    masterData.paketPekerjaan.forEach((p) => {
      const kat = p.kategoriPekerjaan;
      const jenis = p.jenisPekerjaan;
      if (!categories[kat]) {
        categories[kat] = {};
      }
      categories[kat][jenis] = (categories[kat][jenis] || 0) + 1;
    });

    return [
      {
        kategori: 'Konektivitas & Transportasi',
        'Pelebaran Jalan': categories['Konektivitas & Transportasi']['Pelebaran Jalan'] || 0,
        'Flyover & Jembatan': categories['Konektivitas & Transportasi']['Flyover & Jembatan'] || 0,
        total: (categories['Konektivitas & Transportasi']['Pelebaran Jalan'] || 0) + (categories['Konektivitas & Transportasi']['Flyover & Jembatan'] || 0),
      },
      {
        kategori: 'Pengendalian Banjir',
        'Saluran Drainase Primer': categories['Pengendalian Banjir']['Saluran Drainase Primer'] || 0,
        'Kolam Retensi': categories['Pengendalian Banjir']['Kolam Retensi'] || 0,
        total: (categories['Pengendalian Banjir']['Saluran Drainase Primer'] || 0) + (categories['Pengendalian Banjir']['Kolam Retensi'] || 0),
      },
      {
        kategori: 'Fasilitas Publik & Gedung',
        'Gedung Kantor / Arsip': categories['Fasilitas Publik & Gedung']['Gedung Kantor / Arsip'] || 0,
        'Gedung Layanan Publik': categories['Fasilitas Publik & Gedung']['Gedung Layanan Publik'] || 0,
        total: (categories['Fasilitas Publik & Gedung']['Gedung Kantor / Arsip'] || 0) + (categories['Fasilitas Publik & Gedung']['Gedung Layanan Publik'] || 0),
      },
      {
        kategori: 'Pengembangan Kawasan Industri',
        'Cut and Fill BSW': categories['Pengembangan Kawasan Industri']['Cut and Fill BSW'] || 0,
        'Pematangan Lahan': categories['Pengembangan Kawasan Industri']['Pematangan Lahan'] || 0,
        total: (categories['Pengembangan Kawasan Industri']['Cut and Fill BSW'] || 0) + (categories['Pengembangan Kawasan Industri']['Pematangan Lahan'] || 0),
      },
    ];
  }, [masterData.paketPekerjaan]);

  // =============================================================
  // 4. DATASET GRAFIK 4: PAGU VS HPS VS NILAI KONTRAK (10 TERATAS MENURUT PAGU)
  // =============================================================
  const paguHpsKontrakTop10 = useMemo(() => {
    return [...masterData.paketPekerjaan]
      .sort((a, b) => b.nilaiPagu - a.nilaiPagu)
      .slice(0, 10)
      .map((p) => ({
        ...p,
        shortPaket: p.namaPaket.length > 22 ? `${p.namaPaket.substring(0, 20)}...` : p.namaPaket,
      }));
  }, [masterData.paketPekerjaan]);

  // =============================================================
  // 5. DATASET GRAFIK 5: EFISIENSI KONTRAK TERHADAP PAGU (%)
  // =============================================================
  const efisiensiKontrakData = useMemo(() => {
    return [...masterData.paketPekerjaan]
      .map((p) => {
        const rasioPersen = parseFloat(((p.nilaiKontrak / p.nilaiPagu) * 100).toFixed(2));
        const penghematanJuta = p.nilaiPagu - p.nilaiKontrak;
        return {
          ...p,
          shortName: p.namaPaket.length > 26 ? `${p.namaPaket.substring(0, 24)}...` : p.namaPaket,
          rasioPersen,
          penghematanJuta,
          isAbove95: rasioPersen > 95.0,
        };
      })
      .sort((a, b) => a.rasioPersen - b.rasioPersen);
  }, [masterData.paketPekerjaan]);

  // =============================================================
  // 6. DATASET GRAFIK 6: KENDALA PEKERJAAN PALING SERING (TREEMAP)
  // =============================================================
  const kendalaTreemapData = useMemo(() => {
    const kendalaOrder: Array<PaketPekerjaanItem['jenisKendala']> = [
      'Tidak Ada Kendala',
      'Cuaca',
      'Perizinan',
      'Utilitas Eksisting',
      'Pembebasan Lahan',
      'Ketersediaan Material',
    ];

    return kendalaOrder.map((kendala) => {
      const matchingPackets = masterData.paketPekerjaan.filter((p) => p.jenisKendala === kendala);
      // Group by subdirektorat
      const subditCounts: Record<string, number> = {};
      matchingPackets.forEach((p) => {
        subditCounts[p.subdirektorat] = (subditCounts[p.subdirektorat] || 0) + 1;
      });

      return {
        name: kendala,
        value: matchingPackets.length,
        subditCounts,
        paketList: matchingPackets.map((p) => p.namaPaket),
      };
    });
  }, [masterData.paketPekerjaan]);

  // =============================================================
  // 7. DATASET TABEL PAKET PEKERJAAN DENGAN PENCARIAN & SORTING
  // =============================================================
  const filteredTableData = useMemo(() => {
    let list = [...masterData.paketPekerjaan];

    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.namaPaket.toLowerCase().includes(q) ||
          p.kontraktor.toLowerCase().includes(q) ||
          p.supervisi.toLowerCase().includes(q) ||
          p.subdirektorat.toLowerCase().includes(q) ||
          p.jenisKendala.toLowerCase().includes(q) ||
          p.kendalaDetail.toLowerCase().includes(q)
      );
    }

    if (tableSortBy === 'progres-asc') {
      list.sort((a, b) => a.progresPersen - b.progresPersen);
    } else if (tableSortBy === 'progres-desc') {
      list.sort((a, b) => b.progresPersen - a.progresPersen);
    } else if (tableSortBy === 'nama') {
      list.sort((a, b) => a.namaPaket.localeCompare(b.namaPaket));
    } else if (tableSortBy === 'kontrak-desc') {
      list.sort((a, b) => b.nilaiKontrak - a.nilaiKontrak);
    }

    return list;
  }, [masterData.paketPekerjaan, tableSearch, tableSortBy]);

  // =============================================================
  // 9. DATASET GRAFIK 9: PANJANG JALAN PER KELAS & MATERIAL
  // =============================================================
  const jalanKelasMaterialData = useMemo(() => {
    const classes: Record<string, { aspal: number; beton: number; paving: number; tanahKerikil: number }> = {
      Arteri: { aspal: 0, beton: 0, paving: 0, tanahKerikil: 0 },
      Kolektor: { aspal: 0, beton: 0, paving: 0, tanahKerikil: 0 },
      Lokal: { aspal: 0, beton: 0, paving: 0, tanahKerikil: 0 },
      Lingkungan: { aspal: 0, beton: 0, paving: 0, tanahKerikil: 0 },
    };

    masterData.jaringanJalanData
      .filter((item) => filterWilayahG9 === 'Semua Wilayah' || item.wilayah === filterWilayahG9)
      .forEach((item) => {
        if (classes[item.kelasJalan]) {
          classes[item.kelasJalan].aspal += item.aspalKm;
          classes[item.kelasJalan].beton += item.betonKm;
          classes[item.kelasJalan].paving += item.pavingKm;
          classes[item.kelasJalan].tanahKerikil += item.tanahKerikilKm;
        }
      });

    return (['Arteri', 'Kolektor', 'Lokal', 'Lingkungan'] as const).map((kelas) => ({
      kelasJalan: `Jalan ${kelas}`,
      Aspal: parseFloat(classes[kelas].aspal.toFixed(1)),
      Beton: parseFloat(classes[kelas].beton.toFixed(1)),
      Paving: parseFloat(classes[kelas].paving.toFixed(1)),
      'Tanah / Kerikil': parseFloat(classes[kelas].tanahKerikil.toFixed(1)),
      totalKm: parseFloat(
        (
          classes[kelas].aspal +
          classes[kelas].beton +
          classes[kelas].paving +
          classes[kelas].tanahKerikil
        ).toFixed(1)
      ),
    }));
  }, [masterData.jaringanJalanData, filterWilayahG9]);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* ========================================================================= */}
      {/* SECTION A. PROGRES PEKERJAAN KONSTRUKSI                                  */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-600 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                A. PROGRES PEKERJAAN KONSTRUKSI
              </h2>
              <p className="text-xs text-slate-500">
                Monitoring pelaksanaan fisik, capaian subdirektorat, dan segmentasi kategori pekerjaan tahun berjalan.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Laporan Progres Fisik Bulanan
          </span>
        </div>

        {/* GRAFIK 1: Progres Fisik per Paket Pekerjaan */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  1. Progres Fisik per Paket Pekerjaan (15 Paket Terendah)
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Bar horizontal diurutkan dari progres terendah. Paket dengan progres di bawah 50% diberi warna aksen amber/merah.
              </p>
            </div>

            {/* Filter: Bulan, Subdirektorat, Kategori Pekerjaan */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                <span className="text-slate-500 text-[10px] font-medium">Bulan:</span>
                <select
                  aria-label="Filter Bulan Progres"
                  value={filterBulanG1}
                  onChange={(e) => setFilterBulanG1(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 text-xs outline-none cursor-pointer"
                >
                  <option value="Semua">Semua Bulan</option>
                  <option value="Januari">Januari</option>
                  <option value="Februari">Februari</option>
                  <option value="Maret">Maret</option>
                  <option value="April">April (Aktif)</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                <span className="text-slate-500 text-[10px] font-medium">Subdit:</span>
                <select
                  aria-label="Filter Subdirektorat"
                  value={filterSubditG1}
                  onChange={(e) => setFilterSubditG1(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 text-xs outline-none cursor-pointer max-w-[140px] truncate"
                >
                  <option value="Semua">Semua Subdirektorat</option>
                  <option value="Pembangunan Jalan dan Jembatan">Jalan & Jembatan</option>
                  <option value="Pembangunan Drainase">Drainase</option>
                  <option value="Pembangunan Gedung">Gedung</option>
                  <option value="Pematangan Tanah">Pematangan Tanah</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                <span className="text-slate-500 text-[10px] font-medium">Kategori:</span>
                <select
                  aria-label="Filter Kategori Pekerjaan"
                  value={filterKategoriG1}
                  onChange={(e) => setFilterKategoriG1(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 text-xs outline-none cursor-pointer max-w-[140px] truncate"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Konektivitas & Transportasi">Konektivitas</option>
                  <option value="Pengendalian Banjir">Pengendalian Banjir</option>
                  <option value="Fasilitas Publik & Gedung">Fasilitas Publik</option>
                  <option value="Pengembangan Kawasan Industri">Kawasan Industri</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chart 1 Container */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredPaketG1}
                layout="vertical"
                margin={{ top: 8, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#E2E8F0" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="shortName"
                  width={180}
                  tick={{ fontSize: 10, fill: '#334155', fontWeight: 500 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as (typeof filteredPaketG1)[0];
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs space-y-1.5 max-w-sm">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                            {data.namaPaket}
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                            <span className="text-slate-500">Kontraktor:</span>
                            <span className="font-semibold text-slate-800">{data.kontraktor}</span>
                            <span className="text-slate-500">Supervisi:</span>
                            <span className="font-semibold text-slate-800">{data.supervisi}</span>
                            <span className="text-slate-500">Tanggal Mulai:</span>
                            <span className="text-slate-700">{data.tanggalMulai}</span>
                            <span className="text-slate-500">Tanggal Selesai:</span>
                            <span className="text-slate-700">{data.tanggalSelesai}</span>
                            <span className="text-slate-500">Subdirektorat:</span>
                            <span className="text-slate-700">{data.subdirektorat}</span>
                            <span className="text-slate-500">Progres Pekerjaan:</span>
                            <span className={`font-black ${data.isUnder50 ? 'text-amber-600' : 'text-blue-600'}`}>
                              {data.progresPersen}% {data.isUnder50 ? '(Perlu Akselerasi < 50%)' : ''}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="progresPersen" name="Progres Fisik" radius={[0, 4, 4, 0]}>
                  {filteredPaketG1.map((entry, index) => (
                    <Cell
                      key={`cell-g1-${index}`}
                      fill={entry.isUnder50 ? '#EA580C' : '#2563EB'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-600 rounded-sm"></span>
                <span>Progres &ge; 50%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-600 rounded-sm"></span>
                <span>Progres &lt; 50% (Warna Aksen Pengawasan Khusus)</span>
              </span>
            </div>
            <span>Dataset: Laporan Progres Pekerjaan Konstruksi Tahun Berjalan</span>
          </div>
        </div>

        {/* DUA GRAFIK SUBDIREKTORAT & KATEGORI (GRID 2 KOLOM) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* GRAFIK 2: Rata-rata Progres per Subdirektorat */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  2. Rata-Rata Progres per Subdirektorat
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Column chart komparasi rata-rata capaian fisik antar 4 Subdirektorat teknis.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rataRataSubditData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="shortSubdit"
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      interval={0}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: '#64748B' }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs">
                              <p className="font-bold text-slate-900">{item.subdirektorat}</p>
                              <p className="text-slate-600 mt-1">
                                Rata-rata Progres: <span className="font-bold text-blue-600">{item.rataRataProgres}%</span>
                              </p>
                              <p className="text-slate-500 text-[11px]">
                                Total Paket Aktif: <span className="font-semibold">{item.jumlahPaket} Paket</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="rataRataProgres" name="Rata-rata Progres (%)" fill="#2563EB" radius={[4, 4, 0, 0]}>
                      {rataRataSubditData.map((entry, index) => (
                        <Cell
                          key={`cell-g2-${index}`}
                          fill={SUBDIT_COLORS[entry.subdirektorat] || '#2563EB'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu Y: Rata-rata Progres Pekerjaan (%)</span>
              <span>Dataset: Laporan Progres Pekerjaan</span>
            </div>
          </div>

          {/* GRAFIK 3: Jumlah Paket per Kategori dan Jenis Pekerjaan (Stacked Column) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  3. Jumlah Paket per Kategori dan Jenis Pekerjaan
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Stacked column chart distribusi portofolio jenis pekerjaan di setiap kategori pembangunan.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kategoriJenisData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="kategori"
                      tick={{ fontSize: 9.5, fill: '#334155' }}
                      angle={-10}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">{label}</p>
                              {payload.map((entry, idx) => (
                                <div key={idx} className="flex justify-between gap-3 text-[11px]">
                                  <span style={{ color: entry.color }} className="font-medium">
                                    {entry.name}:
                                  </span>
                                  <span className="font-bold text-slate-800">{entry.value} Paket</span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }} />
                    {/* Segmen Jenis Pekerjaan */}
                    <Bar dataKey="Pelebaran Jalan" stackId="a" fill="#1E40AF" />
                    <Bar dataKey="Flyover & Jembatan" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Saluran Drainase Primer" stackId="a" fill="#0284C7" />
                    <Bar dataKey="Kolam Retensi" stackId="a" fill="#0EA5E9" />
                    <Bar dataKey="Gedung Kantor / Arsip" stackId="a" fill="#4338CA" />
                    <Bar dataKey="Gedung Layanan Publik" stackId="a" fill="#6366F1" />
                    <Bar dataKey="Cut and Fill BSW" stackId="a" fill="#2563EB" />
                    <Bar dataKey="Pematangan Lahan" stackId="a" fill="#93C5FD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu Y: Jumlah Paket Konstruksi</span>
              <span>Dataset: Laporan Progres Pekerjaan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B. ANGGARAN DAN KONTRAK                                           */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-700 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                B. ANGGARAN DAN KONTRAK
              </h2>
              <p className="text-xs text-slate-500">
                Analisis perbandingan Pagu vs HPS vs Kontrak serta efisiensi pengadaan pada 10 paket terbesar.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Mata Uang: Juta Rupiah
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* GRAFIK 4: Pagu vs HPS vs Nilai Kontrak (10 Teratas menurut Pagu) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  4. Pagu vs HPS vs Nilai Kontrak (10 Teratas Menurut Pagu)
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Clustered bar chart membandingkan Nilai Pagu, Nilai HPS, dan Nilai Kontrak (dalam Juta Rupiah).
              </p>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={paguHpsKontrakTop10}
                    margin={{ top: 10, right: 10, left: 10, bottom: 45 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="shortPaket"
                      tick={{ fontSize: 9, fill: '#334155' }}
                      angle={-25}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      tick={{ fontSize: 9.5, fill: '#64748B' }}
                      tickFormatter={(val) => `Rp ${(val / 1000).toFixed(0)} M`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as (typeof paguHpsKontrakTop10)[0];
                          const hematHps = item.nilaiHps - item.nilaiKontrak;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs space-y-1.5 max-w-xs">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.namaPaket}
                              </p>
                              <div className="space-y-1 text-[11px]">
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Nilai Pagu:</span>
                                  <span className="font-semibold text-slate-900">{formatRupiahJuta(item.nilaiPagu)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Nilai HPS:</span>
                                  <span className="font-semibold text-blue-700">{formatRupiahJuta(item.nilaiHps)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-500">Nilai Kontrak:</span>
                                  <span className="font-bold text-emerald-700">{formatRupiahJuta(item.nilaiKontrak)}</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-100 pt-1 text-slate-600">
                                  <span>Efisiensi terhadap HPS:</span>
                                  <span className="font-bold text-emerald-600">{formatRupiahJuta(hematHps)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="nilaiPagu" name="Nilai Pagu" fill="#1E3A8A" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="nilaiHps" name="Nilai HPS" fill="#3B82F6" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="nilaiKontrak" name="Nilai Kontrak" fill="#60A5FA" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Paket Pekerjaan &bull; Sumbu Y: Nilai (Juta Rupiah)</span>
              <span>Dataset: Laporan Progres Pekerjaan</span>
            </div>
          </div>

          {/* GRAFIK 5: Efisiensi Kontrak terhadap Pagu (%) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  5. Efisiensi Kontrak terhadap Pagu (%)
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Bar horizontal dengan garis acuan 100%. Rasio di atas 95% diberi warna aksen oranye.
              </p>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={efisiensiKontrakData.slice(0, 12)}
                    layout="vertical"
                    margin={{ top: 8, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#E2E8F0" />
                    <XAxis
                      type="number"
                      domain={[85, 102]}
                      tick={{ fontSize: 9.5, fill: '#64748B' }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="shortName"
                      width={140}
                      tick={{ fontSize: 9.5, fill: '#334155' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as (typeof efisiensiKontrakData)[0];
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900">{item.namaPaket}</p>
                              <p className="text-slate-600">
                                Rasio Kontrak/Pagu:{' '}
                                <span className={`font-bold ${item.isAbove95 ? 'text-orange-600' : 'text-blue-600'}`}>
                                  {item.rasioPersen}% {item.isAbove95 ? '(>95% Aksen)' : ''}
                                </span>
                              </p>
                              <p className="text-slate-500 text-[11px]">
                                Pagu: {formatRupiahJuta(item.nilaiPagu)} | Kontrak: {formatRupiahJuta(item.nilaiKontrak)}
                              </p>
                              <p className="text-emerald-700 text-[11px] font-semibold">
                                Penghematan: {formatRupiahJuta(item.penghematanJuta)}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    {/* Garis Acuan 100% Pagu */}
                    <ReferenceLine
                      x={100}
                      stroke="#DC2626"
                      strokeDasharray="4 4"
                      label={{ value: '100% Pagu', position: 'top', fill: '#DC2626', fontSize: 10 }}
                    />
                    <Bar dataKey="rasioPersen" name="Rasio Kontrak / Pagu (%)" radius={[0, 4, 4, 0]}>
                      {efisiensiKontrakData.slice(0, 12).map((entry, index) => (
                        <Cell
                          key={`cell-g5-${index}`}
                          fill={entry.isAbove95 ? '#EA580C' : '#2563EB'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-orange-600 rounded-xs"></span>
                <span>Rasio &gt; 95% (Margin Hemat Ketat)</span>
              </span>
              <span>Dataset: Laporan Progres Pekerjaan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C. KENDALA PEKERJAAN                                             */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-800 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                C. KENDALA PEKERJAAN
              </h2>
              <p className="text-xs text-slate-500">
                Peta kendala pekerjaan konstruksi terstandardisasi dan inventarisasi tabel paket terperinci.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Identifikasi Lapangan
          </span>
        </div>

        {/* GRAFIK 6: Kendala Pekerjaan Paling Sering (Treemap Interaktif) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              6. Kendala Pekerjaan Paling Sering (Treemap Segmentasi Kendala)
            </h3>
            <SifatDataBadge jenis="Terbatas" />
          </div>
          <p className="text-[11px] text-slate-500 mb-3">
            Ukuran kotak proporsional dengan jumlah paket. Warna merepresentasikan Subdirektorat pengampu dan status kendala.
          </p>

          {/* Treemap Visual Cards Representation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-1">
            {kendalaTreemapData.map((item, idx) => {
              const bgColors = [
                'bg-emerald-50 border-emerald-300 text-emerald-900',
                'bg-blue-50 border-blue-300 text-blue-900',
                'bg-indigo-50 border-indigo-300 text-indigo-900',
                'bg-sky-50 border-sky-300 text-sky-900',
                'bg-amber-50 border-amber-300 text-amber-900',
                'bg-orange-50 border-orange-300 text-orange-900',
              ];
              const badgeColors = [
                'bg-emerald-600',
                'bg-blue-600',
                'bg-indigo-600',
                'bg-sky-600',
                'bg-amber-600',
                'bg-orange-600',
              ];

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border ${bgColors[idx % bgColors.length]} transition-all hover:shadow-md flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold leading-tight">{item.name}</span>
                      <span
                        className={`text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                          badgeColors[idx % badgeColors.length]
                        }`}
                      >
                        {item.value} Paket
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-600 mt-2">
                      <span className="block font-semibold text-[10px] uppercase tracking-wider text-slate-500">
                        Distribusi Subdit:
                      </span>
                      {Object.entries(item.subditCounts).map(([subdit, count]) => (
                        <div key={subdit} className="flex justify-between items-center text-[10.5px]">
                          <span className="truncate pr-1 text-slate-700">
                            {subdit === 'Pembangunan Jalan dan Jembatan'
                              ? 'Jalan/Jembatan'
                              : subdit === 'Pembangunan Drainase'
                              ? 'Drainase'
                              : subdit === 'Pembangunan Gedung'
                              ? 'Gedung'
                              : 'Pematangan'}
                          </span>
                          <span className="font-mono font-bold text-slate-900">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                    Proporsi: {((item.value / 20) * 100).toFixed(0)}% dari 20 Paket
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 pt-3 mt-3 border-t border-slate-100 flex justify-between">
            <span>Kategori: Cuaca, Pembebasan Lahan, Ketersediaan Material, Perizinan, Utilitas Eksisting, Tidak Ada Kendala</span>
            <span>Dataset: Laporan Progres Pekerjaan</span>
          </div>
        </div>

        {/* GRAFIK 7: Tabel Paket Pekerjaan dengan Pencarian & Pengurutan */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  7. Tabel Paket Pekerjaan Konstruksi Terpadu
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Rincian Nama Paket, Kontraktor, Supervisi, Tanggal Mulai, Tanggal Selesai, Progres, dan Deskripsi Kendala Lapangan.
              </p>
            </div>

            {/* Kontrol Pencarian & Pengurutan */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari paket, kontraktor, kendala..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 w-52"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <select
                  aria-label="Pengurutan Tabel Paket"
                  value={tableSortBy}
                  onChange={(e: any) => setTableSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 text-xs outline-none cursor-pointer"
                >
                  <option value="progres-asc">Progres Terendah</option>
                  <option value="progres-desc">Progres Tertinggi</option>
                  <option value="kontrak-desc">Nilai Kontrak Terbesar</option>
                  <option value="nama">Nama Paket (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-2.5 px-3 whitespace-nowrap">No</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Nama Paket</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Kontraktor</th>
                  <th className="py-2.5 px-3 min-w-[130px]">Supervisi</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Tgl Mulai</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Tgl Selesai</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Progres</th>
                  <th className="py-2.5 px-3 min-w-[220px]">Kendala Lapangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {filteredTableData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">
                      <div>{item.namaPaket}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{item.subdirektorat}</div>
                    </td>
                    <td className="py-2 px-3 text-slate-700">{item.kontraktor}</td>
                    <td className="py-2 px-3 text-slate-600">{item.supervisi}</td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">{item.tanggalMulai}</td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">{item.tanggalSelesai}</td>
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <span
                          className={`font-mono font-bold ${
                            item.progresPersen < 50 ? 'text-amber-600' : 'text-blue-600'
                          }`}
                        >
                          {item.progresPersen}%
                        </span>
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden inline-block">
                          <div
                            className={`h-full ${item.progresPersen < 50 ? 'bg-amber-500' : 'bg-blue-600'}`}
                            style={{ width: `${item.progresPersen}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold mr-1.5 ${
                          item.jenisKendala === 'Tidak Ada Kendala'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {item.jenisKendala}
                      </span>
                      <span className="text-slate-600 text-[10.5px]">{item.kendalaDetail}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between items-center">
            <span>Menampilkan {filteredTableData.length} dari 20 paket pekerjaan terdaftar</span>
            <span>Dataset: Laporan Progres Pekerjaan Konstruksi Tahun Berjalan</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D. PEMATANGAN TANAH                                              */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-600 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                D. PEMATANGAN TANAH
              </h2>
              <p className="text-xs text-slate-500">
                Aktivitas pematangan lahan, volume pekerjaan bulanan (m³), dan capaian kumulatif kawasan BSW.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            BSW Batam Spatial Works
          </span>
        </div>

        {/* GRAFIK 8: Volume Pekerjaan Pematangan Tanah per Bulan (Column + Line Kumulatif) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  8. Volume Pekerjaan Pematangan Tanah per Bulan
                </h3>
                <SifatDataBadge jenis="Terbatas" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Column chart volume pekerjaan (m³) pada sumbu kiri, dipadukan garis progres kumulatif (%) pada sumbu kanan.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-900 block">
                Total Volume: 4.700.000 m³
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                Capaian S/D April: 44,6%
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={masterData.pematanganTanahBulanan}
                margin={{ top: 15, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#334155', fontWeight: 500 }} />
                {/* Sumbu Y Kiri: Volume (m3) */}
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k m³`}
                />
                {/* Sumbu Y Kanan: Progres Kumulatif (%) */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as (typeof masterData.pematanganTanahBulanan)[0];
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 text-xs space-y-1">
                          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                            Bulan {label}
                          </p>
                          <p className="text-blue-700">
                            Volume Pekerjaan: <span className="font-bold">{item.volumeM3.toLocaleString('id-ID')} m³</span>
                          </p>
                          <p className="text-emerald-700">
                            Progres Kumulatif: <span className="font-bold">{item.progresKumulatifPersen}%</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar
                  yAxisId="left"
                  dataKey="volumeM3"
                  name="Volume Pekerjaan (m³)"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="progresKumulatifPersen"
                  name="Progres Kumulatif (%)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#10B981', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 mt-2 border-t border-slate-100 flex justify-between">
            <span>Sumbu Kiri: Volume (m³) &bull; Sumbu Kanan: Progres Kumulatif (%)</span>
            <span>Dataset: Pematangan Tanah (BSW) (Terbatas, perbulan)</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E. JARINGAN JALAN                                                */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-900 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                E. JARINGAN JALAN
              </h2>
              <p className="text-xs text-slate-500">
                Katalog data spasial jaringan jalan eksisting berdasarkan kelas, perkerasan material, dan status jalan.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
            Satu Data BP Batam (Terbuka)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* GRAFIK 9: Panjang Jalan per Kelas dan Material (Stacked Bar Horizontal) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      9. Panjang Jalan per Kelas dan Material
                    </h3>
                    <SifatDataBadge jenis="Terbuka" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Stacked bar horizontal: Kelas Jalan (Arteri, Kolektor, Lokal, Lingkungan) vs Material jalan (km).
                  </p>
                </div>

                {/* Filter Wilayah */}
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs shrink-0">
                  <span className="text-slate-500 text-[10px] font-medium">Wilayah:</span>
                  <select
                    aria-label="Filter Wilayah Jaringan Jalan"
                    value={filterWilayahG9}
                    onChange={(e) => setFilterWilayahG9(e.target.value)}
                    className="bg-transparent font-semibold text-slate-800 text-xs outline-none cursor-pointer"
                  >
                    <option value="Semua Wilayah">Semua Wilayah (Batam)</option>
                    <option value="Batam Center">Batam Center</option>
                    <option value="Batu Ampar & Bengkong">Batu Ampar & Bengkong</option>
                    <option value="Nongsa">Nongsa</option>
                    <option value="Sekupang">Sekupang</option>
                    <option value="Batu Aji & Sagulung">Batu Aji & Sagulung</option>
                    <option value="Rempang & Galang">Rempang & Galang</option>
                  </select>
                </div>
              </div>

              <div className="h-72 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={jalanKelasMaterialData}
                    layout="vertical"
                    margin={{ top: 10, right: 25, left: 15, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#E2E8F0" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 9.5, fill: '#64748B' }}
                      tickFormatter={(val) => `${val} km`}
                    />
                    <YAxis
                      type="category"
                      dataKey="kelasJalan"
                      width={110}
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const total = payload.reduce((acc, p) => acc + (Number(p.value) || 0), 0);
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {label}
                              </p>
                              {payload.map((entry, idx) => (
                                <div key={idx} className="flex justify-between gap-3 text-[11px]">
                                  <span style={{ color: entry.color }} className="font-medium">
                                    {entry.name}:
                                  </span>
                                  <span className="font-semibold text-slate-800">{entry.value} km</span>
                                </div>
                              ))}
                              <div className="border-t border-slate-100 pt-1 flex justify-between text-[11px] font-bold text-blue-800">
                                <span>Total Panjang:</span>
                                <span>{total.toFixed(1)} km</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '4px' }} />
                    <Bar dataKey="Aspal" stackId="mat" fill="#1E3A8A" />
                    <Bar dataKey="Beton" stackId="mat" fill="#3B82F6" />
                    <Bar dataKey="Paving" stackId="mat" fill="#60A5FA" />
                    <Bar dataKey="Tanah / Kerikil" stackId="mat" fill="#94A3B8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu Y: Kelas Jalan &bull; Sumbu X: Panjang (km)</span>
              <span>Dataset: Jaringan Jalan (Eksisting) (Terbuka, jika update)</span>
            </div>
          </div>

          {/* GRAFIK 10: Lebar Jalan Rata-Rata per Status Jalan (Column Chart) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    10. Lebar Jalan Rata-Rata per Status Jalan
                  </h3>
                  <SifatDataBadge jenis="Terbuka" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Column chart memperlihatkan rata-rata geometric lebar badan jalan (m) berdasarkan hierarki status hukum jalan.
              </p>

              <div className="h-72 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={masterData.lebarJalanStatusData}
                    margin={{ top: 15, right: 10, left: -10, bottom: 35 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="statusJalan"
                      tick={{ fontSize: 9.5, fill: '#334155' }}
                      angle={-15}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      domain={[0, 30]}
                      tick={{ fontSize: 10, fill: '#64748B' }}
                      tickFormatter={(v) => `${v} m`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as (typeof masterData.lebarJalanStatusData)[0];
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900">{item.statusJalan}</p>
                              <p className="text-blue-700">
                                Rata-rata Lebar: <span className="font-bold text-slate-900">{item.rataRataLebarMeter} Meter</span>
                              </p>
                              <p className="text-slate-600 text-[11px]">
                                Jumlah Ruas: <span className="font-semibold">{item.jumlahRuas} Ruas</span>
                              </p>
                              <p className="text-slate-500 text-[11px]">
                                Total Panjang: <span className="font-semibold">{item.totalPanjangKm} km</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="rataRataLebarMeter"
                      name="Rata-rata Lebar (m)"
                      fill="#2563EB"
                      radius={[4, 4, 0, 0]}
                    >
                      {masterData.lebarJalanStatusData.map((_, index) => {
                        const shades = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA'];
                        return <Cell key={`cell-g10-${index}`} fill={shades[index % shades.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Status Jalan &bull; Sumbu Y: Rata-rata Lebar (Meter)</span>
              <span>Dataset: Jaringan Jalan (Eksisting) (Terbuka, jika update)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
