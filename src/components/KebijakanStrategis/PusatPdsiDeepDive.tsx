import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  PDSI_VISUALISASI_DATA,
  OkupansiRakItem,
  ServerInfrastrukturItem,
  SeranganKeamananBulanItem,
  HelpdeskLayananItem,
  PortofolioAplikasiItem,
  LisensiSoftwareItem,
  KatalogDataItem,
  KepuasanPelangganDcItem,
} from './pusatPdsiData';
import { SheetSwapToggle } from '../SheetSwapToggle';

export const PusatPdsiDeepDive: React.FC = () => {
  // Sheet Swap States for 8 Cards
  const [rakViewMode, setRakViewMode] = useState<'chart' | 'table'>('chart');
  const [serverViewMode, setServerViewMode] = useState<'chart' | 'table'>('chart');
  const [seranganViewMode, setSeranganViewMode] = useState<'chart' | 'table'>('chart');
  const [helpdeskViewMode, setHelpdeskViewMode] = useState<'chart' | 'table'>('chart');
  const [aplikasiViewMode, setAplikasiViewMode] = useState<'chart' | 'table'>('chart');
  const [lisensiViewMode, setLisensiViewMode] = useState<'chart' | 'table'>('chart');
  const [katalogViewMode, setKatalogViewMode] = useState<'chart' | 'table'>('chart');
  const [kepuasanViewMode, setKepuasanViewMode] = useState<'chart' | 'table'>('chart');

  // Filters State for specific cards as requested
  const [filterTahunRak, setFilterTahunRak] = useState<string>('2026');
  const [filterTahunSerangan, setFilterTahunSerangan] = useState<string>('2026');
  const [filterTahunHelpdesk, setFilterTahunHelpdesk] = useState<string>('2026');
  const [filterBulanHelpdesk, setFilterBulanHelpdesk] = useState<string>('ALL');
  const [filterDomainAplikasi, setFilterDomainAplikasi] = useState<string>('ALL');
  const [filterUnitAplikasi, setFilterUnitAplikasi] = useState<string>('ALL');
  const [filterJenisLisensi, setFilterJenisLisensi] = useState<string>('ALL');
  const [filterTahunKatalog, setFilterTahunKatalog] = useState<string>('2026');
  const [filterJenisDataKatalog, setFilterJenisDataKatalog] = useState<string>('Semua');
  const [filterTahunKepuasan, setFilterTahunKepuasan] = useState<string>('2026');

  /* =========================================================================
   * KARTU 1: Okupansi Rak Data Center
   * ========================================================================= */
  const dataRak = useMemo(() => {
    return PDSI_VISUALISASI_DATA.okupansiRak[filterTahunRak] || PDSI_VISUALISASI_DATA.okupansiRak['2026'];
  }, [filterTahunRak]);

  const ringkasanRak = useMemo(() => {
    const totalSemua = dataRak.reduce((acc, r) => acc + r.totalRak, 0);
    const terisiSemua = dataRak.reduce((acc, r) => acc + r.jumlahRakTerisi, 0);
    const pct = totalSemua > 0 ? (terisiSemua / totalSemua) * 100 : 0;
    return {
      persentase: `${pct.toFixed(1).replace('.', ',')}%`,
      keterangan: `${terisiSemua} dari ${totalSemua} Rak Terisi`,
    };
  }, [dataRak]);

  /* =========================================================================
   * KARTU 2: Infrastruktur Server per Brand dan Status Garansi
   * ========================================================================= */
  const dataServer = useMemo(() => {
    return PDSI_VISUALISASI_DATA.serverInfrastruktur;
  }, []);

  const ringkasanServer = useMemo(() => {
    const garansiHabis = dataServer.reduce((acc, s) => acc + s.garansiHabis, 0);
    const total = dataServer.reduce((acc, s) => acc + s.total, 0);
    return {
      jumlahHabis: `${garansiHabis}`,
      keterangan: `Unit Garansi Habis (${total} Total Server)`,
    };
  }, [dataServer]);

  /* =========================================================================
   * KARTU 3: Serangan Keamanan IT per Bulan
   * ========================================================================= */
  const dataSerangan = useMemo(() => {
    return PDSI_VISUALISASI_DATA.seranganKeamanan[filterTahunSerangan] || PDSI_VISUALISASI_DATA.seranganKeamanan['2026'];
  }, [filterTahunSerangan]);

  const ringkasanSerangan = useMemo(() => {
    const total = dataSerangan.reduce((acc, s) => acc + s.totalSerangan, 0);
    return {
      totalFormatted: total.toLocaleString('id-ID'),
      keterangan: 'Total Serangan Terdeteksi & Dihalau',
    };
  }, [dataSerangan]);

  /* =========================================================================
   * KARTU 4: Permintaan Layanan IT (Helpdesk)
   * ========================================================================= */
  const dataHelpdesk = useMemo(() => {
    const raw = PDSI_VISUALISASI_DATA.helpdeskLayanan[filterTahunHelpdesk] || PDSI_VISUALISASI_DATA.helpdeskLayanan['2026'];
    const filtered = raw.filter((item) => {
      if (filterBulanHelpdesk !== 'ALL' && item.bulan !== 'ALL' && item.bulan !== filterBulanHelpdesk) return false;
      return true;
    });
    return [...filtered].sort((a, b) => b.jumlah - a.jumlah);
  }, [filterTahunHelpdesk, filterBulanHelpdesk]);

  const ringkasanHelpdesk = useMemo(() => {
    const total = dataHelpdesk.reduce((acc, h) => acc + h.jumlah, 0);
    return {
      totalFormatted: total.toLocaleString('id-ID'),
      keterangan: 'Total Tiket Permintaan Layanan',
    };
  }, [dataHelpdesk]);

  /* =========================================================================
   * KARTU 5: Portofolio Aplikasi per Kategori
   * ========================================================================= */
  const dataAplikasi = useMemo(() => {
    let raw = PDSI_VISUALISASI_DATA.portofolioAplikasi;
    if (filterDomainAplikasi !== 'ALL') {
      raw = raw.filter((a) => a.domain === filterDomainAplikasi);
    }
    if (filterUnitAplikasi !== 'ALL') {
      raw = raw.filter((a) => a.unitOperasional.toLowerCase().includes(filterUnitAplikasi.toLowerCase()));
    }
    return raw;
  }, [filterDomainAplikasi, filterUnitAplikasi]);

  const ringkasanAplikasi = useMemo(() => {
    const total = dataAplikasi.reduce((acc, a) => acc + a.total, 0);
    const aktif = dataAplikasi.reduce((acc, a) => acc + a.aktif, 0);
    return {
      totalFormatted: `${total}`,
      keterangan: `Total Sistem Aplikasi (${aktif} Aktif)`,
    };
  }, [dataAplikasi]);

  /* =========================================================================
   * KARTU 6: Validitas Lisensi Software
   * ========================================================================= */
  const dataLisensiFiltered = useMemo(() => {
    if (filterJenisLisensi === 'ALL') {
      return PDSI_VISUALISASI_DATA.lisensiSoftware;
    }
    return PDSI_VISUALISASI_DATA.lisensiSoftware.filter((l) => l.jenisLisensi === filterJenisLisensi);
  }, [filterJenisLisensi]);

  const ringkasanLisensi = useMemo(() => {
    const valid = dataLisensiFiltered.reduce((acc, l) => acc + l.valid, 0);
    const tidakValid = dataLisensiFiltered.reduce((acc, l) => acc + l.tidakValid, 0);
    const total = valid + tidakValid;
    const pct = total > 0 ? (valid / total) * 100 : 0;
    return {
      persentase: `${pct.toFixed(1).replace('.', ',')}%`,
      keterangan: `${valid} dari ${total} Lisensi Valid`,
      validCount: valid,
      tidakValidCount: tidakValid,
      totalCount: total,
    };
  }, [dataLisensiFiltered]);

  const donutLisensiData = useMemo(() => {
    return [
      { name: 'Lisensi Valid', value: ringkasanLisensi.validCount, color: '#10B981' },
      { name: 'Tidak Valid / Kedaluwarsa', value: ringkasanLisensi.tidakValidCount, color: '#F97316' },
    ];
  }, [ringkasanLisensi]);

  /* =========================================================================
   * KARTU 7: Katalog Data per Produsen Data
   * ========================================================================= */
  const dataKatalog = useMemo(() => {
    const raw = PDSI_VISUALISASI_DATA.katalogData[filterTahunKatalog] || PDSI_VISUALISASI_DATA.katalogData['2026'];
    if (filterJenisDataKatalog !== 'Semua') {
      return raw.filter((d) => d.jenisData === filterJenisDataKatalog);
    }
    return raw;
  }, [filterTahunKatalog, filterJenisDataKatalog]);

  const ringkasanKatalog = useMemo(() => {
    const total = dataKatalog.reduce((acc, d) => acc + d.total, 0);
    return {
      totalFormatted: `${total}`,
      keterangan: 'Total Dataset Terdaftar',
    };
  }, [dataKatalog]);

  /* =========================================================================
   * KARTU 8: Kepuasan Pelanggan Data Centre (100% Stacked Bar)
   * ========================================================================= */
  const dataKepuasan = useMemo(() => {
    return PDSI_VISUALISASI_DATA.kepuasanPelangganDc[filterTahunKepuasan] || PDSI_VISUALISASI_DATA.kepuasanPelangganDc['2026'];
  }, [filterTahunKepuasan]);

  const ringkasanKepuasan = useMemo(() => {
    if (dataKepuasan.length === 0) return { persentase: '0%', keterangan: 'Tidak Ada Data' };
    const avgPuas = dataKepuasan.reduce((acc, k) => acc + k.puas, 0) / dataKepuasan.length;
    return {
      persentase: `${avgPuas.toFixed(1).replace('.', ',')}%`,
      keterangan: 'Rerata Pelanggan Puas (Mutu Sangat Baik)',
    };
  }, [dataKepuasan]);

  return (
    <div className="w-full space-y-4 font-sans text-slate-800">
      {/* =====================================================================
       * GRID 2 KOLOM x 4 BARIS (TOTAL 8 KARTU GRAFIK BERUKURAN SAMA)
       * ===================================================================== */}

      {/* ---------------------------------------------------------------------
       * BARIS 1: KARTU 1 & KARTU 2
       * --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KARTU 1: Okupansi Rak Data Center */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Okupansi Rak Data Center
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                    <span>Rak Terisi (&le;90%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#EA580C]" />
                    <span>Terisi Kritis (&gt;90%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#CBD5E1]" />
                    <span>Rak Kosong</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanRak.persentase}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanRak.keterangan}
                  </span>
                </div>

                {/* Filter Tahun & Sheet Swap Toggle */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-[10px] text-slate-400 font-medium">Tahun:</span>
                  {PDSI_VISUALISASI_DATA.tahunAnggaranList.map((th) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setFilterTahunRak(th)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                        filterTahunRak === th
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                  <SheetSwapToggle mode={rakViewMode} onChange={setRakViewMode} className="ml-1" />
                </div>
              </div>
            </div>

            {/* Visualisasi: Stacked Bar Horizontal / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {rakViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataRak}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="ruanganShort"
                      width={130}
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as OkupansiRakItem;
                          const isKritis = item.persentaseTerisi > 90;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.ruangan}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Jenis Rak: <strong className="text-slate-800">{item.jenisRak}</strong>
                              </div>
                              <div className="text-[11px] font-mono text-slate-700">
                                Total Rak: <strong>{item.totalRak} Rak</strong>
                              </div>
                              <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 text-[11px] font-mono">
                                <span className={isKritis ? 'text-orange-600 font-bold' : 'text-blue-600 font-bold'}>
                                  Terisi: {item.jumlahRakTerisi} ({item.persentaseTerisi}%)
                                </span>
                                <span className="text-slate-500">Kosong: {item.jumlahRakKosong}</span>
                              </div>
                              {isKritis && (
                                <div className="text-[10px] font-semibold text-orange-600 pt-0.5">
                                  &#9888; Peringatan: Okupansi &gt; 90% (Kapasitas Kritis)
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="jumlahRakTerisi" stackId="rak" radius={[0, 0, 0, 0]} barSize={16}>
                      {dataRak.map((entry, index) => (
                        <Cell
                          key={`rak-cell-${index}`}
                          fill={entry.persentaseTerisi > 90 ? '#EA580C' : '#2563EB'}
                        />
                      ))}
                    </Bar>
                    <Bar dataKey="jumlahRakKosong" stackId="rak" fill="#CBD5E1" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Ruangan Data Center</th>
                        <th className="py-1.5 px-2">Jenis Rak</th>
                        <th className="py-1.5 px-1.5 text-right">Total Rak</th>
                        <th className="py-1.5 px-1.5 text-right">Rak Terisi</th>
                        <th className="py-1.5 px-1.5 text-right">Rak Kosong</th>
                        <th className="py-1.5 px-1.5 text-right">% Terisi</th>
                        <th className="py-1.5 px-1.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataRak.map((r, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{r.ruangan}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{r.jenisRak}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-800">{r.totalRak}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{r.jumlahRakTerisi}</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-500">{r.jumlahRakKosong}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold">
                            <span className={r.persentaseTerisi > 90 ? 'text-orange-600' : 'text-blue-700'}>
                              {r.persentaseTerisi}%
                            </span>
                          </td>
                          <td className="py-1.5 px-1.5 text-center font-sans">
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                              r.persentaseTerisi > 90 ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {r.persentaseTerisi > 90 ? 'Kritis' : 'Optimal'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 1 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Terbatas
              </span>
              <span>Data Rak Data Center (Terbatas, pertahun)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Pusat Data BIDA &amp; DRC Sekupang</span>
          </div>
        </div>

        {/* KARTU 2: Infrastruktur Server per Brand dan Status Garansi */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan (Habis Garansi = Oranye) */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Infrastruktur Server per Brand &amp; Garansi
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]" />
                    <span>Garansi Aktif</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F97316]" />
                    <span>Garansi Habis (Wajib Peremajaan)</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-orange-600 font-mono">
                    {ringkasanServer.jumlahHabis}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanServer.keterangan}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-[10px] text-slate-400 font-mono">100 Nodes</span>
                  <SheetSwapToggle mode={serverViewMode} onChange={setServerViewMode} />
                </div>
              </div>
            </div>

            {/* Visualisasi: Stacked Bar Horizontal / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {serverViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataServer}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="brand"
                      width={130}
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as ServerInfrastrukturItem;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.brand} ({item.total} Server)
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Nama Server: <strong className="text-slate-800 font-mono">{item.contohServer}</strong>
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Tipe: <strong>{item.tipePopuler}</strong>
                              </div>
                              <div className="text-[11px] text-slate-600 font-mono">
                                Tgl Garansi: <strong>{item.tglGaransiTerdekat}</strong> | EOS: <strong>{item.eosRerata}</strong>
                              </div>
                              <div className="flex items-center gap-3 pt-1 border-t border-slate-100 text-[11px] font-mono">
                                <span className="text-emerald-600 font-bold">Aktif: {item.garansiAktif}</span>
                                <span className="text-orange-600 font-bold">Habis: {item.garansiHabis}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="garansiAktif" stackId="garansi" fill="#10B981" barSize={16} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="garansiHabis" stackId="garansi" fill="#F97316" barSize={16} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Brand Server</th>
                        <th className="py-1.5 px-1.5 text-right">Garansi Aktif</th>
                        <th className="py-1.5 px-1.5 text-right">Garansi Habis</th>
                        <th className="py-1.5 px-1.5 text-right">Total Unit</th>
                        <th className="py-1.5 px-2">Tipe Populer</th>
                        <th className="py-1.5 px-1.5 text-center">EOS Rerata</th>
                        <th className="py-1.5 px-2">Contoh Node Host</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataServer.map((s, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{s.brand}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-emerald-700">{s.garansiAktif}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-orange-600">{s.garansiHabis}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{s.total}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{s.tipePopuler}</td>
                          <td className="py-1.5 px-1.5 text-center text-slate-500">{s.eosRerata}</td>
                          <td className="py-1.5 px-2 font-sans text-[10px] text-slate-500 truncate max-w-[140px]" title={s.contohServer}>
                            {s.contohServer}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 2 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Tertutup
              </span>
              <span>Rekap Infrastruktur Server dan Storage (Tertutup, jika update)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Total 100 Physical Nodes</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
       * BARIS 2: KARTU 3 & KARTU 4
       * --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KARTU 3: Serangan Keamanan IT per Bulan */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Serangan Keamanan IT per Bulan
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center flex-wrap gap-2.5 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                    <span>DDoS Flooding</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#0EA5E9]" />
                    <span>Web Exploit</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#8B5CF6]" />
                    <span>Malware/Trojan</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F59E0B]" />
                    <span>Brute Force</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748B]" />
                    <span>Port Scanning</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanSerangan.totalFormatted}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanSerangan.keterangan}
                  </span>
                </div>

                {/* Filter Tahun & Sheet Swap */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-[10px] text-slate-400 font-medium mr-1">Tahun:</span>
                  {PDSI_VISUALISASI_DATA.tahunAnggaranList.map((th) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setFilterTahunSerangan(th)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                        filterTahunSerangan === th
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                  <SheetSwapToggle mode={seranganViewMode} onChange={setSeranganViewMode} className="ml-1" />
                </div>
              </div>
            </div>

            {/* Visualisasi: Stacked Column / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {seranganViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataSerangan}
                    margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="bulan"
                      tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as SeranganKeamananBulanItem;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                Periode: {item.bulanFull}
                              </div>
                              <div className="text-[11px] text-emerald-700 font-semibold">
                                Status Keamanan: {item.statusKeamanan}
                              </div>
                              <div className="space-y-0.5 pt-1 text-[11px] font-mono text-slate-700">
                                <div className="flex justify-between gap-4">
                                  <span className="text-blue-600">DDoS Volumetric:</span>
                                  <strong>{item.ddosVolumetric}</strong>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-sky-600">Web Exploit/SQLi:</span>
                                  <strong>{item.webExploit}</strong>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-purple-600">Malware &amp; Trojan:</span>
                                  <strong>{item.malwareTrojan}</strong>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-amber-600">Brute Force Auth:</span>
                                  <strong>{item.bruteForce}</strong>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-500">Port Scanning:</span>
                                  <strong>{item.portScanning}</strong>
                                </div>
                              </div>
                              <div className="pt-1 border-t border-slate-100 flex justify-between font-bold text-slate-900 font-mono text-xs">
                                <span>Total Serangan:</span>
                                <span>{item.totalSerangan.toLocaleString('id-ID')}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="ddosVolumetric" stackId="threat" fill="#2563EB" barSize={18} />
                    <Bar dataKey="webExploit" stackId="threat" fill="#0EA5E9" barSize={18} />
                    <Bar dataKey="malwareTrojan" stackId="threat" fill="#8B5CF6" barSize={18} />
                    <Bar dataKey="bruteForce" stackId="threat" fill="#F59E0B" barSize={18} />
                    <Bar dataKey="portScanning" stackId="threat" fill="#64748B" radius={[4, 4, 0, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Bulan</th>
                        <th className="py-1.5 px-1.5 text-right">DDoS</th>
                        <th className="py-1.5 px-1.5 text-right">Web Exploit</th>
                        <th className="py-1.5 px-1.5 text-right">Malware</th>
                        <th className="py-1.5 px-1.5 text-right">Brute Force</th>
                        <th className="py-1.5 px-1.5 text-right">Port Scan</th>
                        <th className="py-1.5 px-1.5 text-right">Total Serangan</th>
                        <th className="py-1.5 px-2 text-center">Mitigasi CSIRT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataSerangan.map((s, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{s.bulanFull}</td>
                          <td className="py-1.5 px-1.5 text-right text-blue-700">{s.ddosVolumetric.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right text-sky-700">{s.webExploit.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right text-purple-700">{s.malwareTrojan.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right text-amber-600">{s.bruteForce.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-500">{s.portScanning.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{s.totalSerangan.toLocaleString('id-ID')}</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {s.statusKeamanan}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 3 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Terbuka
              </span>
              <span>Data Serangan Keamanan IT (Terbuka, perbulan)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">SOC CSIRT BP Batam • 24/7 Monitoring</span>
          </div>
        </div>

        {/* KARTU 4: Permintaan Layanan IT (Helpdesk) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Permintaan Layanan IT (Helpdesk)
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                    <span>Jumlah Tiket Permintaan (Urut Tertinggi)</span>
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-emerald-700 font-semibold text-[11px]">SLA Tercapai: 98,2%</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanHelpdesk.totalFormatted}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanHelpdesk.keterangan}
                  </span>
                </div>

                {/* Filter Bulan, Tahun & Sheet Swap */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <select
                    aria-label="Filter Bulan Helpdesk"
                    value={filterBulanHelpdesk}
                    onChange={(e) => setFilterBulanHelpdesk(e.target.value)}
                    className="text-[10px] font-semibold bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">Semua Bulan</option>
                    <option value="Jan">Januari</option>
                    <option value="Feb">Februari</option>
                    <option value="Mar">Maret</option>
                    <option value="Apr">April</option>
                  </select>

                  <div className="inline-flex items-center gap-0.5">
                    {['2026', '2025'].map((th) => (
                      <button
                        key={th}
                        type="button"
                        onClick={() => setFilterTahunHelpdesk(th)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                          filterTahunHelpdesk === th
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {th}
                      </button>
                    ))}
                  </div>

                  <SheetSwapToggle mode={helpdeskViewMode} onChange={setHelpdeskViewMode} />
                </div>
              </div>
            </div>

            {/* Visualisasi: Bar Horizontal Urut dari Tertinggi / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {helpdeskViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataHelpdesk}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 15, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="namaLayanan"
                      width={140}
                      tickFormatter={(v: string) => (v.length > 22 ? `${v.slice(0, 20)}...` : v)}
                      tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as HelpdeskLayananItem;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.namaLayanan}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Kategori: <strong>{item.kategori}</strong>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-[11px] font-mono pt-1 border-t border-slate-100">
                                <span className="text-blue-600 font-bold">Total: {item.jumlah} Tiket</span>
                                <span className="text-emerald-600 font-semibold">Terselesaikan: {item.tingkatPenyelesaian}%</span>
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                Rerata Durasi Resolusi (SLA): <strong>{item.avgSlaJam} Jam</strong>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="jumlah" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Nama Layanan IT</th>
                        <th className="py-1.5 px-2">Kategori</th>
                        <th className="py-1.5 px-1.5 text-right">Jumlah Tiket</th>
                        <th className="py-1.5 px-1.5 text-right">Rerata SLA (Jam)</th>
                        <th className="py-1.5 px-1.5 text-right">% Selesai</th>
                        <th className="py-1.5 px-1.5 text-center">Periode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataHelpdesk.map((h, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{h.namaLayanan}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{h.kategori}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{h.jumlah}</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-600">{h.avgSlaJam} Jam</td>
                          <td className="py-1.5 px-1.5 text-right">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700">
                              {h.tingkatPenyelesaian}%
                            </span>
                          </td>
                          <td className="py-1.5 px-1.5 text-center text-slate-500 font-sans">{h.bulan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 4 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Tertutup
              </span>
              <span>Data Permintaan Layanan IT (Helpdesk) (Tertutup, perbulan)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Portal Tiket IT Helpdesk Internal</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
       * BARIS 3: KARTU 5 & KARTU 6
       * --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KARTU 5: Portofolio Aplikasi per Kategori */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Portofolio Aplikasi per Kategori
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                    <span>Aktif</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F59E0B]" />
                    <span>Dalam Pengembangan</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#94A3B8]" />
                    <span>Nonaktif</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanAplikasi.totalFormatted}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanAplikasi.keterangan}
                  </span>
                </div>

                {/* Filter Domain & Unit Operasional + Sheet Swap */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <select
                    aria-label="Filter Domain Aplikasi"
                    value={filterDomainAplikasi}
                    onChange={(e) => setFilterDomainAplikasi(e.target.value)}
                    className="text-[10px] font-semibold bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">Semua Domain</option>
                    <option value="Layanan Publik">Layanan Publik</option>
                    <option value="Tata Kelola Manajemen">Tata Kelola</option>
                    <option value="Layanan Bisnis/BLU">Layanan Bisnis</option>
                  </select>

                  <select
                    aria-label="Filter Unit Aplikasi"
                    value={filterUnitAplikasi}
                    onChange={(e) => setFilterUnitAplikasi(e.target.value)}
                    className="text-[10px] font-semibold bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">Semua Unit</option>
                    <option value="PTSP">PTSP</option>
                    <option value="Keuangan">Biro Keuangan</option>
                    <option value="Pertanahan">Pertanahan</option>
                    <option value="Umum">Biro Umum</option>
                  </select>

                  <SheetSwapToggle mode={aplikasiViewMode} onChange={setAplikasiViewMode} />
                </div>
              </div>
            </div>

            {/* Visualisasi: Stacked Bar Horizontal / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {aplikasiViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataAplikasi}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="kategoriShort"
                      width={130}
                      tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as PortofolioAplikasiItem;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.kategori}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Domain: <strong>{item.domain}</strong>
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Klasifikasi Aplikasi: <strong>{item.klasifikasiAplikasi}</strong>
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Unit Pengembang: <strong>{item.unitPengembang}</strong> ({item.devYear})
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Unit Operasional: <strong>{item.unitOperasional}</strong>
                              </div>
                              <div className="flex items-center gap-3 pt-1 border-t border-slate-100 text-[11px] font-mono">
                                <span className="text-blue-600 font-bold">Aktif: {item.aktif}</span>
                                <span className="text-amber-600 font-bold">Dev: {item.dalamPengembangan}</span>
                                <span className="text-slate-500 font-bold">Nonaktif: {item.nonaktif}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="aktif" stackId="statusApp" fill="#2563EB" barSize={16} />
                    <Bar dataKey="dalamPengembangan" stackId="statusApp" fill="#F59E0B" barSize={16} />
                    <Bar dataKey="nonaktif" stackId="statusApp" fill="#94A3B8" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Kategori Aplikasi</th>
                        <th className="py-1.5 px-2">Domain</th>
                        <th className="py-1.5 px-2">Unit Operasional</th>
                        <th className="py-1.5 px-1.5 text-right">Aktif</th>
                        <th className="py-1.5 px-1.5 text-right">Dev</th>
                        <th className="py-1.5 px-1.5 text-right">Nonaktif</th>
                        <th className="py-1.5 px-1.5 text-right">Total</th>
                        <th className="py-1.5 px-2">Klasifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataAplikasi.map((a, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{a.kategori}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{a.domain}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{a.unitOperasional}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{a.aktif}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-amber-600">{a.dalamPengembangan}</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-400">{a.nonaktif}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{a.total}</td>
                          <td className="py-1.5 px-2 font-sans text-[10px] text-slate-500 truncate max-w-[130px]" title={a.klasifikasiAplikasi}>
                            {a.klasifikasiAplikasi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 5 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Tertutup
              </span>
              <span>Data Aplikasi BP Batam (Tertutup, jika update)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Audit &amp; Inventarisasi Arsitektur SPBE</span>
          </div>
        </div>

        {/* KARTU 6: Validitas Lisensi Software (Donut Chart) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Validitas Lisensi Software
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span>Lisensi Valid</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    <span>Tidak Valid / Kedaluwarsa</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanLisensi.persentase}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanLisensi.keterangan}
                  </span>
                </div>

                {/* Filter Jenis Lisensi & Sheet Swap */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <select
                    aria-label="Filter Kategori Lisensi"
                    value={filterJenisLisensi}
                    onChange={(e) => setFilterJenisLisensi(e.target.value)}
                    className="text-[10px] font-semibold bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer max-w-[150px] truncate"
                  >
                    <option value="ALL">Semua Jenis Lisensi</option>
                    {PDSI_VISUALISASI_DATA.lisensiSoftware.map((l, idx) => (
                      <option key={idx} value={l.jenisLisensi}>
                        {l.jenisLisensi.split('(')[0].trim()}
                      </option>
                    ))}
                  </select>

                  <SheetSwapToggle mode={lisensiViewMode} onChange={setLisensiViewMode} />
                </div>
              </div>
            </div>

            {/* Visualisasi: Donut Chart / Detail Table */}
            <div className="h-56 w-full mt-2 relative flex items-center justify-center overflow-hidden">
              {lisensiViewMode === 'chart' ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutLisensiData}
                        innerRadius={58}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {donutLisensiData.map((entry, index) => (
                          <Cell key={`donut-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const item = payload[0];
                            return (
                              <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                                <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                  {item.name}
                                </div>
                                <div className="text-[11px] font-mono text-slate-700">
                                  Jumlah: <strong>{item.value} Lisensi</strong>
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  Porsi:{' '}
                                  <strong>
                                    {((Number(item.value) / (ringkasanLisensi.totalCount || 1)) * 100).toFixed(1)}%
                                  </strong>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Teks di tengah Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono leading-none">
                      {ringkasanLisensi.persentase}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider mt-0.5">
                      Valid Aktif
                    </span>
                  </div>
                </>
              ) : (
                <div className="h-full w-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Jenis Lisensi</th>
                        <th className="py-1.5 px-2">Tipe Software</th>
                        <th className="py-1.5 px-2">Pemilik / Unit</th>
                        <th className="py-1.5 px-1.5 text-right">Valid</th>
                        <th className="py-1.5 px-1.5 text-right">Kedaluwarsa</th>
                        <th className="py-1.5 px-1.5 text-right">Total</th>
                        <th className="py-1.5 px-2">Contoh Software</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataLisensiFiltered.map((l, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{l.jenisLisensi}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{l.tipeSoftware}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{l.pemilikLisensi}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-emerald-700">{l.valid}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-orange-600">{l.tidakValid}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{l.total}</td>
                          <td className="py-1.5 px-2 font-sans text-[10px] text-slate-500 truncate max-w-[130px]" title={l.contohSoftware}>
                            {l.contohSoftware}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 6 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Tertutup
              </span>
              <span>Daftar Software BP Batam (Tertutup, jika update)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Total {ringkasanLisensi.totalCount} Lisensi Enterprise</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
       * BARIS 4: KARTU 7 & KARTU 8
       * --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* KARTU 7: Katalog Data per Produsen Data */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Katalog Data per Produsen Data
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]" />
                    <span>Terbuka (Publik)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
                    <span>Terbatas (Antar Instansi)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#64748B]" />
                    <span>Tertutup (Rahasia)</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanKatalog.totalFormatted}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanKatalog.keterangan}
                  </span>
                </div>

                {/* Filter Tahun & Jenis Data + Sheet Swap */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <select
                    aria-label="Filter Jenis Data Katalog"
                    value={filterJenisDataKatalog}
                    onChange={(e) => setFilterJenisDataKatalog(e.target.value)}
                    className="text-[10px] font-semibold bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                  >
                    <option value="Semua">Semua Jenis Data</option>
                    <option value="Spasial">Spasial GIS</option>
                    <option value="Statistik">Statistik</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Operasional">Operasional</option>
                  </select>

                  <div className="inline-flex items-center gap-0.5">
                    {['2026', '2025'].map((th) => (
                      <button
                        key={th}
                        type="button"
                        onClick={() => setFilterTahunKatalog(th)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                          filterTahunKatalog === th
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {th}
                      </button>
                    ))}
                  </div>

                  <SheetSwapToggle mode={katalogViewMode} onChange={setKatalogViewMode} />
                </div>
              </div>
            </div>

            {/* Visualisasi: Stacked Bar Horizontal / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {katalogViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataKatalog}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="produsenShort"
                      width={130}
                      tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as KatalogDataItem;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.produsenData}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Kategori Data: <strong>{item.kategoriData}</strong>
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Jenis Data: <strong>{item.jenisData}</strong>
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Pemutakhiran: <strong>{item.pemutakhiranData}</strong>
                              </div>
                              <div className="flex items-center gap-3 pt-1 border-t border-slate-100 text-[11px] font-mono">
                                <span className="text-emerald-600 font-bold">Terbuka: {item.terbuka}</span>
                                <span className="text-blue-600 font-bold">Terbatas: {item.terbatas}</span>
                                <span className="text-slate-500 font-bold">Tertutup: {item.tertutup}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono">
                                Total: <strong>{item.total} Dataset</strong>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="terbuka" stackId="klasifikasi" fill="#10B981" barSize={14} />
                    <Bar dataKey="terbatas" stackId="klasifikasi" fill="#2563EB" barSize={14} />
                    <Bar dataKey="tertutup" stackId="klasifikasi" fill="#64748B" radius={[0, 4, 4, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Produsen Data (Satker)</th>
                        <th className="py-1.5 px-2">Kategori Data</th>
                        <th className="py-1.5 px-1.5 text-center">Jenis</th>
                        <th className="py-1.5 px-1.5 text-right">Terbuka</th>
                        <th className="py-1.5 px-1.5 text-right">Terbatas</th>
                        <th className="py-1.5 px-1.5 text-right">Tertutup</th>
                        <th className="py-1.5 px-1.5 text-right">Total</th>
                        <th className="py-1.5 px-2">Siklus Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataKatalog.map((k, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{k.produsenData}</td>
                          <td className="py-1.5 px-2 font-sans text-slate-600">{k.kategoriData}</td>
                          <td className="py-1.5 px-1.5 text-center font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">
                              {k.jenisData}
                            </span>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-emerald-700">{k.terbuka}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-blue-700">{k.terbatas}</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-400">{k.tertutup}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{k.total}</td>
                          <td className="py-1.5 px-2 font-sans text-[10px] text-slate-500">{k.pemutakhiranData}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 7 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Terbatas
              </span>
              <span>Daftar Data BP Batam (Terbatas, jika update)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Portal Satu Data Indonesia (SDI)</span>
          </div>
        </div>

        {/* KARTU 8: Kepuasan Pelanggan Data Centre (100% Stacked Bar Horizontal) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: Judul Kiri, Angka Ringkasan Kanan */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Kepuasan Pelanggan Data Centre
                </h4>
                {/* Legenda di bawah judul */}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]" />
                    <span>Puas (&ge;85%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#94A3B8]" />
                    <span>Netral</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F97316]" />
                    <span>Tidak Puas</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {ringkasanKepuasan.persentase}
                  </span>
                  <span className="text-xs text-[#2563EB] font-semibold">
                    {ringkasanKepuasan.keterangan}
                  </span>
                </div>

                {/* Filter Tahun & Sheet Swap */}
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-[10px] text-slate-400 font-medium mr-1">Tahun:</span>
                  {['2026', '2025'].map((th) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setFilterTahunKepuasan(th)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                        filterTahunKepuasan === th
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                  <SheetSwapToggle mode={kepuasanViewMode} onChange={setKepuasanViewMode} />
                </div>
              </div>
            </div>

            {/* Visualisasi: Stacked Bar Horizontal 100% / Detail Table */}
            <div className="h-56 w-full mt-2 overflow-hidden">
              {kepuasanViewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataKepuasan}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'monospace' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="kategoriShort"
                      width={130}
                      tick={{ fontSize: 9.5, fill: '#334155', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as KepuasanPelangganDcItem;
                          return (
                            <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-md text-xs space-y-1">
                              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                                {item.kategori}
                              </div>
                              <div className="text-[11px] text-slate-600">
                                Skor Rerata: <strong className="text-slate-900">{item.skor} / 5,00</strong>
                              </div>
                              <div className="space-y-0.5 pt-1 text-[11px] font-mono">
                                <div className="flex justify-between gap-4 text-emerald-600 font-bold">
                                  <span>Puas:</span>
                                  <span>{item.puas}%</span>
                                </div>
                                <div className="flex justify-between gap-4 text-slate-500 font-semibold">
                                  <span>Netral:</span>
                                  <span>{item.netral}%</span>
                                </div>
                                <div className="flex justify-between gap-4 text-orange-600 font-bold">
                                  <span>Tidak Puas:</span>
                                  <span>{item.tidakPuas}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="puas" stackId="kepuasan" fill="#10B981" barSize={16} />
                    <Bar dataKey="netral" stackId="kepuasan" fill="#94A3B8" barSize={16} />
                    <Bar dataKey="tidakPuas" stackId="kepuasan" fill="#F97316" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-y-auto overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-[10.5px]">
                    <thead className="bg-slate-100 sticky top-0 font-bold text-slate-700 border-b border-slate-200 z-10">
                      <tr>
                        <th className="py-1.5 px-2">Kategori Layanan DC</th>
                        <th className="py-1.5 px-1.5 text-right">% Puas</th>
                        <th className="py-1.5 px-1.5 text-right">% Netral</th>
                        <th className="py-1.5 px-1.5 text-right">% Tidak Puas</th>
                        <th className="py-1.5 px-1.5 text-right">Skor (1-5)</th>
                        <th className="py-1.5 px-2 text-center">Predikat Mutu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-700">
                      {dataKepuasan.map((k, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/40">
                          <td className="py-1.5 px-2 font-sans font-semibold text-slate-900">{k.kategori}</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-emerald-700">{k.puas}%</td>
                          <td className="py-1.5 px-1.5 text-right text-slate-500">{k.netral}%</td>
                          <td className="py-1.5 px-1.5 text-right text-orange-600 font-semibold">{k.tidakPuas}%</td>
                          <td className="py-1.5 px-1.5 text-right font-bold text-slate-900">{k.skor.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {k.puas >= 90 ? 'Sangat Puas' : 'Puas'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Footer Kartu 8 */}
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Terbuka
              </span>
              <span>Data Kepuasan Pelanggan Data Centre (Terbuka, pertahun)</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Survei Berkala Tenant Colocation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
