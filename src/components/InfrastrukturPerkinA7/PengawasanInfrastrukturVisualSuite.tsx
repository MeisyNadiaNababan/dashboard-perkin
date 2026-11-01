import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Info,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Building2,
  Users,
  FileCheck,
  ChevronDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  PENGAWASAN_INFRASTRUKTUR_MASTER_DATA,
  PengawasanPaketItem,
} from './pengawasanInfrastrukturVisualData';

interface PengawasanInfrastrukturVisualSuiteProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// Badge "Terbatas (usulan)" di pojok setiap grafik
const UsulanBadge: React.FC = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-amber-50 text-amber-800 border border-amber-300/80">
    Terbatas (usulan)
  </span>
);

export const PengawasanInfrastrukturVisualSuite: React.FC<
  PengawasanInfrastrukturVisualSuiteProps
> = () => {
  const masterData = PENGAWASAN_INFRASTRUKTUR_MASTER_DATA;

  // Filter Grafik 1: Paket Terpilih untuk Kurva S
  const [selectedPaketKurvaS, setSelectedPaketKurvaS] = useState<string>('ALL');

  // Filter Tabel Temuan (Grafik 4)
  const [searchTemuan, setSearchTemuan] = useState<string>('');

  // -------------------------------------------------------------
  // 1. DATASET GRAFIK 1: Kurva S Rencana vs Realisasi
  // -------------------------------------------------------------
  const kurvaSData = useMemo(() => {
    if (selectedPaketKurvaS === 'ALL') {
      // Hitung rata-rata agregat kumulatif dari 20 paket per bulan
      const bulanList = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
      return bulanList.map((bln, idx) => {
        let sumRencana = 0;
        let sumRealisasi = 0;
        let countRealisasi = 0;

        masterData.paketPengawasan.forEach((p) => {
          const point = p.kurvaSBulanan[idx];
          if (point) {
            sumRencana += point.rencana;
            if (point.realisasi !== null) {
              sumRealisasi += point.realisasi;
              countRealisasi += 1;
            }
          }
        });

        const totalPaket = masterData.paketPengawasan.length;
        const avgRencana = parseFloat((sumRencana / totalPaket).toFixed(1));
        const avgRealisasi = countRealisasi > 0 ? parseFloat((sumRealisasi / countRealisasi).toFixed(1)) : null;

        return {
          bulan: bln,
          rencana: avgRencana,
          realisasi: avgRealisasi,
        };
      });
    }

    // Ambil data paket spesifik
    const found = masterData.paketPengawasan.find((p) => p.id === selectedPaketKurvaS);
    return found ? found.kurvaSBulanan : [];
  }, [masterData.paketPengawasan, selectedPaketKurvaS]);

  // -------------------------------------------------------------
  // 2. DATASET GRAFIK 2: Deviasi Progres per Paket (15 Terburuk)
  // -------------------------------------------------------------
  const deviasiTop15Data = useMemo(() => {
    return [...masterData.paketPengawasan]
      .sort((a, b) => a.deviasiPoin - b.deviasiPoin) // Urutkan dari yang paling negatif (terburuk)
      .slice(0, 15)
      .map((p) => ({
        ...p,
        shortPaket: p.namaPaket.length > 26 ? `${p.namaPaket.substring(0, 24)}...` : p.namaPaket,
        isUnderMin10: p.deviasiPoin < -10, // Kritis di bawah -10 poin
      }));
  }, [masterData.paketPengawasan]);

  // -------------------------------------------------------------
  // 4. DATASET TABEL TEMUAN (DENGAN PENCARIAN)
  // -------------------------------------------------------------
  const filteredTabelTemuan = useMemo(() => {
    if (!searchTemuan.trim()) return masterData.daftarTemuanTabel;
    const q = searchTemuan.toLowerCase();
    return masterData.daftarTemuanTabel.filter(
      (t) =>
        t.paket.toLowerCase().includes(q) ||
        t.temuan.toLowerCase().includes(q) ||
        t.kategori.toLowerCase().includes(q) ||
        t.tingkatKeparahan.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
    );
  }, [masterData.daftarTemuanTabel, searchTemuan]);

  // -------------------------------------------------------------
  // 6. DATASET GRAFIK 6: KENDALA PEKERJAAN BERULANG (TREEMAP)
  // -------------------------------------------------------------
  const kendalaBerulangData = useMemo(() => {
    const listKendala = [
      'Cuaca',
      'Perizinan',
      'Utilitas Eksisting',
      'Pembebasan Lahan',
      'Ketersediaan Material',
      'Tidak Ada Kendala',
    ];

    return listKendala.map((k) => {
      const match = masterData.paketPengawasan.filter((p) => p.jenisKendala === k);
      const subditGroup: Record<string, number> = {};
      match.forEach((p) => {
        subditGroup[p.subdirektorat] = (subditGroup[p.subdirektorat] || 0) + 1;
      });

      return {
        name: k,
        totalPaket: match.length,
        subditBreakdown: subditGroup,
        paketNames: match.map((m) => m.namaPaket),
      };
    });
  }, [masterData.paketPengawasan]);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* ========================================================================= */}
      {/* NOTICE BANNER ATAS: Data dummy, belum terdaftar di Satu Data             */}
      {/* ========================================================================= */}
      <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3 flex items-start sm:items-center gap-2.5 text-xs text-sky-900 shadow-2xs">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <span className="font-bold text-sky-950 mr-1.5">
            Unit Pengawasan Infrastruktur:
          </span>
          <span className="text-sky-800">
            Data dummy, belum terdaftar di Satu Data. Seluruh indikator dan dataset merupakan rancangan usulan pengawasan konstruksi terpadu BP Batam (pengganti Dit. Pengamanan Aset pada Perkin A.7).
          </span>
        </div>
        <span className="shrink-0 text-[10px] font-bold bg-sky-200/80 text-sky-900 px-2 py-0.5 rounded">
          Usulan Indikator Baru
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION A. PENGAWASAN PROGRES                                            */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-600 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                A. PENGAWASAN PROGRES
              </h2>
              <p className="text-xs text-slate-500">
                Pemantauan dinamika Kurva S rencana versus realisasi serta identifikasi deviasi kritis per paket pekerjaan.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Laporan Pengawasan Progres
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* GRAFIK 1: Kurva S Rencana vs Realisasi */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      1. Kurva S Rencana vs Realisasi
                    </h3>
                    <UsulanBadge />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Line chart komparasi progres kumulatif bulanan (%) rencana vs capaian realisasi lapangan.
                  </p>
                </div>

                {/* Filter Paket */}
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
                  <span className="text-slate-500 text-[10px] font-medium">Filter Paket:</span>
                  <select
                    aria-label="Filter Paket Kurva S"
                    value={selectedPaketKurvaS}
                    onChange={(e) => setSelectedPaketKurvaS(e.target.value)}
                    className="bg-transparent font-semibold text-slate-800 text-xs outline-none cursor-pointer max-w-[150px] truncate"
                  >
                    <option value="ALL">Semua Paket (Agregat)</option>
                    {masterData.paketPengawasan.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.kode} - {p.namaPaket}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="h-72 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kurvaSData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#334155', fontWeight: 500 }} />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: '#64748B' }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const rnc = payload.find((p) => p.dataKey === 'rencana')?.value;
                          const rls = payload.find((p) => p.dataKey === 'realisasi')?.value;
                          const dev =
                            rls !== null && rls !== undefined && rnc !== undefined
                              ? (Number(rls) - Number(rnc)).toFixed(1)
                              : null;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                Bulan {label}
                              </p>
                              <p className="text-slate-600">
                                Rencana Kumulatif: <span className="font-bold text-slate-800">{rnc}%</span>
                              </p>
                              <p className="text-blue-600">
                                Realisasi Lapangan:{' '}
                                <span className="font-bold">{rls !== null ? `${rls}%` : 'Tahap Proyeksi'}</span>
                              </p>
                              {dev !== null && (
                                <p
                                  className={`text-[11px] font-semibold ${
                                    Number(dev) >= 0 ? 'text-emerald-600' : 'text-amber-600'
                                  }`}
                                >
                                  Deviasi: {Number(dev) > 0 ? `+${dev}` : dev}%
                                </p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Line
                      type="monotone"
                      dataKey="rencana"
                      name="Rencana Kumulatif (%)"
                      stroke="#94A3B8"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 3, fill: '#94A3B8' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="realisasi"
                      name="Realisasi Lapangan (%)"
                      stroke="#2563EB"
                      strokeWidth={2.5}
                      dot={{ r: 3.5, fill: '#2563EB' }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Bulan (Jan-Des) &bull; Sumbu Y: Progres Kumulatif (%)</span>
              <span>Dataset (usulan): Laporan Pengawasan Progres</span>
            </div>
          </div>

          {/* GRAFIK 2: Deviasi Progres per Paket (15 Paket Terburuk) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    2. Deviasi Progres per Paket (15 Terburuk)
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Bar horizontal diurutkan dari deviasi terendah. Paket dengan deviasi di bawah -10 poin diberi warna aksen merah.
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={deviasiTop15Data}
                    layout="vertical"
                    margin={{ top: 8, right: 25, left: 15, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#E2E8F0" />
                    <XAxis
                      type="number"
                      domain={[-20, 5]}
                      tick={{ fontSize: 9.5, fill: '#64748B' }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="shortPaket"
                      width={140}
                      tick={{ fontSize: 9.5, fill: '#334155' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as (typeof deviasiTop15Data)[0];
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs space-y-1.5 max-w-xs">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.namaPaket}
                              </p>
                              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                                <span className="text-slate-500">Kontraktor:</span>
                                <span className="font-semibold text-slate-800">{item.kontraktor}</span>
                                <span className="text-slate-500">Supervisi:</span>
                                <span className="font-semibold text-slate-800">{item.supervisi}</span>
                                <span className="text-slate-500">Rencana:</span>
                                <span className="text-slate-700">{item.rencanaPersen}%</span>
                                <span className="text-slate-500">Realisasi:</span>
                                <span className="text-slate-700">{item.realisasiPersen}%</span>
                                <span className="text-slate-500">Deviasi:</span>
                                <span
                                  className={`font-black ${
                                    item.isUnderMin10 ? 'text-red-600' : 'text-blue-600'
                                  }`}
                                >
                                  {item.deviasiPoin > 0 ? `+${item.deviasiPoin}` : item.deviasiPoin} poin %
                                  {item.isUnderMin10 ? ' (Kritis < -10%)' : ''}
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine x={0} stroke="#64748B" strokeWidth={1.5} />
                    <ReferenceLine
                      x={-10}
                      stroke="#DC2626"
                      strokeDasharray="4 4"
                      label={{ value: 'Batas Kritis -10%', position: 'top', fill: '#DC2626', fontSize: 9.5 }}
                    />
                    <Bar dataKey="deviasiPoin" name="Deviasi (poin %)" radius={[3, 3, 3, 3]}>
                      {deviasiTop15Data.map((entry, index) => (
                        <Cell
                          key={`cell-g2-${index}`}
                          fill={entry.isUnderMin10 ? '#DC2626' : entry.deviasiPoin >= 0 ? '#2563EB' : '#3B82F6'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-red-600 rounded-xs"></span>
                  <span>Deviasi &lt; -10 poin (Aksen Kritis)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs"></span>
                  <span>Deviasi Normal</span>
                </span>
              </span>
              <span>Dataset: Laporan Pengawasan Progres</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B. TEMUAN DAN TINDAK LANJUT                                      */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-700 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                B. TEMUAN DAN TINDAK LANJUT
              </h2>
              <p className="text-xs text-slate-500">
                Katalog temuan audit teknis pengawasan per kategori, matriks tingkat keparahan, dan pemantauan status penyelesaian.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Rekapitulasi Temuan Pengawasan
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* GRAFIK 3: Temuan Pengawasan per Kategori & Tingkat Keparahan */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    3. Temuan Pengawasan per Kategori &amp; Keparahan
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Stacked bar horizontal: Kategori (Mutu Pekerjaan, K3, Administrasi, Lingkungan, Waktu) vs Tingkat Keparahan.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={masterData.rekapTemuanKategoriKeparahan}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                    <YAxis
                      type="category"
                      dataKey="kategori"
                      width={105}
                      tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const total = payload.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">{label}</p>
                              {payload.map((entry, idx) => (
                                <div key={idx} className="flex justify-between gap-3 text-[11px]">
                                  <span style={{ color: entry.color }} className="font-medium">
                                    {entry.name}:
                                  </span>
                                  <span className="font-bold text-slate-800">{entry.value} Temuan</span>
                                </div>
                              ))}
                              <div className="border-t border-slate-100 pt-1 flex justify-between font-bold text-blue-800 text-[11px]">
                                <span>Total Temuan:</span>
                                <span>{total} Temuan</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '4px' }} />
                    <Bar dataKey="Ringan" stackId="keparahan" fill="#60A5FA" />
                    <Bar dataKey="Sedang" stackId="keparahan" fill="#2563EB" />
                    <Bar dataKey="Berat" stackId="keparahan" fill="#1E3A8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Jumlah Temuan &bull; Sumbu Y: Kategori</span>
              <span>Dataset: Rekapitulasi Temuan</span>
            </div>
          </div>

          {/* GRAFIK 4: Status Tindak Lanjut Temuan per Bulan */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    4. Status Tindak Lanjut Temuan per Bulan
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Stacked column chart rekap status resolusi temuan per bulan (Selesai, Proses, Belum Ditindaklanjuti).
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={masterData.statusTindakLanjutBulanan.slice(0, 9)}
                    margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#334155', fontWeight: 500 }} />
                    <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const total = payload.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                Bulan {label}
                              </p>
                              {payload.map((entry, idx) => (
                                <div key={idx} className="flex justify-between gap-3 text-[11px]">
                                  <span style={{ color: entry.color }} className="font-medium">
                                    {entry.name}:
                                  </span>
                                  <span className="font-bold text-slate-800">{entry.value} Temuan</span>
                                </div>
                              ))}
                              <div className="border-t border-slate-100 pt-1 flex justify-between font-bold text-slate-900 text-[11px]">
                                <span>Total Temuan:</span>
                                <span>{total} Temuan</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '4px' }} />
                    <Bar dataKey="Selesai" stackId="status" fill="#10B981" />
                    <Bar dataKey="Proses" stackId="status" fill="#2563EB" />
                    <Bar dataKey="Belum" stackId="status" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Bulan &bull; Sumbu Y: Jumlah Temuan</span>
              <span>Dataset: Rekapitulasi Temuan</span>
            </div>
          </div>
        </div>

        {/* TABEL DI BAWAH GRAFIK 4: Daftar Temuan Lapangan */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Tabel Rincian Temuan dan Status Tindak Lanjut
                </h4>
                <UsulanBadge />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Monitoring Paket, Uraian Temuan, Kategori, Tingkat Keparahan, Batas Waktu, dan Status Penanganan.
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari temuan, paket, status..."
                value={searchTemuan}
                onChange={(e) => setSearchTemuan(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 w-60"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-2.5 px-3 whitespace-nowrap">No</th>
                  <th className="py-2.5 px-3 min-w-[160px]">Paket Pekerjaan</th>
                  <th className="py-2.5 px-3 min-w-[240px]">Uraian Temuan</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Kategori</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Tingkat Keparahan</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Batas Waktu</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {filteredTabelTemuan.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{item.paket}</td>
                    <td className="py-2 px-3 text-slate-700">{item.temuan}</td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-[10.5px]">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.tingkatKeparahan === 'Berat'
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : item.tingkatKeparahan === 'Sedang'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}
                      >
                        {item.tingkatKeparahan}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap font-mono">{item.batasWaktu}</td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                          item.status === 'Selesai'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'Proses'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C. SUPERVISI DAN KENDALA                                         */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-800 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                C. SUPERVISI DAN KENDALA
              </h2>
              <p className="text-xs text-slate-500">
                Peta beban pengawasan konsultan supervisi serta pola kendala konstruksi berulang antar subdirektorat.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Supervisi &amp; Manajemen Risiko
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* GRAFIK 5: Beban Paket per Konsultan Supervisi */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    5. Beban Paket per Konsultan Supervisi
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Bar horizontal jumlah paket diawasi per konsultan. Warna batang mencerminkan gradasi rata-rata progres paket.
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={masterData.konsultanSupervisiBeban}
                    layout="vertical"
                    margin={{ top: 8, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#E2E8F0" />
                    <XAxis
                      type="number"
                      domain={[0, 3]}
                      tick={{ fontSize: 9.5, fill: '#64748B' }}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="supervisi"
                      width={160}
                      tick={{ fontSize: 9, fill: '#334155' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as (typeof masterData.konsultanSupervisiBeban)[0];
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900">{item.supervisi}</p>
                              <p className="text-blue-700">
                                Jumlah Paket Diawasi: <span className="font-bold">{item.jumlahPaket} Paket</span>
                              </p>
                              <p className="text-emerald-700">
                                Rata-rata Progres Paket: <span className="font-bold">{item.rataRataProgres}%</span>
                              </p>
                              <div className="border-t border-slate-100 pt-1 text-[10px] text-slate-500">
                                Paket: {item.daftarPaket.join(', ')}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="jumlahPaket" name="Jumlah Paket" radius={[0, 4, 4, 0]}>
                      {masterData.konsultanSupervisiBeban.map((entry, index) => {
                        // Gradasi warna biru berdasarkan rata-rata progres
                        const fill =
                          entry.rataRataProgres >= 80
                            ? '#1E3A8A' // Biru Sangat Gelap
                            : entry.rataRataProgres >= 60
                            ? '#2563EB' // Biru Primer
                            : entry.rataRataProgres >= 40
                            ? '#60A5FA' // Biru Terang
                            : '#93C5FD'; // Biru Muda
                        return <Cell key={`cell-g5-${index}`} fill={fill} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">Gradasi Progres:</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#93C5FD] rounded-xs"></span>
                  <span className="text-[10px]">&lt;40%</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#2563EB] rounded-xs"></span>
                  <span className="text-[10px]">60-80%</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#1E3A8A] rounded-xs"></span>
                  <span className="text-[10px]">&gt;80%</span>
                </span>
              </span>
              <span>Dataset: Daftar Paket dan Supervisi</span>
            </div>
          </div>

          {/* GRAFIK 6: Kendala Pekerjaan Berulang (Treemap) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    6. Kendala Pekerjaan Berulang (Treemap)
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Ukuran kotak proporsional dengan frekuensi kendala, disertai breakdown sebaran subdirektorat.
              </p>

              {/* Responsive Treemap Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {kendalaBerulangData.map((item, idx) => {
                  const palette = [
                    'bg-blue-50 border-blue-300 text-blue-900',
                    'bg-amber-50 border-amber-300 text-amber-900',
                    'bg-sky-50 border-sky-300 text-sky-900',
                    'bg-indigo-50 border-indigo-300 text-indigo-900',
                    'bg-orange-50 border-orange-300 text-orange-900',
                    'bg-emerald-50 border-emerald-300 text-emerald-900',
                  ];
                  const badges = [
                    'bg-blue-600',
                    'bg-amber-600',
                    'bg-sky-600',
                    'bg-indigo-600',
                    'bg-orange-600',
                    'bg-emerald-600',
                  ];

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border ${palette[idx % palette.length]} flex flex-col justify-between hover:shadow-md transition-shadow`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <span className="text-xs font-bold leading-tight">{item.name}</span>
                          <span
                            className={`text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                              badges[idx % badges.length]
                            }`}
                          >
                            {item.totalPaket} Pkt
                          </span>
                        </div>

                        <div className="space-y-1 text-[10.5px] text-slate-600 mt-2">
                          {Object.entries(item.subditBreakdown).map(([subdit, count]) => (
                            <div key={subdit} className="flex justify-between items-center">
                              <span className="truncate pr-1 text-slate-700">
                                {subdit === 'Pembangunan Jalan dan Jembatan'
                                  ? 'Jalan'
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

                      <div className="mt-2.5 pt-1.5 border-t border-slate-200/60 text-[9.5px] text-slate-500">
                        {((item.totalPaket / 20) * 100).toFixed(0)}% Frekuensi Proyek
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Warna Kotak: Subdirektorat Pengampu &bull; Ukuran: Frekuensi Kendala</span>
              <span>Dataset: Daftar Paket dan Supervisi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D. INSPEKSI DAN SERAH TERIMA                                     */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-900 rounded-sm"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                D. INSPEKSI DAN SERAH TERIMA
              </h2>
              <p className="text-xs text-slate-500">
                Statistik giat inspeksi berkala di lapangan serta tahapan serah terima pekerjaan (PHO s.d. FHO).
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            Inspeksi &amp; PHO / FHO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* GRAFIK 7: Jumlah Inspeksi Lapangan per Bulan */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    7. Jumlah Inspeksi Lapangan per Bulan
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Column chart rekapitulasi agenda inspeksi kepatuhan spesifikasi dan mutu fisik pekerjaan per bulan.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={masterData.inspeksiBulanan.slice(0, 9)}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="bulan" tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 500 }} />
                    <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const val = payload[0].value;
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900">Bulan {label}</p>
                              <p className="text-blue-700">
                                Total Inspeksi: <span className="font-bold">{val} Kali Kunjungan Lapangan</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="jumlahInspeksi"
                      name="Jumlah Inspeksi Lapangan"
                      fill="#2563EB"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Bulan &bull; Sumbu Y: Jumlah Inspeksi</span>
              <span>Dataset: Daftar Inspeksi Lapangan</span>
            </div>
          </div>

          {/* GRAFIK 8: Status Serah Terima Pekerjaan per Tahun */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    8. Status Serah Terima Pekerjaan per Tahun
                  </h3>
                  <UsulanBadge />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Stacked column chart tahapan serah terima: PHO Selesai, Masa Pemeliharaan, dan FHO Akhir per tahun.
              </p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={masterData.rekapSerahTerimaTahunan}
                    margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }} />
                    <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const total = payload.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
                          return (
                            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-2.5 text-xs space-y-1">
                              <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                Tahun {label}
                              </p>
                              {payload.map((entry, idx) => (
                                <div key={idx} className="flex justify-between gap-3 text-[11px]">
                                  <span style={{ color: entry.color }} className="font-medium">
                                    {entry.name}:
                                  </span>
                                  <span className="font-bold text-slate-800">{entry.value} Paket</span>
                                </div>
                              ))}
                              <div className="border-t border-slate-100 pt-1 flex justify-between font-bold text-slate-900 text-[11px]">
                                <span>Total Paket:</span>
                                <span>{total} Paket</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10.5px', paddingTop: '4px' }} />
                    <Bar dataKey="phoSelesai" name="PHO Selesai" stackId="serahTerima" fill="#3B82F6" />
                    <Bar dataKey="masaPemeliharaan" name="Masa Pemeliharaan" stackId="serahTerima" fill="#F59E0B" />
                    <Bar dataKey="fhoSelesai" name="FHO Selesai" stackId="serahTerima" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex justify-between">
              <span>Sumbu X: Tahun &bull; Sumbu Y: Jumlah Paket</span>
              <span>Dataset: Rekapitulasi Serah Terima</span>
            </div>
          </div>
        </div>

        {/* TABEL DI BAWAH GRAFIK 7: Log Hasil Inspeksi Lapangan */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Tabel Log Agenda &amp; Hasil Inspeksi Lapangan Terkini
                </h4>
                <UsulanBadge />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Rincian Tanggal, Paket Pekerjaan, Lokasi Fisik, dan Catatan Hasil Uji Teknis di Lapangan.
              </p>
            </div>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
              7 Entri Terakhir
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-2.5 px-3 whitespace-nowrap">Tanggal</th>
                  <th className="py-2.5 px-3 min-w-[170px]">Paket Pekerjaan</th>
                  <th className="py-2.5 px-3 min-w-[150px]">Lokasi Inspeksi</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Kategori Uji</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Catatan Hasil Inspeksi Lapangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {masterData.daftarInspeksiTabel.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 font-mono text-slate-600 whitespace-nowrap font-medium">
                      {item.tanggal}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{item.paket}</td>
                    <td className="py-2 px-3 text-slate-700">{item.lokasi}</td>
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium text-[10.5px]">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-700">{item.hasilInspeksi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
