import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  PhoneCall,
  Mail,
  Building,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import {
  PTSP_COMPLAINTS_SAMPLE,
  PtspComplaintItem,
} from '../../data/ptspData';

interface PtspComplaintsSectionProps {
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspComplaintsSection: React.FC<PtspComplaintsSectionProps> = ({ onExplainKpi }) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return PTSP_COMPLAINTS_SAMPLE.filter((item) => {
      if (selectedChannel !== 'ALL' && !item.saluranPengaduan.toLowerCase().includes(selectedChannel.toLowerCase())) {
        return false;
      }
      if (selectedStatus !== 'ALL' && item.statusSelesai !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.kodeTiket.toLowerCase().includes(q) ||
          item.jenisPengaduan.toLowerCase().includes(q) ||
          item.uraianMasalah.toLowerCase().includes(q) ||
          item.perusahaanPelapor.toLowerCase().includes(q) ||
          item.solusiDiberikan.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedChannel, selectedStatus, searchQuery]);

  return (
    <div id="ptsp-complaints-section" className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                Item #15 &amp; #17 Katalog PDF
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sistem Penanganan Aspirasi &amp; Pengaduan
              </span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Monitoring &amp; Evaluasi Pengelolaan Pengaduan Masyarakat (SP4N-LAPOR! &amp; MPP)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tingkat penyelesaian keluhan 98,4% dengan rata-rata waktu respons 1,4 jam (Target SLA: ≤ 4 jam kerja).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onExplainKpi && (
              <button
                onClick={() => onExplainKpi('sat_ccr')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#002B49] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[10px] text-emerald-600 font-bold uppercase">CCR Selesai</div>
              <div className="text-sm font-extrabold text-emerald-800 font-mono">98,4%</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-center">
              <div className="text-[10px] text-sky-600 font-bold uppercase">Avg Response</div>
              <div className="text-sm font-extrabold text-sky-800 font-mono">1,4 Jam</div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 my-3">
          <div className="flex flex-wrap items-center gap-2">
            {['ALL', 'SP4N-LAPOR!', 'Meja Pengaduan MPP', 'WhatsApp Layanan', 'Email Pelayanan'].map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedChannel === ch
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {ch === 'ALL' ? 'Semua Kanal' : ch}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari keluhan atau tiket..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-44 sm:w-56"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3 whitespace-nowrap">No. Tiket</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Saluran &amp; Pelapor</th>
                <th className="py-2.5 px-3 min-w-[220px]">Substansi Aspirasi / Keluhan</th>
                <th className="py-2.5 px-3 min-w-[240px]">Tindak Lanjut &amp; Solusi Penyelesaian</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Unit Terkait</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Waktu Respons</th>
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
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                    <div>{item.kodeTiket}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{item.bulan} {item.tahun}</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded text-[10px] border border-sky-200">
                      {item.saluranPengaduan}
                    </span>
                    <div className="text-[11px] text-slate-600 mt-1">{item.perusahaanPelapor}</div>
                  </td>

                  <td className="py-2.5 px-3 text-slate-800 text-[11px] leading-relaxed">
                    <div className="font-semibold text-slate-900">{item.jenisPengaduan}</div>
                    <div className="text-slate-600 mt-0.5">{item.uraianMasalah}</div>
                  </td>

                  <td className="py-2.5 px-3 text-slate-800 text-[11px] leading-relaxed">
                    <div className="flex items-start gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.solusiDiberikan}</span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-[11px] text-slate-600 font-medium whitespace-nowrap">
                    PTSP / MPP BP Batam
                  </td>

                  <td className="py-2.5 px-3 text-center whitespace-nowrap font-mono font-bold text-slate-800">
                    {item.lamaPenyelesaianHari} Hari Kerja
                  </td>

                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.statusSelesai === 'Selesai Tertangani'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      {item.statusSelesai}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Executive Insight Box for Complaints */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs mt-3">
          <span className="font-bold text-[#002B49] flex items-center gap-1.5 mb-1 text-xs">
            <span></span> Executive Insight &amp; Penanganan Pengaduan Layanan PTSP:
          </span>
          <p className="text-[11.5px] text-slate-600">
            Tingkat penyelesaian aduan (Customer Complaint Resolution / CCR) mencapai <strong>98,4%</strong> dengan waktu respons rata-rata <strong>1,4 jam</strong>. Integrasi kanal SP4N-LAPOR! Kemenpan RB dengan helpdesk internal PTSP di MPP Batam Centre memastikan setiap aduan diverifikasi dan diberikan solusi konkret dalam waktu kurang dari batas toleransi SLA (&le; 4 jam kerja).
          </p>
        </div>
      </div>
    </div>
  );
};
