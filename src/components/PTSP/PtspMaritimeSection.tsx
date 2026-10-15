import React, { useState, useMemo } from 'react';
import {
  Ship,
  Anchor,
  Compass,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import {
  PTSP_MARITIME_PERMITS_SAMPLE,
  PtspMaritimePermitItem,
} from '../../data/ptspData';

interface PtspMaritimeSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspMaritimeSection: React.FC<PtspMaritimeSectionProps> = ({ onExplainKpi }) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return PTSP_MARITIME_PERMITS_SAMPLE.filter((item) => {
      if (selectedTypeFilter !== 'ALL' && item.jenisIzin !== selectedTypeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.namaKapal.toLowerCase().includes(q) ||
          item.namaPerusahaan.toLowerCase().includes(q) ||
          item.nomorIzin.toLowerCase().includes(q) ||
          item.jenisMuatanKomoditi.toLowerCase().includes(q) ||
          item.pelabuhanBongkarMuat.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTypeFilter, searchQuery]);

  return (
    <div id="ptsp-maritime-section" className="space-y-4">
      {/* 1. SECTION INTRO */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Item #1, #2, #3, #12 Katalog PDF
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Layanan Kepelabuhanan &amp; Logistik Maritim PTSP
              </span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Perizinan Bongkar Muat (SKKBM), Angkut Barang (SKKAB), Alat (SKKAA) &amp; Jadwal Kapal
            </h2>
            <p className="text-xs text-slate-500 max-w-3xl mt-0.5">
              Menghubungkan arus logistik laut internasional dan domestik di pelabuhan Batu Ampar, Kabil, Sekupang, dan terminal khusus (TUKS) industri Batam.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2">
            {onExplainKpi && (
              <button
                onClick={() => onExplainKpi('kpi_ptsp_maritim')}
                className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#002B49] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Ship className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Volume SKKBM</div>
              <div className="text-sm font-extrabold text-slate-900 font-mono">4.280 Izin</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-bold uppercase">TKBM Terlibat</div>
              <div className="text-sm font-extrabold text-sky-700 font-mono">1.840 Orang</div>
            </div>
          </div>
        </div>

        {/* 2. TABEL PERIZINAN MARITIM */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              {['ALL', 'SKKBM', 'SKKAB', 'SKKAA', 'Jadwal Kapal', 'Rekomendasi TERSUS'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTypeFilter === t
                      ? 'bg-[#002B49] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {t === 'ALL' ? 'Semua Jenis Izin' : t}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kapal, agen, dermaga..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-44 sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3 whitespace-nowrap">Jenis &amp; No. Izin</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Nama Kapal &amp; Bendera</th>
                  <th className="py-2.5 px-3 min-w-[170px]">Pemohon &amp; Agen</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Rute Pelabuhan &amp; Dermaga</th>
                  <th className="py-2.5 px-3 min-w-[160px]">Komoditas &amp; Volume</th>
                  <th className="py-2.5 px-3 whitespace-nowrap text-center">TKBM</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Jadwal ETA / Kerja</th>
                  <th className="py-2.5 px-3 whitespace-nowrap text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-sky-50/40 transition-colors ${
                      idx % 2 === 1 ? 'bg-slate-50/50' : ''
                    }`}
                  >
                    {/* Jenis & No Izin */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                        {item.jenisIzin}
                      </span>
                      <div className="font-mono text-[10.5px] text-slate-700 font-semibold mt-1">
                        {item.nomorIzin}
                      </div>
                    </td>

                    {/* Kapal & Bendera */}
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{item.namaKapal}</span>
                      </div>
                      <div className="text-[10.5px] text-slate-500">Bendera: {item.benderaKapal}</div>
                    </td>

                    {/* Pemohon & Agen */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{item.namaPerusahaan}</div>
                      <div className="text-[10px] text-slate-500">Agen: {item.agenPelayaran}</div>
                    </td>

                    {/* Pelabuhan */}
                    <td className="py-2.5 px-3">
                      <div className="text-slate-800 font-medium">Asal: {item.pelabuhanAsal}</div>
                      <div className="text-[10px] text-sky-700 font-semibold flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-sky-600" />
                        <span>Bongkar: {item.pelabuhanBongkarMuat}</span>
                      </div>
                    </td>

                    {/* Komoditi & Volume */}
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-slate-900">{item.jenisMuatanKomoditi}</div>
                      <div className="font-mono text-[10.5px] text-emerald-700 font-bold">{item.jumlahVolume}</div>
                    </td>

                    {/* TKBM */}
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800">
                      {item.jumlahTkbm} Org
                    </td>

                    {/* ETA & Waktu */}
                    <td className="py-2.5 px-3 text-[11px] whitespace-nowrap">
                      <div className="font-medium text-slate-800">ETA: {item.eta}</div>
                      <div className="text-[10px] text-slate-500">Estimasi: {item.estimateLamaHari} Hari Kerja</div>
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.status === 'Selesai Terbit'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : item.status === 'Proses Verifikasi'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
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

          {/* Executive Insight Box for Maritime */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs mt-3">
            <span className="font-bold text-[#002B49] flex items-center gap-1.5 mb-1 text-xs">
              <span></span> Executive Insight &amp; Operasional Logistik Maritim PTSP:
            </span>
            <p className="text-[11.5px] text-slate-600">
              Aktivitas bongkar muat kargo curah, peti kemas, dan kapal tongkang (barge) mencatat <strong>4.280 dokumen SKKBM terbit</strong> dengan keterlibatan 1.840 tenaga kerja bongkar muat (TKBM). Kepatuhan jadwal sandar dan persetujuan SKKAA/SKKAB terintegrasi secara elektronik dengan KSOP Khusus Batam, menghasilkan rata-rata waktu tunggu izin bongkar muat kurang dari <strong>1,4 hari kerja</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
