import React, { useState, useMemo } from 'react';
import {
  FileCheck2,
  TrendingUp,
  Briefcase,
  Building2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Globe2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  PTSP_PERIZINAN_BERUSAHA_SAMPLE,
  PTSP_SEKTOR_SUMMARY,
  PtspPerizinanBerusahaItem,
} from '../../data/ptspData';

interface PtspLicensingSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspLicensingSection: React.FC<PtspLicensingSectionProps> = ({
  onExplainKpi,
}) => {
  const [selectedSektorFilter, setSelectedSektorFilter] = useState<string>('ALL');
  const [selectedRisikoFilter, setSelectedRisikoFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return PTSP_PERIZINAN_BERUSAHA_SAMPLE.filter((item) => {
      if (selectedSektorFilter !== 'ALL' && !item.sektor.toLowerCase().includes(selectedSektorFilter.toLowerCase())) {
        return false;
      }
      if (selectedRisikoFilter !== 'ALL' && item.tingkatRisiko !== selectedRisikoFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.namaPerusahaan.toLowerCase().includes(q) ||
          item.nomorPermohonan.toLowerCase().includes(q) ||
          item.uraianKbli.toLowerCase().includes(q) ||
          item.lokasiKawasan.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedSektorFilter, selectedRisikoFilter, searchQuery]);

  return (
    <div id="ptsp-licensing-section" className="space-y-4">
      {/* 1. SECTOR SUMMARY CARDS ROW */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Item #9 Katalog PDF
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sistem OSS RBA &amp; IBIS BP Batam
              </span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Kinerja Perizinan Berusaha Berbasis Risiko (OSS RBA) per Sektor Usaha
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {onExplainKpi && (
              <button
                onClick={() => onExplainKpi('lic_vol')}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#002B49] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
            <div className="text-xs text-slate-500 font-medium">
              Total 13.820 Permohonan Masuk • 95,4% Rasio Terbit
            </div>
          </div>
        </div>

        {/* 6 Sektor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {PTSP_SEKTOR_SUMMARY.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-sky-300 transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-900 line-clamp-1">
                  {s.sektor}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-mono">
                  {s.pmaShare}% PMA
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1.5 border-y border-slate-200/80 text-center">
                <div>
                  <div className="text-[10px] text-slate-500">Permohonan</div>
                  <div className="font-mono font-bold text-xs text-slate-800">
                    {s.permohonan.toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Izin Terbit</div>
                  <div className="font-mono font-bold text-xs text-emerald-700">
                    {s.terbit.toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Investasi</div>
                  <div className="font-mono font-bold text-xs text-blue-700">
                    Rp {(s.investasiMiliar / 1000).toFixed(1)} T
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10.5px] pt-2 text-slate-500">
                <span>Efektivitas Terbit: {((s.terbit / s.permohonan) * 100).toFixed(1)}%</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> On-Track
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TABEL DAFTAR PERMOHONAN PERIZINAN BERUSAHA TERKINI */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Daftar Sampel Data Permohonan Perizinan Berusaha (OSS RBA)
              </h3>
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('lic_sla')}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-[#002B49] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-3 h-3 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Menampilkan atribut lengkap: NIB, NPWP, KBLI, Risiko, PMA/PMDN, Negara Asal, Rencana Investasi, TKI/TKA, dan Status SLA.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari PT, NIB, KBLI..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-44 sm:w-52"
              />
            </div>

            <select
              value={selectedRisikoFilter}
              onChange={(e) => setSelectedRisikoFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Risiko</option>
              <option value="Rendah">Risiko Rendah</option>
              <option value="Menengah Rendah">Menengah Rendah</option>
              <option value="Menengah Tinggi">Menengah Tinggi</option>
              <option value="Tinggi">Risiko Tinggi</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3 whitespace-nowrap">No. Permohonan</th>
                <th className="py-2.5 px-3 min-w-[180px]">Nama Perusahaan &amp; NIB</th>
                <th className="py-2.5 px-3 min-w-[180px]">Sektor &amp; KBLI</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Tingkat Risiko</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Modal / Asal</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-right">Rencana Investasi</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Tenaga Kerja</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Status &amp; SLA</th>
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
                  {/* No Permohonan */}
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                    <div>{item.nomorPermohonan}</div>
                    <div className="text-[10px] text-slate-400 font-normal">Tgl: {item.tanggalPermohonan}</div>
                  </td>

                  {/* Perusahaan & NIB */}
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900">{item.namaPerusahaan}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      NIB: {item.nib} • NPWP: {item.npwp}
                    </div>
                    <div className="text-[10px] text-sky-700">{item.lokasiKawasan}</div>
                  </td>

                  {/* Sektor & KBLI */}
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-800">{item.sektor}</div>
                    <div className="text-[10px] text-slate-500">
                      <span className="font-mono font-bold text-slate-700">[{item.kbli}]</span> {item.uraianKbli}
                    </div>
                  </td>

                  {/* Tingkat Risiko */}
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.tingkatRisiko === 'Tinggi'
                          ? 'bg-rose-50 text-rose-700 border-rose-300'
                          : item.tingkatRisiko === 'Menengah Tinggi'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : item.tingkatRisiko === 'Menengah Rendah'
                          ? 'bg-blue-50 text-blue-700 border-blue-300'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      }`}
                    >
                      {item.tingkatRisiko}
                    </span>
                    <div className="text-[9.5px] text-slate-400 mt-0.5">Skala: {item.skalaUsaha}</div>
                  </td>

                  {/* Status Modal & Asal Negara */}
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.statusPenanamanModal === 'PMA'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.statusPenanamanModal}
                    </span>
                    <div className="text-[10px] text-slate-600 mt-0.5">{item.asalNegara}</div>
                  </td>

                  {/* Rencana Investasi */}
                  <td className="py-2.5 px-3 text-right">
                    <div className="font-mono font-bold text-slate-900">
                      Rp {item.rencanaInvestasi.toFixed(1)} M
                    </div>
                    <div className="text-[10px] text-slate-400">Komitmen LKPM</div>
                  </td>

                  {/* Tenaga Kerja */}
                  <td className="py-2.5 px-3 text-center">
                    <div className="font-mono font-semibold text-slate-800">
                      {item.tki} TKI
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {item.tka} TKA
                    </div>
                  </td>

                  {/* Status Permohonan & SLA */}
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        item.statusPermohonan === 'Disetujui' || item.statusPermohonan === 'Terbit Otomatis'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : item.statusPermohonan === 'Verifikasi Teknis'
                          ? 'bg-blue-50 text-blue-700 border-blue-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      {item.statusPermohonan}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.slaHari} Hari Kerja</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Executive Insight Box for Licensing */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs mt-3">
          <span className="font-bold text-[#002B49] flex items-center gap-1.5 mb-1 text-xs">
            <span></span> Executive Insight &amp; Analisis Kinerja Perizinan Berusaha OSS RBA:
          </span>
          <p className="text-[11.5px] text-slate-600">
            Sebanyak <strong>13.820 permohonan izin</strong> telah diproses dengan tingkat kepatuhan SLA <strong>94,6%</strong>. Integrasi OSS RBA dengan sistem internal BP Batam memangkas waktu penerbitan untuk izin risiko rendah (62% dari total berkas) menjadi <strong>kurang dari 1 jam (terbit instan)</strong>. PMA mendominasi komitmen investasi sebesar 68,4% dengan penyerapan 17.890 tenaga kerja lokal Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
};
