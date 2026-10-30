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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  PEMANFAATAN_ASET_DATA,
} from './badanUsahaPemanfaatanAsetData';
import {
  ShieldAlert,
  Users,
  Building,
  Flame,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';

// Custom Tooltip for Chart #10 with detailed Info (Lokasi, Personil, Hasil Kegiatan)
const CustomSubditTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const rawData = payload[0]?.payload;
    const tooltipInfo = rawData?.tooltipInfo;
    const totalKegiatan =
      (rawData?.patroliRutin || 0) +
      (rawData?.pengamananBatas || 0) +
      (rawData?.penindakanPelanggaran || 0) +
      (rawData?.operasiPenertiban || 0);

    return (
      <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-md text-xs space-y-1.5 max-w-xs font-sans">
        <div className="font-bold text-blue-900 border-b border-blue-100 pb-1 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">
            {totalKegiatan} Kegiatan
          </span>
        </div>
        <div className="space-y-0.5 text-slate-700 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Patroli Rutin Obvit:</span>
            <span className="font-semibold text-blue-700 font-mono">{rawData?.patroliRutin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Pengamanan Batas:</span>
            <span className="font-semibold text-sky-600 font-mono">{rawData?.pengamananBatas}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Penindakan Pelanggaran:</span>
            <span className="font-semibold text-indigo-600 font-mono">{rawData?.penindakanPelanggaran}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Operasi Penertiban:</span>
            <span className="font-semibold text-amber-600 font-mono">{rawData?.operasiPenertiban}</span>
          </div>
        </div>
        {tooltipInfo && (
          <div className="pt-1.5 border-t border-slate-100 text-[10px] space-y-1 text-slate-600">
            <div>
              <strong className="text-slate-800">Lokasi: </strong>
              <span>{tooltipInfo.lokasi}</span>
            </div>
            <div>
              <strong className="text-slate-800">Personil: </strong>
              <span>{tooltipInfo.personil}</span>
            </div>
            <div>
              <strong className="text-slate-800">Hasil: </strong>
              <span className="text-emerald-700 font-medium">{tooltipInfo.hasilKegiatan}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const BadanUsahaPemanfaatanAsetVisualizer: React.FC = () => {
  // Filters for Chart #2: Lokasi dengan bangunan liar terbanyak
  const [filterTahun2, setFilterTahun2] = useState<string>('SEMUA');
  const [filterSemester2, setFilterSemester2] = useState<string>('SEMUA');

  // Filters for Table #5: Hasil penertiban per lokasi
  const [filterInisiator5, setFilterInisiator5] = useState<string>('SEMUA');
  const [filterTahun5, setFilterTahun5] = useState<string>('SEMUA');

  const dataA = PEMANFAATAN_ASET_DATA.penertibanBangunanLiar;
  const dataB = PEMANFAATAN_ASET_DATA.penggarapDanNelayanLiar;
  const dataC = PEMANFAATAN_ASET_DATA.penindakanDanPengamananAset;
  const dataD = PEMANFAATAN_ASET_DATA.proteksiKebakaranBangunanAset;

  // Filtered dataset for Chart #2 & its table
  const filteredLokasi2 = useMemo(() => {
    return dataA.lokasiBangunanLiar.filter((item) => {
      if (filterTahun2 !== 'SEMUA' && item.tahun !== filterTahun2) return false;
      if (filterSemester2 !== 'SEMUA' && item.semester !== filterSemester2) return false;
      return true;
    });
  }, [dataA.lokasiBangunanLiar, filterTahun2, filterSemester2]);

  // Filtered dataset for Table #5
  const filteredHasil5 = useMemo(() => {
    return dataA.hasilPenertibanLokasi.filter((item) => {
      if (filterInisiator5 !== 'SEMUA' && item.inisiator !== filterInisiator5) return false;
      if (filterTahun5 !== 'SEMUA' && item.tahun !== filterTahun5) return false;
      return true;
    });
  }, [dataA.hasilPenertibanLokasi, filterInisiator5, filterTahun5]);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* ==================================================================== */}
      {/* A. PENERTIBAN BANGUNAN LIAR                                          */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        {/* Section Header Banner */}
        <div className="flex items-center gap-2.5 pb-2 border-b-2 border-blue-600">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
            A
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-blue-950 font-mono">
              A. PENERTIBAN BANGUNAN LIAR
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">
              Sumber: Data Penertiban Bangunan Liar &amp; Rekap Kegiatan Penertiban Rutin / Tim Terpadu BP Batam
            </p>
          </div>
        </div>

        {/* Grid Baris 1: Grafik 1 (Stacked Column) & Grafik 4 (Donut Objek Penertiban) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Grafik 1: Bangunan liar yang ditertibkan per semester (Stacked Column) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  1. Bangunan Liar yang Ditertibkan per Semester
                </h3>
                <p className="text-[10px] text-slate-500">
                  Jenis: Stacked Column &bull; Sumbu X: Semester-Tahun &bull; Segmen: Jenis Bangunan
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                Data Penertiban
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataA.bangunanDitertibkanPerSemester}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#334155' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Unit`, name]}
                    contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                  <Bar dataKey="rumahTinggal" name="Rumah Tinggal" stackId="a" fill="#1E40AF" />
                  <Bar dataKey="kiosWarung" name="Kios & Warung" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="gudangBengkel" name="Gudang & Bengkel" stackId="a" fill="#60A5FA" />
                  <Bar dataKey="posBagan" name="Pos & Bagan Liar" stackId="a" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 4: Objek penertiban (Donut Chart) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  4. Objek Penertiban
                </h3>
                <p className="text-[10px] text-slate-500">
                  Jenis: Donut Chart &bull; Tampilkan Persentase Komposisi Objek
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                1.567 Total Objek
              </span>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Objek`, name]}
                    contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    layout="horizontal"
                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                  />
                  <Pie
                    data={dataA.objekPenertiban}
                    dataKey="jumlah"
                    nameKey="kategori"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {dataA.objekPenertiban.map((entry, index) => (
                      <Cell key={`cell-objek-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Grafik 3: Penertiban rutin dan tim terpadu per semester (Clustered Column) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                3. Penertiban Rutin dan Tim Terpadu per Semester
              </h3>
              <p className="text-[10px] text-slate-500">
                Jenis: Clustered Column &bull; Sumbu X: Semester-Tahun &bull; Batang: Rutin vs Tim Terpadu
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Rekap Rutin &amp; Tim Terpadu
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataA.rekapRutinDanTimTerpadu}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} Kegiatan`, name]}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                />
                <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                <Bar dataKey="rutin" name="Penertiban Rutin" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="timTerpadu" name="Tim Terpadu (Gabungan)" fill="#0284C7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik 2: Lokasi dengan bangunan liar terbanyak (10 Teratas Horizontal Bar + Filter + Tabel) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                2. Lokasi dengan Bangunan Liar Terbanyak (10 Teratas)
              </h3>
              <p className="text-[10px] text-slate-500">
                Jenis: Horizontal Bar &bull; Sumbu Y: Lokasi &bull; Sumbu X: Jumlah Bangunan &bull; Filter: Tahun &amp; Semester
              </p>
            </div>

            {/* Filter Dropdown Tahun & Semester */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                <Filter className="w-3 h-3 text-blue-600" />
                <span className="font-semibold text-slate-600">Tahun:</span>
                <select
                  value={filterTahun2}
                  onChange={(e) => setFilterTahun2(e.target.value)}
                  className="bg-transparent font-bold text-blue-900 outline-none cursor-pointer"
                >
                  <option value="SEMUA">Semua</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              <div className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-600">Semester:</span>
                <select
                  value={filterSemester2}
                  onChange={(e) => setFilterSemester2(e.target.value)}
                  className="bg-transparent font-bold text-blue-900 outline-none cursor-pointer"
                >
                  <option value="SEMUA">Semua</option>
                  <option value="S1">Semester 1 (S1)</option>
                  <option value="S2">Semester 2 (S2)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bar Horizontal Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredLokasi2}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                <YAxis
                  type="category"
                  dataKey="lokasi"
                  tick={{ fontSize: 9, fill: '#1E293B' }}
                  width={180}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} Bangunan Liar`, 'Jumlah']}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                />
                <Bar dataKey="jumlah" name="Jumlah Bangunan" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabel Detail di bawah Grafik 2 */}
          <div className="overflow-x-auto border-t border-slate-100 pt-3">
            <div className="text-[11px] font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Daftar Detail Lokasi, Pemilik &amp; Jenis Bangunan:</span>
              <span className="text-[10px] text-slate-500 font-mono">
                Menampilkan {filteredLokasi2.length} data
              </span>
            </div>
            <table className="w-full text-[10.5px] text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/70 text-blue-900 font-bold border-y border-blue-100">
                  <th className="py-1.5 px-2">LOKASI PENERTIBAN</th>
                  <th className="py-1.5 px-2">NAMA PEMILIK / PENGUASA</th>
                  <th className="py-1.5 px-2">JENIS BANGUNAN</th>
                  <th className="py-1.5 px-2 text-right">JUMLAH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLokasi2.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30">
                    <td className="py-1.5 px-2 font-medium text-slate-900">{item.lokasi}</td>
                    <td className="py-1.5 px-2 text-slate-600">{item.namaPemilik}</td>
                    <td className="py-1.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium">
                        {item.jenisBangunan}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700">
                      {item.jumlah} Unit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel 5: Hasil penertiban per lokasi (Tabel dengan filter Inisiator dan Tahun) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                5. Hasil Penertiban per Lokasi
              </h3>
              <p className="text-[10px] text-slate-500">
                Dataset: Rekap Kegiatan Penertiban &bull; Filter interaktif Inisiator dan Tahun
              </p>
            </div>

            {/* Filter Inisiator & Tahun */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                <Filter className="w-3 h-3 text-blue-600" />
                <span className="font-semibold text-slate-600">Inisiator:</span>
                <select
                  value={filterInisiator5}
                  onChange={(e) => setFilterInisiator5(e.target.value)}
                  className="bg-transparent font-bold text-blue-900 outline-none cursor-pointer max-w-[130px] truncate"
                >
                  <option value="SEMUA">Semua Inisiator</option>
                  <option value="Ditpam BP Batam">Ditpam BP Batam</option>
                  <option value="Tim Terpadu Pemko-BP">Tim Terpadu Pemko-BP</option>
                  <option value="Patroli Rutin">Patroli Rutin</option>
                  <option value="Laporan Masyarakat">Laporan Masyarakat</option>
                </select>
              </div>

              <div className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-600">Tahun:</span>
                <select
                  value={filterTahun5}
                  onChange={(e) => setFilterTahun5(e.target.value)}
                  className="bg-transparent font-bold text-blue-900 outline-none cursor-pointer"
                >
                  <option value="SEMUA">Semua</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10.5px] text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/80 text-blue-900 font-bold border-y border-blue-200">
                  <th className="py-2 px-2.5">TANGGAL</th>
                  <th className="py-2 px-2.5">LOKASI</th>
                  <th className="py-2 px-2.5">OBJEK PENERTIBAN</th>
                  <th className="py-2 px-2.5 text-center">JUMLAH</th>
                  <th className="py-2 px-2.5">HASIL TINDAKAN</th>
                  <th className="py-2 px-2.5">KETERANGAN &amp; CATATAN LAPANGAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredHasil5.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30">
                    <td className="py-2 px-2.5 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      {row.tanggal}
                    </td>
                    <td className="py-2 px-2.5 font-semibold text-slate-900">{row.lokasi}</td>
                    <td className="py-2 px-2.5 text-slate-700">{row.objekPenertiban}</td>
                    <td className="py-2 px-2.5 text-center font-mono font-bold text-blue-700 whitespace-nowrap">
                      {row.jumlah}
                    </td>
                    <td className="py-2 px-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>{row.hasil}</span>
                      </span>
                    </td>
                    <td className="py-2 px-2.5 text-slate-600 text-[10px] leading-relaxed max-w-sm">
                      {row.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* B. PENGGARAP DAN NELAYAN LIAR                                        */}
      {/* ==================================================================== */}
      <section className="space-y-4 pt-2">
        {/* Section Header Banner */}
        <div className="flex items-center gap-2.5 pb-2 border-b-2 border-blue-600">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
            B
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-blue-950 font-mono">
              B. PENGGARAP DAN NELAYAN LIAR
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">
              Sumber: Data Penghuni Penggarap dan Nelayan Liar di Wilayah Aset Kawasan BP Batam
            </p>
          </div>
        </div>

        {/* Grid: Grafik 6 (Stacked Bar Horizontal) & Grafik 7 (Histogram Lama Menempati) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Grafik 6: Penghuni menurut lokasi dan cara mendapatkan lahan */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  6. Penghuni Menurut Lokasi dan Cara Mendapatkan Lahan
                </h3>
                <p className="text-[10px] text-slate-500">
                  Jenis: Stacked Bar Horizontal &bull; Sumbu Y: Lokasi &bull; Segmen: Cara Mendapatkan &bull; Sumbu X: Jumlah
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                Cara Perolehan
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataB.penghuniMenurutLokasiCara}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 90, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                  <YAxis
                    type="category"
                    dataKey="lokasi"
                    tick={{ fontSize: 9, fill: '#1E293B' }}
                    width={150}
                  />
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} KK/Penghuni`, name]}
                    contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="membeli" name="Membeli" stackId="b" fill="#1E3A8A" />
                  <Bar dataKey="mewarisi" name="Mewarisi" stackId="b" fill="#2563EB" />
                  <Bar dataKey="membukaSendiri" name="Membuka Sendiri" stackId="b" fill="#60A5FA" />
                  <Bar dataKey="menyewa" name="Menyewa" stackId="b" fill="#BAE6FD" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 7: Lama menempati lahan (Histogram) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  7. Lama Menempati Lahan
                </h3>
                <p className="text-[10px] text-slate-500">
                  Jenis: Histogram (Column) Kelompok &lt;5, 5-10, 11-20, &gt;20 Tahun
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                Distribusi Durasi
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataB.lamaMenempatiLahan}
                  margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="kelompokLama" tick={{ fontSize: 10, fill: '#334155' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip
                    formatter={(val: any) => [`${val} Penghuni`, 'Jumlah']}
                    contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                  />
                  <Bar dataKey="jumlah" name="Jumlah Penghuni" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Grafik 8: Luas lahan yang dikuasai per lokasi (Bar Horizontal, Diurutkan Terbesar, Aksen Warna Tertinggi) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                8. Luas Lahan yang Dikuasai per Lokasi (m²)
              </h3>
              <p className="text-[10px] text-slate-500">
                Jenis: Horizontal Bar diurutkan terbesar &bull; Aksen warna pada luas tertinggi &bull; Warna per Jenis Bangunan
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
              Total: 204.100 m²
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataB.luasLahanPerLokasi}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 9.5, fill: '#64748B' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k m²`}
                />
                <YAxis
                  type="category"
                  dataKey="lokasi"
                  tick={{ fontSize: 9, fill: '#1E293B' }}
                  width={160}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [`${Number(val).toLocaleString('id-ID')} m²`, name]}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="rumahPanggung" name="Rumah Panggung" stackId="c" fill="#1D4ED8" />
                <Bar dataKey="baganIkan" name="Bagan Ikan" stackId="c" fill="#2563EB" />
                <Bar dataKey="kolamTambak" name="Kolam / Tambak" stackId="c" fill="#60A5FA" />
                <Bar dataKey="gudangAlat" name="Gudang Alat Tangkap" stackId="c" fill="#93C5FD" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* C. PENINDAKAN DAN PENGAMANAN ASET                                    */}
      {/* ==================================================================== */}
      <section className="space-y-4 pt-2">
        {/* Section Header Banner */}
        <div className="flex items-center gap-2.5 pb-2 border-b-2 border-blue-600">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
            C
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-blue-950 font-mono">
              C. PENINDAKAN DAN PENGAMANAN ASET
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">
              Sumber: Data Penindakan Kawasan Aset &amp; Kegiatan Pengamanan Lingkungan, Hutan, Aset dan Objek Vital
            </p>
          </div>
        </div>

        {/* Grafik 9: Luas kawasan aset yang ditindak per semester (Stacked Column + Tabel) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                9. Luas Kawasan Aset yang Ditindak per Semester (m²)
              </h3>
              <p className="text-[10px] text-slate-500">
                Jenis: Stacked Column &bull; Sumbu X: Semester-Tahun &bull; Segmen: Jenis Kegiatan &bull; Sumbu Y: Total Luas (m²)
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Penindakan Kawasan
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataC.luasKawasanDitindakPerSemester}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#334155' }} />
                <YAxis
                  tick={{ fontSize: 9.5, fill: '#64748B' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k m²`}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [`${Number(val).toLocaleString('id-ID')} m²`, name]}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="penghentianKegiatanIlegal" name="Penghentian Kegiatan Ilegal" stackId="d" fill="#1E3A8A" />
                <Bar dataKey="pembongkaranPatokLiar" name="Pembongkaran Patok Liar" stackId="d" fill="#2563EB" />
                <Bar dataKey="pemasanganPapanPlang" name="Pemasangan Plang Aset BP" stackId="d" fill="#3B82F6" />
                <Bar dataKey="pengamananBatasKawasan" name="Pengamanan Batas Kawasan" stackId="d" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabel di bawah Grafik 9 */}
          <div className="overflow-x-auto border-t border-slate-100 pt-3">
            <div className="text-[11px] font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Log Data Penindakan Kawasan Aset dan Objek Vital:</span>
              <span className="text-[10px] text-slate-500 font-mono">
                Dataset: Data Penindakan Kawasan Aset &amp; Obvit
              </span>
            </div>
            <table className="w-full text-[10.5px] text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/70 text-blue-900 font-bold border-y border-blue-100">
                  <th className="py-1.5 px-2">TANGGAL</th>
                  <th className="py-1.5 px-2">NAMA KAWASAN / OBVIT</th>
                  <th className="py-1.5 px-2">JENIS KEGIATAN</th>
                  <th className="py-1.5 px-2 text-right">LUAS DITINDAK</th>
                  <th className="py-1.5 px-2">KETERANGAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {dataC.tabelPenindakanKawasan.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30">
                    <td className="py-1.5 px-2 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      {item.tanggal}
                    </td>
                    <td className="py-1.5 px-2 font-semibold text-slate-900">{item.nama}</td>
                    <td className="py-1.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-800 font-medium border border-blue-200">
                        {item.jenisKegiatan}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-blue-700">
                      {item.luasM2.toLocaleString('id-ID')} m²
                    </td>
                    <td className="py-1.5 px-2 text-slate-600 text-[10px] leading-relaxed max-w-sm">
                      {item.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grafik 10: Kegiatan pengamanan aset per subdit (Stacked Bar Horizontal + Custom Tooltip) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                10. Kegiatan Pengamanan Aset per Subdit
              </h3>
              <p className="text-[10px] text-slate-500">
                Jenis: Stacked Bar Horizontal &bull; Sumbu Y: Subdit &bull; Segmen: Jenis Kegiatan &bull; Tooltip: Lokasi, Personil, Hasil
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Hover untuk Rincian Lapangan
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataC.kegiatanPengamananPerSubdit}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 110, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 9.5, fill: '#64748B' }} />
                <YAxis
                  type="category"
                  dataKey="subdit"
                  tick={{ fontSize: 9, fill: '#1E293B' }}
                  width={180}
                />
                <Tooltip content={<CustomSubditTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="patroliRutin" name="Patroli Rutin Obvit" stackId="e" fill="#1E40AF" />
                <Bar dataKey="pengamananBatas" name="Pengamanan Batas Kawasan" stackId="e" fill="#0284C7" />
                <Bar dataKey="penindakanPelanggaran" name="Penindakan Pelanggaran" stackId="e" fill="#3B82F6" />
                <Bar dataKey="operasiPenertiban" name="Operasi Penertiban" stackId="e" fill="#93C5FD" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* D. PROTEKSI KEBAKARAN BANGUNAN ASET                                  */}
      {/* ==================================================================== */}
      <section className="space-y-4 pt-2">
        {/* Section Header Banner */}
        <div className="flex items-center gap-2.5 pb-2 border-b-2 border-blue-600">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs">
            D
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-blue-950 font-mono">
              D. PROTEKSI KEBAKARAN BANGUNAN ASET
            </h2>
            <p className="text-[11px] text-slate-500 font-sans">
              Sumber: Rekap Pengecekan Proteksi Pemadam Kebakaran Bangunan Gedung Aset BP Batam
            </p>
          </div>
        </div>

        {/* Grafik 11: Jumlah alat proteksi kebakaran per jenis bangunan (Stacked Column + Tabel) */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                11. Jumlah Alat Proteksi Kebakaran per Jenis Bangunan
              </h3>
              <p className="text-[10px] text-slate-500">
                Jenis: Stacked Column &bull; Sumbu X: Jenis Bangunan &bull; Segmen: Jenis Alat &bull; Sumbu Y: Jumlah Unit
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              3.493 Total Alat Terpasang
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataD.alatProteksiPerJenisBangunan}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="jenisBangunan" tick={{ fontSize: 9.5, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 9.5, fill: '#64748B' }} />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} Unit`, name]}
                  contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #BFDBFE' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="aparPowder" name="APAR Powder" stackId="f" fill="#1E3A8A" />
                <Bar dataKey="aparCo2" name="APAR CO2" stackId="f" fill="#2563EB" />
                <Bar dataKey="hydrant" name="Hydrant Box/Pillar" stackId="f" fill="#0284C7" />
                <Bar dataKey="fireAlarmSmoke" name="Fire Alarm & Smoke Detector" stackId="f" fill="#60A5FA" />
                <Bar dataKey="sprinkler" name="Sprinkler System" stackId="f" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabel di bawah Grafik 11 */}
          <div className="overflow-x-auto border-t border-slate-100 pt-3">
            <div className="text-[11px] font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Hasil Inspeksi &amp; Rekomendasi Pemeliharaan Proteksi Kebakaran:</span>
              <span className="text-[10px] text-slate-500 font-mono">
                Dataset: Rekap Pengecekan Proteksi Pemadam Kebakaran
              </span>
            </div>
            <table className="w-full text-[10.5px] text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/70 text-blue-900 font-bold border-y border-blue-100">
                  <th className="py-1.5 px-2">LOKASI BANGUNAN ASET</th>
                  <th className="py-1.5 px-2">REKOMENDASI TEKNIS</th>
                  <th className="py-1.5 px-2">TANGGAL MULAI</th>
                  <th className="py-1.5 px-2">TANGGAL AKHIR</th>
                  <th className="py-1.5 px-2 text-right">STATUS KELAIKAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {dataD.tabelPengecekanProteksi.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30">
                    <td className="py-1.5 px-2 font-semibold text-slate-900">{item.lokasi}</td>
                    <td className="py-1.5 px-2 text-slate-600 text-[10px] leading-relaxed">
                      {item.rekomendasi}
                    </td>
                    <td className="py-1.5 px-2 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      {item.tanggalMulai}
                    </td>
                    <td className="py-1.5 px-2 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      {item.tanggalAkhir}
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
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
    </div>
  );
};
