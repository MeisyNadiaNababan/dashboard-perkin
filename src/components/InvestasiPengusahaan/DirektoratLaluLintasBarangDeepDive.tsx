import React, { useState, useMemo } from 'react';
import {
  Truck,
  FileCheck,
  CheckCircle2,
  Clock,
  Building2,
  Package,
  Layers,
  ArrowRightLeft,
  Calendar,
  Filter,
  Info,
  ShieldCheck,
  Lock,
  Globe,
  TrendingUp,
  AlertTriangle,
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
} from 'recharts';
import {
  LALU_LINTAS_BARANG_DATA,
  IzinUsahaKawasanBulananItem,
  PemasukanPengeluaranBulananItem,
  LayananPerizinanLlbItem,
  KetepatanWaktuSlaItem,
  KuotaIndukKonsumsiItem,
  KbliPerusahaanIukItem,
} from './laluLintasBarangData';

export const DirektoratLaluLintasBarangDeepDive: React.FC = () => {
  const db = LALU_LINTAS_BARANG_DATA;

  // --------------------------------------------------------------------------
  // FILTER STATES TIAP KARTU
  // --------------------------------------------------------------------------
  // Kartu 1: Filter Tahun
  const [k1Tahun, setK1Tahun] = useState<string>('2026');

  // Kartu 2: Filter Tahun
  const [k2Tahun, setK2Tahun] = useState<string>('2026');

  // Kartu 3: Filter Tahun & Bulan
  const [k3Tahun, setK3Tahun] = useState<string>('2026');
  const [k3Bulan, setK3Bulan] = useState<string>('Semua');

  // Kartu 4: Filter Bidang & Bulan
  const [k4Bidang, setK4Bidang] = useState<string>('Semua');
  const [k4Bulan, setK4Bulan] = useState<string>('Semua');

  // Kartu 5: Filter Tahun
  const [k5Tahun, setK5Tahun] = useState<string>('2026');

  // --------------------------------------------------------------------------
  // KARTU 1: PENERBITAN IZIN USAHA KAWASAN PER BULAN (STACKED COLUMN)
  // --------------------------------------------------------------------------
  const k1Data = useMemo(() => {
    return db.penerbitanIzinUsahaKawasan.records.filter((item) => {
      if (k1Tahun === 'Semua') return true;
      return item.tahun === Number(k1Tahun);
    });
  }, [db.penerbitanIzinUsahaKawasan.records, k1Tahun]);

  const k1Summary = useMemo(() => {
    const total = k1Data.reduce((acc, curr) => acc + curr.totalIzin, 0);
    const baru = k1Data.reduce((acc, curr) => acc + curr.iukBaru, 0);
    const perpanjang = k1Data.reduce((acc, curr) => acc + curr.perpanjanganIuk, 0);
    return {
      total,
      baru,
      perpanjang,
      keteranganBiru: `Izin Terbit TA ${k1Tahun}`,
    };
  }, [k1Data, k1Tahun]);

  // --------------------------------------------------------------------------
  // KARTU 2: IZIN PEMASUKAN VS PENGELUARAN BARANG (CLUSTERED COLUMN)
  // --------------------------------------------------------------------------
  const k2Data = useMemo(() => {
    return db.pemasukanVsPengeluaran.records.filter((item) => {
      if (k2Tahun === 'Semua') return true;
      return item.tahun === Number(k2Tahun);
    });
  }, [db.pemasukanVsPengeluaran.records, k2Tahun]);

  const k2Summary = useMemo(() => {
    const totalMasuk = k2Data.reduce((acc, curr) => acc + curr.pemasukanBarang, 0);
    const totalKeluar = k2Data.reduce((acc, curr) => acc + curr.pengeluaranBarang, 0);
    const totalSemua = totalMasuk + totalKeluar;
    return {
      totalSemua,
      totalMasuk,
      totalKeluar,
      keteranganBiru: `${totalMasuk.toLocaleString('id-ID')} Masuk | ${totalKeluar.toLocaleString('id-ID')} Keluar`,
    };
  }, [k2Data]);

  // --------------------------------------------------------------------------
  // KARTU 3: PENERBITAN LAYANAN PERIZINAN LLB (STACKED HORIZONTAL BAR, SORTED DESC)
  // --------------------------------------------------------------------------
  const k3AggregatedData = useMemo(() => {
    const filtered = db.layananPerizinanBidang.records.filter((item) => {
      const matchTahun = k3Tahun === 'Semua' || item.tahun === Number(k3Tahun);
      const matchBulan = k3Bulan === 'Semua' || item.bulan === k3Bulan;
      return matchTahun && matchBulan;
    });

    const map = new Map<
      string,
      {
        namaLayanan: string;
        bidangIndustri: number;
        bidangPerdagangan: number;
        totalDokumen: number;
        rentangTanggalRekap: string;
      }
    >();

    filtered.forEach((item) => {
      const existing = map.get(item.namaLayanan) || {
        namaLayanan: item.namaLayanan,
        bidangIndustri: 0,
        bidangPerdagangan: 0,
        totalDokumen: 0,
        rentangTanggalRekap: item.rentangTanggalRekap,
      };
      existing.bidangIndustri += item.bidangIndustri;
      existing.bidangPerdagangan += item.bidangPerdagangan;
      existing.totalDokumen += item.totalDokumen;
      map.set(item.namaLayanan, existing);
    });

    return Array.from(map.values()).sort((a, b) => b.totalDokumen - a.totalDokumen);
  }, [db.layananPerizinanBidang.records, k3Tahun, k3Bulan]);

  const k3Summary = useMemo(() => {
    const total = k3AggregatedData.reduce((acc, curr) => acc + curr.totalDokumen, 0);
    const industri = k3AggregatedData.reduce((acc, curr) => acc + curr.bidangIndustri, 0);
    const perdagangan = k3AggregatedData.reduce((acc, curr) => acc + curr.bidangPerdagangan, 0);
    return {
      total,
      industri,
      perdagangan,
      keteranganBiru: `Total Penerbitan (${k3Bulan === 'Semua' ? '1 Tahun' : k3Bulan} ${k3Tahun})`,
    };
  }, [k3AggregatedData, k3Tahun, k3Bulan]);

  // --------------------------------------------------------------------------
  // KARTU 4: KETEPATAN WAKTU PELAYANAN (PROGRESS BAR HORIZONTAL PER URAIAN IZIN)
  // --------------------------------------------------------------------------
  const k4List = useMemo(() => {
    const filtered = db.ketepatanWaktuPelayanan.records.filter((item) => {
      const matchBidang = k4Bidang === 'Semua' || item.bidang === k4Bidang;
      const matchBulan = k4Bulan === 'Semua' || item.bulan === k4Bulan;
      return matchBidang && matchBulan;
    });

    // Agregasi jika bulan 'Semua'
    const map = new Map<
      string,
      {
        uraianIzin: string;
        bidang: 'Industri' | 'Perdagangan';
        totalDokumen: number;
        dokumenTepatWaktu: number;
        rataRataWaktuJam: number;
        standarSlaJam: number;
        count: number;
      }
    >();

    filtered.forEach((item) => {
      const existing = map.get(item.uraianIzin) || {
        uraianIzin: item.uraianIzin,
        bidang: item.bidang,
        totalDokumen: 0,
        dokumenTepatWaktu: 0,
        rataRataWaktuJam: 0,
        standarSlaJam: item.standarSlaJam,
        count: 0,
      };
      existing.totalDokumen += item.totalDokumen;
      existing.dokumenTepatWaktu += item.dokumenTepatWaktu;
      existing.rataRataWaktuJam += item.rataRataWaktuJam;
      existing.count += 1;
      map.set(item.uraianIzin, existing);
    });

    return Array.from(map.values())
      .map((item) => {
        const persentase =
          item.totalDokumen > 0
            ? Math.round((item.dokumenTepatWaktu / item.totalDokumen) * 1000) / 10
            : 0;
        const avgJam =
          item.count > 0 ? Math.round((item.rataRataWaktuJam / item.count) * 10) / 10 : 0;
        return {
          uraianIzin: item.uraianIzin,
          bidang: item.bidang,
          totalDokumen: item.totalDokumen,
          dokumenTepatWaktu: item.dokumenTepatWaktu,
          persentaseTepatWaktu: persentase,
          rataRataWaktuJam: avgJam,
          standarSlaJam: item.standarSlaJam,
        };
      })
      .sort((a, b) => b.persentaseTepatWaktu - a.persentaseTepatWaktu);
  }, [db.ketepatanWaktuPelayanan.records, k4Bidang, k4Bulan]);

  const k4Summary = useMemo(() => {
    if (k4List.length === 0) {
      return { avg: 0, keteranganBiru: 'Rata-rata Ketepatan Waktu' };
    }
    const totalSemua = k4List.reduce((acc, curr) => acc + curr.totalDokumen, 0);
    const tepatSemua = k4List.reduce((acc, curr) => acc + curr.dokumenTepatWaktu, 0);
    const avg = totalSemua > 0 ? Math.round((tepatSemua / totalSemua) * 1000) / 10 : 0;
    return {
      avg,
      keteranganBiru: `Rata-rata SLA Tepat Waktu (${k4Bidang === 'Semua' ? 'Semua Bidang' : k4Bidang})`,
    };
  }, [k4List, k4Bidang]);

  // --------------------------------------------------------------------------
  // KARTU 5: REALISASI KUOTA INDUK BARANG KONSUMSI (CLUSTERED BAR HORIZONTAL)
  // --------------------------------------------------------------------------
  const k5Data = useMemo(() => {
    return db.realisasiKuotaKonsumsi.records
      .filter((item) => {
        if (k5Tahun === 'Semua') return true;
        return item.tahun === Number(k5Tahun);
      })
      .map((item) => ({
        ...item,
        displayLabel: `${item.kodeHs} - ${item.komoditas}`,
      }));
  }, [db.realisasiKuotaKonsumsi.records, k5Tahun]);

  const k5Summary = useMemo(() => {
    const totalKuota = k5Data.reduce((acc, curr) => acc + curr.kuotaTon, 0);
    const totalRealisasi = k5Data.reduce((acc, curr) => acc + curr.realisasiTon, 0);
    const persen =
      totalKuota > 0 ? Math.round((totalRealisasi / totalKuota) * 1000) / 10 : 0;
    return {
      persen,
      totalKuota,
      totalRealisasi,
      keteranganBiru: `dari ${totalKuota.toLocaleString('id-ID')} Ton Kuota Terbit`,
    };
  }, [k5Data]);

  // --------------------------------------------------------------------------
  // KARTU 6: SEBARAN KBLI PERUSAHAAN PEMEGANG IZIN USAHA KAWASAN (HORIZONTAL BAR)
  // --------------------------------------------------------------------------
  const k6Data = useMemo(() => {
    return [...db.sebaranKbliIuk.records].sort(
      (a, b) => b.jumlahPerusahaan - a.jumlahPerusahaan
    );
  }, [db.sebaranKbliIuk.records]);

  const k6Summary = useMemo(() => {
    const totalPerusahaan = k6Data.reduce((acc, curr) => acc + curr.jumlahPerusahaan, 0);
    const totalKbli = k6Data.length;
    return {
      totalPerusahaan,
      totalKbli,
      keteranganBiru: `di ${totalKbli} KBLI Teratas Kawasan`,
    };
  }, [k6Data]);

  // --------------------------------------------------------------------------
  // RENDER LAYOUT 2 KOLOM x 3 BARIS (TOTAL 6 KARTU)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* ==================================================================== */}
      {/* BARIS 1: KARTU 1 & KARTU 2                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 1: Penerbitan Izin Usaha Kawasan per Bulan                   */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Penerbitan Izin Usaha Kawasan per Bulan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi penerbitan IUK baru, perpanjangan, perubahan, dan penutupan
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k1Summary.total.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k1Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> IUK Baru
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" /> Perpanjangan
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Perubahan
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#f97316]" /> Penutupan
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Tahun:</span>
                <select
                  value={k1Tahun}
                  onChange={(e) => setK1Tahun(e.target.value)}
                  className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            {/* Stacked Column Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={k1Data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload as IzinUsahaKawasanBulananItem;
                      return (
                        <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                            <span>Bulan {item.bulanNama || item.bulan} {item.tahun}</span>
                            <span className="font-mono text-blue-600 font-black">
                              Total: {item.totalIzin} Izin
                            </span>
                          </div>
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex justify-between items-center text-blue-700">
                              <span>• IUK Baru:</span>
                              <span className="font-mono font-bold">{item.iukBaru}</span>
                            </div>
                            <div className="flex justify-between items-center text-sky-700">
                              <span>• Perpanjangan IUK:</span>
                              <span className="font-mono font-bold">{item.perpanjanganIuk}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>• Perubahan IUK:</span>
                              <span className="font-mono font-bold">{item.perubahanIuk}</span>
                            </div>
                            <div className="flex justify-between items-center text-orange-600">
                              <span>• Penutupan IUK:</span>
                              <span className="font-mono font-bold">{item.penutupanIuk}</span>
                            </div>
                          </div>
                          {item.uraianList && item.uraianList.length > 0 && (
                            <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-500">
                              <span className="font-semibold text-slate-600">Dominasi Sektor:</span>{' '}
                              {item.uraianList.slice(0, 2).map((u) => `${u.uraian} (${u.jumlah})`).join(', ')}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="iukBaru" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} name="IUK Baru" />
                  <Bar dataKey="perpanjanganIuk" stackId="a" fill="#38bdf8" radius={[0, 0, 0, 0]} name="Perpanjangan" />
                  <Bar dataKey="perubahanIuk" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} name="Perubahan" />
                  <Bar dataKey="penutupanIuk" stackId="a" fill="#f97316" radius={[3, 3, 0, 0]} name="Penutupan" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.penerbitanIzinUsahaKawasan.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.penerbitanIzinUsahaKawasan.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 2: Izin Pemasukan vs Pengeluaran Barang                      */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Izin Pemasukan vs Pengeluaran Barang
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Perbandingan volume dokumen izin pemasukan dan pengeluaran barang
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k2Summary.totalSemua.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k2Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Pemasukan Barang
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#64748b]" /> Pengeluaran Barang
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Tahun:</span>
                <select
                  value={k2Tahun}
                  onChange={(e) => setK2Tahun(e.target.value)}
                  className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            {/* Clustered Column Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={k2Data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload as PemasukanPengeluaranBulananItem;
                      return (
                        <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-2 max-w-sm">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                            <span>Bulan {item.bulanNama || item.bulan} {item.tahun}</span>
                            <span className="font-mono text-blue-600 font-black">
                              Total: {item.totalDokumen.toLocaleString('id-ID')} Dok
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            {/* Pemasukan */}
                            <div className="bg-blue-50/60 p-2 rounded border border-blue-100">
                              <div className="font-bold text-blue-800 flex justify-between">
                                <span>Pemasukan:</span>
                                <span className="font-mono font-black">{item.pemasukanBarang}</span>
                              </div>
                              <div className="mt-1 space-y-0.5 text-[10px] text-blue-900/80">
                                {item.rincianPemasukan.map((r, i) => (
                                  <div key={i} className="flex justify-between">
                                    <span className="truncate pr-1">{r.uraianIzin}:</span>
                                    <span className="font-mono">{r.jumlah}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Pengeluaran */}
                            <div className="bg-slate-50 p-2 rounded border border-slate-200">
                              <div className="font-bold text-slate-800 flex justify-between">
                                <span>Pengeluaran:</span>
                                <span className="font-mono font-black">{item.pengeluaranBarang}</span>
                              </div>
                              <div className="mt-1 space-y-0.5 text-[10px] text-slate-600">
                                {item.rincianPengeluaran.map((r, i) => (
                                  <div key={i} className="flex justify-between">
                                    <span className="truncate pr-1">{r.uraianIzin}:</span>
                                    <span className="font-mono">{r.jumlah}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="pemasukanBarang"
                    fill="#2563eb"
                    radius={[3, 3, 0, 0]}
                    name="Pemasukan Barang"
                  />
                  <Bar
                    dataKey="pengeluaranBarang"
                    fill="#64748b"
                    radius={[3, 3, 0, 0]}
                    name="Pengeluaran Barang"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="truncate">{db.pemasukanVsPengeluaran.metadata.namaDataset}</span>
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Terbuka (Masuk)
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Terbatas (Keluar)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARIS 2: KARTU 3 & KARTU 4                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 3: Penerbitan Layanan Perizinan Lalu Lintas Barang           */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Penerbitan Layanan Perizinan Lalu Lintas Barang
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Akumulasi layanan perizinan terbit menurut bidang industri dan perdagangan
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k3Summary.total.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k3Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Bidang Industri
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]" /> Bidang Perdagangan
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thn:</span>
                  <select
                    value={k3Tahun}
                    onChange={(e) => setK3Tahun(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bulan:</span>
                  <select
                    value={k3Bulan}
                    onChange={(e) => setK3Bulan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="Mei">Mei</option>
                    <option value="Jun">Jun</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stacked Horizontal Bar Chart (Sorted Descending) */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={k3AggregatedData}
                  layout="vertical"
                  margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="namaLayanan"
                    tick={{ fontSize: 10, fill: '#334155' }}
                    width={110}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(val: string) =>
                      val.length > 15 ? `${val.slice(0, 15)}…` : val
                    }
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload;
                      return (
                        <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                            {item.namaLayanan}
                          </div>
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex justify-between items-center text-blue-700">
                              <span>• Bidang Industri:</span>
                              <span className="font-mono font-bold">
                                {item.bidangIndustri.toLocaleString('id-ID')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sky-700">
                              <span>• Bidang Perdagangan:</span>
                              <span className="font-mono font-bold">
                                {item.bidangPerdagangan.toLocaleString('id-ID')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-900 font-bold border-t border-slate-100 pt-1">
                              <span>Jumlah Total:</span>
                              <span className="font-mono text-blue-600 font-black">
                                {item.totalDokumen.toLocaleString('id-ID')} Dokumen
                              </span>
                            </div>
                          </div>
                          <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-400">
                            Rentang Rekap: {item.rentangTanggalRekap}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="bidangIndustri"
                    stackId="a"
                    fill="#2563eb"
                    name="Bidang Industri"
                  />
                  <Bar
                    dataKey="bidangPerdagangan"
                    stackId="a"
                    fill="#38bdf8"
                    name="Bidang Perdagangan"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.layananPerizinanBidang.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.layananPerizinanBidang.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 4: Ketepatan Waktu Pelayanan (Progress Bar Horizontal)       */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Ketepatan Waktu Pelayanan (SLA)
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Persentase dokumen layanan diselesaikan tepat waktu sesuai standar SLA
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k4Summary.avg}%
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k4Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> ≥ 90% (Tepat Waktu)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> &lt; 90% (Perlu Perhatian)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bidang:</span>
                  <select
                    value={k4Bidang}
                    onChange={(e) => setK4Bidang(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Industri">Industri</option>
                    <option value="Perdagangan">Perdagangan</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bulan:</span>
                  <select
                    value={k4Bulan}
                    onChange={(e) => setK4Bulan(e.target.value)}
                    className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none"
                  >
                    <option value="Semua">Semua</option>
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="Mei">Mei</option>
                    <option value="Jun">Jun</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List Progress Bar Horizontal */}
            <div className="h-64 w-full overflow-y-auto pr-1 space-y-2.5">
              {k4List.length === 0 ? (
                <div className="flex items-center justify-center h-full text-xs text-slate-400">
                  Tidak ada data untuk filter terpilih.
                </div>
              ) : (
                k4List.map((item, idx) => {
                  const isHigh = item.persentaseTepatWaktu >= 90;
                  return (
                    <div
                      key={idx}
                      className="group p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
                      title={`Rata-rata Waktu Penyelesaian: ${item.rataRataWaktuJam} Jam (Standar SLA: ${item.standarSlaJam} Jam) | Total: ${item.totalDokumen} Dokumen`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1.5 min-w-0 pr-2">
                          <span className="text-[10px] font-mono px-1 py-0.2 bg-slate-100 text-slate-600 rounded">
                            {item.bidang === 'Industri' ? 'IND' : 'PDG'}
                          </span>
                          <span className="font-semibold text-slate-800 truncate text-[11px]">
                            {item.uraianIzin}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-slate-400 font-mono">
                            avg {item.rataRataWaktuJam}j / {item.standarSlaJam}j
                          </span>
                          <span
                            className={`font-mono font-black text-xs ${
                              isHigh ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {item.persentaseTepatWaktu}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHigh ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(item.persentaseTepatWaktu, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.ketepatanWaktuPelayanan.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.ketepatanWaktuPelayanan.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BARIS 3: KARTU 5 & KARTU 6                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ------------------------------------------------------------------ */}
        {/* KARTU 5: Realisasi Kuota Induk Barang Konsumsi                     */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Realisasi Kuota Induk Barang Konsumsi
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Perbandingan kuota SK vs realisasi pemasukan barang konsumsi per kode HS
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k5Summary.persen}%
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k5Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]" /> Kuota SK (Ton)
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Realisasi (Ton)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Tahun:</span>
                <select
                  value={k5Tahun}
                  onChange={(e) => setK5Tahun(e.target.value)}
                  className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            {/* Clustered Bar Horizontal Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={k5Data}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(val: number) => `${(val / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="displayLabel"
                    tick={{ fontSize: 10, fill: '#334155' }}
                    width={110}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(val: string) =>
                      val.length > 15 ? `${val.slice(0, 15)}…` : val
                    }
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload as KuotaIndukKonsumsiItem;
                      return (
                        <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-1.5 max-w-xs">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                            <span className="font-mono text-blue-600">[{item.kodeHs}]</span> {item.komoditas}
                          </div>
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex justify-between items-center text-slate-600">
                              <span>• Kuota SK:</span>
                              <span className="font-mono font-bold">
                                {item.kuotaTon.toLocaleString('id-ID')} {item.satuan}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-blue-700">
                              <span>• Realisasi:</span>
                              <span className="font-mono font-bold">
                                {item.realisasiTon.toLocaleString('id-ID')} {item.satuan}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-emerald-700 font-bold border-t border-slate-100 pt-1">
                              <span>Persentase Realisasi:</span>
                              <span className="font-mono font-black">{item.persentaseRealisasi}%</span>
                            </div>
                          </div>
                          <div className="pt-1 mt-1 border-t border-slate-100 text-[10px] text-slate-400 space-y-0.5">
                            <div>No SK: {item.noSk}</div>
                            <div>Tanggal SK: {item.tanggalSk}</div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="kuotaTon"
                    fill="#94a3b8"
                    name="Kuota SK (Ton)"
                    radius={[0, 3, 3, 0]}
                  />
                  <Bar
                    dataKey="realisasiTon"
                    fill="#2563eb"
                    name="Realisasi (Ton)"
                    radius={[0, 3, 3, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span className="truncate">{db.realisasiKuotaKonsumsi.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
              {db.realisasiKuotaKonsumsi.metadata.sifatData}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* KARTU 6: Sebaran KBLI Perusahaan Pemegang Izin Usaha Kawasan       */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            {/* Header: Judul & Angka Ringkasan */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Sebaran KBLI Perusahaan Pemegang Izin Usaha Kawasan
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  10 Klasifikasi Baku Lapangan Usaha Indonesia (KBLI) teratas di kawasan BP Batam
                </p>
              </div>

              <div className="flex items-baseline justify-end gap-1.5 shrink-0 self-end sm:self-auto text-right">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {k6Summary.totalPerusahaan.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  {k6Summary.keteranganBiru}
                </span>
              </div>
            </div>

            {/* Subheader / Legend */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2563eb]" /> Jumlah Badan Usaha / Perusahaan
              </span>
              <span className="text-[10px] text-slate-400">
                10 KBLI Dominan Kawasan
              </span>
            </div>

            {/* Horizontal Bar Chart (Top 10 KBLI) */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={k6Data}
                  layout="vertical"
                  margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="displayKbli"
                    tick={{ fontSize: 10, fill: '#334155' }}
                    width={110}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(val: string) =>
                      val.length > 15 ? `${val.slice(0, 15)}…` : val
                    }
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload as KbliPerusahaanIukItem;
                      return (
                        <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 shadow-md text-xs space-y-2 max-w-sm">
                          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex justify-between items-center">
                            <span>
                              <span className="font-mono text-blue-600 font-black">[{item.kodeKbli}]</span> {item.namaKbli}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-[11px] font-semibold">
                            <span className="text-slate-600">Jumlah Perusahaan:</span>
                            <span className="font-mono text-blue-700 font-bold">
                              {item.jumlahPerusahaan} Perusahaan ({item.porsiPersen}%)
                            </span>
                          </div>

                          {item.contohPerusahaan && item.contohPerusahaan.length > 0 && (
                            <div className="pt-1 border-t border-slate-100 text-[10px] space-y-1">
                              <span className="font-semibold text-slate-700 block">
                                Contoh Perusahaan Pemegang IUK:
                              </span>
                              {item.contohPerusahaan.map((c, idx) => (
                                <div key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100 text-slate-600">
                                  <div className="font-bold text-slate-800">{c.namaPerusahaan}</div>
                                  <div className="font-mono text-[9px] text-blue-600">No IUK: {c.noIzinUsahaKawasan}</div>
                                  <div className="text-[9px] text-slate-400">Kawasan: {c.lokasiKawasan}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="jumlahPerusahaan"
                    fill="#2563eb"
                    radius={[0, 4, 4, 0]}
                    name="Jumlah Perusahaan"
                  >
                    {k6Data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index < 3 ? '#2563eb' : '#3b82f6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="truncate">{db.sebaranKbliIuk.metadata.namaDataset}</span>
            </span>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {db.sebaranKbliIuk.metadata.sifatData}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DirektoratLaluLintasBarangDeepDive;
