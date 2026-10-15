import React, { useState, useMemo } from 'react';
import {
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Search,
  ChevronRight,
  TrendingUp,
  Download,
  Filter,
  Check,
  Building2,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { PTSP_IKM_DATASET, PtspIkmYearlyRecord, PtspIkmUnsurItem } from '../../data/ptspData';

interface PtspIkmSectionProps {
  selectedYear?: string;
  onExplainKpi?: (kpiId: string) => void;
}

export const PtspIkmSection: React.FC<PtspIkmSectionProps> = ({
  selectedYear = '2026',
  onExplainKpi,
}) => {
  const [activeYear, setActiveYear] = useState<string>(selectedYear);
  const [selectedKategoriFilter, setSelectedKategoriFilter] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [expandedUnsurId, setExpandedUnsurId] = useState<string | null>('ikm-u1');

  // Sync if prop changes
  React.useEffect(() => {
    if (selectedYear) {
      setActiveYear(selectedYear);
    }
  }, [selectedYear]);

  // Current year dataset
  const currentData: PtspIkmYearlyRecord = useMemo(() => {
    return PTSP_IKM_DATASET.find((d) => d.tahun === activeYear) || PTSP_IKM_DATASET[0];
  }, [activeYear]);

  // Filtered Unsur Items
  const filteredUnsurItems = useMemo(() => {
    return currentData.unsurItems.filter((item) => {
      if (selectedKategoriFilter !== 'ALL' && item.kategori !== selectedKategoriFilter) {
        return false;
      }
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchesName = item.unsurPelayanan.toLowerCase().includes(q);
        const matchesCode = item.kodeUnsur.toLowerCase().includes(q);
        const matchesSaran = item.saranKeluhan.toLowerCase().includes(q);
        const matchesTindak = item.tindakLanjut.toLowerCase().includes(q);
        return matchesName || matchesCode || matchesSaran || matchesTindak;
      }
      return true;
    });
  }, [currentData, selectedKategoriFilter, searchKeyword]);

  // Category Colors
  const getKategoriBadge = (kategori: 'A' | 'B' | 'C' | 'D') => {
    switch (kategori) {
      case 'A':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-500',
          label: 'Mutu A (Sangat Baik)',
        };
      case 'B':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-300',
          dot: 'bg-blue-500',
          label: 'Mutu B (Baik)',
        };
      case 'C':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-300',
          dot: 'bg-amber-500',
          label: 'Mutu C (Kurang Baik)',
        };
      case 'D':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-300',
          dot: 'bg-rose-500',
          label: 'Mutu D (Tidak Baik)',
        };
    }
  };

  return (
    <div id="ptsp-ikm-section" className="space-y-4">
      {/* 1. SECTION TITLE & DATASET BADGE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#002B49] text-white flex items-center gap-1.5 shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Dataset Resmi: Indeks Kepuasan Masyarakat (IKM) PTSP
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                Permenpan RB No. 14 Tahun 2017 (9 Unsur Pelayanan)
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Survei Kepuasan Pemohon Perizinan &amp; Layanan Mal Pelayanan Publik (MPP) BP Batam
            </h2>
            <p className="text-xs text-slate-500 max-w-3xl">
              Memantau skor kepuasan pemohon, evaluasi 9 unsur standar pelayanan publik, aspirasi/keluhan masyarakat,
              serta rencana tindak lanjut perbaikan tata kelola perizinan terpadu BP Batam.
            </p>
          </div>

          {/* Year Switcher Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            {PTSP_IKM_DATASET.map((d) => (
              <button
                key={d.tahun}
                onClick={() => setActiveYear(d.tahun)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeYear === d.tahun
                    ? 'bg-white text-[#002B49] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tahun {d.tahun}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SUMMARY STATS HERO ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4 pt-4 border-t border-slate-100">
          {/* Card 1: Nilai IKM Total */}
          <div className="bg-gradient-to-br from-slate-900 via-[#002B49] to-[#0A3A60] rounded-xl p-4 text-white shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-sky-200 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Nilai IKM Total (Konversi)</span>
              <div className="flex items-center gap-1.5">
                {onExplainKpi && (
                  <button
                    onClick={() => onExplainKpi('ikss_ikm')}
                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/15 hover:bg-white/25 text-sky-200 transition-colors cursor-pointer"
                  >
                    Formula &amp; Insight
                  </button>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                  {currentData.kategoriLabel}
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {currentData.nilaiIkmTotal.toFixed(2)}
              </span>
              <span className="text-xs text-sky-200">/ 100,00</span>
            </div>
            <div className="text-[11px] text-slate-300 pt-2 border-t border-white/10 flex items-center justify-between">
              <span>Target Renstra: ≥ {currentData.targetIkm.toFixed(1)}</span>
              <span className="text-emerald-400 font-bold">{currentData.achievementRate} Capaian</span>
            </div>
          </div>

          {/* Card 2: Jumlah Responden */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Jumlah Responden</span>
              <Users className="w-4 h-4 text-sky-600" />
            </div>
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {currentData.jumlahRespondenTotal.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-slate-500 font-medium">Pemohon</span>
            </div>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span>Pria: {currentData.demografi.jenisKelamin.pria}</span>
              <span>•</span>
              <span>Wanita: {currentData.demografi.jenisKelamin.wanita}</span>
              <span>•</span>
              <span className="text-sky-700 font-semibold">{currentData.periode}</span>
            </div>
          </div>

          {/* Card 3: Standar Skala Mutu Permenpan RB */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Standar Mutu Pelayanan</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="space-y-1 my-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Kategori A (88,31 - 100)
                </span>
                <span className="text-slate-600 font-medium">Sangat Baik</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-blue-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Kategori B (76,61 - 88,30)
                </span>
                <span className="text-slate-600 font-medium">Baik</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Kategori C (65,00 - 76,60)
                </span>
                <span className="text-slate-600 font-medium">Kurang Baik</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-200">
              Perhitungan nilai tertimbang (Bobot 0,111 per unsur)
            </div>
          </div>

          {/* Card 4: Status Tindak Lanjut Keluhan */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Tindak Lanjut 9 Unsur</span>
              <MessageSquare className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                {currentData.unsurItems.filter((u) => u.statusTindakLanjut === 'Selesai Diterapkan').length} / 9
              </span>
              <span className="text-xs text-slate-500 font-medium">Unsur Selesai</span>
            </div>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-amber-700 font-semibold">
                {currentData.unsurItems.filter((u) => u.statusTindakLanjut === 'Dalam Proses').length} Proses
              </span>
              <span>•</span>
              <span className="text-blue-700 font-semibold">
                {currentData.unsurItems.filter((u) => u.statusTindakLanjut === 'Terjadwal').length} Terjadwal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RADAR / COMPARISON OF 9 UNSUR PERMENPAN RB */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Profil Capaian 9 Unsur Pelayanan Publik (Permenpan RB No. 14/2017)
            </h3>
            <p className="text-xs text-slate-500">
              Evaluasi kinerja per unsur (U1 s.d. U9) terhadap ambang batas kepuasan Sangat Baik (≥88,31)
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {onExplainKpi && (
              <button
                onClick={() => onExplainKpi('ikss_ikm')}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-[#002B49] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Formula &amp; Insight</span>
              </button>
            )}
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Kategori A (Sangat Baik)
            </span>
            <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Kategori B (Baik)
            </span>
          </div>
        </div>

        {/* 9 Bars Visual Representation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {currentData.unsurItems.map((u) => {
            const badge = getKategoriBadge(u.kategori);
            const isSelected = expandedUnsurId === u.id;

            return (
              <div
                key={u.id}
                onClick={() => setExpandedUnsurId(isSelected ? null : u.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500/30'
                    : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      {u.kodeUnsur}
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[170px]">
                      {u.unsurPelayanan}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                    {u.kategori} ({u.nilaiPerUnsur.toFixed(1)})
                  </span>
                </div>

                {/* Progress bar to 100 */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      u.kategori === 'A' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${u.nilaiPerUnsur}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Skala 4: {u.nilaiSkala4.toFixed(2)}</span>
                  <span>Tertimbang: {u.nilaiTertimbang.toFixed(2)}%</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-0.5">
                    Detail <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TABEL LENGKAP DATASET 'Indeks Kepuasan Masyarakat (IKM) PTSP' */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3.5">
        {/* Table Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>IKM PTSP: Evaluasi 9 Unsur Pelayanan Publik (Permenpan RB No. 14/2017)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  {filteredUnsurItems.length} Unsur Ditampilkan
                </span>
              </h3>
              {onExplainKpi && (
                <button
                  onClick={() => onExplainKpi('ikss_ikm')}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-[#002B49] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FileText className="w-3 h-3 text-blue-600" />
                  <span>Formula &amp; Insight</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Format lengkap sesuai atribut: TAHUN, UNSUR PELAYANAN, JUMLAH RESPONDEN, NILAI PER UNSUR, NILAI IKM TOTAL, KATEGORI, SARAN/KELUHAN, TINDAK LANJUT.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Cari unsur, keluhan..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-44 sm:w-56"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedKategoriFilter}
              onChange={(e) => setSelectedKategoriFilter(e.target.value as any)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Kategori (A/B/C/D)</option>
              <option value="A">Hanya Kategori A (Sangat Baik)</option>
              <option value="B">Hanya Kategori B (Baik)</option>
              <option value="C">Kategori C (Kurang Baik)</option>
              <option value="D">Kategori D (Tidak Baik)</option>
            </select>
          </div>
        </div>

        {/* The Responsive Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3 whitespace-nowrap">Tahun</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Unsur Pelayanan (9 Unsur Permenpan RB)</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-right">Jumlah Responden</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-right">Nilai Per Unsur</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-right">Nilai IKM Total</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Kategori</th>
                <th className="py-2.5 px-3 min-w-[220px]">Saran / Keluhan Masyarakat</th>
                <th className="py-2.5 px-3 min-w-[260px]">Tindak Lanjut &amp; Solusi Nyata</th>
                <th className="py-2.5 px-3 whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredUnsurItems.map((item, idx) => {
                const badge = getKategoriBadge(item.kategori);
                const isExpanded = expandedUnsurId === item.id;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-sky-50/40 transition-colors ${
                      idx % 2 === 1 ? 'bg-slate-50/50' : ''
                    } ${isExpanded ? 'bg-sky-50/60' : ''}`}
                  >
                    {/* TAHUN */}
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {currentData.tahun}
                    </td>

                    {/* UNSUR PELAYANAN */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                          {item.kodeUnsur}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{item.unsurPelayanan}</div>
                          <div className="text-[10px] text-slate-500 line-clamp-1">{item.deskripsi}</div>
                        </div>
                      </div>
                    </td>

                    {/* JUMLAH RESPONDEN */}
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-700">
                      {item.jumlahResponden.toLocaleString('id-ID')}
                    </td>

                    {/* NILAI PER UNSUR */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="font-mono font-extrabold text-slate-900">
                        {item.nilaiPerUnsur.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        (Skala 4: {item.nilaiSkala4.toFixed(2)})
                      </div>
                    </td>

                    {/* NILAI IKM TOTAL */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="font-mono font-extrabold text-[#002B49]">
                        {currentData.nilaiIkmTotal.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Bobot {item.bobot.toFixed(3)}
                      </div>
                    </td>

                    {/* KATEGORI */}
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        Kategori {item.kategori}
                      </span>
                    </td>

                    {/* SARAN/KELUHAN */}
                    <td className="py-2.5 px-3 text-slate-700 text-[11px] leading-relaxed">
                      <div className="flex items-start gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>"{item.saranKeluhan}"</span>
                      </div>
                    </td>

                    {/* TINDAK LANJUT */}
                    <td className="py-2.5 px-3 text-slate-800 text-[11px] leading-relaxed">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span>{item.tindakLanjut}</span>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                            PJ: {item.unitPenanggungJawab}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* STATUS TINDAK LANJUT */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          item.statusTindakLanjut === 'Selesai Diterapkan'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : item.statusTindakLanjut === 'Dalam Proses'
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : 'bg-blue-50 text-blue-700 border-blue-300'
                        }`}
                      >
                        {item.statusTindakLanjut}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              <strong>Metodologi Perhitungan:</strong> Nilai IKM Total diperoleh dari penjumlahan nilai tertimbang ke-9 unsur pelayanan (Nilai Rata-rata per Unsur × 0,111) dikalikan nilai konversi 25.
            </span>
          </div>
          {onExplainKpi && (
            <button
              onClick={() => onExplainKpi('ikss_ikm')}
              className="text-[#002B49] hover:underline font-bold text-xs shrink-0 cursor-pointer"
            >
              Lihat Formula Calculated Field →
            </button>
          )}
        </div>

        {/* Executive Insight Box for IKM PTSP */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs">
          <span className="font-bold text-[#002B49] flex items-center gap-1.5 mb-1 text-xs">
            <span></span> Executive Insight &amp; Analisis Hasil IKM PTSP ({currentData.tahun}):
          </span>
          <p className="text-[11.5px] text-slate-600">
            Indeks Kepuasan Masyarakat (IKM) PTSP BP Batam tahun {currentData.tahun} mencapai skor <strong>{currentData.nilaiIkmTotal.toFixed(2)} ({currentData.kategoriLabel})</strong> dari total <strong>{currentData.jumlahRespondenTotal.toLocaleString('id-ID')} responden</strong>, melampaui target Renstra (&ge; {currentData.targetIkm.toFixed(1)}). Unsur dengan skor kepuasan tertinggi dicatat oleh <strong>U5 (Kompetensi Pelaksana: 91,20)</strong> dan <strong>U7 (Kesopanan &amp; Keramahan: 90,80)</strong>. Prioritas tindak lanjut difokuskan pada <strong>U3 (Waktu Penyelesaian: 86,50 - Mutu B)</strong> melalui otomasi notifikasi tracking berkas perizinan dan digitalisasi tanda tangan elektronik (TTE BSrE).
          </p>
        </div>
      </div>
    </div>
  );
};
